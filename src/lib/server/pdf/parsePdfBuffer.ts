"use server";

import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
// Import directly from the library implementation to avoid the debug harness
// in node_modules/pdf-parse/index.js that reads ./test/data/05-versions-space.pdf.
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { extractStructuredTextFromPdfData } from "./structuredText";
import { loadPdfParser } from "./loadPdfParser";
import {
  plainTextToStructured,
  stripStructureMarkers,
} from "../textCleanup";
import { smartPageRenderer } from "./renderSmartPage";

export interface ParsedPdfResult {
  plainText: string;
  structuredText: string;
  pageCount: number;
}

export async function parsePdfBuffer(
  buffer: Buffer,
  options: { timeoutMs?: number } = {}
): Promise<ParsedPdfResult> {
  const pdfParseResult = await tryParseWithPdfParse(buffer);
  if (pdfParseResult) {
    return pdfParseResult;
  }

  return parseWithPdf2Json(buffer, options);
}

async function tryParseWithPdfParse(
  buffer: Buffer
): Promise<ParsedPdfResult | null> {
  try {
    const parsed = await pdfParse(buffer, {
      pagerender: smartPageRenderer as any,
      max: 0,
    });
    const normalizedText = normalizePlainText(parsed.text || "");
    const structuredText = plainTextToStructured(normalizedText);
    return {
      plainText: normalizedText,
      structuredText,
      pageCount: parsed.numpages || 1,
    };
  } catch (error) {
    console.warn("pdf-parse extraction failed, falling back to pdf2json:", error);
    return null;
  }
}

async function parseWithPdf2Json(
  buffer: Buffer,
  options: { timeoutMs?: number }
): Promise<ParsedPdfResult> {
  const fileId = uuidv4();
  const tempDir = process.env.TEMP || process.env.TMP || "/tmp";
  const tempPath = `${tempDir}/${fileId}.pdf`;
  await fs.writeFile(tempPath, buffer);

  const timeoutMs =
    options.timeoutMs ?? Math.max(30000, 30000 + (buffer.length / (1024 * 1024)) * 3000);

  const PdfParserCtor = await loadPdfParser();
  const pdfParser = new PdfParserCtor(null, 1);

  try {
    const structuredText = await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`PDF parsing timeout after ${(timeoutMs / 1000).toFixed(0)} seconds`));
      }, timeoutMs);

      pdfParser.on("pdfParser_dataReady", () => {
        clearTimeout(timeout);
        const structured = extractStructuredTextFromPdfData(pdfParser) || "";
        resolve(structured);
      });

      pdfParser.on("pdfParser_dataError", (errData: any) => {
        clearTimeout(timeout);
        reject(new Error(`PDF parsing failed: ${errData?.parserError || "unknown error"}`));
      });

      pdfParser.loadPDF(tempPath);
    });

    const pageCount = pdfParser.data?.Pages?.length || 1;
    const plainText = normalizePlainText(stripStructureMarkers(structuredText));
    return { plainText, structuredText, pageCount };
  } finally {
    try {
      await fs.unlink(tempPath);
    } catch {
      // ignore cleanup errors
    }
  }
}

function normalizePlainText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}
