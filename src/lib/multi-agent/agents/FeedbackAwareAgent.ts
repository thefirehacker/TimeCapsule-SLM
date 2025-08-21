/**
 * FeedbackAwareAgent Base Class
 * 
 * Extends BaseAgent to provide feedback processing capabilities
 * for agents that need to handle user corrections during reruns.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import {
  UserFeedback,
  FeedbackHandler,
  FeedbackValidation,
  CorrectionResult,
  validateFeedbackCompleteness
} from '../interfaces/Feedback';

/**
 * Abstract base class for agents that can process user feedback
 */
export abstract class FeedbackAwareAgent extends BaseAgent implements FeedbackHandler {
  protected feedbackEnabled: boolean = true;
  
  /**
   * Check if this agent supports feedback processing
   */
  supportsFeedback(): boolean {
    return this.feedbackEnabled;
  }
  
  /**
   * Get the feedback handler for this agent
   */
  getFeedbackHandler(): FeedbackHandler {
    return this;
  }
  
  /**
   * Process context with user feedback
   * This is the main entry point for feedback-based reruns
   */
  async processWithFeedback(
    context: ResearchContext,
    feedback: UserFeedback
  ): Promise<ResearchContext> {
    console.log(`📝 ${this.name}: Processing with user feedback`, {
      issue: feedback.issue,
      severity: feedback.severity,
      correctionType: feedback.correctionType
    });
    
    // Validate feedback
    const validation = this.validateFeedback(feedback);
    if (!validation.isValid) {
      console.error(`❌ ${this.name}: Invalid feedback`, validation.errors);
      throw new Error(`Invalid feedback: ${validation.errors?.join(', ')}`);
    }
    
    // Process feedback to generate correction instructions
    const instructions = await this.processFeedback(feedback);
    console.log(`🔧 ${this.name}: Generated ${instructions.length} correction instructions`);
    
    // Apply corrections to the context
    const correctionResult = await this.applyCorrections(context, feedback);
    console.log(`✅ ${this.name}: Applied corrections`, {
      corrected: correctionResult.correctedItems.length,
      excluded: correctionResult.excludedItems.length,
      confidence: correctionResult.confidence
    });
    
    // Update context with feedback metadata
    const enhancedContext: ResearchContext = {
      ...context,
      rerunMetadata: {
        isRerun: true,
        previousRunId: context.metadata.startTime.toString(),
        userFeedback: feedback,
        correctionInstructions: instructions,
        excludedResults: correctionResult.excludedItems,
        timestamp: Date.now(),
        attemptNumber: (context.rerunMetadata?.attemptNumber || 0) + 1
      }
    };
    
    // Process with feedback-aware logic
    const result = await this.processWithFeedbackLogic(enhancedContext, feedback, instructions);
    
    // Add correction summary to reasoning
    this.reasoning = `
      ${this.reasoning}
      
      Corrections Applied:
      - Issue: ${feedback.issue}
      - Correction: ${feedback.correction}
      - Items Corrected: ${correctionResult.correctedItems.length}
      - Items Excluded: ${correctionResult.excludedItems.length}
      - Confidence: ${Math.round(correctionResult.confidence * 100)}%
      - Summary: ${correctionResult.changeSummary}
    `;
    
    return result;
  }
  
  /**
   * Validate user feedback
   */
  validateFeedback(feedback: UserFeedback): FeedbackValidation {
    // Use the common validation function
    const baseValidation = validateFeedbackCompleteness(feedback);
    
    // Add agent-specific validation
    const agentValidation = this.validateAgentSpecificFeedback(feedback);
    
    // Merge validations
    return {
      isValid: baseValidation.isValid && agentValidation.isValid,
      errors: [...(baseValidation.errors || []), ...(agentValidation.errors || [])],
      warnings: [...(baseValidation.warnings || []), ...(agentValidation.warnings || [])],
      suggestions: [...(baseValidation.suggestions || []), ...(agentValidation.suggestions || [])]
    };
  }
  
