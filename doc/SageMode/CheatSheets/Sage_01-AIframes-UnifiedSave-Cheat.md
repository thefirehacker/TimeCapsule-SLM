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

1. **Addition Test**: Add 2 frames → Refresh page → Both frames present ✓
2. **Deletion Test**: Delete 1 frame → Refresh page → Frame stays deleted ✓
3. **Connection Test**: Connect 2 frames → Refresh page → Connection present ✓
4. **Status Test**: Perform any action → Status shows "Saving..." then "Saved" ✓
5. **Attachment Test**: Attach chapter → Refresh page → Chapter still attached ✓
6. **Rapid Test**: Rapid add/delete → No race conditions, final state correct ✓

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

### 2.4 Architecture Lessons Learned

**Lesson 1**: React refs update asynchronously; event handlers capture closure variables at creation time

**Lesson 2**: Timeouts aren't just delays - they move code execution to after React update cycle

**Lesson 3**: Single responsibility - deletions should only be handled in one place (React Flow callbacks)

**Lesson 4**: Event-driven architecture requires careful consideration of event timing and data freshness

**Lesson 5**: Status flicker (500ms "Unsaved") is acceptable tradeoff for data consistency

---

## Summary

The unified save system is robust when these principles are followed:

1. **Deletions**: Always skip in event handlers, use timeouts
2. **Additions**: Process immediately, no timeout needed
3. **Updates**: Process immediately, use fresh refs
4. **Testing**: All 6 tests must pass before merging
5. **Red Flags**: Review carefully when modifying core save logic

When in doubt, refer to existing patterns in `handleNodesDelete` for deletions and `onConnect` for additions.
