"use server";

import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { extractStructuredTextFromPdfData } from "./structuredText";
import { loadPdfParser } from "./loadPdfParser";
import {
  plainTextToStructured,
  stripStructureMarkers,
} from "../textCleanup";

export interface ParsedPdfResult {
  plainText: string;
  structuredText: string;
  pageCount: number;
}

export async function parsePdfBuffer(
  buffer: Buffer,
  options: { timeoutMs?: number } = {}
): Promise<ParsedPdfResult> {
  const bufferSizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`📄 PDF Parser: Starting extraction for buffer of size ${bufferSizeMB} MB`);
  
  const pdfResult = await tryParseWithPdfCli(buffer);
  if (pdfResult) {
    console.log(`✅ PDF Parser: Using pdf-parse CLI (high quality) - extracted ${pdfResult.plainText.length} chars from ${pdfResult.pageCount} pages`);
    return pdfResult;
  }

  console.warn(`⚠️ PDF Parser: pdf-parse CLI failed, falling back to pdf2json (may have lower quality)`);
  return parseWithPdf2Json(buffer, options);
}

async function tryParseWithPdfCli(
  buffer: Buffer
): Promise<ParsedPdfResult | null> {
  const scriptPath = await ensurePdfCliScript();
  console.log(`🔧 PDF Parser: Attempting pdf-parse CLI with script at: ${scriptPath}`);

  return new Promise((resolve) => {
    const child = spawn(process.execPath, [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    child.stdout.on("data", (chunk) => stdoutChunks.push(chunk));
    child.stderr.on("data", (chunk) => stderrChunks.push(chunk));

    child.on("error", (error) => {
      console.warn("❌ PDF Parser: pdf-parse CLI failed to spawn:", {
        error: error.message,
        code: (error as any).code,
        syscall: (error as any).syscall,
        path: (error as any).path,
        scriptPath
      });
      resolve(null);
    });

    child.on("close", (code) => {
      if (code !== 0) {
        const stderr = Buffer.concat(stderrChunks).toString();
        console.warn(
          `❌ PDF Parser: pdf-parse CLI exited with code ${code}`,
          { stderr: stderr.substring(0, 500), scriptPath }
        );
        resolve(null);
        return;
      }

      try {
        const payload = JSON.parse(Buffer.concat(stdoutChunks).toString());
        const plainText = normalizePlainText(payload.text || "");
        const pageCount = payload.numpages || 1;
        console.log(`✅ PDF Parser: pdf-parse CLI succeeded - ${plainText.length} chars, ${pageCount} pages`);
        resolve({
          plainText,
          structuredText: plainTextToStructured(plainText),
          pageCount,
        });
      } catch (error) {
        console.warn("❌ PDF Parser: Failed to parse pdf-parse CLI output:", {
          error: error instanceof Error ? error.message : String(error),
          stdout: Buffer.concat(stdoutChunks).toString().substring(0, 200)
        });
        resolve(null);
      }
    });

    child.stdin.write(buffer);
    child.stdin.end();
  });
}

const FALLBACK_CLI_SOURCE = `"use strict";
const pdfParse = require("pdf-parse/lib/pdf-parse.js");
const SAME_LINE_Y_TOLERANCE = 2;
const SPACE_GAP_MULTIPLIER = 0.6;
function smartPageRenderer(pageData) {
  return pageData
    .getTextContent({
      normalizeWhitespace: false,
      disableCombineTextItems: false,
    })
    .then(({ items }) => {
      let lastY = null;
      let lastX = null;
      let currentLine = "";
      const lines = [];
      for (const item of items || []) {
        if (!item || !item.str) continue;
        const transform = Array.isArray(item.transform)
          ? item.transform
          : [1, 0, 0, 1, 0, 0];
        const y = Math.round(transform[5] || 0);
        const x = transform[4] || 0;
        const text = item.str;
        const avgCharWidth =
          item.width && text.length
            ? item.width / text.length
            : Math.max(text.length ? text.length * 0.6 : 4, 4);
        const sameLine =
          lastY === null || Math.abs(y - lastY) <= SAME_LINE_Y_TOLERANCE;
        if (!sameLine) {
          if (currentLine.trim()) {
            lines.push(currentLine.trim());
          } else if (currentLine) {
            lines.push(currentLine);
          }
          currentLine = "";
          lastX = null;
        }
        if (lastX !== null && sameLine) {
          const gap = x - lastX;
          if (gap > avgCharWidth * SPACE_GAP_MULTIPLIER) {
            currentLine += " ";
          }
        }
        currentLine += text;
        lastY = y;
        lastX = x + (item.width || avgCharWidth * text.length);
      }
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      } else if (currentLine) {
        lines.push(currentLine);
      }
      return lines
        .join("\n")
        .replace(/\u00a0/g, " ")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]{2,})([a-z]+)/g, "$1 $2")
        .trim();
    });
}
async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  try {
    const result = await pdfParse(buffer, {
      pagerender: smartPageRenderer,
      max: 0,
    });
    process.stdout.write(
      JSON.stringify({
        text: result.text || "",
        numpages: result.numpages || 1,
      })
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();
`;

async function ensurePdfCliScript(): Promise<string> {
  const repoScript = path.join(process.cwd(), "scripts/pdf-extract-cli.js");
  try {
    await fs.access(repoScript);
    console.log(`♻️ PDF Parser: Using repo pdf-parse CLI script at: ${repoScript}`);
    return repoScript;
  } catch {
    const tempPath = path.join(
      os.tmpdir(),
      "pdf-extract-cli.generated.js"
    );
    try {
      await fs.access(tempPath);
      console.log(`♻️ PDF Parser: Reusing existing temp pdf-parse CLI script at: ${tempPath}`);
      return tempPath;
    } catch {
      console.log(`📝 PDF Parser: Creating new pdf-parse CLI script at: ${tempPath}`);
      try {
        await fs.writeFile(tempPath, FALLBACK_CLI_SOURCE, "utf8");
        console.log(`✅ PDF Parser: Successfully created CLI script`);
        return tempPath;
      } catch (error) {
        console.error(`❌ PDF Parser: Failed to create CLI script:`, {
          error: error instanceof Error ? error.message : String(error),
          tempPath,
          tmpdir: os.tmpdir()
        });
        throw error;
      }
    }
  }
}

async function parseWithPdf2Json(
  buffer: Buffer,
  options: { timeoutMs?: number }
): Promise<ParsedPdfResult> {
  console.log(`📦 PDF Parser: Using pdf2json fallback parser`);
  
  const fileId = uuidv4();
  const tempDir = process.env.TEMP || process.env.TMP || "/tmp";
  const tempPath = `${tempDir}/${fileId}.pdf`;
  
  try {
    await fs.writeFile(tempPath, buffer);
    console.log(`📁 PDF Parser: Created temp PDF at: ${tempPath}`);
  } catch (error) {
    console.error(`❌ PDF Parser: Failed to write temp PDF file:`, {
      error: error instanceof Error ? error.message : String(error),
      tempDir,
      tempPath
    });
    throw error;
  }

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
    console.log(`✅ PDF Parser: pdf2json completed - ${plainText.length} chars from ${pageCount} pages`);
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
