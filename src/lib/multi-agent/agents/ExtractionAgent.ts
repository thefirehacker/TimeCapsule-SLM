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
    // Use LLM to intelligently understand document context
    const prompt = `<think>
I need to read this text and understand:
1. What type of document/content is this? (blog post, technical report, table, etc.)
2. What is the user looking for based on their query?
3. What are the different types of information present? (current records vs historical data, achievements vs development progress, etc.)
4. If there are tables, what do the column headers mean?
5. What structure does the data have? (lists, tables, paragraphs, etc.)
</think>

Please read and analyze this text to answer the user's query. First, understand the document's structure and context.

User query: "${context.query}"

Text to analyze:
${chunks.map((chunk, i) => chunk.text).join('\n\n---\n\n')}

Instructions:
1. SPECIAL TABLE DETECTION: If you see a table-like structure:
   - Look for column headers (like "Description", "Record time", "Training Tokens", "Date")
   - Understand what each column represents based on the headers
   - Extract ALL rows as separate items, preserving the relationship between columns
   - For example: "Row 1: Initial baseline - 8.13 hours - 6.44B tokens - 2025/01/16"
   - Make sure to extract EVERY single row in the table, not just a sample

2. Distinguish between different types of data:
   - Current achievements/records (e.g., "Current record: 3.14 minutes")
   - Historical progression/training data (e.g., table rows showing past attempts)
   - Development milestones vs performance metrics
   - Rankings or ordered lists (1st, 2nd, 3rd, etc.)

3. Extract relevant information based on what the user is asking for:
   - If they ask for "top 3", extract at least the top 5-6 items to ensure coverage
   - If they ask for "speed runs", include all timing-related data
   - Include both the specific values AND their context

When you find relevant information:
- For tables: Extract EVERY row as a complete item
- Provide complete context, not fragments
- Include descriptions of what each item represents
- Preserve the distinction between different data types
- Keep numerical values with their units (hours, minutes, tokens, etc.)

Format your findings naturally, explaining what each piece of information means in context. Be comprehensive - it's better to extract too much than too little.`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 LLM extraction response:`, response.substring(0, 300));
      
      // Extract thinking content for batch summary
      const thinkingMatch = response.match(/<think>([\s\S]*?)<\/think>/);
      if (thinkingMatch && batchNumber <= 3) { // Only store first 3 batch insights to avoid clutter
        const thinking = thinkingMatch[1].trim().substring(0, 200);
        this.extractionSummary += `\nBatch ${batchNumber} thinking: ${thinking}...`;
      }
      
      // Parse the LLM's natural response into items
      const items = this.parseNaturalResponse(response, chunks[0]?.id || '');
      
      // Add batch-specific insights if items found
      if (items.length > 0 && batchNumber <= 5) {
        const sampleItem = items[0];
        this.batchReasoning.push(`Batch ${batchNumber}: Found ${items.length} items (e.g., "${sampleItem.content.substring(0, 50)}...")`);
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
    
    // Clean up LLM thinking process
    let cleanResponse = response;
    
    // Extract content after thinking tags if present
    if (cleanResponse.includes('</think>')) {
      const parts = cleanResponse.split('</think>');
      cleanResponse = parts[parts.length - 1].trim();
    }
    
    // First, check for table row patterns from LLM
    // Look for patterns like "Row 1: Initial baseline - 8.13 hours - 6.44B tokens"
    const tableRowMatches = cleanResponse.matchAll(/Row\s*(\d+):\s*(.+?)(?:\n|$)/gi);
    for (const match of tableRowMatches) {
      const rowContent = match[2].trim();
      const rowNumber = match[1];
      
      // Parse the row content (usually separated by - or |)
      const parts = rowContent.split(/\s*[-|]\s*/);
      if (parts.length >= 2) {
        // Extract time value if present
        const timeMatch = rowContent.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/i);
        
        items.push({
          content: `Entry ${rowNumber}: ${parts[0].trim()}`,
          value: timeMatch ? timeMatch[1] : undefined,
          unit: timeMatch ? timeMatch[2] : undefined,
          context: rowContent,
          confidence: 0.95,
          sourceChunkId: chunkId,
          metadata: { 
            method: 'llm',
            type: 'table_row',
            rowNumber: rowNumber,
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
    
    // Let LLM's natural language guide the parsing
    // Split into paragraphs or meaningful sections
    const sections = cleanResponse.split(/\n\n+/).filter(s => s.trim());
    
    sections.forEach(section => {
      const lines = section.split('\n').filter(line => line.trim());
      
      lines.forEach(line => {
        // Skip meta-commentary but be less aggressive
        if (line.match(/^(This is a|The document appears to be|Looking at the structure|Instructions:)/i)) {
          return;
        }
        
        // Skip lines we already processed as table rows or list items
        if (line.match(/^Row\s*\d+:|^\d+[.)\s]+/)) {
          return;
        }
        
        // Extract any line that seems to contain actual data
        const trimmedLine = line.trim();
        
        // Check if line contains meaningful information
        if (trimmedLine.length > 15) {
          // Look for "Current record:" or similar patterns
          const recordMatch = trimmedLine.match(/Current\s+record[:\s]+(.+)/i);
          if (recordMatch) {
            const recordValue = recordMatch[1].trim();
            const timeMatch = recordValue.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/i);
            
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
          
          // Try to extract structured data if present
          const structuredMatch = trimmedLine.match(/(.+?):\s*(.+)/);
          
          if (structuredMatch) {
            const [_, label, value] = structuredMatch;
            
            // Check if value contains time information
            const timeMatch = value.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/i);
            
            items.push({
              content: label.trim(),
              value: timeMatch ? timeMatch[1] : value.trim(),
              unit: timeMatch ? timeMatch[2] : undefined,
              context: section,
              confidence: 0.85,
              sourceChunkId: chunkId,
              metadata: { 
                method: 'llm',
                section: section.substring(0, 50) + '...'
              }
            });
          } else if (trimmedLine.match(/\d+\.?\d*\s*(hours?|hrs?|minutes?|mins?)/i)) {
            // Line contains time data but not in structured format
            const timeMatch = trimmedLine.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/i);
            
            items.push({
              content: trimmedLine,
              value: timeMatch![1],
              unit: timeMatch![2],
              context: section,
              confidence: 0.75,
              sourceChunkId: chunkId,
              metadata: { 
                method: 'llm',
                type: 'time_mention'
              }
            });
          }
        }
      });
    });
    
    // Look for any additional numerical data with context that we might have missed
    const numericMatches = cleanResponse.matchAll(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/gi);
    for (const match of numericMatches) {
      const contextStart = Math.max(0, match.index! - 80);
      const contextEnd = Math.min(cleanResponse.length, match.index! + match[0].length + 80);
      const context = cleanResponse.substring(contextStart, contextEnd).trim();
      
      // Only add if not already captured
      const isDuplicate = items.some(item => 
        (item.value === match[1] && item.unit?.toLowerCase().includes(match[2].toLowerCase().substring(0, 3))) ||
        item.context.includes(match[0])
      );
      
      if (!isDuplicate && context.length > 20) {
        items.push({
          content: context,
          value: match[1],
          unit: match[2],
          context: context,
          confidence: 0.65,
          sourceChunkId: chunkId,
          metadata: { 
            method: 'llm',
            type: 'numeric_time'
          }
        });
      }
    }
    
    // Sort by confidence and remove obvious duplicates
    return items.sort((a, b) => b.confidence - a.confidence);
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
          
          // Multiple patterns for table rows
          // Pattern 1: "1 Initial baseline 8.13 hours 6.44B 221k..."
          const rowMatch1 = line.match(/^(\d+)\s+(.+?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)\s*/);
          
          // Pattern 2: "Initial baseline | 8.13 hours | 6.44B"
          const rowMatch2 = line.match(/(.+?)\s*\|\s*(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          // Pattern 3: Just numbered items with time
          const rowMatch3 = line.match(/^\d+[.)]\s*.*?(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          // Pattern 4: For Tyler's specific format - flexible whitespace
          const rowMatch4 = line.match(/^(\d+)\s+(\S+(?:\s+\S+)*?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          let extractedItem: ExtractedItem | null = null;
          
          if (rowMatch1) {
            extractedItem = {
              content: `Entry ${rowMatch1[1]}: ${rowMatch1[2].trim()}`,
              value: rowMatch1[3],
              unit: rowMatch1[4],
              context: line.trim(),
              confidence: 0.95,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table', 
                type: 'numbered_row',
                rowNumber: rowMatch1[1],
                description: rowMatch1[2].trim()
              }
            };
          } else if (rowMatch2) {
            extractedItem = {
              content: rowMatch2[1].trim(),
              value: rowMatch2[2],
              unit: rowMatch2[3],
              context: line.trim(),
              confidence: 0.93,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table',
                type: 'pipe_separated'
              }
            };
          } else if (rowMatch3) {
            extractedItem = {
              content: line.trim(),
              value: rowMatch3[1],
              unit: rowMatch3[2],
              context: line.trim(),
              confidence: 0.9,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table',
                type: 'numbered_list'
              }
            };
          } else if (rowMatch4 && rowMatch4[2].length > 2) {
            // Ensure description is meaningful
            extractedItem = {
              content: `Entry ${rowMatch4[1]}: ${rowMatch4[2].trim()}`,
              value: rowMatch4[3],
              unit: rowMatch4[4],
              context: line.trim(),
              confidence: 0.94,
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table',
                type: 'flexible_format',
                rowNumber: rowMatch4[1],
                description: rowMatch4[2].trim()
              }
            };
          }
          
          if (extractedItem) {
            items.push(extractedItem);
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