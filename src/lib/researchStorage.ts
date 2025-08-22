import { researchHistoryDB, ResearchHistoryItem } from "./indexeddb";
import { createResearchHistoryItem } from "../hooks/useResearchHistory";
import {
  ResearchStep,
  AgentSubStep,
} from "@/components/DeepResearch/components/ResearchSteps";

/**
 * Research Storage Utility
 * Handles capturing and storing research data when research completes
 */

export interface ResearchCaptureData {
  prompt: string;
  researchType: string;
  researchDepth: string;
  enableRAG: boolean;
  enableWebSearch: boolean;
  steps: ResearchStep[];
  finalOutput?: string;
  startTime: number;
  endTime: number;
  // 🔥 NEW: Complete multi-agent research context
  researchContext?: any;
  agentTasks?: any[];
}

export interface ResearchSessionData {
  id: string;
  prompt: string;
  researchType: string;
  researchDepth: string;
  enableRAG: boolean;
  enableWebSearch: boolean;
  steps: ResearchStep[];
  finalOutput?: string;
  timestamp: number;
  duration: number;
}

/**
 * Capture and store complete multi-agent research data when research completes
 */
export async function storeCompletedResearch(
  data: ResearchCaptureData
): Promise<string> {
  try {
    console.log("🗄️ Storing completed multi-agent research in RxDB...", {
      prompt: data.prompt.substring(0, 50) + "...",
      stepsCount: data.steps.length,
      hasFinalOutput: !!data.finalOutput,
      duration: data.endTime - data.startTime,
      hasResearchContext: !!(data as any).researchContext,
      hasAgentTasks: !!(data as any).agentTasks?.length,
    });

    // Extract complete research context and agent tasks if available
    const researchContext = (data as any).researchContext;
    const agentTasks = (data as any).agentTasks;

    // Create comprehensive research history item with complete multi-agent data
    const researchItem = createResearchHistoryItem(
      data.prompt,
      data.researchType,
      data.researchDepth,
      data.enableRAG,
      data.enableWebSearch,
      researchContext,
      agentTasks,
      data.steps,
      data.finalOutput
    );

    // Override with actual timing data
    researchItem.timestamp = data.startTime;
    researchItem.duration = data.endTime - data.startTime;

    // Store in RxDB
    const researchId = await researchHistoryDB.addResearch(researchItem);

    console.log(
      "✅ Multi-agent research stored successfully in RxDB:",
      researchId
    );

    // Log detailed information about what was stored
    const agentTasksCount = researchItem.agentTasks?.length || 0;
    const sharedKnowledgeKeys = Object.keys(
      researchItem.researchContext?.sharedKnowledge || {}
    );
    const extractedDataCount =
      researchItem.researchContext?.extractedData?.raw?.length || 0;

    console.log("📊 Enhanced research storage summary:", {
      id: researchId,
      title: researchItem.title,
      type: researchItem.type,
      agentTasks: agentTasksCount,
      extractedItems: extractedDataCount,
      sharedKnowledgeAreas: sharedKnowledgeKeys.length,
      patterns: researchItem.researchContext?.patterns?.length || 0,
      agentsInvolved:
        researchItem.researchContext?.metadata?.agentsInvolved?.length || 0,
      wordCount: researchItem.wordCount,
      duration: researchItem.duration,
      sourcesCount: researchItem.sourcesCount,
      chunksProcessed: researchItem.chunksProcessed,
      version: researchItem.version,
    });

    return researchId;
  } catch (error) {
    console.error("❌ Error storing multi-agent research:", error);
    throw error;
  }
}

/**
 * Update existing research with new data
 */
export async function updateStoredResearch(
  researchId: string,
  updates: Partial<ResearchHistoryItem>
): Promise<void> {
  try {
    await researchHistoryDB.updateResearch(researchId, updates);
    console.log("✅ Research updated:", researchId);
  } catch (error) {
    console.error("❌ Error updating research:", error);
    throw error;
  }
}

/**
 * Extract agent tasks from research steps for detailed storage
 */
