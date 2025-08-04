/**
 * Research Orchestrator
 * 
 * LLM-driven research system that intelligently decides when and how to use
 * RAG search, web search, and other research methods to answer user queries.
 * 
 * Similar to how other Deep Research works - the AI plans its own research strategy
 * and executes it step by step with full transparency.
 */

import { QueryIntelligenceService, QueryAnalysis } from './QueryIntelligenceService';
import { ResearchStep, SourceReference, ResearchStepUtils } from '@/components/DeepResearch/components/ResearchSteps';
import { VectorStore, SearchResult } from '@/components/VectorStore/VectorStore';
import { UnifiedWebSearchService, UnifiedWebSearchContext } from './UnifiedWebSearchService';
import { createMultiAgentSystem } from './multi-agent';
import { AgentProgressCallback, AgentProgressTracker } from './multi-agent/interfaces/AgentProgress';
import { AgentSubStep } from '@/components/DeepResearch/components/ResearchSteps';

export interface ResearchConfig {
  maxSteps: number;
  timeoutMs: number;
  enableWebSearch: boolean;
  enableRAGSearch: boolean;
  requireVerification: boolean;
  adaptiveStrategy: boolean;
}

export interface ResearchResult {
  query: string;
  steps: ResearchStep[];
  finalAnswer: string;
  sources: SourceReference[];
  confidence: number;
  processingTime: number;
  metadata: {
    stepsExecuted: number;
    ragSearches: number;
    webSearches: number;
    sourcesFound: number;
    avgSimilarity: number;
  };
}

export type StepUpdateCallback = (step: ResearchStep) => void;
export type ContentGeneratorFunction = (prompt: string) => Promise<string>;

/**
 * Main Research Orchestrator Class
 * Manages the entire research process from query to final answer
 */
export class ResearchOrchestrator {
  private queryIntelligence: QueryIntelligenceService;
  private vectorStore: VectorStore | null;
  private webSearchService: UnifiedWebSearchService | null;
  private generateContent: ContentGeneratorFunction | null = null;
  
  private config: ResearchConfig = {
    maxSteps: 8,
    timeoutMs: 30000, // 30 seconds max
    enableWebSearch: true,
    enableRAGSearch: true,
    requireVerification: false,
    adaptiveStrategy: true
  };
  
  public onStepUpdate?: StepUpdateCallback;
  
  // Multi-agent progress tracking
  private currentAgentSubSteps: AgentSubStep[] = [];
  private currentSynthesisStep: ResearchStep | null = null;
  
  constructor(
    vectorStore: VectorStore | null,
    webSearchService: UnifiedWebSearchService | null
  ) {
    this.queryIntelligence = QueryIntelligenceService.getInstance();
    this.vectorStore = vectorStore;
    this.webSearchService = webSearchService;
  }
  
  /**
   * Configure the orchestrator
   */
  configure(config: Partial<ResearchConfig>) {
    this.config = { ...this.config, ...config };
  }
  
  /**
   * Set content generation function (LLM)
   */
  setContentGenerator(generateContent: ContentGeneratorFunction) {
    this.generateContent = generateContent;
    this.queryIntelligence.configureLLM(generateContent);
  }
  
