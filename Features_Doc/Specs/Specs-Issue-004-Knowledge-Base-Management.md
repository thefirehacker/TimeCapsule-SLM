# Specs: Issue-004 Knowledge Base Enhancement System

**Document**: Technical Specifications - RxDB Enhancement Plan  
**Version**: 2.0 (Updated to reflect existing implementation)  
**Created**: 2025-07-21  
**Last Updated**: 2025-07-21  
**Related Issue**: [Issue-004-Knowledge-Base-Management](../issues/Issue-004-Build-Dependencies-Fix.md)

## Executive Summary

**CRITICAL UPDATE**: The project already has a sophisticated RxDB-based Knowledge Base system implemented. This document outlines enhancements to the existing system rather than building from scratch. 

**Current System Status** ✅ (From Live UI Analysis):
- **Knowledge Base Manager UI**: Fully functional modal with organized tabs
- **Document Categorization**: User Docs (0), AI Frames (4), System (11), Logs (0)
- **Semantic Search**: Working interface with similarity threshold control (0.1+)
- **Model Caching**: Xenova/all-MiniLM-L6-v2 cached in browser (22MB+ files)
- **Cross-Page Integration**: VectorStore shared between AI Frames & Deep Research
- **Export/Import**: Full TimeCapsule + selective export options working
- **Real-Time Stats**: Live document count and size tracking (15 docs, 3.72 KB)

## System Architecture

### Current RxDB Implementation (Working!) ✅

```
┌─────────────────────────────────────────┐
│     React UI + VectorStoreProvider     │
├─────────────────────────────────────────┤
│   VectorStore.ts │ DocumentProcessor   │  
├─────────────────────────────────────────┤
│  Xenova/Transformers │ Web Workers     │ 
├─────────────────────────────────────────┤
│      RxDB + Dexie (IndexedDB)           │
├─────────────────────────────────────────┤
│    RAGTracker │ Conflict Resolution    │
└─────────────────────────────────────────┘
```

### Current Data Models (Implemented) ✅

#### RxDB Document Schema (Version 1)

```typescript
// ACTUAL IMPLEMENTED SCHEMA from VectorStore.ts
const documentSchema = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    title: { type: 'string' },
    content: { type: 'string' },
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
        // AI Frames integration fields
        bubblSpaceId: { type: 'string' },
        category: { type: 'string' },
        createdAt: { type: 'string' },
        name: { type: 'string' },
        timeCapsuleId: { type: 'string' },
        type: { type: 'string' },
        updatedAt: { type: 'string' },
        // Enhanced metadata
        color: { type: 'string' },
        isDefault: { type: 'boolean' },
        createdBy: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        version: { type: 'string' },
        privacy: { type: 'string' },
        difficulty: { type: 'string' },
        estimatedDuration: { type: 'number' },
        fullObject: { type: 'string' }
      }
    },
  
  chunks: {
    id: string;                    // UUID v4
    documentId: string;            // Foreign key to documents
    text: string;                  // Chunk content
    embedding: Float32Array;       // 768-dim embedding vector
    position: number;              // Chunk order in document
    startOffset: number;           // Character start position
    endOffset: number;             // Character end position
    tokens: number;                // Token count for cost calculation
  };
  
  images: {
    id: string;                    // UUID v4
    documentId: string;            // Foreign key to documents
    blob: Blob;                    // Image binary data
    mimeType: string;              // Image MIME type
    description: string;           // User-provided or AI-generated
    embedding: Float32Array;       // Vision embedding (512-dim)
    position: number;              // Position in document
    extractedText?: string;        // OCR text if available
  };
  
  annotations: {
    id: string;                    // UUID v4
    documentId: string;            // Foreign key to documents
    type: 'highlight' | 'note' | 'bookmark';
    content: string;               // Annotation content
    position: {                    // Position in document
      start: number;
      end: number;
    };
    color: string;                 // UI color code
    createdAt: number;             // Unix timestamp
  };
  
  searchIndex: {
    id: string;                    // Composite key: docId_term
    documentId: string;            // Foreign key to documents
    term: string;                  // Indexed term
    frequency: number;             // Term frequency
    positions: number[];           // Term positions for BM25
  };
}
```

#### Document Metadata Schema

