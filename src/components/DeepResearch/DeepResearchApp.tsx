"use client";

import { useState } from "react";
import { useVectorStore } from "../providers/VectorStoreProvider";
import { usePageAnalytics } from "../analytics/Analytics";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ControlsPanel } from "./ControlsPanel";
import { ResearchOutput } from "./ResearchOutput";
import { StatusBar } from "./StatusBar";
import { useResearch } from "./hooks/useResearch";
import { useDocuments } from "./hooks/useDocuments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VectorStoreInitModal from "../VectorStoreInitModal";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Settings,
  CheckCircle2,
  Loader2,
  Upload,
  FileText,
  Trash2,
  X,
} from "lucide-react";

export function DeepResearchComponent() {
  // Initialize page analytics for fine-grained tracking
  const pageAnalytics = usePageAnalytics(
    "DeepResearch-TimeCapsule",
    "research"
  );

  // Get VectorStore from provider
  const {
    vectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    error: vectorStoreError,
    processingAvailable,
    processingStatus,
    downloadProgress,
    stats: vectorStoreStats,
  } = useVectorStore();

  // Custom hooks for state management
  const research = useResearch(vectorStore);
  const documents = useDocuments(vectorStore);

  // Local state for modals and UI
  const [currentTab, setCurrentTab] = useState<
    "research" | "sources" | "notes"
  >("research");
  const [showOllamaModal, setShowOllamaModal] = useState(false);
  const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434");
  const [isConnecting, setIsConnecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // File upload handler
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      await documents.handleFileUpload(files);
      event.target.value = ""; // Reset input
    }
  };

  // AI Connection handlers
  const handleConnectAI = async () => {
    setShowOllamaModal(true);
  };

  const handleOllamaConnect = async () => {
    setIsConnecting(true);
    setStatusMessage("Connecting to Ollama...");

    try {
      await research.connectAI();
      setShowOllamaModal(false);
      setStatusMessage("Successfully connected to AI");
    } catch (error) {
      setStatusMessage(
        "Failed to connect to AI. Please check your Ollama installation."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  // Export handlers
  const handleExportResults = () => {
    if (!research.results) return;

    const blob = new Blob([research.results], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    research.clearResults();
    setStatusMessage("Workspace cleared");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Vector Store Initialization Modal */}
      {!vectorStoreInitialized && !vectorStoreInitializing && (
        <VectorStoreInitModal isOpen={true} />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Controls Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <div className="h-full border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
              <div className="border-b border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Deep Research
                  </h1>
                </div>
              </div>

              <ScrollArea className="h-[calc(100%-73px)]">
                <ControlsPanel
                  prompt={research.prompt}
                  onPromptChange={research.setPrompt}
                  researchConfig={research.researchConfig}
                  onResearchConfigChange={research.setResearchConfig}
                  onGenerateResearch={research.generateResearch}
                  isGenerating={research.isGenerating}
                  aiConnected={research.aiStatus.connected}
                  aiProvider={research.aiStatus.provider}
                  aiModel={research.aiStatus.model || null}
                  onConnectAI={handleConnectAI}
                  onDisconnectAI={research.disconnectAI}
                  documentStatus={documents.documentStatus}
                  onManageDocuments={() =>
                    documents.setShowDocumentManager(true)
                  }
                  onUploadDocuments={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  isUploading={documents.isUploading}
                  onClearAll={handleClearAll}
                  onExportResults={handleExportResults}
                />
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Research Output */}
          <ResizablePanel defaultSize={75}>
            <ResearchOutput
              researchResults={research.results}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              onClearOutput={research.clearResults}
              onExportResults={handleExportResults}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <StatusBar
        message={statusMessage}
        isGenerating={research.isGenerating}
        aiConnected={research.aiStatus.connected}
      />

      {/* Hidden File Input */}
      <input
        type="file"
        id="file-upload"
        multiple
        accept=".pdf,.txt,.md,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Ollama Connection Modal */}
      <Dialog open={showOllamaModal} onOpenChange={setShowOllamaModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Connect to Ollama
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ollama-url">Ollama URL</Label>
              <Input
                id="ollama-url"
                value={ollamaUrl}
                onChange={(e) => setOllamaUrl(e.target.value)}
                placeholder="http://localhost:11434"
                disabled={isConnecting}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowOllamaModal(false)}
                disabled={isConnecting}
              >
                Cancel
              </Button>
              <Button onClick={handleOllamaConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4 mr-2" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Manager Modal */}
      <Dialog
        open={documents.showDocumentManager}
        onOpenChange={documents.setShowDocumentManager}
      >
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Manager
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Documents:</span>
                  <span className="font-medium ml-1">
                    {documents.documentStatus.count}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Size:</span>
                  <span className="font-medium ml-1">
                    {formatFileSize(documents.documentStatus.totalSize)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={documents.isUploading}
                className="space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Files</span>
              </Button>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {documents.documents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No documents uploaded yet</p>
                    <p className="text-sm">
                      Upload files to build your knowledge base
                    </p>
                  </div>
                ) : (
                  documents.documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {doc.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {doc.metadata.filetype} •{" "}
                              {formatFileSize(doc.metadata.filesize)}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => documents.deleteDocument(doc.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vector Store Loading */}
      {vectorStoreInitializing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">
                Initializing Research Engine
              </div>
              <div className="text-sm text-muted-foreground">
                Setting up vector store and AI capabilities...
              </div>
            </div>

            {downloadProgress &&
              typeof downloadProgress === "object" &&
              "progress" in downloadProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Downloading AI models...</span>
                    <span>
                      {Math.round((downloadProgress as any).progress)}%
                    </span>
                  </div>
                  <Progress value={(downloadProgress as any).progress} />
                </div>
              )}

            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
