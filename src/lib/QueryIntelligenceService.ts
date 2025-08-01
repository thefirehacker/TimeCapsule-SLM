/**
 * Query Intelligence Service
 * 
 * Provides hybrid query expansion using rule-based patterns and LLM fallback
 * to transform literal user queries into contextual, multi-term searches.
 * 
 * Example: "top 3 runs" → ["performance results", "benchmark data", "training speeds"]
 */

export interface QueryIntent {
  type: 'performance' | 'comparison' | 'technical' | 'summary' | 'unknown';
  confidence: number;
  keywords: string[];
  expansionStrategy: 'performance' | 'comparison' | 'technical' | 'general';
}

export interface QueryAnalysis {
  originalQuery: string;
  intent: QueryIntent;
  expandedQueries: string[];
  searchParameters: {
    threshold: number;
    limit: number;
    strategy: 'broad' | 'focused';
  };
  processingTime: number;
  method: 'rule-based' | 'llm-assisted' | 'hybrid';
}

interface QueryPattern {
  patterns: RegExp[];
  expansions: string[];
  threshold: number;
  limit: number;
  strategy: 'broad' | 'focused';
}

/**
 * Rule-based query expansion patterns
 * Each pattern includes regex matchers, expansion terms, and search parameters
 */
const QUERY_PATTERNS: Record<string, QueryPattern> = {
  performance: {
    patterns: [
      /top|best|fastest|speed|benchmark|run|result|score/i,
      /performance|optimization|timing|throughput/i,
      /ranking|leaderboard|comparison|versus/i
    ],
    expansions: [
      "benchmark results",
      "performance metrics", 
      "training speed",
      "optimization results",
      "execution time",
      "throughput data",
      "speed comparison",
      "performance analysis"
    ],
    threshold: 0.15, // Lower threshold for broader matching
    limit: 15,
    strategy: 'broad'
  },
  
  comparison: {
    patterns: [
      /vs|versus|compare|better|worse|difference/i,
      /advantage|disadvantage|pros|cons/i,
      /superior|inferior|outperform/i
    ],
    expansions: [
      "comparison analysis",
      "versus results", 
      "performance difference",
      "benchmark comparison",
      "evaluation criteria",
      "comparative study"
    ],
    threshold: 0.2,
    limit: 12,
    strategy: 'focused'
  },
  
  technical: {
    patterns: [
      /how|implement|code|algorithm|method|technique/i,
      /architecture|design|structure|framework/i,
      /configuration|setup|installation/i
    ],
    expansions: [
      "implementation details",
      "code examples",
      "algorithm description",
      "technical approach",
      "method explanation",
      "architectural design",
      "configuration guide"
    ],
    threshold: 0.25,
    limit: 10,
    strategy: 'focused'
  },
  
  summary: {
    patterns: [
      /what|explain|overview|summary|describe/i,
      /introduction|basics|fundamentals/i,
      /definition|meaning|concept/i
    ],
    expansions: [
      "overview",
      "summary",
      "explanation",
      "introduction",
      "description",
      "concept explanation",
      "fundamental principles"
    ],
    threshold: 0.2,
    limit: 12,
    strategy: 'broad'
  }
};

/**
 * Query Intelligence Service Class
 * Handles query analysis, intent classification, and expansion
 */
export class QueryIntelligenceService {
  private static instance: QueryIntelligenceService;
  private llmGenerateContent?: (prompt: string) => Promise<string>;
  
  private constructor() {}
  
  static getInstance(): QueryIntelligenceService {
    if (!QueryIntelligenceService.instance) {
      QueryIntelligenceService.instance = new QueryIntelligenceService();
    }
    return QueryIntelligenceService.instance;
  }
  
  /**
   * Configure LLM for query expansion fallback
   */
  configureLLM(generateContent: (prompt: string) => Promise<string>) {
    this.llmGenerateContent = generateContent;
  }
  
