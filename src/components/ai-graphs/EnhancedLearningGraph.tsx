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

  // Handle frame updates from enhanced AI frame nodes
  const handleFrameUpdate = useCallback((frameId: string, updatedData: any) => {
    if (onFramesChange) {
      const updatedFrames = frames.map(frame => 
        frame.id === frameId ? { ...frame, ...updatedData } : frame
      );
      onFramesChange(updatedFrames);
      console.log('🔄 Enhanced: Frame updated via graph node:', { frameId, updatedData });
    }
  }, [frames, onFramesChange]);

  // Handle content attachment to frames
  const handleAttachContent = useCallback((frameId: string, attachment: FrameAttachment) => {
    console.log('🔗 Enhanced: Attaching content to frame:', { frameId, attachment });
    
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

  // Sync frames to enhanced graph nodes on initial load
  useEffect(() => {
    if (frames.length > 0 && nodes.length === 0) {
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
  }, [frames, nodes.length, handleFrameUpdate, handleAttachContent, handleDetachContent]);

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
    },
    [nodes, edges, handleAttachContent]
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
              videoUrl: "",
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
        
        const newFrame = {
          id: newNodeData.frameId,
          title: newNodeData.title,
          goal: newNodeData.goal,
          informationText: newNodeData.informationText,
          afterVideoText: newNodeData.afterVideoText,
          aiConcepts: newNodeData.aiConcepts || [],
          isGenerated: newNodeData.isGenerated || false,
          // Frame structure fields
          order: frames.length + 1,
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
        
        const updatedFrames = [...frames, newFrame];
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

    window.addEventListener('clear-all-frames', handleClearAllFrames as EventListener);
    
    return () => {
      window.removeEventListener('clear-all-frames', handleClearAllFrames as EventListener);
    };
  }, [nodes.length, edges.length]);

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