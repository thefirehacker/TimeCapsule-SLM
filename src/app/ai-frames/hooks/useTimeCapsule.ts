/**
 * useTimeCapsule Hook
 * Manages TimeCapsule lifecycle, switching, and persistence
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { VectorStore } from '@/components/VectorStore/VectorStore';
import { TimeCapsule } from '@/lib/kb/types/timecapsule';
import { TimeCapsuleStore } from '@/lib/kb/timeCapsuleStore';
import type {
  ShareMode,
  TimeCapsuleSyncPayload,
} from '@/lib/timecapsule/aiframeSharing';

export interface UseTimeCapsuleReturn {
  activeTimeCapsuleId: string | null;
  activeTimeCapsule: TimeCapsule | null;
  timeCapsules: TimeCapsule[];
  sharedTimeCapsules: SharedTimeCapsuleSummary[];
  sharedSelection: SharedCapsuleSelection | null;
  sharedLoading: boolean;
  sharedError: string | null;
  isLoading: boolean;
  createTimeCapsule: (name: string, description: string) => Promise<TimeCapsule | null>;
  switchTimeCapsule: (timeCapsuleId: string) => Promise<void>;
  updateTimeCapsule: (id: string, updates: Partial<TimeCapsule>) => Promise<void>;
  deleteTimeCapsule: (id: string) => Promise<void>;
  refreshTimeCapsules: () => Promise<void>;
  refreshSharedTimeCapsules: () => Promise<void>;
  loadSharedCapsule: (input: SharedCapsuleRequest) => Promise<SharedCapsuleSelection | null>;
  clearSharedSelection: () => void;
}

export interface SharedTimeCapsuleSummary {
  id: string;
  name: string;
  version?: string | null;
  ownerUserId?: string | null;
  ownerName?: string | null;
  ownerEmail?: string | null;
  shareToken?: string | null;
  updatedAt?: string | null;
  isShared?: boolean;
  shareMode?: ShareMode | null;
}

export interface SharedCapsuleSelection {
  frameSetId: string;
  frameVersion: string;
  title?: string | null;
  ownerName?: string | null;
  ownerEmail?: string | null;
  shareMode: ShareMode;
  shareToken?: string | null;
  lastSyncedAt?: string | null;
  payloadChecksum?: string | null;
  parentFrameSetId?: string | null;
  parentFrameVersion?: string | null;
  parentShareToken?: string | null;
  snapshot?: TimeCapsuleSyncPayload | null;
}

interface SharedCapsuleRequest {
  token?: string | null;
  frameSetId?: string | null;
  frameVersion?: string | null;
}

/**
 * Hook for managing TimeCapsules (isolated projects)
 */
