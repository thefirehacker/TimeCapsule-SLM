# Issue #007: Deep Research Critical Fixes - Race Condition & Quality

**Status**: 🔧 **IN PROGRESS - Multi-Agent JSON Parsing Issues**  
**Priority**: HIGH - Multi-Agent System Integration  
**Type**: Bug Fix & LLM Model Limitations  
**Created**: 2025-07-21  
**Updated**: 2025-08-01  

## Problem Statement

**NEW ISSUE**: Multi-agent system failing with JSON parsing errors in ExtractionAgent.

**Evidence**: 
- ExtractionAgent.parseJSON throws "Invalid JSON" error
- Small LLM (qwen3:0.6b) generating non-JSON responses despite explicit prompts
- System returns "Unable to generate an answer from the available information"

**Root Cause**: Multi-agent system designed for larger LLMs, overwhelming small model with:
- Complex JSON structure requirements
- Multiple agent coordination
- Large prompt sizes (4835 chars for extraction)

**Previous Issues RESOLVED**:
1. ✅ **React Key Duplication**: Fixed with Set-based deduplication
2. ✅ **JSON Parsing in ResearchOrchestrator**: Now handles `<think>` tags properly
3. ✅ **RAG Search**: Successfully finds 15 sources with good similarity scores
4. ✅ **Old Agent System**: Replaced with generic multi-agent architecture

## Technical Analysis

### CURRENT ISSUE: Multi-Agent JSON Parsing Failure
**Location**: `src/lib/multi-agent/agents/ExtractionAgent.ts`  
**Problem**: Small LLM model (qwen3:0.6b) cannot generate valid JSON for agent system

**Evidence from Logs**:
```
ExtractionAgent.ts:110 ❌ Extraction failed for batch: Error: Invalid JSON
useOllamaConnection.ts:421 ✅ Content generated successfully {responseLength: 3744}
Orchestrator.ts:168 📋 Agent pipeline planned: ['QueryPlanner', 'DataInspector', 'PatternGenerator', 'Extractor']
```

**Root Cause Analysis**:
1. **Multi-Agent Complexity**: 4-agent pipeline too complex for 600M parameter model
2. **JSON Requirements**: Each agent requires structured JSON output
3. **Prompt Overload**: Extraction prompt is 4835 characters
4. **No Graceful Degradation**: System fails completely instead of falling back

### RESOLVED ISSUES ✅
1. **Race Condition**: Fixed with Set-based step deduplication
2. **JSON Parsing**: Now properly handles `<think>` tags + JSON extraction  
3. **RAG Search**: Successfully finding 15 relevant sources (0.364 avg similarity)
4. **Research Flow**: All 6 steps completing successfully

## Root Cause Analysis

### Race Condition Root Cause
1. **Async State Updates**: `researchStepsState.addStep()` is async but not awaited
2. **Rapid Callbacks**: Research orchestrator fires multiple updates for same step
3. **State Inconsistency**: `existingSteps` snapshot is stale when checked
4. **No Deduplication**: No mechanism to prevent duplicate additions

### Quality Issues Root Cause  
1. **RAG Retrieval**: Poor chunk selection and relevance filtering
2. **Text Processing**: Corruption during chunk extraction or synthesis
3. **Prompt Engineering**: Synthesis prompts not producing clean output
4. **Context Assembly**: Improper context combination and formatting

## Solution Architecture

### IMPLEMENTED FIXES ✅

**1. Simplified Extraction Prompts**
- Reduced prompt complexity with "RESPOND WITH ONLY JSON" instructions
- Shortened chunk previews (200 chars instead of full text)
- Smaller batch sizes (2 chunks instead of 5)

**2. Robust JSON Parsing**
- Multi-strategy parsing: direct → extract object → extract array
- Handles `<think>` tags in responses
- Better error logging to debug issues

**3. Fallback Mechanisms**
- Pattern-based extraction when JSON parsing fails
- Direct LLM synthesis when multi-agent fails
- Always returns some answer instead of failing completely

**4. Improved Error Visibility**
- Logs actual LLM responses for debugging
- Shows parsing attempts and failures
- Better error messages throughout pipeline

### Code Changes Implemented:

