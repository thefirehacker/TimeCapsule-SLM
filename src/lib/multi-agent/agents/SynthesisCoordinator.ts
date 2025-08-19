/**
 * Synthesis Coordinator Agent
 * 
 * Orchestrates the multi-synthesis pipeline and combines outputs.
 * Final step that assembles the complete answer.
 * Optimized to stay under 600 tokens.
 */

import { BaseAgent } from '../interfaces/Agent';
import { ResearchContext } from '../interfaces/Context';
import { LLMFunction } from '../core/Orchestrator';
import { AgentProgressCallback } from '../interfaces/AgentProgress';

export class SynthesisCoordinator extends BaseAgent {
  readonly name = 'SynthesisCoordinator';
  readonly description = 'Orchestrates synthesis agents and assembles final report';
  
  private llm: LLMFunction;
  private progressCallback?: AgentProgressCallback;
  
  constructor(llm: LLMFunction, progressCallback?: AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    await this.progressCallback?.onAgentProgress?.(this.name, 10, 'Collecting inputs');
    // Use extracted data directly if no cleaned analysis available
    const extractedData = context.extractedData?.raw || [];
    const analysisData = context.analyzedData?.cleaned || [];
    
    // Determine data source intelligently
    const dataToUse = analysisData.length > 0 ? analysisData : extractedData;
    
    if (dataToUse.length === 0) {
      this.setReasoning('No data available for synthesis - both extraction and analysis are empty');
      await this.progressCallback?.onAgentProgress?.(this.name, 100, 'No data for synthesis');
      return context;
    }
    
    console.log(`🎯 SynthesisCoordinator: Using ${analysisData.length > 0 ? 'analyzed' : 'extracted'} data (${dataToUse.length} items)`);
    
    // 🔍 DEBUG: Log actual data structure to understand the issue
    console.log(`🔍 DEBUG: First data item structure:`, dataToUse[0] ? JSON.stringify(dataToUse[0], null, 2) : 'No items');
    console.log(`🔍 DEBUG: All data items count: ${dataToUse.length}`);
    dataToUse.forEach((item, i) => {
      console.log(`🔍 DEBUG Item ${i+1}:`, {
        keys: Object.keys(item),
        hasContent: !!item.content,
        hasValue: !!item.value,
        hasText: !!item.text,
        hasExtractedText: !!item.extractedText,
        hasBestItem: !!item.bestItem,
        sample: item.content || item.text || item.extractedText || 'unknown structure'
      });
    });
    
    await this.progressCallback?.onAgentProgress?.(this.name, 30, `Ranking ${dataToUse.length} items`);
    
    const itemCount = dataToUse.length;
    const sectionCount = Object.keys(context.reportSections || {}).length;
    const hasCitations = !!(context.citations && Array.isArray(context.citations.sources) && context.citations.sources.length > 0);
    
    console.log(`🎯 SynthesisCoordinator: Assembling final report from ${sectionCount} sections`);
    
    // Combine all components into final report  
    const finalReport = await this.assembleReport(context, dataToUse);
    await this.progressCallback?.onAgentProgress?.(this.name, 70, 'Assembling report');
    
    // Clean and validate
    const cleanedReport = this.cleanFinalAnswer(finalReport);
    
    // Store final answer
    context.synthesis.answer = cleanedReport;
    context.synthesis.confidence = this.calculateConfidence(context);
    await this.progressCallback?.onAgentProgress?.(this.name, 100, 'Synthesis complete');
    
    // Update reasoning
    this.setReasoning(`✅ Synthesis Coordination Complete:
- Data items processed: ${itemCount}
- Report sections: ${sectionCount}
- Citations included: ${hasCitations ? 'Yes' : 'No'}
- Final report: ${cleanedReport.length} characters
- Confidence: ${(context.synthesis.confidence * 100).toFixed(1)}%`);
    
    // Report completion
    await this.progressCallback?.onAgentComplete?.(this.name, {
      finalResponse: context.synthesis?.finalResponse || '',
      dataItemsUsed: itemCount,
      reportLength: cleanedReport.length,
      confidence: context.synthesis?.confidence || 0
    });
    
    return context;
  }
  
  private async assembleReport(context: ResearchContext, dataToUse: any[]): Promise<string> {
    const sections = context.reportSections || {};
    const summary = context.summary || {};
    const citations = context.citations || {};
    
    // If we have complete sections, just combine them
    if ((sections as any).executive && (sections as any).findings) {
      return this.combineExistingSections(sections as any, summary as any, citations as any);
    }
    
    // 🎯 NEW: Generate query-focused report with context awareness
    return this.generateQueryFocusedReport(context, dataToUse);
  }

