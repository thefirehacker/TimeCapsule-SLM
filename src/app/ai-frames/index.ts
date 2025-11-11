// AI Frames Module - Self-contained Next.js package ready structure

// Types
export type {
  AIFrame,
  FrameQuiz,
  FrameQuizQuestion,
  FrameQuizChoice,
  QuizAttempt,
  LearningPhase,
  FrameMasteryState,
  FrameValidationResult,
  FrameValidationOptions,
  FrameStorageState,
  FrameEventDetail,
  FramesEventDetail,
  FrameManagerProps,
  FrameControlsProps,
  FrameNavigationProps,
  GraphState,
} from "./types/frames";

export { DEFAULT_FRAME } from "./types/frames";

// Hooks
export { useFrameStorage } from "./hooks/useFrameStorage";
export { useFrameEvents } from "./hooks/useFrameEvents";
export type { UseFrameStorageProps } from "./hooks/useFrameStorage";
export type { UseFrameEventsProps } from "./hooks/useFrameEvents";

// Components
export { FrameManager, FrameControls, FrameNavigation } from "./components";

// Libraries
export {
  validateFrameData,
  isUserEdit,
  validateStorageConsistency,
  extractFrameFromContent,
  mergeFrameData,
  generateFrameId,
  sortFramesByOrder,
  reorderFrames,
} from "./lib/frameValidation";

export {
  loadFramesFromKnowledgeBase,
  parseFrameFromDocument,
  parseFramesFromTimeCapsule,
  exportFramesToJson,
  importFramesFromJson,
  getLocalStorageFrames,
  setLocalStorageFrames,
  getTimeCapsuleCombinedData,
  setTimeCapsuleCombinedData,
  detectAndParseFrameData,
  generateFrameContent,
  cleanupFrameData,
} from "./lib/frameStorage";

// Main Page Component (for backward compatibility)
export { default as AIFramesPage } from "./page"; 
