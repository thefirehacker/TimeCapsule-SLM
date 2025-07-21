import { useState, useCallback, useRef } from "react";
import { AIAssistant, AIStatus as AIConnectionStatus } from "@/lib/AIAssistant";
import {
  VectorStore,
  DocumentData,
} from "@/components/VectorStore/VectorStore";

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
  aiStatus: AIConnectionStatus;

  // Actions
  generateResearch: () => Promise<void>;
  clearResults: () => void;
  connectAI: () => Promise<void>;
  disconnectAI: () => void;
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
  const [aiStatus, setAIStatus] = useState<AIConnectionStatus>({
    connected: false,
    provider: "ollama",
  });

  const aiAssistantRef = useRef<AIAssistant | null>(null);

  const connectAI = useCallback(async () => {
    try {
      if (!aiAssistantRef.current) {
        aiAssistantRef.current = new AIAssistant();
      }

      const connected = await aiAssistantRef.current.connectToOllama(
        "http://localhost:11434",
        "qwen2.5:latest"
      );
      if (connected) {
        setAIStatus({
          connected: true,
          provider: "ollama",
          model: "qwen2.5:latest",
        });
      }
    } catch (error) {
      console.error("Failed to connect to AI:", error);
      setAIStatus({
        connected: false,
        provider: "ollama",
        error: "Failed to connect",
      });
    }
  }, []);

  const disconnectAI = useCallback(() => {
    if (aiAssistantRef.current) {
      // No disconnect method found in AIAssistant, just reset status
      setAIStatus({
        connected: false,
        provider: "ollama",
      });
    }
  }, []);

  const generateResearch = useCallback(async () => {
    if (!prompt.trim() || !aiAssistantRef.current || !aiStatus.connected) {
      return;
    }

    setIsGenerating(true);
    try {
      const researchPrompt = buildResearchPrompt(
        prompt,
        researchConfig,
        vectorStore
      );
      const response = await aiAssistantRef.current.generateContent(
        researchPrompt,
        "research"
      );

      if (response && typeof response === "string") {
        setResults(response);
      }
    } catch (error) {
      console.error("Research generation failed:", error);
      setResults("Failed to generate research. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, researchConfig, vectorStore, aiStatus.connected]);

  const clearResults = useCallback(() => {
    setResults("");
    setPrompt("");
  }, []);

  return {
    prompt,
    setPrompt,
    researchConfig,
    setResearchConfig,
    isGenerating,
    results,
    aiStatus,
    generateResearch,
    clearResults,
    connectAI,
    disconnectAI,
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

  prompt += `Format your response with clear headings, bullet points, and structured information for easy reading.`;

  return prompt;
}
