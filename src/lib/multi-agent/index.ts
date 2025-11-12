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
import { ResponseFormatterAgent } from './agents/ResponseFormatterAgent';
import { FlowFramePlannerAgent } from './agents/FlowFramePlannerAgent';
import { FlowFrameGeneratorAgent } from './agents/FlowFrameGeneratorAgent';
// New multi-synthesis agents
// BYPASSED: DataAnalysisAgent temporarily disabled due to catastrophic filtering bug
// import { DataAnalysisAgent } from './agents/DataAnalysisAgent';
import { SynthesisCoordinator } from './agents/SynthesisCoordinator';

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
export { ResponseFormatterAgent } from './agents/ResponseFormatterAgent';
export { FlowFramePlannerAgent } from './agents/FlowFramePlannerAgent';
export { FlowFrameGeneratorAgent } from './agents/FlowFrameGeneratorAgent';
// BYPASSED: DataAnalysisAgent temporarily disabled
// export { DataAnalysisAgent } from './agents/DataAnalysisAgent';
export { SynthesisCoordinator } from './agents/SynthesisCoordinator';

// Factory function
export interface MultiAgentConfig {
  enableWebSearch?: boolean;
  enableRAGSearch?: boolean;
  enableFlowAgents?: boolean;
  mode?: "research" | "flow_builder";
}

export function createMultiAgentSystem(
  llm: (prompt: string) => Promise<string>,
  progressCallback?: import("./interfaces/AgentProgress").AgentProgressCallback,
  vectorStore?: import("../../components/VectorStore/VectorStore").VectorStore,
  config: MultiAgentConfig = {}
) {
  // Create core components
  const registry = new AgentRegistry();
  const messageBus = new MessageBus();
  
  // Build list of available agents based on configuration - DataAnalyzer bypassed
  const availableAgents = ['QueryPlanner', 'DataInspector', 'PatternGenerator', 'Extractor', 'SynthesisCoordinator', 'ResponseFormatter'];
  if (config?.enableWebSearch !== false) {
    availableAgents.splice(4, 0, 'WebSearchAgent'); // Insert WebSearchAgent before SynthesisCoordinator
  }
  if (config?.enableFlowAgents) {
    availableAgents.push('FlowFramePlanner');
    availableAgents.push('FlowFrameGenerator');
  }
  
  // Register all agents in new intelligent architecture order
  registry.register(new QueryPlannerAgent(llm, progressCallback));
  registry.register(new DataInspectorAgent(llm, progressCallback)); // Magic document filtering with progress reporting
  registry.register(new PlanningAgent(llm, availableAgents, progressCallback)); // NEW: Intelligent execution strategy with available agents and progress tracking
  registry.register(new PatternGeneratorAgent(llm, progressCallback, vectorStore));
  registry.register(new ExtractionAgent(llm, progressCallback));
  
  // Only register WebSearchAgent if web search is enabled
  if (config?.enableWebSearch !== false) { // Default to enabled unless explicitly disabled
    registry.register(new WebSearchAgent(llm, vectorStore, config, progressCallback)); // Knowledge base expansion with config
  }
  // Disable configuration logging to prevent spam
  // console.log('🌐 WebSearchAgent disabled by configuration');
  
  // Register new multi-synthesis agents - DataAnalysisAgent bypassed
  // BYPASSED: DataAnalysisAgent due to catastrophic filtering bug that removes all relevant data
  // registry.register(new DataAnalysisAgent(llm)); // Clean and categorize data
  registry.register(new SynthesisCoordinator(llm, progressCallback)); // Coordinate synthesis pipeline (works with raw extracted data)
  
  // Keep original SynthesisAgent as fallback for now
  registry.register(new SynthesisAgent(llm, progressCallback));
  registry.register(new ResponseFormatterAgent(llm, progressCallback)); // Ensure direct question answering with good formatting

  if (config?.enableFlowAgents) {
    registry.register(new FlowFramePlannerAgent(llm, progressCallback));
    registry.register(new FlowFrameGeneratorAgent(llm, progressCallback));
  }
  
  // Create orchestrator with progress callback, config, and vectorStore
  const orchestrator = new Orchestrator(registry, messageBus, llm, progressCallback, config, vectorStore);
  
  // Note: Progress proxy will be initialized when setProgressCallback() is called
  // This prevents duplicate proxy creation and spam
  
  return orchestrator;
}
