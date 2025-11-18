# Issue 021: SWE-Like Agent Performance & Efficiency

**Status**: Draft  
**Priority**: Critical  
**Created**: 2025-11-18  
**Goal**: Reduce AI Flow Builder agent tool calls from 60+ to ~20-40 (matching SWE-bench/Cursor Auto-Dev standards) while maintaining or improving output quality

---

## Problem Statement

### Current Performance Issues

**Quantitative Metrics** (from Test/temp/logs.md and AIbuilderLogs_01.json analysis):
- **50+ OpenRouter API calls** for single lesson plan generation
- **24 redundant tool-call attempts** in QueryPlanner loop
- **60 max iterations** required, but often hitting limit without completing
- **6+ LLM calls by DataInspector** for 1 document analysis (entity extraction, content areas, document role, etc.)
- **0 items extracted** by Extractor despite processing 29 chunks

**Qualitative Issues**:
1. **Sequencing Violation**: `SynthesisCoordinator` called before `Extractor` produces facts → pipeline failure
2. **Document Misclassification**: DataInspector labels documents as "Unknown Document" instead of proper types
3. **Infinite Agent Loops**: Master LLM repeatedly calls non-existent "QueryPlanner" agent
4. **State Divergence**: Pipeline reports "All planned steps completed" but orchestrator continues looping
5. **Inefficient DataInspector**: Makes excessive sub-calls even for single-document scenarios

### Industry Benchmarks

**Cursor Auto-Dev** (April 2024):
- ~40 tool calls maximum for complex tasks
- Intelligent caching and state reuse
- Efficient agent sequencing

**SWE-bench Standards**:
- ~20-30 tool calls for typical repository tasks
- Minimal redundant LLM calls
- Clear termination conditions

**Our Target**: 20-40 tool calls for comprehensive lesson plan generation

---

## Root Cause Analysis

### 0. **CRITICAL**: Global Agent Limits vs Micro-Session Iteration (Architectural Issue)

**Current Behavior**:
```
Orchestrator enforces global limits:
- Each agent can only be called 1-2 times in entire session
- No retry mechanism within focused sub-tasks
- Hard failure when agent doesn't succeed on first try

Example from session_1763456175727:
- PatternGenerator called once → generates broken patterns
- Extractor called once → extracts 0 items (patterns don't work)
- Extractor retry attempted → still 0 items  
- SynthesisCoordinator blocked → HARD FAILURE
- No mechanism to refine patterns and retry within "extract facts from DDP doc" sub-task
```

**Cursor/Codex Pattern** (from user observation):
```
Micro-sessions with focused iteration:

Session: "Create lesson plan from DDP tutorial"
  ├─ Micro-session: "Analyze document structure"
  │   ├─ DataInspector attempt 1 → partial success
  │   ├─ DataInspector attempt 2 → improved
  │   └─ Complete (2 calls within micro-session) ✅
  │
  ├─ Micro-session: "Extract educational content"
  │   ├─ PatternGenerator attempt 1 → creates patterns
  │   ├─ Extractor attempt 1 → 0 items (patterns fail)
  │   ├─ PatternGenerator attempt 2 → refines patterns  
  │   ├─ Extractor attempt 2 → 15 items ✅
  │   └─ Complete (4 calls within micro-session) ✅
  │
  └─ Micro-session: "Synthesize lesson plan"
      ├─ SynthesisCoordinator attempt 1 → draft
      └─ Complete (1 call) ✅

Total: 7 agent calls (vs 60+ currently)
Agents can iterate within context until sub-task succeeds
```

**Impact**: This is the #1 architectural difference between our system and Cursor/Codex:
- **We block agents globally** → can't recover from failures
- **Cursor allows per-task iteration** → agents refine and succeed

**Root Cause**:
- `Orchestrator.maxConsecutiveSameAgent = 2` applies globally
- No concept of "micro-sessions" or "sub-tasks" 
- No retry-with-refinement within focused context
- Hard sequencing validation without recovery path

**Key Insight from User**:
> "Agents like regex and semantic search should be allowed to be called many times - you can keep a check like 3 times per micro-session. We need agents to progress, so when it goes into planning a new task or review, in that sub-session we can keep limit instead of hard limiting on overall session."

### 1. DataInspector Over-Engineering (Lines 64-96, logs.md)

**Current Behavior**:
```
📋 Found 1 user documents
🔍 Sampling real chunks from 1 documents
🧠 Analyzing 1 documents with real sampled content
  → Entity extraction LLM call
  → Content area classification LLM call  
  → Document role analysis LLM call
  → Relevance scoring LLM call
  → Final synthesis LLM call
= 5-6 LLM calls for 1 document
```

**Impact**: 30-50% of total API calls wasted on over-analyzing simple cases

**Root Cause**: No fast-path for single-document or small corpora scenarios

### 2. Pattern Generation Failure (AIbuilderLogs_01.json:62-69)

**Current Behavior**:
```json
{
  "agent": "Extractor",
  "content": {
    "extractedItems": 0,
    "patternsUsed": 2,
    "chunksProcessed": 29
  }
}
```

**Impact**: Extractor processes all chunks but extracts nothing → SynthesisCoordinator blocked

**Root Cause**: 
- PatternGenerator creates ineffective regex/LLM patterns
- No pattern validation or quality checks
- Patterns don't match actual document content

### 3. Non-Existent Agent Loop (logs.md:1141-2842)

**Current Behavior**:
```
Master LLM goal: "Continue pipeline: call QueryPlanner"
  → Fallback maps QueryPlanner → PlanningAgent
  → PlanningAgent already executed, skipped
  → Pipeline reports "All planned steps completed"
  → Master LLM still tries QueryPlanner again (x24 times)
```

