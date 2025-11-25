"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  BackgroundVariant,
  Background,
  Controls,
  MiniMap,
  Node,
  NodeChange,
  EdgeChange,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Import enhanced nodes with attachment system
import EnhancedAIFrameNode from "./EnhancedAIFrameNode";
import VideoAttachmentNode from "./VideoAttachmentNode";
import PDFAttachmentNode from "./PDFAttachmentNode";
import TextAttachmentNode from "./TextAttachmentNode";
import ConceptNode from "./ConceptNode";
import ChapterNode from "./ChapterNode";
import EnhancedSidebar from "./EnhancedSidebar";
import type { Chapter as AiChapter } from "@/app/ai-frames/types/frames";

// Extended Edge type with all ReactFlow properties
type ExtendedEdge = Edge & {
  sourceHandle?: string;
  targetHandle?: string;
  markerEnd?: any;
  data?: any;
};

import {
  NodeData,
  AIFrameNodeData,
  EnhancedDragItem, 
  GraphState, 
  FrameGraphMapping,
  FrameAttachment,
  VideoAttachmentNodeData,
  PDFAttachmentNodeData,
  TextAttachmentNodeData,
  ChapterNodeData
} from "./types";

// Enhanced node types with attachment system
const enhancedNodeTypes = {
  aiframe: EnhancedAIFrameNode,
  "video-attachment": VideoAttachmentNode,
  "pdf-attachment": PDFAttachmentNode,
  "text-attachment": TextAttachmentNode,
  concept: ConceptNode,
  chapter: ChapterNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];
const DEFAULT_CHAPTER_COLOR = "#3B82F6";
const CHAPTER_MEMBERSHIP_STYLE = { stroke: "#10b981", strokeWidth: 2.5 };
const CHAPTER_MEMBERSHIP_MARKER = {
  type: MarkerType.ArrowClosed,
  color: "#10b981",
  width: 16,
  height: 16,
};
const SEQUENTIAL_EDGE_STYLE = { stroke: "#3B82F6", strokeWidth: 2.5 };
const SEQUENTIAL_EDGE_MARKER = {
  type: MarkerType.ArrowClosed,
  color: "#3B82F6",
  width: 16,
  height: 16,
};

