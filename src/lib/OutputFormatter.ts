/**
 * OutputFormatter - Cleans LLM output and provides report summarization
 * Removes thinking sections and provides clean, structured output with summarization controls
 */

import { AIAssistant } from './AIAssistant';

export interface FormattingOptions {
  removeLLMThinking: boolean;
  cleanMarkdown: boolean;
  addTableOfContents: boolean;
  enhanceReadability: boolean;
  summarizationLevel: 'none' | 'brief' | 'moderate' | 'concise'; // New: Summarization slider
}

export interface AgentOutput {
  agentId: string;
  content: string;
  metadata?: {
    tokens?: number;
    duration?: number;
    timestamp?: Date;
  };
}

export interface StructuredResult {
  title: string;
  summary: string;
  content: string;
  tableOfContents?: string;
  metadata: {
    originalLength: number;
    formattedLength: number;
    summarizationApplied: boolean;
    processingTime: number;
    agentsUsed: string[];
  };
}

export interface SummarizationRequest {
  content: string;
  targetLength: 'brief' | 'moderate' | 'concise';
  preserveSections: string[]; // Sections to keep in full
  focusAreas?: string[]; // Areas to emphasize in summary
}

export class OutputFormatter {
  private aiAssistant: AIAssistant;

  constructor(aiAssistant: AIAssistant) {
    this.aiAssistant = aiAssistant;
    console.log('🎨 OutputFormatter initialized');
  }

  /**
   * Clean and format LLM output with optional summarization
   */
  async cleanLLMOutput(
    rawOutput: string,
    options: FormattingOptions = {
      removeLLMThinking: true,
      cleanMarkdown: true,
      addTableOfContents: false,
      enhanceReadability: true,
      summarizationLevel: 'none'
    }
  ): Promise<string> {
    console.log('🎨 OutputFormatter: Cleaning LLM output', {
      originalLength: rawOutput.length,
      options
    });

    const startTime = Date.now();
    let cleanedOutput = rawOutput;

    // Step 1: Remove LLM thinking sections
    if (options.removeLLMThinking) {
      cleanedOutput = this.removeLLMThinking(cleanedOutput);
    }

    // Step 2: Clean markdown formatting
    if (options.cleanMarkdown) {
      cleanedOutput = this.cleanMarkdownFormatting(cleanedOutput);
    }

    // Step 3: Apply summarization if requested
    if (options.summarizationLevel !== 'none') {
      cleanedOutput = await this.applySummarization(cleanedOutput, options.summarizationLevel);
    }

    // Step 4: Enhance readability
    if (options.enhanceReadability) {
      cleanedOutput = this.enhanceReadability(cleanedOutput);
    }

    // Step 5: Add table of contents if requested
    if (options.addTableOfContents) {
      cleanedOutput = this.addTableOfContents(cleanedOutput);
    }

    const processingTime = Date.now() - startTime;

    console.log('✅ OutputFormatter: Cleaning completed', {
      originalLength: rawOutput.length,
      cleanedLength: cleanedOutput.length,
      reductionPercentage: Math.round((1 - cleanedOutput.length / rawOutput.length) * 100),
      processingTime: `${processingTime}ms`,
      summarizationApplied: options.summarizationLevel !== 'none'
    });

    return cleanedOutput;
  }

  /**
   * Structure multiple agent outputs into a cohesive result
   */
  async structureResults(
    agentOutputs: AgentOutput[],
    options: FormattingOptions = {
      removeLLMThinking: true,
      cleanMarkdown: true,
      addTableOfContents: true,
      enhanceReadability: true,
      summarizationLevel: 'none'
    }
  ): Promise<StructuredResult> {
    console.log('📋 OutputFormatter: Structuring agent results', {
      agentCount: agentOutputs.length,
      totalLength: agentOutputs.reduce((sum, output) => sum + output.content.length, 0)
    });

    const startTime = Date.now();
    const originalLength = agentOutputs.reduce((sum, output) => sum + output.content.length, 0);

    // Combine all agent outputs
    let combinedContent = this.combineAgentOutputs(agentOutputs);

    // Apply formatting options
    const cleanedContent = await this.cleanLLMOutput(combinedContent, options);

    // Generate title and summary
    const title = this.generateTitle(cleanedContent);
    const summary = this.generateSummary(cleanedContent, agentOutputs);

    // Add table of contents if requested
    let tableOfContents = '';
    if (options.addTableOfContents) {
      tableOfContents = this.extractTableOfContents(cleanedContent);
    }

    const processingTime = Date.now() - startTime;

    const result: StructuredResult = {
      title,
      summary,
      content: cleanedContent,
      tableOfContents,
      metadata: {
        originalLength,
        formattedLength: cleanedContent.length,
        summarizationApplied: options.summarizationLevel !== 'none',
        processingTime,
        agentsUsed: agentOutputs.map(output => output.agentId)
      }
    };

    console.log('✅ OutputFormatter: Results structured', {
      title,
      originalLength,
      formattedLength: cleanedContent.length,
      processingTime: `${processingTime}ms`
    });

    return result;
  }

