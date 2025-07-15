/**
 * DynamicPlanningAgent - Analyzes user requests and creates custom todo lists
 * The core intelligence for transforming user intent into actionable learning paths
 */

import { AIAssistant } from './AIAssistant';
import { RAGToolSystem, RAGQueryOptions } from './RAGToolSystem';
import { AgentCallManager } from './AgentCallManager';

export interface UserRequest {
  content: string;
  attachedDocuments?: string[]; // Document IDs
  context?: string; // Additional context from conversation
}

export interface RequestAnalysis {
  intent: {
    type: 'project_creation' | 'learning_path' | 'strategy_building' | 'research_analysis' | 'implementation_guide' | 'general_learning';
    confidence: number;
    keywords: string[];
    domain: string; // e.g., 'programming', 'business', 'data_science', 'design'
  };
  complexity: 'simple' | 'moderate' | 'complex' | 'enterprise';
  estimatedSteps: number;
  suggestedAgents: string[];
  requiredKnowledge: string[];
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  category: 'planning' | 'research' | 'implementation' | 'testing' | 'documentation' | 'review';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string; // e.g., "2 hours", "1 day"
  dependencies: string[]; // IDs of other todos
  suggestedAgent: string;
  ragContext?: string[]; // Relevant knowledge base topics
  deliverables: string[];
}

export interface DynamicLearningPlan {
  id: string;
  title: string;
  description: string;
  analysis: RequestAnalysis;
  todos: TodoItem[];
  timeline: string;
  estimatedCompletionTime: string;
  successCriteria: string[];
  metadata: {
    createdAt: Date;
    agentId: string;
    sessionId: string;
    ragQueriesUsed: number;
    contextSources: string[];
  };
}

export interface AgentRecommendation {
  agentId: string;
  agentName: string;
  relevance: number;
  suggestedTasks: string[];
  requiredTools: string[];
}

export class DynamicPlanningAgent {
  private aiAssistant: AIAssistant;
  private ragTool: RAGToolSystem;
  private callManager: AgentCallManager;
  private readonly agentId = 'dynamic_planning_agent';

  constructor(aiAssistant: AIAssistant, ragTool: RAGToolSystem, callManager: AgentCallManager) {
    this.aiAssistant = aiAssistant;
    this.ragTool = ragTool;
    this.callManager = callManager;
    console.log('🎯 DynamicPlanningAgent initialized');
  }

