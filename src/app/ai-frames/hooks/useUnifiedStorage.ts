import { useState, useCallback, useEffect, useRef } from 'react';
import { AIFrame } from '../types/frames';
import { GraphState } from '@/components/ai-graphs/types';
import { unifiedStorage, UnifiedAIFrame } from '../lib/unifiedStorage';

interface UseUnifiedStorageProps {
  vectorStore?: any;
  vectorStoreInitialized?: boolean;
}

interface UseUnifiedStorageReturn {
  frames: UnifiedAIFrame[];
  graphState: GraphState;
  isLoading: boolean;
  error: string | null;
  hasUnsavedChanges: boolean;
  
  // Actions
  saveAll: () => Promise<boolean>;
  loadAll: () => Promise<boolean>;
  updateFrames: (frames: AIFrame[]) => void;
  updateGraphState: (graphState: GraphState) => void;
  clearAll: () => void;
  
  // Auto-save control
  enableAutoSave: () => void;
  disableAutoSave: () => void;
}

// DEBOUNCE: Utility for auto-save
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

export const useUnifiedStorage = ({ 
  vectorStore, 
  vectorStoreInitialized 
}: UseUnifiedStorageProps): UseUnifiedStorageReturn => {
  
  // STATE: Core application state
  const [frames, setFrames] = useState<UnifiedAIFrame[]>([]);
  const [graphState, setGraphState] = useState<GraphState>({
    nodes: [],
    edges: [],
    selectedNodeId: null
  });
  
  // STATE: Loading and error management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // STATE: Auto-save management
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const autoSaveInProgress = useRef(false);
  const lastSaveHash = useRef<string>('');
  
  // INITIALIZATION: Set up unified storage
  useEffect(() => {
    if (vectorStore && vectorStoreInitialized) {
      unifiedStorage.setVectorStore(vectorStore);
    }
  }, [vectorStore, vectorStoreInitialized]);

  // CHECKSUM: Generate hash for change detection including positions
  const generateStateHash = useCallback((frames: UnifiedAIFrame[], graphState: GraphState): string => {
    const stateString = JSON.stringify({ 
      frameCount: frames.length,
      frameIds: frames.map(f => f.id).sort(),
      nodeCount: graphState.nodes.length,
      edgeCount: graphState.edges.length,
      // POSITION PRESERVATION: Include viewport and node positions in change detection
      viewport: graphState.viewport,
      nodePositions: graphState.nodes.map(n => ({ id: n.id, x: n.position?.x, y: n.position?.y })).sort((a, b) => a.id.localeCompare(b.id))
    });
    return btoa(stateString).slice(0, 16);
  }, []);

  // SAVE: Unified save to all storage layers
  const saveAll = useCallback(async (): Promise<boolean> => {
    if (autoSaveInProgress.current) {
      console.log("⏳ Auto-save already in progress, skipping manual save");
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      autoSaveInProgress.current = true;

      const success = await unifiedStorage.saveAll(frames, graphState);
      
      if (success) {
        const newHash = generateStateHash(frames, graphState);
        lastSaveHash.current = newHash;
        setHasUnsavedChanges(false);
        console.log("✅ Manual save completed successfully");
        
        // BROADCAST: Save success event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('unified-save-success', {
            detail: {
              frameCount: frames.length,
              nodeCount: graphState.nodes.length,
              timestamp: new Date().toISOString(),
              manual: true
            }
          }));
        }
      }
      
      return success;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Save failed';
      setError(errorMessage);
      console.error("❌ Manual save failed:", err);
      return false;
    } finally {
      setIsLoading(false);
      autoSaveInProgress.current = false;
    }
  }, [frames, graphState, generateStateHash]);

  // LOAD: Unified load from best available source
  const loadAll = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await unifiedStorage.loadAll();
      
      if (data) {
        setFrames(data.frames);
        setGraphState(data.graphState);
        
        const newHash = generateStateHash(data.frames, data.graphState);
        lastSaveHash.current = newHash;
        setHasUnsavedChanges(false);
        
        console.log(`✅ Load completed: ${data.frames.length} frames`);
        
        // BROADCAST: Load success event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('unified-load-success', {
            detail: {
              frameCount: data.frames.length,
              nodeCount: data.graphState.nodes.length,
              timestamp: new Date().toISOString()
            }
          }));
        }
        
        return true;
      } else {
        console.log("📭 No data found during load");
        return false;
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Load failed';
      setError(errorMessage);
      console.error("❌ Load failed:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [generateStateHash]);

  // UPDATE: Frame state with change detection
  const updateFrames = useCallback((newFrames: AIFrame[]) => {
    // NORMALIZE: Convert to unified format
    const unifiedFrames = newFrames.map(frame => ({
      ...frame,
      metadata: {
        version: '2.0',
        createdAt: frame.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'ai-frames' as const,
        lastSaved: lastSaveHash.current ? new Date().toISOString() : ''
      }
    })) as UnifiedAIFrame[];
    
    setFrames(unifiedFrames);
    
    // CHANGE DETECTION: Mark as unsaved if content changed
    const newHash = generateStateHash(unifiedFrames, graphState);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);
    }
  }, [graphState, generateStateHash]);

  // UPDATE: Graph state with change detection  
  const updateGraphState = useCallback((newGraphState: GraphState) => {
    setGraphState(newGraphState);
    
    // CHANGE DETECTION: Mark as unsaved if content changed
    const newHash = generateStateHash(frames, newGraphState);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);
    }
  }, [frames, generateStateHash]);

  // CLEAR: Reset all state
  const clearAll = useCallback(async () => {
    setFrames([]);
    setGraphState({ nodes: [], edges: [], selectedNodeId: null });
    setHasUnsavedChanges(false);
    lastSaveHash.current = '';
    
    // CLEANUP: Remove old storage
    await unifiedStorage.cleanup();
    
    console.log("🗑️ All data cleared");
  }, []);

  // AUTO-SAVE: Debounced automatic save
  const debouncedAutoSave = useCallback(
    debounce(async () => {
      if (!autoSaveEnabled || autoSaveInProgress.current || !hasUnsavedChanges) {
        return;
      }

      try {
        autoSaveInProgress.current = true;
        
        const success = await unifiedStorage.saveAll(frames, graphState);
        
        if (success) {
          const newHash = generateStateHash(frames, graphState);
          lastSaveHash.current = newHash;
          setHasUnsavedChanges(false);
          
          // BROADCAST: Auto-save success event
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('unified-save-success', {
              detail: {
                frameCount: frames.length,
                nodeCount: graphState.nodes.length,
                timestamp: new Date().toISOString(),
                auto: true
              }
            }));
          }
        }
      } catch (err) {
        console.error("❌ Auto-save failed:", err);
      } finally {
        autoSaveInProgress.current = false;
      }
    }, 10000), // 10-second delay for auto-save
    [frames, graphState, hasUnsavedChanges, autoSaveEnabled, generateStateHash]
  );

  // EFFECT: Trigger auto-save when data changes
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      debouncedAutoSave();
    }
  }, [hasUnsavedChanges, autoSaveEnabled, debouncedAutoSave]);

  // EFFECT: Load initial data on mount
  useEffect(() => {
    const initializeData = async () => {
      // AUTO-LOAD: Only if no data currently loaded
      if (frames.length === 0 && graphState.nodes.length === 0) {
        await loadAll();
      }
    };

    initializeData();
  }, []); // Empty dependency array - only run on mount

  // CRITICAL FIX: Add event listeners to capture frame edit events from UI components
  useEffect(() => {
    const handleFrameEditedEvent = (event: any) => {
      const { frameId, frame } = event.detail;
      
      // DYNAMIC: Safe property merge for ANY frame type and properties
      const updatedFrames = frames.map(f => {
        if (f.id !== frameId) return f;
        
        // Create a safe merge that only updates defined properties
        const safeUpdate: any = { ...f };
        
        // Dynamically merge any properties that exist in the event data
        if (frame && typeof frame === 'object') {
          Object.keys(frame).forEach(key => {
            // Only update if the value is not undefined/null and not internal React props
            if (frame[key] !== undefined && frame[key] !== null && !key.startsWith('_')) {
              safeUpdate[key] = frame[key];
            }
          });
        }
        
        // Always update timestamp for any change
        safeUpdate.updatedAt = new Date().toISOString();
        
        return safeUpdate;
      });
      
      // Use internal setFrames to avoid triggering change detection loop
      setFrames(updatedFrames as UnifiedAIFrame[]);
      
      // Mark as changed for auto-save
      const newHash = generateStateHash(updatedFrames as UnifiedAIFrame[], graphState);
      if (newHash !== lastSaveHash.current) {
        setHasUnsavedChanges(true);
      }
    };
    
    const handleFramesUpdatedEvent = (event: any) => {
      const { frames: updatedFrames, source } = event.detail;
      
      if (source !== "unified-storage") { // Prevent circular updates
        updateFrames(updatedFrames);
      }
    };
    
    const handleConnectionChangedEvent = (event: any) => {
      const { connectionType, connectionData } = event.detail;
      
      // Handle connection/edge changes to graph state
      setGraphState(prevGraphState => {
        const newGraphState = { ...prevGraphState };
        
        if (connectionType === 'added' && connectionData) {
          // Add new connection/edge
          newGraphState.edges = [...(newGraphState.edges || []), connectionData];
        } else if (connectionType === 'removed' && connectionData) {
          // Remove connection/edge
          newGraphState.edges = (newGraphState.edges || []).filter(edge => edge.id !== connectionData.id);
        } else if (connectionType === 'updated' && connectionData) {
          // Update existing connection/edge
          newGraphState.edges = (newGraphState.edges || []).map(edge => 
            edge.id === connectionData.id ? { ...edge, ...connectionData } : edge
          );
        }
        
        return newGraphState;
      });
    };
    
    const handleGraphElementChangedEvent = (event: any) => {
      const { elementType, elementId, elementData, changeType } = event.detail;
      
      // DYNAMIC: Handle any graph element changes (nodes, edges, concepts, chapters, etc.)
      if (elementType === 'node') {
        setGraphState(prevGraphState => {
          const newGraphState = { ...prevGraphState };
          
          if (changeType === 'added' && elementData) {
            newGraphState.nodes = [...(newGraphState.nodes || []), elementData];
          } else if (changeType === 'removed' && elementId) {
            newGraphState.nodes = (newGraphState.nodes || []).filter(node => node.id !== elementId);
          } else if (changeType === 'updated' && elementId && elementData) {
            newGraphState.nodes = (newGraphState.nodes || []).map(node => 
              node.id === elementId ? { ...node, ...elementData } : node
            );
          }
          
          return newGraphState;
        });
      }
    };
    
    // Add event listeners for frame edits and updates from UI components
    if (typeof window !== 'undefined') {
      window.addEventListener("frame-edited", handleFrameEditedEvent);
      window.addEventListener("frames-updated", handleFramesUpdatedEvent);
      window.addEventListener("connection-changed", handleConnectionChangedEvent);
      window.addEventListener("graph-element-changed", handleGraphElementChangedEvent);
      
      return () => {
        window.removeEventListener("frame-edited", handleFrameEditedEvent);
        window.removeEventListener("frames-updated", handleFramesUpdatedEvent);
        window.removeEventListener("connection-changed", handleConnectionChangedEvent);
        window.removeEventListener("graph-element-changed", handleGraphElementChangedEvent);
      };
    }
  }, [frames, graphState, generateStateHash]);

  // AUTO-SAVE CONTROLS
  const enableAutoSave = useCallback(() => {
    setAutoSaveEnabled(true);
  }, []);

  const disableAutoSave = useCallback(() => {
    setAutoSaveEnabled(false);
  }, []);

  return {
    // State
    frames,
    graphState,
    isLoading,
    error,
    hasUnsavedChanges,
    
    // Actions
    saveAll,
    loadAll,
    updateFrames,
    updateGraphState,
    clearAll,
    
    // Auto-save control
    enableAutoSave,
    disableAutoSave
  };
}; 