/**
 * EmbeddingService for main thread ML operations
 * Handles Xenova transformers.js loading and embedding generation
 * Optimized for immediate background download
 */

import { pipeline, env } from '@xenova/transformers';
import {
  LOCAL_EMBEDDING_MODEL_ID,
  CLIENT_EMBEDDINGS_BASE_PATH,
  CLIENT_ONNX_RUNTIME_PATH,
} from "@/lib/transformers/modelConfig";

export interface EmbeddingProgress {
  message: string;
  progress: number;
}

export type EmbeddingProgressCallback = (progress: EmbeddingProgress) => void;

class EmbeddingService {
  private static instance: EmbeddingService | null = null;
  private model: any = null;
  private isInitialized = false;
  private isInitializing = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    // Configure Xenova to load models and ONNX runtime from bundled assets
    env.allowLocalModels = true;
    env.allowRemoteModels = false;
    env.useBrowserCache = false;
    env.localModelPath = CLIENT_EMBEDDINGS_BASE_PATH;
    env.backends.onnx.wasmPaths = CLIENT_ONNX_RUNTIME_PATH;
    console.log("🧠 Xenova environment configured for bundled embeddings");
  }

  static getInstance(): EmbeddingService {
    if (!EmbeddingService.instance) {
      EmbeddingService.instance = new EmbeddingService();
    }
    return EmbeddingService.instance;
  }

  async init(onProgress?: EmbeddingProgressCallback): Promise<void> {
    // If already initialized, return immediately
    if (this.isInitialized) {
      return;
    }

    // If initialization is in progress, wait for it
    if (this.isInitializing && this.initializationPromise) {
      return this.initializationPromise;
    }

    // Start immediate initialization
    this.isInitializing = true;
    this.initializationPromise = this.performImmediateInitialization(onProgress);
    
    try {
      await this.initializationPromise;
    } finally {
      this.isInitializing = false;
    }
  }

  private async performImmediateInitialization(onProgress?: EmbeddingProgressCallback): Promise<void> {
    try {
      console.log('🧠 Starting Xenova embedding service initialization...');
      
      onProgress?.({
        message: 'Checking for cached model...',
        progress: 5
      });

      // FIXED: Optimistic loading - assume cached and detect download if needed
      console.log('✅ Loading model (checking cache)...');
      onProgress?.({
        message: 'Loading model from cache...',
        progress: 20
      });

      console.log(`📦 Loading bundled model: ${LOCAL_EMBEDDING_MODEL_ID}`);
      
      onProgress?.({
        message: 'Loading from browser cache...',
        progress: 30
      });

      // Track progress efficiently with throttling
      let lastProgressReport = 0;
      let progressCounter = 0;
      
      // Use pipeline with optimized progress tracking
      this.model = await pipeline("feature-extraction", LOCAL_EMBEDDING_MODEL_ID, {
        progress_callback: (progress: any) => {
          progressCounter++;
          const now = Date.now();
          if (now - lastProgressReport < 500) {
            return;
          }
          lastProgressReport = now;

          if (progress.status === "ready") {
            onProgress?.({
              message: "Model loaded successfully",
              progress: 95,
            });
            console.log("✅ Model loaded successfully");
          }
        },
      });

      console.log("✅ Model loaded from bundled assets");

      onProgress?.({
        message: 'Embedding model ready',
        progress: 100
      });

      this.isInitialized = true;
      console.log('✅ EmbeddingService initialized successfully');

    } catch (error) {
      console.error('❌ EmbeddingService initialization failed:', error);
      this.isInitialized = false;
      this.model = null;
      throw error;
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    // Ensure initialized (should be immediate since we pre-load)
    if (!this.isInitialized) {
      throw new Error('EmbeddingService not initialized. Call init() first.');
    }

    if (!this.model) {
      throw new Error('EmbeddingService model not loaded.');
    }

    try {
      console.log(`🔍 Generating embedding for text (${text.length} chars)...`);
      
      const startTime = Date.now();
      
      // Generate embedding using Xenova
      const output = await this.model(text, {
        pooling: 'mean',
        normalize: true
      });

      // Convert to regular array
      const embedding = Array.from(output.data as number[]);
      
      const processingTime = Date.now() - startTime;
      console.log(`✅ Generated embedding: ${embedding.length} dimensions in ${processingTime}ms`);
      
      return embedding;

    } catch (error) {
      console.error('❌ Embedding generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Embedding generation failed: ${errorMessage}`);
    }
  }

  async generateEmbeddings(texts: string[], onProgress?: (current: number, total: number) => void): Promise<number[][]> {
    if (!this.isInitialized) {
      throw new Error('EmbeddingService not initialized. Call init() first.');
    }

    if (!this.model) {
      throw new Error('EmbeddingService model not loaded.');
    }

    console.log(`🔍 Generating embeddings for ${texts.length} texts...`);
    
    const embeddings: number[][] = [];
    const startTime = Date.now();

    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      
      try {
        console.log(`🔍 Generating embedding ${i + 1}/${texts.length}...`);
        const embedding = await this.generateEmbedding(text);
        embeddings.push(embedding);
        
        console.log(`✅ Generated embedding ${i + 1}/${texts.length}`);
        
        // Call progress callback AFTER successful generation
        onProgress?.(i + 1, texts.length);
        
        // Yield control to UI after EVERY embedding using requestAnimationFrame
        console.log(`⏸️ Yielding control to UI after embedding ${i + 1}/${texts.length}`);
        await new Promise(resolve => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 20); // Additional 20ms after frame
          });
        });
        
      } catch (error) {
        console.error(`❌ Failed to generate embedding for text ${i + 1}:`, error);
        // Use zero vector as fallback
        const dimension = embeddings.length > 0 ? embeddings[0].length : 384;
        embeddings.push(new Array(dimension).fill(0));
        
        // Still report progress even on error
        onProgress?.(i + 1, texts.length);
        
        // Yield control even on error using requestAnimationFrame
        await new Promise(resolve => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 20);
          });
        });
      }
    }

    const totalTime = Date.now() - startTime;
    console.log(`✅ Generated ${embeddings.length} embeddings in ${totalTime}ms`);

    return embeddings;
  }

  get available(): boolean {
    return this.isInitialized && this.model !== null;
  }

  get status(): 'uninitialized' | 'initializing' | 'ready' | 'error' {
    if (this.isInitialized) return 'ready';
    if (this.isInitializing) return 'initializing';
    return 'uninitialized';
  }

  destroy(): void {
    this.model = null;
    this.isInitialized = false;
    this.isInitializing = false;
    this.initializationPromise = null;
  }

  // FIXED: Cache detection no longer uses localStorage - method removed
}

// Export singleton instance
export const getEmbeddingService = (): EmbeddingService => {
  return EmbeddingService.getInstance();
};

export default EmbeddingService; 
