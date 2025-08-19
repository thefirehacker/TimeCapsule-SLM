# PlanningAgent System Analysis & Refinement

## Questions

### Q1: Document Filtering Capability
**Query**: When PlanningAgent detects entity mismatch ("Tyler's blog" but includes Amardeep CV), does system know which specific document causes this and can it filter out docs without LLM call?

**Analysis**: 
- ✅ **System CAN identify specific problematic documents** - validation logic analyzes each document individually and logs exactly which document causes mismatch
- ✅ **System HAS document filtering capability** - `applyDocumentCorrections()` method exists to remove documents from pipeline 
- ❌ **Current flow doesn't USE filtering capability** - instead sends guidance to PatternGenerator (wrong target)

### Q2: Validation Architecture 
**Query**: Are validations and guidance hardcoded or purely agentic?

**Analysis**: **HYBRID "Structured Agentic" Architecture**
- **Structured Elements**: Universal regex patterns (`/\b([A-Z][a-z]+)'s\s+(.+)/`) - no entity hardcoding
- **Agentic Elements**: LLM content analysis, semantic reasoning, ownership detection
- **Zero Hardcoding**: No "Tyler" hardcoded anywhere - patterns work for any possessive query

## Current System Issues

### Issue 1: Wrong Replanning Target
- **Problem**: DataInspector document filtering issues sent to PatternGenerator
- **Evidence**: `{target: 'PatternGenerator', guidance: 'Apply strict semantic entity-query alignment'}`
- **Root Cause**: `createSessionSpecificGuidance()` hardcodes all replanning to target PatternGenerator

### Issue 2: Unused Document Filtering Capability
- **Problem**: System has `applyDocumentCorrections()` but doesn't use it
- **Impact**: Wrong documents remain in pipeline despite detection
- **Solution**: Call document filtering instead of replanning when entity mismatches detected

### Issue 3: PlanningAgent Over-Validation 
- **Problem**: Validates every single agent (DataInspector, PatternGenerator, Extractor, SynthesisCoordinator)
- **Impact**: 4+ validation calls per query, cascade failures, UI clutter
- **User Solution**: Strategic validation only (after DataInspector, after Extractor, after final report)

### Issue 4: DataInspector Parsing Bug
- **Problem**: `const isRelevant = relevantText.toUpperCase().includes('YES')` extracts wrong part of LLM response
- **Evidence**: LLM says "unrelated" but parsing finds "YES" in different context
- **Impact**: Wrong documents marked as relevant at source

## System Capabilities Analysis

### ✅ Architecture Strengths
1. **Document-level mismatch detection** - knows exactly which document causes issues
2. **Universal validation patterns** - works for any entity, not hardcoded
3. **Agentic content understanding** - LLM analyzes semantic meaning
4. **Document filtering capability** - can remove wrong documents deterministically

### ❌ Current Execution Gaps
1. **Wrong agent targeting** - DataInspector problems sent to PatternGenerator
2. **Unused filtering logic** - capability exists but not triggered
3. **Excessive validation frequency** - validates every agent completion
4. **Source parsing bugs** - wrong document inclusion at DataInspector level

# Simple Todo List

## Critical Fixes
- [ ] Fix DataInspector relevance parsing bug (`extractValue()` method)
- [ ] Add DataInspector replanning case to `createSessionSpecificGuidance()`
- [ ] Trigger document filtering when entity mismatches detected
- [ ] Implement strategic validation approach (user proposed)

## Architecture Improvements  
- [ ] Add document filtering logic to validation failures
- [ ] Fix replanning target selection (DataInspector issues → DataInspector, not PatternGenerator)
- [ ] Reduce validation frequency to strategic checkpoints only
- [ ] Add "good enough" completion criteria to prevent cascade failures

## Testing
- [ ] Test with Tyler's blog + Amardeep CV to verify document filtering
- [ ] Verify strategic validation reduces cascade failures
- [ ] Confirm entity parsing works for different possessive queries