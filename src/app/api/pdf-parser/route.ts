import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 * Extract text from pdf2json data while preserving table structure
 * Analyzes text positions to detect tables and insert proper separators
 */
function extractStructuredText(pdfParser: any): string {
  try {
    const pdfData = pdfParser.data;
    if (!pdfData || !pdfData.Pages) {
      console.warn("⚠️ No PDF data or pages found");
      return pdfParser.getRawTextContent() || "";
    }

    let structuredText = "";
    
    for (let pageIndex = 0; pageIndex < pdfData.Pages.length; pageIndex++) {
      const page = pdfData.Pages[pageIndex];
      
      if (pageIndex > 0) {
        structuredText += `\n----------------Page (${pageIndex}) Break----------------\n`;
      }
      
      if (!page.Texts || page.Texts.length === 0) {
        continue;
      }

      // Group text items by Y position (rows)
      const textItems = page.Texts.map((text: any) => ({
        x: text.x || 0,
        y: text.y || 0,
        content: decodeURIComponent(text.R?.[0]?.T || "").trim()
      })).filter((item: any) => item.content.length > 0);

      // Sort by Y position first (top to bottom), then X position (left to right)
      textItems.sort((a: any, b: any) => {
        const yDiff = b.y - a.y; // pdf2json Y coordinates are inverted
        if (Math.abs(yDiff) > 0.5) return yDiff; // Different rows
        return a.x - b.x; // Same row, sort by X
      });

      // Group into rows with Y tolerance
      const rows: any[][] = [];
      let currentRow: any[] = [];
      let lastY = -1;
      
      for (const item of textItems) {
        if (lastY === -1 || Math.abs(item.y - lastY) <= 0.5) {
          // Same row
          currentRow.push(item);
          lastY = item.y;
        } else {
          // New row
          if (currentRow.length > 0) {
            rows.push([...currentRow]);
          }
          currentRow = [item];
          lastY = item.y;
        }
      }
      
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }

      // Track table state for structural markers
      let inTable = false;
      let consecutiveTableRows = 0;
      const MIN_TABLE_ROWS = 2; // Minimum rows to consider it a table
      
      // Process each row with structural markers
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === 0) continue;
        
        // Sort items in row by X position
        row.sort((a: any, b: any) => a.x - b.x);
        
        // Remove duplicate items with identical content and close positions
        const deduplicatedRow = [];
        for (let j = 0; j < row.length; j++) {
          const currentItem = row[j];
          const lastItem = deduplicatedRow[deduplicatedRow.length - 1];
          
          // Skip if same content and very close X position (likely duplicate)
          if (lastItem && 
              currentItem.content === lastItem.content && 
              Math.abs(currentItem.x - lastItem.x) < 5) {
            continue;
          }
          
          deduplicatedRow.push(currentItem);
        }
        
        // Detect if this looks like a table row (multiple items with significant X gaps)
        const isTableRow = deduplicatedRow.length > 2 && detectTableRow(deduplicatedRow);
        
        if (isTableRow) {
          consecutiveTableRows++;
          
          // Start table if we have enough consecutive rows
          if (!inTable && consecutiveTableRows >= MIN_TABLE_ROWS) {
            // Look back and add table start before previous rows
            const tableStartIndex = Math.max(0, structuredText.lastIndexOf('\n', structuredText.length - 2));
            structuredText = structuredText.substring(0, tableStartIndex) + 
                           "\n<START_TABLE>\n" + 
                           structuredText.substring(tableStartIndex + 1);
            inTable = true;
          }
          
          // Insert separators between columns for table rows with marker
          const rawRowText = deduplicatedRow.map((item: any) => item.content).join(" | ");
          const cleanedRowText = cleanRowText(rawRowText);
          structuredText += `<TABLE_ROW>${cleanedRowText}</TABLE_ROW>\n`;
        } else {
          // End table if we were in one
          if (inTable) {
            structuredText += "<END_TABLE>\n";
            inTable = false;
          }
          consecutiveTableRows = 0;
          
          // Regular text - detect if it's a header/section
          const rawRowText = deduplicatedRow.map((item: any) => item.content).join(" ");
          const cleanedRowText = cleanRowText(rawRowText);
          
          // Simple header detection (all caps, short, or numbered)
          const isHeader = cleanedRowText.length < 100 && 
                          (cleanedRowText === cleanedRowText.toUpperCase() || 
                           /^\d+\.?\s+[A-Z]/.test(cleanedRowText) ||
                           /^[A-Z][^.!?]*$/.test(cleanedRowText));
          
          if (isHeader) {
            structuredText += `<START_SECTION:${cleanedRowText.trim()}>\n${cleanedRowText}\n<END_SECTION>\n`;
          } else {
            // Check if numeric data cluster
            const numericPattern = /\d+\.?\d*\s*(hours?|minutes?|seconds?|ms|[BMK]|GB|MB|KB|tokens?|%)/gi;
            const hasMultipleNumbers = (cleanedRowText.match(numericPattern) || []).length >= 3;
            
            if (hasMultipleNumbers) {
              structuredText += `<START_MEASUREMENT_DATA>\n${cleanedRowText}\n<END_MEASUREMENT_DATA>\n`;
            } else {
              // Regular paragraph
              structuredText += `<START_PARAGRAPH>\n${cleanedRowText}\n<END_PARAGRAPH>\n`;
            }
          }
        }
      }
      
      // Close table if still open at end of page
      if (inTable) {
        structuredText += "<END_TABLE>\n";
        inTable = false;
      }
      
      structuredText += "\n"; // Page break
    }

    console.log(`✅ Structured text extraction: ${structuredText.length} characters with table formatting`);
    return structuredText.trim();
    
  } catch (error) {
    console.error("❌ Structured text extraction failed, falling back to raw text:", error);
    return pdfParser.getRawTextContent() || "";
  }
}