**Impact**: 24 wasted orchestration iterations (40% of 60 limit)

**Root Cause**:
- Master LLM prompt includes "QueryPlanner" in next steps but agent doesn't exist
- No guard to prevent calling completed agents
- Goal text not updated when pipeline reports completion

### 4. Document Type Classification (multiple log entries)

**Current Behavior**:
```
documentType: "Unknown Document"
contentAreas: ["general information"]
extractionStrategy: "###"  // Empty/placeholder
```

**Impact**: Downstream agents receive poor context, generate bad patterns

**Root Cause**:
- Generic classification prompt doesn't recognize educational content
- No type hints from file metadata (PDF about "DDP" tutorial)
- Falls back to "Unknown Document" too easily

### 5. Sequencing Logic Gaps (Orchestrator.ts:2072-2096)

**Current Behavior**:
```typescript
// PLAN-AWARE SEQUENCING VALIDATION
const validation = this.validateAgentExecution(toolName, context);
if (!validation.allowed) {
  throw new Error(`Plan-aware sequencing violation: ${validation.reason}`);
}
```

**Issue**: Hard failure instead of intelligent recovery

**Impact**: Pipeline crashes instead of self-correcting (e.g., running Extractor when SynthesisCoordinator blocked)

---

## Detailed Requirements

### Requirement 0: Micro-Session Architecture with Per-Task Iteration Limits

**Goal**: Enable agents to iterate within focused sub-tasks (like Cursor/Codex) instead of global hard limits

**Priority**: **CRITICAL** - This is the foundational architectural change needed

**Current Problem**:
```typescript
// Current: Global blocking
class Orchestrator {
  private consecutiveSameAgentCount = 0; // Global counter
  private maxConsecutiveSameAgent = 2; // Global limit
  
  async masterLLMOrchestration() {
    // If agent called 2x globally → BLOCKED forever
    if (this.consecutiveSameAgentCount >= 2) {
      console.warn('Blocked - agent called too many times');
      // Can't retry even if context changes!
    }
  }
}
```

