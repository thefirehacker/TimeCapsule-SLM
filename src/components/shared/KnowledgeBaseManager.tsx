"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Trash2,
  Hash,
  Maximize2,
  Bot,
  Package,
  Globe,
  Clock,
  MessageSquare,
  Eye,
  Download,
  Settings,
  Grid3X3,
} from "lucide-react";
import { TableData } from "@/types/chunks";
import TableViewer from "./TableViewer";

interface Document {
  id: string;
  title: string;
  content: string;
  metadata: {
    documentType?: string;
    filename: string;
    filesize: number;
    filetype: string;
    uploadedAt: string;
    source: string;
    description?: string;
    isGenerated?: boolean;
    hasStructuredData?: boolean;
    tableCount?: number;
  };
  chunks?: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  }>;
  vectors?: Array<{
    chunkId: string;
    embedding: number[];
  }>;
  tables?: TableData[];
}

interface DocumentStatus {
  count: number;
  totalSize: number;
  totalChunks: number;
  totalVectors: number;
  totalTables: number;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  filter: (doc: Document) => boolean;
}

interface KnowledgeBaseManagerProps {
  documents: Document[];
  documentStatus: DocumentStatus;
  onDeleteDocument: (docId: string) => void;
  onUploadDocuments?: () => void;
  isUploading?: boolean;
  showUploadButton?: boolean;
  tabConfigs: TabConfig[];
  title?: string;
  description?: string;
}

