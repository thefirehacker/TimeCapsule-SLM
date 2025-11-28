# Unified Save System - Cheat Sheet & Issue Documentation

This document provides actionable guidance for building new features without breaking the unified save system, plus historical context on issues solved.

---

## Section 1: Cheat Sheet - Building Features Without Breaking Unified Save

### 1.1 Architecture Quick Reference

**Component**: `EnhancedLearningGraph.tsx` (React Flow graph, single source of truth)  
**Storage Hook**: `useUnifiedStorage.ts` (event listener, save orchestrator)  
**Event Flow**: User Action → Graph Update → `invokeOnFramesChange` → Event Emission (delayed) → Background Save  
**Key Pattern**: Props down, events up

### 1.2 Core Rules for AI Agents

#### RULE 1: Event Handler Timing

- **Addition events** (`'added'`, `connectionType: 'added'`): Process immediately
- **Removal events** (`'removed'`, `connectionType: 'removed'`): **ALWAYS SKIP** in event handlers
- **Update events** (`'updated'`, `connectionType: 'updated'`): Process immediately

#### RULE 2: Deletion Pattern

When implementing frame/chapter/connection deletion:

```typescript
// 1. Update state via callback FIRST
invokeOnFramesChange(filteredFrames);

// 2. Emit event with 500ms timeout
setTimeout(() => {
  window.dispatchEvent(new CustomEvent('graph-frame-deleted', {
    detail: { frameId, deletedFrameIds: [frameId] }
  }));
}, 500);
```

#### RULE 3: Addition Pattern

When implementing frame/chapter/connection addition:

```typescript
// 1. Update state via callback FIRST
invokeOnFramesChange(updatedFrames);

// 2. Emit event immediately (no timeout)
window.dispatchEvent(new CustomEvent('graph-connection-added', {
  detail: { connection: edge }
}));
```

#### RULE 4: Event Handler Skip Logic

In `useUnifiedStorage.ts`, all event handlers must skip removals:

```typescript
const handleYourNewEvent = (event: any) => {
  const { changeType } = event.detail;
  
  // CRITICAL: Skip removals to prevent stale saves
  if (changeType === 'removed') {
    console.log('⏭️ Skipping removal in handleYourNewEvent');
    return;
  }
  
  // Process additions/updates
  queueBackgroundSave(framesRef.current, ...);
};
```

### 1.3 DOs and DON'Ts by Feature Type

#### Frame Addition (Drop from sidebar to graph)

**✅ DO:**
- Call `invokeOnFramesChange` with updated frames array
- Allow `handleGraphElementChangedEvent` to process `'added'`
- Call `queueBackgroundSave` from fresh React callback

**❌ DON'T:**
- Skip `'added'` changeType in event handlers
- Call `queueBackgroundSave` with stale `framesRef`

#### Frame Deletion (Delete button, danger zone)

**✅ DO:**
- Call `invokeOnFramesChange` BEFORE emitting event
- Use 500ms setTimeout for event emission
- Skip `'removed'` in ALL event handlers
- Maintain `recentlyDeletedFrameIdsRef` tracking

**❌ DON'T:**
- Reduce timeout below 500ms
- Process `'removed'` in any event handler
- Remove timeout entirely

#### Frame Connection (Connect two frames)

**✅ DO:**
- Allow `handleGraphConnectionEvent` to process `'added'`
- Emit `graph-connection-added` immediately
- Keep edge addition logic active

**❌ DON'T:**
- Skip `connectionType: 'added'`
- Apply deletion skip logic to additions

#### Chapter Creation (Drop new chapter node on graph)

**✅ DO:**
- Update `chaptersRef.current` with new chapter data
- Call `setNodes()` to add visual node to React Flow
- Rely on delayed `force-save-frames` event (100ms) for persistence
- Let React Flow's update cycle complete before save

**❌ DON'T:**
- Call `invokeOnChaptersChange` immediately after chapter creation
- Trigger save before React Flow updates `nodesRef.current`
- Assume refs are fresh immediately after `setNodes()`

#### Chapter Attachment (Attach chapter to frame)

**✅ DO:**
- Update frames array with chapter reference
- Call `invokeOnFramesChange` with updated frames
- Allow normal save flow to persist

**❌ DON'T:**
- Bypass `invokeOnFramesChange`
- Modify frame data without triggering save

### 1.4 Mandatory Testing Checklist

Before committing any feature that touches frames/chapters/connections:

