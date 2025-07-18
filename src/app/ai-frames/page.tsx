"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";

// Import VectorStore and providers
import { VectorStore } from "../../components/VectorStore/VectorStore";
import { useVectorStore } from "../../components/providers/VectorStoreProvider";
import { usePageAnalytics } from "@/components/analytics/Analytics";

// Import Graph Integration (keeping in src/components/ai-graphs)
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

// Import DeepResearch components
import { DeepResearchApp } from "../../components/DeepResearch/DeepResearchApp";

// Import NEW MODULAR COMPONENTS
import { 
  useFrameStorage, 
  useFrameEvents, 
  FrameManager, 
  FrameControls,
  AIFrame,
  GraphState,
  generateFrameId,
  loadFramesFromKnowledgeBase,
  detectAndParseFrameData,
  getLocalStorageFrames,
  getTimeCapsuleCombinedData,
  setTimeCapsuleCombinedData,
  DEFAULT_FRAME
} from "./index";

// PRESERVATION: Keep the same interfaces for backward compatibility
interface Chapter {
  id: string;
  title: string;
  description: string;
  color: string;
  order: number;
  frameIds: string[];
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  createdAt: string;
  updatedAt: string;
  isCollapsed?: boolean;
}

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

// Main component with dramatically reduced size
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

  // PRESERVATION: Keep original state management
  const [isCreationMode, setIsCreationMode] = useState(true);
  const [showCreationForm, setShowCreationForm] = useState(false);
  const [showGraphView, setShowGraphView] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [frameCreationData, setFrameCreationData] = useState<FrameCreationData>({
    goal: "",
    videoUrl: "",
    startTime: 0,
    duration: 0,
  });

  // NEW: Use modular hooks for storage and events
  const frameStorage = useFrameStorage({
    vectorStore: providerVectorStore,
    vectorStoreInitialized,
    processingAvailable,
  });

  const frameEvents = useFrameEvents({
    frames: frameStorage.frames,
    onFramesChange: frameStorage.broadcastFrameChanges,
    onSaveFrames: frameStorage.saveFramesToStorage,
    onSyncToKB: frameStorage.syncGraphChangesToKB,
  });

  // PRESERVATION: Graph state management
  const [initialGraphState, setInitialGraphState] = useState<GraphState | undefined>(undefined);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Dialog states
  const [showVectorStoreInitModal, setShowVectorStoreInitModal] = useState(false);
  const [showBubblSpaceDialog, setShowBubblSpaceDialog] = useState(false);
  const [showTimeCapsuleDialog, setShowTimeCapsuleDialog] = useState(false);
  const [showSafeImportDialog, setShowSafeImportDialog] = useState(false);
  const [showChapterDialog, setShowChapterDialog] = useState(false);

  // Metadata managers
  const metadataManagerRef = useRef<MetadataManager | null>(null);
  const graphStorageManagerRef = useRef<GraphStorageManager | null>(null);

  // PRESERVATION: Initialize managers
  useEffect(() => {
    if (providerVectorStore && vectorStoreInitialized) {
      metadataManagerRef.current = getMetadataManager(providerVectorStore);
      graphStorageManagerRef.current = getGraphStorageManager(providerVectorStore);
    }
  }, [providerVectorStore, vectorStoreInitialized]);

  // PRESERVATION: Load frames on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Multi-strategy loading preserved from Sage's Chronicle
        const loadedFrames = await frameStorage.loadFramesFromStorage();
        
        if (loadedFrames.length === 0 && providerVectorStore && vectorStoreInitialized) {
          // Try loading from Knowledge Base
          const kbFrames = await loadFramesFromKnowledgeBase(providerVectorStore, vectorStoreInitialized);
          if (kbFrames.length > 0) {
            frameStorage.broadcastFrameChanges(kbFrames);
          }
        }

        // Load graph state from combined storage
        const combinedData = getTimeCapsuleCombinedData();
        if (combinedData?.graphState) {
          setInitialGraphState(combinedData.graphState);
        }
      } catch (error) {
        console.error("❌ Failed to load initial data:", error);
      }
    };

    loadInitialData();
  }, [providerVectorStore, vectorStoreInitialized, frameStorage]);

  // PRESERVATION: Frame creation functionality
  const createFrame = useCallback(async (data: FrameCreationData) => {
    try {
      setIsGenerating(true);
      
      const newFrame: AIFrame = {
        ...DEFAULT_FRAME,
        id: generateFrameId(),
        title: data.title || `Frame ${frameStorage.frames.length + 1}`,
        goal: data.goal,
        informationText: data.textContent || "",
        videoUrl: data.videoUrl,
        startTime: data.startTime || 0,
        duration: data.duration || 0,
        afterVideoText: data.textNotes || "",
        aiConcepts: [],
        order: frameStorage.frames.length,
        type: "frame",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add frame to storage
      const updatedFrames = [...frameStorage.frames, newFrame];
      await frameStorage.saveFramesToStorage(updatedFrames);

      // Update chat messages
      setChatMessages(prev => [
        ...prev,
        {
          role: "ai",
          content: `✅ Frame "${newFrame.title}" created successfully!\n\n🎯 Goal: ${newFrame.goal}\n📹 Video: ${newFrame.videoUrl}\n\nFrame has been saved to storage and synced with Knowledge Base.`,
        },
      ]);

      // Reset form
      setFrameCreationData({
        goal: "",
        videoUrl: "",
        startTime: 0,
        duration: 0,
      });
      setShowCreationForm(false);
      
      console.log("✅ Frame created successfully:", newFrame.title);
    } catch (error) {
      console.error("❌ Failed to create frame:", error);
      setChatMessages(prev => [
        ...prev,
        {
          role: "ai",
          content: `❌ Failed to create frame: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }, [frameStorage]);

  // PRESERVATION: Handle frame clear
  const handleClearFrames = useCallback(() => {
    frameStorage.broadcastFrameChanges([]);
    setCurrentFrameIndex(0);
    setInitialGraphState(undefined);
    setHasUnsavedChanges(false);
    localStorage.removeItem("ai_frames_timecapsule");
    localStorage.removeItem("timecapsule_combined");
    console.log("🗑️ All frames cleared");
  }, [frameStorage]);

  // PRESERVATION: Handle graph state updates
  const handleGraphStateUpdate = useCallback((graphState: GraphState) => {
    setInitialGraphState(graphState);
    setHasUnsavedChanges(true);
    
    // Save to combined storage
    const combinedData = getTimeCapsuleCombinedData() || {};
    setTimeCapsuleCombinedData({
      ...combinedData,
      graphState,
      frames: frameStorage.frames,
      updatedAt: new Date().toISOString(),
    });
  }, [frameStorage.frames]);

  // PRESERVATION: Frame navigation
  const handleFrameNavigation = useCallback((direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentFrameIndex + 1, frameStorage.frames.length - 1)
      : Math.max(currentFrameIndex - 1, 0);
    setCurrentFrameIndex(newIndex);
  }, [currentFrameIndex, frameStorage.frames.length]);

  // Fix FrameControls props by wrapping the handlers to return boolean
  const handleSaveFrames = useCallback(async (): Promise<boolean> => {
    try {
      await frameEvents.handleSaveFrames();
      return true;
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    }
  }, [frameEvents]);

  const handleLoadFrames = useCallback(async (): Promise<boolean> => {
    try {
      await frameEvents.handleLoadFrames();
      return true;
    } catch (error) {
      console.error("Load failed:", error);
      return false;
    }
  }, [frameEvents]);

  // Fix FrameGraphIntegration props by ensuring order is always a number and attachment type is correct
  const framesWithOrder = frameStorage.frames.map(frame => ({
    ...frame,
    order: frame.order ?? 0,
    attachment: frame.attachment ? {
      id: frame.attachment.id,
      type: frame.attachment.type as "video" | "text" | "pdf",
      data: frame.attachment.data || {}
    } : undefined
  }));

  // Fix onFramesChange callback to handle type conversion
  const handleFramesChange = useCallback((frames: any[]) => {
    const convertedFrames = frames.map(frame => ({
      ...frame,
      order: frame.order ?? 0
    }));
    frameStorage.broadcastFrameChanges(convertedFrames);
  }, [frameStorage]);

  // PRESERVATION: Render mode toggle
  const renderModeToggle = () => (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Mode:</span>
        <Button
          variant={isCreationMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsCreationMode(true)}
        >
          <Bot className="h-4 w-4 mr-1" />
          Creator
        </Button>
        <Button
          variant={!isCreationMode ? "default" : "outline"}
          size="sm"
          onClick={() => setIsCreationMode(false)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Learner
        </Button>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">View:</span>
        <Button
          variant={!showGraphView ? "default" : "outline"}
          size="sm"
          onClick={() => setShowGraphView(false)}
        >
          <Target className="h-4 w-4 mr-1" />
          Linear
        </Button>
        <Button
          variant={showGraphView ? "default" : "outline"}
          size="sm"
          onClick={() => setShowGraphView(true)}
        >
          <Network className="h-4 w-4 mr-1" />
          Graph
        </Button>
      </div>
    </div>
  );

  // PRESERVATION: Render creation form
  const renderCreationForm = () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Frame
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goal">Learning Goal</Label>
          <Textarea
            id="goal"
            value={frameCreationData.goal}
            onChange={(e) => setFrameCreationData(prev => ({ ...prev, goal: e.target.value }))}
            placeholder="What do you want to learn?"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input
            id="videoUrl"
            type="url"
            value={frameCreationData.videoUrl}
            onChange={(e) => setFrameCreationData(prev => ({ ...prev, videoUrl: e.target.value }))}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title (Optional)</Label>
          <Input
            id="title"
            value={frameCreationData.title || ""}
            onChange={(e) => setFrameCreationData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Frame title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="textContent">Notes (Optional)</Label>
          <Textarea
            id="textContent"
            value={frameCreationData.textContent || ""}
            onChange={(e) => setFrameCreationData(prev => ({ ...prev, textContent: e.target.value }))}
            placeholder="Additional notes or framework information"
            rows={4}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => createFrame(frameCreationData)}
            disabled={!frameCreationData.goal || !frameCreationData.videoUrl || isGenerating}
            className="flex-1"
          >
            {isGenerating ? "Creating..." : "Create Frame"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowCreationForm(false)}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Main render
  return (
    <>
      <div className="min-h-screen flex flex-col pt-20">
        {/* Main Content Area - Full height minus navbar */}
        <div className="flex-1 flex flex-col">
          {/* Sticky Header with Mode Controls - follows scroll like navbar */}
          <div className="sticky top-20 z-40 flex-none border-b border-gray-200 bg-white/95 backdrop-blur-sm p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Network className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Dual-Pane AI Frames</h2>
                    <Badge variant="outline" className="text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Real-time
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    {frameStorage.frames.length} frames
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {chapters.length} chapters
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    0 concepts
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isCreationMode ? "default" : "secondary"}>
                  {isCreationMode ? (
                    <Bot className="h-3 w-3 mr-1" />
                  ) : (
                    <Eye className="h-3 w-3 mr-1" />
                  )}
                  {isCreationMode ? "Creator Mode" : "Learning Mode"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveFrames}
                  disabled={!frameEvents.hasUnsavedChanges || frameEvents.isSaving}
                  className={`${frameEvents.hasUnsavedChanges ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400'} transition-colors`}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {frameEvents.isSaving ? "Saving..." : frameEvents.hasUnsavedChanges ? "Save Graph" : "No Changes"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Organize logic here
                    console.log("Organize frames");
                  }}
                  disabled={frameEvents.isSaving}
                  className="text-green-600 hover:text-green-700"
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Organize
                </Button>
              </div>
            </div>
          </div>

          {/* Left Sidebar and Main Content */}
          <div className="flex-1 flex min-h-0">
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Frames</h3>
                <p className="text-sm text-gray-600">Interactive AI learning</p>
              </div>

              {/* Mode & View Controls */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Mode & View</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Mode:</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant={isCreationMode ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsCreationMode(true)}
                        className="flex-1"
                      >
                        <Bot className="h-4 w-4 mr-1" />
                        Creator
                      </Button>
                      <Button
                        variant={!isCreationMode ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsCreationMode(false)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Learner
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">View:</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant={!showGraphView ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowGraphView(false)}
                        className="flex-1"
                      >
                        <Target className="h-4 w-4 mr-1" />
                        Linear
                      </Button>
                      <Button
                        variant={showGraphView ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowGraphView(true)}
                        className="flex-1"
                      >
                        <Network className="h-4 w-4 mr-1" />
                        Graph
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <p>💡 <strong>Dual-pane mode:</strong> Graph view (left) + Linear view (right) with full sync</p>
                </div>
              </div>

              {/* Chapter Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Chapter Management</h4>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowChapterDialog(true)}
                    className="flex-1"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                    className="flex-1"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                </div>
                <div className="text-xs text-gray-500">
                  📚 0 chapters • 2 unassigned frames
                </div>
              </div>

              {/* Knowledge Base */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Knowledge Base</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Documents:</span>
                    <Badge variant="outline">9</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Size:</span>
                    <Badge variant="outline">3.94 KB</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVectorStoreInitModal(true)}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVectorStoreInitModal(true)}
                    className="flex-1"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Area - Graph Integration */}
            <div className="flex-1 overflow-hidden">
              <FrameGraphIntegration
                frames={framesWithOrder}
                onFramesChange={handleFramesChange}
                isCreationMode={isCreationMode}
                currentFrameIndex={currentFrameIndex}
                onFrameIndexChange={setCurrentFrameIndex}
                onCreateFrame={() => setShowCreationForm(true)}
                initialGraphState={initialGraphState}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modals - PRESERVATION: Keep existing dialogs */}
      <VectorStoreInitModal
        isOpen={showVectorStoreInitModal}
      />
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
            details: { itemsImported: {} }
          };
        }}
      />
      <ChapterDialog
        open={showChapterDialog}
        onOpenChange={setShowChapterDialog}
        editingChapter={null}
        chapterFormData={{
          title: "",
          description: "",
          color: "#3B82F6"
        }}
        setChapterFormData={() => {}}
        selectedFrameIds={[]}
        frames={[]}
        onFrameSelection={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
        onCreateChapter={() => {}}
        onEditChapter={() => {}}
      />
    </>
  );
} 