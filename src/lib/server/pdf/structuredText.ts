/**
 * Helpers for building structured text from pdf2json output.
 * Shared by server ingestion and the legacy /api/pdf-parser route.
 */
import { collapseSpacedTokens } from "../textCleanup";

function deduplicateText(text: string): string {
  const words = text.split(/\s+/);
  const cleaned: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let repetitions = 1;
    let j = i + 1;
    while (j < words.length && words[j] === word) {
      repetitions++;
      j++;
    }
    if (repetitions > 3) {
      cleaned.push(word);
      i = j - 1;
    } else {
      cleaned.push(word);
    }
  }

  return cleaned.join(" ");
}

function cleanRowText(text: string): string {
  let cleaned = deduplicateText(text)
    .replace(/\s+/g, " ")
    .replace(/\b(\w+)(\s+\1){2,}/g, "$1")
    .replace(/\b([a-f0-9]{6,})\s+(\1\s*){1,}/g, "$1")
    .replace(/\b(\d+(?:\.\d+)?)\s+(\1\s*){2,}/g, "$1")
    .replace(/\b(here|link|url)\s+(\1\s*){1,}/gi, "$1")
    .replace(/([|]\s*)\1+/g, "$1")
    .replace(/\s*\|\s*\|\s*/g, " | ")
    .replace(/(\s[|]\s){2,}/g, " | ")
    .trim();

  const words = cleaned.split(/\s+/);
  const uniqueWords = new Set(words);
  const repetitionRatio = 1 - uniqueWords.size / words.length;

  if (repetitionRatio > 0.6 && words.length > 10) {
    const seenWords = new Set<string>();
    const uniqueSequence = words.filter((word) => {
      if (seenWords.has(word)) {
        return false;
      }
      seenWords.add(word);
      return true;
    });
    cleaned = uniqueSequence.join(" ");
  }

  return collapseSpacedTokens(cleaned);
}

function detectTableRow(row: Array<{ x: number; content: string }>): boolean {
  if (row.length < 3) return false;
  const gaps: number[] = [];
  for (let i = 1; i < row.length; i++) {
    gaps.push(row[i].x - row[i - 1].x);
  }
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const hasLargeGaps = avgGap > 2;
  const tableContentPattern = /^[\d\w\-\/\.\s]{1,20}$/;
  const tableItems = row.filter((item) => tableContentPattern.test(item.content));
  const hasTableContent = tableItems.length >= row.length * 0.6;
  return hasLargeGaps && hasTableContent;
}

export function extractStructuredTextFromPdfData(pdfParser: any): string {
  const pdfData = pdfParser.data;
  if (!pdfData || !Array.isArray(pdfData.Pages)) {
    return pdfParser.getRawTextContent?.() || "";
  }

  let structuredText = "";

  for (let pageIndex = 0; pageIndex < pdfData.Pages.length; pageIndex++) {
    const page = pdfData.Pages[pageIndex];

    if (pageIndex > 0) {
      structuredText += `\n----------------Page (${pageIndex}) Break----------------\n`;
    }

    if (!page?.Texts?.length) continue;

    const textItems = page.Texts.map((text: any) => ({
      x: text.x || 0,
      y: text.y || 0,
      content: decodeURIComponent(text.R?.[0]?.T || "").trim(),
    })).filter((item: any) => item.content.length > 0);

    textItems.sort((a: any, b: any) => {
      const yDiff = b.y - a.y;
      if (Math.abs(yDiff) > 0.5) return yDiff;
      return a.x - b.x;
    });

    const rows: any[][] = [];
    let currentRow: any[] = [];
    let lastY = -1;

    for (const item of textItems) {
      if (lastY === -1 || Math.abs(item.y - lastY) <= 0.5) {
        currentRow.push(item);
        lastY = item.y;
      } else {
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
        }
        currentRow = [item];
        lastY = item.y;
      }
    }
    if (currentRow.length > 0) rows.push(currentRow);

    let inTable = false;
    let consecutiveTableRows = 0;
    const MIN_TABLE_ROWS = 2;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.length === 0) continue;
      row.sort((a: any, b: any) => a.x - b.x);

      const deduplicatedRow: any[] = [];
      for (let j = 0; j < row.length; j++) {
        const currentItem = row[j];
        const lastItem = deduplicatedRow[deduplicatedRow.length - 1];
        if (
          lastItem &&
          currentItem.content === lastItem.content &&
          Math.abs(currentItem.x - lastItem.x) < 5
        ) {
          continue;
        }
        deduplicatedRow.push(currentItem);
      }

      const isTableRow =
        deduplicatedRow.length > 2 && detectTableRow(deduplicatedRow);

      if (isTableRow) {
        consecutiveTableRows++;
        if (!inTable && consecutiveTableRows >= MIN_TABLE_ROWS) {
          structuredText += "\n<START_TABLE>\n";
          inTable = true;
        }
        const rawRowText = deduplicatedRow
          .map((item: any) => item.content)
          .join(" | ");
        structuredText += `<TABLE_ROW>${cleanRowText(rawRowText)}</TABLE_ROW>\n`;
      } else {
        if (inTable) {
          structuredText += "<END_TABLE>\n";
          inTable = false;
        }
        consecutiveTableRows = 0;

        const rawRowText = deduplicatedRow
          .map((item: any) => item.content)
          .join(" ");
        const cleanedRowText = cleanRowText(rawRowText);

        const isHeader =
          cleanedRowText.length < 100 &&
          (cleanedRowText === cleanedRowText.toUpperCase() ||
            /^\d+\.?\s+[A-Z]/.test(cleanedRowText) ||
            /^[A-Z][^.!?]*$/.test(cleanedRowText));

        if (isHeader) {
          structuredText += `<START_SECTION:${cleanedRowText.trim()}>\n${cleanedRowText}\n<END_SECTION>\n`;
        } else {
          const numericPattern =
            /\d+\.?\d*\s*(hours?|minutes?|seconds?|ms|[BMK]|GB|MB|KB|tokens?|%)/gi;
          const hasMultipleNumbers =
            (cleanedRowText.match(numericPattern) || []).length >= 3;

          if (hasMultipleNumbers) {
            structuredText += `<START_MEASUREMENT_DATA>\n${cleanedRowText}\n<END_MEASUREMENT_DATA>\n`;
          } else {
            structuredText += `<START_PARAGRAPH>\n${cleanedRowText}\n<END_PARAGRAPH>\n`;
          }
        }
      }
    }

    if (inTable) {
      structuredText += "<END_TABLE>\n";
      inTable = false;
    }

    structuredText += "\n";
  }

  return structuredText.trim();
}
