"use client";

import { useState } from "react";
import {
  AIProvider,
  AIStatus,
  ResearchType,
  ResearchDepth,
} from "./DeepResearchApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Bot,
  Settings,
  Database,
  FileText,
  Plus,
  Rocket,
  Download,
  Upload,
  Trash2,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface ControlsPanelProps {
  aiStatus: AIStatus;
  setAIStatus: (status: AIStatus) => void;
  researchType: ResearchType;
  setResearchType: (type: ResearchType) => void;
  researchDepth: ResearchDepth;
  setResearchDepth: (depth: ResearchDepth) => void;
  onAddTopic: (title: string, description: string) => void;
  onConnectAI: () => void;
  onGenerateResearch: () => void;
  onClearAll: () => void;
  onManageKnowledge: () => void;
  onUploadDocuments: () => void;
  onScrapeUrl: () => void;
  onUploadRepository: () => void;
  onExportResults: () => void;
  onExportTimeCapsule: () => void;
  onLoadTimeCapsule: () => void;
  isGenerating: boolean;
  documentStatus: {
    count: number;
    totalSize: number;
    vectorCount: number;
  };
}

export function ControlsPanel({
  aiStatus,
  setAIStatus,
  researchType,
  setResearchType,
  researchDepth,
  setResearchDepth,
  onAddTopic,
  onConnectAI,
  onGenerateResearch,
  onClearAll,
  onManageKnowledge,
  onUploadDocuments,
  onScrapeUrl,
  onUploadRepository,
  onExportResults,
  onExportTimeCapsule,
  onLoadTimeCapsule,
  isGenerating,
  documentStatus,
}: ControlsPanelProps) {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const handleAddTopic = () => {
    if (topicTitle.trim()) {
      onAddTopic(topicTitle, topicDescription);
      setTopicTitle("");
      setTopicDescription("");
    }
  };

  const handleProviderChange = (provider: string) => {
    setAIStatus({
      ...aiStatus,
      provider: provider as AIProvider,
      connected: false,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAIProviderIcon = (provider: AIProvider) => {
    switch (provider) {
      case "ollama":
        return "🦙";
      case "lmstudio":
        return "🏠";
      case "openai":
        return "🤖";
      case "local":
        return "💻";
      default:
        return "🤖";
    }
  };

  const getResearchTypeIcon = (type: ResearchType) => {
    switch (type) {
      case "academic":
        return "📚";
      case "market":
        return "📈";
      case "technology":
        return "⚙️";
      case "competitive":
        return "🏆";
      case "trend":
        return "📊";
      case "literature":
        return "📖";
      default:
        return "📚";
    }
  };

  const getResearchDepthIcon = (depth: ResearchDepth) => {
    switch (depth) {
      case "overview":
        return "👁️";
      case "detailed":
        return "🔍";
      case "comprehensive":
        return "📋";
      default:
        return "👁️";
    }
  };

  return (
    <div className="h-full  dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Controls
            </h2>
          </div>

          {/* AI Configuration */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="h-4 w-4" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-provider">AI Provider</Label>
                <Select
                  value={aiStatus.provider}
                  onValueChange={handleProviderChange}
                >
                  <SelectTrigger id="ai-provider">
                    <SelectValue placeholder="Select AI provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ollama">
                      <div className="flex items-center gap-2">
                        <span>🦙</span>
                        <span>Ollama</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="lmstudio">
                      <div className="flex items-center gap-2">
                        <span>🏠</span>
                        <span>LM Studio</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="openai">
                      <div className="flex items-center gap-2">
                        <span>🤖</span>
                        <span>OpenAI</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="local">
                      <div className="flex items-center gap-2">
                        <span>💻</span>
                        <span>Local Qwen</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={onConnectAI}
                disabled={isGenerating}
                className={`w-full ${
                  aiStatus.connected
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {aiStatus.connected ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Connected ({aiStatus.model})
                  </>
                ) : (
                  <>
                    <Wifi className="h-4 w-4 mr-2" />
                    Connect AI
                  </>
                )}
              </Button>

              {aiStatus.connected && (
                <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Online
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {getAIProviderIcon(aiStatus.provider)} {aiStatus.provider}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Research Configuration */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-4 w-4" />
                Research Config
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="research-type">Research Type</Label>
                <Select
                  value={researchType}
                  onValueChange={(value) =>
                    setResearchType(value as ResearchType)
                  }
                >
                  <SelectTrigger id="research-type">
                    <SelectValue placeholder="Select research type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">
                      <div className="flex items-center gap-2">
                        <span>📚</span>
                        <span>Academic</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="market">
                      <div className="flex items-center gap-2">
                        <span>📈</span>
                        <span>Market</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="technology">
                      <div className="flex items-center gap-2">
                        <span>⚙️</span>
                        <span>Technology</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="competitive">
                      <div className="flex items-center gap-2">
                        <span>🏆</span>
                        <span>Competitive</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="trend">
                      <div className="flex items-center gap-2">
                        <span>📊</span>
                        <span>Trend</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="literature">
                      <div className="flex items-center gap-2">
                        <span>📖</span>
                        <span>Literature</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="research-depth">Research Depth</Label>
                <Select
                  value={researchDepth}
                  onValueChange={(value) =>
                    setResearchDepth(value as ResearchDepth)
                  }
                >
                  <SelectTrigger id="research-depth">
                    <SelectValue placeholder="Select research depth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">
                      <div className="flex items-center gap-2">
                        <span>👁️</span>
                        <span>Overview</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="detailed">
                      <div className="flex items-center gap-2">
                        <span>🔍</span>
                        <span>Detailed</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="comprehensive">
                      <div className="flex items-center gap-2">
                        <span>📋</span>
                        <span>Comprehensive</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Topic Management */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Add Topic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic-title">Title</Label>
                <Input
                  id="topic-title"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="Enter topic title..."
                  onKeyPress={(e) => e.key === "Enter" && handleAddTopic()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic-description">Description</Label>
                <Textarea
                  id="topic-description"
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                  placeholder="Enter topic description..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleAddTopic}
                disabled={!topicTitle.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Topic
              </Button>
            </CardContent>
          </Card>

          {/* Knowledge Base */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <HardDrive className="h-4 w-4" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={onUploadDocuments} variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
                <Button onClick={onManageKnowledge} variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </div>
              
              <Button 
                onClick={onScrapeUrl} 
                variant="outline" 
                size="sm"
                className="w-full text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300"
              >
                <span className="mr-2">🔍</span>
                Scrape URL with Firecrawl
              </Button>

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
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Rocket className="h-4 w-4" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={onGenerateResearch}
                disabled={isGenerating || !aiStatus.connected}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Generate Research
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={onExportResults} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button
                  onClick={onClearAll}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* TimeCapsule */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <HardDrive className="h-4 w-4" />
                TimeCapsule
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
