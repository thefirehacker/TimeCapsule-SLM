# Plan for Document Grounding & Knowledge Base Enhancement

## 🚨 CRITICAL ISSUES (Must Fix First)

### Issue A: Document Filtering Bypass - CRITICAL PRIORITY
**Problem**: DataInspector receives ALL 11 documents instead of only userdocs
**Root Cause**: `getDocumentMetadata()` calls unfiltered `getAllDocuments()` - different code path than our fixed `getAllChunks(['userdocs'])`
**Impact**: Document contamination affects analysis quality

**Technical Fix Needed**:
- Add `documentTypes` parameter to `getDocumentMetadata()` method
- Update ResearchOrchestrator to call `getDocumentMetadata(['userdocs'])`
- Two paths exist: Path 1 (broken) uses getDocumentMetadata(), Path 2 (fixed) uses getAllChunks()

### Issue B: UI Progress Updates Overwritten - HIGH PRIORITY  
**Problem**: Progress updates work but get overwritten - only latest shown instead of cumulative
**Evidence**: "Analyzing document 10 of 11(9/11 items)" shows updates work but steps 1-9 disappear
**Impact**: Users lose visibility of progress history

**Technical Fix Needed**:
- Show cumulative progress or maintain progress history with timestamps
- UI component overwrites previous progress instead of accumulating

### Issue C: WebSearch Toggle Ignored - MEDIUM PRIORITY
**Problem**: WebSearch executes when disabled in UI toggle
**Impact**: Unwanted searches, performance issues, user preferences ignored

**Technical Fix Needed**:
- Pass UI toggle state to ResearchOrchestrator
- WebSearchAgent should check enableWebSearch config before executing

---

## 📋 PHASE 5: SYSTEM INTEGRATION (After Critical Fixes)

### Task 5: Integrate Enhanced Components with Live System
- 5.1: Replace DeepResearch KnowledgeBaseManager with EnhancedKnowledgeBaseManager
- 5.2: Connect ChunkViewerModal to multi-agent synthesis results
- 5.3: Integrate WebSourceManager with WebSearchAgent virtual-docs
- 5.4: Add SourcesPanel to main research interface
- 5.5: Test component integration with real VectorStore data
- 5.6: Verify chunk navigation works with extracted content
- 5.7: Test web source attribution displays correctly
- 5.8: Validate bulk operations with live document collections

### Task 6: Comprehensive Testing & Validation
- 6.1: Unit testing for all 6 components
- 6.2: Integration testing with multi-agent results
- 6.3: Performance testing with large document collections (100+ docs)
- 6.4: Mobile responsiveness validation
- 6.5: Accessibility compliance testing

---

## ✅ COMPLETED: PHASE 4 - USER EXPERIENCE ENHANCEMENT

**6 Enhanced Components Already Built** (No TODO items needed):
- SourcesPanel.tsx, ChunkViewerModal.tsx, ChunkCard.tsx  
- EnhancedKnowledgeBaseManager.tsx, WebSourceCard.tsx, WebSourceManager.tsx
- Complete documentation and 40+ advanced features implemented

---

## 🎯 CURRENT STATUS

**Overall Progress**: 55% Complete
- ✅ Phase 1-3: Multi-Agent Foundation (COMPLETED)
- ✅ Phase 4: User Experience Enhancement (COMPLETED)
- ✅ Critical Bugs Fixed: Document filtering + WebSearchAgent registry (COMPLETED)
- 📊 1 Bug Remaining: UI Progress Updates (HIGH priority)
- ⏳ Phase 5: System Integration & Testing (NEXT)

**Success Criteria for Next Phase**:
- ✅ Document filtering fixed (DataInspector gets only userdocs)
- ✅ WebSearchAgent registry errors resolved (LLM only calls registered agents)
- [ ] UI shows real-time agent progress (not generic loading)
- [ ] All 6 components integrated with live system
- ✅ No regressions in existing multi-agent functionality

**Dependencies Ready**:
- VectorStore access ✅
- Multi-agent results ✅
- 6 enhanced components ✅
- TypeScript interfaces ✅

---

## 🔄 EXECUTION STRATEGY

1. **CRITICAL FIXES FIRST**: Address document filtering and UI progress issues
2. **INCREMENTAL INTEGRATION**: Test one component at a time
3. **ROLLBACK READY**: Original components preserved for fallback
4. **PERFORMANCE MONITORING**: Track system performance during integration