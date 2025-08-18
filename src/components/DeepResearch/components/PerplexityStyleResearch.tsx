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
  Copy,
} from "lucide-react";

// Copy Multi-Agent Process details to clipboard
const copyMultiAgentProcess = async (subSteps: any[]) => {
  try {
    let copyText = "🤖 Multi-Agent Process Details\n";
    copyText += "═".repeat(40) + "\n\n";
    
    subSteps.forEach((subStep, index) => {
      const agentNumber = index + 1;
      const statusIcon = subStep.status === 'completed' ? '✅' : 
                        subStep.status === 'in_progress' ? '🔄' : 
                        subStep.status === 'failed' ? '❌' : '⏳';
      
      copyText += `${agentNumber}. ${subStep.agentName} ${statusIcon}\n`;
      copyText += `   Type: ${subStep.agentType}\n`;
      copyText += `   Status: ${subStep.status}\n`;
      
      if (subStep.progress !== undefined) {
        copyText += `   Progress: ${subStep.progress}%\n`;
      }
      
      if (subStep.stage) {
        copyText += `   Stage: ${subStep.stage}\n`;
      }
      
      if (subStep.duration) {
        copyText += `   Duration: ${subStep.duration}ms\n`;
      }
      
      // Add thinking content if available
      if (subStep.thinking?.hasThinking && subStep.thinking.thinkingContent) {
        copyText += `   \n   💭 AI Reasoning:\n`;
        copyText += `   ${subStep.thinking.thinkingContent.replace(/\n/g, '\n   ')}\n`;
      }
      
      // Add full output if available
      if (subStep.output) {
        copyText += `   \n   📤 Full Output:\n`;
        const outputText = typeof subStep.output === 'string' 
          ? subStep.output 
          : JSON.stringify(subStep.output, null, 2);
        copyText += `   ${outputText.replace(/\n/g, '\n   ')}\n`;
      }
      
      // Add error if available
      if (subStep.error) {
        copyText += `   \n   ❌ Error:\n`;
        copyText += `   ${subStep.error.replace(/\n/g, '\n   ')}\n`;
      }
      
      // Add summary if available
      if (subStep.thinking?.summary) {
        copyText += `   📝 Summary: ${subStep.thinking.summary}\n`;
      }
      
      copyText += "\n" + "─".repeat(35) + "\n\n";
    });
    
    copyText += `Total Agents: ${subSteps.length}\n`;
    copyText += `Completed: ${subSteps.filter(s => s.status === 'completed').length}\n`;
    copyText += `Generated: ${new Date().toLocaleString()}\n`;
    
    await navigator.clipboard.writeText(copyText);
    
    // Show success feedback (you could add a toast here)
    console.log("✅ Multi-Agent Process details copied to clipboard");
  } catch (error) {
    console.error("❌ Failed to copy to clipboard:", error);
  }
};

