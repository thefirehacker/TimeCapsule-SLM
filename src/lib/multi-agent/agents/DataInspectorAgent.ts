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
import { VectorStore } from '@/components/VectorStore/VectorStore';
import { AgentProgressCallback } from '../interfaces/AgentProgress';

export class DataInspectorAgent extends BaseAgent {
  readonly name = 'DataInspector';
  readonly description = 'Analyzes RAG chunks to understand data structure and quality';
  
  private llm: LLMFunction;
  protected progressCallback?: AgentProgressCallback;
  
  constructor(llm: LLMFunction, progressCallback?: AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }

  private getVectorStore(): VectorStore | null {
    // Try multiple methods to access VectorStore
    if (typeof window !== 'undefined') {
      if ((window as any).sharedVectorStore) {
        return (window as any).sharedVectorStore;
      }
      if ((window as any).getVectorStore) {
        try {
          return (window as any).getVectorStore();
        } catch (error) {
          console.warn('Failed to get VectorStore via getVectorStore():', error);
        }
      }
    }
    return null;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    // Report start of processing
    this.progressCallback?.onAgentProgress?.(this.name, 5, 'Initializing document analysis', 0, undefined);
    
    // 🔥 CRITICAL: Detect if we received document metadata instead of actual chunks
    const hasDocumentMetadata = context.ragResults.chunks.some(chunk => 
      chunk.sourceType === 'document' || chunk.text?.startsWith('Document metadata:')
    );
    
    if (hasDocumentMetadata) {
      console.log(`🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis`);
      this.progressCallback?.onAgentProgress?.(this.name, 10, 'Starting multi-document analysis', 0, undefined);
      await this.performDocumentMetadataAnalysis(context);
      
      // Report completion
      this.progressCallback?.onAgentComplete?.(this.name, {
        documentAnalysis: context.documentAnalysis,
        filteredChunks: context.ragResults.chunks.length
      });
      
      return context;
    }
    
    // Count web sources vs RAG chunks for regular chunk analysis
    const webSources = context.ragResults.chunks.filter(chunk => 
      (chunk.metadata?.source && chunk.metadata.source.startsWith('http')) || 
      (chunk.id && chunk.id.startsWith('web_'))
    ).length;
    const ragChunks = context.ragResults.chunks.length - webSources;
    
    console.log(`🔎 DataInspector: Analyzing ${context.ragResults.chunks.length} sources (${ragChunks} RAG, ${webSources} Web)`);
    
    if (context.ragResults.chunks.length === 0) {
      this.setReasoning('No chunks to analyze');
      
      // Report completion with no data
      this.progressCallback?.onAgentComplete?.(this.name, {
        message: 'No chunks to analyze',
        chunksAnalyzed: 0
      });
      
      return context;
    }
    
    // Extract numeric measurements from chunk text before LLM analysis
    this.extractMeasurementsFromChunks(context);
    
    // Use LLM to understand the data
    await this.inspectWithLLM(context);
    
    // Report completion
    this.progressCallback?.onAgentComplete?.(this.name, {
      documentAnalysis: context.documentAnalysis,
      chunksAnalyzed: context.ragResults.chunks.length,
      measurements: context.sharedKnowledge.documentInsights?.data?.length || 0
    });
    
    return context;
  }
  
