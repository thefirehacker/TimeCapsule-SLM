# AI Frame Saving Error Fix Plan

## Problem Analysis
**Error**: `RxError (CONFLICT): Document update conflict. When changing a document you must work on the previous revision`

**Root Cause**: Multiple components are simultaneously trying to update the same RxDB document, causing revision conflicts:
1. **FrameGraphIntegration component** (100ms delay)
2. **Main page component** (200ms delay) 
3. **Multiple attachment/edit operations** triggering concurrent syncs

## Issues Identified

### 1. Broken Sync Coordination
- The previously implemented sync coordination mechanism using `window.aiFramesApp.syncInProgress` flag is not working properly
- Multiple sync operations are bypassing the coordination checks
- Race conditions between different sync sources

### 2. Concurrent Document Updates
- `upsertDocument()` calls happening simultaneously on the same document ID
- RxDB requires working on the latest document revision, but multiple operations are using stale revisions
- The VectorStore retry logic (lines 920-940) is not sufficient for this level of concurrency

### 3. Event-Driven Sync Conflicts
- Graph attachment events trigger multiple sync paths
- Frame edit events cause cascading sync operations
- Real-time sync conflicts with manual save operations

## Solution Strategy

### Phase 1: Implement Proper Sync Coordination ✅
- [ ] Fix sync flag coordination mechanism
- [ ] Implement mutex-like locking for VectorStore operations
- [ ] Add proper delay sequencing between sync sources

### Phase 2: Enhance RxDB Conflict Resolution ✅
- [ ] Improve document revision handling in VectorStore
- [ ] Add exponential backoff for conflict retries
- [ ] Implement queue-based sync operations

### Phase 3: Optimize Sync Event Handling ✅
- [ ] Consolidate multiple sync triggers into single operations
- [ ] Add debouncing for rapid consecutive updates
- [ ] Implement smart sync scheduling

### Phase 4: Add Comprehensive Error Handling ✅
- [ ] Graceful degradation for persistent conflicts
- [ ] User-friendly error messages
- [ ] Automatic recovery mechanisms

## Implementation Tasks

### Task 1: Fix Sync Coordination Flag System
**File**: `src/app/ai-frames/page.tsx` - `handleGraphAttachmentChanged()`
- Ensure sync flag is properly set and cleared
- Add timeout protection for stuck flags
- Implement proper flag checking in all sync paths

### Task 2: Enhance VectorStore Conflict Resolution
**File**: `src/components/VectorStore/VectorStore.ts` - `upsertDocument()`
- Implement document revision fetching before each update
- Add progressive retry delays (100ms, 200ms, 400ms, 800ms)
- Add conflict detection and graceful skipping

### Task 3: Implement Sync Operation Queue
**File**: `src/components/VectorStore/VectorStore.ts`
- Create a queue system for document operations
- Ensure sequential processing of same document ID
- Add operation prioritization (user actions > auto-sync)

### Task 4: Fix FrameGraphIntegration Sync Timing
**File**: `src/components/ai-graphs/FrameGraphIntegration.tsx`
- Increase sync delay from 100ms to 500ms (as documented)
- Add proper sync flag checking before operations
- Implement fallback sync scheduling

### Task 5: Add Debug Logging and Monitoring
- Comprehensive logging for all sync operations
- Conflict detection and reporting
- Performance monitoring for sync operations

## Testing Strategy

### Test Cases:
1. **Rapid Attachment Changes**: Connect multiple attachments quickly
2. **Concurrent Frame Edits**: Edit frame while attachments are being processed
3. **Graph Save During Sync**: Trigger manual save during auto-sync
4. **Page Refresh During Sync**: Reload page during active sync operations

### Success Criteria:
- ✅ No RxDB CONFLICT errors in console
- ✅ All frame data persists correctly
- ✅ Attachments remain connected after operations
- ✅ Smooth user experience without sync delays

## Risk Assessment

### High Risk:
- Breaking existing sync functionality
- Data loss during transition
- Performance degradation from excessive queuing

### Mitigation:
- Implement changes incrementally
- Add extensive logging for debugging
- Maintain backward compatibility
- Test thoroughly before deployment

## Timeline
- **Phase 1**: Immediate (highest priority)
- **Phase 2**: 1-2 hours
- **Phase 3**: 2-3 hours
- **Phase 4**: 1 hour

## Notes
- The "orange button" refers to the attachment handle system
- Previous sync coordination was working but has been broken
- Documentation shows this exact issue was solved before
- Focus on preventing conflicts rather than just handling them
