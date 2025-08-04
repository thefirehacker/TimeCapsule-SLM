"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createOllama } from "ollama-ai-provider";
import { generateText } from "ai";
import { streamText } from "ai";

export interface OllamaConnectionState {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  baseURL: string;
  availableModels: string[];
  selectedModel: string;
  lastConnected: Date | null;
}

export interface UseOllamaConnectionReturn {
  connectionState: OllamaConnectionState;
  connect: (baseURL: string, model?: string) => Promise<boolean>;
  disconnect: () => void;
  testConnection: (
    baseURL: string
  ) => Promise<{ success: boolean; models: string[] }>;
  generateContent: (prompt: string) => Promise<string>;
  generateContentStream: (prompt: string) => AsyncIterable<string>;
  isReady: boolean;
}

const DEFAULT_BASE_URL = "http://localhost:11434";
const STORAGE_KEY = "ollama-connection-config";
const CONNECTION_TIMEOUT = 15000; // 15 seconds
const MAX_RETRIES = 3;

// Type the Ollama client properly
type OllamaClient = ReturnType<typeof createOllama>;

export function useOllamaConnection(): UseOllamaConnectionReturn {
  const [connectionState, setConnectionState] = useState<OllamaConnectionState>(
    {
      connected: false,
      connecting: false,
      error: null,
      baseURL: DEFAULT_BASE_URL,
      availableModels: [],
      selectedModel: "",
      lastConnected: null,
    }
  );

  // Use ref to store the client to avoid stale closures
  const ollamaClientRef = useRef<OllamaClient | null>(null);
  const connectionAbortControllerRef = useRef<AbortController | null>(null);

  // Load saved connection config on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.baseURL && config.selectedModel) {
          console.log("📝 Loading saved Ollama config:", config);
          setConnectionState((prev) => ({
            ...prev,
            baseURL: config.baseURL,
            selectedModel: config.selectedModel,
          }));
        }
      } catch (error) {
        console.warn("Failed to load saved Ollama config:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save connection config when connected
  const saveConnectionConfig = useCallback((baseURL: string, model: string) => {
    try {
      const config = { baseURL, selectedModel: model };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn("Failed to save connection config:", error);
    }
  }, []);

  // Enhanced connection test with better error handling
  const testConnection = useCallback(
    async (
      baseURL: string
    ): Promise<{ success: boolean; models: string[] }> => {
      let controller: AbortController | null = null;

      try {
        console.log("🔍 Testing Ollama connection at:", baseURL);

        // Validate URL format
        try {
          new URL(baseURL);
        } catch {
          throw new Error("Invalid URL format");
        }

        controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller?.abort(),
          CONNECTION_TIMEOUT
        );

        const response = await fetch(`${baseURL}/api/tags`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `Ollama API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
          throw new Error("Invalid response format from Ollama API");
        }

        const models = Array.isArray(data.models)
          ? data.models.map((model: any) => model?.name).filter(Boolean)
          : [];

        console.log("✅ Ollama connection test passed, models:", models);
        return { success: true, models };
      } catch (error) {
        console.error("❌ Ollama connection test failed:", error);

        let errorMessage = "Unknown connection error";

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMessage = `Connection timeout after ${CONNECTION_TIMEOUT / 1000}s. Ollama may be slow or unresponsive.`;
          } else if (
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError") ||
            error.message.includes("fetch")
          ) {
            errorMessage =
              "Cannot connect to Ollama server. Make sure Ollama is running and accessible.";
          } else {
            errorMessage = error.message;
          }
        }

        return { success: false, models: [] };
      } finally {
        controller = null;
      }
    },
    []
  );

  // Enhanced connect function with retry logic
  const connect = useCallback(
    async (baseURL: string, model?: string): Promise<boolean> => {
      // Cancel any existing connection attempt
      if (connectionAbortControllerRef.current) {
        connectionAbortControllerRef.current.abort();
      }

      connectionAbortControllerRef.current = new AbortController();

      console.log("🔌 Starting Ollama connection process...", {
        baseURL,
        model,
      });

      setConnectionState((prev) => ({
        ...prev,
        connecting: true,
        error: null,
      }));

      let retryCount = 0;

      while (retryCount < MAX_RETRIES) {
        try {
          // Test connection first
          const testResult = await testConnection(baseURL);

          if (!testResult.success) {
            throw new Error("Failed to connect to Ollama server");
          }

          if (testResult.models.length === 0) {
            throw new Error(
              "No models available in Ollama. Install models using 'ollama pull <model-name>'"
            );
          }

          // Use specified model or first available
          const selectedModel = model || testResult.models[0];

          if (!selectedModel) {
            throw new Error("No valid model selected");
          }

          console.log("🤖 Creating Ollama client...", {
            baseURL,
            selectedModel,
          });

          // Create Ollama client with proper error handling
          let client: OllamaClient;

          try {
            client = createOllama({
              baseURL: `${baseURL}/api`,
            });

            // Validate client creation
            if (!client || typeof client !== "function") {
              throw new Error(
                `Failed to create Ollama client. Got: ${typeof client}`
              );
            }
          } catch (clientError) {
            console.error("❌ Failed to create Ollama client:", clientError);
            throw new Error("Failed to initialize Ollama client");
          }

          console.log("✅ Ollama client created successfully");

          // Test the client with a simple generation
          try {
            console.log("🧪 Testing content generation...");

            const modelInstance = client(selectedModel);

            if (!modelInstance) {
              throw new Error("Failed to create model instance");
            }

            const generationResult = await generateText({
              model: modelInstance,
              prompt: 'Say "Connection test successful" to confirm.',
              maxTokens: 20,
              temperature: 0.1,
            });

            if (!generationResult?.text) {
              throw new Error("No response from model");
            }

            console.log(
              "✅ Test generation successful:",
              generationResult.text
            );
          } catch (modelError) {
            console.error("❌ Model test failed:", modelError);
            throw new Error(
              `Failed to use model '${selectedModel}'. Make sure it's downloaded in Ollama using 'ollama pull ${selectedModel}'`
            );
          }

          // Store the client and update state
          ollamaClientRef.current = client;

          setConnectionState({
            connected: true,
            connecting: false,
            error: null,
            baseURL,
            availableModels: testResult.models,
            selectedModel,
            lastConnected: new Date(),
          });

          // Save successful connection
          saveConnectionConfig(baseURL, selectedModel);

          console.log(
            "✅ Successfully connected to Ollama with model:",
            selectedModel
          );
          return true;
        } catch (error) {
          retryCount++;
          console.error(`❌ Connection attempt ${retryCount} failed:`, error);

          if (retryCount >= MAX_RETRIES) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Unknown connection error";

            setConnectionState((prev) => ({
              ...prev,
              connecting: false,
              error: errorMessage,
            }));

            return false;
          }

          // Wait before retry
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * retryCount)
          );
        }
      }

      return false;
    },
    [testConnection, saveConnectionConfig]
  );

  // Enhanced disconnect function
  const disconnect = useCallback(() => {
    // Cancel any ongoing connection
    if (connectionAbortControllerRef.current) {
      connectionAbortControllerRef.current.abort();
      connectionAbortControllerRef.current = null;
    }

    // Clear the client
    ollamaClientRef.current = null;

    setConnectionState((prev) => ({
      ...prev,
      connected: false,
      connecting: false,
      error: null,
      lastConnected: prev.connected ? new Date() : prev.lastConnected,
    }));

    // Clear saved config
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear saved config:", error);
    }

    console.log("🔌 Disconnected from Ollama");
  }, []);

  // Enhanced content generation with better error handling
  const generateContent = useCallback(
    async (prompt: string): Promise<string> => {
      console.log("🤖 Starting content generation...", {
        hasClient: !!ollamaClientRef.current,
        connected: connectionState.connected,
        model: connectionState.selectedModel,
      });

      // Validation checks
      if (!ollamaClientRef.current) {
        throw new Error("Ollama client not initialized. Please connect first.");
      }

      if (typeof ollamaClientRef.current !== "function") {
        console.error("❌ Ollama client is not a function:", {
          type: typeof ollamaClientRef.current,
          value: ollamaClientRef.current,
        });

        // Reset the client and force reconnection
        ollamaClientRef.current = null;
        setConnectionState((prev) => ({
          ...prev,
          connected: false,
          error: "Client corrupted, please reconnect",
        }));

        throw new Error("Ollama client is corrupted. Please reconnect.");
      }

      if (!connectionState.connected) {
        throw new Error("Ollama not connected. Please connect first.");
      }

      if (!connectionState.selectedModel) {
        throw new Error(
          "No model selected. Please reconnect and select a model."
        );
      }

      if (!prompt || prompt.trim().length === 0) {
        throw new Error("Prompt cannot be empty.");
      }

      try {
        console.log("🤖 Generating content with Ollama...", {
          model: connectionState.selectedModel,
          promptLength: prompt.length,
        });

        // Create the model instance
        const modelInstance = ollamaClientRef.current(
          connectionState.selectedModel
        );

        if (!modelInstance) {
          throw new Error("Failed to create model instance");
        }

        // Wrap in try-catch to handle Ollama API errors
        let text: string;
        try {
          const result = await generateText({
            model: modelInstance,
            prompt: prompt.trim(),
            maxTokens: 2000,
            temperature: 0.7,
          });
          text = result.text;
        } catch (apiError) {
          console.error("🚨 Ollama API error:", apiError);
          
          // Check if it's an Invalid JSON response error
          if (apiError instanceof Error && apiError.message.includes('Invalid JSON response')) {
            console.log("🔧 Attempting to extract content from malformed response...");
            
            // Try to extract any usable content from the error
            const errorStr = apiError.toString();
            const contentMatch = errorStr.match(/content["']?:\s*["']([^"']+)["']/i);
            if (contentMatch) {
              text = contentMatch[1];
              console.log("✅ Extracted partial content:", text.substring(0, 100));
            } else {
              // Re-throw with more context
              throw new Error(`Ollama API rejected response: ${apiError.message}`);
            }
          } else {
            throw apiError;
          }
        }

        if (!text || text.trim().length === 0) {
          throw new Error("Model returned empty response");
        }

        console.log("✅ Content generated successfully", {
          responseLength: text.length,
        });

        return text;
      } catch (error) {
        console.error("❌ Content generation failed:", error);

        // Check if it's a connection-related error
        if (
          error instanceof Error &&
          (error.message.includes("fetch") ||
            error.message.includes("network") ||
            error.message.includes("connect") ||
            error.message.includes("timeout"))
        ) {
          // Mark as disconnected and clear client
          ollamaClientRef.current = null;
          setConnectionState((prev) => ({
            ...prev,
            connected: false,
            error: "Lost connection to Ollama server",
          }));
        }

        throw error;
      }
    },
    [connectionState.connected, connectionState.selectedModel]
  );

  // Streaming content generation using Vercel AI SDK
  const generateContentStream = useCallback(
    async function* (prompt: string): AsyncIterable<string> {
      console.log("🌊 Starting streaming content generation...", {
        hasClient: !!ollamaClientRef.current,
        connected: connectionState.connected,
        model: connectionState.selectedModel,
      });

      // Validation checks
      if (!ollamaClientRef.current) {
        throw new Error("Ollama client not initialized. Please connect first.");
      }

      if (!connectionState.connected) {
        throw new Error("Ollama not connected. Please connect first.");
      }

      if (!connectionState.selectedModel) {
        throw new Error(
          "No model selected. Please reconnect and select a model."
        );
      }

      if (!prompt || prompt.trim().length === 0) {
        throw new Error("Prompt cannot be empty.");
      }

      try {
        console.log("🌊 Starting streaming with Ollama...", {
          model: connectionState.selectedModel,
          promptLength: prompt.length,
        });

        // Create the model instance
        const modelInstance = ollamaClientRef.current(
          connectionState.selectedModel
        );

        if (!modelInstance) {
          throw new Error("Failed to create model instance");
        }

        // Use Vercel AI SDK's streamText for streaming
        const { textStream } = streamText({
          model: modelInstance,
          prompt: prompt.trim(),
          maxTokens: 2000,
          temperature: 0.7,
        });

        console.log("✅ Streaming started successfully");

        // Yield each chunk as it arrives
        for await (const chunk of textStream) {
          if (chunk) {
            yield chunk;
          }
        }

        console.log("✅ Streaming completed");
      } catch (error) {
        console.error("❌ Streaming content generation failed:", error);

        // Check if it's a connection-related error
        if (
          error instanceof Error &&
          (error.message.includes("fetch") ||
            error.message.includes("network") ||
            error.message.includes("connect") ||
            error.message.includes("timeout"))
        ) {
          // Mark as disconnected and clear client
          ollamaClientRef.current = null;
          setConnectionState((prev) => ({
            ...prev,
            connected: false,
            error: "Lost connection to Ollama server",
          }));
        }

        throw error;
      }
    },
    [connectionState.connected, connectionState.selectedModel]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (connectionAbortControllerRef.current) {
        connectionAbortControllerRef.current.abort();
      }
    };
  }, []);

  const isReady =
    connectionState.connected &&
    !connectionState.connecting &&
    !!ollamaClientRef.current &&
    typeof ollamaClientRef.current === "function";

  return {
    connectionState,
    connect,
    disconnect,
    testConnection,
    generateContent,
    generateContentStream,
    isReady,
  };
}
