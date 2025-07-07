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
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { getDocumentProcessor, type ProcessingProgress, type ProcessedDocument } from '../../lib/workers/DocumentProcessor';

// Add RxDB plugins
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

// Document schema for RxDB
const documentSchema = {
  version: 0,
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
        isGenerated: { type: 'boolean' }
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

  constructor() {
    console.log('🗂️ VectorStore constructor called');
  }

  async init(): Promise<void> {
    try {
      console.log('🗂️ Initializing RxDB Vector Store...');

      // Initialize document processor (Web Worker)
      console.log('🤖 Loading document processor...');
      this.documentProcessor = getDocumentProcessor();
      
      // Initialize in background - don't await to avoid blocking
      this.documentProcessor.init().catch((error: any) => {
        console.error('⚠️ Document processor initialization failed:', error);
        console.log('📄 VectorStore will work without document processing');
      });

      // Create RxDB database with validation wrapper
      console.log('📚 Creating RxDB database...');
      const storage = wrappedValidateAjvStorage({
        storage: getRxStorageDexie()
      });
      
      this.database = await createRxDatabase({
        name: 'deepresearch_vectorstore',
        storage: storage,
        ignoreDuplicate: true
      });

      // Add documents collection
      console.log('📄 Creating documents collection...');
      this.documentsCollection = await this.database.addCollections({
        documents: {
          schema: documentSchema
        }
      });

      this.isInitialized = true;
      console.log('✅ RxDB Vector Store initialized successfully');
      
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

    try {
      await this.documentsCollection.documents.insert(documentData);
      console.log(`✅ Document inserted: ${documentData.id}`);
    } catch (error) {
      console.error('❌ Failed to insert document:', error);
      throw error;
    }
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

  // Make this available globally like the original
  get initialized(): boolean {
    return this.isInitialized;
  }
}

// Make VectorStore available globally - only in browser
if (typeof window !== 'undefined') {
  (window as any).VectorStore = VectorStore;
} 