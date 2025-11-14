/**
 * RxDB Vector Store for DeepResearch
 * Implements full RAG pipeline using RxDB with IndexedDB and transformers.js
 * Supports documents, text files, and images with semantic search
 */

import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { getDocumentProcessor, type ProcessingProgress, type ProcessedDocument } from "../../lib/workers/DocumentProcessor";
import { getRAGTracker } from "../../lib/RAGTracker";
import { RAGDocument } from "../../types/rag";
import { OriginalAssetStore } from "@/lib/storage/OriginalAssetStore";

// Document type enum
export type DocumentType = 'userdocs' | 'virtual-docs' | 'ai-frames' | 'timecapsule' | 'bubblspace';

// Add RxDB plugins
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

// Document schema for RxDB
const documentSchema = {
  version: 5, // v5 normalizes chunk metadata + asset references
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    metadata: {
      type: 'object',
      properties: {
        filename: { type: 'string' },
        filesize: { type: 'number' },
        filetype: { type: 'string' },
        uploadedAt: { type: 'string' },
        source: { type: 'string' },
        description: { type: 'string' },
        isGenerated: { type: 'boolean' },
        documentType: { 
          type: 'string',
          enum: ['userdocs', 'virtual-docs', 'ai-frames', 'timecapsule', 'bubblspace']
        },
        // Additional fields from previous schema
        bubblSpaceId: { type: 'string' },
        category: { type: 'string' },
        createdAt: { type: 'string' },
        name: { type: 'string' },
        timeCapsuleId: { type: 'string' },
        type: { type: 'string' },
        updatedAt: { type: 'string' },
        // Enhanced metadata fields for BubblSpace and TimeCapsule
        color: { type: 'string' },
        isDefault: { type: 'boolean' },
        createdBy: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        version: { type: 'string' },
        privacy: { type: 'string' },
        difficulty: { type: 'string' },
        estimatedDuration: { type: 'number' },
        fullObject: { type: 'string' },
        // PDF-specific metadata
        pageCount: { type: 'number' },
        // Asset metadata
        originalAssetId: { type: ['string', 'null'] },
        hasOriginalAsset: { type: 'boolean' },
        hasImageAssets: { type: 'boolean' },
        previewAssetIds: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    },
    chunks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          startIndex: { type: 'number' },
          endIndex: { type: 'number' },
          pageNumber: { type: ['number', 'null'] },
          sectionTitle: { type: ['string', 'null'] },
          markers: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    },
    vectors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          chunkId: { type: 'string' },
          embedding: { type: 'array', items: { type: 'number' } }
        }
      }
    }
  },
  required: ['id', 'title', 'content']
};

export interface DocumentData {
  id: string;
  title: string;
  content: string;
  metadata: {
    filename: string;
    filesize: number;
    filetype: string;
    uploadedAt: string;
    source: string;
    description: string;
    isGenerated: boolean;
    documentType: DocumentType;
    // Additional fields from previous schema
    bubblSpaceId?: string;
    category?: string;
    createdAt?: string;
    name?: string;
    timeCapsuleId?: string;
    type?: string;
    updatedAt?: string;
    // Enhanced metadata fields for BubblSpace and TimeCapsule
    color?: string;
    isDefault?: boolean;
    createdBy?: string;
    tags?: string[];
    version?: string;
    privacy?: string;
    difficulty?: string;
    estimatedDuration?: number;
    fullObject?: string;
    // PDF-specific metadata
    pageCount?: number;
    // Asset metadata
    originalAssetId?: string | null;
    hasOriginalAsset?: boolean;
    hasImageAssets?: boolean;
    previewAssetIds?: string[];
  };
  chunks: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
    pageNumber?: number | null;
    sectionTitle?: string | null;
    markers?: string[];
  }>;
  vectors: Array<{
    chunkId: string;
    embedding: number[];
  }>;
}

export interface DocumentMetadata {
  id: string;
  filename: string;
  title: string;
  uploadedAt: string;
  description: string;
  metadata: DocumentData['metadata'];
  chunkCount: number;
}

export interface SearchResult {
  document: DocumentData;
  chunk: {
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  };
  similarity: number;
}

export class VectorStore {
  private database: any = null;
  private documentsCollection: any = null;
  private documentProcessor: any = null;
  private isInitialized = false;
  private readonly CHUNK_SIZE = 1000;
  private readonly CHUNK_OVERLAP = 200;
  private processorInitPromise: Promise<void> | null = null;
  private readonly autoPreloadEmbeddings =
    process.env.NEXT_PUBLIC_PRELOAD_EMBEDDINGS === "true";
  private originalAssetStore: OriginalAssetStore | null = null;
  
  // Private properties for status tracking
  private _processorAvailable = false;
  private _downloadProgress = 0;
  private _downloadStatus = 'idle';

  // Operation queue and locking for concurrent operations
  private operationQueue: Map<string, Promise<any>> = new Map();
  private operationLocks: Set<string> = new Set();

  // RAG tracking
  private ragTracker = getRAGTracker({
    enableTracking: true,
    enableVisualization: true,
    enablePerformanceMetrics: true,
    trackingLevel: 'detailed',
    realTimeUpdates: true
  });

  constructor() {
    console.log('🗂️ VectorStore constructor called');
    console.log('🔍 RAG Tracker initialized for VectorStore');
    if (typeof window !== "undefined" && typeof indexedDB !== "undefined") {
      this.originalAssetStore = new OriginalAssetStore();
    }
  }

  async importProcessedDocument(
    processedDoc: DocumentData,
    originalFile?: File
  ): Promise<string> {
    if (!this.isInitialized) {
      throw new Error("Vector Store not initialized");
    }

    const normalizedChunks = processedDoc.chunks.map((chunk, index) => ({
      id: chunk.id || `chunk_${processedDoc.id}_${index}`,
      content: chunk.content,
      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex,
      pageNumber: typeof chunk.pageNumber === "number" ? chunk.pageNumber : null,
      sectionTitle:
        typeof chunk.sectionTitle === "string" ? chunk.sectionTitle : null,
      markers: Array.isArray(chunk.markers) ? chunk.markers : [],
    }));

    let originalAssetId = processedDoc.metadata.originalAssetId ?? null;
    if (!originalAssetId && originalFile && this.originalAssetStore) {
      originalAssetId = await this.originalAssetStore.saveAsset(
        processedDoc.id,
        originalFile,
        {
          mimeType:
            originalFile.type || processedDoc.metadata.filetype || "application/octet-stream",
          type: "file",
        }
      );
    }

    const metadata = {
      ...processedDoc.metadata,
      originalAssetId,
      hasOriginalAsset: Boolean(originalAssetId),
    };

    await this.documentsCollection.documents.insert({
      ...processedDoc,
      metadata,
      chunks: normalizedChunks,
      vectors: processedDoc.vectors,
    });

    return processedDoc.id;
  }

  // Operation queue methods for handling concurrent operations
  private async queueOperation<T>(
    operationId: string,
    operation: () => Promise<T>
  ): Promise<T> {
    // If operation is already in progress, wait for it
    if (this.operationQueue.has(operationId)) {
      // console.log(`⏳ Operation ${operationId} already in progress, waiting...`);
      return this.operationQueue.get(operationId);
    }

    // Create and queue the operation
    const operationPromise = this.executeOperation(operationId, operation);
    this.operationQueue.set(operationId, operationPromise);

    try {
      const result = await operationPromise;
      return result;
    } finally {
      // Clean up after operation completes
      this.operationQueue.delete(operationId);
      this.operationLocks.delete(operationId);
    }
  }

