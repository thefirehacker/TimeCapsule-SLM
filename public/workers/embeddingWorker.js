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

// Chunk text into smaller pieces - Table-aware chunking with word overlap and memory safety
async function chunkText(text, options = {}) {
  const wordsPerChunk = options.wordsPerChunk || 250;
  const overlapWords = options.overlapWords || 50;
  const maxChunks = options.maxChunks || 200;
  
  console.log(`📝 Chunking text: ${text.length} characters`);
  
  // First, detect and preserve table structure
  const tableAwareSegments = detectTableSegments(text);
  console.log(`📊 Detected ${tableAwareSegments.length} text segments (tables preserved)`);
  
  const chunks = [];
  let chunkIndex = 0;
  let totalCharPosition = 0;
  
  console.log(`📊 Chunking parameters: ${wordsPerChunk} words/chunk, ${overlapWords} overlap, table-aware`);
  
  // Process each segment (table or text)
  for (let segmentIdx = 0; segmentIdx < tableAwareSegments.length && chunkIndex < maxChunks; segmentIdx++) {
    const segment = tableAwareSegments[segmentIdx];
    
    if (segment.type === 'table') {
      // For tables: each row becomes its own chunk to preserve structure
      // But limit chunk size to prevent massive single chunks
      for (const line of segment.lines) {
        if (chunkIndex >= maxChunks) break;
        
        const trimmedLine = line.trim();
        if (trimmedLine.length === 0) continue;
        
        const wordCount = trimmedLine.split(/\s+/).length;
        
        // CRITICAL: Prevent massive table row chunks - split if too large
        if (trimmedLine.length > 1000) {
          console.warn(`⚠️ Large table row (${trimmedLine.length} chars), splitting into text chunks`);
          // Split oversized table rows into regular text chunks
          const words = trimmedLine.split(/\s+/);
          let currentPosition = 0;
          const stepSize = Math.max(wordsPerChunk - overlapWords, wordsPerChunk / 2);
          
          while (currentPosition < words.length && chunkIndex < maxChunks) {
            const endPosition = Math.min(currentPosition + wordsPerChunk, words.length);
            const chunkWords = words.slice(currentPosition, endPosition);
            const chunkContent = chunkWords.join(' ');
            
            chunks.push({
              index: chunkIndex,
              content: chunkContent.trim(),
              startIndex: totalCharPosition,
              endIndex: totalCharPosition + chunkContent.length,
              wordCount: chunkWords.length,
              hasOverlap: chunkIndex > 0 && overlapWords > 0,
              isTableRow: false // Treat oversized table rows as text
            });
            
            chunkIndex++;
            currentPosition += stepSize;
            totalCharPosition += chunkContent.length + 1;
            
            if (endPosition >= words.length) break;
          }
        } else {
          // Normal-sized table row
          chunks.push({
            index: chunkIndex,
            content: trimmedLine,
            startIndex: totalCharPosition,
            endIndex: totalCharPosition + trimmedLine.length,
            wordCount: wordCount,
            hasOverlap: false,
            isTableRow: true
          });
          
          chunkIndex++;
          totalCharPosition += trimmedLine.length + 1; // +1 for newline
        }
        
        // Report progress
        const progress = Math.round(25 + (segmentIdx / tableAwareSegments.length) * 50);
        self.postMessage({ 
          type: 'progress', 
          data: { 
            status: 'chunking',
            message: `Processing table row ${chunkIndex}...`,
            progress: progress
          } 
        });
      }
    } else {
      // For regular text: word-based chunking with overlap
      const words = segment.content.split(/\s+/).filter(word => word.length > 0);
      let currentPosition = 0;
      const stepSize = Math.max(wordsPerChunk - overlapWords, wordsPerChunk / 2);
      
      while (currentPosition < words.length && chunkIndex < maxChunks) {
        const endPosition = Math.min(currentPosition + wordsPerChunk, words.length);
        const chunkWords = words.slice(currentPosition, endPosition);
        const chunkContent = chunkWords.join(' ');
        
        chunks.push({
          index: chunkIndex,
          content: chunkContent.trim(),
          startIndex: totalCharPosition,
          endIndex: totalCharPosition + chunkContent.length,
          wordCount: chunkWords.length,
          hasOverlap: chunkIndex > 0 && overlapWords > 0,
          isTableRow: false
        });
        
        chunkIndex++;
        currentPosition += stepSize;
        totalCharPosition += chunkContent.length + 1; // +1 for spacing
        
        // Report progress
        const progress = Math.round(25 + (segmentIdx / tableAwareSegments.length) * 50);
        self.postMessage({ 
          type: 'progress', 
          data: { 
            status: 'chunking',
            message: `Processing text chunk ${chunkIndex} (segment ${segmentIdx + 1}/${tableAwareSegments.length})...`,
            progress: progress
          } 
        });
        
        // Break if we've processed all words in this segment
        if (endPosition >= words.length) {
          break;
        }
      }
    }
  }
  
  if (chunkIndex >= maxChunks) {
    console.warn(`⚠️ Reached maximum chunk limit (${maxChunks}), some content may be truncated`);
  }
  
  console.log(`✅ Created ${chunks.length} table-aware chunks (${chunks.filter(c => c.isTableRow).length} table rows, ${chunks.filter(c => !c.isTableRow).length} text chunks)`);
  
  // Return at least one chunk even if text is empty
  if (chunks.length === 0) {
    chunks.push({
      index: 0,
      content: text.trim(),
      startIndex: 0,
      endIndex: text.length,
      wordCount: text.split(/\s+/).length,
      hasOverlap: false,
      isTableRow: false
    });
  }
  
  return chunks;
}

