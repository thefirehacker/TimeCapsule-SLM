import { useCallback, useEffect, useRef, useState } from "react";
import { UnifiedAIFrame, UnifiedChapter } from "../lib/unifiedStorage";
import { GraphState } from "@/components/ai-graphs/types";
import type {
  ShareMode,
  TimeCapsuleSyncPayload,
} from "@/lib/timecapsule/aiframeSharing";

interface UseTimeCapsuleSyncOptions {
  activeTimeCapsuleId: string | null | undefined;
  frameVersion: string;
  timeCapsuleName?: string | null;
  frames: UnifiedAIFrame[];
  chapters: UnifiedChapter[];
  graphState: GraphState;
  buildEnv: string;
}

export interface SyncConflict {
  latestChecksum: string | null;
  lastSyncedAt: string | null;
  shareMode: ShareMode;
  snapshot?: TimeCapsuleSyncPayload | null;
}

export interface TimeCapsuleCloudSyncState {
  isEnabled: boolean;
  isSynced: boolean;
  lastSyncedAt: string | null;
  syncing: boolean;
  error: string | null;
  lastChecksum: string | null;
  conflict: SyncConflict | null;
  syncNow: () => Promise<void>;
}

export function useTimeCapsuleSync({
  activeTimeCapsuleId,
  frameVersion,
  timeCapsuleName,
  frames,
  chapters,
  graphState,
  buildEnv,
}: UseTimeCapsuleSyncOptions): TimeCapsuleCloudSyncState {
  const cloudEnabled = buildEnv === "cloud";
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastChecksum, setLastChecksum] = useState<string | null>(null);
  const [conflict, setConflict] = useState<SyncConflict | null>(null);
  const framesRef = useRef(frames);
  const chaptersRef = useRef(chapters);
  const graphRef = useRef(graphState);
  const initialSyncRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const checksumRef = useRef<string | null>(null);

  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);

  useEffect(() => {
    chaptersRef.current = chapters;
  }, [chapters]);

  useEffect(() => {
    graphRef.current = graphState;
  }, [graphState]);

  useEffect(() => {
    checksumRef.current = lastChecksum;
  }, [lastChecksum]);

  useEffect(() => {
    setLastSyncedAt(null);
    setLastChecksum(null);
    setConflict(null);
  }, [activeTimeCapsuleId, frameVersion]);

  const syncNow = useCallback(async () => {
    if (!cloudEnabled || !activeTimeCapsuleId) {
      return;
    }
    setSyncing(true);
    setError(null);
    setConflict(null);

    try {
      const payload = {
        frames: framesRef.current,
        chapters: chaptersRef.current,
        graphState: graphRef.current,
        metadata: {
          lastSaved: new Date().toISOString(),
        },
      };

      const response = await fetch("/api/aiframes/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frameSetId: activeTimeCapsuleId,
          frameVersion,
          timeCapsuleName,
          payload,
          baselineChecksum: checksumRef.current,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          const conflictPayload = await response.json().catch(() => null);
          setConflict(conflictPayload?.conflict ?? null);
          setError(
            conflictPayload?.error ||
              "Another collaborator synced changes before you."
          );
          return;
        }
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Failed to sync TimeCapsule");
      }

      const result = await response.json().catch(() => ({} as any));
      setLastSyncedAt(result?.lastSyncedAt || new Date().toISOString());
      setLastChecksum(
        result?.payloadChecksum ?? result?.share?.payloadChecksum ?? null
      );
      setConflict(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync TimeCapsule");
    } finally {
      setSyncing(false);
    }
  }, [cloudEnabled, activeTimeCapsuleId, frameVersion, timeCapsuleName]);

  useEffect(() => {
    if (!cloudEnabled || !activeTimeCapsuleId) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (!initialSyncRef.current) {
      initialSyncRef.current = true;
      void syncNow();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      void syncNow();
    }, 15 * 60 * 1000); // 15 minutes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [cloudEnabled, activeTimeCapsuleId, syncNow]);

  return {
    isEnabled: cloudEnabled && Boolean(activeTimeCapsuleId),
    isSynced: Boolean(lastSyncedAt),
    lastSyncedAt,
    syncing,
    error,
    lastChecksum,
    conflict,
    syncNow,
  };
}

