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
    
    // Analytics state tracking
    this.analyticsReady = false;
    this.eventQueue = [];
    this.initializationPromise = null;
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
      return Promise.resolve();
    }

    // Return existing promise if already initializing
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = new Promise((resolve) => {
      // Load Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA4_MEASUREMENT_ID}`;
      
      script1.onload = () => {
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        
        gtag('js', new Date());
        
        // Enhanced GA4 configuration with device and user tracking
        gtag('config', this.GA4_MEASUREMENT_ID, {
          // Privacy settings
          anonymize_ip: this.GA4_ANONYMIZE_IP,
          debug_mode: this.GA4_DEBUG_MODE,
          
          // Site identification
          site_name: this.SITE_NAME,
          
          // Enhanced tracking
          send_page_view: true,
          allow_google_signals: true,
          allow_ad_personalization_signals: false, // Privacy-first
          
          // Enhanced ecommerce and engagement
          enhanced_measurement: true,
          
          // Custom parameters for device tracking
          custom_map: {
            'custom_parameter_1': 'user_agent',
            'custom_parameter_2': 'screen_resolution',
            'custom_parameter_3': 'viewport_size',
            'custom_parameter_4': 'connection_type'
          }
        });

        // Set up enhanced device and user tracking
        this.setupEnhancedTracking();

        // Mark analytics as ready
        this.analyticsReady = true;
        
        // Process queued events
        this.processEventQueue();

        console.log(`✅ Google Analytics 4 initialized with enhanced tracking: ${this.GA4_MEASUREMENT_ID}`);
        resolve();
      };
      
      script1.onerror = () => {
        console.error('❌ Failed to load Google Analytics script');
        this.analyticsReady = false;
        resolve();
      };
      
      document.head.appendChild(script1);
    });

    return this.initializationPromise;
  }

  // Process queued events when analytics becomes ready
  processEventQueue() {
    if (!this.analyticsReady || !window.gtag) {
      return;
    }

    console.log(`🔄 Processing ${this.eventQueue.length} queued analytics events`);
    
    while (this.eventQueue.length > 0) {
      const queuedEvent = this.eventQueue.shift();
      try {
        // Execute the queued event
        console.log(`📤 Processing queued event: ${queuedEvent.methodName}`);
        queuedEvent.method.apply(this, queuedEvent.args);
      } catch (error) {
        console.error(`❌ Error processing queued event ${queuedEvent.methodName}:`, error);
      }
    }
  }

  // Queue an event if analytics isn't ready yet
  queueEvent(methodName, args) {
    // Convert arguments object to array
    const argsArray = Array.prototype.slice.call(args);
    
    this.eventQueue.push({
      method: this[methodName],
      args: argsArray,
      methodName: methodName,
      timestamp: Date.now()
    });
    
    console.log(`📋 Queued analytics event: ${methodName} (Queue size: ${this.eventQueue.length})`);
    
    // Limit queue size to prevent memory issues
    if (this.eventQueue.length > 100) {
      this.eventQueue.shift(); // Remove oldest event
    }
  }

  // Enhanced device and user tracking setup
  setupEnhancedTracking() {
    if (!window.gtag) return;

    // Get detailed device information
    const deviceInfo = this.getDeviceInfo();
    
    // Set user properties for enhanced tracking
    gtag('set', {
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      color_depth: screen.colorDepth,
      pixel_ratio: window.devicePixelRatio || 1,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookie_enabled: navigator.cookieEnabled,
      java_enabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
      connection_type: this.getConnectionType()
    });

    // Track initial device info as event
    this.trackDeviceInfo(deviceInfo);
  }

  // Get detailed device information
  getDeviceInfo() {
    const nav = navigator;
    const screen_ = screen;
    
    return {
      // Browser info
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language,
      languages: nav.languages ? nav.languages.join(',') : nav.language,
      cookieEnabled: nav.cookieEnabled,
      onLine: nav.onLine,
      
      // Screen info
      screenWidth: screen_.width,
      screenHeight: screen_.height,
      screenColorDepth: screen_.colorDepth,
      screenPixelDepth: screen_.pixelDepth,
      
      // Viewport info
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      
      // Time info
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      
      // Connection info
      connectionType: this.getConnectionType(),
      
      // Device capabilities
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      webGL: this.checkWebGLSupport(),
      localStorage: this.checkLocalStorageSupport(),
      sessionStorage: this.checkSessionStorageSupport()
    };
  }

  // Get connection type
  getConnectionType() {
    if (navigator.connection) {
      return navigator.connection.effectiveType || navigator.connection.type || 'unknown';
    }
    return 'unknown';
  }

  // Check WebGL support
  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
      return false;
    }
  }

  // Check localStorage support
  checkLocalStorageSupport() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Check sessionStorage support
  checkSessionStorageSupport() {
    try {
      const test = 'test';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Track device information as event
  trackDeviceInfo(deviceInfo) {
    if (!this.analyticsReady || !window.gtag) {
      this.queueEvent('trackDeviceInfo', arguments);
      return;
    }
    
    gtag('event', 'device_info', {
      event_category: 'device_tracking',
      event_label: 'initial_load',
      custom_parameter_1: deviceInfo.userAgent.substring(0, 100), // Truncate for GA4
      custom_parameter_2: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
      custom_parameter_3: `${deviceInfo.viewportWidth}x${deviceInfo.viewportHeight}`,
      custom_parameter_4: deviceInfo.connectionType,
      device_platform: deviceInfo.platform,
      device_language: deviceInfo.language,
      device_timezone: deviceInfo.timezone,
      device_pixel_ratio: deviceInfo.devicePixelRatio,
      device_touch_support: deviceInfo.touchSupport,
      device_webgl_support: deviceInfo.webGL
    });
  }

  // Enhanced event tracking with device context
  trackEvent(action, category = 'engagement', label = '', value = 0, customParams = {}) {
    if (!this.analyticsReady || !window.gtag) {
      this.queueEvent('trackEvent', arguments);
      return;
    }
    
    const eventData = {
      event_category: category,
      event_label: label,
      value: value,
      // Add current viewport info to every event
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      page_location: window.location.href,
      page_title: document.title,
      ...customParams
    };

    gtag('event', action, eventData);
    console.log(`📊 GA4 Event tracked: ${action} (${category})`, eventData);
  }

  // Track page views with enhanced data
  trackPageView(page_title, page_location, customParams = {}) {
    if (!this.analyticsReady || !window.gtag) {
      this.queueEvent('trackPageView', arguments);
      return;
    }
    
    gtag('event', 'page_view', {
      page_title: page_title,
      page_location: page_location,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      ...customParams
    });
  }

  // Track key events (Connect buttons, etc.)
  trackKeyEvent(eventName, location, additionalData = {}) {
    this.trackEvent(eventName, 'key_events', location, 1, {
      event_timestamp: Date.now(),
      user_engagement: true,
      ...additionalData
    });
  }

  // Track navigation clicks
  trackNavigation(navType, destination, clickLocation) {
    this.trackEvent('navigation_click', 'navigation', `${navType}_${destination}`, 1, {
      nav_type: navType, // 'navbar1' or 'navbar2'
      destination: destination,
      click_location: clickLocation,
      source_page: window.location.pathname
    });
  }

  // Track modal interactions
  trackModal(modalName, action, details = '') {
    this.trackEvent('modal_interaction', 'ui_interaction', `${modalName}_${action}`, 1, {
      modal_name: modalName,
      modal_action: action,
      modal_details: details,
      page_context: window.location.pathname
    });
  }

  // Track AI interactions
  trackAIInteraction(interactionType, provider, success = true, details = '') {
    this.trackEvent('ai_interaction', 'ai_usage', interactionType, 1, {
      ai_provider: provider,
      interaction_success: success,
      interaction_details: details,
      page_context: window.location.pathname
    });
  }

  // Track document operations
  trackDocumentOperation(operation, documentType, success = true, details = '') {
    this.trackEvent('document_operation', 'content_management', operation, 1, {
      document_type: documentType,
      operation_success: success,
      operation_details: details,
      page_context: window.location.pathname
    });
  }

  // Track research operations
  trackResearchOperation(operation, researchType, success = true, details = '') {
    this.trackEvent('research_operation', 'research_usage', operation, 1, {
      research_type: researchType,
      operation_success: success,
      operation_details: details,
      page_context: window.location.pathname
    });
  }

  // Track chat interactions
  trackChatInteraction(messageType, success = true, details = '') {
    this.trackEvent('chat_interaction', 'ai_chat', messageType, 1, {
      chat_success: success,
      chat_details: details,
      page_context: window.location.pathname
    });
  }

  // Debug helper to check analytics status
  debugAnalytics() {
    console.log('🔍 Analytics Debug Info:');
    console.log('  - GA4 ID:', this.GA4_MEASUREMENT_ID);
    console.log('  - Analytics Ready:', this.analyticsReady);
    console.log('  - gtag Available:', !!window.gtag);
    console.log('  - Queue Length:', this.eventQueue.length);
    console.log('  - Initialization Promise:', !!this.initializationPromise);
    
    if (this.eventQueue.length > 0) {
      console.log('  - Queued Events:', this.eventQueue.map(e => e.methodName));
    }
  }
}

// Create global config instance
window.AppConfig = new Config(); 