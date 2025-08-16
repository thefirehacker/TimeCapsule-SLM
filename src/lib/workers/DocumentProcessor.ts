/**
 * Document Processor - Coordinates between text chunking (web worker) and embedding generation (main thread)
 * New Architecture: Worker for KB operations, Main thread for ML operations
 */

import { getEmbeddingService } from "../EmbeddingService";

export interface ProcessingProgress {
  status: "initializing" | "chunking" | "embedding" | "complete" | "error";
  message: string;
  progress: number;
  current?: number;
  total?: number;
}

export interface ProcessedDocument {
  id: string;
  title: string;
  content: string;
  metadata: any;
  chunks: Array<{
    index: number;
    content: string;
    startIndex: number;
    endIndex: number;
    wordCount: number;
  }>;
  vectors: number[][];
}

export interface WorkerResponse {
  type: string;
  data?: any;
  error?: string;
  id?: string;
}

export interface PendingDocument {
  documentData: {
    id: string;
    title: string;
    content: string;
    metadata: any;
  };
  onProgress: ProgressCallback;
  onComplete: (document: ProcessedDocument) => void;
  onError: (error: string) => void;
}

export type ProgressCallback = (progress: ProcessingProgress) => void;

export class DocumentProcessor {
  private worker: Worker | null = null;
  private workerReady = false;
  private embeddingService = getEmbeddingService();
  private currentProcessing: any = null;
  private currentCallbacks: any = null;
  private pendingDocuments: any[] = [];

  constructor() {
    console.log("🔧 DocumentProcessor constructor called (new architecture)");
  }

  // Make embedding service accessible for VectorStore
  get embeddingServiceInstance() {
    return this.embeddingService;
  }

  async init(onProgress?: ProgressCallback): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log(
          "🔧 Initializing DocumentProcessor with immediate download architecture..."
        );

        onProgress?.({
          status: "initializing",
          message: "Initializing text processing...",
          progress: 10,
        });

        // Initialize text processing worker only - Xenova will be handled by VectorStore
        this.initializeWorker(onProgress, resolve, reject);

