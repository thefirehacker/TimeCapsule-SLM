/**
 * LLM Think Section Extractor
 * 
 * Parses LLM responses to extract <think> sections and clean final output
 * Enables collapsible thinking process display in the UI
 */

export interface ThinkingProcess {
  hasThinking: boolean;
  thinkingContent: string;
  finalOutput: string;
  rawResponse: string;
}

export interface ParsedLLMResponse {
  thinking: string;
  output: string;
  hasThinking: boolean;
  metadata: {
    thinkingLength: number;
    outputLength: number;
    totalLength: number;
  };
}

/**
 * Extracts <think> sections from LLM responses
 */
export function extractThinkingProcess(response: string): ThinkingProcess {
  if (!response || typeof response !== 'string') {
    return {
      hasThinking: false,
      thinkingContent: '',
      finalOutput: response || '',
      rawResponse: response || '',
    };
  }

  // Multiple regex patterns to catch different think tag variations
  const thinkPatterns = [
    /<think>([\s\S]*?)<\/think>/gi,
    /<thinking>([\s\S]*?)<\/thinking>/gi,
    /\[think\]([\s\S]*?)\[\/think\]/gi,
    /\[thinking\]([\s\S]*?)\[\/thinking\]/gi,
  ];

  let thinkingContent = '';
  let cleanedResponse = response;
  let hasThinking = false;

  // Try each pattern to extract thinking content
  for (const pattern of thinkPatterns) {
    const matches = response.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        thinkingContent += (thinkingContent ? '\n\n' : '') + match[1].trim();
        hasThinking = true;
        // Remove the think tags from the response
        cleanedResponse = cleanedResponse.replace(match[0], '').trim();
      }
    }
  }

  // Clean up any remaining empty lines or whitespace
  const finalOutput = cleanedResponse
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
    .trim();

  return {
    hasThinking,
    thinkingContent: thinkingContent.trim(),
    finalOutput,
    rawResponse: response,
  };
}

/**
 * Comprehensive LLM response parser with metadata
 */
export function parseLLMResponse(response: string): ParsedLLMResponse {
  const thinking = extractThinkingProcess(response);
  
  return {
    thinking: thinking.thinkingContent,
    output: thinking.finalOutput,
    hasThinking: thinking.hasThinking,
    metadata: {
      thinkingLength: thinking.thinkingContent.length,
      outputLength: thinking.finalOutput.length,
      totalLength: response.length,
    },
  };
}

/**
 * Formats thinking content for display with improved readability
 */
export function formatThinkingContent(thinking: string): string {
  if (!thinking) return '';
  
  return thinking
    // Add proper line breaks for readability
    .replace(/\. ([A-Z])/g, '.\n\n$1')
    // Clean up excessive whitespace
    .replace(/\s+/g, ' ')
    // Ensure proper paragraph breaks
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Validates if a response contains valid thinking content
 */
export function hasValidThinking(response: string): boolean {
  const parsed = extractThinkingProcess(response);
  return parsed.hasThinking && parsed.thinkingContent.length > 10; // Minimum meaningful content
}

/**
 * Extracts key insights from thinking process
 */
export function extractThinkingInsights(thinking: string): string[] {
  if (!thinking) return [];
  
  const insights: string[] = [];
  
  // Extract sentences that indicate reasoning or analysis
  const reasoningPatterns = [
    /First,?\s+(.+?[.!?])/gi,
    /Second,?\s+(.+?[.!?])/gi, 
    /Then,?\s+(.+?[.!?])/gi,
    /So,?\s+(.+?[.!?])/gi,
    /Therefore,?\s+(.+?[.!?])/gi,
    /I need to\s+(.+?[.!?])/gi,
    /Let me\s+(.+?[.!?])/gi,
  ];
  
  for (const pattern of reasoningPatterns) {
    const matches = thinking.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && match[1].length > 15) {
        insights.push(match[1].trim());
      }
    }
  }
  
  return insights.slice(0, 5); // Limit to top 5 insights
}

/**
 * Creates a summary of the thinking process
 */
export function summarizeThinking(thinking: string): string {
  if (!thinking) return '';
  
  const insights = extractThinkingInsights(thinking);
  if (insights.length === 0) {
    // Fallback: take first meaningful sentence
    const sentences = thinking.split(/[.!?]+/).filter(s => s.trim().length > 20);
    return sentences[0]?.trim() + '...' || 'Processing query...';
  }
  
  return insights[0] + (insights.length > 1 ? '...' : '');
}

/**
 * Type guard to check if content has thinking process
 */
export function isThinkingResponse(response: unknown): response is string {
  return typeof response === 'string' && hasValidThinking(response);
}

export default {
  extractThinkingProcess,
  parseLLMResponse,
  formatThinkingContent,
  hasValidThinking,
  extractThinkingInsights,
  summarizeThinking,
  isThinkingResponse,
};