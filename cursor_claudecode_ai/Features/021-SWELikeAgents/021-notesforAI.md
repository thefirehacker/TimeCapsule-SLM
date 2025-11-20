# AI Agent System - Current Status & Critical Issues

**Date**: 2025-11-18  
**Context**: Issue 021 - SWE-Like Agent Performance  
**Phase**: 0 (Micro-Session Architecture) - BLOCKED by fundamental bugs

---

## 🔄 Latest Progress (2025-11-18)

- AI Flow Builder now gates rendering on unified readiness flags and shows a placeholder until both VectorStore and unified storage report ready.
- DataInspector prompt + parser support the structured JSON path for future-proof extraction (although outputs are still empty downstream).
- VectorStore persistence accepts virtual docs even while the client-side DocumentProcessor is offline.
- Select triggers + dialog overlays were refactored with memoized handlers/forward refs to minimize render loops.

## ⚠️ Fresh Issues Observed on Reload

- VectorStore initialization keeps re-running; the init modal reopens repeatedly and eventually throws "Maximum update depth exceeded" (logs: `Test/temp/logs.md`).
- Structured JSON fields from DataInspector are still not propagating into `context.sharedKnowledge`, so PatternGenerator/Extractor/Synthesis never receive usable hints.
- Unified storage readiness stays false for empty accounts, so Flow Builder never renders without manually clearing storage.
- Modal/select stack may still loop if VectorStore init fails; need to retest once provider stability is fixed.

## 🎯 Immediate Next Steps

1. **VectorStore initialization loop** – Ensure `initializationAttempted` resets only after success, stop re-invoking `initializeVectorStore()` every render, and auto-close `VectorStoreInitModal` when `vectorStoreInitialized` is true (suppress repeats after failure).
2. **Data extraction reliability** – Confirm `DataInspectorAgent` actually populates structured JSON fields, pipe them to `context.sharedKnowledge`, and require `hasExtractedData` to be true before Synthesis runs.
3. **Unified storage fallback** – Flip `flowPanelReady` to true once unified storage load completes even with zero frames/chapters so the Flow Builder UI renders for new users.
4. **Modal/Select crash verification** – After fixing the provider loop, retest for the depth error and inspect `showVectorStoreInitModal` and Select Trigger handlers if it persists.

---

## 🔍 Recent Debugging Notes

- **Graph view stabilized**: `EnhancedLearningGraph` now routes `onFramesChange`, `onChaptersChange`, and `onGraphChange` through ref-backed helpers and debounced setters. ReactFlow’s StoreUpdater only flips props on the first render, so the “Maximum update depth exceeded” error from the graph pane is resolved.
- **Dual-pane still loops**: `DualPaneFrameView` re-registers its `frames-reordered`/`frame-edited` listeners on every render (effect depends on the `frames` array). Those handlers immediately call `setGraphState`, which triggers another render, re-running the effect, etc. The Radix `ScrollArea` logs the depth error because it keeps receiving new refs during this loop.
- **Next fix for dual-pane**: Limit the listener effect dependencies to stable refs (`graphState`, `onFrameIndexChange`, `onGraphStateUpdate`), keep all frame mutations going through the ref-backed `invokeFramesChange`, and remove any remaining frame updates inside event handlers (only local graph state should change). Once that effect stops re-running, repeated reloads should no longer trigger the Radix scroll error and all three views (graph, linear, dual) can coexist.

---

## 🚨 CRITICAL BLOCKERS (Must Fix Before Phase 0 Testing)

### **Priority 1: Data Extraction Pipeline Completely Broken**

The AI agent pipeline is producing **0 useful extractions** due to THREE independent parsing bugs that compound each other:

#### **Bug #1: filename="unknown"** 
- **Location**: VectorStore upload OR DataInspector sampling
- **Impact**: Document type classification fails → "Unknown Document" → generic patterns
- **Evidence**: `DataInspectorAgent.ts:914` shows `filename: 'unknown'` in document sample
- **Fix Required**: Preserve actual filename from PDF upload through to DataInspector sampling

