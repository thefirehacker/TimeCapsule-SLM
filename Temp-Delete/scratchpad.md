# 2025-11-06 Update – why the new fix works

## Frames finally stay deleted in the graph
- **Root cause (confirmed in logs):** after we removed the frame node from React Flow, the “initialGraphState merge” effect instantly re-added anything that was still present in the last saved snapshot. Because that snapshot still contained the deleted frame, we would get a resurrection before the cleanup effect had another chance to run.
- **Fix:** during the merge we now gate every candidate node against the live `frames` array. If a frame ID is no longer present we skip both the frame node and any attachment node that points at it. We also trim edges to match the surviving nodes and log what was merged.
- **Evidence:** deleting Frame 2 (“Test 01”) no longer emits a `🧪 Graph merge…` log, meaning the merge skipped rehydration entirely. The background save immediately afterwards shows `nodeCount: 1` and the graph stays clean without a refresh.

## Still to do
- Attachment/notes deletion (“Test 02”) still replays the old attachment node. The merge log now shows it: `EnhancedLearningGraph.tsx:1381 🧪 Graph merge from initialGraphState {... appendedNodeIds: ['node_…'], skippedFrameIds: []}`, which tells us an attachment node is re-added even though the frame itself survives without the attachment. We need to extend the guard so attachments only merge when the frame still advertises that attachment ID.
- Chapter deletions behave the same way—the merge has no knowledge of the updated `chapters` array yet. We should cross-check the incoming nodes against live chapter IDs before rehydrating them.

# Frame Deletion Bug - Complete Analysis

## THE CORE ISSUE
When deleting a frame/attachment node:
- ✅ **Deleted from linear view** immediately
- ✅ **Deleted from storage** (IndexedDB & VectorStore persist correctly)
- ❌ **NOT deleted from graph view** until page refresh
- ✅ **Regular nodes work fine**, only frame/attachment nodes fail

## FILES MODIFIED
1. `src/app/ai-frames/hooks/useUnifiedStorage.ts`
2. `src/components/ai-graphs/EnhancedLearningGraph.tsx`

---

## ALL ATTEMPTS MADE (Chronological)

### Attempt 1: Remove Duplicate Save (useUnifiedStorage.ts ~line 1421)
**Change:** Removed `queueBackgroundSave` from `handleFrameDeletionEvent`
**Result:** ❌ Deletion didn't work at all
**Why Failed:** Frame data never saved

### Attempt 2: Remove Duplicate Event Listener (useUnifiedStorage.ts 1600-1615)
**Change:** Removed duplicate `force-save-frames` listener
**Result:** ❌ Still didn't work
**Why Failed:** Not the root cause

### Attempt 3: Add Frame Filtering in handleForceSaveEvent (useUnifiedStorage.ts 1369-1399)
**Change:** Added logic to filter frames based on graph nodes
**Result:** ❌ BROKE APP - deleted ALL frames
**Why Failed:** Graph state was empty (nodeCount: 0), filtered out everything

### Attempt 4: Add Safety Check for Empty Graph (useUnifiedStorage.ts 1372)
**Change:** Only filter if `eventGraphState.nodes.length > 0`
**Result:** ❌ Nothing got deleted at all
**Why Failed:** Graph state always empty during deletion, skip condition always triggered

### Attempt 5: Restore Save in Deletion Handler (useUnifiedStorage.ts 1454-1455)
**Change:** Added back `queueBackgroundSave` in `handleFrameDeletionEvent`
**Result:** ⚠️ Frames deleted from storage but graph still showed nodes
**Why Failed:** Saved stale graph state with wrong node count (nodeCount: 2 when should be 1)

### Attempt 6: Add Node Filtering in Graph useEffect (EnhancedLearningGraph.tsx 1563-1585)
**Change:** Added `.filter()` to remove nodes without matching frames
**Result:** ❌ No change - nodes still visible
**Why Failed:** Selected node check blocked filtering from running

### Attempt 7: Remove Selected Check & Use Fresh Nodes (EnhancedLearningGraph.tsx 1543, 1556-1557)
**Change:** Used `reactFlowInstance.getNodes()`, removed `selected` node early exit
**Result:** ❌ Infinite loop error - Maximum update depth exceeded
**Why Failed:** useEffect triggered itself repeatedly, added `reactFlowInstance` to dependencies

### Attempt 8: Add Re-Entry Guard (EnhancedLearningGraph.tsx 93, 1542-1544)
**Change:** Added `isFilteringNodesRef` to prevent re-entry, removed `reactFlowInstance` from dependencies
**Result:** ❌ Still didn't work
**Why Failed:** Skip conditions too strict, prevented filtering

### Attempt 9: Remove Skip Conditions (EnhancedLearningGraph.tsx 1571-1576)
**Change:** Removed `needsFiltering` and `needsDataUpdate` early exit checks
**Result:** ❌ STILL NOT WORKING
**Why Failed:** Unknown - useEffect not running or not taking effect

---

## CURRENT CODE STATE

