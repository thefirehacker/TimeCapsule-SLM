/**
 * Data Inspector Agent
 * 
 * Analyzes RAG chunks to understand data structure and quality.
 * Identifies patterns, formats, and potential extraction challenges.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, DocumentAnalysis } from '../interfaces/Context';
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
    
    const prompt = `I need to intelligently analyze this document and understand how to help the user.

USER QUERY: "${context.query}"

DOCUMENT CONTENT SAMPLES:
${samplesWithType.map((item, i) => `
--- Source ${i + 1} (${item.sourceType}) ---
${item.chunk.text}
`).join('\n')}

Please analyze this intelligently and provide:

1. **DOCUMENT TYPE**: What type of document is this? (CV/Resume, Research Paper, Manual, Blog, etc.)

2. **DOCUMENT STRUCTURE**: What are the main sections/components in this document?

3. **KEY CONTENT AREAS**: What specific information does this document contain?

4. **QUERY-DOCUMENT INTENT**: Based on the user's query and document type, what should we focus on extracting?

5. **EXTRACTION STRATEGY**: How should we approach extracting information to answer the user's query?

6. **EXPECTED OUTPUT FORMAT**: What format should the final answer take? (List, comparison, explanation, etc.)

Provide specific, actionable insights that will guide intelligent extraction and synthesis.`;

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
    try {
      // Parse the structured analysis from LLM response
      const documentAnalysis = this.parseDocumentAnalysis(response);
      context.documentAnalysis = documentAnalysis;
      
      // Create adaptive patterns based on document analysis
      context.patterns = [];
      if (documentAnalysis) {
        context.patterns.push({
          description: `${documentAnalysis.documentType} extraction pattern`,
          examples: documentAnalysis.contentAreas,
          extractionStrategy: documentAnalysis.extractionStrategy,
          confidence: 0.9
        });
      }
      
      console.log(`📋 Document Analysis: ${documentAnalysis?.documentType} with ${documentAnalysis?.structure.length || 0} sections`);
      
    } catch (error) {
      console.error('❌ Error parsing document analysis:', error);
      // Fallback to basic analysis
      context.documentAnalysis = {
        documentType: 'Unknown',
        structure: ['content'],
        contentAreas: ['general information'],
        queryIntent: 'Extract relevant information',
        extractionStrategy: 'Extract based on query keywords',
        expectedOutputFormat: 'summary'
      };
      context.patterns = [];
    }
  }
  
  private parseDocumentAnalysis(response: string): DocumentAnalysis {
    // Parse the structured response sections
    const sections = {
      documentType: this.extractSection(response, 'DOCUMENT TYPE'),
      structure: this.extractListSection(response, 'DOCUMENT STRUCTURE'),
      contentAreas: this.extractListSection(response, 'KEY CONTENT AREAS'),
      queryIntent: this.extractSection(response, 'QUERY-DOCUMENT INTENT'),
      extractionStrategy: this.extractSection(response, 'EXTRACTION STRATEGY'),
      expectedOutputFormat: this.extractSection(response, 'EXPECTED OUTPUT FORMAT')
    };
    
    return {
      documentType: sections.documentType || 'Unknown Document',
      structure: sections.structure.length > 0 ? sections.structure : ['content'],
      contentAreas: sections.contentAreas.length > 0 ? sections.contentAreas : ['general information'],
      queryIntent: sections.queryIntent || 'Extract relevant information',
      extractionStrategy: sections.extractionStrategy || 'Extract based on query keywords',
      expectedOutputFormat: sections.expectedOutputFormat || 'summary'
    };
  }
  
  private extractSection(text: string, sectionName: string): string {
    const regex = new RegExp(`\\*\\*${sectionName}\\*\\*:?\\s*([^\\n\\*]+)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }
  
  private extractListSection(text: string, sectionName: string): string[] {
    const regex = new RegExp(`\\*\\*${sectionName}\\*\\*:?\\s*([^\\*]+)`, 'i');
    const match = text.match(regex);
    if (!match) return [];
    
    // Extract list items (lines starting with - or numbers)
    const content = match[1];
    const items = content.split('\n')
      .map(line => line.trim())
      .filter(line => line.match(/^[-•\d]/))
      .map(line => line.replace(/^[-•\d.\s]+/, '').trim())
      .filter(line => line.length > 0);
    
    return items.length > 0 ? items : [content.trim()];
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