  /**
   * 🎯 NEW: Generate query-focused synthesis with enhanced context awareness
   */
  private async generateQueryFocusedReport(context: ResearchContext, dataToUse: any[]): Promise<string> {
    console.log(`🎯 SynthesisCoordinator: Generating query-focused report for: "${context.query}"`);
    
    // Extract query context dynamically
    const queryIntent = this.parseQueryIntent(context.query);
    const queryKeyTerms = this.extractQueryKeyTerms(context.query);
    
    // Get document relevance from PlanningAgent
    const documentRelevance = context.sharedKnowledge.documentSectionRelevance || {};
    
    // Rank data items by query relevance
    const rankedData = this.rankDataByQueryRelevance(dataToUse, queryKeyTerms, queryIntent, documentRelevance);
    
    console.log(`🎯 Ranked ${rankedData.length} data items by query relevance`);
    
    // Build context-aware synthesis prompt
    const prompt = this.buildQueryAwareSynthesisPrompt(context, rankedData, queryIntent, queryKeyTerms);
    
    try {
      const response = await this.llm(prompt);
      return this.formatQueryFocusedResponse(response, context, queryIntent);
    } catch (error) {
      console.error('Query-focused synthesis failed:', error);
      return this.generateFallbackReport(context, rankedData);
    }
  }

  /**
   * 🎯 NEW: Rank data items by query relevance
   */
  private rankDataByQueryRelevance(dataItems: any[], queryKeyTerms: string[], queryIntent: string, documentRelevance: any): any[] {
    return dataItems
      .map(item => {
        const relevanceScore = this.calculateItemQueryRelevance(item, queryKeyTerms, queryIntent, documentRelevance);
        return { ...item, _queryRelevanceScore: relevanceScore };
      })
      .sort((a, b) => (b._queryRelevanceScore || 0) - (a._queryRelevanceScore || 0));
  }

  /**
   * 🎯 NEW: Calculate item relevance to query
   */
  private calculateItemQueryRelevance(item: any, queryKeyTerms: string[], queryIntent: string, documentRelevance: any): number {
    let score = 0;

    // Content relevance
    const content = (item.content || item.bestItem?.content || '').toLowerCase();
    const value = (item.value || item.bestItem?.value || '').toLowerCase();
    const combined = `${content} ${value}`;

    // Direct term matching
    queryKeyTerms.forEach(term => {
      if (combined.includes(term)) {
        score += 0.3;
      }
    });

    // Intent-based relevance
    if (queryIntent.includes('performance_ranking') || queryIntent.includes('methodology')) {
      if (combined.includes('method') || combined.includes('algorithm') || combined.includes('approach') ||
          combined.includes('performance') || combined.includes('result')) {
        score += 0.4;
      }
    }

    // Document source relevance
    const sourceDocument = item.sourceDocument || item.bestItem?.sourceDocument;
    if (sourceDocument && documentRelevance[sourceDocument]) {
      score += documentRelevance[sourceDocument].score * 0.3;
    }

    return Math.min(score, 1.0);
  }

  /**
   * 🎯 NEW: Build query-aware synthesis prompt
   */
  private buildQueryAwareSynthesisPrompt(context: ResearchContext, rankedData: any[], queryIntent: string, queryKeyTerms: string[]): string {
    const isExtractedData = !context.analyzedData?.categorized;
    const topRelevantItems = rankedData.slice(0, 10); // Focus on most relevant items
    
    const promptSections = [
      `You are synthesizing information to answer this specific query: "${context.query}"`,
      '',
      `QUERY ANALYSIS:`,
      `- Intent: ${queryIntent}`,
      `- Key terms: ${queryKeyTerms.join(', ')}`,
      '',
      `RELEVANT DATA (ranked by query relevance):`
    ];

    // Add ranked data with relevance scores for context
    topRelevantItems.forEach((item, i) => {
      // 🔧 FLEXIBLE DATA ACCESS: Handle different extracted data structures
      const content = this.extractItemContent(item);
      const value = this.extractItemValue(item);
      const source = this.extractItemSource(item);
      const relevanceScore = Math.round((item._queryRelevanceScore || 0) * 100);
      
      console.log(`🔍 DEBUG Prompt Item ${i+1}:`, { content: content.substring(0, 100), value, source, relevanceScore });
      
      promptSections.push(`${i+1}. "${content}"${value ? ` - ${value}` : ''} (from ${source}, relevance: ${relevanceScore}%)`);
    });

    promptSections.push('');
    
    // Add document context from PlanningAgent if available
    const documentRelevance = context.sharedKnowledge.documentSectionRelevance || {};
    if (Object.keys(documentRelevance).length > 0) {
      promptSections.push('DOCUMENT RELEVANCE CONTEXT:');
      Object.entries(documentRelevance).forEach(([docId, info]: [string, any]) => {
        promptSections.push(`- Document ${docId}: ${Math.round(info.score * 100)}% relevant`);
      });
      promptSections.push('');
    }

    promptSections.push(
      'SYNTHESIS REQUIREMENTS:',
      `1. Answer the query "${context.query}" directly and specifically`,
      '2. Use ALL highest-relevance items listed above in your response',
      '3. Provide comprehensive analysis with detailed explanations',
      '4. Include specific evidence and examples from the extracted data',
      '5. Structure the response with clear sections and thorough coverage',
      '6. Ground every claim in the specific data provided above',
      '7. If data seems insufficient, explain what is available and what is missing',
      '',
      'Generate a comprehensive, detailed response that fully addresses the query using all available data:'
    );

    return promptSections.join('\n');
  }

