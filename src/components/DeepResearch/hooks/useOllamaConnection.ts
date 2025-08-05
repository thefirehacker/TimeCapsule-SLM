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
  isAutoReconnecting: boolean;
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
  clearSavedConnection: () => void;
  isReady: boolean;
}

const DEFAULT_BASE_URL = "http://localhost:11434";
const STORAGE_KEY = "ollama-connection-config";
const CONNECTION_TIMEOUT = 15000; // 15 seconds
const MAX_RETRIES = 3;
const MAX_CONNECTION_AGE_HOURS = 24; // Don't auto-reconnect if connection is older than 24 hours

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
      isAutoReconnecting: false,
    }
  );

  // Use ref to store the client to avoid stale closures
  const ollamaClientRef = useRef<OllamaClient | null>(null);
  const connectionAbortControllerRef = useRef<AbortController | null>(null);
  const hasAttemptedAutoReconnectRef = useRef(false);

  // Load saved connection config on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.baseURL && config.selectedModel) {
          // Check if the saved connection is not too old
          const isConnectionValid =
            !config.lastConnected ||
            (() => {
              const lastConnected = new Date(config.lastConnected);
              const now = new Date();
              const hoursDiff =
                (now.getTime() - lastConnected.getTime()) / (1000 * 60 * 60);
              return hoursDiff < MAX_CONNECTION_AGE_HOURS;
            })();

          if (!isConnectionValid) {
            localStorage.removeItem(STORAGE_KEY);
            return;
          }

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
      const config = {
        baseURL,
        selectedModel: model,
        lastConnected: new Date().toISOString(),
        version: "1.0", // For future compatibility
      };
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

        // Sort models to prioritize Gemma models first
        const sortedModels = [...models].sort((a, b) => {
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();
          const aIsGemma = aLower.includes("gemma");
          const bIsGemma = bLower.includes("gemma");

          // Prioritize Gemma models
          if (aIsGemma && !bIsGemma) return -1;
          if (!aIsGemma && bIsGemma) return 1;

          // If both are Gemma or both are not Gemma, sort alphabetically
          return a.localeCompare(b);
        });

        console.log(
          "✅ Ollama connection test passed, sorted models:",
          sortedModels
        );
        return { success: true, models: sortedModels };
      } catch (error) {
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

          // Use specified model or prioritize Gemma models
          let selectedModel = model;
          if (!selectedModel) {
            // Find first Gemma model, or fall back to first available
            const gemmaModel = testResult.models.find((m) =>
              m.toLowerCase().includes("gemma")
            );
            selectedModel = gemmaModel || testResult.models[0];
          }

          if (!selectedModel) {
            throw new Error("No valid model selected");
          }

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
            throw new Error("Failed to initialize Ollama client");
          }

          // Test the client with a simple generation
          try {
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
          } catch (modelError) {
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

          return true;
        } catch (error) {
          retryCount++;

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
      isAutoReconnecting: false,
      lastConnected: prev.connected ? new Date() : prev.lastConnected,
    }));

    // Clear saved config
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear saved config:", error);
    }
  }, []);

  // Enhanced content generation with better error handling
  const generateContent = useCallback(
    async (prompt: string): Promise<string> => {
      // Validation checks
      if (!ollamaClientRef.current) {
        throw new Error("Ollama client not initialized. Please connect first.");
      }

      if (typeof ollamaClientRef.current !== "function") {
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
          if (
            apiError instanceof Error &&
            apiError.message.includes("Invalid JSON response")
          ) {
            console.log(
              "🔧 Attempting to extract content from malformed response..."
            );

            // Try to extract any usable content from the error
            const errorStr = apiError.toString();
            const contentMatch = errorStr.match(
              /content["']?:\s*["']([^"']+)["']/i
            );
            if (contentMatch) {
              text = contentMatch[1];
            } else {
              // Re-throw with more context
              throw new Error(
                `Ollama API rejected response: ${apiError.message}`
              );
            }
          } else {
            throw apiError;
          }
        }

        if (!text || text.trim().length === 0) {
          throw new Error("Model returned empty response");
        }

        return text;
      } catch (error) {
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

        // Yield each chunk as it arrives
        for await (const chunk of textStream) {
          if (chunk) {
            yield chunk;
          }
        }
      } catch (error) {
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

  // Auto-reconnect effect that runs after connect function is defined
  useEffect(() => {
    // Only attempt auto-reconnect if we have saved config and haven't tried yet
    if (hasAttemptedAutoReconnectRef.current) {
      return;
    }

    const savedConfig = localStorage.getItem(STORAGE_KEY);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (
          config.baseURL &&
          config.selectedModel &&
          !connectionState.connected
        ) {
          hasAttemptedAutoReconnectRef.current = true;

          // Auto-reconnect with a small delay
          const autoReconnect = async () => {
            setConnectionState((prev) => ({
              ...prev,
              isAutoReconnecting: true,
            }));

            try {
              await connect(config.baseURL, config.selectedModel);
            } catch (error) {
              // Silent error handling for auto-reconnect
            } finally {
              setConnectionState((prev) => ({
                ...prev,
                isAutoReconnecting: false,
              }));
            }
          };

          // Small delay to ensure component is fully mounted
          setTimeout(autoReconnect, 500);
        }
      } catch (error) {
        console.warn("Failed to parse saved config for auto-reconnect:", error);
      }
    } else {
      hasAttemptedAutoReconnectRef.current = true;
    }
  }, [connect, connectionState.connected]);

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

  // Function to clear saved connection without disconnecting
  const clearSavedConnection = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear saved connection config:", error);
    }
  }, []);

  return {
    connectionState,
    connect,
    disconnect,
    testConnection,
    generateContent,
    generateContentStream,
    clearSavedConnection,
    isReady,
  };
}
