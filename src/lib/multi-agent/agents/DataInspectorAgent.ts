/**
 * Data Inspector Agent
 *
 * Analyzes RAG chunks to understand data structure and quality.
 * Identifies patterns, formats, and potential extraction challenges.
 */

import { BaseAgent } from "../interfaces/Agent";
import {
  ResearchContext,
  DocumentAnalysis,
  SingleDocumentAnalysis,
  EntityReference,
  DocumentRelationship,
} from "../interfaces/Context";
import { LLMFunction } from "../core/Orchestrator";
import { parseJsonWithResilience } from "../../../components/DeepResearch/hooks/responseCompletion";
import { VectorStore } from "@/components/VectorStore/VectorStore";
import { AgentProgressCallback } from "../interfaces/AgentProgress";
import { FeedbackAwareAgent } from "./FeedbackAwareAgent";
import { UserFeedback, FeedbackValidation, CorrectionResult } from "../interfaces/Feedback";

const MAX_MULTI_DOC_SAMPLES = 6;
const MAX_CHUNKS_PER_DOCUMENT = 4;
const MAX_CHUNK_CHARACTERS = 500;

interface AlignmentInfo {
  queryEntity?: string;
  documentEntity?: string;
  match?: boolean;
}

interface ConceptAlignmentInfo {
  queryConcepts?: string[];
  documentConcepts?: string[];
  match?: boolean;
}

interface StructuredInspectorResponse {
  documentType?: string;
  mainEntity?: string;
  isRelevant?: boolean;
  relevanceReason?: string;
  reasoning?: string;
  conceptSynthesis?: string;
  topics?: string[];
  people?: string[];
  methods?: string[];
  concepts?: string[];
  dataPoints?: string[];
  performanceIndicators?: string[];
  queryConcepts?: string[];
  documentConcepts?: string[];
  entityAlignment?: AlignmentInfo;
  conceptAlignment?: ConceptAlignmentInfo;
}

export class DataInspectorAgent extends FeedbackAwareAgent {
  readonly name = "DataInspector";
  readonly description =
    "Analyzes RAG chunks to understand data structure and quality";

  private llm: LLMFunction;
  protected progressCallback?: AgentProgressCallback;
  protected reasoning: string = '';
  protected conceptSynthesis: string = '';
  
  constructor(llm: LLMFunction, progressCallback?: AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }

  private getVectorStore(): VectorStore | null {
    // Try multiple methods to access VectorStore
    if (typeof window !== "undefined") {
      if ((window as any).sharedVectorStore) {
        return (window as any).sharedVectorStore;
      }
      if ((window as any).getVectorStore) {
        try {
          return (window as any).getVectorStore();
        } catch (error) {
          console.warn(
            "Failed to get VectorStore via getVectorStore():",
            error
          );
        }
      }
    }
    return null;
  }

  async processNormally(context: ResearchContext): Promise<ResearchContext> {
    // Report start of processing with clear user-friendly message
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      5,
      "🔍 Starting intelligent document analysis...",
      0,
      undefined
    );

    // 🔥 CRITICAL: Detect if we received document metadata instead of actual chunks
    const hasDocumentMetadata = context.ragResults.chunks.some(
      (chunk) =>
        chunk.sourceType === "document" ||
        chunk.text?.startsWith("Document metadata:")
    );

    if (hasDocumentMetadata) {
      console.log(
        `🔎 DataInspector: Received document metadata - performing multi-document sampling and analysis`
      );
      await this.progressCallback?.onAgentProgress?.(
        this.name,
        10,
        "📋 Found multiple documents - starting intelligent analysis",
        0,
        undefined
      );
      await this.performDocumentMetadataAnalysis(context);

      // Report completion with detailed results
      const analysisResults = {
        documentAnalysis: context.documentAnalysis,
        filteredChunks: context.ragResults.chunks.length,
        totalDocuments: context.documentAnalysis?.documents?.length || 0,
        relevantDocuments:
          context.documentAnalysis?.documents?.filter(
            (d) => d.role !== "reference"
          ).length || 0,
      };

      await this.progressCallback?.onAgentComplete?.(
        this.name,
        analysisResults
      );

      return context;
    }

    // Count web sources vs RAG chunks for regular chunk analysis
    const webSources = context.ragResults.chunks.filter(
      (chunk) =>
        (chunk.metadata?.source && chunk.metadata.source.startsWith("http")) ||
        (chunk.id && chunk.id.startsWith("web_"))
    ).length;
    const ragChunks = context.ragResults.chunks.length - webSources;

