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
    context.extractedData.structured = groupedItems;
    
    console.log(`✅ Synthesis complete: ${answer.length} characters`);
    
    return context;
  }
  
  private formatSimpleAnswer(context: ResearchContext, groupedItems: any[]): string {
    const queryType = context.understanding.queryType;
    
    // Filter out items based on query intent
    const filteredItems = this.filterByIntent(context, groupedItems);
    
    if (queryType === 'ranking' && context.query.toLowerCase().includes('top 3')) {
      // Sort by time value (smallest first for speed runs)
      const sorted = filteredItems.sort((a, b) => {
        const aVal = this.parseTimeToHours(a.bestItem);
        const bVal = this.parseTimeToHours(b.bestItem);
        return aVal - bVal;
      });
      
      // Format top 3 results
      const top3 = sorted.slice(0, 3);
      
      if (top3.length === 0) {
        return 'No speed run times found in the available data. The data contained performance metrics (tokens/sec) but not completion times.';
      }
      
      const lines = ['Based on the search results, here are the top 3 speed runs:\n'];
      
      top3.forEach((group, index) => {
        const item = group.bestItem;
        const value = item.value && item.unit ? `${item.value} ${item.unit}` : '';
        
        // Clean up the content - remove LLM thinking
        let content = this.cleanContent(item.content);
        
        // Extract run description if present
        if (content.includes('Run')) {
          const runMatch = content.match(/Run\s*\d+[:\s-]+(.+?)(?:\s*-\s*\d+\.?\d*\s*hours?)?$/i);
          if (runMatch) {
            content = runMatch[1].trim();
          }
        }
        
        // Smart time formatting - avoid duplicates
        const formattedLine = this.formatWithTime(content, value);
        lines.push(`${index + 1}. ${formattedLine}`);
      });
      
      return lines.join('\n');
    }
    
    // Default format for other query types
    const lines = [`Found ${filteredItems.length} relevant results:\n`];
    
    filteredItems.forEach((group, index) => {
      const item = group.bestItem;
      const value = item.value && item.unit ? `${item.value} ${item.unit}` : '';
      const content = this.cleanContent(item.content);
      const formattedLine = this.formatWithTime(content, value);
      lines.push(`• ${formattedLine}`);
    });
    
    return lines.join('\n');
  }
  
  private cleanContent(content: string): string {
    // Remove LLM thinking patterns - expanded list
    let clean = content;
    
    // Remove common LLM preambles
    const thinkingPatterns = [
      /^(Okay,? let'?s see\.?|Let me think|Let me see|First,? I need to|Looking at|The user wants?)[^.]*\.\s*/i,
      /^(Based on|According to|From what I can see|It appears that|It seems)[^.]*,\s*/i,
      /^(The text mentions?|The content shows?|I can see that|Looking through)[^.]*,\s*/i
    ];
    
    thinkingPatterns.forEach(pattern => {
      clean = clean.replace(pattern, '');
    });
    
    // Remove trailing explanations and meta-commentary
    clean = clean.replace(/\s*-\s*(time not specified|why it matches|note:|however,).*$/i, '');
    clean = clean.replace(/\s*\(.*?\)\s*$/g, ''); // Remove trailing parenthetical comments
    
    // Clean up run descriptions
    if (clean.match(/^\d+\.\d+\.\d+\.\d+/)) {
      // Handle malformed numbering like "2..1.1.1.1.1"
      clean = clean.replace(/^\d+(\.\d+)+\s*/, '');
    }
    
    // Remove duplicate whitespace
    clean = clean.replace(/\s+/g, ' ');
    
    return clean.trim();
  }
  
  private formatWithTime(content: string, timeValue: string): string {
    if (!timeValue) {
      return content || 'time not specified';
    }
    
    // Check if content already contains the time value
    const timeRegex = new RegExp(`\\b${timeValue.replace(/\./g, '\\.')}`);
    if (timeRegex.test(content)) {
      // Content already contains the time - return as is
      return content;
    }
    
    // Check if content already contains time information in general
    const hasTimePattern = /\b\d+\.?\d*\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/i;
    if (hasTimePattern.test(content)) {
      // Content has some time info, but not our specific value
      // Replace existing time with our value or append if unclear
      const existingTimeMatch = content.match(/(.+?)\s*-?\s*\d+\.?\d*\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/i);
      if (existingTimeMatch) {
        const baseContent = existingTimeMatch[1].trim();
        return `${baseContent} - ${timeValue}`;
      }
      // If we can't cleanly extract, return content as is
      return content;
    }
    
    // Content has no time info - append our time value
    return `${content} - ${timeValue}`;
  }
  
  private parseTimeToHours(item: any): number {
    if (!item.value || !item.unit) return Infinity;
    
    const value = parseFloat(item.value);
    const unit = item.unit.toLowerCase();
    
    if (unit.includes('hour')) return value;
    if (unit.includes('minute')) return value / 60;
    if (unit.includes('second')) return value / 3600;
    
    return value;
  }
  
  private filterByIntent(context: ResearchContext, groupedItems: any[]): any[] {
    const query = context.query.toLowerCase();
    
    // First, filter out irrelevant/empty responses
    let filtered = groupedItems.filter(group => {
      const item = group.bestItem;
      const content = item.content.toLowerCase();
      
      // Filter out "no information found" type responses
      const irrelevantPatterns = [
        'no relevant information found',
        'no information about',
        'does not mention',
        'there is no mention',
        'no content related to',
        'no tyler',
        'not mentioned',
        'the text provided does not',
        'the provided text discusses',
        'if.*refers to.*they are excluded'
      ];
      
      const isIrrelevant = irrelevantPatterns.some(pattern => {
        return content.includes(pattern) || new RegExp(pattern).test(content);
      });
      
      if (isIrrelevant) {
        console.log(`🗑️ Filtering out irrelevant response: "${item.content.substring(0, 100)}..."`);
        return false;
      }
      
      return true;
    });
    
    // For speed runs, filter out performance metrics
    if (query.includes('speed run') || query.includes('runs')) {
      filtered = filtered.filter(group => {
        const item = group.bestItem;
        const content = item.content.toLowerCase();
        const unit = (item.unit || '').toLowerCase();
        
        // Exclude performance metrics
        if (unit.includes('tokens') || unit.includes('tok/s') || unit.includes('/s')) {
          console.log(`🗑️ Filtering out performance metric: "${item.content.substring(0, 50)}..." (${unit})`);
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
    
    console.log(`📊 Filtered items: ${groupedItems.length} → ${filtered.length} (removed ${groupedItems.length - filtered.length} irrelevant)`);
    return filtered;
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
        const value = item.value && item.unit ? `${item.value} ${item.unit}` : '';
        const formattedLine = this.formatWithTime(item.content, value);
        return `${i + 1}. ${formattedLine}`;
      }).join('\n');
    }
    
    return groupedItems.slice(0, 5).map(group => {
      const item = group.bestItem;
      const value = item.value && item.unit ? `${item.value} ${item.unit}` : '';
      const formattedLine = this.formatWithTime(item.content, value);
      return `• ${formattedLine}`;
    }).join('\n\n');
  }
}