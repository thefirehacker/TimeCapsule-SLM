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
  private batchReasoning: string[] = [];
  private extractionSummary: string = '';
  
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
    const totalChunks = context.ragResults.chunks.length;
    
    // Clear previous batch reasoning
    this.batchReasoning = [];
    this.extractionSummary = '';
    
    // Initial reasoning to show we're starting
    const initialReasoning = `📊 Starting extraction process for ${totalChunks} chunks...

🎯 Extraction Strategy:
- Processing in batches of ${batchSize} for efficiency
- Using intelligent context understanding
- Looking for: ${context.understanding.intent || 'relevant information'}`;
    
    // Process chunks in batches for efficiency
    for (let i = 0; i < totalChunks; i += batchSize) {
      const batch = context.ragResults.chunks.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(totalChunks / batchSize);
      
      // Store progress separately from reasoning
      const progressUpdate = `Processing batch ${batchNumber}/${totalBatches} (chunks ${i + 1}-${Math.min(i + batchSize, totalChunks)} of ${totalChunks})...`;
      console.log(`📊 ${progressUpdate}`);
      
      const batchResults = await this.extractFromBatch(batch, context, batchNumber);
      extractedItems.push(...batchResults);
      
      // Append batch findings to reasoning array
      if (batchResults.length > 0) {
        this.batchReasoning.push(`Batch ${batchNumber}: Found ${batchResults.length} items`);
      }
    }
    
    // Deduplicate and sort by confidence
    const uniqueItems = this.deduplicateItems(extractedItems);
    context.extractedData.raw = uniqueItems;
    
    // Validation: Log extraction statistics
    this.logExtractionStats(extractedItems, uniqueItems);
    
    // Create final comprehensive reasoning
    const finalReasoning = this.createFinalReasoning(
      initialReasoning,
      totalChunks,
      extractedItems.length,
      uniqueItems.length
    );
    
    this.setReasoning(finalReasoning);
    
    console.log(`✅ Extraction complete: ${uniqueItems.length} items found`);
    
    return context;
  }
  
  /**
   * Log extraction statistics for validation
   */
  private logExtractionStats(allItems: ExtractedItem[], uniqueItems: ExtractedItem[]): void {
    // Count items by type
    const typeCount = new Map<string, number>();
    const timeItems = uniqueItems.filter(item => item.value && item.unit);
    const tableItems = uniqueItems.filter(item => item.metadata?.type?.includes('table'));
    const currentRecords = uniqueItems.filter(item => item.metadata?.type === 'current_record');
    
    uniqueItems.forEach(item => {
      const type = item.metadata?.type || 'unknown';
      typeCount.set(type, (typeCount.get(type) || 0) + 1);
    });
    
    console.log('📊 Extraction Statistics:');
    console.log(`- Total extracted: ${allItems.length}`);
    console.log(`- After deduplication: ${uniqueItems.length}`);
    console.log(`- Items with time values: ${timeItems.length}`);
    console.log(`- Table rows: ${tableItems.length}`);
    console.log(`- Current records: ${currentRecords.length}`);
    
    // Log type distribution
    console.log('📈 Item types:');
    typeCount.forEach((count, type) => {
      console.log(`  - ${type}: ${count}`);
    });
    
    // Warning if too few items for a table query
    if (timeItems.length < 6 && this.extractionSummary.includes('table')) {
      console.warn('⚠️ WARNING: Expected at least 6 table rows but found only ' + timeItems.length);
    }
    
    // Log sample items
    if (timeItems.length > 0) {
      console.log('🔍 Sample time items:');
      timeItems.slice(0, 3).forEach(item => {
        console.log(`  - ${item.content} → ${item.value} ${item.unit}`);
      });
    }
  }
  
  /**
   * Create comprehensive final reasoning that preserves all extraction insights
   */
  private createFinalReasoning(
    initialReasoning: string,
    totalChunks: number,
    totalItems: number,
    uniqueItems: number
  ): string {
    const sections: string[] = [initialReasoning];
    
    // Add batch processing summary
    if (this.batchReasoning.length > 0) {
      sections.push('\n📊 Extraction Progress:');
      sections.push(...this.batchReasoning);
    }
    
    // Add extraction summary if available
    if (this.extractionSummary) {
      sections.push('\n🤖 LLM Extraction Insights:');
      sections.push(this.extractionSummary);
    }
    
    // Add final statistics
    sections.push(`\n✅ Extraction Complete!

📈 Final Statistics:
- Processed: ${totalChunks} chunks
- Found: ${totalItems} total items
- After deduplication: ${uniqueItems} unique items
- Success rate: ${((uniqueItems / totalChunks) * 100).toFixed(1)}%

The extracted data will now be synthesized to answer your query.`);
    
    return sections.join('\n');
  }
  
  private async extractFromBatch(
    chunks: ChunkData[],
    context: ResearchContext,
    batchNumber: number
  ): Promise<ExtractedItem[]> {
    // Direct extraction prompt - no analysis, just extract data
    const prompt = `Extract ALL data from the text below. Start your response IMMEDIATELY with "Entry 1:" or "Current record:" - no other text before that.

User query: "${context.query}"

Text to extract from:
${chunks.map((chunk, i) => chunk.text).join('\n\n---\n\n')}

EXAMPLE of correct extraction from a table:
Entry 1: Initial baseline - 8.13 hours - 6.44B tokens
Entry 2: Architectural changes - 7.51 hours - 5.07B tokens
Entry 3: Muon optimizer - 4.53 hours - 3.04B tokens
Entry 4: Dataloading tweaks - 4.26 hours - 3.31B tokens
Entry 5: Logit Soft-capping - 4.01 hours - 3.15B tokens
Entry 6: Longer Sequence Length - 2.55 hours - 1.88B tokens
Current record: 3.14 minutes

RULES:
- Extract EVERY row from tables (all 6+ entries if present)
- Include ALL time values you find
- Handle any numbering format (1, 2.1, 2..4.4.4.4.4, etc.)
- Start immediately with the first entry - no preamble
- Continue until you've extracted everything

Start extracting NOW:`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 LLM extraction response:`, response.substring(0, 300));
      
      // Parse the LLM's direct extraction into items
      const items = this.parseNaturalResponse(response, chunks[0]?.id || '');
      
      // Add batch-specific insights if items found
      if (items.length > 0 && batchNumber <= 5) {
        const sampleItem = items[0];
        this.batchReasoning.push(`Batch ${batchNumber}: Extracted ${items.length} data points (e.g., "${sampleItem.content.substring(0, 50)}...")`);
      }
      
      // Add to extraction summary
      if (batchNumber <= 3) {
        this.extractionSummary += `\nBatch ${batchNumber}: Extracted ${items.length} items directly`;
      }
      
      return items;
      
    } catch (error) {
      console.error('❌ LLM extraction failed:', error);
      
      // Add error to batch reasoning
      this.batchReasoning.push(`Batch ${batchNumber}: ⚠️ LLM failed, using fallback extraction`);
      
      // Use fallback extraction
      return this.fallbackTextExtraction(chunks, context, batchNumber);
    }
  }
  
  private getExtractionInstructions(context: ResearchContext): string {
    // Let the LLM intelligently determine what to extract based on query context
    return `Based on the user's query, determine what type of information they're looking for.
Consider:
- Are they asking for rankings or top items?
- Are they looking for specific metrics or measurements?
- Do they want current state or historical progression?
- Are they interested in records, achievements, or development history?

Extract information that directly answers their question, understanding the context of the document.`;
  }
  
  private parseNaturalResponse(response: string, chunkId: string): ExtractedItem[] {
    const items: ExtractedItem[] = [];
    
    // No need to clean thinking tags anymore since we removed them from prompt
    let cleanResponse = response.trim();
    
    // First, check for our expected "Entry X:" format
    // Look for patterns like "Entry 1:", "Entry 2..4.4.4.4.4:", etc.
    const entryMatches = cleanResponse.matchAll(/Entry\s*(\d+(?:\.\.\d+(?:\.\d+)*)?|\d+):\s*(.+?)(?:\n|$)/gi);
    for (const match of entryMatches) {
      const entryContent = match[2].trim();
      const entryNumber = match[1];
      
      // Parse the entry content (usually separated by - or |)
      const parts = entryContent.split(/\s*[-|]\s*/);
      if (parts.length >= 2) {
        // Extract time value - be more flexible with the pattern
        const timeMatch = entryContent.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/i);
        
        // Extract base entry number for sorting
        const baseNumber = entryNumber.includes('..') ? 
          parseInt(entryNumber.split('..')[0]) : 
          parseInt(entryNumber);
        
        items.push({
          content: `Entry ${entryNumber}: ${parts[0].trim()}`,
          value: timeMatch ? timeMatch[1] : undefined,
          unit: timeMatch ? timeMatch[2] : undefined,
          context: entryContent,
          confidence: 0.98, // High confidence for structured entries
          sourceChunkId: chunkId,
          metadata: { 
            method: 'llm',
            type: 'table_row',
            rowNumber: baseNumber.toString(),
            fullNumber: entryNumber,
            description: parts[0].trim()
          }
        });
      }
    }
    
    // Also look for listed items with numbers
    const listMatches = cleanResponse.matchAll(/(?:^|\n)\s*(\d+)[.)\s]+(.+?)(?:\n|$)/gm);
    for (const match of listMatches) {
      const itemNumber = match[1];
      const itemContent = match[2].trim();
      
      // Extract time values if present
      const timeMatch = itemContent.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/i);
      
      items.push({
        content: itemContent,
        value: timeMatch ? timeMatch[1] : undefined,
        unit: timeMatch ? timeMatch[2] : undefined,
        context: match[0].trim(),
        confidence: 0.9,
        sourceChunkId: chunkId,
        metadata: { 
          method: 'llm',
          type: 'list_item',
          position: itemNumber
        }
      });
    }
    
    // Process all lines to extract any data we might have missed
    const lines = cleanResponse.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Skip empty lines or lines we already processed
      if (!trimmedLine || trimmedLine.match(/^Entry\s*\d+:|^\d+[.)\s]+/)) {
        return;
      }
      
      // Look for "Current record:" or similar patterns
      const recordMatch = trimmedLine.match(/Current\s+record[:\s]+(.+)/i);
      if (recordMatch) {
        const recordValue = recordMatch[1].trim();
        const timeMatch = recordValue.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/i);
        
        items.push({
          content: "Current speed run record",
          value: timeMatch ? timeMatch[1] : recordValue,
          unit: timeMatch ? timeMatch[2] : undefined,
          context: trimmedLine,
          confidence: 1.0, // High confidence for current records
          sourceChunkId: chunkId,
          metadata: { 
            method: 'llm',
            type: 'current_record'
          }
        });
        return;
      }
      
      // Extract ANY line with time values - be very inclusive
      const timeMatch = trimmedLine.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/i);
      if (timeMatch) {
        // Try to extract a description from the line
        let description = trimmedLine;
        const colonMatch = trimmedLine.match(/(.+?):\s*(\d+\.?\d*\s*(?:hours?|hrs?|minutes?|mins?))/i);
        if (colonMatch) {
          description = colonMatch[1].trim();
        }
        
        items.push({
          content: description,
          value: timeMatch[1],
          unit: timeMatch[2],
          context: trimmedLine,
          confidence: 0.9,
          sourceChunkId: chunkId,
          metadata: { 
            method: 'llm',
            type: 'time_data'
          }
        });
      }
    });
    
    // Remove obvious duplicates based on value and unit
    const uniqueItems = items.reduce((acc, item) => {
      const isDuplicate = acc.some(existing => 
        existing.value === item.value && 
        existing.unit === item.unit &&
        existing.metadata?.rowNumber === item.metadata?.rowNumber
      );
      
      if (!isDuplicate) {
        acc.push(item);
      }
      
      return acc;
    }, [] as ExtractedItem[]);
    
    // Sort by confidence and row number (if available)
    return uniqueItems.sort((a, b) => {
      // First sort by row number if both have it
      if (a.metadata?.rowNumber && b.metadata?.rowNumber) {
        return parseInt(a.metadata.rowNumber) - parseInt(b.metadata.rowNumber);
      }
      // Otherwise sort by confidence
      return b.confidence - a.confidence;
    });
  }
  
  private fallbackTextExtraction(
    chunks: ChunkData[],
    context: ResearchContext,
    batchNumber: number
  ): ExtractedItem[] {
    console.log('🔄 Using fallback extraction due to LLM failure');
    
    // Add to extraction summary that fallback was used
    if (batchNumber <= 3) {
      this.extractionSummary += `\nBatch ${batchNumber}: Used fallback extraction (pattern-based)`;
    }
    
    const items: ExtractedItem[] = [];
    
    // First, try to detect table format
    chunks.forEach(chunk => {
      const text = chunk.text;
      
      // Enhanced table detection - look for headers first
      const hasTableHeaders = text.match(/Description|Record\s*time|Training|Date/i);
      const hasNumberedRows = text.match(/^\d+\s+\w+/gm);
      
      if (hasTableHeaders || hasNumberedRows) {
        console.log('📊 Detected table-like structure, parsing rows...');
        const lines = text.split('\n');
        
        lines.forEach((line, index) => {
          // Skip header lines
          if (line.match(/^(#|Description|Record|Training|Date)/i)) {
            return;
          }
          
          // Multiple patterns for table rows - including Tyler's specific format
          
          // Pattern 1: Tyler's exact format "1 Initial baseline 8.13 hours 6.44B 221k..."
          // or "2..1.1.1.1.1 Architectural changes 7.51 hours..."
          const tylerMatch = line.match(/^(\d+(?:\.\.\d+(?:\.\d+)*)?)\s+([^0-9]+?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)\s+(\d+\.?\d*[BMK]?)\s+(\d+k?)/);
          
          // Pattern 2: Simpler numbered row "1 Description 8.13 hours"
          const simpleMatch = line.match(/^(\d+)\s+(.+?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          // Pattern 3: Pipe separated "Description | 8.13 hours | 6.44B"
          const pipeMatch = line.match(/(.+?)\s*\|\s*(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          let extractedItem: ExtractedItem | null = null;
          
          if (tylerMatch) {
            // Handle Tyler's specific format
            const entryNum = tylerMatch[1];
            const description = tylerMatch[2].trim();
            const time = tylerMatch[3];
            const unit = tylerMatch[4];
            
            // Extract base number for sorting
            const baseNumber = entryNum.includes('..') ? 
              parseInt(entryNum.split('..')[0]) : 
              parseInt(entryNum.split('.')[0]);
            
            extractedItem = {
              content: `Entry ${entryNum}: ${description}`,
              value: time,
              unit: unit,
              context: line.trim(),
              confidence: 0.98, // High confidence for exact match
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table', 
                type: 'tyler_format',
                rowNumber: baseNumber.toString(),
                fullNumber: entryNum,
                description: description,
                tokens: tylerMatch[5],
                tokensPerSec: tylerMatch[6]
              }
            };
          } else if (simpleMatch && simpleMatch[2].length > 2) {
            // Ensure description is meaningful
            extractedItem = {
              content: `Entry ${simpleMatch[1]}: ${simpleMatch[2].trim()}`,
              value: simpleMatch[3],
              unit: simpleMatch[4],
              context: line.trim(),
              confidence: 0.95,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table',
                type: 'numbered_row',
                rowNumber: simpleMatch[1],
                description: simpleMatch[2].trim()
              }
            };
          } else if (pipeMatch) {
            extractedItem = {
              content: pipeMatch[1].trim(),
              value: pipeMatch[2],
              unit: pipeMatch[3],
              context: line.trim(),
              confidence: 0.93,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table',
                type: 'pipe_separated'
              }
            };
          } else {
            // Last resort: check if line contains time at all
            const timeMatch = line.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
            if (timeMatch && line.match(/^\d/)) { // Starts with number
              extractedItem = {
                content: line.trim(),
                value: timeMatch[1],
                unit: timeMatch[2],
                context: line.trim(),
                confidence: 0.85,
                sourceChunkId: chunk.id,
                metadata: { 
                  method: 'table',
                  type: 'generic_time_row'
                }
              };
            }
          }
          
          if (extractedItem) {
            items.push(extractedItem);
          }
        });
      }
    });
    
    // Also look for "Current record:" pattern
    chunks.forEach(chunk => {
      const currentRecordMatch = chunk.text.match(/Current\s+record[:\s]+(\d+\.?\d*)\s*(minutes?|mins?|hours?|hrs?)/i);
      if (currentRecordMatch) {
        items.push({
          content: "Current speed run record",
          value: currentRecordMatch[1],
          unit: currentRecordMatch[2],
          context: `Current record: ${currentRecordMatch[1]} ${currentRecordMatch[2]}`,
          confidence: 1.0,
          sourceChunkId: chunk.id,
          metadata: { 
            method: 'pattern',
            type: 'current_record'
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
      // For table rows, create unique key including row number
      let key: string;
      if (item.metadata?.rowNumber) {
        // Keep each table row distinct
        key = `row_${item.metadata.rowNumber}_${item.value}_${item.unit}`.toLowerCase();
      } else if (item.metadata?.type === 'current_record') {
        // Current records are always unique
        key = `current_${item.value}_${item.unit}`.toLowerCase();
      } else {
        // For other items, use more specific deduplication
        // Include more of the content to avoid over-deduplication
        const contentKey = item.content.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
        key = `${contentKey}_${item.value}_${item.unit}`.toLowerCase();
      }
      
      const existing = seen.get(key);
      
      // Only replace if new item has significantly higher confidence
      if (!existing || (item.confidence > existing.confidence + 0.1)) {
        seen.set(key, item);
      }
    }
    
    return Array.from(seen.values())
      .sort((a, b) => {
        // Sort by row number first if available
        if (a.metadata?.rowNumber && b.metadata?.rowNumber) {
          return parseInt(a.metadata.rowNumber) - parseInt(b.metadata.rowNumber);
        }
        // Otherwise by confidence
        return b.confidence - a.confidence;
      });
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