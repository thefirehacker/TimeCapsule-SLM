"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SkipBack,
  SkipForward,
  Eye,
  Target,
  Video,
  FileText,
  File,
  Network,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AIFrame } from "../types/frames";

interface FrameNavigationProps {
  frames: AIFrame[];
  currentFrameIndex: number;
  onFrameIndexChange: (index: number) => void;
  isCreationMode: boolean;
  onCreateFrame?: () => void;
  className?: string;
}

export const FrameNavigation: React.FC<FrameNavigationProps> = ({
  frames,
  currentFrameIndex,
  onFrameIndexChange,
  isCreationMode,
  onCreateFrame,
  className = "",
}) => {
  const currentFrame = frames[currentFrameIndex];

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return; // Don't interfere with input fields
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          if (currentFrameIndex > 0) {
            onFrameIndexChange(currentFrameIndex - 1);
          }
          break;
        case "ArrowRight":
          event.preventDefault();
          if (currentFrameIndex < frames.length - 1) {
            onFrameIndexChange(currentFrameIndex + 1);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentFrameIndex, frames.length, onFrameIndexChange]);

  // Get frame icon based on attachment type
  const getFrameIcon = (frame: AIFrame) => {
    if (frame.attachment?.type === "video") {
      return <Video className="h-4 w-4" />;
    } else if (frame.attachment?.type === "text") {
      return <FileText className="h-4 w-4" />;
    } else if (frame.attachment?.type === "pdf") {
      return <File className="h-4 w-4" />;
    }
    return <Target className="h-4 w-4" />;
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Frame Navigation
          </span>
          {frames.length > 0 && (
            <Badge variant="outline">
              {currentFrameIndex + 1} of {frames.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Navigation Controls */}
        {frames.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFrameIndexChange(0)}
              disabled={currentFrameIndex === 0}
              className="flex-1"
            >
              <SkipBack className="h-4 w-4 mr-1" />
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFrameIndexChange(Math.max(0, currentFrameIndex - 1))}
              disabled={currentFrameIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFrameIndexChange(Math.min(frames.length - 1, currentFrameIndex + 1))}
              disabled={currentFrameIndex === frames.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFrameIndexChange(frames.length - 1)}
              disabled={currentFrameIndex === frames.length - 1}
              className="flex-1"
            >
              Last
              <SkipForward className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Current Frame Info */}
        {currentFrame && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getFrameIcon(currentFrame)}
              <span className="font-medium">Frame {currentFrameIndex + 1}</span>
              {currentFrame.isGenerated && (
                <Badge variant="secondary" className="text-xs">
                  AI Generated
                </Badge>
              )}
            </div>
            <h4 className="font-medium text-sm mb-1 line-clamp-2">
              {currentFrame.title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-2">
              {currentFrame.goal}
            </p>
          </div>
        )}

        {/* Frame List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">All Frames</span>
            {isCreationMode && onCreateFrame && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCreateFrame}
                className="text-xs"
              >
                <Target className="h-3 w-3 mr-1" />
                New
              </Button>
            )}
          </div>
          
          <ScrollArea className="h-40">
            <div className="space-y-1">
              {frames.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No frames available</p>
                  {isCreationMode && onCreateFrame && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onCreateFrame}
                      className="mt-2"
                    >
                      Create First Frame
                    </Button>
                  )}
                </div>
              ) : (
                frames.map((frame, index) => (
                  <Button
                    key={frame.id}
                    variant={index === currentFrameIndex ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onFrameIndexChange(index)}
                    className="w-full justify-start text-left h-auto p-2"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-shrink-0">
                        {getFrameIcon(frame)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">
                            Frame {index + 1}
                          </span>
                          {frame.isGenerated && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              AI
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs opacity-75 line-clamp-2">
                          {frame.title}
                        </div>
                      </div>
                      {index === currentFrameIndex && (
                        <Network className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Keyboard Navigation:</span>
          </div>
          <div className="flex items-center justify-between">
            <span>← → Arrow Keys</span>
            <span>Navigate frames</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 