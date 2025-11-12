import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VideoAttachmentNodeData } from "./types";
import { 
  Video, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  Play,
  Link,
  Unlink
} from "lucide-react";

interface VideoAttachmentNodeProps extends NodeProps {
  data: VideoAttachmentNodeData;
}

export default function VideoAttachmentNode({ id: nodeId, data, selected }: VideoAttachmentNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<VideoAttachmentNodeData>(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      // Update the node data
      Object.assign(data, editData);
      
      // CRITICAL FIX: Emit update-node-data event to persist changes in graph state
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('update-node-data', {
          detail: {
            nodeId: nodeId,
            newData: editData
          }
        }));
        
        console.log('🎯 Video attachment data updated, triggering node data save:', {
          nodeId: data.id,
          title: editData.title,
          videoUrl: editData.videoUrl
        });
      }
      
      // If this attachment is connected to a frame, update the frame's attachment
      if (data.isAttached && data.attachedToFrameId) {
        const updatedAttachment = {
          id: nodeId,
          type: 'video' as const,
          data: {
            title: editData.title,
            videoUrl: editData.videoUrl,
            startTime: editData.startTime,
            duration: editData.duration,
            notes: editData.notes
          }
        };
        
        // Emit event to update the connected frame
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('attachment-node-updated', {
            detail: {
              frameId: data.attachedToFrameId,
              attachment: updatedAttachment,
              nodeId
            }
          }));
        }
        
        console.log('📡 Video attachment updated, notifying connected frame:', {
          frameId: data.attachedToFrameId,
          videoUrl: editData.videoUrl
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save video attachment:', error);
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

  // Convert seconds to MM:SS format for editing
  const secondsToTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Convert MM:SS format to seconds
  const timestampToSeconds = (timestamp: string): number => {
    const [minutes, seconds] = timestamp.split(':').map(num => parseInt(num) || 0);
    return minutes * 60 + seconds;
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(data.videoUrl || '');
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;

  return (
    <div className="video-attachment-node">
      {/* Connection handle to attach to frames */}
      <Handle 
        type="source" 
        position={Position.Left} 
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#f97316',
          border: '2px solid white',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)',
          zIndex: 5
        }}
      />
      
      <Card className={`w-80 ${selected ? 'ring-2 ring-red-500' : ''} ${data.isAttached ? 'border-green-500' : 'border-gray-300'} transition-all duration-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-100 rounded">
                <Video className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">
                  {isEditing ? (
                    <Input
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="h-6 text-sm"
                      placeholder="Video title..."
                    />
                  ) : (
                    data.title || "Video Content"
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <Play className="h-2 w-2 mr-1" />
                    Video
                  </Badge>
                  {data.isAttached && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      <Link className="h-2 w-2 mr-1" />
                      Attached
                    </Badge>
                  )}
                  {data.startTime > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-2 w-2 mr-1" />
                      {formatTime(data.duration)}
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
                  title="Edit video"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {/* Video Thumbnail */}
          {!isEditing && thumbnailUrl && (
            <div className="w-full h-24 rounded overflow-hidden bg-gray-100">
              <img 
                src={thumbnailUrl} 
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Video URL */}
          <div>
            <Label className="text-xs font-medium">YouTube URL</Label>
            {isEditing ? (
              <Input
                value={editData.videoUrl}
                onChange={(e) => setEditData({...editData, videoUrl: e.target.value})}
                className="mt-1 text-xs"
                placeholder="https://youtube.com/watch?v=..."
              />
            ) : (
              <p className="text-xs text-gray-600 mt-1 truncate">
                {data.videoUrl || "No URL provided"}
              </p>
            )}
          </div>

          {/* Timing */}
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-medium">Start Time (MM:SS)</Label>
                <Input
                  type="text"
                  value={secondsToTimestamp(editData.startTime)}
                  onChange={(e) => {
                    const seconds = timestampToSeconds(e.target.value);
                    setEditData({...editData, startTime: seconds});
                  }}
                  className="mt-1 text-xs"
                  placeholder="00:00"
                  pattern="[0-9]{2}:[0-9]{2}"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Duration (MM:SS)</Label>
                <Input
                  type="text"
                  value={secondsToTimestamp(editData.duration)}
                  onChange={(e) => {
                    const seconds = timestampToSeconds(e.target.value);
                    setEditData({...editData, duration: seconds});
                  }}
                  className="mt-1 text-xs"
                  placeholder="05:00"
                  pattern="[0-9]{2}:[0-9]{2}"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>Start: {formatTime(data.startTime)}</span>
              <span>Duration: {formatTime(data.duration)}</span>
            </div>
          )}

          {/* Notes */}
          {isEditing ? (
            <div>
              <Label className="text-xs font-medium">Notes</Label>
              <Input
                value={editData.notes || ''}
                onChange={(e) => setEditData({...editData, notes: e.target.value})}
                className="mt-1 text-xs"
                placeholder="Optional notes about this video..."
              />
            </div>
          ) : (
            data.notes && (
              <p className="text-xs text-gray-500 italic">
                {data.notes}
              </p>
            )
          )}

          {/* Connection Status */}
          {data.isAttached && data.attachedToFrameId && (
            <div className="text-xs text-green-600 flex items-center gap-1">
              <Link className="h-3 w-3" />
              Attached to frame
            </div>
          )}

          {/* ENHANCED: Video URL Warning */}
          {!data.videoUrl && (
            <div className="text-xs text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded">
              <Video className="h-3 w-3" />
              <span>⚠️ Add YouTube URL before connecting to frame</span>
            </div>
          )}

          {/* Save Status */}
          {isSaving && (
            <div className="text-xs text-red-600 flex items-center gap-1">
              <Save className="h-3 w-3 animate-spin" />
              Saving video...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
