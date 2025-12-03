"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  AIFlowModelTier,
  DEFAULT_MODEL_SELECTIONS,
  OpenRouterModelOption,
  findModelOptionById,
  getDefaultModelForTier,
  getModelsForTier,
} from "../lib/openRouterModels";

const OPENROUTER_STORAGE_KEY = "openrouter_api_key_v1";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export type VisionMode = "text" | "vision";

export type OpenRouterContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export interface OpenRouterChatMessage {
  role: "system" | "user" | "assistant";
  content: string | OpenRouterContentPart[];
}

export interface OpenRouterChatRequest {
  messages: OpenRouterChatMessage[];
  modelTier?: AIFlowModelTier;
  modelId?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  responseFormat?: { type: "json_object" } | undefined;
  metadata?: Record<string, any>;
  signal?: AbortSignal;
  stream?: boolean;
}

export interface OpenRouterChatUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface OpenRouterChatResult {
  id: string;
  model: string;
  content: string;
  message: OpenRouterChatMessage | null;
  usage?: OpenRouterChatUsage;
  raw: any;
}

export interface RemoteOpenRouterModel {
  id: string;
  name?: string;
  description?: string;
  context_length?: number;
  pricing?: Record<string, unknown>;
  capabilities?: Record<string, unknown>;
}

export interface OpenRouterConnectionState {
  provider: "openrouter";
  connecting: boolean;
  connected: boolean;
  apiKeyPresent: boolean;
  maskedApiKey: string | null;
  error: string | null;
  zdrEnforced: boolean;
  modelSelections: Record<AIFlowModelTier, string>;
  visionMode: VisionMode;
  remoteModels: RemoteOpenRouterModel[];
  lastValidatedAt: string | null;
  lastLatencyMs?: number;
  lastTokensUsed?: number;
  managedProvider: boolean;
}

export interface UseOpenRouterConnectionReturn {
  connectionState: OpenRouterConnectionState;
  modelOptions: Record<AIFlowModelTier, OpenRouterModelOption[]>;
  connectWithApiKey: (apiKey: string) => Promise<boolean>;
  disconnect: () => void;
  updateModelSelection: (
    tier: AIFlowModelTier,
    modelId: string
  ) => void;
  setVisionMode: (mode: VisionMode) => void;
  sendChatRequest: (request: OpenRouterChatRequest) => Promise<OpenRouterChatResult>;
  clearStoredKey: () => void;
  resolveModelId: (
    tier: AIFlowModelTier,
    explicitId?: string
  ) => string;
  getModelCapabilities: (
    modelId?: string
  ) => {
    supportsJSON?: boolean;
    supportsVision?: boolean;
  };
}

const INITIAL_MODEL_SELECTIONS: Record<AIFlowModelTier, string> = {
  planner: DEFAULT_MODEL_SELECTIONS.planner,
  generator: DEFAULT_MODEL_SELECTIONS.generator,
  vision: DEFAULT_MODEL_SELECTIONS.vision,
  fallback: DEFAULT_MODEL_SELECTIONS.fallback,
};

const maskKey = (rawKey: string) => {
  if (!rawKey) return null;
  if (rawKey.length <= 8) {
    return `${rawKey.slice(0, 2)}••••${rawKey.slice(-2)}`;
  }
  return `${rawKey.slice(0, 4)}••••${rawKey.slice(-4)}`;
};

const inferOrigin = () => {
  if (typeof window === "undefined") return "https://canvas3d.ai";
  return window.location.origin;
};

