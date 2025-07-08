'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '../../lib/analytics';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize GA4 on mount
    const initializeAnalytics = async () => {
      try {
        await analytics.initializeGA4();
        
        // Track initial page view
        if (typeof window !== 'undefined') {
          analytics.trackPageView(
            'DeepResearch TimeCapsule', 
            window.location.href
          );
        }
      } catch (error) {
        console.error('Failed to initialize analytics:', error);
      }
    };

    initializeAnalytics();
  }, []);

  useEffect(() => {
    // Track page changes
    if (analytics.isReady() && typeof window !== 'undefined') {
      const pageName = pathname === '/' ? 'Home' : pathname.replace('/', '');
      analytics.trackPageView(pageName, window.location.href);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
} 