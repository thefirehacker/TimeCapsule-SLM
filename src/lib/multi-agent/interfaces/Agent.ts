/**
 * Base Agent Interface
 * 
 * All agents in the multi-agent system must implement this interface.
 * Agents are stateless and process context in a pipeline.
 */

import { ResearchContext } from './Context';
import type { AgentProgressCallback } from './AgentProgress';

export interface Agent {
  /**
   * Unique name for this agent
   */
  readonly name: string;
  
  /**
   * Description of what this agent does
   */
  readonly description: string;
  
  /**
   * Analyzes if this agent should be involved in the current research
   */
  shouldActivate(context: ResearchContext): Promise<boolean>;
  
  /**
   * Processes the context and returns enriched context
   * This is where the agent does its work
   */
  process(context: ResearchContext): Promise<ResearchContext>;
  
  /**
   * Explains what the agent did in this process
   */
  explainReasoning(): string;
}

/**
 * Base implementation with common functionality
 */
export abstract class BaseAgent implements Agent {
  abstract readonly name: string;
  abstract readonly description: string;
  
  protected reasoning: string = '';
  protected progressCallback?: AgentProgressCallback; // allow agents to emit progress
  
  async shouldActivate(context: ResearchContext): Promise<boolean> {
    // By default, let orchestrator decide
    return true;
  }
  
  abstract process(context: ResearchContext): Promise<ResearchContext>;
  
  explainReasoning(): string {
    return this.reasoning;
  }
  
  protected setReasoning(reasoning: string) {
    this.reasoning = reasoning;
  }
}