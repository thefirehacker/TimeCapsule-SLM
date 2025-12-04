"use client";

import { useState, useEffect } from "react";
import { useVectorStore } from "../providers/VectorStoreProvider";
import { usePageAnalytics } from "../analytics/Analytics";
import { ControlsPanel } from "./ControlsPanel";
import { ResearchOutput } from "./ResearchOutput";
import { StatusBar } from "./StatusBar";
import { OllamaConnectionModal } from "./components/OllamaConnectionModal";
import { ResearchSteps } from "./components/ResearchSteps";
import { FullScreenResearchModal } from "./components/FullScreenResearchModal";
import { useResearch } from "./hooks/useResearch";
import { useDocuments } from "./hooks/useDocuments";
import { useResearchHistory } from "./hooks/useResearchHistory";
import { useResearchNavigation } from "@/hooks/useResearchNavigation";
import { ResearchHistoryViewer } from "./components/ResearchHistoryViewer";
import { ResearchProvider } from "@/contexts/ResearchContext";
import { getUnifiedWebSearchService } from "@/lib/UnifiedWebSearchService";
import { getEmbeddingService } from "@/lib/EmbeddingService";
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
  Bot,
  Package,
  Globe,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { KnowledgeBaseManager } from "@/components/shared/KnowledgeBaseManager";

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
  const researchHistory = useResearchHistory();
  const researchNavigation = useResearchNavigation();

  // Debug navigation state
  useEffect(() => {
    console.log("🔍 Navigation State Changed in DeepResearchApp:", {
      currentView: researchNavigation.currentView,
      hasLoadedSession: !!researchNavigation.loadedResearchSession,
      sessionTitle: researchNavigation.loadedResearchSession?.item.title,
      loadedAt: researchNavigation.loadedResearchSession?.loadedAt,
      isLoading: researchNavigation.isLoading,
      error: researchNavigation.error,
    });
  }, [
    researchNavigation.currentView,
    researchNavigation.loadedResearchSession,
    researchNavigation.isLoading,
    researchNavigation.error,
  ]);

  // Full-screen modal state
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);

  // Xenova loading state
  const [xenovaStatus, setXenovaStatus] = useState<
    "uninitialized" | "initializing" | "ready" | "error"
  >("uninitialized");
  const [showModal, setShowModal] = useState(false);

  // Create current research session for the modal
  const currentResearchSession =
    research.researchSteps.length > 0
      ? {
          id: `current_${Date.now()}`,
          query: research.prompt || "Current Research",
          timestamp: Date.now(),
          steps: research.researchSteps,
          status: research.isGenerating
            ? ("active" as const)
            : ("completed" as const),
          resultCount: research.researchSteps.length,
        }
      : null;

  // Web Search State
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [firecrawlApiKey, setFirecrawlApiKey] = useState("");
  const [webSearchStatus, setWebSearchStatus] = useState({
    configured: false,
    lastSearch: null as Date | null,
    searchCount: 0,
  });

  // Initialize web search status based on available providers
  useEffect(() => {
    const unifiedService = getUnifiedWebSearchService();
    const availableProviders = unifiedService.getAvailableProviders();

    // Configure web search if at least one provider is available
    if (availableProviders.duckduckgo || availableProviders.firecrawl) {
      setWebSearchStatus((prev) => ({ ...prev, configured: true }));
    }
  }, []);

  // Initialize unified web search service and load saved API key
  useEffect(() => {
    const savedApiKey = localStorage.getItem("firecrawl_api_key");
    if (savedApiKey) {
      setFirecrawlApiKey(savedApiKey);
      setWebSearchStatus((prev) => ({ ...prev, configured: true }));
    }
  }, []);

  // Update unified web search service when API key changes
  useEffect(() => {
    const unifiedService = getUnifiedWebSearchService();
    const sanitizedKey = firecrawlApiKey?.trim() || null;
    unifiedService.configureFirecrawl(sanitizedKey);

    setWebSearchStatus((prev) => ({
      ...prev,
      configured: Boolean(sanitizedKey),
    }));
  }, [firecrawlApiKey]);

  // Monitor Xenova status and show modal accordingly
  useEffect(() => {
    const embeddingService = getEmbeddingService();
    const currentStatus = embeddingService.status;

    // Update local state
    setXenovaStatus(currentStatus);

    // Show modal only if Xenova is actively initializing or if VectorStore is initializing
    if (currentStatus === "initializing" || vectorStoreInitializing) {
      setShowModal(true);
    } else if (currentStatus === "ready" && showModal) {
      // Auto-close modal after 2 seconds when Xenova becomes ready
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } else if (currentStatus === "error") {
      // Keep modal open for errors
      setShowModal(true);
    } else if (currentStatus === "ready" && !vectorStoreInitializing) {
      // If Xenova is ready and VectorStore is not initializing, ensure modal is closed
      setShowModal(false);
    }
  }, [vectorStoreInitializing, vectorStoreInitialized, showModal]);

  // Check Xenova status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const embeddingService = getEmbeddingService();
      const currentStatus = embeddingService.status;
      setXenovaStatus(currentStatus);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-close modal when Xenova becomes ready
  useEffect(() => {
    if (xenovaStatus === "ready" && showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [xenovaStatus, showModal]);

  // Initial check - show modal only if Xenova is initializing (not ready and not from cache)
  useEffect(() => {
    const embeddingService = getEmbeddingService();
    const currentStatus = embeddingService.status;
    setXenovaStatus(currentStatus);

    // Only show modal if Xenova is actively initializing (not ready from cache)
    if (currentStatus === "initializing") {
      setShowModal(true);
    }
  }, []); // Only run on mount

  // RAG search integration
  const handleRAGSearch = async (query: string) => {
    return await research.performRAGSearch(query);
  };

  // Web Search integration
  const handleWebSearch = async (query: string) => {
    if (!webSearchEnabled) return null;

    const unifiedService = getUnifiedWebSearchService();
    const availableProviders = unifiedService.getAvailableProviders();

    // Enable web search if at least one provider is available
    if (
      !webSearchStatus.configured &&
      (availableProviders.duckduckgo || availableProviders.firecrawl)
    ) {
      setWebSearchStatus((prev) => ({ ...prev, configured: true }));
    }

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

  // Document Manager State - Now handled by KnowledgeBaseManager component

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

  // Ensure web search states stay synchronized
  useEffect(() => {
    if (webSearchEnabled !== research.researchConfig.includeWebSearch) {
      research.setResearchConfig({
        ...research.researchConfig,
        includeWebSearch: webSearchEnabled,
      });
    }
  }, [webSearchEnabled, research.researchConfig.includeWebSearch, research]);

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

  const handleStartNewChat = () => {
    research.clearResults();
    research.setPrompt("");
    researchNavigation.clearLoadedSession();
    setStatusMessage("New chat started");
    setTimeout(() => setStatusMessage(""), 2000);
  };

  const handleLoadResearch = async (researchId: string): Promise<boolean> => {
    console.log("🔄 Loading research from DeepResearchApp:", researchId);
    // Use the navigation hook to load the research session
    return await researchNavigation.loadResearchSession(researchId);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Tab configuration for DeepResearch Knowledge Base Manager
  const deepResearchTabConfigs = [
    {
      id: "userdocs",
      label: "User Docs",
      icon: FileText,
      filter: (doc: any) =>
        doc.metadata.documentType === "userdocs" ||
        (!doc.metadata.documentType && doc.metadata.source === "upload"),
    },
    {
      id: "virtual-docs",
      label: "Virtual Docs",
      icon: Globe,
      filter: (doc: any) =>
        doc.metadata.documentType === "virtual-docs" ||
        (!doc.metadata.documentType && doc.metadata.source === "websearch"),
    },
    {
      id: "ai-frames",
      label: "AI Frames",
      icon: Bot,
      filter: (doc: any) =>
        doc.metadata.documentType === "ai-frames" ||
        (!doc.metadata.documentType &&
          (doc.metadata.isGenerated || doc.metadata.source === "generated")),
    },
    {
      id: "timecapsule",
      label: "TimeCapsule",
      icon: Clock,
      filter: (doc: any) =>
        doc.metadata.documentType === "timecapsule" ||
        (!doc.metadata.documentType &&
          doc.metadata.source === "timecapsule_import"),
    },
    {
      id: "bubblspace",
      label: "BubblSpace",
      icon: MessageSquare,
      filter: (doc: any) =>
        doc.metadata.documentType === "bubblspace" ||
        (!doc.metadata.documentType && doc.metadata.bubblSpaceId),
    },
  ];

  return (
    <ResearchProvider
      onResearchStored={(researchId) => {
        console.log("📚 Research stored in history:", researchId);
        // Optionally refresh history or show notification
      }}
    >
      <div className="h-full bg-background flex flex-col">
        {/* Vector Store Initialization Modal */}
        {showModal && (
          <VectorStoreInitModal
            isOpen={true}
            status={
              vectorStoreError
                ? "error"
                : xenovaStatus === "ready"
                  ? "ready"
                  : xenovaStatus === "initializing"
                    ? "initializing"
                    : "loading"
            }
            progress={downloadProgress}
            message={
              vectorStoreError ||
              (xenovaStatus === "ready"
                ? "Knowledge Base is ready!"
                : xenovaStatus === "initializing"
                  ? "Loading Xenova AI models..."
                  : "Initializing secure Knowledge Base...")
            }
            onClose={() => {
              setShowModal(false);
            }}
          />
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
              onStartNewChat={handleStartNewChat}
              onLoadResearch={handleLoadResearch}
            />
          </div>

          {/* Main Chat Interface - Full Width */}
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              {/* Show loaded research history or current research */}
              {(() => {
                console.log("🎯 Conditional Render Check:", {
                  hasLoadedSession: !!researchNavigation.loadedResearchSession,
                  sessionData: researchNavigation.loadedResearchSession,
                });
                return researchNavigation.loadedResearchSession ? (
                  <ResearchHistoryViewer
                    researchItem={researchNavigation.loadedResearchSession.item}
                    onBack={() => {
                      researchNavigation.clearLoadedSession();
                      researchNavigation.showCurrentResearch();
                    }}
                    className="p-8"
                  />
                ) : (
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
                    onGenerateResearchWithContext={
                      research.generateResearchWithContext
                    }
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
                    onWebSearchConfigure={handleFirecrawlApiKeyChange}
                    // Intelligent Research Integration
                    onPerformIntelligentResearch={
                      research.performIntelligentResearch
                    }
                    isIntelligentResearching={research.isIntelligentResearching}
                    researchResult={research.researchResult}
                    // Research Steps Integration - indicate if steps are active
                    researchSteps={research.researchSteps}
                    expandedSteps={research.expandedSteps}
                    onStepClick={research.handleStepClick}
                    // Agent Rerun Integration
                    onRerunAgent={research.rerunSpecificAgent}
                    // Research Control Integration
                    onStopResearch={research.stopResearch}
                  />
                );
              })()}
            </div>
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
                  {/* Common Knowledge Base Manager Component */}
                  <KnowledgeBaseManager
                    documents={documents.documents}
                    documentStatus={documents.documentStatus}
                    onDeleteDocument={documents.deleteDocument}
                    onUploadDocuments={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    isUploading={documents.isUploading}
                    showUploadButton={true}
                    tabConfigs={deepResearchTabConfigs}
                    title="Document Manager"
                    description="Manage your research documents organized by type and source."
                    uploadJobs={documents.uploadJobs}
                    onDismissUploadJob={documents.dismissUploadJob}
                  />
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

        {/* Full-Screen Research Modal */}
        <FullScreenResearchModal
          isOpen={isFullScreenModalOpen}
          onClose={() => setIsFullScreenModalOpen(false)}
          currentSession={currentResearchSession}
          sessions={researchHistory.sessions}
          expandedSteps={research.expandedSteps}
          onStepClick={research.handleStepClick}
          onSessionSwitch={(sessionId) => {
            researchHistory.switchToSession(sessionId);
            // TODO: Load session steps into current research view
          }}
        />

        {/* Status Bar */}
        <StatusBar
          message={statusMessage}
          isGenerating={research.isGenerating}
          aiConnected={research.connectionState.connected}
        />
      </div>
    </ResearchProvider>
  );
}
