"use client";

import { useState, useEffect, useCallback } from "react";

export type FlowHistoryStatus = "planning" | "generating" | "completed" | "failed";

export interface FlowHistoryLog {
  id: string;
  timestamp: string;
  agent: string;
  role: "request" | "response" | "info" | "error";
  content: string;
  metadata?: Record<string, any>;
}

export interface FlowHistorySession {
  id: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  status: FlowHistoryStatus;
  masteryPercent: number;
  totalFrames: number;
  logs: FlowHistoryLog[];
  sessionSnapshot?: any;
}

interface StartSessionOptions {
  id: string;
  prompt: string;
  totalFrames: number;
  snapshot?: any;
}

const HISTORY_STORAGE_KEY = "ai_flow_history_v1";
const MAX_SESSIONS = 15;

export function useFlowHistory() {
  const [sessions, setSessions] = useState<FlowHistorySession[]>([]);

  const persistSessions = useCallback((next: FlowHistorySession[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn("Failed to persist flow history:", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed: FlowHistorySession[] = JSON.parse(stored);
        setSessions(parsed);
      }
    } catch (error) {
      console.warn("Failed to load flow history:", error);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, []);

  const startSession = useCallback(
    ({ id, prompt, totalFrames, snapshot }: StartSessionOptions) => {
      const now = new Date().toISOString();
      const newSession: FlowHistorySession = {
        id,
        prompt,
        createdAt: now,
        updatedAt: now,
        status: "planning",
        masteryPercent: 0,
        totalFrames,
        logs: [],
        sessionSnapshot: snapshot,
      };
      setSessions((prev) => {
        const filtered = prev.filter((session) => session.id !== id);
        const next = [newSession, ...filtered].slice(0, MAX_SESSIONS);
        persistSessions(next);
        return next;
      });
      return newSession;
    },
    [persistSessions]
  );

  const appendLog = useCallback(
    (sessionId: string, log: FlowHistoryLog) => {
      setSessions((prev) => {
        const next = prev.map((session) => {
          if (session.id !== sessionId) return session;
          const logs = [log, ...session.logs].slice(0, 200);
          return {
            ...session,
            logs,
            updatedAt: log.timestamp,
          };
        });
        persistSessions(next);
        return next;
      });
    },
    [persistSessions]
  );

  const updateSession = useCallback(
    (sessionId: string, updates: Partial<FlowHistorySession>) => {
      setSessions((prev) => {
        const next = prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                ...updates,
                updatedAt: updates.updatedAt || new Date().toISOString(),
              }
            : session
        );
        persistSessions(next);
        return next;
      });
    },
    [persistSessions]
  );

  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => {
        const next = prev.filter((session) => session.id !== sessionId);
        persistSessions(next);
        return next;
      });
    },
    [persistSessions]
  );

  const clearSessions = useCallback(() => {
    setSessions([]);
    persistSessions([]);
  }, [persistSessions]);

  const exportSession = useCallback(
    (sessionId: string): string | null => {
      const session = sessions.find((entry) => entry.id === sessionId);
      if (!session) return null;
      return JSON.stringify(
        {
          version: "1.0",
          session,
        },
        null,
        2
      );
    },
    [sessions]
  );

  const exportAllSessions = useCallback(() => {
    return JSON.stringify(
      {
        version: "1.0",
        sessions,
      },
      null,
      2
    );
  }, [sessions]);

  const importSessions = useCallback(
    (payload: string): boolean => {
      try {
        const parsed = JSON.parse(payload);
        const imported: FlowHistorySession[] = parsed.sessions
          ? parsed.sessions
          : parsed.session
          ? [parsed.session]
          : [];

        if (!imported.length) {
          throw new Error("No sessions found in file.");
        }

        setSessions((prev) => {
          const map = new Map<string, FlowHistorySession>();
          [...imported, ...prev].forEach((session) => {
            map.set(session.id, session);
          });
          const next = Array.from(map.values())
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, MAX_SESSIONS);
          persistSessions(next);
          return next;
        });
        return true;
      } catch (error) {
        console.warn("Failed to import flow sessions:", error);
        return false;
      }
    },
    [persistSessions]
  );

  const getSession = useCallback(
    (sessionId: string): FlowHistorySession | undefined =>
      sessions.find((session) => session.id === sessionId),
    [sessions]
  );

  return {
    sessions,
    startSession,
    appendLog,
    updateSession,
    deleteSession,
    clearSessions,
    exportSession,
    exportAllSessions,
    importSessions,
    getSession,
  };
}
