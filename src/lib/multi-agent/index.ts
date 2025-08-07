/**
 * Multi-Agent System Entry Point
 * 
 * Exports all components and provides factory functions
 */

// Core imports
import { Orchestrator } from './core/Orchestrator';
import { AgentRegistry } from './core/AgentRegistry';
import { MessageBus } from './core/MessageBus';

// Agent imports
import { QueryPlannerAgent } from './agents/QueryPlannerAgent';
import { DataInspectorAgent } from './agents/DataInspectorAgent';
import { PlanningAgent } from './agents/PlanningAgent';
import { PatternGeneratorAgent } from './agents/PatternGeneratorAgent';
import { ExtractionAgent } from './agents/ExtractionAgent';
import { WebSearchAgent } from './agents/WebSearchAgent';
import { SynthesisAgent } from './agents/SynthesisAgent';

// Core exports
export { Orchestrator } from './core/Orchestrator';
export { AgentRegistry } from './core/AgentRegistry';
export { MessageBus } from './core/MessageBus';

// Interface exports
export type { Agent } from './interfaces/Agent';
export { BaseAgent } from './interfaces/Agent';
export type { 
  ResearchContext, 
  ChunkData, 
  Understanding, 
  Pattern, 
  ExtractedItem, 
  Synthesis,
  AgentMessage 
} from './interfaces/Context';
export { createInitialContext } from './interfaces/Context';
export { MessageType } from './interfaces/Message';
export type { Message, Priority, MessageContent } from './interfaces/Message';
export { createMessage } from './interfaces/Message';

// Agent exports
export { QueryPlannerAgent } from './agents/QueryPlannerAgent';
export { DataInspectorAgent } from './agents/DataInspectorAgent';
export { PlanningAgent } from './agents/PlanningAgent';
export { PatternGeneratorAgent } from './agents/PatternGeneratorAgent';
export { ExtractionAgent } from './agents/ExtractionAgent';
export { WebSearchAgent } from './agents/WebSearchAgent';
export { SynthesisAgent } from './agents/SynthesisAgent';

// Factory function
export function createMultiAgentSystem(
  llm: (prompt: string) => Promise<string>, 
  progressCallback?: import('./interfaces/AgentProgress').AgentProgressCallback,
  vectorStore?: import('../../components/VectorStore/VectorStore').VectorStore
) {
  // Create core components
  const registry = new AgentRegistry();
  const messageBus = new MessageBus();
  
  // Register all agents in new intelligent architecture order
  registry.register(new QueryPlannerAgent(llm));
  registry.register(new DataInspectorAgent(llm)); // Magic document filtering
  registry.register(new PlanningAgent(llm)); // NEW: Intelligent execution strategy
  registry.register(new PatternGeneratorAgent(llm));
  registry.register(new ExtractionAgent(llm));
  registry.register(new WebSearchAgent(llm, vectorStore)); // NEW: Knowledge base expansion with persistence
  registry.register(new SynthesisAgent(llm));
  
  // Create and return orchestrator with progress callback
  return new Orchestrator(registry, messageBus, llm, progressCallback);
}