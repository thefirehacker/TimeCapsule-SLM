import React, { useEffect, useState } from "react";
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
import { Layers, Plus, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface Chapter {
  id: string;
  title: string;
  description: string;
  color: string;
  order: number;
  frameIds: string[];
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  createdAt: string;
  updatedAt: string;
  isCollapsed?: boolean;
  conceptIds?: string[];
}

interface AIFrame {
  id: string;
  title: string;
  goal: string;
  chapterId?: string;
  parentFrameId?: string;
}

interface ChapterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingChapter: Chapter | null;
  chapterFormData: {
    title: string;
    description: string;
    color: string;
    conceptIds: string[];
    linkSequentially: boolean;
  };
  setChapterFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      color: string;
      conceptIds: string[];
      linkSequentially: boolean;
    }>
  >;
  selectedFrameIds: string[];
  frames: AIFrame[];
  availableConcepts: string[];
  onFrameSelection: (frameId: string, isSelected: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onCreateChapter: () => void | Promise<void>;
  onEditChapter: () => void | Promise<void>;
  onCreateFrameInline?: (options: {
    title: string;
    goal?: string;
    chapterId?: string;
  }) => Promise<AIFrame | void> | AIFrame | void;
  onCancel?: () => void;
}

const colorOptions = [
  { name: "Purple", value: "#8B5CF6", bg: "bg-purple-500" },
  { name: "Blue", value: "#3B82F6", bg: "bg-blue-500" },
  { name: "Green", value: "#10B981", bg: "bg-emerald-500" },
  { name: "Red", value: "#EF4444", bg: "bg-red-500" },
  { name: "Yellow", value: "#F59E0B", bg: "bg-amber-500" },
  { name: "Indigo", value: "#6366F1", bg: "bg-indigo-500" },
  { name: "Pink", value: "#EC4899", bg: "bg-pink-500" },
  { name: "Teal", value: "#14B8A6", bg: "bg-teal-500" },
];

