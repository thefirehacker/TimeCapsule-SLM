# TODO 013 — File Upload, Chunking, Storage, and Embeddings

No code changes until approved. This plan improves ingestion quality for all doc+query combos.

## Tasks
1) PDF extraction (layout-aware with structural markers)
- [ ] Integrate `pdfjs-dist` page walker
- [ ] Group text by Y (line), sort by X; detect column stops (histogram/k-means)
- [ ] Reconstruct tables with separators; keep paragraphs as blocks
- [ ] Remove duplicate anchors/headers/footers; cap token repeats
- [ ] Emit paragraphs and table rows separately
- [ ] **NEW: Add structural markers during extraction**
  - [ ] Insert `<START_TABLE>` / `<END_TABLE>` around detected tables
  - [ ] Add `<TABLE_ROW>` markers for individual table rows
  - [ ] Wrap sections with `<START_SECTION:title>` / `<END_SECTION>`
  - [ ] Mark paragraphs with `<START_PARAGRAPH>` / `<END_PARAGRAPH>`
  - [ ] Add `<START_MEASUREMENT_DATA>` for numeric data clusters

1b) DOCX extraction (structure-aware with markers) **NEW ADDITION**
- [ ] Integrate `mammoth.js` for proper DOCX text extraction
- [ ] Detect table structures in DOCX using document.xml analysis
- [ ] Extract table rows and cells with proper separators
- [ ] Identify headers, paragraphs, and lists from DOCX structure
- [ ] **Add structural markers during DOCX extraction**
  - [ ] Insert `<START_TABLE>` / `<END_TABLE>` around DOCX tables
  - [ ] Add `<TABLE_HEADER>` / `<TABLE_ROW>` markers for table elements
  - [ ] Mark lists with `<START_LIST>` / `<END_LIST>` / `<LIST_ITEM>`
  - [ ] Wrap headers with `<START_SECTION:title>` / `<END_SECTION>`
  - [ ] Add `<START_PARAGRAPH>` / `<END_PARAGRAPH>` for text blocks

2) Structure-aware chunking (marker-enhanced)
- [ ] Paragraph chunking: 250 words, 50 overlap (configurable)
- [ ] Table chunking: one row per chunk (or small groups)
- [ ] **Structural marker preservation across chunk boundaries**
- [ ] **Marker-aware chunking that respects structural boundaries**
- [ ] Attach metadata: `page`, `blockType`, `rowIndex`, `colStops`, `xRange`, `yRange`, `structuralMarkers`
- [ ] Preserve both `originalText` and `normalizedText` with embedded markers

3) Storage (RxDB)
- [ ] Extend chunk schema with optional metadata fields (backward compatible)
- [ ] Use worker-provided `startIndex/endIndex` when available

4) Embedding model upgrades (browser) ✅ **COMPLETED - BGE-SMALL ACTIVE**
- [x] ✅ **PRODUCTION:** Upgraded to `Xenova/bge-small-en-v1.5` (better semantic understanding) 
- [x] ✅ Enhanced hybrid search (semantic + keyword matching) 
- [x] ✅ Quality filtering eliminates "useless search elements"
- [x] ✅ Adaptive thresholding based on query complexity
- [x] ✅ **All new KB uploads use bge-small-en-v1.5 automatically** 
- [x] ✅ **Transformers.js automatic model caching active**
- [ ] Add model selector UI (optional future enhancement)
- [ ] Enable WebGPU in worker; warm cache on init (optional optimization)
- [ ] Persist storage request (`navigator.storage.persist()`) (nice-to-have)
- [ ] Re-index flow when model changes (will be handled in backfill utility)

4a) Build-time Model Bundling (**OPTIONAL OPTIMIZATION** - bge-small working via CDN) ✅ 
- [ ] **OPTIONAL:** Download bge-small-en-v1.5 model files from Hugging Face (~37MB total) (CDN works fine)
  - [ ] model_quantized.onnx
  - [ ] config.json
  - [ ] tokenizer.json
  - [ ] tokenizer_config.json
- [ ] **OPTIONAL:** Create public/models/bge-small-en-v1.5/ directory structure
- [ ] **OPTIONAL:** Update EmbeddingService.ts to check local bundle first:
  - [ ] Try loading from /models/bge-small-en-v1.5/ path
  - [ ] Fall back to CDN if local not found
  - [ ] Set env.allowLocalModels = true when using bundle
- [x] ✅ **CURRENT:** Transformers.js IndexedDB caching handles model persistence automatically
- [x] ✅ **CURRENT:** Single model instance shared across worker calls
- [x] ✅ **CURRENT:** Model loads on first document upload with progress
- [x] ✅ **CURRENT:** Automatic cache warming for repeat users

**NOTE: Build-time bundling is now optional since bge-small-en-v1.5 works excellently via CDN with automatic caching**

5) Backfill & re-index utilities
- [ ] Script to re-parse PDFs via new extractor
- [ ] Recreate chunks + metadata and re-embed
- [ ] Atomic replace of old docs; verify with sample queries

6) Multi-Agent Integration (structural marker awareness) **NEW ADDITION**
- [ ] **Update agent prompts to recognize structural markers**
- [ ] **Enhance DataInspectorAgent to identify and report structural patterns**
- [ ] **Modify ChunkSelectorAgent to use markers for better semantic search**
- [ ] **Update ExtractionAgent to leverage structure for pattern recognition**
- [ ] **Add structural metadata to ResearchContext interface**
- [ ] **Enable structure-aware reasoning and extraction across all agents**

7) Quality checks (enhanced with structural validation)
- [ ] Validate that Tyler's "Progress so far" table rows are preserved and retrievable (top-10)
- [ ] Confirm numeric extraction finds "7.51/4.26/4.01/2.55 hours" from originalText
- [ ] **Verify structural markers are preserved in chunks and recognized by agents**
- [ ] **Test table detection accuracy on both PDF and DOCX files**
- [ ] **Validate agent reasoning improves with structural context**
- [ ] Measure ingest time (≤8s for ≤2MB PDF on mid laptop, excluding first model load)

## Simple checklist
- ✅ Completed
  - [x] Design docs created and approved
  - [x] ✅ Embedding model upgrade to bge-small-en-v1.5
  - [x] ✅ Enhanced semantic search with hybrid approach
  - [x] ✅ Quality filtering for PatternGenerator improvements

- 🔄 In Progress
  - [ ] Build-time model bundling (HIGH PRIORITY - NEW)
  - [ ] PDF extractor implementation (pdfjs-dist) - SECOND PRIORITY
  - [ ] **Structural markers implementation (HIGH PRIORITY - NEW)**
  
- Not Started
  - [ ] IndexedDB model storage layer
  - [ ] Structure-aware chunker with marker support
  - [ ] **DOCX table detection and structural markers (NEW)**
  - [ ] RxDB metadata extension
  - [ ] **Multi-agent structural marker awareness (NEW)**
  - [ ] Backfill/re-index utility
  - [ ] Quality validation on Tyler blog with structural validation



# Simple todo list