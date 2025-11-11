## Feature 015 — AI Frames: AI Flow Builder via OpenRouter (ZDR)  

### Context (from codebase)
- AI Frames persists frames/chapters/graph state to a local Knowledge Base (VectorStore) using RxDB + IndexedDB (`src/components/VectorStore/VectorStore.ts`, `UnifiedStorageManager`, `FrameGraphIntegration.syncFrameToKnowledgeBase`).
- Content saved to KB is formatted text plus rich `metadata.attachment` for video/pdf/text attachments; frames are reconstructed from KB on load (`loadFramesFromKnowledgeBase`, `generateFrameContent`).
- PDF parsing is handled via serverless route (`/api/pdf-parser`) and client `PDFParser` class; images may be present inside PDFs but there is no cloud OCR yet (local-first approach dominates).
- No existing OpenRouter integration found; embeddings currently use local transformers (Xenova/all-MiniLM-L6-v2) with semantic search in-browser. This is good for cost/privacy and should remain the default.

### Goal
Enable users (in dark mode UI) to “prompt and build full learning flows” (frames, chapters, attachments, linear order, and optional edges) using AI grounded by the local Knowledge Base, with Zero Data Retention (ZDR) via OpenRouter.

### Provider Strategy (OpenRouter-first, Ollama fallback)
- Default provider: OpenRouter (ZDR enabled on all requests)
- Secondary provider: Ollama (for users preferring local models or offline)
- UX parity: Integration flow mirrors DeepResearch page but defaults to OpenRouter; users can switch provider and model at runtime

### User Scenarios
1) Prompt to Plan Flow  
   - User: “Build a 6-frame crash course on CNNs using my uploaded PDFs.”  
   - System: Retrieves KB snippets → Planner model returns a structured flow (chapters, frames, titles, goals, sequencing).
2) Auto-fill Frame Content  
   - System: For each frame in plan, generate `informationText`, `afterVideoText`, `aiConcepts`, and suggested attachments (video URL or PDF pages) grounded by citations.
3) Vision-grounded Attachment Suggestions  
   - If user attaches images or PDFs with diagrams, vision model extracts key points to inform frame text and concept extraction.
4) Bootstrapped Step‑by‑Step Learning (Explicit Vision)
   - User uploads source material (papers, PDFs, images, links) and prompts:  
     “Help me understand this step by step: start high‑level, then go deep. Do not advance without confirming I understand with a short quiz each step.”
   - System behavior:  
     - Generates a linear sequence of AI Frames that progress from overview → fundamentals → deep‑dive.  
     - Each frame includes a “checkpoint” quiz (1–3 questions).  
     - Advancement is gated by mastery; if incorrect, the system provides a simpler re‑explanation frame and retries.  
     - Vision‑aware: when figures/screenshots are present, explanations and quizzes reference them explicitly (captions/regions).  
     - The session is pausable/resumable; state persists in KB, including quiz history and remediation branches.

### Model Design (OpenRouter with ZDR)
We will route to ZDR-compliant endpoints only. Exact pricing varies per provider; we’ll implement model routing with cost/quality tiers and allow per-request overrides.

Default route (per your selection; users can choose vision/non‑vision):
- `x-ai/grok-4-fast` (non‑vision generalist; fast reasoning/generation)
- `anthropic/claude-sonnet-4.5` (strong reasoning; good planner; vision-enabled)
- `google/gemini-2.5-flash` (vision-first; low-latency multimodal)
- Backup: `openai/gpt-5-mini` (lightweight, cost‑effective generalist)

Vision vs Non‑Vision handling
- Users can explicitly opt for “Vision” or “Text-only” mode in the AI panel.
- Router enforces compatible message payloads:
  - Vision mode accepts images, PDF page renders, thumbnails.
  - Text-only mode strips images and uses KB text snippets only.

Embeddings
- Keep local Xenova embeddings as default for RAG.
- Optional cloud embeddings may be exposed later (behind an advanced toggle).

Why this mix
- Planner needs high reasoning and rigid JSON adherence → Claude Sonnet 4.5.
- Generator needs speed/cost for many frames → Grok‑4‑fast or GPT‑5‑mini.
- Vision over PDFs/images → Gemini 2.5 Flash is the fastest strong VLM.
- Keep embeddings local to preserve offline-first, reduce cost, and maintain latency guarantees.

### Bootstrapped Learning — Explicit Requirements
- Stepwise pedagogy: frames proceed from high‑level summaries to low‑level technical detail.
- Mastery gating: each frame ends with a short quiz; user must pass before advancing.
- Remediation: on incorrect answers, the system inserts one or more “remediation frames” with simpler explanations and a follow‑up quiz.
- Pause/Resume: users can stop any time and resume at the last incomplete frame; prior answers are stored in KB.
- Vision grounding: when images/figures are available, explanations and questions reference specific visual elements (e.g., “see the red box region”).
- Source‑first: all content cites KB chunks and URLs; AI never invents citations.
- User control: AI‑suggested frames are drafts (distinct color); users can accept/decline/edit at any step.

