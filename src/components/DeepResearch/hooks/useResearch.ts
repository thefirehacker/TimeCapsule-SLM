import React, { useState, useCallback, useRef } from "react";
import {
  VectorStore,
  SearchResult,
  DocumentType,
} from "@/components/VectorStore/VectorStore";
import { useOllamaConnection } from "./useOllamaConnection";
import {
  getUnifiedWebSearchService,
  UnifiedWebSearchContext as WebSearchContext,
  UnifiedWebSearchOptions as WebSearchOptions,
} from "@/lib/UnifiedWebSearchService";
import { createMultiAgentSystem, Orchestrator } from "@/lib/multi-agent";
import { queryIntelligenceService } from "@/lib/QueryIntelligenceService";
import { ResearchStep, useResearchSteps } from "@/components/DeepResearch/components/ResearchSteps";
import { useResearchHistory } from "../hooks/useResearchHistory";

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
  includeRAG?: boolean;
  includeWebSearch?: boolean;
  webSearchOptions?: WebSearchOptions;
}

// Simplified RAG types (no longer dependent on RAGService)
export interface RAGDocument {
  id: string;
  title: string;
  similarity: number;
  chunkContent: string;
  chunkIndex: number;
  source: string;
  metadata: {
    filename: string;
    filetype: string;
    uploadedAt: string;
    description: string;
  };
  retrievalContext: {
    queryId: string;
    retrievalTime: number;
    processingTime: number;
  };
}

export interface RAGContext {
  query: string;
  relevantDocuments: RAGDocument[];
  searchResults: SearchResult[];
  contextText: string;
  metadata: {
    searchTime: number;
    documentCount: number;
    chunkCount: number;
    averageSimilarity: number;
    searchThreshold: number;
  };
}

export interface RAGSearchOptions {
  threshold?: number;
  limit?: number;
  includeMetadata?: boolean;
  maxContextLength?: number;
  searchType?: "semantic" | "hybrid" | "keyword";
  agentId?: string;
  sessionId?: string;
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
  generateResearchWithContext: (
    ragContext?: RAGContext,
    webContext?: WebSearchContext
  ) => Promise<void>;
  updateResults: (newContent: string) => void;
  clearResults: () => void;

  // Intelligent Research Integration
  researchSteps: ResearchStep[];
  isIntelligentResearching: boolean;
  researchResult: ResearchResult | null;
  expandedSteps: Set<string>;
  performIntelligentResearch: (query: string) => Promise<void>;
  handleStepClick: (step: ResearchStep) => void;
  clearResearchSteps: () => void;
  rerunSynthesis: () => Promise<void>;
  rerunSpecificAgent: (agentName: string) => Promise<void>;
  stopResearch: () => void;
}

