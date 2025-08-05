/**
 * Chunk Selector Agent
 * 
 * Queries RxDB VectorStore directly using DataInspector's document analysis.
 * Uses AI intelligence to perform targeted semantic search on stored embeddings,
 * implementing Claude Code/Cursor style intelligent data retrieval.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, ChunkData } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

// Import VectorStore types
declare global {
  interface Window {
    sharedVectorStore?: any;
    getVectorStore?: () => any;
  }
}

export class ChunkSelectorAgent extends BaseAgent {
  readonly name = 'ChunkSelector';
  readonly description = 'Queries RxDB embeddings using document intelligence for targeted chunk selection';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🔍 ChunkSelector: Using LLM-driven cursor-style chunk selection`);
    
    // DEBUG: Log received patterns and shared knowledge
    console.log(`📋 DEBUG - ChunkSelector received context:`, {
      patternsCount: context.patterns?.length || 0,
      patterns: context.patterns?.map(p => ({
        description: p.description,
        hasRegex: !!p.regexPattern,
        regex: p.regexPattern
      })) || [],
      hasDocumentInsights: !!context.sharedKnowledge?.documentInsights,
      documentType: context.sharedKnowledge?.documentInsights?.documentType || 'none',
      contentAreas: context.sharedKnowledge?.documentInsights?.contentAreas || []
    });
    
    // Access the global VectorStore instance  
    const vectorStore = this.getVectorStore();
    if (!vectorStore) {
      console.warn(`⚠️ VectorStore not available, falling back to pre-generated chunks`);
      this.setReasoning('❌ VectorStore not available, using pre-generated chunks');
      return context;
    }
    
    // Initial reasoning setup
    const initialReasoning = `🔍 **ChunkSelector AI Strategy**

📝 **Query**: "${context.query}"
📊 **Available Chunks**: ${context.ragResults.chunks.length} 
🧠 **Document Context**: ${context.sharedKnowledge?.documentInsights ? 
      `Type: ${context.sharedKnowledge.documentInsights.documentType}, Areas: ${context.sharedKnowledge.documentInsights.contentAreas?.join(', ')}` : 
      'No document analysis available'}

🚀 **Generating LLM search strategy...**`;
    this.setReasoning(initialReasoning);
    
    // 🚀 CURSOR-STYLE: LLM generates search strategy → fast RxDB execution
    const searchStrategy = await this.generateSearchStrategyWithLLM(context);
    
    if (searchStrategy.success) {
      console.log(`🧠 LLM search strategy: ${searchStrategy.approach}`);
      
      // Update reasoning with strategy details
      const strategyReasoning = initialReasoning + `

✅ **LLM Strategy Generated**:
**Approach**: ${searchStrategy.approach}
**Search Terms**: ${searchStrategy.searchTerms}  
**Filters**: ${searchStrategy.filters}

📡 **Raw LLM Response**:
${searchStrategy.sourceResponse}

⚡ **Executing search strategy...**`;
      this.setReasoning(strategyReasoning);
      
      await this.executeSearchStrategy(context, vectorStore, searchStrategy);
      
      // Final reasoning with results
      const finalReasoning = strategyReasoning + `

✅ **Search Completed**:
- **Chunks Found**: ${context.ragResults.chunks.length}
- **Search Method**: LLM-driven semantic search
- **Success**: ✅ Yes

🔍 **Selected Chunks**:
${context.ragResults.chunks.slice(0, 3).map((chunk, i) => 
  `${i + 1}. Source: ${chunk.source} (${chunk.text.substring(0, 100)}...)`
).join('\n')}${context.ragResults.chunks.length > 3 ? `\n... and ${context.ragResults.chunks.length - 3} more chunks` : ''}`;
      this.setReasoning(finalReasoning);
      
    } else {
      console.log('⚠️ LLM search strategy failed, using basic search');
      
      const fallbackReasoning = initialReasoning + `

❌ **LLM Strategy Failed**: ${searchStrategy.sourceResponse || 'Unknown error'}

🔄 **Falling back to basic search...**`;
      this.setReasoning(fallbackReasoning);
      
      await this.basicRxDBSearch(context, vectorStore);
      
      // Update with fallback results
      const finalFallbackReasoning = fallbackReasoning + `

✅ **Fallback Search Completed**:
- **Chunks Found**: ${context.ragResults.chunks.length}
- **Search Method**: Basic semantic search

🔍 **Selected Chunks**:
${context.ragResults.chunks.slice(0, 3).map((chunk, i) => 
  `${i + 1}. Source: ${chunk.source} (${chunk.text.substring(0, 100)}...)`
).join('\n')}${context.ragResults.chunks.length > 3 ? `\n... and ${context.ragResults.chunks.length - 3} more chunks` : ''}`;
      this.setReasoning(finalFallbackReasoning);
    }
    
    return context;
  }
  
  private getVectorStore(): any {
    // Try multiple methods to access VectorStore
    if (typeof window !== 'undefined') {
      if (window.sharedVectorStore) {
        return window.sharedVectorStore;
      }
      if (window.getVectorStore) {
        try {
          return window.getVectorStore();
        } catch (error) {
          console.warn('Failed to get VectorStore via getVectorStore():', error);
        }
      }
    }
    return null;
  }
  
  private async queryRxDBIntelligently(context: ResearchContext, vectorStore: any): Promise<void> {
    const documentInsights = context.sharedKnowledge.documentInsights;
    const hasDocumentAnalysis = documentInsights && Object.keys(documentInsights).length > 0;
    
    if (!hasDocumentAnalysis) {
      console.log(`⚠️ No DataInspector analysis available, using basic RxDB search`);
      await this.basicRxDBSearch(context, vectorStore);
      return;
    }
    
    console.log(`🧠 Using DataInspector analysis for intelligent RxDB semantic search`);
    console.log(`📋 Document analysis: ${documentInsights.documentType}, Content areas: ${documentInsights.contentAreas?.join(', ')}`);
    
    // Create intelligent search queries based on DataInspector's analysis
    const searchQueries = await this.createIntelligentSearchQueries(context, documentInsights);
    
    // Perform targeted semantic search on RxDB embeddings
    const rxdbResults = await this.performRxDBSemanticSearch(context, vectorStore, searchQueries);
    
    // Convert RxDB results to ChunkData format
    const intelligentChunks = this.convertRxDBResultsToChunks(rxdbResults);
    
    // Update context with RxDB chunks instead of generated chunks
    const originalCount = context.ragResults.chunks.length;
    context.ragResults.chunks = intelligentChunks;
    
    // Store RxDB insights in shared knowledge
    context.sharedKnowledge.discoveredPatterns.rxdbQuery = {
      originalChunkCount: originalCount,
      rxdbChunkCount: intelligentChunks.length,
      searchQueries: searchQueries,
      dataSource: 'RxDB embeddings',
      intelligenceSource: 'DataInspector analysis',
      timestamp: Date.now(),
      agentSource: 'ChunkSelector'
    };
    
    this.setReasoning(`Queried RxDB embeddings intelligently: ${originalCount} generated chunks → ${intelligentChunks.length} stored RxDB chunks using DataInspector analysis of ${documentInsights.documentType} document with focus on ${documentInsights.contentAreas?.join(', ')}`);
    
    console.log(`✅ RxDB intelligent query: ${originalCount} generated → ${intelligentChunks.length} RxDB chunks`);
  }
  
  private async createIntelligentSearchQueries(context: ResearchContext, documentInsights: any): Promise<string[]> {
    // Use DataInspector analysis to create targeted search queries
    const baseQuery = context.query;
    const contentAreas = documentInsights.contentAreas || [];
    const documentType = documentInsights.documentType || '';
    
    // Generate intelligent search queries based on document analysis
    const queries = [baseQuery]; // Start with original query
    
    // Add content area specific queries
    if (contentAreas.length > 0) {
      contentAreas.forEach((area: string) => {
        queries.push(`${area} ${baseQuery}`);
        queries.push(area); // Just the content area itself
      });
    }
    
    // Add document type context queries
    if (documentType) {
      queries.push(`${documentType} ${baseQuery}`);
    }
    
    // Remove duplicates and limit to reasonable number
    const uniqueQueries = [...new Set(queries)];
    console.log(`🔍 Generated ${uniqueQueries.length} intelligent search queries:`, uniqueQueries);
    
    return uniqueQueries.slice(0, 5); // Limit to 5 queries max
  }
  
  private async performRxDBSemanticSearch(context: ResearchContext, vectorStore: any, searchQueries: string[]): Promise<any[]> {
    const allResults: any[] = [];
    
    // Perform semantic search for each intelligent query
    for (const query of searchQueries) {
      try {
        console.log(`🔍 RxDB semantic search for: "${query}"`);
        
        // Use VectorStore's searchSimilar method
        const results = await vectorStore.searchSimilar(query, 0.2, 10, {
          agentId: 'ChunkSelector',
          sessionId: `chunkselector_${Date.now()}`, // Generate session ID for RxDB tracking
          queryType: 'agent_rag'
        });
        
        console.log(`📊 Found ${results.length} results for query: "${query}"`);
        allResults.push(...results);
        
      } catch (error) {
        console.warn(`⚠️ RxDB search failed for query "${query}":`, error);
      }
    }
    
    // Remove duplicates based on chunk ID and sort by similarity
    const uniqueResults = this.deduplicateRxDBResults(allResults);
    console.log(`📊 Total unique RxDB results: ${uniqueResults.length}`);
    
    return uniqueResults.slice(0, 25); // Limit to 25 best results
  }
  
  private deduplicateRxDBResults(results: any[]): any[] {
    const seen = new Set<string>();
    const unique: any[] = [];
    
    for (const result of results) {
      const chunkId = result.chunk?.id || result.id;
      if (chunkId && !seen.has(chunkId)) {
        seen.add(chunkId);
        unique.push(result);
      }
    }
    
    // Sort by similarity (highest first)
    return unique.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
  }
  
  private convertRxDBResultsToChunks(rxdbResults: any[]): ChunkData[] {
    return rxdbResults.map(result => ({
      id: result.chunk?.id || result.id || `rxdb_${Date.now()}_${Math.random()}`,
      text: result.chunk?.content || result.content || '',
      similarity: result.similarity || 0,
      source: result.document?.title || 'RxDB',
      sourceDocument: result.document?.title || 'Unknown Document',
      metadata: {
        source: 'RxDB',
        documentId: result.document?.id,
        documentTitle: result.document?.title,
        chunkIndex: result.chunk?.startIndex || 0,
        ...result.document?.metadata
      }
    }));
  }
  
  private async basicRxDBSearch(context: ResearchContext, vectorStore: any): Promise<void> {
    // Fallback: Simple RxDB search with original query
    try {
      console.log(`🔍 Basic RxDB search for: "${context.query}"`);
      
      const results = await vectorStore.searchSimilar(context.query, 0.2, 20, {
        agentId: 'ChunkSelector',  
        sessionId: `chunkselector_basic_${Date.now()}`, // Generate session ID for RxDB tracking
        queryType: 'agent_rag'
      });
      
      const basicChunks = this.convertRxDBResultsToChunks(results);
      const originalCount = context.ragResults.chunks.length;
      context.ragResults.chunks = basicChunks;
      
      this.setReasoning(`Applied basic RxDB search: ${originalCount} generated chunks → ${basicChunks.length} RxDB chunks using query "${context.query}"`);
      
      console.log(`✅ Basic RxDB search: ${originalCount} generated → ${basicChunks.length} RxDB chunks`);
      
    } catch (error) {
      console.error('❌ Basic RxDB search failed:', error);
      this.setReasoning('RxDB search failed, keeping original chunks');
    }
  }
  
  /**
   * 🚀 CURSOR-STYLE: LLM generates search strategy for RxDB
   */
  private async generateSearchStrategyWithLLM(context: ResearchContext): Promise<SearchStrategy> {
    const documentInsights = context.sharedKnowledge?.documentInsights;
    const documentContext = documentInsights ? 
      `Document Type: ${documentInsights.documentType}, Content Areas: ${documentInsights.contentAreas?.join(', ')}` :
      'No document analysis available';
    
    const strategyPrompt = `Generate RxDB search strategy for this query:

QUERY: "${context.query}"
DOCUMENT CONTEXT: ${documentContext}
AVAILABLE CHUNKS: ${context.ragResults.chunks.length}

Based on the query and document context, what search approach would be most effective?

Respond with:
APPROACH: [brief strategy description]
SEARCH_TERMS: [key terms to search for]
FILTERS: [any additional filters needed]

Keep it simple and focused.`;

    try {
      const response = await this.llm(strategyPrompt);
      console.log(`🔍 LLM search strategy response: ${response.substring(0, 200)}`);
      
      // Parse strategy from LLM response
      const approach = this.extractValue(response, 'APPROACH') || 'semantic search';
      const searchTerms = this.extractValue(response, 'SEARCH_TERMS') || context.query;
      const filters = this.extractValue(response, 'FILTERS') || '';
      
      return {
        success: true,
        approach: approach,
        searchTerms: searchTerms,
        filters: filters,
        sourceResponse: response
      };
    } catch (error) {
      console.warn('🔧 LLM search strategy generation failed:', error);
      return { success: false, approach: '', searchTerms: '', filters: '', sourceResponse: '' };
    }
  }
  
  /**
   * ⚡ Execute LLM-generated search strategy with hybrid semantic + regex search
   */
  private async executeSearchStrategy(context: ResearchContext, vectorStore: any, strategy: SearchStrategy): Promise<void> {
    try {
      console.log(`⚡ Executing hybrid search strategy: ${strategy.approach}`);
      
      const searchQuery = strategy.searchTerms || context.query;
      const allResults: any[] = [];
      let searchMethods: string[] = [];
      
      // 🚀 TIER 1: REGEX PATTERN SEARCH (2-5ms speed)
      if (context.patterns && context.patterns.length > 0) {
        console.log(`🎯 Executing Tier 1: Regex pattern search with ${context.patterns.length} patterns`);
        const regexResults = await this.performRegexSearch(context, vectorStore);
        if (regexResults.length > 0) {
          allResults.push(...regexResults);
          searchMethods.push(`Regex (${regexResults.length} found)`);
        }
      }
      
      // 🔍 TIER 2: SEMANTIC SEARCH (60ms speed) 
      console.log(`🔍 Executing Tier 2: Semantic search with query: "${searchQuery}"`);
      const semanticResults = await vectorStore.searchSimilar(searchQuery, 0.15, 20, {
        agentId: 'ChunkSelector',
        sessionId: `chunkselector_hybrid_${Date.now()}`,
        queryType: 'hybrid_search'
      });
      
      if (semanticResults.length > 0) {
        allResults.push(...semanticResults);
        searchMethods.push(`Semantic (${semanticResults.length} found)`);
      }
      
      // 🧠 LLM DECISION POINT: Which results should we use?
      const finalChunks = await this.selectBestResultsWithLLM(context, allResults, searchMethods, vectorStore);
      
      const originalCount = context.ragResults.chunks.length;
      context.ragResults.chunks = finalChunks;
      
      // Update verbose reasoning with LLM-driven search details
      const hybridReasoning = `✅ **LLM-Driven Search Strategy Executed**:
- **Search Methods**: ${searchMethods.join(' + ')}
- **LLM Decision**: Intelligently selected best results for query
- **Final Selection**: ${finalChunks.length} chunks chosen by LLM
- **Regex Patterns Used**: ${context.patterns?.length || 0} LLM-generated patterns
- **Search Query**: "${searchQuery}"
- **Strategy**: ${strategy.approach}

🎯 **Multi-Tier Search Performance**:
${searchMethods.map(method => `- ${method}`).join('\n')}

🧠 **LLM Intelligence**: Selected most relevant results based on query intent
📊 **Final Results**: ${finalChunks.length} chunks selected for extraction`;
      
      this.setReasoning(hybridReasoning);
      console.log(`✅ LLM-driven search complete: ${finalChunks.length} chunks selected from ${searchMethods.join(' + ')}`);
      
    } catch (error) {
      console.error('🔧 Hybrid search execution failed:', error);
      await this.basicRxDBSearch(context, vectorStore);
    }
  }
  
  /**
   * 🧠 LLM-DRIVEN RESULT SELECTION: Let LLM choose the best results
   */
  private async selectBestResultsWithLLM(context: ResearchContext, allResults: any[], searchMethods: string[], vectorStore: any): Promise<any[]> {
    console.log(`🧠 LLM deciding between ${searchMethods.join(' vs ')} results...`);
    
    try {
      // Separate regex and semantic results
      const regexResults = allResults.filter(r => r.matchMethod === 'regex_pattern');
      const semanticResults = allResults.filter(r => !r.matchMethod || r.matchMethod !== 'regex_pattern');
      
      // If only one type of results, use them
      if (regexResults.length === 0) {
        console.log(`📊 Only semantic results available, using ${semanticResults.length} chunks`);
        return this.convertRxDBResultsToChunks(this.deduplicateRxDBResults(semanticResults));
      }
      
      if (semanticResults.length === 0) {
        console.log(`📊 Only regex results available, using ${regexResults.length} chunks`);
        return this.convertRxDBResultsToChunks(this.deduplicateRxDBResults(regexResults));
      }
      
      // Both types exist, ask LLM to choose
      const regexSamples = regexResults.slice(0, 3).map(r => (r.text || r.content || '').substring(0, 200)).join(' | ');
      const semanticSamples = semanticResults.slice(0, 3).map(r => (r.chunk?.content || r.text || r.content || '').substring(0, 200)).join(' | ');
      
      const selectionPrompt = `You need to choose which search results better answer the query: "${context.query}"

REGEX PATTERN RESULTS: Found ${regexResults.length} chunks using targeted patterns
Sample content: "${regexSamples}"

SEMANTIC SEARCH RESULTS: Found ${semanticResults.length} chunks using similarity matching  
Sample content: "${semanticSamples}"

Which results are more relevant to answer the specific query? 

Respond with just one word: "regex", "semantic", or "hybrid"`;

      const llmChoice = await this.llm(selectionPrompt);
      const choice = llmChoice.toLowerCase().trim();
      
      console.log(`🧠 LLM choice for "${context.query}": ${choice}`);
      
      if (choice.includes('regex')) {
        console.log(`✅ Using regex results: ${regexResults.length} chunks`);
        return this.convertRxDBResultsToChunks(this.deduplicateRxDBResults(regexResults));
      } else if (choice.includes('semantic')) {
        console.log(`✅ Using semantic results: ${semanticResults.length} chunks`);
        return this.convertRxDBResultsToChunks(this.deduplicateRxDBResults(semanticResults));
      } else {
        // Hybrid: combine both but prioritize regex
        console.log(`✅ Using hybrid results: ${regexResults.length} regex + ${semanticResults.length} semantic`);
        const combinedResults = [...regexResults, ...semanticResults];
        return this.convertRxDBResultsToChunks(this.deduplicateRxDBResults(combinedResults));
      }
      
    } catch (error) {
      console.warn('🔧 LLM result selection failed, using hybrid approach:', error);
      // Fallback: use original deduplication approach
      const deduplicatedResults = this.deduplicateRxDBResults(allResults);
      return this.convertRxDBResultsToChunks(deduplicatedResults);
    }
  }

  /**
   * 🎯 REGEX PATTERN SEARCH: Direct text search on chunk content (2-5ms speed)
   */
  private async performRegexSearch(context: ResearchContext, vectorStore: any): Promise<any[]> {
    console.log(`🎯 Starting regex pattern search...`);
    
    try {
      // Get all chunks from the vector store for regex search
      const allChunks = await this.getAllChunksForRegexSearch(vectorStore);
      const regexResults: any[] = [];
      
      // Apply each regex pattern to find matching chunks
      for (const pattern of context.patterns) {
        if (!pattern.regexPattern) continue;
        
        try {
          // Parse the regex pattern (remove surrounding /flags if present)
          const regexMatch = pattern.regexPattern.match(/^\/(.+)\/([gimuy]*)$/);
          const regexString = regexMatch ? regexMatch[1] : pattern.regexPattern;
          const regexFlags = regexMatch ? regexMatch[2] : 'gi';
          
          const regex = new RegExp(regexString, regexFlags);
          console.log(`🔍 Testing pattern: ${pattern.regexPattern}`);
          
          // Search through all chunks with this pattern
          let matchCount = 0;
          for (const chunk of allChunks) {
            if (regex.test(chunk.text || chunk.content)) {
              regexResults.push({
                ...chunk,
                similarity: 0.95, // High similarity for regex matches
                matchedPattern: pattern.regexPattern,
                matchMethod: 'regex_pattern'
              });
              matchCount++;
            }
          }
          
          console.log(`📊 Pattern "${pattern.regexPattern}" matched ${matchCount} chunks`);
          
        } catch (regexError) {
          console.warn(`⚠️ Invalid regex pattern "${pattern.regexPattern}":`, regexError);
        }
      }
      
      console.log(`✅ Regex search complete: ${regexResults.length} total pattern matches`);
      return regexResults;
      
    } catch (error) {
      console.error('❌ Regex search failed:', error);
      return [];
    }
  }
  
  /**
   * 📊 Get all chunks from VectorStore for regex search
   */
  private async getAllChunksForRegexSearch(vectorStore: any): Promise<any[]> {
    try {
      // Try to get chunks directly from the vector store
      if (vectorStore.getAllChunks) {
        return await vectorStore.getAllChunks();
      }
      
      // Fallback: Use a broad semantic search to get many chunks
      const broadResults = await vectorStore.searchSimilar('*', 0.01, 100, {
        agentId: 'ChunkSelector',
        sessionId: `regex_preparation_${Date.now()}`,
        queryType: 'regex_preparation'
      });
      
      return broadResults;
      
    } catch (error) {
      console.warn('⚠️ Could not get chunks for regex search:', error);
      return [];
    }
  }
  
  /**
   * 🔍 Extract value from LLM response
   */
  private extractValue(response: string, key: string): string {
    const match = response.match(new RegExp(`${key}:\\s*(.+?)(?:\\n|$)`, 'i'));
    return match ? match[1].trim() : '';
  }
}

// Type definitions
interface SearchStrategy {
  success: boolean;
  approach: string;
  searchTerms: string;
  filters: string;
  sourceResponse: string;
}