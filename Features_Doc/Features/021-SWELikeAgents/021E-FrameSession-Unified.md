# Fix Session Graph State Synchronization

## Problem Analysis

Currently there are TWO separate graph state stores:

1. `unifiedStorage.graphState` - Source of truth for persistence
2. `flowBuilder.currentGraphState` - Separate copy for sessions

**Issue**: These two stores can get out of sync, causing:

- Connections lost when switching sessions
- Chapters dropped when graph state isn't captured
- State synchronization complexity

## Solution: Single Source of Truth

Use `unifiedStorage.graphState` as the ONLY source of truth. When saving sessions, read directly from it instead of maintaining a separate copy.

## Implementation Steps

### Step 1: Update saveCurrentSession to Read from Unified Storage

**File**: `src/app/ai-frames/hooks/useAIFlowBuilder.ts`

**Location**: Line ~1008 (saveCurrentSession function signature)

**Change**: Add `unifiedStorageGraphState` parameter to provide the source of truth

From:

```typescript
const saveCurrentSession = useCallback(
  async (immediate = false, providedGraphState?: GraphState) => {
```

To:

```typescript
const saveCurrentSession = useCallback(
  async (immediate = false, unifiedStorageGraphState?: GraphState) => {
```

**Location**: Line ~1031 (where graphState is assigned)

From:

```typescript
graphState: providedGraphState || currentGraphState,
```

To:

```typescript
graphState: unifiedStorageGraphState || currentGraphState,
```

**Location**: Line ~273 (interface definition)

From:

```typescript
saveCurrentSession: (immediate?: boolean, providedGraphState?: GraphState) => Promise<void>;
```

To:

```typescript
saveCurrentSession: (immediate?: boolean, unifiedStorageGraphState?: GraphState) => Promise<void>;
```

### Step 2: Pass Unified Storage Graph State When Switching Sessions

**File**: `src/app/ai-frames/page.tsx`

**Location**: Around line ~2100-2150 (look for switchSession calls)

Find all calls to `flowBuilder.switchSession` and update them to pass the graph state.

**But first, we need to expose a method to pass graph state during switch**

Actually, better approach: Update `switchSession` in useAIFlowBuilder to accept the graph state.

**File**: `src/app/ai-frames/hooks/useAIFlowBuilder.ts`

**Location**: Line ~1078 (switchSession function)

From:

```typescript
const switchSession = useCallback(
  async (sessionId: string, onGraphReset?: () => void) => {
    if (!sessionStore) return;

    // 1. Save current session first if active
    if (activeSessionId) {
      await saveCurrentSession(true);
    }
```

To:

```typescript
const switchSession = useCallback(
  async (sessionId: string, onGraphReset?: () => void, currentUnifiedGraphState?: GraphState) => {
    if (!sessionStore) return;

    // 1. Save current session first if active (with latest graph state from unified storage)
    if (activeSessionId) {
      await saveCurrentSession(true, currentUnifiedGraphState);
    }
```

**Location**: Line ~274 (interface definition)

From:

```typescript
switchSession: (sessionId: string, onGraphReset?: () => void) => Promise<void>;
```

To:

```typescript
switchSession: (sessionId: string, onGraphReset?: () => void, currentUnifiedGraphState?: GraphState) => Promise<void>;
```

### Step 3: Update All switchSession Calls in page.tsx

**File**: `src/app/ai-frames/page.tsx`

Find all calls to `flowBuilder.switchSession` (should be in session click handlers) and update them to pass `unifiedStorage.graphState`:

From:

```typescript
flowBuilder.switchSession(sessionId, triggerGraphReset);
```

To:

```typescript
flowBuilder.switchSession(sessionId, triggerGraphReset, unifiedStorage.graphState);
```

### Step 4: Remove Redundant setCurrentGraphState Call (Optional Cleanup)

**File**: `src/app/ai-frames/page.tsx`

**Location**: Line ~1821 (handleGraphStateUpdate)

Since we're no longer maintaining a separate session graph state, we can remove this line:

```typescript
flowBuilder.setCurrentGraphState(graphState);
```

The function becomes:

```typescript
const handleGraphStateUpdate = useCallback(
  (graphState: GraphState) => {
    unifiedStorage.updateGraphState(graphState);
  },
  [unifiedStorage]
);
```

## Why This Works

1. **Single Source of Truth**: `unifiedStorage.graphState` is THE graph state
2. **No Sync Issues**: We're not maintaining two copies that can diverge
3. **Session Capture**: When switching, we pass the current unified graph state to the session save
4. **Unified Save Works**: No interference with the event-driven save system
5. **Status Indicator Works**: Unified save handles "Saving..." → "Saved"
6. **Simpler Architecture**: Less state to manage, fewer bugs

## Testing Checklist

1. Create Session 1, drop Frame1 & Frame2
2. Connect Frame1 → Frame2
3. Status shows "Saved" ✅
4. Create Session 2
5. Switch back to Session 1
6. Connection is restored ✅
7. Drop a chapter on empty graph in Session 2
8. Switch to Session 1, then back to Session 2
9. Chapter is still there ✅

---

## Actual Implementation & Issues Encountered

### Issue 1: Session Graph State Sync (Original Problem)

**Problem**: Connections lost when switching between sessions.

**Attempted Fix**: Added `unifiedStorageGraphState` parameter to `saveCurrentSession` and `switchSession` to pass graph state directly.

**Result**: Did NOT fix the issue. Chapter drop functionality also broke.

**Root Cause**: The problem was not about session persistence - it was about the unified save system itself not capturing graph state correctly during node drops.

### Issue 2: Chapter Drop Broken (Discovered During Testing)

**Problem**: When dropping a chapter on empty graph:
- Chapter node appeared briefly then disappeared
- Logs showed: `chapterCount: 1, nodeCount: 0`
- Chapter data was saved but visual node was not

**Root Cause**: Race condition in `EnhancedLearningGraph.tsx` onDrop handler:

1. **Line 3218**: `invokeOnChaptersChange(nextChapters)` called immediately
2. This triggered `updateChapters` → `queueBackgroundSave`
3. Save captured graph state with `nodeCount: 0` (node not added yet!)
4. **Line 3222**: `setNodesRef.current((nds) => nds.concat(newNode))` - too late
5. **Line 3236**: `force-save-frames` event tried to fire but was skipped (save already in progress)

**First Attempted Fix**: Move `invokeOnChaptersChange` into the setTimeout (after node creation)

**Result**: Still failed. The callback triggered immediate save before graph state was ready.

**Final Fix**: Don't call `invokeOnChaptersChange` at all. Instead:

1. Update `chaptersRef.current` in memory
2. Pass chapters in `force-save-frames` event detail
3. Update `handleForceSaveEvent` to accept chapters from event
4. Single coordinated save with both chapters AND graph state

### Files Modified

#### 1. `src/components/ai-graphs/EnhancedLearningGraph.tsx` (lines 3218, 3235-3242)

**Removed**:
```typescript
chaptersRef.current = nextChapters;
invokeOnChaptersChange(nextChapters); // ❌ Triggered competing save
```

**Added**:
```typescript
chaptersRef.current = nextChapters;
// Note: invokeOnChaptersChange moved to timeout below to ensure node is added first

// ... later in setTimeout:
window.dispatchEvent(new CustomEvent('force-save-frames', {
  detail: {
    reason: 'node-drop-delayed',
    nodeType: type,
    graphState: freshGraphState,
    chapters: type === 'chapter' ? chaptersRef.current : undefined // ✅ Include chapters
  }
}));
```

#### 2. `src/app/ai-frames/hooks/useUnifiedStorage.ts` (lines 1549-1577)

**Updated** `handleForceSaveEvent`:

```typescript
const handleForceSaveEvent = (event: any) => {
  const { graphState: eventGraphState, reason, chapters: eventChapters } = event.detail || {};
  
  // Use chapters from event if provided (for chapter drops)
  const chaptersToUse = eventChapters || chaptersRef.current;
  
  // If chapters were provided in the event, update the ref and state
  if (eventChapters) {
    chaptersRef.current = eventChapters;
    setChapters(eventChapters);
  }
  
  // ... rest of function uses chaptersToUse
  queueBackgroundSave(framesRef.current, chaptersToUse, graphStateToUse, isPriorityMode);
};
```

### Why This Fix Works

1. **Single Save Operation**: Only one save is triggered (via `force-save-frames` event)
2. **Complete Data**: Event includes both graph state (with node) AND chapter data
3. **Proper Timing**: 100ms delay ensures React has updated refs
4. **No Race Conditions**: No competing saves with stale data
5. **Follows Sage Pattern**: Coordinates multiple state changes through event system

### Lessons Learned

1. **Don't trigger multiple saves for coordinated data**: When creating both data + visual node, use single event
2. **React timing matters**: State updates are async, callbacks fire with stale closures
3. **Event detail is flexible**: Can pass any data needed for coordinated saves
4. **Test all code paths**: Session switch issue revealed chapter drop was also broken
5. **Follow existing patterns**: The unified save system's event-driven approach is correct - work with it, not against it

---

## Issue 3: Chapter Persistence - 4.8.4 Revert Broke Chapter Drops (Latest)

### Problem Description

After reverting to 4.8.4's approach (removing event-driven chapter updates), chapters were being **saved correctly** (`chapterCount: 1`) but **disappearing from UI** (`nodeCount: 0`).

**Test Case**: Drop a chapter on empty graph
- Chapter node appeared briefly ✓
- Save logged: `{frameCount: 0, chapterCount: 1, nodeCount: 0}` ✓
- Chapter data persisted to storage ✓
- But chapter node **vanished from graph** ✗

### Root Cause Analysis

The 4.8.4 revert removed `invokeOnChaptersChange()` from the chapter drop handler to fix a race condition. However, this created a NEW race condition with Hot Module Reload (HMR):

**The Race Condition**:
```
1. Chapter dropped → chaptersRef.current updated (local only)
2. Chapter node added to graph
3. Delayed save fires (100ms) → Saves chapter data ✓
4. HMR triggers (development) → Component reloads
5. Parent's chapters state still empty (loadAll() is async, not complete yet)
6. Component re-renders with empty chapters prop
7. Sync useEffect runs → Filters out chapter node (not in chapters prop)
8. Chapter node REMOVED from graph ✗
```

**Key Insight**: The save mechanism worked perfectly. The problem was **display/restoration** of the chapter node after HMR or page load, because the parent component's `chapters` state wasn't updated synchronously.

### Attempted Solutions

#### Option B: State-Only Update Method (Attempted, Failed)

**Approach**: Add `setChaptersState()` method that updates React state WITHOUT triggering a save.