let id = 0;
const getId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${id++}`; // SPECS FIX: Guaranteed unique IDs

type ChapterNodeUpdates = Partial<Pick<ChapterNodeData, "title" | "description" | "frameIds" | "conceptIds" | "order" | "color" | "linkSequentially">>;

interface EnhancedLearningGraphProps {
  mode?: "creator" | "learner";
  frames?: any[];
  onFramesChange?: (frames: any[]) => void;
  onGraphChange?: (graphState: GraphState) => void;
  initialGraphState?: GraphState;
  chapters?: AiChapter[];
  onChaptersChange?: (chapters: AiChapter[]) => void;
}

export default function EnhancedLearningGraph({ 
  mode = "creator",
  frames = [],
  onFramesChange,
  onGraphChange,
  initialGraphState,
  chapters = [],
  onChaptersChange,
}: EnhancedLearningGraphProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraphState?.nodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraphState?.edges || initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [frameGraphMapping, setFrameGraphMapping] = useState<FrameGraphMapping[]>([]);
  const lastEmissionRef = useRef<number>(0);
  const lastAppliedGraphState = useRef<string | null>(null);
  const chaptersRef = useRef<AiChapter[]>(chapters || []);
  const isFilteringNodesRef = useRef<boolean>(false);

  // CRITICAL FIX: Stabilize ReactFlow callbacks to prevent infinite re-renders
  const onNodesChangeRef = useRef(onNodesChange);
  const onEdgesChangeRef = useRef(onEdgesChange);
  const setNodesRef = useRef(setNodes);
  const setEdgesRef = useRef(setEdges);

  useEffect(() => {
    onNodesChangeRef.current = onNodesChange;
    onEdgesChangeRef.current = onEdgesChange;
  }, [onNodesChange, onEdgesChange]);

  useEffect(() => {
    setNodesRef.current = setNodes;
    setEdgesRef.current = setEdges;
  }, [setNodes, setEdges]);

  // CRITICAL FIX: Add ref to track current frames and prevent stale closure issues
  const framesRef = useRef(frames);
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);
  useEffect(() => {
    chaptersRef.current = Array.isArray(chapters) ? chapters : [];
  }, [chapters]);
  
  // CRITICAL FIX: Add refs to track current graph state for fresh values
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const selectedNodeRef = useRef(selectedNode);
  const boundChapterUpdateHandlers = useRef<Set<string>>(new Set());
  const initialGraphStateRef = useRef(initialGraphState);
  const pendingFrameIdsRef = useRef<Set<string>>(new Set());
  const pendingAttachmentNodeIdsRef = useRef<Set<string>>(new Set());
  const recentlyDeletedFrameIdsRef = useRef<Set<string>>(new Set()); // Track deleted frames to prevent re-merge
  const onFramesChangeRef = useRef(onFramesChange);
  const onChaptersChangeRef = useRef(onChaptersChange);
  const onGraphChangeRef = useRef(onGraphChange);
  const debugPropsRef = useRef({
    nodes,
    edges,
    handleNodesChange: null as null | typeof handleNodesChange,
    handleEdgesChange: null as null | typeof handleEdgesChange,
    handleNodesDelete: null as null | typeof handleNodesDelete,
    onConnect: null as null | typeof onConnect,
    onEdgesDelete: null as null | typeof onEdgesDelete,
    onDrop: null as null | typeof onDrop,
  });

  useEffect(() => {
    nodesRef.current = nodes;
    edgesRef.current = edges;
    selectedNodeRef.current = selectedNode;
  }, [nodes, edges, selectedNode]);

  useEffect(() => {
    initialGraphStateRef.current = initialGraphState;
  }, [initialGraphState]);

  useEffect(() => {
    onFramesChangeRef.current = onFramesChange;
  }, [onFramesChange]);

  useEffect(() => {
    onChaptersChangeRef.current = onChaptersChange;
  }, [onChaptersChange]);

  useEffect(() => {
    onGraphChangeRef.current = onGraphChange;
  }, [onGraphChange]);

  const invokeOnFramesChange = useCallback((updatedFrames: any[]) => {
    onFramesChangeRef.current?.(updatedFrames);
  }, []);

  const invokeOnChaptersChange = useCallback((updatedChapters: AiChapter[]) => {
    onChaptersChangeRef.current?.(updatedChapters);
  }, []);

  const invokeOnGraphChange = useCallback((state: GraphState) => {
    onGraphChangeRef.current?.(state);
  }, []);

  useEffect(() => {
    if (!Array.isArray(frames) || frames.length === 0) {
      return;
    }
    const pending = pendingFrameIdsRef.current;
    frames.forEach((frame: any) => {
      if (frame?.id) {
        pending.delete(frame.id);
      }
    });
  }, [frames]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleFrameAdded = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const newFrame =
        detail.newFrame || detail.frame || { id: detail.frameId };
      const frameId = newFrame?.id;
      if (!frameId) {
        return;
      }
      pendingFrameIdsRef.current.add(frameId);
      setTimeout(() => {
        pendingFrameIdsRef.current.delete(frameId);
      }, 4000);
    };
    // REMOVED: Event listener for graph-frame-added
    // EnhancedLearningGraph should rely on props/callbacks, not window events
  }, []);

  // CRITICAL FIX: Add mutex to prevent concurrent frame creation
  const isCreatingFrame = useRef(false);
  
  // HELPER: Emit graph state change with deduplication (using refs for fresh values)
  const emitGraphStateChange = useCallback((reason: string, additionalDetail: any = {}, freshState?: { nodes?: any[], edges?: any[] }) => {
    const now = Date.now();
    if (now - lastEmissionRef.current < 200) {
      // SPECS COMPLIANT: 200ms debounce for performance optimization
      return;
    }
    
    lastEmissionRef.current = now;
    
    // Use fresh state if provided, otherwise get from refs
    const currentNodes = freshState?.nodes ?? nodesRef.current;
    const currentEdges = freshState?.edges ?? edgesRef.current;
    const currentSelectedNode = selectedNodeRef.current;
    
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('graph-state-changed', {
          detail: {
            nodes: currentNodes,
            edges: currentEdges,
            selectedNodeId: currentSelectedNode,
            nodeCount: currentNodes.length,
            edgeCount: currentEdges.length,
            reason: reason,
            timestamp: new Date().toISOString(),
            ...additionalDetail
          }
        }));
      });
    }
  }, []); // No dependencies to prevent infinite loops

  // DYNAMIC: Universal handler for ANY node changes (position, add, remove, select, etc.)
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    // Call React Flow's built-in handler first
    onNodesChangeRef.current(changes);
    
    // Debounce position changes to avoid excessive events during drag
    const positionChanges = changes.filter(change => change.type === 'position');
    if (positionChanges.length > 0) {
      clearTimeout((window as any).positionChangeTimeout);
      (window as any).positionChangeTimeout = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('graph-element-changed', {
            detail: {
              elementType: 'node',
              changeType: 'position',
              elementCount: positionChanges.length,
              timestamp: new Date().toISOString(),
              nodesSnapshot: nodesRef.current // Include current node positions for save
            }
          }));
        }
      }, 1000); // Only emit position events every 1 second
    }
  }, []); // ✅ No dependencies - stable callback

  const handleNodesDelete = useCallback((deletedNodes: Node[]) => {
    if (!deletedNodes || deletedNodes.length === 0) {
      return;
    }

    const nodeIds = new Set(deletedNodes.map((node) => node.id));
    if (nodeIds.size > 0) {
      setEdgesRef.current((eds) =>
        eds.filter(
          (edge) => !nodeIds.has(edge.source) && !nodeIds.has(edge.target)
        )
      );
    }

    deletedNodes.forEach((node) => {
      if (node.type === "chapter") {
        const chapterId = (node.data as ChapterNodeData)?.id || node.id;
        if (!chapterId) {
          return;
        }

        const currentChapters = chaptersRef.current || [];
        const filteredChapters = currentChapters.filter(
          (chapter) => chapter.id !== chapterId
        );
        if (filteredChapters.length !== currentChapters.length) {
          chaptersRef.current = filteredChapters;
          invokeOnChaptersChange(filteredChapters);
        }

        const currentFrames = framesRef.current || [];
        let framesChanged = false;
        const updatedFrames = currentFrames.map((frame) => {
          if (
            frame.chapterId === chapterId ||
            frame.parentFrameId === chapterId
          ) {
            framesChanged = true;
            return {
              ...frame,
              chapterId: undefined,
              parentFrameId: undefined,
              updatedAt: new Date().toISOString(),
            };
          }
          return frame;
        });

        if (framesChanged) {
          framesRef.current = updatedFrames;
          invokeOnFramesChange(updatedFrames);
        }
      } else if (node.type === "aiframe" && node.data?.frameId) {
        const frameId = String(node.data.frameId);
        
        // Skip if frame is pending creation
        if (pendingFrameIdsRef.current.has(frameId)) {
          return;
        }

        const currentFrames = framesRef.current || [];
        const framesReady = Array.isArray(currentFrames) && currentFrames.length > 0;

        if (!framesReady) {
          return;
        }

        // Filter out the deleted frame
        const filteredFrames = currentFrames.filter(
          (frame) => frame.id !== frameId
        );
        
        // Only proceed if frame was actually removed
        if (filteredFrames.length !== currentFrames.length) {
          // CRITICAL FIX: Track deleted frame to prevent re-merge
          recentlyDeletedFrameIdsRef.current.add(frameId);
          
          // Clear tracking after delay to allow props to sync
          setTimeout(() => {
            recentlyDeletedFrameIdsRef.current.delete(frameId);
          }, 2000);
          
          // Handle any frames that reference this frame as parent
          let framesChanged = false;
          const updatedFrames = filteredFrames.map((frame) => {
            if (frame.parentFrameId === frameId) {
              framesChanged = true;
              return {
                ...frame,
                parentFrameId: undefined,
                updatedAt: new Date().toISOString(),
              };
            }
            return frame;
          });
          
          // Update ref
          framesRef.current = framesChanged ? updatedFrames : filteredFrames;
          
          // Notify parent component with updated frames
          invokeOnFramesChange(framesChanged ? updatedFrames : filteredFrames);
          
          // CRITICAL FIX: Delay save trigger to allow React to update framesRef.current
          // Wait 500ms for React state to propagate before triggering background save
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('graph-frame-deleted', {
                detail: {
                  frameId: frameId,
                  deletedFrameIds: [frameId]
                }
              }));
            }
          }, 500);
        }
      }
    });
  }, [invokeOnChaptersChange, invokeOnFramesChange]); // ✅ Removed setEdges

  // DYNAMIC: Universal handler for ANY edge changes (position, add, remove, etc.)
  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    // Call React Flow's built-in handler first
    onEdgesChangeRef.current(changes);
    
    // CRITICAL FIX: Emit graph state changed for ALL edge modifications
    const meaningfulChanges = changes.filter(change => 
      change.type === 'add' || 
      change.type === 'remove' || 
      change.type === 'select'
    );
    
    if (meaningfulChanges.length > 0 && typeof window !== 'undefined') {
      // Emit graph-state-changed event to trigger unified save
      emitGraphStateChange('edges-changed', {
        changes: meaningfulChanges
      });
      
      // Also emit individual element changes for compatibility
      meaningfulChanges.forEach(change => {
        const elementId = (change.type === 'add' || change.type === 'remove' || change.type === 'select') ? (change as any).id : undefined;
        window.dispatchEvent(new CustomEvent('graph-element-changed', {
          detail: {
            elementType: 'edge',
            changeType: change.type,
            elementId: elementId,
            elementData: change,
            timestamp: new Date().toISOString()
          }
        }));
      });
    }
  }, [emitGraphStateChange]); // ✅ Removed onEdgesChange dependency

  // Handle frame updates from enhanced AI frame nodes
  const handleFrameUpdate = useCallback((frameId: string, updatedData: any) => {
    // DYNAMIC: Safe property merge for ANY frame type and properties (like unified storage)
    const safeUpdatedData: any = {};
    
    // Dynamically merge any properties that exist in the event data
    if (updatedData && typeof updatedData === 'object') {
      Object.keys(updatedData).forEach(key => {
        const value = updatedData[key];
        
        // For string properties, only include if non-empty to prevent content corruption
        if (typeof value === 'string') {
          if (value.trim() !== '' && !key.startsWith('_')) {
            safeUpdatedData[key] = value;
          }
        }
        // For non-string properties, include if not undefined/null
        else if (value !== undefined && value !== null && !key.startsWith('_')) {
          safeUpdatedData[key] = value;
        }
      });
    }

    // CRITICAL FIX: Only update if we have safe data to prevent corruption
    if (Object.keys(safeUpdatedData).length > 0) {
      // CRITICAL FIX: Use framesRef.current instead of stale frames prop to prevent empty array corruption
      const currentFrames = framesRef.current;
      const updatedFrames = currentFrames.map(frame =>
        frame.id === frameId ? { ...frame, ...safeUpdatedData, updatedAt: new Date().toISOString() } : frame
      );

      invokeOnFramesChange(updatedFrames);
    }
    
    // CRITICAL FIX: Also update the graph node data to keep it in sync (with safe data only)
    if (Object.keys(safeUpdatedData).length > 0) {
      setNodesRef.current(nds => nds.map(node => {
        if (node.data.frameId === frameId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...safeUpdatedData,
              updatedAt: new Date().toISOString()
            }
          };
        }
        return node;
      }));
    }
  }, [invokeOnFramesChange]); // Remove frames dependency to prevent stale closures

  // Handle content attachment to frames
  const handleAttachContent = useCallback((frameId: string, attachment: FrameAttachment) => {
    // Update the frame in the frames array
    // CRITICAL FIX: Use framesRef.current instead of stale frames prop for attachments
    const currentFrames = framesRef.current;
    const updatedFrames = currentFrames.map(frame => 
      frame.id === frameId ? { 
        ...frame, 
        attachment,
        // DYNAMIC: Update all attachment data properties without hardcoding
        updatedAt: new Date().toISOString()
      } : frame
    );

    invokeOnFramesChange(updatedFrames);

    // Update the graph node
    setNodesRef.current(nds => nds.map(node => {
      if (node.data.frameId === frameId) {
        return {
          ...node,
          data: {
            ...node.data,
            attachment
          }
        };
      }
      return node;
    }));

    // NOTE: graph-attachment-changed event moved to onConnect to include fresh edge state

    // OPTIMISTIC: Background save will handle persistence automatically
    // No need for force save since optimistic updates are now implemented
  }, [invokeOnFramesChange]);

  // Handle content detachment from frames
  const handleDetachContent = useCallback((frameId: string) => {
    
    
    // Update the frame in the frames array
    // CRITICAL FIX: Use framesRef.current instead of stale frames prop for detachment
    const currentFrames = framesRef.current;
    const updatedFrames = currentFrames.map(frame => 
      frame.id === frameId ? { 
        ...frame, 
        attachment: undefined,
        // DYNAMIC: Update timestamp
        updatedAt: new Date().toISOString()
      } : frame
    );
    invokeOnFramesChange(updatedFrames);

    // Update the graph node
    setNodesRef.current(nds => nds.map(node => {
      if (node.data.frameId === frameId) {
        return {
          ...node,
          data: {
            ...node.data,
            attachment: undefined
          }
        };
      }
      return node;
    }));

    // Emit event to sync with Frame Navigation (include fresh graph state)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('graph-attachment-changed', {
        detail: {
          frameId,
          attachment: undefined,
          action: 'detached',
          // CRITICAL FIX: Include fresh graph state to prevent stale edge saves
          freshGraphState: {
            nodes: nodesRef.current,
            edges: edgesRef.current,
            selectedNodeId: selectedNodeRef.current
          }
        }
      }));
    }
  }, [invokeOnFramesChange]);

  const handleChapterUpdate = useCallback((chapterNodeId: string, updates: ChapterNodeUpdates) => {
    if (!updates) {
      return;
    }

    const sanitized: ChapterNodeUpdates = {};
    if (typeof updates.title === "string") {
      sanitized.title = updates.title;
    }
    if (typeof updates.description === "string") {
      sanitized.description = updates.description;
    }
    if (Array.isArray(updates.frameIds)) {
      sanitized.frameIds = updates.frameIds;
    }
    if (Array.isArray(updates.conceptIds)) {
      sanitized.conceptIds = updates.conceptIds;
    }
    if (typeof updates.order === "number") {
      sanitized.order = updates.order;
    }
    if (typeof updates.color === "string") {
      sanitized.color = updates.color;
    }
    if (typeof updates.linkSequentially === "boolean") {
      sanitized.linkSequentially = updates.linkSequentially;
    }

    if (Object.keys(sanitized).length === 0) {
      return;
    }

    let updatedNodes: Node[] | null = null;
    let didUpdate = false;
    let resolvedChapterId: string | null = null;

    setNodesRef.current(currentNodes => {
      const nextNodes = currentNodes.map(node => {
        if (node.type !== 'chapter') {
          return node;
        }

        const nodeData = node.data as ChapterNodeData;
        const nodeChapterId = nodeData?.id || node.id;
        const isTargetNode = node.id === chapterNodeId || nodeChapterId === chapterNodeId;
        if (!isTargetNode) {
          return node;
        }

        const nextData: ChapterNodeData = {
          ...nodeData,
          ...sanitized,
          id: nodeChapterId,
          updatedAt: new Date().toISOString(),
          onChapterUpdate: nodeData?.onChapterUpdate,
        };

        const hasLocalChange = Object.keys(sanitized).some((key) => {
          const typedKey = key as keyof ChapterNodeUpdates;
          return (nodeData as any)?.[typedKey] !== (nextData as any)[typedKey];
        });

        if (!hasLocalChange) {
          return node;
        }

        didUpdate = true;
        resolvedChapterId = nodeChapterId;
        return {
          ...node,
          data: {
            ...nextData,
            onChapterUpdate: nodeData?.onChapterUpdate,
          },
        };
      });

      if (didUpdate) {
        updatedNodes = nextNodes;
        return nextNodes;
      }

      return currentNodes;
    });

    if (didUpdate && updatedNodes) {
      emitGraphStateChange(
        'chapter-updated',
        {
          chapterNodeId: resolvedChapterId ?? chapterNodeId,
          updates: sanitized,
        },
        { nodes: updatedNodes, edges: edgesRef.current }
      );

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('chapter-node-updated', {
          detail: {
            chapterNodeId: resolvedChapterId ?? chapterNodeId,
            updates: sanitized,
            timestamp: new Date().toISOString(),
          }
        }));
      }
    }

    if (didUpdate) {
      const targetChapterId = resolvedChapterId ?? chapterNodeId;
      const currentChapters = chaptersRef.current || [];
      const timestamp = new Date().toISOString();
      const existingIndex = currentChapters.findIndex(chapter => chapter.id === targetChapterId);
      let nextChapters: AiChapter[];

      if (existingIndex !== -1) {
        const existingChapter = currentChapters[existingIndex];
        const updatedChapter: AiChapter = {
          ...existingChapter,
          title: typeof sanitized.title === 'string' ? sanitized.title : existingChapter.title,
          description: typeof sanitized.description === 'string' ? sanitized.description : existingChapter.description,
          frameIds: Array.isArray(sanitized.frameIds) ? sanitized.frameIds : existingChapter.frameIds,
          conceptIds: Array.isArray(sanitized.conceptIds) ? sanitized.conceptIds : existingChapter.conceptIds,
          order: typeof sanitized.order === 'number' ? sanitized.order : existingChapter.order,
          color: typeof sanitized.color === 'string' ? sanitized.color : existingChapter.color,
          updatedAt: timestamp,
        };

        nextChapters = [
          ...currentChapters.slice(0, existingIndex),
          updatedChapter,
          ...currentChapters.slice(existingIndex + 1),
        ];
      } else {
        nextChapters = [
          ...currentChapters,
          {
            id: targetChapterId,
            title: sanitized.title || "New Chapter",
            description: sanitized.description || "",
            frameIds: Array.isArray(sanitized.frameIds) ? sanitized.frameIds : [],
            conceptIds: Array.isArray(sanitized.conceptIds) ? sanitized.conceptIds : [],
            order: typeof sanitized.order === 'number' ? sanitized.order : currentChapters.length,
            color: typeof sanitized.color === 'string' ? sanitized.color : DEFAULT_CHAPTER_COLOR,
            createdAt: timestamp,
            updatedAt: timestamp,
            isCollapsed: false,
            bubblSpaceId: undefined,
            timeCapsuleId: undefined,
          },
        ];
      }

      chaptersRef.current = nextChapters;
      invokeOnChaptersChange(nextChapters);
    }

    if (didUpdate && updatedNodes) {
      const freshGraphState = {
        nodes: updatedNodes,
        edges: edgesRef.current,
        selectedNodeId: selectedNodeRef.current
      };

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: 'chapter-update',
            timestamp: Date.now(),
            graphState: freshGraphState
          }
        }));
      }
    }
  }, [emitGraphStateChange, invokeOnChaptersChange, setNodes]);

  useEffect(() => {
    if (!Array.isArray(chapters)) {
      return;
    }

    let patchedFlag = false;
    let updatedNodes: Node[] | null = null;
    let createdChapterNodes: Node[] = [];

    setNodes(currentNodes => {
      const chapterMap = new Map(chapters.map(chapter => [chapter.id, chapter]));
      let localPatched = false;
      const existingChapterIds = new Set<string>();

      const mappedNodes = currentNodes.map(node => {
        if (node.type !== 'chapter') {
          return node;
        }

        const nodeData = node.data as ChapterNodeData;
        const chapterId = nodeData?.id || node.id;
        if (chapterId) {
          existingChapterIds.add(chapterId);
        }

        const chapter = chapterMap.get(chapterId);
        const handler =
          typeof nodeData?.onChapterUpdate === 'function'
            ? nodeData.onChapterUpdate
            : (updates: ChapterNodeUpdates) => handleChapterUpdate(chapterId, updates);

        if (!chapter) {
          if (nodeData?.onChapterUpdate && nodeData.id === chapterId) {
            return node;
          }
          localPatched = true;
          return {
            ...node,
            data: {
              ...nodeData,
              id: chapterId,
              onChapterUpdate: handler,
              frameIds: Array.isArray(nodeData?.frameIds) ? nodeData.frameIds : [],
              conceptIds: Array.isArray(nodeData?.conceptIds) ? nodeData.conceptIds : [],
            },
          };
        }

        const nextData: ChapterNodeData = {
          ...nodeData,
          id: chapterId,
          title: chapter.title,
          description: chapter.description || "",
          frameIds: Array.isArray(chapter.frameIds) ? chapter.frameIds : [],
          conceptIds: Array.isArray(chapter.conceptIds) ? chapter.conceptIds : [],
          order: chapter.order,
          color: chapter.color || nodeData.color || DEFAULT_CHAPTER_COLOR,
          linkSequentially: chapter.linkSequentially ?? false,
          onChapterUpdate: handler,
        };

        const hasDifference =
          nodeData.title !== nextData.title ||
          (nodeData.description || "") !== nextData.description ||
          JSON.stringify(nodeData.frameIds || []) !== JSON.stringify(nextData.frameIds) ||
          JSON.stringify(nodeData.conceptIds || []) !== JSON.stringify(nextData.conceptIds) ||
          nodeData.order !== nextData.order ||
          nodeData.onChapterUpdate !== handler ||
          nodeData.id !== nextData.id ||
          nodeData.color !== nextData.color ||
          (nodeData as ChapterNodeData)?.linkSequentially !== nextData.linkSequentially;

        if (!hasDifference) {
          return node;
        }

        localPatched = true;
        return {
          ...node,
          data: nextData,
        };
      });

      const nextNodes = [...mappedNodes];

      // Automatically create chapter nodes that are missing from the graph
      const existingChapterNodeCount = nextNodes.filter(node => node.type === 'chapter').length;
      const newlyCreatedNodes: Node[] = [];

      chapters.forEach((chapter, index) => {
        if (!chapter || !chapter.id) {
          return;
        }

        if (existingChapterIds.has(chapter.id)) {
          return;
        }

        const insertionIndex = existingChapterNodeCount + newlyCreatedNodes.length;
        const column = insertionIndex % 3;
        const row = Math.floor(insertionIndex / 3);

        const nodeId = chapter.id || getId();
        const handler = (updates: ChapterNodeUpdates) => handleChapterUpdate(chapter.id, updates);
        boundChapterUpdateHandlers.current.add(chapter.id);

        const newNode: Node = {
          id: nodeId,
          type: "chapter",
          position: {
            x: column * 360 + 120,
            y: row * 240 + 120,
          },
          data: {
            type: "chapter",
            id: chapter.id,
            title: chapter.title,
            description: chapter.description || "",
            frameIds: Array.isArray(chapter.frameIds) ? chapter.frameIds : [],
            conceptIds: Array.isArray(chapter.conceptIds) ? chapter.conceptIds : [],
            order: chapter.order,
            color: chapter.color || DEFAULT_CHAPTER_COLOR,
            linkSequentially: chapter.linkSequentially ?? false,
            onChapterUpdate: handler,
          } satisfies ChapterNodeData,
        };

        newlyCreatedNodes.push(newNode);
        existingChapterIds.add(chapter.id);
      });

      if (newlyCreatedNodes.length > 0) {
        localPatched = true;
        nextNodes.push(...newlyCreatedNodes);
        createdChapterNodes = newlyCreatedNodes;
      }

      if (localPatched) {
        patchedFlag = true;
        updatedNodes = nextNodes;
        return nextNodes;
      }

      return currentNodes.length === nextNodes.length ? currentNodes : nextNodes;
    });

    if (patchedFlag && updatedNodes) {
      const freshGraphState = {
        nodes: updatedNodes,
        edges: edgesRef.current,
        selectedNodeId: selectedNodeRef.current,
      };

      emitGraphStateChange('chapter-sync-props', {
        chapters,
        createdChapterIds: createdChapterNodes.map(node => (node.data as ChapterNodeData)?.id),
      }, freshGraphState);

      if (typeof window !== 'undefined') {
        if (createdChapterNodes.length > 0) {
          window.dispatchEvent(new CustomEvent('chapter-nodes-created', {
            detail: {
              chapterIds: createdChapterNodes.map(node => (node.data as ChapterNodeData)?.id),
              timestamp: Date.now(),
            }
          }));
        }

        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: createdChapterNodes.length > 0 ? 'chapter-created' : 'chapter-sync-props',
            timestamp: Date.now(),
            graphState: freshGraphState,
          }
        }));
      }
    }
  }, [chapters, emitGraphStateChange, handleChapterUpdate, setNodes]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const enqueueNodeUpdate = (updater: (currentNodes: Node[]) => Node[]) => {
      requestAnimationFrame(() => {
        setNodes((current) => updater(current));
      });
    };

    const handleExternalChapterSync = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const chapterPayload = detail.chapter || {};
      const chapterId: string | undefined = detail.chapterId || chapterPayload.id;
      if (!chapterId) {
        return;
      }

      const frameIds: string[] = Array.isArray(detail.frameIds)
        ? detail.frameIds
        : Array.isArray(chapterPayload.frameIds)
          ? chapterPayload.frameIds
          : [];

      enqueueNodeUpdate(currentNodes => {
        const chapterIndex = currentNodes.findIndex(
          node =>
            node.type === "chapter" &&
            (((node.data as ChapterNodeData)?.id || node.id) === chapterId)
        );

        if (chapterIndex !== -1) {
          return currentNodes;
        }

        const anchorFrame = nodesRef.current.find(
          node => node.type === "aiframe" && frameIds.includes(node.data?.frameId)
        );

        const fallbackIndex = currentNodes.filter(node => node.type === "chapter").length;
        const column = fallbackIndex % 3;
        const row = Math.floor(fallbackIndex / 3);

        const basePosition = anchorFrame
          ? {
              x: anchorFrame.position.x,
              y: anchorFrame.position.y - 220,
            }
          : {
              x: column * 360 + 120,
              y: row * 240 + 120,
            };

        const chapterData: ChapterNodeData = {
          type: "chapter",
          id: chapterId,
          title: chapterPayload.title || "New Chapter",
          description: chapterPayload.description || "",
          frameIds,
          conceptIds: Array.isArray(chapterPayload.conceptIds) ? chapterPayload.conceptIds : [],
          order: typeof chapterPayload.order === "number" ? chapterPayload.order : fallbackIndex,
          color: chapterPayload.color || DEFAULT_CHAPTER_COLOR,
          linkSequentially: chapterPayload.linkSequentially ?? false,
          onChapterUpdate: (updates: ChapterNodeUpdates) => handleChapterUpdate(chapterId, updates),
        };

        boundChapterUpdateHandlers.current.add(chapterId);

        const newNode: Node = {
          id: chapterId,
          type: "chapter",
          position: basePosition,
          data: chapterData,
        };

        const nextNodes = [...currentNodes, newNode];

        const freshGraphState = {
          nodes: nextNodes,
          edges: edgesRef.current,
          selectedNodeId: selectedNodeRef.current,
        };

        emitGraphStateChange("chapter-sync-event", { chapterId }, freshGraphState);

        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("force-save-frames", {
              detail: {
                reason: "chapter-sync-event",
                timestamp: Date.now(),
                graphState: freshGraphState,
              },
            })
          );
        }

        return nextNodes;
      });
    };

    const handleChapterFramesUpdated = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const chapterId: string | undefined = detail.chapterId;
      const frames: string[] | undefined = detail.frameIds;
      if (!chapterId || !frames) {
        return;
      }

      enqueueNodeUpdate(currentNodes =>
        currentNodes.map(node => {
          if (
            node.type === "chapter" &&
            ((node.data as ChapterNodeData)?.id || node.id) === chapterId
          ) {
            return {
              ...node,
              data: {
                ...(node.data as ChapterNodeData),
                frameIds: frames,
              },
            };
          }
          return node;
        })
      );
    };

    window.addEventListener("graph-chapter-sync", handleExternalChapterSync as EventListener);
    window.addEventListener(
      "chapter-frames-updated",
      handleChapterFramesUpdated as EventListener
    );
    return () => {
      window.removeEventListener("graph-chapter-sync", handleExternalChapterSync as EventListener);
      window.removeEventListener(
        "chapter-frames-updated",
        handleChapterFramesUpdated as EventListener
      );
    };
  }, [emitGraphStateChange, handleChapterUpdate, setNodes]);

  // Ensure chapter ↔ frame connections reflect sidebar assignments
  useEffect(() => {
    const currentNodes = nodesRef.current;
    const currentEdges = edgesRef.current;

    if (!Array.isArray(chapters) || chapters.length === 0 || !currentNodes?.length) {
      return;
    }

    const chapterNodeMap = new Map<string, Node>();
    const frameNodeMap = new Map<string, Node>();

    currentNodes.forEach(node => {
      if (node.type === 'chapter') {
        const chapterId = (node.data as ChapterNodeData)?.id || node.id;
        if (chapterId) {
          chapterNodeMap.set(chapterId, node);
        }
      } else if (node.type === 'aiframe' && node.data?.frameId) {
        frameNodeMap.set(node.data.frameId, node);
      }
    });

    if (chapterNodeMap.size === 0 || frameNodeMap.size === 0) {
      return;
    }

    const requiredMembership = new Map<string, { chapter: Node; frame: Node; chapterId: string }>();
    const requiredSequence = new Map<string, { source: Node; target: Node; chapterId: string }>();

    chapters.forEach(chapter => {
      const chapterId = chapter.id;
      if (!chapterId) {
        return;
      }
      const chapterNode = chapterNodeMap.get(chapterId);
      if (!chapterNode) {
        return;
      }

      const frameIds = Array.isArray(chapter.frameIds) ? chapter.frameIds : [];
      const pendingAttachmentIds = pendingAttachmentNodeIdsRef.current;
      frameIds.forEach(frameId => {
        const frameNode = frameNodeMap.get(frameId);
        if (!frameNode) {
          return;
        }
        requiredMembership.set(`${chapterNode.id}->${frameNode.id}`, { chapter: chapterNode, frame: frameNode, chapterId });
      });

      if (chapter.linkSequentially && frameIds.length > 1) {
        for (let i = 0; i < frameIds.length - 1; i += 1) {
          const sourceNode = frameNodeMap.get(frameIds[i]);
          const targetNode = frameNodeMap.get(frameIds[i + 1]);
          if (!sourceNode || !targetNode) {
            continue;
          }
          requiredSequence.set(`${sourceNode.id}->${targetNode.id}`, { source: sourceNode, target: targetNode, chapterId });
        }
      }
    });

    const nextEdges: Edge[] = [];
    let changed = false;

    const seenMembershipKeys = new Set<string>();

    (currentEdges || []).forEach((edge: ExtendedEdge) => {
      const relationship = edge.data?.relationship;
      if (relationship === 'chapter-membership') {
        const key = `${edge.source}->${edge.target}`;
        if (requiredMembership.has(key)) {
          const desiredStyle = CHAPTER_MEMBERSHIP_STYLE;
          const desiredMarker = CHAPTER_MEMBERSHIP_MARKER;
          const desiredTargetHandle = 'chapter-frame-in';
          const needsUpdate =
            edge.sourceHandle !== 'chapter-frame-out' ||
            edge.targetHandle !== desiredTargetHandle ||
            JSON.stringify(edge.style) !== JSON.stringify(desiredStyle) ||
            JSON.stringify(edge.markerEnd) !== JSON.stringify(desiredMarker);
          if (needsUpdate) {
            changed = true;
            nextEdges.push({
              ...edge,
              sourceHandle: 'chapter-frame-out',
              targetHandle: desiredTargetHandle,
              style: desiredStyle,
              markerEnd: desiredMarker,
            });
          } else {
            nextEdges.push(edge);
          }
          requiredMembership.delete(key);
        } else {
          changed = true;
        }
        return;
      }

      const rawMembership =
        edge.sourceHandle === 'chapter-frame-out' &&
        edge.targetHandle === 'chapter-frame-in';

      if (rawMembership) {
        const key = `${edge.source}->${edge.target}`;
        if (requiredMembership.has(key) && !seenMembershipKeys.has(key)) {
          seenMembershipKeys.add(key);
          const desiredStyle = CHAPTER_MEMBERSHIP_STYLE;
          const desiredMarker = CHAPTER_MEMBERSHIP_MARKER;
          changed = true;
          nextEdges.push({
            ...edge,
            style: desiredStyle,
            markerEnd: desiredMarker,
            data: { ...(edge.data || {}), relationship: 'chapter-membership' },
          });
          requiredMembership.delete(key);
        }
        return;
      }

      if (relationship === 'chapter-sequence') {
        const key = `${edge.source}->${edge.target}`;
        if (requiredSequence.has(key)) {
          const desiredSourceHandle = 'frame-sequence-out';
          const desiredTargetHandle = 'chapter-frame-in';
          const desiredStyle = SEQUENTIAL_EDGE_STYLE;
          const desiredMarker = SEQUENTIAL_EDGE_MARKER;
          const needsUpdate =
            edge.sourceHandle !== desiredSourceHandle ||
            edge.targetHandle !== desiredTargetHandle ||
            edge.type !== 'smoothstep' ||
            JSON.stringify(edge.style) !== JSON.stringify(desiredStyle) ||
            JSON.stringify(edge.markerEnd) !== JSON.stringify(desiredMarker);

          if (needsUpdate) {
            changed = true;
            nextEdges.push({
              ...edge,
              sourceHandle: desiredSourceHandle,
              targetHandle: desiredTargetHandle,
              type: 'smoothstep',
              style: desiredStyle,
              markerEnd: desiredMarker,
            });
          } else {
            nextEdges.push(edge);
          }

          requiredSequence.delete(key);
        } else {
          changed = true;
        }
        return;
      }

      nextEdges.push(edge);
    });

    requiredMembership.forEach(({ chapter, frame, chapterId }) => {
      changed = true;
      nextEdges.push({
        id: `edge|chapter|${chapter.id}|${frame.id}`,
        source: chapter.id,
        target: frame.id,
        sourceHandle: 'chapter-frame-out',
        targetHandle: 'chapter-frame-in',
        type: 'smoothstep',
        style: CHAPTER_MEMBERSHIP_STYLE,
        markerEnd: CHAPTER_MEMBERSHIP_MARKER,
        data: { relationship: 'chapter-membership', chapterId },
      });
    });

    requiredSequence.forEach(({ source, target, chapterId }) => {
      changed = true;
      nextEdges.push({
        id: `edge|seq|${source.id}|${target.id}`,
        source: source.id,
        target: target.id,
        sourceHandle: 'frame-sequence-out',
        targetHandle: 'chapter-frame-in',
        type: 'smoothstep',
        style: SEQUENTIAL_EDGE_STYLE,
        markerEnd: SEQUENTIAL_EDGE_MARKER,
        data: { relationship: 'chapter-sequence', chapterId },
      });
    });

    if (!changed) {
      return;
    }

    setEdges(nextEdges);

    const freshGraphState = {
      nodes: nodesRef.current,
      edges: nextEdges,
      selectedNodeId: selectedNodeRef.current,
    };

    emitGraphStateChange('chapter-edges-synced', {
      membershipAdded: requiredMembership.size,
      sequenceAdded: requiredSequence.size,
    }, freshGraphState);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('force-save-frames', {
        detail: {
          reason: 'chapter-edges-synced',
          timestamp: Date.now(),
          graphState: freshGraphState,
        }
      }));
    }
  }, [chapters, nodes, emitGraphStateChange, setEdges]);

  useEffect(() => {
    let patchedFlag = false;
    let updatedNodes: Node[] | null = null;

    setNodes(currentNodes => {
      let localPatched = false;

      const nextNodes = currentNodes.map(node => {
        if (node.type !== 'chapter') {
          return node;
        }

        const nodeData = node.data as ChapterNodeData;
        const chapterId = nodeData?.id || node.id;
        const handlerBound = boundChapterUpdateHandlers.current.has(chapterId);
        const hasHandler = typeof nodeData?.onChapterUpdate === 'function';
        const needsHandler = !hasHandler || !handlerBound;
        const needsId = nodeData?.id !== chapterId;

        if (!needsHandler && !needsId) {
          boundChapterUpdateHandlers.current.add(chapterId);
          return node;
        }

        localPatched = true;
        const handler = (updates: ChapterNodeUpdates) => handleChapterUpdate(chapterId, updates);
        boundChapterUpdateHandlers.current.add(chapterId);

        return {
          ...node,
          data: {
            ...nodeData,
            id: chapterId,
            frameIds: Array.isArray(nodeData?.frameIds) ? nodeData.frameIds : [],
            conceptIds: Array.isArray(nodeData?.conceptIds) ? nodeData.conceptIds : [],
            onChapterUpdate: handler,
          },
        };
      });

      if (localPatched) {
        patchedFlag = true;
        updatedNodes = nextNodes;
        return nextNodes;
      }

      return currentNodes;
    });

    if (patchedFlag && updatedNodes) {
      const freshGraphState = {
        nodes: updatedNodes,
        edges: edgesRef.current,
        selectedNodeId: selectedNodeRef.current,
      };

      emitGraphStateChange('chapter-sync', { chapters }, freshGraphState);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: 'chapter-sync',
            timestamp: Date.now(),
            graphState: freshGraphState,
          }
        }));
      }
    }
  }, [chapters, emitGraphStateChange, handleChapterUpdate, setNodes]);

  const normalizeConceptValue = useCallback((conceptNode: any): string => {
    if (!conceptNode?.data) return '';
    return (
      conceptNode.data.concept ||
      conceptNode.data.title ||
      conceptNode.data.label ||
      ''
    ).trim();
  }, []);

  const handleAttachConceptToFrame = useCallback((frameId: string, conceptValue: string) => {
    if (!conceptValue) {
      return;
    }

    const currentFrames = framesRef.current;
    const updatedFrames = currentFrames.map((frame) => {
      if (frame.id !== frameId) {
        return frame;
      }

      const nextConcepts = Array.from(new Set([...(frame.conceptIds || frame.aiConcepts || []), conceptValue]))
        .filter(Boolean);

      return {
        ...frame,
        conceptIds: nextConcepts,
        aiConcepts: Array.from(new Set([...(frame.aiConcepts || []), ...nextConcepts])),
        updatedAt: new Date().toISOString(),
      };
    });

    invokeOnFramesChange(updatedFrames);
  }, [invokeOnFramesChange]);

  const handleDetachConceptFromFrame = useCallback((frameId: string, conceptValue: string) => {
    if (!conceptValue) {
      return;
    }

    const currentFrames = framesRef.current;
    const updatedFrames = currentFrames.map((frame) => {
      if (frame.id !== frameId) {
        return frame;
      }

      const remainingConcepts = (frame.conceptIds || frame.aiConcepts || [])
        .filter((concept: string) => concept !== conceptValue);

      return {
        ...frame,
        conceptIds: remainingConcepts,
        aiConcepts: remainingConcepts,
        updatedAt: new Date().toISOString(),
      };
    });

    invokeOnFramesChange(updatedFrames);
  }, [invokeOnFramesChange]);

  // Handle concept attachment to chapters
  const ensureChapterRecord = useCallback(
    (chapterId: string): { chapter: AiChapter; index: number } | null => {
      const existingChapters = chaptersRef.current || [];
      const existingIndex = existingChapters.findIndex(chapter => chapter.id === chapterId);
      if (existingIndex !== -1) {
        return { chapter: existingChapters[existingIndex], index: existingIndex };
      }

      const chapterNode = nodesRef.current.find(
        node => node.type === 'chapter' && ((node.data as ChapterNodeData)?.id || node.id) === chapterId
      );

      if (!chapterNode) {
        console.warn('⚠️ Missing chapter node for id', chapterId);
        return null;
      }

      const nodeData = chapterNode.data as ChapterNodeData;
      const now = new Date().toISOString();
      const fallbackOrder =
        typeof nodeData?.order === 'number'
          ? nodeData.order
          : existingChapters.length;

      const newChapter: AiChapter = {
        id: chapterId,
        title: nodeData?.title || 'New Chapter',
        description: nodeData?.description || '',
        frameIds: [],
        conceptIds: [],
        order: fallbackOrder,
        color: nodeData?.color || DEFAULT_CHAPTER_COLOR,
        createdAt: now,
        updatedAt: now,
        linkSequentially: nodeData?.linkSequentially ?? false,
        bubblSpaceId: undefined,
        timeCapsuleId: undefined,
      };

      const nextChapters = [...existingChapters, newChapter];
      chaptersRef.current = nextChapters;
      invokeOnChaptersChange(nextChapters);
      return { chapter: newChapter, index: nextChapters.length - 1 };
    },
    [invokeOnChaptersChange]
  );

  const handleAttachConceptToChapter = useCallback((chapterId: string, conceptValue: string) => {
    if (!conceptValue) {
      return;
    }

    const record = ensureChapterRecord(chapterId);
    if (!record) {
      return;
    }

    const { chapter, index } = record;
    const currentChapters = chaptersRef.current || [];
    const existingConcepts = Array.isArray(chapter.conceptIds) ? chapter.conceptIds : [];

    if (existingConcepts.includes(conceptValue)) {
      return;
    }

    const nextChapters = [...currentChapters];
    nextChapters[index] = {
      ...chapter,
      conceptIds: [...existingConcepts, conceptValue],
      updatedAt: new Date().toISOString(),
    };

    chaptersRef.current = nextChapters;
    invokeOnChaptersChange(nextChapters);
  }, [invokeOnChaptersChange, ensureChapterRecord]);

  // Handle concept detachment from chapters
  const handleDetachConceptFromChapter = useCallback((chapterId: string, conceptValue: string) => {
    if (!conceptValue) {
      return;
    }

    const record = ensureChapterRecord(chapterId);
    if (!record) {
      return;
    }

    const { chapter, index } = record;
    const currentChapters = chaptersRef.current || [];
    const remainingConcepts = (chapter.conceptIds || []).filter(
      (concept) => concept !== conceptValue
    );

    const nextChapters = [...currentChapters];
    nextChapters[index] = {
      ...chapter,
      conceptIds: remainingConcepts,
      updatedAt: new Date().toISOString(),
    };

    chaptersRef.current = nextChapters;
    invokeOnChaptersChange(nextChapters);
  }, [invokeOnChaptersChange, ensureChapterRecord]);

  const handleAttachFrameToChapter = useCallback((chapterId: string, frameId: string) => {
    if (!chapterId || !frameId) {
      return;
    }

    const record = ensureChapterRecord(chapterId);
    if (!record) {
      return;
    }

    const { chapter, index: chapterIndex } = record;
    const currentChapters = chaptersRef.current || [];
    const existingFrameIds = Array.isArray(chapter.frameIds) ? chapter.frameIds : [];
    if (existingFrameIds.includes(frameId)) {
      return;
    }

    const nextFrameIds = [...existingFrameIds, frameId];
    const updatedChapter = {
      ...chapter,
      frameIds: nextFrameIds,
      updatedAt: new Date().toISOString(),
    };

    const nextChapters = [...(chaptersRef.current || currentChapters)];
    nextChapters[chapterIndex] = updatedChapter;
    chaptersRef.current = nextChapters;
    invokeOnChaptersChange(nextChapters);

    const updatedFrames = framesRef.current.map(frame => {
      if (frame.id === frameId) {
        return {
          ...frame,
          chapterId,
          parentFrameId: chapterId,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });
    framesRef.current = updatedFrames;
    invokeOnFramesChange(updatedFrames);

    setNodes(currentNodes =>
      currentNodes.map(node => {
        if (node.data?.frameId === frameId) {
          return {
            ...node,
            data: {
              ...node.data,
              chapterId,
              parentFrameId: chapterId,
            },
          };
        }
        return node;
      })
    );
  }, [invokeOnChaptersChange, invokeOnFramesChange, ensureChapterRecord]);

  const handleDetachFrameFromChapter = useCallback((chapterId: string, frameId: string) => {
    if (!chapterId || !frameId) {
      return;
    }

    const record = ensureChapterRecord(chapterId);
    if (!record) {
      return;
    }

    const { chapter, index: chapterIndex } = record;
    const currentChapters = chaptersRef.current || [];
    const existingFrameIds = Array.isArray(chapter.frameIds) ? chapter.frameIds : [];
    if (!existingFrameIds.includes(frameId)) {
      return;
    }

    const nextFrameIds = existingFrameIds.filter(id => id !== frameId);
    const updatedChapter = {
      ...chapter,
      frameIds: nextFrameIds,
      updatedAt: new Date().toISOString(),
    };

    const nextChapters = [...(chaptersRef.current || currentChapters)];
    nextChapters[chapterIndex] = updatedChapter;
    chaptersRef.current = nextChapters;
    invokeOnChaptersChange(nextChapters);

    const updatedFrames = framesRef.current.map(frame => {
      if (frame.id === frameId && frame.chapterId === chapterId) {
        return {
          ...frame,
          chapterId: undefined,
          parentFrameId: undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });
    framesRef.current = updatedFrames;
    invokeOnFramesChange(updatedFrames);

    setNodes(currentNodes =>
      currentNodes.map(node => {
        if (node.data?.frameId === frameId && node.data?.chapterId === chapterId) {
          return {
            ...node,
            data: {
              ...node.data,
              chapterId: undefined,
              parentFrameId: undefined,
            },
          };
        }
        return node;
      })
    );
  }, [invokeOnChaptersChange, invokeOnFramesChange, ensureChapterRecord]);

  // Handle concept updates (edit name/description)
  const handleConceptUpdate = useCallback((nodeId: string, updates: { concept: string; description?: string }) => {
    const conceptNode = nodesRef.current.find(n => n.id === nodeId);
    if (!conceptNode || conceptNode.type !== 'concept') {
      return;
    }

    const oldConceptName = conceptNode.data?.concept;
    const newConceptName = updates.concept;
    const conceptNameChanged = oldConceptName !== newConceptName;

    let updatedNodes: any[] = [];

    // Update the concept node in the graph
    setNodesRef.current((nds) => {
      updatedNodes = nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              concept: newConceptName,
              description: updates.description,
            },
          };
        }
        return node;
      });
      return updatedNodes;
    });

    // If concept name changed, update all references in frames and chapters
    if (conceptNameChanged) {
      const currentFrames = framesRef.current;
      const updatedFrames = currentFrames.map((frame) => {
        const hasOldConcept = frame.conceptIds?.includes(oldConceptName) || frame.aiConcepts?.includes(oldConceptName);

        if (hasOldConcept) {
          return {
            ...frame,
            conceptIds: frame.conceptIds?.map((c: string) => c === oldConceptName ? newConceptName : c),
            aiConcepts: frame.aiConcepts?.map((c: string) => c === oldConceptName ? newConceptName : c),
            updatedAt: new Date().toISOString(),
          };
        }
        return frame;
      });

      invokeOnFramesChange(updatedFrames);
    }

    // Update concept references in chapters
    if (conceptNameChanged) {
      const currentChapters = chaptersRef.current || [];
      const updatedChapters = currentChapters.map((chapter) => {
        const hasOldConcept = chapter.conceptIds?.includes(oldConceptName);

        if (hasOldConcept) {
          return {
            ...chapter,
            conceptIds: chapter.conceptIds?.map((c: string) => c === oldConceptName ? newConceptName : c),
            updatedAt: new Date().toISOString(),
          };
        }
        return chapter;
      });

      invokeOnChaptersChange(updatedChapters);
    }

    // CRITICAL FIX: Emit graph state change and force save to ensure concept name is saved
    setTimeout(() => {
      const freshGraphState = {
        nodes: nodesRef.current,
        edges: edgesRef.current,
        selectedNodeId: selectedNodeRef.current,
      };
      emitGraphStateChange('concept-updated', { nodeId, oldConceptName, newConceptName }, freshGraphState);

      // CRITICAL FIX: Dispatch force-save event to trigger immediate save (mirrors chapter update pattern)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: 'concept-updated',
            timestamp: Date.now(),
            graphState: freshGraphState,
          }
        }));
      }
    }, 50); // Small delay to ensure refs are updated
  }, [invokeOnFramesChange, invokeOnChaptersChange, emitGraphStateChange, setNodes]);

  // Handle concept deletion
  const handleConceptDelete = useCallback((nodeId: string) => {
    const conceptNode = nodesRef.current.find(n => n.id === nodeId);
    if (!conceptNode || conceptNode.type !== 'concept') {
      return;
    }

    const conceptName = conceptNode.data?.concept;

    // Remove concept from all frames
    if (conceptName) {
      const currentFrames = framesRef.current;
      const updatedFrames = currentFrames.map((frame) => {
        const hasThisConcept = frame.conceptIds?.includes(conceptName) || frame.aiConcepts?.includes(conceptName);

        if (hasThisConcept) {
          return {
            ...frame,
            conceptIds: frame.conceptIds?.filter((c: string) => c !== conceptName),
            aiConcepts: frame.aiConcepts?.filter((c: string) => c !== conceptName),
            updatedAt: new Date().toISOString(),
          };
        }
        return frame;
      });

      invokeOnFramesChange(updatedFrames);
    }

    // Remove concept from all chapters
    if (conceptName) {
      const currentChapters = chaptersRef.current || [];
      const updatedChapters = currentChapters.map((chapter) => {
        const hasThisConcept = chapter.conceptIds?.includes(conceptName);

        if (hasThisConcept) {
          return {
            ...chapter,
            conceptIds: chapter.conceptIds?.filter((c: string) => c !== conceptName),
            updatedAt: new Date().toISOString(),
          };
        }
        return chapter;
      });

      invokeOnChaptersChange(updatedChapters);
    }

    // Remove the node from the graph
    setNodesRef.current((nds) => nds.filter((node) => node.id !== nodeId));

    // CRITICAL FIX: Emit graph state change and force save to ensure concept deletion is saved
    setTimeout(() => {
      const freshGraphState = {
        nodes: nodesRef.current,
        edges: edgesRef.current,
        selectedNodeId: selectedNodeRef.current,
      };
      emitGraphStateChange('concept-deleted', { nodeId, conceptName }, freshGraphState);

      // CRITICAL FIX: Dispatch force-save event to trigger immediate save (mirrors chapter update pattern)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: 'concept-deleted',
            timestamp: Date.now(),
            graphState: freshGraphState,
          }
        }));
      }
    }, 50); // Small delay to ensure refs are updated
  }, [invokeOnFramesChange, invokeOnChaptersChange, emitGraphStateChange, setNodes]);

  // REAL-TIME SYNC: Update concept nodes with latest frames/chapters data
  useEffect(() => {
    setNodes((currentNodes) => {
      const conceptNodes = currentNodes.filter(n => n.type === 'concept');
      if (conceptNodes.length === 0) return currentNodes;

      let needsUpdate = false;

      const nextNodes = currentNodes.map((node) => {
        if (node.type !== 'concept') return node;

        // Always reattach callbacks to ensure they're fresh
        const callbacksMissing = !node.data?.onConceptUpdate || !node.data?.onConceptDelete;
        const framesChanged = node.data?.frames !== frames;
        const chaptersChanged = node.data?.chapters !== chapters;

        if (callbacksMissing || framesChanged || chaptersChanged) {
          needsUpdate = true;
          return {
            ...node,
            data: {
              ...node.data,
              onConceptUpdate: handleConceptUpdate,
              onConceptDelete: handleConceptDelete,
              frames: frames,
              chapters: chapters,
            },
          };
        }

        return node;
      });

      return needsUpdate ? nextNodes : currentNodes;
    });
  }, [frames, chapters, handleConceptUpdate, handleConceptDelete, setNodes]);

  // CRITICAL FIX: Ensure initialGraphState nodes are properly displayed
  useEffect(() => {
    // If initialGraphState was provided with nodes, merge them with existing nodes
    // This ensures standalone attachment nodes persist even when frame nodes exist
    if (initialGraphState?.nodes?.length) {
      const currentFrameIds = new Set(frames.map(frame => frame.id));
      const currentChapterIds = new Set(
        (chapters || [])
          .map(chapter => chapter?.id)
          .filter((id): id is string => typeof id === 'string' && id.length > 0)
      );
      const existingNodeIds = new Set(nodes.map(node => node.id));
      const existingFrameIds = new Set(
        nodes
          .filter(node => node.type === 'aiframe' && node.data?.frameId)
          .map(node => node.data.frameId)
      );

      const frameAttachmentIds = new Map<string, Set<string>>();
      frames.forEach(frame => {
        if (!frame || !frame.id) {
          return;
        }
        const existing = frameAttachmentIds.get(frame.id) ?? new Set<string>();
        const attachmentId = frame.attachment?.id;
        if (attachmentId) {
          existing.add(attachmentId);
        }
        const fallbackAttachmentId = (frame as any)?.attachmentNodeId || frame.attachment?.data?.nodeId;
        if (fallbackAttachmentId) {
          existing.add(fallbackAttachmentId);
        }
        if (existing.size > 0) {
          frameAttachmentIds.set(frame.id, existing);
        }
      });

      const chapterIds = new Set(
        (chapters || [])
          .map(chapter => chapter?.id)
          .filter((id): id is string => typeof id === 'string' && id.length > 0)
      );

      // Collect nodes from initialGraphState that are not already on the canvas
      const loadedNodes = initialGraphState.nodes.filter(node => !existingNodeIds.has(node.id));

      const skippedFrameIds = new Set<string>();
      const skippedAttachmentIds = new Set<string>();
      const skippedChapterIds = new Set<string>();
      const filteredLoadedNodes = loadedNodes.filter(node => {
        if (node.type === 'aiframe' && node.data?.frameId) {
          const frameId = node.data.frameId;
          
          // CRITICAL FIX: Skip recently deleted frames to prevent re-merge
          if (recentlyDeletedFrameIdsRef.current.has(frameId)) {
            skippedFrameIds.add(frameId);
            return false;
          }
          
          if (!currentFrameIds.has(frameId)) {
            skippedFrameIds.add(frameId);
            return false;
          }
          if (existingFrameIds.has(frameId)) {
            return false;
          }
        }

        if (node.type?.includes('-attachment')) {
          // Check both possible field names (graphState uses frameId, auto-gen uses attachedToFrameId)
          const frameId = node.data?.frameId || node.data?.attachedToFrameId;
          
          // NEW: Check if an attachment for this frame already exists (by frameId match)
          const attachmentForFrameExists = nodes.some(n => 
            n.type?.includes('attachment') && 
            (n.data?.frameId === frameId || n.data?.attachedToFrameId === frameId)
          );
          
          if (attachmentForFrameExists) {
            // Skip this attachment - auto-generation already created one for this frame
            if (frameId) {
              skippedAttachmentIds.add(frameId);
            }
            return false;
          }
          
          // Keep existing logic below for other attachment checks
          const parentFrameId = node.data?.attachedToFrameId;
          if (!parentFrameId) {
            return true;
          }

          const attachmentNodeKey =
            node.id ||
            node.data?.id ||
            node.data?.attachmentId ||
            node.data?.attachment?.id;

          const allowedAttachmentIds = parentFrameId ? frameAttachmentIds.get(parentFrameId) : undefined;
          const attachmentStillExists =
            !!allowedAttachmentIds &&
            attachmentNodeKey &&
            allowedAttachmentIds.has(attachmentNodeKey);

          const shouldMerge =
            currentFrameIds.has(parentFrameId) &&
            attachmentStillExists;

          if (!shouldMerge) {
            if (attachmentNodeKey) {
              skippedAttachmentIds.add(attachmentNodeKey);
            } else if (parentFrameId) {
              skippedFrameIds.add(parentFrameId);
            }
            return false;
          }
        }

        if (node.type === 'chapter') {
          const chapterId = node.data?.id || node.id;
          if (!chapterId || !chapterIds.has(chapterId)) {
            if (chapterId) {
              skippedChapterIds.add(chapterId);
            }
            return false;
          }
        }

        return true;
      });

      if (filteredLoadedNodes.length > 0) {
        const mergedNodes = [...nodes, ...filteredLoadedNodes];
        const mergedNodeIds = new Set(mergedNodes.map(node => node.id));
        const mergedEdges = (initialGraphState.edges || []).filter(
          edge => mergedNodeIds.has(edge.source) && mergedNodeIds.has(edge.target)
        );

        console.log('🧪 Graph merge from initialGraphState', {
          existingNodeCount: nodes.length,
          incomingNodeIds: loadedNodes.map(node => node.id),
          appendedNodeIds: filteredLoadedNodes.map(node => node.id),
          skippedFrameIds: Array.from(skippedFrameIds),
          skippedAttachmentIds: Array.from(skippedAttachmentIds),
          skippedChapterIds: Array.from(skippedChapterIds),
          frameCount: frames.length,
          chapterCount: chapters.length
        });

        setNodes(mergedNodes);
        setEdges(mergedEdges);
        return;
      }
    }

    // Only sync if we have frames and no nodes currently displayed
    // Allow using saved positions from initialGraphState even if it exists
    if (frames.length > 0 && nodes.length === 0) {
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      
      frames.forEach((frame, index) => {
        // Check if this frame has a saved position in initialGraphState
        const savedNode = initialGraphState?.nodes?.find(n => n.data?.frameId === frame.id);
        const nodeId = savedNode?.id || getId(); // Preserve saved node ID

        // Use saved position if available, otherwise use default layout
        const x = savedNode?.position?.x ?? (index * 500); // More space for enhanced nodes
        const y = savedNode?.position?.y ?? 100;
        
        // CRITICAL FIX: Preserve loaded frame content - only use defaults for undefined/null values
        const safeFrameData = {
          title: frame.title != null ? frame.title : `Frame ${index + 1}`,
          goal: frame.goal != null ? frame.goal : 'Define your learning goal...',
          informationText: frame.informationText != null ? frame.informationText : 'Add context and background information...',
          afterVideoText: frame.afterVideoText != null ? frame.afterVideoText : 'Key takeaways and next steps...',
        };

        // Create enhanced AI frame node with validated content
        const frameNode: Node = {
          id: nodeId,
          type: "aiframe",
          position: { x, y },
          data: {
            type: "aiframe",
            frameId: frame.id,
            title: safeFrameData.title,
            goal: safeFrameData.goal,
            informationText: safeFrameData.informationText,
            afterVideoText: safeFrameData.afterVideoText,
            aiConcepts: frame.aiConcepts || [],
            isGenerated: frame.isGenerated,
            sourceGoal: frame.sourceGoal,
            sourceUrl: frame.sourceUrl,
            chapterId: frame.chapterId || frame.parentFrameId,
            parentFrameId: frame.parentFrameId || frame.chapterId,
            // Enhanced: Include attachment if exists
            attachment: frame.attachment,
            onFrameUpdate: handleFrameUpdate,
            onAttachContent: handleAttachContent,
            onDetachContent: handleDetachContent,
          },
        };

        newNodes.push(frameNode);
        
        // If frame has attachment, create the attachment node
        if (frame.attachment) {
          // Check for saved attachment node position
          const savedAttachmentNode = initialGraphState?.nodes?.find(n =>
            n.data?.attachmentId === frame.attachment?.id ||
            n.data?.frameId === frame.id && n.type?.includes('attachment')
          );
          const attachmentNodeId = savedAttachmentNode?.id || frame.attachment.id || getId();
          
          // Helper to avoid double -attachment suffix
          const getAttachmentNodeType = (attachmentType: string): string => {
            if (attachmentType === 'pdf-kb') {
              return 'pdf-attachment';
            }
            // Don't add suffix if already present
            if (attachmentType.endsWith('-attachment')) {
              return attachmentType;
            }
            return `${attachmentType}-attachment`;
          };
          
          const nodeType = getAttachmentNodeType(frame.attachment.type);
          const attachmentNode: Node = {
            id: attachmentNodeId,
            type: nodeType,
            position: savedAttachmentNode?.position || { x: x + 420, y: y }, // Use saved position or default to the right
            data: createAttachmentNodeData(frame.attachment, frame.id)
          };
          
          newNodes.push(attachmentNode);
          
          // Create attachment edge with unique ID
          newEdges.push({
            id: `edge|${attachmentNodeId}|${nodeId}|attachment`,
            source: attachmentNodeId,
            target: nodeId,
            targetHandle: "attachment-slot",
            type: "straight",
            style: { stroke: "#f97316", strokeWidth: 3 }, // Orange attachment connection
          });
        }
        
        // FIXED: Don't auto-create sequential connections between independent frames
        // Users should manually connect frames if they want relationships
        // This was causing unwanted connections when dragging independent frames
        // if (index > 0) {
        //   const prevNodeId = newNodes[index * (frame.attachment ? 2 : 1) - (frame.attachment ? 2 : 1)].id;
        //   newEdges.push({
        //     id: `${prevNodeId}-${nodeId}`,
        //     source: prevNodeId,
        //     target: nodeId,
        //     type: "straight",
        //     style: { stroke: "#3b82f6", strokeWidth: 2 }, // Blue sequential connection
        //   });
        // }
      });

      // Restore any saved edges from initialGraphState that aren't already in newEdges
      const savedEdges = initialGraphState?.edges || [];
      const edgeMap = new Map(newEdges.map(e => [e.id, e]));

      // Add saved edges that still have valid source and target nodes
      const nodeIdSet = new Set(newNodes.map(n => n.id));
      savedEdges.forEach(savedEdge => {
        if (!edgeMap.has(savedEdge.id) &&
            nodeIdSet.has(savedEdge.source) &&
            nodeIdSet.has(savedEdge.target)) {
          newEdges.push(savedEdge);
        }
      });

      setNodes(newNodes);
      setEdges(newEdges);

      // CRITICAL FIX: Save graph state after creating nodes from frames
      if (newNodes.length > 0) {
        setTimeout(() => {
          emitGraphStateChange('frames-to-nodes-sync', {
            syncedFrameCount: frames.length,
            createdNodeCount: newNodes.length
          });
        }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
      }
    }
  }, [frames, nodes.length, initialGraphState, handleFrameUpdate, handleAttachContent, handleDetachContent]);

  // CRITICAL FIX: Update nodes when initialGraphState changes (e.g., after TimeCapsule restore)
  // REMOVED: Problematic useEffect that caused infinite re-rendering
  // The initial state is already properly handled by useNodesState and useEdgesState

  // AUTO-LAYOUT FIX: Listen for auto-layout event and apply positions
  useEffect(() => {
    const handleAutoLayoutApplied = (event: CustomEvent) => {
      console.log('🎨 React Flow: Auto-layout event received', event.detail);

      // Try to get graph state from event detail first, then fall back to initialGraphState
      const graphState = event.detail?.graphState || initialGraphState;

      if (!graphState?.nodes || graphState.nodes.length === 0) {
        console.log('⚠️ No graph nodes to apply');
        return;
      }

      console.log('🎨 React Flow: Applying auto-layout positions', {
        nodeCount: graphState.nodes.length,
        edgeCount: graphState.edges?.length || 0,
        source: event.detail?.graphState ? 'event' : 'initialGraphState'
      });

      setNodes(graphState.nodes);
      if (graphState.edges) {
        setEdges(graphState.edges);
      }

      // Animate viewport to show new layout after a brief delay
      // BUT: Skip if we're restoring a saved viewport
      const shouldFitView =
        reactFlowInstance &&
        (event.detail?.forceFitView === true || !initialGraphState?.viewport);

      if (shouldFitView) {
        setTimeout(() => {
          reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
          console.log('✅ Auto-layout viewport updated');
        }, 150);
      }
    };

    window.addEventListener('graph-layout-applied', handleAutoLayoutApplied as EventListener);
    return () => window.removeEventListener('graph-layout-applied', handleAutoLayoutApplied as EventListener);
  }, [initialGraphState, reactFlowInstance, setNodes, setEdges]);

  // VIEWPORT RESTORATION: Restore saved viewport when graph loads (simplified approach)
  useEffect(() => {
    if (!reactFlowInstance || !initialGraphState?.viewport) return;

    // Only restore on initial mount
    const timeout = setTimeout(() => {
      reactFlowInstance.setViewport(initialGraphState.viewport);
      console.log('✅ Viewport restored:', initialGraphState.viewport);
    }, 300);

    return () => clearTimeout(timeout);
  }, [reactFlowInstance, initialGraphState?.viewport]);

  // CRITICAL FIX: Sync existing nodes with updated frame data when frames prop changes
  useEffect(() => {
    if (isFilteringNodesRef.current) {
      return;
    }

    const currentNodes = nodesRef.current || [];
    if (currentNodes.length === 0) {
      return;
    }

    if (currentNodes.some(node => node.dragging === true)) {
      return;
    }

    const frameIds = new Set(frames.map(f => f.id));
    const framesById = new Map(frames.map(frame => [frame.id, frame]));

    const frameAttachmentIds = new Map<string, Set<string>>();
    frames.forEach(frame => {
      if (!frame || !frame.id) {
        return;
      }
      const existing = frameAttachmentIds.get(frame.id) ?? new Set<string>();
      const attachmentId = frame.attachment?.id;
      if (attachmentId) {
        existing.add(attachmentId);
      }
      const fallbackAttachmentId = (frame as any)?.attachmentNodeId || frame.attachment?.data?.nodeId;
      if (fallbackAttachmentId) {
        existing.add(fallbackAttachmentId);
      }
      if (existing.size > 0) {
        frameAttachmentIds.set(frame.id, existing);
      }
    });

    const chapterIds = new Set(
      (chapters || [])
        .map(chapter => chapter?.id)
        .filter((id): id is string => typeof id === 'string' && id.length > 0)
    );

    const buildAttachmentKey = (frameId?: string | null, attachmentId?: string | null) =>
      `${frameId || 'unknown'}::${attachmentId || 'attachment'}`;

    const getAttachmentKeyFromNode = (node: Node) => {
      const frameId =
        (node.data as any)?.attachedToFrameId ||
        (node.data as any)?.frameId ||
        (node.data as any)?.parentFrameId ||
        node.id;
      const attachmentId =
        (node.data as any)?.id ||
        (node.data as any)?.attachmentId ||
        (node.data as any)?.attachment?.id ||
        node.id;
      return buildAttachmentKey(frameId, attachmentId);
    };

    const getAttachmentKeyFromData = (frameId: string, attachment?: FrameAttachment | null) => {
      if (!frameId || !attachment) {
        return null;
      }
      const attachmentId =
        attachment.id ||
        attachment.data?.nodeId ||
        (attachment.data as any)?.id ||
        attachment.data?.attachmentId ||
        `${frameId}-attachment`;
      return buildAttachmentKey(frameId, attachmentId);
    };

    const savedNodes = initialGraphStateRef.current?.nodes || [];
    const savedFrameNodeMap = new Map<string, Node>();
    const savedAttachmentNodeMap = new Map<string, Node>();
    savedNodes.forEach(node => {
      if (node.type === 'aiframe' && node.data?.frameId) {
        savedFrameNodeMap.set(node.data.frameId, node);
      } else if (node.type?.includes('-attachment')) {
        const key = getAttachmentKeyFromNode(node);
        savedAttachmentNodeMap.set(key, node);
      }
    });

    const attachmentEdgesToAdd: Edge[] = [];
    let framesAdded = 0;
    let attachmentsAdded = 0;
    const originalNodeMap = new Map(currentNodes.map(node => [node.id, node]));

    let hasChanges = false;
    const updatedNodes = currentNodes
      .filter(node => {
        if (node.type === 'aiframe' && node.data?.frameId) {
          const shouldKeep = frameIds.has(node.data.frameId);
          if (!shouldKeep) {
            hasChanges = true;
          }
          return shouldKeep;
        }

        if (node.type?.includes('-attachment')) {
          const parentFrameId = node.data?.attachedToFrameId;
          if (!parentFrameId) {
            return true;
          }

          const parentFrameStillExists = frameIds.has(parentFrameId);
          if (!parentFrameStillExists) {
            hasChanges = true;
            return false;
          }

          const attachmentNodeKey =
            node.id ||
            node.data?.id ||
            node.data?.attachmentId ||
            node.data?.attachment?.id;
          const allowedAttachmentIds = frameAttachmentIds.get(parentFrameId);
          const attachmentStillExists =
            !!allowedAttachmentIds &&
            attachmentNodeKey &&
            allowedAttachmentIds.has(attachmentNodeKey);

          if (attachmentStillExists) {
            return true;
          }

          if (node.data?.isAttached) {
            return true;
          }

          hasChanges = true;
          return false;
        }

        if (node.type === 'chapter') {
          const chapterId = node.data?.id || node.id;
          const shouldKeep = chapterId && chapterIds.has(chapterId);
          if (!shouldKeep) {
            hasChanges = true;
          }
          return shouldKeep;
        }

        return true;
      })
      .map(node => {
        if (node.type === 'aiframe' && node.data?.frameId) {
          const correspondingFrame = framesById.get(node.data.frameId);
          if (correspondingFrame) {
            const nodeNeedsUpdate =
              node.data.title !== correspondingFrame.title ||
              node.data.goal !== correspondingFrame.goal ||
              node.data.informationText !== correspondingFrame.informationText ||
              node.data.afterVideoText !== correspondingFrame.afterVideoText ||
              node.data.chapterId !== (correspondingFrame.chapterId || correspondingFrame.parentFrameId) ||
              node.data.parentFrameId !== (correspondingFrame.parentFrameId || correspondingFrame.chapterId) ||
              (correspondingFrame.attachment?.id || null) !==
                (node.data.attachment?.id || node.data.attachmentId || node.data.id || null);

            if (nodeNeedsUpdate) {
              hasChanges = true;

              return {
                ...node,
                data: {
                  ...node.data,
                  title: correspondingFrame.title,
                  goal: correspondingFrame.goal,
                  informationText: correspondingFrame.informationText,
                  afterVideoText: correspondingFrame.afterVideoText,
                  aiConcepts: correspondingFrame.aiConcepts || [],
                  chapterId: correspondingFrame.chapterId || correspondingFrame.parentFrameId,
                  parentFrameId: correspondingFrame.parentFrameId || correspondingFrame.chapterId,
                  attachment: correspondingFrame.attachment || undefined,
                  updatedAt: new Date().toISOString()
                }
              };
            }
          }
        }

        if (node.type === 'chapter') {
          const chapterId = node.data?.id || node.id;
          const chapterData = chapterId ? chapters.find(ch => ch?.id === chapterId) : undefined;
          if (chapterData) {
            const nodeNeedsUpdate =
              node.data?.title !== chapterData.title ||
              node.data?.description !== (chapterData.description || "") ||
              JSON.stringify(node.data?.frameIds || []) !== JSON.stringify(chapterData.frameIds || []) ||
              JSON.stringify(node.data?.conceptIds || []) !== JSON.stringify(chapterData.conceptIds || []) ||
              node.data?.color !== (chapterData.color || DEFAULT_CHAPTER_COLOR) ||
              node.data?.order !== chapterData.order ||
              node.data?.linkSequentially !== (chapterData.linkSequentially ?? false);

            if (nodeNeedsUpdate) {
              hasChanges = true;
              return {
                ...node,
                data: {
                  ...node.data,
                  title: chapterData.title,
                  description: chapterData.description || "",
                  frameIds: Array.isArray(chapterData.frameIds) ? chapterData.frameIds : [],
                  conceptIds: Array.isArray(chapterData.conceptIds) ? chapterData.conceptIds : [],
                  color: chapterData.color || DEFAULT_CHAPTER_COLOR,
                  order: chapterData.order,
                  linkSequentially: chapterData.linkSequentially ?? false
                }
              };
            }
          }
        }

        return node;
      });

    const frameNodeMap = new Map<string, Node>();
    const attachmentKeySet = new Set<string>();
    updatedNodes.forEach(node => {
      if (node.type === 'aiframe' && node.data?.frameId) {
        frameNodeMap.set(node.data.frameId, node);
      } else if (node.type?.includes('-attachment')) {
        attachmentKeySet.add(getAttachmentKeyFromNode(node));
      }
    });

    const getGridPosition = (index: number) => ({
      x: (index % 3) * 420 + 120,
      y: Math.floor(index / 3) * 260 + 120,
    });

    let framePlacementIndex = frameNodeMap.size;

    const ensureAttachmentNode = (frameId: string, frameNode: Node, attachment?: FrameAttachment | null) => {
      if (!attachment) {
        return;
      }

      const attachmentKey = getAttachmentKeyFromData(frameId, attachment);
      if (
        !attachmentKey ||
        attachmentKeySet.has(attachmentKey) ||
        pendingAttachmentNodeIdsRef.current.has(attachment.id)
      ) {
        return;
      }

      const savedAttachmentNode = savedAttachmentNodeMap.get(attachmentKey);
      const attachmentNodeId = savedAttachmentNode?.id || attachment.id || getId();
      const attachmentPosition =
        savedAttachmentNode?.position || {
          x: frameNode.position.x + 420,
          y: frameNode.position.y,
        };
      
      // Helper to avoid double -attachment suffix
      const getAttachmentNodeType = (attachmentType: string): string => {
        if (attachmentType === 'pdf-kb') {
          return 'pdf-attachment';
        }
        // Don't add suffix if already present
        if (attachmentType.endsWith('-attachment')) {
          return attachmentType;
        }
        return `${attachmentType}-attachment`;
      };
      
      const attachmentType = getAttachmentNodeType(attachment.type);

      const attachmentNode: Node = {
        id: attachmentNodeId,
        type: attachmentType,
        position: attachmentPosition,
        data: createAttachmentNodeData(attachment, frameId),
      };

      updatedNodes.push(attachmentNode);
      attachmentKeySet.add(attachmentKey);
      attachmentEdgesToAdd.push({
        id: `edge|${attachmentNodeId}|${frameNode.id}|attachment`,
        source: attachmentNodeId,
        target: frameNode.id,
        targetHandle: 'attachment-slot',
        type: 'straight',
        style: { stroke: "#f97316", strokeWidth: 3 },
      });

      attachmentsAdded += 1;
      hasChanges = true;
    };

    frames.forEach(frame => {
      if (!frame || !frame.id) {
        return;
      }

      const existingNode = frameNodeMap.get(frame.id);
      if (existingNode) {
        ensureAttachmentNode(frame.id, existingNode, frame.attachment);
        return;
      }

      const savedNode = savedFrameNodeMap.get(frame.id);
      const fallbackPosition = getGridPosition(framePlacementIndex);
      const nodePosition = savedNode?.position || fallbackPosition;
      const nodeId = savedNode?.id || getId();

      const safeFrameData = {
        title: frame.title != null ? frame.title : `Frame ${framePlacementIndex + 1}`,
        goal: frame.goal != null ? frame.goal : 'Define your learning goal...',
        informationText:
          frame.informationText != null
            ? frame.informationText
            : 'Add context and background information...',
        afterVideoText:
          frame.afterVideoText != null
            ? frame.afterVideoText
            : 'Key takeaways and next steps...',
      };

      const frameNode: Node = {
        id: nodeId,
        type: 'aiframe',
        position: nodePosition,
        data: {
          type: 'aiframe',
          frameId: frame.id,
          title: safeFrameData.title,
          goal: safeFrameData.goal,
          informationText: safeFrameData.informationText,
          afterVideoText: safeFrameData.afterVideoText,
          aiConcepts: frame.aiConcepts || [],
          isGenerated: frame.isGenerated,
          sourceGoal: frame.sourceGoal,
          sourceUrl: frame.sourceUrl,
          chapterId: frame.chapterId || frame.parentFrameId,
          parentFrameId: frame.parentFrameId || frame.chapterId,
          attachment: frame.attachment,
          onFrameUpdate: handleFrameUpdate,
          onAttachContent: handleAttachContent,
          onDetachContent: handleDetachContent,
        },
      };

      updatedNodes.push(frameNode);
      frameNodeMap.set(frame.id, frameNode);
      framePlacementIndex += 1;
      framesAdded += 1;
      hasChanges = true;

      ensureAttachmentNode(frame.id, frameNode, frame.attachment);
    });

    const nodesChanged = hasChanges || updatedNodes.length !== currentNodes.length;
    if (!nodesChanged) {
      return;
    }

    isFilteringNodesRef.current = true;
    setNodes(updatedNodes);

    const updatedNodeIds = new Set(updatedNodes.map(node => node.id));
    setEdges(prevEdges => {
      const baseEdges = Array.isArray(prevEdges) ? prevEdges : [];
      let nextEdges = baseEdges;
      let edgesMutated = false;

      if (baseEdges.length > 0) {
        const filteredEdges = baseEdges.filter((edge: ExtendedEdge) => {
          const keepEdge =
            updatedNodeIds.has(edge.source) &&
            updatedNodeIds.has(edge.target);

          if (!keepEdge) {
            return false;
          }

          const isChapterFrameEdge =
            (edge.sourceHandle === 'chapter-frame-out' && edge.targetHandle === 'chapter-frame-in') ||
            (edge.sourceHandle === 'chapter-frame-in' && edge.targetHandle === 'chapter-frame-out');

          if (!isChapterFrameEdge) {
            return true;
          }

          const sourceNode = updatedNodes.find(node => node.id === edge.source);
          const targetNode = updatedNodes.find(node => node.id === edge.target);
          const chapterNode = sourceNode?.type === 'chapter' ? sourceNode : targetNode;
          const frameNode = sourceNode?.type === 'aiframe' ? sourceNode : targetNode;

          const chapterId = chapterNode?.data?.id || chapterNode?.id;
          const frameChapterId = frameNode?.data?.chapterId || frameNode?.data?.parentFrameId;

          return chapterId && frameChapterId && chapterId === frameChapterId;
        });

        if (filteredEdges.length !== baseEdges.length) {
          nextEdges = filteredEdges;
          edgesMutated = true;
        }
      }

      if (attachmentEdgesToAdd.length > 0) {
        const existingEdgeIds = new Set(nextEdges.map(edge => edge.id));
        const edgesToAppend = attachmentEdgesToAdd.filter(edge => {
          if (existingEdgeIds.has(edge.id)) {
            return false;
          }
          existingEdgeIds.add(edge.id);
          return true;
        });

        if (edgesToAppend.length > 0) {
          nextEdges = nextEdges === baseEdges ? [...nextEdges, ...edgesToAppend] : [...nextEdges, ...edgesToAppend];
          edgesMutated = true;
        }
      }

      if (!edgesMutated) {
        return prevEdges;
      }

      return nextEdges;
    });

    setTimeout(() => {
      const updatedNodeCount = updatedNodes.reduce((count, node) => {
        const originalNode = originalNodeMap.get(node.id);
        if (!originalNode) {
          return count + 1;
        }
        return JSON.stringify(originalNode.data) !== JSON.stringify(node.data) ? count + 1 : count;
      }, 0);

      emitGraphStateChange('frame-data-sync', {
        updatedNodeCount,
        framesAdded,
        attachmentsAdded,
      });
      isFilteringNodesRef.current = false;
    }, 200);
  }, [frames, chapters, setNodes, setEdges, emitGraphStateChange, handleFrameUpdate, handleAttachContent, handleDetachContent]);

  // Helper function to create attachment node data
  const createAttachmentNodeData = (attachment: FrameAttachment, frameId: string) => {
    const baseData = {
      id: attachment.id,
      title: attachment.data.title || 'Untitled',
      notes: attachment.data.notes,
      attachedToFrameId: frameId,
      isAttached: true,
    };

    switch (attachment.type) {
      case 'video':
        return {
          ...baseData,
          type: 'video-attachment',
          videoUrl: attachment.data.videoUrl || '',
          startTime: attachment.data.startTime || 0,
          duration: attachment.data.duration || 300,
        } as VideoAttachmentNodeData;
      
      case 'pdf':
      case 'pdf-kb':  // Handle KB PDF attachments
        return {
          ...baseData,
          type: 'pdf-attachment',
          // URL PDF fields
          pdfUrl: attachment.data.pdfUrl || '',
          pages: attachment.data.pages || '',
          // KB PDF fields (only included when type is 'pdf-kb')
          ...(attachment.type === 'pdf-kb' && {
            kbDocumentId: attachment.data.kbDocumentId,
            filename: attachment.data.filename,
            startPage: attachment.data.startPage,
            endPage: attachment.data.endPage,
            totalPages: attachment.data.totalPages,
            filesize: attachment.data.filesize,
            uploadedAt: attachment.data.uploadedAt,
          }),
        } as PDFAttachmentNodeData;
      
      case 'text':
        return {
          ...baseData,
          type: 'text-attachment',
          text: attachment.data.text || '',
        } as TextAttachmentNodeData;
      
      default:
        return baseData;
    }
  };

  // Handle connections with attachment logic
  const onConnect = useCallback(
    (params: Connection) => {
      console.log('🔗 onConnect triggered:', { source: params.source, target: params.target, sourceHandle: params.sourceHandle, targetHandle: params.targetHandle });
      const currentNodes = nodesRef.current;
      const currentEdges = edgesRef.current;

      const sourceNode = currentNodes.find((n) => n.id === params.source);
      const targetNode = currentNodes.find((n) => n.id === params.target);

      if (!sourceNode || !targetNode) {
        return;
      }

      const sourceType = sourceNode.type;
      const targetType = targetNode.type;

      if (sourceType === 'concept' && targetType === 'aiframe' && targetNode.data?.frameId) {
        const conceptValue = normalizeConceptValue(sourceNode);
        handleAttachConceptToFrame(targetNode.data.frameId, conceptValue);
      }

      if (sourceType === 'aiframe' && targetType === 'concept' && sourceNode.data?.frameId) {
        const conceptValue = normalizeConceptValue(targetNode);
        handleAttachConceptToFrame(sourceNode.data.frameId, conceptValue);
      }

      // Handle concept-to-chapter connections
      if (sourceType === 'concept' && targetType === 'chapter' && targetNode.data?.id) {
        const conceptValue = normalizeConceptValue(sourceNode);
        handleAttachConceptToChapter(targetNode.data.id, conceptValue);
      }

      if (sourceType === 'chapter' && targetType === 'concept' && sourceNode.data?.id) {
        const conceptValue = normalizeConceptValue(targetNode);
        handleAttachConceptToChapter(sourceNode.data.id, conceptValue);
      }

      if (targetType === 'chapter') {
        const allowFrameAttachment =
          params.targetHandle === 'chapter-frame-in' || params.targetHandle === 'chapter-frame-out';
        const allowChapterOrdering =
          params.targetHandle === 'chapter-order-in' || params.sourceHandle === 'chapter-order-out';

        if (!allowFrameAttachment && !allowChapterOrdering) {
          console.warn('⚠️ Connection rejected: use the bottom handle to attach frames or side handles to order chapters.');
          return;
        }
      }

      if (sourceType === 'chapter' && targetType === 'aiframe') {
        if (params.sourceHandle !== 'chapter-frame-out') {
          console.warn('⚠️ Connection rejected: use the bottom handle on the chapter to connect to a frame.');
          return;
        }
      }

      const isChapterFrameConnection =
        ((sourceType === 'chapter' && params.sourceHandle === 'chapter-frame-out') && targetType === 'aiframe') ||
        ((targetType === 'chapter' && params.targetHandle === 'chapter-frame-in') && sourceType === 'aiframe');

      if (isChapterFrameConnection) {
        const chapterNode = sourceType === 'chapter' ? sourceNode : targetNode;
        const frameNode = sourceType === 'chapter' ? targetNode : sourceNode;
        const chapterId = (chapterNode.data as ChapterNodeData)?.id || chapterNode.id;
        const frameId = frameNode.data?.frameId;
        if (chapterId && frameId) {
          handleAttachFrameToChapter(chapterId, frameId);
        }
      }

      const isSequentialFrameConnection =
        sourceType === 'aiframe' &&
        targetType === 'aiframe' &&
        params.sourceHandle !== 'attachment-slot' &&
        params.targetHandle !== 'attachment-slot';

      if (isSequentialFrameConnection) {
        const sourceChapterId = sourceNode.data?.chapterId || sourceNode.data?.parentFrameId;
        const targetChapterId = targetNode.data?.chapterId || targetNode.data?.parentFrameId;

        if (sourceChapterId && !targetChapterId && targetNode.data?.frameId) {
          handleAttachFrameToChapter(sourceChapterId, targetNode.data.frameId);
        } else if (targetChapterId && !sourceChapterId && sourceNode.data?.frameId) {
          handleAttachFrameToChapter(targetChapterId, sourceNode.data.frameId);
        }
      }

      // Check if this is an attachment connection
      if (params.targetHandle === 'attachment-slot') {
        if (targetNode && targetNode.data.frameId) {
          // Check if target frame already has an attachment
          const hasAttachment = currentEdges.some(edge => 
            edge.target === params.target && (edge as any).targetHandle === 'attachment-slot'
          );
          
          if (hasAttachment) {
            return;
          }

          // Create attachment from source node
          const attachmentId = (sourceNode.data as any)?.id || sourceNode.id;
          const attachment: FrameAttachment = {
            id: attachmentId,
            type: sourceNode.type?.replace('-attachment', '') || 'unknown',
            data: {
              title: sourceNode.data.title,
              notes: sourceNode.data.notes,
              ...(sourceNode.type === 'video-attachment' && {
                videoUrl: sourceNode.data.videoUrl,
                startTime: sourceNode.data.startTime,
                duration: sourceNode.data.duration,
              }),
              ...(sourceNode.type === 'pdf-attachment' && {
                pdfUrl: sourceNode.data.pdfUrl,
                pages: sourceNode.data.pages,
              }),
              ...(sourceNode.type === 'text-attachment' && {
                text: sourceNode.data.text,
              }),
            }
          };

          // Prevent duplicate auto-spawn while this attachment is wiring up
          pendingAttachmentNodeIdsRef.current.add(attachmentId);

          // Attach content to frame
          handleAttachContent(targetNode.data.frameId, attachment);
          
          // Update source node as attached
          setNodesRef.current(nds => nds.map(node => {
            if (node.id === sourceNode.id) {
              // DRAGON SLAYER: Silent node attachment
              return {
                ...node,
                data: {
                  ...node.data,
                  id: attachmentId,
                  isAttached: true,
                  attachedToFrameId: targetNode.data.frameId
                }
              };
            }
            return node;
          }));

          setTimeout(() => {
            pendingAttachmentNodeIdsRef.current.delete(attachmentId);
          }, 500);
        }
      }

      const isChapterOrderingEdge =
        sourceType === 'chapter' &&
        targetType === 'chapter' &&
        params.sourceHandle === 'chapter-order-out' &&
        params.targetHandle === 'chapter-order-in';

      // Create the edge with enhanced styling and guaranteed unique ID
      const edge: Edge = {
        id: `edge|${params.source}|${params.target}|${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle || null,
        targetHandle: params.targetHandle || null,
        style:
          params.targetHandle === 'attachment-slot'
            ? { stroke: "#f97316", strokeWidth: 3 }
            : isChapterOrderingEdge
              ? { stroke: "#fb923c", strokeWidth: 3, strokeDasharray: '6 3' }
              : (sourceType === 'concept' || targetType === 'concept')
                ? { stroke: "#14b8a6", strokeWidth: 2, strokeDasharray: '4 2' }
                : { stroke: "#3b82f6", strokeWidth: 2 },
      };
      
      // CRITICAL FIX: Prevent duplicate edges by checking if edge already exists
      setEdgesRef.current((eds) => {
        const existingEdge = eds.find(e => e.id === edge.id);
        if (existingEdge) {
          console.log('🔄 Edge already exists, skipping duplicate:', edge.id);
          return eds;
        }
        return addEdge(edge, eds);
      });
      
      // Emit connection event for real-time sync
      if (typeof window !== 'undefined') {
        console.log('📤 Emitting graph-connection-added event:', { edgeId: edge.id, source: edge.source, target: edge.target });
        window.dispatchEvent(new CustomEvent('graph-connection-added', {
            detail: {
              connection: edge,
              sourceNode,
              targetNode,
              timestamp: new Date().toISOString()
            }
        }));
        
        // COMPATIBILITY: Also emit legacy connection-changed event
        window.dispatchEvent(new CustomEvent('connection-changed', {
          detail: {
            connectionType: 'added',
            connectionData: edge,
            timestamp: new Date().toISOString()
          }
        }));
        
        // CRITICAL FIX: Emit graph-state-changed with fresh edge state to trigger unified save
        setTimeout(() => {
          // Get current state and add the new edge
          const nextNodes = nodesRef.current;
          const nextEdges = [...edgesRef.current, edge];
          
          // CRITICAL FIX: For attachment connections, emit graph-attachment-changed with fresh state
          if (params.targetHandle === 'attachment-slot') {
            const attachmentTargetNode = nextNodes.find(n => n.id === params.target);
            if (attachmentTargetNode?.data?.frameId) {
              window.dispatchEvent(new CustomEvent('graph-attachment-changed', {
                detail: {
                  frameId: attachmentTargetNode.data.frameId,
                  attachment: attachmentTargetNode.data.attachment,
                  action: 'attached',
                  // CRITICAL FIX: Include fresh graph state with the new edge
                  freshGraphState: {
                    nodes: nextNodes,
                    edges: nextEdges,
                    selectedNodeId: selectedNodeRef.current
                  }
                }
              }));
            }
          }

          console.log('📤 Emitting graph-state-changed event (edge-added):', { edgeId: edge.id, totalEdges: nextEdges.length });
          emitGraphStateChange('edge-added', {
            edgeData: edge
          }, {
            nodes: nextNodes,
            edges: nextEdges
          });
        }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
      }
    },
    [normalizeConceptValue, handleAttachConceptToFrame, handleAttachConceptToChapter, handleAttachContent, handleAttachFrameToChapter, emitGraphStateChange]
  );

  // REAL-TIME SYNC: Handle edge/connection deletion
  const onEdgesDelete = useCallback(
    (edgesToDelete: Edge[]) => {
      const currentNodes = nodesRef.current;

      edgesToDelete.forEach(edge => {
        // Check if this is an attachment connection
        if ((edge as any).targetHandle === 'attachment-slot') {
          const sourceNode = currentNodes.find(n => n.id === edge.source);
          const targetNode = currentNodes.find(n => n.id === edge.target);

          if (sourceNode && targetNode && targetNode.data.frameId) {
            // Detach content from frame
            handleDetachContent(targetNode.data.frameId);
            
            // Update source node as detached
            setNodesRef.current(nds => nds.map(node => {
              if (node.id === sourceNode.id) {
                // DRAGON SLAYER: Silent node detachment
                return { ...node, data: { ...node.data, isAttached: false, attachedToFrameId: undefined } };
              }
              return node;
            }));
          }
        }

        const sourceNode = currentNodes.find(n => n.id === edge.source);
        const targetNode = currentNodes.find(n => n.id === edge.target);

        if (sourceNode && targetNode) {
          const sourceType = sourceNode.type;
          const targetType = targetNode.type;

          if (sourceType === 'concept' && targetType === 'aiframe' && targetNode.data?.frameId) {
            const conceptValue = normalizeConceptValue(sourceNode);
            handleDetachConceptFromFrame(targetNode.data.frameId, conceptValue);
          }

          if (sourceType === 'aiframe' && targetType === 'concept' && sourceNode.data?.frameId) {
            const conceptValue = normalizeConceptValue(targetNode);
            handleDetachConceptFromFrame(sourceNode.data.frameId, conceptValue);
          }

          // Handle concept-to-chapter disconnections
          if (sourceType === 'concept' && targetType === 'chapter' && targetNode.data?.id) {
            const conceptValue = normalizeConceptValue(sourceNode);
            handleDetachConceptFromChapter(targetNode.data.id, conceptValue);
          }

          if (sourceType === 'chapter' && targetType === 'concept' && sourceNode.data?.id) {
            const conceptValue = normalizeConceptValue(targetNode);
            handleDetachConceptFromChapter(sourceNode.data.id, conceptValue);
          }

          const isChapterFrameEdge =
            (sourceType === 'chapter' && targetType === 'aiframe') ||
            (sourceType === 'aiframe' && targetType === 'chapter');

          if (isChapterFrameEdge) {
            const chapterNode = sourceType === 'chapter' ? sourceNode : targetNode;
            const frameNode = sourceType === 'chapter' ? targetNode : sourceNode;
            const chapterId = (chapterNode.data as ChapterNodeData)?.id || chapterNode.id;
            const frameId = frameNode.data?.frameId;
            if (chapterId && frameId) {
              handleDetachFrameFromChapter(chapterId, frameId);
            }
          }
        }

        // Emit connection removal event for real-time sync
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('graph-connection-removed', {
            detail: {
              connection: edge,
              sourceNode,
              targetNode,
              timestamp: new Date().toISOString()
            }
          }));
          
          // COMPATIBILITY: Also emit legacy connection-changed event
          window.dispatchEvent(new CustomEvent('connection-changed', {
            detail: {
              connectionType: 'removed',
              connectionData: edge,
              timestamp: new Date().toISOString()
            }
          }));
          
          // CRITICAL FIX: Emit graph-state-changed with fresh edge state to trigger unified save for edge deletion
          setTimeout(() => {
            // Get current state without the deleted edge
            const currentNodes = nodesRef.current;
            const currentEdges = edgesRef.current.filter(e => e.id !== edge.id);
            
            emitGraphStateChange('edge-removed', {
              edgeData: edge
            }, {
              nodes: currentNodes,
              edges: currentEdges
            });
          }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
        }
      });
    },
    [normalizeConceptValue, handleDetachConceptFromFrame, handleDetachConceptFromChapter, handleDetachContent, handleDetachFrameFromChapter, emitGraphStateChange]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    
    // 🌪️ SYNC STORM FIX: Set drag flag to prevent sync operations
    if (typeof window !== 'undefined') {
      (window as any).isDragging = true;
    }
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      // 🌪️ SYNC STORM FIX: Clear drag flag and debounce sync operations
      if (typeof window !== 'undefined') {
        (window as any).isDragging = false;
        
        // Clear drag flag after a delay to prevent immediate sync
        setTimeout(() => {
          (window as any).isDragging = false;
        }, 500); // PERFORMANCE FIX: Reduce delay from 2000ms to 500ms
      }

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const type = event.dataTransfer.getData("application/reactflow") as EnhancedDragItem["nodeType"];

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeId = getId();
      const newNodeData: NodeData = (() => {
        switch (type) {
          case "aiframe":
            return {
              type: "aiframe",
              frameId: `frame-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              title: "New AI Frame",
              goal: "Enter learning goal here...",
              informationText: "Provide background context and information...",
              afterVideoText: "Key takeaways and next steps...",
              aiConcepts: [],
              isGenerated: false,
              onFrameUpdate: handleFrameUpdate,
              onAttachContent: handleAttachContent,
              onDetachContent: handleDetachContent,
            };
            
          case "video-attachment":
            return {
              type: "video-attachment",
              id: nodeId,
              title: "Video Content",
              videoUrl: "https://www.youtube.com/watch?v=po7doQNkhuU",
              startTime: 0,
              duration: 300,
              notes: "",
              isAttached: false,
            };
            
          case "pdf-attachment":
            return {
              type: "pdf-attachment",
              id: nodeId,
              title: "PDF Document",
              pdfUrl: "",
              pages: "",
              notes: "",
              isAttached: false,
            };
            
          case "text-attachment":
            return {
              type: "text-attachment",
              id: nodeId,
              title: "Text Note",
              text: "",
              notes: "",
              isAttached: false,
            };
            
      case "concept":
        return {
          type: "concept",
          concept: "New Concept",
          description: "Concept description",
          relatedFrameId: "",
          onConceptUpdate: handleConceptUpdate,
          onConceptDelete: handleConceptDelete,
          frames: framesRef.current,
          chapters: chaptersRef.current,
        };
            
          case "chapter":
            return {
              type: "chapter",
              id: nodeId,
              title: "New Chapter",
              description: "Chapter description",
              frameIds: [],
              conceptIds: [],
              order: nodesRef.current.length,
              color: DEFAULT_CHAPTER_COLOR,
              onChapterUpdate: (updates) => handleChapterUpdate(nodeId, updates),
            };
            
          default:
            throw new Error(`Unknown enhanced node type: ${type}`);
        }
      })();

      const newNode: Node = {
        id: nodeId,
        type,
        position,
        data: newNodeData,
      };

      // ✅ NEW: Ensure manual session exists when dropping AI Frame
      if (type === 'aiframe') {
        if (typeof window !== 'undefined') {
          console.log("🎯 Dispatching ensure-manual-session event for frame drop");
          window.dispatchEvent(new CustomEvent('ensure-manual-session', {
            detail: { source: 'frame-drop', nodeId }
          }));
        }
      }

      if (type === 'chapter') {
        boundChapterUpdateHandlers.current.add(nodeId);
        const existingChapters = chaptersRef.current || [];
        const hasRecord = existingChapters.some(chapter => chapter.id === nodeId);
        if (!hasRecord) {
          const now = new Date().toISOString();
          const chapterData = newNodeData as ChapterNodeData;
          const nextChapters = [
            ...existingChapters,
            {
              id: nodeId,
              title: chapterData?.title || 'New Chapter',
              description: chapterData?.description || '',
              frameIds: [],
              conceptIds: [],
              order: typeof chapterData?.order === 'number'
                ? chapterData.order
                : existingChapters.length,
              color: chapterData?.color || DEFAULT_CHAPTER_COLOR,
              linkSequentially: chapterData?.linkSequentially ?? false,
              createdAt: now,
              updatedAt: now,
              bubblSpaceId: undefined,
              timeCapsuleId: undefined,
            } as AiChapter,
          ];
          chaptersRef.current = nextChapters;
          invokeOnChaptersChange(nextChapters);
        }
      }

      setNodesRef.current((nds) => nds.concat(newNode));

      // CRITICAL FIX: Emit save events for ALL node types (OUTSIDE setNodes to avoid React error)
      if (typeof window !== 'undefined') {
        // Delay to ensure React Flow updates and useEffect syncs refs
        setTimeout(() => {
          // Get fresh graph state from refs (updated by useEffect at lines 109-111)
          const freshGraphState = {
            nodes: nodesRef.current,
            edges: edgesRef.current,
            selectedNodeId: selectedNodeRef.current
          };

          // Trigger save with fresh graph state included in event
          window.dispatchEvent(new CustomEvent('force-save-frames', {
            detail: {
              reason: 'node-drop-delayed',
              nodeType: type,
              graphState: freshGraphState
            }
          }));
        }, 100); // 100ms is sufficient for useEffect to update refs
      }
      
      // If it's an AI frame node, sync with frames array
      if (type === "aiframe") {
        
        // CRITICAL FIX: Prevent concurrent frame creation
        if (isCreatingFrame.current) {
          console.warn('Frame creation already in progress');
          return;
        }
        
        isCreatingFrame.current = true;
        
        try {
          // CRITICAL FIX: Use ref to get current frames instead of stale closure
          const currentFrames = framesRef.current;
          
          // Only create new frame if this frameId doesn't already exist
          const existingFrame = currentFrames.find(f => f.id === newNodeData.frameId);
          
          if (!existingFrame) {
            // Generate unique frame title based on highest existing frame number
            const existingFrameNumbers = currentFrames
              .map(f => f.title.match(/^Frame (\d+)$/)?.[1])
              .filter(Boolean)
              .map(Number);
            
            const nextFrameNumber = existingFrameNumbers.length > 0 
              ? Math.max(...existingFrameNumbers) + 1 
              : currentFrames.length + 1; // Use current length as fallback
            
            const uniqueTitle = `Frame ${nextFrameNumber}`;
            
            const newFrame = {
              id: newNodeData.frameId,
              title: uniqueTitle,
              goal: newNodeData.goal || `Learning goal for ${uniqueTitle}`,
              informationText: newNodeData.informationText || `Context and background for ${uniqueTitle}`,
              afterVideoText: newNodeData.afterVideoText || `Key takeaways for ${uniqueTitle}`,
              aiConcepts: newNodeData.aiConcepts || [],
              isGenerated: newNodeData.isGenerated || false,
              // Frame structure fields
              order: nextFrameNumber,
              bubblSpaceId: "default",
              timeCapsuleId: "default",
              type: 'frame' as const,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              // Legacy compatibility
              videoUrl: '',
              startTime: 0,
              duration: 300,
            };
            
            // CRITICAL FIX: Create new frames array with current frames from ref
            const updatedFrames = [...currentFrames, newFrame];
            
            // CRITICAL FIX: Call onFramesChange immediately to sync to unified storage
            invokeOnFramesChange(updatedFrames);
            
            // REMOVED: graph-frame-added event dispatch
            // Frame addition is already handled by invokeOnFramesChange callback above
            // No need for redundant event that causes circular loops
            
            // OPTIMISTIC: Background save will handle persistence automatically
            // Still emit graph state change for proper sync
            setTimeout(() => {
              emitGraphStateChange('frame-created', {
                frameId: newFrame.id,
                frameTitle: newFrame.title,
                totalFrames: updatedFrames.length
              });
            }, 200); // SPECS COMPLIANT: Debounced timing for unified save
          }
        } finally {
          // Reset mutex after a short delay
          setTimeout(() => {
            isCreatingFrame.current = false;
          }, 100);
        }
      }
    },
    [reactFlowInstance, handleFrameUpdate, handleAttachContent, handleDetachContent, handleConceptUpdate, handleConceptDelete, handleChapterUpdate, emitGraphStateChange, invokeOnChaptersChange, invokeOnFramesChange]
  );

  // Handle node selection and emit events for Frame Navigation sync
  const handleNodeClick = useCallback((_event: any, node: any) => {
    setSelectedNode(node.id);
    
    // REMOVED: graph-frame-selected event dispatch
    // Node selection is already handled through React Flow's selection state
    // Parent components should use onFrameIndexChange callback if they need to know about selection
    // if (node.data?.type === 'aiframe' && node.data?.frameId) {
    //   const currentFrames = framesRef.current;
    //   const frameIndex = currentFrames.findIndex(frame => frame.id === node.data.frameId);
    //   if (frameIndex !== -1) {
    //     // Removed event dispatch - use callbacks instead
    //   }
    // }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleExternalFrameCreated = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      const frame = detail?.frame;
      if (!frame || !frame.id) {
        return;
      }

      const existingNode = nodesRef.current.find((node) => node.data?.frameId === frame.id);
      if (existingNode) {
        return;
      }

      const column = nodesRef.current.length % 4;
      const row = Math.floor(nodesRef.current.length / 4);
      const newNodePosition = {
        x: column * 320 + 80,
        y: row * 220 + 80,
      };

      const newNode: Node = {
        id: getId(),
        type: 'aiframe',
        position: newNodePosition,
        data: {
          type: 'aiframe',
          frameId: frame.id,
          title: frame.title || 'New AI Frame',
          goal: frame.goal || 'Define the learning goal for this frame...',
          informationText: frame.informationText || 'Provide supporting context and information...',
          afterVideoText: frame.afterVideoText || 'Summarize key takeaways and next steps...',
          aiConcepts: frame.aiConcepts || frame.conceptIds || [],
          isGenerated: frame.isGenerated || false,
          onFrameUpdate: handleFrameUpdate,
          onAttachContent: handleAttachContent,
          onDetachContent: handleDetachContent,
        },
      };

      const updatedNodes = [...nodesRef.current, newNode];
      setNodes(updatedNodes);

      const freshGraphState = {
        nodes: updatedNodes,
        edges: edgesRef.current,
        selectedNodeId: selectedNodeRef.current,
      };

      emitGraphStateChange('external-frame-created', { frameId: frame.id }, freshGraphState);

      window.dispatchEvent(
        new CustomEvent('graph-frame-added', {
          detail: {
            newFrame: frame,
            totalFrames: framesRef.current.length + 1,
          },
        })
      );
    };

    window.addEventListener('external-frame-created', handleExternalFrameCreated as EventListener);

    return () => {
      window.removeEventListener('external-frame-created', handleExternalFrameCreated as EventListener);
    };
  }, [emitGraphStateChange, handleAttachContent, handleDetachContent, handleFrameUpdate, setNodes]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleLinkSequential = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const frameIds: string[] = Array.isArray(detail.frameIds) ? detail.frameIds : [];
      const chapterId: string | undefined = detail.chapterId;
      const attempt: number = typeof detail.attempt === 'number' ? detail.attempt : 0;

      if (frameIds.length < 2) {
        return;
      }

      if (chapterId) {
        handleChapterUpdate(chapterId, { frameIds });
      }

      const nodesById = new Map<string, Node>();
      nodesRef.current.forEach((node: Node) => nodesById.set(node.id, node));

      const frameNodeLookup = new Map<string, Node>();
      nodesRef.current.forEach((node: Node) => {
        if (node.type === 'aiframe') {
          const frameData = node.data as AIFrameNodeData | undefined;
          const frameId = frameData?.frameId;
          if (typeof frameId === 'string' && frameId.length > 0) {
            frameNodeLookup.set(frameId, node);
          }
        }
      });

      const chapterNode = nodesRef.current.find(
        node => node.type === 'chapter' && (node.data as ChapterNodeData)?.id === chapterId
      );

      const existingEdgeKeys = new Set(edgesRef.current.map(edge => `${edge.source}->${edge.target}`));
      const newConnections: Array<{ sourceId: string; targetId: string }> = [];
      let missingNode = false;
      const missingChapterNode = !chapterNode;

      frameIds.forEach((sourceFrameId: string, index: number) => {
        if (index === frameIds.length - 1) {
          return;
        }
        const targetFrameId = frameIds[index + 1];
        const sourceNode = frameNodeLookup.get(sourceFrameId);
        const targetNode = frameNodeLookup.get(targetFrameId);
        if (!sourceNode || !targetNode) {
          missingNode = true;
          return;
        }

        const key = `${sourceNode.id}->${targetNode.id}`;
        if (existingEdgeKeys.has(key)) {
          return;
        }
        newConnections.push({ sourceId: sourceNode.id, targetId: targetNode.id });
        existingEdgeKeys.add(key);
      });

      if (!missingChapterNode && chapterNode) {
        const firstFrameNode = frameNodeLookup.get(frameIds[0]);
        if (!firstFrameNode) {
          missingNode = true;
        } else {
          const key = `${chapterNode.id}->${firstFrameNode.id}`;
          if (!existingEdgeKeys.has(key)) {
            newConnections.unshift({ sourceId: chapterNode.id, targetId: firstFrameNode.id });
            existingEdgeKeys.add(key);
          }
        }
      }

      if (newConnections.length > 0) {
        let nextEdges = [...edgesRef.current];
        const keySet = new Set(nextEdges.map(edge => `${edge.source}->${edge.target}`));
        const addedEdges: Edge[] = [];

        newConnections.forEach(({ sourceId, targetId }) => {
          const key = `${sourceId}->${targetId}`;
          if (keySet.has(key)) {
            return;
          }

          const edgeId = `edge_seq_${sourceId}_${targetId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
          const sequentialEdge: Edge = {
            id: edgeId,
            source: sourceId,
            target: targetId,
            sourceHandle: 'frame-sequence-out',
            targetHandle: 'chapter-frame-in',
            type: 'smoothstep',
            style: SEQUENTIAL_EDGE_STYLE,
            markerEnd: SEQUENTIAL_EDGE_MARKER,
            data: {
              relationship: 'chapter-sequence',
              chapterId,
            },
          };

          nextEdges = addEdge(sequentialEdge, nextEdges);
          addedEdges.push({ ...sequentialEdge });
          keySet.add(key);
        });

        if (addedEdges.length > 0) {
          setEdges(nextEdges);

          const freshGraphState = {
            nodes: nodesRef.current,
            edges: nextEdges,
            selectedNodeId: selectedNodeRef.current,
          };

          emitGraphStateChange('chapter-sequence-added', {
            chapterId,
            frameIds,
            addedEdgeIds: addedEdges.map(edge => edge.id),
          }, freshGraphState);

          window.dispatchEvent(
            new CustomEvent('force-save-frames', {
              detail: {
                reason: 'chapter-sequence-added',
                timestamp: Date.now(),
                graphState: freshGraphState,
              },
            })
          );
        }
      }

      if ((missingNode || missingChapterNode) && attempt < 5) {
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent('link-chapter-frames-sequentially', {
              detail: {
                chapterId,
                frameIds,
                attempt: attempt + 1,
              },
            })
          );
        }, 400);
      }
    };

    const handleUnlinkSequential = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const chapterId: string | undefined = detail.chapterId;
      if (!chapterId) {
        return;
      }

      const filteredEdges = edgesRef.current.filter(edge => {
        const relationship = (edge as any).data;
        return !(relationship?.relationship === 'chapter-sequence' && relationship?.chapterId === chapterId);
      });

      if (filteredEdges.length === edgesRef.current.length) {
        return;
      }

      setEdges(filteredEdges);

      const freshGraphState = {
        nodes: nodesRef.current,
        edges: filteredEdges,
        selectedNodeId: selectedNodeRef.current,
      };

      emitGraphStateChange('chapter-sequence-removed', { chapterId }, freshGraphState);

      window.dispatchEvent(
        new CustomEvent('force-save-frames', {
          detail: {
            reason: 'chapter-sequence-removed',
            timestamp: Date.now(),
            graphState: freshGraphState,
          },
        })
      );
    };

    window.addEventListener('link-chapter-frames-sequentially', handleLinkSequential as EventListener);
    window.addEventListener('unlink-chapter-frames-sequentially', handleUnlinkSequential as EventListener);

    return () => {
      window.removeEventListener('link-chapter-frames-sequentially', handleLinkSequential as EventListener);
      window.removeEventListener('unlink-chapter-frames-sequentially', handleUnlinkSequential as EventListener);
    };
  }, [emitGraphStateChange, handleChapterUpdate, setEdges]);

  // Listen for clear all frames event and reset graph nodes/edges
  useEffect(() => {
    const handleClearAllFrames = (event: CustomEvent) => {
      // Clear all nodes and edges
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
    };

    const handleAttachmentNodeUpdated = (event: CustomEvent) => {
      const { frameId, attachment, nodeId } = event.detail;

      // CRITICAL: Update the graph node itself to reflect the latest attachment data
      setNodes(nds => nds.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...attachment.data, // Update node data with latest attachment data
              attachment: attachment // Also store the complete attachment object
            }
          };
        }
        return node;
      }));
      
      // Update the connected frame
      handleAttachContent(frameId, attachment);
    };

    window.addEventListener('clear-all-frames', handleClearAllFrames as EventListener);
    window.addEventListener('attachment-node-updated', handleAttachmentNodeUpdated as EventListener);
    
    // CRITICAL FIX: Handle node data updates to ensure text content persists in React Flow
    const handleNodeDataUpdate = (event: CustomEvent) => {
      const { nodeId, newData } = event.detail;

      setNodes(currentNodes => {
        const updatedNodes = currentNodes.map(node => {
          if (node.id === nodeId) {
            return { ...node, data: newData };
          }
          return node;
        });
        
        // CRITICAL FIX: Trigger save after node data update to persist changes
        setTimeout(() => {
          const freshGraphState = {
            nodes: updatedNodes,
            edges: edgesRef.current,
            selectedNodeId: selectedNodeRef.current
          };
          
          window.dispatchEvent(new CustomEvent('force-save-frames', {
            detail: { 
              reason: 'node-data-updated', 
              nodeId: nodeId,
              graphState: freshGraphState 
            }
          }));
        }, 100);
        
        return updatedNodes;
      });
    };
    
    window.addEventListener('update-node-data', handleNodeDataUpdate as EventListener);
    
    return () => {
      window.removeEventListener('clear-all-frames', handleClearAllFrames as EventListener);
      window.removeEventListener('attachment-node-updated', handleAttachmentNodeUpdated as EventListener);
      window.removeEventListener('update-node-data', handleNodeDataUpdate as EventListener);
    };
  }, [nodes.length, edges.length, handleAttachContent]);

  // PERFORMANCE: Debounce the graph change callback to improve drag performance
  const debouncedGraphChange = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (newGraphState: GraphState) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        invokeOnGraphChange(newGraphState); // Use ref-backed handler
      }, 500); // Debounce to 500ms for better performance
    };
  }, [invokeOnGraphChange]);

  // Update graph state when nodes/edges change
  useEffect(() => {
    if (onGraphChangeRef.current) {
      const newGraphState: GraphState = {
        nodes,
        edges,
        selectedNodeId: selectedNode,
      };
      
      // DRAGON SLAYER: Silent graph state update with debouncing
      debouncedGraphChange(newGraphState);
    }
    
    // REMOVED: Automatic graph-state-changed emission that was causing infinite loops
    // Events are now only emitted on specific user actions (drag, connect, delete, etc.)
    // This prevents the feedback loop: emit event → storage update → re-render → emit event
    
  }, [nodes, edges, selectedNode, debouncedGraphChange]);
  
  // PERFORMANCE: Add React Flow performance optimizations
  const nodesDraggable = true;
  const nodesConnectable = true;
  const elementsSelectable = true;
  
  // PERFORMANCE: Memoize node types to prevent recreating on every render
  const memoizedNodeTypes = useMemo(() => enhancedNodeTypes, []);

  useEffect(() => {
    const prev = debugPropsRef.current;
    const changes = {
      nodesChanged: prev.nodes !== nodes,
      edgesChanged: prev.edges !== edges,
      handleNodesChangeChanged: prev.handleNodesChange !== handleNodesChange,
      handleEdgesChangeChanged: prev.handleEdgesChange !== handleEdgesChange,
      handleNodesDeleteChanged: prev.handleNodesDelete !== handleNodesDelete,
      onConnectChanged: prev.onConnect !== onConnect,
      onEdgesDeleteChanged: prev.onEdgesDelete !== onEdgesDelete,
      onDropChanged: prev.onDrop !== onDrop,
    };
    if (Object.values(changes).some(Boolean)) {
      console.log("🐛 EnhancedLearningGraph prop diff", JSON.stringify(changes));
    }
    debugPropsRef.current = {
      nodes,
      edges,
      handleNodesChange,
      handleEdgesChange,
      handleNodesDelete,
      onConnect,
      onEdgesDelete,
      onDrop,
    };
    console.count("EnhancedLearningGraph rerender");
  }, [nodes, edges, handleNodesChange, handleEdgesChange, handleNodesDelete, onConnect, onEdgesDelete, onDrop]);

  return (
    <div className="flex h-full min-h-full w-full">
      <EnhancedSidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onNodesDelete={handleNodesDelete}
          onEdgesChange={handleEdgesChange}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={handleNodeClick}
          nodeTypes={memoizedNodeTypes}
          nodesDraggable={nodesDraggable}
          nodesConnectable={nodesConnectable}
          elementsSelectable={elementsSelectable}
          fitView
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          attributionPosition="top-right"
          proOptions={{ hideAttribution: true }}
          minZoom={0.25}
          maxZoom={2}
        >
          <MiniMap position="top-right" />
          <Controls position="top-left" />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
} 