  /**
   * Analyze user request and create a dynamic learning plan
   */
  async createDynamicPlan(
    userRequest: UserRequest,
    sessionId: string
  ): Promise<DynamicLearningPlan> {
    console.log('🎯 DynamicPlanningAgent: Creating dynamic plan', {
      content: userRequest.content.substring(0, 100) + '...',
      attachedDocs: userRequest.attachedDocuments?.length || 0,
      sessionId
    });

    // Track the planning call
    const canProceed = await this.callManager.trackCall(
      this.agentId,
      'planning',
      { requestType: 'dynamic_plan_creation' }
    );

    if (!canProceed) {
      throw new Error('Dynamic planning rejected: Call limit reached or user denied approval');
    }

    const startTime = Date.now();

    try {
      // Step 1: Analyze user request intent
      const analysis = await this.analyzeRequest(userRequest, sessionId);
      
      // Step 2: Gather relevant context using RAG
      const ragContext = await this.gatherContext(userRequest, analysis, sessionId);
      
      // Step 3: Generate todo list
      const todos = await this.generateTodoList(userRequest, analysis, ragContext, sessionId);
      
      // Step 4: Create timeline and success criteria
      const { timeline, estimatedCompletionTime, successCriteria } = this.createProjectTimeline(todos, analysis);

      // Create the dynamic learning plan
      const plan: DynamicLearningPlan = {
        id: `dynamic_plan_${sessionId}_${Date.now()}`,
        title: this.generatePlanTitle(userRequest.content, analysis),
        description: this.generatePlanDescription(userRequest, analysis),
        analysis,
        todos,
        timeline,
        estimatedCompletionTime,
        successCriteria,
        metadata: {
          createdAt: new Date(),
          agentId: this.agentId,
          sessionId,
          ragQueriesUsed: ragContext.length,
          contextSources: ragContext.map(ctx => ctx.query)
        }
      };

      const executionTime = Date.now() - startTime;

      // Update call with completion data
      const callId = `${sessionId}_call_${this.callManager.getCurrentCallCount()}`;
      this.callManager.updateCall(callId, {
        duration: executionTime,
        success: true,
        metadata: { 
          planId: plan.id,
          todosGenerated: todos.length,
          complexity: analysis.complexity,
          intent: analysis.intent.type
        }
      });

      console.log('✅ DynamicPlanningAgent: Plan created successfully', {
        planId: plan.id,
        intent: analysis.intent.type,
        complexity: analysis.complexity,
        todosCount: todos.length,
        executionTime: `${executionTime}ms`
      });

      return plan;

    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Update call with error data
      const callId = `${sessionId}_call_${this.callManager.getCurrentCallCount()}`;
      this.callManager.updateCall(callId, {
        duration: executionTime,
        success: false,
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      console.error('❌ DynamicPlanningAgent: Plan creation failed:', error);
      throw error;
    }
  }

  /**
   * Analyze user request to understand intent and complexity
   */
  private async analyzeRequest(userRequest: UserRequest, sessionId: string): Promise<RequestAnalysis> {
    console.log('🔍 DynamicPlanningAgent: Analyzing user request intent...');

    const content = userRequest.content.toLowerCase();
    
    // Intent detection using keyword analysis
    const intentAnalysis = this.detectIntent(content);
    
    // Complexity assessment
    const complexity = this.assessComplexity(content, userRequest.attachedDocuments?.length || 0);
    
    // Estimate steps based on intent and complexity
    const estimatedSteps = this.estimateSteps(intentAnalysis.type, complexity);
    
    // Suggest appropriate agents
    const suggestedAgents = this.suggestAgents(intentAnalysis.type, complexity);
    
    // Identify required knowledge areas
    const requiredKnowledge = this.identifyRequiredKnowledge(content, intentAnalysis.type);

    const analysis: RequestAnalysis = {
      intent: intentAnalysis,
      complexity,
      estimatedSteps,
      suggestedAgents,
      requiredKnowledge
    };

    console.log('✅ DynamicPlanningAgent: Request analysis completed', analysis);
    return analysis;
  }

  /**
   * Detect user intent from request content
   */
  private detectIntent(content: string): RequestAnalysis['intent'] {
    const intentPatterns = {
      project_creation: [
        'create', 'build', 'make', 'develop', 'setup', 'start', 'repo', 'repository', 
        'project', 'application', 'app', 'website', 'system', 'tool'
      ],
      learning_path: [
        'learn', 'understand', 'study', 'master', 'tutorial', 'course', 'guide',
        'teach me', 'how to', 'introduction', 'basics', 'fundamentals'
      ],
      strategy_building: [
        'strategy', 'plan', 'approach', 'framework', 'methodology', 'roadmap',
        'business', 'architecture', 'design', 'model', 'structure'
      ],
      research_analysis: [
        'research', 'analyze', 'investigate', 'explore', 'study', 'examine',
        'compare', 'evaluate', 'assess', 'review', 'survey'
      ],
      implementation_guide: [
        'implement', 'deploy', 'execute', 'integrate', 'configure', 'install',
        'setup', 'code', 'program', 'script', 'automate'
      ]
    };

    let maxScore = 0;
    let detectedIntent: RequestAnalysis['intent']['type'] = 'general_learning';
    const foundKeywords: string[] = [];

    for (const [intent, keywords] of Object.entries(intentPatterns)) {
      const matches = keywords.filter(keyword => content.includes(keyword));
      const score = matches.length;
      
      if (score > maxScore) {
        maxScore = score;
        detectedIntent = intent as RequestAnalysis['intent']['type'];
        foundKeywords.splice(0, foundKeywords.length, ...matches);
      }
    }

    // Domain detection
    const domain = this.detectDomain(content);

    return {
      type: detectedIntent,
      confidence: Math.min(0.9, maxScore * 0.2 + 0.3), // 0.3 base + up to 0.6 based on matches
      keywords: foundKeywords,
      domain
    };
  }

  /**
   * Detect the domain/field of the request
   */
  private detectDomain(content: string): string {
    const domainPatterns = {
      programming: ['code', 'programming', 'javascript', 'python', 'react', 'api', 'database', 'frontend', 'backend'],
      business: ['business', 'strategy', 'marketing', 'sales', 'revenue', 'growth', 'startup', 'company'],
      data_science: ['data', 'analytics', 'machine learning', 'ai', 'analysis', 'statistics', 'model'],
      design: ['design', 'ui', 'ux', 'interface', 'user experience', 'visual', 'prototype'],
      devops: ['deployment', 'infrastructure', 'docker', 'kubernetes', 'ci/cd', 'cloud', 'aws'],
      general: []
    };

    let maxMatches = 0;
    let detectedDomain = 'general';

    for (const [domain, keywords] of Object.entries(domainPatterns)) {
      const matches = keywords.filter(keyword => content.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedDomain = domain;
      }
    }

    return detectedDomain;
  }

  /**
   * Assess complexity of the request
   */
  private assessComplexity(content: string, attachedDocsCount: number): RequestAnalysis['complexity'] {
    let complexityScore = 0;

    // Length-based complexity
    if (content.length > 500) complexityScore += 2;
    else if (content.length > 200) complexityScore += 1;

    // Attached documents indicate complexity
    complexityScore += Math.min(3, attachedDocsCount);

    // Technical keywords indicate higher complexity
    const complexKeywords = [
      'architecture', 'system', 'enterprise', 'scalable', 'distributed', 'microservices',
      'production', 'deployment', 'integration', 'optimization', 'performance'
    ];
    complexityScore += complexKeywords.filter(keyword => content.includes(keyword)).length;

    // Multiple requirements indicate complexity
    const requirements = content.split(/and|also|additionally|furthermore/).length - 1;
    complexityScore += Math.min(2, requirements);

    if (complexityScore >= 6) return 'enterprise';
    if (complexityScore >= 4) return 'complex';
    if (complexityScore >= 2) return 'moderate';
    return 'simple';
  }

  /**
   * Estimate number of steps based on intent and complexity
   */
  private estimateSteps(intent: RequestAnalysis['intent']['type'], complexity: RequestAnalysis['complexity']): number {
    const baseSteps = {
      project_creation: 8,
      learning_path: 6,
      strategy_building: 7,
      research_analysis: 5,
      implementation_guide: 9,
      general_learning: 5
    };

    const complexityMultiplier = {
      simple: 0.7,
      moderate: 1.0,
      complex: 1.4,
      enterprise: 1.8
    };

    return Math.round(baseSteps[intent] * complexityMultiplier[complexity]);
  }

  /**
   * Suggest appropriate agents for the request
   */
  private suggestAgents(intent: RequestAnalysis['intent']['type'], complexity: RequestAnalysis['complexity']): string[] {
    const agentMappings = {
      project_creation: ['project_builder_agent', 'implementation_agent'],
      learning_path: ['learning_path_agent', 'content_agent'],
      strategy_building: ['strategy_designer_agent', 'research_agent'],
      research_analysis: ['research_agent', 'analysis_agent'],
      implementation_guide: ['implementation_agent', 'project_builder_agent'],
      general_learning: ['learning_path_agent', 'content_agent']
    };

    let agents = agentMappings[intent] || ['learning_path_agent'];

    // Add additional agents for complex requests
    if (complexity === 'complex' || complexity === 'enterprise') {
      agents.push('integration_agent');
    }

    return agents;
  }

  /**
   * Identify required knowledge areas
   */
  private identifyRequiredKnowledge(content: string, intent: RequestAnalysis['intent']['type']): string[] {
    const knowledge: string[] = [];

    // Intent-based knowledge
    const intentKnowledge = {
      project_creation: ['project setup', 'development workflow', 'testing'],
      learning_path: ['fundamentals', 'best practices', 'hands-on practice'],
      strategy_building: ['analysis frameworks', 'planning methodologies'],
      research_analysis: ['research methods', 'data analysis', 'reporting'],
      implementation_guide: ['implementation patterns', 'deployment strategies'],
      general_learning: ['core concepts', 'practical application']
    };

    knowledge.push(...(intentKnowledge[intent] || []));

    // Content-based knowledge extraction
    const technicalTerms = content.match(/\b[a-z]+(?:js|script|sql|css|html|api|db)\b/gi) || [];
    knowledge.push(...technicalTerms);

    return [...new Set(knowledge)]; // Remove duplicates
  }

  /**
   * Gather relevant context using RAG
   */
  private async gatherContext(
    userRequest: UserRequest,
    analysis: RequestAnalysis,
    sessionId: string
  ): Promise<Array<{ query: string; results: any[] }>> {
    console.log('📚 DynamicPlanningAgent: Gathering RAG context...');

    const ragQueries: string[] = [];
    const ragOptions: RAGQueryOptions = {
      agentId: this.agentId,
      sessionId,
      threshold: 0.3,
      limit: 5
    };

    // Query 1: Direct content search
    ragQueries.push(userRequest.content);

    // Query 2: Intent-specific search
    ragQueries.push(`${analysis.intent.type} ${analysis.intent.domain} examples best practices`);

    // Query 3: Domain-specific search
    ragQueries.push(`${analysis.intent.domain} ${analysis.requiredKnowledge.join(' ')} guide tutorial`);

    // Query 4: Complexity-specific search
    if (analysis.complexity === 'complex' || analysis.complexity === 'enterprise') {
      ragQueries.push(`${analysis.intent.domain} architecture scalable enterprise production`);
    }

    const contextResults = [];

    for (const query of ragQueries) {
      try {
        const result = await this.ragTool.searchKnowledge(query, ragOptions);
        contextResults.push({
          query,
          results: result.results
        });
        console.log(`📚 RAG context query "${query.substring(0, 50)}..." returned ${result.results.length} results`);
      } catch (error) {
        console.warn(`⚠️ RAG context query failed: ${query}`, error);
        contextResults.push({ query, results: [] });
      }
    }

    return contextResults;
  }

  /**
   * Generate todo list based on analysis and context
   */
  private async generateTodoList(
    userRequest: UserRequest,
    analysis: RequestAnalysis,
    ragContext: Array<{ query: string; results: any[] }>,
    sessionId: string
  ): Promise<TodoItem[]> {
    console.log('📝 DynamicPlanningAgent: Generating dynamic todo list...');

    // Create AI prompt for todo generation
    const prompt = this.buildTodoGenerationPrompt(userRequest, analysis, ragContext);
    
    // Generate todos using AI
    const aiResponse = await this.aiAssistant.generateContent(prompt, 'research');
    
    // Parse and structure the AI response
    const todos = this.parseTodoResponse(aiResponse, analysis, sessionId);
    
    console.log(`✅ DynamicPlanningAgent: Generated ${todos.length} todos`);
    return todos;
  }

  /**
   * Build prompt for AI todo generation
   */
  private buildTodoGenerationPrompt(
    userRequest: UserRequest,
    analysis: RequestAnalysis,
    ragContext: Array<{ query: string; results: any[] }>
  ): string {
    let prompt = `You are a Dynamic Planning Agent that creates actionable todo lists based on user requests. 

## User Request Analysis:
**Intent**: ${analysis.intent.type} (${analysis.intent.confidence * 100}% confidence)
**Domain**: ${analysis.intent.domain}
**Complexity**: ${analysis.complexity}
**Keywords**: ${analysis.intent.keywords.join(', ')}

## Original User Request:
"${userRequest.content}"

## Available Knowledge Base Context:`;

    // Add RAG context
    ragContext.forEach((ctx, index) => {
      if (ctx.results.length > 0) {
        prompt += `\n\n### Context ${index + 1}: ${ctx.query}`;
        ctx.results.slice(0, 2).forEach(result => {
          prompt += `\n- **${result.document.title}**: ${result.chunk.content.substring(0, 200)}...`;
        });
      }
    });

    prompt += `

## Your Task:
Create a comprehensive todo list of ${analysis.estimatedSteps} actionable steps that will help the user achieve their goal.

## Requirements:
1. Each todo should be specific and actionable
2. Include appropriate categories: planning, research, implementation, testing, documentation, review
3. Set realistic time estimates
4. Identify dependencies between tasks
5. Suggest which specialized agent should handle each task
6. Include specific deliverables for each task

## Output Format:
Provide a JSON array of todo items with this structure:
[
  {
    "id": "todo_1",
    "title": "Clear, actionable title",
    "description": "Detailed description of what needs to be done",
    "category": "planning|research|implementation|testing|documentation|review",
    "priority": "high|medium|low",
    "estimatedTime": "30 minutes|2 hours|1 day|1 week",
    "dependencies": ["todo_id1", "todo_id2"],
    "suggestedAgent": "project_builder_agent|strategy_designer_agent|learning_path_agent|implementation_agent|research_agent",
    "deliverables": ["Specific output 1", "Specific output 2"]
  }
]

## Important Guidelines:
- Start with planning and research tasks
- Break down complex tasks into manageable steps
- Include both learning and implementation components
- Ensure logical progression and dependencies
- Make each step achievable and measurable
- Focus on practical, actionable outcomes

Generate the todo list now:`;

    return prompt;
  }

  /**
   * Parse AI response into structured todo items
   */
  private parseTodoResponse(aiResponse: string, analysis: RequestAnalysis, sessionId: string): TodoItem[] {
    try {
      // Extract JSON from AI response
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found in AI response');
      }

      const parsedTodos = JSON.parse(jsonMatch[0]);
      
      // Validate and enhance todos
      return parsedTodos.map((todo: any, index: number) => ({
        id: todo.id || `todo_${sessionId}_${index + 1}`,
        title: todo.title || `Task ${index + 1}`,
        description: todo.description || 'No description provided',
        category: this.validateCategory(todo.category),
        priority: this.validatePriority(todo.priority),
        estimatedTime: todo.estimatedTime || '1 hour',
        dependencies: Array.isArray(todo.dependencies) ? todo.dependencies : [],
        suggestedAgent: this.validateAgent(todo.suggestedAgent, analysis),
        ragContext: analysis.requiredKnowledge,
        deliverables: Array.isArray(todo.deliverables) ? todo.deliverables : ['Completed task']
      }));

    } catch (error) {
      console.warn('⚠️ Failed to parse AI todo response, generating fallback todos:', error);
      return this.generateFallbackTodos(analysis, sessionId);
    }
  }

  /**
   * Generate fallback todos if AI parsing fails
   */
  private generateFallbackTodos(analysis: RequestAnalysis, sessionId: string): TodoItem[] {
    const baseTodos = [
      {
        id: `todo_${sessionId}_1`,
        title: 'Define project requirements and scope',
        description: 'Clearly outline what needs to be accomplished',
        category: 'planning' as const,
        priority: 'high' as const,
        estimatedTime: '1 hour',
        dependencies: [],
        suggestedAgent: 'planning_agent',
        deliverables: ['Requirements document', 'Scope definition']
      },
      {
        id: `todo_${sessionId}_2`,
        title: 'Research best practices and examples',
        description: 'Gather relevant information and examples',
        category: 'research' as const,
        priority: 'high' as const,
        estimatedTime: '2 hours',
        dependencies: [`todo_${sessionId}_1`],
        suggestedAgent: 'research_agent',
        deliverables: ['Research findings', 'Best practices summary']
      },
      {
        id: `todo_${sessionId}_3`,
        title: 'Create implementation plan',
        description: 'Develop step-by-step implementation strategy',
        category: 'planning' as const,
        priority: 'medium' as const,
        estimatedTime: '1 hour',
        dependencies: [`todo_${sessionId}_2`],
        suggestedAgent: 'planning_agent',
        deliverables: ['Implementation plan', 'Timeline']
      }
    ];

    return baseTodos.map(todo => ({
      ...todo,
      ragContext: analysis.requiredKnowledge
    }));
  }

  /**
   * Validate and normalize category
   */
  private validateCategory(category: string): TodoItem['category'] {
    const validCategories: TodoItem['category'][] = ['planning', 'research', 'implementation', 'testing', 'documentation', 'review'];
    return validCategories.includes(category as TodoItem['category']) ? category as TodoItem['category'] : 'implementation';
  }

  /**
   * Validate and normalize priority
   */
  private validatePriority(priority: string): TodoItem['priority'] {
    const validPriorities: TodoItem['priority'][] = ['high', 'medium', 'low'];
    return validPriorities.includes(priority as TodoItem['priority']) ? priority as TodoItem['priority'] : 'medium';
  }

  /**
   * Validate and suggest appropriate agent
   */
  private validateAgent(agent: string, analysis: RequestAnalysis): string {
    if (analysis.suggestedAgents.includes(agent)) {
      return agent;
    }
    return analysis.suggestedAgents[0] || 'learning_path_agent';
  }

  /**
   * Create project timeline and success criteria
   */
  private createProjectTimeline(todos: TodoItem[], analysis: RequestAnalysis): {
    timeline: string;
    estimatedCompletionTime: string;
    successCriteria: string[];
  } {
    // Calculate total time
    const totalHours = todos.reduce((sum, todo) => {
      const timeStr = todo.estimatedTime.toLowerCase();
      if (timeStr.includes('minute')) return sum + 0.5;
      if (timeStr.includes('hour')) return sum + parseInt(timeStr) || 1;
      if (timeStr.includes('day')) return sum + (parseInt(timeStr) || 1) * 8;
      if (timeStr.includes('week')) return sum + (parseInt(timeStr) || 1) * 40;
      return sum + 1;
    }, 0);

    const estimatedCompletionTime = totalHours > 40 ? `${Math.ceil(totalHours / 40)} weeks` :
                                   totalHours > 8 ? `${Math.ceil(totalHours / 8)} days` :
                                   `${Math.ceil(totalHours)} hours`;

    // Create timeline
    const phases = ['Planning', 'Research', 'Implementation', 'Testing', 'Documentation'];
    const timeline = phases.map((phase, index) => 
      `${index + 1}. ${phase} (${Math.ceil(totalHours / phases.length)} hours)`
    ).join('\n');

    // Generate success criteria
    const successCriteria = [
      'All todo items completed successfully',
      'Deliverables meet quality standards',
      'Knowledge gained can be applied independently',
      `Project completed within estimated ${estimatedCompletionTime}`
    ];

    // Add intent-specific criteria
    if (analysis.intent.type === 'project_creation') {
      successCriteria.push('Project is functional and deployable');
    } else if (analysis.intent.type === 'learning_path') {
      successCriteria.push('Concepts understood and can be explained to others');
    } else if (analysis.intent.type === 'strategy_building') {
      successCriteria.push('Strategy is actionable and measurable');
    }

    return {
      timeline,
      estimatedCompletionTime,
      successCriteria
    };
  }

  /**
   * Generate appropriate plan title
   */
  private generatePlanTitle(content: string, analysis: RequestAnalysis): string {
    const intentTitles = {
      project_creation: 'Project Creation Plan',
      learning_path: 'Learning Path',
      strategy_building: 'Strategy Development Plan',
      research_analysis: 'Research Analysis Plan',
      implementation_guide: 'Implementation Guide',
      general_learning: 'Learning Plan'
    };

    const baseTitle = intentTitles[analysis.intent.type];
    const domain = analysis.intent.domain !== 'general' ? ` - ${analysis.intent.domain.charAt(0).toUpperCase() + analysis.intent.domain.slice(1)}` : '';
    
    return `${baseTitle}${domain}`;
  }

  /**
   * Generate plan description
   */
  private generatePlanDescription(userRequest: UserRequest, analysis: RequestAnalysis): string {
    return `Dynamic learning plan created based on your request: "${userRequest.content.substring(0, 100)}${userRequest.content.length > 100 ? '...' : ''}". This ${analysis.complexity} ${analysis.intent.type} plan includes ${analysis.estimatedSteps} actionable steps in the ${analysis.intent.domain} domain.`;
  }
} 