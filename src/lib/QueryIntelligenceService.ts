import crypto from 'crypto';
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

export interface QueryConstraints {
  expectedOwner?: string;
  expectedDomainCandidates?: string[];
  expectedTitleHints?: string[];
  expectedDocType?: string; // e.g., 'blog', 'paper', 'docs'
  strictness: 'must' | 'should';
  keyEntities: string[];
}

/**
 * Default search parameters when LLM-based analysis is used
 */
const DEFAULT_SEARCH_PARAMS = {
  threshold: 0.2,
  limit: 10,
  strategy: 'broad' as const
};

/**
 * Query Intelligence Service Class
 * Handles query analysis, intent classification, and expansion
 */
export class QueryIntelligenceService {
  private static instance: QueryIntelligenceService;
  private llmGenerateContent?: (prompt: string) => Promise<string>;
  private constraintsCache: Map<string, QueryConstraints> = new Map();
  
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
   * Extract dynamic query constraints once (no hardcoding), with caching.
   */
  async extractQueryConstraints(query: string): Promise<QueryConstraints> {
    const key = QueryUtils.hashQuery(query);
    const cached = this.constraintsCache.get(key);
    if (cached) return cached;

    // Lightweight heuristic prefill (no hardcoding):
    const lower = query.toLowerCase();
    const hints: string[] = [];
    const keyEntities: string[] = [];
    const isBlog = /blog/.test(lower);

    // Simple named-entity-ish tokens (capitalized words as potential owners/entities)
    query.split(/[^A-Za-z0-9]+/).forEach(tok => {
      if (tok && /^[A-Z][a-zA-Z]+$/.test(tok)) keyEntities.push(tok);
    });

    // If query contains a hostname-looking token, treat as domain candidate
    const domainMatches = query.match(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/gi) || [];

    // If user says "from X" or "in X", capture following token as hint
    const fromHint = (query.match(/\bfrom\s+([^,.!?]+)/i) || [])[1];
    if (fromHint) hints.push(fromHint.trim());

    // Default strictness: must when explicit source cue present, else should
    const hasSourceCue = /from\s+|in\s+|on\s+|by\s+/i.test(query);

    let constraints: QueryConstraints = {
      expectedOwner: undefined,
      expectedDomainCandidates: domainMatches.map(d => d.toLowerCase()),
      expectedTitleHints: hints,
      expectedDocType: isBlog ? 'blog' : undefined,
      strictness: hasSourceCue ? 'must' : 'should',
      keyEntities: [...new Set(keyEntities)].slice(0, 5)
    };

    // If LLM is available, refine constraints in one call (small prompt)
    if (this.llmGenerateContent) {
      try {
        const prompt = `/no_think
Task: Derive source constraints from the user query without hardcoding.
Query: "${query}"
Respond as JSON with fields: expectedOwner (string|optional), expectedDomainCandidates (string[]), expectedTitleHints (string[]), expectedDocType (string|optional), strictness ("must"|"should"), keyEntities (string[]).`;
        const resp = await this.llmGenerateContent(prompt);
        const parsed = this.safeParseConstraints(resp);
        if (parsed) {
          constraints = {
            expectedOwner: parsed.expectedOwner || constraints.expectedOwner,
            expectedDomainCandidates: parsed.expectedDomainCandidates?.length ? parsed.expectedDomainCandidates.map((d: string) => d.toLowerCase()) : constraints.expectedDomainCandidates,
            expectedTitleHints: parsed.expectedTitleHints?.length ? parsed.expectedTitleHints : constraints.expectedTitleHints,
            expectedDocType: parsed.expectedDocType || constraints.expectedDocType,
            strictness: parsed.strictness === 'must' ? 'must' : constraints.strictness,
            keyEntities: Array.isArray(parsed.keyEntities) && parsed.keyEntities.length ? parsed.keyEntities.slice(0, 8) : constraints.keyEntities
          };
        }
      } catch (e) {
        console.warn('⚠️ Constraint LLM refinement failed, using heuristic constraints');
      }
    }

    this.constraintsCache.set(key, constraints);
    return constraints;
  }

