/**
 * Enhanced RAG Service for Browser-Based Retrieval-Augmented Generation
 * Simplified wrapper around VectorStore for document processing and semantic search
 * Leverages existing VectorStore infrastructure for reliability and performance
 */

import {
  VectorStore,
  DocumentData,
  SearchResult,
} from "@/components/VectorStore/VectorStore";
import { RAGDocument } from "@/types/rag";

export interface RAGContext {
  query: string;
  relevantDocuments: RAGDocument[];
  searchResults: SearchResult[];
  contextText: string;
  metadata: {
    searchTime: number;
    documentCount: number;
    chunkCount: number;
    averageSimilarity: number;
    searchThreshold: number;
  };
}

export interface RAGSearchOptions {
  threshold?: number;
  limit?: number;
  includeMetadata?: boolean;
  maxContextLength?: number;
  searchType?: "semantic" | "hybrid" | "keyword";
  agentId?: string;
  sessionId?: string;
}

export interface RAGProcessingOptions {
  onProgress?: (progress: {
    stage: string;
    progress: number;
    message: string;
  }) => void;
}

export class RAGService {
  private vectorStore: VectorStore;
  private isInitialized = false;

  constructor(vectorStore: VectorStore) {
    this.vectorStore = vectorStore;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Ensure VectorStore is initialized
      if (!this.vectorStore.initialized) {
        console.log("🔧 Initializing VectorStore for RAG...");
        await this.vectorStore.init();
      }

      this.isInitialized = true;
      console.log("✅ RAG Service initialized successfully");
    } catch (error) {
      console.error("❌ RAG Service initialization failed:", error);
      throw new Error("Failed to initialize RAG Service");
    }
  }

  /**
   * Process document using existing VectorStore infrastructure
   */
  async processDocument(
    file: File,
    options: RAGProcessingOptions = {}
  ): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const { onProgress } = options;

    try {
      // Read file content
      onProgress?.({
        stage: "reading",
        progress: 10,
        message: `Reading ${file.name}...`,
      });

      const content = await this.readFileContent(file);

      onProgress?.({
        stage: "processing",
        progress: 30,
        message: "Processing document with VectorStore...",
      });

      // Use VectorStore's existing document processing
      const documentId = await this.vectorStore.addDocument(
        file,
        content,
        (progress) => {
          onProgress?.({
            stage: "embedding",
            progress: 30 + progress.progress * 0.6, // 30-90%
            message: progress.message,
          });
        }
      );

      onProgress?.({
        stage: "complete",
        progress: 100,
        message: "Document processed successfully",
      });

      console.log(`✅ RAG Document processed: ${file.name} -> ${documentId}`);
      return documentId;
    } catch (error: unknown) {
      console.error(
        `❌ RAG Document processing failed for ${file.name}:`,
        error
      );
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  /**
   * Enhanced semantic search with RAG context generation
   */
  async searchWithRAG(
    query: string,
    options: RAGSearchOptions = {}
  ): Promise<RAGContext> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const {
      threshold = 0.3,
      limit = 10,
      includeMetadata = true,
      maxContextLength = 4000,
      agentId,
      sessionId,
    } = options;

    const startTime = Date.now();

    try {
      // Perform semantic search using VectorStore
      const searchResults = await this.vectorStore.searchSimilar(
        query,
        threshold,
        limit,
        {
          agentId,
          sessionId,
          queryType: "agent_rag",
        }
      );

      const searchTime = Date.now() - startTime;

      // Convert to RAG documents with proper metadata handling
      const relevantDocuments: RAGDocument[] = searchResults.map((result) => ({
        id: result.document.id,
        title: result.document.title,
        similarity: result.similarity,
        chunkContent: result.chunk.content,
        chunkIndex: parseInt(result.chunk.id.split("_").pop() || "0"),
        source: result.document.metadata?.source || "unknown",
        metadata: this.sanitizeMetadata(
          result.document.metadata,
          includeMetadata
        ),
        retrievalContext: {
          queryId: `rag_${Date.now()}`,
          retrievalTime: searchTime,
          processingTime: searchTime,
        },
      }));

      // Generate context text
      const contextText = this.generateContextText(
        relevantDocuments,
        maxContextLength
      );

      // Calculate metadata
      const averageSimilarity =
        relevantDocuments.length > 0
          ? relevantDocuments.reduce((sum, doc) => sum + doc.similarity, 0) /
            relevantDocuments.length
          : 0;

      const context: RAGContext = {
        query,
        relevantDocuments,
        searchResults,
        contextText,
        metadata: {
          searchTime,
          documentCount: new Set(relevantDocuments.map((d) => d.id)).size,
          chunkCount: relevantDocuments.length,
          averageSimilarity,
          searchThreshold: threshold,
        },
      };

      console.log(`🔍 RAG Search completed in ${searchTime}ms:`, {
        query: query.substring(0, 50) + (query.length > 50 ? "..." : ""),
        documentsFound: context.metadata.documentCount,
        chunksFound: context.metadata.chunkCount,
        averageSimilarity: averageSimilarity.toFixed(3),
      });

      return context;
    } catch (error) {
      console.error("❌ RAG search failed:", error);
      throw new Error(`RAG search failed: ${error.message}`);
    }
  }

  /**
   * Sanitize metadata to ensure it matches RAGDocument interface
   */
  private sanitizeMetadata(
    metadata: any,
    includeMetadata: boolean
  ): RAGDocument["metadata"] {
    if (!includeMetadata || !metadata) {
      return {
        filename: "unknown",
        filetype: "unknown",
        uploadedAt: new Date().toISOString(),
        description: "Document from knowledge base",
      };
    }

    // Ensure required fields are present
    return {
      filename: metadata.filename || "unknown",
      filetype: metadata.filetype || "unknown",
      uploadedAt: metadata.uploadedAt || new Date().toISOString(),
      filesize: metadata.filesize,
      description: metadata.description || "Document from knowledge base",
      ...metadata, // Include all other metadata fields
    };
  }

  /**
   * Generate context text from search results
   */
  private generateContextText(
    documents: RAGDocument[],
    maxLength: number
  ): string {
    const chunks = documents
      .sort((a, b) => b.similarity - a.similarity)
      .map((doc) => doc.chunkContent);

    let contextText = "";
    let currentLength = 0;

    for (const chunk of chunks) {
      if (currentLength + chunk.length > maxLength) {
        break;
      }
      contextText += chunk + "\n\n";
      currentLength += chunk.length + 2;
    }

    return contextText.trim();
  }

  /**
   * Process multiple documents with progress tracking
   */
  async processBatch(
    files: FileList,
    options: RAGProcessingOptions = {}
  ): Promise<{ documentIds: string[]; stats: any }> {
    const documentIds: string[] = [];
    const { onProgress } = options;
    const totalFiles = files.length;

    console.log(`📚 Starting batch processing of ${totalFiles} files`);

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];
      const fileProgress = (i / totalFiles) * 100;

      onProgress?.({
        stage: "batch_processing",
        progress: Math.round(fileProgress),
        message: `Processing ${file.name} (${i + 1}/${totalFiles})`,
      });

      try {
        const documentId = await this.processDocument(file, {
          onProgress: (progress) => {
            // Combine batch progress with individual file progress
            const combinedProgress = Math.round(
              fileProgress + progress.progress / totalFiles
            );
            onProgress?.({
              stage: progress.stage,
              progress: Math.min(combinedProgress, 100),
              message: `${file.name}: ${progress.message}`,
            });
          },
        });

        documentIds.push(documentId);
        console.log(`✅ Processed ${i + 1}/${totalFiles}: ${file.name}`);
      } catch (error) {
        console.error(`❌ Failed to process ${file.name}:`, error);
        // Continue with other files instead of failing the entire batch
      }
    }

    // Get final stats
    const stats = await this.getRAGStats();

    onProgress?.({
      stage: "complete",
      progress: 100,
      message: `Batch processing complete: ${documentIds.length}/${totalFiles} files processed`,
    });

    console.log(
      `✅ Batch processing complete: ${documentIds.length}/${totalFiles} files processed`
    );
    return { documentIds, stats };
  }

  /**
   * Get comprehensive RAG statistics
   */
  async getRAGStats(): Promise<{
    documentCount: number;
    chunkCount: number;
    vectorCount: number;
    totalSize: number;
    lastUpdated: string;
  }> {
    try {
      const stats = await this.vectorStore.getStats();
      const documents = await this.vectorStore.getAllDocuments();

      const totalSize = documents.reduce(
        (sum, doc) => sum + (doc.metadata?.filesize || 0),
        0
      );

      return {
        ...stats,
        totalSize,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ Failed to get RAG stats:", error);
      return {
        documentCount: 0,
        chunkCount: 0,
        vectorCount: 0,
        totalSize: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  /**
   * Clear all RAG data
   */
  async clearRAGData(): Promise<void> {
    try {
      await this.vectorStore.clear();
      console.log("🗑️ RAG data cleared successfully");
    } catch (error) {
      console.error("❌ Failed to clear RAG data:", error);
      throw new Error("Failed to clear RAG data");
    }
  }

  /**
   * Read file content as text
   */
  private async readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve(content);
      };

      reader.onerror = () => {
        reject(new Error(`Failed to read file: ${file.name}`));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Check if RAG service is ready
   */
  get isReady(): boolean {
    return this.isInitialized && this.vectorStore.initialized;
  }

  /**
   * Get VectorStore status for debugging
   */
  getStatus(): {
    initialized: boolean;
    vectorStoreReady: boolean;
    processingAvailable: boolean;
  } {
    return {
      initialized: this.isInitialized,
      vectorStoreReady: this.vectorStore.initialized,
      processingAvailable: this.vectorStore.processingAvailable,
    };
  }
}

// Singleton instance management
let ragServiceInstance: RAGService | null = null;

export function getRAGService(vectorStore: VectorStore): RAGService {
  if (!ragServiceInstance) {
    ragServiceInstance = new RAGService(vectorStore);
  }
  return ragServiceInstance;
}

export function resetRAGService(): void {
  ragServiceInstance = null;
}
