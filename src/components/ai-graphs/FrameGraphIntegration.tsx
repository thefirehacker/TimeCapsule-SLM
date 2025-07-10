import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearningGraph from "./LearningGraph";
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
} from "lucide-react";

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
}

export default function FrameGraphIntegration({
  frames,
  onFramesChange,
  isCreationMode,
  currentFrameIndex,
  onFrameIndexChange,
  onCreateFrame,
}: FrameGraphIntegrationProps) {
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
  }, []);

  const handleViewChange = useCallback((value: string) => {
    setActiveView(value as "linear" | "graph");
  }, []);

  const handleChapterClick = useCallback((chapter: any) => {
    onFrameIndexChange(chapter.startIndex);
  }, [onFrameIndexChange]);

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

  const renderGraphView = () => (
    <div className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-purple-600" />
            Graph View
            <Badge variant="outline" className="ml-2">
              Sequential Flow
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full p-0">
          <div className="h-[600px]">
            <LearningGraph
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