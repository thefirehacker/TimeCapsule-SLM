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

export class SynthesisCoordinator extends BaseAgent {
  readonly name = 'SynthesisCoordinator';
  readonly description = 'Orchestrates synthesis agents and assembles final report';
  
  private llm: LLMFunction;
  
  constructor(llm: LLMFunction) {
    super();
    this.llm = llm;
  }
  
  async process(context: ResearchContext): Promise<ResearchContext> {
    // Use extracted data directly if no cleaned analysis available
    const extractedData = context.extractedData?.raw || [];
    const analysisData = context.analyzedData?.cleaned || [];
    
    // Determine data source intelligently
    const dataToUse = analysisData.length > 0 ? analysisData : extractedData;
    
    if (dataToUse.length === 0) {
      this.setReasoning('No data available for synthesis - both extraction and analysis are empty');
      return context;
    }
    
    console.log(`🎯 SynthesisCoordinator: Using ${analysisData.length > 0 ? 'analyzed' : 'extracted'} data (${dataToUse.length} items)`);
    
    const itemCount = dataToUse.length;
    const sectionCount = Object.keys(context.reportSections || {}).length;
    const hasCitations = context.citations?.sources?.length > 0;
    
    console.log(`🎯 SynthesisCoordinator: Assembling final report from ${sectionCount} sections`);
    
    // Combine all components into final report  
    const finalReport = await this.assembleReport(context, dataToUse);
    
    // Clean and validate
    const cleanedReport = this.cleanFinalAnswer(finalReport);
    
    // Store final answer
    context.synthesis.answer = cleanedReport;
    context.synthesis.confidence = this.calculateConfidence(context);
    
    // Update reasoning
    this.setReasoning(`✅ Synthesis Coordination Complete:
- Data items processed: ${itemCount}
- Report sections: ${sectionCount}
- Citations included: ${hasCitations ? 'Yes' : 'No'}
- Final report: ${cleanedReport.length} characters
- Confidence: ${(context.synthesis.confidence * 100).toFixed(1)}%`);
    
    return context;
  }
  
  private async assembleReport(context: ResearchContext, dataToUse: any[]): Promise<string> {
    const sections = context.reportSections || {};
    const summary = context.summary || {};
    const citations = context.citations || {};
    
    // If we have complete sections, just combine them
    if (sections.executive && sections.findings) {
      return this.combineExistingSections(sections, summary, citations);
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
      const content = item.content || item.bestItem?.content || 'N/A';
      const value = item.value || item.bestItem?.value || '';
      const source = item.sourceDocument || item.bestItem?.sourceDocument || 'unknown';
      const relevanceScore = Math.round((item._queryRelevanceScore || 0) * 100);
      
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
      '2. Focus on the highest-relevance items listed above',
      '3. Avoid including information that is not relevant to the query',
      '4. Provide specific details and evidence from the relevant data',
      '5. Structure the response clearly and concisely',
      '',
      'Generate a comprehensive, query-focused response based on the relevant data above:'
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
    if (sections.executive) {
      parts.push(`## Key Information\n\n${sections.executive}\n`);
    }
    
    if (sections.findings) {
      parts.push(`## Detailed Findings\n\n${sections.findings}\n`);
    }
    
    if (sections.details) {
      parts.push(`## Additional Details\n\n${sections.details}\n`);
    }
    
    // Add citations
    if (citations.sources?.length > 0) {
      parts.push(`## Sources\n\n${citations.sources.map(s => `- ${s}`).join('\n')}`);
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