# Unified Flow Session Manager

## Overview

Transform the AI Flow Builder from a temporary workspace into a persistent session management system that unifies three frame creation workflows: AI Flow Builder (OpenRouter), SWE Bridge, and Manual creation. All sessions are stored in the Knowledge Base with auto-save, source tracking, and seamless switching.

## Core Architecture Changes

### 1. Session Data Model

**Create new types in `src/app/ai-frames/types/session.ts`:**

```typescript
export type SessionSource = "ai-flow" | "swe-bridge" | "manual";
export type SessionStatus = "active" | "completed" | "generating" | "draft";

export interface FlowSession {
  id: string;
  name: string; // User-editable session name
  source: SessionSource; // How session was initially created
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  frameCount: number;
  acceptedFrameCount: number;
  
  // Full session state
  plan: PlannerPlan | null;
  frameDrafts: FrameDraft[];
  sessionState: LearningSessionState;
  
  // Mixed-source tracking
  frameSources: {
    manual: number;
    "ai-flow": number;
    "swe-bridge": number;
  };
}

export interface FrameDraft {
  // ... existing fields ...
  source: SessionSource; // Track individual frame origin
}
```

### 2. Knowledge Base Storage Layer

**Create `src/lib/kb/sessionStore.ts`:**

- Store sessions in special `sessions` collection (separate from user documents)
- Structure: Single document per session containing metadata + frames array JSON
- Use VectorStore's IndexedDB but with `documentType: "session"`
- Implement CRUD operations:
  - `saveSession(session: FlowSession): Promise<void>`
  - `loadSession(sessionId: string): Promise<FlowSession>`
  - `listSessions(): Promise<FlowSession[]>`
  - `deleteSession(sessionId: string): Promise<void>`
  - `updateSessionName(sessionId: string, name: string): Promise<void>`

### 3. Active Session Management

**Update `src/app/ai-frames/hooks/useAIFlowBuilder.ts`:**

Add new state and methods:

```typescript
const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
const [sessions, setSessions] = useState<FlowSession[]>([]);

// Auto-save on every change + 2-minute interval
useEffect(() => {
  if (!activeSessionId) return;
  const saveTimer = setInterval(() => {
    autoSaveCurrentSession();
  }, 120000); // 2 minutes
  return () => clearInterval(saveTimer);
}, [activeSessionId]);

// Save on changes
useEffect(() => {
  if (activeSessionId && (plan || frameDrafts.length > 0)) {
    autoSaveCurrentSession();
  }
}, [plan, frameDrafts, sessionState]);
```

### 4. Session Creation & Switching

**Implement auto-session creation:**

- **AI Flow Builder:** When `planFlow()` is called, create new session or prompt to append
- **Manual Creation:** When first frame is manually saved, auto-create "Manual Session [timestamp]"
- **SWE Bridge:** When `handlePullFromLocalBridge()` is called, create/append to session

**Session switching logic:**

```typescript
const switchSession = async (sessionId: string) => {
  // 1. Prompt to save current work if unsaved changes
  if (hasUnsavedChanges) {
    const confirm = await showConfirmDialog("Save current session?");
    if (confirm) await saveCurrentSession();
  }
  
  // 2. Load session from KB
  const session = await loadSession(sessionId);
  
  // 3. Replace Flow Builder state
  setPlan(session.plan);
  setFrameDrafts(session.frameDrafts);
  setSessionState(session.sessionState);
  setActiveSessionId(sessionId);
  
  // 4. Replace main graph/workspace frames
  onAcceptFrames(session.frameDrafts.map(convertToAIFrame));
};
```

### 5. Flow History UI Enhancement

**Update `src/app/ai-frames/components/AIFlowBuilderPanel.tsx`:**

Add enhanced Flow History section:

