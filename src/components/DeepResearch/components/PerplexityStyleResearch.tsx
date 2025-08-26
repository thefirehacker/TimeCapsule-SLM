/**
 * Perplexity-Style Research Display
 *
 * Displays research process inline in chat flow with detailed steps and sources
 * Eliminates sidebar approach in favor of scrollable, dynamic research visibility
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResearchStep, AgentSubStep, SourceReference } from "./ResearchSteps";
import { useResearchContext } from "@/contexts/ResearchContext";
import {
  Search,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  Sparkles,
  Eye,
  Copy,
  Microscope,
  Database,
  Filter,
  Layers,
  BarChart3,
  FileSearch,
  Lightbulb,
  Settings,
  ArrowRight,
  Activity,
  Maximize2,
  X,
  RotateCcw,
} from "lucide-react";

// Agent Summary Modal Component
function AgentSummaryModal({
  agentName,
  subStep,
  isOpen,
  onClose,
}: {
  agentName: string;
  subStep: AgentSubStep;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const getAgentSummaryDetails = () => {
    const totalSteps = subStep.progressHistory?.length || 0;
    const duration = subStep.duration
      ? subStep.duration < 1000
        ? `${subStep.duration}ms`
        : `${(subStep.duration / 1000).toFixed(1)}s`
      : "Unknown";

    return {
      totalSteps,
      duration,
      status: subStep.status,
      startTime: new Date(subStep.startTime).toLocaleString(),
      endTime: subStep.endTime
        ? new Date(subStep.endTime).toLocaleString()
        : "In progress",
    };
  };

  const details = getAgentSummaryDetails();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-primary/5">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {agentName} Analysis Report
              </h2>
              <p className="text-sm text-muted-foreground">
                Detailed execution summary and performance metrics
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Performance Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">
                {details.totalSteps}
              </div>
              <div className="text-sm text-muted-foreground">Total Steps</div>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground">
                {details.duration}
              </div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-foreground capitalize">
                {details.status}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-foreground">
                {subStep.progress || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>

          {/* Execution Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Execution Timeline
            </h3>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Started:</span>
                  <span className="text-foreground font-medium">
                    {details.startTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="text-foreground font-medium">
                    {details.endTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress History */}
          {subStep.progressHistory && subStep.progressHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Step-by-Step Progress ({subStep.progressHistory.length} steps)
              </h3>
              <div className="bg-card border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {subStep.progressHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-1">
                          {entry.stage}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="font-semibold">
                            {entry.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Agent Output */}
          {subStep.output && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Technical Output
              </h3>
              <div className="bg-muted/20 border border-border rounded-lg p-4">
                <pre className="text-xs text-foreground font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {typeof subStep.output === "string"
                    ? subStep.output
                    : JSON.stringify(subStep.output, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Copy Multi-Agent Process details to clipboard
const copyMultiAgentProcess = async (subSteps: any[]) => {
  try {
    let copyText = "🤖 Multi-Agent Process Details\n";
    copyText += "═".repeat(40) + "\n\n";

    subSteps.forEach((subStep, index) => {
      const agentNumber = index + 1;
      const statusIcon =
        subStep.status === "completed"
          ? "✅"
          : subStep.status === "in_progress"
            ? "🔄"
            : subStep.status === "failed"
              ? "❌"
              : "⏳";

      copyText += `${agentNumber}. ${subStep.agentName} ${statusIcon}\n`;
      copyText += `   Type: ${subStep.agentType}\n`;
      copyText += `   Status: ${subStep.status}\n`;

      if (subStep.progress !== undefined) {
        copyText += `   Progress: ${subStep.progress}%\n`;
      }

      if (subStep.stage) {
        copyText += `   Stage: ${subStep.stage}\n`;
      }

      if (subStep.duration) {
        copyText += `   Duration: ${subStep.duration}ms\n`;
      }

      // Add thinking content if available
      if (subStep.thinking?.hasThinking && subStep.thinking.thinkingContent) {
        copyText += `   \n   💭 AI Reasoning:\n`;
        copyText += `   ${subStep.thinking.thinkingContent.replace(/\n/g, "\n   ")}\n`;
      }

      // Add full output if available
      if (subStep.output) {
        copyText += `   \n   📤 Full Output:\n`;
        const outputText =
          typeof subStep.output === "string"
            ? subStep.output
            : JSON.stringify(subStep.output, null, 2);
        copyText += `   ${outputText.replace(/\n/g, "\n   ")}\n`;
      }

      // Add error if available
      if (subStep.error) {
        copyText += `   \n   ❌ Error:\n`;
        copyText += `   ${subStep.error.replace(/\n/g, "\n   ")}\n`;
      }

      // Add summary if available
      if (subStep.thinking?.summary) {
        copyText += `   📝 Summary: ${subStep.thinking.summary}\n`;
      }

      // Add DataInspector specific analysis summary
      if (subStep.agentName === "DataInspector" && subStep.output) {
        try {
          const output =
            typeof subStep.output === "string"
              ? subStep.output
              : JSON.stringify(subStep.output);
          const documentsAnalyzed = (output.match(
            /Documents Analyzed: (\d+)/
          ) || [])[1];
          const documentsAccepted = (output.match(
            /Documents Accepted: (\d+)/
          ) || [])[1];
          const documentsRejected = (output.match(
            /Documents Rejected: (\d+)/
          ) || [])[1];

          if (documentsAnalyzed) {
            copyText += `   \n   📊 Document Analysis Summary:\n`;
            copyText += `   • Documents Analyzed: ${documentsAnalyzed}\n`;
            copyText += `   • Documents Accepted: ${documentsAccepted || 0}\n`;
            copyText += `   • Documents Rejected: ${documentsRejected || 0}\n`;

            // Add accepted/rejected details from progress history
            const acceptedDocs =
              subStep.progressHistory
                ?.filter((p: any) => p.stage.includes("ACCEPTED"))
                .map((p: any) => {
                  const match = p.stage.match(/ACCEPTED: ([^(]+)/);
                  return match ? match[1].trim() : null;
                })
                .filter(Boolean) || [];

            const rejectedDocs =
              subStep.progressHistory
                ?.filter((p: any) => p.stage.includes("REJECTED"))
                .map((p: any) => {
                  const match = p.stage.match(/REJECTED: ([^(]+)/);
                  return match ? match[1].trim() : null;
                })
                .filter(Boolean) || [];

            if (acceptedDocs.length > 0) {
              copyText += `   \n   ✅ Accepted Documents:\n`;
              acceptedDocs.forEach((doc: any) => {
                copyText += `   • ${doc}\n`;
              });
            }

            if (rejectedDocs.length > 0) {
              copyText += `   \n   ❌ Rejected Documents:\n`;
              rejectedDocs.forEach((doc: any) => {
                copyText += `   • ${doc}\n`;
              });
            }
          }
        } catch (error) {
          // Ignore parsing errors
        }
      }

      copyText += "\n" + "─".repeat(35) + "\n\n";
    });

    copyText += `Total Agents: ${subSteps.length}\n`;
    copyText += `Completed: ${subSteps.filter((s) => s.status === "completed").length}\n`;
    copyText += `Generated: ${new Date().toLocaleString()}\n`;

    await navigator.clipboard.writeText(copyText);

    // Show success feedback (you could add a toast here)
    console.log("✅ Multi-Agent Process details copied to clipboard");
  } catch (error) {
    console.error("❌ Failed to copy to clipboard:", error);
  }
};

interface PerplexityStyleResearchProps {
  steps?: ResearchStep[];
  isActive?: boolean;
  className?: string;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

interface StepCardProps {
  step: ResearchStep;
  stepNumber: number;
  isLast: boolean;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

const StepIcons = {
  analysis: Microscope,
  rag_search: Database,
  web_search: Globe,
  synthesis: Layers,
  verification: CheckCircle,
} as const;

const AgentIcons = {
  query_planner: Target,
  data_inspector: Eye,
  pattern_generator: Filter,
  extraction: FileSearch,
  synthesis: Lightbulb,
} as const;

// Enhanced agent type mapping for research-focused UI with better contrast
const getAgentDisplayInfo = (agentName: string) => {
  if (agentName.includes("DataInspector")) {
    return {
      icon: Database,
      color: "text-foreground",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      cardBg: "bg-primary/5",
      description: "Document Intelligence Engine",
      specialty: "Scans and analyzes documents for relevance",
    };
  }
  if (agentName.includes("PatternGenerator")) {
    return {
      icon: Filter,
      color: "text-foreground",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/30",
      cardBg: "bg-accent/5",
      description: "Pattern Recognition System",
      specialty: "Identifies extraction patterns and strategies",
    };
  }
  if (agentName.includes("Extractor")) {
    return {
      icon: FileSearch,
      color: "text-foreground",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30",
      cardBg: "bg-secondary/5",
      description: "Information Extraction Unit",
      specialty: "Extracts relevant data from sources",
    };
  }
  if (agentName.includes("Synthesizer") || agentName.includes("Synthesis")) {
    return {
      icon: Lightbulb,
      color: "text-foreground",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      cardBg: "bg-primary/5",
      description: "Knowledge Synthesis Engine",
      specialty: "Combines information into insights",
    };
  }
  if (agentName.includes("PlanningAgent")) {
    return {
      icon: Settings,
      color: "text-foreground",
      bgColor: "bg-muted/50",
      borderColor: "border-border",
      cardBg: "bg-muted/20",
      description: "Research Orchestrator",
      specialty: "Plans and coordinates analysis workflow",
    };
  }
  if (agentName.includes("ResponseFormatter")) {
    return {
      icon: FileText,
      color: "text-foreground",
      bgColor: "bg-muted/50",
      borderColor: "border-border",
      cardBg: "bg-muted/20",
      description: "Report Generator",
      specialty: "Formats findings into structured reports",
    };
  }
  return {
    icon: Microscope,
    color: "text-foreground",
    bgColor: "bg-muted/50",
    borderColor: "border-border",
    cardBg: "bg-muted/20",
    description: "Research Agent",
    specialty: "Performs specialized analysis tasks",
  };
};

// Sources Section Component - Expandable
// Individual Source Card with expandable content
function SourceCard({ source }: { source: SourceReference }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-card-foreground mb-1">
              📄 {source.title || source.source}
            </div>
            {source.excerpt && (
              <div className="text-xs text-muted-foreground">
                <div className="whitespace-pre-wrap">
                  {isExpanded
                    ? source.excerpt
                    : `${source.excerpt.substring(0, 150)}${source.excerpt.length > 150 ? "..." : ""}`}
                </div>
                {source.excerpt.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-primary hover:text-primary/80 text-xs underline"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}
          </div>
          {source.similarity && (
            <div className="ml-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full shrink-0">
              {Math.round(source.similarity * 100)}% match
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SourcesSection({ sources }: { sources: SourceReference[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 bg-muted hover:bg-muted/80 transition-colors text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileText className="w-4 h-4" />
          📚 Sources Found ({sources.length}) - Full Chunk Content
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 bg-background border-t border-border">
          <div className="space-y-3">
            {sources.map((source, srcIdx) => (
              <SourceCard key={`${source.id}-${srcIdx}`} source={source} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AgentSubStepInline({
  subStep,
  onRerunAgent,
}: {
  subStep: AgentSubStep;
  onRerunAgent?: (agentName: string) => Promise<void>;
}) {
  const [showThinking, setShowThinking] = useState(false);
  const [showProgressHistory, setShowProgressHistory] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Use enhanced agent display info
  const agentInfo = getAgentDisplayInfo(subStep.agentName);
  const IconComponent = agentInfo.icon;

  // Stabilize agent display name to prevent mid-execution changes
  const getStableAgentName = () => {
    // Extract base agent name from validation prefixes
    const agentName = subStep.agentName;
    if (agentName.includes("PlanningAgent Validation:")) {
      const baseName = agentName.replace("PlanningAgent Validation: ", "");
      return `${baseName} Validation`;
    }
    // Keep original name for non-validation agents
    return agentName;
  };

  const displayName = getStableAgentName();

  // Thinking data available (debug removed)

  const getStatusColor = () => {
    switch (subStep.status) {
      case "completed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      case "in_progress":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = () => {
    // ENHANCED completion detection - multiple indicators including agent-specific logic
    const hasDuration =
      subStep.duration !== undefined &&
      subStep.duration !== null &&
      subStep.duration > 0;
    const hasEndTime =
      subStep.endTime !== undefined && subStep.endTime !== null;
    const hasOutput = subStep.output !== undefined && subStep.output !== null;
    const isProgressComplete = subStep.progress === 100;

    // Special logic for DataInspector - it may complete without setting duration
    const isDataInspectorComplete =
      subStep.agentName === "DataInspector" &&
      (subStep.stage === "Analysis complete" ||
        subStep.progressHistory?.some((p) => p.stage?.includes("complete")) ||
        (hasOutput && subStep.progress && subStep.progress >= 90));

    const isActuallyComplete =
      subStep.status === "completed" ||
      hasDuration ||
      hasEndTime ||
      isDataInspectorComplete ||
      (isProgressComplete && hasOutput);

    const isActuallyFailed = subStep.status === "failed" || subStep.error;

    // Completion detection logic (spam removed)

    if (isActuallyComplete && !isActuallyFailed) {
      return <CheckCircle className="w-3 h-3 text-green-500" />;
    }
    if (isActuallyFailed) {
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
    if (
      subStep.status === "in_progress" ||
      (!isActuallyComplete && !isActuallyFailed)
    ) {
      return <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />;
    }
    return <Clock className="w-3 h-3 text-gray-400" />;
  };

  return (
    <>
      <div className={`ml-6 pl-4 border-l-2 ${agentInfo.borderColor} py-4`}>
        {/* Research Agent Header - Enhanced Design */}
        <div
          className={`${agentInfo.cardBg} border ${agentInfo.borderColor} rounded-xl p-4 mb-4 shadow-sm`}
        >
          <div className="flex items-center gap-4">
            {/* Agent Icon with Status Ring */}
            <div className="relative">
              <div
                className={`w-12 h-12 ${agentInfo.bgColor} rounded-xl flex items-center justify-center border-2 ${agentInfo.borderColor} shadow-sm`}
              >
                <IconComponent className={`w-6 h-6 ${agentInfo.color}`} />
              </div>
              {/* Status indicator ring */}
              <div
                className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                  subStep.status === "completed"
                    ? "bg-accent"
                    : subStep.status === "in_progress"
                      ? "bg-primary animate-pulse"
                      : subStep.status === "failed"
                        ? "bg-destructive"
                        : "bg-muted"
                }`}
              />
            </div>

            <div className="flex-1">
              {/* Agent Name and Status */}
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {displayName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {agentInfo.specialty}
                  </p>
                </div>
                {getStatusIcon()}
                {subStep.duration && (
                  <Badge variant="secondary" className="text-xs font-mono">
                    {subStep.duration < 1000
                      ? `${subStep.duration}ms`
                      : `${(subStep.duration / 1000).toFixed(1)}s`}
                  </Badge>
                )}
              </div>

              {/* Current Activity */}
              {subStep.stage && (
                <div className="bg-background/50 border border-border rounded-lg p-2 mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-medium">Status:</span>
                    <span className="text-muted-foreground">
                      {subStep.stage}
                    </span>
                    {subStep.itemsProcessed !== undefined && (
                      <Badge variant="outline" className="text-xs ml-auto">
                        {subStep.itemsProcessed}
                        {subStep.totalItems
                          ? `/${subStep.totalItems}`
                          : ""}{" "}
                        items
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* View Summary Button - Always available for completed agents */}
                {subStep.status === "completed" && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowSummaryModal(true)}
                    className="h-8 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <BarChart3 className="w-3 h-3 mr-1" />
                    View Analysis Report
                  </Button>
                )}

                {/* Rerun Button */}
                {onRerunAgent &&
                  (subStep.status === "completed" ||
                    subStep.status === "failed") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRerunAgent(subStep.agentName)}
                      className="h-8 px-3 text-xs"
                      title={`Rerun ${displayName}`}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Rerun
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Progress Tracking */}
        {subStep.progress !== undefined &&
          (subStep.status === "in_progress" ||
            subStep.status === "completed") && (
            <div className="mb-4">
              <div className="bg-background/30 border border-border rounded-lg p-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">
                      Research Progress
                    </span>
                  </div>
                  <span className="font-mono text-foreground">
                    {subStep.status === "completed" ? 100 : subStep.progress}%
                  </span>
                </div>
                <Progress
                  value={
                    subStep.status === "completed" ? 100 : subStep.progress
                  }
                  className="h-2"
                />
                {subStep.status === "in_progress" && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Analyzing data in real-time...
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Detailed Research Timeline */}
        {subStep.progressHistory && subStep.progressHistory.length > 0 && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProgressHistory(!showProgressHistory)}
              className="h-8 px-3 text-sm font-medium text-foreground hover:bg-accent/50 border border-border/50"
            >
              <Clock className="w-4 h-4 mr-2" />
              Research Timeline
              <Badge variant="secondary" className="ml-2 text-xs">
                {subStep.progressHistory.length} steps
              </Badge>
              {showProgressHistory ? (
                <ChevronDown className="w-4 h-4 ml-2" />
              ) : (
                <ChevronRight className="w-4 h-4 ml-2" />
              )}
            </Button>

            {showProgressHistory && (
              <div className="mt-3 bg-card/50 border border-border rounded-lg p-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {subStep.progressHistory.map((entry, idx) => {
                    const isLatest =
                      idx === subStep.progressHistory!.length - 1;
                    const timestamp = new Date(
                      entry.timestamp
                    ).toLocaleTimeString();
                    const isAcceptedDoc = entry.stage.includes("ACCEPTED");
                    const isRejectedDoc = entry.stage.includes("REJECTED");

                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          isLatest
                            ? "bg-primary/10 border-primary/30 shadow-sm"
                            : isAcceptedDoc
                              ? "bg-accent/10 border-accent/30"
                              : isRejectedDoc
                                ? "bg-destructive/10 border-destructive/30"
                                : "bg-background border-border"
                        }`}
                      >
                        {/* Step number */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                            isLatest
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          {idx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground mb-1">
                            {entry.stage.length > 120
                              ? `${entry.stage.substring(0, 120)}...`
                              : entry.stage}
                            {isLatest && (
                              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                                {subStep.status === "completed"
                                  ? "COMPLETED"
                                  : "ACTIVE"}
                              </span>
                            )}
                          </div>
                          {entry.itemsProcessed !== undefined && (
                            <div className="text-xs text-muted-foreground mb-1">
                              Items processed: {entry.itemsProcessed}
                              {entry.totalItems ? `/${entry.totalItems}` : ""}
                            </div>
                          )}
                          {entry.message && (
                            <div className="text-xs text-muted-foreground">
                              {entry.message}
                            </div>
                          )}
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-bold text-foreground">
                            {entry.progress}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Research Methodology & Reasoning */}
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThinking(!showThinking)}
            className="h-8 px-3 text-sm font-medium text-foreground hover:bg-accent/50 border border-border/50"
          >
            <Microscope className="w-4 h-4 mr-2" />
            Research Methodology
            {showThinking ? (
              <ChevronDown className="w-4 h-4 ml-2" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-2" />
            )}
          </Button>

          {showThinking && (
            <div className="mt-3 bg-card/30 border border-border rounded-lg p-4">
              {subStep.thinking?.hasThinking ? (
                <div className="space-y-4">
                  {/* Research Summary */}
                  <div className="bg-primary/5 border-l-4 border-primary p-3 rounded-r-lg">
                    <div className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Research Summary
                    </div>
                    <div className="text-sm text-foreground">
                      {subStep.thinking.summary ||
                        "Conducting systematic analysis of available data sources..."}
                    </div>
                  </div>

                  {/* Key Findings */}
                  {subStep.thinking.insights &&
                  subStep.thinking.insights.length > 0 ? (
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Key Research Findings
                      </div>
                      <div className="space-y-2">
                        {subStep.thinking.insights.map((insight, idx) => (
                          <div
                            key={idx}
                            className="bg-accent/10 border border-accent/20 rounded-lg p-3"
                          >
                            <div className="text-sm text-foreground flex items-start gap-3">
                              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-accent-foreground">
                                  {idx + 1}
                                </span>
                              </div>
                              <span>{insight}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Current Research Focus
                      </div>
                      <div className="bg-muted/30 border border-border rounded-lg p-3">
                        <div className="text-sm text-foreground">
                          {displayName.includes("DataInspector")
                            ? "🔍 Systematically analyzing document structure, content relevance, and data quality to optimize information extraction processes"
                            : displayName.includes("PatternGenerator")
                              ? "⚡ Identifying semantic patterns and developing targeted extraction strategies based on query context and document characteristics"
                              : displayName.includes("Extractor")
                                ? "📄 Applying advanced extraction algorithms to retrieve relevant information using identified patterns and contextual analysis"
                                : displayName.includes("Synthesizer")
                                  ? "💡 Integrating extracted information through advanced synthesis techniques to generate comprehensive, coherent research outputs"
                                  : displayName.includes("Validation")
                                    ? "✅ Conducting rigorous validation and quality assurance protocols to ensure research accuracy and reliability"
                                    : "🔬 Employing specialized analytical methods to process and interpret research data for accurate insights"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Methodology */}
                  {subStep.thinking.thinkingContent && (
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Detailed Research Process
                      </div>
                      <div className="bg-background/50 border border-border rounded-lg p-4">
                        <pre className="text-xs font-mono text-foreground max-h-48 overflow-y-auto whitespace-pre-wrap">
                          {subStep.thinking.thinkingContent}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-muted/20 border border-border rounded-lg p-4">
                  <div className="text-sm text-foreground flex items-start gap-3">
                    <Activity className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-medium mb-1">
                        Active Research Process
                      </div>
                      <div className="text-muted-foreground">
                        {displayName.includes("DataInspector")
                          ? "Conducting comprehensive document analysis to identify relevant content and filter information for optimal extraction"
                          : `${subStep.agentName} is actively conducting specialized research analysis to provide accurate, actionable insights`}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* DataInspector Analysis Summary - Clean results display */}
        {displayName.includes("DataInspector") &&
          subStep.output &&
          subStep.status === "completed" && (
            <div className="mb-3">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                  <Eye className="w-4 h-4" />
                  Document Analysis Results
                </div>

                {/* Parse output to show document analysis results */}
                {(() => {
                  try {
                    const output =
                      typeof subStep.output === "string"
                        ? subStep.output
                        : JSON.stringify(subStep.output);

                    // Extract key metrics from the output
                    const documentsAnalyzed = (output.match(
                      /Documents Analyzed: (\d+)/
                    ) || [])[1];
                    const documentsAccepted = (output.match(
                      /Documents Accepted: (\d+)/
                    ) || [])[1];
                    const documentsRejected = (output.match(
                      /Documents Rejected: (\d+)/
                    ) || [])[1];
                    const totalChunks = (output.match(
                      /Total Chunks Ready: (\d+)/
                    ) || [])[1];

                    // Extract accepted/rejected document details from progress history
                    const acceptedDocs =
                      subStep.progressHistory
                        ?.filter((p: any) => p.stage.includes("ACCEPTED"))
                        .map((p: any) => {
                          const match = p.stage.match(/ACCEPTED: ([^(]+)/);
                          return match ? match[1].trim() : null;
                        })
                        .filter(Boolean) || [];

                    const rejectedDocs =
                      subStep.progressHistory
                        ?.filter((p: any) => p.stage.includes("REJECTED"))
                        .map((p: any) => {
                          const match = p.stage.match(/REJECTED: ([^(]+)/);
                          return match ? match[1].trim() : null;
                        })
                        .filter(Boolean) || [];

                    return (
                      <div className="space-y-4">
                        {/* Analysis Metrics */}
                        {documentsAnalyzed && (
                          <div className="grid grid-cols-4 gap-3">
                            <div className="text-center p-3 bg-card border border-border rounded-lg">
                              <div className="text-lg font-bold text-foreground">
                                {documentsAnalyzed}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Analyzed
                              </div>
                            </div>
                            <div className="text-center p-3 bg-accent/50 border border-accent rounded-lg">
                              <div className="text-lg font-bold text-accent-foreground">
                                {documentsAccepted || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Accepted
                              </div>
                            </div>
                            <div className="text-center p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                              <div className="text-lg font-bold text-destructive">
                                {documentsRejected || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Rejected
                              </div>
                            </div>
                            <div className="text-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
                              <div className="text-lg font-bold text-primary">
                                {totalChunks || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Chunks
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Accepted Documents */}
                        {acceptedDocs.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-accent"></span>
                              Accepted Documents ({acceptedDocs.length})
                            </div>
                            <div className="space-y-1">
                              {acceptedDocs.map((doc, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-accent-foreground bg-accent/30 border border-accent/50 px-3 py-2 rounded-md"
                                >
                                  ✓ {doc}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rejected Documents */}
                        {rejectedDocs.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-destructive"></span>
                              Rejected Documents ({rejectedDocs.length})
                            </div>
                            <div className="space-y-1">
                              {rejectedDocs.map((doc, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-md"
                                >
                                  ✗ {doc}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  } catch (error) {
                    return (
                      <div className="text-sm text-muted-foreground">
                        Analysis completed - see technical output for details
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          )}

        {/* Research Completion Summary - Enhanced for completed agents */}
        {subStep.status === "completed" && (
          <div className="mb-4">
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">
                      Research Completed
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {agentInfo.specialty}
                    </p>
                  </div>
                </div>
                {subStep.duration && (
                  <Badge variant="outline" className="text-xs font-mono">
                    {subStep.duration < 1000
                      ? `${subStep.duration}ms`
                      : `${(subStep.duration / 1000).toFixed(1)}s`}
                  </Badge>
                )}
              </div>

              <div className="text-sm text-foreground">
                {displayName.includes("DataInspector")
                  ? `✅ Successfully completed comprehensive document analysis and filtering protocols. Systematically processed and evaluated document corpus to identify high-relevance content for optimal information extraction workflows.`
                  : displayName.includes("PatternGenerator")
                    ? `✅ Generated sophisticated content recognition patterns and extraction strategies. Developed targeted methodologies based on comprehensive document analysis and contextual query requirements.`
                    : displayName.includes("Extractor")
                      ? `✅ Executed advanced information extraction algorithms using identified patterns and strategies. Successfully retrieved relevant data from selected sources through systematic content analysis.`
                      : displayName.includes("Synthesizer") ||
                          displayName.includes("Synthesis")
                        ? `✅ Completed advanced data synthesis and integration processes. Successfully combined extracted information into coherent, comprehensive research outputs addressing user query requirements.`
                        : displayName.includes("PlanningAgent")
                          ? `✅ Developed and executed comprehensive research workflow plan. Successfully coordinated multi-agent operations for optimal parallel processing and analysis efficiency.`
                          : displayName.includes("ResponseFormatter")
                            ? `✅ Completed professional formatting and structuring of research findings. Successfully organized analysis results into clear, actionable reports for user presentation.`
                            : `✅ Successfully completed ${displayName} specialized research processing with full protocol compliance.`}
              </div>

              {subStep.progressHistory &&
                subStep.progressHistory.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-accent/20">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Analysis steps completed:{" "}
                        {subStep.progressHistory.length}
                      </span>
                      <span>Final progress: 100%</span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Technical Output - Collapsible */}
        {subStep.output && subStep.status === "completed" && (
          <div className="mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOutput(!showOutput)}
              className="h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <FileText className="w-3 h-3 mr-2" />
              Technical Output Details
              {showOutput ? (
                <ChevronDown className="w-3 h-3 ml-2" />
              ) : (
                <ChevronRight className="w-3 h-3 ml-2" />
              )}
            </Button>

            {showOutput && (
              <div className="mt-2 bg-muted/30 border border-border rounded-lg p-3">
                <div className="text-sm font-medium text-foreground mb-2">
                  Complete {displayName} Technical Output:
                </div>
                <div className="bg-card border border-border rounded p-3">
                  <div className="text-xs font-mono text-muted-foreground max-h-64 overflow-y-auto whitespace-pre-wrap">
                    {typeof subStep.output === "string"
                      ? subStep.output
                      : JSON.stringify(subStep.output, null, 2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {subStep.error && (
          <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="text-sm font-medium text-destructive mb-1">
              Error Occurred:
            </div>
            <div className="text-sm text-destructive/80">{subStep.error}</div>
          </div>
        )}
      </div>

      {/* Agent Summary Modal */}
      <AgentSummaryModal
        agentName={displayName}
        subStep={subStep}
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
      />
    </>
  );
}

function StepCard({ step, stepNumber, isLast, onRerunAgent }: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = StepIcons[step.type] || Search;

  // Aggressive completion counting function
  const getCompletedSubStepsCount = (subSteps?: any[]) => {
    if (!subSteps) return 0;
    return subSteps.filter((subStep) => {
      const hasDuration =
        subStep.duration !== undefined &&
        subStep.duration !== null &&
        subStep.duration > 0;
      const hasEndTime =
        subStep.endTime !== undefined && subStep.endTime !== null;
      const hasOutput = subStep.output !== undefined && subStep.output !== null;
      const isProgressComplete = subStep.progress === 100;

      return (
        subStep.status === "completed" ||
        hasDuration ||
        hasEndTime ||
        (isProgressComplete && hasOutput)
      );
    }).length;
  };

  const getStatusColor = () => {
    switch (step.status) {
      case "completed":
        return "border-accent bg-accent/10";
      case "failed":
        return "border-destructive bg-destructive/10";
      case "in_progress":
        return "border-primary bg-primary/10";
      default:
        return "border-border bg-muted/30";
    }
  };

  const getStepTitle = () => {
    // Try to determine agent from step ID first, then subSteps for more specific titles
    const hasPatternGenerator =
      step.id.includes("patterngenerator") ||
      step.subSteps?.some((sub) => sub.agentName?.includes("PatternGenerator"));
    const hasExtractor =
      step.id.includes("extractor") ||
      step.subSteps?.some((sub) => sub.agentName?.includes("Extractor"));
    const hasPlanning =
      step.id.includes("planningagent") ||
      step.subSteps?.some((sub) => sub.agentName?.includes("PlanningAgent"));
    const hasDataInspector =
      step.id.includes("datainspector") ||
      step.subSteps?.some((sub) => sub.agentName?.includes("DataInspector"));
    const hasSynthesis =
      step.id.includes("synthesis") ||
      step.subSteps?.some((sub) => sub.agentName?.includes("Synthesis"));
    const hasResponseFormatter =
      step.id.includes("responseformatter") ||
      step.subSteps?.some((sub) =>
        sub.agentName?.includes("ResponseFormatter")
      );

    // Get the actual sub-steps to provide more context
    const completedSubSteps = getCompletedSubStepsCount(step.subSteps);
    const totalSubSteps = step.subSteps?.length || 0;

    switch (step.type) {
      case "analysis":
        if (hasDataInspector && totalSubSteps > 0)
          return `🧠 AI Multi-Agent Analysis (${completedSubSteps}/${totalSubSteps} agents)`;
        if (hasDataInspector) return "🔍 Intelligent Document Analysis";
        if (hasPatternGenerator) return "⚡ Smart Pattern Generation";
        if (hasExtractor) return "🎯 Data Extraction";
        if (hasPlanning) return "📋 Execution Planning";
        return "🔍 Query Analysis";
      case "rag_search":
        return "📚 Knowledge Base Search";
      case "web_search":
        return "🌐 Web Search";
      case "synthesis":
        if (hasSynthesis) return "✨ Information Synthesis";
        return "🔬 Data Synthesis";
      case "verification":
        if (hasResponseFormatter) return "📝 Response Formatting";
        if (hasPlanning) return "✅ Quality Validation";
        return "🔎 Result Verification";
      default:
        return "⚙️ Processing";
    }
  };

  return (
    <div className="relative">
      {/* Step connector line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-8 bg-border" />
      )}

      <Card
        className={`${getStatusColor()} border transition-all duration-200`}
      >
        <CardContent className="p-4">
          {/* Step Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-border shadow-sm">
              <IconComponent className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-foreground text-base">
                  {stepNumber}. {getStepTitle()}
                </h3>
                {step.status === "completed" && (
                  <CheckCircle className="w-5 h-5 text-accent" />
                )}
                {step.status === "in_progress" && (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                )}
                {step.status === "failed" && (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                {step.status === "completed" && step.duration && (
                  <span>
                    Completed in{" "}
                    {step.duration < 1000
                      ? `${step.duration}ms`
                      : `${(step.duration / 1000).toFixed(1)}s`}
                  </span>
                )}
                {step.status === "in_progress" && (
                  <span>Currently processing...</span>
                )}
                {step.status === "failed" && <span>Processing failed</span>}
                {step.status === "pending" && <span>Waiting to start...</span>}
              </div>
            </div>

            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-4">
              {/* Step Description */}
              {step.reasoning && (
                <div className="text-sm text-muted-foreground bg-card border border-border rounded-lg p-3">
                  {step.reasoning}
                </div>
              )}

              {/* Query Information */}
              {(step.query || step.queries) && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Search Terms:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {step.query && (
                      <Badge variant="secondary" className="text-xs">
                        {step.query}
                      </Badge>
                    )}
                    {step.queries?.map((query, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {query}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Agent Network - Enhanced Deep Analysis */}
              {step.subSteps && step.subSteps.length > 0 && (
                <div className="mb-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                          <Layers className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground">
                            Research Agent Network
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Coordinated intelligence analysis •{" "}
                            {step.subSteps.length} specialized units
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-foreground">
                            {getCompletedSubStepsCount(step.subSteps)}/
                            {step.subSteps.length}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            agents completed
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyMultiAgentProcess(step.subSteps || [])
                          }
                          className="h-8 px-3 text-xs"
                          title="Export Analysis Report"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {step.subSteps
                      .sort((a, b) => {
                        // Sort by startTime to maintain execution order
                        const timeA = a.startTime || 0;
                        const timeB = b.startTime || 0;
                        return timeA - timeB;
                      })
                      .map((subStep, subIdx) => (
                        <AgentSubStepInline
                          key={`agent-${subStep.agentName}-${subStep.startTime}`}
                          subStep={subStep}
                          onRerunAgent={onRerunAgent}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Sources - MINIMIZED & EXPANDABLE */}
              {step.sources && step.sources.length > 0 && (
                <SourcesSection sources={step.sources} />
              )}

              {/* Results Summary */}
              {step.results && step.results.length > 0 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <div className="text-sm font-medium text-accent-foreground mb-1">
                    Results: {step.results.length} items found
                  </div>
                  {step.confidence && (
                    <div className="text-xs text-muted-foreground">
                      Confidence: {Math.round(step.confidence * 100)}%
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function PerplexityStyleResearch({
  steps: propSteps,
  isActive: propIsActive,
  className = "",
  onRerunAgent,
}: PerplexityStyleResearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);

  // Get research state from context
  const {
    steps: contextSteps,
    isActive: contextIsActive,
    config,
    addStep,
    updateStep,
    completeSession,
    onResearchStored,
  } = useResearchContext();

  // Use context data if available, otherwise fall back to props
  const steps = contextSteps.length > 0 ? contextSteps : propSteps || [];
  const isActive = contextIsActive || propIsActive || false;

  if (!steps || steps.length === 0) {
    return null;
  }

  // Auto-complete session when research finishes
  useEffect(() => {
    const allStepsCompleted =
      steps.length > 0 && steps.every((step) => step.status === "completed");
    const noStepsInProgress = steps.every(
      (step) => step.status !== "in_progress"
    );

    if (isActive && allStepsCompleted && noStepsInProgress) {
      console.log("🎯 Research completed, storing session...");
      // Complete session after a short delay to ensure all data is captured
      setTimeout(() => {
        completeSession();
      }, 1000);
    }
  }, [steps, isActive, completeSession]);

  // ENHANCED completion counting - includes DataInspector specific detection
  const getCompletedSubStepsCount = (subSteps?: any[]) => {
    if (!subSteps) return 0;
    return subSteps.filter((subStep) => {
      const hasDuration =
        subStep.duration !== undefined &&
        subStep.duration !== null &&
        subStep.duration > 0;
      const hasEndTime =
        subStep.endTime !== undefined && subStep.endTime !== null;
      const hasOutput = subStep.output !== undefined && subStep.output !== null;
      const isProgressComplete = subStep.progress === 100;

      // Special logic for DataInspector - it may complete without setting duration
      const isDataInspectorComplete =
        subStep.agentName === "DataInspector" &&
        (subStep.stage === "Analysis complete" ||
          subStep.progressHistory?.some((p: any) =>
            p.stage?.includes("complete")
          ) ||
          (hasOutput && subStep.progress && subStep.progress >= 90));

      return (
        subStep.status === "completed" ||
        hasDuration ||
        hasEndTime ||
        isDataInspectorComplete ||
        (isProgressComplete && hasOutput)
      );
    }).length;
  };

  const completedSteps = steps.filter(
    (step) => step.status === "completed"
  ).length;
  const totalSteps = steps.length;

  // For multi-agent steps, use substep completion count
  const multiAgentStep = steps.find(
    (step) => step.subSteps && step.subSteps.length > 0
  );
  const completedAgents = multiAgentStep
    ? getCompletedSubStepsCount(multiAgentStep.subSteps)
    : 0;
  const totalAgents = multiAgentStep?.subSteps?.length || 0;

  // Debug agent visibility
  React.useEffect(() => {
    if (multiAgentStep?.subSteps) {
      const agentNames = multiAgentStep.subSteps.map((s) => s.agentName);
      console.log(
        `🔍 UI RENDER: Displaying ${totalAgents} agents:`,
        agentNames
      );

      const dataInspectorPresent = agentNames.includes("DataInspector");
      if (!dataInspectorPresent && totalAgents > 0) {
        console.warn(
          `⚠️ UI WARNING: DataInspector missing from display! Current agents:`,
          agentNames
        );
      }
    }
  }, [multiAgentStep?.subSteps, totalAgents]);

  // Auto-scroll to latest updates when steps change
  useEffect(() => {
    if (!steps || steps.length === 0) return;

    const currentTime = Date.now();
    const hasActiveSteps = steps.some((step) => step.status === "in_progress");
    const hasSubSteps = steps.some(
      (step) => step.subSteps && step.subSteps.length > 0
    );

    // Only auto-scroll if:
    // 1. There are active steps (research in progress), OR
    // 2. Steps have sub-steps (agents are running), AND
    // 3. Haven't scrolled recently (prevent spam scrolling)
    const timeSinceLastScroll = currentTime - lastScrollTimeRef.current;
    const shouldScroll =
      (hasActiveSteps || hasSubSteps) && timeSinceLastScroll > 1000; // 1 second minimum between scrolls

    if (shouldScroll) {
      lastScrollTimeRef.current = currentTime;

      // Small delay to allow for DOM updates
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }, 100);
    }
  }, [steps]); // Only depend on steps, not the time ref

  // Also auto-scroll when isActive changes (new research starts)
  useEffect(() => {
    if (isActive && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  }, [isActive]);

  return (
    <div ref={containerRef} className={`perplexity-research ${className}`}>
      {/* Advanced Research Laboratory Dashboard */}
      <div className="mb-8 p-6 bg-card border border-border rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              {isActive && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                Deep Research Laboratory
                <Badge variant="outline" className="text-xs font-mono">
                  v2.0
                </Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                {totalAgents > 0
                  ? `Advanced multi-agent intelligence system • ${totalAgents} specialized research units active`
                  : "Intelligent research workflow engine"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                {totalAgents > 0
                  ? `${completedAgents}/${totalAgents}`
                  : `${completedSteps}/${totalSteps}`}
              </div>
              <div className="text-xs text-muted-foreground">
                {totalAgents > 0 ? "agents completed" : "steps finished"}
              </div>
            </div>
            {isActive ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Research Active
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Analysis Complete
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Research Status Description */}
        <div className="mb-4 p-4 bg-background/50 border border-border rounded-lg">
          <div className="text-sm text-foreground">
            {isActive
              ? totalAgents > 0
                ? `🔬 ${totalAgents} specialized research agents are conducting parallel analysis of your query, processing documents through advanced pattern recognition, semantic extraction, and intelligent synthesis protocols...`
                : `🔍 Research pipeline is actively processing your query through advanced analytical workflows...`
              : totalAgents > 0
                ? `✅ Comprehensive research analysis completed. ${totalAgents} AI research agents successfully processed and analyzed your query, delivering actionable insights through systematic data examination.`
                : `✅ Research workflow completed successfully with comprehensive analysis results.`}
          </div>
        </div>

        {/* Advanced Progress Monitoring */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Research Progress
              </span>
            </div>
            <span className="text-lg font-bold text-foreground font-mono">
              {Math.round(
                totalAgents > 0
                  ? (completedAgents / totalAgents) * 100
                  : (completedSteps / totalSteps) * 100
              )}
              %
            </span>
          </div>
          <Progress
            value={
              totalAgents > 0
                ? (completedAgents / totalAgents) * 100
                : (completedSteps / totalSteps) * 100
            }
            className="h-3"
          />
          {isActive && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Real-time analysis in progress...</span>
            </div>
          )}
        </div>
      </div>

      {/* Research Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <StepCard
            key={`${step.id}-${index}`}
            step={step}
            stepNumber={index + 1}
            isLast={index === steps.length - 1}
            onRerunAgent={onRerunAgent}
          />
        ))}
      </div>
    </div>
  );
}

export default PerplexityStyleResearch;