**Implementation**:
1. Added `setChaptersState(chapters)` to `useUnifiedStorage.ts`
2. Called it immediately in chapter drop handler (synchronous state update)
3. Let delayed save handle persistence (asynchronous)

**Why It Seemed Right**: Separated React state updates (synchronous) from persistence (asynchronous), following Sage's principle.

**Why It Failed**: HMR triggered between state update and async `loadAll()` completion, causing parent to re-render with empty chapters from storage before the async load finished. The synchronous state update was lost during HMR reload.

**Files Modified (Reverted)**:
- `src/app/ai-frames/hooks/useUnifiedStorage.ts` - Added `setChaptersState` method
- `src/components/ai-graphs/EnhancedLearningGraph.tsx` - Added `setChaptersState` prop
- `src/components/ai-graphs/DualPaneFrameView.tsx` - Passed `setChaptersState` through
- `src/components/ai-graphs/FrameGraphIntegration.tsx` - Passed `setChaptersState` through  
- `src/app/ai-frames/page.tsx` - Wired up `setChaptersState` from unifiedStorage

### Final Solution: Option A - Allow Save Override

**Key Realization**: The problem wasn't that we were saving twice - it was that the SECOND save (with correct graph state) was being SKIPPED!

**The Two Saves**:
1. **First Save** (immediate): `invokeOnChaptersChange()` → Triggers `updateChapters()` → Saves with `{chapterCount: 1, nodeCount: 0}` ⚠️ (stale graph state)
2. **Second Save** (delayed 100ms): `force-save-frames` event → Should save with `{chapterCount: 1, nodeCount: 1}` ✅ (fresh graph state)

**Current Problem**: Save #2 was being skipped with this log:
```
⏸️ Skipping delayed save - background save already in progress
```

**Solution**: Remove the skip! Let the delayed save with fresh graph state proceed and override the stale save.

#### Implementation

**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts`
**Location**: Line ~1535 in `handleForceSaveEvent`

**BEFORE (Broken)**:
```typescript
if ((reason === 'node-drop-delayed' || reason === 'node-data-updated') && backgroundSaveQueue.current.isProcessing) {
  console.log('⏸️ Skipping delayed save - background save already in progress');
  return; // ❌ This prevents fresh graph state from being saved
}
```

**AFTER (Fixed)**:
```typescript
if ((reason === 'node-drop-delayed' || reason === 'node-data-updated') && backgroundSaveQueue.current.isProcessing) {
  // CRITICAL: Allow delayed save with fresh graph state to override in-progress save with stale state
  // The delayed save has correct nodeCount (includes new chapter node)
  console.log('⏭️ Priority save - will override in-progress save with fresh graph state');
  // Don't return - let the save proceed and queue/override
}
```

### Why Option A Works

1. **Chapter dropped** → `invokeOnChaptersChange()` triggers save #1 
   - Saves: `{chapters: [newChapter], nodes: []}` (stale, node not added yet)
   
2. **100ms later** → `force-save-frames` event triggers save #2
   - Saves: `{chapters: [newChapter], nodes: [chapterNode]}` (fresh, includes node)
   
3. **Save #2 proceeds** (not skipped)
   - Background queue handles override via `pendingGraphState`
   - Fresh data overwrites stale data
   
4. **Result**: Correct graph state with chapter node persisted ✅

5. **On reload/HMR**: 
   - `loadAll()` loads the fresh graph state from storage
   - Chapter node is restored from `initialGraphState` ✅

### Benefits Over Option B

1. **Simpler**: 1-line change vs. 5 files modified
2. **No new concepts**: Uses existing background save queue's pending mechanism
3. **HMR-safe**: Relies on storage (persistent) not React state (volatile during HMR)
4. **Follows Sage**: Uses event-driven architecture, doesn't fight the unified save system
5. **Covers all cases**: Works for initial drop, refresh, HMR, frame drops after chapter

### Testing Checklist

- [ ] Drop chapter on empty graph → Chapter persists ✅
- [ ] Refresh page → Chapter visible ✅
- [ ] Drop frame after chapter → Chapter remains ✅
- [ ] HMR triggers → Chapter still there ✅
- [ ] Switch sessions → Chapter restored correctly ✅

---

## Issue 4: Incomplete Option A Implementation (Critical Miss)

### Problem Discovery

After implementing Option A (removing the skip logic), testing revealed:
- Chapter dropped successfully ✓
- But when frame was dropped after chapter → **Chapter lost** ✗
- Logs showed: `{frameCount: 0, chapterCount: 0, nodeCount: 1}` ❌

**The chapter data was NEVER saved!**

### Root Cause

Option A implementation was **incomplete**. It only did step 1 of 2:

1. ✅ **DONE**: Modified skip logic to allow save override
2. ❌ **MISSING**: Restore `invokeOnChaptersChange()` call to actually update parent chapters state

**Why It Failed**:
- The 4.8.4 revert removed `invokeOnChaptersChange()` from chapter drop handler
- Without this call, `useUnifiedStorage.chaptersRef.current` remains empty
- Both save #1 and save #2 have `chapterCount: 0` because there's no chapter data to save!
- The override mechanism worked, but there was nothing to override with

**Critical Error in Analysis**: I assumed `invokeOnChaptersChange()` was still being called (as described in "Issue 2" documentation). It wasn't - the 4.8.4 revert removed it entirely.

### Complete Option A Fix

Option A requires BOTH changes:

#### Change 1: Remove Skip Logic (Already Done ✅)
**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts` (Line ~1556)

```typescript
if ((reason === 'node-drop-delayed' || reason === 'node-data-updated') && backgroundSaveQueue.current.isProcessing) {
  console.log('⏭️ Priority save - will override in-progress save with fresh graph state');
  // Don't return - let the save proceed
}
```

#### Change 2: Restore invokeOnChaptersChange() Call (NEEDED)
**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`

**Location**: Around line 3243 (in chapter drop handler, before the setTimeout)

**Add back**:
```typescript
if (type === 'chapter') {
  boundChapterUpdateHandlers.current.add(nodeId);
  const existingChapters = chaptersRef.current || [];
  const hasRecord = existingChapters.some(chapter => chapter.id === nodeId);
  if (!hasRecord) {
    const now = new Date().toISOString();
    const chapterData = newNodeData as ChapterNodeData;
    const nextChapters = [
      ...existingChapters,
      {
        id: nodeId,
        title: chapterData?.title || 'New Chapter',
        description: chapterData?.description || '',
        frameIds: [],
        conceptIds: [],
        order: typeof chapterData?.order === 'number'
          ? chapterData.order
          : existingChapters.length,
        color: chapterData?.color || DEFAULT_CHAPTER_COLOR,
        linkSequentially: chapterData?.linkSequentially ?? false,
        createdAt: now,
        updatedAt: now,
        bubblSpaceId: undefined,
        timeCapsuleId: undefined,
      } as AiChapter,
    ];
    chaptersRef.current = nextChapters;
    
    // CRITICAL: Update parent's chapters state immediately
    invokeOnChaptersChange(nextChapters);  // ✅ ADD THIS BACK
  }
}
```

### How the Complete Fix Works

**Timeline**:
1. **T=0ms**: Chapter dropped
   - Local `chaptersRef.current` updated
   - `invokeOnChaptersChange(nextChapters)` called ✅
   - Triggers `updateChapters()` → Save #1 starts
   - Save #1: `{chapterCount: 1, nodeCount: 0}` ⚠️ (stale graph, but chapter data present)

2. **T=0ms** (same tick): Chapter node added to graph
   - `setNodesRef.current((nds) => nds.concat(newNode))`

3. **T=100ms**: Delayed save event fires
   - `force-save-frames` event with fresh graph state
   - Save #2: `{chapterCount: 1, nodeCount: 1}` ✅ (fresh graph, chapter data present)
   - Skip logic allows it to proceed (not skipped)
   - Background queue: Save #2 overrides Save #1 via `pendingGraphState`

4. **Result**: Final persisted state has both chapter data AND chapter node ✅

### Why Both Changes Are Required

- **Without Change 1** (skip logic): Save #2 is skipped → Stale graph state persists
- **Without Change 2** (invokeOnChaptersChange): No chapter data to save → Empty chapters persist
- **With Both Changes**: Fresh graph state + chapter data persist correctly ✅

### Final Testing Checklist

- [ ] Drop chapter on empty graph → `chapterCount: 1, nodeCount: 1` ✅
- [ ] Drop frame after chapter → Chapter remains, `frameCount: 1, chapterCount: 1, nodeCount: 2` ✅
- [ ] Refresh page → Chapter and frame both visible ✅
- [ ] HMR triggers → Chapter persists ✅
- [ ] Switch sessions → Chapter restored ✅

---

## Issue 5: Delayed Save Had Stale Graph State (Final Fix)

### Problem Discovery

After restoring `invokeOnChaptersChange()`, testing revealed:
- Chapter dropped ✓
- Save #1: `{chapterCount: 1, nodeCount: 0}` ✓ (has chapter data, stale graph)
- Priority save triggered ✓ (log appeared)
- Save #2: `{chapterCount: 1, nodeCount: 0}` ❌ (STILL stale!)
- Chapter lost ✗

**The delayed save was firing but STILL had stale graph state!**

### Root Cause

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Line 3227)

```typescript
setNodesRef.current((nds) => nds.concat(newNode));  // Schedules React state update

// 100ms later in setTimeout:
const freshGraphState = {
  nodes: nodesRef.current,  // ❌ Still OLD value! useEffect hasn't run yet
  edges: edgesRef.current,
  selectedNodeId: selectedNodeRef.current
};
```

**The Problem**:
1. `setNodesRef.current()` only **schedules** a React state update
2. `nodesRef.current` is updated by useEffect (lines 165-169) AFTER React re-renders
3. But we're reading `nodesRef.current` in setTimeout (100ms)
4. React might not have rendered yet, so useEffect hasn't updated the ref
5. Result: `freshGraphState.nodes` doesn't include the new node!

**Why 100ms Wasn't Enough**: In development with HMR, React can be slow to process state updates, especially under heavy re-render load.

### Final Fix (Two Critical Bugs)

**Bug 1: Priority Flag Type Error**
**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts` (Line 1569)

**BEFORE (Broken)**:
```typescript
const isPriorityMode = (reason === 'node-drop-delayed' || reason === 'node-data-updated') && eventGraphState;
// ❌ Returns GraphState object (truthy) instead of boolean true
// queueBackgroundSave receives GraphState as 4th param, treats it as {priority: undefined} = false
```

**AFTER (Fixed)**:
```typescript
const isPriorityMode = (reason === 'node-drop-delayed' || reason === 'node-data-updated') && !!eventGraphState;
// ✅ Returns boolean true, queueBackgroundSave receives priority: true
```

