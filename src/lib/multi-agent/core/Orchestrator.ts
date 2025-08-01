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
import { SourceReference } from '@/components/DeepResearch/components/ResearchSteps';

export type LLMFunction = (prompt: string) => Promise<string>;

export class Orchestrator {
  private registry: AgentRegistry;
  private messageBus: MessageBus;
  private llm: LLMFunction;
  
  constructor(
    registry: AgentRegistry,
    messageBus: MessageBus,
    llm: LLMFunction
  ) {
    this.registry = registry;
    this.messageBus = messageBus;
    this.llm = llm;
  }
  
  /**
   * Main entry point for research
   */
  async research(query: string, ragResults: SourceReference[]): Promise<string> {
    console.log(`🎯 Orchestrator starting research for: "${query}"`);
    
    // Initialize context
    const context = createInitialContext(query, ragResults);
    
    // Step 1: Analyze the query
    await this.analyzeQuery(context);
    
    // Step 2: Summarize RAG results
    await this.summarizeRAGResults(context);
    
    // Step 3: Plan agent pipeline
    const pipeline = await this.planAgentPipeline(context);
    
    // Step 4: Execute agents
    await this.executeAgentPipeline(pipeline, context);
    
    // Return final answer
    console.log(`📝 Final synthesis:`, {
      hasAnswer: !!context.synthesis.answer,
      answerLength: context.synthesis.answer?.length || 0,
      preview: context.synthesis.answer?.substring(0, 100) || 'No answer'
    });
    
    return context.synthesis.answer || 'Unable to generate an answer from the available information.';
  }
  
