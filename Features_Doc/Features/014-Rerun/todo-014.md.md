# TODO: Agent Rerun with User Feedback Implementation

## Overview
Implement functionality to rerun specific agents with user feedback to correct misclassifications and improve results.

## Current Status
- [x] **COMPLETED** - Analyzed existing rerun infrastructure
- [x] **COMPLETED** - Identified integration points
- [ ] **IN PROGRESS** - Designing feedback mechanism
- [ ] **NOT STARTED** - Implementation

## Phase 1: Core Data Structures ✅ [COMPLETED]

### 1.1 Define Feedback Interfaces
- [x] Create `UserFeedback` interface
- [x] Create `RerunMetadata` interface
- [x] Extend `ResearchContext` with rerun fields

### 1.2 Update Agent Interfaces
- [x] Add `processWithFeedback` method to Agent interface
- [x] Create `FeedbackAwareAgent` base class
- [x] Define feedback validation schema

## Phase 2: UI Components 🔄 [IN PROGRESS]

### 2.1 Feedback Dialog Component
- [ ] Create `RerunFeedbackDialog.tsx` component
- [ ] Design feedback form UI
- [ ] Add validation for user input
- [ ] Implement screenshot/highlight capability

### 2.2 Integration with Existing UI
- [ ] Update rerun button click handler
- [ ] Show dialog on rerun initiation
- [ ] Pass feedback to backend

### 2.3 Feedback Display
- [ ] Show feedback indicator on rerun agents
- [ ] Display correction summary
- [ ] Highlight changed results

## Phase 3: Agent Implementation ⏳ [NOT STARTED]

### 3.1 DataInspectorAgent Updates
- [ ] Implement `processWithFeedback` method
- [ ] Add feedback parsing logic
- [ ] Create correction strategies based on feedback type
- [ ] Implement document filtering based on user corrections

### 3.2 Feedback Processing Logic
- [ ] Parse user feedback for actionable items
- [ ] Identify affected documents/chunks
- [ ] Apply exclusion rules
- [ ] Adjust classification criteria

### 3.3 Result Validation
- [ ] Compare original vs corrected results
- [ ] Calculate correction confidence
- [ ] Generate correction report

## Phase 4: Orchestration Updates ⏳ [NOT STARTED]

### 4.1 Orchestrator Enhancement
- [ ] Update `rerunAgent` to accept feedback
- [ ] Preserve original context
- [ ] Inject feedback into agent context
- [ ] Track feedback through pipeline

### 4.2 ResearchOrchestrator Updates
- [ ] Modify `rerunSpecificAgent` for feedback
- [ ] Handle feedback dialog response
- [ ] Coordinate UI and backend communication

### 4.3 Context Management
- [ ] Implement context cloning for reruns
- [ ] Preserve agent execution history
- [ ] Maintain feedback audit trail

## Phase 5: Testing & Validation ⏳ [NOT STARTED]

### 5.1 Unit Tests
- [ ] Test feedback data structures
- [ ] Test agent feedback processing
- [ ] Test context preservation

### 5.2 Integration Tests
- [ ] Test CV misclassification scenario
- [ ] Test multiple agent reruns
- [ ] Test feedback persistence

### 5.3 E2E Tests
- [ ] Full rerun flow with feedback
- [ ] UI interaction testing
- [ ] Result validation testing

## Implementation Files to Modify

### New Files to Create:
1. `/src/components/DeepResearch/components/RerunFeedbackDialog.tsx`
2. `/src/lib/multi-agent/interfaces/Feedback.ts`
3. `/src/lib/multi-agent/agents/FeedbackAwareAgent.ts`

### Files to Update:
1. `/src/lib/multi-agent/interfaces/Context.ts` - Add rerun metadata
2. `/src/lib/multi-agent/agents/DataInspectorAgent.ts` - Add feedback processing
3. `/src/lib/multi-agent/core/Orchestrator.ts` - Enhance rerun with feedback
4. `/src/lib/ResearchOrchestrator.ts` - Update rerunSpecificAgent
5. `/src/components/DeepResearch/hooks/useResearch.ts` - Handle feedback dialog
6. `/src/components/DeepResearch/components/AgentSubSteps.tsx` - Trigger feedback dialog

## Example Implementation Flow

```typescript
// 1. User clicks rerun button
onRerunAgent(agentName) {
  // 2. Show feedback dialog
  const feedback = await showFeedbackDialog(agentName);
  
  // 3. Prepare enhanced context
  const enhancedContext = {
    ...originalContext,
    rerunMetadata: {
      isRerun: true,
      userFeedback: feedback,
      previousRunId: originalRunId
    }
  };
  
  // 4. Execute agent with feedback
  const result = await orchestrator.rerunAgent(
    agentName, 
    enhancedContext
  );
  
  // 5. Display corrected results
  showCorrectedResults(result);
}
```

## Priority Tasks (Next Steps)

1. **HIGH**: Create RerunFeedbackDialog component
2. **HIGH**: Update DataInspectorAgent with feedback processing
3. **MEDIUM**: Enhance Orchestrator rerun method
4. **MEDIUM**: Implement feedback validation
5. **LOW**: Add feedback persistence for learning

## Success Criteria

- [ ] User can provide specific feedback when rerunning an agent
- [ ] Feedback is properly passed to the agent
- [ ] Agent adjusts its processing based on feedback
- [ ] Misclassifications are corrected
- [ ] Original context is preserved
- [ ] UI clearly shows what was corrected

## Notes

- Focus on DataInspectorAgent first as the primary use case
- Ensure backward compatibility with existing rerun functionality
- Consider adding feedback templates for common corrections
- Plan for future ML integration to learn from feedback patterns    