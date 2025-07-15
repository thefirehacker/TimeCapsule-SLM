// RAG (Retrieval-Augmented Generation) Query Tracking Interfaces

export interface RAGDocument {
  id: string;
  title: string;
  similarity: number;
  chunkContent: string;
  chunkIndex: number;
  source: string;
  metadata: {
    filename?: string;
    filetype?: string;
    uploadedAt?: string;
    filesize?: number;
    description?: string;
    [key: string]: any;
  };
  retrievalContext?: {
    queryId: string;
    retrievalTime: number;
    processingTime: number;
  };
}

export interface RAGQuery {
  id: string;
  timestamp: Date;
  queryText: string;
  agentId?: string;
  sessionId?: string;
  resultsCount: number;
  averageSimilarity: number;
  maxSimilarity: number;
  minSimilarity: number;
  responseTime: number; // milliseconds
  success: boolean;
  documents: RAGDocument[];
  searchParameters: {
    threshold: number;
    limit: number;
    searchMethod: 'semantic' | 'keyword' | 'hybrid';
  };
  queryType: 'user_search' | 'agent_rag' | 'auto_enrichment';
  errorMessage?: string;
}

export interface RAGStats {
  totalQueries: number;
  successfulQueries: number;
  averageResponseTime: number;
  averageSimilarity: number;
  documentHitRate: number; // percentage of queries that found relevant documents
  topDocuments: {
    id: string;
    title: string;
    hitCount: number;
    averageSimilarity: number;
  }[];
  queryPatterns: {
    pattern: string;
    frequency: number;
    averageSuccess: number;
  }[];
  performanceMetrics: {
    fastQueries: number; // < 100ms
    mediumQueries: number; // 100-500ms
    slowQueries: number; // > 500ms
    timeoutQueries: number;
  };
}

export interface RAGSessionStats {
  sessionId: string;
  agentId: string;
  queries: RAGQuery[];
  totalQueries: number;
  successfulQueries: number;
  averageResponseTime: number;
  averageSimilarity: number;
  documentsRetrieved: number;
  uniqueDocuments: number;
  coverageScore: number; // how well RAG covered the query space
}

export interface RAGPerformanceMetrics {
  timestamp: Date;
  queryId: string;
  stages: {
    vectorization: number; // time to vectorize query
    similarity: number; // time to compute similarities
    retrieval: number; // time to retrieve documents
    ranking: number; // time to rank and filter results
    formatting: number; // time to format response
  };
  memoryUsage?: number;
  vectorDimensions?: number;
  indexSize?: number;
  cacheHitRate?: number;
}

export interface RAGQualityMetrics {
  queryId: string;
  relevanceScore: number; // 0-1, how relevant were the retrieved documents
  diversityScore: number; // 0-1, how diverse were the document sources
  completenessScore: number; // 0-1, how completely did RAG address the query
  userFeedback?: {
    rating: number; // 1-5 stars
    helpful: boolean;
    feedback: string;
  };
  automaticMetrics: {
    semanticCoherence: number;
    topicalCoverage: number;
    informationDensity: number;
  };
}

export interface RAGVisualizationData {
  queryFlow: {
    queryId: string;
    queryText: string;
    timestamp: Date;
    agentId?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number; // 0-100
    stages: {
      name: string;
      status: 'pending' | 'processing' | 'completed' | 'failed';
      duration?: number;
      details?: string;
    }[];
  }[];
  
  documentNetwork: {
    nodes: {
      id: string;
      title: string;
      type: 'query' | 'document' | 'chunk';
      size: number; // relevance/importance
      color: string; // category/type
    }[];
    edges: {
      source: string;
      target: string;
      weight: number; // similarity score
      type: 'retrieval' | 'reference' | 'similarity';
    }[];
  };
  
  timelineData: {
    timestamp: Date;
    queryCount: number;
    averageLatency: number;
    successRate: number;
    documentsRetrieved: number;
  }[];
}

