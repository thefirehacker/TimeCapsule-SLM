"use server";

import type { DocumentType, DocumentData } from "@/components/VectorStore/VectorStore";
import { parsePdfBuffer } from "./pdf/parsePdfBuffer";
import { chunkStructuredText } from "./textChunker";
import { generateServerEmbeddings } from "./embedding";
import mammoth from "mammoth";
import { plainTextToStructured } from "./textCleanup";

export interface ExtractedDocumentText {
  plainText: string;
  structuredText: string;
  pageCount: number;
}

interface IngestParams {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  documentType: DocumentType;
  parsed?: ExtractedDocumentText;
}

const SUPPORTED_TEXT_TYPES = new Set([
  "text/plain",
  "text/markdown",
  "application/json",
]);

export async function ingestDocumentBuffer({
  buffer,
  filename,
  mimeType,
  documentType,
  parsed,
}: IngestParams): Promise<DocumentData> {
  const textResult =
    parsed ?? (await extractDocumentText({ buffer, filename, mimeType }));

  const chunks = chunkStructuredText(textResult.structuredText);
  const vectors = chunks.length
    ? await generateServerEmbeddings(chunks.map((chunk) => chunk.content))
    : [];

  const now = new Date().toISOString();
  return {
    id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    title: filename,
    content: textResult.plainText,
    metadata: {
      filename,
      filesize: buffer.length,
      filetype: mimeType || "application/octet-stream",
      uploadedAt: now,
      source: "upload",
      description: `Uploaded file: ${filename}`,
      isGenerated: false,
      documentType,
      pageCount: textResult.pageCount,
      hasOriginalAsset: false,
      hasImageAssets: false,
      previewAssetIds: [],
    },
    chunks: chunks.map((chunk, index) => ({
      id: chunk.id || `chunk_${index}`,
      content: chunk.content,
      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex,
      pageNumber: chunk.pageNumber ?? null,
      sectionTitle: chunk.sectionTitle ?? null,
      markers: chunk.markers ?? [],
    })),
    vectors: vectors.map((embedding, index) => ({
      chunkId: chunks[index]?.id || `chunk_${index}`,
      embedding,
    })),
  };
}

export async function extractDocumentText({
  buffer,
  filename,
  mimeType,
}: {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}): Promise<ExtractedDocumentText> {
  if (mimeType === "application/pdf" || filename.toLowerCase().endsWith(".pdf")) {
    const pdfResult = await parsePdfBuffer(buffer);
    const sanitizedPlain = sanitizeExtractedText(pdfResult.plainText, filename);
    const structuredText =
      pdfResult.structuredText || plainTextToStructured(sanitizedPlain);
    return {
      plainText: sanitizedPlain,
      structuredText,
      pageCount: pdfResult.pageCount,
    };
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    filename.toLowerCase().endsWith(".docx")
  ) {
    const { value } = await mammoth.extractRawText({
      arrayBuffer: buffer.buffer as ArrayBuffer,
    });
    const plainText = sanitizeExtractedText(value, filename);
    return {
      plainText,
      structuredText: plainTextToStructured(plainText),
      pageCount: 1,
    };
  }

  if (SUPPORTED_TEXT_TYPES.has(mimeType) || filename.toLowerCase().endsWith(".txt")) {
    const plainText = sanitizeExtractedText(buffer.toString("utf-8"), filename);
    return {
      plainText,
      structuredText: plainTextToStructured(plainText),
      pageCount: 1,
    };
  }

  throw new Error(
    `Unsupported file type: ${mimeType}. Supported formats: PDF, DOCX, TXT, MD, JSON`
  );
}

function sanitizeExtractedText(content: string, filename: string): string {
  const garbageRatio =
    (content.match(/[^\x20-\x7E\n\r\t]/g) || []).length / Math.max(content.length, 1);
  const hasReadableWords = /\b[a-zA-Z]{3,}\b/.test(content);
  if (garbageRatio > 0.3) {
    throw new Error(
      `File ${filename} contains too much binary/corrupted content (${Math.round(
        garbageRatio * 100
      )}% corrupted)`
    );
  }
  if (!hasReadableWords) {
    throw new Error(`File ${filename} does not contain readable text`);
  }
  if (content.trim().length < 10) {
    throw new Error(`File ${filename} is too short or empty after extraction`);
  }
  return content;
}
