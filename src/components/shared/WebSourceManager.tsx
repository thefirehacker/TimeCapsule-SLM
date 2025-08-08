"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Globe,
  Search,
  Filter,
  SortDesc,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  ExternalLink,
  Bookmark,
  Download,
  RefreshCw,
  Settings,
} from "lucide-react";
import { WebSourceCard } from "./WebSourceCard";
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

interface SearchSession {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
  sources: string[];
}

interface WebSourceManagerProps {
  sources: WebSourceData[];
  searchSessions?: SearchSession[];
  onViewSource?: (sourceId: string) => void;
  onViewChunk?: (chunkId: string, sourceId: string) => void;
  onBookmarkSource?: (sourceId: string) => void;
  onDeleteSource?: (sourceId: string) => void;
  onRefreshSource?: (sourceId: string) => void;
  onExportSources?: (sourceIds: string[]) => void;
  isLoading?: boolean;
  className?: string;
}

export function WebSourceManager({
  sources,
  searchSessions = [],
  onViewSource,
  onViewChunk,
  onBookmarkSource,
  onDeleteSource,
  onRefreshSource,
  onExportSources,
  isLoading = false,
  className
}: WebSourceManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedReliability, setSelectedReliability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'date' | 'domain' | 'reliability' | 'wordCount'>('date');
  const [viewMode, setViewMode] = useState<'cards' | 'compact'>('cards');
  const [selectedSources, setSelectedSources] = useState<Set<string>>(new Set());

  // Process and filter sources
  const { filteredSources, domainStats, reliabilityStats } = useMemo(() => {
    let filtered = [...sources];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(source =>
        source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        source.searchQuery?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply domain filter
    if (selectedDomain !== "all") {
      filtered = filtered.filter(source => source.domain === selectedDomain);
    }

    // Apply reliability filter
    if (selectedReliability !== "all") {
      filtered = filtered.filter(source => source.reliability === selectedReliability);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime();
        case 'domain':
          return a.domain.localeCompare(b.domain);
        case 'reliability':
          const reliabilityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return (reliabilityOrder[b.reliability || 'medium'] || 2) - (reliabilityOrder[a.reliability || 'medium'] || 2);
        case 'wordCount':
          return (b.wordCount || 0) - (a.wordCount || 0);
        default:
          return 0;
      }
    });

    // Calculate domain statistics
    const domains = new Map<string, number>();
    const reliabilities = { high: 0, medium: 0, low: 0 };

    sources.forEach(source => {
      domains.set(source.domain, (domains.get(source.domain) || 0) + 1);
      if (source.reliability) {
        reliabilities[source.reliability]++;
      }
    });

    return {
      filteredSources: filtered,
      domainStats: Array.from(domains.entries()).sort((a, b) => b[1] - a[1]),
      reliabilityStats: reliabilities
    };
  }, [sources, searchTerm, selectedDomain, selectedReliability, sortBy]);

  // Calculate overall statistics
  const stats = useMemo(() => {
    const totalWords = sources.reduce((sum, source) => sum + (source.wordCount || 0), 0);
    const totalReadingTime = sources.reduce((sum, source) => sum + (source.readingTime || 0), 0);
    const averageReliability = sources.filter(s => s.reliability).length > 0 ?
      sources.filter(s => s.reliability === 'high').length / sources.filter(s => s.reliability).length : 0;

    return {
      totalSources: sources.length,
      totalWords,
      totalReadingTime,
      averageReliability: Math.round(averageReliability * 100),
      domains: new Set(sources.map(s => s.domain)).size,
      lastUpdated: sources.length > 0 ? 
        Math.max(...sources.map(s => new Date(s.scrapedAt).getTime())) : Date.now()
    };
  }, [sources]);

  // Handle source selection
  const toggleSourceSelection = (sourceId: string) => {
    setSelectedSources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {/* Header with Stats */}
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Web Sources Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Statistics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.totalSources}</p>
                <p className="text-xs text-muted-foreground">Sources</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <ExternalLink className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.domains}</p>
                <p className="text-xs text-muted-foreground">Domains</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BarChart3 className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.totalWords.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Words</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Clock className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.totalReadingTime}m</p>
                <p className="text-xs text-muted-foreground">Reading</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.averageReliability}%</p>
                <p className="text-xs text-muted-foreground">Quality</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{formatTimeAgo(stats.lastUpdated)}</p>
                <p className="text-xs text-muted-foreground">Updated</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search sources, domains, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Domain: {selectedDomain === "all" ? "All" : selectedDomain}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setSelectedDomain("all")}>
                  All Domains ({sources.length})
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {domainStats.slice(0, 10).map(([domain, count]) => (
                  <DropdownMenuItem key={domain} onClick={() => setSelectedDomain(domain)}>
                    {domain} ({count})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Quality: {selectedReliability === "all" ? "All" : selectedReliability}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedReliability("all")}>
                  All Sources
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedReliability("high")}>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  High Quality ({reliabilityStats.high})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedReliability("medium")}>
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                  Medium Quality ({reliabilityStats.medium})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedReliability("low")}>
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                  Low Quality ({reliabilityStats.low})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SortDesc className="w-4 h-4" />
                  Sort: {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('date')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Scraped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('domain')}>
                  <Globe className="w-4 h-4 mr-2" />
                  Domain
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('reliability')}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Reliability
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('wordCount')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Word Count
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={viewMode === 'compact' ? 'default' : 'outline'}
              onClick={() => setViewMode(viewMode === 'cards' ? 'compact' : 'cards')}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              {viewMode === 'cards' ? 'Compact' : 'Cards'}
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedSources.size > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedSources.size} source{selectedSources.size > 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center gap-2">
                  {onExportSources && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        onExportSources(Array.from(selectedSources));
                        setSelectedSources(new Set());
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedSources(new Set())}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Search Sessions */}
      {searchSessions.length > 0 && (
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="w-4 h-4" />
              Recent Search Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {searchSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div>
                    <span className="text-sm font-medium">"{session.query}"</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <Badge variant="secondary">{session.resultCount} results</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sources List */}
      <div className="flex-1">
        <ScrollArea className="h-full">
          {isLoading ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
                <p className="font-medium">Loading web sources...</p>
              </CardContent>
            </Card>
          ) : filteredSources.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Globe className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No web sources found</h3>
                <p className="text-muted-foreground text-center">
                  {searchTerm ? 
                    `No sources match "${searchTerm}"` : 
                    "Web sources will appear here after search queries are executed"
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={cn(
              "space-y-4",
              viewMode === 'compact' && "space-y-2"
            )}>
              {filteredSources.map((source) => (
                <WebSourceCard
                  key={source.id}
                  source={source}
                  compact={viewMode === 'compact'}
                  onViewDetails={onViewSource}
                  onViewChunk={onViewChunk}
                  onCopyContent={(content) => {
                    navigator.clipboard.writeText(content);
                  }}
                  onBookmark={onBookmarkSource}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}