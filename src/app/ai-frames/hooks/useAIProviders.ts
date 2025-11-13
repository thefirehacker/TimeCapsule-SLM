"use client";

import { useState, useMemo, useCallback } from "react";
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

  const localBridgeAvailable = isLocalBuildEnv();
  const [activeProvider, setActiveProvider] =
    useState<AIProviderKey>(
      localBridgeAvailable ? "local-bridge" : "openrouter"
    );

  const providerReady = useMemo(
    () => ({
      openrouter: openrouter.connectionState.connected,
      ollama: ollama.connectionState.connected,
      "local-bridge": localBridgeAvailable,
    }),
    [
      openrouter.connectionState.connected,
      ollama.connectionState.connected,
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

      if (useOpenRouter && openrouter.connectionState.connected) {
        const chatRequest: OpenRouterChatRequest = {
          messages:
            messages || buildMessagesFromPrompt(prompt, systemPrompt),
          modelTier: tier,
          temperature,
          maxTokens,
          responseFormat,
          metadata,
        };

        const result = await openrouter.sendChatRequest(chatRequest);

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
        ollama.connectionState.connected
      ) {
        const flattenedPrompt = messages
          ? messages
              .map((msg) => {
                if (typeof msg.content === "string") {
                  return `${msg.role.toUpperCase()}: ${msg.content}`;
                }
                if (Array.isArray(msg.content)) {
                  return `${msg.role.toUpperCase()}: ${msg.content
                    .map((part) =>
                      typeof part === "string" ? part : part.text || ""
                    )
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

        const content = await ollama.generateContent(finalPrompt);
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
      openrouter,
      ollama,
      providerReady.openrouter,
      providerReady.ollama,
      providerReady["local-bridge"],
    ]
  );

  return {
    activeProvider,
    setActiveProvider,
    openrouter,
    ollama,
    providerReady,
    callLLM,
    ensureProviderReady,
  };
}