  /**
   * Apply AI-powered summarization based on slider level
   */
  async applySummarization(content: string, level: 'brief' | 'moderate' | 'concise'): Promise<string> {
    console.log(`📝 OutputFormatter: Applying ${level} summarization...`);

    // Skip summarization if content is already short
    if (content.length < 3000) {
      console.log('📝 Content too short for summarization, skipping...');
      return content;
    }

    const summarizationPrompts = {
      brief: {
        instruction: 'Create a brief summary that captures the key points',
        targetReduction: 0.3, // 30% of original length
        preserveElements: ['headings', 'code blocks', 'important lists']
      },
      moderate: {
        instruction: 'Create a moderate summary that maintains important details',
        targetReduction: 0.6, // 60% of original length
        preserveElements: ['headings', 'code blocks', 'key examples', 'important lists']
      },
      concise: {
        instruction: 'Create a very concise summary with only essential information',
        targetReduction: 0.2, // 20% of original length
        preserveElements: ['main headings', 'critical code blocks']
      }
    };

    const config = summarizationPrompts[level];
    const targetLength = Math.round(content.length * config.targetReduction);

    const prompt = `You are an expert content summarizer. Your task is to create a ${level} summary of the following content.

## Instructions:
- ${config.instruction}
- Target length: approximately ${targetLength} characters
- Preserve: ${config.preserveElements.join(', ')}
- Maintain the original structure and formatting
- Keep all code examples and technical details that are essential
- Remove redundant explanations and verbose descriptions
- Preserve markdown formatting

## Content to Summarize:
${content}

## Summary:`;

    try {
      const summarized = await this.aiAssistant.generateContent(prompt, 'research');
      
      console.log(`✅ Summarization completed`, {
        level,
        originalLength: content.length,
        summarizedLength: summarized.length,
        reductionAchieved: Math.round((1 - summarized.length / content.length) * 100) + '%'
      });

      return summarized;
    } catch (error) {
      console.error('❌ Summarization failed, returning original content:', error);
      return content;
    }
  }

  /**
   * Generate executive summary from content
   */
  generateExecutiveSummary(results: StructuredResult): string {
    const wordCount = results.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    return `
## Executive Summary

**Title**: ${results.title}

**Overview**: ${results.summary}

**Content Statistics**:
- Length: ${results.metadata.formattedLength.toLocaleString()} characters (${wordCount.toLocaleString()} words)
- Estimated Reading Time: ${readingTime} minutes
- Generated by: ${results.metadata.agentsUsed.length} specialized agents
- Processing Time: ${results.metadata.processingTime}ms
- Summarization Applied: ${results.metadata.summarizationApplied ? 'Yes' : 'No'}

**Key Features**:
- Multi-agent coordination for comprehensive coverage
- AI-powered content generation and structuring
- Real-time processing with quality assurance
- Customizable output formatting and summarization

---
`;
  }

  /**
   * Create actionable steps from structured results
   */
  createActionableSteps(results: StructuredResult): string {
    const steps = this.extractActionableItems(results.content);
    
    if (steps.length === 0) {
      return '## Next Steps\n\n*No specific action items were identified in the content.*\n';
    }

    let actionPlan = '## Actionable Next Steps\n\n';
    
    steps.forEach((step, index) => {
      actionPlan += `${index + 1}. **${step.title}**\n`;
      actionPlan += `   - ${step.description}\n`;
      if (step.timeEstimate) {
        actionPlan += `   - *Estimated time: ${step.timeEstimate}*\n`;
      }
      actionPlan += '\n';
    });

    return actionPlan;
  }

