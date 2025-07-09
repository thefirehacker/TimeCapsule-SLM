"use client";

import { useState, useEffect, useRef } from "react";
import { VectorStore, DocumentData } from "../VectorStore/VectorStore";
import {
  AIAssistant,
  AIStatus as AIConnectionStatus,
} from "../../lib/AIAssistant";
import { analytics } from "../../lib/analytics";
import { usePageAnalytics } from "../analytics/Analytics";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ControlsPanel } from "./ControlsPanel";
import { StructureBuilder } from "./StructureBuilder";
import { ResearchOutput } from "./ResearchOutput";
import { StatusBar } from "./StatusBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Wifi,
  WifiOff,
  Bot,
  Server,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Trash2,
  Search,
  Eye,
  X,
} from "lucide-react";

export type AIProvider = "ollama" | "lmstudio" | "openai" | "local";
export type ResearchType =
  | "academic"
  | "market"
  | "technology"
  | "competitive"
  | "trend"
  | "literature";
export type ResearchDepth = "overview" | "detailed" | "comprehensive";
export type AIStatus = AIConnectionStatus;

export interface Topic {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}

export interface ResearchMetadata {
  id: string;
  title: string;
  type: ResearchType;
  depth: ResearchDepth;
  topics: string[];
  generatedAt: string;
  aiProvider: string;
  model: string;
  documentIntegration: boolean;
}

export interface ResearchItem {
  content: string;
  metadata: ResearchMetadata;
  timestamp: string;
}

export class DeepResearchApp {
  topics: Topic[] = [];
  researchResults: Record<string, string | ResearchItem | ResearchMetadata> =
    {};
  currentTab: "research" | "sources" | "notes" = "research";
  aiAssistant: AIAssistant | null = null;
  isGenerating = false;
  vectorStore: VectorStore | null = null;
  documentModalOpen = false;
  eventListenersSetup = false;
  isUploading = false;
  isVectorStoreLoading = true;

  // Modal states
  showOllamaConnectionModal = false;
  showModelSelectionModal = false;
  availableModels: any[] = [];
  selectedOllamaURL = "http://localhost:11434";

  // React state setters (will be set in the hook)
  setTopics: ((topics: Topic[]) => void) | null = null;
  setAIStatus: ((status: AIConnectionStatus) => void) | null = null;
  setResearchType: ((type: ResearchType) => void) | null = null;
  setResearchDepth: ((depth: ResearchDepth) => void) | null = null;
  setResearchResults: ((results: string) => void) | null = null;
  setCurrentTab: ((tab: "research" | "sources" | "notes") => void) | null =
    null;
  setStatusMessage: ((message: string) => void) | null = null;
  setIsGenerating: ((generating: boolean) => void) | null = null;
  setDocuments: ((docs: DocumentData[]) => void) | null = null;
  setDocumentStatus:
    | ((status: {
        count: number;
        totalSize: number;
        vectorCount: number;
      }) => void)
    | null = null;
  setShowDocumentManager: ((show: boolean) => void) | null = null;
  setShowOllamaConnectionModal: ((show: boolean) => void) | null = null;
  setShowModelSelectionModal: ((show: boolean) => void) | null = null;
  setAvailableModels: ((models: any[]) => void) | null = null;
  setSelectedOllamaURL: ((url: string) => void) | null = null;
  setIsVectorStoreLoading: ((loading: boolean) => void) | null = null;
  setIsProcessingDocuments: ((processing: boolean) => void) | null = null;
  setProcessingProgress:
    | ((
        progress: {
          currentFile: string;
          progress: number;
          message: string;
          fileIndex: number;
          totalFiles: number;
        } | null
      ) => void)
    | null = null;

  constructor() {
    // Make this instance globally available - only in browser
    if (typeof window !== "undefined") {
      (window as any).deepResearchApp = this;
    }
    console.log("🚀 DeepResearchApp constructor called");
  }

  async init() {
    console.log("🚀 DeepResearchApp.init() called");

    // Load basic data first (topics, research results) - this is fast
    this.loadBasicDataFromStorage();

    // Initialize AI Assistant - this is fast
    this.initializeAIAssistant();

    // Load AI connection state - this is fast
    setTimeout(() => {
      this.loadAIConnectionFromStorage();
    }, 100);

    // Show UI immediately with ready status
    this.updateStatus("✅ DeepResearch ready - Document features loading...");
    console.log("✅ DeepResearchApp basic initialization complete - UI ready");

    // Initialize Vector Store asynchronously in background (non-blocking)
    this.initializeVectorStoreAsync();
  }

  private async initializeVectorStoreAsync() {
    try {
      console.log("📊 Starting background VectorStore initialization...");
      this.updateStatus("📊 Loading document processing capabilities...");
      this.isVectorStoreLoading = true;
      this.setIsVectorStoreLoading?.(true);

      // Check if there's already a shared VectorStore instance (only in browser)
      if (
        typeof window !== "undefined" &&
        (window as any).sharedVectorStore &&
        (window as any).sharedVectorStore.initialized
      ) {
        console.log("🔗 Using existing shared VectorStore instance");
        this.vectorStore = (window as any).sharedVectorStore;
        this.updateStatus("✅ Document processing ready");
        this.updateDocumentStatus();
        this.isVectorStoreLoading = false;
        this.setIsVectorStoreLoading?.(false);
        return;
      }

      // Create new VectorStore instance (this downloads embeddings)
      console.log(
        "🆕 Creating new VectorStore instance - downloading embeddings..."
      );
      this.updateStatus(
        "⬇️ Downloading AI embeddings model (first time only)..."
      );

      this.vectorStore = new VectorStore();
      await this.vectorStore.init();

      // Make it available globally (only in browser)
      if (typeof window !== "undefined") {
        (window as any).sharedVectorStore = this.vectorStore;
      }

      console.log("✅ VectorStore background initialization complete");
      this.updateStatus(
        "✅ Document processing ready - Upload documents to enhance research"
      );
      this.updateDocumentStatus();
      this.isVectorStoreLoading = false;
      this.setIsVectorStoreLoading?.(false);
    } catch (error) {
      console.error("❌ VectorStore background initialization failed:", error);
      this.updateStatus(
        "⚠️ Document processing unavailable - Research still works without documents"
      );
      this.vectorStore = null;
      this.isVectorStoreLoading = false;
      this.setIsVectorStoreLoading?.(false);
      // Don't block the app - continue without vector store
    }
  }

  // Legacy method - now non-blocking
  async initializeVectorStore() {
    // Just call the async version and don't await it
    this.initializeVectorStoreAsync();
  }

  initializeAIAssistant() {
    console.log("🤖 Initializing AI Assistant...");
    this.aiAssistant = new AIAssistant();

    // Set up status change callback
    this.aiAssistant.setStatusChangeCallback((status) => {
      console.log("🔄 AI Status changed:", status);
      this.setAIStatus?.(status);

      if (status.connected) {
        this.updateStatus(
          `✅ Connected to ${status.provider}${
            status.model ? ` (${status.model})` : ""
          }`
        );
        // Save connection state when successfully connected
        this.saveToStorage();
      } else {
        this.updateStatus(
          `❌ AI connection failed: ${status.error || "Unknown error"}`
        );
        // Also save state when disconnected to persist the disconnection
        this.saveToStorage();
      }
    });

    console.log("✅ AI Assistant initialized");
  }

