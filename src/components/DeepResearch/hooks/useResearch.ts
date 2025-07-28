import { useState, useCallback } from "react";
import { VectorStore } from "@/components/VectorStore/VectorStore";
import { useOllamaConnection } from "./useOllamaConnection";
import { getRAGService, RAGContext, RAGSearchOptions } from "@/lib/RAGService";
import {
  getFirecrawlService,
  WebSearchContext,
  WebSearchOptions,
} from "@/lib/FirecrawlService";

export type ResearchType =
  | "deep-research"
  | "social"
  | "finance"
  | "academic"
  | "technical"
  | "market";

export interface ResearchConfig {
  type: ResearchType;
  depth: "quick" | "detailed" | "comprehensive";
  includeWebSearch?: boolean;
  webSearchOptions?: WebSearchOptions;
}

export interface UseResearchReturn {
  prompt: string;
  setPrompt: (prompt: string) => void;
  researchConfig: ResearchConfig;
  setResearchConfig: (config: ResearchConfig) => void;
  isGenerating: boolean;
  results: string;
  thinkingOutput: string;
  isStreaming: boolean;
  connectionState: any;
  connectAI: (baseURL: string, model?: string) => Promise<boolean>;
  disconnectAI: () => void;
  testConnection: (
    baseURL: string
  ) => Promise<{ success: boolean; models: string[] }>;
  isAIReady: boolean;

  // RAG Integration
  ragContext: RAGContext | null;
  isRAGSearching: boolean;
  performRAGSearch: (
    query: string,
    options?: RAGSearchOptions
  ) => Promise<RAGContext | null>;
  clearRAGContext: () => void;

  // Web Search Integration
  webSearchContext: WebSearchContext | null;
  isWebSearching: boolean;
  performWebSearch: (
    query: string,
    options?: WebSearchOptions
  ) => Promise<WebSearchContext | null>;
  clearWebSearchContext: () => void;

  // Actions
  generateResearch: () => Promise<void>;
  generateResearchStream: () => Promise<void>;
  generateResearchWithRAG: (ragContext?: RAGContext) => Promise<void>;
  updateResults: (newContent: string) => void; // Add function to update results
  clearResults: () => void;
}