**Implementation**:
```typescript
// NEW: Micro-session based iteration
interface MicroSession {
  id: string;
  goal: string; // "Extract educational content from DDP tutorial"
  startTime: number;
  agentCallsInSession: Map<string, number>; // Per-session counters
  maxAttemptsPerAgent: number; // Default: 3
  status: 'active' | 'completed' | 'failed';
  result?: any;
}

class Orchestrator {
  private currentMicroSession: MicroSession | null = null;
  private microSessionHistory: MicroSession[] = [];
  private globalAgentCalls: Map<string, number> = new Map(); // Still track global
  
  // Per-agent iteration limits within a micro-session
  private MICRO_SESSION_LIMITS = {
    // Agents that need iteration to refine
    PatternGenerator: 3,  // Can try 3x within "extract data" sub-task
    Extractor: 3,         // Can try 3x within "extract data" sub-task
    SynthesisCoordinator: 2, // Can try 2x within "synthesize" sub-task
    
    // Agents that should only run once per micro-session
    DataInspector: 2,     // 2x for document analysis
    PlanningAgent: 1,     // Once per planning session
    FlowFrameGenerator: 1 // Once per frame generation
  };
  
  /**
   * Start a new focused sub-task with fresh iteration limits
   */
  private startMicroSession(goal: string): void {
    // Complete previous micro-session
    if (this.currentMicroSession) {
      this.currentMicroSession.status = 'completed';
      this.microSessionHistory.push(this.currentMicroSession);
    }
    
    this.currentMicroSession = {
      id: `micro-${Date.now()}`,
      goal,
      startTime: Date.now(),
      agentCallsInSession: new Map(),
      maxAttemptsPerAgent: 3,
      status: 'active'
    };
    
    console.log(`🎯 Starting micro-session: "${goal}"`);
  }
  
  /**
   * Check if agent can be called within current micro-session
   */
  private canCallAgentInMicroSession(agentName: string): { allowed: boolean; reason: string } {
    if (!this.currentMicroSession) {
      // No micro-session → allow first call
      return { allowed: true, reason: 'No active micro-session' };
    }
    
    const callsInSession = this.currentMicroSession.agentCallsInSession.get(agentName) ?? 0;
    const limit = this.MICRO_SESSION_LIMITS[agentName] ?? 3; // Default 3
    
    if (callsInSession >= limit) {
      return {
        allowed: false,
        reason: `Agent ${agentName} exhausted ${limit} attempts in micro-session "${this.currentMicroSession.goal}"`
      };
    }
    
    return {
      allowed: true,
      reason: `Attempt ${callsInSession + 1}/${limit} in micro-session`
    };
  }
  
  /**
   * Execute agent with micro-session awareness
   */
  private async executeToolCallWithMicroSession(
    toolName: string,
    context: ResearchContext
  ): Promise<void> {
    const normalizedToolName = this.normalizeToolName(toolName);
    
    // Check micro-session limit
    const microCheck = this.canCallAgentInMicroSession(normalizedToolName);
    if (!microCheck.allowed) {
      console.warn(`⚠️ ${microCheck.reason}`);
      
      // Instead of hard failure, complete micro-session and start new one
      if (this.shouldStartNewMicroSession(normalizedToolName, context)) {
        const newGoal = this.determineNextMicroSessionGoal(context);
        this.startMicroSession(newGoal);
        console.log(`🔄 Started new micro-session, retry agent: ${normalizedToolName}`);
      } else {
        throw new Error(microCheck.reason);
      }
    }
    
    // Track call in micro-session
    if (this.currentMicroSession) {
      const current = this.currentMicroSession.agentCallsInSession.get(normalizedToolName) ?? 0;
      this.currentMicroSession.agentCallsInSession.set(normalizedToolName, current + 1);
      console.log(`📊 Micro-session "${this.currentMicroSession.goal}": ${normalizedToolName} attempt ${current + 1}`);
    }
    
    // Track global (for overall session limits)
    const globalCalls = this.globalAgentCalls.get(normalizedToolName) ?? 0;
    this.globalAgentCalls.set(normalizedToolName, globalCalls + 1);
    
    // Execute agent
    await this.executeToolCall(normalizedToolName, context);
    
    // Check if micro-session goal is achieved
    if (this.isMicroSessionGoalAchieved(normalizedToolName, context)) {
      console.log(`✅ Micro-session goal achieved: "${this.currentMicroSession?.goal}"`);
      this.currentMicroSession!.status = 'completed';
      this.currentMicroSession = null; // Clear for next micro-session
    }
  }
  
  /**
   * Determine when to start new micro-session
   */
  private shouldStartNewMicroSession(agentName: string, context: ResearchContext): boolean {
    // Start new micro-session when:
    // 1. Previous task complete but new task requires same agent
    // 2. Agent failed but context changed (e.g., new patterns available)
    // 3. Explicit sub-task boundary detected
    
    if (agentName === 'Extractor' && this.hasNewPatterns(context)) {
      return true; // New patterns → new extraction attempt
    }
    
    if (agentName === 'PatternGenerator' && this.hasNewDocumentAnalysis(context)) {
      return true; // New doc analysis → new pattern generation
    }
    
    return false;
  }
  
  /**
   * Determine next micro-session goal based on pipeline state
   */
  private determineNextMicroSessionGoal(context: ResearchContext): string {
    // Analyze what's been done and what's needed
    if (!this.calledAgents.has('DataInspector')) {
      return 'Analyze document structure and relevance';
    }
    
    if (!this.calledAgents.has('PatternGenerator') || 
        (context.sharedKnowledge?.patterns?.length ?? 0) === 0) {
      return 'Generate extraction patterns from document analysis';
    }
    
    if (!this.calledAgents.has('Extractor') || 
        (context.synthesis?.extractedData?.length ?? 0) === 0) {
      return 'Extract structured data using generated patterns';
    }
    
    if (!this.calledAgents.has('SynthesisCoordinator')) {
      return 'Synthesize findings into coherent response';
    }
    
    return 'Complete remaining pipeline stages';
  }
  
  /**
   * Check if micro-session goal is achieved
   */
  private isMicroSessionGoalAchieved(lastAgent: string, context: ResearchContext): boolean {
    if (!this.currentMicroSession) return false;
    
    const goal = this.currentMicroSession.goal.toLowerCase();
    
    // Goal-based completion detection
    if (goal.includes('analyze document') && lastAgent === 'DataInspector') {
      return context.sharedKnowledge?.documentAnalysis != null;
    }
    
    if (goal.includes('generate') && goal.includes('pattern') && lastAgent === 'PatternGenerator') {
      return (context.sharedKnowledge?.patterns?.length ?? 0) > 0;
    }
    
    if (goal.includes('extract') && lastAgent === 'Extractor') {
      return (context.synthesis?.extractedData?.length ?? 0) > 0;
    }
    
    if (goal.includes('synthesize') && lastAgent === 'SynthesisCoordinator') {
      return (context.synthesis?.answer?.length ?? 0) > 0;
    }
    
    return false;
  }
  
  /**
   * Master orchestration with micro-sessions
   */
  private async masterLLMOrchestration(context: ResearchContext): Promise<void> {
    let iterationCount = 0;
    const maxIterations = 30; // Reduced from 60
    
    // Start first micro-session
    this.startMicroSession('Analyze documents for query context');
    
    while (iterationCount < maxIterations) {
      iterationCount++;
      
      // Check if all micro-sessions complete
      if (this.isFullPipelineComplete(context)) {
        console.log('✅ All micro-sessions complete - pipeline finished');
        break;
      }
      
      const decision = await this.makeMasterLLMDecision(context, this.getCurrentGoal(), iterationCount);
      
      if (decision.action === 'CALL_TOOL') {
        try {
          await this.executeToolCallWithMicroSession(decision.toolName, context);
        } catch (error) {
          console.error(`❌ Agent failed: ${error.message}`);
          
          // Decide whether to retry in new micro-session or fail
          if (this.canRecoverWithNewMicroSession(decision.toolName, error, context)) {
            const newGoal = this.determineRecoveryMicroSession(decision.toolName, error, context);
            this.startMicroSession(newGoal);
            console.log(`🔄 Recovery: Started new micro-session for recovery`);
          } else {
            throw error; // Can't recover
          }
        }
      }
      
      if (decision.action === 'COMPLETE') {
        break;
      }
    }
  }
  
  private getCurrentGoal(): string {
    return this.currentMicroSession?.goal ?? 'Answer the user query';
  }
}
```

