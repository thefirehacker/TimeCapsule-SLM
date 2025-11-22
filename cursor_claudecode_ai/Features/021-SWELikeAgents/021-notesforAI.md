# Duplicate Nodes Issue - AI Flow Builder Accept All

## Issue Summary
When clicking "Accept All" in AI Flow Builder, duplicate nodes appear on the graph:
- **Expected**: 9 nodes (3 chapters + 6 frames)
- **Actual**: 18 nodes (duplicates of everything)
  - 3 duplicate orphan chapters
  - 6 duplicate frames (some showing as "Untitled")
  - Additional orphan attachment nodes

## Root Cause Analysis

### The Problem: Race Condition Between Two Node Creation Paths

There are TWO separate code paths that create nodes in `EnhancedLearningGraph.tsx`:

#### Path 1: Frame-to-Node Auto-Generation (Line 1992)
```typescript
// Only sync if we have frames and no nodes currently displayed
if (frames.length > 0 && nodes.length === 0 && !initialGraphState?.nodes?.length) {
  // Creates nodes from frames prop
  frames.forEach((frame, index) => {
    // Create frame node + attachment node if exists
  });
}
```

#### Path 2: GraphState Merge (Line 1854)
```typescript
// If initialGraphState was provided with nodes, merge them with existing nodes
if (initialGraphState?.nodes?.length) {
  // Skip if already merged (line 1858-1865)
  const alreadyMerged = Array.from(graphStateNodeIds).every(id => existingNodeIds.has(id));
  if (alreadyMerged && nodes.length >= initialGraphState.nodes.length) {
    return;
  }
  // Merge nodes from initialGraphState
  const mergedNodes = [...nodes, ...filteredLoadedNodes];
  setNodes(mergedNodes);
}
```

### The Race Condition

When "Accept All" is clicked in `page.tsx`:

1. **Step 1**: `unifiedStorage.updateFrames(normalized)` is called
   - `frames` prop updates → triggers useEffect at line 1992
   - **At this moment**: `nodes.length === 0` AND `initialGraphState?.nodes?.length` is from OLD state
   - **Condition evaluates to TRUE** (incorrectly)
   - **Result**: Creates 12 nodes (6 frames + 6 attachments)

2. **Step 2**: `unifiedStorage.updateGraphState(flowBuilder.plan.graphState)` is called
   - `initialGraphState` prop updates → triggers useEffect at line 1854
   - **At this moment**: `nodes.length === 12` (from step 1)
   - **Result**: Tries to merge 9 nodes from graphState
   - First merge appends 3 chapter nodes → now 15 nodes total
   - Second merge appends 3 more nodes → now 18 nodes total

### Evidence from Logs (21Nov_09 run)

```
Line 1314: 📦 Accept All: Pushing 6 frames and 3 chapters
Line 1320: frameCount: 6 (correct)
Line 1324: 🧪 Graph merge from initialGraphState 
           {existingNodeCount: 12, appendedNodeIds: Array(3)}
           ❌ Already had 12 nodes before merge!
Line 1335: 🧪 Graph merge from initialGraphState 
           {existingNodeCount: 15, appendedNodeIds: Array(3)}
           ❌ Now 15 nodes, appending 3 more!
Line 1343: nodeCount: 18, frameCount: 6
           ❌ Double the expected nodes!
```

### Why the Current Fix Doesn't Work

The fix at line 1992:
```typescript
if (frames.length > 0 && nodes.length === 0 && !initialGraphState?.nodes?.length)
```

**Fails because**: React state updates are asynchronous. When `frames` prop updates, `initialGraphState` still has its OLD value (from previous render), so the condition `!initialGraphState?.nodes?.length` may still be true when it shouldn't be.

## How SWE Bridge Works Correctly

### SWE Bridge Flow (from `src/app/ai-frames/components/SWEBridge.tsx`)

