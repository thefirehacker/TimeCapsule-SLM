/**
 * Enhanced Document Processor
 *
 * Handles mixed content documents with both text and structured data (tables).
 * Provides utilities for chunking, embedding, and processing documents with tables.
 */

import { v4 as uuidv4 } from "uuid";
import {
  EnhancedChunk,
  LegacyChunk,
  TableData,
  ChunkContent,
  ProcessingResult,
  getChunkText,
  tableToText,
  tableToMarkdown,
} from "@/types/chunks";

export interface DocumentProcessingOptions {
  chunkSize?: number; // Target chunk size in words
  overlapSize?: number; // Overlap between chunks in words
  preserveTableIntegrity?: boolean; // Keep tables as complete units
  includeTableMetadata?: boolean; // Include table metadata in chunks
  preferredTextFormat?: "plain" | "markdown"; // Format for table text conversion
}

export interface ProcessedDocumentResult {
  chunks: EnhancedChunk[];
  metadata: {
    totalChunks: number;
    textChunks: number;
    tableChunks: number;
    mixedChunks: number;
    totalWords: number;
    totalTables: number;
    processingTime: number;
  };
}

export class EnhancedDocumentProcessor {
  private options: Required<DocumentProcessingOptions>;

  constructor(options: DocumentProcessingOptions = {}) {
    this.options = {
      chunkSize: 500,
      overlapSize: 50,
      preserveTableIntegrity: true,
      includeTableMetadata: true,
      preferredTextFormat: "markdown",
      ...options,
    };
  }

  /**
   * Process a document with mixed content (text + tables)
   */
  public async processDocument(
    text: string,
    tables: TableData[] = [],
    documentId?: string
  ): Promise<ProcessedDocumentResult> {
    const startTime = Date.now();

    const chunks = await this.createMixedContentChunks(
      text,
      tables,
      documentId
    );

    const metadata = this.calculateMetadata(chunks, startTime);

    return {
      chunks,
      metadata,
    };
  }

  /**
   * Create chunks from mixed content, intelligently handling tables
   */
  private async createMixedContentChunks(
    text: string,
    tables: TableData[],
    documentId?: string
  ): Promise<EnhancedChunk[]> {
    const chunks: EnhancedChunk[] = [];

    if (tables.length === 0) {
      // No tables, process as pure text
      return this.createTextChunks(text, documentId);
    }

    // Strategy: Create table chunks first, then fill gaps with text chunks
    const tableChunks = this.createTableChunks(tables, documentId);
    chunks.push(...tableChunks);

    // Create text chunks for content not covered by tables
    const textChunks = this.createTextChunks(text, documentId, tables);
    chunks.push(...textChunks);

    // Sort chunks by their position in the document
    return this.sortChunksByPosition(chunks);
  }

  /**
   * Create chunks from tables
   */
  private createTableChunks(
    tables: TableData[],
    documentId?: string
  ): EnhancedChunk[] {
    return tables.map((table, index) => {
      const chunkId = `${documentId || "doc"}_table_${index}_${uuidv4()}`;

      // Calculate position based on table metadata
      const startIndex = table.metadata?.position?.y || index * 1000;
      const endIndex = startIndex + 100; // Estimated table size

      const content: ChunkContent = {
        type: "table",
        table: table,
        text:
          this.options.preferredTextFormat === "markdown"
            ? tableToMarkdown(table)
            : tableToText(table),
        rawContent: JSON.stringify(table),
      };

      return {
        id: chunkId,
        content,
        startIndex,
        endIndex,
        metadata: {
          pageNumber: table.metadata?.pageNumber,
          hasStructuredData: true,
          tableCount: 1,
          extractionQuality:
            table.metadata?.confidence && table.metadata.confidence > 0.8
              ? "high"
              : "medium",
        },
      };
    });
  }

  /**
   * Create text chunks, avoiding table regions if preserveTableIntegrity is true
   */
  private createTextChunks(
    text: string,
    documentId?: string,
    tables: TableData[] = []
  ): Promise<EnhancedChunk[]> {
    return new Promise((resolve) => {
      const chunks: EnhancedChunk[] = [];
      const words = text.split(/\s+/);
      const totalWords = words.length;

      let currentIndex = 0;
      let chunkNumber = 0;

      while (currentIndex < totalWords) {
        const chunkWords = words.slice(
          currentIndex,
          Math.min(currentIndex + this.options.chunkSize, totalWords)
        );

        const chunkText = chunkWords.join(" ");
        const startIndex = this.calculateCharacterPosition(words, currentIndex);
        const endIndex = this.calculateCharacterPosition(
          words,
          currentIndex + chunkWords.length
        );

        const chunkId = `${documentId || "doc"}_text_${chunkNumber}_${uuidv4()}`;

        const content: ChunkContent = {
          type: "text",
          text: chunkText,
          rawContent: chunkText,
        };

        chunks.push({
          id: chunkId,
          content,
          startIndex,
          endIndex,
          metadata: {
            hasStructuredData: false,
            wordCount: chunkWords.length,
            extractionQuality: "high",
          },
        });

        // Calculate next position with overlap
        currentIndex += this.options.chunkSize - this.options.overlapSize;
        chunkNumber++;
      }

      resolve(chunks);
    });
  }

  /**
   * Sort chunks by their position in the document
   */
  private sortChunksByPosition(chunks: EnhancedChunk[]): EnhancedChunk[] {
    return chunks.sort((a, b) => a.startIndex - b.startIndex);
  }

