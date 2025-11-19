"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  useOpenRouterConnection,
  OpenRouterChatMessage,
  OpenRouterChatResult,
  OpenRouterChatRequest,
} from "./useOpenRouterConnection";
import {
  useOllamaConnection,
  UseOllamaConnectionReturn,
} from "@/components/DeepResearch/hooks/useOllamaConnection";
import { AIFlowModelTier } from "../lib/openRouterModels";
import { isLocalBuildEnv } from "../utils/buildEnv";

export type AIProviderKey = "openrouter" | "ollama" | "local-bridge";

export interface AIProviderRequest {
  tier?: AIFlowModelTier;
  prompt: string;
  systemPrompt?: string;
  messages?: OpenRouterChatMessage[];
  responseFormat?: { type: "json_object" };
  metadata?: Record<string, any>;
  preferProvider?: AIProviderKey;
  allowFallback?: boolean;
  temperature?: number;
  maxTokens?: number;
  modelId?: string;
}

export interface AIProviderResponse {
  provider: AIProviderKey;
  content: string;
  raw?: any;
  usage?: OpenRouterChatResult["usage"];
  model?: string;
}

export interface UseAIProvidersReturn {
  activeProvider: AIProviderKey;
  setActiveProvider: (provider: AIProviderKey) => void;
  openrouter: ReturnType<typeof useOpenRouterConnection>;
  ollama: UseOllamaConnectionReturn;
  providerReady: Record<AIProviderKey, boolean>;
  callLLM: (request: AIProviderRequest) => Promise<AIProviderResponse>;
  ensureProviderReady: (preferred?: AIProviderKey) => boolean;
}

const buildMessagesFromPrompt = (
  prompt: string,
  systemPrompt?: string
): OpenRouterChatMessage[] => {
  const messages: OpenRouterChatMessage[] = [];
  if (systemPrompt) {
    messages.push({
      role: "system",
      content: systemPrompt,
    });
  }
  messages.push({
    role: "user",
    content: prompt,
  });
  return messages;
};

export function useAIProviders(): UseAIProvidersReturn {
  const openrouter = useOpenRouterConnection();
  const ollama = useOllamaConnection();
  const {
    connectionState: openRouterState,
    sendChatRequest: sendOpenRouterChat,
    resolveModelId,
    getModelCapabilities,
  } = openrouter;
  const {
    connectionState: ollamaState,
    generateContent: generateOllamaContent,
  } = ollama;

  const localBridgeAvailable = isLocalBuildEnv();
  const [activeProvider, setActiveProvider] =
    useState<AIProviderKey>(
      localBridgeAvailable ? "local-bridge" : "openrouter"
    );

  const providerReady = useMemo(
    () => ({
      openrouter: openRouterState.connected,
      ollama: ollamaState.connected,
      "local-bridge": localBridgeAvailable,
    }),
    [
      openRouterState.connected,
      ollamaState.connected,
      localBridgeAvailable,
    ]
  );

  const ensureProviderReady = useCallback(
    (preferred?: AIProviderKey) => {
      const target = preferred || activeProvider;
      return providerReady[target];
    },
    [activeProvider, providerReady]
  );

  const callLLM = useCallback(
    async (request: AIProviderRequest): Promise<AIProviderResponse> => {
      const {
        tier = "generator",
        prompt,
        systemPrompt,
        messages,
        responseFormat,
        metadata,
        preferProvider,
        allowFallback = true,
        temperature,
        maxTokens,
        modelId,
      } = request;

      const preferredProvider = preferProvider || activeProvider;

      if (preferredProvider === "local-bridge") {
        throw new Error(
          "Local SWE Bridge selected. Use /api/local/aiframes endpoints via Codex/Cursor to plan frames."
        );
      }

      const useOpenRouter =
        preferredProvider === "openrouter"
          ? providerReady.openrouter
          : !providerReady[preferredProvider] && providerReady.openrouter;

      if (useOpenRouter && openRouterState.connected) {
        const resolvedModelId = resolveModelId(tier, modelId);
        const capabilities = getModelCapabilities(resolvedModelId);
        const canEnforceJson =
          !!responseFormat && capabilities.supportsJSON !== false;

        const chatRequest: OpenRouterChatRequest = {
          messages:
            messages || buildMessagesFromPrompt(prompt, systemPrompt),
          modelTier: tier,
          modelId: resolvedModelId,
          temperature,
          maxTokens,
          metadata,
        };

        if (canEnforceJson) {
          chatRequest.responseFormat = responseFormat;
        } else if (responseFormat && capabilities.supportsJSON === false) {
          console.warn(
            `Structured output disabled: model ${resolvedModelId} does not support response_format JSON.`
          );
        }

        const result = await sendOpenRouterChat(chatRequest);

        return {
          provider: "openrouter",
          content: result.content,
          raw: result.raw,
          usage: result.usage,
          model: result.model,
        };
      }

      if (
        (preferredProvider === "ollama" || allowFallback) &&
        ollamaState.connected
      ) {
        const flattenedPrompt = messages
          ? messages
              .map((msg) => {
                if (typeof msg.content === "string") {
                  return `${msg.role.toUpperCase()}: ${msg.content}`;
                }
                if (Array.isArray(msg.content)) {
                  return `${msg.role.toUpperCase()}: ${msg.content
                    .map((part) => {
                      if (typeof part === "string") return part;
                      if (part.type === "text") return part.text;
                      return ""; // image_url parts have no text
                    })
                    .join(" ")}`;
                }
                return "";
              })
              .join("\n\n")
          : prompt;

        const finalPrompt =
          systemPrompt && !messages
            ? `${systemPrompt}\n\nUser:\n${prompt}`
            : flattenedPrompt;

        const content = await generateOllamaContent(finalPrompt);
        return {
          provider: "ollama",
          content,
          raw: content,
          usage: undefined,
        };
      }

      throw new Error(
        "No AI provider is connected. Connect OpenRouter or Ollama to continue."
      );
    },
    [
      activeProvider,
      providerReady.openrouter,
      providerReady.ollama,
      providerReady["local-bridge"],
      openRouterState.connected,
      ollamaState.connected,
      sendOpenRouterChat,
      generateOllamaContent,
      resolveModelId,
      getModelCapabilities,
    ]
  );

  // 🔥 FIX: Add defensive logging to track when aiProviders object changes
  useEffect(() => {
    console.log('🔄 aiProviders object updated');
  }, [activeProvider, openrouter, ollama, providerReady, callLLM, ensureProviderReady]);

  // 🔥 FIX: Memoize return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      activeProvider,
      setActiveProvider,
      openrouter,
      ollama,
      providerReady,
      callLLM,
      ensureProviderReady,
    }),
    [
      activeProvider,
      setActiveProvider,
      openrouter,
      ollama,
      providerReady,
      callLLM,
      ensureProviderReady,
    ]
  );
}
