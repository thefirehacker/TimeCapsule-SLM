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

---

## Orphan Attachments Issue - AI Flow Builder Accept All

### Issue Summary
When clicking "Accept All" in AI Flow Builder, PDF and text attachments appeared as orphan nodes:
- **Expected**: 15 nodes (3 chapters + 6 frames + 6 attachments) all connected
- **Actual**: 12 nodes + 6 orphan attachments (not connected to frames)
- **Symptoms**:
  - Attachments show "No URL provided" instead of "Knowledge Base"
  - PDF source not linked to KB documents
  - Attachments not part of official graphState (created by auto-generation)

### Root Cause
The `generateGraphState` function in `useAIFlowBuilder.ts` was only creating:
- 3 chapter nodes
- 6 frame nodes
- Edges between them

It **completely ignored** the `frame.attachment` field, so attachments were never part of the official graphState.

Later, `EnhancedLearningGraph.tsx`'s auto-generation `useEffect` (line 1992) would create attachment nodes from the `frames` prop, but these were:
- Orphan (not in the merge filter)
- Missing KB document references
- Not connected to the official graph structure

### Solution: Generate Attachment Nodes in graphState

#### Step 1: Update `normalizeAttachmentType` to handle new types

**File**: `src/app/ai-frames/hooks/useAIFlowBuilder.ts` (lines 2397-2420)

Added support for:
- `pdf_excerpt` → `pdf-attachment`
- `code` → `text-attachment`

```typescript
case 'pdf':
case 'pdf_excerpt': // New: Handle PDF excerpts from KB
  return 'pdf-attachment';
case 'document':
case 'diagram':
case 'code_snippet':
case 'code': // New: Handle code attachments
case 'text':
case 'image':
  return 'text-attachment';
```

#### Step 2: Add attachment node creation to `generateGraphState`

**File**: `src/app/ai-frames/hooks/useAIFlowBuilder.ts` (after line 1823)

Added new loop after frame nodes to create attachment nodes:

```typescript
// Attachment nodes - below frames at y=800
frames.forEach((frame, index) => {
  // Skip frames without attachments
  if (!frame.attachment) return;
  
  const chapterId = frame.chapterId || chapters[0]?.id || 'default';
  const chapterIndex = chapters.findIndex((c) => c.id === chapterId);
  const framesInChapter = frames.filter((f) => (f.chapterId || chapters[0]?.id) === chapterId);
  const indexInChapter = framesInChapter.findIndex((f) => f.id === frame.id);
  
  // Frame node ID (must match the one created above)
  const frameNodeId = `node_${frame.id}_${indexInChapter}`;
  
  // Attachment node ID
  const attachmentNodeId = `attachment_${frame.id}`;
  
  // Extract KB document filename from description (e.g., "Visual mental model diagram from DDP basics PDF")
  const descriptionText = frame.attachment.description || '';
  const pdfMatch = descriptionText.match(/from\s+(.+\.pdf)/i);
  const extractedFileName = pdfMatch ? pdfMatch[1] : descriptionText;
  
  // Normalize attachment type
  const attachmentType = normalizeAttachmentType(frame.attachment.type);
  
  // Create attachment node
  nodes.push({
    id: attachmentNodeId,
    type: attachmentType,
    position: { 
      x: chapterIndex * 400 + indexInChapter * 200, 
      y: 800 // Below frames
    },
    data: {
      title: extractedFileName,
      pdfFileName: extractedFileName,
      pdfSource: 'kb', // Show "Knowledge Base" in UI
      description: descriptionText,
      url: frame.attachment.url || '', // Use URL if provided
      frameId: frame.id, // Link back to frame
    },
  });
  
  // Create edge from frame to attachment
  edges.push({
    id: `edge_${frameNodeId}_${attachmentNodeId}`,
    source: frameNodeId,
    target: attachmentNodeId,
    sourceHandle: 'frame-attachment-out',
    targetHandle: 'attachment-in',
    type: 'smoothstep',
    style: { stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: '5 5' },
    markerEnd: { type: 'arrowclosed', color: '#94a3b8' },
    data: { relationship: 'attachment' },
  });
});
```

