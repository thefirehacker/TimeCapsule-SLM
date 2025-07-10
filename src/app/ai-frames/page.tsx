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
} from "@/components/ui/dialog";
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
}

interface FrameCreationData {
  goal: string;
  videoUrl: string;
  startTime?: number;
  duration?: number;
}

const hardcodedFrames: AIFrame[] = [
  {
    id: "frame-01",
    title: "GPT-2 Model Loading from Scratch",
    goal: "Understanding how to load and initialize GPT-2 model from scratch using Tyler's implementation",
    informationText: `
      In this frame, we'll explore Tyler Romero's approach to loading GPT-2 model from scratch. 
      This is a foundational concept for understanding how large language models are initialized 
      and prepared for training or inference. 
      
      Tyler's blog post demonstrates the practical implementation details that are often overlooked 
      in theoretical explanations.
    `,
    videoUrl: "https://youtu.be/l8pRSuU81PU?si=fTMMzZfitHcNcv2J&t=1242",
    startTime: 1242, // 20:42
    duration: 300, // 5 minutes
    afterVideoText: `
      Key takeaways from this segment:
      • Model initialization requires careful parameter setup
      • Configuration files define model architecture
      • Proper tokenizer integration is crucial for text processing
      • Understanding the relationship between model size and memory requirements
      
      The implementation shown here forms the foundation for more advanced training techniques 
      we'll explore in subsequent frames.
    `,
    aiConcepts: [
      "Model Architecture",
      "Parameter Initialization",
      "Tokenizer Integration",
      "Memory Management",
      "Configuration Files",
      "GPT-2 Variants",
    ],
  },
  {
    id: "frame-02",
    title: "Understanding train_gpt2.py Script",
    goal: "Explanation of what train_gpt2.py script is and why it's needed",
    informationText: `
      Tyler's training script is the orchestrator that brings together all components needed 
      for GPT-2 training. This script handles data loading, model training loops, 
      optimization, and checkpointing.
      
      Understanding this script is crucial for anyone wanting to train language models 
      from scratch or fine-tune existing models.
    `,
    videoUrl: "https://youtu.be/l8pRSuU81PU?si=fTMMzZfitHcNcv2J&t=1542",
    startTime: 1542, // 25:42
    duration: 360, // 6 minutes
    afterVideoText: `
      The train_gpt2.py script serves several critical functions:
      • Data preprocessing and batch management
      • Training loop implementation with proper gradient handling
      • Loss calculation and optimization steps
      • Model checkpointing and state management
      • Evaluation metrics and logging
      
      This script demonstrates production-ready training practices that can be adapted 
      for various language modeling tasks.
    `,
    aiConcepts: [
      "Training Loops",
      "Gradient Optimization",
      "Data Preprocessing",
      "Checkpointing",
      "Loss Functions",
      "Evaluation Metrics",
    ],
  },
];

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
  
  // NEW: Graph view state
  const [showGraphView, setShowGraphView] = useState(false);

  // Frame state
  const [frames, setFrames] = useState<AIFrame[]>(hardcodedFrames);
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
  const [showCreateFrame, setShowCreateFrame] = useState(false);
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

  // Load AI-Frames TimeCapsule data on initialization
  useEffect(() => {
    try {
      // Check for AI-Frames specific data
      const aiFramesData = localStorage.getItem("ai_frames_timecapsule");
      if (aiFramesData) {
        const parsedData = JSON.parse(aiFramesData);
        if (parsedData.data && parsedData.data.frames) {
          // Auto-restore last session
          setFrames(parsedData.data.frames);
          setCurrentFrameIndex(parsedData.data.currentFrameIndex || 0);
          
          if (parsedData.data.voiceSettings) {
            setVoiceSettings(parsedData.data.voiceSettings);
          }
          
          // Restore graph state and chapters
          if (parsedData.data.graphState) {
            setGraphState(parsedData.data.graphState);
          }
          
          if (parsedData.data.chapters) {
            setChapters(parsedData.data.chapters);
          }
          
          if (parsedData.data.showGraphView !== undefined) {
            setShowGraphView(parsedData.data.showGraphView);
          }
          
          setChatMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: `🔄 Restored previous session with ${parsedData.data.frames.length} frames. You were on frame ${(parsedData.data.currentFrameIndex || 0) + 1}.`,
            },
          ]);
        }
      }

      // Check for combined TimeCapsule data
      const combinedData = localStorage.getItem("timecapsule_combined");
      if (combinedData && !aiFramesData) {
        const parsedData = JSON.parse(combinedData);
        if (parsedData.data && parsedData.data.frames) {
          setFrames(parsedData.data.frames);
          setCurrentFrameIndex(parsedData.data.currentFrameIndex || 0);
          
          if (parsedData.data.graphState) {
            setGraphState(parsedData.data.graphState);
          }
          
          if (parsedData.data.chapters) {
            setChapters(parsedData.data.chapters);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load TimeCapsule data:", error);
    }
  }, []);

  // Initialize metadata manager and load BubblSpaces/TimeCapsules
  useEffect(() => {
    const initializeMetadata = async () => {
      try {
        // Initialize metadata manager
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
        
        // Auto-create TimeCapsule for current session if none exists
        if (bubblSpaces.length > 0 && !currentTimeCapsule) {
          const sessionTimeCapsule = manager.createTimeCapsule(
            MetadataUtils.generateTimeCapsuleName('learning', 'AI-Frames Session'),
            'Auto-generated TimeCapsule for current AI-Frames learning session',
            (defaultBubblSpace || bubblSpaces[0]).id,
            {
              category: 'learning',
              difficulty: 'intermediate',
              estimatedDuration: frames.length * 10, // Estimate 10 mins per frame
            }
          );
          setCurrentTimeCapsule(sessionTimeCapsule);
          setAllTimeCapsules(prev => [...prev, sessionTimeCapsule]);
        }
        
      } catch (error) {
        console.error('Failed to initialize metadata manager:', error);
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

  // Save all current AI-Frames to Knowledge Base whenever frames change or VectorStore becomes available
  const saveAllFramesToKB = async () => {
    if (!vectorStore || !vectorStoreInitialized || frames.length === 0) {
      return;
    }

    if (!processingAvailable) {
      console.log('⏳ VectorStore not ready for processing, skipping AI-Frames KB save');
      return;
    }

    try {
      console.log(`📊 Saving ${frames.length} AI-Frames to Knowledge Base...`);
      
      for (const frame of frames) {
        if (!frame.title || !frame.informationText) continue;

        // Create document title and content from AI-Frame
        const title = `AI-Frame: ${frame.title}`;
        const content = `
Learning Goal: ${frame.goal}

Context & Background:
${frame.informationText}

After Video Content:
${frame.afterVideoText || 'No additional content'}

AI Concepts: ${frame.aiConcepts ? frame.aiConcepts.join(', ') : 'None'}

Video Details:
- URL: ${frame.videoUrl || 'No video'}
- Start Time: ${frame.startTime || 0}s
- Duration: ${frame.duration || 0}s

Generated: ${frame.isGenerated ? 'Yes' : 'No'}
${frame.sourceGoal ? `Source Goal: ${frame.sourceGoal}` : ''}
        `.trim();

        // Check if this AI-Frame already exists in KB
        const existingDocs = await vectorStore.getAllDocuments();
        const existingDoc = existingDocs.find(doc => 
          doc.metadata.source === 'ai-frames' && 
          ((doc.metadata as any).aiFrameId === frame.id || doc.title === title)
        );

        if (existingDoc) {
          console.log(`⚠️ AI-Frame "${frame.title}" already exists in KB, skipping`);
          continue;
        }

        // Add to Knowledge Base
        try {
          await vectorStore.addGeneratedDocument(title, content);
          
          // Update metadata to mark as AI-Frame
          const allDocs = await vectorStore.getAllDocuments();
          const newDoc = allDocs.find(doc => doc.title === title && !(doc.metadata as any).aiFrameId);
          if (newDoc) {
            newDoc.metadata.source = 'ai-frames';
            (newDoc.metadata as any).aiFrameId = frame.id;
            (newDoc.metadata as any).aiFrameType = 'learning-frame';
            (newDoc.metadata as any).videoUrl = frame.videoUrl;
            (newDoc.metadata as any).startTime = frame.startTime;
            (newDoc.metadata as any).duration = frame.duration;
            (newDoc.metadata as any).isGenerated = frame.isGenerated;
            await vectorStore.insertDocument(newDoc);
          }

          console.log(`✅ Saved AI-Frame to KB: ${frame.title}`);
        } catch (error) {
          console.warn(`⚠️ Failed to save AI-Frame "${frame.title}" to KB:`, error);
        }
      }

      console.log(`✅ Finished saving AI-Frames to Knowledge Base`);
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

  const currentFrame = frames[currentFrameIndex];

  // Auto-advance to next frame after video ends
  useEffect(() => {
    if (!isCreationMode && autoAdvanceEnabled && currentFrame) {
      const advanceDelay = (currentFrame.duration + 3) * 1000; // 3 seconds after video ends

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
    currentFrame,
    frames.length,
    frames,
  ]);

  // Auto-narrate when frame changes in learn mode
  useEffect(() => {
    if (
      !isCreationMode &&
      isVoiceEnabled &&
      ttsReady &&
      currentFrame &&
      userHasInteracted
    ) {
      // Reset video to beginning when frame changes
      if (videoRef.current) {
        const videoId = extractVideoId(currentFrame.videoUrl);
        const resetUrl = `https://www.youtube.com/embed/${videoId}?start=${
          currentFrame.startTime
        }&end=${
          currentFrame.startTime + currentFrame.duration
        }&autoplay=0&controls=1&modestbranding=1&rel=0`;
        videoRef.current.src = resetUrl;
      }

      // Start narration (which will auto-play video when complete)
      narrateFrame(currentFrame);
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
      if (videoRef.current) {
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

    // Track concept click
    pageAnalytics.trackFeatureUsage("concept_exploration", {
      concept: concept,
      current_frame: currentFrameIndex,
      frame_title: currentFrame?.title,
      total_concepts: currentFrame?.aiConcepts.length,
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

    let aiResponse = `Great question! Based on your current frame "${currentFrame.title}" and your learning journey, let me help you understand this concept better.`;

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
      setShowCreateFrame(false);
      setNewFrameData({ goal: "", videoUrl: "", startTime: 0, duration: 300 });

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
    if (confirm("Are you sure you want to delete this frame?")) {
      setFrames((prev) => prev.filter((f) => f.id !== frameId));
      if (currentFrameIndex >= frames.length - 1) {
        setCurrentFrameIndex(Math.max(0, frames.length - 2));
      }
    }
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

    setFrames(newFrames);

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
        }" moved to position ${dropIndex + 1}.`,
      },
    ]);

    setDraggedFrameId(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedFrameId(null);
    setDragOverIndex(null);
  };

  const videoId = extractVideoId(currentFrame.videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${
    currentFrame.startTime
  }&end=${
    currentFrame.startTime + currentFrame.duration
  }&autoplay=0&controls=1&modestbranding=1&rel=0`;

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
              Frame {currentFrameIndex + 1} of {frames.length}
            </Badge>
          </div>
          
          {/* BubblSpace & TimeCapsule Management */}
          <div className="flex items-center gap-4">
            {/* Current BubblSpace Display */}
            {currentBubblSpace && (
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
            )}
            
            {/* BubblSpace Management */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingBubblSpace(null);
                setShowBubblSpaceDialog(true);
              }}
              title="Create or manage BubblSpaces"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              BubblSpace
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Current TimeCapsule Display */}
            {currentTimeCapsule && (
              <div 
                className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => {
                  setEditingTimeCapsule(currentTimeCapsule);
                  setShowTimeCapsuleDialog(true);
                }}
                title={`Current TimeCapsule: ${currentTimeCapsule.name}. Click to edit.`}
              >
                <Package className="w-3 h-3" />
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {currentTimeCapsule.name}
                </span>
                <Badge variant="outline" className="text-xs">
                  {currentTimeCapsule.category}
                </Badge>
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
                    onClick={() => setShowCreateFrame(true)}
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
                onFramesChange={setFrames}
                isCreationMode={isCreationMode}
                currentFrameIndex={currentFrameIndex}
                onFrameIndexChange={setCurrentFrameIndex}
                onCreateFrame={() => setShowCreateFrame(true)}
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
                      <div className="flex items-center justify-center py-8">
                        <Button
                          onClick={() => setShowCreateFrame(true)}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Create New AI Frame
                        </Button>
                      </div>
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

      {/* Create Frame Dialog */}
      {showCreateFrame && (
        <Dialog open={showCreateFrame} onOpenChange={setShowCreateFrame}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New AI Frame</DialogTitle>
              <DialogDescription>
                Generate a new learning frame with AI assistance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="goal">Learning Goal</Label>
                  <Textarea
                    id="goal"
                    placeholder="What should learners understand after this frame?"
                    value={newFrameData.goal}
                    onChange={(e) =>
                      setNewFrameData({ ...newFrameData, goal: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="videoUrl">Video URL</Label>
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
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time (seconds)</Label>
                    <Input
                      id="startTime"
                      type="number"
                      placeholder="0"
                      value={newFrameData.startTime || ""}
                      onChange={(e) =>
                        setNewFrameData({
                          ...newFrameData,
                          startTime: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (seconds)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="300"
                      value={newFrameData.duration || ""}
                      onChange={(e) =>
                        setNewFrameData({
                          ...newFrameData,
                          duration: parseInt(e.target.value) || 300,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateFrame(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateFrame} disabled={isGeneratingFrame}>
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
          </DialogContent>
        </Dialog>
      )}

      {/* Voice Settings Dialog */}
      {showVoiceSettings && (
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
      )}

      {/* Concept Detail Dialog */}
      {selectedConcept && (
        <Dialog
          open={!!selectedConcept}
          onOpenChange={() => setSelectedConcept(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {selectedConcept}
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
      )}
    </div>
  );
}
