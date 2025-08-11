/**
 * Research Steps Component
 * 
 * Provides Perplexity-style transparent research process display
 * Shows step-by-step breakdown of how AI searches and processes information
 */

"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentSubSteps } from "./AgentSubSteps";
import { 
  Search, 
  Brain, 
  Globe, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Hash
} from "lucide-react";

// Types for research step tracking
export interface AgentThinking {
  hasThinking: boolean;
  thinkingContent: string;
  finalOutput: string;
  summary: string;
  insights: string[];
}

export interface ProgressHistoryEntry {
  timestamp: number;
  stage: string;
  progress: number;
  itemsProcessed?: number;
  totalItems?: number;
  message?: string;
}

export interface AgentSubStep {
  id: string;
  agentName: string;
  agentType: 'query_planner' | 'data_inspector' | 'pattern_generator' | 'extraction' | 'synthesis';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startTime: number;
  endTime?: number;
  duration?: number;
  
  // Agent-specific data
  input: any;
  output: any;
  thinking?: AgentThinking;
  
  // Progress tracking
  progress?: number; // 0-100
  stage?: string;
  itemsProcessed?: number;
  totalItems?: number;
  progressHistory?: ProgressHistoryEntry[]; // NEW: Store all progress updates
  
  // Error handling
  error?: string;
  retryCount?: number;
  
  // Performance metrics
  metrics?: {
    llmCalls: number;
    tokensUsed: number;
    responseTime: number;
    confidence: number;
  };
}

export interface ResearchStep {
  id: string;
  type: 'analysis' | 'rag_search' | 'web_search' | 'synthesis' | 'verification';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: number;
  duration?: number;
  
  // Step-specific data
  query?: string;
  queries?: string[];
  intent?: {
    type: string;
    confidence: number;
  };
  sources?: SourceReference[];
  results?: any[];
  reasoning?: string;
  confidence?: number;
  metadata?: {
    searchQuery?: string;
    expansionReason?: string;
    threshold?: number;
    limit?: number;
  };

  // Multi-agent sub-steps (NEW)
  subSteps?: AgentSubStep[];
  agentDetails?: {
    orchestratorPlan: string;
    agentPipeline: string[];
    totalAgents: number;
    completedAgents: number;
  };
}

export interface SourceReference {
  id: string;
  type: 'document' | 'web' | 'chunk';
  title: string;
  source: string;
  similarity?: number;
  relevance?: number;
  excerpt: string;
  chunkId?: string;
  url?: string;
  // Enhanced for multi-agent system: full chunk content from RxDB
  fullContent?: string; // Complete chunk content for multi-agent processing
  metadata?: {
    filename?: string;
    uploadedAt?: string;
    description?: string;
    // Web-specific metadata
    domain?: string;
    hasScrapedContent?: boolean;
    contentLength?: number;
    crawlTime?: number;
    scrapingFailed?: boolean;
  };
}

