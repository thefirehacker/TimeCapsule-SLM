"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Edit3,
  Video,
  BookOpen,
  Target,
  Clock,
  FileText,
  ChevronDown,
  Save,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AIFrame, FrameManagerProps } from "../types/frames";
import { validateFrameData } from "../lib/frameValidation";
import { cleanupFrameData } from "../lib/frameStorage";

export const FrameManager: React.FC<FrameManagerProps> = ({
  frames,
  currentFrameIndex,
  onFrameChange,
  onFramesUpdate,
  isLoading = false,
  error = null,
}) => {
  const [editingFrame, setEditingFrame] = useState<AIFrame | null>(null);
  const [showFrameEditor, setShowFrameEditor] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const currentFrame = frames[currentFrameIndex] || null;

  // Handle frame editing
  const handleEditFrame = useCallback((frame: AIFrame) => {
    setEditingFrame({ ...frame });
    setValidationErrors([]);
    setShowFrameEditor(true);
  }, []);

  // Handle save frame
  const handleSaveFrame = useCallback(() => {
    if (!editingFrame) return;

    // Validate frame data
    const validation = validateFrameData(editingFrame, frames);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Clean up frame data
    const cleanedFrame = cleanupFrameData(editingFrame);
    
    // Update frame in the list
    onFrameChange(cleanedFrame);
    
    // Close editor
    setShowFrameEditor(false);
    setEditingFrame(null);
    setValidationErrors([]);
  }, [editingFrame, frames, onFrameChange]);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setShowFrameEditor(false);
    setEditingFrame(null);
    setValidationErrors([]);
  }, []);

  // Handle field changes
  const handleFieldChange = useCallback((field: keyof AIFrame, value: any) => {
    if (!editingFrame) return;
    
    setEditingFrame(prev => prev ? {
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    } : null);
  }, [editingFrame]);

  // Handle concepts change
  const handleConceptsChange = useCallback((concepts: string) => {
    if (!editingFrame) return;

    const conceptsArray = concepts
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c);
    handleFieldChange('aiConcepts', conceptsArray);
    handleFieldChange('conceptIds', conceptsArray);
  }, [editingFrame, handleFieldChange]);

  // Render frame display
  const renderFrameDisplay = () => {
    if (!currentFrame) {
      return (
        <Card className="w-full">
          <CardContent className="p-6">
            <p className="text-gray-500 text-center">No frames available</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {currentFrame.title}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditFrame(currentFrame)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Goal */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Learning Goal
            </Label>
            <p className="text-sm text-gray-700">{currentFrame.goal}</p>
          </div>

          {/* Information Text */}
          {currentFrame.informationText && (
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Framework
              </Label>
              <p className="text-sm text-gray-700">{currentFrame.informationText}</p>
            </div>
          )}

          {/* Video URL */}
          {currentFrame.videoUrl && (
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video
              </Label>
              <p className="text-sm text-blue-600 break-all">
                {currentFrame.videoUrl}
              </p>
            </div>
          )}

          {/* After Video Text */}
          {currentFrame.afterVideoText && (
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Reflection
              </Label>
              <p className="text-sm text-gray-700">{currentFrame.afterVideoText}</p>
            </div>
          )}

          {/* AI Concepts */}
          {(() => {
            const frameConcepts =
              currentFrame.conceptIds && currentFrame.conceptIds.length > 0
                ? currentFrame.conceptIds
                : currentFrame.aiConcepts;
            if (!frameConcepts || frameConcepts.length === 0) {
              return null;
            }

            return (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Concept Attachments</Label>
                <div className="flex flex-wrap gap-2">
                  {frameConcepts.map((concept, index) => (
                    <Badge key={index} variant="secondary">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 border-t pt-2">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated: {new Date(currentFrame.updatedAt).toLocaleString()}
            </span>
            <span>Order: {currentFrame.order}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render frame editor dialog
  const renderFrameEditor = () => {
    if (!editingFrame) return null;

    return (
      <Dialog open={showFrameEditor} onOpenChange={setShowFrameEditor}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Frame</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[500px]">
            <div className="space-y-4 p-1">
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </p>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingFrame.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Enter frame title"
                />
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <Label htmlFor="goal">Learning Goal</Label>
                <Textarea
                  id="goal"
                  value={editingFrame.goal}
                  onChange={(e) => handleFieldChange('goal', e.target.value)}
                  placeholder="Enter learning goal"
                  rows={3}
                />
              </div>

              {/* Information Text */}
              <div className="space-y-2">
                <Label htmlFor="informationText">Framework</Label>
                <Textarea
                  id="informationText"
                  value={editingFrame.informationText}
                  onChange={(e) => handleFieldChange('informationText', e.target.value)}
                  placeholder="Enter framework information"
                  rows={4}
                />
              </div>

              {/* Video URL */}
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={editingFrame.videoUrl}
                  onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
                  placeholder="Enter video URL"
                />
              </div>

              {/* After Video Text */}
              <div className="space-y-2">
                <Label htmlFor="afterVideoText">Reflection</Label>
                <Textarea
                  id="afterVideoText"
                  value={editingFrame.afterVideoText}
                  onChange={(e) => handleFieldChange('afterVideoText', e.target.value)}
                  placeholder="Enter reflection notes"
                  rows={3}
                />
              </div>

              {/* AI Concepts */}
              <div className="space-y-2">
                <Label htmlFor="aiConcepts">Concept Attachments (comma-separated)</Label>
                <Input
                  id="aiConcepts"
                  value={(
                    editingFrame.conceptIds && editingFrame.conceptIds.length > 0
                      ? editingFrame.conceptIds
                      : editingFrame.aiConcepts
                  ).join(', ')}
                  onChange={(e) => handleConceptsChange(e.target.value)}
                  placeholder="concept1, concept2, concept3"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editingFrame.notes || ''}
                  onChange={(e) => handleFieldChange('notes', e.target.value)}
                  placeholder="Additional notes"
                  rows={2}
                />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveFrame}>
              <Save className="h-4 w-4 mr-2" />
              Save Frame
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading frames...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-red-600">
            <span>Error: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      {renderFrameDisplay()}
      {renderFrameEditor()}
    </div>
  );
}; 
