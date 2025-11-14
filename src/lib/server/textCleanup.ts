const STRUCTURE_TAG_REGEX = /<[^>]+>/g;
const UPPERCASE_ONLY = /^[^a-z]+$/;

export function collapseSpacedTokens(text: string): string {
  const tokenRegex =
    /((?:[A-Za-z0-9&@#%.,;:!?()\[\]{}'"\\/\-]\s+){3,}[A-Za-z0-9&@#%.,;:!?()\[\]{}'"\\/\-])/g;
  return text.replace(tokenRegex, (match) => {
    const collapsed = match.replace(/\s+/g, "");
    return collapsed.length >= 4 ? collapsed : match;
  });
}

export function plainTextToStructured(text: string): string {
  const normalizedLines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const structured: string[] = [];
  let lastHeading = "";

  for (const line of normalizedLines) {
    if (isLikelyHeading(line)) {
      if (line === lastHeading) {
        continue;
      }
      structured.push(`<START_SECTION:${sanitizeHeading(line)}>`);
      structured.push(line);
      structured.push("<END_SECTION>");
      lastHeading = line;
      continue;
    }

    structured.push("<START_PARAGRAPH>");
    structured.push(line);
    structured.push("<END_PARAGRAPH>");
  }

  return structured.join("\n").trim();
}

export function stripStructureMarkers(text: string): string {
  return text
    .replace(/<\/?TABLE_ROW>/g, " ")
    .replace(STRUCTURE_TAG_REGEX, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function sanitizeHeading(line: string): string {
  return line.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

function isLikelyHeading(line: string): boolean {
  if (!line) return false;
  const trimmed = line.trim();
  if (trimmed.length < 3 || trimmed.length > 140) {
    return false;
  }

  if (/^(\d+(\.\d+)?)+\s/.test(trimmed)) {
    return true;
  }

  if (/[.:]\s*$/.test(trimmed) && trimmed.length <= 80) {
    return true;
  }

  if (UPPERCASE_ONLY.test(trimmed) && trimmed.length <= 80) {
    return true;
  }

  const letters = trimmed.replace(/[^A-Za-z]/g, "").length;
  if (letters === 0) {
    return false;
  }

  const uppercase = trimmed.replace(/[^A-Z]/g, "").length;
  const uppercaseRatio = uppercase / letters;
  return uppercaseRatio >= 0.65;
}