```typescript
interface DocumentMetadata {
  title: string;                   // Display title
  description: string;             // Summary description
  tags: string[];                  // User-defined tags
  sourceUrl?: string;              // Original URL if web import
  author?: string;                 // Document author
  category: string;                // User-defined category
  language?: string;               // Auto-detected language
  pageCount?: number;              // For PDFs
  wordCount: number;               // Text word count
  customFields: Record<string, any>; // Extensible metadata
  aiGenerated: {                   // AI-enhanced metadata
    summary?: string;              // Auto-generated summary
    keywords: string[];            // Extracted keywords
    topics: string[];              // Identified topics
    sentiment?: 'positive' | 'neutral' | 'negative';
  };
}
```

## Current UI Components (Live System Analysis)

### **Knowledge Base Manager Modal** ✅

```typescript
interface KBManagerInterface {
  // Main Modal Component
  modal: {
    title: "Knowledge Base Manager";
    description: "Organized view of your documents by category. Search and manage your knowledge base content.";
    closeButton: boolean;
    fullScreenOverlay: boolean;
    responsiveDesign: boolean;
  };
  
  // Tab Navigation System (From Screenshot Analysis)
  tabs: {
    userDocs: { 
      label: "User Docs"; 
      count: 0; 
      icon: "📁"; 
      status: "empty_ready_for_upload";
    };
    aiFrames: { 
      label: "AI Frames"; 
      count: 4; 
      icon: "🎯"; 
      status: "populated_with_frame_content";
    };
    system: { 
      label: "System"; 
      count: 11; 
      icon: "⚙️"; 
      status: "populated_with_generated_docs";
    };
    logs: { 
      label: "Logs"; 
      count: 0; 
      icon: "📋"; 
      status: "empty_ready_for_logging";
    };
  };
  
  // Semantic Search Interface (Working Implementation)
  searchInterface: {
    inputField: {
      placeholder: "Semantic search user documents...";
      type: "semantic_query";
      fullWidth: boolean;
    };
    searchButton: {
      label: "Search";
      icon: "🔍";
      action: "trigger_semantic_search";
    };
    similarityThreshold: {
      type: "slider";
      label: "Similarity threshold";
      min: 0.1;
      max: 1.0;
      step: 0.1;
      currentValue: 0.1;
      display: "decimal_format";
    };
    infoBox: {
      title: "AI-Powered Semantic Search";
      description: "Search by meaning, not just keywords. Shows relevant document chunks with similarity scores.";
      style: "info_banner_blue";
    };
  };
  
  // Document Display Area (Current State)
  documentDisplay: {
    emptyState: {
      message: "No user documents found.";
      icon: "upload_placeholder";
      actionHint: "Upload documents to enable semantic search";
    };
    statistics: {
      totalDocs: 15;
      totalSize: "3.72 KB";
      format: "Total: {count} documents • {size}";
      position: "bottom_left";
    };
  };
}
```

### **Model Caching System** ✅ (From Browser DevTools)

```typescript
interface ModelCacheSystem {
  // Xenova Model Files (Actual Cached Files)
  cachedFiles: {
    "all-MiniLM-L6-v2/onnx/model_quantized.onnx": {
      size: "22,372,370 bytes"; // 22MB
      status: "cached";
      contentType: "text/plain";
      lastCached: "18/07/2025, 20:56:17";
      cacheType: "cache_storage";
    };
    "all-MiniLM-L6-v2/tokenizer.json": {
      size: "650 bytes";
      status: "cached"; 
      contentType: "text/plain";
      lastCached: "18/07/2025, 20:56:23";
    };
    "all-MiniLM-L6-v2/tokenizer_config.json": {
      size: "368 bytes";
      status: "cached";
      contentType: "text/plain";
      lastCached: "18/07/2025, 20:56:17";
    };
  };
  
  // Cache Performance (Working)
  performance: {
    totalCacheSize: "~23MB";
    persistence: "across_browser_sessions";
    loadingStrategy: "cached_first_with_fallback";
    cacheDetection: "sub_2_second_init_indicates_cache_hit";
    offline_capability: "full_offline_embeddings";
  };
}
```

### **Cross-Page Integration Pattern** ✅

