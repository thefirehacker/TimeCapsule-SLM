# Solutions - AI Frames Issue 005

## Video Attachment Persistence / Linear View Blank
- **Issue**: Attaching a video node to an existing frame that was already linked to a chapter caused the linear view to render “No Frames Yet,” and the attachment disappeared after refresh.
- **Root Cause**:
  - `FrameGraphIntegration`’s sync routine treated any frame node missing from the latest graph snapshot as deleted, pruning `frames[]` whenever the graph refreshed during an attachment.
  - `useUnifiedStorage`’s attachment handlers only updated React state; the background save queue read from `framesRef.current`, which still held the pre-attachment snapshot, so persistence flushed the attachment on the next save/refresh.
- **Resolution**:
  1. Removed the automatic frame-pruning block in `src/components/ai-graphs/FrameGraphIntegration.tsx`; frame deletion is now handled exclusively by dedicated events.
  2. Hardened the background save queue in `src/app/ai-frames/hooks/useUnifiedStorage.ts` so it falls back to the last non-empty frame snapshot and updates `framesRef.current` in place before queueing a save.
  3. Hydrated `framesRef`, `chaptersRef`, and `graphStateRef` during load so refreshes restore the persisted attachments.
- **Status**: ✅ Fixed
-+- **Verification**: Attach a video to a chapter-linked frame → linear view stays populated; refresh → attachment persists in both graph and linear panes; deleting the video removes it permanently.