  /**
   * 🎯 NEW: Format query-focused response
   */
  private formatQueryFocusedResponse(response: string, context: ResearchContext, queryIntent: string): string {
    // Clean up LLM response
    let formatted = response
      .replace(/<think>[\s\S]*?<\/think>/g, '')
      .replace(/<bos>|<\/bos>/g, '')
      .trim();

    // Add query-specific formatting based on intent
    if (queryIntent.includes('performance_ranking') && !formatted.includes('##') && !formatted.includes('**')) {
      // Add structure for ranking queries if LLM didn't provide it
      if (formatted.includes('1.') || formatted.includes('First') || formatted.includes('best')) {
        formatted = `## Answer to: "${context.query}"\n\n${formatted}`;
      }
    }

    // Add source context if helpful
    const sourceCount = context.analyzedData?.cleaned?.length || context.extractedData?.raw?.length || 0;
    if (sourceCount > 0 && !formatted.includes('Source') && !formatted.includes('based on')) {
      formatted += `\n\n---\n*Analysis based on ${sourceCount} relevant data points from the document collection.*`;
    }

    return formatted;
  }

  /**
   * 🔧 FLEXIBLE DATA ACCESS: Extract content from different data structures
   */
  private extractItemContent(item: any): string {
    // Try different possible content fields based on actual data structures
    return item.content || 
           item.text || 
           item.extractedText || 
           item.description ||
           item.bestItem?.content || 
           item.bestItem?.text ||
           item.match ||
           item.pattern ||
           JSON.stringify(item).substring(0, 200) || 
           'N/A';
  }

  /**
   * 🔧 FLEXIBLE DATA ACCESS: Extract value from different data structures
   */
  private extractItemValue(item: any): string {
    return item.value || 
           item.bestItem?.value || 
           item.extractedValue ||
           item.numericValue ||
           item.metadata?.value ||
           '';
  }

  /**
   * 🔧 FLEXIBLE DATA ACCESS: Extract source from different data structures
   */
  private extractItemSource(item: any): string {
    // Debug logging to trace source attribution issue
    console.log(`🔍 DEBUG Source extraction for item:`, {
      sourceDocument: item.sourceDocument,
      'bestItem?.sourceDocument': item.bestItem?.sourceDocument,
      source: item.source,
      documentId: item.documentId,
      chunkId: item.chunkId,
      'metadata?.source': item.metadata?.source,
      sourceChunkId: item.sourceChunkId,
      keys: Object.keys(item)
    });
    
    return item.sourceDocument || 
           item.bestItem?.sourceDocument || 
           item.source ||
           item.documentId ||
           item.chunkId ||
           item.metadata?.source ||
           'unknown document';
  }

  /**
   * 🎯 NEW: Generate fallback report with query focus
   */
  private generateFallbackReport(context: ResearchContext, rankedData: any[]): string {
    if (rankedData.length === 0) {
      return this.generateEmptyReport(context);
    }

    const queryIntent = this.parseQueryIntent(context.query);
    const topItems = rankedData.slice(0, 8);

    let report = `## Response to: "${context.query}"\n\n`;
    
    if (queryIntent.includes('performance_ranking') || queryIntent.includes('methodology')) {
      report += 'Based on the available data, here are the key findings:\n\n';
    } else {
      report += 'Here is the relevant information found:\n\n';
    }

    topItems.forEach((item, i) => {
      const content = item.content || item.bestItem?.content || '';
      const value = item.value || item.bestItem?.value || '';
      const source = item.sourceDocument || item.bestItem?.sourceDocument || '';
      
      report += `${i+1}. **${content}**`;
      if (value && value !== content) {
        report += ` - ${value}`;
      }
      if (source) {
        report += ` (from ${source})`;
      }
      report += '\n';
    });

    return report;
  }
  
