// Enhanced chunk types to support structured data including tables

export interface TableCell {
  content: string;
  colspan?: number;
  rowspan?: number;
  isHeader?: boolean;
  alignment?: "left" | "center" | "right";
}

export interface TableRow {
  cells: TableCell[];
  isHeader?: boolean;
}

export interface TableData {
  rows: TableRow[];
  headers?: string[];
  caption?: string;
  metadata?: {
    pageNumber?: number;
    position?: { x: number; y: number; width: number; height: number };
    extractionMethod?: "text-based" | "layout-based" | "ai-detected";
    confidence?: number;
  };
}

export interface ChunkContent {
  type: "text" | "table" | "mixed";
  text?: string;
  table?: TableData;
  rawContent?: string; // Original raw content for fallback
}

export interface EnhancedChunk {
  id: string;
  content: ChunkContent;
  startIndex: number;
  endIndex: number;
  metadata?: {
    pageNumber?: number;
    position?: { x: number; y: number; width: number; height: number };
    extractionQuality?: "high" | "medium" | "low";
    hasStructuredData?: boolean;
    tableCount?: number;
    wordCount?: number;
  };
}

// Legacy chunk interface for backward compatibility
export interface LegacyChunk {
  id: string;
  content: string;
  startIndex: number;
  endIndex: number;
}

// Union type to handle both legacy and enhanced chunks
export type Chunk = LegacyChunk | EnhancedChunk;

// Type guards
export function isEnhancedChunk(chunk: Chunk): chunk is EnhancedChunk {
  return typeof (chunk as EnhancedChunk).content === "object";
}

export function isLegacyChunk(chunk: Chunk): chunk is LegacyChunk {
  return typeof (chunk as LegacyChunk).content === "string";
}

// Utility functions
export function getChunkText(chunk: Chunk): string {
  if (isLegacyChunk(chunk)) {
    return chunk.content;
  }

  const enhancedChunk = chunk as EnhancedChunk;
  if (enhancedChunk.content.type === "text") {
    return enhancedChunk.content.text || "";
  } else if (enhancedChunk.content.type === "table") {
    return tableToText(enhancedChunk.content.table);
  } else if (enhancedChunk.content.type === "mixed") {
    let result = enhancedChunk.content.text || "";
    if (enhancedChunk.content.table) {
      result += "\n\n" + tableToText(enhancedChunk.content.table);
    }
    return result;
  }

  return enhancedChunk.content.rawContent || "";
}

export function tableToText(table?: TableData): string {
  if (!table) return "";

  return table.rows
    .map((row) => row.cells.map((cell) => cell.content).join(" | "))
    .join("\n");
}

export function tableToMarkdown(table: TableData): string {
  if (!table.rows.length) return "";

  let markdown = "";

  // Add caption if present
  if (table.caption) {
    markdown += `**${table.caption}**\n\n`;
  }

  // Process rows
  table.rows.forEach((row, rowIndex) => {
    const cells = row.cells.map((cell) => cell.content.replace(/\|/g, "\\|"));
    markdown += `| ${cells.join(" | ")} |\n`;

    // Add header separator after first row if it's a header
    if (rowIndex === 0 && row.isHeader) {
      const separator = row.cells.map((cell) => {
        const align = cell.alignment || "left";
        switch (align) {
          case "center":
            return ":---:";
          case "right":
            return "---:";
          default:
            return "---";
        }
      });
      markdown += `| ${separator.join(" | ")} |\n`;
    }
  });

  return markdown;
}

export function tableToHtml(table: TableData): string {
  if (!table.rows.length) return "";

  let html = "<table>";

  if (table.caption) {
    html += `<caption>${table.caption}</caption>`;
  }

  table.rows.forEach((row) => {
    html += "<tr>";
    row.cells.forEach((cell) => {
      const tag = cell.isHeader ? "th" : "td";
      const attrs = [];

      if (cell.colspan && cell.colspan > 1) {
        attrs.push(`colspan="${cell.colspan}"`);
      }
      if (cell.rowspan && cell.rowspan > 1) {
        attrs.push(`rowspan="${cell.rowspan}"`);
      }
      if (cell.alignment) {
        attrs.push(`style="text-align: ${cell.alignment}"`);
      }

      const attrString = attrs.length ? " " + attrs.join(" ") : "";
      html += `<${tag}${attrString}>${cell.content}</${tag}>`;
    });
    html += "</tr>";
  });

  html += "</table>";
  return html;
}

// Export type for document processing
export interface ProcessingResult {
  text: string;
  tables: TableData[];
  chunks: EnhancedChunk[];
  metadata: {
    totalPages?: number;
    totalTables?: number;
    totalTextChunks?: number;
    processingTime?: number;
    extractionMethod?: string[];
  };
}

