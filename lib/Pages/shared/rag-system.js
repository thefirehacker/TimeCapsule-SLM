/**
 * Shared RAG System - Universal document search and retrieval for TimeCapsule-SLM
 * Used by both DeepResearch and Playground to avoid code duplication
 */
class SharedRAGSystem {
  constructor() {
    this.vectorStore = null;
    this.isInitialized = false;
    this.isInitializing = false;
    this.documents = [];
    this.transformersLoaded = false;
    this.initPromise = null;
  }

  /**
   * Initialize the RAG system with proper Transformers.js loading
   */
  async initialize() {
    if (this.isInitialized) {
      return true;
    }

    if (this.isInitializing) {
      return await this.initPromise;
    }

    this.isInitializing = true;
    this.initPromise = this._performInitialization();
    
    try {
      const result = await this.initPromise;
      this.isInitialized = result;
      return result;
    } finally {
      this.isInitializing = false;
    }
  }

  async _performInitialization() {
    try {
      console.log('🚀 Initializing Shared RAG System...');

      // Check if Transformers.js is already loaded
      if (!window.transformers && !window.VECTOR_STORE_DISABLED) {
        console.log('⏳ Loading Transformers.js...');
        
        try {
          // Try multiple loading strategies
          if (!window.transformers) {
            window.transformers = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
          }
          
          this.transformersLoaded = true;
          console.log('✅ Transformers.js loaded successfully');
        } catch (error) {
          console.warn('⚠️ Failed to load Transformers.js, RAG will be disabled:', error);
          window.VECTOR_STORE_DISABLED = true;
          return false;
        }
      } else if (window.transformers) {
        this.transformersLoaded = true;
        console.log('✅ Transformers.js already available');
      }

      // Initialize Vector Store if available and not disabled
      if (window.VectorStore && !window.VECTOR_STORE_DISABLED && this.transformersLoaded) {
        // Check for existing VectorStore instances in order of preference
        if (window.sharedVectorStore && window.sharedVectorStore.isInitialized) {
          console.log('🔗 Using existing shared VectorStore instance');
          this.vectorStore = window.sharedVectorStore;
        } else if (window.deepResearchApp && window.deepResearchApp.vectorStore && window.deepResearchApp.vectorStore.isInitialized) {
          console.log('🔗 Using existing VectorStore from DeepResearch');
          this.vectorStore = window.deepResearchApp.vectorStore;
          // Also set it as the shared instance
          window.sharedVectorStore = this.vectorStore;
        } else {
          // Create new VectorStore instance
          console.log('🆕 Creating new VectorStore instance for SharedRAG');
          this.vectorStore = new VectorStore();
          await this.vectorStore.init();
          
          // Make it available globally so other components can use it
          window.sharedVectorStore = this.vectorStore;
        }
        
        console.log('✅ Shared RAG System initialized successfully');
        return true;
      } else {
        console.log('⚠️ Vector Store disabled or unavailable');
        return false;
      }

    } catch (error) {
      console.error('❌ Shared RAG System initialization failed:', error);
      return false;
    }
  }

  /**
   * Check if RAG system is ready to use
   */
  isReady() {
    return this.isInitialized && this.vectorStore && !window.VECTOR_STORE_DISABLED;
  }

  /**
   * Add a document to the vector store
   */
  async addDocument(file) {
    if (!this.isReady()) {
      throw new Error('RAG system not initialized or unavailable');
    }
    
    await this.vectorStore.addDocument(file);
    
    // Update local document list
    this.documents = this.vectorStore.getAllDocuments();
    
    console.log(`📄 Document added: ${file.name}`);
    return true;
  }

  /**
   * Search documents using semantic search
   */
  async searchDocuments(query, options = {}) {
    if (!this.isReady()) {
      throw new Error('RAG system not initialized or unavailable');
    }
    
    const defaultOptions = {
      limit: 5,
      threshold: 0.5
    };
    
    const searchOptions = { ...defaultOptions, ...options };
    return await this.vectorStore.search(query, searchOptions);
  }

  /**
   * Check if a query should use RAG
   */
  isRAGQuery(message) {
    // If we have documents available, we should try RAG for most queries
    if (!this.isReady()) {
      return false;
    }

    const lowerMessage = message.toLowerCase();
    
    // Explicit RAG keywords that always trigger RAG
    const explicitRAGKeywords = [
      'document', 'file', 'search', 'find', 'what does', 'according to', 
      'in the documents', 'from the files', 'based on the document',
      'what is mentioned', 'what says', 'content of', 'extract from',
      'summarize', 'analyze', 'explain from', 'details about'
    ];
    
    // Check for explicit RAG keywords first
    if (explicitRAGKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return true;
    }
    
    // Exclude queries that are clearly not about documents
    const nonRAGKeywords = [
      'create', 'generate', 'make me', 'build', 'design', 'write code',
      'p5.js', 'javascript', 'css', 'html', 'canvas', 'animation',
      'hello', 'hi', 'how are you', 'what is your name'
    ];
    
    // If it matches non-RAG patterns, don't use RAG
    if (nonRAGKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return false;
    }
    
    // For everything else, if we have documents, try RAG first
    // This allows questions like "fastest GPT 2 run" to search documents
    return true;
  }

