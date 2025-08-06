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
   IMPORTANT: Use EXACT agent names as listed below:
   - "PatternGenerator": For structured data extraction using regex
   - "Extractor": For executing patterns or LLM extraction (NOT "PatternExtractor")
   - "WebSearchAgent": For expanding knowledge base when local data insufficient
   - "Synthesizer": For creating final answer

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
  
  private normalizeAgentName(name: string): string {
    // Normalize common variations to correct agent names
    const normalizations: Record<string, string> = {
      'patternextractor': 'Extractor',
      'pattern-extractor': 'Extractor',
      'pattern_extractor': 'Extractor',
      'extractionagent': 'Extractor',
      'extraction': 'Extractor',
      'patterngenerator': 'PatternGenerator',
      'pattern-generator': 'PatternGenerator',
      'pattern_generator': 'PatternGenerator',
      'websearch': 'WebSearchAgent',
      'web-search': 'WebSearchAgent',
      'web_search': 'WebSearchAgent',
      'synthesis': 'Synthesizer',
      'synthesize': 'Synthesizer',
      'datainspector': 'DataInspector',
      'data-inspector': 'DataInspector',
      'data_inspector': 'DataInspector',
      'planningagent': 'PlanningAgent',
      'planning': 'PlanningAgent',
      'planner': 'PlanningAgent'
    };
    
    const normalized = normalizations[name.toLowerCase()] || name;
    return normalized;
  }

  private parseExecutionPlan(response: string): ExecutionPlan {
    // Multiple parsing attempts with increasing resilience
    const parsingAttempts = [
      // Attempt 1: Standard JSON parsing
      () => parseJsonWithResilience(response),
      
      // Attempt 2: Extract JSON block if wrapped in markdown
      () => {
        const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          return parseJsonWithResilience(jsonMatch[1]);
        }
        throw new Error('No JSON block found');
      },
      
      // Attempt 3: Find first complete JSON object
      () => {
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}') + 1;
        if (jsonStart >= 0 && jsonEnd > jsonStart) {
          return parseJsonWithResilience(response.substring(jsonStart, jsonEnd));
        }
        throw new Error('No JSON object found');
      },
      
      // Attempt 4: Manual extraction from text
      () => this.extractPlanFromText(response)
    ];
    
    for (let i = 0; i < parsingAttempts.length; i++) {
      try {
        console.log(`🔄 PlanningAgent parsing attempt ${i + 1}/${parsingAttempts.length}`);
        const parsed = parsingAttempts[i]();
        
        // Normalize agent names in steps
        if (Array.isArray(parsed.steps)) {
          parsed.steps = parsed.steps.map((step: any) => ({
            ...step,
            agent: this.normalizeAgentName(step.agent || '')
          }));
        }
        
        // Validate and provide defaults
        const plan = {
          strategy: parsed.strategy || 'regex-extraction',
          steps: Array.isArray(parsed.steps) ? parsed.steps : [],
          fallbackOptions: Array.isArray(parsed.fallbackOptions) ? parsed.fallbackOptions : ['web-search'],
          expectedDataSources: Array.isArray(parsed.expectedDataSources) ? parsed.expectedDataSources : ['local documents'],
          confidenceLevel: typeof parsed.confidenceLevel === 'number' ? parsed.confidenceLevel : 0.7
        };
        
        console.log(`✅ Successfully parsed execution plan on attempt ${i + 1}`);
        return plan;
        
      } catch (error) {
        console.warn(`⚠️ Parsing attempt ${i + 1} failed:`, error.message);
        if (i === parsingAttempts.length - 1) {
          console.error('❌ All parsing attempts failed, using intelligent fallback');
          return this.createIntelligentFallback(response);
        }
      }
    }
    
    // This should never be reached due to fallback
    throw new Error('Failed to create execution plan');
  }
  
  private extractPlanFromText(response: string): any {
    console.log(`🔍 Attempting manual plan extraction from text response`);
    
    // Try to extract key information from text
    const strategy = this.extractStrategy(response);
    const steps = this.extractSteps(response);
    const fallbackOptions = this.extractFallbackOptions(response);
    const expectedDataSources = this.extractDataSources(response);
    const confidenceLevel = this.extractConfidence(response);
    
    return {
      strategy,
      steps,
      fallbackOptions,
      expectedDataSources,
      confidenceLevel
    };
  }
  
  private createIntelligentFallback(response: string): ExecutionPlan {
    console.log(`🤖 Creating intelligent fallback based on response content`);
    
    // Analyze response to create intelligent fallback
    const hasPatternMention = /pattern|regex|extract/i.test(response);
    const hasWebMention = /web|search|expand/i.test(response);
    const hasSynthesisMention = /synthesis|answer|final/i.test(response);
    
    const steps = [];
    
    // Always start with PatternGenerator for structured extraction
    steps.push({
      agent: 'PatternGenerator',
      action: 'create extraction patterns',
      reasoning: 'extract structured data from documents',
      expectedOutput: 'regex patterns for data extraction',
      priority: 'high'
    });
    
    // Add Extractor
    steps.push({
      agent: 'Extractor',
      action: 'extract using patterns',
      reasoning: 'get structured information from documents',
      expectedOutput: 'extracted data items',
      priority: 'high'
    });
    
    // Add WebSearchAgent if mentioned or if data quality seems low
    if (hasWebMention) {
      steps.push({
        agent: 'WebSearchAgent',
        action: 'expand knowledge base',
        reasoning: 'supplement local data with web information',
        expectedOutput: 'additional relevant information',
        priority: 'medium'
      });
    }
    
    // Always end with Synthesizer
    steps.push({
      agent: 'Synthesizer',
      action: 'create final answer',
      reasoning: 'combine all extracted data into user answer',
      expectedOutput: 'comprehensive final answer',
      priority: 'high'
    });
    
    return {
      strategy: hasPatternMention ? 'regex-extraction' : 'llm-analysis',
      steps: steps,
      fallbackOptions: ['web-search-expansion', 'direct-synthesis'],
      expectedDataSources: ['local documents'],
      confidenceLevel: 0.6 // Lower confidence for fallback
    };
  }
  
  private extractStrategy(text: string): string {
    if (/regex|pattern/i.test(text)) return 'regex-extraction';
    if (/web|search/i.test(text)) return 'web-expansion';
    if (/synthesis|direct/i.test(text)) return 'direct-synthesis';
    return 'regex-extraction';
  }
  
  private extractSteps(text: string): any[] {
    const steps = [];
    
    if (/patterngenerator|pattern/i.test(text)) {
      steps.push({
        agent: 'PatternGenerator',
        action: 'create patterns',
        reasoning: 'extract structured data',
        expectedOutput: 'regex patterns',
        priority: 'high'
      });
    }
    
    if (/extractor|extract/i.test(text)) {
      steps.push({
        agent: 'Extractor',
        action: 'extract data',
        reasoning: 'get information',
        expectedOutput: 'extracted items',
        priority: 'high'
      });
    }
    
    if (/websearch|web/i.test(text)) {
      steps.push({
        agent: 'WebSearchAgent',
        action: 'search web',
        reasoning: 'expand knowledge',
        expectedOutput: 'web results',
        priority: 'medium'
      });
    }
    
    if (/synthesizer|synthesis|final/i.test(text)) {
      steps.push({
        agent: 'Synthesizer',
        action: 'create answer',
        reasoning: 'combine data',
        expectedOutput: 'final answer',
        priority: 'high'
      });
    }
    
    return steps;
  }
  
  private extractFallbackOptions(text: string): string[] {
    const options = [];
    if (/web|search/i.test(text)) options.push('web-search-expansion');
    if (/synthesis|direct/i.test(text)) options.push('direct-synthesis');
    return options.length > 0 ? options : ['web-search-expansion'];
  }
  
  private extractDataSources(text: string): string[] {
    const sources = [];
    if (/local|document/i.test(text)) sources.push('local documents');
    if (/web|search/i.test(text)) sources.push('web search');
    if (/general|knowledge/i.test(text)) sources.push('general knowledge');
    return sources.length > 0 ? sources : ['local documents'];
  }
  
  private extractConfidence(text: string): number {
    const confMatch = text.match(/confidence[:\s]*(\d*\.?\d+)/i);
    if (confMatch) {
      const conf = parseFloat(confMatch[1]);
      return conf <= 1 ? conf : conf / 100; // Handle 80 vs 0.8
    }
    return 0.7; // Default confidence
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