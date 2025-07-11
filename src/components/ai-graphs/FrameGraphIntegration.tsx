import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnhancedLearningGraph from "./EnhancedLearningGraph";
import { GraphState } from "./types";
import {
  Network,
  List,
  Eye,
  Edit3,
  Wand2,
  BookOpen,
  Brain,
  Plus,
  ArrowRight,
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
  const [activeView, setActiveView] = useState<"linear" | "graph">("linear");
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

  const handleViewChange = useCallback((value: string) => {
    setActiveView(value as "linear" | "graph");
  }, []);

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
        if (parsedData.data.activeView) {
          setActiveView(parsedData.data.activeView);
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
            activeView: activeView,
            lastGraphUpdate: new Date().toISOString(),
          }
        };
        localStorage.setItem("ai_frames_timecapsule", JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error("Failed to save graph state to TimeCapsule:", error);
    }
  }, [graphState, chapters, activeView]);

  const renderLinearView = () => (
    <div className="space-y-6">
      {/* Chapter Overview */}
      {chapters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Chapter Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter, index) => (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    currentFrameIndex >= chapter.startIndex &&
                    currentFrameIndex <= chapter.endIndex
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                  onClick={() => handleChapterClick(chapter)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Chapter {index + 1}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {chapter.frames.length} frames
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{chapter.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {chapter.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Frame List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <List className="h-5 w-5 text-gray-600" />
              Frame Sequence
            </div>
            {isCreationMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateFrame}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Frame
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {frames.map((frame, index) => (
              <Card
                key={frame.id}
                className={`cursor-pointer transition-all hover:shadow-sm ${
                  index === currentFrameIndex ? "border-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => onFrameIndexChange(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          Frame {index + 1}
                        </Badge>
                        {frame.isGenerated && (
                          <Badge variant="secondary" className="text-xs">
                            <Wand2 className="h-2 w-2 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-sm mb-1">{frame.title}</h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {frame.goal}
                      </p>
                      {frame.aiConcepts.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {frame.aiConcepts.slice(0, 3).map((concept, conceptIndex) => (
                            <Badge
                              key={conceptIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {concept}
                            </Badge>
                          ))}
                          {frame.aiConcepts.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{frame.aiConcepts.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    {index === currentFrameIndex && (
                      <div className="flex items-center gap-1">
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
        activeView: activeView,
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
            activeView: activeView,
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
  }, [graphState, chapters, frames, activeView]);

  const renderGraphView = () => (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-600" />
              <div>
                <CardTitle>Graph View</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Sequential Flow
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {frames.length} frames
                  </Badge>
                </div>
              </div>
            </div>
            {isCreationMode && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveGraph}
                  className="bg-green-50 hover:bg-green-100 border-green-300 text-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Graph
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Auto-organize frames based on current connections
                    organizeIntoChapters();
                    handleSaveGraph();
                  }}
                  title="Auto-organize frames into chapters"
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Organize
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="h-full p-0">
          <div className="h-[600px]">
            <EnhancedLearningGraph
              mode={isCreationMode ? "creator" : "learner"}
              frames={frames}
              onFramesChange={onFramesChange}
              onGraphChange={handleGraphChange}
              initialGraphState={graphState}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <Card>
        <CardContent className="p-4">
          <Tabs value={activeView} onValueChange={handleViewChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="linear" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Linear View
              </TabsTrigger>
              <TabsTrigger value="graph" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Graph View
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-2">
                <Badge variant={isCreationMode ? "default" : "secondary"}>
                  {isCreationMode ? (
                    <Edit3 className="h-3 w-3 mr-1" />
                  ) : (
                    <Eye className="h-3 w-3 mr-1" />
                  )}
                  {isCreationMode ? "Creator Mode" : "Learning Mode"}
                </Badge>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Content */}
      {activeView === "linear" ? renderLinearView() : renderGraphView()}
    </div>
  );
}