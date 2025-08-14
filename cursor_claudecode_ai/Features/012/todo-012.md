# TODO 012 — Constraint-Aware, No-Hardcoding Multi-Agent Flow

No code changes until approved. This plan is source-agnostic and works for any doc+query combo.

## What’s already working (verified)
- Orchestrator supports plan-aware sequencing and reruns
- PlanningAgent produces `documentContext` and `intelligentExpectations`
- DataInspector extracts document insights; PatternGenerator + Extractor run end-to-end

## Tasks (Design → Implementation)
1) Query constraint extraction (dynamic, cached)
- Extract expected domain/owner/title/doc-type + strictness and key entities from the query
- Store in `context.sharedKnowledge.queryConstraints`

2) Deterministic prefilter
- If constraints present, prefilter candidates by metadata (domain/title/owner) match
- If none match, mark low-confidence and allow one fallback ranking

3) Synopsis + batched ranking (single LLM)
- Build deterministic per-doc synopsis (title + top-N sentences + top-k overlap)
- Rank all synopses at once; select top-K that satisfy constraints
- Cache by (docId, queryHash)

4) Strategy alignment
- Ensure PlanningAgent strategy uses `documentContext.documentType` and `intelligentExpectations.expectedAnswerType`
- Include `queryConstraints` and `mainContribution` in categories/targets

5) PatternGenerator with constrained RxDB augmentation
- Use grounded terms only (methods/acronyms/names/metrics)
- Constrained semantic search (respect constraints, topK 3–5, dedupe, dynamic threshold); cap ≤10 augmented chunks
- Generate patterns only from selected/augmented terms; no generic fallbacks

6) DataAnalysisAgent intent from expectations
- Read `intelligentExpectations.expectedAnswerType` (no placeholder intent)
- Keep context relevance boosting already in place

6a) Deterministic performance pipeline (no hardcoding)
- Intent fallback from query: if the model’s expectations are inconclusive but the query contains ranking language (top/best) AND performance units (hours/tokens/s/B tokens), set `expectedAnswerType='performance_ranking'`.
- Always add numeric/time/table regex families for `performance_ranking`.
- Normalize text and build flexible regex for tokens (handles variants like "Mongo DB" vs "MongoDB").

6b) Deterministic top-3 reducer
- Compute hours and tokens/s from extracted text; pick top-3 (min time primary, max tokens/s secondary) with attribution.

7) Orchestrator budget + guardrails
- Include `queryConstraints` in master prompt; enforce ~5-call budget
- Require extraction before synthesis (no early Synthesis without data)
- Skip extra QA when constraints satisfied and extraction coverage achieved

8) Deterministic post-filter
- Drop extracted items whose source violates `queryConstraints`

9) Caching
- Cache synopses, ranking and augmentation ids; reuse on reruns

10) UX/Observability (no hardcoding)
- Filename/title-first labels; show LLM `mainEntity` as secondary
- Persist verbose agent history (ring buffer + localStorage) with runId/timestamp

11) Workerized Regex Extraction (stability)
- Move extraction loop to a Web Worker; compile regexes once in worker
- Pre-validate pattern set (dedupe, drop trivials <4 chars, cap 64 patterns, reject >200 chars or unsafe constructs)
- Batch execution and progress streaming; cap matches per pattern per chunk (e.g., 200)
- Run on original + normalized text; throttle logs; allow cancel

12) UI/UX — Harmonize banner and improve multi-agent output
- Replace hero gradient banner with a compact, integrated status bar in the `ResearchSteps` header
- Unify header progress pill + inline progress; remove heavy borders/shadows
- Agent cards: add compact meta row (status pill, duration, rerun, copy) and left color stripe per agent type
- Verbose history: timeline layout with latest highlight, sticky toggle, right-aligned timestamps, counts
- Reasoning/Output: monospace toggle, clamp + expand, consistent titles, copy buttons
- Sidebar: minimal status chip + “Start New” button; drop duplicate big banner
- Implement with CSS/TSX only (no logic changes) and preserve existing data bindings

13) Extraction quality after workerization — regression fix (no hardcoding)
- Worker must return both original and normalized matches; include fields: `originalText`, `normalizedText`, `fullMatch`, `pattern`, `description`, `sourceChunkId`, `sourceDocument`
- Pattern sanitization in worker: drop placeholders (e.g., `/pattern\d+/`), reject malformed flags like `/(i)ig`, cap long bodies (>200 chars), and dedupe
- ExtractionAgent: consume worker results; parse numerics strictly from `originalText`; store `originalContext` in `metadata`
- Deterministic performance pipeline: when ranking intent is inferred, always inject duration/throughput/table regex families; allow space-separated decimals (e.g., `7 51` → `7.51`)
- DataAnalysisAgent: boost numeric/time items when `expectedAnswerType='performance_ranking'`; never filter those below threshold; tolerant decimal parsing
- RxDB augmentation: avoid embedding raw numbers; anchor around row labels (e.g., preceding/succeeding tokens) or skip augmentation for purely-numeric probes