#### **Bug #2: MAIN_ENTITY Regex Parsing Failure**
- **Location**: `DataInspectorAgent.ts` lines ~1089-1134
- **Impact**: LLM correctly extracts entity, but regex can't parse it → "Unknown Entity"
- **Evidence**:
  - Line 1217: LLM returns `"PyTorch Distributed Data Parallel (DDP) - instructional material... --- STEP 3: Entity..."`
  - Line 1101: `⚠️ MAIN_ENTITY extraction failed`
  - Line 1130: `❌ Could not extract entity`
  - Line 1137: `mainEntity: 'Unknown Entity'`
- **Root Cause**: Regex pattern `/MAIN_ENTITY:\s*"?([^"\n]+)"?/` fails because:
  1. Response contains `---` mid-line (regex stops at `[^"\n]` before reaching it)
  2. Doesn't handle multi-line entity descriptions
- **Fix Options**:
  - **Quick**: More robust regex: `/MAIN_?ENTITY:\s*"?([^"\n]+?)(?:\s*---|"|\n)/i`
  - **Proper**: Structured JSON output (aligns with Phase 1 Requirement 2)

#### **Bug #3: Technical Terms Response Format Mismatch**
- **Location**: `DataInspectorAgent.ts` lines 2788-2855 (`parseQueryRelevantTermsResponse`)
- **Impact**: LLM extracts rich data, parser returns empty arrays → PatternGenerator has no hints
- **Evidence**:
  - Line 2508 (logs): LLM returns:
    ```
    **METHODS:**
    - DDP (Distributed Data Parallel)
    - PyTorch DDP
    
    **CONCEPTS:**
    - Distributed training
    
    **DATA_TYPES:**
    - Hugging Face datasets
    ```
  - Line 2512 (logs): Parser returns `{methods: [], concepts: [], people: [], data: []}`
  - Line 2533 (logs): `⚠️ No methods extracted from document content`
- **Root Cause**: Parser expects lowercase without asterisks:
  ```typescript
  // Parser (line 2809):
  if (trimmed.startsWith("methods:") || trimmed.startsWith("concepts:") || trimmed.startsWith("data:"))
  
  // LLM returns:
  "**METHODS:**", "**CONCEPTS:**", "**DATA_TYPES:**"
  ```
- **Fix Required**: Either:
  1. Update parser to handle `**METHODS:**` (uppercase, asterisks)
  2. Update LLM prompt to enforce lowercase without asterisks
  3. Use structured JSON output (best, aligns with Phase 1)

---

### **Priority 2: UI Stability Issues**

#### **Bug #4: VectorStore Document Processing Unavailable**
- **Location**: `VectorStore.ts:791` → `useAIFlowBuilder.ts:769`
- **Impact**: Session persistence fails, user loses work, AI frames cannot be saved to Knowledge Base
- **Trigger**: Occurs when trying to persist AI frame session via unified tool (`persistSessionToKnowledgeBase`)
- **Evidence**: 
  ```
  useAIFlowBuilder.ts:776 ⚠️ Failed to persist session to Knowledge Base: 
  Error: Document processing is unavailable. Please refresh the page and try again.
      at VectorStore.addVirtualDocument (VectorStore.ts:791:13)
      at useAIFlowBuilder.useCallback[persistSessionToKnowledgeBase] (useAIFlowBuilder.ts:769:27)
      at useAIFlowBuilder.useCallback[persistSessionState] (useAIFlowBuilder.ts:812:15)
      at useAIFlowBuilder.useCallback[planFlow] (useAIFlowBuilder.ts:1488:13)
  ```
- **Root Cause**: Client-side document processor (embeddings model) not initialized when `addVirtualDocument` is called
- **Note**: Likely related to our server-side embedding migration (Issue 020) - document processor may no longer be needed but checks still exist

