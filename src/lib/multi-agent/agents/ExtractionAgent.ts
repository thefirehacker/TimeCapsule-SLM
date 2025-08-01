/**
 * Extraction Agent
 * 
 * Executes extraction using the generated patterns.
 * Uses LLM to understand and extract information based on strategies.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, ExtractedItem, ChunkData } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

export class ExtractionAgent extends BaseAgent {
  readonly name = 'Extractor';
  readonly description = 'Executes extraction using generated patterns';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`⛏️ Extractor: Processing ${context.ragResults.chunks.length} chunks`);
    
    if (context.patterns.length === 0) {
      console.warn('⚠️ No extraction patterns available');
      this.setReasoning('No extraction patterns to work with');
      return context;
    }
    
    const extractedItems: ExtractedItem[] = [];
    const batchSize = 2; // Smaller batches for small model
    
    // Process chunks in batches for efficiency
    for (let i = 0; i < context.ragResults.chunks.length; i += batchSize) {
      const batch = context.ragResults.chunks.slice(i, i + batchSize);
      const batchResults = await this.extractFromBatch(batch, context);
      extractedItems.push(...batchResults);
    }
    
    // Deduplicate and sort by confidence
    const uniqueItems = this.deduplicateItems(extractedItems);
    context.extractedData.raw = uniqueItems;
    
    this.setReasoning(
      `Extracted ${uniqueItems.length} unique items from ${context.ragResults.chunks.length} chunks`
    );
    
    console.log(`✅ Extraction complete: ${uniqueItems.length} items found`);
    
    return context;
  }
  
  private async extractFromBatch(
    chunks: ChunkData[],
    context: ResearchContext
  ): Promise<ExtractedItem[]> {
    // Use LLM to understand and extract, like Claude would
    const prompt = `Read this text and find what the user is looking for.

User wants: "${context.query}"

Text to read:
${chunks.map((chunk, i) => chunk.text).join('\n\n---\n\n')}

Instructions:
${this.getExtractionInstructions(context)}

If you see a table with columns, extract each row as a separate item.
For tables like "# Description Record time Training Tokens...", extract:
- Row number/ID
- Description 
- Time value (like "8.13 hours", "2.55 hours")

Return a simple list. For each item include:
- What you found (description or name)
- The time value if there is one
- Skip performance metrics like tokens/sec

Be specific. If user wants "speed runs", find run times (hours/minutes), not performance metrics (tokens/sec).`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 LLM extraction response:`, response.substring(0, 300));
      
      // Parse the LLM's natural response into items
      return this.parseNaturalResponse(response, chunks[0]?.id || '');
      
    } catch (error) {
      console.error('❌ LLM extraction failed:', error);
      // Still use fallback for safety
      return this.fallbackTextExtraction(chunks, context);
    }
  }
  
  private getExtractionInstructions(context: ResearchContext): string {
    const query = context.query.toLowerCase();
    
    if (query.includes('speed run') || query.includes('runs')) {
      return `Look for:
- Run times (like "Run 1: 3.5 hours", "completed in 45 minutes")
- Speed run records or attempts
- Time to complete something
DO NOT include performance metrics like tokens/sec or throughput`;
    }
    
    if (query.includes('top') && query.includes('3')) {
      return 'Find the top 3 items that match. Look for rankings or the best results.';
    }
    
    return 'Find information that directly answers what the user is asking for.';
  }
  
  private parseNaturalResponse(response: string, chunkId: string): ExtractedItem[] {
    const items: ExtractedItem[] = [];
    
    // Clean up LLM thinking process
    let cleanResponse = response;
    
    // Remove common LLM preambles
    cleanResponse = cleanResponse.replace(/^(Okay,? let'?s see\.?|Let me think|First,? I need to|Looking at the text)[^\n]*\n/gim, '');
    cleanResponse = cleanResponse.replace(/^(The user wants?|The text mentions?|I need to find)[^\n]*\n/gim, '');
    
    // Extract content after thinking tags if present
    if (cleanResponse.includes('</think>')) {
      const parts = cleanResponse.split('</think>');
      cleanResponse = parts[parts.length - 1].trim();
    }
    
    // Split response into lines or sections
    const lines = cleanResponse.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      // Skip meta-commentary lines
      if (line.match(/^(I found|Here's what|Based on|Looking for)/i)) {
        return;
      }
      
      // Look for structured findings
      // Pattern 1: "Run X: Y hours" or "X. Something - Y hours"
      const runMatch = line.match(/(?:Run\s*(\d+)|(\d+)\.|#(\d+))[:\s-]+(.+?)[\s-]+(\d+\.?\d*)\s*(hours?|minutes?|seconds?)/i);
      if (runMatch) {
        const runNumber = runMatch[1] || runMatch[2] || runMatch[3];
        const description = runMatch[4].trim();
        const value = runMatch[5];
        const unit = runMatch[6];
        
        items.push({
          content: `Run ${runNumber}: ${description}`,
          value: value,
          unit: unit,
          context: line.trim(),
          confidence: 0.9,
          sourceChunkId: chunkId,
          metadata: { method: 'llm', runNumber }
        });
        return;
      }
      
      // Pattern 2: Simple time mentions
      const timeMatch = line.match(/(\d+\.?\d*)\s*(hours?|minutes?|seconds?)/i);
      
      // Pattern 3: List items with dashes or bullets
      const listMatch = line.match(/^[\s-•*]+(.+)$/);
      const content = listMatch ? listMatch[1].trim() : line.trim();
      
      if (content.length > 10 && !content.match(/^(why|because|since|this)/i)) {
        items.push({
          content: content,
          value: timeMatch ? timeMatch[1] : undefined,
          unit: timeMatch ? timeMatch[2] : undefined,
          context: line.trim(),
          confidence: 0.8,
          sourceChunkId: chunkId,
          metadata: { method: 'llm' }
        });
      }
    });
    
    return items;
  }
  
  private fallbackTextExtraction(
    chunks: ChunkData[],
    context: ResearchContext
  ): ExtractedItem[] {
    console.log('🔄 Using pattern-based extraction optimized for small models');
    const items: ExtractedItem[] = [];
    
    // First, try to detect table format
    chunks.forEach(chunk => {
      const text = chunk.text;
      
      // Check for table-like structure
      const tableMatch = text.match(/^(\d+)\s+(.+?)\s+(\d+\.?\d*)\s*(hours?|hrs?)\s+/gm);
      if (tableMatch) {
        console.log('📊 Detected table format, parsing rows...');
        const lines = text.split('\n');
        
        lines.forEach(line => {
          // Match table rows: "1 Initial baseline 8.13 hours 6.44B 221k..."
          const rowMatch = line.match(/^(\d+)\s+(.+?)\s+(\d+\.?\d*)\s*(hours?|hrs?)\s+/);
          if (rowMatch) {
            items.push({
              content: `Run ${rowMatch[1]}: ${rowMatch[2].trim()}`,
              value: rowMatch[3],
              unit: rowMatch[4],
              context: line.trim(),
              confidence: 0.95,
              sourceChunkId: chunk.id,
              metadata: { method: 'table', runNumber: rowMatch[1] }
            });
          }
        });
      }
    });
    
    // If table parsing found items, return them
    if (items.length > 0) {
      console.log(`✅ Extracted ${items.length} items from table format`);
      return items;
    }
    
    // Comprehensive patterns for various formats
    const patterns = [
      // Time patterns: "3.5 hours", "45 minutes", "2h30m"
      {
        regex: /(\d+\.?\d*)\s*(hours?|hrs?|h)\b/gi,
        type: 'time',
        unit: 'hours'
      },
      {
        regex: /(\d+\.?\d*)\s*(minutes?|mins?|m)\b/gi,
        type: 'time',
        unit: 'minutes'
      },
      // Performance patterns: "1200 tokens/sec", "5.3k tok/s"
      {
        regex: /(\d+\.?\d*[kmKM]?)\s*(tokens?\/s(?:ec)?|tok\/s|t\/s)/gi,
        type: 'performance',
        unit: 'tokens/sec'
      },
      // Run patterns: "Run 1: 3.5 hours", "Attempt #3 - 45 minutes"
      {
        regex: /(run|attempt|try|experiment|test)\s*#?\d+[:\s-]+.*?(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/gi,
        type: 'run_time',
        extractValue: 2,
        extractUnit: 3
      },
      // Ranking patterns: "1. Something", "#1", "First:"
      {
        regex: /(?:^|\n)\s*(?:(\d+)\.|#(\d+)|(?:(first|second|third|1st|2nd|3rd)):)/gmi,
        type: 'ranking'
      }
    ];
    
    chunks.forEach((chunk, chunkIndex) => {
      const text = chunk.text;
      
      // Look for patterns
      patterns.forEach(patternDef => {
        let match;
        const regex = new RegExp(patternDef.regex.source, patternDef.regex.flags);
        
        while ((match = regex.exec(text)) !== null) {
          // Extract context (surrounding text)
          const startPos = Math.max(0, match.index - 50);
          const endPos = Math.min(text.length, match.index + match[0].length + 50);
          const contextText = text.substring(startPos, endPos).trim();
          
          const extractedItem: ExtractedItem = {
            content: match[0].trim(),
            value: match[patternDef.extractValue || 1],
            unit: patternDef.unit || match[patternDef.extractUnit || 2],
            context: contextText,
            confidence: 0.8,
            sourceChunkId: chunk.id,
            metadata: { 
              method: 'pattern',
              type: patternDef.type,
              chunkIndex
            }
          };
          
          items.push(extractedItem);
        }
      });
      
      // Also extract relevant sentences containing query terms
      if (context.query.toLowerCase().includes('speed run') || 
          context.query.toLowerCase().includes('tyler')) {
        const sentences = text.split(/[.!?]+/);
        sentences.forEach(sentence => {
          if (sentence.toLowerCase().includes('speed') || 
              sentence.toLowerCase().includes('run') ||
              sentence.toLowerCase().includes('tyler')) {
            items.push({
              content: sentence.trim(),
              value: undefined,
              unit: undefined,
              context: sentence.trim(),
              confidence: 0.6,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'sentence',
                chunkIndex 
              }
            });
          }
        });
      }
    });
    
    console.log(`✅ Extracted ${items.length} items using pattern matching`);
    return items;
  }
  
  private deduplicateItems(items: ExtractedItem[]): ExtractedItem[] {
    const seen = new Map<string, ExtractedItem>();
    
    for (const item of items) {
      const key = `${item.content}_${item.value}_${item.unit}`.toLowerCase();
      const existing = seen.get(key);
      
      if (!existing || item.confidence > existing.confidence) {
        seen.set(key, item);
      }
    }
    
    return Array.from(seen.values())
      .sort((a, b) => b.confidence - a.confidence);
  }
  
  private parseJSON(text: string): any {
    try {
      return JSON.parse(text);
    } catch (firstError) {
      console.log('🔍 Direct JSON parse failed, trying extraction...');
      
      // Try to extract JSON from the response
      // Handle <think> tags if present
      let cleanText = text;
      if (cleanText.includes('<think>') && cleanText.includes('</think>')) {
        const thinkEnd = cleanText.lastIndexOf('</think>');
        if (thinkEnd !== -1) {
          cleanText = cleanText.substring(thinkEnd + 8).trim();
        }
      }
      
      // Try to find JSON object
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (secondError) {
          console.error('🔍 JSON extraction failed:', secondError);
        }
      }
      
      // Last resort: try to find array
      const arrayMatch = cleanText.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        try {
          const parsed = JSON.parse(arrayMatch[0]);
          return { items: parsed }; // Wrap in expected format
        } catch (thirdError) {
          console.error('🔍 Array extraction failed:', thirdError);
        }
      }
      
      throw new Error('Invalid JSON after all extraction attempts');
    }
  }
}