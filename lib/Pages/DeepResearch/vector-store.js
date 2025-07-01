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
    this.supportedOfficeFiles = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
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
    
    // Check if Transformers.js is available
    if (!window.transformers || !window.transformers.pipeline) {
      throw new Error('Transformers.js library not loaded. Please ensure the Transformers.js script is loaded before initializing the Vector Store.');
    }
    
    try {
      console.log('📥 Downloading Xenova/all-MiniLM-L6-v2 model (first time only, ~23MB)...');
      this.embeddingPipeline = await window.transformers.pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      console.log('✅ Embedding model loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load embedding model:', error);
      throw new Error(`Failed to load Xenova/all-MiniLM-L6-v2 model: ${error.message}. Please check your internet connection for first-time model download.`);
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
    if (!this.embeddingPipeline) {
      throw new Error('Embedding pipeline not initialized. Call init() first.');
    }
    
    try {
      // Add timeout to prevent hanging
      const embeddingPromise = this.embeddingPipeline(text, {
        pooling: 'mean',
        normalize: true
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Embedding generation timeout after 10 seconds')), 10000);
      });
      
      const output = await Promise.race([embeddingPromise, timeoutPromise]);
      
      if (!output || !output.data) {
        throw new Error('Invalid embedding output from pipeline');
      }
      
      return Array.from(output.data);
    } catch (error) {
      console.error('❌ Failed to generate embedding for text:', error);
      throw new Error(`Embedding generation failed: ${error.message}`);
    }
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
      } else if (this.supportedOfficeFiles.some(ext => file.name.toLowerCase().endsWith(ext))) {
        type = 'office';
        content = await this.processOfficeFile(file, docId);
      } else if (this.supportedImageFiles.some(ext => file.name.toLowerCase().endsWith(ext))) {
        type = 'image';
        content = await this.processImageFile(file, docId);
      } else {
        const supportedExts = [
          ...this.supportedTextFiles,
          ...this.supportedOfficeFiles,
          ...this.supportedImageFiles
        ].join(', ');
        throw new Error(`Unsupported file type: ${file.name}. Supported formats: ${supportedExts}`);
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
      if ((type === 'file' || type === 'office') && content.trim()) {
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
        minSimilarity = 0.3, // Changed default to match usage
        documentIds = null,
        repositoryIds = null
      } = options;
      
      console.log(`🔍 Searching for: "${query}" (${this.collections.vectors.size} vectors to search)`);
      
      // Generate embedding for query with timeout
      const embeddingStart = Date.now();
      const queryEmbedding = await this.getEmbeddingFromText(query);
      console.log(`⚡ Query embedding generated in ${Date.now() - embeddingStart}ms`);
      
      // Get all vectors and calculate similarities
      const results = [];
      const searchStart = Date.now();
      let processedVectors = 0;
      
      for (const [vectorId, vector] of this.collections.vectors) {
        processedVectors++;
        
        // Apply filters if specified
        if (documentIds && !documentIds.includes(vector.documentId)) {
          continue;
        }
        
        // Check for valid embedding
        if (!vector.embedding || !Array.isArray(vector.embedding)) {
          console.warn(`⚠️ Invalid embedding for vector ${vectorId}`);
          continue;
        }
        
        try {
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
        } catch (simError) {
          console.warn(`⚠️ Error calculating similarity for vector ${vectorId}:`, simError);
          continue;
        }
        
        // Yield control occasionally to prevent hanging
        if (processedVectors % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }
      
      console.log(`⚡ Processed ${processedVectors} vectors in ${Date.now() - searchStart}ms`);
      
      // Sort by similarity and limit results
      results.sort((a, b) => b.similarity - a.similarity);
      const finalResults = results.slice(0, limit);
      
      console.log(`✅ Found ${finalResults.length} relevant results (${results.length} total matches above ${minSimilarity} threshold)`);
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

  async processOfficeFile(file, docId) {
    try {
      console.log(`📄 Processing office file: ${file.name}`);
      
      const fileName = file.name.toLowerCase();
      let content = '';
      
      if (fileName.endsWith('.pdf')) {
        content = await this.parsePDF(file, docId);
      } else if (fileName.endsWith('.docx')) {
        content = await this.parseDOCX(file);
      } else if (fileName.endsWith('.doc')) {
        content = await this.parseDOC(file);
      } else if (fileName.endsWith('.xlsx')) {
        content = await this.parseXLSX(file);
      } else if (fileName.endsWith('.xls')) {
        content = await this.parseXLS(file);
      } else if (fileName.endsWith('.pptx')) {
        content = await this.parsePPTX(file);
      } else if (fileName.endsWith('.ppt')) {
        content = await this.parsePPT(file);
      } else {
        throw new Error(`Office file type not supported: ${fileName}`);
      }
      
      if (!content || content.trim().length === 0) {
        throw new Error('No text content extracted from file');
      }
      
      console.log(`✅ Extracted ${content.length} characters from ${file.name}`);
      return content;
      
    } catch (error) {
      console.error(`❌ Failed to process office file ${file.name}:`, error);
      throw error;
    }
  }

  async parsePDF(file, docId) {
    try {
      if (!window.pdfjsLib) {
        throw new Error('PDF.js library not loaded. Please include PDF.js scripts.');
      }
      
      const arrayBuffer = await this.fileToArrayBuffer(file);
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      let totalExtractedImages = 0;
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        
        // Extract text content
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += `Page ${pageNum}: ${pageText}\n`;
        
        // Extract images from the page
        try {
          const operatorList = await page.getOperatorList();
          const pageImages = await this.extractImagesFromPDFPage(page, operatorList, pageNum, docId);
          
          if (pageImages.length > 0) {
            totalExtractedImages += pageImages.length;
            fullText += `[Page ${pageNum} contains ${pageImages.length} image(s): ${pageImages.map(img => img.description).join(', ')}] `;
          }
        } catch (imageError) {
          console.warn(`Could not extract images from page ${pageNum}:`, imageError);
        }
      }
      
      if (totalExtractedImages > 0) {
        fullText += `\n\n[PDF analysis complete: extracted ${totalExtractedImages} total image(s)]`;
        console.log(`📸 Successfully extracted ${totalExtractedImages} images from ${file.name}`);
        
        // Save to storage to persist image records
        this.saveToStorage();
      }
      
      return fullText.trim();
      
    } catch (error) {
      console.error('❌ PDF parsing failed:', error);
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
  }

  async extractImagesFromPDFPage(page, operatorList, pageNum, docId) {
    const extractedImages = [];
    
    try {
      // Get page resources
      const resources = await page.objs;
      const commonObjs = await page.commonObjs;
      
      // Look for image operations
      for (let i = 0; i < operatorList.fnArray.length; i++) {
        const fn = operatorList.fnArray[i];
        const args = operatorList.argsArray[i];
        
        if (fn === window.pdfjsLib.OPS.paintImageXObject || fn === window.pdfjsLib.OPS.paintJpegXObject) {
          try {
            const imageName = args[0];
            
            // Create a mock image record since we can't easily extract raw image data from PDF.js
            const imageRecord = {
              id: `pdf_img_${docId}_page${pageNum}_${i}`,
              name: `${docId}_page${pageNum}_image${i + 1}`,
              documentId: docId,
              pageNumber: pageNum,
              blob: null, // PDF.js doesn't easily expose raw image data
              mimeType: 'image/unknown',
              size: 0,
              width: 0,
              height: 0,
              description: `Image from page ${pageNum} of PDF (${imageName})`,
              createdAt: new Date().toISOString(),
              source: 'pdf_embedded'
            };
            
            // Store in images collection
            this.collections.images.set(imageRecord.id, imageRecord);
            extractedImages.push(imageRecord);
            
            console.log(`📸 Catalogued embedded image: ${imageRecord.description}`);
            
          } catch (imgError) {
            console.warn(`⚠️ Could not process image ${i} on page ${pageNum}:`, imgError);
          }
        }
      }
      
    } catch (error) {
      console.warn(`⚠️ Error processing images on page ${pageNum}:`, error);
    }
    
    return extractedImages;
  }

  async parseDOCX(file) {
    try {
      if (!window.mammoth) {
        throw new Error('Mammoth.js library not loaded. Please include Mammoth.js scripts.');
      }
      
      const arrayBuffer = await this.fileToArrayBuffer(file);
      
      // Extract both text and embedded images
      const textResult = await window.mammoth.extractRawText({ arrayBuffer });
      let content = textResult.value || '';
      
      // Try to extract images from DOCX (if mammoth supports it)
      try {
        const htmlResult = await window.mammoth.convertToHtml({ arrayBuffer });
        
        // Look for base64 images in the HTML
        const imgMatches = htmlResult.value.match(/<img[^>]+src="data:image\/[^>]+>/g);
        if (imgMatches && imgMatches.length > 0) {
          content += `\n\n[Document contains ${imgMatches.length} embedded image(s)]`;
          
          // Could potentially extract and store these images separately
          console.log(`📸 Found ${imgMatches.length} embedded images in ${file.name}`);
        }
        
        // Extract alt text and captions that might be meaningful
        const altTextMatches = htmlResult.value.match(/alt="([^"]+)"/g);
        if (altTextMatches) {
          const altTexts = altTextMatches.map(match => match.replace(/alt="|"/g, ''));
          content += `\n\nImage descriptions: ${altTexts.join(', ')}`;
        }
        
      } catch (imageError) {
        console.warn('Could not extract images from DOCX:', imageError);
      }
      
      if (textResult.messages && textResult.messages.length > 0) {
        console.warn('DOCX parsing warnings:', textResult.messages);
      }
      
      return content;
      
    } catch (error) {
      console.error('❌ DOCX parsing failed:', error);
      throw new Error(`DOCX parsing failed: ${error.message}`);
    }
  }

  async parseDOC(file) {
    // DOC files are binary and complex - fallback to basic extraction
    try {
      const text = await this.readTextFile(file);
      // Remove binary characters and extract readable text
      const cleanText = text.replace(/[^\x20-\x7E\s]/g, ' ').replace(/\s+/g, ' ').trim();
      
      if (cleanText.length < 50) {
        throw new Error('Unable to extract meaningful text from DOC file');
      }
      
      return cleanText;
    } catch (error) {
      throw new Error(`DOC parsing failed: ${error.message}. Please convert to DOCX for better results.`);
    }
  }

  async parseXLSX(file) {
    try {
      if (!window.XLSX) {
        throw new Error('SheetJS library not loaded. Please include XLSX scripts.');
      }
      
      const arrayBuffer = await this.fileToArrayBuffer(file);
      const workbook = window.XLSX.read(arrayBuffer, { type: 'array' });
      
      let fullText = '';
      let totalCharts = 0;
      
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const csvText = window.XLSX.utils.sheet_to_csv(worksheet);
        
        // Try to detect charts or embedded objects
        const range = window.XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const cellCount = (range.e.r + 1) * (range.e.c + 1);
        const dataCount = Object.keys(worksheet).filter(key => !key.startsWith('!')).length;
        
        // Heuristic: if there are significantly fewer data cells than the range suggests,
        // there might be charts or other objects
        if (cellCount > dataCount * 2) {
          totalCharts++;
        }
        
        fullText += `Sheet: ${sheetName}\n${csvText}\n\n`;
      });
      
      if (totalCharts > 0) {
        fullText += `[Workbook may contain ${totalCharts} chart(s) or embedded object(s)]`;
      }
      
      return fullText.trim();
      
    } catch (error) {
      console.error('❌ XLSX parsing failed:', error);
      throw new Error(`XLSX parsing failed: ${error.message}`);
    }
  }

  async parseXLS(file) {
    try {
      if (!window.XLSX) {
        throw new Error('SheetJS library not loaded. Please include XLSX scripts.');
      }
      
      const arrayBuffer = await this.fileToArrayBuffer(file);
      const workbook = window.XLSX.read(arrayBuffer, { type: 'array' });
      
      let fullText = '';
      
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const csvText = window.XLSX.utils.sheet_to_csv(worksheet);
        fullText += `Sheet: ${sheetName}\n${csvText}\n\n`;
      });
      
      return fullText.trim();
      
    } catch (error) {
      console.error('❌ XLS parsing failed:', error);
      throw new Error(`XLS parsing failed: ${error.message}`);
    }
  }

  async parsePPTX(file) {
    try {
      // PPTX is a zip file with XML content
      if (!window.JSZip) {
        throw new Error('JSZip library not loaded. Please include JSZip scripts.');
      }
      
      const arrayBuffer = await this.fileToArrayBuffer(file);
      const zip = await window.JSZip.loadAsync(arrayBuffer);
      
      let fullText = '';
      let totalImages = 0;
      
      // Extract text from slide XML files
      const slideFiles = Object.keys(zip.files).filter(name => 
        name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
      );
      
      // Count embedded media files
      const mediaFiles = Object.keys(zip.files).filter(name => 
        name.startsWith('ppt/media/') && /\.(jpg|jpeg|png|gif|bmp)$/i.test(name)
      );
      totalImages = mediaFiles.length;
      
      for (let i = 0; i < slideFiles.length; i++) {
        const slideFile = slideFiles[i];
        const xmlContent = await zip.files[slideFile].async('text');
        
        // Parse XML and extract text content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
        
        // Extract text from various PowerPoint XML elements
        const textElements = xmlDoc.querySelectorAll('a\\:t, t');
        const slideText = Array.from(textElements).map(el => el.textContent).join(' ');
        
        // Look for image references in the slide
        const imageRefs = xmlDoc.querySelectorAll('pic\\:pic, a\\:blip');
        const slideImageCount = imageRefs.length;
        
        if (slideText.trim()) {
          fullText += `Slide ${i + 1}: ${slideText}`;
          if (slideImageCount > 0) {
            fullText += ` [Contains ${slideImageCount} image(s)]`;
          }
          fullText += '\n\n';
        }
      }
      
      if (totalImages > 0) {
        fullText += `\n[Presentation contains ${totalImages} total embedded image(s)]`;
      }
      
      return fullText.trim();
      
    } catch (error) {
      console.error('❌ PPTX parsing failed:', error);
      throw new Error(`PPTX parsing failed: ${error.message}`);
    }
  }

  async parsePPT(file) {
    // PPT files are binary and complex - provide fallback message
    throw new Error('PPT parsing not supported. Please convert to PPTX for text extraction.');
  }
  
  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
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