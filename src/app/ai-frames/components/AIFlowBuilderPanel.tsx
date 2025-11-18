"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Bot,
  Loader2,
  Wand2,
  Brain,
  Sparkles,
  ShieldCheck,
  Key,
  Eye,
  RefreshCcw,
  Check,
  Database,
  Globe,
  Trash2,
  X,
  Download as DownloadIcon,
  Plug,
  Copy,
} from "lucide-react";
import type { UseAIFlowBuilderReturn } from "../hooks/useAIFlowBuilder";
import type { AIFrame } from "../types/frames";
import type { AIFlowModelTier } from "../lib/openRouterModels";
import { OllamaConnectionModal } from "@/components/DeepResearch/components/OllamaConnectionModal";
import { ResearchSteps } from "@/components/DeepResearch/components/ResearchSteps";
import { getBuildEnv, isLocalBuildEnv } from "../utils/buildEnv";

interface WorkspaceStats {
  frames: number;
  masteredFrames: number;
  chapters: number;
  concepts: number;
}

interface AIFlowBuilderPanelProps {
  flowBuilder: UseAIFlowBuilderReturn;
  onAcceptFrames: (frames: AIFrame[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  workspaceStats: WorkspaceStats;
}

export function AIFlowBuilderPanel({
  flowBuilder,
  onAcceptFrames,
  isOpen,
  onToggle,
  workspaceStats,
}: AIFlowBuilderPanelProps) {
  const {
    prompt,
    setPrompt,
    plan,
    frameDrafts,
    planning,
    generating,
    error,
    planFlow,
    generateFrameDrafts,
    resetPlan,
    acceptDrafts,
    discardDrafts,
    aiProviders,
    firecrawl,
    webSearchEnabled,
    setWebSearchEnabled,
    contextPreview,
    sessionState,
    progressMetrics,
    evaluateCheckpoint,
    historySessions,
    historyActions,
    timelineSteps,
    timelineExpandedSteps,
    handleTimelineStepClick,
  } = flowBuilder;

  const [openRouterKey, setOpenRouterKey] = useState("");
  const [firecrawlKey, setFirecrawlKey] = useState(
    firecrawl.firecrawlState.apiKey || ""
  );
  const [ollamaModalOpen, setOllamaModalOpen] = useState(false);
  const [copyLogsState, setCopyLogsState] = useState<
    "idle" | "copied" | "error"
  >("idle");
  const [localToolCopyState, setLocalToolCopyState] = useState<
    "idle" | "copied"
  >("idle");
  const [swePromptCopyState, setSwePromptCopyState] = useState<
    "idle" | "copied"
  >("idle");
  const [localBridgeBaseUrl, setLocalBridgeBaseUrl] = useState<string | null>(
    null
  );
  const buildEnv = getBuildEnv();
  const localBridgeAvailable = isLocalBuildEnv();
  const localBridgeActive = aiProviders.activeProvider === "local-bridge";

  const openRouterState = aiProviders.openrouter.connectionState;
  const openRouterModels = aiProviders.openrouter.modelOptions;
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const selectedHistory = useMemo(
    () => historySessions.find((session) => session.id === selectedHistoryId) || null,
    [historySessions, selectedHistoryId]
  );
  const historyImportInputRef = useRef<HTMLInputElement | null>(null);
  const [historyImportError, setHistoryImportError] = useState<string | null>(null);

  useEffect(() => {
    if (
      selectedHistoryId &&
      !historySessions.some((session) => session.id === selectedHistoryId)
    ) {
      setSelectedHistoryId(null);
    }
  }, [historySessions, selectedHistoryId]);

  useEffect(() => {
    setCopyLogsState("idle");
  }, [selectedHistoryId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocalBridgeBaseUrl(`${window.location.origin}/api/local/aiframes`);
    }
  }, []);

const localBridgeSpec = useMemo(() => {
  const base = localBridgeBaseUrl || "/api/local/aiframes";
  return JSON.stringify(
    {
      name: "aiFramesLocalBridge",
        description:
          "Interact with the TimeCapsule AI Frames workspace when NEXT_BUILD_ENV=local. Use GET /state then POST /state with edits.",
        endpoints: [
          { method: "GET", url: `${base}/info`, summary: "Bridge documentation" },
          {
            method: "GET",
            url: `${base}/state`,
            summary: "Fetch frames, chapters, and graphState snapshot.",
          },
          {
            method: "POST",
            url: `${base}/state`,
            summary:
              "Replace the snapshot with updated frames/chapters/graphState.",
            body: "{ frames: AIFrame[], chapters: Chapter[], graphState: GraphState }",
          },
        ],
      },
      null,
      2
  );
}, [localBridgeBaseUrl]);
const resolvedLocalBridgeBase = localBridgeBaseUrl || "/api/local/aiframes";

const swePromptTemplate = useMemo(() => {
  const trimmedPrompt = prompt?.trim()
    ? `\n\nUser Goal:\n"""${prompt.trim()}"""`
    : "";
  return [
    "You are a SWE agent operating inside this repo. Populate the TimeCapsule AI-Frames workspace without creating scripts or CLIs.",
    "",
    "Rules:",
    "- Use HTTP calls only. DO NOT scaffold local scripts, CLIs, or polling loops.",
    "- Treat /api/local/aiframes endpoints as your only tool surface (available when NEXT_BUILD_ENV=local).",
    "- Preserve existing frame IDs unless you intentionally replace them.",
    "",
    "Workflow:",
    "1. GET /api/local/aiframes/info to confirm the bridge contract.",
    "2. GET /api/local/aiframes/state to inspect the current frames, chapters, and graphState.",
    "3. Design or update chapters (title, description, color, order, frameIds) and frames (title, goal, informationText, afterVideoText, aiConcepts, attachments, chapterId, order).",
    "4. POST the entire updated snapshot back to /api/local/aiframes/state with { frames, chapters, graphState }.",
    "5. Reply with a concise summary and remind the user to click “Pull from Local SWE.”",
    trimmedPrompt,
    "",
    "Endpoints:",
    `GET  ${resolvedLocalBridgeBase}/info`,
    `GET  ${resolvedLocalBridgeBase}/state`,
    `POST ${resolvedLocalBridgeBase}/state`,
  ]
    .filter(Boolean)
    .join("\n");
}, [prompt, resolvedLocalBridgeBase]);

const handleProviderChange = useCallback((value: string) => {
  aiProviders.setActiveProvider(
    value as "openrouter" | "ollama" | "local-bridge"
  );
}, [aiProviders]);

const handleModelChange = useCallback((tier: AIFlowModelTier) => (value: string) => {
  aiProviders.openrouter.updateModelSelection(tier, value);
}, [aiProviders]);

if (!isOpen) {
  return null;
}

  const handleConnectOpenRouter = async () => {
    if (!openRouterKey.trim()) return;
    await aiProviders.openrouter.connectWithApiKey(openRouterKey.trim());
    setOpenRouterKey("");
  };

  const handleAcceptAll = () => {
    const accepted = acceptDrafts();
    if (accepted.length) {
      onAcceptFrames(accepted);
    }
  };

  const handleAcceptFrame = (frameId: string) => {
    const accepted = acceptDrafts([frameId]);
    if (accepted.length) {
      onAcceptFrames(accepted);
    }
  };

  const handleDiscardPlan = () => {
    discardDrafts();
    resetPlan();
  };

  const downloadJson = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportHistory = (sessionId?: string) => {
    const payload = sessionId
      ? historyActions.exportSession(sessionId)
      : historyActions.exportAllSessions();
    if (!payload) return;
    const filename = sessionId
      ? `ai-flow-session-${sessionId}.json`
      : `ai-flow-history-${new Date().toISOString().split("T")[0]}.json`;
    downloadJson(filename, payload);
  };

  const handleHistoryImportChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const success = historyActions.importSessions(text);
      setHistoryImportError(
        success ? null : "Failed to import history. Check the file format."
      );
    } catch (err) {
      setHistoryImportError(
        err instanceof Error ? err.message : "Failed to import history."
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleCopySelectedLogs = async () => {
    if (!selectedHistory || selectedHistory.logs.length === 0) {
      return;
    }
    const formatted = selectedHistory.logs
      .slice()
      .reverse()
      .map(
        (log) =>
          `[${new Date(log.timestamp).toLocaleString()}] ${log.agent.toUpperCase()} · ${log.role.toUpperCase()}\n${log.content}`
      )
      .join("\n\n");
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(formatted);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = formatted;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopyLogsState("copied");
      setTimeout(() => setCopyLogsState("idle"), 2000);
    } catch (error) {
      console.error("Failed to copy logs:", error);
      setCopyLogsState("error");
    }
  };

  const plannedCount = frameDrafts.length;
  const readyToAcceptCount = frameDrafts.filter(
    (draft) => draft.masteryState === "completed" && draft.status === "generated"
  ).length;
  const hasDraftMetrics = !localBridgeActive && plannedCount > 0;
  const currentFrameId = sessionState?.id ? sessionState.currentFrameId : null;

  const providerStatusBadge = (connected: boolean) => (
    <Badge variant={connected ? "default" : "secondary"} className="text-xs">
      <span
        className={`inline-flex h-2 w-2 rounded-full mr-1 ${
          connected ? "bg-emerald-400" : "bg-slate-400"
        }`}
      />
      {connected ? "Connected" : "Disconnected"}
    </Badge>
  );

const handleCopyLocalBridgeSpec = async () => {
  try {
    await navigator.clipboard.writeText(localBridgeSpec);
    setLocalToolCopyState("copied");
    setTimeout(() => setLocalToolCopyState("idle"), 1800);
  } catch (error) {
    console.error("Failed to copy local bridge spec:", error);
  }
};

const handleCopySwePrompt = async () => {
  try {
    await navigator.clipboard.writeText(swePromptTemplate);
    setSwePromptCopyState("copied");
    setTimeout(() => setSwePromptCopyState("idle"), 1800);
  } catch (error) {
    console.error("Failed to copy SWE prompt template:", error);
  }
};

  const masteryBadge = (state: string | undefined) => {
    const palette: Record<string, { label: string; className: string }> = {
      completed: {
        label: "Mastered",
        className: "bg-emerald-100 text-emerald-700",
      },
      awaiting_quiz: {
        label: "Quiz Ready",
        className: "bg-amber-100 text-amber-700",
      },
      needs_remediation: {
        label: "Remediation",
        className: "bg-red-100 text-red-700",
      },
      locked: {
        label: "Locked",
        className: "bg-slate-100 text-slate-700",
      },
      ready: {
        label: "Ready",
        className: "bg-blue-100 text-blue-700",
      },
    };

    const fallback = palette[state || "ready"] || palette.ready;
    return <Badge className={fallback.className}>{fallback.label}</Badge>;
  };

  return (
    <>
      <div className="fixed top-24 right-6 z-50 w-full max-w-5xl pointer-events-auto">
        <Card className="bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-3xl max-h-[80vh] overflow-y-auto">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  AI Flow Builder
                </div>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <Bot className="h-6 w-6 text-emerald-500" />
                  Build AI Frames with Knowledge Base Grounding
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Prompt the planner, ground generations with your Knowledge Base + Firecrawl, and gate progress with checkpoint quizzes before syncing to your graph.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close AI Flow Builder</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="grid lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium">
                    Action Provider (default: SWE bridge)
                  </Label>
                  {providerStatusBadge(
                    aiProviders.providerReady[aiProviders.activeProvider]
                  )}
                </div>
                <Select
                  value={aiProviders.activeProvider}
                  onValueChange={handleProviderChange}
                >
                  <SelectTrigger className="bg-white border-slate-300">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openrouter">
                      OpenRouter (Default)
                    </SelectItem>
                    <SelectItem value="ollama">Ollama · Local</SelectItem>
                    <SelectItem
                      value="local-bridge"
                      disabled={!localBridgeAvailable}
                    >
                      SWE Agent Bridge{" "}
                      {!localBridgeAvailable ? "(local only)" : "(Dev)"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>OpenRouter</span>
                    {providerStatusBadge(aiProviders.providerReady.openrouter)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Ollama</span>
                    {providerStatusBadge(aiProviders.providerReady.ollama)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Local SWE Bridge</span>
                    {providerStatusBadge(
                      aiProviders.providerReady["local-bridge"]
                    )}
                  </div>
                  {!localBridgeAvailable && (
                    <p className="text-xs text-slate-500">
                      Enable by running the app with <code>NEXT_BUILD_ENV=local</code>.
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    Works with Cursor, Codex, and Claude Code when the SWE bridge is active.
                  </p>
                </div>
              </div>

              {localBridgeActive && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-emerald-800 font-semibold flex items-center gap-2">
                      <Plug className="h-4 w-4" />
                      Local SWE Bridge Enabled
                    </Label>
                    <Badge variant="outline" className="text-xs text-emerald-800">
                      {buildEnv.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-emerald-900 space-y-2">
                    <span className="block">
                      <strong>First-time setup:</strong> Copy the prompt +
                      tool JSON below and hand them to Cursor/Codex/Claude Code.
                      Once connected, the SWE agent autowrites your AI-Frames plan by
                      calling the endpoints listed here.
                    </span>
                    <span className="block">
                      <strong>Workflow:</strong> agent calls{" "}
                      <code>GET /api/local/aiframes/state</code> to read the graph,
                      modifies `frames/chapters/graphState`, then{" "}
                      <code>POST /api/local/aiframes/state</code> with the full payload.
                      After it confirms success, hit “Pull from Local SWE” in this UI
                      to ingest the new plan.
                    </span>
                  </p>
                  <div className="bg-white rounded-xl border border-emerald-100 p-3 text-xs text-slate-700 space-y-2">
                    <div className="font-semibold text-slate-900">
                      Available endpoints
                    </div>
                    <div className="flex flex-col gap-1 font-mono">
                      <span>GET {resolvedLocalBridgeBase}/info</span>
                      <span>GET {resolvedLocalBridgeBase}/state</span>
                      <span>POST {resolvedLocalBridgeBase}/state</span>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-2 w-fit"
                      onClick={handleCopyLocalBridgeSpec}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {localToolCopyState === "copied"
                        ? "Copied tool spec"
                        : "Copy tool JSON"}
                    </Button>
                    <div className="space-y-2 pt-3 border-t border-emerald-100 mt-3">
                      <Label className="text-xs font-semibold text-slate-600">
                        Ready-to-paste SWE prompt
                      </Label>
                      <Textarea
                        readOnly
                        value={swePromptTemplate}
                        className="bg-slate-50 text-xs h-36 font-mono"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopySwePrompt}
                        className="w-fit"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {swePromptCopyState === "copied"
                          ? "Prompt copied"
                          : "Copy prompt"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    OpenRouter API Key
                  </Label>
                  {openRouterState.maskedApiKey && (
                    <Badge variant="outline" className="text-xs text-slate-500">
                      {openRouterState.maskedApiKey}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={openRouterKey}
                    onChange={(event) => setOpenRouterKey(event.target.value)}
                    className="bg-white border-slate-300"
                  />
                  <Button
                    onClick={handleConnectOpenRouter}
                    disabled={!openRouterKey.trim() || openRouterState.connecting}
                    className="bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    {openRouterState.connecting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Connecting
                      </>
                    ) : (
                      <>
                        <Plug className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                  {openRouterState.apiKeyPresent && (
                    <Button
                      variant="ghost"
                      onClick={aiProviders.openrouter.disconnect}
                      className="text-red-500 hover:text-red-600"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["planner", "generator", "vision"] as const).map((tier) => (
                    <div key={tier}>
                      <Label className="text-xs uppercase tracking-wide text-slate-500">
                        {tier === "planner"
                          ? "Planner model"
                          : tier === "generator"
                          ? "Generator model"
                          : "Vision model"}
                      </Label>
                      <Select
                        value={openRouterState.modelSelections[tier]}
                        onValueChange={handleModelChange(tier)}
                      >
                        <SelectTrigger className="bg-white border-slate-300 h-9">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {openRouterModels[tier].map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-slate-700 font-medium">Vision mode</p>
                    <p className="text-slate-500 text-xs">
                      Enable to send image/PDF snippets to vision models
                    </p>
                  </div>
                  <Switch
                    checked={openRouterState.visionMode === "vision"}
                    onCheckedChange={(checked) =>
                      aiProviders.openrouter.setVisionMode(
                        checked ? "vision" : "text"
                      )
                    }
                  />
                </div>
                {openRouterState.error && (
                  <p className="text-xs text-red-500">{openRouterState.error}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Firecrawl Key (Web Grounding)
                  </Label>
                  {firecrawl.firecrawlState.configured && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                      Configured
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="firecrawl_live_..."
                    value={firecrawlKey}
                    onChange={(event) => setFirecrawlKey(event.target.value)}
                    className="bg-white border-slate-300"
                  />
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      if (!firecrawlKey.trim()) {
                        firecrawl.clearFirecrawlKey();
                        return;
                      }
                      await firecrawl.saveFirecrawlKey(firecrawlKey.trim());
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setFirecrawlKey("");
                      firecrawl.clearFirecrawlKey();
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Use Firecrawl in prompts
                  </span>
                  <Switch
                    disabled={!firecrawl.firecrawlState.configured}
                    checked={webSearchEnabled}
                    onCheckedChange={(checked) => setWebSearchEnabled(checked)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700"
                  onClick={() => setOllamaModalOpen(true)}
                >
                  Configure Ollama (Local)
                </Button>
                {firecrawl.firecrawlState.error && (
                  <p className="text-xs text-red-500">
                    {firecrawl.firecrawlState.error}
                  </p>
                )}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Mastery Progress
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {progressMetrics.masteryPercent}%
                </p>
                <p className="text-sm text-slate-500">
                  {progressMetrics.framesCompleted} /{" "}
                  {progressMetrics.totalFrames || plannedCount} frames mastered
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Current Phase
                </p>
                <p className="text-lg font-semibold text-slate-900 capitalize">
                  {progressMetrics.currentPhase
                    ? progressMetrics.currentPhase.replace("-", " ")
                    : plan
                      ? "Generating"
                      : "Not started"}
                </p>
                <p className="text-sm text-slate-500">
                  Session {sessionState?.id ?? "—"}
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Remediation Branches
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {progressMetrics.remediationCount}
                </p>
                <p className="text-sm text-slate-500">
                  {currentFrameId
                    ? `Focused on ${
                        frameDrafts.find((d) => d.tempId === currentFrameId)?.title ??
                        "next frame"
                      }`
                    : "All frames cleared"}
                </p>
              </div>
            </section>

            {timelineSteps.length > 0 && (
              <section className="space-y-3 bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-slate-900 font-semibold">Agent Timeline</h4>
                    <p className="text-sm text-slate-500">
                      Live view of orchestration steps from the DeepResearch stack
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                    Live
                  </Badge>
                </div>
                <ResearchSteps
                  steps={timelineSteps}
                  expandedSteps={timelineExpandedSteps}
                  onStepClick={handleTimelineStepClick}
                  className="border border-slate-200 rounded-2xl shadow-sm"
                />
              </section>
            )}

            <section className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-slate-900 font-semibold">Flow History</h4>
                  <p className="text-sm text-slate-500">
                    Saved agent outputs from recent sessions
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportHistory()}
                    disabled={historySessions.length === 0}
                  >
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Export All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => historyImportInputRef.current?.click()}
                  >
                    Import
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={historyActions.clearSessions}
                    disabled={historySessions.length === 0}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              {historyImportError && (
                <p className="text-sm text-red-500">{historyImportError}</p>
              )}
              <div className="space-y-2 max-h-60 overflow-auto">
                {historySessions.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No AI Flow sessions saved yet. Once you run the flow builder,
                    the planner/generator logs will appear here for export.
                  </p>
                ) : (
                  historySessions.map((session) => (
                    <div
                      key={session.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {session.prompt.slice(0, 80)}
                            {session.prompt.length > 80 ? "…" : ""}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(session.updatedAt).toLocaleString()}
                          </p>
                        </div>
                        <Badge
                          className={
                            session.status === "completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : session.status === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setSelectedHistoryId((prev) =>
                              prev === session.id ? null : session.id
                            )
                          }
                        >
                          View Logs
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExportHistory(session.id)}
                        >
                          Export
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => historyActions.deleteSession(session.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {selectedHistory && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 max-h-60 overflow-auto space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      Logs for {selectedHistory.prompt.slice(0, 40)}
                      {selectedHistory.prompt.length > 40 ? "…" : ""}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopySelectedLogs}
                        disabled={selectedHistory.logs.length === 0}
                      >
                        Copy logs
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedHistoryId(null)}
                      >
                        Hide
                      </Button>
                    </div>
                  </div>
                  {copyLogsState === "copied" && (
                    <p className="text-xs text-emerald-600">Copied to clipboard.</p>
                  )}
                  {copyLogsState === "error" && (
                    <p className="text-xs text-red-500">
                      Unable to copy logs. Please try again.
                    </p>
                  )}
                  {selectedHistory.logs.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No agent logs recorded for this session.
                    </p>
                  ) : (
                    selectedHistory.logs.slice(0, 20).map((log) => (
                      <div
                        key={log.id}
                        className="rounded-lg border border-slate-200 bg-white p-2"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="font-semibold">
                            {log.agent.toUpperCase()} · {log.role}
                          </span>
                          <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <pre className="whitespace-pre-wrap text-xs text-slate-700 max-h-32 overflow-auto">
                          {log.content}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>

            <section className="space-y-3">
              <Label className="text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Prompt the Flow Builder
              </Label>
              <Textarea
                placeholder="Ex: Build a 6-frame crash course on convolutional neural networks using my uploaded PDF summaries and cite the relevant chunks."
                className="bg-white border-slate-300 text-slate-900 min-h-[110px]"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={planFlow}
                  disabled={planning || !prompt.trim() || localBridgeActive}
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  {planning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Planning...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      AI Build Flow
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  disabled={
                    generating ||
                    localBridgeActive ||
                    !frameDrafts.some(
                      (draft) =>
                        draft.status === "planned" || draft.status === "error"
                    )
                  }
                  onClick={() => void generateFrameDrafts()}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating Drafts...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate All Frames
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  disabled={!plan}
                  onClick={handleDiscardPlan}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  Reset Plan
                </Button>
                {readyToAcceptCount > 0 && (
                  <Button
                    variant="default"
                    onClick={handleAcceptAll}
                    disabled={readyToAcceptCount === 0}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept {readyToAcceptCount} Completed Frames
                  </Button>
                )}
              </div>
              {localBridgeActive && (
                <p className="text-sm text-slate-600 bg-slate-100 border border-slate-200 rounded-xl p-3">
                  SWE Bridge mode disables the built-in planner. Use Codex/Cursor
                  with the local endpoints above, then press “Pull from Local SWE”
                  inside the AI Frames workspace to ingest the generated frames.
                </p>
              )}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">
                  {error}
                </p>
              )}
            </section>

            {contextPreview &&
              (contextPreview.knowledge?.text || contextPreview.web) && (
                <section className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-slate-800 font-semibold flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-amber-500" />
                    Grounding Preview
                  </h4>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="kb">
                      <AccordionTrigger className="text-slate-700">
                        Knowledge Base Context
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-xs whitespace-pre-wrap text-slate-600 bg-white border border-slate-200 rounded-lg p-3 max-h-48 overflow-auto">
                          {contextPreview.knowledge?.text ||
                            "No KB snippets retrieved."}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="web">
                      <AccordionTrigger className="text-slate-700">
                        Firecrawl Context
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-xs whitespace-pre-wrap text-slate-600 bg-white border border-slate-200 rounded-lg p-3 max-h-48 overflow-auto">
                          {contextPreview.web
                            ? contextPreview.web.results
                                .map(
                                  (result, index) =>
                                    `[WEB-${index + 1}] ${result.title}\n${result.content}`
                                )
                                .join("\n\n")
                            : "Web search disabled or unavailable."}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              )}

            <section className="space-y-4">
              {localBridgeActive && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 space-y-2">
                  <p className="font-semibold">
                    SWE Agent Bridge is controlling the Flow Builder.
                  </p>
                  <p>
                    Copy the prompt + tool JSON into Cursor/Codex/Claude Code,
                    let it call the endpoints shown above, then press “Pull from
                    Local SWE.” Workspace stats below update the moment frames
                    land in AI-Frames.
                  </p>
                </div>
              )}
              {hasDraftMetrics ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-slate-500">
                      Draft Status
                    </p>
                    <p className="text-slate-900 text-lg font-semibold">
                      {readyToAcceptCount}/{plannedCount} frames mastered
                    </p>
                  </div>
                  {readyToAcceptCount > 0 && (
                    <Badge className="bg-blue-100 text-blue-700">
                      Ready for sync
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
                  <p className="text-sm uppercase tracking-wide text-slate-500">
                    Workspace status
                  </p>
                  <div className="text-slate-900 text-lg font-semibold">
                    {workspaceStats.frames} frames · {workspaceStats.chapters} chapters ·{" "}
                    {workspaceStats.concepts} concepts
                  </div>
                  <p className="text-xs text-slate-500">
                    {workspaceStats.masteredFrames} frames marked as mastered in the current graph.
                  </p>
                </div>
              )}

              {!plan && (
                <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center bg-white">
                  <Sparkles className="h-8 w-8 mx-auto text-amber-500 mb-3" />
                  <p className="text-lg font-semibold text-slate-900">
                    Prompt the Flow Builder to get started
                  </p>
                  <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                    Describe the learning path you want. We will plan chapters, generate linked frames, cite your Knowledge Base, and let you accept every AI addition before it touches your graph.
                  </p>
                </div>
              )}

              {plan && (
                <div className="space-y-4">
                  {plan.chapters.map((chapter) => {
                    const chapterFrames = frameDrafts.filter(
                      (draft) => draft.chapterId === chapter.id
                    );
                    return (
                      <div
                        key={chapter.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                              {chapter.title}
                            </h3>
                            <p className="text-slate-500 text-sm">
                              {chapter.goal}
                            </p>
                          </div>
                          <Badge className="bg-slate-100 text-slate-700">
                            {chapterFrames.length} frames
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {chapterFrames.map((draft, index) => {
                            const displayOrder =
                              typeof draft.order === "number"
                                ? draft.order + 1
                                : index + 1;
                            return (
                              <div
                                key={draft.tempId}
                                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                      Frame {displayOrder}
                                    </p>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                      {draft.title}
                                    </h4>
                                    <p className="text-slate-500 text-sm">
                                      {draft.goal}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <Badge
                                      className={`${
                                        draft.status === "generated"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : draft.status === "generating"
                                          ? "bg-amber-100 text-amber-700"
                                          : draft.status === "error"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {draft.status}
                                    </Badge>
                                    {masteryBadge(draft.masteryState)}
                                    {draft.requiresVision && (
                                      <Badge className="bg-purple-100 text-purple-700 flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        Vision
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-sm text-slate-600 space-y-2">
                                  {draft.generated ? (
                                    <>
                                      <p className="line-clamp-3">
                                        {draft.generated.informationText}
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {draft.generated.aiConcepts.map((concept) => (
                                          <Badge
                                            key={concept}
                                            className="bg-white text-slate-700 border border-slate-200"
                                          >
                                            {concept}
                                          </Badge>
                                        ))}
                                      </div>
                                    </>
                                  ) : (
                                    <p className="italic text-slate-400">
                                      Waiting for generation...
                                    </p>
                                  )}
                                  {draft.error && (
                                    <p className="text-red-500 text-xs">
                                      {draft.error}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {draft.status === "planned" && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      disabled={draft.masteryState === "locked"}
                                      title={
                                        draft.masteryState === "locked"
                                          ? "Complete earlier checkpoints to unlock this frame."
                                          : "Generate AI content"
                                      }
                                      onClick={() =>
                                        void generateFrameDrafts([draft.tempId])
                                      }
                                    >
                                      <Brain className="h-4 w-4 mr-1" />
                                      Generate
                                    </Button>
                                  )}
                                  {draft.status === "generated" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-blue-500 text-white hover:bg-blue-600"
                                        disabled={draft.masteryState !== "completed"}
                                        onClick={() => handleAcceptFrame(draft.tempId)}
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-300 text-slate-700"
                                        onClick={() =>
                                          void generateFrameDrafts([draft.tempId])
                                        }
                                      >
                                        <RefreshCcw className="h-4 w-4 mr-1" />
                                        Regenerate
                                      </Button>
                                    </>
                                  )}
                                  {draft.status === "error" && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() =>
                                        void generateFrameDrafts([draft.tempId])
                                      }
                                    >
                                      Retry
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </CardContent>
        </Card>
      </div>

      <OllamaConnectionModal
        open={ollamaModalOpen}
        onOpenChange={setOllamaModalOpen}
        onConnect={aiProviders.ollama.connect}
        onTestConnection={aiProviders.ollama.testConnection}
        connectionState={aiProviders.ollama.connectionState}
      />
      <input
        ref={historyImportInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleHistoryImportChange}
      />
    </>
  );
}