  addTopic(title: string, description: string) {
    const newTopic: Topic = {
      id: `topic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      selected: false,
    };

    this.topics.push(newTopic);
    this.setTopics?.(this.topics);
    this.saveToStorage();

    // Track topic addition with enhanced analytics
    analytics.trackTopicManagement("add_topic", this.topics.length);
    
    const pageAnalytics = (this as any).pageAnalytics;
    if (pageAnalytics) {
      pageAnalytics.trackFeatureUsage('topic_added', {
        topic_title: title,
        topic_description_length: description.length,
        total_topics: this.topics.length
      });
    }
  }

  deleteTopic(topicId: string) {
    this.topics = this.topics.filter((t) => t.id !== topicId);
    this.setTopics?.(this.topics);
    this.saveToStorage();

    // Track topic deletion with enhanced analytics
    analytics.trackTopicManagement("delete_topic", this.topics.length);
    
    const pageAnalytics = (this as any).pageAnalytics;
    if (pageAnalytics) {
      pageAnalytics.trackFeatureUsage('topic_deleted', {
        topic_id: topicId,
        remaining_topics: this.topics.length
      });
    }
  }

  selectTopic(topicId: string) {
    const topic = this.topics.find(t => t.id === topicId);
    const wasSelected = topic?.selected || false;
    
    this.topics = this.topics.map((t) => ({
      ...t,
      selected: t.id === topicId ? !t.selected : t.selected,
    }));
    this.setTopics?.(this.topics);
    this.saveToStorage();
    
    // Track topic selection with enhanced analytics
    const pageAnalytics = (this as any).pageAnalytics;
    if (pageAnalytics) {
      const selectedCount = this.topics.filter(t => t.selected).length;
      pageAnalytics.trackFeatureUsage('topic_selected', {
        topic_id: topicId,
        topic_title: topic?.title || 'unknown',
        action: wasSelected ? 'deselected' : 'selected',
        total_selected: selectedCount,
        total_topics: this.topics.length
      });
    }
  }

  moveTopic(topicId: string, direction: "up" | "down") {
    const index = this.topics.findIndex((t) => t.id === topicId);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= this.topics.length) return;

    const newTopics = [...this.topics];
    [newTopics[index], newTopics[newIndex]] = [
      newTopics[newIndex],
      newTopics[index],
    ];

    this.topics = newTopics;
    this.setTopics?.(this.topics);
    this.saveToStorage();
  }

  async connectAI() {
    this.updateStatus("🔄 Starting AI connection...");

    // Check if already connected
    if (this.aiAssistant?.isConnected()) {
      this.updateStatus("✅ AI is already connected");
      return;
    }

    // Show Ollama connection modal
    this.setShowOllamaConnectionModal?.(true);
  }

  async testOllamaConnection(url: string) {
    if (!this.aiAssistant) {
      this.updateStatus("❌ AI Assistant not initialized");
      return;
    }

    this.updateStatus("🔍 Testing Ollama connection...");

    try {
      const result = await this.aiAssistant.testOllamaConnection(url);

      if (result.success) {
        this.availableModels = result.models || [];
        this.setAvailableModels?.(this.availableModels);
        this.selectedOllamaURL = url;
        this.setSelectedOllamaURL?.(url);

        // Close connection modal and show model selection
        this.setShowOllamaConnectionModal?.(false);
        this.setShowModelSelectionModal?.(true);

        this.updateStatus(
          `✅ Found ${this.availableModels.length} available models`
        );
      } else {
        this.updateStatus(`❌ Connection failed: ${result.error}`);
      }
    } catch (error) {
      console.error("❌ Ollama connection test failed:", error);
      this.updateStatus(
        `❌ Connection test failed: ${(error as Error).message}`
      );
    }
  }

  async selectModel(modelName: string) {
    if (!this.aiAssistant) {
      this.updateStatus("❌ AI Assistant not initialized");
      return;
    }

    this.updateStatus(`🔄 Connecting to ${modelName}...`);

    try {
      const success = await this.aiAssistant.connectToOllama(
        this.selectedOllamaURL,
        modelName
      );

      if (success) {
        this.setShowModelSelectionModal?.(false);
        this.updateStatus(`✅ Connected to ${modelName} successfully`);
        // Save connection state to localStorage
        this.saveToStorage();

        // Track successful AI connection
        analytics.trackAIConnection("ollama", modelName, "connected");
      } else {
        this.updateStatus(`❌ Failed to connect to ${modelName}`);
        // Track failed AI connection
        analytics.trackAIConnection("ollama", modelName, "failed");
      }
    } catch (error) {
      console.error("❌ Model selection failed:", error);
      this.updateStatus(
        `❌ Model selection failed: ${(error as Error).message}`
      );
      // Track connection error
      analytics.trackAIConnection("ollama", modelName, "error");
    }
  }

  cancelConnection() {
    this.setShowOllamaConnectionModal?.(false);
    this.setShowModelSelectionModal?.(false);
    this.updateStatus("🔄 Connection cancelled");
  }

  disconnectAI() {
    if (this.aiAssistant && this.aiAssistant.isConnected()) {
      console.log("🔌 Disconnecting AI...");
      this.aiAssistant.disconnect();
      this.updateStatus("🔌 AI disconnected");
      // State will be saved automatically via the status change callback
    }
  }

  async generateResearch(
    researchType: ResearchType,
    researchDepth: ResearchDepth
  ) {
    if (this.isGenerating) return;

    const selectedTopics = this.topics.filter((t) => t.selected);
    if (selectedTopics.length === 0) {
      this.updateStatus("❌ Please select at least one research topic");
      return;
    }

    // Check if AI is connected
    if (!this.aiAssistant?.isConnected()) {
      this.updateStatus("❌ Please connect to AI first");
      return;
    }

    this.isGenerating = true;
    this.setIsGenerating?.(true);
    this.updateStatus("🔄 Generating research with AI...");

    // Track research generation start with enhanced analytics
    const aiSession = this.aiAssistant.getSession();
    const pageAnalytics = (this as any).pageAnalytics;
    
    if (pageAnalytics) {
      pageAnalytics.trackFeatureUsage('research_generation_started', {
        research_type: researchType,
        research_depth: researchDepth,
        ai_provider: aiSession?.provider || "unknown",
        ai_model: aiSession?.model || "unknown",
        selected_topics: selectedTopics.length,
        topic_titles: selectedTopics.map(t => t.title),
        has_vector_store: !!this.vectorStore,
        vector_store_ready: !this.isVectorStoreLoading
      });
    }
    
    analytics.trackResearchGeneration(
      researchType,
      researchDepth,
      aiSession?.provider || "unknown",
      selectedTopics.length
    );

    try {
      // Step 1: Perform RAG - Search for relevant documents
      let relevantDocuments: any[] = [];
      if (this.vectorStore && !this.isVectorStoreLoading) {
        this.updateStatus(
          "🔍 Searching knowledge base for relevant documents..."
        );
        relevantDocuments = await this.searchRelevantDocuments(selectedTopics);
      } else {
        console.log(
          "⚠️ VectorStore not ready, generating research without document context"
        );
        this.updateStatus(
          "🔍 Generating research (document search unavailable)..."
        );
      }

      // Step 2: Build research prompt with RAG context
      const researchPrompt = await this.buildResearchPrompt(
        selectedTopics,
        researchType,
        researchDepth,
        relevantDocuments
      );

      // Step 3: Generate research using AI with RAG context
      this.updateStatus("🤖 Generating comprehensive research report...");
      const rawContent = await this.aiAssistant.generateContent(
        researchPrompt,
        "research"
      );

      // Filter out <think> tags and any other unwanted content
      const researchContent = this.cleanResearchOutput(rawContent);

      // Step 4: Create research metadata
      const researchId = `research-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const researchMetadata = {
        id: researchId,
        title: `${
          researchType.charAt(0).toUpperCase() + researchType.slice(1)
        } Research: ${selectedTopics.map((t) => t.title).join(", ")}`,
        type: researchType,
        depth: researchDepth,
        topics: selectedTopics.map((t) => t.title),
        generatedAt: new Date().toISOString(),
        aiProvider: this.aiAssistant.getSession()?.provider || "unknown",
        model: this.aiAssistant.getSession()?.model || "unknown",
        documentIntegration: relevantDocuments.length > 0,
      };

      // Step 5: Save to vector store with research metadata
      if (this.vectorStore) {
        await this.vectorStore.addGeneratedDocument(
          researchMetadata.title,
          researchContent,
          // Progress callback for research document
          (progress) => {
            this.updateStatus(
              `💾 Saving research: ${progress.message} (${progress.progress}%)`
            );
          }
        );
        this.updateStatus("✅ Research saved to knowledge base");
        this.updateDocumentStatus();
      }

      // Step 6: Store research results with metadata for persistence
      this.researchResults[researchId] = {
        content: researchContent,
        metadata: researchMetadata,
        timestamp: new Date().toISOString(),
      } as ResearchItem;

      // Set current research as the most recent one
      this.researchResults["current"] = researchContent;
      this.researchResults["currentMetadata"] =
        researchMetadata as ResearchMetadata;

      // Update React state and save to storage
      this.setResearchResults?.(researchContent);
      this.saveToStorage();

      this.updateStatus("✅ Research generated and saved successfully");
      
      // Track successful research generation
      if (pageAnalytics) {
        pageAnalytics.trackFeatureUsage('research_generation_completed', {
          research_type: researchType,
          research_depth: researchDepth,
          ai_provider: aiSession?.provider || "unknown",
          ai_model: aiSession?.model || "unknown",
          content_length: researchContent.length,
          document_integration: relevantDocuments.length > 0,
          documents_found: relevantDocuments.length,
          topics_researched: selectedTopics.length
        });
      }
    } catch (error) {
      console.error("❌ Research generation failed:", error);
      this.updateStatus(
        "❌ Research generation failed: " + (error as Error).message
      );

      // Fall back to demo content on error
      const demoContent = this.generateDemoResearch(
        selectedTopics,
        researchType,
        researchDepth
      );
      const demoId = `demo-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const demoMetadata = {
        id: demoId,
        title: `Demo ${
          researchType.charAt(0).toUpperCase() + researchType.slice(1)
        } Research: ${selectedTopics.map((t) => t.title).join(", ")}`,
        type: researchType,
        depth: researchDepth,
        topics: selectedTopics.map((t) => t.title),
        generatedAt: new Date().toISOString(),
        aiProvider: "demo",
        model: "demo",
        documentIntegration: false,
      };

      // Store demo content with metadata
      this.researchResults[demoId] = {
        content: demoContent,
        metadata: demoMetadata,
        timestamp: new Date().toISOString(),
      } as ResearchItem;

      this.researchResults["current"] = demoContent;
      this.researchResults["currentMetadata"] =
        demoMetadata as ResearchMetadata;

      this.setResearchResults?.(demoContent);
      this.saveToStorage();

      this.updateStatus("⚠️ Using demo content - AI generation failed");
    } finally {
      this.isGenerating = false;
      this.setIsGenerating?.(false);
    }
  }

  // RAG Search for relevant documents
  private async searchRelevantDocuments(
    selectedTopics: Topic[]
  ): Promise<any[]> {
    if (!this.vectorStore) {
      console.log("⚠️ No vector store available for RAG search");
      return [];
    }

    const allResults: any[] = [];

    try {
      // Search for documents related to each topic
      for (const topic of selectedTopics) {
        const searchQuery = `${topic.title} ${topic.description}`;
        console.log(`🔍 RAG Search: "${searchQuery}"`);

        const results = await this.vectorStore.searchSimilar(
          searchQuery,
          0.1,
          10
        );
        console.log(
          `📊 Found ${results.length} relevant documents for "${topic.title}"`
        );

        // Add topic context to results
        results.forEach((result) => {
          (result as any).relatedTopic = topic.title;
        });

        allResults.push(...results);
      }

      // Remove duplicates and sort by similarity
      const uniqueResults = allResults.filter(
        (result, index, self) =>
          index ===
          self.findIndex(
            (r) =>
              r.document.id === result.document.id &&
              r.chunk.index === result.chunk.index
          )
      );

      const sortedResults = uniqueResults.sort(
        (a, b) => b.similarity - a.similarity
      );

      console.log(
        `📊 RAG Search Summary: ${sortedResults.length} unique relevant documents found`
      );
      return sortedResults.slice(0, 20); // Limit to top 20 results
    } catch (error) {
      console.error("❌ RAG search failed:", error);
      return [];
    }
  }

  private async buildResearchPrompt(
    selectedTopics: Topic[],
    type: ResearchType,
    depth: ResearchDepth,
    relevantDocuments: any[]
  ): Promise<string> {
    const topics = selectedTopics
      .map((t) => `${t.title}: ${t.description}`)
      .join("\n");

    let prompt = `You are a professional researcher. Generate a comprehensive ${depth} ${type} research report based on the provided topics and supporting documents.\n\n`;

    prompt += `## Research Topics:\n${topics}\n\n`;

    // Add RAG context if documents are available
    if (relevantDocuments.length > 0) {
      prompt += `## Supporting Documents & Evidence:\n`;
      prompt += `The following documents from the knowledge base are relevant to your research:\n\n`;

      relevantDocuments.forEach((result, index) => {
        const matchPercentage = (result.similarity * 100).toFixed(1);
        prompt += `### Document ${index + 1}: "${
          result.document.title
        }" (${matchPercentage}% match)\n`;
        prompt += `**Related to:** ${(result as any).relatedTopic}\n`;
        prompt += `**Content:** ${result.chunk.content.substring(0, 500)}${
          result.chunk.content.length > 500 ? "..." : ""
        }\n`;
        prompt += `**Source:** Document ID ${result.document.id}, Chunk ${
          result.chunk.index + 1
        }\n\n`;
      });

      prompt += `## Research Requirements:\n`;
      prompt += `- **IMPORTANT**: Use the provided documents as evidence and cite them in your report\n`;
      prompt += `- Include specific quotes from documents with citations (Document X, Y% match)\n`;
      prompt += `- Reference statistical data and metrics found in the documents\n`;
      prompt += `- Create a comprehensive analysis that connects document evidence to research topics\n`;
    } else {
      prompt += `## Research Requirements:\n`;
      prompt += `- **Note**: No supporting documents found in knowledge base - generate based on AI knowledge\n`;
    }

    prompt += `- Research Type: ${type}\n`;
    prompt += `- Research Depth: ${depth}\n`;
    prompt += `- Format: Professional markdown with proper headers and structure\n\n`;

    prompt += `## Required Report Structure:\n`;
    prompt += `1. **🎯 Executive Summary** - Key findings and primary insights\n`;
    prompt += `2. **📊 Individual Topic Analysis** - Detailed analysis per topic with:\n`;
    prompt += `   - Topic Background\n`;
    prompt += `   - Key Findings\n`;
    prompt += `   - Supporting Evidence (with citations if documents available)\n`;
    prompt += `   - Analysis and Implications\n`;
    prompt += `3. **🔗 Cross-Topic Insights & Connections** - How topics relate to each other\n`;
    prompt += `4. **📈 Key Findings & Evidence** - Statistical data, quotes, and concrete evidence\n`;
    prompt += `5. **💡 Implications & Impact Assessment** - What this means for the field\n`;
    prompt += `6. **🎯 Actionable Recommendations** - Specific next steps and recommendations\n`;
    prompt += `7. **📚 Source Integration Summary** - How documents informed the research\n\n`;

    if (depth === "overview") {
      prompt += `## Depth Guidelines:\n`;
      prompt += `- Keep sections concise with high-level insights\n`;
      prompt += `- Focus on 3-5 key points per topic\n`;
      prompt += `- Emphasize actionable takeaways\n`;
    } else if (depth === "detailed") {
      prompt += `## Depth Guidelines:\n`;
      prompt += `- Provide comprehensive analysis with supporting data\n`;
      prompt += `- Include market analysis, technology assessment, and competitive landscape\n`;
      prompt += `- Add specific metrics and quantitative insights\n`;
    } else {
      // comprehensive
      prompt += `## Depth Guidelines:\n`;
      prompt += `- Provide in-depth analysis with detailed methodology\n`;
      prompt += `- Include extensive findings, strategic recommendations, and next steps\n`;
      prompt += `- Add specific metrics, market sizing, and implementation timelines\n`;
      prompt += `- Cross-reference multiple sources and provide detailed evidence\n`;
    }

    prompt += `\n## Critical Output Requirements:\n`;
    prompt += `- **IMPORTANT**: Generate ONLY the final research report - NO thinking process, reasoning, or analysis tags\n`;
    prompt += `- **NO** <think>, <reasoning>, or <analysis> tags - output must be clean markdown only\n`;
    prompt += `- Start directly with the report title and content\n`;
    prompt += `- Use professional markdown formatting with proper headers, lists, and emphasis\n`;
    prompt += `- Make it comprehensive, evidence-based, and actionable\n`;

    if (relevantDocuments.length > 0) {
      prompt += `- Include document citations in format: (Document X, Y% match)\n`;
      prompt += `- Reference specific quotes and data from the provided documents\n`;
    }

    prompt += `\n## Example Output Structure:\n`;
    prompt += `# Research Report Title\n\n`;
    prompt += `## 🎯 Executive Summary\n[key findings]\n\n`;
    prompt += `## 📊 Individual Topic Analysis\n[detailed analysis per topic]\n\n`;
    prompt += `[... continue with remaining sections ...]\n\n`;
    prompt += `**Generate the report now in clean markdown format:**`;

    return prompt;
  }

  private cleanResearchOutput(rawContent: string): string {
    let cleanContent = rawContent;

    // Remove <think> tags and their content
    cleanContent = cleanContent.replace(/<think>[\s\S]*?<\/think>/gi, "");

    // Remove any other unwanted XML-like tags that might appear
    cleanContent = cleanContent.replace(/<\/?reasoning>/gi, "");
    cleanContent = cleanContent.replace(/<\/?analysis>/gi, "");

    // Clean up extra whitespace and newlines
    cleanContent = cleanContent.replace(/\n\s*\n\s*\n/g, "\n\n");
    cleanContent = cleanContent.trim();

    // Ensure proper markdown formatting
    cleanContent = this.improveMarkdownFormatting(cleanContent);

    return cleanContent;
  }

  private improveMarkdownFormatting(content: string): string {
    let formatted = content;

    // Ensure proper heading hierarchy
    formatted = formatted.replace(/^#{7,}/gm, "######"); // Max 6 levels

    // Ensure space after hash symbols in headings
    formatted = formatted.replace(/^(#+)([^\s#])/gm, "$1 $2");

    // Improve list formatting
    formatted = formatted.replace(/^(\s*)-([^\s])/gm, "$1- $2");
    formatted = formatted.replace(/^(\s*)\*([^\s])/gm, "$1* $2");
    formatted = formatted.replace(/^(\s*)\d+\.([^\s])/gm, "$1$&");

    // Ensure proper spacing around code blocks
    formatted = formatted.replace(/```/g, "\n```\n");
    formatted = formatted.replace(/\n\n```\n/g, "\n```\n");
    formatted = formatted.replace(/\n```\n\n/g, "\n```\n");

    // Improve table formatting if present
    formatted = formatted.replace(/\|([^|\n]*)\|/g, (match, content) => {
      return "| " + content.trim() + " |";
    });

    // Ensure consistent emphasis formatting
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "**$1**");
    formatted = formatted.replace(/\*([^*]+)\*/g, "*$1*");

    // Clean up multiple consecutive newlines
    formatted = formatted.replace(/\n{3,}/g, "\n\n");

    return formatted.trim();
  }

  private generateDemoResearch(
    selectedTopics: Topic[],
    type: ResearchType,
    depth: ResearchDepth
  ): string {
    const topics = selectedTopics.map((t) => t.title).join(", ");

    let content = `# ${
      type.charAt(0).toUpperCase() + type.slice(1)
    } Research Report\n\n`;
    content += `**Research Depth:** ${depth}\n`;
    content += `**Topics:** ${topics}\n`;
    content += `**Generated:** ${new Date().toLocaleDateString()}\n`;
    content += `**Note:** This is demo content - AI generation failed\n\n`;

    content += `## Executive Summary\n\n`;
    content += `This ${depth} ${type} research analysis covers ${topics}. `;

    if (depth === "overview") {
      content += `This overview provides key insights and high-level findings.\n\n`;
      content += `## Key Findings\n\n`;
      selectedTopics.forEach((topic, i) => {
        content += `### ${i + 1}. ${topic.title}\n\n`;
        content += `${topic.description}\n\n`;
        content += `**Key Points:**\n`;
        content += `- Market opportunity identified\n`;
        content += `- Technological feasibility confirmed\n`;
        content += `- Competitive landscape assessed\n\n`;
      });
    } else if (depth === "detailed") {
      content += `This detailed analysis provides comprehensive insights with supporting data.\n\n`;
      content += `## Detailed Analysis\n\n`;
      selectedTopics.forEach((topic, i) => {
        content += `### ${i + 1}. ${topic.title}\n\n`;
        content += `**Background:** ${topic.description}\n\n`;
        content += `**Market Analysis:**\n`;
        content += `- Market size: $X.X billion\n`;
        content += `- Growth rate: X% CAGR\n`;
        content += `- Key drivers: Innovation, demand, regulation\n\n`;
        content += `**Technology Assessment:**\n`;
        content += `- Maturity level: High\n`;
        content += `- Implementation complexity: Medium\n`;
        content += `- Required resources: Moderate\n\n`;
        content += `**Competitive Landscape:**\n`;
        content += `- Number of competitors: X-Y major players\n`;
        content += `- Market leader: Company ABC\n`;
        content += `- Differentiation opportunities: Innovation, cost, service\n\n`;
      });
    } else {
      // comprehensive
      content += `This comprehensive research provides in-depth analysis with detailed methodology and extensive findings.\n\n`;
      content += `## Methodology\n\n`;
      content += `- Literature review of 50+ sources\n`;
      content += `- Market data analysis\n`;
      content += `- Expert interviews\n`;
      content += `- Competitive intelligence\n\n`;
      content += `## Comprehensive Analysis\n\n`;
      selectedTopics.forEach((topic, i) => {
        content += `### ${i + 1}. ${topic.title}\n\n`;
        content += `**Executive Summary:** ${topic.description}\n\n`;
        content += `**Market Dynamics:**\n`;
        content += `- Total Addressable Market (TAM): $X.X billion\n`;
        content += `- Serviceable Addressable Market (SAM): $X.X billion\n`;
        content += `- Serviceable Obtainable Market (SOM): $X.X million\n`;
        content += `- Market growth drivers: Technology adoption, regulatory support\n`;
        content += `- Market constraints: Technical challenges, cost barriers\n\n`;
        content += `**Technology Deep Dive:**\n`;
        content += `- Current state: Mature/Emerging/Early stage\n`;
        content += `- Technical requirements: High performance computing, specialized algorithms\n`;
        content += `- Implementation timeline: 6-18 months\n`;
        content += `- Risk factors: Technical complexity, resource requirements\n\n`;
        content += `**Competitive Intelligence:**\n`;
        content += `- Market leaders: Company A (25%), Company B (20%), Company C (15%)\n`;
        content += `- Competitive advantages: Patent portfolio, market presence, technical expertise\n`;
        content += `- Competitive gaps: Cost optimization, user experience, integration capabilities\n\n`;
        content += `**Strategic Recommendations:**\n`;
        content += `- Investment priority: High/Medium/Low\n`;
        content += `- Recommended approach: Partnership, acquisition, internal development\n`;
        content += `- Success metrics: Revenue growth, market share, technical milestones\n\n`;
      });
    }

    content += `## Conclusion\n\n`;
    content += `Based on this ${depth} ${type} analysis, the research indicates significant opportunities in ${topics}. `;
    content += `Key recommendations include strategic investment, technology development, and market positioning initiatives.\n\n`;
    content += `## Next Steps\n\n`;
    content += `1. Detailed market entry strategy\n`;
    content += `2. Technical feasibility assessment\n`;
    content += `3. Partnership and collaboration opportunities\n`;
    content += `4. Investment and resource planning\n\n`;
    content += `---\n\n`;
    content += `*This research was generated by DeepResearch TimeCapsule (Demo Mode)*`;

    return content;
  }

  async handleFileUpload(files: FileList) {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not available");
      return;
    }

    if (this.isUploading) {
      this.updateStatus("⚠️ Upload already in progress");
      return;
    }

    // Track document upload start
    const pageAnalytics = (this as any).pageAnalytics;
    if (pageAnalytics) {
      const fileTypes = Array.from(files).map(f => f.type || 'unknown');
      const fileSizes = Array.from(files).map(f => f.size);
      const totalSize = fileSizes.reduce((sum, size) => sum + size, 0);
      
      pageAnalytics.trackFeatureUsage('document_upload_started', {
        file_count: files.length,
        file_types: fileTypes,
        total_size_bytes: totalSize,
        average_size_bytes: Math.round(totalSize / files.length),
        file_names: Array.from(files).map(f => f.name)
      });
    }

    this.isUploading = true;
    this.setIsProcessingDocuments?.(true);
    console.log(`📊 Processing ${files.length} documents...`);

    let successCount = 0;
    let failedCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(
          `📄 Processing file ${i + 1}/${files.length}: ${file.name}`
        );
        this.updateStatus(
          `📄 Processing ${file.name} (${i + 1}/${files.length})...`
        );

        // Update processing progress state for modal
        this.setProcessingProgress?.({
          currentFile: file.name,
          progress: 0,
          message: "Starting processing...",
          fileIndex: i + 1,
          totalFiles: files.length,
        });

        try {
          const content = await this.readFileContent(file);
          await this.vectorStore.addDocument(
            file,
            content,
            // Progress callback for each file
            (progress) => {
              this.updateStatus(
                `📄 ${file.name}: ${progress.message} (${progress.progress}%)`
              );

              // Update modal progress in real-time
              this.setProcessingProgress?.({
                currentFile: file.name,
                progress: progress.progress,
                message: progress.message,
                fileIndex: i + 1,
                totalFiles: files.length,
              });
            }
          );
          successCount++;
          console.log(`✅ Successfully processed: ${file.name}`);

          // Clear progress for this file
          this.setProcessingProgress?.({
            currentFile: file.name,
            progress: 100,
            message: "✅ Processing complete",
            fileIndex: i + 1,
            totalFiles: files.length,
          });

          // Brief pause to show completion
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (fileError) {
          console.error(`❌ Failed to process ${file.name}:`, fileError);
          failedCount++;
          this.updateStatus(
            `❌ Failed to process ${file.name}: ${(fileError as Error).message}`
          );

          // Show error in progress
          this.setProcessingProgress?.({
            currentFile: file.name,
            progress: 0,
            message: `❌ Error: ${(fileError as Error).message}`,
            fileIndex: i + 1,
            totalFiles: files.length,
          });

          // Continue processing other files instead of stopping
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Brief pause before next file
        }
      }

      if (successCount > 0) {
        this.updateStatus(
          `✅ Successfully uploaded ${successCount} file(s)${
            failedCount > 0 ? ` (${failedCount} failed)` : ""
          }`
        );
        this.updateDocumentStatus();

        // Track successful document uploads with enhanced analytics
        analytics.trackDocumentManagement("upload_documents", successCount);
        
        if (pageAnalytics) {
          pageAnalytics.trackFeatureUsage('document_upload_completed', {
            successful_files: successCount,
            failed_files: failedCount,
            total_files: files.length,
            success_rate: Math.round((successCount / files.length) * 100)
          });
        }
      } else {
        this.updateStatus(`❌ All uploads failed`);
        // Track failed uploads
        analytics.trackDocumentManagement("upload_failed", 0);
      }

      console.log(
        `📊 Upload process completed: ${successCount} successful, ${failedCount} failed`
      );
    } catch (error) {
      console.error("❌ Upload process failed:", error);
      this.updateStatus(
        "❌ Upload process failed: " + (error as Error).message
      );
    } finally {
      this.isUploading = false;
      this.setIsProcessingDocuments?.(false);
      this.setProcessingProgress?.(null);

      // Clear file input to allow re-uploading same files
      if (typeof document !== "undefined") {
        const fileInput = document.getElementById(
          "documentUpload"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
          console.log(`📄 File input cleared successfully`);
        }
      }

      console.log(`📄 Upload process completed, state reset`);
    }
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // Check file size to prevent freezing (following reference implementation)
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        reject(
          new Error(
            `File too large: ${file.name} (${this.formatFileSize(
              file.size
            )}). Please use files under 10MB.`
          )
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  async showDocumentManager() {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not initialized");
      return;
    }

    this.setShowDocumentManager?.(true);
    this.updateStatus("📚 Opening document manager...");

    // Track manage knowledge event
    try {
      const stats = await this.vectorStore.getStats();
      analytics.trackEvent("knowledge_management", {
        action: "manage_knowledge_opened",
        document_count: stats.documentCount,
        vector_count: stats.vectorCount,
        event_category: "knowledge",
        event_label: "manage_knowledge_opened",
      });
    } catch (error) {
      analytics.trackEvent("knowledge_management", {
        action: "manage_knowledge_opened",
        document_count: 0,
        vector_count: 0,
        event_category: "knowledge",
        event_label: "manage_knowledge_opened",
      });
    }
  }

  hideDocumentManager() {
    this.setShowDocumentManager?.(false);
  }

  async deleteDocument(docId: string) {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not available");
      return;
    }

    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await this.vectorStore.deleteDocument(docId);
        this.updateStatus("✅ Document deleted successfully");
        this.updateDocumentStatus();
      } catch (error) {
        console.error("Failed to delete document:", error);
        this.updateStatus(
          "❌ Failed to delete document: " + (error as Error).message
        );
      }
    }
  }

  async previewDocument(docId: string) {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not available");
      return null;
    }

    try {
      const document = await this.vectorStore.getDocument(docId);
      if (!document) {
        this.updateStatus("❌ Document not found");
        return null;
      }

      this.updateStatus("📄 Document preview loaded");
      return document;
    } catch (error) {
      console.error("Failed to preview document:", error);
      this.updateStatus(
        "❌ Failed to preview document: " + (error as Error).message
      );
      return null;
    }
  }

  async downloadDocument(docId: string) {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not available");
      return;
    }

    try {
      const document = await this.vectorStore.getDocument(docId);
      if (!document) {
        this.updateStatus("❌ Document not found");
        return;
      }

      const blob = new Blob([document.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = `${document.title}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      this.updateStatus("✅ Document downloaded successfully");
    } catch (error) {
      console.error("Failed to download document:", error);
      this.updateStatus(
        "❌ Failed to download document: " + (error as Error).message
      );
    }
  }

  async searchDocuments(
    query: string,
    threshold: number = 0.3,
    limit: number = 20
  ) {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not available");
      return [];
    }

    if (!query.trim()) {
      this.updateStatus("❌ Please enter a search query");
      return [];
    }

    try {
      this.updateStatus("🔍 Searching documents...");
      const results = await this.vectorStore.searchSimilar(
        query,
        threshold,
        limit
      );

      console.log(
        "🔍 VectorStore search completed with",
        results.length,
        "results"
      );

      if (results.length === 0) {
        this.updateStatus("❌ No documents found matching your query");
        analytics.trackSearch(query, 0, "knowledge_base");
        return [];
      }

      this.updateStatus(`✅ Found ${results.length} relevant results`);
      // Track successful search
      analytics.trackSearch(query, results.length, "knowledge_base");
      return results;
    } catch (error) {
      console.error("Search failed:", error);
      this.updateStatus("❌ Search failed: " + (error as Error).message);
      // Track search error
      analytics.trackError(
        "search_error",
        (error as Error).message,
        "searchDocuments"
      );
      return [];
    }
  }

  async updateDocumentStatus() {
    if (!this.vectorStore) {
      this.setDocumentStatus?.({ count: 0, totalSize: 0, vectorCount: 0 });
      return;
    }

    try {
      const stats = await this.vectorStore.getStats();
      const documents = await this.vectorStore.getAllDocuments();
      const totalSize = documents.reduce(
        (sum, doc) => sum + doc.metadata.filesize,
        0
      );

      this.setDocumentStatus?.({
        count: stats.documentCount,
        totalSize: totalSize,
        vectorCount: stats.vectorCount,
      });

      this.setDocuments?.(documents);
    } catch (error) {
      console.error("Failed to update document status:", error);
    }
  }

  exportResults() {
    const data = {
      topics: this.topics,
      researchResults: this.researchResults,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deepresearch_export_${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.updateStatus("✅ Research exported successfully");

    // Track export event
    analytics.trackExport("research_results", blob.size);
  }

  // TimeCapsule export - comprehensive data export including vector store
  async exportTimeCapsule() {
    try {
      this.updateStatus("📦 Preparing TimeCapsule export...");

      const timeCapsuleData = {
        metadata: {
          version: "4.0.0",
          exportedAt: new Date().toISOString(),
          platform: "Next.js",
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        },
        research: {
          topics: this.topics,
          researchResults: this.researchResults,
          currentTab: this.currentTab,
        },
        vectorStore: null as any,
      };

      // Export vector store data if available
      if (this.vectorStore) {
        try {
          const documents = await this.vectorStore.getAllDocuments();
          const stats = await this.vectorStore.getStats();

          timeCapsuleData.vectorStore = {
            documents: documents,
            stats: stats,
            exportedAt: new Date().toISOString(),
          };

          this.updateStatus("📊 Vector store data included in export");
        } catch (vectorError) {
          console.warn("⚠️ Could not export vector store data:", vectorError);
          this.updateStatus("⚠️ Research data exported without vector store");
        }
      }

      const blob = new Blob([JSON.stringify(timeCapsuleData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `timecapsule_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      this.updateStatus("✅ TimeCapsule exported successfully");
    } catch (error) {
      console.error("❌ TimeCapsule export failed:", error);
      this.updateStatus(
        "❌ TimeCapsule export failed: " + (error as Error).message
      );
    }
  }

  // TimeCapsule import - restore from exported data
  async importTimeCapsule(file: File) {
    try {
      this.updateStatus("📦 Importing TimeCapsule...");

      const content = await this.readFileContent(file);
      const timeCapsuleData = JSON.parse(content);

      // Validate TimeCapsule format
      if (!timeCapsuleData.metadata || !timeCapsuleData.research) {
        throw new Error("Invalid TimeCapsule format");
      }

      // Restore research data
      if (timeCapsuleData.research.topics) {
        this.topics = timeCapsuleData.research.topics;
        this.setTopics?.(this.topics);
      }

      if (timeCapsuleData.research.researchResults) {
        this.researchResults = timeCapsuleData.research.researchResults;
        this.setResearchResults?.(this.getCurrentResearchContent());
      }

      // Restore vector store data
      if (timeCapsuleData.vectorStore && this.vectorStore) {
        try {
          this.updateStatus("📊 Restoring vector store data...");

          // Clear existing data
          await this.vectorStore.clear();

          // Import documents
          const documents = timeCapsuleData.vectorStore.documents || [];
          for (const doc of documents) {
            try {
              // Re-insert document into vector store
              await this.vectorStore.insertDocument(doc);
            } catch (docError) {
              console.warn(
                `⚠️ Could not restore document ${doc.id}:`,
                docError
              );
            }
          }

          this.updateDocumentStatus();
          this.updateStatus("✅ Vector store data restored");
        } catch (vectorError) {
          console.warn("⚠️ Could not restore vector store data:", vectorError);
          this.updateStatus("⚠️ Research data restored without vector store");
        }
      }

      this.saveToStorage();
      this.updateStatus("✅ TimeCapsule imported successfully");
    } catch (error) {
      console.error("❌ TimeCapsule import failed:", error);
      this.updateStatus(
        "❌ TimeCapsule import failed: " + (error as Error).message
      );
    }
  }

  // Advanced search with filters
  async searchDocumentsAdvanced(options: {
    query: string;
    threshold?: number;
    limit?: number;
    documentTypes?: string[];
    dateRange?: { start: Date; end: Date };
  }) {
    if (!this.vectorStore) {
      this.updateStatus("❌ Vector Store not available");
      return [];
    }

    try {
      const { query, threshold = 0.3, limit = 20 } = options;

      this.updateStatus("🔍 Performing advanced search...");
      console.log("🔍 Advanced search parameters:", options);

      const results = await this.vectorStore.searchSimilar(
        query,
        threshold,
        limit
      );

      // Apply additional filters if specified
      let filteredResults = results;

      if (options.documentTypes && options.documentTypes.length > 0) {
        filteredResults = filteredResults.filter((result) =>
          options.documentTypes!.includes(result.document.metadata.filetype)
        );
      }

      if (options.dateRange) {
        const { start, end } = options.dateRange;
        filteredResults = filteredResults.filter((result) => {
          const uploadDate = new Date(result.document.metadata.uploadedAt);
          return uploadDate >= start && uploadDate <= end;
        });
      }

      this.updateStatus(
        `✅ Advanced search completed: ${filteredResults.length} results`
      );
      return filteredResults;
    } catch (error) {
      console.error("❌ Advanced search failed:", error);
      this.updateStatus(
        "❌ Advanced search failed: " + (error as Error).message
      );
      return [];
    }
  }

  clearAll() {
    if (confirm("Are you sure you want to clear all research data?")) {
      this.topics = [];
      this.researchResults = {};
      this.setTopics?.([]);
      this.setResearchResults?.("");
      this.saveToStorage();
      this.updateStatus("🧹 All data cleared");
    }
  }

  saveToStorage() {
    try {
      const data = {
        topics: this.topics,
        researchResults: this.researchResults,
        aiConnection: {
          provider: this.aiAssistant?.getSession()?.provider || "ollama",
          connected: this.aiAssistant?.isConnected() || false,
          model: this.aiAssistant?.getSession()?.model || null,
          baseURL:
            this.aiAssistant?.getSession()?.baseURL || this.selectedOllamaURL,
          ollamaURL: this.selectedOllamaURL,
        },
      };
      localStorage.setItem("deepresearch_data", JSON.stringify(data));
      console.log("💾 Saved state to localStorage:", data.aiConnection);
    } catch (error) {
      console.error("Failed to save to storage:", error);
    }
  }

  loadBasicDataFromStorage() {
    try {
      const data = localStorage.getItem("deepresearch_data");
      if (data) {
        const parsed = JSON.parse(data);
        this.topics = parsed.topics || [];
        this.researchResults = parsed.researchResults || {};

        // Update React state if setters are available
        this.setTopics?.(this.topics);
        this.setResearchResults?.(this.getCurrentResearchContent());

        console.log("📋 Loaded basic data from storage:", {
          topics: this.topics.length,
          hasResearchResults: Object.keys(this.researchResults).length > 0,
        });
      }
    } catch (error) {
      console.error("Failed to load basic data from storage:", error);
    }
  }

  loadAIConnectionFromStorage() {
    try {
      const data = localStorage.getItem("deepresearch_data");
      if (data) {
        const parsed = JSON.parse(data);

        // Restore AI connection state
        if (parsed.aiConnection) {
          console.log(
            "🔄 Loading AI connection state from storage:",
            parsed.aiConnection
          );
          this.restoreAIConnection(parsed.aiConnection);
        } else {
          console.log("📋 No saved AI connection state found");
        }
      }
    } catch (error) {
      console.error("Failed to load AI connection from storage:", error);
    }
  }

  // Legacy method for backward compatibility
  loadFromStorage() {
    this.loadBasicDataFromStorage();
    this.loadAIConnectionFromStorage();
  }

  private getCurrentResearchContent(): string {
    const current = this.researchResults["current"];
    if (typeof current === "string") {
      return current;
    }
    return "";
  }

  getResearchHistory(): ResearchItem[] {
    const history: ResearchItem[] = [];

    for (const [key, value] of Object.entries(this.researchResults)) {
      if (
        key !== "current" &&
        key !== "currentMetadata" &&
        typeof value === "object" &&
        "content" in value
      ) {
        history.push(value as ResearchItem);
      }
    }

    // Sort by timestamp (newest first)
    return history.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  loadResearchFromHistory(researchId: string) {
    const research = this.researchResults[researchId];
    if (research && typeof research === "object" && "content" in research) {
      const researchItem = research as ResearchItem;
      this.researchResults["current"] = researchItem.content;
      this.researchResults["currentMetadata"] = researchItem.metadata;
      this.setResearchResults?.(researchItem.content);
      this.saveToStorage();
      this.updateStatus(`✅ Loaded research: ${researchItem.metadata.title}`);
    }
  }

  private async restoreAIConnection(savedConnection: any) {
    if (!savedConnection || !this.aiAssistant) return;

    try {
      // Restore basic settings
      if (savedConnection.ollamaURL) {
        this.selectedOllamaURL = savedConnection.ollamaURL;
        this.setSelectedOllamaURL?.(savedConnection.ollamaURL);
      }

      // Set initial status to show the saved provider
      const initialStatus = {
        connected: false,
        provider: savedConnection.provider || "ollama",
        model: undefined,
        baseURL: undefined,
      };
      this.setAIStatus?.(initialStatus);

      // If it was previously connected, attempt to reconnect
      if (savedConnection.connected && savedConnection.model) {
        console.log(
          `🔄 Attempting to restore connection to ${savedConnection.provider} with model ${savedConnection.model}`
        );
        this.updateStatus(
          `🔄 Restoring AI connection to ${savedConnection.model}...`
        );

        if (savedConnection.provider === "ollama") {
          const baseURL =
            savedConnection.baseURL ||
            savedConnection.ollamaURL ||
            this.selectedOllamaURL;
          const success = await this.aiAssistant.connectToOllama(
            baseURL,
            savedConnection.model
          );

          if (success) {
            console.log("✅ AI connection restored successfully");
            this.updateStatus(
              `✅ AI connection restored: ${savedConnection.model}`
            );
          } else {
            console.log(
              "⚠️ Failed to restore AI connection - model may no longer be available"
            );
            this.updateStatus(
              `⚠️ Could not restore AI connection to ${savedConnection.model}`
            );
          }
        }
      } else {
        console.log(
          "📋 AI was not previously connected, showing disconnected state"
        );
        this.updateStatus(
          `🤖 AI ready to connect (${savedConnection.provider})`
        );
      }
    } catch (error) {
      console.error("❌ Failed to restore AI connection:", error);
      this.updateStatus(
        `❌ Failed to restore AI connection: ${(error as Error).message}`
      );
    }
  }

  updateStatus(message: string) {
    console.log(`📋 Status: ${message}`);
    this.setStatusMessage?.(message);
  }
}

// Utility function for markdown to HTML conversion
function formatMarkdownToHTML(markdown: string): string {
  let html = markdown;

  // Convert headers
  html = html.replace(
    /^#{6}\s(.+)$/gm,
    '<h6 style="color: #4facfe; margin: 20px 0 10px 0; font-weight: 600; font-size: 14px;">$1</h6>'
  );
  html = html.replace(
    /^#{5}\s(.+)$/gm,
    '<h5 style="color: #4facfe; margin: 20px 0 10px 0; font-weight: 600; font-size: 16px;">$1</h5>'
  );
  html = html.replace(
    /^#{4}\s(.+)$/gm,
    '<h4 style="color: #4facfe; margin: 20px 0 10px 0; font-weight: 600; font-size: 18px;">$1</h4>'
  );
  html = html.replace(
    /^#{3}\s(.+)$/gm,
    '<h3 style="color: #4facfe; margin: 25px 0 15px 0; font-weight: 700; font-size: 20px;">$1</h3>'
  );
  html = html.replace(
    /^#{2}\s(.+)$/gm,
    '<h2 style="color: #00f2fe; margin: 30px 0 20px 0; font-weight: 700; font-size: 24px;">$1</h2>'
  );
  html = html.replace(
    /^#{1}\s(.+)$/gm,
    '<h1 style="color: #00f2fe; margin: 30px 0 20px 0; font-weight: 800; font-size: 28px; border-bottom: 2px solid rgba(79, 172, 254, 0.3); padding-bottom: 10px;">$1</h1>'
  );

  // Convert bold text
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong style="color: #4facfe; font-weight: 600;">$1</strong>'
  );

  // Convert italic text
  html = html.replace(
    /\*(.+?)\*/g,
    '<em style="color: rgba(255, 255, 255, 0.8); font-style: italic;">$1</em>'
  );

  // Convert unordered lists
  html = html.replace(
    /^[\s]*[-*+]\s(.+)$/gm,
    '<li style="margin: 5px 0; color: rgba(255, 255, 255, 0.9);">$1</li>'
  );

  // Convert ordered lists
  html = html.replace(
    /^[\s]*\d+\.\s(.+)$/gm,
    '<li style="margin: 5px 0; color: rgba(255, 255, 255, 0.9);">$1</li>'
  );

  // Wrap consecutive list items in ul/ol tags
  html = html.replace(/(<li[^>]*>.*?<\/li>[\s\S]*?)+/g, (match) => {
    if (match.includes("- ") || match.includes("* ") || match.includes("+ ")) {
      return `<ul style="margin: 15px 0; padding-left: 20px; list-style-type: disc;">${match}</ul>`;
    } else {
      return `<ol style="margin: 15px 0; padding-left: 20px; list-style-type: decimal;">${match}</ol>`;
    }
  });

  // Convert code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```/g, "").trim();
    return `<pre style="background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 15px; margin: 15px 0; overflow-x: auto; font-family: 'Monaco', 'Menlo', monospace; font-size: 13px; color: #a8f7a8;"><code>${code}</code></pre>`;
  });