**Basic Save Tests**:
1. **Addition Test**: Add 2 frames → Refresh page → Both frames present ✓
2. **Deletion Test**: Delete 1 frame → Refresh page → Frame stays deleted ✓
3. **Connection Test**: Connect 2 frames → Refresh page → Connection present ✓
4. **Status Test**: Perform any action → Status shows "Saving..." then "Saved" ✓
5. **Attachment Test**: Attach chapter → Refresh page → Chapter still attached ✓
6. **Rapid Test**: Rapid add/delete → No race conditions, final state correct ✓

**Session Isolation Tests** (CRITICAL):
7. **Session Isolation Test**: Drop entity in S1 → Create S2 → Switch back to S1 → Entity still there, S2 empty ✓
8. **Orphaned Assignment Test**: Drop entity before session → Session auto-created → Entity has sessionId ✓
9. **Entity-First Drop Test**: Drop chapter (no session) → Drop frame (session created) → Both visible with correct sessionId ✓
10. **Linear View Sync Test**: Connect entities → Linear view shows connection ✓
11. **Session Count Test**: Drop entities → Session shows correct "X frames, Y chapters" ✓
12. **TimeCapsule Isolation Test**: Create entities in TC1 → Switch to TC2 → Entities not visible in TC2 ✓
13. **Graph State Persistence Test**: Create edges in S1 → Switch to S2 → Back to S1 → Edges present (no refresh needed) ✓

### 1.5 Red Flags (Stop and Review)

If you're about to:

- **Add new addEventListener in useUnifiedStorage** → Add skip logic for removals
- **Call queueBackgroundSave directly** → Ensure refs are fresh, not stale
- **Remove setTimeout from deletion** → DON'T, breaks React update cycle
- **Modify handleNodesDelete/onEdgesDelete** → High risk, review carefully
- **Skip event emission** → Will break auto-save
- **Change invokeOnFramesChange timing** → High risk, causes race conditions

### 1.6 Quick Debug Guide

**Symptom**: Deleted frame reappears  
**Check**: Event handlers skipping removals? Timeout present?

**Symptom**: Status stuck "Unsaved"  
**Check**: Event emission present? Timeout not too long?

**Symptom**: Connection disappears  
**Check**: Not skipping 'added' events? Connection save logic active?

**Symptom**: Entity saves but not visible in linear view/session  
**Check**: Entity has `sessionId` and `timeCapsuleId`? Orphaned entity assignment implemented?

**Symptom**: Entity created with `sessionId: undefined`  
**Check**: Using refs for session IDs in delayed callbacks? Props propagate slowly!

---

### 1.7 Session-Based Unified Save Patterns (CRITICAL)

#### Architecture Overview

The unified save system now includes **session and TimeCapsule isolation**:

```
TimeCapsule (Project)
  └─ Session 1
      ├─ Frames
      ├─ Chapters  
      └─ Graph State (nodes, edges)
  └─ Session 2
      ├─ Frames
      ├─ Chapters
      └─ Graph State
```

**CRITICAL RULES**:
1. **Every entity MUST have `sessionId` and `timeCapsuleId`**
2. **Filters use these IDs for isolation** - entities without IDs are invisible
3. **Two synchronization points required**: creation-time assignment + orphaned assignment

#### “Pattern 0”: Ensure an Active TimeCapsule Before Any Sync

Before importing frames (e.g., SWE Bridge) or auto-creating sessions, **always** make sure a TimeCapsule ID exists. The guard that stamps SWE data now calls `ensureActiveTimeCapsuleId()` which:

```typescript
const ensureActiveTimeCapsuleId = useCallback(async () => {
  // Wait for hook to finish initializing
  if (timeCapsule.activeTimeCapsuleId) return timeCapsule.activeTimeCapsuleId;

  // Reuse first available capsule or auto-create “My First Project”
  if (timeCapsule.timeCapsules?.length) {
    const firstId = timeCapsule.timeCapsules[0].id;
    await timeCapsule.switchTimeCapsule?.(firstId);
    return firstId;
  }

  if (timeCapsule.createTimeCapsule) {
    const created = await timeCapsule.createTimeCapsule("My First Project", "Auto-created for SWE sync");
    await timeCapsule.switchTimeCapsule?.(created?.id ?? "");
    return created?.id ?? null;
  }

  return null;
}, [timeCapsule]);
```

Call this helper (or equivalent) before any import so that downstream stamping logic always receives a valid `sessionId` + `timeCapsuleId` pair.

