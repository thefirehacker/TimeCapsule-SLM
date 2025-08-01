/**
 * Unified Web Search Service
 * Combines Firecrawl and DuckDuckGo search capabilities
 */

import {
  getFirecrawlService,
  WebSearchContext as FirecrawlSearchContext,
} from "./FirecrawlService";
import {
  getDuckDuckGoService,
  DuckDuckGoSearchContext,
} from "./DuckDuckGoService";

export type WebSearchProvider = "firecrawl" | "duckduckgo" | "both";

export interface UnifiedWebSearchResult {
  url: string;
  title: string;
  description: string;
  content: string;
  relevanceScore?: number;
  provider: "firecrawl" | "duckduckgo";
  metadata: {
    searchQuery: string;
    searchTime: number;
    contentLength: number;
    domain: string;
  };
}

export interface UnifiedWebSearchContext {
  query: string;
  results: UnifiedWebSearchResult[];
  contextText: string;
  metadata: {
    searchTime: number;
    resultCount: number;
    totalContentLength: number;
    domains: string[];
    avgRelevanceScore: number;
    providers: string[];
  };
}

export interface UnifiedWebSearchOptions {
  provider?: WebSearchProvider;
  limit?: number;
  maxContentLength?: number;
  language?: string;
  excludeDomains?: string[];
  includeDomains?: string[];
  searchMode?: "web" | "news" | "academic";
  safeSearch?: "strict" | "moderate" | "off";
}

export class UnifiedWebSearchService {
  private firecrawlService = getFirecrawlService();
  private duckDuckGoService = getDuckDuckGoService();

