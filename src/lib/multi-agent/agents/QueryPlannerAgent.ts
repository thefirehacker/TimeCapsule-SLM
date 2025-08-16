/**
 * Query Planner Agent
 * 
 * Expands queries based on intent and domain understanding.
 * Generates query variations that might find relevant information.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';
import { parseJsonWithResilience } from '../../../components/DeepResearch/hooks/responseCompletion';
import { AgentProgressCallback } from '../interfaces/AgentProgress';

export class QueryPlannerAgent extends BaseAgent {
  readonly name = 'QueryPlanner';
  readonly description = 'Expands queries based on intent and domain understanding';
  
  private llm: LLMFunction;
  protected progressCallback?: AgentProgressCallback;
  
  constructor(llm: LLMFunction, progressCallback?: AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🔍 QueryPlanner: Expanding query variations`);
    
    const prompt = `Given this research context, generate query variations that might find relevant information:

Original query: "${context.query}"
Intent: ${context.understanding.intent}
Domain: ${context.understanding.domain}
Query Type: ${context.understanding.queryType}
Requirements: ${context.understanding.requirements.join(', ')}

Generate 5-10 query variations that:
1. Use synonyms and related terms
2. Consider different phrasings
3. Include technical and colloquial versions
4. Think about how this information might be stored

DO NOT hardcode patterns. Think about what variations might exist in the domain.

Return as JSON array of strings.`;

    try {
      const response = await this.llm(prompt);
      const variations = this.parseJSON(response);
      
      if (Array.isArray(variations)) {
        // Add to requirements (these could be used for additional searches)
        context.understanding.requirements.push(...variations);
        
        this.setReasoning(`Generated ${variations.length} query variations: ${variations.slice(0, 3).join(', ')}...`);
        console.log(`✅ Generated ${variations.length} query variations`);
      }
      
    } catch (error) {
      console.error('❌ Failed to generate query variations:', error);
      this.setReasoning('Failed to generate query variations, using original query only');
    }
    
    return context;
  }
  
  private parseJSON(text: string): any {
    return parseJsonWithResilience(text);
  }
}