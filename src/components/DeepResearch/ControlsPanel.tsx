"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResearchConfig } from "./hooks/useResearch";
import { DocumentStatus } from "./hooks/useDocuments";
import {
  Bot,
  Database,
  FileText,
  Upload,
  Settings,
  Wifi,
  WifiOff,
  CheckCircle2,
  HardDrive,
  Loader2,
  Clock,
  Search,
  Trash2,
  Eye,
} from "lucide-react";

interface ControlsPanelProps {
  // Research state
  prompt: string;
  onPromptChange: (prompt: string) => void;
  researchConfig: ResearchConfig;
  onResearchConfigChange: (config: ResearchConfig) => void;
  onGenerateResearch: () => void;
  onGenerateResearchStream: () => void;
  isGenerating: boolean;

  // AI connection - updated structure
  connectionState: {
    connected: boolean;
    connecting: boolean;
    error: string | null;
    baseURL: string;
    availableModels: string[];
    selectedModel: string;
    lastConnected: Date | null;
  };
  onConnectAI: () => void;
  onDisconnectAI: () => void;

  // Document management
  documentStatus: DocumentStatus;
  onManageDocuments: () => void;
  onUploadDocuments: () => void;
  isUploading: boolean;

  // Actions
  onClearAll: () => void;
  onExportResults: () => void;
}

// Dummy data for research history
const dummyResearchHistory = [
  {
    id: "1",
    title: "AI Impact on Education Systems",
    type: "academic",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
    wordCount: 2500,
  },
  {
    id: "2",
    title: "Renewable Energy Adoption Trends",
    type: "market",
    timestamp: "2024-01-14T16:45:00Z",
    status: "completed",
    wordCount: 1800,
  },
  {
    id: "3",
    title: "Social Media in Political Movements",
    type: "social",
    timestamp: "2024-01-13T14:20:00Z",
    status: "completed",
    wordCount: 3200,
  },
  {
    id: "4",
    title: "Emerging Sustainable Finance",
    type: "finance",
    timestamp: "2024-01-12T09:15:00Z",
    status: "completed",
    wordCount: 2100,
  },
  {
    id: "5",
    title: "Machine Learning in Healthcare",
    type: "technical",
    timestamp: "2024-01-11T11:30:00Z",
    status: "completed",
    wordCount: 2800,
  },
];

export function ControlsPanel({
  prompt,
  onPromptChange,
  researchConfig,
  onResearchConfigChange,
  onGenerateResearch,
  onGenerateResearchStream,
  isGenerating,
  connectionState,
  onConnectAI,
  onDisconnectAI,
  documentStatus,
  onManageDocuments,
  onUploadDocuments,
  isUploading,
  onClearAll,
  onExportResults,
}: ControlsPanelProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getResearchTypeColor = (type: string) => {
    const colors = {
      academic: "bg-indigo-100 text-indigo-700 border-indigo-200",
      market: "bg-red-100 text-red-700 border-red-200",
      social: "bg-blue-100 text-blue-700 border-blue-200",
      finance: "bg-green-100 text-green-700 border-green-200",
      technical: "bg-orange-100 text-orange-700 border-orange-200",
      "deep-research": "bg-purple-100 text-purple-700 border-purple-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* AI Connection Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                {connectionState.connected ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                AI Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {connectionState.connected ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default" className="bg-green-500">
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-medium text-xs">
                      {connectionState.selectedModel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Server:</span>
                    <span className="font-medium text-xs truncate max-w-24">
                      {connectionState.baseURL}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDisconnectAI}
                    className="w-full"
                    disabled={connectionState.connecting}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {connectionState.connecting
                      ? "Connecting to Ollama..."
                      : "Connect to Ollama to start researching"}
                  </p>
                  {connectionState.error && (
                    <p className="text-xs text-red-600">
                      {connectionState.error}
                    </p>
                  )}
                  <Button
                    onClick={onConnectAI}
                    className="w-full"
                    disabled={connectionState.connecting}
                  >
                    {connectionState.connecting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" />
                        Connect AI
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Knowledge Base */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="w-4 h-4" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Documents</div>
                  <div className="font-medium">{documentStatus.count}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-medium">
                    {formatFileSize(documentStatus.totalSize)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onUploadDocuments}
                  disabled={isUploading}
                  className="flex-1"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onManageDocuments}
                  className="flex-1"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Deep Research History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Research History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {dummyResearchHistory.map((research, index) => (
                    <div
                      key={research.id}
                      className="group p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-medium leading-tight line-clamp-2">
                          {research.title}
                        </h4>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getResearchTypeColor(research.type)}`}
                          >
                            {research.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {research.wordCount} words
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(research.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Actions at bottom */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onExportResults}
            className="w-full"
          >
            Export Current Research
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="w-full text-destructive hover:text-destructive"
          >
            Clear Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
