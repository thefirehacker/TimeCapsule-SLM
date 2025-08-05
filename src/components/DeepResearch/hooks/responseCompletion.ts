/**
 * Response Completion Utilities
 * 
 * Handles small model response completion issues including:
 * - "done": false detection and retry
 * - JSON parsing resilience 
 * - Response continuation for truncated outputs
 * - Loop detection and breaking
 */

const RESPONSE_TIMEOUT = 60000; // 60 seconds for small models
const MAX_RETRIES = 3;
const CONTINUATION_PROMPT = "Please complete your previous response starting from where you left off.";

export interface ResponseCompletionOptions {
  maxRetries?: number;
  timeout?: number;
  continuationPrompt?: string;
}

export interface CompletionIssue {
  hasIssue: boolean;
  reason: string;
}

/**
 * Enhanced generation with response completion handling
 */
export async function generateWithCompletion(
  generateFn: (prompt: string) => Promise<{ text: string }>,
  prompt: string,
  options: ResponseCompletionOptions = {},
  attempt: number = 1
): Promise<string> {
  const maxRetries = options.maxRetries || MAX_RETRIES;
  const timeout = options.timeout || RESPONSE_TIMEOUT;
  const continuationPrompt = options.continuationPrompt || CONTINUATION_PROMPT;

  try {
    console.log(`🔄 Generation attempt ${attempt} for prompt length: ${prompt.length}`);

    // Use timeout for small models
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Response timeout')), timeout);
    });

    const generationPromise = generateFn(prompt);
    const { text } = await Promise.race([generationPromise, timeoutPromise]);

    if (!text || text.trim().length === 0) {
      throw new Error("Model returned empty response");
    }

    // Check for response completion issues
    const completionIssue = detectResponseIssues(text);
    
    if (completionIssue.hasIssue && attempt < maxRetries) {
      console.warn(`⚠️ Response issue detected: ${completionIssue.reason}. Attempting continuation...`);
      
      // Attempt to continue the response
      const continuationText = `${prompt}\n\nPrevious partial response:\n${text}\n\n${continuationPrompt}`;
      const continuedResponse = await generateWithCompletion(generateFn, continuationText, options, attempt + 1);
      
      // Combine responses intelligently
      return combinePartialResponses(text, continuedResponse);
    }

    return text;
    
  } catch (error) {
    console.error(`❌ Generation attempt ${attempt} failed:`, error);

    // Handle specific Ollama API errors
    if (error instanceof Error) {
      console.log(`🔍 Error details: ${error.message}`);
      
      if (error.message.includes('Invalid JSON response') || error.message.includes('Ollama API rejected response')) {
        console.log('🔧 Detected Invalid JSON response error, using fallback strategy...');
        if (attempt < maxRetries) {
          // Use a simpler, more direct prompt for small models
          const simplifiedPrompt = createSimplifiedPrompt(prompt);
          console.log(`🔄 Attempt ${attempt + 1} with simplified prompt`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Longer delay for recovery
          return await generateWithCompletion(generateFn, simplifiedPrompt, options, attempt + 1);
        }
      }
      
      if (error.message.includes('done": false')) {
        console.log('🔧 Detected incomplete response (done: false), attempting continuation...');
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Brief delay
          return await generateWithCompletion(generateFn, prompt, options, attempt + 1);
        }
      }
      
      if (error.message.includes('timeout')) {
        console.log('⏰ Request timeout, using shorter prompt for retry...');
        if (attempt < maxRetries) {
          const shorterPrompt = prompt.length > 500 ? prompt.substring(0, 500) + '\n\nPlease provide a direct answer.' : prompt;
          await new Promise(resolve => setTimeout(resolve, 1000));
          return await generateWithCompletion(generateFn, shorterPrompt, options, attempt + 1);
        }
      }
    }

    throw error;
  }
}

/**
 * Detect various response completion issues
 */
export function detectResponseIssues(text: string): CompletionIssue {
  // Check for repetitive patterns (loop detection)
  const loopPattern = /(\b\w+\b)(?:\s+\1){5,}/gi;
  if (loopPattern.test(text)) {
    return { hasIssue: true, reason: 'Repetitive loop detected' };
  }

  // Check for abrupt endings
  if (text.length > 100 && !text.trim().match(/[.!?]$/)) {
    return { hasIssue: true, reason: 'Abrupt ending without punctuation' };
  }

  // Check for incomplete JSON
  if (text.includes('{') && !text.includes('}')) {
    return { hasIssue: true, reason: 'Incomplete JSON structure' };
  }

  // Check for thinking tags that weren't closed
  if (text.includes('<think>') && !text.includes('</think>')) {
    return { hasIssue: true, reason: 'Unclosed thinking tags' };
  }

  return { hasIssue: false, reason: '' };
}

/**
 * Extract partial content from JSON parsing errors
 */
export function extractPartialContent(error: Error): string | null {
  try {
    const errorMessage = error.message;
    // Look for content in the error message
    const contentMatch = errorMessage.match(/"content":"([^"]+)"/i);
    if (contentMatch) {
      return contentMatch[1].replace(/\\n/g, '\n');
    }

    // Look for partial JSON structure
    const jsonMatch = errorMessage.match(/\{[\s\S]*$/i);
    if (jsonMatch) {
      try {
        // Try to extract just the content field
        const partialJson = jsonMatch[0];
        const contentStart = partialJson.indexOf('"content"');
        if (contentStart !== -1) {
          const contentValue = partialJson.substring(contentStart + 10);
          const valueMatch = contentValue.match(/"([^"]*)"/i);
          if (valueMatch) {
            return valueMatch[1].replace(/\\n/g, '\n');
          }
        }
      } catch (e) {
        // Ignore JSON parsing errors in error extraction
      }
    }
  } catch (e) {
    console.warn('Failed to extract partial content from error:', e);
  }
  return null;
}

