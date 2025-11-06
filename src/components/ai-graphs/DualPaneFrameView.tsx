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
  PanelRight,
  Brain
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

interface ChapterLinearEntry {
  chapter: Chapter;
  frames: AIFrame[];
  incoming: number;
  outgoing: number;
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

  // Navigation mode state: 'chapter' shows position within current chapter, 'frame' shows position in all frames
  const NAV_MODE_STORAGE_KEY = "aiFramesNavigationMode";
  const computeInitialNavMode = (): "chapter" | "frame" => {
    if (typeof window === "undefined") {
      // Smart default: chapter mode if chapters exist, else frame mode
      return chapters.length > 0 ? "chapter" : "frame";
    }
    const stored = window.localStorage.getItem(NAV_MODE_STORAGE_KEY);
    if (stored === "chapter" || stored === "frame") {
      return stored;
    }
    // Smart default: chapter mode if chapters exist, else frame mode
    return chapters.length > 0 ? "chapter" : "frame";
  };
  const [navigationMode, setNavigationMode] = useState<"chapter" | "frame">(computeInitialNavMode);

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

    const nodes = graphState?.nodes || [];
    const edges = graphState?.edges || [];
    const chapterNodeLookup = new Map<string, string>();
    const frameNodeLookup = new Map<string, string>(); // Map node IDs to frame IDs

    nodes.forEach((node) => {
      if (node?.type === 'chapter') {
        const chapterId = node.data?.id || node.id;
        if (chapterMap.has(chapterId)) {
          chapterNodeLookup.set(node.id, chapterId);
        }
      } else if (node?.type === 'aiframe') {
        const frameId = node.data?.frameId || node.data?.id || node.id;
        if (framesMap.has(frameId)) {
          frameNodeLookup.set(node.id, frameId);
        }
      }
    });

    // Build directed frame edges (source -> target)
    const frameOutgoing = new Map<string, Set<string>>();
    const frameIncoming = new Map<string, Set<string>>();
    frames.forEach(frame => {
      frameOutgoing.set(frame.id, new Set());
      frameIncoming.set(frame.id, new Set());
    });

    edges.forEach((edge) => {
      const sourceFrameId = frameNodeLookup.get(edge.source);
      const targetFrameId = frameNodeLookup.get(edge.target);

    if (sourceFrameId && targetFrameId) {
      frameOutgoing.get(sourceFrameId)?.add(targetFrameId);
      frameIncoming.get(targetFrameId)?.add(sourceFrameId);
    }
  });

    const frameRelations = new Map<string, { sequential: boolean; verticalChapters: string[] }>();
    frames.forEach(frame => {
      const incomingSize = frameIncoming.get(frame.id)?.size ?? 0;
      const outgoingSize = frameOutgoing.get(frame.id)?.size ?? 0;
      frameRelations.set(frame.id, {
        sequential: incomingSize > 0 || outgoingSize > 0,
        verticalChapters: [],
      });
    });

    // Find cascade chains starting from root frames (frames with no incoming edges from other frames)
    const frameCascadeGroups: string[][] = [];
    const frameToGroupIndex = new Map<string, number>();
    const assignedToGroup = new Set<string>();

    frames.forEach(frame => {
      if (assignedToGroup.has(frame.id)) return;

      const incomingFrames = frameIncoming.get(frame.id);
      const outgoingFrames = frameOutgoing.get(frame.id);
      const hasIncoming = incomingFrames && incomingFrames.size > 0;
      const hasOutgoing = outgoingFrames && outgoingFrames.size > 0;

      // Isolated frame (no connections at all) - create single-frame group
      if (!hasIncoming && !hasOutgoing) {
        const groupIndex = frameCascadeGroups.length;
        frameCascadeGroups.push([frame.id]);
        frameToGroupIndex.set(frame.id, groupIndex);
        assignedToGroup.add(frame.id);
        return;
      }

      // Root frame in a cascade chain (has outgoing but no incoming)
      if (!hasIncoming && hasOutgoing) {
        // Follow the cascade chain forward
        const cascade: string[] = [];
        const queue = [frame.id];
        const visited = new Set<string>();

        while (queue.length > 0) {
          const currentId = queue.shift()!;
          if (visited.has(currentId)) continue;

          visited.add(currentId);
          cascade.push(currentId);
          assignedToGroup.add(currentId);

          const outgoing = frameOutgoing.get(currentId);
          if (outgoing) {
            outgoing.forEach(targetId => {
              if (!visited.has(targetId)) {
                queue.push(targetId);
              }
            });
          }
        }

        if (cascade.length > 0) {
          const groupIndex = frameCascadeGroups.length;
          frameCascadeGroups.push(cascade);
          cascade.forEach(frameId => {
            frameToGroupIndex.set(frameId, groupIndex);
          });
        }
      }
    });

