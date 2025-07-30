/**
 * PDF Parser Utility
 * Uses server-side API route for PDF text extraction
 * Reliable PDF parsing via pdf2json on the server
 */

export interface PDFParseResult {
  text: string;
  pages: number;
  info: {
    Title?: string;
    Author?: string;
    Subject?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
  };
  metadata: {
    filename: string;
    filesize: number;
    pageCount: number;
    textLength: number;
    hasText: boolean;
    parseTime: number;
  };
}

export interface PDFParseOptions {
  maxPages?: number;
  maxTextLength?: number;
  includeMetadata?: boolean;
  onProgress?: (progress: {
    page: number;
    total: number;
    message: string;
  }) => void;
}

export class PDFParser {
  private static instance: PDFParser;

  private constructor() {}

  static getInstance(): PDFParser {
    if (!PDFParser.instance) {
      PDFParser.instance = new PDFParser();
    }
    return PDFParser.instance;
  }

  /**
   * Parse PDF file and extract text content via API route
   */
  async parsePDF(
    file: File,
    options: PDFParseOptions = {}
  ): Promise<PDFParseResult> {
    const startTime = Date.now();
    const {
      maxPages = 100,
      maxTextLength = 1000000, // 1MB text limit
      includeMetadata = true,
      onProgress,
    } = options;

    try {
      console.log(
        `📄 Parsing PDF: ${file.name} (${this.formatFileSize(file.size)})`
      );

      onProgress?.({
        page: 0,
        total: 1,
        message: "Uploading PDF to server...",
      });

      // Create FormData for API request
      const formData = new FormData();
      formData.append("FILE", file);

      onProgress?.({
        page: 0,
        total: 1,
        message: "Parsing PDF on server...",
      });

      // Call the API route
      const response = await fetch("/api/pdf-parser", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      // Get the parsed text from response
      const parsedText = await response.text();

      onProgress?.({
        page: 1,
        total: 1,
        message: "Processing extracted text...",
      });

      // Clean and normalize text
      let text = this.cleanText(parsedText);

      // Truncate if too long
      if (text.length > maxTextLength) {
        console.warn(
          `⚠️ PDF text truncated: ${text.length} > ${maxTextLength} characters`
        );
        text =
          text.substring(0, maxTextLength) +
          "\n\n[Content truncated due to length limit]";
      }

      // Validate text extraction
      const hasText = text.trim().length > 0;
      if (!hasText) {
        console.warn(`⚠️ No text extracted from PDF: ${file.name}`);
        text = "[No text content could be extracted from this PDF]";
      }

      // Estimate page count based on text length (rough approximation)
      const estimatedPages = Math.max(1, Math.ceil(text.length / 2000));

      onProgress?.({
        page: estimatedPages,
        total: estimatedPages,
        message: `Extracted ${estimatedPages} pages with ${text.length} characters`,
      });

      const finalResult: PDFParseResult = {
        text,
        pages: estimatedPages,
        info: {}, // Metadata not available from API route
        metadata: {
          filename: file.name,
          filesize: file.size,
          pageCount: estimatedPages,
          textLength: text.length,
          hasText,
          parseTime: Date.now() - startTime,
        },
      };

      console.log(`✅ PDF parsed successfully:`, {
        filename: file.name,
        pages: estimatedPages,
        textLength: text.length,
        parseTime: `${finalResult.metadata.parseTime}ms`,
        hasText,
      });

      return finalResult;
    } catch (error) {
      const parseTime = Date.now() - startTime;
      console.error(`❌ PDF parsing failed for ${file.name}:`, error);

      // Return fallback result
      return {
        text: `[PDF parsing failed: ${error instanceof Error ? error.message : "Unknown error"}]`,
        pages: 0,
        info: {},
        metadata: {
          filename: file.name,
          filesize: file.size,
          pageCount: 0,
          textLength: 0,
          hasText: false,
          parseTime,
        },
      };
    }
  }

  /**
   * Parse multiple PDF files
   */
  async parseMultiplePDFs(
    files: FileList,
    options: PDFParseOptions = {}
  ): Promise<PDFParseResult[]> {
    const results: PDFParseResult[] = [];
    const totalFiles = files.length;

    console.log(`📚 Parsing ${totalFiles} PDF files...`);

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];

      if (file.type === "application/pdf") {
        try {
          const result = await this.parsePDF(file, {
            ...options,
            onProgress: (progress) => {
              options.onProgress?.({
                page: progress.page,
                total: progress.total,
                message: `[${i + 1}/${totalFiles}] ${file.name}: ${progress.message}`,
              });
            },
          });
          results.push(result);
        } catch (error) {
          console.error(`❌ Failed to parse ${file.name}:`, error);
          // Add error result
          results.push({
            text: `[Failed to parse: ${error instanceof Error ? error.message : "Unknown error"}]`,
            pages: 0,
            info: {},
            metadata: {
              filename: file.name,
              filesize: file.size,
              pageCount: 0,
              textLength: 0,
              hasText: false,
              parseTime: 0,
            },
          });
        }
      } else {
        console.warn(`⚠️ Skipping non-PDF file: ${file.name} (${file.type})`);
      }
    }

    console.log(`✅ Parsed ${results.length}/${totalFiles} PDF files`);
    return results;
  }

  /**
   * Clean and normalize extracted text
   */
  private cleanText(text: string): string {
    return (
      text
        // Remove excessive whitespace
        .replace(/\s+/g, " ")
        // Remove excessive newlines
        .replace(/\n\s*\n\s*\n/g, "\n\n")
        // Fix common PDF extraction issues
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase
        .replace(/([.!?])([A-Z])/g, "$1 $2") // Add space after punctuation
        // Remove control characters
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
        // Trim whitespace
        .trim()
    );
  }

  /**
   * Format file size for logging
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  /**
   * Check if file is a PDF
   */
  static isPDF(file: File): boolean {
    return (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    );
  }

  /**
   * Get PDF file info without parsing full content
   */
  async getPDFInfo(file: File): Promise<{
    filename: string;
    filesize: number;
    isPDF: boolean;
    canParse: boolean;
  }> {
    const isPDF = PDFParser.isPDF(file);

    if (!isPDF) {
      return {
        filename: file.name,
        filesize: file.size,
        isPDF: false,
        canParse: false,
      };
    }

    // Check if file is too large (over 50MB)
    const canParse = file.size <= 50 * 1024 * 1024;

    return {
      filename: file.name,
      filesize: file.size,
      isPDF: true,
      canParse,
    };
  }
}

// Export singleton instance
export const pdfParser = PDFParser.getInstance();
