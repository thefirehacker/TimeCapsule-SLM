"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  FileText,
  Globe,
  Bot,
  Package,
  Clock,
  MessageSquare,
  Upload,
  TrendingUp,
  Users,
  Database,
  Hash,
  Eye,
  Download,
  Trash2,
  Filter,
  SortAsc,
  Calendar,
  FileIcon,
  Link,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced document interface with additional metadata
interface EnhancedDocument {
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
    scrapedAt?: string;
    searchQuery?: string;
    reliability?: 'high' | 'medium' | 'low';
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

interface SourceStats {
  totalSources: number;
  totalChunks: number;
  totalSize: number;
  webSources: number;
  localDocs: number;
  aiGenerated: number;
  lastUpdated: Date;
}

interface SourcesPanelProps {
  documents: EnhancedDocument[];
  sourceStats: SourceStats;
  onDeleteDocument: (docId: string) => void;
  onViewChunk?: (chunkId: string, documentId: string) => void;
  onUploadDocuments?: () => void;
  isUploading?: boolean;
  className?: string;
}

// Source type configurations
const sourceTypeConfigs = {
  userdocs: {
    label: 'Local Documents',
    icon: FileText,
    color: 'bg-blue-500',
    description: 'User uploaded documents'
  },
  'virtual-docs': {
    label: 'Web Sources',
    icon: Globe,
    color: 'bg-green-500',
    description: 'AI scraped web content'
  },
  'ai-frames': {
    label: 'AI Generated',
    icon: Bot,
    color: 'bg-purple-500',
    description: 'AI generated content'
  },
  'timecapsule': {
    label: 'TimeCapsule',
    icon: Clock,
    color: 'bg-orange-500',
    description: 'TimeCapsule imports'
  },
  'bubblspace': {
    label: 'BubblSpace',
    icon: MessageSquare,
    color: 'bg-pink-500',
    description: 'BubblSpace content'
  },
  'system': {
    label: 'System',
    icon: Package,
    color: 'bg-gray-500',
    description: 'System generated content'
  }
};

export function SourcesPanel({
  documents,
  sourceStats,
  onDeleteDocument,
  onViewChunk,
  onUploadDocuments,
  isUploading = false,
  className
}: SourcesPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSourceType, setSelectedSourceType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'date' | 'size' | 'name' | 'relevance'>('date');
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());

  // Enhanced document categorization and filtering
  const categorizedDocuments = useMemo(() => {
    const categories: Record<string, EnhancedDocument[]> = {};
    
    Object.keys(sourceTypeConfigs).forEach(type => {
      categories[type] = documents.filter(doc => {
        // Primary filter by document type
        if (doc.metadata.documentType === type) return true;
        
        // Fallback filters for documents without explicit type
        switch (type) {
          case 'userdocs':
            return !doc.metadata.documentType && doc.metadata.source === 'upload';
          case 'virtual-docs':
            return !doc.metadata.documentType && (
              doc.metadata.source === 'websearch' || 
              doc.metadata.url || 
              doc.metadata.domain
            );
          case 'ai-frames':
            return !doc.metadata.documentType && (
              doc.metadata.isGenerated || 
              doc.metadata.source === 'generated'
            );
          case 'timecapsule':
            return !doc.metadata.documentType && doc.metadata.source === 'timecapsule_import';
          case 'bubblspace':
            return !doc.metadata.documentType && doc.metadata.source === 'bubblspace';
          default:
            return false;
        }
      });
    });
    
    // Add "all" category
    categories.all = documents;
    
    return categories;
  }, [documents]);

