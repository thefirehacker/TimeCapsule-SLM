import { useState, useCallback } from "react";
import { ResearchHistoryItem } from "@/lib/indexeddb";
import { researchHistoryDB } from "@/lib/indexeddb";

export interface LoadedResearchSession {
  id: string;
  researchItem: ResearchHistoryItem;
  steps: any[];
  timestamp: number;
  isLoaded: boolean;
}

export interface UseResearchNavigationReturn {
  currentSession: LoadedResearchSession | null;
  isLoading: boolean;
  error: string | null;
  loadResearch: (researchId: string) => Promise<void>;
  clearCurrentSession: () => void;
  refreshCurrentSession: () => Promise<void>;
  exportSessionData: () => Promise<string | null>;
}

/**
 * Hook to manage navigation to historical research sessions
 */
export function useResearchNavigation(): UseResearchNavigationReturn {
  const [currentSession, setCurrentSession] =
    useState<LoadedResearchSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load a research session by ID
  const loadResearch = useCallback(async (researchId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🔍 Loading research session:", researchId);

      // Get research item from IndexedDB
      const researchItem = await researchHistoryDB.getResearch(researchId);

      if (!researchItem) {
        throw new Error(`Research session with ID ${researchId} not found`);
      }

      // Create loaded session object
      const loadedSession: LoadedResearchSession = {
        id: researchId,
        researchItem,
        steps: researchItem.steps || [],
        timestamp: Date.now(),
        isLoaded: true,
      };

      setCurrentSession(loadedSession);

      console.log("✅ Research session loaded:", {
        id: researchId,
        title: researchItem.title,
        stepsCount: loadedSession.steps.length,
        wordCount: researchItem.wordCount,
        timestamp: new Date(researchItem.timestamp).toLocaleString(),
      });

      // Log detailed session information
      console.log("📊 Session details:", {
        researchType: researchItem.type,
        duration: researchItem.duration,
        agentTasks: loadedSession.steps.reduce((sum, step) => {
          return (
            sum + (step.agentTasks?.length || 0) + (step.subSteps?.length || 0)
          );
        }, 0),
        sourcesCount: researchItem.sourcesCount,
        chunksProcessed: researchItem.chunksProcessed,
      });
    } catch (err) {
      console.error("❌ Error loading research session:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load research session"
      );
      setCurrentSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear the current session
  const clearCurrentSession = useCallback(() => {
    console.log("🧹 Clearing current research session");
    setCurrentSession(null);
    setError(null);
  }, []);

  // Refresh the current session data
  const refreshCurrentSession = useCallback(async () => {
    if (!currentSession) {
      console.warn("⚠️ No current session to refresh");
      return;
    }

    try {
      await loadResearch(currentSession.id);
    } catch (err) {
      console.error("❌ Error refreshing current session:", err);
      setError(
        err instanceof Error ? err.message : "Failed to refresh session"
      );
    }
  }, [currentSession, loadResearch]);

  // Export session data as JSON string
  const exportSessionData = useCallback(async (): Promise<string | null> => {
    if (!currentSession) {
      console.warn("⚠️ No current session to export");
      return null;
    }

    try {
      const exportData = {
        session: currentSession,
        exportedAt: new Date().toISOString(),
        version: "1.0",
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      console.log("📤 Session data exported successfully");
      return jsonString;
    } catch (err) {
      console.error("❌ Error exporting session data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to export session data"
      );
      return null;
    }
  }, [currentSession]);

  return {
    currentSession,
    isLoading,
    error,
    loadResearch,
    clearCurrentSession,
    refreshCurrentSession,
    exportSessionData,
  };
}

