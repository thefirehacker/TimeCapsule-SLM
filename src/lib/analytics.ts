/**
 * Google Analytics 4 Implementation for DeepResearch TimeCapsule
 * Based on reference implementation from DeepResearch.html
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

export class Analytics {
  private config: GA4Config;
  private isInitialized = false;

  constructor() {
    this.config = {
      measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
      anonymizeIp: process.env.GA4_ANONYMIZE_IP === 'true',
      debugMode: process.env.GA4_DEBUG_MODE === 'true',
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'DeepResearch TimeCapsule',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || ''
    };
    
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

      // Configure GA4
      window.gtag('js', new Date());
      window.gtag('config', this.config.measurementId, {
        anonymize_ip: this.config.anonymizeIp,
        debug_mode: this.config.debugMode,
        site_name: this.config.siteName,
        custom_map: {
          custom_parameter_1: 'research_type',
          custom_parameter_2: 'ai_provider',
          custom_parameter_3: 'document_count'
        }
      });

      this.isInitialized = true;
      console.log('✅ GA4: Successfully initialized');

      // Track initialization
      this.trackEvent('ga4_initialized', {
        site_name: this.config.siteName,
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
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Analytics script'));
      document.head.appendChild(script);
    });
  }

  /**
   * Track page view
   */
  trackPageView(pageName: string, pageUrl: string): void {
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
        ...parameters,
        timestamp: new Date().toISOString(),
        site_name: this.config.siteName,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`
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
   * Get current configuration
   */
  getConfig(): GA4Config {
    return { ...this.config };
  }

  /**
   * Check if analytics is initialized
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