  /**
   * Extract numeric measurements from chunk text (not LLM reasoning)
   * Stores raw numeric hits with context windows in sharedKnowledge
   */
  private extractMeasurementsFromChunks(context: ResearchContext): void {
    if (!context.sharedKnowledge) {
      context.sharedKnowledge = {
        documentInsights: {},
        extractionStrategies: {},
        discoveredPatterns: {},
        agentFindings: {}
      };
    }
    if (!context.sharedKnowledge.documentInsights) {
      context.sharedKnowledge.documentInsights = {};
    }
    
    const measurements: Array<{
      value: string;
      leftContext: string;
      rightContext: string;
      chunkId: string;
      sourceDocument?: string;
    }> = [];
    
    // 🎯 ZERO-HARDCODING: Analyze query to understand document source requirements
    const sourceRequired = this.extractSourceRequirement(context.query);
    console.log(`🔍 Query source analysis:`, { query: context.query, sourceRequired });
    
    // Process up to 8 chunks for measurement extraction
    const chunksToProcess = context.ragResults.chunks.slice(0, Math.min(8, context.ragResults.chunks.length));
    
    // Broad pattern to capture any numeric values - let PatternGenerator decide what's relevant
    const numericPattern = /(\d+(?:[.:]\d+)?(?:\s+\d{1,2})?|\d+)/g;
    
    for (const chunk of chunksToProcess) {
      const text = chunk.text || '';
      
      // 🎯 ZERO-HARDCODING: Filter by document source if query specifies one
      if (sourceRequired.sourceRequired && sourceRequired.sourceName) {
        const chunkSource = (chunk.sourceDocument || chunk.source || '').toLowerCase();
        const querySource = sourceRequired.sourceName.toLowerCase();
        
        // Check if chunk is from the requested source using semantic matching
        if (!this.isFromRequestedSource(chunkSource, querySource, text)) {
          console.log(`🔍 Skipping chunk from ${chunkSource} - query requests ${querySource}`);
          continue;
        }
      }
      
      let match: RegExpExecArray | null;
      
      // Reset regex state
      numericPattern.lastIndex = 0;
      
      while ((match = numericPattern.exec(text)) !== null) {
        const startIdx = match.index;
        const endIdx = startIdx + match[0].length;
        
        // Get larger context windows (approximately 50 chars each side for better pattern learning)
        const leftStart = Math.max(0, startIdx - 50);
        const rightEnd = Math.min(text.length, endIdx + 50);
        
        const leftContext = text.slice(leftStart, startIdx).trim();
        const rightContext = text.slice(endIdx, rightEnd).trim();
        
        // Strip wrapping punctuation from the value
        const cleanValue = match[0].replace(/^[^\d]+|[^\d]+$/g, '');
        
        // Store all measurements - let pattern learning decide relevance
        measurements.push({
          value: cleanValue,
          leftContext: leftContext.replace(/[[\](){}]/g, ''), // Strip brackets
          rightContext: rightContext.replace(/[[\](){}]/g, ''),
          chunkId: chunk.id,
          sourceDocument: chunk.sourceDocument || chunk.source
        });
      }
    }
    
    // Store measurements in sharedKnowledge for downstream agents
    console.log(`🔍 DEBUG: About to store ${measurements.length} measurements in shared context`);
    console.log(`🔍 DEBUG: Context structure:`, {
      hasSharedKnowledge: !!context.sharedKnowledge,
      hasDocumentInsights: !!context.sharedKnowledge?.documentInsights,
      existingMeasurements: context.sharedKnowledge?.documentInsights?.measurements?.length || 0
    });
    
    context.sharedKnowledge.documentInsights.measurements = measurements;
    
    // Verify storage worked
    console.log(`🔍 DEBUG: After storage:`, {
      storedCount: context.sharedKnowledge.documentInsights.measurements?.length || 0,
      sampleStored: context.sharedKnowledge.documentInsights.measurements?.slice(0, 2) || []
    });
    
    console.log(`📊 DataInspector: Extracted ${measurements.length} numeric measurements from document text`);
    if (measurements.length > 0) {
      console.log(`📊 Sample measurements:`, measurements.slice(0, 3).map(m => 
        `"${m.value}" (${m.leftContext}...${m.rightContext})`
      ));
    }
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
      
      // Update context with multi-document insights and get relevant documents
      const relevantDocuments = await this.updateContextFromMultiDocumentInspection(context, response, documentGroups);
      
      // 🎯 CRITICAL FIX: Extract query-relevant terms ONLY from relevant documents
      await this.extractQueryRelevantTerms(context, relevantDocuments);
      
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
      
      // 🎯 CRITICAL FIX: Extract query-relevant terms even for single document
      // Pass the single document group as an array for consistency
      await this.extractQueryRelevantTerms(context, [documentGroup]);
      
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
        specificInsights: this.extractSpecificInsights(documentAnalysis, context.query), // Entity-specific insights
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
  
  private async updateContextFromMultiDocumentInspection(context: ResearchContext, response: string, documentGroups: any[]): Promise<any[]> {
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
      
      // 🔥 SMART FILTERING: Only filter if we have many documents and analysis suggests some are irrelevant
      // For pre-sampled chunks from performDocumentMetadataAnalysis, we trust DataInspector's sampling
      const hasPreSampledChunks = context.ragResults.chunks.some(chunk => 
        chunk.metadata?.originalChunkId !== undefined
      );
      
      if (documentAnalysis.documents && documentAnalysis.documents.length < documentGroups.length) {
        const relevantDocumentIds = new Set(documentAnalysis.documents.map(doc => doc.documentId));
        const originalChunkCount = context.ragResults.chunks.length;
        
        // Filter chunks to only include those from relevant documents
        context.ragResults.chunks = context.ragResults.chunks.filter(chunk => {
          // Match chunk to document based on source or content similarity
          const chunkSource = chunk.sourceDocument || chunk.source;
          
          // Check if this chunk belongs to a relevant document
          for (const docId of relevantDocumentIds) {
            if (chunkSource && (chunkSource.includes(docId) || 
                chunk.text.includes(docId) ||
                documentAnalysis.documents!.some(doc => 
                  doc.primaryEntity && chunk.text.includes(doc.primaryEntity)
                ))) {
              return true;
            }
          }
          return false;
        });
        
        const filteredChunkCount = context.ragResults.chunks.length;
        console.log(`🚨 CROSS-CONTAMINATION PREVENTION: Filtered ${hasPreSampledChunks ? 'pre-sampled' : 'RAG'} chunks from ${originalChunkCount} to ${filteredChunkCount} (removed ${originalChunkCount - filteredChunkCount} irrelevant chunks)`);
        
        // Update summary to reflect filtering
        context.ragResults.summary = `Filtered to ${filteredChunkCount} relevant chunks from ${documentAnalysis.documents.length} documents`;
      } else if (hasPreSampledChunks) {
        console.log(`✅ DOCUMENT ANALYSIS: All ${documentGroups.length} documents deemed relevant - preserving ${context.ragResults.chunks.length} chunks (${hasPreSampledChunks ? 'pre-sampled' : 'original'})`);
      } else {
        console.log(`✅ DOCUMENT ANALYSIS: All ${documentGroups.length} documents deemed relevant - no filtering applied`);
      }
      
      // 🎯 Return relevant document groups for technical term extraction
      return documentAnalysis.relevantDocumentGroups || [];
      
    } catch (error) {
      console.error('❌ Error parsing multi-document analysis:', error);
      throw new Error(`Multi-document analysis parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async parseMultiDocumentAnalysis(_response: string, documentGroups: any[], context: ResearchContext): Promise<DocumentAnalysis> {
    // 🧠 AWESOME DATAINSPECTOR: Pure LLM Intelligence - No Hardcode, No Fallbacks!
    // Let LLM make intelligent decisions about document relevance
    
    console.log(`🧠 DataInspector analyzing ${documentGroups.length} documents with pure LLM intelligence`);
    
    // Build individual document analyses - ANALYZE FIRST, DON'T FILTER
    const documents: SingleDocumentAnalysis[] = [];
    const relevantDocuments: any[] = [];
    
    for (let i = 0; i < documentGroups.length; i++) {
      const group = documentGroups[i];
      const docNumber = i + 1;
      
      // Report progress for each document with timestamp and cumulative info
      const progress = 15 + (60 * i / documentGroups.length); // Progress from 15% to 75%
      const timestamp = new Date().toLocaleTimeString();
      const progressStage = `[${timestamp}] Step ${docNumber}/${documentGroups.length}: Analyzing ${group.documentId}`;
      this.progressCallback?.onAgentProgress?.(this.name, Math.round(progress), progressStage, i, documentGroups.length);
      
      // 🧠 INTELLIGENT DOCUMENT ANALYSIS: Let LLM decide what this document is about
      const docAnalysis = await this.analyzeDocumentIntelligently(group, docNumber, context.query);
      
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
        const includeTimestamp = new Date().toLocaleTimeString();
        this.progressCallback?.onAgentProgress?.(this.name, Math.round(progress + 5), `[${includeTimestamp}] ✅ Including: ${docAnalysis.primaryEntity}`, i + 1, documentGroups.length);
        
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
        const skipTimestamp = new Date().toLocaleTimeString();
        this.progressCallback?.onAgentProgress?.(this.name, Math.round(progress + 5), `[${skipTimestamp}] ⏭️ Skipping: ${docAnalysis.primaryEntity}`, i + 1, documentGroups.length);
      }
    }
    
    console.log(`📊 Document filtering: ${documentGroups.length} total → ${documents.length} relevant`);
    this.progressCallback?.onAgentProgress?.(this.name, 90, `Filtered ${documentGroups.length} documents → ${documents.length} relevant`, documentGroups.length, documentGroups.length);

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
      crossDocumentStrategy: 'Process each document independently to prevent cross-contamination',
      relevantDocumentGroups: relevantDocuments  // 🎯 Add relevant document groups for technical extraction
    };
  }

  /**
   * 🧠 AWESOME DATAINSPECTOR: Pure LLM Intelligence for Document Analysis
   * No hardcode, no fallbacks - just smart reasoning about document relevance
   */
  private async analyzeDocumentIntelligently(
    documentGroup: any, 
    docNumber: number, 
    query: string
  ): Promise<{
    documentType: string;
    primaryEntity: string;
    isRelevant: boolean;
    reasoning: string;
  }> {
    const sampleContent = documentGroup.chunks
      .map((chunk: any, idx: number) => `[CHUNK ${idx + 1}]:\n${chunk.text.substring(0, 800)}`)
      .join('\n\n---\n\n');
    
    // 🐛 DEBUG: Log the sample content to verify document content is available
    console.log(`🔍 DEBUG DataInspector Document ${docNumber} Sample Content:`, {
      chunksCount: documentGroup.chunks.length,
      sampleLength: sampleContent.length,
      firstChunkPreview: documentGroup.chunks[0]?.text?.substring(0, 200) + '...',
      hasActualContent: sampleContent.length > 100 && !sampleContent.includes('Please provide the content')
    });

    const intelligentPrompt = `You are an intelligent document analyzer. Perform comprehensive analysis to understand what this document contains.

DOCUMENT ${docNumber} SAMPLE CONTENT:
${sampleContent}

STEP 1: Comprehensive Document Analysis
Extract ALL information from this document:

TOPICS: List all topics, subjects, domains, and fields covered (broad and specific)
PEOPLE: List all people mentioned (authors, researchers, subjects, references)  
METHODS: List all techniques, algorithms, approaches, methodologies described
CONCEPTS: List all key ideas, principles, theories, frameworks discussed
DATA: List all datasets, experiments, results, metrics, findings mentioned

STEP 2: Document Classification
TYPE: [what kind of document this is]
MAIN_ENTITY: [primary person/organization/subject this document is about]

STEP 3: Semantic Entity-Query Alignment Analysis
USER_QUERY: "${query}"

🔍 CRITICAL: Analyze semantic alignment between document entities and query focus.

SEMANTIC RELEVANCE RULES:
1. **Entity Ownership Analysis**: If query asks about "X's work/projects/research", the document MUST be authored by or primarily about person X
2. **Attribution Matching**: A document about Person A's work is NOT relevant to queries about Person B's work, even if they work on similar topics
3. **Contextual Authority**: Consider who created, authored, or owns the content described in the document
4. **Subject vs Author Distinction**: A document ABOUT a topic is different from a document BY someone about that topic

QUERY FOCUS ANALYSIS:
- Extract the main subject/person the query is asking about
- Identify if the query is asking for someone's specific work/contributions
- Determine if query needs content BY a person vs ABOUT a topic

DOCUMENT OWNERSHIP ANALYSIS:
- Who is the primary author/creator of this document's content?
- Who does this document's work/research/projects belong to?
- What entities have ownership/attribution in this document?

CRITICAL ENTITY-QUERY ALIGNMENT:
Step 3: Zero-Hardcoding Semantic Validation
- Extract PRIMARY PERSON/ENTITY from query pattern analysis: "${query}"
- Extract PRIMARY PERSON/ENTITY this document belongs to or is authored by
- OWNERSHIP RULE: Documents about Entity A are NEVER relevant for queries about Entity B
- PATTERN RECOGNITION: Look for possessive patterns ("X's work", "from Y's blog", "by Z") to identify query entity
- DOCUMENT ENTITY: Identify who this document belongs to through authorship, name analysis, and content attribution

ENTITY OWNERSHIP VERIFICATION:
- Query targets entity: [extract entity from query using pattern recognition]
- Document belongs to entity: [extract document owner through content analysis]  
- Semantic match: [YES only if same entity, NO if different entities regardless of topic overlap]

RELEVANT: [YES only if entity ownership matches AND content aligns. NO for entity ownership mismatch]
REASON: [explain entity ownership analysis first: who query asks for vs who document is about, then content relevance]

Respond in exact format:
TYPE: [document type]
MAIN_ENTITY: [main subject]
RELEVANT: [YES/NO]
REASON: [detailed reasoning based on extracted content]`;

    try {
      // 🐛 DEBUG: Log the full prompt being sent to LLM
      console.log(`📤 DEBUG DataInspector Document ${docNumber} LLM Prompt:`, {
        promptLength: intelligentPrompt.length,
        containsDocumentContent: intelligentPrompt.includes('[CHUNK 1]'),
        contentSampleInPrompt: intelligentPrompt.substring(intelligentPrompt.indexOf('DOCUMENT SAMPLE CONTENT:'), intelligentPrompt.indexOf('DOCUMENT SAMPLE CONTENT:') + 300) + '...'
      });
      
      const response = await this.llm(intelligentPrompt);
      
      // 🐛 DEBUG: Log LLM response to understand parsing issues
      console.log(`🧠 DataInspector Document ${docNumber} LLM Response:`, response.substring(0, 500) + '...');
      
      // Parse the enhanced response
      const docType = this.extractValue(response, 'TYPE') || 'Unknown Document';
      const mainEntity = this.extractValue(response, 'MAIN_ENTITY') || 'Unknown Entity';
      const relevantText = this.extractValue(response, 'RELEVANT') || 'NO';
      const reasoning = this.extractValue(response, 'REASON') || 'No reasoning provided';
      
      // 🐛 DEBUG: Log parsed values to debug extraction
      console.log(`🔍 DataInspector Document ${docNumber} Parsed:`, {
        docType, mainEntity, relevantText, reasoning: reasoning.substring(0, 100) + '...'
      });
      
      // Direct relevance determination from comprehensive analysis
      const isRelevant = relevantText.toUpperCase().includes('YES');
      
      console.log(`🔍 COMPREHENSIVE ANALYSIS: Query="${query}", Entity="${mainEntity}" → Result: ${isRelevant}`);
      
      return {
        documentType: docType,
        primaryEntity: mainEntity,
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
   * Normalize key to handle common LLM typos (while preserving exact matching)
   */
  // @ts-ignore - Currently unused but kept for future LLM compatibility
  private normalizeKey(key: string): string {
    // Handle common typos from different LLM models
    const typoMap: { [key: string]: string } = {
      'RELLEVANT': 'RELEVANT',  // Gemma 3n 2b common typo
      'RELEVENT': 'RELEVANT',   // Other common misspelling
      'RELEVAN': 'RELEVANT',    // Truncated version
    };
    
    return typoMap[key.toUpperCase()] || key;
  }

  /**
   * Extract simple value from LLM response
   */
  private extractValue(response: string, key: string): string {
    // 🔥 FIX: Handle <think> tags from Qwen models
    let cleanResponse = response;
    
    // Remove <think> tags but preserve the content after them
    const thinkMatch = response.match(/<think>[\s\S]*?<\/think>\s*([\s\S]*)/i);
    if (thinkMatch) {
      cleanResponse = thinkMatch[1]; // Content after </think>
    }

    // 🚨 CRITICAL FIX: Clean markdown formatting that breaks parsing
    cleanResponse = this.cleanMarkdownFormatting(cleanResponse);
    
    // 🔥 ENHANCED: Try with original key first, then with typo-corrected variations
    const keysToTry = [key]; // Start with original key
    
    // Add potential typo corrections for common LLM mistakes
    if (key === 'RELEVANT') {
      // Look for common typos in the response
      if (/RELLEVANT\s*[:=]/i.test(cleanResponse)) {
        keysToTry.push('RELLEVANT');
      }
      if (/RELEVENT\s*[:=]/i.test(cleanResponse)) {
        keysToTry.push('RELEVENT');
      }
      if (/RELEVAN\s*[:=]/i.test(cleanResponse)) {
        keysToTry.push('RELEVAN');
      }
    }
    
    // Try multiple patterns for each key variation
    for (const keyVariation of keysToTry) {
      const patterns = [
        new RegExp(`${keyVariation}:\\s*(.+?)(?:\\n|$)`, 'i'),           // "TYPE: Document"
        new RegExp(`${keyVariation}\\s*[:=]\\s*(.+?)(?:\\n|$)`, 'i'),   // "TYPE: Document" or "TYPE = Document"  
        new RegExp(`\\b${keyVariation}\\b[^:=]*[:=]\\s*(.+?)(?:\\n|$)`, 'i'), // More flexible matching
        new RegExp(`\\*\\*${keyVariation}\\*\\*[^:=]*[:=]\\s*(.+?)(?:\\n|$)`, 'i'), // Markdown bold headers
        new RegExp(`${keyVariation}\\s*\\*\\*[^:=]*[:=]\\s*(.+?)(?:\\n|$)`, 'i'), // Mixed markdown
      ];
      
      for (const pattern of patterns) {
        const match = cleanResponse.match(pattern);
        if (match && match[1].trim()) {
          let value = match[1].trim();
          // Clean any remaining markdown from the extracted value
          value = this.cleanMarkdownFormatting(value);
          
          // Log successful typo correction for debugging
          if (keyVariation !== key) {
            console.log(`🔧 DataInspector: Fixed typo "${keyVariation}" → "${key}" for value: "${value}"`);
          }
          return value;
        }
      }
    }

    
    // 🔥 FALLBACK: For REASON specifically, try to extract from <think> content
    if (key === 'REASON') {
      const thinkContent = response.match(/<think>([\s\S]*?)<\/think>/i);
      if (thinkContent && thinkContent[1].trim()) {
        // Extract the reasoning from think content
        const reasoning = thinkContent[1].trim();
        console.log(`🧠 DataInspector extracted reasoning from <think>: "${reasoning.substring(0, 100)}..."`);
        return reasoning;
      }
    }
    
    // 🐛 DEBUG: Log if extraction fails
    console.warn(`⚠️ DataInspector failed to extract ${key} from response: "${response.substring(0, 200)}..."`);
    return '';
  }

  /**
   * 🚨 CRITICAL FIX: Clean markdown formatting that breaks text parsing
   */
  private cleanMarkdownFormatting(text: string): string {
    return text
      // Remove bold markdown
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      // Remove italic markdown
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]*)`/g, '$1')
      // Remove headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove strikethrough
      .replace(/~~(.*?)~~/g, '$1')
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      .trim();
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

  // @ts-ignore - Currently unused but kept for future entity discovery
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
    // 🔍 MODEL-AGNOSTIC PARSING: Handle both thinking and non-thinking models
    // Remove <think> tags if present (thinking models) or handle direct responses (non-thinking models)
    const cleanText = text.replace(/<\/?think>/gi, '').trim();
    
    // Try multiple patterns to find the section content - robust for different model response styles
    const patterns = [
      // Standard format: **SECTION**: content
      new RegExp(`\\*\\*${sectionName}\\*\\*:?\\s*([^\\*]+)`, 'i'),
      // Natural format: For SECTION: content  
      new RegExp(`For ${sectionName}:?\\s*([^\\n]{50,}?)(?:\\n\\n|$)`, 'i'),
      // Natural format: SECTION: content
      new RegExp(`${sectionName}:?\\s*([^\\n]{50,}?)(?:\\n\\n|$)`, 'i'),
      // Non-thinking model format: Direct section content
      new RegExp(`${sectionName}[:\\s]*([^\\n]+(?:\\n[^\\n]+)*)`, 'i')
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
      // "PersonName_documenttype.pdf - it's a document"
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
      // Direct filename references: "PersonName_document.pdf"
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
    // @ts-ignore - documentAnalysis parameter currently unused but kept for future enhancement
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
  
  /**
   * 🔥 CRITICAL: Handle document metadata by sampling actual chunks from VectorStore and performing multi-document analysis
   */
  private async performDocumentMetadataAnalysis(context: ResearchContext): Promise<void> {
    console.log(`🧠 DataInspector Magic: Starting multi-document sampling and filtering`);
    
    // Extract document metadata from the "chunks" (which are actually document metadata)
    const documentMetadata = context.ragResults.chunks.filter(chunk => 
      chunk.sourceType === 'document' || chunk.text?.startsWith('Document metadata:')
    );
    
    // Get actual document source names from metadata
    const documentSources = documentMetadata.map(doc => 
      doc.source || doc.metadata?.filename || doc.metadata?.source || (doc as any).title || 'Unknown Document'
    );
    
    console.log(`📋 Found ${documentMetadata.length} documents to analyze:`, documentSources);
    
    // 🔥 REAL VECTORSTORE INTEGRATION: Sample actual chunks from RxDB/IndexedDB
    const vectorStore = this.getVectorStore();
    if (!vectorStore) {
      console.warn(`⚠️ VectorStore not available, falling back to document metadata only`);
      // Keep the minimal metadata-only approach if VectorStore not available
      const documentGroups = documentMetadata.map((docMeta, index) => ({
        documentId: docMeta.metadata?.documentId || docMeta.id,
        chunks: [{
          id: docMeta.id,
          text: `Document: ${documentSources[index]} (metadata only - VectorStore unavailable)`,
          source: documentSources[index],
          similarity: 1.0,
          metadata: docMeta.metadata,
          sourceDocument: documentSources[index],
          sourceType: 'document' as const
        }]
      }));
      
      await this.performMultiDocumentAnalysis(context, documentGroups);
      return;
    }

    // 🔄 FIXED: Sample real chunks from ALL documents FIRST, then analyze with real content
    console.log(`🔍 Sampling real chunks from ${documentMetadata.length} documents for intelligent analysis`);
    this.progressCallback?.onAgentProgress?.(this.name, 15, `Sampling real chunks from ${documentMetadata.length} documents`, 0, documentMetadata.length);
    const documentGroups: Array<{
      documentId: string;
      chunks: Array<{
        id: string;
        text: string;
        source: string;
        similarity: number;
        metadata: any;
        sourceDocument: string;
        sourceType: 'rag' | 'document';
      }>;
    }> = [];
    
    // 🔄 FIXED: Sample chunks from ALL documents, let LLM decide relevance based on real content
    for (let i = 0; i < documentMetadata.length; i++) {
      const docMeta = documentMetadata[i];
      const documentId = docMeta.metadata?.documentId || docMeta.id;
      const documentSource = documentSources[i];
      
      console.log(`🔍 Sampling chunks from document ${i + 1}/${documentMetadata.length}: ${documentSource}`);
      
      try {
        // Get full document from VectorStore with all chunks
        const fullDocument = await vectorStore.getDocument(documentId);
        
        if (fullDocument && fullDocument.chunks && fullDocument.chunks.length > 0) {
          // Enhanced sampling: 30% of chunks or minimum 5 chunks (all if less than 5)
          const totalChunks = fullDocument.chunks.length;
          const chunksToSample = totalChunks <= 5 ? totalChunks : Math.max(5, Math.ceil(totalChunks * 0.3));
          const sampledChunks = [];
          
          if (chunksToSample >= totalChunks) {
            // Take all chunks if we need most/all of them
            sampledChunks.push(...fullDocument.chunks);
          } else if (chunksToSample === 1) {
            // Take the first chunk if only 1 needed
            sampledChunks.push(fullDocument.chunks[0]);
          } else {
            // Smart distribution: first + last + evenly distributed middle chunks
            const indices = new Set<number>();
            
            // Always include first chunk (title/header)
            indices.add(0);
            
            // Always include last chunk (conclusion/summary) if we have room
            if (chunksToSample > 1) {
              indices.add(totalChunks - 1);
            }
            
            // Fill remaining slots with evenly distributed chunks
            const remainingSlots = chunksToSample - indices.size;
            if (remainingSlots > 0) {
              const step = Math.floor((totalChunks - 2) / (remainingSlots + 1));
              for (let i = 1; i <= remainingSlots; i++) {
                const index = Math.min(step * i, totalChunks - 2);
                indices.add(index);
              }
            }
            
            // Convert to sorted array and sample chunks
            const sortedIndices = Array.from(indices).sort((a, b) => a - b);
            sampledChunks.push(...sortedIndices.map(i => fullDocument.chunks[i]));
          }
          
          // Convert sampled chunks to the expected format
          const formattedChunks = sampledChunks.map((chunk, idx) => ({
            id: chunk.id,
            text: chunk.content, // Real chunk content from VectorStore
            source: documentSource,
            similarity: 1.0,
            metadata: {
              ...docMeta.metadata,
              chunkIndex: idx,
              originalChunkId: chunk.id,
              startIndex: chunk.startIndex,
              endIndex: chunk.endIndex
            },
            sourceDocument: documentSource,
            sourceType: 'rag' as const // Use 'rag' as valid sourceType for ChunkData
          }));
          
          documentGroups.push({
            documentId: documentId,
            chunks: formattedChunks
          });
          
          console.log(`✅ Sampled ${formattedChunks.length} real chunks from "${documentSource}" (${fullDocument.chunks.length} total chunks)`);
        } else {
          console.warn(`⚠️ Document "${documentSource}" has no chunks available`);
          // Add minimal placeholder if document exists but has no chunks
          documentGroups.push({
            documentId: documentId,
            chunks: [{
              id: documentId,
              text: `Document: ${documentSource} (no chunks available)`,
              source: documentSource,
              similarity: 1.0,
              metadata: docMeta.metadata,
              sourceDocument: documentSource,
              sourceType: 'document' as const
            }]
          });
        }
      } catch (error) {
        console.error(`❌ Failed to sample chunks from document "${documentSource}":`, error);
        // Add error placeholder
        documentGroups.push({
          documentId: documentId,
          chunks: [{
            id: documentId,
            text: `Document: ${documentSource} (error sampling chunks: ${error})`,
            source: documentSource,
            similarity: 1.0,
            metadata: docMeta.metadata,
            sourceDocument: documentSource,
            sourceType: 'document' as const
          }]
        });
      }
    }
    
    console.log(`✅ Sampled chunks from ${documentGroups.length} documents with real content`);
    
    // 🔄 FIXED: Now analyze documents with REAL CONTENT, not metadata
    console.log(`🧠 Analyzing ${documentGroups.length} documents with real sampled content for intelligent relevance decisions`);
    await this.performMultiDocumentAnalysis(context, documentGroups);
    
    // Filter to keep only relevant documents after analysis
    const relevantDocIds = new Set<string>();
    if (context.documentAnalysis?.documents) {
      context.documentAnalysis.documents.forEach(doc => {
        relevantDocIds.add(doc.documentId);
      });
      console.log(`📊 Relevance filtering: ${relevantDocIds.size} relevant out of ${documentGroups.length} total documents`);
      
      // Keep only relevant document chunks
      const filteredDocumentGroups = documentGroups.filter(group => relevantDocIds.has(group.documentId));
      const allSampledChunks = filteredDocumentGroups.flatMap(group => group.chunks);
      console.log(`🔄 Replacing ${context.ragResults.chunks.length} document metadata with ${allSampledChunks.length} relevant chunks from intelligent analysis`);
      context.ragResults.chunks = allSampledChunks;
    } else {
      // If no analysis results, keep all chunks
      const allSampledChunks = documentGroups.flatMap(group => group.chunks);
      console.log(`🔄 No relevance filtering - keeping all ${allSampledChunks.length} sampled chunks`);
      context.ragResults.chunks = allSampledChunks;
    }
    
    // Update reasoning to reflect the FIXED approach
    const totalSampledChunks = context.ragResults.chunks.length;
    const relevantDocs = context.documentAnalysis?.documents?.length || 0;
    this.setReasoning(`🔄 **FIXED DataInspector: Real Content Analysis**

📋 **Document Discovery**: Found ${documentMetadata.length} documents in knowledge base
${documentSources.map((source, idx) => `- ${source} (${documentGroups[idx]?.chunks.length || 0} chunks sampled)`).join('\n')}

🔍 **Real Chunk Sampling**: Sampled actual content from VectorStore (30% chunks per document)
🧠 **Intelligent Analysis**: LLM analyzed REAL document content, not just filenames
📊 **Relevance Filtering**: ${relevantDocs} documents deemed relevant after content analysis
✅ **Final Result**: ${totalSampledChunks} chunks from relevant documents ready for PatternGenerator

🚀 **BUG FIXED**: Now analyzing real content instead of metadata-only chunks!`);
  }
  
  // 🚨 REMOVED: Legacy hardcoded JSON processing
  // Universal Intelligence approach now uses natural language prompts with LLM-based discovery

  /**
   * 🎯 INTELLIGENT: Extract query-relevant terms using query analysis (no hardcoding)
   */
  private async extractQueryRelevantTerms(context: ResearchContext, documentGroups: any[]): Promise<void> {
    try {
      const docType = documentGroups.length > 1 ? 'RELEVANT documents' : 'document';
      console.log(`🔬 DataInspector: Extracting query-relevant terms from ${documentGroups.length} ${docType} for: "${context.query}"`);
      
      // 🎯 INTELLIGENT: Build query-aware content sample  
      const contentSample = await this.buildQueryAwareContentSample(context, documentGroups);

      console.log(`🔍 Content sample for technical extraction (${contentSample.length} chars):`, contentSample.substring(0, 200) + '...');

      // 🎯 Check for improvement guidance from Master Orchestrator
      const improvementGuidance = (context.sharedKnowledge as any).agentGuidance?.DataInspector;
      
      // 🎯 INTELLIGENT: Create query-aware prompt
      const prompt = await this.buildQueryAwareExtractionPrompt(context, contentSample, improvementGuidance);

      const response = await this.llm(prompt);
      console.log(`🎯 Technical terms LLM response:`, response);
      
      // Parse the response and store in shared knowledge
      const documentInsights = this.parseQueryRelevantTermsResponse(response);
      console.log(`🔍 Parsed technical terms:`, documentInsights);
      
      // Store in shared knowledge for PlanningAgent to access
      if (!context.sharedKnowledge.documentInsights) {
        context.sharedKnowledge.documentInsights = {};
      }
      
      // Merge with existing insights
      Object.assign(context.sharedKnowledge.documentInsights, documentInsights);
      
      console.log(`✅ Document insights stored in context.sharedKnowledge:`, {
        methods: documentInsights.methods?.length || 0,
        concepts: documentInsights.concepts?.length || 0,
        people: documentInsights.people?.length || 0,
        data: documentInsights.data?.length || 0
      });
      
      // Detailed logging for debugging
      if (documentInsights.methods && documentInsights.methods.length > 0) {
        console.log(`📋 Extracted methods:`, documentInsights.methods);
      } else {
        console.warn(`⚠️ No methods extracted from document content`);
      }
      
    } catch (error) {
      console.error('❌ Failed to extract query-relevant terms:', error);
      // Don't fail the whole process - just set empty insights
      context.sharedKnowledge.documentInsights = {
        methods: [],
        concepts: [],
        people: [],
        data: []
      };
    }
  }

  /**
   * 🎯 INTELLIGENT: Parse query-relevant terms response from LLM
   */
  private parseQueryRelevantTermsResponse(response: string): any {
    const insights = {
      methods: [] as string[],
      concepts: [] as string[],
      people: [] as string[],
      data: [] as string[]
    };

    try {
      const lines = response.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim().toLowerCase();
        
        if (trimmed.startsWith('methods:')) {
          const terms = line.substring(line.indexOf(':') + 1).trim();
          console.log(`🔍 Parsing methods line: "${terms}"`);
          // Filter out error messages and "not found" responses
          if (terms && 
              terms !== 'none' && 
              terms.toLowerCase() !== 'none' &&
              !terms.toLowerCase().includes('no specific') &&
              !terms.toLowerCase().includes('not found') &&
              !terms.toLowerCase().includes('no relevant') &&
              !terms.toLowerCase().includes('[') &&  // Filter out bracketed error messages
              terms.length < 100) {  // Error messages tend to be long
            insights.methods = terms.split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0 && 
                       t.toLowerCase() !== 'none' &&
                       !t.toLowerCase().includes('no specific') &&
                       !t.toLowerCase().includes('not found'));
            console.log(`✅ Parsed methods:`, insights.methods);
          }
        } else if (trimmed.startsWith('concepts:')) {
          const terms = line.substring(line.indexOf(':') + 1).trim();
          console.log(`🔍 Parsing concepts line: "${terms}"`);
          if (terms && 
              terms !== 'none' && 
              terms.toLowerCase() !== 'none' &&
              !terms.toLowerCase().includes('no relevant') &&
              !terms.toLowerCase().includes('not found') &&
              !terms.toLowerCase().includes('[') &&
              terms.length < 100) {
            insights.concepts = terms.split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0 && 
                       t.toLowerCase() !== 'none' &&
                       !t.toLowerCase().includes('no relevant') &&
                       !t.toLowerCase().includes('not found'));
          }
        } else if (trimmed.startsWith('people:')) {
          const terms = line.substring(line.indexOf(':') + 1).trim();
          console.log(`🔍 Parsing people line: "${terms}"`);
          if (terms && 
              terms !== 'none' && 
              terms.toLowerCase() !== 'none' &&
              !terms.toLowerCase().includes('no specific') &&
              !terms.toLowerCase().includes('not found') &&
              !terms.toLowerCase().includes('[') &&
              terms.length < 100) {
            insights.people = terms.split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0 && 
                       t.toLowerCase() !== 'none' &&
                       !t.toLowerCase().includes('no specific') &&
                       !t.toLowerCase().includes('not found'));
          }
        } else if (trimmed.startsWith('data_types:') || trimmed.startsWith('data:')) {
          const terms = line.substring(line.indexOf(':') + 1).trim();
          console.log(`🔍 Parsing data line: "${terms}"`);
          if (terms && 
              terms !== 'none' && 
              terms.toLowerCase() !== 'none' &&
              !terms.toLowerCase().includes('no specific') &&
              !terms.toLowerCase().includes('not found') &&
              !terms.toLowerCase().includes('[') &&
              terms.length < 100) {
            insights.data = terms.split(',')
              .map(t => t.trim())
              .filter(t => t.length > 0 && 
                       t.toLowerCase() !== 'none' &&
                       !t.toLowerCase().includes('no specific') &&
                       !t.toLowerCase().includes('not found'));
          }
        }
      }
      
    } catch (error) {
      console.warn('⚠️ Failed to parse technical terms response, using defaults');
    }

