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
    progressCallback?: AgentProgressCallback
  ) {
    this.registry = registry;
    this.messageBus = messageBus;
    this.llm = llm;
    this.progressCallback = progressCallback;
    this.progressTracker = new AgentProgressTracker(progressCallback);
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
    
    return context.synthesis.answer || 'Unable to generate an answer from the available information.';
  }
  
  /**
   * 🧠 MASTER LLM ORCHESTRATION - Intelligent Tool-Call System
   * Makes dynamic decisions about which tools to call and when, like Claude Code/Cursor
   */
  private async masterLLMOrchestration(context: ResearchContext): Promise<void> {
    console.log(`🎯 Master LLM analyzing situation and planning tool calls...`);
    
    let iterationCount = 0;
    const maxIterations = 10; // Prevent infinite loops
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

CURRENT SITUATION:
- Available Documents: ${context.ragResults.chunks.length} chunks PRE-LOADED (no need to search)
- Document Analysis: ${availableData.dataInspectorCompleted ? 'COMPLETED ✅ - DataInspector already called' : 'NOT DONE ❌ - need DataInspector'}
- Patterns Generated: ${availableData.patternGeneratorCompleted ? `COMPLETED ✅ - PatternGenerator called, ${availableData.patternsGenerated} patterns` : 'NOT DONE ❌ - need PatternGenerator'}
- Data Extracted: ${availableData.extractorCompleted ? 'COMPLETED ✅ - Extractor already called' : 'NOT DONE ❌ - need Extractor'}
- Final Answer: ${availableData.synthesizerCompleted ? 'COMPLETED ✅ - Synthesizer called' : 'NOT DONE ❌ - need Synthesizer'}

🧠 AVAILABLE TOOLS (use intelligently based on context):
✅ "DataInspector" - Magic document filtering with 2 samples per doc (${availableData.dataInspectorCompleted ? 'ALREADY CALLED' : 'available'})
✅ "PlanningAgent" - Creates intelligent execution strategies (${availableData.planningAgentCompleted ? 'ALREADY CALLED' : 'available'})
✅ "PatternGenerator" - Creates regex patterns for data extraction (${availableData.patternGeneratorCompleted ? 'ALREADY CALLED' : 'available'})
✅ "Extractor" - Extracts data using patterns or LLM analysis (${availableData.extractorCompleted ? 'ALREADY CALLED' : 'available'})
✅ "WebSearchAgent" - Expands knowledge base when local data insufficient (${availableData.webSearchAgentCompleted ? 'ALREADY CALLED' : 'available'})
✅ "Synthesizer" - Creates final answer from available data (${availableData.synthesizerCompleted ? 'ALREADY CALLED' : 'available'})

⚠️ CRITICAL: Use EXACT names above. Do NOT create variations.

🎯 MANDATORY SEQUENCING RULES:
1. **ALWAYS START WITH DataInspector** - NEVER call any other agent first (already called: ${availableData.agentsCalled.join(', ') || 'none'})
2. **DataInspector REQUIRED** - Must analyze documents and filter relevant ones before any extraction
3. **NO Extractor without DataInspector** - Extractor ONLY after DataInspector has filtered documents
4. **Logical Flow**: DataInspector → PlanningAgent → PatternGenerator → Extractor → WebSearchAgent → Synthesizer
5. **Never skip DataInspector** even if you think you have enough data - it filters irrelevant documents

📊 CURRENT DATA AVAILABLE:
- Documents: ${availableData.chunksSelected ? `${context.ragResults.chunks.length} chunks available` : 'No documents available'}
- Document Analysis: ${availableData.hasDocumentAnalysis ? 'Available from DataInspector' : 'Not available'}
- Patterns: ${availableData.patternsGenerated > 0 ? `${availableData.patternsGenerated} patterns generated` : 'No patterns generated'}
- Extracted Data: ${availableData.dataExtracted ? 'Data extraction completed' : 'No data extracted yet'}
- Current Answer: ${availableData.hasFinalAnswer ? 'Final answer ready' : 'No final answer yet'}

🤖 INTELLIGENT DECISION:
Based on the goal "${currentGoal}" and available data above, what tool should be called next?

${availableData.agentCallCount === 0 ? `

🚨 **MANDATORY FIRST CALL**: Since NO agents have been called yet, you MUST start with DataInspector:
- **REQUIRED**: DataInspector to analyze and filter ${context.ragResults.chunks.length} documents
- **Purpose**: Filter relevant documents (e.g., keep Rutwik docs, remove Tyler docs for Rutwik query)  
- **Never skip this step** - DataInspector magic filtering is essential

CALL DataInspector first - no exceptions!` : context.ragResults.chunks.length === 0 ? `

🚨 NO DOCUMENTS AVAILABLE: Since no documents are provided, consider these intelligent options:
1. **WebSearchAgent** - Search for information about "${context.query}"
2. **Synthesizer** - Provide guidance on what information would be needed
3. **COMPLETE** - If the query can be answered without documents (general knowledge)

IMPORTANT: Don't give up! Either search for data or explain what's needed.` : `
📊 DOCUMENTS AVAILABLE: Continue with logical flow based on completed agents:
${!availableData.dataInspectorCompleted ? '🔥 **NEXT REQUIRED**: DataInspector (must filter documents first)' : ''}
${availableData.dataInspectorCompleted && !availableData.planningAgentCompleted ? '📋 **NEXT**: PlanningAgent (create execution strategy)' : ''}
${availableData.planningAgentCompleted && !availableData.patternGeneratorCompleted ? '🔧 **NEXT**: PatternGenerator (create regex patterns)' : ''}
${availableData.patternGeneratorCompleted && !availableData.extractorCompleted ? '⚡ **NEXT**: Extractor (execute patterns)' : ''}
${availableData.extractorCompleted && !availableData.synthesizerCompleted ? '📝 **NEXT**: Synthesizer (create final answer)' : ''}
Consider: Do you have enough extracted information, or need WebSearchAgent expansion?`}

🎯 RESPONSE FORMAT:

To call a tool:
ACTION: CALL_TOOL
TOOL_NAME: [DataInspector|PlanningAgent|PatternGenerator|Extractor|WebSearchAgent|Synthesizer]
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
   * 🔥 CRITICAL: Validate completion conditions to prevent premature completion
   */
  private validateCompletionConditions(context: ResearchContext): { allowed: boolean; reason: string; nextAgent?: string } {
    const calledAgents = Array.from(this.calledAgents);
    
    // RULE 1: Must have called DataInspector first
    if (!this.calledAgents.has('DataInspector')) {
      return {
        allowed: false,
        reason: 'DataInspector not called - required for document analysis',
        nextAgent: 'DataInspector'
      };
    }
    
    // RULE 2: Must have generated patterns after DataInspector
    if (this.calledAgents.has('DataInspector') && !this.calledAgents.has('PatternGenerator')) {
      return {
        allowed: false,
        reason: 'PatternGenerator not called - required after DataInspector analysis',
        nextAgent: 'PatternGenerator'
      };
    }
    
    // RULE 3: Must have extracted data using patterns
    if (this.calledAgents.has('PatternGenerator') && !this.calledAgents.has('Extractor')) {
      return {
        allowed: false,
        reason: 'Extractor not called - required to extract data using generated patterns',
        nextAgent: 'Extractor'
      };
    }
    
    // RULE 4: Must have synthesized final answer
    if (this.calledAgents.has('Extractor') && !this.calledAgents.has('Synthesizer')) {
      return {
        allowed: false,
        reason: 'Synthesizer not called - required to create final answer from extracted data',
        nextAgent: 'Synthesizer'
      };
    }
    
    // RULE 5: Must have actual answer content
    if (!context.synthesis?.answer || context.synthesis.answer.length < 50) {
      return {
        allowed: false,
        reason: 'No substantial answer generated - Synthesizer must create meaningful response',
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
      agentsNotCalled: ['DataInspector', 'PlanningAgent', 'PatternGenerator', 'Extractor', 'WebSearchAgent', 'Synthesizer'].filter(agent => !this.calledAgents.has(agent)),
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
    const lines = response.split('\n').map(line => line.trim());
    let action = '';
    let toolName = '';
    let reasoning = '';
    let nextGoal = '';
    
    // Standard format parsing
    for (const line of lines) {
      if (line.startsWith('ACTION:')) {
        action = line.replace('ACTION:', '').trim();
      } else if (line.startsWith('TOOL_NAME:')) {
        toolName = line.replace('TOOL_NAME:', '').trim();
      } else if (line.startsWith('REASONING:')) {
        reasoning = line.replace('REASONING:', '').trim();
      } else if (line.startsWith('NEXT_GOAL:')) {
        nextGoal = line.replace('NEXT_GOAL:', '').trim();
      }
    }
    
    // 🚨 FIX: Handle small model variations and direct tool name responses
    if (!action && !toolName) {
      // Try to find tool names directly in response
      const toolNames = ['DataInspector', 'PlanningAgent', 'PatternGenerator', 'Extractor', 'WebSearchAgent', 'Synthesizer'];
      const upperToolNames = ['DATAINSPECTOR', 'PLANNINGAGENT', 'PATTERNGENERATOR', 'EXTRACTOR', 'WEBSEARCHAGENT', 'SYNTHESIZER'];
      
      for (const tool of toolNames) {
        if (response.includes(tool)) {
          action = 'CALL_TOOL';
          toolName = tool;
          break;
        }
      }
      
      if (!toolName) {
        for (const tool of upperToolNames) {
          if (response.includes(tool)) {
            action = 'CALL_TOOL';
            toolName = this.normalizeToolName(tool);
            break;
          }
        }
      }
    }
    
    // Handle case where LLM returns tool name as action
    // 🚨 CRITICAL FIX: Never override COMPLETE decisions - prevents infinite loops
    if (action && !toolName && action !== 'COMPLETE') {
      const normalizedAction = this.normalizeToolName(action);
      if (this.registry.get(normalizedAction)) {
        toolName = normalizedAction;
        action = 'CALL_TOOL';
      }
    }
    
    // Default reasoning if missing
    if (!reasoning && toolName) {
      reasoning = `Need to call ${toolName} to progress toward the goal`;
    }
    
    return { action, toolName, reasoning, nextGoal };
  }
  
  /**
   * 🔧 Execute tool call based on Master LLM decision
   */
  private async executeToolCall(toolName: string, context: ResearchContext): Promise<void> {
    // 🚨 FIX: Normalize tool name case (LLM returns "EXTRACTOR", registry has "Extractor")
    const normalizedToolName = this.normalizeToolName(toolName);
    
    // 🔥 MANDATORY SEQUENCING ENFORCEMENT
    if (normalizedToolName === 'Extractor' && !this.calledAgents.has('DataInspector')) {
      console.error(`❌ SEQUENCING VIOLATION: Extractor cannot be called before DataInspector!`);
      console.error(`🔥 DataInspector must filter documents first. Current agents called: [${Array.from(this.calledAgents).join(', ')}]`);
      throw new Error(`Mandatory sequencing violation: DataInspector required before Extractor`);
    }
    
    if (normalizedToolName === 'PatternGenerator' && !this.calledAgents.has('DataInspector')) {
      console.warn(`⚠️ RECOMMENDED: PatternGenerator works better after DataInspector filters documents`);
    }
    
    const agent = this.registry.get(normalizedToolName);
    if (!agent) {
      console.error(`❌ Tool name normalization failed. Original: "${toolName}", Normalized: "${normalizedToolName}"`);
      console.error(`📋 Available tools:`, this.registry.listAgents().map(a => a.name));
      throw new Error(`Tool ${toolName} (normalized: ${normalizedToolName}) not found in registry. Available: ${this.registry.listAgents().map(a => a.name).join(', ')}`);
    }
    
    // 🔥 CRITICAL FIX: Check if agent already called (prevent redundant calls)
    if (this.calledAgents.has(normalizedToolName)) {
      console.warn(`⚠️ Agent ${normalizedToolName} already called, skipping to prevent redundant processing`);
      return;
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
        return {
          webResults: 'Web search completed',
          reasoning: 'Web search completed'
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
      'QUERYPLANNER': 'QueryPlanner'
    };
    
    // Return mapped name or original if no mapping found
    return toolNameMap[toolName] || toolName;
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
  
  // 🗑️ REMOVED: Unused helper methods (getAgentType, extractInsights) 
  // These were part of old pipeline logic that's now replaced by Master LLM Orchestrator
  
  // 🗑️ OLD METHODS: No longer needed with Master LLM Orchestrator
}