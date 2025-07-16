"use client";

import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TextNodeData } from "./types";

interface TextNodeProps {
  data: TextNodeData;
  id: string;
}

export default function TextNode({ data, id }: TextNodeProps) {
  const [nodeData, setNodeData] = useState<TextNodeData>(data);

  const handleInputChange = (field: keyof TextNodeData, value: string) => {
    setNodeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="min-w-[300px] max-w-[400px] shadow-lg border-green-200">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-6 h-6 bg-black border-2 border-white rounded-full hover:bg-gray-800 transition-colors"
        style={{ 
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      />

      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-green-600 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
          Text Note
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <Label htmlFor={`${id}-text`} className="text-xs">
            Content
          </Label>
          <Textarea
            id={`${id}-text`}
            placeholder="Enter your text content here..."
            value={nodeData.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            className="text-xs min-h-[120px]"
            rows={6}
          />
        </div>
      </CardContent>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-6 h-6 bg-black border-2 border-white rounded-full hover:bg-gray-800 transition-colors"
        style={{ 
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      />
    </Card>
  );
}
