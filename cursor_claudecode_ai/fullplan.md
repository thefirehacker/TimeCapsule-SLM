# Full Plan - AI Frames System Issues

## Active Issues

### Issue #003: Unified Storage Integration
**Status**: ✅ Complete  
**Priority**: High  
**Type**: Architecture & Performance  
**Created**: 2025-01-18  
**File**: [cursor_claudecode_ai/issues/Issue-003-Unified-Storage-Integration.md](./issues/Issue-003-Unified-Storage-Integration.md)

**Summary**: 
- Integration of unified storage architecture to replace fragmented storage system
- Test 01 failed due to old storage system still in use - no auto-save indicator shown
- Frames lost on refresh when using "Save on frame" instead of "Save Graph"
- Multiple conflicting storage systems causing data inconsistency

**Impact**: 
- Users can't see when app is saving (no visual feedback)
- Frames lost on refresh without using "Save Graph"
- Poor user experience with uncertain save states
- Data duplication and inconsistency issues

**Solutions Implemented**: 
- Replaced `useFrameStorage` + `useFrameEvents` with `useUnifiedStorage`
- Added real-time auto-save indicator in sidebar (Auto-saving... / Unsaved / Saved)
- Simplified loading logic with single `loadAll()` method
- Exposed unified methods globally for compatibility
- 10-second debounced auto-save with visual feedback
- **CRITICAL FIX**: Added missing event listeners for frame edit events
- Fixed change detection logic to trigger auto-save for new frames
- Reduced logging spam in window interface

**Next Steps**: 
- User testing of integrated unified storage system
- Verify Test 01 now passes with auto-save indicator
- Confirm frame persistence works without "Save Graph"
- Validate clean storage architecture (no old keys)

### Issue #002: Refactor page.tsx - Code Modularization  
**Status**: 🔧 In Progress (Partially Complete)  
**Priority**: Medium  
**Type**: Architecture & Code Quality  
**Created**: 2025-01-18  
**File**: [cursor_claudecode_ai/issues/Issue-002-Page-Refactoring.md](./issues/Issue-002-Page-Refactoring.md)

**Summary**: 
- `src/app/ai-frames/page.tsx` was too bloated and needed modularization
- Large file size affecting maintainability and code organization
- Multiple concerns mixed together (storage, UI, sync, validation)
- Difficult to debug and extend current monolithic structure

**Impact**: 
- Poor code maintainability and readability
- Difficult debugging and testing
- Increased development time for new features
- Higher risk of introducing bugs

**Progress Made**: 
- Created unified storage system (`unifiedStorage.ts`, `useUnifiedStorage.ts`)
- Simplified page.tsx by removing fragmented storage hooks
- Reduced complexity with single storage interface
- Improved type safety and error handling

**Next Steps**: 
- Continue modularization of remaining UI components
- Extract validation logic into separate modules
- Create separate components for dialog management
- Implement proper separation of concerns architecture

### Issue #001: AI Frames Multi-Layer Storage Data Consistency
**Status**: 🔍 Analysis Complete - Implementation Needed  
**Priority**: High  
**Type**: Data Corruption & Storage Architecture  
**Created**: 2025-01-18  
**File**: [cursor_claudecode_ai/issues/Issue-001-MultiLayer-Storage-Consistency.md](./issues/Issue-001-MultiLayer-Storage-Consistency.md)

**Summary**: 
- Frame data corruption during Graph State → TimeCapsule sync
- Manage Knowledge shows partial information (missing graph connections)
- Frame replacement on refresh (f1 replaced by f2 content)
- Data inconsistency across localStorage, VectorStore, and Manage Knowledge

**Impact**: 
- Data loss and UI confusion
- Broken frame workflows
- Incomplete information in Manage Knowledge interface

**Next Steps**: 
- Leverage unified storage system from Issue #003 to fix consistency
- Fix Graph State → TimeCapsule sync corruption
- Implement graph connection preservation in VectorStore
- Create dev mode testing framework for data consistency validation

---

## Issue Template

```
### Issue #XXX: [Title]
**Status**: [🔍 Analysis | 🔧 In Progress | ✅ Complete | ❌ Blocked | 📋 Pending]
**Priority**: [High | Medium | Low]
**Type**: [Bug | Feature | Enhancement | Architecture | Performance | Code Quality]
**Created**: [Date]
**File**: [Link to detailed issue file]

**Summary**: [Brief description]
**Impact**: [User/system impact]
**Next Steps**: [Immediate actions needed]
```
