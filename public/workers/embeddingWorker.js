// Document Processing Worker
// This worker handles document chunking and embedding generation

let isInitialized = false;
let embeddingModel = null;

// Worker message handler
self.onmessage = async function(e) {
  const { type, data, id } = e.data;
  
  try {
    switch (type) {
      case 'init':
        await initialize();
        self.postMessage({ type: 'init_complete', id });
        break;
        
      case 'process_document':
        if (!isInitialized) {
          throw new Error('Worker not initialized');
        }
        
        const result = await processDocument(data);
        self.postMessage({ type: 'document_processed', data: result, id });
        break;
        
      case 'generate_embedding':
        if (!isInitialized) {
          throw new Error('Worker not initialized');
        }
        
        const embedding = await generateEmbedding(data.text);
        self.postMessage({ type: 'embedding_generated', data: embedding, id });
        break;
        
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      error: error.message, 
      id 
    });
  }
};

// Initialize the worker
async function initialize() {
  try {
    // Report progress
    self.postMessage({ type: 'progress', data: { status: 'loading_model' } });
    
    // In a real implementation, you would load the embedding model here
    // For now, we'll simulate the initialization
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    isInitialized = true;
    console.log('✅ Worker initialized successfully');
    
    self.postMessage({ type: 'progress', data: { status: 'ready' } });
  } catch (error) {
    console.error('❌ Worker initialization failed:', error);
    throw error;
  }
}

// Process document into chunks
async function processDocument(documentData) {
  const { content, title, metadata } = documentData;
  
  // Simple text chunking (in production, use more sophisticated chunking)
  const chunks = simpleChunk(content);
  
  // Generate embeddings for each chunk (simulated for now)
  const processedChunks = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    
    // Report progress
    self.postMessage({ 
      type: 'progress', 
      data: { 
        status: 'processing',
        current: i + 1,
        total: chunks.length
      } 
    });
    
    // Generate embedding (simulated)
    const embedding = await generateEmbedding(chunk);
    
    processedChunks.push({
      index: i,
      content: chunk,
      embedding: embedding,
      wordCount: chunk.split(' ').length
    });
  }
  
  return {
    id: documentData.id,
    title: title,
    metadata: metadata,
    chunks: processedChunks,
    totalChunks: processedChunks.length
  };
}

// Simple text chunking function
function simpleChunk(text) {
  const maxChunkSize = 500; // words
  const words = text.split(' ');
  const chunks = [];
  
  for (let i = 0; i < words.length; i += maxChunkSize) {
    chunks.push(words.slice(i, i + maxChunkSize).join(' '));
  }
  
  return chunks.length > 0 ? chunks : [text];
}

// Generate embedding for text (simulated)
async function generateEmbedding(text) {
  // In a real implementation, this would use a proper embedding model
  // For now, we'll return a simulated embedding vector
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 10));
  
  // Generate a simple hash-based embedding (not suitable for production)
  const embedding = [];
  const dimension = 384; // Common embedding dimension
  
  // Simple hash function to generate consistent embeddings
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Generate embedding vector based on hash
  for (let i = 0; i < dimension; i++) {
    const value = Math.sin(hash * (i + 1) * 0.1) * 0.5;
    embedding.push(value);
  }
  
  // Normalize the embedding
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / magnitude);
}

// Error handling
self.onerror = function(error) {
  console.error('❌ Worker error:', error);
  self.postMessage({ 
    type: 'error', 
    error: error.message || 'Unknown worker error' 
  });
};

console.log('🔧 Document processing worker loaded'); 