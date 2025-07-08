// Document Processor Manager - handles Web Worker communication and progress updates
import type { WorkerMessage, WorkerResponse } from './embeddingWorker';

export interface ProcessingProgress {
  status: 'downloading' | 'chunking' | 'embedding' | 'complete' | 'error';
  message: string;
  progress: number; // 0-100
  chunkIndex?: number;
  totalChunks?: number;
}

export interface ProcessedDocument {
  id: string;
  title: string;
  content: string;
  metadata: any;
  chunks: Array<{
    index: number;
    content: string;
    wordCount: number;
  }>;
  vectors: number[][];
}

export type ProgressCallback = (progress: ProcessingProgress) => void;

export class DocumentProcessor {
  private worker: Worker | null = null;
  private workerReady = false;
  private pendingDocuments: Array<{
    documentData: any;
    onProgress: ProgressCallback;
    onComplete: (document: ProcessedDocument) => void;
    onError: (error: string) => void;
  }> = [];
  private currentProcessing: string | null = null;

  async init(onProgress?: ProgressCallback): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Create Web Worker
        this.worker = new Worker(
          new URL('./embeddingWorker.ts', import.meta.url),
          { type: 'module' }
        );

        // Set up message handler
        this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
          this.handleWorkerMessage(event.data);
        };

        this.worker.onerror = (error) => {
          console.error('❌ Document Processor: Worker error:', error);
          reject(new Error(`Worker error: ${error.message}`));
        };

        // Handle initialization response
        const initHandler = (event: MessageEvent<WorkerResponse>) => {
          if (event.data.type === 'initialized') {
            this.workerReady = true;
            console.log('✅ Document Processor: Worker initialized');
            resolve();
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.data?.message || 'Worker initialization failed'));
          } else if (event.data.type === 'progress' && onProgress) {
            onProgress({
              status: event.data.data.status,
              message: event.data.data.message,
              progress: event.data.data.progress || 0
            });
          }
        };

        this.worker.addEventListener('message', initHandler);

        // Initialize the worker
        this.worker.postMessage({ type: 'init' } as WorkerMessage);

        // Clean up the init handler after 30 seconds
        setTimeout(() => {
          this.worker?.removeEventListener('message', initHandler);
        }, 30000);

      } catch (error) {
        console.error('❌ Document Processor: Failed to create worker:', error);
        reject(error);
      }
    });
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
    if (!this.workerReady) {
      throw new Error('Document processor not initialized');
    }

    if (this.currentProcessing) {
      // Queue the document for processing
      this.pendingDocuments.push({
        documentData,
        onProgress,
        onComplete,
        onError
      });
      
      onProgress({
        status: 'chunking',
        message: 'Queued for processing...',
        progress: 0
      });
      
      console.log(`📋 Document Processor: Queued ${documentData.title} for processing`);
      return;
    }

    // Start processing immediately
    this.startProcessing(documentData, onProgress, onComplete, onError);
  }

  private startProcessing(
    documentData: any,
    onProgress: ProgressCallback,
    onComplete: (document: ProcessedDocument) => void,
    onError: (error: string) => void
  ) {
    this.currentProcessing = documentData.id;
    
    // Store callbacks for this document
    (this as any).currentCallbacks = {
      onProgress,
      onComplete,
      onError
    };

    console.log(`🚀 Document Processor: Starting to process ${documentData.title}`);
    
    // Send document to worker
    this.worker?.postMessage({
      type: 'processDocument',
      data: documentData
    } as WorkerMessage);
  }

  private handleWorkerMessage(response: WorkerResponse) {
    const callbacks = (this as any).currentCallbacks;
    if (!callbacks) return;

    switch (response.type) {
      case 'progress':
        callbacks.onProgress({
          status: response.data.status,
          message: response.data.message,
          progress: response.data.progress || 0,
          chunkIndex: response.data.chunkIndex,
          totalChunks: response.data.totalChunks
        });
        break;

      case 'documentComplete':
        const document = response.data.document as ProcessedDocument;
        console.log(`✅ Document Processor: Completed processing ${document.title}`);
        
        callbacks.onComplete(document);
        this.processNext();
        break;

      case 'error':
        console.error('❌ Document Processor: Processing error:', response.data.message);
        callbacks.onError(response.data.message);
        this.processNext();
        break;
    }
  }

  private processNext() {
    this.currentProcessing = null;
    (this as any).currentCallbacks = null;

    // Process next document in queue
    if (this.pendingDocuments.length > 0) {
      const next = this.pendingDocuments.shift()!;
      setTimeout(() => {
        this.startProcessing(
          next.documentData,
          next.onProgress,
          next.onComplete,
          next.onError
        );
      }, 100); // Small delay to prevent overwhelming
    }
  }

  getQueueLength(): number {
    return this.pendingDocuments.length + (this.currentProcessing ? 1 : 0);
  }

  isProcessing(): boolean {
    return this.currentProcessing !== null;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.workerReady) {
      throw new Error('Document processor not initialized');
    }

    return new Promise((resolve, reject) => {
      // Set up one-time message handler for this embedding request
      const embeddingHandler = (event: MessageEvent<WorkerResponse>) => {
        if (event.data.type === 'embeddingComplete') {
          this.worker?.removeEventListener('message', embeddingHandler);
          resolve(event.data.data.embedding);
        } else if (event.data.type === 'error') {
          this.worker?.removeEventListener('message', embeddingHandler);
          reject(new Error(event.data.data?.message || 'Embedding generation failed'));
        }
      };

      this.worker?.addEventListener('message', embeddingHandler);

      // Send embedding request to worker
      this.worker?.postMessage({
        type: 'generateEmbedding',
        data: { text }
      } as WorkerMessage);

      // Clean up handler after timeout
      setTimeout(() => {
        this.worker?.removeEventListener('message', embeddingHandler);
        reject(new Error('Embedding generation timeout'));
      }, 30000);
    });
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.workerReady = false;
    this.currentProcessing = null;
    this.pendingDocuments = [];
  }
}

// Singleton instance
let documentProcessor: DocumentProcessor | null = null;

export function getDocumentProcessor(): DocumentProcessor {
  if (!documentProcessor) {
    documentProcessor = new DocumentProcessor();
  }
  return documentProcessor;
} 