    // Handle frames that are part of cycles or weren't caught (middle of chain but disconnected)
    frames.forEach(frame => {
      if (!assignedToGroup.has(frame.id)) {
        const groupIndex = frameCascadeGroups.length;
        frameCascadeGroups.push([frame.id]);
        frameToGroupIndex.set(frame.id, groupIndex);
      }
    });

    // Detect chapter-to-frame connections from graph edges
    const chapterToFrameEdges = new Map<string, Set<string>>();
    sortedChapters.forEach(chapter => {
      chapterToFrameEdges.set(chapter.id, new Set());
    });

    edges.forEach((edge) => {
      const sourceChapterId = chapterNodeLookup.get(edge.source);
      const targetFrameId = frameNodeLookup.get(edge.target);

      if (sourceChapterId && targetFrameId) {
        // Chapter connects to frame
        chapterToFrameEdges.get(sourceChapterId)?.add(targetFrameId);
      }
    });

    const frameVerticalMap = new Map<string, Set<string>>();
    sortedChapters.forEach(chapter => {
      const relatedFrames = new Set<string>([
        ...(chapter.frameIds || []),
        ...(chapterToFrameEdges.get(chapter.id) || []),
      ]);
      relatedFrames.forEach(frameId => {
        if (!frameVerticalMap.has(frameId)) {
          frameVerticalMap.set(frameId, new Set());
        }
        frameVerticalMap.get(frameId)!.add(chapter.id);
      });
    });

    frameVerticalMap.forEach((chaptersSet, frameId) => {
      const relation = frameRelations.get(frameId);
      const verticalList = Array.from(chaptersSet);
      if (relation) {
        relation.verticalChapters = verticalList;
      } else {
        frameRelations.set(frameId, {
          sequential: false,
          verticalChapters: verticalList,
        });
      }
    });

    // If no chapters, just return orphan frame groups
    if (sortedChapters.length === 0) {
      const orphanFrameGroups: AIFrame[][] = [];
      frameCascadeGroups.forEach(groupIds => {
        const groupFrames = groupIds
          .map(id => framesMap.get(id))
          .filter((f): f is AIFrame => f !== undefined);
        if (groupFrames.length > 0) {
          orphanFrameGroups.push(groupFrames);
        }
      });

      return {
        connectedGroups: [] as Array<{ id: string; connected: boolean; chapters: ChapterLinearEntry[] }>,
        standaloneChapters: [] as ChapterLinearEntry[],
        orphanFrameGroups,
        frameRelations,
      };
    }

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

          // Get all frames in cascade groups of directly connected frames
          const includedGroupIndices = new Set<number>();

          // Combine frameIds from chapter data AND graph edges
          const directFrameIds = new Set([
            ...(chapterData.frameIds || []),
            ...(chapterToFrameEdges.get(id) || [])
          ]);

          // Find all cascade groups that contain directly connected frames
          directFrameIds.forEach(frameId => {
            const groupIndex = frameToGroupIndex.get(frameId);
            if (groupIndex !== undefined) {
              includedGroupIndices.add(groupIndex);
            }
          });

          // Collect all frames from included cascade groups
          const allFrameIds = new Set<string>();
          includedGroupIndices.forEach(groupIndex => {
            const group = frameCascadeGroups[groupIndex];
            group.forEach(frameId => {
              allFrameIds.add(frameId);
              assignedFrameIds.add(frameId);
            });
          });

