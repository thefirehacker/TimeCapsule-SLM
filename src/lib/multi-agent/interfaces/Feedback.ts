/**
 * Feedback Interfaces for Agent Rerun Functionality
 * 
 * These interfaces define the structure for user feedback
 * when rerunning agents to correct misclassifications or errors.
 */

/**
 * User feedback provided when rerunning an agent
 */
export interface UserFeedback {
  /**
   * Description of the issue found in the original run
   * Example: "Step 11 incorrectly classified a CV as relevant"
   */
  issue: string;
  
  /**
   * Specific correction instructions
   * Example: "This CV should be marked as irrelevant to language model improvements"
   */
  correction: string;
  
  /**
   * Additional detailed instructions for the agent
   * Example: "Focus only on technical documents and research papers"
   */
  specificInstructions?: string;
  
  /**
   * IDs of specific items that were misclassified
   * Used to target corrections to specific documents/chunks
   */
  affectedItems?: string[];
  
  /**
   * Severity of the correction needed
   */
  severity: 'minor' | 'major';
  
  /**
   * Type of correction being requested
   */
  correctionType?: 'classification' | 'extraction' | 'filtering' | 'analysis' | 'other';
  
  /**
   * Additional context or examples
   */
  additionalContext?: string;
}

/**
 * Metadata for tracking agent reruns
 */
export interface RerunMetadata {
  /**
   * Indicates this is a rerun execution
   */
  isRerun: boolean;
  
  /**
   * ID of the previous run for comparison
   */
  previousRunId: string;
  
  /**
   * User feedback for this rerun
   */
  userFeedback?: UserFeedback;
  
  /**
   * Parsed correction instructions for the agent
   */
  correctionInstructions?: string[];
  
  /**
   * IDs of results to exclude based on feedback
   */
  excludedResults?: string[];
  
  /**
   * Adjusted criteria based on user feedback
   */
  adjustedCriteria?: {
    documentTypes?: string[];
    excludePatterns?: string[];
    includePatterns?: string[];
    customFilters?: Record<string, any>;
  };
  
  /**
   * Timestamp of the rerun
   */
  timestamp: number;
  
  /**
   * Number of rerun attempts for this agent
   */
  attemptNumber: number;
}

/**
 * Feedback validation result
 */
export interface FeedbackValidation {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Result of applying feedback corrections
 */
export interface CorrectionResult {
  /**
   * Items that were corrected
   */
  correctedItems: string[];
  
  /**
   * Items that were excluded
   */
  excludedItems: string[];
  
  /**
   * New items discovered after correction
   */
  newItems?: string[];
  
  /**
   * Summary of changes made
   */
  changeSummary: string;
  
  /**
   * Confidence in the corrections
   */
  confidence: number;
  
  /**
   * Comparison with original results
   */
  comparison?: {
    originalCount: number;
    correctedCount: number;
    changePercentage: number;
  };
}

/**
 * Feedback handler interface for agents
 */
export interface FeedbackHandler {
  /**
   * Validate user feedback
   */
  validateFeedback(feedback: UserFeedback): FeedbackValidation;
  
  /**
   * Process feedback and generate correction instructions
   */
  processFeedback(feedback: UserFeedback): Promise<string[]>;
  
  /**
   * Apply corrections based on feedback
   */
  applyCorrections(
    context: any,
    feedback: UserFeedback
  ): Promise<CorrectionResult>;
}

/**
 * Feedback-aware agent capabilities
 */
export interface FeedbackAwareAgent {
  /**
   * Check if agent supports feedback processing
   */
  supportsFeedback(): boolean;
  
  /**
   * Get feedback handler for this agent
   */
  getFeedbackHandler(): FeedbackHandler | null;
  
  /**
   * Process context with user feedback
   */
  processWithFeedback(
    context: any,
    feedback: UserFeedback
  ): Promise<any>;
}

/**
 * Helper function to create default user feedback
 */
export function createDefaultFeedback(): UserFeedback {
  return {
    issue: '',
    correction: '',
    severity: 'minor',
    correctionType: 'other',
    affectedItems: [],
    timestamp: Date.now()
  };
}

/**
 * Helper function to validate feedback completeness
 */
export function validateFeedbackCompleteness(feedback: UserFeedback): FeedbackValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  if (!feedback.issue || feedback.issue.trim().length === 0) {
    errors.push('Issue description is required');
  }
  
  if (!feedback.correction || feedback.correction.trim().length === 0) {
    errors.push('Correction instructions are required');
  }
  
  if (feedback.issue && feedback.issue.length < 10) {
    warnings.push('Issue description seems too short. Consider providing more detail.');
  }
  
  if (!feedback.affectedItems || feedback.affectedItems.length === 0) {
    suggestions.push('Consider specifying which items were affected for more targeted corrections.');
  }
  
  if (!feedback.correctionType) {
    suggestions.push('Specifying a correction type can help the agent understand the issue better.');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    warnings: warnings.length > 0 ? warnings : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined
  };
}