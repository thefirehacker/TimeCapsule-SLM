// 🌍 TimeCapsule-SLM Environment Configuration
// Copy this file to 'env.js' and update with your values
// Load this before config.js: <script src="env.js"></script>

window.ENV = {
  // 🔍 Google Analytics 4 Configuration
  GA4_MEASUREMENT_ID: 'G-*******', // Replace with your actual GA4 ID
  GA4_DEBUG_MODE: 'false',
  GA4_ANONYMIZE_IP: 'true',
  
  // 🌐 Site Configuration  
  SITE_NAME: 'TimeCapsule-SLM',
  SITE_URL: 'https://timecapsule.bubblspace.com'
};

// Alternative approach - set directly on window
// window.GA4_MEASUREMENT_ID = 'G-ABC123DEF4';
// window.SITE_NAME = 'TimeCapsule-SLM';
// window.SITE_URL = 'https://timecapsule.bubblspace.com';

console.log('🌍 Environment variables loaded for TimeCapsule-SLM'); 