```typescript
const handlePullAndSync = async () => {
  // 1. Fetch JSON payload from SWE
  const payload = await fetch(url).then(r => r.json());
  
  // 2. Update EVERYTHING in one atomic operation
  unifiedStorage.updateFrames(payload.frames);
  unifiedStorage.updateChapters(payload.chapters);
  unifiedStorage.updateGraphState(payload.graphState);  // ✅ All at once!
  
  // 3. GraphState already has nodes, so merge happens cleanly
};
```

**Why it works**:
- Updates happen in quick succession within same function
- By the time `frames` prop triggers useEffect, `initialGraphState` is already updated (or updating)
- The check `!initialGraphState?.nodes?.length` correctly prevents double creation

## The Correct Solution

### Option 1: Use a Ref to Track GraphState Presence (Recommended)

```typescript
const initialGraphStateRef = useRef<GraphState | null>(null);

// Update ref immediately when prop changes
useEffect(() => {
  if (initialGraphState?.nodes?.length) {
    initialGraphStateRef.current = initialGraphState;
  }
}, [initialGraphState]);

// Use ref in condition (not stale)
if (frames.length > 0 && nodes.length === 0 && !initialGraphStateRef.current?.nodes?.length) {
  // Only create nodes if graphState has NEVER been provided
}
```

### Option 2: Atomic Update in Accept All (Simpler)

Modify `handleAcceptAIFrames` in `page.tsx` to batch updates:

```typescript
const handleAcceptAIFrames = useCallback((frames, plannerChapters) => {
  // Convert frames and chapters
  const normalized = frames.map(convertDraftToFrame);
  const convertedChapters = plannerChapters.map(convertPlannerChapter);
  
  // Get graphState BEFORE updating anything
  const graphState = flowBuilder.plan?.graphState;
  
  // Update in single batch (prevents race)
  unifiedStorage.batchUpdate({
    frames: [...unifiedStorage.frames, ...normalized],
    chapters: [...unifiedStorage.chapters, ...convertedChapters],
    graphState: graphState  // ✅ All at once, like SWE!
  });
}, []);
```

### Option 3: Disable Frame-to-Node Conversion When GraphState Exists

Simplest fix - just never auto-generate nodes when coming from AI Flow:

```typescript
// In EnhancedLearningGraph.tsx, line 1992
// Check if we're in a "managed" scenario (graphState will be provided)
const hasGraphStateSource = initialGraphState !== null; // Even if empty, means it's managed

if (frames.length > 0 && nodes.length === 0 && !hasGraphStateSource) {
  // Only create nodes for manual frame drops, not AI Flow
}
```

## ✅ IMPLEMENTED FIX: Atomic Batch Update (Option 2)

### Implementation Details

**Added to `useUnifiedStorage.ts` (lines ~1825-1867)**:
```typescript
const batchUpdate = useCallback((payload: {
  frames?: AIFrame[];
  chapters?: Chapter[];
  graphState?: GraphState;
}) => {
  // Update all state atomically - React batches these in single render
  if (payload.frames) setFrames(payload.frames);
  if (payload.chapters) setChapters(payload.chapters);
  if (payload.graphState) updateGraphState(payload.graphState);
  
  // Single background save
  queueBackgroundSave(...);
}, []);
```

**Updated in `page.tsx` `handleAcceptAIFrames` (lines ~1983-2013)**:
```typescript
// OLD (caused race):
unifiedStorage.updateFrames([...frames, ...normalized]);
unifiedStorage.updateChapters([...chapters, ...converted]);
unifiedStorage.updateGraphState(graphState);

// NEW (atomic):
unifiedStorage.batchUpdate({
  frames: [...frames, ...normalized],
  chapters: [...chapters, ...converted],
  graphState: flowBuilder.plan?.graphState,
});
```

