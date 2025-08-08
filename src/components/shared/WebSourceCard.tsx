"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  ExternalLink,
  Search,
  Clock,
  Hash,
  Copy,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  TrendingUp,
  Calendar,
  Link2,
  FileText,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WebSourceData {
  id: string;
  url: string;
  title: string;
  content: string;
  snippet?: string;
  domain: string;
  favicon?: string;
  scrapedAt: string;
  searchQuery?: string;
  searchRank?: number;
  reliability?: 'high' | 'medium' | 'low';
  contentType?: string;
  wordCount?: number;
  readingTime?: number;
  lastModified?: string;
  author?: string;
  publishedDate?: string;
  tags?: string[];
  metadata: {
    description?: string;
    keywords?: string[];
    language?: string;
    responseTime?: number;
    statusCode?: number;
    contentLength?: number;
    isSecure?: boolean;
  };
  chunks?: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  }>;
}

interface WebSourceCardProps {
  source: WebSourceData;
  showFullContent?: boolean;
  compact?: boolean;
  onViewDetails?: (sourceId: string) => void;
  onViewChunk?: (chunkId: string, sourceId: string) => void;
  onCopyContent?: (content: string) => void;
  onBookmark?: (sourceId: string) => void;
  className?: string;
}

export function WebSourceCard({
  source,
  showFullContent = false,
  compact = false,
  onViewDetails,
  onViewChunk,
  onCopyContent,
  onBookmark,
  className
}: WebSourceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);

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

  // Get search rank badge color
  const getRankBadgeColor = (rank?: number) => {
    if (!rank) return "bg-gray-500";
    if (rank <= 3) return "bg-green-500";
    if (rank <= 7) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Get content preview
  const getContentPreview = () => {
    if (source.snippet && source.snippet !== source.content) {
      return source.snippet;
    }
    
    const maxLength = compact ? 150 : 300;
    if (source.content.length <= maxLength) {
      return source.content;
    }
    return `${source.content.substring(0, maxLength)}...`;
  };

  // Extract key phrases from content
  const getKeyPhrases = () => {
    if (source.metadata?.keywords) {
      return source.metadata.keywords.slice(0, 5);
    }
    
    // Simple keyword extraction from content
    const words = source.content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 4);
    
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  };

  return (
    <Card className={cn(
      "border-border transition-all hover:shadow-md",
      source.reliability === 'high' && "border-green-200",
      source.reliability === 'low' && "border-red-200",
      className
    )}>
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="space-y-2">
          {/* Header with URL and Actions */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Favicon */}
              <div className="flex-shrink-0 mt-1">
                {source.favicon ? (
                  <img 
                    src={source.favicon} 
                    alt={`${source.domain} favicon`}
                    className="w-4 h-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Globe className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <CardTitle className={cn(
                  "text-base leading-tight line-clamp-2 hover:text-primary cursor-pointer",
                  compact && "text-sm"
                )}>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {source.title}
                  </a>
                </CardTitle>
                
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span className="truncate font-medium text-blue-600">{source.domain}</span>
                  {source.metadata?.isSecure && (
                    <Badge variant="outline" className="text-xs h-4">
                      <CheckCircle className="w-2 h-2 mr-1" />
                      Secure
                    </Badge>
                  )}
                  {getReliabilityIndicator(source.reliability)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {source.searchRank && (
                <Badge 
                  className={cn("text-xs", getRankBadgeColor(source.searchRank))}
                >
                  #{source.searchRank}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(source.url, '_blank')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Scraped {formatTimeAgo(source.scrapedAt)}
            </span>
            {source.wordCount && (
              <span>{source.wordCount} words</span>
            )}
            {source.readingTime && (
              <span>{source.readingTime}m read</span>
            )}
            {source.publishedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(source.publishedDate).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Search Query Attribution */}
          {source.searchQuery && (
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Search className="w-3 h-3" />
                Found via: "{source.searchQuery}"
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn("pt-0", compact && "pb-3")}>
        <div className="space-y-3">
          {/* Content Preview */}
          <div className={cn("text-sm leading-relaxed", compact && "text-xs")}>
            <div className="text-muted-foreground line-clamp-3">
              {getContentPreview()}
            </div>
          </div>

          {/* Key Phrases */}
          {!compact && (
            <div className="flex flex-wrap gap-1">
              {getKeyPhrases().map((phrase, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {phrase}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs h-7"
              >
                <Eye className="w-3 h-3 mr-1" />
                {isExpanded ? 'Hide' : 'Show'} Details
              </Button>
              
              {source.chunks && source.chunks.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSnippets(!showSnippets)}
                  className="text-xs h-7"
                >
                  <Hash className="w-3 h-3 mr-1" />
                  {source.chunks.length} Chunks
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {onBookmark && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBookmark(source.id)}
                  className="text-xs h-7 w-7 p-0"
                >
                  <Bookmark className="w-3 h-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopyContent?.(source.content)}
                className="text-xs h-7 w-7 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
              {onViewDetails && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(source.id)}
                  className="text-xs h-7 w-7 p-0"
                >
                  <FileText className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="space-y-4 pt-3 border-t">
              {/* Full URL */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Link2 className="w-3 h-3" />
                  Source URL
                </h4>
                <div className="p-2 bg-muted/30 rounded text-xs font-mono break-all">
                  {source.url}
                </div>
              </div>

              {/* Content Description */}
              {source.metadata?.description && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{source.metadata.description}</p>
                </div>
              )}

              {/* Technical Details */}
              <div>
                <h4 className="text-sm font-medium mb-2">Technical Details</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {source.metadata?.statusCode && (
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge 
                        variant={source.metadata.statusCode === 200 ? "default" : "destructive"}
                        className="ml-1 text-xs h-4"
                      >
                        {source.metadata.statusCode}
                      </Badge>
                    </div>
                  )}
                  {source.metadata?.responseTime && (
                    <div>
                      <span className="font-medium">Response Time:</span>
                      <span className="ml-1 text-muted-foreground">{source.metadata.responseTime}ms</span>
                    </div>
                  )}
                  {source.metadata?.language && (
                    <div>
                      <span className="font-medium">Language:</span>
                      <span className="ml-1 text-muted-foreground">{source.metadata.language}</span>
                    </div>
                  )}
                  {source.contentType && (
                    <div>
                      <span className="font-medium">Type:</span>
                      <span className="ml-1 text-muted-foreground">{source.contentType}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Author and Publication Info */}
              {(source.author || source.publishedDate || source.lastModified) && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Publication Info</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {source.author && (
                      <p><span className="font-medium">Author:</span> {source.author}</p>
                    )}
                    {source.publishedDate && (
                      <p>
                        <span className="font-medium">Published:</span>{' '}
                        {new Date(source.publishedDate).toLocaleDateString()}
                      </p>
                    )}
                    {source.lastModified && (
                      <p>
                        <span className="font-medium">Last Modified:</span>{' '}
                        {new Date(source.lastModified).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Full Content Preview */}
              {showFullContent && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Full Content</h4>
                  <ScrollArea className="h-48 border rounded p-3">
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {source.content}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          )}

          {/* Content Chunks */}
          {showSnippets && source.chunks && source.chunks.length > 0 && (
            <div className="space-y-3 pt-3 border-t">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Hash className="w-3 h-3" />
                Content Chunks ({source.chunks.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {source.chunks.slice(0, 5).map((chunk, index) => (
                  <div
                    key={chunk.id}
                    className="border border-border rounded p-2 bg-background cursor-pointer hover:bg-muted/50"
                    onClick={() => onViewChunk?.(chunk.id, source.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="text-xs">
                        Snippet {index + 1}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {chunk.content.length} chars
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {chunk.content.length > 120
                        ? `${chunk.content.substring(0, 120)}...`
                        : chunk.content}
                    </div>
                  </div>
                ))}
                {source.chunks.length > 5 && (
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground h-7"
                      onClick={() => onViewDetails?.(source.id)}
                    >
                      View {source.chunks.length - 5} more chunks...
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}