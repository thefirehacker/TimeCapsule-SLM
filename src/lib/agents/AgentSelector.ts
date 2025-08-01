/**
 * Agent Selector
 * 
 * Maps query intents to specialized agents and manages agent lifecycle.
 */

import { QueryIntent } from '../QueryIntelligenceService';
import { ResearchAgent } from './ResearchAgent';
import { performanceAgent } from './PerformanceAgent';
// Import other agents as they are created
// import { comparisonAgent } from './ComparisonAgent';
// import { tutorialAgent } from './TutorialAgent';

/**
 * Agent registry and selector
 */
export class AgentSelector {
  private static instance: AgentSelector;
  private agents: Map<string, ResearchAgent> = new Map();
  
  private constructor() {
    // Register available agents
    this.registerAgent(performanceAgent);
    // this.registerAgent(comparisonAgent);
    // this.registerAgent(tutorialAgent);
  }
  
  /**
   * Get singleton instance
   */
  static getInstance(): AgentSelector {
    if (!AgentSelector.instance) {
      AgentSelector.instance = new AgentSelector();
    }
    return AgentSelector.instance;
  }
  
  /**
   * Register an agent
   */
  registerAgent(agent: ResearchAgent) {
    agent.supportedIntents.forEach(intent => {
      this.agents.set(intent.toLowerCase(), agent);
    });
    console.log(`🤖 Registered ${agent.name} for intents:`, agent.supportedIntents);
  }
  
  /**
   * Select the best agent for a given intent
   */
  selectAgent(intent: QueryIntent): ResearchAgent | null {
    // First try exact match
    const exactMatch = this.agents.get(intent.type.toLowerCase());
    if (exactMatch) {
      console.log(`✅ Selected ${exactMatch.name} for intent: ${intent.type}`);
      return exactMatch;
    }
    
    // Try fuzzy matching based on keywords
    for (const keyword of intent.keywords) {
      const agent = this.agents.get(keyword.toLowerCase());
      if (agent) {
        console.log(`✅ Selected ${agent.name} based on keyword: ${keyword}`);
        return agent;
      }
    }
    
    // Fallback based on intent categories
    const intentMappings: Record<string, string[]> = {
      performance: ['speed', 'time', 'metrics', 'ranking'],
      comparison: ['versus', 'difference', 'better', 'compare'],
      tutorial: ['howto', 'guide', 'steps', 'learn'],
      research: ['information', 'definition', 'explain', 'summary']
    };
    
    for (const [category, keywords] of Object.entries(intentMappings)) {
      if (keywords.some(kw => intent.type.includes(kw) || intent.keywords.some(k => k.includes(kw)))) {
        const agent = this.agents.get(category);
        if (agent) {
          console.log(`✅ Selected ${agent.name} based on category mapping: ${category}`);
          return agent;
        }
      }
    }
    
    console.log(`⚠️ No specialized agent found for intent: ${intent.type}, using default extraction`);
    return null;
  }
  
  /**
   * Get all registered agents
   */
  getAllAgents(): ResearchAgent[] {
    return Array.from(new Set(this.agents.values()));
  }
  
  /**
   * Check if an agent is available for an intent type
   */
  hasAgentForIntent(intentType: string): boolean {
    return this.agents.has(intentType.toLowerCase());
  }
}

// Export singleton instance
export const agentSelector = AgentSelector.getInstance();