  private safeParseConstraints(text: string): any | null {
    try {
      if (text.trim().startsWith('{')) return JSON.parse(text);
      const m = text.match(/\{[\s\S]*\}/);
      if (m) return JSON.parse(m[0]);
    } catch {}
    return null;
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
   * Basic query analysis - simplified without hardcoded patterns
   */
  private analyzeWithRules(query: string): {
    intent: QueryIntent;
    expandedQueries: string[];
    searchParameters: QueryAnalysis['searchParameters'];
  } {
    // Always return low confidence to trigger LLM analysis
    // This ensures context-aware expansion instead of rigid pattern matching
    return {
      intent: {
        type: 'unknown',
        confidence: 0.3, // Low confidence to trigger LLM
        keywords: this.extractKeywords(query),
        expansionStrategy: 'general'
      },
      expandedQueries: [query],
      searchParameters: DEFAULT_SEARCH_PARAMS
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
      // Truncate very long queries for analysis
      const analysisQuery = query.length > 100 ? query.substring(0, 100) + '...' : query;
      
      const prompt = `What would you search for to find information about: "${analysisQuery}"?

Provide a few search term variations that would help find relevant content.

Also, what type of query is this (performance, comparison, technical, summary, or general)?`;

      const response = await this.llmGenerateContent(prompt);
      const parsed = this.parseJSON(response);
      
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
    // Validate inputs
    if (!llmAnalysis || !llmAnalysis.intent) {
      console.warn('⚠️ Invalid LLM analysis, using rule-based only');
      return ruleBasedAnalysis;
    }
    
    // Use LLM intent if it has higher confidence
    const intent = llmAnalysis.intent.confidence > ruleBasedAnalysis.intent.confidence
      ? llmAnalysis.intent
      : ruleBasedAnalysis.intent;
    
    // Safely combine expanded queries from both sources
    const ruleBasedQueries = Array.isArray(ruleBasedAnalysis.expandedQueries) 
      ? ruleBasedAnalysis.expandedQueries 
      : [];
    const llmQueries = Array.isArray(llmAnalysis.expandedQueries) 
      ? llmAnalysis.expandedQueries 
      : [];
    
    const expandedQueries = [
      ...ruleBasedQueries,
      ...llmQueries
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
   * Get initial intent type based on query keywords
   */
  private getIntentType(query: string): string {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('versus')) {
      return 'comparison';
    }
    if (lowerQuery.includes('how') || lowerQuery.includes('explain') || lowerQuery.includes('what')) {
      return 'technical';
    }
    if (lowerQuery.includes('summary') || lowerQuery.includes('overview') || lowerQuery.includes('list')) {
      return 'summary';
    }
    if (lowerQuery.includes('performance') || lowerQuery.includes('speed') || lowerQuery.includes('fast')) {
      return 'performance';
    }
    return 'unknown';
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
    // Use intent-specific parameters without rigid patterns
    switch (intentType) {
      case 'performance':
        return { threshold: 0.15, limit: 15, strategy: 'broad' };
      case 'comparison':
        return { threshold: 0.2, limit: 12, strategy: 'focused' };
      case 'technical':
        return { threshold: 0.25, limit: 10, strategy: 'focused' };
      case 'summary':
        return { threshold: 0.2, limit: 12, strategy: 'broad' };
      default:
        return DEFAULT_SEARCH_PARAMS;
    }
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

  /**
   * Parse JSON response from LLM, handling thinking tags and other artifacts
   * Similar to the multi-agent system's parseJSON method
   */
  private parseJSON(text: string): any {
    try {
      // First try direct parsing if it looks like JSON
      if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
        return JSON.parse(text);
      }
    } catch {
      // Continue to flexible parsing
    }
    
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.intent && parsed.expandedQueries) {
          return parsed;
        }
      } catch {
        // Continue to natural language parsing
      }
    }
    
    // Parse natural language response
    return this.parseNaturalLanguageResponse(text);
  }
  
  /**
   * Extract search terms and intent from natural language
   */
  private parseNaturalLanguageResponse(text: string): any {
    const lines = text.split('\n').filter(line => line.trim());
    const searchTerms: string[] = [];
    let intentType = 'unknown';
    let confidence = 0.7;
    
    // Extract search terms from natural language
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Skip lines that are explaining the type
      if (lowerLine.includes('type of query') || lowerLine.includes('this is a')) {
        // Extract intent type from these lines
        if (lowerLine.includes('performance')) intentType = 'performance';
        else if (lowerLine.includes('comparison')) intentType = 'comparison';
        else if (lowerLine.includes('technical')) intentType = 'technical';
        else if (lowerLine.includes('summary')) intentType = 'summary';
        else if (lowerLine.includes('general')) intentType = 'unknown';
        continue;
      }
      
      // Look for quoted terms
      const quotedTerms = line.match(/"([^"]+)"/g);
      if (quotedTerms) {
        searchTerms.push(...quotedTerms.map(t => t.replace(/"/g, '')));
      }
      
      // Look for listed items (1. xxx, - xxx, • xxx)
      const listMatch = line.match(/^[\d\-•*]\s*(.+)$/);
      if (listMatch) {
        const term = listMatch[1].trim();
        // Clean up the term
        if (!term.toLowerCase().includes('search for') && 
            !term.toLowerCase().includes('look for') &&
            term.length > 2) {
          searchTerms.push(term);
        }
      }
      
      // Look for "search for X" patterns
      const searchForMatch = line.match(/search for:?\s*(.+)/i);
      if (searchForMatch) {
        searchTerms.push(searchForMatch[1].trim());
      }
    }
    
    // If no search terms found, extract key phrases from the response
    if (searchTerms.length === 0) {
      // Extract phrases that look like search terms
      const phrases = text.match(/(?:would be|could search|try|look for|such as|like)\s+"?([^"\n,]+)"?/gi);
      if (phrases) {
        searchTerms.push(...phrases.map(p => 
          p.replace(/(?:would be|could search|try|look for|such as|like)\s*/i, '')
           .replace(/['"]/g, '')
           .trim()
        ));
      }
    }
    
    // Deduplicate and clean
    const uniqueTerms = [...new Set(searchTerms)]
      .filter(term => term && term.length > 2)
      .slice(0, 5);
    
    // If still no terms, use original query
    if (uniqueTerms.length === 0) {
      uniqueTerms.push(text.split('\n')[0].substring(0, 50));
    }
    
    return {
      intent: {
        type: intentType,
        confidence: confidence,
        keywords: this.extractKeywords(uniqueTerms.join(' '))
      },
      expandedQueries: uniqueTerms
    };
  }
}

// Export singleton instance
export const queryIntelligenceService = QueryIntelligenceService.getInstance();

/**
 * Utility functions for query processing
 */
export class QueryUtils {
  static hashQuery(query: string): string {
    return crypto.createHash('sha1').update(query.normalize()).digest('hex');
  }
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
  
  static suggestQueryImprovements(query: string): string[] {
    const suggestions: string[] = [];
    if (/best|good|better/.test(query.toLowerCase())) {
      suggestions.push('Try specifying what criteria make something "best" (fastest, most accurate, etc.)');
    }
    if (query.split(' ').length < 3) {
      suggestions.push('Consider adding more context to help find relevant information');
    }
    return suggestions;
  }
}