import { collapseSpacedTokens, stripStructureMarkers } from "./textCleanup";

interface ChunkOptions {
  wordsPerChunk?: number;
  overlapWords?: number;
  maxChunks?: number;
}

export interface ChunkResult {
  id?: string;
  content: string;
  startIndex: number;
  endIndex: number;
  pageNumber?: number | null;
  sectionTitle?: string | null;
  markers?: string[];
}

const MAX_SINGLE_CHUNK_SIZE = 2000;

function sanitizeChunkContent(text: string): string {
  if (!text) return "";
  let cleaned = stripStructureMarkers(text)
    .replace(/-{5,}Page\s*\(\d+\)\s*Break-{5,}/gi, "")
    .replace(/\s{3,}/g, "  ")
    .replace(/\b(here\s+){3,}here\b/gi, "here")
    .trim();
  cleaned = collapseSpacedTokens(cleaned);
  return cleaned;
}

export function chunkStructuredText(
  text: string,
  options: ChunkOptions = {}
): ChunkResult[] {
  const wordsPerChunk = options.wordsPerChunk ?? 250;
  const overlapWords = options.overlapWords ?? 50;
  const maxChunks = options.maxChunks ?? 200;

  const segments = detectSegments(text);
  const chunks: ChunkResult[] = [];
  let chunkIndex = 0;
  let totalCharPosition = 0;

  for (const segment of segments) {
    if (chunkIndex >= maxChunks) break;

    if (segment.type === "table") {
      for (const line of segment.lines) {
        if (chunkIndex >= maxChunks) break;
        const sanitizedLine = sanitizeChunkContent(line);
        if (!sanitizedLine) continue;
        chunks.push({
          content: sanitizedLine,
          startIndex: totalCharPosition,
          endIndex: totalCharPosition + sanitizedLine.length,
          pageNumber: segment.pageNumber,
          sectionTitle: segment.sectionTitle,
          markers: ["TABLE_ROW"],
        });
        totalCharPosition += sanitizedLine.length + 1;
        chunkIndex++;
      }
      continue;
    }

    const words = segment.content.split(/\s+/).filter(Boolean);
    let currentPosition = 0;
    const stepSize = Math.max(wordsPerChunk - overlapWords, Math.floor(wordsPerChunk / 2));

    while (currentPosition < words.length && chunkIndex < maxChunks) {
      const endPosition = Math.min(currentPosition + wordsPerChunk, words.length);
      let chunkContent = words.slice(currentPosition, endPosition).join(" ");
      chunkContent = sanitizeChunkContent(chunkContent);
      if (!chunkContent) {
        currentPosition += stepSize;
        continue;
      }

      chunks.push({
        content: chunkContent,
        startIndex: totalCharPosition,
        endIndex: totalCharPosition + chunkContent.length,
        pageNumber: segment.pageNumber,
        sectionTitle: segment.sectionTitle,
        markers: segment.markers,
      });

      chunkIndex++;
      totalCharPosition += chunkContent.length + 1;

      if (endPosition >= words.length) break;
      currentPosition += stepSize;
    }
  }

  return compactChunks(chunks);
}

interface Segment {
  type: "text" | "table";
  content: string;
  lines: string[];
  markers: string[];
  pageNumber: number | null;
  sectionTitle: string | null;
}

function detectSegments(text: string): Segment[] {
  const lines = text.split("\n");
  const segments: Segment[] = [];
  let currentSegment: Segment = {
    type: "text",
    content: "",
    lines: [],
    markers: [],
    pageNumber: 1,
    sectionTitle: null,
  };

  let currentPage = 1;
  const pageBreakRegex = /^-+Page \((\d+)\) Break-+$/i;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (pageBreakRegex.test(line)) {
      const match = line.match(pageBreakRegex);
      if (match) currentPage = Number(match[1]) + 1;
      pushSegment(currentSegment, segments);
      currentSegment = {
        type: "text",
        content: "",
        lines: [],
        markers: [],
        pageNumber: currentPage,
        sectionTitle: null,
      };
      continue;
    }

    if (line.startsWith("<START_TABLE>")) {
      pushSegment(currentSegment, segments);
      currentSegment = {
        type: "table",
        content: "",
        lines: [],
        markers: ["START_TABLE"],
        pageNumber: currentPage,
        sectionTitle: null,
      };
      continue;
    }

    if (line.startsWith("<END_TABLE>")) {
      currentSegment.markers.push("END_TABLE");
      pushSegment(currentSegment, segments);
      currentSegment = {
        type: "text",
        content: "",
        lines: [],
        markers: [],
        pageNumber: currentPage,
        sectionTitle: null,
      };
      continue;
    }

    if (line.startsWith("<START_SECTION:")) {
      const sectionMatch = line.match(/<START_SECTION:([^>]+)>/);
      const sectionTitle = sectionMatch ? sectionMatch[1] : null;
      pushSegment(currentSegment, segments);
      currentSegment = {
        type: "text",
        content: line + "\n",
        lines: [line],
        markers: ["START_SECTION"],
        pageNumber: currentPage,
        sectionTitle,
      };
      continue;
    }

    if (line.startsWith("<END_SECTION>")) {
      currentSegment.markers.push("END_SECTION");
      currentSegment.content += line + "\n";
      currentSegment.lines.push(line);
      continue;
    }

    if (line.length === 0) {
      continue;
    }

    if (currentSegment.type === "table") {
      currentSegment.lines.push(line);
      continue;
    }

    currentSegment.content += (currentSegment.content ? "\n" : "") + line;
    currentSegment.lines.push(line);
  }

  pushSegment(currentSegment, segments);
  return segments;
}

function pushSegment(segment: Segment, segments: Segment[]) {
  if (!segment.content.trim() && !segment.lines.length) return;
  if (segment.type === "text" && segment.content.length > MAX_SINGLE_CHUNK_SIZE) {
    const words = segment.content.split(/\s+/);
    const midPoint = Math.floor(words.length / 2);
    const firstHalf = words.slice(0, midPoint).join(" ");
    const secondHalf = words.slice(midPoint).join(" ");
    segments.push({ ...segment, content: firstHalf });
    segments.push({ ...segment, content: secondHalf });
  } else {
    segments.push(segment);
  }
}

function compactChunks(chunks: ChunkResult[]): ChunkResult[] {
  const MIN_CHUNK_CHAR_LENGTH = 250;
  if (chunks.length === 0) return [];

  const merged: ChunkResult[] = [];
  let pending: ChunkResult | null = null;

  const appendChunk = (target: ChunkResult, addition: ChunkResult) => {
    target.content = [target.content, addition.content].filter(Boolean).join("\n\n");
    target.endIndex = addition.endIndex;
    target.pageNumber = addition.pageNumber ?? target.pageNumber ?? null;
    target.sectionTitle = addition.sectionTitle ?? target.sectionTitle ?? null;
    const mergedMarkers = new Set([
      ...(target.markers || []),
      ...(addition.markers || []),
    ]);
    target.markers = Array.from(mergedMarkers);
  };

  for (const chunk of chunks) {
    if (!pending) {
      pending = { ...chunk };
      continue;
    }

    if (
      pending.content.length < MIN_CHUNK_CHAR_LENGTH ||
      chunk.content.length < MIN_CHUNK_CHAR_LENGTH
    ) {
      appendChunk(pending, chunk);
      continue;
    }

    merged.push(pending);
    pending = { ...chunk };
  }

  if (pending) {
    merged.push(pending);
  }

  return merged;
}
