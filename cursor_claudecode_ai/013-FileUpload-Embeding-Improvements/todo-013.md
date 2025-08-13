# TODO 013 — File Upload, Chunking, Storage, and Embeddings

No code changes until approved. This plan improves ingestion quality for all doc+query combos.

## Tasks
1) PDF extraction (layout-aware)
- [ ] Integrate `pdfjs-dist` page walker
- [ ] Group text by Y (line), sort by X; detect column stops (histogram/k-means)
- [ ] Reconstruct tables with separators; keep paragraphs as blocks
- [ ] Remove duplicate anchors/headers/footers; cap token repeats
- [ ] Emit paragraphs and table rows separately

2) Structure-aware chunking
- [ ] Paragraph chunking: 250 words, 50 overlap (configurable)
- [ ] Table chunking: one row per chunk (or small groups)
- [ ] Attach metadata: `page`, `blockType`, `rowIndex`, `colStops`, `xRange`, `yRange`
- [ ] Preserve both `originalText` and `normalizedText`

3) Storage (RxDB)
- [ ] Extend chunk schema with optional metadata fields (backward compatible)
- [ ] Use worker-provided `startIndex/endIndex` when available

4) Embedding model upgrades (browser)
- [ ] Add model selector: `miniLM` (default), `bge-small`, `gte-small`, `mpnet-base`, `bge-base`, `e5-base`
- [ ] Enable WebGPU in worker; warm cache on init
- [ ] Persist storage request (`navigator.storage.persist()`)
- [ ] Re-index flow when model changes (dimension mismatch)

5) Backfill & re-index utilities
- [ ] Script to re-parse PDFs via new extractor
- [ ] Recreate chunks + metadata and re-embed
- [ ] Atomic replace of old docs; verify with sample queries

6) Quality checks
- [ ] Validate that Tyler’s “Progress so far” table rows are preserved and retrievable (top-10)
- [ ] Confirm numeric extraction finds “7.51/4.26/4.01/2.55 hours” from originalText
- [ ] Measure ingest time (≤8s for ≤2MB PDF on mid laptop, excluding first model load)

## Simple checklist
- Completed
  - [ ] Design docs created and approved

- In Progress
  - [ ] N/A

- Not Started
  - [ ] PDF extractor implementation (pdfjs-dist)
  - [ ] Structure-aware chunker
  - [ ] RxDB metadata extension
  - [ ] Embedding selector + cache/persist
  - [ ] Backfill/re-index utility
  - [ ] Quality validation on Tyler blog



# Simple todo list