"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Copy,
  Download,
  Hash,
  FileText,
  MapPin,
  Clock,
  Database,
  Search,
  Eye,
  ExternalLink,
  Share,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
  CheckCircle,
  BarChart3,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChunkData {
  id: string;
  content: string;
  startIndex: number;
  endIndex: number;
  metadata?: {
    section?: string;
    page?: number;
    confidence?: number;
    keywords?: string[];
    sentiment?: 'positive' | 'negative' | 'neutral';
    language?: string;
    readability?: number;
  };
}

interface DocumentData {
  id: string;
  title: string;
  content: string;
  metadata: {
    filename: string;
    filesize: number;
    filetype: string;
    uploadedAt: string;
    source: string;
    url?: string;
    domain?: string;
    documentType?: string;
    description?: string;
  };
  chunks: ChunkData[];
  vectors?: Array<{
    chunkId: string;
    embedding: number[];
  }>;
}

interface ChunkViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  chunk: ChunkData | null;
  document: DocumentData | null;
  allChunks?: ChunkData[];
  onNavigateChunk?: (chunkId: string) => void;
  onSimilarChunks?: (chunkId: string) => void;
  className?: string;
}

export function ChunkViewerModal({
  isOpen,
  onClose,
  chunk,
  document,
  allChunks = [],
  onNavigateChunk,
  onSimilarChunks,
  className
}: ChunkViewerModalProps) {
  const [activeTab, setActiveTab] = useState("content");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find current chunk index and navigation info
  const chunkInfo = useMemo(() => {
    if (!chunk || !allChunks.length) {
      return { currentIndex: -1, totalChunks: 0, prevChunk: null, nextChunk: null };
    }

    const currentIndex = allChunks.findIndex(c => c.id === chunk.id);
    const prevChunk = currentIndex > 0 ? allChunks[currentIndex - 1] : null;
    const nextChunk = currentIndex < allChunks.length - 1 ? allChunks[currentIndex + 1] : null;

    return {
      currentIndex,
      totalChunks: allChunks.length,
      prevChunk,
      nextChunk
    };
  }, [chunk, allChunks]);

  // Get chunk statistics
  const chunkStats = useMemo(() => {
    if (!chunk) return null;

    const words = chunk.content.trim().split(/\s+/).length;
    const sentences = chunk.content.split(/[.!?]+/).length - 1;
    const characters = chunk.content.length;
    const charactersNoSpaces = chunk.content.replace(/\s/g, '').length;

    return {
      words,
      sentences,
      characters,
      charactersNoSpaces,
      readingTime: Math.ceil(words / 250) // Average reading speed
    };
  }, [chunk]);

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Copy chunk content to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Download chunk as file
  const downloadChunk = () => {
    if (!chunk || !document) return;

    const content = `Document: ${document.title}
Chunk ID: ${chunk.id}
Position: ${chunk.startIndex} - ${chunk.endIndex}
Content Length: ${chunk.content.length} characters

--- CHUNK CONTENT ---

${chunk.content}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chunk-${chunk.id.substring(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Navigate to adjacent chunk
  const navigateToChunk = (targetChunk: ChunkData | null) => {
    if (targetChunk && onNavigateChunk) {
      onNavigateChunk(targetChunk.id);
    }
  };

  if (!chunk || !document) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "w-[85vw] max-w-[85vw] max-h-[90vh] flex flex-col overflow-hidden",
          isFullscreen && "w-[95vw] max-w-[95vw] max-h-[95vh]",
          className
        )}
      >
        {/* Modal Header */}
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <Hash className="w-5 h-5" />
                Chunk Inspector
                {chunkInfo.totalChunks > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {chunkInfo.currentIndex + 1} of {chunkInfo.totalChunks}
                  </Badge>
                )}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span className="truncate">{document.title}</span>
                <span>•</span>
                <span>Position: {chunk.startIndex}-{chunk.endIndex}</span>
                <span>•</span>
                <span>{chunk.content.length} chars</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Navigation Controls */}
              {chunkInfo.totalChunks > 1 && (
                <div className="flex items-center gap-1 mr-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToChunk(chunkInfo.prevChunk)}
                    disabled={!chunkInfo.prevChunk}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToChunk(chunkInfo.nextChunk)}
                    disabled={!chunkInfo.nextChunk}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Content */}
        <div className="flex-1 min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="metadata" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Metadata
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="context" className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Context
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="flex-1 mt-4">
              <div className="space-y-4 h-full">
                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(chunk.content)}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Content
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadChunk}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  {onSimilarChunks && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSimilarChunks(chunk.id)}
                      className="flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Find Similar
                    </Button>
                  )}
                  {document.metadata.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(document.metadata.url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Original Source
                    </Button>
                  )}
                </div>

                {/* Chunk Content */}
                <Card className="flex-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>Chunk Content</span>
                      {chunk.metadata?.confidence && (
                        <Badge 
                          variant={chunk.metadata.confidence > 0.8 ? "default" : "secondary"}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {Math.round(chunk.metadata.confidence * 100)}% confidence
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[60vh]">
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                          {chunk.content}
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Metadata Tab */}
            <TabsContent value="metadata" className="flex-1 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Chunk Metadata */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Chunk Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Chunk ID:</span>
                        <p className="text-muted-foreground font-mono truncate">{chunk.id}</p>
                      </div>
                      <div>
                        <span className="font-medium">Position:</span>
                        <p className="text-muted-foreground">{chunk.startIndex} - {chunk.endIndex}</p>
                      </div>
                      <div>
                        <span className="font-medium">Length:</span>
                        <p className="text-muted-foreground">{chunk.content.length} characters</p>
                      </div>
                      <div>
                        <span className="font-medium">Words:</span>
                        <p className="text-muted-foreground">{chunkStats?.words}</p>
                      </div>
                      {chunk.metadata?.section && (
                        <div className="col-span-2">
                          <span className="font-medium">Section:</span>
                          <p className="text-muted-foreground">{chunk.metadata.section}</p>
                        </div>
                      )}
                      {chunk.metadata?.page && (
                        <div>
                          <span className="font-medium">Page:</span>
                          <p className="text-muted-foreground">{chunk.metadata.page}</p>
                        </div>
                      )}
                      {chunk.metadata?.language && (
                        <div>
                          <span className="font-medium">Language:</span>
                          <p className="text-muted-foreground">{chunk.metadata.language}</p>
                        </div>
                      )}
                    </div>
                    
                    {chunk.metadata?.keywords && chunk.metadata.keywords.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Keywords:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {chunk.metadata.keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Document Metadata */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Document Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Title:</span>
                        <p className="text-muted-foreground truncate">{document.title}</p>
                      </div>
                      <div>
                        <span className="font-medium">Filename:</span>
                        <p className="text-muted-foreground truncate">{document.metadata.filename}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="font-medium">Type:</span>
                          <p className="text-muted-foreground">{document.metadata.filetype}</p>
                        </div>
                        <div>
                          <span className="font-medium">Size:</span>
                          <p className="text-muted-foreground">{formatFileSize(document.metadata.filesize)}</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Source:</span>
                        <p className="text-muted-foreground">{document.metadata.source}</p>
                      </div>
                      <div>
                        <span className="font-medium">Uploaded:</span>
                        <p className="text-muted-foreground">
                          {new Date(document.metadata.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                      {document.metadata.url && (
                        <div>
                          <span className="font-medium">URL:</span>
                          <a 
                            href={document.metadata.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline truncate block"
                          >
                            {document.metadata.url}
                          </a>
                        </div>
                      )}
                      {document.metadata.description && (
                        <div>
                          <span className="font-medium">Description:</span>
                          <p className="text-muted-foreground text-xs">{document.metadata.description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="flex-1 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* Content Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Content Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {chunkStats && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{chunkStats.words}</p>
                          <p className="text-sm text-muted-foreground">Words</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{chunkStats.sentences}</p>
                          <p className="text-sm text-muted-foreground">Sentences</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{chunkStats.characters}</p>
                          <p className="text-sm text-muted-foreground">Characters</p>
                        </div>
                        <div className="text-center p-3 bg-muted/30 rounded-lg">
                          <p className="text-2xl font-bold text-primary">{chunkStats.readingTime}m</p>
                          <p className="text-sm text-muted-foreground">Read Time</p>
                        </div>
                      </div>
                    )}

                    {chunk.metadata?.sentiment && (
                      <div>
                        <span className="font-medium text-sm">Sentiment Analysis:</span>
                        <div className="mt-2">
                          <Badge 
                            variant={
                              chunk.metadata.sentiment === 'positive' ? 'default' :
                              chunk.metadata.sentiment === 'negative' ? 'destructive' : 'secondary'
                            }
                            className="capitalize"
                          >
                            {chunk.metadata.sentiment}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {chunk.metadata?.readability && (
                      <div>
                        <span className="font-medium text-sm">Readability Score:</span>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${chunk.metadata.readability * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {Math.round(chunk.metadata.readability * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Vector Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Vector Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {document.vectors?.find(v => v.chunkId === chunk.id) ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Embedding Available</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Vector dimensions: {document.vectors.find(v => v.chunkId === chunk.id)?.embedding.length || 0}</p>
                          <p>Embedding status: Ready for semantic search</p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            This chunk has been processed for semantic similarity search and can be used in vector-based queries.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">Embedding Pending</span>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            This chunk is queued for vector embedding processing.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Context Tab */}
            <TabsContent value="context" className="flex-1 mt-4">
              <div className="space-y-4 h-full">
                {/* Surrounding Context */}
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Document Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[60vh]">
                      <div className="space-y-4">
                        {/* Show surrounding text from document */}
                        {document && (
                          <div className="space-y-2">
                            {/* Before context */}
                            {chunk.startIndex > 0 && (
                              <div>
                                <Badge variant="outline" className="mb-2">Before</Badge>
                                <div className="p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                                  {document.content.substring(
                                    Math.max(0, chunk.startIndex - 200),
                                    chunk.startIndex
                                  )}
                                  {chunk.startIndex > 200 && '...'}
                                </div>
                              </div>
                            )}

                            {/* Current chunk (highlighted) */}
                            <div>
                              <Badge className="mb-2">Current Chunk</Badge>
                              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm font-medium">
                                {chunk.content}
                              </div>
                            </div>

                            {/* After context */}
                            {chunk.endIndex < document.content.length && (
                              <div>
                                <Badge variant="outline" className="mb-2">After</Badge>
                                <div className="p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                                  {document.content.substring(
                                    chunk.endIndex,
                                    Math.min(document.content.length, chunk.endIndex + 200)
                                  )}
                                  {chunk.endIndex + 200 < document.content.length && '...'}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}