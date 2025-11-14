// Web Worker for document chunking and embedding generation
// This runs in a separate thread to avoid blocking the main UI

import { pipeline, env } from '@xenova/transformers';
import {
  LOCAL_EMBEDDING_MODEL_ID,
  CLIENT_EMBEDDINGS_BASE_PATH,
  CLIENT_ONNX_RUNTIME_PATH,
} from "@/lib/transformers/modelConfig";

env.allowLocalModels = true;
env.allowRemoteModels = false;
env.useBrowserCache = false;
env.localModelPath = CLIENT_EMBEDDINGS_BASE_PATH;
env.backends.onnx.wasmPaths = CLIENT_ONNX_RUNTIME_PATH;

// Worker message types
export interface WorkerMessage {
  type: 'init' | 'processDocument' | 'processChunks' | 'generateEmbedding';
  data?: any;
}

export interface WorkerResponse {
  type: 'init_complete' | 'progress' | 'chunkComplete' | 'documentComplete' | 'embeddingComplete' | 'error';
  data?: any;
}

class EmbeddingWorker {
  private pipeline: any = null;
  private initialized = false;

  async init() {
    try {
      console.log('🔧 Web Worker: Initializing embedding pipeline...');
      
      // Initialize the embedding pipeline in the worker
      this.pipeline = await pipeline('feature-extraction', LOCAL_EMBEDDING_MODEL_ID, {
        quantized: true,
        progress_callback: (progress: any) => {
          self.postMessage({
            type: 'progress',
            data: {
              status: 'initializing',
              message: `Preparing model: ${progress.name || 'bundle'}`,
              progress: progress.progress || 0
            }
          } as WorkerResponse);
        }
      });

      this.initialized = true;
      console.log('✅ Web Worker: Embedding pipeline initialized');
      
      self.postMessage({
        type: 'init_complete',
        data: { message: 'Embedding pipeline ready' }
      } as WorkerResponse);

    } catch (error) {
      console.error('❌ Web Worker: Failed to initialize embedding pipeline:', error);
      self.postMessage({
        type: 'error',
        data: { message: `Failed to initialize: ${(error as Error).message}` }
      } as WorkerResponse);
    }
  }