        // NOTE: Xenova download is now handled by VectorStore immediately
        // This DocumentProcessor focuses on text processing coordination
      } catch (error) {
        console.error("❌ Document Processor: Failed to initialize:", error);
        reject(new Error("Document processing initialization failed"));
      }
    });
  }

  private initializeWorker(
    onProgress?: ProgressCallback,
    resolve?: () => void,
    reject?: (error: Error) => void
  ): void {
    try {
      console.log("🔧 Initializing text processing worker...");

      // Use worker from public directory (works reliably in Next.js)
      const workerUrl = "/workers/embeddingWorker.js";
      this.worker = new Worker(workerUrl);

      // Set up message handler
      this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
        this.handleWorkerMessage(event.data);
      };

      this.worker.onerror = (error) => {
        console.error("❌ Document Processor: Worker error:", error);
        reject?.(new Error(`Worker error: ${error.message}`));
      };

      // Handle initialization response
      const initHandler = (event: MessageEvent<any>) => {
        if (event.data.type === "init_complete") {
          this.worker?.removeEventListener("message", initHandler);
          this.workerReady = true;
          console.log("✅ Text processing worker ready");

          onProgress?.({
            status: "initializing",
            message: "Text processing ready",
            progress: 100,
          });

          // Complete initialization immediately - embeddings will be lazy-loaded
          console.log(
            "✅ DocumentProcessor initialization complete (embeddings will load when needed)"
          );
          resolve?.();
        }
      };

      this.worker.addEventListener("message", initHandler);

      // Initialize the worker
      this.worker.postMessage({ type: "init" });
    } catch (error) {
      console.error("❌ Document Processor: Failed to create worker:", error);
      this.workerReady = false;
      this.worker = null;
      reject?.(new Error("Text processing worker failed to initialize"));
    }
  }

  async processDocument(
    documentData: {
      id: string;
      title: string;
      content: string;
      metadata: any;
    },
    onProgress: ProgressCallback,
    onComplete: (document: ProcessedDocument) => void,
    onError: (error: string) => void
  ): Promise<void> {
    if (!this.worker || !this.workerReady) {
      console.error("❌ Document Processor: Worker not available");
      onError(
        "Document processing unavailable - text processing worker failed to initialize"
      );
      return;
    }

    if (this.currentProcessing) {
      // Queue the document for processing
      this.pendingDocuments.push({
        documentData,
        onProgress,
        onComplete,
        onError,
      });

      onProgress({
        status: "chunking",
        message: "Queued for processing...",
        progress: 0,
      });

      console.log(
        `📋 Document Processor: Queued ${documentData.title} for processing`
      );
      return;
    }

    // Start processing immediately
    this.startProcessing(documentData, onProgress, onComplete, onError);
  }

  private startProcessing(
    documentData: {
      id: string;
      title: string;
      content: string;
      metadata: any;
    },
    onProgress: ProgressCallback,
    onComplete: (document: ProcessedDocument) => void,
    onError: (error: string) => void
  ): void {
    this.currentProcessing = {
      documentData,
      onProgress,
      onComplete,
      onError,
    };

    this.currentCallbacks = {
      onProgress,
      onComplete,
      onError,
    };

    console.log(`📄 Starting document processing: ${documentData.title}`);

    // Step 1: Send document to worker for text chunking
    // CRITICAL: Create completely clean serializable object - NO callbacks, functions, or circular refs
    const cleanSerializableData = JSON.parse(
      JSON.stringify({
        id: documentData.id,
        title: documentData.title,
        content: documentData.content,
        metadata: {
          filename: documentData.metadata?.filename,
          filesize: documentData.metadata?.filesize,
          filetype: documentData.metadata?.filetype,
          uploadedAt: documentData.metadata?.uploadedAt,
          source: documentData.metadata?.source,
          description: documentData.metadata?.description,
          isGenerated: documentData.metadata?.isGenerated,
          documentType: documentData.metadata?.documentType,
        },
      })
    );

    this.worker?.postMessage({
      type: "process_document",
      data: cleanSerializableData,
      id: Date.now().toString(),
    });
  }

  private handleWorkerMessage(response: any) {
    const callbacks = this.currentCallbacks;
    if (!callbacks) return;

    switch (response.type) {
      case "progress":
        const progressData = response.data || {};
        const progress: ProcessingProgress = {
          status:
            progressData.status === "chunking" ? "chunking" : "initializing",
          message: progressData.message || "Processing...",
          progress: Math.round((progressData.progress || 0) * 0.5), // Scale to 0-50% for chunking
        };
        callbacks.onProgress(progress);
        break;

      case "document_processed":
        this.handleChunkedDocument(response.data);
        break;

      case "error":
        console.error("❌ Worker error:", response.error);
        callbacks.onError(response.error || "Unknown worker error");
        this.finishProcessing();
        break;

      default:
        console.warn("⚠️ Unknown worker message type:", response.type);
    }
  }

  private async handleChunkedDocument(chunkedData: any): Promise<void> {
    const callbacks = this.currentCallbacks;
    if (!callbacks) return;

    try {
      console.log(
        `📊 Received chunked document: ${chunkedData.chunks.length} chunks`
      );

      callbacks.onProgress({
        status: "embedding",
        message: "Generating embeddings...",
        progress: 50,
      });

      let vectors: number[][] = [];

      try {
        // Use immediately available BGE embedding service (downloaded when page loaded)
        console.log("🧠 Generating embeddings with pre-loaded BGE model...");

        // Generate embeddings for each chunk in main thread
        const chunkTexts = chunkedData.chunks.map(
          (chunk: any) => chunk.content
        );

        vectors = await this.embeddingService.generateEmbeddings(
          chunkTexts,
          (current: number, total: number) => {
            const embeddingProgress = Math.round(50 + (current / total) * 45); // Scale to 50-95%
            callbacks.onProgress({
              status: "embedding",
              message: `Generating embeddings... ${current}/${total}`,
              progress: embeddingProgress,
              current,
              total,
            });
          }
        );

        console.log(`✅ Generated ${vectors.length} embeddings with BGE model`);
      } catch (embeddingError) {
        console.warn(
          "⚠️ Embedding generation failed, proceeding without embeddings:",
          embeddingError
        );
        // Create empty vectors array as fallback
        vectors = chunkedData.chunks.map(() => []);
      }

      // Complete processing
      callbacks.onProgress({
        status: "complete",
        message: "Document processing complete",
        progress: 100,
      });

      const processedDocument: ProcessedDocument = {
        id: chunkedData.id,
        title: chunkedData.title,
        content: chunkedData.content,
        metadata: chunkedData.metadata,
        chunks: chunkedData.chunks,
        vectors: vectors,
      };

      callbacks.onComplete(processedDocument);
      this.finishProcessing();
    } catch (error) {
      console.error("❌ Failed to process chunked document:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      callbacks.onError(`Document processing failed: ${errorMessage}`);
      this.finishProcessing();
    }
  }

  private finishProcessing(): void {
    this.currentProcessing = null;
    this.currentCallbacks = null;

    // Process next document in queue
    if (this.pendingDocuments.length > 0) {
      const nextDocument = this.pendingDocuments.shift();
      if (nextDocument) {
        console.log(
          `📋 Processing next queued document: ${nextDocument.documentData.title}`
        );
        this.startProcessing(
          nextDocument.documentData,
          nextDocument.onProgress,
          nextDocument.onComplete,
          nextDocument.onError
        );
      }
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.embeddingService.available) {
      throw new Error("Embedding service not available");
    }

    return this.embeddingService.generateEmbedding(text);
  }

  get isProcessing(): boolean {
    return this.currentProcessing !== null;
  }

  get ready(): boolean {
    return this.workerReady;
  }

  get embeddingAvailable(): boolean {
    return this.embeddingService.available;
  }

  cleanup(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.workerReady = false;
    this.currentProcessing = null;
    this.pendingDocuments = [];
    this.embeddingService.destroy();
  }
}

// Singleton instance
let documentProcessorInstance: DocumentProcessor | null = null;

export function getDocumentProcessor(): DocumentProcessor {
  if (!documentProcessorInstance) {
    documentProcessorInstance = new DocumentProcessor();
  }
  return documentProcessorInstance;
}
