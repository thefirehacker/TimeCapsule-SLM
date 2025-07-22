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
import { OllamaConnectionModal } from "./components/OllamaConnectionModal";
import { useResearch } from "./hooks/useResearch";
import { useDocuments } from "./hooks/useDocuments";
import VectorStoreInitModal from "../VectorStoreInitModal";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Settings, Loader2, Upload, FileText, Trash2 } from "lucide-react";

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

  const handleOllamaConnect = async (
    baseURL: string,
    model: string
  ): Promise<boolean> => {
    setStatusMessage("Connecting to Ollama...");

    try {
      const success = await research.connectAI(baseURL, model);
      if (success) {
        setStatusMessage(`Successfully connected to ${model}`);
        setTimeout(() => setStatusMessage(""), 3000);
        return true;
      } else {
        setStatusMessage("Failed to connect to Ollama");
        return false;
      }
    } catch (error) {
      setStatusMessage("Connection failed");
      return false;
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
    setTimeout(() => setStatusMessage(""), 2000);
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
      <div className="flex-1 ">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Controls Panel */}
          <ResizablePanel defaultSize={50} minSize={30} maxSize={80}>
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
                  onGenerateResearchStream={research.generateResearchStream}
                  isGenerating={research.isGenerating}
                  connectionState={research.connectionState}
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
              thinkingOutput={research.thinkingOutput}
              isStreaming={research.isStreaming}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              onClearOutput={research.clearResults}
              onExportResults={handleExportResults}
              onUpdateResults={research.updateResults}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Status Bar */}
      <StatusBar
        message={statusMessage}
        isGenerating={research.isGenerating}
        aiConnected={research.connectionState.connected}
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
      <OllamaConnectionModal
        open={showOllamaModal}
        onOpenChange={setShowOllamaModal}
        onConnect={handleOllamaConnect}
        onTestConnection={research.testConnection}
        connectionState={research.connectionState}
      />

      {/* Document Manager Modal - existing implementation */}
      {documents.showDocumentManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl m-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Manager
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => documents.setShowDocumentManager(false)}
                >
                  ×
                </Button>
              </div>

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
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
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
            </CardContent>
          </Card>
        </div>
      )}

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
