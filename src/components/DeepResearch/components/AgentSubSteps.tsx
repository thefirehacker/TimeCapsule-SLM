/**
 * Agent Sub-Steps Component
 * 
 * Displays detailed multi-agent process breakdown with collapsible thinking sections
 * Shows the 5-step agent pipeline: Query Planning → Data Inspection → Pattern Generation → Extraction → Synthesis
 */

"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AgentSubStep, AgentThinking } from "./ResearchSteps";
import {
  ChevronDown,
  ChevronRight,
  Brain,
  Search,
  Zap,
  Target,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface AgentSubStepsProps {
  subSteps: AgentSubStep[];
  isExpanded?: boolean;
  className?: string;
  onRerunAgent?: (agentName: string) => Promise<void>;
}

interface ThinkingToggleProps {
  thinking: AgentThinking;
  agentName: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const AgentIcons = {
  query_planner: Target,
  data_inspector: Search,
  pattern_generator: Zap,
  extraction: Brain,
  synthesis: Sparkles,
} as const;

const AgentColors = {
  query_planner: "text-blue-500",
  data_inspector: "text-green-500", 
  pattern_generator: "text-yellow-500",
  extraction: "text-purple-500",
  synthesis: "text-pink-500",
} as const;

const AgentBgColors = {
  query_planner: "bg-blue-50 border-blue-200",
  data_inspector: "bg-green-50 border-green-200",
  pattern_generator: "bg-yellow-50 border-yellow-200", 
  extraction: "bg-purple-50 border-purple-200",
  synthesis: "bg-pink-50 border-pink-200",
} as const;

function ThinkingSection({ thinking, agentName, isExpanded, onToggle }: ThinkingToggleProps) {
  if (!thinking.hasThinking) return null;

  return (
    <div className="mt-3 border-t border-border/50 pt-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="w-full justify-between p-2 h-auto text-left hover:bg-primary/5"
      >
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">AI Thinking Process</span>
          <Badge variant="outline" className="text-xs">
            {thinking.insights.length} insights
          </Badge>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>

      {isExpanded && (
        <div className="mt-2 p-3 bg-muted/30 rounded-md border border-border/50">
          <div className="space-y-3">
            {/* Summary */}
            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-1">
                Quick Summary
              </h5>
              <p className="text-sm text-foreground/80 italic">
                "{thinking.summary}"
              </p>
            </div>

            {/* Key Insights */}
            {thinking.insights.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-2">
                  Key Reasoning Steps
                </h5>
                <div className="space-y-1">
                  {thinking.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-xs text-muted-foreground mt-0.5 min-w-fit">
                        {index + 1}.
                      </span>
                      <span className="text-sm text-foreground/70">
                        {insight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Thinking Content */}
            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">
                Complete Thought Process
              </h5>
              <ScrollArea className="max-h-32">
                <div className="text-xs text-foreground/60 whitespace-pre-wrap font-mono bg-background/50 p-2 rounded border">
                  {thinking.thinkingContent}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AgentSubStepCard({ 
  subStep, 
  onRerunAgent 
}: { 
  subStep: AgentSubStep;
  onRerunAgent?: (agentName: string) => Promise<void>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [showProgressHistory, setShowProgressHistory] = useState(false);

  const IconComponent = AgentIcons[subStep.agentType];
  const iconColor = AgentColors[subStep.agentType];
  const bgColor = AgentBgColors[subStep.agentType];
  
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

  const getStatusIcon = () => {
    // AGGRESSIVE completion detection - if agent has duration, it's completed
    const hasDuration = subStep.duration !== undefined && subStep.duration !== null && subStep.duration > 0;
    const hasEndTime = subStep.endTime !== undefined && subStep.endTime !== null;
    const hasOutput = subStep.output !== undefined && subStep.output !== null;
    const isProgressComplete = subStep.progress === 100;
    
    const isActuallyComplete = subStep.status === 'completed' || 
                              hasDuration || 
                              hasEndTime || 
                              (isProgressComplete && hasOutput);
    
    const isActuallyFailed = subStep.status === 'failed' || subStep.error;
    
    if (isActuallyComplete && !isActuallyFailed) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (isActuallyFailed) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    if (subStep.status === 'in_progress' || (!isActuallyComplete && !isActuallyFailed)) {
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    }
    return <Clock className="w-4 h-4 text-muted-foreground" />;
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return null;
    return duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(1)}s`;
  };

  return (
    <Card className={`relative border ${bgColor} transition-all duration-200 rounded-xl shadow-sm hover:shadow-md`}>
      {/* Left color stripe by agent type */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${iconColor.replace('text-', 'bg-')}`} />
      <CardContent className="p-4">
        {/* Agent Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <IconComponent className={`w-5 h-5 ${iconColor}`} />
            <div>
              <h4 className="font-medium text-sm">{displayName}</h4>
              <p className="text-xs text-muted-foreground capitalize">
                {subStep.agentType.replace('_', ' ')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {subStep.duration && (
              <Badge variant="outline" className="text-xs">
                {formatDuration(subStep.duration)}
              </Badge>
            )}
            {/* Rerun Button - Show for completed/failed agents */}
            {onRerunAgent && (subStep.status === 'completed' || subStep.status === 'failed') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRerunAgent(subStep.agentName)}
                className="h-6 w-6 p-0 hover:bg-primary/10"
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
            {getStatusIcon()}
          </div>
        </div>

        {/* Progress Bar - Show for in_progress, or completed with final progress */}
        {subStep.progress !== undefined && (subStep.status === 'in_progress' || subStep.status === 'completed') && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress {subStep.status === 'completed' ? '(Completed)' : ''}</span>
              <span>{subStep.status === 'completed' ? 100 : subStep.progress}%</span>
            </div>
            <Progress 
              value={subStep.status === 'completed' ? 100 : subStep.progress} 
              className={`h-2 ${subStep.status === 'completed' ? 'opacity-75' : ''}`} 
            />
          </div>
        )}

        {/* Processing Info */}
        {(subStep.itemsProcessed !== undefined || subStep.stage) && (
          <div className="mb-3 text-xs text-muted-foreground">
            {subStep.stage && <div>Stage: {subStep.stage}</div>}
            {subStep.itemsProcessed !== undefined && (
              <div>
                Items: {subStep.itemsProcessed}
                {subStep.totalItems ? ` / ${subStep.totalItems}` : ''}
              </div>
            )}
          </div>
        )}

        {/* Progress History - Always show if available, even after completion */}
        {subStep.progressHistory && subStep.progressHistory.length > 0 && (
          <div className="mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProgressHistory(!showProgressHistory)}
              className={`h-5 px-2 text-xs hover:bg-primary/5 ${
                subStep.status === 'completed' 
                  ? 'text-green-600 hover:text-green-800' 
                  : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <Clock className="w-3 h-3 mr-1" />
              {subStep.status === 'completed' ? 'Completed Steps' : 'Progress History'} ({subStep.progressHistory.length})
              {showProgressHistory ? <ChevronDown className="w-3 h-3 ml-1" /> : <ChevronRight className="w-3 h-3 ml-1" />}
            </Button>
            
            {showProgressHistory && (
              <div className="mt-2 p-2 bg-muted/30 rounded-md border border-border/50">
                <div className="space-y-1 max-h-24 overflow-y-auto text-xs">
                  {subStep.progressHistory.map((entry, idx) => {
                    const isLatest = idx === subStep.progressHistory!.length - 1;
                    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
                    
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-1.5 rounded text-xs ${
                          isLatest ? 'bg-primary/10 border border-primary/20' : 'bg-background/50'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium truncate ${isLatest ? 'text-primary' : 'text-muted-foreground'}`}>
                            {entry.stage}
                            {isLatest && (
                              <span className={`ml-1 text-xs px-1 rounded ${
                                subStep.status === 'completed' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {subStep.status === 'completed' ? 'DONE' : 'NOW'}
                              </span>
                            )}
                          </div>
                          {entry.itemsProcessed !== undefined && (
                            <div className="text-xs text-muted-foreground">
                              ({entry.itemsProcessed}{entry.totalItems ? `/${entry.totalItems}` : ''} items)
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-2 flex-shrink-0">
                          <div className={`font-medium ${isLatest ? 'text-primary' : 'text-muted-foreground'}`}>
                            {entry.progress}%
                          </div>
                          <div className="text-xs text-muted-foreground/70">
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

        {/* Metrics */}
        {subStep.metrics && (
          <div className="flex flex-wrap gap-2 mb-3">
            {subStep.metrics.llmCalls > 0 && (
              <Badge variant="secondary" className="text-xs">
                {subStep.metrics.llmCalls} LLM calls
              </Badge>
            )}
            {subStep.metrics.confidence > 0 && (
              <Badge variant="secondary" className="text-xs">
                {Math.round(subStep.metrics.confidence * 100)}% confident
              </Badge>
            )}
          </div>
        )}

        {/* Output Summary */}
        {subStep.output && subStep.status === 'completed' && (
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
              Output:
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOutput(!showOutput)}
                className="h-5 px-2 text-xs hover:bg-blue-100"
              >
                {showOutput ? 'Hide Full Output' : 'Show Full Output'}
              </Button>
            </div>
            <div className={`text-sm text-foreground/80 bg-background/50 p-2 rounded border ${showOutput ? '' : 'line-clamp-4'}`}>
              {typeof subStep.output === 'string' 
                ? subStep.output
                : JSON.stringify(subStep.output, null, showOutput ? 2 : 0)
              }
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setShowOutput(!showOutput)}
              >
                {showOutput ? 'Collapse' : 'Expand'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => {
                  const text = typeof subStep.output === 'string' ? subStep.output : JSON.stringify(subStep.output, null, 2);
                  navigator.clipboard?.writeText(text);
                }}
              >
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setShowThinking(!showThinking)}
              >
                {showThinking ? 'Hide Reasoning' : 'Show Reasoning'}
              </Button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {subStep.error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
            <div className="text-xs font-medium text-red-700 mb-1">Error:</div>
            <div className="text-xs text-red-600">{subStep.error}</div>
          </div>
        )}

        {/* Thinking Process */}
        {subStep.thinking && (
          <ThinkingSection
            thinking={subStep.thinking}
            agentName={subStep.agentName}
            isExpanded={showThinking}
            onToggle={() => setShowThinking(!showThinking)}
          />
        )}
      </CardContent>
    </Card>
  );
}

export function AgentSubSteps({ 
  subSteps, 
  isExpanded = false, 
  className = "",
  onRerunAgent
}: AgentSubStepsProps) {
  const [expandedView, setExpandedView] = useState(isExpanded);

  if (!subSteps || subSteps.length === 0) {
    return null;
  }

  const completedSteps = subSteps.filter(step => step.status === 'completed').length;
  const totalSteps = subSteps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className={`agent-substeps ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium">Multi-Agent Process</h3>
          <Badge variant="outline" className="text-xs">
            {completedSteps}/{totalSteps} agents
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpandedView(!expandedView)}
          className="h-7 px-2 text-xs"
        >
          {expandedView ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
          {expandedView ? 'Collapse' : 'Expand'}
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Agent Steps */}
      <div className="space-y-3">
        {subSteps.map((subStep, index) => (
          <div key={subStep.id}>
            <AgentSubStepCard subStep={subStep} onRerunAgent={onRerunAgent} />
            {index < subSteps.length - 1 && (
              <div className="flex justify-center my-2">
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentSubSteps;