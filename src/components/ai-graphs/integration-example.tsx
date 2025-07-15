// Example integration of AI-Graphs into AI-Frames page
// This file shows how to modify the existing AI-Frames page to include graph functionality

import React, { useState } from "react";
import { FrameGraphIntegration } from "@/components/ai-graphs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Network, 
  List, 
  Video, 
  Edit3, 
  Eye,
  Settings,
  LayoutGrid
} from "lucide-react";

// This is an example of how to integrate the graph functionality
// into your existing AI-Frames page

export function AIFramesWithGraphExample() {
  // Your existing AI-Frames state
  const [frames, setFrames] = useState([
    {
      id: "frame-01",
      title: "GPT-2 Model Loading from Scratch",
      goal: "Understanding how to load and initialize GPT-2 model from scratch",
      informationText: "Information about GPT-2 loading...",
      videoUrl: "https://youtu.be/l8pRSuU81PU?si=fTMMzZfitHcNcv2J&t=1242",
      startTime: 1242,
      duration: 300,
      afterVideoText: "Key takeaways from this segment...",
      aiConcepts: ["Model Architecture", "Parameter Initialization", "Tokenizer Integration"],
      isGenerated: false,
    },
    // ... more frames
  ]);

  const [isCreationMode, setIsCreationMode] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [showCreateFrame, setShowCreateFrame] = useState(false);
  const [showGraphView, setShowGraphView] = useState(false);

  // Your existing functions
  const handleCreateFrame = () => {
    setShowCreateFrame(true);
  };

  const handleFrameIndexChange = (index: number) => {
    setCurrentFrameIndex(index);
  };

  const handleFramesChange = (newFrames: any[]) => {
    setFrames(newFrames);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  AI-Frames
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Interactive AI-guided learning experiences
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Mode Toggle */}
              <div className="flex items-center gap-3">
                <Label htmlFor="mode-toggle" className="text-sm font-medium">
                  {isCreationMode ? "Creation" : "Learning"}
                </Label>
                <Switch
                  id="mode-toggle"
                  checked={isCreationMode}
                  onCheckedChange={setIsCreationMode}
                />
                <Badge variant={isCreationMode ? "default" : "secondary"}>
                  {isCreationMode ? (
                    <Edit3 className="h-3 w-3 mr-1" />
                  ) : (
                    <Eye className="h-3 w-3 mr-1" />
                  )}
                  {isCreationMode ? "Create" : "Learn"}
                </Badge>
              </div>

              {/* NEW: Graph View Toggle */}
              <div className="flex items-center gap-3">
                <Label htmlFor="graph-toggle" className="text-sm font-medium">
                  Graph View
                </Label>
                <Switch
                  id="graph-toggle"
                  checked={showGraphView}
                  onCheckedChange={setShowGraphView}
                />
                <Badge variant={showGraphView ? "default" : "secondary"}>
                  {showGraphView ? (
                    <Network className="h-3 w-3 mr-1" />
                  ) : (
                    <List className="h-3 w-3 mr-1" />
                  )}
                  {showGraphView ? "Graph" : "Linear"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* NEW: Graph Integration */}
        {showGraphView ? (
          <FrameGraphIntegration
            frames={frames}
            onFramesChange={handleFramesChange}
            isCreationMode={isCreationMode}
            currentFrameIndex={currentFrameIndex}
            onFrameIndexChange={handleFrameIndexChange}
            onCreateFrame={handleCreateFrame}
          />
        ) : (
          // Your existing AI-Frames layout
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Creation Mode Panel */}
              {isCreationMode && (
                <Card className="border-2 border-dashed border-blue-300 dark:border-blue-600">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5 text-blue-600" />
                      AI Frame Creation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-8">
                      <div className="flex gap-4">
                        <Button
                          onClick={handleCreateFrame}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        >
                          <Video className="h-5 w-5 mr-2" />
                          Create Video Frame
                        </Button>
                        <Button
                          onClick={() => setShowGraphView(true)}
                          size="lg"
                          variant="outline"
                          className="border-purple-300 hover:border-purple-400"
                        >
                          <Network className="h-5 w-5 mr-2" />
                          Use Graph Builder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Frame Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Frame {currentFrameIndex + 1} of {frames.length}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <LayoutGrid className="h-3 w-3 mr-1" />
                        Linear View
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowGraphView(true)}
                      >
                        <Network className="h-4 w-4 mr-2" />
                        Switch to Graph
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">
                    {frames[currentFrameIndex]?.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {frames[currentFrameIndex]?.goal}
                  </p>
                  {/* Your existing frame content */}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Frame Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Frame Navigation
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowGraphView(true)}
                    >
                      <Network className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {frames.map((frame, index) => (
                      <Button
                        key={frame.id}
                        variant={index === currentFrameIndex ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentFrameIndex(index)}
                        className="w-full justify-start text-left h-auto p-3"
                      >
                        <div className="flex-1">
                          <div className="font-medium">Frame {index + 1}</div>
                          <div className="text-xs opacity-75 truncate">
                            {frame.title}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Your existing sidebar content */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Integration Notes:
// 1. Add the graph view toggle to your existing header
// 2. Replace the main content area with conditional rendering
// 3. Use FrameGraphIntegration when showGraphView is true
// 4. Keep your existing linear view for traditional navigation
// 5. The graph view automatically handles:
//    - Frame creation through nodes
//    - Chapter organization
//    - Concept visualization
//    - Sequential flow enforcement
//    - Bidirectional sync with your frames array 