### useUnifiedStorage.ts
```typescript
// Line 1454-1455: Saves immediately on deletion
handleFrameDeletionEvent() {
  // ... updates frames array ...
  setHasUnsavedChanges(true);
  queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateRef.current);
}

// Line 1369-1373: Simple save, no filtering
handleForceSaveEvent() {
  setHasUnsavedChanges(true);
  queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateToUse, isPriorityMode);
}
```

### EnhancedLearningGraph.tsx
```typescript
// Line 93: Guard ref
const isFilteringNodesRef = useRef<boolean>(false);

// Line 1540-1679: useEffect with filtering
useEffect(() => {
  if (isFilteringNodesRef.current) return; // Re-entry guard

  if (frames.length > 0 && reactFlowInstance) {
    const currentNodes = reactFlowInstance.getNodes(); // Fresh nodes
    if (currentNodes.length === 0) return;

    const isDragging = currentNodes.some(node => node.dragging);
    if (isDragging) return;

    // NO selected node check
    // NO skip conditions

    const frameIds = new Set(frames.map(f => f.id));
    isFilteringNodesRef.current = true;

    const updatedNodes = currentNodes
      .filter(/* remove nodes without matching frames */)
      .filter(/* remove attachments without parent frames */)
      .map(/* update node data from frames */);

    if (hasChanges) {
      setNodes(updatedNodes);
    }

    setTimeout(() => { isFilteringNodesRef.current = false; }, 100);
  }
}, [frames]); // Only depends on frames
```

---

## LOGS ANALYSIS (Latest Deletion Attempt)

**Line 33:** Frame deletion event detected
```
🗑️ Frame deletion event detected: {frameId: 'frame-1762449712263-z02wmhi1r', deletedFrameIds: Array(1)}
```

**Line 44:** CRITICAL - Save with wrong node count
```
🔄 BACKGROUND SAVE: Starting with data: {
  frameCount: 1,     // ✅ Correct (frame deleted)
  nodeCount: 2,      // ❌ WRONG (should be 1)
  edgeCount: 0,
  frameIds: Array(1)
}
```

**Line 59-62:** VectorStore deletion succeeds
```
✅ Document deleted successfully: aiframe-frame-1762449712263-z02wmhi1r
```

**Line 74:** Another save with wrong node count
```
🔄 BACKGROUND SAVE: Starting with data: {
  frameCount: 1,     // ✅ Correct
  nodeCount: 2,      // ❌ STILL WRONG
  edgeCount: 1
}
```

---

## THE SMOKING GUN

The graph state being saved has **stale node data**:
- `frameCount: 1` ✅ (frames array updated correctly)
- `nodeCount: 2` ❌ (React Flow nodes NOT updated)

This means:
1. Frame is removed from `frames` array ✅
2. Frame document deleted from VectorStore ✅
3. BUT: Node is NOT removed from React Flow's nodes array ❌
4. Graph state saved with 2 nodes
5. On refresh, loads graph state with 2 nodes, shows deleted node

---

## WHY THE useEffect ISN'T WORKING

**Hypothesis 1: useEffect Not Running**
- The useEffect depends on `[frames]`
- When `frames` prop changes, useEffect should run
- But there's NO console.log output from the useEffect in the logs
- This suggests the useEffect is **NOT running at all**

**Hypothesis 2: reactFlowInstance Not Available**
- The useEffect checks `if (frames.length > 0 && reactFlowInstance)`
- If `reactFlowInstance` is null/undefined when frames update, it exits
- But `reactFlowInstance` is not in dependencies, so might be stale closure

**Hypothesis 3: setNodes() Not Taking Effect**
- The useEffect might be running and calling `setNodes()`
- But React Flow might be ignoring it or overwriting it
- OR another effect is running after and restoring old nodes

---

## NEXT STEPS TO DEBUG

### Option 1: Add Comprehensive Logging
Add console.logs to see what's actually happening:
```typescript
useEffect(() => {
  console.log('🔍 FILTER EFFECT RUNNING', {
    framesLength: frames.length,
    hasReactFlow: !!reactFlowInstance,
    isFiltering: isFilteringNodesRef.current
  });

  if (isFilteringNodesRef.current) {
    console.log('⏸️ Skipped - already filtering');
    return;
  }

  if (frames.length > 0 && reactFlowInstance) {
    const currentNodes = reactFlowInstance.getNodes();
    console.log('📊 Current state', {
      currentNodesLength: currentNodes.length,
      framesLength: frames.length,
      frameIds: frames.map(f => f.id),
      nodeFrameIds: currentNodes.filter(n => n.type === 'aiframe').map(n => n.data?.frameId)
    });

    // ... rest of logic ...
  } else {
    console.log('⏸️ Skipped - conditions not met');
  }
}, [frames]);
```

### Option 2: Force Re-Render with reactFlowInstance Dependency
Add `reactFlowInstance` back to dependencies but with additional guards:
```typescript
}, [frames, reactFlowInstance]);
```

### Option 3: Use Different Approach - Listen to frames Changes Directly
Instead of relying on useEffect, trigger node filtering when frames state setter is called.

---

## TEMPORARY WORKAROUND

Until fixed, users can:
1. Delete frame → appears deleted in linear view
2. Refresh page → graph view updates correctly
3. Frame stays deleted permanently

The storage works correctly, only the real-time UI update fails.
