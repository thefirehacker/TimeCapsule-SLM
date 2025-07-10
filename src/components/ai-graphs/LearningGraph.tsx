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

import YouTubeNode from "./YouTubeNode";
import PDFNode from "./PDFNode";
import TextNode from "./TextNode";
import AIFrameNode from "./AIFrameNode";
import ConceptNode from "./ConceptNode";
import ChapterNode from "./ChapterNode";
import Sidebar from "./Sidebar";
import { NodeData, DragItem, GraphState, FrameGraphMapping } from "./types";

const nodeTypes = {
  youtube: YouTubeNode,
  pdf: PDFNode,
  text: TextNode,
  aiframe: AIFrameNode,
  concept: ConceptNode,
  chapter: ChapterNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

interface LearningGraphProps {
  mode?: "creator" | "learner";
  frames?: any[];
  onFramesChange?: (frames: any[]) => void;
  onGraphChange?: (graphState: GraphState) => void;
  initialGraphState?: GraphState;
}

export default function LearningGraph({ 
  mode = "creator",
  frames = [],
  onFramesChange,
  onGraphChange,
  initialGraphState
}: LearningGraphProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialGraphState?.nodes || initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialGraphState?.edges || initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [frameGraphMapping, setFrameGraphMapping] = useState<FrameGraphMapping[]>([]);

  // Sync frames to graph nodes on initial load
  useEffect(() => {
    if (frames.length > 0 && nodes.length === 0) {
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];
      const newMapping: FrameGraphMapping[] = [];
      
      frames.forEach((frame, index) => {
        const nodeId = getId();
        const x = index * 400;
        const y = 100;
        
        // Create AI frame node
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
            videoUrl: frame.videoUrl,
            startTime: frame.startTime,
            duration: frame.duration,
            afterVideoText: frame.afterVideoText,
            aiConcepts: frame.aiConcepts,
            isGenerated: frame.isGenerated,
            sourceGoal: frame.sourceGoal,
            sourceUrl: frame.sourceUrl,
            onFrameUpdate: handleFrameUpdate,
          },
        };
        
        newNodes.push(frameNode);
        
        // Create concept nodes for this frame
        const conceptNodes: string[] = [];
        frame.aiConcepts.forEach((concept: string, conceptIndex: number) => {
          const conceptNodeId = getId();
          const conceptNode: Node = {
            id: conceptNodeId,
            type: "concept",
            position: { x: x + 400, y: y + (conceptIndex * 80) },
            data: {
              type: "concept",
              concept: concept,
              description: `Related concept for ${frame.title}`,
              relatedFrameId: frame.id,
            },
          };
          
          newNodes.push(conceptNode);
          conceptNodes.push(conceptNodeId);
          
          // Connect concept to frame
          newEdges.push({
            id: `${nodeId}-${conceptNodeId}`,
            source: nodeId,
            target: conceptNodeId,
            type: "straight",
            style: { stroke: "#fbbf24", strokeWidth: 2 },
          });
        });
        
        // Create sequential connection to next frame
        if (index > 0) {
          const prevNodeId = newMapping[index - 1]?.nodeId;
          if (prevNodeId) {
            newEdges.push({
              id: `${prevNodeId}-${nodeId}`,
              source: prevNodeId,
              target: nodeId,
              type: "smoothstep",
              style: { stroke: "#3b82f6", strokeWidth: 3 },
            });
          }
        }
        
        newMapping.push({
          frameId: frame.id,
          nodeId: nodeId,
          conceptNodes: conceptNodes,
        });
      });
      
      setNodes(newNodes);
      setEdges(newEdges);
      setFrameGraphMapping(newMapping);
    }
  }, [frames, nodes.length, setNodes, setEdges]);

  // Handle frame updates from graph nodes
  const handleFrameUpdate = useCallback((frameId: string, updatedData: any) => {
    if (onFramesChange) {
      const updatedFrames = frames.map(frame => 
        frame.id === frameId ? { ...frame, ...updatedData } : frame
      );
      onFramesChange(updatedFrames);
    }
  }, [frames, onFramesChange]);

  // Handle sequential connections (only one connection per node)
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source already has an outgoing connection
      const existingEdge = edges.find(edge => edge.source === params.source && edge.target !== params.target);
      
      if (existingEdge) {
        // Remove existing edge to maintain sequential flow
        setEdges((eds) => eds.filter(edge => edge.id !== existingEdge.id));
      }
      
      // Add new edge
      const newEdge = {
        ...params,
        type: "smoothstep",
        style: { stroke: "#3b82f6", strokeWidth: 3 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edges, setEdges]
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

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeData: NodeData = (() => {
        switch (type as DragItem["nodeType"]) {
          case "youtube":
            return {
              type: "youtube",
              videoUrl: "",
              timestamp: "",
              text: "",
            };
          case "pdf":
            return {
              type: "pdf",
              pdfUrl: "",
              pages: "",
              text: "",
            };
          case "text":
            return {
              type: "text",
              text: "",
            };
          case "aiframe":
            return {
              type: "aiframe",
              frameId: getId(),
              title: "New AI Frame",
              goal: "Learning goal",
              informationText: "Information text",
              videoUrl: "",
              startTime: 0,
              duration: 300,
              afterVideoText: "Key takeaways",
              aiConcepts: [],
              isGenerated: false,
              onFrameUpdate: handleFrameUpdate,
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
            throw new Error(`Unknown node type: ${type}`);
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
        const newFrame = {
          id: newNodeData.frameId,
          title: newNodeData.title,
          goal: newNodeData.goal,
          informationText: newNodeData.informationText,
          videoUrl: newNodeData.videoUrl,
          startTime: newNodeData.startTime,
          duration: newNodeData.duration,
          afterVideoText: newNodeData.afterVideoText,
          aiConcepts: newNodeData.aiConcepts,
          isGenerated: newNodeData.isGenerated,
          sourceGoal: newNodeData.sourceGoal,
          sourceUrl: newNodeData.sourceUrl,
          // Add required fields for frame structure
          order: frames.length + 1,
          bubblSpaceId: "default",
          timeCapsuleId: "default",
          parentFrameId: undefined,
          type: 'frame' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        onFramesChange([...frames, newFrame]);
      }
    },
    [reactFlowInstance, setNodes, frames, onFramesChange]
  );

  const onDragStart = (
    event: React.DragEvent,
    nodeType: DragItem["nodeType"]
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
  }, []);

  // Sync graph changes back to parent
  useEffect(() => {
    if (onGraphChange) {
      onGraphChange({
        nodes,
        edges,
        selectedNodeId: selectedNode,
      });
    }
  }, [nodes, edges, selectedNode, onGraphChange]);

  return (
    <div className="h-full flex">
      <ReactFlowProvider>
        <Sidebar onDragStart={onDragStart} mode={mode} />
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
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
            connectionLineStyle={{ stroke: "#3b82f6", strokeWidth: 3 }}
            defaultEdgeOptions={{
              type: "smoothstep",
              style: { stroke: "#3b82f6", strokeWidth: 3 },
            }}
          >
            <Controls />
            <MiniMap
              nodeStrokeColor="#374151"
              nodeColor={(node) => {
                switch (node.type) {
                  case "aiframe": return "#8b5cf6";
                  case "concept": return "#f59e0b";
                  case "chapter": return "#10b981";
                  case "youtube": return "#ef4444";
                  case "pdf": return "#3b82f6";
                  case "text": return "#10b981";
                  default: return "#9CA3AF";
                }
              }}
              nodeBorderRadius={2}
            />
            <Background
              variant={BackgroundVariant.Dots}
              gap={12}
              size={1}
              color="#D1D5DB"
            />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