```typescript
interface CrossPageIntegration {
  // VectorStore Initialization Strategy (Current Implementation)
  initPattern: {
    homePage: { 
      initVectorStore: false, 
      reason: "performance_optimization_skip_heavy_init" 
    };
    aiFramesPage: { 
      initVectorStore: true, 
      timing: "on_page_load",
      provider: "VectorStoreProvider_in_layout"
    };
    deepResearchPage: { 
      initVectorStore: true, 
      timing: "on_page_load",
      provider: "VectorStoreProvider_in_page"
    };
  };
  
  // Singleton Pattern (Working)
  sharedInstance: {
    pattern: "singleton_vectorstore";
    provider: "VectorStoreProvider";
    persistence: "cross_page_navigation";
    dataSync: "real_time_bidirectional_ai_frames_kb";
  };
  
  // Export/Import System (Fully Functional)
  dataPortability: {
    exportOptions: [
      "full_timecapsule", 
      "ai_frames_only", 
      "custom_selection"
    ];
    importOptions: [
      "refresh_replace_all", 
      "merge_combine_with_existing"
    ];
    fileFormat: "json";
    integrityCheck: "automatic_validation";
    seamless_workflow: "one_click_export_import";
  };
}
```

## Technical Implementation

### 1. IndexedDB Management

#### Database Initialization

```typescript
import { openDB, IDBPDatabase } from 'idb';

class KnowledgeBaseDB {
  private db: IDBPDatabase<KnowledgeBaseSchema>;
  
  async initialize(): Promise<void> {
    this.db = await openDB<KnowledgeBaseSchema>('KnowledgeBase', 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Documents store
        const docStore = db.createObjectStore('documents', { 
          keyPath: 'id' 
        });
        docStore.createIndex('uploadDate', 'uploadDate');
        docStore.createIndex('type', 'type');
        docStore.createIndex('hash', 'hash', { unique: true });
        
        // Chunks store with compound indexes
        const chunkStore = db.createObjectStore('chunks', { 
          keyPath: 'id' 
        });
        chunkStore.createIndex('documentId', 'documentId');
        chunkStore.createIndex('docId_position', ['documentId', 'position']);
        
        // Images store
        const imageStore = db.createObjectStore('images', { 
          keyPath: 'id' 
        });
        imageStore.createIndex('documentId', 'documentId');
        
        // Annotations store
        const annotationStore = db.createObjectStore('annotations', { 
          keyPath: 'id' 
        });
        annotationStore.createIndex('documentId', 'documentId');
        
        // Search index for BM25
        const searchStore = db.createObjectStore('searchIndex', { 
          keyPath: 'id' 
        });
        searchStore.createIndex('documentId', 'documentId');
        searchStore.createIndex('term', 'term');
      },
    });
  }
  
  // Storage management
  async getStorageUsage(): Promise<StorageEstimate> {
    return await navigator.storage.estimate();
  }
  
  async cleanupOldData(daysOld: number = 30): Promise<void> {
    const cutoff = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    // Implement cleanup logic for old documents
  }
}
```

#### Performance Optimizations

```typescript
class OptimizedQuery {
  // Batch operations for better performance
  async batchInsertChunks(chunks: ChunkData[]): Promise<void> {
    const tx = this.db.transaction('chunks', 'readwrite');
    const store = tx.objectStore('chunks');
    
    const promises = chunks.map(chunk => store.add(chunk));
    await Promise.all([...promises, tx.done]);
  }
  
  // Pagination for large result sets
  async getDocumentsPaginated(
    page: number, 
    limit: number = 50
  ): Promise<{ documents: DocumentData[], hasMore: boolean }> {
    const tx = this.db.transaction('documents', 'readonly');
    const store = tx.objectStore('documents');
    const index = store.index('uploadDate');
    
    let cursor = await index.openCursor(null, 'prev');
    let skip = page * limit;
    let count = 0;
    const documents: DocumentData[] = [];
    
    while (cursor && count < limit) {
      if (skip > 0) {
        skip--;
        cursor = await cursor.continue();
        continue;
      }
      
      documents.push(cursor.value);
      count++;
      cursor = await cursor.continue();
    }
    
    return {
      documents,
      hasMore: cursor !== null
    };
  }
}
```

### 2. Multi-Document Upload System

#### File Processing Pipeline

