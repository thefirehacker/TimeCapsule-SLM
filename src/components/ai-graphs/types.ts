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

export type NodeData = YouTubeNodeData | PDFNodeData | TextNodeData;

export interface CustomNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface DragItem {
  nodeType: "youtube" | "pdf" | "text";
  label: string;
}
