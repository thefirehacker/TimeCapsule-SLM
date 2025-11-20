# Sage Mode: Multi-Agent System Architecture for MCP Server

## Overview
This document analyzes the AI Agent structure and storage mechanisms in the Canvas3D-LLM multi-agent system to understand how agents can be structured and stored for MCP (Model Context Protocol) server implementation.

## Core Agent Architecture

### 1. Agent Interface Structure

All agents implement the base `Agent` interface with these core components:

```typescript
interface Agent {
  readonly name: string;              // Unique identifier
  readonly description: string;       // Human-readable description
  shouldActivate(context: ResearchContext): Promise<boolean>;  // Activation logic
  process(context: ResearchContext): Promise<ResearchContext>; // Main processing
  explainReasoning(): string;         // Reasoning explanation
}
```

### 2. Agent Registration and Storage

#### Agent Registry System
- **Storage**: Agents are stored in a `Map<string, Agent>` structure
- **Registration**: Dynamic registration via `AgentRegistry.register(agent)`
- **Discovery**: Agents can be retrieved by name or listed with descriptions
- **Lifecycle**: Singleton registry manages all agents globally

```typescript
class AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  
  register(agent: Agent): void
  get(name: string): Agent | undefined
  getAllAgents(): Agent[]
  listAgents(): { name: string; description: string }[]
}
```

#### Agent Factory Pattern
Agents are instantiated and registered through a factory function:

```typescript
function createMultiAgentSystem(
  llm: LLMFunction,
  progressCallback?: AgentProgressCallback,
  vectorStore?: VectorStore,
  config?: { enableWebSearch?: boolean; enableRAGSearch?: boolean }
)
```

### 3. Agent Types and Specializations

The system contains specialized agents for different purposes:

#### Core Processing Agents
1. **QueryPlannerAgent** - Query expansion and intent analysis
2. **DataInspectorAgent** - Document structure analysis and filtering
3. **PlanningAgent** - Execution strategy creation
4. **PatternGeneratorAgent** - Pattern extraction strategies
5. **ExtractionAgent** - Data extraction execution
6. **DataAnalysisAgent** - Data cleaning and categorization
7. **SynthesisAgent** - Information consolidation
8. **ResponseFormatterAgent** - Output formatting

#### Specialized Agents
- **WebSearchAgent** - External knowledge expansion
- **SynthesisCoordinator** - Multi-synthesis pipeline coordination

### 4. Agent Communication and State Management

#### Message Bus System
- **Inter-agent Communication**: Pub/sub messaging via `MessageBus`
- **Message Types**: INFO, REQUEST, RESPONSE, ERROR
- **Broadcasting**: Support for broadcast messages to all agents
- **History**: Message history tracking with configurable limits

#### Shared Context (ResearchContext)
Agents share state through a comprehensive context object:

```typescript
interface ResearchContext {
  query: string;                    // Original user query
  understanding: Understanding;     // Query analysis
  ragResults: RagResults;          // Retrieved chunks
  patterns: Pattern[];             // Discovered patterns
  extractedData: ExtractedData;    // Extracted information
  synthesis: Synthesis;            // Final answer
  messages: AgentMessage[];        // Communication log
  sharedKnowledge: SharedKnowledge; // Inter-agent shared data
  metadata: Metadata;              // Performance metrics
}
```

### 5. Agent Progress and Monitoring

#### Progress Tracking System
- **Real-time Monitoring**: `AgentProgressTracker` for execution monitoring
- **Metrics Collection**: Token usage, response times, confidence scores
- **Sub-step Tracking**: Detailed progress reporting for UI
- **Error Handling**: Retry logic and error recovery

```typescript
interface AgentMetrics {
  llmCalls: number;
  tokensUsed: number;
  responseTime: number;
  confidence: number;
  startTime?: number;
  endTime?: number;
}
```

### 6. Orchestration and Execution

#### Master Orchestrator
- **Tool Selection**: LLM-driven agent selection based on context
- **Quality Control**: Result assessment and retry logic
- **State Management**: Agent execution tracking and result caching
- **Pipeline Management**: Sequential and conditional agent execution

## MCP Server Implementation Considerations

