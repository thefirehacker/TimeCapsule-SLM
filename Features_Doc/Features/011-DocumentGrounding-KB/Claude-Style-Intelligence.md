## Deterministic Performance Pipeline (Small‑LLM Friendly)

This flow removes brittle behaviors and keeps zero hardcoding while matching “Claude Code” style outcomes.

- Query constraints: derive `expectedOwner`, `expectedDomainCandidates`, `expectedTitleHints`, `expectedDocType`, `strictness`, `keyEntities` once and store in `sharedKnowledge.queryConstraints`.
- Prefilter + synopsis ranking: filter by metadata if constraints exist; then do a single batched ranking across brief synopses to pick top K (keeps recall).
- Deterministic performance intent: if the query contains ranking language (top/best/fastest) and numeric units (hours, tokens/s, B tokens), set `expectedAnswerType='performance_ranking'` when LLM expectations are inconclusive.
- Guaranteed patterns: always add numeric/time/table regex families for `performance_ranking` (hours/min/throughput, simple table rows). No keyword lists or filename rules.
- Normalized matching: regex runs on original and normalized text (lowercased, separators collapsed) so “MongoDB” ≈ “Mongo DB”, “NextJS” ≈ “Next.js”.
- Flexible term regex: build separator/acronym‑tolerant regex per token (e.g., `mongo\s*[-_]?\s*d\.?\s*b\.?`).
- Deterministic reducer: compute top‑3 by min(total hours) primarily, else max(tokens/s), emit structured results with attribution.
- Post‑filter: if constraints specify owner/domain/title, drop extracted items whose source metadata violates them.

## UX and Observability

- Labels: show filename/title first; display LLM `mainEntity` as a secondary tag to avoid confusion (e.g., “Including: file.pdf (entity: GPT‑2)”).
- Agent history: persist the last N runs (ring buffer + localStorage) with runId/timestamp; expose in a collapsible “Recent runs” panel so verbose history doesn’t disappear after each run.

## Guardrails

- Synthesis requires extraction output. Planning still decides order; the guardrail only prevents empty answers.
- Parser hardening: strict JSON‑output prompts and resilient cleaning for small models.

# Claude-Style Intelligence Implementation Plan

## Current Architecture Analysis
Your system has: Master Orchestrator � DataInspector � PlanningAgent � PatternGenerator � Extractor � Synthesis

## Problem: Meta-Reasoning Intelligence Gap
System extracts "chain-of-thought, program-of-thought" from GRPO paper instead of recognizing GRPO as the main method.

## Solution: Enhance Existing Agents with Context Intelligence

## =� **TODO LIST**

### Phase 1: PlanningAgent Meta-Reasoning Enhancement ✅
- [x] **1.1** Add document-type analysis to PlanningAgent
- [x] **1.2** Make PlanningAgent recognize method papers vs survey papers  
- [x] **1.3** Enable PlanningAgent to guide "what should we expect from this document type?"
- [x] **1.4** Add query-document mismatch detection to PlanningAgent

### Phase 2: DataInspector Context Intelligence ✅
- [x] **2.1** Fix content truncation issue (3500 → 8000 char limit)
- [x] **2.2** Add document-purpose detection to DataInspector
- [x] **2.3** Enable DataInspector to recognize "this paper's main contribution"  
- [x] **2.4** Make DataInspector ask "what method does this paper introduce?"

### Phase 3: Master Orchestrator Adaptive Intelligence
- [ ] **3.1** Enhance quality assessment to understand context mismatches
- [ ] **3.2** Make retry decisions based on document-query relationship
- [ ] **3.3** Add "insufficient but expected" vs "insufficient and problematic" distinction
- [ ] **3.4** Enable Master Orchestrator to guide different extraction strategies

### Phase 4: PatternGenerator Document-Aware Patterns
- [ ] **4.1** Make PatternGenerator understand document context from PlanningAgent
- [ ] **4.2** Generate patterns based on "main method in this paper" not generic patterns
- [ ] **4.3** Create extraction strategies that look for "the contribution" not just "methods"
- [ ] **4.4** Enable PatternGenerator to prioritize paper's central claims

### Phase 5: Synthesis Context Bridge
- [ ] **5.1** Add contextual interpretation to synthesis agents
- [ ] **5.2** Enable synthesis to infer from document purpose 
- [ ] **5.3** Add "according to this paper" reasoning capability
- [ ] **5.4** Make synthesis connect document claims to query expectations

##  **COMPLETED TASKS**
-  **Fixed chunk sampling** to use 30% rule instead of 6 chunks
-  **Added method acronym detection** for better prioritization
-  **Enhanced quality control system** with PlanningAgent assessment

## Implementation Strategy

### Working Within Current Architecture:

1. **PlanningAgent becomes Context Intelligence Hub**
   - Analyzes document type and purpose
   - Sets intelligent expectations for what to extract
   - Guides downstream agents with context-aware strategies

2. **Master Orchestrator uses Context-Aware Quality Control**
   - Quality assessment considers document-query relationship
   - Retries based on contextual appropriateness
   - Adapts standards based on document type