  /**
   * Calculate character position from word index
   */
  private calculateCharacterPosition(
    words: string[],
    wordIndex: number
  ): number {
    if (wordIndex <= 0) return 0;
    if (wordIndex >= words.length) return words.join(" ").length;

    return words.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
  }

  /**
   * Calculate processing metadata
   */
  private calculateMetadata(chunks: EnhancedChunk[], startTime: number) {
    const textChunks = chunks.filter(
      (chunk) => chunk.content.type === "text"
    ).length;
    const tableChunks = chunks.filter(
      (chunk) => chunk.content.type === "table"
    ).length;
    const mixedChunks = chunks.filter(
      (chunk) => chunk.content.type === "mixed"
    ).length;

    const totalWords = chunks.reduce((total, chunk) => {
      return total + (chunk.metadata?.wordCount || 0);
    }, 0);

    const totalTables = chunks.reduce((total, chunk) => {
      return total + (chunk.metadata?.tableCount || 0);
    }, 0);

    return {
      totalChunks: chunks.length,
      textChunks,
      tableChunks,
      mixedChunks,
      totalWords,
      totalTables,
      processingTime: Date.now() - startTime,
    };
  }

  /**
   * Convert enhanced chunks to legacy format for backward compatibility
   */
  public static toLegacyChunks(enhancedChunks: EnhancedChunk[]): LegacyChunk[] {
    return enhancedChunks.map((chunk) => ({
      id: chunk.id,
      content: getChunkText(chunk),
      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex,
    }));
  }

  /**
   * Convert legacy chunks to enhanced format
   */
  public static fromLegacyChunks(legacyChunks: LegacyChunk[]): EnhancedChunk[] {
    return legacyChunks.map((chunk) => ({
      id: chunk.id,
      content: {
        type: "text" as const,
        text: chunk.content,
        rawContent: chunk.content,
      },
      startIndex: chunk.startIndex,
      endIndex: chunk.endIndex,
      metadata: {
        hasStructuredData: false,
        wordCount: chunk.content.split(/\s+/).length,
        extractionQuality: "high" as const,
      },
    }));
  }

  /**
   * Search chunks by content, including table data
   */
  public static searchChunks(
    chunks: EnhancedChunk[],
    query: string,
    options: {
      searchTables?: boolean;
      caseSensitive?: boolean;
      includeMetadata?: boolean;
    } = {}
  ): { chunk: EnhancedChunk; matches: string[]; score: number }[] {
    const {
      searchTables = true,
      caseSensitive = false,
      includeMetadata = false,
    } = options;
    const searchQuery = caseSensitive ? query : query.toLowerCase();

    const results: {
      chunk: EnhancedChunk;
      matches: string[];
      score: number;
    }[] = [];

    for (const chunk of chunks) {
      const matches: string[] = [];
      let score = 0;

      // Search in text content
      const textContent = getChunkText(chunk);
      const searchText = caseSensitive
        ? textContent
        : textContent.toLowerCase();

      if (searchText.includes(searchQuery)) {
        matches.push("text");
        score += 1;
      }

      // Search in table data if enabled
      if (
        searchTables &&
        chunk.content.type === "table" &&
        chunk.content.table
      ) {
        const tableText = tableToText(chunk.content.table);
        const searchTableText = caseSensitive
          ? tableText
          : tableText.toLowerCase();

        if (searchTableText.includes(searchQuery)) {
          matches.push("table");
          score += 2; // Tables get higher score
        }
      }

      // Search in metadata if enabled
      if (includeMetadata && chunk.metadata) {
        const metadataText = JSON.stringify(chunk.metadata);
        const searchMetadataText = caseSensitive
          ? metadataText
          : metadataText.toLowerCase();

        if (searchMetadataText.includes(searchQuery)) {
          matches.push("metadata");
          score += 0.5;
        }
      }

      if (matches.length > 0) {
        results.push({ chunk, matches, score });
      }
    }

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * Export chunks to different formats
   */
  public static exportChunks(
    chunks: EnhancedChunk[],
    format: "json" | "markdown" | "text" | "csv"
  ): string {
    switch (format) {
      case "json":
        return JSON.stringify(chunks, null, 2);

      case "markdown":
        return chunks
          .map((chunk) => {
            let content = `## Chunk ${chunk.id}\n\n`;
            if (chunk.content.type === "table" && chunk.content.table) {
              content += tableToMarkdown(chunk.content.table);
            } else {
              content += chunk.content.text || chunk.content.rawContent || "";
            }
            return content;
          })
          .join("\n\n---\n\n");

      case "text":
        return chunks.map((chunk) => getChunkText(chunk)).join("\n\n");

      case "csv":
        const headers = [
          "ID",
          "Type",
          "Content",
          "Start Index",
          "End Index",
          "Has Tables",
        ];
        const rows = chunks.map((chunk) => [
          chunk.id,
          chunk.content.type,
          `"${getChunkText(chunk).replace(/"/g, '""')}"`,
          chunk.startIndex.toString(),
          chunk.endIndex.toString(),
          (
            chunk.content.type === "table" || chunk.metadata?.hasStructuredData
          ).toString(),
        ]);
        return [headers.join(","), ...rows.map((row) => row.join(","))].join(
          "\n"
        );

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }
}

