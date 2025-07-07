/**
 * Custom Ollama Server Configuration
 * 
 * Add your custom Ollama server IPs here for easy access.
 * These will be automatically included in the Content Security Policy.
 * 
 * Instructions:
 * 1. Replace the example IPs with your actual Ollama server addresses
 * 2. Use the format: "http://IP:PORT" (include quotes)
 * 3. Save the file and refresh your browser (Ctrl+Shift+R)
 * 
 * Examples:
 * - "http://192.168.1.100:11434"  (Home network)
 * - "http://10.0.1.50:11434"      (Corporate network)
 * - "http://172.16.0.10:9434"     (Docker container with custom port)
 */

const OLLAMA_CUSTOM_CONFIG = {
  // Add your 3 custom Ollama server IPs here
  customIPs: [
    "http://10.0.1.69:11434",      // Replace with your first Ollama server
    "http://192.168.1.200:11434",  // Replace with your second Ollama server  
    "http://172.16.0.50:9434"      // Replace with your third Ollama server
  ],
  
  // Optional: Add custom ports for localhost/127.0.0.1
  customPorts: [
    "http://localhost:8080",
    "http://127.0.0.1:7777"
  ],
  
  // Get all custom URLs for CSP integration
  getAllCustomURLs() {
    return [...this.customIPs, ...this.customPorts];
  }
};

// Export for use in common-meta.js
if (typeof window !== 'undefined') {
  window.OLLAMA_CUSTOM_CONFIG = OLLAMA_CUSTOM_CONFIG;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OLLAMA_CUSTOM_CONFIG;
}
