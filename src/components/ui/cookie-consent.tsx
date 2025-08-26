"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Smartphone,
  Settings,
  Info,
  Check,
} from "lucide-react";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  onConsentChange?: (preferences: CookiePreferences) => void;
}

interface CookieCategory {
  id: keyof CookiePreferences;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: {
    text: string;
    variant: "default" | "secondary" | "outline";
  };
  required: boolean;
  details: {
    collected?: string;
    purpose?: string;
    provider?: string;
    retention?: string;
  };
  tracking?: string[];
}

const STORAGE_KEYS = {
  CONSENT: "timecapsule_cookie_consent",
  PREFERENCES: "timecapsule_cookie_preferences",
} as const;

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
} as const;

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

class SafeStorage {
  private static isAvailable(): boolean {
    try {
      if (typeof window === "undefined") return false;
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getItem<T>(key: string, fallback: T): T {
    try {
      if (!this.isAvailable()) return fallback;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.warn(`Failed to read from localStorage (${key}):`, error);
      return fallback;
    }
  }

  static setItem(key: string, value: unknown): boolean {
    try {
      if (!this.isAvailable()) return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to write to localStorage (${key}):`, error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    try {
      if (!this.isAvailable()) return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove from localStorage (${key}):`, error);
      return false;
    }
  }
}

// ============================================================================
// COOKIE CONFIGURATION
// ============================================================================

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    title: "Necessary Cookies",
    description:
      "Essential for the website to function properly. These cannot be disabled.",
    icon: Shield,
    color: "text-green-600",
    badge: { text: "Required", variant: "secondary" },
    required: true,
    details: {
      collected: "Authentication, session management, security features",
    },
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description:
      "Help us understand how you use TimeCapsule to improve our services.",
    icon: BarChart3,
    color: "text-blue-600",
    badge: { text: "Optional", variant: "outline" },
    required: false,
    details: {
      collected: "Page views, feature usage, device type, browser info",
      purpose: "Product improvement, performance optimization",
      provider: "Google Analytics 4 (IP anonymized)",
      retention: "26 months",
    },
    tracking: [
      "Page visits and navigation patterns",
      "Feature usage (AI-Frames, DeepResearch, etc.)",
      "Device type, screen resolution, browser",
      "Session duration and engagement",
      "Error tracking for improvements",
    ],
  },
  {
    id: "functional",
    title: "Functional Cookies",
    description: "Enable enhanced features and personalization.",
    icon: Settings,
    color: "text-purple-600",
    badge: { text: "Optional", variant: "outline" },
    required: false,
    details: {
      collected: "User preferences, theme settings, language preferences",
    },
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "Currently disabled. TimeCapsule does not use marketing or advertising cookies.",
    icon: Smartphone,
    color: "text-orange-600",
    badge: { text: "Disabled", variant: "secondary" },
    required: false,
    details: {
      collected: "Not implemented for privacy protection",
    },
  },
];

// ============================================================================
// COOKIE CONSENT HOOK
// ============================================================================