export function useResearch(
  vectorStore: VectorStore | null
): UseResearchReturn {
  const [prompt, setPrompt] = useState("");
  const [researchConfig, setResearchConfig] = useState<ResearchConfig>({
    type: "deep-research",
    depth: "detailed",
    includeWebSearch: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState("");
  const [thinkingOutput, setThinkingOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // RAG State
  const [ragContext, setRagContext] = useState<RAGContext | null>(null);
  const [isRAGSearching, setIsRAGSearching] = useState(false);

  // Web Search State
  const [webSearchContext, setWebSearchContext] =
    useState<WebSearchContext | null>(null);
  const [isWebSearching, setIsWebSearching] = useState(false);

  // Use the robust Ollama connection hook
  const {
    connectionState,
    connect,
    disconnect,
    testConnection,
    generateContent,
    generateContentStream,
    isReady: isAIReady,
  } = useOllamaConnection();

  // Initialize RAG service
  const ragService = vectorStore ? getRAGService(vectorStore) : null;
  const webSearchService = getFirecrawlService();

  // RAG Search functionality
  const performRAGSearch = useCallback(
    async (
      query: string,
      options: RAGSearchOptions = {}
    ): Promise<RAGContext | null> => {
      if (!ragService) {
        console.warn("RAG service not available");
        return null;
      }

      setIsRAGSearching(true);
      try {
        const context = await ragService.searchWithRAG(query, {
          threshold: 0.3,
          limit: 5,
          maxContextLength: 2000,
          ...options,
        });

        setRagContext(context);
        console.log(
          `🔍 RAG Search completed: ${context.metadata.documentCount} documents found`
        );
        return context;
      } catch (error) {
        console.error("RAG search failed:", error);
        return null;
      } finally {
        setIsRAGSearching(false);
      }
    },
    [ragService]
  );

  const clearRAGContext = useCallback(() => {
    setRagContext(null);
  }, []);

  // Web Search functionality
  const performWebSearch = useCallback(
    async (
      query: string,
      options: WebSearchOptions = {}
    ): Promise<WebSearchContext | null> => {
      if (!webSearchService) {
        console.warn("Web search service not available");
        return null;
      }

      setIsWebSearching(true);
      try {
        const context = await webSearchService.searchWeb(query, {
          limit: 5,
          ...options,
        });

        setWebSearchContext(context);
        console.log(
          `🌐 Web Search completed: ${context.metadata.resultCount} results found`
        );
        return context;
      } catch (error) {
        console.error("Web search failed:", error);
        return null;
      } finally {
        setIsWebSearching(false);
      }
    },
    [webSearchService]
  );

  const clearWebSearchContext = useCallback(() => {
    setWebSearchContext(null);
  }, []);

  const generateResearch = useCallback(async () => {
    if (!prompt.trim() || !isAIReady) {
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput("");
    setResults("");

    try {
      // Automatically perform RAG search if ragService is available
      let context: RAGContext | undefined = ragContext || undefined;
      if (!context && ragService && vectorStore) {
        setThinkingOutput(
          "🔍 Searching knowledge base for relevant context..."
        );
        try {
          const searchResult = await performRAGSearch(prompt, {
            threshold: 0.3,
            limit: 8,
            maxContextLength: 3000,
          });
          context = searchResult || undefined;

          if (context && context.relevantDocuments.length > 0) {
            setThinkingOutput(
              `📚 Found ${context.metadata.documentCount} relevant documents with ${context.metadata.chunkCount} chunks. Generating enhanced research...`
            );
          } else {
            setThinkingOutput(
              "📝 No relevant documents found in knowledge base. Generating general research..."
            );
          }
        } catch (error) {
          console.error(
            "RAG search failed, continuing without context:",
            error
          );
          setThinkingOutput(
            "⚠️ Knowledge base search failed. Generating general research..."
          );
        }
      } else if (!ragService) {
        setThinkingOutput("📝 Generating research without knowledge base...");
      }

      // Automatically perform web search if webSearchService is available
      let webContext: WebSearchContext | undefined =
        webSearchContext || undefined;
      if (!webContext && webSearchService && researchConfig.includeWebSearch) {
        setThinkingOutput("🌐 Searching the web for additional context...");
        try {
          const webSearchResult = await performWebSearch(prompt, {
            limit: 5,
          });
          webContext = webSearchResult || undefined;
        } catch (error) {
          console.error(
            "Web search failed, continuing without context:",
            error
          );
          setThinkingOutput(
            "⚠️ Web search failed. Generating general research..."
          );
        }
      } else if (!webSearchService) {
        setThinkingOutput("📝 Generating research without web search...");
      }

      const researchPrompt = buildResearchPrompt(
        prompt,
        researchConfig,
        vectorStore,
        context,
        webContext
      );

      // Simulate thinking process
      setThinkingOutput(
        (context && context.relevantDocuments.length > 0) ||
          (webContext && webContext.results.length > 0)
          ? "🚀 Analyzing your research request with knowledge base and web context..."
          : "🚀 Analyzing your research request..."
      );

      const response = await generateContent(researchPrompt);

      if (response && typeof response === "string") {
        setResults(response);
        setThinkingOutput(
          (context && context.relevantDocuments.length > 0) ||
            (webContext && webContext.results.length > 0)
            ? "✅ Research completed successfully with knowledge base and web context!"
            : "✅ Research completed successfully!"
        );
      }
    } catch (error) {
      console.error("Research generation failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setResults(
        `Failed to generate research: ${errorMessage}\n\nPlease check your Ollama connection and try again.`
      );
      setThinkingOutput("❌ Research generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  }, [
    prompt,
    researchConfig,
    vectorStore,
    ragContext,
    ragService,
    performRAGSearch,
    webSearchContext,
    webSearchService,
    performWebSearch,
    isAIReady,
    generateContent,
  ]);

  const generateResearchStream = useCallback(async () => {
    if (!prompt.trim() || !isAIReady) {
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput("");
    setResults("");

    try {
      // Automatically perform RAG search if ragService is available
      let context: RAGContext | undefined = ragContext || undefined;
      if (!context && ragService && vectorStore) {
        setThinkingOutput(
          "🔍 Searching knowledge base for relevant context..."
        );
        try {
          const searchResult = await performRAGSearch(prompt, {
            threshold: 0.3,
            limit: 8,
            maxContextLength: 3000,
          });
          context = searchResult || undefined;

          if (context && context.relevantDocuments.length > 0) {
            setThinkingOutput(
              `📚 Found ${context.metadata.documentCount} relevant documents with ${context.metadata.chunkCount} chunks. Generating enhanced research...`
            );
          } else {
            setThinkingOutput(
              "📝 No relevant documents found in knowledge base. Generating general research..."
            );
          }
        } catch (error) {
          console.error(
            "RAG search failed, continuing without context:",
            error
          );
          setThinkingOutput(
            "⚠️ Knowledge base search failed. Generating general research..."
          );
        }
      } else if (!ragService) {
        setThinkingOutput("📝 Generating research without knowledge base...");
      }

      // Automatically perform web search if webSearchService is available
      let webContext: WebSearchContext | undefined =
        webSearchContext || undefined;
      if (!webContext && webSearchService && researchConfig.includeWebSearch) {
        setThinkingOutput("🌐 Searching the web for additional context...");
        try {
          const webSearchResult = await performWebSearch(prompt, {
            limit: 5,
          });
          webContext = webSearchResult || undefined;
        } catch (error) {
          console.error(
            "Web search failed, continuing without context:",
            error
          );
          setThinkingOutput(
            "⚠️ Web search failed. Generating general research..."
          );
        }
      } else if (!webSearchService) {
        setThinkingOutput("📝 Generating research without web search...");
      }

      const researchPrompt = buildResearchPrompt(
        prompt,
        researchConfig,
        vectorStore,
        context,
        webContext
      );

      let accumulatedContent = "";

      // Handle streaming response
      for await (const chunk of generateContentStream(researchPrompt)) {
        if (chunk) {
          accumulatedContent += chunk;
          setResults(accumulatedContent);

          // Update thinking process as content streams
          if (accumulatedContent.length < 100) {
            setThinkingOutput(
              (context && context.relevantDocuments.length > 0) ||
                (webContext && webContext.results.length > 0)
                ? "🚀 Starting research generation with knowledge base and web context..."
                : "🚀 Starting research generation..."
            );
          } else if (accumulatedContent.length < 500) {
            setThinkingOutput(
              (context && context.relevantDocuments.length > 0) ||
                (webContext && webContext.results.length > 0)
                ? "📖 Building comprehensive analysis using knowledge base and web context..."
                : "📖 Building comprehensive analysis..."
            );
          } else {
            setThinkingOutput(
              (context && context.relevantDocuments.length > 0) ||
                (webContext && webContext.results.length > 0)
                ? "✨ Expanding research with detailed insights from documents and web..."
                : "✨ Expanding research with detailed insights..."
            );
          }
        }
      }

      setThinkingOutput(
        (context && context.relevantDocuments.length > 0) ||
          (webContext && webContext.results.length > 0)
          ? "✅ Research completed successfully with knowledge base and web context!"
          : "✅ Research completed successfully!"
      );
    } catch (error) {
      console.error("Streaming research generation failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setResults(
        `Failed to generate research: ${errorMessage}\n\nPlease check your Ollama connection and try again.`
      );
      setThinkingOutput("❌ Research generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  }, [
    prompt,
    researchConfig,
    vectorStore,
    ragContext,
    ragService,
    performRAGSearch,
    webSearchContext,
    webSearchService,
    performWebSearch,
    isAIReady,
    generateContentStream,
  ]);

  // Enhanced research generation with explicit RAG context
  const generateResearchWithRAG = useCallback(
    async (explicitRAGContext?: RAGContext) => {
      if (!prompt.trim() || !isAIReady) {
        return;
      }

      setIsGenerating(true);
      setIsStreaming(true);
      setThinkingOutput("");
      setResults("");

      try {
        // Use explicit context or perform search if not provided
        let context: RAGContext | undefined = explicitRAGContext || undefined;
        if (!context && ragService) {
          setThinkingOutput("Searching knowledge base for relevant context...");
          const searchResult = await performRAGSearch(prompt);
          context = searchResult || undefined;
        }

        // Automatically perform web search if webSearchService is available
        let webContext: WebSearchContext | undefined =
          webSearchContext || undefined;
        if (
          !webContext &&
          webSearchService &&
          researchConfig.includeWebSearch
        ) {
          setThinkingOutput("Searching the web for additional context...");
          const webSearchResult = await performWebSearch(prompt);
          webContext = webSearchResult || undefined;
        }

        const researchPrompt = buildResearchPrompt(
          prompt,
          researchConfig,
          vectorStore,
          context || undefined,
          webContext || undefined
        );

        setThinkingOutput("Generating research with enhanced context...");

        let accumulatedContent = "";

        // Handle streaming response
        for await (const chunk of generateContentStream(researchPrompt)) {
          if (chunk) {
            accumulatedContent += chunk;
            setResults(accumulatedContent);

            // Update thinking process as content streams
            if (accumulatedContent.length < 100) {
              setThinkingOutput(
                "Starting research generation with RAG context..."
              );
            } else if (accumulatedContent.length < 500) {
              setThinkingOutput(
                "Building comprehensive analysis using knowledge base..."
              );
            } else {
              setThinkingOutput(
                "Expanding research with detailed insights and context..."
              );
            }
          }
        }

        setThinkingOutput(
          "Research completed successfully with enhanced context!"
        );
      } catch (error) {
        console.error("RAG-enhanced research generation failed:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setResults(
          `Failed to generate research: ${errorMessage}\n\nPlease check your Ollama connection and try again.`
        );
        setThinkingOutput("Research generation failed. Please try again.");
      } finally {
        setIsGenerating(false);
        setIsStreaming(false);
      }
    },
    [
      prompt,
      researchConfig,
      vectorStore,
      ragService,
      performRAGSearch,
      webSearchContext,
      webSearchService,
      performWebSearch,
      isAIReady,
      generateContentStream,
    ]
  );

  const updateResults = useCallback((newContent: string) => {
    setResults(newContent);
    setThinkingOutput("Content updated by user");
  }, []);

  const clearResults = useCallback(() => {
    setResults("");
    setPrompt("");
    setThinkingOutput("");
    setIsStreaming(false);
    clearRAGContext();
    clearWebSearchContext();
  }, [clearRAGContext, clearWebSearchContext]);

  return {
    prompt,
    setPrompt,
    researchConfig,
    setResearchConfig,
    isGenerating,
    results,
    thinkingOutput,
    isStreaming,
    connectionState,
    connectAI: connect,
    disconnectAI: disconnect,
    testConnection,
    isAIReady,
    // RAG Integration
    ragContext,
    isRAGSearching,
    performRAGSearch,
    clearRAGContext,
    // Web Search Integration
    webSearchContext,
    isWebSearching,
    performWebSearch,
    clearWebSearchContext,
    // Actions
    generateResearch,
    generateResearchStream,
    generateResearchWithRAG,
    updateResults,
    clearResults,
  };
}

function buildResearchPrompt(
  userPrompt: string,
  config: ResearchConfig,
  vectorStore: VectorStore | null,
  ragContext?: RAGContext,
  webContext?: WebSearchContext
): string {
  const typePrompts = {
    "deep-research":
      "Conduct comprehensive research with detailed analysis and insights",
    social:
      "Analyze social trends, cultural impacts, and community perspectives",
    finance:
      "Provide financial analysis, market insights, and economic perspectives",
    academic: "Deliver scholarly research with citations and academic rigor",
    technical:
      "Focus on technical specifications, implementation details, and best practices",
    market:
      "Analyze market trends, competitive landscape, and business opportunities",
  };

  const depthModifiers = {
    quick: "Provide a concise overview with key points",
    detailed: "Provide detailed analysis with supporting evidence",
    comprehensive:
      "Provide exhaustive research with multiple perspectives and thorough analysis",
  };

  let prompt = `${typePrompts[config.type]}. ${depthModifiers[config.depth]}.\n\n`;
  prompt += `Research Query: ${userPrompt}\n\n`;

  // Enhanced RAG context integration
  if (ragContext && ragContext.relevantDocuments.length > 0) {
    prompt += `## RELEVANT CONTEXT FROM KNOWLEDGE BASE\n\n`;
    prompt += `The following information has been retrieved from the knowledge base and is highly relevant to your research query:\n\n`;

    // Add context from relevant documents
    ragContext.relevantDocuments.forEach((doc, index) => {
      prompt += `### Source ${index + 1}: ${doc.title} (${(doc.similarity * 100).toFixed(1)}% relevance)\n`;
      prompt += `${doc.chunkContent}\n\n`;
    });

    prompt += `## RESEARCH INSTRUCTIONS\n\n`;
    prompt += `Please use the above context to enhance your research. Reference specific information from the knowledge base when relevant. If the context provides valuable insights, incorporate them into your analysis. If the context is not directly relevant, focus on your own comprehensive research.\n\n`;
  } else if (vectorStore) {
    prompt += `Please use any relevant information from the knowledge base to enhance your research.\n\n`;
  }

  // Enhanced Web Search context integration
  if (webContext && webContext.results.length > 0) {
    prompt += `## RELEVANT CONTEXT FROM WEB SEARCH\n\n`;
    prompt += `The following information has been retrieved from the web and is highly relevant to your research query:\n\n`;

    // Add context from web search results
    webContext.results.forEach((result, index) => {
      prompt += `### Source ${index + 1}: ${result.title}\n`;
      prompt += `${result.description}\n\n`;
    });

    prompt += `## RESEARCH INSTRUCTIONS\n\n`;
    prompt += `Please use the above context to enhance your research. Reference specific information from the web when relevant. If the context provides valuable insights, incorporate them into your analysis. If the context is not directly relevant, focus on your own comprehensive research.\n\n`;
  } else if (webContext) {
    prompt += `Please use any relevant information from the web to enhance your research.\n\n`;
  }

  prompt += `Format your response with clear headings, bullet points, and structured information for easy reading. Use markdown formatting for better readability.`;

  return prompt;
}
