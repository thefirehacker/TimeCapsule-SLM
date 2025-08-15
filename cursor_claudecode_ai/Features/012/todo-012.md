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
  - [x] **Tool Normalization Intelligence** - Comprehensive wildcard pattern matching for any tool name variation
  - [x] **Workerized Regex Extraction** - Full Web Worker implementation with pattern sanitization and batching
  - [x] **RxDB Augmentation** - Constraint-aware semantic search with grounded terms
  - [x] **Data Loss Prevention** - Enhanced SynthesisCoordinator with flexible data access methods
  - [x] **Loop Prevention** - Emergency completion detection to prevent infinite agent calls
  - [x] **UI Multi-Agent Display Fix** - Fixed progressCallback in useResearch.ts to create single main research step with agent subSteps instead of separate steps for each agent, enabling rich multi-agent UI display
  - [x] **Step Title Detection Enhancement** - Enhanced PerplexityStyleResearch.tsx to detect agent names from step.id (agent_datainspector_timestamp) for proper step titles like "Analyzing Documents" instead of generic "Analyzing Query"
  - [x] **Multi-Agent Progress Integration** - Restructured progress callbacks to populate subSteps with complete agent data including thinking, progress history, metrics, and output for verbose multi-agent process display
  - [x] **🚨 CRITICAL: React State Closure Fix in Progress Callbacks** - Fixed React closure issue where progressCallback couldn't find main step during agent start. Implemented state ref pattern with currentStepsRef to ensure callbacks always read current React state instead of stale closure state. Eliminates "❌ START ERROR: Main step not found for agent 'DataInspector'" error and restores real-time progress updates.
  - [x] **🚨 EMERGENCY: DataInspector Storage & Document Selection Fix** - Fixed critical data storage failure where DataInspector extracted measurements but stored NONE in shared context. Added comprehensive debug logging and document-query alignment to extract speedrun times from Tyler's blog instead of phone numbers from wrong documents. Eliminates "hasMeasurements: false, measurementsLength: 0" issue.
  - [x] **🚨 CRITICAL: JSON Response Sanitization** - Fixed "Bad escaped character in JSON at position 314" errors in PlanningAgent by adding comprehensive JSON escape sequence sanitization. Handles LLM-generated malformed JSON without hardcoded content rules using universal escape fixing patterns.

- Completed Critical Issues
  - [x] **🚨 URGENT: Semantic Entity-Query Alignment** - Fixed both DataInspector and PlanningAgent with semantic reasoning to detect entity ownership mismatch (Tyler's blog ≠ Rutwik's projects)
  - [x] **🚨 CRITICAL: Master Orchestrator Execution Order Bug** - Fixed dependency validation to ensure PatternGenerator runs before Extractor. Added intelligent dependency checking to prevent extraction without patterns.
  - [x] **🚨 URGENT: PatternGenerator Structured Data Extraction Bug** - extractUnitsFromContent() fails on concatenated table formats ("8.13hours6.44B221k"), extracts wrong units ["on", "GPUs", "speedrun"] instead of ["hours", "B", "k"]. System gets "Items with time values: 0" despite perfect table data being available.
  - [x] **🚨 CRITICAL: PlanningAgent → PatternGenerator Priority Routing Bug** - PlanningAgent correctly detects "Query requires numeric data for ranking but DataInspector found no measurements" and sends corrective guidance, but PatternGenerator never receives time_patterns priority to trigger generateTimeSpecificPatterns(). Results in generic patterns `/run time/g` instead of time-specific patterns `/([0-9]+\.[0-9]+)\s*(hours?)/gi`, causing extraction of "run time" instead of "2.55 hours". **FIXED**: Priority string mismatch resolved (session_time_patterns → time_patterns) and currentPriority properly set in shared context.
  - [x] **🚨 CRITICAL: Master LLM Orchestrator Premature Completion** - After ResearchOrchestrator removal, Master LLM completes after only DataInspector runs, skipping PatternGenerator→Extractor→SynthesisCoordinator pipeline. UI shows only DataInspector instead of full multi-agent sequence. **FIXED**: Added performance query detection and mandatory pipeline enforcement for ranking queries.
  - [x] **🚨 NEW: DataInspector Sequencing Violation** - validateAgentExecution throws error when any agent other than DataInspector is called first, breaking orchestration flow. **FIXED**: Changed to warning + automatic redirect to DataInspector when needed.
  - [x] **🚨 CRITICAL: Missing Claude Code-Style Consumption/Replan Logic** - PlanningAgent has consumeAgentResults() method but Orchestrator never calls it after agent execution. **FIXED**: Implemented full consumption/replan loop after each agent execution with specific guidance generation and retry tracking.
  - [x] **🚨 LLM Typo Handling** - LLM outputs "DATAINSPICTOR" (missing 'e') causing normalization failures. **FIXED**: Added comprehensive typo handling for common misspellings.

