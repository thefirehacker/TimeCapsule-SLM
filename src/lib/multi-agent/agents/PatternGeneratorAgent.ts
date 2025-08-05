/**
 * Pattern Generator Agent
 * 
 * Creates extraction strategies based on data inspection results.
 * Generates logical descriptions of what to look for, not regex patterns.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';

export class PatternGeneratorAgent extends BaseAgent {
  readonly name = 'PatternGenerator';
  readonly description = 'Creates extraction strategies based on data inspection';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🎯 PatternGenerator: Creating extraction strategies`);
    
    // DEBUG: Log existing patterns from DataInspector or previous agents
    console.log(`📋 DEBUG - Existing patterns before PatternGenerator:`, {
      count: context.patterns?.length || 0,
      patterns: context.patterns?.map(p => p.description) || [],
      hasSharedKnowledge: !!context.sharedKnowledge?.documentInsights
    });
    
    // Use LLM to generate extraction strategies
    await this.generateStrategiesWithLLM(context);
    
    return context;
  }
  
  private async generateStrategiesWithLLM(context: ResearchContext): Promise<void> {
    console.log(`🧠 PatternGenerator: Generating dynamic regex patterns via LLM analysis`);
    
    // ACCESS DataInspector's shared insights for intelligent regex generation
    const documentInsights = context.sharedKnowledge.documentInsights;
    const hasDocumentAnalysis = documentInsights && Object.keys(documentInsights).length > 0;
    
    // Sample actual document content for pattern analysis (ZERO HARDCODING)
    const sampleContent = context.ragResults.chunks
      .slice(0, 5)  // Use more samples for better pattern discovery
      .map((chunk, i) => `SAMPLE ${i + 1}:\n${chunk.text.substring(0, 400)}`)
      .join('\n\n---\n\n');
      
    // 🚀 LLM-DRIVEN DYNAMIC REGEX GENERATION (Universal Intelligence)
    const regexGenerationPrompt = `Analyze this document content and generate TARGETED REGEX PATTERNS based on specific insights from DataInspector.

USER QUERY: "${context.query}"

${hasDocumentAnalysis ? `
DOCUMENT ANALYSIS:
- Type: ${documentInsights.documentType}
- Content Areas: ${documentInsights.contentAreas?.join(', ')}
- Intent: ${documentInsights.queryIntent}
- Expected Format: ${documentInsights.expectedOutputFormat}

🔥 CRITICAL SPECIFIC INSIGHTS FROM DATAINSPECTOR:
${documentInsights.specificInsights?.map((insight: string) => `- ${insight}`).join('\n') || '- No specific insights available'}

🎯 KEY FINDINGS TO TARGET:
${documentInsights.keyFindings?.map((finding: string) => `- ${finding}`).join('\n') || '- No key findings available'}

📝 DETAILED DATAINSPECTOR REASONING:
${documentInsights.detailedReasoning ? documentInsights.detailedReasoning.substring(0, 500) + '...' : 'No detailed reasoning available'}
` : ''}

DOCUMENT SAMPLES:
${sampleContent}

CRITICAL: Generate DATA EXTRACTION patterns, NOT keyword patterns.

WRONG APPROACH: Looking for keywords/names (Tyler, speedrun, etc.)
RIGHT APPROACH: Looking for DATA STRUCTURES that contain the values the user wants

Look at the document samples and identify:
1. What STRUCTURE surrounds the data the user needs?
2. What PATTERNS appear before/after the actual values?
3. How are measurements, rankings, or results formatted in THIS specific document?

Generate patterns based on the ACTUAL formatting you see in the document samples, not assumptions.

${documentInsights?.specificInsights?.find((insight: string) => insight.includes('personal')) ? `
FOCUS: Generate STRUCTURE patterns that extract the person's ACTUAL DATA based on insights:
${documentInsights.specificInsights
  .filter((insight: string) => insight.includes('CRITICAL:') || insight.includes('FOCUS:'))
  .map((insight: string) => `- ${insight}`)
  .join('\n')}
` : ''}

Your patterns must extract MEASURABLE DATA VALUES, not just find keywords!

ANALYZE THE QUERY TYPE:
"${context.query}" - What TYPE of data does this query need?
- If asking for "top 3", need ranking/performance data
- If asking for "times", need timing/duration measurements  
- If asking for "scores", need numeric performance metrics
- If asking for "achievements", need accomplishment data with values

Based on the query analysis and document samples, generate STRUCTURE patterns that extract the DATA VALUES the user wants.

CRITICAL: Do NOT use <think> tags. Respond DIRECTLY with patterns.

Your task: Analyze the actual document samples above and discover what DATA STRUCTURES exist that contain the information the user wants.

Look at the actual text content and identify:
1. How are numbers/measurements formatted in this specific document? 
2. What words or symbols appear before/after the data values?
3. What patterns surround the information the user is asking for?

Based on your analysis of the ACTUAL document content, generate regex patterns that extract the data structures you discovered.

Format as:
REGEX_PATTERNS:
- [your discovered pattern 1]
- [your discovered pattern 2] 
- [your discovered pattern 3]

REASONING: [Explain what specific data structures you found in the documents and why your patterns will extract them]

Generate 3-5 patterns based on what you actually see in the document samples, not assumptions about what might be there.`;

    try {
      const response = await this.llm(regexGenerationPrompt);
      console.log(`🎯 LLM regex generation response:`, response.substring(0, 400));
      
      // Parse concrete regex patterns from LLM response
      const regexPatterns = this.parseRegexPatternsFromLLM(response);
      
      if (regexPatterns.length > 0) {
        console.log(`✅ Generated ${regexPatterns.length} dynamic regex patterns:`, regexPatterns);
        
        // 🔥 FIX: APPEND patterns instead of OVERWRITING them!
        // Initialize patterns array if it doesn't exist
        if (!context.patterns) {
          context.patterns = [];
        }
        
        // Store the concrete regex patterns for extraction (APPEND, not overwrite)
        const newPatterns = regexPatterns.map((pattern, index) => ({
          description: `LLM-generated regex pattern ${index + 1}`,
          examples: [],  // Regex patterns don't need example text
          extractionStrategy: `Direct regex search using: ${pattern}`,
          confidence: 0.9,
          regexPattern: pattern  // 🔥 NEW: Store actual regex pattern
        }));
        
        // APPEND new patterns to existing ones
        context.patterns.push(...newPatterns);
        
        console.log(`✅ DEBUG - Patterns after PatternGenerator:`, {
          previousCount: context.patterns.length - newPatterns.length,
          newCount: newPatterns.length,
          totalCount: context.patterns.length
        });
        
        // Store generation details in shared knowledge
        context.sharedKnowledge.extractionStrategies = {
          generatedPatterns: regexPatterns,
          generationMethod: 'llm_dynamic_regex',
          basedOnDocumentAnalysis: hasDocumentAnalysis,
          timestamp: Date.now(),
          agentSource: 'PatternGenerator',
          llmResponse: response
        };
        
      } else {
        // 🚨 NO FALLBACKS: LLM must generate proper patterns or fail
        console.error('❌ LLM failed to generate valid regex patterns');
        throw new Error('PatternGenerator failed: LLM must generate proper patterns. NO FALLBACKS allowed.');
      }
      
      // Set detailed reasoning for verbose output
      const reasoningText = `🎯 **PatternGenerator: Context-Aware Regex Generation**

📝 **Query Analysis**: "${context.query}"
📊 **Document Samples Analyzed**: ${context.ragResults.chunks.length} chunks (${sampleContent.length} characters)

${hasDocumentAnalysis ? `
🧠 **DataInspector Insights Applied**:
- Document Type: ${documentInsights.documentType}
- Content Areas: ${documentInsights.contentAreas?.join(', ')}
- Query Intent: ${documentInsights.queryIntent}

🔥 **Critical Specific Insights Preserved**:
${documentInsights.specificInsights?.map((insight: string) => `- ${insight}`).join('\n') || '- No specific insights available'}

🎯 **Key Findings Targeted**:
${documentInsights.keyFindings?.map((finding: string) => `- ${finding}`).join('\n') || '- No key findings available'}

📝 **DataInspector's Detailed Understanding**:
${documentInsights.detailedReasoning ? documentInsights.detailedReasoning.substring(0, 300) + '...' : 'No detailed reasoning available'}
` : ''}

🤖 **LLM Regex Generation Response**:
${response}

✅ **Generated Targeted Patterns**: ${regexPatterns.length} context-aware regex patterns
${regexPatterns.map((pattern, i) => `${i + 1}. ${pattern}`).join('\n')}

🎯 **Context Preservation**: DataInspector's specific insights (e.g., "Tyler's personal speedruns") preserved and used for targeted pattern generation`;
      
      this.setReasoning(reasoningText);
      
    } catch (error) {
      console.error('❌ Failed to generate regex patterns:', error);
      throw new Error(`PatternGenerator failed: ${error instanceof Error ? error.message : 'Unknown error'}. NO FALLBACKS - LLM must generate proper patterns`);
    }
  }
  
  /**
   * 🎯 Parse regex patterns from LLM response (ZERO HARDCODING)
   */
  private parseRegexPatternsFromLLM(response: string): string[] {
    const patterns: string[] = [];
    
    try {
      // Look for REGEX_PATTERNS section
      const regexSection = response.match(/REGEX_PATTERNS?:\s*([\s\S]*?)(?:\n\n|REASONING|$)/i);
      if (regexSection) {
        const patternsText = regexSection[1];
        
        // Extract patterns that start with - /pattern/flags
        const patternMatches = patternsText.match(/[-*]\s*\/([^\/]+)\/([gimuy]*)/g);
        if (patternMatches) {
          console.log(`🔍 Found ${patternMatches.length} potential regex patterns in LLM response`);
          patternMatches.forEach(match => {
            const cleanMatch = match.replace(/^[-*]\s*/, ''); // Remove bullet point
            
            // 🚨 FILTER OUT USELESS GENERIC PATTERNS  
            const patternContent = cleanMatch.match(/\/([^\/]+)\//)?.[1] || '';
            console.log(`🧪 Evaluating pattern: ${cleanMatch} (content: "${patternContent}")`);
            
            if (this.isUselessPattern(patternContent)) {
              console.warn(`🚫 Filtering out useless pattern: ${cleanMatch}`);
              return;
            }
            
            console.log(`✅ Keeping useful pattern: ${cleanMatch}`);
            patterns.push(cleanMatch);
          });
        } else {
          console.warn(`⚠️ No regex patterns found in REGEX_PATTERNS section: "${patternsText.substring(0, 200)}..."`);
        }
      }
      
      // NO FALLBACKS: If no patterns found, LLM failed
      if (patterns.length === 0) {
        console.warn(`⚠️ No regex patterns found in REGEX_PATTERNS section`);
      }
      
      console.log(`🔍 Parsed ${patterns.length} useful regex patterns from LLM response (filtered out generic ones)`);
      return patterns;
      
    } catch (error) {
      console.warn('⚠️ Failed to parse regex patterns from LLM response:', error);
      return [];
    }
  }
  
  /**
   * Detect and filter out useless generic patterns like /pattern1/, /pattern2/, etc.
   * 🚨 FIX: Less aggressive filtering to allow useful patterns
   */
  private isUselessPattern(patternContent: string): boolean {
    const uselessPatterns = [
      /^pattern\d*$/i,         // /pattern/, /pattern1/, /pattern2/, etc. (but not patterns containing other text)
      /^\\w\+$/,              // /\w+/ - too generic (single word capture)
      /^[a-z]{1,3}$/i,        // Very short single words like /a/, /is/, /the/ - too generic
      /^\\d\+$/,              // /\d+/ - too generic (just numbers)
      /^\.+$/,                // Just dots
      /^\*$/,                 // Just asterisk
    ];
    
    // Only filter if it matches these exact useless patterns
    // Allow patterns that contain structure indicators
    const hasStructure = /[\\()\[\]{}|+*?.,\-:]/;  // Contains regex structure characters
    const hasLength = patternContent.length > 5;    // Reasonable length
    
    // If it has structure or reasonable length, likely useful
    if (hasStructure.test(patternContent) || hasLength) {
      return false;
    }
    
    return uselessPatterns.some(useless => useless.test(patternContent));
  }
  
  // 🚨 REMOVED: generateIntelligentFallbackPatterns - NO FALLBACKS ALLOWED
  // User feedback: "you also added stupid fallbacks to Patterngen"
  // System must use pure LLM intelligence or fail gracefully


}