### Why This Works
- **Single React Render**: All state updates happen in one batch
- **No Race Condition**: Impossible for `frames` to update before `graphState`
- **SWE Pattern**: Matches proven working architecture
- **Isolated**: Doesn't affect chapter dialog, manual creation, or SWE Bridge

## Testing Checklist

After fix, verify:
- [ ] AI Flow "Accept All" shows exactly 9 nodes (3 chapters + 6 frames)
- [ ] No duplicate key warnings in console
- [ ] No orphan "Untitled" nodes
- [ ] SWE Bridge "Pull & Sync" still works (should show correct node count)
- [ ] Manual frame drag-and-drop still creates nodes
- [ ] Graph auto-layout works correctly
- [ ] Node count in logs matches expected count

## Reference Files

- **Logs**: `Test/temp/logs.md` (lines 1314-1343 show the duplicate issue)
- **Latest Run**: `Delete/21Nov_09_5_11PM_debug-frames-flowframegenerator-2025-11-21T11-41-31-553Z.json`
- **Graph Component**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (lines 1854, 1992)
- **Accept Handler**: `src/app/ai-frames/page.tsx` (line 1983+)
- **SWE Bridge**: `src/app/ai-frames/components/SWEBridge.tsx` (working reference)

## Key Insight

**The fundamental issue**: Trying to support BOTH "auto-generate from frames" (manual mode) AND "use provided graphState" (AI Flow mode) in the same useEffect with async prop updates creates race conditions.

**SWE Bridge doesn't have this issue** because it ONLY uses graphState - it never auto-generates nodes from frames.

**AI Flow should work the same way**: Provide complete graphState, disable auto-generation.

---

## ✅ IMPLEMENTATION COMPLETED (Nov 21, 2025)

### Files Modified
1. **`src/app/ai-frames/hooks/useUnifiedStorage.ts`**:
   - Added `batchUpdate` function (lines 1834-1876)
   - Updated interface to accept `UnifiedAIFrame[]` (line 28)
   - Exported `batchUpdate` in return statement (line 1893)

2. **`src/app/ai-frames/page.tsx`**:
   - Updated `handleAcceptAIFrames` to use `batchUpdate` (lines 2010-2014)
   - Added `metadata` field to normalized frames (lines 1975-1985)
   - Type annotation for `normalized` as `UnifiedAIFrame[]` (line 1975)

### Type Safety Fix
- Changed `batchUpdate` parameter from `AIFrame[]` to `UnifiedAIFrame[]`
- Added metadata generation in `handleAcceptAIFrames` to ensure frames have required fields
- All TypeScript linter errors resolved

### What's Protected
- ✅ Chapter Dialog (uses direct `updateFrames`)
- ✅ SWE Bridge (uses separate update calls)
- ✅ Manual Frame Drop (uses `handleFramesChange`)
- ✅ Frame Creation (uses `handleCreateFrame`)

### Ready for Testing
The atomic batch update is now live and type-safe. Test the "Accept All Frames" functionality in AI Flow Builder.

---

## ✅ NODE ID FORMAT FIX (Nov 21, 2025 - Final)

### Critical Issue: Duplicate Orphan Nodes
After implementing batch update, duplicate nodes (3 orphan chapters + 6 orphan frames) were still appearing.

### Root Cause
**AI Flow Builder** was generating frame node IDs as:
- `"frame_plan_1"` ❌

**SWE Bridge** generates frame node IDs as:
- `"node_frame_1763361560909_fleet_intro_0"` ✅
- Format: `node_{frameId}_{indexInChapter}`

This format mismatch broke `EnhancedLearningGraph`'s deduplication filter at line 1902, causing it to fail to skip nodes that already existed.

### Solution
Updated `src/app/ai-frames/hooks/useAIFlowBuilder.ts` `generateGraphState` function:

**Line 1776** - Frame node ID generation:
```typescript
// OLD (WRONG):
const frameNodeId = frame.id.startsWith('frame_') ? frame.id : `frame_${frame.id}`;

// NEW (CORRECT):
const frameNodeId = `node_${frame.id}_${indexInChapter}`;
```

