# Issue 013 — File Upload, Chunking, Storage, and Embeddings Improvements (Browser-first, Zero-Hardcoding)

## Goal
Make document ingestion reliable and high-signal for small-LLM research by:
- Preserving structure when parsing PDFs and DOCX files (tables, rows, columns) instead of flattened text
- **Adding semantic structural markers** (`<START_TABLE>`, `<TABLE_ROW>`, `<START_SECTION>`, etc.) **to improve agent understanding**
- Chunking by content blocks with metadata (page, blockType, row/col) rather than blind word windows
- **Making multi-agent systems structurally aware** for better reasoning and extraction
- Storing richer chunk metadata in RxDB for downstream agents (PatternGenerator, Extractor, DataInspector)
- Upgrading browser embeddings to stronger models while keeping load-time reasonable and cache-persistent
- Keeping the whole flow source-agnostic (no hardcoded filenames) and aligned with Issue-012 constraints

## Why (current pain)
- PDF tables flatten (e.g., "4.01 hours3.15B218k2025/02/23"), losing separators → numeric extraction fails
- **DOCX files processed as binary garbage** instead of structured text extraction
- Noisy repeated anchors ("herehere…") pollute chunks and similarity
- Chunking ignores page/row boundaries; semantic search retrieves weak slices
- **Agents lack structural context** for effective reasoning about document organization
- **No semantic markers** to help agents understand table boundaries, sections, lists, etc.
- ~~all-MiniLM-L6-v2 (384d) is fast (≈27 MB) but underperforms BGE/GTE families~~ **RESOLVED: Upgraded to bge-small-en-v1.5** ✅

## Scope
- In-browser pipeline only (Transformers.js, RxDB)
- **PDF and DOCX parsing** → structural reconstruction → **semantic marker insertion** → chunking → embeddings → storage
- **Multi-agent system enhancement** to recognize and utilize structural markers
- Backfill/re-index utility for existing documents affected by structural issues

## Non-goals
- Server-side vector DB migration
- Changing agent logic (covered in Issue-012). This issue only improves data quality at ingestion

## Design Overview
1) PDF Extraction (layout-aware with structural markers)
- Replace `pdf2json` raw text with `pdfjs-dist` page walker
- Collect text items with x/y; group lines by Y tolerance; sort by X
- Detect column stops across lines (k-means or histogram of X positions)
- Reconstruct rows; insert separators (tab or ` | `) to preserve table structure
- **Insert semantic structural markers during extraction:**
  - `<START_TABLE>` / `<END_TABLE>` around detected table regions
  - `<TABLE_ROW>` for individual table rows with data
  - `<START_SECTION:title>` / `<END_SECTION>` for document sections
  - `<START_PARAGRAPH>` / `<END_PARAGRAPH>` for text blocks
  - `<START_MEASUREMENT_DATA>` / `<END_MEASUREMENT_DATA>` for numeric clusters
- Emit two streams per page: paragraphs (joined lines) and tables (row arrays) with embedded markers
- Hygiene: strip duplicate anchors, page headers/footers, and excessive repeated tokens

1b) DOCX Extraction (structure-aware with markers) **NEW**
- Use `mammoth.js` for proper DOCX text extraction from document.xml
- Parse DOCX internal structure to identify tables, headers, lists, paragraphs
- Extract table data with proper cell boundaries and row structure
- **Insert structural markers during DOCX processing:**
  - `<START_TABLE>` / `<END_TABLE>` around DOCX table elements
  - `<TABLE_HEADER>` / `<TABLE_ROW>` for table headers and data rows
  - `<START_LIST>` / `<END_LIST>` / `<LIST_ITEM>` for list structures
  - `<START_SECTION:title>` / `<END_SECTION>` for document headers
- Preserve original formatting while adding structural context

2) Structure-aware Chunking (marker-enhanced)
- **Respect structural marker boundaries** - never split across `<START_TABLE>` / `<END_TABLE>` pairs
- Do not split across tables; emit one row per chunk (or small row groups)
- Paragraph blocks chunked with 250 words, 50-word overlap (config)
- **Preserve structural markers within chunks** to maintain context across boundaries
- **Marker-aware chunk boundaries** that respect document structure
- Attach metadata to each chunk: `{ page, blockType: 'paragraph'|'table', rowIndex, colStops, xRange, yRange, structuralMarkers: ['TABLE_ROW', 'START_SECTION'] }`
- Keep original and normalized text with embedded markers; never mutate decimals in original text

3) Storage (RxDB)
- Preserve chunk metadata in `documents.chunks[].metadata`
- Keep current schema backward compatible by adding optional fields only
- Stop using approximate `startIndex`; keep worker-calculated `startIndex/endIndex` when available

4) Embeddings (browser, Transformers.js) ✅ **UPGRADED TO BGE-SMALL**
- ~~Default remains small~~ **Current production model: `Xenova/bge-small-en-v1.5` (384d, ~55–75MB)** ✅
- ~~Baseline: `Xenova/all-MiniLM-L6-v2` (384d, ~27MB)~~ **DEPRECATED** 
- **Active:** `Xenova/bge-small-en-v1.5` (384d, ~55–75MB) — better quality; use `query:` prefix ✅
- Alternative options if needed: `Xenova/gte-small` (384d, ~60–85MB) — strong, prefixes optional
- Mid options (heavier, 768d): `Xenova/all-mpnet-base-v2`, `Xenova/bge-base-en-v1.5`, `Xenova/e5-base-v2`
- WebGPU if available; cache persists in IndexedDB (Transformers.js cache)
- **Migration completed** - all new uploads use bge-small-en-v1.5 automatically ✅

