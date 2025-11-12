"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VectorStoreInitModal from "@/components/VectorStoreInitModal";
import {
  Network,
  Layers,
  Edit3,
  Target,
  Plus,
  Database,
  MessageCircle,
  Bot,
  Eye,
  Settings,
  RefreshCcw,
  Save,
  BookOpen,
  Upload,
  FileText,
  Package,
  Search,
  Download,
  Trash2,
  X,
  Loader2,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Import VectorStore and providers
import { VectorStore } from "../../components/VectorStore/VectorStore";
import { useVectorStore } from "../../components/providers/VectorStoreProvider";
import { usePageAnalytics } from "@/components/analytics/Analytics";
import { useDocuments } from "@/components/DeepResearch/hooks/useDocuments";

// Import Graph Integration (keeping in src/components/ai-graphs)
import { FrameGraphIntegration } from "@/components/ai-graphs";

// Import Metadata Management
import { BubblSpaceDialog } from "@/components/ui/bubblspace-dialog";
import { TimeCapsuleDialog } from "@/components/ui/timecapsule-dialog";
import { SafeImportDialog } from "@/components/ui/safe-import-dialog";
import { ChapterDialog } from "@/components/ai-graphs/chapter-dialog";
import { KnowledgeBaseSection } from "@/components/ui/knowledge-base-section";
import { AIFlowBuilderPanel } from "./components/AIFlowBuilderPanel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getMetadataManager, MetadataManager } from "@/lib/MetadataManager";
import {
  getGraphStorageManager,
  GraphStorageManager,
} from "@/lib/GraphStorageManager";
import {
  BubblSpace,
  TimeCapsuleMetadata,
  EnhancedTimeCapsule,
  ImportOptions,
  ImportResult,
  MetadataUtils,
} from "@/types/timecapsule";
import { debugFrames, debugStorage, debugSync } from "@/lib/debugUtils";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "@/components/ui/sign-in";

// Import NEW MODULAR COMPONENTS
import {
  AIFrame,
  GraphState,
  generateFrameId,
  loadFramesFromKnowledgeBase,
  getTimeCapsuleCombinedData,
  setTimeCapsuleCombinedData,
  DEFAULT_FRAME,
  exportFramesToJson,
  importFramesFromJson,
} from "./index";
import type { Chapter } from "./types/frames";

// UNIFIED: Replace old fragmented storage with unified system
import { useUnifiedStorage } from "./hooks/useUnifiedStorage";
import { useAIFlowBuilder } from "./hooks/useAIFlowBuilder";
import type { UnifiedAIFrame } from "./lib/unifiedStorage";
import { ChunkViewerModal } from "@/components/shared/ChunkViewerModal";

declare global {
  interface Window {
    __NEXT_BUILD_ENV__?: string;
  }
}

const resolveBuildEnv = (): string => {
  if (typeof window !== "undefined" && window.__NEXT_BUILD_ENV__) {
    return window.__NEXT_BUILD_ENV__;
  }
  if (process.env.NEXT_PUBLIC_BUILD_ENV) {
    return process.env.NEXT_PUBLIC_BUILD_ENV;
  }
  if (process.env.NEXT_BUILD_ENV) {
    return process.env.NEXT_BUILD_ENV;
  }
  return "local";
};

interface FrameCreationData {
  goal: string;
  videoUrl: string;
  startTime?: number;
  duration?: number;
  contentType?: "video" | "pdf" | "text";
  title?: string;
  pdfUrl?: string;
  pdfPages?: string;
  pdfNotes?: string;
  textContent?: string;
  textNotes?: string;
}

interface CreateFrameOptions {
  title?: string;
  goal?: string;
  chapterId?: string;
  selectFrame?: boolean;
}

const DEFAULT_CHAPTER_COLOR = "#3B82F6";
const EMPTY_CHAPTER_FORM: {
  title: string;
  description: string;
  color: string;
  conceptIds: string[];
  linkSequentially: boolean;
} = {
  title: "",
  description: "",
  color: DEFAULT_CHAPTER_COLOR,
  conceptIds: [],
  linkSequentially: false,
};

// Main component with dramatically reduced size
export default function AIFramesPage() {
  // ============================================================================
  // CRITICAL: ALL HOOKS MUST BE CALLED AT THE TOP LEVEL
  // No conditional logic, early returns, or loops before all hooks are called
  // ============================================================================

  // Authentication hooks
  const { data: session, status } = useSession();
  const router = useRouter();
  const buildEnv = resolveBuildEnv();
  const requireAuth = buildEnv === "cloud";

  // Page analytics (must be called before any conditional returns)
  const pageAnalytics = usePageAnalytics("AI-Frames", "learning");

  // VectorStore hooks (must be called consistently)
  const {
    vectorStore: providerVectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    error: vectorStoreError,
    processingAvailable,
    processingStatus,
  } = useVectorStore();

  // Documents hook for file upload handling
  const documentsHook = useDocuments(providerVectorStore);

  // Essential state hooks
  const [isCreationMode, setIsCreationMode] = useState(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // UNIFIED: Replace old fragmented storage with unified system
  const unifiedStorage = useUnifiedStorage({
    vectorStore: providerVectorStore,
    vectorStoreInitialized,
  });

  const dispatchForceSave = useCallback(
    (reason: string) => {
      if (typeof window === "undefined") {
        return;
      }

      window.dispatchEvent(
        new CustomEvent("force-save-frames", {
          detail: {
            reason,
            timestamp: Date.now(),
            graphState: unifiedStorage.graphState,
          },
        })
      );
    },
    [unifiedStorage.graphState]
  );

  const broadcastChapterGraphSync = useCallback(
    (chapter: Chapter, frameIds: string[]) => {
      if (typeof window === "undefined" || !chapter?.id) {
        return;
      }

      // Defer to next tick so we don't mutate graph state during render
      const detail = {
        chapterId: chapter.id,
        frameIds,
        chapter: {
          id: chapter.id,
          title: chapter.title,
          description: chapter.description,
          color: chapter.color,
          conceptIds: chapter.conceptIds,
          frameIds,
          linkSequentially: chapter.linkSequentially,
          order: chapter.order,
        },
      };

      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("graph-chapter-sync", { detail }));
        window.dispatchEvent(
          new CustomEvent("chapter-frames-updated", {
            detail: {
              chapterId: chapter.id,
              frameIds,
            },
          })
        );
      }, 0);
    },
    []
  );

  const flowBuilder = useAIFlowBuilder({
    vectorStore: providerVectorStore,
    vectorStoreInitialized,
  });
  const [isFlowPanelOpen, setIsFlowPanelOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarManualOverride, setSidebarManualOverride] = useState(false);

  // Graph state management
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Loading state to prevent multiple concurrent KB loading calls
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);

  // Dialog states
  const [showVectorStoreInitModal, setShowVectorStoreInitModal] =
    useState(false);
  const [showBubblSpaceDialog, setShowBubblSpaceDialog] = useState(false);
  const [showTimeCapsuleDialog, setShowTimeCapsuleDialog] = useState(false);
  const [showSafeImportDialog, setShowSafeImportDialog] = useState(false);
  const [showChapterDialog, setShowChapterDialog] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterFormData, setChapterFormData] = useState(() => ({
    ...EMPTY_CHAPTER_FORM,
  }));
  const [selectedChapterFrameIds, setSelectedChapterFrameIds] = useState<string[]>([]);
  const [pendingChapterFrames, setPendingChapterFrames] = useState<Record<string, AIFrame>>({});
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [documentManagerTab, setDocumentManagerTab] = useState("user");
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");
  const [semanticSearchResults, setSemanticSearchResults] = useState<any[]>([]);
  const [currentSemanticQuery, setCurrentSemanticQuery] = useState("");
  const [showSemanticResults, setShowSemanticResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchThreshold, setSearchThreshold] = useState(0.1);
  const [currentChunk, setCurrentChunk] = useState<any>(null);
  const [showChunkView, setShowChunkView] = useState(false);
  const [chunkViewerDocument, setChunkViewerDocument] = useState<any | null>(null);
  const [chunkViewerChunks, setChunkViewerChunks] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [graphResetKey, setGraphResetKey] = useState(0);
  const [showChapterProcessing, setShowChapterProcessing] = useState(false);
  const chapterProcessingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const vectorStoreReady =
    vectorStoreInitialized &&
    !vectorStoreInitializing &&
    providerVectorStore?.initialized !== false;

  // Ref hooks
  const metadataManagerRef = useRef<MetadataManager | null>(null);
  const graphStorageManagerRef = useRef<GraphStorageManager | null>(null);

  // ============================================================================
  // ALL EFFECT HOOKS - Must be called consistently on every render
  // ============================================================================

  // Authentication redirect effect
  useEffect(() => {
    if (!requireAuth) return;
    if (status === "loading") return; // Still loading

    if (!session) {
      const currentUrl = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      router.push(`/auth/signin?callbackUrl=${currentUrl}`);
    }
  }, [requireAuth, session, status, router]);

  // Initialize managers
  useEffect(() => {
    const initializeManagers = async () => {
      if (providerVectorStore && vectorStoreInitialized) {
        try {
          metadataManagerRef.current = getMetadataManager(providerVectorStore);
          graphStorageManagerRef.current =
            await getGraphStorageManager(providerVectorStore);
          console.log("✅ Managers initialized successfully");
        } catch (error) {
          console.error("❌ Failed to initialize managers:", error);
          // Don't crash the page, just log the error
          // The app can still function without GraphStorageManager
        }
      }
    };

    initializeManagers();
  }, [providerVectorStore, vectorStoreInitialized]);

  useEffect(() => {
    setPendingChapterFrames((prev) => {
      if (!prev || Object.keys(prev).length === 0) {
        return prev;
      }

      const existingIds = new Set(unifiedStorage.frames.map((frame) => frame.id));
      let changed = false;
      const next: Record<string, AIFrame> = {};

      Object.entries(prev).forEach(([id, frame]) => {
        if (existingIds.has(id)) {
          changed = true;
          return;
        }
        next[id] = frame;
      });

      return changed ? next : prev;
    });
  }, [unifiedStorage.frames]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleSaveSuccess = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.background && showChapterProcessing) {
        if (chapterProcessingTimeoutRef.current) {
          clearTimeout(chapterProcessingTimeoutRef.current);
          chapterProcessingTimeoutRef.current = null;
        }
        setShowChapterProcessing(false);
      }
    };

    window.addEventListener("unified-save-success", handleSaveSuccess as EventListener);

    return () => {
      window.removeEventListener("unified-save-success", handleSaveSuccess as EventListener);
      if (chapterProcessingTimeoutRef.current) {
        clearTimeout(chapterProcessingTimeoutRef.current);
        chapterProcessingTimeoutRef.current = null;
      }
    };
  }, [showChapterProcessing]);

  // FIXED: Enhanced VectorStore modal management for stability
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (vectorStoreInitializing && !vectorStoreReady && !showVectorStoreInitModal) {
      setShowVectorStoreInitModal(true);
    }

    if (vectorStoreReady && showVectorStoreInitModal) {
      timeoutId = setTimeout(() => {
        setShowVectorStoreInitModal(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [vectorStoreInitializing, vectorStoreReady]);

  // CRITICAL FIX: Simplified, reliable loading logic
  useEffect(() => {
    const loadInitialData = async () => {
      // Prevent concurrent loading calls only
      if (isLoadingInitialData) return;

      try {
        setIsLoadingInitialData(true);

        console.log("🔄 Loading initial data with unified storage...");

        // UNIFIED: Use single load method
        const success = await unifiedStorage.loadAll();

        if (success) {
          console.log("✅ Unified storage load completed successfully");
        } else {
          console.log("📭 No data found in unified storage");
        }

        console.log("✅ Initial data loading complete");
      } catch (error) {
        console.error("❌ Error loading initial data:", error);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    // Trigger loading on mount
    loadInitialData();
  }, []); // Only run on mount

  // Load documents when VectorStore is ready
  useEffect(() => {
    const loadDocuments = async () => {
      if (!vectorStoreReady || !providerVectorStore) {
        return;
      }

      try {
        const allDocuments = await providerVectorStore.getAllDocuments();
        setDocuments(allDocuments);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("Vector Store not initialized")
        ) {
          console.log("VectorStore still initializing, will retry when ready");
        } else {
          console.error("Failed to load documents:", error);
        }
      }
    };

    loadDocuments();
  }, [vectorStoreReady, providerVectorStore]);

  // CRITICAL FIX: Expose sync methods for FrameGraphIntegration to use (reduced logging frequency)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const aiFramesApp = {
        vectorStore: providerVectorStore,
        vectorStoreInitialized,
        frames: unifiedStorage.frames,
        // UNIFIED: Expose unified storage methods
        saveAll: unifiedStorage.saveAll,
        loadAll: unifiedStorage.loadAll,
        updateFrames: unifiedStorage.updateFrames,
        updateGraphState: unifiedStorage.updateGraphState,
        clearAll: unifiedStorage.clearAll,
        // OPTIMISTIC: Legacy compatibility using optimistic updates (no more blocking!)
        saveFramesToStorage: () => {
          /* Frames auto-save via optimistic updates */
        },
        syncFramesToVectorStore: () => {
          /* VectorStore syncs via background saves */
        },
        syncGraphChangesToKB: () => {
          /* Knowledge Base syncs via background saves */
        },
        loadFramesFromStorage: unifiedStorage.loadAll,
        broadcastFrameChanges: unifiedStorage.updateFrames,
      };

      (window as any).aiFramesApp = aiFramesApp;

      // REDUCED SPAM: Only log when frame count changes or VectorStore state changes
      if (
        (window as any).lastLoggedFrameCount !== aiFramesApp.frames.length ||
        (window as any).lastLoggedVectorStoreState !== vectorStoreInitialized
      ) {
        console.log("🔧 AI-Frames unified storage interface updated:", {
          hasVectorStore: !!aiFramesApp.vectorStore,
          vectorStoreInitialized: aiFramesApp.vectorStoreInitialized,
          frameCount: aiFramesApp.frames.length,
          hasUnifiedMethods: typeof aiFramesApp.saveAll === "function",
        });
        (window as any).lastLoggedFrameCount = aiFramesApp.frames.length;
        (window as any).lastLoggedVectorStoreState = vectorStoreInitialized;
      }
    }
  }, [
    providerVectorStore,
    vectorStoreInitialized,
    unifiedStorage.frames.length,
  ]);

  // ============================================================================
  // ALL CALLBACK HOOKS - Must be called consistently on every render
  // ============================================================================

  // Handle frame clear
  const handleClearFrames = useCallback(async () => {
    try {
      await unifiedStorage.clearAll();
      setCurrentFrameIndex(0);
      setGraphResetKey((prev) => prev + 1);
      setPendingChapterFrames({});
      console.log("🗑️ All frames cleared");
    } catch (error) {
      console.error("❌ Failed to clear AI Frames:", error);
    }
  }, [unifiedStorage]);

  // Handle graph state updates
  const handleGraphStateUpdate = useCallback(
    (graphState: GraphState) => {
      unifiedStorage.updateGraphState(graphState);
    },
    [unifiedStorage]
  );

  // Frame navigation
  const handleFrameNavigation = useCallback(
    (direction: "next" | "prev") => {
      const newIndex =
        direction === "next"
          ? Math.min(currentFrameIndex + 1, unifiedStorage.frames.length - 1)
          : Math.max(currentFrameIndex - 1, 0);

      // CRITICAL LOG: Debug frame index changes
      console.log("🔍 Frame navigation debug:", {
        direction,
        currentIndex: currentFrameIndex,
        newIndex,
        frameCount: unifiedStorage.frames.length,
      });

      setCurrentFrameIndex(newIndex);
    },
    [currentFrameIndex, unifiedStorage.frames.length]
  );

  // Save frames handler
  const handleSaveFrames = useCallback(async (): Promise<boolean> => {
    // OPTIMISTIC: Manual save now triggers background save
    try {
      unifiedStorage.updateFrames(unifiedStorage.frames); // Triggers optimistic save
      return true; // Optimistic saves always succeed immediately
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    }
  }, [unifiedStorage]);

  // Load frames handler
  const handleLoadFrames = useCallback(async (): Promise<boolean> => {
    try {
      const success = await unifiedStorage.loadAll();
      return success;
    } catch (error) {
      console.error("Load failed:", error);
      return false;
    }
  }, [unifiedStorage]);

  const handleSidebarHide = useCallback(() => {
    setSidebarCollapsed(true);
    setSidebarManualOverride(true);
  }, []);

  const handleSidebarShow = useCallback(() => {
    setSidebarCollapsed(false);
    setSidebarManualOverride(true);
  }, []);

  const handleViewModeChange = useCallback(
    (mode: "graph" | "split" | "linear") => {
      if (mode === "linear") {
        setSidebarCollapsed(false);
        setSidebarManualOverride(false);
        return;
      }
      if (mode === "split") {
        if (!sidebarManualOverride) {
          setSidebarCollapsed(true);
        }
        return;
      }
      if (!sidebarManualOverride) {
        setSidebarCollapsed(false);
      }
    },
    [sidebarManualOverride]
  );

  // Handle frames change
  const handleFramesChange = useCallback(
    (newFrames: any[]) => {
      // Convert the frames to ensure they have the correct type and order
      const convertedFrames = newFrames.map((frame) => ({
        ...frame,
        order: frame.order ?? 0,
      }));

      unifiedStorage.updateFrames(convertedFrames);
    },
    [unifiedStorage]
  );

  const handleCreateFrame = useCallback(
    (options: CreateFrameOptions = {}): AIFrame => {
      const { title, goal, chapterId, selectFrame = true } = options;
      const now = new Date().toISOString();
      const existingOrders = unifiedStorage.frames
        .map((frame) => (typeof frame.order === "number" ? frame.order : null))
        .filter((value): value is number => value !== null);
      const nextOrder = existingOrders.length
        ? Math.max(...existingOrders) + 1
        : 1;

      const fallbackIndex = unifiedStorage.frames.length + 1;
      const newFrame: AIFrame = {
        id: generateFrameId(),
        title: title?.trim() || `Untitled Frame ${fallbackIndex}`,
        goal: goal?.trim() || "",
        informationText: "",
        videoUrl: "",
        startTime: 0,
        duration: 0,
        afterVideoText: "",
        aiConcepts: [],
        conceptIds: [],
        isGenerated: false,
        sourceGoal: "",
        sourceUrl: "",
        order: nextOrder,
        bubblSpaceId: undefined,
        timeCapsuleId: undefined,
        parentFrameId: chapterId,
        chapterId,
        type: "frame",
        createdAt: now,
        updatedAt: now,
        attachment: undefined,
        notes: "",
        documents: [],
      };

      const updatedFrames = [...unifiedStorage.frames, newFrame];
      unifiedStorage.updateFrames(updatedFrames);

      if (selectFrame) {
        const newIndex = updatedFrames.findIndex((frame) => frame.id === newFrame.id);
        if (newIndex >= 0) {
          setCurrentFrameIndex(newIndex);
        }
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("external-frame-created", {
            detail: { frame: newFrame },
          })
        );
      }

      return newFrame;
    },
    [setCurrentFrameIndex, unifiedStorage.frames, unifiedStorage.updateFrames]
  );

  const handleCreateFrameInline = useCallback(
    async (options: CreateFrameOptions = {}): Promise<AIFrame> => {
      const frame = handleCreateFrame({ ...options, selectFrame: false });
      if (frame && frame.id) {
        setPendingChapterFrames((prev) => ({
          ...prev,
          [frame.id]: frame,
        }));
      }
      return frame;
    },
    [handleCreateFrame]
  );

  const handleAcceptAIFrames = useCallback(
    (frames: AIFrame[]) => {
      if (!frames.length) return;

      const existingMaxOrder = unifiedStorage.frames.reduce(
        (max, frame) =>
          typeof frame.order === "number"
            ? Math.max(max, frame.order)
            : max,
        0
      );

      const timestamp = new Date().toISOString();
      const normalized = frames.map((frame, index) => ({
        ...frame,
        order: existingMaxOrder + index + 1,
        createdAt: frame.createdAt || timestamp,
        updatedAt: timestamp,
      }));

      unifiedStorage.updateFrames([
        ...unifiedStorage.frames,
        ...normalized,
      ]);
    },
    [unifiedStorage.frames, unifiedStorage.updateFrames]
  );

  const handleExportFrames = useCallback(() => {
    try {
      const payload = exportFramesToJson(
        unifiedStorage.frames,
        unifiedStorage.chapters,
        unifiedStorage.graphState
      );
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-frames-${new Date().toISOString().split("T")[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      console.error("Failed to export AI Frames:", exportError);
    }
  }, [unifiedStorage.frames, unifiedStorage.chapters, unifiedStorage.graphState]);

  const handleImportFramesFromFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const importResult = importFramesFromJson(text);
        const {
          frames: importedFrames,
          chapters: importedChapters,
          graphState: importedGraphState,
          metadata,
        } = importResult;

        if (!importedFrames.length && !importedChapters.length) {
          console.warn("Import skipped: no frames or chapters found in file");
          return;
        }

        const timestamp = new Date().toISOString();
        const normalizedFrames = importedFrames.map((frame, index) => ({
          ...frame,
          id:
            metadata.isFullExport && frame.id
              ? frame.id
              : generateFrameId(),
          order:
            typeof frame.order === "number" ? frame.order : index + 1,
          createdAt: frame.createdAt || timestamp,
          updatedAt:
            metadata.isFullExport && frame.updatedAt
              ? frame.updatedAt
              : timestamp,
        }));

        if (metadata.isFullExport) {
          unifiedStorage.updateFrames(normalizedFrames);
          unifiedStorage.updateChapters(importedChapters);
          if (importedGraphState) {
            unifiedStorage.updateGraphState(importedGraphState);
          }
          return;
        }

        const maxOrder = unifiedStorage.frames.reduce(
          (max, frame) =>
            typeof frame.order === "number"
              ? Math.max(max, frame.order)
              : max,
          0
        );

        const appendedFrames = normalizedFrames.map((frame, index) => ({
          ...frame,
          order: maxOrder + index + 1,
          updatedAt: timestamp,
        }));

        unifiedStorage.updateFrames([
          ...unifiedStorage.frames,
          ...appendedFrames,
        ]);
      } catch (importError) {
        console.error("Failed to import AI Frames:", importError);
      }
    },
    [
      unifiedStorage.frames,
      unifiedStorage.chapters,
      unifiedStorage.graphState,
      unifiedStorage.updateFrames,
      unifiedStorage.updateChapters,
      unifiedStorage.updateGraphState,
    ]
  );

  const resetChapterDialogState = useCallback(() => {
    setEditingChapter(null);
    setChapterFormData({ ...EMPTY_CHAPTER_FORM });
    setSelectedChapterFrameIds([]);
  }, []);

  const determineChapterSequential = useCallback(
    (chapter: Chapter | null): boolean => {
      if (chapter?.linkSequentially === true) {
        return true;
      }
      if (chapter?.linkSequentially === false) {
        return false;
      }
      if (!chapter || !Array.isArray(chapter.frameIds) || chapter.frameIds.length < 2) {
        return false;
      }

      const frameIds = chapter.frameIds.filter(Boolean);
      if (frameIds.length < 2) {
        return false;
      }

      const nodes = unifiedStorage.graphState?.nodes || [];
      const edges = unifiedStorage.graphState?.edges || [];
      if (!nodes.length || !edges.length) {
        return false;
      }

      const nodeLookup = new Map<string, string>();
      nodes.forEach((node: any) => {
        if (node?.type === "aiframe") {
          const frameId = node?.data?.frameId;
          if (frameId && frameIds.includes(frameId)) {
            nodeLookup.set(frameId, node.id);
          }
        }
      });

      if (nodeLookup.size < frameIds.length) {
        return false;
      }

      for (let index = 0; index < frameIds.length - 1; index += 1) {
        const sourceNodeId = nodeLookup.get(frameIds[index]);
        const targetNodeId = nodeLookup.get(frameIds[index + 1]);
        if (!sourceNodeId || !targetNodeId) {
          return false;
        }

        const hasEdge = edges.some(
          (edge: any) => edge.source === sourceNodeId && edge.target === targetNodeId
        );
        if (!hasEdge) {
          return false;
        }
      }

      return true;
    },
    [unifiedStorage.graphState]
  );

  const openCreateChapterDialog = useCallback(() => {
    resetChapterDialogState();
    setPendingChapterFrames({});
    setShowChapterDialog(true);
  }, [resetChapterDialogState]);

  const openEditChapterDialog = useCallback(
    (chapter: Chapter) => {
      setEditingChapter(chapter);
      setChapterFormData({
        title: chapter.title || "",
        description: chapter.description || "",
        color: chapter.color || DEFAULT_CHAPTER_COLOR,
        conceptIds: chapter.conceptIds || [],
        linkSequentially:
          typeof chapter.linkSequentially === "boolean"
            ? chapter.linkSequentially
            : determineChapterSequential(chapter),
      });
      setSelectedChapterFrameIds(chapter.frameIds || []);
      setShowChapterDialog(true);
    },
    [determineChapterSequential]
  );

  const handleChapterFrameSelection = useCallback((frameId: string, isSelected: boolean) => {
    setSelectedChapterFrameIds((prev) => {
      if (isSelected) {
        if (prev.includes(frameId)) {
          return prev;
        }
        return [...prev, frameId];
      }
      return prev.filter((id) => id !== frameId);
    });
  }, []);

  const deselectAllChapterFrames = useCallback(() => {
    setSelectedChapterFrameIds([]);
  }, []);

  const getFramesSnapshot = useCallback((): UnifiedAIFrame[] => {
    const frameMap = new Map<string, UnifiedAIFrame>();

    unifiedStorage.frames.forEach((frame) => {
      frameMap.set(frame.id, frame);
    });

    Object.values(pendingChapterFrames).forEach((frame) => {
      if (frameMap.has(frame.id)) {
        return;
      }
      const createdAt = frame.createdAt || new Date().toISOString();
      const updatedAt = frame.updatedAt || createdAt;
      frameMap.set(frame.id, {
        ...frame,
        metadata: {
          version: "2.0",
          createdAt,
          updatedAt,
          source: "ai-frames" as const,
          lastSaved: "",
        },
      });
    });

    return Array.from(frameMap.values());
  }, [pendingChapterFrames, unifiedStorage.frames]);

  const applyChapterAssignments = useCallback(
    (chapterId: string, frameIds: string[], frames: UnifiedAIFrame[]): UnifiedAIFrame[] => {
      const selectedSet = new Set(frameIds);
      return frames.map((frame) => {
        if (selectedSet.has(frame.id)) {
          return {
            ...frame,
            chapterId,
            parentFrameId: chapterId,
          };
        }

        if (frame.chapterId === chapterId && !selectedSet.has(frame.id)) {
          return {
            ...frame,
            chapterId: undefined,
            parentFrameId: undefined,
          };
        }

        if (selectedSet.has(frame.id) && frame.chapterId && frame.chapterId !== chapterId) {
          return {
            ...frame,
            chapterId,
            parentFrameId: chapterId,
          };
        }

        return frame;
      });
    },
    []
  );

  const syncChapterFrames = useCallback(
    (chapters: Chapter[], frames: UnifiedAIFrame[]): Chapter[] =>
      chapters.map((chapter, index) => ({
        ...chapter,
        frameIds: frames
          .filter((frame) => frame.chapterId === chapter.id)
          .map((frame) => frame.id),
        order: typeof chapter.order === "number" ? chapter.order : index,
      })),
    []
  );

  const queueSequentialUnlink = useCallback((chapterId: string) => {
    if (typeof window === "undefined" || !chapterId) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("unlink-chapter-frames-sequentially", {
        detail: { chapterId },
      })
    );
  }, []);

  const queueSequentialLink = useCallback((chapterId: string, frameIds: string[]) => {
    if (typeof window === "undefined" || !chapterId || frameIds.length < 2) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("link-chapter-frames-sequentially", {
        detail: { chapterId, frameIds, attempt: 0 },
      })
    );
  }, []);

  const handleDeleteChapter = useCallback(
    (chapterId: string) => {
      const filteredChapters = unifiedStorage.chapters.filter(
        (chapter) => chapter.id !== chapterId
      );

      const updatedFrames = unifiedStorage.frames.map((frame) =>
        frame.chapterId === chapterId
          ? { ...frame, chapterId: undefined, parentFrameId: undefined }
          : frame
      );

      const reorderedChapters = syncChapterFrames(
        filteredChapters.map((chapter, index) => ({
          ...chapter,
          order: index,
        })),
        updatedFrames
      );

      unifiedStorage.updateFrames(updatedFrames);
      unifiedStorage.updateChapters(reorderedChapters);
    },
    [unifiedStorage.chapters, unifiedStorage.frames, syncChapterFrames]
  );

  // Knowledge Base search
  const handleKnowledgeBaseSearch = useCallback(async () => {
    if (!providerVectorStore || !documentSearchQuery.trim()) {
      setShowSemanticResults(false);
      setSemanticSearchResults([]);
      setCurrentSemanticQuery("");
      return;
    }

    setIsSearching(true);
    try {
      const results = await providerVectorStore.searchSimilar(
        documentSearchQuery,
        searchThreshold,
        30
      );

      setSemanticSearchResults(results);
      setCurrentSemanticQuery(documentSearchQuery);
      setShowSemanticResults(results.length > 0);
    } catch (error) {
      console.error("KB Semantic search failed:", error);
      setSemanticSearchResults([]);
      setShowSemanticResults(false);
    } finally {
      setIsSearching(false);
    }
  }, [providerVectorStore, documentSearchQuery, searchThreshold]);

  // Clear Knowledge Base search
  const clearKnowledgeBaseSearch = useCallback(() => {
    setDocumentSearchQuery("");
    setShowSemanticResults(false);
    setSemanticSearchResults([]);
    setCurrentSemanticQuery("");
  }, []);

  const handleOpenDocumentChunks = useCallback(
    async (
      docId: string,
      options: { document?: any | null; chunkId?: string } = {}
    ) => {
      try {
        let docData = options.document;
        if (!docData || !Array.isArray(docData.chunks)) {
          docData =
            documents.find((doc) => doc.id === docId) ||
            (providerVectorStore
              ? await providerVectorStore.getDocument(docId)
              : null);
        }

        if (!docData) {
          console.warn("Document not found in knowledge base:", docId);
          return;
        }

        const chunks = Array.isArray(docData.chunks)
          ? docData.chunks
          : docData.content
          ? [
              {
                id: `${docId}-full`,
                content: docData.content,
                startIndex: 0,
                endIndex: docData.content.length,
              },
            ]
          : [];

        const selectedChunk =
          (options.chunkId &&
            chunks.find((chunk) => chunk.id === options.chunkId)) ||
          (chunks.length
            ? chunks[0]
            : {
                id: `${docId}-placeholder`,
                content: docData.content || "No content available",
                startIndex: 0,
                endIndex: (docData.content || "").length,
              });

        setChunkViewerDocument(docData);
        setChunkViewerChunks(chunks);
        setCurrentChunk(selectedChunk);
        setShowChunkView(true);
      } catch (error) {
        console.error("Failed to open document chunks:", error);
      }
    },
    [documents, providerVectorStore]
  );

  const handleNavigateChunk = useCallback(
    (chunkId: string) => {
      const nextChunk = chunkViewerChunks.find((chunk) => chunk.id === chunkId);
      if (nextChunk) {
        setCurrentChunk(nextChunk);
      }
    },
    [chunkViewerChunks]
  );

  // Download document
  const downloadDocument = useCallback(
    (docId: string) => {
      const doc = documents.find((d) => d.id === docId);
      if (doc) {
        const blob = new Blob([doc.content], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${doc.title}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    [documents]
  );

  useEffect(() => {
    if (!showChunkView) {
      setChunkViewerDocument((prev) => (prev ? null : prev));
      setChunkViewerChunks((prev) => (prev.length ? [] : prev));
      setCurrentChunk((prev) => (prev ? null : prev));
    }
  }, [showChunkView]);

  // Delete document
  const deleteDocument = useCallback(
    async (docId: string) => {
      if (providerVectorStore) {
        try {
          await providerVectorStore.deleteDocument(docId);
          setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
        } catch (error) {
          console.error("Failed to delete document:", error);
        }
      }
    },
    [providerVectorStore]
  );

  // ============================================================================
  // MEMOIZED VALUES - Computed values that depend on state
  // ============================================================================

  // Fix FrameGraphIntegration props by ensuring order is always a number
  const framesWithOrder = useMemo(
    () =>
      unifiedStorage.frames.map((frame) => ({
        ...frame,
        order: frame.order ?? 0,
      })),
    [unifiedStorage.frames]
  );

  const frameOrderLookup = useMemo(() => {
    const lookup = new Map<string, number>();
    framesWithOrder.forEach((frame) => {
      lookup.set(frame.id, typeof frame.order === "number" ? frame.order : 0);
    });

    let fallbackOrder = framesWithOrder.length + 1;
    Object.values(pendingChapterFrames).forEach((frame) => {
      if (!lookup.has(frame.id)) {
        const orderValue =
          typeof frame.order === "number" ? frame.order : fallbackOrder;
        lookup.set(frame.id, orderValue);
        fallbackOrder += 1;
      }
    });

    return lookup;
  }, [framesWithOrder, pendingChapterFrames]);

  const getOrderedFrameIds = useCallback(
    (frameIds: string[]): string[] => {
      const maxOrder = Number.MAX_SAFE_INTEGER;
      return [...frameIds].sort((a, b) => {
        const orderA = frameOrderLookup.get(a) ?? maxOrder;
        const orderB = frameOrderLookup.get(b) ?? maxOrder;
        if (orderA === orderB) {
          return a.localeCompare(b);
        }
        return orderA - orderB;
      });
    },
    [frameOrderLookup]
  );

  const framesForChapterDialog = useMemo<UnifiedAIFrame[]>(() => {
    const existingIds = new Set(framesWithOrder.map((frame) => frame.id));
    const additionalFrames = Object.values(pendingChapterFrames)
      .filter((frame) => !existingIds.has(frame.id))
      .map<UnifiedAIFrame>((frame) => {
        const createdAt = frame.createdAt || new Date().toISOString();
        const updatedAt = frame.updatedAt || createdAt;
        return {
          ...frame,
          metadata: {
            version: "2.0",
            createdAt,
            updatedAt,
            source: "ai-frames" as const,
            lastSaved: "",
          },
        };
      });

    return [...framesWithOrder, ...additionalFrames];
  }, [framesWithOrder, pendingChapterFrames]);

  const selectAllChapterFrames = useCallback(() => {
    const framesToSelect = framesForChapterDialog.filter((frame) => {
      if (editingChapter) {
        return true;
      }
      return !frame.chapterId;
    });
    setSelectedChapterFrameIds(framesToSelect.map((frame) => frame.id));
  }, [framesForChapterDialog, editingChapter]);

  const handleCreateChapter = useCallback(() => {
    const trimmedTitle = chapterFormData.title.trim();
    if (!trimmedTitle) {
      return;
    }

    setShowChapterProcessing(true);
    if (chapterProcessingTimeoutRef.current) {
      clearTimeout(chapterProcessingTimeoutRef.current);
    }
    chapterProcessingTimeoutRef.current = setTimeout(() => {
      setShowChapterProcessing(false);
      chapterProcessingTimeoutRef.current = null;
    }, 30000);

    try {
      const orderedSelection = getOrderedFrameIds(selectedChapterFrameIds);
      const chapterId = `chapter_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const now = new Date().toISOString();

      const frameSnapshot = getFramesSnapshot();
      const updatedFrames = applyChapterAssignments(
        chapterId,
        orderedSelection,
        frameSnapshot
      );

      const baseChapter: Chapter = {
        id: chapterId,
        title: trimmedTitle,
        description: chapterFormData.description.trim(),
        color: chapterFormData.color || DEFAULT_CHAPTER_COLOR,
        conceptIds: Array.from(new Set(chapterFormData.conceptIds)).filter(Boolean),
        frameIds: orderedSelection,
        order: unifiedStorage.chapters.length,
        createdAt: now,
        updatedAt: now,
        linkSequentially: chapterFormData.linkSequentially,
      };

      const chaptersWithNew = [...unifiedStorage.chapters, baseChapter];
      const framesWithAssignments = updatedFrames.map(frame =>
        orderedSelection.includes(frame.id)
          ? { ...frame, chapterId: chapterId, parentFrameId: chapterId }
          : frame
      );

      const chaptersWithAssignments = syncChapterFrames(chaptersWithNew, framesWithAssignments).map(
        (chapter) =>
          chapter.id === chapterId
            ? {
                ...chapter,
                conceptIds: baseChapter.conceptIds,
                color: baseChapter.color,
                description: baseChapter.description,
                createdAt: baseChapter.createdAt,
                updatedAt: now,
                order: baseChapter.order,
                frameIds: orderedSelection,
                linkSequentially: baseChapter.linkSequentially,
              }
            : chapter
      );

      unifiedStorage.updateFrames(framesWithAssignments);
      unifiedStorage.updateChapters(chaptersWithAssignments);
      setPendingChapterFrames((prev) => {
        if (!prev) {
          return prev;
        }
        const next = { ...prev };
        orderedSelection.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      setShowChapterDialog(false);
      resetChapterDialogState();

      queueSequentialUnlink(chapterId);
      if (chapterFormData.linkSequentially && orderedSelection.length > 1) {
        setTimeout(() => queueSequentialLink(chapterId, orderedSelection), 300);
      }

      broadcastChapterGraphSync(baseChapter, orderedSelection);
      dispatchForceSave("chapter-created");
    } catch (error) {
      console.error("Failed to create chapter:", error);
      if (chapterProcessingTimeoutRef.current) {
        clearTimeout(chapterProcessingTimeoutRef.current);
        chapterProcessingTimeoutRef.current = null;
      }
      setShowChapterProcessing(false);
    }
  }, [
    applyChapterAssignments,
    chapterFormData.color,
    chapterFormData.conceptIds,
    chapterFormData.description,
    chapterFormData.linkSequentially,
    chapterFormData.title,
    getFramesSnapshot,
    getOrderedFrameIds,
    queueSequentialLink,
    queueSequentialUnlink,
    resetChapterDialogState,
    selectedChapterFrameIds,
    syncChapterFrames,
    dispatchForceSave,
    broadcastChapterGraphSync,
    unifiedStorage.chapters,
    unifiedStorage.updateChapters,
    unifiedStorage.updateFrames,
  ]);

  const handleEditChapter = useCallback(() => {
    if (!editingChapter) {
      return;
    }

    const trimmedTitle = chapterFormData.title.trim();
    if (!trimmedTitle) {
      return;
    }

    setShowChapterProcessing(true);
    if (chapterProcessingTimeoutRef.current) {
      clearTimeout(chapterProcessingTimeoutRef.current);
    }
    chapterProcessingTimeoutRef.current = setTimeout(() => {
      setShowChapterProcessing(false);
      chapterProcessingTimeoutRef.current = null;
    }, 30000);

    try {
      const orderedSelection = getOrderedFrameIds(selectedChapterFrameIds);
      const now = new Date().toISOString();

      const frameSnapshot = getFramesSnapshot();
      const updatedFrames = applyChapterAssignments(
        editingChapter.id,
        orderedSelection,
        frameSnapshot
      );

      let updatedChapterRecord: Chapter | null = null;
      const updatedChapters = unifiedStorage.chapters.map((chapter) =>
        chapter.id === editingChapter.id
          ? ((updatedChapterRecord = {
              ...chapter,
              title: trimmedTitle,
              description: chapterFormData.description.trim(),
              color: chapterFormData.color || DEFAULT_CHAPTER_COLOR,
              conceptIds: Array.from(new Set(chapterFormData.conceptIds)).filter(Boolean),
              frameIds: orderedSelection,
              updatedAt: now,
              linkSequentially: chapterFormData.linkSequentially,
            }),
            updatedChapterRecord)
          : chapter
      );

      const framesWithAssignments = updatedFrames.map(frame =>
        orderedSelection.includes(frame.id)
          ? { ...frame, chapterId: editingChapter.id, parentFrameId: editingChapter.id }
          : frame
      );

      const syncedChapters = syncChapterFrames(updatedChapters, framesWithAssignments);

      unifiedStorage.updateFrames(framesWithAssignments);
      unifiedStorage.updateChapters(syncedChapters);
      setPendingChapterFrames((prev) => {
        if (!prev) {
          return prev;
        }
        const next = { ...prev };
        orderedSelection.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      setShowChapterDialog(false);
      resetChapterDialogState();

      queueSequentialUnlink(editingChapter.id);
      if (chapterFormData.linkSequentially && orderedSelection.length > 1) {
        setTimeout(() => queueSequentialLink(editingChapter.id, orderedSelection), 300);
      }

      if (!updatedChapterRecord) {
        updatedChapterRecord = {
          ...editingChapter,
          title: trimmedTitle,
          description: chapterFormData.description.trim(),
          color: chapterFormData.color || DEFAULT_CHAPTER_COLOR,
          conceptIds: Array.from(new Set(chapterFormData.conceptIds)).filter(Boolean),
          frameIds: orderedSelection,
          updatedAt: now,
          linkSequentially: chapterFormData.linkSequentially,
        };
      }

      broadcastChapterGraphSync(updatedChapterRecord, orderedSelection);
      dispatchForceSave("chapter-updated");
    } catch (error) {
      console.error("Failed to update chapter:", error);
      if (chapterProcessingTimeoutRef.current) {
        clearTimeout(chapterProcessingTimeoutRef.current);
        chapterProcessingTimeoutRef.current = null;
      }
      setShowChapterProcessing(false);
    }
  }, [
    applyChapterAssignments,
    chapterFormData.color,
    chapterFormData.conceptIds,
    chapterFormData.description,
    chapterFormData.linkSequentially,
    chapterFormData.title,
    editingChapter,
    getFramesSnapshot,
    getOrderedFrameIds,
    queueSequentialLink,
    queueSequentialUnlink,
    resetChapterDialogState,
    selectedChapterFrameIds,
    syncChapterFrames,
    dispatchForceSave,
    broadcastChapterGraphSync,
    unifiedStorage.chapters,
    unifiedStorage.updateChapters,
    unifiedStorage.updateFrames,
  ]);

  const availableConcepts = useMemo(() => {
    const conceptSet = new Set<string>();

    unifiedStorage.frames.forEach((frame) => {
      frame.aiConcepts?.forEach((concept) => {
        if (concept) conceptSet.add(concept);
      });
      frame.conceptIds?.forEach((concept) => {
        if (concept) conceptSet.add(concept);
      });
    });

    unifiedStorage.chapters.forEach((chapter) => {
      chapter.conceptIds?.forEach((concept) => {
        if (concept) conceptSet.add(concept);
      });
    });

    return Array.from(conceptSet).sort((a, b) => a.localeCompare(b));
  }, [unifiedStorage.frames, unifiedStorage.chapters]);

  // ============================================================================
  // CONDITIONAL LOGIC - Now safe to use after all hooks are called
  // ============================================================================

  // Show loading while checking auth or redirecting
  if (requireAuth && (status === "loading" || !session)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {status === "loading"
              ? "Checking authentication..."
              : "Redirecting to sign-in..."}
          </p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // COMPONENT LOGIC & HELPER FUNCTIONS
  // ============================================================================

  // Document management functions - copied from Deep Research
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Tab configuration for AI Frames Knowledge Base Manager
  const aiFramesTabConfigs = [
    {
      id: "user",
      label: "User Docs",
      icon: Upload,
      filter: (doc: any) => {
        return !(
          doc.title.toLowerCase().includes("agent log") ||
          doc.metadata.source === "research_state" ||
          doc.metadata.source === "ai-frames" ||
          doc.title.toLowerCase().includes("ai-frame") ||
          doc.metadata.source === "timecapsule_export" ||
          doc.metadata.source === "timecapsule_import" ||
          doc.metadata.source === "aiframes_import" ||
          doc.metadata.source === "aiframes_combined" ||
          doc.title.toLowerCase().includes("timecapsule") ||
          doc.metadata.isGenerated === true
        );
      },
    },
    {
      id: "aiFrames",
      label: "AI Frames",
      icon: Bot,
      filter: (doc: any) => {
        return (
          doc.metadata.source === "ai-frames" ||
          doc.title.toLowerCase().includes("ai-frame")
        );
      },
    },
    {
      id: "system",
      label: "System",
      icon: Package,
      filter: (doc: any) => {
        return (
          doc.metadata.source === "timecapsule_export" ||
          doc.metadata.source === "timecapsule_import" ||
          doc.metadata.source === "aiframes_import" ||
          doc.metadata.source === "aiframes_combined" ||
          doc.title.toLowerCase().includes("timecapsule") ||
          doc.metadata.isGenerated === true
        );
      },
    },
    {
      id: "agentLogs",
      label: "Logs",
      icon: Settings,
      filter: (doc: any) => {
        return (
          doc.title.toLowerCase().includes("agent log") ||
          doc.metadata.source === "research_state"
        );
      },
    },
  ];

  // Legacy function for backward compatibility (if needed elsewhere)
  const categorizeDocuments = (docs: any[]) => {
    const categories: Record<string, any[]> = {};

    // Initialize categories
    aiFramesTabConfigs.forEach((config) => {
      categories[config.id] = [];
    });

    // Categorize each document
    docs.forEach((doc) => {
      aiFramesTabConfigs.forEach((config) => {
        if (config.filter(doc)) {
          categories[config.id].push(doc);
        }
      });
    });

    return categories;
  };

  const getDocumentCategoryCounts = () => {
    const counts: Record<string, number> = {};
    aiFramesTabConfigs.forEach((config) => {
      counts[config.id] = documents.filter(config.filter).length;
    });
    return counts;
  };

  const getSemanticResultsByCategory = (category: string) => {
    return semanticSearchResults.filter((result) => {
      const doc = result.document;
      if (!doc) return false;

      switch (category) {
        case "user":
          return !(
            doc.title.toLowerCase().includes("agent log") ||
            doc.metadata.source === "research_state" ||
            doc.metadata.source === "ai-frames" ||
            doc.title.toLowerCase().includes("ai-frame") ||
            doc.metadata.source === "timecapsule_export" ||
            doc.metadata.source === "timecapsule_import" ||
            doc.metadata.source === "aiframes_import" ||
            doc.metadata.source === "aiframes_combined" ||
            doc.title.toLowerCase().includes("timecapsule") ||
            doc.metadata.isGenerated === true
          );
        case "aiFrames":
          return (
            doc.metadata.source === "ai-frames" ||
            doc.title.toLowerCase().includes("ai-frame")
          );
        case "system":
          return (
            doc.metadata.source === "timecapsule_export" ||
            doc.metadata.source === "timecapsule_import" ||
            doc.metadata.source === "aiframes_import" ||
            doc.metadata.source === "aiframes_combined" ||
            doc.title.toLowerCase().includes("timecapsule") ||
            doc.metadata.isGenerated === true
          );
        case "agentLogs":
          return (
            doc.title.toLowerCase().includes("agent log") ||
            doc.metadata.source === "research_state"
          );
        default:
          return false;
      }
    });
  };

  const getFilteredDocumentsByCategory = (category: string) => {
    if (showSemanticResults && semanticSearchResults.length > 0) {
      return getSemanticResultsByCategory(category);
    }

    const categorized = categorizeDocuments(documents);
    const categoryDocs =
      categorized[category as keyof typeof categorized] || [];

    if (!documentSearchQuery.trim()) {
      return categoryDocs;
    }

    return categoryDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(documentSearchQuery.toLowerCase()) ||
        doc.metadata.description
          ?.toLowerCase()
          .includes(documentSearchQuery.toLowerCase())
    );
  };

  // All hooks moved to top section - no more hooks after this point

  // Main render - SIMPLIFIED: Only FrameGraphIntegration with built-in Save Graph functionality
  return (
    <>
      {/* Hidden file input for KB document uploads */}
      <input
        id="kb-file-upload"
        type="file"
        multiple
        accept=".pdf,.docx,.txt,.md"
        className="hidden"
        onChange={async (e) => {
          if (e.target.files) {
            await documentsHook.handleFileUpload(e.target.files);

            // Refresh documents list to show newly uploaded files
            if (providerVectorStore) {
              const allDocuments = await providerVectorStore.getAllDocuments();
              setDocuments(allDocuments);
            }

            e.target.value = ""; // Reset input
          }
        }}
      />
      <input
        id="ai-frames-import"
        type="file"
        accept=".json"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          await handleImportFramesFromFile(file);
          event.target.value = "";
        }}
      />
      <div className="min-h-screen flex flex-col gap-6 pt-20">
        <AIFlowBuilderPanel
          flowBuilder={flowBuilder}
          onAcceptFrames={handleAcceptAIFrames}
          isOpen={isFlowPanelOpen}
          onToggle={() => setIsFlowPanelOpen(false)}
        />
        {!isFlowPanelOpen && (
          <button
            className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-3 rounded-full shadow-xl flex items-center gap-2"
            onClick={() => setIsFlowPanelOpen(true)}
          >
            <Bot className="h-4 w-4" />
            Open Flow Builder
          </button>
        )}
        {/* SIMPLIFIED: Direct FrameGraphIntegration - no duplicate save systems */}
        <div className="flex-1 overflow-hidden">
          {/* FIXED: Dual pane layout like Deep Research - sidebar + main content */}
          <div className="flex-1 flex min-h-0 relative">
            {/* Left Sidebar - Knowledge Base Section like Deep Research */}
            <div
              className={`relative flex-shrink-0 transition-all duration-300 ${
                sidebarCollapsed ? "w-0" : "w-80"
              }`}
            >
              {!sidebarCollapsed && (
                <div className="bg-gray-50 border-r border-gray-200 p-4 space-y-6 overflow-y-auto h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        AI-Frames
                      </h3>
                      <p className="text-sm text-gray-600">
                        Interactive AI learning platform
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-900"
                      onClick={handleSidebarHide}
                      title="Hide knowledge tools panel"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>

              {/* Knowledge Base Section - EXACTLY like Deep Research */}
              <KnowledgeBaseSection
                documentStatus={{
                  count: documents.filter(aiFramesTabConfigs[0].filter).length,
                  totalSize: documents
                    .filter(aiFramesTabConfigs[0].filter)
                    .reduce((sum, doc) => sum + (doc.metadata?.filesize || 0), 0),
                  vectorCount: 0,
                }}
                onUploadDocuments={() =>
                  document.getElementById("kb-file-upload")?.click()
                }
                onManageKnowledge={() => {
                  console.log(
                    "Manage KB button clicked - opening Knowledge Base Manager"
                  );
                  setShowDocumentManager(true);
                }}
                onScrapeUrl={() => {
                  console.log("Scrape URL functionality");
                }}
              />

              {/* Frame Stats */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Frame Statistics
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Frames:</span>
                    <Badge variant="outline">
                      {unifiedStorage.frames.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mode:</span>
                    <Badge variant={isCreationMode ? "default" : "secondary"}>
                      {isCreationMode ? "Creator" : "Learner"}
                    </Badge>
                  </div>

                  {/* UNIFIED: Auto-save status */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    {unifiedStorage.isLoading ? (
                      <Badge variant="outline" className="text-blue-600">
                        <Zap className="h-3 w-3 mr-1 animate-pulse" />
                        Auto-saving...
                      </Badge>
                    ) : unifiedStorage.hasUnsavedChanges ? (
                      <Badge variant="outline" className="text-orange-600">
                        <Save className="h-3 w-3 mr-1" />
                        Unsaved
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-green-600">
                        <Save className="h-3 w-3 mr-1" />
                        Saved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Import / Export
                </h4>
                <p className="text-xs text-gray-500">
                  Backup your AI Frames or import flows from another workspace.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center gap-2"
                  onClick={handleExportFrames}
                >
                  <Download className="h-4 w-4" />
                  Export JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center gap-2"
                  onClick={() =>
                    document.getElementById("ai-frames-import")?.click()
                  }
                >
                  <Upload className="h-4 w-4" />
                  Import JSON
                </Button>
              </div>

              {/* Chapter Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Chapters
                  </h4>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={openCreateChapterDialog}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {unifiedStorage.chapters.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No chapters defined. Create one to group frames.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {unifiedStorage.chapters.map((chapter) => {
                      const frameCount = chapter.frameIds?.length || 0;
                      const conceptCount = chapter.conceptIds?.length || 0;

                      return (
                        <Card key={chapter.id} className="shadow-sm">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                  <span
                                    className="inline-block h-3 w-3 rounded-full"
                                    style={{ backgroundColor: chapter.color || DEFAULT_CHAPTER_COLOR }}
                                  ></span>
                                  {chapter.title || "Untitled Chapter"}
                                </CardTitle>
                                {chapter.description && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {chapter.description}
                                  </p>
                                )}
                              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditChapterDialog(chapter)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete chapter "${chapter.title}"? Frames will be left unassigned.`
                      )
                    ) {
                      handleDeleteChapter(chapter.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Badge variant="outline">
                                {frameCount} {frameCount === 1 ? "frame" : "frames"}
                              </Badge>
                              <Badge variant="outline">
                                {conceptCount} {conceptCount === 1 ? "concept" : "concepts"}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>

                  {/* Danger Zone */}
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Danger Zone
                    </h4>
                    <p className="text-xs text-gray-500">
                      Remove every AI Frame, chapter, and graph connection from this space.
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        setShowClearConfirm(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete All AI Frames
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area - Graph Integration */}
            <div className="flex-1 overflow-y-auto overscroll-y-contain">
              {/* FIXED: Enhanced VectorStore readiness check for stability */}
              {vectorStoreInitialized &&
              !vectorStoreInitializing &&
              providerVectorStore?.initialized !== false ? (
                <FrameGraphIntegration
                  key={graphResetKey}
                  frames={framesWithOrder}
                  onFramesChange={handleFramesChange}
                  isCreationMode={isCreationMode}
                  currentFrameIndex={currentFrameIndex}
                  onFrameIndexChange={(newIndex) => {
                    console.log("🔍 CRITICAL: Frame index change called:", {
                      oldIndex: currentFrameIndex,
                      newIndex,
                      frameCount: unifiedStorage.frames.length,
                      stackTrace: new Error().stack?.split("\n")[1],
                    });
                    setCurrentFrameIndex(newIndex);
                  }}
                  onCreateFrame={handleCreateFrame}
                  chapters={unifiedStorage.chapters}
                  onChaptersChange={unifiedStorage.updateChapters}
                  onGraphChange={handleGraphStateUpdate}
                  initialGraphState={unifiedStorage.graphState}
                  graphStorageManager={graphStorageManagerRef.current}
                  onViewModeChange={handleViewModeChange}
                  sidebarCollapsed={sidebarCollapsed}
                  onShowSidebar={handleSidebarShow}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                      Initializing Knowledge Base...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Status:{" "}
                      {vectorStoreInitialized ? "Initialized" : "Initializing"}
                      {vectorStoreInitializing && " (Loading...)"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals - PRESERVATION: Keep existing dialogs */}
      <Dialog open={showChapterProcessing} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Applying chapter changes
            </DialogTitle>
            <DialogDescription>
              Updating frame connections. This may take a few seconds.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-gray-600">
            Please keep this page open while updates complete.
          </div>
        </DialogContent>
      </Dialog>
      {(vectorStoreInitializing || showVectorStoreInitModal) && (
        <VectorStoreInitModal
          isOpen={showVectorStoreInitModal}
          progress={
            vectorStoreInitializing ? 50 : vectorStoreInitialized ? 100 : 0
          }
          status={
            vectorStoreError
              ? "error"
              : vectorStoreReady
              ? "ready"
              : "initializing"
          }
          message={
            vectorStoreError ||
            (vectorStoreReady
              ? "Knowledge Base ready!"
              : vectorStoreInitializing
                ? "Initializing Knowledge Base..."
                : "Preparing Knowledge Base...")
          }
          onClose={() => setShowVectorStoreInitModal(false)}
        />
      )}
      <BubblSpaceDialog
        isOpen={showBubblSpaceDialog}
        onClose={() => setShowBubblSpaceDialog(false)}
        onSave={(bubblSpace) => {
          console.log("Save bubblspace:", bubblSpace);
          setShowBubblSpaceDialog(false);
        }}
      />
      <TimeCapsuleDialog
        isOpen={showTimeCapsuleDialog}
        onClose={() => setShowTimeCapsuleDialog(false)}
        onSave={(timeCapsule) => {
          console.log("Save timecapsule:", timeCapsule);
          setShowTimeCapsuleDialog(false);
        }}
        bubblSpaces={[]}
      />
      <SafeImportDialog
        isOpen={showSafeImportDialog}
        onClose={() => setShowSafeImportDialog(false)}
        timeCapsuleData={null}
        onImport={async (options) => {
          console.log("Import with options:", options);
          return {
            success: true,
            message: "Import completed successfully",
            details: { itemsImported: {} },
          };
        }}
      />
      <ChapterDialog
        open={showChapterDialog}
        onOpenChange={(open) => {
          setShowChapterDialog(open);
          if (!open) {
            resetChapterDialogState();
          }
        }}
        editingChapter={editingChapter}
        chapterFormData={chapterFormData}
        setChapterFormData={setChapterFormData}
        selectedFrameIds={selectedChapterFrameIds}
        frames={framesForChapterDialog}
        availableConcepts={availableConcepts}
        onFrameSelection={handleChapterFrameSelection}
        onSelectAll={selectAllChapterFrames}
          onDeselectAll={deselectAllChapterFrames}
          onCreateChapter={handleCreateChapter}
          onEditChapter={handleEditChapter}
          onCreateFrameInline={handleCreateFrameInline}
          onCancel={() => {
            setPendingChapterFrames({});
            dispatchForceSave("chapter-dialog-cancelled");
          }}
        />
      {showChunkView && chunkViewerDocument && currentChunk && (
        <ChunkViewerModal
          isOpen={showChunkView}
          onClose={() => setShowChunkView(false)}
          chunk={currentChunk}
          document={chunkViewerDocument}
          allChunks={chunkViewerChunks}
          onNavigateChunk={handleNavigateChunk}
        />
      )}

      {/* Document Manager Modal - Complete Deep Research implementation */}
      <Dialog
        open={showDocumentManager}
        onOpenChange={(open) => {
          if (!open) setShowDocumentManager(false);
        }}
      >
        <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Knowledge Base Manager
                </DialogTitle>
                <DialogDescription>
                  Organized view of your documents by category. Search and manage
                  your knowledge base content.
                </DialogDescription>
              </div>

              {/* Upload Button */}
              <Button
                onClick={() => document.getElementById("kb-file-upload")?.click()}
                disabled={documentsHook.isUploading}
                className="space-x-2"
                size="sm"
              >
                {documentsHook.isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Files</span>
                  </>
                )}
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <Tabs
              value={documentManagerTab}
              onValueChange={setDocumentManagerTab}
              className="flex flex-col h-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  User Docs ({getDocumentCategoryCounts().user})
                </TabsTrigger>
                <TabsTrigger
                  value="aiFrames"
                  className="flex items-center gap-2"
                >
                  <Bot className="h-4 w-4" />
                  AI Frames ({getDocumentCategoryCounts().aiFrames})
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  System ({getDocumentCategoryCounts().system})
                </TabsTrigger>
                <TabsTrigger
                  value="agentLogs"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Logs ({getDocumentCategoryCounts().agentLogs})
                </TabsTrigger>
              </TabsList>

              {/* Search Section */}
              <div className="mb-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Search & Semantic Query
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Semantic search ${documentManagerTab} documents...`}
                        value={documentSearchQuery}
                        onChange={(e) => {
                          setDocumentSearchQuery(e.target.value);
                          if (!e.target.value.trim() && showSemanticResults) {
                            setShowSemanticResults(false);
                            setSemanticSearchResults([]);
                            setCurrentSemanticQuery("");
                          }
                        }}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleKnowledgeBaseSearch()
                        }
                      />
                      <Button
                        onClick={handleKnowledgeBaseSearch}
                        disabled={isSearching}
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {isSearching ? "Searching..." : "Search"}
                      </Button>
                      {(documentSearchQuery || showSemanticResults) && (
                        <Button
                          onClick={clearKnowledgeBaseSearch}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Label htmlFor="search-threshold">
                        Similarity threshold:
                      </Label>
                      <Input
                        id="search-threshold"
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        value={searchThreshold}
                        onChange={(e) =>
                          setSearchThreshold(parseFloat(e.target.value))
                        }
                        className="w-20"
                      />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-1 mb-1">
                        <Search className="h-3 w-3" />
                        <span className="font-medium">
                          AI-Powered Semantic Search
                        </span>
                      </div>
                      <p>
                        Search by meaning, not just keywords. Shows relevant
                        document chunks with similarity scores.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Document Content Tabs */}
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="user" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Upload className="h-4 w-4 text-green-600" />
                        {showSemanticResults
                          ? `Semantic Search: User Documents (${getFilteredDocumentsByCategory("user").length} results)`
                          : `User Documents (${getDocumentCategoryCounts().user})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from your uploaded files and scraped content. Showing relevant chunks with similarity scores.`
                          : `Your uploaded files, scraped content, and personal documents. These are available for learning research attachment.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("user").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("user").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-green-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {showSemanticResults
                                          ? "📄 User"
                                          : "📄 Upload"}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No user documents found.</p>
                          <p className="text-sm">
                            Upload files or scrape URLs to add content to your
                            knowledge base.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="aiFrames" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        {showSemanticResults
                          ? `Semantic Search: AI Frames (${getFilteredDocumentsByCategory("aiFrames").length} results)`
                          : `AI Frames (${getDocumentCategoryCounts().aiFrames})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from AI-generated learning frames and educational content.`
                          : `AI-generated learning frames and educational content from the AI-Frames system.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("aiFrames").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("aiFrames").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-blue-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs text-blue-600"
                                      >
                                        🎓 AI Frame
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No AI frames found.</p>
                          <p className="text-sm">
                            AI frames will appear here when synced from the
                            AI-Frames system.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="system" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-600" />
                        {showSemanticResults
                          ? `Semantic Search: System & Metadata (${getFilteredDocumentsByCategory("system").length} results)`
                          : `System & Metadata (${getDocumentCategoryCounts().system})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from TimeCapsules, BubblSpace exports, research outputs, and other system-generated content.`
                          : `TimeCapsules, BubblSpace exports, research outputs, and other system-generated content.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("system").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("system").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-purple-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs text-purple-600"
                                      >
                                        {(showSemanticResults
                                          ? doc.document?.metadata?.source ||
                                            doc.metadata?.source
                                          : doc.metadata?.source) ===
                                        "timecapsule_export"
                                          ? "📦 Export"
                                          : (
                                                showSemanticResults
                                                  ? doc.document?.metadata
                                                      ?.isGenerated ||
                                                    doc.metadata?.isGenerated
                                                  : doc.metadata?.isGenerated
                                              )
                                            ? "🤖 Generated"
                                            : "⚙️ System"}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No system documents found.</p>
                          <p className="text-sm">
                            TimeCapsule exports and system content will appear
                            here.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="agentLogs" className="h-full">
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Settings className="h-4 w-4 text-orange-600" />
                        {showSemanticResults
                          ? `Semantic Search: Agent Logs (${getFilteredDocumentsByCategory("agentLogs").length} results)`
                          : `Agent Logs (${getDocumentCategoryCounts().agentLogs})`}
                      </CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {showSemanticResults
                          ? `Semantic search results from multi-agent research session logs, performance metrics, and processing details.`
                          : `Multi-agent research session logs, performance metrics, and processing details.`}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      {getFilteredDocumentsByCategory("agentLogs").length >
                      0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("agentLogs").map(
                            (doc, index) => (
                              <Card
                                key={
                                  showSemanticResults
                                    ? `${doc.document?.id || doc.id}-${index}`
                                    : doc.id
                                }
                                className="p-3 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium truncate">
                                        {showSemanticResults
                                          ? doc.document?.title || doc.title
                                          : doc.title}
                                      </h4>
                                      {showSemanticResults && (
                                        <Badge
                                          variant="default"
                                          className="text-xs bg-orange-600"
                                        >
                                          {(doc.similarity * 100).toFixed(1)}%
                                          match
                                        </Badge>
                                      )}
                                      <Badge
                                        variant="outline"
                                        className="text-xs text-orange-600"
                                      >
                                        📋 Agent Log
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                      <span>
                                        Size:{" "}
                                        {formatFileSize(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.filesize || 0
                                            : doc.metadata?.filesize || 0
                                        )}
                                      </span>
                                      <span>
                                        Added:{" "}
                                        {new Date(
                                          showSemanticResults
                                            ? doc.document?.metadata
                                                ?.uploadedAt || Date.now()
                                            : doc.metadata?.uploadedAt ||
                                              Date.now()
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleOpenDocumentChunks(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id,
                                          {
                                            document: showSemanticResults
                                              ? doc.document
                                              : doc,
                                            chunkId:
                                              showSemanticResults && doc.chunk
                                                ? doc.chunk.id
                                                : undefined,
                                          }
                                        )
                                      }
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        downloadDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                    >
                                      <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        deleteDocument(
                                          showSemanticResults
                                            ? doc.document?.id || doc.id
                                            : doc.id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No agent logs found.</p>
                          <p className="text-sm">
                            Agent processing logs will appear here after
                            multi-agent research sessions.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="flex justify-between items-center p-6 pt-4 flex-shrink-0 border-t">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Total: {documents.length} documents •{" "}
              {formatFileSize(
                documents.reduce(
                  (sum, doc) => sum + (doc.metadata?.filesize || 0),
                  0
                )
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowDocumentManager(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete all AI Frames?</DialogTitle>
            <DialogDescription>
              This removes every frame, chapter, and graph connection from the workspace. You can’t undo this action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row justify-end gap-2">
            <Button variant="outline" onClick={() => setShowClearConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await handleClearFrames();
                setShowClearConfirm(false);
              }}
            >
              Delete Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
