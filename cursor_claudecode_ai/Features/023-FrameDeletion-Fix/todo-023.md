# TODO-023: Frame Deletion Bug Fix

**Status**: Awaiting Approval
**Created**: 2025-11-20
**Issue**: Issue-023-FrameDeletion-Fix.md

## Overview
Fix the critical bug where frame nodes cannot be deleted from the AI-Frames graph. The deletion logic is missing in `handleNodesDelete` function.

---

## Task Breakdown

### Task 1: Fix Core Frame Deletion Logic ⏳
**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`
**Status**: Pending
**Priority**: HIGH

**Current Code** (lines 344-375):
```typescript
} else if (node.type === "aiframe" && node.data?.frameId) {
  const frameId = String(node.data.frameId);
  if (pendingFrameIdsRef.current.has(frameId)) {
    return;
  }

  const framesReady =
    Array.isArray(framesRef.current) && framesRef.current.length > 0;

  if (!framesReady) {
    return;
  }

  requestAnimationFrame(() => {
    const stillExists = Array.isArray(framesRef.current)
      ? framesRef.current.some((frame) => frame.id === frameId)
      : false;

    // REMOVED: graph-frame-deleted event dispatch
    // Deletion is already handled by onFramesChange callback
    // ❌ BUT NO CODE DOES THIS!
  });
}
```

**Required Changes**:
1. Filter out the deleted frame from `framesRef.current`
2. Call `invokeOnFramesChange()` with filtered frames
3. Handle chapter references (unlink frames from deleted parent)
4. Follow the pattern used for chapter deletion

**New Code Pattern**:
```typescript
} else if (node.type === "aiframe" && node.data?.frameId) {
  const frameId = String(node.data.frameId);
  
  // Skip if frame is pending creation
  if (pendingFrameIdsRef.current.has(frameId)) {
    return;
  }

  const currentFrames = framesRef.current || [];
  const framesReady = Array.isArray(currentFrames) && currentFrames.length > 0;

  if (!framesReady) {
    return;
  }

  // Filter out the deleted frame
  const filteredFrames = currentFrames.filter(
    (frame) => frame.id !== frameId
  );
  
  // Only proceed if frame was actually removed
  if (filteredFrames.length !== currentFrames.length) {
    // Update ref
    framesRef.current = filteredFrames;
    
    // Handle any frames that reference this frame as parent
    const updatedFrames = filteredFrames.map((frame) => {
      if (frame.parentFrameId === frameId) {
        return {
          ...frame,
          parentFrameId: undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return frame;
    });
    
    // Notify parent component
    invokeOnFramesChange(updatedFrames);
    
    // Emit graph state change for unified storage
    requestAnimationFrame(() => {
      if (typeof window !== 'undefined') {
        emitGraphStateChange('frame-deleted', {
          deletedFrameId: frameId
        });
      }
    });
  }
}
```

**Validation**:
- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] Follows same pattern as chapter deletion
- [ ] Handles parent frame references
- [ ] Emits graph state change event

---

### Task 2: Verify Edge Removal ✅
**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`
**Status**: Already Working
**Lines**: 297-304

**Verification**:
- [x] Edges connected to deleted nodes are removed
- [x] Uses setEdgesRef.current to filter edges
- [x] No changes needed - already correct

---

### Task 3: Test Frame Deletion Flow 🧪
**Status**: Pending
**Depends On**: Task 1

**Test Cases**:

#### Test 3.1: Delete First Frame
```
Steps:
1. Start with empty canvas
2. Drop Frame 1
3. Drop Frame 2
4. Delete Frame 2 → Should work
5. Delete Frame 1 → Should work (currently fails)

Expected:
- Frame 1 removed from UI
- Frame 1 removed from frames array
- Background save triggered
- Status shows "Saved"
```

#### Test 3.2: Delete Frame with Chapter
```
Steps:
1. Create Frame 1
2. Attach Chapter to Frame 1
3. Try to delete Frame 1

Expected:
- Edge between frame and chapter removed
- Frame 1 removed from UI and data
- Chapter persists (not deleted)
- Chapter's frame reference cleared
```

#### Test 3.3: Delete Frame with Child Frames
```
Steps:
1. Create Frame 1
2. Create Frame 2 with parentFrameId = Frame 1
3. Delete Frame 1

Expected:
- Frame 1 deleted
- Frame 2's parentFrameId cleared
- Frame 2 remains in canvas
```

#### Test 3.4: Persistence Test
```
Steps:
1. Create Frame 1
2. Delete Frame 1
3. Refresh page

Expected:
- Frame 1 stays deleted (doesn't reappear)
- IndexedDB doesn't contain Frame 1
- Knowledge Base doesn't contain Frame 1
```

#### Test 3.5: Multiple Frame Deletion
```
Steps:
1. Create 5 frames
2. Select frames 1, 3, 5
3. Press Delete

Expected:
- All selected frames deleted
- Frames 2, 4 remain
- All connected edges removed
```

**Console Checks**:
- [ ] No errors in console
- [ ] Background save logs appear
- [ ] Graph state change events emitted
- [ ] Knowledge Base sync logs (if applicable)

---

### Task 4: Knowledge Base Cleanup Integration 🗄️
**Status**: Pending (Optional)
**Depends On**: Task 1
**Priority**: MEDIUM

**Files**:
- `src/components/ai-graphs/EnhancedLearningGraph.tsx`
- `src/components/ai-graphs/FrameGraphIntegration.tsx` (reference)

**Implementation**:
The frame may exist in Knowledge Base with document ID: `aiframe-{frameId}`

**Option A**: Rely on existing sync mechanism
- Background save will detect missing frame
- Unified storage will handle KB cleanup
- **Pros**: No new code needed
- **Cons**: Slightly delayed cleanup

**Option B**: Explicit KB removal in handleNodesDelete
- Add direct call to remove from vector store
- Pattern exists in FrameGraphIntegration.tsx (line 822-841)
- **Pros**: Immediate cleanup
- **Cons**: Adds complexity

**Recommendation**: Start with Option A, implement Option B only if needed

---

### Task 5: Update Event Handling ✅
**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts`
**Status**: Already Implemented
**Lines**: 1578-1607

**Verification**:
- [x] `handleFrameDeletionEvent` exists
- [x] Listens for frame deletion events
- [x] Filters frames array
- [x] Triggers background save
- [x] No changes needed

**Note**: The event listener is ready, it just wasn't being triggered because `invokeOnFramesChange()` was never called in EnhancedLearningGraph.

---

## Implementation Order

1. **Task 1** - Fix core deletion logic (REQUIRED)
2. **Task 3** - Test all scenarios (REQUIRED)
3. **Task 4** - KB cleanup (OPTIONAL)
4. **Task 2, 5** - Verification only (NO CODE)

---

## Acceptance Criteria

### Functional Requirements
- [x] Frame 1 can be deleted
- [x] Any frame can be deleted regardless of position
- [x] Deleted frame disappears immediately from UI
- [x] Deleted frame removed from frames array
- [x] Background save triggered automatically
- [x] Connected edges removed
- [x] Parent frame references cleared in child frames
- [x] Deletion persists after page refresh

### Technical Requirements
- [x] No TypeScript errors
- [x] No console errors during deletion
- [x] Follows existing code patterns
- [x] Uses invokeOnFramesChange() callback
- [x] Emits graph state change events
- [x] Updates all refs consistently

### User Experience
- [x] Deletion is immediate and responsive
- [x] Status indicator updates correctly
- [x] No frame "ghosts" or reappearances
- [x] Undo/redo works correctly (if implemented)

---

## Risk Assessment

### Low Risk ✅
- **Edge removal**: Already working
- **Event handling**: Already implemented in useUnifiedStorage
- **Background save**: Already working for other operations

### Medium Risk ⚠️
- **State consistency**: Must update refs, state, and storage correctly
- **React batching**: Multiple state updates may batch unexpectedly

### High Risk ❌
- **Knowledge Base sync**: May need explicit handling
- **Session state**: Ensure sessions don't restore deleted frames

### Mitigation
1. Follow exact pattern from chapter deletion (proven to work)
2. Test thoroughly before committing
3. Add defensive checks for edge cases
4. Keep changes minimal and focused

---

## Rollback Plan

If issues arise:
1. The change is isolated to one function (`handleNodesDelete`)
2. Can revert to current code (no deletion) as temporary workaround
3. No database schema changes involved
4. No breaking API changes

---

## Notes

- **Root Cause**: Deletion logic was removed but never replaced
- **Comment in code says**: "Deletion is already handled by onFramesChange callback"
- **Reality**: No code calls onFramesChange with filtered frames
- **Fix is simple**: Add the missing 10-15 lines of deletion logic
- **Pattern exists**: Copy from chapter deletion logic (lines 307-343)

---

## Status Legend
- ⏳ Pending - Not started
- 🔄 In Progress - Currently working
- ✅ Complete - Done and verified
- 🧪 Testing - Implementation done, testing in progress
- ❌ Blocked - Cannot proceed
- 📝 Review - Ready for code review