export function KnowledgeBaseManager({
  documents,
  documentStatus,
  onDeleteDocument,
  onUploadDocuments,
  isUploading = false,
  showUploadButton = true,
  tabConfigs,
  title = "Knowledge Base Manager",
  description = "Organized view of your documents by category. Search and manage your knowledge base content.",
}: KnowledgeBaseManagerProps) {
  const [activeTab, setActiveTab] = useState(tabConfigs[0]?.id || "");
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set()
  );

  // Helper function to group documents by tab configuration
  const getGroupedDocuments = () => {
    const grouped: Record<string, Document[]> = {};

    tabConfigs.forEach((config) => {
      grouped[config.id] = documents.filter(config.filter);
    });

    return grouped;
  };

  // Helper function to get document counts by category
  const getDocumentCategoryCounts = () => {
    const grouped = getGroupedDocuments();
    const counts: Record<string, number> = {};

    tabConfigs.forEach((config) => {
      counts[config.id] = grouped[config.id]?.length || 0;
    });

    return counts;
  };

  // Document expansion handler
  const toggleDocumentExpansion = (docId: string) => {
    setExpandedDocuments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  // File size formatter
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const groupedDocuments = getGroupedDocuments();
  const documentCounts = getDocumentCategoryCounts();

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Document Statistics */}
      <div className="space-y-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Documents:</span>
              <span className="font-medium ml-1">{documentStatus.count}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Size:</span>
              <span className="font-medium ml-1">
                {formatFileSize(documentStatus.totalSize)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Chunks:</span>
              <span className="font-medium ml-1">
                {documentStatus.totalChunks}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Vectors:</span>
              <span className="font-medium ml-1">
                {documentStatus.totalVectors}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Tables:</span>
              <span className="font-medium ml-1">
                {documentStatus.totalTables}
              </span>
            </div>
          </div>

          {showUploadButton && onUploadDocuments && (
            <Button
              onClick={onUploadDocuments}
              disabled={isUploading}
              className="space-x-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Files</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Tabbed Document Interface */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        {/* Tab Navigation */}
        <TabsList className="w-full flex justify-start gap-1 mb-4 h-auto p-1 bg-muted rounded-lg">
          {tabConfigs.map((config) => {
            const IconComponent = config.icon;
            return (
              <TabsTrigger
                key={config.id}
                value={config.id}
                className="flex items-center gap-2 flex-1 min-w-0 justify-center px-3 py-2"
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {config.label} ({documentCounts[config.id]})
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content Panels */}
        {tabConfigs.map((config) => {
          const docs = groupedDocuments[config.id] || [];
          return (
            <TabsContent
              key={config.id}
              value={config.id}
              className="flex-1 mt-0"
            >
              <ScrollArea className="h-[55vh]">
                <div className="space-y-3">
                  {isUploading && config.id === tabConfigs[0]?.id && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="w-8 h-8 mx-auto mb-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                      <p className="font-medium">Processing documents...</p>
                      <p className="text-sm">
                        Please wait while we process and index your files
                      </p>
                    </div>
                  )}

                  {docs.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No {config.label.toLowerCase()} yet</p>
                      <p className="text-sm">
                        {config.id === tabConfigs[0]?.id
                          ? "Upload files to build your knowledge base"
                          : `${config.label} will appear here when available`}
                      </p>
                    </div>
                  ) : (
                    docs.map((doc) => (
                      <Card key={doc.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Document Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate text-foreground">
                                  {doc.title}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-4">
                                  <span>{doc.metadata.filetype}</span>
                                  <span>•</span>
                                  <span>
                                    {formatFileSize(doc.metadata.filesize)}
                                  </span>
                                  <span>•</span>
                                  <span>{doc.chunks?.length || 0} chunks</span>
                                  <span>•</span>
                                  <span>
                                    {doc.vectors?.length || 0} vectors
                                  </span>
                                  {doc.tables && doc.tables.length > 0 && (
                                    <>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Grid3X3 className="w-3 h-3" />
                                        {doc.tables.length} tables
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {new Date(
                                      doc.metadata.uploadedAt
                                    ).toLocaleDateString()}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {doc.metadata.source}
                                  </Badge>
                                  {doc.metadata.hasStructuredData && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs flex items-center gap-1"
                                    >
                                      <Grid3X3 className="w-2 h-2" />
                                      Structured Data
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    toggleDocumentExpansion(doc.id)
                                  }
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  {expandedDocuments.has(doc.id) ? (
                                    <Eye className="w-4 h-4" />
                                  ) : (
                                    <Maximize2 className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const hasChunks =
                                      doc.chunks && doc.chunks.length > 0;
                                    const safeTitle = (
                                      doc.title || "document"
                                    ).replace(/[^\w\-]+/g, "_");
                                    const header =
                                      `Document: ${doc.title}\n` +
                                      `Filename: ${doc.metadata.filename}\n` +
                                      `Type: ${doc.metadata.filetype}\n` +
                                      `Size: ${formatFileSize(doc.metadata.filesize)}\n` +
                                      `Uploaded: ${new Date(doc.metadata.uploadedAt).toLocaleString()}\n` +
                                      `Source: ${doc.metadata.source}\n` +
                                      `Total Chunks: ${doc.chunks?.length || 0}\n\n`;
                                    let exportText = header;
                                    if (hasChunks) {
                                      exportText +=
                                        "=== CHUNKS (detailed) ===\n";
                                      const chunks = [
                                        ...(doc.chunks as any[]),
                                      ].sort(
                                        (a, b) => a.startIndex - b.startIndex
                                      );
                                      chunks.forEach((chunk, index) => {
                                        exportText +=
                                          `\n--- Chunk ${index + 1} ---\n` +
                                          `ID: ${chunk.id}\n` +
                                          `Position: ${chunk.startIndex}-${chunk.endIndex}\n` +
                                          `Length: ${chunk.content.length} characters\n\n` +
                                          `${chunk.content}\n`;
                                      });
                                    } else {
                                      exportText +=
                                        "=== FULL CONTENT ===\n\n" +
                                        doc.content;
                                    }
                                    const blob = new Blob([exportText], {
                                      type: "text/plain",
                                    });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = hasChunks
                                      ? `${safeTitle}-chunks.txt`
                                      : `${safeTitle}.txt`;
                                    a.click();
                                    URL.revokeObjectURL(url);
                                  }}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDeleteDocument(doc.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Expanded Document Preview */}
                            {expandedDocuments.has(doc.id) && (
                              <div className="border-t pt-3 space-y-3">
                                <div className="bg-muted/30 rounded-lg p-3">
                                  <div className="text-sm font-medium mb-2">
                                    Document Preview
                                  </div>
                                  <div className="text-sm text-muted-foreground max-h-32 overflow-y-auto">
                                    {doc.content.length > 500
                                      ? `${doc.content.substring(0, 500)}...`
                                      : doc.content}
                                  </div>
                                </div>

                                {/* Tables Section */}
                                {doc.tables && doc.tables.length > 0 && (
                                  <div className="space-y-2">
                                    <TableViewer
                                      tables={doc.tables}
                                      title={`Document Tables (${doc.tables.length})`}
                                      maxHeight="300px"
                                      showExportOptions={true}
                                      showMetadata={true}
                                    />
                                  </div>
                                )}

                                {/* Chunks Section */}
                                {doc.chunks && doc.chunks.length > 0 && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-sm font-medium flex items-center gap-2">
                                        <Hash className="w-3 h-3" />
                                        Document Chunks ({doc.chunks.length})
                                      </h4>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {doc.vectors?.length || 0} embeddings
                                      </Badge>
                                    </div>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                      {doc.chunks
                                        .slice(0, 3)
                                        .map((chunk, index) => (
                                          <div
                                            key={chunk.id}
                                            className="border border-border rounded p-2 bg-background"
                                          >
                                            <div className="flex items-center justify-between mb-1">
                                              <Badge
                                                variant="secondary"
                                                className="text-xs"
                                              >
                                                Chunk {index + 1}
                                              </Badge>
                                              <span className="text-xs text-muted-foreground">
                                                {chunk.content.length} chars
                                              </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground line-clamp-2">
                                              {chunk.content.length > 200
                                                ? `${chunk.content.substring(0, 200)}...`
                                                : chunk.content}
                                            </div>
                                          </div>
                                        ))}
                                      {doc.chunks.length > 3 && (
                                        <div className="text-center text-xs text-muted-foreground py-2">
                                          ... and {doc.chunks.length - 3} more
                                          chunks
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
