import { UserIntent, ContextAnalysis, IntentAnalysisResult } from './IntentAnalyzer';

export interface AgentRole {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  maxTokens: number;
  priority: number;
  dependencies: string[];
  emoji: string;
}

export interface AgentRoleSpec {
  roles: AgentRole[];
  totalEstimatedTime: string;
  coordinationStrategy: string;
  outputFormat: string;
}

export class AgentRoleGenerator {
  private roleTemplates = {
    // Analysis roles
    context_analyst: {
      basePrompt: 'You are a Context Analysis Agent. Your job is to understand the full context of what the user wants to achieve.',
      emoji: '🔍',
      maxTokens: 4000,
      priority: 1
    },
    requirements_analyst: {
      basePrompt: 'You are a Requirements Analysis Agent. Your job is to understand and define the specific requirements for the project.',
      emoji: '📋',
      maxTokens: 5000,
      priority: 2
    },
    research_specialist: {
      basePrompt: 'You are a Research Specialist Agent. Your job is to gather and analyze relevant information on the topic.',
      emoji: '📚',
      maxTokens: 6000,
      priority: 2
    },
    
    // Design and Planning roles
    architecture_designer: {
      basePrompt: 'You are an Architecture Design Agent. Your job is to design the overall structure and architecture.',
      emoji: '🏗️',
      maxTokens: 6000,
      priority: 3
    },
    strategy_consultant: {
      basePrompt: 'You are a Strategy Consultant Agent. Your job is to develop strategic approaches and recommendations.',
      emoji: '🎯',
      maxTokens: 5000,
      priority: 2
    },
    design_strategist: {
      basePrompt: 'You are a Design Strategy Agent. Your job is to create design strategies and user experience plans.',
      emoji: '🎨',
      maxTokens: 5000,
      priority: 3
    },
    
    // Implementation roles
    implementation_planner: {
      basePrompt: 'You are an Implementation Planning Agent. Your job is to create detailed implementation plans and approaches.',
      emoji: '⚡',
      maxTokens: 7000,
      priority: 4
    },
    content_developer: {
      basePrompt: 'You are a Content Development Agent. Your job is to create, structure, and develop content.',
      emoji: '📝',
      maxTokens: 8000,
      priority: 4
    },
    solution_architect: {
      basePrompt: 'You are a Solution Architecture Agent. Your job is to design comprehensive solutions.',
      emoji: '🔧',
      maxTokens: 7000,
      priority: 3
    },
    
    // Analysis and Evaluation roles
    data_analyst: {
      basePrompt: 'You are a Data Analysis Agent. Your job is to analyze data, identify patterns, and extract insights.',
      emoji: '📊',
      maxTokens: 6000,
      priority: 3
    },
    evaluator: {
      basePrompt: 'You are an Evaluation Agent. Your job is to assess, evaluate, and provide recommendations.',
      emoji: '⚖️',
      maxTokens: 5000,
      priority: 4
    },
    
    // Specialized roles
    learning_designer: {
      basePrompt: 'You are a Learning Design Agent. Your job is to create educational content and learning experiences.',
      emoji: '🎓',
      maxTokens: 7000,
      priority: 3
    },
    business_analyst: {
      basePrompt: 'You are a Business Analysis Agent. Your job is to analyze business requirements and opportunities.',
      emoji: '💼',
      maxTokens: 6000,
      priority: 2
    },
    
    // Integration and synthesis roles
    integration_specialist: {
      basePrompt: 'You are an Integration Specialist Agent. Your job is to bring together all the work from previous agents into a cohesive result.',
      emoji: '✨',
      maxTokens: 10000,
      priority: 10
    },
    insights_synthesizer: {
      basePrompt: 'You are an Insights Synthesis Agent. Your job is to synthesize findings and create comprehensive insights.',
      emoji: '💡',
      maxTokens: 8000,
      priority: 5
    }
  };

  private domainSpecializations = {
    programming: {
      context: 'software development, programming, and technical implementation',
      terminology: 'technical terms, programming languages, frameworks, and development methodologies',
      focus: 'code quality, architecture, scalability, and best practices'
    },
    business: {
      context: 'business strategy, operations, and commercial objectives',
      terminology: 'business terminology, market analysis, financial metrics, and strategic planning',
      focus: 'ROI, market positioning, competitive advantage, and business growth'
    },
    design: {
      context: 'user experience, visual design, and interaction design',
      terminology: 'design principles, user research, prototyping, and usability',
      focus: 'user needs, accessibility, aesthetics, and design systems'
    },
    data: {
      context: 'data analysis, visualization, and insights generation',
      terminology: 'data science, analytics, metrics, and statistical analysis',
      focus: 'data quality, insights accuracy, and actionable recommendations'
    },
    ai: {
      context: 'artificial intelligence, machine learning, and automation',
      terminology: 'AI/ML concepts, algorithms, training, and deployment',
      focus: 'model accuracy, ethical AI, and practical implementation'
    },
    content: {
      context: 'content creation, marketing, and communication',
      terminology: 'content strategy, SEO, engagement, and brand voice',
      focus: 'audience engagement, content quality, and brand consistency'
    },
    general: {
      context: 'general problem-solving and strategic thinking',
      terminology: 'clear, accessible language appropriate for the domain',
      focus: 'practical solutions, clear communication, and actionable outcomes'
    }
  };

