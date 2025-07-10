"use client";

import React, { useState, useCallback, useRef } from "react";
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
import Sidebar from "./Sidebar";
import { NodeData, DragItem } from "./types";

const nodeTypes = {
  youtube: YouTubeNode,
  pdf: PDFNode,
  text: TextNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function LearningGraph() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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
    },
    [reactFlowInstance, setNodes]
  );

  const onDragStart = (
    event: React.DragEvent,
    nodeType: DragItem["nodeType"]
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-screen flex">
      <ReactFlowProvider>
        <Sidebar onDragStart={onDragStart} />
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
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Controls />
            <MiniMap
              nodeStrokeColor="#374151"
              nodeColor="#9CA3AF"
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
