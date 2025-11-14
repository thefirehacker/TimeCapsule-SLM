"use strict";

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
