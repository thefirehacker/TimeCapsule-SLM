/**
 * Common Meta Tags Configuration for TimeCapsule-SLM Application
 * Only contains shared meta tags, favicon, and CSP policy
 * Used across Canvas.html, DeepResearch.html, and Playground.html
 */

const COMMON_META = {
  // Content Security Policy
  // Content Security Policy - Note: CSP doesn't support IP wildcards, so we include common private IP ranges
  // Users can add their specific IPs to ollama-custom.js file for easier management
  
  // Base connect-src URLs (always included)
  baseConnectSrc: [
    "'self'",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com", 
    "https://unpkg.com",
    "https://huggingface.co",
    "https://*.hf.co",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "wss://api.openai.com",
    "wss://api.anthropic.com",
     "http://localhost:1234",
     "http://localhost:11434",
     "http://localhost:8080",
     "http://localhost:9434", 
     "http://localhost:3000",
     "http://127.0.0.1:11434",
     "http://127.0.0.1:9434",
     "http://127.0.0.1:8080",
     "http://127.0.0.1:3000",
         // Common private network IPs for Ollama - add your specific IP here
     // 10.0.x.x range (common in corporate/cloud networks)
     "http://10.0.0.1:11434", "http://10.0.0.10:11434", "http://10.0.0.100:11434",
     "http://10.0.1.1:11434", "http://10.0.1.10:11434", "http://10.0.1.69:11434", "http://10.0.1.100:11434",
     "http://10.0.2.1:11434", "http://10.0.2.10:11434", "http://10.0.2.100:11434",
     "http://10.0.10.1:11434", "http://10.0.10.10:11434", "http://10.0.10.100:11434",
     "http://10.0.50.1:11434", "http://10.0.50.10:11434", "http://10.0.50.100:11434",
     "http://10.0.100.1:11434", "http://10.0.100.10:11434", "http://10.0.100.100:11434",
          // 192.168.x.x range (home networks)
     "http://192.168.1.1:11434", "http://192.168.1.10:11434", "http://192.168.1.100:11434",
     "http://192.168.0.1:11434", "http://192.168.0.10:11434", "http://192.168.0.100:11434", 
     "http://192.168.2.1:11434", "http://192.168.10.1:11434", "http://192.168.50.1:11434",
     // 172.16-31.x.x range (Docker/container networks)
     "http://172.16.0.1:11434", "http://172.17.0.1:11434", "http://172.18.0.1:11434",
     // Common alternative ports for all ranges
     "http://10.0.1.69:9434", "http://192.168.1.100:9434", "http://172.17.0.1:9434",
    // Add more IPs as needed - just append to this array
    "https://beluga.bubblspace.com",
    "https://api.openai.com",
    "https://api.anthropic.com", 
    "https://openrouter.ai"
  ],
  
  // Get all connect-src URLs (base + custom from ollama-custom.js)
  get connectSrc() {
    let allURLs = [...this.baseConnectSrc];
    
    // Add custom Ollama IPs from ollama-custom.js if available
    if (typeof window !== 'undefined' && window.OLLAMA_CUSTOM_CONFIG) {
      const customURLs = window.OLLAMA_CUSTOM_CONFIG.getAllCustomURLs();
      allURLs = allURLs.concat(customURLs);
      console.log('🔧 Added custom Ollama URLs to CSP:', customURLs);
    }
    
    return allURLs;
  },
  
  get csp() {
    return `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com data: blob:; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com data:; connect-src ${this.connectSrc.join(' ')}; img-src 'self' data: blob:; font-src 'self' data:; worker-src 'self' blob: data:; object-src 'none';`;
  },
  
  // Common favicon
  favicon: "lib/Media/TimeCapsule_04.png",
  
  // Common app suffix
  appSuffix: "TimeCapsule-SLM"
};

// Export for use in HTML files
if (typeof window !== 'undefined') {
  window.COMMON_META = COMMON_META;
} 