/**
 * Remove repetitive text patterns that corrupt data quality
 */
function deduplicateText(text: string): string {
  // Split into words and remove excessive repetition
  const words = text.split(/\s+/);
  const cleaned = [];
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Count consecutive occurrences of the same word
    let repetitions = 1;
    let j = i + 1;
    while (j < words.length && words[j] === word) {
      repetitions++;
      j++;
    }
    
    // Keep only reasonable repetitions (max 2 for normal text)
    if (repetitions > 3) {
      cleaned.push(word); // Keep only one instance
      i = j - 1; // Skip the repetitions
    } else {
      cleaned.push(word);
    }
  }
  
  return cleaned.join(' ');
}

/**
 * Clean row text by removing common PDF extraction artifacts
 */
function cleanRowText(text: string): string {
  // Apply deduplication
  let cleaned = deduplicateText(text);
  
  // Remove common artifacts with comprehensive patterns
  cleaned = cleaned
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\b(\w+)(\s+\1){2,}/g, '$1') // Remove repeated words (3+ times)
    .replace(/\b([a-f0-9]{6,})\s+(\1\s*){1,}/g, '$1') // Clean repeated commit hashes
    .replace(/\b(\d+(?:\.\d+)?)\s+(\1\s*){2,}/g, '$1') // Clean repeated numbers (including decimals)
    .replace(/\b(here|link|url)\s+(\1\s*){1,}/gi, '$1') // Clean repeated link text
    .replace(/([|]\s*)\1+/g, '$1') // Clean repeated pipe separators
    .replace(/\s*\|\s*\|\s*/g, ' | ') // Fix malformed table separators
    .replace(/(\s[|]\s){2,}/g, ' | ') // Clean excessive pipe separators
    .trim();
    
  // Final quality check - if more than 60% of content is repetitive, likely corrupted
  const words = cleaned.split(/\s+/);
  const uniqueWords = new Set(words);
  const repetitionRatio = 1 - (uniqueWords.size / words.length);
  
  if (repetitionRatio > 0.6 && words.length > 10) {
    console.warn(`⚠️ High repetition detected (${Math.round(repetitionRatio * 100)}%), cleaning further`);
    // Keep only unique words in order of first appearance
    const seenWords = new Set();
    const uniqueSequence = words.filter(word => {
      if (seenWords.has(word)) {
        return false;
      }
      seenWords.add(word);
      return true;
    });
    cleaned = uniqueSequence.join(' ');
  }
    
  return cleaned;
}

/**
 * Detect if a row of text items represents a table row
 * Based on X position gaps and content patterns
 */
function detectTableRow(row: any[]): boolean {
  if (row.length < 3) return false;
  
  // Calculate gaps between items
  const gaps = [];
  for (let i = 1; i < row.length; i++) {
    gaps.push(row[i].x - row[i-1].x);
  }
  
  // Table rows typically have consistent or large gaps
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const hasLargeGaps = avgGap > 2; // Arbitrary threshold
  
  // Check for table-like content (numbers, dates, short text)
  const tableContentPattern = /^[\d\w\-\/\.\s]{1,20}$/;
  const tableItems = row.filter((item: any) => tableContentPattern.test(item.content));
  const hasTableContent = tableItems.length >= row.length * 0.6; // 60% threshold
  
  return hasLargeGaps && hasTableContent;
}

