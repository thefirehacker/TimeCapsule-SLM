"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DragItem } from "./types";

interface SidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: DragItem["nodeType"]) => void;
}

export default function Sidebar({ onDragStart }: SidebarProps) {
  const nodeTypes: DragItem[] = [
    { nodeType: "youtube", label: "YouTube Video" },
    { nodeType: "pdf", label: "PDF Document" },
    { nodeType: "text", label: "Text Note" },
  ];

  const getNodeIcon = (nodeType: DragItem["nodeType"]) => {
    switch (nodeType) {
      case "youtube":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "pdf":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7V15.12c.325-.043.672-.061 1.196-.061.584 0 .962.11 1.232.321.275.217.375.516.375.840 0 .37-.117.651-.305.769zm2.807 2.201c-.42 0-.749-.115-.939-.325-.197-.219-.301-.533-.301-.938v-.859c0-.665.104-.999.31-1.255.207-.263.572-.372 1.023-.372.353 0 .669.048.945.138v.681a3.15 3.15 0 0 0-.723-.069c-.263 0-.42.099-.42.420v.131h1.02v.827h-1.02v.266c0 .315.142.463.427.463a2.49 2.49 0 0 0 .684-.069v.708c-.235.08-.484.118-.716.118zm1.672-3.201H13.2v1.71c0 .42.16.599.5.599.168 0 .27-.018.27-.018v.708c-.094.024-.24.036-.434.036-.711 0-1.057-.344-1.057-1.044V15.19h-.168v-.827h.168v-.979l.898-.097v1.076z" />
            <path d="m14 9-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9h-6z" />
          </svg>
        );
      case "text":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        );
    }
  };

  const getNodeColor = (nodeType: DragItem["nodeType"]) => {
    switch (nodeType) {
      case "youtube":
        return "text-red-600 bg-red-50 hover:bg-red-100 border-red-200";
      case "pdf":
        return "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200";
      case "text":
        return "text-green-600 bg-green-50 hover:bg-green-100 border-green-200";
    }
  };

  return (
    <Card className="w-64 h-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Learning Nodes</CardTitle>
        <p className="text-sm text-gray-600">Drag nodes to the canvas</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {nodeTypes.map((nodeType) => (
          <Button
            key={nodeType.nodeType}
            variant="outline"
            className={`w-full h-16 flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-colors ${getNodeColor(
              nodeType.nodeType
            )}`}
            draggable
            onDragStart={(event) => onDragStart(event, nodeType.nodeType)}
          >
            {getNodeIcon(nodeType.nodeType)}
            <span className="text-xs font-medium">{nodeType.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
