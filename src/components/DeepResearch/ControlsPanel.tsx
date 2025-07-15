"use client";

import { useState } from "react";
import {
  AIProvider,
  AIStatus,
  ResearchType,
  ResearchDepth,
} from "./DeepResearchApp";
import { DocumentData } from "../VectorStore/VectorStore";
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
import { KnowledgeBaseSection } from "@/components/ui/knowledge-base-section";
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
  Paperclip,
  X,
  Search,
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
  onDisconnectAI: () => void;
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
  documents?: DocumentData[];
  onDocumentsChange?: (documents: DocumentData[]) => void;
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
  onDisconnectAI,
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
  documents = [],
  onDocumentsChange,
}: ControlsPanelProps) {
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [attachedDocuments, setAttachedDocuments] = useState<DocumentData[]>([]);
  const [showDocumentSelector, setShowDocumentSelector] = useState(false);
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");

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
      case "research":
        return "🔬";
      default:
        return "🔬";
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

  const handleAttachDocument = (document: DocumentData) => {
    if (!attachedDocuments.find(doc => doc.id === document.id)) {
      const newAttachedDocuments = [...attachedDocuments, document];
      setAttachedDocuments(newAttachedDocuments);
      onDocumentsChange?.(newAttachedDocuments);
    }
    setShowDocumentSelector(false);
  };

  const handleDetachDocument = (documentId: string) => {
    const newAttachedDocuments = attachedDocuments.filter(doc => doc.id !== documentId);
    setAttachedDocuments(newAttachedDocuments);
    onDocumentsChange?.(newAttachedDocuments);
  };

  const getUserDocuments = () => {
    // Filter to only show user-uploaded documents, exclude system-generated content
    // Use the same logic as categorizeDocuments in DeepResearchApp for consistency
    return documents.filter(doc => {
      // Exclude Agent Logs
      if (doc.title.toLowerCase().includes('agent log') || 
          doc.metadata.source === 'research_state') {
        return false;
      }
      
      // Exclude AI Frames
      if (doc.metadata.source === 'ai-frames' || 
          doc.title.toLowerCase().includes('ai-frame')) {
        return false;
      }
      
      // Exclude System & Metadata (TimeCapsules, BubblSpace, etc.)
      if (doc.metadata.source === 'timecapsule_export' ||
          doc.metadata.source === 'timecapsule_import' ||
          doc.metadata.source === 'aiframes_import' ||
          doc.metadata.source === 'aiframes_combined' ||
          doc.title.toLowerCase().includes('timecapsule') ||
          doc.metadata.isGenerated === true) {
        return false;
      }
      
      // Include everything else as user documents (uploads, Firecrawl, etc.)
      // This matches the logic in DeepResearchApp.categorizeDocuments()
      return true;
    });
  };

  const getFilteredDocuments = () => {
    const userDocs = getUserDocuments();
    if (!documentSearchQuery.trim()) {
      return userDocs;
    }
    return userDocs.filter(doc => 
      doc.title.toLowerCase().includes(documentSearchQuery.toLowerCase()) ||
      doc.metadata.description?.toLowerCase().includes(documentSearchQuery.toLowerCase())
    );
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
                    <SelectItem value="lmstudio" disabled>
                      <div className="flex items-center gap-2 opacity-50">
                        <span>🏠</span>
                        <span>LM Studio (Coming Soon)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="openai" disabled>
                      <div className="flex items-center gap-2 opacity-50">
                        <span>🤖</span>
                        <span>OpenAI (Coming Soon)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="local" disabled>
                      <div className="flex items-center gap-2 opacity-50">
                        <span>💻</span>
                        <span>Local Qwen (Coming Soon)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {aiStatus.connected ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Connected ({aiStatus.model})
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {getAIProviderIcon(aiStatus.provider)} {aiStatus.provider}
                    </Badge>
                  </div>
                  <Button
                    onClick={onDisconnectAI}
                    disabled={isGenerating}
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <WifiOff className="h-4 w-4 mr-2" />
                    Disconnect AI
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onConnectAI}
                  disabled={isGenerating}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Wifi className="h-4 w-4 mr-2" />
                  Connect AI
                </Button>
              )}


            </CardContent>
          </Card>

          {/* Knowledge Base */}
          <KnowledgeBaseSection
            documentStatus={documentStatus}
            onUploadDocuments={onUploadDocuments}
            onManageKnowledge={onManageKnowledge}
            onScrapeUrl={onScrapeUrl}
            onUploadRepository={onUploadRepository}
            onExportTimeCapsule={onExportTimeCapsule}
            onLoadTimeCapsule={onLoadTimeCapsule}
            showTimeCapsuleActions={true}
          />

          {/* Actions - Moved to top for better visibility */}
          <Card className="shadow-sm border-blue-200 dark:border-blue-800">
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
                    <SelectItem value="research">
                      <div className="flex items-center gap-2">
                        <span>🔬</span>
                        <span>Deep Research</span>
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

          {/* Research-Specific Controls */}
          {researchType === "research" && (
            <Card className="shadow-sm border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-purple-700 dark:text-purple-300">
                  <span>🎓</span>
                  Learning Research Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="conversation-input">Conversation or Content to Analyze</Label>
                  <Textarea
                    id="conversation-input"
                    placeholder="Paste your conversation, chat transcript, or technical discussion here. The system will analyze it to extract learning goals and create a structured curriculum.

Example:
User: I want to convert my ONNX model to PyTorch but I'm not sure about the file format differences
Assistant: ONNX and PyTorch use different serialization formats..."
                    rows={8}
                    className="resize-none text-sm"
                  />
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    💡 Tip: Include both questions and context for better learning analysis
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="learning-focus">Learning Focus (Optional)</Label>
                  <Input
                    id="learning-focus"
                    placeholder="e.g., Machine Learning, Web Development, Data Science"
                    className="text-sm"
                  />
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Specify the domain if not clear from the conversation
                  </div>
                </div>

                {/* Document Attachment Section */}
                <div className="space-y-2">
                  <Label>Reference Documents (Optional)</Label>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDocumentSelector(true)}
                      className="w-full"
                      disabled={getUserDocuments().length === 0}
                    >
                      <Paperclip className="h-4 w-4 mr-2" />
                      {getUserDocuments().length === 0 
                        ? "No user documents available" 
                        : `Attach User Documents (${getUserDocuments().length} available)`}
                    </Button>
                    
                    {attachedDocuments.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Attached documents ({attachedDocuments.length}):
                        </div>
                        <div className="space-y-1">
                          {attachedDocuments.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded border"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {doc.title}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                  {doc.metadata.filetype} • {formatFileSize(doc.metadata.filesize)}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDetachDocument(doc.id)}
                                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                              >
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    💡 Attach your uploaded documents (PDFs, text files, code) to enhance learning content with specific examples
                    <br />
                    🔒 Only user documents are available - system content (AI frames, logs) automatically excluded
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <div className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                    🎯 What Learning Research Will Do:
                  </div>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Extract learning goals from conversations</li>
                    <li>• Assess user expertise level automatically</li>
                    <li>• Create structured curriculum with modules</li>
                    <li>• Generate step-by-step tutorials</li>
                    <li>• Include exercises and progress tracking</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Topic Management */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                {researchType === "research" ? "Research Topics" : "Add Topic"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {researchType === "research" ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                    📝 For Deep Research:
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 space-y-2">
                    <p>
                      Paste your conversation, query, or content in the 
                      <strong> Research Input</strong> section above. The system will:
                    </p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Automatically analyze your intent and goals</li>
                      <li>Create relevant research topics</li>
                      <li>Assess complexity and scope</li>
                      <li>Generate appropriate specialized content</li>
                    </ul>
                    <p className="mt-2 font-medium">
                      Or manually add topics below if you prefer traditional research approach.
                    </p>
                  </div>
                </div>
              ) : null}
              
              <div className="space-y-2">
                <Label htmlFor="topic-title">Title</Label>
                <Input
                  id="topic-title"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder={
                    researchType === "research" 
                      ? "e.g., ONNX to PyTorch Conversion" 
                      : "Enter topic title..."
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleAddTopic()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic-description">Description</Label>
                <Textarea
                  id="topic-description"
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                  placeholder={
                    researchType === "research"
                      ? "User wants to convert ONNX model to PyTorch but unclear about file format differences"
                      : "Enter topic description..."
                  }
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
        </div>
      </ScrollArea>

      {/* Document Selection Modal */}
      {showDocumentSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Select User Documents to Attach</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Only user-uploaded documents are shown. System-generated content (AI frames, agent logs) are excluded.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDocumentSelector(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search user documents..."
                    value={documentSearchQuery}
                    onChange={(e) => setDocumentSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {getFilteredDocuments().length > 0 ? (
                <div className="space-y-2">
                  {getFilteredDocuments().map((doc) => {
                    const isAttached = attachedDocuments.find(attached => attached.id === doc.id);
                    return (
                      <div
                        key={doc.id}
                        className={`p-3 rounded border cursor-pointer transition-colors ${
                          isAttached 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        onClick={() => !isAttached && handleAttachDocument(doc)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium truncate">
                                {doc.title}
                              </div>
                              {isAttached && (
                                <Badge variant="secondary" className="text-xs">
                                  Attached
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {doc.metadata.filetype} • {formatFileSize(doc.metadata.filesize)} • 
                              Added: {new Date(doc.metadata.uploadedAt).toLocaleDateString()}
                            </div>
                            {doc.metadata.description && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                                {doc.metadata.description}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {isAttached ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDetachDocument(doc.id);
                                }}
                                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                              >
                                <X className="h-4 w-4 text-red-600" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAttachDocument(doc);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Paperclip className="h-4 w-4 text-blue-600" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {documentSearchQuery 
                      ? `No user documents found matching "${documentSearchQuery}"` 
                      : "No user documents available for attachment"}
                  </p>
                  <p className="text-sm mt-2">
                    Upload your own documents (PDFs, text files, etc.) to the Knowledge Base to attach them to learning research.
                  </p>
                  <p className="text-xs mt-2 text-slate-500 dark:text-slate-500">
                    System-generated content like AI frames and agent logs are automatically excluded from learning attachments.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {attachedDocuments.length} document{attachedDocuments.length !== 1 ? 's' : ''} attached
                </div>
                <Button
                  onClick={() => setShowDocumentSelector(false)}
                  variant="default"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
