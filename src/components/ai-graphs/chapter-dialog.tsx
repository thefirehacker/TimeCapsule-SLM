import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layers, Plus, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
}

interface AIFrame {
  id: string;
  title: string;
  goal: string;
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
  };
  setChapterFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      color: string;
    }>
  >;
  selectedFrameIds: string[];
  frames: AIFrame[];
  onFrameSelection: (frameId: string, isSelected: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onCreateChapter: () => void;
  onEditChapter: () => void;
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
  onFrameSelection,
  onSelectAll,
  onDeselectAll,
  onCreateChapter,
  onEditChapter,
}: ChapterDialogProps) {
  const unassignedFrames = frames.filter((frame) => !frame.parentFrameId);
  const isEditing = !!editingChapter;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            {isEditing ? "Edit Chapter" : "Create New Chapter"}
          </DialogTitle>
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

          {/* Frame Selection (only for creation) */}
          {!isEditing && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Select Frames to Group</Label>
                <div className="flex gap-2">
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

              <div className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-2">
                {unassignedFrames.length === 0 ? (
                  <div className="text-center text-slate-500 py-4">
                    <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No unassigned frames available</p>
                    <p className="text-sm">
                      All frames are already in chapters
                    </p>
                  </div>
                ) : (
                  unassignedFrames.map((frame) => (
                    <div
                      key={frame.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedFrameIds.includes(frame.id)
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
                      }`}
                      onClick={() =>
                        onFrameSelection(
                          frame.id,
                          !selectedFrameIds.includes(frame.id)
                        )
                      }
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedFrameIds.includes(frame.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {selectedFrameIds.includes(frame.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{frame.title}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {frame.goal}
                        </div>
                      </div>
                    </div>
                  ))
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
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={isEditing ? onEditChapter : onCreateChapter}
              disabled={
                !chapterFormData.title.trim() ||
                (!isEditing && selectedFrameIds.length === 0)
              }
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
