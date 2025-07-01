/**
 * Local Vector Store for DeepResearch
 * Implements full RAG pipeline using localStorage and transformers.js
 * Supports documents, text files, and images with semantic search
 */

class VectorStore {
  constructor() {
    this.db = null;
    this.embeddingPipeline = null;
    this.isInitialized = false;
    this.collections = {};
    
    // Vector index configuration
    this.vectorIndexCount = 5;
    this.indexDistance = 0.003;
    this.docsPerIndexSide = 100;
    
    // Supported file types
    this.supportedTextFiles = ['.txt', '.md', '.js', '.py', '.html', '.css', '.json', '.xml', '.csv'];
    this.supportedImageFiles = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  }
  
  async init() {
    try {
      console.log('🚀 Initializing Vector Store...');
      
      // Initialize embedding pipeline
      await this.initializeEmbeddings();
      
      // Initialize database (using localStorage for now)
      await this.initializeDatabase();
      
      // Create collections
      await this.createCollections();
      
      this.isInitialized = true;
      console.log('✅ Vector Store initialized successfully');
      
    } catch (error) {
      console.error('❌ Vector Store initialization failed:', error);
      throw error;
    }
  }
  
  async initializeEmbeddings() {
    console.log('🧠 Loading embedding model...');
    try {
      // Use transformers.js for local embeddings
      if (window.transformers && window.transformers.pipeline) {
        this.embeddingPipeline = await window.transformers.pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      } else {
        // Fallback to mock embeddings for development
        console.warn('⚠️ Transformers.js not available, using mock embeddings');
        this.embeddingPipeline = { mock: true };
      }
      console.log('✅ Embedding model loaded');
    } catch (error) {
      console.warn('⚠️ Failed to load embedding model, using fallback:', error);
      this.embeddingPipeline = { mock: true };
    }
  }
  
  async initializeDatabase() {
    console.log('💾 Initializing local database...');
    
    // Using localStorage-based storage for vector store
    this.db = {
      name: 'deepresearch_vectorstore',
      storage: 'localStorage'
    };
    
    console.log('✅ Database initialized');
  }
  
  async createCollections() {
    console.log('📚 Creating collections...');
    
    // Initialize in-memory collections for now
    this.collections = {
      documents: new Map(),
      repositories: new Map(),
      vectors: new Map(),
      images: new Map(),
      research_sessions: new Map()
    };
    
    // Load existing data from localStorage
    this.loadFromStorage();
    
    console.log('✅ Collections created successfully');
  }
  
  // Generate embedding for text content
  async getEmbeddingFromText(text) {
    if (this.embeddingPipeline.mock) {
      // Mock embedding for development
      const words = text.toLowerCase().split(/\s+/);
      const embedding = new Array(384).fill(0).map((_, i) => {
        return Math.sin(i * 0.1) * words.length * Math.random();
      });
      return embedding;
    }
    
    const output = await this.embeddingPipeline(text, {
      pooling: 'mean',
      normalize: true
    });
    
    return Array.from(output.data);
  }
  
  // Add a single document
  async addDocument(file, options = {}) {
    try {
      const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const now = new Date().toISOString();
      
      console.log(`📄 Processing document: ${file.name}`);
      
      // Read file content
      let content = '';
      let type = 'file';
      
      if (this.supportedTextFiles.some(ext => file.name.toLowerCase().endsWith(ext))) {
        content = await this.readTextFile(file);
      } else if (this.supportedImageFiles.some(ext => file.name.toLowerCase().endsWith(ext))) {
        type = 'image';
        content = await this.processImageFile(file, docId);
      } else {
        throw new Error(`Unsupported file type: ${file.name}`);
      }
      
      // Create document record
      const document = {
        id: docId,
        name: file.name,
        type: type,
        mimeType: file.type,
        content: content,
        size: file.size,
        path: options.path || file.name,
        repoId: options.repoId || null,
        parentId: options.parentId || null,
        metadata: {
          originalName: file.name,
          uploadedBy: 'user',
          ...options.metadata
        },
        createdAt: now,
        updatedAt: now
      };
      
      // Insert document
      this.collections.documents.set(docId, document);
      
      // Generate and store embeddings for text content
      if (type === 'file' && content.trim()) {
        await this.generateEmbeddings(docId, content);
      }
      
      // Save to storage
      this.saveToStorage();
      
      console.log(`✅ Document added: ${file.name} (${docId})`);
      return docId;
      
    } catch (error) {
      console.error(`❌ Failed to add document ${file.name}:`, error);
      throw error;
    }
  }
  
