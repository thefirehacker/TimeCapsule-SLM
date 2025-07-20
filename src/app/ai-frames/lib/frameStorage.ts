import { AIFrame } from "../types/frames";
import { extractFrameFromContent, generateFrameId, sortFramesByOrder } from "./frameValidation";

// PRESERVATION: Multi-strategy loading from Sage's Chronicle
let isCurrentlyLoading = false; // Prevent concurrent calls

export const loadFramesFromKnowledgeBase = async (
  vectorStore: any,
  vectorStoreInitialized: boolean,
  maxRetries: number = 3
): Promise<AIFrame[]> => {
  if (!vectorStore || !vectorStoreInitialized) {
    // FIXED: Completely silent when VectorStore not available to prevent spam
    return [];
  }

  // FIXED: Check VectorStore's public initialization state
  if (!vectorStore.initialized) {
    console.warn("⚠️ VectorStore not initialized");
    return [];
  }

  // FIXED: Prevent concurrent calls to this function
  if (isCurrentlyLoading) {
    return [];
  }

  try {
    isCurrentlyLoading = true;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // FIXED: Double-check VectorStore state before calling getAllDocuments
        if (!vectorStore.getAllDocuments) {
          console.warn("⚠️ VectorStore getAllDocuments method not available");
          return [];
        }
        
        // FIXED: Robust error handling for race conditions
        let documents;
        try {
          documents = await vectorStore.getAllDocuments();
        } catch (error) {
          if (error instanceof Error && error.message.includes('Vector Store not initialized')) {
            console.warn("⚠️ VectorStore database not ready yet, will retry...");
            if (attempt < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); // Longer delay for DB readiness
              continue;
            }
            return [];
          }
          throw error; // Re-throw other errors
        }
        const frameDocuments = documents.filter(
          (doc: any) => doc.metadata?.type === "ai-frame"
        );

        if (frameDocuments.length === 0) {
          // FIXED: Removed logging - empty Knowledge Base is normal for new users
          return [];
        }

        const frames: AIFrame[] = frameDocuments.map((doc: any) => 
          parseFrameFromDocument(doc)
        ).filter(Boolean);

        console.log(`📊 Loaded ${frames.length} frames from Knowledge Base`);
        return sortFramesByOrder(frames);
      } catch (error) {
        console.error(`❌ Attempt ${attempt + 1} failed to load frames from KB:`, error);
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
        }
      }
    }

    return [];
  } finally {
    isCurrentlyLoading = false;
  }
};

// PRESERVATION: Frame parsing from document content (Sage's Chronicle patterns)
export const parseFrameFromDocument = (document: any): AIFrame | null => {
  try {
    const { content, metadata } = document;
    
    // Extract frame data from content
    const extracted = extractFrameFromContent(content);
    
    // Build frame from metadata and extracted content
    const frame: AIFrame = {
      id: metadata.frameId || generateFrameId(),
      title: metadata.title?.replace("AI-Frame: ", "") || extracted.goal || "Untitled Frame",
      goal: metadata.goal || extracted.goal || "",
      informationText: metadata.informationText || extracted.informationText || "",
      videoUrl: metadata.videoUrl || extracted.videoUrl || "",
      startTime: metadata.startTime || 0,
      duration: metadata.duration || 0,
      afterVideoText: metadata.afterVideoText || extracted.afterVideoText || "",
      aiConcepts: metadata.aiConcepts || [],
      isGenerated: metadata.isGenerated || false,
      sourceGoal: metadata.sourceGoal,
      sourceUrl: metadata.sourceUrl,
      order: metadata.order || 0,
      bubblSpaceId: metadata.bubblSpaceId,
      timeCapsuleId: metadata.timeCapsuleId,
      parentFrameId: metadata.parentFrameId,
      type: metadata.frameType || "frame",
      createdAt: metadata.createdAt || new Date().toISOString(),
      updatedAt: metadata.updatedAt || new Date().toISOString(),
      attachment: metadata.attachment,
      notes: metadata.notes,
      documents: metadata.documents,
    };

    return frame;
  } catch (error) {
    console.error("❌ Failed to parse frame from document:", error);
    return null;
  }
};

