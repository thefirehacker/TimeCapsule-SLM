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
        console.log(`✅ Master LLM completed goal: ${decision.reasoning}`);
        break;
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

CURRENT SITUATION:
- Available Documents: ${context.ragResults.chunks.length} chunks loaded ${context.ragResults.chunks.length === 0 ? '- need to search for relevant documents first' : '- ready to analyze'}
- Document Analysis: ${availableData.hasDocumentAnalysis ? 'COMPLETED - you understand what documents contain' : 'NOT DONE - need to analyze document structure and content'}  
- Patterns Generated: ${availableData.patternsGenerated} patterns available ${availableData.patternsGenerated === 0 ? '- need to create extraction patterns' : '- ready for extraction'}
- Data Extracted: ${availableData.dataExtracted ? 'COMPLETED - you have extracted data' : 'NOT DONE - need to extract specific information'}
- Final Answer: ${availableData.hasFinalAnswer ? 'COMPLETED' : 'NOT DONE - need to synthesize answer from extracted data'}

AVAILABLE TOOLS:
- ChunkSelector: Search and select relevant document chunks from the knowledge base (call FIRST when you have 0 chunks)
- DataInspector: Analyze document structure and content (call after ChunkSelector finds documents)
- PatternGenerator: Generate regex patterns for data extraction (call after DataInspector understands documents)
- Extractor: Extract specific data using generated patterns (call after PatternGenerator creates patterns)
- Synthesizer: Create final answer from extracted data (call when you have enough extracted data)

INTELLIGENT DECISION FLOW:
1. Have 0 chunks? → CALL ChunkSelector to find relevant documents in the knowledge base  
2. Have chunks but no analysis? → CALL DataInspector to understand what documents contain
3. Have analysis but no patterns? → CALL PatternGenerator to create extraction patterns
4. Have patterns but no extracted data? → CALL Extractor to extract specific information
5. Have extracted data but need more? → CALL ChunkSelector/DataInspector/PatternGenerator/Extractor again
6. Have sufficient extracted data? → CALL Synthesizer to create final answer
7. NEVER COMPLETE unless you have a final synthesized answer

CRITICAL DECISION LOGIC:
- ${context.ragResults.chunks.length === 0 ? 'You have NO chunks loaded. You MUST call ChunkSelector first to search the knowledge base.' : `You have ${context.ragResults.chunks.length} chunks but ${availableData.hasDocumentAnalysis ? 'they are analyzed' : 'they need DataInspector analysis first'}.`}

What should happen next?