export function useOpenRouterConnection(): UseOpenRouterConnectionReturn {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const apiKeyRef = useRef<string | null>(null);
  const [connectionState, setConnectionState] =
    useState<OpenRouterConnectionState>({
      provider: "openrouter",
      connecting: false,
      connected: false,
      apiKeyPresent: false,
      maskedApiKey: null,
      error: null,
      zdrEnforced: true,
      modelSelections: { ...INITIAL_MODEL_SELECTIONS },
      visionMode: "text",
      remoteModels: [],
      lastValidatedAt: null,
      lastLatencyMs: undefined,
      lastTokensUsed: undefined,
      managedProvider: false,
    });
  const [managedProvider, setManagedProvider] = useState(false);

  useEffect(() => {
    apiKeyRef.current = apiKey;
  }, [apiKey]);

  useEffect(() => {
    let cancelled = false;
    const bootstrapManagedProvider = async () => {
      try {
        const response = await fetch("/api/aiframes/openrouter/models");
        if (!response.ok) return;
        const payload = await response.json();
        if (cancelled || !payload?.managed) return;
        setManagedProvider(true);
        setConnectionState((prev) => ({
          ...prev,
          connecting: false,
          connected: true,
          apiKeyPresent: true,
          maskedApiKey: "TimeCapsule Credits",
          remoteModels: payload.models ?? [],
          lastValidatedAt: new Date().toISOString(),
          error: null,
          managedProvider: true,
        }));
      } catch (error) {
        console.debug("Managed OpenRouter proxy unavailable:", error);
      }
    };

    bootstrapManagedProvider();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistApiKey = useCallback((key: string | null) => {
    if (typeof window === "undefined") return;
    if (key) {
      window.localStorage.setItem(
        OPENROUTER_STORAGE_KEY,
        btoa(key.trim())
      );
    } else {
      window.localStorage.removeItem(OPENROUTER_STORAGE_KEY);
    }
  }, []);

  const validateApiKey = useCallback(
    async (
      key: string,
      options: { persist?: boolean; silent?: boolean } = {}
    ): Promise<boolean> => {
      const { persist = true, silent = false } = options;
      const trimmedKey = key.trim();

      setConnectionState((prev) => ({
        ...prev,
        connecting: !silent,
        error: null,
      }));

      try {
        const response = await fetch(`${OPENROUTER_BASE_URL}/models`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${trimmedKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "HTTP-Referer": inferOrigin(),
            "X-Title": "TimeCapsule AI Frames",
          },
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          const message =
            errorPayload?.error?.message ||
            errorPayload?.message ||
            `OpenRouter verification failed (${response.status})`;
          throw new Error(message);
        }

        const data = await response.json();
        const remoteModels: RemoteOpenRouterModel[] = Array.isArray(data?.data)
          ? data.data
          : [];

        if (persist) {
          persistApiKey(trimmedKey);
        }

        setApiKey(trimmedKey);
        setConnectionState((prev) => ({
          ...prev,
          connecting: false,
          connected: true,
          apiKeyPresent: true,
          maskedApiKey: maskKey(trimmedKey),
          remoteModels,
          lastValidatedAt: new Date().toISOString(),
          error: null,
          managedProvider: false,
        }));

        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown OpenRouter error";
        setConnectionState((prev) => ({
          ...prev,
          connecting: false,
          connected: false,
          error: message,
        }));
        if (!silent) {
          console.error("OpenRouter validation failed:", error);
        }
        return false;
      }
    },
    [persistApiKey]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(OPENROUTER_STORAGE_KEY);
    if (!stored) return;
    try {
      const decoded = atob(stored);
      if (decoded) {
        setManagedProvider(false);
        setApiKey(decoded);
        setConnectionState((prev) => ({
          ...prev,
          apiKeyPresent: true,
          maskedApiKey: maskKey(decoded),
          managedProvider: false,
        }));
        void validateApiKey(decoded, { persist: false, silent: true });
      }
    } catch (error) {
      console.warn("Failed to decode stored OpenRouter key:", error);
      window.localStorage.removeItem(OPENROUTER_STORAGE_KEY);
    }
  }, [validateApiKey]);

  const connectWithApiKey = useCallback(
    async (key: string) => {
      setManagedProvider(false);
      return validateApiKey(key, { persist: true });
    },
    [validateApiKey]
  );

  const disconnect = useCallback(() => {
    setApiKey(null);
    persistApiKey(null);
    setConnectionState((prev) => ({
      ...prev,
      connected: false,
      apiKeyPresent: false,
      maskedApiKey: null,
      error: null,
      remoteModels: [],
      managedProvider: false,
    }));
    setManagedProvider(false);
  }, [persistApiKey]);

  const clearStoredKey = useCallback(() => {
    setApiKey(null);
    persistApiKey(null);
    setConnectionState((prev) => ({
      ...prev,
      apiKeyPresent: false,
      maskedApiKey: null,
      managedProvider: false,
    }));
    setManagedProvider(false);
  }, [persistApiKey]);

  const updateModelSelection = useCallback(
    (tier: AIFlowModelTier, modelId: string) => {
      setConnectionState((prev) => ({
        ...prev,
        modelSelections: {
          ...prev.modelSelections,
          [tier]: modelId,
        },
      }));
    },
    []
  );

  const setVisionMode = useCallback((mode: VisionMode) => {
    setConnectionState((prev) => ({
      ...prev,
      visionMode: mode,
    }));
  }, []);

  const resolveModelId = useCallback(
    (tier: AIFlowModelTier, explicit?: string) => {
      const selection =
        explicit ||
        connectionState.modelSelections[tier] ||
        getDefaultModelForTier(tier)?.id ||
        DEFAULT_MODEL_SELECTIONS[tier];

      if (tier === "vision" && connectionState.visionMode === "text") {
        // Degrade to generator when user selects text-only mode
        return (
          connectionState.modelSelections.generator ||
          getDefaultModelForTier("generator")?.id ||
          DEFAULT_MODEL_SELECTIONS.generator
        );
      }

      if (selection) return selection;

      return (
        getDefaultModelForTier(tier)?.id ||
        DEFAULT_MODEL_SELECTIONS[tier] ||
        DEFAULT_MODEL_SELECTIONS.fallback
      );
    },
    [connectionState.modelSelections, connectionState.visionMode]
  );

  const getModelCapabilities = useCallback(
    (modelId?: string) => {
      if (!modelId) return {};
      const staticOption = findModelOptionById(modelId);
      const remoteOption = connectionState.remoteModels.find(
        (model) => model.id === modelId
      );
      const remoteCapabilities = (remoteOption?.capabilities ||
        {}) as Record<string, any>;

      const supportsJSON =
        typeof staticOption?.supportsJSON === "boolean"
          ? staticOption.supportsJSON
          : typeof remoteCapabilities?.json === "boolean"
          ? remoteCapabilities.json
          : typeof remoteCapabilities?.response_format?.json === "boolean"
          ? remoteCapabilities.response_format.json
          : undefined;

      const supportsVision =
        typeof staticOption?.supportsVision === "boolean"
          ? staticOption.supportsVision
          : typeof remoteCapabilities?.vision === "boolean"
          ? remoteCapabilities.vision
          : undefined;

      return { supportsJSON, supportsVision };
    },
    [connectionState.remoteModels]
  );

  const normalizeContent = (content: any): string => {
    if (typeof content === "string") {
      return content;
    }

    if (Array.isArray(content)) {
      return content
        .map((part) => {
          if (!part) return "";
          if (typeof part === "string") return part;
          if (part.type === "text") return part.text || "";
          return "";
        })
        .join("");
    }

    if (content?.text) {
      return content.text;
    }

    return "";
  };

  const sendChatRequest = useCallback(
    async (request: OpenRouterChatRequest): Promise<OpenRouterChatResult> => {
      const {
        messages,
        modelTier = "generator",
        modelId,
        temperature,
        maxTokens,
        topP,
        frequencyPenalty,
        presencePenalty,
        responseFormat,
        metadata,
        signal,
      } = request;

      const resolvedModelId = resolveModelId(modelTier, modelId);
      const tierDefaults =
        findModelOptionById(resolvedModelId) ||
        getDefaultModelForTier(modelTier) ||
        getDefaultModelForTier("fallback");

      const finalTemperature =
        temperature ??
        tierDefaults?.defaultTemperature ??
        (modelTier === "planner" ? 0.2 : 0.35);
      const finalMaxTokens =
        maxTokens ?? tierDefaults?.maxOutputTokens ?? 2048;

      if (managedProvider) {
        const response = await fetch("/api/aiframes/openrouter/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages,
            modelTier,
            modelId: resolvedModelId,
            temperature: finalTemperature,
            maxTokens: finalMaxTokens,
            topP,
            frequencyPenalty,
            presencePenalty,
            responseFormat,
            metadata,
          }),
          signal,
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(
            payload?.error ||
              `Managed OpenRouter request failed (${response.status})`
          );
        }
        const data = await response.json();
        return {
          id: data?.id ?? `openrouter_${Date.now()}`,
          model: data?.model ?? resolvedModelId,
          content: data.content,
          message: data.message ?? null,
          usage: data.usage,
          raw: data.raw ?? data,
        };
      }

      if (!apiKeyRef.current) {
        throw new Error(
          "OpenRouter API key not configured. Connect in AI Controls first."
        );
      }

      const payload: Record<string, any> = {
        model: resolvedModelId,
        zdr: true,
        messages,
        temperature: finalTemperature,
        max_tokens: finalMaxTokens,
      };

      if (typeof topP === "number") payload.top_p = topP;
      if (typeof frequencyPenalty === "number")
        payload.frequency_penalty = frequencyPenalty;
      if (typeof presencePenalty === "number")
        payload.presence_penalty = presencePenalty;
      if (responseFormat) payload.response_format = responseFormat;
      if (metadata) payload.metadata = metadata;

      const start = performance.now();
      const response = await fetch(
        `${OPENROUTER_BASE_URL}/chat/completions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKeyRef.current}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "HTTP-Referer": inferOrigin(),
            "X-Title": "TimeCapsule AI Flow Builder",
          },
          body: JSON.stringify(payload),
          signal,
        }
      );

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const message =
          errorPayload?.error?.message ||
          errorPayload?.message ||
          `OpenRouter request failed (${response.status})`;
        throw new Error(message);
      }

      const data = await response.json();
      const choice = data?.choices?.[0];
      const message = choice?.message ?? null;
      const content = normalizeContent(message?.content);

      const usage = data?.usage;
      const latency = performance.now() - start;

      setConnectionState((prev) => ({
        ...prev,
        connected: true,
        error: null,
        lastLatencyMs: latency,
        lastTokensUsed: usage?.total_tokens,
        managedProvider: false,
      }));

      return {
        id: data?.id ?? `openrouter_${Date.now()}`,
        model: data?.model ?? resolvedModelId,
        content,
        message,
        usage,
        raw: data,
      };
    },
    [resolveModelId, managedProvider]
  );

  const modelOptions = useMemo(
    () =>
      ({
        planner: getModelsForTier("planner"),
        generator: getModelsForTier("generator"),
        vision: getModelsForTier("vision"),
        fallback: getModelsForTier("fallback"),
      }) as Record<AIFlowModelTier, OpenRouterModelOption[]>,
    []
  );

  return {
    connectionState,
    modelOptions,
    connectWithApiKey,
    disconnect,
    updateModelSelection,
    setVisionMode,
    sendChatRequest,
    clearStoredKey,
    resolveModelId,
    getModelCapabilities,
  };
}