  // Search and sort filtered documents
  const filteredAndSortedDocuments = useMemo(() => {
    let docs = selectedSourceType === "all" 
      ? documents 
      : categorizedDocuments[selectedSourceType] || [];
    
    // Apply search filter
    if (searchTerm) {
      docs = docs.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.metadata.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.metadata.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    docs = [...docs].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.metadata.uploadedAt).getTime() - new Date(a.metadata.uploadedAt).getTime();
        case 'size':
          return b.metadata.filesize - a.metadata.filesize;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'relevance':
          return (b.chunks?.length || 0) - (a.chunks?.length || 0);
        default:
          return 0;
      }
    });
    
    return docs;
  }, [documents, categorizedDocuments, selectedSourceType, searchTerm, sortBy]);

  // Get source type badge component
  const getSourceTypeBadge = (doc: EnhancedDocument) => {
    const docType = doc.metadata.documentType || getDocumentTypeFromMetadata(doc);
    const config = sourceTypeConfigs[docType as keyof typeof sourceTypeConfigs] || sourceTypeConfigs.userdocs;
    const IconComponent = config.icon;
    
    return (
      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
        <div className={cn("w-2 h-2 rounded-full", config.color)} />
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  // Helper function to determine document type from metadata
  const getDocumentTypeFromMetadata = (doc: EnhancedDocument): string => {
    if (doc.metadata.url || doc.metadata.domain) return 'virtual-docs';
    if (doc.metadata.isGenerated) return 'ai-frames';
    if (doc.metadata.source === 'upload') return 'userdocs';
    return 'userdocs';
  };

  // Get reliability indicator
  const getReliabilityIndicator = (reliability?: string) => {
    switch (reliability) {
      case 'high':
        return <CheckCircle className="w-4 h-4 text-green-500" title="High reliability source" />;
      case 'medium':
        return <Info className="w-4 h-4 text-yellow-500" title="Medium reliability source" />;
      case 'low':
        return <AlertCircle className="w-4 h-4 text-red-500" title="Low reliability source" />;
      default:
        return null;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Toggle source expansion
  const toggleSourceExpansion = (sourceId: string) => {
    setExpandedSources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Header with Enhanced Stats */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Research Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{sourceStats.totalSources}</p>
                <p className="text-xs text-muted-foreground">Sources</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Hash className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{sourceStats.totalChunks}</p>
                <p className="text-xs text-muted-foreground">Chunks</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Globe className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{sourceStats.webSources}</p>
                <p className="text-xs text-muted-foreground">Web</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Upload className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{sourceStats.localDocs}</p>
                <p className="text-xs text-muted-foreground">Local</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Bot className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{sourceStats.aiGenerated}</p>
                <p className="text-xs text-muted-foreground">AI Gen</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{formatFileSize(sourceStats.totalSize)}</p>
                <p className="text-xs text-muted-foreground">Total Size</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sources, content, or filenames..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedSourceType}
              onChange={(e) => setSelectedSourceType(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">All Sources ({documents.length})</option>
              {Object.entries(sourceTypeConfigs).map(([type, config]) => (
                <option key={type} value={type}>
                  {config.label} ({categorizedDocuments[type]?.length || 0})
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="size">Sort by Size</option>
              <option value="name">Sort by Name</option>
              <option value="relevance">Sort by Relevance</option>
            </select>

            {onUploadDocuments && (
              <Button
                onClick={onUploadDocuments}
                disabled={isUploading}
                className="flex items-center gap-2 whitespace-nowrap"
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
        </CardContent>
      </Card>

      {/* Enhanced Source List */}
      <div className="flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {filteredAndSortedDocuments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No sources found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchTerm ? 
                      `No sources match "${searchTerm}"` : 
                      selectedSourceType === "all" ?
                        "Upload documents or add web sources to get started" :
                        `No ${sourceTypeConfigs[selectedSourceType as keyof typeof sourceTypeConfigs]?.label.toLowerCase()} sources yet`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredAndSortedDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Source Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{doc.title}</h3>
                            {getReliabilityIndicator(doc.metadata.reliability)}
                          </div>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            {getSourceTypeBadge(doc)}
                            <Badge variant="outline" className="text-xs">
                              {doc.metadata.filetype}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {formatFileSize(doc.metadata.filesize)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {doc.chunks?.length || 0} chunks
                            </Badge>
                            {doc.metadata.url && (
                              <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                <Link className="w-3 h-3" />
                                Web Source
                              </Badge>
                            )}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(doc.metadata.uploadedAt).toLocaleDateString()}
                              </span>
                              {doc.metadata.searchQuery && (
                                <span className="flex items-center gap-1">
                                  <Search className="w-3 h-3" />
                                  Query: "{doc.metadata.searchQuery}"
                                </span>
                              )}
                              {doc.metadata.domain && (
                                <span className="flex items-center gap-1">
                                  <Globe className="w-3 h-3" />
                                  {doc.metadata.domain}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSourceExpansion(doc.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const blob = new Blob([doc.content], { type: "text/plain" });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = doc.title || "document.txt";
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
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

                      {/* Expanded Source Details */}
                      {expandedSources.has(doc.id) && (
                        <div className="border-t pt-4 space-y-4">
                          {/* Content Preview */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">Content Preview</h4>
                            <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground max-h-32 overflow-y-auto">
                              {doc.content.length > 500
                                ? `${doc.content.substring(0, 500)}...`
                                : doc.content}
                            </div>
                          </div>

                          {/* Chunks Section */}
                          {doc.chunks && doc.chunks.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium flex items-center gap-2">
                                  <Hash className="w-3 h-3" />
                                  Content Chunks ({doc.chunks.length})
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {doc.vectors?.length || 0} embeddings
                                </Badge>
                              </div>
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {doc.chunks.slice(0, 5).map((chunk, index) => (
                                  <div
                                    key={chunk.id}
                                    className="border border-border rounded p-3 bg-background cursor-pointer hover:bg-muted/50"
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
                                {doc.chunks.length > 5 && (
                                  <div className="text-center">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs text-muted-foreground"
                                    >
                                      View {doc.chunks.length - 5} more chunks...
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Web Source Specific Details */}
                          {doc.metadata.url && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Web Source Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Link className="w-3 h-3" />
                                  <a
                                    href={doc.metadata.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline truncate"
                                  >
                                    {doc.metadata.url}
                                  </a>
                                </div>
                                {doc.metadata.scrapedAt && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    Scraped: {new Date(doc.metadata.scrapedAt).toLocaleString()}
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
      </div>
    </div>
  );
}