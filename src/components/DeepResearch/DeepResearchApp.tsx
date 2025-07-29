"use client";

import { useState, useEffect } from "react";
import { useVectorStore } from "../providers/VectorStoreProvider";
import { usePageAnalytics } from "../analytics/Analytics";
import { ControlsPanel } from "./ControlsPanel";
import { ResearchOutput } from "./ResearchOutput";
import { StatusBar } from "./StatusBar";
import { OllamaConnectionModal } from "./components/OllamaConnectionModal";
import { useResearch } from "./hooks/useResearch";
import { useDocuments } from "./hooks/useDocuments";
import { getFirecrawlService } from "@/lib/FirecrawlService";
import VectorStoreInitModal from "../VectorStoreInitModal";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Settings,
  Loader2,
  Upload,
  FileText,
  Trash2,
  ChevronDown,
  ChevronRight,
  Hash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Web Search State
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [firecrawlApiKey, setFirecrawlApiKey] = useState("");
  const [webSearchStatus, setWebSearchStatus] = useState({
    configured: false,
    lastSearch: null as Date | null,
    searchCount: 0,
  });

  // Initialize Firecrawl service and load saved API key
  useEffect(() => {
    const savedApiKey = localStorage.getItem("firecrawl_api_key");
    if (savedApiKey) {
      setFirecrawlApiKey(savedApiKey);
      setWebSearchStatus((prev) => ({ ...prev, configured: true }));
    }
  }, []);

  // Update Firecrawl service when API key changes
  useEffect(() => {
    if (firecrawlApiKey) {
      const firecrawlService = getFirecrawlService();
      firecrawlService.setApiKey(firecrawlApiKey);
      setWebSearchStatus((prev) => ({ ...prev, configured: true }));
    } else {
      setWebSearchStatus((prev) => ({ ...prev, configured: false }));
    }
  }, [firecrawlApiKey]);

  // RAG integration
  const handleRAGSearch = async (query: string) => {
    return await research.performRAGSearch(query);
  };

  // Web Search integration
  const handleWebSearch = async (query: string) => {
    if (!webSearchEnabled || !webSearchStatus.configured) return null;

    const result = await research.performWebSearch(query);
    if (result) {
      setWebSearchStatus((prev) => ({
        ...prev,
        lastSearch: new Date(),
        searchCount: prev.searchCount + 1,
      }));
    }
    return result;
  };

  // Local state for modals and UI
  const [showOllamaModal, setShowOllamaModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Document Manager State - Enhanced for chunk display
  const [expandedChunks, setExpandedChunks] = useState<Set<string>>(new Set());
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set()
  );

  // Document Manager handlers - Enhanced for chunk display
  const toggleDocumentExpansion = (docId: string) => {
    setExpandedDocuments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(docId)) {
        newSet.delete(docId);
      } else {
        newSet.add(docId);
      }
      return newSet;
    });
  };

  const toggleChunkExpansion = (chunkId: string) => {
    setExpandedChunks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chunkId)) {
        newSet.delete(chunkId);
      } else {
        newSet.add(chunkId);
      }
      return newSet;
    });
  };

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

  // Web Search handlers
  const handleWebSearchToggle = (enabled: boolean) => {
    setWebSearchEnabled(enabled);
    // Also update the research config to ensure the hook respects the toggle
    research.setResearchConfig({
      ...research.researchConfig,
      includeWebSearch: enabled,
    });
  };

  // RAG handlers
  const handleRAGToggle = (enabled: boolean) => {
    research.setResearchConfig({
      ...research.researchConfig,
      includeRAG: enabled,
    });
  };

  const handleFirecrawlApiKeyChange = (apiKey: string) => {
    setFirecrawlApiKey(apiKey);
    if (apiKey) {
      localStorage.setItem("firecrawl_api_key", apiKey);
    } else {
      localStorage.removeItem("firecrawl_api_key");
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
    <div className="h-full bg-background flex flex-col">
      {/* Vector Store Initialization Modal */}
      {!vectorStoreInitialized && !vectorStoreInitializing && (
        <VectorStoreInitModal isOpen={true} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Controls Panel */}
        <div className="w-96 border-r border-border bg-card flex flex-col">
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
            onManageDocuments={() => documents.setShowDocumentManager(true)}
            onUploadDocuments={() =>
              document.getElementById("file-upload")?.click()
            }
            isUploading={documents.isUploading}
            onClearAll={handleClearAll}
            onExportResults={handleExportResults}
          />
        </div>

        {/* Main Content Area - Research Output */}
        <div className="flex-1 flex flex-col">
          <ResearchOutput
            researchResults={research.results}
            thinkingOutput={research.thinkingOutput}
            isStreaming={research.isStreaming}
            onClearOutput={research.clearResults}
            onExportResults={handleExportResults}
            onUpdateResults={research.updateResults}
            prompt={research.prompt}
            onPromptChange={research.setPrompt}
            researchConfig={research.researchConfig}
            onResearchConfigChange={research.setResearchConfig}
            onGenerateResearchStream={research.generateResearchStream}
            onGenerateResearchWithContext={research.generateResearchWithContext}
            isGenerating={research.isGenerating}
            connectionState={research.connectionState}
            onConnectAI={handleConnectAI}
            // RAG Integration
            enableRAG={research.researchConfig.includeRAG}
            onRAGSearch={handleRAGSearch}
            onRAGToggle={handleRAGToggle}
            // Web Search Integration
            webSearchEnabled={webSearchEnabled}
            onWebSearch={handleWebSearch}
            onWebSearchToggle={handleWebSearchToggle}
            webSearchStatus={webSearchStatus}
          />
        </div>
      </div>

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

      {/* Document Manager Modal - Enhanced with Chunk Display */}
      {documents.showDocumentManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-6xl m-4 max-h-[90vh]">
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
                    <div>
                      <span className="text-muted-foreground">
                        Total Chunks:
                      </span>
                      <span className="font-medium ml-1">
                        {documents.documentStatus.totalChunks}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Total Vectors:
                      </span>
                      <span className="font-medium ml-1">
                        {documents.documentStatus.totalVectors}
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

                <ScrollArea className="h-[60vh]">
                  <div className="space-y-3">
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
                        <Card key={doc.id} className="border-border">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {/* Document Header with toggle */}
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate text-foreground">
                                    {doc.title}
                                  </div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                                    <span>{doc.metadata.filetype}</span>
                                    <span>•</span>
                                    <span>
                                      {formatFileSize(doc.metadata.filesize)}
                                    </span>
                                    <span>•</span>
                                    <span>
                                      {doc.chunks?.length || 0} chunks
                                    </span>
                                    <span>•</span>
                                    <span>
                                      {doc.vectors?.length || 0} vectors
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      toggleDocumentExpansion(doc.id)
                                    }
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    {expandedDocuments.has(doc.id) ? (
                                      <ChevronDown className="w-4 h-4" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      documents.deleteDocument(doc.id)
                                    }
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Document Metadata */}
                              <div className="text-xs text-muted-foreground">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <span className="font-medium">
                                      Uploaded:
                                    </span>{" "}
                                    {new Date(
                                      doc.metadata.uploadedAt
                                    ).toLocaleDateString()}
                                  </div>
                                  <div>
                                    <span className="font-medium">Source:</span>{" "}
                                    {doc.metadata.source || "unknown"}
                                  </div>
                                </div>
                              </div>

                              {/* Chunks Section - Expandable */}
                              {expandedDocuments.has(doc.id) && doc.chunks && (
                                <div className="border-t pt-3 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                      <Hash className="w-3 h-3" />
                                      Document Chunks ({doc.chunks.length})
                                    </h4>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {doc.vectors?.length || 0} embeddings
                                    </Badge>
                                  </div>
                                  <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {doc.chunks.map((chunk, index) => {
                                      const vector = doc.vectors?.find(
                                        (v) => v.chunkId === chunk.id
                                      );
                                      const isChunkExpanded =
                                        expandedChunks.has(chunk.id);
                                      return (
                                        <div
                                          key={chunk.id}
                                          className="border border-border rounded-lg p-3 bg-muted/30"
                                        >
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              <Badge
                                                variant="secondary"
                                                className="text-xs"
                                              >
                                                Chunk {index + 1}
                                              </Badge>
                                              <span className="text-xs text-muted-foreground">
                                                {chunk.content.length} chars
                                              </span>
                                              {vector && (
                                                <span className="text-xs text-muted-foreground">
                                                  • {vector.embedding.length}{" "}
                                                  dims
                                                </span>
                                              )}
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() =>
                                                toggleChunkExpansion(chunk.id)
                                              }
                                              className="h-6 w-6 p-0"
                                            >
                                              {isChunkExpanded ? (
                                                <ChevronDown className="w-3 h-3" />
                                              ) : (
                                                <ChevronRight className="w-3 h-3" />
                                              )}
                                            </Button>
                                          </div>
                                          {isChunkExpanded && (
                                            <div className="space-y-2">
                                              <div className="text-xs text-muted-foreground">
                                                <span className="font-medium">
                                                  Position:
                                                </span>{" "}
                                                {chunk.startIndex} -{" "}
                                                {chunk.endIndex}
                                              </div>
                                              <div className="bg-background border rounded p-2 text-sm max-h-32 overflow-y-auto">
                                                <div className="text-xs leading-relaxed whitespace-pre-wrap">
                                                  {chunk.content.length > 500
                                                    ? `${chunk.content.substring(0, 500).replace(/\s+/g, " ").trim()}...`
                                                    : chunk.content
                                                        .replace(/\s+/g, " ")
                                                        .trim()}
                                                </div>
                                              </div>
                                              {vector && (
                                                <div className="text-xs text-muted-foreground">
                                                  <span className="font-medium">
                                                    Vector Preview:
                                                  </span>{" "}
                                                  [
                                                  {vector.embedding
                                                    .slice(0, 5)
                                                    .map(
                                                      (v, i) =>
                                                        `${v.toFixed(3)}${i < 4 ? ", " : ""}`
                                                    )}
                                                  ...] (
                                                  {vector.embedding.length}{" "}
                                                  dimensions)
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
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

      {/* Status Bar */}
      <StatusBar
        message={statusMessage}
        isGenerating={research.isGenerating}
        aiConnected={research.connectionState.connected}
      />
    </div>
  );
}
