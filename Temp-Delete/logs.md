useOllamaConnection.ts:278 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[connect] @ useOllamaConnection.ts:278
await in useOllamaConnection.useCallback[connect]
useOllamaConnection.useEffect.autoReconnect @ useOllamaConnection.ts:578
useDocuments.ts:172 📚 Processing 1 files...
useDocuments.ts:176 📄 Processing file 1/1: GRPO_Papper.pdf
useDocuments.ts:183 📄 PDF detected: GRPO_Papper.pdf - will extract text content
useDocuments.ts:93 📄 Processing PDF file: GRPO_Papper.pdf
PDFParser.ts:68 📄 Parsing PDF: GRPO_Papper.pdf (1.8 MB)
useDocuments.ts:101 📊 PDF parsing: Uploading PDF to server...
useDocuments.ts:101 📊 PDF parsing: Parsing PDF on server...
PDFParser.ts:89 📤 Making API request to /api/pdf-parser for file: GRPO_Papper.pdf
hot-reloader-client.js:197 [Fast Refresh] rebuilding
webpack.js?v=1754658616427:1367 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/f43b1fde36d6decd.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js?v=1754658616427:1367
Promise.then
hotCheck @ webpack.js?v=1754658616427:553
tryApplyUpdatesWebpack @ hot-reloader-client.js:132
handleHotUpdate @ hot-reloader-client.js:170
processMessage @ hot-reloader-client.js:249
handler @ hot-reloader-client.js:473
report-hmr-latency.js:14 [Fast Refresh] done in 1441ms
PDFParser.ts:99 📥 API response status: 200 OK
 📊 PDF parsing: Processing extracted text...
 Fetch finished loading: POST "http://localhost:3000/api/pdf-parser".
parsePDF @ webpack-internal:///…lib/PDFParser.ts:40
useDocuments.useCallback[extractFileContent] @ webpack-internal:///…/useDocuments.ts:78
useDocuments.useCallback[handleFileUpload] @ webpack-internal:///…useDocuments.ts:158
handleFileUpload @ webpack-internal:///…ResearchApp.tsx:248
executeDispatch @ webpack-internal:///…evelopment.js:16502
runWithFiberInDEV @ webpack-internal:///….development.js:845
processDispatchQueue @ webpack-internal:///…evelopment.js:16552
eval @ webpack-internal:///…evelopment.js:17150
batchedUpdates$1 @ webpack-internal:///…development.js:3263
dispatchEventForPluginEventSystem @ webpack-internal:///…evelopment.js:16706
dispatchEvent @ webpack-internal:///…evelopment.js:20816
dispatchDiscreteEvent @ webpack-internal:///…evelopment.js:20784
 📊 PDF parsing: Extracted 42 pages with 82282 characters
 ✅ PDF parsed successfully: {filename: 'GRPO_Papper.pdf', pages: 42, textLength: 82282, parseTime: '5234ms', hasText: true}
 ✅ PDF parsed successfully: 42 pages, 82282 characters
 📄 Processing document: GRPO_Papper.pdf
 📄 File size: 1.76 MB, Content length: 82282 characters
 📄 Starting document processing: GRPO_Papper.pdf
 📄 Processing document: GRPO_Papper.pdf
 📊 Document stats: 82282 characters, 11937 words
 📝 Chunking text: 82282 characters
 📊 Document processing: Breaking document into chunks... (13%)
 📊 Total words: 11937
 📊 Chunking parameters: 250 words/chunk, 50 overlap, 200 step
 📊 Document processing: Processing chunk 1/60 (with overlap)... (13%)
 📊 Document processing: Processing chunk 2/60 (with overlap)... (14%)
 📊 Document processing: Processing chunk 3/60 (with overlap)... (14%)
 📊 Document processing: Processing chunk 4/60 (with overlap)... (14%)
 📊 Document processing: Processing chunk 5/60 (with overlap)... (15%)
 📊 Document processing: Processing chunk 6/60 (with overlap)... (15%)
 📊 Document processing: Processing chunk 7/60 (with overlap)... (16%)
 📊 Document processing: Processing chunk 8/60 (with overlap)... (16%)
 📊 Document processing: Processing chunk 9/60 (with overlap)... (17%)
 📊 Document processing: Processing chunk 10/60 (with overlap)... (17%)
 📊 Document processing: Processing chunk 11/60 (with overlap)... (17%)
 📊 Document processing: Processing chunk 12/60 (with overlap)... (18%)
 📊 Document processing: Processing chunk 13/60 (with overlap)... (18%)
 📊 Document processing: Processing chunk 14/60 (with overlap)... (19%)
 📊 Document processing: Processing chunk 15/60 (with overlap)... (19%)
 📊 Document processing: Processing chunk 16/60 (with overlap)... (19%)
 📊 Document processing: Processing chunk 17/60 (with overlap)... (20%)
 📊 Document processing: Processing chunk 18/60 (with overlap)... (20%)
 📊 Document processing: Processing chunk 19/60 (with overlap)... (21%)
 📊 Document processing: Processing chunk 20/60 (with overlap)... (21%)
 📊 Document processing: Processing chunk 21/60 (with overlap)... (22%)
 📊 Document processing: Processing chunk 22/60 (with overlap)... (22%)
 📊 Document processing: Processing chunk 23/60 (with overlap)... (22%)
 📊 Document processing: Processing chunk 24/60 (with overlap)... (23%)
 📊 Document processing: Processing chunk 25/60 (with overlap)... (23%)
 📊 Document processing: Processing chunk 26/60 (with overlap)... (24%)
 📊 Document processing: Processing chunk 27/60 (with overlap)... (24%)
 📊 Document processing: Processing chunk 28/60 (with overlap)... (24%)
 📊 Document processing: Processing chunk 29/60 (with overlap)... (25%)
 📊 Document processing: Processing chunk 30/60 (with overlap)... (25%)
 📊 Document processing: Processing chunk 31/60 (with overlap)... (26%)
 📊 Document processing: Processing chunk 32/60 (with overlap)... (26%)
 📊 Document processing: Processing chunk 33/60 (with overlap)... (27%)
