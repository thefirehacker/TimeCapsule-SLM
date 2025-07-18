# Full Plan - AI Frames System Issues

## Active Issues

### Issue #002: Refactor page.tsx - Code Modularization
**Status**: 📋 Pending  
**Priority**: High  
**Type**: Architecture & Code Quality  
**Created**: 2025-01-18  
**File**: [cursor_claudecode_ai/issues/Issue-002-Page-Refactoring.md](./issues/Issue-002-Page-Refactoring.md)

**Summary**: 
- `src/app/ai-frames/page.tsx` is too bloated and needs modularization
- Large file size affecting maintainability and code organization
- Multiple concerns mixed together (storage, UI, sync, validation)
- Difficult to debug and extend current monolithic structure

**Impact**: 
- Poor code maintainability and readability
- Difficult debugging and testing
- Increased development time for new features
- Higher risk of introducing bugs

**Next Steps**: 
- Analyze current page.tsx structure and identify separate concerns
- Create modular components for storage, UI, sync, and validation
- Implement proper separation of concerns architecture
- Test refactored modules to ensure functionality preservation

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