5) Caching & Persistence
- First run warms model cache in the embedding worker
- Call `navigator.storage.persist()` once to reduce browser eviction risk
- Optionally host model files locally (env.allowLocalModels + local path)

5a) Build-time Model Bundling (NEW - Recommended Approach)
- Bundle embedding model (37MB) directly in Next.js build for zero-latency access
- Store model files in `public/models/bge-small-en-v1.5/` directory
- Lazy load on first document upload (not on app start)
- Use IndexedDB for persistent storage after first load from bundle
- Benefits:
  - No CDN download wait (instant availability)
  - Works offline from first use
  - Tab-independent processing (model persists in IndexedDB)
  - Only 3.7% build size increase (37MB on 1GB build)
  - Browser caches static assets automatically
- Implementation:
  - Download model from Hugging Face to public/models/
  - Configure Transformers.js to use local path
  - Store in IndexedDB after first load for worker access
  - Web workers can process documents even if tab closes

6) Multi-Agent System Integration (structural marker awareness) **NEW**
- **Update all agent prompts** to recognize and utilize structural markers
- **Enhance DataInspectorAgent** to identify structural patterns and report document organization
- **Modify ChunkSelectorAgent** to use structural markers for improved semantic search targeting
- **Update ExtractionAgent** to leverage structural context for better pattern recognition
- **Enhance PlanningAgent** with structural awareness for better strategy formation
- **Add structural metadata to ResearchContext interface** to pass structure information between agents
- **Enable structure-aware reasoning** across the entire multi-agent pipeline

7) Backfill & Re-index (enhanced with structural processing)
- CLI/utility to:
  - Re-parse PDFs and DOCX files using new structure-aware extractors
  - Recreate structure-aware chunks with embedded markers and enhanced metadata
  - Re-embed using selected model with structural context
  - **Update agent knowledge bases** with structural marker understanding
  - Replace old documents atomically (new docId + alias map) to avoid UI flicker

## Acceptance Criteria
- Tables preserved: rows like `"<TABLE_ROW>7.51 hours | 5.07B | 188k | 2025/01/18 | …</TABLE_ROW>"` appear in chunks
- **Structural markers present** in extracted content and preserved across chunking
- **DOCX table extraction** works with proper cell separation and structural markers
- Numeric patterns match from originalText without failure due to delimiter loss
- Chunk metadata present (`page`, `blockType`, `rowIndex`, `structuralMarkers` when applicable)
- **Agents demonstrate improved reasoning** when processing structurally-marked content
- **Multi-agent system recognizes and utilizes** structural markers in prompts and analysis
- Embedding switch works behind a feature flag; re-index flow available
- Ingest time (PDF/DOCX≤2MB): ≤8s on mid laptop; first model load excluded
- Search quality: Tyler blog "top 3 speed runs" retrieves the table rows within top-10 chunks with structural context

## Risks & Mitigations
- Heavier models increase cold-start: prefer `bge-small`/`gte-small`, warm cache, enable WebGPU
- Incorrect column detection on complex layouts: fall back to line-joined with large-gap separators
- Browser storage eviction: request persistent storage; keep models and RxDB sizes in check
- Build size increase (37MB): Minimal impact (3.7% on 1GB build), justified by UX improvements

## Rollout Plan
1. ~~Bundle `bge-small-en-v1.5` model in public/models/ directory~~ **FUTURE OPTIMIZATION** (already works via CDN)
2. ~~Update EmbeddingService to check local bundle before CDN~~ **CURRENT: bge-small-en-v1.5 active** ✅
3. ~~Implement IndexedDB storage layer for model persistence~~ **CURRENT: Transformers.js handles caching** ✅
4. **Implement structural marker system** in PDF and DOCX extractors
5. **Update chunking system** to respect and preserve structural markers
6. **Enhance multi-agent prompts** to recognize structural markers
7. **Add structural metadata** to ResearchContext interface
8. Land extractor and chunker behind an ingest flag (`ingestV2`)
9. Ship embedding selection setting (`miniLM` | `bge-small` | `gte-small` | …)
10. Re-index critical documents (Tyler blog, DOCX files) first; verify structural markers and agent improvements
11. **Test agent reasoning quality** with structurally-enhanced content
12. Migrate existing docs progressively; monitor size/perf

## Open Questions
- Minimum metadata set for agents — do we also need per-cell tokens for tables?
- Preferred default model: `bge-small` vs `gte-small` for English-only usage?
- **Optimal structural marker vocabulary** - should we use XML-style `<START_TABLE>` or custom tokens?
- **Agent prompt integration** - how much structural context should be included in agent reasoning?
- **Cross-chunk marker handling** - how to preserve structural context when chunks span boundaries?
- **DOCX vs PDF marker consistency** - should both file types use identical marker sets?

## Dependencies
- Issue-012 (no-hardcoding) — this issue supplies cleaner, structured inputs for Evidence-Driven Extraction

## Approval
Proceed to implement tasks in `todo-013.md` after review/approval. No code changes yet.

