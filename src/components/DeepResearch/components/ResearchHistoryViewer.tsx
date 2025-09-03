"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ResearchHistoryItem, ResearchAgentTask } from "@/lib/indexeddb";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { PerplexityStyleResearch } from "./PerplexityStyleResearch";
import { ResearchStep } from "./ResearchSteps";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Database,
  Globe,
  CheckCircle,
  AlertCircle,
  Activity,
  Eye,
  Settings,
  Lightbulb,
  Filter,
  FileSearch,
  Microscope,
  BarChart3,
  User,
  Bot,
  Copy,
  Download,
  Sparkles,
  Edit2,
  Save,
  X,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ResearchHistoryViewerProps {
  researchItem: ResearchHistoryItem;
  onBack: () => void;
  className?: string;
}

// Convert stored ResearchAgentTask to ResearchStep format for display
const convertAgentTasksToSteps = (
  agentTasks: ResearchAgentTask[]
): ResearchStep[] => {
  console.log(
    "🔍 [convertAgentTasksToSteps] Converting agent tasks to steps:",
    {
      agentTasksCount: agentTasks.length,
      taskNames: agentTasks.map((t) => t.agentName),
      tasksWithTimeline: agentTasks.filter(
        (t) => t.progressHistory && t.progressHistory.length > 0
      ).length,
    }
  );

  // Group agent tasks into logical steps
  const stepGroups: { [key: string]: ResearchAgentTask[] } = {};

  agentTasks.forEach((task) => {
    // Determine step type based on agent type
    let stepType = "analysis";
    if (task.agentType?.includes("web") || task.agentName?.includes("web")) {
      stepType = "web_search";
    } else if (
      task.agentType?.includes("rag") ||
      task.agentName?.includes("Knowledge")
    ) {
      stepType = "rag_search";
    } else if (
      task.agentName?.includes("Synthesizer") ||
      task.agentName?.includes("ResponseFormatter")
    ) {
      stepType = "synthesis";
    } else if (
      task.agentName?.includes("Validation") ||
      task.agentName?.includes("verification")
    ) {
      stepType = "verification";
    }

    if (!stepGroups[stepType]) {
      stepGroups[stepType] = [];
    }
    stepGroups[stepType].push(task);
  });

  console.log("📊 [convertAgentTasksToSteps] Step groups created:", {
    groupCount: Object.keys(stepGroups).length,
    groups: Object.entries(stepGroups).map(([type, tasks]) => ({
      type,
      taskCount: tasks.length,
      tasks: tasks.map((t) => ({
        name: t.agentName,
        hasTimeline: !!(t.progressHistory && t.progressHistory.length > 0),
        timelineCount: t.progressHistory?.length || 0,
      })),
    })),
  });

  // Convert groups to ResearchStep format
  const finalSteps = Object.entries(stepGroups).map(
    ([stepType, tasks], index) => {
      const allCompleted = tasks.every((task) => task.status === "completed");
      const anyFailed = tasks.some((task) => task.status === "failed");
      const anyInProgress = tasks.some((task) => task.status === "in_progress");

      let stepStatus: "completed" | "in_progress" | "failed" | "pending" =
        "completed";
      if (anyFailed) stepStatus = "failed";
      else if (anyInProgress) stepStatus = "in_progress";
      else if (!allCompleted) stepStatus = "pending";

      // Calculate total duration
      const totalDuration = tasks.reduce(
        (sum, task) => sum + (task.duration || 0),
        0
      );

      // Create sub-steps from agent tasks
      const subSteps = tasks.map((task, taskIndex) => {
        // Convert stored thinking format to AgentThinking format if it exists
        let convertedThinking: any = undefined;
        if (task.thinking && task.thinking.hasThinking) {
          convertedThinking = {
            hasThinking: task.thinking.hasThinking,
            thinkingContent: task.thinking.thinkingContent || "",
            finalOutput: task.output || "", // Use task output as final output
            summary: task.thinking.summary || "",
            insights: task.thinking.insights || [],
          };
        }

        // Get latest progress info from progressHistory if available
        const latestProgress =
          task.progressHistory && task.progressHistory.length > 0
            ? task.progressHistory[task.progressHistory.length - 1]
            : null;

        return {
          id: `${stepType}_${index}_task_${taskIndex}`,
          agentName: task.agentName,
          agentType: task.agentType as
            | "query_planner"
            | "data_inspector"
            | "pattern_generator"
            | "extraction"
            | "synthesis",
          status: task.status,
          startTime: task.startTime,
          endTime: task.endTime,
          duration: task.duration,
          input: {}, // Default empty input for stored tasks
          output: task.output,
          thinking: convertedThinking,
          progress: task.progress,
          stage: task.stage,
          itemsProcessed: latestProgress?.itemsProcessed,
          totalItems: latestProgress?.totalItems,
          progressHistory: task.progressHistory,
          error: task.error,
          retryCount: task.retryCount,
          metrics: task.metrics,
        };
      });

      return {
        id: `step_${stepType}_${index}`,
        type: stepType as
          | "analysis"
          | "rag_search"
          | "web_search"
          | "synthesis"
          | "verification",
        status: stepStatus,
        timestamp:
          tasks.length > 0 ? tasks[0].startTime || Date.now() : Date.now(),
        duration: totalDuration > 0 ? totalDuration : undefined,
        reasoning: `Completed ${tasks.length} agent task${tasks.length !== 1 ? "s" : ""} in this step`,
        subSteps,
        sources: [],
        results: tasks.map((task) => ({
          summary: `${task.agentName} completed successfully`,
          content: task.output,
        })),
        confidence:
          tasks.length > 0
            ? tasks.reduce(
                (sum, task) => sum + (task.metrics?.confidence || 0.8),
                0
              ) / tasks.length
            : undefined,
      };
    }
  );

  console.log("✅ [convertAgentTasksToSteps] Conversion complete:", {
    originalTaskCount: agentTasks.length,
    finalStepCount: finalSteps.length,
    stepsWithSubSteps: finalSteps.filter(
      (s) => s.subSteps && s.subSteps.length > 0
    ).length,
    totalSubSteps: finalSteps.reduce(
      (sum, s) => sum + (s.subSteps?.length || 0),
      0
    ),
    subStepsWithTimeline: finalSteps.reduce(
      (sum, s) =>
        sum +
        (s.subSteps?.filter(
          (sub) => sub.progressHistory && sub.progressHistory.length > 0
        ).length || 0),
      0
    ),
  });

  return finalSteps;
};