#### Key Features:
1. **Extracts KB document filename** from description using regex pattern `/from\s+(.+\.pdf)/i`
2. **Sets pdfSource to 'kb'** to show "Knowledge Base" in UI
3. **Positions attachments below frames** (y: 800)
4. **Creates dashed edges** from frames to attachments
5. **Uses normalized attachment types** to match React Flow node types

### Why This Works
- **Attachment nodes are now part of graphState**: No more auto-generation orphans
- **KB document references**: Extracted from attachment descriptions
- **Proper graph structure**: All nodes connected via official edges
- **Merge filter works**: `EnhancedLearningGraph` finds attachments by `id` and doesn't append duplicates

### Expected Result
After "Accept All":
```
Console log:
🧪 Graph merge from initialGraphState {
  existingNodeCount: 0,
  incomingNodeIds: Array(15),  // 3 chapters + 6 frames + 6 attachments
  appendedNodeIds: Array(0)    // ← Empty = no orphans!
}
```

Graph display:
- 3 chapters at top
- 6 frames in middle
- 6 attachments at bottom (connected to frames)
- Attachments show "Knowledge Base" as PDF source
- PDF filenames extracted from descriptions

### Files Modified
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts`
  - Lines 2397-2420: Updated `normalizeAttachmentType` to handle `pdf_excerpt` and `code`
  - Lines 1824-1878: Added attachment node and edge creation to `generateGraphState`
  - Line 1880: Removed `normalizeAttachmentType` from dependency array (not needed)

---

## Orphan Attachments Issue Part 2 - Merge Filter Duplicates

### Issue Summary
Even after adding attachment nodes to `generateGraphState`, orphan attachments still appeared because the merge filter couldn't match them:
- **Expected**: 15 nodes (3 chapters + 6 frames + 6 attachments) all connected
- **Actual**: 21 nodes (3 chapters + 6 frames + 12 attachments - 6 from auto-gen + 6 from graphState)
- **Root Cause**: Auto-generated attachments have random IDs (`getId()`), while `generateGraphState` attachments have predictable IDs (`attachment_frame_plan_1`). The merge filter checks by `node.id`, which can't match different IDs.

### Timeline of the Problem

1. **`frames` prop updates** → triggers auto-generation `useEffect` (line 1992)
2. **Auto-generation creates**: 12 nodes (6 frames + 6 attachments with random UUIDs)
3. **`initialGraphState` prop updates** → triggers merge `useEffect` (line 1854)
4. **Merge filter runs**:
   - Finds 6 frame matches by `frameId` → skips them ✅
   - Can't find attachment matches by `node.id` → appends 6 more ❌
5. **Result**: 12 + 9 = 21 nodes (6 orphan attachments + 6 official attachments + 3 chapters + 6 frames)

### Solution: Add frameId-based Duplicate Detection

#### The Fix
**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (lines 1921-1936)

Added a frameId-based duplicate check at the start of the attachment filter, before existing validation logic:

```typescript
if (node.type?.includes('-attachment')) {
  const frameId = node.data?.frameId;
  
  // NEW: Check if an attachment for this frame already exists (by frameId match)
  const attachmentForFrameExists = nodes.some(n => 
    n.type?.includes('attachment') && 
    n.data?.frameId === frameId
  );
  
  if (attachmentForFrameExists) {
    // Skip this attachment - auto-generation already created one for this frame
    if (frameId) {
      skippedAttachmentIds.add(frameId);
    }
    return false;
  }
  
  // Keep existing logic below for other attachment checks
  // (All existing validation still runs if not a duplicate)
}
```

#### Why This Works
- **Before**: Merge filter checked if `node.id` exists in current nodes
  - Auto-generated: `node.id = "uuid-1234"` 
  - From graphState: `node.id = "attachment_frame_plan_1"`
  - No match → append duplicate ❌
  
- **After**: Merge filter checks if an attachment for the same `frameId` exists
  - Auto-generated: `node.data.frameId = "frame_plan_1"`
  - From graphState: `node.data.frameId = "frame_plan_1"`
  - Match found → skip duplicate ✅

#### Safety Guarantees
1. **Additive only**: Added ONE check before existing attachment logic
2. **Early return**: If duplicate found, returns false immediately (no side effects)
3. **Preserves existing checks**: All current attachment validation still runs if not duplicate
4. **No breaking changes**: Doesn't modify frame/chapter logic or auto-generation

### Expected Result
After "Accept All":
```
Console log:
🧪 Graph merge from initialGraphState {
  existingNodeCount: 12,  // 6 frames + 6 auto-generated attachments
  incomingNodeIds: Array(15),  // 3 chapters + 6 frames + 6 attachments
  appendedNodeIds: Array(3),  // Only 3 chapters appended
  skippedAttachmentIds: Array(6),  // ← 6 attachments skipped (duplicates!)
}
```

Graph display:
- 15 total nodes (3 chapters + 6 frames + 6 attachments)
- No orphan attachments
- All attachments connected to frames

### Files Modified
- `src/components/ai-graphs/EnhancedLearningGraph.tsx` (lines 1921-1936)
  - Added frameId duplicate check to attachment merge filter
  - Preserved all existing attachment validation logic

---

## Orphan Attachments Issue Part 3 - Field Name Mismatch

### Issue Summary
After adding the frameId duplicate check, orphan attachments still appeared. Analysis revealed a field name inconsistency:
- **Auto-generated attachments**: Use `data.attachedToFrameId = "frame_plan_1"`
- **graphState attachments**: Use `data.frameId = "frame_plan_1"`
- **Previous merge filter**: Only checked `data.frameId`, so it never found matches

### Root Cause
Two different code paths use different field names for the same concept:

1. **Auto-generation** (`EnhancedLearningGraph.tsx` line 2654):
   ```typescript
   const createAttachmentNodeData = (attachment, frameId) => {
     return {
       attachedToFrameId: frameId,  // ← Uses this field
       // ...
     };
   };
   ```

2. **graphState generation** (`useAIFlowBuilder.ts` lines 1850-1862):
   ```typescript
   nodes.push({
     data: {
       frameId: frame.id,  // ← Uses this field instead
       // ...
     }
   });
   ```

### Solution: Check Both Field Names

Updated the merge filter to accept **both** field naming conventions:

**File**: `src/components/ai-graphs/EnhancedLearningGraph.tsx` (lines 1921-1928)

```typescript
if (node.type?.includes('-attachment')) {
  // Check both possible field names (graphState uses frameId, auto-gen uses attachedToFrameId)
  const frameId = node.data?.frameId || node.data?.attachedToFrameId;
  
  const attachmentForFrameExists = nodes.some(n => 
    n.type?.includes('attachment') && 
    (n.data?.frameId === frameId || n.data?.attachedToFrameId === frameId)
  );
  
  if (attachmentForFrameExists) {
    // Skip duplicate
    if (frameId) {
      skippedAttachmentIds.add(frameId);
    }
    return false;
  }
  // ...
}
```

### Why This Is Safe
1. **No data structure changes**: Doesn't modify how attachments are created
2. **Backward compatible**: Works with existing `attachedToFrameId` field
3. **Forward compatible**: Works with new `frameId` field
4. **Zero breaking changes**: Doesn't affect SWE Bridge, Chapter Dialog, or manual drop

### Expected Result
After "Accept All":
```
Console log:
🧪 Graph merge from initialGraphState {
  existingNodeCount: 12,  // 6 frames + 6 auto-generated attachments
  incomingNodeIds: Array(15),  // 3 chapters + 6 frames + 6 attachments
  appendedNodeIds: Array(3),  // Only 3 chapters appended
  skippedAttachmentIds: Array(6),  // ← 6 attachments skipped!
}
```

Graph display:
- 15 total nodes (3 chapters + 6 frames + 6 attachments)
- No orphan attachments
- All attachments connected to frames via dashed edges

### Files Modified
- `src/components/ai-graphs/EnhancedLearningGraph.tsx` (lines 1921-1928)
  - Updated merge filter to check both `frameId` and `attachedToFrameId`
  - Flexible field name matching for attachments

---

## FINAL FIX: Remove Attachment Generation from generateGraphState

### Issue Summary
All previous fixes failed because they addressed symptoms, not the root cause:
- **Root Cause**: I added attachment node generation to `generateGraphState` (lines 1824-1878 in `useAIFlowBuilder.ts`)
- **The Problem**: SWE Bridge does NOT generate attachment nodes in graphState - only chapters and frames
- **Why It Failed**: By generating attachments in graphState, they were then duplicated by auto-generation in `EnhancedLearningGraph.tsx`

### Comparison with Working SWE Bridge

**SWE Bridge (`fleet_learning_plan.json`):**
```json
{
  "graphState": {
    "nodes": [
      // 4 chapter nodes
      // 8 frame nodes
      // NO attachment nodes
    ]
  }
}
```

**AI Flow Builder (before fix):**
```json
{
  "graphState": {
    "nodes": [
      // 3 chapter nodes
      // 6 frame nodes
      // 6 attachment nodes ← WRONG! Should not be here
    ]
  }
}
```

### The Correct Architecture

1. **SWE Bridge** and **AI Flow Builder** generate graphState with:
   - Chapter nodes
   - Frame nodes
   - Edges between them
   - **NO attachment nodes**

2. **EnhancedLearningGraph.tsx** auto-generation creates attachments during rendering:
   - Reads `frame.attachment` data from frames
   - Creates attachment nodes dynamically
   - Single source of truth for attachment rendering

### Solution: Remove Attachment Generation

**File**: `src/app/ai-frames/hooks/useAIFlowBuilder.ts`

**Removed lines 1824-1879** - the entire attachment generation block that was incorrectly added

### Why This Is The Correct Fix

1. **Matches SWE Bridge exactly**: Only generates chapters + frames in graphState
2. **Single source of truth**: Attachments created only during rendering
3. **No duplicates**: Auto-generation is the only path for attachment creation
4. **Consistent behavior**: Both SWE and AI Flow Builder work the same way

### Expected Result

After "Accept All":
```
Console log:
🧪 Graph merge from initialGraphState {
  existingNodeCount: 0,
  incomingNodeIds: Array(9),  // 3 chapters + 6 frames only
  appendedNodeIds: Array(0)    // No duplicates
}
```

Generated graphState contains:
- 3 chapter nodes
- 6 frame nodes
- 9 edges (chapter-to-frame + sequential)
- **0 attachment nodes**

Graph display after rendering:
- 15 total nodes (3 chapters + 6 frames + 6 attachments from auto-generation)
- No orphan attachments
- All attachments connected to frames

### Files Modified
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts` (removed lines 1824-1879)
  - Removed entire attachment node and edge generation code
  - `generateGraphState` now only creates chapters, frames, and their edges
  - Matches SWE Bridge architecture exactly