/**
 * Detect table segments and regular text segments with structural markers
 * Ensures table rows are not split across chunks and preserves markers
 */
function detectTableSegments(text) {
  const lines = text.split('\n');
  const segments = [];
  let currentSegment = {
    type: 'text',
    content: '',
    lines: [],
    markers: []
  };
  
  // Track consecutive table rows to identify actual tables
  let consecutiveTableRows = 0;
  const MIN_TABLE_ROWS = 3; // Need at least 3 rows to consider it a table
  const MAX_SINGLE_CHUNK_SIZE = 2000; // Character limit for single chunks
  
  // Track structural markers
  let inStructuralTable = false;
  let inStructuralSection = false;
  let currentSection = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for structural markers first
    if (line.startsWith('<START_TABLE>')) {
      inStructuralTable = true;
      // Finish current segment if it has content
      if (currentSegment.content.trim().length > 0) {
        segments.push({...currentSegment});
        currentSegment = { type: 'table', content: '', lines: [], markers: ['START_TABLE'] };
      } else {
        currentSegment.type = 'table';
        currentSegment.markers.push('START_TABLE');
      }
      continue;
    }
    
    if (line.startsWith('<END_TABLE>')) {
      inStructuralTable = false;
      // Add table segment
      if (currentSegment.content.trim().length > 0) {
        currentSegment.markers.push('END_TABLE');
        segments.push({...currentSegment});
        currentSegment = { type: 'text', content: '', lines: [], markers: [] };
      }
      continue;
    }
    
    if (line.startsWith('<TABLE_ROW>') || line.startsWith('<TABLE_HEADER>')) {
      // This is a marked table row
      currentSegment.lines.push(line);
      currentSegment.content += (currentSegment.content ? '\n' : '') + line;
      currentSegment.markers.push(line.startsWith('<TABLE_ROW>') ? 'TABLE_ROW' : 'TABLE_HEADER');
      continue;
    }
    
    if (line.startsWith('<START_SECTION:')) {
      const sectionMatch = line.match(/<START_SECTION:([^>]+)>/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        currentSegment.markers.push('START_SECTION');
      }
      currentSegment.content += (currentSegment.content ? '\n' : '') + line;
      currentSegment.lines.push(line);
      continue;
    }
    
    if (line.startsWith('<END_SECTION>')) {
      currentSection = null;
      currentSegment.markers.push('END_SECTION');
      currentSegment.content += (currentSegment.content ? '\n' : '') + line;
      currentSegment.lines.push(line);
      continue;
    }
    
    if (line.startsWith('<START_PARAGRAPH>') || line.startsWith('<END_PARAGRAPH>') ||
        line.startsWith('<START_MEASUREMENT_DATA>') || line.startsWith('<END_MEASUREMENT_DATA>') ||
        line.startsWith('<START_LIST>') || line.startsWith('<END_LIST>') || 
        line.startsWith('<LIST_ITEM>')) {
      // Preserve other structural markers
      currentSegment.content += (currentSegment.content ? '\n' : '') + line;
      currentSegment.lines.push(line);
      currentSegment.markers.push(line.match(/<([^>]+)>/)[1]);
      continue;
    }
    
    // Skip empty lines
    if (line.length === 0) {
      consecutiveTableRows = 0;
      if (currentSegment.content.trim().length > 0) {
        currentSegment.content += '\n';
      }
      continue;
    }
    
    // If we're inside a structural table, treat all content as table
    if (inStructuralTable) {
      currentSegment.content += (currentSegment.content ? '\n' : '') + line;
      currentSegment.lines.push(line);
      continue;
    }
    
    // More selective table row detection - must have clean pipe separators and multiple columns
    const pipeCount = (line.match(/\s\|\s/g) || []).length;
    const hasTableStructure = pipeCount >= 2 && line.length < 200; // Reasonable row length
    const isTableRow = hasTableStructure && !line.includes('here here here'); // Exclude garbage repetition
    
    if (isTableRow) {
      consecutiveTableRows++;
      
      // Only treat as table if we have enough consecutive rows
      if (consecutiveTableRows >= MIN_TABLE_ROWS) {
        // If we were building a text segment, finish it
        if (currentSegment.type === 'text' && currentSegment.content.trim().length > 0) {
          // Split large text segments to prevent massive chunks
          if (currentSegment.content.length > MAX_SINGLE_CHUNK_SIZE) {
            const words = currentSegment.content.split(/\s+/);
            const midPoint = Math.floor(words.length / 2);
            const firstHalf = words.slice(0, midPoint).join(' ');
            const secondHalf = words.slice(midPoint).join(' ');
            
            segments.push({ type: 'text', content: firstHalf, lines: firstHalf.split('\n') });
            segments.push({ type: 'text', content: secondHalf, lines: secondHalf.split('\n') });
          } else {
            segments.push({...currentSegment});
          }
          currentSegment = { type: 'table', content: '', lines: [] };
        } else if (currentSegment.type !== 'table') {
          currentSegment = { type: 'table', content: '', lines: [] };
        }
        
        // Add table row
        currentSegment.content += (currentSegment.content ? '\n' : '') + line;
        currentSegment.lines.push(line);
      } else {
        // Not enough consecutive rows yet, treat as text
        currentSegment.content += (currentSegment.content ? '\n' : '') + line;
        currentSegment.lines.push(line);
      }
    } else {
      // Regular text line - reset table counter
      consecutiveTableRows = 0;
      
      if (currentSegment.type === 'table' && currentSegment.content.trim().length > 0) {
        segments.push({...currentSegment});
        currentSegment = { type: 'text', content: '', lines: [] };
      } else if (currentSegment.type !== 'text') {
        currentSegment = { type: 'text', content: '', lines: [] };
      }
      
      // Add text line
      currentSegment.content += (currentSegment.content ? '\n' : '') + line;
      currentSegment.lines.push(line);
    }
  }
  
  // Add the last segment, but split if too large
  if (currentSegment.content.trim().length > 0) {
    if (currentSegment.type === 'text' && currentSegment.content.length > MAX_SINGLE_CHUNK_SIZE) {
      const words = currentSegment.content.split(/\s+/);
      const midPoint = Math.floor(words.length / 2);
      const firstHalf = words.slice(0, midPoint).join(' ');
      const secondHalf = words.slice(midPoint).join(' ');
      
      segments.push({ type: 'text', content: firstHalf, lines: firstHalf.split('\n') });
      segments.push({ type: 'text', content: secondHalf, lines: secondHalf.split('\n') });
    } else {
      segments.push(currentSegment);
    }
  }
  
  // Fallback: If we have too few segments for the content size, force text segmentation
  if (segments.length <= 2 && text.length > MAX_SINGLE_CHUNK_SIZE * 2) {
    console.warn('⚠️ Fallback: Splitting large content into text segments');
    return [{ type: 'text', content: text, lines: text.split('\n') }];
  }
  
  console.log(`📊 Text segmentation: ${segments.filter(s => s.type === 'text').length} text segments, ${segments.filter(s => s.type === 'table').length} table segments`);
  
  return segments;
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