```typescript
interface UploadConfig {
  maxFileSize: number;          // 50MB default
  maxConcurrent: number;        // 3 concurrent uploads
  chunkSize: number;           // 1000 characters per chunk
  overlapSize: number;         // 200 character overlap
  supportedTypes: string[];    // Allowed MIME types
}

class DocumentUploadManager {
  private config: UploadConfig;
  private processingQueue: Map<string, UploadTask>;
  
  async processMultipleFiles(files: File[]): Promise<ProcessResult[]> {
    const results: ProcessResult[] = [];
    const semaphore = new Semaphore(this.config.maxConcurrent);
    
    const tasks = files.map(file => 
      semaphore.execute(() => this.processFile(file))
    );
    
    const processResults = await Promise.allSettled(tasks);
    
    return processResults.map((result, index) => ({
      file: files[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason : null
    }));
  }
  
  private async processFile(file: File): Promise<ProcessedDocument> {
    // 1. Validation
    await this.validateFile(file);
    
    // 2. Duplicate detection
    const hash = await this.calculateFileHash(file);
    const existing = await this.findByHash(hash);
    if (existing) throw new Error('Duplicate file detected');
    
    // 3. Content extraction
    const content = await this.extractContent(file);
    
    // 4. Chunking
    const chunks = await this.chunkContent(content);
    
    // 5. Metadata extraction
    const metadata = await this.extractMetadata(file, content);
    
    // 6. Image extraction (for PDFs)
    const images = await this.extractImages(file);
    
    return {
      document: { /* document data */ },
      chunks,
      images,
      metadata
    };
  }
  
  // Progress tracking
  onProgress(taskId: string, progress: UploadProgress): void {
    this.emit('upload-progress', { taskId, progress });
  }
}
```

#### File Format Parsers

```typescript
class FileParserFactory {
  static createParser(mimeType: string): FileParser {
    switch (mimeType) {
      case 'application/pdf':
        return new PDFParser();
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return new DocxParser();
      case 'text/plain':
      case 'text/markdown':
        return new TextParser();
      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  }
}

class PDFParser implements FileParser {
  async extract(file: File): Promise<ParsedContent> {
    // Using PDF.js for parsing
    const pdfDoc = await pdfjsLib.getDocument(
      await file.arrayBuffer()
    ).promise;
    
    const pages: string[] = [];
    const images: ImageData[] = [];
    
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      
      // Extract text
      const textContent = await page.getTextContent();
      const text = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      pages.push(text);
      
      // Extract images
      const pageImages = await this.extractImagesFromPage(page);
      images.push(...pageImages);
    }
    
    return {
      content: pages.join('\n\n'),
      images,
      metadata: {
        pageCount: pdfDoc.numPages,
        wordCount: this.countWords(pages.join(' '))
      }
    };
  }
}
```

### 3. Embedding System

#### Hybrid Embedding Strategy

```typescript
interface EmbeddingProvider {
  embed(text: string): Promise<Float32Array>;
  embedBatch(texts: string[]): Promise<Float32Array[]>;
  getDimensions(): number;
  getMaxTokens(): number;
}

class HybridEmbeddingService {
  private localProvider: TransformersEmbedding;
  private remoteProvider: OpenAIEmbedding;
  private isOnline: boolean;
  
  async initialize(): Promise<void> {
    // Initialize local model (lighter model for offline)
    this.localProvider = new TransformersEmbedding({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      quantized: true // Reduce model size
    });
    
    // Remote provider for higher quality when online
    this.remoteProvider = new OpenAIEmbedding({
      model: 'text-embedding-3-small',
      dimensions: 768
    });
    
    // Monitor online status
    this.isOnline = navigator.onLine;
    window.addEventListener('online', () => this.isOnline = true);
    window.addEventListener('offline', () => this.isOnline = false);
  }
  
  async embed(text: string): Promise<Float32Array> {
    const provider = this.selectProvider();
    
    try {
      return await provider.embed(text);
    } catch (error) {
      // Fallback to local if remote fails
      if (provider === this.remoteProvider) {
        console.warn('Remote embedding failed, falling back to local');
        return await this.localProvider.embed(text);
      }
      throw error;
    }
  }
  
  private selectProvider(): EmbeddingProvider {
    // Prefer remote for better quality, fall back to local
    return this.isOnline && this.remoteProvider.isReady() 
      ? this.remoteProvider 
      : this.localProvider;
  }
  
  // Batch processing for efficiency
  async embedDocumentChunks(chunks: string[]): Promise<Float32Array[]> {
    const batchSize = 32; // Optimal batch size
    const results: Float32Array[] = [];
    
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const embeddings = await this.embed(batch.join(' ')); // Simple concatenation
      results.push(...await Promise.all(
        batch.map(chunk => this.embed(chunk))
      ));
      
      // Progress callback
      this.onProgress({
        completed: Math.min(i + batchSize, chunks.length),
        total: chunks.length
      });
    }
    
    return results;
  }
}
```