  private combineExistingSections(sections: any, summary: any, citations: any): string {
    const parts: string[] = [];
    
    // Add executive summary if available
    if (summary.executive) {
      parts.push(`## Executive Summary\n\n${summary.executive}\n`);
    }
    
    // Add main sections
    if ((sections as any).executive) {
      parts.push(`## Key Information\n\n${(sections as any).executive}\n`);
    }
    
    if ((sections as any).findings) {
      parts.push(`## Detailed Findings\n\n${(sections as any).findings}\n`);
    }
    
    if ((sections as any).details) {
      parts.push(`## Additional Details\n\n${(sections as any).details}\n`);
    }
    
    // Add citations
    if (Array.isArray((citations as any).sources) && (citations as any).sources.length > 0) {
      parts.push(`## Sources\n\n${(citations as any).sources.map((s: string) => `- ${s}`).join('\n')}`);
    }
    
    return parts.join('\n');
  }
  
  private formatResponse(response: string, context: ResearchContext): string {
    // Clean up LLM response
    let formatted = response
      .replace(/<think>[\s\S]*?<\/think>/g, '')
      .replace(/<bos>|<\/bos>/g, '')
      .trim();
    
    // Add source attribution if needed
    const sourceCount = context.ragResults?.chunks?.length || 0;
    if (sourceCount > 0 && !formatted.includes('Source')) {
      formatted += `\n\n---\n*Based on analysis of ${sourceCount} document chunks*`;
    }
    
    return formatted;
  }
  
  private cleanFinalAnswer(answer: string): string {
    return answer
      .replace(/<think>[\s\S]*?<\/think>/g, '')
      .replace(/<bos>|<\/bos>/g, '')
      .replace(/\*\*\*+/g, '---')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
  
  private calculateConfidence(context: ResearchContext): number {
    const hasData = (context.analyzedData?.cleaned?.length || 0) > 0;
    const hasSections = Object.keys(context.reportSections || {}).length > 0;
    const hasCitations = (context.citations?.sources?.length || 0) > 0;
    
    let confidence = 0.5; // Base confidence
    if (hasData) confidence += 0.2;
    if (hasSections) confidence += 0.2;
    if (hasCitations) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }
  
  private fallbackReport(context: ResearchContext): string {
    const items = context.analyzedData?.categorized || [];
    
    if (items.length === 0) {
      return this.generateEmptyReport(context);
    }
    
    // Create simple list-based report
    const report = [`Based on the available data:\n`];
    
    items.slice(0, 10).forEach((item, i) => {
      report.push(`${i+1}. ${item.bestItem.content}`);
      if (item.bestItem.value) {
        report.push(`   Value: ${item.bestItem.value} ${item.bestItem.unit || ''}`);
      }
    });
    
    return report.join('\n');
  }
  
  private generateEmptyReport(context: ResearchContext): string {
    return `I couldn't find specific information to answer your query: "${context.query}"

The data extraction and analysis process completed but didn't yield relevant results. This could be because:
- The documents don't contain the requested information
- The query needs to be more specific
- The extraction patterns need adjustment

Please try rephrasing your query or providing additional context.`;
  }

  /**
   * 🎯 NEW: Extract key terms from query (consistent with other agents)
   */
  private extractQueryKeyTerms(query: string): string[] {
    const stopWords = ['the', 'best', 'give', 'what', 'how', 'can', 'you', 'tell', 'about', 'and', 'for', 'from', 'with'];
    
    return query.toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 2 && !stopWords.includes(term))
      .map(term => term.replace(/[^\w]/g, ''))
      .filter(term => term.length > 2);
  }

  /**
   * 🎯 NEW: Parse query intent (consistent with other agents)
   */
  private parseQueryIntent(query: string): string {
    const q = query.toLowerCase();
    
    if (q.includes('best') || q.includes('top')) return 'performance_ranking';
    if (q.includes('method') || q.includes('approach')) return 'methodology';
    if (q.includes('how') || q.includes('what')) return 'explanation';
    if (q.includes('compare')) return 'comparison';
    if (q.includes('performance') || q.includes('result')) return 'performance';
    
    return 'general_information';
  }
}