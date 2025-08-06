// Text Processing Worker - Handles text chunking and processing only
// Embeddings are handled in main thread via EmbeddingService for better reliability

let isInitialized = false;

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
        self.postMessage({ 
          type: 'document_processed', 
          data: result, 
          id 
        });
        break;
        
      case 'chunk_text':
        if (!isInitialized) {
          throw new Error('Worker not initialized');
        }
        
        const chunks = await chunkText(data.text, data.options || {});
        self.postMessage({ 
          type: 'text_chunked', 
          data: chunks, 
          id 
        });
        break;
        
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    console.error('❌ Worker error:', error);
    self.postMessage({ 
      type: 'error', 
      error: error.message, 
      id 
    });
  }
};

// Initialize the worker (lightweight - no ML libraries)
async function initialize() {
  try {
    console.log('🔧 Initializing text processing worker...');
    
    // Report progress
    self.postMessage({ 
      type: 'progress', 
      data: { 
        status: 'initializing',
        message: 'Initializing text processing...',
        progress: 50
      } 
    });
    
    isInitialized = true;
    
    console.log('✅ Text processing worker initialized successfully');
    
    self.postMessage({ 
      type: 'progress', 
      data: { 
        status: 'ready',
        message: 'Text processing ready',
        progress: 100
      } 
    });
    
  } catch (error) {
    console.error('❌ Worker initialization failed:', error);
    throw new Error('Failed to initialize text processing worker');
  }
}

// Process document - chunking only (no embeddings)
async function processDocument(documentData) {
  console.log(`📄 Processing document: ${documentData.title}`);
  console.log(`📊 Document stats: ${documentData.content.length} characters, ${documentData.content.split(/\s+/).length} words`);
  
  const startTime = Date.now();
  
  // Report progress
  self.postMessage({ 
    type: 'progress', 
    data: { 
      status: 'chunking',
      message: 'Breaking document into chunks...',
      progress: 25
    } 
  });
  
  // Chunk the document text using optimized word-based chunking
  const chunks = await chunkText(documentData.content, {
    wordsPerChunk: 250,
    overlapWords: 50,
    maxChunks: 200
  });
  
  self.postMessage({ 
    type: 'progress', 
    data: { 
      status: 'processing',
      message: `Processed ${chunks.length} text chunks`,
      progress: 75
    } 
  });
  
  const processingTime = Date.now() - startTime;
  console.log(`✅ Document chunked in ${processingTime}ms: ${chunks.length} chunks`);
  
  // Return processed document (without embeddings)
  return {
    id: documentData.id,
    title: documentData.title,
    content: documentData.content,
    metadata: documentData.metadata,
    chunks: chunks,
    processingTime: processingTime
  };
}

// Chunk text into smaller pieces - Word-based chunking with overlap and memory safety
async function chunkText(text, options = {}) {
  const wordsPerChunk = options.wordsPerChunk || 250;
  const overlapWords = options.overlapWords || 50;
  const maxChunks = options.maxChunks || 200;
  
  console.log(`📝 Chunking text: ${text.length} characters`);
  
  // Split text into words
  const words = text.split(/\s+/).filter(word => word.length > 0);
  console.log(`📊 Total words: ${words.length}`);
  
  const chunks = [];
  let chunkIndex = 0;
  let currentPosition = 0;
  
  // Calculate step size (chunk size minus overlap)
  const stepSize = Math.max(wordsPerChunk - overlapWords, wordsPerChunk / 2);
  const totalPossibleChunks = Math.min(Math.ceil(words.length / stepSize), maxChunks);
  
  console.log(`📊 Chunking parameters: ${wordsPerChunk} words/chunk, ${overlapWords} overlap, ${stepSize} step`);
  
  // Create word-based chunks with overlap and progress reporting
  while (currentPosition < words.length && chunkIndex < maxChunks) {
    const endPosition = Math.min(currentPosition + wordsPerChunk, words.length);
    const chunkWords = words.slice(currentPosition, endPosition);
    const chunkContent = chunkWords.join(' ');
    
    // Calculate character positions for compatibility
    const wordsBeforeChunk = words.slice(0, currentPosition);
    const startIndex = wordsBeforeChunk.join(' ').length + (wordsBeforeChunk.length > 0 ? 1 : 0);
    const endIndex = startIndex + chunkContent.length;
    
    chunks.push({
      index: chunkIndex,
      content: chunkContent.trim(),
      startIndex: startIndex,
      endIndex: endIndex,
      wordCount: chunkWords.length,
      hasOverlap: chunkIndex > 0 && overlapWords > 0
    });
    
    chunkIndex++;
    
    // Move position forward by step size (creates overlap)
    currentPosition += stepSize;
    
    // Report progress during chunking (25% to 75% range)
    const progress = Math.round(25 + (chunkIndex / totalPossibleChunks) * 50);
    self.postMessage({ 
      type: 'progress', 
      data: { 
        status: 'chunking',
        message: `Processing chunk ${chunkIndex}/${Math.min(totalPossibleChunks, maxChunks)} (${overlapWords > 0 ? 'with overlap' : 'no overlap'})...`,
        progress: progress
      } 
    });
    
    // Break if we've processed all text (avoid infinite loop)
    if (endPosition >= words.length) {
      break;
    }
  }
  
  if (chunkIndex >= maxChunks && currentPosition < words.length) {
    console.warn(`⚠️ Reached maximum chunk limit (${maxChunks}), truncating document`);
  }
  
  console.log(`✅ Created ${chunks.length} word-based chunks (${wordsPerChunk} words per chunk, ${overlapWords} word overlap, max ${maxChunks} chunks)`);
  
  // Return at least one chunk even if text is empty
  if (chunks.length === 0) {
    chunks.push({
      index: 0,
      content: text.trim(),
      startIndex: 0,
      endIndex: text.length,
      wordCount: words.length,
      hasOverlap: false
    });
  }
  
  return chunks;
}

// Error handling
self.onerror = function(error) {
  console.error('❌ Worker error:', error);
  self.postMessage({ 
    type: 'error', 
    error: error.message || 'Unknown worker error' 
  });
};

console.log('🔧 Text processing worker loaded successfully'); 