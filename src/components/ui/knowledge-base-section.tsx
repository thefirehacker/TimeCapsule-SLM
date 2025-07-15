"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  HardDrive,
  Upload,
  Settings,
  FileText,
  Download,
} from "lucide-react";

interface DocumentStatus {
  count: number;
  totalSize: number;
  vectorCount: number;
}

interface KnowledgeBaseSectionProps {
  documentStatus: DocumentStatus;
  onUploadDocuments: () => void;
  onManageKnowledge: () => void;
  onScrapeUrl: () => void;
  onUploadRepository?: () => void;
  onExportTimeCapsule?: () => void;
  onLoadTimeCapsule?: () => void;
  showTimeCapsuleActions?: boolean;
  isCompact?: boolean;
  className?: string;
}

export function KnowledgeBaseSection({
  documentStatus,
  onUploadDocuments,
  onManageKnowledge,
  onScrapeUrl,
  onUploadRepository,
  onExportTimeCapsule,
  onLoadTimeCapsule,
  showTimeCapsuleActions = false,
  isCompact = false,
  className = "",
}: KnowledgeBaseSectionProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <HardDrive className="h-4 w-4" />
            Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Documents:
              </span>
              <Badge variant="outline">{documentStatus.count}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Total Size:
              </span>
              <Badge variant="outline">
                {formatFileSize(documentStatus.totalSize)}
              </Badge>
            </div>
            {documentStatus.vectorCount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Searchable Chunks:
                </span>
                <Badge variant="outline">
                  {documentStatus.vectorCount}
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* Main Actions */}
          <div className={isCompact ? "space-y-2" : "grid grid-cols-2 gap-2"}>
            <Button 
              onClick={onUploadDocuments} 
              variant="outline" 
              size="sm"
              className={isCompact ? "w-full" : ""}
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
            <Button 
              onClick={onManageKnowledge} 
              variant="outline" 
              size="sm"
              className={isCompact ? "w-full" : ""}
            >
              <Settings className="h-4 w-4 mr-1" />
              Manage
            </Button>
          </div>

          {/* Additional Actions */}
          <Button 
            onClick={onScrapeUrl} 
            variant="outline" 
            size="sm"
            className="w-full text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300"
          >
            <span className="mr-2">🔍</span>
            Scrape URL with Firecrawl
          </Button>

          {onUploadRepository && (
            <Button
              onClick={onUploadRepository}
              disabled
              variant="outline"
              size="sm"
              className="w-full opacity-50"
            >
              <FileText className="h-4 w-4 mr-2" />
              Repository (Soon)
            </Button>
          )}

          {/* TimeCapsule Actions */}
          {showTimeCapsuleActions && onExportTimeCapsule && onLoadTimeCapsule && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  TimeCapsule
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={onExportTimeCapsule}
                    variant="outline"
                    size="sm"
                    className="text-cyan-600 hover:text-cyan-700 border-cyan-200 hover:border-cyan-300"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    onClick={onLoadTimeCapsule}
                    variant="outline"
                    size="sm"
                    className="text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Load
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 