**Example Flow**:
```
Query: "Create lesson plan from DDP tutorial"

┌─ Micro-Session 1: "Analyze document structure" ──────────────┐
│ Attempt 1: DataInspector → classifies as "Unknown Document" │
│ Attempt 2: DataInspector (retry) → classifies as "Tutorial" │
│ ✅ Goal achieved: Document analyzed                           │
└───────────────────────────────────────────────────────────────┘

┌─ Micro-Session 2: "Generate extraction patterns" ─────────────┐
│ Attempt 1: PatternGenerator → creates 1 pattern              │
│ Validation: Pattern matches 0/5 sample chunks ❌             │
│ Attempt 2: PatternGenerator (refine) → creates 3 patterns    │
│ Validation: Patterns match 12/5 sample chunks ✅              │
│ ✅ Goal achieved: Valid patterns generated                    │
└───────────────────────────────────────────────────────────────┘

┌─ Micro-Session 3: "Extract educational content" ──────────────┐
│ Attempt 1: Extractor → 0 items (patterns still not perfect)  │
│ Attempt 2: Extractor → 5 items (partial success)             │
│ Attempt 3: Extractor → 18 items ✅ (threshold met)            │
│ ✅ Goal achieved: Sufficient data extracted                   │
└───────────────────────────────────────────────────────────────┘

┌─ Micro-Session 4: "Synthesize lesson plan" ───────────────────┐
│ Attempt 1: SynthesisCoordinator → generates plan             │
│ ✅ Goal achieved: Lesson plan created                         │
└───────────────────────────────────────────────────────────────┘

Total: 9 agent calls (3+2+3+1)
Success: All micro-sessions achieved goals
Quality: High (agents could refine within context)
```

**Acceptance Criteria**:
- [ ] Micro-session system implemented in Orchestrator
- [ ] Agents can be called 3x within same micro-session
- [ ] New micro-session starts when goal achieved or max attempts reached
- [ ] Global limit still enforced (prevent infinite loops across micro-sessions)
- [ ] Micro-session goals automatically determined from pipeline state
- [ ] Agent failure triggers smart recovery (new micro-session vs hard fail)
- [ ] Average agent calls reduced: 50+ → 15-25

**Files**:
- `src/lib/multi-agent/core/Orchestrator.ts` (major refactor)
- New: `src/lib/multi-agent/core/MicroSession.ts` (types and helpers)

---

### Requirement 1: Intelligent DataInspector Fast-Path

**Goal**: Reduce DataInspector LLM calls from 5-6 to 1-2 for simple cases

**Implementation**:
```typescript
interface DataInspectorConfig {
  mode: 'fast' | 'comprehensive';
  maxDocumentsForFastPath: number; // Default: 3
  skipEntityExtraction: boolean;
  skipContentAreaClassification: boolean;
}

class DataInspectorAgent {
  async process(context: ResearchContext): Promise<AgentOutput> {
    const docCount = context.documentChunks?.length ?? 0;
    
    // Fast-path for small corpora
    if (docCount <= 3) {
      return this.processFastPath(context); // 1 LLM call
    }
    
    // Comprehensive analysis for large corpora
    return this.processComprehensive(context); // 3-5 LLM calls
  }
  
  private async processFastPath(context: ResearchContext) {
    // Single LLM call with combined prompt:
    // - Document type classification
    // - Basic relevance check
    // - Content summary
    // Skip: entity extraction, role analysis, detailed content areas
  }
}
```

**Acceptance Criteria**:
- [ ] Single-document analysis uses ≤2 LLM calls
- [ ] 2-3 documents use ≤3 LLM calls
- [ ] Maintains classification accuracy >85%

**File**: `src/lib/multi-agent/agents/DataInspectorAgent.ts`

### Requirement 2: Smart Document Type Detection

**Goal**: Accurately classify document types using metadata + content sampling

**Implementation**:
```typescript
interface DocumentClassifier {
  classifyFromMetadata(filename: string, metadata?: DocumentMetadata): DocumentType | null;
  classifyFromContent(samples: string[]): Promise<DocumentType>;
}

// Priority order:
// 1. Metadata-based (filename, tags, etc.) - 0 LLM calls
// 2. Fast content scan (keywords) - 0 LLM calls  
// 3. LLM classification - 1 LLM call

enum DocumentType {
  TUTORIAL = 'Educational Tutorial',
  TECHNICAL_DOCS = 'Technical Documentation',
  CODE_REFERENCE = 'Code Reference',
  RESEARCH_PAPER = 'Research Paper',
  API_DOCS = 'API Documentation',
  // ... etc
}

// Example:
filename: "til-ddp-python-basics-html.pdf"
  → keywords: ["til" (Today I Learned), "basics", "python"]
  → classification: TUTORIAL
  → skip LLM call entirely
```

**Acceptance Criteria**:
- [ ] 60%+ documents classified from metadata alone (0 LLM calls)
- [ ] Correct classification rate >90%
- [ ] "Unknown Document" fallback <10% of cases
- [ ] Proper extraction strategies generated for each type

**Files**:
- `src/lib/multi-agent/agents/DataInspectorAgent.ts`
- New: `src/lib/document-classification/DocumentClassifier.ts`

### Requirement 3: Pattern Generation Validation & Quality Control

**Goal**: Ensure PatternGenerator creates patterns that actually extract data

**Implementation**:
```typescript
interface PatternQualityCheck {
  pattern: ExtractionPattern;
  testChunks: string[]; // Sample chunks
  expectedMatches: number; // Minimum matches to pass
}

class PatternGeneratorAgent {
  async generatePatterns(context: ResearchContext): Promise<ExtractionPattern[]> {
    const patterns = await this.generatePatternsFromLLM(context);
    
    // NEW: Validate patterns before returning
    const validatedPatterns = await this.validatePatterns(patterns, context);
    
    if (validatedPatterns.length === 0) {
      console.warn('⚠️ All patterns failed validation, using fallback');
      return this.getFallbackPatterns(context);
    }
    
    return validatedPatterns;
  }
  
  private async validatePatterns(
    patterns: ExtractionPattern[], 
    context: ResearchContext
  ): Promise<ExtractionPattern[]> {
    // Test each pattern against sample chunks
    const sampleChunks = this.getSampleChunks(context, 5);
    
    return patterns.filter(pattern => {
      const matches = this.testPatternAgainstChunks(pattern, sampleChunks);
      const isValid = matches.length > 0; // At least 1 match
      
      if (!isValid) {
        console.warn(`❌ Pattern rejected: "${pattern.description}" - 0 matches in sample`);
      }
      
      return isValid;
    });
  }
  
  private getFallbackPatterns(context: ResearchContext): ExtractionPattern[] {
    // Document-type-specific fallback patterns
    const docType = context.sharedKnowledge?.documentAnalysis?.documentType;
    
    switch (docType) {
      case 'Educational Tutorial':
        return [
          { type: 'heading', regex: /^#+\s+(.+)$/gm },
          { type: 'code_block', regex: /```[\s\S]*?```/g },
          { type: 'key_concept', regex: /\*\*(.+?)\*\*/g }
        ];
      // ... more fallbacks
    }
  }
}
```

