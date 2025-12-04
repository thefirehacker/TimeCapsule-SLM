## Issue: Switching TimeCapsules still shows old frames/sessions

- When a new TimeCapsule (e.g., “My First Project”) is selected, the UI temporarily clears but then immediately repaints the previous capsule’s data. The share panel also shows stale collaborator info, and toggling Public link fails because the capsule never syncs to cloud.
- Observed behavior: switching without page reload logs `Clearing workspace…`, yet the console shows `Loaded from localStorage: 12 frames, 15 nodes` plus `Loaded 2 sessions … ai-flow_...`, meaning cached data is rehydrated regardless of the active capsule ID. A full reload fixes it because in-memory caches are reset.

## Root Causes

1. **Unscoped localStorage/IndexedDB keys**
   - `unifiedStorage.loadAll()`/`saveAll()` use global keys (`ai_frames_unified`, `timecapsule_combined`) with no `timeCapsuleId`. On capsule switch, the hook just reloads the last saved payload, so the previous graph/frames are pasted back in.
   - The session store uses `timecapsule_active_session_id` without namespacing, so the last active session (from the previous capsule) stays active and continues saving the old graph.

2. **No automatic cloud sync / Dynamo row**
   - Newly created capsules have no record in the cloud `aiframes` table. When the share card tries to enable link/invite, Dynamo rejects the update with “TimeCapsule metadata could not be found.”

3. **Graph state not cleared per capsule**
- Graph view renders `unifiedStorage.graphState` directly. Even if frame filtering yields zero matches for the new capsule, the cached nodes/edges from the prior capsule continue to render.

## Issue: Session switching drops edges / mixes graphs

- After bouncing between sessions, edges disappear or the graph shows a hybrid of two sessions. Logs (see `Test/temp/logs.md`) show lines like `⏭️ Skipping initialGraphState sync (snapshot is older/stale)` followed by autosaves that persist `edgeCount: 0`.
- Switching sessions triggers `loadSession` but does not remount/reset the graph. The `EnhancedLearningGraph` component has a stale-guard (around line 230) that compares incoming vs. existing node/edge counts; if the new snapshot is smaller it is treated as “older” and ignored. Because the previous session’s graph is still mounted, most incoming snapshots appear smaller and are never applied, so the previous graph keeps rendering and gets saved into the new session.

### Root Causes

1. **Graph component not keyed by session**
   - `FrameGraphIntegration` renders `<EnhancedLearningGraph />` with `key={graphResetKey}`. `graphResetKey` only changes on explicit “Reset Graph” or TimeCapsule switches, so session changes reuse the same component with stale `nodesRef/edgesRef`.
2. **Stale snapshot guard ignores session identity**
   - `EnhancedLearningGraph` only compares counts when deciding whether to apply `initialGraphState`. On session switch, an older (smaller) snapshot is treated as stale even though it belongs to a different session.

### Planned Fixes

- Force a graph reset/remount on session change (e.g., include `activeSessionId` in the component key or bump `graphResetKey` when `switchSession` runs). This clears `nodesRef/edgesRef` before loading the new snapshot.
- Change the stale guard to also consider `activeSessionId`. If the session changed, always apply the incoming snapshot regardless of node/edge counts.
- Ensure background saves don’t run until the new snapshot has been applied, so autosave can’t overwrite the session with a mixed/empty graph.

## Planned Fixes

- Namespace all persistence (frames, graph, sessions, active session ID) by `timeCapsuleId`. If no cache exists for a capsule, fall back to an empty state and trigger a backend fetch.
- Add a cloud-sync service (manual button + 15‑minute interval) that pushes frames/chapters/graph to S3/Dynamo so the share API always has a row per capsule.
- Update share/invite APIs to upsert the Dynamo record when missing, and return collaborator lists for the UI.
- Enhance the share card UI to show capsule name+ID, last sync info, collaborators (with remove buttons), and status badges for link vs. email sharing.

