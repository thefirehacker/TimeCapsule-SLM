# Issue #008: Universal Multi-Agent Research System

**Status**: 🆕 **NEW**  
**Priority**: HIGH - Complete architectural overhaul  
**Type**: Feature - Multi-Agent System  
**Created**: 2025-08-01  
**Spec**: [universal-multi-agent-research-spec.md](../Specs/universal-multi-agent-research-spec.md)

## Problem Statement

Current system has fundamental limitations:
1. **Hardcoded Patterns**: PerformanceAgent uses regex patterns for extraction
2. **Domain-Specific**: Only works for specific formats we've coded for
3. **Brittle**: Breaks with new document formats or query types
4. **Limited Intelligence**: Can't adapt to what it sees in the data

## Evidence

From logs:
- Query: "top 3 speed runs from Tyler's blog"
- Found 15 RAG chunks with relevant data
- But only extracted "Performance: 221k tokens/sec" (wrong metric)
- Missed actual run times like "2.1 Architectural changes 7.51 hours"
- Pattern matching failed due to PDF formatting issues

## Root Cause

**Hardcoded extraction patterns can never handle all possible formats**

Current approach:
```typescript
// This will NEVER scale to all domains
pattern: /(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?)/
```

## Solution: LLM-Driven Multi-Agent System

### Core Architecture

```
User Query → Orchestrator LLM → Dynamic Agent Pipeline → Answer
                    ↓
         Decides which agents needed
         No hardcoded strategies
```

### Key Innovations

1. **No Hardcoded Patterns**
   - Every extraction strategy generated at runtime
   - Based on actual data inspection
   - Adapts to ANY format

2. **Multi-Agent Pipeline**
   - QueryPlanner: Expands queries intelligently
   - DataInspector: Understands data structure
   - PatternGenerator: Creates extraction strategies
   - Extractor: Executes with LLM understanding
   - Synthesizer: Formats for user's specific need

3. **True Intelligence**
   - Works for recipes, sports, finance, science
   - No domain-specific code
   - Improves with better LLMs, not code updates

## Implementation Plan

### Phase 1: Core Infrastructure
- [ ] Create `/src/lib/multi-agent/` directory structure
- [ ] Implement base Agent interface
- [ ] Build Orchestrator controller
- [ ] Create MessageBus for agent communication
- [ ] Design ResearchContext flow

### Phase 2: Agent Implementation
- [ ] QueryPlannerAgent - Dynamic query expansion
- [ ] DataInspectorAgent - Analyze RAG chunks
- [ ] PatternGeneratorAgent - Create extraction strategies
- [ ] ExtractionAgent - LLM-based extraction
- [ ] SynthesisAgent - Format final answer

### Phase 3: Integration
- [ ] Replace ResearchOrchestrator.synthesizeAnswer()
- [ ] Remove ALL hardcoded patterns
- [ ] Remove old agent system
- [ ] Connect to existing RAG search

### Phase 4: Testing
- [ ] Test with original query (Tyler's blog)
- [ ] Test with recipe blogs
- [ ] Test with sports data
- [ ] Test with financial reports
- [ ] Test with scientific papers

## File Structure

```
src/lib/multi-agent/
├── core/
│   ├── Orchestrator.ts
│   ├── AgentRegistry.ts
│   ├── MessageBus.ts
│   └── Context.ts
├── agents/
│   ├── QueryPlannerAgent.ts
│   ├── DataInspectorAgent.ts
│   ├── PatternGeneratorAgent.ts
│   ├── ExtractionAgent.ts
│   └── SynthesisAgent.ts
├── interfaces/
│   ├── Agent.ts
│   ├── Message.ts
│   └── Context.ts
└── index.ts
```

## Success Criteria

1. **Universal**: Handles ANY query on ANY document type
2. **No Patterns**: Zero hardcoded regex or extraction rules
3. **Transparent**: Full reasoning trace for debugging
4. **Modular**: Each agent in its own file
5. **No Fallbacks**: System succeeds with intelligence, not escapes

## Example Test Cases

### Test 1: Original Query
- Query: "top 3 speed runs from Tyler's blog"
- Should extract: Run times with descriptions
- Not: Performance metrics (tokens/sec)

### Test 2: Recipe Blog
- Query: "fastest pasta recipe"
- Should adapt to recipe format
- Extract cooking times without recipe-specific code

### Test 3: Sports Data
- Query: "marathon world records 2024"
- Should understand race times
- No sports-specific patterns needed

### Test 4: Financial Data
- Query: "highest dividend stocks"
- Should extract percentages and company names
- No finance-specific code

## Notes

- **NO FALLBACKS**: If system can't extract, it explains why
- **Pure LLM**: All decisions made by language models
- **Modular**: Each agent is independent and testable
- **Future-Proof**: New document types need zero code changes

---

**Assignee**: TBD  
**Milestone**: Multi-Agent Architecture  
**Labels**: `enhancement`, `architecture`, `multi-agent`, `breaking-change`