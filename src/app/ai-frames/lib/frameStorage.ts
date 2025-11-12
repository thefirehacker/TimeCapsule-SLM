import { AIFrame, Chapter, GraphState } from "../types/frames";
import { extractFrameFromContent, generateFrameId, sortFramesByOrder } from "./frameValidation";

const EMPTY_GRAPH_STATE: GraphState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
};

const sanitizeGraphStateSnapshot = (graphState?: Partial<GraphState> | null): GraphState => {
  if (!graphState) {
    return { ...EMPTY_GRAPH_STATE };
  }

  const viewport = graphState.viewport;
  const normalizedViewport =
    viewport && typeof viewport === "object"
      ? {
          x: typeof viewport.x === "number" ? viewport.x : Number(viewport.x) || 0,
          y: typeof viewport.y === "number" ? viewport.y : Number(viewport.y) || 0,
          zoom: typeof viewport.zoom === "number" ? viewport.zoom : Number(viewport.zoom) || 1,
        }
      : undefined;

  return {
    nodes: Array.isArray(graphState.nodes) ? graphState.nodes : [],
    edges: Array.isArray(graphState.edges) ? graphState.edges : [],
    selectedNodeId:
      typeof graphState.selectedNodeId === "string" || graphState.selectedNodeId === null
        ? graphState.selectedNodeId
        : null,
    viewport: normalizedViewport,
  };
};

export interface AIFramesExportPayload {
  schemaVersion: string;
  exportedAt: string;
  frames: AIFrame[];
  chapters: Chapter[];
  graphState: GraphState;
  metadata: {
    source: "ai-frames";
    frameCount: number;
    chapterCount: number;
    attachmentCount: number;
    noteCount: number;
    checksum: string;
  };
}

export interface AIFramesImportMetadata {
  schemaVersion: string;
  exportedAt: string | null;
  isFullExport: boolean;
  frameCount: number;
  chapterCount: number;
}

export interface AIFramesImportResult {
  frames: AIFrame[];
  chapters: Chapter[];
  graphState: GraphState | null;
  metadata: AIFramesImportMetadata;
}

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
export const exportFramesToJson = (
  frames: AIFrame[],
  chapters: Chapter[] = [],
  graphState?: GraphState
): string => {
  const exportedAt = new Date().toISOString();
  const attachments = frames.filter(frame => Boolean(frame.attachment)).length;
  const notes = frames.filter(frame => typeof frame.notes === "string" && frame.notes.trim().length > 0).length;
  const normalizedGraphState = sanitizeGraphStateSnapshot(graphState);

  const checksum = btoa(
    JSON.stringify({
      frameIds: frames.map(frame => frame.id).sort(),
      chapterIds: chapters.map(chapter => chapter.id).sort(),
      nodeCount: normalizedGraphState.nodes.length,
    })
  ).slice(0, 16);

  const exportData: AIFramesExportPayload = {
    schemaVersion: "2.0",
    exportedAt,
    frames: frames.map(frame => ({
      ...frame,
      exportMetadata: {
        originalId: frame.id,
        exportedAt,
      },
    })),
    chapters,
    graphState: normalizedGraphState,
    metadata: {
      source: "ai-frames",
      frameCount: frames.length,
      chapterCount: chapters.length,
      attachmentCount: attachments,
      noteCount: notes,
      checksum,
    },
  };

  return JSON.stringify(exportData, null, 2);
};

// PRESERVATION: Import functionality
export const importFramesFromJson = (jsonData: string): AIFramesImportResult => {
  const fallbackResult: AIFramesImportResult = {
    frames: [],
    chapters: [],
    graphState: null,
    metadata: {
      schemaVersion: "1.0",
      exportedAt: null,
      isFullExport: false,
      frameCount: 0,
      chapterCount: 0,
    },
  };

  try {
    const parsed = JSON.parse(jsonData);
    const rawFrames =
      (Array.isArray(parsed?.frames) && parsed.frames) ||
      (Array.isArray(parsed?.aiFrames) && parsed.aiFrames) ||
      (Array.isArray(parsed?.data?.frames) && parsed.data.frames) ||
      (Array.isArray(parsed) ? parsed : []);

    const rawChapters =
      (Array.isArray(parsed?.chapters) && parsed.chapters) ||
      (Array.isArray(parsed?.data?.chapters) && parsed.data.chapters) ||
      [];

    const rawGraphState = parsed?.graphState || parsed?.data?.graphState || null;

    const normalizedFrames: AIFrame[] = rawFrames.map((frame: any, index: number) => ({
      ...frame,
      id: typeof frame.id === "string" && frame.id.length > 0 ? frame.id : generateFrameId(),
      order: typeof frame.order === "number" ? frame.order : index + 1,
      createdAt: frame.createdAt || new Date().toISOString(),
      updatedAt: frame.updatedAt || new Date().toISOString(),
      attachment: frame.attachment
        ? {
            ...frame.attachment,
            data: { ...(frame.attachment?.data || {}) },
          }
        : undefined,
      notes: typeof frame.notes === "string" ? frame.notes : frame.notes ?? "",
      documents: Array.isArray(frame.documents) ? frame.documents : [],
    }));

    const normalizedChapters: Chapter[] = rawChapters.map((chapter: any, index: number) => ({
      ...chapter,
      id:
        typeof chapter.id === "string" && chapter.id.length > 0
          ? chapter.id
          : `chapter_${Date.now()}_${index}`,
      title: chapter.title || `Chapter ${index + 1}`,
      frameIds: Array.isArray(chapter.frameIds) ? chapter.frameIds : [],
      conceptIds: Array.isArray(chapter.conceptIds) ? chapter.conceptIds : [],
      order: typeof chapter.order === "number" ? chapter.order : index,
      createdAt: chapter.createdAt || new Date().toISOString(),
      updatedAt: chapter.updatedAt || new Date().toISOString(),
      linkSequentially: chapter.linkSequentially ?? false,
    }));

    const schemaVersion =
      typeof parsed?.schemaVersion === "string"
        ? parsed.schemaVersion
        : typeof parsed?.version === "string"
        ? parsed.version
        : "1.0";

    const exportedAt =
      typeof parsed?.exportedAt === "string"
        ? parsed.exportedAt
        : typeof parsed?.metadata?.exportedAt === "string"
        ? parsed.metadata.exportedAt
        : null;

    const graphState =
      rawGraphState && (schemaVersion !== "1.0" || Array.isArray(rawChapters))
        ? sanitizeGraphStateSnapshot(rawGraphState)
        : null;

    return {
      frames: normalizedFrames,
      chapters: normalizedChapters,
      graphState,
      metadata: {
        schemaVersion,
        exportedAt,
        isFullExport:
          schemaVersion !== "1.0" ||
          normalizedChapters.length > 0 ||
          Boolean(graphState),
        frameCount: normalizedFrames.length,
        chapterCount: normalizedChapters.length,
      },
    };
  } catch (error) {
    console.error("❌ Failed to import frames from JSON:", error);
    return fallbackResult;
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
