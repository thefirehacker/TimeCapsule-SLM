"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  RotateCcw,
  MessageSquare,
  FileText,
  Settings,
  Target,
  Zap,
} from "lucide-react";
import {
  UserFeedback,
  validateFeedbackCompleteness,
} from "@/lib/multi-agent/interfaces/Feedback";

interface RerunFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRerun: (agentName: string, feedback: UserFeedback) => Promise<void>;
  agentName: string;
  agentStep?: any; // The AgentSubStep data
}

export function RerunFeedbackModal({
  isOpen,
  onClose,
  onRerun,
  agentName,
  agentStep,
}: RerunFeedbackModalProps) {
  const [feedback, setFeedback] = useState<UserFeedback>({
    issue: "",
    correction: "",
    severity: "minor",
    correctionType: "other",
    affectedItems: [],
    specificInstructions: "",
    additionalContext: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState({
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[],
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFeedback({
        issue: "",
        correction: "",
        severity: "minor",
        correctionType: "other",
        affectedItems: [],
        specificInstructions: "",
        additionalContext: "",
      });
      setValidation({ isValid: true, errors: [], warnings: [] });
    }
  }, [isOpen]);

  // Validate feedback in real-time
  useEffect(() => {
    const validationResult = validateFeedbackCompleteness(feedback);
    setValidation(validationResult);
  }, [feedback]);

  const handleSubmit = async () => {
    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onRerun(agentName, feedback);
      onClose();
    } catch (error) {
      console.error("Failed to rerun agent:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAgentDescription = () => {
    if (agentName.includes("DataInspector")) {
      return {
        icon: FileText,
        description: "Document Intelligence Engine",
        specialty: "Analyzes and filters documents for relevance",
        commonIssues: [
          "Incorrectly classified documents as relevant/irrelevant",
          "Missed important documents in filtering",
          "Applied wrong document type criteria",
          "Over-filtering removed too many documents",
        ],
      };
    } else if (agentName.includes("PatternGenerator")) {
      return {
        icon: Target,
        description: "Pattern Recognition System",
        specialty: "Identifies extraction patterns and strategies",
        commonIssues: [
          "Generated patterns that missed key information",
          "Created overly broad or narrow patterns",
          "Failed to identify document structure patterns",
          "Missed specific data format requirements",
        ],
      };
    } else if (agentName.includes("Extractor")) {
      return {
        icon: Zap,
        description: "Information Extraction Unit",
        specialty: "Extracts relevant data from sources",
        commonIssues: [
          "Extracted wrong or incomplete information",
          "Missed key data points in documents",
          "Applied extraction patterns incorrectly",
          "Failed to handle specific document formats",
        ],
      };
    } else if (agentName.includes("Synthesis")) {
      return {
        icon: Settings,
        description: "Knowledge Synthesis Engine",
        specialty: "Combines information into coherent insights",
        commonIssues: [
          "Failed to connect related information properly",
          "Missed important context in synthesis",
          "Generated unclear or incomplete conclusions",
          "Overlooked key insights from data",
        ],
      };
    }
    return {
      icon: Settings,
      description: "Research Agent",
      specialty: "Specialized analysis and processing",
      commonIssues: [
        "Processing logic needs adjustment",
        "Output format or content issues",
        "Context understanding problems",
        "Performance or accuracy concerns",
      ],
    };
  };

  const agentInfo = getAgentDescription();
  const IconComponent = agentInfo.icon;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Rerun {agentName}</CardTitle>
                <CardDescription>
                  {agentInfo.description} • {agentInfo.specialty}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Agent Performance Overview */}
          {agentStep && (
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Current Agent Status
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-foreground">
                    {agentStep.status === "completed"
                      ? "✓"
                      : agentStep.status === "failed"
                        ? "✗"
                        : "⏳"}
                  </div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">
                    {agentStep.progress || 0}%
                  </div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">
                    {agentStep.duration
                      ? `${(agentStep.duration / 1000).toFixed(1)}s`
                      : "N/A"}
                  </div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
              </div>
            </div>
          )}

          {/* Common Issues */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">
              Common Issues for {agentName}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {agentInfo.commonIssues.map((issue, idx) => (
                <button
                  key={idx}
                  onClick={() => setFeedback((prev) => ({ ...prev, issue }))}
                  className="text-left p-3 text-sm bg-muted/20 hover:bg-muted/40 border border-border rounded-lg transition-colors"
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              What went wrong with this agent? *
            </label>
            <textarea
              value={feedback.issue}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, issue: e.target.value }))
              }
              placeholder="Describe the specific issue you noticed with this agent's performance..."
              className="w-full h-24 p-3 text-sm border border-border rounded-lg bg-background resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Correction Instructions */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              How should this be corrected? *
            </label>
            <textarea
              value={feedback.correction}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, correction: e.target.value }))
              }
              placeholder="Provide specific instructions on how the agent should behave differently..."
              className="w-full h-24 p-3 text-sm border border-border rounded-lg bg-background resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Correction Type and Severity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Type of Correction
              </label>
              <select
                value={feedback.correctionType}
                onChange={(e) =>
                  setFeedback((prev) => ({
                    ...prev,
                    correctionType: e.target
                      .value as UserFeedback["correctionType"],
                  }))
                }
                className="w-full p-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="classification">Classification</option>
                <option value="extraction">Extraction</option>
                <option value="filtering">Filtering</option>
                <option value="analysis">Analysis</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Issue Severity
              </label>
              <select
                value={feedback.severity}
                onChange={(e) =>
                  setFeedback((prev) => ({
                    ...prev,
                    severity: e.target.value as UserFeedback["severity"],
                  }))
                }
                className="w-full p-2 text-sm border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="minor">Minor</option>
                <option value="major">Major</option>
              </select>
            </div>
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Additional Instructions (Optional)
            </label>
            <textarea
              value={feedback.specificInstructions}
              onChange={(e) =>
                setFeedback((prev) => ({
                  ...prev,
                  specificInstructions: e.target.value,
                }))
              }
              placeholder="Any additional context or specific instructions for the agent..."
              className="w-full h-20 p-3 text-sm border border-border rounded-lg bg-background resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Validation Feedback */}
          {!validation.isValid && (validation.errors?.length || 0) > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-destructive text-sm font-semibold mb-2">
                <AlertTriangle className="w-4 h-4" />
                Please fix these issues:
              </div>
              <ul className="space-y-1 text-sm text-destructive">
                {validation.errors?.map((error, idx) => (
                  <li key={idx}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {validation.warnings && validation.warnings.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold mb-2">
                <Info className="w-4 h-4" />
                Suggestions:
              </div>
              <ul className="space-y-1 text-sm text-amber-600">
                {validation.warnings.map((warning, idx) => (
                  <li key={idx}>• {warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Rerun Impact Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
              <RotateCcw className="w-4 h-4" />
              Rerun Impact
            </div>
            <p className="text-sm text-foreground">
              This will rerun <strong>{agentName}</strong> and all agents that
              come after it in the pipeline. Your feedback will be used to
              improve the agent's performance.
            </p>
          </div>
        </CardContent>

        {/* Actions */}
        <div className="border-t border-border p-4 flex justify-between items-center">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!validation.isValid || isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Rerunning...
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 mr-2" />
                Rerun Agent
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

