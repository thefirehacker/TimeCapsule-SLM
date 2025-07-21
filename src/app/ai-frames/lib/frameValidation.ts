import { AIFrame, FrameValidationResult, FrameValidationOptions } from "../types/frames";

// PRESERVATION: Keep the same validation logic from the Sage's Chronicle
export const validateFrameData = (
  frame: AIFrame,
  existingFrames: AIFrame[] = [],
  options: FrameValidationOptions = {}
): FrameValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const {
    checkDuplicates = true,
    checkRequired = true,
    checkFormat = true,
  } = options;

  // Check required fields
  if (checkRequired) {
    if (!frame.title?.trim()) {
      errors.push("Frame title is required");
    }
    if (!frame.goal?.trim()) {
      errors.push("Frame goal is required");
    }
    if (!frame.id?.trim()) {
      errors.push("Frame ID is required");
    }
  }

  // Check for duplicates
  if (checkDuplicates && existingFrames.length > 0) {
    const duplicateTitle = existingFrames.find(
      (f) => f.id !== frame.id && f.title?.trim() === frame.title?.trim()
    );
    if (duplicateTitle) {
      errors.push(`Duplicate frame title: "${frame.title}"`);
    }

    const duplicateGoal = existingFrames.find(
      (f) => f.id !== frame.id && f.goal?.trim() === frame.goal?.trim()
    );
    if (duplicateGoal) {
      warnings.push(`Similar frame goal: "${frame.goal}"`);
    }
  }

  // Check format
  if (checkFormat) {
    if (frame.videoUrl && !isValidUrl(frame.videoUrl)) {
      errors.push("Invalid video URL format");
    }
    if (frame.startTime < 0) {
      errors.push("Start time cannot be negative");
    }
    if (frame.duration < 0) {
      errors.push("Duration cannot be negative");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

// PRESERVATION: Default value detection from Sage's Chronicle
const DEFAULT_VALUES = {
  title: [
    "default",
    "untitled",
    "new frame",
    "frame",
    "ai frame",
    "learning frame",
  ],
  goal: [
    "default",
    "untitled",
    "new goal",
    "goal",
    "learning goal",
    "frame goal",
  ],
  informationText: [
    "default",
    "untitled",
    "new information",
    "information",
    "content",
    "framework",
  ],
};

export const isUserEdit = (value: string, field: keyof typeof DEFAULT_VALUES): boolean => {
  if (!value || !value.trim()) return false;
  
  // PRESERVATION: Exact string matching from Sage's Chronicle
  const defaults = DEFAULT_VALUES[field] || [];
  return !defaults.some((defaultValue) => 
    value.toLowerCase().trim() === defaultValue.toLowerCase().trim()
  );
};

// PRESERVATION: Storage consistency validation from Sage's Chronicle
export const validateStorageConsistency = (
  localStorageFrames: AIFrame[],
  vectorStoreFrames: any[] = [],
  graphState: any = null
): FrameValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check frame count consistency
  if (localStorageFrames.length !== vectorStoreFrames.length) {
    warnings.push(
      `Frame count mismatch: localStorage (${localStorageFrames.length}) vs VectorStore (${vectorStoreFrames.length})`
    );
  }

  // Check for missing frames in VectorStore
  localStorageFrames.forEach((frame) => {
    const vectorFrame = vectorStoreFrames.find((vf) => 
      vf.metadata?.frameId === frame.id
    );
    if (!vectorFrame) {
      warnings.push(`Frame "${frame.title}" missing from VectorStore`);
    }
  });

  // Check graph state consistency
  if (graphState) {
    const graphFrameNodes = graphState.nodes?.filter((node: any) => 
      node.type === "aiFrame"
    ) || [];
    
    if (graphFrameNodes.length !== localStorageFrames.length) {
      warnings.push(
        `Graph state mismatch: ${graphFrameNodes.length} nodes vs ${localStorageFrames.length} frames`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

// PRESERVATION: Frame data extraction from content (Sage's Chronicle patterns)
export const extractFrameFromContent = (content: string): Partial<AIFrame> => {
  const extracted: Partial<AIFrame> = {};

  // Enhanced extraction patterns from Sage's Chronicle
  const extractFromContent = (content: string, marker: string): string => {
    switch (marker) {
      case "Goal:":
        // Look for "Learning Goal: ..." pattern first
        const goalMatch = content.match(/Learning Goal:\s*(.*?)(?:\n|$)/i);
        if (goalMatch) return goalMatch[1].trim();
        break;
      case "Framework:":
        const frameworkMatch = content.match(/Framework:\s*(.*?)(?:\n|$)/i);
        if (frameworkMatch) return frameworkMatch[1].trim();
        break;
      case "Video:":
        const videoMatch = content.match(/Video:\s*(.*?)(?:\n|$)/i);
        if (videoMatch) return videoMatch[1].trim();
        break;
      case "Reflection:":
        const reflectionMatch = content.match(/Reflection:\s*(.*?)(?:\n|$)/i);
        if (reflectionMatch) return reflectionMatch[1].trim();
        break;
    }

    // Fallback to simple extraction
    const lines = content.split('\n');
    const markerLine = lines.find(line => line.includes(marker));
    if (markerLine) {
      return markerLine.split(marker)[1]?.trim() || "";
    }
    return "";
  };

  // Extract frame components
  extracted.goal = extractFromContent(content, "Goal:");
  extracted.informationText = extractFromContent(content, "Framework:");
  extracted.videoUrl = extractFromContent(content, "Video:");
  extracted.afterVideoText = extractFromContent(content, "Reflection:");

  return extracted;
};

// PRESERVATION: Frame merge logic from Sage's Chronicle
export const mergeFrameData = (
  originalFrame: AIFrame,
  updates: Partial<AIFrame>,
  preserveUserEdits: boolean = true
): AIFrame => {
  const merged = { ...originalFrame };

  // Smart merge strategy - preserve user edits
  if (preserveUserEdits) {
    // Only update if the original value is a default value
    if (updates.title && !isUserEdit(originalFrame.title, "title")) {
      merged.title = updates.title;
    }
    if (updates.goal && !isUserEdit(originalFrame.goal, "goal")) {
      merged.goal = updates.goal;
    }
    if (updates.informationText && !isUserEdit(originalFrame.informationText, "informationText")) {
      merged.informationText = updates.informationText;
    }
  } else {
    // Force update all provided fields
    Object.assign(merged, updates);
  }

  // Always update timestamp
  merged.updatedAt = new Date().toISOString();

  return merged;
};

// Utility functions
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// PRESERVATION: Frame ID generation
export const generateFrameId = (): string => {
  return `frame_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// PRESERVATION: Frame ordering utilities
export const sortFramesByOrder = (frames: AIFrame[]): AIFrame[] => {
  return [...frames].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    // Fallback to creation time
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

export const reorderFrames = (frames: AIFrame[], fromIndex: number, toIndex: number): AIFrame[] => {
  const reordered = [...frames];
  const [removed] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, removed);
  
  // Update order values
  return reordered.map((frame, index) => ({
    ...frame,
    order: index,
    updatedAt: new Date().toISOString(),
  }));
}; 