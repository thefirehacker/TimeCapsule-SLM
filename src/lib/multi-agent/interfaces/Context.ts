/**
 * Research Context
 * 
 * The shared context that flows through all agents in the pipeline.
 * Each agent enriches this context with its findings.
 */

import { SourceReference } from '@/components/DeepResearch/components/ResearchSteps';

export interface ChunkData {
  id: string;
  text: string;
  source: string;
  similarity?: number;
  metadata?: Record<string, any>;
}

export interface Understanding {
  intent: string;
  domain: string;
  requirements: string[];
  queryType: string; // 'ranking', 'comparison', 'information', etc.
}

export interface Pattern {
  description: string;
  examples: string[];
  extractionStrategy: string;
  confidence: number;
}

export interface ExtractedItem {
  content: string;
  value?: any;
  unit?: string;
  context: string;
  confidence: number;
  sourceChunkId: string;
  metadata?: Record<string, any>;
}

export interface Synthesis {
  answer: string;
  confidence: number;
  reasoning: string;
  structure: 'list' | 'paragraph' | 'table' | 'structured';
}

export interface ResearchContext {
  // Original user query
  query: string;
  
  // Current understanding of the query
  understanding: Understanding;
  
  // RAG search results
  ragResults: {
    chunks: ChunkData[];
    summary: string;
  };
  
  // Discovered patterns in the data
  patterns: Pattern[];
  
  // Extracted information
  extractedData: {
    raw: ExtractedItem[];
    structured: any[];
  };
  
  // Final synthesized answer
  synthesis: Synthesis;
  
  // Agent communications and reasoning trace
  messages: AgentMessage[];
  
  // Timing and performance
  metadata: {
    startTime: number;
    agentsInvolved: string[];
    totalChunksProcessed: number;
  };
}

export interface AgentMessage {
  from: string;
  to: string;
  timestamp: number;
  type: 'info' | 'request' | 'response' | 'error';
  content: {
    message: string;
    data?: any;
  };
}

/**
 * Create initial context from query and RAG results
 */
export function createInitialContext(
  query: string, 
  ragChunks: SourceReference[]
): ResearchContext {
  return {
    query,
    understanding: {
      intent: '',
      domain: '',
      requirements: [],
      queryType: ''
    },
    ragResults: {
      chunks: ragChunks.map(chunk => ({
        id: chunk.id,
        text: chunk.excerpt || '',
        source: chunk.source,
        similarity: chunk.similarity,
        metadata: chunk.metadata
      })),
      summary: ''
    },
    patterns: [],
    extractedData: {
      raw: [],
      structured: []
    },
    synthesis: {
      answer: '',
      confidence: 0,
      reasoning: '',
      structure: 'paragraph'
    },
    messages: [],
    metadata: {
      startTime: Date.now(),
      agentsInvolved: [],
      totalChunksProcessed: ragChunks.length
    }
  };
}