VectorStore.ts:481 📊 Document processing: Processing chunk 34/60 (with overlap)... (27%)
VectorStore.ts:481 📊 Document processing: Processing chunk 35/60 (with overlap)... (27%)
VectorStore.ts:481 📊 Document processing: Processing chunk 36/60 (with overlap)... (28%)
VectorStore.ts:481 📊 Document processing: Processing chunk 37/60 (with overlap)... (28%)
VectorStore.ts:481 📊 Document processing: Processing chunk 38/60 (with overlap)... (29%)
VectorStore.ts:481 📊 Document processing: Processing chunk 39/60 (with overlap)... (29%)
VectorStore.ts:481 📊 Document processing: Processing chunk 40/60 (with overlap)... (29%)
VectorStore.ts:481 📊 Document processing: Processing chunk 41/60 (with overlap)... (30%)
VectorStore.ts:481 📊 Document processing: Processing chunk 42/60 (with overlap)... (30%)
VectorStore.ts:481 📊 Document processing: Processing chunk 43/60 (with overlap)... (31%)
VectorStore.ts:481 📊 Document processing: Processing chunk 44/60 (with overlap)... (31%)
VectorStore.ts:481 📊 Document processing: Processing chunk 45/60 (with overlap)... (32%)
VectorStore.ts:481 📊 Document processing: Processing chunk 46/60 (with overlap)... (32%)
VectorStore.ts:481 📊 Document processing: Processing chunk 47/60 (with overlap)... (32%)
VectorStore.ts:481 📊 Document processing: Processing chunk 48/60 (with overlap)... (33%)
VectorStore.ts:481 📊 Document processing: Processing chunk 49/60 (with overlap)... (33%)
VectorStore.ts:481 📊 Document processing: Processing chunk 50/60 (with overlap)... (34%)
VectorStore.ts:481 📊 Document processing: Processing chunk 51/60 (with overlap)... (34%)
VectorStore.ts:481 📊 Document processing: Processing chunk 52/60 (with overlap)... (34%)
VectorStore.ts:481 📊 Document processing: Processing chunk 53/60 (with overlap)... (35%)
VectorStore.ts:481 📊 Document processing: Processing chunk 54/60 (with overlap)... (35%)
VectorStore.ts:481 📊 Document processing: Processing chunk 55/60 (with overlap)... (36%)
VectorStore.ts:481 📊 Document processing: Processing chunk 56/60 (with overlap)... (36%)
VectorStore.ts:481 📊 Document processing: Processing chunk 57/60 (with overlap)... (37%)
VectorStore.ts:481 📊 Document processing: Processing chunk 58/60 (with overlap)... (37%)
VectorStore.ts:481 📊 Document processing: Processing chunk 59/60 (with overlap)... (37%)
VectorStore.ts:481 📊 Document processing: Processing chunk 60/60 (with overlap)... (38%)
embeddingWorker.js:205 ✅ Created 60 word-based chunks (250 words per chunk, 50 word overlap, max 200 chunks)
VectorStore.ts:481 📊 Document processing: Processed 60 text chunks (38%)
embeddingWorker.js:124 ✅ Document chunked in 27ms: 60 chunks
DocumentProcessor.ts:269 📊 Received chunked document: 60 chunks
VectorStore.ts:481 📊 Document processing: Generating embeddings... (50%)
DocumentProcessor.ts:281 🧠 Generating embeddings with pre-loaded Xenova...
EmbeddingService.ts:211 🔍 Generating embeddings for 60 texts...
EmbeddingService.ts:220 🔍 Generating embedding 1/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1862 chars)...
DocumentProcessor.ts:101 [Violation] 'message' handler took 916ms
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 937ms
EmbeddingService.ts:224 ✅ Generated embedding 1/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 1/60 (51%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 1/60
EmbeddingService.ts:220 🔍 Generating embedding 2/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1782 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 741ms
EmbeddingService.ts:224 ✅ Generated embedding 2/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 2/60 (52%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 2/60
EmbeddingService.ts:220 🔍 Generating embedding 3/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1634 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 516ms
EmbeddingService.ts:224 ✅ Generated embedding 3/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 3/60 (52%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 3/60
EmbeddingService.ts:220 🔍 Generating embedding 4/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1810 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 674ms
EmbeddingService.ts:224 ✅ Generated embedding 4/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 4/60 (53%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 4/60
EmbeddingService.ts:220 🔍 Generating embedding 5/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1726 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 509ms
EmbeddingService.ts:224 ✅ Generated embedding 5/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 5/60 (54%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 5/60
EmbeddingService.ts:220 🔍 Generating embedding 6/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1805 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 457ms
EmbeddingService.ts:224 ✅ Generated embedding 6/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 6/60 (55%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 6/60
EmbeddingService.ts:220 🔍 Generating embedding 7/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1745 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 695ms
EmbeddingService.ts:224 ✅ Generated embedding 7/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 7/60 (55%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 7/60
EmbeddingService.ts:220 🔍 Generating embedding 8/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1754 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 577ms
EmbeddingService.ts:224 ✅ Generated embedding 8/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 8/60 (56%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 8/60
EmbeddingService.ts:220 🔍 Generating embedding 9/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1665 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 535ms
EmbeddingService.ts:224 ✅ Generated embedding 9/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 9/60 (57%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 9/60
EmbeddingService.ts:220 🔍 Generating embedding 10/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1618 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 494ms
EmbeddingService.ts:224 ✅ Generated embedding 10/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 10/60 (58%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 10/60
EmbeddingService.ts:220 🔍 Generating embedding 11/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1604 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 458ms
EmbeddingService.ts:224 ✅ Generated embedding 11/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 11/60 (58%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 11/60
index.mjs:619 [Violation] Handling of 'wheel' input event was delayed for 196 ms due to main thread being busy. Consider marking event handler as 'passive' to make the page more responsive.
EmbeddingService.ts:220 🔍 Generating embedding 12/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1628 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 620ms
EmbeddingService.ts:224 ✅ Generated embedding 12/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 12/60 (59%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 12/60
EmbeddingService.ts:220 🔍 Generating embedding 13/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1572 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 726ms
EmbeddingService.ts:224 ✅ Generated embedding 13/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 13/60 (60%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 13/60
EmbeddingService.ts:220 🔍 Generating embedding 14/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1701 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 685ms
EmbeddingService.ts:224 ✅ Generated embedding 14/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 14/60 (61%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 14/60
EmbeddingService.ts:220 🔍 Generating embedding 15/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1617 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 492ms
EmbeddingService.ts:224 ✅ Generated embedding 15/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 15/60 (61%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 15/60
EmbeddingService.ts:220 🔍 Generating embedding 16/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1703 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 534ms
EmbeddingService.ts:224 ✅ Generated embedding 16/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 16/60 (62%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 16/60
EmbeddingService.ts:220 🔍 Generating embedding 17/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1627 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 708ms
EmbeddingService.ts:224 ✅ Generated embedding 17/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 17/60 (63%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 17/60
EmbeddingService.ts:220 🔍 Generating embedding 18/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1669 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 662ms
EmbeddingService.ts:224 ✅ Generated embedding 18/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 18/60 (64%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 18/60
EmbeddingService.ts:220 🔍 Generating embedding 19/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1696 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 684ms
EmbeddingService.ts:224 ✅ Generated embedding 19/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 19/60 (64%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 19/60
EmbeddingService.ts:220 🔍 Generating embedding 20/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1693 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 611ms
EmbeddingService.ts:224 ✅ Generated embedding 20/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 20/60 (65%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 20/60
EmbeddingService.ts:220 🔍 Generating embedding 21/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1628 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 540ms
EmbeddingService.ts:224 ✅ Generated embedding 21/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 21/60 (66%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 21/60
EmbeddingService.ts:220 🔍 Generating embedding 22/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1700 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 706ms
EmbeddingService.ts:224 ✅ Generated embedding 22/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 22/60 (67%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 22/60
EmbeddingService.ts:220 🔍 Generating embedding 23/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1649 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 568ms
EmbeddingService.ts:224 ✅ Generated embedding 23/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 23/60 (67%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 23/60
EmbeddingService.ts:220 🔍 Generating embedding 24/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1693 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 694ms
EmbeddingService.ts:224 ✅ Generated embedding 24/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 24/60 (68%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 24/60
EmbeddingService.ts:220 🔍 Generating embedding 25/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1517 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 692ms
EmbeddingService.ts:224 ✅ Generated embedding 25/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 25/60 (69%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 25/60
EmbeddingService.ts:220 🔍 Generating embedding 26/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1606 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 558ms
EmbeddingService.ts:224 ✅ Generated embedding 26/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 26/60 (70%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 26/60
EmbeddingService.ts:220 🔍 Generating embedding 27/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1675 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 550ms
EmbeddingService.ts:224 ✅ Generated embedding 27/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 27/60 (70%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 27/60
EmbeddingService.ts:220 🔍 Generating embedding 28/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1878 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 683ms
EmbeddingService.ts:224 ✅ Generated embedding 28/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 28/60 (71%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 28/60
EmbeddingService.ts:220 🔍 Generating embedding 29/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1859 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 694ms
EmbeddingService.ts:224 ✅ Generated embedding 29/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 29/60 (72%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 29/60
EmbeddingService.ts:220 🔍 Generating embedding 30/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1538 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 512ms
EmbeddingService.ts:224 ✅ Generated embedding 30/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 30/60 (73%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 30/60
EmbeddingService.ts:220 🔍 Generating embedding 31/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1604 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 528ms
EmbeddingService.ts:224 ✅ Generated embedding 31/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 31/60 (73%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 31/60
EmbeddingService.ts:220 🔍 Generating embedding 32/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1635 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 643ms
EmbeddingService.ts:224 ✅ Generated embedding 32/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 32/60 (74%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 32/60
EmbeddingService.ts:220 🔍 Generating embedding 33/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1709 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 522ms
EmbeddingService.ts:224 ✅ Generated embedding 33/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 33/60 (75%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 33/60
EmbeddingService.ts:220 🔍 Generating embedding 34/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1700 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 629ms
EmbeddingService.ts:224 ✅ Generated embedding 34/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 34/60 (76%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 34/60
EmbeddingService.ts:220 🔍 Generating embedding 35/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1622 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 687ms
EmbeddingService.ts:224 ✅ Generated embedding 35/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 35/60 (76%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 35/60
EmbeddingService.ts:220 🔍 Generating embedding 36/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1751 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 597ms
EmbeddingService.ts:224 ✅ Generated embedding 36/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 36/60 (77%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 36/60
EmbeddingService.ts:220 🔍 Generating embedding 37/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1603 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 513ms
EmbeddingService.ts:224 ✅ Generated embedding 37/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 37/60 (78%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 37/60
EmbeddingService.ts:220 🔍 Generating embedding 38/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1769 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 623ms
EmbeddingService.ts:224 ✅ Generated embedding 38/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 38/60 (79%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 38/60
EmbeddingService.ts:220 🔍 Generating embedding 39/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1854 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 674ms
EmbeddingService.ts:224 ✅ Generated embedding 39/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 39/60 (79%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 39/60
EmbeddingService.ts:220 🔍 Generating embedding 40/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1636 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 506ms
EmbeddingService.ts:224 ✅ Generated embedding 40/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 40/60 (80%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 40/60
EmbeddingService.ts:220 🔍 Generating embedding 41/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1641 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 393ms
EmbeddingService.ts:224 ✅ Generated embedding 41/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 41/60 (81%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 41/60
EmbeddingService.ts:220 🔍 Generating embedding 42/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1634 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 552ms
EmbeddingService.ts:224 ✅ Generated embedding 42/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 42/60 (82%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 42/60
EmbeddingService.ts:220 🔍 Generating embedding 43/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1637 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 425ms
EmbeddingService.ts:224 ✅ Generated embedding 43/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 43/60 (82%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 43/60
EmbeddingService.ts:220 🔍 Generating embedding 44/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1708 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 508ms
EmbeddingService.ts:224 ✅ Generated embedding 44/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 44/60 (83%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 44/60
EmbeddingService.ts:220 🔍 Generating embedding 45/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1744 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 434ms
EmbeddingService.ts:224 ✅ Generated embedding 45/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 45/60 (84%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 45/60
EmbeddingService.ts:220 🔍 Generating embedding 46/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1784 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 603ms
EmbeddingService.ts:224 ✅ Generated embedding 46/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 46/60 (85%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 46/60
EmbeddingService.ts:220 🔍 Generating embedding 47/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1615 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 690ms
EmbeddingService.ts:224 ✅ Generated embedding 47/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 47/60 (85%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 47/60
EmbeddingService.ts:220 🔍 Generating embedding 48/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1604 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 697ms
EmbeddingService.ts:224 ✅ Generated embedding 48/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 48/60 (86%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 48/60
EmbeddingService.ts:220 🔍 Generating embedding 49/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1975 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 706ms
EmbeddingService.ts:224 ✅ Generated embedding 49/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 49/60 (87%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 49/60
EmbeddingService.ts:220 🔍 Generating embedding 50/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1748 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 692ms
EmbeddingService.ts:224 ✅ Generated embedding 50/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 50/60 (88%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 50/60
EmbeddingService.ts:220 🔍 Generating embedding 51/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1889 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 689ms
EmbeddingService.ts:224 ✅ Generated embedding 51/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 51/60 (88%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 51/60
EmbeddingService.ts:220 🔍 Generating embedding 52/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1971 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 692ms
EmbeddingService.ts:224 ✅ Generated embedding 52/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 52/60 (89%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 52/60
EmbeddingService.ts:220 🔍 Generating embedding 53/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1934 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 690ms
EmbeddingService.ts:224 ✅ Generated embedding 53/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 53/60 (90%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 53/60
EmbeddingService.ts:220 🔍 Generating embedding 54/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1627 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 691ms
EmbeddingService.ts:224 ✅ Generated embedding 54/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 54/60 (91%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 54/60
EmbeddingService.ts:220 🔍 Generating embedding 55/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1673 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 687ms
EmbeddingService.ts:224 ✅ Generated embedding 55/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 55/60 (91%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 55/60
EmbeddingService.ts:220 🔍 Generating embedding 56/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1897 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 689ms
EmbeddingService.ts:224 ✅ Generated embedding 56/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 56/60 (92%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 56/60
EmbeddingService.ts:220 🔍 Generating embedding 57/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1798 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 691ms
EmbeddingService.ts:224 ✅ Generated embedding 57/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 57/60 (93%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 57/60
EmbeddingService.ts:220 🔍 Generating embedding 58/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1796 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 689ms
EmbeddingService.ts:224 ✅ Generated embedding 58/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 58/60 (94%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 58/60
EmbeddingService.ts:220 🔍 Generating embedding 59/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (2037 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 693ms
EmbeddingService.ts:224 ✅ Generated embedding 59/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 59/60 (94%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 59/60
EmbeddingService.ts:220 🔍 Generating embedding 60/60...
EmbeddingService.ts:177 🔍 Generating embedding for text (1253 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 693ms
EmbeddingService.ts:224 ✅ Generated embedding 60/60
VectorStore.ts:481 📊 Document processing: Generating embeddings... 60/60 (95%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 60/60
EmbeddingService.ts:256 ✅ Generated 60 embeddings in 197477ms
DocumentProcessor.ts:300 ✅ Generated 60 embeddings with immediate service
VectorStore.ts:481 📊 Document processing: Document processing complete (100%)
VectorStore.ts:515 ✅ Document stored with ID: doc_1754658663251_vpl5u967b
VectorStore.ts:516 📊 Final stats: 60 chunks, 60 vectors
useDocuments.ts:198 ✅ Successfully processed: GRPO_Papper.pdf
useDocuments.ts:72 📊 Document status updated: {documents: 1, totalSize: '1.8 MB', totalChunks: 60, totalVectors: 60, avgChunksPerDoc: '60.0', …}
useDocuments.ts:206 ✅ File upload complete
useDocuments.ts:172 📚 Processing 1 files...
useDocuments.ts:176 📄 Processing file 1/1: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
useDocuments.ts:183 📄 PDF detected: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf - will extract text content
useDocuments.ts:93 📄 Processing PDF file: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
PDFParser.ts:68 📄 Parsing PDF: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf (417.7 KB)
useDocuments.ts:101 📊 PDF parsing: Uploading PDF to server...
useDocuments.ts:101 📊 PDF parsing: Parsing PDF on server...
PDFParser.ts:89 📤 Making API request to /api/pdf-parser for file: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
PDFParser.ts:99 📥 API response status: 200 OK
useDocuments.ts:101 📊 PDF parsing: Processing extracted text...
useDocuments.ts:101 📊 PDF parsing: Extracted 22 pages with 43165 characters
PDFParser.ts:161 ✅ PDF parsed successfully: {filename: 'LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf', pages: 22, textLength: 43165, parseTime: '586ms', hasText: true}
PDFParser.ts:91 Fetch finished loading: POST "http://localhost:3000/api/pdf-parser".
parsePDF @ PDFParser.ts:91
useDocuments.useCallback[extractFileContent] @ useDocuments.ts:96
useDocuments.useCallback[handleFileUpload] @ useDocuments.ts:189
handleFileUpload @ DeepResearchApp.tsx:226
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
useDocuments.ts:106 ✅ PDF parsed successfully: 22 pages, 43165 characters
VectorStore.ts:452 📄 Processing document: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
VectorStore.ts:453 📄 File size: 417.73 KB, Content length: 43165 characters
DocumentProcessor.ts:207 📄 Starting document processing: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
embeddingWorker.js:92 📄 Processing document: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
embeddingWorker.js:93 📊 Document stats: 43165 characters, 5651 words
embeddingWorker.js:143 📝 Chunking text: 43165 characters
VectorStore.ts:481 📊 Document processing: Breaking document into chunks... (13%)
embeddingWorker.js:147 📊 Total words: 5651
embeddingWorker.js:157 📊 Chunking parameters: 250 words/chunk, 50 overlap, 200 step
VectorStore.ts:481 📊 Document processing: Processing chunk 1/29 (with overlap)... (14%)
VectorStore.ts:481 📊 Document processing: Processing chunk 2/29 (with overlap)... (14%)
VectorStore.ts:481 📊 Document processing: Processing chunk 3/29 (with overlap)... (15%)
VectorStore.ts:481 📊 Document processing: Processing chunk 4/29 (with overlap)... (16%)
VectorStore.ts:481 📊 Document processing: Processing chunk 5/29 (with overlap)... (17%)
VectorStore.ts:481 📊 Document processing: Processing chunk 6/29 (with overlap)... (18%)
VectorStore.ts:481 📊 Document processing: Processing chunk 7/29 (with overlap)... (19%)
VectorStore.ts:481 📊 Document processing: Processing chunk 8/29 (with overlap)... (20%)
VectorStore.ts:481 📊 Document processing: Processing chunk 9/29 (with overlap)... (21%)
VectorStore.ts:481 📊 Document processing: Processing chunk 10/29 (with overlap)... (21%)
VectorStore.ts:481 📊 Document processing: Processing chunk 11/29 (with overlap)... (22%)
VectorStore.ts:481 📊 Document processing: Processing chunk 12/29 (with overlap)... (23%)
VectorStore.ts:481 📊 Document processing: Processing chunk 13/29 (with overlap)... (24%)
VectorStore.ts:481 📊 Document processing: Processing chunk 14/29 (with overlap)... (25%)
VectorStore.ts:481 📊 Document processing: Processing chunk 15/29 (with overlap)... (26%)
VectorStore.ts:481 📊 Document processing: Processing chunk 16/29 (with overlap)... (27%)
VectorStore.ts:481 📊 Document processing: Processing chunk 17/29 (with overlap)... (27%)
VectorStore.ts:481 📊 Document processing: Processing chunk 18/29 (with overlap)... (28%)
VectorStore.ts:481 📊 Document processing: Processing chunk 19/29 (with overlap)... (29%)
VectorStore.ts:481 📊 Document processing: Processing chunk 20/29 (with overlap)... (30%)
VectorStore.ts:481 📊 Document processing: Processing chunk 21/29 (with overlap)... (31%)
VectorStore.ts:481 📊 Document processing: Processing chunk 22/29 (with overlap)... (32%)
VectorStore.ts:481 📊 Document processing: Processing chunk 23/29 (with overlap)... (33%)
VectorStore.ts:481 📊 Document processing: Processing chunk 24/29 (with overlap)... (33%)
VectorStore.ts:481 📊 Document processing: Processing chunk 25/29 (with overlap)... (34%)
VectorStore.ts:481 📊 Document processing: Processing chunk 26/29 (with overlap)... (35%)
VectorStore.ts:481 📊 Document processing: Processing chunk 27/29 (with overlap)... (36%)
VectorStore.ts:481 📊 Document processing: Processing chunk 28/29 (with overlap)... (37%)
embeddingWorker.js:205 ✅ Created 29 word-based chunks (250 words per chunk, 50 word overlap, max 200 chunks)
VectorStore.ts:481 📊 Document processing: Processing chunk 29/29 (with overlap)... (38%)
embeddingWorker.js:124 ✅ Document chunked in 5ms: 29 chunks
VectorStore.ts:481 📊 Document processing: Processed 29 text chunks (38%)
DocumentProcessor.ts:269 📊 Received chunked document: 29 chunks
VectorStore.ts:481 📊 Document processing: Generating embeddings... (50%)
DocumentProcessor.ts:281 🧠 Generating embeddings with pre-loaded Xenova...
EmbeddingService.ts:211 🔍 Generating embeddings for 29 texts...
EmbeddingService.ts:220 🔍 Generating embedding 1/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1984 chars)...
DocumentProcessor.ts:101 [Violation] 'message' handler took 466ms
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 478ms
EmbeddingService.ts:224 ✅ Generated embedding 1/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 1/29 (52%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 1/29
EmbeddingService.ts:220 🔍 Generating embedding 2/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1985 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 473ms
EmbeddingService.ts:224 ✅ Generated embedding 2/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 2/29 (53%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 2/29
EmbeddingService.ts:220 🔍 Generating embedding 3/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1967 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 510ms
EmbeddingService.ts:224 ✅ Generated embedding 3/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 3/29 (55%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 3/29
EmbeddingService.ts:220 🔍 Generating embedding 4/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1954 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 430ms
EmbeddingService.ts:224 ✅ Generated embedding 4/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 4/29 (56%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 4/29
EmbeddingService.ts:220 🔍 Generating embedding 5/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1824 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 422ms
EmbeddingService.ts:224 ✅ Generated embedding 5/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 5/29 (58%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 5/29
EmbeddingService.ts:220 🔍 Generating embedding 6/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1763 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 407ms
EmbeddingService.ts:224 ✅ Generated embedding 6/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 6/29 (59%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 6/29
EmbeddingService.ts:220 🔍 Generating embedding 7/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1744 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 371ms
EmbeddingService.ts:224 ✅ Generated embedding 7/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 7/29 (61%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 7/29
EmbeddingService.ts:220 🔍 Generating embedding 8/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (2178 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 700ms
EmbeddingService.ts:224 ✅ Generated embedding 8/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 8/29 (62%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 8/29
EmbeddingService.ts:220 🔍 Generating embedding 9/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (2052 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 698ms
EmbeddingService.ts:224 ✅ Generated embedding 9/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 9/29 (64%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 9/29
EmbeddingService.ts:220 🔍 Generating embedding 10/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1851 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 406ms
EmbeddingService.ts:224 ✅ Generated embedding 10/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 10/29 (66%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 10/29
EmbeddingService.ts:220 🔍 Generating embedding 11/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1859 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 414ms
EmbeddingService.ts:224 ✅ Generated embedding 11/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 11/29 (67%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 11/29
EmbeddingService.ts:220 🔍 Generating embedding 12/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1769 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 507ms
EmbeddingService.ts:224 ✅ Generated embedding 12/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 12/29 (69%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 12/29
EmbeddingService.ts:220 🔍 Generating embedding 13/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1759 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 464ms
EmbeddingService.ts:224 ✅ Generated embedding 13/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 13/29 (70%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 13/29
EmbeddingService.ts:220 🔍 Generating embedding 14/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1791 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 552ms
EmbeddingService.ts:224 ✅ Generated embedding 14/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 14/29 (72%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 14/29
EmbeddingService.ts:220 🔍 Generating embedding 15/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1854 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 448ms
EmbeddingService.ts:224 ✅ Generated embedding 15/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 15/29 (73%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 15/29
EmbeddingService.ts:220 🔍 Generating embedding 16/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1833 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 512ms
EmbeddingService.ts:224 ✅ Generated embedding 16/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 16/29 (75%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 16/29
EmbeddingService.ts:220 🔍 Generating embedding 17/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1730 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 515ms
EmbeddingService.ts:224 ✅ Generated embedding 17/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 17/29 (76%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 17/29
EmbeddingService.ts:220 🔍 Generating embedding 18/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1947 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 424ms
EmbeddingService.ts:224 ✅ Generated embedding 18/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 18/29 (78%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 18/29
EmbeddingService.ts:220 🔍 Generating embedding 19/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1899 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 465ms
EmbeddingService.ts:224 ✅ Generated embedding 19/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 19/29 (79%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 19/29
EmbeddingService.ts:220 🔍 Generating embedding 20/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1956 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 406ms
EmbeddingService.ts:224 ✅ Generated embedding 20/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 20/29 (81%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 20/29
EmbeddingService.ts:220 🔍 Generating embedding 21/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1992 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 456ms
EmbeddingService.ts:224 ✅ Generated embedding 21/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 21/29 (83%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 21/29
EmbeddingService.ts:220 🔍 Generating embedding 22/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (2052 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 412ms
EmbeddingService.ts:224 ✅ Generated embedding 22/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 22/29 (84%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 22/29
EmbeddingService.ts:220 🔍 Generating embedding 23/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (2455 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 699ms
EmbeddingService.ts:224 ✅ Generated embedding 23/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 23/29 (86%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 23/29
EmbeddingService.ts:220 🔍 Generating embedding 24/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1835 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 694ms
EmbeddingService.ts:224 ✅ Generated embedding 24/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 24/29 (87%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 24/29
EmbeddingService.ts:220 🔍 Generating embedding 25/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1966 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 694ms
EmbeddingService.ts:224 ✅ Generated embedding 25/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 25/29 (89%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 25/29
EmbeddingService.ts:220 🔍 Generating embedding 26/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1651 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 571ms
EmbeddingService.ts:224 ✅ Generated embedding 26/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 26/29 (90%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 26/29
EmbeddingService.ts:220 🔍 Generating embedding 27/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1858 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 692ms
EmbeddingService.ts:224 ✅ Generated embedding 27/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 27/29 (92%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 27/29
EmbeddingService.ts:220 🔍 Generating embedding 28/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (1632 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 695ms
EmbeddingService.ts:224 ✅ Generated embedding 28/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 28/29 (93%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 28/29
EmbeddingService.ts:220 🔍 Generating embedding 29/29...
EmbeddingService.ts:177 🔍 Generating embedding for text (335 chars)...
EmbeddingService.ts:191 ✅ Generated embedding: 384 dimensions in 126ms
EmbeddingService.ts:224 ✅ Generated embedding 29/29
VectorStore.ts:481 📊 Document processing: Generating embeddings... 29/29 (95%)
EmbeddingService.ts:230 ⏸️ Yielding control to UI after embedding 29/29
EmbeddingService.ts:256 ✅ Generated 29 embeddings in 16290ms
DocumentProcessor.ts:300 ✅ Generated 29 embeddings with immediate service
VectorStore.ts:481 📊 Document processing: Document processing complete (100%)
VectorStore.ts:515 ✅ Document stored with ID: doc_1754658915966_7rvdl7exw
VectorStore.ts:516 📊 Final stats: 29 chunks, 29 vectors
useDocuments.ts:198 ✅ Successfully processed: LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf
useDocuments.ts:72 📊 Document status updated: {documents: 2, totalSize: '2.2 MB', totalChunks: 89, totalVectors: 89, avgChunksPerDoc: '44.5', …}
useDocuments.ts:206 ✅ File upload complete
prompt-input.tsx:481 🔍 Submit context check: {enableRAG: true, webSearchEnabled: false, webSearchConfigured: false, hasRAGSearch: true, hasWebSearch: true}
prompt-input.tsx:502 🧠 Skipping initial RAG search for deep-research - Master Orchestrator will handle DataInspector magic filtering
prompt-input.tsx:507 🚫 UI web search disabled - WebSearchAgent will handle intelligent web expansion when needed
useResearch.ts:940 🔬 Starting intelligent research for: "How can LLMs help in designing rockets"
ResearchOrchestrator.ts:104 🔬 Starting research for: "How can LLMs help in designing rockets"
ResearchOrchestrator.ts:110 🎯 DataInspector Architecture: Getting userdocs metadata for intelligent filtering
VectorStore.ts:794 🔍 getDocumentMetadata: Filtering for document types [userdocs]
VectorStore.ts:803 🔍 DEBUG: No userdocs found, checking all documents...
VectorStore.ts:805 🔍 DEBUG: Total documents in database: 2
VectorStore.ts:808 🔍 DEBUG Doc 1: documentType="undefined", source="upload", title="GRPO_Papper.pdf"
VectorStore.ts:808 🔍 DEBUG Doc 2: documentType="undefined", source="upload", title="LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf"
VectorStore.ts:812 🔧 AUTO-FIXING: Setting documentType for uploaded documents...
VectorStore.ts:867 🔧 Fixing documents missing documentType...
VectorStore.ts:873 🔧 Fixing document "GRPO_Papper.pdf" - setting documentType to 'userdocs'
VectorStore.ts:873 🔧 Fixing document "LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf" - setting documentType to 'userdocs'
VectorStore.ts:881 ✅ Document types fixed!
VectorStore.ts:816 🔄 RETRYING: Query after fixing documentTypes...
VectorStore.ts:834 ✅ RETRY SUCCESS: Found 2 userdocs after fix!
ResearchOrchestrator.ts:114 📊 Retrieved 2 documents (89 total chunks) - DataInspector will sample and filter
ResearchOrchestrator.ts:1427 🧠 Master Orchestrator eligibility: RAG sources: true, Substantial content: true
ResearchOrchestrator.ts:138 🧠 MASTER ORCHESTRATOR: Bypassing traditional pipeline entirely - using intelligent tool orchestration
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:966 📋 Adding new step: master_orchestrator_1754658947822_1_1ssub
ResearchOrchestrator.ts:1437 🧠 Master Orchestrator: Starting with intelligent document analysis for "How can LLMs help in designing rockets"
ResearchOrchestrator.ts:1438 📊 Found 2 sources for DataInspector magic filtering
AgentRegistry.ts:21 📝 Registered agent: QueryPlanner - Expands queries based on intent and domain understanding
AgentRegistry.ts:21 📝 Registered agent: DataInspector - Analyzes RAG chunks to understand data structure and quality
AgentRegistry.ts:21 📝 Registered agent: PlanningAgent - Creates intelligent execution strategies based on document analysis and query requirements
AgentRegistry.ts:21 📝 Registered agent: PatternGenerator - Creates extraction strategies based on data inspection
AgentRegistry.ts:21 📝 Registered agent: Extractor - Executes extraction using generated patterns
index.ts:80 🌐 WebSearchAgent disabled by configuration
AgentRegistry.ts:21 📝 Registered agent: Synthesizer - Consolidates extracted data into a coherent answer
ResearchOrchestrator.ts:1588 🧠 Calling Master Orchestrator.research() with 2 found sources for intelligent analysis
Orchestrator.ts:130 🧠 Master LLM Orchestrator starting for: "How can LLMs help in designing rockets"
Orchestrator.ts:158 🎯 Master LLM analyzing situation and planning tool calls...
Orchestrator.ts:166 🔄 Master LLM Iteration 1: Answer the user's query: "How can LLMs help in designing rockets"
js?id=G-V1B8R98P79:242 Fetch failed loading: POST "https://www.google-analytics.com/g/collect?v=2&tid=G-V1B8R98P79&gtm=45je5861h1v898116370za200zd898116370&_p=1754658623095&gcd=13l3l3l3l1l1&npa=0&dma=0&tag_exp=101509157~103116026~103200004~103233427~104527907~104528500~104684208~104684211~104948813~105103161~105103163~105135708~105135710&cid=995334552.1754650390&ul=en-us&sr=2240x1260&uaa=arm&uab=64&uafvl=Not)A%253BBrand%3B8.0.0.0%7CChromium%3B138.0.7204.158%7CGoogle%2520Chrome%3B138.0.7204.158&uamb=0&uam=&uap=macOS&uapv=15.5.0&uaw=0&are=1&frm=0&pscdl=noapi&_eu=AEEAAAQ&_s=6&sid=1754654956&sct=2&seg=1&dl=http%3A%2F%2Flocalhost%2Fdeep-research&dt=TimeCapsule%20-%20AI-Powered%20Learning%20Platform&en=form_start&ep.anonymize_ip=false&ep.debug_mode=false&ep.site_name=TimeCapsule-%20SLM&ep.form_id=&ep.form_name=&ep.form_destination=http%3A%2F%2Flocalhost%3A3000%2Fdeep-research&epn.form_length=9&ep.first_field_id=&ep.first_field_name=&ep.first_field_type=&epn.first_field_position=2&_et=91324&tfd=336800".
Yc @ js?id=G-V1B8R98P79:242
zm @ js?id=G-V1B8R98P79:431
cN @ js?id=G-V1B8R98P79:910
k.flush @ js?id=G-V1B8R98P79:918
(anonymous) @ js?id=G-V1B8R98P79:915
Orchestrator.ts:316 🧠 Master LLM Decision Response (649 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to understand how LLMs can help in designing rockets. To do this, we need to analyze the available documents to identify relevant information about this topic. DataInspector is the best tool to filter and analyze the provided documents.
NEXT_GOAAL: Analyze the 2 available documents to identify information related to using LLMs in rocket design.

ACTION: COMplete
REASONING: I have initiated the DataInspector call to analyze the pro...
Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (649 chars): ACTION: CALL_TOOL
TOOL_NAME: DataInspector
REASONING: The goal is to understand how LLMs can help in designing rockets. To do this, we need to analyze the available documents to identify relevant information about this topic. DataInspector is the best tool to filter and analyze the provided documents.
NEXT_GOAAL: Analyze the 2 available documents to identify information related to using LLMs in rocket design.

ACTION: COMplete
REASONING: I have initiated the DataInspector call to analyze the provided documents. I will wait for the DataInspector to return the filtered documents.
NEXT_GOAL: Wait for DataInspector to return filtered documents.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): DataInspector
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=DataInspector
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'DataInspector', reasoning: 'Need to call DataInspector to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: DataInspector - Need to call DataInspector to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: DataInspector
Orchestrator.ts:706 📋 Current agents called: []
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1021 ✅ Agent execution validated: DataInspector always allowed as first agent
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:169
research @ Orchestrator.ts:141
executeMasterOrchestrator @ ResearchOrchestrator.ts:1589
executeResearch @ ResearchOrchestrator.ts:153
await in executeResearch
useResearch.useCallback[performIntelligentResearch] @ useResearch.ts:990
handleSubmit @ ResearchOutput.tsx:807
handleSubmitWithContext @ prompt-input.tsx:513
handleKeyDown @ prompt-input.tsx:471
executeDispatch @ react-dom-client.development.js:16502
runWithFiberInDEV @ react-dom-client.development.js:845
processDispatchQueue @ react-dom-client.development.js:16552
eval @ react-dom-client.development.js:17150
batchedUpdates$1 @ react-dom-client.development.js:3263
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16706
dispatchEvent @ react-dom-client.development.js:20816
dispatchDiscreteEvent @ react-dom-client.development.js:20784
Orchestrator.ts:1053 🔧 Executing tool: DataInspector (original: DataInspector)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: DataInspector (DataInspector)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 5% (Initializing document analysis)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
DataInspectorAgent.ts:55 🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 10% (Starting multi-document analysis)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
DataInspectorAgent.ts:1096 🧠 DataInspector Magic: Starting multi-document sampling and filtering
DataInspectorAgent.ts:1108 📋 Found 2 documents to analyze: (2) ['GRPO_Papper.pdf', 'LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf']
DataInspectorAgent.ts:1133 🔍 Analyzing 2 documents for relevance BEFORE sampling
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 15% (Analyzing 2 documents for relevance)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
DataInspectorAgent.ts:128 🔍 Multi-document analysis: 2 documents detected
scheduler.development.js:14 [Violation] 'message' handler took 180ms
scheduler.development.js:14 [Violation] 'message' handler took 150ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
performMultiDocumentAnalysis @ DataInspectorAgent.ts:168
performDocumentMetadataAnalysis @ DataInspectorAgent.ts:1151
process @ DataInspectorAgent.ts:57
executeToolCall @ Orchestrator.ts:1064
masterLLMOrchestration @ Orchestrator.ts:198
DataInspectorAgent.ts:169 🤖 Multi-document analysis: ## Analysis of Documents for Rocket Design with LLMs

Here's an analysis of the provided documents, addressing the critical questions and following the specified rules:

**1. DOCUMENT TYPES:**

* **DOCUMENT 1: `doc_1754658663251_vpl5u967b`**: Likely a **Research Paper** based on the metadata "GRP_Pa
DataInspectorAgent.ts:349 🧠 DataInspector analyzing 2 documents with pure LLM intelligence
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 15% ([18:47:11] Step 1/2: Analyzing doc_1754658663251_vpl5u967b)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
analyzeDocumentIntelligently @ DataInspectorAgent.ts:478
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:366
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
DataInspectorAgent.ts:481 🧠 DataInspector Document 1 LLM Response: TYPE: Resume
ENTITY: Tyler Romero
RELEVANT: YES
REASON: The document metadata indicates "GRP0_Papper.pdf". The query asks about "Rutwik's project". The document is about Tyler Romero, and the query is about Rutwik. Therefore, the document is relevant.



...
DataInspectorAgent.ts:490 🔍 DataInspector Document 1 Parsed: {docType: 'Resume', primaryEntity: 'Tyler Romero', relevantText: 'YES', reasoning: `The document metadata indicates "GRP0_Papper.pdf".… query asks about "Rutwik's project". The docu...`}
DataInspectorAgent.ts:533 🔍 RELEVANCE DEBUG: Query person: "", Entity words: [tyler, romero]
DataInspectorAgent.ts:497 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Tyler Romero", Query="How can LLMs help in designing rockets" → Result: true
DataInspectorAgent.ts:368 🔍 Document 1 intelligent analysis: {docType: 'Resume', primaryEntity: 'Tyler Romero', isRelevant: true, reasoning: `The document metadata indicates "GRP0_Papper.pdf".… query asks about "Rutwik's project". The docu...`}
DataInspectorAgent.ts:377 ✅ Including relevant document: Resume (Tyler Romero)
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 20% ([18:47:17] ✅ Including: Tyler Romero)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverContentAreas @ DataInspectorAgent.ts:720
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:386
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverEntitiesIntelligently @ DataInspectorAgent.ts:676
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:389
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverDocumentRole @ DataInspectorAgent.ts:777
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:392
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 45% ([18:47:33] Step 2/2: Analyzing doc_1754658915966_7rvdl7exw)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
analyzeDocumentIntelligently @ DataInspectorAgent.ts:478
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:366
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
DataInspectorAgent.ts:481 🧠 DataInspector Document 2 LLM Response: TYPE: Report
ENTITY: Tyler Romero
RELLEVANT: YES
REASON: The document title explicitly mentions "LLMS FOR ENGINEERING - TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS" and the metadata includes "2504.19394v2.pdf". This suggests the document is about Tyler Romero, as the title indicates he is the author or creator of the content. The query asks about LLM's help in designing rockets, which is directly related to the document's topic.



...
DataInspectorAgent.ts:635 🔧 DataInspector: Fixed typo "RELLEVANT" → "RELEVANT" for value: "YES"
DataInspectorAgent.ts:490 🔍 DataInspector Document 2 Parsed: {docType: 'Report', primaryEntity: 'Tyler Romero', relevantText: 'YES', reasoning: 'The document title explicitly mentions "LLMS FOR E…EERING - TEACHING MODELS TO DESIGN HIGH POWERE...'}
DataInspectorAgent.ts:533 🔍 RELEVANCE DEBUG: Query person: "", Entity words: [tyler, romero]
DataInspectorAgent.ts:497 🔍 RELEVANCE ANALYSIS: Text="YES", Entity="Tyler Romero", Query="How can LLMs help in designing rockets" → Result: true
DataInspectorAgent.ts:368 🔍 Document 2 intelligent analysis: {docType: 'Report', primaryEntity: 'Tyler Romero', isRelevant: true, reasoning: 'The document title explicitly mentions "LLMS FOR E…EERING - TEACHING MODELS TO DESIGN HIGH POWERE...'}
DataInspectorAgent.ts:377 ✅ Including relevant document: Report (Tyler Romero)
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 50% ([18:47:42] ✅ Including: Tyler Romero)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverContentAreas @ DataInspectorAgent.ts:720
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:386
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverEntitiesIntelligently @ DataInspectorAgent.ts:676
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:389
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
discoverDocumentRole @ DataInspectorAgent.ts:777
parseMultiDocumentAnalysis @ DataInspectorAgent.ts:392
await in parseMultiDocumentAnalysis
updateContextFromMultiDocumentInspection @ DataInspectorAgent.ts:282
performMultiDocumentAnalysis @ DataInspectorAgent.ts:172
DataInspectorAgent.ts:411 📊 Document filtering: 2 total → 2 relevant
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: DataInspector - 90% (Filtered 2 documents → 2 relevant)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
DataInspectorAgent.ts:298 📋 Multi-Document Analysis: 2 documents with 0 relationships
DataInspectorAgent.ts:336 ✅ DOCUMENT ANALYSIS: All 2 documents deemed relevant - no filtering applied
DataInspectorAgent.ts:1161 📊 Relevance analysis: 2 relevant out of 2 total documents
DataInspectorAgent.ts:1164 🔍 Sampling real chunks from 2 RELEVANT documents only
DataInspectorAgent.ts:1230 ✅ Sampled 2 real chunks from "GRPO_Papper.pdf" (60 total chunks)
DataInspectorAgent.ts:1230 ✅ Sampled 2 real chunks from "LLMS FOR ENGINEERING- TEACHING MODELS TO DESIGN HIGH POWERED ROCKETS_2504.19394v2.pdf" (29 total chunks)
DataInspectorAgent.ts:1265 ✅ Sampled chunks from 2 RELEVANT documents only
DataInspectorAgent.ts:1269 🔄 Replacing 2 document metadata with 4 relevant chunks (NO CONTAMINATION)
Orchestrator.ts:1068 ✅ Tool DataInspector completed in 104273ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: DataInspector
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 2: Answer the user's query: "How can LLMs help in designing rockets"
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:169
Orchestrator.ts:316 🧠 Master LLM Decision Response (608 chars): To call a tool:
ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REAASONING: The current situation lacks an execution plan. The PlanningAgent is needed to create a strategy for processing the available documents and extracting relevant information about how LLMs can assist in rocket design.
NEXT_GOAL: Create an execution plan to process the available documents.

ACTION: COMplete
REASONING: The PlanningAgent will create an execution plan. This plan will guide the subsequent steps, ensuring that the dat...
Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (608 chars): To call a tool:
ACTION: CALL_TOOL
TOOL_NAME: PlanningAgent
REAASONING: The current situation lacks an execution plan. The PlanningAgent is needed to create a strategy for processing the available documents and extracting relevant information about how LLMs can assist in rocket design.
NEXT_GOAL: Create an execution plan to process the available documents.

ACTION: COMplete
REASONING: The PlanningAgent will create an execution plan. This plan will guide the subsequent steps, ensuring that the data is processed in a logical and efficient manner.
NEXT_GOAL: Execute the plan created by the PlanningAgent.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): PlanningAgent
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PlanningAgent
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PlanningAgent', reasoning: 'Need to call PlanningAgent to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: PlanningAgent - Need to call PlanningAgent to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: PlanningAgent
Orchestrator.ts:706 📋 Current agents called: [DataInspector]
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:1021 ✅ Agent execution validated: PlanningAgent execution is contextually appropriate
Orchestrator.ts:1053 🔧 Executing tool: PlanningAgent (original: PlanningAgent)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: PlanningAgent (PlanningAgent)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PlanningAgent.ts:45 🎯 PlanningAgent: Creating intelligent execution strategy for "How can LLMs help in designing rockets"
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 10% (Analyzing research context)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PlanningAgent.ts:52 📊 Situation Analysis: {hasDocuments: true, documentCount: 4, hasDocumentAnalysis: true, relevantDocuments: 2, documentTypes: Array(2), …}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 30% (Creating execution strategy)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 50% (Generating strategic plan with LLM)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
deep-research:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
scheduler.development.js:14 [Violation] 'message' handler took 288ms
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 60% (Parsing execution strategy)
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
createExecutionPlan @ PlanningAgent.ts:165
process @ PlanningAgent.ts:58
executeToolCall @ Orchestrator.ts:1064
masterLLMOrchestration @ Orchestrator.ts:198
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PlanningAgent.ts:292 🔄 PlanningAgent parsing attempt 1/4
responseCompletion.ts:213 🔍 Direct JSON parse failed, trying extraction...
responseCompletion.ts:319 🔧 Array element separation fixes applied
PlanningAgent.ts:312 ✅ Successfully parsed execution plan on attempt 1
PlanningAgent.ts:172 🎯 Generated execution plan: {strategy: 'Employ a structured extraction and synthesis appro…nsure proper attribution to each document source.', stepCount: 3, confidence: 0.8}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 70% (Storing execution plan)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PlanningAgent - 100% (Execution plan completed)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PlanningAgent.ts:76 ✅ Execution plan created: Employ a structured extraction and synthesis approach to gather information from the provided documents, focusing on key content areas related to LLM design and rockets. Prioritize efficient pattern matching for data extraction and ensure proper attribution to each document source.
Orchestrator.ts:1068 ✅ Tool PlanningAgent completed in 40137ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: PlanningAgent
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 3: Answer the user's query: "How can LLMs help in designing rockets"
Orchestrator.ts:65 📋 Following execution plan: Next step is PatternGenerator - Generate regex patterns for extracting relevant information from the documents (e.g., document title, metadata, textual content, keywords). Focus on patterns that can identify sections related to LLMs, rocket design, and relevant technical details.
scheduler.development.js:14 [Violation] 'message' handler took 245ms
scheduler.development.js:14 [Violation] 'message' handler took 186ms
scheduler.development.js:14 [Violation] 'message' handler took 231ms
use-websocket.js:113 [Violation] 'setInterval' handler took 52ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:169
Orchestrator.ts:316 🧠 Master LLM Decision Response (473 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The PlanningAgent has identified the next step as generating regex patterns for data extraction. This is a foundational step to enable data extraction.
NEXT_GOAAL: Generate regex patterns for extracting relevant information from the documents.

ACTION: COMplete
REASONING: After PatternGenerator generates patterns, the Extractor will be called to extract data.
NEXT_GOAL: Extract data using the generated patterns.

Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (473 chars): ACTION: CALL_TOOL
TOOL_NAME: PatternGenerator
REASONING: The PlanningAgent has identified the next step as generating regex patterns for data extraction. This is a foundational step to enable data extraction.
NEXT_GOAAL: Generate regex patterns for extracting relevant information from the documents.

ACTION: COMplete
REASONING: After PatternGenerator generates patterns, the Extractor will be called to extract data.
NEXT_GOAL: Extract data using the generated patterns.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): PatternGenerator
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=PatternGenerator
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'PatternGenerator', reasoning: 'Need to call PatternGenerator to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: PatternGenerator - Need to call PatternGenerator to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: PatternGenerator
Orchestrator.ts:706 📋 Current agents called: [DataInspector, PlanningAgent]
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:954 ✅ PatternGenerator validated against execution plan - prerequisites met
Orchestrator.ts:1021 ✅ Agent execution validated: PatternGenerator execution follows planned sequence - step 1 of 3
Orchestrator.ts:1053 🔧 Executing tool: PatternGenerator (original: PatternGenerator)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: PatternGenerator (PatternGenerator)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PatternGeneratorAgent.ts:26 🎯 PatternGenerator: Creating extraction strategies
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 10% (Analyzing existing patterns)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PatternGeneratorAgent.ts:32 📋 DEBUG - Existing patterns before PatternGenerator: {count: 2, patterns: Array(2), hasSharedKnowledge: true}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 30% (Generating extraction strategies)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PatternGeneratorAgent.ts:51 🧠 PatternGenerator: Generating dynamic regex patterns via LLM analysis
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 50% (Generating patterns with LLM)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
scheduler.development.js:14 [Violation] 'message' handler took 204ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
generateStrategiesWithLLM @ PatternGeneratorAgent.ts:81
process @ PatternGeneratorAgent.ts:42
executeToolCall @ Orchestrator.ts:1064
masterLLMOrchestration @ Orchestrator.ts:198
PatternGeneratorAgent.ts:82 🎯 LLM regex generation response: REGEX_PATTERNS:
- - /Deep Seek Math/gi
- - /learning rate/gi
- - /KL coefficient/gi
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 70% (Parsing generated patterns)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
PatternGeneratorAgent.ts:442 🔍 Starting triple-tier pattern parsing from LLM response (83 chars)
PatternGeneratorAgent.ts:480 🔍 Found REGEX_PATTERNS section: "- - /Deep Seek Math/gi
- - /learning rate/gi
- - /KL coefficient/gi..."
PatternGeneratorAgent.ts:584 🧪 Normalizing pattern: "/Deep Seek Math/gi"
PatternGeneratorAgent.ts:588 ✅ Already normalized: /Deep Seek Math/gi
PatternGeneratorAgent.ts:584 🧪 Normalizing pattern: "/learning rate/gi"
PatternGeneratorAgent.ts:588 ✅ Already normalized: /learning rate/gi
PatternGeneratorAgent.ts:584 🧪 Normalizing pattern: "/KL coefficient/gi"
PatternGeneratorAgent.ts:588 ✅ Already normalized: /KL coefficient/gi
PatternGeneratorAgent.ts:447 ✅ Tier 1 SUCCESS: Found 3 patterns in structured format
PatternGeneratorAgent.ts:91 ✅ Generated 3 dynamic regex patterns: (3) ['/Deep Seek Math/gi', '/learning rate/gi', '/KL coefficient/gi']
PatternGeneratorAgent.ts:111 ✅ DEBUG - Patterns after PatternGenerator: {previousCount: 2, newCount: 3, totalCount: 5}
ResearchOrchestrator.ts:1481 📊 Master Orchestrator Agent progress: PatternGenerator - 100% (Pattern generation completed)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
Orchestrator.ts:1068 ✅ Tool PatternGenerator completed in 5612ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: PatternGenerator
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 4: Answer the user's query: "How can LLMs help in designing rockets"
Orchestrator.ts:65 📋 Following execution plan: Next step is Extractor - Apply the generated regex patterns to the documents to extract relevant information.  Focus on extracting document metadata, textual content, and keywords.
scheduler.development.js:14 [Violation] 'message' handler took 334ms
useOllamaConnection.ts:416 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ index.mjs:599
postJsonToApi @ index.mjs:554
doGenerate @ index.mjs:485
fn @ index.mjs:4389
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
eval @ index.mjs:4346
_retryWithExponentialBackoff @ index.mjs:359
eval @ index.mjs:348
fn @ index.mjs:4345
await in fn
eval @ index.mjs:558
startActiveSpan @ index.mjs:485
recordSpan @ index.mjs:556
generateText @ index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ useOllamaConnection.ts:416
makeMasterLLMDecision @ Orchestrator.ts:313
masterLLMOrchestration @ Orchestrator.ts:169
Orchestrator.ts:316 🧠 Master LLM Decision Response (607 chars): ACTION: CALL_TOOL
TOOL_NAME: Extractor
REASONING: The PlanningAgent has defined the next step as applying the generated regex patterns to the documents to extract relevant information. The Extractor tool is designed for this purpose.
NEXT_GOAAL: Extract relevant information from the documents using the generated patterns.

ACTION: COMplete
REASONING: After the Extractor tool completes, the extracted data will be available. This data will be used by the Synthesizer to create the final answer to t...
Orchestrator.ts:556 🔍 PARSING DEBUG: Full response (607 chars): ACTION: CALL_TOOL
TOOL_NAME: Extractor
REASONING: The PlanningAgent has defined the next step as applying the generated regex patterns to the documents to extract relevant information. The Extractor tool is designed for this purpose.
NEXT_GOAAL: Extract relevant information from the documents using the generated patterns.

ACTION: COMplete
REASONING: After the Extractor tool completes, the extracted data will be available. This data will be used by the Synthesizer to create the final answer to the user's query.
NEXT_GOAL: Synthesize the extracted data into a comprehensive answer to the user's query.

Orchestrator.ts:569 🎯 PARSED ACTION (FIRST): CALL_TOOL
Orchestrator.ts:572 🎯 PARSED TOOL_NAME (FIRST): Extractor
Orchestrator.ts:581 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
Orchestrator.ts:588 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=Extractor
Orchestrator.ts:319 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Extractor', reasoning: 'Need to call Extractor to progress toward the goal'}
Orchestrator.ts:197 🔧 Master LLM calling tool: Extractor - Need to call Extractor to progress toward the goal
Orchestrator.ts:705 🔍 PLAN-GUIDED VALIDATION: Extractor
Orchestrator.ts:706 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator]
Orchestrator.ts:707 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
Orchestrator.ts:954 ✅ Extractor validated against execution plan - prerequisites met
Orchestrator.ts:1021 ✅ Agent execution validated: Extractor execution follows planned sequence - step 2 of 3
Orchestrator.ts:1053 🔧 Executing tool: Extractor (original: Extractor)
ResearchOrchestrator.ts:1446 🚀 Master Orchestrator Agent started: Extractor (Extractor)
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
ExtractionAgent.ts:28 ⛏️ Extractor: Processing 4 chunks
ExtractionAgent.ts:49 🔍 Pattern Analysis: 3 regex patterns, 2 descriptor patterns
ExtractionAgent.ts:52 🎯 Using REGEX MODE: Found 3 regex patterns from PatternGenerator
ExtractionAgent.ts:53 📋 Regex patterns: /Deep Seek Math/gi, /learning rate/gi, /KL coefficient/gi
ExtractionAgent.ts:790 🎯 Starting REGEX extraction with 3 patterns
ExtractionAgent.ts:796 📊 Processing 4 chunks with 3 regex patterns
ExtractionAgent.ts:801 🔍 Applying pattern: /Deep Seek Math/gi
ExtractionAgent.ts:841 ✅ Pattern "/Deep Seek Math/gi" found 13 matches
ExtractionAgent.ts:801 🔍 Applying pattern: /learning rate/gi
ExtractionAgent.ts:841 ✅ Pattern "/learning rate/gi" found 2 matches
ExtractionAgent.ts:801 🔍 Applying pattern: /KL coefficient/gi
ExtractionAgent.ts:841 ✅ Pattern "/KL coefficient/gi" found 1 matches
ExtractionAgent.ts:848 🎯 REGEX extraction complete: 16 items extracted
ExtractionAgent.ts:141 📊 Extraction Statistics:
ExtractionAgent.ts:142 - Total extracted: 16
ExtractionAgent.ts:143 - After deduplication: 3
ExtractionAgent.ts:144 - Items with time values: 0
ExtractionAgent.ts:145 - Table rows: 0
ExtractionAgent.ts:146 - Current records: 0
ExtractionAgent.ts:149 📈 Item types:
ExtractionAgent.ts:151   - unknown: 3
ExtractionAgent.ts:121 ✅ Extraction complete: 3 items found
Orchestrator.ts:1068 ✅ Tool Extractor completed in 5ms
ResearchOrchestrator.ts:1535 ✅ Master Orchestrator Agent completed: Extractor
useResearch.ts:944 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
useResearch.ts:951 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
Orchestrator.ts:166 🔄 Master LLM Iteration 5: Answer the user's query: "How can LLMs help in designing rockets"
Orchestrator.ts:65 📋 Following execution plan: Next step is Synthesizer - Synthesize the extracted information into a structured answer, ensuring proper attribution to each document source.  Organize the information based on the content areas identified in the document analysis.
use-websocket.js:113 [Violation] 'setInterval' handler took 90ms
[Violation] 'message' handler took 689ms
scheduler.development.js:14 [Violation] 'message' handler took 222ms
 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ webpack-internal:///…/dist/index.mjs:599
postJsonToApi @ webpack-internal:///…/dist/index.mjs:554
doGenerate @ webpack-internal:///…/dist/index.mjs:485
fn @ webpack-internal:///…dist/index.mjs:4389
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
eval @ webpack-internal:///…dist/index.mjs:4346
_retryWithExponentialBackoff @ webpack-internal:///…/dist/index.mjs:359
eval @ webpack-internal:///…/dist/index.mjs:348
fn @ webpack-internal:///…dist/index.mjs:4345
await in fn
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
generateText @ webpack-internal:///…dist/index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ webpack-internal:///…maConnection.ts:333
makeMasterLLMDecision @ webpack-internal:///…Orchestrator.ts:161
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:106
 🧠 Master LLM Decision Response (400 chars): ACTION: CALL_TOOL
TOOL_NAME: Synthesizer
REASONING: The current execution plan dictates that the next step is to synthesize the extracted information into a final answer. The DataInspector, PatternGenerator, and Extractor have all completed their tasks, and the extracted data needs to be assembled into a coherent response.
NEXT_GOAL: Synthesize the extracted information into a structured answer.


 🔍 PARSING DEBUG: Full response (400 chars): ACTION: CALL_TOOL
TOOL_NAME: Synthesizer
REASONING: The current execution plan dictates that the next step is to synthesize the extracted information into a final answer. The DataInspector, PatternGenerator, and Extractor have all completed their tasks, and the extracted data needs to be assembled into a coherent response.
NEXT_GOAL: Synthesize the extracted information into a structured answer.


 🎯 PARSED ACTION (FIRST): CALL_TOOL
 🎯 PARSED TOOL_NAME (FIRST): Synthesizer
 ✅ PRIMARY DECISION FOUND - stopping parse to avoid overwriting with future steps
 ✅ USING STRUCTURED FORMAT: action=CALL_TOOL, toolName=Synthesizer
 🎯 Parsed Decision: {action: 'CALL_TOOL', toolName: 'Synthesizer', reasoning: 'Need to call Synthesizer to progress toward the goal'}
 🔧 Master LLM calling tool: Synthesizer - Need to call Synthesizer to progress toward the goal
 🔍 PLAN-GUIDED VALIDATION: Synthesizer
 📋 Current agents called: [DataInspector, PlanningAgent, PatternGenerator, Extractor]
 💡 Philosophy: Plans guide decisions, Master LLM intelligence overrides plan gaps
 🎯 Validating Synthesizer prerequisites - checking data availability
 📊 Has extracted data: true
 ✅ Synthesizer validated against execution plan - prerequisites met
 ✅ Agent execution validated: Synthesizer execution follows planned sequence - step 3 of 3
 🔧 Executing tool: Synthesizer (original: Synthesizer)
 🚀 Master Orchestrator Agent started: Synthesizer (Synthesizer)
 📋 Step update: synthesis - in_progress - ID: master_orchestrator_1754658947822_1_1ssub
 📋 Skipping duplicate step processing: master_orchestrator_1754658947822_1_1ssub_in_progress
 📝 Synthesizer: Creating final answer from 3 items
    Sources: 4 RAG chunks, 0 Web sources
 ⏱️ Time-based items received: 0
 🧹 Starting content cleaning and deduplication for 3 items
 🧹 After content cleaning: 3 items (removed 0 malformed)
 🧹 After deduplication: 3 items (removed 0 duplicates)
 🧹 After cleaning: 3 items remain
 📊 Found 0 table items out of 3 total
[Violation] 'message' handler took 225ms
 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ webpack-internal:///…/dist/index.mjs:599
postJsonToApi @ webpack-internal:///…/dist/index.mjs:554
doGenerate @ webpack-internal:///…/dist/index.mjs:485
fn @ webpack-internal:///…dist/index.mjs:4389
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
eval @ webpack-internal:///…dist/index.mjs:4346
_retryWithExponentialBackoff @ webpack-internal:///…/dist/index.mjs:359
eval @ webpack-internal:///…/dist/index.mjs:348
fn @ webpack-internal:///…dist/index.mjs:4345
await in fn
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
generateText @ webpack-internal:///…dist/index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ webpack-internal:///…maConnection.ts:333
groupAndRankItems @ webpack-internal:///…nthesisAgent.ts:925
process @ webpack-internal:///…ynthesisAgent.ts:88
executeToolCall @ webpack-internal:///…Orchestrator.ts:835
masterLLMOrchestration @ webpack-internal:///…Orchestrator.ts:132
 🤖 LLM grouping analysis: Okay, let's analyze the provided items and address the user query.

**Analysis of the Items:**

*   **Item 1: Deep Seek Math (value: Deep Seek Math, type: unknown)** - This appears to be a specific to
 🤖 LLM classification response: Okay, let's analyze each item in the context of how LLMs can help design rockets, focusing on whether it represents current records, historical data, or other relevant information.

Here's the breakdo
 Fetch finished loading: POST "http://localhost:11434/api/chat".
postToApi @ webpack-internal:///…/dist/index.mjs:599
postJsonToApi @ webpack-internal:///…/dist/index.mjs:554
doGenerate @ webpack-internal:///…/dist/index.mjs:485
fn @ webpack-internal:///…dist/index.mjs:4389
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
eval @ webpack-internal:///…dist/index.mjs:4346
_retryWithExponentialBackoff @ webpack-internal:///…/dist/index.mjs:359
eval @ webpack-internal:///…/dist/index.mjs:348
fn @ webpack-internal:///…dist/index.mjs:4345
await in fn
eval @ webpack-internal:///…/dist/index.mjs:558
startActiveSpan @ webpack-internal:///…/dist/index.mjs:485
recordSpan @ webpack-internal:///…/dist/index.mjs:556
generateText @ webpack-internal:///…dist/index.mjs:4273
useOllamaConnection.useCallback[generateContent] @ webpack-internal:///…maConnection.ts:333
classifyItemsWithLLM @ webpack-internal:///…nthesisAgent.ts:115
process @ webpack-internal:///…ynthesisAgent.ts:90
 🔄 Generation attempt 1 for prompt length: 1635
 [Fast Refresh] rebuilding
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 172ms
 Fetch finished loading: GET "http://localhost:3000/_next/static/webpack/1b700b9b2ead768a.webpack.hot-update.json".
__webpack_require__.hmrM @ webpack.js:1367
Promise.then
hotCheck @ webpack.js:553
tryApplyUpdatesWebpack @ webpack-internal:///…oader-client.js:132
handleHotUpdate @ webpack-internal:///…oader-client.js:170
processMessage @ webpack-internal:///…oader-client.js:249
handler @ webpack-internal:///…oader-client.js:473
 [Fast Refresh] done in 7023ms
 Fetch finished loading: GET "http://localhost:3000/deep-research?_rsc=1kjzf".
createFetch @ webpack-internal:///…ver-response.js:163
fetchServerResponse @ webpack-internal:///…rver-response.js:98
hmrRefreshReducerImpl @ webpack-internal:///…fresh-reducer.js:34
clientReducer @ webpack-internal:///…outer-reducer.js:41
action @ webpack-internal:///…ter-instance.js:156
runAction @ webpack-internal:///…uter-instance.js:66
dispatchAction @ webpack-internal:///…ter-instance.js:120
dispatch @ webpack-internal:///…ter-instance.js:154
eval @ webpack-internal:///…-action-queue.js:55
startTransition @ webpack-internal:///…development.js:7843
dispatch @ webpack-internal:///…-action-queue.js:54
dispatchAppRouterAction @ webpack-internal:///…-action-queue.js:37
eval @ webpack-internal:///…ter-instance.js:274
exports.startTransition @ webpack-internal:///…development.js:1129
hmrRefresh @ webpack-internal:///…ter-instance.js:273
eval @ webpack-internal:///…oader-client.js:296
exports.startTransition @ webpack-internal:///…development.js:1129
processMessage @ webpack-internal:///…oader-client.js:295
handler @ webpack-internal:///…oader-client.js:473
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 279ms
webpack-internal:///…r.development.js:14 [Violation] 'message' handler took 158ms