export interface RAGConfigurationOptions {
  enableTracking: boolean;
  enableVisualization: boolean;
  enablePerformanceMetrics: boolean;
  enableQualityMetrics: boolean;
  maxQueryHistory: number;
  trackingLevel: 'basic' | 'detailed' | 'comprehensive';
  realTimeUpdates: boolean;
  persistToKnowledgeBase: boolean;
  privacyMode: boolean; // anonymize query content
  retention: {
    queries: number; // days
    metrics: number; // days
    logs: number; // days
  };
}

// Utility types for RAG analytics
export type RAGQueryStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'timeout';

export type RAGAnalyticsTimeframe = 'hour' | 'day' | 'week' | 'month' | 'all';

export interface RAGAnalyticsQuery {
  timeframe: RAGAnalyticsTimeframe;
  agentId?: string;
  sessionId?: string;
  queryType?: RAGQuery['queryType'];
  minSimilarity?: number;
  maxResponseTime?: number;
}

export interface RAGTrendData {
  timeframe: RAGAnalyticsTimeframe;
  dataPoints: {
    timestamp: Date;
    queryVolume: number;
    successRate: number;
    averageLatency: number;
    averageSimilarity: number;
    uniqueDocuments: number;
    popularQueries: string[];
  }[];
  summary: {
    totalQueries: number;
    overallSuccessRate: number;
    averageLatency: number;
    mostActiveAgent: string;
    topPerformingQueries: string[];
    identifiedIssues: string[];
    recommendations: string[];
  };
}

// Event interfaces for real-time updates
export interface RAGQueryEvent {
  type: 'query_started' | 'query_completed' | 'query_failed' | 'documents_retrieved';
  query: RAGQuery;
  timestamp: Date;
  additionalData?: any;
}

export interface RAGSystemHealth {
  status: 'healthy' | 'degraded' | 'critical' | 'unknown';
  lastCheck: Date;
  metrics: {
    queryLatency: {
      current: number;
      average: number;
      p95: number;
      p99: number;
    };
    successRate: {
      current: number;
      target: number;
      trend: 'improving' | 'stable' | 'declining';
    };
    indexHealth: {
      size: number;
      lastUpdate: Date;
      corruptionCheck: 'passed' | 'failed' | 'pending';
    };
    memoryUsage: {
      current: number;
      limit: number;
      warningThreshold: number;
    };
  };
  alerts: {
    level: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: Date;
    resolved: boolean;
  }[];
}

// Helper functions type definitions
export interface RAGTracker {
  startQuery(queryText: string, options: Partial<RAGQuery>): string; // returns queryId
  completeQuery(queryId: string, results: RAGDocument[], responseTime: number): void;
  failQuery(queryId: string, error: string): void;
  getQueryById(queryId: string): RAGQuery | null;
  getQueriesByAgent(agentId: string): RAGQuery[];
  getQueriesBySession(sessionId: string): RAGQuery[];
  getStats(timeframe?: RAGAnalyticsTimeframe): RAGStats;
  getSessionStats(sessionId: string): RAGSessionStats | null;
  getTrendData(query: RAGAnalyticsQuery): RAGTrendData;
  getVisualizationData(sessionId?: string): RAGVisualizationData;
  clearHistory(olderThan?: Date): number; // returns number of deleted records
  exportData(format: 'json' | 'csv'): string;
  importData(data: string, format: 'json' | 'csv'): boolean;
}

// Configuration defaults
export const DEFAULT_RAG_CONFIG: RAGConfigurationOptions = {
  enableTracking: true,
  enableVisualization: true,
  enablePerformanceMetrics: true,
  enableQualityMetrics: false, // requires user feedback
  maxQueryHistory: 1000,
  trackingLevel: 'detailed',
  realTimeUpdates: true,
  persistToKnowledgeBase: true,
  privacyMode: false,
  retention: {
    queries: 30,
    metrics: 90,
    logs: 7
  }
}; 