#### **Bug #5: SelectTrigger Infinite Re-Render (REGRESSION)**
- **Location**: `select.tsx:36` → `AIFlowBuilderPanel.tsx:440` → `AIFramesPage (page.tsx:2946)`
- **Impact**: UI crashes with "Maximum update depth exceeded", entire app becomes unusable
- **Trigger**: Occurs after AI frames generation completes, when UI tries to render results
- **Evidence**:
  ```
  error-boundary-callbacks.js:83 Uncaught Error: Maximum update depth exceeded. 
  This can happen when a component repeatedly calls setState inside 
  componentWillUpdate or componentDidUpdate. React limits the number of nested 
  updates to prevent infinite loops.
      at SelectTrigger (select.tsx:36:5)
      at AIFlowBuilderPanel (AIFlowBuilderPanel.tsx:440:19)
      at AIFramesPage (page.tsx:2946:9)
  ```
- **Status**: **REGRESSION** - We supposedly fixed this with `useCallback` hooks earlier!
- **Possible Causes**:
  1. Fix wasn't properly saved/applied to all Select components
  2. Another non-memoized handler exists (provider/model selection dropdowns)
  3. Component re-rendering triggered by state update loop from frame generation results
  4. Bug #4 (VectorStore error) may be triggering error boundary that causes re-renders
- **Action Required**: 
  1. Re-verify `useCallback` implementation in `AIFlowBuilderPanel.tsx` around line 440
  2. Check all `Select` components for non-memoized `onValueChange` handlers
  3. May be related to Bug #4 - fix VectorStore issue first to see if this resolves

---

## 💥 COMPLETE FAILURE CHAIN

```
1. filename="unknown" (Bug #1)
   ↓
2. DataInspector → "Unknown Document" classification
   ↓
3. MAIN_ENTITY parsing fails (Bug #2) → "Unknown Entity"
   ↓
4. Technical terms LLM extracts correctly but parser returns [] (Bug #3)
   ↓
5. PatternGenerator gets no entity/method hints → generates 1 useless pattern
   ↓
6. PatternGenerator extracts only 1 item: "10" from chunk_3
   ↓
7. Extractor is skipped: "PatternGenerator already extracted 1 items"
   ↓
8. SynthesisCoordinator has only 1 data item → validation fails
   ↓
9. Retry still has only 1 item → produces garbage output
   ↓
10. Orchestrator completes, triggers unified tool persistence
   ↓
11. VectorStore.addVirtualDocument fails (Bug #4) → "Document processing unavailable"
   ↓
12. Error triggers component re-render cycle
   ↓
13. SelectTrigger infinite re-render loop (Bug #5) → UI crashes
   ↓
14. User sees error screen: "Maximum update depth exceeded"
   ↓
RESULT: No frames generated, no session saved, UI unusable
```

**Key Observation**: Bugs #4 and #5 occur AFTER the poor-quality output is generated, meaning even if we fix UI bugs, the core extraction problems (Bugs #1-3) still need fixing for quality output.

---

## 📊 Current Pipeline Output Quality

