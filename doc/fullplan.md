# Full Plan - AI Frames System Issues

## Active Issues

### Issue #001: AI Frames Multi-Layer Storage Data Consistency
**Status**: 🔍 Analysis Complete - Implementation Needed  
**Priority**: High  
**Type**: Data Corruption & Storage Architecture  
**Created**: 2025-01-18  
**File**: [doc/issues/Issue-001-MultiLayer-Storage-Consistency.md](./issues/Issue-001-MultiLayer-Storage-Consistency.md)

**Summary**: 
- Frame data corruption during Graph State → TimeCapsule sync
- Manage Knowledge shows partial information (missing graph connections)
- Frame replacement on refresh (f1 replaced by f2 content)
- Data inconsistency across localStorage, VectorStore, and Manage Knowledge

**Critical Requirement**: 
- ⚠️ **MUST NOT BREAK** existing export/import functionality
- Current TimeCapsule export/import is working fine and must be preserved

**Impact**: 
- Data loss and UI confusion
- Broken frame workflows
- Incomplete information in Manage Knowledge interface

**Next Steps**: 
- Fix Graph State → TimeCapsule sync corruption (without breaking export/import)
- Implement graph connection preservation in VectorStore
- Create dev mode testing framework for data consistency validation
- **Test export/import compatibility** after each fix

---

## Issue Template

```
### Issue #XXX: [Title]
**Status**: [🔍 Analysis | 🔧 In Progress | ✅ Complete | ❌ Blocked]
**Priority**: [High | Medium | Low]
**Type**: [Bug | Feature | Enhancement | Architecture]
**Created**: [Date]
**File**: [Link to detailed issue file]

**Summary**: [Brief description]
**Critical Requirements**: [Must-preserve functionality]
**Impact**: [User/system impact]
**Next Steps**: [Immediate actions needed]
``` 