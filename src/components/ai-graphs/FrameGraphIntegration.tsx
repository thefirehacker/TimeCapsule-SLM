import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DualPaneFrameView from "./DualPaneFrameView";
import { GraphState } from "./types";
import {
  Network,
  Eye,
  Edit3,
  BookOpen,
  Brain,
  Layers,
  Save,
} from "lucide-react";
import { debugFrames, debugStorage } from '@/lib/debugUtils';

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
  order?: number; // Preserve frame order
  bubblSpaceId?: string; // Link to BubblSpace
  timeCapsuleId?: string; // Link to TimeCapsule
  parentFrameId?: string; // For chapter/module hierarchy
  type?: "frame" | "chapter" | "module"; // Frame type
  createdAt?: string;
  updatedAt?: string;
  // CRITICAL FIX: Add attachment field for graph attachment system
  attachment?: {
    id: string;
    type: "video" | "pdf" | "text";
    data: {
      videoUrl?: string;
      startTime?: number;
      duration?: number;
      pdfUrl?: string;
      pages?: string;
      text?: string;
      title?: string;
      notes?: string;
    };
  };
}

interface FrameGraphIntegrationProps {
  frames: AIFrame[];
  onFramesChange: (frames: AIFrame[]) => void;
  isCreationMode: boolean;
  currentFrameIndex: number;
  onFrameIndexChange: (index: number) => void;
  onCreateFrame?: () => void;
  onTimeCapsuleUpdate?: (graphState: GraphState, chapters: any[]) => void;
  graphStorageManager?: any; // Add graphStorageManager prop
}