#### Pattern 1: Orphaned Entity Assignment (REQUIRED for all entity types)

**When to Use**: When implementing ANY new entity type (Frames, Chapters, Concepts, Notes, etc.)

**Problem**: Entities created BEFORE a session exists are saved with `sessionId: undefined`, making them invisible in filtered views.

**Solution** (Copy-paste ready):

```typescript
// In page.tsx or parent component that has access to activeSessionId
useEffect(() => {
  // Guard: Only run when session is active
  if (!activeSessionId || !activeTimeCapsuleId) return;
  
  // Find entities missing session IDs
  const orphanedEntities = entities.filter(e => 
    !e.sessionId &&
    (!e.timeCapsuleId || e.timeCapsuleId === activeTimeCapsuleId)
  );
  
  // Stamp orphaned entities with current session IDs
  if (orphanedEntities.length > 0) {
    console.log(`🔧 Found ${orphanedEntities.length} orphaned entities, assigning to session ${activeSessionId}`);
    
    const fixedEntities = entities.map(e =>
      (!e.sessionId && (!e.timeCapsuleId || e.timeCapsuleId === activeTimeCapsuleId))
        ? { 
            ...e, 
            sessionId: activeSessionId,
            timeCapsuleId: activeTimeCapsuleId || e.timeCapsuleId 
          }
        : e
    );
    
    updateEntities(fixedEntities);  // Persist changes
    console.log(`✅ Assigned sessionId to ${orphanedEntities.length} orphaned entities`);
  }
}, [entities.length, activeSessionId, activeTimeCapsuleId]);
```

**When This Runs**:
- User drops entity on empty graph (no session exists)
- Entity saved with `sessionId: undefined`
- User drops another entity → Session auto-created
- `useEffect` detects orphaned entity → Stamps it with session ID
- Entity now visible in filtered views ✅

**Example Files**:
- Frames: `page.tsx` lines 2096-2105
- Chapters: `page.tsx` lines 2115-2139

#### Pattern 2: Use Refs for Session IDs in Delayed Callbacks (CRITICAL)

**When to Use**: In `setTimeout`, event handlers, or any delayed callback that needs current session IDs

**Problem**: Props take 100ms+ to propagate through 4+ component layers. By the time `setTimeout` fires, props are stale.

**Solution** (Copy-paste ready):

```typescript
// Step 1: Create refs to track session IDs (immune to re-render delays)
const activeSessionIdRef = useRef<string | undefined>(activeSessionId);
const activeTimeCapsuleIdRef = useRef<string | undefined>(activeTimeCapsuleId);

// Step 2: Keep refs in sync with props
useEffect(() => {
  activeSessionIdRef.current = activeSessionId;
}, [activeSessionId]);

useEffect(() => {
  activeTimeCapsuleIdRef.current = activeTimeCapsuleId;
}, [activeTimeCapsuleId]);

// Step 3: In delayed callbacks, read from refs (NOT props!)
setTimeout(() => {
  const newEntity = {
    id: generateId(),
    title: 'New Entity',
    sessionId: activeSessionIdRef.current,      // ✅ From ref - immediate!
    timeCapsuleId: activeTimeCapsuleIdRef.current,  // ✅ From ref - immediate!
    // ... other properties
  };
  
  // Dispatch save event with fresh session IDs
  window.dispatchEvent(new CustomEvent('force-save-frames', {
    detail: { entities: [newEntity] }
  }));
}, 100);
```

**Why Refs Work**:
- Props: `Session created → 4 re-renders → prop updated (120ms+)` ❌
- Refs: `Session created → useEffect runs (5ms) → ref updated` ✅

**Where to Use**:
- `EnhancedLearningGraph.tsx`: Frame/chapter extraction in `setTimeout`
- Any component with delayed saves
- Event handlers that capture session IDs in closures

#### Pattern 3: Filter Safety for Session Isolation

**When to Use**: When filtering entities by `sessionId` for display

**Problem**: Filtering strictly by `sessionId === activeSessionId` hides entities during:
- Async loading (entities not loaded yet)
- Orphaned entity window (before assignment runs)
- State propagation delays

**Solution 1: Grace Period** (for parent components):

