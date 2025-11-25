# Universal Multi-Agent Research System Specification

## Overview
A fully LLM-driven research system that adapts to ANY query and ANY document type without hardcoded patterns or fallbacks. The system uses multiple specialized agents orchestrated by an LLM controller.

## Core Principles
1. **No Hardcoded Logic**: Every decision is made by LLMs at runtime
2. **No Fallbacks**: System must succeed with its intelligent approach
3. **Domain Agnostic**: Works for recipes, sports, finance, technical docs, etc.
4. **Modular Architecture**: Each agent is a separate module
5. **Transparent Reasoning**: Every agent explains its decisions

## Architecture

### Directory Structure
```
src/lib/multi-agent/
├── core/
│   ├── Orchestrator.ts          # Main controller LLM
│   ├── AgentRegistry.ts         # Manages available agents
│   ├── MessageBus.ts            # Inter-agent communication
│   └── Context.ts               # Shared context management
├── agents/
│   ├── QueryPlannerAgent.ts     # Query expansion
│   ├── DataInspectorAgent.ts    # Analyzes RAG results
│   ├── PatternGeneratorAgent.ts # Creates extraction strategies
│   ├── ExtractionAgent.ts       # Executes extraction
│   └── SynthesisAgent.ts        # Formats final output
├── interfaces/
│   ├── Agent.ts                 # Base agent interface
│   ├── Message.ts               # Agent communication protocol
│   └── Context.ts               # Context types
└── index.ts                     # Public API
```

## Detailed Design

### 1. Base Agent Interface
```typescript
// src/lib/multi-agent/interfaces/Agent.ts
export interface Agent {
  name: string;
  description: string;
  
  // Analyzes if this agent should be involved
  shouldActivate(context: ResearchContext): Promise<boolean>;
  
  // Processes the context and returns enriched context
  process(context: ResearchContext): Promise<ResearchContext>;
  
  // Explains what it did
  explainReasoning(): string;
}
```

### 2. Research Context
```typescript
// src/lib/multi-agent/interfaces/Context.ts
export interface ResearchContext {
  // Original user query
  query: string;
  
  // Current understanding
  understanding: {
    intent: string;
    domain: string;
    requirements: string[];
  };
  
  // RAG search results
  ragResults: {
    chunks: ChunkData[];
    summary: string;
  };
  
  // Discovered patterns
  patterns: {
    description: string;
    examples: string[];
    extractionStrategy: string;
  }[];
  
  // Extracted information
  extractedData: {
    raw: any[];
    structured: any[];
  };
  
  // Final answer
  synthesis: {
    answer: string;
    confidence: number;
    reasoning: string;
  };
  
  // Agent communications
  messages: AgentMessage[];
}
```

### 3. Orchestrator Design
```typescript
// src/lib/multi-agent/core/Orchestrator.ts
export class Orchestrator {
  private llm: LLMInterface;
  private registry: AgentRegistry;
  private messageBus: MessageBus;
  
  async research(query: string, ragResults: SearchResult[]): Promise<string> {
    // 1. Initialize context
    const context: ResearchContext = {
      query,
      understanding: await this.analyzeQuery(query),
      ragResults: { chunks: ragResults, summary: this.summarize(ragResults) },
      patterns: [],
      extractedData: { raw: [], structured: [] },
      synthesis: { answer: '', confidence: 0, reasoning: '' },
      messages: []
    };
    
    // 2. Orchestrator decides agent pipeline
    const pipeline = await this.planAgentPipeline(context);
    
    // 3. Execute agents in sequence
    for (const agentName of pipeline) {
      const agent = this.registry.get(agentName);
      context = await agent.process(context);
      
      // Broadcast to other agents if needed
      await this.messageBus.broadcast({
        from: agentName,
        type: 'update',
        content: agent.explainReasoning()
      });
    }
    
    return context.synthesis.answer;
  }
  
  private async planAgentPipeline(context: ResearchContext): Promise<string[]> {
    const prompt = `
Given this research context:
- Query: ${context.query}
- Intent: ${context.understanding.intent}
- RAG returned ${context.ragResults.chunks.length} chunks

Which agents should process this and in what order?
Available agents:
${this.registry.listAgents().map(a => `- ${a.name}: ${a.description}`).join('\n')}

Return agent names in execution order.`;
    
    return await this.llm.generateJSON(prompt);
  }
}
```

### 4. Individual Agents

#### Query Planner Agent
```typescript
// src/lib/multi-agent/agents/QueryPlannerAgent.ts
export class QueryPlannerAgent implements Agent {
  name = 'QueryPlanner';
  description = 'Expands queries based on intent and domain understanding';
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    const prompt = `
Original query: "${context.query}"
Intent: ${context.understanding.intent}
Domain: ${context.understanding.domain}

Generate query variations that might find relevant information.
Consider synonyms, technical terms, colloquial phrases.
DO NOT hardcode patterns - think about what variations might exist.`;
    
    const variations = await this.llm.generateJSON(prompt);
    
    // Add to context for next search iteration if needed
    context.understanding.requirements.push(...variations);
    
    return context;
  }
}
```

#### Data Inspector Agent
```typescript
// src/lib/multi-agent/agents/DataInspectorAgent.ts
export class DataInspectorAgent implements Agent {
  name = 'DataInspector';
  description = 'Analyzes RAG chunks to understand data structure and quality';
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    // Sample chunks for analysis
    const samples = context.ragResults.chunks.slice(0, 5);
    
    const prompt = `
