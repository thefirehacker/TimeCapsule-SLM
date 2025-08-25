"use client";

import { useState, useCallback } from "react";
import { ResearchHistoryItem } from "@/lib/indexeddb";
import { useResearchHistory } from "./useResearchHistory";

export interface LoadedResearchSession {
  item: ResearchHistoryItem;
  loadedAt: number;
}

export interface UseResearchNavigationReturn {
  // Current navigation state
  currentView: "research" | "history";
  loadedResearchSession: LoadedResearchSession | null;

  // Navigation actions
  showResearchHistory: () => void;
  showCurrentResearch: () => void;
  loadResearchSession: (researchId: string) => Promise<boolean>;
  clearLoadedSession: () => void;

  // History management
  refreshHistory: () => Promise<void>;
  deleteResearchSession: (researchId: string) => Promise<boolean>;

  // State
  isLoading: boolean;
  error: string | null;
}

export function useResearchNavigation(): UseResearchNavigationReturn {
  const [currentView, setCurrentView] = useState<"research" | "history">(
    "research"
  );
  const [loadedResearchSession, setLoadedResearchSession] =
    useState<LoadedResearchSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    getResearch,
    deleteResearch,
    refresh: refreshHistoryData,
  } = useResearchHistory();

  const showResearchHistory = useCallback(() => {
    setCurrentView("history");
    setError(null);
  }, []);

  const showCurrentResearch = useCallback(() => {
    setCurrentView("research");
    setError(null);
  }, []);

  const loadResearchSession = useCallback(
    async (researchId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("🔍 Loading research session:", researchId);

        const researchItem = await getResearch(researchId);
        if (!researchItem) {
          setError("Research session not found");
          return false;
        }

        console.log("✅ Research session loaded:", researchItem.title);

        setLoadedResearchSession({
          item: researchItem,
          loadedAt: Date.now(),
        });

        // Switch to research view to show the loaded session
        setCurrentView("research");

        return true;
      } catch (err) {
        console.error("❌ Failed to load research session:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load research session"
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [getResearch]
  );

  const clearLoadedSession = useCallback(() => {
    setLoadedResearchSession(null);
    setError(null);
    console.log("🧹 Cleared loaded research session");
  }, []);

  const refreshHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await refreshHistoryData();
      console.log("🔄 Research history refreshed");
    } catch (err) {
      console.error("❌ Failed to refresh history:", err);
      setError(
        err instanceof Error ? err.message : "Failed to refresh history"
      );
    } finally {
      setIsLoading(false);
    }
  }, [refreshHistoryData]);

  const deleteResearchSession = useCallback(
    async (researchId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("🗑️ Deleting research session:", researchId);

        const success = await deleteResearch(researchId);
        if (success) {
          // Clear loaded session if it's the one being deleted
          if (loadedResearchSession?.item.id === researchId) {
            setLoadedResearchSession(null);
          }

          console.log("✅ Research session deleted successfully");
          await refreshHistoryData(); // Refresh the history list
        }

        return success;
      } catch (err) {
        console.error("❌ Failed to delete research session:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to delete research session"
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [deleteResearch, loadedResearchSession, refreshHistoryData]
  );

  return {
    // Current navigation state
    currentView,
    loadedResearchSession,

    // Navigation actions
    showResearchHistory,
    showCurrentResearch,
    loadResearchSession,
    clearLoadedSession,

    // History management
    refreshHistory,
    deleteResearchSession,

    // State
    isLoading,
    error,
  };
}
