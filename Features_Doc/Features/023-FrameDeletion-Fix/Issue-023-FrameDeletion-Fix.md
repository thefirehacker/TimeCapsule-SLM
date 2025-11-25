# Issue-023: Frame Deletion Bug Fix

**Created**: 2025-11-20
**Priority**: HIGH
**Type**: Bug Fix
**Component**: AI-Frames Graph

## Problem Statement

Frame nodes (especially the first frame) are not getting deleted from the graph when the user attempts to delete them. The deletion UI interaction occurs, edges are removed, but the frame data persists in the frames array and the node reappears.

## Root Cause Analysis

### Location
File: `src/components/ai-graphs/EnhancedLearningGraph.tsx`
Function: `handleNodesDelete` (lines 344-375)

### The Bug
When an `aiframe` type node is deleted, the code:
1. ✅ Removes connected edges (lines 297-304)
2. ✅ Checks if frame still exists
3. ❌ **NEVER filters the deleted frame from the frames array**
4. ❌ **NEVER calls `invokeOnFramesChange()` with updated frames**

### Code Comparison

**Chapter Deletion (WORKING)** - lines 307-343:
```typescript
const filteredChapters = currentChapters.filter(
  (chapter) => chapter.id !== chapterId
);
if (filteredChapters.length !== currentChapters.length) {
  chaptersRef.current = filteredChapters;
  invokeOnChaptersChange(filteredChapters);  // ✅ Properly calls onChange
}
```

**Frame Deletion (BROKEN)** - lines 344-375:
```typescript
requestAnimationFrame(() => {
  const stillExists = Array.isArray(framesRef.current)
    ? framesRef.current.some((frame) => frame.id === frameId)
    : false;

  // REMOVED: graph-frame-deleted event dispatch
  // Deletion is already handled by onFramesChange callback
  // ❌ BUT NO CODE ACTUALLY CALLS onFramesChange WITH FILTERED FRAMES!
});
```

## User Flow That Fails

1. Drop two frames on canvas
2. Delete second frame → ✅ Works (probably because it's not Frame 1)
3. Try to delete Frame 1 → ❌ Fails - frame persists
4. Attach chapter to Frame 1, delete chapter → ✅ Works
5. Attach chapter, try to delete Frame 1 → ❌ Edge deleted, status "unsaved", frame persists

## Impact

- **Severity**: HIGH - Core CRUD functionality broken
- **User Experience**: Confusing - users can't remove frames, making the app feel broken
- **Data Integrity**: Frames accumulate but can't be removed
- **Workaround**: None - users are stuck with unwanted frames

## Solution Design

### Fix Strategy
Mirror the chapter deletion logic for frame deletion:

1. **Filter out deleted frame** from `framesRef.current`
2. **Call `invokeOnFramesChange()`** with filtered frames array
3. **Remove from Knowledge Base** if synced
4. **Update graph state** to remove associated edges

### Implementation Location
File: `src/components/ai-graphs/EnhancedLearningGraph.tsx`
Function: `handleNodesDelete`, specifically the `aiframe` branch (lines 344-375)

### Code Pattern to Follow
Use the same pattern as chapter deletion but adapted for frames.

## Additional Considerations

### Edge Cases to Handle
1. **Pending Frames**: Skip deletion if frame is in `pendingFrameIdsRef` ✅ (already handled)
2. **Empty Frames Array**: Skip if no frames exist ✅ (already handled)
3. **Connected Edges**: Ensure edges are removed ✅ (already handled at lines 297-304)
4. **Knowledge Base Sync**: Remove from vector store if present
5. **Chapter References**: Update any chapters that reference this frame
6. **Multiple Frames Deleted**: Handle batch deletion

### Knowledge Base Integration
The frame may be synced to Knowledge Base with document ID: `aiframe-{frameId}`
- Need to trigger deletion from vector store
- Use existing `removeFrameFromKnowledgeBase()` pattern from FrameGraphIntegration

### State Consistency
Ensure consistency across:
- `framesRef.current` (React ref)
- `frames` state (via `invokeOnFramesChange`)
- Graph nodes (ReactFlow nodes array)
- Unified storage (via background save)
- Knowledge Base (vector store)

## Testing Plan

### Manual Testing Flow
1. **Basic Frame Deletion**
   - Create frame → Delete frame → Verify removed from UI and data

2. **First Frame Deletion** (reported bug)
   - Create 2 frames → Delete second → Delete first → Verify both removed

3. **Frame with Chapter**
   - Create frame → Attach chapter → Delete frame → Verify both removed

4. **Frame with Attachments**
   - Create frame → Add content attachment → Delete frame → Verify cleaned up

5. **Multiple Frame Deletion**
   - Create 5 frames → Select multiple → Delete → Verify all removed

6. **Persistence Check**
   - Delete frame → Refresh page → Verify frame stays deleted

### Console Checks
- ✅ No errors in console
- ✅ Background save triggered
- ✅ Knowledge Base document removed
- ✅ State logs show frame removed

## Dependencies

### Files to Modify
1. `src/components/ai-graphs/EnhancedLearningGraph.tsx` - Primary fix

### Files to Review (potentially affected)
1. `src/app/ai-frames/hooks/useUnifiedStorage.ts` - Frame deletion event handler
2. `src/components/ai-graphs/FrameGraphIntegration.tsx` - KB removal integration
3. `src/lib/VectorStore.ts` - Document deletion

## Success Criteria

1. ✅ Frame 1 can be deleted successfully
2. ✅ Any frame can be deleted regardless of position
3. ✅ Deleted frame disappears from UI immediately
4. ✅ Deleted frame removed from frames array
5. ✅ Background save triggered automatically
6. ✅ Frame removed from Knowledge Base
7. ✅ Connected edges removed
8. ✅ Status shows "Saved" after deletion completes
9. ✅ Deletion persists after page refresh
10. ✅ No console errors or warnings

## References

- Test logs: `Test/temp/logs.md`
- Session management: Feature 021C-AIFrames-Session.md
- Unified storage: `src/app/ai-frames/hooks/useUnifiedStorage.ts`

