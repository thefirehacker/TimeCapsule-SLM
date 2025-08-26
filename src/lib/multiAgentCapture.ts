/**
 * Multi-Agent Research Data Capture Utility
 *
 * Captures complete research data from the multi-agent orchestrator
 * including all agent tasks, research context, and execution details
 */

import { ResearchAgentTask } from "./indexeddb";
import { AgentSubStep } from "@/components/DeepResearch/components/ResearchSteps";

export interface MultiAgentResearchData {
  // Core research info
  prompt: string;
  researchType: string;
  researchDepth: string;
  enableRAG: boolean;
  enableWebSearch: boolean;
  finalOutput: string;
  startTime: number;
  endTime: number;

  // Complete orchestrator context
  researchContext: any;

  // Agent execution details
  agentTasks: ResearchAgentTask[];

  // Legacy step format for compatibility
  steps: any[];
}

/**
 * Convert AgentSubStep to ResearchAgentTask format
 */
export function convertAgentSubStepToTask(
  subStep: AgentSubStep
): ResearchAgentTask {
  return {
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
    retryCount: subStep.retryCount,
    metrics: subStep.metrics,
  };
}

/**
 * Capture complete multi-agent research data from orchestrator
 */
export function captureMultiAgentResearchData(
  prompt: string,
  researchType: string,
  researchDepth: string,
  enableRAG: boolean,
  enableWebSearch: boolean,
  finalOutput: string,
  startTime: number,
  endTime: number,
  orchestratorContext?: any,
  agentSubSteps?: AgentSubStep[],
  legacySteps?: any[]
): MultiAgentResearchData {
  console.log("📊 Capturing multi-agent research data:", {
    prompt: prompt.substring(0, 50) + "...",
    hasOrchestratorContext: !!orchestratorContext,
    agentSubStepsCount: agentSubSteps?.length || 0,
    legacyStepsCount: legacySteps?.length || 0,
    duration: endTime - startTime,
  });

  // Convert agent substeps to research agent tasks
  const agentTasks: ResearchAgentTask[] =
    agentSubSteps?.map(convertAgentSubStepToTask) || [];

  // Extract additional agent data from orchestrator context if available
  if (orchestratorContext?.metadata?.agentsInvolved) {
    console.log(
      "🔍 Agents involved in research:",
      orchestratorContext.metadata.agentsInvolved
    );
  }

  // Log detailed capture information
  if (orchestratorContext) {
    console.log("📋 Research context captured:", {
      understanding: !!orchestratorContext.understanding,
      documentAnalysis: !!orchestratorContext.documentAnalysis,
      patterns: orchestratorContext.patterns?.length || 0,
      extractedDataRaw: orchestratorContext.extractedData?.raw?.length || 0,
      extractedDataStructured:
        orchestratorContext.extractedData?.structured?.length || 0,
      sharedKnowledgeKeys: Object.keys(
        orchestratorContext.sharedKnowledge || {}
      ),
      agentsInvolved: orchestratorContext.metadata?.agentsInvolved || [],
      totalChunksProcessed:
        orchestratorContext.metadata?.totalChunksProcessed || 0,
    });
  }

  if (agentTasks.length > 0) {
    console.log("🤖 Agent tasks captured:", {
      totalAgents: agentTasks.length,
      completedAgents: agentTasks.filter((t) => t.status === "completed")
        .length,
      agentNames: agentTasks.map((t) => t.agentName),
      totalDuration: agentTasks.reduce((sum, t) => sum + (t.duration || 0), 0),
      hasThinking: agentTasks.filter((t) => t.thinking?.hasThinking).length,
      hasOutput: agentTasks.filter((t) => t.output).length,
    });
  }

  return {
    prompt,
    researchType,
    researchDepth,
    enableRAG,
    enableWebSearch,
    finalOutput,
    startTime,
    endTime,
    researchContext: orchestratorContext,
    agentTasks,
    steps: legacySteps || [],
  };
}

/**
 * Extract research statistics from multi-agent data
 */
export function extractResearchStatistics(data: MultiAgentResearchData) {
  const stats = {
    duration: data.endTime - data.startTime,
    agentCount: data.agentTasks.length,
    completedAgents: data.agentTasks.filter((t) => t.status === "completed")
      .length,
    failedAgents: data.agentTasks.filter((t) => t.status === "failed").length,
    totalLLMCalls: data.agentTasks.reduce(
      (sum, t) => sum + (t.metrics?.llmCalls || 0),
      0
    ),
    totalTokensUsed: data.agentTasks.reduce(
      (sum, t) => sum + (t.metrics?.tokensUsed || 0),
      0
    ),
    averageConfidence:
      data.agentTasks.length > 0
        ? data.agentTasks.reduce(
            (sum, t) => sum + (t.metrics?.confidence || 0),
            0
          ) / data.agentTasks.length
        : 0,
    chunksProcessed: data.researchContext?.metadata?.totalChunksProcessed || 0,
    sourcesCount: data.researchContext?.ragResults?.chunks?.length || 0,
    extractedItems: data.researchContext?.extractedData?.raw?.length || 0,
    patterns: data.researchContext?.patterns?.length || 0,
    documentsAnalyzed:
      data.researchContext?.documentAnalysis?.documents?.length || 0,
    searchApproach: data.researchContext?.metadata?.searchApproach || "unknown",
  };

  console.log("📊 Research statistics extracted:", stats);
  return stats;
}

/**
 * Validate multi-agent research data completeness
 */
export function validateResearchDataCompleteness(
  data: MultiAgentResearchData
): {
  isComplete: boolean;
  missingFields: string[];
  warnings: string[];
} {
  const missingFields: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!data.prompt) missingFields.push("prompt");
  if (!data.finalOutput) missingFields.push("finalOutput");
  if (!data.researchType) missingFields.push("researchType");

  // Check agent data completeness
  if (data.agentTasks.length === 0) {
    warnings.push(
      "No agent tasks captured - research may not have used multi-agent system"
    );
  }

  // Check research context completeness
  if (!data.researchContext) {
    warnings.push(
      "No orchestrator context captured - missing detailed research data"
    );
  } else {
    if (!data.researchContext.synthesis?.answer) {
      warnings.push("No synthesis answer in research context");
    }
    if (!data.researchContext.metadata?.agentsInvolved?.length) {
      warnings.push("No agents involved metadata");
    }
  }

  const isComplete = missingFields.length === 0;

  console.log("🔍 Research data validation:", {
    isComplete,
    missingFields,
    warnings,
    agentTasksCount: data.agentTasks.length,
    hasResearchContext: !!data.researchContext,
  });

  return {
    isComplete,
    missingFields,
    warnings,
  };
}

