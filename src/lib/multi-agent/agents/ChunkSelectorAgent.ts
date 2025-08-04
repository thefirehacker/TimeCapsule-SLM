/**
 * Chunk Selector Agent
 * 
 * Filters chunks based on DataInspector's document analysis.
 * Uses AI intelligence to select only relevant chunks for processing,
 * implementing Claude Code/Cursor style targeted data processing.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, ChunkData } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

export class ChunkSelectorAgent extends BaseAgent {
  readonly name = 'ChunkSelector';
  readonly description = 'Filters chunks based on document relevance analysis';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🔍 ChunkSelector: Filtering ${context.ragResults.chunks.length} chunks based on DataInspector analysis`);
    
    if (context.ragResults.chunks.length === 0) {
      this.setReasoning('No chunks to filter');
      return context;
    }
    
    // Use DataInspector's shared knowledge for intelligent filtering
    await this.filterChunksIntelligently(context);
    
    return context;
  }
  
  private async filterChunksIntelligently(context: ResearchContext): Promise<void> {
    const documentInsights = context.sharedKnowledge.documentInsights;
    const hasDocumentAnalysis = documentInsights && Object.keys(documentInsights).length > 0;
    
    if (!hasDocumentAnalysis) {
      console.log(`⚠️ No DataInspector analysis available, using basic filtering`);
      await this.basicChunkFiltering(context);
      return;
    }
    
    console.log(`🧠 Using DataInspector analysis for intelligent chunk filtering`);
    console.log(`📋 Document analysis: ${documentInsights.documentType}, Content areas: ${documentInsights.contentAreas?.join(', ')}`);
    
    // Create intelligent filtering prompt based on DataInspector's analysis
    const filteringPrompt = `Based on the document analysis, filter chunks intelligently.

USER QUERY: "${context.query}"

DATAINSPECTOR ANALYSIS:
- Document Type: ${documentInsights.documentType}
- Content Areas: ${documentInsights.contentAreas?.join(', ')}
- Query Intent: ${documentInsights.queryIntent}
- Extraction Strategy: ${documentInsights.extractionStrategy}

AVAILABLE CHUNKS: ${context.ragResults.chunks.length} total chunks from multiple documents

TASK: Identify which chunks are MOST RELEVANT to the user's query based on the document analysis.

Look for chunks that:
1. Come from the document type identified as relevant
2. Contain content areas mentioned in the analysis
3. Match the query intent and extraction strategy

Respond with "RELEVANT" or "NOT_RELEVANT" for chunk filtering criteria.

CRITERIA FOR THIS QUERY:`;

    try {
      const response = await this.llm(filteringPrompt);
      console.log(`🤖 Chunk filtering criteria:`, response.substring(0, 300));
      
      // Apply intelligent filtering based on LLM analysis
      const filteredChunks = await this.applyIntelligentFiltering(context, response);
      
      // Update context with filtered chunks
      const originalCount = context.ragResults.chunks.length;
      context.ragResults.chunks = filteredChunks;
      
      // Store filtering insights in shared knowledge
      context.sharedKnowledge.discoveredPatterns.chunkFiltering = {
        originalChunkCount: originalCount,
        filteredChunkCount: filteredChunks.length,
        filteringCriteria: response,
        reductionPercentage: Math.round((1 - filteredChunks.length / originalCount) * 100),
        timestamp: Date.now(),
        agentSource: 'ChunkSelector'
      };
      
      this.setReasoning(`Filtered ${originalCount} chunks to ${filteredChunks.length} relevant chunks (${Math.round((1 - filteredChunks.length / originalCount) * 100)}% reduction) based on DataInspector analysis: ${documentInsights.documentType} document with focus on ${documentInsights.contentAreas?.join(', ')}`);
      
      console.log(`✅ Intelligent filtering: ${originalCount} → ${filteredChunks.length} chunks (${Math.round((1 - filteredChunks.length / originalCount) * 100)}% reduction)`);
      
    } catch (error) {
      console.error('❌ Intelligent chunk filtering failed:', error);
      await this.basicChunkFiltering(context);
    }
  }
  
  private async applyIntelligentFiltering(context: ResearchContext, filteringCriteria: string): Promise<ChunkData[]> {
    const documentInsights = context.sharedKnowledge.documentInsights;
    const filteredChunks: ChunkData[] = [];
    
    // Extract document-based filtering rules
    const shouldFocusOnSpecificDocument = filteringCriteria.toLowerCase().includes('focus') || 
                                         filteringCriteria.toLowerCase().includes('relevant document');
    
    for (const chunk of context.ragResults.chunks) {
      let isRelevant = false;
      
      // Rule 1: Document type relevance
      if (documentInsights.documentType && chunk.sourceDocument) {
        // If analysis says "focus on blog" and chunk is from blog, it's relevant
        if (documentInsights.documentType.toLowerCase().includes('blog') && 
            chunk.sourceDocument.toLowerCase().includes('blog')) {
          isRelevant = true;
        }
        
        // If analysis says "focus on CV/resume" and chunk is from resume, it's relevant  
        if (documentInsights.documentType.toLowerCase().includes('resume') && 
            chunk.sourceDocument.toLowerCase().includes('resume')) {
          isRelevant = true;
        }
      }
      
      // Rule 2: Content area matching
      if (documentInsights.contentAreas) {
        for (const contentArea of documentInsights.contentAreas) {
          if (chunk.text.toLowerCase().includes(contentArea.toLowerCase())) {
            isRelevant = true;
            break;
          }
        }
      }
      
      // Rule 3: Semantic similarity to query
      const queryKeywords = context.query.toLowerCase().split(' ');
      const matchingKeywords = queryKeywords.filter(keyword => 
        chunk.text.toLowerCase().includes(keyword)
      );
      
      if (matchingKeywords.length >= 2) { // At least 2 query keywords present
        isRelevant = true;
      }
      
      // Rule 4: High similarity score (if available)
      if (chunk.similarity && chunk.similarity > 0.3) {
        isRelevant = true;
      }
      
      if (isRelevant) {
        filteredChunks.push(chunk);
      }
    }
    
    // Ensure we have at least some chunks (fallback safety)
    if (filteredChunks.length === 0) {
      console.log(`⚠️ No chunks passed filtering, falling back to top similarity chunks`);
      return context.ragResults.chunks
        .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
        .slice(0, 20); // Top 20 by similarity
    }
    
    // Limit to reasonable number for processing efficiency
    return filteredChunks.slice(0, 25);
  }
  
  private async basicChunkFiltering(context: ResearchContext): Promise<void> {
    // Fallback: Simple similarity-based filtering
    const originalCount = context.ragResults.chunks.length;
    
    const filteredChunks = context.ragResults.chunks
      .filter(chunk => chunk.similarity && chunk.similarity > 0.1) // Basic relevance threshold
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0)) // Sort by similarity
      .slice(0, 20); // Limit to top 20
    
    context.ragResults.chunks = filteredChunks;
    
    this.setReasoning(`Applied basic similarity filtering: ${originalCount} → ${filteredChunks.length} chunks (${Math.round((1 - filteredChunks.length / originalCount) * 100)}% reduction)`);
    
    console.log(`✅ Basic filtering: ${originalCount} → ${filteredChunks.length} chunks`);
  }
}