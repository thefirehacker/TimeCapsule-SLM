import React, { useState, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFAttachmentNodeData } from "./types";
import { KBPDFSelector, KBPDFSelection } from "./KBPDFSelector";
import { useVectorStore } from "@/components/providers/VectorStoreProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  File,
  Edit3,
  Save,
  X,
  FileText,
  Link,
  ExternalLink,
  Database
} from "lucide-react";

interface PDFAttachmentNodeProps extends NodeProps {
  data: PDFAttachmentNodeData;
}

export default function PDFAttachmentNode({ data, selected }: PDFAttachmentNodeProps) {
  const { vectorStore } = useVectorStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PDFAttachmentNodeData>(data);
  const [isSaving, setIsSaving] = useState(false);

  // Determine source type based on existing data
  const initialSource = (data as any).kbDocumentId ? "kb" : "url";
  const [pdfSource, setPdfSource] = useState<"url" | "kb">(initialSource);
  const [kbSelection, setKBSelection] = useState<KBPDFSelection | null>(
    (data as any).kbDocumentId ? {
      kbDocumentId: (data as any).kbDocumentId,
      filename: (data as any).filename || "",
      title: data.title,
      startPage: (data as any).startPage || 1,
      endPage: (data as any).endPage || 1,
      totalPages: (data as any).totalPages || 1,
      filesize: (data as any).filesize || 0,
      uploadedAt: (data as any).uploadedAt || new Date().toISOString()
    } : null
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);

    try {
      // Prepare updated data based on source type
      let updatedNodeData: any;

      if (pdfSource === "kb" && kbSelection) {
        // KB PDF: Store KB reference data
        updatedNodeData = {
          type: "pdf-attachment",
          id: data.id,
          title: kbSelection.title,
          kbDocumentId: kbSelection.kbDocumentId,
          filename: kbSelection.filename,
          startPage: kbSelection.startPage,
          endPage: kbSelection.endPage,
          totalPages: kbSelection.totalPages,
          filesize: kbSelection.filesize,
          uploadedAt: kbSelection.uploadedAt,
          pages: `${kbSelection.startPage}-${kbSelection.endPage}`,
          notes: editData.notes,
          isAttached: data.isAttached,
          attachedToFrameId: data.attachedToFrameId
        };
      } else {
        // URL PDF: Keep traditional data only
        updatedNodeData = {
          type: "pdf-attachment",
          id: data.id,
          title: editData.title,
          pdfUrl: editData.pdfUrl,
          pages: editData.pages,
          notes: editData.notes,
          isAttached: data.isAttached,
          attachedToFrameId: data.attachedToFrameId
        };
      }

      // Update the node data
      Object.assign(data, updatedNodeData);

      // CRITICAL FIX: Emit update-node-data event to persist changes in graph state
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('update-node-data', {
          detail: {
            nodeId: data.id,
            newData: updatedNodeData
          }
        }));

        console.log('🎯 PDF attachment data updated, triggering node data save:', {
          nodeId: data.id,
          title: updatedNodeData.title,
          source: pdfSource,
          ...(pdfSource === "kb" ? { kbDocumentId: updatedNodeData.kbDocumentId } : { pdfUrl: updatedNodeData.pdfUrl })
        });
      }

      // If this attachment is connected to a frame, update the frame's attachment
      if (data.isAttached && data.attachedToFrameId) {
        const attachmentType = pdfSource === "kb" ? "pdf-kb" : "pdf";
        const attachmentData: any = pdfSource === "kb" ? {
          kbDocumentId: kbSelection?.kbDocumentId,
          filename: kbSelection?.filename,
          title: kbSelection?.title,
          startPage: kbSelection?.startPage,
          endPage: kbSelection?.endPage,
          pageCount: kbSelection ? (kbSelection.endPage - kbSelection.startPage + 1) : 0,
          totalPages: kbSelection?.totalPages,
          filesize: kbSelection?.filesize,
          uploadedAt: kbSelection?.uploadedAt,
          notes: editData.notes
        } : {
          title: editData.title,
          pdfUrl: editData.pdfUrl,
          pages: editData.pages,
          notes: editData.notes
        };

        const updatedAttachment = {
          id: data.id,
          type: attachmentType as const,
          data: attachmentData
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

          // ENHANCED: Force immediate localStorage save for PDF content persistence
          window.dispatchEvent(new CustomEvent('force-save-frames', {
            detail: {
              reason: 'pdf-attachment-updated',
              frameId: data.attachedToFrameId,
              attachmentType,
              source: pdfSource,
              timestamp: new Date().toISOString()
            }
          }));
        }

        console.log('📡 PDF attachment updated, notifying connected frame:', {
          frameId: data.attachedToFrameId,
          type: attachmentType,
          source: pdfSource
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save PDF attachment:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data, editData, pdfSource, kbSelection]);

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
      
      <Card className={`w-80 ${selected ? 'ring-2 ring-blue-500' : ''} ${data.isAttached ? 'border-green-500' : 'border-gray-300'} transition-all duration-200`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-100 rounded">
                <File className="h-4 w-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-sm font-medium whitespace-normal break-words" title={data.title || "PDF Document"}>
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
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    <FileText className="h-2 w-2 mr-1" />
                    PDF
                  </Badge>
                  {(data as any).kbDocumentId && (
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      <Database className="h-2 w-2 mr-1" />
                      KB
                    </Badge>
                  )}
                  {data.isAttached && (
                    <Badge variant="default" className="text-xs bg-green-500">
                      <Link className="h-2 w-2 mr-1" />
                      Attached
                    </Badge>
                  )}
                  {data.pages && !((data as any).kbDocumentId) && (
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

          {/* Source Selector (only in edit mode) */}
          {isEditing && (
            <div className="space-y-2">
              <Label className="text-xs font-medium">PDF Source</Label>
              <Select value={pdfSource} onValueChange={(value: "url" | "kb") => setPdfSource(value)}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      <span>URL</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="kb">
                    <div className="flex items-center gap-2">
                      <Database className="h-3 w-3" />
                      <span>Knowledge Base</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* KB PDF Selector (when source is KB) */}
          {isEditing && pdfSource === "kb" && (
            <KBPDFSelector
              vectorStore={vectorStore}
              onSelect={(selection) => {
                setKBSelection(selection);
                if (selection) {
                  setEditData({
                    ...editData,
                    title: selection.title
                  });
                }
              }}
              initialSelection={kbSelection || undefined}
            />
          )}

          {/* PDF URL (when source is URL) */}
          {(pdfSource === "url" || !isEditing) && (
            <div>
              <Label className="text-xs font-medium">
                {pdfSource === "kb" && (data as any).kbDocumentId ? "KB Document" : "PDF URL"}
              </Label>
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
                    {(data as any).kbDocumentId ? (
                      <span className="flex items-center gap-1">
                        <Database className="h-3 w-3" />
                        {(data as any).filename || data.title}
                      </span>
                    ) : (
                      data.pdfUrl || "No URL provided"
                    )}
                  </p>
                  {data.pdfUrl && !((data as any).kbDocumentId) && (
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
          )}

          {/* Pages (only show for URL PDFs in edit mode, or for display) */}
          {((pdfSource === "url" && isEditing) || (!isEditing && !((data as any).kbDocumentId))) && (
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
          )}

          {/* KB Page Range Display (for KB PDFs not in edit mode) */}
          {!isEditing && (data as any).kbDocumentId && (
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Pages:</span>
                <span>{(data as any).startPage}-{(data as any).endPage}</span>
                <Badge variant="secondary" className="text-xs">
                  {((data as any).endPage - (data as any).startPage + 1)} page(s)
                </Badge>
              </div>
              {(data as any).filesize && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Size:</span>
                  <span>{((data as any).filesize / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              )}
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