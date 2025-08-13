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

export type LLMFunction = (prompt: string) => Promise<string>;

export class Orchestrator {
  private registry: AgentRegistry;
  private messageBus: MessageBus;
  private llm: LLMFunction;
  private progressTracker: AgentProgressTracker;
  private progressCallback?: AgentProgressCallback;
  
  // 🔥 CRITICAL FIX: Agent state tracking to prevent redundant calls
  private calledAgents: Set<string> = new Set();
  private agentResults: Map<string, any> = new Map();
  private lastAgentCalled: string | null = null;
  
  constructor(
    registry: AgentRegistry,
    messageBus: MessageBus,
    llm: LLMFunction,
    progressCallback?: AgentProgressCallback,
    config?: { enableWebSearch?: boolean; enableRAGSearch?: boolean }
  ) {
    this.registry = registry;
    this.messageBus = messageBus;
    this.llm = llm;
    this.progressCallback = progressCallback;
    this.progressTracker = new AgentProgressTracker(progressCallback);
    this.config = config;
  }
  
  private config?: { enableWebSearch?: boolean; enableRAGSearch?: boolean };
  
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
    const extractorCompleted = availableData.extractorCompleted;
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
- DataAnalyzer: ${dataAnalyzerCompleted ? 'COMPLETE ✅' : 'Available but optional'}
- Extracted Data: ${hasExtractedData ? 'READY ✅' : 'Not available'}
- Analyzed Data: ${hasAnalyzedData ? 'READY ✅' : 'Not available'}

**RECOMMENDED NEXT STEP**: Call SynthesisCoordinator to orchestrate final synthesis
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
    if (availableData.extractorCompleted) {
      phases.push('✅ Phase 3: Extraction (PatternGenerator + Extractor) - COMPLETE');
    } else if (availableData.patternGeneratorCompleted) {
      phases.push('→ Phase 3: Extraction (Extractor) - IN PROGRESS');
    } else if (availableData.dataInspectorCompleted) {
      phases.push('→ Phase 3: Extraction (PatternGenerator) - READY');
    } else {
      phases.push('⏳ Phase 3: Extraction - WAITING');
    }
    
    // Phase 4: Data Processing
    const dataAnalyzerCompleted = availableData.agentsCalled.includes('DataAnalyzer');
    if (dataAnalyzerCompleted) {
      phases.push('✅ Phase 4: Data Processing (DataAnalyzer) - COMPLETE');
    } else if (availableData.extractorCompleted) {
      phases.push('→ Phase 4: Data Processing (DataAnalyzer) - READY');
    } else {
      phases.push('⏳ Phase 4: Data Processing - WAITING');
    }
    
    // Phase 5: Synthesis
    const synthesisCompleted = availableData.agentsCalled.includes('SynthesisCoordinator') || 
                              availableData.agentsCalled.includes('Synthesizer') ||
                              availableData.agentsCalled.includes('ResponseFormatter');
    