export function extractAgentTasksFromSteps(steps: ResearchStep[]): any[] {
  const agentTasks: any[] = [];

  steps.forEach((step, stepIndex) => {
    // Handle subSteps (agent tasks)
    if (step.subSteps && step.subSteps.length > 0) {
      step.subSteps.forEach((subStep, agentIndex) => {
        agentTasks.push({
          stepIndex,
          agentIndex,
          agentName: subStep.agentName,
          agentType: subStep.agentType || "unknown",
          status: subStep.status,
          progress: subStep.progress || 0,
          duration: subStep.duration,
          startTime: subStep.startTime,
          endTime: subStep.endTime,
          stage: subStep.stage,
          output: subStep.output,
          error: subStep.error,
          thinking: subStep.thinking,
          progressHistory: subStep.progressHistory,
        });
      });
    }

    // Handle direct agentTasks if they exist (cast to any to handle dynamic properties)
    const stepWithAgentTasks = step as any;
    if (
      stepWithAgentTasks.agentTasks &&
      stepWithAgentTasks.agentTasks.length > 0
    ) {
      stepWithAgentTasks.agentTasks.forEach(
        (agentTask: any, agentIndex: number) => {
          agentTasks.push({
            stepIndex,
            agentIndex,
            agentName: agentTask.agentName,
            agentType: agentTask.agentType || "unknown",
            status: agentTask.status,
            progress: agentTask.progress || 0,
            duration: agentTask.duration,
            startTime: agentTask.startTime,
            endTime: agentTask.endTime,
            stage: agentTask.stage,
            output: agentTask.output,
            error: agentTask.error,
            thinking: agentTask.thinking,
            progressHistory: agentTask.progressHistory,
          });
        }
      );
    }
  });

  return agentTasks;
}

/**
 * Calculate research statistics from steps
 */
export function calculateResearchStats(steps: ResearchStep[]) {
  const stats = {
    totalSteps: steps.length,
    completedSteps: steps.filter((s) => s.status === "completed").length,
    totalAgents: 0,
    completedAgents: 0,
    totalDuration: 0,
    sourcesCount: 0,
    chunksProcessed: 0,
  };

  steps.forEach((step) => {
    // Count agents in subSteps
    if (step.subSteps) {
      stats.totalAgents += step.subSteps.length;
      stats.completedAgents += step.subSteps.filter(
        (s) => s.status === "completed"
      ).length;
      stats.totalDuration += step.subSteps.reduce(
        (sum, s) => sum + (s.duration || 0),
        0
      );
    }

    // Count agents in agentTasks (cast to any to handle dynamic properties)
    const stepWithAgentTasks = step as any;
    if (stepWithAgentTasks.agentTasks) {
      stats.totalAgents += stepWithAgentTasks.agentTasks.length;
      stats.completedAgents += stepWithAgentTasks.agentTasks.filter(
        (s: any) => s.status === "completed"
      ).length;
      stats.totalDuration += stepWithAgentTasks.agentTasks.reduce(
        (sum: number, s: any) => sum + (s.duration || 0),
        0
      );
    }

    // Count sources
    stats.sourcesCount += step.sources?.length || 0;
  });

  return stats;
}

/**
 * Create a session data object for current research
 */
export function createResearchSessionData(
  prompt: string,
  researchType: string,
  researchDepth: string,
  enableRAG: boolean,
  enableWebSearch: boolean
): ResearchSessionData {
  return {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    prompt,
    researchType,
    researchDepth,
    enableRAG,
    enableWebSearch,
    steps: [],
    timestamp: Date.now(),
    duration: 0,
  };
}

/**
 * Add step to existing research session
 */
export function addStepToSession(
  session: ResearchSessionData,
  step: ResearchStep
): void {
  session.steps.push(step);
}

/**
 * Complete research session and prepare for storage
 */
export function completeResearchSession(
  session: ResearchSessionData,
  finalOutput?: string
): ResearchCaptureData {
  const endTime = Date.now();
  const duration = endTime - session.timestamp;

  return {
    prompt: session.prompt,
    researchType: session.researchType,
    researchDepth: session.researchDepth,
    enableRAG: session.enableRAG,
    enableWebSearch: session.enableWebSearch,
    steps: session.steps,
    finalOutput,
    startTime: session.timestamp,
    endTime,
  };
}
