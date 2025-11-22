import { marked } from 'marked';

/**
 * Converts markdown text to HTML for use with TipTap editor
 * @param markdown - The markdown string to convert
 * @returns HTML string
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  // Configure marked options
  marked.setOptions({
    breaks: true, // Support line breaks
    gfm: true, // GitHub Flavored Markdown
  });

  try {
    // Parse markdown to HTML
    const html = marked.parse(markdown);
    return typeof html === 'string' ? html : '';
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    // Fallback: return as plain text wrapped in paragraph
    return `<p>${markdown}</p>`;
  }
}

/**
 * Detects if content is HTML or markdown
 * @param content - The content string to check
 * @returns 'html' if content appears to be HTML, 'markdown' otherwise
 */
export function detectContentFormat(content: string): 'html' | 'markdown' {
  if (!content || typeof content !== 'string') {
    return 'html';
  }

  // Check if content starts with common HTML tags
  const htmlTagPattern = /^\s*</;
  if (htmlTagPattern.test(content)) {
    return 'html';
  }

  // Check for markdown patterns
  const markdownPatterns = [
    /^#{1,6}\s/m, // Headings
    /^\*\*.*\*\*/m, // Bold
    /^__.*__/m, // Bold
    /^\*.*\*/m, // Italic
    /^_.*_/m, // Italic
    /^\- /m, // Unordered list
    /^\* /m, // Unordered list
    /^\d+\. /m, // Ordered list
    /^```/m, // Code block
  ];

  for (const pattern of markdownPatterns) {
    if (pattern.test(content)) {
      return 'markdown';
    }
  }

  // Default to HTML if no clear indicators
  return 'html';
}