- Critical Fixes (Emergency) 
  - [x] **FIXED DataInspector entity extraction failure** - Removed confusing "If query doesn't need category, write none" prompt logic
  - [x] **FIXED PlanningAgent corrective strategy not being applied** - Enhanced corrective strategy to overwrite original DataInspector results in shared context
  - [x] **FIXED PatternGenerator table structure extraction failure** - Enhanced deterministic performance patterns with table-aware extraction and dynamic context learning (zero hardcoding)
  - [x] **FIXED DataAnalyzer catastrophic data filtering bug** - Completely bypassed DataAnalyzer agent that was filtering out 100% of relevant extracted items (Project: 28% relevance, Rutwik: 28% relevance for "best project by Rutwik" query)
  - [x] **CRITICAL: Fix Semantic Entity-Query Alignment** - DataInspector and PlanningAgent now use semantic entity-query alignment to detect ownership mismatches (implemented zero-hardcoding semantic validation)
  - [x] **FIXED PatternGenerator Universal Structured Data Extraction** - Enhanced extractUnitsFromContent() with 4-pattern recognition system to handle ANY concatenated table format. Correctly extracts ["hours", "B", "k"] from "8.13hours6.44B221k" using zero-hardcoding approach with intelligent number-letter transition detection.
  
- Not Started
  - [x] Align PlanningAgent strategy with context/expectations
  - [x] PlanningAgent Intelligent Override System (query intent override, entity validation, strategy correction) **FIXED - corrective strategy now properly applied**
  - [x] **PlanningAgent Document Relevance Validation** - Enhanced PlanningAgent to validate DataInspector's document selections using reasoning analysis and semantic validation **COMPLETED**
  - [x] **PatternGenerator Universal Structured Data Extraction** - Enhance extractUnitsFromContent() to handle ANY structured data format (tables, lists, concatenated values) without hardcoding specific units or patterns **COMPLETED**
    - Implemented universal structured data extraction with 4 pattern recognition strategies
    - Pattern 1: Standard spaced format "8.13 hours"
    - Pattern 2: Concatenated format "8.13hours6.44B221k"  
    - Pattern 3: Embedded units "6.44B221k"
    - Pattern 4: Ending units "221k"
    - Intelligent unit splitting with dynamic number-letter transition detection
    - Zero-hardcoding approach: learns from actual document structure
    - Validated: Tyler's data "8.13hours6.44B221k" → correctly extracts ["hours", "B", "k"]
  - [x] **✅ FIXED: Orchestrator Infinite Loop Bug** - Orchestrator changes broke agent execution flow causing infinite loops and "Master LLM reached maximum iterations (15)". System stuck calling SynthesisCoordinator repeatedly instead of progressing through pipeline.
    - **Evidence**: Logs show Master LLM iteration 15, agent status shows completed agents but keeps calling them
    - **Root Cause**: Race condition fixes broke normal agent progression, duplicate execution prevention too aggressive
    - **Impact**: System generates "No answer" due to infinite loop, complete system failure
    - **Fix Applied**: Removed execution locks (`executingAgents`) while preserving retry logic; enhanced completion detection to prevent infinite loops
  - [ ] **PlanningAgent Claude Code-Style Consumption Logic** - After each step, PlanningAgent consumes and validates results; if insufficient quality → replan and re-execute; if good → proceed (no useless fallbacks)
  - [ ] **DataInspector Self-Validation** - Add query-output alignment check where DataInspector validates its own analysis against the query intent
  - [x] **Add PatternGenerator RxDB augmentation (capped, constrained)** - **COMPLETED**
    - Implemented in `applyRxDBAugmentation()` method
    - Uses grounded terms only (methods/concepts/people from document insights)
    - Constraint-aware: respects query constraints (domain/title/owner filters)
    - Capped at ≤10 augmented chunks to prevent bloat
    - Deduplication by chunkId to prevent duplicates
    - No raw number embedding - uses context windows around measurements
  - [ ] Deterministic performance pipeline (intent fallback, guaranteed numeric patterns, normalized matching)
  - [BYPASSED] Deterministic top-3 reducer in DataAnalysisAgent - Agent disabled due to filtering bug, logic moved to SynthesisCoordinator
  - [ ] Deterministic post-filter
  - [ ] Caching layer (synopsis/ranking/augmentation)
  - [ ] UX: filename-first labels + entity secondary; persist agent history across runs
  - [x] **Workerized regex extraction with pattern sanitization and batching** - **COMPLETED** 
    - Implemented in `/public/workers/regexExtractionWorker.js`
    - Pattern sanitization: drops placeholders, rejects malformed flags, caps at 64 patterns
    - Batch processing: processes patterns in batches of 2 to keep worker responsive
    - Progress streaming: real-time progress updates back to main thread
    - Caps: max 200 matches per chunk per pattern
    - Returns both original and normalized text in metadata
  - [x] Evidence-Driven Extraction (DataInspector emit → PatternGenerator induction → Evidence gate) - **COMPLETED: Removed PatternGenerator fallback mode**
  - [x] **URGENT: Fix RegexExtractor tool normalization** - Added RegexExtractor mapping to Orchestrator.normalizeToolName() **COMPLETED**
  - [ ] Semantic Search Improvements (learned-window probes, hybrid, rerank)
  - [ ] Planner-Aligned Orchestration & Rerun Policy (evidence gate, context-aware reruns)