**Acceptance Criteria**:
- [ ] Pattern validation runs on 5 sample chunks before acceptance
- [ ] Rejected patterns logged with reasons
- [ ] Fallback patterns provided for each document type
- [ ] Extractor success rate (items extracted > 0) increases to >80%

**File**: `src/lib/multi-agent/agents/PatternGeneratorAgent.ts`

### Requirement 4: Orchestrator Loop Prevention

**Goal**: Prevent infinite loops when agents complete or don't exist

**Implementation**:
```typescript
class Orchestrator {
  private maxConsecutiveSameAgent = 2; // Prevent >2 calls to same agent
  private lastCalledAgent: string | null = null;
  private consecutiveSameAgentCount = 0;
  
  private async masterLLMOrchestration(context: ResearchContext): Promise<void> {
    let iterationCount = 0;
    const maxIterations = 30; // Reduced from 60
    
    while (iterationCount < maxIterations) {
      iterationCount++;
      
      // Check pipeline completion status
      if (this.isPipelineComplete(context)) {
        console.log('✅ Pipeline complete - terminating orchestration');
        break;
      }
      
      const decision = await this.makeMasterLLMDecision(context, currentGoal, iterationCount);
      
      // Prevent consecutive same-agent calls
      if (decision.toolName === this.lastCalledAgent) {
        this.consecutiveSameAgentCount++;
        
        if (this.consecutiveSameAgentCount >= this.maxConsecutiveSameAgent) {
          console.warn(`⚠️ Blocked consecutive call to ${decision.toolName} (attempt ${this.consecutiveSameAgentCount})`);
          console.warn(`💡 Forcing progression to next pipeline stage`);
          
          const nextAgent = this.getNextPipelineAgent(context);
          if (nextAgent && nextAgent !== decision.toolName) {
            decision.toolName = nextAgent;
            currentGoal = `Continue pipeline: call ${nextAgent}`;
          } else {
            console.log('✅ No next agent available - completing pipeline');
            break;
          }
        }
      } else {
        this.lastCalledAgent = decision.toolName;
        this.consecutiveSameAgentCount = 1;
      }
      
      // Execute with validation
      await this.executeToolCallWithRecovery(decision.toolName, context);
    }
  }
  
  private isPipelineComplete(context: ResearchContext): boolean {
    // Check if all required agents have produced valid output
    const requiredAgents = ['DataInspector', 'PatternGenerator', 'Extractor', 'SynthesisCoordinator'];
    
    return requiredAgents.every(agent => {
      const result = this.agentResults.get(agent);
      return result && this.isValidAgentOutput(agent, result);
    });
  }
  
  private isValidAgentOutput(agentName: string, result: AgentOutput): boolean {
    switch (agentName) {
      case 'Extractor':
        // Extractor must extract >0 items
        return (result.output?.extractedData?.raw?.length ?? 0) > 0;
      case 'SynthesisCoordinator':
        // Synthesis must produce non-empty response
        return (result.output?.finalResponse?.length ?? 0) > 0;
      default:
        return true;
    }
  }
  
  private async executeToolCallWithRecovery(
    toolName: string, 
    context: ResearchContext
  ): Promise<void> {
    try {
      await this.executeToolCall(toolName, context);
    } catch (error) {
      if (error.message.includes('sequencing violation')) {
        console.warn(`⚠️ Sequencing violation for ${toolName} - attempting recovery`);
        
        // Extract required agent from error message
        const requiredAgent = this.parseRequiredAgentFromError(error.message);
        
        if (requiredAgent && !this.calledAgents.has(requiredAgent)) {
          console.log(`🔧 Auto-recovery: Running ${requiredAgent} first`);
          await this.executeToolCall(requiredAgent, context);
          
          // Retry original agent
          console.log(`🔄 Retrying ${toolName} after recovery`);
          await this.executeToolCall(toolName, context);
        } else {
          throw error; // Can't recover
        }
      } else {
        throw error;
      }
    }
  }
  
  private parseRequiredAgentFromError(errorMessage: string): string | null {
    // Example: "Extraction must produce facts before synthesis can start"
    if (errorMessage.includes('Extraction must produce')) return 'Extractor';
    if (errorMessage.includes('Planning must complete')) return 'PlanningAgent';
    return null;
  }
}
```

**Acceptance Criteria**:
- [ ] No agent called more than 2 times consecutively
- [ ] Pipeline completion detection works correctly
- [ ] Sequencing violations trigger auto-recovery (not hard failure)
- [ ] Max iterations reduced to 30 while maintaining success rate
- [ ] Average tool calls for lesson plan: 20-30 (down from 50+)

**File**: `src/lib/multi-agent/core/Orchestrator.ts`

### Requirement 5: Master LLM Prompt Optimization

**Goal**: Reduce Master LLM hallucination and improve decision quality

**Current Issues**:
- LLM suggests "QueryPlanner" agent that doesn't exist
- Doesn't recognize when pipeline is complete
- Repeats completed agents

