/**
 * Multi-Agent System Entry Point
 *
 * Exports all components and provides factory functions
 */

// Core imports
import { Orchestrator } from "./core/Orchestrator";
import { AgentRegistry } from "./core/AgentRegistry";
import { MessageBus } from "./core/MessageBus";

// Agent imports
import { QueryPlannerAgent } from "./agents/QueryPlannerAgent";
import { DataInspectorAgent } from "./agents/DataInspectorAgent";
import { PlanningAgent } from "./agents/PlanningAgent";
import { PatternGeneratorAgent } from "./agents/PatternGeneratorAgent";
import { ExtractionAgent } from "./agents/ExtractionAgent";
import { WebSearchAgent } from "./agents/WebSearchAgent";
import { SynthesisAgent } from "./agents/SynthesisAgent";
import { ResponseFormatterAgent } from "./agents/ResponseFormatterAgent";
// New multi-synthesis agents
// BYPASSED: DataAnalysisAgent temporarily disabled due to catastrophic filtering bug
// import { DataAnalysisAgent } from './agents/DataAnalysisAgent';
import { SynthesisCoordinator } from "./agents/SynthesisCoordinator";

// Core exports
export { Orchestrator } from "./core/Orchestrator";
export { AgentRegistry } from "./core/AgentRegistry";
export { MessageBus } from "./core/MessageBus";

// Interface exports
export type { Agent } from "./interfaces/Agent";
export { BaseAgent } from "./interfaces/Agent";
export type {
  ResearchContext,
  ChunkData,
  Understanding,
  Pattern,
  ExtractedItem,
  Synthesis,
  AgentMessage,
} from "./interfaces/Context";
export { createInitialContext } from "./interfaces/Context";
export { MessageType } from "./interfaces/Message";
export type { Message, Priority, MessageContent } from "./interfaces/Message";
export { createMessage } from "./interfaces/Message";

// Agent exports
export { QueryPlannerAgent } from "./agents/QueryPlannerAgent";
export { DataInspectorAgent } from "./agents/DataInspectorAgent";
export { PlanningAgent } from "./agents/PlanningAgent";
export { PatternGeneratorAgent } from "./agents/PatternGeneratorAgent";
export { ExtractionAgent } from "./agents/ExtractionAgent";
export { WebSearchAgent } from "./agents/WebSearchAgent";
export { SynthesisAgent } from "./agents/SynthesisAgent";
export { ResponseFormatterAgent } from "./agents/ResponseFormatterAgent";
// BYPASSED: DataAnalysisAgent temporarily disabled
// export { DataAnalysisAgent } from './agents/DataAnalysisAgent';
export { SynthesisCoordinator } from "./agents/SynthesisCoordinator";

// Factory function
export function createMultiAgentSystem(
  llm: (prompt: string) => Promise<string>,
  progressCallback?: import("./interfaces/AgentProgress").AgentProgressCallback,
  vectorStore?: import("../../components/VectorStore/VectorStore").VectorStore,
  config?: { enableWebSearch?: boolean; enableRAGSearch?: boolean }
) {
  // Create core components
  const registry = new AgentRegistry();
  const messageBus = new MessageBus();

  // 🔥 CRITICAL FIX: Create orchestrator first to get progress proxy for agents
  const orchestrator = new Orchestrator(
    registry,
    messageBus,
    llm,
    progressCallback,
    config,
    vectorStore
  );

  // 🔥 Create progress proxy that routes through progressTracker for timeline recording
  const proxyCallback = orchestrator.createAgentProgressProxy();

  // Build list of available agents based on configuration - DataAnalyzer bypassed
  const availableAgents = [
    "QueryPlanner",
    "DataInspector",
    "PatternGenerator",
    "Extractor",
    "SynthesisCoordinator",
    "ResponseFormatter",
  ];
  if (config?.enableWebSearch !== false) {
    availableAgents.splice(4, 0, "WebSearchAgent"); // Insert WebSearchAgent before SynthesisCoordinator
  }

  // 🔥 Register all agents with proxy callback for timeline recording
  registry.register(new QueryPlannerAgent(llm, proxyCallback));
  registry.register(new DataInspectorAgent(llm, proxyCallback)); // Magic document filtering with progress reporting
  registry.register(new PlanningAgent(llm, availableAgents, proxyCallback)); // NEW: Intelligent execution strategy with available agents and progress tracking
  registry.register(new PatternGeneratorAgent(llm, proxyCallback, vectorStore));
  registry.register(new ExtractionAgent(llm, proxyCallback));

  // Only register WebSearchAgent if web search is enabled
  if (config?.enableWebSearch !== false) {
    // Default to enabled unless explicitly disabled
    registry.register(
      new WebSearchAgent(llm, vectorStore, config, proxyCallback)
    ); // Knowledge base expansion with config
  }
  // Disable configuration logging to prevent spam
  // console.log('🌐 WebSearchAgent disabled by configuration');

  // Register new multi-synthesis agents - DataAnalysisAgent bypassed
  // BYPASSED: DataAnalysisAgent due to catastrophic filtering bug that removes all relevant data
  // registry.register(new DataAnalysisAgent(llm)); // Clean and categorize data
  registry.register(new SynthesisCoordinator(llm, proxyCallback)); // Coordinate synthesis pipeline (works with raw extracted data)

  // Keep original SynthesisAgent as fallback for now
  registry.register(new SynthesisAgent(llm, proxyCallback));
  registry.register(new ResponseFormatterAgent(llm, proxyCallback)); // Ensure direct question answering with good formatting

  return orchestrator;
}