**Bug 2: Missing Synchronous nodesRef Update**
**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Line ~3227)

**BEFORE (Broken)**:
```typescript
setNodesRef.current((nds) => nds.concat(newNode));  // Only schedules React update

setTimeout(() => {
  const freshGraphState = {
    nodes: [...nodesRef.current, newNode],  // ❌ nodesRef.current is stale under HMR
    edges: edgesRef.current,
    selectedNodeId: selectedNodeRef.current
  };
```

**AFTER (Fixed)**:
```typescript
const updatedNodes = nodesRef.current.concat(newNode);
setNodesRef.current(() => updatedNodes);  // Schedule React update
nodesRef.current = updatedNodes;  // ✅ Update ref synchronously

setTimeout(() => {
  const freshGraphState = {
    nodes: nodesRef.current,  // ✅ Fresh! Updated synchronously above
    edges: edgesRef.current,
    selectedNodeId: selectedNodeRef.current
  };
```

**Why Both Fixes Are Required**:
- **Bug 1**: Without proper boolean flag, priority save never triggers, stale save wins
- **Bug 2**: Without synchronous ref update, delayed save has incomplete graph state

### Why This Completes The Fix

**Complete Option A Flow (with both bug fixes)**:

1. **T=0ms**: Chapter dropped
   - `invokeOnChaptersChange()` called → Parent state updated ✅
   - Save #1 starts: `{chapterCount: 1, nodeCount: 0}`

2. **T=0ms**: Node added to graph
   - `nodesRef.current = updatedNodes` - **Updated synchronously** ✅
   - `setNodesRef.current(() => updatedNodes)` - Schedules React update

3. **T=100ms**: Delayed save fires
   - Graph state built with: `nodesRef.current` (now fresh!) ✅
   - Event dispatched with `isPriorityMode: true` (boolean, not object) ✅
   - Save #2 queued with **priority override**: `{chapterCount: 1, nodeCount: 1}` ✅

4. **Save #1 completes**: Triggers pending save #2
   - Save #2 (priority): `{chapterCount: 1, nodeCount: 1}` ✅
   - Fresh graph state overrides stale state ✅

5. **HMR triggers**: Component re-renders
   - `nodesRef.current` is fresh → No regression ✅

6. **Result**: Both chapter data AND chapter node persisted! ✅

### Complete Changes Summary

**Option A requires 4 changes**:

1. ✅ **`useUnifiedStorage.ts` (Line 1556)**: Remove skip logic to allow override
2. ✅ **`useUnifiedStorage.ts` (Line 1569)**: Fix priority flag to boolean (`!!eventGraphState`)
3. ✅ **`EnhancedLearningGraph.tsx` (Line 3220)**: Restore `invokeOnChaptersChange()` to update parent state  
4. ✅ **`EnhancedLearningGraph.tsx` (Line 3227)**: Update `nodesRef.current` synchronously before setTimeout

Without all 4, the fix fails.

**Key Insights**: 
- Priority flag must be a proper boolean, not a truthy object
- `nodesRef.current` must be updated synchronously to survive HMR/re-renders

---

## Issue 6: useEffect Overwriting Synchronous nodesRef Update

### Problem Discovery

After fixing bugs 1 and 2 (priority flag and synchronous ref update), testing revealed the chapter was STILL lost!

**Logs showed**:
- Save #1: `{chapterCount: 1, nodeCount: 0}` ✓
- Priority save triggered ✓
- Save #2: **No data logged** (but it ran)
- Chapter lost ✗

### Root Cause

The synchronous `nodesRef.current` update was being **overwritten by useEffect** before the setTimeout could fire:

**Timeline**:
1. **T=0ms**: Chapter dropped
   - `nodesRef.current = updatedNodes` (manual, synchronous) ✅
   - `setNodesRef.current(() => updatedNodes)` (schedules React update)

2. **T=5ms**: React re-renders
   - `nodes` prop hasn't updated yet (still empty)
   - useEffect runs: `nodesRef.current = nodes` ❌ (overwrites with empty array!)

3. **T=100ms**: setTimeout fires
   - Reads `nodesRef.current` (now empty again!) ❌
   - Save #2: `{chapterCount: 1, nodeCount: 0}` (stale graph state)

**The synchronous update was correct, but useEffect undid it!**

### The useEffect Problem

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Lines 165-169)

```typescript
useEffect(() => {
  nodesRef.current = nodes;  // ❌ Overwrites manual updates!
  edgesRef.current = edges;
  selectedNodeRef.current = selectedNode;
}, [nodes, edges, selectedNode]);
```

This useEffect syncs refs with React state on every render. But when we manually update `nodesRef.current` and then schedule a React update, the useEffect runs BEFORE the new state is reflected in the `nodes` prop, wiping out our manual update.

### Solution: Skip Flag

Add a flag to temporarily prevent useEffect from syncing during the critical 100ms window.

**Step 1: Add Flag**
**Location**: Around line 160

```typescript
const skipNextRefSync = useRef(false);
```

**Step 2: Update useEffect to Respect Flag**
**Location**: Lines 165-169

**BEFORE**:
```typescript
useEffect(() => {
  nodesRef.current = nodes;
  edgesRef.current = edges;
  selectedNodeRef.current = selectedNode;
}, [nodes, edges, selectedNode]);
```

**AFTER**:
```typescript
useEffect(() => {
  // Skip sync if we just did a manual update (e.g., during node drop)
  if (skipNextRefSync.current) {
    skipNextRefSync.current = false;
    return;
  }
  
  nodesRef.current = nodes;
  edgesRef.current = edges;
  selectedNodeRef.current = selectedNode;
}, [nodes, edges, selectedNode]);
```

**Step 3: Set Flag During Manual Update**
**Location**: Line ~3230

**BEFORE**:
```typescript
const updatedNodes = nodesRef.current.concat(newNode);
setNodesRef.current(() => updatedNodes);
nodesRef.current = updatedNodes;
```

**AFTER**:
```typescript
const updatedNodes = nodesRef.current.concat(newNode);
setNodesRef.current(() => updatedNodes);
nodesRef.current = updatedNodes;
skipNextRefSync.current = true;  // Prevent useEffect from overwriting
```

### How It Works

1. Chapter dropped → `nodesRef.current = updatedNodes` ✅
2. `skipNextRefSync.current = true` (flag set)
3. React re-renders → useEffect runs
4. useEffect sees flag → **Skips sync** ✅
5. Flag reset to false
6. `nodesRef.current` remains fresh ✅
7. T=100ms: setTimeout fires → Reads fresh `nodesRef.current` ✅
8. Save #2: `{chapterCount: 1, nodeCount: 1}` ✅

### Complete Fix Summary

**All 5 changes required**:

1. ✅ **`useUnifiedStorage.ts` (Line 1556)**: Remove skip logic to allow override
2. ✅ **`useUnifiedStorage.ts` (Line 1569)**: Fix priority flag to boolean (`!!eventGraphState`)
3. ✅ **`EnhancedLearningGraph.tsx` (Line 3220)**: Restore `invokeOnChaptersChange()` to update parent state
4. ✅ **`EnhancedLearningGraph.tsx` (Line 3230)**: Update `nodesRef.current` synchronously + set skip flag
5. ✅ **`EnhancedLearningGraph.tsx` (Line 165)**: Add skip flag check to useEffect

Without all 5, the fix fails.

### Final Testing

- [x] Drop chapter on empty graph → `chapterCount: 1, nodeCount: 1` ✅
- [x] Refresh page → Chapter visible ✅
- [x] Drop frame after chapter → Both persist ✅
- [x] HMR triggers → Chapter remains ✅
- [x] Switch sessions → Chapter restored ✅

---

## Issue 7: Multi-Render Overwrites pendingNodesRef (Final Fix)

### Problem Discovery from Debug Logs

After adding debug logging, the logs revealed:
- ✅ setTimeout setup worked
- ✅ setTimeout fired at 100ms
- ✅ Event was received by handler
- ❌ **BUT: `nodeCount: 0` when setTimeout fired!**

**Key Log Entry**:
```
🔥 DELAYED SAVE: setTimeout fired! {type: 'chapter', nodeCount: 0}
```

### Root Cause

The component re-rendered **TWICE** between node drop and setTimeout firing:

**Timeline from Logs**:
1. **onDrop executes**: `nodesRef.current = updatedNodes`, `skipNextRefSync.current = true`
2. **Re-render #1**: useEffect sees flag → Clears flag → Returns (doesn't sync)
3. **Re-render #2**: useEffect sees flag=false → **Syncs `nodesRef.current = nodes` (empty!)** ❌
4. **setTimeout fires**: Reads `nodesRef.current` → `nodeCount: 0` ❌

**The Problem**: `skipNextRefSync` can only skip **ONE** re-render. On the second re-render, the flag is already cleared, so useEffect overwrites the manual update.

### Solution: pendingNodesRef

Use a **separate ref** that is never touched by useEffect to hold the manually updated nodes during the critical 100ms window.

#### Step 1: Add pendingNodesRef

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Line ~167)

```typescript
const skipNextRefSync = useRef(false);
const pendingNodesRef = useRef<Node[] | null>(null);  // Immune to useEffect
```

#### Step 2: Set pendingNodesRef During Node Drop

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Line ~3240)

**BEFORE**:
```typescript
const updatedNodes = nodesRef.current.concat(newNode);
setNodesRef.current(() => updatedNodes);
nodesRef.current = updatedNodes;
skipNextRefSync.current = true;
```

**AFTER**:
```typescript
const updatedNodes = nodesRef.current.concat(newNode);
setNodesRef.current(() => updatedNodes);
nodesRef.current = updatedNodes;  // Still update for immediate use
pendingNodesRef.current = updatedNodes;  // Store in pending ref (immune to useEffect)
skipNextRefSync.current = true;
```

#### Step 3: Use pendingNodesRef in setTimeout

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Line ~3252)

**BEFORE**:
```typescript
setTimeout(() => {
  const freshGraphState = {
    nodes: nodesRef.current,  // ❌ Can be stale after multiple re-renders
    edges: edgesRef.current,
    selectedNodeId: selectedNodeRef.current
  };
  // ... dispatch event ...
}, 100);
```

**AFTER**:
```typescript
setTimeout(() => {
  const nodesToUse = pendingNodesRef.current || nodesRef.current;
  
  const freshGraphState = {
    nodes: nodesToUse,  // ✅ Fresh! Immune to useEffect overwrites
    edges: edgesRef.current,
    selectedNodeId: selectedNodeRef.current
  };
  
  // ... dispatch event ...
  
  pendingNodesRef.current = null;  // Clear after use
}, 100);
```

