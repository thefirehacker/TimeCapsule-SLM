/**
 * WebSearch Agent
 * 
 * Expands knowledge base using web search when local documents are insufficient.
 * Uses Firecrawl for intelligent web content extraction and analysis.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, ChunkData } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';
import { parseJsonWithResilience } from '../../../components/DeepResearch/hooks/responseCompletion';
import { getFirecrawlService } from '../../FirecrawlService';
import { VectorStore } from '../../../components/VectorStore/VectorStore';

export interface WebSearchStrategy {
  searchQueries: string[];
  targetSites: string[];
  expectedContentTypes: string[];
  maxResults: number;
  reasoning: string;
}

export class WebSearchAgent extends BaseAgent {
  readonly name = 'WebSearchAgent';
  readonly description = 'Expands knowledge base using intelligent web search when local data is insufficient';
  
  private llm: LLMFunction;
  private firecrawlService = getFirecrawlService();
  private vectorStore: VectorStore | null;
  private config?: { enableWebSearch?: boolean };
  
  constructor(llm: LLMFunction, vectorStore?: VectorStore, config?: { enableWebSearch?: boolean }) {
    super();
    this.llm = llm;
    this.vectorStore = vectorStore || null;
    this.config = config;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🌐 WebSearchAgent: Expanding knowledge base for "${context.query}"`);
    
    // 🚨 CRITICAL: Check if web search is disabled by configuration
    if (this.config?.enableWebSearch === false) {
      console.log(`⏭️ WebSearchAgent disabled by configuration - skipping web search`);
      this.setReasoning('Web search disabled by user configuration');
      return context;
    }
    
    // Check if web search is needed
    const searchNeeded = this.isWebSearchNeeded(context);
    if (!searchNeeded.needed) {
      console.log(`⏭️ Web search not needed: ${searchNeeded.reason}`);
      this.setReasoning(`Web search skipped: ${searchNeeded.reason}`);
      return context;
    }
    
    console.log(`🔍 Web search needed: ${searchNeeded.reason}`);
    
    // Create search strategy using PatternGenerator results for targeted queries
    const searchStrategy = await this.createIntelligentSearchStrategy(context);
    console.log(`📋 Search strategy:`, searchStrategy);
    
    // Execute web search (placeholder for Firecrawl integration)
    const webResults = await this.executeWebSearch(searchStrategy, context);
    
    // Add web results to context
    if (webResults.length > 0) {
      context.ragResults.chunks.push(...webResults);
      context.ragResults.summary += ` | Web expansion: ${webResults.length} additional sources found`;
      
      // Update metadata
      context.metadata.totalChunksProcessed += webResults.length;
      context.metadata.agentsInvolved.push('WebSearchAgent');
      
      // Save useful web content to VectorStore as virtual documents for persistence
      await this.saveWebResultsToVectorStore(webResults, context);
    }
    
    // Store insights
    context.sharedKnowledge.agentFindings.WebSearchAgent = {
      strategy: searchStrategy,
      resultsCount: webResults.length,
      searchQueries: searchStrategy.searchQueries,
      timestamp: Date.now()
    };
    
    this.setReasoning(`Web search executed: ${searchStrategy.searchQueries.length} queries → ${webResults.length} additional sources found`);
    
    console.log(`✅ Web search completed: ${webResults.length} new sources added`);
    return context;
  }
  
  private isWebSearchNeeded(context: ResearchContext): { needed: boolean; reason: string } {
    // Check execution plan guidance
    const executionPlan = context.sharedKnowledge.executionPlan;
    if (executionPlan?.expectedDataSources?.includes('web search')) {
      return { needed: true, reason: 'Execution plan recommends web search' };
    }
    
    // Check for insufficient local data
    const relevantChunks = this.countRelevantChunks(context);
    if (relevantChunks < 3) {
      return { needed: true, reason: `Only ${relevantChunks} relevant local chunks found` };
    }
    
    // Check for specific indicators in query
    const query = context.query.toLowerCase();
    const webIndicators = ['latest', 'recent', 'current', 'news', 'today', 'now', '2024', '2025'];
    const hasWebIndicators = webIndicators.some(indicator => query.includes(indicator));
    if (hasWebIndicators) {
      return { needed: true, reason: 'Query indicates need for current/recent information' };
    }
    
    // Check if DataInspector found no relevant documents
    if (context.documentAnalysis?.documents?.length === 0) {
      return { needed: true, reason: 'No relevant documents found in local knowledge base' };
    }
    
    return { needed: false, reason: 'Sufficient local data available' };
  }
  
  private countRelevantChunks(context: ResearchContext): number {
    const query = context.query.toLowerCase();
    const queryKeywords = this.extractKeywords(query);
    
    return context.ragResults.chunks.filter(chunk => {
      const content = chunk.text.toLowerCase();
      return queryKeywords.some(keyword => content.includes(keyword));
    }).length;
  }
  
  private extractKeywords(query: string): string[] {
    // Simple keyword extraction - could be enhanced with more sophisticated NLP
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'give', 'tell', 'show', 'me'];
    const words = query.toLowerCase().split(/\s+/).filter(word => 
      word.length > 2 && !stopWords.includes(word)
    );
    return words;
  }
  
  /**
   * Create intelligent search strategy using PatternGenerator results for targeted queries
   * This leverages pattern analysis to create more specific and effective web searches
   */
  private async createIntelligentSearchStrategy(context: ResearchContext): Promise<WebSearchStrategy> {
    // Check if PatternGenerator has been run and generated useful patterns
    const patterns = context.patterns || [];
    const hasPatterns = patterns.length > 0 && patterns.some(p => p.regexPattern);
    
    if (hasPatterns) {
      console.log(`🧠 Using PatternGenerator results to create targeted search queries`);
      return await this.createPatternBasedStrategy(context);
    } else {
      console.log(`📝 No patterns available, falling back to standard search strategy`);
      return await this.createSearchStrategy(context);
    }
  }

  /**
   * Create pattern-based search strategy using PatternGenerator intelligence
   */
  private async createPatternBasedStrategy(context: ResearchContext): Promise<WebSearchStrategy> {
    const patterns = context.patterns || [];
    const query = context.query;
    
    // Extract pattern-based search terms
    const patternTerms = patterns
      .filter(p => p.description && p.description.length > 5)
      .map(p => p.description.replace(/[^\w\s]/g, '').trim())
      .filter(term => term.length > 0)
      .slice(0, 3); // Limit to top 3 pattern-derived terms
    
    // Analyze document analysis for entity extraction
    const documentAnalysis = context.documentAnalysis;
    const entityTerms: string[] = [];
    
    if (documentAnalysis?.documents) {
      for (const doc of documentAnalysis.documents) {
        if (doc.analysis?.primaryEntity && doc.analysis.primaryEntity !== 'Unknown Entity') {
          entityTerms.push(doc.analysis.primaryEntity);
        }
      }
    }
    
    // Create pattern-enhanced search queries
    const searchQueries: string[] = [
      query, // Original query
    ];
    
    // Add pattern-based queries
    if (patternTerms.length > 0) {
      searchQueries.push(`${patternTerms[0]} ${query}`);
      if (patternTerms.length > 1) {
        searchQueries.push(`${patternTerms.join(' ')}`);
      }
    }
    
    // Add entity-based queries
    if (entityTerms.length > 0) {
      const uniqueEntities = [...new Set(entityTerms)];
      searchQueries.push(`${uniqueEntities[0]} ${query}`);
      if (uniqueEntities.length > 1) {
        searchQueries.push(`${uniqueEntities.join(' OR ')}`);
      }
    }
    
    // Determine target sites based on patterns and entities
    let targetSites = ['github.com', 'linkedin.com', 'medium.com', 'stackoverflow.com'];
    let expectedContentTypes = ['technical content', 'professional profiles', 'project documentation'];
    
    // Enhance based on query analysis
    const queryLower = query.toLowerCase();
    if (queryLower.includes('project') || queryLower.includes('portfolio')) {
      targetSites = ['github.com', 'gitlab.com', 'bitbucket.org', 'personal websites'];
      expectedContentTypes = ['code repositories', 'project portfolios', 'technical blogs'];
    } else if (queryLower.includes('company') || queryLower.includes('business')) {
      targetSites = ['linkedin.com', 'crunchbase.com', 'company websites'];
      expectedContentTypes = ['business profiles', 'company information', 'professional networking'];
    } else if (queryLower.includes('research') || queryLower.includes('academic')) {
      targetSites = ['scholar.google.com', 'arxiv.org', 'researchgate.net'];
      expectedContentTypes = ['academic papers', 'research publications', 'scholarly articles'];
    }
    
    return {
      searchQueries: searchQueries.slice(0, 3), // Limit to 3 queries for performance
      targetSites: targetSites.slice(0, 4),
      expectedContentTypes,
      maxResults: 6, // Slightly higher than fallback for pattern-based searches
      reasoning: `Pattern-based strategy: leveraging ${patterns.length} patterns and ${entityTerms.length} entities for targeted search`
    };
  }

  private async createSearchStrategy(context: ResearchContext): Promise<WebSearchStrategy> {
    const prompt = `Create an intelligent web search strategy for this research query:

QUERY: "${context.query}"

LOCAL DATA ANALYSIS:
- Available chunks: ${context.ragResults.chunks.length}
- Document types: ${context.documentAnalysis?.documentTypes || 'Unknown'}
- Relevant documents: ${context.documentAnalysis?.documents?.length || 0}

EXECUTION PLAN CONTEXT:
${context.sharedKnowledge.executionPlan ? `
Strategy: ${context.sharedKnowledge.executionPlan.strategy}
Expected Sources: ${context.sharedKnowledge.executionPlan.expectedDataSources.join(', ')}
` : 'No execution plan available'}

Create an optimal web search strategy:

1. **SEARCH QUERIES**: What specific queries should be used? (3-5 queries max)
   - Include variations and synonyms
   - Consider different phrasings
   - Focus on what's missing from local data

2. **TARGET SITES**: What types of sites are most likely to have this information?
   - Professional portfolios, GitHub, LinkedIn for personal projects
   - Company websites, blogs for business information
   - News sites, forums for current information

3. **EXPECTED CONTENT TYPES**: What content formats are we looking for?
   - Portfolio pages, project descriptions, resumes
   - Blog posts, articles, documentation
   - Social media profiles, professional listings

4. **MAX RESULTS**: How many results should we process? (balance quality vs speed)

5. **REASONING**: Why is this strategy optimal for the query?

Return as JSON:
{
  "searchQueries": ["query1", "query2", "query3"],
  "targetSites": ["site-type1", "site-type2"],
  "expectedContentTypes": ["content-type1", "content-type2"], 
  "maxResults": 10,
  "reasoning": "why this strategy works"
}`;

    try {
      const response = await this.llm(prompt);
      const strategy = this.parseSearchStrategy(response);
      
      console.log(`🎯 Generated search strategy with ${strategy.searchQueries.length} queries`);
      return strategy;
      
    } catch (error) {
      console.error('❌ Failed to create search strategy:', error);
      
      // Fallback strategy
      const keywords = this.extractKeywords(context.query);
      return {
        searchQueries: [
          context.query,
          keywords.slice(0, 3).join(' '),
          `${keywords[0]} portfolio project`
        ],
        targetSites: ['github.com', 'linkedin.com', 'portfolio sites'],
        expectedContentTypes: ['portfolio', 'project description', 'professional profile'],
        maxResults: 5,
        reasoning: 'Fallback strategy using extracted keywords'
      };
    }
  }
  
  private parseSearchStrategy(response: string): WebSearchStrategy {
    try {
      const parsed = parseJsonWithResilience(response);
      
      return {
        searchQueries: Array.isArray(parsed.searchQueries) ? parsed.searchQueries : [response],
        targetSites: Array.isArray(parsed.targetSites) ? parsed.targetSites : ['general'],
        expectedContentTypes: Array.isArray(parsed.expectedContentTypes) ? parsed.expectedContentTypes : ['general'],
        maxResults: typeof parsed.maxResults === 'number' ? Math.min(parsed.maxResults, 20) : 10,
        reasoning: parsed.reasoning || 'Strategy created for knowledge expansion'
      };
    } catch (error) {
      throw new Error(`Failed to parse search strategy: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private async executeWebSearch(strategy: WebSearchStrategy, context: ResearchContext): Promise<ChunkData[]> {
    console.log(`🔍 WebSearch executing ${strategy.searchQueries.length} queries...`);
    
    if (!this.firecrawlService.isConfigured) {
      console.log(`⚠️ Firecrawl not configured, skipping web search`);
      return [];
    }
    
    const webChunks: ChunkData[] = [];
    
    for (const query of strategy.searchQueries) {
      try {
        console.log(`🌐 Executing Firecrawl search: "${query}"`);
        
        const searchResults = await this.firecrawlService.searchWeb(query, {
          limit: Math.min(strategy.maxResults, 3), // Limit per query
          maxContentLength: 2000,
          searchMode: 'web'
        });
        
        // Convert WebSearchResult to ChunkData format
        for (const result of searchResults.results) {
          const chunk: ChunkData = {
            id: `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            text: result.content || result.description || '',
            source: result.title || result.url,
            similarity: result.relevanceScore || 0.7,
            sourceType: 'web',
            metadata: {
              url: result.url,
              title: result.title,
              searchQuery: query,
              searchEngine: 'firecrawl',
              timestamp: Date.now(),
              agent: 'WebSearchAgent',
              domain: result.metadata.domain,
              crawlTime: result.metadata.crawlTime
            }
          };
          
          webChunks.push(chunk);
        }
        
        console.log(`✅ Found ${searchResults.results.length} results for "${query}"`);
        
      } catch (error) {
        console.error(`❌ Search failed for "${query}":`, error);
      }
    }
    
    console.log(`🌐 Web search completed: ${webChunks.length} web chunks added`);
    return webChunks;
  }

  /**
   * Save web search results to VectorStore as virtual documents for persistence
   * This ensures useful web content is available for future queries
   */
  private async saveWebResultsToVectorStore(webResults: ChunkData[], context: ResearchContext): Promise<void> {
    if (!this.vectorStore || !this.vectorStore.isInitialized) {
      console.log(`⚠️ VectorStore not available, skipping web results persistence`);
      return;
    }

    try {
      console.log(`💾 Saving ${webResults.length} web search results to VectorStore as virtual documents...`);
      
      // Group chunks by URL to create coherent documents
      const urlGroups = new Map<string, ChunkData[]>();
      
      for (const chunk of webResults) {
        const url = chunk.metadata?.url || 'unknown-url';
        if (!urlGroups.has(url)) {
          urlGroups.set(url, []);
        }
        urlGroups.get(url)!.push(chunk);
      }

      let savedCount = 0;
      
      for (const [url, chunks] of urlGroups) {
        try {
          // Create a cohesive document from chunks
          const title = chunks[0].metadata?.title || `Web Result: ${url}`;
          const content = chunks.map(chunk => chunk.text).join('\n\n');
          const searchQuery = chunks[0].metadata?.searchQuery || context.query;
          
          // Create virtual document with proper metadata
          const documentTitle = `${title} (Web Search: ${searchQuery})`;
          
          // Use VectorStore's addVirtualDocument method for WebSearchAgent results
          await this.vectorStore.addVirtualDocument(
            documentTitle,
            content,
            {
              source: 'websearch',
              url: url,
              title: title,
              searchQuery: searchQuery,
              domain: chunks[0].metadata?.domain || new URL(url).hostname,
              crawlTime: chunks[0].metadata?.crawlTime || Date.now(),
              agent: 'WebSearchAgent',
              chunkCount: chunks.length,
              relevanceScore: Math.max(...chunks.map(c => c.similarity || 0.7))
            }
          );
          
          savedCount++;
          console.log(`✅ Saved web document: ${documentTitle}`);
          
        } catch (error) {
          console.error(`❌ Failed to save web document for ${url}:`, error);
        }
      }
      
      if (savedCount > 0) {
        console.log(`💾 Successfully saved ${savedCount} virtual documents from web search to knowledge base`);
      }
      
    } catch (error) {
      console.error(`❌ Error saving web results to VectorStore:`, error);
    }
  }
}