import { useState, useCallback, useRef } from "react";
import { VectorStore } from "@/components/VectorStore/VectorStore";
import { getGraphStorageManager } from "@/lib/GraphStorageManager";
import { getMetadataManager } from "@/lib/MetadataManager";
import { debugFrames, debugStorage, debugSync } from "@/lib/debugUtils";
import { AIFrame } from "../types/frames";

export interface UseFrameStorageProps {
  vectorStore: VectorStore | null;
  vectorStoreInitialized: boolean;
  processingAvailable: boolean;
}

export const useFrameStorage = ({
  vectorStore,
  vectorStoreInitialized,
  processingAvailable,
}: UseFrameStorageProps) => {
  const [frames, setFrames] = useState<AIFrame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PRESERVATION: Keep Google Docs broadcast pattern
  const broadcastFrameChanges = useCallback((updatedFrames: AIFrame[]) => {
    console.log("🚀 GOOGLE DOCS: Broadcasting merged data as single source of truth");
    setFrames(updatedFrames);
    
    // Dispatch frame updates to all components
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("frames-updated", {
          detail: {
            frames: updatedFrames,
            source: "storage-broadcast",
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  }, []);

  // PRESERVATION: Multi-strategy state resolution for saving
  const saveFramesToStorage = useCallback(async (framesToSave: AIFrame[]) => {
    try {
      setIsLoading(true);
      setError(null);

      // Save to localStorage first
      localStorage.setItem("ai_frames_timecapsule", JSON.stringify(framesToSave));
      
      // Save to GraphStorageManager (if vectorStore is available)
      if (vectorStore && vectorStoreInitialized) {
        const storageManager = getGraphStorageManager(vectorStore);
        await storageManager.saveFrameSequence(framesToSave, 0, {
          totalFrames: framesToSave.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      console.log("💾 Frames saved to storage successfully", framesToSave.length);
      
      // Broadcast the saved frames
      broadcastFrameChanges(framesToSave);

      return true;
    } catch (error) {
      console.error("❌ Failed to save frames to storage:", error);
      setError(error instanceof Error ? error.message : "Failed to save frames");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [broadcastFrameChanges, vectorStore, vectorStoreInitialized]);

  // PRESERVATION: Multi-strategy loading with fallbacks
  const loadFramesFromStorage = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let loadedFrames: AIFrame[] = [];

      // Strategy 1: Try localStorage first
      const localStorage_frames = localStorage.getItem("ai_frames_timecapsule");
      if (localStorage_frames) {
        try {
          loadedFrames = JSON.parse(localStorage_frames);
          console.log("📂 Loaded frames from localStorage:", loadedFrames.length);
        } catch (e) {
          console.warn("⚠️ Failed to parse localStorage frames:", e);
        }
      }

      // Strategy 2: Try timecapsule_combined storage
      if (loadedFrames.length === 0) {
        const timecapsule_combined = localStorage.getItem("timecapsule_combined");
        if (timecapsule_combined) {
          try {
            const parsed = JSON.parse(timecapsule_combined);
            if (parsed.frames && Array.isArray(parsed.frames)) {
              loadedFrames = parsed.frames;
              console.log("📂 Loaded frames from timecapsule_combined:", loadedFrames.length);
            }
          } catch (e) {
            console.warn("⚠️ Failed to parse timecapsule_combined:", e);
          }
        }
      }

      // Strategy 3: Try GraphStorageManager
      if (loadedFrames.length === 0 && vectorStore && vectorStoreInitialized) {
        const storageManager = getGraphStorageManager(vectorStore);
        const frameSequence = await storageManager.loadFrameSequence();
        if (frameSequence?.frames) {
          loadedFrames = frameSequence.frames;
          console.log("📂 Loaded frames from GraphStorageManager:", loadedFrames.length);
        }
      }

      // Broadcast loaded frames
      if (loadedFrames.length > 0) {
        broadcastFrameChanges(loadedFrames);
      }

      return loadedFrames;
    } catch (error) {
      console.error("❌ Failed to load frames from storage:", error);
      setError(error instanceof Error ? error.message : "Failed to load frames");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [broadcastFrameChanges]);

  // PRESERVATION: VectorStore sync with attachment handling
  const syncFramesToVectorStore = useCallback(async (framesToSync: AIFrame[]) => {
    if (!vectorStore || !vectorStoreInitialized || !processingAvailable) {
      console.warn("⚠️ VectorStore not available for sync");
      return false;
    }

    try {
      setIsLoading(true);
      console.log("🔄 Syncing frames to VectorStore...", framesToSync.length);

      // Process each frame individually
      for (const frame of framesToSync) {
        const frameContent = `Learning Goal: ${frame.goal}\n\nFramework: ${frame.informationText}\n\nVideo: ${frame.videoUrl}\n\nReflection: ${frame.afterVideoText}`;
        const frameData = {
          id: `aiframe-${frame.id}`,
          title: `AI-Frame: ${frame.title}`,
          content: frameContent,
          metadata: {
            filename: `ai-frame-${frame.id}.json`,
            filesize: JSON.stringify(frame).length,
            filetype: "application/json",
            uploadedAt: frame.updatedAt,
            source: "ai-frame-sync",
            description: `AI Frame: ${frame.title}`,
            isGenerated: true,
            type: "ai-frame",
            frameId: frame.id,
            goal: frame.goal,
            videoUrl: frame.videoUrl,
            aiConcepts: frame.aiConcepts,
            order: frame.order,
            createdAt: frame.createdAt,
            updatedAt: frame.updatedAt,
            ...(frame.attachment && { attachment: frame.attachment }),
            ...(frame.notes && { notes: frame.notes }),
            ...(frame.documents && { documents: frame.documents }),
          },
          chunks: [],
          vectors: [],
        };

        await vectorStore.insertDocument(frameData);
      }

      console.log("✅ VectorStore sync completed successfully");
      return true;
    } catch (error) {
      console.error("❌ Failed to sync frames to VectorStore:", error);
      setError(error instanceof Error ? error.message : "Failed to sync to VectorStore");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [vectorStore, vectorStoreInitialized, processingAvailable]);

  // PRESERVATION: Event-driven sync operations
  const syncGraphChangesToKB = useCallback(async (updatedFrames: AIFrame[]) => {
    if (!vectorStore || !vectorStoreInitialized || !processingAvailable) {
      return false;
    }

    try {
      console.log("🔄 Syncing graph changes to Knowledge Base...");
      
      // Sync frames to VectorStore
      await syncFramesToVectorStore(updatedFrames);

      // Dispatch KB update events
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("aiframes-kb-updated", {
            detail: {
              frameCount: updatedFrames.length,
              syncType: "immediate",
              source: "graph-sync",
              timestamp: new Date().toISOString(),
            },
          })
        );

        window.dispatchEvent(
          new CustomEvent("kb-force-refresh", {
            detail: {
              source: "graph-sync",
              action: "bulk-update",
              timestamp: new Date().toISOString(),
            },
          })
        );
      }

      return true;
    } catch (error) {
      console.error("❌ Failed to sync graph changes to KB:", error);
      return false;
    }
  }, [vectorStore, vectorStoreInitialized, processingAvailable, syncFramesToVectorStore]);

  return {
    frames,
    isLoading,
    error,
    saveFramesToStorage,
    loadFramesFromStorage,
    syncFramesToVectorStore,
    syncGraphChangesToKB,
    broadcastFrameChanges,
  };
}; 