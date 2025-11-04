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

import { 
  NodeData, 
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

let id = 0;
const getId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${id++}`; // SPECS FIX: Guaranteed unique IDs

type ChapterNodeUpdates = Partial<Pick<ChapterNodeData, "title" | "description" | "frameIds" | "conceptIds" | "order" | "color" >>;

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
  const [previousNodes, setPreviousNodes] = useState<Node[]>([]);
  const lastEmissionRef = useRef<number>(0);
  const lastAppliedGraphState = useRef<string | null>(null);
  const chaptersRef = useRef<AiChapter[]>(chapters || []);
  
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

  useEffect(() => {
    nodesRef.current = nodes;
    edgesRef.current = edges;
    selectedNodeRef.current = selectedNode;
  }, [nodes, edges, selectedNode]);

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
    }
  }, []); // No dependencies to prevent infinite loops

  // DYNAMIC: Universal handler for ANY node changes (position, add, remove, select, etc.)
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    // Call React Flow's built-in handler first
    onNodesChange(changes);
    
    // PERFORMANCE FIX: Only emit for meaningful changes, batch position changes
    const meaningfulChanges = changes.filter(change => 
      change.type === 'add' || change.type === 'remove'
    );
    
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
              timestamp: new Date().toISOString()
            }
          }));
        }
      }, 1000); // Only emit position events every 1 second
    }
    
    // Emit immediate events for remove only (add events have delayed save)
    meaningfulChanges.forEach(change => {
      if (typeof window !== 'undefined' && change.type === 'remove') {
        const elementId = (change as any).id;
        window.dispatchEvent(new CustomEvent('graph-element-changed', {
          detail: {
            elementType: 'node',
            changeType: change.type,
            elementId: elementId,
            elementData: change,
            timestamp: new Date().toISOString()
          }
        }));
      }
    });
  }, [onNodesChange]);

  // DYNAMIC: Universal handler for ANY edge changes (position, add, remove, etc.)
  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    // Call React Flow's built-in handler first
    onEdgesChange(changes);
    
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
  }, [onEdgesChange, nodes, edges, selectedNode]);

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
    if (Object.keys(safeUpdatedData).length > 0 && onFramesChange) {
      // CRITICAL FIX: Use framesRef.current instead of stale frames prop to prevent empty array corruption
      const currentFrames = framesRef.current;
      const updatedFrames = currentFrames.map(frame =>
        frame.id === frameId ? { ...frame, ...safeUpdatedData, updatedAt: new Date().toISOString() } : frame
      );

      onFramesChange(updatedFrames);
      
    }
    
    // CRITICAL FIX: Also update the graph node data to keep it in sync (with safe data only)
    if (Object.keys(safeUpdatedData).length > 0) {
      setNodes(nds => nds.map(node => {
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
  }, [onFramesChange]); // Remove frames dependency to prevent stale closures

  // Handle content attachment to frames
  const handleAttachContent = useCallback((frameId: string, attachment: FrameAttachment) => {
    // Update the frame in the frames array
    if (onFramesChange) {
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

      onFramesChange(updatedFrames);
    }

    // Update the graph node
    setNodes(nds => nds.map(node => {
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
  }, [onFramesChange]);

  // Handle content detachment from frames
  const handleDetachContent = useCallback((frameId: string) => {
    
    
    // Update the frame in the frames array
    if (onFramesChange) {
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
      onFramesChange(updatedFrames);
    }

    // Update the graph node
    setNodes(nds => nds.map(node => {
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
  }, [onFramesChange]);

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

    if (Object.keys(sanitized).length === 0) {
      return;
    }

    let updatedNodes: Node[] | null = null;
    let didUpdate = false;
    let resolvedChapterId: string | null = null;

    setNodes(currentNodes => {
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

    if (didUpdate && onChaptersChange) {
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
      onChaptersChange(nextChapters);
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
  }, [emitGraphStateChange, onChaptersChange, setNodes]);

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
          nodeData.color !== nextData.color;

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

        const nodeId = getId();
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

  // Ensure chapter ↔ frame connections reflect sidebar assignments
  useEffect(() => {
    if (!Array.isArray(chapters) || chapters.length === 0) {
      return;
    }

    const currentNodes = nodesRef.current;
    if (!currentNodes || currentNodes.length === 0) {
      return;
    }

    const chapterNodeByChapterId = new Map<string, Node>();
    const frameNodeByFrameId = new Map<string, Node>();
    const nodeById = new Map<string, Node>();

    currentNodes.forEach(node => {
      nodeById.set(node.id, node);
      if (node.type === 'chapter') {
        const chapterId = (node.data as ChapterNodeData)?.id || node.id;
        if (chapterId) {
          chapterNodeByChapterId.set(chapterId, node);
        }
      } else if (node.type === 'aiframe') {
        const frameId = node.data?.frameId;
        if (frameId) {
          frameNodeByFrameId.set(frameId, node);
        }
      }
    });

    let changed = false;

    // Determine which chapter/frame links are required
    const requiredPairs = new Map<string, { chapterNode: Node; frameNode: Node }>();
    chapters.forEach(chapter => {
      if (!chapter || !chapter.id) return;
      const chapterNode = chapterNodeByChapterId.get(chapter.id);
      if (!chapterNode) return;

      (chapter.frameIds || []).forEach(frameId => {
        if (!frameId) return;
        const frameNode = frameNodeByFrameId.get(frameId);
        if (!frameNode) return;
        const key = `${chapter.id}->${frameId}`;
        requiredPairs.set(key, { chapterNode, frameNode });
      });
    });

    const currentEdges = edgesRef.current || [];
    const edgesToKeep: Edge[] = [];
    const existingPairs = new Set<string>();

    currentEdges.forEach(edge => {
      const sourceNode = nodeById.get(edge.source);
      const targetNode = nodeById.get(edge.target);
      if (sourceNode?.type === 'chapter' && targetNode?.type === 'aiframe') {
        const chapterId = (sourceNode.data as ChapterNodeData)?.id || sourceNode.id;
        const frameId = targetNode.data?.frameId;
        if (chapterId && frameId) {
          const key = `${chapterId}->${frameId}`;
          if (requiredPairs.has(key)) {
            existingPairs.add(key);

            const desiredStyle = { stroke: "#10b981", strokeWidth: 2.5 };
            const needsUpdate =
              edge.sourceHandle !== 'chapter-frame-out' ||
              JSON.stringify(edge.style) !== JSON.stringify(desiredStyle);

            if (needsUpdate) {
              changed = true;
              edgesToKeep.push({
                ...edge,
                sourceHandle: 'chapter-frame-out',
                style: desiredStyle,
              });
            } else {
              edgesToKeep.push(edge);
            }
            return;
          }

          // Edge no longer required
          changed = true;
          return;
        }
      }

      edgesToKeep.push(edge);
    });

    const edgesToAdd: Edge[] = [];
    requiredPairs.forEach((pair, key) => {
      if (existingPairs.has(key)) {
        return;
      }

      const { chapterNode, frameNode } = pair;
      const edgeId = `edge_chapter_${(chapterNode.data as ChapterNodeData)?.id || chapterNode.id}_${frameNode.data?.frameId}`;

      edgesToAdd.push({
        id: edgeId,
        source: chapterNode.id,
        target: frameNode.id,
        sourceHandle: 'chapter-frame-out',
        targetHandle: null,
        style: { stroke: "#10b981", strokeWidth: 2.5 },
        type: 'straight',
      });
    });

    if (edgesToAdd.length > 0) {
      changed = true;
    }

    if (!changed) {
      return;
    }

    const nextEdges = [...edgesToKeep, ...edgesToAdd];
    setEdges(nextEdges);

    const freshGraphState = {
      nodes: nodesRef.current,
      edges: nextEdges,
      selectedNodeId: selectedNodeRef.current,
    };

    emitGraphStateChange('chapter-frame-sync', {
      addedEdgeCount: edgesToAdd.length,
      removedEdgeCount: currentEdges.length - edgesToKeep.length,
    }, freshGraphState);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('force-save-frames', {
        detail: {
          reason: 'chapter-frame-sync',
          timestamp: Date.now(),
          graphState: freshGraphState,
        }
      }));
    }
  }, [chapters, frames, emitGraphStateChange, setEdges]);

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
    if (!conceptValue || !onFramesChange) {
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

    onFramesChange(updatedFrames);
  }, [onFramesChange]);

  const handleDetachConceptFromFrame = useCallback((frameId: string, conceptValue: string) => {
    if (!onFramesChange || !conceptValue) {
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

    onFramesChange(updatedFrames);
  }, [onFramesChange]);

  // Handle concept attachment to chapters
  const handleAttachConceptToChapter = useCallback((chapterId: string, conceptValue: string) => {
    if (!conceptValue || !onChaptersChange || !chapters) {
      return;
    }

    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const existingConcepts = Array.isArray(chapter.conceptIds) ? chapter.conceptIds : [];

        // Don't add duplicates
        if (existingConcepts.includes(conceptValue)) {
          return chapter;
        }

        return {
          ...chapter,
          conceptIds: [...existingConcepts, conceptValue],
          updatedAt: new Date().toISOString(),
        };
      }
      return chapter;
    });

    onChaptersChange(updatedChapters);
  }, [chapters, onChaptersChange]);

  // Handle concept detachment from chapters
  const handleDetachConceptFromChapter = useCallback((chapterId: string, conceptValue: string) => {
    if (!onChaptersChange || !chapters || !conceptValue) {
      return;
    }

    const updatedChapters = chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const remainingConcepts = (chapter.conceptIds || []).filter(
          (concept) => concept !== conceptValue
        );

        return {
          ...chapter,
          conceptIds: remainingConcepts,
          updatedAt: new Date().toISOString(),
        };
      }
      return chapter;
    });

    onChaptersChange(updatedChapters);
  }, [chapters, onChaptersChange]);

  // Handle concept updates (edit name/description)
  const handleConceptUpdate = useCallback((nodeId: string, updates: { concept: string; description?: string }) => {
    const conceptNode = nodes.find(n => n.id === nodeId);
    if (!conceptNode || conceptNode.type !== 'concept') {
      return;
    }

    const oldConceptName = conceptNode.data?.concept;
    const newConceptName = updates.concept;
    const conceptNameChanged = oldConceptName !== newConceptName;

    let updatedNodes: any[] = [];

    // Update the concept node in the graph
    setNodes((nds) => {
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
    if (conceptNameChanged && onFramesChange) {
      const updatedFrames = frames.map((frame) => {
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

      onFramesChange(updatedFrames);
    }

    // Update concept references in chapters
    if (conceptNameChanged && onChaptersChange && chapters) {
      const updatedChapters = chapters.map((chapter) => {
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

      onChaptersChange(updatedChapters);
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
  }, [nodes, frames, chapters, onFramesChange, onChaptersChange, emitGraphStateChange, setNodes]);

  // Handle concept deletion
  const handleConceptDelete = useCallback((nodeId: string) => {
    const conceptNode = nodes.find(n => n.id === nodeId);
    if (!conceptNode || conceptNode.type !== 'concept') {
      return;
    }

    const conceptName = conceptNode.data?.concept;

    // Remove concept from all frames
    if (conceptName && onFramesChange) {
      const updatedFrames = frames.map((frame) => {
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

      onFramesChange(updatedFrames);
    }

    // Remove concept from all chapters
    if (conceptName && onChaptersChange && chapters) {
      const updatedChapters = chapters.map((chapter) => {
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

      onChaptersChange(updatedChapters);
    }

    // Remove the node from the graph
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));

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
  }, [nodes, frames, chapters, onFramesChange, onChaptersChange, emitGraphStateChange, setNodes]);

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

  // REAL-TIME SYNC: Handle node deletion
  useEffect(() => {
    if (previousNodes.length > 0) {
      const deletedNodes = previousNodes.filter(prevNode => 
        !nodes.some(currentNode => currentNode.id === prevNode.id)
      );

      if (deletedNodes.length > 0) {

        // Handle AI frame node deletions - FIXED TO PRESERVE FRAME DATA
        const deletedAIFrameNodes = deletedNodes.filter(node => 
          node.type === 'aiframe' && node.data?.frameId
        );

        if (deletedAIFrameNodes.length > 0) {
          const deletedFrameIds = deletedAIFrameNodes.map(node => node.data.frameId);
          // Silently handle node removal - frames preserved

          // FIX: Do NOT remove frames from the frames array
          // Only the visual node is removed, frame data is preserved
          // This prevents loss of attached videos, PDFs, and other content
          
          // Emit events for graph cleanup without data loss
          deletedFrameIds.forEach(frameId => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('graph-node-removed', {
                detail: { 
                  frameId,
                  action: 'node_removed_only',
                  frameDataPreserved: true 
                }
              }));
            }
          });

          // Node removal complete - frame data preserved
        }
      }
    }

    setPreviousNodes(nodes);
  }, [nodes, frames]);

  // CRITICAL FIX: Ensure initialGraphState nodes are properly displayed
  useEffect(() => {
    // If initialGraphState was provided with nodes, merge them with existing nodes
    // This ensures standalone attachment nodes persist even when frame nodes exist
    if (initialGraphState?.nodes?.length) {
      // CRITICAL FIX: Merge nodes instead of replacing to preserve standalone attachment nodes

      // Get existing frame nodes (if any were already created)
      const existingFrameNodes = nodes.filter(n => n.type === 'aiframe');
      const existingFrameIds = new Set(existingFrameNodes.map(n => n.id));

      // Get all nodes from initialGraphState that aren't duplicates
      const loadedNodes = initialGraphState.nodes.filter(n => !existingFrameIds.has(n.id));

      // Merge: existing frame nodes + all loaded nodes (deduplicates by ID)
      const mergedNodes = [...existingFrameNodes, ...loadedNodes];

      // Only update if we're actually adding new nodes
      if (mergedNodes.length > nodes.length || nodes.length === 0) {
        setNodes(mergedNodes);
        setEdges(initialGraphState.edges || []);
        return;
      }
    }

    // Only sync if we have frames, no nodes, and no initial graph state was provided
    if (frames.length > 0 && nodes.length === 0 && !initialGraphState?.nodes?.length) {
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      
      frames.forEach((frame, index) => {
        const nodeId = getId();
        const x = index * 500; // More space for enhanced nodes
        const y = 100;
        
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
          const attachmentNodeId = getId();
          // Normalize 'pdf-kb' to 'pdf-attachment' since they use the same node component
          const nodeType = frame.attachment.type === 'pdf-kb'
            ? 'pdf-attachment'
            : `${frame.attachment.type}-attachment`;
          const attachmentNode: Node = {
            id: attachmentNodeId,
            type: nodeType,
            position: { x: x + 420, y: y }, // Position to the right
            data: createAttachmentNodeData(frame.attachment, frame.id)
          };
          
          newNodes.push(attachmentNode);
          
          // Create attachment edge with unique ID
          newEdges.push({
            id: `edge_${attachmentNodeId}_${nodeId}_attachment`,
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
      if (reactFlowInstance) {
        setTimeout(() => {
          reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
          console.log('✅ Auto-layout viewport updated');
        }, 150);
      }
    };

    window.addEventListener('graph-layout-applied', handleAutoLayoutApplied as EventListener);
    return () => window.removeEventListener('graph-layout-applied', handleAutoLayoutApplied as EventListener);
  }, [initialGraphState, reactFlowInstance, setNodes, setEdges]);

  // CRITICAL FIX: Sync existing nodes with updated frame data when frames prop changes
  useEffect(() => {
    // Only update existing nodes if we have both frames and nodes
    if (frames.length > 0 && nodes.length > 0) {
      // PERFORMANCE FIX: Skip sync if any node is currently being dragged to prevent blinking
      const isDragging = nodes.some(node => node.dragging === true);
      if (isDragging) {
        return;
      }
      
      // CRITICAL FIX: Skip sync for short period after drag to prevent attachment clearing
      const recentDragEnd = nodes.some(node => node.selected === true);
      if (recentDragEnd) {
        return;
      }
      
      // REMOVED: Performance spam logging that was firing 200+ times per interaction
      // console.log('🔄 Checking frame-to-node sync:', ...)
      
      // Check if any frame data has changed and update corresponding nodes
      let hasChanges = false;
      const updatedNodes = nodes.map(node => {
        if (node.type === 'aiframe' && node.data?.frameId) {
          const correspondingFrame = frames.find(f => f.id === node.data.frameId);
          if (correspondingFrame) {
            // Check if node data is different from frame data
            const nodeNeedsUpdate = 
              node.data.title !== correspondingFrame.title ||
              node.data.goal !== correspondingFrame.goal ||
              node.data.informationText !== correspondingFrame.informationText ||
              node.data.afterVideoText !== correspondingFrame.afterVideoText;
            
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
                  // CRITICAL FIX: Preserve existing node attachment unless frame has newer one
                  attachment: correspondingFrame.attachment || node.data.attachment,
                  updatedAt: new Date().toISOString()
                }
              };
            }
          }
        }
        return node;
      });
      
      // Only update nodes if there were actual changes
      if (hasChanges) {
        setNodes(updatedNodes);

        // CRITICAL FIX: Save graph state after updating nodes with frame data
        setTimeout(() => {
          emitGraphStateChange('frame-data-sync', {
            updatedNodeCount: updatedNodes.filter((node, index) => {
              const originalNode = nodes[index];
              return originalNode && JSON.stringify(node.data) !== JSON.stringify(originalNode.data);
            }).length
          });
        }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
      }
    }
  }, [frames]); // PERFORMANCE FIX: Remove 'nodes' dependency to prevent constant firing

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
          const attachment: FrameAttachment = {
            id: sourceNode.id,
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

          // Attach content to frame
          handleAttachContent(targetNode.data.frameId, attachment);
          
          // Update source node as attached
          setNodes(nds => nds.map(node => {
            if (node.id === sourceNode.id) {
              // DRAGON SLAYER: Silent node attachment
              return { ...node, data: { ...node.data, isAttached: true, attachedToFrameId: targetNode.data.frameId } };
            }
            return node;
          }));
        }
      }

      const isChapterOrderingEdge =
        sourceType === 'chapter' &&
        targetType === 'chapter' &&
        params.sourceHandle === 'chapter-order-out' &&
        params.targetHandle === 'chapter-order-in';

      // Create the edge with enhanced styling and guaranteed unique ID
      const edge: Edge = {
        id: `edge_${params.source}_${params.target}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
      setEdges((eds) => {
        const existingEdge = eds.find(e => e.id === edge.id);
        if (existingEdge) {
          console.log('🔄 Edge already exists, skipping duplicate:', edge.id);
          return eds;
        }
        return addEdge(edge, eds);
      });
      
      // Emit connection event for real-time sync
      if (typeof window !== 'undefined') {
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

          emitGraphStateChange('edge-added', {
            edgeData: edge
          }, {
            nodes: nextNodes,
            edges: nextEdges
          });
        }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
      }
    },
    [normalizeConceptValue, handleAttachConceptToFrame, handleAttachConceptToChapter, handleAttachContent, emitGraphStateChange]
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
            setNodes(nds => nds.map(node => {
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
    [normalizeConceptValue, handleDetachConceptFromFrame, handleDetachConceptFromChapter, handleDetachContent, emitGraphStateChange]
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
              id: getId(),
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
              id: getId(),
              title: "PDF Document",
              pdfUrl: "",
              pages: "",
              notes: "",
              isAttached: false,
            };
            
          case "text-attachment":
            return {
              type: "text-attachment",
              id: getId(),
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
              frames: frames,
              chapters: chapters,
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

      if (type === 'chapter') {
        boundChapterUpdateHandlers.current.add(nodeId);
      }

      setNodes((nds) => nds.concat(newNode));

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
      if (type === "aiframe" && onFramesChange) {
        
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
            onFramesChange(updatedFrames);
            
            // CRITICAL FIX: Emit immediate save event for new frame
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('graph-frame-added', {
                detail: {
                  newFrame,
                  totalFrames: updatedFrames.length
                }
              }));
              
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
          }
        } finally {
          // Reset mutex after a short delay
          setTimeout(() => {
            isCreatingFrame.current = false;
          }, 100);
        }
      }
    },
    [reactFlowInstance, onFramesChange, handleFrameUpdate, handleAttachContent, handleDetachContent, handleConceptUpdate, handleConceptDelete, frames, chapters]
  );

  // Handle node selection and emit events for Frame Navigation sync
  const handleNodeClick = useCallback((_event: any, node: any) => {
    setSelectedNode(node.id);
    
    // If it's an AI frame node, emit event to sync with Frame Navigation
    if (node.data?.type === 'aiframe' && node.data?.frameId) {
      // CRITICAL FIX: Use ref to get current frames
      const currentFrames = framesRef.current;
      const frameIndex = currentFrames.findIndex(frame => frame.id === node.data.frameId);
      if (frameIndex !== -1) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('graph-frame-selected', {
            detail: {
              frameId: node.data.frameId,
              frameIndex,
              nodeId: node.id
            }
          }));
        }
      }
    }
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
        onGraphChange?.(newGraphState); // CRITICAL FIX: Use optional chaining to prevent undefined invocation
      }, 500); // Debounce to 500ms for better performance
    };
  }, [onGraphChange]);

  // Update graph state when nodes/edges change
  useEffect(() => {
    if (onGraphChange) {
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
    
  }, [nodes, edges, selectedNode, debouncedGraphChange, onGraphChange]);
  
  // PERFORMANCE: Add React Flow performance optimizations
  const nodesDraggable = true;
  const nodesConnectable = true;
  const elementsSelectable = true;
  
  // PERFORMANCE: Memoize node types to prevent recreating on every render
  const memoizedNodeTypes = useMemo(() => enhancedNodeTypes, []);

  return (
    <div className="flex h-screen">
      <EnhancedSidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
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
          attributionPosition="top-right"
          proOptions={{ hideAttribution: true }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
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