interface ResearchStepsProps {
  steps: ResearchStep[];
  onStepClick: (step: ResearchStep) => void;
  expandedSteps: Set<string>;
  className?: string;
  fullScreenMode?: boolean;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

/**
 * Main Research Steps Component
 */
export function ResearchSteps({ 
  steps, 
  onStepClick, 
  expandedSteps, 
  className = "",
  fullScreenMode = false,
  onRerunAgent
}: ResearchStepsProps) {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  
  if (steps.length === 0) {
    return null;
  }
  
  return (
    <Card className={`research-steps h-full flex flex-col ${className} ${fullScreenMode ? 'border-0 shadow-none bg-transparent' : ''}`}>
      <CardHeader className={`${fullScreenMode ? 'pb-6 pt-2' : 'pb-3'} flex-shrink-0`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-medium">Research Process</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {completedSteps}/{totalSteps} steps
            </Badge>
            {totalSteps > 0 && (
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-2 pr-2">
            {steps
              // Deduplicate steps by ID as final safeguard
              .filter((step, index, arr) => arr.findIndex(s => s.id === step.id) === index)
              .map((step, index) => (
                <ResearchStepCard
                  key={`${step.id}_${step.status}_${index}`} // More unique key combining ID, status, and index
                  step={step}
                  index={index}
                  isExpanded={expandedSteps.has(step.id)}
                  onToggle={() => onStepClick(step)}
                  onRerunAgent={onRerunAgent}
                />
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

/**
 * Individual Research Step Card
 */
interface StepCardProps {
  step: ResearchStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

function ResearchStepCard({ step, index, isExpanded, onToggle, onRerunAgent }: StepCardProps) {
  const getStepIcon = (type: string, status: string) => {
    const iconProps = { className: "w-4 h-4" };
    
    if (status === 'completed') {
      return <CheckCircle {...iconProps} className="w-4 h-4 text-green-500" />;
    }
    if (status === 'failed') {
      return <AlertCircle {...iconProps} className="w-4 h-4 text-red-500" />;
    }
    if (status === 'in_progress') {
      return <Clock {...iconProps} className="w-4 h-4 text-blue-500 animate-pulse" />;
    }
    
    // Default icons by type
    switch (type) {
      case 'analysis':
        return <Brain {...iconProps} className="w-4 h-4 text-purple-500" />;
      case 'rag_search':
        return <FileText {...iconProps} className="w-4 h-4 text-blue-500" />;
      case 'web_search':
        return <Globe {...iconProps} className="w-4 h-4 text-green-500" />;
      case 'synthesis':
        return <Hash {...iconProps} className="w-4 h-4 text-orange-500" />;
      default:
        return <Search {...iconProps} className="w-4 h-4 text-gray-500" />;
    }
  };
  
  const getStepTitle = (step: ResearchStep) => {
    switch (step.type) {
      case 'analysis':
        return `Analyzing query: "${step.query}"`;
      case 'rag_search':
        return `Searching knowledge base${step.queries?.length ? ` (${step.queries.length} queries)` : ''}`;
      case 'web_search':
        return `Searching web for recent information`;
      case 'synthesis':
        return `Synthesizing information${step.sources?.length ? ` from ${step.sources.length} sources` : ''}`;
      case 'verification':
        return `Verifying and cross-referencing sources`;
      default:
        return `Research step ${index + 1}`;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 text-xs">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="text-xs">Failed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
  };
  
  return (
    <Card className={`step-card transition-all duration-200 ${
      step.status === 'completed' ? 'border-green-200 bg-green-50/30' :
      step.status === 'failed' ? 'border-red-200 bg-red-50/30' :
      step.status === 'in_progress' ? 'border-blue-200 bg-blue-50/30' :
      'border-gray-200'
    }`}>
      <CardHeader 
        className={`pb-2 cursor-pointer transition-colors ${
          step.status === 'completed' ? 'hover:bg-green-50/50' :
          step.status === 'failed' ? 'hover:bg-red-50/50' :
          step.status === 'in_progress' ? 'hover:bg-blue-50/50' :
          'hover:bg-gray-50/50'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-mono w-6">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              {getStepIcon(step.type, step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium break-words">
                {getStepTitle(step)}
              </div>
              {step.intent && (
                <div className="text-xs text-gray-500 break-words">
                  Intent: {step.intent.type} ({Math.round(step.intent.confidence * 100)}% confidence)
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {step.duration && (
              <span className="text-xs text-gray-500 font-mono">
                {step.duration}ms
              </span>
            )}
            {getStatusBadge(step.status)}
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 pb-3">
          <ResearchStepDetails step={step} onRerunAgent={onRerunAgent} />
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Detailed view of research step contents
 */
interface StepDetailsProps {
  step: ResearchStep;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

function ResearchStepDetails({ step, onRerunAgent }: StepDetailsProps) {
  return (
    <div className="space-y-3 text-sm">
      {/* Reasoning */}
      {step.reasoning && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="font-medium text-gray-700 mb-1">Reasoning:</div>
          <div className="text-gray-600 break-words overflow-wrap-anywhere">
            {step.reasoning}
          </div>
        </div>
      )}
      
      {/* Expanded Queries */}
      {step.queries && step.queries.length > 0 && (
        <div>
          <div className="font-medium text-gray-700 mb-2">Search Terms:</div>
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
            {step.queries.map((query, index) => (
              <Badge key={index} variant="outline" className="text-xs break-all">
                {query}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Search Parameters */}
      {step.metadata && (
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          {step.metadata.threshold && (
            <div>
              <span className="font-medium">Threshold:</span> {step.metadata.threshold}
            </div>
          )}
          {step.metadata.limit && (
            <div>
              <span className="font-medium">Limit:</span> {step.metadata.limit}
            </div>
          )}
        </div>
      )}
      
      {/* Sources Found */}
      {step.sources && step.sources.length > 0 && (
        <div>
          <div className="font-medium text-gray-700 mb-2">
            Sources Found ({step.sources.length}):
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2 bg-gray-50/50">
            {step.sources.map((source) => (
              <SourceReferenceCard key={source.id} source={source} />
            ))}
          </div>
        </div>
      )}
      
      {/* Results Summary */}
      {step.results && step.results.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="font-medium text-blue-800 mb-1">
            Results: {step.results.length} items found
          </div>
          {step.confidence && (
            <div className="text-xs text-blue-600">
              Confidence: {Math.round(step.confidence * 100)}%
            </div>
          )}
        </div>
      )}

      {/* Multi-Agent Sub-Steps */}
      {step.subSteps && step.subSteps.length > 0 && (
        <div className="border-t border-border/50 pt-3 mt-3">
          <AgentSubSteps 
            subSteps={step.subSteps}
            isExpanded={step.status === 'completed' || step.status === 'failed'}
            className="bg-background/50 rounded-lg p-3"
            onRerunAgent={onRerunAgent}
          />
        </div>
      )}

      {/* Agent Pipeline Details */}
      {step.agentDetails && (
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="font-medium text-foreground mb-2">
            Multi-Agent Pipeline
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>Plan: {step.agentDetails.orchestratorPlan}</div>
            <div>Pipeline: {step.agentDetails.agentPipeline.join(' → ')}</div>
            <div>Progress: {step.agentDetails.completedAgents}/{step.agentDetails.totalAgents} agents</div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Source Reference Card Component
 */
interface SourceCardProps {
  source: SourceReference;
}

function SourceReferenceCard({ source }: SourceCardProps) {
  const getSimilarityColor = (similarity?: number) => {
    if (!similarity) return 'text-gray-500';
    if (similarity > 0.8) return 'text-green-600';
    if (similarity > 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-3 h-3" />;
      case 'web':
        return <Globe className="w-3 h-3" />;
      case 'chunk':
        return <Hash className="w-3 h-3" />;
      default:
        return <Search className="w-3 h-3" />;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-2 bg-white overflow-hidden">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getTypeIcon(source.type)}
            <span className="text-xs font-medium truncate">{source.title}</span>
            {source.url && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 flex-shrink-0"
                onClick={() => window.open(source.url, '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          <div className="text-xs text-gray-600 mb-2 break-words">
            <div className="line-clamp-3 overflow-hidden">
              {source.excerpt}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs gap-2">
            <span className="text-gray-500 truncate flex-1 min-w-0">{source.source}</span>
            {source.similarity && (
              <span className={`font-mono flex-shrink-0 ${getSimilarityColor(source.similarity)}`}>
                {Math.round(source.similarity * 100)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Utility hook for managing research steps
 */
export function useResearchSteps() {
  const [steps, setSteps] = React.useState<ResearchStep[]>([]);
  const [expandedSteps, setExpandedSteps] = React.useState<Set<string>>(new Set());
  
  const addStep = React.useCallback((step: ResearchStep) => {
    setSteps(prev => {
      // Check if step already exists to prevent duplicates
      const existingIndex = prev.findIndex(s => s.id === step.id);
      if (existingIndex >= 0) {
        console.log(`🚫 Preventing duplicate step addition: ${step.id}`);
        return prev; // Return unchanged if step already exists
      }
      return [...prev, step];
    });
  }, []);
  
  const updateStep = React.useCallback((stepId: string, updates: Partial<ResearchStep>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  }, []);
  
  const clearSteps = React.useCallback(() => {
    setSteps([]);
    setExpandedSteps(new Set());
  }, []);
  
  const toggleStepExpansion = React.useCallback((stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  }, []);
  
  const handleStepClick = React.useCallback((step: ResearchStep) => {
    toggleStepExpansion(step.id);
  }, [toggleStepExpansion]);
  
  return {
    steps,
    expandedSteps,
    addStep,
    updateStep,
    clearSteps,
    handleStepClick
  };
}

/**
 * Helper functions for creating research steps
 */
export class ResearchStepUtils {
  private static counter = 0;
  
  private static generateUniqueId(type: string): string {
    this.counter++;
    
    // Use crypto.randomUUID if available, fallback to robust timestamp method
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      const uuid = crypto.randomUUID().replace(/-/g, '').substring(0, 8);
      return `${type}_${Date.now()}_${this.counter}_${uuid}`;
    }
    
    // Fallback: Use multiple randomness sources for true uniqueness
    const timestamp = Date.now();
    const performanceTime = Math.floor(performance.now() * 1000); // microseconds
    const random1 = Math.floor(Math.random() * 999999);
    const random2 = Math.random().toString(36).substring(2, 8);
    const processRandom = Math.floor(Math.random() * 9999);
    
    return `${type}_${timestamp}_${performanceTime}_${this.counter}_${random1}_${random2}_${processRandom}`;
  }
  
  static createAnalysisStep(query: string): ResearchStep {
    return {
      id: this.generateUniqueId('analysis'),
      type: 'analysis',
      status: 'pending',
      timestamp: Date.now(),
      query,
      reasoning: 'Analyzing query intent and generating search strategy'
    };
  }
  
  static createRAGSearchStep(queries: string[], reasoning?: string): ResearchStep {
    return {
      id: this.generateUniqueId('rag_search'),
      type: 'rag_search',
      status: 'pending',
      timestamp: Date.now(),
      queries,
      reasoning: reasoning || 'Searching knowledge base for relevant information'
    };
  }
  
  static createWebSearchStep(query: string, reasoning?: string): ResearchStep {
    return {
      id: this.generateUniqueId('web_search'),
      type: 'web_search',
      status: 'pending',
      timestamp: Date.now(),
      query,
      reasoning: reasoning || 'Searching web for additional context and recent information'
    };
  }
  
  static createSynthesisStep(sources: SourceReference[]): ResearchStep {
    return {
      id: this.generateUniqueId('synthesis'),
      type: 'synthesis',
      status: 'pending',
      timestamp: Date.now(),
      sources,
      reasoning: `Synthesizing information from ${sources.length} sources to generate comprehensive response`
    };
  }
}