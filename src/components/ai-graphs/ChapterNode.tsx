import React, { useState, useCallback } from "react";
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
  Users,
  Hash
} from "lucide-react";

export default function ChapterNode({ data, selected }: NodeProps & { data: ChapterNodeData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ChapterNodeData>(data);

  const handleSave = useCallback(() => {
    Object.assign(data, editData);
    setIsEditing(false);
  }, [data, editData]);

  const handleCancel = useCallback(() => {
    setEditData(data);
    setIsEditing(false);
  }, [data]);

  return (
    <div className="chapter-node">
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#000000',
          border: '2px solid white',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 5
        }}
      />
      
      <Card className={`w-64 ${selected ? 'ring-2 ring-green-500' : ''} bg-green-50 border-green-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-green-800">
                  {isEditing ? (
                    <Input
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="h-6 text-sm"
                    />
                  ) : (
                    data.title || "Chapter"
                  )}
                </CardTitle>
                <Badge variant="outline" className="mt-1 text-xs bg-green-100 text-green-700 border-green-300">
                  <Hash className="h-2 w-2 mr-1" />
                  {data.frameIds.length} frames
                </Badge>
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
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                className="text-xs h-16"
                placeholder="Enter chapter description..."
              />
            ) : (
              <p className="text-xs text-green-700 line-clamp-3">
                {data.description || "No description provided"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#000000',
          border: '2px solid white',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 5
        }}
      />
    </div>
  );
} 