"use client";

import { useCallback, useEffect, useState } from "react";

export interface TimeCapsuleCreditSnapshot {
  tier: "free" | "pro";
  limits: {
    sessions: number;
    flowBuilders: number;
    kbDocs: number;
    kbPagesPerDoc: number;
    kbTokensPerDoc: number;
    agentCalls: number;
    maxInvitees: number;
  };
  usage: {
    sessions: number;
    flowBuilders: number;
    kbDocs: number;
    kbPagesUsed: number;
    kbTokensUsed: number;
    agentCalls: number;
  };
  remaining: {
    sessions: number;
    flowBuilders: number;
    kbDocs: number;
    agentCalls: number;
  };
  renewsAt: string;
  enforced: boolean;
  sharing?: {
    isLinkEnabled?: boolean;
    shareToken?: string | null;
    allowedEmails?: string[];
    pendingInviteTokens?: Record<string, string>;
    maxInvitees?: number;
    updatedAt?: string;
  };
}

export const CREDITS_EVENT = "timecapsule-credits-updated";

export const useTimeCapsuleCredits = () => {
  const [credits, setCredits] = useState<TimeCapsuleCreditSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/aiframes/credits", {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Failed to load credits");
      }
      const data = await response.json();
      setCredits(data.credits);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load credits";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    const handler = () => {
      void fetchCredits();
    };
    window.addEventListener(CREDITS_EVENT, handler);
    return () => window.removeEventListener(CREDITS_EVENT, handler);
  }, [fetchCredits]);

  return {
    credits,
    loading,
    error,
    refresh: fetchCredits,
  };
};