- In Progress
  - [x] Evidence-Driven Extraction — PatternGenerator bottom-up induction (implemented); DataAnalysis evidence-triggered ranking (implemented); Synthesis evidence-gate helper (added); **CRITICAL: Remove fallback mode to enforce zero-hardcoding**
  - [ ] Semantic Search Improvements — design captured (probes from learned windows, hybrid, rerank); implementation pending

- Least Priority (System Works Well Without These)
  - [ ] **Orchestrator call budget** (~5-call budget enforcement) - **LOWEST PRIORITY**
    - System already has natural termination via completion detection
    - Emergency completion prevents infinite loops  
    - Budget control would be optimization, not critical functionality
    - Current system is robust without artificial limits

## Current Critical Analysis: PatternGenerator Priority Routing Bug

### **Evidence from "give top 3 speedrun from Tyler's blog" Query**
- **PlanningAgent Detection**: ✅ Correctly identifies "Query requires numeric data for ranking but DataInspector found no measurements"
- **Corrective Guidance**: ✅ Creates guidance "Enhance document analysis to extract numeric measurements like 'hours', 'minutes'"
- **Priority Setting**: ❌ Never sets `currentPriority = 'time_patterns'` for PatternGenerator
- **Pattern Generation**: ❌ Uses generic LLM patterns (`/Keller Jordan/g`, `/run time/g`) instead of time-specific patterns
- **Expected Patterns**: Should use `/([0-9]+\.[0-9]+)\s*(hours?|hrs?)/gi` to capture "2.55 hours"
- **Extraction Result**: Gets "run time" (generic) instead of "2.55 hours" (actual data)
- **Synthesis Impact**: SynthesisCoordinator receives incomplete data, produces generic meta-commentary

### **Root Cause Analysis**
1. **System Has All Components**: PatternGenerator.generateTimeSpecificPatterns() exists and has correct regex patterns
2. **Detection Works**: PlanningAgent correctly identifies the need for numeric measurements  
3. **Routing Broken**: Priority/guidance doesn't reach PatternGenerator to trigger time-specific pattern generation
4. **Zero Hardcoding Solution**: Fix PlanningAgent → PatternGenerator communication, don't hardcode query detection

### **Impact Assessment**
- **Functional**: System produces generic responses instead of extracting actual speedrun data
- **User Experience**: Poor output quality despite having correct source data
- **Architecture**: Breaks the consumption/validation loop that was core to ResearchOrchestrator → Master Orchestrator migration

