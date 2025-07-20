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

import { 
  NodeData, 
  EnhancedDragItem, 
  GraphState, 
  FrameGraphMapping,
  FrameAttachment,
  VideoAttachmentNodeData,
  PDFAttachmentNodeData,
  TextAttachmentNodeData
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

let id = 0;
const getId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${id++}`; // SPECS FIX: Guaranteed unique IDs

interface EnhancedLearningGraphProps {
  mode?: "creator" | "learner";
  frames?: any[];
  onFramesChange?: (frames: any[]) => void;
  onGraphChange?: (graphState: GraphState) => void;
  initialGraphState?: GraphState;
}

export default function EnhancedLearningGraph({ 
  mode = "creator",
  frames = [],
  onFramesChange,
  onGraphChange,
  initialGraphState
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
  
  // CRITICAL FIX: Add ref to track current frames and prevent stale closure issues
  const framesRef = useRef(frames);
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);
  
  // CRITICAL FIX: Add refs to track current graph state for fresh values
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const selectedNodeRef = useRef(selectedNode);
  
  useEffect(() => {
    nodesRef.current = nodes;
    edgesRef.current = edges;
    selectedNodeRef.current = selectedNode;
  }, [nodes, edges, selectedNode]);
  
  // CRITICAL FIX: Add mutex to prevent concurrent frame creation
  const isCreatingFrame = useRef(false);
  
  // HELPER: Emit graph state change with deduplication (using refs for fresh values)
  const emitGraphStateChange = useCallback((reason: string, additionalDetail: any = {}) => {
    const now = Date.now();
    if (now - lastEmissionRef.current < 200) {
      // SPECS COMPLIANT: 200ms debounce for performance optimization
      return;
    }
    
    lastEmissionRef.current = now;
    
    // Get fresh values from refs to avoid stale closures
    const currentNodes = nodesRef.current;
    const currentEdges = edgesRef.current;
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
    
    // Emit immediate events for add/remove
    meaningfulChanges.forEach(change => {
      if (typeof window !== 'undefined') {
        const elementId = (change.type === 'add' || change.type === 'remove') ? (change as any).id : undefined;
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
      
      console.log(`🎯 Edge changes detected (${meaningfulChanges.length}), triggering unified save`);
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
    
    console.log('🔄 FRAME UPDATE DEBUG:', {
      frameId,
      originalData: updatedData,
      safeUpdatedData,
      hasOnFramesChange: !!onFramesChange,
      safeDataKeys: Object.keys(safeUpdatedData)
    });
    
    // CRITICAL FIX: Only update if we have safe data to prevent corruption
    if (Object.keys(safeUpdatedData).length > 0 && onFramesChange) {
      // CRITICAL FIX: Use framesRef.current instead of stale frames prop to prevent empty array corruption
      const currentFrames = framesRef.current;
      const updatedFrames = currentFrames.map(frame => 
        frame.id === frameId ? { ...frame, ...safeUpdatedData, updatedAt: new Date().toISOString() } : frame
      );
      
      console.log('🔄 CALLING onFramesChange with:', {
        frameCount: updatedFrames.length,
        updatedFrame: updatedFrames.find(f => f.id === frameId)
      });
      
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
    
    
    // CRITICAL DEBUG: Log video attachment data
    if (attachment.type === 'video') {
      console.log('🎥 CRITICAL DEBUG: Video attachment data:', {
        attachmentDataVideoUrl: attachment.data.videoUrl,
        attachmentDataStartTime: attachment.data.startTime,
        attachmentDataDuration: attachment.data.duration,
        videoUrlEmpty: !attachment.data.videoUrl,
        videoUrlLength: attachment.data.videoUrl?.length || 0
      });
    }
    
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
      
      // CRITICAL DEBUG: Log the frame update
      if (attachment.type === 'video') {
        const updatedFrame = updatedFrames.find(f => f.id === frameId);
        console.log('🎥 CRITICAL DEBUG: Frame updated with video data:', {
          frameId,
          frameVideoUrl: updatedFrame?.videoUrl,
          frameStartTime: updatedFrame?.startTime,
          frameDuration: updatedFrame?.duration,
          frameHasAttachment: !!updatedFrame?.attachment,
          frameAttachmentType: updatedFrame?.attachment?.type
        });
      }
      
      onFramesChange(updatedFrames);
      
      console.log('📊 ATTACHMENT DEBUG: Frame updated in array:', {
        frameId,
        totalFrames: updatedFrames.length,
        attachedFrame: updatedFrames.find(f => f.id === frameId),
        attachmentPresent: !!updatedFrames.find(f => f.id === frameId)?.attachment
      });
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

    // Emit event to sync with Frame Navigation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('graph-attachment-changed', {
        detail: {
          frameId,
          attachment,
          action: 'attached'
        }
      }));
    }

    console.log('✅ Enhanced: Content attached → Frame Navigation sync triggered:', {
      frameId,
      attachmentType: attachment.type,
      action: 'attached'
    });
    
    // OPTIMISTIC: Background save will handle persistence automatically
    // No need for force save since optimistic updates are now implemented
  }, [frames, onFramesChange]);

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

    // Emit event to sync with Frame Navigation
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('graph-attachment-changed', {
        detail: {
          frameId,
          attachment: undefined,
          action: 'detached'
        }
      }));
    }

    console.log('✅ Enhanced: Content detached → Frame Navigation sync triggered:', {
      frameId,
      action: 'detached'
    });
  }, [frames, onFramesChange]);

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
    // If initialGraphState was provided with nodes, ensure they are displayed
    if (initialGraphState?.nodes?.length && nodes.length === 0) {
      console.log('🔄 Applying initial graph state with nodes:', {
        initialNodeCount: initialGraphState.nodes.length,
        currentNodeCount: nodes.length
      });
      
      // Use the initialGraphState if provided and we have no nodes
      setNodes(initialGraphState.nodes);
      setEdges(initialGraphState.edges || []);
      return;
    }
    
    // Only sync if we have frames, no nodes, and no initial graph state was provided
    if (frames.length > 0 && nodes.length === 0 && !initialGraphState?.nodes?.length) {
      console.log('🔄 Syncing frames to nodes - creating nodes from frames:', {
        frameCount: frames.length,
        frameIds: frames.map(f => f.id),
        currentNodeCount: nodes.length
      });
      
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
        
        // DEBUG: Verify content preservation
        if (frame.title !== safeFrameData.title || frame.goal !== safeFrameData.goal) {
          console.log('🔍 CONTENT PRESERVATION CHECK:', {
            frameId: frame.id,
            originalTitle: frame.title,
            preservedTitle: safeFrameData.title,
            originalGoal: frame.goal,
            preservedGoal: safeFrameData.goal
          });
        }

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
        
        console.log('🔧 NODE CREATION DEBUG:', {
          frameId: frame.id,
          nodeId: nodeId,
          hasHandleFrameUpdate: !!handleFrameUpdate,
          callbackAttached: !!frameNode.data.onFrameUpdate
        });
        
        newNodes.push(frameNode);
        
        // If frame has attachment, create the attachment node
        if (frame.attachment) {
          const attachmentNodeId = getId();
          const attachmentNode: Node = {
            id: attachmentNodeId,
            type: `${frame.attachment.type}-attachment`,
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
      
      console.log('✅ Enhanced: Graph synchronized with frames:', {
        frameCount: frames.length,
        nodeCount: newNodes.length,
        edgeCount: newEdges.length
      });
      
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
  useEffect(() => {
    if (initialGraphState?.nodes?.length) {
      // Create a signature of the initialGraphState to detect actual changes
      const currentSignature = `${initialGraphState.nodes.length}-${initialGraphState.nodes.map(n => n.id).sort().join(',')}`;
      
      // Only apply if this is a new/different graph state
      if (lastAppliedGraphState.current !== currentSignature) {
        // Apply updated graph state
        
        // Apply the new graph state
        setNodes(initialGraphState.nodes);
        setEdges(initialGraphState.edges || []);
        lastAppliedGraphState.current = currentSignature;
      }
    }
  }, [initialGraphState]);

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
        console.log('✅ SYNC FIX: Node synchronization completed with updated frame data');
        
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
        return {
          ...baseData,
          type: 'pdf-attachment',
          pdfUrl: attachment.data.pdfUrl || '',
          pages: attachment.data.pages || '',
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
      
      
      // Check if this is an attachment connection
      if (params.targetHandle === 'attachment-slot') {
        const sourceNode = nodes.find(n => n.id === params.source);
        const targetNode = nodes.find(n => n.id === params.target);
        
        if (sourceNode && targetNode && targetNode.data.frameId) {
          // Check if target frame already has an attachment
          const hasAttachment = edges.some(edge => 
            edge.target === params.target && (edge as any).targetHandle === 'attachment-slot'
          );
          
          if (hasAttachment) {
            
            return;
          }
          
          // ENHANCED DEBUG: Check if video attachment has empty URL
          if (sourceNode.type === 'video-attachment' && !sourceNode.data.videoUrl) {
            console.warn('⚠️ VIDEO ATTACHMENT WARNING: VideoAttachmentNode has empty videoUrl!');
            console.warn('📝 USER WORKFLOW: Please edit the VideoAttachmentNode first and add a YouTube URL before connecting');
            console.warn('🎯 EXPECTED WORKFLOW: 1) Drag VideoAttachmentNode → 2) Click Edit → 3) Add YouTube URL → 4) Save → 5) Connect to frame');
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
          
          // ENHANCED DEBUG: Log attachment being created with detailed video info
          console.log('🔗 Creating attachment connection:', {
            sourceNode: sourceNode.type,
            targetFrameId: targetNode.data.frameId,
            attachmentType: attachment.type,
            attachmentData: attachment.data,
            sourceNodeVideoUrl: sourceNode.data.videoUrl,
            sourceNodeStartTime: sourceNode.data.startTime,
            sourceNodeDuration: sourceNode.data.duration,
            // CRITICAL DEBUG: Show if video URL is empty
            videoUrlEmpty: !sourceNode.data.videoUrl,
            videoUrlLength: sourceNode.data.videoUrl?.length || 0,
            // CRITICAL DEBUG: Show what's actually in attachment.data
            attachmentDataVideoUrl: attachment.data.videoUrl,
            attachmentDataStartTime: attachment.data.startTime,
            attachmentDataDuration: attachment.data.duration
          });
          
          // ENHANCED DEBUG: Warn if video attachment has no URL
          if (sourceNode.type === 'video-attachment' && !sourceNode.data.videoUrl) {
            console.error('❌ CRITICAL: Video attachment connected with empty videoUrl!');
            console.error('💡 SOLUTION: Edit the VideoAttachmentNode and add a YouTube URL before connecting');
            console.error('🔧 CURRENT DATA:', {
              videoUrl: sourceNode.data.videoUrl,
              startTime: sourceNode.data.startTime,
              duration: sourceNode.data.duration,
              title: sourceNode.data.title
            });
          }
          
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
      
      // Create the edge with enhanced styling and guaranteed unique ID
      const edge: Edge = {
        id: `edge_${params.source}_${params.target}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle || null,
        targetHandle: params.targetHandle || null,
        style: params.targetHandle === 'attachment-slot' 
          ? { stroke: "#f97316", strokeWidth: 3 } 
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
            sourceNode: nodes.find(n => n.id === params.source),
            targetNode: nodes.find(n => n.id === params.target),
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
        
        // CRITICAL FIX: Emit graph-state-changed to trigger unified save
        setTimeout(() => {
          emitGraphStateChange('edge-added', {
            edgeData: edge
          });
          
          console.log('🎯 Connection created, triggering unified save:', {
            edgeId: edge.id,
            source: edge.source,
            target: edge.target
          });
        }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
      }
    },
    [handleAttachContent] // PERFORMANCE FIX: Remove nodes/edges deps to prevent constant recreation during drag
  );

  // REAL-TIME SYNC: Handle edge/connection deletion
  const onEdgesDelete = useCallback(
    (edgesToDelete: Edge[]) => {
      console.log('🗑️ Enhanced: Connections being deleted:', {
        count: edgesToDelete.length,
        edges: edgesToDelete.map(e => ({ id: e.id, source: e.source, target: e.target }))
      });

      edgesToDelete.forEach(edge => {
        // Check if this is an attachment connection
        if ((edge as any).targetHandle === 'attachment-slot') {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);
          
          if (sourceNode && targetNode && targetNode.data.frameId) {
            console.log('🔗 Enhanced: Removing attachment connection:', {
              sourceNodeId: sourceNode.id,
              targetFrameId: targetNode.data.frameId
            });
            
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
        
        // Emit connection removal event for real-time sync
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('graph-connection-removed', {
            detail: {
              connection: edge,
              sourceNode: nodes.find(n => n.id === edge.source),
              targetNode: nodes.find(n => n.id === edge.target),
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
          
          // CRITICAL FIX: Emit graph-state-changed to trigger unified save for edge deletion
          setTimeout(() => {
            emitGraphStateChange('edge-removed', {
              edgeData: edge
            });
            
            console.log('🎯 Connection removed, triggering unified save:', {
              edgeId: edge.id,
              source: edge.source,
              target: edge.target
            });
          }, 200); // SPECS COMPLIANT: Debounced timing to ensure fresh state
        }
      });
    },
    [nodes, handleDetachContent]
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
            };
            
          case "chapter":
            return {
              type: "chapter",
              title: "New Chapter",
              description: "Chapter description",
              frameIds: [],
            };
            
          default:
            throw new Error(`Unknown enhanced node type: ${type}`);
        }
      })();

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: newNodeData,
      };

      setNodes((nds) => nds.concat(newNode));
      
      // CRITICAL FIX: Emit save events for ALL node types
      if (typeof window !== 'undefined') {
        // Emit graph state changed event to trigger unified save
        emitGraphStateChange('node-added', {
          nodeType: type
        });
        
        console.log(`🎯 Node drop detected - ${type} added, triggering unified save`);
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
            
            console.log('✅ New frame created via drag-drop:', {
              frameId: newFrame.id,
              title: newFrame.title,
              totalFrames: updatedFrames.length
            });
          }
        } finally {
          // Reset mutex after a short delay
          setTimeout(() => {
            isCreatingFrame.current = false;
          }, 100);
        }
      }
    },
    [reactFlowInstance, onFramesChange, handleFrameUpdate, handleAttachContent, handleDetachContent]
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
        
        // REDUCED LOGGING: Only log significant events to reduce spam
        if (frameIndex !== (window as any).lastFrameIndex) {
          console.log('🔄 Enhanced: Graph node selected → Frame Navigation sync triggered:', {
            nodeId: node.id,
            frameId: node.data.frameId,
            frameIndex
          });
          (window as any).lastFrameIndex = frameIndex;
        }
      }
    }
  }, []);

  // Listen for clear all frames event and reset graph nodes/edges
  useEffect(() => {
    const handleClearAllFrames = (event: CustomEvent) => {
      const { clearedCount } = event.detail;
      console.log('🗑️ Enhanced Graph: Clear all frames event received, clearing nodes and edges:', {
        clearedCount,
        currentNodes: nodes.length,
        currentEdges: edges.length
      });
      
      // Clear all nodes and edges
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      
      
    };

    const handleAttachmentNodeUpdated = (event: CustomEvent) => {
      const { frameId, attachment, nodeId } = event.detail;
      console.log('📡 Enhanced Graph: Attachment node updated event received:', {
        frameId, 
        nodeId, 
        attachmentType: attachment.type,
        attachmentData: attachment.data
      });
      
      // CRITICAL: Update the graph node itself to reflect the latest attachment data
      setNodes(nds => nds.map(node => {
        if (node.id === nodeId) {
          console.log('🔄 Updating graph node with latest attachment data:', {
            nodeId,
            oldData: node.data,
            newAttachmentData: attachment.data
          });
          
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
      console.log('🔄 REACT FLOW NODE UPDATE:', { 
        nodeId, 
        hasText: !!newData.text, 
        textLength: newData.text?.length || 0,
        isAttached: newData.isAttached,
        attachedToFrameId: newData.attachedToFrameId
      });
      
      setNodes(currentNodes => 
        currentNodes.map(node => {
          if (node.id === nodeId) {
            console.log('🔄 UPDATING NODE DATA:', {
              nodeId,
              oldIsAttached: node.data.isAttached,
              newIsAttached: newData.isAttached,
              oldFrameId: node.data.attachedToFrameId,
              newFrameId: newData.attachedToFrameId
            });
            return { ...node, data: newData };
          }
          return node;
        })
      );
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
          minZoom={0.5}
          maxZoom={2}
        >
          <MiniMap />
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
} 