export function useResearch(
  vectorStore: VectorStore | null
): UseResearchReturn {
  const [prompt, setPrompt] = useState("");
  const [researchConfig, setResearchConfig] = useState<ResearchConfig>({
    type: "deep-research",
    depth: "detailed",
    includeRAG: true,
    includeWebSearch: false,
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

  // Intelligent Research State
  const [isIntelligentResearching, setIsIntelligentResearching] = useState(false);
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);
  const researchStepsState = useResearchSteps();
  const history = useResearchHistory();
  const historySessionIdRef = React.useRef<string | null>(null);
  const researchStartTimeRef = React.useRef<number | null>(null);
  
  // 🔥 CRITICAL FIX: Ref to track current steps state to avoid React closure issues
  const currentStepsRef = React.useRef<ResearchStep[]>([]);
  
  // Research cancellation control
  const abortControllerRef = useRef<AbortController | null>(null);

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

  // Web Search Service
  const webSearchService = getUnifiedWebSearchService();



  // Configure query intelligence service with LLM
  React.useEffect(() => {
    if (generateContent) {
      queryIntelligenceService.configureLLM(generateContent);
    }
  }, [generateContent]);

  // Helper function to convert SearchResult to RAGDocument
  const convertToRAGDocument = (
    result: SearchResult,
    queryId: string,
    searchTime: number
  ): RAGDocument => ({
    id: result.document.id,
    title: result.document.title,
    similarity: result.similarity,
    chunkContent: result.chunk.content,
    chunkIndex: parseInt(result.chunk.id.split("_").pop() || "0"),
    source: result.document.metadata?.source || "unknown",
    metadata: {
      filename: result.document.metadata?.filename || "unknown",
      filetype: result.document.metadata?.filetype || "unknown",
      uploadedAt:
        result.document.metadata?.uploadedAt || new Date().toISOString(),
      description:
        result.document.metadata?.description || "Document from knowledge base",
    },
    retrievalContext: {
      queryId,
      retrievalTime: searchTime,
      processingTime: searchTime,
    },
  });

  // Helper function to generate context text
  const generateContextText = (
    documents: RAGDocument[],
    maxLength: number
  ): string => {
    const chunks = documents
      .sort((a, b) => b.similarity - a.similarity)
      .map((doc) => doc.chunkContent);

    let contextText = "";
    let currentLength = 0;

    for (const chunk of chunks) {
      if (currentLength + chunk.length > maxLength) {
        break;
      }
      contextText += chunk + "\n\n";
      currentLength += chunk.length + 2;
    }

    return contextText.trim();
  };

  // RAG Search functionality using VectorStore directly
  const performRAGSearch = useCallback(
    async (
      query: string,
      options: RAGSearchOptions = {}
    ): Promise<RAGContext | null> => {
      if (!vectorStore) {
        console.warn("VectorStore not available");
        return null;
      }

      setIsRAGSearching(true);
      const startTime = Date.now();
      const queryId = `rag_${Date.now()}`;

      try {
        const {
          threshold = 0.1,
          limit = 15,
          maxContextLength = 5000,
          agentId,
          sessionId,
        } = options;

        // Perform semantic search using VectorStore directly - ONLY USERDOCS for clean base analysis
        const searchResults = await vectorStore.searchSimilar(
          query,
          threshold,
          limit,
          {
            agentId,
            sessionId,
            queryType: "agent_rag",
            documentTypes: ["userdocs"], // CRITICAL: Only search user uploaded documents to prevent contamination
          }
        );

        const searchTime = Date.now() - startTime;

        // Convert to RAG documents
        const relevantDocuments: RAGDocument[] = searchResults.map((result) =>
          convertToRAGDocument(result, queryId, searchTime)
        );

        // Generate context text
        const contextText = generateContextText(
          relevantDocuments,
          maxContextLength
        );

        // Calculate metadata
        const averageSimilarity =
          relevantDocuments.length > 0
            ? relevantDocuments.reduce((sum, doc) => sum + doc.similarity, 0) /
              relevantDocuments.length
            : 0;

        const context: RAGContext = {
          query,
          relevantDocuments,
          searchResults,
          contextText,
          metadata: {
            searchTime,
            documentCount: new Set(relevantDocuments.map((d) => d.id)).size,
            chunkCount: relevantDocuments.length,
            averageSimilarity,
            searchThreshold: threshold,
          },
        };

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
    [vectorStore]
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
      // Automatically perform RAG search if enabled and vectorStore is available
      let context: RAGContext | undefined = ragContext || undefined;
      if (!context && researchConfig.includeRAG && vectorStore) {
        setThinkingOutput(
          "🔍 Searching knowledge base for relevant context..."
        );
        try {
          const searchResult = await performRAGSearch(prompt, {
            threshold: 0.1,
            limit: 15,
            maxContextLength: 5000,
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
      } else if (!researchConfig.includeRAG) {
        setThinkingOutput(
          "📝 Generating research without knowledge base (disabled)..."
        );
      } else if (!vectorStore) {
        setThinkingOutput("📝 Generating research without knowledge base...");
      }

      // Automatically perform web search if webSearchService is available
      let webContext: WebSearchContext | undefined =
        webSearchContext || undefined;
      if (!webContext && webSearchService && researchConfig.includeWebSearch) {
        const availableProviders = webSearchService.getAvailableProviders();

        console.log(
          "🔍 useResearch: Performing web search (generateResearch)",
          {
            hasWebContext: !!webContext,
            hasWebSearchService: !!webSearchService,
            includeWebSearch: researchConfig.includeWebSearch,
            availableProviders,
          }
        );

        if (availableProviders.duckduckgo || availableProviders.firecrawl) {
          setThinkingOutput("🌐 Searching the web for additional context...");
          try {
            const webSearchResult = await performWebSearch(prompt, {
              limit: 5,
            });
            webContext = webSearchResult || undefined;

            if (webContext && webContext.results.length > 0) {
              const providerText =
                webContext.metadata.providers.length > 1
                  ? `${webContext.metadata.providers.join(" + ")}`
                  : webContext.metadata.providers[0];
              setThinkingOutput(
                `🌐 Found ${webContext.metadata.resultCount} web results from ${webContext.metadata.domains.length} domains (via ${providerText}). Generating enhanced research...`
              );
            }
          } catch (error) {
            console.error(
              "Web search failed, continuing without context:",
              error
            );
            setThinkingOutput(
              "⚠️ Web search failed. Generating general research..."
            );
          }
        } else {
          setThinkingOutput(
            "📝 No web search providers available. Generating research without web context..."
          );
        }
      } else {
        console.log("🔍 useResearch: Web search skipped (generateResearch)", {
          hasWebContext: !!webContext,
          hasWebSearchService: !!webSearchService,
          includeWebSearch: researchConfig.includeWebSearch,
        });
        if (!webSearchService) {
          setThinkingOutput("📝 Generating research without web search...");
        }
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
      // Automatically perform RAG search if enabled and vectorStore is available
      let context: RAGContext | undefined = ragContext || undefined;
      if (!context && researchConfig.includeRAG && vectorStore) {
        setThinkingOutput(
          "🔍 Searching knowledge base for relevant context..."
        );
        try {
          const searchResult = await performRAGSearch(prompt, {
            threshold: 0.1,
            limit: 15,
            maxContextLength: 5000,
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
      } else if (!researchConfig.includeRAG) {
        setThinkingOutput(
          "📝 Generating research without knowledge base (disabled)..."
        );
      } else if (!vectorStore) {
        setThinkingOutput("📝 Generating research without knowledge base...");
      }

      // Automatically perform web search if webSearchService is available
      let webContext: WebSearchContext | undefined =
        webSearchContext || undefined;
      if (!webContext && webSearchService && researchConfig.includeWebSearch) {
        console.log(
          "🔍 useResearch: Performing web search (generateResearchStream)",
          {
            hasWebContext: !!webContext,
            hasWebSearchService: !!webSearchService,
            includeWebSearch: researchConfig.includeWebSearch,
          }
        );
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
      } else {
        console.log(
          "🔍 useResearch: Web search skipped (generateResearchStream)",
          {
            hasWebContext: !!webContext,
            hasWebSearchService: !!webSearchService,
            includeWebSearch: researchConfig.includeWebSearch,
          }
        );
        if (!webSearchService) {
          setThinkingOutput("📝 Generating research without web search...");
        }
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
        // Use explicit context or perform search if enabled and not provided
        let context: RAGContext | undefined = explicitRAGContext || undefined;
        if (!context && researchConfig.includeRAG && vectorStore) {
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
      performRAGSearch,
      webSearchContext,
      webSearchService,
      performWebSearch,
      isAIReady,
      generateContentStream,
    ]
  );

  // Enhanced research generation with explicit RAG and web search context
  const generateResearchWithContext = useCallback(
    async (
      explicitRAGContext?: RAGContext,
      explicitWebContext?: WebSearchContext
    ) => {
      if (!prompt.trim() || !isAIReady) {
        return;
      }

      setIsGenerating(true);
      setIsStreaming(true);
      setThinkingOutput("");
      setResults("");

      try {
        // Use explicit contexts or perform search if enabled and not provided
        let context: RAGContext | undefined = explicitRAGContext || undefined;
        if (!context && researchConfig.includeRAG && vectorStore) {
          setThinkingOutput("Searching knowledge base for relevant context...");
          const searchResult = await performRAGSearch(prompt);
          context = searchResult || undefined;
        }

        let webContext: WebSearchContext | undefined =
          explicitWebContext || undefined;
        if (
          !webContext &&
          researchConfig.includeWebSearch &&
          webSearchService
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
                "Starting research generation with enhanced context..."
              );
            } else if (accumulatedContent.length < 500) {
              setThinkingOutput(
                "Building comprehensive analysis using available context..."
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
        console.error("Context-enhanced research generation failed:", error);
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
      performRAGSearch,
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
    researchStepsState.clearSteps();
    setResearchResult(null);
    processedStepIds.current.clear();
  }, [clearRAGContext, clearWebSearchContext, researchStepsState]);

  // Step processing deduplication tracker  
  const processedStepIds = React.useRef(new Set<string>());

  const performedStepsPersist = (step: ResearchStep) => {
    if (!historySessionIdRef.current) return;
    const existing = history.currentSession?.steps?.find(s => s.id === step.id);
    if (existing) {
      history.updateStepInSession(historySessionIdRef.current, step.id, step);
    } else {
      history.addStepToSession(historySessionIdRef.current, step);
    }
  };

  // 🔥 CRITICAL FIX: Keep steps ref updated to avoid React closure issues
  React.useEffect(() => {
    currentStepsRef.current = researchStepsState.steps;
  }, [researchStepsState.steps]);

  // Progress callback for agent system - connects to UI steps
  // Map agent names to appropriate step types for UI display
  const getAgentStepType = (agentName: string): ResearchStep['type'] => {
    switch (agentName) {
      case 'DataInspector':
      case 'DataInspectorAgent':
        return 'analysis'; // "Analyzing Documents"
      case 'PatternGenerator':
      case 'PatternGeneratorAgent':
        return 'analysis'; // "Generating Extraction Patterns"
      case 'Extractor':
      case 'ExtractionAgent':
        return 'analysis'; // "Extracting Information"
      case 'SynthesisCoordinator':
      case 'Synthesizer':
      case 'SynthesisAgent':
        return 'synthesis'; // "Synthesizing Information"
      case 'PlanningAgent':
        return 'verification'; // "Planning Execution Strategy"
      case 'ResponseFormatter':
      case 'ResponseFormatterAgent':
        return 'verification'; // "Formatting Response"
      case 'WebSearchAgent':
        return 'web_search'; // "Searching Web"
      default:
        return 'analysis'; // Default fallback
    }
  };

  const progressCallback = React.useMemo(() => ({
    onAgentStart: async (agentName: string, agentType: string, input: any): Promise<void> => {
        console.log(`🚀 Agent ${agentName} (${agentType}) started`);
        
        // Check if this is a validation step and create stable display name  
        const isValidation = agentName.includes('PlanningAgent_Validation_');
        const displayName = isValidation 
          ? `PlanningAgent Validation: ${agentName.replace('PlanningAgent_Validation_', '')}`
          : agentName;
        
        // Find the main research step (should already exist from research start)
        const existingSteps = currentStepsRef.current;
        const mainStep = existingSteps.find(step => step.id === 'multi_agent_research');
        
        if (!mainStep) {
          console.error(`❌ START ERROR: Main step not found for agent "${agentName}". This should not happen!`);
          return;
        }
        
        // Use the proper display name
        
        // Check if this agent already exists in subSteps (for retries ONLY)
        // DO NOT overwrite original agents with validation agents
        let existingSubStepIndex = mainStep.subSteps?.findIndex(sub => 
          sub.agentName === displayName  // Only exact matches, no overwrites
        ) ?? -1;
        
        // For validation steps, always create new entries (don't replace anything)
        // This preserves all agents in the UI
        
        if (existingSubStepIndex >= 0) {
          // Update existing substep for retry/restart
          const existingStep = mainStep.subSteps![existingSubStepIndex];
          const isRetry = !isValidation && existingStep.agentName === displayName;
          const retryCount = isRetry ? (existingStep.retryCount || 0) + 1 : (existingStep.retryCount || 0);
          
          console.log(`🔄 ${isRetry ? 'Retry' : 'Update'} existing substep for ${displayName} ${isRetry ? `(attempt #${retryCount})` : ''}`);
          
          const updatedSubSteps = [...(mainStep.subSteps || [])];
          updatedSubSteps[existingSubStepIndex] = {
            ...updatedSubSteps[existingSubStepIndex],
            agentName: displayName, // Update name in case it changed (validation steps)
            agentType: isValidation ? 'verification' : (agentType as any),
            status: 'in_progress',
            startTime: Date.now(),
            retryCount,
            stage: isRetry ? `Retrying with corrective guidance (attempt #${retryCount})` : (isValidation ? 'Validating results' : undefined)
          };
          
          const updatedMainStep = {
            ...mainStep,
            subSteps: updatedSubSteps,
            status: 'in_progress' as const
          };
          await new Promise<void>((resolve) => {
            researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
            // Give React time to process the state update
            setTimeout(resolve, 0);
          });
        } else {
          // Double-check to prevent true duplicates (safety check)
          const finalCheck = mainStep.subSteps?.some(sub => 
            sub.agentName === displayName && 
            sub.status === 'in_progress'
          ) ?? false;
          
          if (finalCheck) {
            console.warn(`⚠️ Preventing duplicate creation of ${displayName} - already in progress`);
            return;
          }
          
          // Add new agent as subStep
          const newSubStep = {
            id: `${agentName.toLowerCase()}_${Date.now()}`,
            agentName: displayName,
            agentType: isValidation ? 'verification' : (agentType as any),
            status: 'in_progress' as const,
            startTime: Date.now(),
            input,
            output: null,
            retryCount: 0
          };
          
          console.log(`✅ Creating new substep: ${displayName} (validation: ${isValidation})`);
          
          const updatedMainStep = {
            ...mainStep,
            subSteps: [...(mainStep.subSteps || []), newSubStep],
            status: 'in_progress' as const
          };
          
          console.log(`🔍 Added ${displayName} | Agents: [${updatedMainStep.subSteps.map(s => s.agentName).join(', ')}]`);
          
          // Check for DataInspector loss
          const hasDataInspector = updatedMainStep.subSteps.some(s => s.agentName === 'DataInspector');
          if (!hasDataInspector && updatedMainStep.subSteps.length > 1) {
            console.error(`❌ CRITICAL: DataInspector lost! Agents: [${updatedMainStep.subSteps.map(s => s.agentName).join(', ')}]`);
          }
          
          await new Promise<void>((resolve) => {
            researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
            // Give React time to process the state update
            setTimeout(resolve, 0);
          });
        }
      },
      onAgentProgress: async (agentName: string, progress: number, stage?: string): Promise<void> => {
        console.log(`📊 Agent ${agentName}: ${progress}% - ${stage || 'Processing'}`);
        
        // Check if this is a validation step
        const isValidation = agentName.includes('PlanningAgent_Validation_');
        const progressDisplayName = isValidation 
          ? `PlanningAgent Validation: ${agentName.replace('PlanningAgent_Validation_', '')}`
          : agentName;
        
        // Update thinking output based on agent and stage
        if (stage) {
          await new Promise<void>((resolve) => {
            setThinkingOutput(`🤖 ${progressDisplayName}: ${stage} (${progress}%)`);
            setTimeout(resolve, 0);
          });
        }
        
        // Find main step and update the corresponding subStep progress
        const existingSteps = currentStepsRef.current;
        const mainStep = existingSteps.find(step => step.id === 'multi_agent_research');
        
        if (mainStep && mainStep.subSteps) {
          const subStepIndex = mainStep.subSteps.findIndex(sub => sub.agentName === progressDisplayName);
          
          if (subStepIndex >= 0) {
            const updatedSubSteps = [...mainStep.subSteps];
            const currentSubStep = updatedSubSteps[subStepIndex];
            
            // Create progress history entry
            const progressEntry = {
              timestamp: Date.now(),
              stage: stage || 'Processing',
              progress,
              message: stage
            };
            
            updatedSubSteps[subStepIndex] = {
              ...currentSubStep,
              progress,
              stage,
              progressHistory: [...(currentSubStep.progressHistory || []), progressEntry]
            };
            
            const updatedMainStep = {
              ...mainStep,
              subSteps: updatedSubSteps
            };
            await new Promise<void>((resolve) => {
              researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
              setTimeout(resolve, 0);
            });
          }
        }
      },
      onAgentThinking: async (agentName: string, thinking: any): Promise<void> => {
        console.log(`💭 Agent ${agentName} thinking: ${thinking.summary || 'Processing...'}`);
        
        // Check if this is a validation step
        const isValidation = agentName.includes('PlanningAgent_Validation_');
        const thinkingDisplayName = isValidation 
          ? `PlanningAgent Validation: ${agentName.replace('PlanningAgent_Validation_', '')}`
          : agentName;
        
        // Find main step and update the corresponding subStep thinking
        const existingSteps = currentStepsRef.current;
        const mainStep = existingSteps.find(step => step.id === 'multi_agent_research');
        
        if (mainStep && mainStep.subSteps) {
          const subStepIndex = mainStep.subSteps.findIndex(sub => sub.agentName === thinkingDisplayName);
          if (subStepIndex >= 0) {
            const updatedSubSteps = [...mainStep.subSteps];
            updatedSubSteps[subStepIndex] = {
              ...updatedSubSteps[subStepIndex],
              thinking: {
                hasThinking: true,
                thinkingContent: thinking.thinkingContent || '',
                finalOutput: thinking.finalOutput || '',
                summary: thinking.summary || 'Processing...',
                insights: thinking.insights || []
              }
            };
            
            const updatedMainStep = {
              ...mainStep,
              subSteps: updatedSubSteps
            };
            await new Promise<void>((resolve) => {
              researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
              setTimeout(resolve, 0);
            });
          }
        }
      },
      onAgentComplete: async (agentName: string, output: any, metrics?: any): Promise<void> => {
        console.log(`✅ Agent ${agentName} completed`);
        
        // Check if this is a validation step
        const isValidation = agentName.includes('PlanningAgent_Validation_');
        const completeDisplayName = isValidation 
          ? `PlanningAgent Validation: ${agentName.replace('PlanningAgent_Validation_', '')}`
          : agentName;
        
        // Find main step and complete the corresponding subStep
        const existingSteps = currentStepsRef.current;
        const mainStep = existingSteps.find(step => step.id === 'multi_agent_research');
        
        if (mainStep && mainStep.subSteps) {
          const subStepIndex = mainStep.subSteps.findIndex(sub => sub.agentName === completeDisplayName);
          if (subStepIndex >= 0) {
            console.log(`🔄 Completing agent: ${completeDisplayName} (found at index ${subStepIndex})`);
            
            // Additional safety check - ensure we're updating the right step
            const targetStep = mainStep.subSteps[subStepIndex];
            if (targetStep.status === 'completed') {
              console.warn(`⚠️ Agent ${completeDisplayName} already completed, skipping update`);
              return;
            }
            const updatedSubSteps = [...mainStep.subSteps];
            const currentSubStep = updatedSubSteps[subStepIndex];
            
            updatedSubSteps[subStepIndex] = {
              ...currentSubStep,
              status: 'completed',
              endTime: Date.now(),
              duration: Date.now() - currentSubStep.startTime,
              output,
              progress: 100,
              metrics: {
                llmCalls: metrics?.llmCalls || 0,
                tokensUsed: metrics?.tokensUsed || 0,
                responseTime: metrics?.responseTime || 0,
                confidence: metrics?.confidence || 0.8
              }
            };
            
            // Check if all subSteps are completed to mark main step as completed
            // Only mark as complete if we have multiple agents and they're all truly done
            // Updated for 4-agent flow: DataInspector → PlanningAgent → PatternGenerator → SynthesisCoordinator
            const allCompleted = updatedSubSteps.length >= 3 && updatedSubSteps.every(sub => 
              sub.status === 'completed' && sub.output
            );
            
            const updatedMainStep = {
              ...mainStep,
              subSteps: updatedSubSteps,
              status: allCompleted ? 'completed' as const : 'in_progress' as const,
              duration: allCompleted ? Date.now() - mainStep.timestamp : undefined,
              confidence: allCompleted ? (updatedSubSteps.reduce((sum, sub) => sum + (sub.metrics?.confidence || 0.8), 0) / updatedSubSteps.length) : undefined
            };
            
            console.log(`✅ ${completeDisplayName} completed | All done: ${allCompleted} | Agents: [${updatedSubSteps.map(s => `${s.agentName}:${s.status}`).join(', ')}]`);
            await new Promise<void>((resolve) => {
              researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
              performedStepsPersist(updatedMainStep);
              setTimeout(resolve, 0);
            });
          }
        }
      },
      onAgentError: async (agentName: string, error: string, retryCount?: number): Promise<void> => {
        console.log(`❌ Agent ${agentName} error: ${error}${retryCount ? ` (retry ${retryCount})` : ''}`);
        
        // Check if this is a validation step
        const isValidation = agentName.includes('PlanningAgent_Validation_');
        const errorDisplayName = isValidation 
          ? `PlanningAgent Validation: ${agentName.replace('PlanningAgent_Validation_', '')}`
          : agentName;
        
        // Find main step and mark the corresponding subStep as failed
        const existingSteps = currentStepsRef.current;
        const mainStep = existingSteps.find(step => step.id === 'multi_agent_research');
        
        if (mainStep && mainStep.subSteps) {
          const subStepIndex = mainStep.subSteps.findIndex(sub => sub.agentName === errorDisplayName);
          if (subStepIndex >= 0) {
            const updatedSubSteps = [...mainStep.subSteps];
            const currentSubStep = updatedSubSteps[subStepIndex];
            
            updatedSubSteps[subStepIndex] = {
              ...currentSubStep,
              status: 'failed',
              endTime: Date.now(),
              duration: Date.now() - currentSubStep.startTime,
              error: `${error}${retryCount ? ` (attempt ${retryCount})` : ''}`,
              retryCount
            };
            
            const updatedMainStep = {
              ...mainStep,
              subSteps: updatedSubSteps,
              reasoning: `Agent ${errorDisplayName} failed: ${error}`
            };
            
            await new Promise<void>((resolve) => {
              researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
              performedStepsPersist(updatedMainStep);
              setTimeout(resolve, 0);
            });
          }
        }
      }
  }), [setThinkingOutput, performedStepsPersist]);

  // Research Orchestrator - React to configuration changes
  const researchOrchestrator = React.useMemo(() => {
    if (!generateContent) return null;
    
    return createMultiAgentSystem(
      generateContent,
      progressCallback, // Pass callback reference, not executed callback
      vectorStore,
      { enableWebSearch: researchConfig.includeWebSearch }
    );
  }, [vectorStore, researchConfig.includeWebSearch, generateContent, progressCallback]);

  // No need for useEffect to update callback since we use stable reference

  // Intelligent Research Functions
  const performIntelligentResearch = useCallback(async (query: string) => {
    if (!query.trim() || !isAIReady) {
      console.warn('⚠️ Cannot perform intelligent research: query empty or AI not ready');
      return;
    }

    // Clear previous results immediately when starting new research
    setResults("");
    setResearchResult(null);
    setIsIntelligentResearching(true);
    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput("🧠 Initializing intelligent research system...");
    researchStepsState.clearSteps();
    processedStepIds.current.clear();
    
    // 🔥 CRITICAL FIX: Create main step ONCE at research start to avoid duplicate prevention conflicts
    const mainStep = {
      id: 'multi_agent_research',
      type: 'synthesis' as const,
      status: 'in_progress' as const,
      timestamp: Date.now(),
      query: query,
      subSteps: [],
      reasoning: 'Multi-agent intelligent research process'
    };
    researchStepsState.addStep(mainStep);
    performedStepsPersist(mainStep);
    console.log(`✅ Main step created at research start: "${mainStep.id}"`);
    
    // Start persisted history session
    researchStartTimeRef.current = Date.now();
    const session = history.createSession(query);
    historySessionIdRef.current = session.id;

    // Create abort controller for this research session
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      console.log(`🔬 Starting intelligent research for: "${query}"`);

      // Use the stable orchestrator instance created earlier
      if (!researchOrchestrator) {
        throw new Error('Research orchestrator not available');
      }
      
      // TODO: Step tracking will be handled via progress callbacks

      if (abortController.signal.aborted) {
        throw new Error('Research was cancelled by user');
      }

      const result = await researchOrchestrator.research(query);
      
      // Transform result to match expected format
      const formattedResult = {
        finalAnswer: result,
        steps: [], // TODO: Extract from orchestrator if needed
        sources: [], // TODO: Extract from orchestrator if needed  
        confidence: 1.0 // TODO: Calculate from orchestrator if needed
      };
      
      setResearchResult(formattedResult);
      setResults(formattedResult.finalAnswer);
      setThinkingOutput(`✅ Research completed: ${formattedResult.steps.length} steps, ${formattedResult.sources.length} sources, ${Math.round(formattedResult.confidence * 100)}% confidence`);
      
      // 🔥 CRITICAL FIX: Mark main step as completed
      const completedMainStep = researchStepsState.steps.find(step => step.id === 'multi_agent_research');
      if (completedMainStep) {
        const updatedMainStep = {
          ...completedMainStep,
          status: 'completed' as const,
          duration: Date.now() - completedMainStep.timestamp,
          reasoning: `Multi-agent research completed successfully`
        };
        researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
        console.log(`✅ Main step marked as completed: "${updatedMainStep.id}"`);
      }
      
      if (historySessionIdRef.current) {
        const duration = researchStartTimeRef.current ? Date.now() - researchStartTimeRef.current : undefined;
        history.completeSession(historySessionIdRef.current, duration);
        history.updateSession(historySessionIdRef.current, {
          resultCount: formattedResult.steps.length,
          metadata: { ...(formattedResult as any) } as any,
        });
      }

    } catch (error) {
      console.error('❌ Intelligent research failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResults(`Intelligent research failed: ${errorMessage}\n\nPlease check your AI connection and try again.`);
      setThinkingOutput("❌ Research failed. Please try again.");
      
      // 🔥 CRITICAL FIX: Mark main step as failed
      const failedMainStep = researchStepsState.steps.find(step => step.id === 'multi_agent_research');
      if (failedMainStep) {
        const updatedMainStep = {
          ...failedMainStep,
          status: 'failed' as const,
          duration: Date.now() - failedMainStep.timestamp,
          reasoning: `Multi-agent research failed: ${errorMessage}`
        };
        researchStepsState.updateStep(updatedMainStep.id, updatedMainStep);
        console.log(`❌ Main step marked as failed: "${updatedMainStep.id}"`);
      }
      
      if (historySessionIdRef.current) {
        history.failSession(historySessionIdRef.current, errorMessage);
      }
    } finally {
      setIsIntelligentResearching(false);
      setIsGenerating(false);
      setIsStreaming(false);
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  }, [
    isAIReady,
    generateContent,
    vectorStore, 
    researchConfig.includeWebSearch,
    progressCallback,
    researchStepsState,
    history
  ]);

  const clearResearchSteps = useCallback(() => {
    researchStepsState.clearSteps();
    setResearchResult(null);
    processedStepIds.current.clear();
  }, [researchStepsState]);

  // Rerun synthesis function - restarts the intelligent research process
  const rerunSynthesis = useCallback(async () => {
    if (!prompt.trim() || !isAIReady) {
      console.warn('⚠️ Cannot rerun synthesis: missing query or AI not ready');
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput("🔄 Rerunning intelligent research and synthesis...");

    try {
      console.log('🔄 Rerunning synthesis for query:', prompt);
      
      // Clear previous results and restart the research process
      // This will use the fixed DataAnalyzer infinite loop logic
      const result = await researchOrchestrator.executeResearch(prompt);
      
      if (result && result.finalAnswer) {
        setResearchResult(result);
        setResults(result.finalAnswer);
        setThinkingOutput(`✅ Synthesis rerun completed: ${Math.round(result.confidence * 100)}% confidence`);
        
        console.log('✅ Synthesis rerun successful:', {
          confidence: result.confidence,
          answerLength: result.finalAnswer.length
        });
      } else {
        throw new Error('Synthesis rerun returned no result');
      }

    } catch (error) {
      console.error('❌ Synthesis rerun failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResults(`Synthesis rerun failed: ${errorMessage}\n\nPlease check the logs and try again.`);
      setThinkingOutput("❌ Synthesis rerun failed. Check console for details.");
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  }, [prompt, isAIReady, researchOrchestrator]);

  // Rerun specific agent function - targeted agent execution with context preservation
  const rerunSpecificAgent = useCallback(async (agentName: string) => {
    // Debug validation values
    console.log(`🔍 Rerun ${agentName} validation:`, {
      prompt: prompt,
      promptTrimmed: prompt.trim(),
      promptLength: prompt.length,
      isAIReady: isAIReady,
      hasResearchResult: !!researchResult,
      researchQuery: researchResult?.query
    });
    
    // Try to use original query from researchResult if current prompt is empty
    const queryToUse = prompt.trim() || researchResult?.query || '';
    
    if (!queryToUse || !isAIReady) {
      console.warn(`⚠️ Cannot rerun ${agentName}: missing query or AI not ready`, {
        queryToUse,
        isAIReady,
        promptAvailable: !!prompt.trim(),
        researchQueryAvailable: !!researchResult?.query
      });
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput(`🔄 Rerunning ${agentName}...`);

    try {
      console.log(`🔄 Rerunning specific agent: ${agentName} for query:`, queryToUse);
      
      // Use the new rerunSpecificAgent method on researchOrchestrator
      const result = await researchOrchestrator.rerunSpecificAgent(agentName, researchResult, queryToUse);
      
      if (result && result.finalAnswer) {
        setResearchResult(result);
        setResults(result.finalAnswer);
        setThinkingOutput(`✅ ${agentName} rerun completed: ${Math.round(result.confidence * 100)}% confidence`);
        
        console.log(`✅ ${agentName} rerun successful:`, {
          confidence: result.confidence,
          answerLength: result.finalAnswer.length
        });
      } else {
        throw new Error(`${agentName} rerun returned no result`);
      }

    } catch (error) {
      console.error(`❌ ${agentName} rerun failed:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResults(`${agentName} rerun failed: ${errorMessage}\n\nPlease check the logs and try again.`);
      setThinkingOutput(`❌ ${agentName} rerun failed. Check console for details.`);
    } finally {
      setIsGenerating(false);
      setIsStreaming(false);
    }
  }, [prompt, isAIReady, researchOrchestrator, researchResult]);

  // Stop research function - cancels ongoing research
  const stopResearch = useCallback(() => {
    console.log("🛑 Stopping research...");
    
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Reset states
    setIsGenerating(false);
    setIsStreaming(false);
    setIsIntelligentResearching(false);
    setThinkingOutput("Research stopped by user");
    
    console.log("✅ Research stopped successfully");
  }, []);

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
    generateResearchWithContext,
    updateResults,
    clearResults,

    // Intelligent Research Integration
    researchSteps: researchStepsState.steps,
    isIntelligentResearching,
    researchResult,
    expandedSteps: researchStepsState.expandedSteps,
    performIntelligentResearch,
    handleStepClick: researchStepsState.handleStepClick,
    clearResearchSteps,
    rerunSynthesis,
    rerunSpecificAgent,
    stopResearch,
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