```typescript
const sessionFilteredFrames = useMemo(() => {
  const now = Date.now();
  const GRACE_PERIOD_MS = 5000;  // 5 seconds
  
  return frames.filter(frame => {
    // Normal filter: Frame belongs to active session
    if (frame.sessionId === activeSessionId && 
        frame.timeCapsuleId === activeTimeCapsuleId) {
      return true;
    }
    
    // Grace period: Show recently created frames (orphaned assignment in progress)
    const frameAge = now - new Date(frame.createdAt).getTime();
    if (frameAge < GRACE_PERIOD_MS) {
      return true;
    }
    
    return false;
  });
}, [frames, activeSessionId, activeTimeCapsuleId]);
```

**Solution 2: Loading State Check** (for child components):

```typescript
// In filtering logic
if (node.type === 'aiframe' && node.data?.frameId) {
  // Normal operation: Keep if frame exists in loaded frames
  const matchesLoaded = frameIds.has(node.data.frameId);
  
  // During async load: Keep ALL frames (don't prune during loading)
  const framesStillLoading = frameIds.size === 0;
  
  const shouldKeep = matchesLoaded || framesStillLoading;
  return shouldKeep;
}
```

**Where to Use**:
- Solution 1: `page.tsx` for `sessionFilteredFrames`, `sessionFilteredChapters`
- Solution 2: `EnhancedLearningGraph.tsx`, `FrameGraphIntegration.tsx` for node filtering

#### Pattern 4: Entity Connection Updates (Both Data Models)

**When to Use**: When connecting two entities (e.g., chapter-frame, frame-concept)

**Problem**: Graph edges are saved, but structured data (e.g., `frame.chapterId`, `chapter.frameIds`) is not updated. Linear view relies on structured data, not edges.

**Solution** (Copy-paste ready):

```typescript
// In useUnifiedStorage.ts, handleGraphConnectionEvent
const handleGraphConnectionEvent = (event: CustomEvent) => {
  const connection = event.detail?.connection;
  
  // Detect connection type (e.g., chapter-frame)
  if (connection.sourceHandle === 'chapter-frame-out' && 
      connection.targetHandle === 'chapter-frame-in') {
    
    // Extract IDs from connection
    const chapterId = connection.source;
    const frameId = connection.target;
    
    // Update BOTH data models
    
    // 1. Update chapters: Add frameId to chapter.frameIds
    const updatedChapters = chaptersRef.current.map(c => {
      if (c.id === chapterId) {
        return { ...c, frameIds: [...c.frameIds, frameId] };
      }
      return c;
    });
    chaptersRef.current = updatedChapters;
    setChapters(updatedChapters);  // Persist
    
    // 2. Update frames: Set frame.chapterId (only if frame exists)
    const frameExists = framesRef.current.some(f => f.id === frameId);
    if (frameExists) {
      const updatedFrames = framesRef.current.map(f => {
        if (f.id === frameId) {
          return { ...f, chapterId };
        }
        return f;
      });
      framesRef.current = updatedFrames;
      setFrames(updatedFrames);  // Persist
    }
    
    // 3. Save graph state with edge
    queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateRef.current);
  }
};
```

**Why Both Updates Are Required**:
- Graph edge: Visual connection on graph ✅
- Structured data: Linear view, filters, counts ✅

#### Pattern 5: Graph State Session Persistence (useEffect Watcher)

**When to Use**: When child hook methods need to be triggered by parent state changes but circular dependencies prevent direct calling

**Problem**: Graph edges persist in `unifiedStorage` but not in `session.graphState`, causing edges to disappear on session switch (but return on full refresh).

**Timeline of Issue**:
1. User adds edge f1 → f2
2. `unifiedStorage.updateGraphState()` updates localStorage ✅
3. Session saved **without** calling `getGraphState()` ❌
4. Session switch loads empty `session.graphState`
5. Edges cleared (but still in localStorage)
6. Full refresh loads from localStorage → edges reappear

**Why Direct Calling Fails**:
```typescript
// ❌ WRONG - Circular dependency
const flowBuilder = useAIFlowBuilder({
  setGraphState: (state) => {
    unifiedStorage.updateGraphState(state);
    flowBuilder.saveCurrentSession(false); // flowBuilder doesn't exist yet!
  }
});
```

**Solution** (Copy-paste ready):

