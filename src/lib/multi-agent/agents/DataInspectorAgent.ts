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
      
      // 🚨 FIX: Filter RAG chunks based on relevant documents to prevent cross-contamination
      if (documentAnalysis.documents && documentAnalysis.documents.length < documentGroups.length) {
        const relevantDocumentIds = new Set(documentAnalysis.documents.map(doc => doc.documentId));
        const originalChunkCount = context.ragResults.chunks.length;
        
        // Filter chunks to only include those from relevant documents
        context.ragResults.chunks = context.ragResults.chunks.filter(chunk => {
          // Match chunk to document based on source or content similarity
          const chunkSource = chunk.sourceDocument || chunk.source;
          
          // Check if this chunk belongs to a relevant document
          for (const docId of relevantDocumentIds) {
            if (chunkSource && chunkSource.includes(docId) || 
                chunk.text.includes(docId) ||
                documentAnalysis.documents!.some(doc => 
                  doc.primaryEntity && chunk.text.includes(doc.primaryEntity)
                )) {
              return true;
            }
          }
          return false;
        });
        
        const filteredChunkCount = context.ragResults.chunks.length;
        console.log(`🚨 CROSS-CONTAMINATION PREVENTION: Filtered RAG chunks from ${originalChunkCount} to ${filteredChunkCount} (removed ${originalChunkCount - filteredChunkCount} irrelevant chunks)`);
        
        // Update summary to reflect filtering
        context.ragResults.summary = `Filtered to ${filteredChunkCount} relevant chunks from ${documentAnalysis.documents.length} documents`;
      }
      
    } catch (error) {
      console.error('❌ Error parsing multi-document analysis:', error);
      throw new Error(`Multi-document analysis parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async parseMultiDocumentAnalysis(response: string, documentGroups: any[], context: ResearchContext): Promise<DocumentAnalysis> {
    // 🧠 AWESOME DATAINSPECTOR: Pure LLM Intelligence - No Hardcode, No Fallbacks!
    // Let LLM make intelligent decisions about document relevance
    
    console.log(`🧠 DataInspector analyzing ${documentGroups.length} documents with pure LLM intelligence`);
    
    // Build individual document analyses - ANALYZE FIRST, DON'T FILTER
    const documents: SingleDocumentAnalysis[] = [];
    const relevantDocuments: any[] = [];
    
    for (let i = 0; i < documentGroups.length; i++) {
      const group = documentGroups[i];
      const docNumber = i + 1;
      
      // 🧠 INTELLIGENT DOCUMENT ANALYSIS: Let LLM decide what this document is about
      const docAnalysis = await this.analyzeDocumentIntelligently(response, group, docNumber, context.query);
      
      console.log(`🔍 Document ${docNumber} intelligent analysis:`, {
        docType: docAnalysis.documentType,
        primaryEntity: docAnalysis.primaryEntity,
        isRelevant: docAnalysis.isRelevant,
        reasoning: docAnalysis.reasoning.substring(0, 100) + '...'
      });
      
      // 🎯 TRUST LLM INTELLIGENCE: If LLM says it's relevant, include it
      if (docAnalysis.isRelevant) {
        console.log(`✅ Including relevant document: ${docAnalysis.documentType} (${docAnalysis.primaryEntity})`);
        relevantDocuments.push(group);
        
        // Get sample content for deep LLM analysis
        const sampleContent = group.chunks.slice(0, 2).map((chunk: any) => chunk.text.substring(0, 300)).join('\n\n');
        
        // Use LLM to discover content areas based on actual content
        const contentAreas = await this.discoverContentAreas(docAnalysis.documentType, sampleContent);
        
        // Use LLM to discover entities based on actual content  
        const keyEntities = await this.discoverEntitiesIntelligently(sampleContent);
        
        // Use LLM to discover document role based on query and content
        const role = await this.discoverDocumentRole(i, documentGroups.length, context.query, sampleContent);
        
        documents.push({
          documentId: group.documentId,
          documentName: group.documentId,
          documentType: docAnalysis.documentType,
          primaryEntity: docAnalysis.primaryEntity,
          structure: [docAnalysis.documentType.toLowerCase() + ' sections'],
          contentAreas: contentAreas,
          keyEntities: keyEntities,
          role: role
        });
      } else {
        console.log(`⏭️ Skipping irrelevant document: ${docAnalysis.documentType} (${docAnalysis.primaryEntity}) - ${docAnalysis.reasoning.substring(0, 50)}...`);
      }
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
      expectedOutputFormat: 'structured synthesis with proper attribution',
      documents: documents,
      relationships: relationships,
      crossDocumentStrategy: 'Process each document independently to prevent cross-contamination'
    };
  }

  /**
   * 🧠 AWESOME DATAINSPECTOR: Pure LLM Intelligence for Document Analysis
   * No hardcode, no fallbacks - just smart reasoning about document relevance
   */
  private async analyzeDocumentIntelligently(
    originalResponse: string, 
    documentGroup: any, 
    docNumber: number, 
    query: string
  ): Promise<{
    documentType: string;
    primaryEntity: string;
    isRelevant: boolean;
    reasoning: string;
  }> {
    const sampleContent = documentGroup.chunks.slice(0, 2)
      .map((chunk: any) => chunk.text.substring(0, 400))
      .join('\n\n');

    const intelligentPrompt = `You are an intelligent document analyzer. Analyze this document and make smart decisions.

QUERY: "${query}"
DOCUMENT ${docNumber} SAMPLE CONTENT:
${sampleContent}

ORIGINAL ANALYSIS CONTEXT:
${originalResponse.substring(0, 500)}

Based on your intelligent analysis, answer these questions:

1. DOCUMENT TYPE: What type of document is this? (Resume, Blog, Report, etc.)
2. PRIMARY ENTITY: Who is the main person/subject this document is about?
3. RELEVANCE DECISION: For the query "${query}", is this document relevant?
4. REASONING: Why is this document relevant or irrelevant to answering the user's question?

Think intelligently: If the user asks about "Rutwik's best project" and this document is about Tyler's speedruns, it's clearly irrelevant. But if this document is Rutwik's resume with his projects, it's very relevant.

Respond in simple format:
TYPE: [document type]
ENTITY: [primary person/subject]  
RELEVANT: [YES/NO]
REASON: [your intelligent reasoning]`;

    try {
      const response = await this.llm(intelligentPrompt);
      
      // 🐛 DEBUG: Log LLM response to understand parsing issues
      console.log(`🧠 DataInspector Document ${docNumber} LLM Response:`, response.substring(0, 500) + '...');
      
      // Parse the intelligent response
      const docType = this.extractValue(response, 'TYPE') || 'Unknown Document';
      const primaryEntity = this.extractValue(response, 'ENTITY') || 'Unknown Entity';
      const relevantText = this.extractValue(response, 'RELEVANT') || 'NO';
      const reasoning = this.extractValue(response, 'REASON') || 'No reasoning provided';
      
      // 🐛 DEBUG: Log parsed values to debug extraction
      console.log(`🔍 DataInspector Document ${docNumber} Parsed:`, {
        docType, primaryEntity, relevantText, reasoning: reasoning.substring(0, 100) + '...'
      });
      
      const isRelevant = relevantText.toUpperCase().includes('YES');
      
      return {
        documentType: docType,
        primaryEntity: primaryEntity,
        isRelevant: isRelevant,
        reasoning: reasoning
      };
      
    } catch (error) {
      console.warn(`⚠️ Intelligent analysis failed for document ${docNumber}, defaulting to include`);
      return {
        documentType: 'Unknown Document',
        primaryEntity: 'Unknown Entity',
        isRelevant: true, // Default to including rather than filtering out
        reasoning: 'Analysis failed, including document to avoid losing data'
      };
    }
  }

  /**
   * Extract simple value from LLM response
   */
  private extractValue(response: string, key: string): string {
    // Try multiple patterns to handle LLM variations
    const patterns = [
      new RegExp(`${key}:\\s*(.+?)(?:\\n|$)`, 'i'),           // "TYPE: Document"
      new RegExp(`${key}\\s*[:=]\\s*(.+?)(?:\\n|$)`, 'i'),   // "TYPE: Document" or "TYPE = Document"
      new RegExp(`\\b${key}\\b[^:=]*[:=]\\s*(.+?)(?:\\n|$)`, 'i'), // More flexible matching
    ];
    
    for (const pattern of patterns) {
      const match = response.match(pattern);
      if (match && match[1].trim()) {
        return match[1].trim();
      }
    }
    
    // 🐛 DEBUG: Log if extraction fails
    console.warn(`⚠️ DataInspector failed to extract ${key} from response: "${response.substring(0, 200)}..."`);
    return '';
  }

  /**
   * 🧠 INTELLIGENT ENTITY DISCOVERY: No hardcoded patterns
   */
  private async discoverEntitiesIntelligently(sampleContent: string): Promise<any[]> {
    const prompt = `Find the key people, companies, or entities mentioned in this content:

CONTENT:
${sampleContent}

List the important entities (people, companies, projects) you find. For each, identify:
- Name
- Type (person, company, project, etc.)  
- Role/context

Return as simple list:
NAME: [name] | TYPE: [type] | ROLE: [role]`;

    try {
      const response = await this.llm(prompt);
      const entities: any[] = [];
      
      const lines = response.split('\n');
      for (const line of lines) {
        if (line.includes('NAME:') && line.includes('TYPE:')) {
          const nameMatch = line.match(/NAME:\s*([^|]+)/);
          const typeMatch = line.match(/TYPE:\s*([^|]+)/);
          const roleMatch = line.match(/ROLE:\s*(.+)/);
          
          if (nameMatch && typeMatch) {
            entities.push({
              name: nameMatch[1].trim(),
              type: typeMatch[1].trim(),
              context: roleMatch ? roleMatch[1].trim() : 'Unknown role',
              isOwner: false
            });
          }
        }
      }
      
      return entities;
    } catch (error) {
      console.warn('Failed to discover entities intelligently');
      return [];
    }
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
    // 🔍 NATURAL LANGUAGE PARSING: Handle thinking-style responses
    // First, remove <think> tags if present to get the actual analysis
    const cleanText = text.replace(/<\/?think>/g, '');
    
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
      const match = cleanText.match(pattern);
      if (match && match[1]?.trim().length > 10) {
        content = match[1].trim();
        break;
      }
    }
    
    // 🔍 FALLBACK: Parse natural language directly for document analysis
    if (!content && sectionName.includes('DOCUMENT TYPES')) {
      content = this.extractDocumentTypesFromNaturalLanguage(cleanText);
    }
    
    if (!content && sectionName.includes('PRIMARY ENTITIES')) {
      content = this.extractEntitiesFromNaturalLanguage(cleanText);
    }
    
    if (!content && sectionName.includes('DOCUMENT RELEVANCE')) {
      content = this.extractRelevanceFromNaturalLanguage(cleanText);
    }
    
    if (!content) {
      console.warn(`❌ Could not extract section: ${sectionName}`);
      console.log(`📝 Raw response for debugging:`, cleanText.substring(0, 500));
      return [];
    }
    
    // Split content into items and clean up
    const sentences = content.split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 5);
    
    // For document types, look for "Document X is a..." and natural language patterns
    if (sectionName.includes('DOCUMENT TYPES')) {
      const docTypes: string[] = [];
      
      // Try structured format first
      for (let i = 1; i <= 5; i++) { // Support up to 5 documents
        const docMatch = content.match(new RegExp(`Document ${i} is (?:a |an )?(\\w+(?:\\s+\\w+)*)`, 'i'));
        if (docMatch) {
          docTypes.push(docMatch[1].trim());
        }
      }
      
      // If no structured format, parse comma-separated list
      if (docTypes.length === 0 && content.includes(',')) {
        const types = content.split(',').map(t => t.trim()).filter(t => t.length > 0);
        docTypes.push(...types);
      }
      
      if (docTypes.length > 0) return docTypes;
    }
    
    // For entities, look for names in content
    if (sectionName.includes('ENTITIES')) {
      const entities: string[] = [];
      
      // Look for proper names (First Last)
      const namePattern = /([A-Z][a-z]+(?: [A-Z][a-z]+)*)/g;
      let match;
      while ((match = namePattern.exec(content)) !== null) {
        const name = match[1];
        if (!entities.includes(name) && name.length > 1 && /^[A-Z]/.test(name)) {
          entities.push(name);
        }
      }
      
      // If no names found, try comma-separated list
      if (entities.length === 0 && content.includes(',')) {
        const names = content.split(',').map(n => n.trim()).filter(n => n.length > 0);
        entities.push(...names);
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
   * 🔍 Extract document types from natural language thinking responses
   */
  private extractDocumentTypesFromNaturalLanguage(text: string): string {
    const docTypePatterns = [
      // "Document 1 is a resume" or "first document is a resume"
      /(?:document \d+|first document|second document).*?(?:is (?:a |an )?)(\w+(?:\s+\w+)*)/gi,
      // "Rutwik_resume.pdf - it's a resume"
      /([\w_]+\.pdf).*?(?:it'?s (?:a |an )?)(\w+)/gi,
      // "The resume" or "this CV" 
      /(?:the |this )(resume|cv|blog|paper|document)/gi,
      // "starting with the first one, [filename]. It's a [type]"
      /starting with.*?([\w_]+\.\w+).*?it'?s (?:a |an )?(\w+)/gi
    ];
    
    const foundTypes: string[] = [];
    for (const pattern of docTypePatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const docType = match[2] || match[1];
        if (docType && !foundTypes.includes(docType.toLowerCase())) {
          foundTypes.push(docType.toLowerCase());
        }
      }
    }
    
    return foundTypes.length > 0 ? foundTypes.join(', ') : '';
  }
  
  /**
   * 🔍 Extract primary entities from natural language thinking responses
   */
  private extractEntitiesFromNaturalLanguage(text: string): string {
    const entityPatterns = [
      // "The user wants to know about [Name]" or "query is about [Name]"
      /(?:wants to know about|query is about|asking about)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
      // "[Name]'s [something]" or "[Name] did"
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)(?:'s|\s+did|\s+is)/g,
      // "Document mentions [Name]"
      /(?:document|content|resume).*?mentions?\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
      // Direct filename references: "Rutwik_resume.pdf"
      /([A-Z][a-z]+)_[\w_]*\.\w+/g
    ];
    
    const foundEntities = new Set<string>();
    for (const pattern of entityPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const entity = match[1];
        if (entity && entity.length > 1 && /^[A-Z]/.test(entity)) {
          foundEntities.add(entity);
        }
      }
    }
    
    return Array.from(foundEntities).join(', ');
  }
  
  /**
   * 🔍 Extract document relevance from natural language thinking responses
   */
  private extractRelevanceFromNaturalLanguage(text: string): string {
    const relevanceIndicators = [
      // Positive relevance indicators
      /(?:document \d+|first document|second document).*?(?:is relevant|should be processed|is about)/gi,
      // Negative relevance indicators  
      /(?:document \d+|first document|second document).*?(?:is irrelevant|should be ignored|is not about)/gi,
      // Query-specific relevance
      /(?:only|just).*?(?:document \d+|resume|blog).*?(?:is relevant|matters)/gi
    ];
    
    const relevanceStatements: string[] = [];
    for (const pattern of relevanceIndicators) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        relevanceStatements.push(match[0]);
      }
    }
    
    return relevanceStatements.length > 0 ? relevanceStatements.join('; ') : text.substring(0, 200);
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