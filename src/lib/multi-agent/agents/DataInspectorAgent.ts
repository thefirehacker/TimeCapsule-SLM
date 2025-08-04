/**
 * Data Inspector Agent
 * 
 * Analyzes RAG chunks to understand data structure and quality.
 * Identifies patterns, formats, and potential extraction challenges.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, DocumentAnalysis, SingleDocumentAnalysis, EntityReference, DocumentRelationship } from '../interfaces/Context';
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
    // Group chunks by document/source for multi-document analysis
    const documentGroups = this.groupChunksByDocument(context.ragResults.chunks);
    
    if (documentGroups.length > 1) {
      // Multi-document analysis
      await this.performMultiDocumentAnalysis(context, documentGroups);
    } else {
      // Single document analysis (existing logic)
      await this.performSingleDocumentAnalysis(context, documentGroups[0]);
    }
  }

  private groupChunksByDocument(chunks: any[]): any[] {
    const groups: Record<string, any[]> = {};
    
    chunks.forEach(chunk => {
      // Try to determine document identity from source, metadata, or content
      let docId = chunk.source;
      
      // If web source, use domain
      if (chunk.metadata?.source?.startsWith('http')) {
        try {
          const url = new URL(chunk.metadata.source);
          docId = url.hostname;
        } catch (e) {
          docId = chunk.metadata.source;
        }
      }
      
      // If chunk has document identifier
      if (chunk.sourceDocument) {
        docId = chunk.sourceDocument;
      }
      
      if (!groups[docId]) {
        groups[docId] = [];
      }
      groups[docId].push(chunk);
    });
    
    return Object.entries(groups).map(([docId, chunks]) => ({
      documentId: docId,
      chunks: chunks
    }));
  }

  private async performMultiDocumentAnalysis(context: ResearchContext, documentGroups: any[]): Promise<void> {
    console.log(`🔍 Multi-document analysis: ${documentGroups.length} documents detected`);
    
    const prompt = `I need to analyze multiple documents and understand their relationships to answer the user's query intelligently.

USER QUERY: "${context.query}"

DOCUMENTS DETECTED: ${documentGroups.length}

${documentGroups.map((group, i) => `
--- DOCUMENT ${i + 1}: ${group.documentId} ---
Sample content from ${group.chunks.length} chunks:
${group.chunks.slice(0, 2).map((chunk: any) => chunk.text.substring(0, 300)).join('\n\n')}
`).join('\n')}

Please analyze this multi-document scenario and provide:

1. **DOCUMENT TYPES**: What type is each document? (CV/Resume, Blog, Research Paper, etc.)

2. **PRIMARY ENTITIES**: Who are the main people/subjects in each document?

3. **KEY ENTITIES**: What people, companies, projects, achievements are mentioned in each document? Who owns what?

4. **DOCUMENT RELATIONSHIPS**: How do these documents relate to answering the user's query?

5. **CROSS-DOCUMENT STRATEGY**: How should we combine information from multiple documents to answer the query correctly?

6. **ATTRIBUTION RULES**: What rules should we follow to ensure facts are attributed to the correct entities?

7. **EXPECTED OUTPUT FORMAT**: How should the final answer be structured for this multi-document query?

CRITICAL: Ensure we never mix up achievements, skills, or facts between different people or entities.`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Multi-document analysis:`, response.substring(0, 300));
      
      // Update context with multi-document insights
      this.updateContextFromMultiDocumentInspection(context, response, documentGroups);
      
      // Store full response for thinking extraction
      this.setReasoning(response);
      
    } catch (error) {
      console.error('❌ Multi-document analysis failed:', error);
      this.setReasoning('Failed to analyze multiple documents');
    }
  }

  private async performSingleDocumentAnalysis(context: ResearchContext, documentGroup: any): Promise<void> {
    const samples = documentGroup.chunks.slice(0, 3);
    
    // Include source type information
    const samplesWithType = samples.map((chunk: any) => {
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
${samplesWithType.map((item: any, i: number) => `
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
      console.log(`🤖 Single document analysis:`, response.substring(0, 300));
      
      // Update context with insights
      this.updateContextFromInspection(context, response);
      
      // Store full response for thinking extraction
      this.setReasoning(response);
      
    } catch (error) {
      console.error('❌ Single document analysis failed:', error);
      this.setReasoning('Failed to inspect data with LLM');
    }
  }
  
  private updateContextFromInspection(context: ResearchContext, response: string) {
    try {
      // Parse the structured analysis from LLM response
      const documentAnalysis = this.parseDocumentAnalysis(response);
      context.documentAnalysis = documentAnalysis;
      
      // SHARE insights with other agents through shared knowledge base
      context.sharedKnowledge.documentInsights = {
        documentType: documentAnalysis?.documentType,
        structure: documentAnalysis?.structure,
        contentAreas: documentAnalysis?.contentAreas,
        queryIntent: documentAnalysis?.queryIntent,
        extractionStrategy: documentAnalysis?.extractionStrategy,
        expectedOutputFormat: documentAnalysis?.expectedOutputFormat,
        analysisTimestamp: Date.now(),
        agentSource: 'DataInspector'
      };
      
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
      console.log(`🔗 Shared insights with other agents: ${Object.keys(context.sharedKnowledge.documentInsights).length} insights`);
      
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
  
  private updateContextFromMultiDocumentInspection(context: ResearchContext, response: string, documentGroups: any[]): void {
    try {
      const documentAnalysis = this.parseMultiDocumentAnalysis(response, documentGroups);
      context.documentAnalysis = documentAnalysis;
      
      // Create adaptive patterns based on multi-document analysis
      context.patterns = [];
      if (documentAnalysis.documents) {
        documentAnalysis.documents.forEach(doc => {
          context.patterns.push({
            description: `${doc.documentType} extraction pattern for ${doc.primaryEntity}`,
            examples: doc.contentAreas,
            extractionStrategy: `Extract ${doc.contentAreas.join(', ')} from ${doc.documentName}`,
            confidence: 0.9
          });
        });
      }
      
      console.log(`📋 Multi-Document Analysis: ${documentAnalysis.documents?.length || 0} documents with ${documentAnalysis.relationships?.length || 0} relationships`);
      
    } catch (error) {
      console.error('❌ Error parsing multi-document analysis:', error);
      // Fallback to basic analysis
      context.documentAnalysis = {
        documentType: 'Multiple Documents',
        structure: ['mixed content'],
        contentAreas: ['general information'],
        queryIntent: 'Extract and combine information from multiple sources',
        extractionStrategy: 'Extract based on query keywords from each document separately',
        expectedOutputFormat: 'structured comparison'
      };
      context.patterns = [];
    }
  }

  private parseMultiDocumentAnalysis(response: string, documentGroups: any[]): DocumentAnalysis {
    // Parse the multi-document analysis response
    const sections = {
      documentTypes: this.extractListSection(response, 'DOCUMENT TYPES'),
      primaryEntities: this.extractListSection(response, 'PRIMARY ENTITIES'),
      keyEntities: this.extractListSection(response, 'KEY ENTITIES'),
      relationships: this.extractListSection(response, 'DOCUMENT RELATIONSHIPS'),
      crossDocumentStrategy: this.extractSection(response, 'CROSS-DOCUMENT STRATEGY'),
      attributionRules: this.extractListSection(response, 'ATTRIBUTION RULES'),
      expectedOutputFormat: this.extractSection(response, 'EXPECTED OUTPUT FORMAT')
    };

    // Build individual document analyses
    const documents: SingleDocumentAnalysis[] = documentGroups.map((group, i) => {
      const docType = sections.documentTypes[i] || 'Unknown Document';
      const primaryEntity = sections.primaryEntities[i] || 'Unknown Entity';
      
      return {
        documentId: group.documentId,
        documentName: group.documentId,
        documentType: docType,
        primaryEntity: primaryEntity,
        structure: [docType.toLowerCase() + ' sections'],
        contentAreas: this.inferContentAreas(docType),
        keyEntities: this.parseEntities(sections.keyEntities, i),
        role: this.inferDocumentRole(i, documentGroups.length)
      };
    });

    // Build relationships
    const relationships: DocumentRelationship[] = this.parseRelationships(sections.relationships, documentGroups);

    return {
      documentType: 'Multi-Document Analysis',
      structure: documents.map(d => d.documentType),
      contentAreas: documents.flatMap(d => d.contentAreas),
      queryIntent: 'Combine information from multiple documents',
      extractionStrategy: sections.crossDocumentStrategy || 'Extract from each document with proper attribution',
      expectedOutputFormat: sections.expectedOutputFormat || 'structured synthesis',
      documents: documents,
      relationships: relationships,
      crossDocumentStrategy: sections.crossDocumentStrategy || 'Maintain entity attribution'
    };
  }

  private inferContentAreas(docType: string): string[] {
    const lowerType = docType.toLowerCase();
    if (lowerType.includes('cv') || lowerType.includes('resume')) {
      return ['skills', 'experience', 'projects', 'education'];
    }
    if (lowerType.includes('blog') || lowerType.includes('article')) {
      return ['methods', 'results', 'techniques', 'insights'];
    }
    if (lowerType.includes('research') || lowerType.includes('paper')) {
      return ['methodology', 'results', 'conclusions', 'data'];
    }
    return ['general information'];
  }

  private parseEntities(keyEntitiesList: string[], docIndex: number): EntityReference[] {
    // Simple parsing - in a real implementation, this would be more sophisticated
    const docEntities = keyEntitiesList.filter((_, i) => i % 2 === docIndex); // Alternate between docs
    return docEntities.map(entity => ({
      name: entity.split(':')[0] || entity,
      type: 'person' as const,
      context: entity,
      isOwner: entity.toLowerCase().includes('owner') || entity.toLowerCase().includes('author')
    }));
  }

  private inferDocumentRole(index: number, totalDocs: number): 'source' | 'target' | 'reference' {
    if (totalDocs === 2) {
      return index === 0 ? 'target' : 'source'; // First doc is who we're helping, second is source of knowledge
    }
    return 'reference';
  }

  private parseRelationships(relationshipsList: string[], documentGroups: any[]): DocumentRelationship[] {
    // Build relationships based on the analysis
    const relationships: DocumentRelationship[] = [];
    
    if (documentGroups.length === 2) {
      relationships.push({
        type: 'tutorial',
        sourceDoc: documentGroups[1].documentId,
        targetDoc: documentGroups[0].documentId,
        description: 'Use methods from source document to create tutorial for target document entity'
      });
    }
    
    return relationships;
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