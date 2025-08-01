/**
 * Synthesis Agent
 * 
 * Consolidates extracted information into a coherent answer.
 * Formats the response according to user's query intent.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

export class SynthesisAgent extends BaseAgent {
  readonly name = 'Synthesizer';
  readonly description = 'Consolidates extracted data into a coherent answer';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`📝 Synthesizer: Creating final answer from ${context.extractedData.raw.length} items`);
    
    if (context.extractedData.raw.length === 0) {
      context.synthesis.answer = 'No relevant information was found in the available documents. Try refining your search query or providing more specific terms.';
      this.setReasoning('No extracted data to synthesize');
      return context;
    }
    
    // Group and rank extracted items
    const groupedItems = await this.groupAndRankItems(context);
    
    // For small models, use simple formatting instead of LLM generation
    const answer = this.formatSimpleAnswer(context, groupedItems);
    
    // Store the results
    context.synthesis.answer = answer;
    context.synthesis.reasoning = this.explainReasoning();
    context.extractedData.processed = groupedItems;
    
    console.log(`✅ Synthesis complete: ${answer.length} characters`);
    
    return context;
  }
  
  private formatSimpleAnswer(context: ResearchContext, groupedItems: any[]): string {
    const queryType = context.understanding.queryType;
    
    // Filter out items based on query intent
    const filteredItems = this.filterByIntent(context, groupedItems);
    
    if (queryType === 'ranking' && context.query.toLowerCase().includes('top 3')) {
      // Format top 3 results
      const top3 = filteredItems.slice(0, 3);
      
      if (top3.length === 0) {
        return 'No speed run times found in the available data. The data contained performance metrics (tokens/sec) but not completion times.';
      }
      
      const lines = ['Based on the search results, here are the top 3 speed runs:\n'];
      
      top3.forEach((group, index) => {
        const item = group.bestItem;
        const value = item.value && item.unit ? `${item.value} ${item.unit}` : '';
        
        // Clean up the content
        let content = item.content;
        if (content.includes(':')) {
          // Extract the run description
          content = content.split(':')[0].trim();
        }
        
        lines.push(`${index + 1}. ${content} - ${value || 'time not specified'}`);
        if (item.context && item.context !== item.content) {
          // Extract relevant context
          const contextMatch = item.context.match(/run \d+.*?(\d+\.?\d*\s*(?:hours?|minutes?))/i);
          if (contextMatch) {
            lines.push(`   Details: ${contextMatch[0]}`);
          }
        }
      });
      
      return lines.join('\n');
    }
    
    // Default format for other query types
    const lines = [`Found ${filteredItems.length} relevant results:\n`];
    
    filteredItems.forEach((group, index) => {
      const item = group.bestItem;
      const value = item.value && item.unit ? `${item.value} ${item.unit}` : '';
      lines.push(`• ${item.content} ${value ? `- ${value}` : ''}`);
    });
    
    return lines.join('\n');
  }
  
  private filterByIntent(context: ResearchContext, groupedItems: any[]): any[] {
    const query = context.query.toLowerCase();
    
    // For speed runs, filter out performance metrics
    if (query.includes('speed run') || query.includes('runs')) {
      return groupedItems.filter(group => {
        const item = group.bestItem;
        const content = item.content.toLowerCase();
        const unit = (item.unit || '').toLowerCase();
        
        // Exclude performance metrics
        if (unit.includes('tokens') || unit.includes('tok/s') || unit.includes('/s')) {
          return false;
        }
        
        // Include time-based metrics
        if (unit.includes('hour') || unit.includes('minute') || unit.includes('second')) {
          return true;
        }
        
        // Include if content suggests a run
        if (content.includes('run') || content.includes('attempt') || content.includes('complet')) {
          return true;
        }
        
        return false;
      });
    }
    
    // Default: return all items
    return groupedItems;
  }
  
  private async groupAndRankItems(context: ResearchContext): Promise<any[]> {
    // Group items by similarity
    const groups: Map<string, typeof context.extractedData.raw> = new Map();
    
    for (const item of context.extractedData.raw) {
      const key = this.generateGroupKey(item);
      const group = groups.get(key) || [];
      group.push(item);
      groups.set(key, group);
    }
    
    // Convert to ranked list
    const ranked = Array.from(groups.values())
      .map(group => ({
        items: group,
        bestItem: group.reduce((best, item) => 
          item.confidence > best.confidence ? item : best
        ),
        totalConfidence: group.reduce((sum, item) => sum + item.confidence, 0) / group.length
      }))
      .sort((a, b) => b.totalConfidence - a.totalConfidence);
    
    return ranked;
  }
  
  private generateGroupKey(item: any): string {
    // Create a key for grouping similar items
    const contentKey = item.content.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
    const valueKey = item.value ? String(item.value) : '';
    return `${contentKey}_${valueKey}`;
  }
  
  private async generateAnswer(context: ResearchContext, groupedItems: any[]): Promise<string> {
    // Prepare items for LLM
    const itemsDescription = groupedItems.slice(0, 10).map((group, i) => {
      const item = group.bestItem;
      return `${i + 1}. ${item.content}${item.value ? ` (${item.value}${item.unit ? ' ' + item.unit : ''})` : ''}
   Context: "${item.context}"
   Confidence: ${(item.confidence * 100).toFixed(0)}%
   Sources: ${group.items.length} mentions`;
    }).join('\n\n');
    
    const prompt = `Create a clear, concise answer to the user's query based on the extracted information:

User Query: "${context.query}"
Intent: ${context.understanding.intent}
Expected Format: ${context.understanding.queryType}

Extracted Information:
${itemsDescription}

Create an answer that:
1. Directly addresses what the user asked for
2. Is formatted appropriately for the query type (${context.understanding.queryType})
3. Includes specific details from the extracted information
4. Is confident and clear
5. For ranking queries: Present as a numbered list
6. For comparison queries: Show clear distinctions
7. For information queries: Provide comprehensive details

DO NOT mention confidence scores, extraction process, or technical details.
DO NOT say "based on the extracted information" or similar phrases.
Write as if you have direct knowledge of the facts.`;

    try {
      const answer = await this.llm(prompt);
      
      this.setReasoning(
        `Synthesized ${groupedItems.length} groups of information into a ${context.understanding.queryType} response`
      );
      
      return answer;
      
    } catch (error) {
      console.error('❌ Failed to generate answer:', error);
      this.setReasoning('Failed to synthesize answer, returning raw data');
      
      // Fallback to simple formatting
      return this.formatRawData(context, groupedItems);
    }
  }
  
  private formatRawData(context: ResearchContext, groupedItems: any[]): string {
    if (context.understanding.queryType === 'ranking') {
      return groupedItems.slice(0, 10).map((group, i) => {
        const item = group.bestItem;
        return `${i + 1}. ${item.content}${item.value ? ` - ${item.value}${item.unit ? ' ' + item.unit : ''}` : ''}`;
      }).join('\n');
    }
    
    return groupedItems.slice(0, 5).map(group => {
      const item = group.bestItem;
      return `• ${item.content}${item.value ? ` (${item.value}${item.unit ? ' ' + item.unit : ''})` : ''}`;
    }).join('\n\n');
  }
}