  /**
   * Main entry point: Analyze query and generate expansion
   */
  async analyzeQuery(query: string): Promise<QueryAnalysis> {
    const startTime = Date.now();
    
    try {
      console.log(`🧠 Analyzing query: "${query}"`);
      
      // Step 1: Rule-based analysis
      const ruleBasedAnalysis = this.analyzeWithRules(query);
      console.log(`📋 Rule-based analysis: ${ruleBasedAnalysis.intent.type} (${ruleBasedAnalysis.intent.confidence})`);
      
      // Step 2: LLM analysis for low-confidence or unknown intents
      let finalAnalysis = ruleBasedAnalysis;
      let method: QueryAnalysis['method'] = 'rule-based';
      
      if (ruleBasedAnalysis.intent.confidence < 0.7 || ruleBasedAnalysis.intent.type === 'unknown') {
        console.log(`🤖 Low confidence (${ruleBasedAnalysis.intent.confidence}), trying LLM analysis...`);
        
        const llmAnalysis = await this.analyzeWithLLM(query);
        if (llmAnalysis) {
          // Combine rule-based and LLM results
          finalAnalysis = this.combineAnalyses(ruleBasedAnalysis, llmAnalysis);
          method = 'hybrid';
          console.log(`🔄 Combined analysis: ${finalAnalysis.expandedQueries.length} total queries`);
        }
      }
      
      const processingTime = Date.now() - startTime;
      
      const result: QueryAnalysis = {
        originalQuery: query,
        intent: finalAnalysis.intent,
        expandedQueries: this.deduplicateQueries(finalAnalysis.expandedQueries),
        searchParameters: finalAnalysis.searchParameters,
        processingTime,
        method
      };
      
      console.log(`✅ Query analysis complete: ${result.expandedQueries.length} queries in ${processingTime}ms`);
      return result;
      
    } catch (error) {
      console.error('❌ Query analysis failed:', error);
      
      // Fallback to basic analysis
      return {
        originalQuery: query,
        intent: { type: 'unknown', confidence: 0.5, keywords: [query], expansionStrategy: 'general' },
        expandedQueries: [query],
        searchParameters: { threshold: 0.2, limit: 10, strategy: 'broad' },
        processingTime: Date.now() - startTime,
        method: 'rule-based'
      };
    }
  }
  
  /**
   * Rule-based query analysis using pattern matching
   */
  private analyzeWithRules(query: string): {
    intent: QueryIntent;
    expandedQueries: string[];
    searchParameters: QueryAnalysis['searchParameters'];
  } {
    const queryLower = query.toLowerCase();
    
    // Find matching patterns
    for (const [intentType, pattern] of Object.entries(QUERY_PATTERNS)) {
      const matches = pattern.patterns.some(regex => regex.test(queryLower));
      
      if (matches) {
        const keywords = this.extractKeywords(query);
        
        return {
          intent: {
            type: intentType as QueryIntent['type'],
            confidence: 0.8, // High confidence for rule-based matches
            keywords,
            expansionStrategy: intentType as QueryIntent['expansionStrategy']
          },
          expandedQueries: pattern.expansions,
          searchParameters: {
            threshold: pattern.threshold,
            limit: pattern.limit,
            strategy: pattern.strategy
          }
        };
      }
    }
    
    // No pattern matched - unknown intent
    return {
      intent: {
        type: 'unknown',
        confidence: 0.3,
        keywords: this.extractKeywords(query),
        expansionStrategy: 'general'
      },
      expandedQueries: [query],
      searchParameters: {
        threshold: 0.2,
        limit: 10,
        strategy: 'broad'
      }
    };
  }
  
  /**
   * LLM-based query analysis for complex or ambiguous queries
   */
  private async analyzeWithLLM(query: string): Promise<{
    intent: QueryIntent;
    expandedQueries: string[];
    searchParameters: QueryAnalysis['searchParameters'];
  } | null> {
    if (!this.llmGenerateContent) {
      console.warn('⚠️ LLM not configured for query expansion');
      return null;
    }
    
    try {
      const prompt = `Analyze this user query and generate related search terms:

Query: "${query}"

Tasks:
1. Classify the query intent as one of: performance, comparison, technical, summary, unknown
2. Generate 5-6 alternative search terms that would find relevant content
3. Focus on synonyms, related concepts, and what content might actually exist

Respond with JSON only:
{
  "intent": {
    "type": "performance|comparison|technical|summary|unknown",
    "confidence": 0.8,
    "keywords": ["keyword1", "keyword2"]
  },
  "expandedQueries": [
    "alternative search term 1",
    "alternative search term 2",
    "alternative search term 3",
    "alternative search term 4",
    "alternative search term 5"
  ]
}

Example for "top 3 runs":
{
  "intent": {
    "type": "performance", 
    "confidence": 0.9,
    "keywords": ["top", "runs", "performance"]
  },
  "expandedQueries": [
    "performance results",
    "benchmark data", 
    "training speeds",
    "optimization results",
    "execution metrics"
  ]
}`;

      const response = await this.llmGenerateContent(prompt);
      const parsed = JSON.parse(response);
      
      // Determine search parameters based on intent
      const searchParams = this.getSearchParametersForIntent(parsed.intent.type);
      
      return {
        intent: {
          ...parsed.intent,
          expansionStrategy: parsed.intent.type === 'unknown' ? 'general' : parsed.intent.type
        },
        expandedQueries: parsed.expandedQueries,
        searchParameters: searchParams
      };
      
    } catch (error) {
      console.error('❌ LLM query analysis failed:', error);
      return null;
    }
  }
  
