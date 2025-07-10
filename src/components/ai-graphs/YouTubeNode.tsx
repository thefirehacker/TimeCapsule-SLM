"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { YouTubeNodeData } from "./types";

interface YouTubeNodeProps {
  data: YouTubeNodeData;
  id: string;
}

export default function YouTubeNode({ data, id }: YouTubeNodeProps) {
  const [nodeData, setNodeData] = useState<YouTubeNodeData>(data);

  const handleInputChange = (field: keyof YouTubeNodeData, value: string) => {
    setNodeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="min-w-[300px] max-w-[400px] shadow-lg border-red-200">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-red-600 flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          YouTube Video
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <Label htmlFor={`${id}-url`} className="text-xs">
            Video URL
          </Label>
          <Input
            id={`${id}-url`}
            placeholder="https://youtube.com/watch?v=..."
            value={nodeData.videoUrl}
            onChange={(e) => handleInputChange("videoUrl", e.target.value)}
            className="text-xs"
          />
        </div>

        <div>
          <Label htmlFor={`${id}-timestamp`} className="text-xs">
            Timestamp
          </Label>
          <Input
            id={`${id}-timestamp`}
            placeholder="00:00 or 1:30:45"
            value={nodeData.timestamp}
            onChange={(e) => handleInputChange("timestamp", e.target.value)}
            className="text-xs"
          />
        </div>

        <div>
          <Label htmlFor={`${id}-text`} className="text-xs">
            Notes
          </Label>
          <Textarea
            id={`${id}-text`}
            placeholder="Add your notes about this video..."
            value={nodeData.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            className="text-xs min-h-[60px]"
            rows={3}
          />
        </div>
      </CardContent>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  );
}
