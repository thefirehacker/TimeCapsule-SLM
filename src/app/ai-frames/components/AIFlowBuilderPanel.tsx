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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  AlertTriangle,
  Edit,
  Layers,
  Link,
} from "lucide-react";
import type {
  UseAIFlowBuilderReturn,
  PlannerChapter,
} from "../hooks/useAIFlowBuilder";
import type { AIFrame } from "../types/frames";
import type { AIFlowModelTier } from "../lib/openRouterModels";
import { OllamaConnectionModal } from "@/components/DeepResearch/components/OllamaConnectionModal";
import { ResearchSteps } from "@/components/DeepResearch/components/ResearchSteps";
import { getBuildEnv, isLocalBuildEnv } from "../utils/buildEnv";
import { TIMECAPSULE_VERSION } from "@/lib/version";
import { useTimeCapsuleCredits } from "../hooks/useTimeCapsuleCredits";
import type { TimeCapsuleCloudSyncState } from "../hooks/useTimeCapsuleSync";

interface WorkspaceStats {
  frames: number;
  masteredFrames: number;
  chapters: number;
  concepts: number;
}

interface AIFlowBuilderPanelProps {
  flowBuilder: UseAIFlowBuilderReturn;
  onAcceptFrames: (frames: AIFrame[], chapters?: PlannerChapter[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  workspaceStats: WorkspaceStats;
  knowledgeBaseUnavailable?: boolean;
  knowledgeBaseUnavailableMessage?: string | null;
  onGraphReset?: () => void;
  activeTimeCapsuleId?: string;
  activeTimeCapsuleName?: string;
  allFrames?: AIFrame[];
  cloudSync?: TimeCapsuleCloudSyncState;
}

const defaultCloudSyncState: TimeCapsuleCloudSyncState = {
  isEnabled: false,
  isSynced: true,
  lastSyncedAt: null,
  syncing: false,
  error: null,
  syncNow: async () => {},
};

// Helper function to format relative time
const getRelativeTime = (date: Date | string) => {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diff = now.getTime() - targetDate.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

export function AIFlowBuilderPanel({
  flowBuilder,
  onAcceptFrames,
  isOpen,
  onToggle,
  workspaceStats,
  knowledgeBaseUnavailable = false,
  knowledgeBaseUnavailableMessage,
  onGraphReset,
  activeTimeCapsuleId,
  activeTimeCapsuleName,
  allFrames = [],
  cloudSync,
}: AIFlowBuilderPanelProps) {
  const cloudSyncState = cloudSync ?? defaultCloudSyncState;
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
    // Session Management
    activeSessionId,
    sessions,
    createNewSession,
    saveCurrentSession,
    switchSession,
    renameSession,
    deleteSession,
    duplicateSession,
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
  const [clearLogsDialogOpen, setClearLogsDialogOpen] = useState(false);
  const [deleteSessionDialogOpen, setDeleteSessionDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<{ id: string; name: string } | null>(null);

  const {
    credits,
    loading: creditsLoading,
    error: creditsError,
    refresh: refreshCredits,
  } = useTimeCapsuleCredits();
  const [shareSaving, setShareSaving] = useState(false);
  const [inviteSaving, setInviteSaving] = useState(false);
  const [inviteInput, setInviteInput] = useState("");
  const [shareError, setShareError] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [shareLinkCopyState, setShareLinkCopyState] = useState<"idle" | "copied">("idle");
  
  // Ref for click-outside detection
  const panelRef = useRef<HTMLDivElement>(null);
  const downloadInProgressRef = useRef(false); // Prevent closing during downloads
  
  // Auto-download JSON frames preference (default: true)
  const [autoDownloadFrames, setAutoDownloadFrames] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai-flow-auto-download');
      return saved !== null ? saved === 'true' : true; // Default to true
    }
    return true;
  });
  
  // Update localStorage when preference changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-flow-auto-download', String(autoDownloadFrames));
    }
  }, [autoDownloadFrames]);
  
  const buildEnv = getBuildEnv();
  const localBridgeAvailable = isLocalBuildEnv();
  const localBridgeActive = aiProviders.activeProvider === "local-bridge";

  const openRouterState = aiProviders.openrouter.connectionState;
  const openRouterModels = aiProviders.openrouter.modelOptions;
  const managedOpenRouter = openRouterState.managedProvider;

  const frameSetId = useMemo(() => {
    const serverId =
      typeof credits?.sharing?.frameSetId === "string"
        ? credits.sharing.frameSetId.trim()
        : "";
    if (serverId) return serverId;
    if (activeTimeCapsuleId) return activeTimeCapsuleId;
    return null;
  }, [credits?.sharing?.frameSetId, activeTimeCapsuleId]);

  const frameVersion = useMemo(() => {
    const serverVersion =
      typeof credits?.sharing?.frameVersion === "string"
        ? credits.sharing.frameVersion.trim()
        : "";
    return serverVersion || TIMECAPSULE_VERSION;
  }, [credits?.sharing?.frameVersion]);

  const sharingDisabled = !frameSetId;
  const isCloudBuild = buildEnv === "cloud";
  const shareLockedBySync = cloudSyncState.isEnabled && !cloudSyncState.isSynced;
  const shareAvailable = !sharingDisabled && !shareLockedBySync;

  const shareLink = useMemo(() => {
    if (
      typeof window === "undefined" ||
      !credits?.sharing?.shareToken ||
      !credits.sharing.isLinkEnabled
    ) {
      return "";
    }
    return `${window.location.origin}/timecapsule/${credits.sharing.shareToken}`;
  }, [credits?.sharing?.shareToken, credits?.sharing?.isLinkEnabled]);

  const pendingInviteList = useMemo(
    () => Object.keys(credits?.sharing?.pendingInviteTokens || {}),
    [credits?.sharing?.pendingInviteTokens]
  );
  const activeCollaboratorCount =
    (credits?.sharing?.allowedEmails?.length ?? 0) + pendingInviteList.length;
  const hasActiveShare =
    Boolean(credits?.sharing?.isLinkEnabled) || activeCollaboratorCount > 0;

  const handleShareToggle = useCallback(
    async (enabled: boolean) => {
      if (!frameSetId) {
        setShareError("Select a TimeCapsule project before updating sharing.");
        return;
      }
      if (shareLockedBySync) {
        setShareError("Sync this TimeCapsule to the cloud before updating sharing.");
        return;
      }
      setShareSaving(true);
      setShareError(null);
      try {
        const response = await fetch("/api/aiframes/share", {
          method: enabled ? "POST" : "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            frameSetId,
              frameVersion,
              version: frameVersion,
            enable: enabled,
            timeCapsuleName: activeTimeCapsuleName,
          }),
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || "Failed to update sharing settings");
        }
        await refreshCredits();
      } catch (error) {
        setShareError(
          error instanceof Error ? error.message : "Failed to update sharing settings"
        );
      } finally {
        setShareSaving(false);
      }
    },
    [
      frameSetId,
      frameVersion,
      activeTimeCapsuleName,
      refreshCredits,
      shareLockedBySync,
    ]
  );

  const handleAddInvite = useCallback(async () => {
    if (!inviteInput.trim()) return;
    if (!frameSetId) {
      setInviteError("Select a TimeCapsule project before sending invites.");
      return;
    }
    if (shareLockedBySync) {
      setInviteError("Sync this TimeCapsule to the cloud before sending invites.");
      return;
    }
    setInviteSaving(true);
    setInviteError(null);
    try {
      const response = await fetch("/api/aiframes/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frameSetId,
          frameVersion,
          version: frameVersion,
          emails: [inviteInput.trim()],
          timeCapsuleName: activeTimeCapsuleName,
        }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Failed to send invite");
      }
      setInviteInput("");
      await refreshCredits();
    } catch (error) {
      setInviteError(
        error instanceof Error ? error.message : "Failed to send invite"
      );
    } finally {
      setInviteSaving(false);
    }
  }, [
    inviteInput,
    frameSetId,
    frameVersion,
    activeTimeCapsuleName,
    refreshCredits,
    shareLockedBySync,
  ]);

  const handleRemoveInvite = useCallback(
    async (email: string) => {
      if (!frameSetId) {
        setInviteError("Select a TimeCapsule project before removing invites.");
        return;
      }
      if (shareLockedBySync) {
        setInviteError("Sync this TimeCapsule to the cloud before updating collaborators.");
        return;
      }
      setInviteSaving(true);
      setInviteError(null);
      try {
        const response = await fetch("/api/aiframes/invite", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            frameSetId,
            frameVersion,
            version: frameVersion,
            emails: [email],
          }),
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || "Failed to remove invite");
        }
        await refreshCredits();
      } catch (error) {
        setInviteError(
          error instanceof Error ? error.message : "Failed to remove invite"
        );
      } finally {
        setInviteSaving(false);
      }
    },
    [
      frameSetId,
      frameVersion,
      activeTimeCapsuleName,
      refreshCredits,
      shareLockedBySync,
    ]
  );

  const handleCopyShareLink = useCallback(async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setShareLinkCopyState("copied");
      setTimeout(() => setShareLinkCopyState("idle"), 1200);
    } catch (error) {
      setShareError(
        error instanceof Error ? error.message : "Failed to copy link"
      );
    }
  }, [shareLink]);
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

  // Click-outside detection to close panel
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if download in progress
      if (downloadInProgressRef.current) {
        return;
      }
      
      const target = event.target as HTMLElement;
      
      // Don't close if clicking on the panel itself
      if (panelRef.current && panelRef.current.contains(target)) {
        return;
      }
      
      // Don't close if clicking on the "Open Flow Builder" button
      const isOpenButton = target.closest('button')?.textContent?.includes('Open Flow Builder');
      if (isOpenButton) {
        return;
      }
      
      // Don't close if clicking on any portal-rendered components (dropdowns, dialogs, popovers, etc.)
      const isPortalContent = 
        target.closest('[role="listbox"]') ||           // Select dropdown menus
        target.closest('[role="dialog"]') ||            // Dialog/Modal components
        target.closest('[role="menu"]') ||              // Context menus
        target.closest('[role="tooltip"]') ||           // Tooltips
        target.closest('[data-radix-select-content]') || // Radix Select content
        target.closest('[data-radix-dialog-content]') || // Radix Dialog content
        target.closest('[data-radix-popper-content-wrapper]') || // Radix Popper wrapper
        target.closest('[data-radix-portal]') ||        // Any Radix portal
        target.closest('.radix-portal');                // Radix portal class fallback
        
      if (isPortalContent) {
        return;
      }
      
      // Close panel when clicking outside
      onToggle();
    };

    // Add event listener with slight delay to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

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