  /**
   * Remove LLM thinking sections and artifacts
   */
  private removeLLMThinking(content: string): string {
    // Remove common thinking patterns
    const thinkingPatterns = [
      /Let me think about this\.\.\./gi,
      /I need to consider\.\.\./gi,
      /Thinking about this\.\.\./gi,
      /To approach this\.\.\./gi,
      /I should\.\.\./gi,
      /Looking at this\.\.\./gi,
      /Based on my analysis\.\.\./gi,
      /Let me analyze\.\.\./gi,
      /I'll need to\.\.\./gi,
      /First, I'll\.\.\./gi,
      /Actually, let me\.\.\./gi,
      /Wait, I should\.\.\./gi,
      /Hmm, \w+/gi,
      /\*thinking\*/gi,
      /\*considers\*/gi,
      /\*analyzes\*/gi
    ];

    let cleaned = content;
    
    thinkingPatterns.forEach(pattern => {
      cleaned = cleaned.replace(pattern, '');
    });

    // Remove meta-commentary
    const metaPatterns = [
      /As an AI assistant,.*?(?=\n|\.|$)/gi,
      /I'm going to.*?(?=\n|\.|$)/gi,
      /I'll start by.*?(?=\n|\.|$)/gi,
      /I understand that.*?(?=\n|\.|$)/gi,
      /To summarize.*?(?=\n|\.|$)/gi
    ];

    metaPatterns.forEach(pattern => {
      cleaned = cleaned.replace(pattern, '');
    });

    // Clean up extra whitespace
    cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
    cleaned = cleaned.replace(/^\s+|\s+$/g, '');

    return cleaned;
  }