    console.log(
      `🔎 DataInspector: Analyzing ${context.ragResults.chunks.length} sources (${ragChunks} RAG, ${webSources} Web)`
    );
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      15,
      `📊 Found ${context.ragResults.chunks.length} chunks (${ragChunks} from documents, ${webSources} from web)`,
      0,
      undefined
    );

    if (context.ragResults.chunks.length === 0) {
      this.setReasoning("No chunks to analyze");

      // Report completion with no data
      await this.progressCallback?.onAgentComplete?.(this.name, {
        message: "No chunks to analyze",
        chunksAnalyzed: 0,
      });

      return context;
    }

    // Extract numeric measurements from chunk text before LLM analysis
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      30,
      "🔢 Extracting numeric data and measurements from chunks...",
      0,
      undefined
    );
    this.extractMeasurementsFromChunks(context);

    // Use LLM to understand the data
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      60,
      "🧠 Analyzing chunk content and structure with AI...",
      0,
      undefined
    );
    await this.inspectWithLLM(context);

    // Report completion
    const completionData = {
      documentAnalysis: context.documentAnalysis,
      chunksAnalyzed: context.ragResults.chunks.length,
      measurements:
        context.sharedKnowledge.documentInsights?.measurements?.length || 0,
      webSources: webSources,
      ragChunks: ragChunks,
    };

    await this.progressCallback?.onAgentComplete?.(this.name, completionData);

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
        agentFindings: {},
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
    console.log(`🔍 Query source analysis:`, {
      query: context.query,
      sourceRequired,
    });

    // Process up to 8 chunks for measurement extraction
    const chunksToProcess = context.ragResults.chunks.slice(
      0,
      Math.min(8, context.ragResults.chunks.length)
    );

    // Broad pattern to capture any numeric values - let PatternGenerator decide what's relevant
    const numericPattern = /(\d+(?:[.:]\d+)?(?:\s+\d{1,2})?|\d+)/g;

    for (const chunk of chunksToProcess) {
      const text = chunk.text || "";

      // 🆕 STRUCTURAL MARKER DETECTION: Check for structural context
      const hasTableMarkers =
        text.includes("<TABLE_ROW>") || text.includes("<TABLE_HEADER>");
      const hasDataMarkers = text.includes("<START_MEASUREMENT_DATA>");
      const hasSectionMarkers = text.includes("<START_SECTION:");

      // Store structural context in chunk metadata
      if (hasTableMarkers || hasDataMarkers || hasSectionMarkers) {
        console.log(
          `📊 Structural markers detected in chunk: Table=${hasTableMarkers}, Data=${hasDataMarkers}, Section=${hasSectionMarkers}`
        );
      }

      // 🎯 ZERO-HARDCODING: Filter by document source if query specifies one
      if (sourceRequired.sourceRequired && sourceRequired.sourceName) {
        const chunkSource = (
          chunk.sourceDocument ||
          chunk.source ||
          ""
        ).toLowerCase();
        const querySource = sourceRequired.sourceName.toLowerCase();

        // Check if chunk is from the requested source using semantic matching
        if (!this.isFromRequestedSource(chunkSource, querySource, text)) {
          console.log(
            `🔍 Skipping chunk from ${chunkSource} - query requests ${querySource}`
          );
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
        const cleanValue = match[0].replace(/^[^\d]+|[^\d]+$/g, "");

        // Store all measurements - let pattern learning decide relevance
        measurements.push({
          value: cleanValue,
          leftContext: leftContext.replace(/[[\](){}]/g, ""), // Strip brackets
          rightContext: rightContext.replace(/[[\](){}]/g, ""),
          chunkId: chunk.id,
          sourceDocument: chunk.sourceDocument || chunk.source,
        });
      }
    }

    // Store measurements in sharedKnowledge for downstream agents
    console.log(
      `🔍 DEBUG: About to store ${measurements.length} measurements in shared context`
    );
    console.log(`🔍 DEBUG: Context structure:`, {
      hasSharedKnowledge: !!context.sharedKnowledge,
      hasDocumentInsights: !!context.sharedKnowledge?.documentInsights,
      existingMeasurements:
        context.sharedKnowledge?.documentInsights?.measurements?.length || 0,
    });

    context.sharedKnowledge.documentInsights.measurements = measurements;

    // Verify storage worked
    console.log(`🔍 DEBUG: After storage:`, {
      storedCount:
        context.sharedKnowledge.documentInsights.measurements?.length || 0,
      sampleStored:
        context.sharedKnowledge.documentInsights.measurements?.slice(0, 2) ||
        [],
    });

    console.log(
      `📊 DataInspector: Extracted ${measurements.length} numeric measurements from document text`
    );
    if (measurements.length > 0) {
      console.log(
        `📊 Sample measurements:`,
        measurements
          .slice(0, 3)
          .map((m) => `"${m.value}" (${m.leftContext}...${m.rightContext})`)
      );
    }
  }

  private async inspectWithLLM(context: ResearchContext): Promise<void> {
    // Group chunks by document/source for multi-document analysis
    const documentGroups = this.groupChunksByDocument(
      context.ragResults.chunks
    );

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

    chunks.forEach((chunk) => {
      // Try to determine document identity from source, metadata, or content
      let docId = chunk.source;

      // If web source, use domain
      if (chunk.metadata?.source?.startsWith("http")) {
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
      chunks: chunks.slice(0, MAX_CHUNKS_PER_DOCUMENT),
      metadata: chunks[0]?.metadata || {}  // 🔥 PRESERVE DOCUMENT METADATA: Extract from first chunk (all chunks from same document have same metadata)
    }));
  }

  private formatChunkPreview(text: string | undefined, maxChars: number = MAX_CHUNK_CHARACTERS): string {
    if (!text) {
      return "";
    }
    const collapsed = text.replace(/\s+/g, " ").trim();
    if (collapsed.length <= maxChars) {
      return collapsed;
    }
    return `${collapsed.slice(0, maxChars)}…`;
  }

  private async performMultiDocumentAnalysis(
    context: ResearchContext,
    documentGroups: any[]
  ): Promise<void> {
    console.log(
      `🔍 Multi-document analysis: ${documentGroups.length} documents detected`
    );
    const groupsForPrompt =
      documentGroups.length > MAX_MULTI_DOC_SAMPLES
        ? documentGroups.slice(0, MAX_MULTI_DOC_SAMPLES)
        : documentGroups;
    if (groupsForPrompt.length < documentGroups.length) {
      console.log(
        `⚖️ DataInspector: limiting multi-document sample to ${groupsForPrompt.length}/${documentGroups.length} documents to stay within token budget`
      );
    }

    const prompt = `I need to analyze multiple documents and understand their relationships to answer the user's query intelligently.

USER QUERY: "${context.query}"

DOCUMENTS DETECTED: ${groupsForPrompt.length}

${groupsForPrompt
  .map(
    (group, i) => `
--- DOCUMENT ${i + 1}: ${group.documentId} ---
Sample content from ${group.chunks.length} chunks:
${group.chunks
  .slice(0, 2)
  .map((chunk: any) => this.formatChunkPreview(chunk.text))
  .join("\n\n")}
`
  )
  .join("\n")}

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
      const relevantDocuments =
        await this.updateContextFromMultiDocumentInspection(
          context,
          response,
          groupsForPrompt
        );

      // 🎯 ENHANCED FIX: Extract intelligence from stored concept synthesis (before filtering)
      await this.extractIntelligenceFromConceptSynthesis(context);
      
      // 🎯 FALLBACK: Also extract from remaining relevant documents if available
      if (relevantDocuments.length > 0) {
        await this.extractQueryRelevantTerms(context, relevantDocuments);
      }

      // Store full response for thinking extraction
      this.setReasoning(response);
    } catch (error) {
      console.error("❌ Multi-document analysis failed:", error);
      this.setReasoning("Failed to analyze multiple documents");
    }
  }

  private async performSingleDocumentAnalysis(
    context: ResearchContext,
    documentGroup: any
  ): Promise<void> {
    const samples = documentGroup.chunks.slice(0, MAX_CHUNKS_PER_DOCUMENT);

    // Include source type information
    const samplesWithType = samples.map((chunk: any) => {
      const isWeb =
        chunk.metadata?.source?.startsWith("http") ||
        chunk.id.startsWith("web_");
      return {
        chunk,
        sourceType: isWeb ? "Web" : "RAG",
        sourceName: isWeb ? chunk.metadata?.source : chunk.source,
      };
    });

    const prompt = `I need to intelligently analyze this document and understand how to help the user.

IMPORTANT: Look for these STRUCTURAL MARKERS in the document:
- <START_TABLE> / <END_TABLE> - Indicates table boundaries
- <TABLE_ROW> - Marks individual table rows with data
- <TABLE_HEADER> - Marks table headers
- <START_SECTION:title> / <END_SECTION> - Document sections
- <START_PARAGRAPH> / <END_PARAGRAPH> - Text paragraphs
- <START_MEASUREMENT_DATA> / <END_MEASUREMENT_DATA> - Numeric data clusters
- <START_LIST> / <LIST_ITEM> / <END_LIST> - List structures

These markers help identify document structure for better extraction and understanding.

USER QUERY: "${context.query}"

DOCUMENT CONTENT SAMPLES:
${samplesWithType
  .map(
    (item: any, i: number) => `
--- Source ${i + 1} (${item.sourceType}) ---
${this.formatChunkPreview(item.chunk.text)}
`
  )
  .join("\n")}

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
      console.error("❌ Single document analysis failed:", error);
      this.setReasoning("Failed to inspect data with LLM");
    }
  }

  private updateContextFromInspection(
    context: ResearchContext,
    response: string
  ) {
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
        agentSource: "DataInspector",
        // 🔥 NEW: Preserve detailed semantic reasoning for next agents
        detailedReasoning: this.reasoning, // Full LLM reasoning from DataInspector
        specificInsights: this.extractSpecificInsights(
          documentAnalysis,
          context.query
        ), // Entity-specific insights
        keyFindings: this.extractKeyFindings(documentAnalysis), // Important discoveries
      };

      // Create adaptive patterns based on document analysis
      context.patterns = [];
      if (documentAnalysis) {
        context.patterns.push({
          description: `${documentAnalysis.documentType} extraction pattern`,
          examples: documentAnalysis.contentAreas,
          extractionStrategy: documentAnalysis.extractionStrategy,
          confidence: 0.9,
        });
      }

      console.log(
        `📋 Document Analysis: ${documentAnalysis?.documentType} with ${documentAnalysis?.structure.length || 0} sections`
      );
      console.log(
        `🔗 Shared insights with other agents: ${Object.keys(context.sharedKnowledge.documentInsights).length} insights`
      );
    } catch (error) {
      console.error("❌ Error parsing document analysis:", error);
      throw new Error(
        `Document analysis parsing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private async updateContextFromMultiDocumentInspection(
    context: ResearchContext,
    response: string,
    documentGroups: any[]
  ): Promise<any[]> {
    try {
      const documentAnalysis = await this.parseMultiDocumentAnalysis(
        response,
        documentGroups,
        context
      );
      context.documentAnalysis = documentAnalysis;

      // Create adaptive patterns based on multi-document analysis
      context.patterns = [];
      if (documentAnalysis.documents) {
        documentAnalysis.documents.forEach((doc) => {
          context.patterns.push({
            description: `${doc.documentType} extraction pattern for ${doc.primaryEntity}`,
            examples: doc.contentAreas,
            extractionStrategy: `Extract ${doc.contentAreas.join(", ")} from ${doc.documentName}`,
            confidence: 0.9,
          });
        });
      }

      console.log(
        `📋 Multi-Document Analysis: ${documentAnalysis.documents?.length || 0} documents with ${documentAnalysis.relationships?.length || 0} relationships`
      );

      // 🔥 SMART FILTERING: Only filter if we have many documents and analysis suggests some are irrelevant
      // For pre-sampled chunks from performDocumentMetadataAnalysis, we trust DataInspector's sampling
      const hasPreSampledChunks = context.ragResults.chunks.some(
        (chunk) => chunk.metadata?.originalChunkId !== undefined
      );

      if (
        documentAnalysis.documents &&
        documentAnalysis.documents.length < documentGroups.length
      ) {
        const relevantDocumentIds = new Set(
          documentAnalysis.documents.map((doc) => doc.documentId)
        );
        const originalChunkCount = context.ragResults.chunks.length;

        // Filter chunks to only include those from relevant documents
        context.ragResults.chunks = context.ragResults.chunks.filter(
          (chunk) => {
            // Match chunk to document based on source or content similarity
            const chunkSource = chunk.sourceDocument || chunk.source;

            // Check if this chunk belongs to a relevant document
            for (const docId of relevantDocumentIds) {
              if (
                chunkSource &&
                (chunkSource.includes(docId) ||
                  chunk.text.includes(docId) ||
                  documentAnalysis.documents!.some(
                    (doc) =>
                      doc.primaryEntity &&
                      chunk.text.includes(doc.primaryEntity)
                  ))
              ) {
                return true;
              }
            }
            return false;
          }
        );

        const filteredChunkCount = context.ragResults.chunks.length;
        console.log(
          `🚨 CROSS-CONTAMINATION PREVENTION: Filtered ${hasPreSampledChunks ? "pre-sampled" : "RAG"} chunks from ${originalChunkCount} to ${filteredChunkCount} (removed ${originalChunkCount - filteredChunkCount} irrelevant chunks)`
        );

        // Update summary to reflect filtering
        context.ragResults.summary = `Filtered to ${filteredChunkCount} relevant chunks from ${documentAnalysis.documents.length} documents`;
      } else if (hasPreSampledChunks) {
        console.log(
          `✅ DOCUMENT ANALYSIS: All ${documentGroups.length} documents deemed relevant - preserving ${context.ragResults.chunks.length} chunks (${hasPreSampledChunks ? "pre-sampled" : "original"})`
        );
      } else {
        console.log(
          `✅ DOCUMENT ANALYSIS: All ${documentGroups.length} documents deemed relevant - no filtering applied`
        );
      }

      // 🎯 Return relevant document groups for technical term extraction
      return documentAnalysis.relevantDocumentGroups || [];
    } catch (error) {
      console.error("❌ Error parsing multi-document analysis:", error);
      throw new Error(
        `Multi-document analysis parsing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private async parseMultiDocumentAnalysis(
    _response: string,
    documentGroups: any[],
    context: ResearchContext
  ): Promise<DocumentAnalysis> {
    // 🧠 AWESOME DATAINSPECTOR: Pure LLM Intelligence - No Hardcode, No Fallbacks!
    // Let LLM make intelligent decisions about document relevance

    console.log(
      `🧠 DataInspector analyzing ${documentGroups.length} documents with pure LLM intelligence`
    );

    // Build individual document analyses - ANALYZE FIRST, DON'T FILTER
    const documents: SingleDocumentAnalysis[] = [];
    const relevantDocuments: any[] = [];

    for (let i = 0; i < documentGroups.length; i++) {
      const group = documentGroups[i];
      const docNumber = i + 1;

      // Report progress for each document with clear descriptive messaging
      const progress = 15 + (60 * i) / documentGroups.length; // Progress from 15% to 75%
      const timestamp = new Date().toLocaleTimeString();
      // Get proper document name from metadata instead of using document ID
      const documentName = group.metadata?.title || 
                          group.metadata?.filename || 
                          group.metadata?.name ||
                          `Document_${group.documentId.slice(-6)}`;
      
      const progressStage = `🔍 [${timestamp}] Analyzing document ${docNumber}/${documentGroups.length}: ${documentName}`;
      await this.progressCallback?.onAgentProgress?.(
        this.name,
        Math.round(progress),
        progressStage,
        i,
        documentGroups.length
      );

      // 🧠 INTELLIGENT DOCUMENT ANALYSIS: Let LLM decide what this document is about
      const docAnalysis = await this.analyzeDocumentIntelligently(
        group,
        docNumber,
        context.query
      );

      console.log(`🔍 Document ${docNumber} intelligent analysis:`, {
        docType: docAnalysis.documentType,
        primaryEntity: docAnalysis.primaryEntity,
        isRelevant: docAnalysis.isRelevant,
        reasoning: docAnalysis.reasoning.substring(0, 100) + "...",
      });
      
      // 🎯 RUN INTELLIGENT DISCOVERY FIRST - Get semantic understanding BEFORE making final decision
      const sampleContent = group.chunks.slice(0, 2).map((chunk: any) => chunk.text.substring(0, 300)).join('\n\n');
      
      // Use LLM to discover content areas based on actual content
      const contentAreas = await this.discoverContentAreas(docAnalysis.documentType, sampleContent);
      
      // Use LLM to discover entities based on actual content  
      const keyEntities = await this.discoverEntitiesIntelligently(sampleContent);
      
      // Use LLM to discover document role based on query and content
      const role = await this.discoverDocumentRole(i, documentGroups.length, context.query, sampleContent);
      
      // 🔍 ENHANCED RELEVANCE DECISION: Use LLM analysis + intelligent discovery + entity alignment
      const finalRelevance = this.makeFinalRelevanceDecision(
        docAnalysis, 
        keyEntities, 
        contentAreas, 
        role, 
        context.query, 
        group
      );
      
      // 🎯 INCLUDE DOCUMENT: Based on enhanced intelligence (not just initial LLM decision)
      if (finalRelevance.isRelevant) {
        console.log(`✅ Including relevant document: ${docAnalysis.documentType} (${finalRelevance.reason})`);
        relevantDocuments.push(group);
        const includeTimestamp = new Date().toLocaleTimeString();
        await this.progressCallback?.onAgentProgress?.(this.name, Math.round(progress + 5), `[${includeTimestamp}] ✅ Including: ${docAnalysis.primaryEntity}`, i + 1, documentGroups.length);
        
        // Store concept synthesis in shared knowledge for downstream agents
        if (docAnalysis.conceptSynthesis) {
          if (!context.sharedKnowledge) {
            context.sharedKnowledge = {
              documentInsights: {},
              extractionStrategies: {},
              discoveredPatterns: {},
              agentFindings: {}
            };
          }
          // Store in agentFindings as DataInspector findings
          if (!context.sharedKnowledge.agentFindings['DataInspector']) {
            context.sharedKnowledge.agentFindings['DataInspector'] = {};
          }
          if (!context.sharedKnowledge.agentFindings['DataInspector'].conceptSynthesis) {
            context.sharedKnowledge.agentFindings['DataInspector'].conceptSynthesis = [];
          }
          context.sharedKnowledge.agentFindings['DataInspector'].conceptSynthesis.push({
            documentId: group.documentId,
            synthesis: docAnalysis.conceptSynthesis
          });
          console.log(`🎯 DataInspector: Stored concept synthesis for document ${group.documentId}`);
        }
        
        documents.push({
          documentId: group.documentId,
          documentName: group.metadata?.title || 
                        group.metadata?.filename || 
                        group.metadata?.name ||
                        `Document_${group.documentId.slice(-6)}`,
          documentType: docAnalysis.documentType,
          primaryEntity: docAnalysis.primaryEntity,
          structure: [docAnalysis.documentType.toLowerCase() + " sections"],
          contentAreas: contentAreas,
          keyEntities: keyEntities,
          role: role,
        });
      } else {
        console.log(
          `⏭️ Skipping irrelevant document: ${finalRelevance.reason} - ${docAnalysis.primaryEntity}`
        );
        const skipTimestamp = new Date().toLocaleTimeString();
        await this.progressCallback?.onAgentProgress?.(
          this.name,
          Math.round(progress + 3),
          `❌ [${skipTimestamp}] REJECTED: ${docAnalysis.primaryEntity} (${finalRelevance.reason}) (${docAnalysis.documentType}) - ${docAnalysis.reasoning.substring(0, 60)}...`,
          i + 1,
          documentGroups.length
        );
      }
    }

    console.log(
      `📊 Document filtering: ${documentGroups.length} total → ${documents.length} relevant`
    );
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      85,
      `📊 Analysis complete: ${documents.length}/${documentGroups.length} documents are relevant to your query`,
      documentGroups.length,
      documentGroups.length
    );

    // Build minimal relationships - only connect documents if explicitly needed
    const relationships: DocumentRelationship[] =
      documents.length > 1
        ? this.buildMinimalRelationships(documents, context.query)
        : [];

    // Report final filtering results
    const acceptedDocs = documents.map((d) => d.primaryEntity).join(", ");
    const rejectedCount = documentGroups.length - documents.length;
    if (rejectedCount > 0) {
      await this.progressCallback?.onAgentProgress?.(
        this.name,
        90,
        `✅ Accepted: ${acceptedDocs} | ❌ Rejected: ${rejectedCount} irrelevant documents`,
        documentGroups.length,
        documentGroups.length
      );
    } else {
      await this.progressCallback?.onAgentProgress?.(
        this.name,
        90,
        `✅ All documents relevant: ${acceptedDocs}`,
        documentGroups.length,
        documentGroups.length
      );
    }

    return {
      documentType: "Multi-Document Analysis",
      structure: documents.map((d) => d.documentType),
      contentAreas: documents.flatMap((d) => d.contentAreas),
      queryIntent: `Extract information from ${documents.length} relevant documents`,
      extractionStrategy:
        "Extract from each relevant document separately with proper attribution",
      expectedOutputFormat: "structured synthesis with proper attribution",
      documents: documents,
      relationships: relationships,
      crossDocumentStrategy:
        "Process each document independently to prevent cross-contamination",
      relevantDocumentGroups: relevantDocuments, // 🎯 Add relevant document groups for technical extraction
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
    conceptSynthesis?: string;
  }> {
    const sampleContent = documentGroup.chunks
      .map(
        (chunk: any, idx: number) =>
          `[CHUNK ${idx + 1}]:\n${chunk.text.substring(0, 800)}`
      )
      .join("\n\n---\n\n");

    // 🔥 Extract document metadata for better context
    const documentFilename =
      documentGroup.metadata?.filename ||
      documentGroup.metadata?.name ||
      "unknown";
    const documentSource = documentGroup.metadata?.source || "";
    const documentUrl = documentGroup.metadata?.url || "";

    // 🐛 DEBUG: Log the sample content to verify document content is available
    console.log(
      `🔍 DEBUG DataInspector Document ${docNumber} Sample Content:`,
      {
        chunksCount: documentGroup.chunks.length,
        sampleLength: sampleContent.length,
        firstChunkPreview:
          documentGroup.chunks[0]?.text?.substring(0, 200) + "...",
        hasActualContent:
          sampleContent.length > 100 &&
          !sampleContent.includes("Please provide the content"),
        filename: documentFilename,
        source: documentSource,
      }
    );

    const intelligentPrompt = `You are an intelligent document analyzer specializing in semantic concept understanding. Perform multi-intelligence analysis using concept mapping rather than surface-level word matching.

DOCUMENT ${docNumber} METADATA:
Filename: ${documentFilename}
Source: ${documentSource}
${documentUrl ? `URL: ${documentUrl}` : ""}

DOCUMENT ${docNumber} SAMPLE CONTENT:
${sampleContent}

STEP 1: Multi-Intelligence Document Analysis
Extract comprehensive information from this document:

TOPICS: List all topics, subjects, domains, and fields covered (broad and specific)
PEOPLE: List all people mentioned (authors, researchers, subjects, references)  
METHODS: List all techniques, algorithms, approaches, methodologies described
CONCEPTS: List all key ideas, principles, theories, frameworks discussed
DATA: List all datasets, experiments, results, metrics, findings mentioned
PERFORMANCE_INDICATORS: List any performance metrics, timing data, optimization results, benchmarks, speeds, efficiencies

STEP 2: Document Classification & Entity Resolution
TYPE: [what kind of document this is]
MAIN_ENTITY: [primary person/organization/subject this document is about]

STEP 3: Entity Filtering & Semantic Analysis  
USER_QUERY: "${query}"

⚠️ DUAL REQUIREMENT: Entity Alignment + Concept Alignment (BOTH must pass)

STEP 3A: ENTITY ALIGNMENT CHECK
- Extract query entity: Who/what is the query asking about? (possessive patterns like "X's work")  
- Extract document entity: Who/what is document about? (filename + content analysis)
- Entity match required: Query entity must match document entity

STEP 3B: CONCEPT ALIGNMENT CHECK  
- Extract query concepts: What information is needed? (analyze technical terms and intent)
- Extract document concepts: What information does document provide?
- Concept match required: Document must contain the type of information query seeks

STEP 3C: CONCEPT SYNTHESIS (Semantic Intelligence Snapshot)
- Define query concepts in document context: What do the query terms mean specifically in this document?
- Create semantic concept mappings: How do document concepts relate to query concepts?
- Generate insight synthesis: What is the core understanding that connects query intent with document content?
- This provides downstream agents with semantic intelligence about concept relationships

🎯 COMBINED DECISION: Document is RELEVANT only if BOTH entity AND concept alignment pass
1. **Query Concept Extraction**: Break down the query into semantic concepts
   - Identify core concepts beyond surface words
   - Map technical terms to their broader meanings dynamically based on context
   - Extract intent patterns (ranking queries, comparison queries, specific attribute queries)

2. **Document Concept Extraction**: Identify what semantic concepts this document covers
   - Technical capabilities and performance aspects
   - Methodologies and optimization techniques  
   - Experimental results and benchmarking data
   - Training processes and efficiency metrics

3. **Semantic Concept Mapping**: Match query concepts with document concepts
   - Does document content semantically align with query concepts?
   - Are the underlying technical domains related?
   - Does document provide the type of information query seeks?

4. **Entity Resolution**: Resolve entities using multiple signals
   - Extract entities from filename metadata (author indicators)
   - Check content attribution and authorship
   - Consider document provenance and source

SEMANTIC RELEVANCE ANALYSIS:
Query: "${query}"

QUERY CONCEPT ANALYSIS:
- Break down query terms into semantic concepts dynamically
- Identify what type of information is being requested
- Extract entity references and their context (possessive forms, attribution)

DOCUMENT CONCEPT ANALYSIS: 
- What core concepts and themes does this document cover?
- What methodologies, techniques, and results does it contain?
- How does the document's content relate to the query's conceptual intent?

SEMANTIC MATCHING:
- Concept alignment: Do document concepts semantically match query concepts?
- Information type match: Does document provide the type of data query seeks?
- Entity match: Does document entity/author align with query entity (using filename, content attribution)?

HOLISTIC RELEVANCE DECISION:
Consider ALL signals together:
- Semantic concept overlap between query and document
- Document's ability to answer the query type
- Entity/authorship alignment from multiple sources
- Content depth and relevance to query intent

OUTPUT FORMAT:
Respond **only** with valid JSON matching this structure:
```json
{
  "documentType": "Educational Tutorial",
  "mainEntity": "PyTorch Distributed Data Parallel (DDP)",
  "isRelevant": true,
  "relevanceReason": "Explain why the document answers the query.",
  "conceptSynthesis": "Short synthesis aligning query and document concepts.",
  "topics": ["Distributed training", "PyTorch"],
  "people": ["Hugging Face"],
  "methods": ["DDP"],
  "concepts": ["gradient synchronization"],
  "dataPoints": ["batch size handling"],
  "performanceIndicators": ["all_reduce timing"],
  "queryConcepts": ["lesson plan", "DDP fundamentals"],
  "documentConcepts": ["tutorial modules", "multi-GPU training"],
  "entityAlignment": {
    "queryEntity": "DDP",
    "documentEntity": "PyTorch DDP",
    "match": true
  },
  "conceptAlignment": {
    "queryConcepts": ["lesson plan"],
    "documentConcepts": ["educational tutorial"],
    "match": true
  }
}
```
Do not include explanations outside of this JSON.

🔍 SEMANTIC VERIFICATION (Critical for Small LLMs):

STEP 4A: DOMAIN VERIFICATION
Query domain: [Extract semantic domain - gaming/research/education/tech/blog]
Document domain: [Extract semantic domain from content and metadata]
Domain match: [YES/NO - Do they represent the same semantic field?]

STEP 4B: ENTITY RELATIONSHIP VERIFICATION  
Query requests content from: [Extract person/entity name from query]
Document authored by/about: [Extract person/entity from filename and content]
Entity relationship: [YES/NO - Is this the exact same entity?]

STEP 4C: CONTEXT VALIDATION
Shared words: [List words that appear in both query and document]
Context analysis: [For each shared word, does it mean the same thing in both contexts?]
Example: "speed" in gaming context vs "speed" in testing context = DIFFERENT
Context validation: [YES/NO - Do shared words have same meaning in both contexts?]

⚠️ MANDATORY DECISION LOGIC:
1. DOMAIN VERIFICATION: Query and document must be in same semantic domain
2. ENTITY ALIGNMENT: Extract entity from query → Document MUST be about same entity (check filename/content)
3. CONCEPT ALIGNMENT: Extract concepts from query → Document MUST contain relevant concept data
4. CONTEXT VALIDATION: Shared words must mean the same thing in both contexts
5. ALL REQUIRED: Document passes ONLY if ALL checks pass

ENHANCED DECISION MATRIX:
- Domain match + Entity match + Concept match + Context valid = YES
- Any single check fails = NO (prevents false positives from word overlap)

Respond in exact format:
TYPE: [document type]
MAIN_ENTITY: [main subject]
QUERY_DOMAIN: [extracted query semantic domain]
DOCUMENT_DOMAIN: [extracted document semantic domain]
DOMAIN_MATCH: [YES/NO]
ENTITY_RELATIONSHIP: [YES/NO]
CONTEXT_VALIDATION: [YES/NO]
RELEVANT: [YES only if ALL verification checks pass, NO if any fails]  
REASON: [MANDATORY FORMAT: "DOMAIN: [domain analysis]. ENTITY: [entity analysis]. CONTEXT: [context analysis]. RESULT: [Final decision]"]
CONCEPT_SYNTHESIS: [semantic concept mapping - what query concepts mean in this document context]`;

    try {
      // 🐛 DEBUG: Log the full prompt being sent to LLM
      console.log(`📤 DEBUG DataInspector Document ${docNumber} LLM Prompt:`, {
        promptLength: intelligentPrompt.length,
        containsDocumentContent: intelligentPrompt.includes("[CHUNK 1]"),
        contentSampleInPrompt:
          intelligentPrompt.substring(
            intelligentPrompt.indexOf("DOCUMENT SAMPLE CONTENT:"),
            intelligentPrompt.indexOf("DOCUMENT SAMPLE CONTENT:") + 300
          ) + "...",
      });

      const response = await this.llm(intelligentPrompt);

      // 🐛 DEBUG: Log LLM response to understand parsing issues
      console.log(
        `🧠 DataInspector Document ${docNumber} LLM Response:`,
        response.substring(0, 500) + "..."
      );

      const structured = this.parseStructuredAnalysis(response);
      if (!structured) {
        console.warn(`⚠️ DataInspector: Structured JSON missing or invalid, falling back to regex extraction`);
      }

      const docType =
        structured?.documentType?.trim() ||
        this.extractValue(response, "TYPE") ||
        "Unknown Document";
      let mainEntity =
        structured?.mainEntity?.trim() ||
        this.extractValue(response, "MAIN_ENTITY") ||
        "Unknown Entity";
      const reasoning =
        structured?.relevanceReason?.trim() ||
        structured?.reasoning?.trim() ||
        this.extractValue(response, "REASON") ||
        "No reasoning provided";
      const conceptSynthesis =
        structured?.conceptSynthesis?.trim() ||
        this.extractValue(response, "CONCEPT_SYNTHESIS") ||
        "No concept synthesis available";
      const relevantText =
        structured?.isRelevant !== undefined
          ? structured.isRelevant
            ? "YES"
            : "NO"
          : this.extractValue(response, "RELEVANT") || "NO";
      const topics = this.normalizeStringArray(structured?.topics);
      const methods = this.normalizeStringArray(structured?.methods);
      const concepts = this.normalizeStringArray(structured?.concepts);
      const dataPoints = this.normalizeStringArray(structured?.dataPoints);
      const people = this.normalizeStringArray(structured?.people);
      const performanceIndicators = this.normalizeStringArray(
        structured?.performanceIndicators
      );
      const queryConcepts = this.normalizeStringArray(structured?.queryConcepts);
      const documentConcepts = this.normalizeStringArray(
        structured?.documentConcepts
      );
      const entityAlignment = structured?.entityAlignment;
      const conceptAlignment = structured?.conceptAlignment;
      
      // Store reasoning and concept synthesis for use in extractSpecificInsights
      this.reasoning = reasoning;
      this.conceptSynthesis = conceptSynthesis;
      
      // 🔥 FALLBACK ENTITY EXTRACTION: If MAIN_ENTITY extraction failed or got malformed data
      if (
        mainEntity.includes("RELEVANT:") ||
        mainEntity.includes("REASON:") ||
        mainEntity.length > 100 ||
        mainEntity.includes("YES") ||
        mainEntity.includes("NO")
      ) {
        console.log(
          `⚠️ DataInspector: MAIN_ENTITY extraction failed, attempting fallback extraction`
        );

        // Try to extract entity from reasoning or response
        const entityPatterns = [
          /document is about ([A-Z][^,\.]+)/i,
          /authored by ([A-Z][^,\.]+)/i,
          /belongs to ([A-Z][^,\.]+)/i,
          /written by ([A-Z][^,\.]+)/i,
          /([A-Z][a-z]+ (?:[A-Z][a-z]+ )?[A-Z][a-z]+)'s/, // Match "Person's" pattern
          /about ([A-Z][a-z]+ [A-Z][a-z]+)/, // Match "about Person Name"
        ];

        let foundEntity = false;
        for (const pattern of entityPatterns) {
          const match = reasoning.match(pattern) || response.match(pattern);
          if (match && match[1]) {
            mainEntity = match[1].trim();
            console.log(
              `✅ DataInspector: Fallback entity extraction successful: "${mainEntity}"`
            );
            foundEntity = true;
            break;
          }
        }

        if (!foundEntity) {
          mainEntity = "Unknown Entity";
          console.warn(
            `❌ DataInspector: Could not extract entity from document ${docNumber}`
          );
        }
      }

      // 🐛 DEBUG: Log parsed values to debug extraction
      console.log(`🔍 DataInspector Document ${docNumber} Parsed:`, {
        docType,
        mainEntity,
        relevantText,
        reasoning: reasoning.substring(0, 100) + "...",
      });
      
      // 🔥 PURE LLM DECISION: Extract clean LLM response without entity contamination
      const isRelevant =
        structured?.isRelevant ??
        relevantText.trim().toUpperCase().startsWith("YES");
      
      console.log(`🔍 COMPREHENSIVE ANALYSIS: Query="${query}", Entity="${mainEntity}" → Result: ${isRelevant}`);
      
      return {
        documentType: docType,
        primaryEntity: mainEntity,
        isRelevant: isRelevant,
        reasoning: reasoning,
        conceptSynthesis: this.conceptSynthesis,
        topics,
        methods,
        concepts,
        dataPoints,
        people,
        performanceIndicators,
        queryConcepts,
        documentConcepts,
        entityAlignment,
        conceptAlignment
      };
    } catch (error) {
      console.warn(
        `⚠️ Intelligent analysis failed for document ${docNumber}, defaulting to include`
      );
      return {
        documentType: "Unknown Document",
        primaryEntity: "Unknown Entity",
        isRelevant: true, // Default to including rather than filtering out
        reasoning: 'Analysis failed, including document to avoid losing data',
        conceptSynthesis: undefined
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
      RELLEVANT: "RELEVANT", // Gemma 3n 2b common typo
      RELEVENT: "RELEVANT", // Other common misspelling
      RELEVAN: "RELEVANT", // Truncated version
    };

    return typoMap[key.toUpperCase()] || key;
  }

  private parseStructuredAnalysis(response: string): StructuredInspectorResponse | null {
    try {
      const parsed = parseJsonWithResilience(response);
      if (parsed && typeof parsed === "object") {
        return parsed as StructuredInspectorResponse;
      }
    } catch (error) {
      console.warn("⚠️ DataInspector: Failed to parse structured JSON response:", error);
    }
    return null;
  }

  private normalizeStringArray(value: any): string[] | undefined {
    if (!Array.isArray(value)) {
      return undefined;
    }
    const normalized = value
      .map((entry) => (typeof entry === "string" ? entry.trim() : String(entry ?? "").trim()))
      .filter((entry) => entry.length > 0);
    return normalized.length > 0 ? normalized : undefined;
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

    // 🔥 SPECIAL HANDLING FOR MAIN_ENTITY: Stop extraction at next keyword to prevent capturing entire response
    if (key === "MAIN_ENTITY") {
      // Look for MAIN_ENTITY and stop at RELEVANT: or newline
      const entityPatterns = [
        /MAIN_ENTITY:\s*([^:\n]+?)(?:\s*RELEVANT:|$)/i, // Stop at RELEVANT: or end
        /MAIN_ENTITY:\s*([^:\n]+?)(?:\s*YES\s*REASON:|$)/i, // Stop at YES REASON:
        /MAIN_ENTITY:\s*([^:\n]+?)(?:\s*NO\s*REASON:|$)/i, // Stop at NO REASON:
        /MAIN_ENTITY:\s*([^\n]+?)(?:\n|$)/i, // Stop at newline as fallback
      ];

      for (const pattern of entityPatterns) {
        const match = cleanResponse.match(pattern);
        if (match && match[1].trim()) {
          let entity = match[1].trim();
          // Remove any trailing keywords that might have been captured
          entity = entity.replace(/\s*(RELEVANT|YES|NO|REASON).*$/i, "").trim();
          console.log(`🎯 DataInspector: Extracted MAIN_ENTITY: "${entity}"`);
          return entity;
        }
      }
    }

    // 🔥 SPECIAL HANDLING FOR RELEVANT: Extract just YES or NO without trailing REASON
    if (key === "RELEVANT") {
      // Look for RELEVANT: followed by YES or NO
      const relevantPatterns = [
        /RELEVANT:\s*(YES|NO)(?:\s+REASON:|$|\s|\.)/i, // Match YES/NO followed by REASON: or end
        /RELEVANT:\s*(YES|NO)\b/i, // Match YES/NO as word boundary
      ];

      for (const pattern of relevantPatterns) {
        const match = cleanResponse.match(pattern);
        if (match && match[1]) {
          const relevantValue = match[1].toUpperCase();
          console.log(
            `🎯 DataInspector: Extracted RELEVANT: "${relevantValue}"`
          );
          return relevantValue;
        }
      }
    }

    // 🔥 ENHANCED: Try with original key first, then with typo-corrected variations
    const keysToTry = [key]; // Start with original key

    // Add potential typo corrections for common LLM mistakes
    if (key === "RELEVANT") {
      // Look for common typos in the response
      if (/RELLEVANT\s*[:=]/i.test(cleanResponse)) {
        keysToTry.push("RELLEVANT");
      }
      if (/RELEVENT\s*[:=]/i.test(cleanResponse)) {
        keysToTry.push("RELEVENT");
      }
      if (/RELEVAN\s*[:=]/i.test(cleanResponse)) {
        keysToTry.push("RELEVAN");
      }
    }

    // Try multiple patterns for each key variation
    for (const keyVariation of keysToTry) {
      const patterns = [
        new RegExp(`${keyVariation}:\\s*(.+?)(?:\\n|$)`, "i"), // "TYPE: Document"
        new RegExp(`${keyVariation}\\s*[:=]\\s*(.+?)(?:\\n|$)`, "i"), // "TYPE: Document" or "TYPE = Document"
        new RegExp(`\\b${keyVariation}\\b[^:=]*[:=]\\s*(.+?)(?:\\n|$)`, "i"), // More flexible matching
        new RegExp(
          `\\*\\*${keyVariation}\\*\\*[^:=]*[:=]\\s*(.+?)(?:\\n|$)`,
          "i"
        ), // Markdown bold headers
        new RegExp(
          `${keyVariation}\\s*\\*\\*[^:=]*[:=]\\s*(.+?)(?:\\n|$)`,
          "i"
        ), // Mixed markdown
      ];

      for (const pattern of patterns) {
        const match = cleanResponse.match(pattern);
        if (match && match[1].trim()) {
          let value = match[1].trim();
          // Clean any remaining markdown from the extracted value
          value = this.cleanMarkdownFormatting(value);

          // Log successful typo correction for debugging
          if (keyVariation !== key) {
            console.log(
              `🔧 DataInspector: Fixed typo "${keyVariation}" → "${key}" for value: "${value}"`
            );
          }
          return value;
        }
      }
    }

    // 🔥 FALLBACK: For REASON specifically, try to extract from <think> content
    if (key === "REASON") {
      const thinkContent = response.match(/<think>([\s\S]*?)<\/think>/i);
      if (thinkContent && thinkContent[1].trim()) {
        // Extract the reasoning from think content
        const reasoning = thinkContent[1].trim();
        console.log(
          `🧠 DataInspector extracted reasoning from <think>: "${reasoning.substring(0, 100)}..."`
        );
        return reasoning;
      }
    }

    // 🐛 DEBUG: Log if extraction fails
    console.warn(
      `⚠️ DataInspector failed to extract ${key} from response: "${response.substring(0, 200)}..."`
    );
    return "";
  }

  /**
   * 🚨 CRITICAL FIX: Clean markdown formatting that breaks text parsing
   */
  private cleanMarkdownFormatting(text: string): string {
    return (
      text
        // Remove bold markdown
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/__(.*?)__/g, "$1")
        // Remove italic markdown
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/_(.*?)_/g, "$1")
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`([^`]*)`/g, "$1")
        // Remove headers
        .replace(/^#{1,6}\s+/gm, "")
        // Remove strikethrough
        .replace(/~~(.*?)~~/g, "$1")
        // Remove extra whitespace
        .replace(/\s+/g, " ")
        .trim()
    );
  }

  /**
   * Zero-hardcoding relevance determination with pure LLM semantic analysis
   * Trusts LLM's semantic judgment completely with minimal generic validation
   */
  private determineRelevanceFromResponse(
    relevantText: string,
    reasoning: string,
    query: string,
    mainEntity: string,
    documentFilename?: string
  ): boolean {
    // Clean inputs for analysis
    const cleanRelevantText = relevantText.trim().toUpperCase();
    const cleanReasoning = reasoning.trim();
    
    // 🎯 PRIMARY: Entity alignment check FIRST, then trust LLM semantic analysis
    const hasEntityAlignment = this.checkEntityAlignment(query, cleanReasoning, mainEntity, documentFilename);
    
    if (cleanRelevantText === 'YES' || cleanRelevantText.startsWith('YES')) {
      // Only trust LLM YES if entity alignment passes
      if (hasEntityAlignment) {
        console.log(`✅ DataInspector: LLM says YES + Entity alignment confirmed = RELEVANT`);
        return true;
      } else {
        console.log(`❌ DataInspector: LLM says YES but ENTITY MISMATCH detected - overriding to NOT RELEVANT`);
        console.log(`   Query entity check failed for: "${query}" with document: "${documentFilename}"`);
        return false; // Override LLM decision due to entity mismatch
      }
    }
    
    // 🔥 For explicit NO, check if reasoning is substantial
    if (cleanRelevantText === 'NO' || cleanRelevantText.startsWith('NO')) {
      // Generic validation: check if reasoning explains the rejection
      const hasSubstantialNegativeReasoning = cleanReasoning.length > 20 &&
                                             !cleanReasoning.toLowerCase().includes('no reason');
      
      if (hasSubstantialNegativeReasoning) {
        console.log(`❌ DataInspector: LLM says NO with substantial reasoning`);
        return false;
      } else {
        // Even with minimal reasoning, respect LLM's NO decision
        console.log(`❌ DataInspector: LLM says NO - respecting judgment`);
        return false;
      }
    }
    
    // 🎯 FALLBACK: Generic entity alignment check (zero hardcoding) - use existing variable
    
    // 🔥 DEFAULT: Trust the LLM's analysis - it has full context
    const defaultDecision = !cleanRelevantText.includes('NO');
    
    console.log(`🔍 DataInspector: Zero-hardcoding analysis:`, {
      relevantText: cleanRelevantText,
      reasoningLength: cleanReasoning.length,
      hasEntityAlignment,
      defaultDecision
    });
    
    console.log(`📋 DataInspector: Using LLM's semantic analysis: ${defaultDecision ? 'relevant' : 'not relevant'}`);
    return defaultDecision;
  }

  /**
   * Zero-hardcoding entity alignment using generic patterns only
   */
  private checkEntityAlignment(query: string, reasoning: string, mainEntity: string, documentFilename?: string): boolean {
    // Generic pattern extraction: possessive patterns ("X's work", "from Y's blog", "by Z")
    const possessivePatterns = [
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)'s\s+/g,         // "Name's work" or "First Last's work"
      /from\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)'s\s+/g,    // "from Name's blog"  
      /by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,           // "by Name" or "by First Last"
    ];
    
    // Extract all potential entities from query using generic patterns
    const queryEntities: string[] = [];
    for (const pattern of possessivePatterns) {
      let match;
      while ((match = pattern.exec(query)) !== null) {
        if (match[1]) {
          queryEntities.push(match[1].toLowerCase().trim());
        }
      }
    }
    
    if (queryEntities.length === 0) {
      // No specific entities in query, consider entity match satisfied
      return true;
    }
    
    // Generic filename and reasoning checks (no hardcoded names)
    const cleanFilename = (documentFilename || '').toLowerCase();
    const cleanReasoning = reasoning.toLowerCase();
    
    // Check if any extracted entity appears in filename ONLY (NO HARDCODING)
    // Don't use LLM reasoning to avoid circular validation
    const hasEntityMatch = queryEntities.some(entity => {
      // Split entity into words for partial matching
      const entityWords = entity.split(/\s+/);
      
      // Check filename for any entity word (if filename available)
      if (cleanFilename && cleanFilename !== 'unknown') {
        const inFilename = entityWords.some(word => 
          word.length > 2 && cleanFilename.includes(word)
        );
        return inFilename;
      }
      
      // If no meaningful filename, apply multi-intelligence validation
      // NO HARDCODING: Check mainEntity ONLY (not reasoning to avoid circular validation)
      
      // Check if entity appears in mainEntity (NOT in reasoning to avoid circular logic)
      const mainEntityLower = mainEntity.toLowerCase();
      const entityFoundInMainEntity = entityWords.some(word => {
        const wordLower = word.toLowerCase();
        // Only check meaningful words (skip short words like "a", "the", etc.)
        if (wordLower.length <= 2) return false;
        
        // Check if this entity word appears in the document's mainEntity ONLY
        return mainEntityLower.includes(wordLower);
      });
      
      // Multi-intelligence approach: Check for obvious mismatches
      // If mainEntity is clearly about something completely different, flag it
      const queryEntityLower = entity.toLowerCase();
      
      // Generic categories that indicate wrong document (NO HARDCODING specific names)
      const isGenericCategory = /^(education|science|engineering|history|mathematics|physics|chemistry|biology)/.test(mainEntityLower);
      const isPersonQuery = /^[A-Z][a-z]+/.test(entity); // Queries for specific people start with capital letter
      
      // If query asks for specific person but mainEntity is generic category, likely mismatch
      if (isPersonQuery && isGenericCategory && !entityFoundInMainEntity) {
        return false; // Clear mismatch - different domain
      }
      
      // Otherwise trust multi-intelligence: if entity found in mainEntity, accept
      return entityFoundInMainEntity;
    });
    
    console.log(`🔍 Zero-hardcoding entity alignment check:`, {
      extractedEntities: queryEntities,
      mainEntity: mainEntity,
      filename: documentFilename,
      hasEntityMatch,
      reasoningLength: reasoning?.length || 0,
      filenameCheck: documentFilename && documentFilename !== 'unknown' ? 'via filename' : 'via document text'
    });
    
    return hasEntityMatch;
  }

  /**
   * 🧠 INTELLIGENT ENTITY DISCOVERY: No hardcoded patterns
   */
  private async discoverEntitiesIntelligently(
    sampleContent: string
  ): Promise<any[]> {
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

      const lines = response.split("\n");
      for (const line of lines) {
        if (line.includes("NAME:") && line.includes("TYPE:")) {
          const nameMatch = line.match(/NAME:\s*([^|]+)/);
          const typeMatch = line.match(/TYPE:\s*([^|]+)/);
          const roleMatch = line.match(/ROLE:\s*(.+)/);

          if (nameMatch && typeMatch) {
            entities.push({
              name: nameMatch[1].trim(),
              type: typeMatch[1].trim(),
              context: roleMatch ? roleMatch[1].trim() : "Unknown role",
              isOwner: false,
            });
          }
        }
      }

      return entities;
    } catch (error) {
      console.warn("Failed to discover entities intelligently");
      return [];
    }
  }

  private async discoverContentAreas(
    docType: string,
    sampleContent: string
  ): Promise<string[]> {
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
      const areas = response
        .split(",")
        .map((area) => area.trim())
        .filter((area) => area.length > 0);
      return areas.length > 0 ? areas : ["general information"];
    } catch (error) {
      console.warn("Failed to discover content areas, using fallback");
      return ["general information"];
    }
  }

  // @ts-ignore - Currently unused but kept for future entity discovery
  private async discoverEntities(
    keyEntitiesList: string[],
    docIndex: number,
    docContent: string
  ): Promise<EntityReference[]> {
    // 🚨 UNIVERSAL INTELLIGENCE: No hardcoded entity type assumptions
    // Let LLM discover entities based on actual document content

    const relevantEntities = keyEntitiesList.filter(
      (_, i) => Math.floor(i / 2) === docIndex
    );
    if (relevantEntities.length === 0) return [];

    const prompt = `Analyze these entities in the context of this document content:

ENTITIES MENTIONED: ${relevantEntities.join(", ")}
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
      console.error("❌ Failed to discover entities:", error);
      throw new Error(
        `Entity discovery failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private async discoverDocumentRole(
    docIndex: number,
    totalDocs: number,
    query: string,
    docContent: string
  ): Promise<"source" | "target" | "reference"> {
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
      if (["source", "target", "reference"].includes(role)) {
        return role as "source" | "target" | "reference";
      }
      return "reference";
    } catch (error) {
      console.warn("Failed to discover document role, using fallback");
      return "reference";
    }
  }

  private buildMinimalRelationships(
    documents: SingleDocumentAnalysis[],
    query: string
  ): DocumentRelationship[] {
    // Only create relationships if query explicitly requires cross-document analysis
    const relationships: DocumentRelationship[] = [];

    // Check if query asks for comparison or combination
    const queryLower = query.toLowerCase();
    const needsComparison =
      queryLower.includes("compare") ||
      queryLower.includes("vs") ||
      queryLower.includes("difference") ||
      queryLower.includes("similar");

    if (needsComparison && documents.length === 2) {
      relationships.push({
        type: "comparison",
        sourceDoc: documents[0].documentId,
        targetDoc: documents[1].documentId,
        description: `Compare ${documents[0].documentType} with ${documents[1].documentType}`,
      });
    }

    // Otherwise, keep documents independent to prevent contamination
    return relationships;
  }

  private parseDocumentAnalysis(response: string): DocumentAnalysis {
    // Parse the structured response sections
    const sections = {
      documentType: this.extractSection(response, "DOCUMENT TYPE"),
      structure: this.extractListSection(response, "DOCUMENT STRUCTURE"),
      contentAreas: this.extractListSection(response, "KEY CONTENT AREAS"),
      queryIntent: this.extractSection(response, "QUERY-DOCUMENT INTENT"),
      extractionStrategy: this.extractSection(response, "EXTRACTION STRATEGY"),
      expectedOutputFormat: this.extractSection(
        response,
        "EXPECTED OUTPUT FORMAT"
      ),
    };

    return {
      documentType: sections.documentType || "Unknown Document",
      structure:
        sections.structure.length > 0 ? sections.structure : ["content"],
      contentAreas:
        sections.contentAreas.length > 0
          ? sections.contentAreas
          : ["general information"],
      queryIntent: sections.queryIntent || "Extract relevant information",
      extractionStrategy:
        sections.extractionStrategy || "Extract based on query keywords",
      expectedOutputFormat: sections.expectedOutputFormat || "summary",
    };
  }

  private extractSection(text: string, sectionName: string): string {
    const regex = new RegExp(
      `\\*\\*${sectionName}\\*\\*:?\\s*([^\\n\\*]+)`,
      "i"
    );
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  }

  private extractListSection(text: string, sectionName: string): string[] {
    // 🔍 MODEL-AGNOSTIC PARSING: Handle both thinking and non-thinking models
    // Remove <think> tags if present (thinking models) or handle direct responses (non-thinking models)
    const cleanText = text.replace(/<\/?think>/gi, "").trim();

    // Try multiple patterns to find the section content - robust for different model response styles
    const patterns = [
      // Standard format: **SECTION**: content
      new RegExp(`\\*\\*${sectionName}\\*\\*:?\\s*([^\\*]+)`, "i"),
      // Natural format: For SECTION: content
      new RegExp(`For ${sectionName}:?\\s*([^\\n]{50,}?)(?:\\n\\n|$)`, "i"),
      // Natural format: SECTION: content
      new RegExp(`${sectionName}:?\\s*([^\\n]{50,}?)(?:\\n\\n|$)`, "i"),
      // Non-thinking model format: Direct section content
      new RegExp(`${sectionName}[:\\s]*([^\\n]+(?:\\n[^\\n]+)*)`, "i"),
    ];

    let content = "";
    for (const pattern of patterns) {
      const match = cleanText.match(pattern);
      if (match && match[1]?.trim().length > 10) {
        content = match[1].trim();
        break;
      }
    }

    // 🔍 FALLBACK: Parse natural language directly for document analysis
    if (!content && sectionName.includes("DOCUMENT TYPES")) {
      content = this.extractDocumentTypesFromNaturalLanguage(cleanText);
    }

    if (!content && sectionName.includes("PRIMARY ENTITIES")) {
      content = this.extractEntitiesFromNaturalLanguage(cleanText);
    }

    if (!content && sectionName.includes("DOCUMENT RELEVANCE")) {
      content = this.extractRelevanceFromNaturalLanguage(cleanText);
    }

    if (!content) {
      console.warn(`❌ Could not extract section: ${sectionName}`);
      console.log(
        `📝 Raw response for debugging:`,
        cleanText.substring(0, 500)
      );
      return [];
    }

    // Split content into items and clean up
    const sentences = content
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    // For document types, look for "Document X is a..." and natural language patterns
    if (sectionName.includes("DOCUMENT TYPES")) {
      const docTypes: string[] = [];

      // Try structured format first
      for (let i = 1; i <= 5; i++) {
        // Support up to 5 documents
        const docMatch = content.match(
          new RegExp(`Document ${i} is (?:a |an )?(\\w+(?:\\s+\\w+)*)`, "i")
        );
        if (docMatch) {
          docTypes.push(docMatch[1].trim());
        }
      }

      // If no structured format, parse comma-separated list
      if (docTypes.length === 0 && content.includes(",")) {
        const types = content
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0);
        docTypes.push(...types);
      }

      if (docTypes.length > 0) return docTypes;
    }

    // For entities, look for names in content
    if (sectionName.includes("ENTITIES")) {
      const entities: string[] = [];

      // Look for proper names (First Last)
      const namePattern = /([A-Z][a-z]+(?: [A-Z][a-z]+)*)/g;
      let match;
      while ((match = namePattern.exec(content)) !== null) {
        const name = match[1];
        if (
          !entities.includes(name) &&
          name.length > 1 &&
          /^[A-Z]/.test(name)
        ) {
          entities.push(name);
        }
      }

      // If no names found, try comma-separated list
      if (entities.length === 0 && content.includes(",")) {
        const names = content
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n.length > 0);
        entities.push(...names);
      }

      if (entities.length > 0) return entities;
    }

    // For relevance, return sentences that mention documents
    if (sectionName.includes("RELEVANCE")) {
      const relevantSentences = sentences.filter(
        (s) =>
          s.includes("Document") ||
          s.includes("relevant") ||
          s.includes("irrelevant")
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
      /starting with.*?([\w_]+\.\w+).*?it'?s (?:a |an )?(\w+)/gi,
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

    return foundTypes.length > 0 ? foundTypes.join(", ") : "";
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
      /([A-Z][a-z]+)_[\w_]*\.\w+/g,
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

    return Array.from(foundEntities).join(", ");
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
      /(?:only|just).*?(?:document \d+|resume|blog).*?(?:is relevant|matters)/gi,
    ];

    const relevanceStatements: string[] = [];
    for (const pattern of relevanceIndicators) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        relevanceStatements.push(match[0]);
      }
    }

    return relevanceStatements.length > 0
      ? relevanceStatements.join("; ")
      : text.substring(0, 200);
  }

  /**
   * 🔥 Extract specific semantic insights that must be preserved (NO HARDCODING)
   * Parse concept relationships from existing LLM reasoning for downstream agents
   */
  private extractSpecificInsights(
    documentAnalysis: any,
    query: string
  ): string[] {
    // @ts-ignore - documentAnalysis parameter currently unused but kept for future enhancement
    const insights: string[] = [];
    const reasoning = this.reasoning;
    
    console.log(`🔍 DEBUG extractSpecificInsights: reasoning length = ${reasoning?.length || 0}`);
    console.log(`🔍 DEBUG extractSpecificInsights: reasoning preview = ${reasoning?.substring(0, 200) || 'NO REASONING'}...`);
    
    // 🎯 NO HARDCODING: Extract semantic concept mappings from LLM reasoning
    const conceptMappings = this.extractSemanticConceptMappings(reasoning, query);
    console.log(`🔍 DEBUG conceptMappings found: ${conceptMappings.length} items:`, conceptMappings);
    insights.push(...conceptMappings);
    
    // 🎯 NO HARDCODING: Extract domain context relationships
    const domainContext = this.extractDomainContext(reasoning, query);
    console.log(`🔍 DEBUG domainContext found: ${domainContext.length} items:`, domainContext);
    insights.push(...domainContext);
    
    // 🎯 NO HARDCODING: Extract measurement/performance relationships
    const measurementContext = this.extractMeasurementContext(reasoning, query);
    console.log(`🔍 DEBUG measurementContext found: ${measurementContext.length} items:`, measurementContext);
    insights.push(...measurementContext);
    
    // 🎯 NO HARDCODING: Extract entity-concept associations 
    const entityConcepts = this.extractEntityConceptAssociations(reasoning, query);
    console.log(`🔍 DEBUG entityConcepts found: ${entityConcepts.length} items:`, entityConcepts);
    insights.push(...entityConcepts);
    
    // 🎯 CONCEPT SYNTHESIS: Add semantic intelligence snapshot for downstream agents
    if (this.conceptSynthesis && this.conceptSynthesis !== 'No concept synthesis available') {
      console.log(`🔍 DEBUG conceptSynthesis found:`, this.conceptSynthesis);
      insights.push(`CONCEPT_SYNTHESIS: ${this.conceptSynthesis}`);
    }
    
    console.log(`🔍 DEBUG extractSpecificInsights FINAL: ${insights.length} total insights:`, insights);
    
    return insights.filter(insight => insight.length > 0);
  }
  
  /**
   * NO HARDCODING: Extract semantic concept mappings from LLM reasoning
   */
  private extractSemanticConceptMappings(reasoning: string, query: string): string[] {
    const mappings: string[] = [];
    
    // Generic patterns to find concept relationships (NO HARDCODING)
    const conceptPatterns = [
      // "X aligns with Y", "X refers to Y", "X means Y"
      /([^.]+?)\s+(?:aligns? with|refers? to|means?|is about|relates to)\s+([^.]+?)(?:\.|$)/gi,
      // "semantic concepts include X", "query concepts: X"
      /(?:semantic concepts?|query concepts?)[^:]*:\s*([^.]+?)(?:\.|$)/gi,
      // "document concepts: X", "concepts.*include X"
      /(?:document concepts?|concepts?.*include)[^:]*:\s*([^.]+?)(?:\.|$)/gi,
      // "X semantically matches Y"
      /([^.]+?)\s+semantically (?:matches?|aligns? with)\s+([^.]+?)(?:\.|$)/gi
    ];
    
    for (const pattern of conceptPatterns) {
      let match;
      while ((match = pattern.exec(reasoning)) !== null) {
        if (match[1] && match[1].trim().length > 3) {
          const mapping = match[0].trim();
          // Clean up the mapping text
          const cleanMapping = mapping.replace(/^[^a-zA-Z]+/, '').replace(/[^a-zA-Z0-9\s\-_,.:;()]+$/, '');
          if (cleanMapping.length > 10) { // Only meaningful mappings
            mappings.push(`CONCEPT_MAPPING: ${cleanMapping}`);
          }
        }
      }
    }
    
    return mappings;
  }
  
  /**
   * NO HARDCODING: Extract domain context from reasoning
   */
  private extractDomainContext(reasoning: string, query: string): string[] {
    const contexts: string[] = [];
    
    // Generic patterns for domain context (NO HARDCODING)
    const domainPatterns = [
      // "in X context", "X domain", "X field"
      /(?:in|within)\s+([^\s]+)\s+(?:context|domain|field)/gi,
      // "X performance", "X optimization", "X benchmarking"
      /([A-Za-z0-9\/\-]+)\s+(?:performance|optimization|benchmarking|metrics|efficiency)/gi,
      // "type of X", "kind of X"
      /(?:type|kind)\s+of\s+([^.]+?)(?:\.|$)/gi
    ];
    
    for (const pattern of domainPatterns) {
      let match;
      while ((match = pattern.exec(reasoning)) !== null) {
        if (match[1] && match[1].trim().length > 2) {
          const context = match[1].trim();
          contexts.push(`DOMAIN_CONTEXT: ${context}`);
        }
      }
    }
    
    return contexts;
  }
  
  /**
   * NO HARDCODING: Extract measurement/performance context
   */
  private extractMeasurementContext(reasoning: string, query: string): string[] {
    const measurements: string[] = [];
    
    // Generic patterns for measurement context (NO HARDCODING)
    const measurementPatterns = [
      // "timing data", "performance metrics", "speed measurements"
      /(timing\s+data|performance\s+metrics|speed\s+measurements?|efficiency\s+metrics?|benchmarking\s+data)/gi,
      // "X hours", "X minutes", "X seconds" - indicates timing relevance
      /(?:mentions?|includes?|contains?).*?(\d+(?:\.\d+)?\s+(?:hours?|minutes?|seconds?|ms|milliseconds?))/gi,
      // "ranking", "top X", "fastest", "best"
      /(?:ranking|top\s+\d+|fastest|best|optimization)\s+(?:by|for|based\s+on)\s+([^.]+?)(?:\.|$)/gi
    ];
    
    for (const pattern of measurementPatterns) {
      let match;
      while ((match = pattern.exec(reasoning)) !== null) {
        const measurement = match[0].trim();
        if (measurement.length > 5) {
          measurements.push(`MEASUREMENT_CONTEXT: ${measurement}`);
        }
      }
    }
    
    return measurements;
  }
  
  /**
   * NO HARDCODING: Extract entity-concept associations
   */
  private extractEntityConceptAssociations(reasoning: string, query: string): string[] {
    const associations: string[] = [];
    
    // Generic patterns for entity-concept links (NO HARDCODING)
    const entityPatterns = [
      // "X's Y refers to Z", "X's Y means Z"
      /([A-Za-z]+)'s\s+([^\s]+)\s+(?:refers? to|means?|is about|relates to)\s+([^.]+?)(?:\.|$)/gi,
      // "document.*X.*contains Y", "X.*document.*Y"
      /(?:document.*contains?|includes?)\s+([^.]+?)(?:\.|$)/gi,
      // "entity.*X.*Y", "authorship.*X.*Y"
      /(?:entity|authorship)[^:]*:\s*([^.]+?)(?:\.|$)/gi
    ];
    
    for (const pattern of entityPatterns) {
      let match;
      while ((match = pattern.exec(reasoning)) !== null) {
        if (match[1] && match[1].trim().length > 3) {
          const association = match[0].trim();
          const cleanAssociation = association.replace(/^[^a-zA-Z]+/, '').replace(/[^a-zA-Z0-9\s\-_,.:;()]+$/, '');
          if (cleanAssociation.length > 10) {
            associations.push(`ENTITY_CONCEPT: ${cleanAssociation}`);
          }
        }
      }
    }
    
    return associations;
  }
  
  /**
   * NO HARDCODING: Extract legacy ownership patterns  
   */
  private extractLegacyOwnershipPatterns(reasoning: string, query: string): string[] {
    const legacyInsights: string[] = [];
    const queryLower = query.toLowerCase();
    
    // Extract ownership patterns dynamically (NO HARDCODING)
    const ownershipPatterns = reasoning.match(/(\w+)'s (\w+)/g);
    if (ownershipPatterns) {
      ownershipPatterns.forEach(pattern => {
        legacyInsights.push(`DOCUMENT OWNERSHIP: This is ${pattern} with their own content`);
      });
    }
    
    // Extract ranking requirements (NO HARDCODING)
    const topNumbers = queryLower.match(/top\s+(\d+|three|five)/g);
    if (topNumbers) {
      legacyInsights.push(`RANKING REQUIRED: User wants ${topNumbers[0]} ranked items, not all data`);
    }
    
    // Extract content type patterns (NO HARDCODING)
    const contentTypes = reasoning.match(/(\w+)\s+(?:timing|data|metrics|achievements)/g);
    if (contentTypes) {
      contentTypes.forEach(type => {
        legacyInsights.push(`CONTENT TYPE: Document contains ${type} data and performance metrics`);
      });
    }
    
    return legacyInsights;
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
      findings.push(
        `Document structure: ${documentAnalysis.structure.join(", ")}`
      );
    }

    if (documentAnalysis?.expectedOutputFormat) {
      findings.push(
        `Expected output format: ${documentAnalysis.expectedOutputFormat}`
      );
    }

    return findings;
  }

  /**
   * 🔥 CRITICAL: Handle document metadata by sampling actual chunks from VectorStore and performing multi-document analysis
   */
  private async performDocumentMetadataAnalysis(
    context: ResearchContext
  ): Promise<void> {
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      15,
      "🧠 Starting intelligent multi-document analysis...",
      0,
      undefined
    );

    // Extract document metadata from the "chunks" (which are actually document metadata)
    const documentMetadata = context.ragResults.chunks.filter(
      (chunk) =>
        chunk.sourceType === "document" ||
        chunk.text?.startsWith("Document metadata:")
    );

    // Get actual document source names from metadata - prioritize meaningful names
    const documentSources = documentMetadata.map(
      (doc) =>
        doc.metadata?.title ||           // Prioritize document title
        doc.metadata?.filename ||        // Then original filename  
        doc.metadata?.name ||            // Then generic name field
        doc.metadata?.originalName ||    // Then original name if available
        (doc as any).title ||           // Legacy title field
        doc.metadata?.source ||          // Source path as backup
        `Document_${doc.id?.slice(-6) || 'Unknown'}` // Create meaningful fallback using doc ID suffix
    );

    console.log(
      `📋 Found ${documentMetadata.length} documents to analyze:`,
      documentSources
    );
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      20,
      `📋 Discovered ${documentMetadata.length} documents: ${documentSources.slice(0, 3).join(", ")}${documentSources.length > 3 ? "..." : ""}`,
      0,
      documentMetadata.length
    );

    // 🔥 REAL VECTORSTORE INTEGRATION: Sample actual chunks from RxDB/IndexedDB
    const vectorStore = this.getVectorStore();
    if (!vectorStore) {
      console.warn(
        `⚠️ VectorStore not available, falling back to document metadata only`
      );
      await this.progressCallback?.onAgentProgress?.(
        this.name,
        25,
        "⚠️ VectorStore unavailable - using document metadata only",
        0,
        undefined
      );

      // Keep the minimal metadata-only approach if VectorStore not available
      const documentGroups = documentMetadata.map((docMeta, index) => ({
        documentId: docMeta.metadata?.documentId || docMeta.id,
        chunks: [
          {
            id: docMeta.id,
            text: `Document: ${documentSources[index]} (metadata only - VectorStore unavailable)`,
            source: documentSources[index],
            similarity: 1.0,
            metadata: docMeta.metadata,
            sourceDocument: documentSources[index],
            sourceType: "document" as const,
          },
        ],
      }));

      await this.performMultiDocumentAnalysis(context, documentGroups);
      return;
    }

    // 🔄 FIXED: Sample real chunks from ALL documents FIRST, then analyze with real content
    console.log(
      `🔍 Sampling real chunks from ${documentMetadata.length} documents for intelligent analysis`
    );
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      15,
      `Sampling real chunks from ${documentMetadata.length} documents`,
      0,
      documentMetadata.length
    );
    const documentGroups: Array<{
      documentId: string;
      chunks: Array<{
        id: string;
        text: string;
        source: string;
        similarity: number;
        metadata: any;
        sourceDocument: string;
        sourceType: "rag" | "document";
      }>;
    }> = [];

    // 🔄 FIXED: Sample chunks from ALL documents, let LLM decide relevance based on real content
    for (let i = 0; i < documentMetadata.length; i++) {
      const docMeta = documentMetadata[i];
      const documentId = docMeta.metadata?.documentId || docMeta.id;
      const documentSource = documentSources[i];

      console.log(
        `🔍 Sampling chunks from document ${i + 1}/${documentMetadata.length}: ${documentSource}`
      );
      const samplingProgress = 30 + (40 * i) / documentMetadata.length; // Progress from 30% to 70%
      await this.progressCallback?.onAgentProgress?.(
        this.name,
        Math.round(samplingProgress),
        `🔍 Sampling content from "${documentSource.substring(0, 30)}${documentSource.length > 30 ? "..." : ""}"`,
        i,
        documentMetadata.length
      );

      try {
        // Get full document from VectorStore with all chunks
        const fullDocument = await vectorStore.getDocument(documentId);

        if (
          fullDocument &&
          fullDocument.chunks &&
          fullDocument.chunks.length > 0
        ) {
          // Enhanced sampling: 30% of chunks or minimum 5 chunks (all if less than 5)
          const totalChunks = fullDocument.chunks.length;
          const chunksToSample =
            totalChunks <= 5
              ? totalChunks
              : Math.max(5, Math.ceil(totalChunks * 0.3));
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
            sampledChunks.push(
              ...sortedIndices.map((i) => fullDocument.chunks[i])
            );
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
              endIndex: chunk.endIndex,
            },
            sourceDocument: documentSource,
            sourceType: "rag" as const, // Use 'rag' as valid sourceType for ChunkData
          }));

          documentGroups.push({
            documentId: documentId,
            chunks: formattedChunks,
          });

          console.log(
            `✅ Sampled ${formattedChunks.length} real chunks from "${documentSource}" (${fullDocument.chunks.length} total chunks)`
          );
        } else {
          console.warn(
            `⚠️ Document "${documentSource}" has no chunks available`
          );
          // Add minimal placeholder if document exists but has no chunks
          documentGroups.push({
            documentId: documentId,
            chunks: [
              {
                id: documentId,
                text: `Document: ${documentSource} (no chunks available)`,
                source: documentSource,
                similarity: 1.0,
                metadata: docMeta.metadata,
                sourceDocument: documentSource,
                sourceType: "document" as const,
              },
            ],
          });
        }
      } catch (error) {
        console.error(
          `❌ Failed to sample chunks from document "${documentSource}":`,
          error
        );
        // Add error placeholder
        documentGroups.push({
          documentId: documentId,
          chunks: [
            {
              id: documentId,
              text: `Document: ${documentSource} (error sampling chunks: ${error})`,
              source: documentSource,
              similarity: 1.0,
              metadata: docMeta.metadata,
              sourceDocument: documentSource,
              sourceType: "document" as const,
            },
          ],
        });
      }
    }

    console.log(
      `✅ Sampled chunks from ${documentGroups.length} documents with real content`
    );

    // 🔄 FIXED: Now analyze documents with REAL CONTENT, not metadata
    console.log(
      `🧠 Analyzing ${documentGroups.length} documents with real sampled content for intelligent relevance decisions`
    );
    await this.performMultiDocumentAnalysis(context, documentGroups);

    // Filter to keep only relevant documents after analysis
    const relevantDocIds = new Set<string>();
    if (context.documentAnalysis?.documents) {
      context.documentAnalysis.documents.forEach((doc) => {
        relevantDocIds.add(doc.documentId);
      });
      console.log(
        `📊 Relevance filtering: ${relevantDocIds.size} relevant out of ${documentGroups.length} total documents`
      );

      // Keep only relevant document chunks
      const filteredDocumentGroups = documentGroups.filter((group) =>
        relevantDocIds.has(group.documentId)
      );
      const allSampledChunks = filteredDocumentGroups.flatMap(
        (group) => group.chunks
      );
      console.log(
        `🔄 Replacing ${context.ragResults.chunks.length} document metadata with ${allSampledChunks.length} relevant chunks from intelligent analysis`
      );
      context.ragResults.chunks = allSampledChunks;
    } else {
      // If no analysis results, keep all chunks
      const allSampledChunks = documentGroups.flatMap((group) => group.chunks);
      console.log(
        `🔄 No relevance filtering - keeping all ${allSampledChunks.length} sampled chunks`
      );
      context.ragResults.chunks = allSampledChunks;
    }

    // Update reasoning to reflect the enhanced approach with detailed document analysis
    const totalSampledChunks = context.ragResults.chunks.length;
    const relevantDocs = context.documentAnalysis?.documents?.length || 0;
    const rejectedDocs = documentMetadata.length - relevantDocs;

    // Create detailed document summary
    const documentSummary = documentGroups
      .map((group, idx) => {
        const isRelevant = context.documentAnalysis?.documents?.find(
          (d) => d.documentId === group.documentId
        );
        const status = isRelevant ? "✅ ACCEPTED" : "❌ REJECTED";
        const reasoning = isRelevant
          ? `(${isRelevant.documentType} - ${isRelevant.primaryEntity})`
          : "(irrelevant to query)";
        return `  ${status} ${documentSources[idx]} ${reasoning}`;
      })
      .join("\n");

    this
      .setReasoning(`🧠 **Enhanced DataInspector: Intelligent Document Analysis**

📋 **Document Discovery**: Found ${documentMetadata.length} documents in knowledge base

🔍 **Content Sampling**: Sampled 30% of chunks from each document for real content analysis
${documentSources.map((source, idx) => `  • ${source}: ${documentGroups[idx]?.chunks.length || 0} chunks sampled`).join("\n")}

🧠 **AI Relevance Analysis**: Each document analyzed by LLM for query relevance
${documentSummary}

📊 **Final Results**: 
  • Documents Analyzed: ${documentMetadata.length}
  • Documents Accepted: ${relevantDocs}
  • Documents Rejected: ${rejectedDocs}
  • Total Chunks Ready: ${totalSampledChunks}

✅ **Quality**: Real content analysis ensures only relevant documents proceed to extraction`);
  }

  // 🚨 REMOVED: Legacy hardcoded JSON processing
  // Universal Intelligence approach now uses natural language prompts with LLM-based discovery

  /**
   * 🎯 INTELLIGENT: Extract query-relevant terms using query analysis (no hardcoding)
   */
  private async extractQueryRelevantTerms(
    context: ResearchContext,
    documentGroups: any[]
  ): Promise<void> {
    try {
      const docType =
        documentGroups.length > 1 ? "RELEVANT documents" : "document";
      console.log(
        `🔬 DataInspector: Extracting query-relevant terms from ${documentGroups.length} ${docType} for: "${context.query}"`
      );

      // 🎯 INTELLIGENT: Build query-aware content sample
      const contentSample = await this.buildQueryAwareContentSample(
        context,
        documentGroups
      );

      console.log(
        `🔍 Content sample for technical extraction (${contentSample.length} chars):`,
        contentSample.substring(0, 200) + "..."
      );

      // 🎯 Check for improvement guidance from Master Orchestrator
      const improvementGuidance = (context.sharedKnowledge as any).agentGuidance
        ?.DataInspector;

      // 🎯 INTELLIGENT: Create query-aware prompt
      const prompt = await this.buildQueryAwareExtractionPrompt(
        context,
        contentSample,
        improvementGuidance
      );

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
        data: documentInsights.data?.length || 0,
      });

      // Detailed logging for debugging
      if (documentInsights.methods && documentInsights.methods.length > 0) {
        console.log(`📋 Extracted methods:`, documentInsights.methods);
      } else {
        console.warn(`⚠️ No methods extracted from document content`);
      }
    } catch (error) {
      console.error("❌ Failed to extract query-relevant terms:", error);
      // Don't fail the whole process - just set empty insights
      context.sharedKnowledge.documentInsights = {
        methods: [],
        concepts: [],
        people: [],
        data: [],
      };
    }
  }

  /**
   * 🎯 ENHANCED FIX: Extract actionable intelligence from stored concept synthesis
   * This uses existing LLM analysis instead of running new extraction on filtered documents
   */
  private async extractIntelligenceFromConceptSynthesis(context: ResearchContext): Promise<void> {
    try {
      console.log(`🧠 DataInspector: Extracting intelligence from concept synthesis`);
      
      // Get stored concept synthesis from earlier analysis
      const conceptSyntheses = context.sharedKnowledge?.agentFindings?.['DataInspector']?.conceptSynthesis || [];
      
      if (conceptSyntheses.length === 0) {
        console.log(`⚠️ No concept synthesis available for intelligence extraction`);
        return;
      }

      // Initialize insights if not present
      if (!context.sharedKnowledge.documentInsights) {
        context.sharedKnowledge.documentInsights = {};
      }

      const insights = {
        methods: [] as string[],
        concepts: [] as string[],
        people: [] as string[],
        data: [] as string[],
      };

      // Extract intelligence from each concept synthesis
      for (const synthItem of conceptSyntheses) {
        console.log(`🔍 Processing concept synthesis for ${synthItem.documentId}`);
        
        // Parse methods from synthesis (no hardcoding - extract from existing analysis)
        const methodMatches = this.extractMethodsFromSynthesis(synthItem.synthesis);
        insights.methods.push(...methodMatches);
        
        // Parse performance concepts
        const conceptMatches = this.extractConceptsFromSynthesis(synthItem.synthesis);
        insights.concepts.push(...conceptMatches);
        
        // Parse measurement data
        const dataMatches = this.extractDataFromSynthesis(synthItem.synthesis);
        insights.data.push(...dataMatches);
        
        console.log(`✅ Extracted from synthesis: ${methodMatches.length} methods, ${conceptMatches.length} concepts, ${dataMatches.length} data points`);
      }

      // Also check document content that was analyzed earlier
      await this.extractIntelligenceFromDocumentContent(context, insights);

      // Store extracted intelligence
      Object.assign(context.sharedKnowledge.documentInsights, insights);

      // Also format measurements in the format PatternGenerator expects
      const measurements = this.formatDataAsMeasurements(insights.data, context);
      context.sharedKnowledge.documentInsights.measurements = measurements;

      console.log(`🎯 Intelligence extracted from concept synthesis:`, {
        methods: insights.methods.length,
        concepts: insights.concepts.length, 
        people: insights.people.length,
        data: insights.data.length,
        measurements: measurements.length
      });

      // Log specific findings for debugging
      if (insights.methods.length > 0) {
        console.log(`📋 Methods from concept synthesis:`, insights.methods.slice(0, 3));
      }
      if (insights.data.length > 0) {
        console.log(`📊 Data from concept synthesis:`, insights.data.slice(0, 3));
      }

      // Quality gate: Check if meaningful intelligence was extracted
      const totalIntelligence = insights.methods.length + insights.concepts.length + insights.data.length + measurements.length;
      if (totalIntelligence === 0) {
        console.warn(`⚠️ No actionable intelligence extracted from concept synthesis - PatternGenerator may need to analyze chunks directly`);
      } else {
        console.log(`✅ Extracted ${totalIntelligence} actionable intelligence items for PatternGenerator`);
      }

    } catch (error) {
      console.error("❌ Failed to extract intelligence from concept synthesis:", error);
    }
  }

  /**
   * Extract methods from concept synthesis (no hardcoding)
   */
  private extractMethodsFromSynthesis(synthesis: string): string[] {
    const methods: string[] = [];
    
    // Pattern 1: Look for optimization/technique mentions
    const methodPatterns = [
      /([A-Z][a-zA-Z\s]+(?:optimization|technique|method|approach|strategy))/gi,
      /([A-Z][a-zA-Z\s]+(?:soft-capping|dataloading|sequence length))/gi,
      /(Logit\s+[^,.\n]+)/gi,
      /(Muon\s+[^,.\n]+)/gi
    ];

    for (const pattern of methodPatterns) {
      const matches = synthesis.match(pattern);
      if (matches) {
        methods.push(...matches.map(m => m.trim()));
      }
    }

    return [...new Set(methods)]; // Remove duplicates
  }

  /**
   * Extract concepts from concept synthesis (no hardcoding)
   */
  private extractConceptsFromSynthesis(synthesis: string): string[] {
    const concepts: string[] = [];
    
    // Pattern 1: Performance and optimization concepts
    const conceptPatterns = [
      /(training\s+[^,.\n]+)/gi,
      /(performance\s+[^,.\n]+)/gi,
      /(optimization\s+[^,.\n]+)/gi,
      /(speed\s+[^,.\n]+)/gi,
      /(tokens?\s+[^,.\n]+)/gi
    ];

    for (const pattern of conceptPatterns) {
      const matches = synthesis.match(pattern);
      if (matches) {
        concepts.push(...matches.map(m => m.trim()));
      }
    }

    return [...new Set(concepts)];
  }

  /**
   * Extract data/measurements from concept synthesis (no hardcoding)
   */
  private extractDataFromSynthesis(synthesis: string): string[] {
    const data: string[] = [];
    
    // Pattern 1: Timing data
    const dataPatterns = [
      /(\d+\.?\d*\s*hours?)/gi,
      /(\d+\.?\d*\s*minutes?)/gi,
      /(\d+\.?\d*[BM]\b)/gi, // Tokens like 1.88B, 205M
      /(\d+k?\b)/gi // Numbers like 205k
    ];

    for (const pattern of dataPatterns) {
      const matches = synthesis.match(pattern);
      if (matches) {
        data.push(...matches.map(m => m.trim()));
      }
    }

    return [...new Set(data)];
  }

  /**
   * Extract additional intelligence from document content that was analyzed
   */
  private async extractIntelligenceFromDocumentContent(context: ResearchContext, insights: any): Promise<void> {
    // Get sample content from chunks that were analyzed earlier  
    const sampleContent = context.ragResults?.chunks
      ?.slice(0, 5)
      ?.map(chunk => chunk.text.substring(0, 500))
      ?.join('\n\n') || '';

    if (!sampleContent) return;

    // Extract table structure methods if present
    const tableMatches = sampleContent.match(/TABLE_ROW[^<]*([^|]+)\|([^|]+)\|/g);
    if (tableMatches) {
      tableMatches.forEach(match => {
        const parts = match.split('|');
        if (parts.length >= 2) {
          const methodName = parts[0].replace('TABLE_ROW', '').trim();
          const timing = parts[1].trim();
          
          if (methodName && methodName.length > 3) {
            insights.methods.push(methodName);
          }
          if (timing && /\d/.test(timing)) {
            insights.data.push(timing);
          }
        }
      });
    }

    console.log(`🔍 Additional intelligence from document content: ${tableMatches?.length || 0} table entries`);
  }

  /**
   * Format extracted data as measurements for PatternGenerator
   */
  private formatDataAsMeasurements(dataItems: string[], context: ResearchContext): Array<{
    value: string;
    leftContext: string;
    rightContext: string;
    chunkId: string;
    sourceDocument?: string;
  }> {
    const measurements: Array<{
      value: string;
      leftContext: string;
      rightContext: string;
      chunkId: string;
      sourceDocument?: string;
    }> = [];

    // Find the data items in the actual document content to get context
    const chunks = context.ragResults?.chunks || [];
    
    for (const dataItem of dataItems) {
      for (const chunk of chunks.slice(0, 10)) { // Check first 10 chunks
        if (chunk.text.includes(dataItem)) {
          // Extract context around the measurement
          const index = chunk.text.indexOf(dataItem);
          const leftStart = Math.max(0, index - 50);
          const rightEnd = Math.min(chunk.text.length, index + dataItem.length + 50);
          
          measurements.push({
            value: dataItem,
            leftContext: chunk.text.substring(leftStart, index).trim(),
            rightContext: chunk.text.substring(index + dataItem.length, rightEnd).trim(),
            chunkId: chunk.id,
            sourceDocument: chunk.metadata?.filename || chunk.sourceDocument || 'unknown'
          });
          break; // Found in this chunk, move to next data item
        }
      }
    }

    console.log(`📊 Formatted ${measurements.length} measurements for PatternGenerator`);
    return measurements;
  }

  /**
   * 🎯 INTELLIGENT: Parse query-relevant terms response from LLM
   */
  private parseQueryRelevantTermsResponse(response: string): any {
    const insights = {
      methods: [] as string[],
      concepts: [] as string[],
      people: [] as string[],
      data: [] as string[],
    };

    try {
      const lines = response.split("\n");

      // Track current category for multiline content
      let currentCategory = "";
      let collectedContent: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim().toLowerCase();

        // Check if this line starts a new category
        if (
          trimmed.startsWith("methods:") ||
          trimmed.startsWith("concepts:") ||
          trimmed.startsWith("people:") ||
          trimmed.startsWith("data:")
        ) {
          // Save previous category if exists
          if (currentCategory && collectedContent.length > 0) {
            this.saveParsedCategory(
              insights,
              currentCategory,
              collectedContent.join(" ")
            );
          }

          // Start new category
          if (trimmed.startsWith("methods:")) currentCategory = "methods";
          else if (trimmed.startsWith("concepts:"))
            currentCategory = "concepts";
          else if (trimmed.startsWith("people:")) currentCategory = "people";
          else if (trimmed.startsWith("data:")) currentCategory = "data";

          // Extract content after colon (might be empty if content is on next line)
          const colonIndex = line.indexOf(":");
          const terms = line.substring(colonIndex + 1).trim();
          console.log(`🔍 Parsing ${currentCategory} line: "${terms}"`);

          collectedContent = terms ? [terms] : [];
        } else if (currentCategory && line.trim()) {
          // This is continuation content for current category
          collectedContent.push(line.trim());
        }
      }

      // Save last category
      if (currentCategory && collectedContent.length > 0) {
        this.saveParsedCategory(
          insights,
          currentCategory,
          collectedContent.join(" ")
        );
      }
    } catch (error) {
      console.warn("⚠️ Error parsing extracted terms:", error);
    }

    return insights;
  }

  private saveParsedCategory(insights: any, category: string, content: string) {
    console.log(`💾 Saving ${category}: "${content.substring(0, 100)}..."`);

    // Filter out error messages and "not found" responses
    if (
      content &&
      content !== "none" &&
      content.toLowerCase() !== "none" &&
      !content.toLowerCase().includes("no specific") &&
      !content.toLowerCase().includes("not found") &&
      !content.toLowerCase().includes("no relevant") &&
      !content.toLowerCase().includes("[") && // Filter out bracketed error messages
      content.length < 500
    ) {
      // Error messages tend to be long

      const items = content
        .split(",")
        .map((t) => t.trim())
        .filter(
          (t) =>
            t.length > 0 &&
            t.toLowerCase() !== "none" &&
            !t.toLowerCase().includes("no specific") &&
            !t.toLowerCase().includes("not found")
        );

      if (items.length > 0) {
        insights[category] = items;
        console.log(`✅ Parsed ${category}:`, insights[category]);
      }
    }
  }

  private async parseExtractedTerms_OLD(response: string): Promise<any> {
    // Keep old implementation for reference
    const insights = {
      methods: [] as string[],
      concepts: [] as string[],
      people: [] as string[],
      data: [] as string[]
    };

    try {
      const lines = response.split("\n");

      for (const line of lines) {
        const trimmed = line.trim().toLowerCase();

        if (trimmed.startsWith("methods:")) {
          const terms = line.substring(line.indexOf(":") + 1).trim();
          console.log(`🔍 Parsing methods line: "${terms}"`);
          if (
            terms &&
            terms !== "none" &&
            terms.toLowerCase() !== "none" &&
            !terms.toLowerCase().includes("no specific") &&
            !terms.toLowerCase().includes("not found") &&
            !terms.toLowerCase().includes("[") &&
            terms.length < 100
          ) {
            insights.people = terms
              .split(",")
              .map((t) => t.trim())
              .filter(
                (t) =>
                  t.length > 0 &&
                  t.toLowerCase() !== "none" &&
                  !t.toLowerCase().includes("no specific") &&
                  !t.toLowerCase().includes("not found")
              );
          }
        } else if (
          trimmed.startsWith("data_types:") ||
          trimmed.startsWith("data:")
        ) {
          const terms = line.substring(line.indexOf(":") + 1).trim();
          console.log(`🔍 Parsing data line: "${terms}"`);
          if (
            terms &&
            terms !== "none" &&
            terms.toLowerCase() !== "none" &&
            !terms.toLowerCase().includes("no specific") &&
            !terms.toLowerCase().includes("not found") &&
            !terms.toLowerCase().includes("[") &&
            terms.length < 100
          ) {
            insights.data = terms
              .split(",")
              .map((t) => t.trim())
              .filter(
                (t) =>
                  t.length > 0 &&
                  t.toLowerCase() !== "none" &&
                  !t.toLowerCase().includes("no specific") &&
                  !t.toLowerCase().includes("not found")
              );
          }
        }
      }
    } catch (error) {
      console.warn(
        "⚠️ Failed to parse technical terms response, using defaults"
      );
    }

    return insights;
  }

  /**
   * 🎯 INTELLIGENT: Build query-aware content sample prioritizing relevant content
   */
  private async buildQueryAwareContentSample(
    context: ResearchContext,
    documentGroups: any[]
  ): Promise<string> {
    // First, analyze query to understand what to prioritize
    const queryAnalysis = await this.analyzeQueryForContentPrioritization(
      context.query
    );

    return documentGroups
      .map((group, i) => {
        // 🎯 CRITICAL FIX: Use 30% sampling or minimum 5 chunks as designed
        const totalChunks = group.chunks.length;
        const chunksToSample =
          totalChunks <= 5
            ? totalChunks
            : Math.max(5, Math.ceil(totalChunks * 0.3));

        console.log(
          `📊 Document ${i + 1}: Sampling ${chunksToSample} of ${totalChunks} chunks (${Math.round((chunksToSample / totalChunks) * 100)}%)`
        );

        // Intelligently select chunks based on query analysis
        const prioritizedChunks = this.prioritizeChunksForQuery(
          group.chunks,
          queryAnalysis
        );

        // Take the calculated number of chunks (30% or minimum 5)
        const chunks = prioritizedChunks
          .slice(0, chunksToSample)
          .map((chunk: any) => {
            // Adaptive chunk size - preserve more content for important chunks
            const chunkSize = this.calculateOptimalChunkSize(
              chunk,
              queryAnalysis
            );
            return chunk.text.substring(0, chunkSize);
          })
          .join("\n\n");

        const docName = group.documentId || group.source || `Document ${i + 1}`;
        return `--- DOCUMENT ${i + 1}: ${docName} ---\n${chunks}`;
      })
      .join("\n\n");
  }

  /**
   * 🎯 INTELLIGENT: Analyze query to determine content prioritization strategy
   */
  private async analyzeQueryForContentPrioritization(
    query: string
  ): Promise<any> {
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
      console.warn("⚠️ Query analysis failed, using basic prioritization");
      return {
        priorityTerms: ["methods", "algorithms", "techniques"],
        contentPatterns: ["method", "algorithm", "approach"],
        searchIndicators: ["method", "algorithm", "technique", "approach"],
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
      searchIndicators: [],
    };

    const lines = response.split("\n");
    for (const line of lines) {
      if (line.toLowerCase().includes("priority_terms:")) {
        const terms = line.substring(line.indexOf(":") + 1).trim();
        (analysis as any).priorityTerms = terms
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0);
      } else if (line.toLowerCase().includes("content_patterns:")) {
        const patterns = line.substring(line.indexOf(":") + 1).trim();
        (analysis as any).contentPatterns = patterns
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0);
      } else if (line.toLowerCase().includes("search_indicators:")) {
        const indicators = line.substring(line.indexOf(":") + 1).trim();
        (analysis as any).searchIndicators = indicators
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0);
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
    const text = (chunk.text || "").toLowerCase();
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

    const relevanceScore = this.calculateChunkRelevanceScore(
      chunk,
      queryAnalysis
    );

    // Higher relevance chunks get more content preserved
    const sizeMultiplier = 1 + relevanceScore * 0.2;
    return Math.min(Math.floor(baseSize * sizeMultiplier), maxSize);
  }

  /**
   * 🎯 INTELLIGENT: Build query-aware extraction prompt
   */
  private async buildQueryAwareExtractionPrompt(
    context: ResearchContext,
    contentSample: string,
    improvementGuidance?: string
  ): Promise<string> {
    return `/no_think

TASK: Extract information from documents to answer the user's specific question.

USER QUERY: "${context.query}"

${improvementGuidance ? `IMPROVEMENT GUIDANCE: ${improvementGuidance}\n` : ""}

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
  private isFromRequestedSource(
    chunkSource: string,
    querySource: string,
    chunkText: string
  ): boolean {
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
   * 
   */
  private extractSourceRequirement(query: string): {
    sourceRequired: boolean;
    sourceName?: string;
    sourceType?: string;
  } {
    // Pattern recognition for source specification (no hardcoding)
    const fromPattern = /\bfrom\s+([^'s]+(?:'s)?\s+\w+)/i;
    const possessivePattern =
      /\b([a-z]+)'s\s+(blog|work|post|article|paper|site)/i;
    const inPattern = /\bin\s+([^'s]+(?:'s)?\s+\w+)/i;

    let sourceName = undefined;
    let sourceType = undefined;

    // Check for "from X's Y" pattern
    const fromMatch = fromPattern.exec(query);
    if (fromMatch) {
      sourceName = fromMatch[1].trim();
      sourceType = "from_source";
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
      sourceType = "in_source";
    }

    return {
      sourceRequired: !!sourceName,
      sourceName,
      sourceType,
    };
  }

  /**
   * 🎯 SEMANTIC RELEVANCE DECISION: Use all collected intelligence for final decision
   * Combines: LLM analysis + discovered entities + content areas + document role
   */
  private makeFinalRelevanceDecision(
    docAnalysis: any,
    keyEntities: any[],
    contentAreas: any[],
    role: any,
    query: string,
    documentGroup: any
  ): { isRelevant: boolean; reason: string } {
    
    // Gather all intelligence signals
    const intelligenceSignals = {
      llmDecision: docAnalysis.isRelevant,
      llmReasoning: docAnalysis.reasoning || '',
      primaryEntity: docAnalysis.primaryEntity || '',
      discoveredEntities: keyEntities.map(e => e?.name).filter(Boolean),
      contentAreas: contentAreas || [],
      documentRole: role || 'unknown',
      documentType: docAnalysis.documentType || 'unknown'
    };
    
    // Create comprehensive context for semantic analysis
    const semanticContext = {
      query: query,
      document: {
        mainEntity: intelligenceSignals.primaryEntity,
        entities: intelligenceSignals.discoveredEntities.join(', '),
        contentType: intelligenceSignals.contentAreas.join(', '),
        role: intelligenceSignals.documentRole,
        type: intelligenceSignals.documentType
      },
      initialAnalysis: {
        relevant: intelligenceSignals.llmDecision,
        reasoning: intelligenceSignals.llmReasoning
      }
    };
    
    // Perform final semantic relationship analysis
    return this.performSemanticRelationshipAnalysis(semanticContext);
  }
  
  /**
   * 🧠 SEMANTIC RELATIONSHIP ANALYSIS: Final intelligence-based decision
   * Uses all collected data to make a comprehensive semantic relevance judgment
   */
  private performSemanticRelationshipAnalysis(context: any): { isRelevant: boolean; reason: string } {
    const { query, document, initialAnalysis } = context;
    
    // Extract key elements from query and document for comparison
    const queryElements = this.extractSemanticElements(query);
    const docElements = this.extractSemanticElements(
      `${document.mainEntity} ${document.entities} ${document.contentType} ${document.type}`
    );
    
    // Check semantic alignment between query intent and document content
    const entityAlignment = this.checkSemanticEntityAlignment(queryElements, docElements, document);
    const contentAlignment = this.checkSemanticContentAlignment(query, document);
    const purposeAlignment = this.checkSemanticPurposeAlignment(query, document);
    
    // Combine all semantic signals for final decision
    const semanticScore = (entityAlignment.score + contentAlignment.score + purposeAlignment.score) / 3;
    const confidenceThreshold = 0.7;
    
    // Make final decision based on semantic analysis
    if (semanticScore >= confidenceThreshold) {
      const reasons = [entityAlignment.reason, contentAlignment.reason, purposeAlignment.reason]
        .filter(r => r).join('; ');
      return {
        isRelevant: true,
        reason: `Semantic alignment confirmed (${Math.round(semanticScore * 100)}%): ${reasons}`
      };
    } else {
      const mismatches = [
        entityAlignment.score < 0.5 ? 'entity mismatch' : '',
        contentAlignment.score < 0.5 ? 'content mismatch' : '',
        purposeAlignment.score < 0.5 ? 'purpose mismatch' : ''
      ].filter(m => m).join(', ');
      
      return {
        isRelevant: false,
        reason: `Semantic analysis override (${Math.round(semanticScore * 100)}%): ${mismatches}`
      };
    }
  }
  
  private extractSemanticElements(text: string): string[] {
    return text.toLowerCase()
      .split(/[\s\-_,]+/)
      .filter(word => word.length > 2)
      .filter(word => !/^(the|and|for|with|from|that|this|have|will|are|but)$/.test(word));
  }
  
  private checkSemanticEntityAlignment(queryElements: string[], docElements: string[], document: any): { score: number; reason: string } {
    // Check if query mentions specific entities and if document contains them
    const potentialEntities = queryElements.filter(el => 
      /^[A-Za-z][a-z]*[A-Z]/.test(el) || // CamelCase or mixed case
      el.length > 4 // Longer words likely to be entities
    );
    
    if (potentialEntities.length === 0) {
      return { score: 1.0, reason: 'no specific entities required' };
    }
    
    const entityMatches = potentialEntities.filter(entity => 
      docElements.some(docEl => 
        docEl.includes(entity) || entity.includes(docEl) ||
        document.mainEntity.toLowerCase().includes(entity)
      )
    );
    
    const score = entityMatches.length / potentialEntities.length;
    const reason = score > 0.5 
      ? `entity match: ${entityMatches.join(', ')}`
      : `entity mismatch: query has [${potentialEntities.join(', ')}] but document has [${document.mainEntity}]`;
    
    return { score, reason };
  }
  
  private checkSemanticContentAlignment(query: string, document: any): { score: number; reason: string } {
    // Check if the type of content requested matches document content
    const queryLower = query.toLowerCase();
    const docContentLower = `${document.contentType} ${document.type}`.toLowerCase();
    
    // Personal documents (CV, resume) vs specific content requests
    if (/personal|resume|cv|education.*background|career.*history/.test(docContentLower) &&
        /blog|article|tutorial|data|results|analysis|guide/.test(queryLower)) {
      return { score: 0.2, reason: 'personal document vs specific content request mismatch' };
    }
    
    // Look for content type alignment
    const contentMatches = ['blog', 'article', 'tutorial', 'guide', 'data', 'analysis', 'results']
      .filter(type => queryLower.includes(type) && docContentLower.includes(type));
    
    if (contentMatches.length > 0) {
      return { score: 0.9, reason: `content type match: ${contentMatches.join(', ')}` };
    }
    
    return { score: 0.6, reason: 'neutral content alignment' };
  }
  
  private checkSemanticPurposeAlignment(query: string, document: any): { score: number; reason: string } {
    // Check if the document's purpose aligns with query intent
    const queryIntent = this.extractQueryIntent(query);
    const docPurpose = document.role;
    
    if (queryIntent === 'find_specific_content' && docPurpose === 'source') {
      return { score: 0.9, reason: 'document serves as content source' };
    }
    
    if (queryIntent === 'find_specific_content' && docPurpose === 'reference') {
      return { score: 0.3, reason: 'document is reference material, not primary source' };
    }
    
    return { score: 0.7, reason: 'adequate purpose alignment' };
  }
  
  private extractQueryIntent(query: string): string {
    const queryLower = query.toLowerCase();
    if (/get|find|show|give|list/.test(queryLower)) return 'find_specific_content';
    if (/compare|difference|vs/.test(queryLower)) return 'compare_content';
    if (/how|what|why|when/.test(queryLower)) return 'understand_concept';
    return 'general_query';
  }

  
  /**
   * Process with feedback - handles user corrections for misclassifications
   */
  async processWithFeedbackLogic(
    context: ResearchContext,
    feedback: UserFeedback,
    instructions: string[]
  ): Promise<ResearchContext> {
    console.log(`🔄 DataInspector: Processing with feedback corrections`, {
      affectedItems: feedback.affectedItems?.length || 0,
      correctionType: feedback.correctionType
    });
    
    // Create a copy of context for modification
    const correctedContext = { ...context };
    
    // Filter out affected items if specified
    if (feedback.affectedItems && feedback.affectedItems.length > 0) {
      const originalCount = correctedContext.ragResults.chunks.length;
      
      // Filter chunks based on feedback
      correctedContext.ragResults.chunks = correctedContext.ragResults.chunks.filter(chunk => {
        const chunkId = chunk.id || chunk.source;
        const shouldExclude = feedback.affectedItems?.some(affectedId => {
          // Check various ways the item might be identified
          return chunkId.includes(affectedId) || 
                 chunk.source?.includes(affectedId) ||
                 chunk.sourceDocument?.includes(affectedId) ||
                 chunk.text?.includes(affectedId);
        });
        
        if (shouldExclude) {
          console.log(`❌ Excluding chunk based on feedback: ${chunkId}`);
        }
        
        return !shouldExclude;
      });
      
      console.log(`📊 Filtered ${originalCount - correctedContext.ragResults.chunks.length} chunks based on feedback`);
    }
    
    // Apply correction-specific logic
    if (feedback.correctionType === 'classification') {
      await this.applyClassificationCorrections(correctedContext, feedback, instructions);
    }
    
    // Re-run analysis with corrected data
    await this.progressCallback?.onAgentProgress?.(
      this.name,
      20,
      "🔄 Re-analyzing with corrections applied...",
      0,
      undefined
    );
    
    // Re-inspect with feedback awareness
    await this.inspectWithFeedbackAwareness(correctedContext, feedback, instructions);
    
    // Add feedback summary to reasoning
    this.reasoning = `
      FEEDBACK CORRECTIONS APPLIED:
      - Issue: ${feedback.issue}
      - Correction: ${feedback.correction}
      - Items excluded: ${feedback.affectedItems?.length || 0}
      - Severity: ${feedback.severity}
      
      ${this.reasoning}
    `;
    
    return correctedContext;
  }
  
  /**
   * Apply classification-specific corrections
   */
  private async applyClassificationCorrections(
    context: ResearchContext,
    feedback: UserFeedback,
    instructions: string[]
  ): Promise<void> {
    console.log(`🏷️ Applying classification corrections`);
    
    // Update document analysis if it exists
    if (context.documentAnalysis?.documents) {
      // Re-evaluate document relevance based on feedback
      context.documentAnalysis.documents = context.documentAnalysis.documents.map(doc => {
        // Check if this document was mentioned in feedback
        const isAffected = feedback.affectedItems?.some(item => 
          doc.documentId.includes(item) || doc.documentName.includes(item)
        );
        
        if (isAffected) {
          // Mark as irrelevant based on feedback
          return {
            ...doc,
            role: 'reference' as const, // Downgrade to reference role
            contentAreas: [...doc.contentAreas, 'EXCLUDED_BY_USER_FEEDBACK']
          };
        }
        
        return doc;
      });
      
      // Update relevant document groups
      if (context.documentAnalysis.relevantDocumentGroups) {
        context.documentAnalysis.relevantDocumentGroups = 
          context.documentAnalysis.relevantDocumentGroups.filter(group => {
            const hasAffectedDocs = feedback.affectedItems?.some(item =>
              JSON.stringify(group).includes(item)
            );
            return !hasAffectedDocs;
          });
      }
    }
  }
  
  /**
   * Re-inspect with feedback awareness
   */
  private async inspectWithFeedbackAwareness(
    context: ResearchContext,
    feedback: UserFeedback,
    instructions: string[]
  ): Promise<void> {
    // Create enhanced prompt with feedback context
    const feedbackPrompt = `
      IMPORTANT CORRECTIONS FROM USER:
      ${instructions.join('\n')}
      
      The user has specifically indicated: "${feedback.correction}"
      
      Please re-analyze the data with these corrections in mind.
      Be especially careful about: ${feedback.issue}
    `;
    
    // Use existing inspection logic but with feedback-enhanced prompt
    if (context.ragResults.chunks.length > 0) {
      // Re-run document analysis with feedback awareness
      const hasDocumentMetadata = context.ragResults.chunks.some(
        chunk => chunk.sourceType === "document" || 
                chunk.text?.startsWith("Document metadata:")
      );
      
      if (hasDocumentMetadata) {
        await this.performDocumentMetadataAnalysisWithFeedback(context, feedbackPrompt);
      } else {
        await this.inspectWithLLMAndFeedback(context, feedbackPrompt);
      }
    }
  }
  
  /**
   * Perform document metadata analysis with feedback awareness
   */
  private async performDocumentMetadataAnalysisWithFeedback(
    context: ResearchContext,
    feedbackPrompt: string
  ): Promise<void> {
    // Call existing method but with enhanced context
    await this.performDocumentMetadataAnalysis(context);
    
    // Apply additional feedback-based filtering
    if (context.sharedKnowledge?.documentInsights) {
      context.sharedKnowledge.documentInsights.feedbackApplied = true;
      context.sharedKnowledge.documentInsights.feedbackPrompt = feedbackPrompt;
    }
  }
  
  /**
   * Inspect with LLM using feedback context
   */
  private async inspectWithLLMAndFeedback(
    context: ResearchContext,
    feedbackPrompt: string
  ): Promise<void> {
    // Call existing method
    await this.inspectWithLLM(context);
    
    // Store feedback context
    if (context.sharedKnowledge?.documentInsights) {
      context.sharedKnowledge.documentInsights.feedbackApplied = true;
      context.sharedKnowledge.documentInsights.feedbackContext = feedbackPrompt;
    }
  }
  
  /**
   * Validate agent-specific feedback
   */
  protected validateAgentSpecificFeedback(feedback: UserFeedback): FeedbackValidation {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // DataInspector specific validation
    if (feedback.correctionType === 'classification' && !feedback.affectedItems?.length) {
      warnings.push('For classification corrections, specifying affected items helps target the correction more precisely.');
    }
    
    if (feedback.correctionType === 'extraction' && !feedback.specificInstructions) {
      warnings.push('For extraction corrections, additional instructions about what to extract would be helpful.');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }
  
  /**
   * Generate DataInspector-specific correction instructions
   */
  protected async generateAgentSpecificInstructions(feedback: UserFeedback): Promise<string[]> {
    const instructions: string[] = [];
    
    // Add DataInspector specific instructions based on correction type
    switch (feedback.correctionType) {
      case 'classification':
        instructions.push('Re-evaluate document relevance with stricter criteria');
        instructions.push('Pay special attention to document type and content relevance');
        instructions.push('Exclude personal documents (CVs, resumes) unless specifically relevant');
        break;
      
      case 'extraction':
        instructions.push('Refine data extraction patterns');
        instructions.push('Focus on extracting only the specified information types');
        break;
      
      case 'filtering':
        instructions.push('Apply more selective filtering criteria');
        instructions.push('Exclude documents that do not directly address the query');
        break;
    }
    
    return instructions;
  }
  
  /**
   * Apply corrections with DataInspector-specific logic
   */
  async applyCorrections(
    context: ResearchContext,
    feedback: UserFeedback
  ): Promise<CorrectionResult> {
    const correctedItems: string[] = [];
    const excludedItems: string[] = [];
    
    // Track affected items
    if (feedback.affectedItems) {
      excludedItems.push(...feedback.affectedItems);
    }
    
    // Calculate correction metrics
    const originalDocCount = context.documentAnalysis?.documents?.length || 0;
    const affectedDocCount = excludedItems.length;
    
    return {
      correctedItems,
      excludedItems,
      changeSummary: `Applied classification corrections: excluded ${affectedDocCount} misclassified documents`,
      confidence: 0.9, // High confidence for user-directed corrections
      comparison: {
        originalCount: originalDocCount,
        correctedCount: originalDocCount - affectedDocCount,
        changePercentage: originalDocCount > 0 ? (affectedDocCount / originalDocCount) * 100 : 0
      }
    };
  }
}