    if (synthesisCompleted) {
      phases.push('✅ Phase 5: Synthesis - COMPLETE');
    } else if (dataAnalyzerCompleted || availableData.extractorCompleted) {
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
    if (!availableData.extractorCompleted && availableData.patternGeneratorCompleted) {
      return 'Extractor recommended to extract data using patterns';
    }
    if (availableData.extractorCompleted && !availableData.synthesizerCompleted) {
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
    
    return `Next recommended step: Call ${nextStep.agent} - ${nextStep.description}`;
  }

  /**
   * Set or update progress callback for UI updates
   */
  setProgressCallback(callback: AgentProgressCallback) {
    this.progressCallback = callback;
    this.progressTracker.setCallback(callback);
  }
  
  /**
   * 🧠 MASTER LLM ORCHESTRATOR - Intelligent Tool-Call System
   * Replaces rigid pipeline with Claude Code style intelligent decisions
   */
  async research(query: string, ragResults: SourceReference[]): Promise<string> {
    console.log(`🧠 Master LLM Orchestrator starting for: "${query}"`);
    
    // 🔥 RESET: Clear agent state for new research session
    this.calledAgents.clear();
    this.agentResults.clear();
    this.lastAgentCalled = null;
    
    // Initialize context
    const context = createInitialContext(query, ragResults);
    
    // 🚀 MASTER LLM ORCHESTRATION: Intelligent tool-call decisions
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
   * 🔄 RERUN SPECIFIC AGENT - Targeted Agent Execution with Context Preservation
   * Allows rerunning specific agents without restarting the entire pipeline
   */
  async rerunAgent(
    agentName: string, 
    context: ResearchContext, 
    preservedResults?: Map<string, any>
  ): Promise<ResearchContext> {
    console.log(`🔄 Rerunning agent: ${agentName}`);
    
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
      console.log(`⚡ Executing agent: ${agentName}`);
      await this.executeToolCall(agentName, context);
      
      console.log(`✅ Successfully reran agent: ${agentName}`);
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
      'SynthesisCoordinator': ['DataInspector'], // Can work with raw data
      'Synthesizer': ['DataInspector'],
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
   * 🎯 NEW: Validate context has required data for agent rerun (smarter than strict dependencies)
   */
  private validateContextForRerun(agentName: string, context: ResearchContext): {isValid: boolean, reason: string} {
    switch (agentName) {
      case 'DataInspector':
        // DataInspector needs RAG chunks
        if (!context.ragResults?.chunks || context.ragResults.chunks.length === 0) {
          return {isValid: false, reason: 'No RAG chunks available'};
        }
        break;
        
      case 'PlanningAgent':
        // PlanningAgent needs DataInspector results (document analysis or document insights)
        if (!context.documentAnalysis && !context.sharedKnowledge.documentInsights) {
          return {isValid: false, reason: 'No document analysis available from DataInspector'};
        }
        break;
        
      case 'PatternGenerator':
        // PatternGenerator needs either PlanningAgent strategy OR DataInspector insights
        const hasStrategy = context.sharedKnowledge.extractionStrategies && 
                           Object.keys(context.sharedKnowledge.extractionStrategies).length > 0;
        const hasInsights = context.sharedKnowledge.documentInsights && 
                           Object.keys(context.sharedKnowledge.documentInsights).length > 0;
        const hasRagChunks = context.ragResults?.chunks && context.ragResults.chunks.length > 0;
        
        if (!hasStrategy && !hasInsights && !hasRagChunks) {
          return {isValid: false, reason: 'No extraction strategy, document insights, or RAG chunks available'};
        }
        break;
        
      case 'Extractor':
        // Extractor needs patterns from PatternGenerator
        if (!context.patterns || context.patterns.length === 0) {
          return {isValid: false, reason: 'No patterns available from PatternGenerator'};
        }
        break;
        
      case 'SynthesisCoordinator':
      case 'Synthesizer':
        // Synthesis agents need extracted data or RAG chunks
        if ((!context.extractedData || context.extractedData.raw.length === 0) && 
            (!context.ragResults?.chunks || context.ragResults.chunks.length === 0)) {
          return {isValid: false, reason: 'No extracted data or RAG chunks for synthesis'};
        }
        break;
        
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
      'DataInspector': ['PlanningAgent', 'PatternGenerator', 'Extractor', 'SynthesisCoordinator', 'Synthesizer'],
      'PlanningAgent': ['PatternGenerator', 'Extractor'],
      'PatternGenerator': ['Extractor'],
      'Extractor': ['SynthesisCoordinator', 'Synthesizer'],
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
        synthesis: { answer: '', confidence: 0 }, // Will be filled by current context
        sharedKnowledge: {} // Will be filled by current context
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
    const maxIterations = 15; // Increased to handle skipped agents gracefully
    let currentGoal = `Answer the user's query: "${context.query}"`;
    
    while (iterationCount < maxIterations) {
      iterationCount++;
      console.log(`🔄 Master LLM Iteration ${iterationCount}: ${currentGoal}`);
      
      // 🧠 LLM DECISION: What tool should be called next?
      const decision = await this.makeMasterLLMDecision(context, currentGoal, iterationCount);
      
      if (decision.action === 'COMPLETE') {
        // 🚨 FIX: Handle invalid COMPLETE+toolName format
        if (decision.toolName) {
          console.log(`🔧 Master LLM returned COMPLETE with toolName - treating as CALL_TOOL: ${decision.toolName}`);
          await this.executeToolCall(decision.toolName, context);
          currentGoal = decision.nextGoal || currentGoal;
          continue;
        }
        
        // 🔥 CRITICAL: Validate completion conditions before allowing completion
        const canComplete = this.validateCompletionConditions(context);
        if (canComplete.allowed) {
          console.log(`✅ Master LLM completed goal: ${decision.reasoning}`);
          break;
        } else {
          console.log(`⚠️ Master LLM tried to complete prematurely: ${canComplete.reason}`);
          console.log(`🔄 Forcing continuation with required agent: ${canComplete.nextAgent}`);
          // Override completion with required next step
          if (canComplete.nextAgent) {
            await this.executeToolCall(canComplete.nextAgent, context);
            currentGoal = `Continue pipeline: call ${canComplete.nextAgent}`;
          }
        }
      }
      
      if (decision.action === 'CALL_TOOL') {
        console.log(`🔧 Master LLM calling tool: ${decision.toolName} - ${decision.reasoning}`);
        await this.executeToolCall(decision.toolName, context);
        
        // Update goal based on results
        currentGoal = decision.nextGoal || currentGoal;
      } else {
        // 🚨 FIX: Check if action is a completion variant first
        if (/^COMP?LETE$/i.test(decision.action) || /^(DONE|FINISH|END)$/i.test(decision.action)) {
          console.log(`🏁 Master LLM indicated completion with: "${decision.action}" - treating as COMPLETE`);
          
          // Validate completion conditions before allowing completion
          const canComplete = this.validateCompletionConditions(context);
          if (canComplete.allowed) {
            console.log(`✅ Master LLM completed goal: ${decision.reasoning || 'Task complete'}`);
            break;
          } else {
            console.log(`⚠️ Master LLM tried to complete prematurely: ${canComplete.reason}`);
            console.log(`🔄 Forcing continuation with required agent: ${canComplete.nextAgent}`);
            // Override completion with required next step
            if (canComplete.nextAgent) {
              await this.executeToolCall(canComplete.nextAgent, context);
              currentGoal = `Continue pipeline: call ${canComplete.nextAgent}`;
            }
          }
        } else {
          // 🚨 FIX: Handle case where LLM returns tool name directly as action (common with small models)
          const possibleToolName = this.normalizeToolName(decision.action);
          if (this.registry.get(possibleToolName)) {
            console.log(`🔧 Master LLM returned tool name directly: ${decision.action} → ${possibleToolName}`);
            await this.executeToolCall(possibleToolName, context);
            currentGoal = decision.nextGoal || currentGoal;
          } else {
            console.error(`❌ Master LLM made invalid decision: ${decision.action}`);
            console.error(`🐛 Full decision:`, decision);
            break;
          }
        }
      }
    }
    
    if (iterationCount >= maxIterations) {
      console.warn(`⚠️ Master LLM reached maximum iterations (${maxIterations})`);
    }
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
- Patterns Generated: ${availableData.patternGeneratorCompleted ? `COMPLETED ✅ - PatternGenerator called, ${availableData.patternsGenerated} patterns` : 'NOT DONE ❌ - need PatternGenerator'}
- Data Extracted: ${availableData.extractorCompleted ? 'COMPLETED ✅ - Extractor already called' : 'NOT DONE ❌ - need Extractor'}
- Data Analyzed: ${availableData.dataAnalyzerCompleted ? 'COMPLETED ✅ - DataAnalyzer already called' : 'NOT DONE ❌ - need DataAnalyzer'}
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

🎯 INTELLIGENT ORCHESTRATION GUIDANCE:
1. **START WITH DataInspector** if not called yet - Analyzes and filters documents (${availableData.dataInspectorCompleted ? 'DONE ✅' : 'REQUIRED ❌'})
2. **THEN PlanningAgent** if DataInspector done - Creates execution strategy (${availableData.planningAgentCompleted ? 'DONE ✅' : availableData.dataInspectorCompleted ? 'RECOMMENDED' : 'NOT YET'})
3. **🔥 CRITICAL: FOLLOW EXECUTION PLAN** if available - The plan is validated and prevents sequencing errors
4. **PLAN-AWARE DECISIONS** - Your decisions are validated against the execution plan automatically
5. **TRUST THE PLAN** - The PlanningAgent created an intelligent sequence - follow it exactly
6. **AVOID REDUNDANT CALLS** - Don't call the same agent twice unless necessary

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
${availableData.planningAgentCompleted ? `
🎯 **EXECUTION PLAN ACTIVE**: Plan-aware validation is ENABLED
${this.getNextPlannedStep(context, availableData)}

⚠️ **CRITICAL**: Your decision will be validated against this plan. Follow the recommended step to avoid sequencing violations.
` : ''}
${!availableData.planningAgentCompleted && availableData.dataInspectorCompleted ? '\n💡 **OR** make intelligent tool decisions based on document analysis' : ''}`}

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
      
      // 🔥 CRITICAL FIX: Check if Synthesizer has generated meaningful answer
      const synthesizerCalled = this.calledAgents.has('Synthesizer');
      const coordinatorCalled = this.calledAgents.has('SynthesisCoordinator');
      const synthesisCompleted = synthesizerCalled || coordinatorCalled;
      
      const hasValidAnswer = context.synthesis?.answer && 
                            context.synthesis.answer.length > 50 && 
                            !context.synthesis.answer.includes('No relevant information found');
      
      console.log(`🔍 COMPLETION CHECK: Synthesizer: ${synthesizerCalled}, Coordinator: ${coordinatorCalled}, Valid answer: ${hasValidAnswer}`);
      console.log(`📝 Answer preview: "${context.synthesis?.answer?.substring(0, 100) || 'No answer'}..."`);
      
      // If synthesis completed successfully (either approach), allow completion
      if (synthesisCompleted && hasValidAnswer) {
        console.log(`✅ COMPLETION ALLOWED: Synthesizer generated meaningful answer (${context.synthesis.answer.length} chars)`);
        return {
          allowed: true,
          reason: `Execution plan completed with valid synthesis: ${executionPlan.strategy}`
        };
      }
      
      // If no meaningful answer yet, check fallback options
      if (!hasValidAnswer) {
        const fallback = executionPlan.fallbackOptions?.[0];
        if (fallback === 'web-search-expansion' && !this.calledAgents.has('WebSearchAgent')) {
          return {
            allowed: false,
            reason: 'No answer found - trying web search fallback',
            nextAgent: 'WebSearchAgent'
          };
        }
        
        // Try synthesis pipeline if not called yet
        if (!synthesisCompleted) {
          // Prefer new multi-agent approach
          if (!this.calledAgents.has('DataAnalyzer')) {
            return {
              allowed: false,
              reason: 'Need to analyze extracted data before synthesis',
              nextAgent: 'DataAnalyzer'
            };
          }
          if (!coordinatorCalled) {
            return {
              allowed: false,
              reason: 'Need to coordinate synthesis of available information',
              nextAgent: 'SynthesisCoordinator'
            };
          }
          // Fallback to old Synthesizer if needed
          return {
            allowed: false,
            reason: 'Need to synthesize available information',
            nextAgent: 'Synthesizer'
          };
        }
        
        // Synthesizer called but failed - don't retry infinitely
        console.warn(`⚠️ FORCED COMPLETION: Synthesizer called but produced insufficient result`);
        return {
          allowed: true,
          reason: 'Forced completion - Synthesizer attempted but produced limited results'
        };
      }
      
      // Execution plan complete with result
      return {
        allowed: true,
        reason: `Execution plan completed: ${executionPlan.strategy} (${calledAgents.length} agents used)`
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
    
    // Ensure Extractor runs before Synthesizer
    if (!this.calledAgents.has('Extractor')) {
      return {
        allowed: false,
        reason: 'Extractor not called - must extract data before synthesis',
        nextAgent: 'Extractor'
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
      // New multi-synthesis agents
      'DataAnalyzer': '🆕 Cleans and categorizes extracted data (use AFTER Extractor, BEFORE synthesis)',
      'SynthesisCoordinator': '🆕 Assembles final report from analyzed data (use INSTEAD of Synthesizer)',
      // Old synthesis agent (deprecated but kept for fallback)
      'Synthesizer': '⚠️ LEGACY - Use DataAnalyzer→SynthesisCoordinator instead',
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
   * 📊 Analyze current context state for Master LLM decisions
   * 🔥 CRITICAL FIX: Include agent call history to prevent redundant calls
   */
  private analyzeCurrentState(context: ResearchContext): any {
    const agentStatus = {
      DataInspector: this.calledAgents.has('DataInspector'),
      PlanningAgent: this.calledAgents.has('PlanningAgent'),
      PatternGenerator: this.calledAgents.has('PatternGenerator'), 
      Extractor: this.calledAgents.has('Extractor'),
      WebSearchAgent: this.calledAgents.has('WebSearchAgent'),
      Synthesizer: this.calledAgents.has('Synthesizer')
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
      
      // Agent-specific status
      dataInspectorCompleted: agentStatus.DataInspector,
      planningAgentCompleted: agentStatus.PlanningAgent,
      patternGeneratorCompleted: agentStatus.PatternGenerator,
      extractorCompleted: agentStatus.Extractor,
      webSearchAgentCompleted: agentStatus.WebSearchAgent,
      synthesizerCompleted: agentStatus.Synthesizer
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
  private validateAgentExecution(toolName: string, context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string } {
    const normalizedToolName = this.normalizeToolName(toolName);
    const executionPlan = context.sharedKnowledge?.executionPlan as ExecutionPlan | undefined;
    const calledAgents = Array.from(this.calledAgents);
    
    console.log(`🔍 PLAN-GUIDED VALIDATION: ${normalizedToolName}`);
    console.log(`📋 Current agents called: [${calledAgents.join(', ')}]`);
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
        suggestion: 'Call DataInspector before proceeding'
      };
    }
    
    // RULE 3: Plan-aware validation (intelligent sequencing)
    if (executionPlan && executionPlan.steps && executionPlan.steps.length > 0) {
      return this.validateAgainstExecutionPlan(normalizedToolName, executionPlan, calledAgents, context);
    }
    
    // RULE 4: Intelligent fallback validation (when no plan exists)
    return this.validateWithIntelligentDefaults(normalizedToolName, context, calledAgents);
  }
  
  /**
   * 🤖 Validate intelligent additions to execution plan (agents not explicitly planned)
   */
  private validateIntelligentAddition(toolName: string, plan: ExecutionPlan, context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string } {
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
      // Extractor is essential for data extraction - allow even if not planned
      console.log(`⚡ Extractor is essential for data extraction - allowing intelligent addition`);
      return { 
        allowed: true, 
        reason: 'Extractor is essential for data extraction - intelligent addition to plan' 
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
      case 'DataAnalyzer':
        // DataAnalyzer needs extracted data from Extractor
        console.log(`🎯 Validating DataAnalyzer prerequisites - checking extracted data`);
        const hasExtractedForAnalysis = this.hasExtractedData(context);
        console.log(`📊 Has extracted data: ${hasExtractedForAnalysis}`);
        
        if (!hasExtractedForAnalysis && !this.calledAgents.has('Extractor')) {
          // Find Extractor in prerequisites
          const extractorStep = uncompletedPrerequisites.find(step => 
            this.normalizeToolName(step.agent) === 'Extractor'
          );
          if (extractorStep) critical.push(extractorStep);
        }
        break;
        
      case 'SynthesisCoordinator':
        // SynthesisCoordinator needs analyzed data from DataAnalyzer
        console.log(`🎯 Validating SynthesisCoordinator prerequisites - checking analyzed data`);
        const hasAnalyzedData = context.analyzedData?.cleaned && context.analyzedData.cleaned.length > 0;
        console.log(`📊 Has analyzed data: ${hasAnalyzedData}`);
        
        if (!hasAnalyzedData && !this.calledAgents.has('DataAnalyzer')) {
          // Find DataAnalyzer in prerequisites
          const analyzerStep = uncompletedPrerequisites.find(step => 
            this.normalizeToolName(step.agent) === 'DataAnalyzer'
          );
          if (analyzerStep) critical.push(analyzerStep);
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
  private validateAgainstExecutionPlan(toolName: string, plan: ExecutionPlan, calledAgents: string[], context: ResearchContext): { allowed: boolean; reason: string; suggestion?: string } {
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
        suggestion: `${nextRequired.agent} is essential for ${toolName} - ${nextRequired.action}`
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
  private validateWithIntelligentDefaults(toolName: string, context: ResearchContext, calledAgents: string[]): { allowed: boolean; reason: string; suggestion?: string } {
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
    
    // Synthesizer: LEGACY - Guide towards new synthesis pipeline
    if (toolName === 'Synthesizer') {
      // Check if new synthesis agents are available
      const hasDataAnalyzer = this.registry.get('DataAnalyzer') !== null;
      const hasSynthesisCoordinator = this.registry.get('SynthesisCoordinator') !== null;
      
      // If new agents exist, guide towards using them
      if (hasDataAnalyzer && hasSynthesisCoordinator) {
        // Check if DataAnalyzer was already called
        if (calledAgents.includes('DataAnalyzer')) {
          // DataAnalyzer done, should use SynthesisCoordinator
          if (!calledAgents.includes('SynthesisCoordinator')) {
            return {
              allowed: false,
              reason: 'Use SynthesisCoordinator instead of Synthesizer for final report assembly',
              suggestion: 'Call SynthesisCoordinator to assemble the final report from analyzed data'
            };
          }
        } else {
          // DataAnalyzer not called yet
          const hasExtractedData = this.hasExtractedData(context);
          if (hasExtractedData) {
            // Have data but haven't analyzed it
            return {
              allowed: false,
              reason: 'Use new synthesis pipeline: DataAnalyzer → SynthesisCoordinator',
              suggestion: 'Call DataAnalyzer first to clean and categorize extracted data'
            };
          } else if (!calledAgents.includes('Extractor')) {
            // No data extracted yet
            return {
              allowed: false,
              reason: 'No extracted data available for synthesis',
              suggestion: 'Call Extractor first, then DataAnalyzer → SynthesisCoordinator'
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
      
      // If no extracted data but Extractor hasn't been called, suggest it
      if (!calledAgents.includes('Extractor')) {
        return {
          allowed: false,
          reason: 'No extracted data available for synthesis',
          suggestion: 'Call Extractor first to extract relevant information'
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
    
    // 🧠 PLAN-AWARE SEQUENCING VALIDATION - Replaces hardcoded rules with intelligent validation
    const validation = this.validateAgentExecution(normalizedToolName, context);
    if (!validation.allowed) {
      console.error(`❌ PLAN-AWARE SEQUENCING VIOLATION: ${validation.reason}`);
      if (validation.suggestion) {
        console.error(`💡 Suggestion: ${validation.suggestion}`);
      }
      throw new Error(`Plan-aware sequencing violation: ${validation.reason}`);
    }
    
    console.log(`✅ Agent execution validated: ${validation.reason}`);
    
    const agent = this.registry.get(normalizedToolName);
    if (!agent) {
      console.error(`❌ Tool name normalization failed. Original: "${toolName}", Normalized: "${normalizedToolName}"`);
      console.error(`📋 Available tools:`, this.registry.listAgents().map(a => a.name));
      throw new Error(`Tool ${toolName} (normalized: ${normalizedToolName}) not found in registry. Available: ${this.registry.listAgents().map(a => a.name).join(', ')}`);
    }
    
    // 🔥 INTELLIGENT DUPLICATE PREVENTION: Allow Synthesizer re-execution if previously called with no data
    if (this.calledAgents.has(normalizedToolName)) {
      if (normalizedToolName === 'Synthesizer') {
        // Check if Synthesizer was called before with no data and now data is available
        const hasExtractedData = this.hasExtractedData(context);
        const synthesisAnswer = context.synthesis?.answer || '';
        const wasCalledWithNoData = synthesisAnswer.trim() === '' || synthesisAnswer.includes('No relevant information found');
        
        if (hasExtractedData && wasCalledWithNoData) {
          console.log(`🔄 RE-CALLING Synthesizer: Data now available after previous empty call`);
          console.log(`📊 Previously had no data, now has extracted data - allowing re-execution`);
          // Remove from called agents to allow re-execution
          this.calledAgents.delete(normalizedToolName);
        } else {
          console.warn(`⚠️ Agent ${normalizedToolName} already called with data, skipping to prevent redundant processing`);
          
          // 🔧 FIX: Log progression guidance for Master LLM to see in next iteration
          const planStatus = this.getExecutionPlanStatus(context);
          console.log(`📋 Agent ${normalizedToolName} was already executed successfully with data.`);
          console.log(`📊 Current Pipeline Status: ${planStatus}`);
          console.log(`💡 Suggestion: Continue to the next planned step in your execution sequence.`);
          
          // Store guidance in context for persistence
          context.sharedKnowledge.lastSkippedAgent = {
            agent: normalizedToolName,
            reason: 'Already executed with data',
            planStatus: planStatus,
            timestamp: Date.now()
          };
          return;
        }
      } else {
        console.warn(`⚠️ Agent ${normalizedToolName} already called, skipping to prevent redundant processing`);
        
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
      // 🔥 TRACK: Mark agent as called BEFORE execution
      this.calledAgents.add(normalizedToolName);
      this.lastAgentCalled = normalizedToolName;
      
      // 🚨 FIX: Track agent progress for getAgentSubSteps() to work properly
      this.progressTracker.startAgent(normalizedToolName, normalizedToolName, context);
      
      await agent.process(context);
      
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
      
      // 🚨 FIX: Mark agent as completed with result and capture actual output
      const agentOutput = this.extractAgentOutput(context, normalizedToolName);
      this.progressTracker.completeAgent(normalizedToolName, { 
        result: 'success',
        output: agentOutput 
      });
      
    } catch (error) {
      console.error(`❌ Tool ${normalizedToolName} failed:`, error);
      
      // 🔥 STORE: Save failed result but keep agent in called set to prevent retries
      this.agentResults.set(normalizedToolName, {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      });
      
      // 🚨 FIX: Mark agent as failed
      this.progressTracker.errorAgent(normalizedToolName, error instanceof Error ? error.message : 'Unknown error');
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
      // Lowercase versions
      'datainspector': 'DataInspector',
      'planningagent': 'PlanningAgent',
      'patterngenerator': 'PatternGenerator',
      'extractor': 'Extractor',
      'websearchagent': 'WebSearchAgent',
      'synthesizer': 'Synthesizer',
      'queryplanner': 'QueryPlanner',
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
      // 🚨 CALL with space variations (LLM generates "CALL ToolName" format)
      'CALL DataInspector': 'DataInspector',
      'CALL PlanningAgent': 'PlanningAgent',
      'CALL PatternGenerator': 'PatternGenerator',
      'CALL Extractor': 'Extractor',
      'CALL WebSearchAgent': 'WebSearchAgent',
      'CALL Synthesizer': 'Synthesizer',
      'CALL QueryPlanner': 'QueryPlanner',
      // 🚨 LLM Hallucination fixes
      'DATAINSPIRATOR': 'DataInspector', // Common LLM typo/hallucination
      'DATAINSPECTION': 'DataInspector',
      'INSPECTOR': 'DataInspector',
      'PLANNER': 'PlanningAgent',
      'PLANNING': 'PlanningAgent',
      'GENERATOR': 'PatternGenerator',
      'EXTRACT': 'Extractor',
      'WEBSEARCH': 'WebSearchAgent',
      'SEARCH': 'WebSearchAgent',
      'SYNTHESIS': 'Synthesizer',
      'SYNESTHESIZER': 'Synthesizer', // LLM misspelling "Synthesizer" as "SYNESTHESIZER"
      'QUERYPLANNER': 'QueryPlanner',
      
      // New multi-synthesis agents
      'DATAANALYZER': 'DataAnalyzer',
      'DATAANALYSISAGENT': 'DataAnalyzer',
      'DATA_ANALYZER': 'DataAnalyzer',
      'DATA_ANALYSIS_AGENT': 'DataAnalyzer',
      'dataanalyzer': 'DataAnalyzer',
      'data_analyzer': 'DataAnalyzer',
      'CALL_DATA_ANALYZER': 'DataAnalyzer',
      'CALL DataAnalyzer': 'DataAnalyzer',
      
      'SYNTHESISCOORDINATOR': 'SynthesisCoordinator',
      'SYNTHESIS_COORDINATOR': 'SynthesisCoordinator',
      'synthesiscoordinator': 'SynthesisCoordinator',
      'synthesis_coordinator': 'SynthesisCoordinator',
      'CALL_SYNTHESIS_COORDINATOR': 'SynthesisCoordinator',
      'CALL SynthesisCoordinator': 'SynthesisCoordinator'
    };
    
    // Return mapped name or original if no mapping found
    return toolNameMap[toolName] || toolName;
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

      // Create a quality assessment prompt for PlanningAgent
      const assessmentPrompt = this.buildQualityAssessmentPrompt(agentName, context);
      
      console.log(`🔍 Asking PlanningAgent to assess ${agentName} results`);
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
IMPROVEMENT: If retry recommended, what specific information should be extracted

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
        sections.push(`EXTRACTED TERMS:\n${available}`);
      }
    }
    
    if (context.patterns && context.patterns.length > 0) {
      sections.push(`PATTERNS: ${context.patterns.length} extraction patterns generated`);
    }
    
    if (context.extractedData?.raw && context.extractedData.raw.length > 0) {
      sections.push(`EXTRACTED DATA: ${context.extractedData.raw.length} items extracted`);
      // Show sample of what was extracted
      const sample = context.extractedData.raw.slice(0, 3)
        .map(item => `"${(item.content || '').substring(0, 100)}..."`)
        .join('\n');
      sections.push(`SAMPLE EXTRACTIONS:\n${sample}`);
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
    // Track retry count
    const currentRetries = this.agentRetryCount.get(agentName) || 0;
    this.agentRetryCount.set(agentName, currentRetries + 1);

    console.log(`🔄 Intelligent retry #${currentRetries + 1} for ${agentName}: ${improvement}`);

    // Clear previous results
    this.calledAgents.delete(agentName);
    this.agentResults.delete(agentName);

    // Store improvement guidance in context
    if (!context.sharedKnowledge.agentGuidance) {
      context.sharedKnowledge.agentGuidance = {};
    }
    context.sharedKnowledge.agentGuidance[agentName] = improvement;

    // Re-execute the agent
    const agent = this.registry.get(agentName);
    if (agent) {
      console.log(`🎯 Re-executing ${agentName} with improvement guidance: ${improvement}`);
      await agent.process(context);
    }
  }

  // Track retry counts to prevent infinite loops
  private agentRetryCount = new Map<string, number>();
  
  // 🗑️ OLD METHODS: No longer needed with Master LLM Orchestrator
}