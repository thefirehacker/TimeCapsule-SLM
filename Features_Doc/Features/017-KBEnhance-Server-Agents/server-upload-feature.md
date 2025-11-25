# Feature: Server-Side Document Upload & Lazy Embeddings

## Status Snapshot
- **Done**: shared chunking/sanitization helpers, server embeddings adapter, `/api/kb/upload`, client import hook, bundled `bge-small-en-v1.5` + ONNX WASM assets, and original asset persistence via `OriginalAssetStore`.
- **In Progress**: server-only ingestion QA (chunk integrity + RxDB schema compliance), lazy loading toggle for embeddings on AI Frames, and DataInspector throttling fixes for OpenRouter-class models.
- **Next**: 
  1. Map stored chunks ↔ original asset offsets so KB viewers can open the exact PDF/DOCX span.
  2. Persist image assets + OCR metadata to allow AI Frames attachments from KB entries (PDF diagrams, slides, etc.).
  3. Add OCR+diagram enrichment during upload when a remote LLM (OpenRouter/Ollama) is configured.
  4. Agent reliability pass: enforce PatternGenerator → (optional WebSearch) → Extraction → Synthesis ordering, upgrade DataInspector heuristics for large-context models, and redesign SynthesisCoordinator output templates specifically for AI Frames (lesson plans, frame nodes, rubric).

Tracking this explicitly prevents us from regressing on the agent flow items we already discussed.

## Goals
1. Run PDF/DOCX/text parsing, chunking, and embedding generation on the server so the browser no longer needs to stay open.
2. Bundle or lazily load embedding weights outside the browser to reduce first-load friction.
3. Provide an API endpoint the client can call, while still inserting results into the existing VectorStore for offline workflows.
4. Extend KB storage so we can surface original sources (files + page previews) and downstream AI Frames can attach any asset (text, image, PDF) from the KB picker.

## Task Breakdown
### Phase 1 – Foundation
- [x] Extract reusable sanitization & chunking helpers from the worker into shared modules.
- [x] Create a server-side embedding helper that uses `@xenova/transformers` in Node.
- [x] Implement `ingestDocumentBuffer()` that accepts `{ buffer, filename, mimeType, documentType }` and returns `{ metadata, chunks, vectors }`.
- [x] Bundle `bge-small-en-v1.5` + ONNX runtime assets under `public/` and point Xenova to those files.

### Phase 2 – API Surface
- [x] Add `POST /api/kb/upload` (multipart) that:
  - Validates the uploaded file,
  - Uses `ingestDocumentBuffer` to process,
  - Returns the processed document payload.
- [x] Emit actionable errors (type, status) so the client can surface failure states cleanly.

### Phase 3 – Client Integration
- [x] Update `useDocuments.handleFileUpload` to call the new API instead of running the worker locally.
- [x] Add `vectorStore.importProcessedDocument` to insert the returned payload (and persist the original file via `OriginalAssetStore`).
- [x] Refresh document lists after insertion; show progress UI during server processing.

### Phase 4 – Follow-ups
- [ ] Wire the upload endpoint into a background queue with resumable polling (upload continues after tab closes).
- [ ] Expose server-side search + similarity endpoints (KB search from other clients, CLI, agents).
- [ ] Persist and surface original binary assets + preview images for every chunk so AI Frames can deep-link into sources.
- [ ] Attach OCR/image metadata for diagrams & screenshot blocks (store as chunk markers) and allow selecting those assets inside frame builder.
- [ ] Introduce OCR-only ingestion path for pure-image uploads (flow builder camera, screenshot uploads).

## Agent Reliability Checklist
- [ ] **DataInspector (large models)**: add adaptive windowing + stage-level timeout guard so Sonnet/Grok class models finish quickly; ensure extraction output stays structured.
- [ ] **PatternGenerator enforcement**: gate downstream agents until PatternGenerator succeeds; surface “plan-aware sequencing violation” with remediation.
- [ ] **SynthesisCoordinator redesign**: create AI-Frames-specific template (frame tree + lesson plan) instead of essay-style summary.
- [ ] **OpenRouter defaults**: audit prompts/system instructions so large models automatically use KB retrieval + new chunk metadata.

Tracking this issue ensures we ship a fully server-backed upload flow in incremental, testable steps while keeping the agent improvements visible.


# onnxruntime-web assets
curl -L "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm.wasm" -o public/onnxruntime-web/ort-wasm.wasm
curl -L "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm-simd.wasm" -o public/onnxruntime-web/ort-wasm-simd.wasm
curl -L "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm-threaded.wasm" -o public/onnxruntime-web/ort-wasm-threaded.wasm
curl -L "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-wasm-simd-threaded.wasm" -o public/onnxruntime-web/ort-wasm-simd-threaded.wasm
curl -L "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort-web.min.js" -o public/onnxruntime-web/ort-web.min.js
