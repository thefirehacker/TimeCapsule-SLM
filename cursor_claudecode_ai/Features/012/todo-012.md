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

7) Orchestrator budget + guardrails
- Include `queryConstraints` in master prompt; enforce ~5-call budget
- Skip extra QA when constraints satisfied and extraction coverage achieved

8) Deterministic post-filter
- Drop extracted items whose source violates `queryConstraints`

9) Caching
- Cache synopses, ranking and augmentation ids; reuse on reruns

## Simple Checklist
- Completed
  - [x] Architecture/design docs approved
  - [x] Implement query constraint extraction and context storage
  - [x] Add deterministic prefilter with fallback path prep (will be used by ranking)

- Not Started
  - [ ] Implement synopsis builder and batched ranking
  - [ ] Align PlanningAgent strategy with context/expectations
  - [ ] Add PatternGenerator RxDB augmentation (capped, constrained)
  - [ ] Switch DataAnalysisAgent intent to expectations
  - [ ] Orchestrator call budget and guardrails
  - [ ] Deterministic post-filter
  - [ ] Caching layer (synopsis/ranking/augmentation)