Respond in this format:
ACTION: [CALL_TOOL or COMPLETE]
TOOL_NAME: [tool name if calling tool]
REASONING: [why this decision makes sense based on current situation]
NEXT_GOAL: [updated goal for next iteration]`;

    try {
      const response = await this.llm(masterPrompt);
      
      // 🐛 DEBUG: Log full LLM response to understand decision format
      console.log(`🧠 Master LLM Decision Response (${response.length} chars):`, response.substring(0, 500) + (response.length > 500 ? '...' : ''));
      
      const decision = this.parseMasterLLMDecision(response);
      console.log(`🎯 Parsed Decision:`, { action: decision.action, toolName: decision.toolName, reasoning: decision.reasoning?.substring(0, 100) });
      
      return decision;
    } catch (error) {
      console.error(`❌ Master LLM decision failed:`, error);
      throw new Error(`Master LLM orchestration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * 📊 Analyze current context state for Master LLM decisions
   */
  private analyzeCurrentState(context: ResearchContext): any {
    return {
      hasDocumentAnalysis: !!context.documentAnalysis,
      patternsGenerated: context.patterns?.length || 0,
      chunksSelected: context.ragResults.chunks.length > 0,
      dataExtracted: context.extractedData && context.extractedData.raw.length > 0,
      hasFinalAnswer: !!context.synthesis.answer
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
      const toolNames = ['DataInspector', 'PatternGenerator', 'ChunkSelector', 'Extractor', 'Synthesizer'];
      const upperToolNames = ['DATAINSPECTOR', 'PATTERNGENERATOR', 'CHUNKSELECTOR', 'EXTRACTOR', 'SYNTHESIZER'];
      
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
    
    const agent = this.registry.get(normalizedToolName);
    if (!agent) {
      console.error(`❌ Tool name normalization failed. Original: "${toolName}", Normalized: "${normalizedToolName}"`);
      console.error(`📋 Available tools:`, this.registry.listAgents().map(a => a.name));
      throw new Error(`Tool ${toolName} (normalized: ${normalizedToolName}) not found in registry. Available: ${this.registry.listAgents().map(a => a.name).join(', ')}`);
    }
    
    console.log(`🔧 Executing tool: ${normalizedToolName} (original: ${toolName})`);
    const startTime = Date.now();
    
    try {
      // 🚨 FIX: Track agent progress for getAgentSubSteps() to work properly
      this.progressTracker.startAgent(normalizedToolName, normalizedToolName, context);
      
      await agent.process(context);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`✅ Tool ${normalizedToolName} completed in ${duration}ms`);
      
      // 🚨 FIX: Mark agent as completed with result
      this.progressTracker.completeAgent(normalizedToolName, { result: 'success' });
      
    } catch (error) {
      console.error(`❌ Tool ${normalizedToolName} failed:`, error);
      // 🚨 FIX: Mark agent as failed
      this.progressTracker.errorAgent(normalizedToolName, error instanceof Error ? error.message : 'Unknown error');
      throw error;
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
      'PATTERNGENERATOR': 'PatternGenerator', 
      'CHUNKSELECTOR': 'ChunkSelector',
      'EXTRACTOR': 'Extractor',
      'SYNTHESIZER': 'Synthesizer',
      'QUERYPLANNER': 'QueryPlanner',
      // Lowercase versions
      'datainspector': 'DataInspector',
      'patterngenerator': 'PatternGenerator',
      'chunkselector': 'ChunkSelector', 
      'extractor': 'Extractor',
      'synthesizer': 'Synthesizer',
      'queryplanner': 'QueryPlanner',
      // 🚨 SNAKE_CASE variations (LLM converts camelCase to snake_case)
      'CHUNK_SELECTOR': 'ChunkSelector',
      'DATA_INSPECTOR': 'DataInspector',
      'PATTERN_GENERATOR': 'PatternGenerator',
      'QUERY_PLANNER': 'QueryPlanner',
      // 🚨 CALL_ prefixed variations (LLM generates "CALL TOOLNAME" format)
      'CALL_CHUNK_SELECTOR': 'ChunkSelector',
      'CALL_DATA_INSPECTOR': 'DataInspector',
      'CALL_PATTERN_GENERATOR': 'PatternGenerator',
      'CALL_EXTRACTOR': 'Extractor',
      'CALL_SYNTHESIZER': 'Synthesizer',
      'CALL_CHUNKSELECTOR': 'ChunkSelector',
      'CALL_DATAINSPECTOR': 'DataInspector',
      'CALL_PATTERNGENERATOR': 'PatternGenerator',
      'CALL_QUERYPLANNER': 'QueryPlanner',
      // 🚨 CALL with space variations (LLM generates "CALL ToolName" format)
      'CALL ChunkSelector': 'ChunkSelector',
      'CALL DataInspector': 'DataInspector',
      'CALL PatternGenerator': 'PatternGenerator',
      'CALL Extractor': 'Extractor',
      'CALL Synthesizer': 'Synthesizer',
      'CALL QueryPlanner': 'QueryPlanner',
      // 🚨 LLM Hallucination fixes
      'DATAINSPIRATOR': 'DataInspector', // Common LLM typo/hallucination
      'DATAINSPECTION': 'DataInspector',
      'INSPECTOR': 'DataInspector',
      'GENERATOR': 'PatternGenerator',
      'SELECTOR': 'ChunkSelector',
      'EXTRACT': 'Extractor',
      'SYNTHESIS': 'Synthesizer',
      'SYNESTHESIZER': 'Synthesizer', // LLM misspelling "Synthesizer" as "SYNESTHESIZER"
      'PLANNER': 'QueryPlanner'
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