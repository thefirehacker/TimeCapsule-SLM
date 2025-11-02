import React, { useState, useCallback, useEffect } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChapterNodeData } from "./types";
import {
  BookOpen,
  Edit3,
  Save,
  X,
  Hash,
  Brain
} from "lucide-react";

export default function ChapterNode({ data, selected }: NodeProps & { data: ChapterNodeData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: typeof data.title === "string" ? data.title : "",
    description: typeof data.description === "string" ? data.description : "",
  });
  const frameCount = Array.isArray(data.frameIds) ? data.frameIds.length : 0;
  const conceptCount = Array.isArray(data.conceptIds) ? data.conceptIds.length : 0;
  const accentColor = typeof data.color === "string" && data.color ? data.color : "#10b981";
  const displayTitle = editValues.title && editValues.title.trim().length > 0
    ? editValues.title
    : "Chapter";
  const displayDescription =
    editValues.description && editValues.description.trim().length > 0
      ? editValues.description
      : "No description provided";

  useEffect(() => {
    setEditValues({
      title: typeof data.title === "string" ? data.title : "",
      description: typeof data.description === "string" ? data.description : "",
    });
  }, [data.title, data.description]);

  const handleSave = useCallback(() => {
    const nextTitle = editValues.title.trim() || "Chapter";
    const rawDescription = editValues.description ?? "";
    const nextDescription = rawDescription.trim().length > 0 ? rawDescription : "";

    const previousTitle = typeof data.title === "string" ? data.title : "";
    const previousDescription = typeof data.description === "string" ? data.description : "";
    const hasChanges =
      nextTitle !== previousTitle ||
      nextDescription !== previousDescription;

    if (hasChanges && typeof data.onChapterUpdate === "function") {
      data.onChapterUpdate({
        title: nextTitle,
        description: nextDescription,
      });
    } else if (!data.onChapterUpdate) {
      Object.assign(data, {
        title: nextTitle,
        description: nextDescription,
      });
    }

    setEditValues({
      title: nextTitle,
      description: nextDescription,
    });

    setIsEditing(false);
  }, [data, editValues]);

  const handleCancel = useCallback(() => {
    setEditValues({
      title: typeof data.title === "string" ? data.title : "",
      description: typeof data.description === "string" ? data.description : "",
    });
    setIsEditing(false);
  }, [data]);

  return (
    <div className="chapter-node relative">
      {/* Sequential connection handle (top) */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#9468e6',
          border: '2px solid white',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(148, 104, 230, 0.3)',
          zIndex: 5
        }}
      />
      
      {/* Chapter ordering handles (left: incoming, right: outgoing) */}
      <Handle
        type="target"
        position={Position.Left}
        id="chapter-order-in"
        style={{
          top: '50%',
          width: '32px',
          height: '32px',
          backgroundColor: '#f97316',
          border: '4px solid white',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
          zIndex: 9
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="chapter-order-out"
        style={{
          top: '50%',
          width: '32px',
          height: '32px',
          backgroundColor: '#f97316',
          border: '4px solid white',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
          zIndex: 9
        }}
      />


      <Card className={`w-64 ${selected ? 'ring-2 ring-green-500' : ''} bg-green-50 border-green-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded" style={{ backgroundColor: `${accentColor}1A` }}>
                <BookOpen className="h-4 w-4" style={{ color: accentColor }} />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-green-800">
                  {isEditing ? (
                    <Input
                      value={editValues.title}
                      onChange={(e) => setEditValues(prev => ({ ...prev, title: e.target.value }))}
                      className="h-6 text-sm"
                    />
                  ) : (
                    displayTitle
                  )}
                </CardTitle>
                <Badge variant="outline" className="mt-1 text-xs bg-green-100 text-green-700 border-green-300">
                  <Hash className="h-2 w-2 mr-1" />
                  {frameCount} frame{frameCount === 1 ? '' : 's'}
                </Badge>
                {conceptCount > 0 && (
                  <Badge variant="outline" className="mt-1 text-xs bg-yellow-100 text-yellow-700 border-yellow-300">
                    <Brain className="h-2 w-2 mr-1" />
                    {conceptCount} concept{conceptCount === 1 ? '' : 's'}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    className="h-6 w-6 p-0"
                  >
                    <Save className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div>
            {isEditing ? (
              <Textarea
                value={editValues.description}
                onChange={(e) => setEditValues(prev => ({ ...prev, description: e.target.value }))}
                className="text-xs h-16"
                placeholder="Enter chapter description..."
              />
            ) : (
              <p className="text-xs text-green-700 line-clamp-3">
                {displayDescription}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Frame attachment handles (shared visual indicator) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="chapter-frame-out"
        style={{
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '26px',
          height: '26px',
          backgroundColor: '#10b981',
          border: '2px solid white',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
          zIndex: 8
        }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="chapter-frame-in"
        style={{
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '2px solid transparent',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)',
          zIndex: 7,
          opacity: 0
        }}
      />
    </div>
  );
} 
