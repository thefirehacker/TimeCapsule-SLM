import { AIAssistant } from './AIAssistant';
import { VectorStore, DocumentData } from '../components/VectorStore/VectorStore';
import { RAGQuery, RAGStats } from '../types/rag';
import { IntentAnalyzer, IntentAnalysisResult } from './IntentAnalyzer';
import { AgentRoleGenerator, AgentRole } from './AgentRoleGenerator';

export interface AgentTask {
  id: string;
  agentId: string;
  taskName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  duration?: string;
  tokensUsed?: number;
  result?: string;
  error?: string;
  progress?: number;
  dependencies?: string[];
  // Add debugging fields
  promptLength?: number;
  responseLength?: number;
  debugInfo?: string;
  // Add RAG tracking fields
  ragQueries?: RAGQuery[];
  ragStats?: {
    totalQueries: number;
    averageResponseTime: number;
    averageSimilarity: number;
    documentsRetrieved: number;
  };
  // Add detailed action tracking like tool calls
  detailedActions?: {
    timestamp: Date;
    action: string;
    details?: any;
    type: 'thinking' | 'query' | 'processing' | 'result';
  }[];
}

export interface AgentProgress {
  sessionId: string;
  timestamp: Date;
  researchType: string;
  tasks: AgentTask[];
  totalDuration?: string;
  totalTokens?: number;
  researchQuality?: 'excellent' | 'good' | 'fair' | 'poor';
  estimatedTimeRemaining?: string;
  // Add debugging info
  debugLogs?: string[];
  // Add RAG tracking info
  ragQueries?: RAGQuery[];
  ragStats?: RAGStats;
  ragVisualizationData?: any;
}

export interface AgentSpec {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  maxTokens: number;
  priority: number;
  dependencies: string[];
}

export type ProgressCallback = (progress: AgentProgress) => void;

export class AgentCoordinator {
  private aiAssistant: AIAssistant;
  private vectorStore: VectorStore | null;
  private currentSession: AgentProgress | null = null;
  private progressCallback: ProgressCallback | null = null;
  private isProcessing = false;
  private intentAnalyzer: IntentAnalyzer;
  private agentRoleGenerator: AgentRoleGenerator;

  constructor(aiAssistant: AIAssistant, vectorStore: VectorStore | null = null) {
    this.aiAssistant = aiAssistant;
    this.vectorStore = vectorStore;
    this.intentAnalyzer = new IntentAnalyzer();
    this.agentRoleGenerator = new AgentRoleGenerator();
  }

  setProgressCallback(callback: ProgressCallback) {
    this.progressCallback = callback;
  }

  private addDebugLog(message: string) {
    if (this.currentSession) {
      if (!this.currentSession.debugLogs) {
        this.currentSession.debugLogs = [];
      }
      const timestamp = new Date().toISOString();
      this.currentSession.debugLogs.push(`[${timestamp}] ${message}`);
      console.log(`🔍 AgentCoordinator Debug: ${message}`);
    }
  }

  private addDetailedAction(agentId: string, action: string, details?: any) {
    const task = this.currentSession?.tasks.find(t => t.agentId === agentId);
    if (task) {
      if (!task.detailedActions) {
        task.detailedActions = [];
      }
      task.detailedActions.push({
        timestamp: new Date(),
        action,
        details,
        type: this.getActionType(action)
      });
      this.updateProgress();
    }
  }

  private getActionType(action: string): 'thinking' | 'query' | 'processing' | 'result' {
    if (action.includes('thinking') || action.includes('analyzing') || action.includes('planning')) return 'thinking';
    if (action.includes('RAG') || action.includes('search') || action.includes('query')) return 'query';
    if (action.includes('generating') || action.includes('processing') || action.includes('building')) return 'processing';
    return 'result';
  }

