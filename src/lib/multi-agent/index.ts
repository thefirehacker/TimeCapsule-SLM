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
import { PatternGeneratorAgent } from './agents/PatternGeneratorAgent';
import { ExtractionAgent } from './agents/ExtractionAgent';
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
export { PatternGeneratorAgent } from './agents/PatternGeneratorAgent';
export { ExtractionAgent } from './agents/ExtractionAgent';
export { SynthesisAgent } from './agents/SynthesisAgent';

// Factory function
export function createMultiAgentSystem(llm: (prompt: string) => Promise<string>) {
  // Create core components
  const registry = new AgentRegistry();
  const messageBus = new MessageBus();
  
  // Register all agents
  registry.register(new QueryPlannerAgent(llm));
  registry.register(new DataInspectorAgent(llm));
  registry.register(new PatternGeneratorAgent(llm));
  registry.register(new ExtractionAgent(llm));
  registry.register(new SynthesisAgent(llm));
  
  // Create and return orchestrator
  return new Orchestrator(registry, messageBus, llm);
}