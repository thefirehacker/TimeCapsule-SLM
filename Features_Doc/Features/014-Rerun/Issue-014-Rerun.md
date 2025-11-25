# Issue 014: Agent Rerun Functionality with User Feedback

## Problem Statement

The system needs to support rerunning specific agents with user feedback to correct misclassifications and improve results. For example, if DataInspectorAgent incorrectly classifies a CV as relevant to the query, users should be able to provide corrective feedback and rerun the agent.

## Current State

### Existing Infrastructure 
- Basic rerun functionality exists in the codebase
- UI buttons and handlers are already connected
- Orchestrator has `rerunAgent()` method
- ResearchOrchestrator has `rerunSpecificAgent()` method
- Component chain: `AgentSubSteps.tsx` ’ `ResearchSteps.tsx` ’ `ResearchOutput.tsx` ’ `DeepResearchApp.tsx` ’ `useResearch.ts`

### Missing Components L
- No mechanism to capture user feedback during rerun
- No way to pass corrective instructions to agents
- Agents don't consume or process user feedback
- No UI dialog for collecting rerun feedback

## Solution Architecture

### 1. Feedback Collection Layer

#### A. UI Components
- **RerunFeedbackDialog**: Modal dialog for collecting user feedback
  - Text input for describing what needs correction
  - Optional screenshot/highlight of the incorrect classification
  - Severity level (minor/major correction)
  - Specific instructions for the agent

#### B. Feedback Data Structure
```typescript
interface RerunFeedback {
  agentName: string;
  originalContext: ResearchContext;
  userFeedback: {
    issue: string; // "Step 11 incorrectly classified CV as relevant"
    correction: string; // "This CV should be marked as irrelevant"
    specificInstructions?: string; // "Focus on technical documents only"
    affectedItems?: string[]; // IDs of misclassified items
    severity: 'minor' | 'major';
  };
  timestamp: number;
}
```

### 2. Context Enhancement

#### A. Extended Research Context
```typescript
interface ResearchContext {
  // ... existing fields ...
  
  // New feedback-related fields
  rerunMetadata?: {
    isRerun: boolean;
    previousRunId: string;
    userFeedback?: UserFeedback;
    correctionInstructions?: string[];
    excludedResults?: string[]; // IDs to exclude based on feedback
    adjustedCriteria?: Record<string, any>;
  };
}
```

#### B. Agent Interface Enhancement
```typescript
interface Agent {
  // ... existing methods ...
  
  // New method for feedback-aware processing
  processWithFeedback?(
    context: ResearchContext, 
    feedback: UserFeedback
  ): Promise<ResearchContext>;
}
```

### 3. Implementation Flow

#### Step 1: User Initiates Rerun
1. User clicks rerun button on completed/failed agent
2. System shows feedback dialog
3. User provides correction details

#### Step 2: Feedback Processing
1. System captures feedback in structured format
2. Preserves original context and results
3. Creates enhanced context with feedback

#### Step 3: Agent Execution
1. Agent checks for feedback in context
2. Adjusts processing based on corrections
3. Applies user-specified filters/exclusions
4. Returns corrected results

#### Step 4: Result Validation
1. System compares new results with original
2. Highlights corrections made
3. Shows confidence in corrections

## Implementation Tasks

### Phase 1: Core Infrastructure
1.  Create feedback data structures and interfaces
2.  Extend ResearchContext with rerun metadata
3.  Update Agent interface for feedback processing

### Phase 2: UI Components
1. ó Create RerunFeedbackDialog component
2. ó Integrate dialog with existing rerun buttons
3. ó Add feedback preview/confirmation

### Phase 3: Agent Integration
1. ó Update DataInspectorAgent to process feedback
2. ó Implement feedback-aware filtering logic
3. ó Add correction validation

### Phase 4: Orchestration
1. ó Enhance Orchestrator.rerunAgent() for feedback
2. ó Update ResearchOrchestrator.rerunSpecificAgent()
3. ó Implement result comparison and validation

### Phase 5: Testing & Refinement
1. ó Test with CV misclassification scenario
2. ó Test with multiple feedback corrections
3. ó Validate context preservation

## Example Use Case

### Scenario: CV Misclassification
1. **Initial Run**: DataInspectorAgent classifies a CV as relevant to "improvements in a language model"
2. **User Feedback**: "This is a personal CV, not relevant to language model improvements"
3. **Rerun Process**:
   - Agent receives feedback
   - Updates document type detection
   - Excludes personal documents
   - Re-evaluates remaining documents
4. **Result**: CV correctly marked as irrelevant, only technical documents included

## Technical Considerations

### 1. Context Preservation
- Maintain original RAG chunks
- Preserve agent execution history
- Keep track of all corrections

### 2. Feedback Persistence
- Store feedback for future learning
- Build correction patterns database
- Enable feedback replay for testing

### 3. Performance
- Minimize redundant processing
- Cache unchanged results
- Only reprocess affected items

## Success Metrics
- User can provide specific correction feedback
- Agents respond appropriately to feedback
- Misclassifications are corrected on rerun
- Original context is preserved
- Corrections are clearly indicated

## Future Enhancements
- Machine learning from feedback patterns
- Automatic correction suggestions
- Batch feedback for multiple agents
- Feedback templates for common issues