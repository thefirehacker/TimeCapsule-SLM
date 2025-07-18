import { useState, useCallback, useEffect } from "react";
import { AIFrame } from "../types/frames";

export interface UseFrameEventsProps {
  frames: AIFrame[];
  onFramesChange: (frames: AIFrame[]) => void;
  onSaveFrames: (frames: AIFrame[]) => Promise<boolean>;
  onSyncToKB: (frames: AIFrame[]) => Promise<boolean>;
}

export const useFrameEvents = ({
  frames,
  onFramesChange,
  onSaveFrames,
  onSyncToKB,
}: UseFrameEventsProps) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState<string>("");

  // PRESERVATION: Event-driven frame updates
  const handleFrameChange = useCallback((updatedFrame: AIFrame) => {
    const updatedFrames = frames.map((frame) =>
      frame.id === updatedFrame.id ? updatedFrame : frame
    );
    
    // Mark as having unsaved changes
    setHasUnsavedChanges(true);
    
    // Broadcast the change
    onFramesChange(updatedFrames);
    
    // Dispatch frame update event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("frame-edited", {
          detail: {
            frameId: updatedFrame.id,
            frame: updatedFrame,
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  }, [frames, onFramesChange]);

  // PRESERVATION: Multiple frame updates
  const handleFramesUpdate = useCallback((updatedFrames: AIFrame[]) => {
    setHasUnsavedChanges(true);
    onFramesChange(updatedFrames);
    
    // Dispatch frames update event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("frames-updated", {
          detail: {
            frames: updatedFrames,
            source: "bulk-update",
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  }, [onFramesChange]);

  // PRESERVATION: Save functionality with change detection
  const handleSaveFrames = useCallback(async () => {
    if (isSaving || frames.length === 0) return false;
    
    try {
      setIsSaving(true);
      
      // Save frames to storage
      const saveSuccess = await onSaveFrames(frames);
      
      if (saveSuccess) {
        // Update snapshot to reflect saved state
        const currentSnapshot = JSON.stringify(frames.map(f => ({
          id: f.id,
          title: f.title,
          goal: f.goal,
          informationText: f.informationText,
          videoUrl: f.videoUrl,
          updatedAt: f.updatedAt,
        })));
        
        setLastSavedSnapshot(currentSnapshot);
        setHasUnsavedChanges(false);
        
        // Sync to Knowledge Base
        await onSyncToKB(frames);
        
        // Dispatch save success event
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("frames-saved", {
              detail: {
                frames: frames,
                frameCount: frames.length,
                timestamp: new Date().toISOString(),
              },
            })
          );
        }
        
        console.log("✅ Frames saved successfully:", frames.length);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("❌ Failed to save frames:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [frames, isSaving, onSaveFrames, onSyncToKB]);

  // PRESERVATION: Load functionality
  const handleLoadFrames = useCallback(async () => {
    // Dispatch load request event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("frames-load-requested", {
          detail: {
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  }, []);

  // PRESERVATION: Export functionality
  const handleExportFrames = useCallback((format: "json" | "csv" = "json") => {
    try {
      const exportData = {
        frames: frames,
        metadata: {
          exportedAt: new Date().toISOString(),
          frameCount: frames.length,
          format: format,
        },
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `ai-frames-export-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      // Dispatch export event
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("frames-exported", {
            detail: {
              format: format,
              frameCount: frames.length,
              timestamp: new Date().toISOString(),
            },
          })
        );
      }
      
      return true;
    } catch (error) {
      console.error("❌ Failed to export frames:", error);
      return false;
    }
  }, [frames]);

  // PRESERVATION: Change detection based on snapshot comparison
  useEffect(() => {
    if (frames.length === 0) {
      setHasUnsavedChanges(false);
      return;
    }
    
    const currentSnapshot = JSON.stringify(frames.map(f => ({
      id: f.id,
      title: f.title,
      goal: f.goal,
      informationText: f.informationText,
      videoUrl: f.videoUrl,
      updatedAt: f.updatedAt,
    })));
    
    if (lastSavedSnapshot && currentSnapshot !== lastSavedSnapshot) {
      setHasUnsavedChanges(true);
    }
  }, [frames, lastSavedSnapshot]);

  // PRESERVATION: Event listeners for cross-component communication
  useEffect(() => {
    const handleFrameEditedEvent = (event: CustomEvent) => {
      const { frameId, frame } = event.detail;
      handleFrameChange(frame);
    };
    
    const handleFramesUpdatedEvent = (event: CustomEvent) => {
      const { frames: updatedFrames, source } = event.detail;
      if (source !== "bulk-update") {
        handleFramesUpdate(updatedFrames);
      }
    };
    
    const handleSaveRequestEvent = () => {
      handleSaveFrames();
    };
    
    const handleLoadRequestEvent = () => {
      handleLoadFrames();
    };
    
    // Add event listeners
    window.addEventListener("frame-edited", handleFrameEditedEvent as EventListener);
    window.addEventListener("frames-updated", handleFramesUpdatedEvent as EventListener);
    window.addEventListener("save-frames-requested", handleSaveRequestEvent);
    window.addEventListener("load-frames-requested", handleLoadRequestEvent);
    
    // Cleanup
    return () => {
      window.removeEventListener("frame-edited", handleFrameEditedEvent as EventListener);
      window.removeEventListener("frames-updated", handleFramesUpdatedEvent as EventListener);
      window.removeEventListener("save-frames-requested", handleSaveRequestEvent);
      window.removeEventListener("load-frames-requested", handleLoadRequestEvent);
    };
  }, [handleFrameChange, handleFramesUpdate, handleSaveFrames, handleLoadFrames]);

  return {
    hasUnsavedChanges,
    isSaving,
    handleFrameChange,
    handleFramesUpdate,
    handleSaveFrames,
    handleLoadFrames,
    handleExportFrames,
  };
}; 