/**
 * Planning Agent
 * 
 * Creates intelligent execution strategies based on DataInspector's document analysis.
 * Decides optimal approach: regex patterns, web search expansion, or direct synthesis.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';
import { parseJsonWithResilience } from '../../../components/DeepResearch/hooks/responseCompletion';

export interface ExecutionPlan {
  strategy: string;
  steps: PlanStep[];
  fallbackOptions: string[];
  expectedDataSources: string[];
  confidenceLevel: number;
}

export interface PlanStep {
  agent: string;
  action: string;
  reasoning: string;
  expectedOutput: string;
  priority: 'high' | 'medium' | 'low';
}

export class PlanningAgent extends BaseAgent {
  readonly name = 'PlanningAgent';
  readonly description = 'Creates intelligent execution strategies based on document analysis and query requirements';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🎯 PlanningAgent: Creating intelligent execution strategy for "${context.query}"`);
    
    // Analyze current situation
    const situationAnalysis = this.analyzeSituation(context);
    console.log(`📊 Situation Analysis:`, situationAnalysis);
    
    // Create execution plan using LLM intelligence
    const executionPlan = await this.createExecutionPlan(context, situationAnalysis);
    
    // Store plan in shared knowledge for other agents
    context.sharedKnowledge.executionPlan = executionPlan;
    context.sharedKnowledge.agentFindings.PlanningAgent = {
      plan: executionPlan,
      situationAnalysis: situationAnalysis,
      timestamp: Date.now()
    };
    
    this.setReasoning(`Created execution strategy: ${executionPlan.strategy} with ${executionPlan.steps.length} steps and ${executionPlan.fallbackOptions.length} fallback options`);
    
    console.log(`✅ Execution plan created: ${executionPlan.strategy}`);
    return context;
  }
  
  private analyzeSituation(context: ResearchContext): any {
    const analysis = {
      // Document availability
      hasDocuments: context.ragResults.chunks.length > 0,
      documentCount: context.ragResults.chunks.length,
      
      // DataInspector insights
      hasDocumentAnalysis: !!context.documentAnalysis,
      relevantDocuments: context.documentAnalysis?.documents?.length || 0,
      documentTypes: context.documentAnalysis?.documents?.map(d => d.documentType) || [],
      
      // Query characteristics
      queryType: this.analyzeQueryType(context.query),
      requiresRanking: this.requiresRanking(context.query),
      requiresComparison: this.requiresComparison(context.query),
      requiresSpecificPerson: this.requiresSpecificPerson(context.query),
      
      // Data quality assessment
      dataQuality: this.assessDataQuality(context),
      needsWebExpansion: this.needsWebExpansion(context)
    };
    
    return analysis;
  }
  
  private async createExecutionPlan(context: ResearchContext, analysis: any): Promise<ExecutionPlan> {
    const prompt = `Create an intelligent execution plan for this research task:

QUERY: "${context.query}"

SITUATION ANALYSIS:
- Documents Available: ${analysis.hasDocuments ? `${analysis.documentCount} chunks` : 'None'}
- Document Types: ${analysis.documentTypes.join(', ') || 'Unknown'}
- Relevant Documents: ${analysis.relevantDocuments}
- Query Type: ${analysis.queryType}
- Requires Ranking: ${analysis.requiresRanking}
- Requires Specific Person: ${analysis.requiresSpecificPerson}
- Data Quality: ${analysis.dataQuality}
- Needs Web Expansion: ${analysis.needsWebExpansion}

DOCUMENT ANALYSIS RESULTS:
${context.documentAnalysis ? `
Document Strategy: ${context.documentAnalysis.extractionStrategy}
Expected Format: ${context.documentAnalysis.expectedOutputFormat}
Content Areas: ${context.documentAnalysis.contentAreas?.join(', ')}
` : 'No document analysis available'}

Based on this analysis, create an intelligent execution plan:

1. **STRATEGY**: What's the best approach? (regex-extraction, web-expansion, direct-synthesis)

2. **EXECUTION STEPS**: What agents should be called and in what order?
   - PatternGenerator: For structured data extraction using regex
   - Extractor: For executing patterns or LLM extraction  
   - WebSearchAgent: For expanding knowledge base when local data insufficient
   - Synthesizer: For creating final answer

3. **FALLBACK OPTIONS**: What to do if primary approach fails?

4. **EXPECTED DATA SOURCES**: Where should the final answer data come from?

5. **CONFIDENCE LEVEL**: How confident are you this plan will succeed? (0.1-1.0)

Return as JSON:
{
  "strategy": "brief strategy description",
  "steps": [
    {"agent": "AgentName", "action": "what to do", "reasoning": "why needed", "expectedOutput": "what we get", "priority": "high|medium|low"}
  ],
  "fallbackOptions": ["option1", "option2"],
  "expectedDataSources": ["local documents", "web search", "general knowledge"],
  "confidenceLevel": 0.8
}`;

    try {
      const response = await this.llm(prompt);
      const plan = this.parseExecutionPlan(response);
      
      console.log(`🎯 Generated execution plan:`, {
        strategy: plan.strategy,
        stepCount: plan.steps.length,
        confidence: plan.confidenceLevel
      });
      
      return plan;
      
    } catch (error) {
      console.error('❌ Failed to create execution plan:', error);
      
      // Fallback to simple plan
      return {
        strategy: 'fallback-simple-extraction',
        steps: [
          {
            agent: 'PatternGenerator',
            action: 'create basic patterns',
            reasoning: 'extract structured data',
            expectedOutput: 'regex patterns',
            priority: 'high'
          },
          {
            agent: 'Extractor', 
            action: 'extract using patterns',
            reasoning: 'get structured data',
            expectedOutput: 'extracted information',
            priority: 'high'
          },
          {
            agent: 'Synthesizer',
            action: 'create final answer',
            reasoning: 'combine extracted data',
            expectedOutput: 'user answer',
            priority: 'high'
          }
        ],
        fallbackOptions: ['web-search-expansion'],
        expectedDataSources: ['local documents'],
        confidenceLevel: 0.6
      };
    }
  }
  
  private parseExecutionPlan(response: string): ExecutionPlan {
    try {
      const parsed = parseJsonWithResilience(response);
      
      // Validate and provide defaults
      return {
        strategy: parsed.strategy || 'regex-extraction',
        steps: Array.isArray(parsed.steps) ? parsed.steps : [],
        fallbackOptions: Array.isArray(parsed.fallbackOptions) ? parsed.fallbackOptions : ['web-search'],
        expectedDataSources: Array.isArray(parsed.expectedDataSources) ? parsed.expectedDataSources : ['local documents'],
        confidenceLevel: typeof parsed.confidenceLevel === 'number' ? parsed.confidenceLevel : 0.7
      };
    } catch (error) {
      console.warn('⚠️ Failed to parse execution plan, using fallback');
      throw error;
    }
  }
  
  private analyzeQueryType(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('best') || q.includes('top') || q.includes('most')) return 'ranking';
    if (q.includes('compare') || q.includes('vs') || q.includes('difference')) return 'comparison';
    if (q.includes('how') || q.includes('what') || q.includes('why')) return 'information';
    if (q.includes('list') || q.includes('all')) return 'enumeration';
    return 'information';
  }
  
  private requiresRanking(query: string): boolean {
    return /\b(best|top|most|highest|lowest|first|greatest)\b/i.test(query);
  }
  
  private requiresComparison(query: string): boolean {
    return /\b(compare|vs|versus|difference|better|worse)\b/i.test(query);
  }
  
  private requiresSpecificPerson(query: string): boolean {
    // Check for possessive forms or names
    return /\b[A-Z][a-z]+'s\b|\b[A-Z][a-z]+\s+(project|work|achievement)\b/i.test(query);
  }
  
  private assessDataQuality(context: ResearchContext): string {
    if (!context.ragResults.chunks.length) return 'no-data';
    if (context.ragResults.chunks.length < 5) return 'limited';
    if (context.documentAnalysis?.documents && context.documentAnalysis.documents.length > 1) return 'multi-document';
    return 'sufficient';
  }
  
  private needsWebExpansion(context: ResearchContext): boolean {
    // Need web expansion if:
    // 1. No local documents
    // 2. Limited relevant documents 
    // 3. Query asks for information likely not in local KB
    if (!context.ragResults.chunks.length) return true;
    if (context.documentAnalysis?.documents && context.documentAnalysis.documents.length === 0) return true;
    
    const query = context.query.toLowerCase();
    const needsWebKeywords = ['latest', 'recent', 'current', 'news', 'trend', 'market'];
    return needsWebKeywords.some(keyword => query.includes(keyword));
  }
}