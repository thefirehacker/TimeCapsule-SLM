import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  FeatureType,
  AccessCheckResult,
} from "../feature-access/FeatureAccessManager";

interface FeatureUsageSummary {
  available: boolean;
  monthlyLimit: number;
  dailyLimit: number;
  monthlyUsed: number;
  dailyUsed: number;
  remainingMonthly: number;
  remainingDaily: number;
  nextReset: string;
}

interface UseFeatureAccessReturn {
  // Feature access checking
  checkFeatureAccess: (feature: FeatureType) => Promise<AccessCheckResult>;
  isChecking: boolean;

  // Usage recording
  recordFeatureUsage: (feature: FeatureType) => Promise<boolean>;
  isRecording: boolean;

  // Usage summary
  usageSummary: Record<FeatureType, FeatureUsageSummary> | null;
  isLoadingSummary: boolean;
  refreshSummary: () => Promise<void>;

  // Quick access helpers
  canUseFeature: (feature: FeatureType) => boolean;
  getRemainingUsage: (feature: FeatureType) => {
    monthly: number;
    daily: number;
  };
}

export function useFeatureAccess(): UseFeatureAccessReturn {
  const { data: session, status } = useSession();
  const [isChecking, setIsChecking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [usageSummary, setUsageSummary] = useState<Record<
    FeatureType,
    FeatureUsageSummary
  > | null>(null);

  // Load usage summary on mount
  useEffect(() => {
    if (session?.userId) {
      refreshSummary();
    }
  }, [session?.userId]);

  const checkFeatureAccess = useCallback(
    async (feature: FeatureType): Promise<AccessCheckResult> => {
      if (!session?.userId) {
        return { allowed: false, reason: "Not authenticated" };
      }

      setIsChecking(true);
      try {
        const response = await fetch("/api/features/check-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feature }),
        });

        if (!response.ok) {
          throw new Error("Failed to check feature access");
        }

        const data = await response.json();
        return data.access;
      } catch (error) {
        console.error("Error checking feature access:", error);
        return { allowed: false, reason: "System error" };
      } finally {
        setIsChecking(false);
      }
    },
    [session?.userId]
  );

  const recordFeatureUsage = useCallback(
    async (feature: FeatureType): Promise<boolean> => {
      if (!session?.userId) {
        return false;
      }

      setIsRecording(true);
      try {
        const response = await fetch("/api/features/record-usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feature }),
        });

        if (!response.ok) {
          return false;
        }

        // Refresh usage summary after recording
        await refreshSummary();
        return true;
      } catch (error) {
        console.error("Error recording feature usage:", error);
        return false;
      } finally {
        setIsRecording(false);
      }
    },
    [session?.userId]
  );

  const refreshSummary = useCallback(async () => {
    if (!session?.userId) {
      setUsageSummary(null);
      return;
    }

    setIsLoadingSummary(true);
    try {
      const response = await fetch("/api/features/usage-summary");
      if (response.ok) {
        const data = await response.json();
        setUsageSummary(data.summary);
      }
    } catch (error) {
      console.error("Error loading usage summary:", error);
    } finally {
      setIsLoadingSummary(false);
    }
  }, [session?.userId]);

  const canUseFeature = useCallback(
    (feature: FeatureType): boolean => {
      if (!usageSummary || !usageSummary[feature]) {
        return false;
      }
      return (
        usageSummary[feature].available &&
        usageSummary[feature].remainingMonthly > 0 &&
        usageSummary[feature].remainingDaily > 0
      );
    },
    [usageSummary]
  );

  const getRemainingUsage = useCallback(
    (feature: FeatureType): { monthly: number; daily: number } => {
      if (!usageSummary || !usageSummary[feature]) {
        return { monthly: 0, daily: 0 };
      }
      return {
        monthly: usageSummary[feature].remainingMonthly,
        daily: usageSummary[feature].remainingDaily,
      };
    },
    [usageSummary]
  );

  return {
    checkFeatureAccess,
    isChecking,
    recordFeatureUsage,
    isRecording,
    usageSummary,
    isLoadingSummary,
    refreshSummary,
    canUseFeature,
    getRemainingUsage,
  };
}


