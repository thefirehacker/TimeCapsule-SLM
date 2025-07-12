/**
 * RAGToolSystem - Enables agents to query VectorStore for contextual information
 * Provides tool calling capabilities for agents to gather knowledge during execution
 */

import { VectorStore, SearchResult } from '../components/VectorStore/VectorStore';
import { AgentCallManager } from './AgentCallManager';

export interface RAGQueryOptions {
  threshold?: number;
  limit?: number;
  agentId: string;
  sessionId: string;
  queryType?: 'context_search' | 'fact_check' | 'example_lookup' | 'reference_gather';
}

export interface RAGQueryResult {
  query: string;
  results: SearchResult[];
  metadata: {
    agentId: string;
    sessionId: string;
    timestamp: Date;
    executionTime: number;
    resultsCount: number;
    averageSimilarity: number;
  };
}

export interface DocumentAnalysis {
  documentIds: string[];
  summary: string;
  keyTopics: string[];
  relevantChunks: SearchResult[];
  metadata: {
    agentId: string;
    sessionId: string;
    timestamp: Date;
    documentsAnalyzed: number;
  };
}

export interface KnowledgeExtraction {
  topic: string;
  relevantInformation: Array<{
    content: string;
    source: string;
    similarity: number;
    documentTitle: string;
  }>;
  synthesizedInsights: string[];
  metadata: {
    agentId: string;
    sessionId: string;
    timestamp: Date;
    sourcesConsulted: number;
  };
}

export class RAGToolSystem {
  private vectorStore: VectorStore;
  private callManager: AgentCallManager;

  constructor(vectorStore: VectorStore, callManager: AgentCallManager) {
    this.vectorStore = vectorStore;
    this.callManager = callManager;
    console.log('🔧 RAGToolSystem initialized with VectorStore and CallManager');
  }