**Line 1812** - Sequential edge source:
```typescript
// OLD (WRONG):
const prevFrameNodeId = prevFrame.id.startsWith('frame_') ? prevFrame.id : `frame_${prevFrame.id}`;

// NEW (CORRECT):
const prevFrameNodeId = `node_${prevFrame.id}_${indexInChapter - 1}`;
```

### Why This Works
- `EnhancedLearningGraph.tsx` has a sophisticated deduplication filter (lines 1897-1964)
- It skips nodes where `existingNodeIds.has(node.id)` or `existingFrameIds.has(frameId)`
- With matching node ID formats, the filter correctly identifies duplicates and skips them
- **No changes needed to `EnhancedLearningGraph.tsx`** - it works perfectly with correct input

### Verification
Expected console log after "Accept All":
```
🧪 Graph merge from initialGraphState {
  existingNodeCount: 9,
  incomingNodeIds: [],
  appendedNodeIds: [],  // ← Should be EMPTY (no duplicates)
  skippedFrameIds: [],
  skippedAttachmentIds: [],
  skippedChapterIds: []
}
```

### Files Modified
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts` (lines 1776, 1812)

---

## ✅ BATCH UPDATE ATOMICITY FIX (Nov 21, 2025 - Final)

### Critical Issue: Double Merge Causing Duplicate Nodes
Even after fixing node ID format, duplicate nodes were still appearing because `batchUpdate` was triggering TWO merge cycles in `EnhancedLearningGraph`.

### Root Cause
**Line 1866 in `useUnifiedStorage.ts`**:
```typescript
// WRONG:
updateGraphState(payload.graphState);
```

This caused:
1. `updateGraphState` calls `setGraphState()` → triggers merge #1
2. `updateGraphState` calls `queueBackgroundSave()` → redundant save
3. `batchUpdate` calls `queueBackgroundSave()` again → redundant save
4. State updates in non-atomic order → triggers merge #2
5. **Result**: Duplicate nodes appended twice

### Solution
Make `batchUpdate` truly atomic by directly setting state like it does for frames and chapters:

```typescript
// CORRECT:
if (payload.graphState !== undefined) {
  // Deduplicate edges (same logic as updateGraphState) - ATOMIC: no redundant save
  const deduplicatedState = {
    ...payload.graphState,
    edges: payload.graphState.edges ? 
      payload.graphState.edges.filter((edge, index, array) => {
        const firstByIdIndex = array.findIndex(e => e.id === edge.id);
        if (firstByIdIndex !== index) return false;
        
        const edgeAny = edge as any;
        const key = `${edge.source}-${edge.target}-${edgeAny.sourceHandle || 'null'}-${edgeAny.targetHandle || 'null'}`;
        return array.findIndex(e => {
          const eAny = e as any;
          const eKey = `${e.source}-${e.target}-${eAny.sourceHandle || 'null'}-${eAny.targetHandle || 'null'}`;
          return eKey === key;
        }) === index;
      }) : []
  };
  
  setGraphState(deduplicatedState);
  graphStateRef.current = deduplicatedState;
}
```

### Why This Works
- **Atomic state updates**: All three states (frames, chapters, graphState) set in one batch
- **Single save call**: Only one `queueBackgroundSave` at the end of `batchUpdate`
- **No cascade**: Direct `setGraphState` doesn't trigger `updateGraphState`'s save
- **Edge deduplication preserved**: Copied from `updateGraphState` to maintain data integrity

### Expected Result
Console log after "Accept All":
```
🧪 Graph merge from initialGraphState {
  existingNodeCount: 0,
  appendedNodeIds: []  // ← Empty = perfect atomicity!
}
```

### Files Modified
- `src/app/ai-frames/hooks/useUnifiedStorage.ts` (lines 1864-1885)

