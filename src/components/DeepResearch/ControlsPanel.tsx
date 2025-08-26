"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResearchConfig } from "./hooks/useResearch";
import { DocumentStatus } from "./hooks/useDocuments";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import {
  Bot,
  Database,
  FileText,
  Upload,
  CheckCircle2,
  Loader2,
  Clock,
  Trash2,
  Eye,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Download,
  Share,
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

  // AI connection
  connectionState: {
    connected: boolean;
    connecting: boolean;
    error: string | null;
    baseURL: string;
    availableModels: string[];
    selectedModel: string;
    lastConnected: Date | null;
    isAutoReconnecting?: boolean;
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
  onStartNewChat: () => void;

  // Navigation
  onLoadResearch?: (researchId: string) => Promise<boolean>;
}

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
  onStartNewChat,
  onLoadResearch,
}: ControlsPanelProps) {
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

  // Local state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Handlers
  const handleLoadResearch = async (researchId: string) => {
    try {
      console.log(
        "🔄 Loading research session from ControlsPanel:",
        researchId
      );

      // Use the passed navigation function
      if (onLoadResearch) {
        const success = await onLoadResearch(researchId);
        if (success) {
          console.log(
            "✅ Research session loaded successfully from ControlsPanel"
          );
        } else {
          console.error("❌ Failed to load research session");
        }
      }
    } catch (error) {
      console.error("❌ Error loading research from ControlsPanel:", error);
      // You could show a toast notification here
    }
  };

  const handleDeleteResearch = async (researchId: string) => {
    if (window.confirm("Are you sure you want to delete this research item?")) {
      try {
        setDeletingId(researchId);
        await deleteResearch(researchId);
      } catch (error) {
        console.error("Error deleting research:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleClearAllHistory = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear all research history? This cannot be undone."
      )
    ) {
      try {
        await clearAll();
        onClearAll?.();
      } catch (error) {
        console.error("Error clearing research history:", error);
      }
    }
  };

  // Export all research history
  const handleExportAllHistory = () => {
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      researchHistory: researchHistory,
      metadata: {
        appVersion: "TimeCapsule Research",
        format: "research-history-collection",
        description: "Complete research history export",
        count: researchHistory.length,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `timecapsule-research-history-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import research history
  const handleImportHistory = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsImporting(true);
      try {
        const text = await file.text();
        const importData = JSON.parse(text);

        // Validate import data structure
        if (!importData.version) {
          throw new Error("Invalid file format: missing version");
        }

        let importedItems = [];

        // Handle different import formats
        if (
          importData.researchHistory &&
          Array.isArray(importData.researchHistory)
        ) {
          // Full history export
          importedItems = importData.researchHistory;
        } else if (importData.research) {
          // Single research item export
          importedItems = [importData.research];
        } else {
          throw new Error("Invalid file format: no research data found");
        }

        // Import each item
        let successCount = 0;
        for (const item of importedItems) {
          try {
            await addResearch({
              title: item.title,
              type: item.type,
              timestamp: item.timestamp || item.createdAt || Date.now(),
              status: item.status || "completed",
              wordCount: item.wordCount || 0,
              duration: item.duration,
              researchConfig: item.researchConfig || {
                type: "unknown",
                depth: "normal",
                enableRAG: false,
                enableWebSearch: false,
              },
              originalPrompt: item.originalPrompt || item.title,
              researchContext: item.researchContext,
              agentTasks: item.agentTasks || [],
              steps: item.steps || [],
              finalOutput: item.finalOutput,
              sourcesCount: item.sourcesCount,
              chunksProcessed: item.chunksProcessed,
              version: item.version || "1.0",
            });
            successCount++;
          } catch (itemError) {
            console.error("Failed to import item:", item.title, itemError);
          }
        }

        alert(
          `Successfully imported ${successCount} of ${importedItems.length} research items`
        );
        refreshHistory();
      } catch (error) {
        console.error("Import error:", error);
        alert(
          `Failed to import research history: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  // Export individual research item
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-full flex flex-col overflow-scroll">
      <ScrollArea className="flex-1 h-full">
        <div className="p-4 space-y-4">
          <Button
            variant="default"
            size="sm"
            onClick={onStartNewChat}
            className="w-full"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Start New Research
          </Button>
          {/* AI Connection Status */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                {connectionState.connected ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-destructive" />
                )}
                AI Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {connectionState.connected ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-medium text-xs text-foreground">
                      {connectionState.selectedModel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Server:</span>
                    <span className="font-medium text-xs truncate max-w-24 text-foreground">
                      {connectionState.baseURL}
                    </span>
                  </div>
                  {connectionState.lastConnected && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Connected:</span>
                      <span className="font-medium text-xs text-foreground">
                        {new Date(
                          connectionState.lastConnected
                        ).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
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
                    {connectionState.isAutoReconnecting
                      ? "Auto-reconnecting to Ollama..."
                      : connectionState.connecting
                        ? "Connecting to Ollama..."
                        : "Connect to Ollama to start researching"}
                  </p>
                  {connectionState.error && (
                    <p className="text-xs text-destructive">
                      {connectionState.error}
                    </p>
                  )}
                  <Button
                    onClick={onConnectAI}
                    className="w-full"
                    disabled={
                      connectionState.connecting ||
                      connectionState.isAutoReconnecting
                    }
                  >
                    {connectionState.isAutoReconnecting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Auto-reconnecting...
                      </>
                    ) : connectionState.connecting ? (
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
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                <Database className="w-4 h-4" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Documents</div>
                  <div className="font-medium text-foreground">
                    {documentStatus.count}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-medium text-foreground">
                    {formatFileSize(documentStatus.totalSize)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Chunks</div>
                  <div className="font-medium text-foreground">
                    {documentStatus.totalChunks}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Vectors</div>
                  <div className="font-medium text-foreground">
                    {documentStatus.totalVectors}
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

          {/* Research History */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2 text-card-foreground">
                  <Clock className="w-4 h-4" />
                  Research History
                  {historyLoading && (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleImportHistory}
                    disabled={historyLoading || isImporting}
                    className="h-6 w-6 p-0"
                    title="Import Research History"
                  >
                    {isImporting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Upload className="w-3 h-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleExportAllHistory}
                    disabled={historyLoading || researchHistory.length === 0}
                    className="h-6 w-6 p-0"
                    title="Export All History"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={refreshHistory}
                    disabled={historyLoading}
                    className="h-6 w-6 p-0"
                    title="Refresh History"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
                      Loading history...
                    </span>
                  </div>
                </div>
              ) : researchHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No research history yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Complete your first research to see it here
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {researchHistory.map((research) => (
                    <div
                      key={research.id}
                      className="group p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer bg-card"
                      onClick={() => handleLoadResearch(research.id)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-medium leading-tight line-clamp-2 text-foreground flex-1">
                          {research.title}
                        </h4>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLoadResearch(research.id);
                            }}
                            title="Load Research"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportSingleResearch(research);
                            }}
                            title="Export Research"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteResearch(research.id);
                            }}
                            disabled={deletingId === research.id}
                            title="Delete Research"
                          >
                            {deletingId === research.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Trash2 className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-border bg-secondary text-secondary-foreground capitalize"
                          >
                            {research.type.replace("-", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {research.wordCount?.toLocaleString() || 0} words
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(research.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t border-border bg-card">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportAllHistory}
              disabled={researchHistory.length === 0}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-1" />
              Export History
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportHistory}
              disabled={isImporting}
              className="flex-1"
            >
              {isImporting ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-1" />
              )}
              Import
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAllHistory}
            className="w-full text-destructive hover:text-destructive"
          >
            Clear All History
          </Button>
        </div>
      </div>
    </div>
  );
}
