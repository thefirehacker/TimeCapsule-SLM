// Configuration loader for TimeCapsule-SLM
// This file loads environment variables for client-side use
//
// 🌍 ENVIRONMENT VARIABLE OPTIONS:
// 
// 1. 📄 Meta Tags (HTML): Add to your HTML <head>
//    <meta name="GA4_MEASUREMENT_ID" content="G-ABC123DEF4">
//
// 2. 🪟 Window Variables (Server-side): Set on window object
//    window.ENV = { GA4_MEASUREMENT_ID: 'G-ABC123DEF4' };
//    window.GA4_MEASUREMENT_ID = 'G-ABC123DEF4';
//
// 3. 🏗️ Build Process (Vite/React/Next): Use build-time injection
//    process.env.VITE_GA4_MEASUREMENT_ID (Vite)
//    process.env.REACT_APP_GA4_MEASUREMENT_ID (Create React App)
//    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID (Next.js)
//
// 4. 🚀 Amplify Environment Variables: 
//    Set in Amplify Console → App Settings → Environment Variables
//    Then inject via build process or server-side rendering

class Config {
  constructor() {
    // Load from environment variables (multiple sources)
    this.GA4_MEASUREMENT_ID = this.getEnvVar('GA4_MEASUREMENT_ID') || 
                              this.getEnvVar('VITE_GA4_MEASUREMENT_ID') || 
                              this.getEnvVar('REACT_APP_GA4_MEASUREMENT_ID') ||
                              this.getEnvVar('NEXT_PUBLIC_GA4_MEASUREMENT_ID') ||
                              'G-XXXXXXXXXX'; // Fallback placeholder
    
    this.SITE_NAME = this.getEnvVar('SITE_NAME') || 'TimeCapsule-SLM';
    this.SITE_URL = this.getEnvVar('SITE_URL') || 'https://timecapsule.bubblspace.com';
    this.GA4_DEBUG_MODE = this.getEnvVar('GA4_DEBUG_MODE') === 'true' || false;
    this.GA4_ANONYMIZE_IP = this.getEnvVar('GA4_ANONYMIZE_IP') !== 'false'; // Default true
    
    // 🔐 GitHub OAuth Configuration (same pattern as GA4)
    this.GITHUB_CLIENT_ID = this.getEnvVar('GITHUB_CLIENT_ID') || 
                            this.getEnvVar('VITE_GITHUB_CLIENT_ID') || 
                            this.getEnvVar('REACT_APP_GITHUB_CLIENT_ID') ||
                            this.getEnvVar('NEXT_PUBLIC_GITHUB_CLIENT_ID') ||
                            null;
                            
    this.LOCAL_GITHUB_CLIENT_ID = this.getEnvVar('LOCAL_GITHUB_CLIENT_ID') || 
                                 this.getEnvVar('VITE_LOCAL_GITHUB_CLIENT_ID') || 
                                 this.getEnvVar('REACT_APP_LOCAL_GITHUB_CLIENT_ID') ||
                                 this.getEnvVar('NEXT_PUBLIC_LOCAL_GITHUB_CLIENT_ID') ||
                                 null;
                                 
    this.ENV_MODE = this.getEnvVar('ENV_MODE') || 
                   this.getEnvVar('VITE_ENV_MODE') || 
                   this.getEnvVar('REACT_APP_ENV_MODE') ||
                   this.getEnvVar('NEXT_PUBLIC_ENV_MODE') ||
                   'dev'; // Default to development
                   
    this.BELUGA_API_BASE = this.getEnvVar('BELUGA_API_BASE') || 
                          this.getEnvVar('VITE_BELUGA_API_BASE') || 
                          this.getEnvVar('REACT_APP_BELUGA_API_BASE') ||
                          this.getEnvVar('NEXT_PUBLIC_BELUGA_API_BASE') ||
                          'https://beluga.bubblspace.com';
  }

  // Method to get environment variables from multiple sources
  getEnvVar(name) {
    // Check window-level variables (set by server-side rendering)
    if (typeof window !== 'undefined' && window.ENV && window.ENV[name]) {
      return window.ENV[name];
    }
    
    // Check window-level direct variables
    if (typeof window !== 'undefined' && window[name]) {
      return window[name];
    }
    
    // Check process.env (if available in build process)
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
      return process.env[name];
    }
    
    // Check meta tags (common pattern)
    if (typeof document !== 'undefined') {
      const metaTag = document.querySelector(`meta[name="${name}"]`);
      if (metaTag) {
        return metaTag.getAttribute('content');
      }
    }
    
    return null;
  }

  // Method to initialize Google Analytics
  initializeGA4() {
    if (!this.GA4_MEASUREMENT_ID || this.GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('GA4_MEASUREMENT_ID not configured');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', this.GA4_MEASUREMENT_ID, {
      anonymize_ip: this.GA4_ANONYMIZE_IP,
      debug_mode: this.GA4_DEBUG_MODE,
      site_name: this.SITE_NAME
    });

    console.log(`✅ Google Analytics 4 initialized with ID: ${this.GA4_MEASUREMENT_ID}`);
  }

  // Method to track custom events
  trackEvent(action, category = 'engagement', label = '', value = 0) {
    if (window.gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
      console.log(`📊 GA4 Event tracked: ${action} (${category})`);
    }
  }

  // Method to track page views
  trackPageView(page_title, page_location) {
    if (window.gtag) {
      gtag('event', 'page_view', {
        page_title: page_title,
        page_location: page_location
      });
    }
  }
}

// Create global config instance
window.AppConfig = new Config(); 