// PRESERVATION: TimeCapsule format handling
export const parseFramesFromTimeCapsule = (timeCapsuleData: any): AIFrame[] => {
  try {
    if (!timeCapsuleData) return [];

    // Handle different formats
    if (timeCapsuleData.frames && Array.isArray(timeCapsuleData.frames)) {
      return timeCapsuleData.frames;
    }

    if (timeCapsuleData.aiFrames && Array.isArray(timeCapsuleData.aiFrames)) {
      return timeCapsuleData.aiFrames;
    }

    if (Array.isArray(timeCapsuleData)) {
      return timeCapsuleData;
    }

    return [];
  } catch (error) {
    console.error("❌ Failed to parse frames from TimeCapsule:", error);
    return [];
  }
};

// PRESERVATION: Export functionality
export const exportFramesToJson = (frames: AIFrame[]): string => {
  const exportData = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    frameCount: frames.length,
    frames: frames.map(frame => ({
      ...frame,
      // Include metadata for import
      exportMetadata: {
        originalId: frame.id,
        exportedAt: new Date().toISOString(),
      }
    }))
  };

  return JSON.stringify(exportData, null, 2);
};

// PRESERVATION: Import functionality
export const importFramesFromJson = (jsonData: string): AIFrame[] => {
  try {
    const parsed = JSON.parse(jsonData);
    
    // Handle different import formats
    if (parsed.frames && Array.isArray(parsed.frames)) {
      return parsed.frames.map((frame: any) => ({
        ...frame,
        id: generateFrameId(), // Generate new IDs to avoid conflicts
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }

    if (Array.isArray(parsed)) {
      return parsed.map((frame: any) => ({
        ...frame,
        id: generateFrameId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }

    return [];
  } catch (error) {
    console.error("❌ Failed to import frames from JSON:", error);
    return [];
  }
};

// PRESERVATION: Local storage utilities
export const getLocalStorageFrames = (): AIFrame[] => {
  try {
    const stored = localStorage.getItem("ai_frames_timecapsule");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("❌ Failed to load frames from localStorage:", error);
  }
  return [];
};

export const setLocalStorageFrames = (frames: AIFrame[]): void => {
  try {
    localStorage.setItem("ai_frames_timecapsule", JSON.stringify(frames));
  } catch (error) {
    console.error("❌ Failed to save frames to localStorage:", error);
  }
};

// PRESERVATION: Combined storage format handling
export const getTimeCapsuleCombinedData = (): any => {
  try {
    const stored = localStorage.getItem("timecapsule_combined");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("❌ Failed to load timecapsule_combined:", error);
  }
  return null;
};

export const setTimeCapsuleCombinedData = (data: any): void => {
  try {
    localStorage.setItem("timecapsule_combined", JSON.stringify(data));
  } catch (error) {
    console.error("❌ Failed to save timecapsule_combined:", error);
  }
};

// PRESERVATION: Format detection and parsing
export const detectAndParseFrameData = (data: any): AIFrame[] => {
  if (!data) return [];

  // Try different parsing strategies
  const strategies = [
    () => parseFramesFromTimeCapsule(data),
    () => Array.isArray(data) ? data : [],
    () => data.frames || [],
    () => data.aiFrames || [],
  ];

  for (const strategy of strategies) {
    try {
      const frames = strategy();
      if (frames.length > 0) {
        return frames;
      }
    } catch (error) {
      // Continue to next strategy
    }
  }

  return [];
};

// PRESERVATION: Frame content generation for VectorStore
export const generateFrameContent = (frame: AIFrame): string => {
  return `Learning Goal: ${frame.goal}

Framework: ${frame.informationText}

Video: ${frame.videoUrl}

Reflection: ${frame.afterVideoText}

Concepts: ${frame.aiConcepts.join(", ")}

Created: ${frame.createdAt}
Updated: ${frame.updatedAt}
Order: ${frame.order}

${frame.notes ? `Notes: ${frame.notes}` : ""}
${frame.attachment ? `Attachment: ${frame.attachment.type} - ${frame.attachment.data?.title || frame.attachment.data?.name || 'Untitled'}` : ""}`;
};

// PRESERVATION: Cleanup utilities
export const cleanupFrameData = (frame: AIFrame): AIFrame => {
  return {
    ...frame,
    title: frame.title?.trim() || "",
    goal: frame.goal?.trim() || "",
    informationText: frame.informationText?.trim() || "",
    videoUrl: frame.videoUrl?.trim() || "",
    afterVideoText: frame.afterVideoText?.trim() || "",
    aiConcepts: frame.aiConcepts?.filter(concept => concept.trim()) || [],
    updatedAt: new Date().toISOString(),
  };
}; 