  /**
   * Process feedback to generate correction instructions
   */
  async processFeedback(feedback: UserFeedback): Promise<string[]> {
    const instructions: string[] = [];
    
    // Add base instructions from feedback
    instructions.push(`Primary issue: ${feedback.issue}`);
    instructions.push(`Required correction: ${feedback.correction}`);
    
    if (feedback.specificInstructions) {
      instructions.push(`Additional guidance: ${feedback.specificInstructions}`);
    }
    
    // Add severity-based instructions
    if (feedback.severity === 'major') {
      instructions.push('Apply strict filtering and validation');
      instructions.push('Double-check all classifications');
    }
    
    // Add correction type specific instructions
    switch (feedback.correctionType) {
      case 'classification':
        instructions.push('Re-evaluate document classifications');
        instructions.push('Apply stricter relevance criteria');
        break;
      case 'extraction':
        instructions.push('Refine extraction patterns');
        instructions.push('Validate extracted data accuracy');
        break;
      case 'filtering':
        instructions.push('Adjust filtering criteria');
        instructions.push('Review inclusion/exclusion rules');
        break;
      case 'analysis':
        instructions.push('Reconsider analysis approach');
        instructions.push('Apply corrected interpretation');
        break;
    }
    
    // Add agent-specific instructions
    const agentInstructions = await this.generateAgentSpecificInstructions(feedback);
    instructions.push(...agentInstructions);
    
    return instructions;
  }
  
  /**
   * Apply corrections based on feedback
   * This should be overridden by specific agents for custom correction logic
   */
  async applyCorrections(
    context: ResearchContext,
    feedback: UserFeedback
  ): Promise<CorrectionResult> {
    const correctedItems: string[] = [];
    const excludedItems: string[] = [];
    
    // If specific items are mentioned, mark them for correction
    if (feedback.affectedItems && feedback.affectedItems.length > 0) {
      excludedItems.push(...feedback.affectedItems);
    }
    
    // Basic correction result
    return {
      correctedItems,
      excludedItems,
      changeSummary: `Applied user feedback: ${feedback.correction}`,
      confidence: 0.85,
      comparison: {
        originalCount: context.ragResults.chunks.length,
        correctedCount: context.ragResults.chunks.length - excludedItems.length,
        changePercentage: (excludedItems.length / context.ragResults.chunks.length) * 100
      }
    };
  }
  
  /**
   * Override standard process to check for feedback
   */
  async process(context: ResearchContext): Promise<ResearchContext> {
    // Check if this is a rerun with feedback
    if (context.rerunMetadata?.userFeedback) {
      console.log(`🔄 ${this.name}: Detected rerun with feedback, using feedback-aware processing`);
      return this.processWithFeedback(context, context.rerunMetadata.userFeedback);
    }
    
    // Otherwise use normal processing
    return this.processNormally(context);
  }
  
  /**
   * Abstract methods that must be implemented by specific agents
   */
  
  /**
   * Normal processing logic (without feedback)
   */
  abstract processNormally(context: ResearchContext): Promise<ResearchContext>;
  
  /**
   * Processing logic when feedback is provided
   */
  abstract processWithFeedbackLogic(
    context: ResearchContext,
    feedback: UserFeedback,
    instructions: string[]
  ): Promise<ResearchContext>;
  
  /**
   * Agent-specific feedback validation
   */
  protected validateAgentSpecificFeedback(feedback: UserFeedback): FeedbackValidation {
    // Default: no additional validation
    return { isValid: true };
  }
  
  /**
   * Generate agent-specific correction instructions
   */
  protected async generateAgentSpecificInstructions(feedback: UserFeedback): Promise<string[]> {
    // Default: no additional instructions
    return [];
  }
  
  /**
   * Helper method to filter items based on feedback
   */
  protected filterItemsWithFeedback<T extends { id: string }>(
    items: T[],
    excludedIds: string[]
  ): T[] {
    return items.filter(item => !excludedIds.includes(item.id));
  }
  
  /**
   * Helper method to check if an item matches feedback criteria
   */
  protected itemMatchesFeedbackCriteria(
    item: any,
    feedback: UserFeedback
  ): boolean {
    // Check if item is in affected items list
    if (feedback.affectedItems && feedback.affectedItems.length > 0) {
      const itemId = item.id || item.sourceDocument || item.source;
      return feedback.affectedItems.includes(itemId);
    }
    
    return false;
  }
}