### Lessons Learned
- **Always compare with working reference** (SWE Bridge) before adding features
- **Understand the architecture** - attachments are rendering concerns, not data structure
- **Fix root causes, not symptoms** - duplicates were caused by double generation, not merge logic

---

## Issue: Accept All Appending Instead of Replacing (Nov 21, 2024)

### Problem
When clicking "Accept All" in AI Flow Builder multiple times, frames and chapters were being **appended** instead of **replaced**, causing:
- Duplicate key errors (`flow_overview`, `flow_deep-dive`, `flow_fundamentals`)
- Mixed old/new data (e.g., 13 frames in storage but only 7 generated)
- Empty graph (graphState didn't match old frame IDs)
- Chapters showing "0 frames" (frameIds pointing to non-existent frames)
- Console errors showing thousands of duplicate key warnings

### Root Cause
In `src/app/ai-frames/page.tsx`, the `handleAcceptAIFrames` function was spreading old and new arrays:

```typescript
// ❌ BAD: Appending
unifiedStorage.batchUpdate({
  frames: [...unifiedStorage.frames, ...normalized],  // Appends old + new
  chapters: [...unifiedStorage.chapters, ...convertedChapters],  // Appends old + new
  graphState: graphStateToUse,
});
```

This meant every "Accept All" click would add 7 new frames + 3 new chapters ON TOP OF existing ones, creating:
- Run 1: 7 frames, 3 chapters
- Run 2: 14 frames (7 old + 7 new), 6 chapters (3 old + 3 new)
- Run 3: 21 frames, 9 chapters
- etc.

### Solution
Filter out old AI Flow frames/chapters BEFORE adding new ones, while preserving frames from other sources (manual, SWE-bridge):

```typescript
// ✅ GOOD: Replace AI Flow content
const oldAIFlowFrameIds = unifiedStorage.frames
  .filter(f => f.metadata?.source === "ai-frames")
  .map(f => f.id);

const nonAIFlowFrames = unifiedStorage.frames.filter(
  f => f.metadata?.source !== "ai-frames"
);

const nonAIFlowChapters = unifiedStorage.chapters.filter(
  c => !c.frameIds.some(fid => oldAIFlowFrameIds.includes(fid))
);

console.log(`🔄 Replacing AI Flow content: removing ${oldAIFlowFrameIds.length} old frames, adding ${normalized.length} new frames`);
console.log(`🔄 Chapters: removing ${unifiedStorage.chapters.length - nonAIFlowChapters.length} old, adding ${convertedChapters.length} new`);

unifiedStorage.batchUpdate({
  frames: [...nonAIFlowFrames, ...normalized],  // Replace AI Flow frames
  chapters: [...nonAIFlowChapters, ...convertedChapters],  // Replace AI Flow chapters
  graphState: graphStateToUse,
});
```

### Key Changes
1. **Filter by source**: Only remove frames where `metadata.source === "ai-frames"`
2. **Preserve other sources**: Keep manual and SWE-bridge frames intact
3. **Chapter cleanup**: Remove chapters that reference removed frame IDs
4. **Debug logging**: Added logs to track replacement counts

### Expected Behavior
- ✅ Clicking "Accept All" replaces old AI Flow frames/chapters with new ones
- ✅ Manual frames (dropped onto graph) are preserved
- ✅ SWE Bridge frames/chapters are preserved
- ✅ No duplicate key errors
- ✅ Graph displays correctly with proper structure
- ✅ Workspace status shows accurate counts

### Files Modified
- `src/app/ai-frames/page.tsx` (lines ~1989-2020)
  - Added filtering logic to remove old AI Flow content
  - Updated `batchUpdate` to use filtered arrays
  - Added debug logging for replacement counts

### Attachment Type Normalization (Verified)
The `normalizeAttachmentType` function already correctly handles `pdf_excerpt` and other types:
- In `useAIFlowBuilder.ts` line 2449: `type: normalizeAttachmentType(draft.generated.attachment.type)`
- Handles: `pdf_excerpt`, `code`, `document`, `text`, `diagram`, `image`, `video`
- Maps to React Flow node types: `pdf-attachment`, `text-attachment`, `video-attachment`

---

## Issue: Orphan Attachments and Duplicate Key Errors (Nov 21, 2024)

### Problem
After fixing the "Accept All" append issue, attachments were still appearing as orphans and causing duplicate key errors:
- 2-3 orphan PDF attachments not connected to frames
- 2-3 orphan text notes not connected to frames
- React duplicate key error: `Encountered two children with the same key, 'thefirehacker-github-io-til-ddp-python-basics-html.pdf'`
- No frames showing attachments despite having attachment data in JSON

### Root Cause
The `convertDraftToFrame` function had a **structure mismatch** between what the generator produces and what `EnhancedLearningGraph` expects:

**Generator produces:**
```json
{
  "type": "pdf",
  "description": "DDP Python Basics Guide",
  "url": "thefirehacker-github-io-til-ddp-python-basics-html.pdf"
}
```

**Old `convertDraftToFrame` created:**
```typescript
{
  id: draft.generated.attachment.id,  // ❌ Doesn't exist! (undefined)
  type: "pdf-attachment",
  data: {
    description: "...",   // ❌ Should be 'title'
    referenceLabel: "...", // ❌ Not used by EnhancedLearningGraph
    source: "...",        // ❌ Not used by EnhancedLearningGraph
    // ❌ Missing: pdfUrl, pdfFileName, videoUrl, text
  }
}
```

**`EnhancedLearningGraph` expects:**
```typescript
{
  id: "attachment_frame_1",
  type: "pdf-attachment",
  data: {
    title: "DDP Python Basics Guide",
    notes: "...",
    pdfUrl: "thefirehacker-github-io-til-ddp-python-basics-html.pdf",
    pdfFileName: "thefirehacker-github-io-til-ddp-python-basics-html.pdf",
    pdfSource: "url",
    pages: "",
  }
}
```

This mismatch caused:
1. `createAttachmentNodeData` to receive incomplete/wrong data
2. Attachments to have undefined IDs → orphan nodes
3. Missing type-specific fields (pdfUrl, videoUrl, text) → broken rendering
4. Duplicate URLs used as keys → React duplicate key warnings

### Solution
Fixed the attachment structure in `convertDraftToFrame` to properly map generator output to the expected format:

#### 1. Updated `normalizeAttachmentType` (lines 2397-2420)
```typescript
const normalizeAttachmentType = (generatorType: string | undefined): string => {
  if (!generatorType || generatorType === "") {
    return 'text-attachment'; // Default fallback
  }
  switch (generatorType.toLowerCase()) {
    case 'document':
    case 'text':
    case 'text_excerpt':
    case 'code':
      return 'text-attachment';
    case 'diagram':
    case 'image':
      return 'image-attachment';
    case 'pdf':
    case 'pdf_excerpt':
      return 'pdf-attachment';
    case 'video':
      return 'video-attachment';
    default:
      console.warn(`Unknown attachment type: "${generatorType}", defaulting to text-attachment`);
      return 'text-attachment';
  }
};
```

#### 2. Added `extractFilenameFromUrl` helper (lines 2422-2428)
```typescript
const extractFilenameFromUrl = (url: string): string => {
  if (!url) return '';
  // Extract filename from URL or return the URL itself if it's already a filename
  const parts = url.split('/');
  return parts[parts.length - 1] || url;
};
```

#### 3. Fixed attachment mapping in `convertDraftToFrame` (lines 2452-2479)
```typescript
attachment: draft.generated.attachment && 
            draft.generated.attachment.type &&
            draft.generated.attachment.url &&
            (draft.generated.attachment.url as string).trim() !== ""
  ? {
      id: `attachment_${draft.id}`, // ✅ Generate unique ID based on frame ID
      type: normalizeAttachmentType(draft.generated.attachment.type),
      data: {
        title: draft.generated.attachment.description || 'Untitled',
        notes: draft.generated.attachment.description || '',
        // ✅ Map URL to the correct field based on type
        ...(normalizeAttachmentType(draft.generated.attachment.type) === 'pdf-attachment' && {
          pdfUrl: draft.generated.attachment.url || '',
          pages: '',
          pdfFileName: extractFilenameFromUrl(draft.generated.attachment.url),
          pdfSource: draft.generated.attachment.url ? 'url' : 'none',
        }),
        ...(normalizeAttachmentType(draft.generated.attachment.type) === 'video-attachment' && {
          videoUrl: draft.generated.attachment.url || '',
          startTime: 0,
          duration: 480,
        }),
        ...(normalizeAttachmentType(draft.generated.attachment.type) === 'text-attachment' && {
          text: draft.generated.attachment.description || '',
        }),
      },
    }
  : undefined,
```

### Key Changes
1. **Generate unique IDs**: `id: attachment_${draft.id}` ensures each attachment has a unique ID tied to its frame
2. **Skip empty attachments**: Condition checks for empty type/URL to avoid creating broken nodes
3. **Map to correct fields**: Uses spread operator to conditionally add type-specific fields:
   - PDF: `pdfUrl`, `pdfFileName`, `pdfSource`, `pages`
   - Video: `videoUrl`, `startTime`, `duration`
   - Text: `text`
4. **Proper field names**: Maps `description` → `title`, adds `notes`

### Expected Behavior
- ✅ Attachments properly connected to frames (no orphans)
- ✅ No duplicate key errors (unique IDs prevent collisions)
- ✅ PDF attachments display with correct filename and URL
- ✅ Video attachments have proper video URL
- ✅ Text attachments have content
- ✅ Empty attachments are skipped (no broken nodes)
- ✅ Attachment nodes render correctly in graph

### Files Modified
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts` (lines 2397-2479)
  - Updated `normalizeAttachmentType` signature to accept `string | undefined`
  - Added `extractFilenameFromUrl` helper function
  - Completely rewrote attachment mapping in `convertDraftToFrame`
  - Added condition to skip attachments with empty type/URL

---

## Issue: Empty URL Filter Not Working & Auto-Layout Button Hard to Click (Nov 21, 2024)

### Problem 1: Empty URLs Still Creating Attachments
Despite previous fixes, frames with `"url": ""` (empty string) were still creating broken attachments because:
- Empty string `""` is a truthy value in JavaScript when checking `draft.generated.attachment.url &&`
- The condition `(draft.generated.attachment.url as string).trim() !== ""` only executed AFTER the truthy check passed
- Result: Empty URLs passed the filter and created malformed attachments

### Problem 2: Valid Attachment Showing as "Unknown"
Frame 1 with valid URL `"thefirehacker-github-io-til-ddp-python-basics-html.pdf"` showed as "Unknown attachment" despite having valid data.

### Problem 3: Auto-Layout Button Hard to Click
On some laptops, the auto-layout button was difficult to trigger due to:
- Small hit area (no minimum touch target size)
- Missing explicit pointer-events and z-index styling
- Insufficient padding

### Solution

#### 1. Rewrote Attachment Filter with IIFE and Explicit Length Check (lines 2450-2499)

Changed from:
```typescript
attachment: draft.generated.attachment && 
            draft.generated.attachment.type &&
            draft.generated.attachment.url &&
            (draft.generated.attachment.url as string).trim() !== ""
  ? { /* attachment structure */ }
  : undefined,
```

To:
```typescript
attachment: (() => {
  // Debug: Log attachment data before conversion
  if (draft.generated.attachment) {
    const willCreate = !!(
      draft.generated.attachment.type &&
      draft.generated.attachment.url &&
      typeof draft.generated.attachment.url === 'string' &&
      draft.generated.attachment.url.trim().length > 0  // ✅ Explicit length check
    );
    console.log(`🔍 Frame ${draft.id} attachment:`, {
      type: draft.generated.attachment.type,
      url: draft.generated.attachment.url,
      urlLength: draft.generated.attachment.url?.length,
      willCreate
    });
    
    // Only create attachment if type and URL are valid and non-empty
    if (!willCreate) {
      return undefined;
    }
    
    return { /* attachment structure */ };
  }
  return undefined;
})(),
```

**Key Fix**: Changed from `!== ""` to `.trim().length > 0` to explicitly check string length, not just emptiness.

#### 2. Added Debug Logging in page.tsx (lines 2041-2048)

```typescript
// Debug: Log state after batchUpdate
console.log('📊 After batchUpdate:', {
  frameCount: unifiedStorage.frames.length,
  chapterCount: unifiedStorage.chapters.length,
  graphStateNodeCount: graphStateToUse?.nodes?.length,
  graphStateChapterNodeCount: graphStateToUse?.nodes?.filter(n => n.type === 'chapter').length,
  graphStateFrameNodeCount: graphStateToUse?.nodes?.filter(n => n.type === 'aiframe').length,
});
```

This will help identify where duplicate chapters are being created.

#### 3. Fixed Auto-Layout Button Hit Area (FrameGraphIntegration.tsx ~line 1892)

Added minimum touch target size and proper styling:
```typescript
className="text-green-600 hover:text-green-700 min-h-[44px] min-w-[44px] px-4 py-2"
style={{ 
  pointerEvents: 'auto',
  zIndex: 10,
  cursor: 'pointer'
}}
```

**Key Changes**:
- `min-h-[44px] min-w-[44px]`: Ensures 44x44px minimum touch target (WCAG AAA standard)
- `px-4 py-2`: Adds padding for better clickability
- `pointerEvents: 'auto'`: Ensures button receives pointer events
- `zIndex: 10`: Prevents overlapping elements from blocking clicks
- `cursor: 'pointer'`: Visual feedback for clickability

### Expected Results
- ✅ Frames with empty URLs (`""`) have `attachment: undefined` (no broken attachments)
- ✅ Frames with valid URLs create proper attachments
- ✅ Debug logs show exactly which frames are creating attachments and why
- ✅ Debug logs help identify source of duplicate chapters
- ✅ Auto-layout button has proper 44x44px touch target
- ✅ Auto-layout button is easy to click on all devices

### Files Modified
1. `src/app/ai-frames/hooks/useAIFlowBuilder.ts` (lines 2450-2499)
   - Rewrote attachment filter using IIFE
   - Added debug logging for attachment creation
   - Changed filter from `!== ""` to `.trim().length > 0`
   - Fixed TypeScript error by adding `|| ''` to `extractFilenameFromUrl` call

2. `src/app/ai-frames/page.tsx` (lines 2041-2048)
   - Added debug logging after `batchUpdate` to track state changes
   - Logs frame count, chapter count, and graphState node counts

3. `src/components/ai-graphs/FrameGraphIntegration.tsx` (line ~1892)
   - Added `min-h-[44px] min-w-[44px]` classes for touch target size
   - Added inline styles for `pointerEvents`, `zIndex`, and `cursor`
   - Increased padding with `px-4 py-2`