// 🔥 FIX: aiProviders is now memoized upstream, so callbacks can use it directly
const handleProviderChange = useCallback((value: string) => {
  aiProviders.setActiveProvider(
    value as "openrouter" | "ollama" | "local-bridge"
  );
}, [aiProviders]);

const handlePlannerModelChange = useCallback((value: string) => {
  aiProviders.openrouter.updateModelSelection("planner", value);
}, [aiProviders]);

const handleGeneratorModelChange = useCallback((value: string) => {
  aiProviders.openrouter.updateModelSelection("generator", value);
}, [aiProviders]);

const handleVisionModelChange = useCallback((value: string) => {
  aiProviders.openrouter.updateModelSelection("vision", value);
}, [aiProviders]);

const handleFallbackModelChange = useCallback((value: string) => {
  aiProviders.openrouter.updateModelSelection("fallback", value);
}, [aiProviders]);

const modelChangeHandlers = useMemo(() => ({
  planner: handlePlannerModelChange,
  generator: handleGeneratorModelChange,
  vision: handleVisionModelChange,
  fallback: handleFallbackModelChange,
}), [handlePlannerModelChange, handleGeneratorModelChange, handleVisionModelChange, handleFallbackModelChange]);

// 🧪 TEST PATH ONLY: Does NOT use agent pipeline
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
      onAcceptFrames(accepted, plan?.chapters);
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
    // Set flag to prevent panel closure during download
    downloadInProgressRef.current = true;
    
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    
    // Clear flag after download completes
    setTimeout(() => {
      downloadInProgressRef.current = false;
    }, 500);
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop/overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        aria-hidden="true"
      />
      
      {/* Panel */}
      <div 
        ref={panelRef}
        className="fixed top-24 right-6 z-50 w-full max-w-5xl pointer-events-auto"
      >
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
                  Design AI learning flows, auto-build frames from your Knowledge Base, and sync progress to your graph with built-in checkpoints.
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
            {knowledgeBaseUnavailable && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-900">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 mt-0.5 text-red-600" />
                  <div>
                    <AlertTitle className="text-red-900">KB unavailable</AlertTitle>
                    <AlertDescription className="text-red-800">
                      Knowledge Base grounding is temporarily offline. Flow Builder will still run,
                      but generations may not reference your stored documents.
                      {knowledgeBaseUnavailableMessage && (
                        <span className="block mt-1 text-red-700">
                          Details: {knowledgeBaseUnavailableMessage}
                        </span>
                      )}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
            <section className={`grid gap-4 ${aiProviders.activeProvider === 'local-bridge' || aiProviders.activeProvider === 'ollama' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
              {!isCloudBuild && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium">
                    Action Provider (default: TimeCapsule credits)
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
                      TimeCapsule Credits
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
                
                {/* Auto-download toggle - only for OpenRouter */}
                {aiProviders.activeProvider === 'openrouter' && (
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 flex items-center gap-2">
                        <DownloadIcon className="h-4 w-4" />
                        Auto-download frames as JSON
                      </span>
                      <Switch
                        checked={autoDownloadFrames}
                        onCheckedChange={(checked) => setAutoDownloadFrames(checked)}
                      />
                    </div>
                  </div>
                )}
              </div>
              )}

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    TimeCapsule credits
                  </Label>
                  {credits?.tier && (
                    <Badge variant="outline" className="text-xs capitalize text-slate-600">
                      {credits.tier}
                    </Badge>
                  )}
                </div>
                {creditsLoading ? (
                  <p className="text-sm text-slate-500">Loading credit balances…</p>
                ) : credits ? (
                  <div className="space-y-3">
                    {[
                      {
                        key: "sessions",
                        label: "AI Frame sessions",
                        limit: credits.limits.sessions,
                        used: credits.usage.sessions,
                      },
                      {
                        key: "flowBuilders",
                        label: "Flow Builder prompts",
                        limit: credits.limits.flowBuilders,
                        used: credits.usage.flowBuilders,
                      },
                      {
                        key: "agentCalls",
                        label: "Agent calls",
                        limit: credits.limits.agentCalls,
                        used: credits.usage.agentCalls,
                      },
                    ].map((item) => {
                      const remaining = Math.max(item.limit - item.used, 0);
                      const percentage =
                        item.limit > 0
                          ? Math.min(100, (item.used / item.limit) * 100)
                          : 0;
                      return (
                        <div key={item.key} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="text-slate-600 font-medium">
                              {item.label}
                            </span>
                            <span>
                              {remaining}/{item.limit} left
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                    <p className="text-xs text-slate-500">
                      Renews{" "}
                      {new Date(credits.renewsAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-red-500">
                    {creditsError || "Unable to load credit balances"}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Share TimeCapsule plan
                  </Label>
                  <div className="flex items-center gap-2">
                    {hasActiveShare && (
                      <Badge variant="secondary" className="text-xs text-emerald-700">
                        {credits?.sharing?.isLinkEnabled
                          ? "Link active"
                          : "Collaborators active"}
                      </Badge>
                    )}
                    <Badge
                      variant={credits?.limits.maxInvitees ? "outline" : "secondary"}
                      className="text-xs"
                    >
                      {credits?.limits.maxInvitees ? "Pro feature" : "Upgrade to use"}
                    </Badge>
                  </div>
                </div>
                {creditsLoading ? (
                  <p className="text-sm text-slate-500">Loading sharing settings…</p>
                ) : credits?.limits.maxInvitees ? (
                  sharingDisabled ? (
                    <p className="text-sm text-slate-500">
                      Select or create a TimeCapsule project to enable sharing controls,
                      then refresh this panel so we can fetch its server metadata.
                    </p>
                  ) : (
                    <>
                      {cloudSyncState.isEnabled && (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold text-emerald-800">
                            <span>Cloud sync</span>
                            <span>
                              {cloudSyncState.syncing
                                ? "Syncing…"
                                : cloudSyncState.lastSyncedAt
                                ? `Last synced ${getRelativeTime(
                                    cloudSyncState.lastSyncedAt
                                  )}`
                                : "Not synced yet"}
                            </span>
                          </div>
                          {cloudSyncState.error && (
                            <p className="text-xs text-red-600">
                              {cloudSyncState.error}
                            </p>
                          )}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => cloudSyncState.syncNow()}
                              disabled={cloudSyncState.syncing}
                            >
                              {cloudSyncState.syncing ? (
                                <>
                                  <Loader2 className="h-3 w-3 animate-spin mr-2" />
                                  Syncing…
                                </>
                              ) : (
                                "Sync now"
                              )}
                            </Button>
                            {shareLockedBySync && (
                              <span className="text-[11px] text-amber-700">
                                Sync to cloud before sharing.
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 flex items-center gap-2">
                          Public link
                          {shareSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                        </span>
                        <Switch
                          checked={Boolean(credits?.sharing?.isLinkEnabled)}
                          onCheckedChange={handleShareToggle}
                          disabled={!shareAvailable || shareSaving}
                        />
                      </div>
                      {shareLink && (
                        <div className="flex gap-2">
                          <Input
                            readOnly
                            value={shareLink}
                            className="bg-white border-slate-300"
                          />
                          <Button
                            variant="secondary"
                            onClick={handleCopyShareLink}
                            disabled={!shareLink}
                          >
                            {shareLinkCopyState === "copied" ? "Copied" : "Copy"}
                          </Button>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500">
                        Target TimeCapsule{" "}
                        <span className="font-semibold">
                          {activeTimeCapsuleName || "Untitled project"}
                        </span>{" "}
                        · ID{" "}
                        <span className="font-mono text-slate-700">{frameSetId}</span> ·
                        Version <span className="font-mono text-slate-700">{frameVersion}</span>
                      </p>
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-600 font-semibold">
                          Invite by email (up to {credits.limits.maxInvitees} collaborators)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            type="email"
                            placeholder="teammate@example.com"
                            value={inviteInput}
                            onChange={(event) => setInviteInput(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                handleAddInvite();
                              }
                            }}
                            className="bg-white border-slate-300"
                            disabled={!shareAvailable || inviteSaving}
                          />
                          <Button
                            variant="secondary"
                            onClick={handleAddInvite}
                            disabled={
                              !shareAvailable || !inviteInput.trim() || inviteSaving
                            }
                          >
                            {inviteSaving ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Sending
                              </>
                            ) : (
                              "Invite"
                            )}
                          </Button>
                        </div>
                        {inviteError && (
                          <p className="text-xs text-red-500">{inviteError}</p>
                        )}
                        {shareError && (
                          <p className="text-xs text-red-500">{shareError}</p>
                        )}
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-slate-600">
                            Collaborators
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {credits?.sharing?.allowedEmails?.map((email) => (
                              <Badge
                                key={email}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {email}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveInvite(email)}
                                  className="text-xs text-slate-600 hover:text-slate-900"
                                  aria-label={`Remove ${email}`}
                                  disabled={!shareAvailable || inviteSaving}
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                            {pendingInviteList.map((email) => (
                              <Badge
                                key={`pending-${email}`}
                                variant="outline"
                                className="text-xs text-amber-700 border-amber-200 bg-amber-50"
                              >
                                {email} · awaiting signup
                              </Badge>
                            ))}
                            {activeCollaboratorCount === 0 && (
                              <p className="text-xs text-slate-500">
                                No collaborators yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  <p className="text-sm text-slate-500">
                    Sharing and email invites unlock on the Pro plan.
                  </p>
                )}
              </div>

              {localBridgeActive && (
                <div className={`p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 ${aiProviders.activeProvider === 'local-bridge' ? 'lg:col-span-2' : ''}`}>
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

              {/* Hide OpenRouter card when managed by TimeCapsule */}
              {managedOpenRouter ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-emerald-900 font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      TimeCapsule credits
                    </Label>
                    <Badge variant="outline" className="text-xs text-emerald-800">
                      TimeCapsule credits
                    </Badge>
                  </div>
                  <p className="text-sm text-emerald-900">
                    TimeCapsule provides easy access to AI so you don’t need a personal API key. Usage draws from your monthly agent-call credits.
                  </p>
                  <p className="text-xs text-emerald-800">
                    Remaining agent calls:{" "}
                    {credits
                      ? `${credits.remaining.agentCalls}/${credits.limits.agentCalls}`
                      : "—"}
                  </p>
                </div>
              ) : (
                !isCloudBuild &&
                aiProviders.activeProvider !== "local-bridge" &&
                aiProviders.activeProvider !== "ollama" && (
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
                            onValueChange={modelChangeHandlers[tier]}
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
                )
              )}

              {/* Hide Firecrawl card when Local SWE Bridge is active */}
              {!isCloudBuild && aiProviders.activeProvider !== "local-bridge" && (
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
                  {firecrawl.firecrawlState.error && (
                    <p className="text-xs text-red-500">
                      {firecrawl.firecrawlState.error}
                    </p>
                  )}
                </div>
              )}
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

            <section id="flow-sessions-section" className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-slate-900 font-semibold">Flow Builder Sessions</h4>
                  <p className="text-sm text-slate-500">
                    Manage all your frame creation sessions (AI Flow, SWE Bridge, Manual)
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => createNewSession("manual", undefined, onGraphReset, {
                      skipClear: false, // CRITICAL FIX (Issue 13): Clear graph for manual session creation
                      timeCapsuleId: activeTimeCapsuleId || undefined
                    })}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    New Session
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-auto">
                {sessions.length === 0 ? (
                  <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center bg-slate-50">
                    <Bot className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 font-medium">No sessions yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Create a manual session or run AI Flow Builder to get started
                    </p>
                  </div>
                ) : (
                  sessions.map((session) => {
                    const isActive = session.id === activeSessionId;
                    
                    // Determine session type styling
                    const sessionTypeConfig = {
                      "manual": {
                        icon: Edit,
                        color: "blue",
                        borderColor: "border-blue-400",
                        bgColor: "bg-blue-50",
                        iconColor: "text-blue-600",
                      },
                      "ai-flow": {
                        icon: Bot,
                        color: "purple",
                        borderColor: "border-purple-400",
                        bgColor: "bg-purple-50",
                        iconColor: "text-purple-600",
                      },
                      "swe-bridge": {
                        icon: Plug,
                        color: "teal",
                        borderColor: "border-teal-400",
                        bgColor: "bg-teal-50",
                        iconColor: "text-teal-600",
                      },
                    };
                    
                    const config = sessionTypeConfig[session.source as keyof typeof sessionTypeConfig] || sessionTypeConfig["manual"];
                    const SourceIcon = config.icon;
                    
                    const sourceBadges = [];
                    if (session.frameSources.manual > 0) sourceBadges.push("Manual");
                    if (session.frameSources["ai-flow"] > 0) sourceBadges.push("AI");
                    if (session.frameSources["swe-bridge"] > 0) sourceBadges.push("SWE");
                    
                    // Calculate actual frame count from allFrames
                    const actualFrameCount = allFrames.filter(f => f.sessionId === session.id).length;
                    
                    return (
                      <div
                        key={session.id}
                        className={`group relative rounded-xl border-l-4 p-4 flex flex-col gap-3 transition-all shadow-sm hover:shadow-md ${
                          isActive
                            ? `${config.borderColor} ${config.bgColor} border-r border-t border-b ${config.borderColor}`
                            : "border-l-slate-300 border-r border-t border-b border-slate-200 bg-white hover:border-l-slate-400"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                                <SourceIcon className={`h-4 w-4 ${config.iconColor}`} />
                              </div>
                              <div className="relative flex-1 flex items-center gap-1 group/input">
                                <input
                                  type="text"
                                  value={session.name}
                                  onChange={(e) => renameSession(session.id, e.target.value)}
                                  className={`font-semibold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-${config.color}-500 outline-none transition-colors flex-1 min-w-0 pb-0.5`}
                                  placeholder="Session name..."
                                />
                                <Edit className="h-3 w-3 text-slate-400 opacity-0 group-hover/input:opacity-100 transition-opacity" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <span>{getRelativeTime(session.updatedAt)}</span>
                                <span className="text-slate-300">•</span>
                                <div className="flex items-center gap-1">
                                  <Layers className="h-3 w-3" />
                                  <span className="font-medium text-slate-700">{actualFrameCount}</span>
                                  <span>frames</span>
                                </div>
                              </div>
                              {sourceBadges.length > 0 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0">
                                  {sourceBadges.join(" + ")}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            {isActive && (
                              <Badge className="bg-emerald-500 text-white text-xs">Active</Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                session.status === "completed"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : session.status === "generating"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-slate-50 text-slate-600 border-slate-200"
                              }`}
                            >
                              {session.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {!isActive && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => switchSession(session.id, onGraphReset)}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              Load Session
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => duplicateSession(session.id, onGraphReset)}
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Duplicate
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setSessionToDelete({ id: session.id, name: session.name });
                              setDeleteSessionDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Legacy Flow History (kept for logs) */}
              {historySessions.length > 0 && (
                <details className="mt-4">
                  <summary className="text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 flex items-center justify-between">
                    <span>Legacy Flow Logs ({historySessions.length})</span>
                  </summary>
                  <div className="mt-2 space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => setClearLogsDialogOpen(true)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Clear All Legacy Logs
                    </Button>
                    <div className="space-y-2 max-h-40 overflow-auto">
                    {historySessions.map((session) => (
                      <div
                        key={session.id}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-xs"
                      >
                        <p className="font-medium text-slate-800 truncate">
                          {session.prompt}
                        </p>
                        <p className="text-slate-500">
                          {new Date(session.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    </div>
                  </div>
                </details>
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
                  {/* Accept All Button */}
                  {frameDrafts.some((draft) => draft.status === "generated") && (
                    <div className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-emerald-200 bg-emerald-50">
                      <div>
                        <p className="font-semibold text-slate-900">
                          Ready to accept {frameDrafts.filter((d) => d.status === "generated").length} generated frames
                        </p>
                        <p className="text-xs text-slate-600">
                          Accept all frames at once or review them individually below
                        </p>
                      </div>
                      <Button
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={handleAcceptAll}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept All Frames
                      </Button>
                    </div>
                  )}

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
                        <Accordion type="multiple" className="space-y-3">
                          {chapterFrames.map((draft, index) => {
                            const displayOrder =
                              typeof draft.order === "number"
                                ? draft.order + 1
                                : index + 1;
                            return (
                              <AccordionItem
                                key={draft.tempId}
                                value={draft.tempId}
                                className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden"
                              >
                                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-100">
                                  <div className="flex items-start justify-between gap-4 w-full">
                                    <div className="text-left">
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
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4 space-y-3">
                                  <div className="text-sm text-slate-600 space-y-3">
                                    {draft.generated ? (
                                      <>
                                        {/* Full Information Text */}
                                        <div className="p-3 bg-white rounded-lg border border-slate-200">
                                          <p className="font-semibold text-slate-900 mb-2">Learning Content:</p>
                                          <div className="text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                                            {draft.generated.informationText}
                                          </div>
                                        </div>

                                        {/* AI Concepts */}
                                        <div>
                                          <p className="font-semibold text-slate-900 mb-2 text-xs">Key Concepts:</p>
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
                                        </div>

                                        {/* Checkpoint Quiz Preview */}
                                        {draft.generated.checkpointQuiz && (
                                          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                                            <p className="font-semibold text-slate-900 mb-2 text-sm flex items-center gap-2">
                                              <Brain className="h-4 w-4 text-amber-600" />
                                              Checkpoint Quiz (for learners):
                                            </p>
                                            <div className="space-y-2 text-xs">
                                              {draft.generated.checkpointQuiz.questions.map((q, qIdx) => (
                                                <div key={qIdx} className="p-2 bg-white rounded border border-amber-100">
                                                  <p className="font-medium text-slate-800 mb-1">
                                                    Q{qIdx + 1}: {q.prompt}
                                                  </p>
                                                  <p className="text-slate-500 italic">
                                                    Type: {q.type}
                                                    {q.choices && ` (${q.choices.length} options)`}
                                                  </p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
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

                                  {/* Action Buttons */}
                                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200">
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
                                          onClick={() => handleAcceptFrame(draft.tempId)}
                                          title="Accept this frame and add it to your workspace"
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
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
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
      
      {/* Clear Legacy Logs Confirmation Dialog */}
      <Dialog open={clearLogsDialogOpen} onOpenChange={setClearLogsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>localhost:3000 says</DialogTitle>
          </DialogHeader>
          <DialogDescription className="py-4">
            Clear all {historySessions.length} legacy flow logs? This cannot be undone.
          </DialogDescription>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setClearLogsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                historyActions.clearSessions();
                setClearLogsDialogOpen(false);
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Session Confirmation Dialog */}
      <Dialog open={deleteSessionDialogOpen} onOpenChange={setDeleteSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <DialogTitle className="text-xl font-semibold">Delete Session?</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-slate-600 pt-2">
              This action cannot be undone. This will permanently delete the session and all associated data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Session Info */}
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                Session to Delete
              </p>
              <p className="text-base font-semibold text-slate-900 break-words mb-2">
                {sessionToDelete?.name}
              </p>
              {(() => {
                const frameCount = sessionToDelete 
                  ? allFrames.filter(f => f.sessionId === sessionToDelete.id).length 
                  : 0;
                return (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Layers className="h-4 w-4" />
                    <span className="font-medium">{frameCount} frames</span>
                    <span className="text-slate-400">•</span>
                    <span>will be deleted</span>
                  </div>
                );
              })()}
            </div>

            {/* Warning Message */}
            {(() => {
              const frameCount = sessionToDelete 
                ? allFrames.filter(f => f.sessionId === sessionToDelete.id).length 
                : 0;
              return frameCount > 0 && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Warning: Frame Data Loss</p>
                    <p className="text-xs mt-1">
                      All {frameCount} frame{frameCount !== 1 ? 's' : ''} in this session will be permanently deleted.
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteSessionDialogOpen(false);
                setSessionToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (sessionToDelete) {
                  deleteSession(sessionToDelete.id);
                  setDeleteSessionDialogOpen(false);
                  setSessionToDelete(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
