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
}

interface FrameGraphIntegrationProps {
  frames: AIFrame[];
  onFramesChange: (frames: AIFrame[]) => void;
  isCreationMode: boolean;
  currentFrameIndex: number;
  onFrameIndexChange: (index: number) => void;
  onCreateFrame?: () => void;
  onTimeCapsuleUpdate?: (graphState: GraphState, chapters: any[]) => void;
}

export default function FrameGraphIntegration({
  frames,
  onFramesChange,
  isCreationMode,
  currentFrameIndex,
  onFrameIndexChange,
  onCreateFrame,
  onTimeCapsuleUpdate,
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



  const handleSaveGraph = useCallback(async () => {
    try {
      debugStorage('handleSaveGraph called with frames', {
        frameCount: frames.length,
        frames: frames,
        nodes: graphState.nodes.length,
        edges: graphState.edges.length
      });
      
      // Save current graph state to localStorage
      const graphData = {
        graphState: graphState,
        chapters: chapters,
        frames: frames,
        lastSaved: new Date().toISOString(),
      };
      
      localStorage.setItem("ai_frames_graph_state", JSON.stringify(graphData));
      
      // Also update TimeCapsule data
      const existingData = localStorage.getItem("ai_frames_timecapsule");
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const updatedData = {
          ...parsedData,
          data: {
            ...parsedData.data,
            graphState: graphState,
            chapters: chapters,
            lastGraphSave: new Date().toISOString(),
          }
        };
        localStorage.setItem("ai_frames_timecapsule", JSON.stringify(updatedData));
      }
      
      // Dispatch custom event to notify parent components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('graph-saved', {
          detail: {
            frameCount: frames.length,
            nodeCount: graphState.nodes.length,
            edgeCount: graphState.edges.length,
            timestamp: new Date().toISOString()
          }
        }));
        
        // Also trigger a storage event to sync with linear view
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'ai_frames_graph_state',
          newValue: JSON.stringify(graphData),
          url: window.location.href
        }));
      }
      
      debugStorage('Graph saved successfully!', {
        frames: frames.length,
        nodes: graphState.nodes.length,
        connections: graphState.edges.length
      });
      
      return true;
    } catch (error) {
      console.error('❌ Failed to save graph:', error);
      return false;
    }
      }, [graphState, chapters, frames]);



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