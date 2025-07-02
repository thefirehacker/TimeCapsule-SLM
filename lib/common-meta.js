/**
 * Common Meta Tags Configuration for TimeCapsule-SLM Application
 * Only contains shared meta tags, favicon, and CSP policy
 * Used across Canvas.html, DeepResearch.html, and Playground.html
 */

const COMMON_META = {
  // Content Security Policy
  csp: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com data: blob:; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com data:; connect-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://huggingface.co https://*.hf.co https://www.google-analytics.com https://analytics.google.com wss://api.openai.com wss://api.anthropic.com http://localhost:1234 http://localhost:11434 http://127.0.0.1:9434 https://beluga.bubblspace.com https://api.openai.com https://api.anthropic.com https://openrouter.ai; img-src 'self' data: blob:; font-src 'self' data:; worker-src 'self' blob: data:; object-src 'none';",
  
  // Common favicon
  favicon: "lib/Media/TimeCapsule_04.png",
  
  // Common app suffix
  appSuffix: "TimeCapsule-SLM"
};

// Export for use in HTML files
if (typeof window !== 'undefined') {
  window.COMMON_META = COMMON_META;
} 