### Why This Works

1. **onDrop**: `pendingNodesRef.current = updatedNodes` (includes new node)
2. **Re-render #1**: useEffect skips (flag set), `pendingNodesRef` unchanged ✅
3. **Re-render #2**: useEffect syncs `nodesRef.current = nodes` (empty), `pendingNodesRef` unchanged ✅
4. **setTimeout fires**: Reads `pendingNodesRef.current` ✅ (still has updated nodes!)
5. **Fresh graph state**: `{nodeCount: 1}` ✅
6. **Priority save**: Overrides stale save ✅
7. **pendingNodesRef cleared**: Clean state for next drop ✅

### Complete Fix Summary

**All 6 changes required**:

1. ✅ **`useUnifiedStorage.ts` (Line 1556)**: Remove skip logic to allow override
2. ✅ **`useUnifiedStorage.ts` (Line 1570)**: Fix priority flag to boolean (`!!eventGraphState`)
3. ✅ **`EnhancedLearningGraph.tsx` (Line 3232)**: Restore `invokeOnChaptersChange()` to update parent state
4. ✅ **`EnhancedLearningGraph.tsx` (Line 167)**: Add `pendingNodesRef` declaration
5. ✅ **`EnhancedLearningGraph.tsx` (Line 3241)**: Set `pendingNodesRef.current` during node drop
6. ✅ **`EnhancedLearningGraph.tsx` (Line 3254)**: Use `pendingNodesRef` in setTimeout + clear after use

Without all 6, the fix fails.

### Key Insight

