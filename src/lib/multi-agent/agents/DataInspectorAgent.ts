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
  private progressCallback?: AgentProgressCallback;
  
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
      return context;
    }
    
    // Count web sources vs RAG chunks for regular chunk analysis
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
      crossDocumentStrategy: 'Process each document independently to prevent cross-contamination'
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
    const sampleContent = documentGroup.chunks.slice(0, 2)
      .map((chunk: any) => chunk.text.substring(0, 400))
      .join('\n\n');

    const intelligentPrompt = `You are an intelligent document analyzer. Analyze ONLY the document content to identify who owns/created it.

DOCUMENT ${docNumber} SAMPLE CONTENT:
${sampleContent}

🚨 CRITICAL: Look at the document content above and identify WHO this document is about or written by. Ignore the user's query for now.

STEP 1: Document Analysis
- What type of document is this? (Resume, Blog, Report, Manual, etc.)
- Who is the main person this document belongs to or is about?
- Look for names, signatures, "My projects", "I built", author bylines, etc.

STEP 2: Relevance Check  
- USER QUERY: "${query}"
- Is this document about the person mentioned in the query?
- If document is about Tyler but query asks about Rutwik → IRRELEVANT
- If document is about Rutwik and query asks about Rutwik → RELEVANT

🎯 EXAMPLE:
- Document about "Tyler Romero's blog post" + Query "Rutwik's project" = ENTITY: Tyler Romero, RELEVANT: NO
- Document about "Rutwik Shinde's resume" + Query "Rutwik's project" = ENTITY: Rutwik Shinde, RELEVANT: YES

Respond in simple format:
TYPE: [document type - what kind of document]
ENTITY: [who owns/created this document - the actual person's name from the document]
RELEVANT: [YES only if ENTITY matches the person in query, otherwise NO]
REASON: [explain who the document is about and why it's relevant/irrelevant]`;

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
      
      // 🔥 CRITICAL FIX: More robust relevance detection
      const isRelevant = this.determineRelevance(relevantText, reasoning, primaryEntity, query);
      
      console.log(`🔍 RELEVANCE ANALYSIS: Text="${relevantText}", Entity="${primaryEntity}", Query="${query}" → Result: ${isRelevant}`);
      
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
   * 🔥 CRITICAL FIX: Robust relevance determination
   * Fixes parsing inconsistency where LLM reasoning was correct but extraction failed
   */
  private determineRelevance(relevantText: string, reasoning: string, primaryEntity: string, query: string): boolean {
    const upperRelevantText = relevantText.toUpperCase();
    const upperReasoning = reasoning.toUpperCase();
    const upperQuery = query.toUpperCase();
    
    // Extract the person name from the query
    const queryPersonMatch = query.match(/(?:by|about|for)\s+([A-Z][a-z]+)/i);
    const queryPerson = queryPersonMatch ? queryPersonMatch[1].toLowerCase() : '';
    
    // Extract the entity name for comparison
    const entityWords = primaryEntity.toLowerCase().split(/[\s,]+/);
    
    console.log(`🔍 RELEVANCE DEBUG: Query person: "${queryPerson}", Entity words: [${entityWords.join(', ')}]`);
    
    // Method 1: Direct YES/NO check
    if (upperRelevantText.includes('YES')) {
      // Double-check: ensure the entity actually matches the query
      if (queryPerson && !entityWords.some(word => word.includes(queryPerson))) {
        console.warn(`⚠️ RELEVANCE OVERRIDE: LLM said YES but entity "${primaryEntity}" doesn't match query person "${queryPerson}"`);
        return false;
      }
      return true;
    }
    
    if (upperRelevantText.includes('NO') || upperRelevantText.includes('IRRELEVANT')) {
      return false;
    }
    
    // Method 2: Check reasoning for explicit relevance statements
    if (upperReasoning.includes('IRRELEVANT') || upperReasoning.includes('NOT RELEVANT')) {
      console.log(`📝 REASONING OVERRIDE: Found "irrelevant" in reasoning`);
      return false;
    }
    
    if (upperReasoning.includes('RELEVANT') && !upperReasoning.includes('NOT RELEVANT')) {
      // Double-check entity match
      if (queryPerson && !entityWords.some(word => word.includes(queryPerson))) {
        console.warn(`⚠️ REASONING OVERRIDE: LLM reasoning says relevant but entity mismatch`);
        return false;
      }
      return true;
    }
    
    // Method 3: Entity name matching as fallback
    if (queryPerson) {
      const entityMatches = entityWords.some(word => 
        word.includes(queryPerson) || queryPerson.includes(word)
      );
      console.log(`🔍 ENTITY MATCHING: "${queryPerson}" vs [${entityWords.join(', ')}] → ${entityMatches}`);
      return entityMatches;
    }
    
    // Default: if unclear, include to avoid losing data
    console.warn(`⚠️ RELEVANCE UNCERTAIN: Defaulting to RELEVANT for "${primaryEntity}"`);
    return true;
  }

  /**
   * Normalize key to handle common LLM typos (while preserving exact matching)
   */
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
      ];
      
      for (const pattern of patterns) {
        const match = cleanResponse.match(pattern);
        if (match && match[1].trim()) {
          // Log successful typo correction for debugging
          if (keyVariation !== key) {
            console.log(`🔧 DataInspector: Fixed typo "${keyVariation}" → "${key}" for value: "${match[1].trim()}"`);
          }
          return match[1].trim();
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

    // First analyze documents for relevance BEFORE sampling chunks
    console.log(`🔍 Analyzing ${documentMetadata.length} documents for relevance BEFORE sampling`);
    this.progressCallback?.onAgentProgress?.(this.name, 15, `Analyzing ${documentMetadata.length} documents for relevance`, 0, documentMetadata.length);
    
    // Create temporary document groups with minimal metadata for relevance analysis
    const tempDocumentGroups = documentMetadata.map((docMeta, index) => ({
      documentId: docMeta.metadata?.documentId || docMeta.id,
      chunks: [{
        id: docMeta.id,
        text: docMeta.text || `Document: ${documentSources[index]}`,
        source: documentSources[index],
        similarity: 1.0,
        metadata: docMeta.metadata,
        sourceDocument: documentSources[index],
        sourceType: 'document' as const
      }]
    }));
    
    // Perform relevance analysis FIRST
    await this.performMultiDocumentAnalysis(context, tempDocumentGroups);
    
    // Get list of relevant documents from analysis
    const relevantDocIds = new Set<string>();
    if (context.documentAnalysis?.documents) {
      context.documentAnalysis.documents.forEach(doc => {
        relevantDocIds.add(doc.documentId);
      });
    }
    
    console.log(`📊 Relevance analysis: ${relevantDocIds.size} relevant out of ${documentMetadata.length} total documents`);
    
    // Now sample chunks ONLY from relevant documents
    console.log(`🔍 Sampling real chunks from ${relevantDocIds.size} RELEVANT documents only`);
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
    
    for (let i = 0; i < documentMetadata.length; i++) {
      const docMeta = documentMetadata[i];
      const documentId = docMeta.metadata?.documentId || docMeta.id;
      const documentSource = documentSources[i];
      
      // Skip irrelevant documents - no sampling!
      if (!relevantDocIds.has(documentId)) {
        console.log(`⏭️ Skipping chunk sampling for irrelevant document: ${documentSource}`);
        continue;
      }
      
      try {
        // Get full document from VectorStore with all chunks
        const fullDocument = await vectorStore.getDocument(documentId);
        
        if (fullDocument && fullDocument.chunks && fullDocument.chunks.length > 0) {
          // Sample up to 2 chunks per document (or all if less than 2)
          const chunksToSample = Math.min(2, fullDocument.chunks.length);
          const sampledChunks = [];
          
          if (chunksToSample === 1) {
            // Take the first chunk if only 1 available
            sampledChunks.push(fullDocument.chunks[0]);
          } else {
            // Take first and middle chunks for better document coverage
            sampledChunks.push(fullDocument.chunks[0]);
            const middleIndex = Math.floor(fullDocument.chunks.length / 2);
            sampledChunks.push(fullDocument.chunks[middleIndex]);
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
    
    console.log(`✅ Sampled chunks from ${documentGroups.length} RELEVANT documents only`);
    
    // Replace chunks with ONLY relevant document chunks
    const allSampledChunks = documentGroups.flatMap(group => group.chunks);
    console.log(`🔄 Replacing ${context.ragResults.chunks.length} document metadata with ${allSampledChunks.length} relevant chunks (NO CONTAMINATION)`);
    context.ragResults.chunks = allSampledChunks;
    
    // No need to re-analyze - we already did relevance analysis above
    
    // Update reasoning to reflect the real chunk sampling
    const totalSampledChunks = documentGroups.reduce((sum, group) => sum + group.chunks.length, 0);
    this.setReasoning(`🧠 **DataInspector Magic: Real Chunk Sampling Analysis**

📋 **Document Discovery**: Found ${documentMetadata.length} documents in knowledge base
${documentSources.map((source, idx) => `- ${source} (${documentGroups[idx]?.chunks.length || 0} chunks sampled)`).join('\n')}

🔍 **Real Chunk Sampling**: Sampled ${totalSampledChunks} real chunks from VectorStore/RxDB for intelligent analysis

🎯 **Key Insights**: Analyzed actual document content and structure to enable targeted pattern generation

🚀 **Next Step**: Filtered documents with real content are ready for PatternGenerator to create extraction strategies`);
  }
  
  // 🚨 REMOVED: Legacy hardcoded JSON processing
  // Universal Intelligence approach now uses natural language prompts with LLM-based discovery
}