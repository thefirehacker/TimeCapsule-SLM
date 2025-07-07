import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Override the default webpack configuration
  webpack: (config, { isServer }) => {
    // Webpack configuration for Transformers.js
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    };
    
    // Fallback for Node.js modules in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      "path": false,
      "crypto": false,
    };

    // Handle Transformers.js properly for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "path": false,
        "crypto": false,
        "stream": false,
        "util": false,
      };
    }
    
    return config;
  },
  
  // Remove @xenova/transformers from external packages since we want to bundle it
  // serverExternalPackages: [],
};

export default nextConfig;
