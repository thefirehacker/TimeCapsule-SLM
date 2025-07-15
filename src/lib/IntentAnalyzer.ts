export interface UserIntent {
  type: 'build' | 'research' | 'create' | 'analyze' | 'learn' | 'strategy' | 'design' | 'implement' | 'plan' | 'unknown';
  confidence: number;
  domain: string;
  keywords: string[];
  context: string[];
  objectives: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  timeframe: 'immediate' | 'short_term' | 'long_term' | 'unknown';
}

export interface ContextAnalysis {
  userQuery: string;
  attachedDocuments: string[];
  domainSignals: string[];
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'unknown';
  projectScope: 'small' | 'medium' | 'large' | 'enterprise';
  requiredSkills: string[];
}

export interface IntentAnalysisResult {
  intent: UserIntent;
  context: ContextAnalysis;
  suggestedAgentRoles: string[];
  recommendedApproach: string;
  estimatedSteps: number;
}

export class IntentAnalyzer {
  private intentPatterns = {
    build: [
      'build', 'create', 'develop', 'make', 'construct', 'implement', 'code', 'program',
      'app', 'application', 'website', 'system', 'platform', 'service', 'api', 'tool'
    ],
    research: [
      'research', 'analyze', 'investigate', 'study', 'explore', 'examine', 'review',
      'trends', 'market', 'data', 'analysis', 'findings', 'insights', 'report'
    ],
    create: [
      'create', 'generate', 'produce', 'design', 'craft', 'compose', 'write',
      'content', 'strategy', 'plan', 'framework', 'structure', 'template'
    ],
    analyze: [
      'analyze', 'evaluate', 'assess', 'review', 'examine', 'audit', 'optimize',
      'performance', 'metrics', 'comparison', 'benchmarking', 'testing'
    ],
    learn: [
      'learn', 'understand', 'master', 'study', 'practice', 'tutorial', 'guide',
      'course', 'training', 'education', 'skill', 'knowledge', 'concepts'
    ],
    strategy: [
      'strategy', 'plan', 'approach', 'roadmap', 'vision', 'goals', 'objectives',
      'business', 'marketing', 'growth', 'expansion', 'competitive', 'positioning'
    ],
    design: [
      'design', 'architecture', 'structure', 'layout', 'interface', 'user experience',
      'wireframe', 'mockup', 'prototype', 'visual', 'aesthetic', 'branding'
    ],
    implement: [
      'implement', 'deploy', 'execute', 'launch', 'setup', 'configure', 'install',
      'integration', 'migration', 'rollout', 'production', 'live'
    ],
    plan: [
      'plan', 'organize', 'schedule', 'timeline', 'roadmap', 'project', 'manage',
      'coordination', 'workflow', 'process', 'methodology', 'phases'
    ]
  };

  private domainPatterns = {
    programming: [
      'javascript', 'python', 'react', 'node', 'api', 'database', 'frontend', 'backend',
      'web', 'mobile', 'app', 'code', 'software', 'development', 'programming'
    ],
    business: [
      'business', 'marketing', 'sales', 'finance', 'strategy', 'management', 'operations',
      'revenue', 'profit', 'customer', 'market', 'competition', 'growth'
    ],
    design: [
      'design', 'ui', 'ux', 'interface', 'user', 'visual', 'graphic', 'branding',
      'typography', 'color', 'layout', 'wireframe', 'prototype'
    ],
    data: [
      'data', 'analytics', 'visualization', 'dashboard', 'metrics', 'kpi', 'reporting',
      'database', 'sql', 'analysis', 'insights', 'statistics'
    ],
    ai: [
      'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
      'neural network', 'nlp', 'chatbot', 'automation', 'algorithm'
    ],
    content: [
      'content', 'writing', 'blog', 'article', 'copy', 'documentation', 'guide',
      'tutorial', 'social media', 'seo', 'marketing'
    ]
  };

  private complexityIndicators = {
    simple: [
      'simple', 'basic', 'easy', 'quick', 'small', 'minimal', 'light', 'basic'
    ],
    moderate: [
      'moderate', 'medium', 'standard', 'typical', 'normal', 'regular', 'balanced'
    ],
    complex: [
      'complex', 'advanced', 'sophisticated', 'comprehensive', 'detailed', 'enterprise',
      'large', 'scalable', 'full-featured', 'production-ready'
    ]
  };

