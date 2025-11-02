import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ConceptData {
  id: string;
  concept: string;
  description?: string;
  relatedFrameId: string;
}

interface AIFrame {
  id: string;
  title: string;
  conceptIds?: string[];
}

interface Chapter {
  id: string;
  title: string;
  conceptIds?: string[];
}

interface ConceptEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conceptData: ConceptData | null;
  frames: AIFrame[];
  chapters?: Chapter[];
  onSave: (updatedConcept: { concept: string; description?: string }) => void;
  onDelete?: () => void;
}

export function ConceptEditDialog({
  open,
  onOpenChange,
  conceptData,
  frames,
  chapters = [],
  onSave,
  onDelete,
}: ConceptEditDialogProps) {
  const [conceptName, setConceptName] = useState("");
  const [description, setDescription] = useState("");

  // Initialize form when concept data changes
  // CRITICAL FIX: Only depend on the actual values, not the entire object reference
  // This prevents infinite loops when callbacks are updated
  useEffect(() => {
    if (conceptData) {
      setConceptName(conceptData.concept || "");
      setDescription(conceptData.description || "");
    }
  }, [conceptData?.concept, conceptData?.description]);

  // Find frames that reference this concept
  const usedInFrames = frames.filter((frame) =>
    frame.conceptIds?.includes(conceptData?.concept || "")
  );

  // Find chapters that reference this concept
  const usedInChapters = chapters.filter((chapter) =>
    chapter.conceptIds?.includes(conceptData?.concept || "")
  );

  const handleSave = () => {
    if (!conceptName.trim()) {
      return;
    }

    onSave({
      concept: conceptName.trim(),
      description: description.trim(),
    });

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (onDelete && confirm("Are you sure you want to delete this concept? This action cannot be undone.")) {
      onDelete();
      onOpenChange(false);
    }
  };

  const isUsedInContent = usedInFrames.length > 0 || usedInChapters.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-yellow-600" />
            Edit Concept
          </DialogTitle>
          <DialogDescription>
            Update the concept name and description. Changes will be reflected everywhere this concept is used.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Concept Name */}
          <div className="space-y-2">
            <Label htmlFor="concept-name">Concept Name</Label>
            <Input
              id="concept-name"
              value={conceptName}
              onChange={(e) => setConceptName(e.target.value)}
              placeholder="Enter concept name..."
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="concept-description">Description</Label>
            <Textarea
              id="concept-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter concept description..."
              className="w-full min-h-[80px]"
            />
          </div>

          {/* Usage Information */}
          {isUsedInContent && (
            <div className="space-y-2">
              <Label>Used In</Label>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 space-y-2">
                {/* Frames */}
                {usedInFrames.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Frames ({usedInFrames.length})
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {usedInFrames.map((frame) => (
                        <Badge
                          key={frame.id}
                          variant="outline"
                          className="text-xs bg-purple-50 border-purple-300 text-purple-700 dark:bg-purple-900/20 dark:border-purple-700"
                        >
                          {frame.title || "Untitled Frame"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chapters */}
                {usedInChapters.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Chapters ({usedInChapters.length})
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {usedInChapters.map((chapter) => (
                        <Badge
                          key={chapter.id}
                          variant="outline"
                          className="text-xs bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700"
                        >
                          {chapter.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warning for name change */}
          {conceptName !== conceptData?.concept && isUsedInContent && (
            <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-sm text-yellow-800 dark:text-yellow-200">
                Changing the concept name will update it in all {usedInFrames.length + usedInChapters.length}{" "}
                location{usedInFrames.length + usedInChapters.length === 1 ? "" : "s"}.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <div>
            {onDelete && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                Delete Concept
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!conceptName.trim()}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