  // Convert inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; padding: 2px 6px; font-family: Monaco, Menlo, monospace; font-size: 12px; color: #a8f7a8;">$1</code>'
  );

  // Convert line breaks
  html = html.replace(
    /\n\n/g,
    '</p><p style="margin: 15px 0; color: rgba(255, 255, 255, 0.9); line-height: 1.8;">'
  );
  html = html.replace(/\n/g, "<br/>");

  // Wrap in paragraph tags
  html = `<p style="margin: 15px 0; color: rgba(255, 255, 255, 0.9); line-height: 1.8;">${html}</p>`;

  // Convert blockquotes
  html = html.replace(
    /^>\s(.+)$/gm,
    '<blockquote style="border-left: 4px solid #4facfe; margin: 20px 0; padding: 15px 20px; background: rgba(79, 172, 254, 0.1); color: rgba(255, 255, 255, 0.8); font-style: italic;">$1</blockquote>'
  );

  // Convert tables (basic support)
  html = html.replace(/\|(.+?)\|/g, (match) => {
    const cells = match.split("|").filter((cell) => cell.trim());
    const tableCells = cells
      .map(
        (cell) =>
          `<td style="padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.2);">${cell.trim()}</td>`
      )
      .join("");
    return `<tr>${tableCells}</tr>`;
  });

  // Simple table wrapping
  if (html.includes("<tr>")) {
    html = html.replace(
      /(<tr>.*?<\/tr>)/g,
      '<table style="border-collapse: collapse; margin: 20px 0; width: 100%;">$1</table>'
    );
  }

  return html;
}

