import {
  RAGQuery,
  RAGDocument,
  RAGStats,
  RAGSessionStats,
  RAGPerformanceMetrics,
  RAGVisualizationData,
  RAGAnalyticsTimeframe,
  RAGAnalyticsQuery,
  RAGTrendData,
  RAGTracker,
  RAGConfigurationOptions,
  DEFAULT_RAG_CONFIG,
  RAGQueryEvent
} from '../types/rag';

export class RAGTrackerImpl implements RAGTracker {
  private queries: Map<string, RAGQuery> = new Map();
  private sessions: Map<string, RAGSessionStats> = new Map();
  private config: RAGConfigurationOptions;
  private eventListeners: Set<(event: RAGQueryEvent) => void> = new Set();
  private performanceMetrics: Map<string, RAGPerformanceMetrics> = new Map();

  constructor(config: Partial<RAGConfigurationOptions> = {}) {
    this.config = { ...DEFAULT_RAG_CONFIG, ...config };
    console.log('🔍 RAG Tracker initialized with config:', this.config);
    
    // Set up periodic cleanup
    this.setupPeriodicCleanup();
  }

  // Core tracking methods
  startQuery(queryText: string, options: Partial<RAGQuery> = {}): string {
    const queryId = `rag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const query: RAGQuery = {
      id: queryId,
      timestamp: new Date(),
      queryText: this.config.privacyMode ? this.anonymizeQuery(queryText) : queryText,
      agentId: options.agentId,
      sessionId: options.sessionId,
      resultsCount: 0,
      averageSimilarity: 0,
      maxSimilarity: 0,
      minSimilarity: 0,
      responseTime: 0,
      success: false,
      documents: [],
      searchParameters: {
        threshold: options.searchParameters?.threshold || 0.3,
        limit: options.searchParameters?.limit || 10,
        searchMethod: options.searchParameters?.searchMethod || 'semantic'
      },
      queryType: options.queryType || 'user_search'
    };

    this.queries.set(queryId, query);
    
    // Track session if provided
    if (query.sessionId && query.agentId) {
      this.trackSessionQuery(query.sessionId, query.agentId, query);
    }

    // Emit event
    this.emitEvent({
      type: 'query_started',
      query,
      timestamp: new Date()
    });

    console.log(`🔍 RAG Query started: ${queryId} - "${queryText.substring(0, 50)}..."`);
    return queryId;
  }

  completeQuery(queryId: string, results: RAGDocument[], responseTime: number): void {
    const query = this.queries.get(queryId);
    if (!query) {
      console.warn(`⚠️ RAG Query not found: ${queryId}`);
      return;
    }

    // Calculate similarity metrics
    const similarities = results.map(r => r.similarity);
    const avgSimilarity = similarities.length > 0 ? 
      similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length : 0;
    const maxSimilarity = similarities.length > 0 ? Math.max(...similarities) : 0;
    const minSimilarity = similarities.length > 0 ? Math.min(...similarities) : 0;

    // Update query with results
    query.resultsCount = results.length;
    query.averageSimilarity = avgSimilarity;
    query.maxSimilarity = maxSimilarity;
    query.minSimilarity = minSimilarity;
    query.responseTime = responseTime;
    query.success = true;
    query.documents = results.map(result => ({
      ...result,
      retrievalContext: {
        queryId,
        retrievalTime: responseTime,
        processingTime: Date.now() - query.timestamp.getTime()
      }
    }));

    this.queries.set(queryId, query);

    // Update session stats
    if (query.sessionId && query.agentId) {
      this.updateSessionStats(query.sessionId, query.agentId, query);
    }

    // Emit event
    this.emitEvent({
      type: 'query_completed',
      query,
      timestamp: new Date(),
      additionalData: { resultsCount: results.length, avgSimilarity }
    });

    console.log(`✅ RAG Query completed: ${queryId} - ${results.length} results, avg similarity: ${avgSimilarity.toFixed(3)}, ${responseTime}ms`);

    // Cleanup old queries if needed
    this.enforceQueryLimit();
  }

  failQuery(queryId: string, error: string): void {
    const query = this.queries.get(queryId);
    if (!query) {
      console.warn(`⚠️ RAG Query not found: ${queryId}`);
      return;
    }

    query.success = false;
    query.errorMessage = error;
    query.responseTime = Date.now() - query.timestamp.getTime();
    this.queries.set(queryId, query);

    // Update session stats
    if (query.sessionId && query.agentId) {
      this.updateSessionStats(query.sessionId, query.agentId, query);
    }

    // Emit event
    this.emitEvent({
      type: 'query_failed',
      query,
      timestamp: new Date(),
      additionalData: { error }
    });

    console.error(`❌ RAG Query failed: ${queryId} - ${error}`);
  }

  // Query retrieval methods
  getQueryById(queryId: string): RAGQuery | null {
    return this.queries.get(queryId) || null;
  }

  getQueriesByAgent(agentId: string): RAGQuery[] {
    return Array.from(this.queries.values())
      .filter(query => query.agentId === agentId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getQueriesBySession(sessionId: string): RAGQuery[] {
    return Array.from(this.queries.values())
      .filter(query => query.sessionId === sessionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Analytics methods
  getStats(timeframe: RAGAnalyticsTimeframe = 'all'): RAGStats {
    const queries = this.getQueriesInTimeframe(timeframe);
    const successfulQueries = queries.filter(q => q.success);
    
    if (queries.length === 0) {
      return this.getEmptyStats();
    }

    const avgResponseTime = queries.reduce((sum, q) => sum + q.responseTime, 0) / queries.length;
    const avgSimilarity = successfulQueries.length > 0 ?
      successfulQueries.reduce((sum, q) => sum + q.averageSimilarity, 0) / successfulQueries.length : 0;
    
    const documentHitRate = (successfulQueries.filter(q => q.resultsCount > 0).length / queries.length) * 100;

    // Calculate top documents
    const documentHits = new Map<string, { title: string; hitCount: number; similarities: number[] }>();
    successfulQueries.forEach(query => {
      query.documents.forEach(doc => {
        const existing = documentHits.get(doc.id);
        if (existing) {
          existing.hitCount++;
          existing.similarities.push(doc.similarity);
        } else {
          documentHits.set(doc.id, {
            title: doc.title,
            hitCount: 1,
            similarities: [doc.similarity]
          });
        }
      });
    });

    const topDocuments = Array.from(documentHits.entries())
      .map(([id, data]) => ({
        id,
        title: data.title,
        hitCount: data.hitCount,
        averageSimilarity: data.similarities.reduce((sum, sim) => sum + sim, 0) / data.similarities.length
      }))
      .sort((a, b) => b.hitCount - a.hitCount)
      .slice(0, 10);

    // Calculate query patterns
    const queryPatterns = this.analyzeQueryPatterns(queries);

    // Calculate performance metrics
    const performanceMetrics = {
      fastQueries: queries.filter(q => q.responseTime < 100).length,
      mediumQueries: queries.filter(q => q.responseTime >= 100 && q.responseTime <= 500).length,
      slowQueries: queries.filter(q => q.responseTime > 500).length,
      timeoutQueries: queries.filter(q => !q.success && q.errorMessage?.includes('timeout')).length
    };

    return {
      totalQueries: queries.length,
      successfulQueries: successfulQueries.length,
      averageResponseTime: avgResponseTime,
      averageSimilarity: avgSimilarity,
      documentHitRate,
      topDocuments,
      queryPatterns,
      performanceMetrics
    };
  }

  getSessionStats(sessionId: string): RAGSessionStats | null {
    return this.sessions.get(sessionId) || null;
  }

  getTrendData(query: RAGAnalyticsQuery): RAGTrendData {
    const queries = this.getQueriesInTimeframe(query.timeframe);
    const filteredQueries = this.applyAnalyticsFilters(queries, query);

    // Group queries by time intervals
    const timeIntervals = this.groupQueriesByTimeInterval(filteredQueries, query.timeframe);
    
    const dataPoints = timeIntervals.map(interval => ({
      timestamp: interval.timestamp,
      queryVolume: interval.queries.length,
      successRate: interval.queries.length > 0 ? 
        (interval.queries.filter((q: RAGQuery) => q.success).length / interval.queries.length) * 100 : 0,
      averageLatency: interval.queries.length > 0 ?
        interval.queries.reduce((sum: number, q: RAGQuery) => sum + q.responseTime, 0) / interval.queries.length : 0,
      averageSimilarity: interval.queries.length > 0 ?
        interval.queries.filter((q: RAGQuery) => q.success).reduce((sum: number, q: RAGQuery) => sum + q.averageSimilarity, 0) / 
        Math.max(1, interval.queries.filter((q: RAGQuery) => q.success).length) : 0,
      uniqueDocuments: new Set(interval.queries.flatMap((q: RAGQuery) => q.documents.map((d: RAGDocument) => d.id))).size,
      popularQueries: this.getPopularQueries(interval.queries, 3)
    }));

    const summary = this.generateTrendSummary(filteredQueries, query);

    return {
      timeframe: query.timeframe,
      dataPoints,
      summary
    };
  }

  getVisualizationData(sessionId?: string): RAGVisualizationData {
    const relevantQueries = sessionId ? 
      this.getQueriesBySession(sessionId) : 
      Array.from(this.queries.values()).slice(-50); // Last 50 queries

    // Generate query flow data
    const queryFlow = relevantQueries.map(query => ({
      queryId: query.id,
      queryText: query.queryText,
      timestamp: query.timestamp,
      agentId: query.agentId,
      status: query.success ? 'completed' as const : 'failed' as const,
      progress: 100,
      stages: [
        {
          name: 'Query Processing',
          status: 'completed' as const,
          duration: Math.round(query.responseTime * 0.2),
          details: `Processed "${query.queryText.substring(0, 30)}..."`
        },
        {
          name: 'Vector Search',
          status: 'completed' as const,
          duration: Math.round(query.responseTime * 0.6),
          details: `Found ${query.resultsCount} documents`
        },
        {
          name: 'Result Ranking',
          status: 'completed' as const,
          duration: Math.round(query.responseTime * 0.2),
          details: `Avg similarity: ${query.averageSimilarity.toFixed(3)}`
        }
      ]
    }));

    // Generate document network
    const nodes = new Map<string, any>();
    const edges: any[] = [];

    relevantQueries.forEach(query => {
      // Add query node
      nodes.set(query.id, {
        id: query.id,
        title: query.queryText.substring(0, 30) + '...',
        type: 'query',
        size: Math.min(query.resultsCount * 2 + 5, 20),
        color: query.success ? '#4CAF50' : '#F44336'
      });

      // Add document nodes and edges
      query.documents.forEach(doc => {
        if (!nodes.has(doc.id)) {
          nodes.set(doc.id, {
            id: doc.id,
            title: doc.title.substring(0, 20) + '...',
            type: 'document',
            size: 8,
            color: '#2196F3'
          });
        }

        edges.push({
          source: query.id,
          target: doc.id,
          weight: doc.similarity,
          type: 'retrieval'
        });
      });
    });

    // Generate timeline data
    const timelineData = this.generateTimelineData(relevantQueries);

    return {
      queryFlow,
      documentNetwork: {
        nodes: Array.from(nodes.values()),
        edges
      },
      timelineData
    };
  }

  // Utility methods
  clearHistory(olderThan?: Date): number {
    const cutoffDate = olderThan || new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    let deletedCount = 0;

    for (const [queryId, query] of this.queries) {
      if (query.timestamp < cutoffDate) {
        this.queries.delete(queryId);
        deletedCount++;
      }
    }

    console.log(`🧹 RAG Tracker cleared ${deletedCount} old queries`);
    return deletedCount;
  }

  exportData(format: 'json' | 'csv'): string {
    const queries = Array.from(this.queries.values());
    
    if (format === 'json') {
      return JSON.stringify({
        queries,
        sessions: Array.from(this.sessions.values()),
        exportedAt: new Date().toISOString(),
        config: this.config
      }, null, 2);
    } else {
      // CSV format
      const headers = [
        'ID', 'Timestamp', 'Query Text', 'Agent ID', 'Session ID', 
        'Results Count', 'Avg Similarity', 'Response Time', 'Success'
      ];
      
      const rows = queries.map(q => [
        q.id,
        q.timestamp.toISOString(),
        q.queryText.replace(/"/g, '""'), // Escape quotes
        q.agentId || '',
        q.sessionId || '',
        q.resultsCount,
        q.averageSimilarity.toFixed(3),
        q.responseTime,
        q.success
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
  }

  importData(data: string, format: 'json' | 'csv'): boolean {
    try {
      if (format === 'json') {
        const imported = JSON.parse(data);
        
        if (imported.queries && Array.isArray(imported.queries)) {
          imported.queries.forEach((query: RAGQuery) => {
            // Convert timestamp string back to Date object
            query.timestamp = new Date(query.timestamp);
            this.queries.set(query.id, query);
          });
        }

        if (imported.sessions && Array.isArray(imported.sessions)) {
          imported.sessions.forEach((session: RAGSessionStats) => {
            this.sessions.set(session.sessionId, session);
          });
        }

        console.log(`📥 RAG Tracker imported ${imported.queries?.length || 0} queries`);
        return true;
      } else {
        // CSV import would be more complex - implement if needed
        console.warn('📥 CSV import not yet implemented');
        return false;
      }
    } catch (error) {
      console.error('❌ RAG Tracker import failed:', error);
      return false;
    }
  }

  // Event handling
  addEventListener(listener: (event: RAGQueryEvent) => void): void {
    this.eventListeners.add(listener);
  }

  removeEventListener(listener: (event: RAGQueryEvent) => void): void {
    this.eventListeners.delete(listener);
  }

  private emitEvent(event: RAGQueryEvent): void {
    if (this.config.realTimeUpdates) {
      this.eventListeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error('RAG Event listener error:', error);
        }
      });
    }
  }

  // Private helper methods
  private trackSessionQuery(sessionId: string, agentId: string, query: RAGQuery): void {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        agentId,
        queries: [],
        totalQueries: 0,
        successfulQueries: 0,
        averageResponseTime: 0,
        averageSimilarity: 0,
        documentsRetrieved: 0,
        uniqueDocuments: 0,
        coverageScore: 0
      };
      this.sessions.set(sessionId, session);
    }

    session.queries.push(query);
  }

  private updateSessionStats(sessionId: string, agentId: string, query: RAGQuery): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const queries = session.queries;
    const successfulQueries = queries.filter(q => q.success);

    session.totalQueries = queries.length;
    session.successfulQueries = successfulQueries.length;
    session.averageResponseTime = queries.reduce((sum, q) => sum + q.responseTime, 0) / queries.length;
    session.averageSimilarity = successfulQueries.length > 0 ?
      successfulQueries.reduce((sum, q) => sum + q.averageSimilarity, 0) / successfulQueries.length : 0;
    session.documentsRetrieved = queries.reduce((sum, q) => sum + q.resultsCount, 0);
    session.uniqueDocuments = new Set(queries.flatMap(q => q.documents.map(d => d.id))).size;
    session.coverageScore = this.calculateCoverageScore(queries);

    this.sessions.set(sessionId, session);
  }

  private anonymizeQuery(queryText: string): string {
    // Simple anonymization - replace potentially sensitive words
    return queryText
      .replace(/\b\d{4,}\b/g, '[NUMBER]') // Replace long numbers
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]') // Replace emails
      .replace(/\bhttps?:\/\/[^\s]+/g, '[URL]'); // Replace URLs
  }

  private getQueriesInTimeframe(timeframe: RAGAnalyticsTimeframe): RAGQuery[] {
    if (timeframe === 'all') {
      return Array.from(this.queries.values());
    }

    const now = new Date();
    const cutoffTime = new Date();

    switch (timeframe) {
      case 'hour':
        cutoffTime.setHours(now.getHours() - 1);
        break;
      case 'day':
        cutoffTime.setDate(now.getDate() - 1);
        break;
      case 'week':
        cutoffTime.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffTime.setMonth(now.getMonth() - 1);
        break;
    }

    return Array.from(this.queries.values())
      .filter(query => query.timestamp >= cutoffTime);
  }

  private applyAnalyticsFilters(queries: RAGQuery[], filters: RAGAnalyticsQuery): RAGQuery[] {
    return queries.filter(query => {
      if (filters.agentId && query.agentId !== filters.agentId) return false;
      if (filters.sessionId && query.sessionId !== filters.sessionId) return false;
      if (filters.queryType && query.queryType !== filters.queryType) return false;
      if (filters.minSimilarity && query.averageSimilarity < filters.minSimilarity) return false;
      if (filters.maxResponseTime && query.responseTime > filters.maxResponseTime) return false;
      return true;
    });
  }

  private groupQueriesByTimeInterval(queries: RAGQuery[], timeframe: RAGAnalyticsTimeframe): any[] {
    // Implementation would group queries into time buckets based on timeframe
    // For now, return a simple grouping
    const intervals: any[] = [];
    const sortedQueries = queries.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // Group by hour for simplicity
    const groups = new Map<string, RAGQuery[]>();
    sortedQueries.forEach(query => {
      const hourKey = new Date(query.timestamp).toISOString().substring(0, 13);
      if (!groups.has(hourKey)) {
        groups.set(hourKey, []);
      }
      groups.get(hourKey)!.push(query);
    });

    groups.forEach((queries, hourKey) => {
      intervals.push({
        timestamp: new Date(hourKey + ':00:00.000Z'),
        queries
      });
    });

    return intervals;
  }

  private generateTrendSummary(queries: RAGQuery[], query: RAGAnalyticsQuery): any {
    const successfulQueries = queries.filter(q => q.success);
    
    return {
      totalQueries: queries.length,
      overallSuccessRate: queries.length > 0 ? (successfulQueries.length / queries.length) * 100 : 0,
      averageLatency: queries.length > 0 ? 
        queries.reduce((sum, q) => sum + q.responseTime, 0) / queries.length : 0,
      mostActiveAgent: this.getMostActiveAgent(queries),
      topPerformingQueries: this.getTopPerformingQueries(queries, 5),
      identifiedIssues: this.identifyIssues(queries),
      recommendations: this.generateRecommendations(queries)
    };
  }

  private getMostActiveAgent(queries: RAGQuery[]): string {
    const agentCounts = new Map<string, number>();
    queries.forEach(query => {
      if (query.agentId) {
        agentCounts.set(query.agentId, (agentCounts.get(query.agentId) || 0) + 1);
      }
    });

    let mostActive = '';
    let maxCount = 0;
    agentCounts.forEach((count, agentId) => {
      if (count > maxCount) {
        maxCount = count;
        mostActive = agentId;
      }
    });

    return mostActive;
  }

  private getTopPerformingQueries(queries: RAGQuery[], limit: number): string[] {
    return queries
      .filter(q => q.success)
      .sort((a, b) => b.averageSimilarity - a.averageSimilarity)
      .slice(0, limit)
      .map(q => q.queryText.substring(0, 50) + '...');
  }

  private identifyIssues(queries: RAGQuery[]): string[] {
    const issues: string[] = [];
    const failureRate = (queries.filter(q => !q.success).length / queries.length) * 100;
    
    if (failureRate > 10) {
      issues.push(`High failure rate: ${failureRate.toFixed(1)}%`);
    }

    const avgResponseTime = queries.reduce((sum, q) => sum + q.responseTime, 0) / queries.length;
    if (avgResponseTime > 1000) {
      issues.push(`Slow response times: ${avgResponseTime.toFixed(0)}ms average`);
    }

    const lowSimilarityQueries = queries.filter(q => q.success && q.averageSimilarity < 0.3).length;
    if (lowSimilarityQueries / queries.length > 0.5) {
      issues.push('Many queries return low-relevance results');
    }

    return issues;
  }

  private generateRecommendations(queries: RAGQuery[]): string[] {
    const recommendations: string[] = [];
    const issues = this.identifyIssues(queries);

    if (issues.some(issue => issue.includes('failure rate'))) {
      recommendations.push('Review query processing pipeline for errors');
    }

    if (issues.some(issue => issue.includes('response times'))) {
      recommendations.push('Consider optimizing vector search algorithms');
    }

    if (issues.some(issue => issue.includes('low-relevance'))) {
      recommendations.push('Improve document chunking strategy or similarity thresholds');
    }

    return recommendations;
  }

  private getPopularQueries(queries: RAGQuery[], limit: number): string[] {
    const queryFreq = new Map<string, number>();
    queries.forEach(query => {
      const normalizedQuery = query.queryText.toLowerCase().trim();
      queryFreq.set(normalizedQuery, (queryFreq.get(normalizedQuery) || 0) + 1);
    });

    return Array.from(queryFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([query]) => query.substring(0, 30) + '...');
  }

  private generateTimelineData(queries: RAGQuery[]): any[] {
    // Group queries by hour and generate timeline data
    const hourlyData = new Map<string, RAGQuery[]>();
    
    queries.forEach(query => {
      const hourKey = new Date(query.timestamp).toISOString().substring(0, 13);
      if (!hourlyData.has(hourKey)) {
        hourlyData.set(hourKey, []);
      }
      hourlyData.get(hourKey)!.push(query);
    });

    return Array.from(hourlyData.entries()).map(([hourKey, queries]) => {
      const successfulQueries = queries.filter(q => q.success);
      return {
        timestamp: new Date(hourKey + ':00:00.000Z'),
        queryCount: queries.length,
        averageLatency: queries.reduce((sum, q) => sum + q.responseTime, 0) / queries.length,
        successRate: (successfulQueries.length / queries.length) * 100,
        documentsRetrieved: queries.reduce((sum, q) => sum + q.resultsCount, 0)
      };
    }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  private calculateCoverageScore(queries: RAGQuery[]): number {
    // Calculate how well RAG covered the query space (simplified metric)
    if (queries.length === 0) return 0;
    
    const successfulQueries = queries.filter(q => q.success && q.resultsCount > 0);
    const avgSimilarity = successfulQueries.length > 0 ?
      successfulQueries.reduce((sum, q) => sum + q.averageSimilarity, 0) / successfulQueries.length : 0;
    
    const coverageRate = successfulQueries.length / queries.length;
    return (avgSimilarity * 0.7 + coverageRate * 0.3) * 100;
  }

  private analyzeQueryPatterns(queries: RAGQuery[]): any[] {
    const patterns = new Map<string, { frequency: number; successes: number }>();
    
    queries.forEach(query => {
      // Extract simple patterns - first few words
      const pattern = query.queryText.split(' ').slice(0, 3).join(' ').toLowerCase();
      const existing = patterns.get(pattern);
      if (existing) {
        existing.frequency++;
        if (query.success) existing.successes++;
      } else {
        patterns.set(pattern, { frequency: 1, successes: query.success ? 1 : 0 });
      }
    });

    return Array.from(patterns.entries())
      .map(([pattern, data]) => ({
        pattern,
        frequency: data.frequency,
        averageSuccess: data.frequency > 0 ? (data.successes / data.frequency) * 100 : 0
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }

  private getEmptyStats(): RAGStats {
    return {
      totalQueries: 0,
      successfulQueries: 0,
      averageResponseTime: 0,
      averageSimilarity: 0,
      documentHitRate: 0,
      topDocuments: [],
      queryPatterns: [],
      performanceMetrics: {
        fastQueries: 0,
        mediumQueries: 0,
        slowQueries: 0,
        timeoutQueries: 0
      }
    };
  }

  private enforceQueryLimit(): void {
    if (this.queries.size > this.config.maxQueryHistory) {
      const queries = Array.from(this.queries.values())
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      const toDelete = queries.slice(0, queries.length - this.config.maxQueryHistory);
      toDelete.forEach(query => this.queries.delete(query.id));
      
      console.log(`🧹 RAG Tracker enforced query limit, removed ${toDelete.length} old queries`);
    }
  }

  private setupPeriodicCleanup(): void {
    if (typeof window !== 'undefined') {
      setInterval(() => {
        const cutoffDate = new Date(Date.now() - this.config.retention.queries * 24 * 60 * 60 * 1000);
        this.clearHistory(cutoffDate);
      }, 60 * 60 * 1000); // Run every hour
    }
  }

  // Public getters for monitoring
  get currentStats(): RAGStats {
    return this.getStats();
  }

  get queryCount(): number {
    return this.queries.size;
  }

  get sessionCount(): number {
    return this.sessions.size;
  }

  get configuration(): RAGConfigurationOptions {
    return { ...this.config };
  }
}

// Singleton instance for global use
let globalRAGTracker: RAGTrackerImpl | null = null;

export function getRAGTracker(config?: Partial<RAGConfigurationOptions>): RAGTrackerImpl {
  if (!globalRAGTracker) {
    globalRAGTracker = new RAGTrackerImpl(config);
  }
  return globalRAGTracker;
}

export function resetRAGTracker(): void {
  globalRAGTracker = null;
} 