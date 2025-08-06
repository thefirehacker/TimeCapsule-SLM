/**
 * Agent Registry
 * 
 * Manages all available agents in the system.
 * Allows dynamic registration and discovery of agents.
 */

import { Agent } from '../interfaces/Agent';

export class AgentRegistry {
  private agents: Map<string, Agent> = new Map();
  
  /**
   * Register an agent
   */
  register(agent: Agent): void {
    if (this.agents.has(agent.name)) {
      console.warn(`⚠️ Agent ${agent.name} already registered, overwriting`);
    }
    this.agents.set(agent.name, agent);
    console.log(`📝 Registered agent: ${agent.name} - ${agent.description}`);
  }
  
  /**
   * Get an agent by name
   */
  get(name: string): Agent | undefined {
    return this.agents.get(name);
  }
  
  /**
   * Get all registered agents
   */
  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }
  
  /**
   * List all agents with descriptions
   */
  listAgents(): { name: string; description: string }[] {
    return this.getAllAgents().map(agent => ({
      name: agent.name,
      description: agent.description
    }));
  }
  
  /**
   * Check if an agent is registered
   */
  has(name: string): boolean {
    return this.agents.has(name);
  }
  
  /**
   * Clear all agents
   */
  clear(): void {
    this.agents.clear();
  }
}

// Singleton instance
export const agentRegistry = new AgentRegistry();