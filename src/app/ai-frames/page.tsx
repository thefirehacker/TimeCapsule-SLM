"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VectorStoreInitModal from "@/components/VectorStoreInitModal";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MessageCircle,
  BookOpen,
  Target,
  Video,
  Clock,
  Brain,
  Lightbulb,
  ArrowRight,
  Download,
  Upload,
  Plus,
  Edit3,
  Wand2,
  Database,
  Search,
  Link as LinkIcon,
  Save,
  Trash2,
  Eye,
  Settings,
  GripVertical,
  Volume2,
  VolumeX,
  Mic,
  Sliders,
  Network,
  Package,
  FolderPlus,
  ChevronDown,
  RefreshCcw,
  FileText,
  Bot,
  X,
  File,
  Layers,
  Edit,
} from "lucide-react";

// Import DeepResearch components and types
import { DeepResearchApp } from "../../components/DeepResearch/DeepResearchApp";
import { VectorStore } from "../../components/VectorStore/VectorStore";
import { useVectorStore } from "../../components/providers/VectorStoreProvider";
import { usePageAnalytics } from "@/components/analytics/Analytics";

// Import Graph Integration
import { FrameGraphIntegration } from "@/components/ai-graphs";

// Import Metadata Management
import { BubblSpaceDialog } from "@/components/ui/bubblspace-dialog";
import { TimeCapsuleDialog } from "@/components/ui/timecapsule-dialog";
import { SafeImportDialog } from "@/components/ui/safe-import-dialog";
import { ChapterDialog } from "@/components/ai-graphs/chapter-dialog";
import { KnowledgeBaseSection } from "@/components/ui/knowledge-base-section";
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

interface AIFrame {
  id: string;
  title: string;
  goal: string;
  informationText: string;
  videoUrl: string;
  startTime: number;
  duration: number;
  afterVideoText: string;
  aiConcepts: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
  // NEW: Hierarchy and relationship fields
  order: number; // Preserve frame order
  bubblSpaceId?: string; // Link to BubblSpace
  timeCapsuleId?: string; // Link to TimeCapsule
  parentFrameId?: string; // For chapter/module hierarchy
  type: "frame" | "chapter" | "module"; // Frame type
  createdAt: string;
  updatedAt: string;
  // NEW: Attachment and media fields
  attachment?: {
    id: string;
    type: string;
    name?: string;
    size?: number;
    data?: any;
    url?: string;
    content?: string;
  };
  notes?: string; // Text notes attached to frame
  documents?: Array<{
    name: string;
    type: string;
    size?: number;
    content?: string;
    url?: string;
  }>; // Document attachments
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  color: string;
  order: number;
  frameIds: string[]; // IDs of frames in this chapter
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  createdAt: string;
  updatedAt: string;
  isCollapsed?: boolean; // For UI state
}

interface FrameCreationData {
  goal: string;
  videoUrl: string;
  startTime?: number;
  duration?: number;
  // Enhanced content creation fields
  contentType?: "video" | "pdf" | "text";
  title?: string;
  pdfUrl?: string;
  pdfPages?: string;
  pdfNotes?: string;
  textContent?: string;
  textNotes?: string;
}

// No hardcoded frames - app starts empty by default

