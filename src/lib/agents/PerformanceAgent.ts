/**
 * Performance Agent
 * 
 * Specializes in extracting performance metrics, rankings, timing data,
 * and other quantitative information from sources.
 */

import { QueryIntent } from '../QueryIntelligenceService';
import { BaseResearchAgent, ExtractedInfo, ExtractionPattern } from './ResearchAgent';

export class PerformanceAgent extends BaseResearchAgent {
  readonly name = 'PerformanceAgent';
  readonly supportedIntents = ['performance', 'ranking', 'metrics', 'speed', 'time'];
  
  /**
   * Expand queries for performance-related searches
   */
  expandQueries(originalQuery: string, intent: QueryIntent): string[] {
    const queries = [originalQuery];
    
    // Extract key terms
    const hasTop = /\btop\s+\d+\b/i.test(originalQuery);
    const hasSpeed = /\b(speed|fast|quick|performance)\b/i.test(originalQuery);
    const hasRecord = /\b(record|best|fastest|quickest)\b/i.test(originalQuery);
    const hasRun = /\b(run|attempt|trial|experiment|test)\b/i.test(originalQuery);
    
    // Add variations based on detected terms
    if (hasTop || hasRun) {
      queries.push(
        originalQuery.replace(/\btop\s+\d+\b/gi, 'best'),
        originalQuery.replace(/\bruns?\b/gi, 'attempts'),
        originalQuery.replace(/\bruns?\b/gi, 'experiments'),
        originalQuery.replace(/\bruns?\b/gi, 'trials')
      );
    }
    
    if (hasSpeed || hasPerformance) {
      queries.push(
        originalQuery + ' timing',
        originalQuery + ' performance metrics',
        originalQuery + ' results',
        originalQuery + ' benchmarks'
      );
    }
    
    if (hasRecord) {
      queries.push(
        originalQuery + ' leaderboard',
        originalQuery + ' history',
        originalQuery + ' world record'
      );
    }
    
    // Remove duplicates
    return [...new Set(queries)];
  }
  