#### Text Chunking Strategy

```typescript
class SmartChunker {
  private config: ChunkingConfig;
  
  constructor(config: ChunkingConfig) {
    this.config = {
      chunkSize: 1000,        // Characters per chunk
      overlapSize: 200,       // Character overlap
      preserveBoundaries: true, // Keep sentences intact
      ...config
    };
  }
  
  chunk(text: string): TextChunk[] {
    // 1. Sentence segmentation
    const sentences = this.segmentSentences(text);
    
    // 2. Semantic chunking
    const chunks: TextChunk[] = [];
    let currentChunk = '';
    let currentPosition = 0;
    
    for (const sentence of sentences) {
      const proposedChunk = currentChunk + ' ' + sentence;
      
      if (proposedChunk.length > this.config.chunkSize && currentChunk) {
        // Finalize current chunk
        chunks.push({
          id: generateId(),
          text: currentChunk.trim(),
          startOffset: currentPosition,
          endOffset: currentPosition + currentChunk.length,
          tokens: this.estimateTokens(currentChunk)
        });
        
        // Start new chunk with overlap
        const overlap = this.extractOverlap(currentChunk);
        currentChunk = overlap + sentence;
        currentPosition += currentChunk.length - overlap.length;
      } else {
        currentChunk = proposedChunk;
      }
    }
    
    // Add final chunk
    if (currentChunk.trim()) {
      chunks.push({
        id: generateId(),
        text: currentChunk.trim(),
        startOffset: currentPosition,
        endOffset: currentPosition + currentChunk.length,
        tokens: this.estimateTokens(currentChunk)
      });
    }
    
    return chunks;
  }
  
  private segmentSentences(text: string): string[] {
    // Enhanced sentence segmentation with proper handling of abbreviations
    return text
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .filter(sentence => sentence.trim().length > 0);
  }
}
```

### 4. Advanced RAG Search Engine

#### Multi-Modal Search Implementation