**Implementation**:
```typescript
private buildMasterLLMPrompt(context: ResearchContext, goal: string): string {
  const availableAgents = this.getAvailableAgents();
  const completedAgents = Array.from(this.calledAgents);
  const agentResults = this.getAgentResultsSummary();
  
  return `You are the Master LLM Orchestrator for a multi-agent research system.

🎯 CURRENT GOAL: ${goal}

📊 AVAILABLE AGENTS (use EXACT names):
${availableAgents.map(name => `- ${name}${completedAgents.includes(name) ? ' ✅ (COMPLETED)' : ''}`).join('\n')}

⚠️ CRITICAL RULES:
1. ONLY call agents from the AVAILABLE AGENTS list above
2. NEVER invent agent names (e.g., "QueryPlanner" does NOT exist)
3. NEVER call agents marked ✅ (COMPLETED) again
4. If ALL required agents are ✅, return ACTION: COMPLETE

📋 AGENT RESULTS SO FAR:
${agentResults}

🔍 PIPELINE STATUS:
${this.getPipelineStatus(context)}

⚡ DECISION FORMAT (respond with EXACTLY this format):
ACTION: CALL_TOOL
TOOL_NAME: [exact agent name from available list]
REASONING: [one sentence why this agent is next]
NEXT_GOAL: [what goal remains after this agent]

OR

ACTION: COMPLETE
REASONING: [why all requirements are satisfied]

Your decision:`;
}

private getAvailableAgents(): string[] {
  // Return ONLY agents that actually exist in registry
  return Array.from(this.registry.keys());
}

private getPipelineStatus(context: ResearchContext): string {
  const status = [];
  
  // Check each stage
  if (!this.calledAgents.has('DataInspector')) {
    status.push('❌ DataInspector: NOT STARTED (required first)');
  } else {
    const docsAnalyzed = context.sharedKnowledge?.documentAnalysis ? '✅' : '⚠️';
    status.push(`${docsAnalyzed} DataInspector: COMPLETE`);
  }
  
  if (!this.calledAgents.has('PatternGenerator')) {
    status.push('❌ PatternGenerator: NOT STARTED');
  } else {
    const patternCount = context.sharedKnowledge?.patterns?.length ?? 0;
    status.push(`${patternCount > 0 ? '✅' : '⚠️'} PatternGenerator: COMPLETE (${patternCount} patterns)`);
  }
  
  if (!this.calledAgents.has('Extractor')) {
    status.push('❌ Extractor: NOT STARTED');
  } else {
    const itemCount = context.synthesis?.extractedData?.length ?? 0;
    status.push(`${itemCount > 0 ? '✅' : '⚠️'} Extractor: COMPLETE (${itemCount} items)`);
  }
  
  if (!this.calledAgents.has('SynthesisCoordinator')) {
    status.push('❌ SynthesisCoordinator: NOT STARTED');
  } else {
    const hasResponse = context.synthesis?.answer?.length ?? 0 > 0;
    status.push(`${hasResponse ? '✅' : '⚠️'} SynthesisCoordinator: COMPLETE`);
  }
  
  // Determine if pipeline is complete
  const allStagesComplete = status.every(s => s.startsWith('✅'));
  if (allStagesComplete) {
    status.push('\n🎉 ALL REQUIRED STAGES COMPLETE - You should return ACTION: COMPLETE');
  }
  
  return status.join('\n');
}
```