Analyze these data chunks:
${samples.map((c, i) => `Chunk ${i + 1}: ${c.text.substring(0, 200)}...`).join('\n\n')}

Identify:
1. Data format (table, prose, list, etc.)
2. Quality issues (repeated text, formatting problems)
3. Patterns you observe
4. Information structure

Return structured analysis.`;
    
    const analysis = await this.llm.generateJSON(prompt);
    
    // Update context with findings
    context.patterns = analysis.patterns;
    
    return context;
  }
}
```

#### Pattern Generator Agent
```typescript
// src/lib/multi-agent/agents/PatternGeneratorAgent.ts
export class PatternGeneratorAgent implements Agent {
  name = 'PatternGenerator';
  description = 'Creates extraction strategies based on data inspection';
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    const prompt = `
Based on the data analysis:
${JSON.stringify(context.patterns, null, 2)}

User is looking for: ${context.query}

Generate extraction strategies (not regex, but logical descriptions):
- What to look for
- How to identify relevant information
- How to handle the data quality issues identified

Be specific to THIS data and THIS query.`;
    
    const strategies = await this.llm.generateJSON(prompt);
    
    context.patterns = strategies.map(s => ({
      description: s.description,
      examples: s.examples,
      extractionStrategy: s.strategy
    }));
    
    return context;
  }
}
```

#### Extraction Agent
```typescript
// src/lib/multi-agent/agents/ExtractionAgent.ts
export class ExtractionAgent implements Agent {
  name = 'Extractor';
  description = 'Executes extraction using generated patterns';
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    const results = [];
    
    for (const chunk of context.ragResults.chunks) {
      const prompt = `
Extract information from this text:
"${chunk.text}"

Using these strategies:
${context.patterns.map(p => `- ${p.extractionStrategy}`).join('\n')}

Looking for: ${context.query}

Return structured data with confidence scores.`;
      
      const extracted = await this.llm.generateJSON(prompt);
      if (extracted.items.length > 0) {
        results.push(...extracted.items);
      }
    }
    
    context.extractedData.raw = results;
    
    return context;
  }
}
```

#### Synthesis Agent
```typescript
// src/lib/multi-agent/agents/SynthesisAgent.ts
export class SynthesisAgent implements Agent {
  name = 'Synthesizer';
  description = 'Formats extracted data into user-friendly answer';
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    const prompt = `
User asked: "${context.query}"

Extracted data:
${JSON.stringify(context.extractedData.raw, null, 2)}

Create a clear, direct answer that:
1. Directly addresses the user's question
2. Presents information in the format they expect
3. Includes relevant details but stays concise

If user asked for "top 3", give exactly 3.
If user asked for comparison, show comparison.
Match the user's intent exactly.`;
    
    const synthesis = await this.llm.generateJSON(prompt);
    
    context.synthesis = {
      answer: synthesis.answer,
      confidence: synthesis.confidence,
      reasoning: synthesis.reasoning
    };
    
    return context;
  }
}
```

### 5. Message Bus for Inter-Agent Communication
```typescript
// src/lib/multi-agent/core/MessageBus.ts
export class MessageBus {
  private subscribers: Map<string, Agent[]> = new Map();
  
  subscribe(eventType: string, agent: Agent) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(agent);
  }
  
  async broadcast(message: AgentMessage) {
    const subscribers = this.subscribers.get(message.type) || [];
    
    for (const agent of subscribers) {
      if (await agent.shouldActivate({ messages: [message] } as any)) {
        // Agent can react to this message
        await agent.process({ messages: [message] } as any);
      }
    }
  }
}
```

## Integration with Existing System

### Replace Current ResearchOrchestrator
```typescript
// In ResearchOrchestrator.ts
import { MultiAgentOrchestrator } from '@/lib/multi-agent';

private multiAgentOrchestrator = new MultiAgentOrchestrator();

private async synthesizeAnswer(
  query: string,
  steps: ResearchStep[],
  sources: SourceReference[],
  queryAnalysis: QueryAnalysis
): Promise<string> {
  // Use multi-agent system instead of hardcoded patterns
  return await this.multiAgentOrchestrator.research(query, sources);
}
```

## Example Flow

**Query**: "What are the top 3 fastest marathon times in 2024?"

1. **Orchestrator**: "This needs ranking data about sports performance"
2. **QueryPlanner**: "Expand to: world record marathon 2024, fastest marathon times, marathon leaderboard 2024"
3. **RAG Search**: Returns sports articles and results
4. **DataInspector**: "I see race results in table format with columns: Runner, Time, Event, Date"
5. **PatternGenerator**: "Look for time format HH:MM:SS next to runner names and 2024 dates"
6. **Extractor**: Pulls out all marathon times from 2024
7. **Synthesizer**: "Top 3 fastest marathon times in 2024:
   1. Kelvin Kiptum - 2:01:53 (Chicago, Oct 2024)
   2. Eliud Kipchoge - 2:02:42 (Berlin, Sept 2024)
   3. Tamirat Tola - 2:03:17 (NYC, Nov 2024)"

## Success Metrics

1. **Universal Coverage**: System handles ANY query type without code changes
2. **No Hardcoding**: Zero regex patterns or domain-specific logic
3. **Transparency**: Complete reasoning trace for every decision
4. **Modularity**: New agents can be added without changing existing code
5. **Intelligence**: System improves with better LLMs, not code updates

## No Fallback Policy

The system has NO fallback mechanisms. If it cannot find information, it clearly states:
- What it looked for
- What it found (or didn't find)
- Why it couldn't answer

This forces the system to be intelligent rather than relying on hardcoded escapes.