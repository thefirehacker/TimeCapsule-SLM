// Configuration loader for SketchPad-SLM
// This file loads environment variables for client-side use

class Config {
  constructor() {
    // Default configuration - Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
    this.GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual measurement ID from GA4
    this.SITE_NAME = 'SketchPad-SLM';
    this.SITE_URL = 'https://your-domain.com'; // Replace with your actual domain
    this.GA4_DEBUG_MODE = false;
    this.GA4_ANONYMIZE_IP = true;
    this.GA4_CONSOLE_LOGGING = true; // Set to false to hide console messages in production
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

    if (this.GA4_CONSOLE_LOGGING) {
      console.log(`✅ Google Analytics 4 initialized with ID: ${this.GA4_MEASUREMENT_ID}`);
    }
  }

  // Method to track custom events
  trackEvent(action, category = 'engagement', label = '', value = 0) {
    if (window.gtag) {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
      if (this.GA4_CONSOLE_LOGGING) {
        console.log(`📊 GA4 Event tracked: ${action} (${category})`);
      }
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