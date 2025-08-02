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
    const prompt = `Create extraction strategies for finding what the user wants.

User query: "${context.query}"
User wants: ${context.understanding.intent}
Data contains: ${context.patterns.map(p => p.description).join(', ')}

Create specific strategies for extraction:
1. What exactly should we look for?
2. What should we AVOID extracting?
3. How can we identify the right information?

For "speed runs", we want completion times, NOT performance metrics.
Be very specific.`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Strategy generation:`, response.substring(0, 300));
      
      // Store full response for thinking extraction
      this.setReasoning(response);
      
      // Convert LLM response to patterns
      this.updatePatternsFromStrategies(context, response);
      
    } catch (error) {
      console.error('❌ Failed to generate strategies:', error);
      // Keep existing patterns from DataInspector
      this.setReasoning('Using patterns from data inspection');
    }
  }
  
  private updatePatternsFromStrategies(context: ResearchContext, response: string) {
    const lower = response.toLowerCase();
    
    // Clear and rebuild patterns based on LLM strategies
    const patterns = [];
    
    // Always include a primary extraction strategy
    patterns.push({
      description: 'Primary extraction strategy',
      examples: this.extractExamples(response),
      extractionStrategy: this.extractStrategy(response),
      confidence: 0.9
    });
    
    // Add exclusion pattern if mentioned
    if (lower.includes('avoid') || lower.includes('not') || lower.includes('exclude')) {
      patterns.push({
        description: 'Items to exclude',
        examples: ['tokens/sec', 'throughput', 'performance metrics'],
        extractionStrategy: 'Identify these but do not include in results',
        confidence: 0.8
      });
    }
    
    context.patterns = patterns;
    this.setReasoning(`Generated ${patterns.length} extraction strategies from LLM`);
    console.log(`✅ Generated ${patterns.length} extraction strategies`);
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
    
    return examples.length > 0 ? examples : ['Run times', 'Speed run completions'];
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
  "description": "speed run times",
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
        
        this.setReasoning(`Generated ${strategies.length} extraction strategies from scratch`);
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
        
        this.setReasoning(`Refined ${refined.length} extraction strategies for better accuracy`);
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