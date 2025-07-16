# Canvas3D-LLM Development Plan

## Current Status: Video Attachment Persistence After Refresh - FIXING

### New Issue Identified

Video attachments are not persisting after page refresh due to **localStorage loading priority** over Knowledge Base.

### Root Cause Analysis

1. **VectorStore Initialization Delay**: When page refreshes, VectorStore is not ready immediately
2. **localStorage Fallback**: System falls back to localStorage (TimeCapsule/Graph state) which lacks attachment data
3. **Missing Attachment Data**: localStorage only stores basic frame data, not attachment metadata
4. **Priority Issue**: Frames loaded from localStorage are not being updated with KB attachment data

### Timeline of Issue

```
T+0ms:    Page refresh starts
T+100ms:  Frame loading begins, VectorStore not ready
T+200ms:  Falls back to localStorage (no attachment data)
T+1000ms: VectorStore becomes ready, but frames already loaded from localStorage
T+2000ms: User sees video attachment is missing
```

### Solution Implemented

#### 1. VectorStore Availability Monitor

Added a useEffect to monitor VectorStore readiness and reload frames from KB when available:

```typescript
useEffect(() => {
  if (!vectorStore || !vectorStoreInitialized || !processingAvailable) {
    return;
  }

  const reloadFromKBIfNeeded = async () => {
    // Check if current frames have attachment data
    const hasAttachmentData = frames.some((frame) => (frame as any).attachment);

    if (!hasAttachmentData && frames.length > 0) {
      console.log(
        "⚠️ Current frames lack attachment data, reloading from Knowledge Base..."
      );

      // Reload frames from Knowledge Base
      const kbFrames = await loadFramesFromKnowledgeBase();

      if (kbFrames.length > 0) {
        setFrames(kbFrames); // Update with KB data including attachments
      }
    }
  };

  const reloadTimer = setTimeout(reloadFromKBIfNeeded, 1000);
  return () => clearTimeout(reloadTimer);
}, [vectorStore, vectorStoreInitialized, processingAvailable, frames]);
```

#### 2. Enhanced localStorage Sync

Updated localStorage loading to reload from KB after sync to restore attachment data:

```typescript
// After syncing localStorage frames to KB
await syncGraphChangesToKB(localStorageFrames);

// CRITICAL FIX: Reload frames from KB to get attachment data
const kbFrames = await loadFramesFromKnowledgeBase();
if (kbFrames.length > 0) {
  setFrames(kbFrames); // Restore attachment data
}
```

### Expected Behavior After Fix

1. ✅ Page refreshes, falls back to localStorage
2. ✅ VectorStore becomes ready
3. ✅ System detects missing attachment data
4. ✅ Frames are reloaded from Knowledge Base
5. ✅ Video attachment data is restored
6. ✅ Video displays correctly after refresh

## TODO List

### Phase 1: Investigation ✅ COMPLETED

- [x] **task_6_1**: Analyze current frame merge logic in handleGraphAttachmentChanged
- [x] **task_6_2**: Check if the delayed KB sync fix is still in place and working
- [x] **task_6_3**: Verify the mergeFrameUpdates function is preserving attachment data correctly
- [x] **task_6_4**: Identify what changed since the last working version

### Phase 2: Fix Implementation ✅ COMPLETED

- [x] **task_6_5**: Restore proper frame state synchronization without circular updates
- [x] **task_6_6**: Ensure attachment data is preserved during frame merging
- [x] **task_6_7**: Implement proper error handling for document conflicts
- [x] **task_6_8**: Add debug logging to track document revision conflicts

### Phase 3: Testing and Validation 🔄 IN PROGRESS

- [x] **task_6_9**: Test video attachment workflow end-to-end
- [x] **task_6_10**: Verify no RxDB conflicts occur during attachment
- [ ] **task_6_11**: Confirm video persists after page refresh
- [ ] **task_6_12**: Test multiple rapid attachments to ensure stability

### Phase 4: New Fix Implementation 🔄 IN PROGRESS

- [ ] **task_6_15**: Fix video attachment not persisting after page refresh due to localStorage loading

### Phase 5: Documentation Update

- [ ] **task_6_13**: Update aiframes.md with any new fixes implemented
- [ ] **task_6_14**: Document the regression and resolution steps

## Technical Changes Made

### Previous Fixes (Completed)

- **File**: `src/app/ai-frames/page.tsx` - Added sync coordination flags
- **File**: `src/components/ai-graphs/FrameGraphIntegration.tsx` - Increased delay, added coordination check, enhanced error handling

### New Fixes (In Progress)

- **File**: `src/app/ai-frames/page.tsx` - Added VectorStore availability monitor
- **File**: `src/app/ai-frames/page.tsx` - Enhanced localStorage sync to reload from KB

## Testing Required

Please test the video attachment workflow to confirm:

1. Video attaches successfully without RxDB errors ✅
2. Video persists after page refresh ⏳ (Testing)
3. Multiple rapid attachments work correctly ⏳ (Pending)

## Debug Information

Look for these log messages to verify the fix is working:

- `🔄 VectorStore is now ready, checking if frames need to be reloaded from KB...`
- `⚠️ Current frames lack attachment data, reloading from Knowledge Base...`
- `✅ Reloaded frames from KB with attachment data:`
- `🔄 Reloading frames from KB to restore attachment data...`
- `✅ Frames reloaded from KB with attachment data restored`
