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
        // Use worker from public directory (works reliably in Next.js)
        const workerUrl = '/workers/embeddingWorker.js';
        this.worker = new Worker(workerUrl);

        // Set up message handler
        this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
          this.handleWorkerMessage(event.data);
        };

        this.worker.onerror = (error) => {
          console.error('❌ Document Processor: Worker error:', error);
          reject(new Error(`Worker error: ${error.message}`));
        };

        // Handle initialization response
        const initHandler = (event: MessageEvent<any>) => {
          if (event.data.type === 'init_complete') {
            this.workerReady = true;
            console.log('✅ Document Processor: Worker initialized');
            resolve();
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.error || 'Worker initialization failed'));
          } else if (event.data.type === 'progress' && onProgress) {
            const progressData = event.data.data || {};
            onProgress({
              status: progressData.status || 'loading',
              message: progressData.status === 'loading_model' ? 'Loading AI model...' : 'Initializing...',
              progress: progressData.status === 'ready' ? 100 : 50
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
        console.warn('⚠️  Document Processor: Running in fallback mode without worker');
        
        // Set up fallback mode - mark as ready but without worker
        this.workerReady = false;
        this.worker = null;
        
        // Resolve anyway to allow the app to continue without workers
        resolve();
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
    if (!this.worker) {
      // Fallback: Simple processing without embeddings
      console.warn('⚠️  Document Processor: Processing without worker (no embeddings)');
      
      onProgress({
        status: 'chunking',
        message: 'Processing document in fallback mode...',
        progress: 50
      });
      
      // Simple text chunking without embeddings
      const chunks = this.simpleChunk(documentData.content);
      
      const processedDoc: ProcessedDocument = {
        id: documentData.id,
        title: documentData.title,
        content: documentData.content,
        metadata: documentData.metadata,
        chunks: chunks.map((content: string, index: number) => ({
          index,
          content,
          wordCount: content.split(' ').length
        })),
        vectors: [] // No embeddings in fallback mode
      };
      
      onProgress({
        status: 'complete',
        message: 'Document processed (fallback mode)',
        progress: 100
      });
      
      onComplete(processedDoc);
      return;
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
      type: 'process_document',
      data: documentData,
      id: documentData.id
    });
  }

  private handleWorkerMessage(response: any) {
    const callbacks = (this as any).currentCallbacks;
    if (!callbacks) return;

    switch (response.type) {
      case 'progress':
        const progressData = response.data || {};
        let message = 'Processing...';
        let progress = 0;
        
        if (progressData.status === 'processing') {
          message = `Processing chunk ${progressData.current || 0} of ${progressData.total || 0}`;
          progress = progressData.current && progressData.total ? 
            Math.round((progressData.current / progressData.total) * 100) : 0;
        }
        
        callbacks.onProgress({
          status: progressData.status || 'chunking',
          message,
          progress,
          chunkIndex: progressData.current,
          totalChunks: progressData.total
        });
        break;

      case 'document_processed':
        const document = response.data as ProcessedDocument;
        console.log(`✅ Document Processor: Completed processing ${document.title}`);
        
        callbacks.onComplete(document);
        this.processNext();
        break;

      case 'error':
        console.error('❌ Document Processor: Processing error:', response.error);
        callbacks.onError(response.error);
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

  private simpleChunk(content: string): string[] {
    // Simple text chunking without embeddings (fallback)
    const maxChunkSize = 500; // words
    const words = content.split(' ');
    const chunks: string[] = [];
    
    for (let i = 0; i < words.length; i += maxChunkSize) {
      chunks.push(words.slice(i, i + maxChunkSize).join(' '));
    }
    
    return chunks.length > 0 ? chunks : [content];
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.worker) {
      console.warn('⚠️  Document Processor: Cannot generate embedding without worker');
      return []; // Return empty array in fallback mode
    }

    return new Promise((resolve, reject) => {
      const requestId = Date.now().toString();
      
      // Set up one-time message handler for this embedding request
      const embeddingHandler = (event: MessageEvent<any>) => {
        if (event.data.id === requestId) {
          this.worker?.removeEventListener('message', embeddingHandler);
          
          if (event.data.type === 'embedding_generated') {
            resolve(event.data.data);
          } else if (event.data.type === 'error') {
            reject(new Error(event.data.error || 'Embedding generation failed'));
          }
        }
      };

      this.worker?.addEventListener('message', embeddingHandler);

      // Send embedding request to worker
      this.worker?.postMessage({
        type: 'generate_embedding',
        data: { text },
        id: requestId
      });

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