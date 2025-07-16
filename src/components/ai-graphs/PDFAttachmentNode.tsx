import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFAttachmentNodeData } from "./types";
import { 
  File, 
  Edit3, 
  Save, 
  X, 
  FileText,
  Link,
  ExternalLink
} from "lucide-react";

interface PDFAttachmentNodeProps extends NodeProps {
  data: PDFAttachmentNodeData;
}

export default function PDFAttachmentNode({ data, selected }: PDFAttachmentNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PDFAttachmentNodeData>(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      // Update the node data
      Object.assign(data, editData);
      
      // If this attachment is connected to a frame, update the frame's attachment
      if (data.isAttached && data.attachedToFrameId) {
        const updatedAttachment = {
          id: data.id,
          type: 'pdf' as const,
          data: {
            title: editData.title,
            pdfUrl: editData.pdfUrl,
            pages: editData.pages,
            notes: editData.notes
          }
        };
        
        // Emit event to update the connected frame
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('attachment-node-updated', {
            detail: {
              frameId: data.attachedToFrameId,
              attachment: updatedAttachment,
              nodeId: data.id
            }
          }));
        }
        
        console.log('📡 PDF attachment updated, notifying connected frame:', {
          frameId: data.attachedToFrameId,
          pdfUrl: editData.pdfUrl
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save PDF attachment:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data, editData]);

  const handleCancel = useCallback(() => {
    setEditData(data);
    setIsEditing(false);
  }, [data]);

  return (
    <div className="pdf-attachment-node">
      {/* Connection handle to attach to frames */}
      <Handle 
        type="source" 
        position={Position.Left} 
        className="w-4 h-4 bg-blue-500 border-2 border-white"
      />
      
      <Card className={`w-80 ${selected ? 'ring-2 ring-blue-500' : ''} ${data.isAttached ? 'border-green-500' : 'border-gray-300'} transition-all duration-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-100 rounded">
                <File className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">
                  {isEditing ? (
                    <Input
                      value={editData.title}
                      onChange={(e) => setEditData({...editData, title: e.target.value})}
                      className="h-6 text-sm"
                      placeholder="PDF title..."
                    />
                  ) : (
                    data.title || "PDF Document"
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    <FileText className="h-2 w-2 mr-1" />
                    PDF
                  </Badge>
                  {data.isAttached && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      <Link className="h-2 w-2 mr-1" />
                      Attached
                    </Badge>
                  )}
                  {data.pages && (
                    <Badge variant="outline" className="text-xs">
                      Pages: {data.pages}
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
                  title="Edit PDF"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {/* PDF Icon */}
          {!isEditing && (
            <div className="w-full h-24 rounded bg-blue-50 flex items-center justify-center">
              <File className="h-12 w-12 text-blue-400" />
            </div>
          )}

          {/* PDF URL */}
          <div>
            <Label className="text-xs font-medium">PDF URL</Label>
            {isEditing ? (
              <Input
                value={editData.pdfUrl}
                onChange={(e) => setEditData({...editData, pdfUrl: e.target.value})}
                className="mt-1 text-xs"
                placeholder="https://example.com/document.pdf"
              />
            ) : (
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-600 truncate flex-1">
                  {data.pdfUrl || "No URL provided"}
                </p>
                {data.pdfUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(data.pdfUrl, '_blank')}
                    className="h-6 w-6 p-0 ml-2"
                    title="Open PDF"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Pages */}
          <div>
            <Label className="text-xs font-medium">Pages</Label>
            {isEditing ? (
              <Input
                value={editData.pages}
                onChange={(e) => setEditData({...editData, pages: e.target.value})}
                className="mt-1 text-xs"
                placeholder="e.g., 1-10, 15, 20-25"
              />
            ) : (
              <p className="text-xs text-gray-600 mt-1">
                {data.pages || "All pages"}
              </p>
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
                placeholder="Optional notes about this PDF..."
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

          {/* Save Status */}
          {isSaving && (
            <div className="text-xs text-blue-600 flex items-center gap-1">
              <Save className="h-3 w-3 animate-spin" />
              Saving PDF...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 