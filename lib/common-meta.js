/**
 * Common Meta Tags Configuration for TimeCapsule-SLM Application
 * Only contains shared meta tags, favicon, and CSP policy
 * Used across Canvas.html, DeepResearch.html, and Playground.html
 */

const COMMON_META = {
  // Content Security Policy
  csp: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https: data: blob:; style-src 'self' 'unsafe-inline' https: data:; connect-src 'self' https: wss: http://localhost:1234 http://localhost:11434 https://beluga.bubblspace.com https://api.openai.com https://api.anthropic.com https://openrouter.ai; img-src 'self' data: https: blob:; font-src 'self' data: https:; worker-src 'self' blob: data:; object-src 'none';",
  
  // Common favicon
  favicon: "lib/Media/TimeCapsule_04.png",
  
  // Common app suffix
  appSuffix: "TimeCapsule-SLM"
};

// Export for use in HTML files
if (typeof window !== 'undefined') {
  window.COMMON_META = COMMON_META;
} 