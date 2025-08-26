import { useState, useCallback, useRef, useEffect } from "react";
import {
  ResearchStep,
  AgentSubStep,
} from "@/components/DeepResearch/components/ResearchSteps";
import {
  createResearchSessionData,
  completeResearchSession,
  storeCompletedResearch,
  updateStoredResearch,
  calculateResearchStats,
} from "@/lib/researchStorage";

export interface UseResearchSessionOptions {
  onResearchStored?: (researchId: string) => void;
  onError?: (error: Error) => void;
  autoStore?: boolean; // Automatically store when research completes
}

export interface UseResearchSessionReturn {
  sessionId: string | null;
  isActive: boolean;
  startSession: (
    prompt: string,
    researchType: string,
    researchDepth: string,
    enableRAG: boolean,
    enableWebSearch: boolean
  ) => void;
  addStep: (step: ResearchStep) => void;
  updateStep: (stepId: string, updates: Partial<ResearchStep>) => void;
  completeSession: (finalOutput?: string) => Promise<string | null>;
  cancelSession: () => void;
  getSessionStats: () => any;
  currentSession: any;
}

/**
 * Hook to manage research sessions and automatically store them in IndexedDB
 */
export function useResearchSession(
  options: UseResearchSessionOptions = {}
): UseResearchSessionReturn {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const sessionRef = useRef<any>(null);

  const { onResearchStored, onError, autoStore = true } = options;

  // Start a new research session
  const startSession = useCallback(
    (
      prompt: string,
      researchType: string,
      researchDepth: string,
      enableRAG: boolean,
      enableWebSearch: boolean
    ) => {
      try {
        const session = createResearchSessionData(
          prompt,
          researchType,
          researchDepth,
          enableRAG,
          enableWebSearch
        );

        sessionRef.current = session;
        setSessionId(session.id);
        setIsActive(true);

        console.log("🚀 Research session started:", {
          id: session.id,
          prompt: prompt.substring(0, 50) + "...",
          type: researchType,
          depth: researchDepth,
          enableRAG,
          enableWebSearch,
        });
      } catch (error) {
        console.error("❌ Error starting research session:", error);
        onError?.(error as Error);
      }
    },
    [onError]
  );

  // Add a step to the current session
  const addStep = useCallback(
    (step: ResearchStep) => {
      if (!sessionRef.current || !isActive) {
        console.warn("⚠️ Cannot add step: no active session");
        return;
      }

      try {
        sessionRef.current.steps.push(step);

        console.log("📝 Step added to session:", {
          sessionId: sessionRef.current.id,
          stepId: step.id,
          stepType: step.type,
          stepStatus: step.status,
          totalSteps: sessionRef.current.steps.length,
        });
      } catch (error) {
        console.error("❌ Error adding step to session:", error);
        onError?.(error as Error);
      }
    },
    [isActive, onError]
  );

  // Update an existing step in the session
  const updateStep = useCallback(
    (stepId: string, updates: Partial<ResearchStep>) => {
      if (!sessionRef.current || !isActive) {
        console.warn("⚠️ Cannot update step: no active session");
        return;
      }

      try {
        const stepIndex = sessionRef.current.steps.findIndex(
          (s: ResearchStep) => s.id === stepId
        );
        if (stepIndex >= 0) {
          sessionRef.current.steps[stepIndex] = {
            ...sessionRef.current.steps[stepIndex],
            ...updates,
          };

          console.log("🔄 Step updated in session:", {
            sessionId: sessionRef.current.id,
            stepId,
            updates: Object.keys(updates),
          });
        } else {
          console.warn("⚠️ Step not found for update:", stepId);
        }
      } catch (error) {
        console.error("❌ Error updating step in session:", error);
        onError?.(error as Error);
      }
    },
    [isActive, onError]
  );

  // Complete the current session
  const completeSession = useCallback(
    async (finalOutput?: string): Promise<string | null> => {
      if (!sessionRef.current || !isActive) {
        console.warn("⚠️ Cannot complete session: no active session");
        return null;
      }

      try {
        // Complete the session data
        const completedData = completeResearchSession(
          sessionRef.current,
          finalOutput
        );

        // Calculate and log stats
        const stats = calculateResearchStats(completedData.steps);
        console.log("📊 Research session completed:", {
          sessionId: sessionRef.current.id,
          duration: completedData.endTime - completedData.startTime,
          ...stats,
        });

        let researchId: string | null = null;

        // Store in IndexedDB if autoStore is enabled
        if (autoStore) {
          researchId = await storeCompletedResearch(completedData);
          onResearchStored?.(researchId);
        }

        // Clean up session
        setIsActive(false);
        setSessionId(null);
        sessionRef.current = null;

        return researchId;
      } catch (error) {
        console.error("❌ Error completing research session:", error);
        onError?.(error as Error);
        return null;
      }
    },
    [isActive, autoStore, onResearchStored, onError]
  );

  // Cancel the current session
  const cancelSession = useCallback(() => {
    if (sessionRef.current) {
      console.log("🛑 Research session cancelled:", sessionRef.current.id);
    }

    setIsActive(false);
    setSessionId(null);
    sessionRef.current = null;
  }, []);

  // Get current session statistics
  const getSessionStats = useCallback(() => {
    if (!sessionRef.current) {
      return null;
    }

    return {
      ...calculateResearchStats(sessionRef.current.steps),
      sessionId: sessionRef.current.id,
      prompt: sessionRef.current.prompt,
      researchType: sessionRef.current.researchType,
      researchDepth: sessionRef.current.researchDepth,
      startTime: sessionRef.current.timestamp,
      currentDuration: Date.now() - sessionRef.current.timestamp,
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        console.log("🧹 Cleaning up research session on unmount");
        cancelSession();
      }
    };
  }, [cancelSession]);

  return {
    sessionId,
    isActive,
    startSession,
    addStep,
    updateStep,
    completeSession,
    cancelSession,
    getSessionStats,
    currentSession: sessionRef.current,
  };
}

