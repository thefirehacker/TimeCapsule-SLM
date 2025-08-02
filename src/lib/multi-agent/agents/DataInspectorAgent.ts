/**
 * Data Inspector Agent
 * 
 * Analyzes RAG chunks to understand data structure and quality.
 * Identifies patterns, formats, and potential extraction challenges.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

export class DataInspectorAgent extends BaseAgent {
  readonly name = 'DataInspector';
  readonly description = 'Analyzes RAG chunks to understand data structure and quality';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🔎 DataInspector: Analyzing ${context.ragResults.chunks.length} chunks`);
    
    if (context.ragResults.chunks.length === 0) {
      this.setReasoning('No chunks to analyze');
      return context;
    }
    
    // Use LLM to understand the data
    await this.inspectWithLLM(context);
    
    return context;
  }
  
  private async inspectWithLLM(context: ResearchContext): Promise<void> {
    const samples = context.ragResults.chunks.slice(0, 3); // First 3 chunks
    
    const prompt = `Look at this data and tell me what kind of information it contains.

User is looking for: "${context.query}"

Data samples:
${samples.map((chunk, i) => `
Sample ${i + 1}:
${chunk.text}
`).join('\n---\n')}

Questions to answer:
1. What type of data is this? (blog post, documentation, report, etc)
2. What information relevant to the user's query do you see?
3. Are there speed run times? (like "Run 1: 3.5 hours")
4. Are there performance metrics? (like "221k tokens/sec")
5. How should we extract the relevant information?

Be specific about what you find.`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Data inspection:`, response.substring(0, 300));
      
      // Update context with insights
      this.updateContextFromInspection(context, response);
      
      this.setReasoning(`LLM inspection complete: ${response.substring(0, 100)}...`);
      
    } catch (error) {
      console.error('❌ LLM inspection failed:', error);
      this.setReasoning('Failed to inspect data with LLM');
    }
  }
  
  private updateContextFromInspection(context: ResearchContext, response: string) {
    const lower = response.toLowerCase();
    
    // Update patterns based on what LLM found
    context.patterns = [];
    
    if (lower.includes('speed run') && lower.includes('time')) {
      context.patterns.push({
        description: 'Speed run completion times',
        examples: ['Run 1: 3.5 hours', 'completed in 45 minutes'],
        extractionStrategy: 'Look for run numbers followed by time durations',
        confidence: 0.9
      });
    }
    
    if (lower.includes('performance') && lower.includes('tokens')) {
      context.patterns.push({
        description: 'Performance metrics (to be filtered out)',
        examples: ['221k tokens/sec'],
        extractionStrategy: 'Identify but exclude throughput metrics',
        confidence: 0.8
      });
    }
    
    console.log(`✅ Generated ${context.patterns.length} patterns from inspection`);
  }
  
  private async processWithLLM(context: ResearchContext): Promise<void> {
    // Original LLM-based processing (kept for reference)
    const samples = context.ragResults.chunks.slice(0, 5);
    
    const prompt = `Analyze these data chunks to understand their structure and content:

${samples.map((chunk, i) => `
Chunk ${i + 1} (Similarity: ${chunk.similarity?.toFixed(2) || 'N/A'}):
Source: ${chunk.source}
Content:
"${chunk.text}"
`).join('\n---\n')}

User is looking for: "${context.query}"

Analyze and identify:
1. Data format (prose, table, list, structured, etc.)
2. Quality issues (repeated text, formatting problems, truncation)
3. Patterns you observe (how information is structured)
4. Relevant information related to the query
5. Extraction challenges

Return JSON with structure:
{
  "dataFormat": "description of format",
  "qualityIssues": ["list of issues"],
  "patterns": [
    {
      "description": "pattern description",
      "examples": ["example 1", "example 2"],
      "extractionStrategy": "how to extract this pattern",
      "confidence": 0.9
    }
  ],
  "relevantContent": ["what's relevant to the query"],
  "challenges": ["extraction challenges"]
}`;

    try {
      const response = await this.llm(prompt);
      const analysis = this.parseJSON(response);
      
      // Update context with patterns
      if (analysis.patterns && Array.isArray(analysis.patterns)) {
        context.patterns = analysis.patterns.map((p: any) => ({
          description: p.description || '',
          examples: p.examples || [],
          extractionStrategy: p.extractionStrategy || '',
          confidence: p.confidence || 0.5
        }));
      }
      
      this.setReasoning(
        `Found ${analysis.patterns?.length || 0} patterns. ` +
        `Format: ${analysis.dataFormat}. ` +
        `Issues: ${analysis.qualityIssues?.join(', ') || 'none'}`
      );
      
      console.log(`✅ Data inspection complete:`, {
        format: analysis.dataFormat,
        patterns: context.patterns.length,
        issues: analysis.qualityIssues?.length || 0
      });
      
    } catch (error) {
      console.error('❌ Failed to inspect data:', error);
      this.setReasoning('Failed to analyze data structure');
    }
  }
  
  private parseJSON(text: string): any {
    try {
      return JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
      throw new Error('Invalid JSON');
    }
  }
}