  /**
   * Clean and normalize markdown formatting
   */
  private cleanMarkdownFormatting(content: string): string {
    let cleaned = content;

    // Fix heading hierarchy
    cleaned = this.fixHeadingHierarchy(cleaned);

    // Clean up list formatting
    cleaned = cleaned.replace(/^(\s*)[-*+]\s+/gm, '$1- ');

    // Normalize code block formatting
    cleaned = cleaned.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || '';
      const cleanCode = code.trim();
      return `\`\`\`${language}\n${cleanCode}\n\`\`\``;
    });

    // Fix emphasis formatting
    cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '**$1**');
    cleaned = cleaned.replace(/\*([^*]+)\*/g, '*$1*');

    // Clean up table formatting
    cleaned = this.cleanTableFormatting(cleaned);

    return cleaned;
  }

  /**
   * Fix heading hierarchy to ensure proper structure
   */
  private fixHeadingHierarchy(content: string): string {
    const lines = content.split('\n');
    const headingLevels: number[] = [];
    
    // First pass: identify all heading levels
    lines.forEach(line => {
      const match = line.match(/^(#{1,6})\s+/);
      if (match) {
        const level = match[1].length;
        if (!headingLevels.includes(level)) {
          headingLevels.push(level);
        }
      }
    });

    headingLevels.sort((a, b) => a - b);

    // Second pass: normalize heading levels
    return lines.map(line => {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const currentLevel = match[1].length;
        const normalizedLevel = headingLevels.indexOf(currentLevel) + 1;
        const newHeading = '#'.repeat(normalizedLevel);
        return `${newHeading} ${match[2]}`;
      }
      return line;
    }).join('\n');
  }

  /**
   * Clean table formatting
   */
  private cleanTableFormatting(content: string): string {
    return content.replace(/\|([^|\n]+)\|/g, (match, cellContent) => {
      return `| ${cellContent.trim()} |`;
    });
  }

  /**
   * Enhance readability with better formatting
   */
  private enhanceReadability(content: string): string {
    let enhanced = content;

    // Add spacing around headings
    enhanced = enhanced.replace(/^(#{1,6}\s+.+)$/gm, '\n$1\n');

    // Add spacing around code blocks
    enhanced = enhanced.replace(/(```[\s\S]*?```)/g, '\n$1\n');

    // Improve list readability
    enhanced = enhanced.replace(/^(\s*-\s+.+)$/gm, '$1');

    // Clean up excessive spacing
    enhanced = enhanced.replace(/\n{3,}/g, '\n\n');

    return enhanced.trim();
  }

  /**
   * Add table of contents
   */
  private addTableOfContents(content: string): string {
    const toc = this.extractTableOfContents(content);
    if (!toc) return content;

    return `## Table of Contents\n\n${toc}\n\n---\n\n${content}`;
  }

  /**
   * Extract table of contents from content
   */
  private extractTableOfContents(content: string): string {
    const lines = content.split('\n');
    const tocItems: string[] = [];

    lines.forEach(line => {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const title = match[2];
        const indent = '  '.repeat(level - 1);
        const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        tocItems.push(`${indent}- [${title}](#${anchor})`);
      }
    });

    return tocItems.length > 0 ? tocItems.join('\n') : '';
  }

  /**
   * Combine multiple agent outputs
   */
  private combineAgentOutputs(agentOutputs: AgentOutput[]): string {
    if (agentOutputs.length === 0) return '';
    if (agentOutputs.length === 1) return agentOutputs[0].content;

    let combined = '# Multi-Agent Research Results\n\n';
    
    agentOutputs.forEach((output, index) => {
      combined += `## Agent ${index + 1}: ${output.agentId}\n\n`;
      combined += `${output.content}\n\n`;
      combined += '---\n\n';
    });

    return combined;
  }

  /**
   * Generate title from content
   */
  private generateTitle(content: string): string {
    // Look for first heading
    const firstHeading = content.match(/^#\s+(.+)$/m);
    if (firstHeading) {
      return firstHeading[1];
    }

    // Extract title from first significant line
    const lines = content.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      const firstLine = lines[0].replace(/^#+\s*/, '').substring(0, 60);
      return firstLine + (firstLine.length < lines[0].length ? '...' : '');
    }

    return 'Dynamic Learning Research Results';
  }

  /**
   * Generate summary from content and agent outputs
   */
  private generateSummary(content: string, agentOutputs: AgentOutput[]): string {
    const wordCount = content.split(/\s+/).length;
    const agentNames = agentOutputs.map(output => output.agentId).join(', ');

    return `Comprehensive research generated by ${agentOutputs.length} specialized agents (${agentNames}). Content includes ${wordCount.toLocaleString()} words of detailed analysis, practical guidance, and actionable insights.`;
  }

  /**
   * Extract actionable items from content
   */
  private extractActionableItems(content: string): Array<{title: string, description: string, timeEstimate?: string}> {
    const actionItems: Array<{title: string, description: string, timeEstimate?: string}> = [];
    
    // Look for numbered lists and action-oriented headings
    const actionPatterns = [
      /^\d+\.\s+(.+)$/gm,
      /^-\s+(.+)$/gm,
      /^##\s+(.+)$/gm
    ];

    actionPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const title = match.replace(/^\d+\.\s+|^-\s+|^##\s+/, '').trim();
          if (this.isActionable(title)) {
            actionItems.push({
              title,
              description: this.extractActionDescription(content, title),
              timeEstimate: this.extractTimeEstimate(content, title)
            });
          }
        });
      }
    });

    return actionItems.slice(0, 10); // Limit to top 10 action items
  }

  /**
   * Check if text represents an actionable item
   */
  private isActionable(text: string): boolean {
    const actionWords = ['create', 'build', 'implement', 'setup', 'configure', 'develop', 'design', 'test', 'deploy', 'learn', 'practice', 'review', 'analyze'];
    return actionWords.some(word => text.toLowerCase().includes(word));
  }

  /**
   * Extract description for an action item
   */
  private extractActionDescription(content: string, title: string): string {
    const titleIndex = content.indexOf(title);
    if (titleIndex === -1) return 'No description available';

    const nextSection = content.substring(titleIndex + title.length, titleIndex + title.length + 200);
    const firstSentence = nextSection.match(/[^.!?]*[.!?]/);
    return firstSentence ? firstSentence[0].trim() : nextSection.substring(0, 100) + '...';
  }

  /**
   * Extract time estimate for an action item
   */
  private extractTimeEstimate(content: string, title: string): string | undefined {
    const context = content.substring(Math.max(0, content.indexOf(title) - 100), content.indexOf(title) + 200);
    const timePattern = /(\d+\s*(?:minute|hour|day|week)s?)/i;
    const match = context.match(timePattern);
    return match ? match[1] : undefined;
  }
} 