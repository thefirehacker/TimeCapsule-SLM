"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Hash,
  Eye,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Search,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface ChunkCardProps {
  chunk: ChunkData;
  documentTitle?: string;
  documentId?: string;
  index?: number;
  isSelected?: boolean;
  isHighlighted?: boolean;
  showActions?: boolean;
  compact?: boolean;
  onView?: (chunkId: string) => void;
  onCopy?: (content: string) => void;
  onSimilar?: (chunkId: string) => void;
  onSelect?: (chunkId: string) => void;
  className?: string;
}

export function ChunkCard({
  chunk,
  documentTitle,
  documentId,
  index,
  isSelected = false,
  isHighlighted = false,
  showActions = true,
  compact = false,
  onView,
  onCopy,
  onSimilar,
  onSelect,
  className
}: ChunkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate chunk statistics
  const words = chunk.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 250);

  // Get confidence level styling
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "bg-gray-500";
    if (confidence > 0.8) return "bg-green-500";
    if (confidence > 0.6) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get sentiment indicator
  const getSentimentIndicator = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-3 h-3 text-green-500" title="Positive sentiment" />;
      case 'negative':
        return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" title="Negative sentiment" />;
      case 'neutral':
        return <TrendingUp className="w-3 h-3 text-gray-500" title="Neutral sentiment" />;
      default:
        return null;
    }
  };

  // Format chunk preview
  const getPreviewText = () => {
    const maxLength = compact ? 100 : 200;
    if (chunk.content.length <= maxLength) {
      return chunk.content;
    }
    return `${chunk.content.substring(0, maxLength)}...`;
  };

  // Handle click action
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(chunk.id);
    } else if (onView) {
      onView(chunk.id);
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 cursor-pointer",
        isSelected && "ring-2 ring-primary",
        isHighlighted && "bg-yellow-50 border-yellow-200",
        isHovered && "shadow-md",
        "hover:shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className={cn("p-4", compact && "p-3")}>
        <div className="space-y-3">
          {/* Chunk Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-mono">
                  <Hash className="w-3 h-3 mr-1" />
                  {typeof index === 'number' ? `${index + 1}` : chunk.id.substring(0, 8)}
                </Badge>
                
                {chunk.metadata?.confidence && (
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        getConfidenceColor(chunk.metadata.confidence)
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {Math.round(chunk.metadata.confidence * 100)}%
                    </span>
                  </div>
                )}

                {getSentimentIndicator(chunk.metadata?.sentiment)}
              </div>

              {/* Chunk metadata */}
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {chunk.startIndex}-{chunk.endIndex}
                </span>
                <span>{words} words</span>
                {readingTime > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readingTime}m read
                  </span>
                )}
                {chunk.metadata?.section && (
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {chunk.metadata.section}
                  </span>
                )}
              </div>

              {/* Document info */}
              {documentTitle && (
                <div className="text-xs text-muted-foreground mt-1 truncate">
                  From: {documentTitle}
                </div>
              )}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView?.(chunk.id);
                  }}
                  className="h-7 w-7 p-0"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                      className="h-7 w-7 p-0"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onView?.(chunk.id);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopy?.(chunk.content);
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Content
                    </DropdownMenuItem>
                    {onSimilar && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onSimilar(chunk.id);
                          }}
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Find Similar
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Chunk Preview Content */}
          <div className={cn("text-sm leading-relaxed", compact && "text-xs")}>
            <div className="line-clamp-3 text-muted-foreground">
              {getPreviewText()}
            </div>
          </div>

          {/* Keywords and Tags */}
          {chunk.metadata?.keywords && chunk.metadata.keywords.length > 0 && !compact && (
            <div className="flex flex-wrap gap-1">
              {chunk.metadata.keywords.slice(0, 4).map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
              {chunk.metadata.keywords.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{chunk.metadata.keywords.length - 4} more
                </Badge>
              )}
            </div>
          )}

          {/* Footer with additional info */}
          {!compact && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {chunk.metadata?.page && (
                  <span>Page {chunk.metadata.page}</span>
                )}
                {chunk.metadata?.language && (
                  <Badge variant="outline" className="text-xs">
                    {chunk.metadata.language}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {chunk.metadata?.readability && (
                  <div className="flex items-center gap-1" title={`Readability: ${Math.round(chunk.metadata.readability * 100)}%`}>
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${chunk.metadata.readability * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(chunk.metadata.readability * 100)}%
                    </span>
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