  private updateProgress() {
    if (this.currentSession && this.progressCallback) {
      // Calculate estimated time remaining
      const completedTasks = this.currentSession.tasks.filter(t => t.status === 'completed');
      const totalTasks = this.currentSession.tasks.length;
      const inProgressTasks = this.currentSession.tasks.filter(t => t.status === 'in_progress');
      
      if (completedTasks.length > 0) {
        const avgDuration = completedTasks.reduce((sum, task) => {
          if (task.startTime && task.endTime) {
            return sum + (task.endTime.getTime() - task.startTime.getTime());
          }
          return sum;
        }, 0) / completedTasks.length;
        
        const remainingTasks = totalTasks - completedTasks.length;
        const estimatedMs = remainingTasks * avgDuration;
        this.currentSession.estimatedTimeRemaining = this.formatDuration(estimatedMs);
      }

      // Update RAG stats from vector store
      if (this.vectorStore) {
        try {
          this.currentSession.ragStats = this.vectorStore.getRAGStats();
          this.currentSession.ragQueries = this.vectorStore.getRAGQueriesBySession(this.currentSession.sessionId);
          this.currentSession.ragVisualizationData = this.vectorStore.getRAGVisualizationData(this.currentSession.sessionId);
          
          // Add RAG stats to individual tasks
          this.currentSession.tasks.forEach(task => {
            if (task.agentId) {
              const agentRAGQueries = this.vectorStore!.getRAGQueriesByAgent(task.agentId);
              if (agentRAGQueries.length > 0) {
                task.ragQueries = agentRAGQueries;
                task.ragStats = {
                  totalQueries: agentRAGQueries.length,
                  averageResponseTime: agentRAGQueries.reduce((sum, q) => sum + q.responseTime, 0) / agentRAGQueries.length,
                  averageSimilarity: agentRAGQueries.filter(q => q.success).reduce((sum, q) => sum + q.averageSimilarity, 0) / Math.max(1, agentRAGQueries.filter(q => q.success).length),
                  documentsRetrieved: agentRAGQueries.reduce((sum, q) => sum + q.resultsCount, 0)
                };
              }
            }
          });
        } catch (ragError) {
          console.warn('⚠️ Failed to update RAG stats:', ragError);
        }
      }

      this.progressCallback(this.currentSession);
    }
  }