  async searchWeb(
    query: string,
    options: UnifiedWebSearchOptions = {}
  ): Promise<UnifiedWebSearchContext> {
    const {
      provider = "both",
      limit = 5,
      maxContentLength = 2000,
      language = "en",
      excludeDomains = [],
      includeDomains = [],
      searchMode = "web",
      safeSearch = "moderate",
    } = options;

    const startTime = Date.now();
    const allResults: UnifiedWebSearchResult[] = [];
    const providers: string[] = [];

    try {
      console.log(
        `🌐 Unified web search for: "${query}" with provider: ${provider}`
      );

      // Perform Firecrawl search if enabled
      if (provider === "firecrawl" || provider === "both") {
        if (this.firecrawlService.isConfigured) {
          try {
            console.log("🔥 Performing Firecrawl search...");
            const firecrawlResults = await this.firecrawlService.searchWeb(
              query,
              {
                limit: Math.ceil(limit / 2),
                excludeDomains,
                includeDomains,
                maxContentLength,
                searchMode,
                language,
              }
            );

            // Convert Firecrawl results to unified format
            const unifiedFirecrawlResults: UnifiedWebSearchResult[] =
              firecrawlResults.results.map((result) => ({
                url: result.url,
                title: result.title,
                description: result.description,
                content: result.content,
                relevanceScore: result.relevanceScore,
                provider: "firecrawl" as const,
                metadata: result.metadata,
              }));

            allResults.push(...unifiedFirecrawlResults);
            providers.push("firecrawl");
            console.log(
              `🔥 Firecrawl search completed: ${unifiedFirecrawlResults.length} results`
            );
          } catch (error) {
            console.error("❌ Firecrawl search failed:", error);
          }
        } else {
          console.log("⚠️ Firecrawl not configured, skipping...");
        }
      }

      // Perform DuckDuckGo search if enabled
      if (provider === "duckduckgo" || provider === "both") {
        try {
          console.log("🦆 Performing DuckDuckGo search...");
          const duckDuckGoResults = await this.duckDuckGoService.searchWeb(
            query,
            {
              limit: Math.ceil(limit / 2),
              maxContentLength,
              language,
              safeSearch,
            }
          );

          // Convert DuckDuckGo results to unified format
          const unifiedDuckDuckGoResults: UnifiedWebSearchResult[] =
            duckDuckGoResults.results.map((result) => ({
              url: result.url,
              title: result.title,
              description: result.description,
              content: result.content,
              relevanceScore: result.relevanceScore,
              provider: "duckduckgo" as const,
              metadata: result.metadata,
            }));

          allResults.push(...unifiedDuckDuckGoResults);
          providers.push("duckduckgo");
          console.log(
            `🦆 DuckDuckGo search completed: ${unifiedDuckDuckGoResults.length} results`
          );
        } catch (error) {
          console.error("❌ DuckDuckGo search failed:", error);
        }
      }

      // Sort all results by relevance score
      allResults.sort(
        (a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)
      );

      // Remove duplicates based on URL
      const uniqueResults = this.removeDuplicateResults(allResults);

      // Limit results
      const limitedResults = uniqueResults.slice(0, limit);

      // Generate context text
      const contextText = this.generateContextText(limitedResults);

      // Calculate metadata
      const searchTime = Date.now() - startTime;
      const avgRelevanceScore =
        limitedResults.length > 0
          ? limitedResults.reduce(
              (sum, r) => sum + (r.relevanceScore || 0),
              0
            ) / limitedResults.length
          : 0;

      const totalContentLength = limitedResults.reduce(
        (sum, r) => sum + r.content.length,
        0
      );

      const domains = new Set<string>();
      limitedResults.forEach((result) => {
        try {
          const domain = new URL(result.url).hostname;
          domains.add(domain);
        } catch (error) {
          console.warn("⚠️ Failed to extract domain from URL:", result.url);
        }
      });

      const context: UnifiedWebSearchContext = {
        query,
        results: limitedResults,
        contextText,
        metadata: {
          searchTime,
          resultCount: limitedResults.length,
          totalContentLength,
          domains: Array.from(domains),
          avgRelevanceScore,
          providers,
        },
      };

      console.log(`🌐 Unified web search completed in ${searchTime}ms:`, {
        query: query.substring(0, 50) + (query.length > 50 ? "..." : ""),
        resultsFound: limitedResults.length,
        providers: providers,
        domains: Array.from(domains),
        avgRelevance: avgRelevanceScore.toFixed(3),
      });

      return context;
    } catch (error) {
      console.error("❌ Unified web search failed:", error);
      throw new Error(
        `Unified web search failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private removeDuplicateResults(
    results: UnifiedWebSearchResult[]
  ): UnifiedWebSearchResult[] {
    const seen = new Set<string>();
    return results.filter((result) => {
      const key = result.url.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private generateContextText(results: UnifiedWebSearchResult[]): string {
    let contextText = "";

    for (const result of results) {
      const providerIcon = result.provider === "firecrawl" ? "🔥" : "🦆";
      contextText += `${providerIcon} **${result.title}** (${result.url})\n`;
      contextText += `${result.content}\n\n`;
    }

    return contextText.trim();
  }

  /**
   * Get available search providers
   */
  getAvailableProviders(): {
    firecrawl: boolean;
    duckduckgo: boolean;
  } {
    return {
      firecrawl: this.firecrawlService.isConfigured,
      duckduckgo: true, // DuckDuckGo is always available (no API key required)
    };
  }

  /**
   * Get service status
   */
  getStatus(): {
    firecrawl: {
      configured: boolean;
      ready: boolean;
    };
    duckduckgo: {
      ready: boolean;
    };
  } {
    return {
      firecrawl: {
        configured: this.firecrawlService.isConfigured,
        ready: this.firecrawlService.isReady,
      },
      duckduckgo: {
        ready: this.duckDuckGoService.isReady,
      },
    };
  }

  /**
   * Configure Firecrawl API key
   */
  configureFirecrawl(apiKey: string): void {
    this.firecrawlService.setApiKey(apiKey);
  }

  /**
   * Get current Firecrawl API key (for display purposes)
   */
  getFirecrawlApiKey(): string | null {
    return this.firecrawlService.getCurrentApiKey();
  }
}

// Singleton instance
let unifiedWebSearchServiceInstance: UnifiedWebSearchService | null = null;

export function getUnifiedWebSearchService(): UnifiedWebSearchService {
  if (!unifiedWebSearchServiceInstance) {
    unifiedWebSearchServiceInstance = new UnifiedWebSearchService();
  }
  return unifiedWebSearchServiceInstance;
}

export function resetUnifiedWebSearchService(): void {
  unifiedWebSearchServiceInstance = null;
}
