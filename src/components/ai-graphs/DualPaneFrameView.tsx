import React, { useState, useCallback, useEffect, useMemo } from "react";
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
import type { Chapter } from "@/app/ai-frames/types/frames";
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
  Eye,
  Network,
  Layers,
  Plus,
  Split,
  PanelLeft,
  PanelRight
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
  onCreateFrame?: (options?: {
    title?: string;
    goal?: string;
    chapterId?: string;
    selectFrame?: boolean;
  }) => Promise<AIFrame | void> | AIFrame | void;
  defaultMaximized?: boolean; // New prop to control default maximization
  onGetCurrentState?: React.MutableRefObject<(() => GraphState) | null>; // CRITICAL FIX: Get current graph state when needed
  onGraphStateUpdate?: (state: GraphState) => void; // SILENT: Update parent with current graph state
  initialGraphState?: GraphState; // CRITICAL FIX: Re-add initialGraphState prop to restore standalone attachments
  chapters?: Chapter[];
  onChaptersChange?: (chapters: Chapter[]) => void;
}

export default function DualPaneFrameView({
  frames,
  onFramesChange,
  isCreationMode,
  currentFrameIndex,
  onFrameIndexChange,
  onCreateFrame,
  defaultMaximized = false,
  initialGraphState,
  onGetCurrentState,
  onGraphStateUpdate,
  chapters = [],
  onChaptersChange,
}: DualPaneFrameViewProps) {
  const [graphState, setGraphState] = useState<GraphState>(
    initialGraphState || {
      nodes: [],
      edges: [],
      selectedNodeId: null,
    }
  );
  const [editingFrameId, setEditingFrameId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<AIFrame>>({});
  const VIEW_MODE_STORAGE_KEY = "aiFramesDualPaneViewMode";
  const computeInitialViewMode = (): "graph" | "split" | "linear" => {
    const fallback = defaultMaximized ? "graph" : "split";
    if (typeof window === "undefined") {
      return fallback;
    }
    const stored = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    if (stored === "graph" || stored === "split" || stored === "linear") {
      return stored;
    }
    return fallback;
  };
  const [viewMode, setViewMode] = useState<"graph" | "split" | "linear">(computeInitialViewMode);
  const [selectedNodeFrameId, setSelectedNodeFrameId] = useState<string | null>(null);

  // REMOVED: useEffect that was breaking sync system
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, 'connected' | 'disconnected'>>({});

  useEffect(() => {
    if (!frames.length) {
      if (currentFrameIndex !== 0) {
        onFrameIndexChange(0);
      }
      setEditingFrameId(null);
      setEditData({});
      return;
    }

    if (currentFrameIndex < 0 || currentFrameIndex >= frames.length) {
      const clamped = currentFrameIndex < 0 ? 0 : frames.length - 1;
      onFrameIndexChange(clamped);
    }
  }, [frames.length, frames, currentFrameIndex, onFrameIndexChange]);

  // Get current frame safely
  const clampedFrameIndex = useMemo(() => {
    if (!frames.length) return 0;
    if (currentFrameIndex < 0) return 0;
    if (currentFrameIndex >= frames.length) return frames.length - 1;
    return currentFrameIndex;
  }, [frames.length, currentFrameIndex]);

  const currentFrame = frames[clampedFrameIndex] || null;

  // CRITICAL FIX: Setup callback to provide current graph state when requested
  const getCurrentGraphState = useCallback(() => {
    return graphState;
  }, [graphState]);

  // CRITICAL FIX: Set the ref in parent component
  useEffect(() => {
    if (onGetCurrentState) {
      onGetCurrentState.current = getCurrentGraphState;
    }
  }, [onGetCurrentState, getCurrentGraphState]);

  // CRITICAL FIX: Update graph state when initialGraphState changes
  useEffect(() => {
    if (initialGraphState && initialGraphState.nodes && initialGraphState.nodes.length > 0) {
      // CRITICAL FIX: Only update if state actually changed to prevent loops
      const stateChanged = JSON.stringify(graphState) !== JSON.stringify(initialGraphState);
      
      if (stateChanged) {
        setGraphState(initialGraphState);
        
        // CRITICAL: Also notify parent of the updated state
        if (onGraphStateUpdate) {
          onGraphStateUpdate(initialGraphState);
        }
      }
    }
  }, [initialGraphState]); // Remove onGraphStateUpdate from deps to prevent loops

  // CRITICAL FIX: Track if we're in a sync operation to prevent circular updates
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Handle graph changes and sync to linear view
  const handleGraphChange = useCallback((newGraphState: GraphState) => {
    // CRITICAL: Prevent circular sync during save operations
    if (isSyncing) {
      return;
    }
    
    setGraphState(newGraphState);
    
    // SILENT: Update parent with current graph state (no logging)
    if (onGraphStateUpdate) {
      onGraphStateUpdate(newGraphState);
    }
    
    // Sync selected node to frame navigation
    if (newGraphState.selectedNodeId) {
      const selectedNode = newGraphState.nodes.find(n => n.id === newGraphState.selectedNodeId);
      if (selectedNode?.data?.frameId) {
        setSelectedNodeFrameId(selectedNode.data.frameId);
        
        // Find and navigate to the corresponding frame
        const frameIndex = frames.findIndex(f => f.id === selectedNode.data.frameId);
        if (frameIndex !== -1 && frameIndex !== currentFrameIndex) {
          // CRITICAL: Set syncing flag to prevent circular updates
          setIsSyncing(true);
          onFrameIndexChange(frameIndex);
          // Reset sync flag after a short delay
          setTimeout(() => setIsSyncing(false), 100);
        }
      }
    }
  }, [frames, currentFrameIndex, onFrameIndexChange, onGraphStateUpdate, isSyncing]);

  // CRITICAL FIX: Add save operation tracking to prevent circular sync
  const [recentSaveTimestamp, setRecentSaveTimestamp] = useState<number>(0);
  
  // Listen for save operations to prevent immediate sync conflicts
  useEffect(() => {
    const handleSaveSuccess = () => {
      setRecentSaveTimestamp(Date.now());
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('unified-save-success', handleSaveSuccess);
      window.addEventListener('graph-saved', handleSaveSuccess);
      
      return () => {
        window.removeEventListener('unified-save-success', handleSaveSuccess);
        window.removeEventListener('graph-saved', handleSaveSuccess);
      };
    }
  }, []);

  // Sync current frame selection back to graph (with save conflict prevention)
  useEffect(() => {
    // CRITICAL FIX: Skip sync for 2 seconds after save operations to prevent corruption
    const timeSinceLastSave = Date.now() - recentSaveTimestamp;
    const shouldSkipSync = timeSinceLastSave < 2000; // 2 second cooldown
    
    if (currentFrame && currentFrame.id !== selectedNodeFrameId && !shouldSkipSync) {
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
        // console.log('🔄 Frame Navigation → Graph sync:', {
        //   frameId: currentFrame.id,
        //   nodeId: frameNode.id,
        //   frameIndex: currentFrameIndex
        // });
      }
    } else if (shouldSkipSync && currentFrame) {
      // During cooldown, just update the selected frame ID without triggering graph changes
      setSelectedNodeFrameId(currentFrame.id);
    }
  }, [currentFrame, currentFrameIndex, graphState.nodes, selectedNodeFrameId, recentSaveTimestamp]);

  // Listen for frame reordering from Frame Navigation and sync to graph
  useEffect(() => {
    const handleFramesReordered = (event: CustomEvent) => {
      const { fromIndex, toIndex, reorderedFrames } = event.detail;
      // console.log('🔄 Dual-pane: Frames reordered, updating graph layout:', {
      //   fromIndex,
      //   toIndex,
      //   totalFrames: reorderedFrames.length
      // });
      
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
      // console.log('🔄 Dual-pane: Frame Navigation selected, syncing to graph:', {
      //   frameId,
      //   frameIndex
      // });
      
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
        // console.log('✅ Dual-pane: Graph node selected via Frame Navigation:', {
        //   nodeId: frameNode.id,
        //   frameId
        // });
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
      
      // Update parent with cleared state
      if (onGraphStateUpdate) {
        onGraphStateUpdate({
          nodes: [],
          edges: [],
          selectedNodeId: null,
        });
      }
    };

    // Listen for individual frame edits and sync to graph
    const handleFrameEdited = (event: CustomEvent) => {
      const { frameId, frame } = event.detail;
      // console.log('🔄 Dual-pane: Frame edited event received, syncing to graph:', {
      //   frameId,
      //   frameName: frame.title
      // });
      
      // Update the specific frame in the frames array
      const updatedFrames = frames.map(f => 
        f.id === frameId 
          ? { ...frame, updatedAt: new Date().toISOString() }
          : f
      );
      onFramesChange(updatedFrames);
      
      // Update graph nodes to reflect the changes
      setGraphState(prev => {
        const updatedNodes = prev.nodes.map(node => {
          if (node.data?.frameId === frameId) {
            return {
              ...node,
              data: {
                ...node.data,
                title: frame.title,
                goal: frame.goal,
                informationText: frame.informationText,
                afterVideoText: frame.afterVideoText,
                aiConcepts: frame.aiConcepts,
                videoUrl: frame.videoUrl,
                startTime: frame.startTime,
                duration: frame.duration,
              }
            };
          }
          return node;
        });
        
        return {
          ...prev,
          nodes: updatedNodes
        };
      });
      
      // 
    };

    // Connection status handlers
    const handleConnectionAdded = (event: CustomEvent) => {
      const { connection } = event.detail;
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: 'connected'
      }));
      // 
    };

    const handleConnectionRemoved = (event: CustomEvent) => {
      const { connection } = event.detail;
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: 'disconnected'
      }));
      // 
    };

    window.addEventListener('frames-reordered', handleFramesReordered as EventListener);
    window.addEventListener('frame-navigation-selected', handleFrameNavigationSelected as EventListener);
    window.addEventListener('clear-all-frames', handleClearAllFrames as EventListener);
    window.addEventListener('frame-edited', handleFrameEdited as EventListener);
    window.addEventListener('graph-connection-added', handleConnectionAdded as EventListener);
    window.addEventListener('graph-connection-removed', handleConnectionRemoved as EventListener);
    
    return () => {
      window.removeEventListener('frames-reordered', handleFramesReordered as EventListener);
      window.removeEventListener('frame-navigation-selected', handleFrameNavigationSelected as EventListener);
      window.removeEventListener('clear-all-frames', handleClearAllFrames as EventListener);
      window.removeEventListener('frame-edited', handleFrameEdited as EventListener);
      window.removeEventListener('graph-connection-added', handleConnectionAdded as EventListener);
      window.removeEventListener('graph-connection-removed', handleConnectionRemoved as EventListener);
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
    // 
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

  const sortedChapters = useMemo(() => {
    return [...chapters]
      .map((chapter) => ({
        ...chapter,
        frameIds: chapter.frameIds || [],
        conceptIds: chapter.conceptIds || [],
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [chapters]);

  const currentChapter = useMemo(() => {
    if (!currentFrame) return null;
    return sortedChapters.find((chapter) => chapter.frameIds.includes(currentFrame.id)) || null;
  }, [sortedChapters, currentFrame]);

  const linearTopology = useMemo(() => {
    const framesMap = new Map(frames.map((frame) => [frame.id, frame]));
    const assignedFrameIds = new Set<string>();
    const chapterMap = new Map(sortedChapters.map((chapter) => [chapter.id, chapter]));

    if (sortedChapters.length === 0) {
      return {
        connectedGroups: [] as Array<{ id: string; connected: boolean; chapters: ChapterLinearEntry[] }>,
        standaloneChapters: [] as ChapterLinearEntry[],
        orphanFrames: frames,
      };
    }

    const nodes = graphState?.nodes || [];
    const edges = graphState?.edges || [];
    const chapterNodeLookup = new Map<string, string>();

    nodes.forEach((node) => {
      if (node?.type === 'chapter') {
        const chapterId = node.data?.id || node.id;
        if (chapterMap.has(chapterId)) {
          chapterNodeLookup.set(node.id, chapterId);
        }
      }
    });

    const connectionMap = new Map<string, { incoming: Set<string>; outgoing: Set<string> }>();
    sortedChapters.forEach((chapter) => {
      connectionMap.set(chapter.id, {
        incoming: new Set(),
        outgoing: new Set(),
      });
    });

    edges.forEach((edge) => {
      const sourceChapter = chapterNodeLookup.get(edge.source);
      const targetChapter = chapterNodeLookup.get(edge.target);
      if (!sourceChapter || !targetChapter || sourceChapter === targetChapter) {
        return;
      }

      const sourceEntry = connectionMap.get(sourceChapter);
      const targetEntry = connectionMap.get(targetChapter);

      if (sourceEntry && targetEntry) {
        sourceEntry.outgoing.add(targetChapter);
        targetEntry.incoming.add(sourceChapter);
      }
    });

    const adjacency = new Map<string, Set<string>>();
    sortedChapters.forEach((chapter) => {
      adjacency.set(chapter.id, new Set());
    });

    edges.forEach((edge) => {
      const sourceChapter = chapterNodeLookup.get(edge.source);
      const targetChapter = chapterNodeLookup.get(edge.target);
      if (!sourceChapter || !targetChapter || sourceChapter === targetChapter) {
        return;
      }
      adjacency.get(sourceChapter)?.add(targetChapter);
      adjacency.get(targetChapter)?.add(sourceChapter);
    });

    const visited = new Set<string>();
    const groups: Array<{ id: string; connected: boolean; chapters: ChapterLinearEntry[] }> = [];

    sortedChapters.forEach((chapter) => {
      if (visited.has(chapter.id)) {
        return;
      }

      const originChapterId = chapter.id;
      const queue: string[] = [originChapterId];
      const component: string[] = [];
      let hasConnection = false;

      while (queue.length) {
        const current = queue.shift()!;
        if (visited.has(current)) {
          continue;
        }
        visited.add(current);
        component.push(current);

        const neighbors = adjacency.get(current);
        if (neighbors && neighbors.size > 0) {
          hasConnection = true;
          neighbors.forEach((neighbor) => {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          });
        }
      }

      component.forEach((id) => {
        const entry = connectionMap.get(id);
        if (entry && (entry.incoming.size > 0 || entry.outgoing.size > 0)) {
          hasConnection = true;
        }
      });

      const localIds = new Set(component);
      let orderedIds: string[] = [];

      if (hasConnection) {
        const inDegree = new Map<string, number>();
        const outgoing = new Map<string, Set<string>>();

        component.forEach((id) => {
          const entry = connectionMap.get(id);
          const outgoingTargets = new Set(
            Array.from(entry?.outgoing || []).filter((target) => localIds.has(target))
          );
          outgoing.set(id, outgoingTargets);
          const incomingCount = Array.from(entry?.incoming || []).filter((source) => localIds.has(source)).length;
          inDegree.set(id, incomingCount);
        });

        const topoQueue: string[] = Array.from(inDegree.entries())
          .filter(([, degree]) => degree === 0)
          .map(([id]) => id);

        const topoVisited = new Set<string>();
        while (topoQueue.length) {
          const nodeId = topoQueue.shift()!;
          orderedIds.push(nodeId);
          topoVisited.add(nodeId);

          outgoing.get(nodeId)?.forEach((target) => {
            const nextDegree = (inDegree.get(target) || 0) - 1;
            inDegree.set(target, nextDegree);
            if (nextDegree === 0) {
              topoQueue.push(target);
            }
          });
        }

        if (orderedIds.length !== component.length) {
          orderedIds = [...component].sort((a, b) => {
            const aOrder = chapterMap.get(a)?.order ?? 0;
            const bOrder = chapterMap.get(b)?.order ?? 0;
            return aOrder - bOrder;
          });
        }
      } else {
        orderedIds = [...component].sort((a, b) => {
          const aOrder = chapterMap.get(a)?.order ?? 0;
          const bOrder = chapterMap.get(b)?.order ?? 0;
          return aOrder - bOrder;
        });
      }

      const chaptersForGroup: ChapterLinearEntry[] = orderedIds
        .map((id) => {
          const chapterData = chapterMap.get(id);
          if (!chapterData) {
            return null;
          }
          const connection = connectionMap.get(id) || {
            incoming: new Set<string>(),
            outgoing: new Set<string>(),
          };

          const chapterFrames = (chapterData.frameIds || [])
            .map((frameId) => {
              const frame = framesMap.get(frameId);
              if (frame) {
                assignedFrameIds.add(frame.id);
              }
              return frame;
            })
            .filter((frame): frame is AIFrame => Boolean(frame));

          return {
            chapter: chapterData,
            frames: chapterFrames,
            incoming: connection.incoming.size,
            outgoing: connection.outgoing.size,
          } as ChapterLinearEntry;
        })
        .filter(Boolean) as ChapterLinearEntry[];

      groups.push({
        id: orderedIds[0] || originChapterId,
        connected: hasConnection,
        chapters: chaptersForGroup,
      });
    });

    const connectedGroups = groups
      .filter((group) => group.connected)
      .sort((a, b) => {
        const aOrder = Math.min(
          ...a.chapters.map((entry) => entry.chapter.order ?? Number.MAX_SAFE_INTEGER)
        );
        const bOrder = Math.min(
          ...b.chapters.map((entry) => entry.chapter.order ?? Number.MAX_SAFE_INTEGER)
        );
        return aOrder - bOrder;
      });

    const standaloneChapters = groups
      .filter((group) => !group.connected)
      .flatMap((group) => group.chapters)
      .sort((a, b) => (a.chapter.order ?? 0) - (b.chapter.order ?? 0));

    const orphanFrames = frames.filter((frame) => !assignedFrameIds.has(frame.id));

    return { connectedGroups, standaloneChapters, orphanFrames };
  }, [frames, graphState, sortedChapters]);

  const navigateToFrame = useCallback(
    (frameId: string) => {
      if (!frameId) return;
      const index = frames.findIndex((frame) => frame.id === frameId);
      if (index !== -1) {
        onFrameIndexChange(index);
      }
    },
    [frames, onFrameIndexChange]
  );

  const handleCreateFrameClick = useCallback(() => {
    if (!onCreateFrame) return;
    const result = onCreateFrame();
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      (result as Promise<unknown>).catch((error) => {
        console.error('Failed to create frame from linear view:', error);
      });
    }
  }, [onCreateFrame]);

  const { connectedGroups, standaloneChapters, orphanFrames } = linearTopology;
  const hasChapters = sortedChapters.length > 0;
  const hasFrames = frames.length > 0;

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

  const renderViewToggle = () => (
    <div className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1">
      <Button
        variant={viewMode === "graph" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("graph")}
        className="h-7 px-2"
        title="Maximize graph view"
      >
        <PanelLeft className="h-3 w-3 mr-1" />
        Graph
      </Button>
      <Button
        variant={viewMode === "split" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("split")}
        className="h-7 px-2"
        title="Show split view"
      >
        <Split className="h-3 w-3 mr-1" />
        Split
      </Button>
      <Button
        variant={viewMode === "linear" ? "default" : "ghost"}
        size="sm"
        onClick={() => setViewMode("linear")}
        className="h-7 px-2"
        title="Maximize linear view"
      >
        <PanelRight className="h-3 w-3 mr-1" />
        Linear
      </Button>
    </div>
  );
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
  }, [viewMode]);

  const graphPaneClasses =
    viewMode === "graph"
      ? "w-full"
      : viewMode === "split"
        ? "w-1/2"
        : "w-0 hidden lg:flex";

  const linearPaneClasses =
    viewMode === "linear"
      ? "w-full"
      : viewMode === "split"
        ? "w-1/2"
        : "hidden";

  return (
    <div className="flex h-full">
      {/* LEFT PANE: Graph View */}
      <div className={`${graphPaneClasses} border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}>
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
                {renderViewToggle()}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {viewMode === "linear"
                ? 'Graph hidden (linear view maximized)'
                : `Drag and connect frames visually • ${viewMode === "graph" ? "Maximized" : "Split view"}`}
            </p>
          </div>
          <div className={`flex-1 ${viewMode === "linear" ? "hidden" : ""}`}>
            <EnhancedLearningGraph
              mode={isCreationMode ? "creator" : "learner"}
              frames={frames}
              chapters={chapters}
              onFramesChange={onFramesChange}
              onChaptersChange={onChaptersChange}
              onGraphChange={handleGraphChange}
              initialGraphState={graphState}
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Linear View */}
      {viewMode !== "graph" && (
        <div className={`${linearPaneClasses} flex flex-col`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <Eye className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Linear View</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end">
                {renderViewToggle()}
                {onCreateFrame && (
                  <Button
                    size="sm"
                    onClick={handleCreateFrameClick}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    New Frame
                  </Button>
                )}
                {hasFrames && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFrameIndexChange(Math.max(0, clampedFrameIndex - 1))}
                      disabled={clampedFrameIndex === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Badge variant="default">
                      {clampedFrameIndex + 1} of {frames.length}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFrameIndexChange(Math.min(frames.length - 1, clampedFrameIndex + 1))}
                      disabled={clampedFrameIndex === frames.length - 1}
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
            {!hasFrames && !hasChapters ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Nothing to show yet
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Add a chapter from the graph or create a frame to start building the journey.
                  </p>
                  {onCreateFrame && (
                    <Button onClick={handleCreateFrameClick} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Frame
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
{hasChapters && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Layers className="h-4 w-4 text-orange-500" />
                      Chapter Overview
                    </CardTitle>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Track sequencing and frame assignments without leaving the linear view.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {connectedGroups.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                        Connected Sequences
                      </h4>
                      <div className="space-y-3">
                        {connectedGroups.map((group, groupIndex) => {
                          const frameCount = group.chapters.reduce((total, entry) => total + entry.frames.length, 0);
                          return (
                            <div
                              key={group.id}
                              className="rounded-lg border border-orange-200/80 dark:border-orange-800/60 bg-orange-50/60 dark:bg-orange-900/10 p-3 space-y-3"
                            >
                              <div className="flex items-center justify-between text-xs text-orange-700 dark:text-orange-200">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="border-orange-300 text-orange-600 dark:border-orange-700 dark:text-orange-300">
                                    Sequence {groupIndex + 1}
                                  </Badge>
                                  <span>{group.chapters.length} chapter{group.chapters.length === 1 ? '' : 's'}</span>
                                </div>
                                <span>{frameCount} frame{frameCount === 1 ? '' : 's'}</span>
                              </div>
                              <div className="space-y-3">
                                {group.chapters.map((entry, entryIndex) => {
                                  const isActiveChapter = currentChapter?.id === entry.chapter.id;
                                  const sequenceLabel = `${groupIndex + 1}.${entryIndex + 1}`;
                                  return (
                                    <div
                                      key={entry.chapter.id}
                                      className={`rounded-lg border p-3 transition-colors ${
                                        isActiveChapter
                                          ? 'border-orange-300 bg-white dark:border-orange-700/80 dark:bg-orange-900/20'
                                          : 'border-orange-200/60 bg-white dark:border-orange-800/40 dark:bg-orange-950/40'
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Badge variant="secondary">{sequenceLabel}</Badge>
                                            <span className="font-medium text-sm text-gray-800 dark:text-gray-100">
                                              {entry.chapter.title}
                                            </span>
                                            {isActiveChapter && (
                                              <Badge variant="default" className="bg-orange-500 text-white">
                                                Active
                                              </Badge>
                                            )}
                                          </div>
                                          {entry.chapter.description && (
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                              {entry.chapter.description}
                                            </p>
                                          )}
                                          <div className="flex flex-wrap gap-2">
                                            {entry.frames.length > 0 ? (
                                              entry.frames.map((frame) => {
                                                const isActiveFrame = currentFrame?.id === frame.id;
                                                return (
                                                  <Button
                                                    key={frame.id}
                                                    size="xs"
                                                    variant={isActiveFrame ? 'default' : 'outline'}
                                                    onClick={() => navigateToFrame(frame.id)}
                                                    className="flex items-center gap-1"
                                                  >
                                                    <Play className="h-3 w-3" />
                                                    {frame.title || 'Untitled Frame'}
                                                  </Button>
                                                );
                                              })
                                            ) : (
                                              <span className="text-xs italic text-gray-500 dark:text-gray-400">
                                                No frames attached
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                                          <span>Incoming: {entry.incoming}</span>
                                          <span>Outgoing: {entry.outgoing}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {standaloneChapters.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                        Standalone Chapters
                      </h4>
                      <div className="space-y-2">
                        {standaloneChapters.map((entry) => {
                          const isActiveChapter = currentChapter?.id === entry.chapter.id;
                          return (
                            <div
                              key={entry.chapter.id}
                              className={`rounded-lg border p-3 transition-colors ${
                                isActiveChapter
                                  ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">{(entry.chapter.order ?? 0) + 1}</Badge>
                                  <span className="font-medium text-sm text-gray-800 dark:text-gray-100">
                                    {entry.chapter.title}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {entry.frames.length} frame{entry.frames.length === 1 ? '' : 's'}
                                </span>
                              </div>
                              {entry.chapter.description && (
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                  {entry.chapter.description}
                                </p>
                              )}
                              <div className="mt-2 flex flex-wrap gap-2">
                                {entry.frames.length > 0 ? (
                                  entry.frames.map((frame) => {
                                    const isActiveFrame = currentFrame?.id === frame.id;
                                    return (
                                      <Button
                                        key={frame.id}
                                        size="xs"
                                        variant={isActiveFrame ? 'default' : 'outline'}
                                        onClick={() => navigateToFrame(frame.id)}
                                        className="flex items-center gap-1"
                                      >
                                        <Play className="h-3 w-3" />
                                        {frame.title || 'Untitled Frame'}
                                      </Button>
                                    );
                                  })
                                ) : (
                                  <span className="text-xs italic text-gray-500 dark:text-gray-400">
                                    No frames attached
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {connectedGroups.length === 0 && standaloneChapters.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Chapters will appear here once you add them from the graph or sidebar.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
{orphanFrames.length > 0 && (
              <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  Ungrouped Frames
                </CardTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Frames currently not linked to a chapter.
                </p>
              </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {orphanFrames.map((frame) => {
                      const isActiveFrame = currentFrame?.id === frame.id;
                      return (
                        <Button
                          key={frame.id}
                          size="sm"
                          variant={isActiveFrame ? 'default' : 'outline'}
                          onClick={() => navigateToFrame(frame.id)}
                          className="flex items-center gap-2"
                        >
                          <Play className="h-4 w-4" />
                          {frame.title || 'Untitled Frame'}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
{hasChapters && !hasFrames && (
              <Card>
                <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Chapters are ready, but no frames are attached yet.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Create a frame here or drag one in the graph to start linking your content.
                    </p>
                  </div>
                  {onCreateFrame && (
                    <Button onClick={handleCreateFrameClick} className="w-full md:w-auto flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create First Frame
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
                {hasFrames ? (
                  currentFrame ? (
                    <>
                {/* Frame Header */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Frame {currentFrame.order || clampedFrameIndex + 1}</Badge>
                        {currentFrame.isGenerated && (
                          <Badge variant="outline">AI Generated</Badge>
                        )}
                        {selectedNodeFrameId === currentFrame.id && (
                          <Badge variant="default" className="bg-purple-500">
                            <Network className="h-3 w-3 mr-1" />
                            Selected in Graph
                          </Badge>
                        )}
                        {currentChapter ? (
                          <Badge variant="outline" className="text-orange-600 border-orange-300 dark:border-orange-700">
                            {currentChapter.title}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            Unassigned
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
              </>
                  ) : (
                    <Card>
                    <CardContent className="text-center text-gray-500 dark:text-gray-400 py-8">
                      Select a frame to view details
                    </CardContent>
                  </Card>
                  )
                ) : null}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
} 