  async generateAgentRoles(analysisResult: IntentAnalysisResult): Promise<AgentRoleSpec> {
    console.log('🤖 AgentRoleGenerator: Generating agent roles for intent:', analysisResult.intent.type);

    const roles = this.createRolesForIntent(analysisResult);
    const totalEstimatedTime = this.estimateExecutionTime(roles, analysisResult);
    const coordinationStrategy = this.determineCoordinationStrategy(analysisResult);
    const outputFormat = this.determineOutputFormat(analysisResult);

    const spec: AgentRoleSpec = {
      roles,
      totalEstimatedTime,
      coordinationStrategy,
      outputFormat
    };

    console.log('✅ AgentRoleGenerator: Generated agent roles', {
      roleCount: roles.length,
      totalTime: totalEstimatedTime,
      intentType: analysisResult.intent.type,
      domain: analysisResult.intent.domain
    });

    return spec;
  }

  private createRolesForIntent(analysisResult: IntentAnalysisResult): AgentRole[] {
    const { intent, context } = analysisResult;
    const roles: AgentRole[] = [];

    // Always start with context analysis
    roles.push(this.createContextAnalystRole(intent, context));

    // Add intent-specific roles
    switch (intent.type) {
      case 'build':
        roles.push(
          this.createRequirementsAnalystRole(intent, context),
          this.createArchitectureDesignerRole(intent, context),
          this.createImplementationPlannerRole(intent, context)
        );
        break;

      case 'research':
        roles.push(
          this.createResearchSpecialistRole(intent, context),
          this.createDataAnalystRole(intent, context),
          this.createInsightsSynthesizerRole(intent, context)
        );
        break;

      case 'create':
        roles.push(
          this.createContentDeveloperRole(intent, context),
          this.createDesignStrategistRole(intent, context),
          this.createSolutionArchitectRole(intent, context)
        );
        break;

      case 'analyze':
        roles.push(
          this.createDataAnalystRole(intent, context),
          this.createEvaluatorRole(intent, context),
          this.createInsightsSynthesizerRole(intent, context)
        );
        break;

      case 'learn':
        roles.push(
          this.createLearningDesignerRole(intent, context),
          this.createContentDeveloperRole(intent, context),
          this.createImplementationPlannerRole(intent, context)
        );
        break;

      case 'strategy':
        roles.push(
          this.createStrategyConsultantRole(intent, context),
          this.createBusinessAnalystRole(intent, context),
          this.createImplementationPlannerRole(intent, context)
        );
        break;

      case 'design':
        roles.push(
          this.createDesignStrategistRole(intent, context),
          this.createContentDeveloperRole(intent, context),
          this.createSolutionArchitectRole(intent, context)
        );
        break;

      case 'implement':
        roles.push(
          this.createRequirementsAnalystRole(intent, context),
          this.createSolutionArchitectRole(intent, context),
          this.createImplementationPlannerRole(intent, context)
        );
        break;

      case 'plan':
        roles.push(
          this.createStrategyConsultantRole(intent, context),
          this.createBusinessAnalystRole(intent, context),
          this.createImplementationPlannerRole(intent, context)
        );
        break;

      default:
        // For unknown intents, use general-purpose roles
        roles.push(
          this.createResearchSpecialistRole(intent, context),
          this.createSolutionArchitectRole(intent, context),
          this.createImplementationPlannerRole(intent, context)
        );
    }

    // Always end with integration
    roles.push(this.createIntegrationSpecialistRole(intent, context));

    return roles;
  }