          // Convert to frame objects
          const chapterFrames = Array.from(allFrameIds)
            .map(frameId => framesMap.get(frameId))
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

    // Group orphan frames by their cascade groups
    const orphanFrameGroups: AIFrame[][] = [];
    const processedOrphanGroups = new Set<number>();

    frames.forEach(frame => {
      if (assignedFrameIds.has(frame.id)) return;

      const groupIndex = frameToGroupIndex.get(frame.id);
      if (groupIndex === undefined || processedOrphanGroups.has(groupIndex)) return;

      processedOrphanGroups.add(groupIndex);
      const groupFrameIds = frameCascadeGroups[groupIndex];
      const groupFrames = groupFrameIds
        .map(id => framesMap.get(id))
        .filter((f): f is AIFrame => f !== undefined && !assignedFrameIds.has(f.id));

      if (groupFrames.length > 0) {
        orphanFrameGroups.push(groupFrames);
      }
    });

    return { connectedGroups, standaloneChapters, orphanFrameGroups, frameRelations };
  }, [frames, graphState, sortedChapters]);

  // Build sequential frame list for chapter-aware navigation
  const sequentialFrameList = useMemo(() => {
    const frameList: AIFrame[] = [];

    // Add frames from connected groups (in sequence)
    linearTopology.connectedGroups.forEach(group => {
      group.chapters.forEach(chapterEntry => {
        frameList.push(...chapterEntry.frames);
      });
    });

    // Add frames from standalone chapters
    linearTopology.standaloneChapters.forEach(chapterEntry => {
      frameList.push(...chapterEntry.frames);
    });

    // Add orphan frame groups at the end
    linearTopology.orphanFrameGroups.forEach(group => {
      frameList.push(...group);
    });

    return frameList;
  }, [linearTopology]);

  // Calculate chapter-scoped navigation info based on navigation mode
  const chapterNavInfo = useMemo(() => {
    if (!currentFrame) {
      return {
        position: 1,
        total: frames.length,
        chapterTitle: 'All Frames',
        isOrphan: false
      };
    }

    // FRAME MODE: Always show position in all frames following graph topology
    if (navigationMode === "frame") {
      const currentIndex = sequentialFrameList.findIndex(f => f.id === currentFrame.id);
      return {
        position: currentIndex !== -1 ? currentIndex + 1 : clampedFrameIndex + 1,
        total: sequentialFrameList.length,
        chapterTitle: 'All Frames',
        isOrphan: false
      };
    }

    // CHAPTER MODE: Show position within current chapter (using topology frames, not just frameIds)
    if (!currentChapter) {
      // Frame is orphaned - find which orphan group it belongs to
      for (const orphanGroup of linearTopology.orphanFrameGroups) {
        const groupIndex = orphanGroup.findIndex(f => f.id === currentFrame.id);
        if (groupIndex !== -1) {
          const groupTitle = orphanGroup.length > 1
            ? `Ungrouped Frame Group (${orphanGroup.length} connected)`
            : 'Ungrouped Frames';
          return {
            position: groupIndex + 1,
            total: orphanGroup.length,
            chapterTitle: groupTitle,
            isOrphan: true
          };
        }
      }
      // Fallback to global navigation
      return {
        position: clampedFrameIndex + 1,
        total: frames.length,
        chapterTitle: 'All Frames',
        isOrphan: false
      };
    }

    // Find frames in current chapter from linearTopology (includes cascaded frames)
    let chapterFrames: AIFrame[] = [];

    // Search in connected groups
    for (const group of linearTopology.connectedGroups) {
      const chapterEntry = group.chapters.find(entry => entry.chapter.id === currentChapter.id);
      if (chapterEntry) {
        chapterFrames = chapterEntry.frames;
        break;
      }
    }

    // Search in standalone chapters if not found
    if (chapterFrames.length === 0) {
      const chapterEntry = linearTopology.standaloneChapters.find(entry => entry.chapter.id === currentChapter.id);
      if (chapterEntry) {
        chapterFrames = chapterEntry.frames;
      }
    }

    const positionInChapter = chapterFrames.findIndex(f => f.id === currentFrame.id);

    return {
      position: positionInChapter !== -1 ? positionInChapter + 1 : 1,
      total: chapterFrames.length,
      chapterTitle: currentChapter.title,
      isOrphan: false
    };
  }, [currentFrame, currentChapter, linearTopology, clampedFrameIndex, frames, sequentialFrameList, navigationMode]);

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

  // Sequential chapter-aware navigation
  const navigateToPreviousFrame = useCallback(() => {
    if (!currentFrame || sequentialFrameList.length === 0) return;

    const currentIndex = sequentialFrameList.findIndex(f => f.id === currentFrame.id);
    if (currentIndex <= 0) return; // Already at first frame

    const previousFrame = sequentialFrameList[currentIndex - 1];
    const globalIndex = frames.findIndex(f => f.id === previousFrame.id);
    if (globalIndex !== -1) {
      onFrameIndexChange(globalIndex);
    }
  }, [currentFrame, sequentialFrameList, frames, onFrameIndexChange]);

  const navigateToNextFrame = useCallback(() => {
    if (!currentFrame || sequentialFrameList.length === 0) return;

    const currentIndex = sequentialFrameList.findIndex(f => f.id === currentFrame.id);
    if (currentIndex === -1 || currentIndex >= sequentialFrameList.length - 1) return; // Already at last frame

    const nextFrame = sequentialFrameList[currentIndex + 1];
    const globalIndex = frames.findIndex(f => f.id === nextFrame.id);
    if (globalIndex !== -1) {
      onFrameIndexChange(globalIndex);
    }
  }, [currentFrame, sequentialFrameList, frames, onFrameIndexChange]);

  // Calculate navigation boundaries
  const navigationState = useMemo(() => {
    if (!currentFrame || sequentialFrameList.length === 0) {
      return { isAtFirst: true, isAtLast: true, sequentialIndex: 0 };
    }

    const currentIndex = sequentialFrameList.findIndex(f => f.id === currentFrame.id);
    return {
      isAtFirst: currentIndex <= 0,
      isAtLast: currentIndex >= sequentialFrameList.length - 1,
      sequentialIndex: currentIndex
    };
  }, [currentFrame, sequentialFrameList]);

  // DEBUG: Log frame and chapter data (DISABLED - causing performance issues)
  // useEffect(() => {
  //   console.log('🔍 DEBUG - Frame Navigation Analysis:');
  //   console.log('📦 All Frames:', frames.map(f => ({ id: f.id, title: f.title || 'Untitled' })));
  //   console.log('📚 All Chapters:', sortedChapters.map(c => ({
  //     id: c.id,
  //     title: c.title,
  //     frameIds: c.frameIds,
  //     frameCount: c.frameIds.length
  //   })));
  //   console.log('🗺️ Linear Topology (with cascading frames):');
  //   linearTopology.connectedGroups.forEach((group, idx) => {
  //     console.log(`  Connected Group ${idx + 1}:`, group.chapters.map(ch => ({
  //       chapterId: ch.chapter.id,
  //       chapterTitle: ch.chapter.title,
  //       directFrameIds: ch.chapter.frameIds,
  //       allFrames: ch.frames.map(f => ({ id: f.id, title: f.title || 'Untitled' })),
  //       totalFrameCount: ch.frames.length
  //     })));
  //   });
  //   console.log('  Standalone Chapters:', linearTopology.standaloneChapters.map(ch => ({
  //     chapterId: ch.chapter.id,
  //     chapterTitle: ch.chapter.title,
  //     directFrameIds: ch.chapter.frameIds,
  //     allFrames: ch.frames.map(f => ({ id: f.id, title: f.title || 'Untitled' })),
  //     totalFrameCount: ch.frames.length
  //   })));
  //   console.log('  Orphan Frame Groups:', linearTopology.orphanFrameGroups.map((group, idx) => ({
  //     groupIndex: idx + 1,
  //     frameCount: group.length,
  //     frames: group.map(f => ({ id: f.id, title: f.title || 'Untitled' }))
  //   })));
  //   console.log('📐 Sequential Frame List:', sequentialFrameList.map((f, idx) => ({
  //     position: idx + 1,
  //     id: f.id,
  //     title: f.title || 'Untitled'
  //   })));
  //   console.log('🎯 Current Frame:', currentFrame ? { id: currentFrame.id, title: currentFrame.title || 'Untitled' } : 'none');
  //   console.log('📍 Current Chapter:', currentChapter ? { id: currentChapter.id, title: currentChapter.title } : 'none');
  //   console.log('🧭 Navigation State:', navigationState);
  // }, [frames, sortedChapters, linearTopology, currentFrame, currentChapter, sequentialFrameList, navigationState]);

  const handleCreateFrameClick = useCallback(() => {
    if (!onCreateFrame) return;
    const result = onCreateFrame();
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      (result as Promise<unknown>).catch((error) => {
        console.error('Failed to create frame from linear view:', error);
      });
    }
  }, [onCreateFrame]);

  const { connectedGroups, standaloneChapters, orphanFrameGroups, frameRelations } = linearTopology;

  const renderRelationBadges = useCallback(
    (frameId: string, chapterId?: string) => {
      const relation = frameRelations?.get(frameId);
      if (!relation) {
        return null;
      }

      const badges: React.ReactNode[] = [];
      const hasVertical = chapterId
        ? relation.verticalChapters.includes(chapterId)
        : relation.verticalChapters.length > 0;

      if (hasVertical) {
        badges.push(
          <Badge
            key="vertical"
            variant="outline"
            className="text-[10px] bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-300"
          >
            Vertical
          </Badge>
        );
      }

      if (relation.sequential) {
        badges.push(
          <Badge
            key="sequential"
            variant="outline"
            className="text-[10px] bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-700 dark:text-indigo-300"
          >
            Sequential
          </Badge>
        );
      }

      if (badges.length === 0) {
        return null;
      }

      return <div className="flex items-center gap-1 mt-1">{badges}</div>;
    },
    [frameRelations]
  );
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

  // Persist navigation mode to localStorage
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(NAV_MODE_STORAGE_KEY, navigationMode);
  }, [navigationMode]);

  // Smart default: Auto-switch to frame mode if no chapters exist
  useEffect(() => {
    if (chapters.length === 0 && navigationMode === "chapter") {
      setNavigationMode("frame");
    }
  }, [chapters.length, navigationMode]);

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
      {viewMode !== "linear" && (
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
                {viewMode !== "linear" && renderViewToggle()}
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
      )}

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
                      onClick={navigateToPreviousFrame}
                      disabled={navigationState.isAtFirst}
                      title="Previous frame in sequence"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center">
                      <Badge variant="default">
                        {chapterNavInfo.position} of {chapterNavInfo.total}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        in {chapterNavInfo.chapterTitle}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={navigateToNextFrame}
                      disabled={navigationState.isAtLast}
                      title="Next frame in sequence"
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
                {/* Navigation Mode Toggle - Above Chapter Overview */}
                {hasFrames && (
                  <div className="flex items-center justify-center gap-2 pb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Navigation View:</span>
                    <div className="inline-flex items-center gap-0.5 rounded-md border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-0.5">
                      <Button
                        variant={navigationMode === "chapter" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setNavigationMode("chapter")}
                        className="h-7 px-3 text-xs"
                        title="Show position within current chapter"
                        disabled={chapters.length === 0}
                      >
                        Chapter
                      </Button>
                      <Button
                        variant={navigationMode === "frame" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setNavigationMode("frame")}
                        className="h-7 px-3 text-xs"
                        title="Show position in all frames"
                      >
                        Frame
                      </Button>
                    </div>
                  </div>
                )}
{hasChapters && navigationMode === "chapter" && (
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
                                                  <div key={frame.id} className="flex flex-col items-start">
                                                    <Button
                                                      size="sm"
                                                      variant={isActiveFrame ? 'default' : 'outline'}
                                                      onClick={() => navigateToFrame(frame.id)}
                                                      className="flex items-center gap-1 h-7 text-xs"
                                                    >
                                                      <Play className="h-3 w-3" />
                                                      {frame.title || 'Untitled Frame'}
                                                    </Button>
                                                    {renderRelationBadges(frame.id, entry.chapter.id)}
                                                  </div>
                                                );
                                              })
                                            ) : (
                                              <span className="text-xs italic text-gray-500 dark:text-gray-400">
                                                No frames attached
                                              </span>
                                            )}
                                          </div>
                                          {/* Concepts attached to this chapter */}
                                          {entry.chapter.conceptIds && entry.chapter.conceptIds.length > 0 && (
                                            <div className="mt-2">
                                              <Label className="text-xs font-medium flex items-center gap-1 mb-1 text-yellow-700 dark:text-yellow-400">
                                                <Brain className="h-3 w-3" />
                                                Concepts ({entry.chapter.conceptIds.length})
                                              </Label>
                                              <div className="flex flex-wrap gap-1">
                                                {entry.chapter.conceptIds.map((conceptId) => (
                                                  <Badge
                                                    key={conceptId}
                                                    variant="outline"
                                                    className="text-xs bg-yellow-50 border-yellow-300 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400"
                                                  >
                                                    {conceptId}
                                                  </Badge>
                                                ))}
                                              </div>
                                            </div>
                                          )}
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
                                      <div key={frame.id} className="flex flex-col items-start">
                                        <Button
                                          size="sm"
                                          variant={isActiveFrame ? 'default' : 'outline'}
                                          onClick={() => navigateToFrame(frame.id)}
                                          className="flex items-center gap-1 h-7 text-xs"
                                        >
                                          <Play className="h-3 w-3" />
                                          {frame.title || 'Untitled Frame'}
                                        </Button>
                                        {renderRelationBadges(frame.id, entry.chapter.id)}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <span className="text-xs italic text-gray-500 dark:text-gray-400">
                                    No frames attached
                                  </span>
                                )}
                              </div>
                              {/* Concepts attached to this chapter */}
                              {entry.chapter.conceptIds && entry.chapter.conceptIds.length > 0 && (
                                <div className="mt-2">
                                  <Label className="text-xs font-medium flex items-center gap-1 mb-1 text-yellow-700 dark:text-yellow-400">
                                    <Brain className="h-3 w-3" />
                                    Concepts ({entry.chapter.conceptIds.length})
                                  </Label>
                                  <div className="flex flex-wrap gap-1">
                                    {entry.chapter.conceptIds.map((conceptId) => (
                                      <Badge
                                        key={conceptId}
                                        variant="outline"
                                        className="text-xs bg-yellow-50 border-yellow-300 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400"
                                      >
                                        {conceptId}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
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
{orphanFrameGroups.length > 0 && navigationMode === "frame" && (
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
                <CardContent className="space-y-4">
                  {orphanFrameGroups.map((frameGroup, groupIndex) => (
                    <div key={groupIndex} className="space-y-2">
                      {frameGroup.length > 1 && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
                          <span className="px-2">Connected Sequence ({frameGroup.length} frames)</span>
                          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {frameGroup.map((frame, frameIndex) => {
                          const isActiveFrame = currentFrame?.id === frame.id;
                          return (
                            <div key={frame.id} className="flex items-center gap-1">
                              <div className="flex flex-col items-start">
                                <Button
                                  size="sm"
                                  variant={isActiveFrame ? 'default' : 'outline'}
                                  onClick={() => navigateToFrame(frame.id)}
                                  className="flex items-center gap-2"
                                >
                                  <Play className="h-4 w-4" />
                                  {frame.title || 'Untitled Frame'}
                                </Button>
                                {renderRelationBadges(frame.id)}
                              </div>
                              {frameIndex < frameGroup.length - 1 && (
                                <span className="text-gray-400 text-sm">→</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
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