export default function AIFramesPage() {
  // Initialize page analytics for AI-Frames
  const pageAnalytics = usePageAnalytics("AI-Frames", "learning");

  // Get VectorStore from provider
  const {
    vectorStore: providerVectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    error: vectorStoreError,
    processingAvailable,
    processingStatus,
  } = useVectorStore();

  // Mode state
  const [isCreationMode, setIsCreationMode] = useState(true);
  const [showCreationForm, setShowCreationForm] = useState(false);

  // NEW: Graph view state
  const [showGraphView, setShowGraphView] = useState(true); // Changed to true - show Graph View by default

  // Frame state - Always start empty, load from localStorage if available
  const [frames, setFrames] = useState<AIFrame[]>([]);

  // Debug: Track frames changes
  useEffect(() => {
    debugFrames("Frames state updated", {
      count: frames.length,
      frameIds: frames.map((f) => f.id),
      frameTitles: frames.map((f) => f.title),
    });
  }, [frames]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showAIConcepts, setShowAIConcepts] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "ai"; content: string }>
  >([]);
  const [chatInput, setChatInput] = useState("");

  // Creation mode state
  const [newFrameData, setNewFrameData] = useState<FrameCreationData>({
    goal: "",
    videoUrl: "",
    startTime: 0,
    duration: 300,
    contentType: undefined,
    title: "",
    pdfUrl: "",
    pdfPages: "",
    pdfNotes: "",
    textContent: "",
    textNotes: "",
  });
  const [isGeneratingFrame, setIsGeneratingFrame] = useState(false);
  const [showFrameEditor, setShowFrameEditor] = useState(false);
  const [editingFrame, setEditingFrame] = useState<AIFrame | null>(null);

  // Drag and drop state
  const [draggedFrameId, setDraggedFrameId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // TTS and voice state
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsReady, setTtsReady] = useState(false);

  // Metadata Management State
  const [metadataManager, setMetadataManager] =
    useState<MetadataManager | null>(null);
  const [graphStorageManager, setGraphStorageManager] =
    useState<GraphStorageManager | null>(null);
  const [currentBubblSpace, setCurrentBubblSpace] = useState<BubblSpace | null>(
    null
  );
  const [currentTimeCapsule, setCurrentTimeCapsule] =
    useState<TimeCapsuleMetadata | null>(null);
  const [allBubblSpaces, setAllBubblSpaces] = useState<BubblSpace[]>([]);
  const [allTimeCapsules, setAllTimeCapsules] = useState<TimeCapsuleMetadata[]>(
    []
  );
  const [showTimeCapsuleSelector, setShowTimeCapsuleSelector] =
    useState<boolean>(false);

  // Dialog states
  const [showBubblSpaceDialog, setShowBubblSpaceDialog] = useState(false);
  const [showTimeCapsuleDialog, setShowTimeCapsuleDialog] = useState(false);
  const [showSafeImportDialog, setShowSafeImportDialog] = useState(false);
  const [editingBubblSpace, setEditingBubblSpace] = useState<BubblSpace | null>(
    null
  );
  const [editingTimeCapsule, setEditingTimeCapsule] =
    useState<TimeCapsuleMetadata | null>(null);
  const [importTimeCapsuleData, setImportTimeCapsuleData] =
    useState<EnhancedTimeCapsule | null>(null);
  const [currentNarration, setCurrentNarration] = useState<string>("");
  const [narrationQueue, setNarrationQueue] = useState<string[]>([]);
  const [autoPlayAfterNarration, setAutoPlayAfterNarration] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
  });
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(0);
  const [autoAdvanceTimer, setAutoAdvanceTimer] =
    useState<NodeJS.Timeout | null>(null);

  // DeepResearch integration
  const [deepResearchApp, setDeepResearchApp] =
    useState<DeepResearchApp | null>(null);

  // Knowledge Base state
  const [documentStatus, setDocumentStatus] = useState({
    count: 0,
    totalSize: 0,
    vectorCount: 0,
  });
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);

  // Document Manager states
  const [documentManagerTab, setDocumentManagerTab] = useState<string>("user");
  const [documentSearchQuery, setDocumentSearchQuery] = useState<string>("");
  const [showSemanticResults, setShowSemanticResults] =
    useState<boolean>(false);
  const [semanticSearchResults, setSemanticSearchResults] = useState<any[]>([]);
  const [currentSemanticQuery, setCurrentSemanticQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchThreshold, setSearchThreshold] = useState<number>(0.1);

  // Document preview states
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const [showDocumentPreview, setShowDocumentPreview] =
    useState<boolean>(false);
  const [showChunkView, setShowChunkView] = useState<boolean>(false);
  const [currentChunk, setCurrentChunk] = useState<any>(null);
  const [vectorStore, setVectorStore] = useState<VectorStore | null>(null);
  const [timeCapsuleData, setTimeCapsuleData] = useState<any>(null);

  // Graph state for TimeCapsule integration
  const [graphState, setGraphState] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [conceptExplanations, setConceptExplanations] = useState<
    Record<string, string>
  >({});

  // Confirmation dialog states
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showClearAllConfirmation, setShowClearAllConfirmation] =
    useState(false);
  const [frameToDelete, setFrameToDelete] = useState<string | null>(null);

  // Chapter management states
  const [showChapterDialog, setShowChapterDialog] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [selectedFrameIds, setSelectedFrameIds] = useState<string[]>([]);
  const [showChapterManagement, setShowChapterManagement] = useState(false);
  const [chapterFormData, setChapterFormData] = useState({
    title: "",
    description: "",
    color: "#8B5CF6",
  });

  const videoRef = useRef<HTMLIFrameElement>(null);
  const syncInProgressRef = useRef<boolean>(false);

  // Callback for TimeCapsule updates from FrameGraphIntegration
  const handleTimeCapsuleUpdate = useCallback(
    (newGraphState: any, newChapters: any[]) => {
      setGraphState(newGraphState);
      setChapters(newChapters);
    },
    []
  );

  // Enhanced TimeCapsule Export with Metadata
  const handleExportTimeCapsule = async () => {
    if (!metadataManager || !currentTimeCapsule) {
      // Show TimeCapsule creation dialog if none exists
      setShowTimeCapsuleDialog(true);
      return;
    }

    try {
      // Update current TimeCapsule with latest progress
      const updatedTimeCapsule = metadataManager.updateTimeCapsule(
        currentTimeCapsule.id,
        {
          estimatedDuration: frames.length * 10,
          description: `Learning session with ${frames.length} AI frames. Progress: ${Math.round((currentFrameIndex / frames.length) * 100)}%`,
        }
      );

      // Export using the enhanced format
      const enhancedTimeCapsule = await metadataManager.exportTimeCapsule(
        updatedTimeCapsule.id
      );

      // Create downloadable file
      const blob = new Blob([JSON.stringify(enhancedTimeCapsule, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentBubblSpace?.name || "BubblSpace"}-${enhancedTimeCapsule.timeCapsuleMetadata.name}-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success message
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `📦 Enhanced TimeCapsule exported successfully! 
          
🏢 BubblSpace: ${currentBubblSpace?.name}
📋 TimeCapsule: ${enhancedTimeCapsule.timeCapsuleMetadata.name}
🎯 Contains: ${frames.length} AI frames, research data, and complete session state
📊 Size: ${enhancedTimeCapsule.metadata.fileSize ? MetadataUtils.formatFileSize(enhancedTimeCapsule.metadata.fileSize) : "Unknown"}

This can be imported in any page with full compatibility!`,
        },
      ]);

      // Track export
      pageAnalytics.trackFeatureUsage("enhanced_timecapsule_export", {
        bubblspace_id: currentBubblSpace?.id,
        timecapsule_id: enhancedTimeCapsule.timeCapsuleMetadata.id,
        frames_count: frames.length,
        current_frame: currentFrameIndex,
        mode: isCreationMode ? "creation" : "learning",
        category: enhancedTimeCapsule.timeCapsuleMetadata.category,
        file_size: enhancedTimeCapsule.metadata.fileSize,
      });
    } catch (error) {
      console.error("Failed to export TimeCapsule:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `❌ Failed to export TimeCapsule: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
    }
  };

  const handleImportTimeCapsule = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content);

          // Check if it's an enhanced TimeCapsule format
          if (importedData.timeCapsuleMetadata && importedData.bubblSpace) {
            // Show safe import dialog for enhanced format
            setImportTimeCapsuleData(importedData as EnhancedTimeCapsule);
            setShowSafeImportDialog(true);
            return;
          }

          // Handle legacy format with direct import (for backward compatibility)
          handleLegacyImport(importedData);
        } catch (error) {
          console.error("Failed to parse TimeCapsule data:", error);
          setChatMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: `❌ Failed to import TimeCapsule: Invalid file format. Please ensure you're uploading a valid TimeCapsule JSON file.`,
            },
          ]);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Handle enhanced TimeCapsule import with metadata manager
  const handleEnhancedImport = async (
    options: ImportOptions
  ): Promise<ImportResult> => {
    if (!metadataManager || !importTimeCapsuleData) {
      return {
        success: false,
        message: "Metadata manager not initialized",
        details: { itemsImported: {} },
      };
    }

    try {
      const result = await metadataManager.importTimeCapsule(
        importTimeCapsuleData,
        options
      );

      if (result.success) {
        // Refresh local state
        setAllBubblSpaces(metadataManager.getAllBubblSpaces());
        setAllTimeCapsules(metadataManager.getAllTimeCapsules());

        // Set imported BubblSpace and TimeCapsule as current
        setCurrentBubblSpace(importTimeCapsuleData.bubblSpace);
        setCurrentTimeCapsule(importTimeCapsuleData.timeCapsuleMetadata);

        // If AI-Frames data was imported, update local state
        if (
          options.selectiveImport.aiFrames &&
          importTimeCapsuleData.aiFramesData
        ) {
          const aiFramesData = importTimeCapsuleData.aiFramesData;
          setFrames(aiFramesData.frames || []);
          setCurrentFrameIndex(aiFramesData.currentFrameIndex || 0);
          setIsCreationMode(aiFramesData.isCreationMode || false);
          setShowGraphView(aiFramesData.showGraphView || false);

          // Clear the cleared flag since we're importing new frames
          localStorage.removeItem("ai_frames_cleared");

          if (aiFramesData.graphState) setGraphState(aiFramesData.graphState);
          if (aiFramesData.chapters) setChapters(aiFramesData.chapters);
          if (aiFramesData.voiceSettings)
            setVoiceSettings(aiFramesData.voiceSettings);
          if (aiFramesData.chatMessages)
            setChatMessages(aiFramesData.chatMessages);
        }

        // Show success message with details
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `✅ ${result.message}
            
🎯 Items imported:
${result.details.itemsImported.frames ? `• ${result.details.itemsImported.frames} AI frames` : ""}
${result.details.itemsImported.topics ? `• ${result.details.itemsImported.topics} research topics` : ""}
${result.details.itemsImported.documents ? `• ${result.details.itemsImported.documents} documents` : ""}
${result.details.backupCreated ? `• Backup created: ${result.details.backupCreated}` : ""}`,
          },
        ]);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
        details: { itemsImported: {} },
      };
    }
  };

  // Handle legacy TimeCapsule import for backward compatibility
  const handleLegacyImport = (importedData: any) => {
    try {
      // Validate the data structure
      if (
        !importedData.data ||
        (!importedData.data.frames && !importedData.research)
      ) {
        throw new Error("Invalid TimeCapsule format");
      }

      // Handle AI-Frames specific data
      if (importedData.data.frames) {
        setFrames(importedData.data.frames);
        setCurrentFrameIndex(importedData.data.currentFrameIndex || 0);

        // Clear the cleared flag since we're importing new frames
        localStorage.removeItem("ai_frames_cleared");

        if (importedData.data.isCreationMode !== undefined) {
          setIsCreationMode(importedData.data.isCreationMode);
        }

        if (importedData.data.showGraphView !== undefined) {
          setShowGraphView(importedData.data.showGraphView);
        }

        // Restore graph state and chapters
        if (importedData.data.graphState) {
          setGraphState(importedData.data.graphState);
        }

        if (importedData.data.chapters) {
          setChapters(importedData.data.chapters);
        }

        // Restore voice settings
        if (importedData.data.voiceSettings) {
          setVoiceSettings(importedData.data.voiceSettings);
        }

        if (importedData.data.isVoiceEnabled !== undefined) {
          setIsVoiceEnabled(importedData.data.isVoiceEnabled);
        }

        if (importedData.data.autoAdvanceEnabled !== undefined) {
          setAutoAdvanceEnabled(importedData.data.autoAdvanceEnabled);
        }

        // Restore chat history
        if (importedData.data.chatMessages) {
          setChatMessages(importedData.data.chatMessages);
        }
      }

      // Handle DeepResearch data
      if (importedData.data.deepResearchData || importedData.research) {
        const deepResearchData =
          importedData.data.deepResearchData || importedData;
        setTimeCapsuleData(deepResearchData);
        localStorage.setItem(
          "deepresearch_data",
          JSON.stringify(deepResearchData)
        );
      }

      // Save the imported data
      localStorage.setItem(
        "ai_frames_timecapsule",
        JSON.stringify(importedData)
      );
      localStorage.setItem(
        "timecapsule_combined",
        JSON.stringify(importedData)
      );

      // Show success message
      const frameCount = importedData.data.frames?.length || 0;
      const hasDeepResearch = !!(
        importedData.data.deepResearchData || importedData.research
      );

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🎉 Legacy TimeCapsule imported successfully! Loaded ${frameCount} AI frames${hasDeepResearch ? " and DeepResearch data" : ""}. You can continue where you left off.`,
        },
      ]);

      // Track import
      pageAnalytics.trackFeatureUsage("legacy_timecapsule_import", {
        frames_count: frameCount,
        has_deep_research: hasDeepResearch,
        data_type: importedData.type || "unknown",
      });
    } catch (error) {
      console.error("Failed to import TimeCapsule:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `❌ Failed to import TimeCapsule: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
    }
  };

  // BubblSpace Management Handlers
  const handleCreateBubblSpace = async (
    bubblSpaceData: Partial<BubblSpace>
  ) => {
    if (!metadataManager) return;

    try {
      const newBubblSpace = metadataManager.createBubblSpace(
        bubblSpaceData.name!,
        bubblSpaceData.description!,
        bubblSpaceData
      );

      setAllBubblSpaces(metadataManager.getAllBubblSpaces());
      setCurrentBubblSpace(newBubblSpace);

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🏢 BubblSpace "${newBubblSpace.name}" created successfully! This will organize your learning projects.`,
        },
      ]);
    } catch (error) {
      console.error("Failed to create BubblSpace:", error);
    }
  };

  const handleEditBubblSpace = async (bubblSpaceData: Partial<BubblSpace>) => {
    if (!metadataManager || !editingBubblSpace) return;

    try {
      const updatedBubblSpace = metadataManager.updateBubblSpace(
        editingBubblSpace.id,
        bubblSpaceData
      );

      setAllBubblSpaces(metadataManager.getAllBubblSpaces());
      if (currentBubblSpace?.id === updatedBubblSpace.id) {
        setCurrentBubblSpace(updatedBubblSpace);
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `✏️ BubblSpace "${updatedBubblSpace.name}" updated successfully!`,
        },
      ]);
    } catch (error) {
      console.error("Failed to update BubblSpace:", error);
    }
  };

  const handleDeleteBubblSpace = async (id: string) => {
    if (!metadataManager) return;

    try {
      const bubblSpace = metadataManager.getBubblSpace(id);
      metadataManager.deleteBubblSpace(id);

      setAllBubblSpaces(metadataManager.getAllBubblSpaces());

      // If we deleted the current BubblSpace, switch to another one
      if (currentBubblSpace?.id === id) {
        const remaining = metadataManager.getAllBubblSpaces();
        setCurrentBubblSpace(remaining[0] || null);
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🗑️ BubblSpace "${bubblSpace?.name}" deleted successfully.`,
        },
      ]);
    } catch (error) {
      console.error("Failed to delete BubblSpace:", error);
    }
  };

  // TimeCapsule Management Handlers
  const handleCreateTimeCapsule = async (
    timeCapsuleData: Partial<TimeCapsuleMetadata>
  ) => {
    if (!metadataManager) return;

    try {
      const newTimeCapsule = metadataManager.createTimeCapsule(
        timeCapsuleData.name!,
        timeCapsuleData.description!,
        timeCapsuleData.bubblSpaceId!,
        timeCapsuleData
      );

      setAllTimeCapsules(metadataManager.getAllTimeCapsules());
      setCurrentTimeCapsule(newTimeCapsule);

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `📋 TimeCapsule "${newTimeCapsule.name}" created successfully! Your session data will be organized here.`,
        },
      ]);
    } catch (error) {
      console.error("Failed to create TimeCapsule:", error);
    }
  };

  const handleEditTimeCapsule = async (
    timeCapsuleData: Partial<TimeCapsuleMetadata>
  ) => {
    if (!metadataManager || !editingTimeCapsule) return;

    try {
      const updatedTimeCapsule = metadataManager.updateTimeCapsule(
        editingTimeCapsule.id,
        timeCapsuleData
      );

      setAllTimeCapsules(metadataManager.getAllTimeCapsules());
      if (currentTimeCapsule?.id === updatedTimeCapsule.id) {
        setCurrentTimeCapsule(updatedTimeCapsule);
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `📝 TimeCapsule "${updatedTimeCapsule.name}" updated successfully!`,
        },
      ]);
    } catch (error) {
      console.error("Failed to update TimeCapsule:", error);
    }
  };

  const handleDeleteTimeCapsule = async (id: string) => {
    if (!metadataManager) return;

    try {
      const timeCapsule = metadataManager.getTimeCapsule(id);
      metadataManager.deleteTimeCapsule(id);

      setAllTimeCapsules(metadataManager.getAllTimeCapsules());

      // If we deleted the current TimeCapsule, switch to another one or create new
      if (currentTimeCapsule?.id === id) {
        const remaining = metadataManager.getAllTimeCapsules();
        setCurrentTimeCapsule(remaining[0] || null);
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🗑️ TimeCapsule "${timeCapsule?.name}" deleted successfully.`,
        },
      ]);
    } catch (error) {
      console.error("Failed to delete TimeCapsule:", error);
    }
  };

  // Chapter Management Functions
  const handleCreateChapter = async () => {
    if (!chapterFormData.title.trim()) {
      alert("Chapter title is required");
      return;
    }

    if (selectedFrameIds.length === 0) {
      alert("Please select at least one frame to group into the chapter");
      return;
    }

    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: chapterFormData.title,
      description: chapterFormData.description,
      color: chapterFormData.color,
      order: chapters.length + 1,
      frameIds: [...selectedFrameIds],
      bubblSpaceId: currentBubblSpace?.id || "default",
      timeCapsuleId: currentTimeCapsule?.id || "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCollapsed: false,
    };

    // Update frames to belong to this chapter
    const updatedFrames = frames.map((frame) => {
      if (selectedFrameIds.includes(frame.id)) {
        return {
          ...frame,
          parentFrameId: newChapter.id,
          type: "frame" as const,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });

    setChapters((prev) => [...prev, newChapter]);
    setFrames(updatedFrames);
    setSelectedFrameIds([]);
    setChapterFormData({ title: "", description: "", color: "#8B5CF6" });
    setShowChapterDialog(false);

    setChatMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: `✅ Chapter "${newChapter.title}" created successfully with ${selectedFrameIds.length} frames!`,
      },
    ]);
  };

  const handleEditChapter = async () => {
    if (!editingChapter || !chapterFormData.title.trim()) {
      alert("Chapter title is required");
      return;
    }

    const updatedChapter: Chapter = {
      ...editingChapter,
      title: chapterFormData.title,
      description: chapterFormData.description,
      color: chapterFormData.color,
      updatedAt: new Date().toISOString(),
    };

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === editingChapter.id ? updatedChapter : chapter
      )
    );

    setEditingChapter(null);
    setChapterFormData({ title: "", description: "", color: "#8B5CF6" });
    setShowChapterDialog(false);

    setChatMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: `✅ Chapter "${updatedChapter.title}" updated successfully!`,
      },
    ]);
  };

  const handleDeleteChapter = async (chapterId: string) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    if (
      !confirm(
        `Are you sure you want to delete chapter "${chapter.title}"? Frames will be ungrouped but not deleted.`
      )
    ) {
      return;
    }

    // Remove chapter reference from frames
    const updatedFrames = frames.map((frame) => {
      if (frame.parentFrameId === chapterId) {
        return {
          ...frame,
          parentFrameId: undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });

    setChapters((prev) => prev.filter((c) => c.id !== chapterId));
    setFrames(updatedFrames);

    setChatMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: `✅ Chapter "${chapter.title}" deleted. ${chapter.frameIds.length} frames have been ungrouped.`,
      },
    ]);
  };

  const handleAddFramesToChapter = (chapterId: string, frameIds: string[]) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    // Add frames to chapter
    const updatedChapter = {
      ...chapter,
      frameIds: [...new Set([...chapter.frameIds, ...frameIds])],
      updatedAt: new Date().toISOString(),
    };

    // Update frames to belong to this chapter
    const updatedFrames = frames.map((frame) => {
      if (frameIds.includes(frame.id)) {
        return {
          ...frame,
          parentFrameId: chapterId,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });

    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? updatedChapter : c))
    );
    setFrames(updatedFrames);
  };

  const handleRemoveFramesFromChapter = (
    chapterId: string,
    frameIds: string[]
  ) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    // Remove frames from chapter
    const updatedChapter = {
      ...chapter,
      frameIds: chapter.frameIds.filter((id: string) => !frameIds.includes(id)),
      updatedAt: new Date().toISOString(),
    };

    // Remove chapter reference from frames
    const updatedFrames = frames.map((frame) => {
      if (frameIds.includes(frame.id) && frame.parentFrameId === chapterId) {
        return {
          ...frame,
          parentFrameId: undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });

    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? updatedChapter : c))
    );
    setFrames(updatedFrames);
  };

  const handleToggleChapterCollapse = (chapterId: string) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isCollapsed: !chapter.isCollapsed }
          : chapter
      )
    );
  };

  const openCreateChapterDialog = () => {
    setEditingChapter(null);
    setChapterFormData({ title: "", description: "", color: "#8B5CF6" });
    setShowChapterDialog(true);
  };

  const openEditChapterDialog = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setChapterFormData({
      title: chapter.title,
      description: chapter.description,
      color: chapter.color,
    });
    setShowChapterDialog(true);
  };

  const handleFrameSelection = (frameId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFrameIds((prev) => [...prev, frameId]);
    } else {
      setSelectedFrameIds((prev) => prev.filter((id) => id !== frameId));
    }
  };

  const handleSelectAllFrames = () => {
    const unassignedFrames = frames.filter((frame) => !frame.parentFrameId);
    setSelectedFrameIds(unassignedFrames.map((frame) => frame.id));
  };

  const handleDeselectAllFrames = () => {
    setSelectedFrameIds([]);
  };

  const getChapterFrames = (chapterId: string) => {
    return frames.filter((frame) => frame.parentFrameId === chapterId);
  };

  const getUnassignedFrames = () => {
    return frames.filter((frame) => !frame.parentFrameId);
  };

  // Load frames from Knowledge Base for real-time consistency
  const loadFramesFromKnowledgeBase = useCallback(async (): Promise<
    AIFrame[]
  > => {
    try {
      if (!vectorStore || !vectorStoreInitialized) {
        console.log("📊 VectorStore not available for loading frames");
        return [];
      }

      console.log("🔍 Loading frames from Knowledge Base...");

      // Get all documents and filter for AI-Frame documents
      const allDocuments = await vectorStore.getAllDocuments();
      const aiFrameDocuments = allDocuments.filter(
        (doc) =>
          (doc.metadata?.source === "ai-frames-auto-sync" ||
            doc.metadata?.source === "ai-frames") &&
          doc.id?.startsWith("aiframe-")
      );

      console.log(
        `📊 Found ${aiFrameDocuments.length} AI-Frame documents in Knowledge Base`
      );

      // FIXED: Add more detailed logging for debugging
      if (aiFrameDocuments.length > 0) {
        console.log(
          "📊 AI-Frame documents found:",
          aiFrameDocuments.map((doc) => ({
            id: doc.id,
            title: doc.title,
            hasMetadata: !!doc.metadata,
            source: doc.metadata?.source,
          }))
        );
      } else {
        // CRITICAL FIX: Add debugging to see what documents exist in KB
        console.log(
          "🔍 DEBUG: No AI-Frame documents found, checking all documents in KB:"
        );
        console.log(
          "📊 All documents in KB:",
          allDocuments.map((doc) => ({
            id: doc.id,
            title: doc.title,
            hasMetadata: !!doc.metadata,
            source: doc.metadata?.source,
            startsWithAiframe: doc.id?.startsWith("aiframe-"),
          }))
        );
      }

      if (aiFrameDocuments.length === 0) {
        console.log("📊 No AI-Frame documents found in Knowledge Base");
        return [];
      }

      // Helper function to extract content between markers
      const extractFromContent = (content: string, marker: string): string => {
        // Enhanced extraction with support for both simple and complex patterns
        switch (marker) {
          case "Goal:":
            // Look for "Learning Goal: ..." pattern first, then fallback to simple "Goal:"
            const goalMatch = content.match(/Learning Goal: (.*?)(?:\n|$)/);
            if (goalMatch) return goalMatch[1].trim();
            break;
          case "Information:":
            // Look for "Context & Background:" pattern first, then fallback to simple "Information:"
            const infoMatch = content.match(
              /Context & Background:\n([\s\S]*?)(?:\n\nAfter Video Content:|$)/
            );
            if (infoMatch) return infoMatch[1].trim();
            break;
          case "After Video:":
            // Look for "After Video Content:" pattern
            const afterVideoMatch = content.match(
              /After Video Content:\n([\s\S]*?)(?:\n\nAI Concepts:|$)/
            );
            if (afterVideoMatch) return afterVideoMatch[1].trim();
            break;
          case "Concepts:":
            // Look for "AI Concepts:" pattern
            const conceptsMatch = content.match(/AI Concepts: (.*?)(?:\n|$)/);
            if (conceptsMatch) return conceptsMatch[1].trim();
            break;
        }

        // Fallback to original simple line-based extraction
        const lines = content.split("\n");
        const markerLine = lines.find((line) => line.startsWith(marker));
        return markerLine ? markerLine.substring(marker.length).trim() : "";
      };

      // Convert KB documents back to AIFrame objects
      const validFrames: AIFrame[] = [];

      for (const doc of aiFrameDocuments) {
        try {
          // Extract title properly - handle both "AI-Frame: " and "AI-Frame [X]: " patterns
          const extractTitleFromDocTitle = (docTitle: string) => {
            // First try to match "AI-Frame [X]: Title" pattern
            const match = docTitle.match(/AI-Frame \[\d+\]: (.*)/);
            if (match) return match[1];

            // Fallback to "AI-Frame: Title" pattern
            const fallbackMatch = docTitle.match(/AI-Frame: (.*)/);
            if (fallbackMatch) return fallbackMatch[1];

            return docTitle;
          };

          // Extract video URL with validation
          const rawVideoUrl = extractFromContent(doc.content, "- URL:") || "";
          const cleanVideoUrl =
            rawVideoUrl === "No video attachment" || rawVideoUrl === "No video"
              ? ""
              : rawVideoUrl;

          const frame: AIFrame = {
            id: doc.id?.replace("aiframe-", "") || doc.id,
            title:
              extractFromContent(doc.content, "Frame:") ||
              extractTitleFromDocTitle(doc.title || "") ||
              "Untitled",
            goal:
              extractFromContent(doc.content, "Goal:") || "No goal specified",
            informationText:
              extractFromContent(doc.content, "Information:") ||
              "No information provided",
            videoUrl: cleanVideoUrl,
            startTime:
              parseInt(
                extractFromContent(doc.content, "- Start Time:")?.replace(
                  "s",
                  ""
                ) || "0"
              ) || 0,
            duration:
              parseInt(
                extractFromContent(doc.content, "- Duration:")?.replace(
                  "s",
                  ""
                ) || "300"
              ) || 300,
            afterVideoText:
              extractFromContent(doc.content, "After Video:") ||
              "No after video text",
            aiConcepts:
              extractFromContent(doc.content, "Concepts:")
                ?.split(", ")
                .filter((c: string) => c.trim()) || [],
            isGenerated: doc.metadata?.isGenerated || false,
            order: (doc.metadata as any)?.frameOrder || 1,
            bubblSpaceId: (doc.metadata as any)?.bubblSpaceId || "default",
            timeCapsuleId: (doc.metadata as any)?.timeCapsuleId || "default",
            type: (doc.metadata as any)?.frameType || "frame",
            createdAt:
              (doc.metadata as any)?.createdAt || new Date().toISOString(),
            updatedAt:
              (doc.metadata as any)?.updatedAt || new Date().toISOString(),
            attachment: (doc.metadata as any)?.attachment,
          };

          // ENHANCED DEBUG: Log video URL extraction process
          console.log("🔍 Video URL extraction debug:", {
            frameId: frame.id,
            frameTitle: frame.title,
            rawVideoUrl,
            cleanVideoUrl,
            isNoVideo: rawVideoUrl === "No video attachment",
            finalVideoUrl: frame.videoUrl,
            hasAttachmentInMetadata: !!(doc.metadata as any)?.attachment,
            hasVideoUrl: !!frame.videoUrl,
            docContent: doc.content.substring(0, 500) + "...", // Show first 500 chars of content
          });

          // ENHANCED: Debug attachment restoration and try alternative methods
          console.log("🔍 ATTACHMENT RESTORATION DEBUG:", {
            frameId: frame.id,
            frameTitle: frame.title,
            hasAttachmentInMetadata: !!(doc.metadata as any)?.attachment,
            metadataAttachment: (doc.metadata as any)?.attachment,
            docContent: doc.content.substring(0, 1000),
            metadataKeys: Object.keys(doc.metadata || {}),
            fullMetadata: doc.metadata,
          });

          // ENHANCED: Try to restore attachment from content if metadata is missing
          if (!frame.attachment && doc.content) {
            // First try to restore video attachment from the main video section
            const videoUrlMatch = doc.content.match(
              /Video Attachment:\s*\n- URL: (.*?)(?:\n|$)/
            );
            if (videoUrlMatch && videoUrlMatch[1] !== "No video attachment") {
              const startTimeMatch = doc.content.match(/- Start Time: (\d+)s/);
              const durationMatch = doc.content.match(/- Duration: (\d+)s/);

              frame.attachment = {
                id: `video-${frame.id}`,
                type: "video",
                name: "Video Attachment",
                data: {
                  videoUrl: videoUrlMatch[1],
                  startTime: startTimeMatch ? parseInt(startTimeMatch[1]) : 0,
                  duration: durationMatch ? parseInt(durationMatch[1]) : 300,
                },
              };
              console.log(
                "✅ RESTORED video attachment from content:",
                frame.attachment
              );
            } else {
              // Try to restore PDF attachment from the PDF section
              const pdfUrlMatch = doc.content.match(
                /PDF Attachment:\s*\n- URL: (.*?)(?:\n|$)/
              );
              if (pdfUrlMatch && pdfUrlMatch[1] !== "No PDF URL") {
                const pdfPagesMatch = doc.content.match(
                  /PDF Attachment:[\s\S]*?- Pages: (.*?)(?:\n|$)/
                );
                const pdfTitleMatch = doc.content.match(
                  /PDF Attachment:[\s\S]*?- Title: (.*?)(?:\n|$)/
                );
                const pdfNotesMatch = doc.content.match(
                  /PDF Attachment:[\s\S]*?- Notes: (.*?)(?:\n|$)/
                );

                frame.attachment = {
                  id: `pdf-${frame.id}`,
                  type: "pdf",
                  name: "PDF Attachment",
                  data: {
                    pdfUrl: pdfUrlMatch[1],
                    pages: pdfPagesMatch ? pdfPagesMatch[1] : "All pages",
                    title: pdfTitleMatch ? pdfTitleMatch[1] : "PDF Document",
                    notes: pdfNotesMatch ? pdfNotesMatch[1] : "",
                  },
                };
                console.log(
                  "✅ RESTORED PDF attachment from content:",
                  frame.attachment
                );
              } else {
                // Try to restore text attachment from the text section
                const textContentMatch = doc.content.match(
                  /Text Attachment:\s*\n- Content: (.*?)(?:\n|$)/
                );
                if (
                  textContentMatch &&
                  textContentMatch[1] !== "No text content"
                ) {
                  const textTitleMatch = doc.content.match(
                    /Text Attachment:[\s\S]*?- Title: (.*?)(?:\n|$)/
                  );
                  const textNotesMatch = doc.content.match(
                    /Text Attachment:[\s\S]*?- Notes: (.*?)(?:\n|$)/
                  );

                  frame.attachment = {
                    id: `text-${frame.id}`,
                    type: "text",
                    name: "Text Attachment",
                    data: {
                      text: textContentMatch[1],
                      title: textTitleMatch
                        ? textTitleMatch[1]
                        : "Text Content",
                      notes: textNotesMatch ? textNotesMatch[1] : "",
                    },
                  };
                  console.log(
                    "✅ RESTORED text attachment from content:",
                    frame.attachment
                  );
                } else {
                  // Fallback: try to restore from additional attachment section
                  const attachmentMatch = doc.content.match(
                    /Additional Attachment:\s*\n- Type: (.*?)\n- Name: (.*?)\n[\s\S]*?- Data: (.*?)(?:\n|$)/
                  );
                  if (attachmentMatch) {
                    const [, type, name, hasData] = attachmentMatch;
                    if (type !== "Unknown" && hasData === "Available") {
                      // Try to reconstruct attachment from content
                      if (type === "video") {
                        const videoUrlMatch =
                          doc.content.match(/- URL: (.*?)(?:\n|$)/);
                        const startTimeMatch =
                          doc.content.match(/- Start Time: (\d+)s/);
                        const durationMatch =
                          doc.content.match(/- Duration: (\d+)s/);

                        if (
                          videoUrlMatch &&
                          videoUrlMatch[1] !== "No video attachment"
                        ) {
                          frame.attachment = {
                            id: `video-${frame.id}`,
                            type: "video",
                            name: name || "Video Attachment",
                            data: {
                              videoUrl: videoUrlMatch[1],
                              startTime: startTimeMatch
                                ? parseInt(startTimeMatch[1])
                                : 0,
                              duration: durationMatch
                                ? parseInt(durationMatch[1])
                                : 300,
                            },
                          };
                          console.log(
                            "✅ RESTORED attachment from additional section:",
                            frame.attachment
                          );
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          // Debug: Log attachment data being restored
          if (frame.attachment) {
            console.log("📹 Restoring frame with attachment:", {
              frameId: frame.id,
              frameTitle: frame.title,
              attachmentType: frame.attachment.type,
              attachmentData: frame.attachment.data,
              fullAttachment: frame.attachment,
              restoredFromContent: !!(doc.metadata as any)?.attachment
                ? false
                : true,
            });
          } else {
            console.log("📹 Frame has no attachment:", {
              frameId: frame.id,
              frameTitle: frame.title,
              metadata: (doc.metadata as any)?.attachment,
              triedContentRestore: true,
            });
          }

          validFrames.push(frame);
        } catch (docError) {
          console.warn("⚠️ Failed to parse KB document:", doc.id, docError);
        }
      }

      // Sort by order
      const kbFrames = validFrames.sort(
        (a: AIFrame, b: AIFrame) => (a.order || 1) - (b.order || 1)
      );

      console.log(
        `✅ Successfully loaded ${kbFrames.length} frames from Knowledge Base`
      );

      // FIXED: Add validation to ensure we have valid frames
      if (kbFrames.length === 0) {
        console.log(
          "⚠️ Knowledge Base documents found but no valid frames could be parsed"
        );
        return [];
      }

      return kbFrames;
    } catch (error) {
      console.error("❌ Failed to load frames from Knowledge Base:", error);
      return [];
    }
  }, [vectorStore, vectorStoreInitialized]);

  // Load frames from storage with Knowledge Base priority for real-time consistency
  const loadFramesFromStorage = useCallback(async () => {
    try {
      // PRIORITY 1: Try to load from Knowledge Base first (most recent data)
      // ENHANCED: Check VectorStore's actual initialized state for better reliability
      if (vectorStore && vectorStore.initialized) {
        console.log(
          "🔍 Priority 1: Checking Knowledge Base for latest frames..."
        );

        // FIXED: Add retry logic for KB loading to handle race conditions
        let kbFrames: AIFrame[] = [];
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
          try {
            kbFrames = await loadFramesFromKnowledgeBase();
            console.log(
              `📊 KB load attempt ${retryCount + 1}: Found ${kbFrames.length} frames`
            );

            if (kbFrames && kbFrames.length > 0) {
              console.log(
                `📊 Found ${kbFrames.length} frames in Knowledge Base after ${retryCount + 1} attempts, using as primary source`
              );
              setFrames(kbFrames);
              setCurrentFrameIndex(0); // Start with first frame

              // FIXED: Load graph connections from storage
              await loadGraphConnections();

              // Sync IndexedDB with KB data to keep it updated
              if (graphStorageManager) {
                try {
                  await graphStorageManager.saveFrameSequence(kbFrames, 0, {
                    updatedAt: new Date().toISOString(),
                    bubblSpaceId: "default",
                    timeCapsuleId: "default",
                  });
                  console.log("✅ IndexedDB synced with Knowledge Base data");
                } catch (syncError) {
                  console.warn(
                    "⚠️ Failed to sync IndexedDB with KB data:",
                    syncError
                  );
                }
              }

              // FIX 1: Dispatch event to initialize real-time sync tracking
              window.dispatchEvent(
                new CustomEvent("kb-frames-loaded", {
                  detail: {
                    frames: kbFrames,
                    source: "knowledge-base-load",
                    timestamp: new Date().toISOString(),
                  },
                })
              );
              console.log(
                "📡 Dispatched kb-frames-loaded event for real-time sync initialization"
              );

              console.log("✅ Frames loaded from Knowledge Base successfully");
              return true;
            }

            // If no frames found, wait and retry
            if (retryCount < maxRetries - 1) {
              console.log(
                `⏳ No frames found in KB, retrying in 500ms... (attempt ${retryCount + 1}/${maxRetries})`
              );
              await new Promise((resolve) => setTimeout(resolve, 500));
            } else {
              console.log(
                "📊 Knowledge Base is available but contains no frames after all retries"
              );
            }
          } catch (kbError) {
            console.warn(
              `⚠️ KB load attempt ${retryCount + 1} failed:`,
              kbError
            );
            if (retryCount < maxRetries - 1) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            } else {
              console.warn(
                "⚠️ Failed to load from Knowledge Base after all retries, falling back to IndexedDB"
              );
            }
          }
          retryCount++;
        }
      } else {
        console.log(
          "📊 Knowledge Base not available (vectorStore:",
          !!vectorStore,
          ", initialized:",
          vectorStore?.initialized,
          ")"
        );
      }

      // PRIORITY 2: Fall back to GraphStorageManager (IndexedDB) if KB is not available
      if (graphStorageManager) {
        console.log(
          "📊 Priority 2: Loading frames from IndexedDB via GraphStorageManager..."
        );

        const frameSequence = await graphStorageManager.loadFrameSequence();
        const sessionState = await graphStorageManager.loadSessionState();

        if (frameSequence && frameSequence.frames.length > 0) {
          console.log(
            "📊 Loading frames from IndexedDB:",
            frameSequence.frames.length
          );
          setFrames(frameSequence.frames);
          setCurrentFrameIndex(frameSequence.currentFrameIndex || 0);

          // Update session state if available
          if (sessionState) {
            setIsCreationMode(sessionState.isCreationMode);
            setShowGraphView(sessionState.showGraphView);
            setChapters(sessionState.chapters || []);
            setGraphState(sessionState.graphState);
          }

          // FIXED: Load graph connections from storage
          await loadGraphConnections();

          console.log("✅ Frames loaded from IndexedDB successfully");

          // FINAL FIX: Force UI update after loading frames from storage
          setTimeout(() => {
            console.log(
              "🔄 Forcing UI update after loading frames from storage"
            );
            // Force re-render by updating state again
            setFrames(frameSequence.frames);
          }, 100);

          // TASK 2: Force KB sync when frames are loaded from storage to ensure consistency
          if (
            vectorStore &&
            vectorStoreInitialized &&
            processingAvailable &&
            frameSequence.frames.length > 0
          ) {
            console.log(
              "🔄 Forcing KB sync after loading frames from storage..."
            );
            try {
              await syncGraphChangesToKB(frameSequence.frames);
              console.log(
                "✅ KB sync completed after loading frames from storage"
              );
            } catch (error) {
              console.error(
                "❌ Failed to sync KB after loading frames from storage:",
                error
              );
            }
          }

          return true;
        }
      }

      // PRIORITY 3: Fall back to localStorage (final fallback)
      console.log(
        "📊 Priority 3: Loading frames from localStorage as final fallback..."
      );

      // UNIFIED STORAGE APPROACH: Check both storage locations and use the most recent
      const timeCapsuleData = localStorage.getItem("ai_frames_timecapsule");
      const graphData = localStorage.getItem("ai_frames_graph_state");

      let timeCapsuleParsed = null;
      let graphParsed = null;
      let timeCapsuleLastSaved = null;
      let graphLastSaved = null;

      // Parse TimeCapsule data
      if (timeCapsuleData) {
        try {
          timeCapsuleParsed = JSON.parse(timeCapsuleData);
          timeCapsuleLastSaved =
            timeCapsuleParsed.data?.lastSaved ||
            timeCapsuleParsed.data?.lastGraphSave ||
            null;
        } catch (error) {
          console.warn("⚠️ Failed to parse TimeCapsule data:", error);
        }
      }

      // Parse Graph data
      if (graphData) {
        try {
          graphParsed = JSON.parse(graphData);
          graphLastSaved = graphParsed.lastSaved || null;
        } catch (error) {
          console.warn("⚠️ Failed to parse Graph data:", error);
        }
      }

      // Determine which data source to use based on timestamp
      let useTimeCapsule = false;
      let useGraph = false;

      if (
        timeCapsuleParsed?.data?.frames &&
        Array.isArray(timeCapsuleParsed.data.frames)
      ) {
        useTimeCapsule = true;
      }

      if (graphParsed?.frames && Array.isArray(graphParsed.frames)) {
        useGraph = true;
      }

      // If both exist, use the most recent
      if (
        useTimeCapsule &&
        useGraph &&
        timeCapsuleLastSaved &&
        graphLastSaved
      ) {
        const timeCapsuleTime = new Date(timeCapsuleLastSaved).getTime();
        const graphTime = new Date(graphLastSaved).getTime();

        if (graphTime > timeCapsuleTime) {
          useTimeCapsule = false;
          console.log(
            "📊 Using Graph data (more recent):",
            graphLastSaved,
            "vs",
            timeCapsuleLastSaved
          );
        } else {
          useGraph = false;
          console.log(
            "📊 Using TimeCapsule data (more recent):",
            timeCapsuleLastSaved,
            "vs",
            graphLastSaved
          );
        }
      }

      // Load from selected source
      if (useTimeCapsule && timeCapsuleParsed) {
        console.log(
          "📊 Loading frames from localStorage TimeCapsule:",
          timeCapsuleParsed.data.frames.length
        );
        setFrames(timeCapsuleParsed.data.frames);
        setCurrentFrameIndex(timeCapsuleParsed.data.currentFrameIndex || 0);

        // Update other state if available
        if (timeCapsuleParsed.data.isCreationMode !== undefined) {
          setIsCreationMode(timeCapsuleParsed.data.isCreationMode);
        }
        if (timeCapsuleParsed.data.showGraphView !== undefined) {
          setShowGraphView(timeCapsuleParsed.data.showGraphView);
        }
        if (timeCapsuleParsed.data.graphState) {
          setGraphState(timeCapsuleParsed.data.graphState);
        }
        if (timeCapsuleParsed.data.chapters) {
          setChapters(timeCapsuleParsed.data.chapters);
        }

        console.log(
          "✅ Frames loaded from localStorage TimeCapsule successfully"
        );

        // TASK 2: Force KB sync when frames are loaded from storage to ensure consistency
        if (
          vectorStore &&
          vectorStoreInitialized &&
          processingAvailable &&
          timeCapsuleParsed.data.frames.length > 0
        ) {
          console.log(
            "🔄 Forcing KB sync after loading frames from TimeCapsule storage..."
          );
          try {
            await syncGraphChangesToKB(timeCapsuleParsed.data.frames);
            console.log(
              "✅ KB sync completed after loading frames from TimeCapsule storage"
            );

            // CRITICAL FIX: Reload frames from KB to get attachment data
            console.log(
              "🔄 Reloading frames from KB to restore attachment data..."
            );
            const kbFrames = await loadFramesFromKnowledgeBase();
            if (kbFrames.length > 0) {
              console.log(
                "✅ Frames reloaded from KB with attachment data restored"
              );
              setFrames(kbFrames);
            }
          } catch (error) {
            console.error(
              "❌ Failed to sync KB after loading frames from TimeCapsule storage:",
              error
            );
          }
        }

        return true;
      }

      if (useGraph && graphParsed) {
        console.log(
          "📊 Loading frames from localStorage Graph state:",
          graphParsed.frames.length
        );
        setFrames(graphParsed.frames);
        setCurrentFrameIndex(0); // Reset to first frame

        // Update other state if available
        if (graphParsed.graphState) {
          setGraphState(graphParsed.graphState);
        }
        if (graphParsed.chapters) {
          setChapters(graphParsed.chapters);
        }

        console.log(
          "✅ Frames loaded from localStorage Graph state successfully"
        );

        // TASK 2: Force KB sync when frames are loaded from storage to ensure consistency
        if (
          vectorStore &&
          vectorStoreInitialized &&
          processingAvailable &&
          graphParsed.frames.length > 0
        ) {
          console.log(
            "🔄 Forcing KB sync after loading frames from Graph state storage..."
          );
          try {
            await syncGraphChangesToKB(graphParsed.frames);
            console.log(
              "✅ KB sync completed after loading frames from Graph state storage"
            );

            // CRITICAL FIX: Reload frames from KB to get attachment data
            console.log(
              "🔄 Reloading frames from KB to restore attachment data..."
            );
            const kbFrames = await loadFramesFromKnowledgeBase();
            if (kbFrames.length > 0) {
              console.log(
                "✅ Frames reloaded from KB with attachment data restored"
              );
              setFrames(kbFrames);
            }
          } catch (error) {
            console.error(
              "❌ Failed to sync KB after loading frames from Graph state storage:",
              error
            );
          }
        }

        return true;
      }

      console.log("ℹ️ No frames found in any storage");
      return false;
    } catch (error) {
      console.error("❌ Failed to load frames from storage:", error);
      return false;
    }
  }, [graphStorageManager]);

  // Save frames to storage (bidirectional sync)
  const saveFramesToStorage = useCallback(async () => {
    try {
      // Primary: Save to GraphStorageManager (IndexedDB) if available
      if (graphStorageManager) {
        console.log("💾 Saving frames to IndexedDB via GraphStorageManager...");

        // Save frame sequence
        await graphStorageManager.saveFrameSequence(frames, currentFrameIndex, {
          bubblSpaceId: currentBubblSpace?.id,
          timeCapsuleId: currentTimeCapsule?.id,
        });

        // Save session state with graph connections
        await graphStorageManager.saveSessionState({
          isCreationMode,
          showGraphView,
          chapters,
          graphState,
          lastActiveFrame: currentFrameIndex,
        });

        // FIXED: Save graph layout with connections
        if (
          graphState &&
          (graphState.nodes.length > 0 || graphState.edges.length > 0)
        ) {
          await graphStorageManager.saveGraphLayout({
            nodes: graphState.nodes,
            edges: graphState.edges,
            viewport: graphState.viewport,
          });
          // console.log("🔗 Graph connections saved to IndexedDB");
        }

        // console.log("✅ Frames and connections saved to IndexedDB successfully");
      }

      // Fallback/Compatibility: Save to localStorage
      const timeCapsuleData = {
        data: {
          frames: frames,
          currentFrameIndex: currentFrameIndex,
          isCreationMode: isCreationMode,
          showGraphView: showGraphView,
          graphState: graphState,
          chapters: chapters,
          lastSaved: new Date().toISOString(),
        },
      };

      // FIXED: Also save graph connections to localStorage for backup
      if (
        graphState &&
        (graphState.nodes.length > 0 || graphState.edges.length > 0)
      ) {
        const graphConnectionsData = {
          nodes: graphState.nodes,
          edges: graphState.edges,
          viewport: graphState.viewport,
          lastSaved: new Date().toISOString(),
        };
        localStorage.setItem(
          "ai_frames_graph_connections",
          JSON.stringify(graphConnectionsData)
        );
        // console.log("🔗 Graph connections saved to localStorage backup");
      }

      localStorage.setItem(
        "ai_frames_timecapsule",
        JSON.stringify(timeCapsuleData)
      );

      // Also save to graph state format for compatibility
      const graphData = {
        frames: frames,
        graphState: graphState,
        chapters: chapters,
        activeView: showGraphView ? "graph" : "linear",
        lastSaved: new Date().toISOString(),
      };

      localStorage.setItem("ai_frames_graph_state", JSON.stringify(graphData));

      // console.log("💾 Frames saved to localStorage (compatibility)");
    } catch (error) {
      console.error("❌ Failed to save frames to storage:", error);
    }
  }, [
    frames,
    currentFrameIndex,
    isCreationMode,
    showGraphView,
    graphState,
    chapters,
    graphStorageManager,
    currentBubblSpace,
    currentTimeCapsule,
  ]);

  // App initialization - Check for existing data
  useEffect(() => {
    console.log("🎯 AI-Frames app initializing...");

    // Check if user explicitly cleared data
    const wasCleared = localStorage.getItem("ai_frames_cleared");
    if (wasCleared) {
      console.log("🗑️ App was previously cleared, staying empty");
      localStorage.removeItem("ai_frames_cleared");
      return;
    }

    // Try to load existing frame data
    loadFramesFromStorage()
      .then((loaded) => {
        if (loaded) {
          console.log("✅ AI-Frames initialized with existing data");
          // Note: Don't show welcome message here, it will be set by loadFramesFromStorage
        } else {
          console.log("🎯 AI-Frames initialized with empty state");
          setChatMessages([
            {
              role: "ai",
              content: `👋 Welcome to AI-Frames! I'm here to help you create interactive learning experiences.\n\n🎯 Get started by:\n• Switching to **Creator Mode** and creating your first frame\n• Or **importing a TimeCapsule** to load existing content\n\nBoth Linear and Graph views are available for organizing your frames.`,
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("❌ Failed to load frames during initialization:", error);
      });
  }, [loadFramesFromStorage]);

  // Initialize metadata manager and load BubblSpaces/TimeCapsules
  useEffect(() => {
    const initializeMetadata = async () => {
      try {
        const manager = getMetadataManager(vectorStore);
        setMetadataManager(manager);

        // Load BubblSpaces and TimeCapsules
        const bubblSpaces = manager.getAllBubblSpaces();
        const timeCapsules = manager.getAllTimeCapsules();

        setAllBubblSpaces(bubblSpaces);
        setAllTimeCapsules(timeCapsules);

        // Set current BubblSpace (default or first available)
        const defaultBubblSpace = manager.getDefaultBubblSpace();
        setCurrentBubblSpace(defaultBubblSpace || bubblSpaces[0] || null);

        // FIXED: Use existing TimeCapsules instead of creating new ones
        if (bubblSpaces.length > 0) {
          const targetBubblSpace = defaultBubblSpace || bubblSpaces[0];

          // Get existing TimeCapsules for this BubblSpace
          const existingTimeCapsules = manager
            .getTimeCapsulesByBubblSpace(targetBubblSpace.id)
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );

          if (existingTimeCapsules.length > 0) {
            // Use the most recent existing TimeCapsule
            setCurrentTimeCapsule(existingTimeCapsules[0]);
            console.log(
              `✅ Using existing TimeCapsule: ${existingTimeCapsules[0].name}`
            );
          } else {
            // Only create a new TimeCapsule if none exist for this BubblSpace
            try {
              const newTimeCapsule = manager.createTimeCapsule(
                "AI-Frames Session",
                "Learning session with AI-Frames",
                targetBubblSpace.id,
                {
                  category: "learning",
                  difficulty: "intermediate",
                  estimatedDuration: frames.length * 10, // Estimate 10 mins per frame
                }
              );
              setCurrentTimeCapsule(newTimeCapsule);
              setAllTimeCapsules((prev) => [...prev, newTimeCapsule]);
              console.log(`✅ Created new TimeCapsule: ${newTimeCapsule.name}`);
            } catch (createError) {
              console.warn(
                "⚠️ Could not create TimeCapsule (may have hit limit), using first available:",
                createError
              );
              // If we can't create a new TimeCapsule, use the first available one from any BubblSpace
              const anyTimeCapsule =
                timeCapsules.length > 0 ? timeCapsules[0] : null;
              setCurrentTimeCapsule(anyTimeCapsule);
              if (anyTimeCapsule) {
                console.log(
                  `✅ Using fallback TimeCapsule: ${anyTimeCapsule.name}`
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to initialize metadata manager:", error);

        // Fallback: try to load any existing TimeCapsules
        try {
          const manager = getMetadataManager(vectorStore);
          const existingTimeCapsules = manager.getAllTimeCapsules();
          if (existingTimeCapsules.length > 0) {
            setCurrentTimeCapsule(existingTimeCapsules[0]);
            setAllTimeCapsules(existingTimeCapsules);
            console.log(
              `✅ Fallback: Using existing TimeCapsule: ${existingTimeCapsules[0].name}`
            );
          }
        } catch (fallbackError) {
          console.error("Failed to load existing TimeCapsules:", fallbackError);
        }
      }
    };

    if (typeof window !== "undefined") {
      initializeMetadata();
    }
  }, [vectorStore, frames.length]);

  // Initialize DeepResearch integration with VectorStoreProvider
  useEffect(() => {
    // Check if there's a global DeepResearch instance
    if (typeof window !== "undefined" && (window as any).deepResearchApp) {
      setDeepResearchApp((window as any).deepResearchApp);
    }

    // Load TimeCapsule data from localStorage
    try {
      const savedData = localStorage.getItem("deepresearch_data");
      if (savedData) {
        setTimeCapsuleData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load TimeCapsule data:", error);
    }
  }, []);

  // Update VectorStore when provider makes it available
  useEffect(() => {
    if (providerVectorStore) {
      console.log("🔗 AI-Frames connecting to VectorStoreProvider...");
      setVectorStore(providerVectorStore);

      // Make it available globally for compatibility
      if (typeof window !== "undefined") {
        (window as any).sharedVectorStore = providerVectorStore;
      }

      console.log("✅ AI-Frames connected to VectorStoreProvider");

      // ENHANCED: Retry loading frames when VectorStore becomes available
      if (providerVectorStore.initialized && frames.length === 0) {
        console.log(
          "🔄 VectorStore is ready and no frames loaded, retrying frame load..."
        );
        loadFramesFromStorage();
      }
    }
  }, [providerVectorStore]);

  // Initialize GraphStorageManager when VectorStore is ready
  useEffect(() => {
    const initializeGraphStorage = async () => {
      // ENHANCED: Check VectorStore's actual initialized state, not just provider state
      if (vectorStore && vectorStore.initialized && !graphStorageManager) {
        try {
          console.log("🗂️ Initializing GraphStorageManager...");
          const graphManager = getGraphStorageManager(vectorStore);
          await graphManager.initialize();
          setGraphStorageManager(graphManager);
          console.log("✅ GraphStorageManager initialized successfully");
        } catch (error) {
          console.error("❌ Failed to initialize GraphStorageManager:", error);
          // ENHANCED: Retry after a delay if VectorStore becomes ready
          setTimeout(() => {
            if (
              vectorStore &&
              vectorStore.initialized &&
              !graphStorageManager
            ) {
              console.log("🔄 Retrying GraphStorageManager initialization...");
              initializeGraphStorage();
            }
          }, 1000);
        }
      }
    };

    initializeGraphStorage();
  }, [vectorStore, vectorStoreInitialized, graphStorageManager]);

  // Remove this - will be added after saveAllFramesToKB is defined

  // Sync graph changes directly to Knowledge Base
  const syncGraphChangesToKB = useCallback(
    async (graphFrames?: AIFrame[]) => {
      // Prevent concurrent sync operations
      if (syncInProgressRef.current) {
        console.log(
          "⏳ Graph-to-KB sync already in progress, skipping concurrent call"
        );
        return;
      }

      const framesToSync = graphFrames || frames;

      if (
        !vectorStore ||
        !vectorStoreInitialized ||
        framesToSync.length === 0
      ) {
        return;
      }

      if (!processingAvailable) {
        console.log(
          "⏳ VectorStore not ready for processing, skipping graph-to-KB sync"
        );
        return;
      }

      // Set sync in progress flag
      syncInProgressRef.current = true;

      try {
        // DEBUG: Trace where KB saves are coming from
        console.log("🔍 KB SYNC TRACE:", {
          syncType: "graph-to-kb",
          frameCount: framesToSync.length,
          caller: new Error().stack?.split("\n")[2]?.trim(),
          firstFrame: framesToSync[0]
            ? {
                id: framesToSync[0].id,
                title: framesToSync[0].title,
                goal: framesToSync[0].goal?.substring(0, 30),
                hasAttachment: !!framesToSync[0].attachment,
              }
            : null,
        });

        console.log(
          `🔄 Syncing ${framesToSync.length} frames from graph changes to Knowledge Base...`
        );

        // Process frames with immediate KB sync
        for (let index = 0; index < framesToSync.length; index++) {
          const frame = framesToSync[index];
          if (!frame.title || !frame.informationText) continue;

          // Enhanced document title with order information
          const title = `AI-Frame [${frame.order || index + 1}]: ${frame.title}`;
          const docId = `aiframe-${frame.id}`;

          // Check if this AI-Frame already exists in KB
          const existingDocs = await vectorStore.getAllDocuments();
          const existingDoc = existingDocs.find(
            (doc) =>
              doc.id === docId ||
              (doc.metadata.source === "ai-frames" &&
                (doc.metadata as any).aiFrameId === frame.id)
          );

          if (existingDoc) {
            // Delete existing document first to ensure clean update
            try {
              await vectorStore.deleteDocument(existingDoc.id);
              console.log(`🔄 Updated KB document for frame: ${frame.title}`);
            } catch (deleteError) {
              console.warn(
                `⚠️ Failed to delete old AI-Frame document: ${deleteError}`
              );
            }
          }

          // Create enhanced document content with attachment details
          const frameWithAttachment = frame as any; // Type assertion to access attachment properties

          // Debug: Log attachment data being saved
          console.log("💾 KB SAVE FRAME CONTENT DEBUG:", {
            frameId: frame.id,
            frameTitle: frame.title,
            goal: frame.goal,
            informationText: frame.informationText,
            hasAttachment: !!frameWithAttachment.attachment,
            attachmentType: frameWithAttachment.attachment?.type,
          });

          if (frameWithAttachment.attachment) {
            console.log("💾 Saving frame with attachment to KB:", {
              frameId: frame.id,
              frameTitle: frame.title,
              attachmentType: frameWithAttachment.attachment.type,
              attachmentData: frameWithAttachment.attachment.data,
            });
          }
          const content = `
Learning Goal: ${frame.goal}

Order: ${frame.order || index + 1} of ${framesToSync.length}
Type: ${frame.type || "frame"}
${frame.parentFrameId ? `Parent Frame: ${frame.parentFrameId}` : ""}
BubblSpace: ${frame.bubblSpaceId || currentBubblSpace?.id || "default"}
TimeCapsule: ${frame.timeCapsuleId || currentTimeCapsule?.id || "default"}

Context & Background:
${frame.informationText}

After Video Content:
${frame.afterVideoText || "No additional content"}

AI Concepts: ${frame.aiConcepts ? frame.aiConcepts.join(", ") : "None"}

ATTACHMENTS & MEDIA:
Video Attachment:
- URL: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl || "No video attachment"}
- Start Time: ${frame.startTime || frameWithAttachment.attachment?.data?.startTime || 0}s
- Duration: ${frame.duration || frameWithAttachment.attachment?.data?.duration || 0}s
- Type: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl ? "YouTube Video" : "No video"}

${
  frameWithAttachment.attachment?.type === "pdf"
    ? `
PDF Attachment:
- URL: ${frameWithAttachment.attachment.data?.pdfUrl || "No PDF URL"}
- Pages: ${frameWithAttachment.attachment.data?.pages || "All pages"}
- Title: ${frameWithAttachment.attachment.data?.title || "PDF Document"}
- Notes: ${frameWithAttachment.attachment.data?.notes || "No notes"}
`
    : ""
}${
            frameWithAttachment.attachment?.type === "text"
              ? `
Text Attachment:
- Content: ${frameWithAttachment.attachment.data?.text || "No text content"}
- Title: ${frameWithAttachment.attachment.data?.title || "Text Content"}
- Notes: ${frameWithAttachment.attachment.data?.notes || "No notes"}
`
              : ""
          }${
            frameWithAttachment.attachment &&
            !["pdf", "text", "video"].includes(
              frameWithAttachment.attachment.type
            )
              ? `
Additional Attachment:
- Type: ${frameWithAttachment.attachment.type || "Unknown"}
- Name: ${frameWithAttachment.attachment.name || "Unnamed"}
- Size: ${frameWithAttachment.attachment.size ? `${frameWithAttachment.attachment.size} bytes` : "Unknown"}
- Data: ${frameWithAttachment.attachment.data ? "Available" : "No data"}
- URL: ${frameWithAttachment.attachment.url || "No URL"}
- Content: ${frameWithAttachment.attachment.content ? frameWithAttachment.attachment.content.substring(0, 200) + "..." : "No content"}
`
              : frameWithAttachment.attachment
                ? ""
                : "Additional Attachments: None"
          }

Text Notes:
${frameWithAttachment.notes || "No text notes"}

Document Attachments:
${frameWithAttachment.documents ? frameWithAttachment.documents.map((doc: any) => `- ${doc.name || "Unnamed"} (${doc.type || "Unknown type"})`).join("\n") : "No document attachments"}

Metadata:
- Generated: ${frame.isGenerated ? "Yes" : "No"}
- Created: ${frame.createdAt || "Unknown"}
- Updated: ${frame.updatedAt || "Unknown"}
${frame.sourceGoal ? `- Source Goal: ${frame.sourceGoal}` : ""}
- Attachment Count: ${frameWithAttachment.attachment ? 1 : 0}
- Has Video: ${frame.videoUrl ? "Yes" : "No"}
- Has Text Notes: ${frameWithAttachment.notes ? "Yes" : "No"}
- Has Documents: ${frameWithAttachment.documents ? frameWithAttachment.documents.length : 0}
        `.trim();

          // Insert the enhanced document
          const aiFrameDoc = {
            id: docId,
            title: title,
            content: content,
            metadata: {
              filename: `aiframe-${frame.id}.json`,
              filesize: JSON.stringify(frame).length,
              filetype: "application/json",
              uploadedAt: frame.createdAt || new Date().toISOString(),
              source: "ai-frames",
              description: `AI-Frame: ${frame.title} (Order: ${frame.order || index + 1})`,
              isGenerated: true,
              aiFrameId: frame.id,
              aiFrameType: frame.type || "frame",
              aiFrameOrder: frame.order || index + 1,
              aiFrameTotalFrames: framesToSync.length,
              parentFrameId: frame.parentFrameId,
              bubblSpaceId:
                frame.bubblSpaceId || currentBubblSpace?.id || "default",
              timeCapsuleId:
                frame.timeCapsuleId || currentTimeCapsule?.id || "default",
              videoUrl: frame.videoUrl,
              startTime: frame.startTime,
              duration: frame.duration,
              createdAt: frame.createdAt,
              updatedAt: frame.updatedAt || new Date().toISOString(),
              frameHierarchy: {
                order: frame.order || index + 1,
                total: framesToSync.length,
                type: frame.type || "frame",
                hasParent: !!frame.parentFrameId,
                parentId: frame.parentFrameId,
              },
              // CRITICAL: Save attachment data for persistence
              attachment: frameWithAttachment.attachment,
            },
            chunks: [],
            vectors: [],
          };

          await vectorStore.insertDocument(aiFrameDoc);
          console.log(`✅ Synced frame to KB: ${frame.title}`);
        }

        console.log(
          `✅ Graph-to-KB sync completed for ${framesToSync.length} frames`
        );

        // Force Knowledge Base refresh to show updated content
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("kb-force-refresh", {
              detail: {
                frameCount: framesToSync.length,
                syncType: "graph-to-kb",
                timestamp: new Date().toISOString(),
              },
            })
          );
        }
      } catch (error) {
        console.error(
          "❌ Failed to sync graph changes to Knowledge Base:",
          error
        );
      } finally {
        // Always reset the sync flag
        syncInProgressRef.current = false;
      }
    },
    [
      vectorStore,
      vectorStoreInitialized,
      processingAvailable,
      frames,
      currentBubblSpace,
      currentTimeCapsule,
    ]
  );

  // TEMPORARILY DISABLED: Auto-save bypasses Save Graph fix
  const saveAllFramesToKB = useCallback(async () => {
    console.log(
      "⏸️ Auto-save disabled - use Save Graph button for manual save"
    );
    return Promise.resolve();

    /* DISABLED CODE:
    if (!vectorStore || !vectorStoreInitialized || frames.length === 0) {
      return;
    }

    if (!processingAvailable) {
      console.log(
        "⏳ VectorStore not ready for processing, skipping AI-Frames KB save"
      );
      return;
    }

    try {
      console.log(
        `📊 Saving ${frames.length} AI-Frames to Knowledge Base with order preservation...`
      );

      // Process frames in order to maintain sequence
      for (let index = 0; index < frames.length; index++) {
        const frame = frames[index];
        if (!frame.title || !frame.informationText) continue;

        // Enhanced document title with order information
        const title = `AI-Frame [${frame.order || index + 1}]: ${frame.title}`;

        // Enhanced content with hierarchy and relationship information
        const frameWithAttachment = frame as any; // Type assertion to access attachment properties
        
        // Debug: Log attachment data being saved
        console.log('💾 KB SAVE FRAME CONTENT DEBUG:', {
          frameId: frame.id,
          frameTitle: frame.title,
          goal: frame.goal,
          informationText: frame.informationText,
          hasAttachment: !!frameWithAttachment.attachment,
          attachmentType: frameWithAttachment.attachment?.type
        });
        
        if (frameWithAttachment.attachment) {
          console.log('💾 Saving frame with attachment to KB:', {
            frameId: frame.id,
            frameTitle: frame.title,
            attachmentType: frameWithAttachment.attachment.type,
            attachmentData: frameWithAttachment.attachment.data
          });
        }
        
        // Debug: Log the video URL being saved to KB content
        const videoUrlForKB = frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl || "No video attachment";
        console.log('💾 KB Content Video URL Debug:', {
          frameId: frame.id,
          frameTitle: frame.title,
          legacyVideoUrl: frame.videoUrl,
          attachmentVideoUrl: frameWithAttachment.attachment?.data?.videoUrl,
          finalVideoUrlForKB: videoUrlForKB,
          hasAttachment: !!frameWithAttachment.attachment,
          attachmentType: frameWithAttachment.attachment?.type
        });
        
        const content = `
Learning Goal: ${frame.goal}

Order: ${frame.order || index + 1} of ${frames.length}
Type: ${frame.type || "frame"}
${frame.parentFrameId ? `Parent Frame: ${frame.parentFrameId}` : ""}
BubblSpace: ${frame.bubblSpaceId || currentBubblSpace?.id || "default"}
TimeCapsule: ${frame.timeCapsuleId || currentTimeCapsule?.id || "default"}

Context & Background:
${frame.informationText}

After Video Content:
${frame.afterVideoText || "No additional content"}

AI Concepts: ${frame.aiConcepts ? frame.aiConcepts.join(", ") : "None"}

ATTACHMENTS & MEDIA:
Video Attachment:
- URL: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl || "No video attachment"}
- Start Time: ${frame.startTime || frameWithAttachment.attachment?.data?.startTime || 0}s
- Duration: ${frame.duration || frameWithAttachment.attachment?.data?.duration || 0}s
- Type: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl ? "YouTube Video" : "No video"}

${frameWithAttachment.attachment?.type === 'pdf' ? `
PDF Attachment:
- URL: ${frameWithAttachment.attachment.data?.pdfUrl || "No PDF URL"}
- Pages: ${frameWithAttachment.attachment.data?.pages || "All pages"}
- Title: ${frameWithAttachment.attachment.data?.title || "PDF Document"}
- Notes: ${frameWithAttachment.attachment.data?.notes || "No notes"}
` : ""}${frameWithAttachment.attachment?.type === 'text' ? `
Text Attachment:
- Content: ${frameWithAttachment.attachment.data?.text || "No text content"}
- Title: ${frameWithAttachment.attachment.data?.title || "Text Content"}
- Notes: ${frameWithAttachment.attachment.data?.notes || "No notes"}
` : ""}${frameWithAttachment.attachment && !['pdf', 'text', 'video'].includes(frameWithAttachment.attachment.type) ? `
Additional Attachment:
- Type: ${frameWithAttachment.attachment.type || "Unknown"}
- Name: ${frameWithAttachment.attachment.name || "Unnamed"}
- Size: ${frameWithAttachment.attachment.size ? `${frameWithAttachment.attachment.size} bytes` : "Unknown"}
- Data: ${frameWithAttachment.attachment.data ? "Available" : "No data"}
- URL: ${frameWithAttachment.attachment.url || "No URL"}
- Content: ${frameWithAttachment.attachment.content ? frameWithAttachment.attachment.content.substring(0, 200) + "..." : "No content"}
` : frameWithAttachment.attachment ? "" : "Additional Attachments: None"}

Text Notes:
${frameWithAttachment.notes || "No text notes"}

Document Attachments:
${frameWithAttachment.documents ? frameWithAttachment.documents.map((doc: any) => `- ${doc.name || "Unnamed"} (${doc.type || "Unknown type"})`).join('\n') : "No document attachments"}

Metadata:
- Generated: ${frame.isGenerated ? "Yes" : "No"}
- Created: ${frame.createdAt || "Unknown"}
- Updated: ${frame.updatedAt || "Unknown"}
${frame.sourceGoal ? `- Source Goal: ${frame.sourceGoal}` : ""}
- Attachment Count: ${frameWithAttachment.attachment ? 1 : 0}
- Has Video: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl ? "Yes" : "No"}
- Has Text Notes: ${frameWithAttachment.notes ? "Yes" : "No"}
- Has Documents: ${frameWithAttachment.documents ? frameWithAttachment.documents.length : 0}
        `.trim();

        // Generate unique document ID for this frame
        const docId = `aiframe-${frame.id}`;

        // Check if this AI-Frame already exists in KB
        const existingDocs = await vectorStore.getAllDocuments();
        const existingDoc = existingDocs.find(
          (doc) =>
            doc.id === docId ||
            (doc.metadata.source === "ai-frames" &&
              (doc.metadata as any).aiFrameId === frame.id)
        );

        if (existingDoc) {
          console.log(
            `🔄 AI-Frame "${frame.title}" exists in KB, updating with current order and data...`
          );

          // FIXED: Compare with actual document content, not stale metadata
          const extractFromContent = (content: string) => {
            const goalMatch = content.match(/Learning Goal: (.*?)(?:\n|$)/);
            const infoMatch = content.match(/Context & Background:\n([\s\S]*?)(?:\n\nAfter Video Content:|$)/);
            const afterVideoMatch = content.match(/After Video Content:\n([\s\S]*?)(?:\n\nAI Concepts:|$)/);
            const videoUrlMatch = content.match(/- URL: (.*?)(?:\n|$)/);
            const conceptsMatch = content.match(/AI Concepts: (.*?)(?:\n|$)/);
            const orderMatch = content.match(/Order: (\d+) of \d+/);
            
            return {
              goal: goalMatch?.[1]?.trim() || "",
              informationText: infoMatch?.[1]?.trim() || "",
              afterVideoText: afterVideoMatch?.[1]?.trim() || "",
              videoUrl: videoUrlMatch?.[1]?.trim() === "No video" ? "" : videoUrlMatch?.[1]?.trim() || "",
              aiConcepts: conceptsMatch?.[1]?.trim() === "None" ? [] : conceptsMatch?.[1]?.split(", ").filter(c => c.trim()) || [],
              order: orderMatch?.[1] ? parseInt(orderMatch[1]) : index + 1
            };
          };

          // Extract frame title from document title (remove "AI-Frame [X]: " prefix)
          const extractTitleFromDocTitle = (docTitle: string) => {
            const match = docTitle.match(/AI-Frame \[\d+\]: (.*)/);
            return match?.[1] || docTitle;
          };

          const currentFrame = {
            title: extractTitleFromDocTitle(frame.title || ""),
            goal: frame.goal || "",
            informationText: frame.informationText || "",
            afterVideoText: frame.afterVideoText || "",
            order: frame.order || index + 1,
            videoUrl: frame.videoUrl || "",
            aiConcepts: frame.aiConcepts || []
          };

          const existingContent = extractFromContent(existingDoc.content);
          const existingTitle = extractTitleFromDocTitle(existingDoc.title);
          
          const existingFrame = {
            title: existingTitle,
            goal: existingContent.goal,
            informationText: existingContent.informationText,
            afterVideoText: existingContent.afterVideoText,
            order: existingContent.order,
            videoUrl: existingContent.videoUrl,
            aiConcepts: existingContent.aiConcepts
          };

          // FIXED: Compare current frame with what's actually in Knowledge Base
          const meaningfulChanges = {
            title: currentFrame.title !== existingFrame.title,
            goal: currentFrame.goal !== existingFrame.goal,
            informationText: currentFrame.informationText !== existingFrame.informationText,
            afterVideoText: currentFrame.afterVideoText !== existingFrame.afterVideoText,
            order: currentFrame.order !== existingFrame.order,
            videoUrl: currentFrame.videoUrl !== existingFrame.videoUrl,
            aiConcepts: JSON.stringify(currentFrame.aiConcepts) !== JSON.stringify(existingFrame.aiConcepts)
          };

          const hasChanged = Object.values(meaningfulChanges).some(changed => changed);

          console.log(`📝 FIXED: Comparing frame with actual KB content for "${frame.title}":`, {
            hasChanged,
            changes: meaningfulChanges,
            comparison: {
              current: currentFrame,
              existingInKB: existingFrame
            },
            willUpdate: hasChanged
          });

          // FIXED: Always update if frame ID is different (new frame) or content has changed
          const isNewFrame = !(existingDoc.metadata as any).aiFrameId || (existingDoc.metadata as any).aiFrameId !== frame.id;
          
          if (!hasChanged && !isNewFrame) {
            console.log(`📝 Frame "${frame.title}" matches KB content and is not new, skipping update`);
            continue;
          } else {
            console.log(`📝 Frame "${frame.title}" ${isNewFrame ? 'is new frame' : 'differs from KB content'}, updating:`, {
              isNewFrame,
              changes: meaningfulChanges
            });
          }

          // Delete existing document first to ensure clean update
          try {
            await vectorStore.deleteDocument(existingDoc.id);
            console.log(`🗑️ Deleted old AI-Frame document: ${existingDoc.id}`);
          } catch (deleteError) {
            console.warn(
              `⚠️ Failed to delete old AI-Frame document: ${deleteError}`
            );
            // Continue with insertion anyway - the operation queue will handle conflicts
          }
        }

        // Create enhanced document with complete metadata
        const aiFrameDoc = {
          id: docId,
          title: title,
          content: content,
          metadata: {
            filename: `aiframe-${frame.id}.json`,
            filesize: JSON.stringify(frame).length,
            filetype: "application/json",
            uploadedAt: frame.createdAt || new Date().toISOString(),
            source: "ai-frames",
            description: `AI-Frame: ${frame.title} (Order: ${frame.order || index + 1})`,
            isGenerated: true,
            // Enhanced AI-Frame specific metadata
            aiFrameId: frame.id,
            aiFrameType: frame.type || "frame",
            aiFrameOrder: frame.order || index + 1,
            aiFrameTotalFrames: frames.length,
            parentFrameId: frame.parentFrameId,
            bubblSpaceId:
              frame.bubblSpaceId || currentBubblSpace?.id || "default",
            timeCapsuleId:
              frame.timeCapsuleId || currentTimeCapsule?.id || "default",
            videoUrl: frame.videoUrl,
            startTime: frame.startTime,
            duration: frame.duration,
            createdAt: frame.createdAt,
            updatedAt: frame.updatedAt || new Date().toISOString(),
            // Original frame data for change detection
            originalTitle: frame.title,
            originalGoal: frame.goal,
            originalInformationText: frame.informationText,
            originalAfterVideoText: frame.afterVideoText,
            originalOrder: frame.order || index + 1,
            originalVideoUrl: frame.videoUrl,
            originalAiConcepts: frame.aiConcepts || [],
            // Hierarchy information
            frameHierarchy: {
              order: frame.order || index + 1,
              total: frames.length,
              type: frame.type || "frame",
              hasParent: !!frame.parentFrameId,
              parentId: frame.parentFrameId,
            },
            // CRITICAL: Save attachment data for persistence
            attachment: (frame as any).attachment,
          },
          chunks: [], // Required by VectorStore schema
          vectors: [], // Required by VectorStore schema
        };

        // Insert the enhanced document
        try {
          await vectorStore.insertDocument(aiFrameDoc);
          console.log(
            `✅ Saved AI-Frame to KB: ${frame.title} (Order: ${frame.order || index + 1})`
          );
        } catch (error) {
          console.warn(
            `⚠️ Failed to save AI-Frame "${frame.title}" to KB:`,
            error
          );
        }
      }

      console.log(
        `✅ Finished saving AI-Frames to Knowledge Base with order preservation`
      );

      // Dispatch comprehensive KB update events
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("aiframes-kb-synced", {
            detail: {
              frameCount: frames.length,
              bubblSpaceId: currentBubblSpace?.id,
              timeCapsuleId: currentTimeCapsule?.id,
              timestamp: new Date().toISOString(),
            },
          })
        );
        
        // Also dispatch the new unified event
        window.dispatchEvent(
          new CustomEvent("aiframes-kb-updated", {
            detail: {
              frameCount: frames.length,
              syncType: 'scheduled',
              source: 'frame-change',
              timestamp: new Date().toISOString(),
            },
          })
        );
        
        // Force Knowledge Base refresh
        window.dispatchEvent(new CustomEvent('kb-force-refresh', {
          detail: {
            source: 'frame-change',
            action: 'bulk-update',
            frameCount: frames.length,
            timestamp: new Date().toISOString()
          }
        }));
        
        // Force Knowledge Base document list refresh
        window.dispatchEvent(new CustomEvent('kb-documents-changed', {
          detail: {
            source: 'frame-change',
            changeType: 'bulk-update',
            documentCount: frames.length,
            timestamp: new Date().toISOString()
          }
        }));
      }
    } catch (error) {
      console.error("❌ Failed to save AI-Frames to Knowledge Base:", error);
    }
    */ // END DISABLED CODE
  }, [
    vectorStore,
    vectorStoreInitialized,
    processingAvailable,
    frames,
    currentBubblSpace,
    currentTimeCapsule,
  ]);

  // FIXED: Load graph connections from storage
  const loadGraphConnections = useCallback(async () => {
    try {
      console.log("🔗 Loading graph connections from storage...");

      // Try to load from IndexedDB first
      if (graphStorageManager) {
        try {
          const graphLayout = await graphStorageManager.loadGraphLayout();
          if (
            graphLayout &&
            (graphLayout.nodes.length > 0 || graphLayout.edges.length > 0)
          ) {
            console.log(
              `🔗 Loaded graph connections from IndexedDB: ${graphLayout.nodes.length} nodes, ${graphLayout.edges.length} edges`
            );
            setGraphState((prev: any) => ({
              ...prev,
              nodes: graphLayout.nodes,
              edges: graphLayout.edges,
              viewport: graphLayout.viewport,
            }));
            return true;
          }
        } catch (error) {
          console.warn(
            "⚠️ Failed to load graph connections from IndexedDB:",
            error
          );
        }
      }

      // Fallback to localStorage
      const connectionsData = localStorage.getItem(
        "ai_frames_graph_connections"
      );
      if (connectionsData) {
        try {
          const parsed = JSON.parse(connectionsData);
          if (parsed.nodes && parsed.edges) {
            console.log(
              `🔗 Loaded graph connections from localStorage: ${parsed.nodes.length} nodes, ${parsed.edges.length} edges`
            );
            setGraphState((prev: any) => ({
              ...prev,
              nodes: parsed.nodes,
              edges: parsed.edges,
              viewport: parsed.viewport,
            }));
            return true;
          }
        } catch (error) {
          console.warn(
            "⚠️ Failed to parse graph connections from localStorage:",
            error
          );
        }
      }

      console.log("ℹ️ No graph connections found in storage");
      return false;
    } catch (error) {
      console.error("❌ Failed to load graph connections:", error);
      return false;
    }
  }, [graphStorageManager]);

  // CRITICAL: Make app instance globally available for FrameGraphIntegration
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).aiFramesApp = {
        vectorStore,
        vectorStoreInitialized,
        frames,
        syncFramesToKB: saveAllFramesToKB,
      };
    }
  }, [vectorStore, vectorStoreInitialized, frames, saveAllFramesToKB]);

  // ENHANCED: Watch for VectorStore initialization and retry failed components
  useEffect(() => {
    if (vectorStore && vectorStore.initialized) {
      console.log(
        "🔄 VectorStore is now initialized, checking for failed components..."
      );

      // Retry GraphStorageManager initialization if it failed
      if (!graphStorageManager) {
        console.log("🔄 Retrying GraphStorageManager initialization...");
        const initializeGraphStorage = async () => {
          try {
            const graphManager = getGraphStorageManager(vectorStore);
            await graphManager.initialize();
            setGraphStorageManager(graphManager);
            console.log(
              "✅ GraphStorageManager initialized successfully after retry"
            );
          } catch (error) {
            console.error("❌ GraphStorageManager retry failed:", error);
          }
        };
        initializeGraphStorage();
      }

      // Retry loading frames if none are loaded
      if (frames.length === 0) {
        console.log("🔄 No frames loaded, retrying frame load...");
        loadFramesFromStorage();
      }
    }
  }, [vectorStore?.initialized, graphStorageManager, frames.length]);

  // Save frames to KB when VectorStore becomes ready or frames change
  useEffect(() => {
    if (
      vectorStore &&
      vectorStoreInitialized &&
      processingAvailable &&
      frames.length > 0
    ) {
      console.log("🔄 AI-Frames detected, saving to Knowledge Base...");

      // FIXED: Add delay to ensure KB operations are complete before next save
      const saveWithDelay = async () => {
        try {
          await saveAllFramesToKB();
          console.log("✅ KB save completed successfully");
        } catch (error) {
          console.error("❌ KB save failed:", error);
        }
      };

      // Use a longer delay to prevent race conditions
      setTimeout(saveWithDelay, 200);
    }
  }, [vectorStore, vectorStoreInitialized, processingAvailable, frames.length]);

  // Listen for localStorage changes (cross-tab sync and graph updates) with enhanced error handling
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "ai_frames_timecapsule" ||
        event.key === "ai_frames_graph_state"
      ) {
        console.log("🔄 Storage change detected:", event.key);

        // Enhanced retry logic with exponential backoff
        let retryCount = 0;
        const maxRetries = 3;
        const baseDelay = 100;

        const reloadWithRetry = async () => {
          try {
            const loaded = await loadFramesFromStorage();
            if (loaded) {
              console.log(
                "✅ Frames reloaded from storage due to external change"
              );

              setChatMessages((prev) => [
                ...prev,
                {
                  role: "ai",
                  content: `🔄 Frames updated from ${event.key === "ai_frames_graph_state" ? "graph view" : "storage"}! Changes have been synchronized.`,
                },
              ]);
            } else {
              console.log("ℹ️ No frames found during storage change reload");
            }
          } catch (error) {
            console.error(
              `❌ Failed to reload frames from storage (attempt ${retryCount + 1}):`,
              error
            );

            if (retryCount < maxRetries) {
              retryCount++;
              const delay = baseDelay * Math.pow(2, retryCount - 1); // Exponential backoff
              console.log(`🔄 Retrying in ${delay}ms...`);
              setTimeout(reloadWithRetry, delay);
            } else {
              console.error(
                "❌ Maximum retry attempts reached for storage change reload"
              );
              setChatMessages((prev) => [
                ...prev,
                {
                  role: "ai",
                  content: `❌ Failed to synchronize frames after multiple attempts. Please try refreshing the page.`,
                },
              ]);
            }
          }
        };

        // Add initial delay to ensure write is complete
        setTimeout(reloadWithRetry, baseDelay);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadFramesFromStorage]);

  // Save frames to storage whenever they change (bidirectional sync)
  useEffect(() => {
    if (frames.length > 0) {
      saveFramesToStorage();
    }
  }, [frames, currentFrameIndex, saveFramesToStorage]);

  // Debug logging for event system
  const debugEvent = (
    eventName: string,
    detail: any,
    status: "received" | "processed" | "error" = "received"
  ) => {
    const timestamp = new Date().toISOString();
    console.log(`🔧 [${timestamp}] Event ${eventName} (${status}):`, {
      event: eventName,
      status,
      detail,
      frameCount: frames.length,
      currentFrameIndex,
    });
  };

  // Frame validation and consistency checks
  const validateFrame = (frame: any): frame is AIFrame => {
    if (!frame || typeof frame !== "object") {
      return false;
    }

    // Check required fields
    const requiredFields = ["id", "title", "goal", "informationText"];
    for (const field of requiredFields) {
      if (!frame[field] || typeof frame[field] !== "string") {
        console.warn(
          `⚠️ Frame validation failed: missing or invalid ${field}`,
          frame
        );
        return false;
      }
    }

    // Check numeric fields
    const numericFields = ["startTime", "duration", "order"];
    for (const field of numericFields) {
      if (frame[field] !== undefined && typeof frame[field] !== "number") {
        console.warn(
          `⚠️ Frame validation failed: invalid ${field} type`,
          frame
        );
        return false;
      }
    }

    // Check array fields
    if (frame.aiConcepts && !Array.isArray(frame.aiConcepts)) {
      console.warn(
        `⚠️ Frame validation failed: aiConcepts is not an array`,
        frame
      );
      return false;
    }

    return true;
  };

  // Smart frame merging to preserve changes and avoid conflicts
  const mergeFrameUpdates = useCallback(
    (existingFrames: AIFrame[], newFrames: AIFrame[]): AIFrame[] => {
      console.log("🔄 MERGE DEBUG: Starting frame merge", {
        existingCount: existingFrames.length,
        newCount: newFrames.length,
        existingFrameIds: existingFrames.map((f) => f.id),
        newFrameIds: newFrames.map((f) => f.id),
        existingFramesWithAttachment: existingFrames
          .filter((f) => (f as any).attachment)
          .map((f) => ({
            id: f.id,
            title: f.title,
            attachmentType: (f as any).attachment?.type,
            attachmentVideoUrl: (f as any).attachment?.data?.videoUrl,
          })),
        newFramesWithAttachment: newFrames
          .filter((f) => (f as any).attachment)
          .map((f) => ({
            id: f.id,
            title: f.title,
            attachmentType: (f as any).attachment?.type,
            attachmentVideoUrl: (f as any).attachment?.data?.videoUrl,
          })),
      });

      if (!Array.isArray(existingFrames) || !Array.isArray(newFrames)) {
        console.warn("⚠️ Frame merge failed: invalid frame arrays");
        return existingFrames;
      }

      // FIXED: Add frame validation and deduplication
      const validExistingFrames = existingFrames.filter(
        (frame): frame is AIFrame => {
          if (!validateFrame(frame)) {
            console.warn(
              "⚠️ Invalid existing frame filtered out:",
              (frame as any).id
            );
            return false;
          }
          return true;
        }
      );

      const validNewFrames = newFrames.filter((frame): frame is AIFrame => {
        if (!validateFrame(frame)) {
          console.warn("⚠️ Invalid new frame filtered out:", (frame as any).id);
          return false;
        }
        return true;
      });

      const mergedFrames: AIFrame[] = [];
      const existingById = new Map<string, AIFrame>();
      const newById = new Map<string, AIFrame>();

      // Index existing frames by ID
      validExistingFrames.forEach((frame) => {
        existingById.set(frame.id, frame);
      });

      // Index new frames by ID (handle duplicates intelligently)
      validNewFrames.forEach((frame) => {
        const existing = existingById.get(frame.id);
        if (existing) {
          // CRITICAL: Merge attachment data instead of replacing entire frame
          const mergedFrame = {
            ...existing,
            ...frame,
            // Preserve attachment data from either frame
            attachment: frame.attachment || existing.attachment,
            // Preserve video URL from either frame
            videoUrl: frame.videoUrl || existing.videoUrl,
            // Update timestamp
            updatedAt: new Date().toISOString(),
          };
          newById.set(frame.id, mergedFrame);
          console.log("🔄 Merged duplicate frame with attachment data:", {
            frameId: frame.id,
            hasAttachment: !!(mergedFrame as any).attachment,
            videoUrl: mergedFrame.videoUrl,
          });
        } else {
          newById.set(frame.id, frame);
        }
      });

      // Create merged frame set
      const allFrameIds = new Set([...existingById.keys(), ...newById.keys()]);

      for (const frameId of allFrameIds) {
        const existingFrame = existingById.get(frameId);
        const newFrame = newById.get(frameId);

        if (existingFrame && newFrame) {
          // Merge existing and new frame data
          const existingUpdated = new Date(
            existingFrame.updatedAt || existingFrame.createdAt || "1970-01-01"
          ).getTime();
          const newUpdated = new Date(
            newFrame.updatedAt || newFrame.createdAt || "1970-01-01"
          ).getTime();

          // Use the more recently updated frame as base
          const baseFrame =
            newUpdated > existingUpdated ? newFrame : existingFrame;
          const otherFrame =
            newUpdated > existingUpdated ? existingFrame : newFrame;

          // Merge with preference for non-empty values
          const mergedFrame: AIFrame = {
            ...baseFrame,
            // Preserve non-empty fields from both frames
            title: baseFrame.title || otherFrame.title,
            goal: baseFrame.goal || otherFrame.goal,
            informationText:
              baseFrame.informationText || otherFrame.informationText,
            afterVideoText:
              baseFrame.afterVideoText || otherFrame.afterVideoText,
            videoUrl: baseFrame.videoUrl || otherFrame.videoUrl,
            aiConcepts:
              baseFrame.aiConcepts?.length > 0
                ? baseFrame.aiConcepts
                : otherFrame.aiConcepts,
            // CRITICAL FIX: Preserve attachment data during merge
            attachment: baseFrame.attachment || otherFrame.attachment,
            // Update timestamp
            updatedAt: new Date().toISOString(),
          };

          // Debug: Log attachment preservation during merge
          console.log("🔄 Frame merge attachment debug:", {
            frameId: mergedFrame.id,
            frameTitle: mergedFrame.title,
            baseFrameHasAttachment: !!baseFrame.attachment,
            otherFrameHasAttachment: !!otherFrame.attachment,
            mergedFrameHasAttachment: !!mergedFrame.attachment,
            mergedAttachmentType: mergedFrame.attachment?.type,
            mergedAttachmentVideoUrl: mergedFrame.attachment?.data?.videoUrl,
            mergedLegacyVideoUrl: mergedFrame.videoUrl,
          });

          mergedFrames.push(mergedFrame);
        } else if (newFrame) {
          // New frame, add it
          mergedFrames.push(newFrame);
        } else if (existingFrame) {
          // Existing frame, keep it
          mergedFrames.push(existingFrame);
        }
      }

      // Sort by order field if available
      mergedFrames.sort((a, b) => (a.order || 0) - (b.order || 0));

      // CRITICAL FIX: Ensure we never return an empty array
      if (mergedFrames.length === 0) {
        console.warn(
          "⚠️ Frame merge resulted in empty array, preserving existing frames"
        );
        return existingFrames.length > 0 ? existingFrames : newFrames;
      }

      console.log(
        `🔄 Frame merge completed: ${existingFrames.length} + ${newFrames.length} → ${mergedFrames.length}`
      );

      // Debug: Log final merge result
      console.log("🔄 MERGE DEBUG: Final merge result", {
        mergedCount: mergedFrames.length,
        mergedFrameIds: mergedFrames.map((f) => f.id),
        mergedFramesWithAttachment: mergedFrames
          .filter((f) => (f as any).attachment)
          .map((f) => ({
            id: f.id,
            title: f.title,
            attachmentType: (f as any).attachment?.type,
            attachmentVideoUrl: (f as any).attachment?.data?.videoUrl,
            legacyVideoUrl: f.videoUrl,
          })),
      });

      return mergedFrames;
    },
    []
  );

  // Enhanced frame state update with validation and merging
  const updateFrameState = useCallback(
    (newFrames: AIFrame[], source: string = "unknown") => {
      if (!Array.isArray(newFrames)) {
        console.warn("⚠️ Frame state update failed: invalid frames array");
        return;
      }

      // Debug: Log input frames before validation
      console.log("🔄 UPDATE DEBUG: Input frames before validation", {
        source,
        newFramesCount: newFrames.length,
        newFramesWithAttachment: newFrames
          .filter((f) => (f as any).attachment)
          .map((f) => ({
            id: f.id,
            title: f.title,
            attachmentType: (f as any).attachment?.type,
            attachmentVideoUrl: (f as any).attachment?.data?.videoUrl,
            legacyVideoUrl: f.videoUrl,
          })),
      });

      // Validate all frames
      const validFrames = newFrames.filter(validateFrame);
      if (validFrames.length !== newFrames.length) {
        console.warn(
          `⚠️ Frame validation: ${newFrames.length - validFrames.length} invalid frames filtered out`
        );
      }

      // Debug: Log frames after validation
      console.log("🔄 UPDATE DEBUG: Frames after validation", {
        validFramesCount: validFrames.length,
        validFramesWithAttachment: validFrames
          .filter((f) => (f as any).attachment)
          .map((f) => ({
            id: f.id,
            title: f.title,
            attachmentType: (f as any).attachment?.type,
            attachmentVideoUrl: (f as any).attachment?.data?.videoUrl,
            legacyVideoUrl: f.videoUrl,
          })),
      });

      // Smart merge with existing frames
      const mergedFrames = mergeFrameUpdates(frames, validFrames);

      // CRITICAL FIX: Ensure we never set an empty frames array
      if (mergedFrames.length === 0) {
        console.warn(
          "⚠️ Frame state update would result in empty array, preserving current frames"
        );
        return;
      }

      // Update state
      setFrames(mergedFrames);

      console.log(
        `✅ Frame state updated from ${source}: ${mergedFrames.length} frames`
      );
    },
    [frames, mergeFrameUpdates]
  );

  // Event queue for handling rapid changes
  const [eventQueue, setEventQueue] = useState<
    Array<{
      id: string;
      type: string;
      data: any;
      timestamp: number;
      processed: boolean;
    }>
  >([]);

  // Process event queue with debouncing
  const processEventQueue = useCallback(() => {
    if (eventQueue.length === 0) return;

    const now = Date.now();
    const unprocessedEvents = eventQueue.filter((event) => !event.processed);

    if (unprocessedEvents.length === 0) return;

    console.log(`🔄 Processing ${unprocessedEvents.length} queued events`);

    // Group events by type for batch processing
    const eventsByType = new Map<string, Array<any>>();

    for (const event of unprocessedEvents) {
      if (!eventsByType.has(event.type)) {
        eventsByType.set(event.type, []);
      }
      eventsByType.get(event.type)?.push(event);
    }

    // Process each event type
    for (const [eventType, events] of eventsByType) {
      try {
        switch (eventType) {
          case "frame-update":
            // Batch process frame updates
            const latestFrameUpdates = events[events.length - 1]; // Use most recent
            updateFrameState(
              latestFrameUpdates.data.frames,
              `batch-${eventType}`
            );
            break;
          case "frame-selection":
            // Use most recent selection
            const latestSelection = events[events.length - 1];
            setCurrentFrameIndex(latestSelection.data.frameIndex);
            break;
          case "kb-sync":
            // Trigger KB sync if needed
            if (vectorStore && vectorStoreInitialized && processingAvailable) {
              const latestKbSync = events[events.length - 1];
              syncGraphChangesToKB(latestKbSync.data.frames);
            }
            break;
          default:
            console.warn(`⚠️ Unknown event type in queue: ${eventType}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${eventType} events:`, error);
      }
    }

    // Mark events as processed
    setEventQueue((prev) =>
      prev.map((event) => ({ ...event, processed: true }))
    );

    // Clean up old processed events (keep only last 100)
    setTimeout(() => {
      setEventQueue((prev) =>
        prev
          .filter((event) => !event.processed || now - event.timestamp < 60000)
          .slice(-100)
      );
    }, 5000);
  }, [
    eventQueue,
    updateFrameState,
    vectorStore,
    vectorStoreInitialized,
    processingAvailable,
    syncGraphChangesToKB,
  ]);

  // Add event to queue
  const queueEvent = useCallback(
    (type: string, data: any) => {
      const event = {
        id: `${type}-${Date.now()}-${Math.random()}`,
        type,
        data,
        timestamp: Date.now(),
        processed: false,
      };

      setEventQueue((prev) => [...prev, event]);

      // Process queue with debouncing
      setTimeout(processEventQueue, 100);
    },
    [processEventQueue]
  );

  // Listen for graph save events
  useEffect(() => {
    const handleGraphSaved = (event: CustomEvent) => {
      debugEvent("graph-saved", event.detail, "received");

      try {
        // Validate event structure
        if (!event.detail || typeof event.detail !== "object") {
          console.warn("⚠️ Invalid graph saved event - missing detail");
          return;
        }

        const {
          frameCount,
          nodeCount,
          edgeCount,
          timestamp,
          frames: eventFrames,
          hasFrameUpdates,
        } = event.detail;

        // Validate basic event data
        if (
          typeof frameCount !== "number" ||
          typeof nodeCount !== "number" ||
          typeof edgeCount !== "number"
        ) {
          console.warn("⚠️ Invalid graph saved event - invalid counts:", {
            frameCount,
            nodeCount,
            edgeCount,
          });
          return;
        }

        console.log("📊 Graph saved successfully!", event.detail);

        // FINAL FIX: Force reload frames from storage after graph save
        console.log("🔄 Reloading frames from storage after graph save");
        loadFramesFromStorage()
          .then(async (loaded) => {
            if (loaded) {
              console.log("✅ Frames reloaded from storage after graph save");

              // CRITICAL: Force Knowledge Base sync after loading frames
              if (
                vectorStore &&
                vectorStoreInitialized &&
                processingAvailable
              ) {
                console.log("🔄 Forcing Knowledge Base sync after graph save");
                try {
                  await saveAllFramesToKB();
                  console.log(
                    "✅ Knowledge Base sync completed after graph save"
                  );
                } catch (error) {
                  console.error(
                    "❌ Failed to sync Knowledge Base after graph save:",
                    error
                  );
                }
              }
            }
          })
          .catch((error) => {
            console.error("❌ Failed to reload frames from storage:", error);
          });

        // IMMEDIATE SYNC: Update frame state directly if frame data is available
        if (hasFrameUpdates && eventFrames) {
          console.log("🔄 Applying immediate frame updates from graph save");
          updateFrameState(eventFrames, "graph-save");

          // FIXED: Ensure KB sync after Save Graph operation
          setTimeout(() => {
            ensureKBSyncAfterSaveGraph(eventFrames);
          }, 1000); // Small delay to ensure all operations complete

          // Also trigger KB sync immediately
          if (vectorStore && vectorStoreInitialized && processingAvailable) {
            console.log("🔄 Triggering immediate KB sync after graph save");

            // CRITICAL FIX: Set sync flag to coordinate with FrameGraphIntegration
            if (typeof window !== "undefined") {
              const aiFramesApp = (window as any).aiFramesApp || {};
              aiFramesApp.syncInProgress = true;
              (window as any).aiFramesApp = aiFramesApp;
            }

            syncGraphChangesToKB(eventFrames)
              .then(() => {
                console.log("✅ Immediate KB sync completed");

                // Clear sync flag after completion
                if (typeof window !== "undefined") {
                  const aiFramesApp = (window as any).aiFramesApp || {};
                  aiFramesApp.syncInProgress = false;
                  (window as any).aiFramesApp = aiFramesApp;
                }

                // Dispatch event to notify other components about KB update
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("aiframes-kb-updated", {
                      detail: {
                        frameCount: eventFrames.length,
                        syncType: "immediate",
                        source: "graph-save",
                        timestamp: new Date().toISOString(),
                      },
                    })
                  );

                  // Force Knowledge Base refresh after graph save
                  window.dispatchEvent(
                    new CustomEvent("kb-force-refresh", {
                      detail: {
                        source: "graph-save",
                        action: "sync",
                        frameCount: eventFrames.length,
                        timestamp: new Date().toISOString(),
                      },
                    })
                  );

                  // Force Knowledge Base document list refresh
                  window.dispatchEvent(
                    new CustomEvent("kb-documents-changed", {
                      detail: {
                        source: "graph-save",
                        changeType: "sync",
                        documentCount: eventFrames.length,
                        timestamp: new Date().toISOString(),
                      },
                    })
                  );
                }
              })
              .catch((error) => {
                console.error("❌ Failed immediate KB sync:", error);
              });
          } else {
            console.log("⏳ VectorStore not ready for immediate KB sync:", {
              hasVectorStore: !!vectorStore,
              isInitialized: vectorStoreInitialized,
              processingAvailable,
            });
          }
        }

        // BACKUP SYNC: Reload frames from storage with retry logic
        let retryCount = 0;
        const maxRetries = 3;

        const reloadWithRetry = async () => {
          try {
            await loadFramesFromStorage();
            console.log("✅ Frames reloaded from storage after graph save");
          } catch (error) {
            console.error(
              `❌ Failed to reload frames after graph save (attempt ${retryCount + 1}):`,
              error
            );

            if (retryCount < maxRetries) {
              retryCount++;
              setTimeout(reloadWithRetry, 500 * retryCount); // Exponential backoff
            } else {
              console.error(
                "❌ Maximum retry attempts reached for frame reload"
              );
            }
          }
        };

        // Add delay to ensure storage write is complete
        setTimeout(reloadWithRetry, 100);

        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `✅ Graph saved successfully!\n\n📊 Saved: ${frameCount} frames, ${nodeCount} nodes, ${edgeCount} connections\n🕐 Time: ${new Date(timestamp).toLocaleTimeString()}\n\n🔄 Linear view synchronized with graph changes.${hasFrameUpdates ? "\n✨ Frame updates applied immediately!" : ""}`,
          },
        ]);

        debugEvent("graph-saved", event.detail, "processed");
      } catch (error) {
        console.error("❌ Error handling graph saved event:", error);
        debugEvent("graph-saved", event.detail, "error");
      }
    };

    // Listen for graph frame selection events to sync Frame Navigation
    const handleGraphFrameSelected = (event: CustomEvent) => {
      try {
        // Validate event structure
        if (!event.detail || typeof event.detail !== "object") {
          console.warn(
            "⚠️ Invalid graph frame selected event - missing detail"
          );
          return;
        }

        const { frameId, frameIndex } = event.detail;

        // Validate event data
        if (typeof frameIndex !== "number" || frameIndex < 0) {
          console.warn(
            "⚠️ Invalid graph frame selected event - invalid frameIndex:",
            frameIndex
          );
          return;
        }

        if (frameIndex !== -1 && frameIndex !== currentFrameIndex) {
          console.log("🔄 Graph frame selection → Frame Navigation sync:", {
            frameId,
            frameIndex,
            currentFrameIndex,
          });
          setCurrentFrameIndex(frameIndex);
        }
      } catch (error) {
        console.error("❌ Error handling graph frame selection:", error);
      }
    };

    // Listen for graph actions that modify frames
    const handleGraphFrameAdded = (event: CustomEvent) => {
      try {
        // Validate event structure
        if (!event.detail || typeof event.detail !== "object") {
          console.warn("⚠️ Invalid graph frame added event - missing detail");
          return;
        }

        const { newFrame } = event.detail;

        // Validate frame data
        if (
          !newFrame ||
          typeof newFrame !== "object" ||
          !newFrame.id ||
          !newFrame.title
        ) {
          console.warn(
            "⚠️ Invalid graph frame added event - invalid frame data:",
            newFrame
          );
          return;
        }

        console.log("🔄 Graph frame added → Frame Navigation sync:", {
          newFrame: newFrame,
          currentFrameCount: frames.length,
          newFrameId: newFrame.id,
        });

        // FIXED: Check if frame already exists to prevent replacement
        const frameExists = frames.some((f) => f.id === newFrame.id);
        if (frameExists) {
          console.log(
            "ℹ️ Frame already exists, skipping duplicate:",
            newFrame.id
          );
          return;
        }

        // FIXED: Use smart frame merging to add new frame (preserve existing frames)
        const updatedFrames = mergeFrameUpdates(frames, [newFrame]);
        console.log("✅ Frame merge result:", {
          beforeCount: frames.length,
          afterCount: updatedFrames.length,
          addedFrame: newFrame.title,
        });

        // CRITICAL FIX: Ensure frames array is never empty
        if (updatedFrames.length === 0) {
          console.warn(
            "⚠️ Frame merge resulted in empty array, preserving existing frames"
          );
          return;
        }

        setFrames(updatedFrames);
        setCurrentFrameIndex(updatedFrames.length - 1); // Navigate to new frame

        // FIXED: Immediately sync new frame to Knowledge Base with verification
        if (vectorStore && vectorStoreInitialized && processingAvailable) {
          console.log(
            "🔄 Immediately syncing new frame to Knowledge Base:",
            newFrame.title
          );

          const syncWithVerification = async () => {
            try {
              await saveAllFramesToKB();

              // FIXED: Verify frame was actually saved to KB
              setTimeout(async () => {
                try {
                  const kbFrames = await loadFramesFromKnowledgeBase();
                  const frameExists = kbFrames.some(
                    (f) => f.id === newFrame.id
                  );
                  console.log(
                    `✅ Frame persistence verification: ${frameExists ? "SUCCESS" : "FAILED"} - Frame "${newFrame.title}" ${frameExists ? "found" : "NOT found"} in KB`
                  );

                  if (!frameExists) {
                    console.warn(
                      "⚠️ Frame not found in KB after save, attempting re-save..."
                    );
                    await saveAllFramesToKB();
                  }
                } catch (error) {
                  console.error(
                    "❌ Frame persistence verification failed:",
                    error
                  );
                }
              }, 300);
            } catch (error) {
              console.error("❌ Immediate KB sync failed:", error);
            }
          };

          setTimeout(syncWithVerification, 100); // Small delay to ensure state is updated
        }

        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `🎯 New frame created in graph view: "${newFrame.title}"\n\n📊 Frame Navigation updated automatically.`,
          },
        ]);
      } catch (error) {
        console.error("❌ Error handling graph frame added:", error);
      }
    };

    const handleGraphFrameDeleted = (event: CustomEvent) => {
      try {
        // Validate event structure
        if (!event.detail || typeof event.detail !== "object") {
          console.warn("⚠️ Invalid graph frame deleted event - missing detail");
          return;
        }

        const { deletedFrameId, remainingFrames } = event.detail;

        // Validate frame data
        if (!Array.isArray(remainingFrames)) {
          console.warn(
            "⚠️ Invalid graph frame deleted event - invalid remainingFrames:",
            remainingFrames
          );
          return;
        }

        console.log(
          "🔄 Graph frame deleted → Frame Navigation sync:",
          deletedFrameId
        );

        // Validate and update remaining frames
        updateFrameState(remainingFrames, "graph-delete");

        // Update current index if needed
        if (currentFrameIndex >= remainingFrames.length) {
          setCurrentFrameIndex(Math.max(0, remainingFrames.length - 1));
        }

        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `🗑️ Frame deleted in graph view.\n\n📊 Frame Navigation updated automatically.`,
          },
        ]);
      } catch (error) {
        console.error("❌ Error handling graph frame deleted:", error);
      }
    };

    const handleGraphAttachmentChanged = (event: CustomEvent) => {
      try {
        // Validate event structure
        if (!event.detail || typeof event.detail !== "object") {
          console.warn(
            "⚠️ Invalid graph attachment changed event - missing detail"
          );
          return;
        }

        const { frameId, attachment, action } = event.detail;

        // Validate event data
        if (!frameId || typeof frameId !== "string") {
          console.warn(
            "⚠️ Invalid graph attachment changed event - invalid frameId:",
            frameId
          );
          return;
        }

        if (!action || typeof action !== "string") {
          console.warn(
            "⚠️ Invalid graph attachment changed event - invalid action:",
            action
          );
          return;
        }

        console.log("🔄 Graph attachment change → Frame Navigation sync:", {
          frameId,
          action,
        });

        // Debug: Log the attachment data being received
        if (attachment?.type === "video") {
          console.log("🎥 Video attachment event:", {
            frameId,
            action,
            videoUrl: attachment?.data?.videoUrl,
          });
        }

        // Update frame with attachment using smart merging
        const updatedFrames = frames.map((frame) =>
          frame.id === frameId
            ? {
                ...frame,
                attachment,
                // Update legacy fields for backward compatibility
                ...(attachment?.type === "video" && {
                  videoUrl: attachment.data?.videoUrl || "",
                  startTime: attachment.data?.startTime || 0,
                  duration: attachment.data?.duration || 300,
                }),
                updatedAt: new Date().toISOString(),
              }
            : frame
        );

        // Debug: Log the updated frame
        const updatedFrame = updatedFrames.find((f) => f.id === frameId);
        if (updatedFrame?.attachment?.type === "video") {
          console.log("🎥 Frame updated with video attachment:", {
            frameId,
            videoUrl: updatedFrame.attachment.data?.videoUrl,
          });
        }

        // CRITICAL: Update frame state directly to prevent circular updates
        setFrames(updatedFrames);

        // Sync to KB after a short delay to prevent RxDB conflicts
        setTimeout(() => {
          console.log("🔄 Syncing attachment changes to KB after delay");

          // ENHANCED: Set sync flag with timeout protection to coordinate with FrameGraphIntegration
          if (typeof window !== "undefined") {
            const aiFramesApp = (window as any).aiFramesApp || {};
            aiFramesApp.syncInProgress = true;
            aiFramesApp.syncStartTime = Date.now();
            aiFramesApp.syncSource = "main-page-attachment";
            (window as any).aiFramesApp = aiFramesApp;

            console.log("🔒 Main page sync flag set:", {
              syncInProgress: aiFramesApp.syncInProgress,
              syncSource: aiFramesApp.syncSource,
              startTime: aiFramesApp.syncStartTime,
            });
          }

          syncGraphChangesToKB(updatedFrames).finally(() => {
            // ENHANCED: Always clear sync flag with error handling
            if (typeof window !== "undefined") {
              const aiFramesApp = (window as any).aiFramesApp || {};
              aiFramesApp.syncInProgress = false;
              aiFramesApp.syncStartTime = null;
              aiFramesApp.syncSource = null;
              (window as any).aiFramesApp = aiFramesApp;

              console.log("🔓 Main page sync flag cleared");
            }
          });

          // ENHANCED: Add timeout protection for stuck sync flags
          setTimeout(() => {
            if (typeof window !== "undefined") {
              const aiFramesApp = (window as any).aiFramesApp || {};
              if (aiFramesApp.syncInProgress && aiFramesApp.syncStartTime) {
                const syncDuration = Date.now() - aiFramesApp.syncStartTime;
                if (syncDuration > 5000) {
                  // 5 second timeout
                  console.warn(
                    "⚠️ Sync flag stuck, force clearing after 5 seconds:",
                    {
                      syncDuration,
                      syncSource: aiFramesApp.syncSource,
                    }
                  );
                  aiFramesApp.syncInProgress = false;
                  aiFramesApp.syncStartTime = null;
                  aiFramesApp.syncSource = null;
                  (window as any).aiFramesApp = aiFramesApp;
                }
              }
            }
          }, 5000);
        }, 200);

        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `🔗 Content ${action} in graph view.\n\n📊 Frame Navigation synchronized with attachment changes.`,
          },
        ]);
      } catch (error) {
        console.error("❌ Error handling graph attachment changed:", error);
      }
    };

    window.addEventListener("graph-saved", handleGraphSaved as EventListener);
    window.addEventListener(
      "graph-frame-selected",
      handleGraphFrameSelected as EventListener
    );
    window.addEventListener(
      "graph-frame-added",
      handleGraphFrameAdded as EventListener
    );
    window.addEventListener(
      "graph-frame-deleted",
      handleGraphFrameDeleted as EventListener
    );
    window.addEventListener(
      "graph-attachment-changed",
      handleGraphAttachmentChanged as EventListener
    );

    // Handle force save frames event
    const handleForceSaveFrames = (event: CustomEvent) => {
      const { reason, frameId, attachmentType } = event.detail;
      console.log("💾 Force save frames requested:", {
        reason,
        frameId,
        attachmentType,
      });

      // Force save all frames to Knowledge Base
      if (frames.length > 0) {
        saveAllFramesToKB();
      }
    };

    window.addEventListener(
      "force-save-frames",
      handleForceSaveFrames as EventListener
    );

    // Handle frames-updated event for view synchronization
    const handleFramesUpdated = (event: CustomEvent) => {
      const { frames: updatedFrames, source } = event.detail;
      console.log(`🔄 Frames updated event received:`, {
        frameCount: updatedFrames.length,
        source,
        timestamp: new Date().toISOString(),
      });

      // Force state update to trigger re-render
      setFrames(updatedFrames);

      // Ensure current frame index is valid
      if (currentFrameIndex >= updatedFrames.length) {
        setCurrentFrameIndex(Math.max(0, updatedFrames.length - 1));
      }
    };

    window.addEventListener(
      "frames-updated",
      handleFramesUpdated as EventListener
    );

    // Listen for KB update events to provide user feedback
    const handleKBUpdated = (event: CustomEvent) => {
      const { frameCount, syncType, source, timestamp } = event.detail;
      console.log(`✅ Knowledge Base updated (${syncType}):`, {
        frameCount,
        source,
        timestamp,
      });

      // Add user feedback for immediate syncs
      if (syncType === "immediate" && source === "graph-save") {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `📚 Knowledge Base updated immediately! ${frameCount} frames synced from graph changes.`,
          },
        ]);
      }
    };

    window.addEventListener(
      "aiframes-kb-updated",
      handleKBUpdated as EventListener
    );

    return () => {
      window.removeEventListener(
        "graph-saved",
        handleGraphSaved as EventListener
      );
      window.removeEventListener(
        "graph-frame-selected",
        handleGraphFrameSelected as EventListener
      );
      window.removeEventListener(
        "graph-frame-added",
        handleGraphFrameAdded as EventListener
      );
      window.removeEventListener(
        "graph-frame-deleted",
        handleGraphFrameDeleted as EventListener
      );
      window.removeEventListener(
        "graph-attachment-changed",
        handleGraphAttachmentChanged as EventListener
      );
      window.removeEventListener(
        "force-save-frames",
        handleForceSaveFrames as EventListener
      );
      window.removeEventListener(
        "frames-updated",
        handleFramesUpdated as EventListener
      );
      window.removeEventListener(
        "aiframes-kb-updated",
        handleKBUpdated as EventListener
      );
    };
  }, [
    loadFramesFromStorage,
    currentFrameIndex,
    vectorStore,
    vectorStoreInitialized,
    processingAvailable,
    syncGraphChangesToKB,
    updateFrameState,
    mergeFrameUpdates,
    frames,
  ]);

  // Enhanced cross-page synchronization system - Listen for metadata changes from other pages
  useEffect(() => {
    if (!metadataManager) return;

    const refreshMetadata = () => {
      try {
        console.log("🔄 AI-Frames: Refreshing metadata from storage...");
        const updatedBubblSpaces = metadataManager.getAllBubblSpaces();
        const updatedTimeCapsules = metadataManager.getAllTimeCapsules();

        console.log("📦 AI-Frames metadata refresh:", {
          bubblSpaces: updatedBubblSpaces.length,
          timeCapsules: updatedTimeCapsules.length,
          currentBubblSpace: currentBubblSpace?.name,
          currentTimeCapsule: currentTimeCapsule?.name,
        });

        setAllBubblSpaces(updatedBubblSpaces);
        setAllTimeCapsules(updatedTimeCapsules);

        // Update current selections if they were modified
        const currentBubblSpaceUpdated = updatedBubblSpaces.find(
          (b) => b.id === currentBubblSpace?.id
        );
        if (
          currentBubblSpaceUpdated &&
          JSON.stringify(currentBubblSpaceUpdated) !==
            JSON.stringify(currentBubblSpace)
        ) {
          console.log("🏢 Current BubblSpace updated, applying changes...");
          setCurrentBubblSpace(currentBubblSpaceUpdated);
        }

        const currentTimeCapsuleUpdated = updatedTimeCapsules.find(
          (t) => t.id === currentTimeCapsule?.id
        );
        if (
          currentTimeCapsuleUpdated &&
          JSON.stringify(currentTimeCapsuleUpdated) !==
            JSON.stringify(currentTimeCapsule)
        ) {
          console.log("🕰️ Current TimeCapsule updated, applying changes...");
          setCurrentTimeCapsule(currentTimeCapsuleUpdated);
        }

        console.log("✅ AI-Frames metadata refresh completed");
      } catch (error) {
        console.error("❌ AI-Frames metadata refresh failed:", error);
      }
    };

    const handleMetadataStorageChange = (event: StorageEvent) => {
      if (
        event.key === "bubblspaces_metadata" ||
        event.key === "timecapsules_metadata"
      ) {
        console.log(
          "🔄 Cross-page metadata storage change detected in AI-Frames:",
          {
            key: event.key,
            hasNewValue: !!event.newValue,
            timestamp: new Date().toISOString(),
          }
        );

        // Reload metadata from storage with delay to ensure write completion
        setTimeout(() => {
          console.log(
            "📦 Executing AI-Frames metadata refresh from cross-page storage change..."
          );
          refreshMetadata();
        }, 100);
      }
    };

    const handleBubblSpaceChange = (event: CustomEvent) => {
      console.log("🏢 Same-page BubblSpace change detected in AI-Frames:", {
        type: event.detail?.type,
        bubblSpaceName: event.detail?.bubblSpace?.name,
        bubblSpaceId: event.detail?.bubblSpace?.id,
        timestamp: new Date().toISOString(),
      });

      setTimeout(() => {
        console.log(
          "📦 Executing AI-Frames metadata refresh from BubblSpace change..."
        );
        refreshMetadata();

        // Update AI-Frames with new BubblSpace relationship if needed
        if (event.detail?.bubblSpace && frames.length > 0) {
          console.log("🔗 Updating AI-Frames BubblSpace relationship...");
          setFrames((prev) =>
            prev.map((frame) => ({
              ...frame,
              bubblSpaceId: event.detail.bubblSpace.id,
              updatedAt: new Date().toISOString(),
            }))
          );
        }
      }, 50);
    };

    const handleTimeCapsuleChange = (event: CustomEvent) => {
      console.log("🕰️ Same-page TimeCapsule change detected in AI-Frames:", {
        type: event.detail?.type,
        timeCapsuleName: event.detail?.timeCapsule?.name,
        timeCapsuleId: event.detail?.timeCapsule?.id,
        timestamp: new Date().toISOString(),
      });

      setTimeout(() => {
        console.log(
          "📦 Executing AI-Frames metadata refresh from TimeCapsule change..."
        );
        refreshMetadata();

        // Update AI-Frames with new TimeCapsule relationship if needed
        if (event.detail?.timeCapsule && frames.length > 0) {
          console.log("🔗 Updating AI-Frames TimeCapsule relationship...");
          setFrames((prev) =>
            prev.map((frame) => ({
              ...frame,
              timeCapsuleId: event.detail.timeCapsule.id,
              updatedAt: new Date().toISOString(),
            }))
          );
        }
      }, 50);
    };

    // AUTO-SYNC: Sync metadata to Knowledge Base every 30 seconds
    const autoSyncInterval = setInterval(() => {
      if (metadataManager && vectorStore && vectorStore.initialized) {
        console.log(
          "🔄 Auto-sync: Syncing AI-Frames metadata to Knowledge Base..."
        );

        const bubblSpaces = metadataManager.getAllBubblSpaces();
        const timeCapsules = metadataManager.getAllTimeCapsules();

        metadataManager
          .saveMetadataToVectorStore(bubblSpaces, timeCapsules)
          .then(() => {
            console.log("✅ Auto-sync: AI-Frames metadata synced successfully");

            // Also sync AI-Frames data to Knowledge Base
            return saveAllFramesToKB();
          })
          .then(() => {
            console.log("✅ Auto-sync: AI-Frames data synced successfully");
          })
          .catch((error: any) => {
            console.warn(
              "⚠️ Auto-sync: Failed to sync AI-Frames data:",
              error.message
            );
          });
      } else {
        console.log(
          "⏳ Auto-sync: Waiting for AI-Frames metadata manager and vector store..."
        );
      }
    }, 30000); // 30 seconds

    // Enhanced event listeners
    window.addEventListener("storage", handleMetadataStorageChange);
    window.addEventListener(
      "bubblspace-metadata-changed",
      handleBubblSpaceChange as EventListener
    );
    window.addEventListener(
      "timecapsule-metadata-changed",
      handleTimeCapsuleChange as EventListener
    );

    console.log(
      "🔄 Enhanced cross-page sync established for AI-Frames with auto-sync every 30 seconds"
    );

    return () => {
      window.removeEventListener("storage", handleMetadataStorageChange);
      window.removeEventListener(
        "bubblspace-metadata-changed",
        handleBubblSpaceChange as EventListener
      );
      window.removeEventListener(
        "timecapsule-metadata-changed",
        handleTimeCapsuleChange as EventListener
      );

      // Clear auto-sync interval
      clearInterval(autoSyncInterval);
      console.log("🛑 Auto-sync: AI-Frames auto-sync stopped");
      console.log("🔄 AI-Frames cross-page sync listeners removed");
    };
  }, [metadataManager, currentBubblSpace, currentTimeCapsule, frames.length]);

  // Initialize TTS when not in creation mode
  useEffect(() => {
    if (!isCreationMode && isVoiceEnabled && typeof window !== "undefined") {
      initializeTTS();
    }
  }, [isCreationMode, isVoiceEnabled]);

  const cancelAutoAdvance = () => {
    if (autoAdvanceTimer) {
      clearInterval(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    setAutoAdvanceCountdown(0);
    setChatMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: `⏹️ Auto-advance cancelled. Use the navigation buttons to move between frames manually.`,
      },
    ]);
  };

  // Auto-advance to next frame after video ends
  useEffect(() => {
    const currentFrameForAutoAdvance = frames[currentFrameIndex];
    if (!isCreationMode && autoAdvanceEnabled && currentFrameForAutoAdvance) {
      const advanceDelay = (currentFrameForAutoAdvance.duration + 3) * 1000; // 3 seconds after video ends

      const timer = setTimeout(() => {
        // Start countdown
        setAutoAdvanceCountdown(5);

        // Show countdown message
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `⏰ Video segment complete! Auto-advancing to next frame in 5 seconds...`,
          },
        ]);

        // Countdown timer
        let countdown = 5;
        const countdownInterval = setInterval(() => {
          countdown--;
          setAutoAdvanceCountdown(countdown);

          if (countdown <= 0) {
            clearInterval(countdownInterval);
            if (currentFrameIndex < frames.length - 1) {
              setCurrentFrameIndex(currentFrameIndex + 1);
              setChatMessages((prev) => [
                ...prev,
                {
                  role: "ai",
                  content: `▶️ Moving to Frame ${currentFrameIndex + 2}: ${
                    frames[currentFrameIndex + 1]?.title || "Next Frame"
                  }`,
                },
              ]);
            } else {
              setChatMessages((prev) => [
                ...prev,
                {
                  role: "ai",
                  content: `🎉 Congratulations! You've completed all frames in this learning sequence.`,
                },
              ]);
            }
            setAutoAdvanceCountdown(0);
          }
        }, 1000);

        setAutoAdvanceTimer(countdownInterval);
      }, advanceDelay);

      return () => {
        clearTimeout(timer);
        if (autoAdvanceTimer) {
          clearInterval(autoAdvanceTimer);
          setAutoAdvanceTimer(null);
        }
      };
    }
  }, [
    currentFrameIndex,
    isCreationMode,
    autoAdvanceEnabled,
    frames.length,
    frames,
  ]);

  // Auto-narrate when frame changes in learn mode
  useEffect(() => {
    // Get current frame safely
    const currentFrameInEffect = frames[currentFrameIndex];

    if (
      !isCreationMode &&
      isVoiceEnabled &&
      ttsReady &&
      currentFrameInEffect &&
      userHasInteracted
    ) {
      // Reset video to beginning when frame changes
      if (videoRef.current && currentFrameInEffect.videoUrl) {
        const videoId = extractVideoId(currentFrameInEffect.videoUrl);
        if (videoId) {
          const resetUrl = `https://www.youtube.com/embed/${videoId}?start=${
            currentFrameInEffect.startTime
          }&end=${
            currentFrameInEffect.startTime + currentFrameInEffect.duration
          }&autoplay=0&controls=1&modestbranding=1&rel=0`;
          videoRef.current.src = resetUrl;
        }
      }

      // Start narration (which will auto-play video when complete)
      narrateFrame(currentFrameInEffect);
    }
  }, [
    currentFrameIndex,
    isCreationMode,
    isVoiceEnabled,
    ttsReady,
    userHasInteracted,
  ]);

  // Detect user interaction to enable TTS
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserHasInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  // Cleanup TTS on unmount or mode change
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop TTS when switching to creation mode
  useEffect(() => {
    if (isCreationMode && isSpeaking) {
      stopSpeaking();
    }
  }, [isCreationMode]);

  const initializeTTS = async () => {
    try {
      // Check if speech synthesis is available
      if (!window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return;
      }

      // Wait for voices to load
      const loadVoices = () => {
        return new Promise<void>((resolve) => {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            setAvailableVoices(voices);
            selectBestVoice(voices);
            setTtsReady(true);
            resolve();
          } else {
            window.speechSynthesis.addEventListener(
              "voiceschanged",
              () => {
                const newVoices = window.speechSynthesis.getVoices();
                setAvailableVoices(newVoices);
                selectBestVoice(newVoices);
                setTtsReady(true);
                resolve();
              },
              { once: true }
            );
          }
        });
      };

      await loadVoices();
      console.log("✅ TTS initialized successfully");
    } catch (error) {
      console.error("❌ TTS initialization failed:", error);
    }
  };

  const selectBestVoice = (voices: SpeechSynthesisVoice[]) => {
    // Priority order for high-quality voices - Google UK English Female as default
    const voicePriority = [
      // Google UK English Female as top priority
      "Google UK English Female",
      "Google UK English",

      // Other premium neural voices
      "Google US English",
      "Google UK English Male",
      "Microsoft Zira - English (United States)",
      "Microsoft David - English (United States)",
      "Microsoft Mark - English (United States)",

      // System voices (good quality)
      "Alex", // macOS
      "Samantha", // macOS
      "Victoria", // macOS
      "Karen", // macOS
      "Microsoft Zira Desktop", // Windows
      "Microsoft David Desktop", // Windows

      // Fallback to any English voice
      "en-US",
      "en-GB",
      "en-AU",
    ];

    // Find the best available voice
    let bestVoice = null;

    for (const priorityVoice of voicePriority) {
      const found = voices.find(
        (voice) =>
          voice.name.includes(priorityVoice) ||
          voice.lang.includes(priorityVoice) ||
          voice.name === priorityVoice
      );
      if (found) {
        bestVoice = found;
        break;
      }
    }

    // If no priority voice found, use the first English voice
    if (!bestVoice) {
      bestVoice =
        voices.find(
          (voice) => voice.lang.startsWith("en") && voice.localService
        ) ||
        voices.find((voice) => voice.lang.startsWith("en")) ||
        voices[0];
    }

    setSelectedVoice(bestVoice);
    console.log(`🎙️ Selected voice: ${bestVoice?.name} (${bestVoice?.lang})`);
  };

  const getVoiceQuality = (
    voice: SpeechSynthesisVoice
  ): "premium" | "good" | "basic" => {
    const premiumVoices = [
      "Microsoft Zira",
      "Microsoft David",
      "Microsoft Mark",
      "Google US English",
      "Google UK English",
      "Alex",
      "Samantha",
      "Victoria",
    ];

    const goodVoices = [
      "Karen",
      "Veena",
      "Daniel",
      "Moira",
      "Tessa",
      "Microsoft",
      "Google",
    ];

    if (premiumVoices.some((pv) => voice.name.includes(pv))) {
      return "premium";
    } else if (goodVoices.some((gv) => voice.name.includes(gv))) {
      return "good";
    }
    return "basic";
  };

  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis || !isVoiceEnabled) {
        resolve();
        return;
      }

      // Check if user has interacted (required for autoplay policies)
      if (!userHasInteracted) {
        console.log("⚠️ TTS requires user interaction first");
        resolve();
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Use selected voice or fallback to best available
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        const voices = window.speechSynthesis?.getVoices() || [];
        const preferredVoice = voices.find(
          (voice) =>
            voice.name.includes("Google") ||
            voice.name.includes("Microsoft") ||
            voice.lang.startsWith("en")
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      // Apply voice settings
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentNarration(text);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentNarration("");
        resolve();
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        setCurrentNarration("");

        // Handle different error types gracefully
        if (event.error === "not-allowed") {
          console.log("⚠️ TTS not allowed - user interaction required");
        } else if (event.error === "interrupted") {
          console.log(
            "⚠️ TTS interrupted - this is normal when switching frames"
          );
        } else {
          console.error("❌ Speech synthesis error:", event.error);
        }

        // Don't reject on 'interrupted' errors as they're normal
        if (event.error === "interrupted") {
          resolve();
        } else {
          reject(event.error);
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("❌ Failed to start speech synthesis:", error);
        setIsSpeaking(false);
        setCurrentNarration("");
        reject(error);
      }
    });
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentNarration("");
    }
  };

  const narrateFrame = async (frame: AIFrame) => {
    if (!isVoiceEnabled || isSpeaking) return;

    try {
      // Create narration text for the frame
      const narrationText = `
        Welcome to Frame ${currentFrameIndex + 1}: ${frame.title}.
        
        Our learning goal for this frame is: ${frame.goal}
        
        Let me provide some context: ${frame.informationText
          .replace(/\n/g, " ")
          .substring(0, 300)}...
        
        Now, let's watch the video segment to see this concept in action.
      `
        .replace(/\s+/g, " ")
        .trim();

      // Speak the narration
      await speakText(narrationText);

      // Show auto-play indicator
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🎬 Narration complete! Auto-playing video in 3 seconds...`,
        },
      ]);

      // Auto-play YouTube video after narration completes
      setTimeout(() => {
        if (!isSpeaking) {
          // Start YouTube video playback
          startYouTubeVideo();

          setChatMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: `▶️ Video is now playing! Watch "${
                frame.goal
              }" in action. The video will play the specific segment from ${formatTime(
                frame.startTime
              )} for ${formatTime(frame.duration)}.`,
            },
          ]);
        }
      }, 3000); // 3 second delay to give user time to see the indicator
    } catch (error) {
      console.error("Narration failed:", error);
    }
  };

  const startYouTubeVideo = () => {
    try {
      // Get current frame safely
      const currentFrame = frames[currentFrameIndex];
      const videoContent = getVideoContent(currentFrame);

      if (videoRef.current && videoContent?.videoUrl) {
        // Send play command to YouTube iframe
        const iframe = videoRef.current;
        const videoId = extractVideoId(videoContent.videoUrl);

        if (videoId) {
          // Create new iframe src with autoplay enabled
          const newEmbedUrl = `https://www.youtube.com/embed/${videoId}?start=${
            videoContent.startTime
          }&end=${
            videoContent.startTime + videoContent.duration
          }&autoplay=1&controls=1&modestbranding=1&rel=0`;
          iframe.src = newEmbedUrl;

          console.log(`🎬 Auto-playing YouTube video: ${currentFrame.title}`);
        }
      }
    } catch (error) {
      console.error("Failed to auto-play YouTube video:", error);
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match ? match[1] : null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleConceptClick = async (concept: string) => {
    setSelectedConcept(concept);

    // Get current frame safely
    const currentFrameForConcept = frames[currentFrameIndex];

    // Track concept click
    pageAnalytics.trackFeatureUsage("concept_exploration", {
      concept: concept,
      current_frame: currentFrameIndex,
      frame_title: currentFrameForConcept?.title,
      total_concepts: currentFrameForConcept?.aiConcepts.length,
    });

    // Enhanced AI response using DeepResearch and Knowledge Base
    let aiResponse = `Let me explain ${concept} in the context of your current learning path:

