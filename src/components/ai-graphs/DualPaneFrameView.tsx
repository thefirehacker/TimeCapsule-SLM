import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import EnhancedLearningGraph from "./EnhancedLearningGraph";
import { GraphState } from "./types";
import {
  Video,
  File,
  FileText,
  Target,
  BookOpen,
  ArrowRight,
  Edit3,
  Save,
  X,
  Play,
  SkipForward,
  SkipBack,
  Clock,
  Maximize2,
  Minimize2,
  Eye,
  Network
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
  attachment?: any;
  order?: number;
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  parentFrameId?: string;
  type?: 'frame' | 'chapter' | 'module';
  createdAt?: string;
  updatedAt?: string;
}

interface DualPaneFrameViewProps {
  frames: AIFrame[];
  onFramesChange: (frames: AIFrame[]) => void;
  isCreationMode: boolean;
  currentFrameIndex: number;
  onFrameIndexChange: (index: number) => void;
  onCreateFrame?: () => void;
}

export default function DualPaneFrameView({
  frames,
  onFramesChange,
  isCreationMode,
  currentFrameIndex,
  onFrameIndexChange,
  onCreateFrame,
}: DualPaneFrameViewProps) {
  const [graphState, setGraphState] = useState<GraphState>({
    nodes: [],
    edges: [],
    selectedNodeId: null,
  });
  const [editingFrameId, setEditingFrameId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AIFrame>>({});
  const [isGraphMaximized, setIsGraphMaximized] = useState(false);
  const [selectedNodeFrameId, setSelectedNodeFrameId] = useState<string | null>(null);

  // Get current frame safely
  const currentFrame = frames[currentFrameIndex];

  // Handle graph changes and sync to linear view
  const handleGraphChange = useCallback((newGraphState: GraphState) => {
    setGraphState(newGraphState);
    
    // Sync selected node to frame navigation
    if (newGraphState.selectedNodeId) {
      const selectedNode = newGraphState.nodes.find(n => n.id === newGraphState.selectedNodeId);
      if (selectedNode?.data?.frameId) {
        setSelectedNodeFrameId(selectedNode.data.frameId);
        
        // Find and navigate to the corresponding frame
        const frameIndex = frames.findIndex(f => f.id === selectedNode.data.frameId);
        if (frameIndex !== -1 && frameIndex !== currentFrameIndex) {
          onFrameIndexChange(frameIndex);
          console.log('🔄 Graph → Frame Navigation sync:', {
            nodeId: newGraphState.selectedNodeId,
            frameId: selectedNode.data.frameId,
            frameIndex
          });
        }
      }
    }
    
    console.log('📊 Dual-pane: Graph state updated');
  }, [frames, currentFrameIndex, onFrameIndexChange]);

  // Sync current frame selection back to graph
  useEffect(() => {
    if (currentFrame && currentFrame.id !== selectedNodeFrameId) {
      // Find the graph node that corresponds to the current frame
      const frameNode = graphState.nodes.find(node => 
        node.data?.frameId === currentFrame.id
      );
      
      if (frameNode) {
        setGraphState(prev => ({
          ...prev,
          selectedNodeId: frameNode.id
        }));
        setSelectedNodeFrameId(currentFrame.id);
        console.log('🔄 Frame Navigation → Graph sync:', {
          frameId: currentFrame.id,
          nodeId: frameNode.id,
          frameIndex: currentFrameIndex
        });
      }
    }
  }, [currentFrame, currentFrameIndex, graphState.nodes, selectedNodeFrameId]);

  // Listen for frame reordering from Frame Navigation and sync to graph
  useEffect(() => {
    const handleFramesReordered = (event: CustomEvent) => {
      const { fromIndex, toIndex, reorderedFrames } = event.detail;
      console.log('🔄 Dual-pane: Frames reordered, updating graph layout:', {
        fromIndex,
        toIndex,
        totalFrames: reorderedFrames.length
      });
      
      // Update frames in dual-pane view
      onFramesChange(reorderedFrames);
      
      // Update graph nodes to reflect new order
      setGraphState(prev => {
        const updatedNodes = prev.nodes.map(node => {
          if (node.data?.type === 'aiframe') {
            const frameIndex = reorderedFrames.findIndex((f: AIFrame) => f.id === node.data.frameId);
            if (frameIndex !== -1) {
              // Update node position to reflect new order
              return {
                ...node,
                position: {
                  ...node.position,
                  x: frameIndex * 500, // Maintain horizontal spacing
                },
                data: {
                  ...node.data,
                  order: frameIndex + 1
                }
              };
            }
          }
          return node;
        });
        
        return {
          ...prev,
          nodes: updatedNodes
        };
      });
    };

    // Listen for Frame Navigation selection and sync to graph
    const handleFrameNavigationSelected = (event: CustomEvent) => {
      const { frameId, frameIndex } = event.detail;
      console.log('🔄 Dual-pane: Frame Navigation selected, syncing to graph:', {
        frameId,
        frameIndex
      });
      
      // Find and select the corresponding graph node
      const frameNode = graphState.nodes.find(node => 
        node.data?.frameId === frameId
      );
      
      if (frameNode) {
        setGraphState(prev => ({
          ...prev,
          selectedNodeId: frameNode.id
        }));
        setSelectedNodeFrameId(frameId);
        console.log('✅ Dual-pane: Graph node selected via Frame Navigation:', {
          nodeId: frameNode.id,
          frameId
        });
      }
    };

    // Listen for clear all frames event and reset graph
    const handleClearAllFrames = (event: CustomEvent) => {
      const { clearedCount } = event.detail;
      console.log('🗑️ Dual-pane: Clear all frames event received, clearing graph:', {
        clearedCount
      });
      
      // Clear graph state
      setGraphState({
        nodes: [],
        edges: [],
        selectedNodeId: null,
      });
      
      // Reset selection state
      setSelectedNodeFrameId(null);
      setEditingFrameId(null);
      setEditData({});
      
      console.log('✅ Dual-pane: Graph cleared successfully');
    };

    window.addEventListener('frames-reordered', handleFramesReordered as EventListener);
    window.addEventListener('frame-navigation-selected', handleFrameNavigationSelected as EventListener);
    window.addEventListener('clear-all-frames', handleClearAllFrames as EventListener);
    
    return () => {
      window.removeEventListener('frames-reordered', handleFramesReordered as EventListener);
      window.removeEventListener('frame-navigation-selected', handleFrameNavigationSelected as EventListener);
      window.removeEventListener('clear-all-frames', handleClearAllFrames as EventListener);
    };
  }, [onFramesChange, graphState.nodes]);

  // Handle frame updates from either view
  const handleFrameUpdate = useCallback((frameId: string, updatedData: Partial<AIFrame>) => {
    const updatedFrames = frames.map(frame => 
      frame.id === frameId 
        ? { ...frame, ...updatedData, updatedAt: new Date().toISOString() }
        : frame
    );
    onFramesChange(updatedFrames);
    console.log('🔄 Dual-pane: Frame updated', { frameId, updatedData });
  }, [frames, onFramesChange]);

  // Convert seconds to MM:SS format
  const secondsToTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Convert MM:SS format to seconds
  const timestampToSeconds = (timestamp: string): number => {
    const [minutes, seconds] = timestamp.split(':').map(num => parseInt(num) || 0);
    return minutes * 60 + seconds;
  };

  // Handle editing frame in linear view
  const handleEditFrame = (frame: AIFrame) => {
    setEditingFrameId(frame.id);
    setEditData({
      title: frame.title,
      goal: frame.goal,
      informationText: frame.informationText,
      afterVideoText: frame.afterVideoText,
    });
  };

  const handleSaveEdit = () => {
    if (editingFrameId && editData) {
      handleFrameUpdate(editingFrameId, editData);
      setEditingFrameId(null);
      setEditData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingFrameId(null);
    setEditData({});
  };

  // Extract video ID for thumbnail
  const extractVideoId = (url: string) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Handle attachment updates
  const handleAttachmentUpdate = (frameId: string, attachmentData: any) => {
    const updatedFrames = frames.map(frame => 
      frame.id === frameId 
        ? { 
            ...frame, 
            attachment: attachmentData,
            // Update legacy fields for backward compatibility
            ...(attachmentData?.type === 'video' && {
              videoUrl: attachmentData.data.videoUrl,
              startTime: attachmentData.data.startTime,
              duration: attachmentData.data.duration
            }),
            updatedAt: new Date().toISOString()
          }
        : frame
    );
    onFramesChange(updatedFrames);
  };

  // Get video content from either attachment or legacy fields
  const getVideoContent = (frame: AIFrame) => {
    if (frame.attachment?.type === 'video') {
      return {
        videoUrl: frame.attachment.data?.videoUrl,
        startTime: frame.attachment.data?.startTime || 0,
        duration: frame.attachment.data?.duration || 300,
        title: frame.attachment.data?.title || 'Video Content'
      };
    } else if (frame.videoUrl) {
      return {
        videoUrl: frame.videoUrl,
        startTime: frame.startTime || 0,
        duration: frame.duration || 300,
        title: 'Video Content'
      };
    }
    return null;
  };

  return (
    <div className="flex h-full">
      {/* LEFT PANE: Graph View */}
      <div className={`${isGraphMaximized ? 'w-full' : 'w-1/2'} border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Graph View</h3>
                <Badge variant="outline">
                  {frames.length} frame{frames.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsGraphMaximized(!isGraphMaximized)}
                  title={isGraphMaximized ? "Show Linear View" : "Maximize Graph View"}
                >
                  {isGraphMaximized ? (
                    <>
                      <Minimize2 className="h-4 w-4 mr-2" />
                      Split View
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Maximize
                    </>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag and connect frames visually • {isGraphMaximized ? 'Maximized' : 'Split view'}
            </p>
          </div>
          <div className="flex-1">
            <EnhancedLearningGraph
              mode={isCreationMode ? "creator" : "learner"}
              frames={frames}
              onFramesChange={onFramesChange}
              onGraphChange={handleGraphChange}
              initialGraphState={graphState}
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Linear View */}
      {!isGraphMaximized && (
        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Linear View</h3>
              </div>
              <div className="flex items-center gap-2">
                {frames.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFrameIndexChange(Math.max(0, currentFrameIndex - 1))}
                      disabled={currentFrameIndex === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Badge variant="default">
                      {currentFrameIndex + 1} of {frames.length}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFrameIndexChange(Math.min(frames.length - 1, currentFrameIndex + 1))}
                      disabled={currentFrameIndex === frames.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Edit and navigate frames sequentially • Synced with graph selection
            </p>
          </div>

          <ScrollArea className="flex-1 p-4">
            {frames.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    No Frames Yet
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Create your first AI frame in the graph view or use the create button
                  </p>
                  {onCreateFrame && (
                    <Button onClick={onCreateFrame}>
                      Create Frame
                    </Button>
                  )}
                </div>
              </div>
            ) : currentFrame ? (
              <div className="space-y-6">
                {/* Frame Header */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Frame {currentFrame.order || currentFrameIndex + 1}</Badge>
                        {currentFrame.isGenerated && (
                          <Badge variant="outline">AI Generated</Badge>
                        )}
                        {selectedNodeFrameId === currentFrame.id && (
                          <Badge variant="default" className="bg-purple-500">
                            <Network className="h-3 w-3 mr-1" />
                            Selected in Graph
                          </Badge>
                        )}
                      </div>
                      {isCreationMode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditFrame(currentFrame)}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                    <CardTitle className="text-xl">
                      {editingFrameId === currentFrame.id ? (
                        <Input
                          value={editData.title || ''}
                          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                          className="text-xl font-semibold"
                        />
                      ) : (
                        currentFrame.title
                      )}
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* Learning Goal */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="h-4 w-4 text-blue-600" />
                      Learning Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editingFrameId === currentFrame.id ? (
                      <Textarea
                        value={editData.goal || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, goal: e.target.value }))}
                        className="min-h-16"
                      />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {currentFrame.goal}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Information Text */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen className="h-4 w-4 text-green-600" />
                      Context & Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editingFrameId === currentFrame.id ? (
                      <Textarea
                        value={editData.informationText || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, informationText: e.target.value }))}
                        className="min-h-24"
                      />
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {currentFrame.informationText.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-3 leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Video Content - Enhanced to show both attachment and legacy */}
                {(() => {
                  const videoContent = getVideoContent(currentFrame);
                  if (videoContent) {
                    return (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Video className="h-4 w-4 text-red-600" />
                            {videoContent.title}
                            {currentFrame.attachment?.type === 'video' && (
                              <Badge variant="outline" className="text-xs">From Graph Attachment</Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Video Preview */}
                            {videoContent.videoUrl && (
                              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                {(() => {
                                  const videoId = extractVideoId(videoContent.videoUrl);
                                  return videoId ? (
                                    <iframe
                                      src={`https://www.youtube.com/embed/${videoId}?start=${videoContent.startTime}`}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Video className="h-8 w-8 text-gray-400" />
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                            
                            {/* Video Details */}
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <Label className="text-xs font-medium flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Start Time
                                </Label>
                                <p className="mt-1">
                                  {secondsToTimestamp(videoContent.startTime)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs font-medium">Duration</Label>
                                <p className="mt-1">
                                  {secondsToTimestamp(videoContent.duration)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-xs font-medium">End Time</Label>
                                <p className="mt-1">
                                  {secondsToTimestamp(videoContent.startTime + videoContent.duration)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                  return null;
                })()}

                {/* Other Attachment Content (PDF, Text) */}
                {currentFrame.attachment && currentFrame.attachment.type !== 'video' && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {currentFrame.attachment.type === 'pdf' && <File className="h-4 w-4 text-blue-600" />}
                        {currentFrame.attachment.type === 'text' && <FileText className="h-4 w-4 text-green-600" />}
                        {currentFrame.attachment.type === 'pdf' ? 'PDF Document' : 'Text Content'}
                        <Badge variant="outline" className="text-xs">From Graph Attachment</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentFrame.attachment.type === 'pdf' && (
                        <div className="space-y-2">
                          <p className="text-sm"><strong>URL:</strong> {currentFrame.attachment.data?.pdfUrl}</p>
                          <p className="text-sm"><strong>Pages:</strong> {currentFrame.attachment.data?.pages || 'All'}</p>
                        </div>
                      )}
                      
                      {currentFrame.attachment.type === 'text' && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm">
                            {currentFrame.attachment.data?.text}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Key Takeaways */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ArrowRight className="h-4 w-4 text-indigo-600" />
                      Key Takeaways
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editingFrameId === currentFrame.id ? (
                      <Textarea
                        value={editData.afterVideoText || ''}
                        onChange={(e) => setEditData(prev => ({ ...prev, afterVideoText: e.target.value }))}
                        className="min-h-24"
                      />
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {currentFrame.afterVideoText.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-3 leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Edit Controls */}
                {editingFrameId === currentFrame.id && (
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a frame to view details
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
} 