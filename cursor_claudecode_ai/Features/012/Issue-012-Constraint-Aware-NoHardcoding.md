# Issue 012 — Constraint-Aware, No-Hardcoding Multi-Agent Flow (Small-LLM Friendly)

## Goal
Achieve Claude Code–style orchestration with zero hardcoding across any document + query combo, while minimizing LLM calls. Derive constraints from the query (source/author/domain/type), deterministically gate documents by metadata, and keep extraction strictly content-grounded.

## Why
- LLM-only relevance can mark unrelated docs as relevant when queries specify a source.
- Generic patterns dilute extraction vs doc-grounded terms.
- Small models need fewer, higher-value calls.

## Principles
- No hardcoding: no fixed filename/domain lists or keyword heuristics.
- Constraint-first: extract dynamic constraints once; enforce deterministically.
- Content-grounded: patterns/filters come from document content + query, not fallbacks.
- Budget-aware: target ~3–6 LLM calls; prefer deterministic/cached steps.

## Design (High Level)
1) Query Constraint Extraction (1 LLM call, cached)
- Extract expected owner/author, domain candidates, doc type, strictness (must/should), key entities.
- Save into `context.sharedKnowledge.queryConstraints`.

2) Deterministic Prefilter (0 LLM)
- If constraints contain source/domain/title hints, filter candidates by metadata match. If none match, allow all with low-confidence flag and permit one fallback ranking call.

3) Synopsis + Batched Ranking (≤1 LLM)
- Build deterministic synopsis per candidate (title + top-N sentences + top-k overlap with query terms).
- Rank all synopses in a single LLM call; pick top-K that satisfy constraints. Cache by (docId, queryHash).

4) PlanningAgent Strategy From Context (0 LLM)
- Use `documentContext.documentType` and `intelligentExpectations.expectedAnswerType`.
- Include `queryConstraints` and `mainContribution` in categories/targets.

5) PatternGenerator with RxDB Augmentation (0 LLM)
- Use grounded terms (methods, acronyms, names, metrics) only.
- Constrained semantic search in RxDB per term (respect constraints, small topK, dedupe, threshold by specificity). Cap additions (≤10), mark as `augmented`.
- Generate patterns only from selected/augmented terms; no generic fallbacks.

6) DataAnalysisAgent Uses Expectations (0 LLM)
- Read `intelligentExpectations.expectedAnswerType` for intent; keep context-relevance boosting for main contribution and method-intro phrasing.

7) Orchestrator Budget + Guardrails (save calls)
- Include `queryConstraints` in master prompt; set per-query budget (~5). Skip extra QA when constraints satisfied and extraction coverage is met.

8) Deterministic Post-Filter (0 LLM)
- Remove extracted items violating `queryConstraints` (source/domain/title mismatch).

9) Caching
- Cache synopses, ranking, augmentation ids for reuse on reruns.

## Expected Call Budget
- 1: Constraints
- 1: Batched ranking (skip if obvious single match)
- 1: Planning
- 1: Pattern alignment
- 1: Synthesis
Total: 3–5 typical.

## Test Scenario
- Two docs (resume + target blog), query “best speed run from <author>'s blog”.
  - Constraints identify the blog → prefilter excludes resume
  - Ranking selects blog
  - Patterns target names/times in blog
  - Extraction items from blog only; post-filter enforces constraints
  - Synthesis cites correct source

## Risks & Mitigations
- Over-strict constraints when metadata sparse → allow one fallback ranking pass.
- Pattern overfitting → multiple grounded terms + augmentation.

## Approval
Proceed with TODO in `todo-012.md` upon approval. No code changes yet.
