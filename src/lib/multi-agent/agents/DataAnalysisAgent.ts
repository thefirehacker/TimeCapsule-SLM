/**
 * Data Analysis Agent
 * 
 * Cleans, deduplicates, and categorizes extracted data.
 * First step in the multi-synthesis pipeline.
 * Optimized to stay under 800 tokens.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, ExtractedItem } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

interface GroupedItem {
  bestItem: ExtractedItem;
  similarItems: ExtractedItem[];
  confidence: number;
  category?: string;
  classification?: 'current' | 'historical' | 'other';
  isCurrent?: boolean;
  isHistorical?: boolean;
}

// Removed unused interface - using the one in Context.ts

export class DataAnalysisAgent extends BaseAgent {
  readonly name = 'DataAnalyzer';
  readonly description = 'Cleans, deduplicates, and categorizes extracted data';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    // Initialize if needed
    if (!context.extractedData) {
      context.extractedData = { raw: [], structured: [] };
    }
    
    const initialCount = context.extractedData.raw?.length || 0;
    
    if (initialCount === 0) {
      this.setReasoning('No data to analyze - skipping data analysis');
      return context;
    }
    
    console.log(`🔍 DataAnalyzer: Processing ${initialCount} extracted items`);
    
    // Step 1: Clean and deduplicate
    const cleaned = this.cleanAndDeduplicateItems(context.extractedData.raw);
    console.log(`🧹 After cleaning: ${cleaned.length} items remain`);
    
    // Step 2: 🎯 NEW - Apply query-relevance filtering
    const queryFiltered = this.filterByQueryRelevance(cleaned, context);
    console.log(`🎯 After query filtering: ${queryFiltered.length} items remain (${cleaned.length - queryFiltered.length} irrelevant items removed)`);
    
    // Step 3: Group and categorize the filtered items
    const categorized = await this.groupAndCategorize(queryFiltered, context.query);
    
    // Step 4: Generate insights
    const insights = this.generateInsights(queryFiltered, categorized);

    // 🎯 If expected answer is performance ranking, compute best by reducer
    const expectedType = (context.sharedKnowledge as any)?.intelligentExpectations?.expectedAnswerType;
    if (expectedType === 'performance_ranking') {
      const ranked = this.computeBestPerformance(queryFiltered);
      if (ranked) {
        // Promote best item to structured form with attribution
        context.extractedData.structured.push({ bestPerformance: ranked });
      }
    }
    
    // Store results in new context property
    if (!context.analyzedData) {
      context.analyzedData = { cleaned: [], categorized: [], insights: '' };
    }
    
    context.analyzedData.cleaned = queryFiltered; // Use filtered data
    context.analyzedData.categorized = categorized;
    context.analyzedData.insights = insights;
    
    // Also update extractedData for backward compatibility
    context.extractedData.raw = queryFiltered; // Use filtered data
    context.extractedData.structured = categorized;
    
    this.setReasoning(`📊 Data Analysis Complete:
- Initial items: ${initialCount}
- After cleaning: ${cleaned.length}
- After query filtering: ${queryFiltered.length}
- Categories found: ${categorized.length}
- Query-irrelevant items removed: ${cleaned.length - queryFiltered.length}
${insights}`);
    
    return context;
  }

  private parseNumberWithK(value: string): number | null {
    const v = value.trim().toLowerCase();
    const m = v.match(/^(\d+(?:\.\d+)?)(\s*[km])?$/i);
    if (!m) return null;
    let num = parseFloat(m[1]);
    const suffix = m[2]?.trim().toLowerCase();
    if (suffix === 'k') num *= 1_000;
    if (suffix === 'm') num *= 1_000_000;
    return num;
  }

  private computeBestPerformance(items: ExtractedItem[]) {
    // Find time items (hours) and throughput items (tokens/s)
    const timeItems = items.filter(it => /\b(hours?|hrs?)\b/i.test(it.content || it.value || ''));
    const throughputItems = items.filter(it => /(tokens?\/s(?:ec)?|tok\/s|tokens?\s*per\s*second)/i.test((it.content || it.value || '')));

    let bestTime: { item: ExtractedItem; hours: number } | null = null;
    for (const it of timeItems) {
      const m = String(it.content || it.value || '').match(/(\d+(?:\.\d+)?)\s*(hours?|hrs?)/i);
      if (!m) continue;
      const hours = parseFloat(m[1]);
      if (!isFinite(hours)) continue;
      if (!bestTime || hours < bestTime.hours) bestTime = { item: it, hours };
    }

    let bestThroughput: { item: ExtractedItem; tps: number } | null = null;
    for (const it of throughputItems) {
      const m = String(it.content || it.value || '').match(/(\d+(?:\.\d+)?\s*[kKmM]?)[\s]*?(tokens?\/s(?:ec)?|tok\/s|tokens?\s*per\s*second)/i);
      if (!m) continue;
      const tpsNum = this.parseNumberWithK(m[1]);
      if (tpsNum == null) continue;
      if (!bestThroughput || tpsNum > bestThroughput.tps) bestThroughput = { item: it, tps: tpsNum };
    }

    if (!bestTime && !bestThroughput) return null;
    return {
      bestTime: bestTime ? { value: bestTime.hours, unit: 'hours', source: bestTime.item.sourceDocument, content: bestTime.item.content } : null,
      bestThroughput: bestThroughput ? { value: bestThroughput.tps, unit: 'tokens/s', source: bestThroughput.item.sourceDocument, content: bestThroughput.item.content } : null
    };
  }
  
  private cleanAndDeduplicateItems(items: ExtractedItem[]): ExtractedItem[] {
    const cleaned = items.map(item => {
      let content = (item.content || '').toString();
      
      // Remove formatting artifacts
      content = content
        .replace(/\*\*+/g, '')
        .replace(/^\[|\]$/g, '')
        .replace(/^\s*[-•*]\s*/, '')
        .replace(/\s*:\s*$/, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      return {
        ...item,
        content,
        originalContent: item.content
      };
    }).filter(item => item.content.length > 3);
    
    // Deduplicate by similarity
    const deduped: ExtractedItem[] = [];
    const seen = new Set<string>();
    
    for (const item of cleaned) {
      const key = this.getNormalizedKey(item);
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(item);
      }
    }
    
    return deduped;
  }
  
  private getNormalizedKey(item: ExtractedItem): string {
    const content = item.content.toLowerCase().replace(/[^\w\s]/g, '');
    const value = item.value ? String(item.value) : '';
    return `${content.substring(0, 50)}_${value}`;
  }
  
  private async groupAndCategorize(items: ExtractedItem[], _query: string): Promise<GroupedItem[]> {
    if (items.length === 0) return [];
    
    // Group similar items
    const groups = new Map<string, GroupedItem>();
    
    for (const item of items) {
      const key = this.getGroupKey(item);
      
      if (!groups.has(key)) {
        groups.set(key, {
          bestItem: item,
          similarItems: [],
          confidence: item.confidence || 0.8
        });
      } else {
        const group = groups.get(key)!;
        group.similarItems.push(item);
        group.confidence = Math.max(group.confidence, item.confidence || 0.8);
      }
    }
    
    // Convert to array and categorize
    const categorized = Array.from(groups.values());
    
    // Use simple LLM prompt for classification (keeping it under token limit)
    if (categorized.length > 0 && categorized.length <= 15) {
      const prompt = `Classify these items as 'current', 'historical', or 'other':
${categorized.slice(0, 10).map((g, i) => 
  `${i+1}. ${g.bestItem.content} - ${g.bestItem.value || 'N/A'}`
).join('\n')}

Reply with just the classifications in order.`;
      
      try {
        const response = await this.llm(prompt);
        const classifications = response.toLowerCase().split('\n');
        
        categorized.forEach((group, i) => {
          const classification = classifications[i] || '';
          group.classification = classification.includes('current') ? 'current' :
                                classification.includes('historical') ? 'historical' : 'other';
          group.isCurrent = group.classification === 'current';
          group.isHistorical = group.classification === 'historical';
        });
      } catch (error) {
        console.warn('Classification failed, using defaults');
      }
    }
    
    return categorized;
  }
  
  private getGroupKey(item: ExtractedItem): string {
    // Group by value and unit for ranking data
    if (item.value && item.unit) {
      return `${item.unit}_${Math.floor(Number(item.value) / 10) * 10}`;
    }
    // Group by content similarity for text data
    return item.content.substring(0, 30).toLowerCase();
  }
  
  /**
   * 🎯 NEW: Filter extracted items by query relevance (no hardcoding)
   */
  private filterByQueryRelevance(items: ExtractedItem[], context: ResearchContext): ExtractedItem[] {
    if (!context.query || items.length === 0) {
      return items;
    }

    console.log(`🎯 DataAnalyzer: Filtering ${items.length} items for query relevance`);
    
    // Extract query key terms dynamically
    const queryKeyTerms = this.extractQueryKeyTerms(context.query);
    const queryIntent = this.parseQueryIntent(context.query);
    
    console.log(`🔍 Query key terms:`, queryKeyTerms);
    console.log(`🔍 Query intent:`, queryIntent);

    // Get document relevance scores from PlanningAgent if available
    const documentRelevance = context.sharedKnowledge.documentSectionRelevance || {};
    
    // 🎯 NEW: Get PlanningAgent's extraction strategies for category alignment
    const extractionStrategies = context.sharedKnowledge.extractionStrategies || {};
    const planningStrategy = Object.values(extractionStrategies)[0]; // Get first available strategy
    
    console.log(`🔍 PlanningAgent categories available:`, planningStrategy ? 'Yes' : 'No');
    if (planningStrategy) {
      console.log(`📋 Categories: methods(${planningStrategy.patternCategories?.methods?.length || 0}), concepts(${planningStrategy.patternCategories?.concepts?.length || 0}), people(${planningStrategy.patternCategories?.people?.length || 0})`);
    }

    const relevantItems = items.filter(item => {
      const relevanceScore = this.calculateItemRelevance(item, queryKeyTerms, queryIntent, documentRelevance, planningStrategy, context);
      
      // Log items that are filtered out for debugging
      if (relevanceScore < 0.3) {
        console.log(`❌ Filtered out low-relevance item: "${item.content}" (score: ${Math.round(relevanceScore * 100)}%)`);
      } else {
        console.log(`✅ Keeping relevant item: "${item.content}" (score: ${Math.round(relevanceScore * 100)}%)`);
      }

      return relevanceScore >= 0.3; // Dynamic threshold based on query relevance
    });

    console.log(`🎯 Query filtering complete: ${relevantItems.length}/${items.length} items kept`);
    return relevantItems;
  }

  /**
   * 🎯 ENHANCED: Calculate relevance score for an extracted item (now synchronized with PlanningAgent)
   */
  private calculateItemRelevance(item: ExtractedItem, queryKeyTerms: string[], queryIntent: string, documentRelevance: any, planningStrategy?: any, context?: ResearchContext): number {
    let score = 0;

    // 1. Direct content relevance (30% weight - reduced to make room for category boost)
    const contentRelevance = this.calculateContentRelevance(item.content || '', queryKeyTerms);
    score += contentRelevance * 0.3;

    // 2. Value/context relevance (20% weight)
    const valueRelevance = this.calculateContentRelevance(item.value || item.context || '', queryKeyTerms);
    score += valueRelevance * 0.2;

    // 3. Document source relevance (20% weight - reduced to make room for category boost)
    if (item.sourceDocument && documentRelevance[item.sourceDocument]) {
      score += documentRelevance[item.sourceDocument].score * 0.2;
    } else {
      score += 0.5 * 0.2; // Default moderate relevance
    }

    // 4. Intent-based relevance (15% weight)
    const intentRelevance = this.calculateIntentRelevance(item, queryIntent);
    score += intentRelevance * 0.15;

    // 🎯 NEW: 5. PlanningAgent category alignment boost (15% weight)
    const categoryRelevance = this.calculateCategoryRelevance(item, planningStrategy);
    score += categoryRelevance * 0.15;

    // 🎯 CRITICAL: 6. Document context relevance boost (from PlanningAgent analysis)
    if (context?.sharedKnowledge) {
      const documentContext = (context.sharedKnowledge as any).documentContext;
      const intelligentExpectations = (context.sharedKnowledge as any).intelligentExpectations;
      
      const contextRelevance = this.calculateDocumentContextRelevance(item, documentContext, intelligentExpectations);
      score += contextRelevance * 0.3; // High weight for context relevance
    }

    return Math.min(score, 1.0);
  }

  /**
   * 🎯 NEW: Calculate content relevance using semantic similarity
   */
  private calculateContentRelevance(content: string, queryKeyTerms: string[]): number {
    if (!content || queryKeyTerms.length === 0) return 0;

    const contentTerms = content.toLowerCase().split(/\s+/).map(term => term.replace(/[^\w]/g, '')).filter(term => term.length > 2);
    
    let matches = 0;
    let partialMatches = 0;

    queryKeyTerms.forEach(queryTerm => {
      contentTerms.forEach(contentTerm => {
        if (queryTerm === contentTerm) {
          matches += 1;
        } else if (queryTerm.length > 3 && (
          contentTerm.includes(queryTerm) || 
          queryTerm.includes(contentTerm) ||
          this.calculateLevenshteinSimilarity(queryTerm, contentTerm) > 0.7
        )) {
          partialMatches += 0.5;
        }
      });
    });

    return Math.min((matches + partialMatches) / queryKeyTerms.length, 1.0);
  }

  /**
   * 🎯 NEW: Calculate intent-based relevance
   */
  private calculateIntentRelevance(item: ExtractedItem, queryIntent: string): number {
    const content = (item.content || '').toLowerCase();
    const value = (item.value || '').toLowerCase();
    const context = (item.context || '').toLowerCase();
    const combined = `${content} ${value} ${context}`;

    let score = 0;

    // Intent-based scoring
    if (queryIntent.includes('performance_ranking') || queryIntent.includes('performance')) {
      if (combined.includes('performance') || combined.includes('result') || combined.includes('score') || 
          combined.includes('accuracy') || combined.includes('benchmark') || /\d+(\.\d+)?/.test(combined)) {
        score += 0.8;
      }
    }

    if (queryIntent.includes('methodology')) {
      if (combined.includes('method') || combined.includes('algorithm') || combined.includes('approach') ||
          combined.includes('technique') || combined.includes('procedure') || combined.includes('strategy')) {
        score += 0.8;
      }
    }

    if (queryIntent.includes('comparison')) {
      if (combined.includes('versus') || combined.includes('compared') || combined.includes('better') ||
          combined.includes('worse') || combined.includes('difference') || combined.includes('vs')) {
        score += 0.8;
      }
    }

    return Math.min(score, 1.0);
  }

  /**
   * 🎯 NEW: Calculate Levenshtein similarity (reused from PlanningAgent pattern)
   */
  private calculateLevenshteinSimilarity(str1: string, str2: string): number {
    const maxLen = Math.max(str1.length, str2.length);
    if (maxLen === 0) return 1;
    
    const distance = this.levenshteinDistance(str1, str2);
    return 1 - (distance / maxLen);
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * 🎯 NEW: Extract key terms from query (reused from PlanningAgent)
   */
  private extractQueryKeyTerms(query: string): string[] {
    // ABSOLUTE ZERO HARDCODING: Extract all meaningful terms
    return query.toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 2)
      .map(term => term.replace(/[^\w]/g, ''))
      .filter(term => term.length > 2);
  }

  /**
   * 🎯 NEW: Parse query intent (reused from PlanningAgent)
   */
  private parseQueryIntent(_query: string): string {
    // ABSOLUTE ZERO HARDCODING: Let document context drive intent analysis
    return 'general_query';
  }

  /**
   * 🎯 NEW: Calculate category relevance based on PlanningAgent's focused categories
   */
  private calculateCategoryRelevance(item: ExtractedItem, planningStrategy?: any): number {
    if (!planningStrategy?.patternCategories) {
      return 0.5; // Default moderate relevance when no strategy available
    }

    const content = (item.content || '').toLowerCase();
    const value = (item.value || '').toLowerCase(); 
    const context = (item.context || '').toLowerCase();
    const combined = `${content} ${value} ${context}`;

    let maxRelevance = 0;
    
    // Check alignment with PlanningAgent's focused method categories
    if (planningStrategy.patternCategories.methods?.length > 0) {
      planningStrategy.patternCategories.methods.forEach((method: string) => {
        const methodLower = method.toLowerCase();
        if (combined.includes(methodLower)) {
          maxRelevance = Math.max(maxRelevance, 1.0); // Perfect match
          console.log(`🎯 Category boost: Item matches PlanningAgent method "${method}"`);
        } else if (this.calculateLevenshteinSimilarity(methodLower, content) > 0.7) {
          maxRelevance = Math.max(maxRelevance, 0.8); // Similar match
          console.log(`🎯 Category boost: Item similar to PlanningAgent method "${method}"`);
        }
      });
    }

    // Check alignment with PlanningAgent's focused concept categories
    if (planningStrategy.patternCategories.concepts?.length > 0) {
      planningStrategy.patternCategories.concepts.forEach((concept: string) => {
        const conceptLower = concept.toLowerCase();
        if (combined.includes(conceptLower)) {
          maxRelevance = Math.max(maxRelevance, 0.9); // High relevance for concepts
          console.log(`🎯 Category boost: Item matches PlanningAgent concept "${concept}"`);
        } else if (this.calculateLevenshteinSimilarity(conceptLower, content) > 0.7) {
          maxRelevance = Math.max(maxRelevance, 0.7); // Good relevance for similar concepts
        }
      });
    }

    // Check alignment with PlanningAgent's people categories
    if (planningStrategy.patternCategories.people?.length > 0) {
      planningStrategy.patternCategories.people.forEach((person: string) => {
        const personLower = person.toLowerCase();
        if (combined.includes(personLower)) {
          maxRelevance = Math.max(maxRelevance, 0.8); // High relevance for people
          console.log(`🎯 Category boost: Item matches PlanningAgent person "${person}"`);
        }
      });
    }

    return maxRelevance;
  }

  private generateInsights(cleaned: ExtractedItem[], categorized: GroupedItem[]): string {
    const tableItems = cleaned.filter(item => 
      item.metadata?.type?.includes('table') || 
      item.metadata?.method === 'table'
    ).length;
    
    const currentItems = categorized.filter(g => g.isCurrent).length;
    const historicalItems = categorized.filter(g => g.isHistorical).length;
    
    return `
- Table data: ${tableItems} items
- Current records: ${currentItems}
- Historical data: ${historicalItems}`;
  }

  /**
   * 🎯 CRITICAL: Calculate relevance based on PlanningAgent's document context
   */
  private calculateDocumentContextRelevance(item: ExtractedItem, documentContext: any, intelligentExpectations: any): number {
    if (!documentContext || !intelligentExpectations) return 0;

    const itemContent = (item.content || '').toLowerCase();
    const itemValue = (item.value || '').toLowerCase();
    const itemContext = (item.context || '').toLowerCase();
    const combined = `${itemContent} ${itemValue} ${itemContext}`;

    let contextScore = 0;

    // 🎯 MAIN CONTRIBUTION BOOST: If item mentions the main contribution, it's highly relevant
    if (documentContext.mainContribution && documentContext.mainContribution !== 'Unknown') {
      const mainContribution = documentContext.mainContribution.toLowerCase();
      
      // Check for main contribution name (e.g., "grpo" from "Group Relative Policy Optimization (GRPO)")
      const contributionWords = mainContribution.split(/[\s\(\)]+/).filter((w: string) => w.length > 2);
      
      contributionWords.forEach((word: string) => {
        if (combined.includes(word)) {
          contextScore += 0.8; // Major boost for main contribution mentions
        }
      });
    }

    // 🎯 METHOD PAPER BOOST: For method papers, method introductions are highly relevant
    if (documentContext.isMethodPaper && intelligentExpectations.shouldInferFromContribution) {
      // Keywords that indicate method introduction/presentation
      const methodIntroPatterns = ['introduce', 'propose', 'present', 'develop', 'algorithm', 'method', 'approach'];
      
      methodIntroPatterns.forEach(pattern => {
        if (combined.includes(pattern)) {
          contextScore += 0.4; // Moderate boost for method introduction language
        }
      });
    }

    // 🎯 DOCUMENT PURPOSE ALIGNMENT
    if (documentContext.documentPurpose && combined.includes(documentContext.documentPurpose.toLowerCase().split(' ')[0])) {
      contextScore += 0.3;
    }

    return Math.min(contextScore, 1.0);
  }
}