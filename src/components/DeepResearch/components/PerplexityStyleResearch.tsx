/**
 * Perplexity-Style Research Display
 * 
 * Displays research process inline in chat flow with detailed steps and sources
 * Eliminates sidebar approach in favor of scrollable, dynamic research visibility
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResearchStep, AgentSubStep, SourceReference } from "./ResearchSteps";
import {
  Search,
  Brain,
  Globe,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  Sparkles,
  Eye,
} from "lucide-react";

interface PerplexityStyleResearchProps {
  steps: ResearchStep[];
  isActive?: boolean;
  className?: string;
}

interface StepCardProps {
  step: ResearchStep;
  stepNumber: number;
  isLast: boolean;
}

const StepIcons = {
  analysis: Target,
  rag_search: Search,
  web_search: Globe,
  synthesis: Brain,
  verification: CheckCircle,
} as const;

const AgentIcons = {
  query_planner: Target,
  data_inspector: Search,
  pattern_generator: Zap,
  extraction: Brain,
  synthesis: Sparkles,
} as const;

function AgentSubStepInline({ subStep }: { subStep: AgentSubStep }) {
  const [showThinking, setShowThinking] = useState(false);
  const IconComponent = AgentIcons[subStep.agentType] || Brain;

  const getStatusColor = () => {
    switch (subStep.status) {
      case 'completed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'in_progress': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (subStep.status) {
      case 'completed': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'failed': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'in_progress': return <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="ml-4 pl-4 border-l border-gray-200 py-2">
      <div className="flex items-center gap-3 mb-2">
        <IconComponent className={`w-4 h-4 ${getStatusColor()}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {subStep.agentName}
            </span>
            {getStatusIcon()}
            {subStep.duration && (
              <Badge variant="outline" className="text-xs">
                {subStep.duration < 1000 ? `${subStep.duration}ms` : `${(subStep.duration / 1000).toFixed(1)}s`}
              </Badge>
            )}
          </div>
          
          {subStep.stage && (
            <div className="text-xs text-gray-500 mt-1">
              {subStep.stage}
              {subStep.itemsProcessed !== undefined && (
                <span className="ml-2">
                  ({subStep.itemsProcessed}{subStep.totalItems ? `/${subStep.totalItems}` : ''} items)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {subStep.progress !== undefined && subStep.status === 'in_progress' && (
        <div className="mb-2">
          <Progress value={subStep.progress} className="h-1" />
        </div>
      )}

      {/* Thinking Section - Always show if agent has reasoning */}
      {(subStep.thinking?.hasThinking || subStep.agentName) && (
        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThinking(!showThinking)}
            className="h-6 px-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            <Brain className="w-3 h-3 mr-1" />
            🧠 AI Reasoning
            {showThinking ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronRight className="w-3 h-3 ml-1" />}
          </Button>
          
          {showThinking && (
            <div className="mt-1 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-xs">
              {subStep.thinking?.hasThinking ? (
                <>
                  <div className="text-blue-800 font-medium mb-2">
                    "{subStep.thinking.summary || 'Processing and analyzing data...'}"
                  </div>
                  {subStep.thinking.insights && subStep.thinking.insights.length > 0 ? (
                    <div className="space-y-1">
                      {subStep.thinking.insights.map((insight, idx) => (
                        <div key={idx} className="text-blue-700">
                          • {insight}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-blue-700">
                      • Analyzing {subStep.agentName === 'DataInspector' ? 'data structure and content' : 
                          subStep.agentName === 'PatternGenerator' ? 'extraction strategies' :
                          subStep.agentName === 'Extractor' ? 'relevant information from sources' :
                          subStep.agentName === 'Synthesizer' ? 'collected data for final answer' : 'research data'}
                    </div>
                  )}
                  {subStep.thinking.thinkingContent && (
                    <div className="mt-2 p-2 bg-white/70 rounded border-l-2 border-blue-400">
                      <div className="text-blue-600 font-mono text-xs max-h-20 overflow-y-auto">
                        {subStep.thinking.thinkingContent.substring(0, 200)}
                        {subStep.thinking.thinkingContent.length > 200 && '...'}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-blue-700">
                  • {subStep.agentName} is analyzing and processing the research data...
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {subStep.error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
          <div className="text-red-700 font-medium">Error:</div>
          <div className="text-red-600">{subStep.error}</div>
        </div>
      )}
    </div>
  );
}

function SourceCard({ source }: { source: SourceReference }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {source.type === 'document' ? (
            <FileText className="w-4 h-4 text-blue-500" />
          ) : source.type === 'web' ? (
            <Globe className="w-4 h-4 text-green-500" />
          ) : (
            <FileText className="w-4 h-4 text-gray-500" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {source.title}
            </h4>
            {source.similarity && (
              <Badge variant="outline" className="text-xs">
                {Math.round(source.similarity * 100)}% match
              </Badge>
            )}
          </div>
          
          <div className="text-xs text-gray-600 mb-2">
            {source.source}
          </div>
          
          <div className="text-sm text-gray-700">
            {isExpanded ? source.excerpt : source.excerpt.substring(0, 150)}
            {source.excerpt.length > 150 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-auto p-0 ml-1 text-xs text-blue-600 hover:text-blue-800"
              >
                {isExpanded ? 'Show less' : '...Show more'}
              </Button>
            )}
          </div>
        </div>
        
        {source.url && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(source.url, '_blank')}
            className="flex-shrink-0 h-8 w-8 p-0"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}

function StepCard({ step, stepNumber, isLast }: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = StepIcons[step.type] || Search;

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed': return 'border-green-200 bg-green-50/30';
      case 'failed': return 'border-red-200 bg-red-50/30';
      case 'in_progress': return 'border-blue-200 bg-blue-50/30';
      default: return 'border-gray-200 bg-gray-50/30';
    }
  };

  const getStepTitle = () => {
    switch (step.type) {
      case 'analysis': return 'Analyzing Query';
      case 'rag_search': return 'Searching Knowledge Base';
      case 'web_search': return 'Searching Web';
      case 'synthesis': return 'Synthesizing Information';
      case 'verification': return 'Verifying Results';
      default: return 'Processing';
    }
  };

  return (
    <div className="relative">
      {/* Step connector line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200" />
      )}
      
      <Card className={`${getStatusColor()} border transition-all duration-200`}>
        <CardContent className="p-4">
          {/* Step Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200">
              <IconComponent className="w-5 h-5 text-gray-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {stepNumber}. {getStepTitle()}
                </h3>
                {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {step.status === 'in_progress' && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                {step.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
              </div>
              
              {step.duration && (
                <div className="text-sm text-gray-500 mt-1">
                  Completed in {step.duration < 1000 ? `${step.duration}ms` : `${(step.duration / 1000).toFixed(1)}s`}
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-4">
              {/* Step Description */}
              {step.reasoning && (
                <div className="text-sm text-gray-700 bg-white/50 rounded p-3">
                  {step.reasoning}
                </div>
              )}

              {/* Query Information */}
              {(step.query || step.queries) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Search Terms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {step.query && (
                      <Badge variant="outline" className="text-xs">{step.query}</Badge>
                    )}
                    {step.queries?.map((query, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{query}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-Agent Process - PRIMARY FOCUS */}
              {step.subSteps && step.subSteps.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 p-3 rounded-lg border border-blue-200">
                    <Brain className="w-5 h-5" />
                    🤖 Multi-Agent Process ({step.subSteps.length} agents)
                    <Badge variant="secondary" className="ml-auto">
                      {step.subSteps.filter(s => s.status === 'completed').length}/{step.subSteps.length} completed
                    </Badge>
                  </h4>
                  <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                    {step.subSteps.map((subStep, subIdx) => (
                      <AgentSubStepInline key={`${subStep.id}-${subIdx}`} subStep={subStep} />
                    ))}
                  </div>
                </div>
              )}

              {/* Sources - MINIMIZED */}
              {step.sources && step.sources.length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800 flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <FileText className="w-4 h-4" />
                    📚 Sources Found ({step.sources.length}) - Click to expand
                  </summary>
                  <div className="mt-2 space-y-1 pl-4">
                    {step.sources.slice(0, 3).map((source, srcIdx) => (
                      <div key={`${source.id}-${srcIdx}`} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        📄 {source.title || source.source} ({source.similarity ? Math.round(source.similarity * 100) + '% match' : 'No similarity'})
                      </div>
                    ))}
                    {step.sources.length > 3 && (
                      <div className="text-xs text-gray-500 italic">
                        ... and {step.sources.length - 3} more sources
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Results Summary */}
              {step.results && step.results.length > 0 && (
                <div className="bg-blue-50 rounded p-3">
                  <div className="text-sm font-medium text-blue-800 mb-1">
                    Results: {step.results.length} items found
                  </div>
                  {step.confidence && (
                    <div className="text-xs text-blue-600">
                      Confidence: {Math.round(step.confidence * 100)}%
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function PerplexityStyleResearch({ steps, isActive = false, className = "" }: PerplexityStyleResearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);

  if (!steps || steps.length === 0) {
    return null;
  }

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;

  // Auto-scroll to latest updates when steps change
  useEffect(() => {
    const currentTime = Date.now();
    const hasActiveSteps = steps.some(step => step.status === 'in_progress');
    const hasSubSteps = steps.some(step => step.subSteps && step.subSteps.length > 0);
    
    // Only auto-scroll if:
    // 1. There are active steps (research in progress), OR
    // 2. Steps have sub-steps (agents are running), AND
    // 3. Haven't scrolled recently (prevent spam scrolling)
    const timeSinceLastScroll = currentTime - lastScrollTimeRef.current;
    const shouldScroll = (hasActiveSteps || hasSubSteps) && timeSinceLastScroll > 1000; // 1 second minimum between scrolls
    
    if (shouldScroll) {
      lastScrollTimeRef.current = currentTime;
      
      // Small delay to allow for DOM updates
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [steps]); // Only depend on steps, not the time ref

  // Also auto-scroll when isActive changes (new research starts)
  useEffect(() => {
    if (isActive && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center'
        });
      }, 300);
    }
  }, [isActive]);

  return (
    <div ref={containerRef} className={`perplexity-research ${className}`}>
      {/* Overall Progress */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="font-medium text-gray-900">Research Progress</h2>
            <Badge variant="outline" className="text-xs">
              {completedSteps}/{totalSteps} steps
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {isActive ? 'In Progress' : 'Completed'}
            </Badge>
          </div>
        </div>
        <Progress value={(completedSteps / totalSteps) * 100} className="h-2" />
      </div>

      {/* Research Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <StepCard
            key={`${step.id}-${index}`}
            step={step}
            stepNumber={index + 1}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default PerplexityStyleResearch;