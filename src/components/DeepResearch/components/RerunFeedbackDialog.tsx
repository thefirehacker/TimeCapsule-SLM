import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserFeedback, validateFeedbackCompleteness } from '@/lib/multi-agent/interfaces/Feedback';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface RerunFeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: UserFeedback) => void;
  agentName: string;
  context?: {
    lastError?: string;
    lastResult?: any;
  };
}

export function RerunFeedbackDialog({
  isOpen,
  onClose,
  onSubmit,
  agentName,
  context
}: RerunFeedbackDialogProps) {
  const [feedback, setFeedback] = useState<UserFeedback>({
    issue: '',
    correction: '',
    specificInstructions: '',
    affectedItems: [],
    severity: 'minor',
    correctionType: 'classification',
    additionalContext: ''
  });
  
  const [validation, setValidation] = useState<{
    errors?: string[];
    warnings?: string[];
    suggestions?: string[];
  }>({});
  
  const [affectedItemsText, setAffectedItemsText] = useState('');

  const handleSubmit = () => {
    // Validate feedback
    const validationResult = validateFeedbackCompleteness(feedback);
    
    if (!validationResult.isValid) {
      setValidation({
        errors: validationResult.errors,
        warnings: validationResult.warnings,
        suggestions: validationResult.suggestions
      });
      return;
    }
    
    // Parse affected items from text
    const affectedItems = affectedItemsText
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Submit feedback
    onSubmit({
      ...feedback,
      affectedItems
    });
    
    // Reset and close
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setFeedback({
      issue: '',
      correction: '',
      specificInstructions: '',
      affectedItems: [],
      severity: 'minor',
      correctionType: 'classification',
      additionalContext: ''
    });
    setAffectedItemsText('');
    setValidation({});
  };
  
  const handleCancel = () => {
    resetForm();
    onClose();
  };
  
  // Get agent-specific guidance
  const getAgentGuidance = () => {
    const guidance: Record<string, string> = {
      'DataInspector': 'Describe which documents were incorrectly classified and how they should be categorized.',
      'PatternGenerator': 'Explain which patterns were incorrect or missing and what patterns should be detected.',
      'ExtractionAgent': 'Specify which data was incorrectly extracted and what the correct extraction should be.',
      'SynthesisAgent': 'Describe issues with the synthesis and how the information should be combined.',
    };
    
    return guidance[agentName] || 'Describe the issue and how it should be corrected.';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rerun {agentName} with Corrections</DialogTitle>
          <DialogDescription>
            Provide feedback to help the agent correct its analysis. {getAgentGuidance()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Issue Description */}
          <div className="space-y-2">
            <Label htmlFor="issue">
              What issue did you find? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="issue"
              placeholder="Example: Step 11 incorrectly classified a CV as relevant to language model improvements"
              value={feedback.issue}
              onChange={(e) => setFeedback({ ...feedback, issue: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
          
          {/* Correction Instructions */}
          <div className="space-y-2">
            <Label htmlFor="correction">
              How should it be corrected? <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="correction"
              placeholder="Example: This CV should be marked as irrelevant - only technical documents about language models should be considered relevant"
              value={feedback.correction}
              onChange={(e) => setFeedback({ ...feedback, correction: e.target.value })}
              className="min-h-[80px]"
            />
          </div>
          
          {/* Correction Type */}
          <div className="space-y-2">
            <Label htmlFor="correctionType">Correction Type</Label>
            <Select
              value={feedback.correctionType}
              onValueChange={(value) => setFeedback({ ...feedback, correctionType: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select correction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classification">Classification Error</SelectItem>
                <SelectItem value="extraction">Extraction Error</SelectItem>
                <SelectItem value="filtering">Filtering Error</SelectItem>
                <SelectItem value="analysis">Analysis Error</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Severity */}
          <div className="space-y-2">
            <Label>Severity</Label>
            <RadioGroup
              value={feedback.severity}
              onValueChange={(value) => setFeedback({ ...feedback, severity: value as 'minor' | 'major' })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minor" id="minor" />
                <Label htmlFor="minor" className="font-normal">
                  Minor - Small adjustment needed
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="major" id="major" />
                <Label htmlFor="major" className="font-normal">
                  Major - Significant correction required
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Affected Items */}
          <div className="space-y-2">
            <Label htmlFor="affectedItems">
              Affected Items (optional)
              <span className="text-sm text-muted-foreground ml-2">
                Comma-separated IDs or descriptions
              </span>
            </Label>
            <Textarea
              id="affectedItems"
              placeholder="Example: doc_12345, chunk_67890, or 'the CV document', 'the blog post'"
              value={affectedItemsText}
              onChange={(e) => setAffectedItemsText(e.target.value)}
              className="min-h-[60px]"
            />
          </div>
          
          {/* Additional Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specificInstructions">
              Additional Instructions (optional)
            </Label>
            <Textarea
              id="specificInstructions"
              placeholder="Any specific guidance for the agent..."
              value={feedback.specificInstructions}
              onChange={(e) => setFeedback({ ...feedback, specificInstructions: e.target.value })}
              className="min-h-[60px]"
            />
          </div>
          
          {/* Validation Messages */}
          {validation.errors && validation.errors.length > 0 && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {validation.errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          {validation.warnings && validation.warnings.length > 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {validation.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          {validation.suggestions && validation.suggestions.length > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {validation.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Rerun with Corrections
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}