```typescript
class AdvancedRAGEngine {
  private embeddingService: HybridEmbeddingService;
  private bm25Index: BM25Index;
  private crossEncoder: CrossEncoder;
  private db: KnowledgeBaseDB;
  
  async search(query: SearchQuery): Promise<SearchResults> {
    const results = await Promise.all([
      this.semanticSearch(query.text),
      this.keywordSearch(query.text),
      query.includeImages ? this.visualSearch(query.text) : null
    ]);
    
    // Combine and rank results
    const combinedResults = this.combineResults(
      results[0], // semantic
      results[1], // keyword  
      results[2]  // visual
    );
    
    // Cross-encoder reranking for top results
    const reranked = await this.crossEncoder.rerank(
      query.text,
      combinedResults.slice(0, 50) // Rerank top 50
    );
    
    return {
      results: reranked.slice(0, query.limit || 10),
      totalCount: combinedResults.length,
      searchTime: Date.now() - query.startTime,
      usedModalities: this.getUsedModalities(results)
    };
  }
  
  private async semanticSearch(query: string): Promise<SearchResult[]> {
    const queryEmbedding = await this.embeddingService.embed(query);
    
    // Vector similarity search
    const chunks = await this.db.getAllChunks();
    const similarities = chunks.map(chunk => ({
      chunk,
      similarity: this.cosineSimilarity(queryEmbedding, chunk.embedding)
    }));
    
    return similarities
      .filter(item => item.similarity > 0.3) // Threshold
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 100)
      .map(item => ({
        type: 'text',
        documentId: item.chunk.documentId,
        chunkId: item.chunk.id,
        content: item.chunk.text,
        score: item.similarity,
        source: 'semantic'
      }));
  }
  
  private async keywordSearch(query: string): Promise<SearchResult[]> {
    // BM25 keyword search
    const terms = this.tokenize(query);
    const scores = await this.bm25Index.search(terms);
    
    return scores
      .slice(0, 100)
      .map(result => ({
        type: 'text',
        documentId: result.documentId,
        chunkId: result.chunkId,
        content: result.content,
        score: result.bm25Score,
        source: 'keyword',
        matchedTerms: result.matchedTerms
      }));
  }
  
  private async visualSearch(query: string): Promise<SearchResult[]> {
    // CLIP-style image-text search
    const queryEmbedding = await this.embeddingService.embedImage(query);
    
    const images = await this.db.getAllImages();
    const similarities = images.map(image => ({
      image,
      similarity: this.cosineSimilarity(queryEmbedding, image.embedding)
    }));
    
    return similarities
      .filter(item => item.similarity > 0.25)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20)
      .map(item => ({
        type: 'image',
        documentId: item.image.documentId,
        imageId: item.image.id,
        content: item.image.description,
        score: item.similarity,
        source: 'visual',
        imageUrl: URL.createObjectURL(item.image.blob)
      }));
  }
  
  private combineResults(
    semantic: SearchResult[],
    keyword: SearchResult[],
    visual: SearchResult[]
  ): SearchResult[] {
    // Reciprocal Rank Fusion (RRF) algorithm
    const k = 60; // RRF parameter
    const scoreMap = new Map<string, {result: SearchResult, score: number}>();
    
    // Process semantic results
    semantic.forEach((result, rank) => {
      const key = `${result.documentId}_${result.chunkId || result.imageId}`;
      const rrf_score = 1 / (k + rank + 1);
      scoreMap.set(key, {
        result: { ...result, combinedScore: rrf_score },
        score: rrf_score
      });
    });
    
    // Add keyword results
    keyword.forEach((result, rank) => {
      const key = `${result.documentId}_${result.chunkId}`;
      const rrf_score = 1 / (k + rank + 1);
      const existing = scoreMap.get(key);
      
      if (existing) {
        existing.score += rrf_score;
        existing.result.combinedScore = existing.score;
        existing.result.sources = [
          ...(existing.result.sources || [existing.result.source]),
          'keyword'
        ];
      } else {
        scoreMap.set(key, {
          result: { ...result, combinedScore: rrf_score },
          score: rrf_score
        });
      }
    });
    
    // Add visual results
    if (visual) {
      visual.forEach((result, rank) => {
        const key = `${result.documentId}_${result.imageId}`;
        const rrf_score = 1 / (k + rank + 1);
        scoreMap.set(key, {
          result: { ...result, combinedScore: rrf_score },
          score: rrf_score
        });
      });
    }
    
    return Array.from(scoreMap.values())
      .sort((a, b) => b.score - a.score)
      .map(item => item.result);
  }
}
```

#### BM25 Indexing

```typescript
class BM25Index {
  private k1: number = 1.2;  // Term frequency saturation point
  private b: number = 0.75;  // Length normalization
  private avgDocLength: number = 0;
  private docLengths: Map<string, number> = new Map();
  private termFreqs: Map<string, Map<string, number>> = new Map();
  private docFreqs: Map<string, number> = new Map();
  private totalDocs: number = 0;
  
  async buildIndex(documents: IndexDocument[]): Promise<void> {
    this.totalDocs = documents.length;
    let totalLength = 0;
    
    // Calculate document statistics
    for (const doc of documents) {
      const tokens = this.tokenize(doc.content);
      const docLength = tokens.length;
      totalLength += docLength;
      
      this.docLengths.set(doc.id, docLength);
      
      // Count term frequencies in document
      const termCounts = new Map<string, number>();
      for (const token of tokens) {
        termCounts.set(token, (termCounts.get(token) || 0) + 1);
      }
      
      this.termFreqs.set(doc.id, termCounts);
      
      // Update document frequencies
      for (const term of termCounts.keys()) {
        this.docFreqs.set(term, (this.docFreqs.get(term) || 0) + 1);
      }
    }
    
    this.avgDocLength = totalLength / this.totalDocs;
  }
  
  search(queryTerms: string[]): BM25Result[] {
    const scores = new Map<string, number>();
    
    for (const docId of this.docLengths.keys()) {
      let score = 0;
      const docTerms = this.termFreqs.get(docId)!;
      const docLength = this.docLengths.get(docId)!;
      
      for (const term of queryTerms) {
        const termFreq = docTerms.get(term) || 0;
        const docFreq = this.docFreqs.get(term) || 0;
        
        if (termFreq > 0) {
          const idf = Math.log((this.totalDocs - docFreq + 0.5) / (docFreq + 0.5));
          const tf = (termFreq * (this.k1 + 1)) / 
                     (termFreq + this.k1 * (1 - this.b + this.b * docLength / this.avgDocLength));
          
          score += idf * tf;
        }
      }
      
      if (score > 0) {
        scores.set(docId, score);
      }
    }
    
    return Array.from(scores.entries())
      .map(([docId, score]) => ({ docId, score }))
      .sort((a, b) => b.score - a.score);
  }
}
```