// Research metadata component
function ResearchMetadata({ item }: { item: ResearchHistoryItem }) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "Unknown";
    if (duration < 1000) return `${duration}ms`;
    if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
    return `${(duration / 60000).toFixed(1)}m`;
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Research Session Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2 p-3 bg-accent/20 rounded-lg">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <FileSearch className="w-3 h-3" />
              Type
            </div>
            <Badge variant="secondary" className="text-xs font-medium">
              {item.type}
            </Badge>
          </div>
          <div className="space-y-2 p-3 bg-accent/20 rounded-lg">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Status
            </div>
            <div className="flex items-center gap-2">
              {item.status === "completed" && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {item.status === "failed" && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              {item.status === "in_progress" && (
                <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
              )}
              <span className="text-sm font-medium capitalize">
                {item.status}
              </span>
            </div>
          </div>
          <div className="space-y-2 p-3 bg-accent/20 rounded-lg">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Duration
            </div>
            <div className="text-sm font-mono font-medium">
              {formatDuration(item.duration)}
            </div>
          </div>
          <div className="space-y-2 p-3 bg-accent/20 rounded-lg">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Word Count
            </div>
            <div className="text-sm font-mono font-medium">
              {item.wordCount.toLocaleString()}
            </div>
          </div>
        </div>

        <Separator />

        {/* Timestamps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Created
            </div>
            <div className="text-sm">{formatDate(item.createdAt)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last Updated
            </div>
            <div className="text-sm">{formatDate(item.updatedAt)}</div>
          </div>
        </div>

        <Separator />

        {/* Research Configuration */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Research Configuration
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Depth: {item.researchConfig.depth}
            </Badge>
            {item.researchConfig.enableRAG && (
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1"
              >
                <Database className="w-3 h-3" />
                RAG Enabled
              </Badge>
            )}
            {item.researchConfig.enableWebSearch && (
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1"
              >
                <Globe className="w-3 h-3" />
                Web Search Enabled
              </Badge>
            )}
          </div>
        </div>

        {/* Statistics */}
        {(item.sourcesCount ||
          item.chunksProcessed ||
          item.agentTasks.length > 0) && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Research Statistics
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 bg-muted/30 rounded-lg">
                  <div className="text-lg font-bold">
                    {item.agentTasks.length}
                  </div>
                  <div className="text-xs text-muted-foreground">AI Agents</div>
                </div>
                {item.sourcesCount && (
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold">{item.sourcesCount}</div>
                    <div className="text-xs text-muted-foreground">Sources</div>
                  </div>
                )}
                {item.chunksProcessed && (
                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                    <div className="text-lg font-bold">
                      {item.chunksProcessed}
                    </div>
                    <div className="text-xs text-muted-foreground">Chunks</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Original query display component
function OriginalQuery({ item }: { item: ResearchHistoryItem }) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Original Research Query
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-foreground leading-relaxed text-lg font-medium">
            "{item.originalPrompt || item.title}"
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Submitted on {new Date(item.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Research results display component
function ResearchResults({ item }: { item: ResearchHistoryItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (item.finalOutput) {
      try {
        await navigator.clipboard.writeText(item.finalOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  const handleExport = () => {
    if (item.finalOutput) {
      const blob = new Blob([item.finalOutput], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `research-${item.title.replace(/\s+/g, "-").toLowerCase()}-${new Date(item.createdAt).toISOString().split("T")[0]}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!item.finalOutput) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Research Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No final output available for this research session.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Research Results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="h-8 px-3"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg dark:prose-invert max-w-none bg-card border border-border rounded-xl p-6 shadow-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-muted px-2 py-1 rounded-md text-sm font-mono border border-border/50"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-8 mb-6 text-foreground border-b border-border pb-3">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-6 mb-3 text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 text-foreground leading-relaxed text-base">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 space-y-2 ml-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6 space-y-2 ml-6">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-foreground leading-relaxed text-base">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground mb-6 bg-accent/20 py-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border border-border rounded-lg shadow-sm">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border bg-accent/30 px-6 py-3 text-left font-semibold text-foreground">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-6 py-3 text-foreground">
                  {children}
                </td>
              ),
            }}
          >
            {item.finalOutput}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}

export function ResearchHistoryViewer({
  researchItem,
  onBack,
  className = "",
}: ResearchHistoryViewerProps) {
  const [researchSteps, setResearchSteps] = useState<ResearchStep[]>([]);

  // Title editing state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(researchItem.title);
  const [isSavingTitle, setIsSavingTitle] = useState(false);

  // Research history hook for updating
  const { updateResearch } = useResearchHistory();

  // Title editing handlers
  const handleStartEditTitle = () => {
    setIsEditingTitle(true);
    setEditedTitle(researchItem.title);
  };

  const handleCancelEditTitle = () => {
    setIsEditingTitle(false);
    setEditedTitle(researchItem.title);
  };

  const handleSaveTitle = async () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle || trimmedTitle === researchItem.title) {
      setIsEditingTitle(false);
      return;
    }

    try {
      setIsSavingTitle(true);
      console.log("💾 [ResearchHistoryViewer] Updating title:", {
        id: researchItem.id,
        oldTitle: researchItem.title,
        newTitle: trimmedTitle,
      });

      await updateResearch(researchItem.id, { title: trimmedTitle });

      // Update local state to reflect the change immediately
      researchItem.title = trimmedTitle;
      setIsEditingTitle(false);

      console.log("✅ [ResearchHistoryViewer] Title updated successfully");
    } catch (error) {
      console.error(
        "❌ [ResearchHistoryViewer] Failed to update title:",
        error
      );
      // Reset to original title on error
      setEditedTitle(researchItem.title);
    } finally {
      setIsSavingTitle(false);
    }
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      handleCancelEditTitle();
    }
  };

  // Update edited title when research item changes
  useEffect(() => {
    setEditedTitle(researchItem.title);
    setIsEditingTitle(false);
  }, [researchItem.id, researchItem.title]);

  // Convert agent tasks to research steps for display
  useEffect(() => {
    console.log("🔍 [ResearchHistoryViewer] Processing research item:", {
      title: researchItem.title,
      hasAgentTasks: !!(
        researchItem.agentTasks && researchItem.agentTasks.length > 0
      ),
      agentTasksCount: researchItem.agentTasks?.length || 0,
      agentTasksWithTimeline:
        researchItem.agentTasks?.filter(
          (t) => t.progressHistory && t.progressHistory.length > 0
        ).length || 0,
      totalTimelineEntries:
        researchItem.agentTasks?.reduce(
          (sum, t) => sum + (t.progressHistory?.length || 0),
          0
        ) || 0,
    });

    if (researchItem.agentTasks && researchItem.agentTasks.length > 0) {
      const steps = convertAgentTasksToSteps(researchItem.agentTasks);
      setResearchSteps(steps);
    } else {
      console.warn(
        "⚠️ [ResearchHistoryViewer] No agent tasks found in research item"
      );
      setResearchSteps([]);
    }
  }, [researchItem]);

  // Note: Individual research export removed - use TimeCapsule export/import system instead

  return (
    <div
      className={`research-history-viewer h-full flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="flex-shrink-0 sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              {/* Editable Title */}
              <div className="flex items-center gap-3 mb-2">
                {isEditingTitle ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={handleTitleKeyPress}
                      className="text-2xl font-bold bg-background border-2 border-primary/50 focus:border-primary"
                      placeholder="Enter research title..."
                      disabled={isSavingTitle}
                      autoFocus
                    />
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSaveTitle}
                        disabled={isSavingTitle || !editedTitle.trim()}
                        className="h-9 px-3"
                        title="Save title (Enter)"
                      >
                        {isSavingTitle ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEditTitle}
                        disabled={isSavingTitle}
                        className="h-9 px-3"
                        title="Cancel editing (Escape)"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 flex-1">
                    <h1 className="text-2xl font-bold text-foreground flex-1">
                      {researchItem.title}
                    </h1>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleStartEditTitle}
                      className="h-9 px-3"
                      title="Edit title"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Research session from{" "}
                {new Date(researchItem.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {researchItem.type}
            </Badge>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 overflow-auto">
        <div className="space-y-6 pb-8 px-1">
          {/* Research Metadata */}
          <ResearchMetadata item={researchItem} />

          {/* Original Query */}
          <OriginalQuery item={researchItem} />

          {/* Research Process - Agent Network Display */}
          {researchSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Research Process & Agent Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PerplexityStyleResearch
                  steps={researchSteps}
                  isActive={false}
                  className="border-0 bg-transparent"
                />
              </CardContent>
            </Card>
          )}

          {/* Research Results */}
          <ResearchResults item={researchItem} />
        </div>
      </ScrollArea>
    </div>
  );
}

export default ResearchHistoryViewer;