export function useTimeCapsule(vectorStore: VectorStore | null): UseTimeCapsuleReturn {
  const [activeTimeCapsuleId, setActiveTimeCapsuleId] = useState<string | null>(null);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([]);
  const [sharedTimeCapsules, setSharedTimeCapsules] = useState<SharedTimeCapsuleSummary[]>([]);
  const [sharedSelection, setSharedSelection] = useState<SharedCapsuleSelection | null>(null);
  const [sharedLoading, setSharedLoading] = useState(false);
  const [sharedError, setSharedError] = useState<string | null>(null);
  const lastOwnedCapsuleIdRef = useRef<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeCapsuleStoreRef = useRef<TimeCapsuleStore | null>(null);

  // Initialize TimeCapsuleStore
  useEffect(() => {
    if (vectorStore && !timeCapsuleStoreRef.current) {
      timeCapsuleStoreRef.current = new TimeCapsuleStore(vectorStore);
      console.log('🎯 TimeCapsuleStore initialized');
    }
  }, [vectorStore]);

  // Active TimeCapsule object
  const ownedActiveTimeCapsule =
    timeCapsules.find((tc) => tc.id === activeTimeCapsuleId) || null;
  const activeTimeCapsule =
    ownedActiveTimeCapsule ||
    (sharedSelection
      ? {
          id: sharedSelection.frameSetId,
          name:
            sharedSelection.title ||
            `Shared project (${sharedSelection.frameSetId.slice(-4)})`,
          description: sharedSelection.ownerName
            ? `Shared by ${sharedSelection.ownerName}`
            : "Shared project",
          createdAt: sharedSelection.lastSyncedAt || new Date().toISOString(),
          updatedAt: sharedSelection.lastSyncedAt || new Date().toISOString(),
          frameCount: Array.isArray((sharedSelection.snapshot as any)?.frames)
            ? (sharedSelection.snapshot as any).frames.length
            : 0,
          documentCount: 0,
          settings: {
            defaultView: "split",
          },
        }
      : null);

  /**
   * Initialize default TimeCapsule on first launch
   */
  useEffect(() => {
    async function initializeDefaultTimeCapsule() {
      if (!timeCapsuleStoreRef.current) return;

      try {
        setIsLoading(true);
        const capsules = await timeCapsuleStoreRef.current.listTimeCapsules();
        setTimeCapsules(capsules);

        if (capsules.length === 0) {
          // Create default TimeCapsule
          console.log('🆕 Creating default TimeCapsule...');
          const defaultCapsule = await timeCapsuleStoreRef.current.createTimeCapsule(
            "My First Project",
            "Your default workspace for AI Frames and Knowledge Base"
          );

          setTimeCapsules([defaultCapsule]);
          setActiveTimeCapsuleId(defaultCapsule.id);
          localStorage.setItem('activeTimeCapsuleId', defaultCapsule.id);
          
          console.log('✅ Default TimeCapsule created:', defaultCapsule.id);
        } else {
          // Restore last active TimeCapsule
          const savedId = localStorage.getItem('activeTimeCapsuleId');
          const restoredId = savedId && capsules.some(c => c.id === savedId) 
            ? savedId 
            : capsules[0].id;
          
          setActiveTimeCapsuleId(restoredId);
          console.log('📂 Restored active TimeCapsule:', restoredId);
        }
      } catch (error) {
        console.error('❌ Failed to initialize TimeCapsule:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (vectorStore && timeCapsuleStoreRef.current) {
      initializeDefaultTimeCapsule();
    }
  }, [vectorStore]);

  /**
   * Create a new TimeCapsule
   */
  const createTimeCapsule = useCallback(async (name: string, description: string): Promise<TimeCapsule | null> => {
    if (!timeCapsuleStoreRef.current) {
      console.error('❌ TimeCapsuleStore not initialized');
      return null;
    }

    try {
      const newCapsule = await timeCapsuleStoreRef.current.createTimeCapsule(name, description);
      setTimeCapsules(prev => [newCapsule, ...prev]);
      console.log('✅ TimeCapsule created:', newCapsule.id);
      return newCapsule;
    } catch (error) {
      console.error('❌ Failed to create TimeCapsule:', error);
      return null;
    }
  }, []);

  /**
   * Switch to a different TimeCapsule
   */
  const switchTimeCapsule = useCallback(async (newTimeCapsuleId: string) => {
    console.log(`🔄 Switching TimeCapsule: ${activeTimeCapsuleId} → ${newTimeCapsuleId}`);
    
    // Emit event to clear current frames from graph
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timecapsule-switch-start', {
        detail: { oldId: activeTimeCapsuleId, newId: newTimeCapsuleId }
      }));
    }
    
    // Update active ID
    lastOwnedCapsuleIdRef.current = newTimeCapsuleId;
    setSharedSelection(null);
    setActiveTimeCapsuleId(newTimeCapsuleId);
    localStorage.setItem('activeTimeCapsuleId', newTimeCapsuleId);
    
    // Emit event to load new TimeCapsule's data
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timecapsule-switched', {
        detail: { timeCapsuleId: newTimeCapsuleId }
      }));
    }

    console.log('✅ Switched to TimeCapsule:', newTimeCapsuleId);
  }, [activeTimeCapsuleId]);

  /**
   * Update a TimeCapsule
   */
  const updateTimeCapsule = useCallback(async (id: string, updates: Partial<TimeCapsule>) => {
    if (!timeCapsuleStoreRef.current) {
      console.error('❌ TimeCapsuleStore not initialized');
      return;
    }

    try {
      const updated = await timeCapsuleStoreRef.current.updateTimeCapsule(id, updates);
      if (updated) {
        setTimeCapsules(prev => prev.map(tc => tc.id === id ? updated : tc));
        console.log('✅ TimeCapsule updated:', id);
      }
    } catch (error) {
      console.error('❌ Failed to update TimeCapsule:', error);
    }
  }, []);

  /**
   * Delete a TimeCapsule (CASCADE delete all related data)
   */
  const deleteTimeCapsule = useCallback(async (id: string) => {
    if (!timeCapsuleStoreRef.current) {
      console.error('❌ TimeCapsuleStore not initialized');
      return;
    }

    // Prevent deleting the last TimeCapsule
    if (timeCapsules.length === 1) {
      console.warn('⚠️ Cannot delete the last TimeCapsule');
      return;
    }

    try {
      const success = await timeCapsuleStoreRef.current.deleteTimeCapsule(id);
      if (success) {
        setTimeCapsules(prev => prev.filter(tc => tc.id !== id));

        // If deleted TimeCapsule was active, switch to first available
        if (activeTimeCapsuleId === id) {
          const remaining = timeCapsules.filter(tc => tc.id !== id);
          if (remaining.length > 0) {
            await switchTimeCapsule(remaining[0].id);
          }
        }

        console.log('✅ TimeCapsule deleted:', id);
      }
    } catch (error) {
      console.error('❌ Failed to delete TimeCapsule:', error);
    }
  }, [timeCapsules, activeTimeCapsuleId, switchTimeCapsule]);

  const loadSharedCapsule = useCallback(
    async (input: SharedCapsuleRequest): Promise<SharedCapsuleSelection | null> => {
      setSharedLoading(true);
      setSharedError(null);
      try {
        const response = await fetch("/api/aiframes/shared/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          const result = await response.json().catch(() => null);
          throw new Error(result?.error || "Failed to load shared TimeCapsule");
        }
        const result = await response.json();
        const selection = result?.selection as SharedCapsuleSelection | undefined;
        if (selection?.frameSetId) {
          if (activeIdRef.current) {
            lastOwnedCapsuleIdRef.current = activeIdRef.current;
          }
          setSharedSelection(selection);
          setActiveTimeCapsuleId(selection.frameSetId);
        }
        return selection ?? null;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load shared TimeCapsule";
        setSharedError(message);
        return null;
      } finally {
        setSharedLoading(false);
      }
    },
    []
  );

  const clearSharedSelection = useCallback(() => {
    setSharedSelection(null);
    setSharedError(null);
    if (lastOwnedCapsuleIdRef.current) {
      setActiveTimeCapsuleId(lastOwnedCapsuleIdRef.current);
    }
  }, []);

  const refreshSharedTimeCapsules = useCallback(async () => {
    try {
      const response = await fetch("/api/aiframes/shared", {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch shared TimeCapsules");
      }
      const data = await response.json();
      const summaries: SharedTimeCapsuleSummary[] = (data.shared || []).map(
        (item: any) => ({
          id: item.frameSetId,
          name:
            item.title ||
            `Shared project (${String(item.frameSetId).slice(-4)})`,
          version: item.version || item.frameVersion || null,
          ownerUserId: item.ownerUserId || null,
          ownerName: item.ownerName || null,
          ownerEmail: item.ownerEmail || null,
          shareToken: item.shareToken || null,
          updatedAt: item.updatedAt || null,
          isShared: Boolean(item.isShared),
          shareMode: item.shareMode || null,
        })
      );
      setSharedTimeCapsules(summaries);
    } catch (error) {
      console.error("Failed to load shared TimeCapsules:", error);
    }
  }, []);

  useEffect(() => {
    void refreshSharedTimeCapsules();
  }, [refreshSharedTimeCapsules]);

  useEffect(() => {
    activeIdRef.current = activeTimeCapsuleId;
  }, [activeTimeCapsuleId]);

  /**
   * Refresh TimeCapsules list
   */
  const refreshTimeCapsules = useCallback(async () => {
    if (!timeCapsuleStoreRef.current) return;

    try {
      const capsules = await timeCapsuleStoreRef.current.listTimeCapsules();
      setTimeCapsules(capsules);
      console.log('🔄 TimeCapsules refreshed');
    } catch (error) {
      console.error('❌ Failed to refresh TimeCapsules:', error);
    }
  }, []);

  return {
    activeTimeCapsuleId,
    activeTimeCapsule,
    timeCapsules,
    sharedTimeCapsules,
    sharedSelection,
    sharedLoading,
    sharedError,
    isLoading,
    createTimeCapsule,
    switchTimeCapsule,
    updateTimeCapsule,
    deleteTimeCapsule,
    refreshTimeCapsules,
    refreshSharedTimeCapsules,
    loadSharedCapsule,
    clearSharedSelection,
  };
}

