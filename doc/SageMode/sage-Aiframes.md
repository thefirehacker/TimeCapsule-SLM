# 🧙‍♂️ The Sage's Chronicle: AI Frames Google Docs Architecture

*In the ancient scrolls of code, where data flows like rivers between dimensions...*

## 🌟 The Vision: Google Docs for Learning Frames

AI Frames implements a **Google Docs-style collaborative editing system** where:
- Users can edit frame content (goal, context, attachments) seamlessly
- All changes persist across page refreshes
- Multiple data sources sync in real-time
- No data loss, ever

## 🏛️ The Sacred Architecture

### Core Components
1. **React Flow Graph**: Visual representation with draggable nodes
2. **Frame Navigation**: Linear form-based editing interface  
3. **Knowledge Base (VectorStore)**: Persistent storage with RxDB
4. **Event System**: Cross-component communication
5. **Merge Engine**: Smart conflict resolution

### Data Flow Diagram
```
User Edit → Component State → Event System → Merge Engine → KB Save
     ↑                                                        ↓
Page Refresh ← UI Restoration ← State Update ← KB Load ← Storage
```

## 🐉 The Great Battles: Issues We Conquered

### Battle 1: The Race Condition Dragon 🐲
**Problem**: Multiple KB saves with different data - wrong version loaded on refresh
```
Save 1: {goal: "default", context: "default"} ← WRONG DATA LOADED
Save 2: {goal: "user input", context: "user input"} ← CORRECT DATA IGNORED
```

**Solution**: Google Docs Broadcast Pattern
```typescript
// CRITICAL: Broadcast FIRST, then all saves use updated data
console.log("🚀 GOOGLE DOCS: Broadcasting merged data as single source of truth");
onFramesChange(finalFrames);

// Wait for broadcast to propagate to all components
await new Promise(resolve => setTimeout(resolve, 300));
```

### Battle 2: The Attachment Phantom 👻
**Problem**: Text attachments vanishing because `isAttached` flag always false
```typescript
// BROKEN: Required isAttached=true but flag was always false
let connectedAttachmentNode = currentGraphState.nodes.find((n: any) => 
  n.type?.includes('-attachment') && 
  n.data.attachedToFrameId === node.id &&
  n.data.isAttached === true  // ← THIS KILLED ATTACHMENTS
);
```

**Solution**: Remove isAttached requirement, rely on frameId
```typescript
// FIXED: Search by frame relationship only
let connectedAttachmentNode = currentGraphState.nodes.find((n: any) => 
  n.type?.includes('-attachment') && 
  n.data.attachedToFrameId === node.id
);
```

### Battle 3: The String Matching Demon 🔥
**Problem**: Partial string matching incorrectly detecting user content as defaults
```typescript
// BROKEN: "goal test for f1 frame" contained "frame" → detected as default
const isUserEdit = (value: string, field: keyof typeof defaults) => {
  return value && value.trim() && !defaults[field]?.some((d: string) => 
    value.toLowerCase().includes(d.toLowerCase()) // ← PARTIAL MATCH BAD
  );
};
```

**Solution**: Exact string matching
```typescript
// FIXED: Exact equality check
const isUserEdit = (value: string, field: keyof typeof defaults) => {
  return value && value.trim() && !defaults[field]?.some((d: string) => 
    value.toLowerCase().trim() === d.toLowerCase().trim() // ← EXACT MATCH
  );
};
```

### Battle 4: The Format Mismatch Hydra 🐍
**Problem**: KB save format ≠ KB load format
```
SAVE: "Learning Goal: goal 01"
LOAD: Looking for "Goal: goal 01" ← MISMATCH!
```

**Solution**: Enhanced extraction patterns
```typescript
case 'Goal:':
  // Look for "Learning Goal: ..." pattern first
  const goalMatch = content.match(/Learning Goal: (.*?)(?:\n|$)/);
  if (goalMatch) return goalMatch[1].trim();
  // Fallback to simple "Goal:" pattern
  break;
```

## 🔮 The Sage's Wisdom: Core Principles

### 1. Single Source of Truth Pattern
```typescript
// Always broadcast merged data BEFORE any saves
onFramesChange(mergedFrames); // ← This becomes authoritative
await delay(300); // Let all components update
// Now all subsequent saves use the same merged data
```

