"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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
const getId = () => `enhanced_node_${id++}`;

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

  // Handle frame updates from enhanced AI frame nodes
  const handleFrameUpdate = useCallback((frameId: string, updatedData: any) => {
    // CRITICAL FIX: Update both frames array AND graph node data
    if (onFramesChange) {
      const updatedFrames = frames.map(frame => 
        frame.id === frameId ? { ...frame, ...updatedData } : frame
      );
      onFramesChange(updatedFrames);
      console.log('🔄 Enhanced: Frame updated via graph node:', { frameId, updatedData });
    }
    
    // CRITICAL FIX: Also update the graph node data to keep it in sync
    setNodes(nds => nds.map(node => {
      if (node.data.frameId === frameId) {
        console.log('🔄 Enhanced: Updating graph node data for frame:', {
          frameId,
          nodeId: node.id,
          oldTitle: node.data.title,
          newTitle: updatedData.title,
          updatedData
        });
        
        return {
          ...node,
          data: {
            ...node.data,
            title: updatedData.title || node.data.title,
            goal: updatedData.goal || node.data.goal,
            informationText: updatedData.informationText || node.data.informationText,
            afterVideoText: updatedData.afterVideoText || node.data.afterVideoText,
            aiConcepts: updatedData.aiConcepts || node.data.aiConcepts,
            isGenerated: updatedData.isGenerated !== undefined ? updatedData.isGenerated : node.data.isGenerated,
            sourceGoal: updatedData.sourceGoal || node.data.sourceGoal,
            sourceUrl: updatedData.sourceUrl || node.data.sourceUrl,
            attachment: updatedData.attachment || node.data.attachment,
            updatedAt: new Date().toISOString()
          }
        };
      }
      return node;
    }));
  }, [frames, onFramesChange]);

  // Handle content attachment to frames
  const handleAttachContent = useCallback((frameId: string, attachment: FrameAttachment) => {
    console.log('🔗 Enhanced: Attaching content to frame:', { frameId, attachment });
    
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
      const updatedFrames = frames.map(frame => 
        frame.id === frameId ? { 
          ...frame, 
          attachment,
          // Also update legacy fields for backward compatibility
          ...(attachment.type === 'video' && {
            videoUrl: attachment.data.videoUrl,
            startTime: attachment.data.startTime,
            duration: attachment.data.duration
          })
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
    
    // CRITICAL FIX: Force save to Knowledge Base when attachment is added
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: 'attachment-added',
            frameId,
            attachmentType: attachment.type
          }
        }));
      }
    }, 100);
  }, [frames, onFramesChange]);

  // Handle content detachment from frames
  const handleDetachContent = useCallback((frameId: string) => {
    console.log('🔗 Enhanced: Detaching content from frame:', { frameId });
    
    // Update the frame in the frames array
    if (onFramesChange) {
      const updatedFrames = frames.map(frame => 
        frame.id === frameId ? { 
          ...frame, 
          attachment: undefined,
          // Clear legacy fields
          videoUrl: '',
          startTime: 0,
          duration: 300
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
        console.log('🗑️ REAL-TIME: Nodes deleted from graph:', {
          deletedNodes: deletedNodes.map(n => ({ id: n.id, type: n.type }))
        });

        // Handle AI frame node deletions
        const deletedAIFrameNodes = deletedNodes.filter(node => 
          node.type === 'aiframe' && node.data?.frameId
        );

        if (deletedAIFrameNodes.length > 0 && onFramesChange) {
          const deletedFrameIds = deletedAIFrameNodes.map(node => node.data.frameId);
          console.log('🗑️ REAL-TIME: AI Frame nodes deleted, removing from frames array:', {
            deletedFrameIds
          });

          // Remove frames from frames array
          const updatedFrames = frames.filter(frame => !deletedFrameIds.includes(frame.id));
          onFramesChange(updatedFrames);

          // Emit events for each deleted frame
          deletedFrameIds.forEach(frameId => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('graph-frame-deleted', {
                detail: { frameId }
              }));
            }
          });

          console.log('✅ REAL-TIME: Deleted AI Frame nodes synced to frames array:', {
            deletedFrameIds,
            remainingFrames: updatedFrames.length
          });
        }
      }
    }

    setPreviousNodes(nodes);
  }, [nodes, frames, onFramesChange]);

  // Sync frames to enhanced graph nodes on initial load
  useEffect(() => {
    // Only sync if we have frames, no nodes, and no initial graph state was provided
    if (frames.length > 0 && nodes.length === 0 && !initialGraphState?.nodes?.length) {
      console.log('🔄 Enhanced: Syncing frames to enhanced graph nodes');
      
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      
      frames.forEach((frame, index) => {
        const nodeId = getId();
        const x = index * 500; // More space for enhanced nodes
        const y = 100;
        
        // Create enhanced AI frame node
        const frameNode: Node = {
          id: nodeId,
          type: "aiframe",
          position: { x, y },
          data: {
            type: "aiframe",
            frameId: frame.id,
            title: frame.title,
            goal: frame.goal,
            informationText: frame.informationText,
            afterVideoText: frame.afterVideoText,
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
          const attachmentNode: Node = {
            id: attachmentNodeId,
            type: `${frame.attachment.type}-attachment`,
            position: { x: x + 420, y: y }, // Position to the right
            data: createAttachmentNodeData(frame.attachment, frame.id)
          };
          
          newNodes.push(attachmentNode);
          
          // Create attachment edge
          newEdges.push({
            id: `${attachmentNodeId}-${nodeId}`,
            source: attachmentNodeId,
            target: nodeId,
            targetHandle: "attachment-slot",
            type: "straight",
            style: { stroke: "#f97316", strokeWidth: 3 }, // Orange attachment connection
          });
        }
        
        // Connect sequential frames
        if (index > 0) {
          const prevNodeId = newNodes[index * (frame.attachment ? 2 : 1) - (frame.attachment ? 2 : 1)].id;
          newEdges.push({
            id: `${prevNodeId}-${nodeId}`,
            source: prevNodeId,
            target: nodeId,
            type: "straight",
            style: { stroke: "#3b82f6", strokeWidth: 2 }, // Blue sequential connection
          });
        }
      });
      
      setNodes(newNodes);
      setEdges(newEdges);
      
      console.log('✅ Enhanced: Graph synchronized with frames:', {
        frameCount: frames.length,
        nodeCount: newNodes.length,
        edgeCount: newEdges.length
      });
    }
  }, [frames, nodes.length, initialGraphState, handleFrameUpdate, handleAttachContent, handleDetachContent]);

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
      console.log('🔗 Enhanced: Connection attempt:', params);
      
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
            console.log('❌ Enhanced: Frame already has an attachment');
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
            type: sourceNode.type?.replace('-attachment', '') as 'video' | 'pdf' | 'text',
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
          setNodes(nds => nds.map(node => 
            node.id === sourceNode.id 
              ? { ...node, data: { ...node.data, isAttached: true, attachedToFrameId: targetNode.data.frameId } }
              : node
          ));
        }
      }
      
      // Create the edge with enhanced styling
      const edge = {
        ...params,
        style: params.targetHandle === 'attachment-slot' 
          ? { stroke: "#f97316", strokeWidth: 3 } // Orange for attachments
          : { stroke: "#3b82f6", strokeWidth: 2 }, // Blue for sequential
      };
      
      setEdges((eds) => addEdge(edge, eds));
      
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
      }
    },
    [nodes, edges, handleAttachContent]
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
            setNodes(nds => nds.map(node => 
              node.id === sourceNode.id 
                ? { ...node, data: { ...node.data, isAttached: false, attachedToFrameId: undefined } }
                : node
            ));
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
        }
      });
    },
    [nodes, handleDetachContent]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

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
              frameId: `frame-${Date.now()}`,
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
      
      // If it's an AI frame node, sync with frames array
      if (type === "aiframe" && onFramesChange) {
        console.log('🎯 Enhanced: Creating new AI Frame from enhanced graph node');
        
        // FIXED: Generate unique frame title based on highest existing frame number
        const existingFrameNumbers = frames
          .map(f => f.title.match(/^Frame (\d+)$/)?.[1])
          .filter(Boolean)
          .map(Number);
        
        const nextFrameNumber = existingFrameNumbers.length > 0 
          ? Math.max(...existingFrameNumbers) + 1 
          : 1;
        
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
        
        // CRITICAL FIX: Ensure frames array is never empty during creation
        const updatedFrames = frames.length > 0 ? [...frames, newFrame] : [newFrame];
        
        // FIXED: Use a small delay to ensure state is stable before triggering change
        setTimeout(() => {
          onFramesChange(updatedFrames);
          
          // Emit event to sync with Frame Navigation
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('graph-frame-added', {
              detail: {
                newFrame,
                totalFrames: updatedFrames.length
              }
            }));
          }
          
          console.log('✅ Enhanced: New frame added to frames array → Frame Navigation sync triggered:', {
            frameId: newFrame.id,
            title: newFrame.title,
            totalFrames: updatedFrames.length
          });
        }, 50); // Small delay to prevent race conditions
      }
    },
    [reactFlowInstance, frames, onFramesChange, handleFrameUpdate, handleAttachContent, handleDetachContent]
  );

  // Handle node selection and emit events for Frame Navigation sync
  const handleNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node.id);
    
    // If it's an AI frame node, emit event to sync with Frame Navigation
    if (node.data?.type === 'aiframe' && node.data?.frameId) {
      const frameIndex = frames.findIndex(frame => frame.id === node.data.frameId);
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
        
        console.log('🔄 Enhanced: Graph node selected → Frame Navigation sync triggered:', {
          nodeId: node.id,
          frameId: node.data.frameId,
          frameIndex
        });
      }
    }
  }, [frames]);

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
      
      console.log('✅ Enhanced Graph: All nodes and edges cleared successfully');
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

  // Update graph state when nodes/edges change
  useEffect(() => {
    if (onGraphChange) {
      const newGraphState: GraphState = {
        nodes,
        edges,
        selectedNodeId: selectedNode,
      };
      onGraphChange(newGraphState);
    }
  }, [nodes, edges, selectedNode, onGraphChange]);

  return (
    <div className="flex h-screen">
      <EnhancedSidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgesDelete={onEdgesDelete}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={handleNodeClick}
          nodeTypes={enhancedNodeTypes}
          fitView
          attributionPosition="top-right"
        >
          <MiniMap />
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
} 