### Integration Approach (no code changes yet)
1) Routing Layer (configuration only at first)
   - Add a model router config with tiers: planner, generator, vision; default order as above.
   - Enforce `{ zdr: true }` in requests; allow per-request `model` override.
   - Provider selection: OpenRouter (default), Ollama (fallback).
2) Prompt Schemas
   - Planner: Returns strict JSON conforming to a minimal schema that maps to `AIFrame` and chapters (IDs, titles, goals, order; plus optional link suggestions). Include citations list referencing KB doc IDs.
   - Generator: Takes one planned frame + retrieved chunks; returns filled `informationText`, `afterVideoText`, `aiConcepts`, and attachment suggestions with rationale + sources.
   - Vision: Accepts image(s)/figure snapshots or PDF page renders; returns key points to merge into generator context.
   - Checkpoint: Produces quiz items (MCQ/short‑answer) with correct answers, explanations, and retry hints; flags “requires_remediation” when mastery < threshold.
3) Grounding with KB (local-first)
   - Reuse VectorStore semantic search to collect top-k chunks per task.
   - Pass citations (doc IDs + spans) to the LLM; require the LLM to echo citations in outputs.
4) Cost Controls
   - Default to Grok‑4‑fast or GPT‑5‑mini for generation (user-selectable).
   - Use Sonnet 4.5 for planning/high‑quality steps.
   - Use Gemini 2.5 Flash for heavy vision asks.
   - Batch frame generations; stream outputs to UI; allow early stop.
5) Privacy
   - ZDR enforced; redact PII via pre-filter (optional); never send raw KB docs, only chunk excerpts.

### Example request shape (OpenRouter)
Note: request body illustrates the ZDR intent; exact client to be added later.

```json
{
  "model": "openai/gpt-4o-mini",
  "zdr": true,
  "messages": [
    {"role":"system","content":"You are an AI flow builder for learning graphs."},
    {"role":"user","content":"Build a 6-frame course on CNNs using the provided excerpts and cite sources."}
  ],
  "temperature": 0.3,
  "response_format": {"type":"json_object"}
}
```

### API Keys, Connect/Disconnect
- Add secure API key inputs for:
  - OpenRouter API Key
  - Firecrawl API Key
- Keys are stored securely (client-side encrypted store or server-secret if proxy is enabled).
- Connect/Disconnect toggles:
  - “Connect AI” enables the routing layer and validates keys.
  - “Disconnect AI” disables outbound calls; local features continue to work.
- Keys management entry point colocated with Knowledge Base card (as in the provided UI).

### UX: AI Build with Accept/Decline (Tab‑completion style)
- AI Build suggestions appear in multi‑view with a distinct color/style.
- Suggested frames/chapters are “drafts” until accepted.
- Users can:
  - Accept one or all suggestions → commit to `frames` and sync to KB.
  - Decline suggestions → discard drafts.
  - Edit existing frames or any AI‑generated frames across turns; the planner/generator accepts existing IDs to update in place.
- Each suggestion carries citations to KB chunks and the model used.
- State handling:
  - Drafts live in a transient store; committing performs merge with conflict-safe rules (preserving attachments and timestamps).

### Acceptance Criteria
- Users can choose “AI Build Flow” (dark mode UI) → returns an editable plan (chapters/frames) with citations.
- “Generate Content” fills selected frames with grounded text and suggested attachments.
- Vision pathway can summarize images/figures from PDFs or uploads to inform frames.
- All calls use ZDR endpoints; costs stay within configured budget tiers.
- Users can add/remove OpenRouter and Firecrawl keys; connect/disconnect AI.
- AI-built frames are visually distinct, reviewable, and accept/decline‑able.
- Users can update any existing or previously AI-built frames in subsequent turns.
- Checkpoint quizzes are generated per frame; advancement requires mastery; remediation path works.
- Sessions are pausable/resumable with saved quiz history and progress indicators.

### Risks & Mitigations
- JSON adherence: use response_format where supported; otherwise add robust validators and self-correction prompts.
- Token bloat: enforce tight retrieval (top-k, max chars), chunk compression before LLM calls.
- Latency: parallelize frame generations; stream to UI; cache partial results.

### Open Questions
- Should we add server-side proxying for OpenRouter (to store keys securely) or keep client-side only?
- Do we want optional cloud embeddings for extremely large corpora, or keep 100% local?