  /**
   * Generate RAG-enhanced response
   */
  async generateRAGResponse(query, aiAssistant, options = {}) {
    if (!this.isReady()) {
      return "❌ Document search system not available. Please ensure documents are uploaded and the system is initialized.";
    }

    try {
      // Search documents
      const searchResults = await this.searchDocuments(query, options);
      
      if (!searchResults || searchResults.length === 0) {
        return "I couldn't find any relevant information in your documents. Try uploading some documents first or ask a different question.";
      }

      // Build context from search results
      let context = "Based on your documents:\n\n";
      searchResults.forEach((result, index) => {
        context += `**Document ${index + 1}**: ${result.document.name}\n`;
        context += `${result.content.substring(0, 300)}...\n\n`;
      });

      // Generate AI response with context
      const prompt = `You are a helpful assistant that answers questions based on provided document context. Always respond in plain text format.

Question: ${query}

Context from documents:
${context}

Instructions:
- Provide a comprehensive answer based ONLY on the document context provided above
- If the documents don't contain relevant information, say so clearly
- Cite specific documents when referencing information
- Be accurate and don't make assumptions beyond what's in the documents
- Respond in plain text format, not JSON
- Focus on being helpful and informative

Answer:`;
      
      if (!aiAssistant) {
        throw new Error('AI Assistant not available for generating response');
      }
      
      const response = await aiAssistant.generateContent(prompt, 'general');
      
      // Add document sources footer
      const sourceFooter = `\n\n---\n**Sources**: ${searchResults.map(r => r.document.name).join(', ')}`;
      
      return response + sourceFooter;
      
    } catch (error) {
      console.error('❌ RAG query failed:', error);
      return `❌ Failed to search documents: ${error.message}`;
    }
  }

  /**
   * Get all documents in the store
   */
  async getAllDocuments() {
    if (!this.isReady()) {
      return [];
    }
    
    try {
      const docs = await this.vectorStore.getAllDocuments();
      // Ensure we always return an array
      return Array.isArray(docs) ? docs : [];
    } catch (error) {
      console.error('❌ Failed to get documents:', error);
      return [];
    }
  }

  /**
   * Get vector store statistics
   */
  getStats() {
    if (!this.isReady()) {
      return {
        documentCount: 0,
        embeddingCount: 0,
        isReady: false,
        transformersLoaded: this.transformersLoaded
      };
    }
    
    return {
      documentCount: this.vectorStore.getDocumentCount(),
      embeddingCount: this.vectorStore.getEmbeddingCount(),
      isReady: this.isReady(),
      transformersLoaded: this.transformersLoaded,
      modelInfo: this.vectorStore.getModelInfo()
    };
  }

  /**
   * Clear all documents
   */
  async clearDocuments() {
    if (!this.isReady()) {
      throw new Error('RAG system not initialized or unavailable');
    }
    
    await this.vectorStore.clear();
    this.documents = [];
    console.log('🗑️ All documents cleared from RAG system');
  }

  /**
   * Generate document summary
   */
  async generateDocumentSummary() {
    const docs = await this.getAllDocuments();
    
    // Double-check that docs is an array
    if (!Array.isArray(docs) || docs.length === 0) {
      return 'No documents in store. Upload some documents first.';
    }
    
    let summary = `## 📚 Document Store Summary\n\n`;
    summary += `**Total Documents**: ${docs.length}\n`;
    summary += `**RAG System**: ${this.isReady() ? '✅ Ready' : '❌ Not Ready'}\n`;
    summary += `**Transformers.js**: ${this.transformersLoaded ? '✅ Loaded' : '❌ Not Loaded'}\n\n`;
    
    summary += `### Documents:\n`;
    docs.forEach((doc, index) => {
      // Additional safety check for each document
      if (doc && typeof doc === 'object') {
        summary += `${index + 1}. **${doc.name || 'Unknown'}** (${this.formatFileSize(doc.size || 0)})\n`;
        if (doc.type) summary += `   - Type: ${doc.type}\n`;
        if (doc.uploadDate) summary += `   - Uploaded: ${new Date(doc.uploadDate).toLocaleString()}\n`;
      }
    });
    
    summary += `\n💡 **Tip**: Ask questions about your documents using keywords like "What does the document say about..." or "Find information about..."`
    
    return summary;
  }

  /**
   * Format file size helper
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Export document metadata
   */
  async exportDocumentList() {
    const docs = await this.getAllDocuments();
    
    // Ensure docs is always an array
    const documentList = Array.isArray(docs) ? docs : [];
    
    const exportData = {
      exportDate: new Date().toISOString(),
      documentCount: documentList.length,
      ragSystemStats: this.getStats(),
      documents: documentList.map(doc => ({
        name: doc?.name || 'Unknown',
        size: doc?.size || 0,
        type: doc?.type || 'Unknown',
        uploadDate: doc?.uploadDate || new Date().toISOString()
      }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rag_documents_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('💾 Document list exported');
    return exportData;
  }
}

// Create global shared instance
if (typeof window !== 'undefined') {
  window.SharedRAG = window.SharedRAG || new SharedRAGSystem();
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharedRAGSystem;
} 