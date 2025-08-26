import React, { createContext, useContext, useState, useCallback } from "react";
import { ResearchStep } from "@/components/DeepResearch/components/ResearchSteps";
import { useResearchSession } from "@/hooks/useResearchSession";

interface ResearchConfig {
  prompt: string;
  type: string;
  depth: string;
  enableRAG: boolean;
  enableWebSearch: boolean;
}

interface ResearchContextType {
  // Current research state
  steps: ResearchStep[];
  isActive: boolean;
  config: ResearchConfig | null;

  // Research session tracking
  sessionId: string | null;
  startSession: (config: ResearchConfig) => void;
  completeSession: (finalOutput?: string) => Promise<string | null>;

  // Step management
  addStep: (step: ResearchStep) => void;
  updateStep: (stepId: string, updates: Partial<ResearchStep>) => void;
  clearSteps: () => void;

  // Callbacks
  onResearchStored?: (researchId: string) => void;
}

const ResearchContext = createContext<ResearchContextType | null>(null);

interface ResearchProviderProps {
  children: React.ReactNode;
  onResearchStored?: (researchId: string) => void;
}

export function ResearchProvider({
  children,
  onResearchStored,
}: ResearchProviderProps) {
  const [steps, setSteps] = useState<ResearchStep[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [config, setConfig] = useState<ResearchConfig | null>(null);

  // Research session tracking
  const {
    sessionId,
    startSession: startResearchSession,
    completeSession: completeResearchSession,
    addStep: addStepToSession,
    updateStep: updateStepInSession,
  } = useResearchSession({
    onResearchStored: (researchId) => {
      console.log("✅ Research stored in history:", researchId);
      onResearchStored?.(researchId);
    },
    onError: (error) => {
      console.error("❌ Research session error:", error);
    },
    autoStore: true,
  });

  const startSession = useCallback(
    (researchConfig: ResearchConfig) => {
      console.log("🚀 Starting research session:", researchConfig);
      setConfig(researchConfig);
      setIsActive(true);
      setSteps([]);

      // Start session tracking
      startResearchSession(
        researchConfig.prompt,
        researchConfig.type,
        researchConfig.depth,
        researchConfig.enableRAG,
        researchConfig.enableWebSearch
      );
    },
    [startResearchSession]
  );

  const completeSession = useCallback(
    async (finalOutput?: string) => {
      console.log("🎯 Completing research session...");
      setIsActive(false);

      const researchId = await completeResearchSession(finalOutput);
      return researchId;
    },
    [completeResearchSession]
  );

  const addStep = useCallback(
    (step: ResearchStep) => {
      console.log("📝 Adding research step:", step.id, step.type);
      setSteps((prev) => [...prev, step]);
      addStepToSession(step);
    },
    [addStepToSession]
  );

  const updateStep = useCallback(
    (stepId: string, updates: Partial<ResearchStep>) => {
      console.log("🔄 Updating research step:", stepId, updates);
      setSteps((prev) =>
        prev.map((step) =>
          step.id === stepId ? { ...step, ...updates } : step
        )
      );
      updateStepInSession(stepId, updates);
    },
    [updateStepInSession]
  );

  const clearSteps = useCallback(() => {
    console.log("🧹 Clearing research steps");
    setSteps([]);
    setIsActive(false);
    setConfig(null);
  }, []);

  const value: ResearchContextType = {
    steps,
    isActive,
    config,
    sessionId,
    startSession,
    completeSession,
    addStep,
    updateStep,
    clearSteps,
    onResearchStored,
  };

  return (
    <ResearchContext.Provider value={value}>
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearchContext() {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error(
      "useResearchContext must be used within a ResearchProvider"
    );
  }
  return context;
}

