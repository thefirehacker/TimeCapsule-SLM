// 🌍 TimeCapsule-SLM Environment Configuration
// This follows the same pattern as GA4 configuration
// Copy this file to 'env.js' and update with your values
// Load this before config.js: <script src="env.js"></script>

window.ENV = {
  // 🔍 Google Analytics 4 Configuration
  GA4_MEASUREMENT_ID: 'G-*******', // Replace with your actual GA4 ID
  GA4_DEBUG_MODE: 'false',
  GA4_ANONYMIZE_IP: 'true',
  
  // 🌐 Site Configuration  
  SITE_NAME: 'TimeCapsule-SLM',
  SITE_URL: 'https://timecapsule.bubblspace.com',
  
  // 🔐 GitHub OAuth Configuration (same pattern as GA4)
  GITHUB_CLIENT_ID: 'your_github_production_client_id_here', // Production GitHub OAuth App Client ID
  LOCAL_GITHUB_CLIENT_ID: 'your_github_local_client_id_here', // Development GitHub OAuth App Client ID
  ENV_MODE: 'dev', // 'dev' for local development, 'prod' for production
  
  // 🚀 Beluga API Configuration
  BELUGA_API_BASE: 'https://beluga.bubblspace.com',
  BELUGA_API_VERSION: 'v1'
};

// 📝 Alternative Setup Methods (same as GA4):
//
// 1. Meta Tags in HTML <head>:
// <meta name="GITHUB_CLIENT_ID" content="your_client_id_here">
// <meta name="LOCAL_GITHUB_CLIENT_ID" content="your_local_client_id_here">
// <meta name="ENV_MODE" content="dev">
//
// 2. Direct window variables:
// window.GITHUB_CLIENT_ID = 'your_client_id_here';
// window.LOCAL_GITHUB_CLIENT_ID = 'your_local_client_id_here';
// window.ENV_MODE = 'dev';
//
// 3. Build-time injection (Vite/React/Next):
// VITE_GITHUB_CLIENT_ID
// REACT_APP_GITHUB_CLIENT_ID  
// NEXT_PUBLIC_GITHUB_CLIENT_ID

console.log('🌍 Environment variables loaded for TimeCapsule-SLM'); 