### 1. Agent Serialization for MCP
- Agents need to be serializable for MCP transport
- Consider separating agent logic from state
- Implement agent metadata export/import

### 2. Remote Agent Execution
- Agents currently run in-process with direct LLM access
- MCP server would need to handle remote LLM calls
- Context passing between client and server

### 3. State Persistence
- Current system is stateless between requests
- MCP server might need persistent agent state
- Consider database storage for agent configurations

### 4. Agent Discovery and Registration
- Current registry is in-memory
- MCP server needs discoverable agent catalog
- Version management for agent updates

## Key Insights from Logs Analysis

From the execution logs, we can observe:

1. **Agent Registration Pattern**:
   ```
   📝 Registered agent: QueryPlanner - Expands queries based on intent
   📝 Registered agent: DataInspector - Analyzes RAG chunks
   📝 Registered agent: PlanningAgent - Creates execution strategies
   ```

2. **Execution Flow**:
   - Agents are called based on orchestrator decisions
   - Progress tracking provides real-time feedback
   - Quality assessment determines retry logic

3. **Performance Metrics**:
   - Execution times tracked per agent
   - Token usage monitoring
   - Quality scores for output assessment

## Recommendations for MCP Server Design

1. **Agent Interface Standardization**: Maintain the current interface but add serialization support
2. **Registry Service**: Implement persistent agent registry with versioning
3. **Context Protocol**: Define MCP-compatible context passing mechanisms
4. **Progress Streaming**: Implement real-time progress updates over MCP
5. **Error Handling**: Standardize error responses and retry mechanisms
6. **Authentication**: Add agent-level security and access controls

## MCP Server Implementation Examples

### 1. Agent Serialization Schema

```typescript
interface SerializableAgent {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: string[];
  inputSchema: JSONSchema;
  outputSchema: JSONSchema;
  configuration?: Record<string, any>;
}
```

### 2. MCP Tool Definitions

Each agent can be exposed as an MCP tool:

```typescript
const mcpTools = [
  {
    name: "query_planner",
    description: "Expands queries based on intent and domain understanding",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        context: { type: "object" }
      }
    }
  },
  {
    name: "data_inspector", 
    description: "Analyzes RAG chunks to understand data structure and quality",
    inputSchema: {
      type: "object",
      properties: {
        chunks: { type: "array" },
        analysisType: { type: "string" }
      }
    }
  }
];
```

### 3. Context Passing Protocol

```typescript
interface MCPContext {
  sessionId: string;
  query: string;
  sharedState: Record<string, any>;
  agentChain: string[];
  metadata: {
    timestamp: number;
    clientInfo: Record<string, any>;
  };
}
```

### 4. Progress Streaming

```typescript
interface MCPProgressUpdate {
  sessionId: string;
  agentName: string;
  progress: number;
  stage?: string;
  metrics?: AgentMetrics;
  thinking?: AgentThinking;
}
```

## Storage Patterns for MCP

### 1. Agent Registry Storage
- **In-Memory**: Current `Map<string, Agent>` for active sessions
- **Persistent**: Database storage for agent definitions and configurations
- **Distributed**: Redis/Similar for multi-instance deployments

### 2. Context Persistence
- **Session State**: Temporary storage during agent execution chain
- **Result Caching**: Persistent storage for expensive computations
- **History Tracking**: Long-term storage for analysis and debugging

### 3. Configuration Management
- **Agent Configs**: JSON/YAML files for agent parameters
- **Environment Configs**: Runtime configuration for different deployments
- **User Preferences**: Per-user agent behavior customization

## Integration Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MCP Client    │    │   MCP Server    │    │  Agent System   │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Tool Calls  │◄├────┤ │ Tool Router │ │    │ │ Orchestrator│ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │        │        │    │        │        │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Progress UI │◄├────┤ │ Event Stream│◄├────┤ │ Progress    │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │ Tracker     │ │
│                 │    │                 │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Context     │◄├────┤ │ State Mgmt  │◄├────┤ │ Context     │ │
│ │ Manager     │ │    │ │             │ │    │ │ Store       │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

This architecture enables the Canvas3D-LLM multi-agent system to be exposed via MCP while maintaining its sophisticated orchestration, progress tracking, and inter-agent communication capabilities.