  private createContextAnalystRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.context_analyst;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'context_analyst',
      name: `${template.emoji} Understanding your ${intent.domain === 'general' ? '' : intent.domain + ' '}context and objectives...`,
      description: `Analyzing the full context of your ${intent.type} ${intent.domain === 'general' ? 'project' : intent.domain + ' project'}`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'context_analysis'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: [],
      emoji: template.emoji
    };
  }

  private createRequirementsAnalystRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.requirements_analyst;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'requirements_analyst',
      name: `${template.emoji} Defining your ${intent.domain === 'general' ? '' : intent.domain + ' '}requirements...`,
      description: `Analyzing and defining specific requirements for your ${intent.type} project`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'requirements'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createArchitectureDesignerRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.architecture_designer;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'architecture_designer',
      name: `${template.emoji} Designing your ${intent.domain === 'general' ? '' : intent.domain + ' '}architecture...`,
      description: `Creating the overall structure and architecture for your ${intent.type} project`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'architecture'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst', 'requirements_analyst'],
      emoji: template.emoji
    };
  }

  private createImplementationPlannerRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.implementation_planner;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'implementation_planner',
      name: `${template.emoji} Planning your ${intent.domain === 'general' ? '' : intent.domain + ' '}implementation...`,
      description: `Creating detailed implementation plans and practical steps`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'implementation'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createResearchSpecialistRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.research_specialist;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'research_specialist',
      name: `${template.emoji} Researching ${intent.domain === 'general' ? 'relevant information' : intent.domain + ' insights'}...`,
      description: `Gathering and analyzing relevant information on your topic`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'research'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createDataAnalystRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.data_analyst;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'data_analyst',
      name: `${template.emoji} Analyzing ${intent.domain === 'general' ? 'data and patterns' : intent.domain + ' data'}...`,
      description: `Analyzing data, identifying patterns, and extracting insights`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'analysis'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createInsightsSynthesizerRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.insights_synthesizer;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'insights_synthesizer',
      name: `${template.emoji} Synthesizing ${intent.domain === 'general' ? 'key insights' : intent.domain + ' insights'}...`,
      description: `Synthesizing findings and creating comprehensive insights`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'synthesis'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createContentDeveloperRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.content_developer;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'content_developer',
      name: `${template.emoji} Creating your ${intent.domain === 'general' ? '' : intent.domain + ' '}content...`,
      description: `Developing, structuring, and creating content`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'content'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createDesignStrategistRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.design_strategist;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'design_strategist',
      name: `${template.emoji} Designing your ${intent.domain === 'general' ? '' : intent.domain + ' '}strategy...`,
      description: `Creating design strategies and user experience plans`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'design'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createSolutionArchitectRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.solution_architect;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'solution_architect',
      name: `${template.emoji} Architecting your ${intent.domain === 'general' ? '' : intent.domain + ' '}solution...`,
      description: `Designing comprehensive solutions and approaches`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'solution'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createEvaluatorRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.evaluator;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'evaluator',
      name: `${template.emoji} Evaluating ${intent.domain === 'general' ? 'options and approaches' : intent.domain + ' approaches'}...`,
      description: `Assessing, evaluating, and providing recommendations`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'evaluation'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createLearningDesignerRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.learning_designer;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'learning_designer',
      name: `${template.emoji} Designing your ${intent.domain === 'general' ? '' : intent.domain + ' '}learning path...`,
      description: `Creating educational content and learning experiences`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'learning'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createStrategyConsultantRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.strategy_consultant;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'strategy_consultant',
      name: `${template.emoji} Developing your ${intent.domain === 'general' ? '' : intent.domain + ' '}strategy...`,
      description: `Creating strategic approaches and recommendations`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'strategy'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createBusinessAnalystRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.business_analyst;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'business_analyst',
      name: `${template.emoji} Analyzing ${intent.domain === 'general' ? 'business requirements' : intent.domain + ' business aspects'}...`,
      description: `Analyzing business requirements and opportunities`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'business'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: ['context_analyst'],
      emoji: template.emoji
    };
  }

  private createIntegrationSpecialistRole(intent: UserIntent, context: ContextAnalysis): AgentRole {
    const template = this.roleTemplates.integration_specialist;
    const domainSpec = this.domainSpecializations[intent.domain] || this.domainSpecializations.general;
    
    return {
      id: 'integration_specialist',
      name: `${template.emoji} Bringing together your complete ${intent.domain === 'general' ? '' : intent.domain + ' '}solution...`,
      description: `Integrating all agent work into a cohesive final result`,
      systemPrompt: this.buildSystemPrompt(template.basePrompt, intent, context, domainSpec, 'integration'),
      maxTokens: template.maxTokens,
      priority: template.priority,
      dependencies: [], // Will be set dynamically based on other agents
      emoji: template.emoji
    };
  }

  private buildSystemPrompt(
    basePrompt: string,
    intent: UserIntent,
    context: ContextAnalysis,
    domainSpec: any,
    roleType: string
  ): string {
    return `${basePrompt}

## Context Understanding:
- **User Intent**: ${intent.type} (${(intent.confidence * 100).toFixed(1)}% confidence)
- **Domain**: ${intent.domain}
- **Complexity**: ${intent.complexity}
- **Project Scope**: ${context.projectScope}
- **User Expertise**: ${context.expertiseLevel}

## Domain Specialization:
- **Context**: ${domainSpec.context}
- **Terminology**: Use ${domainSpec.terminology}
- **Focus**: Prioritize ${domainSpec.focus}

## User's Objectives:
${intent.objectives.length > 0 ? intent.objectives.map(obj => `- ${obj}`).join('\n') : '- Work with the user to understand their specific objectives'}

## Key Context Signals:
${context.domainSignals.length > 0 ? context.domainSignals.map(signal => `- ${signal}`).join('\n') : '- General domain knowledge applies'}

## Your Role:
As the ${roleType} specialist, your job is to ${this.getRoleSpecificInstructions(roleType, intent, context)}

## Output Guidelines:
- Write naturally and conversationally
- Be specific and actionable
- Build on insights from previous agents when available
- Focus on practical, implementable solutions
- Use appropriate ${intent.domain} terminology
- Consider the user's ${context.expertiseLevel} expertise level
- Aim for ${intent.complexity} complexity level`;
  }

  private getRoleSpecificInstructions(roleType: string, intent: UserIntent, context: ContextAnalysis): string {
    const instructions = {
      context_analysis: 'thoroughly understand the user\'s situation, goals, and constraints. Provide the foundation for all other agents.',
      requirements: 'define clear, specific requirements that align with the user\'s intent and context.',
      architecture: 'design the overall structure and approach that will guide implementation.',
      implementation: 'create detailed, practical plans for executing the project.',
      research: 'gather relevant information and insights that will inform the solution.',
      analysis: 'analyze data, patterns, and information to extract meaningful insights.',
      synthesis: 'combine findings into comprehensive insights and recommendations.',
      content: 'create structured, valuable content that serves the user\'s objectives.',
      design: 'develop design strategies and approaches that meet user needs.',
      solution: 'architect comprehensive solutions that address all aspects of the problem.',
      evaluation: 'assess options, approaches, and solutions to provide recommendations.',
      learning: 'create educational content and learning experiences tailored to the user.',
      strategy: 'develop strategic approaches and roadmaps for achieving objectives.',
      business: 'analyze business aspects and provide commercially viable recommendations.',
      integration: 'synthesize all previous agent work into a cohesive, complete solution.'
    };

    return instructions[roleType] || 'provide expert guidance in your area of specialization.';
  }

  private estimateExecutionTime(roles: AgentRole[], analysisResult: IntentAnalysisResult): string {
    const baseTimePerRole = {
      simple: 2,
      moderate: 4,
      complex: 6
    };

    const timePerRole = baseTimePerRole[analysisResult.intent.complexity];
    const totalMinutes = roles.length * timePerRole;
    
    if (totalMinutes < 60) {
      return `${totalMinutes} minutes`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  }

  private determineCoordinationStrategy(analysisResult: IntentAnalysisResult): string {
    const strategies = {
      build: 'Sequential execution with architecture informing implementation',
      research: 'Parallel research with synthesis at the end',
      create: 'Iterative development with continuous refinement',
      analyze: 'Systematic analysis with comprehensive evaluation',
      learn: 'Progressive learning design with practical application',
      strategy: 'Strategic planning with implementation roadmap',
      design: 'User-centered design with iterative refinement',
      implement: 'Phased implementation with validation gates',
      plan: 'Structured planning with resource allocation',
      unknown: 'Adaptive coordination based on emerging requirements'
    };

    return strategies[analysisResult.intent.type] || strategies.unknown;
  }

  private determineOutputFormat(analysisResult: IntentAnalysisResult): string {
    const formats = {
      build: 'Comprehensive development plan with architecture, implementation steps, and technical specifications',
      research: 'Detailed research report with findings, analysis, and recommendations',
      create: 'Creative output with structured content, design elements, and implementation guidance',
      analyze: 'Analytical report with data insights, evaluations, and strategic recommendations',
      learn: 'Educational content with learning objectives, materials, and practical exercises',
      strategy: 'Strategic plan with analysis, recommendations, and implementation roadmap',
      design: 'Design strategy with user research, concepts, and implementation guidelines',
      implement: 'Implementation guide with step-by-step procedures and best practices',
      plan: 'Project plan with timeline, resources, and execution strategy',
      unknown: 'Comprehensive guide tailored to your specific requirements'
    };

    return formats[analysisResult.intent.type] || formats.unknown;
  }
} 