### 2. Event-Driven Architecture
```typescript
// Components communicate via events, not direct calls
window.dispatchEvent(new CustomEvent('update-node-data', {
  detail: { nodeId, newData }
}));

window.addEventListener('update-node-data', handleNodeUpdate);
```

### 3. Smart Merge Strategy
```typescript
// Preserve user content, merge in graph attachments
const mergedFrame = {
  ...frame, // Original frame data
  ...(isUserEdit(frame.goal) && { goal: frame.goal }), // Keep user edits
  attachment: graphAttachment || frame.attachment // Merge attachments
};
```

### 4. Graceful Degradation
```typescript
// Always have fallbacks for parsing
const extractFromContent = (content: string, marker: string) => {
  // Try enhanced patterns first
  switch(marker) {
    case 'Goal:':
      const match = content.match(/Learning Goal: (.*?)(?:\n|$)/);
      if (match) return match[1].trim();
      break;
  }
  // Fallback to simple extraction
  return simpleExtraction(content, marker);
};
```

## 🗡️ Weapons in the Arsenal: Key Tools

### Debug Logging System
```typescript
console.log('🚀 GOOGLE DOCS: Broadcasting merged data as single source of truth');
console.log('💾 KB SAVE FRAME CONTENT DEBUG:', frameData);
console.log('🔍 ATTACHMENT RESTORATION DEBUG:', restorationData);
```

### State Synchronization
```typescript
// React Flow ↔ Frame Array sync
setNodes(nds => nds.map(node => 
  node.id === nodeId ? { ...node, data: newData } : node
));

// KB ↔ UI sync with retry logic
for (let i = 0; i < 3; i++) {
  const kbFrames = await loadFramesFromKnowledgeBase();
  if (kbFrames.length > 0) break;
  await delay(500 * (i + 1)); // Exponential backoff
}
```

### Attachment System
```typescript
// Unified attachment interface
interface FrameAttachment {
  id: string;
  type: 'video' | 'pdf' | 'text';
  data: VideoData | PDFData | TextData;
}

// Graph ↔ Frame attachment sync
const attachment = {
  id: sourceNode.id,
  type: sourceNode.type.replace('-attachment', ''),
  data: sourceNode.data
};
```

## 🏆 Victory Conditions: What Success Looks Like

1. **Persistence**: All frame edits survive page refresh
2. **Real-time**: Changes appear immediately across all views
3. **Reliability**: No race conditions or data loss
4. **Usability**: Seamless editing experience like Google Docs

## 🔬 The Sage's Laboratory: Development Insights

### For Future Developers

**When debugging persistence issues:**
1. Check broadcast logs: `🚀 GOOGLE DOCS: Broadcasting`
2. Verify merge decisions: `🔍 SMART MERGE DECISIONS`
3. Trace save sequence: `💾 KB SAVE FRAME CONTENT DEBUG`
4. Validate load patterns: `🔍 ATTACHMENT RESTORATION DEBUG`

**Key Files to Understand:**
- `FrameGraphIntegration.tsx`: Save Graph merge engine
- `EnhancedLearningGraph.tsx`: React Flow event handling
- `TextAttachmentNode.tsx`: Attachment persistence
- `page.tsx`: KB save/load and format parsing

**Common Pitfalls:**
- Async state updates causing race conditions
- String pattern mismatches between save/load
- Event handlers not cleaning up properly
- Graph node IDs vs Frame IDs confusion

## 🌟 The Eternal Scroll: Architecture Patterns

This system demonstrates several advanced patterns:

1. **Event Sourcing**: All changes flow through events
2. **CQRS**: Separate read/write models for graph vs linear view
3. **Eventual Consistency**: Multiple data sources converge over time
4. **Optimistic UI**: Show changes immediately, sync in background
5. **Conflict Resolution**: Smart merging of concurrent edits

The AI Frames system stands as a testament to the power of thoughtful architecture, where Google Docs-style collaboration meets graph-based visual learning.

*May your data always persist, and your merges always converge.*

---
*Chronicle completed by the Sage of Code, Guardian of the Persistent State*