  /**
   * Main entry point: Execute complete research process
   */
  async executeResearch(query: string): Promise<ResearchResult> {
    const startTime = Date.now();
    const steps: ResearchStep[] = [];
    const sources: SourceReference[] = [];
    
    console.log(`🔬 Starting research for: "${query}"`);
    
    try {
      // Step 1: Query Analysis
      const analysisStep = ResearchStepUtils.createAnalysisStep(query);
      steps.push(analysisStep);
      this.updateStep(analysisStep, { status: 'in_progress' });
      
      const queryAnalysis = await this.queryIntelligence.analyzeQuery(query);
      
      this.updateStep(analysisStep, {
        status: 'completed',
        duration: Date.now() - analysisStep.timestamp,
        intent: queryAnalysis.intent,
        queries: queryAnalysis.expandedQueries,
        reasoning: `Identified intent: ${queryAnalysis.intent.type} (${Math.round(queryAnalysis.intent.confidence * 100)}% confidence)`
      });
      
      // Step 2: Plan Research Strategy
      const researchPlan = await this.planResearchStrategy(query, queryAnalysis);
      console.log(`📋 Research plan: ${researchPlan.length} steps planned`);
      
      // Step 3: Execute Planned Steps
      for (const plannedStep of researchPlan) {
        if (steps.length >= this.config.maxSteps) {
          console.log(`⚠️ Max steps (${this.config.maxSteps}) reached`);
          break;
        }
        
        const executedStep = await this.executeStep(plannedStep, queryAnalysis);
        steps.push(executedStep);
        
        // Collect sources from this step
        if (executedStep.sources) {
          sources.push(...executedStep.sources);
        }
        
        // Adaptive strategy: decide if we need more steps
        if (this.config.adaptiveStrategy) {
          const needsMoreSteps = await this.shouldContinueResearch(executedStep, steps);
          if (needsMoreSteps.continue) {
            const additionalSteps = await this.planAdditionalSteps(executedStep, needsMoreSteps.reasoning || 'No specific reasoning provided');
            researchPlan.push(...additionalSteps);
            console.log(`🔄 Adding ${additionalSteps.length} additional steps: ${needsMoreSteps.reasoning || 'No specific reasoning provided'}`);
          }
        }
      }
      
      // Log collected sources before synthesis
      console.log(`📚 Total sources collected: ${sources.length}`);
      console.log(`📊 Source breakdown:`, {
        rag: sources.filter(s => s.type === 'chunk').length,
        web: sources.filter(s => s.type === 'web').length,
        totalContentLength: sources.reduce((sum, s) => sum + (s.excerpt?.length || 0), 0)
      });
      
      // Step 4: Synthesize Final Answer
      const synthesisStep = ResearchStepUtils.createSynthesisStep(sources);
      steps.push(synthesisStep);
      this.updateStep(synthesisStep, { status: 'in_progress' });
      
      // Store reference for real-time agent updates
      this.currentSynthesisStep = synthesisStep;
      
      const finalAnswer = await this.synthesizeAnswer(query, steps, sources, queryAnalysis);
      
      this.updateStep(synthesisStep, {
        status: 'completed',
        duration: Date.now() - synthesisStep.timestamp,
        reasoning: `Generated comprehensive answer from ${sources.length} sources`,
        // Keep existing subSteps from real-time updates, don't override
        subSteps: this.currentAgentSubSteps || [],
        agentDetails: this.currentAgentSubSteps && this.currentAgentSubSteps.length > 0 ? {
          orchestratorPlan: `Multi-agent synthesis with ${this.currentAgentSubSteps.length} agents`,
          agentPipeline: this.currentAgentSubSteps.map(s => s.agentName),
          totalAgents: this.currentAgentSubSteps.length,
          completedAgents: this.currentAgentSubSteps.filter(s => s.status === 'completed').length
        } : undefined
      });
      
      // Clear reference after completion
      this.currentSynthesisStep = null;
      
      // Calculate metadata
      const processingTime = Date.now() - startTime;
      const ragSearches = steps.filter(s => s.type === 'rag_search').length;
      const webSearches = steps.filter(s => s.type === 'web_search').length;
      const avgSimilarity = sources.length > 0 
        ? sources.reduce((sum, s) => sum + (s.similarity || 0), 0) / sources.length
        : 0;
      
      const result: ResearchResult = {
        query,
        steps,
        finalAnswer,
        sources,
        confidence: this.calculateOverallConfidence(steps, sources),
        processingTime,
        metadata: {
          stepsExecuted: steps.length,
          ragSearches,
          webSearches,
          sourcesFound: sources.length,
          avgSimilarity
        }
      };
      
      console.log(`✅ Research completed: ${steps.length} steps, ${sources.length} sources, ${processingTime}ms`);
      return result;
      
    } catch (error) {
      console.error('❌ Research failed:', error);
      
      // Return partial results
      return {
        query,
        steps,
        finalAnswer: `Research failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sources,
        confidence: 0,
        processingTime: Date.now() - startTime,
        metadata: {
          stepsExecuted: steps.length,
          ragSearches: 0,
          webSearches: 0,
          sourcesFound: sources.length,
          avgSimilarity: 0
        }
      };
    }
  }
  
  /**
   * Plan initial research strategy based on query analysis
   */
  private async planResearchStrategy(
    query: string, 
    analysis: QueryAnalysis
  ): Promise<Partial<ResearchStep>[]> {
    if (!this.generateContent) {
      // Fallback to basic strategy
      return this.getBasicResearchStrategy(analysis);
    }
    
    let response = '';
    try {
      const keywords = analysis?.intent?.keywords || [];
      const keywordContext = keywords.length > 0 ? keywords.join(', ') : query;
      
      const planningPrompt = `I need to research: "${query}"

What steps should I take to find comprehensive information?

Available options:
${this.config.enableRAGSearch ? '- Search local knowledge base (rag_search)' : ''}
${this.config.enableWebSearch ? '- Search the web (web_search)' : ''}

Suggest research steps with reasoning for each.`;
      
      response = await this.generateContent(planningPrompt);
      const plannedSteps = this.parseJSONResponse(response);
      
      console.log(`🤖 LLM planned ${plannedSteps.length} research steps`);
      
      // CRITICAL: If LLM fails to plan any steps, force at least one RAG search
      if (plannedSteps.length === 0) {
        console.log('⚠️ LLM planned 0 steps, forcing RAG search for user query');
        if (this.config.enableRAGSearch) {
          return [{
            type: 'rag_search',
            reasoning: `Searching knowledge base for: ${query}`,
            queries: [query]
          }];
        } else if (this.config.enableWebSearch) {
          return [{
            type: 'web_search', 
            reasoning: `Searching web for: ${query}`,
            query: query
          }];
        }
      }
      
      return plannedSteps;
      
    } catch (error) {
      console.error('❌ LLM planning failed, using basic strategy:', error);
      console.error('LLM response that failed to parse:', response?.slice(0, 500));
      return this.getBasicResearchStrategy(analysis);
    }
  }
  
  /**
   * Fallback basic research strategy
   */
  private getBasicResearchStrategy(analysis: QueryAnalysis): Partial<ResearchStep>[] {
    const steps: Partial<ResearchStep>[] = [];
    
    // Always try RAG search first if available
    if (this.config.enableRAGSearch && this.vectorStore) {
      steps.push({
        type: 'rag_search',
        reasoning: 'Search knowledge base for relevant information',
        queries: analysis.expandedQueries
      });
    }
    
    // Add web search ONLY if explicitly enabled and available
    if (this.config.enableWebSearch && this.webSearchService) {
      steps.push({
        type: 'web_search',
        reasoning: 'Search web for additional context and recent information',
        query: analysis.originalQuery
      });
    }
    
    return steps;
  }
  
  private static stepCounter = 0;
  
  private generateUniqueStepId(type: string): string {
    ResearchOrchestrator.stepCounter++;
    return `${type}_${Date.now()}_${ResearchOrchestrator.stepCounter}_${Math.random().toString(36).substr(2, 5)}`;
  }

  /**
   * Execute a single research step
   */
  private async executeStep(
    plannedStep: Partial<ResearchStep>,
    queryAnalysis: QueryAnalysis
  ): Promise<ResearchStep> {
    const step: ResearchStep = {
      id: this.generateUniqueStepId(plannedStep.type!),
      type: plannedStep.type!,
      status: 'in_progress',
      timestamp: Date.now(),
      reasoning: plannedStep.reasoning,
      query: plannedStep.query,
      queries: plannedStep.queries
    };
    
    this.updateStep(step, { status: 'in_progress' });
    
    try {
      switch (step.type) {
        case 'rag_search':
          await this.executeRAGSearch(step, queryAnalysis);
          break;
        case 'web_search':
          await this.executeWebSearch(step, queryAnalysis);
          break;
        case 'analysis':
          // Analysis step is handled in the main flow, just mark as completed
          step.status = 'completed';
          break;
        case 'synthesis':
          // Synthesis step is handled in the main flow, just mark as completed
          step.status = 'completed';
          break;
        case 'verification':
          // Verification step placeholder
          step.status = 'completed';
          break;
        default:
          console.warn(`⚠️ Unknown step type: ${step.type}, attempting fallback strategy`);
          // Try to infer the intended step type and execute fallback
          if (this.config.enableRAGSearch && this.vectorStore) {
            console.log(`🔄 Fallback: Executing RAG search instead of ${step.type}`);
            step.type = 'rag_search';
            await this.executeRAGSearch(step, queryAnalysis);
          } else if (this.config.enableWebSearch && this.webSearchService) {
            console.log(`🔄 Fallback: Executing web search instead of ${step.type}`);
            step.type = 'web_search';
            await this.executeWebSearch(step, queryAnalysis);
          } else {
            throw new Error(`Unknown step type: ${step.type} and no fallback available`);
          }
      }
      
      if (step.status !== 'completed') {
        step.status = 'completed';
      }
      step.duration = Date.now() - step.timestamp;
      
    } catch (error) {
      console.error(`❌ Step ${step.type} failed:`, error);
      step.status = 'failed';
      step.duration = Date.now() - step.timestamp;
      
      // Add error details to step for debugging
      const errorMessage = error instanceof Error ? error.message : String(error);
      step.reasoning = step.reasoning ? 
        `${step.reasoning} (Failed: ${errorMessage})` : 
        `Failed: ${errorMessage}`;
    }
    
    this.updateStep(step, {
      status: step.status,
      duration: step.duration,
      sources: step.sources,
      results: step.results
    });
    
    return step;
  }
  
  /**
   * Execute RAG search step
   */
  private async executeRAGSearch(step: ResearchStep, queryAnalysis: QueryAnalysis) {
    if (!this.vectorStore) {
      throw new Error('Vector store not available');
    }
    
    // Use expanded queries for better coverage
    const queriesToSearch = queryAnalysis.expandedQueries.length > 0 
      ? queryAnalysis.expandedQueries 
      : [queryAnalysis.originalQuery];
    
    console.log(`📚 Executing RAG search with ${queriesToSearch.length} queries:`, queriesToSearch);
    
    // Search with each expanded query and combine results
    const allResultsMap = new Map<string, any>();
    
    for (const query of queriesToSearch) {
      const results = await this.vectorStore.searchSimilar(
        query,
        0.1, // Lower threshold to get more results
        10   // Limit per query to avoid too many results
      );
      
      // Deduplicate by chunk ID
      results.forEach(result => {
        const chunkId = result.chunk.id;
        if (!allResultsMap.has(chunkId) || result.similarity > allResultsMap.get(chunkId).similarity) {
          allResultsMap.set(chunkId, result);
        }
      });
    }
    
    // Convert map back to array and sort by similarity
    const allResults = Array.from(allResultsMap.values())
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 15); // Final limit
    
    console.log(`📚 RAG search found ${allResults.length} unique results from ${queriesToSearch.length} queries`);

    // Tag results with search context
    allResults.forEach((result, index) => {
      (result as any).__searchContext = {
        searchQuery: queriesToSearch.join(', '),
        rank: index + 1,
        totalResults: allResults.length
      };
    });
    
    // Convert to source references with improved excerpt generation
    const sources: SourceReference[] = allResults.map((result: any) => {
      // Clean and validate chunk content
      let content = result.chunk.content || '';
      
      // Remove excessive whitespace and normalize
      content = content.replace(/\s+/g, ' ').trim();
      
      // Generate clean excerpt - INCREASED to capture full context
      let excerpt = content;
      if (content.length > 800) {
        // Find last complete word within 800 chars to avoid mid-word cuts
        const truncated = content.slice(0, 800);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        excerpt = lastSpaceIndex > 750 
          ? truncated.slice(0, lastSpaceIndex) + '...'
          : truncated + '...';
      }
      
      return {
        id: result.chunk.id,
        type: 'chunk',
        title: result.document.title || 'Untitled Document',
        source: result.document.metadata?.filename || 'Unknown document',
        similarity: result.similarity,
        excerpt: excerpt,
        chunkId: result.chunk.id,
        metadata: {
          filename: result.document.metadata?.filename,
          uploadedAt: result.document.metadata?.uploadedAt,
          description: result.document.metadata?.description
        }
      };
    });
    
    step.sources = sources;
    step.results = allResults;
    
    console.log(`✅ RAG search found ${sources.length} sources`);
  }
  
  /**
   * Execute web search step
   */
  private async executeWebSearch(step: ResearchStep, queryAnalysis: QueryAnalysis) {
    if (!this.webSearchService) {
      throw new Error('Web search service not available');
    }
    
    // Use original query for web search
    const queriesToSearch = [step.query || queryAnalysis.originalQuery];
    
    console.log(`🌐 Executing web search with ${queriesToSearch.length} queries`);
    
    const allSources: SourceReference[] = [];
    const seenUrls = new Set<string>();
    
    // Search with each query
    for (const searchQuery of queriesToSearch.slice(0, 3)) { // Limit to 3 queries
      const webContext = await this.webSearchService.searchWeb(searchQuery, {
        limit: 3 // Smaller limit per query
      });
      
      if (webContext) {
        // Convert web results to source references, avoiding duplicates
        webContext.results.forEach((result, index) => {
          if (!seenUrls.has(result.url)) {
            seenUrls.add(result.url);
            
            // Use scraped content if available, otherwise fall back to description
            const excerpt = result.content && result.content.length > 50 
              ? result.content 
              : result.description || "";
              
            const hasFullContent = result.content !== undefined && result.content.length > 50 && !result.metadata?.scrapingFailed;
            console.log(`🌐 Web source ${index + 1}: ${result.title} - ${hasFullContent ? 'scraped' : 'description only'} (${excerpt.length} chars)`);
            
            allSources.push({
              id: `web_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 8)}`,
              type: 'web',
              title: result.title,
              source: result.url,
              excerpt: excerpt,
              url: result.url,
              metadata: {
                domain: result.metadata?.domain,
                hasScrapedContent: hasFullContent,
                contentLength: result.metadata?.contentLength || excerpt.length,
                crawlTime: result.metadata?.crawlTime || 0,
                scrapingFailed: result.metadata?.scrapingFailed
              }
            });
          }
        });
      }
    }
    
    step.sources = allSources;
    step.results = allSources;
    
    console.log(`✅ Web search found ${allSources.length} unique sources`);
  }
  
  /**
   * Decide if research should continue with additional steps
   */
  private async shouldContinueResearch(
    lastStep: ResearchStep,
    allSteps: ResearchStep[]
  ): Promise<{ continue: boolean; reasoning?: string }> {
    // Simple heuristics for now
    const totalSources = allSteps.reduce((sum, step) => sum + (step.sources?.length || 0), 0);
    
    if (totalSources === 0) {
      return {
        continue: true,
        reasoning: 'No sources found yet, need alternative search strategy'
      };
    }
    
    if (totalSources < 3 && allSteps.length < this.config.maxSteps - 1) {
      return {
        continue: true,
        reasoning: 'Insufficient sources for comprehensive answer'
      };
    }
    
    return { continue: false };
  }
  
  /**
   * Plan additional research steps based on current results
   */
  private async planAdditionalSteps(
    lastStep: ResearchStep,
    reasoning: string
  ): Promise<Partial<ResearchStep>[]> {
    // Simple fallback strategy
    if (lastStep.type === 'rag_search' && this.config.enableWebSearch) {
      return [{
        type: 'web_search',
        reasoning: 'RAG search insufficient, trying web search',
        query: lastStep.query || 'additional information'
      }];
    }
    
    if (lastStep.type === 'web_search' && this.config.enableRAGSearch) {
      return [{
        type: 'rag_search',
        reasoning: 'Web search insufficient, trying knowledge base',
        queries: lastStep.queries || [lastStep.query || 'additional information']
      }];
    }
    
    return [];
  }
  
  /**
   * Synthesize final answer from all research steps and sources
   */
  private async synthesizeAnswer(
    query: string,
    steps: ResearchStep[],
    sources: SourceReference[],
    queryAnalysis: QueryAnalysis
  ): Promise<string> {
    if (!this.generateContent) {
      return this.generateBasicSummary(query, sources);
    }
    
    try {
      // Try multi-agent system first
      if (sources.length > 0) {
        console.log(`🤖 Using multi-agent system for intelligent extraction`);
        
        try {
          // Clear previous sub-steps
          this.currentAgentSubSteps = [];
          
          // Create progress callback to capture agent sub-steps AND update UI in real-time
          const progressCallback: AgentProgressCallback = {
            onAgentStart: (agentName: string, agentType: string, input: any) => {
              console.log(`🚀 Agent started: ${agentName} (${agentType})`);
              
              // Create and add agent sub-step in real-time
              if (this.currentSynthesisStep) {
                const agentSubStep = {
                  id: `${agentName.toLowerCase()}_${Date.now()}`,
                  agentName,
                  agentType: agentType as 'query_planner' | 'data_inspector' | 'pattern_generator' | 'extraction' | 'synthesis',
                  status: 'in_progress' as const,
                  startTime: Date.now(),
                  input: input,
                  output: null,
                  progress: 10,
                  stage: 'Initializing',
                  thinking: undefined,
                  error: undefined,
                  duration: undefined,
                  itemsProcessed: 0,
                  totalItems: undefined
                };
                
                // Add to current agent sub-steps
                if (!this.currentAgentSubSteps) this.currentAgentSubSteps = [];
                const existingIndex = this.currentAgentSubSteps.findIndex(s => s.agentName === agentName);
                if (existingIndex >= 0) {
                  this.currentAgentSubSteps[existingIndex] = agentSubStep;
                } else {
                  this.currentAgentSubSteps.push(agentSubStep);
                }
                
                // Update synthesis step with current sub-steps
                this.updateStep(this.currentSynthesisStep, {
                  subSteps: [...this.currentAgentSubSteps],
                  agentDetails: {
                    orchestratorPlan: `Multi-agent synthesis with ${this.currentAgentSubSteps.length} agents`,
                    agentPipeline: this.currentAgentSubSteps.map(s => s.agentName),
                    totalAgents: this.currentAgentSubSteps.length,
                    completedAgents: this.currentAgentSubSteps.filter(s => s.status === 'completed').length
                  }
                });
              }
            },
            onAgentProgress: (agentName: string, progress: number, stage?: string, itemsProcessed?: number, totalItems?: number) => {
              console.log(`📊 Agent progress: ${agentName} - ${progress}% ${stage ? `(${stage})` : ''}`);
              
              // Update agent sub-step progress in real-time
              if (this.currentSynthesisStep && this.currentAgentSubSteps) {
                const agentIndex = this.currentAgentSubSteps.findIndex(s => s.agentName === agentName);
                if (agentIndex >= 0) {
                  this.currentAgentSubSteps[agentIndex] = {
                    ...this.currentAgentSubSteps[agentIndex],
                    progress,
                    stage,
                    itemsProcessed,
                    totalItems
                  };
                  
                  // Update synthesis step with updated progress
                  this.updateStep(this.currentSynthesisStep, {
                    subSteps: [...this.currentAgentSubSteps],
                    agentDetails: {
                      orchestratorPlan: `Multi-agent synthesis with ${this.currentAgentSubSteps.length} agents`,
                      agentPipeline: this.currentAgentSubSteps.map(s => s.agentName),
                      totalAgents: this.currentAgentSubSteps.length,
                      completedAgents: this.currentAgentSubSteps.filter(s => s.status === 'completed').length
                    }
                  });
                }
              }
            },
            onAgentThinking: (agentName: string, thinking: any) => {
              console.log(`🧠 Agent thinking: ${agentName}`);
              
              // Update agent thinking in real-time
              if (this.currentSynthesisStep && this.currentAgentSubSteps) {
                const agentIndex = this.currentAgentSubSteps.findIndex(s => s.agentName === agentName);
                if (agentIndex >= 0) {
                  this.currentAgentSubSteps[agentIndex] = {
                    ...this.currentAgentSubSteps[agentIndex],
                    thinking
                  };
                  
                  // Update synthesis step with thinking
                  this.updateStep(this.currentSynthesisStep, {
                    subSteps: [...this.currentAgentSubSteps]
                  });
                }
              }
            },
            onAgentComplete: (agentName: string, output: any, metrics?: any) => {
              console.log(`✅ Agent completed: ${agentName}`);
              
              // Mark agent as completed in real-time
              if (this.currentSynthesisStep && this.currentAgentSubSteps) {
                const agentIndex = this.currentAgentSubSteps.findIndex(s => s.agentName === agentName);
                if (agentIndex >= 0) {
                  this.currentAgentSubSteps[agentIndex] = {
                    ...this.currentAgentSubSteps[agentIndex],
                    status: 'completed',
                    progress: 100,
                    endTime: Date.now(),
                    duration: Date.now() - this.currentAgentSubSteps[agentIndex].startTime,
                    stage: 'Completed',
                    output: output
                  };
                  
                  // Update synthesis step with completion
                  this.updateStep(this.currentSynthesisStep, {
                    subSteps: [...this.currentAgentSubSteps],
                    agentDetails: {
                      orchestratorPlan: `Multi-agent synthesis with ${this.currentAgentSubSteps.length} agents`,
                      agentPipeline: this.currentAgentSubSteps.map(s => s.agentName),
                      totalAgents: this.currentAgentSubSteps.length,
                      completedAgents: this.currentAgentSubSteps.filter(s => s.status === 'completed').length
                    }
                  });
                }
              }
            },
            onAgentError: (agentName: string, error: string, retryCount?: number) => {
              console.error(`❌ Agent error: ${agentName} - ${error}`);
              
              // Mark agent as failed in real-time
              if (this.currentSynthesisStep && this.currentAgentSubSteps) {
                const agentIndex = this.currentAgentSubSteps.findIndex(s => s.agentName === agentName);
                if (agentIndex >= 0) {
                  this.currentAgentSubSteps[agentIndex] = {
                    ...this.currentAgentSubSteps[agentIndex],
                    status: 'failed',
                    error,
                    endTime: Date.now(),
                    duration: Date.now() - this.currentAgentSubSteps[agentIndex].startTime
                  };
                  
                  // Update synthesis step with error
                  this.updateStep(this.currentSynthesisStep, {
                    subSteps: [...this.currentAgentSubSteps]
                  });
                }
              }
            }
          };
          
          // Create multi-agent system with progress tracking
          const multiAgent = createMultiAgentSystem(this.generateContent, progressCallback);
          
          // Execute multi-agent research process
          const answer = await multiAgent.research(query, sources);
          
          // Capture the detailed agent sub-steps
          this.currentAgentSubSteps = multiAgent.getAgentSubSteps();
          
          if (answer && answer.trim().length > 10) {
            console.log(`✅ Multi-agent system generated answer with ${this.currentAgentSubSteps.length} agent sub-steps`);
            return answer;
          } else {
            console.log('⚠️ Multi-agent system found no relevant information, falling back to LLM synthesis');
          }
        } catch (multiAgentError) {
          console.error('❌ Multi-agent system failed:', multiAgentError);
          console.log('🔄 Falling back to direct LLM synthesis');
        }
      }
      
      // CRITICAL FIX: Limit sources to prevent LLM overload
      const cleanSources = sources
        .filter(source => source.excerpt && source.excerpt.length > 10) // Remove empty/short excerpts
        .slice(0, 3) // Back to 3 sources to keep prompt small
        .map(source => {
          // Keep excerpts at reasonable length
          const maxLength = 500;
          let cleanExcerpt = source.excerpt
            .replace(/\s+/g, ' ')  // Normalize whitespace only
            .replace(/\b[a-f0-9]{40,}\b/g, '[hash]')  // Replace long hashes
            .trim();
          
          // Truncate if too long
          if (cleanExcerpt.length > maxLength) {
            cleanExcerpt = cleanExcerpt.slice(0, maxLength) + '...';
          }
          
          return {
            ...source,
            title: (source.title || 'Untitled').replace(/[^\w\s\-\.]/g, '').trim(),
            excerpt: cleanExcerpt
          };
        });
        

      
      const contextText = cleanSources
        .map((source, index) => `[${index + 1}] ${source.excerpt}`)
        .join('\n\n');
      
      
      // Better prompt for small model with focus on extraction
      const synthesisPrompt = `Question: "${query}"

Sources:
${contextText}

Task: Find and list the specific information requested. If you see numbers, dates, or performance data, include them exactly as shown. Focus on extracting facts from the sources above.

Answer:`;
      
      const generatedAnswer = await this.generateContent(synthesisPrompt);
      
      // Clean up the generated answer
      return this.cleanupGeneratedText(generatedAnswer);
      
    } catch (error) {
      console.error('❌ Answer synthesis failed:', error);
      return this.generateBasicSummary(query, sources);
    }
  }
  
  /**
   * Extract structured data directly from sources without LLM
   * @deprecated Use agent-based extraction instead
   */
  private extractStructuredData(sources: SourceReference[]): string | null {
    console.log('🔍 Attempting structured data extraction from', sources.length, 'sources');
    
    // Multiple patterns to catch different formats
    const patterns = {
      // Pattern 1: "X hours" anywhere in text with context
      hoursWithContext: /([^.!?\n]{0,100})(\d+\.?\d*)\s*(hours?|hrs?)/gi,
      // Pattern 2: Performance metrics (tokens/sec, etc)
      performance: /(\d+\.?\d*[kmKM]?)\s*(tokens?\/s(?:ec)?|tok\/s|tokens?\s*per\s*second)/gi,
      // Pattern 3: Commit references with timing
      commitTiming: /(?:commit|after|implementing|changes)[^.!?\n]*?(\d+\.?\d*)\s*(hours?|hrs?)/gi,
      // Pattern 4: Table-like data
      tableRow: /^\s*[\d\-\.]+\s*\|[^|]+\|[^|]+/gm,
      // Pattern 5: Numbered lists with timing
      numberedList: /^\s*\d+\.\s+([^:\n]+)[:\s-]+.*?(\d+\.?\d*)\s*(hours?|hrs?)/gm
    };
    
    const findings: Array<{text: string, time?: string, performance?: string, source: number}> = [];
    
    sources.forEach((source, sourceIndex) => {
      const content = source.excerpt || '';
      console.log(`📄 Source ${sourceIndex + 1} excerpt (first 200 chars):`, content.substring(0, 200));
      
      // Look for timing data
      let match;
      
      // Hours with context
      patterns.hoursWithContext.lastIndex = 0;
      while ((match = patterns.hoursWithContext.exec(content)) !== null) {
        findings.push({
          text: match[1].trim() + ' ' + match[2] + ' ' + match[3],
          time: match[2] + ' ' + match[3],
          source: sourceIndex + 1
        });
      }
      
      // Performance metrics
      patterns.performance.lastIndex = 0;
      while ((match = patterns.performance.exec(content)) !== null) {
        findings.push({
          text: 'Performance: ' + match[1] + ' ' + match[2],
          performance: match[1] + ' ' + match[2],
          source: sourceIndex + 1
        });
      }
      
      // Commit timing
      patterns.commitTiming.lastIndex = 0;
      while ((match = patterns.commitTiming.exec(content)) !== null) {
        findings.push({
          text: match[0],
          time: match[1] + ' ' + match[2],
          source: sourceIndex + 1
        });
      }
    });
    
    console.log('📊 Extracted findings:', findings.length);
    
    if (findings.length > 0) {
      // Sort by source order and format
      const formatted = findings
        .slice(0, Math.min(5, findings.length)) // Show up to 5 findings
        .map((finding, index) => {
          if (finding.time) {
            return `${index + 1}. ${finding.text} (Source ${finding.source})`;
          } else if (finding.performance) {
            return `${index + 1}. ${finding.text} (Source ${finding.source})`;
          }
          return `${index + 1}. ${finding.text} (Source ${finding.source})`;
        })
        .join('\n');
      
      return `Based on the sources, here are the relevant findings:\n\n${formatted}\n\nNote: These are direct extractions from Tyler's blog content.`;
    }
    
