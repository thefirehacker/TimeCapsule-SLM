/**
 * Pattern Generator Agent
 * 
 * Creates extraction strategies based on data inspection results.
 * Generates logical descriptions of what to look for, not regex patterns.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

export class PatternGeneratorAgent extends BaseAgent {
  readonly name = 'PatternGenerator';
  readonly description = 'Creates extraction strategies based on data inspection';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🎯 PatternGenerator: Creating extraction strategies`);
    
    // Use LLM to generate extraction strategies
    await this.generateStrategiesWithLLM(context);
    
    return context;
  }
  
  private async generateStrategiesWithLLM(context: ResearchContext): Promise<void> {
    // ACCESS DataInspector's shared insights for intelligent strategy generation
    const documentInsights = context.sharedKnowledge.documentInsights;
    const hasDocumentAnalysis = documentInsights && Object.keys(documentInsights).length > 0;
    
    let prompt = `User is looking for: "${context.query}"`;
    
    if (hasDocumentAnalysis) {
      prompt += `

DOCUMENT ANALYSIS FROM DataInspector:
- Document Type: ${documentInsights.documentType}
- Content Areas: ${documentInsights.contentAreas?.join(', ')}
- Query Intent: ${documentInsights.queryIntent}
- Recommended Strategy: ${documentInsights.extractionStrategy}
- Expected Output: ${documentInsights.expectedOutputFormat}

Build upon this analysis to create enhanced extraction patterns.`;
    } else {
      prompt += `

Based on the data type: ${context.understanding.intent || 'general information'}`;
    }
    
    prompt += `

What additional patterns or indicators would help find relevant information?`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Strategy generation (enhanced with DataInspector insights):`, response.substring(0, 300));
      
      // Store insights in shared knowledge base
      context.sharedKnowledge.extractionStrategies = {
        generatedStrategies: response,
        basedOnDocumentAnalysis: hasDocumentAnalysis,
        timestamp: Date.now(),
        agentSource: 'PatternGenerator'
      };
      
      // Store full response for thinking extraction
      this.setReasoning(response);
      
      // Convert LLM response to patterns (EXTENDING DataInspector's patterns)
      this.updatePatternsFromStrategies(context, response);
      
    } catch (error) {
      console.error('❌ Failed to generate strategies:', error);
      // Keep existing patterns from DataInspector
      this.setReasoning('Using patterns from data inspection');
    }
  }
  
  private updatePatternsFromStrategies(context: ResearchContext, response: string) {
    const lower = response.toLowerCase();
    
    // CRITICAL FIX: Build upon DataInspector's patterns instead of replacing them
    const newPatterns = [];
    
    // Always include a primary extraction strategy
    newPatterns.push({
      description: 'Primary extraction strategy',
      examples: this.extractExamples(response),
      extractionStrategy: this.extractStrategy(response),
      confidence: 0.9
    });
    
    // Add exclusion pattern if mentioned
    if (lower.includes('avoid') || lower.includes('not') || lower.includes('exclude')) {
      newPatterns.push({
        description: 'Items to exclude',
        examples: ['tokens/sec', 'throughput', 'performance metrics'],
        extractionStrategy: 'Identify these but do not include in results',
        confidence: 0.8
      });
    }
    
    // PRESERVE DataInspector's document-specific patterns and ADD new ones
    context.patterns.push(...newPatterns);
    
    console.log(`✅ Extended patterns: ${context.patterns.length} total strategies (preserved ${context.patterns.length - newPatterns.length} from DataInspector)`);
  }
  
  private extractExamples(response: string): string[] {
    // Extract examples mentioned in the response
    const examples: string[] = [];
    const lines = response.split('\n');
    
    lines.forEach(line => {
      if (line.includes('"') || line.includes("'")) {
        const quoted = line.match(/["']([^"']+)["']/g);
        if (quoted) {
          examples.push(...quoted.map(q => q.replace(/["']/g, '')));
        }
      }
    });
    
    return examples.length > 0 ? examples : ['Data values', 'Relevant information'];
  }
  
  private extractStrategy(response: string): string {
    // Extract the main strategy from the response
    const lines = response.split('\n');
    
    for (const line of lines) {
      if (line.toLowerCase().includes('look for') || 
          line.toLowerCase().includes('find') ||
          line.toLowerCase().includes('extract')) {
        return line.trim();
      }
    }
    
    return 'Extract information that matches what the user is looking for';
  }
  
  private async generatePatternsFromScratch(context: ResearchContext): Promise<void> {
    const samples = context.ragResults.chunks.slice(0, 3);
    
    const prompt = `RESPOND WITH ONLY JSON!

Query: "${context.query}"
Domain: ${context.understanding.domain}

Sample: "${samples[0]?.text.substring(0, 200) || 'No data'}..."

What to find? Create simple extraction rules.

JSON format:
[{
  "description": "relevant data points",
  "extractionStrategy": "Find hours, minutes, performance metrics",
  "confidence": 0.8
}]

ONLY JSON!`;

    try {
      const response = await this.llm(prompt);
      const strategies = this.parseJSON(response);
      
      if (Array.isArray(strategies)) {
        context.patterns = strategies.map(s => ({
          description: s.description || '',
          examples: s.examples || [],
          extractionStrategy: s.extractionStrategy || '',
          confidence: s.confidence || 0.5
        }));
        
        // Don't overwrite the full LLM response reasoning
        console.log(`✅ Generated ${strategies.length} extraction strategies`);
      }
      
    } catch (error) {
      console.error('❌ Failed to generate patterns:', error);
      this.setReasoning('Failed to generate extraction patterns');
    }
  }
  
  private async refinePatterns(context: ResearchContext): Promise<void> {
    const prompt = `Refine these extraction strategies based on the user's specific needs:

User query: "${context.query}"
Intent: ${context.understanding.intent}
Current patterns: ${JSON.stringify(context.patterns, null, 2)}

Improve the patterns to:
1. Be more specific to what the user is looking for
2. Handle the data quality issues identified
3. Extract exactly what's needed for the query

Return refined JSON array with same structure.`;

    try {
      const response = await this.llm(prompt);
      const refined = this.parseJSON(response);
      
      if (Array.isArray(refined)) {
        context.patterns = refined.map(s => ({
          description: s.description || '',
          examples: s.examples || [],
          extractionStrategy: s.extractionStrategy || '',
          confidence: s.confidence || 0.5
        }));
        
        // Don't overwrite the full LLM response reasoning
        console.log(`✅ Refined ${refined.length} extraction strategies`);
      }
      
    } catch (error) {
      console.error('❌ Failed to refine patterns:', error);
      this.setReasoning('Using original patterns without refinement');
    }
  }
  
  private parseJSON(text: string): any {
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        return JSON.parse(match[0]);
      }
      throw new Error('Invalid JSON');
    }
  }
}