  /**
   * Analyze the query to understand intent and requirements
   */
  private async analyzeQuery(context: ResearchContext): Promise<void> {
    const prompt = `Understand what the user is asking for.

Query: "${context.query}"

Answer these questions:
1. What is the user looking for? (be specific)
2. What type of answer do they want? (list, comparison, information, etc)
3. What domain is this? (sports, technology, cooking, etc)

For "speed runs", understand they want timed completions, not performance metrics.
For "top 3", they want a ranked list.

Keep your response short and direct.`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Query understanding:`, response.substring(0, 200));
      
      // Parse the understanding from natural language
      const understanding = this.parseUnderstanding(response, context.query);
      context.understanding = understanding;
      
    } catch (error) {
      console.error('❌ Failed to analyze query with LLM:', error);
      // Simple fallback
      context.understanding = {
        intent: 'extract information about ' + context.query,
        domain: 'general',
        requirements: [context.query],
        queryType: 'information'
      };
    }
    
    console.log(`📊 Query analysis complete:`, context.understanding);
  }
  
  private parseUnderstanding(response: string, query: string): any {
    const lines = response.toLowerCase();
    
    // Detect query type from response
    let queryType = 'information';
    if (lines.includes('rank') || lines.includes('top') || lines.includes('list')) {
      queryType = 'ranking';
    } else if (lines.includes('compar')) {
      queryType = 'comparison';
    }
    
    // Detect domain
    let domain = 'general';
    if (lines.includes('speed run') || lines.includes('gaming')) {
      domain = 'speed_runs';
    } else if (lines.includes('technology') || lines.includes('programming')) {
      domain = 'technology';
    }
    
    // Build requirements from understanding
    const requirements = [];
    if (lines.includes('speed run')) {
      requirements.push('Find speed run completion times');
      requirements.push('Ignore performance metrics like tokens/sec');
    }
    if (lines.includes('top 3')) {
      requirements.push('Return exactly 3 results');
      requirements.push('Rank by relevance');
    }
    
    return {
      intent: `User wants ${queryType} about ${domain}`,
      domain: domain,
      requirements: requirements.length > 0 ? requirements : [query],
      queryType: queryType
    };
  }
  
  /**
   * Summarize RAG results for better understanding
   */
  private async summarizeRAGResults(context: ResearchContext): Promise<void> {
    if (context.ragResults.chunks.length === 0) {
      context.ragResults.summary = 'No relevant documents found';
      return;
    }
    
    // Sample first few chunks
    const samples = context.ragResults.chunks.slice(0, 3);
    const prompt = `Summarize what kind of data is available in these search results:

${samples.map((chunk, i) => `Chunk ${i + 1} (similarity: ${chunk.similarity || 'N/A'}):
"${chunk.text.substring(0, 200)}..."
Source: ${chunk.source}`).join('\n\n')}

Total chunks available: ${context.ragResults.chunks.length}

Provide a brief summary of:
1. What type of content this is
2. Data format and quality
3. Relevance to the query: "${context.query}"`;

    try {
      context.ragResults.summary = await this.llm(prompt);
      console.log(`📚 RAG summary: ${context.ragResults.summary.substring(0, 100)}...`);
    } catch (error) {
      console.error('❌ Failed to summarize RAG results:', error);
      context.ragResults.summary = `${context.ragResults.chunks.length} documents found`;
    }
  }
  
  /**
   * Plan which agents to use and in what order
   */
  private async planAgentPipeline(context: ResearchContext): Promise<string[]> {
    // For small models, use fixed pipeline optimized for reliability
    // This avoids JSON parsing issues with pipeline planning
    const defaultPipeline = ['DataInspector', 'PatternGenerator', 'Extractor', 'Synthesizer'];
    
    console.log(`📋 Using optimized pipeline for small models:`, defaultPipeline);
    
    // Verify all agents are registered
    const validPipeline = defaultPipeline.filter(name => {
      if (!this.registry.has(name)) {
        console.warn(`⚠️ Agent ${name} not registered, skipping`);
        return false;
      }
      return true;
    });
    
    if (validPipeline.length === 0) {
      console.error('❌ No valid agents in pipeline!');
      throw new Error('No valid agents available');
    }
    
    return validPipeline;
  }
  
  /**
   * Execute agents in the planned pipeline
   */
  private async executeAgentPipeline(pipeline: string[], context: ResearchContext): Promise<void> {
    for (const agentName of pipeline) {
      const agent = this.registry.get(agentName);
      if (!agent) {
        console.warn(`⚠️ Agent ${agentName} not found, skipping`);
        continue;
      }
      
      console.log(`🤖 Executing agent: ${agentName}`);
      context.metadata.agentsInvolved.push(agentName);
      
      try {
        // Let agent process the context
        await agent.process(context);
        
        // Broadcast completion
        await this.messageBus.broadcast(
          agentName,
          MessageType.COMPLETE,
          `${agentName} completed processing`,
          agent.explainReasoning(),
          { agentName },
          context
        );
        
      } catch (error) {
        console.error(`❌ Agent ${agentName} failed:`, error);
        
        // Broadcast error
        await this.messageBus.broadcast(
          agentName,
          MessageType.ERROR,
          `${agentName} encountered an error`,
          error instanceof Error ? error.message : String(error),
          { agentName, error },
          context
        );
      }
    }
  }
  
  /**
   * Parse JSON with error handling
   */
  private parseJSON(text: string): any {
    // Try to extract JSON from the response
    try {
      // First try direct parsing
      return JSON.parse(text);
    } catch {
      console.log('🔍 Direct parse failed, trying extraction...');
      
      // Clean up common issues
      let cleanText = text.trim();
      
      // Remove <think> tags if present
      if (cleanText.includes('<think>') && cleanText.includes('</think>')) {
        const thinkEnd = cleanText.lastIndexOf('</think>');
        if (thinkEnd !== -1) {
          cleanText = cleanText.substring(thinkEnd + 8).trim();
        }
      }
      
      // Try to find JSON in the text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error('🔍 JSON extraction failed:', e);
        }
      }
      
      console.error('Failed to parse JSON from:', text.substring(0, 200));
      throw new Error('Invalid JSON response from LLM');
    }
  }
}