export default function FrameGraphIntegration({
  frames,
  onFramesChange,
  isCreationMode,
  currentFrameIndex,
  onFrameIndexChange,
  onCreateFrame,
  onTimeCapsuleUpdate,
  graphStorageManager,
}: FrameGraphIntegrationProps) {
  
  // Debug: Track when frames prop changes
  useEffect(() => {
    debugFrames('FrameGraphIntegration received frames update', {
      count: frames.length,
      frameIds: frames.map(f => f.id),
      frameTitles: frames.map(f => f.title)
    });
  }, [frames]);

  const [graphState, setGraphState] = useState<GraphState>({
    nodes: [],
    edges: [],
    selectedNodeId: null,
  });
  const [chapters, setChapters] = useState<any[]>([]);

  // Auto-organize frames into chapters based on concepts
  const organizeIntoChapters = useCallback(() => {
    const conceptGroups = new Map<string, AIFrame[]>();
    
    frames.forEach((frame) => {
      const mainConcept = frame.aiConcepts[0] || "General";
      if (!conceptGroups.has(mainConcept)) {
        conceptGroups.set(mainConcept, []);
      }
      conceptGroups.get(mainConcept)?.push(frame);
    });

    const newChapters = Array.from(conceptGroups.entries()).map(([concept, chapterFrames], index) => ({
      id: `chapter-${index}`,
      title: concept,
      description: `Chapter focusing on ${concept}`,
      frames: chapterFrames,
      startIndex: frames.findIndex(f => f.id === chapterFrames[0]?.id),
      endIndex: frames.findIndex(f => f.id === chapterFrames[chapterFrames.length - 1]?.id),
    }));

    setChapters(newChapters);
  }, [frames]);

  useEffect(() => {
    organizeIntoChapters();
  }, [organizeIntoChapters]);

  const handleGraphChange = useCallback((newGraphState: GraphState) => {
    setGraphState(newGraphState);
    
    // Notify parent component for TimeCapsule updates
    if (onTimeCapsuleUpdate) {
      onTimeCapsuleUpdate(newGraphState, chapters);
    }
  }, [chapters, onTimeCapsuleUpdate]);

  const handleChapterClick = useCallback((chapter: any) => {
    onFrameIndexChange(chapter.startIndex);
  }, [onFrameIndexChange]);

  // Load graph state from TimeCapsule
  useEffect(() => {
    try {
      const timeCapsuleData = localStorage.getItem("ai_frames_timecapsule");
      if (timeCapsuleData) {
        const parsedData = JSON.parse(timeCapsuleData);
        if (parsedData.data.graphState) {
          setGraphState(parsedData.data.graphState);
        }
        if (parsedData.data.chapters) {
          setChapters(parsedData.data.chapters);
        }

      }
    } catch (error) {
      console.error("Failed to load graph state from TimeCapsule:", error);
    }
  }, []);

  // Save graph state to TimeCapsule when it changes
  useEffect(() => {
    try {
      const existingData = localStorage.getItem("ai_frames_timecapsule");
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const updatedData = {
          ...parsedData,
          data: {
            ...parsedData.data,
            graphState: graphState,
            chapters: chapters,
            lastGraphUpdate: new Date().toISOString(),
          }
        };
        localStorage.setItem("ai_frames_timecapsule", JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error("Failed to save graph state to TimeCapsule:", error);
    }
  }, [graphState, chapters]);



  const handleSaveGraph = async () => {
    try {
      // Get current frames from storage (same as before)
      let currentFrames: AIFrame[] = [];
      
      if (graphStorageManager) {
        try {
          const frameSequence = await graphStorageManager.loadFrameSequence();
          currentFrames = frameSequence?.frames || [];
        } catch (error) {
          console.warn("Failed to load from IndexedDB, trying TimeCapsule:", error);
          try {
            const timeCapsuleData = localStorage.getItem("timecapsule_combined");
            if (timeCapsuleData) {
              const parsed = JSON.parse(timeCapsuleData);
              currentFrames = parsed.data?.frames || [];
            }
          } catch (fallbackError) {
            console.warn("Failed to load from TimeCapsule:", fallbackError);
          }
        }
      }

      console.log(`🔄 Starting Save Graph with ${currentFrames.length} existing frames`);

             // Convert graph nodes to frames
       const graphFrames: AIFrame[] = graphState.nodes
         .filter((node: any) => node.type === 'aiFrame')
                  .map((node: any) => ({
           id: node.id,
           title: node.data.title || 'Untitled Frame',
           goal: node.data.goal || node.data.learningGoal || 'No learning goal specified',
           informationText: node.data.informationText || node.data.summary || '',
           videoUrl: node.data.videoUrl || '',
           startTime: node.data.startTime || 0,
           duration: node.data.duration || 30,
           afterVideoText: node.data.afterVideoText || '',
           aiConcepts: node.data.aiConcepts || node.data.keyPoints || [],
           // CRITICAL: Include attachment data
           attachment: node.data.attachment || (node.data.videoUrl ? {
             type: 'video' as const,
             url: node.data.videoUrl,
             title: node.data.title || 'Video',
             startTime: node.data.startTime || 0,
             duration: node.data.duration || 30
           } : undefined),
           timestamp: node.data.timestamp || new Date().toISOString(),
           createdAt: node.data.createdAt || new Date().toISOString(),
           updatedAt: new Date().toISOString()
         }));

      console.log(`📊 Converted ${graphFrames.length} graph nodes to frames`);

      // Merge frames (same logic as before)
      const mergedFrames = [...currentFrames];
      let addedCount = 0;
      let updatedCount = 0;

      for (const graphFrame of graphFrames) {
        const existingIndex = mergedFrames.findIndex(f => f.id === graphFrame.id);
        if (existingIndex !== -1) {
          mergedFrames[existingIndex] = graphFrame;
          updatedCount++;
        } else {
          mergedFrames.push(graphFrame);
          addedCount++;
        }
      }

      console.log(`📊 Frame merge complete: ${currentFrames.length} + ${addedCount} new + ${updatedCount} updated = ${mergedFrames.length} total`);

      // DEEP RESEARCH PATTERN: Immediate storage save
      const frameSequence = {
        frames: mergedFrames,
        metadata: {
          version: "1.0",
          lastUpdated: new Date().toISOString(),
          source: "graph-save"
        }
      };

      // Save to IndexedDB
      if (graphStorageManager) {
        await graphStorageManager.saveFrameSequence(frameSequence);
        console.log("✅ Frames saved to IndexedDB");
      }

      // Save to TimeCapsule (fallback)
      localStorage.setItem("timecapsule_combined", JSON.stringify({
        data: frameSequence,
        timestamp: new Date().toISOString()
      }));
      console.log("✅ Frames saved to TimeCapsule");

      // DEEP RESEARCH PATTERN: Immediate VectorStore sync
      // Find the main page's VectorStore instance
      let vectorStore: any = null;
      let vectorStoreInitialized = false;
      
      // Try to get VectorStore from global scope (like Deep Research does)
      if (typeof window !== 'undefined') {
        const aiFramesApp = (window as any).aiFramesApp;
        if (aiFramesApp?.vectorStore) {
          vectorStore = aiFramesApp.vectorStore;
          vectorStoreInitialized = aiFramesApp.vectorStoreInitialized;
        }
      }

      if (vectorStore && vectorStoreInitialized && mergedFrames.length > 0) {
        console.log("🔄 Immediately syncing frames to Knowledge Base...");
        
                 try {
           // Use the same sync method as main page - insertDocument
           for (const frame of mergedFrames) {
             const content = `Frame: ${frame.title}
Goal: ${frame.goal}
Information: ${frame.informationText}
After Video: ${frame.afterVideoText}
Concepts: ${frame.aiConcepts.join(', ')}
Video URL: ${frame.videoUrl}
Created: ${frame.createdAt}
Updated: ${frame.updatedAt}`;

             // Create document in same format as main page
             const aiFrameDoc = {
               id: `aiframe-${frame.id}`,
               title: `AI-Frame: ${frame.title}`,
               content: content,
               metadata: {
                 filename: `${frame.title}.txt`,
                 filesize: content.length,
                 filetype: "text/plain",
                 uploadedAt: new Date().toISOString(),
                 source: "ai-frames-graph",
                 description: `AI Frame: ${frame.title}`,
                 isGenerated: true,
                 frameId: frame.id,
                 frameOrder: frame.order || 1,
                 frameType: frame.type || "frame",
                 createdAt: frame.createdAt,
                 updatedAt: frame.updatedAt,
               },
               chunks: [],
               vectors: [],
             };

             await vectorStore.insertDocument(aiFrameDoc);
             console.log(`📊 Synced frame ${frame.title} to Knowledge Base`);
           }
          
          console.log("✅ All frames synced to Knowledge Base immediately");
          
          // DEEP RESEARCH PATTERN: Dispatch success event
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('graph-saved', {
              detail: {
                success: true,
                frameCount: mergedFrames.length,
                frames: mergedFrames,
                timestamp: new Date().toISOString()
              }
            }));
          }
          
        } catch (syncError) {
          console.error("❌ Failed to sync to Knowledge Base:", syncError);
          // Still dispatch event but mark as partial success
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('graph-saved', {
              detail: {
                success: false,
                error: syncError,
                frameCount: mergedFrames.length,
                frames: mergedFrames,
                timestamp: new Date().toISOString()
              }
            }));
          }
        }
      } else {
        console.warn("⚠️ VectorStore not available, frames saved to storage only");
        // Dispatch event anyway
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('graph-saved', {
            detail: {
              success: false,
              error: "VectorStore not available",
              frameCount: mergedFrames.length,
              frames: mergedFrames,
              timestamp: new Date().toISOString()
            }
          }));
        }
      }

      console.log("✅ Save Graph completed successfully");
      
    } catch (error) {
      console.error("❌ Save Graph failed:", error);
      
      // Dispatch failure event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('graph-saved', {
          detail: {
            success: false,
            error: error,
            frameCount: 0,
            frames: [],
            timestamp: new Date().toISOString()
          }
        }));
      }
    }
  };


  return (
    <div className="h-full flex flex-col">
      {/* Header with Stats and Actions */}
      <div className="flex-none border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Dual-Pane AI Frames</h2>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <Badge variant="outline" className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                {frames.length} frames
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {chapters.length} chapters
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                {frames.reduce((acc, frame) => acc + frame.aiConcepts.length, 0)} concepts
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isCreationMode ? "default" : "secondary"}>
              {isCreationMode ? (
                <Edit3 className="h-3 w-3 mr-1" />
              ) : (
                <Eye className="h-3 w-3 mr-1" />
              )}
              {isCreationMode ? "Creator Mode" : "Learning Mode"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveGraph}
              className="text-blue-600 hover:text-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Graph
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                organizeIntoChapters();
                handleSaveGraph();
              }}
              className="text-green-600 hover:text-green-700"
            >
              <Layers className="h-4 w-4 mr-2" />
              Organize
            </Button>
          </div>
        </div>
      </div>

      {/* Dual-Pane Content */}
      <div className="flex-1 overflow-hidden">
        <DualPaneFrameView
          frames={frames}
          onFramesChange={onFramesChange}
          isCreationMode={isCreationMode}
          currentFrameIndex={currentFrameIndex}
          onFrameIndexChange={onFrameIndexChange}
          onCreateFrame={onCreateFrame}
        />
      </div>
    </div>
  );
}