  async analyzeIntent(
    userQuery: string,
    attachedDocuments: string[] = [],
    additionalContext: string[] = []
  ): Promise<IntentAnalysisResult> {
    console.log('🔍 IntentAnalyzer: Analyzing user intent...', { 
      queryLength: userQuery.length, 
      documentsCount: attachedDocuments.length 
    });

    const normalizedQuery = userQuery.toLowerCase();
    
    // Analyze intent type
    const intent = this.determineIntentType(normalizedQuery);
    
    // Analyze context
    const context = this.analyzeContext(userQuery, attachedDocuments, additionalContext);
    
    // Suggest agent roles based on intent
    const suggestedAgentRoles = this.suggestAgentRoles(intent, context);
    
    // Determine recommended approach
    const recommendedApproach = this.determineApproach(intent, context);
    
    // Estimate steps needed
    const estimatedSteps = this.estimateSteps(intent, context);

    const result: IntentAnalysisResult = {
      intent,
      context,
      suggestedAgentRoles,
      recommendedApproach,
      estimatedSteps
    };

    console.log('✅ IntentAnalyzer: Analysis complete', {
      intentType: intent.type,
      confidence: intent.confidence,
      domain: intent.domain,
      complexity: intent.complexity,
      suggestedRoles: suggestedAgentRoles.length
    });

    return result;
  }

  private determineIntentType(query: string): UserIntent {
    const scores: Record<string, number> = {};
    
    // Calculate scores for each intent type
    for (const [intentType, patterns] of Object.entries(this.intentPatterns)) {
      scores[intentType] = this.calculatePatternScore(query, patterns);
    }

    // Find the highest scoring intent
    const sortedIntents = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const [topIntent, topScore] = sortedIntents[0];
    
    // Determine confidence based on score difference
    const [, secondScore] = sortedIntents[1] || [, 0];
    const confidence = topScore > 0 ? Math.min(0.95, topScore / Math.max(1, secondScore + 0.1)) : 0.1;

    // Extract domain
    const domain = this.extractDomain(query);
    
    // Extract keywords
    const keywords = this.extractKeywords(query);
    
    // Extract context clues
    const context = this.extractContext(query);
    
    // Extract objectives
    const objectives = this.extractObjectives(query);
    
    // Determine complexity
    const complexity = this.determineComplexity(query);
    
    // Determine timeframe
    const timeframe = this.determineTimeframe(query);

    return {
      type: topScore > 0.1 ? topIntent as UserIntent['type'] : 'unknown',
      confidence,
      domain,
      keywords,
      context,
      objectives,
      complexity,
      timeframe
    };
  }

  private calculatePatternScore(query: string, patterns: string[]): number {
    let score = 0;
    for (const pattern of patterns) {
      if (query.includes(pattern)) {
        // Weight longer patterns more heavily
        score += pattern.length > 5 ? 2 : 1;
      }
    }
    return score;
  }

  private extractDomain(query: string): string {
    const domainScores: Record<string, number> = {};
    
    for (const [domain, patterns] of Object.entries(this.domainPatterns)) {
      domainScores[domain] = this.calculatePatternScore(query, patterns);
    }

    const topDomain = Object.entries(domainScores).reduce((a, b) => 
      domainScores[a[0]] > domainScores[b[0]] ? a : b
    );

    return topDomain[1] > 0 ? topDomain[0] : 'general';
  }

