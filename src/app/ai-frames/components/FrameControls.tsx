"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Save,
  Upload,
  Download,
  RefreshCcw,
  Database,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FrameControlsProps } from "../types/frames";

export const FrameControls: React.FC<FrameControlsProps> = ({
  hasUnsavedChanges,
  isSaving,
  frameCount,
  onSave,
  onLoad,
  onExport,
  onClear,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<string | null>(null);
  const [saveProgress, setSaveProgress] = useState(0);

  // Handle save with progress
  const handleSave = useCallback(async () => {
    if (isSaving) return;
    
    setIsLoading(true);
    setSaveProgress(0);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setSaveProgress(prev => Math.min(prev + 20, 90));
      }, 100);

      const success = await onSave();
      
      clearInterval(progressInterval);
      setSaveProgress(100);
      
      if (success) {
        setLastSaveTime(new Date().toLocaleTimeString());
      }
      
      setTimeout(() => setSaveProgress(0), 1000);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isSaving, onSave]);

  // Handle load
  const handleLoad = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onLoad();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onLoad]);

  // Handle export
  const handleExport = useCallback((format: "json" | "csv" = "json") => {
    try {
      const success = onExport(format);
      if (success) {
        console.log(`✅ Frames exported as ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  }, [onExport]);

  // Handle clear
  const handleClear = useCallback(() => {
    onClear();
    setLastSaveTime(null);
  }, [onClear]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Frame Management
          </span>
          <Badge variant={hasUnsavedChanges ? "destructive" : "secondary"}>
            {hasUnsavedChanges ? "Unsaved Changes" : "All Saved"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Section */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Frames:</span>
              <Badge variant="outline">{frameCount}</Badge>
            </div>
            {lastSaveTime && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Last saved: {lastSaveTime}
              </div>
            )}
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertCircle className="h-4 w-4" />
              Unsaved changes
            </div>
          )}
        </div>

        {/* Save Progress */}
        {saveProgress > 0 && saveProgress < 100 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving frames...
            </div>
            <Progress value={saveProgress} className="h-2" />
          </div>
        )}

        {/* Primary Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading || (!hasUnsavedChanges && frameCount === 0)}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Frames
              </>
            )}
          </Button>
          
          <Button
            onClick={handleLoad}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Load Frames
              </>
            )}
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleExport("json")}
            disabled={frameCount === 0}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          
          <Button
            onClick={() => handleExport("csv")}
            disabled={frameCount === 0}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={frameCount === 0}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Frames</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear all frames? This action cannot be undone.
                  {hasUnsavedChanges && (
                    <span className="block mt-2 text-amber-600 font-medium">
                      ⚠️ You have unsaved changes that will be lost.
                    </span>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClear}>
                  Clear All Frames
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Help Text */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Save: Store frames to local storage and sync with Knowledge Base</p>
          <p>• Load: Retrieve frames from storage with automatic fallback</p>
          <p>• Export: Download frames as JSON or CSV format</p>
          <p>• Clear: Remove all frames from memory (requires confirmation)</p>
        </div>
      </CardContent>
    </Card>
  );
}; 