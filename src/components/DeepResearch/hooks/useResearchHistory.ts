/**
 * Research History Hook
 * 
 * Manages research session history with localStorage persistence
 * Provides chat-wise research step storage and navigation
 */

import { useState, useEffect, useCallback } from "react";
import { ResearchStep } from "../components/ResearchSteps";

export interface ResearchSession {
  id: string;
  query: string;
  timestamp: number;
  steps: ResearchStep[];
  status: 'active' | 'completed' | 'failed';
  duration?: number;
  resultCount?: number;
  metadata?: {
    userId?: string;
    sessionType?: string;
    researchConfig?: any;
    error?: string;
  };
}

export interface UseResearchHistoryReturn {
  sessions: ResearchSession[];
  currentSession: ResearchSession | null;
  isLoading: boolean;
  
  // Session management
  createSession: (query: string, sessionId?: string) => ResearchSession;
  updateSession: (sessionId: string, updates: Partial<ResearchSession>) => void;
  completeSession: (sessionId: string, duration?: number) => void;
  failSession: (sessionId: string, error?: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllSessions: () => void;
  
  // Step management
  addStepToSession: (sessionId: string, step: ResearchStep) => void;
  updateStepInSession: (sessionId: string, stepId: string, updates: Partial<ResearchStep>) => void;
  
  // Navigation
  switchToSession: (sessionId: string) => void;
  getPreviousSession: (currentSessionId?: string) => ResearchSession | null;
  getNextSession: (currentSessionId?: string) => ResearchSession | null;
  
  // Search and filtering
  searchSessions: (query: string) => ResearchSession[];
  getSessionsByDateRange: (startDate: Date, endDate: Date) => ResearchSession[];
  
  // Import/Export
  exportSession: (sessionId: string) => string;
  exportAllSessions: () => string;
  importSessions: (data: string) => boolean;
}

const STORAGE_KEY = "deep_research_history";
const MAX_SESSIONS = 50; // Limit stored sessions to prevent localStorage bloat

export function useResearchHistory(): UseResearchHistoryReturn {
  const [sessions, setSessions] = useState<ResearchSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const loadSessions = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedSessions: ResearchSession[] = JSON.parse(storedData);
          // Sort by timestamp (newest first)
          const sortedSessions = parsedSessions.sort((a, b) => b.timestamp - a.timestamp);
          setSessions(sortedSessions);
          
          // Set the most recent active session as current
          const activeSession = sortedSessions.find(s => s.status === 'active');
          if (activeSession) {
            setCurrentSession(activeSession);
          }
        }
      } catch (error) {
        console.error("Failed to load research history:", error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, []);

  // Save sessions to localStorage whenever sessions change
  const saveSessions = useCallback((updatedSessions: ResearchSession[]) => {
    try {
      // Limit the number of stored sessions
      const sessionsToStore = updatedSessions.slice(0, MAX_SESSIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionsToStore));
    } catch (error) {
      console.error("Failed to save research history:", error);
    }
  }, []);

  // Create a new research session
  const createSession = useCallback((query: string, sessionId?: string): ResearchSession => {
    const newSession: ResearchSession = {
      id: sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      query,
      timestamp: Date.now(),
      steps: [],
      status: 'active',
    };

    setSessions(prev => {
      const updated = [newSession, ...prev];
      saveSessions(updated);
      return updated;
    });

    setCurrentSession(newSession);
    return newSession;
  }, [saveSessions]);

  // Update session
  const updateSession = useCallback((sessionId: string, updates: Partial<ResearchSession>) => {
    setSessions(prev => {
      const updated = prev.map(session =>
        session.id === sessionId
          ? { ...session, ...updates }
          : session
      );
      saveSessions(updated);
      return updated;
    });

    // Update current session if it's the one being updated
    setCurrentSession(prev =>
      prev?.id === sessionId ? { ...prev, ...updates } : prev
    );
  }, [saveSessions]);

  // Complete session
  const completeSession = useCallback((sessionId: string, duration?: number) => {
    updateSession(sessionId, {
      status: 'completed',
      duration,
    });
  }, [updateSession]);

  // Fail session
  const failSession = useCallback((sessionId: string, error?: string) => {
    updateSession(sessionId, {
      status: 'failed',
      metadata: { error },
    });
  }, [updateSession]);

  // Delete session
  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const updated = prev.filter(session => session.id !== sessionId);
      saveSessions(updated);
      return updated;
    });

    // Clear current session if it's the one being deleted
    setCurrentSession(prev =>
      prev?.id === sessionId ? null : prev
    );
  }, [saveSessions]);

  // Clear all sessions
  const clearAllSessions = useCallback(() => {
    setSessions([]);
    setCurrentSession(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Add step to session
  const addStepToSession = useCallback((sessionId: string, step: ResearchStep) => {
    setSessions(prev => {
      const updated = prev.map(session =>
        session.id === sessionId
          ? { ...session, steps: [...session.steps, step] }
          : session
      );
      saveSessions(updated);
      return updated;
    });

    // Update current session if it's the one being updated
    setCurrentSession(prev =>
      prev?.id === sessionId
        ? { ...prev, steps: [...prev.steps, step] }
        : prev
    );
  }, [saveSessions]);

  // Update step in session
  const updateStepInSession = useCallback((sessionId: string, stepId: string, updates: Partial<ResearchStep>) => {
    setSessions(prev => {
      const updated = prev.map(session =>
        session.id === sessionId
          ? {
              ...session,
              steps: session.steps.map(step =>
                step.id === stepId ? { ...step, ...updates } : step
              )
            }
          : session
      );
      saveSessions(updated);
      return updated;
    });

    // Update current session if it's the one being updated
    setCurrentSession(prev =>
      prev?.id === sessionId
        ? {
            ...prev,
            steps: prev.steps.map(step =>
              step.id === stepId ? { ...step, ...updates } : step
            )
          }
        : prev
    );
  }, [saveSessions]);

  // Switch to session
  const switchToSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  }, [sessions]);

  // Get previous session
  const getPreviousSession = useCallback((currentSessionId?: string): ResearchSession | null => {
    const sessionId = currentSessionId || currentSession?.id;
    if (!sessionId) return null;

    const currentIndex = sessions.findIndex(s => s.id === sessionId);
    if (currentIndex > 0) {
      return sessions[currentIndex - 1];
    }
    return sessions.length > 1 ? sessions[sessions.length - 1] : null;
  }, [sessions, currentSession]);

  // Get next session
  const getNextSession = useCallback((currentSessionId?: string): ResearchSession | null => {
    const sessionId = currentSessionId || currentSession?.id;
    if (!sessionId) return null;

    const currentIndex = sessions.findIndex(s => s.id === sessionId);
    if (currentIndex < sessions.length - 1) {
      return sessions[currentIndex + 1];
    }
    return sessions.length > 1 ? sessions[0] : null;
  }, [sessions, currentSession]);

  // Search sessions
  const searchSessions = useCallback((query: string): ResearchSession[] => {
    const lowerQuery = query.toLowerCase();
    return sessions.filter(session =>
      session.query.toLowerCase().includes(lowerQuery) ||
      session.steps.some(step =>
        step.query?.toLowerCase().includes(lowerQuery) ||
        step.reasoning?.toLowerCase().includes(lowerQuery)
      )
    );
  }, [sessions]);

  // Get sessions by date range
  const getSessionsByDateRange = useCallback((startDate: Date, endDate: Date): ResearchSession[] => {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    
    return sessions.filter(session =>
      session.timestamp >= startTime && session.timestamp <= endTime
    );
  }, [sessions]);

  // Export session
  const exportSession = useCallback((sessionId: string): string => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) throw new Error("Session not found");

    return JSON.stringify({
      version: "1.0",
      exportedAt: new Date().toISOString(),
      session,
    }, null, 2);
  }, [sessions]);

  // Export all sessions
  const exportAllSessions = useCallback((): string => {
    return JSON.stringify({
      version: "1.0",
      exportedAt: new Date().toISOString(),
      sessions,
    }, null, 2);
  }, [sessions]);

  // Import sessions
  const importSessions = useCallback((data: string): boolean => {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.sessions && Array.isArray(parsed.sessions)) {
        // Import multiple sessions
        const importedSessions: ResearchSession[] = parsed.sessions;
        setSessions(prev => {
          const combined = [...importedSessions, ...prev];
          // Remove duplicates by ID
          const unique = combined.filter((session, index, arr) =>
            arr.findIndex(s => s.id === session.id) === index
          );
          // Sort by timestamp
          const sorted = unique.sort((a, b) => b.timestamp - a.timestamp);
          saveSessions(sorted);
          return sorted;
        });
        return true;
      } else if (parsed.session) {
        // Import single session
        const importedSession: ResearchSession = parsed.session;
        setSessions(prev => {
          const updated = [importedSession, ...prev.filter(s => s.id !== importedSession.id)];
          const sorted = updated.sort((a, b) => b.timestamp - a.timestamp);
          saveSessions(sorted);
          return sorted;
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Failed to import sessions:", error);
      return false;
    }
  }, [saveSessions]);

  return {
    sessions,
    currentSession,
    isLoading,
    createSession,
    updateSession,
    completeSession,
    failSession,
    deleteSession,
    clearAllSessions,
    addStepToSession,
    updateStepInSession,
    switchToSession,
    getPreviousSession,
    getNextSession,
    searchSessions,
    getSessionsByDateRange,
    exportSession,
    exportAllSessions,
    importSessions,
  };
}