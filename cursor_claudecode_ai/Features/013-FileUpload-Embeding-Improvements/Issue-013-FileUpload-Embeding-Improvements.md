# Issue 013 — File Upload, Chunking, Storage, and Embeddings Improvements (Browser-first, Zero-Hardcoding)

## Goal
Make document ingestion reliable and high-signal for small-LLM research by:
- Preserving structure when parsing PDFs (tables, rows, columns) instead of flattened text
- Chunking by content blocks with metadata (page, blockType, row/col) rather than blind word windows
- Storing richer chunk metadata in RxDB for downstream agents (PatternGenerator, Extractor, DataInspector)
- Upgrading browser embeddings to stronger models while keeping load-time reasonable and cache-persistent
- Keeping the whole flow source-agnostic (no hardcoded filenames) and aligned with Issue-012 constraints

## Why (current pain)
- PDF tables flatten (e.g., “4.01 hours3.15B218k2025/02/23”), losing separators → numeric extraction fails
- Noisy repeated anchors (“herehere…”) pollute chunks and similarity
- Chunking ignores page/row boundaries; semantic search retrieves weak slices
- all-MiniLM-L6-v2 (384d) is fast (≈27 MB) but underperforms BGE/GTE families; quality ceiling reached on performance queries

## Scope
- In-browser pipeline only (Transformers.js, RxDB)
- PDF parsing → structural reconstruction → chunking → embeddings → storage
- Backfill/re-index utility for existing PDFs affected by flattened tables

## Non-goals
- Server-side vector DB migration
- Changing agent logic (covered in Issue-012). This issue only improves data quality at ingestion

## Design Overview
1) PDF Extraction (layout-aware)
- Replace `pdf2json` raw text with `pdfjs-dist` page walker
- Collect text items with x/y; group lines by Y tolerance; sort by X
- Detect column stops across lines (k-means or histogram of X positions)
- Reconstruct rows; insert separators (tab or ` | `) to preserve table structure
- Emit two streams per page: paragraphs (joined lines) and tables (row arrays)
- Hygiene: strip duplicate anchors, page headers/footers, and excessive repeated tokens

2) Structure-aware Chunking
- Do not split across tables; emit one row per chunk (or small row groups)
- Paragraph blocks chunked with 250 words, 50-word overlap (config)
- Attach metadata to each chunk: `{ page, blockType: 'paragraph'|'table', rowIndex, colStops, xRange, yRange }`
- Keep original and normalized text; never mutate decimals in original text

3) Storage (RxDB)
- Preserve chunk metadata in `documents.chunks[].metadata`
- Keep current schema backward compatible by adding optional fields only
- Stop using approximate `startIndex`; keep worker-calculated `startIndex/endIndex` when available

4) Embeddings (browser, Transformers.js)
- Default remains small, but allow upgrade path:
  - Baseline: `Xenova/all-MiniLM-L6-v2` (384d, ~27MB)
  - Recommended small: `Xenova/bge-small-en-v1.5` (384d, ~55–75MB) — better quality; use `query:` prefix
  - Alternative small: `Xenova/gte-small` (384d, ~60–85MB) — strong, prefixes optional
  - Mid options (heavier, 768d): `Xenova/all-mpnet-base-v2`, `Xenova/bge-base-en-v1.5`, `Xenova/e5-base-v2`
- WebGPU if available; cache persists in IndexedDB (Transformers.js cache)
- Migration note: changing model = new vector dimension → re-embed corpus

5) Caching & Persistence
- First run warms model cache in the embedding worker
- Call `navigator.storage.persist()` once to reduce browser eviction risk
- Optionally host model files locally (env.allowLocalModels + local path)

6) Backfill & Re-index
- CLI/utility to:
  - Re-parse PDFs using the new extractor
  - Recreate structure-aware chunks and metadata
  - Re-embed using selected model
  - Replace old documents atomically (new docId + alias map) to avoid UI flicker

## Acceptance Criteria
- Tables preserved: rows like `"7.51 hours | 5.07B | 188k | 2025/01/18 | …"` appear in chunks
- Numeric patterns match from originalText without failure due to delimiter loss
- Chunk metadata present (`page`, `blockType`, `rowIndex` when table)
- Embedding switch works behind a feature flag; re-index flow available
- Ingest time (PDF≤2MB): ≤8s on mid laptop; first model load excluded
- Search quality: Tyler blog “top 3 speed runs” retrieves the table rows within top-10 chunks

## Risks & Mitigations
- Heavier models increase cold-start: prefer `bge-small`/`gte-small`, warm cache, enable WebGPU
- Incorrect column detection on complex layouts: fall back to line-joined with large-gap separators
- Browser storage eviction: request persistent storage; keep models and RxDB sizes in check

## Rollout Plan
1. Land extractor and chunker behind an ingest flag (`ingestV2`)
2. Ship embedding selection setting (`miniLM` | `bge-small` | `gte-small` | …)
3. Re-index critical PDFs (Tyler blog) first; verify numeric extraction and agent pipeline
4. Migrate existing docs progressively; monitor size/perf

## Open Questions
- Minimum metadata set for agents — do we also need per-cell tokens for tables?
- Preferred default model: `bge-small` vs `gte-small` for English-only usage?

## Dependencies
- Issue-012 (no-hardcoding) — this issue supplies cleaner, structured inputs for Evidence-Driven Extraction

## Approval
Proceed to implement tasks in `todo-013.md` after review/approval. No code changes yet.