/**
 * Intelligently combine partial responses
 */
export function combinePartialResponses(first: string, second: string): string {
  // Remove duplicate content at the boundary
  const firstTrimmed = first.trim();
  const secondTrimmed = second.trim();

  // Find overlap between end of first and start of second
  const words1 = firstTrimmed.split(/\s+/);
  const words2 = secondTrimmed.split(/\s+/);
  
  let overlap = 0;
  const maxOverlap = Math.min(10, words1.length, words2.length);
  
  for (let i = 1; i <= maxOverlap; i++) {
    const end1 = words1.slice(-i).join(' ');
    const start2 = words2.slice(0, i).join(' ');
    if (end1.toLowerCase() === start2.toLowerCase()) {
      overlap = i;
    }
  }

  if (overlap > 0) {
    const combinedWords = [...words1, ...words2.slice(overlap)];
    return combinedWords.join(' ');
  }

  // No overlap found, simply concatenate with spacing
  return `${firstTrimmed}\n\n${secondTrimmed}`;
}

/**
 * Enhanced JSON parsing with resilience for partial responses
 */
export function parseJsonWithResilience(text: string): any {
  try {
    return JSON.parse(text);
  } catch (firstError) {
    console.log('🔍 Direct JSON parse failed, trying extraction...');
    
    // Try to extract JSON from the response
    // Handle <think> tags if present
    let cleanText = text;
    if (cleanText.includes('<think>') && cleanText.includes('</think>')) {
      const thinkEnd = cleanText.lastIndexOf('</think>');
      if (thinkEnd !== -1) {
        cleanText = cleanText.substring(thinkEnd + 8).trim();
      }
    }
    
    // Try to find JSON object
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        let jsonText = jsonMatch[0];
        // 🚨 FIX: Clean up common JSON issues from LLM responses
        jsonText = cleanJsonText(jsonText);
        return JSON.parse(jsonText);
      } catch (secondError) {
        console.error('🔍 JSON extraction failed:', secondError);
        console.error('🔍 Problematic JSON text:', jsonMatch[0].substring(0, 200) + '...');
      }
    }
    
    // Last resort: try to find array
    const arrayMatch = cleanText.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try {
        let arrayText = arrayMatch[0];
        // 🚨 FIX: Clean up common JSON issues from LLM responses
        arrayText = cleanJsonText(arrayText);
        const parsed = JSON.parse(arrayText);
        return Array.isArray(parsed) ? parsed : [parsed]; // Return as array
      } catch (thirdError) {
        console.error('🔍 Array extraction failed:', thirdError);
        console.error('🔍 Problematic array text:', arrayMatch[0].substring(0, 200) + '...');
      }
    }
    
    throw new Error('Invalid JSON after all extraction attempts');
  }
}

/**
 * 🚨 FIX: Clean up common JSON formatting issues from LLM responses
 */
function cleanJsonText(jsonText: string): string {
  return jsonText
    // Remove trailing commas before closing brackets/braces
    .replace(/,(\s*[}\]])/g, '$1')
    // Fix unescaped quotes in strings (basic attempt)
    .replace(/: "([^"]*)"([^",}\]]*)"([^",}\]]*)",/g, ': "$1\\"$2\\"$3",')
    // Remove comments that might be added by LLM
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Clean up any markdown formatting
    .replace(/```json\s*/, '')
    .replace(/```\s*$/, '')
    // Ensure proper string quoting for common LLM mistakes
    .replace(/(\w+):/g, '"$1":')  // Quote unquoted keys
    .replace(/: ([a-zA-Z_][a-zA-Z0-9_]*)/g, ': "$1"')  // Quote unquoted string values
    // Fix boolean and null values that got quoted
    .replace(/: "true"/g, ': true')
    .replace(/: "false"/g, ': false')
    .replace(/: "null"/g, ': null')
    .trim();
}

/**
 * Create a simplified prompt for small models that struggle with complex instructions
 */
function createSimplifiedPrompt(originalPrompt: string): string {
  // Extract the core question from the prompt
  const queryMatch = originalPrompt.match(/(?:Query|Question|User asks?):\s*["']?([^"'\n]+)["']?/i);
  const query = queryMatch ? queryMatch[1] : 'Please extract relevant information';
  
  // Create a much simpler, direct prompt
  const simplified = `Extract information to answer: ${query}

Provide a direct, simple answer with key facts only.
No thinking, no analysis, just the facts.`;

  console.log(`🔧 Simplified prompt from ${originalPrompt.length} to ${simplified.length} characters`);
  return simplified;
}

/**
 * Sanitize response text to fix common JSON issues
 */
export function sanitizeResponse(text: string): string {
  let cleaned = text.trim();
  
  // Remove common problematic patterns
  cleaned = cleaned.replace(/really\s+really\s+really.*/gi, '');
  cleaned = cleaned.replace(/\.\.\.[\s\.]*$/g, '');
  cleaned = cleaned.replace(/^[\s\n]*\{[\s\n]*$/g, '');
  
  // Fix incomplete JSON
  if (cleaned.startsWith('{') && !cleaned.endsWith('}')) {
    cleaned += '}';
  }
  if (cleaned.startsWith('[') && !cleaned.endsWith(']')) {
    cleaned += ']';
  }
  
  return cleaned;
}