### 5. Document Annotation System

```typescript
interface Annotation {
  id: string;
  documentId: string;
  type: 'highlight' | 'note' | 'bookmark' | 'tag';
  content: string;
  position: {
    start: number;
    end: number;
    page?: number; // For PDFs
  };
  color: string;
  createdAt: number;
  updatedAt: number;
  userId?: string; // For multi-user support
}

class AnnotationManager {
  private db: KnowledgeBaseDB;
  private eventEmitter: EventEmitter;
  
  async createAnnotation(annotation: Omit<Annotation, 'id' | 'createdAt' | 'updatedAt'>): Promise<Annotation> {
    const newAnnotation: Annotation = {
      ...annotation,
      id: generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    await this.db.addAnnotation(newAnnotation);
    this.eventEmitter.emit('annotation-created', newAnnotation);
    
    return newAnnotation;
  }
  
  async getDocumentAnnotations(documentId: string): Promise<Annotation[]> {
    return await this.db.getAnnotationsByDocument(documentId);
  }
  
  async searchAnnotations(query: string): Promise<Annotation[]> {
    const annotations = await this.db.getAllAnnotations();
    return annotations.filter(annotation => 
      annotation.content.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Batch operations for performance
  async exportAnnotations(documentId: string): Promise<AnnotationExport> {
    const annotations = await this.getDocumentAnnotations(documentId);
    const document = await this.db.getDocument(documentId);
    
    return {
      document: {
        id: document.id,
        title: document.title,
        type: document.type
      },
      annotations: annotations.map(ann => ({
        type: ann.type,
        content: ann.content,
        position: ann.position,
        createdAt: new Date(ann.createdAt).toISOString()
      })),
      exportedAt: new Date().toISOString()
    };
  }
}
```

## Performance Requirements

### Storage Optimization

| Metric | Target | Monitoring |
|--------|--------|------------|
| **Storage Efficiency** | < 2x original file size | Storage ratio tracking |
| **Embedding Compression** | 4:1 compression ratio | Size before/after |
| **Query Response Time** | < 200ms for 1K docs | Response time metrics |
| **Upload Processing** | < 5s per document | Processing time tracking |
| **Memory Usage** | < 512MB peak | Memory profiling |

### Scalability Targets

```typescript
interface PerformanceMetrics {
  documents: {
    max: 10000;              // Maximum documents
    concurrent_upload: 10;    // Concurrent uploads
    processing_time: 5000;    // 5s per document
  };
  
  search: {
    response_time: 200;       // 200ms target
    concurrent_queries: 50;   // Concurrent searches
    result_limit: 100;        // Max results per query
  };
  
  storage: {
    max_size: '2GB';          // IndexedDB limit
    compression_ratio: 0.25;  // 4:1 compression
    cleanup_threshold: 0.8;   // Cleanup at 80% full
  };
}
```

## Error Handling & Recovery

### Resilience Patterns