  async processDocument(documentData: {
    id: string;
    title: string;
    content: string;
    metadata: any;
  }) {
    if (!this.initialized || !this.pipeline) {
      throw new Error('Worker not initialized');
    }

    try {
      console.log('📄 Web Worker: Processing document:', documentData.title);
      
      // Step 1: Create chunks
      self.postMessage({
        type: 'progress',
        data: {
          status: 'chunking',
          message: 'Creating text chunks...',
          progress: 10
        }
      } as WorkerResponse);

      const chunks = this.createWordBasedChunks(documentData.content, 250, 50);
      const maxChunks = Math.min(chunks.length, 200); // Limit to 200 chunks
      
      console.log(`📊 Web Worker: Created ${chunks.length} chunks, processing first ${maxChunks}`);

      if (chunks.length > 200) {
        console.warn(`⚠️ Web Worker: Large document with ${chunks.length} chunks, limiting to first 200 chunks`);
      }

      // Step 2: Process chunks in batches for better performance
      const batchSize = 3; // Process 3 chunks in parallel
      const chunksToProcess = chunks.slice(0, maxChunks);
      const processedChunks: any[] = [];
      
      for (let i = 0; i < chunksToProcess.length; i += batchSize) {
        const batch = chunksToProcess.slice(i, i + batchSize);
        const batchPromises = batch.map(async (chunk, batchIndex) => {
          const globalIndex = i + batchIndex;
          
          try {
            // Generate embedding for this chunk
            const output = await this.pipeline!(chunk.content, {
              pooling: 'mean',
              normalize: true,
            });
            
            const embedding = Array.from(output.data) as number[];
            
            const processedChunk = {
              index: globalIndex,
              content: chunk.content,
              wordCount: chunk.wordCount,
              embedding
            };

            // Send progress update
            self.postMessage({
              type: 'progress',
              data: {
                status: 'embedding',
                message: `Processing chunk ${globalIndex + 1}/${maxChunks}`,
                progress: 20 + Math.round((globalIndex / maxChunks) * 70), // 20-90%
                chunkIndex: globalIndex,
                totalChunks: maxChunks
              }
            } as WorkerResponse);

            return processedChunk;
          } catch (chunkError) {
            console.error(`❌ Web Worker: Failed to process chunk ${globalIndex}:`, chunkError);
            return null;
          }
        });

        // Wait for this batch to complete
        const batchResults = await Promise.all(batchPromises);
        processedChunks.push(...batchResults.filter(chunk => chunk !== null));

        // Small delay to prevent overwhelming the system
        if (i + batchSize < chunksToProcess.length) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      // Step 3: Send completion
      self.postMessage({
        type: 'documentComplete',
        data: {
          document: {
            id: documentData.id,
            title: documentData.title,
            content: documentData.content,
            metadata: documentData.metadata,
            chunks: processedChunks.map(chunk => ({
              index: chunk.index,
              content: chunk.content,
              wordCount: chunk.wordCount
            })),
            vectors: processedChunks.map(chunk => chunk.embedding)
          },
          stats: {
            totalChunks: chunksToProcess.length,
            processedChunks: processedChunks.length,
            skippedChunks: chunksToProcess.length - processedChunks.length
          }
        }
      } as WorkerResponse);

      console.log(`✅ Web Worker: Document processing complete - ${processedChunks.length} chunks processed`);

    } catch (error) {
      console.error('❌ Web Worker: Document processing failed:', error);
      self.postMessage({
        type: 'error',
        data: { message: `Processing failed: ${(error as Error).message}` }
      } as WorkerResponse);
    }
  }

  private createWordBasedChunks(text: string, wordsPerChunk: number, overlapWords: number = 0): Array<{content: string, wordCount: number, hasOverlap: boolean}> {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const chunks: Array<{content: string, wordCount: number, hasOverlap: boolean}> = [];
    
    let currentPosition = 0;
    let chunkIndex = 0;
    const stepSize = Math.max(wordsPerChunk - overlapWords, wordsPerChunk / 2);
    
    console.log(`📊 TS Worker: Chunking ${words.length} words into ${wordsPerChunk}-word chunks with ${overlapWords} word overlap`);
    
    while (currentPosition < words.length) {
      const endPosition = Math.min(currentPosition + wordsPerChunk, words.length);
      const chunkWords = words.slice(currentPosition, endPosition);
      const content = chunkWords.join(' ');
      
      chunks.push({
        content: content,
        wordCount: chunkWords.length,
        hasOverlap: chunkIndex > 0 && overlapWords > 0
      });
      
      chunkIndex++;
      currentPosition += stepSize;
      
      // Break if we've processed all text
      if (endPosition >= words.length) {
        break;
      }
    }
    
    console.log(`✅ TS Worker: Created ${chunks.length} chunks with overlap`);
    return chunks;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!this.initialized || !this.pipeline) {
      throw new Error('Worker not initialized');
    }

    try {
      console.log('🔍 Web Worker: Generating embedding for query...');
      
      const output = await this.pipeline(text, {
        pooling: 'mean',
        normalize: true,
      });
      
      const embedding = Array.from(output.data) as number[];
      
      self.postMessage({
        type: 'embeddingComplete',
        data: { embedding }
      } as WorkerResponse);
      
      return embedding;
    } catch (error) {
      console.error('❌ Web Worker: Failed to generate embedding:', error);
      self.postMessage({
        type: 'error',
        data: { message: `Embedding generation failed: ${(error as Error).message}` }
      } as WorkerResponse);
      throw error;
    }
  }
}

// Initialize worker instance
const worker = new EmbeddingWorker();

// Handle messages from main thread
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type, data } = event.data;
  
  // Handle messages asynchronously but don't make the handler itself async
  (async () => {
    try {
      switch (type) {
        case 'init':
          await worker.init();
          break;
          
        case 'processDocument':
          await worker.processDocument(data);
          break;
          
        case 'generateEmbedding':
          await worker.generateEmbedding(data.text);
          break;
          
        default:
          console.warn('🔧 Web Worker: Unknown message type:', type);
          self.postMessage({
            type: 'error',
            data: { message: `Unknown message type: ${type}` }
          } as WorkerResponse);
      }
    } catch (error) {
      console.error('❌ Web Worker: Error handling message:', error);
      self.postMessage({
        type: 'error',
        data: { message: `Worker error: ${(error as Error).message}` }
      } as WorkerResponse);
    }
  })();
};

// Types exported at the top of the file 
