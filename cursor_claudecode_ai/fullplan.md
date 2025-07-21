# Full Plan - AI Frames System Issues

## Active Issues

### Issue #003: Unified Storage Integration
**Status**: ⚠️ **PHASE 1 - 80% COMPLETE** (12/21 TODOs, 3 critical remain)  
**Priority**: HIGH - Next session resolution target  
**Type**: Architecture & Performance  
**Created**: 2025-01-18  
**Updated**: 2025-01-20  
**File**: [cursor_claudecode_ai/issues/Issue-003-Unified-Storage-Integration.md](./issues/Issue-003-Unified-Storage-Integration.md)

**Current Status**: 
- **Foundation Solid**: Unified storage architecture, auto-save indicators, dynamic properties all working
- **Critical Insight**: Specification was CORRECT - implementation was backwards 
- **Root Issue**: Synchronous saves blocking UI instead of optimistic updates (Excalidraw pattern)
- **TC-001 Compliance**: 3/6 criteria passing, frame-node sync issues remain

**Remaining Critical Blockers**: 
- **TODO-013**: Implement optimistic UI updates (instant UI + background saves)
- **TODO-014**: Fix frame-node synchronization after load  
- **TODO-015**: Implement event-driven state management

**Next Session Goal**: 
- Apply Excalidraw pattern: `setFrames(data)` → instant UI, `queueSave(data)` → background
- Expected: User types "f1" → sees instantly → refresh → still "f1"
- Target: TC-001 passes 6/6 criteria → Issue #003 RESOLVED
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

### Issue #004: Attachment Change Detection Fix
**Status**: ✅ RESOLVED  
**Priority**: HIGH  
**Type**: Bug Fix  
**Created**: 2025-01-18  
**File**: [cursor_claudecode_ai/issues/Issue-004-Attachment-Change-Detection.md](./issues/Issue-004-Attachment-Change-Detection.md)

**Summary**: 
- Fixed missing event listener for attachment property changes in unified storage system
- User workflow: create frame → attach note → change note name → save status incorrect
- Root cause: useUnifiedStorage.ts missing listener for attachment-node-updated events
- Attachment changes were silently lost while showing false "saved" status

**Impact**: 
- Eliminated data loss for attachment modifications (note names, content changes)
- Fixed misleading save status indicators that showed "saved" when changes were lost
- Improved user trust with accurate feedback on save operations
- Enhanced debugging capabilities with comprehensive logging

**Solution Implemented**: 
- Added handleAttachmentNodeUpdatedEvent function to capture attachment changes
- Registered attachment-node-updated event listener in useUnifiedStorage.ts
- Enhanced logging to show frame state before force save operations
- Verified fix handles text, video, and PDF attachment property changes

**Next Steps**: 
- ✅ Fix verified and ready for user testing
- Monitor attachment workflows across all attachment types
- User validation of save behavior for note name changes

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

### Issue #003: Unified Storage Integration - TODO Implementation  
**Status**: 🔥 CRITICAL - Frame Content Corruption Active  
**Priority**: URGENT  
**Type**: Architecture & Performance  
**Created**: 2025-01-18  
**File**: [cursor_claudecode_ai/Specs/Specs-Issue-003-Unified-Storage-Integratio.md](./Specs/Specs-Issue-003-Unified-Storage-Integratio.md)

**Summary**: 
- Critical TODO implementation roadmap extracted from comprehensive specifications
- Frame-node synchronization broken despite successful storage operations
- TC-001 compliance failing 3/6 criteria with UI inconsistency
- 19 TODO items across 4 phases from critical fixes to production readiness

**Impact**: 
- User sees mixed state with incorrect node titles while frame data is correct
- Loss of user trust due to inconsistent UI behavior
- Blocking all advanced features until critical path resolved
- Production deployment blocked until specification compliance achieved

**Current Phase**: 
- **Phase 1 (Critical)**: 3 TODOs completed, 3 TODOs pending
- **Phase 2-4**: 13 TODOs waiting for Phase 1 completion
- **Immediate Focus**: TODO-004, TODO-005, TODO-006 implementation

**Next Steps**: 
- User approval required for TODO implementation
- Fix frame-node sync during load operations
- Achieve TC-001 complete compliance (6/6 criteria)
- Progress to Phase 2 system hardening
