'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '../../lib/analytics';
import { CookieConsent, useCookieConsent } from '../ui/cookie-consent';

export function Analytics() {
  const pathname = usePathname();
  const { preferences, hasConsent, updatePreferences, canUseAnalytics } = useCookieConsent();
  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);

  // Initialize analytics when consent is given
  useEffect(() => {
    const initializeAnalytics = async () => {
      if (canUseAnalytics && !analyticsInitialized) {
        try {
          await analytics.initializeGA4();
          setAnalyticsInitialized(true);
          console.log('✅ Analytics: GA4 initialized with user consent');
        } catch (error) {
          console.error('❌ Analytics: Failed to initialize GA4:', error);
        }
      } else if (!canUseAnalytics && analyticsInitialized) {
        // User revoked consent, disable analytics
        analytics.disable();
        setAnalyticsInitialized(false);
        console.log('🔒 Analytics: GA4 disabled due to consent withdrawal');
      }
    };

    initializeAnalytics();
  }, [canUseAnalytics, analyticsInitialized]);

  // Track page changes only if analytics is enabled and user consented
  useEffect(() => {
    const trackPageView = async () => {
      if (!canUseAnalytics || !analyticsInitialized) {
        console.log('⏳ Analytics: Skipping page tracking - no consent or not initialized');
        return;
      }

      // Wait for analytics to be ready
      if (!analytics.isReady()) {
        console.log('⏳ Analytics: Waiting for GA4 to initialize...');
        return;
      }

      if (typeof window === 'undefined') return;

      // Reset page timer for new page
      analytics.resetPageTimer();

      // Get proper page name and metadata
      const pageData = getPageMetadata(pathname);
      
      // Track the page view with enhanced context
      analytics.trackPageView(pageData.title, window.location.href, {
        page_category: pageData.category,
        page_type: pageData.type,
        pathname: pathname,
        consent_analytics: canUseAnalytics,
        consent_functional: preferences.functional
      });

      // Track page-specific engagement with enhanced context
      analytics.trackEngagement('page_visited', 0);
      
      console.log(`📊 Analytics: Tracked page view - ${pageData.title} (${pathname})`);
    };

    // Small delay to ensure the page is fully loaded
    const timeoutId = setTimeout(trackPageView, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname, canUseAnalytics, analyticsInitialized, preferences.functional]);

  return (
    <>
      {/* Cookie Consent Banner */}
      <CookieConsent onConsentChange={updatePreferences} />
    </>
  );
}

// Helper function to get page metadata
function getPageMetadata(pathname: string) {
  const routes: Record<string, { title: string; category: string; type: string }> = {
    '/': { title: 'Homepage', category: 'landing', type: 'marketing' },
    '/deep-research': { title: 'DeepResearch-TimeCapsule', category: 'research', type: 'application' },
    '/ai-frames': { title: 'AI-Frames', category: 'learning', type: 'interactive' },
    '/auth/signin': { title: 'Sign In', category: 'auth', type: 'authentication' },
    '/auth/error': { title: 'Auth Error', category: 'auth', type: 'error' },
    '/about': { title: 'About Us', category: 'info', type: 'static' },
    '/vision': { title: 'Vision & Roadmap', category: 'info', type: 'static' },
    '/privacy': { title: 'Privacy Policy', category: 'legal', type: 'static' },
    '/terms': { title: 'Terms of Service', category: 'legal', type: 'static' }
  };

  return routes[pathname] || { 
    title: 'Unknown Page', 
    category: 'unknown', 
    type: 'page' 
  };
}

// Enhanced analytics hook with consent awareness
export function usePageAnalytics(pageName: string, category: string) {
  const { canUseAnalytics, preferences } = useCookieConsent();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(canUseAnalytics && analytics.isReady());
  }, [canUseAnalytics]);

  const trackFeatureUsage = (feature: string, context: Record<string, any> = {}) => {
    if (!canUseAnalytics || !isReady) {
      console.log(`🔒 Analytics: Skipping feature tracking - ${feature} (no consent)`);
      return;
    }

    analytics.trackEvent('feature_usage', {
      feature_name: feature,
      page_name: pageName,
      page_category: category,
      consent_status: 'granted',
      ...context
    });
  };

  const trackUserAction = (action: string, details: Record<string, any> = {}) => {
    if (!canUseAnalytics || !isReady) {
      console.log(`🔒 Analytics: Skipping user action - ${action} (no consent)`);
      return;
    }

    analytics.trackEvent('user_action', {
      action_name: action,
      page_name: pageName,
      page_category: category,
      consent_status: 'granted',
      ...details
    });
  };

  const trackError = (error: string, message: string) => {
    if (!canUseAnalytics || !isReady) {
      console.log(`🔒 Analytics: Skipping error tracking - ${error} (no consent)`);
      return;
    }

    analytics.trackEvent('error', {
      error_type: error,
      error_message: message,
      page_name: pageName,
      page_category: category,
      consent_status: 'granted'
    });
  };

  const trackPerformance = (metric: string, value: number, unit: string = 'ms') => {
    if (!canUseAnalytics || !isReady) {
      console.log(`🔒 Analytics: Skipping performance tracking - ${metric} (no consent)`);
      return;
    }

    analytics.trackEvent('performance', {
      metric_name: metric,
      metric_value: value,
      metric_unit: unit,
      page_name: pageName,
      page_category: category,
      consent_status: 'granted'
    });
  };

  return {
    trackFeatureUsage,
    trackUserAction,
    trackError,
    trackPerformance,
    isReady,
    hasConsent: canUseAnalytics,
    preferences
  };
} 