  /**
   * Search knowledge base for context relevant to a query
   */
  async searchKnowledge(
    query: string,
    options: RAGQueryOptions
  ): Promise<RAGQueryResult> {
    console.log(`🔍 RAGToolSystem: Starting knowledge search for agent ${options.agentId}`, {
      query: query.substring(0, 100) + (query.length > 100 ? '...' : ''),
      options
    });

    // Track the call
    const canProceed = await this.callManager.trackCall(
      options.agentId,
      'rag_query',
      { queryType: options.queryType, query: query.substring(0, 200) }
    );

    if (!canProceed) {
      throw new Error('RAG query rejected: Call limit reached or user denied approval');
    }

    const startTime = Date.now();
    
    try {
      // Perform vector search
      const results = await this.vectorStore.searchSimilar(
        query,
        options.threshold || 0.2,
        options.limit || 10,
        {
          agentId: options.agentId,
          sessionId: options.sessionId,
          queryType: 'agent_rag'
        }
      );

      const executionTime = Date.now() - startTime;
      const averageSimilarity = results.length > 0 
        ? results.reduce((sum, r) => sum + r.similarity, 0) / results.length 
        : 0;

      const queryResult: RAGQueryResult = {
        query,
        results,
        metadata: {
          agentId: options.agentId,
          sessionId: options.sessionId,
          timestamp: new Date(),
          executionTime,
          resultsCount: results.length,
          averageSimilarity
        }
      };

      // Update call with completion data
      const callId = `${options.sessionId}_call_${this.callManager.getCurrentCallCount()}`;
      this.callManager.updateCall(callId, {
        duration: executionTime,
        success: true,
        metadata: { ...queryResult.metadata, queryPreview: query.substring(0, 100) }
      });

      console.log(`✅ RAGToolSystem: Knowledge search completed`, {
        agentId: options.agentId,
        resultsCount: results.length,
        executionTime: `${executionTime}ms`,
        averageSimilarity: `${(averageSimilarity * 100).toFixed(1)}%`
      });

      return queryResult;

    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Update call with error data
      const callId = `${options.sessionId}_call_${this.callManager.getCurrentCallCount()}`;
      this.callManager.updateCall(callId, {
        duration: executionTime,
        success: false,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      console.error(`❌ RAGToolSystem: Knowledge search failed for agent ${options.agentId}:`, error);
      throw error;
    }
  }

  /**
   * Analyze specific documents by their IDs
   */
  async analyzeDocuments(
    documentIds: string[],
    options: Omit<RAGQueryOptions, 'threshold' | 'limit'>
  ): Promise<DocumentAnalysis> {
    console.log(`📊 RAGToolSystem: Analyzing documents for agent ${options.agentId}`, {
      documentIds,
      count: documentIds.length
    });

    // Track the call
    const canProceed = await this.callManager.trackCall(
      options.agentId,
      'rag_query',
      { queryType: 'document_analysis', documentIds }
    );

    if (!canProceed) {
      throw new Error('Document analysis rejected: Call limit reached or user denied approval');
    }

    const startTime = Date.now();

    try {
      // Get all documents
      const allDocuments = await this.vectorStore.getAllDocuments();
      const targetDocuments = allDocuments.filter(doc => documentIds.includes(doc.id));

      if (targetDocuments.length === 0) {
        throw new Error(`No documents found with IDs: ${documentIds.join(', ')}`);
      }

      // Extract key topics and content
      const keyTopics: string[] = [];
      const relevantChunks: SearchResult[] = [];
      let combinedContent = '';

      targetDocuments.forEach(doc => {
        // Add document title as key topic
        keyTopics.push(doc.title);
        
        // Get top chunks from each document
        doc.chunks.slice(0, 3).forEach(chunk => {
          relevantChunks.push({
            document: doc,
            chunk,
            similarity: 1.0 // Perfect match since specifically requested
          });
          combinedContent += chunk.content + '\n\n';
        });
      });

      // Create summary from combined content
      const summary = this.generateDocumentSummary(combinedContent, targetDocuments.length);

      const analysis: DocumentAnalysis = {
        documentIds,
        summary,
        keyTopics: [...new Set(keyTopics)], // Remove duplicates
        relevantChunks,
        metadata: {
          agentId: options.agentId,
          sessionId: options.sessionId,
          timestamp: new Date(),
          documentsAnalyzed: targetDocuments.length
        }
      };

      const executionTime = Date.now() - startTime;

      // Update call with completion data
      const callId = `${options.sessionId}_call_${this.callManager.getCurrentCallCount()}`;
      this.callManager.updateCall(callId, {
        duration: executionTime,
        success: true,
        metadata: { documentsAnalyzed: targetDocuments.length, keyTopicsCount: keyTopics.length }
      });

      console.log(`✅ RAGToolSystem: Document analysis completed`, {
        agentId: options.agentId,
        documentsAnalyzed: targetDocuments.length,
        keyTopicsCount: keyTopics.length,
        executionTime: `${executionTime}ms`
      });

      return analysis;

    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Update call with error data
      const callId = `${options.sessionId}_call_${this.callManager.getCurrentCallCount()}`;
      this.callManager.updateCall(callId, {
        duration: executionTime,
        success: false,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      console.error(`❌ RAGToolSystem: Document analysis failed for agent ${options.agentId}:`, error);
      throw error;
    }
  }

  /**
   * Extract relevant information about a specific topic
   */
  async extractRelevantInfo(
    topic: string,
    options: RAGQueryOptions
  ): Promise<KnowledgeExtraction> {
    console.log(`🎯 RAGToolSystem: Extracting information about "${topic}" for agent ${options.agentId}`);

    // Track the call
    const canProceed = await this.callManager.trackCall(
      options.agentId,
      'rag_query',
      { queryType: 'knowledge_extraction', topic }
    );

    if (!canProceed) {
      throw new Error('Knowledge extraction rejected: Call limit reached or user denied approval');
    }

    const startTime = Date.now();

    try {
      // Search for topic-related content
      const searchResult = await this.searchKnowledge(
        `${topic} examples implementation details best practices`,
        options
      );

      // Process results into structured information
      const relevantInformation = searchResult.results.map(result => ({
        content: result.chunk.content,
        source: result.document.metadata?.source || 'unknown',
        similarity: result.similarity,
        documentTitle: result.document.title
      }));

      // Generate synthesized insights
      const synthesizedInsights = this.generateTopicInsights(topic, relevantInformation);

      const extraction: KnowledgeExtraction = {
        topic,
        relevantInformation,
        synthesizedInsights,
        metadata: {
          agentId: options.agentId,
          sessionId: options.sessionId,
          timestamp: new Date(),
          sourcesConsulted: relevantInformation.length
        }
      };

      const executionTime = Date.now() - startTime;

      console.log(`✅ RAGToolSystem: Knowledge extraction completed`, {
        agentId: options.agentId,
        topic,
        sourcesConsulted: relevantInformation.length,
        insightsGenerated: synthesizedInsights.length,
        executionTime: `${executionTime}ms`
      });

      return extraction;

    } catch (error) {
      const executionTime = Date.now() - startTime;
      console.error(`❌ RAGToolSystem: Knowledge extraction failed for agent ${options.agentId}:`, error);
      throw error;
    }
  }

  /**
   * Get summary of available knowledge base for planning
   */
  async getKnowledgeBaseSummary(options: Omit<RAGQueryOptions, 'threshold' | 'limit'>): Promise<{
    totalDocuments: number;
    documentTypes: Record<string, number>;
    keyTopics: string[];
    recentDocuments: Array<{ title: string; id: string; addedAt: Date }>;
  }> {
    console.log(`📋 RAGToolSystem: Getting knowledge base summary for agent ${options.agentId}`);

    const documents = await this.vectorStore.getAllDocuments();
    const documentTypes: Record<string, number> = {};
    const keyTopics: string[] = [];
    const recentDocuments = documents
      .sort((a, b) => new Date(b.metadata?.uploadedAt || 0).getTime() - new Date(a.metadata?.uploadedAt || 0).getTime())
      .slice(0, 10)
      .map(doc => ({
        title: doc.title,
        id: doc.id,
        addedAt: new Date(doc.metadata?.uploadedAt || Date.now())
      }));

    // Categorize documents
    documents.forEach(doc => {
      const source = doc.metadata?.source || 'unknown';
      documentTypes[source] = (documentTypes[source] || 0) + 1;
      
      // Extract key topics from titles
      const titleWords = doc.title.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3)
        .slice(0, 2);
      keyTopics.push(...titleWords);
    });

    return {
      totalDocuments: documents.length,
      documentTypes,
      keyTopics: [...new Set(keyTopics)].slice(0, 20), // Top 20 unique topics
      recentDocuments
    };
  }

  /**
   * Generate document summary from combined content
   */
  private generateDocumentSummary(content: string, documentCount: number): string {
    const words = content.split(/\s+/).length;
    const preview = content.substring(0, 300);
    
    return `Analysis of ${documentCount} document${documentCount > 1 ? 's' : ''} containing approximately ${words} words. Preview: ${preview}${content.length > 300 ? '...' : ''}`;
  }

  /**
   * Generate insights about a specific topic
   */
  private generateTopicInsights(topic: string, information: Array<{ content: string; similarity: number }>): string[] {
    const insights: string[] = [];
    
    // Insight 1: Coverage analysis
    const highRelevanceCount = information.filter(info => info.similarity > 0.7).length;
    insights.push(`Found ${highRelevanceCount} highly relevant sources (>70% similarity) for "${topic}"`);
    
    // Insight 2: Content type analysis
    const hasCodeExamples = information.some(info => 
      info.content.includes('```') || info.content.includes('function') || info.content.includes('class')
    );
    if (hasCodeExamples) {
      insights.push(`Includes practical code examples and implementations`);
    }
    
    // Insight 3: Depth analysis
    const totalContent = information.reduce((sum, info) => sum + info.content.length, 0);
    if (totalContent > 5000) {
      insights.push(`Comprehensive coverage with detailed explanations (${Math.round(totalContent/1000)}k+ characters)`);
    } else if (totalContent > 1000) {
      insights.push(`Moderate coverage with essential information`);
    } else {
      insights.push(`Limited coverage - may need additional sources`);
    }
    
    return insights;
  }

  /**
   * Get tool usage statistics
   */
  getToolStats(sessionId: string): {
    totalQueries: number;
    queriesByType: Record<string, number>;
    averageExecutionTime: number;
    successRate: number;
  } {
    const callStats = this.callManager.getCallStats(sessionId);
    const ragQueries = callStats.callsByType.rag_query || 0;
    
    return {
      totalQueries: ragQueries,
      queriesByType: callStats.callsByType,
      averageExecutionTime: callStats.averageDuration,
      successRate: ragQueries > 0 ? 1.0 : 0.0 // Simplified for now
    };
  }
} 