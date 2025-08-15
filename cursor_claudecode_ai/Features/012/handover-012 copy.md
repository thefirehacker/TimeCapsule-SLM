# Handover — Feature 012: Constraint-Aware, No-Hardcoding Multi‑Agent Flow (Small‑LLM Friendly)

This note equips any agent to continue/complete Issue 012 using only the docs and code in this repo. It summarizes intent, what’s implemented, what remains, how to verify, and where to change code.

## 1) Mission and Constraints
- Objective: Achieve Claude Code–style multi‑agent research with zero hardcoding across any doc+query. Minimize LLM calls; prefer deterministic, cached, and document‑grounded steps.
- Non‑negotiables:
  - No hardcoded filenames, domains, units, or keyword lists.
  - Evidence‑driven extraction and synthesis; numeric facts must come from document text, not reasoning strings.
  - Small‑LLM friendly: keep calls lean; robust to malformed JSON.

Authoritative docs
- `cursor_claudecode_ai/Features/012/Issue-012-Constraint-Aware-NoHardcoding.md`
- `cursor_claudecode_ai/Features/012/todo-012.md`

## 2) Current Implementation Snapshot
Key files already modified/added:
- `src/lib/multi-agent/agents/PatternGeneratorAgent.ts`
  - Bottom‑up induction: harvest numbers from chunk text; learn decimal style and nearby tokens; synthesize “learned families” as regex; append to `context.patterns`.
- `src/lib/multi-agent/agents/ExtractionAgent.ts`
  - Uses regex worker; preserves `originalContext`/`normalizedContext` in metadata.
- `public/workers/regexExtractionWorker.js`
  - Sanitizes patterns; compiles once; returns both original and normalized matches.
- `src/lib/multi-agent/agents/DataAnalysisAgent.ts`
  - Evidence‑triggered ranking; tolerant decimal parsing (e.g., `7 51 → 7.51`).
- `src/lib/ResearchOrchestrator.ts`
  - Helper `hasMinimalNumericEvidence(context)` added (wiring pending).

What this solved
- UI stalls during extraction (workerized), persisted progress history, numeric parsing based on original context.

## 3) Designs to Follow (from Issue 012)
### A) Evidence‑Driven Extraction (Zero Hardcoding)
- DataInspector → emit `sharedKnowledge.documentInsights.measurements` from chunk text: numeric token + ±5 tokens left/right + `chunkId` (strip brackets/punctuation).
- PatternGenerator → use those measurements to synthesize regex families from observed tokens/joiners and learned decimal style. No vocab lists.
- Extractor → run worker with learned families; keep original contexts.
- DataAnalysis → rank when evidence threshold is met (≥3 in one family or ≥2+1 across families from same source). Do not drop numeric items solely by query score.
- Orchestrator → block Synthesis until minimal numeric evidence exists; if unmet, loop PatternGenerator→Extractor once; else return “insufficient evidence” with citations.

### B) Semantic Search Improvements (MiniLM‑friendly)
- Build probes from learned windows (mask digits; use observed joiners/tokens). Never query raw numbers.
- Multi‑probe per family (masked phrase; left/right window phrases; explicit joiner phrase).
- Retrieval: topK 10–20; threshold schedule 0.35→0.30→0.25 only when empty.
- Hybrid: run BM25 alongside embeddings; fuse with RRF; dedupe by doc/chunk; cap 10–12 augmented chunks.
- Rerank by overlap with the family’s learned window tokens; apply owner/title/domain constraints before accepting.

### C) Planner‑Aligned Orchestration & Rerun Policy
- Replace name‑based duplicate check with same‑agent‑same‑input guard. Maintain input signatures (`patternsHash`, `chunksHash`, `measurementsHash`).
- Permit bounded reruns (≤2) for PatternGenerator/Extractor/DataAnalyzer when inputs changed or quality=insufficient.
- Enforce Planner “required next steps” and block Synthesis until they complete and evidence exists.
- Early‑stop with “insufficient evidence” if no eligible next step to avoid max‑iteration churn.

## 4) Outstanding Work (implement next)
1) DataInspector: emit measurements (from chunk text).
2) Wire Orchestrator evidence gate to Synthesis; one retry loop with learned families.
3) Context‑aware rerun policy and input signatures; cap reruns.
4) Semantic search probes from learned windows + hybrid + rerank + constraint gate.

## 5) Simple Checklist (synced with TODO)
- Completed: architecture, constraints, prefilter, synopsis+ranking, chunk sampling, synthesis requires extraction output.
- In Progress: evidence‑driven extraction (induction + analysis in), DataInspector emit + wiring pending; semantic search improvements pending.
- Not Started: planner‑aligned rerun policy (guard replacement, caps, enforcement).

## 6) Acceptance Criteria
- For Tyler blog query, extract ≥2 numeric measures from chunk text (e.g., `7.51 hours`, `4.26 hours`) and produce a ranked top‑3 with citations. If absent, return “insufficient evidence”.
- Synthesis never runs without numeric evidence for performance‑style queries.
- Reruns happen only on input change or quality signal and are bounded.

## 7) Test Plan (manual)
- Positive: expect numeric extraction → ranking → cited answer.
- Negative: remove numeric spans → “insufficient evidence” + citations; no generic “top 3 words”.

## 8) References (code hotspots)
- Induction: `src/lib/multi-agent/agents/PatternGeneratorAgent.ts` (method: `inducePatternsFromDocument`)
- Worker: `public/workers/regexExtractionWorker.js`
- Extraction: `src/lib/multi-agent/agents/ExtractionAgent.ts`
- Analysis: `src/lib/multi-agent/agents/DataAnalysisAgent.ts`
- Orchestrator: `src/lib/ResearchOrchestrator.ts`

## 9) Risks & Mitigations
- Sparse numerics → answer “insufficient evidence” instead of hallucinating.
- Over‑augmentation → cap, constraint‑gate, rerank by family fit.
- Loop churn → bounded reruns + early stop.

## 10) One‑look Summary
- Learn patterns from the document; extract with worker; parse original text; prove numeric evidence; rank only with evidence; block synthesis until evidence; let Planner re‑run pattern→extract once when inputs change; augment search with learned‑window probes and hybrid retrieval.
