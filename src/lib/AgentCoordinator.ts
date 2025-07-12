import { AIAssistant } from './AIAssistant';
import { VectorStore, DocumentData } from '../components/VectorStore/VectorStore';
import { RAGQuery, RAGStats } from '../types/rag';

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

  constructor(aiAssistant: AIAssistant, vectorStore: VectorStore | null = null) {
    this.aiAssistant = aiAssistant;
    this.vectorStore = vectorStore;
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

  async generateLearningResearch(
    conversationContent: string,
    attachedDocuments: DocumentData[],
    researchDepth: 'overview' | 'detailed' | 'comprehensive'
  ): Promise<string> {
    if (this.isProcessing) {
      throw new Error('Agent coordination already in progress');
    }

    this.isProcessing = true;
    const sessionId = `learning_research_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Initialize session
      this.currentSession = {
        sessionId,
        timestamp: new Date(),
        researchType: 'learning',
        tasks: [],
        totalTokens: 0,
        debugLogs: [],
        ragQueries: [],
        ragStats: undefined,
        ragVisualizationData: undefined
      };

      this.addDebugLog(`🚀 Starting learning research session: ${sessionId}`);
      this.addDebugLog(`📊 Input: ${conversationContent.length} chars conversation, ${attachedDocuments.length} documents, depth: ${researchDepth}`);

      // Define agent specifications based on research depth
      const agentSpecs = this.getAgentSpecs(researchDepth);
      this.addDebugLog(`🤖 Created ${agentSpecs.length} agent specifications`);
      
      // Create tasks for each agent
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

      this.updateProgress();

      // Execute agents in dependency order with RAG tracking
      const results = await this.executeAgents(agentSpecs, conversationContent, attachedDocuments);
      
      // Log agent results summary
      for (const [agentId, result] of results) {
        this.addDebugLog(`📊 Agent ${agentId} produced ${result.length} characters`);
      }

      // Aggregate results with enhanced debugging
      const finalResult = await this.aggregateResults(results);

      this.addDebugLog(`✅ Final aggregated result: ${finalResult.length} characters`);
      this.addDebugLog(`📈 Expected minimum: 4000+ words (~20,000+ characters)`);

      // Calculate session totals including RAG stats
      this.calculateSessionTotals();

      // Save agent log to Knowledge Base with RAG data
      await this.saveAgentLogToKB();

      return finalResult;

    } finally {
      this.isProcessing = false;
    }
  }

  private getAgentSpecs(depth: 'overview' | 'detailed' | 'comprehensive'): AgentSpec[] {
    const baseSpecs: AgentSpec[] = [
      {
        id: 'analysis_agent',
        name: 'Analyzing conversation and extracting learning goals',
        description: 'Extracts learning objectives and assesses user expertise level',
        systemPrompt: 'You are a Learning Analysis Agent. Your task is to analyze conversational content and extract specific learning goals, assess user expertise level, and identify knowledge gaps.',
        maxTokens: 4000, // Increased from 1500
        priority: 1,
        dependencies: []
      },
      {
        id: 'content_agent',
        name: 'Generating detailed explanations and concepts',
        description: 'Creates comprehensive learning content with explanations and examples',
        systemPrompt: 'You are a Content Generation Agent. Your task is to create detailed explanations, practical examples, and comprehensive learning materials based on the analysis provided.',
        maxTokens: 8000, // Increased from 3000
        priority: 2,
        dependencies: ['analysis_agent']
      },
      {
        id: 'exercise_agent',
        name: 'Creating practice exercises and assessments',
        description: 'Develops hands-on exercises and assessment materials',
        systemPrompt: 'You are an Exercise Creation Agent. Your task is to develop practical exercises, code examples, and assessment materials that reinforce the learning objectives.',
        maxTokens: 6000, // Increased from 2000
        priority: 3,
        dependencies: ['analysis_agent', 'content_agent']
      },
      {
        id: 'integration_agent',
        name: 'Integrating results into cohesive curriculum',
        description: 'Combines all agent outputs into a structured learning curriculum',
        systemPrompt: 'You are an Integration Agent. Your task is to combine all agent outputs into a cohesive, well-structured learning curriculum with proper formatting and flow.',
        maxTokens: 12000, // Increased from 2500 - largest because it combines everything
        priority: 4,
        dependencies: ['analysis_agent', 'content_agent', 'exercise_agent']
      }
    ];

    // Adjust token limits based on depth - more generous multipliers
    const tokenMultiplier = depth === 'overview' ? 1.0 : depth === 'detailed' ? 1.5 : 2.0;
    
    return baseSpecs.map(spec => ({
      ...spec,
      maxTokens: Math.floor(spec.maxTokens * tokenMultiplier)
    }));
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

      // Wait for dependencies
      await this.waitForDependencies(spec.dependencies);

      // Execute agent
      task.status = 'in_progress';
      task.startTime = new Date();
      task.progress = 0;
      this.updateProgress();

      try {
        // Build prompt with RAG context if available
        const prompt = await this.buildAgentPrompt(spec, conversationContent, attachedDocuments, results);
        
        // Log prompt details
        task.promptLength = prompt.length;
        this.addDebugLog(`📝 Agent ${spec.id} prompt: ${prompt.length} characters`);
        
        // For integration agent, log more details
        if (spec.id === 'integration_agent') {
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
        const result = await this.aiAssistant.generateContent(prompt, 'research');
        clearInterval(progressInterval);

        task.endTime = new Date();
        task.duration = this.formatDuration(task.endTime.getTime() - task.startTime.getTime());
        task.tokensUsed = this.estimateTokenUsage(result);
        task.responseLength = result.length;
        task.result = `Generated ${result.length} characters of content`;
        task.status = 'completed';
        task.progress = 100;
        
        // Enhanced logging for integration agent
        if (spec.id === 'integration_agent') {
          this.addDebugLog(`🔍 Integration agent response: ${result.length} characters`);
          this.addDebugLog(`📝 Integration agent response preview: ${result.substring(0, 300)}...`);
          
          // Check if response looks like a proper integration
          const hasTableOfContents = result.includes('Table of Contents') || result.includes('📋');
          const hasMultipleSections = (result.match(/##/g) || []).length >= 3;
          const hasAllAgentContent = result.includes('Learning Analysis') && result.includes('Learning Content') && result.includes('Exercises');
          
          task.debugInfo = `TOC: ${hasTableOfContents}, Sections: ${hasMultipleSections}, AllContent: ${hasAllAgentContent}`;
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

    const maxWait = 300000; // 5 minutes max wait
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
    prompt += `## Conversation to Analyze:\n${conversationContent}\n\n`;
    
    // Add attached documents if available
    if (attachedDocuments.length > 0) {
      prompt += `## Reference Documents:\n`;
      attachedDocuments.forEach((doc, index) => {
        prompt += `### Document ${index + 1}: ${doc.title}\n`;
        prompt += `${doc.content.substring(0, 1000)}${doc.content.length > 1000 ? '...' : ''}\n\n`;
      });
    }

    // Perform RAG search to enhance context (except for integration agent)
    if (this.vectorStore && spec.id !== 'integration_agent') {
      try {
        this.addDebugLog(`🔍 Performing RAG search for agent ${spec.id}...`);
        
        // Create search query from conversation content and agent's focus
        const searchQuery = this.createRAGSearchQuery(conversationContent, spec.id);
        
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
          this.addDebugLog(`🔍 RAG search for ${spec.id} found no relevant documents`);
        }
      } catch (ragError) {
        this.addDebugLog(`⚠️ RAG search failed for ${spec.id}: ${ragError instanceof Error ? ragError.message : 'Unknown error'}`);
      }
    }
    
    // Add results from dependent agents
    if (spec.dependencies.length > 0) {
      prompt += `## Previous Agent Results:\n`;
      spec.dependencies.forEach(depId => {
        const result = previousResults.get(depId);
        if (result) {
          // For integration agent, provide full content; for others, provide truncated for context
          const maxLength = spec.id === 'integration_agent' ? result.length : 3000;
          const truncatedResult = result.length > maxLength ? 
            result.substring(0, maxLength) + '...' : result;
          prompt += `### ${depId} Results:\n${truncatedResult}\n\n`;
        }
      });
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

  private getAgentSpecificInstructions(agentId: string): string {
    const instructions: Record<string, string> = {
      'analysis_agent': `
## Your Task:
Provide comprehensive analysis of the conversation to establish learning foundations.

**Analysis Requirements (minimum 800+ words):**
1. **Primary Learning Goals**
   - 5-7 specific, measurable learning objectives
   - Clear success criteria for each goal
   - Priority ranking of objectives
   - Connection to user's expressed interests

2. **Detailed User Level Assessment**
   - Comprehensive skill level evaluation (Beginner/Intermediate/Advanced)
   - Confidence score (1-10) with detailed justification
   - Evidence from conversation supporting assessment
   - Prerequisite knowledge evaluation
   - Learning style indicators

3. **Knowledge Gap Analysis**
   - Specific areas requiring attention
   - Critical vs. nice-to-have knowledge
   - Learning sequence recommendations
   - Potential learning obstacles

4. **Learning Context & Domain**
   - Primary domain (Programming/ML/DevOps/etc.)
   - Related sub-domains and technologies
   - Industry context and applications
   - Current trends and relevance

5. **Comprehensive Learning Strategy**
   - Realistic time investment breakdown
   - Learning pace recommendations
   - Resource allocation suggestions
   - Progress milestone planning

**Output Format**: Detailed, structured analysis providing complete foundation for learning curriculum design.`,

      'content_agent': `
## Your Task:
Generate comprehensive, detailed learning content that provides complete educational coverage.

**Content Requirements (minimum 1500+ words):**
1. **Conceptual Foundations** 
   - Clear, detailed explanations of core concepts
   - Background context and theory
   - Why these concepts matter in practice

2. **Technical Implementation**
   - Comprehensive step-by-step guides
   - Detailed methodology and approach
   - Multiple implementation strategies

3. **Code Examples**
   - Working, well-commented code examples
   - Multiple examples showing different scenarios
   - Explanation of each code section
   - Common variations and alternatives

4. **Best Practices**
   - Industry standards and recommendations
   - Performance optimization techniques
   - Security and reliability considerations
   - Common pitfalls to avoid

5. **Real-World Applications**
   - Practical use cases and scenarios
   - Integration with other technologies
   - Scalability considerations

**Output Format**: Comprehensive learning material with detailed explanations, extensive examples, and thorough coverage of the topic.`,

      'exercise_agent': `
## Your Task:
Create comprehensive hands-on learning exercises that reinforce and apply the learning content.

**Exercise Requirements (minimum 1000+ words):**
1. **Guided Practice Exercises**
   - 3-5 step-by-step exercises with detailed instructions
   - Clear objectives for each exercise
   - Expected outcomes and success criteria
   - Troubleshooting guidance for common issues

2. **Progressive Challenge Series**
   - Multiple exercises of increasing difficulty (beginner → intermediate → advanced)
   - Building on previous exercises
   - Real-world problem-solving scenarios

3. **Code Challenges**
   - Practical coding exercises with starter templates
   - Multiple solution approaches
   - Code review and optimization exercises
   - Testing and validation requirements

4. **Self-Assessment Tools**
   - Comprehensive comprehension checks
   - Practice quizzes with explanations
   - Skill validation checkpoints
   - Progress tracking mechanisms

5. **Applied Projects**
   - Mini-projects that combine multiple concepts
   - Real-world application scenarios
   - Portfolio-worthy deliverables
   - Extension ideas for further learning

**Output Format**: Detailed exercises with comprehensive instructions, multiple difficulty levels, and extensive practical applications.`,

      'integration_agent': `
## Your Task:
Combine ALL previous agent results into a comprehensive learning curriculum. This is the FINAL output that users will see.

**CRITICAL REQUIREMENTS:**
- COPY the COMPLETE content from all previous agents (analysis, content, exercise)
- DO NOT summarize or truncate any content from previous agents
- Create a comprehensive, detailed learning curriculum of at least 4000+ words
- Include ALL sections: analysis, content, exercises, and progress tracking
- Ensure no content is omitted or shortened
- Provide comprehensive coverage of the learning topic

**Required Structure:**
\`\`\`markdown
# Learning Research: [Topic Title]

## 🎯 Learning Analysis & Foundation
[COPY THE COMPLETE ANALYSIS AGENT CONTENT HERE - DO NOT SUMMARIZE]

## 📚 Comprehensive Learning Content  
[COPY THE COMPLETE CONTENT AGENT CONTENT HERE - DO NOT SUMMARIZE]

## 🛠️ Hands-On Practice & Exercises
[COPY THE COMPLETE EXERCISE AGENT CONTENT HERE - DO NOT SUMMARIZE]

## 📊 Learning Progress Framework
[ADD YOUR OWN PROGRESS TRACKING CONTENT]

## 🔮 Next Steps & Advanced Learning
[ADD YOUR OWN RECOMMENDATIONS]
\`\`\`

**Content Integration Rules:**
1. **Include EVERYTHING**: Copy the full text from analysis_agent, content_agent, and exercise_agent
2. **Add transitions**: Include connecting paragraphs between sections for flow
3. **Enhance structure**: Add clear headers and formatting for readability
4. **Expand tracking**: Add comprehensive progress milestones and self-assessment
5. **Add resources**: Suggest additional learning resources and next steps

**Output Requirements:**
- Minimum 4000+ words of comprehensive content
- Professional markdown formatting with proper headers
- Include ALL code examples, explanations, and exercises from previous agents
- Add connecting text between sections for smooth flow
- Ensure learning progression is clear and logical
- Include comprehensive progress tracking framework

**IMPORTANT REMINDERS:**
- This is the FINAL curriculum users will receive
- COPY ALL CONTENT from previous agents - do not summarize or shorten
- Users should get a complete, comprehensive learning experience
- The output should be significantly longer than any individual agent's output
- Include everything users need to learn the topic from start to finish

CRITICAL: If the previous agent results contain detailed content, you MUST include all of it in your final output. Do not create a summary - create a comprehensive compilation.`
    };

    return instructions[agentId] || '';
  }

  private async aggregateResults(results: Map<string, string>): Promise<string> {
    this.addDebugLog(`🔄 Starting result aggregation...`);
    
    const integrationResult = results.get('integration_agent');
    
    // Get all agent results for size comparison
    const analysisResult = results.get('analysis_agent');
    const contentResult = results.get('content_agent');
    const exerciseResult = results.get('exercise_agent');
    
    const totalSourceContent = (analysisResult?.length || 0) + (contentResult?.length || 0) + (exerciseResult?.length || 0);
    
    this.addDebugLog(`📊 Source content lengths: Analysis:${analysisResult?.length || 0}, Content:${contentResult?.length || 0}, Exercise:${exerciseResult?.length || 0}`);
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
    this.addDebugLog(`🔄 Triggering enhanced fallback aggregation...`);

    // Enhanced fallback aggregation with comprehensive structure
    let aggregated = '# Multi-Agent Learning Research Results\n\n';
    aggregated += '*This comprehensive learning curriculum was generated using multiple specialized AI agents working together to provide complete coverage of your learning objectives.*\n\n';
    
    // Add table of contents
    aggregated += '## 📋 Table of Contents\n\n';
    if (analysisResult) aggregated += '1. [🎯 Learning Analysis Summary](#learning-analysis-summary)\n';
    if (contentResult) aggregated += '2. [📚 Comprehensive Learning Content](#comprehensive-learning-content)\n';
    if (exerciseResult) aggregated += '3. [🛠️ Hands-On Practice & Exercises](#hands-on-practice--exercises)\n';
    aggregated += '4. [📊 Learning Progress Framework](#learning-progress-framework)\n';
    aggregated += '5. [🔮 Next Steps & Advanced Learning](#next-steps--advanced-learning)\n\n';
    aggregated += '---\n\n';
    
    // 1. Learning Analysis Summary
    if (analysisResult) {
      this.addDebugLog(`📝 Adding analysis section: ${analysisResult.length} characters`);
      aggregated += `## 🎯 Learning Analysis Summary\n\n`;
      aggregated += `This analysis provides the foundation for your personalized learning journey:\n\n`;
      aggregated += `${analysisResult}\n\n`;
      aggregated += `---\n\n`;
    }
    
    // 2. Comprehensive Learning Content
    if (contentResult) {
      this.addDebugLog(`📝 Adding content section: ${contentResult.length} characters`);
      aggregated += `## 📚 Comprehensive Learning Content\n\n`;
      aggregated += `The following content provides detailed explanations, concepts, and technical guidance. This is the core learning material that will help you understand the fundamentals and apply them in practice:\n\n`;
      aggregated += `${contentResult}\n\n`;
      aggregated += `---\n\n`;
    }
    
    // 3. Hands-On Practice & Exercises
    if (exerciseResult) {
      this.addDebugLog(`📝 Adding exercise section: ${exerciseResult.length} characters`);
      aggregated += `## 🛠️ Hands-On Practice & Exercises\n\n`;
      aggregated += `Apply your learning with these practical exercises and assessments. These activities are designed to reinforce the concepts and give you real-world experience:\n\n`;
      aggregated += `${exerciseResult}\n\n`;
      aggregated += `---\n\n`;
    }
    
    // 4. Enhanced Progress Tracking
    this.addDebugLog(`📝 Adding progress tracking section...`);
    aggregated += `## 📊 Learning Progress Framework\n\n`;
    aggregated += `### 🎯 Learning Milestones\n\n`;
    aggregated += `Track your progress through these key achievements:\n\n`;
    
    if (analysisResult) {
      aggregated += `#### Foundation Phase\n`;
      aggregated += `- [ ] **Understanding Your Goals**: Review and internalize the learning objectives identified in the analysis\n`;
      aggregated += `- [ ] **Prerequisite Check**: Ensure you have the foundational knowledge required\n`;
      aggregated += `- [ ] **Learning Strategy**: Understand your personalized learning approach and timeline\n\n`;
    }
    
    if (contentResult) {
      aggregated += `#### Learning Phase\n`;
      aggregated += `- [ ] **Core Concepts**: Master the fundamental concepts and theoretical foundations\n`;
      aggregated += `- [ ] **Technical Details**: Understand the implementation details and methodologies\n`;
      aggregated += `- [ ] **Best Practices**: Learn industry standards and optimization techniques\n`;
      aggregated += `- [ ] **Real-World Context**: Understand practical applications and use cases\n\n`;
    }
    
    if (exerciseResult) {
      aggregated += `#### Application Phase\n`;
      aggregated += `- [ ] **Guided Practice**: Complete all step-by-step exercises successfully\n`;
      aggregated += `- [ ] **Independent Challenges**: Solve problems without guided instructions\n`;
      aggregated += `- [ ] **Code Implementation**: Write and test working code examples\n`;
      aggregated += `- [ ] **Project Application**: Apply knowledge to a meaningful project\n\n`;
    }
    
    aggregated += `#### Mastery Phase\n`;
    aggregated += `- [ ] **Knowledge Synthesis**: Combine concepts from different sections\n`;
    aggregated += `- [ ] **Problem Solving**: Troubleshoot and debug complex issues\n`;
    aggregated += `- [ ] **Optimization**: Improve and optimize your implementations\n`;
    aggregated += `- [ ] **Teaching Others**: Explain concepts to others (ultimate test of understanding)\n\n`;
    
    // 5. Self-Assessment Tools
    aggregated += `### 🔍 Self-Assessment Questions\n\n`;
    aggregated += `Use these questions to verify your understanding at each stage:\n\n`;
    
    aggregated += `**Conceptual Understanding:**\n`;
    aggregated += `- Can you explain the main concepts in your own words?\n`;
    aggregated += `- Do you understand why these techniques/approaches are used?\n`;
    aggregated += `- Can you identify the key differences between related concepts?\n\n`;
    
    aggregated += `**Practical Application:**\n`;
    aggregated += `- Can you implement the concepts from scratch?\n`;
    aggregated += `- Are you able to modify examples to solve different problems?\n`;
    aggregated += `- Can you debug issues when things go wrong?\n\n`;
    
    aggregated += `**Advanced Understanding:**\n`;
    aggregated += `- Do you know when to use different approaches?\n`;
    aggregated += `- Can you optimize for different scenarios (performance, reliability, etc.)?\n`;
    aggregated += `- Are you able to integrate with other technologies and systems?\n\n`;
    
    // 6. Next Steps and Advanced Learning
    aggregated += `## 🔮 Next Steps & Advanced Learning\n\n`;
    aggregated += `### 📈 Based on Your Current Progress\n\n`;
    aggregated += `**If you've mastered the basics:**\n`;
    aggregated += `- Explore advanced topics and specialized techniques\n`;
    aggregated += `- Investigate real-world case studies and industry applications\n`;
    aggregated += `- Contribute to open-source projects in this domain\n`;
    aggregated += `- Consider advanced certifications or specializations\n\n`;
    
    aggregated += `**If you need more practice:**\n`;
    aggregated += `- Create additional practice problems based on the exercises\n`;
    aggregated += `- Work through alternative implementations and approaches\n`;
    aggregated += `- Join communities and forums to discuss challenges\n`;
    aggregated += `- Find a mentor or study group for additional support\n\n`;
    
    aggregated += `**For deeper understanding:**\n`;
    aggregated += `- Research the theoretical foundations and academic papers\n`;
    aggregated += `- Explore related technologies and complementary skills\n`;
    aggregated += `- Attend conferences, workshops, or online courses\n`;
    aggregated += `- Build increasingly complex projects to challenge yourself\n\n`;
    
    // 7. Resource Recommendations
    aggregated += `### 📚 Additional Learning Resources\n\n`;
    aggregated += `Based on your learning journey, consider these supplementary resources:\n\n`;
    aggregated += `- **Documentation**: Official documentation and API references\n`;
    aggregated += `- **Community Forums**: Stack Overflow, Reddit, Discord communities\n`;
    aggregated += `- **Video Content**: YouTube tutorials, online course platforms\n`;
    aggregated += `- **Books**: Comprehensive textbooks and practical guides\n`;
    aggregated += `- **Blogs & Articles**: Industry expert insights and latest developments\n`;
    aggregated += `- **Practice Platforms**: Coding challenges and project-based learning\n\n`;
    
    // 8. Summary and statistics
    const totalWords = aggregated.split(' ').length;
    const sourceWords = results.size > 0 ? Array.from(results.values()).join(' ').split(' ').length : 0;
    
    aggregated += `---\n\n`;
    aggregated += `## 📊 Research Summary\n\n`;
    aggregated += `**Comprehensive Learning Curriculum**: This curriculum contains approximately **${totalWords} words** of educational content, `;
    aggregated += `generated by **${results.size} specialized AI agents** working in coordination to provide complete coverage of your learning objectives.\n\n`;
    
    aggregated += `**Content Breakdown:**\n`;
    if (analysisResult) aggregated += `- **Analysis & Planning**: ${analysisResult.split(' ').length} words\n`;
    if (contentResult) aggregated += `- **Learning Content**: ${contentResult.split(' ').length} words\n`;
    if (exerciseResult) aggregated += `- **Exercises & Practice**: ${exerciseResult.split(' ').length} words\n`;
    aggregated += `- **Progress Framework**: ${(totalWords - sourceWords)} words\n\n`;
    
    aggregated += `**Learning Path**: This curriculum is designed to take you from understanding basic concepts to practical implementation, `;
    aggregated += `with built-in progress tracking and assessment tools to ensure comprehensive learning.\n\n`;
    
    if (integrationResult && integrationResult.length > 100) {
      this.addDebugLog(`📝 Including original integration agent result as additional guidance`);
      aggregated += `**Note**: The integration agent also provided additional guidance:\n\n`;
      aggregated += `> ${integrationResult}\n\n`;
    }
    
    const finalLength = aggregated.length;
    const finalWords = totalWords;
    
    this.addDebugLog(`📊 Enhanced fallback aggregation completed: ${finalLength} characters (${finalWords} words) from ${results.size} agents`);
    this.addDebugLog(`✅ Result meets minimum requirements: ${finalLength >= 20000 ? 'YES' : 'NO'} (${finalLength}/20000+ chars)`);
    
    console.log(`📊 Enhanced fallback aggregation produced ${finalLength} characters (${finalWords} words) from ${results.size} agents`);
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