// Client-only time component to avoid hydration issues
function ClientOnlyTime() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
        --:--:--
      </div>
    );
  }

  return (
    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
      {currentTime}
    </div>
  );
}

// React Component Hook
export function DeepResearchComponent() {
  // Initialize page analytics for fine-grained tracking
  const pageAnalytics = usePageAnalytics('DeepResearch-TimeCapsule', 'research');
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [aiStatus, setAIStatus] = useState<AIConnectionStatus>({
    connected: false,
    provider: "ollama",
  });
  const [researchType, setResearchType] = useState<ResearchType>("academic");
  const [researchDepth, setResearchDepth] = useState<ResearchDepth>("overview");
  const [researchResults, setResearchResults] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<
    "research" | "sources" | "notes"
  >("research");
  const [statusMessage, setStatusMessage] = useState<string>(
    "🚀 DeepResearch TimeCapsule ready"
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documentStatus, setDocumentStatus] = useState({
    count: 0,
    totalSize: 0,
    vectorCount: 0,
  });
  const [showDocumentManager, setShowDocumentManager] =
    useState<boolean>(false);
  const [isVectorStoreLoading, setIsVectorStoreLoading] =
    useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchThreshold, setSearchThreshold] = useState<number>(0.1);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("");
  const [previewDocument, setPreviewDocument] = useState<DocumentData | null>(
    null
  );
  const [showDocumentPreview, setShowDocumentPreview] =
    useState<boolean>(false);
  const [showChunkView, setShowChunkView] = useState<boolean>(false);
  const [currentChunk, setCurrentChunk] = useState<any>(null);
  const [showAddTopicModal, setShowAddTopicModal] = useState<boolean>(false);
  const [newTopicTitle, setNewTopicTitle] = useState<string>("");
  const [newTopicDescription, setNewTopicDescription] = useState<string>("");

  // Document processing progress states
  const [isProcessingDocuments, setIsProcessingDocuments] =
    useState<boolean>(false);
  const [processingProgress, setProcessingProgress] = useState<{
    currentFile: string;
    progress: number;
    message: string;
    fileIndex: number;
    totalFiles: number;
  } | null>(null);

  // AI Connection Modal States
  const [showOllamaConnectionModal, setShowOllamaConnectionModal] =
    useState<boolean>(false);
  const [showModelSelectionModal, setShowModelSelectionModal] =
    useState<boolean>(false);
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [selectedOllamaURL, setSelectedOllamaURL] = useState<string>(
    "http://localhost:11434"
  );

  const appRef = useRef<DeepResearchApp | null>(null);

  useEffect(() => {
    // Always create the app instance immediately
    const app = new DeepResearchApp();
    appRef.current = app;

    // Set React state setters
    app.setTopics = setTopics;
    app.setAIStatus = setAIStatus;
    app.setResearchType = setResearchType;
    app.setResearchDepth = setResearchDepth;
    app.setResearchResults = setResearchResults;
    app.setCurrentTab = setCurrentTab;
    app.setStatusMessage = setStatusMessage;
    app.setIsGenerating = setIsGenerating;
    app.setDocuments = setDocuments;
    app.setDocumentStatus = setDocumentStatus;
    app.setShowDocumentManager = setShowDocumentManager;
    app.setShowOllamaConnectionModal = setShowOllamaConnectionModal;
    app.setShowModelSelectionModal = setShowModelSelectionModal;
    app.setAvailableModels = setAvailableModels;
    app.setSelectedOllamaURL = setSelectedOllamaURL;
    app.setIsVectorStoreLoading = setIsVectorStoreLoading;
    app.setIsProcessingDocuments = setIsProcessingDocuments;
    app.setProcessingProgress = setProcessingProgress;

    // Initialize the app asynchronously (non-blocking)
    app.init();
    
    // Set analytics for the app instance
    (app as any).pageAnalytics = pageAnalytics;
  }, []);

  const app = appRef.current!; // Non-null assertion since we create it immediately in useEffect

  const handleSearch = async () => {
    if (!app || !searchQuery.trim()) {
      return;
    }

    // Track search start
    pageAnalytics.trackFeatureUsage('document_search_started', {
      search_query: searchQuery,
      search_threshold: searchThreshold,
      query_length: searchQuery.length,
      has_documents: documentStatus.count > 0,
      document_count: documentStatus.count
    });

    setIsSearching(true);
    try {
      const results = await app.searchDocuments(
        searchQuery,
        searchThreshold,
        20
      );
      setSearchResults(results);
      console.log("Search completed, results:", results.length);
      
      // Track search completion
      pageAnalytics.trackFeatureUsage('document_search_completed', {
        search_query: searchQuery,
        search_threshold: searchThreshold,
        results_found: results.length,
        search_successful: results.length > 0,
        average_similarity: results.length > 0 ? 
          results.reduce((sum, r) => sum + (r.similarity || 0), 0) / results.length : 0
      });
      
      if (results.length > 0) {
        setCurrentSearchQuery(searchQuery);
        setShowSearchResults(true);
        setShowDocumentManager(false); // Close document manager when showing search results
        console.log(
          "Opening search results modal with",
          results.length,
          "results"
        );
      }
    } catch (error) {
      console.error("Search failed:", error);
      app.updateStatus("❌ Search failed: " + (error as Error).message);
      setSearchResults([]);
      
      // Track search error
      pageAnalytics.trackError('document_search_failed', 
        error instanceof Error ? error.message : 'Unknown search error');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handlePreviewDocument = async (docId: string) => {
    const doc = await app.previewDocument(docId);
    if (doc) {
      setPreviewDocument(doc);
      setShowDocumentPreview(true);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setCurrentSearchQuery("");
  };

  const closeDocumentPreview = () => {
    setShowDocumentPreview(false);
    setPreviewDocument(null);
  };

  const handleViewChunk = (searchResult: any, document: DocumentData) => {
    console.log("🔍 handleViewChunk called with:", { searchResult, document });
    console.log("🔍 SearchResult structure:", Object.keys(searchResult || {}));
    console.log("🔍 SearchResult.chunk:", searchResult?.chunk);
    console.log("🔍 SearchResult.chunk.content:", searchResult?.chunk?.content);

    // Extract content from the correct structure (SearchResult.chunk.content)
    const chunkData = {
      content: searchResult?.chunk?.content || "No content available",
      similarity: searchResult?.similarity || 0,
      chunkIndex: searchResult?.chunk?.id || "unknown",
      documentId: searchResult?.document?.id || "unknown",
      document: searchResult?.document ||
        document || { title: "Unknown Document" },
    };

    console.log("🔍 Viewing chunk from:", chunkData.document?.title);
    setCurrentChunk(chunkData);
    setShowChunkView(true);
  };

  const closeChunkView = () => {
    setShowChunkView(false);
    setCurrentChunk(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        {/* Left Panel - Controls */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <ControlsPanel
            aiStatus={aiStatus}
            setAIStatus={setAIStatus}
            researchType={researchType}
            setResearchType={setResearchType}
            researchDepth={researchDepth}
            setResearchDepth={setResearchDepth}
            onAddTopic={(title, description) =>
              app.addTopic(title, description)
            }
            onConnectAI={() => app.connectAI()}
            onGenerateResearch={() => {
              const selectedTopics = topics.filter((t) => t.selected);
              if (selectedTopics.length === 0) {
                app.updateStatus("❌ Please select at least one topic first");
                return;
              }
              if (!aiStatus.connected) {
                app.updateStatus("❌ Please connect to AI first");
                return;
              }
              app.generateResearch(researchType, researchDepth);
            }}
            onClearAll={() => app.clearAll()}
            onManageKnowledge={() => app.showDocumentManager()}
            onUploadDocuments={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files) app.handleFileUpload(files);
              };
              input.click();
            }}
            onUploadRepository={() => {
              /* Repository upload logic */
            }}
            onExportResults={() => app.exportResults()}
            onExportTimeCapsule={() => app.exportTimeCapsule()}
            onLoadTimeCapsule={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".json";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) app.importTimeCapsule(file);
              };
              input.click();
            }}
            isGenerating={isGenerating}
            documentStatus={documentStatus}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - Structure Builder */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <StructureBuilder
            topics={topics}
            onSelectTopic={(topicId) => app.selectTopic(topicId)}
            onDeleteTopic={(topicId) => app.deleteTopic(topicId)}
            onMoveTopic={(topicId, direction) =>
              app.moveTopic(topicId, direction)
            }
            documentStatus={documentStatus}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Research Output */}
        <ResizablePanel defaultSize={50} minSize={40}>
          <ResearchOutput
            researchResults={researchResults}
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            onClearOutput={() => {
              setResearchResults("");
              app.updateStatus("🗑️ Research output cleared");
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status Bar */}
      <StatusBar message={statusMessage} />

      {/* AI Connection Modal */}
      <Dialog
        open={showOllamaConnectionModal}
        onOpenChange={(open) => {
          if (!open) app.cancelConnection();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              Connect to Ollama
            </DialogTitle>
            <DialogDescription>
              Enter your Ollama server URL to connect to your local AI models.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ollama-url">Ollama Server URL</Label>
              <Input
                id="ollama-url"
                value={selectedOllamaURL}
                onChange={(e) => setSelectedOllamaURL(e.target.value)}
                placeholder="http://localhost:11434"
                className="font-mono"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => app.cancelConnection()}>
                Cancel
              </Button>
              <Button
                onClick={() => app.testOllamaConnection(selectedOllamaURL)}
              >
                <Wifi className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Model Selection Modal */}
      <Dialog
        open={showModelSelectionModal}
        onOpenChange={(open) => {
          if (!open) app.cancelConnection();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-green-600" />
              Select AI Model
            </DialogTitle>
            <DialogDescription>
              Choose from available models on your Ollama server.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {availableModels.length > 0 ? (
              <ScrollArea className="max-h-64">
                <div className="space-y-2">
                  {availableModels.map((model) => (
                    <Card
                      key={model.name}
                      className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => app.selectModel(model.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{model.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Size: {model.size || "Unknown"}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {model.name.includes("chat") ? "Chat" : "Base"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>
                  No models found. Make sure Ollama is running with models
                  installed.
                </p>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => app.cancelConnection()}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Manager Modal */}
      <Dialog
        open={showDocumentManager}
        onOpenChange={(open) => {
          if (!open) app.hideDocumentManager();
        }}
      >
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 p-6 pb-4">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Knowledge Base Manager
            </DialogTitle>
            <DialogDescription>
              Manage your uploaded documents and search through your knowledge
              base.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-4 py-4">
              {/* Search Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Search Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search your knowledge base..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                      <Search className="h-4 w-4 mr-2" />
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Label htmlFor="search-threshold">
                      Similarity threshold:
                    </Label>
                    <Input
                      id="search-threshold"
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={searchThreshold}
                      onChange={(e) =>
                        setSearchThreshold(parseFloat(e.target.value))
                      }
                      className="w-20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Documents List */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Documents ({documents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {documents.length > 0 ? (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <Card key={doc.id} className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">
                                {doc.title}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <span>
                                  Size: {formatFileSize(doc.metadata.filesize)}
                                </span>
                                <span>Type: {doc.metadata.filetype}</span>
                                <span>
                                  Added:{" "}
                                  {new Date(
                                    doc.metadata.uploadedAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreviewDocument(doc.id)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => app.downloadDocument(doc.id)}
                              >
                                <Download className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => app.deleteDocument(doc.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No documents uploaded yet.</p>
                      <p className="text-sm">
                        Upload documents to enhance your research capabilities.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex justify-end p-6 pt-4 flex-shrink-0 border-t">
            <Button variant="outline" onClick={() => app.hideDocumentManager()}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Results Modal */}
      {showSearchResults && (
        <Dialog
          open={showSearchResults}
          onOpenChange={(open) => {
            if (!open) closeSearchResults();
          }}
        >
          <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="flex-shrink-0 p-6 pb-4">
              <DialogTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search Results for "{currentSearchQuery}"
              </DialogTitle>
              <DialogDescription>
                Found {searchResults.length} relevant chunks in your knowledge
                base.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-3 py-4">
                {searchResults.map((result, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          Similarity: {(result.similarity * 100).toFixed(1)}%
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleViewChunk(result, result.document)
                          }
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                      <h4 className="font-medium">
                        {result.document?.title || "Unknown Document"}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                        {result.chunk?.content || "No content available"}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex justify-end p-6 pt-4 flex-shrink-0 border-t">
              <Button variant="outline" onClick={closeSearchResults}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Preview Modal */}
      {showDocumentPreview && previewDocument && (
        <Dialog
          open={showDocumentPreview}
          onOpenChange={(open) => {
            if (!open) closeDocumentPreview();
          }}
        >
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="flex-shrink-0 p-6 pb-4">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                {previewDocument.title}
              </DialogTitle>
              <DialogDescription>
                Document preview -{" "}
                {formatFileSize(previewDocument.metadata.filesize)}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="whitespace-pre-wrap text-sm font-mono bg-slate-50 dark:bg-slate-800 p-4 rounded-lg leading-relaxed my-4">
                {previewDocument.content}
              </div>
            </div>
            <div className="flex justify-end gap-2 p-6 pt-4 flex-shrink-0 border-t">
              <Button
                variant="outline"
                onClick={() => app.downloadDocument(previewDocument.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={closeDocumentPreview}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Chunk View Modal */}
      {showChunkView && currentChunk && (
        <Dialog
          open={showChunkView}
          onOpenChange={(open) => {
            if (!open) closeChunkView();
          }}
        >
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="flex-shrink-0 p-6 pb-4">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Document Chunk
              </DialogTitle>
              <DialogDescription>
                From:{" "}
                {currentChunk.document?.title ||
                  currentChunk.document?.name ||
                  "Unknown Document"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6">
              {/* Chunk metadata */}
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                <div className="flex justify-between items-center">
                  <span>
                    <strong>Similarity Match:</strong>{" "}
                    {currentChunk.similarity
                      ? (currentChunk.similarity * 100).toFixed(1) + "%"
                      : "N/A"}
                  </span>
                  <span>
                    <strong>Content Length:</strong>{" "}
                    {currentChunk.content?.length || 0} characters
                  </span>
                </div>
              </div>

              {/* Chunk content */}
              <div className="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-slate-800 p-4 rounded-lg leading-relaxed my-4">
                {currentChunk.content || "No content available"}
              </div>
            </div>
            <div className="flex justify-end p-6 pt-4 flex-shrink-0 border-t">
              <Button variant="outline" onClick={closeChunkView}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