    return insights;
  }

  /**
   * 🎯 INTELLIGENT: Build query-aware content sample prioritizing relevant content
   */
  private async buildQueryAwareContentSample(context: ResearchContext, documentGroups: any[]): Promise<string> {
    // First, analyze query to understand what to prioritize
    const queryAnalysis = await this.analyzeQueryForContentPrioritization(context.query);
    
    return documentGroups
      .map((group, i) => {
        // 🎯 CRITICAL FIX: Use 30% sampling or minimum 5 chunks as designed
        const totalChunks = group.chunks.length;
        const chunksToSample = totalChunks <= 5 ? totalChunks : Math.max(5, Math.ceil(totalChunks * 0.3));
        
        console.log(`📊 Document ${i + 1}: Sampling ${chunksToSample} of ${totalChunks} chunks (${Math.round(chunksToSample/totalChunks * 100)}%)`);
        
        // Intelligently select chunks based on query analysis
        const prioritizedChunks = this.prioritizeChunksForQuery(group.chunks, queryAnalysis);
        
        // Take the calculated number of chunks (30% or minimum 5)
        const chunks = prioritizedChunks.slice(0, chunksToSample)
          .map((chunk: any) => {
            // Adaptive chunk size - preserve more content for important chunks
            const chunkSize = this.calculateOptimalChunkSize(chunk, queryAnalysis);
            return chunk.text.substring(0, chunkSize);
          })
          .join('\n\n');
          
        const docName = group.documentId || group.source || `Document ${i + 1}`;
        return `--- DOCUMENT ${i + 1}: ${docName} ---\n${chunks}`;
      })
      .join('\n\n');
  }

  /**
   * 🎯 INTELLIGENT: Analyze query to determine content prioritization strategy
   */
  private async analyzeQueryForContentPrioritization(query: string): Promise<any> {
    const analysisPrompt = `/no_think

TASK: Analyze this query to determine what content should be prioritized when searching documents.

QUERY: "${query}"

Analyze what the user is asking for and determine:
1. What types of terms should be prioritized (algorithm names, people, concepts, data)?
2. What content patterns would likely contain the answer (method descriptions, performance comparisons, author information)?
3. What specific indicators should guide content selection?

RESPONSE FORMAT:
PRIORITY_TERMS: [types of terms to look for]
CONTENT_PATTERNS: [what content sections are most likely relevant]  
SEARCH_INDICATORS: [specific words/patterns that suggest relevant content]

Analyze the query intent:`;

    try {
      const response = await this.llm(analysisPrompt);
      return this.parseQueryAnalysis(response);
    } catch (error) {
      console.warn('⚠️ Query analysis failed, using basic prioritization');
      return {
        priorityTerms: ['methods', 'algorithms', 'techniques'],
        contentPatterns: ['method', 'algorithm', 'approach'],
        searchIndicators: ['method', 'algorithm', 'technique', 'approach']
      };
    }
  }

  /**
   * 🎯 INTELLIGENT: Parse query analysis response
   */
  private parseQueryAnalysis(response: string): any {
    const analysis = {
      priorityTerms: [],
      contentPatterns: [],
      searchIndicators: []
    };

    const lines = response.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes('priority_terms:')) {
        const terms = line.substring(line.indexOf(':') + 1).trim();
        (analysis as any).priorityTerms = terms.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
      } else if (line.toLowerCase().includes('content_patterns:')) {
        const patterns = line.substring(line.indexOf(':') + 1).trim();
        (analysis as any).contentPatterns = patterns.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
      } else if (line.toLowerCase().includes('search_indicators:')) {
        const indicators = line.substring(line.indexOf(':') + 1).trim();
        (analysis as any).searchIndicators = indicators.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
      }
    }

    return analysis;
  }

  /**
   * 🎯 INTELLIGENT: Prioritize chunks based on query analysis
   */
  private prioritizeChunksForQuery(chunks: any[], queryAnalysis: any): any[] {
    return chunks.sort((a, b) => {
      const scoreA = this.calculateChunkRelevanceScore(a, queryAnalysis);
      const scoreB = this.calculateChunkRelevanceScore(b, queryAnalysis);
      return scoreB - scoreA; // Higher score first
    });
  }

  /**
   * 🎯 INTELLIGENT: Calculate chunk relevance score based on query analysis
   */
  private calculateChunkRelevanceScore(chunk: any, queryAnalysis: any): number {
    const text = (chunk.text || '').toLowerCase();
    let score = 0;

    // Score based on search indicators
    queryAnalysis.searchIndicators?.forEach((indicator: string) => {
      if (text.includes(indicator)) {
        score += 2;
      }
    });

    // Score based on content patterns
    queryAnalysis.contentPatterns?.forEach((pattern: string) => {
      if (text.includes(pattern)) {
        score += 1;
      }
    });

    // Bonus for capitalized terms (likely method/algorithm names)
    const capitalizedTerms = text.match(/\b[A-Z][A-Z0-9]*\b/g) || [];
    score += capitalizedTerms.length * 0.5;

    return score;
  }

  /**
   * 🎯 INTELLIGENT: Calculate optimal chunk size based on importance
   */
  private calculateOptimalChunkSize(chunk: any, queryAnalysis: any): number {
    const baseSize = 600; // Increased from 400
    const maxSize = 1200;
    
    const relevanceScore = this.calculateChunkRelevanceScore(chunk, queryAnalysis);
    
    // Higher relevance chunks get more content preserved
    const sizeMultiplier = 1 + (relevanceScore * 0.2);
    return Math.min(Math.floor(baseSize * sizeMultiplier), maxSize);
  }

  /**
   * 🎯 INTELLIGENT: Build query-aware extraction prompt
   */
  private async buildQueryAwareExtractionPrompt(context: ResearchContext, contentSample: string, improvementGuidance?: string): Promise<string> {
    return `/no_think

TASK: Extract information from documents to answer the user's specific question.

USER QUERY: "${context.query}"

${improvementGuidance ? `IMPROVEMENT GUIDANCE: ${improvementGuidance}\n` : ''}

DOCUMENT CONTENT:
${contentSample.substring(0, 8000)}

INSTRUCTIONS:
Based on the user's query, determine what information they need and extract it from the document content.

QUERY ANALYSIS:
- What is the user asking for specifically?
- What type of information would best answer their question?
- What terms in the document content are most relevant to their query?

EXTRACTION STRATEGY:
- Focus on finding the most specific and relevant terms
- Look for proper nouns, technical terms, specific names
- Prioritize terms that directly relate to what the user is asking about
- Avoid generic terms when specific ones are available

🧠 INTELLIGENT DOCUMENT ANALYSIS:
If this appears to be a research paper introducing a new method:
- What is the MAIN METHOD or ALGORITHM being introduced?
- What is the paper's PRIMARY CONTRIBUTION?
- What method name appears in the title or is central to the paper?
- For queries about "best method", what method does this paper present as their solution?

OUTPUT FORMAT:
METHODS: [specific method names, algorithms, techniques if relevant to query]
CONCEPTS: [relevant concepts and ideas if needed for query]  
PEOPLE: [specific people names if relevant to query]
DATA_TYPES: [specific data, metrics, datasets if relevant to query]

CRITICAL RULES:
- Extract only terms that appear in the document content above
- Focus on what would best help answer the user's specific question
- Be precise - extract specific names over generic categories
- Use exact spelling as found in the text
- Extract entities that exist in the document AND relate to the query
- Source attribution: if document is from source X, then data in document belongs to X
- Always extract relevant terms from each category if they appear in the content

Extract the most relevant and specific terms for this query:`;
  }

  /**
   * 🎯 ZERO-HARDCODING: Check if chunk is from requested source using semantic matching
   */
  private isFromRequestedSource(chunkSource: string, querySource: string, chunkText: string): boolean {
    // Direct source name matching
    if (chunkSource.includes(querySource)) {
      return true;
    }
    
    // Content-based matching - look for the source name in the chunk text
    const queryWords = querySource.split(/\s+/);
    const textLower = chunkText.toLowerCase();
    
    // Check if the main source identifier appears in content
    for (const word of queryWords) {
      if (word.length > 2 && textLower.includes(word.toLowerCase())) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * 🎯 ZERO-HARDCODING: Extract document source requirements from query
   * Understands queries like "from Tyler's blog", "in X's work", etc.
   */
  private extractSourceRequirement(query: string): { sourceRequired: boolean; sourceName?: string; sourceType?: string } {
    // Pattern recognition for source specification (no hardcoding)
    const fromPattern = /\bfrom\s+([^'s]+(?:'s)?\s+\w+)/i;
    const possessivePattern = /\b([a-z]+)'s\s+(blog|work|post|article|paper|site)/i;
    const inPattern = /\bin\s+([^'s]+(?:'s)?\s+\w+)/i;
    
    let sourceName = undefined;
    let sourceType = undefined;
    
    // Check for "from X's Y" pattern
    const fromMatch = fromPattern.exec(query);
    if (fromMatch) {
      sourceName = fromMatch[1].trim();
      sourceType = 'from_source';
    }
    
    // Check for "X's Y" pattern  
    const possessiveMatch = possessivePattern.exec(query);
    if (possessiveMatch) {
      sourceName = possessiveMatch[1];
      sourceType = possessiveMatch[2];
    }
    
    // Check for "in X's Y" pattern
    const inMatch = inPattern.exec(query);
    if (inMatch) {
      sourceName = inMatch[1].trim();
      sourceType = 'in_source';
    }
    
    return {
      sourceRequired: !!(sourceName),
      sourceName,
      sourceType
    };
  }
}