```typescript
// Step 1: Add ref to track last saved state (prevents infinite loops)
const lastSavedGraphHashRef = useRef<string>('');

// Step 2: Create child hook (flowBuilder)
const flowBuilder = useAIFlowBuilder({
  getGraphState: () => unifiedStorage.graphState,
  setGraphState: (state) => unifiedStorage.updateGraphState(state),
  // ... other props
});

// Step 3: Add useEffect watcher AFTER hook initialization
useEffect(() => {
  // Create hash of current graph state
  const currentHash = JSON.stringify({
    nodes: unifiedStorage.graphState.nodes.map(n => n.id),
    edges: unifiedStorage.graphState.edges.map(e => e.id),
  });
  
  // Only trigger save if:
  // 1. Hash changed (actual state change, not just re-render)
  // 2. Session is active
  // 3. Method is available
  if (currentHash !== lastSavedGraphHashRef.current && 
      flowBuilder.activeSessionId && 
      flowBuilder.saveCurrentSession) {
    
    lastSavedGraphHashRef.current = currentHash;
    
    // Trigger debounced save (respects existing 1s debounce in saveCurrentSession)
    flowBuilder.saveCurrentSession(false);
    
    console.log('🔄 Graph state changed, triggering session save', {
      sessionId: flowBuilder.activeSessionId,
      nodeCount: unifiedStorage.graphState.nodes.length,
      edgeCount: unifiedStorage.graphState.edges.length,
    });
  }
}, [
  unifiedStorage.graphState.nodes,        // Trigger on node changes
  unifiedStorage.graphState.edges,        // Trigger on edge changes
  flowBuilder.activeSessionId,            // Only when session active
  flowBuilder.saveCurrentSession          // Only when method available
]);
```

**Why This Works**:
1. ✅ **No Circular Dependency**: `useEffect` runs **after** `flowBuilder` is created
2. ✅ **Hash-Based Detection**: Only triggers on actual changes, not every re-render
3. ✅ **Leverages Existing Debounce**: `saveCurrentSession(false)` already has 1s debounce
4. ✅ **Performance**: Only compares IDs, not full objects
5. ✅ **React Lifecycle**: `useEffect` runs after render when all refs are stable

**Flow Diagram**:
```
Edge Added → unifiedStorage.updateGraphState()
           ↓
     useEffect detects change (hash comparison)
           ↓
     flowBuilder.saveCurrentSession(false)
           ↓
     getGraphState() returns current edges
           ↓
     Session saved with edges to session store
           ↓
     Session switch → setGraphState() restores
           ↓
     Edges preserved ✅
```

**Critical Requirements**:
- Child hook must accept `getGraphState` and `setGraphState` props
- Child hook's save method must call `getGraphState()` for authoritative state
- Child hook's restore method must call `setGraphState()` to update parent
- Hash must only include IDs (not full objects) for performance

**Example Files**:
- `src/app/ai-frames/page.tsx` (lines 1200, 1244+): useEffect watcher implementation
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts`: DI pattern for graph state

**General Template** (for any parent-child hook trigger scenario):
```typescript
// In parent component
const lastProcessedHashRef = useRef<string>('');

const childHook = useChildHook({ /* props */ });

