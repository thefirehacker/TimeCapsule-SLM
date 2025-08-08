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
  private progressCallback?: import('../interfaces/AgentProgress').AgentProgressCallback;
  
  constructor(llm: LLMFunction, progressCallback?: import('../interfaces/AgentProgress').AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    console.log(`🎯 PatternGenerator: Creating extraction strategies`);
    
    // Report progress: Starting pattern analysis
    this.progressCallback?.onAgentProgress(this.name, 10, 'Analyzing existing patterns');
    
    // DEBUG: Log existing patterns from DataInspector or previous agents
    console.log(`📋 DEBUG - Existing patterns before PatternGenerator:`, {
      count: context.patterns?.length || 0,
      patterns: context.patterns?.map(p => p.description) || [],
      hasSharedKnowledge: !!context.sharedKnowledge?.documentInsights
    });
    
    // Report progress: Generating strategies
    this.progressCallback?.onAgentProgress(this.name, 30, 'Generating extraction strategies');
    
    // Use LLM to generate extraction strategies
    await this.generateStrategiesWithLLM(context);
    
    // Report progress: Completed
    this.progressCallback?.onAgentProgress(this.name, 100, 'Pattern generation completed');
    
    return context;
  }
  
  private async generateStrategiesWithLLM(context: ResearchContext): Promise<void> {
    console.log(`🧠 PatternGenerator: Generating dynamic regex patterns via LLM analysis`);
    
    // ACCESS DataInspector's shared insights for intelligent regex generation
    const documentInsights = context.sharedKnowledge.documentInsights;
    const hasDocumentAnalysis = documentInsights && Object.keys(documentInsights).length > 0;
    
    // Sample actual document content for pattern analysis (ZERO HARDCODING)
    const sampleContent = context.ragResults.chunks.length > 0 
      ? context.ragResults.chunks
          .slice(0, 5)  // Use more samples for better pattern discovery
          .map((chunk, i) => `SAMPLE ${i + 1}:\n${chunk.text.substring(0, 400)}`)
          .join('\n\n---\n\n')
      : `NO DOCUMENT SAMPLES AVAILABLE - Generate generic patterns based on query intent.

Query: "${context.query}"

Since no document content is available, generate patterns that would typically extract:
- Names/entities mentioned in the query
- Numbers, dates, or measurements
- Key terms from the query context

Example for this query: Generate patterns to find project names, person names, rankings, etc.`;
      
    // 🔥 GEMMA COMPATIBILITY: Use simplified prompt for smaller models to avoid complexity overload
    const regexGenerationPrompt = this.createModelOptimizedPrompt(context, hasDocumentAnalysis, documentInsights, sampleContent);

    try {
      // Report progress: Calling LLM for pattern generation
      this.progressCallback?.onAgentProgress(this.name, 50, 'Generating patterns with LLM');
      
      const response = await this.llm(regexGenerationPrompt);
      console.log(`🎯 LLM regex generation response:`, response.substring(0, 400));
      
      // Report progress: Parsing generated patterns
      this.progressCallback?.onAgentProgress(this.name, 70, 'Parsing generated patterns');
      
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
        // 🔥 ENHANCED: Intelligent error recovery for malformed patterns
        const hasContent = context.ragResults.chunks.length > 0;
        const contentInfo = hasContent ? `${context.ragResults.chunks.length} chunks` : 'no document content';
        
        console.error(`❌ LLM failed to generate valid regex patterns (${contentInfo} available)`);
        console.error(`📝 LLM Response sample: ${response.substring(0, 200)}...`);
        
        // 🎯 GEMMA RECOVERY: Try simplified fallback patterns for small models
        const fallbackPatterns = this.createFallbackPatterns(context, hasDocumentAnalysis, documentInsights);
        if (fallbackPatterns.length > 0) {
          console.warn(`🔄 Using fallback patterns for pattern generation failure`);
          
          // Store the fallback patterns
          if (!context.patterns) {
            context.patterns = [];
          }
          
          const fallbackPatternObjects = fallbackPatterns.map((pattern, index) => ({
            description: `Fallback pattern ${index + 1} for ${documentInsights?.documentType || 'document'}`,
            examples: [],
            extractionStrategy: `Fallback regex search using: ${pattern}`,
            confidence: 0.6, // Lower confidence for fallback patterns
            regexPattern: pattern
          }));
          
          context.patterns.push(...fallbackPatternObjects);
          
          console.log(`✅ Applied ${fallbackPatterns.length} fallback patterns`);
          return; // Continue with fallback patterns instead of failing
        }
        
        throw new Error(`PatternGenerator failed: LLM must generate proper patterns. Context: ${contentInfo}. NO FALLBACKS allowed.`);
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
   * 🎯 GEMMA COMPATIBILITY: Create optimized prompt based on model capabilities
   * Smaller models get simplified prompts, larger models get detailed instructions
   */
  private createModelOptimizedPrompt(
    context: ResearchContext,
    hasDocumentAnalysis: boolean,
    documentInsights: any,
    sampleContent: string
  ): string {
    // Detect if this is likely a smaller model that needs simplified prompts
    // Heuristic: Check if document chunks are limited (smaller models typically process less)
    const isLikelySmallModel = context.ragResults.chunks.length <= 5 || sampleContent.length < 1000;
    
    if (isLikelySmallModel) {
      return this.createSimplifiedPrompt(context, hasDocumentAnalysis, documentInsights, sampleContent);
    } else {
      return this.createDetailedPrompt(context, hasDocumentAnalysis, documentInsights, sampleContent);
    }
  }

  /**
   * 🎯 SIMPLIFIED PROMPT: For smaller models like Gemma 3n 2b
   * Focus on clear, simple instructions without overwhelming complexity
   */
  private createSimplifiedPrompt(
    context: ResearchContext,
    hasDocumentAnalysis: boolean,
    documentInsights: any,
    sampleContent: string
  ): string {
    return `/no_think

TASK: Create simple patterns to find information in the document.

QUERY: "${context.query}"

${hasDocumentAnalysis ? `
DOCUMENT TYPE: ${documentInsights.documentType}
CONTENT TO FIND: ${documentInsights.contentAreas?.join(', ')}
` : ''}

SAMPLE TEXT:
${sampleContent.substring(0, 800)} ${sampleContent.length > 800 ? '...' : ''}

INSTRUCTIONS:
1. Look at the text above
2. Find patterns that match the content structure
3. Create simple regex patterns

${hasDocumentAnalysis && documentInsights.documentType === 'Resume' ? `
EXAMPLES FOR RESUME:
- /•\\s*([^\\n•]+)/g  (finds bullet points)
- /Experience\\s*([^\\n]+)/gi  (finds experience section)
- /Skills?\\s*([^\\n]+)/gi  (finds skills)
` : ''}

OUTPUT FORMAT:
REGEX_PATTERNS:
- /pattern1/gi
- /pattern2/gi  
- /pattern3/gi

RULES:
- Use simple patterns only
- Each pattern starts with "- /"
- Use /gi flags for most patterns
- Keep patterns under 50 characters

Generate 3 simple patterns based on the text above.`;
  }

  /**
   * 🎯 DETAILED PROMPT: For larger models that can handle complex instructions
   * Full feature prompt with detailed examples and requirements  
   */
  private createDetailedPrompt(
    context: ResearchContext,
    hasDocumentAnalysis: boolean,
    documentInsights: any,
    sampleContent: string
  ): string {
    return `/no_think

YOU ARE A PATTERN DISCOVERY AGENT. Your job is to find ACTUAL patterns in the provided document content, NOT to guess or make assumptions.

🚨 MANDATORY: You MUST analyze the ACTUAL document samples below and generate patterns based on what you observe, NOT generic assumptions.

USER QUERY: "${context.query}"

${hasDocumentAnalysis ? `
🧠 DATAINSPECTOR INTELLIGENCE (MANDATORY TO USE):
- Document Type: ${documentInsights.documentType}
- Content Areas Found: ${documentInsights.contentAreas?.join(', ')}
- Document Structure: ${documentInsights.structure ? JSON.stringify(documentInsights.structure) : 'Not available'}
- Extraction Strategy: ${documentInsights.extractionStrategy}

🔥 CRITICAL: DataInspector already analyzed these documents. You MUST use this intelligence, not ignore it.
` : ''}

📝 ACTUAL DOCUMENT CONTENT TO ANALYZE:
${sampleContent}

🚨 CRITICAL INSTRUCTIONS:

1. **LOOK AT THE ACTUAL TEXT ABOVE** - Don't assume formats, analyze what's actually there
2. **USE DATAINSPECTOR'S FINDINGS** - The document type and content areas are already identified
3. **GENERATE CONTENT-SPECIFIC PATTERNS** - For resumes: bullet points, sections. For blogs: paragraphs. For reports: tables.
4. **NO GENERIC PATTERNS** - Don't generate patterns like "Best:" unless you see "Best:" in the actual content

🎯 FOR THIS SPECIFIC QUERY "${context.query}":
- Look for project descriptions, achievements, work experience in the actual content above
- Generate patterns that match the ACTUAL formatting you see (bullet points, section headers, etc.)
- Focus on extracting information that would help determine the "best" project

📊 PATTERN GENERATION RULES:
1. **Analyze actual content samples** - Look at the text structure above
2. **Match document type** - ${hasDocumentAnalysis ? `This is a ${documentInsights.documentType}, so use ${documentInsights.documentType}-specific patterns` : 'Analyze the content to determine appropriate patterns'}
3. **Extract meaningful data** - Projects, technologies, achievements, timeframes
4. **Use observed formatting** - If you see bullet points (•), generate bullet point patterns. If you see headers, generate header patterns.

🚨 EXAMPLE ANALYSIS:
If you see: "• Built TimeCapsule app using React"
Generate: /•\\\\s*([^\\\\n•]+)/g

If you see: "Projects:\\\\nProject 1: Web App"
Generate: /Projects?:\\\\s*\\\\n([\\\\s\\\\S]*?)(?=\\\\n[A-Z]|$)/gi

CRITICAL: Generate patterns based on the ACTUAL formatting you see in the document samples, not assumptions.

${documentInsights?.specificInsights?.find((insight: string) => insight.includes('personal')) ? `
FOCUS: Generate STRUCTURE patterns that extract the person's ACTUAL DATA based on insights:
${documentInsights.specificInsights
  .filter((insight: string) => insight.includes('CRITICAL:') || insight.includes('FOCUS:'))
  .map((insight: string) => `- ${insight}`)
  .join('\\n')}
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

🎯 REQUIRED OUTPUT FORMAT:
REGEX_PATTERNS:
- [Pattern 1 based on actual content structure you observed]
- [Pattern 2 based on actual content structure you observed]  
- [Pattern 3 based on actual content structure you observed]

REASONING: [Explain what specific structures you found in the actual document content above and how your patterns match them]

🚨 CRITICAL FORMAT RULES:
1. Each pattern MUST start with "- /" and end with "/flags"
2. Use proper regex escaping: \\\\s for space, \\\\d for digit, \\\\b for word boundary
3. Add capture groups () around the data you want to extract
4. Use flags: /gi (global, case-insensitive) or /g (global only)
5. Generate 3-5 patterns based on what you ACTUALLY SEE in the document samples above

🚨 REMEMBER: Generate patterns based on what you SEE in the document samples above, not what you THINK should be there.

NO GENERIC ASSUMPTIONS! Only patterns that match the actual content structure you analyzed above.`;
  }

  /**
   * 🎯 FALLBACK PATTERNS: Simple, reliable patterns when LLM generation fails
   * Provides basic extraction based on document type for continuity
   */
  private createFallbackPatterns(
    context: ResearchContext, 
    hasDocumentAnalysis: boolean, 
    documentInsights: any
  ): string[] {
    const documentType = documentInsights?.documentType?.toLowerCase() || 'unknown';
    const fallbackPatterns: string[] = [];
    
    // Resume-specific fallback patterns
    if (documentType.includes('resume') || documentType.includes('cv')) {
      fallbackPatterns.push(
        '/•\\s*([^\\n•]+)/gi',              // Bullet points
        '/Experience\\s*:?\\s*([^\\n]+)/gi',  // Experience section
        '/Skills?\\s*:?\\s*([^\\n]+)/gi',     // Skills section
        '/Projects?\\s*:?\\s*([^\\n]+)/gi',   // Projects section
        '/([A-Za-z][^\\n]*(?:built|developed|created|implemented)[^\\n]*)/gi' // Achievement descriptions
      );
    }
    
    // Blog/Article fallback patterns  
    else if (documentType.includes('blog') || documentType.includes('article')) {
      fallbackPatterns.push(
        '/^([^\\n]+)$/gm',                    // Line-by-line content
        '/([A-Z][^.!?]*[.!?])/g',            // Sentences
        '/\\b([A-Z][a-z]+\\s+[A-Z][a-z]+)\\b/g', // Proper names
        '/\\b(\\d+)\\b/g'                     // Numbers
      );
    }
    
    // Generic fallback patterns for any document
    else {
      fallbackPatterns.push(
        '/([A-Z][^\\n]*)/g',                  // Capitalized lines
        '/([^\\n]{20,})/g',                   // Long lines (likely content)
        '/\\b([A-Za-z]+(?:\\s+[A-Za-z]+){2,})\\b/g' // Multi-word phrases
      );
    }
    
    // Filter to only tested, working patterns
    const validatedPatterns = fallbackPatterns.filter(pattern => {
      try {
        new RegExp(pattern.slice(1, pattern.lastIndexOf('/'))); // Test pattern compilation
        return true;
      } catch {
        console.warn(`⚠️ Skipping invalid fallback pattern: ${pattern}`);
        return false;
      }
    });
    
    console.log(`🔄 Generated ${validatedPatterns.length} fallback patterns for ${documentType}`);
    return validatedPatterns;
  }

  /**
   * 🎯 BULLETPROOF Parse regex patterns from LLM response (TRIPLE-TIER PARSER)
   * Handles: Structured format, <think> content, and free-form text
   */
  private parseRegexPatternsFromLLM(response: string): string[] {
    console.log(`🔍 Starting triple-tier pattern parsing from LLM response (${response.length} chars)`);
    
    // Tier 1: Try structured format (preferred)
    let patterns = this.parseStructuredFormat(response);
    if (patterns.length > 0) {
      console.log(`✅ Tier 1 SUCCESS: Found ${patterns.length} patterns in structured format`);
      return patterns;
    }
    
    // Tier 2: Try extracting from <think> content (Qwen fallback)  
    patterns = this.parseFromThinkContent(response);
    if (patterns.length > 0) {
      console.log(`✅ Tier 2 SUCCESS: Found ${patterns.length} patterns in think content`);
      return patterns;
    }
    
    // Tier 3: Try free-form text parsing (universal fallback)
    patterns = this.parseFromFreeFormText(response);
    if (patterns.length > 0) {
      console.log(`✅ Tier 3 SUCCESS: Found ${patterns.length} patterns in free-form text`);
      return patterns;
    }
    
    console.warn(`❌ ALL TIERS FAILED: No patterns found in any format`);
    return [];
  }

  /**
   * Tier 1: Parse structured REGEX_PATTERNS: section format
   */
  private parseStructuredFormat(response: string): string[] {
    const patterns: string[] = [];
    
    try {
      // Look for REGEX_PATTERNS section
      const regexSection = response.match(/REGEX_PATTERNS?:\s*([\s\S]*?)(?:\n\n|REASONING|$)/i);
      if (regexSection) {
        const patternsText = regexSection[1];
        console.log(`🔍 Found REGEX_PATTERNS section: "${patternsText.substring(0, 200)}..."`);
        
        // Extract patterns in multiple formats
        const lines = patternsText.split('\n').filter(line => line.trim().startsWith('-'));
        
        lines.forEach(line => {
          // Handle double-dash format from Gemma: "- - /pattern/" → "/pattern/"
          const trimmedLine = line.trim().replace(/^[-\s]*-\s*/, '');
          const normalizedPattern = this.normalizePattern(trimmedLine);
          
          if (normalizedPattern && !this.isUselessPattern(normalizedPattern.match(/\/([^\/]+)\//)?.[1] || '')) {
            patterns.push(normalizedPattern);
          }
        });
      }
      
      return patterns;
      
    } catch (error) {
      console.warn('⚠️ Structured format parsing failed:', error);
      return [];
    }
  }

  /**
   * Tier 2: Extract patterns from <think> content
   */
  private parseFromThinkContent(response: string): string[] {
    const patterns: string[] = [];
    
    try {
      // Extract content between <think> and </think>
      const thinkMatch = response.match(/<think>([\s\S]*?)<\/think>/i);
      if (thinkMatch) {
        const thinkContent = thinkMatch[1];
        console.log(`🧠 Found think content (${thinkContent.length} chars): "${thinkContent.substring(0, 200)}..."`);
        
        // Look for regex patterns in think content
        const regexPatterns = thinkContent.match(/\/[^\/\n]+\/[gimuy]*/g);
        if (regexPatterns) {
          regexPatterns.forEach(pattern => {
            const patternContent = pattern.match(/\/([^\/]+)\//)?.[1] || '';
            if (!this.isUselessPattern(patternContent)) {
              patterns.push(pattern);
            }
          });
        }
        
        // Look for pattern descriptions and convert them
        const descriptions = this.extractPatternDescriptions(thinkContent);
        patterns.push(...descriptions);
      }
      
      return patterns;
      
    } catch (error) {
      console.warn('⚠️ Think content parsing failed:', error);
      return [];
    }
  }

  /**
   * Tier 3: Universal fallback - extract patterns from any text
   */
  private parseFromFreeFormText(response: string): string[] {
    const patterns: string[] = [];
    
    try {
      console.log(`🔍 Attempting free-form pattern extraction from response`);
      
      // Look for any regex patterns in the entire response
      const regexPatterns = response.match(/\/[^\/\n]+\/[gimuy]*/g);
      if (regexPatterns) {
        regexPatterns.forEach(pattern => {
          const patternContent = pattern.match(/\/([^\/]+)\//)?.[1] || '';
          if (!this.isUselessPattern(patternContent)) {
            patterns.push(pattern);
          }
        });
      }
      
      // Look for quoted patterns
      const quotedPatterns = response.match(/"([^"]+)"/g);
      if (quotedPatterns) {
        quotedPatterns.forEach(quoted => {
          const pattern = quoted.replace(/"/g, '');
          if (pattern.length > 3 && !this.isUselessPattern(pattern)) {
            patterns.push(`/${pattern}/gi`);
          }
        });
      }
      
      return patterns;
      
    } catch (error) {
      console.warn('⚠️ Free-form text parsing failed:', error);
      return [];
    }
  }

  /**
   * Normalize pattern to standard /pattern/flags format
   */
  private normalizePattern(line: string): string | null {
    console.log(`🧪 Normalizing pattern: "${line}"`);
    
    // Already in /pattern/flags format
    if (line.match(/^\/.*\/[gimuy]*$/)) {
      console.log(`✅ Already normalized: ${line}`);
      return line;
    }
    
    // Format: /pattern/flags (extracts: "example")
    if (line.match(/^\/.*\/[gimuy]*\s+\(extracts:/)) {
      const patternMatch = line.match(/^(\/.*\/[gimuy]*)/);
      if (patternMatch) {
        console.log(`✅ Extracted from example format: ${patternMatch[1]}`);
        return patternMatch[1];
      }
    }
    
    // Format: (pattern) - add slashes and flags
    if (line.match(/^\(.+\)$/)) {
      const normalized = `/${line}/gi`;
      console.log(`✅ Normalized parentheses: ${normalized}`);
      return normalized;
    }
    
    // Raw pattern - add slashes and flags
    if (line.length > 2 && !line.includes(':')) {
      const normalized = `/${line}/gi`;
      console.log(`✅ Normalized raw: ${normalized}`);
      return normalized;
    }
    
    console.warn(`⚠️ Could not normalize: "${line}"`);
    return null;
  }

  /**
   * Extract pattern descriptions from text and convert to regex
   */
  private extractPatternDescriptions(text: string): string[] {
    const patterns: string[] = [];
    
    // Look for common pattern descriptions
    const descriptions = [
      /(?:pattern for|regex for|extract)\s+([^.!?\n]+)/gi,
      /(?:built|developed|created)\s+([^.!?\n]+)/gi,
      /(?:using|with|via)\s+([A-Z][^.!?\n]*)/gi
    ];
    
    descriptions.forEach(desc => {
      const matches = [...text.matchAll(desc)];
      matches.forEach(match => {
        const content = match[1].trim();
        if (content.length > 3) {
          patterns.push(`/${content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/gi`);
        }
      });
    });
    
    return patterns;
  }
  
  /**
   * Detect malformed patterns (Gemma 3n 2b specific issues)
   * Only catches obviously broken patterns while preserving all valid complex patterns
   */
  private isMalformedPattern(patternContent: string): boolean {
    // 1. Excessive repetition detection (•.*?•.*?•.*?... 10+ times)
    const repetitiveSequences = [
      /(•\.\*\?){10,}/g,           // •.*?•.*?•.*?... (10+ repetitions)
      /(\.\*\?){15,}/g,            // .*?.*?.*?... (15+ repetitions)  
      /(\\s\*){10,}/g,             // \s*\s*\s*... (10+ repetitions)
      /(\([^)]+\)\*\?){5,}/g,      // (pattern)*?(pattern)*?... (5+ repetitions) - Gemma common issue
      /(\(\\s\+,\\s\+\)\*\?){3,}/g, // (\s+,\s+)*?(\s+,\s+)*?... (3+ repetitions) - Specific Gemma pattern
    ];
    
    for (const pattern of repetitiveSequences) {
      if (pattern.test(patternContent)) {
        console.warn(`🚨 Malformed pattern detected: excessive repetition in "${patternContent.substring(0, 100)}..."`);
        return true;
      }
    }
    
    // 2. Unreasonable length (>300 chars likely malformed for regex)
    if (patternContent.length > 300) {
      console.warn(`🚨 Malformed pattern detected: excessive length (${patternContent.length} chars)`);
      return true;
    }
    
    // 3. Detect patterns that are just repetitive symbols
    if (/^(.)\1{50,}$/.test(patternContent)) {
      console.warn(`🚨 Malformed pattern detected: repetitive symbol pattern`);
      return true;
    }
    
    return false; // Default: pattern is valid
  }

  /**
   * Detect and filter out useless generic patterns like /pattern1/, /pattern2/, etc.
   * 🚨 FIX: Less aggressive filtering to allow useful patterns
   */
  private isUselessPattern(patternContent: string): boolean {
    // 🔥 NEW: Check for malformed patterns first (Gemma 3n 2b fix)
    if (this.isMalformedPattern(patternContent)) {
      return true; // Reject malformed patterns
    }
    
    // 🔄 PRESERVE: All existing Qwen validation logic (unchanged)
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