  /**
   * Get dynamic extraction patterns based on query context
   */
  getExtractionPatterns(query: string, intent: QueryIntent): ExtractionPattern[] {
    const patterns: ExtractionPattern[] = [];
    
    // Universal number + unit pattern
    patterns.push({
      name: 'number_with_unit',
      pattern: /(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?|days?|weeks?|months?|years?|ms|[kmgtKMGT]?[bB]\/s|tokens?\/s(?:ec)?|tok\/s)/gi,
      extractor: (match) => {
        const value = parseFloat(match[1]);
        const unit = match[2];
        const fullMatch = match[0];
        const context = this.extractContext(match.input || '', match.index || 0, fullMatch.length, 100);
        
        return {
          text: context,
          value,
          unit,
          context,
          confidence: 0.9,
          sourceIndex: 0
        };
      }
    });
    
    // Specific pattern for numbered entries with timing (e.g., "2.1 Architectural changes 7.51 hours")
    patterns.push({
      name: 'numbered_timing_entry',
      pattern: /(\d+\.?\d*)\s+([^0-9]+?)\s+(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/gi,
      extractor: (match) => {
        const section = match[1];
        const description = match[2].trim();
        const time = parseFloat(match[3]);
        const unit = match[4];
        
        return {
          text: `${section} ${description}: ${time} ${unit}`,
          value: time,
          unit,
          context: match[0],
          confidence: 0.95,
          sourceIndex: 0,
          metadata: { section, description }
        };
      }
    });
    
    // Performance metrics pattern
    patterns.push({
      name: 'performance_metric',
      pattern: /(\d+\.?\d*[kmKM]?)\s*(tokens?\/s(?:ec)?|tok\/s|[KMGT]?B\/s|ops\/s|req\/s)/gi,
      extractor: (match) => {
        const value = match[1];
        const unit = match[2];
        const context = this.extractContext(match.input || '', match.index || 0, match[0].length, 75);
        
        return {
          text: `Performance: ${value} ${unit}`,
          value,
          unit,
          context,
          confidence: 0.95,
          sourceIndex: 0
        };
      }
    });
    
    // Ranking/record pattern
    patterns.push({
      name: 'ranking_record',
      pattern: /(?:rank|record|#|position|place)[\s:]*(\d+)(?:\s*[:\-]\s*)?([^.!?\n]{0,100})/gi,
      extractor: (match) => {
        const rank = match[1];
        const description = match[2].trim();
        const context = this.extractContext(match.input || '', match.index || 0, match[0].length);
        
        return {
          text: `Rank ${rank}: ${description}`,
          value: parseInt(rank),
          context,
          confidence: 0.85,
          sourceIndex: 0
        };
      }
    });
    
    // Leaderboard/table pattern
    patterns.push({
      name: 'leaderboard_entry',
      pattern: /(?:^|\n)\s*(\d+)[\s.,;|]\s*([^,;|\n]+?)[\s,;|]+(\d+\.?\d*)\s*(hours?|minutes?|seconds?|ms)/gim,
      extractor: (match) => {
        const position = match[1];
        const description = match[2].trim();
        const time = match[3];
        const unit = match[4];
        
        return {
          text: `#${position} - ${description}: ${time} ${unit}`,
          value: parseFloat(time),
          unit,
          context: match[0],
          confidence: 0.9,
          sourceIndex: 0,
          metadata: { position: parseInt(position), description }
        };
      }
    });
    
    // Contextual timing (e.g., "after implementing X, the time is Y")
    patterns.push({
      name: 'contextual_timing',
      pattern: /(?:after|implementing|changes?|commits?|improves?|reduces?|now|new|results?)[^.!?\n]{0,50}?(\d+\.?\d*)\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)/gi,
      extractor: (match) => {
        const time = match[1];
        const unit = match[2];
        const context = this.extractContext(match.input || '', match.index || 0, match[0].length, 100);
        
        return {
          text: context,
          value: parseFloat(time),
          unit,
          context,
          confidence: 0.8,
          sourceIndex: 0
        };
      }
    });
    
    // If query asks for "top N", add specialized pattern
    const topNMatch = query.match(/\btop\s+(\d+)\b/i);
    if (topNMatch) {
      const n = parseInt(topNMatch[1]);
      patterns.push({
        name: 'numbered_list',
        pattern: /(?:^|\n)\s*(\d+)\.?\s+([^:\n]+?)[\s:]+([^.\n]+)/gm,
        extractor: (match) => {
          const num = parseInt(match[1]);
          if (num <= n) {
            return {
              text: match[0].trim(),
              value: num,
              context: match[0],
              confidence: 0.85,
              sourceIndex: 0,
              metadata: { listPosition: num }
            };
          }
          return null;
        }
      });
    }
    
    return patterns;
  }
  
  /**
   * Format output specifically for performance queries
   */
  formatOutput(extractedInfo: ExtractedInfo[], query: string): string {
    if (extractedInfo.length === 0) {
      return 'No performance data found in the sources.';
    }
    
    console.log(`🔍 PerformanceAgent formatOutput: ${extractedInfo.length} items to format`);
    console.log('First 3 items:', extractedInfo.slice(0, 3).map(info => ({
      text: info.text.substring(0, 100),
      value: info.value,
      unit: info.unit,
      pattern: info.metadata?.patternName
    })));
    
    // Check if this is a "top N" query
    const topNMatch = query.match(/\btop\s+(\d+)\b/i);
    if (topNMatch) {
      const n = parseInt(topNMatch[1]);
      
      // Group by timing values if available
      const timedEntries = extractedInfo
        .filter(info => info.value && info.unit && info.unit.match(/hours?|hrs?|minutes?|mins?|seconds?|secs?/i))
        .sort((a, b) => {
          // Convert to common unit (seconds) for sorting
          const aSeconds = this.convertToSeconds(a.value as number, a.unit as string);
          const bSeconds = this.convertToSeconds(b.value as number, b.unit as string);
          return aSeconds - bSeconds; // Ascending (fastest first)
        })
        .slice(0, n);
      
      console.log(`📊 Found ${timedEntries.length} timed entries for top ${n} query`);
      
      if (timedEntries.length > 0) {
        const formatted = timedEntries
          .map((entry, index) => 
            `${index + 1}. ${entry.text}`
          )
          .join('\n\n');
        
        return `Top ${Math.min(n, timedEntries.length)} results:\n\n${formatted}`;
      }
    }
    
    // Check if this is a record query
    if (/\b(record|best|fastest)\b/i.test(query)) {
      const records = extractedInfo
        .filter(info => info.confidence >= 0.8)
        .slice(0, 5);
      
      const formatted = records
        .map((record, index) => 
          `${index + 1}. ${record.text}`
        )
        .join('\n\n');
      
      return `Performance records found:\n\n${formatted}`;
    }
    
    // Default formatting
    return super.formatOutput(extractedInfo, query);
  }
  
  /**
   * Convert time values to seconds for comparison
   */
  private convertToSeconds(value: number, unit: string): number {
    const normalizedUnit = unit.toLowerCase();
    
    if (normalizedUnit.match(/hours?|hrs?/)) return value * 3600;
    if (normalizedUnit.match(/minutes?|mins?/)) return value * 60;
    if (normalizedUnit.match(/seconds?|secs?/)) return value;
    if (normalizedUnit.match(/ms/)) return value / 1000;
    if (normalizedUnit.match(/days?/)) return value * 86400;
    if (normalizedUnit.match(/weeks?/)) return value * 604800;
    
    return value; // Default to raw value
  }
}

// Export singleton instance
export const performanceAgent = new PerformanceAgent();