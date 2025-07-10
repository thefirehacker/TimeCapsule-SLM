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
import { getDocumentProcessor, type ProcessingProgress, type ProcessedDocument } from '../../lib/workers/DocumentProcessor';

// Add RxDB plugins
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

// Document schema for RxDB
const documentSchema = {
  version: 1, // Incremented from 0 to handle schema migration
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
        // Additional fields from previous schema
        bubblSpaceId: { type: 'string' },
        category: { type: 'string' },
        createdAt: { type: 'string' },
        name: { type: 'string' },
        timeCapsuleId: { type: 'string' },
        type: { type: 'string' }
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
          endIndex: { type: 'number' }
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
    // Additional fields from previous schema
    bubblSpaceId?: string;
    category?: string;
    createdAt?: string;
    name?: string;
    timeCapsuleId?: string;
    type?: string;
  };
  chunks: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  }>;
  vectors: Array<{
    chunkId: string;
    embedding: number[];
  }>;
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
  
  // Private properties for status tracking
  private _processorAvailable = false;
  private _downloadProgress = 0;
  private _downloadStatus = 'unknown';
  private _downloadError = '';

  constructor() {
    console.log('🗂️ VectorStore constructor called');
  }

  async init(): Promise<void> {
    try {
      console.log('🗂️ Initializing RxDB Vector Store...');

      // Initialize document processor (Web Worker) and START IMMEDIATE XENOVA DOWNLOAD
      console.log('🤖 Loading document processor and starting immediate Xenova download...');
      this.documentProcessor = getDocumentProcessor();
      
      // Start IMMEDIATE background download - this is the key change
      console.log('🧠 Starting immediate background Xenova download...');
      this._processorAvailable = false;
      this._downloadProgress = 0;
      this._downloadStatus = 'downloading';
      
      // Start background initialization immediately (non-blocking)
      this.startImmediateBackgroundDownload()
        .then(() => {
          console.log('✅ Xenova download complete - all features ready');
          this._processorAvailable = true;
          this._downloadProgress = 100;
          this._downloadStatus = 'ready';
          console.log('🔍 Status set to ready. Full status:', {
            isInitialized: this.isInitialized,
            downloadStatus: this._downloadStatus,
            hasDocumentProcessor: !!this.documentProcessor,
            processorAvailable: this._processorAvailable,
            processingAvailable: this.processingAvailable
          });
        })
        .catch((error: any) => {
          console.error('❌ Xenova download failed:', error);
          this._processorAvailable = false;
          this._downloadProgress = 0;
          this._downloadStatus = 'error';
          this._downloadError = error.message;
        });

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
              schema: documentSchema
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

    // File size check (following reference implementation - 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error(`File too large: ${file.name} (${this.formatFileSize(file.size)}). Please use files under 10MB.`);
    }

    console.log(`📄 Processing document: ${file.name}`);
    console.log(`📄 File size: ${this.formatFileSize(file.size)}, Content length: ${content.length} characters`);
    
    // Generate document ID
    const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
        isGenerated: false
      }
    };

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
             // Convert chunks from Web Worker format to VectorStore format
             const chunks = processedDoc.chunks.map((chunk, index) => ({
               id: `chunk_${processedDoc.id}_${index}`,
               content: chunk.content,
               startIndex: index * 500, // Approximate start based on chunk index
               endIndex: (index * 500) + chunk.content.length
             }));

             // Convert to our DocumentData format
             const documentData: DocumentData = {
               id: processedDoc.id,
               title: processedDoc.title,
               content: processedDoc.content,
               metadata: processedDoc.metadata,
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
            
            resolve(docId);
          } catch (error) {
            console.error('❌ Failed to store processed document:', error);
            reject(error);
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

  async addGeneratedDocument(
    title: string, 
    content: string,
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
    const docId = `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
        isGenerated: true
      }
    };

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
            // Convert chunks from Web Worker format to VectorStore format
            const chunks = processedDoc.chunks.map((chunk, index) => ({
              id: `chunk_${processedDoc.id}_${index}`,
              content: chunk.content,
              startIndex: index * 500, // Approximate start based on chunk index
              endIndex: (index * 500) + chunk.content.length
            }));

            // Convert to our DocumentData format
            const documentData: DocumentData = {
              id: processedDoc.id,
              title: processedDoc.title,
              content: processedDoc.content,
              metadata: processedDoc.metadata,
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
          } catch (error) {
            console.error('❌ Failed to store processed generated document:', error);
            reject(error);
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

  async deleteDocument(id: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Vector Store not initialized');
    }

    try {
      console.log(`🗑️ Deleting document: ${id}`);
      const doc = await this.documentsCollection.documents.findOne(id).exec();
      if (doc) {
        await doc.remove();
        console.log(`✅ Document deleted: ${id}`);
      } else {
        console.warn(`⚠️ Document not found: ${id}`);
      }
    } catch (error) {
      console.error('❌ Failed to delete document:', error);
      throw error;
    }
  }

  async searchSimilar(query: string, threshold: number = 0.3, limit: number = 10): Promise<SearchResult[]> {
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

    try {
      console.log(`🔍 Searching for: "${query}" with threshold: ${threshold}`);

      // Generate query embedding using Web Worker
      const queryEmbedding = await this.documentProcessor.generateEmbedding(query);

      // Get all documents
      const documents = await this.getAllDocuments();
      const results: SearchResult[] = [];

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

      // Sort by similarity and limit results
      results.sort((a, b) => b.similarity - a.similarity);
      const limitedResults = results.slice(0, limit);

      console.log(`✅ Found ${limitedResults.length} similar chunks`);
      return limitedResults;
    } catch (error) {
      console.error('❌ Search failed:', error);
      throw error;
    }
  }

  async getStats(): Promise<{ documentCount: number; chunkCount: number; vectorCount: number }> {
    if (!this.isInitialized) {
      return { documentCount: 0, chunkCount: 0, vectorCount: 0 };
    }

    try {
      const documents = await this.getAllDocuments();
      const documentCount = documents.length;
      const chunkCount = documents.reduce((sum, doc) => sum + doc.chunks.length, 0);
      const vectorCount = documents.reduce((sum, doc) => sum + doc.vectors.length, 0);

      return { documentCount, chunkCount, vectorCount };
    } catch (error) {
      console.error('❌ Failed to get stats:', error);
      return { documentCount: 0, chunkCount: 0, vectorCount: 0 };
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

    // Enhanced duplicate detection before insertion
    const duplicateDoc = await this.findDuplicateDocument(documentData);
    if (duplicateDoc) {
      console.log(`⚠️ Duplicate document detected: "${documentData.title}" (similar to "${duplicateDoc.title}"), skipping insertion`);
      return; // Skip insertion of duplicate
    }

    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        // Fresh fetch of the document for each attempt
        const existingDoc = await this.documentsCollection.documents.findOne(documentData.id).exec();
        
        if (existingDoc) {
          // Document exists, update it using the latest revision
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
          return; // Success, exit the retry loop
        } else {
                      // Document doesn't exist, try to insert it
            await this.documentsCollection.documents.insert(documentData);
            console.log(`✅ Document inserted: ${documentData.id}`);
            return; // Success, exit the retry loop
          }
        } catch (error: any) {
          // Check if this is a revision conflict error
          if (error.name === 'RxError' && error.code === 'CONFLICT') {
            retryCount++;
            console.warn(`⚠️ Document update conflict for ${documentData.id}, retry ${retryCount}/${maxRetries}`);
            
            if (retryCount >= maxRetries) {
              console.error(`❌ Max retries exceeded for document ${documentData.id}`);
              throw error;
            }
            
            // Wait a small random amount before retrying to reduce collision probability
            await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
            continue; // Retry the operation
          } else {
            // Non-conflict error, don't retry
            console.error('❌ Failed to upsert document:', error);
            throw error;
          }
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
          if (newMeta.source === 'ai-frames' && existingMeta.source === 'ai-frames') {
            if (newMeta.aiFrameId && existingMeta.aiFrameId && newMeta.aiFrameId === existingMeta.aiFrameId) {
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

    private createChunks(content: string): Array<{ id: string; content: string; startIndex: number; endIndex: number }> {
      const chunks = [];
      let startIndex = 0;
      let chunkIndex = 0;

      console.log(`📄 Creating chunks from ${content.length} characters`);
      
      while (startIndex < content.length) {
        const endIndex = Math.min(startIndex + this.CHUNK_SIZE, content.length);
        const chunkContent = content.substring(startIndex, endIndex);
        
        chunks.push({
          id: `chunk_${Date.now()}_${chunkIndex}_${Math.random().toString(36).substr(2, 9)}`,
          content: chunkContent,
          startIndex: startIndex,
          endIndex: endIndex
        });

        // Move start index forward, accounting for overlap
        startIndex = endIndex - this.CHUNK_OVERLAP;
        chunkIndex++;
        
        if (startIndex >= content.length) break;
      }

      console.log(`✅ Created ${chunks.length} chunks with ${this.CHUNK_SIZE} char size and ${this.CHUNK_OVERLAP} char overlap`);
      return chunks;
    }

    // Word-based chunking (following reference implementation)
    private createWordBasedChunks(text: string, wordsPerChunk: number): Array<{ id: string; content: string; startIndex: number; endIndex: number }> {
      const words = text.split(/\s+/);
      const chunks = [];
      
      console.log(`📄 Creating word-based chunks from ${words.length} words (${wordsPerChunk} words per chunk)`);
      
      for (let i = 0; i < words.length; i += wordsPerChunk) {
        const chunkWords = words.slice(i, i + wordsPerChunk);
        const chunkContent = chunkWords.join(' ');
        
        // Calculate character positions for compatibility
        const allWordsBeforeChunk = words.slice(0, i);
        const startIndex = allWordsBeforeChunk.join(' ').length + (allWordsBeforeChunk.length > 0 ? 1 : 0);
        const endIndex = startIndex + chunkContent.length;
        
        chunks.push({
          id: `chunk_${Date.now()}_${Math.floor(i / wordsPerChunk)}_${Math.random().toString(36).substr(2, 9)}`,
          content: chunkContent,
          startIndex: startIndex,
          endIndex: endIndex
        });
      }
      
      console.log(`✅ Created ${chunks.length} word-based chunks`);
      return chunks.length > 0 ? chunks : [{
        id: `chunk_${Date.now()}_0_${Math.random().toString(36).substr(2, 9)}`,
        content: text,
        startIndex: 0,
        endIndex: text.length
      }];
    }

    private async generateEmbedding(text: string): Promise<number[]> {
      throw new Error('Embedding generation is now handled by Web Worker - use DocumentProcessor');
    }

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

    // Start immediate background Xenova download - non-blocking
    private async startImmediateBackgroundDownload(): Promise<void> {
      if (!this.documentProcessor) {
        throw new Error('Document processor not available');
      }

      console.log('🧠 Starting immediate Xenova download in background...');
      
      // Initialize web worker first (lightweight)
      await this.initializeWebWorker();
      
      // Then start Xenova download immediately (heavy lifting)
      await this.initializeXenovaService();
      
      console.log('✅ Immediate background download completed');
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
        console.log('🧠 Starting Xenova embedding service download...');
        
        // This will trigger immediate download of Xenova transformers
        // The EmbeddingService will handle the actual download
        const embeddingService = this.documentProcessor.embeddingServiceInstance;
        
        if (embeddingService && embeddingService.init) {
          await embeddingService.init((progress: any) => {
            console.log(`📊 Xenova download progress: ${progress.message} (${progress.progress}%)`);
            this._downloadProgress = progress.progress;
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
      
      // Debug logging to help identify the issue
      if (!result) {
        console.log('🔍 VectorStore.processingAvailable = false. Status check:', {
          isInitialized: this.isInitialized,
          downloadStatus: downloadStatus,
          hasDocumentProcessor: !!this.documentProcessor,
          processorAvailable: this._processorAvailable
        });
      }
      
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
  }

  // Make VectorStore available globally - only in browser
  if (typeof window !== 'undefined') {
    (window as any).VectorStore = VectorStore;
  }