"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KnowledgeBaseSection } from "@/components/ui/knowledge-base-section";
import { ResearchPrompt } from "./components/ResearchPrompt";
import { ResearchTypeSelector } from "./components/ResearchTypeSelector";
import { ResearchType, ResearchConfig } from "./hooks/useResearch";
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
} from "lucide-react";

interface ControlsPanelProps {
  // Research state
  prompt: string;
  onPromptChange: (prompt: string) => void;
  researchConfig: ResearchConfig;
  onResearchConfigChange: (config: ResearchConfig) => void;
  onGenerateResearch: () => void;
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

export function ControlsPanel({
  prompt,
  onPromptChange,
  researchConfig,
  onResearchConfigChange,
  onGenerateResearch,
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

  const handleResearchTypeChange = (type: ResearchType) => {
    onResearchConfigChange({
      ...researchConfig,
      type,
    });
  };

  const handleDepthChange = (depth: "quick" | "detailed" | "comprehensive") => {
    onResearchConfigChange({
      ...researchConfig,
      depth,
    });
  };

  return (
    <div className="space-y-4 p-4">
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
                <span className="font-medium">
                  {connectionState.selectedModel}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Server:</span>
                <span className="font-medium text-xs">
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
                <p className="text-xs text-red-600">{connectionState.error}</p>
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

      {/* Research Prompt */}
      <ResearchPrompt
        prompt={prompt}
        onPromptChange={onPromptChange}
        onGenerate={onGenerateResearch}
        isGenerating={isGenerating}
        disabled={!connectionState.connected}
      />

      {/* Research Type Selector */}
      <ResearchTypeSelector
        selectedType={researchConfig.type}
        onTypeChange={handleResearchTypeChange}
        disabled={!connectionState.connected || isGenerating}
      />

      {/* Research Depth */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Research Depth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "quick" as const, label: "Quick", desc: "Key points" },
              {
                value: "detailed" as const,
                label: "Detailed",
                desc: "Full analysis",
              },
              {
                value: "comprehensive" as const,
                label: "Deep",
                desc: "Exhaustive",
              },
            ].map((depth) => (
              <Button
                key={depth.value}
                variant={
                  researchConfig.depth === depth.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleDepthChange(depth.value)}
                disabled={!connectionState.connected || isGenerating}
                className="h-auto p-2 flex-col"
              >
                <div className="font-medium text-xs">{depth.label}</div>
                <div className="text-xs opacity-70">{depth.desc}</div>
              </Button>
            ))}
          </div>
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

      <Separator />

      {/* Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportResults}
          className="w-full"
        >
          Export Results
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="w-full text-destructive hover:text-destructive"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
