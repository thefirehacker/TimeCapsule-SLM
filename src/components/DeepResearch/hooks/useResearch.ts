import { useState, useCallback } from "react";
import { VectorStore } from "@/components/VectorStore/VectorStore";
import { useOllamaConnection } from "./useOllamaConnection";

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
}

export interface UseResearchReturn {
  // State
  prompt: string;
  setPrompt: (prompt: string) => void;
  researchConfig: ResearchConfig;
  setResearchConfig: (config: ResearchConfig) => void;
  isGenerating: boolean;
  results: string;
  thinkingOutput: string; // AI thinking process
  isStreaming: boolean; // Whether content is currently streaming

  // AI Connection
  connectionState: any;
  connectAI: (baseURL: string, model?: string) => Promise<boolean>;
  disconnectAI: () => void;
  testConnection: (
    baseURL: string
  ) => Promise<{ success: boolean; models: string[] }>;
  isAIReady: boolean;

  // Actions
  generateResearch: () => Promise<void>;
  generateResearchStream: () => Promise<void>;
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
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState("");
  const [thinkingOutput, setThinkingOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

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

  const generateResearch = useCallback(async () => {
    if (!prompt.trim() || !isAIReady) {
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput("");
    setResults("");

    try {
      const researchPrompt = buildResearchPrompt(
        prompt,
        researchConfig,
        vectorStore
      );

      // Simulate thinking process
      setThinkingOutput(
        "Analyzing your research request and preparing comprehensive analysis..."
      );

      const response = await generateContent(researchPrompt);

      if (response && typeof response === "string") {
        setResults(response);
        setThinkingOutput("Research completed successfully!");
      }
    } catch (error) {
      console.error("Research generation failed:", error);
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
  }, [prompt, researchConfig, vectorStore, isAIReady, generateContent]);

  const generateResearchStream = useCallback(async () => {
    if (!prompt.trim() || !isAIReady) {
      return;
    }

    setIsGenerating(true);
    setIsStreaming(true);
    setThinkingOutput("");
    setResults("");

    try {
      const researchPrompt = buildResearchPrompt(
        prompt,
        researchConfig,
        vectorStore
      );

      // Set initial thinking process
      setThinkingOutput(
        "Analyzing your research request and preparing comprehensive analysis..."
      );

      // Start streaming
      const stream = generateContentStream(researchPrompt);
      let accumulatedContent = "";

      for await (const chunk of stream) {
        if (chunk) {
          accumulatedContent += chunk;
          setResults(accumulatedContent);

          // Update thinking process as content streams
          if (accumulatedContent.length < 100) {
            setThinkingOutput("Starting research generation...");
          } else if (accumulatedContent.length < 500) {
            setThinkingOutput("Building comprehensive analysis...");
          } else {
            setThinkingOutput("Expanding research with detailed insights...");
          }
        }
      }

      setThinkingOutput("Research completed successfully!");
    } catch (error) {
      console.error("Streaming research generation failed:", error);
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
  }, [prompt, researchConfig, vectorStore, isAIReady, generateContentStream]);

  const updateResults = useCallback((newContent: string) => {
    setResults(newContent);
    setThinkingOutput("Content updated by user");
  }, []);

  const clearResults = useCallback(() => {
    setResults("");
    setPrompt("");
    setThinkingOutput("");
    setIsStreaming(false);
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
    generateResearch,
    generateResearchStream,
    updateResults,
    clearResults,
  };
}

function buildResearchPrompt(
  userPrompt: string,
  config: ResearchConfig,
  vectorStore: VectorStore | null
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

  if (vectorStore) {
    prompt += `Please use any relevant information from the knowledge base to enhance your research.\n\n`;
  }

  prompt += `Format your response with clear headings, bullet points, and structured information for easy reading. Use markdown formatting for better readability.`;

  return prompt;
}
