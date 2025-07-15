import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Disable TypeScript errors in build for Amplify
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint errors in build for Amplify  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Override the default webpack configuration
  webpack: (config, { isServer }) => {
    // Webpack configuration for Transformers.js
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
      // Explicit alias for @ path resolution (for Amplify compatibility)
      "@": path.resolve(__dirname, "src"),
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