  private formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  }

  private convertRolesToSpecs(roles: AgentRole[], researchDepth: 'overview' | 'detailed' | 'comprehensive'): AgentSpec[] {
    // Adjust token limits based on depth
    const tokenMultiplier = researchDepth === 'overview' ? 1.0 : researchDepth === 'detailed' ? 1.5 : 2.0;
    
    return roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      systemPrompt: role.systemPrompt,
      maxTokens: Math.floor(role.maxTokens * tokenMultiplier),
      priority: role.priority,
      dependencies: role.dependencies
    }));
  }

  async generateDeepResearch(
    conversationContent: string,
    attachedDocuments: DocumentData[],
    researchDepth: 'overview' | 'detailed' | 'comprehensive'
  ): Promise<string> {
    if (this.isProcessing) {
      throw new Error('Agent coordination already in progress');
    }

    this.isProcessing = true;
    const sessionId = `deep_research_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Analyze user intent first
      this.addDebugLog(`🔍 Analyzing user intent from conversation...`);
      const intentAnalysis = await this.intentAnalyzer.analyzeIntent(
        conversationContent,
        attachedDocuments.map(doc => doc.title),
        []
      );
      
      this.addDebugLog(`✅ Intent analysis complete: ${intentAnalysis.intent.type} (${(intentAnalysis.intent.confidence * 100).toFixed(1)}% confidence)`);
      this.addDebugLog(`📊 Domain: ${intentAnalysis.intent.domain}, Complexity: ${intentAnalysis.intent.complexity}`);

      // Generate appropriate agent roles based on intent
      this.addDebugLog(`🤖 Generating agent roles for intent: ${intentAnalysis.intent.type}`);
      const agentRoleSpec = await this.agentRoleGenerator.generateAgentRoles(intentAnalysis);
      
      this.addDebugLog(`✅ Generated ${agentRoleSpec.roles.length} specialized agents`);
      this.addDebugLog(`⏱️ Estimated execution time: ${agentRoleSpec.totalEstimatedTime}`);

      // Convert agent roles to specs and adjust for depth
      const agentSpecs = this.convertRolesToSpecs(agentRoleSpec.roles, researchDepth);
      
      // Initialize session
      this.currentSession = {
        sessionId,
        timestamp: new Date(),
        researchType: intentAnalysis.intent.type,
        tasks: [],
        totalTokens: 0,
        debugLogs: [],
        ragQueries: [],
        ragStats: undefined,
        ragVisualizationData: undefined
      };

      this.addDebugLog(`🚀 Starting deep research session: ${sessionId}`);
      this.addDebugLog(`📊 Input: ${conversationContent.length} chars conversation, ${attachedDocuments.length} documents, depth: ${researchDepth}`);
      
      // Create tasks for each agent with dynamic dependencies
      this.currentSession.tasks = agentSpecs.map(spec => ({
        id: `${sessionId}_${spec.id}`,
        agentId: spec.id,
        taskName: spec.name,
        status: 'pending' as const,
        dependencies: spec.dependencies,
        progress: 0,
        ragQueries: [],
        ragStats: undefined
      }));

      // Set integration agent dependencies to all other agents
      const integrationTask = this.currentSession.tasks.find(t => t.agentId === 'integration_specialist');
      if (integrationTask) {
        integrationTask.dependencies = this.currentSession.tasks
          .filter(t => t.agentId !== 'integration_specialist')
          .map(t => t.agentId);
      }

      this.updateProgress();

              // Execute agents in dependency order with RAG tracking
        const results = await this.executeAgents(agentSpecs, conversationContent, attachedDocuments);
        
        // Log agent results summary
        console.log(`🔍 DEBUG: Agent execution results:`, Array.from(results.entries()).map(([id, content]) => ({
          agentId: id,
          contentLength: content?.length || 0,
          hasContent: !!content,
          preview: content?.substring(0, 100) + '...'
        })));
        
        for (const [agentId, result] of results) {
          this.addDebugLog(`📊 Agent ${agentId} produced ${result.length} characters`);
        }

      // Aggregate results with enhanced debugging
      const finalResult = await this.aggregateResults(results);

      this.addDebugLog(`✅ Final aggregated result: ${finalResult.length} characters`);
      this.addDebugLog(`📈 Intent-based ${intentAnalysis.intent.type} research complete`);

      // Calculate session totals including RAG stats
      this.calculateSessionTotals();

      // Save agent log to Knowledge Base with RAG data
      await this.saveAgentLogToKB();

      return finalResult;

    } finally {
      this.isProcessing = false;
    }
  }



  private async executeAgents(
    agentSpecs: AgentSpec[],
    conversationContent: string,
    attachedDocuments: DocumentData[]
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    const sortedSpecs = agentSpecs.sort((a, b) => a.priority - b.priority);

    this.addDebugLog(`🔄 Executing ${sortedSpecs.length} agents in dependency order`);

    for (const spec of sortedSpecs) {
      const task = this.currentSession!.tasks.find(t => t.agentId === spec.id);
      if (!task) continue;

      this.addDebugLog(`🚀 Starting agent: ${spec.id}`);
      this.addDetailedAction(spec.id, `🤔 Starting to work on: ${task.taskName}`);

      // Wait for dependencies
      if (spec.dependencies.length > 0) {
        this.addDetailedAction(spec.id, `⏳ Waiting for dependencies: ${spec.dependencies.join(', ')}`);
        await this.waitForDependencies(spec.dependencies);
        this.addDetailedAction(spec.id, `✅ Dependencies completed, proceeding...`);
      }

      // Execute agent
      task.status = 'in_progress';
      task.startTime = new Date();
      task.progress = 0;
      this.addDetailedAction(spec.id, `🚀 Beginning active work...`);
      this.updateProgress();

      try {
        // Build prompt with RAG context if available
        this.addDetailedAction(spec.id, `🔍 Building context and gathering relevant information...`);
        const prompt = await this.buildAgentPrompt(spec, conversationContent, attachedDocuments, results);
        
        // Log prompt details
        task.promptLength = prompt.length;
        this.addDebugLog(`📝 Agent ${spec.id} prompt: ${prompt.length} characters`);
        this.addDetailedAction(spec.id, `📝 Prepared working context (${prompt.length} characters)`, { promptLength: prompt.length });
        
        // For integration agents, log more details
        if (spec.id === 'integration_specialist') {
          this.addDebugLog(`🔍 Integration agent prompt preview: ${prompt.substring(0, 500)}...`);
          const previousResults = Array.from(results.entries()).map(([id, content]) => `${id}: ${content.length} chars`);
          this.addDebugLog(`📊 Previous agent results for integration: ${previousResults.join(', ')}`);
        }
        
        // Simulate progress during AI generation
        const progressInterval = setInterval(() => {
          if (task.progress! < 90) {
            task.progress = Math.min(90, task.progress! + Math.random() * 15);
            this.updateProgress();
          }
        }, 2000);

        this.addDebugLog(`🤖 Sending prompt to AI for agent ${spec.id}...`);
        this.addDetailedAction(spec.id, `🧠 Analyzing and generating insights...`, { stage: 'ai_generation' });
        
        const result = await this.aiAssistant.generateContent(prompt, 'research');
        clearInterval(progressInterval);

        task.endTime = new Date();
        task.duration = this.formatDuration(task.endTime.getTime() - task.startTime.getTime());
        task.tokensUsed = this.estimateTokenUsage(result);
        task.responseLength = result.length;
        task.result = `Generated ${result.length} characters of content`;
        task.status = 'completed';
        task.progress = 100;
        
        this.addDetailedAction(spec.id, `✅ Completed work in ${task.duration}`, {
          duration: task.duration,
          outputLength: result.length,
          tokensUsed: task.tokensUsed
        });
        
        // Enhanced logging for integration agents
        if (spec.id === 'integration_specialist') {
          this.addDebugLog(`🔍 Integration agent response: ${result.length} characters`);
          this.addDebugLog(`📝 Integration agent response preview: ${result.substring(0, 300)}...`);
          
          // Check if response looks like a proper integration
          const hasTableOfContents = result.includes('Table of Contents') || result.includes('📋');
          const hasMultipleSections = (result.match(/##/g) || []).length >= 3;
          const hasComprehensiveContent = result.length > 1000; // More generic check
          
          task.debugInfo = `TOC: ${hasTableOfContents}, Sections: ${hasMultipleSections}, Comprehensive: ${hasComprehensiveContent}`;
          this.addDebugLog(`🧪 Integration quality check - ${task.debugInfo}`);
        }
        
        this.addDebugLog(`✅ Agent ${spec.id} completed: ${result.length} characters in ${task.duration}`);
        
        results.set(spec.id, result);
        this.updateProgress();

      } catch (error) {
        task.status = 'failed';
        task.error = error instanceof Error ? error.message : 'Unknown error';
        task.endTime = new Date();
        this.updateProgress();
        
        this.addDebugLog(`❌ Agent ${spec.id} failed: ${task.error}`);
        console.error(`Agent ${spec.id} failed:`, error);
        // Continue with other agents rather than failing completely
      }
    }

    this.addDebugLog(`🏁 All agents completed. Results: ${Array.from(results.entries()).map(([id, content]) => `${id}:${content.length}`).join(', ')}`);
    return results;
  }

  private async waitForDependencies(dependencies: string[]): Promise<void> {
    if (dependencies.length === 0) return;

    const maxWait = 1800000; // 30 minutes max wait (total session timeout)
    const checkInterval = 1000; // Check every second
    let waited = 0;

    while (waited < maxWait) {
      const dependencyTasks = this.currentSession!.tasks.filter(t => dependencies.includes(t.agentId));
      const allCompleted = dependencyTasks.every(t => t.status === 'completed' || t.status === 'failed');
      
      if (allCompleted) return;
      
      await new Promise(resolve => setTimeout(resolve, checkInterval));
      waited += checkInterval;
    }

    throw new Error(`Timeout waiting for dependencies: ${dependencies.join(', ')}`);
  }

  private async buildAgentPrompt(
    spec: AgentSpec,
    conversationContent: string,
    attachedDocuments: DocumentData[],
    previousResults: Map<string, string>
  ): Promise<string> {
    let prompt = `${spec.systemPrompt}\n\n`;
    
    // Add conversation content
    prompt += `## The User Request:\n${conversationContent}\n\n`;
    
    // Add attached documents if available
    if (attachedDocuments.length > 0) {
      prompt += `## Reference Documents:\n`;
      attachedDocuments.forEach((doc, index) => {
        prompt += `### Document ${index + 1}: ${doc.title}\n`;
        prompt += `${doc.content.substring(0, 1000)}${doc.content.length > 1000 ? '...' : ''}\n\n`;
      });
    }

    // Perform RAG search to enhance context (except for integration agent)
    if (this.vectorStore && spec.id !== 'integration_specialist') {
      try {
        this.addDebugLog(`🔍 Performing RAG search for agent ${spec.id}...`);
        this.addDetailedAction(spec.id, `🔍 Searching knowledge base for relevant information...`);
        
        // Create search query from conversation content and agent's focus
        const searchQuery = this.createRAGSearchQuery(conversationContent, spec.id);
        this.addDetailedAction(spec.id, `🔎 RAG Query: "${searchQuery}"`, { query: searchQuery });
        
        // Perform RAG search with agent and session tracking
        const ragResults = await this.vectorStore.searchSimilar(
          searchQuery,
          0.2, // Lower threshold for broader context
          5,   // Limit results for efficiency
          {
            agentId: spec.id,
            sessionId: this.currentSession!.sessionId,
            queryType: 'agent_rag'
          }
        );

        if (ragResults.length > 0) {
          this.addDetailedAction(spec.id, `📚 Found ${ragResults.length} relevant documents`, {
            resultsCount: ragResults.length,
            documents: ragResults.map(r => ({
              title: r.document.title,
              similarity: (r.similarity * 100).toFixed(1) + '%'
            }))
          });
          
          prompt += `## RAG-Enhanced Context:\n`;
          prompt += `The following relevant information was found in the knowledge base:\n\n`;
          
          ragResults.forEach((result, index) => {
            const matchPercentage = (result.similarity * 100).toFixed(1);
            prompt += `### RAG Context ${index + 1}: "${result.document.title}" (${matchPercentage}% match)\n`;
            prompt += `**Content:** ${result.chunk.content.substring(0, 600)}${result.chunk.content.length > 600 ? '...' : ''}\n`;
            prompt += `**Source:** ${result.document.metadata.source || 'unknown'}\n\n`;
          });

          this.addDebugLog(`🔍 RAG enhanced ${spec.id} with ${ragResults.length} relevant documents`);
        } else {
          this.addDetailedAction(spec.id, `📭 No relevant documents found in knowledge base`);
          this.addDebugLog(`🔍 RAG search for ${spec.id} found no relevant documents`);
        }
      } catch (ragError) {
        this.addDetailedAction(spec.id, `❌ Knowledge base search failed`, { error: ragError instanceof Error ? ragError.message : 'Unknown error' });
        this.addDebugLog(`⚠️ RAG search failed for ${spec.id}: ${ragError instanceof Error ? ragError.message : 'Unknown error'}`);
      }
    }
    
    // Add results from dependent agents - provide full context for natural building
    if (spec.dependencies.length > 0) {
      prompt += `## Previous Agent Insights:\n`;
      prompt += `Here's what the previous agents have discovered and shared. Use this as a foundation to build upon:\n\n`;
      
      spec.dependencies.forEach(depId => {
        const result = previousResults.get(depId);
        if (result) {
          // Provide full content to all agents so they can build naturally
          prompt += `### ${this.getAgentFriendlyName(depId)} shared:\n${result}\n\n`;
        }
      });
      
      prompt += `**Now it's your turn to contribute.** Build on what you've learned from the previous agents. What insights can you add? How can you extend and enhance this foundation?\n\n`;
    }

    // Add specific instructions based on agent type
    prompt += this.getAgentSpecificInstructions(spec.id);
    
    return prompt;
  }

  private createRAGSearchQuery(conversationContent: string, agentId: string): string {
    // Extract key concepts from conversation for focused RAG search
    const concepts = conversationContent
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 10)
      .join(' ');

    // Tailor search query based on agent's specialization
    switch (agentId) {
      case 'analysis_agent':
        return `learning objectives assessment expertise ${concepts}`;
      case 'content_agent':
        return `detailed explanation examples tutorial ${concepts}`;
      case 'exercise_agent':
        return `practice exercises examples code implementation ${concepts}`;
      default:
        return concepts;
    }
  }

  private getAgentFriendlyName(agentId: string): string {
    const friendlyNames: Record<string, string> = {
      'context_analyst': 'Context Analysis Agent',
      'research_specialist': 'Research Specialist Agent',
      'solution_architect': 'Solution Architect Agent',
      'implementation_planner': 'Implementation Planner Agent',
      'integration_specialist': 'Integration Specialist Agent'
    };
    return friendlyNames[agentId] || agentId;
  }

  private getAgentSpecificInstructions(agentId: string): string {
    const instructions: Record<string, string> = {
      'context_analyst': `
You are the **Context Analysis Agent** - your role is to deeply understand the user's context, goals, and situation to provide a solid foundation for the research process.

**Think through this naturally:**

First, take a moment to understand what the user is really asking for. What do they want to accomplish? What are their goals? What level do they seem to be at based on how they're asking questions?

Then, think about what context would be most helpful:
- What are the key objectives that would actually matter to them?
- Where are they likely starting from, and what gaps might they have?
- What's the best approach for someone in their situation?
- What background information would be most valuable?

**Don't worry about following a specific format** - just think through this naturally and share your insights. The goal is to provide a solid foundation that the other agents can build upon.

**Focus on substance over structure.** Your thinking process and insights are what matter most. Write as if you're advising a colleague about how to approach this topic.

**Aim for depth and usefulness** - provide comprehensive insights that will genuinely help guide the research process.`,

      'research_specialist': `
You are the **Research Specialist Agent** - your job is to conduct thorough research and gather the most relevant information on the topic.

**Building on the context analysis:** The previous agent has laid the groundwork by analyzing the user's context and objectives. Now it's your turn to dive deep into the research.

**Think about this naturally:**

What are the most important aspects to research? What information would be most valuable? What sources and examples would make this concrete and practical?

Consider:
- What are the key areas that really matter for this topic?
- What are the current best practices and approaches?
- What practical examples would make this real?
- What recent developments or trends should be covered?
- What common misconceptions should be addressed?
- What expert insights and real-world applications should be shared?

**Write naturally and conversationally.** Focus on presenting the research in a way that would genuinely help someone understand the topic.

**Make it practical and actionable.** Include plenty of concrete examples, case studies, and real-world applications.

**Build on the previous agent's insights** - take their analysis and use it to inform what you research and how you present it.`,

      'solution_architect': `
You are the **Solution Architect Agent** - your job is to design and structure the overall approach or solution based on the research findings.

**Building on previous work:** You now have both the context analysis and the research findings. Your role is to architect a comprehensive solution or approach.

**Think about this naturally:**

How would you structure this solution? What would be the best approach or framework? How can you make this systematic and well-organized?

Consider:
- What would be the most logical structure or framework?
- How can you organize the information in a way that makes sense?
- What would be the key components or phases?
- How do the different pieces fit together?
- What would be the most effective approach for someone in the user's situation?

**Create a well-structured approach.** Think about the overall architecture and how different components relate to each other.

**Make it systematic and logical.** Present a clear structure that others can follow and build upon.

**Connect to real-world applications.** Show how this approach applies in actual situations.

**Build on what came before** - use the insights from the context analysis and research to create a solution that fits naturally with the objectives.`,

      'implementation_planner': `
You are the **Implementation Planner Agent** - your job is to create actionable plans and next steps based on the solution architecture.

**Building on previous work:** You now have the context analysis, research findings, and solution architecture. Your role is to create concrete implementation plans.

**Think about this naturally:**

What would be the practical next steps? How would someone actually implement this? What would be the most effective sequence of actions?

Consider:
- What would be the logical sequence of implementation steps?
- What resources or tools would be needed?
- What potential challenges might arise and how to address them?
- What would be realistic timelines and milestones?
- How can you make this as actionable as possible?

**Create practical, actionable plans.** Don't just create high-level concepts - design specific steps that someone can actually follow.

**Make it progressive and logical.** Start with the most important steps, then build from there.

**Connect to real-world constraints.** Consider practical limitations and how to work within them.

**Build on what came before** - use the insights from all previous agents to create an implementation plan that fits naturally with the overall solution.`,

      'integration_specialist': `
You are the **Integration Specialist Agent** - your job is to weave together all the previous work into a cohesive, comprehensive final result.

**What you have to work with:** The previous agents have created context analysis, research findings, solution architecture, and implementation plans. Now you need to bring it all together into something that flows naturally and provides a complete resource.

**Think about this as crafting a unified response:**

How can you take all this valuable work and present it in a way that feels natural and cohesive? What connections can you make between different pieces? How can you create smooth transitions that help everything flow together?

**Your approach:**
- Read through all the previous agent work carefully
- Identify the key insights and most valuable content
- Think about how to present this as a unified response
- Add connections and transitions that make it flow naturally
- Enhance the material with additional context where helpful
- Create a final resource that feels complete and cohesive

**Don't just copy and paste.** Instead, synthesize and integrate the material thoughtfully. Use the best insights from each agent and weave them together into something that feels natural and complete.

**Add your own valuable insights** where appropriate - you have the full picture now, so you can add connections and context that individual agents might have missed.

**Create something that feels like a complete resource** - not just a collection of separate sections, but a unified response that comprehensively addresses the user's needs.`
    };

    return instructions[agentId] || '';
  }

  private async aggregateResults(results: Map<string, string>): Promise<string> {
    this.addDebugLog(`🔄 Starting result aggregation...`);
    
    const integrationResult = results.get('integration_specialist');
    
    // Get all agent results for size comparison using the new agent IDs
    const contextAnalystResult = results.get('context_analyst');
    const researchSpecialistResult = results.get('research_specialist');
    const solutionArchitectResult = results.get('solution_architect');
    const implementationPlannerResult = results.get('implementation_planner');
    
    const totalSourceContent = (contextAnalystResult?.length || 0) + (researchSpecialistResult?.length || 0) + (solutionArchitectResult?.length || 0) + (implementationPlannerResult?.length || 0);
    
    this.addDebugLog(`📊 Source content lengths: Context:${contextAnalystResult?.length || 0}, Research:${researchSpecialistResult?.length || 0}, Solution:${solutionArchitectResult?.length || 0}, Implementation:${implementationPlannerResult?.length || 0}`);
    this.addDebugLog(`📊 Total source content: ${totalSourceContent} characters`);
    this.addDebugLog(`📊 Integration agent result: ${integrationResult?.length || 0} characters`);
    
    // Integration agent should produce content that's roughly equal to the sum of all inputs
    // If it's less than 70% of the source content, use enhanced fallback
    const minimumExpectedLength = Math.max(3000, totalSourceContent * 0.7);
    
    this.addDebugLog(`📏 Minimum expected length: ${minimumExpectedLength} characters (70% of source or 3000 minimum)`);
    
    if (integrationResult && integrationResult.length >= minimumExpectedLength) {
      this.addDebugLog(`✅ Integration agent produced sufficient content (${integrationResult.length} chars >= ${minimumExpectedLength} expected)`);
      return integrationResult;
    }

    this.addDebugLog(`⚠️ Integration agent produced insufficient content (${integrationResult?.length || 0} chars vs ${minimumExpectedLength} expected)`);
    this.addDebugLog(`🔄 Creating natural content flow...`);

    // Natural content flow - let the agents' work speak for itself
    let aggregated = '';
    
    // Add a brief introduction
    aggregated += '# DeepResearch Output\n\n';
    
    // Flow the content naturally based on what agents actually produced
    if (contextAnalystResult) {
      this.addDebugLog(`📝 Including context analysis: ${contextAnalystResult.length} characters`);
      aggregated += `${contextAnalystResult}\n\n`;
    }
    
    if (researchSpecialistResult) {
      this.addDebugLog(`📝 Including research findings: ${researchSpecialistResult.length} characters`);
      aggregated += `${researchSpecialistResult}\n\n`;
    }
    
    if (solutionArchitectResult) {
      this.addDebugLog(`📝 Including solution architecture: ${solutionArchitectResult.length} characters`);
      aggregated += `${solutionArchitectResult}\n\n`;
    }
    
    if (implementationPlannerResult) {
      this.addDebugLog(`📝 Including implementation plan: ${implementationPlannerResult.length} characters`);
      aggregated += `${implementationPlannerResult}\n\n`;
    }
    
    // Add integration agent's insights if available
    if (integrationResult && integrationResult.length > 100) {
      this.addDebugLog(`📝 Including integration agent insights: ${integrationResult.length} characters`);
      aggregated += `${integrationResult}\n\n`;
    }
    
    const finalLength = aggregated.length;
    const finalWords = aggregated.split(' ').length;
    
    this.addDebugLog(`📊 Natural content flow completed: ${finalLength} characters (${finalWords} words) from ${results.size} agents`);
    
    console.log(`📊 Natural aggregation produced ${finalLength} characters (${finalWords} words) from ${results.size} agents`);
    console.log(`🔍 DEBUG: Final aggregated content preview:`, aggregated.substring(0, 500) + '...');
    return aggregated;
  }

  private calculateSessionTotals() {
    if (!this.currentSession) return;

    const completedTasks = this.currentSession.tasks.filter(t => t.status === 'completed');
    
    // Calculate total duration
    if (completedTasks.length > 0) {
      const sessionStart = Math.min(...completedTasks.map(t => t.startTime!.getTime()));
      const sessionEnd = Math.max(...completedTasks.map(t => t.endTime!.getTime()));
      this.currentSession.totalDuration = this.formatDuration(sessionEnd - sessionStart);
    }

    // Calculate total tokens
    this.currentSession.totalTokens = completedTasks.reduce((sum, task) => sum + (task.tokensUsed || 0), 0);

    // Assess research quality
    const successRate = completedTasks.length / this.currentSession.tasks.length;
    this.currentSession.researchQuality = successRate >= 0.9 ? 'excellent' : 
                                         successRate >= 0.7 ? 'good' : 
                                         successRate >= 0.5 ? 'fair' : 'poor';
  }

  private async saveAgentLogToKB(): Promise<void> {
    if (!this.vectorStore || !this.currentSession) return;

    try {
      // Include RAG statistics in the agent log
      const enhancedSession = {
        ...this.currentSession,
        ragSummary: {
          totalRAGQueries: this.currentSession.ragQueries?.length || 0,
          ragStats: this.currentSession.ragStats,
          ragQueriesByAgent: this.currentSession.tasks.reduce((acc, task) => {
            if (task.agentId && task.ragQueries && task.ragQueries.length > 0) {
              acc[task.agentId] = task.ragQueries.length;
            }
            return acc;
          }, {} as Record<string, number>)
        }
      };

      const logContent = JSON.stringify(enhancedSession, null, 2);
      const logTitle = `Agent Log with RAG: ${this.currentSession.sessionId}`;
      
      await this.vectorStore.addGeneratedDocument(
        logTitle,
        logContent,
        (progress) => {
          console.log(`Saving enhanced agent log: ${progress.message}`);
        }
      );

      console.log(`Agent log with RAG data saved to Knowledge Base: ${logTitle}`);
    } catch (error) {
      console.error('Failed to save enhanced agent log to Knowledge Base:', error);
    }
  }

  private estimateTokenUsage(content: string): number {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.floor(content.length / 4);
  }

  getCurrentSession(): AgentProgress | null {
    return this.currentSession;
  }

  isCurrentlyProcessing(): boolean {
    return this.isProcessing;
  }
} 