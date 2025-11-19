/**
 * Orchestrator - The Master Controller
 * 
 * Uses LLM to understand queries, plan agent pipelines, and coordinate research.
 * This is the brain of the multi-agent system.
 */

import { ResearchContext, createInitialContext } from '../interfaces/Context';
import { AgentRegistry } from './AgentRegistry';
import { MessageBus } from './MessageBus';
import { MessageType } from '../interfaces/Message';
import { SourceReference, AgentSubStep } from '@/components/DeepResearch/components/ResearchSteps';
import { AgentProgressTracker, AgentProgressCallback } from '../interfaces/AgentProgress';
import { extractThinkingProcess, parseLLMResponse } from '@/lib/utils/thinkExtractor';
import type { ExecutionPlan, PlanStep } from '../agents/PlanningAgent';
import { UserFeedback } from '../interfaces/Feedback';

type MicroSessionStatus = 'active' | 'completed' | 'failed';

interface MicroSession {
  id: string;
  goal: string;
  startTime: number;
  status: MicroSessionStatus;
  agentCallsInSession: Map<string, number>;
  maxAttemptsPerAgent: number;
  lastAgent?: string;
}

type OrchestratorMode = "research" | "flow_builder";

interface OrchestratorConfig {
  enableWebSearch?: boolean;
  enableRAGSearch?: boolean;
  mode?: OrchestratorMode;
}

export interface AgentLLMOptions {
  agent?: string;
  tierHint?: string;
  temperature?: number;
  maxTokens?: number;
  metadata?: Record<string, any>;
}

export type LLMFunction = (prompt: string, options?: AgentLLMOptions) => Promise<string>;

export class Orchestrator {
  private registry: AgentRegistry;
  private messageBus: MessageBus;
  private llm: LLMFunction;
  private progressTracker: AgentProgressTracker;
  private progressCallback?: AgentProgressCallback;
  private progressProxyInitialized: boolean = false;
  
  // 🔥 CRITICAL FIX: Agent state tracking to prevent redundant calls
  private calledAgents: Set<string> = new Set();
  private agentResults: Map<string, any> = new Map();
  private lastAgentCalled: string | null = null;
  
  // Context-aware rerun tracking with input signatures
  private agentInputSignatures: Map<string, string> = new Map();
  private agentRerunCount: Map<string, number> = new Map();
  
  // 🔄 Retry tracking  
  private retryingAgents: Set<string> = new Set();
  
  // 🏃 Running agents tracking - prevents parallel execution conflicts
  private runningAgents: Set<string> = new Set();
  
