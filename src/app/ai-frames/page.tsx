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
import { 
  getMetadataManager, 
  MetadataManager 
} from "@/lib/MetadataManager";
import {
  BubblSpace,
  TimeCapsuleMetadata,
  EnhancedTimeCapsule,
  ImportOptions,
  ImportResult,
  MetadataUtils
} from "@/types/timecapsule";

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
  type: 'frame' | 'chapter' | 'module'; // Frame type
  createdAt: string;
  updatedAt: string;
}

interface FrameCreationData {
  goal: string;
  videoUrl: string;
  startTime?: number;
  duration?: number;
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
    processingStatus
  } = useVectorStore();

  // Mode state
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [showCreationForm, setShowCreationForm] = useState(false);
  
  // NEW: Graph view state
  const [showGraphView, setShowGraphView] = useState(false);

  // Frame state - Always start empty, load from localStorage if available
  const [frames, setFrames] = useState<AIFrame[]>([]);
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
  const [metadataManager, setMetadataManager] = useState<MetadataManager | null>(null);
  const [currentBubblSpace, setCurrentBubblSpace] = useState<BubblSpace | null>(null);
  const [currentTimeCapsule, setCurrentTimeCapsule] = useState<TimeCapsuleMetadata | null>(null);
  const [allBubblSpaces, setAllBubblSpaces] = useState<BubblSpace[]>([]);
  const [allTimeCapsules, setAllTimeCapsules] = useState<TimeCapsuleMetadata[]>([]);
  const [showTimeCapsuleSelector, setShowTimeCapsuleSelector] = useState<boolean>(false);
  
  // Dialog states
  const [showBubblSpaceDialog, setShowBubblSpaceDialog] = useState(false);
  const [showTimeCapsuleDialog, setShowTimeCapsuleDialog] = useState(false);
  const [showSafeImportDialog, setShowSafeImportDialog] = useState(false);
  const [editingBubblSpace, setEditingBubblSpace] = useState<BubblSpace | null>(null);
  const [editingTimeCapsule, setEditingTimeCapsule] = useState<TimeCapsuleMetadata | null>(null);
  const [importTimeCapsuleData, setImportTimeCapsuleData] = useState<EnhancedTimeCapsule | null>(null);
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
  const [vectorStore, setVectorStore] = useState<VectorStore | null>(null);
  const [timeCapsuleData, setTimeCapsuleData] = useState<any>(null);

  // Graph state for TimeCapsule integration
  const [graphState, setGraphState] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [conceptExplanations, setConceptExplanations] = useState<Record<string, string>>({});

  // Confirmation dialog states
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showClearAllConfirmation, setShowClearAllConfirmation] = useState(false);
  const [frameToDelete, setFrameToDelete] = useState<string | null>(null);

  const videoRef = useRef<HTMLIFrameElement>(null);

  // Callback for TimeCapsule updates from FrameGraphIntegration
  const handleTimeCapsuleUpdate = useCallback((newGraphState: any, newChapters: any[]) => {
    setGraphState(newGraphState);
    setChapters(newChapters);
  }, []);

  // Enhanced TimeCapsule Export with Metadata
  const handleExportTimeCapsule = async () => {
    if (!metadataManager || !currentTimeCapsule) {
      // Show TimeCapsule creation dialog if none exists
      setShowTimeCapsuleDialog(true);
      return;
    }

    try {
      // Update current TimeCapsule with latest progress
      const updatedTimeCapsule = metadataManager.updateTimeCapsule(currentTimeCapsule.id, {
        estimatedDuration: frames.length * 10,
        description: `Learning session with ${frames.length} AI frames. Progress: ${Math.round((currentFrameIndex / frames.length) * 100)}%`,
      });

      // Export using the enhanced format
      const enhancedTimeCapsule = await metadataManager.exportTimeCapsule(updatedTimeCapsule.id);

      // Create downloadable file
      const blob = new Blob([JSON.stringify(enhancedTimeCapsule, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentBubblSpace?.name || 'BubblSpace'}-${enhancedTimeCapsule.timeCapsuleMetadata.name}-${new Date().toISOString().split('T')[0]}.json`;
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
📊 Size: ${enhancedTimeCapsule.metadata.fileSize ? MetadataUtils.formatFileSize(enhancedTimeCapsule.metadata.fileSize) : 'Unknown'}

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
          content: `❌ Failed to export TimeCapsule: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
  const handleEnhancedImport = async (options: ImportOptions): Promise<ImportResult> => {
    if (!metadataManager || !importTimeCapsuleData) {
      return {
        success: false,
        message: 'Metadata manager not initialized',
        details: { itemsImported: {} }
      };
    }

    try {
      const result = await metadataManager.importTimeCapsule(importTimeCapsuleData, options);
      
      if (result.success) {
        // Refresh local state
        setAllBubblSpaces(metadataManager.getAllBubblSpaces());
        setAllTimeCapsules(metadataManager.getAllTimeCapsules());
        
        // Set imported BubblSpace and TimeCapsule as current
        setCurrentBubblSpace(importTimeCapsuleData.bubblSpace);
        setCurrentTimeCapsule(importTimeCapsuleData.timeCapsuleMetadata);
        
        // If AI-Frames data was imported, update local state
        if (options.selectiveImport.aiFrames && importTimeCapsuleData.aiFramesData) {
          const aiFramesData = importTimeCapsuleData.aiFramesData;
          setFrames(aiFramesData.frames || []);
          setCurrentFrameIndex(aiFramesData.currentFrameIndex || 0);
          setIsCreationMode(aiFramesData.isCreationMode || false);
          setShowGraphView(aiFramesData.showGraphView || false);
          
          // Clear the cleared flag since we're importing new frames
          localStorage.removeItem("ai_frames_cleared");
          
          if (aiFramesData.graphState) setGraphState(aiFramesData.graphState);
          if (aiFramesData.chapters) setChapters(aiFramesData.chapters);
          if (aiFramesData.voiceSettings) setVoiceSettings(aiFramesData.voiceSettings);
          if (aiFramesData.chatMessages) setChatMessages(aiFramesData.chatMessages);
        }
        
        // Show success message with details
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `✅ ${result.message}
            
🎯 Items imported:
${result.details.itemsImported.frames ? `• ${result.details.itemsImported.frames} AI frames` : ''}
${result.details.itemsImported.topics ? `• ${result.details.itemsImported.topics} research topics` : ''}
${result.details.itemsImported.documents ? `• ${result.details.itemsImported.documents} documents` : ''}
${result.details.backupCreated ? `• Backup created: ${result.details.backupCreated}` : ''}`,
          },
        ]);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        details: { itemsImported: {} }
      };
    }
  };

  // Handle legacy TimeCapsule import for backward compatibility
  const handleLegacyImport = (importedData: any) => {
    try {
      // Validate the data structure
      if (!importedData.data || (!importedData.data.frames && !importedData.research)) {
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
        const deepResearchData = importedData.data.deepResearchData || importedData;
        setTimeCapsuleData(deepResearchData);
        localStorage.setItem("deepresearch_data", JSON.stringify(deepResearchData));
      }

      // Save the imported data
      localStorage.setItem("ai_frames_timecapsule", JSON.stringify(importedData));
      localStorage.setItem("timecapsule_combined", JSON.stringify(importedData));

      // Show success message
      const frameCount = importedData.data.frames?.length || 0;
      const hasDeepResearch = !!(importedData.data.deepResearchData || importedData.research);
      
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `🎉 Legacy TimeCapsule imported successfully! Loaded ${frameCount} AI frames${hasDeepResearch ? ' and DeepResearch data' : ''}. You can continue where you left off.`,
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
          content: `❌ Failed to import TimeCapsule: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ]);
    }
  };

  // BubblSpace Management Handlers
  const handleCreateBubblSpace = async (bubblSpaceData: Partial<BubblSpace>) => {
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
      console.error('Failed to create BubblSpace:', error);
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
      console.error('Failed to update BubblSpace:', error);
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
      console.error('Failed to delete BubblSpace:', error);
    }
  };

  // TimeCapsule Management Handlers
  const handleCreateTimeCapsule = async (timeCapsuleData: Partial<TimeCapsuleMetadata>) => {
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
      console.error('Failed to create TimeCapsule:', error);
    }
  };

  const handleEditTimeCapsule = async (timeCapsuleData: Partial<TimeCapsuleMetadata>) => {
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
      console.error('Failed to update TimeCapsule:', error);
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
      console.error('Failed to delete TimeCapsule:', error);
    }
  };

  // App starts completely empty - no auto-restore from localStorage
  // Users need to explicitly import TimeCapsules to load frames
  useEffect(() => {
    console.log('🎯 AI-Frames app initialized with empty state');
    
    // Clear any old saved data since we're starting fresh
    try {
      localStorage.removeItem("ai_frames_cleared");
    } catch (error) {
      console.log('Note: localStorage cleanup failed (normal in some environments)');
    }
  }, []);



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
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          
          if (existingTimeCapsules.length > 0) {
            // Use the most recent existing TimeCapsule
            setCurrentTimeCapsule(existingTimeCapsules[0]);
            console.log(`✅ Using existing TimeCapsule: ${existingTimeCapsules[0].name}`);
          } else {
            // Only create a new TimeCapsule if none exist for this BubblSpace
            try {
              const newTimeCapsule = manager.createTimeCapsule(
                'AI-Frames Session',
                'Learning session with AI-Frames',
                targetBubblSpace.id,
                {
                  category: 'learning',
                  difficulty: 'intermediate',
                  estimatedDuration: frames.length * 10, // Estimate 10 mins per frame
                }
              );
              setCurrentTimeCapsule(newTimeCapsule);
              setAllTimeCapsules(prev => [...prev, newTimeCapsule]);
              console.log(`✅ Created new TimeCapsule: ${newTimeCapsule.name}`);
            } catch (createError) {
              console.warn('⚠️ Could not create TimeCapsule (may have hit limit), using first available:', createError);
              // If we can't create a new TimeCapsule, use the first available one from any BubblSpace
              const anyTimeCapsule = timeCapsules.length > 0 ? timeCapsules[0] : null;
              setCurrentTimeCapsule(anyTimeCapsule);
              if (anyTimeCapsule) {
                console.log(`✅ Using fallback TimeCapsule: ${anyTimeCapsule.name}`);
              }
            }
          }
        }
        
      } catch (error) {
        console.error('Failed to initialize metadata manager:', error);
        
        // Fallback: try to load any existing TimeCapsules
        try {
          const manager = getMetadataManager(vectorStore);
          const existingTimeCapsules = manager.getAllTimeCapsules();
          if (existingTimeCapsules.length > 0) {
            setCurrentTimeCapsule(existingTimeCapsules[0]);
            setAllTimeCapsules(existingTimeCapsules);
            console.log(`✅ Fallback: Using existing TimeCapsule: ${existingTimeCapsules[0].name}`);
          }
        } catch (fallbackError) {
          console.error('Failed to load existing TimeCapsules:', fallbackError);
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
      console.log('🔗 AI-Frames connecting to VectorStoreProvider...');
      setVectorStore(providerVectorStore);
      
      // Make it available globally for compatibility
      if (typeof window !== "undefined") {
        (window as any).sharedVectorStore = providerVectorStore;
      }
      
      console.log('✅ AI-Frames connected to VectorStoreProvider');
    }
  }, [providerVectorStore]);

  // Enhanced AI-Frames Knowledge Base sync with order preservation
  const saveAllFramesToKB = async () => {
    if (!vectorStore || !vectorStoreInitialized || frames.length === 0) {
      return;
    }

    if (!processingAvailable) {
      console.log('⏳ VectorStore not ready for processing, skipping AI-Frames KB save');
      return;
    }

    try {
      console.log(`📊 Saving ${frames.length} AI-Frames to Knowledge Base with order preservation...`);
      
      // Process frames in order to maintain sequence
      for (let index = 0; index < frames.length; index++) {
        const frame = frames[index];
        if (!frame.title || !frame.informationText) continue;

        // Enhanced document title with order information
        const title = `AI-Frame [${frame.order || index + 1}]: ${frame.title}`;
        
        // Enhanced content with hierarchy and relationship information
        const content = `
Learning Goal: ${frame.goal}

Order: ${frame.order || index + 1} of ${frames.length}
Type: ${frame.type || 'frame'}
${frame.parentFrameId ? `Parent Frame: ${frame.parentFrameId}` : ''}
BubblSpace: ${frame.bubblSpaceId || currentBubblSpace?.id || 'default'}
TimeCapsule: ${frame.timeCapsuleId || currentTimeCapsule?.id || 'default'}

Context & Background:
${frame.informationText}

After Video Content:
${frame.afterVideoText || 'No additional content'}

AI Concepts: ${frame.aiConcepts ? frame.aiConcepts.join(', ') : 'None'}

Video Details:
- URL: ${frame.videoUrl || 'No video'}
- Start Time: ${frame.startTime || 0}s
- Duration: ${frame.duration || 0}s

Metadata:
- Generated: ${frame.isGenerated ? 'Yes' : 'No'}
- Created: ${frame.createdAt || 'Unknown'}
- Updated: ${frame.updatedAt || 'Unknown'}
${frame.sourceGoal ? `- Source Goal: ${frame.sourceGoal}` : ''}
        `.trim();

        // Generate unique document ID for this frame
        const docId = `aiframe-${frame.id}`;

        // Check if this AI-Frame already exists in KB
        const existingDocs = await vectorStore.getAllDocuments();
        const existingDoc = existingDocs.find(doc => 
          doc.id === docId || 
          (doc.metadata.source === 'ai-frames' && (doc.metadata as any).aiFrameId === frame.id)
        );

        if (existingDoc) {
          console.log(`🔄 AI-Frame "${frame.title}" exists in KB, updating with current order and data...`);
          
          // Delete existing document first to ensure clean update
          try {
            await vectorStore.deleteDocument(existingDoc.id);
            console.log(`🗑️ Deleted old AI-Frame document: ${existingDoc.id}`);
          } catch (deleteError) {
            console.warn(`⚠️ Failed to delete old AI-Frame document: ${deleteError}`);
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
            filetype: 'application/json',
            uploadedAt: frame.createdAt || new Date().toISOString(),
            source: 'ai-frames',
            description: `AI-Frame: ${frame.title} (Order: ${frame.order || index + 1})`,
            isGenerated: true,
            // Enhanced AI-Frame specific metadata
            aiFrameId: frame.id,
            aiFrameType: frame.type || 'frame',
            aiFrameOrder: frame.order || index + 1,
            aiFrameTotalFrames: frames.length,
            parentFrameId: frame.parentFrameId,
            bubblSpaceId: frame.bubblSpaceId || currentBubblSpace?.id || 'default',
            timeCapsuleId: frame.timeCapsuleId || currentTimeCapsule?.id || 'default',
            videoUrl: frame.videoUrl,
            startTime: frame.startTime,
            duration: frame.duration,
            createdAt: frame.createdAt,
            updatedAt: frame.updatedAt || new Date().toISOString(),
            // Hierarchy information
            frameHierarchy: {
              order: frame.order || index + 1,
              total: frames.length,
              type: frame.type || 'frame',
              hasParent: !!frame.parentFrameId,
              parentId: frame.parentFrameId
            }
          },
          chunks: [], // Required by VectorStore schema
          vectors: [], // Required by VectorStore schema
        };

        // Insert the enhanced document
        try {
          await vectorStore.insertDocument(aiFrameDoc);
          console.log(`✅ Saved AI-Frame to KB: ${frame.title} (Order: ${frame.order || index + 1})`);
        } catch (error) {
          console.warn(`⚠️ Failed to save AI-Frame "${frame.title}" to KB:`, error);
        }
      }

      console.log(`✅ Finished saving AI-Frames to Knowledge Base with order preservation`);
      
      // Dispatch event to notify other pages of AI-Frames update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('aiframes-kb-synced', {
          detail: { 
            frameCount: frames.length, 
            bubblSpaceId: currentBubblSpace?.id,
            timeCapsuleId: currentTimeCapsule?.id,
            timestamp: new Date().toISOString()
          }
        }));
      }
      
    } catch (error) {
      console.error('❌ Failed to save AI-Frames to Knowledge Base:', error);
    }
  };

  // Save frames to KB when VectorStore becomes ready or frames change
  useEffect(() => {
    if (vectorStore && vectorStoreInitialized && processingAvailable && frames.length > 0) {
      console.log('🔄 AI-Frames detected, saving to Knowledge Base...');
      saveAllFramesToKB();
    }
  }, [vectorStore, vectorStoreInitialized, processingAvailable, frames]);

  // Enhanced cross-page synchronization system - Listen for metadata changes from other pages
  useEffect(() => {
    if (!metadataManager) return;

    const refreshMetadata = () => {
      try {
        console.log('🔄 AI-Frames: Refreshing metadata from storage...');
        const updatedBubblSpaces = metadataManager.getAllBubblSpaces();
        const updatedTimeCapsules = metadataManager.getAllTimeCapsules();
        
        console.log('📦 AI-Frames metadata refresh:', {
          bubblSpaces: updatedBubblSpaces.length,
          timeCapsules: updatedTimeCapsules.length,
          currentBubblSpace: currentBubblSpace?.name,
          currentTimeCapsule: currentTimeCapsule?.name
        });
        
        setAllBubblSpaces(updatedBubblSpaces);
        setAllTimeCapsules(updatedTimeCapsules);
        
        // Update current selections if they were modified
        const currentBubblSpaceUpdated = updatedBubblSpaces.find(b => b.id === currentBubblSpace?.id);
        if (currentBubblSpaceUpdated && JSON.stringify(currentBubblSpaceUpdated) !== JSON.stringify(currentBubblSpace)) {
          console.log('🏢 Current BubblSpace updated, applying changes...');
          setCurrentBubblSpace(currentBubblSpaceUpdated);
        }
        
        const currentTimeCapsuleUpdated = updatedTimeCapsules.find(t => t.id === currentTimeCapsule?.id);
        if (currentTimeCapsuleUpdated && JSON.stringify(currentTimeCapsuleUpdated) !== JSON.stringify(currentTimeCapsule)) {
          console.log('🕰️ Current TimeCapsule updated, applying changes...');
          setCurrentTimeCapsule(currentTimeCapsuleUpdated);
        }
        
        console.log('✅ AI-Frames metadata refresh completed');
      } catch (error) {
        console.error('❌ AI-Frames metadata refresh failed:', error);
      }
    };

    const handleMetadataStorageChange = (event: StorageEvent) => {
      if (event.key === 'bubblspaces_metadata' || event.key === 'timecapsules_metadata') {
        console.log('🔄 Cross-page metadata storage change detected in AI-Frames:', {
          key: event.key,
          hasNewValue: !!event.newValue,
          timestamp: new Date().toISOString()
        });
        
        // Reload metadata from storage with delay to ensure write completion
        setTimeout(() => {
          console.log('📦 Executing AI-Frames metadata refresh from cross-page storage change...');
          refreshMetadata();
        }, 100);
      }
    };

    const handleBubblSpaceChange = (event: CustomEvent) => {
      console.log('🏢 Same-page BubblSpace change detected in AI-Frames:', {
        type: event.detail?.type,
        bubblSpaceName: event.detail?.bubblSpace?.name,
        bubblSpaceId: event.detail?.bubblSpace?.id,
        timestamp: new Date().toISOString()
      });
      
      setTimeout(() => {
        console.log('📦 Executing AI-Frames metadata refresh from BubblSpace change...');
        refreshMetadata();
        
        // Update AI-Frames with new BubblSpace relationship if needed
        if (event.detail?.bubblSpace && frames.length > 0) {
          console.log('🔗 Updating AI-Frames BubblSpace relationship...');
          setFrames(prev => prev.map(frame => ({
            ...frame,
            bubblSpaceId: event.detail.bubblSpace.id,
            updatedAt: new Date().toISOString()
          })));
        }
      }, 50);
    };

    const handleTimeCapsuleChange = (event: CustomEvent) => {
      console.log('🕰️ Same-page TimeCapsule change detected in AI-Frames:', {
        type: event.detail?.type,
        timeCapsuleName: event.detail?.timeCapsule?.name,
        timeCapsuleId: event.detail?.timeCapsule?.id,
        timestamp: new Date().toISOString()
      });
      
      setTimeout(() => {
        console.log('📦 Executing AI-Frames metadata refresh from TimeCapsule change...');
        refreshMetadata();
        
        // Update AI-Frames with new TimeCapsule relationship if needed
        if (event.detail?.timeCapsule && frames.length > 0) {
          console.log('🔗 Updating AI-Frames TimeCapsule relationship...');
          setFrames(prev => prev.map(frame => ({
            ...frame,
            timeCapsuleId: event.detail.timeCapsule.id,
            updatedAt: new Date().toISOString()
          })));
        }
      }, 50);
    };

    // AUTO-SYNC: Sync metadata to Knowledge Base every 30 seconds
    const autoSyncInterval = setInterval(() => {
      if (metadataManager && vectorStore && vectorStore.initialized) {
        console.log('🔄 Auto-sync: Syncing AI-Frames metadata to Knowledge Base...');
        
        const bubblSpaces = metadataManager.getAllBubblSpaces();
        const timeCapsules = metadataManager.getAllTimeCapsules();
        
        metadataManager.saveMetadataToVectorStore(bubblSpaces, timeCapsules)
          .then(() => {
            console.log('✅ Auto-sync: AI-Frames metadata synced successfully');
            
            // Also sync AI-Frames data to Knowledge Base
            return saveAllFramesToKB();
          })
          .then(() => {
            console.log('✅ Auto-sync: AI-Frames data synced successfully');
          })
          .catch((error: any) => {
            console.warn('⚠️ Auto-sync: Failed to sync AI-Frames data:', error.message);
          });
      } else {
        console.log('⏳ Auto-sync: Waiting for AI-Frames metadata manager and vector store...');
      }
    }, 30000); // 30 seconds

    // Enhanced event listeners
    window.addEventListener('storage', handleMetadataStorageChange);
    window.addEventListener('bubblspace-metadata-changed', handleBubblSpaceChange as EventListener);
    window.addEventListener('timecapsule-metadata-changed', handleTimeCapsuleChange as EventListener);

    console.log('🔄 Enhanced cross-page sync established for AI-Frames with auto-sync every 30 seconds');

    return () => {
      window.removeEventListener('storage', handleMetadataStorageChange);
      window.removeEventListener('bubblspace-metadata-changed', handleBubblSpaceChange as EventListener);
      window.removeEventListener('timecapsule-metadata-changed', handleTimeCapsuleChange as EventListener);
      
      // Clear auto-sync interval
      clearInterval(autoSyncInterval);
      console.log('🛑 Auto-sync: AI-Frames auto-sync stopped');
      console.log('🔄 AI-Frames cross-page sync listeners removed');
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
      
      if (videoRef.current && currentFrame && currentFrame.videoUrl) {
        // Send play command to YouTube iframe
        const iframe = videoRef.current;
        const videoId = extractVideoId(currentFrame.videoUrl);

        if (videoId) {
          // Create new iframe src with autoplay enabled
          const newEmbedUrl = `https://www.youtube.com/embed/${videoId}?start=${
            currentFrame.startTime
          }&end=${
            currentFrame.startTime + currentFrame.duration
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

    aiResponse += `\n\nThis concept connects to your current frame "${currentFrame.title}" and will help you achieve your goal: "${currentFrame.goal}"

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
        It relates directly to ${currentFrame.title} and helps you understand ${currentFrame.goal}.
        
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

    let aiResponse = `Great question! Based on your current frame "${currentFrame?.title || 'your current learning session'}" and your learning journey, let me help you understand this concept better.`;

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

      // Generate new concepts based on goal
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

      // Extract video info
      const videoId = extractVideoId(frameData.videoUrl);
      const startTime = frameData.startTime || 0;
      const duration = frameData.duration || 300;

      const newFrame: AIFrame = {
        id: `frame-${Date.now()}`,
        title: `Learning: ${frameData.goal.substring(0, 50)}${
          frameData.goal.length > 50 ? "..." : ""
        }`,
        goal: frameData.goal,
        informationText: `
          This frame focuses on: ${frameData.goal}
          
          Based on your TimeCapsule research and knowledge base, this topic connects to several key concepts 
          you've been exploring. The content has been curated to build upon your existing understanding 
          and guide you toward your learning objectives.
          
          Pay attention to how this relates to the concepts you've already covered in previous frames.
        `,
        videoUrl: frameData.videoUrl,
        startTime: startTime,
        duration: duration,
        afterVideoText: `
          Key insights from this content:
          • This topic builds upon concepts from your previous frames
          • Understanding this will help you progress toward your learning goals
          • The implementation details shown here are practical and applicable
          • Consider how this connects to your research findings
          
          Based on your knowledge base and research, here are the next steps in your learning journey.
        `,
        aiConcepts: allConcepts,
        isGenerated: true,
        sourceGoal: frameData.goal,
        sourceUrl: frameData.videoUrl,
                  order: frames.length + 1,
          bubblSpaceId: "default",
          timeCapsuleId: "default",
          parentFrameId: undefined,
          type: 'frame',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return newFrame;
    } finally {
      setIsGeneratingFrame(false);
    }
  };

  const handleCreateFrame = async () => {
    if (!newFrameData.goal.trim() || !newFrameData.videoUrl.trim()) {
      return;
    }

    try {
      const newFrame = await generateFrameContent(newFrameData);
      setFrames((prev) => [...prev, newFrame]);
      setCurrentFrameIndex(frames.length); // Switch to new frame
              setShowCreationForm(false);
      setNewFrameData({ goal: "", videoUrl: "", startTime: 0, duration: 300 });
      
      // Clear the cleared flag since we're creating new frames
      localStorage.removeItem("ai_frames_cleared");

      // Track frame creation
      pageAnalytics.trackFeatureUsage("frame_creation", {
        goal_length: newFrameData.goal.length,
        video_url: newFrameData.videoUrl,
        start_time: newFrameData.startTime,
        duration: newFrameData.duration,
        concepts_generated: newFrame.aiConcepts.length,
        total_frames: frames.length + 1,
      });

      // Add success message to chat
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `✅ Successfully created new frame: "${newFrame.title}"\n\nThis frame was generated based on your goal and existing knowledge base. The AI has identified ${newFrame.aiConcepts.length} related concepts that connect to your learning journey.`,
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
        console.log(`🗑️ Clearing ${frames.length} AI-Frames from Knowledge Base...`);
        
        for (const frame of frames) {
          const docId = `aiframe-${frame.id}`;
          try {
            await vectorStore.deleteDocument(docId);
            console.log(`✅ Deleted AI-Frame from KB: ${frame.title}`);
          } catch (deleteError) {
            console.warn(`⚠️ Failed to delete AI-Frame "${frame.title}" from KB:`, deleteError);
          }
        }
        
        // Also search for any other AI-Frames documents that might exist
        try {
          const allDocs = await vectorStore.getAllDocuments();
          const aiFramesDocs = allDocs.filter(doc => doc.metadata?.source === 'ai-frames');
          
          for (const doc of aiFramesDocs) {
            try {
              await vectorStore.deleteDocument(doc.id);
              console.log(`✅ Deleted additional AI-Frame document from KB: ${doc.title}`);
            } catch (deleteError) {
              console.warn(`⚠️ Failed to delete AI-Frame document "${doc.title}" from KB:`, deleteError);
            }
          }
          
          console.log(`✅ Cleared all AI-Frames from Knowledge Base (${frames.length} frames + ${aiFramesDocs.length} additional documents)`);
        } catch (searchError) {
          console.warn('⚠️ Failed to search for additional AI-Frames documents:', searchError);
        }
      }

      // Clear local state
      const clearedCount = frames.length;
      setFrames([]);
      setCurrentFrameIndex(0);
      
      // Comprehensively clear localStorage data
      try {
        localStorage.removeItem("ai_frames_timecapsule");
        localStorage.removeItem("timecapsule_combined");
        localStorage.removeItem("deepresearch_data");
        localStorage.removeItem("ai_frames_cleared");
        console.log('🗑️ Completely cleared AI-Frames localStorage data');
      } catch (storageError) {
        console.warn('⚠️ Failed to clear localStorage:', storageError);
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
          content: `🗑️ Successfully cleared all ${clearedCount} AI frames!\n\n✅ Removed from local session\n✅ Cleared from Knowledge Base\n✅ Cleared localStorage data\n✅ App will stay empty after reload\n\nYou can now start fresh or import a new TimeCapsule.`,
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
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('aiframes-cleared', {
          detail: { 
            frameCount: clearedCount,
            bubblSpaceId: currentBubblSpace?.id,
            timeCapsuleId: currentTimeCapsule?.id,
            timestamp: new Date().toISOString()
          }
        }));
      }

    } catch (error) {
      console.error('❌ Failed to clear AI frames:', error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `❌ Failed to clear AI frames: ${error instanceof Error ? error.message : 'Unknown error'}`,
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

    // Create new array with reordered frames
    const newFrames = [...frames];
    const [draggedFrame] = newFrames.splice(draggedIndex, 1);
    newFrames.splice(dropIndex, 0, draggedFrame);

    // Update order field for all frames to maintain sequence
    const reorderedFrames = newFrames.map((frame, index) => ({
      ...frame,
      order: index + 1,
      updatedAt: new Date().toISOString()
    }));

    setFrames(reorderedFrames);

    // Update current frame index if needed
    if (currentFrameIndex === draggedIndex) {
      setCurrentFrameIndex(dropIndex);
    } else if (
      draggedIndex < currentFrameIndex &&
      dropIndex >= currentFrameIndex
    ) {
      setCurrentFrameIndex(currentFrameIndex - 1);
    } else if (
      draggedIndex > currentFrameIndex &&
      dropIndex <= currentFrameIndex
    ) {
      setCurrentFrameIndex(currentFrameIndex + 1);
    }

    // Add success message to chat
    setChatMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: `✅ Frame reordered successfully! Frame "${
          draggedFrame.title
        }" moved to position ${dropIndex + 1}. Order numbers updated for all frames.`,
      },
    ]);

    setDraggedFrameId(null);
    setDragOverIndex(null);

    console.log('🔄 Frame order updated via drag & drop:', {
      fromIndex: draggedIndex,
      toIndex: dropIndex,
      frameTitle: draggedFrame.title,
      totalFrames: reorderedFrames.length
    });
  };

  const handleDragEnd = () => {
    setDraggedFrameId(null);
    setDragOverIndex(null);
  };

  // Get current frame safely for video display
  const currentFrame = frames[currentFrameIndex];
  const videoId = currentFrame ? extractVideoId(currentFrame.videoUrl) : null;
  const embedUrl = currentFrame && videoId ? `https://www.youtube.com/embed/${videoId}?start=${
    currentFrame.startTime
  }&end=${
    currentFrame.startTime + currentFrame.duration
  }&autoplay=0&controls=1&modestbranding=1&rel=0` : '';

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
      if (showTimeCapsuleSelector && !(event.target as Element)?.closest('.timecapsule-selector')) {
        setShowTimeCapsuleSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTimeCapsuleSelector]);

  // Skip early return - always show main interface

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      

      {/* Top Navigation Header */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              AI-Frames Learning Platform
            </h2>
            <Badge variant="outline" className="text-xs">
              {frames.length === 0 ? 'No Frames' : `Frame ${currentFrameIndex + 1} of ${frames.length}`}
            </Badge>
          </div>
          
          {/* BubblSpace & TimeCapsule Management */}
          <div className="flex items-center gap-4">
            {/* Current BubblSpace Display */}
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
                    style={{ backgroundColor: currentBubblSpace.color || '#3B82F6' }}
                  />
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {currentBubblSpace.name}
                  </span>
                  {currentBubblSpace.isDefault && (
                    <Badge variant="secondary" className="text-xs">Default</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingBubblSpace(currentBubblSpace);
                    setShowBubblSpaceDialog(true);
                  }}
                  className="h-8 w-8 p-0"
                  title="Edit BubblSpace"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
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
                    onClick={() => setShowTimeCapsuleSelector(!showTimeCapsuleSelector)}
                    title="Select TimeCapsule"
                  >
                    <Package className="w-3 h-3" />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {currentTimeCapsule?.name || 'Select TimeCapsule'}
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
                              currentTimeCapsule?.id === timeCapsule.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => {
                              setCurrentTimeCapsule(timeCapsule);
                              setShowTimeCapsuleSelector(false);
                              // Update frames with new TimeCapsule ID
                              const updatedFrames = frames.map(frame => ({
                                ...frame,
                                timeCapsuleId: timeCapsule.id,
                                updatedAt: new Date().toISOString()
                              }));
                              setFrames(updatedFrames);
                              console.log(`✅ Switched to TimeCapsule: ${timeCapsule.name}`);
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
                                <Badge variant="default" className="text-xs">Current</Badge>
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
              size="sm"
              onClick={handleImportTimeCapsule}
              title="Import Enhanced TimeCapsule with full metadata support"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportTimeCapsule}
              title="Export Enhanced TimeCapsule with BubblSpace and metadata"
              disabled={!currentTimeCapsule}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <Separator orientation="vertical" className="h-6" />

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
                <Label htmlFor="mode-toggle" className="text-sm font-medium">
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
                  <Badge variant={isCreationMode ? "default" : "secondary"} className="text-xs">
                    {isCreationMode ? (
                      <Edit3 className="h-3 w-3 mr-1" />
                    ) : (
                      <Eye className="h-3 w-3 mr-1" />
                    )}
                    {isCreationMode ? "Create" : "Learn"}
                  </Badge>
                </div>
              </div>

              {/* Graph View Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="graph-toggle" className="text-sm font-medium">
                  Graph View
                </Label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="graph-toggle"
                    checked={showGraphView}
                    onCheckedChange={(checked) => {
                      setShowGraphView(checked);
                      pageAnalytics.trackFeatureUsage("graph_view_toggle", {
                        enabled: checked,
                        mode: isCreationMode ? "creation" : "learning",
                        current_frame: currentFrameIndex,
                      });
                    }}
                  />
                  <Badge variant={showGraphView ? "default" : "secondary"} className="text-xs">
                    {showGraphView ? (
                      <Network className="h-3 w-3 mr-1" />
                    ) : (
                      <Database className="h-3 w-3 mr-1" />
                    )}
                    {showGraphView ? "Graph" : "Linear"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Controls - Only in Learn Mode */}
          {!isCreationMode && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Voice Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-toggle" className="text-sm font-medium flex items-center gap-2">
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
                      <Badge variant="default" className="bg-green-500 animate-pulse text-xs">
                        <Mic className="h-3 w-3 mr-1" />
                        Speaking
                      </Badge>
                    )}
                  </div>
                </div>

                {!userHasInteracted && isVoiceEnabled && (
                  <Badge variant="outline" className="text-xs bg-yellow-50 dark:bg-yellow-900/20 w-full justify-center">
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
                  <Label htmlFor="auto-advance" className="text-sm font-medium">
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
                      onDragStart={(e) => handleDragStart(e, frame.id, index)}
                    >
                      {isCreationMode && (
                        <div className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <GripVertical className="h-4 w-4" />
                        </div>
                      )}
                      <Button
                        variant={
                          index === currentFrameIndex ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentFrameIndex(index)}
                        className="flex-1 justify-start text-left h-auto p-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs">
                              Frame {index + 1}
                            </span>
                            {frame.isGenerated && (
                              <Badge variant="secondary" className="text-xs">
                                <Wand2 className="h-2 w-2 mr-1" />
                                AI
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
                        Auto-advancing in {autoAdvanceCountdown} seconds...
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
                            🎙️ Voice narration enabled - Navigate frames to
                            hear explanations
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
                  onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
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
                frames={frames}
                onFramesChange={setFrames as any} // TODO: Fix type compatibility after updating FrameGraphIntegration
                isCreationMode={isCreationMode}
                currentFrameIndex={currentFrameIndex}
                onFrameIndexChange={setCurrentFrameIndex}
                                    onCreateFrame={() => setShowCreationForm(true)}
                onTimeCapsuleUpdate={handleTimeCapsuleUpdate}
              />
            ) : (
              /* Traditional Linear View */
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Creation Mode Panel */}
                {isCreationMode && (
                  <Card className="border-2 border-dashed border-blue-300 dark:border-blue-600">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-blue-600" />
                        AI Frame Creation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {showCreationForm ? (
                        <div className="max-w-2xl mx-auto text-left">
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Create New AI Frame</h2>
                            <Button 
                              variant="ghost" 
                              onClick={() => setShowCreationForm(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ✕ Cancel
                            </Button>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Generate a new learning frame with AI assistance
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <Label htmlFor="goal" className="text-base font-medium">Learning Goal</Label>
                              <Textarea
                                id="goal"
                                placeholder="What should learners understand after this frame?"
                                value={newFrameData.goal}
                                onChange={(e) => setNewFrameData({ ...newFrameData, goal: e.target.value })}
                                rows={4}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="videoUrl" className="text-base font-medium">Video URL</Label>
                              <Input
                                id="videoUrl"
                                placeholder="https://youtube.com/watch?v=..."
                                value={newFrameData.videoUrl}
                                onChange={(e) => setNewFrameData({ ...newFrameData, videoUrl: e.target.value })}
                                className="mt-2"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="startTime" className="text-base font-medium">Start Time (seconds)</Label>
                                <Input
                                  id="startTime"
                                  type="number"
                                  placeholder="0"
                                  value={newFrameData.startTime || ""}
                                  onChange={(e) => setNewFrameData({ ...newFrameData, startTime: parseInt(e.target.value) || 0 })}
                                  className="mt-2"
                                />
                              </div>
                              <div>
                                <Label htmlFor="duration" className="text-base font-medium">Duration (seconds)</Label>
                                <Input
                                  id="duration"
                                  type="number"
                                  placeholder="300"
                                  value={newFrameData.duration || ""}
                                  onChange={(e) => setNewFrameData({ ...newFrameData, duration: parseInt(e.target.value) || 300 })}
                                  className="mt-2"
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-4">
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
                                disabled={isGeneratingFrame}
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
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <Button
                            onClick={() => setShowCreationForm(true)}
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                          >
                            <Plus className="h-5 w-5 mr-2" />
                            Create New AI Frame
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
                            {timeCapsuleData.research?.topics?.length || 0} research
                            topics •
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
                          <Badge variant="default" className="bg-purple-500">
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
                              onClick={() => handleEditFrame(currentFrame)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteFrame(currentFrame.id)}
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
                          disabled={currentFrameIndex === frames.length - 1}
                        >
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{currentFrame.title}</CardTitle>
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
                          <p key={index} className="mb-4 leading-relaxed">
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
                      <iframe
                        ref={videoRef}
                        src={embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Playing from {formatTime(currentFrame.startTime)} for{" "}
                        {formatTime(currentFrame.duration)}
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
                          onClick={() => setShowAIConcepts(!showAIConcepts)}
                        >
                          <Brain className="h-4 w-4 mr-2" />
                          AI Concepts
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                        {currentFrame.aiConcepts.map((concept, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleConceptClick(concept)}
                            className="h-auto p-3 text-left justify-start"
                          >
                            <Brain className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{concept}</span>
                          </Button>
                        ))}
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
                          <p key={index} className="mb-4 leading-relaxed">
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
        onSave={editingBubblSpace ? handleEditBubblSpace : handleCreateBubblSpace}
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
        onSave={editingTimeCapsule ? handleEditTimeCapsule : handleCreateTimeCapsule}
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
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
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
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
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
      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Frame</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this frame? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteFrame}>Cancel</AlertDialogCancel>
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
      <AlertDialog open={showClearAllConfirmation} onOpenChange={setShowClearAllConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All AI Frames</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear all {frames.length} AI frames? This action cannot be undone.
              <br /><br />
              <strong>This will also remove all AI-Frames from the Knowledge Base and keep them cleared even after page reload.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelClearAllFrames}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmClearAllFrames}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear All Frames
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
