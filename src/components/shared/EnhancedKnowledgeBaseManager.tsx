"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Search,
  Filter,
  MoreVertical,
  CheckSquare,
  Square,
  AlertTriangle,
  Link2,
  Copy,
  Merge,
  SortDesc,
  Users,
  Calendar,
  HardDrive,
  X,
  ChevronDown,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    url?: string;
    domain?: string;
    searchQuery?: string;
    scrapedAt?: string;
    duplicateOf?: string;
    similarity?: number;
    tags?: string[];
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

interface DuplicateInfo {
  isDuplicate: boolean;
  count: number;
  group: Document[];
}

interface EnhancedKnowledgeBaseManagerProps {
  documents: Document[];
  documentStatus: DocumentStatus;
  onDeleteDocument: (docId: string) => void;
  onDeleteMultiple?: (docIds: string[]) => void;
  onMergeDocuments?: (docIds: string[]) => void;
  onUploadDocuments?: () => void;
  onViewChunk?: (chunkId: string, documentId: string) => void;
  isUploading?: boolean;
  showUploadButton?: boolean;
  tabConfigs: TabConfig[];
  title?: string;
  description?: string;
  showDuplicates?: boolean;
  enableBulkActions?: boolean;
  className?: string;
}

export function EnhancedKnowledgeBaseManager({
  documents,
  documentStatus,
  onDeleteDocument,
  onDeleteMultiple,
  onMergeDocuments,
  onUploadDocuments,
  onViewChunk,
  isUploading = false,
  showUploadButton = true,
  tabConfigs,
  title = "Enhanced Knowledge Base Manager",
  description = "Advanced document management with grouping, deduplication, and bulk operations.",
  showDuplicates = true,
  enableBulkActions = true,
  className,
}: EnhancedKnowledgeBaseManagerProps) {
  const [activeTab, setActiveTab] = useState(tabConfigs[0]?.id || "");
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set()
  );
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size" | "type">(
    "date"
  );
  const [showOnlyDuplicates, setShowOnlyDuplicates] = useState(false);
  const [groupBy, setGroupBy] = useState<"none" | "domain" | "type" | "date">(
    "none"
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Enhanced duplicate detection
  const detectDuplicates = useMemo(() => {
    return (docs: Document[]) => {
      const duplicateMap: Record<string, Document[]> = {};
      const seen = new Set<string>();
      const duplicates = new Set<string>();

      docs.forEach((doc) => {
        // Create a signature based on title, content length, and type
        const signature = `${doc.title.toLowerCase().trim()}_${doc.content.length}_${doc.metadata.filetype}`;

        if (seen.has(signature)) {
          // Mark both original and current as duplicates
          if (!duplicateMap[signature]) {
            const original = docs.find(
              (d) =>
                `${d.title.toLowerCase().trim()}_${d.content.length}_${d.metadata.filetype}` ===
                signature
            );
            if (original) {
              duplicateMap[signature] = [original];
              duplicates.add(original.id);
            }
          }
          duplicateMap[signature].push(doc);
          duplicates.add(doc.id);
        } else {
          seen.add(signature);
        }
      });

      return { duplicateMap, duplicates };
    };
  }, []);

  // Smart document grouping
  const getSmartGroups = (docs: Document[]) => {
    if (groupBy === "none") return { "All Documents": docs };

    const groups: Record<string, Document[]> = {};

    docs.forEach((doc) => {
      let groupKey = "Other";

      switch (groupBy) {
        case "domain":
          if (doc.metadata.url) {
            try {
              groupKey = new URL(doc.metadata.url).hostname;
            } catch {
              groupKey = doc.metadata.domain || "Unknown Domain";
            }
          } else {
            groupKey = "Local Documents";
          }
          break;
        case "type":
          groupKey =
            doc.metadata.documentType || doc.metadata.source || "Unknown";
          break;
        case "date":
          const date = new Date(doc.metadata.uploadedAt);
          groupKey = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          });
          break;
      }

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(doc);
    });

    return groups;
  };

  // Enhanced document filtering and grouping
  const getProcessedDocuments = useMemo(() => {
    const grouped: Record<string, any> = {};

    tabConfigs.forEach((config) => {
      let docs = documents.filter(config.filter);

      // Apply search filter
      if (searchTerm) {
        docs = docs.filter(
          (doc) =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.metadata.filename
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            doc.metadata.description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      // Apply duplicate filter
      if (showOnlyDuplicates) {
        const { duplicates } = detectDuplicates(docs);
        docs = docs.filter((doc) => duplicates.has(doc.id));
      }

      // Apply sorting
      docs = docs.sort((a, b) => {
        switch (sortBy) {
          case "date":
            return (
              new Date(b.metadata.uploadedAt).getTime() -
              new Date(a.metadata.uploadedAt).getTime()
            );
          case "name":
            return a.title.localeCompare(b.title);
          case "size":
            return b.metadata.filesize - a.metadata.filesize;
          case "type":
            return a.metadata.filetype.localeCompare(b.metadata.filetype);
          default:
            return 0;
        }
      });

      // Apply grouping
      const smartGroups = getSmartGroups(docs);

      // Calculate duplicates for this tab
      const { duplicates, duplicateMap } = detectDuplicates(docs);

      grouped[config.id] = {
        documents: docs,
        groups: smartGroups,
        duplicateInfo: { duplicates, duplicateMap },
        counts: {
          total: docs.length,
          duplicates: duplicates.size,
        },
      };
    });

    return grouped;
  }, [
    documents,
    tabConfigs,
    searchTerm,
    showOnlyDuplicates,
    sortBy,
    groupBy,
    detectDuplicates,
  ]);

  // Get duplicate info for a specific document
  const getDuplicateInfo = (doc: Document, tabData: any): DuplicateInfo => {
    const signature = `${doc.title.toLowerCase().trim()}_${doc.content.length}_${doc.metadata.filetype}`;
    const duplicateGroup = tabData.duplicateInfo.duplicateMap[signature];

    if (duplicateGroup && duplicateGroup.length > 1) {
      return {
        isDuplicate: true,
        count: duplicateGroup.length,
        group: duplicateGroup,
      };
    }

    return { isDuplicate: false, count: 1, group: [doc] };
  };

  // Bulk selection handlers
  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  const selectAllDocuments = (docs: Document[]) => {
    const allIds = docs.map((doc) => doc.id);
    setSelectedDocuments(new Set(allIds));
  };

  const clearSelection = () => {
    setSelectedDocuments(new Set());
  };

  const toggleGroupExpansion = (groupKey: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
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

  // Utility functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getSourceIcon = (doc: Document) => {
    if (doc.metadata.url) return Globe;
    if (doc.metadata.isGenerated) return Bot;
    if (doc.metadata.source === "upload") return FileText;
    return FileText;
  };

  const hasSelected = selectedDocuments.size > 0;

  // Render individual document card
  const renderDocumentCard = (doc: Document, tabData: any) => {
    const duplicateInfo = getDuplicateInfo(doc, tabData);
    const SourceIcon = getSourceIcon(doc);

    return (
      <Card
        key={doc.id}
        className={cn(
          "border-border transition-all",
          selectedDocuments.has(doc.id) && "ring-2 ring-primary",
          duplicateInfo.isDuplicate &&
            showDuplicates &&
            "border-yellow-300 bg-yellow-50/50"
        )}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Document Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Selection Checkbox */}
                {enableBulkActions && (
                  <Checkbox
                    checked={selectedDocuments.has(doc.id)}
                    onCheckedChange={() => toggleDocumentSelection(doc.id)}
                    className="mt-1"
                  />
                )}

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <SourceIcon className="w-4 h-4 text-muted-foreground" />
                    <h3 className="font-medium truncate">{doc.title}</h3>
                    {duplicateInfo.isDuplicate && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Duplicate ({duplicateInfo.count})
                      </Badge>
                    )}
                    {doc.metadata.url && (
                      <Badge variant="outline" className="text-xs">
                        <Link2 className="w-3 h-3 mr-1" />
                        Web
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{doc.metadata.filetype}</span>
                    <span>•</span>
                    <span>{formatFileSize(doc.metadata.filesize)}</span>
                    <span>•</span>
                    <span>{doc.chunks?.length || 0} chunks</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(doc.metadata.uploadedAt)}
                    </span>
                  </div>

                  {doc.metadata.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {doc.metadata.description}
                    </p>
                  )}

                  {doc.metadata.searchQuery && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Search className="w-3 h-3" />
                      Found via: "{doc.metadata.searchQuery}"
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleDocumentExpansion(doc.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Eye className="w-4 h-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        const hasChunks = doc.chunks && doc.chunks.length > 0;
                        const safeTitle = (doc.title || "document").replace(
                          /[^\w\-]+/g,
                          "_"
                        );
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
                          exportText += "=== CHUNKS (detailed) ===\n";
                          const chunks = [...(doc.chunks as any[])].sort(
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
                            "=== FULL CONTENT ===\n\n" + doc.content;
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
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await navigator.clipboard.writeText(doc.content);
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Content
                    </DropdownMenuItem>
                    {doc.metadata.url && (
                      <DropdownMenuItem
                        onClick={() => window.open(doc.metadata.url, "_blank")}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Open Source
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDeleteDocument(doc.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Expanded Document Details */}
            {expandedDocuments.has(doc.id) && (
              <div className="border-t pt-3 space-y-3">
                {/* Content Preview */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="text-sm font-medium mb-2">
                    Content Preview
                  </div>
                  <div className="text-sm text-muted-foreground max-h-32 overflow-y-auto">
                    {doc.content.length > 500
                      ? `${doc.content.substring(0, 500)}...`
                      : doc.content}
                  </div>
                </div>

                {/* Chunks Section */}
                {doc.chunks && doc.chunks.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Hash className="w-3 h-3" />
                        Content Chunks ({doc.chunks.length})
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {doc.vectors?.length || 0} embeddings
                      </Badge>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {doc.chunks.slice(0, 3).map((chunk, index) => (
                        <div
                          key={chunk.id}
                          className="border border-border rounded p-2 bg-background cursor-pointer hover:bg-muted/50"
                          onClick={() => onViewChunk?.(chunk.id, doc.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="secondary" className="text-xs">
                              Chunk {index + 1}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {chunk.content.length} chars
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {chunk.content.length > 150
                              ? `${chunk.content.substring(0, 150)}...`
                              : chunk.content}
                          </div>
                        </div>
                      ))}
                      {doc.chunks.length > 3 && (
                        <div className="text-center text-xs text-muted-foreground py-2">
                          ... and {doc.chunks.length - 3} more chunks
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
    );
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Enhanced Header */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                {title}
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{documentStatus.count}</p>
                <p className="text-xs text-muted-foreground">Total Sources</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Hash className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {documentStatus.totalChunks}
                </p>
                <p className="text-xs text-muted-foreground">Total Chunks</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <HardDrive className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {formatFileSize(documentStatus.totalSize)}
                </p>
                <p className="text-xs text-muted-foreground">Total Size</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {Object.values(getProcessedDocuments).reduce(
                    (acc, tab: any) => acc + tab.counts.duplicates,
                    0
                  )}
                </p>
                <p className="text-xs text-muted-foreground">Duplicates</p>
              </div>
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, content, or metadata..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SortDesc className="w-4 h-4" />
                  Sort: {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("date")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("size")}>
                  <HardDrive className="w-4 h-4 mr-2" />
                  Size
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("type")}>
                  <Package className="w-4 h-4 mr-2" />
                  Type
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Group: {groupBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setGroupBy("none")}>
                  None
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("domain")}>
                  <Globe className="w-4 h-4 mr-2" />
                  Domain
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("type")}>
                  <Package className="w-4 h-4 mr-2" />
                  Type
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("date")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {showDuplicates && (
              <Button
                variant={showOnlyDuplicates ? "default" : "outline"}
                onClick={() => setShowOnlyDuplicates(!showOnlyDuplicates)}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Duplicates Only
              </Button>
            )}

            {showUploadButton && onUploadDocuments && (
              <Button
                onClick={onUploadDocuments}
                disabled={isUploading}
                className="flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Add Sources
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Bulk Actions Bar */}
          {enableBulkActions && hasSelected && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    {selectedDocuments.size} document
                    {selectedDocuments.size > 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {onDeleteMultiple && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        onDeleteMultiple(Array.from(selectedDocuments));
                        clearSelection();
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected
                    </Button>
                  )}
                  {onMergeDocuments && selectedDocuments.size > 1 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        onMergeDocuments(Array.from(selectedDocuments));
                        clearSelection();
                      }}
                    >
                      <Merge className="w-4 h-4 mr-2" />
                      Merge Selected
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={clearSelection}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Tabbed Interface */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className={`grid w-full grid-cols-${tabConfigs.length} mb-4`}>
          {tabConfigs.map((config) => {
            const IconComponent = config.icon;
            const tabData = getProcessedDocuments[config.id];
            return (
              <TabsTrigger
                key={config.id}
                value={config.id}
                className="flex items-center gap-2"
              >
                <IconComponent className="w-4 h-4" />
                {config.label} ({tabData?.counts.total || 0})
                {tabData?.counts.duplicates > 0 && (
                  <Badge variant="destructive" className="ml-1 text-xs h-4">
                    {tabData.counts.duplicates}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Enhanced Content Panels */}
        {tabConfigs.map((config) => {
          const tabData = getProcessedDocuments[config.id];
          const groups = tabData?.groups || {};

          return (
            <TabsContent
              key={config.id}
              value={config.id}
              className="flex-1 mt-0"
            >
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {isUploading && config.id === tabConfigs[0]?.id && (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="w-8 h-8 mx-auto mb-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                        <p className="font-medium">Processing documents...</p>
                        <p className="text-sm text-muted-foreground">
                          Please wait while we process and index your files
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {Object.keys(groups).length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="font-medium">
                          No {config.label.toLowerCase()} found
                        </p>
                        <p className="text-sm text-muted-foreground text-center">
                          {searchTerm
                            ? `No documents match "${searchTerm}"`
                            : showOnlyDuplicates
                              ? "No duplicate documents found"
                              : `Upload files to add ${config.label.toLowerCase()}`}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    Object.entries(groups).map(([groupKey, groupDocs]) => (
                      <div key={groupKey}>
                        {groupBy !== "none" && (
                          <div className="mb-3">
                            <Button
                              variant="ghost"
                              onClick={() => toggleGroupExpansion(groupKey)}
                              className="flex items-center gap-2 p-2 h-auto font-medium"
                            >
                              <ChevronDown
                                className={cn(
                                  "w-4 h-4 transition-transform",
                                  !expandedGroups.has(groupKey) && "-rotate-90"
                                )}
                              />
                              <span>{groupKey}</span>
                              <Badge variant="secondary" className="ml-auto">
                                {groupDocs.length}
                              </Badge>
                            </Button>
                            {groupBy !== "none" &&
                              !expandedGroups.has(groupKey) && (
                                <Separator className="mt-2" />
                              )}
                          </div>
                        )}

                        {(groupBy === "none" ||
                          expandedGroups.has(groupKey)) && (
                          <div className="space-y-3 mb-6">
                            {enableBulkActions &&
                              groupBy !== "none" &&
                              groupDocs.length > 1 && (
                                <div className="flex items-center gap-2 pl-6">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      selectAllDocuments(groupDocs)
                                    }
                                  >
                                    Select All in Group
                                  </Button>
                                </div>
                              )}
                            {groupDocs.map((doc: Document) =>
                              renderDocumentCard(doc, tabData)
                            )}
                          </div>
                        )}
                      </div>
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