```tsx
{sessions.map((session) => (
  <div 
    key={session.id}
    className={activeSessionId === session.id ? "bg-emerald-50 border-emerald-500" : ""}
  >
    {/* Inline editable session name */}
    <input 
      value={session.name}
      onChange={(e) => renameSession(session.id, e.target.value)}
    />
    
    {/* Session type badge */}
    <Badge>{getSessionTypeIcon(session.source)} {session.source}</Badge>
    
    {/* Progress indicator */}
    <span>{session.acceptedFrameCount}/{session.frameCount} frames</span>
    
    {/* Active indicator */}
    {activeSessionId === session.id && <Badge>Active</Badge>}
    
    {/* Actions */}
    <Button onClick={() => switchSession(session.id)}>Load</Button>
    <Button onClick={() => deleteSession(session.id)}>Delete</Button>
  </div>
))}

{/* New Manual Session Button */}
<Button onClick={createNewManualSession}>+ New Manual Session</Button>
```

### 6. Frame Statistics Integration

**Update `src/app/ai-frames/page.tsx` - Frame Statistics section:**

```tsx
<div className="Frame Statistics section">
  <h2>Frame Statistics</h2>
  <p>Frames: {frames.length}</p>
  <p>Mode: Creator</p>
  <p>Status: Saved</p>
  
  {/* NEW: Active Session Display */}
  <div className="border-t pt-4 mt-4">
    <h3 className="font-semibold mb-2">Active Session</h3>
    {activeSession ? (
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{activeSession.name}</p>
          <p className="text-sm text-slate-500">
            {getSessionTypeIcon(activeSession.source)} 
            {activeSession.frameCount} frames
          </p>
        </div>
        <Button 
          onClick={() => setIsFlowPanelOpen(true)}
          variant="outline"
          size="sm"
        >
          Manage Sessions
        </Button>
      </div>
    ) : (
      <Button 
        onClick={() => {
          setIsFlowPanelOpen(true);
          createNewManualSession();
        }}
      >
        Create New Session
      </Button>
    )}
  </div>
</div>
```

### 7. Source-Agnostic Frame Addition

**Update all frame creation paths to append to active session:**

```typescript
// AI Flow Builder
const planFlow = async () => {
  if (!activeSessionId) {
    // Create new AI Flow session
    const newSession = await createSession("ai-flow", prompt);
    setActiveSessionId(newSession.id);
  }
  // Continue with existing logic, frames append to current session
};

// SWE Bridge
const handlePullFromLocalBridge = async () => {
  const frames = await fetchFromBridge();
  
  if (!activeSessionId) {
    // Create new SWE session
    const newSession = await createSession("swe-bridge", "SWE Bridge Import");
    setActiveSessionId(newSession.id);
  }
  
  // Add frames with source tracking
  const newDrafts = frames.map(f => ({ ...f, source: "swe-bridge" }));
  setFrameDrafts([...frameDrafts, ...newDrafts]);
};

// Manual frame creation
const handleSaveFrame = async (frame: AIFrame) => {
  if (!activeSessionId) {
    // Auto-create manual session on first save
    const newSession = await createSession("manual", "Manual Session");
    setActiveSessionId(newSession.id);
  }
  
  const draft = { ...frame, source: "manual" };
  setFrameDrafts([...frameDrafts, draft]);
};
```

### 8. Session Badge Display

**Show mixed-source badges:**

```typescript
const getSessionBadges = (session: FlowSession) => {
  const badges = [];
  if (session.frameSources.manual > 0) badges.push("Manual");
  if (session.frameSources["ai-flow"] > 0) badges.push("AI");
  if (session.frameSources["swe-bridge"] > 0) badges.push("SWE");
  return badges.join(" + ");
};
```

## Implementation Order

1. Create session data models and types
2. Implement KB storage layer for sessions
3. Add active session state management to useAIFlowBuilder
4. Implement auto-save (on change + 2min interval)
5. Update Flow History UI with session list
6. Add session switching logic with graph replacement
7. Update all frame creation paths to use active session
8. Add Frame Statistics active session display
9. Implement session rename functionality
10. Add manual session creation button
11. Test cross-flow scenarios (manual → AI → SWE)
12. Update version to 4.9.0

## Key Files to Modify

- `src/app/ai-frames/types/session.ts` (new)
- `src/lib/kb/sessionStore.ts` (new)
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts`
- `src/app/ai-frames/components/AIFlowBuilderPanel.tsx`
- `src/app/ai-frames/page.tsx`
- `src/lib/version.ts`