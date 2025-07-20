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
  
  // CRITICAL FIX: Add ref to track last graph state to prevent infinite loops
  const lastGraphStateRef = useRef<string>('');
  const lastSaveHash = useRef<string>('');
  const loopPreventionRef = useRef<string>('');
  
  // REFS: Prevent stale closures and infinite loops
  const framesRef = useRef<UnifiedAIFrame[]>([]);
  const graphStateRef = useRef<GraphState>({ nodes: [], edges: [], selectedNodeId: null });
  const lastStateSignatureRef = useRef<string>('');
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false);
  const isSavingRef = useRef(false);
  const autoSaveEnabledRef = useRef(true); // Initialize auto-save as enabled
  const backgroundSaveQueue = useRef<{
    isProcessing: boolean;
    pendingFrames: UnifiedAIFrame[] | null;
    pendingGraphState: GraphState | null;
  }>({
    isProcessing: false,
    pendingFrames: null,
    pendingGraphState: null
  });

  // INITIALIZATION: Set up unified storage
  useEffect(() => {
    if (vectorStore && vectorStoreInitialized) {
      unifiedStorage.setVectorStore(vectorStore);
    }
  }, [vectorStore, vectorStoreInitialized]);

  // CHECKSUM: Generate hash for change detection with smart position handling
  const generateStateHash = useCallback((frames: UnifiedAIFrame[], graphState: GraphState): string => {
    // PERFORMANCE FIX: Round positions to prevent micro-movements from triggering saves
    const roundedPositions = graphState.nodes.map(n => ({ 
      id: n.id, 
      x: n.position?.x ? Math.round(n.position.x / 10) * 10 : 0, // Round to nearest 10px
      y: n.position?.y ? Math.round(n.position.y / 10) * 10 : 0  // Round to nearest 10px
    })).sort((a, b) => a.id.localeCompare(b.id));
    
    const stateString = JSON.stringify({ 
      frameCount: frames.length,
      frameIds: frames.map(f => f.id).sort(),
      frameContentHash: frames.map(f => `${f.id}-${f.title}-${f.goal}`).sort().join('|'), // Content-based hash
      nodeCount: graphState.nodes.length,
      edgeCount: graphState.edges.length,
      // POSITION PRESERVATION: Include viewport and rounded node positions
      viewport: graphState.viewport ? {
        x: Math.round(graphState.viewport.x / 10) * 10,
        y: Math.round(graphState.viewport.y / 10) * 10,
        zoom: Math.round(graphState.viewport.zoom * 100) / 100 // Round zoom to 2 decimals
      } : null,
      nodePositions: roundedPositions
    });
    return btoa(stateString).slice(0, 16);
  }, []);

  // Update refs whenever state changes to prevent stale closures
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);
  
  useEffect(() => {
    graphStateRef.current = graphState;
  }, [graphState]);

  // BACKGROUND SAVE: Non-blocking queue-based save system
  const queueBackgroundSave = useCallback(async (frames: UnifiedAIFrame[], graphState: GraphState, priority = false) => {
    // CRITICAL FIX: Priority saves (like node drops) lock the queue to prevent overwrites
    if (priority && !backgroundSaveQueue.current.isProcessing) {
      backgroundSaveQueue.current.pendingFrames = frames;
      backgroundSaveQueue.current.pendingGraphState = graphState;
      backgroundSaveQueue.current.isProcessing = true; // Lock immediately
      
      console.log("🔒 PRIORITY SAVE: Locked queue with fresh graph state");
      
      // Process immediately without delay for priority saves
      try {
        const success = await unifiedStorage.saveAll(frames, graphState);
        console.log("🔒 PRIORITY SAVE: Completed with result:", { success });
        
        if (success) {
          const newHash = generateStateHash(frames, graphState);
          lastSaveHash.current = newHash;
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        console.error("❌ Priority save failed:", error);
      } finally {
        backgroundSaveQueue.current.isProcessing = false;
      }
      return;
    }
    
    // Normal save logic - can be overwritten
    if (!backgroundSaveQueue.current.isProcessing) {
      backgroundSaveQueue.current.pendingFrames = frames;
      backgroundSaveQueue.current.pendingGraphState = graphState;
    }
    
    // Don't start processing if already processing
    if (backgroundSaveQueue.current.isProcessing) {
      return;
    }
    
    // Start background processing
    backgroundSaveQueue.current.isProcessing = true;
    
    try {
      // Small delay to batch rapid changes
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Get latest pending data
      const latestFrames = backgroundSaveQueue.current.pendingFrames;
      const latestGraphState = backgroundSaveQueue.current.pendingGraphState;
      
      if (latestFrames && latestGraphState) {
        // Clear pending data before save
        backgroundSaveQueue.current.pendingFrames = null;
        backgroundSaveQueue.current.pendingGraphState = null;
        
        // Perform actual save in background
        console.log("🔄 BACKGROUND SAVE: Starting with data:", {
          frameCount: latestFrames.length,
          nodeCount: latestGraphState.nodes.length,
          edgeCount: latestGraphState.edges?.length || 0,
          frameIds: latestFrames.map(f => f.id),
          edges: latestGraphState.edges?.map(e => ({ id: e.id, source: e.source, target: e.target })) || [],
          timestamp: new Date().toISOString()
        });
        
        const success = await unifiedStorage.saveAll(latestFrames, latestGraphState);
        
        console.log("🔄 BACKGROUND SAVE: Completed with result:", {
          success,
          timestamp: new Date().toISOString()
        });
        
        if (success) {
          const newHash = generateStateHash(latestFrames, latestGraphState);
          lastSaveHash.current = newHash;
          setHasUnsavedChanges(false);
          
          // BROADCAST: Background save success
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('unified-save-success', {
              detail: {
                frameCount: latestFrames.length,
                nodeCount: latestGraphState.nodes.length,
                timestamp: new Date().toISOString(),
                background: true
              }
            }));
          }
        }
      }
    } catch (error) {
      console.error("❌ Background save failed:", error);
    } finally {
      backgroundSaveQueue.current.isProcessing = false;
      
      // Check if more data was queued while processing
      if (backgroundSaveQueue.current.pendingFrames) {
        // Recursively process remaining data
        const frames = backgroundSaveQueue.current.pendingFrames;
        const graphState = backgroundSaveQueue.current.pendingGraphState;
        if (frames && graphState) {
          queueBackgroundSave(frames, graphState);
        }
      }
    }
  }, [generateStateHash]);

  // SAVE: Unified save to all storage layers
  const saveAll = useCallback(async (): Promise<boolean> => {
    if (isSavingRef.current) {
      console.log("⏳ Save already in progress, skipping...");
      return false;
    }

    try {
      isSavingRef.current = true;
      setIsLoading(true);
      setError(null);

      // Use current ref values for fresh state
      const currentFrames = framesRef.current;
      const currentGraphState = graphStateRef.current;
      
      // Using fresh state from refs

      const success = await unifiedStorage.saveAll(currentFrames, currentGraphState);
      
      if (success) {
        const newHash = generateStateHash(currentFrames, currentGraphState);
        lastSaveHash.current = newHash;
        setHasUnsavedChanges(false);
        console.log("✅ Manual save completed successfully");
        
        // BROADCAST: Save success event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('unified-save-success', {
            detail: {
              frameCount: currentFrames.length,
              nodeCount: currentGraphState.nodes.length,
              timestamp: new Date().toISOString(),
              manual: true
            }
          }));
        }
        return true;
      } else {
        setError("Failed to save frames");
        console.error("❌ Manual save failed");
        return false;
      }
    } catch (err) {
      const error = err as Error;
      setError(`Save failed: ${error.message}`);
      console.error("❌ Save error:", error);
      return false;
    } finally {
      setIsLoading(false);
      isSavingRef.current = false; // Always reset saving flag
    }
  }, [generateStateHash]);

  // LOAD: Unified load from best available source
  const loadAll = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await unifiedStorage.loadAll();
      
      if (data) {
        // Frame content loaded successfully
        
        setFrames(data.frames);
        
        // CRITICAL FIX: Deduplicate edges to prevent React key conflicts
        const deduplicatedGraphState = {
          ...data.graphState,
          edges: data.graphState.edges ? 
            data.graphState.edges.filter((edge, index, array) => 
              array.findIndex(e => e.id === edge.id) === index
            ) : []
        };
        
        // Additional deduplication by source-target-handle combination
        const finalGraphState = {
          ...deduplicatedGraphState,
          edges: deduplicatedGraphState.edges.filter((edge, index, array) => {
            const edgeAny = edge as any;
            const key = `${edge.source}-${edge.target}-${edgeAny.sourceHandle || 'null'}-${edgeAny.targetHandle || 'null'}`;
            return array.findIndex(e => {
              const eAny = e as any;
              const eKey = `${e.source}-${e.target}-${eAny.sourceHandle || 'null'}-${eAny.targetHandle || 'null'}`;
              return eKey === key;
            }) === index;
          })
        };
        
        if (data.graphState.edges && finalGraphState.edges.length !== data.graphState.edges.length) {
          // Edges deduplicated
        }
        
        // CONFLICT RESOLUTION: Sync nodes with frame data (frames are source of truth)
        const syncedGraphState = {
          ...finalGraphState,
          nodes: finalGraphState.nodes.map(node => {
            // Find matching frame for this node
            const matchingFrame = data.frames.find(frame => frame.id === node.data?.frameId);
            
            // Check if node needs sync with frame data
            
            if (matchingFrame && node.data) {
              // Frame data takes precedence over node data
              const nodeNeedsSync = 
                node.data.title !== matchingFrame.title ||
                node.data.goal !== matchingFrame.goal ||
                node.data.informationText !== matchingFrame.informationText;
              
              if (nodeNeedsSync) {
                // Sync node with frame data
                
                return {
                  ...node,
                  data: {
                    ...node.data,
                    title: matchingFrame.title,
                    goal: matchingFrame.goal,
                    informationText: matchingFrame.informationText,
                    afterVideoText: matchingFrame.afterVideoText,
                    aiConcepts: matchingFrame.aiConcepts,
                    isGenerated: matchingFrame.isGenerated
                  }
                };
              } else {
                console.log(`✅ Node ${node.id} already in sync with frame data`);
              }
            } else {
              console.warn(`⚠️ No matching frame found for node ${node.id} with frameId: ${node.data?.frameId}`);
            }
            return node;
          })
        };
        
        setGraphState(syncedGraphState);
        
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

  // OPTIMISTIC UPDATE: Enhanced updateFrames with instant UI updates
  const updateFrames = useCallback((newFrames: AIFrame[]) => {
    // CRITICAL LOG: Only track frame corruption, not every update
    if (newFrames.length === 0 && frames.length > 0) {
      const callStack = new Error().stack;
      console.error("🔴 CORRUPTION DETECTED: Frames being cleared!", {
        previousCount: frames.length,
        newCount: newFrames.length,
        topCallers: callStack?.split('\n').slice(1, 3).map(line => line.trim()) || []
      });
    }
    
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
    
    // OPTIMISTIC UPDATE: Apply UI changes instantly
    setFrames(unifiedFrames);
    
    // CHANGE DETECTION: Mark as unsaved if content changed
    const newHash = generateStateHash(unifiedFrames, graphState);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);
      
      // BACKGROUND SAVE: Queue non-blocking save (don't await)
      queueBackgroundSave(unifiedFrames, graphState);
    }
  }, [frames, graphState, generateStateHash, queueBackgroundSave]);

  // OPTIMISTIC UPDATE: Enhanced updateGraphState with instant updates
  const updateGraphState = useCallback((newGraphState: GraphState) => {
    // CRITICAL FIX: Deduplicate edges before setting state
    const deduplicatedState = {
      ...newGraphState,
      edges: newGraphState.edges ? 
        newGraphState.edges.filter((edge, index, array) => {
          // Deduplicate by ID first
          const firstByIdIndex = array.findIndex(e => e.id === edge.id);
          if (firstByIdIndex !== index) return false;
          
          // Then deduplicate by source-target-handle combination
          const edgeAny = edge as any;
          const key = `${edge.source}-${edge.target}-${edgeAny.sourceHandle || 'null'}-${edgeAny.targetHandle || 'null'}`;
          return array.findIndex(e => {
            const eAny = e as any;
            const eKey = `${e.source}-${e.target}-${eAny.sourceHandle || 'null'}-${eAny.targetHandle || 'null'}`;
            return eKey === key;
          }) === index;
        }) : []
    };
    
    // OPTIMISTIC UPDATE: Apply UI changes instantly
    setGraphState(deduplicatedState);
    
    // CHANGE DETECTION: Mark as unsaved if content changed
    const newHash = generateStateHash(frames, deduplicatedState);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);
      
      // BACKGROUND SAVE: Queue non-blocking save (don't await)
      queueBackgroundSave(frames, deduplicatedState);
    }
  }, [frames, generateStateHash, queueBackgroundSave]);

  // CLEANUP: Clear all storage and reset state
  const clearAll = useCallback(async () => {
    console.log('🗑️ Clearing all storage...');
    setFrames([]);
    setGraphState({ nodes: [], edges: [], selectedNodeId: null });
    setHasUnsavedChanges(false);
    lastSaveHash.current = '';
    
    // CLEANUP: Remove old storage
    try {
      await unifiedStorage.cleanup();
      console.log('✅ All storage cleared successfully');
    } catch (err) {
      console.error('❌ Error clearing storage:', err);
    }
  }, []);

  // AUTO-SAVE: Disabled in favor of background saves
  // Background saves are now handled by queueBackgroundSave for better performance

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
      const frameId = event.detail.frameId;
      const frame = event.detail.frame || event.detail.updatedFrame;
      
      console.log("🎯 FRAME EDIT DEBUG:", {
        frameId,
        frameData: frame,
        currentFrames: framesRef.current.map(f => ({ id: f.id, title: f.title })),
        eventType: event.type
      });
      
      if (!frame || !frameId) return;
      
      const updatedFrames = framesRef.current.map((f: any) => {
        if (f.id !== frameId) return f;
        
        const safeUpdate: any = { ...f };
        
        if (frame && typeof frame === 'object') {
          Object.keys(frame).forEach(key => {
            if (frame[key] !== undefined && 
                frame[key] !== null && 
                !key.startsWith('_')) {
              safeUpdate[key] = frame[key];
            }
          });
        }
        
        safeUpdate.updatedAt = new Date().toISOString();
        return safeUpdate;
      });
      
      // CRITICAL FIX: Update refs immediately before calling updateFrames
      framesRef.current = updatedFrames;
      
      // Apply UI update
      setFrames(updatedFrames);
      setHasUnsavedChanges(true);
      
      // CRITICAL FIX: Queue background save with the already-updated frames
      queueBackgroundSave(updatedFrames, graphStateRef.current);
    };
    
    const handleFramesUpdatedEvent = (event: any) => {
      const { frames: updatedFrames, source } = event.detail;
      
      if (source !== "unified-storage") { // Prevent circular updates
        updateFrames(updatedFrames);
      }
    };
    
    const handleConnectionChangedEvent = (event: any) => {
      const { connectionType, connectionData } = event.detail;
      
      // Connection change detected
      
      // Handle connection/edge changes to graph state with deduplication
      const newGraphState = { ...graphStateRef.current };
      
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
      
      updateGraphState(newGraphState);
      
      // CRITICAL FIX: Trigger immediate background save for connections
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, newGraphState);
    };
    
    const handleGraphElementChangedEvent = (event: any) => {
      const { elementType, elementId, elementData, changeType } = event.detail;
      
      // Graph element change detected
      
      // DYNAMIC: Handle any graph element changes (nodes, edges, concepts, chapters, etc.)
      if (elementType === 'node') {
        const newGraphState = { ...graphStateRef.current };
        
        if (changeType === 'added' && elementData) {
          newGraphState.nodes = [...(newGraphState.nodes || []), elementData];
        } else if (changeType === 'removed' && elementId) {
          newGraphState.nodes = (newGraphState.nodes || []).filter(node => node.id !== elementId);
        } else if (changeType === 'updated' && elementId && elementData) {
          newGraphState.nodes = (newGraphState.nodes || []).map(node => 
            node.id === elementId ? { ...node, ...elementData } : node
          );
        }
        
        updateGraphState(newGraphState);
        
        // CRITICAL FIX: Trigger immediate background save for graph elements
        setHasUnsavedChanges(true);
        queueBackgroundSave(framesRef.current, newGraphState);
      }
    };
    
    // CRITICAL FIX: Handle attachment operations that require unified save
    const handleAttachmentChangedEvent = (event: any) => {
      const { frameId, attachment, action } = event.detail;
      
      // Attachment change detected
      
      // Update frames state to reflect attachment change
      if (action === 'attached' && attachment) {
        const updatedFrames = frames.map(frame => 
          frame.id === frameId ? { 
            ...frame, 
            attachment,
            updatedAt: new Date().toISOString() 
          } : frame
        );
        setFrames(updatedFrames);
      } else if (action === 'detached') {
        const updatedFrames = frames.map(frame => 
          frame.id === frameId ? { 
            ...frame, 
            attachment: undefined,
            updatedAt: new Date().toISOString() 
          } : frame
        );
        setFrames(updatedFrames);
      }
      
      // OPTIMISTIC: Trigger immediate background save for attachment operations
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, graphStateRef.current);
    };

    // CRITICAL FIX: Handle attachment content updates (note name changes, etc.)
    const handleAttachmentNodeUpdatedEvent = (event: any) => {
      const { frameId, attachment } = event.detail;
      
      // Update the frame's attachment property in unified storage
      const updatedFrames = frames.map(frame => 
        frame.id === frameId ? { 
          ...frame, 
          attachment: attachment,
          updatedAt: new Date().toISOString() 
        } : frame
      );
      
      setFrames(updatedFrames);
      
      // OPTIMISTIC: Trigger immediate background save for attachment content changes
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, graphStateRef.current);
    };
    
    // OPTIMISTIC: Handle force save events from attachment operations  
    const handleForceSaveEvent = (event: any) => {
      const { graphState: eventGraphState, reason } = event.detail || {};
      
      // CRITICAL FIX: Use fresh graph state from event if provided, otherwise fall back to ref
      const graphStateToUse = eventGraphState || graphStateRef.current;
      
      
      // CRITICAL FIX: Skip if this is a node-drop-delayed save and we already have a pending save
      if ((reason === 'node-drop-delayed' || reason === 'node-data-updated') && backgroundSaveQueue.current.isProcessing) {
        console.log('⏸️ Skipping delayed save - background save already in progress');
        return;
      }
      
      // OPTIMISTIC: Use background save instead of blocking save
      setHasUnsavedChanges(true);
      
      // CRITICAL FIX: Use priority mode for critical graph state changes to prevent overwrites
      const isPriorityMode = (reason === 'node-drop-delayed' || reason === 'node-data-updated') && eventGraphState;
      queueBackgroundSave(framesRef.current, graphStateToUse, isPriorityMode);
    };
    
    // CRITICAL FIX: Handle graph connection events (added/removed)
    const handleGraphConnectionEvent = (event: any) => {
      const { connection } = event.detail;
      const eventType = event.type; // 'graph-connection-added' or 'graph-connection-removed'
      
      // Graph connection event detected
      let updatedGraphState = graphStateRef.current;
      
      // Update graph state with new connection using deduplication
      if (eventType === 'graph-connection-added' && connection) {
        updatedGraphState = {
          ...graphStateRef.current,
          edges: [...(graphStateRef.current.edges || []), connection]
        };
        updateGraphState(updatedGraphState);
      } else if (eventType === 'graph-connection-removed' && connection) {
        updatedGraphState = {
          ...graphStateRef.current,
          edges: (graphStateRef.current.edges || []).filter(edge => edge.id !== connection.id)
        };
        updateGraphState(updatedGraphState);
      }
      
      // CRITICAL: Trigger immediate background save for connections
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, updatedGraphState);
    };
    
    // CRITICAL FIX: Handle frame deletion events
    const handleFrameDeletionEvent = (event: any) => {
      const { frameId, deletedFrameIds } = event.detail;
      
      console.log('🗑️ Frame deletion event detected:', { frameId, deletedFrameIds });
      
      // Update frames state to remove deleted frames
      if (deletedFrameIds && deletedFrameIds.length > 0) {
        const updatedFrames = frames.filter(frame => !deletedFrameIds.includes(frame.id));
        setFrames(updatedFrames);
      } else if (frameId) {
        const updatedFrames = frames.filter(frame => frame.id !== frameId);
        setFrames(updatedFrames);
      }
      
      // OPTIMISTIC: Trigger immediate background save for frame deletion
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, graphStateRef.current);
    };
    
    // NEW: Handle node removal without frame deletion
    const handleNodeRemovalEvent = (event: any) => {
      const { frameId } = event.detail;
      
      // Node removal - preserve frame data
      
      // Update graph state to remove node but keep frame data
      const currentGraphState = graphStateRef.current;
      const updatedNodes = (currentGraphState.nodes || []).filter(
        node => node.data?.frameId !== frameId
      );
      
      // Also remove any edges connected to this node
      const removedNodeIds = currentGraphState.nodes
        .filter(node => node.data?.frameId === frameId)
        .map(node => node.id);
      
      const updatedEdges = (currentGraphState.edges || []).filter(
        edge => !removedNodeIds.includes(edge.source) && !removedNodeIds.includes(edge.target)
      );
      
      const newGraphState = {
        ...currentGraphState,
        nodes: updatedNodes,
        edges: updatedEdges
      };
      
      updateGraphState(newGraphState);
      
      // Trigger immediate background save for node removal
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, newGraphState);
    };
    
    // Add event listeners for frame edits and updates from UI components
    if (typeof window !== 'undefined') {
      window.addEventListener("frame-edited", handleFrameEditedEvent);
      window.addEventListener("graph-frame-edited", handleFrameEditedEvent);
      window.addEventListener("frames-updated", handleFramesUpdatedEvent);
      window.addEventListener("connection-changed", handleConnectionChangedEvent);
      window.addEventListener("graph-element-changed", handleGraphElementChangedEvent);
      window.addEventListener("graph-attachment-changed", handleAttachmentChangedEvent);
      window.addEventListener("attachment-node-updated", handleAttachmentNodeUpdatedEvent);
      window.addEventListener("force-save-frames", handleForceSaveEvent);
      window.addEventListener("graph-connection-added", handleGraphConnectionEvent);
      window.addEventListener("graph-connection-removed", handleGraphConnectionEvent);
      window.addEventListener("graph-frame-deleted", handleFrameDeletionEvent);
      window.addEventListener("graph-node-removed", handleNodeRemovalEvent);
      window.addEventListener("graph-state-changed", handleGraphStateChangedEvent);
      
      return () => {
        window.removeEventListener("frame-edited", handleFrameEditedEvent);
        window.removeEventListener("graph-frame-edited", handleFrameEditedEvent);
        window.removeEventListener("frames-updated", handleFramesUpdatedEvent);
        window.removeEventListener("connection-changed", handleConnectionChangedEvent);
        window.removeEventListener("graph-element-changed", handleGraphElementChangedEvent);
        window.removeEventListener("graph-attachment-changed", handleAttachmentChangedEvent);
        window.removeEventListener("attachment-node-updated", handleAttachmentNodeUpdatedEvent);
        window.removeEventListener("force-save-frames", handleForceSaveEvent);
        window.removeEventListener("graph-connection-added", handleGraphConnectionEvent);
        window.removeEventListener("graph-connection-removed", handleGraphConnectionEvent);
        window.removeEventListener("graph-frame-deleted", handleFrameDeletionEvent);
        window.removeEventListener("graph-node-removed", handleNodeRemovalEvent);
        window.removeEventListener("graph-state-changed", handleGraphStateChangedEvent);
      };
    }
  }, [queueBackgroundSave]);

  // OPTIMISTIC: Add background save for new frames
  useEffect(() => {
    const handleNewFrameCreated = () => {
      // Trigger background save for new frames to prevent data loss
      if (autoSaveEnabledRef.current && hasUnsavedChanges) {
        setHasUnsavedChanges(true);
        queueBackgroundSave(framesRef.current, graphStateRef.current);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('graph-frame-added', handleNewFrameCreated as EventListener);
      return () => window.removeEventListener('graph-frame-added', handleNewFrameCreated as EventListener);
    }
  }, [queueBackgroundSave, autoSaveEnabledRef.current, hasUnsavedChanges]);


  // AUTO-SAVE CONTROLS
  const enableAutoSave = useCallback(() => {
    autoSaveEnabledRef.current = true;
    // Auto-save enabled
  }, []);

  const disableAutoSave = useCallback(() => {
    autoSaveEnabledRef.current = false;
    // Auto-save disabled
  }, []);

  // CRITICAL FIX: Atomic graph state update function
  const updateGraphStateAtomically = useCallback((newNodes: any[], newEdges: any[], selectedNodeId?: string | null) => {
    // Validate the complete graph state before applying ANY changes
    const validateCompleteGraphState = (nodes: any[], edges: any[]) => {
      // Rule 1: If edges exist, nodes must exist
      if (edges.length > 0 && nodes.length === 0) {
        // Invalid state: edges without nodes
        return false;
      }
      
      // Rule 2: All edges must reference existing nodes
      if (edges.length > 0 && nodes.length > 0) {
        const nodeIds = new Set(nodes.map(n => n.id));
        const invalidEdges = edges.filter(e => 
          !nodeIds.has(e.source) || !nodeIds.has(e.target)
        );
        
        if (invalidEdges.length > 0) {
          // Invalid state: orphaned edges detected
          return false;
        }
      }
      
      // Rule 3: Node data integrity check
      const invalidNodes = nodes.filter(n => !n.id || typeof n.id !== 'string');
      if (invalidNodes.length > 0) {
        // Invalid state: nodes missing IDs
        return false;
      }
      
      return true;
    };
    
    // Only proceed if the complete state is valid
    if (!validateCompleteGraphState(newNodes, newEdges)) {
      // ATOMIC UPDATE REJECTED: Invalid graph state
      return false;
    }
    
    // Apply atomic update - all or nothing
    try {
      const atomicGraphState = {
        nodes: newNodes,
        edges: newEdges,
        selectedNodeId: selectedNodeId || null
      };
      
      setGraphState(atomicGraphState);
      setHasUnsavedChanges(true);
      
      return true;
       
    } catch (error) {
      // ATOMIC UPDATE FAILED
      return false;
    }
  }, [setGraphState, setHasUnsavedChanges]); // REMOVED graphState dependency to prevent infinite loop

  // UPDATE: Modified graph state change handler to use atomic updates
  const handleGraphStateChangedEvent = (event: any) => {
    const { nodes, edges, selectedNodeId, nodeCount, edgeCount } = event.detail;
    
    // CRITICAL FIX: Prevent infinite loops by checking if state actually changed using dedicated ref
    const newStateSignature = `${nodeCount}-${edgeCount}-${selectedNodeId || 'null'}`;
    
    if (loopPreventionRef.current === newStateSignature) {
      // State hasn't changed, skip update to prevent infinite loop
      return;
    }
    
    // Update the ref with the new state signature
    loopPreventionRef.current = newStateSignature;
    
    // Use atomic update function for all graph state changes
    const success = updateGraphStateAtomically(nodes, edges, selectedNodeId);
    
    if (!success) {
      // GRAPH STATE UPDATE FAILED
    }
  };

  // OPTIMISTIC: Add force-save-frames event listener with background saves
  useEffect(() => {
    const handleForceSave = () => {
      // OPTIMISTIC: Use background save instead of blocking save
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, graphStateRef.current);
    };

    // Add event listener for force-save-frames
    window.addEventListener('force-save-frames', handleForceSave);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('force-save-frames', handleForceSave);
    };
  }, [queueBackgroundSave]); // Include queueBackgroundSave dependency

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