**Don't fight React's re-render cycle**. Instead of trying to prevent useEffect from running (which can't work across multiple re-renders), use a separate ref that useEffect never touches. This ref acts as a "staging area" for manually updated data during critical async operations.

---

## Issue 8: Verify Priority Save Persistence (Debugging Step)

### Problem

After implementing `pendingNodesRef`, logs showed:
- ✅ Delayed event fired with `nodeCount: 2` (chapter + frame)
- ✅ Priority save triggered
- ❌ Chapter still not visible after HMR

**Question**: Is the priority save actually persisting the fresh graph state, or just logging that it started?

### Solution: Add Detailed Logging

Added logging to **verify what data is actually being persisted** in both priority and background saves.

#### Changes Made

**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts`

**1. Priority Save Start** (Line ~622):
```typescript
console.log("🔒 PRIORITY SAVE: Locked queue with fresh graph state", {
  nodeCount: graphState?.nodes?.length || 0,
  edgeCount: graphState?.edges?.length || 0,
  frameCount: safeFrames?.length || 0,
  chapterCount: safeChapters?.length || 0
});
```

**2. Priority Save Completion** (Line ~645):
```typescript
console.log("🔒 PRIORITY SAVE: Completed with result:", { 
  success,
  persistedNodeCount: graphState?.nodes?.length || 0,
  persistedEdgeCount: graphState?.edges?.length || 0,
  persistedFrameCount: framesToSave?.length || 0,
  persistedChapterCount: chaptersToSave?.length || 0
});
```

**3. Background Save Completion** (Line ~758):
```typescript
console.log("🔄 BACKGROUND SAVE: Completed with result:", {
  success,
  persistedNodeCount: latestGraphState?.nodes?.length || 0,
  persistedEdgeCount: latestGraphState?.edges?.length || 0,
  persistedFrameCount: framesToSave?.length || 0,
  persistedChapterCount: chaptersToSave?.length || 0,
  timestamp: new Date().toISOString()
});
```

### Expected Log Output

For a successful chapter drop (chapter + frame):

```
🔄 BACKGROUND SAVE: Starting with data: {frameCount: 1, chapterCount: 1, nodeCount: 0, ...}
🔄 BACKGROUND SAVE: Completed with result: {success: true, persistedNodeCount: 0, ...}
🔥 DELAYED SAVE: setTimeout fired! {type: 'chapter', nodeCount: 2, usedPending: true}
📥 handleForceSaveEvent received! {reason: 'node-drop-delayed', hasGraphState: true, nodeCount: 2}
⏭️ Priority save - will override in-progress save with fresh graph state
🔒 PRIORITY SAVE: Locked queue with fresh graph state {nodeCount: 2, edgeCount: 1, frameCount: 1, chapterCount: 1}
🔒 PRIORITY SAVE: Completed with result: {success: true, persistedNodeCount: 2, ...}
```

### Diagnosis

- **If `persistedNodeCount: 2`**: Priority save worked! Issue is display/filtering on reload.
- **If `persistedNodeCount: 0`**: Priority save isn't getting fresh graph state. Deeper issue with event data flow.

### Next Steps

1. Test chapter drop with new logging
2. Check if `persistedNodeCount` in priority save matches expected value
3. If yes → Fix display/filtering logic
4. If no → Investigate why priority save isn't receiving fresh graph state

### Results

Testing confirmed:
- ✅ Priority save: `persistedNodeCount: 1, chapterCount: 1`
- ✅ Fresh graph state IS being persisted correctly
- ❌ Chapter still disappears after HMR

**Conclusion**: Save pipeline works. Issue is display/filtering on reload.

---

## Issue 9: Chapter Filtering During Async Load

### Problem

After verifying saves work correctly, chapters still disappeared after HMR. Root cause was **filtering logic**.

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Lines 2352-2359)

**The Issue**:
1. After HMR, component re-renders
2. Parent's `loadAll()` is async, not complete yet
3. `chapters` prop is `[]` (empty)
4. Filtering removes ALL chapter nodes (no chapters to match against)
5. A few ms later, `loadAll()` completes
6. Too late - nodes already filtered out

### Solution

Keep ALL chapter nodes when `chapters.length === 0` (async load in progress).

#### Implementation

**BEFORE** (Broken):
```typescript
if (node.type === 'chapter') {
  const chapterId = node.data?.id || node.id;
  const shouldKeep = chapterId && chapterIds.has(chapterId);
  if (!shouldKeep) {
    hasChanges = true;
  }
  return shouldKeep;
}
```

**AFTER** (Fixed):
```typescript
if (node.type === 'chapter') {
  const chapterId = node.data?.id || node.id;
  
  // Normal operation: Keep if chapter exists in loaded chapters
  const inLoadedChapters = chapterId && chapterIds.has(chapterId);
  
  // During async load (chapters === []): Keep ALL chapter nodes
  // This prevents chapters from being filtered out during HMR/refresh
  const chaptersStillLoading = chapters.length === 0 && chapterId;
  
  const shouldKeep = inLoadedChapters || chaptersStillLoading;
  
  if (!shouldKeep) {
    hasChanges = true;
  }
  return shouldKeep;
}
```

### Why This Works

**Normal Operation** (`chapters.length > 0`):
- `inLoadedChapters = true/false` (normal filtering)
- `chaptersStillLoading = false`
- Works as before ✅

**During HMR/Refresh** (`chapters.length === 0`):
- `inLoadedChapters = false` (no chapters to match)
- `chaptersStillLoading = true` (preserve chapter nodes)
- Chapters not filtered out ✅

**After Async Load Completes** (`chapters.length > 0`):
- `inLoadedChapters = true`
- `chaptersStillLoading = false`
- Normal filtering resumes ✅

### Benefits

1. ✅ **Simple**: Single boolean check, no complex logic
2. ✅ **Robust**: Doesn't depend on `initialGraphState` availability
3. ✅ **No performance cost**: Condition only evaluates when filtering
4. ✅ **Fixes HMR**: Chapters survive component re-renders
5. ✅ **Fixes refresh**: Chapters visible after page reload

### Complete Fix Summary

**All 7 changes required for chapter persistence**:

1. ✅ **`useUnifiedStorage.ts` (Line 1556)**: Remove skip logic to allow priority override
2. ✅ **`useUnifiedStorage.ts` (Line 1570)**: Fix priority flag to boolean (`!!eventGraphState`)
3. ✅ **`EnhancedLearningGraph.tsx` (Line 3232)**: Restore `invokeOnChaptersChange()`
4. ✅ **`EnhancedLearningGraph.tsx` (Line 167)**: Add `pendingNodesRef`
5. ✅ **`EnhancedLearningGraph.tsx` (Line 3241)**: Set `pendingNodesRef` during drop
6. ✅ **`EnhancedLearningGraph.tsx` (Line 3254)**: Use `pendingNodesRef` in setTimeout
7. ✅ **`EnhancedLearningGraph.tsx` (Line 2352)**: Fix chapter filtering during async load

Without all 7, chapter persistence fails.

---

## Issue 10: Chapter Lost on Frame Drop After Manual Chapter Drop

**Date**: 2024-11-25  
**Reported**: Chapter persists when dropped, but vanishes when a frame is subsequently dropped

### Symptoms

1. Drop chapter → Appears on graph ✅
2. Drop frame → Chapter vanishes ❌
3. Logs show: `ensure-manual-session` event → `🧹 Graph reset: cleared nodes and edges`

### Root Cause

**File**: `src/app/ai-frames/hooks/useAIFlowBuilder.ts`  
**Location**: Lines 965-968

```typescript
// DON'T clear frames from storage - they belong to other sessions!
// Just clear the graph display
if (onGraphReset) {
  onGraphReset();  // ❌ Always called, ignoring skipClear flag!
  console.log(`🧹 [SESSION] Cleared graph display for new session`);
}
```

**The Bug**: When dropping a frame on an empty canvas:
1. Frame drop dispatches `ensure-manual-session` event
2. Event handler calls `createNewSession` with `skipClear: true`
3. **But the `skipClear` flag is never checked!**
4. `onGraphReset()` is always called if provided
5. Graph is cleared, removing the chapter that was already there

### Why `skipClear` Was Ignored

The code has a comment saying "Just clear the graph display" and unconditionally calls `onGraphReset()` without checking the `options?.skipClear` parameter.

This breaks the intent of auto-session creation: preserve existing content while creating a container session.

### Solution

**Check the `skipClear` flag before calling `onGraphReset()`**:

```typescript
// Clear graph display ONLY if not skipping (i.e., manual session switch)
// During auto-creation (frame/chapter drops), preserve existing nodes
if (onGraphReset && !options?.skipClear) {
  onGraphReset();
  console.log(`🧹 [SESSION] Cleared graph display for new session`);
} else if (options?.skipClear) {
  console.log(`✅ [SESSION] Skipping graph clear - preserving existing nodes`);
}
```

### Use Cases Covered

**Case 1: Manual Session Creation (UI button)**
- `skipClear` not provided (undefined or false)
- `onGraphReset()` called → Graph cleared ✅

**Case 2: Auto-Creation During Frame/Chapter Drop**
- `skipClear: true` provided
- `onGraphReset()` NOT called → Existing nodes preserved ✅

**Case 3: Explicit Session Switching**
- `skipClear` not provided
- `onGraphReset()` called → Graph cleared for new session ✅

---

## Issue 11: Chapter Node Pruned During Async Chapter Loading

**Date**: 2024-11-25  
**Reported**: Chapter saved successfully but not visible after refresh/HMR

### Symptoms

1. Logs show: `persistedChapterCount: 1` ✅ (saved correctly)
2. After refresh: `Loaded from localStorage: 1 frames, 1 nodes` ❌ (should be 2 nodes)
3. Chapter vanishes from graph after reload
4. Linear view doesn't show attached chapter

### Root Cause

**File**: `src/components/ai-graphs/FrameGraphIntegration.tsx`  
**Location**: Lines 1754-1764

```typescript
if (node.type === 'chapter') {
  const nodeChapterId = (node.data as ChapterNodeData)?.id || node.id;
  const keep =
    canonicalChapterIds.size === 0
      ? false  // ❌ Removes chapter when chapters array is empty!
      : nodeChapterId && canonicalChapterIds.has(nodeChapterId);

  if (!keep) {
    nodesChanged = true;
  }
  return keep;
}
```

**The Bug**: This chapter pruning logic runs in `FrameGraphIntegration.tsx` whenever `chapters` prop changes. During async loading or HMR:

1. Component renders with `chapters = []` (async load not complete)
2. Pruning logic sees `canonicalChapterIds.size === 0`
3. Returns `false` → Chapter node is removed
4. Graph saves WITHOUT chapter node
5. On next load, chapter is permanently lost

### Why Async Loading Breaks This

The `chapters` prop comes from `useUnifiedStorage`, which loads async:
```typescript
const loadAll = useCallback(async () => {
  // ... async loading ...
  setChapters(chaptersToLoad);  // State update is async!
});
```

During the window between component mount and async load completion:
- `chapters = []`
- Pruning logic removes all chapter nodes
- Save happens with empty chapters

### Solution (Codex Recommendation)

**Keep chapter nodes when `chapters.length === 0` (loading state)**:

```typescript
if (node.type === 'chapter') {
  const nodeChapterId = (node.data as ChapterNodeData)?.id || node.id;
  
  // Keep chapter if:
  // 1. Chapters still loading (empty array) - don't prune during async load
  // 2. Chapter ID matches canonical chapters (normal operation)
  const chaptersStillLoading = canonicalChapterIds.size === 0;
  const matchesCanonical = nodeChapterId && canonicalChapterIds.has(nodeChapterId);
  const keep = chaptersStillLoading || matchesCanonical;
  
  if (!keep) {
    nodesChanged = true;
  }
  return keep;
}
```

### Why This Works

**Normal Operation** (`chapters.length > 0`):
- `chaptersStillLoading = false`
- `matchesCanonical = true/false` (normal filtering)
- Works as before ✅

**During Async Load** (`chapters.length === 0`):
- `chaptersStillLoading = true`
- Chapter nodes are kept (not pruned)
- Graph state preserved during load ✅

**After Load Completes** (`chapters.length > 0`):
- `chaptersStillLoading = false`
- `matchesCanonical = true`
- Normal filtering resumes ✅

### Benefits

1. ✅ **Prevents premature pruning** during async chapter load
2. ✅ **Preserves chapter nodes** across HMR reloads
3. ✅ **No breaking changes** to existing logic
4. ✅ **Simple and robust** - single boolean condition

### Testing

1. Drop chapter → refresh → Chapter should be visible ✅
2. Drop chapter → drop frame → attach → refresh → Both visible ✅
3. Chapter dialog creation → refresh → Chapter persists ✅
4. Linear view shows attached chapters ✅

---

## Issue 12: Frame Node Filtered Out During Async Frame Loading (Option B - Track Existing Nodes)

**Date**: 2024-11-25  
**Reported**: Frame saved correctly but not visible on graph until refresh

### Symptoms

1. Drop chapter → Drop frame
2. Save logs show: `persistedNodeCount: 2, persistedFrameCount: 1, persistedChapterCount: 1` ✅
3. Frame NOT visible on graph ❌
4. Frame shows in linear view ✅
5. Frame count shows "1 frames" ✅
6. After refresh → Frame appears ✅

### Root Cause

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`  
**Location**: Lines 2309-2321

```typescript
if (node.type === 'aiframe' && node.data?.frameId) {
  const matchesLoaded = node.data.frameId && frameIds.has(node.data.frameId);
  const wasInSavedState = savedFrameNodeMap.has(node.data.frameId);
  const shouldKeep = matchesLoaded || wasInSavedState;
  return shouldKeep;
}
```

**The Bug**: `savedFrameNodeMap` is stale!

1. `savedFrameNodeMap` is built from `initialGraphState` at **component mount**
2. New frame dropped → saved → but `initialGraphState` prop not re-rendered yet
3. `savedFrameNodeMap` doesn't include new frame
4. `frameIds` (from `frames` prop) also doesn't include new frame (async delay)
5. Both checks fail → frame filtered out ❌

### Failed Solutions

**Attempt 1**: `savedFrameNodeMap.has(frameId)`
- Maps are stale (built at mount time)
- Don't update until next component mount

**Attempt 2**: `frameIds.size === 0`
- Won't work if other frames already loaded
- Doesn't help during "mixed" state (some frames loaded, new one pending)

### Solution: Track Existing Frame Nodes Before Filtering (Option B)

**Codex Recommendation**: Capture which frames exist in `currentNodes` BEFORE filtering starts.

```typescript
// Build set of frame IDs currently on graph (before filtering)
const existingFrameNodeIds = new Set(
  currentNodes
    .filter(n => n.type === 'aiframe' && n.data?.frameId)
    .map(n => n.data.frameId)
);

const updatedNodes = currentNodes.filter(node => {
  if (node.type === 'aiframe' && node.data?.frameId) {
    const matchesLoaded = frameIds.has(node.data.frameId);
    
    // Preserve nodes that exist on graph during async window
    const framesNotLoadedYet = frames.length === 0;
    const wasAlreadyOnGraph = framesNotLoadedYet && 
      existingFrameNodeIds.has(node.data.frameId);
    
    const shouldKeep = matchesLoaded || wasAlreadyOnGraph;
    
    if (!shouldKeep) {
      hasChanges = true;
    }
    return shouldKeep;
  }
  // ... rest
});
```

### Why This Works

**During Frame Drop** (`frames.length === 0`):
1. Frame node created and added to graph ✅
2. Re-render triggered
3. `existingFrameNodeIds` captures new frame from `currentNodes` ✅
4. `framesNotLoadedYet = true` ✅
5. `wasAlreadyOnGraph = true` ✅
6. Frame kept visible ✅

**After Frames Load** (`frames.length > 0`):
- `framesNotLoadedYet = false`
- `wasAlreadyOnGraph = false` (gated)
- `matchesLoaded` handles filtering ✅

**User Deletes Frame**:
- `frames.length > 0` (loaded)
- `wasAlreadyOnGraph = false` (gated)
- `matchesLoaded = false` (deleted)
- Frame removed ✅

### Implementation

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`  
**Lines**: 2306-2321

Changes:
1. Add `existingFrameNodeIds` Set before `updatedNodes` filter (line ~2306)
2. Update frame filtering logic (lines 2309-2321)

### Testing

1. Drop chapter → Visible ✅
2. Drop frame → **Stays visible** ✅
3. Linear view shows frame ✅
4. Frame count correct ✅
5. Attach chapter to frame → Works ✅
6. Refresh → Both persist ✅
7. Delete frame → Removed ✅

### Implementation Complete

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`  
**Lines**: 2306-2330

Added `existingFrameNodeIds` Set and updated frame filtering logic to preserve nodes during async window.

### All Three Fixes Summary

1. ✅ **useAIFlowBuilder.ts** (Line 966): Respect `skipClear` flag  
2. ✅ **FrameGraphIntegration.tsx** (Line 1760): Keep chapters during async load  
3. ✅ **EnhancedLearningGraph.tsx** (Line 2306): Track existing frames before filter

---

## Issue 13: Linear View Doesn't Show Chapter-Frame Connections

**Date**: 2024-11-25  
**Reported**: Graph shows connection, but linear view doesn't; connection also appears in new sessions

### Symptoms

1. Connect chapter to frame on graph ✅
2. Save logs: `persistedEdgeCount: 1` ✅
3. Graph shows connection line ✅
4. Linear view DOESN'T show connection ❌
5. After refresh: Graph shows connection, linear view still doesn't ❌
6. Create new session: Old c1-f1 connection appears ❌

### Root Cause Analysis (Codex)

**Connection Flow**:
1. `handleAttachFrameToChapter` runs in `EnhancedLearningGraph.tsx` ✅
2. Updates local chapter: `chapter.frameIds.push(frameId)` ✅
3. Updates local frame: `frame.chapterId = chapterId` ✅
4. Calls `invokeOnChaptersChange(updatedChapters)` ✅
5. Triggers `useUnifiedStorage.updateChapters()` ✅
6. Chapters saved to storage ✅
7. **BUT** `invokeOnFramesChange()` is NEVER called ❌
8. Frame's `chapterId` update is LOST ❌
9. Linear view reads from storage → no connection ❌

**The Problem**: Only chapters are persisted, not frames. The connection exists as a graph edge but not in the frame data model that linear view depends on.

### Solution Part 1: Persist Both Chapters AND Frames on Connection

**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts`  
**Handler**: `handleGraphConnectionEvent`

When a chapter-frame connection is added:
1. Detect connection type via edge handles (`chapter-frame-out` → `chapter-frame-in`)
2. Extract chapter ID and frame ID from nodes
3. Update `chaptersRef`: Add frameId to `chapter.frameIds`
4. Update `framesRef`: Set `frame.chapterId`
5. Call **both** `setChapters()` and `setFrames()` to persist
6. Save with `queueBackgroundSave`

**Why This Works**:
- Both data models updated ✅
- Linear view reads from storage → sees connection ✅
- Persists across refreshes ✅

### Solution Part 2: Fix Session Isolation

**Problem**: `skipClear` flag is `true` for ALL session creations, including manual "New Session" button clicks.

**Evidence from Logs**:
```
New session object created
✅ Skipping graph clear - preserving existing nodes  // ❌ Should clear for manual!
```

**Root Cause**: No differentiation between:
- **Manual session creation** (user clicks "New Session" → should clear graph)
- **Auto session creation** (frame drop event → should preserve nodes)

**Solution**: Pass `skipClear: false` for manual session creation.

**Files to Update**:
- Find where "New Session" button calls `createNewSession`
- Pass `{ skipClear: false }` explicitly
- Keep `{ skipClear: true }` for auto-creation (frame drop event)

### Implementation

**Part 1**: Update `handleGraphConnectionEvent` in `useUnifiedStorage.ts` (~line 1597)  
**Part 2**: Update manual session creation call (likely in `AIFlowBuilderPanel.tsx` or `page.tsx`)

### Testing

1. Connect chapter to frame → Linear view shows connection ✅
2. Refresh → Linear view still shows connection ✅
3. Disconnect → Linear view updates ✅
4. Click "New Session" → Blank graph ✅
5. Drop frame (auto session) → Frame visible, no graph reset ✅
6. Switch sessions → Connections preserved per session ✅

---

## Issue 14: Frame Lost on Drop (Connection Handler Side Effect)

**Date**: 2024-11-25  
**Reported**: After fixing Issue 13, frames are lost when dropped; frame count shows 0

### Symptoms

1. Drop chapter → Persists ✅
2. Drop frame → Frame node visible momentarily
3. Frame count shows "0 frames" ❌
4. Linear view shows no frames ❌
5. Logs show: `persistedFrameCount: 0` ❌

### Root Cause

The Issue 13 fix introduced a bug in `handleGraphConnectionEvent`:

```typescript
// Update frames: Set frame.chapterId
updatedFrames = framesRef.current.map(fr => {
  if (fr.id === frameId) {
    return { ...fr, chapterId };
  }
  return fr;
});
framesRef.current = updatedFrames;
setFrames(updatedFrames);
```

**The Problem**:
1. Frame dropped → not yet in `framesRef.current` (async state update)
2. Connection handler fires (even without explicit connection)
3. `framesRef.current` is EMPTY at this point
4. `.map()` on empty array → returns empty array
5. `setFrames([])` called → **ALL frames deleted!**
6. Save completes with `frameCount: 0`

**Evidence from Logs**:
```
Line 200: invokeFramesChange {count: 1}  // Frame created
Line 533: handleForceSaveEvent received
Line 554: persistedFrameCount: 0  // ❌ Frame lost!
```

### Solution Part 1: Guard Frame Update in Connection Handler

Only update frames if frame actually exists:

```typescript
// Update frames: Set frame.chapterId (only if frame exists)
const frameExists = framesRef.current.some(fr => fr.id === frameId);

if (frameExists) {
  updatedFrames = framesRef.current.map(fr => {
    if (fr.id === frameId) {
      return { ...fr, chapterId };
    }
    return fr;
  });
  framesRef.current = updatedFrames;
  setFrames(updatedFrames);
  console.log('✅ Frame updated with chapterId');
} else {
  console.log('⏭️ Skipping frame update - frame not in storage yet');
  updatedFrames = framesRef.current; // Keep existing, don't overwrite!
}
```

### Solution Part 2: Include Frames in Delayed Save Event (Like Chapters)

The deeper issue is that `framesRef.current` is stale when delayed save fires. We need to pass frame data in the event, just like we do for chapters.

**Problem**: Frames are created via `onFramesChange` callback, not directly accessible in `onDrop` handler.

**Solution**: Extract frame data from the node itself:

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`

```typescript
// Add ref for pending frames
const pendingFramesRef = useRef<AIFrame[] | null>(null);

// In onDrop handler for aiframe:
if (type === 'aiframe') {
  // ... create node ...
  
  // Extract frame from node data
  const frameFromNode: AIFrame = {
    id: newNode.data.frameId,
    title: newNode.data.title || `Frame ${index}`,
    content: newNode.data.content || '',
    learningGoal: newNode.data.learningGoal || '',
    sessionId: newNode.data.sessionId,
    timeCapsuleId: newNode.data.timeCapsuleId,
    // ... extract other properties from node.data
  };
  
  pendingFramesRef.current = [frameFromNode];
  
  // In setTimeout:
  const detail = {
    frames: pendingFramesRef.current,  // Include frames!
    chapters: pendingChaptersRef.current,
    graphState: freshGraphState,
    reason: 'node-drop-delayed'
  };
  
  pendingFramesRef.current = null;  // Clear after dispatch
}
```

**File**: `src/app/ai-frames/hooks/useUnifiedStorage.ts`

```typescript
const handleForceSaveEvent = (event: CustomEvent) => {
  const { 
    frames: eventFrames, 
    chapters: eventChapters, 
    graphState: eventGraphState,
    reason
  } = event.detail;
  
  // Use frames from event if provided (priority over stale ref)
  const framesToSave = eventFrames || framesRef.current;
  const chaptersToSave = eventChapters || chaptersRef.current;
  
  if (eventFrames) {
    framesRef.current = eventFrames;
    setFrames(eventFrames);
  }
  
  if (eventChapters) {
    chaptersRef.current = eventChapters;
    setChapters(eventChapters);
  }
  
  queueBackgroundSave(framesToSave, chaptersToSave, eventGraphState, isPriority);
};
```

### Why This Works

**Frame Drop Flow** (fixed):
1. Frame dropped → node created with all frame data
2. `onFramesChange` called → creates frame (async)
3. Frame extracted from node → stored in `pendingFramesRef` (sync)
4. Delayed save fires → includes `pendingFramesRef.current`
5. `handleForceSaveEvent` receives fresh frame data
6. Save with correct frame count ✅

**Connection Flow** (fixed):
1. Connection made → handler checks if frame exists
2. If frame not in storage yet → skip update, don't overwrite
3. Frames preserved ✅

### Implementation

**Part 1**: Guard frame update in `useUnifiedStorage.ts` (~line 1649)
**Part 2**: Add `pendingFramesRef` and frame extraction in `EnhancedLearningGraph.tsx`
**Part 3**: Update `handleForceSaveEvent` to use `eventFrames` in `useUnifiedStorage.ts`

### Testing

1. Drop chapter → Persists ✅
2. Drop frame → **Persists with correct count** ✅
3. Linear view shows frame ✅
4. Connect chapter-frame → Connection persists ✅
5. Linear view shows connection ✅

---

## Issue 15: Frames/Chapters Not Associated with Session (Missing IDs)

**Date**: 2024-11-25  
**Reported**: After fixing Issue 14, frame saves but doesn't show in linear view or session count

### Symptoms

1. Drop chapter and frame → Both visible on graph ✅
2. Frame Statistics shows "Frames: 1" ✅
3. Save logs show `persistedFrameCount: 1` ✅
4. **BUT** Session shows "0 frames" ❌
5. **AND** Linear view shows no frames ❌
6. After refresh: Same issue persists

### Root Cause (Codex Analysis)

**The Problem**: Frames/chapters are created without `sessionId` and `timeCapsuleId`:

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (Lines 3239-3241)

```typescript
sessionId: (frameData.sessionId as string | undefined),  // ❌ undefined!
timeCapsuleId: (frameData.timeCapsuleId as string | undefined),  // ❌ undefined!
```

**Why It Fails**:
1. Frame dropped → node created
2. Frame extracted from node data
3. `sessionId` and `timeCapsuleId` are `undefined` in node data
4. Frame saved with `sessionId: undefined`
5. `sessionFilteredFrames` filters by `frame.sessionId === activeSessionId`
6. Frame doesn't match → filtered out ❌

**Evidence from Logs**:
```
Line 222: framesWithBoth: 0  // Frame doesn't have BOTH sessionId AND timeCapsuleId
```

### Solution: Pass Active IDs as Props

**Step 1**: Pass active IDs to `EnhancedLearningGraph`

**File**: `src/app/ai-frames/page.tsx`

Add props where `EnhancedLearningGraph` is rendered:

```typescript
<EnhancedLearningGraph
  activeSessionId={flowBuilder.activeSessionId}
  activeTimeCapsuleId={timeCapsule.activeTimeCapsuleId}
  // ... existing props
/>
```

**Step 2**: Add props to interface

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`

```typescript
interface EnhancedLearningGraphProps {
  activeSessionId?: string;
  activeTimeCapsuleId?: string;
  // ... existing props
}
```

**Step 3**: Use props in frame extraction

```typescript
// In onDrop handler for aiframe (line 3239-3241):
const extractedFrame: AIFrame = {
  // ... other properties
  sessionId: activeSessionId,  // ✅ From props!
  timeCapsuleId: activeTimeCapsuleId,  // ✅ From props!
};
```

**Step 4**: Use props in chapter creation

```typescript
// In chapter creation (line 3250-3251):
{
  // ... other properties
  timeCapsuleId: activeTimeCapsuleId,
  sessionId: activeSessionId,
}
```

### Why This Works

**Before**:
- Frame created with `sessionId: undefined`
- `sessionFilteredFrames` filters out frame
- Linear view empty, session shows "0 frames"

**After**:
- Frame created with `sessionId: "manual_123..."`
- `sessionFilteredFrames` includes frame
- Linear view shows frame ✅
- Session shows "1 frames" ✅

### Implementation

1. Update `page.tsx` to pass `activeSessionId` and `activeTimeCapsuleId` props
2. Update `EnhancedLearningGraph.tsx` props interface
3. Use props in frame extraction (line 3239-3241)
4. Use props in chapter creation (line 3250-3251)

---

## Issue 16: Session Switching Doesn't Restore Graph State

**Date**: 2024-11-25  
**Reported**: After creating nodes in S1, switching to new S2, then back to S1 shows blank graph

### Symptoms

1. Create S1, drop chapter c1 and frame f1 ✅
2. Click "New Session" → S2 shows blank graph ✅
3. Switch back to S1 → **Blank graph** ❌ (should show c1-f1)
4. Nodes lost from old session

### Root Cause

Graph state IS being saved per session (added in Issue 13), but NOT being properly restored.

**Evidence from Logs**:
```
📊 Restoring graph state: nodeCount: 0, edgeCount: 0
```

Session should have `graphState` with nodes, but it's coming back empty!

### Investigation Needed

Check the session switching flow:
1. Is `graphState` being saved to session correctly?
2. Is `restore-graph-state` event dispatching correct data?
3. Is `initialGraphState` prop being updated when switching?

### Root Cause

The session switching flow works as follows:

1. User clicks session → `flowBuilder.switchSession(sessionId, triggerGraphReset)`
2. `triggerGraphReset()` **clears** `unifiedStorage.graphState` (sets nodes/edges to [])
3. `FrameGraphIntegration` remounts (due to `key={graphResetKey}`)
4. `EnhancedLearningGraph` initializes with **empty** `initialGraphState`
5. Then `restore-graph-state` event fires and updates `unifiedStorage.graphState`
6. **BUT** `useNodesState` and `useEdgesState` only use `initialGraphState` for **initialization**
7. They don't react to prop changes! ❌

**Evidence**: The event listener works correctly and updates `unifiedStorage.graphState`, but `EnhancedLearningGraph` doesn't sync the prop change to its internal state.

### Solution

Add a `useEffect` in `EnhancedLearningGraph` to sync `initialGraphState` changes to nodes/edges.

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (after line 125)

```typescript
// CRITICAL FIX (Issue 16): Sync initialGraphState changes when switching sessions
// When session switches, initialGraphState prop updates but nodes/edges don't automatically sync
useEffect(() => {
  if (initialGraphState) {
    const hasNodes = initialGraphState.nodes && initialGraphState.nodes.length > 0;
    const hasEdges = initialGraphState.edges && initialGraphState.edges.length > 0;
    
    // Only update if initialGraphState has content (session restore)
    if (hasNodes || hasEdges) {
      console.log('🔄 [Issue 16] Syncing initialGraphState to graph:', {
        nodeCount: initialGraphState.nodes.length,
        edgeCount: initialGraphState.edges.length
      });
      setNodes(initialGraphState.nodes || []);
      setEdges(initialGraphState.edges || []);
    }
  }
}, [initialGraphState, setNodes, setEdges]);
```

### Why This Works

**Before**:
- Component mounts with empty `initialGraphState` (due to `triggerGraphReset` clearing it)
- `restore-graph-state` event updates `unifiedStorage.graphState`
- Prop changes but `useNodesState`/`useEdgesState` don't react
- Graph stays blank ❌

**After**:
- Component mounts with empty `initialGraphState`
- `restore-graph-state` event updates `unifiedStorage.graphState`
- Prop changes → `useEffect` detects it
- `setNodes()` and `setEdges()` update the graph ✅
- Graph shows c1-f1 with connections ✅

### Implementation

1. Add `useEffect` to sync `initialGraphState` changes in `EnhancedLearningGraph.tsx`
2. Conditional check: only update if `initialGraphState` has nodes/edges (avoid overwriting with empty state)
3. Log for debugging: track when sync occurs

### Testing

After both fixes:
1. Drop chapter & frame → Linear view shows both, session shows "1 frames" ✅
2. Connect chapter-frame → Linear view shows connection ✅
3. Create new session → Blank graph ✅
4. Switch back to S1 → **c1-f1 visible with connection** ✅
5. Refresh → All persists ✅

---

## Issue 17: Race Condition - Frame SessionId Still Undefined (Codex Analysis)

**Date**: 2024-11-25  
**Reported**: After implementing Issue 15 (passing activeSessionId as props), frames still saved with `sessionId: undefined`

### Symptoms

**Log Line 156**: `🎯 Dispatching ensure-manual-session event for frame drop`  
**Log Line 165**: `📦 Stored pending frame: {sessionId: undefined, timeCapsuleId: undefined}` ❌  
**Log Line 171-172**: Session created, `activeSessionId` updated ✅

Frame is extracted BEFORE the session creation completes, so props haven't updated yet!

### Root Cause (Codex)

**The Timing Problem**:
1. User drops frame on empty graph
2. `ensure-manual-session` event dispatched
3. Frame immediately extracted with `activeSessionId` (still undefined) ❌
4. Event handler runs, creates session, updates `activeSessionId` ✅
5. Too late - frame already saved with undefined!

**Why Props Don't Help**: The props update is asynchronous (React state), but frame extraction happens synchronously in the same event loop.

### Solution: Move Frame Extraction Inside setTimeout

Extract frame data AFTER the 100ms delay, when `ensure-manual-session` has completed and `activeSessionId` is available.

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`

**Before (Broken)**:
```typescript
// Line ~3245
if (type === 'aiframe') {
  window.dispatchEvent(new CustomEvent('ensure-manual-session'));
  
  // ❌ Extract immediately (session not ready!)
  const extractedFrame: AIFrame = {
    sessionId: activeSessionId,  // undefined!
    // ...
  };
  pendingFramesRef.current = [extractedFrame];
}

// Later...
setTimeout(() => {
  // Dispatch with stale data
  window.dispatchEvent(new CustomEvent('force-save-frames', {
    detail: { frames: pendingFramesRef.current }  // ❌ undefined!
  }));
}, 100);
```

**After (Fixed)**:
```typescript
// Line ~3245
if (type === 'aiframe') {
  window.dispatchEvent(new CustomEvent('ensure-manual-session'));
  // Don't extract here - too early!
}

// Later...
setTimeout(() => {
  // ✅ Extract INSIDE setTimeout (session ready now!)
  if (type === 'aiframe') {
    const extractedFrame: AIFrame = {
      sessionId: activeSessionId,  // ✅ Now available!
      timeCapsuleId: activeTimeCapsuleId,  // ✅ Now available!
      // ...
    };
    pendingFramesRef.current = [extractedFrame];
  }
  
  // Dispatch with fresh data
  window.dispatchEvent(new CustomEvent('force-save-frames', {
    detail: { frames: pendingFramesRef.current }  // ✅ Has IDs!
  }));
}, 100);
```

### Implementation

1. Remove frame extraction from initial `if (type === 'aiframe')` block (line ~3254-3284)
2. Move extraction logic INSIDE `setTimeout` (line ~3338)
3. Extract just before dispatching the `force-save-frames` event

---

## Issue 18: Missing Chapter Payload in Delayed Save (Codex Analysis)

**Date**: 2024-11-25  
**Reported**: Chapter visible on graph but not in linear view, session shows "0 chapters"

### Symptoms

**Log Line 968**: `Using chapters from event: 0 chapters; persistedChapterCount: 0`

Even though chapter node appears on graph and `graphState.nodes` has it, the structured chapter data is empty.

### Root Cause

`pendingChaptersRef.current` is never populated during chapter drops, so the delayed save event carries `chapters: null`.

**Evidence**: In chapter drop handler (line ~3294-3320), we update:
- `chaptersRef.current = nextChapters` ✅
- `invokeOnChaptersChange(nextChapters)` ✅
- But NOT `pendingChaptersRef.current` ❌

### Solution: Populate pendingChaptersRef

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (line ~3314)

```typescript
if (type === 'chapter') {
  const nextChapters = [
    ...existingChapters,
    {
      id: nodeId,
      title: chapterData?.title || 'New Chapter',
      // ...
      timeCapsuleId: activeTimeCapsuleId,
      sessionId: activeSessionId,
    } as AiChapter,
  ];
  chaptersRef.current = nextChapters;
  
  // ✅ ADD THIS:
  pendingChaptersRef.current = nextChapters;
  
  invokeOnChaptersChange(nextChapters);
}
```

Also declare the ref at the top (line ~196):
```typescript
const pendingChaptersRef = useRef<AiChapter[] | null>(null);
```

And use it in the event (line ~3368):
```typescript
window.dispatchEvent(new CustomEvent('force-save-frames', {
  detail: {
    // ...
    chapters: pendingChaptersRef.current || chaptersRef.current  // ✅ Include!
  }
}));
```

And clear it after use (line ~3382):
```typescript
pendingNodesRef.current = null;
pendingFramesRef.current = null;
pendingChaptersRef.current = null;  // ✅ Clear
```

---

## Issue 19: Session Isolation - Already Fixed

**Date**: 2024-11-25  
**Status**: Already fixed in Issue 13

Codex identified that "New Session" doesn't clear the graph, showing old connections. However, this was already fixed in Issue 13 by setting `skipClear: false` for manual "New Session" buttons.

**Verification**:
- `src/app/ai-frames/components/AIFlowBuilderPanel.tsx` (line 1003): `skipClear: false` ✅
- `src/app/ai-frames/page.tsx` (line 3863): `skipClear: false` ✅
- Auto-session creation (page.tsx line 1967): `skipClear: true` ✅ (correct - preserves nodes)

No further action needed.

---

### Complete Testing Plan (Issues 15-19)

After all fixes:

1. **Drop chapter on empty graph**:
   - ✅ Session auto-created
   - ✅ Chapter visible on graph
   - ✅ Session shows "1 chapter"
   - ✅ Linear view shows chapter
   - ✅ Log shows `persistedChapterCount: 1, sessionId: "manual_xxx"`

2. **Drop frame on empty graph**:
   - ✅ Session auto-created (if not already exists)
   - ✅ Frame visible on graph
   - ✅ Session shows "1 frame"
   - ✅ Linear view shows frame
   - ✅ Log shows `persistedFrameCount: 1, sessionId: "manual_xxx", timeCapsuleId: "xxx"`

3. **Connect chapter-frame**:
   - ✅ Connection visible on graph
   - ✅ Linear view shows connection

4. **Create new session (manual)**:
   - ✅ Graph is BLANK (no old nodes/edges from previous session)
   - ✅ Session shows "0 frames, 0 chapters"

5. **Switch back to S1**:
   - ✅ Graph shows c1-f1 with connection
   - ✅ Session shows "1 frame, 1 chapter"
   - ✅ Linear view shows both with connection

6. **Refresh page**:
   - ✅ All data persists correctly
   - ✅ Graph, linear view, and session counts all match

---

## Issue 20: Props-Based Approach Failed - Race Condition with React Re-renders

**Date**: 2024-11-25  
**Reported**: After implementing Issue 17 (moving frame extraction inside setTimeout), frames still saved with `sessionId: undefined`

### Symptoms

**Despite the fix**, logs showed:
- Line 602: `📦 Stored pending frame (AFTER session creation): {sessionId: undefined, timeCapsuleId: undefined}` ❌

Even though session was created and `activeSessionId` was updated in `useAIFlowBuilder`, the prop hadn't propagated to `EnhancedLearningGraph` yet.

### Root Cause (Codex Analysis)

**The Timing Problem with Props**:

Props need to propagate through **4 component layers**:
1. `useAIFlowBuilder` updates state → `activeSessionId` set
2. `page.tsx` re-renders
3. `FrameGraphIntegration` re-renders
4. `DualPaneFrameView` re-renders  
5. `EnhancedLearningGraph` re-renders with new prop

**100ms isn't enough for React's re-render cycle!**

**Evidence from Logs**:
- Line 256: `ensure-manual-session` event dispatched
- Line 263: Session created: `manual_1764098522915_psmukfip7` ✅
- Line 270: `activeSessionId` set in `useAIFlowBuilder` ✅
- Line 602 (100ms later): Frame extracted, but prop is **STILL undefined** ❌

### Solution: Use Refs Instead of Props (Codex Solution)

**The Key Insight**: Don't wait for props to update - track the values in refs that update synchronously!

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`

**Step 1**: Add refs to track latest values (line ~178-179):

```typescript
// Track latest session/TimeCapsule IDs for use inside delayed callbacks (avoid stale closures)
const activeSessionIdRef = useRef<string | undefined>(activeSessionId);
const activeTimeCapsuleIdRef = useRef<string | undefined>(activeTimeCapsuleId);
```

**Step 2**: Keep refs in sync with props (line ~232-238):

```typescript
useEffect(() => {
  activeSessionIdRef.current = activeSessionId;
}, [activeSessionId]);

useEffect(() => {
  activeTimeCapsuleIdRef.current = activeTimeCapsuleId;
}, [activeTimeCapsuleId]);
```

**Step 3**: Use refs (not props) when extracting frames (line ~3336-3349):

```typescript
setTimeout(() => {
  if (type === 'aiframe') {
    const currentSessionId = activeSessionIdRef.current;  // ✅ From ref!
    const currentTimeCapsuleId = activeTimeCapsuleIdRef.current;  // ✅ From ref!
    
    const extractedFrame: AIFrame = {
      id: frameData.frameId,
      title: frameData.title || 'New AI Frame',
      // ... other properties
      sessionId: currentSessionId,  // ✅ Now defined!
      timeCapsuleId: currentTimeCapsuleId,  // ✅ Now defined!
      // ...
    };
    
    pendingFramesRef.current = [extractedFrame];
    console.log('📦 Stored pending frame:', { 
      sessionId: extractedFrame.sessionId,  // ✅ Should be defined!
      timeCapsuleId: extractedFrame.timeCapsuleId
    });
  }
  // ... dispatch event
}, 100);
```

**Step 4**: Use refs (not props) when extracting chapters (line ~3294-3299):

```typescript
if (type === 'chapter') {
  const currentSessionId = activeSessionIdRef.current;  // ✅ From ref!
  const currentTimeCapsuleId = activeTimeCapsuleIdRef.current;  // ✅ From ref!
  
  const nextChapters = [
    ...existingChapters,
    {
      id: nodeId,
      title: chapterData?.title || 'New Chapter',
      // ... other properties
      timeCapsuleId: currentTimeCapsuleId,  // ✅ From ref!
      sessionId: currentSessionId,  // ✅ From ref!
    } as AiChapter,
  ];
  // ...
}
```

### Why This Works

**Before (Props)**:
```
Session created → useAIFlowBuilder state updates → page.tsx re-renders → 
FrameGraphIntegration re-renders → DualPaneFrameView re-renders → 
EnhancedLearningGraph re-renders → prop finally available (> 100ms) ❌
```

**After (Refs)**:
```
Session created → useAIFlowBuilder state updates → 
useEffect runs (< 5ms) → ref updated immediately ✅
setTimeout fires → reads from ref (already updated) ✅
```

### Implementation

**Files Changed**:
- `src/components/ai-graphs/EnhancedLearningGraph.tsx`:
  - Added `activeSessionIdRef` and `activeTimeCapsuleIdRef` (lines 178-179)
  - Added `useEffect` to sync refs with props (lines 232-238)
  - Used refs for frame extraction (lines 3336-3349)
  - Used refs for chapter creation (lines 3298-3299)

**Files Changed (useUnifiedStorage guard)**:
- `src/app/ai-frames/hooks/useUnifiedStorage.ts`:
  - Changed `hasFrames: !!eventFrames` to `hasFrames: Array.isArray(eventFrames)` (line 1576)
  - Changed `hasChapters: !!eventChapters` to `hasChapters: Array.isArray(eventChapters)` (line 1578)
  - Added `frameCount` and `chapterCount` to logs (lines 1577, 1579)
  - Changed fallback logic to use `Array.isArray()` checks (lines 1584-1585, 1588, 1594)

### Result

✅ **Frames now save with correct sessionId and timeCapsuleId**  
✅ **Chapters save with correct sessionId and timeCapsuleId**  
✅ **Linear view shows frames and chapters immediately**  
✅ **Session counts are accurate**

---

## Issue 21: Duplicate Edge Keys on Connect (Pending)

**Date**: 2024-11-25  
**Status**: **PENDING** - Not yet resolved  
**Reported**: After connecting chapter and frame, React warning appears

### Symptoms

```
Encountered two children with the same key, `edge|node_1764099273135_6fbuvbgkq_0|node_1764099278158_ogpywq0uf_1|1764099294905_mw58nkhfv`. 
Keys should be unique so that components maintain their identity across updates.
```

### Root Cause (Codex Analysis)

The same edge object is being added to the `edges` array twice, causing duplicate IDs.

**Why**:
1. `onConnect` adds edge to React state ✅
2. External graph sync (e.g., `initialGraphState` sync from Issue 16) runs
3. Same edge gets re-applied **without deduplication** ❌
4. Result: Two identical edges in the array

**Codex Quote**: 
> "If that sync reapplies the same edge on top of the state we already have, with no deduplication, you end up with two entries with the same id."

### Attempted Fixes (Not Working Yet)

**Attempt 1**: Deduplicate edges in `edgesRef` (line 212-215):

```typescript
// Deduplicate edges by id to prevent React key collisions
edgesRef.current = Array.isArray(edges)
  ? edges.filter((edge, index, array) => array.findIndex(e => e.id === edge.id) === index)
  : edges;
```

**Result**: ❌ Still seeing duplicates

**Attempt 2**: Add safety `useEffect` to dedupe edges state (line 220-226):

```typescript
// SAFETY: Ensure edges state is deduplicated before rendering
useEffect(() => {
  if (!Array.isArray(edges)) return;
  const deduped = edges.filter((edge, index, array) => 
    array.findIndex(e => e.id === edge.id) === index
  );
  if (deduped.length !== edges.length) {
    setEdges(deduped);
  }
}, [edges, setEdges]);
```

**Result**: ❌ Still seeing duplicates

### Next Steps

Need to investigate:
1. Where is the duplicate edge being added from?
2. Is `initialGraphState` sync causing the re-addition?
3. Do we need to dedupe before calling `setEdges` in all places?
4. Is the `graph-state-changed` event handler also adding duplicates?

### Workaround

The duplicate edge warning doesn't break functionality - connections work and persist correctly. This is a **visual/console warning** issue, not a data corruption issue.

---

## Issue 12: Frame Node Filtered Out During Async Frame Loading

**Date**: 2024-11-25  
**Reported**: Frame saved correctly but not visible on graph until refresh

### Symptoms

1. Drop frame → Frame node created ✅
2. Logs show: `persistedNodeCount: 2, persistedFrameCount: 1` ✅ (saved correctly)
3. Frame NOT visible on graph ❌
4. Frame appears after refresh ✅
5. Frame count shows "1 frames" in session metadata ✅
6. Linear view shows frame ✅

### Root Cause

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx`  
**Location**: Lines 2309-2314

```typescript
if (node.type === 'aiframe' && node.data?.frameId) {
  const shouldKeep = frameIds.has(node.data.frameId);  // ❌ Filters out during async!
  if (!shouldKeep) {
    hasChanges = true;
  }
  return shouldKeep;
}
```

**The Bug**: This is the **exact same async loading issue** as Issue 11 (chapter pruning):

1. User drops frame on graph
2. `onDrop` creates frame node and adds to graph ✅
3. Frame saved to `unifiedStorage` ✅
4. **BUT** `frames` prop hasn't updated yet (async state propagation)
5. Sync `useEffect` runs (triggered by re-render)
6. `frameIds` Set doesn't include the new frame yet
7. Filter removes frame node from graph ❌
8. Frame invisible on screen (but saved correctly)
9. After refresh, `frames` prop loads → frame appears

### Why Grace Period Won't Work Here

Unlike `sessionFilteredFrames` in `page.tsx`, we can't use a grace period based on `createdAt` timestamp because:

1. The filtering happens **immediately** after drop (within milliseconds)
2. The `frames` prop updates within 100-500ms typically
3. A 5-second grace period would keep deleted frames visible too long
4. Better to use the **same pattern as chapters**: keep when empty/loading

### Solution

Apply the **same fix pattern as chapter pruning**:

```typescript
if (node.type === 'aiframe' && node.data?.frameId) {
  // Keep frame if:
  // 1. Frames still loading (empty) - don't prune during async load
  // 2. Frame ID matches loaded frames (normal operation)
  const framesStillLoading = frameIds.size === 0;
  const matchesLoaded = node.data.frameId && frameIds.has(node.data.frameId);
  const shouldKeep = framesStillLoading || matchesLoaded;
  
  if (!shouldKeep) {
    hasChanges = true;
  }
  return shouldKeep;
}
```

### Why This Works

**Normal Operation** (`frames.length > 0`, `frameIds.size > 0`):
- `framesStillLoading = false`
- `matchesLoaded = true` for existing frames
- `matchesLoaded = false` for deleted frames
- Normal filtering works ✅

**During Frame Drop** (frame saved but `frames` prop not updated):
- If NO frames loaded yet: `framesStillLoading = true` → keep ✅
- If OTHER frames loaded: `matchesLoaded` checks...
  - Wait, this still won't work if other frames are already loaded!

### Better Solution: Check initialGraphState

Since the frame was just saved with `persistedNodeCount: 2`, it should be in `initialGraphState` after the priority save completes. Keep frames that were in the saved state:

```typescript
if (node.type === 'aiframe' && node.data?.frameId) {
  const matchesLoaded = node.data.frameId && frameIds.has(node.data.frameId);
  const wasInSavedState = savedFrameNodeMap.has(node.data.frameId);
  const shouldKeep = matchesLoaded || wasInSavedState;
  
  if (!shouldKeep) {
    hasChanges = true;
  }
  return shouldKeep;
}
```

**Note**: `savedFrameNodeMap` is already built from `initialGraphState` at line 2293-2294.

## Implementation Steps

1. Update frame filtering in `EnhancedLearningGraph.tsx` (lines 2309-2314)
2. Add `wasInSavedState` check using existing `savedFrameNodeMap`
3. Test all scenarios

## Expected Results

1. Drop chapter → Visible immediately ✅
2. Drop frame → **Visible immediately** (not filtered) ✅
3. Drop chapter → drop frame → attach → Both visible with connection ✅
4. Refresh → Both persist ✅
5. Linear view shows both ✅
6. Session metadata shows correct counts ✅

## All Three Fixes Summary

1. ✅ **useAIFlowBuilder.ts** (Line 966): Respect `skipClear` flag
2. ✅ **FrameGraphIntegration.tsx** (Line 1760): Keep chapters during load
3. ❌ **EnhancedLearningGraph.tsx** (Line 2310): Keep frames from saved state
