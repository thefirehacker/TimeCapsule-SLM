/**
 * Research Agent Architecture
 * 
 * Provides specialized agents for different query intents.
 * Each agent knows how to:
 * 1. Expand queries for its domain
 * 2. Extract relevant information
 * 3. Format output appropriately
 */

import { QueryIntent } from '../QueryIntelligenceService';
import { SourceReference } from '@/components/DeepResearch/components/ResearchSteps';

/**
 * Base interface for all research agents
 */
export interface ResearchAgent {
  /**
   * Agent identifier
   */
  readonly name: string;
  
  /**
   * Supported intent types
   */
  readonly supportedIntents: string[];
  
  /**
   * Expand the original query into domain-specific variations
   */
  expandQueries(originalQuery: string, intent: QueryIntent): string[];
  
  /**
   * Extract relevant information from sources based on intent
   */
  extractInfo(sources: SourceReference[], query: string, intent: QueryIntent): ExtractedInfo[];
  
  /**
   * Format the extracted information for presentation
   */
  formatOutput(extractedInfo: ExtractedInfo[], query: string): string;
  
  /**
   * Get extraction patterns dynamically based on context
   */
  getExtractionPatterns(query: string, intent: QueryIntent): ExtractionPattern[];
}

/**
 * Extracted information structure
 */
export interface ExtractedInfo {
  text: string;
  value?: string | number;
  unit?: string;
  context: string;
  confidence: number;
  sourceIndex: number;
  metadata?: Record<string, any>;
}

/**
 * Dynamic extraction pattern
 */
export interface ExtractionPattern {
  name: string;
  pattern: RegExp;
  extractor: (match: RegExpExecArray) => ExtractedInfo | null;
}

/**
 * Base implementation with common functionality
 */
export abstract class BaseResearchAgent implements ResearchAgent {
  abstract readonly name: string;
  abstract readonly supportedIntents: string[];
  
  abstract expandQueries(originalQuery: string, intent: QueryIntent): string[];
  abstract getExtractionPatterns(query: string, intent: QueryIntent): ExtractionPattern[];
  
  /**
   * Common extraction logic
   */
  extractInfo(sources: SourceReference[], query: string, intent: QueryIntent): ExtractedInfo[] {
    const patterns = this.getExtractionPatterns(query, intent);
    const extractedInfo: ExtractedInfo[] = [];
    
    sources.forEach((source, sourceIndex) => {
      const content = source.excerpt || '';
      
      patterns.forEach(({ pattern, extractor, name }) => {
        pattern.lastIndex = 0; // Reset regex state
        
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const info = extractor(match);
          if (info) {
            extractedInfo.push({
              ...info,
              sourceIndex: sourceIndex + 1,
              metadata: { patternName: name }
            });
          }
        }
      });
    });
    
    // Sort by confidence and deduplicate
    return this.deduplicateAndSort(extractedInfo);
  }
  
  /**
   * Default formatting
   */
  formatOutput(extractedInfo: ExtractedInfo[], query: string): string {
    if (extractedInfo.length === 0) {
      return 'No relevant information found for your query.';
    }
    
    const formatted = extractedInfo
      .slice(0, 10) // Limit output
      .map((info, index) => 
        `${index + 1}. ${info.text} (Source ${info.sourceIndex}, ${Math.round(info.confidence * 100)}% confidence)`
      )
      .join('\n');
    
    return `Based on the sources:\n\n${formatted}`;
  }
  
  /**
   * Remove duplicates and sort by confidence
   */
  protected deduplicateAndSort(info: ExtractedInfo[]): ExtractedInfo[] {
    const seen = new Set<string>();
    const unique: ExtractedInfo[] = [];
    
    // Sort by confidence first
    info.sort((a, b) => b.confidence - a.confidence);
    
    // Deduplicate based on text similarity
    info.forEach(item => {
      const key = this.normalizeText(item.text);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    });
    
    return unique;
  }
  
  /**
   * Normalize text for deduplication
   */
  protected normalizeText(text: string): string {
    return text.toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s]/g, '')
      .trim();
  }
  
  /**
   * Extract context around a match
   */
  protected extractContext(content: string, matchIndex: number, matchLength: number, contextSize = 50): string {
    const start = Math.max(0, matchIndex - contextSize);
    const end = Math.min(content.length, matchIndex + matchLength + contextSize);
    
    let context = content.substring(start, end);
    
    // Add ellipsis if truncated
    if (start > 0) context = '...' + context;
    if (end < content.length) context = context + '...';
    
    return context.trim();
  }
}