  // Add multiple documents
  async addDocuments(files, options = {}) {
    const results = [];
    
    for (const file of files) {
      try {
        const docId = await this.addDocument(file, options);
        results.push({ success: true, docId, fileName: file.name });
      } catch (error) {
        results.push({ success: false, error: error.message, fileName: file.name });
      }
    }
    
    return results;
  }
  
  // Generate embeddings for text content
  async generateEmbeddings(documentId, content) {
    try {
      // Split content into chunks for large documents
      const chunks = this.splitIntoChunks(content, 500); // 500 words per chunk
      const sampleVectors = await this.generateSampleVectors();
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await this.getEmbeddingFromText(chunk);
        
        // Create vector record with index values
        const vectorDoc = {
          id: `vec_${documentId}_${i}`,
          documentId: documentId,
          content: chunk,
          embedding: embedding,
          chunkIndex: i,
          createdAt: new Date().toISOString()
        };
        
        // Calculate index distances for fast similarity search
        for (let idx = 0; idx < this.vectorIndexCount; idx++) {
          vectorDoc[`idx${idx}`] = this.euclideanDistance(sampleVectors[idx], embedding);
        }
        
        this.collections.vectors.set(vectorDoc.id, vectorDoc);
      }
      
      console.log(`✅ Generated ${chunks.length} embeddings for document ${documentId}`);
      
    } catch (error) {
      console.error(`❌ Failed to generate embeddings for ${documentId}:`, error);
      throw error;
    }
  }
  
  // Semantic search using vector similarity
  async search(query, options = {}) {
    try {
      const {
        limit = 10,
        minSimilarity = 0.7,
        documentIds = null,
        repositoryIds = null
      } = options;
      
      console.log(`🔍 Searching for: "${query}"`);
      
      // Generate embedding for query
      const queryEmbedding = await this.getEmbeddingFromText(query);
      
      // Get all vectors and calculate similarities
      const results = [];
      
      for (const [vectorId, vector] of this.collections.vectors) {
        // Apply filters if specified
        if (documentIds && !documentIds.includes(vector.documentId)) {
          continue;
        }
        
        const similarity = this.cosineSimilarity(queryEmbedding, vector.embedding);
        
        if (similarity >= minSimilarity) {
          // Get document metadata
          const document = this.collections.documents.get(vector.documentId);
          
          results.push({
            documentId: vector.documentId,
            content: vector.content,
            similarity: similarity,
            chunkIndex: vector.chunkIndex,
            document: document || null
          });
        }
      }
      
      // Sort by similarity and limit results
      results.sort((a, b) => b.similarity - a.similarity);
      const finalResults = results.slice(0, limit);
      
      console.log(`✅ Found ${finalResults.length} relevant results`);
      return finalResults;
      
    } catch (error) {
      console.error('❌ Search failed:', error);
      throw error;
    }
  }
  
  // Get document content by ID
  async getDocument(documentId) {
    return this.collections.documents.get(documentId) || null;
  }
  
  // Get all documents
  async getAllDocuments() {
    return Array.from(this.collections.documents.values());
  }
  
  // Delete document and its vectors
  async deleteDocument(documentId) {
    try {
      // Delete vectors
      for (const [vectorId, vector] of this.collections.vectors) {
        if (vector.documentId === documentId) {
          this.collections.vectors.delete(vectorId);
        }
      }
      
      // Delete images if any
      for (const [imageId, image] of this.collections.images) {
        if (image.documentId === documentId) {
          this.collections.images.delete(imageId);
        }
      }
      
      // Delete document
      this.collections.documents.delete(documentId);
      
      // Save to storage
      this.saveToStorage();
      
      console.log(`✅ Deleted document: ${documentId}`);
      
    } catch (error) {
      console.error(`❌ Failed to delete document ${documentId}:`, error);
      throw error;
    }
  }
  
  // Helper methods
  async readTextFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
  
  async processImageFile(file, docId) {
    try {
      // Convert image to base64
      const base64 = await this.fileToBase64(file);
      
      // Get image dimensions
      const dimensions = await this.getImageDimensions(file);
      
      // Generate description using AI (placeholder for now)
      const description = `Image: ${file.name}`;
      
      // Store image data
      const imageRecord = {
        id: `img_${docId}`,
        name: file.name,
        documentId: docId,
        blob: base64,
        mimeType: file.type,
        size: file.size,
        width: dimensions.width,
        height: dimensions.height,
        description: description,
        createdAt: new Date().toISOString()
      };
      
      this.collections.images.set(imageRecord.id, imageRecord);
      
      return description; // Return description as content for embedding
      
    } catch (error) {
      console.error('❌ Failed to process image:', error);
      throw error;
    }
  }
  
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  async getImageDimensions(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  }
  
  splitIntoChunks(text, wordsPerChunk) {
    const words = text.split(/\s+/);
    const chunks = [];
    
    for (let i = 0; i < words.length; i += wordsPerChunk) {
      chunks.push(words.slice(i, i + wordsPerChunk).join(' '));
    }
    
    return chunks.length > 0 ? chunks : [text];
  }
  
  async generateSampleVectors() {
    // Generate sample vectors for indexing
    if (!this._sampleVectors) {
      this._sampleVectors = [];
      for (let i = 0; i < this.vectorIndexCount; i++) {
        const sampleText = `Sample text for vector indexing ${i}`;
        this._sampleVectors.push(await this.getEmbeddingFromText(sampleText));
      }
    }
    return this._sampleVectors;
  }
  
  euclideanDistance(vec1, vec2) {
    let sum = 0;
    for (let i = 0; i < vec1.length; i++) {
      sum += Math.pow(vec1[i] - vec2[i], 2);
    }
    return Math.sqrt(sum);
  }
  
  cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, a) => sum + a * a, 0));
    return dotProduct / (magnitude1 * magnitude2);
  }
  
  // Storage methods
  saveToStorage() {
    try {
      const data = {
        documents: Array.from(this.collections.documents.entries()),
        repositories: Array.from(this.collections.repositories.entries()),
        vectors: Array.from(this.collections.vectors.entries()),
        images: Array.from(this.collections.images.entries()),
        research_sessions: Array.from(this.collections.research_sessions.entries())
      };
      
      localStorage.setItem('vectorStore_data', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Failed to save to storage:', error);
    }
  }
  
  loadFromStorage() {
    try {
      const data = localStorage.getItem('vectorStore_data');
      if (data) {
        const parsed = JSON.parse(data);
        
        this.collections.documents = new Map(parsed.documents || []);
        this.collections.repositories = new Map(parsed.repositories || []);
        this.collections.vectors = new Map(parsed.vectors || []);
        this.collections.images = new Map(parsed.images || []);
        this.collections.research_sessions = new Map(parsed.research_sessions || []);
        
        console.log('✅ Loaded data from storage');
      }
    } catch (error) {
      console.error('❌ Failed to load from storage:', error);
    }
  }
  
  // Export/Import functionality
  async exportData() {
    const data = {
      documents: Array.from(this.collections.documents.values()),
      repositories: Array.from(this.collections.repositories.values()),
      vectors: Array.from(this.collections.vectors.values()),
      images: Array.from(this.collections.images.values()),
      research_sessions: Array.from(this.collections.research_sessions.values()),
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0'
      }
    };
    
    return data;
  }
  
  // Get statistics
  getStats() {
    return {
      documents: this.collections.documents.size,
      repositories: this.collections.repositories.size,
      vectors: this.collections.vectors.size,
      images: this.collections.images.size,
      research_sessions: this.collections.research_sessions.size
    };
  }
}

// Export for use in DeepResearch
window.VectorStore = VectorStore; 