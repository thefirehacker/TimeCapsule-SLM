"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getUnifiedWebSearchService,
  UnifiedWebSearchService,
} from "@/lib/UnifiedWebSearchService";

const FIRECRAWL_STORAGE_KEY = "firecrawl_api_key";

export interface FirecrawlKeyState {
  apiKey: string;
  configured: boolean;
  testing: boolean;
  error: string | null;
  lastValidatedAt: string | null;
}

export interface UseFirecrawlKeyReturn {
  firecrawlState: FirecrawlKeyState;
  saveFirecrawlKey: (
    apiKey: string,
    options?: { validate?: boolean }
  ) => Promise<boolean>;
  clearFirecrawlKey: () => void;
  testFirecrawlKey: (apiKey?: string) => Promise<boolean>;
}

export function useFirecrawlKey(): UseFirecrawlKeyReturn {
  const unifiedService = useMemo<UnifiedWebSearchService>(
    () => getUnifiedWebSearchService(),
    []
  );

  const [firecrawlState, setFirecrawlState] = useState<FirecrawlKeyState>({
    apiKey: "",
    configured: false,
    testing: false,
    error: null,
    lastValidatedAt: null,
  });

  const configureService = useCallback(
    (apiKey: string | null) => {
      try {
        unifiedService.configureFirecrawl(apiKey);
      } catch (error) {
        console.warn("Failed to configure Firecrawl service:", error);
      }
    },
    [unifiedService]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedKey = window.localStorage.getItem(FIRECRAWL_STORAGE_KEY);
    if (savedKey) {
      configureService(savedKey);
      setFirecrawlState((prev) => ({
        ...prev,
        apiKey: savedKey,
        configured: true,
        error: null,
      }));
    }
  }, [configureService]);

  const persistKey = useCallback((apiKey: string | null) => {
    if (typeof window === "undefined") return;
    if (apiKey) {
      window.localStorage.setItem(FIRECRAWL_STORAGE_KEY, apiKey);
    } else {
      window.localStorage.removeItem(FIRECRAWL_STORAGE_KEY);
    }
  }, []);

  const testFirecrawlKey = useCallback(
    async (keyOverride?: string): Promise<boolean> => {
      const keyToTest = (keyOverride ?? firecrawlState.apiKey).trim();
      if (!keyToTest) {
        setFirecrawlState((prev) => ({
          ...prev,
          error: "Firecrawl API key is required",
        }));
        return false;
      }

      setFirecrawlState((prev) => ({
        ...prev,
        testing: true,
        error: null,
      }));

      try {
        const response = await fetch("/api/test-firecrawl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ apiKey: keyToTest }),
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload?.success) {
          throw new Error(
            payload?.message ||
              "Firecrawl verification failed. Check your API key."
          );
        }

        setFirecrawlState((prev) => ({
          ...prev,
          testing: false,
          error: null,
          lastValidatedAt: new Date().toISOString(),
        }));
        return true;
      } catch (error) {
        setFirecrawlState((prev) => ({
          ...prev,
          testing: false,
          error:
            error instanceof Error
              ? error.message
              : "Unable to verify Firecrawl API key",
        }));
        return false;
      }
    },
    [firecrawlState.apiKey]
  );

  const saveFirecrawlKey = useCallback(
    async (apiKey: string, options: { validate?: boolean } = {}) => {
      const trimmed = apiKey.trim();
      if (!trimmed) {
        configureService(null);
        persistKey(null);
        setFirecrawlState({
          apiKey: "",
          configured: false,
          testing: false,
          error: null,
          lastValidatedAt: null,
        });
        return true;
      }

      const shouldValidate = options.validate !== false;
      if (shouldValidate) {
        const isValid = await testFirecrawlKey(trimmed);
        if (!isValid) {
          return false;
        }
      }

      configureService(trimmed);
      persistKey(trimmed);

      setFirecrawlState((prev) => ({
        ...prev,
        apiKey: trimmed,
        configured: true,
        error: null,
        lastValidatedAt: shouldValidate
          ? new Date().toISOString()
          : prev.lastValidatedAt,
      }));

      return true;
    },
    [configureService, persistKey, testFirecrawlKey]
  );

  const clearFirecrawlKey = useCallback(() => {
    configureService(null);
    persistKey(null);
    setFirecrawlState({
      apiKey: "",
      configured: false,
      testing: false,
      error: null,
      lastValidatedAt: null,
    });
  }, [configureService, persistKey]);

  return {
    firecrawlState,
    saveFirecrawlKey,
    clearFirecrawlKey,
    testFirecrawlKey,
  };
}
