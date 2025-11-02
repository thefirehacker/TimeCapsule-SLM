client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
page.tsx:1157 Manage KB button clicked - opening Knowledge Base Manager
useDocuments.ts:303 📚 Processing 1 files...
useDocuments.ts:307 📄 Processing file 1/1: slides.pdf
useDocuments.ts:314 📄 PDF detected: slides.pdf - will extract text content
useDocuments.ts:219 📄 Processing PDF file: slides.pdf
PDFParser.ts:68 📄 Parsing PDF: slides.pdf (4 MB)
useDocuments.ts:227 📊 PDF parsing: Uploading PDF to server...
useDocuments.ts:227 📊 PDF parsing: Parsing PDF on server...
PDFParser.ts:89 📤 Making API request to /api/pdf-parser for file: slides.pdf
PDFParser.ts:99 📥 API response status: 200 OK
useDocuments.ts:227 📊 PDF parsing: Processing extracted text...
useDocuments.ts:227 📊 PDF parsing: Extracted 3 pages with 5843 characters
PDFParser.ts:161 ✅ PDF parsed successfully: {filename: 'slides.pdf', pages: 3, textLength: 5843, parseTime: '1148ms', hasText: true}
useDocuments.ts:232 ✅ PDF parsed successfully: 3 pages, 5843 characters
useDocuments.ts:207 ✅ Content validation passed for slides.pdf: 5843 chars, 100% readable
PDFParser.ts:91 Fetch finished loading: POST "http://localhost:3000/api/pdf-parser".
parsePDF @ PDFParser.ts:91
useDocuments.useCallback[extractFileContent] @ useDocuments.ts:222
useDocuments.useCallback[handleFileUpload] @ useDocuments.ts:320
onChange @ page.tsx:1122
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
VectorStore.ts:452 📄 Processing document: slides.pdf
VectorStore.ts:453 📄 File size: 4.05 MB, Content length: 5843 characters
DocumentProcessor.ts:207 📄 Starting document processing: slides.pdf
embeddingWorker.js:92 📄 Processing document: slides.pdf
embeddingWorker.js:93 📊 Document stats: 5843 characters, 557 words
VectorStore.ts:481 📊 Document processing: Breaking document into chunks... (13%)
useDocuments.ts:324 📊 Processing slides.pdf: Breaking document into chunks... (13%)
embeddingWorker.js:143 📝 Chunking text: 5843 characters
embeddingWorker.js:469 ⚠️ Fallback: Splitting large content into text segments
detectTableSegments @ embeddingWorker.js:469
chunkText @ embeddingWorker.js:146
processDocument @ embeddingWorker.js:108
self.onmessage @ embeddingWorker.js:22
embeddingWorker.js:147 📊 Detected 1 text segments (tables preserved)
embeddingWorker.js:153 📊 Chunking parameters: 250 words/chunk, 50 overlap, table-aware
VectorStore.ts:481 📊 Document processing: Processing text chunk 1 (segment 1/1)... (13%)
embeddingWorker.js:274 ✅ Created 3 table-aware chunks (0 table rows, 3 text chunks)
useDocuments.ts:324 📊 Processing slides.pdf: Processing text chunk 1 (segment 1/1)... (13%)
VectorStore.ts:481 📊 Document processing: Processing text chunk 2 (segment 1/1)... (13%)
useDocuments.ts:324 📊 Processing slides.pdf: Processing text chunk 2 (segment 1/1)... (13%)
VectorStore.ts:481 📊 Document processing: Processing text chunk 3 (segment 1/1)... (13%)
useDocuments.ts:324 📊 Processing slides.pdf: Processing text chunk 3 (segment 1/1)... (13%)
embeddingWorker.js:124 ✅ Document chunked in 1ms: 3 chunks
VectorStore.ts:481 📊 Document processing: Processed 3 text chunks (38%)
useDocuments.ts:324 📊 Processing slides.pdf: Processed 3 text chunks (38%)
DocumentProcessor.ts:269 📊 Received chunked document: 3 chunks
VectorStore.ts:481 📊 Document processing: Generating embeddings... (50%)
useDocuments.ts:324 📊 Processing slides.pdf: Generating embeddings... (50%)
DocumentProcessor.ts:281 🧠 Generating embeddings with pre-loaded Xenova...
EmbeddingService.ts:211 🔍 Generating embeddings for 3 texts...
EmbeddingService.ts:220 🔍 Generating embedding 1/3...
EmbeddingService.ts:177 🔍 Generating embedding for text (2814 chars)...
DocumentProcessor.ts:101 [Violation] 'message' handler took 1452ms
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 1469ms
EmbeddingService.ts:224 ✅ Generated embedding 1/3
VectorStore.ts:481 📊 Document processing: Generating embeddings... 1/3 (65%)
useDocuments.ts:324 📊 Processing slides.pdf: Generating embeddings... 1/3 (65%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 1/3
EmbeddingService.ts:220 🔍 Generating embedding 2/3...
EmbeddingService.ts:177 🔍 Generating embedding for text (2369 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 1365ms
EmbeddingService.ts:224 ✅ Generated embedding 2/3
VectorStore.ts:481 📊 Document processing: Generating embeddings... 2/3 (80%)
useDocuments.ts:324 📊 Processing slides.pdf: Generating embeddings... 2/3 (80%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 2/3
EmbeddingService.ts:220 🔍 Generating embedding 3/3...
EmbeddingService.ts:177 🔍 Generating embedding for text (1643 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 1366ms
EmbeddingService.ts:224 ✅ Generated embedding 3/3
VectorStore.ts:481 📊 Document processing: Generating embeddings... 3/3 (95%)
useDocuments.ts:324 📊 Processing slides.pdf: Generating embeddings... 3/3 (95%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 3/3
EmbeddingService.ts:256 ✅ Generated 3 embeddings in 4439ms
DocumentProcessor.ts:300 ✅ Generated 3 embeddings with immediate service
VectorStore.ts:481 📊 Document processing: Document processing complete (100%)
useDocuments.ts:324 📊 Processing slides.pdf: Document processing complete (100%)
VectorStore.ts:515 ✅ Document stored with ID: doc_1762111376958_hh4o0fxh6
VectorStore.ts:516 📊 Final stats: 3 chunks, 3 vectors
useDocuments.ts:329 ✅ Successfully processed: slides.pdf
useDocuments.ts:73 📊 Document status updated: {documents: 3, totalSize: '4 MB', totalChunks: 3, totalVectors: 3, avgChunksPerDoc: '1.0', …}
useDocuments.ts:345 ✅ File upload complete
page.tsx:1157 Manage KB button clicked - opening Knowledge Base Manager
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:308
SessionProvider.useEffect.visibilityHandler @ react.js:359
client.js:44 Fetch finished loading: GET "http://localhost:3000/api/auth/session".
fetchData @ client.js:44
getSession @ react.js:123
SessionProvider.useEffect @ react.js:289
SessionProvider.useEffect.handle @ react.js:332
