page.tsx:1163 Manage KB button clicked - opening Knowledge Base Manager
react-dom-client.development.js:16378 [Violation] 'click' handler took 170ms
useDocuments.ts:313 📚 Processing 1 files...
useDocuments.ts:317 📄 Processing file 1/1: slides.pdf
useDocuments.ts:324 📄 PDF detected: slides.pdf - will extract text content
useDocuments.ts:219 📄 Processing PDF file: slides.pdf
PDFParser.ts:68 📄 Parsing PDF: slides.pdf (4 MB)
useDocuments.ts:227 📊 PDF parsing: Uploading PDF to server...
useDocuments.ts:227 📊 PDF parsing: Parsing PDF on server...
PDFParser.ts:89 📤 Making API request to /api/pdf-parser for file: slides.pdf
[Violation] 'change' handler took 161ms
PDFParser.ts:99 📥 API response status: 200 OK
useDocuments.ts:227 📊 PDF parsing: Processing 49 pages...
useDocuments.ts:227 📊 PDF parsing: Extracted 49 pages with 5843 characters
PDFParser.ts:160 ✅ PDF parsed successfully: {filename: 'slides.pdf', pages: 49, textLength: 5843, parseTime: '2436ms', hasText: true}
useDocuments.ts:232 ✅ PDF parsed successfully: 49 pages, 5843 characters
useDocuments.ts:207 ✅ Content validation passed for slides.pdf: 5843 chars, 100% readable
VectorStore.ts:468 📄 Processing document: slides.pdf
VectorStore.ts:469 📄 File size: 4.05 MB, Content length: 5843 characters
DocumentProcessor.ts:207 📄 Starting document processing: slides.pdf
embeddingWorker.js:92 📄 Processing document: slides.pdf
embeddingWorker.js:93 📊 Document stats: 5843 characters, 557 words
VectorStore.ts:502 📊 Document processing: Breaking document into chunks... (13%)
useDocuments.ts:334 📊 Processing slides.pdf: Breaking document into chunks... (13%)
embeddingWorker.js:143 📝 Chunking text: 5843 characters
embeddingWorker.js:469 ⚠️ Fallback: Splitting large content into text segments
detectTableSegments @ embeddingWorker.js:469
chunkText @ embeddingWorker.js:146
processDocument @ embeddingWorker.js:108
self.onmessage @ embeddingWorker.js:22
embeddingWorker.js:147 📊 Detected 1 text segments (tables preserved)
embeddingWorker.js:153 📊 Chunking parameters: 250 words/chunk, 50 overlap, table-aware
PDFParser.ts:91 Fetch finished loading: POST "http://localhost:3000/api/pdf-parser".
parsePDF @ PDFParser.ts:91
useDocuments.useCallback[extractFileContent] @ useDocuments.ts:222
useDocuments.useCallback[handleFileUpload] @ useDocuments.ts:330
onChange @ page.tsx:1122
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
embeddingWorker.js:274 ✅ Created 3 table-aware chunks (0 table rows, 3 text chunks)
VectorStore.ts:502 📊 Document processing: Processing text chunk 1 (segment 1/1)... (13%)
useDocuments.ts:334 📊 Processing slides.pdf: Processing text chunk 1 (segment 1/1)... (13%)
VectorStore.ts:502 📊 Document processing: Processing text chunk 2 (segment 1/1)... (13%)
useDocuments.ts:334 📊 Processing slides.pdf: Processing text chunk 2 (segment 1/1)... (13%)
VectorStore.ts:502 📊 Document processing: Processing text chunk 3 (segment 1/1)... (13%)
useDocuments.ts:334 📊 Processing slides.pdf: Processing text chunk 3 (segment 1/1)... (13%)
VectorStore.ts:502 📊 Document processing: Processed 3 text chunks (38%)
embeddingWorker.js:124 ✅ Document chunked in 2ms: 3 chunks
useDocuments.ts:334 📊 Processing slides.pdf: Processed 3 text chunks (38%)
DocumentProcessor.ts:269 📊 Received chunked document: 3 chunks
VectorStore.ts:502 📊 Document processing: Generating embeddings... (50%)
useDocuments.ts:334 📊 Processing slides.pdf: Generating embeddings... (50%)
DocumentProcessor.ts:281 🧠 Generating embeddings with pre-loaded Xenova...
EmbeddingService.ts:211 🔍 Generating embeddings for 3 texts...
EmbeddingService.ts:220 🔍 Generating embedding 1/3...
EmbeddingService.ts:177 🔍 Generating embedding for text (2814 chars)...
DocumentProcessor.ts:101 [Violation] 'message' handler took 1442ms
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 1460ms
EmbeddingService.ts:224 ✅ Generated embedding 1/3
VectorStore.ts:502 📊 Document processing: Generating embeddings... 1/3 (65%)
useDocuments.ts:334 📊 Processing slides.pdf: Generating embeddings... 1/3 (65%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 1/3
EmbeddingService.ts:220 🔍 Generating embedding 2/3...
EmbeddingService.ts:177 🔍 Generating embedding for text (2369 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 1383ms
EmbeddingService.ts:224 ✅ Generated embedding 2/3
VectorStore.ts:502 📊 Document processing: Generating embeddings... 2/3 (80%)
useDocuments.ts:334 📊 Processing slides.pdf: Generating embeddings... 2/3 (80%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 2/3
EmbeddingService.ts:220 🔍 Generating embedding 3/3...
EmbeddingService.ts:177 🔍 Generating embedding for text (1643 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 1388ms
EmbeddingService.ts:224 ✅ Generated embedding 3/3
VectorStore.ts:502 📊 Document processing: Generating embeddings... 3/3 (95%)
useDocuments.ts:334 📊 Processing slides.pdf: Generating embeddings... 3/3 (95%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 3/3
EmbeddingService.ts:256 ✅ Generated 3 embeddings in 4747ms
DocumentProcessor.ts:300 ✅ Generated 3 embeddings with immediate service
VectorStore.ts:502 📊 Document processing: Document processing complete (100%)
useDocuments.ts:334 📊 Processing slides.pdf: Document processing complete (100%)
VectorStore.ts:536 ✅ Document stored with ID: doc_1762185447011_6x9sa0haz
VectorStore.ts:537 📊 Final stats: 3 chunks, 3 vectors
useDocuments.ts:339 ✅ Successfully processed: slides.pdf
useDocuments.ts:73 📊 Document status updated: {documents: 12, totalSize: '4.1 MB', totalChunks: 3, totalVectors: 3, avgChunksPerDoc: '0.3', …}avgChunksPerDoc: "0.3"avgVectorsPerDoc: "0.3"documents: 12totalChunks: 3totalSize: "4.1 MB"totalVectors: 3[[Prototype]]: Object
useDocuments.ts:355 ✅ File upload complete
scheduler.development.js:14 [Violation] 'message' handler took 154ms
scheduler.development.js:14 [Violation] 'message' handler took 153ms
scheduler.development.js:14 [Violation] 'message' handler took 151ms
scheduler.development.js:14 [Violation] 'message' handler took 150ms
scheduler.development.js:14 [Violation] 'message' handler took 153ms
scheduler.development.js:14 [Violation] 'message' handler took 151ms
scheduler.development.js:14 [Violation] 'message' handler took 150ms
react-dom-client.development.js:16378 [Violation] 'click' handler took 154ms
useUnifiedStorage.ts:498 🔒 PRIORITY SAVE: Locked queue with fresh graph state
unifiedStorage.ts:67 💾 Starting unified save...
VectorStore.ts:1607 📋 Retrieved latest revision for aiframe-chapters: 134-tgnjhkfdhe
unifiedStorage.ts:500 ✅ IndexedDB save completed
VectorStore.ts:1543 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
VectorStore.ts:2197 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
VectorStore.ts:2242 💾 Database flush completed
VectorStore.ts:1607 📋 Retrieved latest revision for aiframe-chapters: 135-tgnjhkfdhe
VectorStore.ts:2210 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 135-tgnjhkfdhe)
 ✅ Unified save completed successfully
 🔒 PRIORITY SAVE: Completed with result: {success: true}
 🔄 BACKGROUND SAVE: Starting with data: {frameCount: 0, chapterCount: 0, nodeCount: 0, edgeCount: 0, frameIds: Array(0), …}
 💾 Starting unified save...
 📋 Retrieved latest revision for aiframe-chapters: 135-tgnjhkfdhe
 ✅ IndexedDB save completed
 📊 Synced frame AI-Frame Chapters to Knowledge Base (updated)
 🔍 Verifying document persistence: aiframe-chapters (attempt 1/3)
 💾 Database flush completed
 📋 Retrieved latest revision for aiframe-chapters: 136-tgnjhkfdhe
 ✅ Document persistence verified: AI-Frame Chapters (ID: aiframe-chapters, Rev: 136-tgnjhkfdhe)
 ✅ Unified save completed successfully
 🔄 BACKGROUND SAVE: Completed with result: {success: true, timestamp: '2025-11-03T15:57:54.885Z'}
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 157ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 164ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 163ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 156ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 156ms
# npm console
You can disable this warning by calling disableWarnings() from the dev-mode plugin.
---------------------------------------------------------------------
 GET /ai-frames 200 in 323ms
 GET /.well-known/appspecific/com.chrome.devtools.json 404 in 97ms
debug-enabled 0 [ 'debug-enabled' ]
 GET /api/auth/session 200 in 123ms
 GET /api/auth/session 200 in 18ms
DynamoDB clients initialized successfully
 GET /api/auth/session 200 in 140ms
 GET /api/auth/session 200 in 17ms
DynamoDB clients initialized successfully
 ○ Compiling /api/pdf-parser ...
 ✓ Compiled /api/pdf-parser in 901ms (3699 modules)
📄 PDF Parser API: Request received
📄 PDF Parser API: Found 1 uploaded files
Uploaded file: File {
  size: 4244801,
  type: 'application/pdf',
  name: 'slides.pdf',
  lastModified: 1762185445625
}
Uploaded file type: object
📄 File written to: /tmp/67eb760a-3121-415b-9c2c-5ea9add42f65.pdf
📄 Starting PDF parsing for: /tmp/67eb760a-3121-415b-9c2c-5ea9add42f65.pdf
📄 Using pdf2json to parse PDF, buffer size: 4244801 bytes
📄 PDF size: 4.05MB, parsing timeout: 42s
📄 Loading PDF with pdf2json from temp file: /tmp/67eb760a-3121-415b-9c2c-5ea9add42f65.pdf
✅ Structured text extraction: 5882 characters with table formatting
📄 pdf2json extracted 5880 characters with table structure from 49 pages
✅ PDF parsing completed successfully with pdf2json
📄 Extracted text length: 5880 characters
📝 First 500 chars of extracted text: ----------------Page (1) Break----------------

----------------Page (2) Break----------------

----------------Page (3) Break----------------

----------------Page (4) Break----------------

----------------Page (5) Break----------------

----------------Page (6) Break----------------

----------------Page (7) Break----------------

----------------Page (8) Break----------------

----------------Page (9) Break----------------

----------------Page (10) Break----------------

----------------Pag