  private extractKeywords(query: string): string[] {
    const words = query.toLowerCase().split(/\s+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    
    return words
      .filter(word => word.length > 2 && !stopWords.includes(word))
      .slice(0, 10); // Limit to top 10 keywords
  }

  private extractContext(query: string): string[] {
    const contextClues: string[] = [];
    
    // Look for technology mentions
    const techTerms = ['react', 'angular', 'vue', 'node', 'python', 'java', 'typescript', 'javascript', 'api', 'database', 'aws', 'docker', 'kubernetes'];
    techTerms.forEach(term => {
      if (query.toLowerCase().includes(term)) {
        contextClues.push(term);
      }
    });
    
    // Look for business terms
    const businessTerms = ['startup', 'enterprise', 'small business', 'ecommerce', 'saas', 'b2b', 'b2c', 'marketing', 'sales'];
    businessTerms.forEach(term => {
      if (query.toLowerCase().includes(term)) {
        contextClues.push(term);
      }
    });
    
    return contextClues;
  }

  private extractObjectives(query: string): string[] {
    const objectives: string[] = [];
    
    // Look for goal-oriented language
    const goalPatterns = [
      /want to (.+)/gi,
      /need to (.+)/gi,
      /trying to (.+)/gi,
      /goal is to (.+)/gi,
      /objective is to (.+)/gi,
      /plan to (.+)/gi
    ];
    
    goalPatterns.forEach(pattern => {
      const matches = query.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const objective = match.replace(pattern, '$1').trim();
          if (objective.length > 0) {
            objectives.push(objective);
          }
        });
      }
    });
    
    return objectives;
  }

  private determineComplexity(query: string): 'simple' | 'moderate' | 'complex' {
    const complexityScores = {
      simple: this.calculatePatternScore(query, this.complexityIndicators.simple),
      moderate: this.calculatePatternScore(query, this.complexityIndicators.moderate),
      complex: this.calculatePatternScore(query, this.complexityIndicators.complex)
    };

    // If no explicit complexity indicators, infer from query length and technical terms
    if (Object.values(complexityScores).every(score => score === 0)) {
      const techTermCount = this.extractContext(query).length;
      const queryLength = query.length;
      
      if (queryLength < 50 && techTermCount < 2) return 'simple';
      if (queryLength > 200 || techTermCount > 5) return 'complex';
      return 'moderate';
    }

    return Object.entries(complexityScores).reduce((a, b) => 
      complexityScores[a[0] as keyof typeof complexityScores] > complexityScores[b[0] as keyof typeof complexityScores] ? a : b
    )[0] as 'simple' | 'moderate' | 'complex';
  }

  private determineTimeframe(query: string): 'immediate' | 'short_term' | 'long_term' | 'unknown' {
    const timeIndicators = {
      immediate: ['now', 'immediately', 'asap', 'urgent', 'quick', 'fast', 'right now'],
      short_term: ['soon', 'week', 'month', 'short term', 'near future', 'quickly'],
      long_term: ['eventually', 'long term', 'future', 'roadmap', 'strategic', 'year', 'years']
    };

    for (const [timeframe, indicators] of Object.entries(timeIndicators)) {
      if (this.calculatePatternScore(query, indicators) > 0) {
        return timeframe as 'immediate' | 'short_term' | 'long_term';
      }
    }

    return 'unknown';
  }

  private analyzeContext(
    userQuery: string,
    attachedDocuments: string[],
    additionalContext: string[]
  ): ContextAnalysis {
    const domainSignals = this.extractContext(userQuery);
    const expertiseLevel = this.determineExpertiseLevel(userQuery);
    const projectScope = this.determineProjectScope(userQuery, attachedDocuments);
    const requiredSkills = this.extractRequiredSkills(userQuery, domainSignals);

    return {
      userQuery,
      attachedDocuments,
      domainSignals,
      expertiseLevel,
      projectScope,
      requiredSkills
    };
  }

  private determineExpertiseLevel(query: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'unknown' {
    const expertiseIndicators = {
      beginner: ['beginner', 'new to', 'learning', 'start', 'basics', 'simple', 'easy', 'tutorial'],
      intermediate: ['intermediate', 'some experience', 'familiar with', 'understand', 'moderate'],
      advanced: ['advanced', 'experienced', 'complex', 'sophisticated', 'optimize', 'scale'],
      expert: ['expert', 'professional', 'enterprise', 'production', 'architecture', 'best practices']
    };

    for (const [level, indicators] of Object.entries(expertiseIndicators)) {
      if (this.calculatePatternScore(query, indicators) > 0) {
        return level as 'beginner' | 'intermediate' | 'advanced' | 'expert';
      }
    }

    return 'unknown';
  }

  private determineProjectScope(query: string, attachedDocuments: string[]): 'small' | 'medium' | 'large' | 'enterprise' {
    const scopeIndicators = {
      small: ['small', 'simple', 'basic', 'minimal', 'quick', 'prototype'],
      medium: ['medium', 'standard', 'typical', 'full', 'complete'],
      large: ['large', 'comprehensive', 'full-featured', 'scalable', 'production'],
      enterprise: ['enterprise', 'corporate', 'large-scale', 'distributed', 'multi-tenant']
    };

    for (const [scope, indicators] of Object.entries(scopeIndicators)) {
      if (this.calculatePatternScore(query, indicators) > 0) {
        return scope as 'small' | 'medium' | 'large' | 'enterprise';
      }
    }

    // Infer from query length and attached documents
    const queryLength = query.length;
    const docCount = attachedDocuments.length;
    
    if (queryLength < 100 && docCount === 0) return 'small';
    if (queryLength > 300 || docCount > 5) return 'large';
    return 'medium';
  }

  private extractRequiredSkills(query: string, domainSignals: string[]): string[] {
    const skills: string[] = [];
    
    // Add domain-specific skills
    skills.push(...domainSignals);
    
    // Add general skills based on intent
    const generalSkills = [
      'problem-solving', 'planning', 'analysis', 'research', 'communication',
      'project management', 'critical thinking', 'creativity'
    ];
    
    generalSkills.forEach(skill => {
      if (query.toLowerCase().includes(skill.replace('-', ' '))) {
        skills.push(skill);
      }
    });

    return [...new Set(skills)]; // Remove duplicates
  }

  private suggestAgentRoles(intent: UserIntent, context: ContextAnalysis): string[] {
    const roles: string[] = [];

    // Base roles for all intents
    roles.push('context_analyst');

    // Intent-specific roles
    switch (intent.type) {
      case 'build':
        roles.push('requirements_analyst', 'architecture_designer', 'implementation_planner');
        break;
      case 'research':
        roles.push('research_specialist', 'data_analyst', 'insights_synthesizer');
        break;
      case 'create':
        roles.push('creative_strategist', 'content_developer', 'structure_designer');
        break;
      case 'analyze':
        roles.push('analysis_specialist', 'evaluator', 'recommendation_engine');
        break;
      case 'learn':
        roles.push('learning_designer', 'curriculum_developer', 'practice_creator');
        break;
      case 'strategy':
        roles.push('strategy_consultant', 'business_analyst', 'roadmap_designer');
        break;
      case 'design':
        roles.push('design_strategist', 'ux_specialist', 'visual_designer');
        break;
      case 'implement':
        roles.push('implementation_specialist', 'integration_expert', 'deployment_manager');
        break;
      case 'plan':
        roles.push('project_planner', 'timeline_coordinator', 'resource_manager');
        break;
      default:
        roles.push('general_advisor', 'solution_architect', 'implementation_guide');
    }

    // Always add integration role
    roles.push('integration_specialist');

    return roles;
  }

  private determineApproach(intent: UserIntent, context: ContextAnalysis): string {
    const approaches = {
      build: 'systematic development approach with planning, architecture, and implementation phases',
      research: 'comprehensive research methodology with data gathering, analysis, and synthesis',
      create: 'creative development process with ideation, structuring, and refinement',
      analyze: 'analytical framework with evaluation, comparison, and recommendations',
      learn: 'structured learning pathway with concepts, practice, and assessment',
      strategy: 'strategic planning approach with analysis, planning, and roadmap development',
      design: 'design thinking methodology with research, ideation, and prototyping',
      implement: 'implementation framework with planning, execution, and validation',
      plan: 'project planning methodology with scope, timeline, and resource allocation',
      unknown: 'flexible approach adapted to your specific needs and context'
    };

    return approaches[intent.type] || approaches.unknown;
  }

  private estimateSteps(intent: UserIntent, context: ContextAnalysis): number {
    const baseSteps = {
      simple: 3,
      moderate: 5,
      complex: 7
    };

    let steps = baseSteps[intent.complexity];

    // Adjust based on intent type
    const intentMultipliers = {
      build: 1.5,
      research: 1.2,
      create: 1.1,
      analyze: 1.3,
      learn: 1.4,
      strategy: 1.3,
      design: 1.2,
      implement: 1.6,
      plan: 1.1,
      unknown: 1.0
    };

    steps *= intentMultipliers[intent.type] || 1.0;

    // Adjust based on project scope
    const scopeMultipliers = {
      small: 0.8,
      medium: 1.0,
      large: 1.3,
      enterprise: 1.6
    };

    steps *= scopeMultipliers[context.projectScope];

    return Math.max(3, Math.min(10, Math.round(steps)));
  }
} 