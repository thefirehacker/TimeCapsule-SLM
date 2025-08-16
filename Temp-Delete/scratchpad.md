# Scratchpad - Multi-Agent System Issues & Solutions

## Current Problems Analysis

### Problem 1: LLM Decision Loop (Gemma 3n specific but affects all)
**Symptoms:**
- Gemma 3n gets stuck calling DataAnalyzer repeatedly (7+ times)
- Hits max iterations (15) without reaching final synthesis
- System says "All planned steps completed" but also "Continue to next agent"

**Root Cause:**
- Confusing guidance from Orchestrator
- Lines showing: " All planned steps completed - Pipeline execution finished" BUT "Recommended Next Action: Continue to next agent in pipeline"
- LLM doesn't know when to stop

**Evidence from logs:**
```
Orchestrator.ts:1689 =Ë Agent DataAnalyzer was already executed successfully.
Orchestrator.ts:1690 =Ê Current Pipeline Status: COMPLETED  - All 3 planned steps executed
Orchestrator.ts:1691 =¡ Next Step Guidance: 
=Ê **PIPELINE PROGRESS**:
 PatternGenerator ’  Extractor ’  SynthesisCoordinator
 **All planned steps completed** - Pipeline execution finished.
Consider: web-search.
Orchestrator.ts:1716 <¯ Recommended Next Action: Continue to next agent in pipeline
```

### Problem 2: Insufficient Synthesis Output (Both Qwen and Gemma)
**Symptoms:**
- Qwen output: 896 chars, basic but uses real data
- Gemma output: 602 chars, generic placeholder "Project" instead of real data
- Both too short, lacking detail

**Root Cause:**
- SynthesisCoordinator prompt asks for "concise" response
- No minimum word requirements
- No anti-placeholder rules for Gemma

**Evidence:**
- SynthesisCoordinator.ts line 207: "Structure the response clearly and concisely"
- Only "Generate a comprehensive, query-focused response" but no length requirements

## TODO List

### Fix 1: Orchestrator Guidance Logic
- [ ] Find where "Recommended Next Action: Continue to next agent" is generated
- [ ] Add logic to detect when synthesis is complete
- [ ] Change guidance to "SYNTHESIS COMPLETE - STOP" when SynthesisCoordinator/Synthesizer finishes
- [ ] Ensure clear completion signals for LLM

### Fix 2: SynthesisCoordinator Prompt Enhancement
- [ ] Remove "concisely" from prompt (line 207)
- [ ] Add minimum 500+ word requirement
- [ ] Add structured section requirements
- [ ] Add anti-placeholder rules (NEVER use "Project", always use actual extracted data)
- [ ] Match requirements from enhanced SynthesisAgent

### Fix 3: Ensure Proper Data Flow
- [ ] Verify extracted data reaches SynthesisCoordinator
- [ ] Ensure structured insights from DataInspector are used
- [ ] Add explicit data grounding requirements

## Implementation Plan (Zero Hardcoding)

### Step 1: Fix Orchestrator Guidance
**File:** `Orchestrator.ts`
**Method:** Look for where "Recommended Next Action" is set
**Changes:**
1. Find the guidance generation logic
2. Add synthesis completion detection
3. When SynthesisCoordinator or Synthesizer completes with answer, set guidance to "STOP"
4. Remove conflicting "continue to next agent" message

### Step 2: Enhance SynthesisCoordinator
**File:** `SynthesisCoordinator.ts`
**Method:** `buildQueryAwareSynthesisPrompt()`
**Changes:**
```typescript
// OLD (line 202-209):
'SYNTHESIS REQUIREMENTS:',
'1. Answer the query "${context.query}" directly and specifically',
'2. Focus on the highest-relevance items listed above',
'3. Avoid including information that is not relevant to the query',
'4. Provide specific details and evidence from the relevant data',
'5. Structure the response clearly and concisely',

// NEW:
'SYNTHESIS REQUIREMENTS:',
'1. Answer the query "${context.query}" directly and specifically',
'2. Focus on the highest-relevance items listed above',
'3. Provide COMPREHENSIVE analysis with substantial detail (minimum 500 words)',
'4. Include specific details and evidence from ALL relevant data',
'5. Structure the response with clear sections and thorough explanations',
'6. NEVER use generic placeholders like "Project" - use actual extracted data',
'7. Ground every claim in the specific extracted information above',
```

### Step 3: Add Data Validation
**File:** `SynthesisCoordinator.ts`
**Method:** `generateQueryFocusedReport()`
**Add:** Check if sufficient data exists, if not use evidence-based insufficient data message

## Key Insights

1. **The loop problem isn't about agent repetition detection** - that's working. It's about confusing guidance after completion.

2. **The output quality problem affects both models** but manifests differently:
   - Qwen: Uses real data but too brief
   - Gemma: Falls back to placeholders AND too brief

3. **No hardcoding needed** - just clearer instructions and requirements

## Test Criteria
- [ ] Gemma 3n completes without hitting max iterations
- [ ] Both models produce 500+ word outputs
- [ ] No placeholder content in output
- [ ] Clear completion without loops
- [ ] Actual extracted data used throughout