export async function POST(req: NextRequest) {
  console.log("📄 PDF Parser API: Request received");

  try {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData.getAll("FILE");
    let fileName = "";
    let parsedText = "";
    let pageCount = 1;

    console.log(
      `📄 PDF Parser API: Found ${uploadedFiles.length} uploaded files`
    );

    if (uploadedFiles && uploadedFiles.length > 0) {
      const uploadedFile = uploadedFiles[0];
      console.log("Uploaded file:", uploadedFile);
      console.log("Uploaded file type:", typeof uploadedFile);

      // Check if uploadedFile has the necessary properties instead of using instanceof File
      // This works better in serverless environments where File constructor might not be available
      if (
        uploadedFile &&
        typeof uploadedFile === "object" &&
        "arrayBuffer" in uploadedFile &&
        typeof uploadedFile.arrayBuffer === "function"
      ) {
        fileName = uuidv4();

        // Use a more reliable temp path for Windows
        const tempDir = process.env.TEMP || process.env.TMP || "/tmp";
        const tempFilePath = `${tempDir}/${fileName}.pdf`;

        const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

        try {
          await fs.writeFile(tempFilePath, fileBuffer);
          console.log(`📄 File written to: ${tempFilePath}`);
        } catch (writeError) {
          console.error("❌ Failed to write temp file:", writeError);
          throw new Error(`Failed to write temporary file: ${writeError}`);
        }
        console.log(`📄 Starting PDF parsing for: ${tempFilePath}`);

        try {
          console.log(
            `📄 Using pdf2json to parse PDF, buffer size: ${fileBuffer.length} bytes`
          );

          // Import pdf2json (Node.js compatible)
          const PDFParser = require("pdf2json");
          const pdfParser = new PDFParser(null, 1);

          // Calculate dynamic timeout based on file size
          const fileSizeMB = fileBuffer.length / (1024 * 1024);
          const dynamicTimeout = Math.max(30000, 30000 + (fileSizeMB * 3000)); // 30s base + 3s per MB
          console.log(`📄 PDF size: ${fileSizeMB.toFixed(2)}MB, parsing timeout: ${(dynamicTimeout/1000).toFixed(0)}s`);

          // Parse PDF with pdf2json using Promise wrapper
          parsedText = await new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error(`PDF2JSON parsing timeout after ${(dynamicTimeout/1000).toFixed(0)} seconds`));
            }, dynamicTimeout);

            pdfParser.on("pdfParser_dataReady", () => {
              clearTimeout(timeout);

              // Extract text with table structure preservation
              const text = extractStructuredText(pdfParser) || "";

              // Get actual page count from pdf2json
              pageCount = pdfParser.data?.Pages?.length || 1;

              console.log(`📄 pdf2json extracted ${text.length} characters with table structure from ${pageCount} pages`);
              resolve(text);
            });

            pdfParser.on("pdfParser_dataError", (errData: any) => {
              clearTimeout(timeout);
              console.error("❌ pdf2json parsing error:", errData.parserError);
              reject(
                new Error(`PDF2JSON parsing failed: ${errData.parserError}`)
              );
            });

            console.log(
              `📄 Loading PDF with pdf2json from temp file: ${tempFilePath}`
            );
            pdfParser.loadPDF(tempFilePath);
          });

          console.log("✅ PDF parsing completed successfully with pdf2json");
          console.log(
            `📄 Extracted text length: ${parsedText.length} characters`
          );

          // Debug: Show first 500 chars of extracted text
          if (parsedText.length > 0) {
            console.log(
              `📝 First 500 chars of extracted text:`,
              parsedText.substring(0, 500)
            );
          } else {
            console.warn("⚠️ No text was extracted from the PDF!");
          }

          // Clean up temp file if it was created
          try {
            await fs.unlink(tempFilePath);
            console.log(`🗑️ Cleaned up temp file: ${tempFilePath}`);
          } catch (cleanupError) {
            console.warn("⚠️ Failed to clean up temp file:", cleanupError);
          }
        } catch (parseError) {
          console.error("❌ PDF parsing with pdf2json failed:", parseError);

          // Clean up temp file on error
          try {
            await fs.unlink(tempFilePath);
            console.log(`🗑️ Cleaned up temp file after error: ${tempFilePath}`);
          } catch (cleanupError) {
            console.warn(
              "⚠️ Failed to clean up temp file after error:",
              cleanupError
            );
          }

          throw new Error(
            `PDF parsing failed: ${parseError instanceof Error ? parseError.message : String(parseError)}`
          );
        }
      } else {
        console.log(
          "Uploaded file is not in the expected format or missing required methods."
        );
        console.log(
          "Expected: object with arrayBuffer method, got:",
          typeof uploadedFile,
          uploadedFile
        );
        return new NextResponse(
          "Uploaded file is not in the expected format or missing required methods.",
          {
            status: 500,
          }
        );
      }
    } else {
      console.log("No files found.");
      return new NextResponse("No File Found", { status: 404 });
    }

    const response = NextResponse.json({
      text: parsedText,
      pageCount: pageCount || 1,
      fileName: fileName
    });
    console.log(
      `✅ PDF Parser API: Successfully processed file, returning ${parsedText.length} characters from ${pageCount} pages`
    );
    return response;
  } catch (error) {
    console.error("❌ PDF Parser API: Unexpected error:", error);
    return new NextResponse(
      `PDF parsing failed: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}