Based on your TimeCapsule data and knowledge base, here's what you need to know about ${concept}:`;

    // Search knowledge base for related content
    if (vectorStore) {
      try {
        const searchResults = await vectorStore.searchSimilar(concept, 0.3, 5);
        if (searchResults.length > 0) {
          aiResponse += `\n\n**From your Knowledge Base:**\n`;
          searchResults.forEach((result, index) => {
            aiResponse += `• ${
              result.document.title
            }: ${result.chunk.content.substring(0, 200)}...\n`;
          });
        }
      } catch (error) {
        console.error("Knowledge base search failed:", error);
      }
    }

    // Check TimeCapsule research for related topics
    if (timeCapsuleData?.research?.topics) {
      const relatedTopics = timeCapsuleData.research.topics.filter(
        (topic: any) =>
          topic.title.toLowerCase().includes(concept.toLowerCase()) ||
          topic.description.toLowerCase().includes(concept.toLowerCase())
      );

      if (relatedTopics.length > 0) {
        aiResponse += `\n\n**Related Research Topics:**\n`;
        relatedTopics.forEach((topic: any) => {
          aiResponse += `• ${topic.title}: ${topic.description}\n`;
        });
      }
    }

    aiResponse += `\n\nThis concept connects to your current frame "${currentFrameForConcept.title}" and will help you achieve your goal: "${currentFrameForConcept.goal}"

Would you like me to create a new frame focused specifically on ${concept}?`;

    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: `Tell me about ${concept}` },
      { role: "ai", content: aiResponse },
    ]);

    // Voice narration for concept explanation in Learn mode
    if (!isCreationMode && isVoiceEnabled && ttsReady) {
      const conceptNarration = `
        Let me explain ${concept}. 
        
        ${concept} is a key concept in your current learning path. 
        It relates directly to ${currentFrameForConcept.title} and helps you understand ${currentFrameForConcept.goal}.
        
        This concept is fundamental for your learning journey and connects to the other topics you're exploring.
      `
        .replace(/\s+/g, " ")
        .trim();

      try {
        await speakText(conceptNarration);
      } catch (error) {
        console.error("Concept narration failed:", error);
      }
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    // Get current frame safely
    const currentFrame = frames[currentFrameIndex];

    let aiResponse = `Great question! Based on your current frame "${currentFrame?.title || "your current learning session"}" and your learning journey, let me help you understand this concept better.`;

    // Enhanced AI response with knowledge base integration
    if (vectorStore) {
      try {
        const searchResults = await vectorStore.searchSimilar(
          chatInput,
          0.3,
          3
        );
        if (searchResults.length > 0) {
          aiResponse += `\n\n**Relevant information from your knowledge base:**\n`;
          searchResults.forEach((result, index) => {
            aiResponse += `${index + 1}. From "${
              result.document.title
            }": ${result.chunk.content.substring(0, 300)}...\n\n`;
          });
        }
      } catch (error) {
        console.error("Knowledge base search failed:", error);
      }
    }

    aiResponse += `\nThis relates to your current learning goal and connects to the concepts in this frame. Would you like me to suggest related frames or create new ones based on this topic?`;

    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: chatInput },
      { role: "ai", content: aiResponse },
    ]);
    setChatInput("");
  };

  const generateFrameContent = async (
    frameData: FrameCreationData
  ): Promise<AIFrame> => {
    setIsGeneratingFrame(true);

    try {
      // Simulate AI generation process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Analyze existing frames for concept relationships
      const existingConcepts = frames.flatMap((frame) => frame.aiConcepts);
      const relatedConcepts: string[] = [];

      // Simple concept matching (in real implementation, this would use AI)
      const goalWords = frameData.goal.toLowerCase().split(" ");
      existingConcepts.forEach((concept) => {
        if (goalWords.some((word) => concept.toLowerCase().includes(word))) {
          relatedConcepts.push(concept);
        }
      });

      // Generate new concepts based on goal and content type
      const newConcepts = [
        "Implementation Details",
        "Best Practices",
        "Common Pitfalls",
        "Performance Optimization",
        "Real-world Applications",
        "Advanced Techniques",
      ];

      const allConcepts = [
        ...new Set([...relatedConcepts, ...newConcepts]),
      ].slice(0, 6);

      // Generate content based on content type
      let contentInfo = "";
      let attachment = undefined;

      switch (frameData.contentType) {
        case "video":
          const videoId = extractVideoId(frameData.videoUrl);
          const startTime = frameData.startTime || 0;
          const duration = frameData.duration || 300;
          contentInfo = `Video Content: ${frameData.videoUrl}\nStart Time: ${startTime}s\nDuration: ${duration}s`;
          attachment = {
            id: `video-${Date.now()}`,
            type: "video",
            data: {
              videoUrl: frameData.videoUrl,
              startTime: startTime,
              duration: duration,
            },
          };
          break;

        case "pdf":
          contentInfo = `PDF Document: ${frameData.pdfUrl || ""}\nPages: ${frameData.pdfPages || "All pages"}\nNotes: ${frameData.pdfNotes || "No additional notes"}`;
          attachment = {
            id: `pdf-${Date.now()}`,
            type: "pdf",
            data: {
              pdfUrl: frameData.pdfUrl || "",
              pages: frameData.pdfPages,
              notes: frameData.pdfNotes,
            },
          };
          break;

        case "text":
          contentInfo = `Text Content: ${frameData.textContent?.substring(0, 100) || ""}...\nNotes: ${frameData.textNotes || "No additional notes"}`;
          attachment = {
            id: `text-${Date.now()}`,
            type: "text",
            data: {
              text: frameData.textContent || "",
              notes: frameData.textNotes,
            },
          };
          break;
      }

      const frameTitle =
        frameData.title ||
        `Learning: ${frameData.goal.substring(0, 50)}${
          frameData.goal.length > 50 ? "..." : ""
        }`;

      const newFrame: AIFrame = {
        id: `frame-${Date.now()}`,
        title: frameTitle,
        goal: frameData.goal,
        informationText: `
          This frame focuses on: ${frameData.goal}
          
          Content Type: ${frameData.contentType}
          ${contentInfo}
          
          Based on your TimeCapsule research and knowledge base, this topic connects to several key concepts 
          you've been exploring. The content has been curated to build upon your existing understanding 
          and guide you toward your learning objectives.
          
          Pay attention to how this relates to the concepts you've already covered in previous frames.
        `,
        videoUrl: frameData.contentType === "video" ? frameData.videoUrl : "",
        startTime: frameData.startTime || 0,
        duration: frameData.duration || 300,
        afterVideoText: `
          Key insights from this ${frameData.contentType} content:
          • This topic builds upon concepts from your previous frames
          • Understanding this will help you progress toward your learning goals
          • The content shown here is practical and applicable
          • Consider how this connects to your research findings
          
          Based on your knowledge base and research, here are the next steps in your learning journey.
        `,
        aiConcepts: allConcepts,
        isGenerated: true,
        sourceGoal: frameData.goal,
        sourceUrl:
          frameData.contentType === "video"
            ? frameData.videoUrl
            : frameData.contentType === "pdf"
              ? frameData.pdfUrl || ""
              : "",
        order: frames.length + 1,
        bubblSpaceId: "default",
        timeCapsuleId: "default",
        parentFrameId: undefined,
        type: "frame",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachment: attachment,
      };

      return newFrame;
    } finally {
      setIsGeneratingFrame(false);
    }
  };

  const handleCreateFrame = async () => {
    if (!newFrameData.goal.trim() || !newFrameData.contentType) {
      alert("Please provide a learning goal and select a content type");
      return;
    }

    // Validate content type specific requirements
    if (newFrameData.contentType === "video" && !newFrameData.videoUrl.trim()) {
      alert("Please provide a video URL for video content");
      return;
    }
    if (newFrameData.contentType === "pdf" && !newFrameData.pdfUrl?.trim()) {
      alert("Please provide a PDF URL for PDF content");
      return;
    }
    if (
      newFrameData.contentType === "text" &&
      !newFrameData.textContent?.trim()
    ) {
      alert("Please provide text content for text content");
      return;
    }

    try {
      const newFrame = await generateFrameContent(newFrameData);

      // FIXED: Properly append new frame to existing frames
      setFrames((prev) => {
        const updatedFrames = [...prev, newFrame];
        console.log("✅ Frame creation result:", {
          beforeCount: prev.length,
          afterCount: updatedFrames.length,
          newFrameTitle: newFrame.title,
          newFrameId: newFrame.id,
          contentType: newFrameData.contentType,
        });
        return updatedFrames;
      });

      setCurrentFrameIndex(frames.length); // Switch to new frame
      setShowCreationForm(false);

      // Reset form with all fields
      setNewFrameData({
        goal: "",
        videoUrl: "",
        startTime: 0,
        duration: 300,
        contentType: undefined,
        title: "",
        pdfUrl: "",
        pdfPages: "",
        pdfNotes: "",
        textContent: "",
        textNotes: "",
      });

      // Clear the cleared flag since we're creating new frames
      localStorage.removeItem("ai_frames_cleared");

      // Track frame creation
      pageAnalytics.trackFeatureUsage("frame_creation", {
        goal_length: newFrameData.goal.length,
        content_type: newFrameData.contentType,
        concepts_generated: newFrame.aiConcepts.length,
        total_frames: frames.length + 1,
      });

      // Add success message to chat
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `✅ Successfully created new ${newFrameData.contentType} frame: "${newFrame.title}"\n\nThis frame was generated based on your goal and existing knowledge base. The AI has identified ${newFrame.aiConcepts.length} related concepts that connect to your learning journey.`,
        },
      ]);
    } catch (error) {
      console.error("Failed to create frame:", error);
      pageAnalytics.trackError(
        "frame_creation_failed",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  const handleEditFrame = (frame: AIFrame) => {
    setEditingFrame(frame);
    setShowFrameEditor(true);
  };

  const handleDeleteFrame = (frameId: string) => {
    setFrameToDelete(frameId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteFrame = () => {
    if (frameToDelete) {
      setFrames((prev) => prev.filter((f) => f.id !== frameToDelete));
      if (currentFrameIndex >= frames.length - 1) {
        setCurrentFrameIndex(Math.max(0, frames.length - 2));
      }
      setFrameToDelete(null);
    }
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteFrame = () => {
    setFrameToDelete(null);
    setShowDeleteConfirmation(false);
  };

  // NEW: Clear all AI frames and sync to Knowledge Base
  const handleClearAllFrames = async () => {
    if (!frames.length) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "ℹ️ No AI frames to clear.",
        },
      ]);
      return;
    }

    setShowClearAllConfirmation(true);
  };

  const confirmClearAllFrames = async () => {
    setShowClearAllConfirmation(false);

    try {
      // Clear from Knowledge Base first
      if (vectorStore && vectorStoreInitialized) {
        console.log(
          `🗑️ Clearing ${frames.length} AI-Frames from Knowledge Base...`
        );

        for (const frame of frames) {
          const docId = `aiframe-${frame.id}`;
          try {
            await vectorStore.deleteDocument(docId);
            console.log(`✅ Deleted AI-Frame from KB: ${frame.title}`);
          } catch (deleteError) {
            console.warn(
              `⚠️ Failed to delete AI-Frame "${frame.title}" from KB:`,
              deleteError
            );
          }
        }

        // Also search for any other AI-Frames documents that might exist
        try {
          const allDocs = await vectorStore.getAllDocuments();
          const aiFramesDocs = allDocs.filter(
            (doc) => doc.metadata?.source === "ai-frames"
          );

          for (const doc of aiFramesDocs) {
            try {
              await vectorStore.deleteDocument(doc.id);
              console.log(
                `✅ Deleted additional AI-Frame document from KB: ${doc.title}`
              );
            } catch (deleteError) {
              console.warn(
                `⚠️ Failed to delete AI-Frame document "${doc.title}" from KB:`,
                deleteError
              );
            }
          }

          console.log(
            `✅ Cleared all AI-Frames from Knowledge Base (${frames.length} frames + ${aiFramesDocs.length} additional documents)`
          );
        } catch (searchError) {
          console.warn(
            "⚠️ Failed to search for additional AI-Frames documents:",
            searchError
          );
        }
      }

      // Clear local state
      const clearedCount = frames.length;
      setFrames([]);
      setCurrentFrameIndex(0);

      // Emit event to clear graph nodes
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("clear-all-frames", {
            detail: {
              clearedCount,
              timestamp: new Date().toISOString(),
            },
          })
        );
      }

      // Comprehensively clear localStorage data
      try {
        localStorage.removeItem("ai_frames_timecapsule");
        localStorage.removeItem("timecapsule_combined");
        localStorage.removeItem("deepresearch_data");
        localStorage.removeItem("ai_frames_cleared");
        localStorage.removeItem("ai_frames_graph_state");
        console.log(
          "🗑️ Completely cleared AI-Frames localStorage data including graph state"
        );
      } catch (storageError) {
        console.warn("⚠️ Failed to clear localStorage:", storageError);
      }

      // Reset other related state
      setGraphState(null);
      setChapters([]);
      setSelectedConcept(null);
      setShowAIConcepts(false);

      // Add success message to chat
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🗑️ Successfully cleared all ${clearedCount} AI frames!\n\n✅ Removed from local session\n✅ Cleared from Knowledge Base\n✅ Cleared localStorage data\n✅ Cleared graph nodes and connections\n✅ App will stay empty after reload\n\nYou can now start fresh or import a new TimeCapsule.`,
        },
      ]);

      // Track the clear action
      pageAnalytics.trackFeatureUsage("clear_all_frames", {
        frames_cleared: clearedCount,
        had_knowledge_base: !!vectorStore,
        bubblspace_id: currentBubblSpace?.id,
        timecapsule_id: currentTimeCapsule?.id,
      });

      // Dispatch event to notify other pages of AI-Frames clear
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("aiframes-cleared", {
            detail: {
              frameCount: clearedCount,
              bubblSpaceId: currentBubblSpace?.id,
              timecapsule_id: currentTimeCapsule?.id,
              timestamp: new Date().toISOString(),
            },
          })
        );
      }
    } catch (error) {
      console.error("❌ Failed to clear AI frames:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `❌ Failed to clear AI frames: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);

      pageAnalytics.trackError(
        "clear_all_frames_failed",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  const cancelClearAllFrames = () => {
    setShowClearAllConfirmation(false);
  };

  // Knowledge Base handlers
  const handleUploadDocuments = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && deepResearchApp) {
        deepResearchApp.handleFileUpload(files);
      }
    };
    input.click();
  };

  // FIXED: Helper function to ensure KB sync after Save Graph operations
  const ensureKBSyncAfterSaveGraph = async (frames: AIFrame[]) => {
    if (!vectorStore || !vectorStoreInitialized) {
      console.log("⏳ VectorStore not ready for KB sync");
      return;
    }

    try {
      console.log("🔄 Ensuring KB sync after Save Graph operation...");

      // Force refresh documents from IndexedDB
      const stats = await vectorStore.getStats();
      const documents = await vectorStore.getAllDocuments();
      const totalSize = documents.reduce(
        (sum, doc) => sum + (doc.metadata?.filesize || 0),
        0
      );

      // Update document status
      setDocumentStatus({
        count: stats.documentCount,
        totalSize: totalSize,
        vectorCount: stats.vectorCount,
      });

      setDocuments(documents);

      // Dispatch comprehensive KB update events
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("kb-documents-changed", {
            detail: {
              source: "save-graph-verification",
              frameCount: frames.length,
              documentCount: stats.documentCount,
              timestamp: new Date().toISOString(),
            },
          })
        );

        window.dispatchEvent(
          new CustomEvent("aiframes-kb-updated", {
            detail: {
              source: "save-graph-verification",
              frameCount: frames.length,
              timestamp: new Date().toISOString(),
              frames: frames,
              hasFrameUpdates: true,
            },
          })
        );
      }

      console.log("✅ KB sync verification completed:", {
        documentCount: stats.documentCount,
        totalSize: totalSize,
        vectorCount: stats.vectorCount,
        frameCount: frames.length,
      });
    } catch (error) {
      console.error("❌ Failed to verify KB sync after Save Graph:", error);
    }
  };

  const handleManageKnowledge = async () => {
    // FIXED: Enhanced force refresh with IndexedDB verification
    if (vectorStore && vectorStoreInitialized) {
      try {
        console.log(
          "🔄 Force refreshing Knowledge Base before opening manager..."
        );

        // Get fresh stats and documents from IndexedDB
        const stats = await vectorStore.getStats();
        const documents = await vectorStore.getAllDocuments();
        const totalSize = documents.reduce(
          (sum, doc) => sum + (doc.metadata?.filesize || 0),
          0
        );

        // Update document status with fresh data
        setDocumentStatus({
          count: stats.documentCount,
          totalSize: totalSize,
          vectorCount: stats.vectorCount,
        });

        setDocuments(documents);

        // FIXED: Verify IndexedDB sync status
        console.log(
          "✅ Knowledge Base force refreshed before opening manager:",
          {
            documentCount: stats.documentCount,
            totalSize: totalSize,
            vectorCount: stats.vectorCount,
            source: "manage-knowledge",
          }
        );

        // Dispatch event to notify other components
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("kb-manager-opened", {
              detail: {
                source: "manage-knowledge",
                documentCount: stats.documentCount,
                timestamp: new Date().toISOString(),
              },
            })
          );
        }
      } catch (error) {
        console.error("Failed to force refresh documents:", error);
      }
    }

    // Open the local Document Manager dialog
    setShowDocumentManager(true);
  };

  const handleScrapeUrl = () => {
    if (deepResearchApp) {
      deepResearchApp.openFirecrawlModal();
    }
  };

  const handleUploadRepository = () => {
    // Repository upload logic - placeholder for now
  };

  // Update document status when vectorStore changes
  useEffect(() => {
    const updateDocumentStatus = async () => {
      // ENHANCED: Check VectorStore's actual initialized state, not just provider state
      if (vectorStore && vectorStore.initialized) {
        try {
          const stats = await vectorStore.getStats();
          const documents = await vectorStore.getAllDocuments();
          const totalSize = documents.reduce(
            (sum, doc) => sum + (doc.metadata?.filesize || 0),
            0
          );

          setDocumentStatus({
            count: stats.documentCount,
            totalSize: totalSize,
            vectorCount: stats.vectorCount,
          });

          setDocuments(documents);
        } catch (error) {
          console.error("Failed to update document status:", error);
          // ENHANCED: Retry after VectorStore becomes ready
          setTimeout(() => {
            if (vectorStore && vectorStore.initialized) {
              console.log("🔄 Retrying document status update...");
              updateDocumentStatus();
            }
          }, 1000);
        }
      }
    };

    updateDocumentStatus();
  }, [vectorStore, vectorStoreInitialized]);

  // FIXED: Enhanced KB sync events listener with Save Graph support and navigation protection
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const refreshDocuments = async (source?: string) => {
      if (vectorStore && vectorStoreInitialized) {
        try {
          console.log(
            `🔄 Refreshing Knowledge Base documents after sync event (source: ${source || "unknown"})...`
          );
          const stats = await vectorStore.getStats();
          const documents = await vectorStore.getAllDocuments();
          const totalSize = documents.reduce(
            (sum, doc) => sum + (doc.metadata?.filesize || 0),
            0
          );

          setDocumentStatus({
            count: stats.documentCount,
            totalSize: totalSize,
            vectorCount: stats.vectorCount,
          });

          setDocuments(documents);
          console.log("✅ Knowledge Base documents refreshed:", {
            documentCount: stats.documentCount,
            totalSize: totalSize,
            vectorCount: stats.vectorCount,
            source: source,
          });
        } catch (error) {
          console.error("Failed to refresh documents after sync:", error);
        }
      }
    };

    const handleKBRefresh = (event: CustomEvent) => {
      console.log("🔄 KB refresh event received:", event.detail);
      refreshDocuments(event.detail?.source || "kb-refresh");
    };

    const handleKBDocumentsChanged = (event: CustomEvent) => {
      console.log("🔄 KB documents changed event received:", event.detail);
      refreshDocuments(event.detail?.source || "kb-documents-changed");
    };

    const handleAIFramesKBUpdated = (event: CustomEvent) => {
      console.log("🔄 AI-Frames KB updated event received:", event.detail);
      refreshDocuments(event.detail?.source || "aiframes-kb-updated");

      // FIXED: Update frames state if Save Graph was the source
      if (event.detail?.source === "save-graph" && event.detail?.frames) {
        console.log("🔄 Updating frames state from Save Graph KB update");
        setFrames(event.detail.frames);
      }
    };

    // FIXED: Navigation protection - listen for page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("🔄 Page hidden - saving current state before navigation");
        setIsNavigating(true);
        // Save current state to prevent loss during navigation
        if (frames.length > 0) {
          saveAllFramesToKB();
        }
      } else {
        console.log("🔄 Page visible - restoring state after navigation");
        setIsNavigating(false);
        // Small delay to ensure proper state restoration
        setTimeout(() => {
          loadFramesFromStorage();
        }, 100);
      }
    };

    // Listen for KB sync events
    window.addEventListener(
      "kb-force-refresh",
      handleKBRefresh as EventListener
    );
    window.addEventListener(
      "kb-documents-changed",
      handleKBDocumentsChanged as EventListener
    );
    window.addEventListener(
      "aiframes-kb-updated",
      handleAIFramesKBUpdated as EventListener
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener(
        "kb-force-refresh",
        handleKBRefresh as EventListener
      );
      window.removeEventListener(
        "kb-documents-changed",
        handleKBDocumentsChanged as EventListener
      );
      window.removeEventListener(
        "aiframes-kb-updated",
        handleAIFramesKBUpdated as EventListener
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [vectorStore, vectorStoreInitialized, frames.length]);

  // Document Manager handlers
  const handleKnowledgeBaseSearch = async () => {
    if (!vectorStore || !documentSearchQuery.trim()) {
      setShowSemanticResults(false);
      setSemanticSearchResults([]);
      setCurrentSemanticQuery("");
      return;
    }

    setIsSearching(true);
    try {
      const results = await vectorStore.searchSimilar(
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
  };

  const clearKnowledgeBaseSearch = () => {
    setDocumentSearchQuery("");
    setShowSemanticResults(false);
    setSemanticSearchResults([]);
    setCurrentSemanticQuery("");
  };

  const handlePreviewDocument = async (docId: string) => {
    if (!vectorStore) return;

    try {
      const doc = await vectorStore.getDocument(docId);
      if (doc) {
        setPreviewDocument(doc);
        setShowDocumentPreview(true);
      }
    } catch (error) {
      console.error("Failed to preview document:", error);
    }
  };

  const closeDocumentPreview = () => {
    setShowDocumentPreview(false);
    setPreviewDocument(null);
  };

  const handleViewChunk = (searchResult: any, document: any) => {
    const chunkData = {
      content: searchResult?.chunk?.content || "No content available",
      similarity: searchResult?.similarity || 0,
      chunkIndex: searchResult?.chunk?.id || "unknown",
      documentId: searchResult?.document?.id || "unknown",
      document: searchResult?.document ||
        document || { title: "Unknown Document" },
    };

    setCurrentChunk(chunkData);
    setShowChunkView(true);
  };

  const closeChunkView = () => {
    setShowChunkView(false);
    setCurrentChunk(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Document categorization
  const categorizeDocuments = (docs: any[]) => {
    const categories = {
      user: [] as any[],
      aiFrames: [] as any[],
      system: [] as any[],
      agentLogs: [] as any[],
    };

    docs.forEach((doc) => {
      if (
        doc.title.toLowerCase().includes("agent log") ||
        doc.metadata.source === "research_state"
      ) {
        categories.agentLogs.push(doc);
      } else if (
        doc.metadata.source === "ai-frames" ||
        doc.title.toLowerCase().includes("ai-frame")
      ) {
        categories.aiFrames.push(doc);
      } else if (
        doc.metadata.source === "timecapsule_export" ||
        doc.metadata.source === "timecapsule_import" ||
        doc.metadata.source === "aiframes_import" ||
        doc.metadata.source === "aiframes_combined" ||
        doc.title.toLowerCase().includes("timecapsule") ||
        doc.metadata.isGenerated === true
      ) {
        categories.system.push(doc);
      } else {
        categories.user.push(doc);
      }
    });

    return categories;
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

  const getDocumentCategoryCounts = () => {
    const categorized = categorizeDocuments(documents);
    return {
      user: categorized.user.length,
      aiFrames: categorized.aiFrames.length,
      system: categorized.system.length,
      agentLogs: categorized.agentLogs.length,
    };
  };

  const handleDragStart = (
    e: React.DragEvent,
    frameId: string,
    index: number
  ) => {
    setDraggedFrameId(frameId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", frameId);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if we're leaving the entire drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
    }
  };

  // Optimized drag and drop handler
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (!draggedFrameId) return;

    const draggedIndex = frames.findIndex(
      (frame) => frame.id === draggedFrameId
    );
    if (draggedIndex === -1 || draggedIndex === dropIndex) {
      setDraggedFrameId(null);
      setDragOverIndex(null);
      return;
    }

    // Optimized: Create new array with reordered frames in one pass
    const newFrames = [...frames];
    const [draggedFrame] = newFrames.splice(draggedIndex, 1);
    newFrames.splice(dropIndex, 0, draggedFrame);

    // Optimized: Only update order for affected frames (minimal changes)
    const reorderedFrames = newFrames.map((frame, index) => ({
      ...frame,
      order: index + 1,
      updatedAt: new Date().toISOString(),
    }));

    // Optimized: Update current frame index calculation
    let newCurrentIndex = currentFrameIndex;
    if (currentFrameIndex === draggedIndex) {
      newCurrentIndex = dropIndex;
    } else if (
      draggedIndex < currentFrameIndex &&
      dropIndex >= currentFrameIndex
    ) {
      newCurrentIndex = currentFrameIndex - 1;
    } else if (
      draggedIndex > currentFrameIndex &&
      dropIndex <= currentFrameIndex
    ) {
      newCurrentIndex = currentFrameIndex + 1;
    }

    // Optimized: Batch state updates
    setFrames(reorderedFrames);
    setCurrentFrameIndex(newCurrentIndex);
    setDraggedFrameId(null);
    setDragOverIndex(null);

    // Optimized: Async operations (non-blocking)
    setTimeout(() => {
      // Emit event to sync with graph view (async)
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("frames-reordered", {
            detail: {
              fromIndex: draggedIndex,
              toIndex: dropIndex,
              draggedFrameId: draggedFrame.id,
              reorderedFrames: reorderedFrames,
              newCurrentIndex: newCurrentIndex,
            },
          })
        );
      }

      // Add success message to chat (async)
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `✅ Frame reordered successfully! Frame "${
            draggedFrame.title
          }" moved to position ${dropIndex + 1}. Order numbers updated for all frames.\n\n🔄 Graph view synchronized with new order.`,
        },
      ]);

      console.log(
        "🔄 Frame order updated via drag & drop → Graph sync triggered:",
        {
          fromIndex: draggedIndex,
          toIndex: dropIndex,
          frameTitle: draggedFrame.title,
          totalFrames: reorderedFrames.length,
        }
      );
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggedFrameId(null);
    setDragOverIndex(null);
  };

  // Get current frame safely for video display
  const currentFrame = frames[currentFrameIndex];

  // Get video content from either attachment or legacy fields (memoized to prevent infinite loops)
  const getVideoContent = useCallback((frame: any) => {
    if (!frame) return null;

    if (frame?.attachment?.type === "video") {
      return {
        videoUrl: frame.attachment.data?.videoUrl,
        startTime: frame.attachment.data?.startTime || 0,
        duration: frame.attachment.data?.duration || 300,
      };
    } else if (frame?.videoUrl) {
      return {
        videoUrl: frame.videoUrl,
        startTime: frame.startTime || 0,
        duration: frame.duration || 300,
      };
    }
    return null;
  }, []);

  // Memoize video content to prevent unnecessary recalculations
  const videoContent = useMemo(() => {
    const content = getVideoContent(currentFrame);
    if (content) {
      console.log("🎥 Video content resolved:", {
        frameId: currentFrame?.id,
        videoUrl: content.videoUrl,
        startTime: content.startTime,
        duration: content.duration,
      });
    }
    return content;
  }, [
    currentFrame?.id,
    currentFrame?.videoUrl,
    currentFrame?.attachment?.data?.videoUrl,
    getVideoContent,
  ]);

  const videoId = videoContent?.videoUrl
    ? extractVideoId(videoContent.videoUrl)
    : null;
  const embedUrl =
    currentFrame && videoId && videoContent?.videoUrl
      ? `https://www.youtube.com/embed/${videoId}?start=${
          videoContent.startTime
        }&end=${
          videoContent.startTime + videoContent.duration
        }&autoplay=0&controls=1&modestbranding=1&rel=0`
      : null;

  // Get PDF content from attachment
  const getPDFContent = (frame: any) => {
    if (frame?.attachment?.type === "pdf") {
      return {
        pdfUrl: frame.attachment.data?.pdfUrl,
        pages: frame.attachment.data?.pages || "All pages",
        title: frame.attachment.data?.title || "PDF Document",
        notes: frame.attachment.data?.notes,
      };
    }
    return null;
  };

  // Get text content from attachment
  const getTextContent = (frame: any) => {
    if (frame?.attachment?.type === "text") {
      return {
        text: frame.attachment.data?.text,
        title: frame.attachment.data?.title || "Text Content",
        notes: frame.attachment.data?.notes,
      };
    }
    return null;
  };

  const pdfContent = getPDFContent(currentFrame);
  const textContent = getTextContent(currentFrame);

  const nextFrame = () => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex(currentFrameIndex + 1);
      // Mark user interaction for TTS
      if (!userHasInteracted) {
        setUserHasInteracted(true);
      }
      // Track frame navigation
      pageAnalytics.trackUserAction("frame_navigation", {
        direction: "next",
        from_frame: currentFrameIndex,
        to_frame: currentFrameIndex + 1,
        total_frames: frames.length,
      });
    }
  };

  const prevFrame = () => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(currentFrameIndex - 1);
      // Mark user interaction for TTS
      if (!userHasInteracted) {
        setUserHasInteracted(true);
      }
      // Track frame navigation
      pageAnalytics.trackUserAction("frame_navigation", {
        direction: "previous",
        from_frame: currentFrameIndex,
        to_frame: currentFrameIndex - 1,
        total_frames: frames.length,
      });
    }
  };

  const handleReplayNarration = async () => {
    if (!currentFrame || !isVoiceEnabled || !ttsReady) return;

    try {
      // Reset video to beginning without autoplay
      if (videoRef.current) {
        const resetUrl = `https://www.youtube.com/embed/${videoId}?start=${
          currentFrame.startTime
        }&end=${
          currentFrame.startTime + currentFrame.duration
        }&autoplay=0&controls=1&modestbranding=1&rel=0`;
        videoRef.current.src = resetUrl;
      }

      // Start narration (which will auto-play video when complete)
      await narrateFrame(currentFrame);
    } catch (error) {
      console.error("Failed to replay narration:", error);
    }
  };

  // Close TimeCapsule selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTimeCapsuleSelector &&
        !(event.target as Element)?.closest(".timecapsule-selector")
      ) {
        setShowTimeCapsuleSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTimeCapsuleSelector]);

  // Skip early return - always show main interface

  // ENHANCED: Monitor VectorStore availability and reload frames from KB when ready
  useEffect(() => {
    if (!vectorStore || !vectorStoreInitialized || !processingAvailable) {
      return;
    }

    // If frames were loaded from localStorage but VectorStore is now ready, reload from KB
    const reloadFromKBIfNeeded = async () => {
      try {
        console.log(
          "🔄 VectorStore is now ready, checking if frames need to be reloaded from KB..."
        );

        // Check if current frames have attachment data
        const hasAttachmentData = frames.some(
          (frame) => (frame as any).attachment
        );

        if (!hasAttachmentData && frames.length > 0) {
          console.log(
            "⚠️ Current frames lack attachment data, reloading from Knowledge Base..."
          );

          // Reload frames from Knowledge Base
          const kbFrames = await loadFramesFromKnowledgeBase();

          if (kbFrames.length > 0) {
            console.log("✅ Reloaded frames from KB with attachment data:", {
              frameCount: kbFrames.length,
              framesWithAttachments: kbFrames.filter(
                (f) => (f as any).attachment
              ).length,
            });

            // Update frame state with KB data
            setFrames(kbFrames);

            // Ensure current frame index is valid
            if (currentFrameIndex >= kbFrames.length) {
              setCurrentFrameIndex(0);
            }
          }
        }
      } catch (error) {
        console.error("❌ Failed to reload frames from KB:", error);
      }
    };

    // Small delay to ensure VectorStore is fully ready
    const reloadTimer = setTimeout(reloadFromKBIfNeeded, 1000);

    return () => clearTimeout(reloadTimer);
  }, [
    vectorStore,
    vectorStoreInitialized,
    processingAvailable,
    frames,
    currentFrameIndex,
  ]);

  return (
    <>
      {/* VectorStore Initialization Modal */}
      <VectorStoreInitModal
        isOpen={!vectorStoreInitialized}
        status={vectorStoreInitialized ? "ready" : "initializing"}
        message={
          vectorStoreInitialized
            ? "Knowledge Base is ready!"
            : "Preparing your secure local Knowledge Base..."
        }
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        {/* Top Navigation Header */}
        <div className="fixed left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src="/Media/TimeCapsule_04.png"
                  alt="AI Frames Logo"
                  width={32}
                  height={32}
                />
              </Link>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                AI-Frames Learning Platform
              </h2>
              <Badge variant="outline" className="text-xs">
                {frames.length === 0
                  ? "No Frames"
                  : `Frame ${currentFrameIndex + 1} of ${frames.length}`}
              </Badge>
            </div>

            {/* BubblSpace & TimeCapsule Management */}
            <div className="flex items-center gap-4">
              {/* Current BubblSpace Display */}
              <Link href="/deep-research" className="cursor-pointer">
                <Button variant="outline" size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  DeepResearch
                </Button>
              </Link>
              {currentBubblSpace && (
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      setEditingBubblSpace(currentBubblSpace);
                      setShowBubblSpaceDialog(true);
                    }}
                    title={`Current BubblSpace: ${currentBubblSpace.name}. Click to edit.`}
                  >
                    <div
                      className="w-3 h-3 rounded"
                      style={{
                        backgroundColor: currentBubblSpace.color || "#3B82F6",
                      }}
                    />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {currentBubblSpace.name}
                    </span>
                    {currentBubblSpace.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* BubblSpace Management - Disabled for regular users */}
              {/* Advanced users only: BubblSpace creation disabled */}

              <Separator orientation="vertical" className="h-6" />

              {/* Current TimeCapsule Display with Selector */}
              {allTimeCapsules.length > 0 && (
                <div className="flex items-center gap-2">
                  {/* TimeCapsule Dropdown Selector */}
                  <div className="relative timecapsule-selector">
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() =>
                        setShowTimeCapsuleSelector(!showTimeCapsuleSelector)
                      }
                      title="Select TimeCapsule"
                    >
                      <Package className="w-3 h-3" />
                      <span className="text-sm font-medium truncate max-w-[120px]">
                        {currentTimeCapsule?.name || "Select TimeCapsule"}
                      </span>
                      {currentTimeCapsule && (
                        <Badge variant="outline" className="text-xs">
                          {currentTimeCapsule.category}
                        </Badge>
                      )}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {/* TimeCapsule Dropdown */}
                    {showTimeCapsuleSelector && (
                      <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50 min-w-[280px]">
                        <div className="p-2 border-b">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Available TimeCapsules ({allTimeCapsules.length})
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {allTimeCapsules.map((timeCapsule) => (
                            <button
                              key={timeCapsule.id}
                              className={`w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 ${
                                currentTimeCapsule?.id === timeCapsule.id
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : ""
                              }`}
                              onClick={() => {
                                setCurrentTimeCapsule(timeCapsule);
                                setShowTimeCapsuleSelector(false);
                                // Update frames with new TimeCapsule ID
                                const updatedFrames = frames.map((frame) => ({
                                  ...frame,
                                  timeCapsuleId: timeCapsule.id,
                                  updatedAt: new Date().toISOString(),
                                }));
                                setFrames(updatedFrames);
                                console.log(
                                  `✅ Switched to TimeCapsule: ${timeCapsule.name}`
                                );
                              }}
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <Package className="w-3 h-3" />
                                <div>
                                  <div className="text-sm font-medium truncate">
                                    {timeCapsule.name}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {timeCapsule.description}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {timeCapsule.category}
                                </Badge>
                                {currentTimeCapsule?.id === timeCapsule.id && (
                                  <Badge variant="default" className="text-xs">
                                    Current
                                  </Badge>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="p-2 border-t">
                          <button
                            className="w-full text-left px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={() => {
                              setShowTimeCapsuleSelector(false);
                              setEditingTimeCapsule(null);
                              setShowTimeCapsuleDialog(true);
                            }}
                          >
                            + Create New TimeCapsule
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Edit Current TimeCapsule */}
                  {currentTimeCapsule && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingTimeCapsule(currentTimeCapsule);
                        setShowTimeCapsuleDialog(true);
                      }}
                      className="h-8 w-8 p-0"
                      title="Edit Current TimeCapsule"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {/* TimeCapsule Management */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingTimeCapsule(null);
                  setShowTimeCapsuleDialog(true);
                }}
                title="Create or manage TimeCapsules"
              >
                <Plus className="h-4 w-4 mr-2" />
                TimeCapsule
              </Button>

              <Separator orientation="vertical" className="h-6" />

              {/* Enhanced TimeCapsule Export/Import */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleImportTimeCapsule}
                title="Import Enhanced TimeCapsule with full metadata support"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleExportTimeCapsule}
                title="Export Enhanced TimeCapsule with BubblSpace and metadata"
                disabled={!currentTimeCapsule}
              >
                <Download className="h-4 w-4" />
              </Button>

              <Separator orientation="vertical" className="h-6" />

              {/* Refresh from Storage */}
              <Button
                variant="outline"
                size="icon"
                onClick={async () => {
                  try {
                    const loaded = await loadFramesFromStorage();
                    if (loaded) {
                      setChatMessages((prev) => [
                        ...prev,
                        {
                          role: "ai",
                          content: `🔄 Frames refreshed from storage! Linear and Graph views are now synchronized.`,
                        },
                      ]);
                    } else {
                      setChatMessages((prev) => [
                        ...prev,
                        {
                          role: "ai",
                          content: `ℹ️ No additional frame data found in storage. Views are already synchronized.`,
                        },
                      ]);
                    }
                  } catch (error) {
                    console.error(
                      "❌ Failed to refresh frames from storage:",
                      error
                    );
                    setChatMessages((prev) => [
                      ...prev,
                      {
                        role: "ai",
                        content: `❌ Failed to refresh frames from storage. Please try again.`,
                      },
                    ]);
                  }
                }}
                title="Refresh frames from storage to sync with Graph view changes"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
              >
                <RefreshCcw className="h-4 w-4 transform rotate-45" />
              </Button>

              {/* Clear All AI-Frames */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllFrames}
                title="Clear all AI frames and remove from Knowledge Base"
                disabled={!frames.length}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <SignInButton />
            </div>
          </div>
        </div>

        {/* Main Content below header */}
        <div className="pt-16">
          <div className="flex h-screen">
            {/* Left Sidebar */}
            <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
              <div className="p-4 space-y-6">
                {/* App Title */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                      AI-Frames
                    </h1>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Interactive AI learning
                    </p>
                  </div>
                </div>

                {/* Mode Controls */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Mode & View</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Mode Toggle */}
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="mode-toggle"
                        className="text-sm font-medium"
                      >
                        Mode
                      </Label>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="mode-toggle"
                          checked={isCreationMode}
                          onCheckedChange={(checked) => {
                            setIsCreationMode(checked);
                            pageAnalytics.trackFeatureUsage("mode_switch", {
                              mode: checked ? "creation" : "learning",
                              current_frame: currentFrameIndex,
                              total_frames: frames.length,
                            });
                          }}
                        />
                        <Badge
                          variant={isCreationMode ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {isCreationMode ? (
                            <Edit3 className="h-3 w-3 mr-1" />
                          ) : (
                            <Eye className="h-3 w-3 mr-1" />
                          )}
                          {isCreationMode ? "Create" : "Learn"}
                        </Badge>
                      </div>
                    </div>

                    {/* Graph View Toggle - Enhanced */}
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="graph-toggle"
                        className="text-sm font-medium"
                      >
                        View Mode
                      </Label>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="graph-toggle"
                          checked={showGraphView}
                          onCheckedChange={(checked) => {
                            setShowGraphView(checked);
                            pageAnalytics.trackFeatureUsage(
                              "graph_view_toggle",
                              {
                                enabled: checked,
                                mode: isCreationMode ? "creation" : "learning",
                                current_frame: currentFrameIndex,
                              }
                            );
                          }}
                        />
                        <Badge
                          variant={showGraphView ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {showGraphView ? (
                            <Network className="h-3 w-3 mr-1" />
                          ) : (
                            <Database className="h-3 w-3 mr-1" />
                          )}
                          {showGraphView ? "Dual-Pane" : "Linear Only"}
                        </Badge>
                      </div>
                    </div>

                    {/* Graph View Description */}
                    {showGraphView && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                        💡 Dual-pane mode: Graph view (left) + Linear view
                        (right) with full sync
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Chapter Management - Only in Creator Mode */}
                {isCreationMode && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Chapter Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Chapter Controls */}
                      <div className="flex gap-2">
                        <Button
                          onClick={openCreateChapterDialog}
                          size="sm"
                          className="flex-1"
                          disabled={getUnassignedFrames().length === 0}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create
                        </Button>
                        <Button
                          onClick={() =>
                            setShowChapterManagement(!showChapterManagement)
                          }
                          size="sm"
                          variant="outline"
                        >
                          <Layers className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>

                      {/* Chapter List */}
                      {chapters.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                            Chapters ({chapters.length})
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {chapters.map((chapter) => (
                              <div
                                key={chapter.id}
                                className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                              >
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: chapter.color }}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-medium truncate">
                                    {chapter.title}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {getChapterFrames(chapter.id).length} frames
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    onClick={() =>
                                      openEditChapterDialog(chapter)
                                    }
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleDeleteChapter(chapter.id)
                                    }
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Stats */}
                      <div className="text-xs text-slate-500 dark:text-slate-400 bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                        📊 {chapters.length} chapters •{" "}
                        {getUnassignedFrames().length} unassigned frames
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Knowledge Base Section */}
                <KnowledgeBaseSection
                  documentStatus={documentStatus}
                  onUploadDocuments={handleUploadDocuments}
                  onManageKnowledge={handleManageKnowledge}
                  onScrapeUrl={handleScrapeUrl}
                  onUploadRepository={handleUploadRepository}
                  isCompact={true}
                />

                {/* Voice Controls - Only in Learn Mode */}
                {!isCreationMode && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Voice Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="voice-toggle"
                          className="text-sm font-medium flex items-center gap-2"
                        >
                          {isVoiceEnabled ? (
                            <Volume2 className="h-4 w-4" />
                          ) : (
                            <VolumeX className="h-4 w-4" />
                          )}
                          Voice
                        </Label>
                        <div className="flex items-center gap-2">
                          <Switch
                            id="voice-toggle"
                            checked={isVoiceEnabled}
                            onCheckedChange={(checked) => {
                              setIsVoiceEnabled(checked);
                              if (!checked) {
                                stopSpeaking();
                              }
                              if (!userHasInteracted) {
                                setUserHasInteracted(true);
                              }
                              pageAnalytics.trackFeatureUsage("voice_toggle", {
                                enabled: checked,
                                tts_ready: ttsReady,
                                current_frame: currentFrameIndex,
                              });
                            }}
                          />
                          {isSpeaking && (
                            <Badge
                              variant="default"
                              className="bg-green-500 animate-pulse text-xs"
                            >
                              <Mic className="h-3 w-3 mr-1" />
                              Speaking
                            </Badge>
                          )}
                        </div>
                      </div>

                      {!userHasInteracted && isVoiceEnabled && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-yellow-50 dark:bg-yellow-900/20 w-full justify-center"
                        >
                          Click to enable
                        </Badge>
                      )}

                      {isVoiceEnabled && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setShowVoiceSettings(true);
                              if (!userHasInteracted) {
                                setUserHasInteracted(true);
                              }
                            }}
                            className="flex-1"
                          >
                            <Sliders className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                          {selectedVoice && (
                            <Badge variant="outline" className="text-xs">
                              {selectedVoice.name.split(" ")[0]}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Auto-advance toggle */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <Label
                          htmlFor="auto-advance"
                          className="text-sm font-medium"
                        >
                          Auto-advance
                        </Label>
                        <Switch
                          id="auto-advance"
                          checked={autoAdvanceEnabled}
                          onCheckedChange={setAutoAdvanceEnabled}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Frame Navigation */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center justify-between">
                      Frame Navigation
                      {isCreationMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCreationForm(true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {frames.map((frame, index) => (
                        <div
                          key={frame.id}
                          className={`relative transition-all duration-200 ${
                            dragOverIndex === index
                              ? "transform scale-105 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                              : ""
                          } ${draggedFrameId === frame.id ? "opacity-50" : ""}`}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragEnd={handleDragEnd}
                        >
                          <div
                            className={`flex items-center gap-2 ${
                              isCreationMode ? "cursor-move" : ""
                            }`}
                            draggable={isCreationMode}
                            onDragStart={(e) =>
                              handleDragStart(e, frame.id, index)
                            }
                          >
                            {isCreationMode && (
                              <div className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <GripVertical className="h-4 w-4" />
                              </div>
                            )}
                            <Button
                              variant={
                                index === currentFrameIndex
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => {
                                setCurrentFrameIndex(index);
                                // Emit event to sync with graph view
                                if (typeof window !== "undefined") {
                                  window.dispatchEvent(
                                    new CustomEvent(
                                      "frame-navigation-selected",
                                      {
                                        detail: {
                                          frameId: frame.id,
                                          frameIndex: index,
                                          frameTitle: frame.title,
                                        },
                                      }
                                    )
                                  );
                                }
                                console.log(
                                  "🔄 Frame Navigation → Graph sync:",
                                  {
                                    frameId: frame.id,
                                    frameIndex: index,
                                    frameTitle: frame.title,
                                  }
                                );
                              }}
                              className="flex-1 justify-start text-left h-auto p-3"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-xs">
                                    Frame {index + 1}
                                  </span>
                                  {frame.isGenerated && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      <Wand2 className="h-2 w-2 mr-1" />
                                      AI
                                    </Badge>
                                  )}
                                  {showGraphView &&
                                    index === currentFrameIndex && (
                                      <Badge
                                        variant="default"
                                        className="text-xs bg-purple-500"
                                      >
                                        <Network className="h-2 w-2 mr-1" />
                                        Synced
                                      </Badge>
                                    )}
                                </div>
                                <div className="text-xs opacity-75 truncate">
                                  {frame.title}
                                </div>
                              </div>
                            </Button>
                          </div>
                          {isCreationMode && (
                            <div className="absolute top-2 right-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditFrame(frame);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Assistant */}
                <Card className="flex-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      AI Assistant
                      {deepResearchApp && (
                        <Badge variant="outline" className="text-xs">
                          <Database className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-64">
                    {/* Current Narration Display */}
                    {isSpeaking && currentNarration && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Mic className="h-4 w-4 text-blue-600 animate-pulse" />
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Currently Speaking:
                          </span>
                        </div>
                        <p className="text-xs text-blue-700 dark:text-blue-300 line-clamp-3">
                          {currentNarration}
                        </p>
                      </div>
                    )}

                    {/* Auto-advance Countdown */}
                    {autoAdvanceCountdown > 0 && (
                      <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-600 animate-pulse" />
                            <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                              Auto-advancing in {autoAdvanceCountdown}{" "}
                              seconds...
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={cancelAutoAdvance}
                            className="text-orange-600 hover:text-orange-700 border-orange-300"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        {chatMessages.length === 0 ? (
                          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">
                              Ask questions about the content or click on AI
                              concepts to learn more
                            </p>
                            {timeCapsuleData && (
                              <p className="text-xs mt-2 text-blue-600 dark:text-blue-400">
                                Connected to your TimeCapsule knowledge
                              </p>
                            )}
                            {!isCreationMode &&
                              isVoiceEnabled &&
                              !userHasInteracted && (
                                <p className="text-xs mt-2 text-yellow-600 dark:text-yellow-400">
                                  🎙️ Click anywhere to enable voice narration
                                </p>
                              )}
                            {!isCreationMode &&
                              isVoiceEnabled &&
                              userHasInteracted && (
                                <p className="text-xs mt-2 text-green-600 dark:text-green-400">
                                  🎙️ Voice narration enabled - Navigate frames
                                  to hear explanations
                                </p>
                              )}
                          </div>
                        ) : (
                          chatMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${
                                message.role === "user"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.role === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                }`}
                              >
                                <div className="text-sm whitespace-pre-wrap">
                                  {message.content}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleChatSubmit()
                        }
                        placeholder="Ask about the content..."
                        className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"
                      />
                      <Button size="sm" onClick={handleChatSubmit}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto h-screen">
              <div className="p-6">
                {/* Conditional rendering based on graph view */}
                {showGraphView ? (
                  /* Graph View */
                  <FrameGraphIntegration
                    frames={frames as any} // FIXED: Type cast to resolve attachment interface mismatch
                    onFramesChange={setFrames as any} // TODO: Fix type compatibility after updating FrameGraphIntegration
                    isCreationMode={isCreationMode}
                    currentFrameIndex={currentFrameIndex}
                    onFrameIndexChange={setCurrentFrameIndex}
                    onCreateFrame={() => setShowCreationForm(true)}
                    onTimeCapsuleUpdate={handleTimeCapsuleUpdate}
                    graphStorageManager={graphStorageManager}
                  />
                ) : (
                  /* Traditional Linear View */
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Enhanced Content Creation Panel */}
                    {isCreationMode && (
                      <Card className="border-2 border-dashed border-blue-300 dark:border-blue-600">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Wand2 className="h-5 w-5 text-blue-600" />
                            Content Creation Hub
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {showCreationForm ? (
                            <div className="max-w-4xl mx-auto">
                              <div className="flex items-center justify-between mb-6">
                                <div>
                                  <h2 className="text-2xl font-bold">
                                    Create New Learning Frame
                                  </h2>
                                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Choose your content type and build engaging
                                    learning experiences
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  onClick={() => setShowCreationForm(false)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>

                              {/* Content Type Selection */}
                              <div className="mb-8">
                                <Label className="text-base font-medium mb-4 block">
                                  Choose Content Type
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Video Content */}
                                  <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                      newFrameData.contentType === "video"
                                        ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:border-red-300"
                                    }`}
                                    onClick={() =>
                                      setNewFrameData((prev) => ({
                                        ...prev,
                                        contentType: "video",
                                      }))
                                    }
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 rounded bg-red-500 text-white">
                                        <Video className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <div className="font-medium">
                                          Video Content
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                          YouTube video segments
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-xs text-slate-500">
                                      Perfect for demonstrations, lectures, and
                                      visual learning
                                    </div>
                                  </div>

                                  {/* PDF Content */}
                                  <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                      newFrameData.contentType === "pdf"
                                        ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                    }`}
                                    onClick={() =>
                                      setNewFrameData((prev) => ({
                                        ...prev,
                                        contentType: "pdf",
                                      }))
                                    }
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 rounded bg-blue-500 text-white">
                                        <File className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <div className="font-medium">
                                          PDF Document
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                          PDF pages or documents
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-xs text-slate-500">
                                      Ideal for reading materials, research
                                      papers, and documentation
                                    </div>
                                  </div>

                                  {/* Text Content */}
                                  <div
                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                      newFrameData.contentType === "text"
                                        ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:border-green-300"
                                    }`}
                                    onClick={() =>
                                      setNewFrameData((prev) => ({
                                        ...prev,
                                        contentType: "text",
                                      }))
                                    }
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 rounded bg-green-500 text-white">
                                        <FileText className="h-5 w-5" />
                                      </div>
                                      <div>
                                        <div className="font-medium">
                                          Text Note
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                          Text content or notes
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-xs text-slate-500">
                                      Great for explanations, summaries, and
                                      written content
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Content Type Specific Forms */}
                              {newFrameData.contentType && (
                                <div className="space-y-6">
                                  {/* Common Fields */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <Label
                                        htmlFor="goal"
                                        className="text-base font-medium"
                                      >
                                        Learning Goal
                                      </Label>
                                      <Textarea
                                        id="goal"
                                        placeholder="What should learners understand after this frame?"
                                        value={newFrameData.goal}
                                        onChange={(e) =>
                                          setNewFrameData({
                                            ...newFrameData,
                                            goal: e.target.value,
                                          })
                                        }
                                        rows={3}
                                        className="mt-2"
                                      />
                                    </div>
                                    <div>
                                      <Label
                                        htmlFor="title"
                                        className="text-base font-medium"
                                      >
                                        Frame Title
                                      </Label>
                                      <Input
                                        id="title"
                                        placeholder="Enter a descriptive title..."
                                        value={newFrameData.title || ""}
                                        onChange={(e) =>
                                          setNewFrameData({
                                            ...newFrameData,
                                            title: e.target.value,
                                          })
                                        }
                                        className="mt-2"
                                      />
                                    </div>
                                  </div>

                                  {/* Video Content Form */}
                                  {newFrameData.contentType === "video" && (
                                    <div className="space-y-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                      <div className="flex items-center gap-2 mb-4">
                                        <Video className="h-5 w-5 text-red-600" />
                                        <h3 className="font-medium">
                                          Video Configuration
                                        </h3>
                                      </div>

                                      <div>
                                        <Label
                                          htmlFor="videoUrl"
                                          className="text-sm font-medium"
                                        >
                                          YouTube Video URL
                                        </Label>
                                        <Input
                                          id="videoUrl"
                                          placeholder="https://youtube.com/watch?v=..."
                                          value={newFrameData.videoUrl}
                                          onChange={(e) =>
                                            setNewFrameData({
                                              ...newFrameData,
                                              videoUrl: e.target.value,
                                            })
                                          }
                                          className="mt-2"
                                        />
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label
                                            htmlFor="startTime"
                                            className="text-sm font-medium"
                                          >
                                            Start Time (seconds)
                                          </Label>
                                          <Input
                                            id="startTime"
                                            type="number"
                                            placeholder="0"
                                            value={newFrameData.startTime || ""}
                                            onChange={(e) =>
                                              setNewFrameData({
                                                ...newFrameData,
                                                startTime:
                                                  parseInt(e.target.value) || 0,
                                              })
                                            }
                                            className="mt-2"
                                          />
                                        </div>
                                        <div>
                                          <Label
                                            htmlFor="duration"
                                            className="text-sm font-medium"
                                          >
                                            Duration (seconds)
                                          </Label>
                                          <Input
                                            id="duration"
                                            type="number"
                                            placeholder="300"
                                            value={newFrameData.duration || ""}
                                            onChange={(e) =>
                                              setNewFrameData({
                                                ...newFrameData,
                                                duration:
                                                  parseInt(e.target.value) ||
                                                  300,
                                              })
                                            }
                                            className="mt-2"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* PDF Content Form */}
                                  {newFrameData.contentType === "pdf" && (
                                    <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                      <div className="flex items-center gap-2 mb-4">
                                        <File className="h-5 w-5 text-blue-600" />
                                        <h3 className="font-medium">
                                          PDF Configuration
                                        </h3>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <Label
                                            htmlFor="pdfUrl"
                                            className="text-sm font-medium"
                                          >
                                            PDF URL or Upload
                                          </Label>
                                          <Input
                                            id="pdfUrl"
                                            placeholder="https://example.com/document.pdf"
                                            value={newFrameData.pdfUrl || ""}
                                            onChange={(e) =>
                                              setNewFrameData({
                                                ...newFrameData,
                                                pdfUrl: e.target.value,
                                              })
                                            }
                                            className="mt-2"
                                          />
                                        </div>
                                        <div>
                                          <Label
                                            htmlFor="pdfPages"
                                            className="text-sm font-medium"
                                          >
                                            Pages (optional)
                                          </Label>
                                          <Input
                                            id="pdfPages"
                                            placeholder="1-5, 10, 15-20"
                                            value={newFrameData.pdfPages || ""}
                                            onChange={(e) =>
                                              setNewFrameData({
                                                ...newFrameData,
                                                pdfPages: e.target.value,
                                              })
                                            }
                                            className="mt-2"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <Label
                                          htmlFor="pdfNotes"
                                          className="text-sm font-medium"
                                        >
                                          PDF Notes
                                        </Label>
                                        <Textarea
                                          id="pdfNotes"
                                          placeholder="Add notes about this PDF content..."
                                          value={newFrameData.pdfNotes || ""}
                                          onChange={(e) =>
                                            setNewFrameData({
                                              ...newFrameData,
                                              pdfNotes: e.target.value,
                                            })
                                          }
                                          rows={3}
                                          className="mt-2"
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* Text Content Form */}
                                  {newFrameData.contentType === "text" && (
                                    <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                      <div className="flex items-center gap-2 mb-4">
                                        <FileText className="h-5 w-5 text-green-600" />
                                        <h3 className="font-medium">
                                          Text Content
                                        </h3>
                                      </div>

                                      <div>
                                        <Label
                                          htmlFor="textContent"
                                          className="text-sm font-medium"
                                        >
                                          Content Text
                                        </Label>
                                        <Textarea
                                          id="textContent"
                                          placeholder="Enter your text content here..."
                                          value={newFrameData.textContent || ""}
                                          onChange={(e) =>
                                            setNewFrameData({
                                              ...newFrameData,
                                              textContent: e.target.value,
                                            })
                                          }
                                          rows={6}
                                          className="mt-2"
                                        />
                                      </div>

                                      <div>
                                        <Label
                                          htmlFor="textNotes"
                                          className="text-sm font-medium"
                                        >
                                          Additional Notes
                                        </Label>
                                        <Textarea
                                          id="textNotes"
                                          placeholder="Add any additional notes or context..."
                                          value={newFrameData.textNotes || ""}
                                          onChange={(e) =>
                                            setNewFrameData({
                                              ...newFrameData,
                                              textNotes: e.target.value,
                                            })
                                          }
                                          rows={3}
                                          className="mt-2"
                                        />
                                      </div>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex justify-end gap-3 pt-6 border-t">
                                    <Button
                                      variant="outline"
                                      onClick={() => setShowCreationForm(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleCreateFrame();
                                        setShowCreationForm(false);
                                      }}
                                      disabled={
                                        isGeneratingFrame ||
                                        !newFrameData.contentType
                                      }
                                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                    >
                                      {isGeneratingFrame ? (
                                        <>
                                          <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                                          Creating...
                                        </>
                                      ) : (
                                        <>
                                          <Plus className="h-4 w-4 mr-2" />
                                          Create Frame
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">
                                  Create Your Learning Content
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                  Choose from multiple content types to build
                                  engaging learning experiences
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded bg-red-500 text-white">
                                      <Video className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">Video</span>
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    YouTube segments for visual learning
                                  </p>
                                </div>

                                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded bg-blue-500 text-white">
                                      <File className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">PDF</span>
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    Documents and reading materials
                                  </p>
                                </div>

                                <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded bg-green-500 text-white">
                                      <FileText className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium">Text</span>
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    Written content and notes
                                  </p>
                                </div>
                              </div>

                              <Button
                                onClick={() => setShowCreationForm(true)}
                                size="lg"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              >
                                <Plus className="h-5 w-5 mr-2" />
                                Start Creating
                              </Button>
                            </div>
                          )}

                          {timeCapsuleData && (
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Database className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">
                                  Connected to TimeCapsule
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">
                                {timeCapsuleData.research?.topics?.length || 0}{" "}
                                research topics •
                                {vectorStore
                                  ? " Knowledge base connected"
                                  : " No knowledge base"}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Frame Content - Only show if frames exist */}
                    {frames.length > 0 && currentFrame && (
                      <>
                        {/* Frame Header */}
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge variant="secondary">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatTime(currentFrame.duration)}
                                </Badge>
                                {currentFrame.isGenerated && (
                                  <Badge
                                    variant="default"
                                    className="bg-purple-500"
                                  >
                                    <Wand2 className="h-3 w-3 mr-1" />
                                    AI Generated
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {isCreationMode && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleEditFrame(currentFrame)
                                      }
                                    >
                                      <Edit3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteFrame(currentFrame.id)
                                      }
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={prevFrame}
                                  disabled={currentFrameIndex === 0}
                                >
                                  <SkipBack className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={nextFrame}
                                  disabled={
                                    currentFrameIndex === frames.length - 1
                                  }
                                >
                                  <SkipForward className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <CardTitle className="text-2xl">
                              {currentFrame.title}
                            </CardTitle>
                          </CardHeader>
                        </Card>

                        {/* Goal Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-600" />
                              Learning Goal
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                              {currentFrame.goal}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Information Text */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-green-600" />
                              Context & Background
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                              {currentFrame.informationText
                                .split("\n")
                                .map((paragraph, index) => (
                                  <p
                                    key={index}
                                    className="mb-4 leading-relaxed"
                                  >
                                    {paragraph.trim()}
                                  </p>
                                ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Video Section */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Video className="h-5 w-5 text-purple-600" />
                              Video Content
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                              {embedUrl ? (
                                <iframe
                                  ref={videoRef}
                                  src={embedUrl}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
                                  <div className="text-center">
                                    <Video className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                      No video available
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {videoContent ? (
                                  <>
                                    Playing from{" "}
                                    {formatTime(videoContent.startTime)} for{" "}
                                    {formatTime(videoContent.duration)}
                                  </>
                                ) : (
                                  "No video content available"
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {!isCreationMode && isVoiceEnabled && (
                                  <>
                                    {isSpeaking ? (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={stopSpeaking}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <Pause className="h-4 w-4 mr-2" />
                                        Stop Voice
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleReplayNarration}
                                        disabled={!ttsReady}
                                      >
                                        <Volume2 className="h-4 w-4 mr-2" />
                                        Replay Narration
                                      </Button>
                                    )}
                                  </>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setShowAIConcepts(!showAIConcepts)
                                  }
                                >
                                  <Brain className="h-4 w-4 mr-2" />
                                  AI Concepts
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* PDF Content Section */}
                        {pdfContent && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <File className="h-5 w-5 text-blue-600" />
                                PDF Document
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <File className="h-8 w-8 text-blue-600" />
                                    <div>
                                      <p className="font-medium text-blue-900 dark:text-blue-100">
                                        {pdfContent.title}
                                      </p>
                                      <p className="text-sm text-blue-600 dark:text-blue-300">
                                        Pages: {pdfContent.pages}
                                      </p>
                                    </div>
                                  </div>
                                  {pdfContent.pdfUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        window.open(pdfContent.pdfUrl, "_blank")
                                      }
                                    >
                                      <LinkIcon className="h-4 w-4 mr-2" />
                                      Open PDF
                                    </Button>
                                  )}
                                </div>
                                {pdfContent.notes && (
                                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                      <strong>Notes:</strong> {pdfContent.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Text Content Section */}
                        {textContent && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                Text Content
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                  <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                                    {textContent.title}
                                  </h3>
                                  <div className="prose prose-sm max-w-none text-green-800 dark:text-green-200">
                                    {textContent.text
                                      .split("\n")
                                      .map(
                                        (paragraph: string, index: number) => (
                                          <p key={index} className="mb-2">
                                            {paragraph}
                                          </p>
                                        )
                                      )}
                                  </div>
                                </div>
                                {textContent.notes && (
                                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                      <strong>Notes:</strong>{" "}
                                      {textContent.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* AI Concepts (triggered by video pause or user action) */}
                        {showAIConcepts && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-yellow-600" />
                                Related Concepts
                                {timeCapsuleData && (
                                  <Badge variant="outline" className="ml-2">
                                    <Database className="h-3 w-3 mr-1" />
                                    KB Connected
                                  </Badge>
                                )}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {currentFrame.aiConcepts.map(
                                  (concept, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleConceptClick(concept)
                                      }
                                      className="h-auto p-3 text-left justify-start"
                                    >
                                      <Brain className="h-4 w-4 mr-2 flex-shrink-0" />
                                      <span className="text-sm">{concept}</span>
                                    </Button>
                                  )
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* After Video Text */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <ArrowRight className="h-5 w-5 text-indigo-600" />
                              Key Takeaways
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                              {currentFrame.afterVideoText
                                .split("\n")
                                .map((paragraph, index) => (
                                  <p
                                    key={index}
                                    className="mb-4 leading-relaxed"
                                  >
                                    {paragraph.trim()}
                                  </p>
                                ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dialogs */}
        {/* BubblSpace Dialog */}
        <BubblSpaceDialog
          isOpen={showBubblSpaceDialog}
          onClose={() => {
            setShowBubblSpaceDialog(false);
            setEditingBubblSpace(null);
          }}
          bubblSpace={editingBubblSpace}
          onSave={
            editingBubblSpace ? handleEditBubblSpace : handleCreateBubblSpace
          }
          onDelete={handleDeleteBubblSpace}
          existingBubblSpaces={allBubblSpaces}
        />

        {/* TimeCapsule Dialog */}
        <TimeCapsuleDialog
          isOpen={showTimeCapsuleDialog}
          onClose={() => {
            setShowTimeCapsuleDialog(false);
            setEditingTimeCapsule(null);
          }}
          timeCapsule={editingTimeCapsule}
          onSave={
            editingTimeCapsule ? handleEditTimeCapsule : handleCreateTimeCapsule
          }
          onDelete={handleDeleteTimeCapsule}
          bubblSpaces={allBubblSpaces}
          defaultBubblSpaceId={currentBubblSpace?.id}
        />

        {/* Safe Import Dialog */}
        <SafeImportDialog
          isOpen={showSafeImportDialog}
          onClose={() => setShowSafeImportDialog(false)}
          onImport={handleEnhancedImport}
          timeCapsuleData={importTimeCapsuleData}
          existingData={{
            bubblSpaces: allBubblSpaces,
            timeCapsules: allTimeCapsules,
            hasResearchData: true,
            hasAIFramesData: frames.length > 0,
            hasVectorStoreData: true,
          }}
        />

        {/* Chapter Dialog */}
        <ChapterDialog
          open={showChapterDialog}
          onOpenChange={setShowChapterDialog}
          editingChapter={editingChapter}
          chapterFormData={chapterFormData}
          setChapterFormData={setChapterFormData}
          selectedFrameIds={selectedFrameIds}
          frames={frames}
          onFrameSelection={handleFrameSelection}
          onSelectAll={handleSelectAllFrames}
          onDeselectAll={handleDeselectAllFrames}
          onCreateChapter={handleCreateChapter}
          onEditChapter={handleEditChapter}
        />

        {/* Document Manager Modal */}
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
                    Organized view of your documents by category. Search and
                    manage your knowledge base content.
                  </DialogDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (vectorStore && vectorStoreInitialized) {
                      try {
                        console.log(
                          "🔄 Manual refresh of Knowledge Base documents..."
                        );
                        const stats = await vectorStore.getStats();
                        const documents = await vectorStore.getAllDocuments();
                        const totalSize = documents.reduce(
                          (sum, doc) => sum + (doc.metadata?.filesize || 0),
                          0
                        );

                        setDocumentStatus({
                          count: stats.documentCount,
                          totalSize: totalSize,
                          vectorCount: stats.vectorCount,
                        });

                        setDocuments(documents);
                        console.log(
                          "✅ Knowledge Base documents manually refreshed"
                        );
                      } catch (error) {
                        console.error(
                          "Failed to manually refresh documents:",
                          error
                        );
                      }
                    }
                  }}
                  title="Refresh document list"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
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
                  <TabsTrigger
                    value="system"
                    className="flex items-center gap-2"
                  >
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
                            // Clear semantic search results when input is cleared
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
                            : `Your uploaded files, scraped content, and personal documents.`}
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-y-auto">
                        {showSemanticResults ? (
                          // Show semantic search results with chunks and similarity scores
                          getFilteredDocumentsByCategory("user").length > 0 ? (
                            <div className="space-y-3">
                              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-medium text-blue-800 dark:text-blue-200">
                                    🔍 Semantic Search Results for "
                                    {currentSemanticQuery}"
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {
                                        getFilteredDocumentsByCategory("user")
                                          .length
                                      }{" "}
                                      chunks found
                                    </Badge>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={clearKnowledgeBaseSearch}
                                      className="h-6 w-6 p-0"
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              {getFilteredDocumentsByCategory("user").map(
                                (searchResult, index) => (
                                  <Card
                                    key={`${searchResult.document.id}-${searchResult.chunk.id}-${index}`}
                                    className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-l-green-500"
                                  >
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            variant="default"
                                            className="text-xs bg-green-600"
                                          >
                                            {(
                                              searchResult.similarity * 100
                                            ).toFixed(1)}
                                            % match
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            📄 User Document
                                          </Badge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              handleViewChunk(
                                                searchResult,
                                                searchResult.document
                                              )
                                            }
                                            title="View full chunk"
                                          >
                                            <Eye className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              handlePreviewDocument(
                                                searchResult.document.id
                                              )
                                            }
                                            title="View full document"
                                          >
                                            <FileText className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                                          {searchResult.document.title}
                                        </h4>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                          Type:{" "}
                                          {
                                            searchResult.document.metadata
                                              .filetype
                                          }{" "}
                                          • Size:{" "}
                                          {formatFileSize(
                                            searchResult.document.metadata
                                              .filesize
                                          )}{" "}
                                          • Source:{" "}
                                          {searchResult.document.metadata
                                            .source === "firecrawl"
                                            ? "Scraped"
                                            : "Upload"}
                                        </div>
                                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-4">
                                            {searchResult.chunk?.content ||
                                              "No content preview available"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                )
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>
                                No user documents found matching "
                                {currentSemanticQuery}"
                              </p>
                              <p className="text-sm">
                                Try adjusting your search terms or similarity
                                threshold.
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={clearKnowledgeBaseSearch}
                                className="mt-3"
                              >
                                Clear Search
                              </Button>
                            </div>
                          )
                        ) : // Show regular document list
                        getFilteredDocumentsByCategory("user").length > 0 ? (
                          <div className="space-y-2">
                            {getFilteredDocumentsByCategory("user").map(
                              (doc) => (
                                <Card
                                  key={doc.id}
                                  className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium truncate">
                                          {doc.title}
                                        </h4>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {doc.metadata.source === "firecrawl"
                                            ? "🔍 Scraped"
                                            : "📄 Upload"}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                        <span>
                                          Size:{" "}
                                          {formatFileSize(
                                            doc.metadata?.filesize || 0
                                          )}
                                        </span>
                                        <span>
                                          Type:{" "}
                                          {doc.metadata?.filetype || "unknown"}
                                        </span>
                                        <span>
                                          Added:{" "}
                                          {new Date(
                                            doc.metadata?.uploadedAt ||
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
                                          handlePreviewDocument(doc.id)
                                        }
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          // AI-Frames download implementation
                                          const blob = new Blob([doc.content], {
                                            type: "text/plain",
                                          });
                                          const url = URL.createObjectURL(blob);
                                          const a = document.createElement("a");
                                          a.href = url;
                                          a.download = `${doc.title}.txt`;
                                          a.click();
                                          URL.revokeObjectURL(url);
                                        }}
                                      >
                                        <Download className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                          if (vectorStore) {
                                            await vectorStore.deleteDocument(
                                              doc.id
                                            );
                                            // Refresh document list
                                            try {
                                              const updatedDocuments =
                                                await vectorStore.getAllDocuments();
                                              setDocuments(updatedDocuments);
                                              const stats =
                                                await vectorStore.getStats();
                                              const totalSize =
                                                updatedDocuments.reduce(
                                                  (sum, doc) =>
                                                    sum +
                                                    (doc.metadata?.filesize ||
                                                      0),
                                                  0
                                                );
                                              setDocumentStatus({
                                                count: stats.documentCount,
                                                totalSize: totalSize,
                                                vectorCount: stats.vectorCount,
                                              });
                                            } catch (error) {
                                              console.error(
                                                "Failed to refresh documents:",
                                                error
                                              );
                                            }
                                          }
                                        }}
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
                        {/* Similar structure for AI Frames tab content */}
                        {getFilteredDocumentsByCategory("aiFrames").length >
                        0 ? (
                          <div className="space-y-2">
                            {getFilteredDocumentsByCategory("aiFrames").map(
                              (doc) => (
                                <Card
                                  key={doc.id}
                                  className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium truncate">
                                          {doc.title}
                                        </h4>
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
                                            doc.metadata?.filesize || 0
                                          )}
                                        </span>
                                        <span>
                                          Added:{" "}
                                          {new Date(
                                            doc.metadata?.uploadedAt ||
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
                                          handlePreviewDocument(doc.id)
                                        }
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const blob = new Blob([doc.content], {
                                            type: "text/plain",
                                          });
                                          const url = URL.createObjectURL(blob);
                                          const a = document.createElement("a");
                                          a.href = url;
                                          a.download = `${doc.title}.txt`;
                                          a.click();
                                          URL.revokeObjectURL(url);
                                        }}
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
                              AI frames will appear here when synced to the
                              Knowledge Base.
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
                          System & Metadata (
                          {getDocumentCategoryCounts().system})
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          TimeCapsules, exports, and system-generated content.
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-y-auto">
                        {/* Similar structure for System tab content */}
                        {getFilteredDocumentsByCategory("system").length > 0 ? (
                          <div className="space-y-2">
                            {getFilteredDocumentsByCategory("system").map(
                              (doc) => (
                                <Card
                                  key={doc.id}
                                  className="p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium truncate">
                                          {doc.title}
                                        </h4>
                                        <Badge
                                          variant="outline"
                                          className="text-xs text-purple-600"
                                        >
                                          {doc.metadata?.source ===
                                          "timecapsule_export"
                                            ? "📦 Export"
                                            : doc.metadata?.isGenerated
                                              ? "🤖 Generated"
                                              : "⚙️ System"}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                        <span>
                                          Size:{" "}
                                          {formatFileSize(
                                            doc.metadata?.filesize || 0
                                          )}
                                        </span>
                                        <span>
                                          Added:{" "}
                                          {new Date(
                                            doc.metadata?.uploadedAt ||
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
                                          handlePreviewDocument(doc.id)
                                        }
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const blob = new Blob([doc.content], {
                                            type: "text/plain",
                                          });
                                          const url = URL.createObjectURL(blob);
                                          const a = document.createElement("a");
                                          a.href = url;
                                          a.download = `${doc.title}.txt`;
                                          a.click();
                                          URL.revokeObjectURL(url);
                                        }}
                                      >
                                        <Download className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                          if (vectorStore) {
                                            await vectorStore.deleteDocument(
                                              doc.id
                                            );
                                            // Refresh document list
                                            try {
                                              const updatedDocuments =
                                                await vectorStore.getAllDocuments();
                                              setDocuments(updatedDocuments);
                                              const stats =
                                                await vectorStore.getStats();
                                              const totalSize =
                                                updatedDocuments.reduce(
                                                  (sum, doc) =>
                                                    sum +
                                                    (doc.metadata?.filesize ||
                                                      0),
                                                  0
                                                );
                                              setDocumentStatus({
                                                count: stats.documentCount,
                                                totalSize: totalSize,
                                                vectorCount: stats.vectorCount,
                                              });
                                            } catch (error) {
                                              console.error(
                                                "Failed to refresh documents:",
                                                error
                                              );
                                            }
                                          }
                                        }}
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
                          Agent Logs ({getDocumentCategoryCounts().agentLogs})
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Multi-agent session logs and processing details.
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-y-auto">
                        {/* Similar structure for Agent Logs tab content */}
                        {getFilteredDocumentsByCategory("agentLogs").length >
                        0 ? (
                          <div className="space-y-2">
                            {getFilteredDocumentsByCategory("agentLogs").map(
                              (doc) => (
                                <Card
                                  key={doc.id}
                                  className="p-3 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium truncate">
                                          {doc.title}
                                        </h4>
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
                                            doc.metadata?.filesize || 0
                                          )}
                                        </span>
                                        <span>
                                          Added:{" "}
                                          {new Date(
                                            doc.metadata?.uploadedAt ||
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
                                          handlePreviewDocument(doc.id)
                                        }
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const blob = new Blob([doc.content], {
                                            type: "text/plain",
                                          });
                                          const url = URL.createObjectURL(blob);
                                          const a = document.createElement("a");
                                          a.href = url;
                                          a.download = `${doc.title}.txt`;
                                          a.click();
                                          URL.revokeObjectURL(url);
                                        }}
                                      >
                                        <Download className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                          if (vectorStore) {
                                            await vectorStore.deleteDocument(
                                              doc.id
                                            );
                                            // Refresh document list
                                            try {
                                              const updatedDocuments =
                                                await vectorStore.getAllDocuments();
                                              setDocuments(updatedDocuments);
                                              const stats =
                                                await vectorStore.getStats();
                                              const totalSize =
                                                updatedDocuments.reduce(
                                                  (sum, doc) =>
                                                    sum +
                                                    (doc.metadata?.filesize ||
                                                      0),
                                                  0
                                                );
                                              setDocumentStatus({
                                                count: stats.documentCount,
                                                totalSize: totalSize,
                                                vectorCount: stats.vectorCount,
                                              });
                                            } catch (error) {
                                              console.error(
                                                "Failed to refresh documents:",
                                                error
                                              );
                                            }
                                          }
                                        }}
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
                              multi-agent sessions.
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

        {/* Document Preview Modal */}
        {showDocumentPreview && previewDocument && (
          <Dialog
            open={showDocumentPreview}
            onOpenChange={(open) => {
              if (!open) closeDocumentPreview();
            }}
          >
            <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
              <DialogHeader className="flex-shrink-0 p-6 pb-4">
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  {previewDocument.title}
                </DialogTitle>
                <DialogDescription>
                  Document preview -{" "}
                  {formatFileSize(previewDocument.metadata?.filesize || 0)}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto px-6">
                <div className="whitespace-pre-wrap text-sm font-mono bg-slate-50 dark:bg-slate-800 p-4 rounded-lg leading-relaxed my-4">
                  {previewDocument.content}
                </div>
              </div>
              <div className="flex justify-end gap-2 p-6 pt-4 flex-shrink-0 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    const blob = new Blob([previewDocument.content], {
                      type: "text/plain",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${previewDocument.title}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={closeDocumentPreview}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Chunk View Modal */}
        {showChunkView && currentChunk && (
          <Dialog
            open={showChunkView}
            onOpenChange={(open) => {
              if (!open) closeChunkView();
            }}
          >
            <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
              <DialogHeader className="flex-shrink-0 p-6 pb-4">
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Document Chunk
                </DialogTitle>
                <DialogDescription>
                  From:{" "}
                  {currentChunk.document?.title ||
                    currentChunk.document?.name ||
                    "Unknown Document"}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto px-6">
                {/* Chunk metadata */}
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                  <div className="flex justify-between items-center">
                    <span>
                      <strong>Similarity Match:</strong>{" "}
                      {currentChunk.similarity
                        ? (currentChunk.similarity * 100).toFixed(1) + "%"
                        : "N/A"}
                    </span>
                    <span>
                      <strong>Content Length:</strong>{" "}
                      {currentChunk.content?.length || 0} characters
                    </span>
                  </div>
                </div>

                {/* Chunk content */}
                <div className="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-slate-800 p-4 rounded-lg leading-relaxed my-4">
                  {currentChunk.content || "No content available"}
                </div>
              </div>
              <div className="flex justify-end p-6 pt-4 flex-shrink-0 border-t">
                <Button variant="outline" onClick={closeChunkView}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Voice Settings Dialog */}
        <Dialog open={showVoiceSettings} onOpenChange={setShowVoiceSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Voice Settings</DialogTitle>
              <DialogDescription>
                Configure text-to-speech settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="voice-select">Voice</Label>
                <select
                  id="voice-select"
                  value={selectedVoice?.name || ""}
                  onChange={(e) => {
                    const voice = availableVoices?.find(
                      (v) => v.name === e.target.value
                    );
                    if (voice) {
                      setSelectedVoice(voice);
                      localStorage.setItem("selectedVoiceName", voice.name);
                    }
                  }}
                  className="w-full p-2 border rounded"
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="voice-rate">Speech Rate</Label>
                <input
                  id="voice-rate"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={voiceSettings.rate}
                  onChange={(e) =>
                    setVoiceSettings((prev) => ({
                      ...prev,
                      rate: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  {voiceSettings.rate.toFixed(1)}x
                </div>
              </div>
              <div>
                <Label htmlFor="voice-pitch">Pitch</Label>
                <input
                  id="voice-pitch"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={voiceSettings.pitch}
                  onChange={(e) =>
                    setVoiceSettings((prev) => ({
                      ...prev,
                      pitch: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  {voiceSettings.pitch.toFixed(1)}
                </div>
              </div>
              {selectedVoice && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-sm font-medium">Test Voice</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (selectedVoice) {
                        speakText(
                          `Hello! This is a test of the ${selectedVoice.name} voice at ${voiceSettings.rate}x speed and ${voiceSettings.pitch} pitch.`
                        );
                      }
                    }}
                    className="mt-2"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Test Voice
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Concept Detail Dialog */}
        <Dialog
          open={!!selectedConcept}
          onOpenChange={() => setSelectedConcept(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {selectedConcept || "Loading..."}
              </DialogTitle>
              <DialogDescription>
                AI-generated explanation and context
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {selectedConcept && conceptExplanations[selectedConcept] ? (
                  <div className="prose prose-sm dark:prose-invert">
                    {conceptExplanations[selectedConcept]
                      .split("\n")
                      .map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <Brain className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm text-gray-500">
                        Loading explanation...
                      </p>
                    </div>
                  </div>
                )}
                {timeCapsuleData && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      💡 This explanation uses knowledge from your TimeCapsule
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Delete Frame Confirmation Dialog */}
        <AlertDialog
          open={showDeleteConfirmation}
          onOpenChange={setShowDeleteConfirmation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Frame</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this frame? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDeleteFrame}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteFrame}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Clear All Frames Confirmation Dialog */}
        <AlertDialog
          open={showClearAllConfirmation}
          onOpenChange={setShowClearAllConfirmation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All AI Frames</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to clear all {frames.length} AI frames?
                This action cannot be undone.
                <br />
                <br />
                <strong>
                  This will also remove all AI-Frames from the Knowledge Base
                  and keep them cleared even after page reload.
                </strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelClearAllFrames}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmClearAllFrames}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear All Frames
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Frame Editor Dialog - MISSING COMPONENT IMPLEMENTATION */}
        {showFrameEditor && editingFrame && (
          <Dialog
            open={showFrameEditor}
            onOpenChange={(open) => {
              if (!open) {
                setShowFrameEditor(false);
                setEditingFrame(null);
              }
            }}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-blue-600" />
                  Edit AI Frame
                </DialogTitle>
                <DialogDescription>
                  Edit the content and settings for this AI frame. Changes will
                  be saved to all views and the Knowledge Base.
                </DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-1">
                <div className="space-y-6 py-4">
                  {/* Frame Title */}
                  <div className="space-y-2">
                    <Label htmlFor="frame-title">Frame Title</Label>
                    <Input
                      id="frame-title"
                      value={editingFrame.title}
                      onChange={(e) =>
                        setEditingFrame({
                          ...editingFrame,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter frame title..."
                    />
                  </div>

                  {/* Learning Goal */}
                  <div className="space-y-2">
                    <Label htmlFor="frame-goal">Learning Goal</Label>
                    <Textarea
                      id="frame-goal"
                      value={editingFrame.goal}
                      onChange={(e) =>
                        setEditingFrame({
                          ...editingFrame,
                          goal: e.target.value,
                        })
                      }
                      placeholder="Enter learning goal here..."
                      rows={3}
                    />
                  </div>

                  {/* Information Text */}
                  <div className="space-y-2">
                    <Label htmlFor="frame-info">Context & Background</Label>
                    <Textarea
                      id="frame-info"
                      value={editingFrame.informationText}
                      onChange={(e) =>
                        setEditingFrame({
                          ...editingFrame,
                          informationText: e.target.value,
                        })
                      }
                      placeholder="Provide background context and information..."
                      rows={6}
                    />
                  </div>

                  {/* After Video Text */}
                  <div className="space-y-2">
                    <Label htmlFor="frame-after">After Video Content</Label>
                    <Textarea
                      id="frame-after"
                      value={editingFrame.afterVideoText}
                      onChange={(e) =>
                        setEditingFrame({
                          ...editingFrame,
                          afterVideoText: e.target.value,
                        })
                      }
                      placeholder="Key takeaways and next steps..."
                      rows={4}
                    />
                  </div>

                  {/* Video Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frame-video-url">Video URL</Label>
                      <Input
                        id="frame-video-url"
                        value={editingFrame.videoUrl}
                        onChange={(e) =>
                          setEditingFrame({
                            ...editingFrame,
                            videoUrl: e.target.value,
                          })
                        }
                        placeholder="YouTube video URL..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frame-start-time">
                        Start Time (seconds)
                      </Label>
                      <Input
                        id="frame-start-time"
                        type="number"
                        value={editingFrame.startTime}
                        onChange={(e) =>
                          setEditingFrame({
                            ...editingFrame,
                            startTime: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frame-duration">Duration (seconds)</Label>
                      <Input
                        id="frame-duration"
                        type="number"
                        value={editingFrame.duration}
                        onChange={(e) =>
                          setEditingFrame({
                            ...editingFrame,
                            duration: parseInt(e.target.value) || 300,
                          })
                        }
                        placeholder="300"
                      />
                    </div>
                  </div>

                  {/* AI Concepts */}
                  <div className="space-y-2">
                    <Label htmlFor="frame-concepts">AI Concepts</Label>
                    <Input
                      id="frame-concepts"
                      value={editingFrame.aiConcepts.join(", ")}
                      onChange={(e) =>
                        setEditingFrame({
                          ...editingFrame,
                          aiConcepts: e.target.value
                            .split(",")
                            .map((c) => c.trim())
                            .filter((c) => c.length > 0),
                        })
                      }
                      placeholder="Enter concepts separated by commas..."
                    />
                    <div className="text-sm text-gray-500">
                      Separate multiple concepts with commas
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowFrameEditor(false);
                    setEditingFrame(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (!editingFrame) return;

                    try {
                      // Update frame in frames array
                      const updatedFrames = frames.map((frame) =>
                        frame.id === editingFrame.id
                          ? {
                              ...editingFrame,
                              updatedAt: new Date().toISOString(),
                            }
                          : frame
                      );

                      console.log("🔄 Frame save: Updating frames array", {
                        originalLength: frames.length,
                        updatedLength: updatedFrames.length,
                        editingFrameId: editingFrame.id,
                        editingFrameTitle: editingFrame.title,
                      });

                      setFrames(updatedFrames);

                      // Force re-render by triggering a state update
                      setCurrentFrameIndex((prev) => {
                        const newIndex = updatedFrames.findIndex(
                          (f) => f.id === editingFrame.id
                        );
                        return newIndex !== -1 ? newIndex : prev;
                      });

                      // Save to storage immediately
                      await saveFramesToStorage();

                      // Trigger immediate KB sync
                      if (
                        vectorStore &&
                        vectorStoreInitialized &&
                        processingAvailable
                      ) {
                        await syncGraphChangesToKB(updatedFrames);

                        // Dispatch immediate KB update event
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(
                            new CustomEvent("aiframes-kb-updated", {
                              detail: {
                                frameCount: updatedFrames.length,
                                syncType: "immediate",
                                source: "frame-edit",
                                timestamp: new Date().toISOString(),
                              },
                            })
                          );

                          // Force Knowledge Base refresh with specific frame info
                          window.dispatchEvent(
                            new CustomEvent("kb-force-refresh", {
                              detail: {
                                source: "frame-edit",
                                frameId: editingFrame.id,
                                frameTitle: editingFrame.title,
                                action: "update",
                                timestamp: new Date().toISOString(),
                              },
                            })
                          );

                          // Force Knowledge Base document list refresh
                          window.dispatchEvent(
                            new CustomEvent("kb-documents-changed", {
                              detail: {
                                source: "frame-edit",
                                changeType: "update",
                                documentId: `aiframe-${editingFrame.id}`,
                                timestamp: new Date().toISOString(),
                              },
                            })
                          );
                        }
                      }

                      // Trigger view synchronization
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("frame-edited", {
                            detail: {
                              frameId: editingFrame.id,
                              frame: {
                                ...editingFrame,
                                updatedAt: new Date().toISOString(),
                              },
                              timestamp: new Date().toISOString(),
                            },
                          })
                        );

                        // Force refresh frame navigation and linear view
                        window.dispatchEvent(
                          new CustomEvent("frames-updated", {
                            detail: {
                              frames: updatedFrames,
                              source: "frame-edit",
                              timestamp: new Date().toISOString(),
                            },
                          })
                        );
                      }

                      // Close dialog
                      setShowFrameEditor(false);
                      setEditingFrame(null);

                      // Show success message
                      setChatMessages((prev) => [
                        ...prev,
                        {
                          role: "ai",
                          content: `✅ Frame "${editingFrame.title}" saved successfully!\n\n🔄 All views updated automatically\n📊 Knowledge Base synced immediately\n\nYour changes are now visible in both Linear and Graph views.`,
                        },
                      ]);

                      console.log(
                        "✅ Frame edited and saved successfully:",
                        editingFrame.title
                      );
                    } catch (error) {
                      console.error("❌ Failed to save frame:", error);
                      setChatMessages((prev) => [
                        ...prev,
                        {
                          role: "ai",
                          content: `❌ Failed to save frame: ${error instanceof Error ? error.message : "Unknown error"}`,
                        },
                      ]);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Frame
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
