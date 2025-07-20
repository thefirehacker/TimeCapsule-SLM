# AI-Frames Development Plan

## 🎯 **CURRENT STATUS: UNIFIED STORAGE 80% COMPLETE**

### **📋 Issue #003 TODO Status (2025-01-20)**
- **Total TODOs**: 21 (12 ✅ Complete, 9 📋 Remaining)
- **Phase 1**: ⚠️ **80% COMPLETE** - 3 Critical blockers remain
- **Next Milestone**: TODO-013 Optimistic UI Updates → Issue resolution

## 🔥 **PHASE 1: CRITICAL FOUNDATION (12/15 Complete - 80%)**

### **✅ COMPLETED TODOs (12)**
- [x] **TODO-001**: Remove `retryVectorStoreLoad` corrupting frames ✅
- [x] **TODO-002**: Fix stale closure in `handleFrameUpdate` ✅
- [x] **TODO-003**: Implement unified storage architecture ✅
- [x] **TODO-004**: Add auto-save visual indicators ✅
- [x] **TODO-005**: Fix frame edit event capture ✅
- [x] **TODO-006**: Implement dynamic property merging ✅
- [x] **TODO-007**: Fix VectorStore schema compliance ✅
- [x] **TODO-008**: Prevent frame blinking during drag ✅
- [x] **TODO-009**: Optimize auto-save performance ✅
- [x] **TODO-010**: Fix save operation state management ✅
- [x] **TODO-011**: Add comprehensive error logging ✅
- [x] **TODO-012**: Fix race condition in node deletion ✅

### **🔥 CRITICAL BLOCKERS (3 Remaining)**
- [ ] **TODO-013**: ⭐ **URGENT - Implement Optimistic UI Updates**
  - **Priority**: HIGHEST - Fixes specification violation
  - **Pattern**: Apply Excalidraw's instant UI + background save
  - **Impact**: TC-001 6/6 criteria, Issue #003 resolution
  - **Files**: `useUnifiedStorage.ts`, `EnhancedLearningGraph.tsx`

- [ ] **TODO-014**: **Fix Frame-Node Synchronization After Load**
  - **Dependency**: TODO-013 (optimistic updates will resolve this)
  - **Files**: `useUnifiedStorage.ts:169-218`

- [ ] **TODO-015**: **Implement Event-Driven State Management**
  - **Requirement**: "Event-driven updates, Google Docs broadcast pattern"
  - **Pattern**: Operation dispatch → reducer → broadcast

## 🚀 **PHASE 2: ENHANCED FEATURES (0/4 Complete)**
- [ ] **TODO-016**: Smart batching system (80% VectorStore reduction)
- [ ] **TODO-017**: Undo/redo functionality (Ctrl+Z/Y, 50 changes)
- [ ] **TODO-018**: Position preservation (exact layout restoration)
- [ ] **TODO-019**: Connection persistence (no refresh delay)

## 🔮 **PHASE 3: AI & EXTENSIBILITY (0/2 Complete)**
- [ ] **TODO-020**: AI headless frame operations
- [ ] **TODO-021**: Dynamic frame type creation

## 🔥 **CRITICAL INSIGHT: SPECIFICATION WAS CORRECT**

### **Implementation Flaw: Backwards Save Pattern**
**Our Specification Said**: ✅ `"instant UI updates" + "debounced saves"`  
**What We Implemented**: ❌ `await save → then update UI` (blocking)  
**What Excalidraw Does**: ✅ `update UI instantly → background save`  

```typescript
// ❌ CURRENT: Blocking saves
await unifiedStorage.saveAll(frames);
setFrames(frames); // User waits

// ✅ REQUIRED: Instant UI
setFrames(frames); // Instant response
queueBackgroundSave(frames); // Non-blocking
```

## 📊 **SUCCESS METRICS**

### **Current TC-001 Compliance**: 3/6 ❌
- ✅ Frame appears after refresh
- ❌ Title shows stale data  
- ❌ Goal shows stale data
- ❌ Context shows stale data
- ✅ Auto-save indicator works
- ✅ Load messages correct

### **Target After TODO-013**: 6/6 ✅
- All criteria pass with optimistic updates

## 🎯 **IMMEDIATE NEXT STEPS**

### **PRIORITY FOCUS**
**IMMEDIATE**: TODO-013 (Optimistic UI Updates)  
**NEXT SESSION**: Phase 1 completion → Issue resolution  
**SUCCESS**: TC-001 passes 6/6 criteria  

### **Expected Impact**: 
- User types "f1" → sees instantly → refresh → still "f1"
- Full specification compliance achieved
- Issue #003 **RESOLVED**

---

**Next Session Goal**: Implement optimistic UI updates → achieve 100% TC-001 compliance → Issue #003 **RESOLVED**