    // If no structured data found, log what we searched
    console.log('❌ No structured data patterns matched in any source');
    return null;
  }
  
  /**
   * Clean up generated text - PRESERVE technical data and performance metrics
   */
  private cleanupGeneratedText(text: string): string {
    if (!text) return 'No answer generated.';
    
    // ANTI-REPETITION: Detect and remove repetitive patterns
    let cleaned = text;
    
    // Check for repetitive patterns (same phrase repeated 3+ times)
    const repetitionMatch = cleaned.match(/(.{10,50}?)(\1){2,}/g);
    if (repetitionMatch) {
      console.warn('⚠️ Detected repetitive text pattern, cleaning up...');
      repetitionMatch.forEach(pattern => {
        // Extract the repeated phrase
        const repeatedPhrase = pattern.match(/^(.{10,50}?)(?:\1)+$/)?.[1];
        if (repeatedPhrase) {
          // Replace multiple occurrences with single occurrence
          cleaned = cleaned.replace(pattern, repeatedPhrase);
        }
      });
    }
    
    // MINIMAL cleanup - preserve technical data, numbers, and performance metrics
    cleaned = cleaned
      // Fix only obvious typos (preserve technical terms and numbers)
      .replace(/\b(Chucnk|chucnk)\b/gi, 'Chunk')
      .replace(/\b(clraely|clrealy|clearyl)\b/gi, 'clearly')
      .replace(/\b(wree|wrere)\b/gi, 'were')
      .replace(/\b(teh)\b/gi, 'the')
      // Only remove VERY long hashes (40+ chars) but preserve technical identifiers
      .replace(/\b[a-f0-9]{40,}\b/g, '[commit-hash]')
      // Clean up excessive whitespace but preserve line breaks and formatting
      .replace(/[ \t]+/g, ' ')  // Multiple spaces/tabs to single space
      .replace(/\n\s*\n\s*\n/g, '\n\n')  // Multiple newlines to double newline
      .trim();
    
    // Only capitalize if it looks like a sentence (starts with lowercase letter)
    if (cleaned && /^[a-z]/.test(cleaned)) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
    
    // More generous fallback threshold  
    if (cleaned.length < 5) {
      return 'Unable to generate an answer from the available research context.';
    }
    
    // Final check for garbage output patterns
    const garbagePatterns = [
      /^(.{5,30})\s+\1{3,}/, // Same short phrase repeated 4+ times at start
      /^[A-Za-z\s]{1,30}(?:\s+[A-Za-z\s]{1,30}){10,}$/ // Endless word repetition
    ];
    
    for (const pattern of garbagePatterns) {
      if (pattern.test(cleaned)) {
        console.error('❌ Detected garbage output pattern, returning fallback');
        return 'The research synthesis produced unclear results. Please try rephrasing your question.';
      }
    }
    
    return cleaned;
  }

  /**
   * Generate basic summary when LLM synthesis fails
   */
  private generateBasicSummary(query: string, sources: SourceReference[]): string {
    if (sources.length === 0) {
      return `I couldn't find specific information to answer "${query}". Please try rephrasing your question or check if the relevant documents are available in the knowledge base.`;
    }
    
    // Clean sources for basic summary
    const cleanSources = sources
      .filter(source => source.excerpt && source.excerpt.length > 10)
      .slice(0, 5) // Limit to top 5 sources
      .map(source => ({
        ...source,
        title: (source.title || 'Untitled').replace(/[^\w\s\-\.]/g, '').trim(),
        excerpt: source.excerpt.replace(/[^\w\s\.\,\!\?\-\(\)]/g, ' ').replace(/\s+/g, ' ').trim()
      }));
    
    const summary = `Based on ${cleanSources.length} relevant sources:\n\n`;
    const sourceList = cleanSources
      .map((source, i) => `${i + 1}. **${source.title}**: ${source.excerpt}`)
      .join('\n\n');
    
    return this.cleanupGeneratedText(summary + sourceList);
  }
  
  /**
   * Calculate overall confidence based on steps and sources
   */
  private calculateOverallConfidence(steps: ResearchStep[], sources: SourceReference[]): number {
    if (sources.length === 0) return 0;
    
    const completedSteps = steps.filter(s => s.status === 'completed').length;
    const stepSuccessRate = completedSteps / Math.max(steps.length, 1);
    
    const avgSimilarity = sources.reduce((sum, s) => sum + (s.similarity || 0.5), 0) / sources.length;
    
    return Math.min((stepSuccessRate * 0.3) + (avgSimilarity * 0.7), 1.0);
  }
  
  /**
   * Parse response from LLM, handling natural language or JSON
   */
  private parseJSONResponse(response: string): Partial<ResearchStep>[] {
    console.log('🔍 Parsing LLM response:', response.substring(0, 300) + (response.length > 300 ? '...' : ''));
    
    // First try JSON parsing
    const jsonMatch = response.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        const validSteps = Array.isArray(parsed) ? parsed : [parsed];
        const processedSteps = validSteps
          .map(step => this.validateStepType(step))
          .filter(step => this.isStepAllowed(step));
        
        if (processedSteps.length > 0) {
          console.log(`✅ Successfully parsed ${processedSteps.length} valid steps from JSON`);
          return processedSteps;
        }
      } catch (e) {
        // Continue to natural language parsing
      }
    }
    
    // Parse natural language response
    return this.parseNaturalLanguageSteps(response);
  }
  
  /**
   * Parse research steps from natural language
   */
  private parseNaturalLanguageSteps(response: string): Partial<ResearchStep>[] {
    const steps: Partial<ResearchStep>[] = [];
    const lines = response.split('\n').filter(line => line.trim());
    
    // Look for numbered steps or bullet points
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Check if this line describes a research step
      if (lowerLine.includes('search') || lowerLine.includes('look for') || lowerLine.includes('find')) {
        let type: 'rag_search' | 'web_search' = 'rag_search';
        let reasoning = line;
        
        // Determine type
        if (lowerLine.includes('web') || lowerLine.includes('online') || lowerLine.includes('internet')) {
          type = 'web_search';
        } else if (lowerLine.includes('knowledge base') || lowerLine.includes('local') || lowerLine.includes('rag')) {
          type = 'rag_search';
        }
        
        // Clean up reasoning
        reasoning = reasoning.replace(/^[\d\-•*\.]\s*/, '').trim();
        
        // Only add if allowed
        if ((type === 'rag_search' && this.config.enableRAGSearch) ||
            (type === 'web_search' && this.config.enableWebSearch)) {
          steps.push({ type, reasoning });
        }
      }
    }
    
    // If no steps found, create a basic one
    if (steps.length === 0) {
      console.log('🔄 No clear steps found, using basic strategy');
      if (this.config.enableRAGSearch) {
        steps.push({
          type: 'rag_search',
          reasoning: 'Search knowledge base for relevant information'
        });
      } else if (this.config.enableWebSearch) {
        steps.push({
          type: 'web_search',
          reasoning: 'Search the web for relevant information'
        });
      }
    }
    
    console.log(`✅ Parsed ${steps.length} steps from natural language`);
    return steps;
  }

  /**
   * Extract JSON array with proper bracket matching
   */
  private extractJSONArray(text: string): string | null {
    const startIndex = text.indexOf('[');
    if (startIndex === -1) return null;
    
    let bracketCount = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < text.length; i++) {
      const char = text[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"' && !escapeNext) {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '[') {
          bracketCount++;
        } else if (char === ']') {
          bracketCount--;
          if (bracketCount === 0) {
            return text.substring(startIndex, i + 1);
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Expand queries to find diverse speed runs and performance data
   * @deprecated Not currently used - preserved for potential future use
   */
  // @ts-ignore - Method preserved for future use
  private expandQueriesForDiversity(originalQuery: string, analysis: QueryAnalysis): string[] {
    const queries = [originalQuery];
    
    // Detect if query is about performance/runs/speed
    const isPerformanceQuery = /\b(run|speed|performance|time|result|experiment|test|benchmark|trial|attempt)\b/i.test(originalQuery);
    const isTopNQuery = /\b(top|best|first|second|third|\d+)\b/i.test(originalQuery);
    const hasBlogReference = /\b(blog|tyler|romero)\b/i.test(originalQuery);
    
    if (isPerformanceQuery && isTopNQuery && hasBlogReference) {
      // Generate variations to find different runs/experiments
      const baseTerms = originalQuery.replace(/top \d+/gi, '').trim();
      
      queries.push(
        // Different terminology for "runs"
        originalQuery.replace(/runs?/gi, 'experiments'),
        originalQuery.replace(/runs?/gi, 'attempts'),
        originalQuery.replace(/runs?/gi, 'tests'),
        originalQuery.replace(/runs?/gi, 'trials'),
        
        // Search for comparisons and multiple instances
        `multiple ${baseTerms}`,
        `different ${baseTerms}`,
        `various ${baseTerms}`,
        `comparison ${baseTerms}`,
        `several ${baseTerms}`,
        
        // Performance-specific terms
        `${baseTerms} performance metrics`,
        `${baseTerms} timing results`,
        `${baseTerms} speed comparison`,
        `${baseTerms} benchmark results`,
        
        // Tyler-specific with different approaches
        'Tyler nanogpt speed',
        'Tyler performance results',
        'Tyler timing experiments',
        'Tyler GPU performance'
      );
    }
    
    // Remove duplicates and return unique queries
    return [...new Set(queries.filter(q => q.length > 3))];
  }

  /**
   * Extract JSON object with proper brace matching
   */
  private extractJSONObject(text: string): string | null {
    const startIndex = text.indexOf('{');
    if (startIndex === -1) return null;
    
    let braceCount = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < text.length; i++) {
      const char = text[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"' && !escapeNext) {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            return text.substring(startIndex, i + 1);
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Check if a step type is allowed based on configuration
   */
  private isStepAllowed(step: Partial<ResearchStep>): boolean {
    if (!step.type) return false;
    
    switch (step.type) {
      case 'rag_search':
        return this.config.enableRAGSearch;
      case 'web_search':
        return this.config.enableWebSearch;
      case 'analysis':
      case 'synthesis':
      case 'verification':
        return true; // These are always allowed
      default:
        return false;
    }
  }

  /**
   * Validate and fix malformed step types
   */
  private validateStepType(step: any): Partial<ResearchStep> {
    if (!step || typeof step !== 'object') {
      return step;
    }
    
    // Fix malformed step types
    if (step.type) {
      const type = step.type.toLowerCase();
      
      // Handle combined types like "rag_search|web_search"
      if (type.includes('rag') && type.includes('web')) {
        // Prefer RAG search first if both are mentioned
        step.type = this.config.enableRAGSearch ? 'rag_search' : 'web_search';
      } else if (type.includes('rag') || type.includes('knowledge') || type.includes('document')) {
        step.type = 'rag_search';
      } else if (type.includes('web') || type.includes('internet') || type.includes('search')) {
        step.type = 'web_search';
      } else if (type.includes('analysis') || type.includes('analyze')) {
        step.type = 'analysis';
      } else if (type.includes('synthesis') || type.includes('combine')) {
        step.type = 'synthesis';
      }
      
      // Validate final type
      const validTypes = ['analysis', 'rag_search', 'web_search', 'synthesis', 'verification'];
      if (!validTypes.includes(step.type)) {
        console.warn(`Invalid step type "${step.type}", defaulting to rag_search`);
        step.type = this.config.enableRAGSearch ? 'rag_search' : 'web_search';
      }
    }
    
    return step;
  }

  /**
   * Update step and notify callback
   */
  private updateStep(step: ResearchStep, updates: Partial<ResearchStep>) {
    Object.assign(step, updates);
    if (this.onStepUpdate) {
      this.onStepUpdate(step);
    }
  }
}

/**
 * Utility functions for research orchestration
 */
export class ResearchUtils {
  /**
   * Create a research orchestrator with default configuration
   */
  static createOrchestrator(
    vectorStore: VectorStore | null,
    webSearchService: UnifiedWebSearchService | null,
    config?: Partial<ResearchConfig>
  ): ResearchOrchestrator {
    const orchestrator = new ResearchOrchestrator(vectorStore, webSearchService);
    if (config) {
      orchestrator.configure(config);
    }
    return orchestrator;
  }
  
  /**
   * Extract key insights from research results
   */
  static extractInsights(result: ResearchResult): {
    sourceTypes: Record<string, number>;
    avgConfidence: number;
    researchEfficiency: number;
  } {
    const sourceTypes = result.sources.reduce((acc, source) => {
      acc[source.type] = (acc[source.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const avgConfidence = result.confidence;
    const researchEfficiency = result.metadata.sourcesFound / result.metadata.stepsExecuted;
    
    return {
      sourceTypes,
      avgConfidence,
      researchEfficiency
    };
  }
}