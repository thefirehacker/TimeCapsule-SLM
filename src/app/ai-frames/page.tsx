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
  FileText,
  Package,
  Search,
  Download,
  Trash2,
  X,
  Loader2,
  Zap,
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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

// Import DeepResearch components
import { DeepResearchApp } from "../../components/DeepResearch/DeepResearchApp";

// Import NEW MODULAR COMPONENTS
import { 
  useFrameStorage, 
  useFrameEvents, 
  AIFrame,
  GraphState,
  generateFrameId,
  loadFramesFromKnowledgeBase,
  getTimeCapsuleCombinedData,
  setTimeCapsuleCombinedData,
  DEFAULT_FRAME
} from "./index";

// UNIFIED: Replace old fragmented storage with unified system
import { useUnifiedStorage } from "./hooks/useUnifiedStorage";
import type { UnifiedAIFrame } from "./lib/unifiedStorage";

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

  // SIMPLIFIED: Keep only essential state for FrameGraphIntegration
  const [isCreationMode, setIsCreationMode] = useState(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // UNIFIED: Replace old fragmented storage with unified system
  const unifiedStorage = useUnifiedStorage({
    vectorStore: providerVectorStore,
    vectorStoreInitialized,
  });

  // PRESERVATION: Graph state management
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // FIXED: Add loading state to prevent multiple concurrent KB loading calls
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);

  // Dialog states
  const [showVectorStoreInitModal, setShowVectorStoreInitModal] = useState(false);
  const [showBubblSpaceDialog, setShowBubblSpaceDialog] = useState(false);
  const [showTimeCapsuleDialog, setShowTimeCapsuleDialog] = useState(false);
  const [showSafeImportDialog, setShowSafeImportDialog] = useState(false);
  const [showChapterDialog, setShowChapterDialog] = useState(false);
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [documentManagerTab, setDocumentManagerTab] = useState("user");
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");
  const [semanticSearchResults, setSemanticSearchResults] = useState<any[]>([]);
  const [currentSemanticQuery, setCurrentSemanticQuery] = useState("");
  const [showSemanticResults, setShowSemanticResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchThreshold, setSearchThreshold] = useState(0.1);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [currentChunk, setCurrentChunk] = useState<any>(null);
  const [showChunkView, setShowChunkView] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);


  // Metadata managers
  const metadataManagerRef = useRef<MetadataManager | null>(null);
  const graphStorageManagerRef = useRef<GraphStorageManager | null>(null);

  // PRESERVATION: Initialize managers
  useEffect(() => {
    const initializeManagers = async () => {
      if (providerVectorStore && vectorStoreInitialized) {
        try {
          metadataManagerRef.current = getMetadataManager(providerVectorStore);
          graphStorageManagerRef.current = await getGraphStorageManager(providerVectorStore);
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

  // FIXED: Enhanced VectorStore modal management for stability
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Show modal only during initial loading (not during re-initialization)
    if (!vectorStoreInitialized && vectorStoreInitializing && !showVectorStoreInitModal) {
      setShowVectorStoreInitModal(true);
    }
    
    // Hide modal when VectorStore is fully ready AND stable
    if (vectorStoreInitialized && !vectorStoreInitializing && providerVectorStore?.initialized !== false && showVectorStoreInitModal) {
      // Longer delay to ensure VectorStore is stable before hiding modal
      timeoutId = setTimeout(() => {
        setShowVectorStoreInitModal(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [vectorStoreInitialized, vectorStoreInitializing, providerVectorStore?.initialized, showVectorStoreInitModal]);

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

  // CRITICAL FIX: Removed retryVectorStoreLoad that was clearing frames after creation
  // 
  // ORIGINAL ISSUE:
  // 1. User creates frames → frameCount: 2 ✅
  // 2. VectorStore syncs frames → vectorStoreInitialized: true
  // 3. retryVectorStoreLoad triggers with stale unifiedStorage.frames.length === 0
  // 4. loadFramesFromKnowledgeBase called → finds no frames → clears frames to []
  // 5. frameCount: 0 ❌ → frames lost!
  //
  // SOLUTION: Unified storage already handles VectorStore initialization properly.
  // This retry logic was redundant and harmful.

  // REMOVED: Frame creation functionality (handled by FrameGraphIntegration)

  // PRESERVATION: Handle frame clear
  const handleClearFrames = useCallback(() => {
    unifiedStorage.clearAll();
    setCurrentFrameIndex(0);
    console.log("🗑️ All frames cleared");
  }, [unifiedStorage]);

  // PRESERVATION: Handle graph state updates
  const handleGraphStateUpdate = useCallback((graphState: GraphState) => {
    unifiedStorage.updateGraphState(graphState);
  }, [unifiedStorage]);

  // PRESERVATION: Frame navigation
  const handleFrameNavigation = useCallback((direction: 'next' | 'prev') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentFrameIndex + 1, unifiedStorage.frames.length - 1)
      : Math.max(currentFrameIndex - 1, 0);
    
    // CRITICAL LOG: Debug frame index changes
    console.log("🔍 Frame navigation debug:", {
      direction,
      currentIndex: currentFrameIndex,
      newIndex,
      frameCount: unifiedStorage.frames.length
    });
    
    setCurrentFrameIndex(newIndex);
  }, [currentFrameIndex, unifiedStorage.frames.length]);

  // Fix FrameControls props by wrapping the handlers to return boolean
  const handleSaveFrames = useCallback(async (): Promise<boolean> => {
    try {
      const success = await unifiedStorage.saveAll();
      return success;
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    }
  }, [unifiedStorage]);

  const handleLoadFrames = useCallback(async (): Promise<boolean> => {
    try {
      const success = await unifiedStorage.loadAll();
      return success;
    } catch (error) {
      console.error("Load failed:", error);
      return false;
    }
  }, [unifiedStorage]);

  // Fix FrameGraphIntegration props by ensuring order is always a number and attachment type is correct
  const framesWithOrder = unifiedStorage.frames.map(frame => ({
    ...frame,
    order: frame.order ?? 0,
  }));

  const handleFramesChange = useCallback((newFrames: any[]) => {
    // Convert the frames to ensure they have the correct type and order
    const convertedFrames = newFrames.map(frame => ({
      ...frame,
      order: frame.order ?? 0
    }));
    
    unifiedStorage.updateFrames(convertedFrames);
  }, [unifiedStorage]);

  // REMOVED: Unused renderModeToggle function after refactor

  // REMOVED: Unused renderCreationForm function after refactor

  // Load documents when VectorStore is ready
  useEffect(() => {
    const loadDocuments = async () => {
      // FIXED: Enhanced VectorStore readiness check to prevent "Vector Store not initialized" error
      if (vectorStoreInitialized && providerVectorStore && !vectorStoreInitializing) {
        try {
          // Additional safety check: verify VectorStore has initialized property
          if (providerVectorStore.initialized === false) {
            console.log("VectorStore not fully initialized yet, skipping document load");
            return;
          }
          
          const allDocuments = await providerVectorStore.getAllDocuments();
          setDocuments(allDocuments);
        } catch (error) {
          // FIXED: Handle "Vector Store not initialized" gracefully
          if (error instanceof Error && error.message.includes('Vector Store not initialized')) {
            console.log("VectorStore still initializing, will retry when ready");
          } else {
            console.error("Failed to load documents:", error);
          }
        }
      }
    };

    loadDocuments();
  }, [vectorStoreInitialized, vectorStoreInitializing, providerVectorStore]);

  // Document management functions - copied from Deep Research
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const categorizeDocuments = (docs: any[]) => {
    const categories = {
      user: [] as any[],
      aiFrames: [] as any[],
      system: [] as any[],
      agentLogs: [] as any[],
    };

    docs.forEach((doc) => {
      // Agent Logs
      if (
        doc.title.toLowerCase().includes("agent log") ||
        doc.metadata.source === "research_state"
      ) {
        categories.agentLogs.push(doc);
      }
      // AI Frames
      else if (
        doc.metadata.source === "ai-frames" ||
        doc.title.toLowerCase().includes("ai-frame")
      ) {
        categories.aiFrames.push(doc);
      }
      // System & Metadata (TimeCapsules, BubblSpace, etc.)
      else if (
        doc.metadata.source === "timecapsule_export" ||
        doc.metadata.source === "timecapsule_import" ||
        doc.metadata.source === "aiframes_import" ||
        doc.metadata.source === "aiframes_combined" ||
        doc.title.toLowerCase().includes("timecapsule") ||
        doc.metadata.isGenerated === true
      ) {
        categories.system.push(doc);
      }
      // User Documents (uploads, Firecrawl, etc.)
      else {
        categories.user.push(doc);
      }
    });

    return categories;
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
    const categoryDocs = categorized[category as keyof typeof categorized] || [];

    if (!documentSearchQuery.trim()) {
      return categoryDocs;
    }

    return categoryDocs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(documentSearchQuery.toLowerCase()) ||
        doc.metadata.description?.toLowerCase().includes(documentSearchQuery.toLowerCase())
    );
  };

  const handleKnowledgeBaseSearch = async () => {
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
  };

  const clearKnowledgeBaseSearch = () => {
    setDocumentSearchQuery("");
    setShowSemanticResults(false);
    setSemanticSearchResults([]);
    setCurrentSemanticQuery("");
  };

  const handlePreviewDocument = async (docId: string) => {
    try {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        setPreviewDocument(doc);
        setShowDocumentPreview(true);
      }
    } catch (error) {
      console.error("Failed to preview document:", error);
    }
  };

  const handleViewChunk = (searchResult: any, document: any) => {
    const chunkData = {
      content: searchResult?.chunk?.content || "No content available",
      similarity: searchResult?.similarity || 0,
      chunkIndex: searchResult?.chunk?.id || "unknown",
      documentId: searchResult?.document?.id || "unknown",
      document: searchResult?.document || document || { title: "Unknown Document" },
    };

    setCurrentChunk(chunkData);
    setShowChunkView(true);
  };

  const downloadDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      const blob = new Blob([doc.content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.title}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const deleteDocument = async (docId: string) => {
    if (providerVectorStore) {
      try {
        await providerVectorStore.deleteDocument(docId);
        setDocuments(prev => prev.filter(doc => doc.id !== docId));
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    }
  };

  // CRITICAL FIX: Expose sync methods for FrameGraphIntegration to use (reduced logging frequency)
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        // Legacy compatibility for existing code
        saveFramesToStorage: unifiedStorage.saveAll,
        syncFramesToVectorStore: unifiedStorage.saveAll,
        syncGraphChangesToKB: unifiedStorage.saveAll,
        loadFramesFromStorage: unifiedStorage.loadAll,
        broadcastFrameChanges: unifiedStorage.updateFrames
      };
      
      (window as any).aiFramesApp = aiFramesApp;
      
      // REDUCED SPAM: Only log when frame count changes or VectorStore state changes
      if ((window as any).lastLoggedFrameCount !== aiFramesApp.frames.length || 
          (window as any).lastLoggedVectorStoreState !== vectorStoreInitialized) {
        console.log("🔧 AI-Frames unified storage interface updated:", {
          hasVectorStore: !!aiFramesApp.vectorStore,
          vectorStoreInitialized: aiFramesApp.vectorStoreInitialized,
          frameCount: aiFramesApp.frames.length,
          hasUnifiedMethods: typeof aiFramesApp.saveAll === 'function'
        });
        (window as any).lastLoggedFrameCount = aiFramesApp.frames.length;
        (window as any).lastLoggedVectorStoreState = vectorStoreInitialized;
      }
    }
  }, [providerVectorStore, vectorStoreInitialized, unifiedStorage.frames.length]);

  // Main render - SIMPLIFIED: Only FrameGraphIntegration with built-in Save Graph functionality
  return (
    <>
      <div className="min-h-screen flex flex-col pt-20">
        {/* SIMPLIFIED: Direct FrameGraphIntegration - no duplicate save systems */}
        <div className="flex-1 overflow-hidden">
          {/* FIXED: Dual pane layout like Deep Research - sidebar + main content */}
          <div className="flex-1 flex min-h-0">
            {/* Left Sidebar - Knowledge Base Section like Deep Research */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 space-y-6 overflow-y-auto">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Frames</h3>
                <p className="text-sm text-gray-600">Interactive AI learning platform</p>
              </div>

              {/* Knowledge Base Section - EXACTLY like Deep Research */}
              <KnowledgeBaseSection
                documentStatus={{
                  count: documents.length,
                  totalSize: documents.reduce((sum, doc) => sum + (doc.metadata?.filesize || 0), 0),
                  vectorCount: 0
                }}
                onUploadDocuments={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) {
                      console.log("Upload documents:", files);
                      // Handle file upload here
                    }
                  };
                  input.click();
                }}
                onManageKnowledge={() => {
                  console.log("Manage KB button clicked - opening Knowledge Base Manager");
                  setShowDocumentManager(true);
                }}
                onScrapeUrl={() => {
                  console.log("Scrape URL functionality");
                }}
              />

              {/* Frame Stats */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Frame Statistics</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Frames:</span>
                    <Badge variant="outline">{unifiedStorage.frames.length}</Badge>
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
            </div>

            {/* Main Content Area - Graph Integration */}
            <div className="flex-1 overflow-hidden">
              {/* FIXED: Enhanced VectorStore readiness check for stability */}
              {vectorStoreInitialized && !vectorStoreInitializing && providerVectorStore?.initialized !== false ? (
                <FrameGraphIntegration
                  frames={framesWithOrder}
                  onFramesChange={handleFramesChange}
                  isCreationMode={isCreationMode}
                  currentFrameIndex={currentFrameIndex}
                  onFrameIndexChange={(newIndex) => {
                    console.log("🔍 CRITICAL: Frame index change called:", {
                      oldIndex: currentFrameIndex,
                      newIndex,
                      frameCount: unifiedStorage.frames.length,
                      stackTrace: new Error().stack?.split('\n')[1]
                    });
                    setCurrentFrameIndex(newIndex);
                  }}
                  onCreateFrame={() => console.log("Frame creation handled by FrameGraphIntegration")}
                  onGraphChange={handleGraphStateUpdate}
                  initialGraphState={unifiedStorage.graphState}
                  graphStorageManager={graphStorageManagerRef.current}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Initializing Knowledge Base...</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Status: {vectorStoreInitialized ? 'Initialized' : 'Initializing'} 
                      {vectorStoreInitializing && ' (Loading...)'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals - PRESERVATION: Keep existing dialogs */}
      <VectorStoreInitModal
        isOpen={showVectorStoreInitModal}
        progress={vectorStoreInitializing ? 50 : vectorStoreInitialized ? 100 : 0}
        status={
          vectorStoreError ? 'error' : 
          vectorStoreInitialized && !vectorStoreInitializing && providerVectorStore?.initialized !== false ? 'ready' : 
          'initializing'
        }
        message={
          vectorStoreError || 
          (vectorStoreInitialized && !vectorStoreInitializing ? 'Knowledge Base ready!' : 
           vectorStoreInitializing ? 'Initializing Knowledge Base...' : 
           'Preparing Knowledge Base...')
        }
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
      
      {/* Document Manager Modal - Complete Deep Research implementation */}
      <Dialog
        open={showDocumentManager}
        onOpenChange={(open) => {
          if (!open) setShowDocumentManager(false);
        }}
      >
        <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 p-6 pb-4">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Knowledge Base Manager
            </DialogTitle>
            <DialogDescription>
              Organized view of your documents by category. Search and manage
              your knowledge base content.
            </DialogDescription>
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
                <TabsTrigger value="aiFrames" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  AI Frames ({getDocumentCategoryCounts().aiFrames})
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  System ({getDocumentCategoryCounts().system})
                </TabsTrigger>
                <TabsTrigger value="agentLogs" className="flex items-center gap-2">
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
                          {getFilteredDocumentsByCategory("user").map((doc, index) => (
                            <Card
                              key={showSemanticResults ? `${doc.document?.id || doc.id}-${index}` : doc.id}
                              className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium truncate">
                                      {showSemanticResults ? (doc.document?.title || doc.title) : doc.title}
                                    </h4>
                                    {showSemanticResults && (
                                      <Badge variant="default" className="text-xs bg-green-600">
                                        {(doc.similarity * 100).toFixed(1)}% match
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                      {showSemanticResults ? "📄 User" : "📄 Upload"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                    <span>
                                      Size: {formatFileSize(showSemanticResults ? (doc.document?.metadata?.filesize || 0) : (doc.metadata?.filesize || 0))}
                                    </span>
                                    <span>
                                      Added: {new Date(showSemanticResults ? (doc.document?.metadata?.uploadedAt || Date.now()) : (doc.metadata?.uploadedAt || Date.now())).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePreviewDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No user documents found.</p>
                          <p className="text-sm">Upload files or scrape URLs to add content to your knowledge base.</p>
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
                          {getFilteredDocumentsByCategory("aiFrames").map((doc, index) => (
                            <Card
                              key={showSemanticResults ? `${doc.document?.id || doc.id}-${index}` : doc.id}
                              className="p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium truncate">
                                      {showSemanticResults ? (doc.document?.title || doc.title) : doc.title}
                                    </h4>
                                    {showSemanticResults && (
                                      <Badge variant="default" className="text-xs bg-blue-600">
                                        {(doc.similarity * 100).toFixed(1)}% match
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs text-blue-600">
                                      🎓 AI Frame
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                    <span>
                                      Size: {formatFileSize(showSemanticResults ? (doc.document?.metadata?.filesize || 0) : (doc.metadata?.filesize || 0))}
                                    </span>
                                    <span>
                                      Added: {new Date(showSemanticResults ? (doc.document?.metadata?.uploadedAt || Date.now()) : (doc.metadata?.uploadedAt || Date.now())).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePreviewDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No AI frames found.</p>
                          <p className="text-sm">AI frames will appear here when synced from the AI-Frames system.</p>
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
                          {getFilteredDocumentsByCategory("system").map((doc, index) => (
                            <Card
                              key={showSemanticResults ? `${doc.document?.id || doc.id}-${index}` : doc.id}
                              className="p-3 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium truncate">
                                      {showSemanticResults ? (doc.document?.title || doc.title) : doc.title}
                                    </h4>
                                    {showSemanticResults && (
                                      <Badge variant="default" className="text-xs bg-purple-600">
                                        {(doc.similarity * 100).toFixed(1)}% match
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs text-purple-600">
                                      {(showSemanticResults ? (doc.document?.metadata?.source || doc.metadata?.source) : doc.metadata?.source) === "timecapsule_export"
                                        ? "📦 Export"
                                        : (showSemanticResults ? (doc.document?.metadata?.isGenerated || doc.metadata?.isGenerated) : doc.metadata?.isGenerated)
                                          ? "🤖 Generated"
                                          : "⚙️ System"}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                    <span>
                                      Size: {formatFileSize(showSemanticResults ? (doc.document?.metadata?.filesize || 0) : (doc.metadata?.filesize || 0))}
                                    </span>
                                    <span>
                                      Added: {new Date(showSemanticResults ? (doc.document?.metadata?.uploadedAt || Date.now()) : (doc.metadata?.uploadedAt || Date.now())).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePreviewDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No system documents found.</p>
                          <p className="text-sm">TimeCapsule exports and system content will appear here.</p>
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
                      {getFilteredDocumentsByCategory("agentLogs").length > 0 ? (
                        <div className="space-y-2">
                          {getFilteredDocumentsByCategory("agentLogs").map((doc, index) => (
                            <Card
                              key={showSemanticResults ? `${doc.document?.id || doc.id}-${index}` : doc.id}
                              className="p-3 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium truncate">
                                      {showSemanticResults ? (doc.document?.title || doc.title) : doc.title}
                                    </h4>
                                    {showSemanticResults && (
                                      <Badge variant="default" className="text-xs bg-orange-600">
                                        {(doc.similarity * 100).toFixed(1)}% match
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs text-orange-600">
                                      📋 Agent Log
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                    <span>
                                      Size: {formatFileSize(showSemanticResults ? (doc.document?.metadata?.filesize || 0) : (doc.metadata?.filesize || 0))}
                                    </span>
                                    <span>
                                      Added: {new Date(showSemanticResults ? (doc.document?.metadata?.uploadedAt || Date.now()) : (doc.metadata?.uploadedAt || Date.now())).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePreviewDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => deleteDocument(showSemanticResults ? (doc.document?.id || doc.id) : doc.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No agent logs found.</p>
                          <p className="text-sm">Agent processing logs will appear here after multi-agent research sessions.</p>
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
    </>
  );
} 