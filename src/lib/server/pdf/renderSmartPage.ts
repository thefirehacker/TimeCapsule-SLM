interface TextItem {
  str: string;
  width?: number;
  transform: number[];
}

interface PageData {
  getTextContent: (
    options: Record<string, boolean>
  ) => Promise<{ items: TextItem[] }>;
}

const SAME_LINE_Y_TOLERANCE = 2; // roughly 2 units difference counts as same line
const SPACE_GAP_MULTIPLIER = 0.6; // heuristically insert space when gap is 60% of avg char width

export function smartPageRenderer(pageData: PageData): Promise<string> {
  return pageData
    .getTextContent({
      normalizeWhitespace: true,
      disableCombineTextItems: false,
    })
    .then(({ items }) => {
      let lastY: number | null = null;
      let lastX: number | null = null;
      let currentLine = "";
      const lines: string[] = [];

      for (const item of items) {
        const text = item.str ?? "";
        if (!text) continue;

        const y = Math.round(item.transform?.[5] ?? 0);
        const x = item.transform?.[4] ?? 0;

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
        lastX = x + (item.width ?? avgCharWidth * text.length);
      }

      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      } else if (currentLine) {
        lines.push(currentLine);
      }

      const combined = lines
        .join("\n")
        .replace(/\u00a0/g, " ")
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      return combined.replace(/([a-z])([A-Z])/g, "$1 $2").replace(
        /([A-Z]{2,})([a-z]+)/g,
        "$1 $2"
      );
    });
}
