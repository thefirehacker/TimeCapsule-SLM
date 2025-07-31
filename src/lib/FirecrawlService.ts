/**
 * Firecrawl Service for Web Search Integration
 * Handles web crawling, content extraction, and integration with RAG system
 */

import FirecrawlApp, {
  ScrapeResponse,
  SearchResponse,
} from "@mendable/firecrawl-js";

export interface WebSearchResult {
  url: string;
  title: string;
  description: string;
  content: string;
  markdown?: string;
  relevanceScore?: number;
  metadata: {
    searchQuery: string;
    searchTime: number;
    crawlTime: number;
    contentLength: number;
    domain: string;
  };
}

export interface WebSearchContext {
  query: string;
  results: WebSearchResult[];
  contextText: string;
  metadata: {
    searchTime: number;
    resultCount: number;
    totalContentLength: number;
    domains: string[];
    avgRelevanceScore: number;
  };
}

export interface WebSearchOptions {
  limit?: number;
  excludeDomains?: string[];
  includeDomains?: string[];
  maxContentLength?: number;
  searchMode?: "web" | "news" | "academic";
  language?: string;
}

export class FirecrawlService {
  private firecrawl: FirecrawlApp | null = null;
  private isInitialized = false;
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY || null;

    if (typeof window !== "undefined") {
      // For client-side, try to get from localStorage as fallback
      this.apiKey = this.apiKey || localStorage.getItem("firecrawl_api_key");
    }
  }

  async initialize(apiKey?: string): Promise<void> {
    if (this.isInitialized && this.firecrawl) return;

    try {
      const key = apiKey || this.apiKey;

      if (!key) {
        throw new Error("Firecrawl API key is required");
      }

      this.firecrawl = new FirecrawlApp({ apiKey: key });
      this.apiKey = key;
      this.isInitialized = true;

      // Store API key in localStorage for client-side access
      if (typeof window !== "undefined") {
        localStorage.setItem("firecrawl_api_key", key);
      }

      console.log("🔥 Firecrawl service initialized successfully");
    } catch (error) {
      console.error("❌ Firecrawl initialization failed:", error);
      throw new Error("Failed to initialize Firecrawl service");
    }
  }

  async searchWeb(
    query: string,
    options: WebSearchOptions = {}
  ): Promise<WebSearchContext> {
    if (!this.isInitialized || !this.firecrawl) {
      await this.initialize();
    }

    if (!this.firecrawl) {
      throw new Error("Firecrawl service not available");
    }

    const {
      limit = 5,
      excludeDomains = [],
      includeDomains = [],
      maxContentLength = 2000,
      searchMode = "web",
      language = "en",
    } = options;

    const startTime = Date.now();

    try {
      console.log(`🔍 Searching web for: "${query}"`);

      // Perform web search using Firecrawl
      const searchResults = await this.firecrawl.search(query, {
        limit: limit,
        excludeDomains: excludeDomains,
        includeDomains: includeDomains.length > 0 ? includeDomains : undefined,
        lang: language,
      });

      if (!searchResults.success || !searchResults.data) {
        throw new Error("Web search failed");
      }

      const searchTime = Date.now() - startTime;
      console.log(
        `🔍 Raw search results:`,
        searchResults.data.length,
        "results found"
      );

      // Process search results - use search data directly for now
      const results: WebSearchResult[] = [];
      const domains = new Set<string>();

      for (const result of searchResults.data.slice(0, limit)) {
        // Skip if URL is undefined
        if (!result.url) {
          console.warn("⚠️ Skipping result with undefined URL");
          continue;
        }

        try {
          const domain = new URL(result.url).hostname;
          domains.add(domain);

          // Use search result data directly (no scraping for now)
          const content = result.description || result.title || "";

          results.push({
            url: result.url,
            title: result.title || "Untitled",
            description: result.description || "",
            content: content,
            relevanceScore: this.calculateRelevanceScore(query, content),
            metadata: {
              searchQuery: query,
              searchTime: searchTime,
              crawlTime: 0, // No scraping
              contentLength: content.length,
              domain: domain,
            },
          });

          console.log(`✅ Processed result: ${result.title} (${result.url})`);
        } catch (error) {
          console.error(
            `❌ Failed to process ${result.url}:`,
            error instanceof Error ? error.message : String(error)
          );
        }
      }

      // Sort by relevance score
      results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

      // Generate context text
      const contextText = this.generateContextText(results);

      // Calculate metadata
      const avgRelevanceScore =
        results.length > 0
          ? results.reduce((sum, r) => sum + (r.relevanceScore || 0), 0) /
            results.length
          : 0;

      const totalContentLength = results.reduce(
        (sum, r) => sum + r.content.length,
        0
      );

      const context: WebSearchContext = {
        query,
        results,
        contextText,
        metadata: {
          searchTime,
          resultCount: results.length,
          totalContentLength,
          domains: Array.from(domains),
          avgRelevanceScore,
        },
      };

      console.log(`🌐 Web search completed in ${searchTime}ms:`, {
        query: query.substring(0, 50) + (query.length > 50 ? "..." : ""),
        resultsFound: results.length,
        domains: Array.from(domains),
        avgRelevance: avgRelevanceScore.toFixed(3),
        rawResults: searchResults.data.length,
      });

      return context;
    } catch (error) {
      console.error("❌ Web search failed:", error);
      throw new Error(
        `Web search failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private calculateRelevanceScore(query: string, content: string): number {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const contentLower = content.toLowerCase();

    let score = 0;
    const totalTerms = queryTerms.length;

    for (const term of queryTerms) {
      const termCount = (contentLower.match(new RegExp(term, "g")) || [])
        .length;
      score += Math.min(termCount / 10, 1); // Cap contribution per term
    }

    return Math.min(score / totalTerms, 1); // Normalize to 0-1
  }

  private generateContextText(results: WebSearchResult[]): string {
    let contextText = "";

    for (const result of results) {
      contextText += `**${result.title}** (${result.url})\n`;
      contextText += `${result.content}\n\n`;
    }

    return contextText.trim();
  }

  async scrapeUrl(url: string): Promise<WebSearchResult | null> {
    // For now, return null to avoid API issues
    // TODO: Implement proper scraping once API structure is clarified
    console.warn("🚧 Scraping functionality temporarily disabled");
    return null;
  }

  /**
   * Set API key dynamically (useful for client-side configuration)
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.isInitialized = false;
    this.firecrawl = null;

    if (typeof window !== "undefined") {
      localStorage.setItem("firecrawl_api_key", apiKey);
    }
  }

  /**
   * Check if service is ready
   */
  get isReady(): boolean {
    return (
      this.isInitialized && this.firecrawl !== null && this.apiKey !== null
    );
  }

  /**
   * Check if API key is configured (either from env or localStorage)
   */
  get isConfigured(): boolean {
    return this.apiKey !== null;
  }

  /**
   * Get current status
   */
  getStatus(): {
    initialized: boolean;
    hasApiKey: boolean;
    ready: boolean;
    configured: boolean;
  } {
    return {
      initialized: this.isInitialized,
      hasApiKey: this.apiKey !== null,
      ready: this.isReady,
      configured: this.isConfigured,
    };
  }

  /**
   * Get the current API key (for display purposes)
   */
  getCurrentApiKey(): string | null {
    return this.apiKey;
  }
}

// Singleton instance
let firecrawlServiceInstance: FirecrawlService | null = null;

export function getFirecrawlService(): FirecrawlService {
  if (!firecrawlServiceInstance) {
    firecrawlServiceInstance = new FirecrawlService();
  }
  return firecrawlServiceInstance;
}

export function resetFirecrawlService(): void {
  firecrawlServiceInstance = null;
}