export function useCookieConsent() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from storage
  useEffect(() => {
    const consent = SafeStorage.getItem(STORAGE_KEYS.CONSENT, false);
    const savedPreferences = SafeStorage.getItem(
      STORAGE_KEYS.PREFERENCES,
      DEFAULT_PREFERENCES
    );

    if (consent && savedPreferences) {
      setHasConsent(true);
      setPreferences(savedPreferences);
    }
    setIsLoading(false);
  }, []);

  const updatePreferences = useCallback((newPreferences: CookiePreferences) => {
    const validatedPreferences = {
      ...newPreferences,
      necessary: true, // Always ensure necessary is true
    };

    setPreferences(validatedPreferences);
    setHasConsent(true);

    SafeStorage.setItem(STORAGE_KEYS.CONSENT, true);
    SafeStorage.setItem(STORAGE_KEYS.PREFERENCES, validatedPreferences);
  }, []);

  const resetConsent = useCallback(() => {
    SafeStorage.removeItem(STORAGE_KEYS.CONSENT);
    SafeStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    setHasConsent(false);
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  const analytics = useMemo(
    () => ({
      canUse: hasConsent && preferences.analytics,
      enabled: preferences.analytics,
    }),
    [hasConsent, preferences.analytics]
  );

  const functional = useMemo(
    () => ({
      canUse: hasConsent && preferences.functional,
      enabled: preferences.functional,
    }),
    [hasConsent, preferences.functional]
  );

  const marketing = useMemo(
    () => ({
      canUse: false, // Always disabled
      enabled: false,
    }),
    []
  );

  return {
    preferences,
    hasConsent,
    isLoading,
    updatePreferences,
    resetConsent,
    analytics,
    functional,
    marketing,
  };
}

// ============================================================================
// COOKIE CONSENT COMPONENT
// ============================================================================

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [localPreferences, setLocalPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  const cookieConsent = useCookieConsent();

  // Show banner if no consent and not loading
  useEffect(() => {
    if (!cookieConsent.isLoading && !cookieConsent.hasConsent) {
      setShowBanner(true);
    }
  }, [cookieConsent.isLoading, cookieConsent.hasConsent]);

  // Notify parent of consent changes
  useEffect(() => {
    if (cookieConsent.hasConsent && onConsentChange) {
      onConsentChange(cookieConsent.preferences);
    }
  }, [cookieConsent.hasConsent, cookieConsent.preferences, onConsentChange]);

  // Sync local preferences with global state
  useEffect(() => {
    setLocalPreferences(cookieConsent.preferences);
  }, [cookieConsent.preferences]);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: false, // Keep marketing disabled
    };

    cookieConsent.updatePreferences(allAccepted);
    setShowBanner(false);
    setShowDetails(false);
  }, [cookieConsent]);

  const handleAcceptNecessary = useCallback(() => {
    cookieConsent.updatePreferences(DEFAULT_PREFERENCES);
    setShowBanner(false);
    setShowDetails(false);
  }, [cookieConsent]);

  const handleSaveCustom = useCallback(() => {
    cookieConsent.updatePreferences(localPreferences);
    setShowBanner(false);
    setShowDetails(false);
  }, [cookieConsent, localPreferences]);

  const handlePreferenceChange = useCallback(
    (category: keyof CookiePreferences, enabled: boolean) => {
      if (category === "necessary") return; // Cannot disable necessary cookies

      setLocalPreferences((prev) => ({
        ...prev,
        [category]: enabled,
      }));
    },
    []
  );

  const openCustomize = useCallback(() => {
    setLocalPreferences(cookieConsent.preferences);
    setShowDetails(true);
  }, [cookieConsent.preferences]);

  // Don't render anything if loading or consent already given
  if (cookieConsent.isLoading || !showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
        role="banner"
        aria-label="Cookie consent banner"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie
                className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  TimeCapsule uses cookies and similar technologies to provide
                  essential functionality, analyze usage patterns, and improve
                  our services. You can customize your preferences below.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" aria-hidden="true" />
                    GDPR Compliant
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <BarChart3 className="h-3 w-3 mr-1" aria-hidden="true" />
                    Analytics Optional
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={openCustomize}
                className="text-xs"
                aria-label="Customize cookie preferences"
              >
                <Settings className="h-3 w-3 mr-1" aria-hidden="true" />
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptNecessary}
                className="text-xs"
                aria-label="Accept only essential cookies"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs bg-blue-600 hover:bg-blue-700"
                aria-label="Accept all cookies"
              >
                <Check className="h-3 w-3 mr-1" aria-hidden="true" />
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
              <Cookie className="h-5 w-5 text-blue-600" aria-hidden="true" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Customize how TimeCapsule uses cookies and tracking technologies.
              You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-6">
              {COOKIE_CATEGORIES.map((category) => (
                <CookieCategoryCard
                  key={category.id}
                  category={category}
                  enabled={localPreferences[category.id]}
                  onToggle={(enabled) =>
                    handlePreferenceChange(category.id, enabled)
                  }
                />
              ))}

              {/* Privacy Information */}
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shield
                      className="h-4 w-4 text-blue-600"
                      aria-hidden="true"
                    />
                    <CardTitle className="text-sm text-blue-900 dark:text-blue-100">
                      Your Privacy Rights
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 text-xs text-blue-800 dark:text-blue-200 space-y-2">
                  <div>• You can change these preferences at any time</div>
                  <div>
                    • Your data is processed according to GDPR and CCPA
                    regulations
                  </div>
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
                onClick={handleAcceptNecessary}
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={handleSaveCustom}
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

// ============================================================================
// COOKIE CATEGORY CARD COMPONENT
// ============================================================================

interface CookieCategoryCardProps {
  category: CookieCategory;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

function CookieCategoryCard({
  category,
  enabled,
  onToggle,
}: CookieCategoryCardProps) {
  const IconComponent = category.icon;
  const isDisabled = category.id === "marketing";

  return (
    <Card className={isDisabled ? "opacity-60" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent
              className={`h-4 w-4 ${category.color}`}
              aria-hidden="true"
            />
            <CardTitle className="text-sm">{category.title}</CardTitle>
            <Badge variant={category.badge.variant} className="text-xs">
              {category.badge.text}
            </Badge>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
            disabled={category.required || isDisabled}
            aria-label={`Toggle ${category.title.toLowerCase()}`}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
          {category.description}
        </p>

        {Object.entries(category.details).map(
          ([key, value]) =>
            value && (
              <div
                key={key}
                className="text-xs text-gray-500 dark:text-gray-400 mb-1"
              >
                <strong className="capitalize">{key}:</strong> {value}
              </div>
            )
        )}

        {enabled && category.tracking && (
          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
              <Info className="h-3 w-3" aria-hidden="true" />
              <span className="font-medium">What we track when enabled:</span>
            </div>
            <ul className="text-xs text-blue-600 dark:text-blue-400 mt-1 ml-5 space-y-0.5">
              {category.tracking.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
