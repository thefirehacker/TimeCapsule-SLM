/**
 * DuckDuckGo Service for Web Search Integration
 * Handles web search using DuckDuckGo's instant answer API
 */

export interface DuckDuckGoSearchResult {
  url: string;
  title: string;
  description: string;
  content: string;
  relevanceScore?: number;
  metadata: {
    searchQuery: string;
    searchTime: number;
    contentLength: number;
    domain: string;
  };
}

export interface DuckDuckGoSearchContext {
  query: string;
  results: DuckDuckGoSearchResult[];
  contextText: string;
  metadata: {
    searchTime: number;
    resultCount: number;
    totalContentLength: number;
    domains: string[];
    avgRelevanceScore: number;
  };
}

export interface DuckDuckGoSearchOptions {
  limit?: number;
  maxContentLength?: number;
  language?: string;
  region?: string;
  safeSearch?: "strict" | "moderate" | "off";
}

export class DuckDuckGoService {
  private isInitialized = false;
  private baseUrl = "https://api.duckduckgo.com/";

  constructor() {
    this.isInitialized = true;
  }

  async searchWeb(
    query: string,
    options: DuckDuckGoSearchOptions = {}
  ): Promise<DuckDuckGoSearchContext> {
    if (!this.isInitialized) {
      throw new Error("DuckDuckGo service not initialized");
    }

    const {
      limit = 5,
      maxContentLength = 2000,
      language = "en",
      region = "us",
      safeSearch = "moderate",
    } = options;

    const startTime = Date.now();

    try {
      console.log(`🦆 Searching DuckDuckGo for: "${query}"`);

      // DuckDuckGo Instant Answer API
      const searchUrl = new URL(this.baseUrl);
      searchUrl.searchParams.set("q", query);
      searchUrl.searchParams.set("format", "json");
      searchUrl.searchParams.set("no_html", "1");
      searchUrl.searchParams.set("skip_disambig", "1");
      searchUrl.searchParams.set("t", "timecapsule");

      console.log(`🦆 Making request to: ${searchUrl.toString()}`);
      const response = await fetch(searchUrl.toString(), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "TimeCapsuleSLM/1.0",
        },
      });
      console.log(`🦆 Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`DuckDuckGo API error: ${response.status}`);
      }

      const data = await response.json();
      const searchTime = Date.now() - startTime;

      console.log(`🦆 Raw DuckDuckGo response:`, data);

      // Process DuckDuckGo results
      const results: DuckDuckGoSearchResult[] = [];
      const domains = new Set<string>();

      // Handle Abstract (main result)
      if (data.Abstract && data.AbstractURL) {
        const domain = new URL(data.AbstractURL).hostname;
        domains.add(domain);

        const content = data.Abstract.substring(0, maxContentLength);
        results.push({
          url: data.AbstractURL,
          title: data.Heading || "DuckDuckGo Result",
          description: data.Abstract,
          content: content,
          relevanceScore: this.calculateRelevanceScore(query, content),
          metadata: {
            searchQuery: query,
            searchTime: searchTime,
            contentLength: content.length,
            domain: domain,
          },
        });
      }

      // Handle Related Topics
      if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
        for (const topic of data.RelatedTopics.slice(
          0,
          limit - results.length
        )) {
          if (topic.FirstURL && topic.Text) {
            try {
              const domain = new URL(topic.FirstURL).hostname;
              domains.add(domain);

              const content = topic.Text.substring(0, maxContentLength);
              results.push({
                url: topic.FirstURL,
                title: topic.Text.split(" - ")[0] || "Related Topic",
                description: topic.Text,
                content: content,
                relevanceScore: this.calculateRelevanceScore(query, content),
                metadata: {
                  searchQuery: query,
                  searchTime: searchTime,
                  contentLength: content.length,
                  domain: domain,
                },
              });
            } catch (error) {
              console.warn("⚠️ Failed to process related topic:", error);
            }
          }
        }
      }

      // Handle Answer (if available)
      if (data.Answer && data.AnswerType && !data.AnswerType.includes("calc")) {
        const answerUrl = data.AnswerURL || data.AbstractURL;
        if (answerUrl) {
          try {
            const domain = new URL(answerUrl).hostname;
            domains.add(domain);

            const content = data.Answer.substring(0, maxContentLength);
            results.push({
              url: answerUrl,
              title: data.Heading || "DuckDuckGo Answer",
              description: data.Answer,
              content: content,
              relevanceScore: this.calculateRelevanceScore(query, content),
              metadata: {
                searchQuery: query,
                searchTime: searchTime,
                contentLength: content.length,
                domain: domain,
              },
            });
          } catch (error) {
            console.warn("⚠️ Failed to process answer:", error);
          }
        }
      }

      // Sort by relevance score
      results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

      // Limit results
      const limitedResults = results.slice(0, limit);

      // Generate context text
      const contextText = this.generateContextText(limitedResults);

      // Calculate metadata
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

      const context: DuckDuckGoSearchContext = {
        query,
        results: limitedResults,
        contextText,
        metadata: {
          searchTime,
          resultCount: limitedResults.length,
          totalContentLength,
          domains: Array.from(domains),
          avgRelevanceScore,
        },
      };

      console.log(`🦆 DuckDuckGo search completed in ${searchTime}ms:`, {
        query: query.substring(0, 50) + (query.length > 50 ? "..." : ""),
        resultsFound: limitedResults.length,
        domains: Array.from(domains),
        avgRelevance: avgRelevanceScore.toFixed(3),
      });

      return context;
    } catch (error) {
      console.error("❌ DuckDuckGo search failed:", error);
      throw new Error(
        `DuckDuckGo search failed: ${error instanceof Error ? error.message : String(error)}`
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

  private generateContextText(results: DuckDuckGoSearchResult[]): string {
    let contextText = "";

    for (const result of results) {
      contextText += `**${result.title}** (${result.url})\n`;
      contextText += `${result.content}\n\n`;
    }

    return contextText.trim();
  }

  /**
   * Check if service is ready
   */
  get isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get current status
   */
  getStatus(): {
    initialized: boolean;
    ready: boolean;
  } {
    return {
      initialized: this.isInitialized,
      ready: this.isReady,
    };
  }
}

// Singleton instance
let duckDuckGoServiceInstance: DuckDuckGoService | null = null;

export function getDuckDuckGoService(): DuckDuckGoService {
  if (!duckDuckGoServiceInstance) {
    duckDuckGoServiceInstance = new DuckDuckGoService();
  }
  return duckDuckGoServiceInstance;
}

export function resetDuckDuckGoService(): void {
  duckDuckGoServiceInstance = null;
}
