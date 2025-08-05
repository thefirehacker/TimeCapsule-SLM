/**
 * Data Inspector Agent
 * 
 * Analyzes RAG chunks to understand data structure and quality.
 * Identifies patterns, formats, and potential extraction challenges.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext, DocumentAnalysis, SingleDocumentAnalysis, EntityReference, DocumentRelationship } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';
import { parseJsonWithResilience } from '../../../components/DeepResearch/hooks/responseCompletion';

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

Please analyze this multi-document scenario and answer these CRITICAL questions:

1. **DOCUMENT TYPES**: What type is each document? (CV/Resume, Blog, Research Paper, etc.)

2. **PRIMARY ENTITIES**: Who is the main person/subject in each document? (Extract the actual names from the content)

3. **DOCUMENT RELEVANCE**: For the specific query "${context.query}", which documents are relevant and which should be ignored?
   - Only process documents that directly relate to what the user is asking about
   - If the query mentions a specific person's work, ignore documents about other people
   - Documents about different people should NOT be combined for person-specific queries

4. **ENTITY OWNERSHIP**: What achievements, skills, or facts belong to which specific person? Never mix these up!

5. **PROCESSING STRATEGY**: Based on document relevance, which documents should we process and which should we filter out?

6. **ATTRIBUTION RULES**: How do we ensure facts stay with the correct person and never get mixed up?

7. **EXPECTED OUTPUT FORMAT**: What format should the answer take based on the relevant documents only?

CRITICAL RULES:
- If query is about one person, ignore documents about other people
- Never combine achievements from different people
- Be explicit about which person each fact belongs to
- Filter irrelevant documents BEFORE processing`;

    try {
      const response = await this.llm(prompt);
      console.log(`🤖 Multi-document analysis:`, response.substring(0, 300));
      
      // Update context with multi-document insights
      await this.updateContextFromMultiDocumentInspection(context, response, documentGroups);
      
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
        agentSource: 'DataInspector',
        // 🔥 NEW: Preserve detailed semantic reasoning for next agents
        detailedReasoning: this.reasoning,  // Full LLM reasoning from DataInspector
        specificInsights: this.extractSpecificInsights(documentAnalysis, context.query), // Tyler-specific insights
        keyFindings: this.extractKeyFindings(documentAnalysis) // Important discoveries
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
      throw new Error(`Document analysis parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private async updateContextFromMultiDocumentInspection(context: ResearchContext, response: string, documentGroups: any[]): Promise<void> {
    try {
      const documentAnalysis = await this.parseMultiDocumentAnalysis(response, documentGroups, context);
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
      throw new Error(`Multi-document analysis parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async parseMultiDocumentAnalysis(response: string, documentGroups: any[], context: ResearchContext): Promise<DocumentAnalysis> {
    // Parse the multi-document analysis response with new relevance filtering
    const sections = {
      documentTypes: this.extractListSection(response, 'DOCUMENT TYPES'),
      primaryEntities: this.extractListSection(response, 'PRIMARY ENTITIES'),
      documentRelevance: this.extractListSection(response, 'DOCUMENT RELEVANCE'),
      entityOwnership: this.extractListSection(response, 'ENTITY OWNERSHIP'),
      processingStrategy: this.extractSection(response, 'PROCESSING STRATEGY'),
      attributionRules: this.extractListSection(response, 'ATTRIBUTION RULES'),
      expectedOutputFormat: this.extractSection(response, 'EXPECTED OUTPUT FORMAT')
    };

    // Build individual document analyses with relevance filtering
    const documents: SingleDocumentAnalysis[] = [];
    const relevantDocuments: any[] = [];
    
    for (let i = 0; i < documentGroups.length; i++) {
      const group = documentGroups[i];
      const docType = sections.documentTypes[i] || 'Unknown Document';
      const primaryEntity = sections.primaryEntities[i] || 'Unknown Entity';
      
      // Check if this document is relevant based on LLM analysis
      const relevanceText = sections.documentRelevance.join(' ').toLowerCase();
      const docNumber = i + 1;
      
      // Look for specific mentions of this document
      const docMentions = [
        `document ${docNumber}`,
        docType.toLowerCase(),
        primaryEntity.toLowerCase()
      ].filter(mention => mention.length > 2);
      
      let isRelevant = false;
      
      // Check if any mention of this document indicates relevance
      for (const mention of docMentions) {
        if (relevanceText.includes(mention)) {
          const context = relevanceText;
          // If the document is mentioned positively or as relevant
          if (context.includes(`${mention} is relevant`) || 
              context.includes(`only ${mention}`) ||
              context.includes(`${mention} should be processed`) ||
              (context.includes(mention) && !context.includes(`${mention} is irrelevant`) && 
               !context.includes(`${mention} is unrelated`) && 
               !context.includes(`ignore ${mention}`))) {
            isRelevant = true;
            break;
          }
        }
      }
      
      console.log(`🔍 Document ${docNumber} relevance check:`, {
        docType,
        primaryEntity,
        relevanceText: relevanceText.substring(0, 200),
        isRelevant,
        mentions: docMentions
      });
      
      if (!isRelevant) {
        console.log(`🚫 Filtering out irrelevant document: ${docType} (${primaryEntity})`);
        continue; // Skip this document
      }
      
      console.log(`✅ Processing relevant document: ${docType} (${primaryEntity})`);
      relevantDocuments.push(group);
      
      // Get sample content for LLM analysis
      const sampleContent = group.chunks.slice(0, 2).map((chunk: any) => chunk.text.substring(0, 300)).join('\n\n');
      
      // Use LLM to discover content areas based on actual content
      const contentAreas = await this.discoverContentAreas(docType, sampleContent);
      
      // Use LLM to discover entities based on actual content
      const keyEntities = await this.discoverEntities(sections.entityOwnership, i, sampleContent);
      
      // Use LLM to discover document role based on query and content
      const role = await this.discoverDocumentRole(i, documentGroups.length, context.query, sampleContent);
      
      documents.push({
        documentId: group.documentId,
        documentName: group.documentId,
        documentType: docType,
        primaryEntity: primaryEntity,
        structure: [docType.toLowerCase() + ' sections'],
        contentAreas: contentAreas,
        keyEntities: keyEntities,
        role: role
      });
    }
    
    console.log(`📊 Document filtering: ${documentGroups.length} total → ${documents.length} relevant`);

    // Build minimal relationships - only connect documents if explicitly needed
    const relationships: DocumentRelationship[] = documents.length > 1 ? 
      this.buildMinimalRelationships(documents, context.query) : [];

    return {
      documentType: 'Multi-Document Analysis',
      structure: documents.map(d => d.documentType),
      contentAreas: documents.flatMap(d => d.contentAreas),
      queryIntent: `Extract information from ${documents.length} relevant documents`,
      extractionStrategy: 'Extract from each relevant document separately with proper attribution',
      expectedOutputFormat: sections.expectedOutputFormat || 'structured synthesis',
      documents: documents,
      relationships: relationships,
      crossDocumentStrategy: 'Process each document independently to prevent cross-contamination'
    };
  }

  private async discoverContentAreas(docType: string, sampleContent: string): Promise<string[]> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded assumptions about document types
    // Let LLM discover content areas based on actual document content
    
    const prompt = `Analyze this document type and sample content to discover its actual structure:

DOCUMENT TYPE: ${docType}
SAMPLE CONTENT: ${sampleContent}

What are the main content areas/sections that this document actually contains?
List the specific types of information present, based on what you see in the content.

No assumptions - only describe what's actually there.
Return as comma-separated list.`;

    try {
      const response = await this.llm(prompt);
      const areas = response.split(',').map(area => area.trim()).filter(area => area.length > 0);
      return areas.length > 0 ? areas : ['general information'];
    } catch (error) {
      console.warn('Failed to discover content areas, using fallback');
      return ['general information'];
    }
  }

  private async discoverEntities(keyEntitiesList: string[], docIndex: number, docContent: string): Promise<EntityReference[]> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded entity type assumptions
    // Let LLM discover entities based on actual document content
    
    const relevantEntities = keyEntitiesList.filter((_, i) => Math.floor(i / 2) === docIndex);
    if (relevantEntities.length === 0) return [];
    
    const prompt = `Analyze these entities in the context of this document content:

ENTITIES MENTIONED: ${relevantEntities.join(', ')}
DOCUMENT CONTENT: ${docContent.substring(0, 500)}

For each entity, determine:
1. What type of entity is it? (person, company, project, concept, etc.)
2. What is their relationship to this document? (author, subject, mentioned, etc.)
3. What context describes their role?

Return as JSON array:
[{"name": "entity", "type": "person|company|project|concept", "context": "role description", "isOwner": true/false}]`;

    try {
      const response = await this.llm(prompt);
      const entities = parseJsonWithResilience(response);
      return Array.isArray(entities) ? entities : [];
    } catch (error) {
      console.error('❌ Failed to discover entities:', error);
      throw new Error(`Entity discovery failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async discoverDocumentRole(docIndex: number, totalDocs: number, query: string, docContent: string): Promise<'source' | 'target' | 'reference'> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded role assumptions
    // Let LLM determine document role based on query and content
    
    const prompt = `Analyze this document's role in answering the user query:

USER QUERY: ${query}
DOCUMENT CONTENT: ${docContent.substring(0, 300)}
DOCUMENT POSITION: ${docIndex + 1} of ${totalDocs}

What role does this document play in answering the query?
- "source": Contains information/methods to be used
- "target": About the person/entity who needs help
- "reference": Supporting/background information

Return just the role: source, target, or reference`;

    try {
      const response = await this.llm(prompt);
      const role = response.trim().toLowerCase();
      if (['source', 'target', 'reference'].includes(role)) {
        return role as 'source' | 'target' | 'reference';
      }
      return 'reference';
    } catch (error) {
      console.warn('Failed to discover document role, using fallback');
      return 'reference';
    }
  }

  private buildMinimalRelationships(documents: SingleDocumentAnalysis[], query: string): DocumentRelationship[] {
    // Only create relationships if query explicitly requires cross-document analysis
    const relationships: DocumentRelationship[] = [];
    
    // Check if query asks for comparison or combination
    const queryLower = query.toLowerCase();
    const needsComparison = queryLower.includes('compare') || queryLower.includes('vs') || 
                           queryLower.includes('difference') || queryLower.includes('similar');
    
    if (needsComparison && documents.length === 2) {
      relationships.push({
        type: 'comparison',
        sourceDoc: documents[0].documentId,
        targetDoc: documents[1].documentId,
        description: `Compare ${documents[0].documentType} with ${documents[1].documentType}`
      });
    }
    
    // Otherwise, keep documents independent to prevent contamination
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
    // Try multiple patterns to find the section content
    const patterns = [
      // Standard format: **SECTION**: content
      new RegExp(`\\*\\*${sectionName}\\*\\*:?\\s*([^\\*]+)`, 'i'),
      // Natural format: For SECTION: content  
      new RegExp(`For ${sectionName}:?\\s*([^\\n]{50,}?)(?:\\n\\n|$)`, 'i'),
      // Natural format: SECTION: content
      new RegExp(`${sectionName}:?\\s*([^\\n]{50,}?)(?:\\n\\n|$)`, 'i')
    ];
    
    let content = '';
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]?.trim().length > 10) {
        content = match[1].trim();
        break;
      }
    }
    
    if (!content) {
      console.warn(`❌ Could not extract section: ${sectionName}`);
      return [];
    }
    
    // Split content into items and clean up
    const sentences = content.split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 5);
    
    // For document types, look for "Document X is a..."
    if (sectionName.includes('DOCUMENT TYPES')) {
      const docTypes: string[] = [];
      for (let i = 1; i <= 5; i++) { // Support up to 5 documents
        const docMatch = content.match(new RegExp(`Document ${i} is (?:a |an )?(\\w+(?:\\s+\\w+)*)`, 'i'));
        if (docMatch) {
          docTypes.push(docMatch[1].trim());
        }
      }
      if (docTypes.length > 0) return docTypes;
    }
    
    // For entities, look for names in content
    if (sectionName.includes('ENTITIES')) {
      const entities: string[] = [];
      const namePattern = /([A-Z][a-z]+ [A-Z][a-z]+)/g;
      let match;
      while ((match = namePattern.exec(content)) !== null) {
        if (!entities.includes(match[1])) {
          entities.push(match[1]);
        }
      }
      if (entities.length > 0) return entities;
    }
    
    // For relevance, return sentences that mention documents
    if (sectionName.includes('RELEVANCE')) {
      const relevantSentences = sentences.filter(s => 
        s.includes('Document') || s.includes('relevant') || s.includes('irrelevant')
      );
      return relevantSentences.length > 0 ? relevantSentences : [content];
    }
    
    // Default: return cleaned sentences
    return sentences.length > 0 ? sentences : [content];
  }
  
  /**
   * 🔥 Extract specific semantic insights that must be preserved (person-specific understanding)
   */
  private extractSpecificInsights(documentAnalysis: any, query: string): string[] {
    const insights: string[] = [];
    const reasoning = this.reasoning.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Extract person-specific insights dynamically
    const personMatches = queryLower.match(/(\w+)'s\s+(\w+)/g);
    if (personMatches) {
      personMatches.forEach(match => {
        const [person, possession] = match.split("'s ");
        if (reasoning.includes(person.toLowerCase())) {
          insights.push(`CRITICAL: User wants ${person}'s personal ${possession}, not generic data`);
          insights.push(`FOCUS: ${person} has their own content documented`);
        }
      });
    }
    
    // Extract ownership patterns dynamically
    const ownershipPatterns = reasoning.match(/(\w+)'s (\w+)/g);
    if (ownershipPatterns) {
      ownershipPatterns.forEach(pattern => {
        insights.push(`DOCUMENT OWNERSHIP: This is ${pattern} with their own content`);
      });
    }
    
    // Extract ranking requirements
    const topNumbers = queryLower.match(/top\s+(\d+|three|five)/g);
    if (topNumbers) {
      insights.push(`RANKING REQUIRED: User wants ${topNumbers[0]} ranked items, not all data`);
    }
    
    // Extract content type patterns
    const contentTypes = reasoning.match(/(\w+)\s+(?:timing|data|metrics|achievements)/g);
    if (contentTypes) {
      contentTypes.forEach(type => {
        insights.push(`CONTENT TYPE: Document contains ${type} data and performance metrics`);
      });
    }
    
    return insights;
  }
  
  /**
   * 🔍 Extract key findings from document analysis that patterns should target
   */
  private extractKeyFindings(documentAnalysis: any): string[] {
    const findings: string[] = [];
    
    if (documentAnalysis?.contentAreas) {
      documentAnalysis.contentAreas.forEach((area: string) => {
        findings.push(`Document contains: ${area}`);
      });
    }
    
    if (documentAnalysis?.structure) {
      findings.push(`Document structure: ${documentAnalysis.structure.join(', ')}`);
    }
    
    if (documentAnalysis?.expectedOutputFormat) {
      findings.push(`Expected output format: ${documentAnalysis.expectedOutputFormat}`);
    }
    
    return findings;
  }
  
  // 🚨 REMOVED: Legacy hardcoded JSON processing
  // Universal Intelligence approach now uses natural language prompts with LLM-based discovery
}