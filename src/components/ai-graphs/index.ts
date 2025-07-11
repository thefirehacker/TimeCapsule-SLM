// Core Components
export { default as LearningGraph } from "./LearningGraph";
export { default as EnhancedLearningGraph } from "./EnhancedLearningGraph";

// Legacy Node Components (for backward compatibility)
export { default as YouTubeNode } from "./YouTubeNode";
export { default as PDFNode } from "./PDFNode";
export { default as TextNode } from "./TextNode";
export { default as AIFrameNode } from "./AIFrameNode";
export { default as ConceptNode } from "./ConceptNode";
export { default as ChapterNode } from "./ChapterNode";

// NEW: Enhanced Frame-Attachment System Components
export { default as EnhancedAIFrameNode } from "./EnhancedAIFrameNode";
export { default as VideoAttachmentNode } from "./VideoAttachmentNode";
export { default as PDFAttachmentNode } from "./PDFAttachmentNode";
export { default as TextAttachmentNode } from "./TextAttachmentNode";

// Sidebar Components
export { default as Sidebar } from "./Sidebar";
export { default as EnhancedSidebar } from "./EnhancedSidebar";

// Integration Components
export { default as FrameGraphIntegration } from "./FrameGraphIntegration";

// Types
export type {
  NodeData,
  GraphState,
  FrameGraphMapping,
  AIFrameNodeData,
  ConceptNodeData,
  ChapterNodeData,
  DragItem,
  // NEW: Enhanced Types
  FrameAttachment,
  EnhancedAIFrame,
  VideoAttachmentNodeData,
  PDFAttachmentNodeData,
  TextAttachmentNodeData,
  EnhancedDragItem
} from "./types";