useEffect(() => {
  const currentHash = JSON.stringify(stateToWatch);
  
  if (currentHash !== lastProcessedHashRef.current && 
      childHook.condition && 
      childHook.methodToTrigger) {
    
    lastProcessedHashRef.current = currentHash;
    childHook.methodToTrigger(args);
    console.log('Triggered due to state change');
  }
}, [stateToWatch, childHook.condition, childHook.methodToTrigger]);
```

**When to Use This Pattern**:
- Graph state needs to persist per session
- Child hook method needs triggering based on parent state
- Circular dependencies prevent direct calling
- State changes should trigger cross-component side effects

**Testing Checklist**:
- [ ] Create edges in S1 → Switch to S2 → Back to S1 → Edges present (no refresh) ✅
- [ ] Console shows "🔄 Graph state changed" only when edges/nodes change ✅
- [ ] No infinite loops (hash prevents re-triggers) ✅
- [ ] Full refresh → Edges still present ✅
- [ ] Multiple sessions → Each session has own graph state ✅

---

#### When to Use Which Pattern (Decision Tree)

**Creating a new entity type?**
→ Implement **Pattern 1** (Orphaned Assignment) + **Pattern 2** (Refs)

**Filtering entities by session?**
→ Implement **Pattern 3** (Filter Safety)

**Connecting two entities?**
→ Implement **Pattern 4** (Both Data Models)

**Using setTimeout with session IDs?**
→ Use **Pattern 2** (Refs, not props)

**Entity not visible despite being saved?**
→ Check **Pattern 1** (Orphaned Assignment) is implemented

**Graph edges lost on session switch (but return on refresh)?**
→ Implement **Pattern 5** (useEffect Watcher for session graph state)

**Child hook method needs triggering from parent state changes?**
→ Use **Pattern 5** (useEffect Watcher with hash-based detection)

---

## Section 2: Issues - Historical Context

### 2.1 Issue: Frame Deletion Not Working

**Problem**: Deleted frames reappeared after page refresh

**Symptoms**: Frame visually deleted, status "Unsaved", frame back on refresh

**Root Cause**: Race condition - `useUnifiedStorage` event handlers captured stale `framesRef.current` in closures, saved outdated data before React updated refs

**Solution Applied**:
- Skip ALL removal events in event handlers (`handleGraphElementChangedEvent`, `handleGraphConnectionEvent`, `handleConnectionChangedEvent`)
- Let `handleNodesDelete` be single source of truth for deletions
- Emit `graph-frame-deleted` with 500ms timeout to allow React state propagation

**Files Changed**:
- `useUnifiedStorage.ts` lines 1399-1405, 1432-1438, 1567-1574
- `EnhancedLearningGraph.tsx` lines 392-405

**Why This Can Recur**: Any new event handler listening to graph changes that calls `queueBackgroundSave` can capture stale refs if removal events aren't skipped

### 2.2 Issue: Unsaved Status

**Problem**: Status indicator stuck on "Unsaved" after operations, changes lost on refresh

**Symptoms**: UI updates correctly but save never triggers, "Unsaved" persists indefinitely

**Root Cause**: Initially removed all event emissions to fix stale saves, but this prevented ANY saves from happening. React lifecycle completes but no event triggers the save.

**Solution Applied**:
- Re-added event emission with 500ms timeout
- Timeout allows React update cycle to complete and refs to update
- Event then triggers save with correct, fresh data

**Files Changed**: `EnhancedLearningGraph.tsx` lines 392-405

**Why This Can Recur**: Removing event emissions entirely or reducing timeout below React update cycle duration (~16-100ms depending on complexity)

### 2.3 Issue: Frame Connection Not Working

**Problem**: Connections between frames not persisted after page refresh

**Symptoms**: Create connection visually appears, refresh page, connection disappears

**Root Cause**: Initially thought to be separate issue, but was actually symptom of Issue 2.1 (stale saves overwriting correct connection data)

**Solution Applied**:
- Keep edge 'added' events active in `handleGraphConnectionEvent` and `handleConnectionChangedEvent`
- Only skip 'removed' events to prevent stale saves
- Connection additions immediately trigger saves with correct data
- No timeout needed for additions (refs are fresh)

**Files Changed**: None (verified existing handlers work correctly after fixing Issue 2.1)

**Why This Can Recur**: Accidentally applying deletion skip logic to 'added' changeTypes when adding new features

### 2.4 Issue: Chapter Drop Not Persisting

**Problem**: Dropped chapters appear briefly then disappear after page reload, visual node missing from graph

**Symptoms**: Chapter data saves to storage (chapterCount: 1) but graph state missing chapter node (nodeCount: 0), chapter disappears on reload

**Root Cause**: Immediate `invokeOnChaptersChange()` call triggered save BEFORE React Flow completed asynchronous node creation. Save captured graph state with nodeCount: 0 because `nodesRef.current` hadn't been updated by React's useEffect yet.

**Timing Issue**:
- T+0ms: `chaptersRef.current = nextChapters` (chapter data stored)
- T+0ms: `invokeOnChaptersChange(nextChapters)` triggers IMMEDIATE save
- T+0ms: Save captures graph with nodeCount: 0 (React Flow hasn't updated yet)
- T+0ms: `setNodesRef.current()` schedules React state update (async)
- T+16-50ms: React Flow completes, updates `nodesRef.current` (too late!)
- T+100ms: Delayed `force-save-frames` event skipped (save already in progress)

**Solution Applied**:
- Removed immediate `invokeOnChaptersChange()` call from chapter drop handler
- Let delayed `force-save-frames` event (100ms timeout) handle the save
- Chapter data stays in `chaptersRef.current`, picked up by delayed save
- Delayed save captures complete graph state after React Flow updates

**Files Changed**:
- `EnhancedLearningGraph.tsx` lines 3191-3226 (removed immediate save call)

**Why This Can Recur**: Any feature that creates new React Flow nodes AND triggers immediate saves will face this race condition. Always use delayed events for node creation to allow React's update cycle to complete.

**Key Distinction**: 
- "Chapter ATTACHMENT" (Sage line 110-119) = updating EXISTING frame with chapter reference, refs are fresh, immediate save OK
- "Chapter CREATION" = creating NEW React Flow node, React state async, MUST use delayed save

### 2.5 Architecture Lessons Learned

**Lesson 1**: React refs update asynchronously; event handlers capture closure variables at creation time

**Lesson 2**: Timeouts aren't just delays - they move code execution to after React update cycle

**Lesson 3**: Single responsibility - deletions should only be handled in one place (React Flow callbacks)

**Lesson 4**: Event-driven architecture requires careful consideration of event timing and data freshness

**Lesson 5**: Status flicker (500ms "Unsaved") is acceptable tradeoff for data consistency

**Lesson 6**: Session isolation requires TWO synchronization points: creation-time assignment + orphaned assignment

**Lesson 7**: Props propagate slowly (100ms+); use refs for session IDs in delayed callbacks

**Lesson 8**: Filters hide data aggressively; implement loading state checks and grace periods

---

### 2.6 Issue: Session Isolation Pitfalls

#### Pitfall 1: Entity Created Before Session Exists

**Symptom**: 
- Entity saves successfully (`persistedEntityCount: 1` in logs)
- Entity shows in graph
- **BUT** entity doesn't appear in linear view, sidebar, or session counts
- Session shows "0 entities" despite entity being saved

**Root Cause**: 
- Entity created when no session is active
- Saved with `sessionId: undefined` and `timeCapsuleId: undefined`
- Session filters exclude entities without matching IDs
- Example: `entities.filter(e => e.sessionId === activeSessionId)` returns empty

**When It Happens**:
- Entity-first drops (chapter before frame, frame before session)
- Direct entity creation without checking session state
- Race conditions during session creation

**Fix**: Implement Orphaned Entity Assignment (Pattern 1 in Section 1.7)

**How to Verify Fixed**:
```javascript
// Check entity in storage
const entity = unifiedStorage.entities.find(e => e.id === 'entity-123');
console.log('Entity sessionId:', entity.sessionId);  // Should be defined, not undefined

