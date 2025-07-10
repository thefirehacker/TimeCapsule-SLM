export interface YouTubeNodeData extends Record<string, unknown> {
  type: "youtube";
  videoUrl: string;
  timestamp: string;
  text: string;
  title?: string;
}

export interface PDFNodeData extends Record<string, unknown> {
  type: "pdf";
  pdfUrl: string;
  pages: string;
  text: string;
  title?: string;
}

export interface TextNodeData extends Record<string, unknown> {
  type: "text";
  text: string;
  title?: string;
}

// New types for AI Frames integration
export interface AIFrameNodeData extends Record<string, unknown> {
  type: "aiframe";
  frameId: string;
  title: string;
  goal: string;
  informationText: string;
  videoUrl: string;
  startTime: number;
  duration: number;
  afterVideoText: string;
  aiConcepts: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
}

export interface ConceptNodeData extends Record<string, unknown> {
  type: "concept";
  concept: string;
  description?: string;
  relatedFrameId: string;
}

export interface ChapterNodeData extends Record<string, unknown> {
  type: "chapter";
  title: string;
  description: string;
  frameIds: string[];
}

export type NodeData = YouTubeNodeData | PDFNodeData | TextNodeData | AIFrameNodeData | ConceptNodeData | ChapterNodeData;

export interface CustomNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface DragItem {
  nodeType: "youtube" | "pdf" | "text" | "aiframe" | "concept" | "chapter";
  label: string;
}

// Graph-specific interfaces for AI Frames
export interface GraphState {
  nodes: any[];
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type?: string;
  }>;
  selectedNodeId?: string | null;
  selectedChapter?: string;
}

export interface FrameGraphMapping {
  frameId: string;
  nodeId: string;
  chapterId?: string;
  conceptNodes: string[];
}
