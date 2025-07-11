import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TextAttachmentNodeData } from "./types";
import { 
  FileText, 
  Edit3, 
  Save, 
  X, 
  Type,
  Link
} from "lucide-react";

interface TextAttachmentNodeProps extends NodeProps {
  data: TextAttachmentNodeData;
}

export default function TextAttachmentNode({ data, selected }: TextAttachmentNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<TextAttachmentNodeData>(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      // Update the node data
      Object.assign(data, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save text attachment:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data, editData]);

  const handleCancel = useCallback(() => {
    setEditData(data);
    setIsEditing(false);
  }, [data]);

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="text-attachment-node">
      {/* Connection handle to attach to frames */}
      <Handle 
        type="source" 
        position={Position.Left} 
        className="w-4 h-4 bg-green-500 border-2 border-white"
      />
      
      <Card className={`w-80 ${selected ? 'ring-2 ring-green-500' : ''} ${data.isAttached ? 'border-green-500' : 'border-gray-300'} transition-all duration-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-100 rounded">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">
                  {isEditing ? (
                    <Input
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="h-6 text-sm"
                      placeholder="Text note title..."
                    />
                  ) : (
                    data.title || "Text Note"
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Type className="h-2 w-2 mr-1" />
                    Text
                  </Badge>
                  {data.isAttached && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      <Link className="h-2 w-2 mr-1" />
                      Attached
                    </Badge>
                  )}
                  {data.text && (
                    <Badge variant="outline" className="text-xs">
                      {getWordCount(data.text)} words
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
                  title="Edit text"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {/* Text Content */}
          <div>
            <Label className="text-xs font-medium">Content</Label>
            {isEditing ? (
              <Textarea
                value={editData.text}
                onChange={(e) => setEditData({...editData, text: e.target.value})}
                className="mt-1 text-xs h-32"
                placeholder="Enter your text content here..."
              />
            ) : (
              <div className="mt-1 max-h-32 overflow-y-auto">
                {data.text ? (
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">
                    {data.text.length > 200 ? `${data.text.substring(0, 200)}...` : data.text}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 italic">No content provided</p>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          {isEditing ? (
            <div>
              <Label className="text-xs font-medium">Notes</Label>
              <Input
                value={editData.notes || ''}
                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                className="mt-1 text-xs"
                placeholder="Optional notes about this text..."
              />
            </div>
          ) : (
            data.notes && (
              <div>
                <Label className="text-xs font-medium">Notes</Label>
                <p className="text-xs text-gray-500 italic mt-1">
                  {data.notes}
                </p>
              </div>
            )
          )}

          {/* Content Stats */}
          {!isEditing && data.text && (
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>{getWordCount(data.text)} words</span>
              <span>{data.text.length} characters</span>
            </div>
          )}

          {/* Connection Status */}
          {data.isAttached && data.attachedToFrameId && (
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Link className="h-3 w-3" />
              Attached to frame
            </div>
          )}

          {/* Save Status */}
          {isSaving && (
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Save className="h-3 w-3 animate-spin" />
              Saving text...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 