export function ChapterDialog({
  open,
  onOpenChange,
  editingChapter,
  chapterFormData,
  setChapterFormData,
  selectedFrameIds,
  frames,
  availableConcepts,
  onFrameSelection,
  onSelectAll,
  onDeselectAll,
  onCreateChapter,
  onEditChapter,
  onCreateFrameInline,
  onCancel,
}: ChapterDialogProps) {
  const isEditing = !!editingChapter;

  const showCreateFrameActions = typeof onCreateFrameInline === 'function';
  const [showCreateFrameForm, setShowCreateFrameForm] = useState(false);
  const [newFrameTitle, setNewFrameTitle] = useState("");
  const [newFrameGoal, setNewFrameGoal] = useState("");
  const [isCreatingFrame, setIsCreatingFrame] = useState(false);
  const [localFrames, setLocalFrames] = useState<AIFrame[]>(frames);

  useEffect(() => {
    setLocalFrames(prev => {
      const latestMap = new Map(frames.map(frame => [frame.id, frame]));

      prev.forEach(frame => {
        if (!latestMap.has(frame.id) && selectedFrameIds.includes(frame.id)) {
          latestMap.set(frame.id, frame);
        }
      });

      return Array.from(latestMap.values());
    });
  }, [frames, selectedFrameIds]);

  const handleInlineFrameCreate = async () => {
    if (!onCreateFrameInline) return;
    const trimmedTitle = newFrameTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    setIsCreatingFrame(true);
    try {
      const result = await onCreateFrameInline({
        title: trimmedTitle,
        goal: newFrameGoal.trim() || undefined,
        chapterId: editingChapter?.id,
      });

      const createdFrame = (result as AIFrame | undefined) || undefined;
      if (createdFrame && createdFrame.id) {
        setLocalFrames(prev => {
          const exists = prev.some(frame => frame.id === createdFrame.id);
          return exists ? prev : [...prev, createdFrame];
        });
        onFrameSelection(createdFrame.id, true);
      }

      setNewFrameTitle("");
      setNewFrameGoal("");
      setShowCreateFrameForm(false);
    } catch (error) {
      console.error("Inline frame creation failed:", error);
    } finally {
      setIsCreatingFrame(false);
    }
  };

  const handleCancelInlineFrame = () => {
    setShowCreateFrameForm(false);
    setNewFrameTitle("");
    setNewFrameGoal("");
  };

  const normalizeFramesForDisplay = () => {
    const frameMap = new Map(localFrames.map((frame) => [frame.id, frame]));
    const baseFrames = (isEditing
      ? localFrames
      : localFrames.filter(
          (frame) => !frame.chapterId || selectedFrameIds.includes(frame.id)
        )) as AIFrame[];

    const ensuredSelected = selectedFrameIds
      .map((id) => frameMap.get(id))
      .filter((frame): frame is AIFrame => Boolean(frame));

    const mergedIds = new Set(baseFrames.map((frame) => frame.id));
    const mergedFrames = [...baseFrames];
    ensuredSelected.forEach((frame) => {
      if (!mergedIds.has(frame.id)) {
        mergedIds.add(frame.id);
        mergedFrames.push(frame);
      }
    });

    return mergedFrames;
  };

  const unassignedFrames = normalizeFramesForDisplay();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            {isEditing ? "Edit Chapter" : "Create New Chapter"}
          </DialogTitle>
          <DialogDescription>
            Configure chapter details, concept attachments, and frame grouping.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Chapter Title</Label>
              <Input
                id="title"
                value={chapterFormData.title}
                onChange={(e) =>
                  setChapterFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Enter chapter title..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={chapterFormData.description}
                onChange={(e) =>
                  setChapterFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe what this chapter covers..."
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Color Selection */}
            <div>
              <Label>Chapter Color</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() =>
                      setChapterFormData((prev) => ({
                        ...prev,
                        color: color.value,
                      }))
                    }
                    className={`w-8 h-8 rounded-full ${color.bg} border-2 transition-all ${
                      chapterFormData.color === color.value
                        ? "border-slate-900 dark:border-white shadow-lg scale-110"
                        : "border-slate-300 dark:border-slate-600 hover:scale-105"
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Concept Attachments</Label>
              <Input
                value={chapterFormData.conceptIds.join(", ")}
                onChange={(e) => {
                  const concepts = e.target.value
                    .split(",")
                    .map((concept) => concept.trim())
                    .filter((concept) => concept.length > 0);
                  setChapterFormData((prev) => ({
                    ...prev,
                    conceptIds: concepts,
                  }));
                }}
                placeholder="concept-a, concept-b"
                className="mt-1"
              />
              {availableConcepts.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {availableConcepts.map((concept) => {
                    const isSelected = chapterFormData.conceptIds.includes(
                      concept
                    );
                    return (
                      <Badge
                        key={concept}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          setChapterFormData((prev) => {
                            const alreadySelected = prev.conceptIds.includes(
                              concept
                            );
                            if (alreadySelected) {
                              return {
                                ...prev,
                                conceptIds: prev.conceptIds.filter(
                                  (id) => id !== concept
                                ),
                              };
                            }
                            return {
                              ...prev,
                              conceptIds: [...prev.conceptIds, concept],
                            };
                          });
                        }}
                      >
                        {concept}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Select Frames to Group</Label>
                <div className="flex gap-2">
                  {showCreateFrameActions && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        showCreateFrameForm
                          ? handleCancelInlineFrame()
                          : setShowCreateFrameForm(true)
                      }
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {showCreateFrameForm ? "Cancel" : "New Frame"}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onSelectAll}
                    disabled={unassignedFrames.length === 0}
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onDeselectAll}
                    disabled={selectedFrameIds.length === 0}
                  >
                    Deselect All
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20 p-3">
                <div className="flex-1">
                  <Label htmlFor="link-sequentially" className="text-sm font-medium">
                    Sequential linking
                  </Label>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Automatically connect selected frames in order so navigation flows like
                    Frame&nbsp;1 → Frame&nbsp;2.
                  </p>
                </div>
                <Switch
                  id="link-sequentially"
                  checked={chapterFormData.linkSequentially}
                  onCheckedChange={(checked) =>
                    setChapterFormData((prev) => ({
                      ...prev,
                      linkSequentially: checked,
                    }))
                  }
                  aria-label="Link selected frames sequentially"
                />
              </div>


              {showCreateFrameActions && showCreateFrameForm && (
                <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-3 space-y-3">
                  <div className="grid gap-2">
                    <Label htmlFor="inline-frame-title">Frame Title</Label>
                    <Input
                      id="inline-frame-title"
                      value={newFrameTitle}
                      onChange={(e) => setNewFrameTitle(e.target.value)}
                      placeholder="e.g., Frame Introduction"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="inline-frame-goal">Learning Goal (optional)</Label>
                    <Textarea
                      id="inline-frame-goal"
                      rows={2}
                      value={newFrameGoal}
                      onChange={(e) => setNewFrameGoal(e.target.value)}
                      placeholder="What should learners achieve in this frame?"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelInlineFrame}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleInlineFrameCreate}
                      disabled={isCreatingFrame || !newFrameTitle.trim()}
                    >
                      {isCreatingFrame ? "Creating..." : "Create Frame"}
                    </Button>
                  </div>
                </div>
              )}

              <div className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-2">
                {unassignedFrames.length === 0 ? (
                  <div className="text-center text-slate-500 py-4">
                    <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No available frames</p>
                    <p className="text-sm">
                      {isEditing
                        ? showCreateFrameActions
                          ? "Create a new frame or adjust chapter assignments from the graph."
                          : "All frames are hidden"
                        : showCreateFrameActions
                          ? "Use the New Frame button to create one."
                          : "All frames are already in chapters"}
                    </p>
                  </div>
                ) : (
                  unassignedFrames.map((frame) => {
                    const isSelected = selectedFrameIds.includes(frame.id);
                    const assignedElsewhere =
                      !!frame.chapterId && frame.chapterId !== editingChapter?.id;

                    return (
                      <div
                        key={frame.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
                        }`}
                        onClick={() => onFrameSelection(frame.id, !isSelected)}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isSelected
                              ? "bg-blue-500 border-blue-500"
                              : "border-slate-300 dark:border-slate-600"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{frame.title}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {frame.goal}
                          </div>
                        </div>
                        {assignedElsewhere && (
                          <Badge variant="outline" className="text-xs">
                            Assigned to another chapter
                          </Badge>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {selectedFrameIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {selectedFrameIds.length} frame
                    {selectedFrameIds.length !== 1 ? "s" : ""} selected
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onCancel?.();
                onOpenChange(false);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={isEditing ? onEditChapter : onCreateChapter}
              disabled={!chapterFormData.title.trim()}
            >
              {isEditing ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Update
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