  private async executeOperation<T>(
    operationId: string,
    operation: () => Promise<T>
  ): Promise<T> {
    // Check if operation is locked
    if (this.operationLocks.has(operationId)) {
      console.log(`🔒 Operation ${operationId} is locked, waiting...`);
      // Wait for lock to be released
      while (this.operationLocks.has(operationId)) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // Lock the operation
    this.operationLocks.add(operationId);
    // console.log(`🔒 Locked operation: ${operationId}`);

    try {
      const result = await operation();
      // 🌪️ SYNC STORM FIX: Reduce logging spam
      return result;
    } catch (error) {
      console.error(`❌ Operation ${operationId} failed:`, error);
      throw error;
    } finally {
      // Always unlock
      this.operationLocks.delete(operationId);
      // console.log(`🔓 Unlocked operation: ${operationId}`);
    }
  }

  async init(): Promise<void> {
    try {
      console.log('🗂️ Initializing RxDB Vector Store...');

      // Initialize document processor (Web Worker) and START IMMEDIATE XENOVA DOWNLOAD
      console.log('🤖 Loading document processor...');
      this.documentProcessor = getDocumentProcessor();
      
      if (this.autoPreloadEmbeddings) {
        console.log('🧠 Auto-preloading embeddings (NEXT_PUBLIC_PRELOAD_EMBEDDINGS=true)...');
        this.startProcessorInitialization();
      } else {
        console.log('⏸️ Skipping automatic embedding download; will initialize when first needed.');
        this._downloadStatus = 'idle';
      }

      // Create RxDB database with validation wrapper (continues immediately)
      console.log('📚 Creating RxDB database...');
      const storage = wrappedValidateAjvStorage({
        storage: getRxStorageDexie()
      });
      
      // Try to create database, handle schema conflicts
      try {
        this.database = await createRxDatabase({
          name: 'deepresearch_vectorstore',
          storage: storage,
          ignoreDuplicate: true
        });

        // Add documents collection with migration support
        console.log('📄 Creating documents collection...');
        this.documentsCollection = await this.database.addCollections({
          documents: {
            schema: documentSchema,
            migrationStrategies: {
              // Migration from version 0 to version 1
              1: function(oldDoc: any) {
                // Migrate old documents to new schema
                const newDoc = {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    // Ensure all required fields exist
                    filename: oldDoc.metadata.filename || oldDoc.metadata.name || oldDoc.title,
                    filesize: oldDoc.metadata.filesize || 0,
                    filetype: oldDoc.metadata.filetype || 'unknown',
                    uploadedAt: oldDoc.metadata.uploadedAt || oldDoc.metadata.createdAt || new Date().toISOString(),
                    source: oldDoc.metadata.source || 'unknown',
                    description: oldDoc.metadata.description || '',
                    isGenerated: oldDoc.metadata.isGenerated || false,
                    // Preserve existing fields
                    bubblSpaceId: oldDoc.metadata.bubblSpaceId,
                    category: oldDoc.metadata.category,
                    createdAt: oldDoc.metadata.createdAt,
                    name: oldDoc.metadata.name,
                    timeCapsuleId: oldDoc.metadata.timeCapsuleId,
                    type: oldDoc.metadata.type
                  }
                };
                return newDoc;
              },
              // Migration from version 1 to version 2 - add documentType field
              2: function(oldDoc: any) {
                // Determine document type based on existing metadata
                let documentType: DocumentType = 'userdocs'; // default

                if (oldDoc.metadata) {
                  if (oldDoc.metadata.source === 'generated' || oldDoc.metadata.isGenerated) {
                    documentType = 'ai-frames';
                  } else if (oldDoc.metadata.type === 'timecapsule' || oldDoc.metadata.timeCapsuleId) {
                    documentType = 'timecapsule';
                  } else if (oldDoc.metadata.bubblSpaceId) {
                    documentType = 'bubblspace';
                  } else if (oldDoc.metadata.source === 'websearch' || oldDoc.metadata.source === 'scraping') {
                    documentType = 'virtual-docs';
                  }
                }

                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    documentType: documentType
                  }
                };
              },
              // Migration from version 2 to version 3 - add pageCount field for PDF documents
              3: function(oldDoc: any) {
                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    // Preserve existing pageCount if it was somehow stored, otherwise use undefined
                    // New PDFs will have actual pageCount, existing PDFs will need re-upload
                    pageCount: oldDoc.metadata.pageCount
                  }
                };
              },
              // Migration from version 3 to version 4 - add asset metadata + preview fields
              4: function(oldDoc: any) {
                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    hasOriginalAsset: Boolean(oldDoc.metadata?.originalAssetId),
                    hasImageAssets: oldDoc.metadata?.hasImageAssets ?? false,
                    previewAssetIds: oldDoc.metadata?.previewAssetIds || []
                  }
                };
              },
              // Migration from version 4 to version 5 - normalize chunk metadata
              5: function(oldDoc: any) {
                const normalizedChunks = Array.isArray(oldDoc.chunks)
                  ? oldDoc.chunks.map((chunk: any) => ({
                      ...chunk,
                      pageNumber:
                        typeof chunk.pageNumber === "number" ? chunk.pageNumber : null,
                      sectionTitle:
                        typeof chunk.sectionTitle === "string"
                          ? chunk.sectionTitle
                          : undefined,
                      markers: Array.isArray(chunk.markers) ? chunk.markers : []
                    }))
                  : [];
                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    hasOriginalAsset: Boolean(oldDoc.metadata?.originalAssetId),
                    hasImageAssets: oldDoc.metadata?.hasImageAssets ?? false,
                    previewAssetIds: Array.isArray(oldDoc.metadata?.previewAssetIds)
                      ? oldDoc.metadata.previewAssetIds
                      : []
                  },
                  chunks: normalizedChunks
                };
              }
            }
          }
        });

      } catch (schemaError: any) {
        if (schemaError.code === 'DB6') {
          console.warn('🔄 Schema conflict detected, clearing old database and recreating...');
          
          // Clear IndexedDB database manually
          if (typeof window !== 'undefined' && window.indexedDB) {
            await this.clearIndexedDB('deepresearch_vectorstore');
          }
          
          // Recreate database with new schema
          this.database = await createRxDatabase({
            name: 'deepresearch_vectorstore',
            storage: storage,
            ignoreDuplicate: true
          });

          this.documentsCollection = await this.database.addCollections({
            documents: {
              schema: documentSchema,
              migrationStrategies: {
                // Migration from version 0 to version 1
                1: function(oldDoc: any) {
                  // Migrate old documents to new schema
                  const newDoc = {
                    ...oldDoc,
                    metadata: {
                      ...oldDoc.metadata,
                      // Ensure all required fields exist
                      filename: oldDoc.metadata.filename || oldDoc.metadata.name || oldDoc.title,
                      filesize: oldDoc.metadata.filesize || 0,
                      filetype: oldDoc.metadata.filetype || 'unknown',
                      uploadedAt: oldDoc.metadata.uploadedAt || oldDoc.metadata.createdAt || new Date().toISOString(),
                      source: oldDoc.metadata.source || 'unknown',
                      description: oldDoc.metadata.description || '',
                      isGenerated: oldDoc.metadata.isGenerated || false,
                      // Preserve existing fields
                      bubblSpaceId: oldDoc.metadata.bubblSpaceId,
                      category: oldDoc.metadata.category,
                      createdAt: oldDoc.metadata.createdAt,
                      name: oldDoc.metadata.name,
                      timeCapsuleId: oldDoc.metadata.timeCapsuleId,
                      type: oldDoc.metadata.type
                    }
                  };
                  return newDoc;
                },
                // Migration from version 1 to version 2 - add documentType field
                2: function(oldDoc: any) {
                  // Determine document type based on existing metadata
                  let documentType: DocumentType = 'userdocs'; // default

                  if (oldDoc.metadata) {
                    if (oldDoc.metadata.source === 'generated' || oldDoc.metadata.isGenerated) {
                      documentType = 'ai-frames';
                    } else if (oldDoc.metadata.type === 'timecapsule' || oldDoc.metadata.timeCapsuleId) {
                      documentType = 'timecapsule';
                    } else if (oldDoc.metadata.bubblSpaceId) {
                      documentType = 'bubblspace';
                    } else if (oldDoc.metadata.source === 'websearch' || oldDoc.metadata.source === 'scraping') {
                      documentType = 'virtual-docs';
                    }
                  }

                  return {
                    ...oldDoc,
                    metadata: {
                      ...oldDoc.metadata,
                      documentType: documentType
                    }
                  };
                },
              // Migration from version 2 to version 3 - add pageCount field for PDF documents
              3: function(oldDoc: any) {
                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    // Preserve existing pageCount if it was somehow stored, otherwise use undefined
                    // New PDFs will have actual pageCount, existing PDFs will need re-upload
                    pageCount: oldDoc.metadata.pageCount
                  }
                };
              },
              // Migration from version 3 to version 4 - asset metadata
              4: function(oldDoc: any) {
                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    hasOriginalAsset: Boolean(oldDoc.metadata?.originalAssetId),
                    hasImageAssets: oldDoc.metadata?.hasImageAssets ?? false,
                    previewAssetIds: oldDoc.metadata?.previewAssetIds || []
                  }
                };
              },
              // Migration from version 4 to version 5 - normalize chunk metadata
              5: function(oldDoc: any) {
                const normalizedChunks = Array.isArray(oldDoc.chunks)
                  ? oldDoc.chunks.map((chunk: any) => ({
                      ...chunk,
                      pageNumber:
                        typeof chunk.pageNumber === "number" ? chunk.pageNumber : null,
                      sectionTitle:
                        typeof chunk.sectionTitle === "string"
                          ? chunk.sectionTitle
                          : undefined,
                      markers: Array.isArray(chunk.markers) ? chunk.markers : []
                    }))
                  : [];
                return {
                  ...oldDoc,
                  metadata: {
                    ...oldDoc.metadata,
                    hasOriginalAsset: Boolean(oldDoc.metadata?.originalAssetId),
                    hasImageAssets: oldDoc.metadata?.hasImageAssets ?? false,
                    previewAssetIds: Array.isArray(oldDoc.metadata?.previewAssetIds)
                      ? oldDoc.metadata.previewAssetIds
                      : []
                  },
                  chunks: normalizedChunks
                };
              }
            }
          }
          });
          
          console.log('✅ Database recreated with new schema');
        } else {
          throw schemaError;
        }
      }

      this.isInitialized = true;
      console.log('✅ RxDB Vector Store initialized successfully');
      console.log('🧠 Xenova download running in background...');
      
      // Make instance available globally (like the original) - only in browser
      if (typeof window !== 'undefined') {
        (window as any).sharedVectorStore = this;
      }

    } catch (error) {
      console.error('❌ Vector Store initialization failed:', error);
      throw error;
    }
  }

  async addDocument(
    file: File, 
    content: string, 
    documentType: DocumentType = 'userdocs',
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // Enhanced ready state management
    const downloadStatus = this._downloadStatus;
    
    if (downloadStatus === 'downloading') {
      throw new Error('AI models are still downloading in the background. Please wait a moment and try again.');
    } else if (downloadStatus === 'error') {
      throw new Error('AI model download failed. Document upload requires AI processing capabilities.');
    } else if (!this.documentProcessor || !this._processorAvailable) {
      throw new Error('Document processing is unavailable. Please refresh the page and try again.');
    }

    // File size check - 50MB limit
    if (file.size > 50 * 1024 * 1024) {
      throw new Error(`File too large: ${file.name} (${this.formatFileSize(file.size)}). Please use files under 50MB.`);
    }

    console.log(`📄 Processing document: ${file.name}`);
    console.log(`📄 File size: ${this.formatFileSize(file.size)}, Content length: ${content.length} characters`);
    
    // Generate document ID
    const docId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Extract PDF metadata if available
    const pdfMetadata = (file as any)._pdfMetadata;

    // Prepare document data for Web Worker
    const documentData = {
      id: docId,
      title: file.name,
      content: content,
      metadata: {
        filename: file.name,
        filesize: file.size,
        filetype: file.type || 'unknown',
        uploadedAt: new Date().toISOString(),
        source: 'upload',
        description: `Uploaded file: ${file.name}`,
        isGenerated: false,
        documentType: documentType,
        // Include PDF page count if available
        ...(pdfMetadata?.pageCount && { pageCount: pdfMetadata.pageCount })
      }
    };

    await this.ensureProcessorReady();

    return new Promise((resolve, reject) => {
      // Use Web Worker to process document
      this.documentProcessor.processDocument(
        documentData,
        // Progress callback
        (progress: ProcessingProgress) => {
          console.log(`📊 Document processing: ${progress.message} (${progress.progress}%)`);
          onProgress?.(progress);
        },
                 // Success callback
         async (processedDoc: ProcessedDocument) => {
           try {
                         // Convert chunks from Web Worker format to VectorStore format with unique IDs
            const chunkTimestamp = Date.now();
            const chunks = processedDoc.chunks.map((chunk, index) => {
              const chunkRandom = Math.random().toString(36).substring(2, 8);
              const uniqueId = `chunk_${processedDoc.id}_${chunkTimestamp}_${index}_${chunkRandom}`;
              const startIndex =
                typeof chunk.startIndex === "number" ? chunk.startIndex : index * 500;
              const endIndex =
                typeof chunk.endIndex === "number"
                  ? chunk.endIndex
                  : startIndex + chunk.content.length;
              return {
                id: uniqueId,
                content: chunk.content,
                startIndex,
                endIndex,
                pageNumber:
                  typeof chunk.pageNumber === "number" ? chunk.pageNumber : null,
                sectionTitle:
                  typeof chunk.sectionTitle === "string"
                    ? chunk.sectionTitle
                    : null,
                markers: Array.isArray(chunk.markers) ? chunk.markers : [],
              };
            });

            const metadata = {
              ...processedDoc.metadata,
              hasOriginalAsset: false,
              hasImageAssets: false,
              previewAssetIds: processedDoc.metadata?.previewAssetIds || []
            };

            // Convert to our DocumentData format
            const documentData: DocumentData = {
              id: processedDoc.id,
              title: processedDoc.title,
              content: processedDoc.content,
              metadata,
              chunks: chunks,
              vectors: processedDoc.vectors.map((embedding, index) => ({
                chunkId: chunks[index].id,
                embedding: embedding
              }))
             };

            // Insert into RxDB
            await this.documentsCollection.documents.insert(documentData);
            console.log(`✅ Document stored with ID: ${docId}`);
            console.log(`📊 Final stats: ${processedDoc.chunks.length} chunks, ${processedDoc.vectors.length} vectors`);

            // Verify pageCount was stored correctly (for PDF documents)
            if (documentData.metadata.pageCount !== undefined) {
              console.log(`📄 PDF page count stored: ${documentData.metadata.pageCount} pages`);
            }

            resolve(docId);
          } catch (error: any) {
            const errorMessage = error?.message || String(error);
            const errorCode = error?.code || error?.name || 'unknown';
            const errorStatus = error?.parameters?.writeError?.status;
            console.error(
              `❌ Failed to store processed document (code: ${errorCode}, status: ${errorStatus ?? 'n/a'}): ${errorMessage}`
            );
            reject(error instanceof Error ? error : new Error(errorMessage));
          }
        },
        // Error callback
        (error: string) => {
          console.error('❌ Document processing failed:', error);
          reject(new Error(error));
        }
      );
    });
  }

  /**
   * Add a virtual document from web search results
   */
  async addVirtualDocument(
    title: string,
    content: string,
    url: string,
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // Enhanced ready state management
    const downloadStatus = this._downloadStatus;
    
    if (downloadStatus === 'downloading') {
      throw new Error('AI models are still downloading in the background. Please wait a moment and try again.');
    } else if (downloadStatus === 'error') {
      throw new Error('AI model download failed. Document processing requires AI processing capabilities.');
    } else if (!this.documentProcessor || !this._processorAvailable) {
      throw new Error('Document processing is unavailable. Please refresh the page and try again.');
    }

    console.log(`📄 Processing virtual document: ${title} from ${url}`);
    console.log(`📄 Content length: ${content.length} characters`);
    
    // Generate document ID with virtual prefix
    const docId = `virtual_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Prepare document data for Web Worker
    const documentData = {
      id: docId,
      title: title,
      content: content,
      metadata: {
        filename: title,
        filesize: content.length,
        filetype: 'text/html',
        uploadedAt: new Date().toISOString(),
        source: 'websearch',
        description: `Web search result: ${title}`,
        isGenerated: false,
        documentType: 'virtual-docs' as DocumentType,
        url: url
      }
    };

    await this.ensureProcessorReady();

    return new Promise((resolve, reject) => {
      // Use Web Worker to process document
      this.documentProcessor.processDocument(
        documentData,
        // Progress callback
        (progress: ProcessingProgress) => {
          console.log(`📊 Virtual document processing: ${progress.message} (${progress.progress}%)`);
          onProgress?.(progress);
        },
        // Success callback
        async (processedDoc: ProcessedDocument) => {
          try {
            // Convert chunks from Web Worker format to VectorStore format with unique IDs
            const chunkTimestamp = Date.now();
            const chunks = processedDoc.chunks.map((chunk, index) => {
              const chunkRandom = Math.random().toString(36).substring(2, 8);
              const uniqueId = `chunk_${processedDoc.id}_${chunkTimestamp}_${index}_${chunkRandom}`;
              const startIndex =
                typeof chunk.startIndex === "number" ? chunk.startIndex : index * 500;
              const endIndex =
                typeof chunk.endIndex === "number"
                  ? chunk.endIndex
                  : startIndex + chunk.content.length;
              return {
                id: uniqueId,
                content: chunk.content,
                startIndex,
                endIndex,
                pageNumber:
                  typeof chunk.pageNumber === "number" ? chunk.pageNumber : null,
                sectionTitle:
                  typeof chunk.sectionTitle === "string"
                    ? chunk.sectionTitle
                    : null,
                markers: Array.isArray(chunk.markers) ? chunk.markers : [],
              };
            });

            const metadata = {
              ...processedDoc.metadata,
              originalAssetId: processedDoc.metadata?.originalAssetId ?? null,
              hasOriginalAsset: Boolean(processedDoc.metadata?.originalAssetId),
              hasImageAssets: processedDoc.metadata?.hasImageAssets ?? false,
              previewAssetIds: processedDoc.metadata?.previewAssetIds || []
            };

            // Convert to our DocumentData format
            const documentData: DocumentData = {
              id: processedDoc.id,
              title: processedDoc.title,
              content: processedDoc.content,
              metadata,
              chunks: chunks,
              vectors: processedDoc.vectors.map((embedding, index) => ({
                chunkId: chunks[index].id,
                embedding: embedding
              }))
            };

            // Insert into RxDB
            await this.documentsCollection.documents.insert(documentData);
            console.log(`✅ Virtual document stored with ID: ${docId}`);
            console.log(`📊 Final stats: ${processedDoc.chunks.length} chunks, ${processedDoc.vectors.length} vectors`);
            
            resolve(docId);
          } catch (error: any) {
            const errorMessage = error?.message || String(error);
            const errorCode = error?.code || error?.name || 'unknown';
            const errorStatus = error?.parameters?.writeError?.status;
            console.error(
              `❌ Failed to store processed virtual document (code: ${errorCode}, status: ${errorStatus ?? 'n/a'}): ${errorMessage}`
            );
            reject(error instanceof Error ? error : new Error(errorMessage));
          }
        },
        // Error callback
        (error: string) => {
          console.error('❌ Virtual document processing failed:', error);
          reject(new Error(error));
        }
      );
    });
  }

  async addGeneratedDocument(
    title: string, 
    content: string,
    documentType: DocumentType = 'ai-frames',
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // Enhanced ready state management
    const downloadStatus = this._downloadStatus;
    
    if (downloadStatus === 'downloading') {
      throw new Error('AI models are still downloading in the background. Please wait a moment and try again.');
    } else if (downloadStatus === 'error') {
      throw new Error('AI model download failed. Document processing requires AI processing capabilities.');
    } else if (!this.documentProcessor || !this._processorAvailable) {
      throw new Error('Document processing is unavailable. Please refresh the page and try again.');
    }

    console.log(`📄 Processing generated document: ${title}`);
    console.log(`📄 Content length: ${content.length} characters`);
    
    // Generate document ID
    const docId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Prepare document data for Web Worker
    const documentData = {
      id: docId,
      title: title,
      content: content,
      metadata: {
        filename: title,
        filesize: content.length,
        filetype: 'text/markdown',
        uploadedAt: new Date().toISOString(),
        source: 'generated',
        description: `Generated research: ${title}`,
        isGenerated: true,
        documentType: documentType
      }
    };

    await this.ensureProcessorReady();

    return new Promise((resolve, reject) => {
      // Use Web Worker to process document
      this.documentProcessor.processDocument(
        documentData,
        // Progress callback
        (progress: ProcessingProgress) => {
          console.log(`📊 Generated document processing: ${progress.message} (${progress.progress}%)`);
          onProgress?.(progress);
        },
        // Success callback
        async (processedDoc: ProcessedDocument) => {
          try {
            // Convert chunks from Web Worker format to VectorStore format with unique IDs
            const chunkTimestamp = Date.now();
            const chunks = processedDoc.chunks.map((chunk, index) => {
              const chunkRandom = Math.random().toString(36).substring(2, 8);
              const uniqueId = `chunk_${processedDoc.id}_${chunkTimestamp}_${index}_${chunkRandom}`;
              const startIndex =
                typeof chunk.startIndex === "number" ? chunk.startIndex : index * 500;
              const endIndex =
                typeof chunk.endIndex === "number"
                  ? chunk.endIndex
                  : startIndex + chunk.content.length;
              return {
                id: uniqueId,
                content: chunk.content,
                startIndex,
                endIndex,
                pageNumber:
                  typeof chunk.pageNumber === "number" ? chunk.pageNumber : null,
                sectionTitle:
                  typeof chunk.sectionTitle === "string"
                    ? chunk.sectionTitle
                    : null,
                markers: Array.isArray(chunk.markers) ? chunk.markers : [],
              };
            });

            const metadata = {
              ...processedDoc.metadata,
              hasOriginalAsset: false,
              hasImageAssets: false,
              previewAssetIds: processedDoc.metadata?.previewAssetIds || []
            };

            // Convert to our DocumentData format
            const documentData: DocumentData = {
              id: processedDoc.id,
              title: processedDoc.title,
              content: processedDoc.content,
              metadata,
              chunks: chunks,
              vectors: processedDoc.vectors.map((embedding, index) => ({
                chunkId: chunks[index].id,
                embedding: embedding
              }))
            };

            // Insert into RxDB
            await this.documentsCollection.documents.insert(documentData);
            console.log(`✅ Generated document stored with ID: ${docId}`);
            console.log(`📊 Final stats: ${processedDoc.chunks.length} chunks, ${processedDoc.vectors.length} vectors`);
            
            resolve(docId);
          } catch (error: any) {
            const errorMessage = error?.message || String(error);
            const errorCode = error?.code || error?.name || 'unknown';
            const errorStatus = error?.parameters?.writeError?.status;
            console.error(
              `❌ Failed to store processed generated document (code: ${errorCode}, status: ${errorStatus ?? 'n/a'}): ${errorMessage}`
            );
            reject(error instanceof Error ? error : new Error(errorMessage));
          }
        },
        // Error callback
        (error: string) => {
          console.error('❌ Generated document processing failed:', error);
          reject(new Error(error));
        }
      );
    });
  }

  async getAllDocuments(): Promise<DocumentData[]> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    try {
      const docs = await this.documentsCollection.documents.find().exec();
      return docs.map((doc: any) => doc.toJSON());
    } catch (error) {
      console.error('❌ Failed to get documents:', error);
      throw error;
    }
  }

  /**
   * Get documents filtered by type - for DeepResearch to use only userdocs
   */
  async getDocumentsByType(documentType: DocumentType): Promise<DocumentData[]> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    try {
      const docs = await this.documentsCollection.documents
        .find({
          selector: {
            'metadata.documentType': documentType
          }
        })
        .exec();
      
      console.log(`📚 Retrieved ${docs.length} documents of type: ${documentType}`);
      return docs.map((doc: any) => doc.toJSON());
    } catch (error) {
      console.error(`❌ Failed to get documents of type ${documentType}:`, error);
      throw error;
    }
  }

  /**
   * Get document metadata only (without chunks) for DataInspector magic filtering
   */
  async getDocumentMetadata(documentTypes?: DocumentType[]): Promise<DocumentMetadata[]> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    try {
      // Filter by document types if specified
      let query = this.documentsCollection.documents.find();
      
      if (documentTypes && documentTypes.length > 0) {
        query = query.where('metadata.documentType').in(documentTypes);
        console.log(`🔍 getDocumentMetadata: Filtering for document types [${documentTypes.join(', ')}]`);
      } else {
        console.log(`🔍 getDocumentMetadata: Getting ALL document types (no filter)`);
      }
      
      const docs = await query.exec();
      
      // 🚨 AUTO-FIX: If we got 0 userdocs, check and fix documents automatically
      if (documentTypes?.includes('userdocs') && docs.length === 0) {
        console.log('🔍 DEBUG: No userdocs found, checking all documents...');
        const allDocs = await this.documentsCollection.documents.find().exec();
        console.log(`🔍 DEBUG: Total documents in database: ${allDocs.length}`);
        allDocs.forEach((doc: any, i: number) => {
          const docData = doc.toJSON();
          console.log(`🔍 DEBUG Doc ${i+1}: documentType="${docData.metadata?.documentType}", source="${docData.metadata?.source}", title="${docData.title}"`);
        });
        
        // 🔧 AUTO-FIX: If we find uploaded documents without documentType, fix them automatically
        console.log('🔧 AUTO-FIXING: Setting documentType for uploaded documents...');
        await this.fixDocumentTypes();
        
        // 🔄 RETRY: Try the query again after fixing
        console.log('🔄 RETRYING: Query after fixing documentTypes...');
        const retryQuery = this.documentsCollection.documents.find().where('metadata.documentType').in(documentTypes);
        const retryDocs = await retryQuery.exec();
        
        // Return the retry results
        const retryResult = retryDocs.map((doc: any) => {
          const docData = doc.toJSON();
          return {
            id: docData.id,
            filename: docData.metadata?.filename,
            title: docData.title,
            uploadedAt: docData.metadata?.uploadedAt,
            description: docData.metadata?.description,
            metadata: docData.metadata,
            chunkCount: docData.chunks?.length || 0,
            type: docData.type,
          };
        });
        console.log(`✅ RETRY SUCCESS: Found ${retryResult.length} userdocs after fix!`);
        return retryResult;
      }
      
      const result = docs.map((doc: any) => {
        const docData = doc.toJSON();
        return {
          id: docData.id,
          filename: docData.metadata?.filename || docData.title || 'untitled',
          title: docData.title,
          uploadedAt: docData.metadata?.uploadedAt || docData.uploadedAt,
          description: docData.metadata?.description || docData.description || '',
          metadata: docData.metadata,
          chunkCount: docData.chunks?.length || 0,
          type: docData.type, // Include type for verification
          // Don't include chunks - DataInspector will sample them later
        };
      });
      
      const filterInfo = documentTypes && documentTypes.length > 0 
        ? ` (filtered for: ${documentTypes.join(', ')})` 
        : ' (no filter - all types)';
      console.log(`🔍 getDocumentMetadata: Retrieved ${result.length} documents${filterInfo}`);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to get document metadata:', error);
      return [];
    }
  }

  // 🔧 DEBUG METHOD: Fix documents missing documentType
  async fixDocumentTypes(): Promise<void> {
    console.log('🔧 Fixing documents missing documentType...');
    const allDocs = await this.documentsCollection.documents.find().exec();
    
    for (const doc of allDocs) {
      const docData = doc.toJSON();
      if (!docData.metadata?.documentType) {
        console.log(`🔧 Fixing document "${docData.title}" - setting documentType to 'userdocs'`);
        await doc.update({
          $set: {
            'metadata.documentType': docData.metadata?.source === 'upload' ? 'userdocs' : 'virtual-docs'
          }
        });
      }
    }
    console.log('✅ Document types fixed!');
  }

  async getDocument(id: string): Promise<DocumentData | null> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    try {
      const doc = await this.documentsCollection.documents.findOne(id).exec();
      return doc ? doc.toJSON() : null;
    } catch (error) {
      console.error('❌ Failed to get document:', error);
      throw error;
    }
  }

  async getOriginalDocumentBlob(id: string): Promise<Blob | null> {
    if (!this.originalAssetStore) return null;
    try {
      const doc = await this.getDocument(id);
      if (!doc) return null;
      const assetId = doc.metadata?.originalAssetId || doc.id;
      if (!assetId) return null;
      const asset = await this.originalAssetStore.getAsset(assetId);
      return asset?.blob || null;
    } catch (error) {
      console.warn('Failed to read original document blob:', error);
      return null;
    }
  }

  async getOriginalDocumentObjectUrl(id: string): Promise<string | null> {
    const blob = await this.getOriginalDocumentBlob(id);
    if (!blob) return null;
    return URL.createObjectURL(blob);
  }

  async getChunkOrigin(docId: string, chunkId: string): Promise<{
    documentId: string;
    documentTitle: string;
    pageNumber: number | null;
    sectionTitle: string | null;
    startIndex: number;
    endIndex: number;
  } | null> {
    const doc = await this.getDocument(docId);
    if (!doc) return null;
    const chunk = doc.chunks.find((entry) => entry.id === chunkId);
    if (!chunk) return null;
    return {
      documentId: doc.id,
      documentTitle: doc.title,
      pageNumber: chunk.pageNumber ?? null,
      sectionTitle: chunk.sectionTitle ?? null,
      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex,
    };
  }

  async deleteDocument(id: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // ENHANCED: Use single operation ID per document to coordinate with upsert operations
    return this.queueOperation(
      `doc-${id}`,
      () => this.performDocumentDeletion(id)
    );
  }

  private async performDocumentDeletion(id: string): Promise<void> {
    const maxRetries = 5;
    let retryCount = 0;
    let backoffDelay = 100; // Start with 100ms delay

    while (retryCount < maxRetries) {
      try {
        console.log(`🗑️ Deleting document: ${id} (attempt ${retryCount + 1}/${maxRetries})`);
        
        // Use enhanced revision handling to get latest document
        const doc = await this.getLatestDocumentRevision(id);
        
        if (doc) {
          const docData = doc.toJSON();
          // Get current revision for debugging
          const currentRevision = doc._rev;
          console.log(`📋 Document ${id} found with revision: ${currentRevision}`);
          
          // Attempt deletion with proper error handling
          await doc.remove();
          console.log(`✅ Document deleted successfully: ${id}`);
          const assetId = docData.metadata?.originalAssetId || docData.id;
          if (assetId && this.originalAssetStore) {
            await this.originalAssetStore.deleteAsset(assetId);
          }
          return; // Success, exit retry loop
          
        } else {
          console.warn(`⚠️ Document not found: ${id}`);
          return; // Document doesn't exist, consider it "deleted"
        }
        
      } catch (error: any) {
        retryCount++;
        
        // Enhanced error handling for different types of conflicts
        if (error.name === 'RxError' && error.code === 'CONFLICT') {
          const dbRevision = error.parameters?.writeError?.documentInDb?._rev;
          const attemptedRevision = error.parameters?.writeError?.writeRow?.document?._rev;
          
          console.warn(`⚠️ Document deletion revision conflict for ${id}, retry ${retryCount}/${maxRetries}`, {
            errorCode: error.code,
            documentId: error.parameters?.id,
            currentRevision: dbRevision,
            attemptedRevision: attemptedRevision,
            revisionMismatch: dbRevision !== attemptedRevision,
            conflictType: 'deletion'
          });
          
          // For deletion conflicts, add extra delay to let other operations complete
          backoffDelay = Math.max(backoffDelay, 200); // Minimum 200ms for conflicts
        } else if (error.message?.includes('Document update conflict')) {
          console.warn(`⚠️ Document deletion update conflict for ${id}, retry ${retryCount}/${maxRetries}:`, error.message);
          // Add extra delay for general update conflicts
          backoffDelay = Math.max(backoffDelay, 150);
        } else {
          console.warn(`⚠️ Document deletion error for ${id}, retry ${retryCount}/${maxRetries}:`, error.message);
        }
        
        if (retryCount >= maxRetries) {
          console.error(`❌ Max retries exceeded for document deletion ${id}`, {
            finalError: error.message,
            errorCode: error.code,
            retryCount,
            maxRetries
          });
          throw error;
        }
        
        // Exponential backoff with jitter to reduce collision probability
        const jitter = Math.random() * 50; // 0-50ms random jitter
        const delay = backoffDelay + jitter;
        console.log(`⏳ Waiting ${Math.round(delay)}ms before deletion retry ${retryCount + 1}/${maxRetries}...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        backoffDelay *= 1.5; // Exponential backoff: 100ms, 150ms, 225ms, etc.
      }
    }
  }

  async searchSimilar(
    query: string, 
    threshold: number = 0.3, 
    limit: number = 10,
    options: {
      agentId?: string;
      sessionId?: string;
      queryType?: 'user_search' | 'agent_rag' | 'auto_enrichment';
      documentTypes?: DocumentType[];
    } = {}
  ): Promise<SearchResult[]> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // Enhanced ready state management for search
    const downloadStatus = this._downloadStatus;
    
    if (downloadStatus === 'downloading') {
      throw new Error('AI models are still downloading in the background. Search will be available shortly.');
    } else if (downloadStatus === 'error') {
      throw new Error('AI model download failed. Semantic search requires AI processing capabilities.');
    } else if (!this.documentProcessor || !this._processorAvailable) {
      throw new Error('Search is unavailable. Please refresh the page and try again.');
    }

    // Start RAG query tracking
    const startTime = Date.now();
    const queryId = this.ragTracker.startQuery(query, {
      agentId: options.agentId,
      sessionId: options.sessionId,
      queryType: options.queryType || 'user_search',
      searchParameters: {
        threshold,
        limit,
        searchMethod: 'semantic'
      }
    });

    console.log(`🔍 RAG Query ${queryId}: Searching for "${query}" with threshold: ${threshold}`);

    try {
      // Generate query embedding using Web Worker
      const embeddingStartTime = Date.now();
      const queryEmbedding = await this.documentProcessor.generateEmbedding(query);
      const embeddingTime = Date.now() - embeddingStartTime;

      console.log(`🧠 RAG Query ${queryId}: Generated embedding in ${embeddingTime}ms`);

      // Get documents (filtered by type if specified)
      const documentsStartTime = Date.now();
      let documents: DocumentData[];
      
      if (options.documentTypes && options.documentTypes.length > 0) {
        // Get documents filtered by types
        const filteredDocs: DocumentData[] = [];
        for (const docType of options.documentTypes) {
          const docsOfType = await this.getDocumentsByType(docType);
          filteredDocs.push(...docsOfType);
        }
        documents = filteredDocs;
        console.log(`📚 RAG Query ${queryId}: Filtered to ${documents.length} documents of types: ${options.documentTypes.join(', ')}`);
      } else {
        documents = await this.getAllDocuments();
        console.log(`📚 RAG Query ${queryId}: Retrieved all ${documents.length} documents`);
      }
      
      const documentsTime = Date.now() - documentsStartTime;

      const results: SearchResult[] = [];
      const similarityStartTime = Date.now();

      // Calculate similarities
      for (const doc of documents) {
        for (const vector of doc.vectors) {
          const similarity = this.cosineSimilarity(queryEmbedding, vector.embedding);
          
          if (similarity >= threshold) {
            const chunk = doc.chunks.find(c => c.id === vector.chunkId);
            if (chunk) {
              results.push({
                document: doc,
                chunk: chunk,
                similarity: similarity
              });
            }
          }
        }
      }

      const similarityTime = Date.now() - similarityStartTime;

      // Sort by similarity and limit results
      const rankingStartTime = Date.now();
      results.sort((a, b) => b.similarity - a.similarity);
      const limitedResults = results.slice(0, limit);
      const rankingTime = Date.now() - rankingStartTime;

      const totalTime = Date.now() - startTime;

      // Convert results to RAG format for tracking
      const ragDocuments: RAGDocument[] = limitedResults.map(result => ({
        id: result.document.id,
        title: result.document.title,
        similarity: result.similarity,
        chunkContent: result.chunk.content,
        chunkIndex: parseInt(result.chunk.id.split('_').pop() || '0'),
        source: result.document.metadata.source || 'unknown',
        metadata: result.document.metadata,
        retrievalContext: {
          queryId,
          retrievalTime: totalTime,
          processingTime: totalTime
        }
      }));

      // Complete RAG query tracking with detailed performance metrics
      this.ragTracker.completeQuery(queryId, ragDocuments, totalTime);

      // Log detailed performance breakdown
      console.log(`✅ RAG Query ${queryId} completed:`, {
        totalTime: `${totalTime}ms`,
        breakdown: {
          embedding: `${embeddingTime}ms`,
          documents: `${documentsTime}ms`, 
          similarity: `${similarityTime}ms`,
          ranking: `${rankingTime}ms`
        },
        results: `${limitedResults.length}/${results.length} (filtered by limit)`,
        avgSimilarity: limitedResults.length > 0 ? 
          (limitedResults.reduce((sum, r) => sum + r.similarity, 0) / limitedResults.length).toFixed(3) : '0',
        threshold,
        documentsScanned: documents.length,
        vectorsProcessed: documents.reduce((sum, doc) => sum + doc.vectors.length, 0)
      });

      return limitedResults;
    } catch (error) {
      const errorTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown search error';
      
      // Fail RAG query tracking
      this.ragTracker.failQuery(queryId, errorMessage);

      console.error(`❌ RAG Query ${queryId} failed after ${errorTime}ms:`, errorMessage);
      throw error;
    }
  }

  /**
   * Enhanced hybrid search combining semantic similarity and keyword matching
   * Addresses PatternGenerator's "useless search elements" issue
   */
  async searchHybrid(
    query: string,
    options: {
      semanticWeight?: number;
      keywordWeight?: number;
      adaptiveThreshold?: boolean;
      maxResults?: number;
      minSemanticThreshold?: number;
      documentTypes?: DocumentType[];
    } = {}
  ): Promise<SearchResult[]> {
    const {
      semanticWeight = 0.7,
      keywordWeight = 0.3,
      adaptiveThreshold = true,
      maxResults = 15,
      minSemanticThreshold = 0.2,
      documentTypes
    } = options;

    console.log(`🔍 Hybrid Search: "${query}" (semantic: ${semanticWeight}, keyword: ${keywordWeight})`);

    // 1. Semantic search with adaptive threshold
    const semanticThreshold = adaptiveThreshold 
      ? this.calculateAdaptiveThreshold(query, minSemanticThreshold)
      : minSemanticThreshold;

    const semanticResults = await this.searchSimilar(query, semanticThreshold, maxResults * 2, {
      documentTypes,
      queryType: 'agent_rag'
    });

    // 2. Keyword search using BM25-like scoring
    const keywordResults = await this.searchKeywords(query, {
      documentTypes,
      maxResults: maxResults * 2
    });

    // 3. Merge and rerank results
    const mergedResults = this.mergeSearchResults(
      semanticResults, 
      keywordResults, 
      semanticWeight, 
      keywordWeight
    );

    // 4. Apply semantic clustering to remove duplicates
    const clusteredResults = this.clusterSemanticResults(mergedResults);

    // 5. Final ranking and limit
    const finalResults = clusteredResults
      .sort((a, b) => (b as any).hybridScore - (a as any).hybridScore)
      .slice(0, maxResults);

    console.log(`✅ Hybrid Search: ${finalResults.length} results (from ${semanticResults.length} semantic + ${keywordResults.length} keyword)`);

    return finalResults;
  }

  /**
   * Calculate adaptive threshold based on query complexity and context
   */
  private calculateAdaptiveThreshold(query: string, baseThreshold: number): number {
    const words = query.trim().split(/\s+/);
    const hasSpecificTerms = /\b(project|method|technique|algorithm|model|system)\b/i.test(query);
    const isShortQuery = words.length <= 3;
    const hasQuotes = query.includes('"');

    let adaptedThreshold = baseThreshold;

    // Lower threshold for specific technical terms
    if (hasSpecificTerms) adaptedThreshold *= 0.8;

    // Higher threshold for very short queries to avoid noise
    if (isShortQuery) adaptedThreshold *= 1.3;

    // Lower threshold for quoted exact phrases
    if (hasQuotes) adaptedThreshold *= 0.7;

    // Clamp between reasonable bounds
    return Math.max(0.15, Math.min(0.5, adaptedThreshold));
  }

  /**
   * Keyword-based search using BM25-like scoring
   */
  private async searchKeywords(
    query: string, 
    options: { documentTypes?: DocumentType[]; maxResults?: number } = {}
  ): Promise<SearchResult[]> {
    const { documentTypes, maxResults = 20 } = options;
    
    const documents = documentTypes && documentTypes.length > 0
      ? await this.getFilteredDocuments(documentTypes)
      : await this.getAllDocuments();

    const queryTerms = query.toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 2); // Filter short words

    const results: (SearchResult & { keywordScore: number })[] = [];

    for (const doc of documents) {
      for (const chunk of doc.chunks) {
        const chunkText = chunk.content.toLowerCase();
        let score = 0;

        // BM25-like scoring
        for (const term of queryTerms) {
          const termFreq = (chunkText.match(new RegExp(`\\b${this.escapeRegex(term)}\\b`, 'g')) || []).length;
          if (termFreq > 0) {
            // Simple BM25 approximation
            score += Math.log(1 + termFreq) * (2.2 * termFreq) / (termFreq + 1.2);
          }
        }

        if (score > 0) {
          results.push({
            document: doc,
            chunk: chunk,
            similarity: Math.min(score / 10, 0.9), // Normalize to 0-0.9 range
            keywordScore: score
          });
        }
      }
    }

    return results
      .sort((a, b) => b.keywordScore - a.keywordScore)
      .slice(0, maxResults);
  }

  /**
   * Merge semantic and keyword results with weighted scoring
   */
  private mergeSearchResults(
    semanticResults: SearchResult[], 
    keywordResults: SearchResult[], 
    semanticWeight: number, 
    keywordWeight: number
  ): (SearchResult & { hybridScore: number })[] {
    const resultMap = new Map<string, SearchResult & { hybridScore: number; semanticScore?: number; keywordScore?: number }>();

    // Add semantic results
    for (const result of semanticResults) {
      const key = `${result.document.id}_${result.chunk.id}`;
      resultMap.set(key, {
        ...result,
        hybridScore: result.similarity * semanticWeight,
        semanticScore: result.similarity
      });
    }

    // Add/merge keyword results
    for (const result of keywordResults as (SearchResult & { keywordScore: number })[]) {
      const key = `${result.document.id}_${result.chunk.id}`;
      const existing = resultMap.get(key);
      
      if (existing) {
        // Merge scores
        existing.hybridScore += result.keywordScore * keywordWeight / 10; // Normalize keyword score
        existing.keywordScore = result.keywordScore;
      } else {
        // Add new result
        resultMap.set(key, {
          ...result,
          hybridScore: result.keywordScore * keywordWeight / 10,
          keywordScore: result.keywordScore
        });
      }
    }

    return Array.from(resultMap.values());
  }

  /**
   * Cluster semantically similar results to reduce redundancy
   */
  private clusterSemanticResults(results: SearchResult[]): SearchResult[] {
    if (results.length <= 3) return results; // No clustering needed for small sets

    const clusters: SearchResult[][] = [];
    const processed = new Set<string>();

    for (const result of results) {
      const key = `${result.document.id}_${result.chunk.id}`;
      if (processed.has(key)) continue;

      const cluster: SearchResult[] = [result];
      processed.add(key);

      // Find similar results (from same document or high similarity)
      for (const other of results) {
        const otherKey = `${other.document.id}_${other.chunk.id}`;
        if (processed.has(otherKey) || result === other) continue;

        const isSimilar = result.document.id === other.document.id || 
                         Math.abs(result.similarity - other.similarity) < 0.15;
        
        if (isSimilar && cluster.length < 3) { // Limit cluster size
          cluster.push(other);
          processed.add(otherKey);
        }
      }

      clusters.push(cluster);
    }

    // Take best result from each cluster
    return clusters.map(cluster => 
      cluster.reduce((best, current) => 
        (current.similarity > best.similarity) ? current : best
      )
    );
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Get documents filtered by types
   */
  private async getFilteredDocuments(documentTypes: DocumentType[]): Promise<DocumentData[]> {
    const documents: DocumentData[] = [];
    for (const docType of documentTypes) {
      const typedDocs = await this.getDocumentsByType(docType);
      documents.push(...typedDocs);
    }
    return documents;
  }

  async getStats(): Promise<{ documentCount: number; chunkCount: number; vectorCount: number }> {
    if (!this.isInitialized) {
      return { documentCount: 0, chunkCount: 0, vectorCount: 0 };
    }

    try {
      const documents = await this.getAllDocuments();
      const documentCount = documents.length;
      const chunkCount = documents.reduce((sum, doc) => sum + (doc.chunks?.length || 0), 0);
      const vectorCount = documents.reduce((sum, doc) => sum + (doc.vectors?.length || 0), 0);

      return { documentCount, chunkCount, vectorCount };
    } catch (error) {
      console.error('❌ Failed to get stats:', error);
      return { documentCount: 0, chunkCount: 0, vectorCount: 0 };
    }
  }

  /**
   * Get all chunks from documents, optionally filtered by document type
   * @param documentTypes Optional array of document types to filter by (e.g., ['userdocs'])
   */
  async getAllChunks(documentTypes?: DocumentType[]): Promise<any[]> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }
    
    try {
      // Get documents - filtered by type if specified, otherwise all documents
      let documents: DocumentData[];
      if (documentTypes && documentTypes.length > 0) {
        // Get documents filtered by the specified types
        documents = [];
        for (const docType of documentTypes) {
          const typedDocs = await this.getDocumentsByType(docType);
          documents.push(...typedDocs);
        }
        console.log(`🔍 getAllChunks: Filtering for document types [${documentTypes.join(', ')}]`);
      } else {
        documents = await this.getAllDocuments();
        console.log(`🔍 getAllChunks: Getting chunks from ALL document types (no filter)`);
      }
      const allChunks: any[] = [];
      
      // Collect all chunks from all documents
      for (const doc of documents) {
        if (doc.chunks && doc.chunks.length > 0) {
          for (const chunk of doc.chunks) {
            // DEBUG: Check raw chunk content (reduced logging)
            if (!chunk.content || chunk.content.length === 0) {
              console.warn(`⚠️ Empty chunk content in ${doc.title}: ${chunk.id}`);
            }
            
            allChunks.push({
              ...chunk,
              text: chunk.content,  // ChunkSelector expects 'text' field
              content: chunk.content,
              source: doc.title,
              sourceDocument: doc.title,
              documentId: doc.id,
              similarity: 1.0, // Full similarity for all chunks
              metadata: {
                ...doc.metadata,
                source: 'RxDB',
                documentId: doc.id,
                documentTitle: doc.title,
                chunkIndex: chunk.startIndex || 0
              }
            });
          }
        }
      }
      
      const filterInfo = documentTypes && documentTypes.length > 0 
        ? ` (filtered for: ${documentTypes.join(', ')})` 
        : ' (no filter - all types)';
      console.log(`🔍 getAllChunks: Retrieved ${allChunks.length} chunks from ${documents.length} documents${filterInfo}`);
      return allChunks;
      
    } catch (error) {
      console.error('❌ Failed to get all chunks:', error);
      return [];
    }
  }

  async clear(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    try {
      console.log('🧹 Clearing vector store...');
      await this.documentsCollection.documents.find().remove();
      console.log('✅ Vector store cleared');
    } catch (error) {
      console.error('❌ Failed to clear vector store:', error);
      throw error;
    }
  }

  async insertDocument(documentData: DocumentData): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // Use operation queue to prevent concurrent operations on the same document
    return this.queueOperation(
      `doc-${documentData.id}`,
      () => this.performDocumentInsertion(documentData)
    );
  }

  async upsertDocument(documentData: DocumentData): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    // ENHANCED: Use single operation ID per document to coordinate with delete operations
    return this.queueOperation(
      `doc-${documentData.id}`,
      () => this.performDocumentUpsert(documentData)
    );
  }

  private async performDocumentUpsert(documentData: DocumentData): Promise<void> {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        // Get the latest revision of the document
        const latestDoc = await this.getLatestDocumentRevision(documentData.id);
        
        if (latestDoc) {
          // Update existing document with latest revision
          await latestDoc.update({
            $set: {
              title: documentData.title,
              content: documentData.content,
              metadata: documentData.metadata,
              chunks: documentData.chunks,
              vectors: documentData.vectors
            }
          });
          console.log(`📊 Synced frame ${documentData.title} to Knowledge Base (updated)`);
        } else {
          // Insert new document
          await this.documentsCollection.documents.insert(documentData);
          console.log(`📊 Synced frame ${documentData.title} to Knowledge Base (inserted)`);
          
          // Ensure database flush after insertion
          await this.flushDatabase();
        }
        
        // Ensure document persistence
        await this.ensureDocumentPersistence(documentData.id, documentData.title);
        return; // Success, exit retry loop
        
      } catch (error: any) {
        retryCount++;
        
        // ENHANCED: Handle revision conflicts with detailed logging and improved retry
        if (error.name === 'RxError' && error.code === 'CONFLICT' && retryCount < maxRetries) {
          console.warn(`⚠️ Document upsert revision conflict for ${documentData.id}:`, {
            retry: `${retryCount}/${maxRetries}`,
            errorCode: error.code,
            errorName: error.name,
            documentId: documentData.id,
            documentTitle: documentData.title,
            operationId: `doc-${documentData.id}`
          });
          
          // ENHANCED: Wait before retry with exponential backoff (100ms, 200ms, 400ms)
          const delay = Math.pow(2, retryCount) * 100;
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // ENHANCED: Log specific conflict details for debugging
        if (error.name === 'RxError' && error.code === 'CONFLICT') {
          console.error(`❌ Document upsert failed with unretryable conflict for ${documentData.id}:`, {
            maxRetriesReached: retryCount >= maxRetries,
            finalRetryCount: retryCount,
            errorCode: error.code,
            errorName: error.name,
            errorMessage: error.message,
            documentId: documentData.id,
            documentTitle: documentData.title
          });
        }
        
        console.error(`❌ Failed to upsert document ${documentData.id}:`, error);
        throw error;
      }
    }
  }

  // Enhanced method to get latest document revision with retry logic
  private async getLatestDocumentRevision(documentId: string): Promise<any> {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        // Force a fresh query to get the latest revision
        const doc = await this.documentsCollection.documents.findOne(documentId).exec();
        if (doc) {
          console.log(`📋 Retrieved latest revision for ${documentId}: ${doc._rev}`);
        }
        return doc;
      } catch (error) {
        retryCount++;
        console.warn(`⚠️ Failed to fetch latest revision for ${documentId}, attempt ${retryCount}/${maxRetries}:`, error);
        
        if (retryCount >= maxRetries) {
          throw error;
        }
        
        // Exponential backoff delay before retry
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 50));
      }
    }
    
    return null;
  }

  private async performDocumentInsertion(documentData: DocumentData): Promise<void> {
    // Enhanced duplicate detection before insertion
    const duplicateDoc = await this.findDuplicateDocument(documentData);
    if (duplicateDoc) {
      // console.log(`⚠️ Duplicate document detected: "${documentData.title}" (similar to "${duplicateDoc.title}"), skipping insertion`);
      return; // Skip insertion of duplicate
    }

    // Debug logging for TimeCapsule documents
    if (documentData.metadata?.type === 'timecapsule') {
      console.log(`📋 TimeCapsule document operation:`, {
        id: documentData.id,
        title: documentData.title,
        source: documentData.metadata.source,
        timeCapsuleId: documentData.metadata.timeCapsuleId,
        name: documentData.metadata.name,
        updatedAt: documentData.metadata.updatedAt
      });
    }

    const maxRetries = 5; // Increased retries for better conflict resolution
    let retryCount = 0;
    let backoffDelay = 100; // Start with 100ms delay

    while (retryCount < maxRetries) {
      try {
        // Enhanced revision handling: Always fetch latest document with proper retry
        let existingDoc = null;
        try {
          // Force fresh fetch to get latest revision
          existingDoc = await this.getLatestDocumentRevision(documentData.id);
        } catch (findError) {
          console.warn(`⚠️ Error finding document ${documentData.id}:`, findError);
          // Continue with insertion if document doesn't exist
        }
        
        if (existingDoc) {
          // ENHANCED HANDLING: For metadata updates, use atomic update with proper revision handling
          const isMetadataUpdate = documentData.metadata.source === 'metadata';
          
          if (isMetadataUpdate) {
            console.log(`🔄 Metadata update detected for ${documentData.id}, using atomic update strategy (attempt ${retryCount + 1}/${maxRetries})`);
            
            // Additional debug logging for TimeCapsule metadata updates
            if (documentData.metadata?.type === 'timecapsule') {
              console.log(`📋 TimeCapsule metadata update details:`, {
                documentId: documentData.id,
                timeCapsuleId: documentData.metadata.timeCapsuleId,
                oldTitle: existingDoc.title,
                newTitle: documentData.title,
                oldName: existingDoc.metadata?.name,
                newName: documentData.metadata.name,
                oldUpdatedAt: existingDoc.metadata?.updatedAt,
                newUpdatedAt: documentData.metadata.updatedAt,
                currentRevision: existingDoc._rev
              });
            }
            
            // Use atomic update instead of delete-then-insert to avoid conflicts
            try {
              await existingDoc.atomicUpdate((docData: any) => {
                return {
                  ...docData,
                  title: documentData.title,
                  content: documentData.content,
                  metadata: documentData.metadata,
                  chunks: documentData.chunks,
                  vectors: documentData.vectors
                };
              });
              
              console.log(`✅ Document atomically updated: ${documentData.id}`);
              
              // Additional confirmation for TimeCapsule updates
              if (documentData.metadata?.type === 'timecapsule') {
                console.log(`✅ TimeCapsule document successfully updated: ${documentData.title}`);
              }
              
              // CRITICAL FIX: Add database flush and verification
              await this.ensureDocumentPersistence(documentData.id, documentData.title);
              return; // Success, exit the retry loop
            } catch (atomicError: any) {
              // If atomic update fails, fall back to delete-then-insert with delay
              console.warn(`⚠️ Atomic update failed for ${documentData.id}, trying delete-then-insert:`, atomicError.message);
              
              // Re-fetch the document to get the latest revision
              const latestDoc = await this.documentsCollection.documents.findOne(documentData.id).exec();
              if (latestDoc) {
                await latestDoc.remove();
                console.log(`🗑️ Deleted existing document: ${documentData.id}`);
                
                // Longer delay to ensure deletion is fully processed
                await new Promise(resolve => setTimeout(resolve, backoffDelay));
                
                // Insert the new document
                await this.documentsCollection.documents.insert(documentData);
                console.log(`✅ Document re-inserted after deletion: ${documentData.id}`);
                
                // CRITICAL FIX: Add database flush and verification
                await this.ensureDocumentPersistence(documentData.id, documentData.title);
                return; // Success, exit the retry loop
              }
            }
          } else {
            // Standard update for non-metadata documents
            await existingDoc.update({
              $set: {
                title: documentData.title,
                content: documentData.content,
                metadata: documentData.metadata,
                chunks: documentData.chunks,
                vectors: documentData.vectors
              }
            });
            console.log(`✅ Document updated: ${documentData.id}`);
            
            // CRITICAL FIX: Add database flush and verification
            await this.ensureDocumentPersistence(documentData.id, documentData.title);
            return; // Success, exit the retry loop
          }
        } else {
          // Document doesn't exist, try to insert it
          await this.documentsCollection.documents.insert(documentData);
          console.log(`✅ Document inserted: ${documentData.id}`);
          
          // CRITICAL FIX: Add database flush and verification
          await this.ensureDocumentPersistence(documentData.id, documentData.title);
          return; // Success, exit the retry loop
        }
      } catch (error: any) {
        retryCount++;
        
        // Enhanced error handling for different types of conflicts
        if (error.name === 'RxError' && error.code === 'CONFLICT') {
          const dbRevision = error.parameters?.writeError?.documentInDb?._rev;
          const attemptedRevision = error.parameters?.writeError?.writeRow?.document?._rev;
          
          console.warn(`⚠️ Document revision conflict for ${documentData.id}, retry ${retryCount}/${maxRetries}`, {
            errorCode: error.code,
            documentId: error.parameters?.id,
            currentRevision: dbRevision,
            attemptedRevision: attemptedRevision,
            revisionMismatch: dbRevision !== attemptedRevision
          });
          
          // For revision conflicts, add extra delay to let other operations complete
          backoffDelay = Math.max(backoffDelay, 200); // Minimum 200ms for conflicts
        } else if (error.message?.includes('Document update conflict')) {
          console.warn(`⚠️ Document update conflict for ${documentData.id}, retry ${retryCount}/${maxRetries}:`, error.message);
          // Add extra delay for general update conflicts
          backoffDelay = Math.max(backoffDelay, 150);
        } else {
          console.warn(`⚠️ Document operation error for ${documentData.id}, retry ${retryCount}/${maxRetries}:`, error.message);
        }
        
        if (retryCount >= maxRetries) {
          console.error(`❌ Max retries exceeded for document ${documentData.id}`, {
            finalError: error.message,
            errorCode: error.code,
            retryCount,
            maxRetries
          });
          throw error;
        }
        
        // Exponential backoff with jitter to reduce collision probability
        const jitter = Math.random() * 50; // 0-50ms random jitter
        const delay = backoffDelay + jitter;
        console.log(`⏳ Waiting ${Math.round(delay)}ms before retry ${retryCount + 1}/${maxRetries}...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        backoffDelay *= 1.5; // Exponential backoff: 100ms, 150ms, 225ms, etc.
        
        continue; // Retry the operation
      }
    }
    }

    // Enhanced duplicate detection method
    private async findDuplicateDocument(documentData: DocumentData): Promise<DocumentData | null> {
      try {
        const allDocs = await this.getAllDocuments();
        const newMeta = documentData.metadata as any;
        
        // SPECIAL CASE: Allow metadata updates to completely bypass duplicate detection
        if (newMeta.source === 'metadata') {
          console.log(`🔄 Bypassing duplicate detection for metadata update: ${documentData.title}`);
          
          // Debug logging for TimeCapsule metadata updates
          if (newMeta.type === 'timecapsule') {
            const existingTimeCapsuleDocs = allDocs.filter(doc => 
              doc.metadata?.type === 'timecapsule' && doc.metadata?.timeCapsuleId === newMeta.timeCapsuleId
            );
            console.log(`📋 Found ${existingTimeCapsuleDocs.length} existing TimeCapsule documents for timeCapsuleId: ${newMeta.timeCapsuleId}`);
            if (existingTimeCapsuleDocs.length > 0) {
              console.log(`📋 Existing TimeCapsule documents:`, existingTimeCapsuleDocs.map(doc => ({
                id: doc.id,
                title: doc.title,
                name: doc.metadata?.name,
                updatedAt: doc.metadata?.updatedAt
              })));
            }
          }
          
          return null; // No duplicate found, allow insertion
        }

        // SPECIAL CASE: Allow AI-Frames updates to bypass duplicate detection for order preservation
        if (newMeta.source === 'ai-frames' || newMeta.source === 'ai-frames-auto-sync') {
          console.log(`🔄 Bypassing duplicate detection for AI-Frames update: ${documentData.title}`);
          return null; // No duplicate found, allow insertion
        }
        
        for (const existingDoc of allDocs) {
          // Check for exact ID match
          if (existingDoc.id === documentData.id) {
            return existingDoc;
          }
          
          // Check for exact title match
          if (existingDoc.title === documentData.title) {
            return existingDoc;
          }
          
          // Check for source-specific duplicate patterns
          const existingMeta = existingDoc.metadata as any;
          
          // AI-Frames specific duplicate detection
          if ((newMeta.source === 'ai-frames' || newMeta.source === 'ai-frames-auto-sync') && 
              (existingMeta.source === 'ai-frames' || existingMeta.source === 'ai-frames-auto-sync')) {
            if (newMeta.frameId && existingMeta.frameId && newMeta.frameId === existingMeta.frameId) {
              return existingDoc;
            }
          }
          
          // TimeCapsule specific duplicate detection
          if (newMeta.source === 'timecapsule_export' && existingMeta.source === 'timecapsule_export') {
            // Check if content is substantially similar (first 500 chars)
            const newContentStart = documentData.content.substring(0, 500);
            const existingContentStart = existingDoc.content.substring(0, 500);
            if (newContentStart === existingContentStart) {
              return existingDoc;
            }
          }
          
          // TimeCapsule import duplicate detection
          if (newMeta.source === 'timecapsule_import' && existingMeta.source === 'timecapsule_import') {
            // Check for similar file names and sizes
            if (newMeta.filename === existingMeta.filename && 
                Math.abs(newMeta.filesize - existingMeta.filesize) < 1000) {
              return existingDoc;
            }
          }
          
          // BubblSpace specific duplicate detection
          if (newMeta.bubblSpaceId && existingMeta.bubblSpaceId && 
              newMeta.bubblSpaceId === existingMeta.bubblSpaceId) {
            // Same BubblSpace with very similar titles
            const titleSimilarity = this.calculateStringSimilarity(
              documentData.title.toLowerCase(), 
              existingDoc.title.toLowerCase()
            );
            if (titleSimilarity > 0.8) {
              return existingDoc;
            }
          }
          
          // Research state duplicate detection
          if (newMeta.source === 'research_state' && existingMeta.source === 'research_state') {
            // Only allow one research state document at a time
            return existingDoc;
          }
          
          // General content similarity check for generated documents
          if (newMeta.isGenerated && existingMeta.isGenerated) {
            const contentSimilarity = this.calculateStringSimilarity(
              documentData.content.substring(0, 1000),
              existingDoc.content.substring(0, 1000)
            );
            if (contentSimilarity > 0.85) {
              return existingDoc;
            }
          }
        }
        
        return null; // No duplicate found
      } catch (error) {
        console.warn('⚠️ Duplicate detection failed:', error);
        return null; // If duplicate detection fails, allow insertion
      }
    }

    // Helper method to calculate string similarity (Levenshtein-based)
    private calculateStringSimilarity(str1: string, str2: string): number {
      if (str1 === str2) return 1;
      if (str1.length === 0 || str2.length === 0) return 0;
      
      const maxLength = Math.max(str1.length, str2.length);
      const distance = this.levenshteinDistance(str1, str2);
      return (maxLength - distance) / maxLength;
    }

    // Levenshtein distance calculation
    private levenshteinDistance(str1: string, str2: string): number {
      const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
      
      for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
      for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
      
      for (let j = 1; j <= str2.length; j++) {
        for (let i = 1; i <= str1.length; i++) {
          const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[j][i] = Math.min(
            matrix[j][i - 1] + 1, // deletion
            matrix[j - 1][i] + 1, // insertion
            matrix[j - 1][i - 1] + substitutionCost // substitution
          );
        }
      }
      
      return matrix[str2.length][str1.length];
    }

    // Deprecated: createChunks is no longer used - Web Worker handles chunking
    // private createChunks(content: string): Array<{ id: string; content: string; startIndex: number; endIndex: number }> {
    //   const chunks = [];
    //   let startIndex = 0;
    //   let chunkIndex = 0;
    //
    //   console.log(`📄 Creating chunks from ${content.length} characters`);
    //   
    //   while (startIndex < content.length) {
    //     const endIndex = Math.min(startIndex + this.CHUNK_SIZE, content.length);
    //     const chunkContent = content.substring(startIndex, endIndex);
    //     
    //     chunks.push({
    //       id: `chunk_${Date.now()}_${chunkIndex}_${Math.random().toString(36).substring(2, 11)}`,
    //       content: chunkContent,
    //       startIndex: startIndex,
    //       endIndex: endIndex
    //     });
    //
    //     // Move start index forward, accounting for overlap
    //     startIndex = endIndex - this.CHUNK_OVERLAP;
    //     chunkIndex++;
    //     
    //     if (startIndex >= content.length) break;
    //   }
    //
    //   console.log(`✅ Created ${chunks.length} chunks with ${this.CHUNK_SIZE} char size and ${this.CHUNK_OVERLAP} char overlap`);
    //   return chunks;
    // }

    // Deprecated: createWordBasedChunks is no longer used - Web Worker handles chunking
    // private createWordBasedChunks(text: string, wordsPerChunk: number): Array<{ id: string; content: string; startIndex: number; endIndex: number }> {
    //   const words = text.split(/\s+/);
    //   const chunks = [];
    //   
    //   console.log(`📄 Creating word-based chunks from ${words.length} words (${wordsPerChunk} words per chunk)`);
    //   
    //   for (let i = 0; i < words.length; i += wordsPerChunk) {
    //     const chunkWords = words.slice(i, i + wordsPerChunk);
    //     const chunkContent = chunkWords.join(' ');
    //     
    //     // Calculate character positions for compatibility
    //     const allWordsBeforeChunk = words.slice(0, i);
    //     const startIndex = allWordsBeforeChunk.join(' ').length + (allWordsBeforeChunk.length > 0 ? 1 : 0);
    //     const endIndex = startIndex + chunkContent.length;
    //     
    //     chunks.push({
    //       id: `chunk_${Date.now()}_${Math.floor(i / wordsPerChunk)}_${Math.random().toString(36).substring(2, 11)}`,
    //       content: chunkContent,
    //       startIndex: startIndex,
    //       endIndex: endIndex
    //     });
    //   }
    //   
    //   console.log(`✅ Created ${chunks.length} word-based chunks`);
    //   return chunks.length > 0 ? chunks : [{
    //     id: `chunk_${Date.now()}_0_${Math.random().toString(36).substring(2, 11)}`,
    //     content: text,
    //     startIndex: 0,
    //     endIndex: text.length
    //   }];
    // }

    // Deprecated: generateEmbedding is now handled by Web Worker - use DocumentProcessor
    // private async generateEmbedding(text: string): Promise<number[]> {
    //   throw new Error('Embedding generation is now handled by Web Worker - use DocumentProcessor');
    // }

    private cosineSimilarity(a: number[], b: number[]): number {
      if (a.length !== b.length) {
        throw new Error('Vector dimensions must match');
      }

      let dotProduct = 0;
      let normA = 0;
      let normB = 0;

      for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
      }

      if (normA === 0 || normB === 0) {
        return 0;
      }

      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    // Helper method for formatting file sizes
    private formatFileSize(bytes: number): string {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Initialize embeddings pipeline when needed
    private startProcessorInitialization(): Promise<void> {
      if (!this.documentProcessor) {
        this.documentProcessor = getDocumentProcessor();
      }

      if (this.processorInitPromise) {
        return this.processorInitPromise;
      }

      this._processorAvailable = false;
      this._downloadProgress = 0;
      this._downloadStatus = 'downloading';

      const startTime = typeof performance !== 'undefined' ? performance.now() : 0;

      this.processorInitPromise = this.initializeProcessorPipeline()
        .then(() => {
          const endTime = typeof performance !== 'undefined' ? performance.now() : startTime;
          const initDuration = endTime - startTime;
          const wasFromCache = initDuration < 2000;
          if (wasFromCache) {
            console.log('✅ Xenova model loaded from cache - all features ready');
          } else {
            console.log('✅ Xenova model downloaded and cached - all features ready');
          }
          this._processorAvailable = true;
          this._downloadProgress = 100;
          this._downloadStatus = 'ready';
        })
        .catch((error: any) => {
          console.error('❌ Xenova download failed:', error);
          this._processorAvailable = false;
          this._downloadProgress = 0;
          this._downloadStatus = 'error';
          throw error;
        })
        .finally(() => {
          this.processorInitPromise = null;
        });

      return this.processorInitPromise;
    }

    private async ensureProcessorReady(): Promise<void> {
      if (this._processorAvailable) {
        return;
      }
      await this.startProcessorInitialization();
    }

    private async initializeProcessorPipeline(): Promise<void> {
      if (!this.documentProcessor) {
        throw new Error('Document processor not available');
      }
      console.log('🧠 Starting processor pipeline initialization...');
      await this.initializeWebWorker();
      await this.initializeXenovaService();
      console.log('✅ Processor pipeline ready');
    }

    // Initialize web worker (lightweight, fast)
    private async initializeWebWorker(): Promise<void> {
      const maxRetries = 3;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`🔄 Initializing web worker (attempt ${attempt}/${maxRetries})...`);
          await this.documentProcessor.init();
          console.log('✅ Web worker initialized successfully');
          return; // Success
        } catch (error: any) {
          console.error(`❌ Web worker initialization failed (attempt ${attempt}/${maxRetries}):`, error);
          
          if (attempt === maxRetries) {
            throw error; // Final attempt failed
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    // Initialize Xenova embedding service (heavy, but immediate)
    private async initializeXenovaService(): Promise<void> {
      try {
        console.log('🧠 Initializing Xenova embedding service (bundled assets, lazy)');
        
        // This will trigger immediate download of Xenova transformers
        // The EmbeddingService will handle the actual download
        const embeddingService = this.documentProcessor.embeddingServiceInstance;
        
        if (embeddingService && embeddingService.init) {
          let lastProgressLog = 0;
          await embeddingService.init((progress: any) => {
            this._downloadProgress = progress.progress;
            
            // FIXED: Reduced logging spam - only log significant progress milestones
            const now = Date.now();
            if (now - lastProgressLog >= 3000 && progress.progress % 25 === 0) {
              console.log(`📊 Xenova progress: ${progress.message} (${progress.progress}%)`);
              lastProgressLog = now;
            }
          });
        }
        
        console.log('✅ Xenova embedding service ready');
      } catch (error) {
        console.error('❌ Xenova embedding service initialization failed:', error);
        throw error;
      }
    }

    // Clear IndexedDB database manually to resolve schema conflicts
    private async clearIndexedDB(dbName: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const deleteRequest = indexedDB.deleteDatabase(dbName);
        
        deleteRequest.onsuccess = () => {
          console.log('🗑️ IndexedDB database cleared successfully');
          resolve();
        };
        
        deleteRequest.onerror = (event) => {
          console.error('❌ Failed to clear IndexedDB database:', event);
          reject(new Error('Failed to clear IndexedDB database'));
        };
        
        deleteRequest.onblocked = () => {
          console.warn('⚠️ IndexedDB deletion blocked, please close other tabs and try again');
          // Resolve anyway to continue with the process
          resolve();
        };
      });
    }

    // Make this available globally like the original
    get initialized(): boolean {
      return this.isInitialized;
    }

    // Check if document processing is available
    get processingAvailable(): boolean {
      const downloadStatus = this._downloadStatus;
      const result = this.isInitialized && downloadStatus === 'ready' && this.documentProcessor && this._processorAvailable;
      
      // FIXED: Only log when debugging is needed, not constantly
      return result;
    }

    // Get detailed status message for document processing
    get processingStatus(): string {
      if (!this.isInitialized) {
        return 'Vector Store not initialized';
      }

      const downloadStatus = this._downloadStatus;
      const downloadProgress = this._downloadProgress || 0;

      switch (downloadStatus) {
        case 'downloading':
          return `AI models downloading: ${downloadProgress}% - Advanced features will be available shortly`;
        case 'ready':
          return 'Document processing ready - All features available';
        case 'error':
          return 'AI model download failed - Some features unavailable';
        default:
          return 'Document processing status unknown';
      }
    }

    // Get download status details
    get downloadStatus(): string {
      return this._downloadStatus || 'unknown';
    }

    get downloadProgress(): number {
      return this._downloadProgress || 0;
    }

    // Check if basic document management is available (without AI processing)
    get basicFunctionsAvailable(): boolean {
      return this.isInitialized && this.documentsCollection !== null;
    }

    // Enhanced document persistence verification with retry logic
    private async ensureDocumentPersistence(documentId: string, documentTitle: string): Promise<void> {
      const maxRetries = 3;
      let retryCount = 0;
      
      while (retryCount < maxRetries) {
        try {
          console.log(`🔍 Verifying document persistence: ${documentId} (attempt ${retryCount + 1}/${maxRetries})`);
          
          // Force IndexedDB flush by triggering a read operation
          await this.flushDatabase();
          
          // Adaptive delay based on retry count for concurrent scenarios
          const delay = 50 + (retryCount * 50); // 50ms, 100ms, 150ms
          await new Promise(resolve => setTimeout(resolve, delay));
          
          // Verify the document is actually persisted using our enhanced method
          const verificationDoc = await this.getLatestDocumentRevision(documentId);
          
          if (verificationDoc) {
            console.log(`✅ Document persistence verified: ${documentTitle} (ID: ${documentId}, Rev: ${verificationDoc._rev})`);
            return; // Success
          } else {
            console.warn(`⚠️ Document persistence verification failed: ${documentTitle} (ID: ${documentId}), attempt ${retryCount + 1}`);
            
            // Don't throw error immediately, retry first
            if (retryCount === maxRetries - 1) {
              throw new Error(`Document ${documentId} was not properly persisted to IndexedDB after ${maxRetries} attempts`);
            }
          }
        } catch (error) {
          console.error(`❌ Document persistence verification error for ${documentId} (attempt ${retryCount + 1}):`, error);
          
          // If this is the last attempt, throw the error
          if (retryCount === maxRetries - 1) {
            throw error;
          }
        }
        
        retryCount++;
        
        // Exponential backoff for retries
        const backoffDelay = Math.min(100 * Math.pow(2, retryCount), 1000);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }

    // NEW METHOD: Force database flush to ensure IndexedDB commit
    private async flushDatabase(): Promise<void> {
      try {
        // Force a database operation to trigger IndexedDB flush
        await this.documentsCollection.documents.count().exec();
        console.log(`💾 Database flush completed`);
      } catch (error) {
        console.warn(`⚠️ Database flush failed:`, error);
      }
    }

    // Add method to get RAG statistics
    getRAGStats() {
      return this.ragTracker.currentStats;
    }

    // Add method to get RAG queries for a session
    getRAGQueriesBySession(sessionId: string) {
      return this.ragTracker.getQueriesBySession(sessionId);
    }

    // Add method to get RAG queries for an agent
    getRAGQueriesByAgent(agentId: string) {
      return this.ragTracker.getQueriesByAgent(agentId);
    }

    // Add method to get RAG visualization data
    getRAGVisualizationData(sessionId?: string) {
      return this.ragTracker.getVisualizationData(sessionId);
    }

    // Add method to export RAG data
    exportRAGData(format: 'json' | 'csv' = 'json') {
      return this.ragTracker.exportData(format);
    }

    // Add method to clear RAG history
    clearRAGHistory(olderThan?: Date) {
      return this.ragTracker.clearHistory(olderThan);
    }

    // Add method to get RAG tracker instance
    getRAGTracker() {
      return this.ragTracker;
    }
  }

  // Make VectorStore available globally - only in browser
  if (typeof window !== 'undefined') {
    (window as any).VectorStore = VectorStore;
  }