// Check filtered results
const filtered = sessionFilteredEntities;
console.log('Filtered count:', filtered.length);  // Should match total count
```

#### Pitfall 2: Stale Session IDs in Closures

**Symptom**:
- Session created successfully
- Logs show: `activeSessionId updated to manual_xxx`
- Entity created in `setTimeout` (100ms after session)
- **BUT** entity still saved with `sessionId: undefined`

**Root Cause**:
- `setTimeout` captures props at closure creation time
- Session created → props update → 4+ re-renders → prop finally reaches component (120ms)
- By 100ms, `setTimeout` fires with stale prop (`undefined`)

**Example of Broken Code**:
```typescript
// ❌ WRONG - Props are stale in setTimeout
if (type === 'frame') {
  const newFrame = {
    sessionId: activeSessionId,  // Props captured at T=0, still undefined
    // ...
  };
  
  setTimeout(() => {
    saveFrame(newFrame);  // Saves with sessionId: undefined!
  }, 100);
}
```

**When It Happens**:
- Using props in `setTimeout` callbacks
- Using props in event handlers that fire later
- Deep component trees (4+ layers from state source)

**Fix**: Use Refs Instead of Props (Pattern 2 in Section 1.7)

**Correct Code**:
```typescript
// ✅ CORRECT - Refs update immediately via useEffect
setTimeout(() => {
  const newFrame = {
    sessionId: activeSessionIdRef.current,  // Ref updated at T=5ms, defined!
    // ...
  };
  saveFrame(newFrame);  // Saves with correct sessionId ✅
}, 100);
```

#### Pitfall 3: Aggressive Filtering Hides Valid Data

**Symptom**:
- Entity saved correctly with `sessionId`
- Logs show entity exists in storage
- **BUT** entity not visible on graph or linear view
- After refresh, entity appears

**Root Cause**:
- Filtering logic runs during async entity loading
- `entities` prop is empty (loading not complete)
- Filter removes ALL entity nodes (no entities to match against)
- A few ms later, entities load, but too late - nodes already removed

**Example of Broken Code**:
```typescript
// ❌ WRONG - Filters out all entities during async load
const filteredNodes = nodes.filter(node => {
  if (node.type === 'entity') {
    return entityIds.has(node.data.entityId);  // entityIds is empty Set during load!
  }
  return true;
});
```

**When It Happens**:
- Async data loading (frames, chapters from storage)
- HMR (Hot Module Reload) resets component state
- Page refresh

**Fix**: Add Loading State Checks (Pattern 3 in Section 1.7)

**Correct Code**:
```typescript
// ✅ CORRECT - Preserves entities during async load
const filteredNodes = nodes.filter(node => {
  if (node.type === 'entity') {
    const matchesLoaded = entityIds.has(node.data.entityId);
    const entitiesStillLoading = entityIds.size === 0;  // Keep all during load
    return matchesLoaded || entitiesStillLoading;
  }
  return true;
});
```

#### Pitfall 4: Graph Edge Without Structured Data Update

**Symptom**:
- Connect two entities on graph
- Connection line visible ✅
- Save logs show `edgeCount: 1` ✅
- After refresh, connection visible on graph ✅
- **BUT** linear view doesn't show connection ❌
- Entity data models don't reflect connection ❌

**Root Cause**:
- Graph edge saved to `graphState.edges` ✅
- **BUT** entity data not updated (e.g., `frame.chapterId`, `chapter.frameIds`) ❌
- Linear view reads from structured data, not graph edges

**When It Happens**:
- Implementing entity connections
- Only updating graph edges, not data models
- Calling `onEdgesChange` but not `updateEntities`

**Fix**: Update Both Data Models (Pattern 4 in Section 1.7)

**Critical**: Connection requires updates in 3 places:
1. Graph edge: `graphState.edges.push(newEdge)`
2. Source entity: `sourceEntity.connectedTo.push(targetId)`
3. Target entity: `targetEntity.connectedFrom = sourceId`

---

## Summary

The unified save system with session isolation is robust when these principles are followed:

### Core Save Principles

1. **Deletions**: Always skip in event handlers, use timeouts
2. **Additions**: 
   - Data updates (frame/chapter attachment): Process immediately, no timeout needed
   - Node creation (new React Flow nodes): MUST use delayed events, React state is async
3. **Updates**: Process immediately, use fresh refs
4. **React Flow Timing**: Never trigger immediate saves after `setNodes()` - use delayed events (100ms+)

### Session Isolation Principles (NEW - CRITICAL)

5. **Session Association**: ALL entities MUST have `sessionId` and `timeCapsuleId`
6. **Orphaned Assignment**: Implement auto-assignment for entities created before session exists (Pattern 1)
7. **Refs Over Props**: Use refs for session IDs in delayed callbacks - props propagate too slowly (Pattern 2)
8. **Filter Safety**: Handle `undefined` sessionId, use loading checks during async updates (Pattern 3)
9. **Both Data Models**: When connecting entities, update graph edges AND structured data (Pattern 4)
10. **Graph State Persistence**: Use useEffect watcher to trigger session saves when graph state changes (Pattern 5)

### Testing Requirements

11. **Testing**: All 13 tests must pass (6 basic + 7 session) before merging
12. **Red Flags**: Review carefully when modifying core save logic

### Reference Patterns

When in doubt, refer to existing patterns:
- **Deletions**: `handleNodesDelete` in `EnhancedLearningGraph.tsx`
- **Node Creation**: `onDrop` handler in `EnhancedLearningGraph.tsx`
- **Orphaned Assignment**: `useEffect` for chapters/frames in `page.tsx` (lines 2096-2139)
- **Refs Pattern**: `activeSessionIdRef` in `EnhancedLearningGraph.tsx` (lines 178-238)
- **Connection Updates**: `handleGraphConnectionEvent` in `useUnifiedStorage.ts` (lines 1597-1670)
- **Graph State Watcher**: `useEffect` for session graph saves in `page.tsx` (after line 1244)

### Quick Reference Card

**Adding a new entity type?** → Implement Pattern 1 (orphaned) + Pattern 2 (refs)  
**Filtering by session?** → Implement Pattern 3 (filter safety)  
**Connecting entities?** → Implement Pattern 4 (both data models)  
**Using setTimeout?** → Use refs, not props  
**Entity not visible?** → Check orphaned assignment is implemented  
**Edges lost on session switch?** → Implement Pattern 5 (useEffect watcher)  
**Child hook needs triggering from parent?** → Use Pattern 5 (hash-based useEffect)  

For detailed issue history and technical deep-dives, see `Features_Doc/Features/021-SWELikeAgents/021E-FrameSession-Unified.md`
