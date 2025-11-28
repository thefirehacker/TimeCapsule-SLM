import React, { useState, useCallback, useEffect } from "react";
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

const formatPageRange = (start: number, end: number): string => {
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return "";
  }
  return start === end ? `${start}` : `${start}-${end}`;
};

const buildKBSelectionFromNode = (
  nodeData: PDFAttachmentNodeData
): KBPDFSelection | null => {
  const kbDocumentId = (nodeData as any).kbDocumentId;
  if (!kbDocumentId) {
    return null;
  }

  const startPage =
    Number((nodeData as any).startPage) ||
    Number((nodeData as any).start_page) ||
    1;
  const endPage =
    Number((nodeData as any).endPage) ||
    Number((nodeData as any).end_page) ||
    startPage;
  const totalPages =
    Number((nodeData as any).totalPages) ||
    Number((nodeData as any).total_pages) ||
    Math.max(endPage, startPage);

  return {
    kbDocumentId,
    filename: (nodeData as any).filename || nodeData.pdfFileName || "",
    title: nodeData.title || "",
    startPage,
    endPage,
    totalPages,
    filesize: Number((nodeData as any).filesize) || 0,
    uploadedAt:
      (nodeData as any).uploadedAt ||
      (nodeData as any).uploaded_at ||
      new Date().toISOString(),
  };
};

interface PDFAttachmentNodeProps extends NodeProps {
  data: PDFAttachmentNodeData;
}