## Recent Updates (Zero Hardcoding) - COMPLETED
- **PatternGenerator Claude Code-Style Comprehensive Analysis (COMPLETED)**: Replaced hardcoded fallback with Claude Code philosophy - comprehensive analysis of ALL chunks using DataInspector's proven measurement extraction logic. Combines bootstrap sample + complete dataset analysis for content-grounded pattern discovery.
- **DataAnalyzer Bypass (COMPLETED)**: Completely removed DataAnalyzer from system due to catastrophic filtering bug that destroyed 100% of relevant extracted data. System now routes: Extractor → SynthesisCoordinator directly, preserving actual project details instead of producing generic placeholder output.
- **Pattern Generation Zero-Hardcoding (COMPLETED)**: Fixed PatternGenerator to learn measurement units dynamically from document content instead of hardcoded "hours|minutes". Only activates performance patterns when query indicates ranking intent AND document contains numeric evidence.
- **Chunk Expansion (COMPLETED)**: After DataInspector identifies relevant documents, system now fetches ALL chunks from approved documents for downstream agents (PatternGenerator, Extractor) while keeping DataInspector's efficient sampling for relevance decisions
- **PlanningAgent Override Framework (COMPLETED)**: Designed intelligent override system where PlanningAgent can correct DataInspector misclassifications (e.g., "Keller Jordan" as method → person) and ensure proper query intent classification (performance ranking vs general info)
- **Evidence-Driven Pattern Focus (COMPLETED)**: System now prioritizes numeric measurement patterns over generic text patterns when evidence supports performance queries
- **Agent Rerun Enhancement (COMPLETED)**: Fixed rerun functionality to auto-restore dependencies (patterns, document analysis, extracted data) from previous agent results, enabling reliable single-agent reruns
- **DataInspector Semantic Analysis (COMPLETED)**: Enhanced relevance logic with semantic reasoning guidance to properly connect entities in documents with query subjects (e.g., document about "Rutwik" → query about "Rutwik's projects")
- **Regex Worker Capture Group Intelligence (COMPLETED)**: Improved capture group selection to prioritize numeric values (like "4.26") over descriptive text (like "Record time") using universal pattern scoring without hardcoded units
- **PatternGenerator Universal Structured Data Extraction (COMPLETED)**: Completely rewrote extractUnitsFromContent() with 4-pattern recognition system to handle ANY concatenated table format. Fixes critical bug where Tyler's "8.13hours6.44B221k" extracted wrong units ["on", "GPUs", "speedrun"] → now correctly extracts ["hours", "B", "k"]. Uses zero-hardcoding approach with intelligent number-letter transition detection, solving "Items with time values: 0" issue.
- **PlanningAgent → PatternGenerator Priority Routing Fix (COMPLETED)**: Fixed critical string mismatch where PlanningAgent set `priority: 'session_time_patterns'` but PatternGenerator checked for `'time_patterns'`. Now properly sets `currentPriority` in shared context and PatternGenerator correctly triggers time-specific pattern generation for queries like "give me top 3 speedrun from Tyler's blog".
- **Master LLM Orchestrator Premature Completion Issue (COMPLETED)**: After ResearchOrchestrator removal, Master LLM completes after only DataInspector runs, skipping the full agent pipeline. This breaks multi-agent UI display and prevents extraction of time measurements needed for ranking queries. **FIX APPLIED**: Added performance query detection and mandatory pipeline enforcement in validateCompletionConditions() method.
- **Claude Code-Style Consumption/Replan Architecture (COMPLETED)**: PlanningAgent has consumeAgentResults() method but Orchestrator never calls it. True Claude Code style requires: Agent execution → PlanningAgent consumes results → Analyzes quality → Generates specific corrective guidance → Triggers replan with targeted instructions → Re-executes agent with better patterns. **FIXED**: Implemented full consumption/replan loop in executeToolCall() with retry tracking (max 2 retries per agent).
- **DataInspector Sequencing Fix (COMPLETED)**: validateAgentExecution() was throwing hard error when any agent except DataInspector was called first. **FIXED**: Changed to warning + automatic redirect pattern - if DataInspector not called, orchestrator automatically calls it first then continues with requested agent.
- **LLM Typo Resilience (COMPLETED)**: LLM outputs variations like "DATAINSPICTOR" causing tool normalization failures. **FIXED**: Added comprehensive typo handling in normalizeToolName() for common misspellings and variations.