```typescript
// ExtractionAgent.ts - Simplified prompt
const prompt = `RESPOND WITH ONLY JSON - NO OTHER TEXT!
Extract data about: "${context.query}"
JSON format: {"items": [{"content": "what you found", "value": "number"}]}
ONLY JSON!`;

// ExtractionAgent.ts - Fallback extraction
private fallbackTextExtraction(): ExtractedItem[] {
  // Pattern matching for times, metrics, performance data
  const patterns = [
    /(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/gi,
    /(\d+\.?\d*[kmKM]?)\s*(tokens?\/s(?:ec)?|tok\/s)/gi
  ];
  // Extract using regex when JSON fails
}

// ResearchOrchestrator.ts - Multi-agent fallback
try {
  const answer = await multiAgent.research(query, sources);
} catch (multiAgentError) {
  console.log('🔄 Falling back to direct LLM synthesis');
  // Use old synthesis method
}
```

## Implementation Plan

### CURRENT PRIORITY: Fix Synthesis Garbage Output

**Step 1: Simplify Synthesis Prompt (URGENT)**
- Replace 3957-character complex prompt with simple extraction template
- Focus specifically on Tyler's speed run data patterns
- Remove complex reasoning requirements

**Step 2: Reduce Context Overload**  
- Limit RAG sources from 15 → 3 most relevant
- Prevent information confusion for small LLM
- Keep only highest similarity matches

**Step 3: Add Anti-Repetition Guards**
- Explicit prompt instructions against repetitive text
- Pattern detection to break repetition loops
- Output validation to catch garbage before display

### COMPLETED IMPLEMENTATIONS ✅
- ✅ Race condition prevention with Set-based deduplication
- ✅ JSON parsing with `<think>` tag support
- ✅ RAG search restoration (15 sources found successfully)
- ✅ Research orchestration flow (all 6 steps completing)

## Testing Strategy

### Test Case 1: Race Condition Prevention
- Perform rapid successive research queries
- Monitor console for React key duplication warnings
- Verify step states remain consistent

### Test Case 2: Research Quality
- Test with various query types and complexities
- Validate output formatting and accuracy
- Check for malformed text or corruption

### Test Case 3: Edge Cases
- Test with long-running research processes
- Validate behavior during network issues
- Test step expansion/collapse functionality

## Success Metrics

1. **Zero React Console Errors**: No key duplication warnings
2. **Clean Research Output**: No malformed text or corruption
3. **Accurate Results**: Relevant and properly formatted information
4. **Stable UI**: No visual glitches or state inconsistencies
5. **Performance**: Fast, responsive research process

## Files to Modify

1. `src/components/DeepResearch/hooks/useResearch.ts` - Step management fixes
2. `src/lib/ResearchOrchestrator.ts` - Quality improvements (if needed)
3. `src/lib/RAGToolSystem.ts` - RAG retrieval enhancements (if needed)
4. `src/components/DeepResearch/components/ResearchSteps.tsx` - Render safeguards

## Risk Assessment

**High Risk**: Race condition affects user experience significantly
**Medium Risk**: Research quality impacts core functionality value
**Low Risk**: Implementation changes are isolated and testable

## Acceptance Criteria

**NEW IMPLEMENTATION ✅**:
- [x] **Simplified prompts** for small LLM model compatibility
- [x] **Robust JSON parsing** with multiple extraction strategies
- [x] **Fallback mechanisms** when JSON parsing fails
- [x] **Better error logging** for debugging LLM responses
- [x] **Graceful degradation** to direct synthesis when multi-agent fails

**REMAINING TASKS**:
- [ ] **Test with Tyler's blog query** to verify extraction works
- [ ] **Validate fallback extraction** produces meaningful results
- [ ] **Consider simpler agent pipeline** for small models
- [ ] **Test with larger models** to ensure compatibility

**COMPLETED ✅**:
- [x] Zero React key duplication console errors during research
- [x] RAG search finding relevant sources (15 with 0.364 avg similarity)
- [x] JSON parsing handling LLM `<think>` tags properly
- [x] Research orchestration completing all steps
- [x] UI remains stable throughout research process
- [x] Multi-agent system integrated with fallbacks

---

**Priority**: HIGH - Multi-agent system needs to work reliably with small models. The implemented fixes should help, but may need further simplification for qwen3:0.6b.