3. **DataInspector + PatternGenerator work as Context-Aware Team**
   - DataInspector identifies document purpose
   - PatternGenerator creates patterns for "this paper's contribution"
   - Both guided by PlanningAgent's context intelligence

4. **Synthesis gains Interpretive Intelligence**
   - Bridges "what we found" with "what query needs"
   - Makes reasonable inferences from document context
   - Answers based on document purpose understanding

## Expected Result
Query: "what is the best RL method" + GRPO paper
Answer: "According to this research paper, GRPO (Group Relative Policy Optimization) is the reinforcement learning method presented by the authors as their contribution to the field."

## 🚨 **CRITICAL ISSUE DISCOVERED**

### **Root Cause Analysis: Filename Dependency Bug**
**Status**: DataInspector correctly extracts GRPO ✅ → PlanningAgent ignores content analysis ❌

**Log Evidence**:
```
DataInspectorAgent.ts:1307 📋 Extracted methods: (12) ['Group Relative Policy Optimization (GRPO)', ...]
DataInspectorAgent.ts:1298 ✅ Document insights stored in context.sharedKnowledge: {methods: 12, ...}
BUT
PlanningAgent.ts:583 🧠 Document context analysis: {isMethodPaper: false, ...}
PlanningAgent.ts:590 🎯 Intelligent expectations: {shouldFindSpecificMethod: false, ...}
```

**Problem**: `isMethodIntroductionPaper()` and `inferDocumentType()` in PlanningAgent are hardcoded to check filename patterns ('grpo', 'deepseek') instead of using DataInspector's extracted content.

**Current Broken Logic**:
- Line 1309: `if (docSource.toLowerCase().includes('grpo') || docSource.toLowerCase().includes('deepseek'))`
- But `docSource = 'Unknown'` because document source detection failed
- So system marks `isMethodPaper: false` even though GRPO was correctly extracted!

### **Immediate Fix Required**:
```typescript
// WRONG (current):
private isMethodIntroductionPaper(docSource: string, insights: any): boolean {
  if (docSource.toLowerCase().includes('grpo')) return true; // FILENAME DEPENDENCY!
}

// RIGHT (needed):
private isMethodIntroductionPaper(docSource: string, insights: any): boolean {
  const extractedMethods = insights?.methods || [];
  const hasSpecificMethod = extractedMethods.some(method => 
    method.length > 10 && /[A-Z]{2,}/.test(method) // Has acronym like "GRPO"
  );
  return hasSpecificMethod;
}
```

## ✅ **PHASE 1-2 COMPLETE: Zero Hardcoding Achieved**

### **What Was Fixed:**
1. **Removed ALL filename dependencies** - No more checking for 'grpo', 'deepseek'
2. **Removed ALL hardcoded query patterns** - No more checking for 'best', 'method', etc.
3. **Content-based document analysis** - Using extracted methods with acronym detection
4. **Fixed strategy creation bug** - Now uses `documentContext` instead of raw analysis

### **Current Issue: Strategy Propagation**

**NEW LOG EVIDENCE** (after fixes):
```
PlanningAgent.ts:539 🧠 Document context analysis: {
  documentType: 'Method Paper',  ✅
  isMethodPaper: true,           ✅
  mainContribution: 'Group Relative Policy Optimization (GRPO)' ✅
}
BUT Strategy shows:
PatternGenerator.ts:58 ✅ Using PlanningAgent extraction strategy: {
  documentType: 'Generic Document',  ❌ (should be 'Method Paper')
  queryIntent: 'general_query'       ❌ (should be 'method_from_paper_contribution')
}
```

**Root Cause**: Strategy creation was using wrong variables:
- Used `documentAnalysis.documentType` instead of `documentContext.documentType`
- Used generic `queryIntent` instead of `intelligentExpectations.expectedAnswerType`

## 🔧 **PHASE 3: Strategy Connection Fix**

### **Changes Made:**
```typescript
// BEFORE (wrong variables):
const strategy: ExtractionStrategy = {
  documentType: documentAnalysis.documentType || 'Generic Document',  // ❌
  queryIntent: queryIntent,  // ❌
}

// AFTER (correct variables):
const strategy: ExtractionStrategy = {
  documentType: documentContext.documentType,  // ✅ Uses intelligent analysis
  queryIntent: intelligentExpectations.expectedAnswerType,  // ✅ Uses expectations
}
```

### **Remaining Issue: Extraction Targets**

The `determineExtractionTargets` method needs to:
1. **NOT hardcode document types** (no "Research Paper", "Tutorial", "Resume")
2. **Dynamically derive targets** from actual analysis results
3. **Guide extraction** without assumptions

**Current Problem**:
```typescript
// TOO GENERIC:
return ['all_available_content'];

// NEED: Dynamic targets from analysis
// - If mainContribution exists → prioritize that
// - If methods found → extract methods
// - If query needs ranking → extract comparisons
```

## Current Status: =🔧 **EXTRACTION TARGET STRATEGY NEEDED**