/**
 * Google Analytics 4 Implementation for DeepResearch TimeCapsule
 * Enhanced with comprehensive device, location, and interaction tracking
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface GA4Config {
  measurementId: string;
  anonymizeIp: boolean;
  debugMode: boolean;
  siteName: string;
  siteUrl: string;
}

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  vendor: string;
  language: string;
  languages: string[];
  screenResolution: string;
  viewportSize: string;
  colorDepth: number;
  pixelRatio: number;
  timezone: string;
  isOnline: boolean;
  connectionType?: string;
  deviceMemory?: number;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  operatingSystem: string;
  browser: string;
  browserVersion: string;
}

export interface LocationInfo {
  timezone: string;
  timezoneOffset: number;
  language: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
}

export class Analytics {
  private config: GA4Config;
  private isInitialized = false;
  private deviceInfo: DeviceInfo | null = null;
  private locationInfo: LocationInfo | null = null;
  private sessionStartTime: number = Date.now();
  private pageStartTime: number = Date.now();

  constructor() {
    this.config = {
      measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
      anonymizeIp: process.env.GA4_ANONYMIZE_IP === 'true',
      debugMode: process.env.GA4_DEBUG_MODE === 'true',
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'DeepResearch TimeCapsule',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || ''
    };
    
    // Collect device and location info immediately
    if (typeof window !== 'undefined') {
      this.collectDeviceInfo();
      this.collectLocationInfo();
    }
    
    // Debug environment variables
    console.log('📊 GA4 Environment Variables Debug:', {
      measurementId: this.config.measurementId || 'NOT_SET',
      anonymizeIp: this.config.anonymizeIp,
      debugMode: this.config.debugMode,
      siteName: this.config.siteName,
      siteUrl: this.config.siteUrl || 'NOT_SET',
      allEnvVars: {
        NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
        GA4_ANONYMIZE_IP: process.env.GA4_ANONYMIZE_IP,
        GA4_DEBUG_MODE: process.env.GA4_DEBUG_MODE,
        NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
      }
    });
  }

  /**
   * Collect comprehensive device information
   */
  private collectDeviceInfo(): void {
    if (typeof window === 'undefined') return;

    const nav = navigator as any;
    const screen = window.screen;
    
    // Detect device type
    const userAgent = nav.userAgent || '';
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/Mobile|Android|iPhone|iPod/.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/iPad|Tablet/.test(userAgent)) {
      deviceType = 'tablet';
    }

    // Detect operating system
    let operatingSystem = 'Unknown';
    if (userAgent.indexOf('Win') !== -1) operatingSystem = 'Windows';
    else if (userAgent.indexOf('Mac') !== -1) operatingSystem = 'macOS';
    else if (userAgent.indexOf('Linux') !== -1) operatingSystem = 'Linux';
    else if (userAgent.indexOf('Android') !== -1) operatingSystem = 'Android';
    else if (userAgent.indexOf('iOS') !== -1 || userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) operatingSystem = 'iOS';

    // Detect browser
    let browser = 'Unknown';
    let browserVersion = '';
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) {
      browser = 'Chrome';
      browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || '';
    } else if (userAgent.indexOf('Firefox') !== -1) {
      browser = 'Firefox';
      browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || '';
    } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
      browser = 'Safari';
      browserVersion = userAgent.match(/Safari\/([0-9.]+)/)?.[1] || '';
    } else if (userAgent.indexOf('Edg') !== -1) {
      browser = 'Edge';
      browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || '';
    }

    this.deviceInfo = {
      userAgent: userAgent,
      platform: nav.platform || '',
      vendor: nav.vendor || '',
      language: nav.language || '',
      languages: nav.languages ? Array.from(nav.languages) : [],
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: screen.colorDepth || 0,
      pixelRatio: window.devicePixelRatio || 1,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      isOnline: nav.onLine,
      connectionType: (nav.connection as any)?.effectiveType || undefined,
      deviceMemory: (nav as any).deviceMemory || undefined,
      hardwareConcurrency: nav.hardwareConcurrency || 0,
      maxTouchPoints: nav.maxTouchPoints || 0,
      deviceType,
      operatingSystem,
      browser,
      browserVersion
    };

    console.log('📱 Device Info Collected:', this.deviceInfo);
  }

  /**
   * Collect location and timezone information
   */
  private collectLocationInfo(): void {
    if (typeof window === 'undefined') return;

    this.locationInfo = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      language: navigator.language || ''
    };

    // Try to get more precise location (with user permission)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (this.locationInfo) {
            this.locationInfo.latitude = position.coords.latitude;
            this.locationInfo.longitude = position.coords.longitude;
            this.locationInfo.accuracy = position.coords.accuracy;
            console.log('🌍 Location Info Updated:', this.locationInfo);
          }
        },
        (error) => {
          console.log('🌍 Location access denied or unavailable:', error.message);
        },
        { timeout: 5000, maximumAge: 300000 } // 5s timeout, 5min cache
      );
    }

    console.log('🌍 Location Info Collected:', this.locationInfo);
  }

  /**
   * Get comprehensive event context
   */
  private getEventContext(): Record<string, any> {
    const context: Record<string, any> = {
      timestamp: new Date().toISOString(),
      site_name: this.config.siteName,
      session_duration: Math.round((Date.now() - this.sessionStartTime) / 1000),
      page_duration: Math.round((Date.now() - this.pageStartTime) / 1000)
    };

    // Add device info
    if (this.deviceInfo) {
      context.device_type = this.deviceInfo.deviceType;
      context.operating_system = this.deviceInfo.operatingSystem;
      context.browser = this.deviceInfo.browser;
      context.browser_version = this.deviceInfo.browserVersion;
      context.screen_resolution = this.deviceInfo.screenResolution;
      context.viewport_size = this.deviceInfo.viewportSize;
      context.device_language = this.deviceInfo.language;
      context.device_timezone = this.deviceInfo.timezone;
      context.device_online = this.deviceInfo.isOnline;
      context.device_pixel_ratio = this.deviceInfo.pixelRatio;
      context.device_memory = this.deviceInfo.deviceMemory;
      context.device_cores = this.deviceInfo.hardwareConcurrency;
      context.device_touch_points = this.deviceInfo.maxTouchPoints;
      context.connection_type = this.deviceInfo.connectionType;
    }

    // Add location info
    if (this.locationInfo) {
      context.user_timezone = this.locationInfo.timezone;
      context.timezone_offset = this.locationInfo.timezoneOffset;
      context.user_language = this.locationInfo.language;
      if (this.locationInfo.latitude && this.locationInfo.longitude) {
        // Round to reduce precision for privacy
        context.user_latitude = Math.round(this.locationInfo.latitude * 100) / 100;
        context.user_longitude = Math.round(this.locationInfo.longitude * 100) / 100;
        context.location_accuracy = this.locationInfo.accuracy;
      }
    }

    return context;
  }

  /**
   * Reset page start time (call when navigating to new page)
   */
  resetPageTimer(): void {
    this.pageStartTime = Date.now();
  }

  /**
   * Initialize Google Analytics 4
   */
  async initializeGA4(): Promise<void> {
    if (this.isInitialized) {
      console.log('📊 GA4: Already initialized, skipping');
      return;
    }
    
    if (!this.config.measurementId) {
      console.log('📊 GA4: No measurement ID provided. To enable GA4 tracking:');
      console.log('  1. Create a .env.local file in your project root');
      console.log('  2. Add: NEXT_PUBLIC_GA4_MEASUREMENT_ID=your_ga4_measurement_id');
      console.log('  3. Restart your development server');
      return;
    }
    
    if (this.config.measurementId === 'G-XXXXXXXXXX') {
      console.log('📊 GA4: Placeholder measurement ID detected. Please update your .env.local file with your actual GA4 measurement ID');
      return;
    }

    try {
      console.log('📊 GA4: Initializing Google Analytics 4...');

      // Load gtag script
      await this.loadGtagScript();

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Configure GA4 with enhanced user properties
      window.gtag('js', new Date());
      window.gtag('config', this.config.measurementId, {
        anonymize_ip: this.config.anonymizeIp,
        debug_mode: this.config.debugMode,
        site_name: this.config.siteName,
        custom_map: {
          custom_parameter_1: 'research_type',
          custom_parameter_2: 'ai_provider',
          custom_parameter_3: 'document_count',
          custom_parameter_4: 'device_type',
          custom_parameter_5: 'operating_system'
        },
        // Enhanced user properties
        user_properties: {
          device_type: this.deviceInfo?.deviceType,
          operating_system: this.deviceInfo?.operatingSystem,
          browser: this.deviceInfo?.browser,
          timezone: this.deviceInfo?.timezone
        }
      });

      this.isInitialized = true;
      console.log('✅ GA4: Successfully initialized with enhanced tracking');

      // Track initialization with full context
      this.trackEvent('ga4_initialized', {
        ...this.getEventContext(),
        debug_mode: this.config.debugMode
      });

    } catch (error) {
      console.error('❌ GA4: Initialization failed:', error);
    }
  }

  /**
   * Load Google Analytics script
   */
  private loadGtagScript(): Promise<void> {
    if (typeof window === "undefined") {
      return Promise.resolve();
    }

    const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
    const existingScript = document.querySelector(
      `script[src="${scriptUrl}"]`
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (typeof window.gtag === "function") {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        const handleLoad = () => {
          existingScript.removeEventListener("load", handleLoad);
          resolve();
        };
        const handleError = () => {
          existingScript.removeEventListener("error", handleError);
          reject(new Error("Failed to load Google Analytics script"));
        };
        existingScript.addEventListener("load", handleLoad);
        existingScript.addEventListener("error", handleError);
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = scriptUrl;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google Analytics script"));
      document.head.appendChild(script);
    });
  }

  /**
   * Track page view
   */
  trackPageView(pageName: string, pageUrl: string, additionalParams: Record<string, any> = {}): void {
    if (!this.isInitialized) {
      console.warn('⚠️ GA4: Not initialized, skipping page view tracking');
      return;
    }

    try {
      window.gtag('config', this.config.measurementId, {
        page_title: pageName,
        page_location: pageUrl,
        custom_map: {
          site_name: this.config.siteName
        }
      });

      // Also send as an event with additional parameters for better tracking
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: pageUrl,
        site_name: this.config.siteName,
        ...additionalParams
      });

      console.log(`📊 GA4: Page view tracked - ${pageName}`);
    } catch (error) {
      console.error('❌ GA4: Page view tracking failed:', error);
    }
  }

  /**
   * Track custom event with detailed parameters
   */
  trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.isInitialized) {
      console.warn('⚠️ GA4: Not initialized, skipping event tracking');
      return;
    }

    try {
      const eventData = {
        ...this.getEventContext(),
        ...parameters
      };

      window.gtag('event', eventName, eventData);
      
      if (this.config.debugMode) {
        console.log(`📊 GA4: Event tracked - ${eventName}`, eventData);
      }
    } catch (error) {
      console.error('❌ GA4: Event tracking failed:', error);
    }
  }

  /**
   * Track research generation events
   */
  trackResearchGeneration(researchType: string, depth: string, aiProvider: string, topicCount: number): void {
    this.trackEvent('research_generated', {
      research_type: researchType,
      research_depth: depth,
      ai_provider: aiProvider,
      topic_count: topicCount,
      event_category: 'research',
      event_label: `${researchType}_${depth}`
    });
  }

  /**
   * Track AI connection events
   */
  trackAIConnection(provider: string, model: string, connectionStatus: string): void {
    this.trackEvent('ai_connection', {
      ai_provider: provider,
      ai_model: model,
      connection_status: connectionStatus,
      event_category: 'ai',
      event_label: `${provider}_${connectionStatus}`
    });
  }

  /**
   * Track document management events
   */
  trackDocumentManagement(action: string, documentCount: number, documentType?: string): void {
    this.trackEvent('document_management', {
      action: action,
      document_count: documentCount,
      document_type: documentType || 'unknown',
      event_category: 'documents',
      event_label: action
    });
  }

  /**
   * Track knowledge base events (like "manage knowledge")
   */
  trackKnowledgeBase(action: string, details: Record<string, any> = {}): void {
    this.trackEvent('knowledge_base', {
      action: action,
      ...details,
      event_category: 'knowledge',
      event_label: action
    });
  }

  /**
   * Track vector store events
   */
  trackVectorStore(action: string, vectorCount: number, embeddingModel: string): void {
    this.trackEvent('vector_store', {
      action: action,
      vector_count: vectorCount,
      embedding_model: embeddingModel,
      event_category: 'vector_store',
      event_label: action
    });
  }

  /**
   * Track search events
   */
  trackSearch(query: string, resultCount: number, searchType: string): void {
    this.trackEvent('search_performed', {
      search_query: query.substring(0, 100), // Limit query length for privacy
      result_count: resultCount,
      search_type: searchType,
      event_category: 'search',
      event_label: searchType
    });
  }

  /**
   * Track export events
   */
  trackExport(exportType: string, fileSize?: number): void {
    this.trackEvent('export_performed', {
      export_type: exportType,
      file_size: fileSize,
      event_category: 'export',
      event_label: exportType
    });
  }

  /**
   * Track topic management events
   */
  trackTopicManagement(action: string, topicCount: number): void {
    this.trackEvent('topic_management', {
      action: action,
      topic_count: topicCount,
      event_category: 'topics',
      event_label: action
    });
  }

  /**
   * Track user engagement metrics
   */
  trackEngagement(action: string, duration?: number): void {
    this.trackEvent('user_engagement', {
      action: action,
      duration_seconds: duration,
      event_category: 'engagement',
      event_label: action
    });
  }

  /**
   * Track errors for debugging
   */
  trackError(errorType: string, errorMessage: string, errorContext?: string): void {
    this.trackEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage.substring(0, 200), // Limit message length
      error_context: errorContext,
      event_category: 'errors',
      event_label: errorType
    });
  }

  /**
   * Disable analytics (for consent withdrawal)
   */
  disable(): void {
    if (this.isInitialized) {
      this.isInitialized = false;
      console.log('🔒 GA4: Analytics disabled due to consent withdrawal');
      
      // Clear any existing gtag configuration
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', this.config.measurementId, {
          send_page_view: false,
          anonymize_ip: true,
          ads_data_redaction: true
        });
      }
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): GA4Config {
    return { ...this.config };
  }

  /**
   * Expose measurement ID for client components (e.g., Next Script helpers)
   */
  getMeasurementId(): string {
    return this.config.measurementId;
  }

  /**
   * Check if analytics is ready to use
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).analytics = analytics;
} 