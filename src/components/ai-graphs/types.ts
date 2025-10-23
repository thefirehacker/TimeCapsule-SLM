export interface YouTubeNodeData extends Record<string, unknown> {
  type: "youtube";
  videoUrl: string;
  timestamp: string;
  text: string;
}

export interface PDFNodeData extends Record<string, unknown> {
  type: "pdf";
  pdfUrl: string;
  pages: string;
  text: string;
}

export interface TextNodeData extends Record<string, unknown> {
  type: "text";
  text: string;
}

export interface DragItem {
  nodeType: "youtube" | "pdf" | "text" | "aiframe" | "concept" | "chapter";
}

// DYNAMIC ARCHITECTURE: Frame-Attachment System (Future-Proof)
export interface FrameAttachment {
  id: string;
  type: string; // DYNAMIC: Support any attachment type (video, pdf, text, audio, image, AR, VR, etc.)
  data: Record<string, any>; // DYNAMIC: Support any properties without hardcoding
}

// Enhanced AI Frame with attachment support
export interface AIFrameNodeData extends Record<string, unknown> {
  type: "aiframe";
  frameId: string;
  title: string;
  goal: string;
  informationText: string;
  
  // NEW: Single attachment instead of direct video fields
  attachment?: FrameAttachment;
  
  // Keep these for backward compatibility but mark as optional
  videoUrl?: string;
  startTime?: number;
  duration?: number;
  
  afterVideoText: string;
  aiConcepts: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
  onFrameUpdate?: (frameId: string, updatedData: any) => void;
  
  // NEW: Attachment management
  onAttachContent?: (frameId: string, attachment: FrameAttachment) => void;
  onDetachContent?: (frameId: string) => void;
}

// Content nodes that can be attached to frames
export interface VideoAttachmentNodeData extends Record<string, unknown> {
  type: "video-attachment";
  id: string;
  videoUrl: string;
  startTime: number;
  duration: number;
  title: string;
  notes?: string;
  // Connection info
  attachedToFrameId?: string;
  isAttached: boolean;
}

export interface PDFAttachmentNodeData extends Record<string, unknown> {
  type: "pdf-attachment";
  id: string;
  pdfUrl: string;
  pages: string;
  title: string;
  notes?: string;
  // Connection info
  attachedToFrameId?: string;
  isAttached: boolean;
}

export interface TextAttachmentNodeData extends Record<string, unknown> {
  type: "text-attachment";
  id: string;
  text: string;
  title: string;
  notes?: string;
  // Connection info
  attachedToFrameId?: string;
  isAttached: boolean;
}

export interface ConceptNodeData extends Record<string, unknown> {
  type: "concept";
  concept: string;
  description?: string;
  relatedFrameId: string;
}

export interface ChapterNodeData extends Record<string, unknown> {
  type: "chapter";
  id?: string;
  title: string;
  description: string;
  frameIds: string[];
  conceptIds?: string[];
  order?: number;
  updatedAt?: string;
  onChapterUpdate?: (updates: {
    title?: string;
    description?: string;
    frameIds?: string[];
    conceptIds?: string[];
    order?: number;
  }) => void;
}

export type NodeData = 
  | YouTubeNodeData 
  | PDFNodeData 
  | TextNodeData 
  | AIFrameNodeData 
  | VideoAttachmentNodeData
  | PDFAttachmentNodeData  
  | TextAttachmentNodeData
  | ConceptNodeData 
  | ChapterNodeData;

// Graph-specific interfaces for AI Frames
export interface GraphState {
  nodes: any[];
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type?: string;
    style?: any;
  }>;
  selectedNodeId?: string | null;
  selectedChapter?: string;
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
}

export interface FrameGraphMapping {
  frameId: string;
  nodeId: string;
  chapterId?: string;
  conceptNodes: string[];
  // NEW: Track attachments
  attachmentNodeId?: string;
  attachmentType?: "video" | "pdf" | "text";
}

// NEW: Enhanced frame structure for AI-Frames integration
export interface EnhancedAIFrame {
  id: string;
  title: string;
  goal: string;
  informationText: string;
  afterVideoText: string;
  aiConcepts: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
  
  // NEW: Attachment system
  attachment?: FrameAttachment;
  
  // Hierarchy and relationship fields
  order: number;
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  parentFrameId?: string;
  type: 'frame' | 'chapter' | 'module';
  createdAt: string;
  updatedAt: string;
  
  // Keep legacy video fields for backward compatibility
  videoUrl?: string;
  startTime?: number;
  duration?: number;
}

// Drag item types for the new system
export interface EnhancedDragItem {
  nodeType: "aiframe" | "video-attachment" | "pdf-attachment" | "text-attachment" | "concept" | "chapter";
}
