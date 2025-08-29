"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResearchHistory } from "@/hooks/useResearchHistory";
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
  X,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

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
    bubblSpaceId?: string;
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
}

interface DocumentStatus {
  count: number;
  totalSize: number;
  totalChunks: number;
  totalVectors: number;
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
  title?: string;
  description?: string;
  onClose?: () => void;
  onLoadResearch?: (researchId: string) => Promise<boolean>;
}

export function KnowledgeBaseManager({
  documents,
  documentStatus,
  onDeleteDocument,
  onUploadDocuments,
  isUploading = false,
  showUploadButton = true,
  title = "Knowledge Base Manager",
  description = "Organized view of your documents by category. Search and manage your knowledge base content.",
  onClose,
  onLoadResearch,
}: KnowledgeBaseManagerProps) {
  // Research history state
  const {
    history: researchHistory,
    loading: historyLoading,
    error: historyError,
    addResearch,
    deleteResearch,
    clearAll,
    refresh: refreshHistory,
  } = useResearchHistory();

  // Internal tab configurations
  const tabConfigs: TabConfig[] = [
    {
      id: "userdocs",
      label: "User Docs",
      icon: FileText,
      filter: (doc: Document) =>
        doc.metadata.documentType === "userdocs" ||
        (!doc.metadata.documentType && doc.metadata.source === "upload"),
    },
    {
      id: "deep-research",
      label: "Deep Research",
      icon: MessageSquare,
      filter: () => false, // This tab shows research history, not documents
    },
    {
      id: "ai-frames",
      label: "AI Frames",
      icon: Bot,
      filter: (doc: Document) =>
        doc.metadata.documentType === "ai-frames" ||
        (!doc.metadata.documentType &&
          (doc.metadata.isGenerated || doc.metadata.source === "generated")),
    },
    {
      id: "timecapsule",
      label: "TimeCapsule",
      icon: Clock,
      filter: (doc: Document) =>
        doc.metadata.documentType === "timecapsule" ||
        (!doc.metadata.documentType &&
          doc.metadata.source === "timecapsule_import"),
    },
    {
      id: "bubblspace",
      label: "BubblSpace",
      icon: Package,
      filter: (doc: Document) =>
        doc.metadata.documentType === "bubblspace" ||
        (!doc.metadata.documentType && !!doc.metadata.bubblSpaceId),
    },
  ];

  const [activeTab, setActiveTab] = useState(tabConfigs[0]?.id || "");
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set()
  );
  const [deletingResearchId, setDeletingResearchId] = useState<string | null>(
    null
  );
  const [isImporting, setIsImporting] = useState(false);

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
      if (config.id === "deep-research") {
        counts[config.id] = researchHistory.length;
      } else {
        counts[config.id] = grouped[config.id]?.length || 0;
      }
    });

    return counts;
  };

  // Research history handlers
  const handleLoadResearch = async (researchId: string) => {
    try {
      console.log(
        "🔄 Loading research session from KnowledgeBaseManager:",
        researchId
      );
      if (onLoadResearch) {
        const success = await onLoadResearch(researchId);
        if (success) {
          console.log(
            "✅ Research session loaded successfully from KnowledgeBaseManager"
          );
          onClose?.(); // Close the modal after successful load
        } else {
          console.error("❌ Failed to load research session");
        }
      }
    } catch (error) {
      console.error(
        "❌ Error loading research from KnowledgeBaseManager:",
        error
      );
    }
  };

  const handleDeleteResearch = async (researchId: string) => {
    if (window.confirm("Are you sure you want to delete this research item?")) {
      try {
        setDeletingResearchId(researchId);
        await deleteResearch(researchId);
      } catch (error) {
        console.error("Error deleting research:", error);
      } finally {
        setDeletingResearchId(null);
      }
    }
  };

  const handleExportSingleResearch = (research: any) => {
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      research: research,
      metadata: {
        appVersion: "TimeCapsule Research",
        format: "research-history-item",
        description: "Individual research session export",
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research-${research.title.replace(/\s+/g, "-").toLowerCase()}-${new Date(research.timestamp).toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
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
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onClose?.();
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Document Statistics */}
      <div className="space-y-4 mb-4 flex-shrink-0">
        <div className="flex items-center justify-between overflow-hidden">
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
        className="flex-1 flex flex-col overflow-hidden"
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
          if (config.id === "deep-research") {
            // Special handling for Deep Research tab
            return (
              <TabsContent
                key={config.id}
                value={config.id}
                className="flex-1 mt-0"
              >
                <ScrollArea className="h-[55vh] w-full">
                  <div className="space-y-3 pr-4">
                    {historyError && (
                      <div className="flex items-center gap-2 p-3 mb-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">
                          {historyError}
                        </span>
                      </div>
                    )}

                    {historyLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            Loading research history...
                          </span>
                        </div>
                      </div>
                    ) : researchHistory.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No research history yet</p>
                        <p className="text-sm">
                          Complete your first research to see it here
                        </p>
                      </div>
                    ) : (
                      researchHistory.map((research) => (
                        <Card
                          key={research.id}
                          className="border-border w-full"
                        >
                          <CardContent className="p-4 w-full">
                            <div className="space-y-3 w-full">
                              {/* Research Header */}
                              <div className="flex items-center justify-between gap-3 w-full">
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  <div className="font-medium truncate text-foreground">
                                    {research.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                                    <span className="capitalize whitespace-nowrap">
                                      {research.type.replace("-", " ")}
                                    </span>
                                    <span>•</span>
                                    <span className="whitespace-nowrap">
                                      {research.wordCount?.toLocaleString() ||
                                        0}{" "}
                                      words
                                    </span>
                                    <span>•</span>
                                    <span className="whitespace-nowrap">
                                      {formatDate(research.timestamp)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {research.status}
                                    </Badge>
                                    {research.duration && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {Math.round(research.duration / 1000)}s
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleLoadResearch(research.id)
                                    }
                                    className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                    title="Load Research"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleExportSingleResearch(research)
                                    }
                                    className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                    title="Export Research"
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteResearch(research.id)
                                    }
                                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                    disabled={
                                      deletingResearchId === research.id
                                    }
                                    title="Delete Research"
                                  >
                                    {deletingResearchId === research.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Research Preview */}
                              {research.originalPrompt && (
                                <div className="border-t pt-3 w-full">
                                  <div className="bg-muted/30 rounded-lg p-3 w-full overflow-hidden">
                                    <div className="text-sm font-medium mb-2">
                                      Original Prompt
                                    </div>
                                    <div className="text-sm text-muted-foreground max-h-16 overflow-y-auto break-words">
                                      {research.originalPrompt.length > 200
                                        ? `${research.originalPrompt.substring(0, 200)}...`
                                        : research.originalPrompt}
                                    </div>
                                  </div>
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
          }

          // Regular document tabs
          const docs = groupedDocuments[config.id] || [];
          return (
            <TabsContent
              key={config.id}
              value={config.id}
              className="flex-1 mt-0"
            >
              <ScrollArea className="h-[55vh] w-full">
                <div className="space-y-3 pr-4">
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
                      <Card key={doc.id} className="border-border w-full">
                        <CardContent className="p-4 w-full">
                          <div className="space-y-3 w-full">
                            {/* Document Header */}
                            <div className="flex items-center justify-between gap-3 w-full">
                              <div className="flex-1 min-w-0 overflow-hidden">
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
                                </div>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    toggleDocumentExpansion(doc.id)
                                  }
                                  className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
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
                                  className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onDeleteDocument(doc.id)}
                                  className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Expanded Document Preview */}
                            {expandedDocuments.has(doc.id) && (
                              <div className="border-t pt-3 space-y-3 w-full">
                                <div className="bg-muted/30 rounded-lg p-3 w-full overflow-hidden">
                                  <div className="text-sm font-medium mb-2">
                                    Document Preview
                                  </div>
                                  <div className="text-sm text-muted-foreground max-h-32 overflow-y-auto break-words">
                                    {doc.content.length > 500
                                      ? `${doc.content.substring(0, 500)}...`
                                      : doc.content}
                                  </div>
                                </div>

                                {/* Chunks Section */}
                                {doc.chunks && doc.chunks.length > 0 && (
                                  <div className="space-y-2 w-full">
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
                                    <div className="space-y-2 max-h-40 overflow-y-auto w-full">
                                      {doc.chunks
                                        .slice(0, 3)
                                        .map((chunk, index) => (
                                          <div
                                            key={chunk.id}
                                            className="border border-border rounded p-2 bg-background w-full overflow-hidden"
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
                                            <div className="text-xs text-muted-foreground line-clamp-2 break-words">
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