14) Evidence-Driven Extraction (zero hardcoding)
- DataInspector: emit `documentInsights.measurements` from real chunk text (numeric hits with ±5-token windows, chunkId; strip brackets/punctuation)
- PatternGenerator: bottom-up induction from measurements → learn decimal style, joiners, adjacent tokens → cluster into learned families → synthesize regex → score (support, consistency, query-window cosine) → sanitize/dedupe → emit
- ExtractionAgent: use learned families as-is (worker already preserves originalContext/normalizedContext)
- DataAnalysisAgent: rank only when evidence threshold met (≥3 in one family or ≥2+1 across families from same source); parse using learned decimal style; do not drop numeric items by query score alone
- ResearchOrchestrator: add minimal evidence gate before Synthesis; if unmet, loop PatternGenerator→Extractor once with learned families or return “insufficient evidence” with citations

15) Semantic Search Improvements (MiniLM-friendly, zero hardcoding)
- Build probes from learned numeric windows (mask digits; use observed joiners/tokens); never query raw numbers
- Multi-probe per family (masked phrase, left/right window phrases, joiner phrase); topK 10–20; threshold schedule 0.35→0.30→0.25 when empty
- Hybrid retrieval: run BM25/keyword in parallel and fuse (RRF); dedupe by docId/chunkId; cap 10–12 augmented chunks
- Rerank retrieved chunks by overlap with the family’s learned window tokens (bag-of-words cosine)
- Constraint-aware gating on augmented chunks using existing owner/title/domain constraints

16) Planner-Aligned Orchestration & Rerun Policy
- Evidence gate: block Synthesis until minimal numeric evidence exists (≥2 items). If unmet, route Planner → PatternGenerator → Extractor loop once; else return "insufficient evidence."
- Context-aware reruns: permit PatternGenerator/Extractor/DataAnalyzer reruns when input signatures change (patternsHash/chunksHash/measurementsHash) or quality=insufficient; cap at ≤2 cycles.
- Replace agent-name duplicate check with same-agent-same-input guard.
- Planner enforcement: when Planner proposes required next steps, validation must defer Synthesis until they complete.
- Early-stop on no-eligible-next-step to avoid max-iteration churn.

17) PlanningAgent Intelligent Override System (zero hardcoding)
- Query intent override: detect performance queries ("top N", "best", "fastest") + units ("hours", "tokens/s") → force `expectedAnswerType='performance_ranking'` regardless of DataInspector analysis
- Entity validation: cross-check DataInspector's "main contribution" against query context; recognize when extracted "methods" are actually people names
- Strategy correction: when DataInspector misclassifies (e.g., "Keller Jordan" as method instead of person), create corrective categories focusing on actual query targets (time metrics, not names)
- Document type override: intelligent re-classification when DataInspector analysis conflicts with query evidence (blog vs research paper detection)

18) Chunk Expansion for Downstream Agents (zero hardcoding) 
- Post-DataInspector expansion: after document approval, fetch ALL chunks from approved documents for downstream processing
- Sampling efficiency: keep DataInspector's 30% sampling for fast relevance decisions, but provide complete data to PatternGenerator/Extractor
- Dynamic chunk retrieval: expand from approved document IDs using vectorStore.getAllChunks() with document filtering
- Backward compatibility: fallback to sampled chunks if expansion fails

## Simple Checklist
- Completed
  - [x] Architecture/design docs approved
  - [x] Implement query constraint extraction and context storage
  - [x] Add deterministic prefilter with fallback path prep (will be used by ranking)
  - [x] Implement synopsis builder and batched ranking
  - [x] Restore deterministic chunk sampling (≥30% or ≥5) before orchestration
  - [x] Orchestrator guardrail: synthesis requires extraction output
  - [x] Chunk Expansion for Downstream Agents (Orchestrator.expandToFullDocumentChunks implemented)

- Not Started
  - [x] Align PlanningAgent strategy with context/expectations
  - [x] PlanningAgent Intelligent Override System (query intent override, entity validation, strategy correction)
  - [ ] Add PatternGenerator RxDB augmentation (capped, constrained)
  - [ ] Deterministic performance pipeline (intent fallback, guaranteed numeric patterns, normalized matching)
  - [ ] Deterministic top-3 reducer in DataAnalysisAgent
  - [ ] Orchestrator call budget
  - [ ] Deterministic post-filter
  - [ ] Caching layer (synopsis/ranking/augmentation)
  - [ ] UX: filename-first labels + entity secondary; persist agent history across runs
  - [ ] Workerized regex extraction with pattern sanitization and batching
  - [ ] Evidence-Driven Extraction (DataInspector emit → PatternGenerator induction → Evidence gate)
  - [ ] Semantic Search Improvements (learned-window probes, hybrid, rerank)
  - [ ] Planner-Aligned Orchestration & Rerun Policy (evidence gate, context-aware reruns)

- In Progress
  - [ ] Evidence-Driven Extraction — PatternGenerator bottom-up induction (implemented); DataAnalysis evidence-triggered ranking (implemented); Synthesis evidence-gate helper (added); DataInspector measurements emit (pending)
  - [ ] Semantic Search Improvements — design captured (probes from learned windows, hybrid, rerank); implementation pending

## Recent Updates (Zero Hardcoding)
- **Chunk Expansion**: After DataInspector identifies relevant documents, system now fetches ALL chunks from approved documents for downstream agents (PatternGenerator, Extractor) while keeping DataInspector's efficient sampling for relevance decisions
- **PlanningAgent Override Framework**: Designed intelligent override system where PlanningAgent can correct DataInspector misclassifications (e.g., "Keller Jordan" as method → person) and ensure proper query intent classification (performance ranking vs general info)
- **Evidence-Driven Pattern Focus**: System now prioritizes numeric measurement patterns over generic text patterns when evidence supports performance queries
