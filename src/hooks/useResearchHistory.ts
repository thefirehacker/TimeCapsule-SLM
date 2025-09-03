import { useState, useEffect, useCallback } from "react";
import {
  researchHistoryDB,
  ResearchHistoryItem,
  ResearchAgentTask,
} from "@/lib/indexeddb";

export interface UseResearchHistoryReturn {
  history: ResearchHistoryItem[];
  loading: boolean;
  error: string | null;
  addResearch: (
    item: Omit<ResearchHistoryItem, "id" | "createdAt" | "updatedAt">
  ) => Promise<string>;
  updateResearch: (
    id: string,
    updates: Partial<ResearchHistoryItem>
  ) => Promise<void>;
  deleteResearch: (id: string) => Promise<void>;
  getResearch: (id: string) => Promise<ResearchHistoryItem | null>;
  clearAll: () => Promise<void>;
  searchHistory: (query: string) => Promise<ResearchHistoryItem[]>;
  getStats: () => Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    oldestDate: number | null;
    newestDate: number | null;
  }>;
  refresh: () => Promise<void>;
}

export function useResearchHistory(): UseResearchHistoryReturn {
  const [history, setHistory] = useState<ResearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load history on mount
  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await researchHistoryDB.getAllResearch();
      setHistory(data);
    } catch (err) {
      console.error("Error loading research history:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load research history"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addResearch = useCallback(
    async (
      item: Omit<ResearchHistoryItem, "id" | "createdAt" | "updatedAt">
    ) => {
      try {
        const id = await researchHistoryDB.addResearch(item);
        await loadHistory(); // Refresh the list
        return id;
      } catch (err) {
        console.error("Error adding research:", err);
        setError(err instanceof Error ? err.message : "Failed to add research");
        throw err;
      }
    },
    [loadHistory]
  );

  const updateResearch = useCallback(
    async (id: string, updates: Partial<ResearchHistoryItem>) => {
      try {
        await researchHistoryDB.updateResearch(id, updates);
        await loadHistory(); // Refresh the list
      } catch (err) {
        console.error("Error updating research:", err);
        setError(
          err instanceof Error ? err.message : "Failed to update research"
        );
        throw err;
      }
    },
    [loadHistory]
  );

  const deleteResearch = useCallback(
    async (id: string) => {
      try {
        await researchHistoryDB.deleteResearch(id);
        await loadHistory(); // Refresh the list
      } catch (err) {
        console.error("Error deleting research:", err);
        setError(
          err instanceof Error ? err.message : "Failed to delete research"
        );
        throw err;
      }
    },
    [loadHistory]
  );

  const getResearch = useCallback(async (id: string) => {
    try {
      return await researchHistoryDB.getResearch(id);
    } catch (err) {
      console.error("Error getting research:", err);
      setError(err instanceof Error ? err.message : "Failed to get research");
      throw err;
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await researchHistoryDB.clearAll();
      await loadHistory(); // Refresh the list
    } catch (err) {
      console.error("Error clearing research history:", err);
      setError(
        err instanceof Error ? err.message : "Failed to clear research history"
      );
      throw err;
    }
  }, [loadHistory]);

  const searchHistory = useCallback(async (query: string) => {
    try {
      return await researchHistoryDB.searchResearch(query);
    } catch (err) {
      console.error("Error searching research history:", err);
      setError(
        err instanceof Error ? err.message : "Failed to search research history"
      );
      throw err;
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      return await researchHistoryDB.getStats();
    } catch (err) {
      console.error("Error getting research stats:", err);
      setError(
        err instanceof Error ? err.message : "Failed to get research stats"
      );
      throw err;
    }
  }, []);

  const refresh = useCallback(async () => {
    await loadHistory();
  }, [loadHistory]);

  return {
    history,
    loading,
    error,
    addResearch,
    updateResearch,
    deleteResearch,
    getResearch,
    clearAll,
    searchHistory,
    getStats,
    refresh,
  };
}

// Helper function to create a research history item from complete multi-agent research data
export function createResearchHistoryItem(
  prompt: string,
  researchType: string,
  researchDepth: string,
  enableRAG: boolean,
  enableWebSearch: boolean,
  researchContext?: any,
  agentTasks?: ResearchAgentTask[],
  steps?: any[],
  finalOutput?: string
): Omit<ResearchHistoryItem, "id" | "createdAt" | "updatedAt"> {
  console.log(
    "🔍 [createResearchHistoryItem] Creating research history item:",
    {
      prompt: prompt.substring(0, 50) + "...",
      hasAgentTasks: !!agentTasks,
      agentTasksCount: agentTasks?.length || 0,
      hasSteps: !!steps,
      stepsCount: steps?.length || 0,
      researchType,
      researchDepth,
    }
  );

  // Extract title from prompt (first 50 characters)
  const title = prompt.length > 50 ? `${prompt.substring(0, 50)}...` : prompt;

  // Calculate word count from final output or prompt
  const wordCount = finalOutput
    ? finalOutput.split(/\s+/).length
    : prompt.split(/\s+/).length;

  // 🔥 CRITICAL FIX: Properly preserve agentTasks with timeline data
  let finalAgentTasks: ResearchAgentTask[] = [];

  if (agentTasks && agentTasks.length > 0) {
    // Use provided agent tasks directly - they should already have timeline data
    finalAgentTasks = agentTasks.map((task) => ({
      ...task,
      // Ensure progressHistory is preserved
      progressHistory: task.progressHistory || [],
      // Ensure all required fields have defaults
      agentType: task.agentType || "unknown",
      status: task.status || "completed",
      progress: task.progress || 100,
      startTime: task.startTime || Date.now(),
      duration: task.duration || 0,
      retryCount: task.retryCount || 0,
    }));

    console.log("📅 [createResearchHistoryItem] Using provided agentTasks:", {
      totalTasks: finalAgentTasks.length,
      tasksWithTimeline: finalAgentTasks.filter(
        (t) => t.progressHistory && t.progressHistory.length > 0
      ).length,
      taskNames: finalAgentTasks.map((t) => t.agentName),
    });

    // Log timeline data for each task
    finalAgentTasks.forEach((task, idx) => {
      if (task.progressHistory && task.progressHistory.length > 0) {
        console.log(
          `📊 [createResearchHistoryItem] Agent "${task.agentName}" has ${task.progressHistory.length} timeline entries`
        );
      }
    });
  } else if (steps && steps.length > 0) {
    // Extract from steps as fallback
    console.log(
      "🔄 [createResearchHistoryItem] Extracting agent tasks from steps"
    );

    steps.forEach((step) => {
      if (step.agentTasks && Array.isArray(step.agentTasks)) {
        // Step has direct agentTasks array
        finalAgentTasks.push(
          ...step.agentTasks.map((task: any) => ({
            ...task,
            progressHistory: task.progressHistory || [],
            agentType: task.agentType || "unknown",
            status: task.status || "completed",
            progress: task.progress || 100,
            startTime: task.startTime || Date.now(),
            duration: task.duration || 0,
            retryCount: task.retryCount || 0,
          }))
        );
      } else if (step.subSteps && Array.isArray(step.subSteps)) {
        // Step has subSteps (agent sub-steps)
        step.subSteps.forEach((subStep: any) => {
          finalAgentTasks.push({
            agentName: subStep.agentName || "Unknown Agent",
            agentType: subStep.agentType || "unknown",
            status: subStep.status || "completed",
            progress: subStep.progress || 100,
            duration: subStep.duration || 0,
            startTime: subStep.startTime || Date.now(),
            endTime: subStep.endTime,
            stage: subStep.stage,
            output: subStep.output,
            error: subStep.error,
            thinking: subStep.thinking,
            progressHistory: subStep.progressHistory || [], // Preserve timeline
            retryCount: subStep.retryCount || 0,
            metrics: subStep.metrics,
          });
        });
      }
    });

    console.log("📅 [createResearchHistoryItem] Extracted from steps:", {
      totalTasks: finalAgentTasks.length,
      tasksWithTimeline: finalAgentTasks.filter(
        (t) => t.progressHistory && t.progressHistory.length > 0
      ).length,
    });
  } else {
    console.warn(
      "⚠️ [createResearchHistoryItem] No agentTasks or steps provided - creating empty research item"
    );
  }

  // Calculate total duration from agent tasks or steps
  const totalDuration =
    finalAgentTasks.reduce((sum, task) => sum + (task.duration || 0), 0) ||
    steps?.reduce((sum, step) => sum + (step.duration || 0), 0) ||
    0;

  // Calculate sources and chunks count from research context or steps
  const sourcesCount =
    researchContext?.ragResults?.chunks?.length ||
    steps?.reduce((sum, step) => sum + (step.sources?.length || 0), 0) ||
    0;

  const chunksProcessed =
    researchContext?.metadata?.totalChunksProcessed ||
    steps?.reduce((sum, step) => {
      const stepChunks =
        step.subSteps?.reduce((subSum: number, subStep: any) => {
          const output = subStep.output;
          if (typeof output === "string") {
            const chunksMatch = output.match(/Total Chunks Ready: (\d+)/);
            return subSum + (chunksMatch ? parseInt(chunksMatch[1]) : 0);
          }
          return subSum;
        }, 0) || 0;
      return sum + stepChunks;
    }, 0) ||
    0;

  const researchItem = {
    title,
    type: researchType as any,
    timestamp: Date.now(),
    status: "completed" as "completed" | "failed" | "in_progress",
    wordCount,
    duration: totalDuration,
    researchConfig: {
      type: researchType,
      depth: researchDepth,
      enableRAG,
      enableWebSearch,
    },
    originalPrompt: prompt,
    researchContext: researchContext
      ? JSON.parse(JSON.stringify(researchContext))
      : undefined,
    agentTasks: finalAgentTasks,
    steps: steps?.map((step) => ({
      id: step.id,
      type: step.type,
      status: step.status,
      duration: step.duration,
      reasoning: step.reasoning,
      query: step.query,
      queries: step.queries,
      sources: step.sources,
      results: step.results,
      confidence: step.confidence,
      subSteps: step.subSteps || step.agentTasks,
    })),
    finalOutput,
    sourcesCount,
    chunksProcessed,
    version: "2.0", // Updated version for enhanced schema
  };

  // 🔥 FINAL VALIDATION: Log what we're returning
  console.log("✅ [createResearchHistoryItem] Research item created:", {
    title: researchItem.title,
    agentTasksCount: researchItem.agentTasks.length,
    agentTasksWithTimeline: researchItem.agentTasks.filter(
      (t) => t.progressHistory && t.progressHistory.length > 0
    ).length,
    totalTimelineEntries: researchItem.agentTasks.reduce(
      (sum, t) => sum + (t.progressHistory?.length || 0),
      0
    ),
    hasSteps: !!researchItem.steps,
    stepsCount: researchItem.steps?.length || 0,
  });

  if (researchItem.agentTasks.length === 0) {
    console.warn(
      "⚠️ [createResearchHistoryItem] WARNING: No agent tasks in final research item!"
    );
  }

  return researchItem;
}