export default function PDFAttachmentNode({ id: nodeId, data, selected }: PDFAttachmentNodeProps) {
  const { vectorStore } = useVectorStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PDFAttachmentNodeData>(data);
  const [isSaving, setIsSaving] = useState(false);

  const nodeHasKBMetadata =
    Boolean(
      (data as any).kbDocumentId ||
      data.pdfSource === "knowledge_base" ||
      (data as any).sourceType === "knowledge_base"
    );
  const initialKBSelection = buildKBSelectionFromNode(data);
  const [pdfSource, setPdfSource] = useState<"url" | "kb">(
    nodeHasKBMetadata || initialKBSelection ? "kb" : "url"
  );
  const [kbSelection, setKBSelection] = useState<KBPDFSelection | null>(
    initialKBSelection
  );

  useEffect(() => {
    if (isEditing) {
      return;
    }

    setEditData(data);
    const nextKBSelection = buildKBSelectionFromNode(data);
    setKBSelection(nextKBSelection);
    const hasKBSource =
      Boolean(
        nextKBSelection ||
        (data as any).kbDocumentId ||
        data.pdfSource === "knowledge_base" ||
        (data as any).sourceType === "knowledge_base"
      );
    setPdfSource(hasKBSource ? "kb" : "url");
  }, [data, isEditing]);

  const displayHasKBMetadata = nodeHasKBMetadata;
  const editingPrefersKB = pdfSource === "kb";
  const showKBBadge = displayHasKBMetadata || (isEditing && editingPrefersKB);

  const handleSave = useCallback(async () => {
    setIsSaving(true);

    try {
      let updatedNodeData: any;
      const normalizedUrl =
        typeof editData.pdfUrl === "string" ? editData.pdfUrl.trim() : "";
      const fallbackKBMeta =
        buildKBSelectionFromNode(editData) || buildKBSelectionFromNode(data);
      const effectiveKBMeta =
        pdfSource === "kb" ? kbSelection || fallbackKBMeta : null;

      if (pdfSource === "kb") {
        if (!effectiveKBMeta) {
          console.warn(
            "PDF attachment switched to Knowledge Base source but no document was selected."
          );
          setIsSaving(false);
          return;
        }

        const pagesLabel = formatPageRange(
          effectiveKBMeta.startPage,
          effectiveKBMeta.endPage
        );

        updatedNodeData = {
          type: "pdf-attachment",
          id: nodeId,
          title: effectiveKBMeta.title || editData.title,
          pdfUrl: "",
          pages: pagesLabel,
          notes: editData.notes,
          isAttached: data.isAttached,
          attachedToFrameId: data.attachedToFrameId,
          pdfSource: "knowledge_base",
          kbDocumentId: effectiveKBMeta.kbDocumentId,
          filename: effectiveKBMeta.filename,
          pdfFileName: effectiveKBMeta.filename,
          startPage: effectiveKBMeta.startPage,
          endPage: effectiveKBMeta.endPage,
          totalPages: effectiveKBMeta.totalPages,
          filesize: effectiveKBMeta.filesize,
          uploadedAt: effectiveKBMeta.uploadedAt,
          originalType: "pdf-kb",
          originalUrl: effectiveKBMeta.kbDocumentId,
        };
      } else {
        updatedNodeData = {
          type: "pdf-attachment",
          id: nodeId,
          title: editData.title,
          pdfUrl: normalizedUrl,
          pages: editData.pages,
          notes: editData.notes,
          isAttached: data.isAttached,
          attachedToFrameId: data.attachedToFrameId,
          pdfSource: "url",
          kbDocumentId: undefined,
          filename: editData.filename,
          pdfFileName: editData.pdfFileName,
          originalType: "pdf",
          originalUrl: normalizedUrl || undefined,
        };
      }

      Object.assign(data, updatedNodeData);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("update-node-data", {
            detail: {
              nodeId,
              newData: updatedNodeData,
            },
          })
        );

        console.log(
          "🎯 PDF attachment data updated, triggering node data save:",
          {
            nodeId: data.id,
            title: updatedNodeData.title,
            source: updatedNodeData.pdfSource,
            ...(updatedNodeData.pdfSource === "knowledge_base"
              ? { kbDocumentId: updatedNodeData.kbDocumentId }
              : { pdfUrl: updatedNodeData.pdfUrl }),
          }
        );
      }

      if (data.isAttached && data.attachedToFrameId) {
        const attachmentType = "pdf" as const;
        const attachmentData: any =
          updatedNodeData.pdfSource === "knowledge_base"
            ? {
                title: updatedNodeData.title,
                pdfUrl: "",
                pages: updatedNodeData.pages,
                notes: updatedNodeData.notes,
                pdfSource: "knowledge_base",
                kbDocumentId: updatedNodeData.kbDocumentId,
                filename: updatedNodeData.filename,
                pdfFileName: updatedNodeData.pdfFileName,
                startPage: updatedNodeData.startPage,
                endPage: updatedNodeData.endPage,
                totalPages: updatedNodeData.totalPages,
                filesize: updatedNodeData.filesize,
                uploadedAt: updatedNodeData.uploadedAt,
                originalType: "pdf-kb",
                originalUrl: updatedNodeData.kbDocumentId,
              }
            : {
                title: updatedNodeData.title,
                pdfUrl: normalizedUrl,
                pages: updatedNodeData.pages,
                notes: updatedNodeData.notes,
                pdfSource: "url",
                originalType: "pdf",
                originalUrl: normalizedUrl || undefined,
              };

        const updatedAttachment = {
          id: nodeId,
          type: attachmentType,
          data: attachmentData,
        };

        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("attachment-node-updated", {
              detail: {
                frameId: data.attachedToFrameId,
                attachment: updatedAttachment,
                nodeId,
              },
            })
          );

          window.dispatchEvent(
            new CustomEvent("force-save-frames", {
              detail: {
                reason: "pdf-attachment-updated",
                frameId: data.attachedToFrameId,
                attachmentType,
                source: updatedNodeData.pdfSource,
                timestamp: new Date().toISOString(),
              },
            })
          );
        }

        console.log("📡 PDF attachment updated, notifying connected frame:", {
          frameId: data.attachedToFrameId,
          type: attachmentType,
          source: updatedNodeData.pdfSource,
        });
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save PDF attachment:", error);
    } finally {
      setIsSaving(false);
    }
  }, [data, editData, kbSelection, nodeId, pdfSource]);

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
                  {showKBBadge && (
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
              <Select
                value={pdfSource}
                onValueChange={(value: "url" | "kb") => {
                  setPdfSource(value);
                  if (value === "url") {
                    setKBSelection(null);
                    setEditData((prev) => ({
                      ...prev,
                      pdfSource: "url",
                      kbDocumentId: undefined,
                    }));
                  } else {
                    setEditData((prev) => ({
                      ...prev,
                      pdfSource: "knowledge_base",
                    }));
                  }
                }}
              >
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
          {isEditing && editingPrefersKB && (
            <KBPDFSelector
              vectorStore={vectorStore}
              onSelect={(selection) => {
                setKBSelection(selection);
                if (selection) {
                  setEditData((prev) => ({
                    ...prev,
                    title: selection.title,
                    pages: formatPageRange(selection.startPage, selection.endPage),
                    pdfSource: "knowledge_base",
                    kbDocumentId: selection.kbDocumentId,
                    filename: selection.filename,
                    pdfFileName: selection.filename,
                    startPage: selection.startPage,
                    endPage: selection.endPage,
                    totalPages: selection.totalPages,
                    filesize: selection.filesize,
                    uploadedAt: selection.uploadedAt,
                  }));
                }
              }}
              initialSelection={kbSelection || undefined}
            />
          )}

          {/* PDF URL (when source is URL) */}
          <div>
            <Label className="text-xs font-medium">
              {(isEditing && editingPrefersKB) || displayHasKBMetadata
                ? "Knowledge Base Document"
                : "PDF URL"}
            </Label>
            {isEditing ? (
              editingPrefersKB ? (
                <p className="text-xs text-gray-600 mt-1">
                  {kbSelection
                    ? `${kbSelection.title} • ${kbSelection.filename}`
                    : "Select a PDF from the Knowledge Base below."}
                </p>
              ) : (
                <Input
                  value={editData.pdfUrl}
                  onChange={(e) =>
                    setEditData({ ...editData, pdfUrl: e.target.value })
                  }
                  className="mt-1 text-xs"
                  placeholder="https://example.com/document.pdf"
                />
              )
            ) : (
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-600 truncate flex-1">
                  {displayHasKBMetadata ? (
                    <span className="flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      {(data as any).filename ||
                        (data as any).pdfFileName ||
                        data.title}
                    </span>
                  ) : (
                    data.pdfUrl || "No URL provided"
                  )}
                </p>
                {data.pdfUrl && !displayHasKBMetadata && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(data.pdfUrl, "_blank")}
                    className="h-6 w-6 p-0 ml-2"
                    title="Open PDF"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Pages (only show for URL PDFs in edit mode, or for display) */}
          {((!editingPrefersKB && isEditing) || (!isEditing && !displayHasKBMetadata)) && (
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
          {!isEditing && displayHasKBMetadata && (
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
