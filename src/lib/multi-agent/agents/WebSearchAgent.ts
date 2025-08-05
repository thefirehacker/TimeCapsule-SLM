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
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🌐 WebSearchAgent: Expanding knowledge base for "${context.query}"`);
    
    // Check if web search is needed
    const searchNeeded = this.isWebSearchNeeded(context);
    if (!searchNeeded.needed) {
      console.log(`⏭️ Web search not needed: ${searchNeeded.reason}`);
      this.setReasoning(`Web search skipped: ${searchNeeded.reason}`);
      return context;
    }
    
    console.log(`🔍 Web search needed: ${searchNeeded.reason}`);
    
    // Create search strategy
    const searchStrategy = await this.createSearchStrategy(context);
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
    console.log(`🔍 Executing web search with ${strategy.searchQueries.length} queries...`);
    
    // TODO: Integrate with Firecrawl API
    // For now, return placeholder results to maintain system functionality
    
    const mockResults: ChunkData[] = [];
    
    for (let i = 0; i < strategy.searchQueries.length; i++) {
      const query = strategy.searchQueries[i];
      console.log(`🌐 [PLACEHOLDER] Searching for: "${query}"`);
      
      // Placeholder result structure
      const placeholderResult: ChunkData = {
        id: `web_search_${Date.now()}_${i}`,
        text: `[WEB SEARCH PLACEHOLDER] Results for "${query}" would appear here when Firecrawl integration is complete.`,
        source: `Web Search: ${query}`,
        similarity: 0.8,
        sourceType: 'web',
        metadata: {
          searchQuery: query,
          searchEngine: 'firecrawl_placeholder',
          timestamp: Date.now(),
          agent: 'WebSearchAgent'
        }
      };
      
      mockResults.push(placeholderResult);
    }
    
    console.log(`🌐 [PLACEHOLDER] Web search simulation complete: ${mockResults.length} placeholder results`);
    
    // In real implementation, this would:
    // 1. Use Firecrawl API to search and crawl results
    // 2. Extract content from found pages
    // 3. Process and chunk the content
    // 4. Return structured ChunkData objects
    
    return mockResults;
  }
}