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
    // Count web sources vs RAG chunks
    const webSources = context.ragResults.chunks.filter(chunk => 
      chunk.metadata?.source?.startsWith('http') || chunk.id.startsWith('web_')
    ).length;
    const ragChunks = context.ragResults.chunks.length - webSources;
    
    console.log(`🔎 DataInspector: Analyzing ${context.ragResults.chunks.length} sources (${ragChunks} RAG, ${webSources} Web)`);
    
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
    
    // Include source type information
    const samplesWithType = samples.map((chunk, i) => {
      const isWeb = chunk.metadata?.source?.startsWith('http') || chunk.id.startsWith('web_');
      return {
        chunk,
        sourceType: isWeb ? 'Web' : 'RAG',
        sourceName: isWeb ? chunk.metadata?.source : chunk.source
      };
    });
    
    const prompt = `User wants: "${context.query}"

I found this data:
${samplesWithType.map((item, i) => `
Source ${i + 1} (${item.sourceType}):
${item.chunk.text}
`).join('\n---\n')}

What type of information is this and what's relevant to the user's query?`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Data inspection:`, response.substring(0, 300));
      
      // Update context with insights
      this.updateContextFromInspection(context, response);
      
      // Store full response for thinking extraction
      this.setReasoning(response);
      
    } catch (error) {
      console.error('❌ LLM inspection failed:', error);
      this.setReasoning('Failed to inspect data with LLM');
    }
  }
  
  private updateContextFromInspection(context: ResearchContext, response: string) {
    // Let the LLM determine patterns based on the actual content
    context.patterns = [];
    
    // Extract patterns from LLM response
    try {
      // Try to find pattern descriptions in the response
      const patternMatches = response.match(/pattern[s]?[:]*([^.\n]+)/gi);
      const dataTypeMatches = response.match(/data type[s]?[:]*([^.\n]+)/gi);
      const formatMatches = response.match(/format[s]?[:]*([^.\n]+)/gi);
      
      if (patternMatches || dataTypeMatches || formatMatches) {
        // Create generic patterns based on what LLM found
        context.patterns.push({
          description: 'Data patterns identified by analysis',
          examples: [],
          extractionStrategy: 'Extract based on identified format and structure',
          confidence: 0.8
        });
      }
    } catch (e) {
      console.log('Could not extract specific patterns from LLM response');
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