  // 🔍 Instance tracking for debugging state persistence
  private instanceId: string = `orch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

  // 🎯 Micro-session orchestration
  private currentMicroSession: MicroSession | null = null;
  private microSessionHistory: MicroSession[] = [];
  private globalAgentCalls: Map<string, number> = new Map();
  private readonly defaultMicroSessionLimit = 3;
  private readonly microSessionLimits: Record<string, number> = {
    PatternGenerator: 3,
    Extractor: 3,
    DataInspector: 2,
    PlanningAgent: 1,
    SynthesisCoordinator: 2,
    ResponseFormatter: 2,
  };
  private consecutiveSameAgentCount = 0;
  private readonly maxConsecutiveSameAgent = 2;
  private lastDecisionAgent: string | null = null;
  
  constructor(
    registry: AgentRegistry,
    messageBus: MessageBus,
    llm: LLMFunction,
    progressCallback?: AgentProgressCallback,
    config?: OrchestratorConfig,
    vectorStore?: import('@/components/VectorStore/VectorStore').VectorStore
  ) {
    this.registry = registry;
    this.messageBus = messageBus;
    this.llm = llm;
    this.progressCallback = progressCallback;
    this.progressTracker = new AgentProgressTracker(progressCallback);
    this.config = config;
    this.vectorStore = vectorStore;
    if (config?.mode) {
      this.flowMode = config.mode;
    }
    
    // Note: createProgressProxy() will be called on first agent execution
  }
  
  private config?: OrchestratorConfig;
  private vectorStore?: import('@/components/VectorStore/VectorStore').VectorStore;
  private flowMode: OrchestratorMode = "research";
  private readonly flowPipelineOrder = ['DataInspector', 'PatternGenerator', 'Extractor', 'SynthesisCoordinator', 'ResponseFormatter'];
  
  /**
   * 🎯 Get next step from execution plan with comprehensive pipeline view
   */
  private getNextPlannedStep(context: ResearchContext, availableData: any): string {
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    
    if (!executionPlan || !executionPlan.steps || executionPlan.steps.length === 0) {
      // Provide intelligent guidance based on current state
      const guidance = this.getIntelligentNextStepGuidance(availableData);
      return `📋 No formal execution plan - ${guidance}`;
    }
    
    // Build pipeline progress visualization
    const pipelineProgress: string[] = [];
    let nextStep: any = null;
    let remainingSteps: string[] = [];
    
    for (const step of executionPlan.steps) {
      const agentName = this.normalizeToolName(step.agent);
      const isCompleted = this.calledAgents.has(agentName);
      
      if (isCompleted) {
        pipelineProgress.push(`✅ ${agentName}`);
      } else if (!nextStep) {
        nextStep = { ...step, normalizedName: agentName };
        pipelineProgress.push(`→ ${agentName} (NEXT)`);
        remainingSteps.push(agentName);
      } else {
        pipelineProgress.push(`⏳ ${agentName}`);
        remainingSteps.push(agentName);
      }
    }
    
    // Build comprehensive guidance
    let guidance = `\n📊 **PIPELINE PROGRESS**:\n${pipelineProgress.join(' → ')}\n\n`;
    
    if (nextStep) {
      guidance += `🎯 **IMMEDIATE NEXT STEP**:\n`;
      guidance += `- Agent: ${nextStep.normalizedName}\n`;
      guidance += `- Action: ${nextStep.action}\n`;
      guidance += `- Purpose: ${nextStep.reasoning}\n\n`;
      guidance += `**CRITICAL**: Call ${nextStep.normalizedName} now to continue the pipeline.\n`;
      
      if (remainingSteps.length > 1) {
        guidance += `\n📋 **Remaining Pipeline**: ${remainingSteps.join(' → ')}\n`;
      }
      
      // Add skip awareness
      if (context.sharedKnowledge?.lastSkippedAgent) {
        guidance += `\n⚠️ **Note**: ${context.sharedKnowledge.lastSkippedAgent.agent} was skipped (already executed). Continue with ${nextStep.normalizedName}.\n`;
      }
    } else {
      guidance += `✅ **All planned steps completed** - Pipeline execution finished.\n`;
      guidance += `Consider: ${executionPlan.fallbackOptions?.join(', ') || 'final synthesis or completion'}.\n`;
    }
    
    return guidance;
  }
  
  /**
   * 🎯 Get synthesis guidance when data is ready
   */
  private getSynthesisGuidance(availableData: any, context: ResearchContext): string {
    const dataAnalyzerCompleted = availableData.agentsCalled.includes('DataAnalyzer');
    const extractorCompleted = availableData.patternGeneratorCompleted;
    const synthesisStarted = availableData.agentsCalled.includes('SynthesisCoordinator') || 
                             availableData.agentsCalled.includes('Synthesizer') ||
                             availableData.agentsCalled.includes('ResponseFormatter');
    
    // Check if we have data ready for synthesis
    const hasAnalyzedData = context.analyzedData?.cleaned && context.analyzedData.cleaned.length > 0;
    const hasExtractedData = context.extractedData?.raw && context.extractedData.raw.length > 0;
    const dataReady = hasAnalyzedData || hasExtractedData;
    
    if (dataReady && !synthesisStarted) {
      // Data is ready but synthesis hasn't started
      return `
🚨 **SYNTHESIS READY**: Data has been extracted and processed. Time to synthesize the final answer!
- DataAnalyzer: BYPASSED ⚠️ (Agent disabled due to filtering bug)
- Extracted Data: ${hasExtractedData ? 'READY ✅' : 'Not available'}
- Raw Data Pipeline: Direct extraction → synthesis (DataAnalyzer skipped)

**RECOMMENDED NEXT STEP**: Call SynthesisCoordinator to work with raw extracted data
**ALTERNATIVE**: Call ResponseFormatter if synthesis coordination not needed
`;
    }
    
    if (synthesisStarted && !availableData.hasFinalAnswer) {
      // Synthesis started but not complete
      return `
⏳ **SYNTHESIS IN PROGRESS**: Continue with synthesis pipeline
- SynthesisCoordinator: ${availableData.agentsCalled.includes('SynthesisCoordinator') ? 'CALLED ✅' : 'Available'}
- ResponseFormatter: ${availableData.agentsCalled.includes('ResponseFormatter') ? 'CALLED ✅' : 'Ready to format final answer'}

**NEXT**: ${!availableData.agentsCalled.includes('ResponseFormatter') ? 'Call ResponseFormatter to enhance and format the final answer' : 'Check if synthesis is complete'}
`;
    }
    
    return ''; // No specific synthesis guidance needed
  }
  
  /**
   * 📊 Get pipeline phase status for better visibility
   */
  private getPipelinePhaseStatus(availableData: any): string {
    const phases = [];
    
    // Phase 1: Analysis
    if (availableData.dataInspectorCompleted) {
      phases.push('✅ Phase 1: Analysis (DataInspector) - COMPLETE');
    } else {
      phases.push('⏳ Phase 1: Analysis (DataInspector) - PENDING');
    }
    
    // Phase 2: Planning
    if (availableData.planningAgentCompleted) {
      phases.push('✅ Phase 2: Planning (PlanningAgent) - COMPLETE');
    } else if (availableData.dataInspectorCompleted) {
      phases.push('→ Phase 2: Planning (PlanningAgent) - READY');
    } else {
      phases.push('⏳ Phase 2: Planning (PlanningAgent) - WAITING');
    }
    
    // Phase 3: Pattern & Extraction
    if (availableData.patternGeneratorCompleted) {
      phases.push('✅ Phase 3: Extraction (PatternGenerator with integrated extraction) - COMPLETE');
    } else if (availableData.dataInspectorCompleted) {
      phases.push('→ Phase 3: Extraction (PatternGenerator) - READY');
    } else {
      phases.push('⏳ Phase 3: Extraction - WAITING');
    }
    
    // Phase 4: Data Processing (BYPASSED)
    const dataAnalyzerCompleted = false; // DataAnalyzer permanently disabled
    if (availableData.patternGeneratorCompleted) {
      phases.push('⚠️ Phase 4: Data Processing - BYPASSED (DataAnalyzer disabled due to filtering bug)');
    } else {
      phases.push('⏳ Phase 4: Data Processing - WAITING');
    }
    
    // Phase 5: Synthesis
    const synthesisCompleted = availableData.agentsCalled.includes('SynthesisCoordinator') || 
                              availableData.agentsCalled.includes('Synthesizer') ||
                              availableData.agentsCalled.includes('ResponseFormatter');
    
    if (synthesisCompleted) {
      phases.push('✅ Phase 5: Synthesis - COMPLETE');
    } else if (dataAnalyzerCompleted || availableData.patternGeneratorCompleted) {
      phases.push('🎯 Phase 5: Synthesis (SynthesisCoordinator/ResponseFormatter) - READY TO START');
    } else {
      phases.push('⏳ Phase 5: Synthesis - WAITING');
    }
    
    return phases.join('\n');
  }
  
  /**
   * 🧠 Intelligent guidance when no plan exists
   */
  private getIntelligentNextStepGuidance(availableData: any): string {
    // Provide state-aware guidance without hardcoding
    if (!availableData.dataInspectorCompleted) {
      return 'DataInspector recommended for document analysis';
    }
    if (!availableData.planningAgentCompleted && availableData.dataInspectorCompleted) {
      return 'PlanningAgent recommended to create execution strategy';
    }
    if (!availableData.patternGeneratorCompleted && availableData.dataInspectorCompleted) {
      return 'PatternGenerator recommended for extraction patterns';
    }
    if (!availableData.synthesizerCompleted && availableData.patternGeneratorCompleted) {
      return 'SynthesisCoordinator recommended to synthesize extracted data from PatternGenerator';
    }
    if (availableData.patternGeneratorCompleted && !availableData.synthesizerCompleted) {
      // Check for synthesis agents
      if (this.registry.has('SynthesisCoordinator')) {
        return 'SynthesisCoordinator recommended to orchestrate final synthesis';
      }
      return 'Synthesizer recommended to create final answer';
    }
    return 'use intelligent decision making based on current state';
  }
  
  /**
   * 🔍 Check if execution plan has remaining steps
   */
  private hasRemainingPlanSteps(context: ResearchContext): boolean {
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    
    if (!executionPlan || !executionPlan.steps) {
      return false;
    }
    
    // Check if any planned steps are not completed (with name normalization)
    return executionPlan.steps.some((step: PlanStep) => {
      const normalizedName = this.normalizeToolName(step.agent);
      return !this.calledAgents.has(normalizedName);
    });
  }
  
  /**
   * 📊 Get execution plan status for master prompt
   */
  private getExecutionPlanStatus(context: ResearchContext): string {
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    
    if (!executionPlan) {
      return 'NOT CREATED ❌ - PlanningAgent not called yet';
    }
    
    const totalSteps = executionPlan.steps.length;
    const completedSteps = executionPlan.steps.filter((step: PlanStep) => 
      this.calledAgents.has(step.agent)
    ).length;
    
    if (completedSteps === totalSteps) {
      return `COMPLETED ✅ - All ${totalSteps} planned steps executed`;
    }
    
    const currentStep = executionPlan.steps.find((step: PlanStep) => 
      !this.calledAgents.has(step.agent)
    );
    
    return `IN PROGRESS 🔄 - ${completedSteps}/${totalSteps} steps done, next: ${currentStep?.agent || 'unknown'}`;
  }
  
  /**
   * 💡 Get execution plan guidance for master prompt - provides specific next step recommendations
   */
  private getExecutionPlanGuidance(context: ResearchContext): string {
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    
    if (!executionPlan) {
      return 'Call PlanningAgent first to create execution plan.';
    }
    
    const nextStep = executionPlan.steps.find((step: PlanStep) => 
      !this.calledAgents.has(step.agent)
    );
    
    if (!nextStep) {
      return 'All planned steps completed. Call Synthesizer to generate final answer.';
    }
    
    return `Next recommended step: Call ${nextStep.agent}`;
  }

  /**
   * Set or update progress callback for UI updates
   */
  setProgressCallback(callback: AgentProgressCallback) {
    this.progressCallback = callback;
    this.progressTracker.setCallback(callback);
    // Only create proxy if not already initialized to prevent spam
    if (!this.progressProxyInitialized) {
      this.createProgressProxy();
    }
  }
  
  /**
   * 🔥 FIX: Create proxy progress callback that routes calls through progressTracker
   * This ensures progress history is properly accumulated for real-time display
   */
  public createProgressProxy() {
    // Prevent multiple proxy creations
    if (this.progressProxyInitialized) {
      console.log(`⚠️ Progress proxy already initialized, skipping creation`);
      return;
    }
    
    console.log(`🔥 Creating progress proxy to route agent progress through progressTracker...`);
    
    // Create a proxy callback that intercepts agent progress calls
    const proxyCallback: AgentProgressCallback = {
      onAgentStart: (agentName: string, agentType: string, input: any) => {
        console.log(`🚀 Progress Proxy: ${agentName} started`);
        console.log(`🏃 AGENT TRACKING [${this.instanceId}]: Adding ${agentName} to runningAgents. Set size before: ${this.runningAgents.size}`);
        // Track running agent
        this.runningAgents.add(agentName);
        console.log(`🏃 AGENT TRACKING [${this.instanceId}]: Set size after adding: ${this.runningAgents.size}, agents: [${Array.from(this.runningAgents).join(', ')}]`);
        // Forward to UI callback immediately (ResearchOrchestrator pattern)
        this.progressCallback?.onAgentStart?.(agentName, agentType, input);
      },
      onAgentProgress: async (agentName: string, progress: number, stage?: string, itemsProcessed?: number, totalItems?: number): Promise<void> => {
        console.log(`📊 Progress Proxy: ${agentName} - ${progress}% ${stage ? `(${stage})` : ''}`);
        
        // 🎯 CRITICAL: Route through progressTracker to build progress history
        await this.progressTracker.updateProgress(agentName, progress, stage, itemsProcessed, totalItems);
        
        // 🔥 IMMEDIATE UI UPDATE: Forward to original callback for real-time display (ResearchOrchestrator pattern)
        if (this.progressCallback?.onAgentProgress) {
          console.log(`🔥 Progress Proxy: Forwarding to UI callback - ${agentName} ${progress}% ${stage || ''}`);
          this.progressCallback.onAgentProgress(agentName, progress, stage, itemsProcessed, totalItems);
        } else {
          console.warn(`⚠️ Progress Proxy: No UI callback available for ${agentName} progress update`);
        }
      },
      onAgentThinking: async (agentName: string, thinking: any): Promise<void> => {
        console.log(`🤔 Progress Proxy: ${agentName} thinking`);
        await this.progressTracker.setThinking(agentName, thinking);
        this.progressCallback?.onAgentThinking?.(agentName, thinking);
      },
      onAgentComplete: (agentName: string, output: any, metrics?: any) => {
        console.log(`✅ Progress Proxy: ${agentName} completed`);
        console.log(`🏃 AGENT TRACKING [${this.instanceId}]: Removing ${agentName} from runningAgents. Set size before: ${this.runningAgents.size}`);
        // Remove from running agents
        this.runningAgents.delete(agentName);
        console.log(`🏃 AGENT TRACKING [${this.instanceId}]: Set size after removal: ${this.runningAgents.size}, agents: [${Array.from(this.runningAgents).join(', ')}]`);
        // Forward to UI callback immediately (ResearchOrchestrator pattern)
        this.progressCallback?.onAgentComplete?.(agentName, output, metrics);
      },
      onAgentError: async (agentName: string, error: string, retryCount?: number): Promise<void> => {
        console.log(`❌ Progress Proxy: ${agentName} error - ${error}`);
        console.log(`🏃 AGENT TRACKING [${this.instanceId}]: Removing ${agentName} from runningAgents (error). Set size before: ${this.runningAgents.size}`);
        // Remove from running agents on error
        this.runningAgents.delete(agentName);
        console.log(`🏃 AGENT TRACKING [${this.instanceId}]: Set size after error removal: ${this.runningAgents.size}, agents: [${Array.from(this.runningAgents).join(', ')}]`);
        await this.progressTracker.errorAgent(agentName, error);
        this.progressCallback?.onAgentError?.(agentName, error, retryCount);
      }
    };
    
    // 🎯 CRITICAL FIX: Update progressTracker to use the proxy callback 
    // This ensures that when Orchestrator calls progressTracker.startAgent(), 
    // it goes through the proxy and adds agents to runningAgents Set
    console.log(`🔧 Updating progressTracker to use proxy callback for agent tracking`);
    this.progressTracker.setCallback(proxyCallback);
    
    // Update all registered agents with the proxy callback
    this.updateAgentsWithProgressProxy(proxyCallback);
    this.progressProxyInitialized = true;
    console.log(`🔥 Progress proxy created, progressTracker updated, and ${this.registry.getAllAgents().length} agents updated`);
  }
  
  /**
   * Update all agents to use the progress proxy callback
   */
  private updateAgentsWithProgressProxy(proxyCallback: AgentProgressCallback) {
    const allAgents = this.registry.getAllAgents();
    let updatedCount = 0;
    
    for (const agent of allAgents) {
      // Check if agent has progressCallback property and update it
      if (agent && typeof agent === 'object' && 'progressCallback' in agent) {
        (agent as any).progressCallback = proxyCallback;
        updatedCount++;
      }
    }
    
    console.log(`🔥 Progress proxy update complete: ${updatedCount}/${allAgents.length} agents updated`);
  }
  
  /**
   * 🧠 MASTER LLM ORCHESTRATOR - Intelligent Tool-Call System
   * Replaces rigid pipeline with Claude Code style intelligent decisions
   */
  async research(query: string, ragResults?: SourceReference[]): Promise<string> {
    console.log(`🧠 Master LLM Orchestrator starting for: "${query}"`);
    
    // 🔥 RESET: Clear agent state for new research session
    this.calledAgents.clear();
    this.agentResults.clear();
    this.lastAgentCalled = null;
    this.retryingAgents.clear();
    this.agentInputSignatures.clear();
    this.agentRerunCount.clear();
    this.agentRetryCount.clear();
    this.progressTracker.clear();
    
    // 🆕 INTEGRATED DOCUMENT DISCOVERY: Handle document fetching internally if no results provided
    let finalRagResults = ragResults;
    if (!finalRagResults && this.vectorStore) {
      console.log(`🎯 Master Orchestrator: Discovering documents for query "${query}"`);
      finalRagResults = await this.discoverAndSampleDocuments(query);
    }
    
    if (!finalRagResults || finalRagResults.length === 0) {
      throw new Error('No documents found for analysis');
    }
    
    // Initialize context
    const context = createInitialContext(query, finalRagResults);
    
    // 🚀 MASTER LLM ORCHESTRATION: Intelligent tool-call decisions
    // DataInspector will be called as a proper agent to perform intelligent analysis
    await this.masterLLMOrchestration(context);
    
    // Return final answer
    console.log(`📝 Master Orchestrator final result:`, {
      hasAnswer: !!context.synthesis.answer,
      answerLength: context.synthesis.answer?.length || 0,
      preview: context.synthesis.answer?.substring(0, 100) || 'No answer'
    });
    
    // Store final context for debug access
    this.finalContext = context;
    
    return context.synthesis.answer || 'Unable to generate an answer from the available information.';
  }

  /**
   * 🆕 INTEGRATED DOCUMENT DISCOVERY: Move document fetching logic from ResearchOrchestrator
   */
  private async discoverAndSampleDocuments(query: string): Promise<SourceReference[]> {
    if (!this.vectorStore) {
      throw new Error('VectorStore not available for document discovery');
    }

    console.log(`🔍 Discovering documents for query: "${query}"`);
    
    // Get user documents metadata (same as ResearchOrchestrator did)
    const documentMetadata = await this.vectorStore.getDocumentMetadata(['userdocs']);
    console.log(`📚 Found ${documentMetadata.length} user documents`);
    
    if (documentMetadata.length === 0) {
      throw new Error('No user documents found');
    }

    // Convert metadata to SourceReference format for DataInspector
    const documentReferences = documentMetadata.map(doc => ({
      id: doc.id || `doc_${Date.now()}`,
      type: 'document' as const,
      title: doc.title,
      url: (doc.metadata as any)?.url || '',
      excerpt: `Document metadata: ${doc.title} - ${doc.chunkCount} chunks available`,
      snippet: `Document metadata: ${doc.title} - ${doc.chunkCount} chunks available`,
      text: `Document metadata: ${doc.title} - ${doc.chunkCount} chunks available`, // For DataInspector compatibility
      similarity: 1.0,
      source: (doc.metadata as any)?.source || 'userdocs',
      sourceType: 'document' as const, // Mark as document metadata for DataInspector
      metadata: {
        ...doc.metadata,
        documentId: doc.id,
        documentType: (doc.metadata as any)?.documentType || 'userdocs',
        chunkCount: doc.chunkCount,
        filename: doc.filename
      }
    }));
    
    console.log(`✅ Master Orchestrator: Prepared ${documentReferences.length} document metadata for DataInspector analysis`);
    return documentReferences;
  }

  /**
   * Sample chunks from documents (moved from ResearchOrchestrator)
   */
  private async sampleChunksFromDocuments(sources: SourceReference[], sampleRatio = 0.3, minChunks = 5): Promise<SourceReference[]> {
    const sampledChunks: SourceReference[] = [];

    for (const source of sources) {
      const documentId = (source.metadata as any)?.documentId;
      if (!documentId || !this.vectorStore) continue;

      try {
        // Get all chunks for this document
        const allChunks = await this.vectorStore.getAllChunks(['userdocs']);
        const documentChunks = allChunks.filter(chunk => chunk.metadata?.documentId === documentId);
        
        // Sample chunks (take percentage or minimum, whichever is larger)
        const targetCount = Math.max(Math.ceil(documentChunks.length * sampleRatio), minChunks);
        const sampled = documentChunks.slice(0, targetCount);

        // Convert chunks to SourceReference format
        for (const chunk of sampled) {
          // DEBUG: Check chunk structure (reduced logging)
          if (chunk.text || chunk.content) {
            console.log(`🔍 Found content in ${source.title}: ${(chunk.text || chunk.content || '').substring(0, 50)}...`);
          }
          
          const extractedText = chunk.text || chunk.content || chunk.excerpt || chunk.snippet || '';
          
          sampledChunks.push({
            id: chunk.id || `chunk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'chunk' as const,
            title: source.title,
            url: source.url,
            excerpt: extractedText.substring(0, 200),
            snippet: extractedText,
            similarity: 1.0,
            source: source.source,
            sourceType: 'chunk' as const,
            metadata: {
              ...source.metadata,
              chunkId: chunk.id,
              chunkIndex: chunk.metadata?.chunkIndex,
              originalText: extractedText,
              source: source.source
            } as any
          });
        }

        console.log(`📄 Sampled ${sampled.length}/${documentChunks.length} chunks from ${source.title}`);
      } catch (error) {
        console.warn(`⚠️ Failed to sample chunks from ${source.title}:`, error);
      }
    }

    return sampledChunks;
  }
  
  /**
   * 🔄 RERUN SPECIFIC AGENT - Targeted Agent Execution with Context Preservation
   * Allows rerunning specific agents without restarting the entire pipeline
   * Now with optional user feedback support for corrections
   */
  async rerunAgent(
    agentName: string, 
    context: ResearchContext, 
    preservedResults?: Map<string, any>,
    userFeedback?: UserFeedback
  ): Promise<ResearchContext> {
    console.log(`🔄 Rerunning agent: ${agentName}`, {
      hasFeedback: !!userFeedback,
      feedbackType: userFeedback?.correctionType
    });
    
    // Validate agent exists
    const agent = this.registry.get(agentName);
    if (!agent) {
      throw new Error(`Agent ${agentName} not found in registry`);
    }
    
    // For reruns, check if context has the needed data instead of strict agent dependencies
    const contextValidation = this.validateContextForRerun(agentName, context);
    if (!contextValidation.isValid) {
      throw new Error(`Cannot rerun ${agentName}: ${contextValidation.reason}`);
    }
    
    // If user feedback is provided, inject it into the context
    if (userFeedback) {
      console.log(`📝 Injecting user feedback into context for ${agentName}`);
      context.rerunMetadata = {
        isRerun: true,
        previousRunId: context.metadata.startTime.toString(),
        userFeedback: userFeedback,
        timestamp: Date.now(),
        attemptNumber: (context.rerunMetadata?.attemptNumber || 0) + 1
      };
    }
    
    // Restore preserved results if provided
    if (preservedResults) {
      this.agentResults.clear();
      preservedResults.forEach((result, agentName) => {
        this.agentResults.set(agentName, result);
        this.calledAgents.add(agentName);
      });
      console.log(`🔄 Restored ${preservedResults.size} previous agent results`);
    }
    
    // Remove the target agent from called agents to allow rerun
    this.calledAgents.delete(agentName);
    this.agentResults.delete(agentName);
    
    // Clear downstream results that depend on this agent
    this.clearDependentAgentResults(agentName, context);
    
    // Execute the specific agent
    try {
      console.log(`⚡ Executing agent: ${agentName} ${userFeedback ? 'with feedback' : 'normally'}`);
      await this.executeToolCall(agentName, context);
      
      console.log(`✅ Successfully reran agent: ${agentName}`);
      
      // Clear feedback from context after successful rerun
      if (userFeedback && context.rerunMetadata) {
        console.log(`🧹 Clearing feedback from context after successful rerun`);
        delete context.rerunMetadata.userFeedback;
      }
      
      return context;
    } catch (error) {
      console.error(`❌ Failed to rerun agent ${agentName}:`, error);
      throw error;
    }
  }
  
  /**
   * 🔍 VALIDATE AGENT DEPENDENCIES - Ensure prerequisites are met
   */
  private validateAgentDependencies(agentName: string, context: ResearchContext): string[] {
    const missing: string[] = [];
    
    // Define dependency chain
    const dependencies: Record<string, string[]> = {
      'DataInspector': [], // No dependencies
      'PlanningAgent': ['DataInspector'],
      'PatternGenerator': ['DataInspector', 'PlanningAgent'], 
      'Extractor': ['DataInspector', 'PatternGenerator'],
      // Require extraction before synthesis to avoid empty outputs
      'SynthesisCoordinator': ['Extractor'],
      'Synthesizer': ['Extractor'],
    };
    
    const requiredDeps = dependencies[agentName] || [];
    
    for (const dep of requiredDeps) {
      if (!this.calledAgents.has(dep)) {
        missing.push(dep);
      }
    }
    
    return missing;
  }

  /**
   * 🎯 INTELLIGENT RERUN: Validate and auto-restore missing dependencies for agent reruns
   */
  private validateContextForRerun(agentName: string, context: ResearchContext): {isValid: boolean, reason: string} {
    console.log(`🔍 Validating rerun for ${agentName}...`);
    
    switch (agentName) {
      case 'DataInspector':
        // DataInspector needs RAG chunks - always available from search
        if (!context.ragResults?.chunks || context.ragResults.chunks.length === 0) {
          return {isValid: false, reason: 'No RAG chunks available'};
        }
        break;
        
      case 'PlanningAgent':
        // PlanningAgent needs DataInspector results - auto-restore if missing
        if (!context.documentAnalysis && !context.sharedKnowledge.documentInsights) {
          const dataInspectorResult = this.agentResults.get('DataInspector');
          if (dataInspectorResult?.documentAnalysis) {
            console.log(`🔄 Auto-restoring document analysis for PlanningAgent rerun`);
            context.documentAnalysis = dataInspectorResult.documentAnalysis;
            context.sharedKnowledge.documentInsights = dataInspectorResult.documentInsights;
          } else {
            return {isValid: false, reason: 'No document analysis available from DataInspector'};
          }
        }
        break;
        
      case 'PatternGenerator':
        // PatternGenerator needs DataInspector insights - auto-restore if missing
        const hasStrategy = context.sharedKnowledge.extractionStrategies && 
                           Object.keys(context.sharedKnowledge.extractionStrategies).length > 0;
        const hasInsights = context.sharedKnowledge.documentInsights && 
                           Object.keys(context.sharedKnowledge.documentInsights).length > 0;
        const hasRagChunks = context.ragResults?.chunks && context.ragResults.chunks.length > 0;
        
        if (!hasStrategy && !hasInsights && !hasRagChunks) {
          // Try to restore from previous results
          const dataInspectorResult = this.agentResults.get('DataInspector');
          if (dataInspectorResult?.documentInsights) {
            console.log(`🔄 Auto-restoring document insights for PatternGenerator rerun`);
            context.sharedKnowledge.documentInsights = dataInspectorResult.documentInsights;
          } else {
            return {isValid: false, reason: 'No extraction strategy, document insights, or RAG chunks available'};
          }
        }
        break;
        
      case 'Extractor':
        // Extractor needs patterns from PatternGenerator - auto-restore if missing
        if (!context.patterns || context.patterns.length === 0) {
          const patternGenResult = this.agentResults.get('PatternGenerator');
          if (patternGenResult?.patterns) {
            console.log(`🔄 Auto-restoring ${patternGenResult.patterns.length} patterns for Extractor rerun`);
            context.patterns = patternGenResult.patterns;
          } else {
            return {isValid: false, reason: 'No patterns available from PatternGenerator'};
          }
        }
        break;
        
      case 'SynthesisCoordinator':
      case 'Synthesizer':
        // Synthesis agents need extracted data - auto-restore if missing
        if ((!context.extractedData || context.extractedData.raw.length === 0) && 
            (!context.ragResults?.chunks || context.ragResults.chunks.length === 0)) {
          const extractorResult = this.agentResults.get('Extractor');
          if (extractorResult?.extractedData) {
            console.log(`🔄 Auto-restoring ${extractorResult.extractedData.raw.length} extracted items for synthesis rerun`);
            context.extractedData = extractorResult.extractedData;
          } else {
            return {isValid: false, reason: 'No extracted data or RAG chunks for synthesis'};
          }
        }
        break;
        
      // BYPASSED: DataAnalyzer case removed - agent disabled due to filtering bug
      // case 'DataAnalyzer':
        // DataAnalyzer needs extracted data - auto-restore if missing
        // if (!context.extractedData || context.extractedData.raw.length === 0) {
          // const extractorResult = this.agentResults.get('Extractor');
          // if (extractorResult?.extractedData) {
            // console.log(`🔄 Auto-restoring ${extractorResult.extractedData.raw.length} extracted items for DataAnalyzer rerun`);
            // context.extractedData = extractorResult.extractedData;
          // } else {
            // return {isValid: false, reason: 'No extracted data available'};
          // }
        // }
        // break;
        
      default:
        // For unknown agents, allow rerun
        break;
    }
    
    return {isValid: true, reason: ''};
  }
  
  /**
   * 🧹 CLEAR DEPENDENT AGENT RESULTS - Remove downstream agents that depend on the rerun agent
   */
  private clearDependentAgentResults(agentName: string, context: ResearchContext): void {
    // Define what agents depend on each agent
    const dependents: Record<string, string[]> = {
      'DataInspector': ['PlanningAgent', 'PatternGenerator', 'SynthesisCoordinator', 'Synthesizer'],
      'PlanningAgent': ['PatternGenerator'],
      'PatternGenerator': ['SynthesisCoordinator', 'Synthesizer'],
      'SynthesisCoordinator': [],
      'Synthesizer': [],
    };
    
    const toRemove = dependents[agentName] || [];
    
    for (const depAgent of toRemove) {
      if (this.calledAgents.has(depAgent)) {
        console.log(`🧹 Clearing dependent agent result: ${depAgent}`);
        this.calledAgents.delete(depAgent);
        this.agentResults.delete(depAgent);
        
        // Clear relevant context based on agent type
        if (depAgent === 'SynthesisCoordinator' || depAgent === 'Synthesizer') {
          context.synthesis.answer = '';
          context.synthesis.confidence = 0;
        }
      }
    }
  }
  
  /**
   * 💾 CREATE CONTEXT SNAPSHOT - Save current agent results for rerun operations
   */
  createContextSnapshot(): { 
    calledAgents: Set<string>, 
    agentResults: Map<string, any>,
    context: Partial<ResearchContext>
  } {
    return {
      calledAgents: new Set(this.calledAgents),
      agentResults: new Map(this.agentResults),
      context: {
        // Add any context state that needs preservation
        synthesis: { answer: '', confidence: 0, reasoning: '', structure: 'paragraph' },
        sharedKnowledge: {
          documentInsights: {},
          extractionStrategies: {},
          discoveredPatterns: {},
          agentFindings: {}
        }
      }
    };
  }
  
  /**
   * 🧠 MASTER LLM ORCHESTRATION - Intelligent Tool-Call System
   * Makes dynamic decisions about which tools to call and when, like Claude Code/Cursor
   */
  private async masterLLMOrchestration(context: ResearchContext): Promise<void> {
    console.log(`🎯 Master LLM analyzing situation and planning tool calls...`);
    
    let iterationCount = 0;
    const maxIterations = 30;
    this.ensureActiveMicroSession(context);
    
    while (iterationCount < maxIterations) {
      iterationCount++;
      
      if (this.isFullPipelineComplete(context)) {
        console.log('✅ All required pipeline stages completed - stopping orchestration');
        this.finishMicroSession('completed');
        break;
      }
      
      const currentGoal = this.getCurrentGoal(context);
      console.log(`🔄 Master LLM Iteration ${iterationCount}: ${currentGoal}`);
      
      const decision = await this.makeMasterLLMDecision(context, currentGoal, iterationCount);
      
      if (decision.action === 'COMPLETE') {
        if (decision.toolName) {
          console.log(`🔧 Master LLM returned COMPLETE with toolName - treating as CALL_TOOL: ${decision.toolName}`);
          await this.executeToolCallWithMicroSession(decision.toolName, context);
          this.ensureActiveMicroSession(context);
          continue;
        }
        
        const canComplete = this.validateCompletionConditions(context);
        if (canComplete.allowed) {
          console.log(`✅ Master LLM completed goal: ${decision.reasoning || 'Task complete'}`);
          this.finishMicroSession('completed');
          break;
        }
        
        console.log(`⚠️ Master LLM tried to complete prematurely: ${canComplete.reason}`);
        if (canComplete.nextAgent) {
          console.log(`🔄 Forcing continuation with required agent: ${canComplete.nextAgent}`);
          await this.executeToolCallWithMicroSession(canComplete.nextAgent, context);
          this.ensureActiveMicroSession(context);
          continue;
        }
      } else if (decision.action === 'CALL_TOOL') {
        await this.executeToolCallWithMicroSession(decision.toolName, context);
      } else if (/^COMP?LETE$/i.test(decision.action) || /^(DONE|FINISH|END)$/i.test(decision.action)) {
        const canComplete = this.validateCompletionConditions(context);
        if (canComplete.allowed) {
          console.log(`✅ Master LLM completed goal: ${decision.reasoning || 'Task complete'}`);
          this.finishMicroSession('completed');
          break;
        }
        console.log(`⚠️ Completion denied: ${canComplete.reason}`);
        if (canComplete.nextAgent) {
          await this.executeToolCallWithMicroSession(canComplete.nextAgent, context);
          this.ensureActiveMicroSession(context);
          continue;
        }
      } else {
        const possibleToolName = this.normalizeToolName(decision.action);
        if (this.registry.get(possibleToolName)) {
          console.log(`🔧 Master LLM returned tool name directly: ${decision.action} → ${possibleToolName}`);
          await this.executeToolCallWithMicroSession(possibleToolName, context);
        } else {
          console.error(`❌ Master LLM made invalid decision: ${decision.action}`);
          console.error(`🐛 Full decision:`, decision);
          break;
        }
      }
      
      this.ensureActiveMicroSession(context);
    }
    
    if (iterationCount >= maxIterations) {
      console.warn(`⚠️ Master LLM reached maximum iterations (${maxIterations})`);
    }
  }
  
  /**
   * Ensure a micro-session is active before orchestrating additional steps.
   */
  private ensureActiveMicroSession(context: ResearchContext): void {
    if (this.currentMicroSession) {
      return;
    }
    const goal = this.determineNextMicroSessionGoal(context);
    this.startMicroSession(goal);
  }

  private startMicroSession(goal: string): void {
    this.currentMicroSession = {
      id: `micro-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      goal,
      startTime: Date.now(),
      status: 'active',
      agentCallsInSession: new Map(),
      maxAttemptsPerAgent: this.defaultMicroSessionLimit,
    };
    console.log(`🎯 Starting micro-session: "${goal}"`);
  }

  private finishMicroSession(status: MicroSessionStatus): void {
    if (!this.currentMicroSession) {
      return;
    }
    const snapshot: MicroSession = {
      ...this.currentMicroSession,
      status,
      agentCallsInSession: new Map(this.currentMicroSession.agentCallsInSession),
    };
    this.microSessionHistory.push(snapshot);
    console.log(`🧾 Micro-session "${snapshot.goal}" finished with status: ${status}`);
    this.currentMicroSession = null;
  }

  private getCurrentGoal(context: ResearchContext): string {
    if (!this.currentMicroSession) {
      this.ensureActiveMicroSession(context);
    }
    return this.currentMicroSession?.goal || `Answer the user's query: "${context.query}"`;
  }

  private determineNextMicroSessionGoal(context: ResearchContext): string {
    const hasAnalysis = this.calledAgents.has('DataInspector') || (context.documentAnalysis?.documents?.length ?? 0) > 0;
    const hasPatterns = this.hasMeaningfulPatterns(context);
    const hasData = this.hasExtractedData(context);
    const hasDraft = this.hasSynthesisDraft(context);

    if (!hasAnalysis) {
      return 'Analyze document structure and relevance';
    }
    if (!hasPatterns) {
      return 'Generate extraction patterns from document insights';
    }
    if (!hasData) {
      return 'Extract structured data using generated patterns';
    }
    if (!hasDraft) {
      return 'Synthesize findings into final response';
    }
    return 'Format and finalize response for delivery';
  }

  private hasMeaningfulPatterns(context: ResearchContext): boolean {
    if (context.patterns && context.patterns.length > 0) {
      return true;
    }
    const discovered = context.sharedKnowledge?.discoveredPatterns;
    return discovered ? Object.keys(discovered).length > 0 : false;
  }

  private async executeToolCallWithMicroSession(toolName: string, context: ResearchContext): Promise<void> {
    this.ensureActiveMicroSession(context);
    const normalizedToolName = this.enforceAgentProgression(toolName, context);

    let attempt = this.canCallAgentInMicroSession(normalizedToolName);
    if (!attempt.allowed) {
      console.warn(`⚠️ ${attempt.reason}`);
      this.finishMicroSession('failed');
      this.ensureActiveMicroSession(context);
      attempt = this.canCallAgentInMicroSession(normalizedToolName);
      if (!attempt.allowed) {
        throw new Error(attempt.reason);
      }
    }

    this.recordMicroSessionCall(normalizedToolName);
    await this.executeToolCall(normalizedToolName, context);

    if (this.isMicroSessionGoalAchieved(normalizedToolName, context)) {
      this.finishMicroSession('completed');
    }
  }

  private canCallAgentInMicroSession(agentName: string): { allowed: boolean; reason: string } {
    if (!this.currentMicroSession) {
      return { allowed: true, reason: 'No active micro-session' };
    }

    const calls = this.currentMicroSession.agentCallsInSession.get(agentName) ?? 0;
    const limit = this.microSessionLimits[agentName] ?? this.currentMicroSession.maxAttemptsPerAgent ?? this.defaultMicroSessionLimit;

    if (calls >= limit) {
      return {
        allowed: false,
        reason: `Agent ${agentName} exhausted ${limit} attempts in micro-session "${this.currentMicroSession.goal}"`,
      };
    }

    return {
      allowed: true,
      reason: `Attempt ${calls + 1}/${limit} in "${this.currentMicroSession.goal}"`,
    };
  }

  private recordMicroSessionCall(agentName: string): void {
    if (!this.currentMicroSession) {
      return;
    }
    const current = this.currentMicroSession.agentCallsInSession.get(agentName) ?? 0;
    this.currentMicroSession.agentCallsInSession.set(agentName, current + 1);

    const globalCalls = this.globalAgentCalls.get(agentName) ?? 0;
    this.globalAgentCalls.set(agentName, globalCalls + 1);
  }

  private isMicroSessionGoalAchieved(agentName: string, context: ResearchContext): boolean {
    if (!this.currentMicroSession) {
      return false;
    }

    const goal = this.currentMicroSession.goal.toLowerCase();
    if (goal.includes('analyze') && agentName === 'DataInspector') {
      return (context.documentAnalysis?.documents?.length ?? 0) > 0;
    }
    if (goal.includes('pattern') && agentName === 'PatternGenerator') {
      return this.hasMeaningfulPatterns(context);
    }
    if (goal.includes('extract') && (agentName === 'Extractor' || agentName === 'PatternGenerator')) {
      return this.hasExtractedData(context);
    }
    if ((goal.includes('synthesize') || goal.includes('finalize')) &&
        (agentName === 'SynthesisCoordinator' || agentName === 'ResponseFormatter')) {
      return this.hasSynthesisDraft(context);
    }
    return false;
  }

  private enforceAgentProgression(requestedAgent: string, context: ResearchContext): string {
    const normalized = this.normalizeToolName(requestedAgent);
    if (this.lastDecisionAgent === normalized) {
      this.consecutiveSameAgentCount += 1;
      if (this.consecutiveSameAgentCount > this.maxConsecutiveSameAgent) {
        const nextAgent = this.getNextPipelineAgent(context);
        if (nextAgent && nextAgent !== normalized) {
          console.warn(`⚠️ Preventing excessive ${normalized} calls. Switching to ${nextAgent}.`);
          this.lastDecisionAgent = nextAgent;
          this.consecutiveSameAgentCount = 1;
          return nextAgent;
        }
      }
    } else {
      this.lastDecisionAgent = normalized;
      this.consecutiveSameAgentCount = 1;
    }
    return normalized;
  }

  private getNextPipelineAgent(context: ResearchContext): string | null {
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    if (executionPlan?.steps?.length) {
      const pending = executionPlan.steps.find((step: PlanStep) => {
        const normalized = this.normalizeToolName(step.agent);
        return !this.calledAgents.has(normalized);
      });
      if (pending) {
        return this.normalizeToolName(pending.agent);
      }
    }

    for (const agent of this.flowPipelineOrder) {
      if (!this.calledAgents.has(agent)) {
        return agent;
      }
    }

    return null;
  }

  private isFullPipelineComplete(context: ResearchContext): boolean {
    const hasAnalysis = this.calledAgents.has('DataInspector') || (context.documentAnalysis?.documents?.length ?? 0) > 0;
    const hasPatterns = this.hasMeaningfulPatterns(context);
    const hasData = this.hasExtractedData(context);
    const hasDraft = this.hasSynthesisDraft(context);
    return hasAnalysis && hasPatterns && hasData && hasDraft;
  }

  /**
   * 🧠 MASTER LLM DECISION MAKING - Core intelligence
   */
  private async makeMasterLLMDecision(context: ResearchContext, currentGoal: string, iteration: number): Promise<any> {
    // Analyze current state
    const availableData = this.analyzeCurrentState(context);
    
    
    const masterPrompt = `You are a Master LLM Orchestrator making intelligent tool-call decisions like Claude Code/Cursor.

CURRENT GOAL: ${currentGoal}
ITERATION: ${iteration}

🔥 CRITICAL AGENT CALL HISTORY:
- Agents Already Called: ${availableData.agentsCalled.length > 0 ? availableData.agentsCalled.join(', ') : 'NONE'}
- Agents NOT Called: ${availableData.agentsNotCalled.join(', ')}
- Last Agent Called: ${availableData.lastAgentCalled || 'NONE'}
- Total Agent Calls: ${availableData.agentCallCount}

📊 PIPELINE PHASES:
${this.getPipelinePhaseStatus(availableData)}

CURRENT SITUATION:
- Available Documents: ${context.ragResults.chunks.length} chunks PRE-LOADED (no need to search)
- Document Analysis: ${availableData.dataInspectorCompleted ? 'COMPLETED ✅ - DataInspector already called' : 'NOT DONE ❌ - need DataInspector'}
- Execution Plan: ${this.getExecutionPlanStatus(context)}
- Patterns Generated: ${availableData.patternGeneratorCompleted ? `COMPLETED ✅ - PatternGenerator called with integrated extraction, ${availableData.patternsGenerated} patterns` : 'NOT DONE ❌ - need PatternGenerator'}
- Data Extracted: ${availableData.patternGeneratorCompleted ? 'COMPLETED ✅ - Integrated extraction in PatternGenerator' : 'NOT DONE ❌ - need PatternGenerator with extraction'}
- Data Analyzed: BYPASSED ⚠️ - DataAnalyzer disabled (filtering bug), using raw extracted data
- Final Answer: ${availableData.synthesizerCompleted ? 'COMPLETED ✅ - Synthesizer called' : 'NOT DONE ❌ - need synthesis'}${context.sharedKnowledge.lastSkippedAgent ? `

⚠️ IMPORTANT - LAST AGENT WAS SKIPPED:
- Skipped Agent: ${context.sharedKnowledge.lastSkippedAgent.agent}
- Reason: ${context.sharedKnowledge.lastSkippedAgent.reason}
- RECOMMENDED ACTION: ${context.sharedKnowledge.lastSkippedAgent.recommendedNext || 'Continue to next step in execution plan'}
- Pipeline Status: ${context.sharedKnowledge.lastSkippedAgent.planStatus || 'Check execution plan'}

**CRITICAL**: When an agent is skipped because it's already executed, immediately proceed to the next uncompleted agent in the pipeline. Do not retry the skipped agent.` : ''}

🧠 AVAILABLE TOOLS (use intelligently based on context):
${this.buildDynamicToolsList(availableData)}

⚠️ CRITICAL: Use EXACT names above. Do NOT create variations.

⚡ MANDATORY EXECUTION ORDER - NEVER SKIP STEPS:
1️⃣ DataInspector (${availableData.dataInspectorCompleted ? 'DONE ✅' : 'REQUIRED ❌'}) → Analyzes and filters documents  
2️⃣ PlanningAgent (${availableData.planningAgentCompleted ? 'DONE ✅' : availableData.dataInspectorCompleted ? 'NEXT ➡️' : 'BLOCKED ⛔'}) → Creates execution strategy
3️⃣ PatternGenerator (${availableData.patternGeneratorCompleted ? 'DONE ✅' : availableData.planningAgentCompleted ? 'NEXT ➡️' : 'BLOCKED ⛔'}) → Identifies patterns & extracts data
4️⃣ SynthesisCoordinator (${availableData.synthesizerCompleted ? 'DONE ✅' : availableData.patternGeneratorCompleted ? 'NEXT ➡️' : 'BLOCKED ⛔'}) → Synthesizes final answer

🚨 CRITICAL SEQUENCING RULES:
❌ NEVER call SynthesisCoordinator before PatternGenerator
❌ NEVER skip steps in the sequence above
✅ ALWAYS follow the order: DataInspector → PlanningAgent → PatternGenerator → SynthesisCoordinator
🎯 NOTE: PatternGenerator now includes integrated extraction (no separate Extractor call needed)

🎯 INTELLIGENT ORCHESTRATION GUIDANCE:
1. **FOLLOW THE NUMBERED SEQUENCE ABOVE** - Each step depends on the previous one
2. **🔥 CRITICAL: FOLLOW EXECUTION PLAN** if available - The plan is validated and prevents sequencing errors  
3. **PLAN-AWARE DECISIONS** - Your decisions are validated against the execution plan automatically
4. **TRUST THE PLAN** - The PlanningAgent created an intelligent sequence - follow it exactly
5. **AVOID REDUNDANT CALLS** - Don't call the same agent twice unless necessary

🚨 **SPECIAL RULE FOR PERFORMANCE/RANKING QUERIES**:
${this.isPerformanceQuery(context.query) ? `
⭐ **PERFORMANCE RANKING QUERY DETECTED**: "${context.query}"
📊 **MANDATORY FULL PIPELINE**: DataInspector → PlanningAgent → PatternGenerator → SynthesisCoordinator  
🎯 **COMPLETION BLOCKED** until all 4 agents are called - this ensures proper time measurement extraction and ranking
⚠️ **DO NOT COMPLETE EARLY** - Performance queries need the complete extraction pipeline to work correctly
📈 **Current Progress**: DataInspector(${availableData.dataInspectorCompleted ? '✅' : '❌'}) → PlanningAgent(${availableData.planningAgentCompleted ? '✅' : '❌'}) → PatternGenerator(${availableData.patternGeneratorCompleted ? '✅' : '❌'}) → SynthesisCoordinator(${availableData.synthesizerCompleted ? '✅' : '❌'})
` : `
📝 **REGULAR QUERY**: Standard agent pipeline applies - completion allowed after synthesis
`}

📊 CURRENT DATA AVAILABLE:
- Documents: ${availableData.chunksSelected ? `${context.ragResults.chunks.length} chunks available` : 'No documents available'}
- Document Analysis: ${availableData.hasDocumentAnalysis ? 'Available from DataInspector' : 'Not available'}
- Patterns: ${availableData.patternsGenerated > 0 ? `${availableData.patternsGenerated} patterns generated` : 'No patterns generated'}
- Extracted Data: ${availableData.dataExtracted ? 'Data extraction completed' : 'No data extracted yet'}
- Current Answer: ${availableData.hasFinalAnswer ? 'Final answer ready' : 'No final answer yet'}

🤖 INTELLIGENT DECISION:
Based on the goal "${currentGoal}" and available data above, what tool should be called next?

${this.getSynthesisGuidance(availableData, context)}

${availableData.agentCallCount === 0 ? `

🚨 **MANDATORY FIRST CALL**: Since NO agents have been called yet, you MUST start with DataInspector:
- **REQUIRED**: DataInspector to analyze and filter ${context.ragResults.chunks.length} documents
- **Purpose**: Filter relevant documents (e.g., keep person-specific docs, remove irrelevant docs for targeted queries)  
- **Never skip this step** - DataInspector magic filtering is essential

CALL DataInspector first - no exceptions!` : context.ragResults.chunks.length === 0 ? `

🚨 NO DOCUMENTS AVAILABLE: Since no documents are provided, consider these intelligent options:
${this.registry.has('WebSearchAgent') ? `1. **WebSearchAgent** - Search for information about "${context.query}"
2. **Synthesizer** - Provide guidance on what information would be needed
3. **COMPLETE** - If the query can be answered without documents (general knowledge)` : `1. **Synthesizer** - Provide guidance on what information would be needed
2. **COMPLETE** - If the query can be answered without documents (general knowledge)`}

IMPORTANT: Don't give up! Either search for data or explain what's needed.` : `
📊 AVAILABLE DATA & NEXT STEPS:
${!availableData.dataInspectorCompleted ? '🔥 **REQUIRED**: DataInspector must analyze documents first' : ''}
${availableData.dataInspectorCompleted && !availableData.planningAgentCompleted ? '📋 **RECOMMENDED**: PlanningAgent to create intelligent execution strategy' : ''}
${!availableData.patternGeneratorCompleted && availableData.patternsGenerated === 0 ? '⚠️ **DEPENDENCY WARNING**: PatternGenerator must run before Extractor (no extraction patterns available)' : ''}
${availableData.planningAgentCompleted ? `
🎯 **EXECUTION PLAN ACTIVE**: Plan-aware validation is ENABLED
${this.getNextPlannedStep(context, availableData)}

⚠️ **CRITICAL**: Your decision will be validated against this plan. Follow the recommended step to avoid sequencing violations.
` : ''}
${!availableData.planningAgentCompleted && availableData.dataInspectorCompleted ? '\n💡 **OR** make intelligent tool decisions based on document analysis' : ''}`}

🔍 PRE-DECISION VALIDATION CHECKLIST:
Before calling any tool, verify:
✅ The tool is the NEXT step in the execution sequence (1→2→3→4→5)
✅ All prerequisite steps are completed (DONE ✅)
✅ You're not skipping any steps in the mandatory order
✅ The tool you're calling shows "NEXT ➡️" status above

🎯 RESPONSE FORMAT:

To call a tool:
ACTION: CALL_TOOL
TOOL_NAME: [${this.registry.listAgents().map(a => a.name).join('|')}]
REASONING: [explain why this tool is needed for the current goal]
NEXT_GOAL: [what you hope to accomplish]

To complete (DO NOT include TOOL_NAME):
ACTION: COMPLETE
REASONING: [explain what you can provide or what's needed]
NEXT_GOAL: [final goal achieved]`;

    try {
      const response = await this.llm(masterPrompt);
      
      // 🐛 DEBUG: Log full LLM response to understand decision format
      console.log(`🧠 Master LLM Decision Response (${response.length} chars):`, response.substring(0, 500) + (response.length > 500 ? '...' : ''));
      
      const decision = this.parseMasterLLMDecision(response);
      console.log(`🎯 Parsed Decision:`, { action: decision.action, toolName: decision.toolName, reasoning: decision.reasoning?.substring(0, 100) });
      
      // 🧠 TRUST LLM INTELLIGENCE: Let the orchestrator make adaptive decisions
      // Only basic validation - no rigid enforcement
      if (decision.action === 'COMPLETE') {
        console.log(`🎯 Master LLM decided to complete after ${availableData.agentCallCount} agent calls:`, availableData.agentsCalled);
      }
      
      return decision;
    } catch (error) {
      console.error(`❌ Master LLM decision failed:`, error);
      throw new Error(`Master LLM orchestration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * 🔥 CRITICAL: Validate completion conditions based on execution plan
   */
  private validateCompletionConditions(context: ResearchContext): { allowed: boolean; reason: string; nextAgent?: string } {
    const calledAgents = Array.from(this.calledAgents);
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    
    // RULE 1: Must have called DataInspector first (always required)
    if (!this.calledAgents.has('DataInspector')) {
      return {
        allowed: false,
        reason: 'DataInspector not called - required for document analysis',
        nextAgent: 'DataInspector'
      };
    }
    
    // 🚨 NEW RULE 1.5: Detect performance ranking queries that need full pipeline
    const queryLower = context.query.toLowerCase();
    const isPerformanceQuery = queryLower.includes('top') || queryLower.includes('best') || 
                              queryLower.includes('speedrun') || queryLower.includes('ranking') ||
                              queryLower.includes('fastest') || queryLower.includes('compare');
    
    if (isPerformanceQuery) {
      console.log(`🎯 PERFORMANCE RANKING QUERY DETECTED: "${context.query}"`);
      console.log(`📊 Full pipeline required: DataInspector → PlanningAgent → PatternGenerator → Extractor → SynthesisCoordinator`);
      
      // For performance queries, require the core extraction pipeline
      if (!this.calledAgents.has('PlanningAgent')) {
        return {
          allowed: false,
          reason: 'Performance ranking query requires PlanningAgent for intelligent strategy',
          nextAgent: 'PlanningAgent'
        };
      }
      
      if (!this.calledAgents.has('PatternGenerator')) {
        return {
          allowed: false,
          reason: 'Performance ranking query requires PatternGenerator for measurement patterns',
          nextAgent: 'PatternGenerator'
        };
      }
      
      if (!this.calledAgents.has('PatternGenerator')) {
        return {
          allowed: false,
          reason: 'Performance ranking query requires PatternGenerator with integrated extraction',
          nextAgent: 'PatternGenerator'
        };
      }
      
      if (!this.calledAgents.has('SynthesisCoordinator') && !this.calledAgents.has('Synthesizer')) {
        return {
          allowed: false,
          reason: 'Performance ranking query requires SynthesisCoordinator for ranking results',
          nextAgent: 'SynthesisCoordinator'
        };
      }
      
      // Additional validation: Check if we have extracted data for ranking
      const hasExtractedData = context.extractedData?.raw?.length > 0;
      if (!hasExtractedData && this.calledAgents.has('PatternGenerator')) {
        console.log(`⚠️ EXTRACTION FAILED: PatternGenerator called but no data extracted - allowing completion to prevent infinite loop`);
      }
      
      console.log(`✅ PERFORMANCE QUERY PIPELINE COMPLETE: All required agents called for ranking query`);
    }
    
    // RULE 2: If we have an execution plan, follow it
    if (executionPlan && executionPlan.steps && executionPlan.steps.length > 0) {
      // Check if all planned steps are completed
      const remainingSteps = executionPlan.steps.filter((step: PlanStep) => 
        !this.calledAgents.has(step.agent)
      );
      
      if (remainingSteps.length > 0) {
        const nextStep = remainingSteps[0];
        return {
          allowed: false,
          reason: `Execution plan incomplete - ${remainingSteps.length} steps remaining`,
          nextAgent: nextStep.agent
        };
      }
      
      // 🔥 CRITICAL FIX: Check if synthesis has been attempted and has results
      const synthesizerCalled = this.calledAgents.has('Synthesizer');
      const coordinatorCalled = this.calledAgents.has('SynthesisCoordinator');
      const synthesisCompleted = synthesizerCalled || coordinatorCalled;
      
      // 🔧 ENHANCED: Check for extracted data availability 
      const hasExtractedData = context.extractedData?.raw?.length > 0;
      const extractorCalled = this.calledAgents.has('PatternGenerator');
      
      console.log(`🔍 COMPLETION CHECK:`, {
        synthesizerCalled,
        coordinatorCalled, 
        extractorCalled,
        hasExtractedData,
        extractedItemCount: context.extractedData?.raw?.length || 0,
        answerLength: context.synthesis?.answer?.length || 0
      });
      
      // 🚨 EMERGENCY FIX: If synthesis was attempted but answer is still terrible, allow completion 
      // to prevent infinite loops - better to show bad answer than infinite loop
      if (synthesisCompleted) {
        const answerExists = context.synthesis?.answer && context.synthesis.answer.length > 0;
        if (answerExists) {
          console.log(`✅ COMPLETION ALLOWED: Synthesis attempted and produced answer (${context.synthesis.answer.length} chars) - preventing infinite loop`);
          return {
            allowed: true,
            reason: `Synthesis completed - answer available (${context.synthesis.answer.length} chars)`
          };
        } else {
          // 🔥 CRITICAL FIX: If synthesis ran but no answer, still allow completion to prevent infinite loop
          console.log(`⚠️ COMPLETION FORCED: SynthesisCoordinator ran but no answer - preventing infinite loop`);
          return {
            allowed: true,
            reason: 'SynthesisCoordinator completed but no answer - preventing infinite loop'
          };
        }
      }
      
      // If we have extracted data and synthesis not called yet, try synthesis first
      if (hasExtractedData && !synthesisCompleted) {
        console.log(`🔄 SYNTHESIS NEEDED: Have ${context.extractedData.raw.length} extracted items but no synthesis yet`);
        return {
          allowed: false,
          reason: `Have extracted data (${context.extractedData.raw.length} items) - need synthesis`,
          nextAgent: 'SynthesisCoordinator'
        };
      }
      
      // 🚨 FALLBACK: If all else fails, allow completion to prevent infinite loops
      console.log(`⚠️ EMERGENCY COMPLETION: All synthesis attempts completed - preventing infinite loop`);
      return {
        allowed: true,
        reason: 'All synthesis attempts completed - preventing infinite loop'
      };
    }
    
    // RULE 3: No execution plan - use intelligent fallback sequencing
    // Ensure PlanningAgent is called after DataInspector
    if (!this.calledAgents.has('PlanningAgent')) {
      return {
        allowed: false,
        reason: 'PlanningAgent not called - need execution strategy',
        nextAgent: 'PlanningAgent'
      };
    }
    
    // Ensure PatternGenerator runs before Synthesizer
    if (!this.calledAgents.has('PatternGenerator')) {
      return {
        allowed: false,
        reason: 'PatternGenerator not called - must extract data before synthesis',
        nextAgent: 'PatternGenerator'
      };
    }
    
    // Check if we have extracted data
    const hasExtractedData = context.extractedData?.raw && context.extractedData.raw.length > 0;
    
    // If Extractor ran but no data, we might need PatternGenerator
    if (!hasExtractedData && !this.calledAgents.has('PatternGenerator')) {
      return {
        allowed: false,
        reason: 'No data extracted - need PatternGenerator to create extraction patterns',
        nextAgent: 'PatternGenerator'
      };
    }
    
    // Now ensure Synthesizer runs AFTER we have data
    if (!this.calledAgents.has('Synthesizer')) {
      if (hasExtractedData) {
        return {
          allowed: false,
          reason: 'Data extracted - ready for Synthesizer to create final answer',
          nextAgent: 'Synthesizer'
        };
      } else {
        // No data even after extraction attempts - still try synthesizer
        return {
          allowed: false,
          reason: 'Synthesizer not called - required to create final answer',
          nextAgent: 'Synthesizer'
        };
      }
    }
    
    // Check for meaningful answer
    if (!context.synthesis?.answer || context.synthesis.answer.length < 20) {
      // If Synthesizer was called but no answer, might be because it ran too early
      if (!hasExtractedData) {
        return {
          allowed: false,
          reason: 'Synthesizer produced no answer - need to extract data first',
          nextAgent: 'Extractor'
        };
      }
      return {
        allowed: false,
        reason: 'No substantial answer generated',
        nextAgent: 'Synthesizer'
      };
    }
    
    // All conditions met - allow completion
    return {
      allowed: true,
      reason: `Pipeline completed successfully with ${calledAgents.length} agents: ${calledAgents.join(' → ')}`
    };
  }

  /**
   * 🛠️ Build dynamic tools list based on registered agents
   */
  private buildDynamicToolsList(availableData: any): string {
    const registeredAgents = this.registry.listAgents();
    const toolDescriptions: { [key: string]: string } = {
      'QueryPlanner': 'Expands queries based on intent and domain understanding',
      'DataInspector': 'Magic document filtering with enhanced chunk sampling',
      'PlanningAgent': 'Creates intelligent execution strategies',
      'PatternGenerator': 'Creates content-aware patterns for data extraction',
      'Extractor': 'Extracts data using patterns or LLM analysis',
      'WebSearchAgent': 'Expands knowledge base when local data insufficient',
      // New multi-synthesis agents (DataAnalyzer bypassed due to filtering bug)
      // 'DataAnalyzer': 'DISABLED - Agent removed due to catastrophic filtering bug',
      'SynthesisCoordinator': '🆕 Assembles final report from raw extracted data (DataAnalyzer bypassed)',
      // Old synthesis agent (deprecated but kept for fallback)
      'Synthesizer': '⚠️ LEGACY - Use SynthesisCoordinator directly (DataAnalyzer bypassed)',
      'ResponseFormatter': 'Ensures responses directly answer questions with clear formatting'
    };

    return registeredAgents.map(agent => {
      const description = toolDescriptions[agent.name] || agent.description;
      const status = this.calledAgents.has(agent.name) ? 'ALREADY CALLED' : 'available';
      // Highlight the new synthesis flow
      if (agent.name === 'DataAnalyzer' || agent.name === 'SynthesisCoordinator') {
        return `🌟 "${agent.name}" - ${description} (${status})`;
      }
      if (agent.name === 'Synthesizer') {
        return `⚠️ "${agent.name}" - ${description} (${status})`;
      }
      return `✅ "${agent.name}" - ${description} (${status})`;
    }).join('\n');
  }

  /**
   * Get comprehensive agent status (completed, retrying, executing, or not called)
   */
  private getAgentStatus(agentName: string): string {
    if (this.calledAgents.has(agentName)) {
      return 'completed';
    } else if (this.retryingAgents.has(agentName)) {
      return 'retrying';
    } else {
      return 'not_called';
    }
  }

  /**
   * 📊 Analyze current context state for Master LLM decisions
   * 🔥 CRITICAL FIX: Include agent call history to prevent redundant calls
   */
  private analyzeCurrentState(context: ResearchContext): any {
    // Enhanced agent status including execution state
    const agentStatus = {
      DataInspector: this.getAgentStatus('DataInspector'),
      PlanningAgent: this.getAgentStatus('PlanningAgent'),
      PatternGenerator: this.getAgentStatus('PatternGenerator'), 
      Extractor: this.getAgentStatus('Extractor'),
      WebSearchAgent: this.getAgentStatus('WebSearchAgent'),
      Synthesizer: this.getAgentStatus('Synthesizer')
    };
    
    return {
      // Traditional state checks
      hasDocumentAnalysis: !!context.documentAnalysis,
      patternsGenerated: context.patterns?.length || 0,
      chunksSelected: context.ragResults.chunks.length > 0,
      dataExtracted: context.extractedData && context.extractedData.raw.length > 0,
      hasFinalAnswer: !!context.synthesis.answer,
      
      // 🔥 NEW: Agent call tracking
      agentsCalled: Array.from(this.calledAgents),
      agentsNotCalled: this.registry.listAgents().map(a => a.name).filter(agent => !this.calledAgents.has(agent)),
      lastAgentCalled: this.lastAgentCalled,
      agentCallCount: this.calledAgents.size,
      
      // Agent-specific status (fixed truthy string bug - convert to boolean)
      dataInspectorCompleted: agentStatus.DataInspector === 'completed',
      planningAgentCompleted: agentStatus.PlanningAgent === 'completed',
      patternGeneratorCompleted: agentStatus.PatternGenerator === 'completed',
      webSearchAgentCompleted: agentStatus.WebSearchAgent === 'completed',
      synthesizerCompleted: agentStatus.Synthesizer === 'completed'
    };
  }
  
  /**
   * 📝 Parse Master LLM decision response (robust for small models)
   */
  private parseMasterLLMDecision(response: string): any {
    console.log(`🔍 PARSING DEBUG: Full response (${response.length} chars):`, response.substring(0, 800) + (response.length > 800 ? '...' : ''));
    
    const lines = response.split('\n').map(line => line.trim());
    let action = '';
    let toolName = '';
    let reasoning = '';
    let nextGoal = '';
    
    // PRIORITY 1: Standard structured format parsing (most reliable)
    // 🚨 CRITICAL FIX: Take FIRST occurrence, not LAST (prevents overwriting correct decisions)
    for (const line of lines) {
      if (line.startsWith('ACTION:') && !action) {
        action = line.replace('ACTION:', '').trim().toUpperCase(); // Make case-insensitive
        console.log(`🎯 PARSED ACTION (FIRST):`, action);
      } else if (line.startsWith('TOOL_NAME:') && !toolName) {
        toolName = line.replace('TOOL_NAME:', '').trim();
        console.log(`🎯 PARSED TOOL_NAME (FIRST):`, toolName);
      } else if (line.startsWith('REASONING:') && !reasoning) {
        reasoning = line.replace('REASONING:', '').trim();
      } else if (line.startsWith('NEXT_GOAL:') && !nextGoal) {
        nextGoal = line.replace('NEXT_GOAL:', '').trim();
      }
      
      // Early termination: if we have action and toolName, we have the primary decision
      if (action && toolName) {
        console.log(`✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps`);
        break;
      }
    }
    
    // PRIORITY 2: If structured format found, use it (don't override with fallback)
    if (action || toolName) {
      console.log(`✅ USING STRUCTURED FORMAT: action=${action}, toolName=${toolName}`);
      
      // Handle case where LLM returns tool name as action
      if (action && !toolName && action !== 'COMPLETE') {
        const normalizedAction = this.normalizeToolName(action);
        if (this.registry.get(normalizedAction)) {
          toolName = normalizedAction;
          action = 'CALL_TOOL';
          console.log(`🔧 CONVERTED ACTION TO TOOL_NAME: ${toolName}`);
        }
      }
      
      // Default reasoning if missing
      if (!reasoning && toolName) {
        reasoning = `Need to call ${toolName} to progress toward the goal`;
      }
      
      return { action, toolName, reasoning, nextGoal };
    }
    
    // PRIORITY 3: Fallback parsing - look for decision context (not thinking context)
    console.log(`⚠️ NO STRUCTURED FORMAT FOUND - attempting intelligent fallback parsing`);
    
    // Try to find decision section (after thinking)
    const decisionSection = this.extractDecisionSection(response);
    console.log(`🔍 DECISION SECTION:`, decisionSection.substring(0, 200));
    
    // Look for tool names in decision context with priority order
    const priorityOrder = this.registry.listAgents().map(a => a.name);
    
    for (const tool of priorityOrder) {
      // Look for decision indicators near tool names
      const toolRegex = new RegExp(`(call|use|run|execute|start)\\s+(with\\s+)?${tool}`, 'i');
      if (toolRegex.test(decisionSection) || 
          (decisionSection.includes(tool) && this.isInDecisionContext(decisionSection, tool))) {
        action = 'CALL_TOOL';
        toolName = tool;
        console.log(`🎯 FALLBACK FOUND DECISION: ${toolName} (matched: ${toolRegex.test(decisionSection) ? 'action pattern' : 'decision context'})`);
        break;
      }
    }
    
    // If no decision context found, check for completion indicators
    if (!toolName && /comp?lete|done|finish|ready|end/i.test(decisionSection)) {
      action = 'COMPLETE';
      reasoning = 'Task appears to be complete based on response content';
      console.log(`🏁 FALLBACK FOUND COMPLETION`);
    }
    
    // Last resort: default reasoning
    if (!reasoning && toolName) {
      reasoning = `Need to call ${toolName} to progress toward the goal`;
    }
    
    console.log(`📋 FINAL PARSED DECISION: action=${action}, toolName=${toolName}, reasoning=${reasoning?.substring(0, 50)}...`);
    return { action, toolName, reasoning, nextGoal };
  }
  
  /**
   * 🧠 Extract decision section from response (after thinking)
   */
  private extractDecisionSection(response: string): string {
    // Look for common decision indicators
    const decisionMarkers = [
      '</think>',
      'DECISION:',
      'NEXT:',
      'CALL_TOOL',
      'ACTION:',
      'Based on',
      'Therefore',
      'I need to',
      'First step',
      'Next step'
    ];
    
    let decisionStart = 0;
    for (const marker of decisionMarkers) {
      const markerIndex = response.lastIndexOf(marker);
      if (markerIndex > decisionStart) {
        decisionStart = markerIndex;
      }
    }
    
    // If we found decision markers, extract from there
    if (decisionStart > 0) {
      return response.substring(decisionStart);
    }
    
    // Otherwise, take the last portion (likely to be decision)
    const lines = response.split('\n');
    const lastThird = Math.floor(lines.length * 2/3);
    return lines.slice(lastThird).join('\n');
  }
  
  /**
   * 🧠 Check if tool mention is in decision context (not just thinking/reasoning)
   */
  private isInDecisionContext(text: string, toolName: string): boolean {
    const toolIndex = text.indexOf(toolName);
    if (toolIndex === -1) return false;
    
    // Look for decision words near the tool mention
    const contextWindow = text.substring(Math.max(0, toolIndex - 50), toolIndex + 50);
    const decisionWords = ['call', 'use', 'run', 'execute', 'start', 'need', 'should', 'must', 'first', 'next'];
    
    return decisionWords.some(word => contextWindow.toLowerCase().includes(word));
  }
  
  /**
   * 🧠 PLAN-AWARE SEQUENCING VALIDATION - Replaces rigid hardcoded rules
   */
  private validateAgentExecution(toolName: string, context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string; requiredAgent?: string } {
    const normalizedToolName = this.normalizeToolName(toolName);
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    const calledAgents = Array.from(this.calledAgents);
    const retryingAgents = Array.from(this.retryingAgents);
    
    // Build comprehensive agent status for Master LLM visibility
    const agentStatusParts = [];
    if (calledAgents.length > 0) agentStatusParts.push(`✅ Completed: [${calledAgents.join(', ')}]`);
    if (retryingAgents.length > 0) agentStatusParts.push(`🔄 Retrying: [${retryingAgents.join(', ')}]`);
    
    const agentStatus = agentStatusParts.length > 0 ? agentStatusParts.join(' | ') : 'No agents called yet';
    
    console.log(`🔍 PLAN-GUIDED VALIDATION: ${normalizedToolName}`);
    console.log(`📋 Agent Status: ${agentStatus}`);
    console.log(`💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps`);
    
    // RULE 1: Always allow DataInspector (must be first)
    if (normalizedToolName === 'DataInspector') {
      return { allowed: true, reason: 'DataInspector always allowed as first agent' };
    }
    
    // RULE 2: DataInspector must be called before other agents (critical dependency)
    if (!this.calledAgents.has('DataInspector') && normalizedToolName !== 'DataInspector') {
      return {
        allowed: false,
        reason: 'DataInspector must be called first to analyze and filter documents',
        suggestion: 'Call DataInspector before proceeding',
        requiredAgent: 'DataInspector'
      };
    }

    // FLOW BUILDER MODE: enforce deterministic sequencing regardless of LLM planning
    if (this.config?.mode === 'flow_builder') {
      const pipelineValidation = this.validateFlowPipeline(normalizedToolName, context);
      if (!pipelineValidation.allowed) {
        return pipelineValidation;
      }
    }
    
    // RULE 3: Plan-aware validation (intelligent sequencing)
    if (executionPlan && executionPlan.steps && executionPlan.steps.length > 0) {
      return this.validateAgainstExecutionPlan(normalizedToolName, executionPlan, calledAgents, context);
    }
    
    // RULE 4: Intelligent fallback validation (when no plan exists)
    return this.validateWithIntelligentDefaults(normalizedToolName, context, calledAgents);
  }

  private validateFlowPipeline(toolName: string, context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string; requiredAgent?: string } {
    const stageIndex = this.flowPipelineOrder.indexOf(toolName);
    if (stageIndex === -1) {
      return { allowed: true, reason: 'Not part of constrained flow pipeline' };
    }

    const unmetPrerequisite = this.flowPipelineOrder
      .slice(0, stageIndex)
      .find((agent) => !this.calledAgents.has(agent));

    if (unmetPrerequisite) {
      return {
        allowed: false,
        reason: `Critical prerequisite required: ${unmetPrerequisite} must run before ${toolName}`,
        suggestion: `Call ${unmetPrerequisite} before ${toolName}`,
        requiredAgent: unmetPrerequisite,
      };
    }

    if (toolName === 'Extractor') {
      const hasPatterns = Array.isArray(context.patterns) && context.patterns.length > 0;
      if (!hasPatterns) {
        return {
          allowed: false,
          reason: 'PatternGenerator must produce structured patterns before Extraction runs',
          suggestion: 'Call PatternGenerator and ensure patterns exist before extracting facts',
          requiredAgent: 'PatternGenerator',
        };
      }
    }

    if (toolName === 'SynthesisCoordinator' || toolName === 'Synthesizer') {
      if (!this.hasExtractedData(context)) {
        return {
          allowed: false,
          reason: 'Extraction must produce facts before synthesis can start',
          suggestion: 'Run Extraction to gather facts before SynthesisCoordinator',
        };
      }
    }

    if (toolName === 'ResponseFormatter') {
      if (!this.hasSynthesisDraft(context)) {
        return {
          allowed: false,
          reason: 'ResponseFormatter needs a synthesized draft to format',
          suggestion: 'Call SynthesisCoordinator before ResponseFormatter',
          requiredAgent: 'SynthesisCoordinator',
        };
      }
    }

    return { allowed: true, reason: 'Flow pipeline order satisfied' };
  }
  
  /**
   * 🤖 Validate intelligent additions to execution plan (agents not explicitly planned)
   */
  private validateIntelligentAddition(toolName: string, plan: ExecutionPlan, context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string; requiredAgent?: string } {
    const calledAgents = Array.from(this.calledAgents);
    
    console.log(`🧠 Validating intelligent addition: ${toolName}`);
    console.log(`📋 Original plan: [${plan.steps.map(s => s.agent).join(', ')}]`);
    
    // ALWAYS ALLOW: Critical agents that should never be blocked
    if (toolName === 'DataInspector') {
      return { 
        allowed: true, 
        reason: 'DataInspector is always allowed - critical for document analysis' 
      };
    }
    
    if (toolName === 'Extractor') {
      // 🔥 CRITICAL DEPENDENCY: Extractor requires regex patterns from PatternGenerator
      const hasRegexPatterns = context.patterns && 
                               context.patterns.some(p => p.regexPattern && p.regexPattern.length > 0);
      const patternGeneratorCalled = this.calledAgents.has('PatternGenerator');
      
      console.log(`🔍 Extractor dependency check: PatternGenerator called: ${patternGeneratorCalled}, regex patterns: ${hasRegexPatterns ? context.patterns?.filter(p => p.regexPattern).length : 0}`);
      
      if (!patternGeneratorCalled) {
        console.log(`❌ Extractor blocked: PatternGenerator must be called first`);
        return { 
          allowed: false, 
          reason: 'PatternGenerator must run before Extractor to create extraction patterns',
          suggestion: 'Call PatternGenerator first to generate extraction patterns',
          requiredAgent: 'PatternGenerator'
        };
      }
      
      console.log(`⚡ Extractor validation passed - PatternGenerator was called`);
      return { 
        allowed: true, 
        reason: 'PatternGenerator called - Extractor can proceed' 
      };
    }
    
    if (toolName === 'WebSearchAgent') {
      // WebSearch can expand knowledge - reasonable addition
      return { 
        allowed: true, 
        reason: 'WebSearchAgent is valid for knowledge expansion - intelligent addition' 
      };
    }
    
    if (toolName === 'Synthesizer') {
      // Check if we have data to synthesize
      const hasExtractedData = this.hasExtractedData(context);
      const hasDocumentAnalysis = context.documentAnalysis?.documents && context.documentAnalysis.documents.length > 0;
      const hasUsefulContent = context.ragResults.chunks.length > 0;
      
      if (hasExtractedData || hasDocumentAnalysis || hasUsefulContent) {
        return { 
          allowed: true, 
          reason: 'Synthesizer has sufficient data available - intelligent addition' 
        };
      }
      
      return { 
        allowed: false, 
        reason: 'Synthesizer has no meaningful data to synthesize',
        suggestion: 'Extract data first or ensure document analysis is complete'
      };
    }
    
    if (toolName === 'PatternGenerator') {
      // PatternGenerator can be useful for extraction
      return { 
        allowed: true, 
        reason: 'PatternGenerator can improve extraction quality - intelligent addition' 
      };
    }
    
    if (toolName === 'PlanningAgent') {
      // Planning can be called to revise strategy
      return { 
        allowed: true, 
        reason: 'PlanningAgent can revise execution strategy - intelligent addition' 
      };
    }
    
    // For unknown agents, check if they exist in registry
    const agent = this.registry.get(toolName);
    if (agent) {
      console.log(`⚠️ Unknown agent ${toolName} exists in registry - allowing but with caution`);
      return { 
        allowed: true, 
        reason: `${toolName} exists in registry - allowing as potential intelligent addition`,
        suggestion: 'Consider adding this agent to future execution plans'
      };
    }
    
    // Agent doesn't exist
    return { 
      allowed: false, 
      reason: `${toolName} is not a registered agent`,
      suggestion: `Available agents: ${this.registry.listAgents().map(a => a.name).join(', ')}`
    };
  }
  
  /**
   * 🧠 Identify which prerequisites are CRITICAL vs OPTIONAL
   */
  private getCriticalPrerequisites(toolName: string, uncompletedPrerequisites: PlanStep[], context: ResearchContext): PlanStep[] {
    const critical: PlanStep[] = [];
    
    // Define critical dependencies for each agent
    switch (toolName) {
      case 'Extractor':
        // 🔥 CRITICAL DEPENDENCY: Extractor requires patterns from PatternGenerator
        console.log(`🎯 Validating Extractor prerequisites - checking PatternGenerator dependency`);
        const patternGeneratorCalled = this.calledAgents.has('PatternGenerator');
        console.log(`📊 PatternGenerator called: ${patternGeneratorCalled}`);
        
        if (!patternGeneratorCalled) {
          // Find PatternGenerator in prerequisites
          const patternStep = uncompletedPrerequisites.find(step => 
            this.normalizeToolName(step.agent) === 'PatternGenerator'
          );
          if (patternStep) {
            console.log(`❌ Extractor blocked: PatternGenerator must run first`);
            critical.push(patternStep);
          }
        }
        break;
        
      // BYPASSED: DataAnalyzer case removed - agent disabled due to filtering bug
      // case 'DataAnalyzer':
        // DataAnalyzer needs extracted data from Extractor
        // console.log(`🎯 Validating DataAnalyzer prerequisites - checking extracted data`);
        // const hasExtractedForAnalysis = this.hasExtractedData(context);
        // console.log(`📊 Has extracted data: ${hasExtractedForAnalysis}`);
        
        // if (!hasExtractedForAnalysis && !this.calledAgents.has('Extractor')) {
          // Find Extractor in prerequisites
          // const extractorStep = uncompletedPrerequisites.find(step => 
            // this.normalizeToolName(step.agent) === 'Extractor'
          // );
          // if (extractorStep) critical.push(extractorStep);
        // }
        // break;
        
      case 'SynthesisCoordinator':
        // 🎯 CRITICAL: SynthesisCoordinator MUST run after PatternGenerator (which includes extraction)
        console.log(`🎯 Validating SynthesisCoordinator prerequisites - checking PatternGenerator completion`);
        
        // Check if PatternGenerator has been called (PatternGenerator now includes extraction)
        if (!this.calledAgents.has('PatternGenerator')) {
          console.log(`❌ SynthesisCoordinator cannot run before PatternGenerator (which includes extraction)`);
          console.log(`📋 Called agents so far: ${Array.from(this.calledAgents).join(', ')}`);
          // Add PatternGenerator as critical prerequisite
          critical.push({
            agent: 'PatternGenerator',
            action: 'Generate patterns and extract data',
            reasoning: 'SynthesisCoordinator requires extracted data from PatternGenerator (integrated extraction)',
            expectedOutput: 'Extracted data points for synthesis',
            priority: 'high' as const
          });
        }
        
        const hasExtractedDataForSynthesis = context.extractedData?.raw && context.extractedData.raw.length > 0;
        console.log(`📊 Has extracted data: ${hasExtractedDataForSynthesis}`);
        
        if (!hasExtractedDataForSynthesis && this.calledAgents.has('PatternGenerator')) {
          console.log(`⚠️ PatternGenerator ran but produced no data - may need to re-run with better patterns`);
        }
        
        // ⚠️ TEMPORARY FIX: Skip DataAnalyzer to prevent data destruction
        // DataAnalyzer was filtering out 100% of relevant extracted items
        if (hasExtractedDataForSynthesis) {
          console.log(`✅ SynthesisCoordinator will work directly with ${context.extractedData.raw.length} extracted items (DataAnalyzer bypassed)`);
        }
        break;
        
      case 'Synthesizer':
        // 🔥 CRITICAL: Synthesizer needs EXTRACTED DATA from documents, not just raw chunks
        // NOTE: This is now a fallback agent - prefer DataAnalyzer + SynthesisCoordinator
        console.log(`🎯 Validating Synthesizer prerequisites - checking data availability`);
        const hasExtractedData = this.hasExtractedData(context);
        console.log(`📊 Has extracted data: ${hasExtractedData}`);
        
        // If new synthesis agents have been called, skip old Synthesizer
        if (this.calledAgents.has('SynthesisCoordinator')) {
          console.log(`✅ SynthesisCoordinator already called - skipping old Synthesizer`);
          // Return empty critical prerequisites since we don't need Synthesizer
          return critical;
        }
        
        for (const step of uncompletedPrerequisites) {
          const agentName = this.normalizeToolName(step.agent);
          
          // WebSearchAgent is ALWAYS optional - can be skipped
          if (agentName === 'WebSearchAgent') {
            console.log(`📝 WebSearchAgent is optional for Synthesizer - allowing skip`);
            continue;
          }
          
          // 🔥 CRITICAL DEPENDENCY CHAIN: PatternGenerator → Extractor → Synthesizer
          if (agentName === 'PatternGenerator' || agentName === 'Extractor') {
            console.log(`🎯 ${agentName} is CRITICAL for Synthesizer - ensures proper data extraction`);
            critical.push(step);
            continue;
          }
          
          // DataInspector is critical for document understanding
          if (agentName === 'DataInspector') {
            critical.push(step);
          }
        }
        break;
        
      case 'Extractor':
        // Extractor can work with patterns OR direct LLM analysis
        for (const step of uncompletedPrerequisites) {
          const agentName = this.normalizeToolName(step.agent);
          
          // WebSearchAgent is never required for Extractor
          if (agentName === 'WebSearchAgent') {
            continue;
          }
          
          // 🔥 CRITICAL DATA DEPENDENCY: PatternGenerator is REQUIRED for Extractor
          if (agentName === 'PatternGenerator') {
            console.log(`🎯 CRITICAL DEPENDENCY: PatternGenerator must run before Extractor for regex patterns`);
            console.log(`📊 Current patterns in context: ${context.patterns?.length || 0} patterns`);
            const regexPatterns = context.patterns?.filter(p => p.regexPattern)?.length || 0;
            console.log(`🔍 Regex patterns available: ${regexPatterns}`);
            
            // Always require PatternGenerator - this fixes the execution order issue
            critical.push(step);
            continue;
          }
          
          // DataInspector is critical for document analysis
          if (agentName === 'DataInspector') {
            critical.push(step);
          }
        }
        break;
        
      case 'WebSearchAgent':
        // WebSearchAgent has no critical prerequisites
        console.log(`📝 WebSearchAgent has no critical prerequisites`);
        break;
        
      default:
        // For other agents, check data dependencies
        for (const step of uncompletedPrerequisites) {
          const agentName = this.normalizeToolName(step.agent);
          
          // WebSearchAgent is always optional
          if (agentName === 'WebSearchAgent') {
            continue;
          }
          
          // DataInspector is usually critical (except for WebSearchAgent)
          if (agentName === 'DataInspector' && toolName !== 'WebSearchAgent') {
            critical.push(step);
          }
        }
    }
    
    return critical;
  }
  
  /**
   * 📋 Validate agent execution against PlanningAgent's execution plan
   */
  private validateAgainstExecutionPlan(toolName: string, plan: ExecutionPlan, calledAgents: string[], context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string; requiredAgent?: string } {
    // Find the agent's position in the execution plan
    const agentStepIndex = plan.steps.findIndex((step: PlanStep) => 
      this.normalizeToolName(step.agent) === toolName
    );
    
    if (agentStepIndex === -1) {
      // Agent not explicitly in plan - validate if it's an intelligent addition
      console.log(`🤔 ${toolName} not explicitly in execution plan - validating as intelligent addition`);
      return this.validateIntelligentAddition(toolName, plan, context);
    }
    
    // Check if prerequisite steps have been completed
    const prerequisiteSteps = plan.steps.slice(0, agentStepIndex);
    const uncompletedPrerequisites = prerequisiteSteps.filter((step: PlanStep) => 
      !calledAgents.includes(this.normalizeToolName(step.agent))
    );
    
    // 🧠 SMART PREREQUISITES: Only enforce CRITICAL dependencies, allow skipping optional ones
    const criticalPrerequisites = this.getCriticalPrerequisites(toolName, uncompletedPrerequisites, context);
    
    if (criticalPrerequisites.length > 0) {
      const nextRequired = criticalPrerequisites[0];
      return {
        allowed: false,
        reason: `Critical prerequisite required: ${this.normalizeToolName(nextRequired.agent)} must run before ${toolName}`,
        suggestion: `${nextRequired.agent} is essential for ${toolName} - ${nextRequired.action}`,
        requiredAgent: this.normalizeToolName(nextRequired.agent)
      };
    }
    
    // Log skipped optional prerequisites for transparency
    const skippedOptional = uncompletedPrerequisites.filter(step => 
      !criticalPrerequisites.includes(step)
    );
    if (skippedOptional.length > 0) {
      console.log(`⚡ Allowing ${toolName} to skip optional prerequisites: [${skippedOptional.map(s => s.agent).join(', ')}]`);
    }
    
    // Agent can be executed according to plan
    console.log(`✅ ${toolName} validated against execution plan - prerequisites met`);
    return { allowed: true, reason: `${toolName} execution follows planned sequence - step ${agentStepIndex + 1} of ${plan.steps.length}` };
  }
  
  /**
   * 🤖 Intelligent validation when no execution plan exists
   */
  private validateWithIntelligentDefaults(toolName: string, context: ResearchContext, calledAgents: string[]): { allowed: boolean; reason: string; suggestion?: string; requiredAgent?: string } {
    // Smart dependency validation based on data availability and agent purpose
    
    // PatternGenerator: Works better with document analysis but not strictly required
    if (toolName === 'PatternGenerator') {
      if (!calledAgents.includes('DataInspector')) {
        console.log(`⚠️ PatternGenerator works better after DataInspector, but allowing`);
      }
      return { allowed: true, reason: 'PatternGenerator can work with available data' };
    }
    
    // Extractor: Needs either patterns or can work with LLM analysis
    if (toolName === 'Extractor') {
      return { allowed: true, reason: 'Extractor can work with LLM analysis or patterns' };
    }
    
    // Synthesizer: LEGACY - Guide towards new synthesis pipeline (DataAnalyzer bypassed)
    if (toolName === 'Synthesizer') {
      // Check if SynthesisCoordinator is available (DataAnalyzer bypassed)
      const hasSynthesisCoordinator = this.registry.get('SynthesisCoordinator') !== null;
      
      // Guide towards using SynthesisCoordinator directly
      if (hasSynthesisCoordinator) {
        // Check if SynthesisCoordinator was already called
        if (!calledAgents.includes('SynthesisCoordinator')) {
          const hasExtractedData = this.hasExtractedData(context);
          if (hasExtractedData) {
            // Have data, go directly to SynthesisCoordinator (DataAnalyzer bypassed)
            return {
              allowed: false,
              reason: 'Use SynthesisCoordinator directly with raw extracted data (DataAnalyzer bypassed)',
              suggestion: 'Call SynthesisCoordinator to assemble final report from raw extracted data'
            };
          } else if (!calledAgents.includes('PatternGenerator')) {
            // No data extracted yet
        return {
          allowed: false,
          reason: 'No extracted data available for synthesis',
          suggestion: 'Call PatternGenerator first (with integrated extraction), then SynthesisCoordinator directly (DataAnalyzer bypassed)',
          requiredAgent: 'PatternGenerator'
        };
          }
        }
      }
      
      // Fallback to old validation if new agents don't exist
      const hasExtractedData = this.hasExtractedData(context);
      const hasDocumentAnalysis = context.documentAnalysis?.documents && context.documentAnalysis.documents.length > 0;
      const hasUsefulContent = context.ragResults.chunks.length > 0;
      
      if (hasExtractedData || hasDocumentAnalysis || hasUsefulContent) {
        return { allowed: true, reason: 'Sufficient data available for synthesis (legacy mode)' };
      }
      
      // If no extracted data but PatternGenerator hasn't been called, suggest it
      if (!calledAgents.includes('PatternGenerator')) {
        return {
          allowed: false,
          reason: 'No extracted data available for synthesis',
          suggestion: 'Call PatternGenerator first (with integrated extraction) to extract relevant information',
          requiredAgent: 'PatternGenerator'
        };
      }
      
      // Allow synthesis even if data is limited (better than failing)
      return { allowed: true, reason: 'Attempting synthesis with available data (legacy mode)' };
    }
    
    // PlanningAgent and WebSearchAgent are always allowed
    return { allowed: true, reason: `${toolName} execution is contextually appropriate` };
  }
  
  /**
   * 🔧 Execute tool call based on Master LLM decision
   */
  private async executeToolCall(toolName: string, context: ResearchContext): Promise<void> {
    // 🚨 FIX: Normalize tool name case (LLM returns "EXTRACTOR", registry has "Extractor")
    const normalizedToolName = this.normalizeToolName(toolName);
    
    // Evidence gate: Block synthesis if no numeric evidence for performance queries
    if (normalizedToolName === 'SynthesisCoordinator' || normalizedToolName === 'Synthesizer') {
      if (this.shouldBlockSynthesisForEvidence(context)) {
        console.log('⚠️ Blocking synthesis: Insufficient numeric evidence for performance query');
        
        // Instead of recursive calls, throw error to let Master LLM decide sequencing
        const needsPatternGen = !this.calledAgents.has('PatternGenerator');
        
        if (needsPatternGen) {
          const missingAgents = [];
          if (needsPatternGen) missingAgents.push('PatternGenerator');
          
          console.log(`🔄 Performance query needs ${missingAgents.join(' → ')} before synthesis`);
          throw new Error(`MISSING_EVIDENCE: Performance query requires ${missingAgents.join(' and ')} to extract numeric data before synthesis.`);
        } else {
          // Already tried extraction, give up
          console.log('❌ Already tried extraction but still no evidence');
          context.synthesis.answer = 'Unable to extract sufficient numeric evidence from the documents to answer this performance query. Please verify the documents contain the relevant measurements.';
          context.synthesis.confidence = 0.2;
          return;
        }
      }
    }
    
    // 🧠 PLAN-AWARE SEQUENCING VALIDATION - Replaces hardcoded rules with intelligent validation
    const validation = this.validateAgentExecution(normalizedToolName, context);
    if (!validation.allowed) {
      console.warn(`⚠️ PLAN-AWARE SEQUENCING WARNING: ${validation.reason}`);
      if (validation.suggestion) {
        console.warn(`💡 Suggestion: ${validation.suggestion}`);
      }

      if (validation.requiredAgent) {
        const requiredAgent = this.normalizeToolName(validation.requiredAgent);
        if (requiredAgent === normalizedToolName) {
          throw new Error(`Plan-aware sequencing violation: ${validation.reason}`);
        }
        if (this.calledAgents.has(requiredAgent)) {
          console.log(`⚠️ Required agent ${requiredAgent} already executed but validation still failing`);
        } else {
          console.log(`🔄 Auto-enforcing pipeline: running ${requiredAgent} before ${normalizedToolName}`);
          await this.executeToolCall(requiredAgent, context);
          console.log(`✅ ${requiredAgent} completed - re-evaluating ${normalizedToolName}`);
          return await this.executeToolCall(normalizedToolName, context);
        }
      }
      
      // For remaining validation failures, surface explicit error
      throw new Error(`Plan-aware sequencing violation: ${validation.reason}`);
    }
    
    console.log(`✅ Agent execution validated: ${validation.reason}`);
    
    // 🎯 Option 1: Disable redundant Extractor when PatternGenerator has successfully extracted data
    if (normalizedToolName === 'Extractor') {
      const patternGenCalled = this.calledAgents.has('PatternGenerator');
      const hasExtractedData = context.extractedData?.raw?.length > 0;
      
      if (patternGenCalled && hasExtractedData) {
        console.log(`🚫 SKIPPING REDUNDANT EXTRACTOR: PatternGenerator already extracted ${context.extractedData.raw.length} items`);
        console.log(`✅ Using PatternGenerator's extracted data to prevent overwriting good results`);
        
        // Mark Extractor as called but with PatternGenerator's results
        this.calledAgents.add(normalizedToolName);
        this.agentResults.set(normalizedToolName, {
          extractedData: context.extractedData,
          itemCount: context.extractedData.raw.length,
          reasoning: 'Skipped redundant extraction - using PatternGenerator results'
        });
        
        return; // Skip execution
      }
    }
    
    const agent = this.registry.get(normalizedToolName);
    if (!agent) {
      console.error(`❌ Tool name normalization failed. Original: "${toolName}", Normalized: "${normalizedToolName}"`);
      console.error(`📋 Available tools:`, this.registry.listAgents().map(a => a.name));
      throw new Error(`Tool ${toolName} (normalized: ${normalizedToolName}) not found in registry. Available: ${this.registry.listAgents().map(a => a.name).join(', ')}`);
    }
    
    // Context-aware rerun policy with input signatures
    const currentInputSignature = this.computeInputSignature(normalizedToolName, context);
    const previousSignature = this.agentInputSignatures.get(normalizedToolName);
    const rerunCount = this.agentRerunCount.get(normalizedToolName) || 0;
    
    // Check for retrying agents (keep this check but not executing agents)
    if (this.retryingAgents.has(normalizedToolName)) {
      console.log(`⚠️ Agent ${normalizedToolName} is currently retrying, blocking duplicate call`);
      console.log(`🚫 Skipping ${normalizedToolName} execution - retry in progress`);
      return;
    }
    
    if (this.calledAgents.has(normalizedToolName)) {
      // Check if inputs have changed or quality is insufficient
      const inputsChanged = previousSignature !== currentInputSignature;
      const qualityInsufficient = this.isQualityInsufficient(normalizedToolName, context);
      const canRerun = rerunCount < 2; // Max 2 reruns per agent
      
      if ((inputsChanged || qualityInsufficient) && canRerun) {
        console.log(`🔄 RE-RUNNING ${normalizedToolName}: ${inputsChanged ? 'Inputs changed' : 'Quality insufficient'}`);
        console.log(`📊 Previous signature: ${previousSignature?.substring(0, 20)}...`);
        console.log(`📊 Current signature: ${currentInputSignature.substring(0, 20)}...`);
        console.log(`📊 Rerun count: ${rerunCount + 1}/2`);
        
        // Update rerun count
        this.agentRerunCount.set(normalizedToolName, rerunCount + 1);
      } else if (normalizedToolName === 'Synthesizer') {
        // Legacy Synthesizer special case for backward compatibility
        const hasExtractedData = this.hasExtractedData(context);
        const synthesisAnswer = context.synthesis?.answer || '';
        const wasCalledWithNoData = synthesisAnswer.trim() === '' || synthesisAnswer.includes('No relevant information found');
        
        if (hasExtractedData && wasCalledWithNoData) {
          console.log(`🔄 RE-CALLING Synthesizer: Data now available after previous empty call`);
          console.log(`📊 Previously had no data, now has extracted data - allowing re-execution`);
          // Remove from called agents to allow re-execution
          this.calledAgents.delete(normalizedToolName);
        } else {
          console.warn(`⚠️ Agent ${normalizedToolName} already called with same inputs, skipping`);
          
          // 🔧 FIX: Log progression guidance for Master LLM to see in next iteration
          const planStatus = this.getExecutionPlanStatus(context);
          console.log(`📋 Agent ${normalizedToolName} was already executed successfully with data.`);
          console.log(`📊 Current Pipeline Status: ${planStatus}`);
          console.log(`💡 Suggestion: Continue to the next planned step in your execution sequence.`);
          
          // Store guidance in context for persistence
          context.sharedKnowledge.lastSkippedAgent = {
            agent: normalizedToolName,
            reason: 'Already executed with same inputs',
            planStatus: planStatus,
            timestamp: Date.now()
          };
          return;
        }
      } else {
        console.warn(`⚠️ Agent ${normalizedToolName} already called with same inputs (or max reruns reached), skipping`);
        
        // 🔧 ENHANCED: Provide clear next-step guidance when agent is skipped
        const planStatus = this.getExecutionPlanStatus(context);
        const nextGuidance = this.getNextPlannedStep(context, this.analyzeCurrentState(context));
        
        console.log(`📋 Agent ${normalizedToolName} was already executed successfully.`);
        console.log(`📊 Current Pipeline Status: ${planStatus}`);
        console.log(`💡 Next Step Guidance: ${nextGuidance}`);
        
        // Store detailed guidance in context for Master LLM's next iteration
        const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
        let recommendedNext = 'Continue to next agent in pipeline';
        
        if (executionPlan?.steps) {
          // Find the next uncompleted agent
          for (const step of executionPlan.steps) {
            const agentName = this.normalizeToolName(step.agent);
            if (!this.calledAgents.has(agentName)) {
              recommendedNext = `Call ${agentName} next - ${step.action}`;
              break;
            }
          }
        }
        
        context.sharedKnowledge.lastSkippedAgent = {
          agent: normalizedToolName,
          reason: 'Already executed - continue pipeline',
          recommendedNext: recommendedNext,
          planStatus: planStatus,
          timestamp: Date.now()
        };
        
        console.log(`🎯 Recommended Next Action: ${recommendedNext}`);
        return;
      }
    }
    
    console.log(`🔧 Executing tool: ${normalizedToolName} (original: ${toolName})`);
    const startTime = Date.now();
    
    try {
      // Mark as called (execution lock removed to fix infinite loop bug)
      this.calledAgents.add(normalizedToolName);
      this.lastAgentCalled = normalizedToolName;
      
      // 🚨 FIX: Track agent progress for getAgentSubSteps() to work properly
      await this.progressTracker.startAgent(normalizedToolName, normalizedToolName, context);
      
      console.log(`⏳ [${this.instanceId}] Starting ${normalizedToolName} - waiting for completion...`);
      await agent.process(context);
      console.log(`✅ [${this.instanceId}] ${normalizedToolName} process() completed - agent finished`);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`✅ Tool ${normalizedToolName} completed in ${duration}ms`);
      
      // 🎯 INTELLIGENT QUALITY CONTROL: Use PlanningAgent to assess result quality
      const qualityAssessment = await this.assessResultQuality(normalizedToolName, context);
      console.log(`🔍 Quality assessment for ${normalizedToolName}:`, qualityAssessment.status);
      
      if (!qualityAssessment.isAcceptable) {
        console.log(`⚠️ Result quality insufficient: ${qualityAssessment.reason}`);
        
        if (qualityAssessment.retryRecommended && this.canRetryAgent(normalizedToolName)) {
          console.log(`🔄 Attempting intelligent retry for ${normalizedToolName}`);
          // Don't remove from calledAgents here - let performIntelligentRetry handle state atomically
          await this.performIntelligentRetry(normalizedToolName, context, qualityAssessment.improvement);
        } else {
          console.log(`📋 Continuing with current results, quality will be addressed by downstream agents`);
        }
      }
      
      // 🔥 STORE: Save agent result for future reference
      this.agentResults.set(normalizedToolName, {
        success: true,
        duration: duration,
        timestamp: endTime
      });
      
      // 🎯 CRITICAL: After DataInspector identifies relevant documents, fetch ALL chunks
      // DataInspector only gets samples for efficiency, but downstream agents need complete data
      if (normalizedToolName === 'DataInspector' && context.documentAnalysis?.documents) {
        await this.expandToFullDocumentChunks(context);
      }
      
      // Store input signature for context-aware reruns
      this.agentInputSignatures.set(normalizedToolName, currentInputSignature);
      
      // 🚨 FIX: Mark agent as completed with result and capture actual output
      const agentOutput = this.extractAgentOutput(context, normalizedToolName);
      await this.progressTracker.completeAgent(normalizedToolName, { 
        result: 'success',
        output: agentOutput 
      });
      
      // 🎯 STRATEGIC VALIDATION APPROACH - Only validate at key checkpoints
      // Validate only after: DataInspector, Extractor, and final synthesis agents
      const strategicValidationAgents = ['DataInspector', 'Extractor', 'SynthesisCoordinator', 'Synthesizer', 'ResponseFormatter'];
      const shouldValidate = strategicValidationAgents.includes(normalizedToolName);
      
      if (this.registry.has('PlanningAgent') && shouldValidate && normalizedToolName !== 'PlanningAgent') {
        console.log(`🎯 Strategic validation checkpoint: ${normalizedToolName} - running PlanningAgent validation`);
        console.log(`🔍 PlanningAgent consuming ${normalizedToolName} results for quality analysis...`);
        
        // Track PlanningAgent validation as a separate UI step
        const validationStepName = `PlanningAgent Validation: ${normalizedToolName}`;
        await this.progressTracker.startAgent(validationStepName, 'PlanningAgent', {
          ...context,
          validationTarget: normalizedToolName,
          isValidation: true
        });
        
        try {
          const planningAgent = this.registry.get('PlanningAgent') as any;
          if (planningAgent && typeof planningAgent.consumeAgentResults === 'function') {
            const consumption = await planningAgent.consumeAgentResults(normalizedToolName, context);
            
            if (consumption && consumption.shouldContinue === false && consumption.replanRequired) {
              console.log(`🔄 REPLANNING TRIGGERED: ${consumption.reason || 'Quality insufficient'}`);
              console.log(`📝 Specific Guidance: ${consumption.guidance}`);
              
              // Store replanning guidance in context for the agent to use
              if (!(context.sharedKnowledge as any).replanningGuidance) {
                (context.sharedKnowledge as any).replanningGuidance = {};
              }
              (context.sharedKnowledge as any).replanningGuidance[normalizedToolName] = {
                guidance: consumption.guidance,
                reason: consumption.reason || 'Quality validation failed',
                timestamp: Date.now()
              };
              
              // Track retry attempt to prevent infinite loops
              const retryKey = consumption.targetAgent || normalizedToolName;
              const retryCount = this.agentRetryCount.get(retryKey) || 0;
              if (retryCount < 2) { // Max 2 retries per agent
                this.agentRetryCount.set(retryKey, retryCount + 1);
                
                // Determine which agent needs to rerun based on consumption analysis
                const agentToRerun = consumption.targetAgent || normalizedToolName;
                console.log(`🔁 Re-executing ${agentToRerun} with corrective guidance (attempt ${retryCount + 1}/2)`);
                
                // Clear the agent from called list to allow re-execution
                this.calledAgents.delete(agentToRerun);
                this.agentResults.delete(agentToRerun);
                
                // Mark as retrying to prevent duplicate calls
                this.retryingAgents.add(agentToRerun);
                
                // Re-execute the agent with guidance
                await this.executeToolCall(agentToRerun, context);
                
                // Clear retry flag
                this.retryingAgents.delete(agentToRerun);
              } else {
                console.warn(`⚠️ Max retries reached for ${retryKey}, continuing with current results`);
              }
            } else if (consumption && consumption.shouldContinue) {
              console.log(`✅ ${normalizedToolName} results validated by PlanningAgent - quality acceptable`);
            }
            
            // Complete the validation tracking
            await this.progressTracker.completeAgent(validationStepName, {
              result: 'success',
              output: consumption
            });
          }
        } catch (error) {
          console.warn(`⚠️ PlanningAgent consumption failed:`, error);
          // Complete validation tracking even on error
          await this.progressTracker.completeAgent(validationStepName, {
            result: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          // Continue anyway - consumption is for quality improvement, not critical path
        }
        
        // 🔥 FIX: Add small delay to ensure validation UI completes before next agent starts
        // This prevents visual overlap where validation appears to run concurrently with next agent
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`⏱️ Validation UI sync delay completed`);
      } else if (this.registry.has('PlanningAgent') && normalizedToolName !== 'PlanningAgent') {
        // Log skipped validation for non-strategic agents
        console.log(`⚡ Strategic validation: Skipping validation for ${normalizedToolName} (not a strategic checkpoint)`);
      }
      
    } catch (error) {
      console.error(`❌ Tool ${normalizedToolName} failed:`, error);
      
      // 🔥 STORE: Save failed result but keep agent in called set to prevent retries
      this.agentResults.set(normalizedToolName, {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      });
      
      // 🚨 FIX: Mark agent as failed
      await this.progressTracker.errorAgent(normalizedToolName, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }
  
  /**
   * 🔥 Extract actual agent output from context for UI display
   */
  private extractAgentOutput(context: ResearchContext, agentName: string): any {
    switch (agentName) {
      case 'DataInspector':
        return {
          documentAnalysis: context.documentAnalysis,
          sharedKnowledge: context.sharedKnowledge.documentInsights,
          filteredDocuments: context.ragResults.chunks.length,
          reasoning: context.sharedKnowledge.documentInsights?.detailedReasoning || 'Document analysis completed'
        };
      
      case 'PatternGenerator':
        return {
          patterns: context.patterns,
          patternCount: context.patterns.length,
          extractionStrategies: context.sharedKnowledge.extractionStrategies,
          reasoning: 'Pattern generation completed'
        };
      
      case 'Extractor':
        return {
          extractedData: context.extractedData,
          itemCount: context.extractedData.raw.length,
          reasoning: 'Data extraction completed'
        };
      
      case 'Synthesizer':
        return {
          synthesis: context.synthesis,
          finalAnswer: context.synthesis.answer,
          reasoning: context.synthesis.reasoning || 'Synthesis completed'
        };
      
      case 'PlanningAgent':
        return {
          executionPlan: 'Execution strategy created',
          reasoning: 'Planning completed'
        };
      
      case 'WebSearchAgent':
        const webSearchFindings = context.sharedKnowledge?.agentFindings?.WebSearchAgent;
        return {
          webResults: webSearchFindings?.resultsCount || 0,
          searchQueries: webSearchFindings?.searchQueries || [],
          strategy: webSearchFindings?.strategy || {},
          sourcesAdded: webSearchFindings?.resultsCount || 0,
          timestamp: webSearchFindings?.timestamp,
          reasoning: `Web search executed: ${webSearchFindings?.resultsCount || 0} additional sources found`
        };
      
      default:
        return {
          status: 'completed',
          reasoning: `${agentName} processing completed`
        };
    }
  }

  /**
   * 🔧 Normalize tool names to handle case variations from LLM
   */
  private normalizeToolName(toolName: string): string {
    // 🤖 Map of common LLM variations and hallucinations to correct tool names
    const toolNameMap: { [key: string]: string } = {
      // Correct uppercase versions
      'DATAINSPECTOR': 'DataInspector',
      'PLANNINGAGENT': 'PlanningAgent',
      'PATTERNGENERATOR': 'PatternGenerator', 
      'EXTRACTOR': 'Extractor',
      'WEBSEARCHAGENT': 'WebSearchAgent',
      'SYNTHESIZER': 'Synthesizer',
      
      // 🚨 LLM TYPOS/HALLUCINATIONS (backup handling)
      'DATA_INSPIRETER': 'DataInspector',  // Common LLM typo
      'DATAINSPIRETER': 'DataInspector',   // Another typo variant
      'DATA_INSPECTOR_AGENT': 'DataInspector', // LLM adds "AGENT"
      'PLANNING_AGENT_FULL': 'PlanningAgent',
      'PATTERN_GENERATOR_AGENT': 'PatternGenerator',
      'EXTRACTOR_AGENT': 'Extractor',
      'WEB_SEARCH_AGENT_FULL': 'WebSearchAgent',
      
      // 🔥 CRITICAL: Common confusion between PatternGenerator and Extractor
      'PATTERNEXTRACTOR': 'Extractor',  // Common mix-up
      'PatternExtractor': 'Extractor',  // Case variation
      'pattern-extractor': 'Extractor',
      'pattern_extractor': 'Extractor',
      'PATTERN_EXTRACTOR': 'Extractor',
      'DataExtractor': 'Extractor',     // LLM confusion - "DataExtractor" → "Extractor"
      'DATAEXTRACTOR': 'Extractor',     // Uppercase version
      'dataextractor': 'Extractor',     // Lowercase version
      'DATA_EXTRACTOR': 'Extractor',    // Snake case version
      'CALL_DATA_EXTRACTOR': 'Extractor', // Call prefix version
      'CALL DataExtractor': 'Extractor',  // Call with space version
      'RegexExtractor': 'Extractor',    // LLM confusion - "RegexExtractor" → "Extractor" 
      'REGEXEXTRACTOR': 'Extractor',    // Uppercase version
      'regexextractor': 'Extractor',    // Lowercase version
      'REGEX_EXTRACTOR': 'Extractor',   // Snake case version
      'CALL_REGEX_EXTRACTOR': 'Extractor', // Call prefix version
      'CALL RegexExtractor': 'Extractor',  // Call with space version
      // Lowercase versions
      'datainspector': 'DataInspector',
      'planningagent': 'PlanningAgent',
      'patterngenerator': 'PatternGenerator',
      'extractor': 'Extractor',
      'websearchagent': 'WebSearchAgent',
      'synthesizer': 'Synthesizer',
      'queryplanner': 'QueryPlanner',
      // 🚨 TYPO HANDLING: Common LLM typos
      'datainspictor': 'DataInspector',  // Missing 'e' typo
      'DATAINSPICTOR': 'DataInspector',  // Missing 'e' typo uppercase
      'DataInspictor': 'DataInspector',  // Missing 'e' typo mixed case
      'datainspecter': 'DataInspector',  // Wrong ending typo
      'DATAINSPECTER': 'DataInspector',  // Wrong ending typo uppercase
      // 🚨 SNAKE_CASE variations (LLM converts camelCase to snake_case)
      'DATA_INSPECTOR': 'DataInspector',
      'PLANNING_AGENT': 'PlanningAgent',
      'PATTERN_GENERATOR': 'PatternGenerator',
      'WEB_SEARCH_AGENT': 'WebSearchAgent',
      'QUERY_PLANNER': 'QueryPlanner',
      // 🚨 CALL_ prefixed variations (LLM generates "CALL TOOLNAME" format)
      'CALL_DATA_INSPECTOR': 'DataInspector',
      'CALL_PLANNING_AGENT': 'PlanningAgent',
      'CALL_PATTERN_GENERATOR': 'PatternGenerator',
      'CALL_EXTRACTOR': 'Extractor',
      'CALL_WEB_SEARCH_AGENT': 'WebSearchAgent',
      'CALL_SYNTHESIZER': 'Synthesizer',
      'CALL_DATAINSPECTOR': 'DataInspector',
      'CALL_PLANNINGAGENT': 'PlanningAgent',
      'CALL_PATTERNGENERATOR': 'PatternGenerator',
      'CALL_WEBSEARCHAGENT': 'WebSearchAgent',
      'CALL_QUERYPLANNER': 'QueryPlanner',
      // 🚨 CALL_ with typos
      'CALL_DATAINSPICTOR': 'DataInspector',  // Missing 'e' typo with CALL_
      'CALL_DATAINSPECTER': 'DataInspector',  // Wrong ending typo with CALL_
      // 🚨 CALL with space variations (LLM generates "CALL ToolName" format)
      'CALL DataInspector': 'DataInspector',
      'CALL PlanningAgent': 'PlanningAgent',
      'CALL PatternGenerator': 'PatternGenerator',
      'CALL Extractor': 'Extractor',
      'CALL WebSearchAgent': 'WebSearchAgent',
      'CALL Synthesizer': 'Synthesizer',
      // 🚨 CALL with space + typos
      'CALL DataInspictor': 'DataInspector',  // Missing 'e' typo
      'CALL DATAINSPICTOR': 'DataInspector',  // Missing 'e' typo uppercase
      'CALL DataInspecter': 'DataInspector',  // Wrong ending typo
      'CALL QueryPlanner': 'QueryPlanner',
      // 🚨 LLM Hallucination fixes
      'DATAINSPIRATOR': 'DataInspector', // Common LLM typo/hallucination
      'DATAINSPECTION': 'DataInspector',
      'INSPECTOR': 'DataInspector',
      'PLANNER': 'PlanningAgent',
      'PLANNING': 'PlanningAgent',
      'GENERATOR': 'PatternGenerator',
      'EXTRACT': 'Extractor',
      'EXTRACTION': 'Extractor',
      'Extraction': 'Extractor',
      'extraction': 'Extractor',
      'WEBSEARCH': 'WebSearchAgent',
      'SEARCH': 'WebSearchAgent',
      'SYNTHESIS': 'Synthesizer',
      'SYNESTHESIZER': 'Synthesizer', // LLM misspelling "Synthesizer" as "SYNESTHESIZER"
      'QUERYPLANNER': 'QueryPlanner',
      
      // BYPASSED: DataAnalyzer mappings removed - agent disabled due to filtering bug
      // 'DATAANALYZER': 'DataAnalyzer',
      // 'DATAANALYSISAGENT': 'DataAnalyzer',
      // 'DATA_ANALYZER': 'DataAnalyzer',
      // 'DATA_ANALYSIS_AGENT': 'DataAnalyzer',
      // 'dataanalyzer': 'DataAnalyzer',
      // 'data_analyzer': 'DataAnalyzer',
      // 'CALL_DATA_ANALYZER': 'DataAnalyzer',
      // 'CALL DataAnalyzer': 'DataAnalyzer',
      
      'SYNTHESISCOORDINATOR': 'SynthesisCoordinator',
      'SYNTHESIS_COORDINATOR': 'SynthesisCoordinator',
      'synthesiscoordinator': 'SynthesisCoordinator',
      'synthesis_coordinator': 'SynthesisCoordinator',
      'CALL_SYNTHESIS_COORDINATOR': 'SynthesisCoordinator',
      'CALL SynthesisCoordinator': 'SynthesisCoordinator',
      'SYNthesisCoordinator': 'SynthesisCoordinator' // Fix LLM typo with Y instead of I
    };
    
    // First try exact mapping
    if (toolNameMap[toolName]) {
      return toolNameMap[toolName];
    }
    
    // 🔥 EMERGENCY FIX: Intelligent wildcard pattern matching for unmapped variations
    return this.intelligentToolNameFallback(toolName);
  }

  /**
   * 🚨 EMERGENCY: Intelligent fallback for unmapped tool name variations
   */
  private intelligentToolNameFallback(toolName: string): string {
    const lowercaseName = toolName.toLowerCase();
    const registeredAgents = this.registry.listAgents().map(a => a.name);
    
    console.log(`🔧 Attempting intelligent fallback for: "${toolName}"`);
    
    // Pattern 1: *Extractor variations → Extractor  
    if (lowercaseName.includes('extractor') || (lowercaseName.includes('regex') && lowercaseName.includes('extract'))) {
      console.log(`🎯 Mapping ${toolName} → Extractor (contains 'extractor' or 'regex extract')`);
      return 'Extractor';
    }
    
    // Pattern 2: *Generator variations → PatternGenerator
    if (lowercaseName.includes('generator') && lowercaseName.includes('pattern')) {
      console.log(`🎯 Mapping ${toolName} → PatternGenerator (contains 'pattern' + 'generator')`);
      return 'PatternGenerator';
    }
    if (lowercaseName.includes('generator')) {
      console.log(`🎯 Mapping ${toolName} → PatternGenerator (contains 'generator')`);
      return 'PatternGenerator';
    }
    
    // Pattern 3: *Inspector/*Analyzer variations → DataInspector
    if (lowercaseName.includes('inspector') || lowercaseName.includes('analyzer')) {
      console.log(`🎯 Mapping ${toolName} → DataInspector (contains 'inspector' or 'analyzer')`);
      return 'DataInspector';
    }
    
    // Pattern 4: *Synthesizer/*Coordinator variations → SynthesisCoordinator
    if (lowercaseName.includes('synthesis') || lowercaseName.includes('coordinator')) {
      console.log(`🎯 Mapping ${toolName} → SynthesisCoordinator (contains 'synthesis' or 'coordinator')`);
      return 'SynthesisCoordinator';
    }
    
    // Pattern 5: *Planner/*Planning variations → PlanningAgent  
    if (lowercaseName.includes('planner') || lowercaseName.includes('planning')) {
      console.log(`🎯 Mapping ${toolName} → PlanningAgent (contains 'planner' or 'planning')`);
      return 'PlanningAgent';
    }
    
    // Pattern 6: Agent suffix removal - try without "Agent" suffix
    if (lowercaseName.endsWith('agent')) {
      const withoutAgent = toolName.slice(0, -5); // Remove "Agent"
      for (const agent of registeredAgents) {
        if (agent.toLowerCase().includes(withoutAgent.toLowerCase())) {
          console.log(`🎯 Mapping ${toolName} → ${agent} (removed 'Agent' suffix)`);
          return agent;
        }
      }
    }
    
    // Pattern 7: Semantic similarity matching
    for (const agent of registeredAgents) {
      if (this.isSemanticallyEquivalent(lowercaseName, agent.toLowerCase())) {
        console.log(`🎯 Mapping ${toolName} → ${agent} (semantic similarity)`);
        return agent;
      }
    }
    
    // Pattern 8: Last resort - find best partial match
    for (const agent of registeredAgents) {
      const agentLower = agent.toLowerCase();
      if (lowercaseName.includes(agentLower) || agentLower.includes(lowercaseName)) {
        console.log(`🎯 Mapping ${toolName} → ${agent} (partial match)`);
        return agent;
      }
    }
    
    console.error(`❌ CRITICAL: No fallback found for tool name: "${toolName}"`);
    console.error(`📋 Available tools: ${registeredAgents.join(', ')}`);
    return toolName; // Return original if no fallback found
  }
  
  /**
   * Check semantic equivalence between tool names
   */
  private isSemanticallyEquivalent(name1: string, name2: string): boolean {
    // Remove common prefixes/suffixes
    const clean1 = name1.replace(/^(data|pattern|synthesis|web)/, '').replace(/(agent|tool|coordinator)$/, '');
    const clean2 = name2.replace(/^(data|pattern|synthesis|web)/, '').replace(/(agent|tool|coordinator)$/, '');
    
    return clean1 === clean2 || 
           Math.abs(clean1.length - clean2.length) <= 2 && 
           (clean1.includes(clean2) || clean2.includes(clean1));
  }
  
  /**
   * 📊 Check if Extractor has successfully extracted data
   */
  private hasExtractedData(context: ResearchContext): boolean {
    // Check if extractedData exists and has raw items
    if (context.extractedData?.raw && context.extractedData.raw.length > 0) {
      return true;
    }
    
    // Check if extractedData has structured data
    if (context.extractedData?.structured && context.extractedData.structured.length > 0) {
      return true;
    }
    
    // Check agent findings for extracted data from Extractor
    const extractorFindings = context.sharedKnowledge?.agentFindings?.Extractor;
    if (extractorFindings && extractorFindings.extractedData && extractorFindings.extractedData.length > 0) {
      return true;
    }
    
    return false;
  }
  
  private hasSynthesisDraft(context: ResearchContext): boolean {
    const draft = context.synthesis?.answer || '';
    return draft.trim().length > 0;
  }
  
  /**
   * Check if we have minimal numeric evidence for synthesis
   */
  private hasMinimalNumericEvidence(context: ResearchContext): boolean {
    try {
      const items = context?.extractedData?.raw || [];
      if (!Array.isArray(items) || items.length === 0) return false;
      
      // Check for numeric content in original context or content
      const numericItems = items.filter((item: any) => {
        const text = String(item.metadata?.originalContext || item.content || '');
        return /(\d[\d\s.:]*\d)?\d/.test(text);
      });
      
      return numericItems.length >= 2;
    } catch {
      return false;
    }
  }
  
  /**
   * Determine if synthesis should be blocked due to lack of evidence
   */
  private shouldBlockSynthesisForEvidence(context: ResearchContext): boolean {
    // Check if query suggests performance/ranking
    const query = context.query?.toLowerCase() || '';
    const isPerformanceQuery = (
      /\b(best|top|fastest|slowest|performance|speed|benchmark|compare|ranking)\b/.test(query) &&
      /\b(hours?|minutes?|seconds?|tokens?\/s|throughput|time)\b/.test(query)
    );
    
    if (!isPerformanceQuery) {
      return false; // Not a performance query, don't block
    }
    
    // Check for numeric evidence
    return !this.hasMinimalNumericEvidence(context);
  }
  
  /**
   * Compute input signature for an agent based on relevant context
   */
  private computeInputSignature(agentName: string, context: ResearchContext): string {
    const parts: string[] = [];
    
    // Common inputs for all agents
    parts.push(`query:${context.query}`);
    parts.push(`chunks:${context.ragResults.chunks.length}`);
    
    // Agent-specific inputs
    switch (agentName) {
      case 'PatternGenerator':
        const measurements = context.sharedKnowledge?.documentInsights?.measurements || [];
        parts.push(`measurements:${measurements.length}`);
        parts.push(`measurementsHash:${this.hashArray(measurements)}`);
        break;
        
      case 'Extractor':
        const patterns = context.patterns || [];
        parts.push(`patterns:${patterns.length}`);
        parts.push(`patternsHash:${this.hashArray(patterns.map(p => p.regexPattern || p.description))}`);
        break;
        
      // BYPASSED: DataAnalyzer case removed - agent disabled
      case 'SynthesisCoordinator':
      case 'Synthesizer':
        const extractedData = context.extractedData?.raw || [];
        parts.push(`extracted:${extractedData.length}`);
        parts.push(`extractedHash:${this.hashArray(extractedData)}`);
        break;
    }
    
    return parts.join('|');
  }
  
  /**
   * Simple hash function for arrays
   */
  private hashArray(arr: any[]): string {
    if (!arr || arr.length === 0) return 'empty';
    const str = JSON.stringify(arr);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }
  
  /**
   * Check if agent output quality is insufficient
   */
  private isQualityInsufficient(agentName: string, context: ResearchContext): boolean {
    // Check for quality flags in shared knowledge
    const qualityFlag = context.sharedKnowledge?.qualityFlags?.[agentName];
    if (qualityFlag === 'insufficient' || qualityFlag === 'retry_recommended') {
      return true;
    }
    
    // Agent-specific quality checks
    switch (agentName) {
      case 'Extractor':
        // Insufficient if no data extracted
        return !context.extractedData?.raw || context.extractedData.raw.length === 0;
        
      case 'PatternGenerator':
        // Insufficient if no patterns generated
        return !context.patterns || context.patterns.length === 0;
        
      // BYPASSED: DataAnalyzer case removed - agent disabled
      // case 'DataAnalyzer':
        // Insufficient if no cleaned data
        // return !context.analyzedData?.cleaned || context.analyzedData.cleaned.length === 0;
    }
    
    return false;
  }
  
  // 🗑️ OLD METHODS: Replaced by Master LLM Orchestrator
  // All rigid pipeline logic replaced with intelligent tool-call decisions
  
  /**
   * Get sub-steps created during agent pipeline execution
   */
  getAgentSubSteps(): AgentSubStep[] {
    return this.progressTracker.getAllTrackers()
      .map(tracker => this.progressTracker.createSubStep(tracker.agentName))
      .filter(subStep => subStep !== null) as AgentSubStep[];
  }
  
  // Add context access for debug information
  private finalContext: ResearchContext | null = null;
  
  getContext(): ResearchContext | null {
    return this.finalContext;
  }
  
  /**
   * 🎯 Helper method to detect performance ranking queries
   */
  private isPerformanceQuery(query: string): boolean {
    const queryLower = query.toLowerCase();
    return queryLower.includes('top') || queryLower.includes('best') || 
           queryLower.includes('speedrun') || queryLower.includes('ranking') ||
           queryLower.includes('fastest') || queryLower.includes('compare');
  }
  
  // 🗑️ REMOVED: Unused helper methods (getAgentType, extractInsights) 
  // These were part of old pipeline logic that's now replaced by Master LLM Orchestrator
  
  /**
   * 🎯 INTELLIGENT QUALITY CONTROL: Use PlanningAgent to assess result quality
   */
  private async assessResultQuality(agentName: string, context: ResearchContext): Promise<{
    isAcceptable: boolean;
    status: string;
    reason: string;
    retryRecommended: boolean;
    improvement: string;
  }> {
    try {
      // Don't assess PlanningAgent with itself - that would create recursion
      if (agentName === 'PlanningAgent') {
        return {
          isAcceptable: true,
          status: 'acceptable',
          reason: 'PlanningAgent assessment skipped to avoid recursion',
          retryRecommended: false,
          improvement: ''
        };
      }

      const planningAgent = this.registry.get('PlanningAgent');
      if (!planningAgent) {
        return {
          isAcceptable: true,
          status: 'acceptable',
          reason: 'No PlanningAgent available for quality assessment',
          retryRecommended: false,
          improvement: ''
        };
      }

      // 🎯 CLAUDE CODE-STYLE CONSUMPTION LOGIC: Use dedicated validation methods
      console.log(`🔍 PlanningAgent consuming and validating ${agentName} results using Claude Code-style logic`);
      const consumptionResult = await (planningAgent as any).consumeAgentResults(context, agentName);
      
      if (consumptionResult.replanRequired) {
        return {
          isAcceptable: false,
          status: 'replan_required',
          reason: 'PlanningAgent identified quality issues requiring replanning',
          retryRecommended: true,
          improvement: 'Use corrective guidance from replanning requests'
        };
      }

      // If no specific consumption logic, fall back to existing assessment
      if (consumptionResult.shouldContinue) {
        return {
          isAcceptable: true,
          status: 'acceptable',
          reason: 'Results validated by PlanningAgent consumption logic',
          retryRecommended: false,
          improvement: ''
        };
      }

      // Fallback to existing LLM-based assessment for other agents
      const assessmentPrompt = this.buildQualityAssessmentPrompt(agentName, context);
      console.log(`🔍 Using LLM-based assessment for ${agentName} (no specific consumption logic)`);
      const response = await this.llm(assessmentPrompt);
      
      return this.parseQualityAssessment(response);
      
    } catch (error) {
      console.error(`❌ Failed to assess quality for ${agentName}:`, error);
      return {
        isAcceptable: true,
        status: 'assessment_failed',
        reason: 'Quality assessment failed, continuing',
        retryRecommended: false,
        improvement: ''
      };
    }
  }

  /**
   * 🎯 Build quality assessment prompt using pure query intelligence (no hardcoding)
   */
  private buildQualityAssessmentPrompt(agentName: string, context: ResearchContext): string {
    return `/no_think

TASK: Assess whether ${agentName} produced sufficient results to help answer this user query.

USER QUERY: "${context.query}"

CURRENT CONTEXT STATE:
${this.serializeContextForAssessment(context)}

INSTRUCTIONS:
You are an intelligent research coordinator. Analyze the user's query and determine what information would be needed to provide a good answer. Then assess whether the current context contains that information.

For the query "${context.query}":
1. **What does the user need?** What type of answer are they looking for?
2. **What information is required?** What would you need to provide that answer?
3. **Is it available?** Does the current context contain sufficient information?
4. **What's missing?** If insufficient, what specific information is needed?

RESPONSE FORMAT:
STATUS: [acceptable/insufficient/retry_recommended]
REASON: Brief explanation of what the user needs and what's available/missing
IMPROVEMENT: If retry_recommended, specific guidance on what to look for or how to improve the analysis

Assess based purely on query needs:`;
  }

  /**
   * 🎯 Serialize context for query-driven assessment (no hardcoded assumptions)
   */
  private serializeContextForAssessment(context: ResearchContext): string {
    const sections = [];
    
    // Include available data without assumptions about what's "good"
    if (context.documentAnalysis?.documents) {
      sections.push(`DOCUMENTS ANALYZED: ${context.documentAnalysis.documents.length} documents`);
    }
    
    if (context.sharedKnowledge.documentInsights) {
      const insights = context.sharedKnowledge.documentInsights;
      const available = Object.entries(insights)
        .filter(([, values]) => Array.isArray(values) && values.length > 0)
        .map(([key, values]) => `${key}: ${(values as string[]).join(', ')}`)
        .join('\n');
      if (available) {
        sections.push(`DOCUMENT INSIGHTS:\n${available}`);
      }
    }
    
    // 🔧 CRITICAL FIX: Include actual extracted data in quality assessment
    if (context.extractedData?.raw && context.extractedData.raw.length > 0) {
      const extractedCount = context.extractedData.raw.length;
      const sampleData = context.extractedData.raw.slice(0, 3).map((item, i) => {
        const content = item.content || (item as any).text || (item as any).match || JSON.stringify(item).substring(0, 100);
        return `${i+1}. ${content.substring(0, 100)}`;
      }).join('\n');
      
      sections.push(`EXTRACTED DATA: ${extractedCount} items extracted\nSample items:\n${sampleData}`);
    }
    
    // Include patterns if available
    if (context.patterns && context.patterns.length > 0) {
      sections.push(`PATTERNS: ${context.patterns.length} extraction patterns generated`);
    }
    
    // Include measurement data if available  
    if (context.sharedKnowledge.documentInsights?.measurements) {
      const measurementCount = context.sharedKnowledge.documentInsights.measurements.length;
      sections.push(`MEASUREMENTS: ${measurementCount} numeric measurements found in documents`);
    }
    
    if (context.ragResults?.chunks) {
      sections.push(`SOURCE CONTENT: ${context.ragResults.chunks.length} document chunks available`);
    }
    
    return sections.join('\n\n');
  }

  /**
   * 🎯 Parse quality assessment response from PlanningAgent
   */
  private parseQualityAssessment(response: string): {
    isAcceptable: boolean;
    status: string;
    reason: string;
    retryRecommended: boolean;
    improvement: string;
  } {
    const status = this.extractAssessmentField(response, 'STATUS') || 'acceptable';
    const reason = this.extractAssessmentField(response, 'REASON') || 'No specific reason provided';
    const improvement = this.extractAssessmentField(response, 'IMPROVEMENT') || '';

    const isAcceptable = status.toLowerCase().includes('acceptable');
    const retryRecommended = status.toLowerCase().includes('retry');

    return {
      isAcceptable,
      status,
      reason,
      retryRecommended,
      improvement
    };
  }

  /**
   * 🎯 Extract assessment fields from response (flexible parsing)
   */
  private extractAssessmentField(response: string, fieldName: string): string {
    const lines = response.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(fieldName.toLowerCase() + ':')) {
        return line.substring(line.indexOf(':') + 1).trim();
      }
    }
    return '';
  }

  /**
   * 🎯 Check if agent can be retried safely
   */
  private canRetryAgent(agentName: string): boolean {
    // Limit retries to prevent infinite loops
    const retryCount = this.agentRetryCount.get(agentName) || 0;
    return retryCount < 2;
  }

  /**
   * 🎯 Perform intelligent retry with improvement guidance
   */
  private async performIntelligentRetry(agentName: string, context: ResearchContext, improvement: string): Promise<void> {
    // Prevent concurrent retries
    if (this.retryingAgents.has(agentName)) {
      console.log(`⚠️ Agent ${agentName} is already retrying, skipping duplicate retry`);
      return;
    }
    
    // Track retry count
    const currentRetries = this.agentRetryCount.get(agentName) || 0;
    this.agentRetryCount.set(agentName, currentRetries + 1);
    
    // Mark as retrying
    this.retryingAgents.add(agentName);

    console.log(`🔄 Intelligent retry #${currentRetries + 1} for ${agentName}: ${improvement}`);

    try {
      // Clear previous results
      this.agentResults.delete(agentName);

      // 🎯 CLAUDE CODE-STYLE: Use PlanningAgent's corrective guidance if available
      const correctiveGuidance = (context.sharedKnowledge as any)?.correctiveGuidance;
      const replanningRequests = (context.sharedKnowledge as any)?.replanningRequests;
      
      if (correctiveGuidance && correctiveGuidance.target === agentName) {
        console.log(`🎯 Using PlanningAgent corrective guidance: ${correctiveGuidance.guidance}`);
        
        // Store specific corrective guidance
        if (!context.sharedKnowledge.agentGuidance) {
          context.sharedKnowledge.agentGuidance = {};
        }
        context.sharedKnowledge.agentGuidance[agentName] = correctiveGuidance.guidance;
        
        // Set priority flag for agent to use
        (context.sharedKnowledge as any).currentPriority = correctiveGuidance.priority;
        
      } else {
        // Store generic improvement guidance
        if (!context.sharedKnowledge.agentGuidance) {
          context.sharedKnowledge.agentGuidance = {};
        }
        context.sharedKnowledge.agentGuidance[agentName] = improvement;
      }

      // Log replanning context if available
      if (replanningRequests && replanningRequests.length > 0) {
        const latestRequest = replanningRequests[replanningRequests.length - 1];
        console.log(`🔄 Replanning context: ${latestRequest.action} - ${latestRequest.reason}`);
        console.log(`🎯 Specific corrective guidance: ${latestRequest.specificGuidance || 'Generic improvement'}`);
      }

      // Update progress tracker to show retry status
      const retryStage = `Retrying with corrective guidance (attempt #${currentRetries + 1})`;
      await this.progressTracker.updateProgress(agentName, 5, retryStage, 0, undefined);
      
      // Update tracker retry count
      const tracker = this.progressTracker.getTracker(agentName);
      if (tracker) {
        tracker.retryCount = currentRetries + 1;
      }
      
      // 🔒 ATOMIC STATE MANAGEMENT: Clear state and re-execute atomically
      // Clear previous results and remove from called agents
      this.agentResults.delete(agentName);
      this.calledAgents.delete(agentName);
      
      // Execute agent directly to avoid recursive orchestration
      const agent = this.registry.get(agentName);
      if (agent) {
        console.log(`🎯 Executing ${agentName} retry with applied corrective guidance`);
        
        // Track progress start
        await this.progressTracker.startAgent(agentName, agentName, context);
        
        // Execute with corrective guidance
        await agent.process(context);
        
        // Mark as successfully completed
        this.calledAgents.add(agentName);
        
        console.log(`✅ Agent ${agentName} retry completed successfully with corrective guidance`);
      } else {
        throw new Error(`Agent ${agentName} not found in registry`);
      }
      
    } finally {
      // Always clear retry flag
      this.retryingAgents.delete(agentName);
    }
  }

  // Track retry counts to prevent infinite loops
  private agentRetryCount = new Map<string, number>();
  
  /**
   * 🎯 CRITICAL: After DataInspector approves documents, fetch ALL chunks from those documents
   * DataInspector only needs samples to determine relevance, but downstream agents need complete data
   */
  private async expandToFullDocumentChunks(context: ResearchContext): Promise<void> {
    if (!context.documentAnalysis?.documents || !this.vectorStore) {
      console.log(`⚠️ Cannot expand chunks: documentAnalysis=${!!context.documentAnalysis?.documents}, vectorStore=${!!this.vectorStore}`);
      return;
    }
    
    console.log(`🔍 DataInspector approved ${context.documentAnalysis.documents.length} documents - fetching ALL chunks`);
    console.log(`📊 Approved documents:`, context.documentAnalysis.documents.map(d => d.documentName));
    
    try {
      const approvedDocumentIds = new Set(
        context.documentAnalysis.documents.map(doc => doc.documentId)
      );
      
      // Get all chunks from vector store
      const allChunks = await this.vectorStore.getAllChunks(['userdocs']);
      console.log(`📚 Total chunks in vector store: ${allChunks.length}`);
      
      // Filter to only chunks from approved documents
      const approvedChunks = allChunks.filter(chunk => {
        const chunkDocId = chunk.source || chunk.metadata?.filename || '';
        const chunkDocumentId = chunk.metadata?.documentId || '';
        
        // Check both source and documentId for matches
        return Array.from(approvedDocumentIds).some(docId => 
          chunkDocId.includes(docId) || 
          docId.includes(chunkDocId) ||
          chunkDocumentId === docId
        );
      });
      
      console.log(`🎯 Filtered to ${approvedChunks.length} chunks from approved documents`);
      console.log(`📊 Current context has ${context.ragResults.chunks.length} chunks`);
      
      if (approvedChunks.length > context.ragResults.chunks.length) {
        console.log(`📦 Expanded chunks: ${context.ragResults.chunks.length} → ${approvedChunks.length} (${approvedChunks.length - context.ragResults.chunks.length} additional chunks for approved documents)`);
        
        // Replace sampled chunks with ALL chunks from approved documents
        context.ragResults.chunks = approvedChunks.map(chunk => ({
          id: chunk.id,
          text: chunk.text,
          source: chunk.source,
          similarity: chunk.similarity || 0.8, // Default similarity for non-search results
          metadata: chunk.metadata,
          sourceDocument: chunk.source,
          sourceType: 'rag' as const
        }));
        
        context.ragResults.summary = `Expanded to ${approvedChunks.length} chunks from ${approvedDocumentIds.size} approved documents`;
      } else {
        console.log(`✅ No expansion needed: already have ${context.ragResults.chunks.length} chunks`);
      }
      
    } catch (error) {
      console.warn(`⚠️ Failed to expand chunks:`, error);
      // Continue with existing chunks if expansion fails
    }
  }
  
  // 🗑️ OLD METHODS: No longer needed with Master LLM Orchestrator
}