**Acceptance Criteria**:
- [ ] Master LLM only suggests agents that exist in registry
- [ ] Completed agents clearly marked, not suggested again
- [ ] Pipeline completion status accurately reflects reality
- [ ] LLM returns ACTION: COMPLETE when appropriate (not after 60 iterations)
- [ ] Decision quality: >90% of decisions are valid (don't need fallback mapping)

**File**: `src/lib/multi-agent/core/Orchestrator.ts` (methods: `buildMasterLLMPrompt`, `makeMasterLLMDecision`)

### Requirement 6: Flow Frame Generation Fast-Path

**Goal**: Generate frames directly when possible, bypassing full multi-agent pipeline

**Current Issue**: Even simple lesson plan requests go through DataInspector → PatternGenerator → Extractor → Synthesis → FlowFramePlanner → FlowFrameGenerator (6+ agents)

**Implementation**:
```typescript
// In useAIFlowBuilder.ts
const planFlow = useCallback(async () => {
  // Detect if this is a flow frame generation request
  const isFlowRequest = /lesson plan|course|tutorial|frames|chapters/i.test(prompt);
  const hasDocuments = documentCount > 0;
  
  if (isFlowRequest && hasDocuments) {
    console.log('🚀 Fast-path: Direct flow frame generation');
    
    // Skip full multi-agent pipeline
    // Go directly: DataInspector (fast) → FlowFramePlanner → FlowFrameGenerator
    const fastOrchestrator = createFastFlowOrchestrator(
      llmBridge,
      flowProgressCallback,
      providerVectorStore
    );
    
    await fastOrchestrator.generateFlowFrames(prompt);
    
  } else {
    // Full pipeline for research/extraction queries
    console.log('📊 Full pipeline: Research query detected');
    const orchestrator = createMultiAgentSystem(...);
    await orchestrator.research(prompt);
  }
}, [prompt, documentCount, ...]);

function createFastFlowOrchestrator(...): FastFlowOrchestrator {
  return {
    async generateFlowFrames(query: string) {
      // 1. Fast DataInspector (1-2 LLM calls)
      const docAnalysis = await runFastDataInspector(query);
      
      // 2. FlowFramePlanner (1 LLM call)
      const plan = await runFlowFramePlanner(query, docAnalysis);
      
      // 3. FlowFrameGenerator (N LLM calls = number of frames)
      const frames = await runFlowFrameGenerator(plan);
      
      // Total: 2-3 + N calls (vs 50+ calls currently)
    }
  };
}
```

**Acceptance Criteria**:
- [ ] Lesson plan requests use ≤15 LLM calls total
- [ ] Frame quality maintained (compare with reference: `Cursor_ddp_learning_plan.json`)
- [ ] Fast-path completes in <2 minutes (vs 5+ minutes currently)
- [ ] Fallback to full pipeline if fast-path fails

**Files**:
- `src/app/ai-frames/hooks/useAIFlowBuilder.ts`
- New: `src/lib/multi-agent/core/FastFlowOrchestrator.ts`

---

## Success Metrics

### Quantitative Targets

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Total LLM calls (lesson plan) | 50+ | 15-25 | Count OpenRouter API calls in logs |
| Max iterations used | 30-60 | 15-20 | Orchestrator iteration counter |
| DataInspector calls | 5-6 | 1-2 | Agent log entries |
| Extractor success rate | ~40% | >80% | (items extracted > 0) / total runs |
| Pipeline failure rate | ~30% | <10% | Sequencing violations / total runs |
| Time to generate | 5+ min | <2 min | End-to-end timing |
| Unknown document rate | ~60% | <10% | Document classification accuracy |

### Qualitative Goals

- [ ] No infinite agent loops
- [ ] No sequencing violations (or auto-recovery successful)
- [ ] Clear termination conditions
- [ ] Proper document type classification
- [ ] Generated frames match quality of `Cursor_ddp_learning_plan.json`

---

## Implementation Plan

### Phase 0: Foundation - Micro-Session Architecture (Week 1) **[CRITICAL]**

**Goal**: Enable iterative agent refinement like Cursor/Codex

1. **Micro-Session Core Implementation** (Req 0)
   - Implement `MicroSession` types and tracking
   - Add per-session agent call counters
   - Replace global consecutive agent blocking
   - Target: Enable 3x attempts per agent within sub-task

2. **Goal-Based Session Management** (Req 0)
   - Auto-detect micro-session boundaries
   - Determine goals from pipeline state
   - Completion detection per micro-session
   - Target: Automatic session transitions

3. **Recovery & Retry Logic** (Req 0)
   - Pattern validation feedback loop
   - Smart retry when context changes
   - Graceful degradation on exhaustion
   - Target: Extractor success rate >80%

**Expected Impact**: 
- Foundational change: Agents can iterate within context
- Enables all other optimizations
- Critical blocker resolution: Extractor can retry with refined patterns
- Estimated: 50+ calls → 25-35 calls

**Why Phase 0**: This is the architectural foundation. Without it, agents can't learn/refine within context, making all other optimizations less effective.

---

### Phase 1: Agent Efficiency (Week 2)
1. **DataInspector Fast-Path** (Req 1)
   - Implement single-document optimization
   - Target: 5-6 calls → 1-2 calls
   
2. **Orchestrator Loop Prevention** (Req 4)
   - Add consecutive agent call detection
   - Add pipeline completion detection
   - Target: Eliminate 24 redundant calls

3. **Document Classification** (Req 2)
   - Add metadata-based classification
   - Add keyword-based classification
   - Target: 60%+ classified without LLM

**Expected Impact**: 25-35 calls → 20-25 calls

---

### Phase 2: Pattern Quality (Week 3)
4. **Pattern Validation** (Req 3)
   - Implement pattern testing on sample chunks
   - Add fallback patterns by document type
   - Target: Extractor success >80%

5. **Master LLM Optimization** (Req 5)
   - Fix available agents list
   - Add clear completion signals
   - Target: Eliminate hallucinated agents

**Expected Impact**: 25-30 calls → 20-25 calls

### Phase 3: Fast-Path (Week 3)
6. **Flow Frame Fast-Path** (Req 6)
   - Implement direct flow generation path
   - Bypass full pipeline for lesson plans
   - Target: 20-25 calls → 15-20 calls

**Expected Impact**: 15-20 calls (target achieved)

---

## Testing Strategy

### Unit Tests
- [ ] DataInspector fast-path logic
- [ ] Document classifier (metadata & content)
- [ ] Pattern validator
- [ ] Orchestrator loop detection

### Integration Tests
- [ ] End-to-end lesson plan generation
- [ ] Compare with reference: `Cursor_ddp_learning_plan.json`
- [ ] Sequencing violation recovery
- [ ] Pipeline completion detection

### Performance Tests
- [ ] LLM call count for various queries
- [ ] Time to completion measurements
- [ ] Token usage optimization

### Regression Tests
- [ ] Existing research queries still work
- [ ] Web search integration unaffected
- [ ] Frame quality maintained

---

## Files to Modify

### Critical Path
1. `src/lib/multi-agent/agents/DataInspectorAgent.ts` - Fast-path optimization
2. `src/lib/multi-agent/core/Orchestrator.ts` - Loop prevention & completion detection
3. `src/lib/multi-agent/agents/PatternGeneratorAgent.ts` - Pattern validation

### Secondary
4. `src/lib/document-classification/DocumentClassifier.ts` - NEW file for classification
5. `src/lib/multi-agent/core/FastFlowOrchestrator.ts` - NEW file for fast-path
6. `src/app/ai-frames/hooks/useAIFlowBuilder.ts` - Fast-path integration

---

## Reference Benchmarks

### Current Run (logs.md)
- Query: "usind ddp create a lesson plan for me"
- Documents: 1 (DDP tutorial PDF)
- LLM Calls: 50+
- Result: Sequencing violation failure
- Time: N/A (failed before completion)

### Reference Run (AIbuilderLogs_01.json)
- Query: "using ddp create lessson plan for me" 
- Documents: 1 (same DDP PDF)
- Log Entries: 86 (includes progress entries)
- Agents Used: FlowFramePlanner, FlowFrameGenerator, PlanningAgent, PatternGenerator, Extractor, ResponseFormatter
- Frames Generated: 6 frames
- Result: SUCCESS

### Target Performance (SWE-bench style)
- Query: "using ddp create a lesson plan for me"
- Documents: 1
- LLM Calls: 15-20
- Agents Used: FastDataInspector, FlowFramePlanner, FlowFrameGenerator (3 core agents)
- Frames Generated: 6-8 frames
- Time: <2 minutes
- Result: SUCCESS with quality matching reference

---

## Architecture Comparison: Current vs Target

### Current Architecture (Global Limits)
```
Session: "Create lesson plan from DDP"
├─ Attempt 1: DataInspector ✅
├─ Attempt 2: DataInspector ❌ BLOCKED (global limit = 2)
├─ Attempt 1: PlanningAgent ✅
├─ Attempt 1: PatternGenerator ✅ (creates bad patterns)
├─ Attempt 2: PatternGenerator ❌ BLOCKED (global limit = 2)
├─ Attempt 1: Extractor ❌ (0 items - bad patterns)
├─ Attempt 2: Extractor ❌ (0 items - still bad patterns)
├─ Attempt 3: Extractor ❌ BLOCKED (global limit = 2)
└─ Attempt 1: SynthesisCoordinator ❌ HARD FAILURE
    └─ Error: "Extraction must produce facts before synthesis"

Result: FAILURE after 50+ LLM calls
Issue: Can't refine patterns within "extract data" context
```

### Target Architecture (Micro-Sessions)
```
Session: "Create lesson plan from DDP"

┌─ Micro-Session: "Analyze documents" ────────────────┐
│ Attempt 1: DataInspector → "Unknown Document"      │
│ Attempt 2: DataInspector → "Tutorial" ✅            │
│ Goal achieved: Document classified                  │
└──────────────────────────────────────────────────────┘
   ↓ New micro-session starts

┌─ Micro-Session: "Generate patterns" ─────────────────┐
│ Attempt 1: PlanningAgent ✅                          │
│ Attempt 1: PatternGenerator → 1 pattern             │
│   Validation: 0/5 chunks match ❌                    │
│ Attempt 2: PatternGenerator → 3 patterns            │
│   Validation: 12/5 chunks match ✅                   │
│ Goal achieved: Valid patterns created               │
└──────────────────────────────────────────────────────┘
   ↓ New micro-session starts

┌─ Micro-Session: "Extract content" ───────────────────┐
│ Attempt 1: Extractor → 0 items                      │
│   Feedback: Patterns too strict                      │
│ Attempt 2: PatternGenerator (refine) ✅              │
│ Attempt 2: Extractor → 5 items (partial)            │
│   Feedback: Need more coverage                       │
│ Attempt 3: Extractor → 18 items ✅                   │
│ Goal achieved: Sufficient data extracted            │
└──────────────────────────────────────────────────────┘
   ↓ New micro-session starts

┌─ Micro-Session: "Synthesize plan" ───────────────────┐
│ Attempt 1: SynthesisCoordinator ✅                   │
│ Goal achieved: Lesson plan created                  │
└──────────────────────────────────────────────────────┘

Result: SUCCESS after ~20 LLM calls
Benefit: Agents iterate within context until goal achieved
```

### Key Differences

| Aspect | Current (Global Limits) | Target (Micro-Sessions) |
|--------|-------------------------|-------------------------|
| **Retry Scope** | Entire session (no retry after 2x globally) | Per micro-session (3x per sub-task) |
| **Context Awareness** | None - agents blocked regardless of context | High - new context = new attempts |
| **Recovery** | Hard failure | Smart retry with feedback |
| **Efficiency** | 50+ calls (many wasted on loops) | 15-25 calls (focused iterations) |
| **Quality** | Low (can't refine) | High (iterative refinement) |
| **Pattern** | Linear pipeline | Task-oriented micro-sessions |

**Real-World Analogy**:

**Current**: "You get 2 tries to fix the car in your lifetime. After that, you can never touch a wrench again, even if you learned what was wrong."

**Target (Cursor/Codex)**: "You get 3 tries to fix the starter motor. Once that's fixed, you get 3 fresh tries to fix the transmission. Each repair task gets its own attempts."

---

## Notes

- The 60 max iterations was increased from 30 as a workaround for inefficiency, not a solution
- True fix is reducing needed calls, not increasing the ceiling
- Focus on "fast-path for common cases, comprehensive path for complex cases"
- SWE-bench agents succeed by being specialized and efficient, not exhaustive
- Cursor Auto-Dev limits to 40 calls; we should target 20-30 for lesson plans (simpler than full codegen)

---

## Next Steps

1. **Review and approve this requirements document** ← Current step
2. **Phase 0 Implementation (Week 1)**:
   - Create `MicroSession` types (`src/lib/multi-agent/core/MicroSession.ts`)
   - Refactor Orchestrator to use micro-session tracking
   - Implement per-session agent call limits (3x default)
   - Add goal-based session transitions
   - Test with "Extract from DDP" scenario
   
3. **Measure Phase 0 Impact**:
   - Run same query that failed (session_1763456175727)
   - Count: Total LLM calls (target: <30)
   - Verify: Extractor extracts >0 items
   - Verify: No sequencing violations
   
4. **Phase 1 Implementation (Week 2)**: Agent efficiency optimizations
5. **Phase 2 Implementation (Week 3)**: Pattern quality & fast-paths

**Critical Success Factor**: Phase 0 (micro-sessions) must be implemented first. Without it, agents can't iterate/learn within context, making all other optimizations less effective.

