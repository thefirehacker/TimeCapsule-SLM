import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AIFrameNodeData } from "./types";
import { 
  Video, 
  Clock, 
  Target, 
  BookOpen, 
  Edit3, 
  Save, 
  X, 
  Play,
  Brain
} from "lucide-react";

interface AIFrameNodeProps extends NodeProps {
  data: AIFrameNodeData & {
    onFrameUpdate?: (frameId: string, updatedData: Partial<AIFrameNodeData>) => void;
  };
}

export default function AIFrameNode({ data, selected }: AIFrameNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<AIFrameNodeData>(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      // Update the node data
      Object.assign(data, editData);
      
      // Sync changes back to parent frames array
      if (data.onFrameUpdate && data.frameId) {
        const updatedFrameData = {
          id: data.frameId,
          title: editData.title,
          goal: editData.goal,
          informationText: editData.informationText,
          videoUrl: editData.videoUrl,
          startTime: editData.startTime,
          duration: editData.duration,
          afterVideoText: editData.afterVideoText,
          aiConcepts: editData.aiConcepts,
          isGenerated: editData.isGenerated,
          sourceGoal: editData.sourceGoal,
          sourceUrl: editData.sourceUrl,
          updatedAt: new Date().toISOString(),
        };
        
        await data.onFrameUpdate(data.frameId, updatedFrameData);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save frame:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data, editData]);

  const handleCancel = useCallback(() => {
    setEditData(data);
    setIsEditing(false);
  }, [data]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="ai-frame-node">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-6 h-6 bg-black border-2 border-white rounded-full hover:bg-gray-800 transition-colors"
        style={{ 
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      />
      
      <Card className={`w-80 ${selected ? 'ring-2 ring-blue-500' : ''} transition-all duration-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-100 rounded">
                <Video className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">
                  {isEditing ? (
                    <Input
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="h-6 text-sm"
                      placeholder="Enter frame title..."
                    />
                  ) : (
                    data.title || "AI Frame"
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-2 w-2 mr-1" />
                    {formatTime(data.duration ?? 0)}
                  </Badge>
                  {data.isGenerated && (
                    <Badge variant="outline" className="text-xs">
                      AI Generated
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-6 w-6 p-0"
                    title="Save changes"
                  >
                    <Save className={`h-3 w-3 ${isSaving ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="h-6 w-6 p-0"
                    title="Cancel changes"
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
                  title="Edit frame"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {/* Goal */}
          <div>
            <Label className="text-xs font-medium flex items-center gap-1">
              <Target className="h-3 w-3" />
              Learning Goal
            </Label>
            {isEditing ? (
              <Textarea
                value={editData.goal}
                onChange={(e) => setEditData({...editData, goal: e.target.value})}
                className="mt-1 text-xs h-16"
                placeholder="Enter the learning goal..."
              />
            ) : (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {data.goal || "No goal specified"}
              </p>
            )}
          </div>

          {/* Video Info */}
          <div>
            <Label className="text-xs font-medium flex items-center gap-1">
              <Play className="h-3 w-3" />
              Video
            </Label>
            {isEditing ? (
              <div className="space-y-2 mt-1">
                <Input
                  value={editData.videoUrl}
                  onChange={(e) => setEditData({...editData, videoUrl: e.target.value})}
                  className="h-6 text-xs"
                  placeholder="Video URL"
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={editData.startTime}
                    onChange={(e) => setEditData({...editData, startTime: parseInt(e.target.value) || 0})}
                    className="h-6 text-xs"
                    placeholder="Start time"
                  />
                  <Input
                    type="number"
                    value={editData.duration}
                    onChange={(e) => setEditData({...editData, duration: parseInt(e.target.value) || 300})}
                    className="h-6 text-xs"
                    placeholder="Duration"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-1 text-xs text-gray-600">
                <p>Start: {formatTime(data.startTime ?? 0)}</p>
                <p>Duration: {formatTime(data.duration ?? 0)}</p>
              </div>
            )}
          </div>

          {/* Information Text - Add this section for editing */}
          {isEditing && (
            <div>
              <Label className="text-xs font-medium flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Information Text
              </Label>
              <Textarea
                value={editData.informationText}
                onChange={(e) => setEditData({...editData, informationText: e.target.value})}
                className="mt-1 text-xs h-20"
                placeholder="Enter background information..."
              />
            </div>
          )}

          {/* AI Concepts */}
          {data.aiConcepts.length > 0 && (
            <div>
              <Label className="text-xs font-medium flex items-center gap-1">
                <Brain className="h-3 w-3" />
                Concepts ({data.aiConcepts.length})
              </Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.aiConcepts.slice(0, 3).map((concept, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {concept}
                  </Badge>
                ))}
                {data.aiConcepts.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{data.aiConcepts.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Save Status */}
          {isSaving && (
            <div className="text-xs text-blue-600 flex items-center gap-1">
              <Save className="h-3 w-3 animate-spin" />
              Saving changes...
            </div>
          )}
        </CardContent>
      </Card>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-6 h-6 bg-black border-2 border-white rounded-full hover:bg-gray-800 transition-colors"
        style={{ 
          zIndex: 5,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
      />
    </div>
  );
} 