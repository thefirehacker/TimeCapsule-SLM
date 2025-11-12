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
    scrapingFailed?: boolean;
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
  
  // Known unsupported domains that Firecrawl cannot scrape
  private static readonly UNSUPPORTED_DOMAINS = [
    'x.com',
    'twitter.com',
    'instagram.com',
    'facebook.com',
    'linkedin.com'
  ];
  
  // Domains that may have rate limiting issues
  private static readonly RATE_LIMITED_DOMAINS = [
    'github.com',
    'gitlab.com',
    'bitbucket.org'
  ];
  
  // Track temporarily failed domains (will retry after cooldown)
  private temporarilyFailedDomains = new Map<string, number>();
  private readonly FAILURE_COOLDOWN_MS = 300000; // 5 minutes

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

      // Process search results - scrape top results for content
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

          // Check if domain is supported before attempting to scrape
          let scrapedResult: WebSearchResult | null = null;
          
          if (!this.isDomainSupported(result.url)) {
            console.log(`⚠️ Skipping scrape for unsupported domain: ${domain}`);
          } else if (this.isDomainRateLimited(result.url)) {
            console.log(`⚠️ Rate-limited domain ${domain}, attempting with caution`);
            // Still try but with awareness of potential rate limiting
            scrapedResult = await this.scrapeUrl(result.url);
          } else {
            // Try to scrape the URL for full content
            scrapedResult = await this.scrapeUrl(result.url);
          }
          
          if (scrapedResult) {
            // Use scraped content with original search metadata
            results.push({
              ...scrapedResult,
              title: result.title || scrapedResult.title,
              description: result.description || scrapedResult.description,
              metadata: {
                ...scrapedResult.metadata,
                searchQuery: query,
                searchTime: searchTime,
              },
            });
            console.log(`✅ Scraped and processed: ${result.title} (${result.url})`);
          } else {
            // Fallback to search result data if scraping fails
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
                scrapingFailed: true, // Mark that scraping was attempted but failed
              },
            });
            console.log(`⚠️ Using search data only for: ${result.title} (${result.url})`);
          }
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
  
  /**
   * Check if a domain is supported for scraping
   */
  private isDomainSupported(url: string): boolean {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      
      // Check if domain is in unsupported list
      for (const unsupported of FirecrawlService.UNSUPPORTED_DOMAINS) {
        if (domain.includes(unsupported)) {
          return false;
        }
      }
      
      // Check if domain is temporarily failed (with cooldown)
      const failedTime = this.temporarilyFailedDomains.get(domain);
      if (failedTime && Date.now() - failedTime < this.FAILURE_COOLDOWN_MS) {
        return false;
      }
      
      return true;
    } catch {
      return true; // If URL parsing fails, let scraping attempt handle it
    }
  }
  
  /**
   * Check if a domain might be rate limited
   */
  private isDomainRateLimited(url: string): boolean {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      return FirecrawlService.RATE_LIMITED_DOMAINS.some(limited => 
        domain.includes(limited)
      );
    } catch {
      return false;
    }
  }
  
  /**
   * Add domain to temporarily failed list
   */
  private addToTemporarilyFailed(url: string): void {
    try {
      const domain = new URL(url).hostname.toLowerCase();
      this.temporarilyFailedDomains.set(domain, Date.now());
      
      // Clean up old entries
      for (const [failedDomain, failedTime] of this.temporarilyFailedDomains.entries()) {
        if (Date.now() - failedTime > this.FAILURE_COOLDOWN_MS) {
          this.temporarilyFailedDomains.delete(failedDomain);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  private generateContextText(results: WebSearchResult[]): string {
    let contextText = "";

    for (const result of results) {
      contextText += `**${result.title}** (${result.url})\n`;
      contextText += `${result.content}\n\n`;
    }

    return contextText.trim();
  }

  async scrapeUrl(url: string, retryCount = 0): Promise<WebSearchResult | null> {
    const MAX_RETRIES = 2;
    const RETRY_DELAY_MS = 1000;
    
    if (!this.isInitialized || !this.firecrawl) {
      await this.initialize();
    }

    if (!this.firecrawl) {
      throw new Error("Firecrawl service not available");
    }

    const startTime = Date.now();

    try {
      console.log(`🌐 Scraping content from: ${url}${retryCount > 0 ? ` (retry ${retryCount}/${MAX_RETRIES})` : ''}`);

      // Use Firecrawl to scrape the URL
      const scrapeResult = await this.firecrawl.scrapeUrl(url, {
        formats: ["markdown"],
        waitFor: 1000, // Wait for page to load
        timeout: 10000 // 10 second timeout
      });

      if (!scrapeResult.success || !scrapeResult.data) {
        console.error(`❌ Failed to scrape ${url}`);
        return null;
      }

      const crawlTime = Date.now() - startTime;
      const domain = new URL(url).hostname;
      const content = scrapeResult.data.markdown || scrapeResult.data.content || "";

      // Limit content length
      const maxContentLength = 5000;
      const truncatedContent = content.length > maxContentLength
        ? content.substring(0, maxContentLength) + "..."
        : content;

      const result: WebSearchResult = {
        url: url,
        title: scrapeResult.data.title || "Untitled",
        description: scrapeResult.data.description || "",
        content: truncatedContent,
        markdown: scrapeResult.data.markdown,
        relevanceScore: 0.8, // Default high relevance for scraped content
        metadata: {
          searchQuery: "", // Will be filled by caller
          searchTime: 0, // Will be filled by caller
          crawlTime: crawlTime,
          contentLength: content.length,
          domain: domain,
        },
      };

      console.log(
        `✅ Scraped ${url}: ${content.length} chars in ${crawlTime}ms`
      );
      return result;
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const statusCode = error.response?.status;
      
      // Handle different error scenarios
      if (statusCode === 403) {
        // Check if it's a "website not supported" error
        if (errorMessage.includes("no longer supported") || errorMessage.includes("not supported")) {
          console.error(`🚫 ${url} is not supported by Firecrawl API`);
          this.addToTemporarilyFailed(url);
          return null;
        }
        
        // Other 403 errors might be temporary
        console.error(`⛔ Access forbidden for ${url}: ${errorMessage}`);
        
        // Retry for rate-limited domains
        if (this.isDomainRateLimited(url) && retryCount < MAX_RETRIES) {
          console.log(`⏳ Waiting ${RETRY_DELAY_MS * (retryCount + 1)}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (retryCount + 1)));
          return this.scrapeUrl(url, retryCount + 1);
        }
        
        this.addToTemporarilyFailed(url);
        return null;
      }
      
      // Handle timeout errors with retry
      if ((errorMessage.includes("timeout") || errorMessage.includes("ETIMEDOUT")) && retryCount < MAX_RETRIES) {
        console.log(`⏱️ Timeout for ${url}, retrying...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        return this.scrapeUrl(url, retryCount + 1);
      }
      
      // Log other errors
      console.error(
        `❌ Scraping failed for ${url}:`,
        errorMessage
      );
      
      // For persistent failures, add to temporary failed list
      if (retryCount >= MAX_RETRIES) {
        this.addToTemporarilyFailed(url);
      }
      
      return null;
    }
  }

  /**
   * Set API key dynamically (useful for client-side configuration)
   */
  setApiKey(apiKey: string | null): void {
    const sanitized = apiKey?.trim() || null;

    if (!sanitized) {
      this.apiKey = null;
      this.isInitialized = false;
      this.firecrawl = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("firecrawl_api_key");
      }

      return;
    }

    this.apiKey = sanitized;
    this.isInitialized = false;
    this.firecrawl = null;

    if (typeof window !== "undefined") {
      localStorage.setItem("firecrawl_api_key", sanitized);
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
  
  /**
   * Get scraping statistics and status
   */
  getScrapingStatus(): {
    unsupportedDomains: string[];
    temporarilyFailedDomains: string[];
    rateLimitedDomains: string[];
  } {
    const temporarilyFailed: string[] = [];
    const now = Date.now();
    
    for (const [domain, failedTime] of this.temporarilyFailedDomains.entries()) {
      if (now - failedTime < this.FAILURE_COOLDOWN_MS) {
        temporarilyFailed.push(domain);
      }
    }
    
    return {
      unsupportedDomains: [...FirecrawlService.UNSUPPORTED_DOMAINS],
      temporarilyFailedDomains: temporarilyFailed,
      rateLimitedDomains: [...FirecrawlService.RATE_LIMITED_DOMAINS]
    };
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