  /**
   * Combine rule-based and LLM analyses
   */
  private combineAnalyses(
    ruleBasedAnalysis: any,
    llmAnalysis: any
  ): {
    intent: QueryIntent;
    expandedQueries: string[];
    searchParameters: QueryAnalysis['searchParameters'];
  } {
    // Use LLM intent if it has higher confidence
    const intent = llmAnalysis.intent.confidence > ruleBasedAnalysis.intent.confidence
      ? llmAnalysis.intent
      : ruleBasedAnalysis.intent;
    
    // Combine expanded queries from both sources
    const expandedQueries = [
      ...ruleBasedAnalysis.expandedQueries,
      ...llmAnalysis.expandedQueries
    ];
    
    // Use search parameters from the higher-confidence analysis
    const searchParameters = intent === llmAnalysis.intent 
      ? llmAnalysis.searchParameters
      : ruleBasedAnalysis.searchParameters;
    
    return {
      intent,
      expandedQueries,
      searchParameters
    };
  }
  
  /**
   * Extract keywords from query for intent analysis
   */
  private extractKeywords(query: string): string[] {
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 2)
      .filter(word => !['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'].includes(word));
  }
  
  /**
   * Remove duplicate queries and limit to reasonable number
   */
  private deduplicateQueries(queries: string[]): string[] {
    const seen = new Set<string>();
    const unique: string[] = [];
    
    for (const query of queries) {
      const normalized = query.toLowerCase().trim();
      if (!seen.has(normalized) && unique.length < 8) { // Limit to 8 queries max
        seen.add(normalized);
        unique.push(query);
      }
    }
    
    return unique;
  }
  
  /**
   * Get search parameters based on intent type
   */
  private getSearchParametersForIntent(intentType: string): QueryAnalysis['searchParameters'] {
    const pattern = QUERY_PATTERNS[intentType];
    if (pattern) {
      return {
        threshold: pattern.threshold,
        limit: pattern.limit,
        strategy: pattern.strategy
      };
    }
    
    // Default parameters for unknown intents
    return {
      threshold: 0.2,
      limit: 10,
      strategy: 'broad'
    };
  }
  
  /**
   * Validate if a query should use intelligent expansion
   */
  isQuerySuitableForExpansion(query: string): boolean {
    // Skip expansion for very short or very long queries
    if (query.length < 3 || query.length > 200) {
      return false;
    }
    
    // Skip expansion for queries that are already very specific
    const specificPatterns = [
      /^https?:\/\//, // URLs
      /^\w+:\w+/, // Key-value pairs
      /^[0-9]+$/, // Pure numbers
      /^\".*\"$/ // Quoted exact matches
    ];
    
    return !specificPatterns.some(pattern => pattern.test(query.trim()));
  }
  
  /**
   * Get expansion preview for UI display
   */
  async getExpansionPreview(query: string): Promise<string[]> {
    if (!this.isQuerySuitableForExpansion(query)) {
      return [];
    }
    
    const analysis = await this.analyzeQuery(query);
    return analysis.expandedQueries.slice(0, 4); // Show first 4 for preview
  }
}

// Export singleton instance
export const queryIntelligenceService = QueryIntelligenceService.getInstance();

/**
 * Utility functions for query processing
 */
export class QueryUtils {
  /**
   * Calculate relevance score between original query and expanded query
   */
  static calculateExpansionRelevance(originalQuery: string, expandedQuery: string): number {
    const originalWords = originalQuery.toLowerCase().split(/\s+/);
    const expandedWords = expandedQuery.toLowerCase().split(/\s+/);
    
    const commonWords = originalWords.filter(word => 
      expandedWords.some(expandedWord => 
        expandedWord.includes(word) || word.includes(expandedWord)
      )
    );
    
    return commonWords.length / Math.max(originalWords.length, expandedWords.length);
  }
  
  /**
   * Suggest query improvements based on common patterns
   */
  static suggestQueryImprovements(query: string): string[] {
    const suggestions: string[] = [];
    
    // Suggest more specific terms for vague queries
    if (/best|good|better/.test(query.toLowerCase())) {
      suggestions.push('Try specifying what criteria make something "best" (fastest, most accurate, etc.)');
    }
    
    // Suggest context for ambiguous terms
    if (query.split(' ').length < 3) {
      suggestions.push('Consider adding more context to help find relevant information');
    }
    
    return suggestions;
  }
}