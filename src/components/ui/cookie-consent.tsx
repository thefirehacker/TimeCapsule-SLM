"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Cookie, 
  Shield, 
  BarChart3, 
  MapPin, 
  Smartphone, 
  Settings,
  Info,
  X,
  Check,
  AlertTriangle
} from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onConsentChange: (preferences: CookiePreferences) => void;
}

const COOKIE_CONSENT_KEY = 'timecapsule_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'timecapsule_cookie_preferences';

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    functional: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (!consent) {
      setShowBanner(true);
    } else if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences);
      setPreferences(parsed);
      onConsentChange(parsed);
    }
  }, [onConsentChange]);

  const savePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    onConsentChange(newPreferences);
    setShowBanner(false);
    setShowDetails(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: false // Keep marketing disabled for privacy
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    savePreferences(necessaryOnly);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  TimeCapsule uses cookies and similar technologies to provide essential functionality, 
                  analyze usage patterns, and improve our services. You can customize your preferences below.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    GDPR Compliant
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Analytics Optional
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="text-xs"
              >
                <Settings className="h-3 w-3 mr-1" />
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessary}
                className="text-xs"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="text-xs bg-blue-600 hover:bg-blue-700"
              >
                <Check className="h-3 w-3 mr-1" />
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Cookie Preferences Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-blue-600" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Customize how TimeCapsule uses cookies and tracking technologies. 
              You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              
              {/* Necessary Cookies */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <CardTitle className="text-sm">Necessary Cookies</CardTitle>
                      <Badge variant="secondary" className="text-xs">Required</Badge>
                    </div>
                    <Switch
                      checked={preferences.necessary}
                      disabled={true}
                      aria-label="Necessary cookies (always enabled)"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Includes:</strong> Authentication, session management, security features
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Cookies */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <CardTitle className="text-sm">Analytics Cookies</CardTitle>
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    </div>
                    <Switch
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                      aria-label="Analytics cookies"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    Help us understand how you use TimeCapsule to improve our services.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <div><strong>Collected:</strong> Page views, feature usage, device type, browser info</div>
                    <div><strong>Purpose:</strong> Product improvement, performance optimization</div>
                    <div><strong>Provider:</strong> Google Analytics 4 (IP anonymized)</div>
                    <div><strong>Retention:</strong> 26 months</div>
                  </div>
                  
                  {preferences.analytics && (
                    <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                        <Info className="h-3 w-3" />
                        <span className="font-medium">What we track when enabled:</span>
                      </div>
                      <ul className="text-xs text-blue-600 dark:text-blue-400 mt-1 ml-5 space-y-0.5">
                        <li>• Page visits and navigation patterns</li>
                        <li>• Feature usage (AI-Frames, DeepResearch, etc.)</li>
                        <li>• Device type, screen resolution, browser</li>
                        <li>• Session duration and engagement</li>
                        <li>• Error tracking for improvements</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Functional Cookies */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-purple-600" />
                      <CardTitle className="text-sm">Functional Cookies</CardTitle>
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    </div>
                    <Switch
                      checked={preferences.functional}
                      onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
                      aria-label="Functional cookies"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    Enable enhanced features and personalization.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Includes:</strong> User preferences, theme settings, language preferences
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Cookies */}
              <Card className="opacity-60">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-orange-600" />
                      <CardTitle className="text-sm">Marketing Cookies</CardTitle>
                      <Badge variant="secondary" className="text-xs">Disabled</Badge>
                    </div>
                    <Switch
                      checked={false}
                      disabled={true}
                      aria-label="Marketing cookies (disabled)"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    Currently disabled. TimeCapsule does not use marketing or advertising cookies.
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Status:</strong> Not implemented for privacy protection
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Information */}
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <CardTitle className="text-sm text-blue-900 dark:text-blue-100">
                      Your Privacy Rights
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-xs text-blue-800 dark:text-blue-200 space-y-2">
                  <div>• You can change these preferences at any time</div>
                  <div>• Your data is processed according to GDPR and CCPA regulations</div>
                  <div>• We never sell your personal information</div>
                  <div>• Analytics data is anonymized and aggregated</div>
                  <div>• You can request data deletion at any time</div>
                </CardContent>
              </Card>

            </div>
          </ScrollArea>

          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(false)}
            >
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessary}
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={saveCustomPreferences}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Hook for managing cookie consent
export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false
  });
  
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (consent && savedPreferences) {
      setHasConsent(true);
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    setHasConsent(true);
  };

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    setHasConsent(false);
    setPreferences({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false
    });
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    resetConsent,
    canUseAnalytics: hasConsent && preferences.analytics,
    canUseFunctional: hasConsent && preferences.functional,
    canUseMarketing: hasConsent && preferences.marketing
  };
} 