interface PerplexityStyleResearchProps {
  steps: ResearchStep[];
  isActive?: boolean;
  className?: string;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

interface StepCardProps {
  step: ResearchStep;
  stepNumber: number;
  isLast: boolean;
  onRerunAgent?: (agentName: string) => Promise<void>;
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

// Sources Section Component - Expandable
// Individual Source Card with expandable content
function SourceCard({ source }: { source: SourceReference }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800 mb-1">
              📄 {source.title || source.source}
            </div>
            {source.excerpt && (
              <div className="text-xs text-gray-600">
                <div className="whitespace-pre-wrap">
                  {isExpanded ? source.excerpt : `${source.excerpt.substring(0, 150)}${source.excerpt.length > 150 ? '...' : ''}`}
                </div>
                {source.excerpt.length > 150 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 text-blue-600 hover:text-blue-800 text-xs underline"
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            )}
          </div>
          {source.similarity && (
            <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full shrink-0">
              {Math.round(source.similarity * 100)}% match
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SourcesSection({ sources }: { sources: SourceReference[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="w-4 h-4" />
          📚 Sources Found ({sources.length}) - Full Chunk Content
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="space-y-3">
            {sources.map((source, srcIdx) => (
              <SourceCard key={`${source.id}-${srcIdx}`} source={source} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AgentSubStepInline({ subStep, onRerunAgent }: { subStep: AgentSubStep; onRerunAgent?: (agentName: string) => Promise<void> }) {
  const [showThinking, setShowThinking] = useState(false);
  const [showProgressHistory, setShowProgressHistory] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const IconComponent = AgentIcons[subStep.agentType] || Brain;
  
  // Stabilize agent display name to prevent mid-execution changes
  const getStableAgentName = () => {
    // Extract base agent name from validation prefixes
    const agentName = subStep.agentName;
    if (agentName.includes('PlanningAgent Validation:')) {
      const baseName = agentName.replace('PlanningAgent Validation: ', '');
      return `${baseName} Validation`;
    }
    // Keep original name for non-validation agents
    return agentName;
  };
  
  const displayName = getStableAgentName();
  
  // Thinking data available (debug removed)

  const getStatusColor = () => {
    switch (subStep.status) {
      case 'completed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'in_progress': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    // ENHANCED completion detection - multiple indicators including agent-specific logic
    const hasDuration = subStep.duration !== undefined && subStep.duration !== null && subStep.duration > 0;
    const hasEndTime = subStep.endTime !== undefined && subStep.endTime !== null;
    const hasOutput = subStep.output !== undefined && subStep.output !== null;
    const isProgressComplete = subStep.progress === 100;
    
    // Special logic for DataInspector - it may complete without setting duration
    const isDataInspectorComplete = subStep.agentName === 'DataInspector' && 
      (subStep.stage === 'Analysis complete' || 
       subStep.progressHistory?.some(p => p.stage?.includes('complete')) ||
       (hasOutput && subStep.progress && subStep.progress >= 90));
    
    const isActuallyComplete = subStep.status === 'completed' || 
                              hasDuration || 
                              hasEndTime || 
                              isDataInspectorComplete ||
                              (isProgressComplete && hasOutput);
    
    const isActuallyFailed = subStep.status === 'failed' || subStep.error;
    
    // Completion detection logic (spam removed)
    
    if (isActuallyComplete && !isActuallyFailed) {
      return <CheckCircle className="w-3 h-3 text-green-500" />;
    }
    if (isActuallyFailed) {
      return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
    if (subStep.status === 'in_progress' || (!isActuallyComplete && !isActuallyFailed)) {
      return <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />;
    }
    return <Clock className="w-3 h-3 text-gray-400" />;
  };

  return (
    <div className="ml-4 pl-4 border-l border-gray-200 py-2">
      <div className="flex items-center gap-3 mb-2">
        <IconComponent className={`w-4 h-4 ${getStatusColor()}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {displayName}
            </span>
            {getStatusIcon()}
            {subStep.duration && (
              <Badge variant="outline" className="text-xs">
                {subStep.duration < 1000 ? `${subStep.duration}ms` : `${(subStep.duration / 1000).toFixed(1)}s`}
              </Badge>
            )}
            {/* Rerun Button - Show for completed/failed agents */}
            {onRerunAgent && (subStep.status === 'completed' || subStep.status === 'failed') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRerunAgent(subStep.agentName)}
                className="h-5 w-5 p-0 hover:bg-primary/10 ml-1"
                title={`Rerun ${displayName}`}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </Button>
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

      {/* Progress Bar - Show for in_progress, or completed with final progress */}
      {subStep.progress !== undefined && (subStep.status === 'in_progress' || subStep.status === 'completed') && (
        <div className="mb-2">
          <Progress 
            value={subStep.status === 'completed' ? 100 : subStep.progress} 
            className={`h-1 ${subStep.status === 'completed' ? 'opacity-75' : ''}`} 
          />
        </div>
      )}

      {/* Progress History - Always show if available, even after completion */}
      {subStep.progressHistory && subStep.progressHistory.length > 0 && (
        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProgressHistory(!showProgressHistory)}
            className={`h-6 px-2 text-xs font-medium ${
              subStep.status === 'completed' 
                ? 'text-green-700 hover:text-green-900' 
                : 'text-green-600 hover:text-green-800'
            }`}
          >
            <Clock className="w-3 h-3 mr-1" />
            📊 {subStep.status === 'completed' ? 'Completed Steps' : 'Progress History'} ({subStep.progressHistory.length} steps)
            {showProgressHistory ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronRight className="w-3 h-3 ml-1" />}
          </Button>
          
          {showProgressHistory && (
            <div className="mt-1 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-xs">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {subStep.progressHistory.map((entry, idx) => {
                  const isLatest = idx === subStep.progressHistory!.length - 1;
                  const timestamp = new Date(entry.timestamp).toLocaleTimeString();
                  
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between p-2 rounded ${
                        isLatest ? 'bg-green-100 border border-green-300' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex-1">
                        <div className={`font-medium ${isLatest ? 'text-green-800' : 'text-gray-700'}`}>
                          {entry.stage}
                          {isLatest && (
                            <span className={`ml-2 text-xs px-1 rounded ${
                              subStep.status === 'completed' 
                                ? 'bg-green-200 text-green-800' 
                                : 'bg-blue-200 text-blue-800'
                            }`}>
                              {subStep.status === 'completed' ? 'COMPLETED' : 'CURRENT'}
                            </span>
                          )}
                        </div>
                        {entry.itemsProcessed !== undefined && (
                          <div className="text-xs text-gray-500">
                            ({entry.itemsProcessed}{entry.totalItems ? `/${entry.totalItems}` : ''} items)
                          </div>
                        )}
                        {entry.message && (
                          <div className="text-xs text-gray-600 mt-1">{entry.message}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${isLatest ? 'text-green-700' : 'text-gray-600'}`}>
                          {entry.progress}%
                        </div>
                        <div className="text-xs text-gray-400">
                          {timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
                      • Analyzing {displayName.includes('DataInspector') ? 'data structure and content' : 
                          displayName.includes('PatternGenerator') ? 'extraction strategies' :
                          displayName.includes('Extractor') ? 'relevant information from sources' :
                          displayName.includes('Synthesizer') ? 'collected data for final answer' : 
                          displayName.includes('Validation') ? 'results and ensuring quality' : 'research data'}
                    </div>
                  )}
                  {subStep.thinking.thinkingContent && (
                    <div className="mt-2 p-2 bg-white/70 rounded border-l-2 border-blue-400">
                      <div className="text-blue-600 font-mono text-xs max-h-60 overflow-y-auto whitespace-pre-wrap">
                        {subStep.thinking.thinkingContent}
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

      {/* Output Display */}
      {subStep.output && subStep.status === 'completed' && (
        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOutput(!showOutput)}
            className="h-6 px-2 text-xs text-green-600 hover:text-green-800 font-medium"
          >
            <FileText className="w-3 h-3 mr-1" />
            📤 Full Output
            {showOutput ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronRight className="w-3 h-3 ml-1" />}
          </Button>
          
          {showOutput && (
            <div className="mt-1 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-xs">
              <div className="text-green-800 font-medium mb-2">
                Complete {displayName} Output:
              </div>
              <div className="text-green-700 font-mono max-h-60 overflow-y-auto whitespace-pre-wrap">
                {typeof subStep.output === 'string' 
                  ? subStep.output 
                  : JSON.stringify(subStep.output, null, 2)
                }
              </div>
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

function StepCard({ step, stepNumber, isLast, onRerunAgent }: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = StepIcons[step.type] || Search;
  
  // Aggressive completion counting function
  const getCompletedSubStepsCount = (subSteps?: any[]) => {
    if (!subSteps) return 0;
    return subSteps.filter(subStep => {
      const hasDuration = subStep.duration !== undefined && subStep.duration !== null && subStep.duration > 0;
      const hasEndTime = subStep.endTime !== undefined && subStep.endTime !== null;
      const hasOutput = subStep.output !== undefined && subStep.output !== null;
      const isProgressComplete = subStep.progress === 100;
      
      return subStep.status === 'completed' || 
             hasDuration || 
             hasEndTime || 
             (isProgressComplete && hasOutput);
    }).length;
  };

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed': return 'border-green-200 bg-green-50/30';
      case 'failed': return 'border-red-200 bg-red-50/30';
      case 'in_progress': return 'border-blue-200 bg-blue-50/30';
      default: return 'border-gray-200 bg-gray-50/30';
    }
  };

  const getStepTitle = () => {
    // Try to determine agent from step ID first, then subSteps for more specific titles
    const hasPatternGenerator = step.id.includes('patterngenerator') || step.subSteps?.some(sub => sub.agentName?.includes('PatternGenerator'));
    const hasExtractor = step.id.includes('extractor') || step.subSteps?.some(sub => sub.agentName?.includes('Extractor'));
    const hasPlanning = step.id.includes('planningagent') || step.subSteps?.some(sub => sub.agentName?.includes('PlanningAgent'));
    const hasDataInspector = step.id.includes('datainspector') || step.subSteps?.some(sub => sub.agentName?.includes('DataInspector'));
    const hasSynthesis = step.id.includes('synthesis') || step.subSteps?.some(sub => sub.agentName?.includes('Synthesis'));
    const hasResponseFormatter = step.id.includes('responseformatter') || step.subSteps?.some(sub => sub.agentName?.includes('ResponseFormatter'));
    
    switch (step.type) {
      case 'analysis': 
        if (hasDataInspector) return 'Analyzing Documents';
        if (hasPatternGenerator) return 'Generating Extraction Patterns';
        if (hasExtractor) return 'Extracting Information';
        if (hasPlanning) return 'Planning Execution Strategy';
        return 'Analyzing Query';
      case 'rag_search': 
        return 'Searching Knowledge Base';
      case 'web_search': return 'Searching Web';
      case 'synthesis': 
        if (hasSynthesis) return 'Synthesizing Information';
        return 'Synthesizing Information';
      case 'verification': 
        if (hasResponseFormatter) return 'Formatting Response';
        if (hasPlanning) return 'Validating Results';
        return 'Verifying Results';
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
                      {getCompletedSubStepsCount(step.subSteps)}/{step.subSteps.length} completed
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyMultiAgentProcess(step.subSteps || [])}
                      className="ml-2 h-8 w-8 p-0 hover:bg-blue-200"
                      title="Copy Multi-Agent Process Details"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </h4>
                  <div className="space-y-3 pl-4 border-l-2 border-blue-200">
                    {step.subSteps
                      .sort((a, b) => {
                        // Sort by startTime to maintain execution order
                        const timeA = a.startTime || 0;
                        const timeB = b.startTime || 0;
                        return timeA - timeB;
                      })
                      .map((subStep, subIdx) => (
                      <AgentSubStepInline key={`agent-${subStep.agentName}-${subStep.startTime}`} subStep={subStep} onRerunAgent={onRerunAgent} />
                    ))}
                  </div>
                </div>
              )}

              {/* Sources - MINIMIZED & EXPANDABLE */}
              {step.sources && step.sources.length > 0 && (
                <SourcesSection sources={step.sources} />
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

export function PerplexityStyleResearch({ steps, isActive = false, className = "", onRerunAgent }: PerplexityStyleResearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);

  if (!steps || steps.length === 0) {
    return null;
  }

  // ENHANCED completion counting - includes DataInspector specific detection
  const getCompletedSubStepsCount = (subSteps?: any[]) => {
    if (!subSteps) return 0;
    return subSteps.filter(subStep => {
      const hasDuration = subStep.duration !== undefined && subStep.duration !== null && subStep.duration > 0;
      const hasEndTime = subStep.endTime !== undefined && subStep.endTime !== null;
      const hasOutput = subStep.output !== undefined && subStep.output !== null;
      const isProgressComplete = subStep.progress === 100;
      
      // Special logic for DataInspector - it may complete without setting duration
      const isDataInspectorComplete = subStep.agentName === 'DataInspector' && 
        (subStep.stage === 'Analysis complete' || 
         subStep.progressHistory?.some(p => p.stage?.includes('complete')) ||
         (hasOutput && subStep.progress && subStep.progress >= 90));
      
      return subStep.status === 'completed' || 
             hasDuration || 
             hasEndTime || 
             isDataInspectorComplete ||
             (isProgressComplete && hasOutput);
    }).length;
  };
  
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  
  // For multi-agent steps, use substep completion count
  const multiAgentStep = steps.find(step => step.subSteps && step.subSteps.length > 0);
  const completedAgents = multiAgentStep ? getCompletedSubStepsCount(multiAgentStep.subSteps) : 0;
  const totalAgents = multiAgentStep?.subSteps?.length || 0;
  
  // Debug agent visibility
  React.useEffect(() => {
    if (multiAgentStep?.subSteps) {
      const agentNames = multiAgentStep.subSteps.map(s => s.agentName);
      console.log(`🔍 UI RENDER: Displaying ${totalAgents} agents:`, agentNames);
      
      const dataInspectorPresent = agentNames.includes('DataInspector');
      if (!dataInspectorPresent && totalAgents > 0) {
        console.warn(`⚠️ UI WARNING: DataInspector missing from display! Current agents:`, agentNames);
      }
    }
  }, [multiAgentStep?.subSteps, totalAgents]);

  // Auto-scroll to latest updates when steps change
  useEffect(() => {
    if (!steps || steps.length === 0) return;
    
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
              {totalAgents > 0 ? `${completedAgents}/${totalAgents} agents` : `${completedSteps}/${totalSteps} steps`}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {isActive ? 'In Progress' : 'Completed'}
            </Badge>
          </div>
        </div>
        <Progress value={totalAgents > 0 ? (completedAgents / totalAgents) * 100 : (completedSteps / totalSteps) * 100} className="h-2" />
      </div>

      {/* Research Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <StepCard
            key={`${step.id}-${index}`}
            step={step}
            stepNumber={index + 1}
            isLast={index === steps.length - 1}
            onRerunAgent={onRerunAgent}
          />
        ))}
      </div>
    </div>
  );
}

export default PerplexityStyleResearch;