```typescript
class ErrorRecoveryManager {
  async recoverFromStorageQuota(): Promise<void> {
    // 1. Calculate current usage
    const usage = await navigator.storage.estimate();
    
    if (usage.usage / usage.quota > 0.9) {
      // 2. Cleanup old documents
      await this.cleanupOldDocuments(30); // 30 days old
      
      // 3. Compress embeddings
      await this.compressEmbeddings();
      
      // 4. Remove duplicate chunks
      await this.deduplicateChunks();
    }
  }
  
  async recoverFromCorruptedData(): Promise<void> {
    try {
      // Validate database integrity
      await this.validateDatabaseIntegrity();
    } catch (error) {
      // Rebuild indexes if corrupted
      await this.rebuildSearchIndexes();
    }
  }
  
  async retryFailedUploads(): Promise<void> {
    const failed = await this.db.getDocumentsByStatus('failed');
    
    for (const doc of failed) {
      try {
        await this.reprocessDocument(doc.id);
        await this.db.updateDocumentStatus(doc.id, 'completed');
      } catch (error) {
        console.error(`Failed to reprocess document ${doc.id}:`, error);
        // Implement exponential backoff
        await this.scheduleRetry(doc.id, error);
      }
    }
  }
}
```

## Security & Privacy

### Data Protection

```typescript
class SecurityManager {
  // Client-side encryption for sensitive documents
  async encryptSensitiveContent(content: string, password: string): Promise<string> {
    const key = await this.deriveKey(password);
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) },
      key,
      new TextEncoder().encode(content)
    );
    return this.arrayBufferToBase64(encrypted);
  }
  
  // Secure embedding storage (optional encryption)
  async secureEmbeddingStorage(embeddings: Float32Array[]): Promise<void> {
    // Hash-based deduplication without exposing content
    const hashes = embeddings.map(emb => 
      this.hashEmbedding(emb)
    );
    
    // Store with privacy-preserving techniques
    await this.storeSecurely(embeddings, hashes);
  }
  
  // Data sanitization
  sanitizeDocumentContent(content: string): string {
    // Remove PII patterns
    return content
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]') // SSN
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]') // Email
      .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]'); // Credit card
  }
}
```

## Testing Strategy

### Test Coverage Requirements

```typescript
describe('Knowledge Base Management System', () => {
  describe('Document Upload', () => {
    it('should handle multiple file formats simultaneously');
    it('should detect and prevent duplicate uploads');
    it('should recover from failed uploads');
    it('should maintain progress tracking accuracy');
  });
  
  describe('IndexedDB Operations', () => {
    it('should handle concurrent read/write operations');
    it('should maintain data integrity during interruptions');
    it('should perform efficient pagination queries');
    it('should cleanup storage when quota exceeded');
  });
  
  describe('Embedding & Search', () => {
    it('should provide consistent embedding results');
    it('should handle online/offline mode switching');
    it('should maintain search performance with 10K documents');
    it('should provide accurate multi-modal search results');
  });
  
  describe('Performance', () => {
    it('should load 1000 documents under 2 seconds');
    it('should respond to queries under 200ms');
    it('should handle page refresh without data loss');
    it('should compress embeddings effectively');
  });
});
```

## Deployment & Monitoring

### Performance Monitoring

```typescript
class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    uploadTimes: [],
    searchTimes: [],
    storageUsage: 0,
    errorRates: new Map()
  };
  
  trackUploadPerformance(fileSize: number, processingTime: number): void {
    this.metrics.uploadTimes.push({
      timestamp: Date.now(),
      fileSize,
      processingTime,
      throughput: fileSize / processingTime
    });
    
    // Alert if performance degrades
    if (processingTime > 10000) { // 10s threshold
      this.alertSlowUpload(fileSize, processingTime);
    }
  }
  
  async generatePerformanceReport(): Promise<PerformanceReport> {
    const usage = await navigator.storage.estimate();
    
    return {
      storage: {
        used: usage.usage,
        total: usage.quota,
        utilization: usage.usage / usage.quota
      },
      performance: {
        avgUploadTime: this.calculateAverage(this.metrics.uploadTimes.map(t => t.processingTime)),
        avgSearchTime: this.calculateAverage(this.metrics.searchTimes),
        errorRate: this.calculateErrorRate()
      },
      recommendations: this.generateRecommendations()
    };
  }
}
```

---

**Document Status**: DRAFT - Ready for Implementation  
**Next Review**: Week 1 Implementation Checkpoint  
**Approval Required**: Technical Architecture & Storage Strategy 