**With 1 relevant DDP tutorial document:**
- ✅ DataInspector: Finds document, samples 9 chunks
- ❌ Document classified as "Unknown Document" (Bug #1)
- ❌ Entity extracted as "Unknown Entity" (Bug #2)
- ❌ Technical terms: 0 methods, 0 concepts extracted (Bug #3)
- ❌ PatternGenerator: Creates 1 useless pattern, extracts 1 item ("10")
- ❌ Extractor: Skipped (redundant)
- ❌ SynthesisCoordinator: Only 1 data item → fails validation
- ❌ Final output: "Based on the available data, I cannot create a lesson plan for you using DDP. **Insufficient Inform..."

**Expected output:**
- ✅ "Educational Tutorial" document type
- ✅ "PyTorch DDP" entity
- ✅ 8-12 methods extracted (DDP, PyTorch DDP, all_reduce, etc.)
- ✅ 10+ concepts extracted (distributed training, gradient averaging, etc.)
- ✅ 50+ data items extracted
- ✅ Comprehensive lesson plan with 11 modules

**Extraction efficiency: 1/50+ = 2% (98% data loss due to parsing bugs)**

---

## 🎯 Phase 0 (Micro-Sessions) Status

### ✅ **Completed**:
- Micro-session core architecture (`Orchestrator.ts`)
- Per-agent iteration limits within micro-sessions
- Goal-based session management
- Consecutive agent call guards
- Session history tracking

### ⏸️ **BLOCKED** (Cannot Test):
Micro-session architecture **CANNOT be tested** until parsing bugs are fixed because:
1. Micro-sessions iterate agents 3x to improve results
2. If input data is garbage (Bug #1-3), 3 iterations of garbage = still garbage
3. "Garbage in, garbage out" - even perfect iteration logic won't help

**Critical Path**: Fix Bugs #1-3 → THEN test micro-sessions with real data → THEN wire success signals

### 🔄 **Next (After Bug Fixes)**:
1. Test micro-session iteration with corrected data extraction
2. Wire success signals from each agent (PatternGenerator → Extractor → SynthesisCoordinator)
3. Expose micro-session markers in context for observability
4. Verify agents auto-advance only when goals achieved

---

## 🛠️ Recommended Fix Order

### **Step 1: Fix Data Extraction (Bugs #1-3)** - ONE FIX SOLVES ALL THREE
Implement **Structured JSON Output** (aligns with Phase 1 Requirement 2):

```typescript
// DataInspector prompt:
"Return your analysis as JSON:
{
  \"mainEntity\": \"PyTorch DDP\",
  \"documentType\": \"Educational Tutorial\",
  \"isRelevant\": true,
  \"methods\": [\"DDP\", \"PyTorch DDP\"],
  \"concepts\": [\"distributed training\"],
  \"dataTypes\": [\"tensors\", \"input_ids\"]
}"

// Parse as JSON (robust):
const analysis = JSON.parse(llmResponse);
```

**Benefits**:
- ✅ Fixes all 3 parsing bugs at once
- ✅ Eliminates regex brittleness
- ✅ Aligns with Phase 1 design
- ✅ Industry standard (Cursor, Codex, SWE-agent all use structured output)
- ✅ Easier to validate and debug

**Time**: ~30-40 minutes to implement + test

### **Step 2: Fix VectorStore Initialization (Bug #4)**
- **Problem**: `persistSessionToKnowledgeBase` calls `addVirtualDocument`, which checks for document processor availability
- **Likely cause**: After Issue 020 migration to server-side embeddings, client-side processor is no longer initialized but legacy checks remain
- **Fix options**:
  1. **Option A (Quick)**: Skip document processor check in `addVirtualDocument` when adding virtual/session documents (they don't need embeddings generated)
  2. **Option B (Proper)**: Initialize document processor only for display purposes OR remove dependency entirely
- **Files to check**:
  - `VectorStore.ts:791` - the check that throws the error
  - `useAIFlowBuilder.ts:769-812` - the persistence flow
- Related to Issue 020 (server-side embeddings)

**Time**: ~10-15 minutes

### **Step 3: Fix SelectTrigger Re-Render (Bug #5)**
- **Important**: May be partially caused by Bug #4 - test after fixing VectorStore issue first
- Re-verify `useCallback` implementation in `AIFlowBuilderPanel.tsx` around line 440
- Check all `Select` components (provider selection, model selection) for non-memoized handlers
- Look for error boundary re-render cycles triggered by VectorStore failure
- Add React DevTools profiler to identify re-render source if still occurring after Bug #4 fix

**Time**: ~20 minutes (less if resolved by Bug #4 fix)

### **Step 4: Test Micro-Sessions with Clean Data**
- Run AI Flow Builder with fixed parsing
- Verify micro-sessions iterate effectively
- Check agent progression logic

**Time**: ~30 minutes testing

---

## 💡 Key Insight

**The micro-session architecture is SOUND**, but we discovered it during a system-wide failure:

```
✅ Micro-session design: EXCELLENT (matches Cursor/Codex pattern)
❌ Input data quality: ZERO (parsing completely broken)
Result: Can't validate excellent architecture with broken inputs
```

**Analogy**: We built a Formula 1 race car (micro-sessions) but the fuel tank has holes (parsing bugs). We need to fix the tank before we can test the car's performance.

---

## 📈 Expected Results After Fixes

With all bugs fixed and micro-sessions active:

**DataInspector Micro-Session (Goal: "Analyze document structure")**:
- Attempt 1: Finds document, classifies as "Unknown Document" (Bug #1 fixed → now "Educational Tutorial")
- Attempt 2: (Not needed, goal achieved on first try)
- ✅ Advance to next session

**PatternGenerator Micro-Session (Goal: "Generate extraction patterns")**:
- Attempt 1: Creates 2 generic patterns (Bug #3 fixed → now has method/concept hints)
- Attempt 2: Refines patterns based on document type, generates 5 specific patterns
- Attempt 3: Validates patterns against sample, extracts 50+ items
- ✅ Advance to next session

**Result**: ~15-20 total LLM calls (vs 60 now), 50+ items extracted (vs 1 now), comprehensive lesson plan output

---

## 🎬 Action Plan

**Immediate (Today)**:
1. ✅ Document all 5 bugs in detail (DONE - this file)
2. 🔄 Create fix plan for structured JSON output (addresses Bugs #1-3)
3. 🔄 Create fix plan for VectorStore + SelectTrigger (Bugs #4-5)
4. ⏳ Get user approval to proceed

**Next (After Approval)**:
1. Implement structured JSON output for DataInspector
2. Fix VectorStore initialization check
3. Debug SelectTrigger re-render
4. Test full pipeline with DDP document
5. Validate micro-session iteration behavior
6. Update 021-todo.md with results

**Timeline**: ~2-3 hours total implementation + testing

---

## 📚 References

- **Issue 020**: Server-Side Query Embeddings (may be related to Bug #4)
- **Issue 021**: SWE-Like Agent Performance (current focus)
- **021-SWELikeAgents.md**: Full requirements document
- **021-todo.md**: Implementation tracking
- **Logs**: `Test/temp/logs.md` (1130 lines, session 1763458322190)

---

**Status**: 🔴 BLOCKED - Critical parsing bugs must be fixed before Phase 0 testing can proceed.

---

## Additional Failures From Latest Run (Feb 18)

### **Bug #6: FlowFrameGenerator JSON parsing explodes on code snippets**
- **Where**: `responseCompletion.ts:209-280` (array extraction) → `FlowFrameGeneratorAgent.ts:106`
- **What happened**: The generator’s LLM response included a bare array snippet (`['LOCAL_RANK']` … ) before the actual JSON. `parseJsonWithResilience` saw the `[` and tried to `JSON.parse` it, which threw `Unexpected token '''`. The fallback never reached the real JSON body, so the entire frame failed with “Invalid JSON after all extraction attempts.”
- **Why it matters**: Even when upstream agents succeed, FlowFrameGenerator aborts and the UI never receives a usable frame.
- **Fix ideas**: Strip fenced code/array blocks before looking for JSON; or tighten the LLM prompt so it never emits raw arrays outside the JSON envelope. Detect obvious code keywords (`device =`, `dist.init_process_group`) and skip the array parser when present.

### **Bug #7: SelectTrigger infinite loop resurfaces when generator fails**
- **Where**: Radix Select controls inside `AIFlowBuilderPanel`. When FlowFrameGenerator throws, `planFlow` updates state rapidly, the selects recreate their handlers, and Radix keeps reattaching refs until React hits the same “Maximum update depth exceeded” error logged in `Test/temp/logs.md:1560-1640`.
- **Impact**: After FlowFrameGenerator/KB errors, the entire AI Frames UI crashes again.
- **Fix**: Memoize every `onValueChange`/stateful prop passed to `SelectTrigger`, or gate re-renders when KB persistence fails so we don’t open/close the VectorStore modal repeatedly.

These stack on top of Bugs #1-5, so once parsing and persistence are repaired we need to address them before trusting the FlowFrame pipeline.
