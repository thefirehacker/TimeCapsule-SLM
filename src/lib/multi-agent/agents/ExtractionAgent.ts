/**
 * Extraction Agent
 * 
 * Executes extraction using the generated patterns.
 * Uses LLM to understand and extract information based on strategies.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, ExtractedItem, ChunkData, DocumentAnalysis } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';
import { generateWithCompletion, sanitizeResponse, parseJsonWithResilience } from '../../../components/DeepResearch/hooks/responseCompletion';

export class ExtractionAgent extends BaseAgent {
  readonly name = 'Extractor';
  readonly description = 'Executes extraction using generated patterns';
  
  private llm: LLMFunction;
  private batchReasoning: string[] = [];
  private extractionSummary: string = '';
  private llmResponses: string[] = [];
  
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
    const totalChunks = context.ragResults.chunks.length;
    
    // Clear previous batch reasoning
    this.batchReasoning = [];
    this.extractionSummary = '';
    this.llmResponses = [];
    
    // 🔥 INTELLIGENT DATA DEPENDENCY: Check for proper regex patterns from PatternGenerator
    const regexPatterns = context.patterns.filter(p => p.regexPattern);
    const nonRegexPatterns = context.patterns.filter(p => !p.regexPattern);
    const hasRegexPatterns = regexPatterns.length > 0;
    
    console.log(`🔍 Pattern Analysis: ${regexPatterns.length} regex patterns, ${nonRegexPatterns.length} descriptor patterns`);
    
    if (regexPatterns.length > 0) {
      console.log(`🎯 Using REGEX MODE: Found ${regexPatterns.length} regex patterns from PatternGenerator`);
      console.log(`📋 Regex patterns: ${regexPatterns.map(p => p.regexPattern).join(', ')}`);
      
      // Store patterns for UI display and testing
      context.debugInfo = {
        ...context.debugInfo,
        generatedPatterns: regexPatterns.map(p => ({
          description: p.description,
          pattern: p.regexPattern,
          category: p.category || 'general'
        }))
      };
      
      // Use regex-based extraction
      const regexResults = await this.extractUsingRegexPatterns(context);
      extractedItems.push(...regexResults);
      
    } else if (nonRegexPatterns.length > 0) {
      console.log(`⚠️ DATA DEPENDENCY WARNING: Found ${nonRegexPatterns.length} descriptor patterns but no regex patterns`);
      console.log(`📋 Available patterns: ${nonRegexPatterns.map(p => p.description).join(', ')}`);
      console.log(`🧠 FALLBACK TO LLM DISCOVERY: Expected PatternGenerator to provide regex patterns for efficient extraction`);
      // 🚀 CURSOR-STYLE HYBRID: LLM Pattern Discovery → Fast Extraction
      const patternDiscovery = await this.discoverPatternsWithLLM(context);
      
      // Initial reasoning showing LLM-driven approach
      const initialReasoning = `📊 Starting LLM-driven cursor-style extraction for ${totalChunks} chunks...

🎯 Cursor-Style Hybrid Strategy:
- Phase 1: LLM discovers patterns (${patternDiscovery.success ? 'SUCCESS' : 'FALLBACK'})
- Phase 2: Fast pattern-based extraction
- Phase 3: LLM analysis of results
- Looking for: ${context.understanding.intent || 'relevant information'}`;
      
      if (patternDiscovery.success) {
        // Execute fast extraction using LLM-discovered patterns
        console.log(`🧠 LLM discovered patterns: ${patternDiscovery.patterns.join(', ')}`);
        
        // Capture LLM pattern discovery response for verbose output
        this.llmResponses.push(`🧠 **Pattern Discovery LLM Response**:\n${patternDiscovery.sourceResponse}`);
        
        const patternResults = await this.extractUsingDiscoveredPatterns(context.ragResults.chunks, patternDiscovery, context);
        extractedItems.push(...patternResults);
        
        this.batchReasoning.push(`✅ **LLM Pattern Discovery Success**: Found ${patternResults.length} items using patterns: ${patternDiscovery.patterns.join(', ')}`);
        this.batchReasoning.push(`🎯 **Strategy Applied**: ${patternDiscovery.strategy}`);
      } else {
        // Pattern discovery failed - this should not happen with proper implementation
        console.error(`❌ Pattern discovery failed - this indicates a system issue that needs fixing`);
        
        if (patternDiscovery.sourceResponse) {
          this.llmResponses.push(`❌ **Pattern Discovery Failed LLM Response**:\n${patternDiscovery.sourceResponse}`);
          console.error(`❌ LLM Response that failed:`, patternDiscovery.sourceResponse.substring(0, 500));
        }
        
        throw new Error('Pattern discovery failed - system needs debugging, no fallback should be needed');
      }
    }
    
    // Deduplicate and sort by confidence
    const uniqueItems = this.deduplicateItems(extractedItems);
    context.extractedData.raw = uniqueItems;
    
    // Validation: Log extraction statistics
    this.logExtractionStats(extractedItems, uniqueItems);
    
    // Create final comprehensive reasoning  
    const initialReasoning = hasRegexPatterns 
      ? `🎯 **REGEX MODE**: Using ${context.patterns.filter(p => p.regexPattern).length} patterns from PatternGenerator`
      : `🧠 **LLM DISCOVERY MODE**: No regex patterns available, using LLM pattern discovery`;
      
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
    
    // Add LLM responses for verbose output
    if (this.llmResponses.length > 0) {
      sections.push('\n🤖 **LLM Reasoning & Analysis**:');
      sections.push(...this.llmResponses);
    }
    
    // Add extraction summary if available
    if (this.extractionSummary) {
      sections.push('\n📋 **Additional Extraction Insights**:');
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
    // Adaptive extraction prompt based on document analysis
    const documentAnalysis = context.documentAnalysis;
    const prompt = await this.createAdaptiveExtractionPrompt(context.query, chunks, documentAnalysis);

    try {
      // Use response completion for reliable extraction with shorter timeout for small models
      const response = await generateWithCompletion(
        async (prompt: string) => {
          const result = await this.llm(prompt);
          return { text: result };
        },
        prompt,
        {
          maxRetries: 2, // Reduced retries
          timeout: 600000, // 10 minutes for slower models like Gemma 3n
          continuationPrompt: "Continue extracting the data:"
        }
      );
      
      console.log(`🤖 LLM extraction response (${response.length} chars):`, response.substring(0, 300));
      console.log(`📊 Batch ${batchNumber} raw response:`, response);
      
      // Sanitize response before parsing
      const sanitizedResponse = sanitizeResponse(response);
      console.log(`🧹 Sanitized response:`, sanitizedResponse.substring(0, 200));
      
      // Parse the LLM's direct extraction into items using Universal Intelligence
      const items = await this.parseUniversalResponse(sanitizedResponse, chunks[0]?.id || '', context.query);
      
      // Add batch-specific insights if items found
      if (items.length > 0 && batchNumber <= 5) {
        const sampleItem = items[0];
        const sampleContent = (sampleItem.content || 'unknown').toString().substring(0, 50);
        this.batchReasoning.push(`Batch ${batchNumber}: Extracted ${items.length} data points (e.g., "${sampleContent}...")`);
      }
      
      // Add to extraction summary
      if (batchNumber <= 3) {
        this.extractionSummary += `\nBatch ${batchNumber}: Extracted ${items.length} items directly`;
      }
      
      return items;
      
    } catch (error) {
      console.error(`❌ LLM extraction failed for batch ${batchNumber}:`, error);
      console.error(`📝 Failed prompt (first 200 chars):`, prompt.substring(0, 200));
      
      // Add error to batch reasoning  
      this.batchReasoning.push(`Batch ${batchNumber}: ❌ LLM extraction failed`);
      console.error(`❌ Batch ${batchNumber} extraction failed:`, error);
      
      // Throw error instead of using fallback
      throw new Error(`Batch extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
  
  private async createAdaptiveExtractionPrompt(query: string, chunks: ChunkData[], documentAnalysis?: DocumentAnalysis): Promise<string> {
    if (!documentAnalysis) {
      // Fallback to generic extraction
      const content = chunks.map((chunk, i) => chunk.text).join('\n\n---\n\n');
      return `Extract relevant information from the text below to answer: "${query}"

Text:
${content}

Extract any relevant data points, facts, or information that helps answer the query.`;
    }

    // Multi-document vs single document handling
    if (documentAnalysis.documents && documentAnalysis.documents.length > 1) {
      return this.createMultiDocumentExtractionPrompt(query, chunks, documentAnalysis);
    } else {
      return await this.createUniversalExtractionPrompt(query, chunks, documentAnalysis);
    }
  }

  private createMultiDocumentExtractionPrompt(query: string, chunks: ChunkData[], documentAnalysis: DocumentAnalysis): string {
    // Group chunks by document
    const docGroups = this.groupChunksBySource(chunks);
    
    // Get document names from DataInspector analysis
    const documentMap = new Map();
    if (documentAnalysis.documents) {
      documentAnalysis.documents.forEach((doc, i) => {
        documentMap.set(doc.documentId, {
          name: doc.documentName || doc.documentId,
          type: doc.documentType,
          entity: doc.primaryEntity || 'Unknown'
        });
      });
    }
    
    // Much simpler prompt for small models that uses ACTUAL document names
    const simplePrompt = `EXTRACT DATA FOR: ${query}

${docGroups.map((group, i) => {
      const docInfo = documentMap.get(group.source) || { 
        name: group.source, 
        type: 'Unknown Document', 
        entity: 'Unknown Entity' 
      };
      return `DOCUMENT: ${docInfo.name} (${docInfo.type})
PRIMARY ENTITY: ${docInfo.entity}
${group.chunks.map(chunk => chunk.text.substring(0, 300)).join('\n\n')}
`;
    }).join('\n---\n')}

Extract relevant data with proper attribution (NO hardcoded examples):
- Content: [actual extracted value]
- Source Document: [actual document name from above]
- Entity Owner: [actual person/entity this data belongs to]  
- Fact Type: [achievement/measurement/skill/etc based on content]

Direct extraction only:`;

    return simplePrompt;
  }

  private async createUniversalExtractionPrompt(query: string, chunks: ChunkData[], documentAnalysis: DocumentAnalysis): Promise<string> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded extraction format assumptions
    // Let LLM determine what data to extract and how based on document structure
    
    const content = chunks.map((chunk, i) => chunk.text).join('\n\n---\n\n');
    
    // Get LLM-generated extraction approach
    const extractionApproach = await this.generateExtractionApproach(documentAnalysis, query);
    
    const universalPrompt = `EXTRACT DATA FOR: ${query}

DOCUMENT CONTENT:
${content}

EXTRACTION APPROACH:
${extractionApproach}

DOCUMENT STRUCTURE: ${documentAnalysis.structure.join(', ')}
CONTENT AREAS: ${documentAnalysis.contentAreas.join(', ')}

Based on the document structure and your analysis, extract ALL relevant data that answers the user's query.
Focus on completeness - don't miss any data points.
Present the extracted information clearly.`;

    return universalPrompt;
  }

  private groupChunksBySource(chunks: ChunkData[]): { source: string; chunks: ChunkData[] }[] {
    const groups: Record<string, ChunkData[]> = {};
    
    chunks.forEach(chunk => {
      let sourceId = chunk.sourceDocument || chunk.source;
      
      if (!groups[sourceId]) {
        groups[sourceId] = [];
      }
      groups[sourceId].push(chunk);
    });
    
    return Object.entries(groups).map(([source, chunks]) => ({
      source,
      chunks
    }));
  }
  
  private async generateExtractionApproach(documentAnalysis: DocumentAnalysis, query: string): Promise<string> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded query patterns or document type assumptions
    // Let LLM determine extraction approach based on actual document content and query intent
    
    const prompt = `Analyze this query and document to determine the best extraction approach:

QUERY: "${query}"
DOCUMENT TYPE: ${documentAnalysis.documentType}
DOCUMENT CONTENT AREAS: ${documentAnalysis.contentAreas.join(', ')}
DOCUMENT STRUCTURE: ${documentAnalysis.structure.join(', ')}

Based on what the user is asking and what's actually in this document, what extraction approach would work best?

Consider:
- What specific information does the user want?
- What type of data organization exists in this document?
- How should the extraction be structured to answer their question?

Return extraction strategy as bullet points.`;

    try {
      const response = await this.llm(prompt);
      return response.trim();
    } catch (error) {
      console.warn('Failed to generate extraction approach, using fallback');
      return '- Extract information directly relevant to the user query\n- Focus on concrete facts and specific details\n- Preserve context and relationships between data points';
    }
  }
  
  private async parseUniversalResponse(response: string, chunkId: string, query: string): Promise<ExtractedItem[]> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded parsing patterns
    // Let LLM understand and structure the response based on content
    
    const parsePrompt = `Parse this extraction response to identify all data points that answer the user query:

USER QUERY: "${query}"
EXTRACTION RESPONSE: ${response}

Identify every piece of data that helps answer the query. For each data point, provide:
- The actual content/value
- Any associated description or context
- Confidence level (0.0-1.0)

Return as JSON array:
[
  {
    "content": "the extracted information",
    "value": "numeric value if any",
    "unit": "unit if any (hours, minutes, etc)",
    "context": "surrounding context",
    "confidence": 0.9
  }
]

Focus on completeness - capture every relevant data point.`;

    try {
      const parseResponse = await this.llm(parsePrompt);
      const parsedData = parseJsonWithResilience(parseResponse);
      
      if (Array.isArray(parsedData)) {
        return parsedData.map((item: any, index: number) => ({
          content: item.content || '',
          value: item.value?.toString(),
          unit: item.unit,
          context: item.context || item.content,
          confidence: item.confidence || 0.8,
          sourceChunkId: chunkId,
          metadata: {
            method: 'llm_universal',
            type: 'extracted_data',
            position: index.toString()
          }
        }));
      }
    } catch (error) {
      console.error('❌ JSON parsing failed completely:', error);
      throw new Error(`Failed to parse extraction response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // If we reach here, no valid data was found
    return [];
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
          
          // Multiple patterns for table rows - generic table formats
          
          // Pattern 1: Complex numbered format "1.2.3 Description value unit"
          const complexMatch = line.match(/^(\d+(?:\.\.\d+(?:\.\d+)*)?)\s+([^0-9]+?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)\s+(\d+\.?\d*[BMK]?)\s+(\d+k?)/);
          
          // Pattern 2: Simple numbered row "1 Description value unit"
          const simpleMatch = line.match(/^(\d+)\s+(.+?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          // Pattern 3: Pipe separated "Description | value unit | other"
          const pipeMatch = line.match(/(.+?)\s*\|\s*(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/);
          
          let extractedItem: ExtractedItem | null = null;
          
          if (complexMatch) {
            // Handle complex numbered format
            const entryNum = complexMatch[1];
            const description = complexMatch[2].trim();
            const value = complexMatch[3];
            const unit = complexMatch[4];
            
            // Extract base number for sorting
            const baseNumber = entryNum.includes('..') ? 
              parseInt(entryNum.split('..')[0]) : 
              parseInt(entryNum.split('.')[0]);
            
            extractedItem = {
              content: `Entry ${entryNum}: ${description}`,
              value: value,
              unit: unit,
              context: line.trim(),
              confidence: 0.98, // High confidence for exact match
              sourceChunkId: chunk.id,
              metadata: { 
                method: 'table', 
                type: 'numbered_entry',
                rowNumber: baseNumber.toString(),
                fullNumber: entryNum,
                description: description,
                additionalData: complexMatch[5] + ' ' + complexMatch[6]
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
          content: `Current record: ${currentRecordMatch[1]} ${currentRecordMatch[2]}`,
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
    
    // 🚨 REMOVED HARDCODED PATTERNS - Use PatternGenerator's dynamic patterns only
    // Get patterns from context (generated by PatternGenerator based on DataInspector analysis)
    const dynamicPatterns = context.patterns || [];
    
    if (dynamicPatterns.length === 0) {
      console.warn('⚠️ No patterns available from PatternGenerator - extraction cannot proceed');
      this.setReasoning('No extraction patterns available. PatternGenerator must be called first to create patterns based on document analysis.');
      return []; // Return empty array since this function returns ExtractedItem[]
    }
    
    console.log(`🎯 Using ${dynamicPatterns.length} dynamic patterns from PatternGenerator (no hardcoded patterns)`);
    
    // Convert PatternGenerator patterns to extraction format
    const patterns = dynamicPatterns.map(pattern => ({
      regex: new RegExp(pattern.regexPattern || '', 'gi'),
      type: pattern.description || 'data',
      description: pattern.description || 'Unknown pattern',
      confidence: pattern.confidence || 1.0,
      extractValue: 1, // Default to first capture group
      unit: 'data' // Default unit
    }));
    
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
            unit: patternDef.unit || match[2] || 'unknown',
            context: contextText,
            confidence: patternDef.confidence || 0.8,
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
    return parseJsonWithResilience(text);
  }

  /**
   * 🚀 CURSOR-STYLE HYBRID: LLM Pattern Discovery (Universal Intelligence)
   * LLM discovers what patterns exist in document instead of hardcoded assumptions
   */
  private async discoverPatternsWithLLM(context: ResearchContext): Promise<PatternDiscovery> {
    console.log(`🧠 LLM discovering patterns for query: "${context.query}"`);
    
    // Sample content for pattern discovery (don't process all chunks)
    const sampleContent = context.ragResults.chunks
      .slice(0, 3)
      .map(chunk => chunk.text.substring(0, 300))
      .join('\n\n---\n\n');
    
    const patternDiscoveryPrompt = `Analyze this document and discover what patterns I should search for:

USER QUERY: "${context.query}"
DOCUMENT SAMPLE:
${sampleContent}

What patterns, measurements, or data types exist in this document that would answer the user's query?

Examples of what to look for:
- If user asks about "speed runs" → look for timing patterns, performance metrics
- If user asks about "recipes" → look for ingredients, cooking times, instructions  
- If user asks about "projects" → look for project names, technologies, achievements

Generate a simple search strategy:
PATTERNS: [list the specific patterns to search for]
STRATEGY: [how to find and extract this data]

Keep it simple and direct.`;

    try {
      const response = await this.llm(patternDiscoveryPrompt);
      console.log(`🔍 LLM pattern discovery response: ${response.substring(0, 200)}...`);
      
      // Parse LLM response for patterns
      const patterns = this.parsePatternsFromLLMResponse(response);
      
      if (patterns.length > 0) {
        return {
          success: true,
          patterns: patterns,
          strategy: response.substring(response.indexOf('STRATEGY:') + 9).trim().substring(0, 200),
          sourceResponse: response
        };
      } else {
        return { success: false, patterns: [], strategy: '', sourceResponse: response };
      }
    } catch (error) {
      console.warn('🔧 LLM pattern discovery failed:', error);
      return { success: false, patterns: [], strategy: '', sourceResponse: '' };
    }
  }

  /**
   * 🎯 REGEX EXTRACTION: Use PatternGenerator's regex patterns for true "Regex RAG"
   * This is the core functionality that was missing - actual regex-based extraction
   */
  private async extractUsingRegexPatterns(context: ResearchContext): Promise<ExtractedItem[]> {
    console.log(`🎯 Starting REGEX extraction with ${context.patterns.filter(p => p.regexPattern).length} patterns`);
    
    const extractedItems: ExtractedItem[] = [];
    const regexPatterns = context.patterns.filter(pattern => pattern.regexPattern);
    const totalChunks = context.ragResults.chunks.length;
    
    console.log(`📊 Processing ${totalChunks} chunks with ${regexPatterns.length} regex patterns`);
    
    // Apply each regex pattern to all chunks
    for (const pattern of regexPatterns) {
      const regexString = pattern.regexPattern!;
      console.log(`🔍 Applying pattern: ${regexString}`);
      
      try {
        // Parse regex pattern (handle /pattern/flags format)
        const regexMatch = regexString.match(/^\/(.+)\/([gimuy]*)$/);
        const regexBody = regexMatch ? regexMatch[1] : regexString;
        const regexFlags = regexMatch ? regexMatch[2] : 'gi';
        
        const regex = new RegExp(regexBody, regexFlags);
        let patternMatches = 0;
        
        // Apply regex to each chunk
        for (const chunk of context.ragResults.chunks) {
          let match;
          while ((match = regex.exec(chunk.text)) !== null) {
            const extractedContent = match[1] || match[0]; // Use capture group or full match
            
            extractedItems.push({
              content: extractedContent.trim(),
              value: extractedContent.trim(),
              unit: '',
              context: match[0], // Full match for context
              confidence: 0.95, // High confidence for regex matches
              sourceChunkId: chunk.id,
              sourceDocument: chunk.sourceDocument,
              metadata: {
                extractionMethod: 'regex_pattern',
                regexPattern: regexString,
                patternDescription: pattern.description,
                fullMatch: match[0]
              }
            });
            
            patternMatches++;
          }
          
          // Reset regex lastIndex for global patterns
          regex.lastIndex = 0;
        }
        
        console.log(`✅ Pattern "${regexString}" found ${patternMatches} matches`);
        
      } catch (error) {
        console.error(`❌ Invalid regex pattern "${regexString}":`, error);
      }
    }
    
    console.log(`🎯 REGEX extraction complete: ${extractedItems.length} items extracted`);
    
    // Update reasoning
    this.batchReasoning.push(`🎯 **REGEX MODE**: Used ${regexPatterns.length} patterns from PatternGenerator`);
    this.batchReasoning.push(`✅ **Regex Results**: ${extractedItems.length} items extracted using true regex matching`);
    this.batchReasoning.push(`📊 **Performance**: ${totalChunks} chunks processed with ${regexPatterns.length} patterns`);
    
    return extractedItems;
  }
  
  /**
   * 🚀 CURSOR-STYLE FAST EXTRACTION: Use LLM-discovered patterns for fast data extraction
   * This replaces complex structure detection with simple pattern-based extraction
   */
  private async extractUsingDiscoveredPatterns(
    chunks: ChunkData[], 
    patternDiscovery: PatternDiscovery,
    context: ResearchContext
  ): Promise<ExtractedItem[]> {
    console.log(`⚡ Fast extraction using ${patternDiscovery.patterns.length} LLM-discovered patterns`);
    
    const extractedItems: ExtractedItem[] = [];
    
    // Process all chunks together using discovered patterns
    const allContent = chunks.map((chunk, i) => 
      `CHUNK ${i + 1}:\n${chunk.text}`
    ).join('\n\n---\n\n');
    
    const fastExtractionPrompt = `Extract data using these LLM-discovered patterns:

QUERY: "${context.query}"
DISCOVERED PATTERNS: ${patternDiscovery.patterns.join(', ')}
STRATEGY: ${patternDiscovery.strategy}

CONTENT:
${allContent}

Extract all instances of the discovered patterns. Be direct and complete.
Focus on the specific patterns the LLM identified.`;

    try {
      const response = await this.llm(fastExtractionPrompt);
      console.log(`🎯 Pattern-based extraction (${response.length} chars):`, response.substring(0, 300));
      
      // Store LLM response for verbose output
      this.llmResponses.push(`⚡ **Fast Extraction LLM Response**:\n${response}`);
      
      // Simple parsing - no complex JSON attempts
      const items = this.parseSimpleResponse(response, chunks[0]?.id || 'pattern_extracted');
      
      // Add pattern-based metadata
      const enhancedItems = items.map(item => ({
        ...item,
        metadata: {
          ...item.metadata,
          extractionMethod: 'llm_pattern_discovery',
          discoveredPatterns: patternDiscovery.patterns,
          extractionStrategy: patternDiscovery.strategy
        }
      }));
      
      console.log(`✅ Pattern-based extraction complete: Found ${enhancedItems.length} items`);
      this.extractionSummary += `\nLLM Pattern Discovery: Used patterns [${patternDiscovery.patterns.join(', ')}] to find ${enhancedItems.length} items`;
      
      return enhancedItems;
      
    } catch (error) {
      console.error(`❌ Pattern-based extraction failed:`, error);
      return [];
    }
  }
  
  /**
   * 🔧 FALLBACK EXTRACTION: Simple extraction when pattern discovery fails
   */
  private async fallbackExtraction(chunks: ChunkData[], context: ResearchContext): Promise<ExtractedItem[]> {
    console.log(`🔧 Using fallback extraction for ${chunks.length} chunks`);
    
    const extractedItems: ExtractedItem[] = [];
    
    // Simple batch processing fallback
    for (let i = 0; i < chunks.length; i += 3) {
      const batch = chunks.slice(i, i + 3);
      try {
        const batchResults = await this.extractFromBatch(batch, context, Math.floor(i / 3) + 1);
        extractedItems.push(...batchResults);
      } catch (error) {
        console.warn(`⚠️ Fallback batch ${Math.floor(i / 3) + 1} failed:`, error);
      }
    }
    
    return extractedItems;
  }
  
  /**
   * 🧠 INTELLIGENT PATTERN DISCOVERY: Parse natural language LLM responses
   * No hardcode, no fallbacks - pure LLM intelligence
   */
  private parsePatternsFromLLMResponse(response: string): string[] {
    const patterns: string[] = [];
    
    // 🧠 HANDLE NATURAL LANGUAGE: Remove <think> tags and analyze content
    const cleanResponse = response.replace(/<\/?think>/g, '').trim();
    
    // Try structured format first
    const patternsMatch = cleanResponse.match(/PATTERNS:\s*\[([\s\S]*?)\]/);
    if (patternsMatch) {
      const patternList = patternsMatch[1];
      patterns.push(...patternList.split(',').map(p => p.trim().replace(/['"]/g, '')));
    } else {
      // 🧠 INTELLIGENT PARSING: Extract meaningful patterns from natural language
      const intelligentPatterns = this.extractPatternsFromNaturalLanguage(cleanResponse);
      patterns.push(...intelligentPatterns);
    }
    
    console.log(`🔍 Extracted ${patterns.length} patterns from LLM response:`, patterns);
    return patterns.filter(p => p.length > 0);
  }

  /**
   * 🧠 EXTRACT PATTERNS FROM NATURAL LANGUAGE: No hardcoded assumptions
   */
  private extractPatternsFromNaturalLanguage(response: string): string[] {
    const patterns: string[] = [];
    
    // Look for mentions of what to look for or extract
    const lookForPatterns = [
      /look for ([^,.]+)/gi,
      /search for ([^,.]+)/gi,
      /find ([^,.]+)/gi,
      /extract ([^,.]+)/gi,
      /identify ([^,.]+)/gi,
      /discover ([^,.]+)/gi
    ];
    
    for (const pattern of lookForPatterns) {
      let match;
      while ((match = pattern.exec(response)) !== null) {
        const extractedPattern = match[1].trim();
        if (extractedPattern.length > 3 && !patterns.includes(extractedPattern)) {
          patterns.push(extractedPattern);
        }
      }
    }
    
    // Look for specific mentions of data types
    const dataTypes = [
      'projects?', 'achievements?', 'skills?', 'experience', 'work', 'technologies?',
      'companies?', 'positions?', 'roles?', 'responsibilities?', 'accomplishments?'
    ];
    
    for (const dataType of dataTypes) {
      const regex = new RegExp(`\\b${dataType}\\b`, 'gi');
      if (regex.test(response) && !patterns.some(p => p.toLowerCase().includes(dataType.replace('?', '')))) {
        patterns.push(dataType.replace('?', ''));
      }
    }
    
    // If no specific patterns found, derive from query context
    if (patterns.length === 0) {
      patterns.push('relevant information', 'key details', 'important facts');
    }
    
    return patterns;
  }
  
  /**
   * 🔍 Simple response parsing - no complex JSON
   */
  private parseSimpleResponse(response: string, chunkId: string): ExtractedItem[] {
    const items: ExtractedItem[] = [];
    const lines = response.split('\n').filter(line => line.trim().length > 0);
    
    for (const line of lines) {
      // Look for timing patterns in the response
      const timeMatch = line.match(/(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/i);
      if (timeMatch) {
        const value = timeMatch[1];
        const unit = timeMatch[2];
        
        items.push({
          content: line.trim(),
          value: value,
          unit: unit,
          context: line.trim(),
          confidence: 0.9,
          sourceChunkId: chunkId,
          metadata: {
            method: 'pattern_based',
            type: 'timing_data',
            extractedPattern: `${value} ${unit}`
          }
        });
      } else if (line.includes(':') && line.length > 10) {
        // General data extraction
        items.push({
          content: line.trim(),
          value: '',
          unit: '',
          context: line.trim(),
          confidence: 0.7,
          sourceChunkId: chunkId,
          metadata: {
            method: 'pattern_based',
            type: 'general_data'
          }
        });
      }
    }
    
    return items;
  }
}

// Type definitions
interface PatternDiscovery {
  success: boolean;
  patterns: string[];
  strategy: string;
  sourceResponse: string;
}