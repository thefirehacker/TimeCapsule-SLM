import { useState, useCallback, useEffect, useRef } from 'react';
import { AIFrame, Chapter } from '../types/frames';
import { GraphState } from '@/components/ai-graphs/types';
import { unifiedStorage, UnifiedAIFrame, UnifiedChapter } from '../lib/unifiedStorage';

const DEFAULT_CHAPTER_COLOR = '#3B82F6';

interface UseUnifiedStorageProps {
  vectorStore?: any;
  vectorStoreInitialized?: boolean;
}

interface UseUnifiedStorageReturn {
  frames: UnifiedAIFrame[];
  chapters: UnifiedChapter[];
  graphState: GraphState;
  isLoading: boolean;
  error: string | null;
  hasUnsavedChanges: boolean;
  
  // Actions
  saveAll: () => Promise<boolean>;
  loadAll: () => Promise<boolean>;
  updateFrames: (frames: AIFrame[]) => void;
  updateChapters: (chapters: Chapter[]) => void;
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
  const [chapters, setChapters] = useState<UnifiedChapter[]>([]);
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
  const chaptersRef = useRef<UnifiedChapter[]>([]);
  const graphStateRef = useRef<GraphState>({ nodes: [], edges: [], selectedNodeId: null });
  const lastStateSignatureRef = useRef<string>('');
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false);
  const isSavingRef = useRef(false);
  const autoSaveEnabledRef = useRef(true); // Initialize auto-save as enabled
  const backgroundSaveQueue = useRef<{
    isProcessing: boolean;
    pendingFrames: UnifiedAIFrame[] | null;
    pendingChapters: UnifiedChapter[] | null;
    pendingGraphState: GraphState | null;
    pendingOptions: { priority?: boolean; skipVectorStore?: boolean } | null;
  }>({
    isProcessing: false,
    pendingFrames: null,
    pendingChapters: null,
    pendingGraphState: null,
    pendingOptions: null
  });

  // INITIALIZATION: Set up unified storage
  useEffect(() => {
    if (vectorStore && vectorStoreInitialized) {
      unifiedStorage.setVectorStore(vectorStore);
    }
  }, [vectorStore, vectorStoreInitialized]);

  // CHECKSUM: Generate hash for change detection with smart position handling
  const generateStateHash = useCallback((frames: UnifiedAIFrame[], chapters: UnifiedChapter[], graphState: GraphState): string => {
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
      chapterCount: chapters.length,
      chapterIds: chapters.map(c => c.id).sort(),
      chapterAssignments: chapters
        .map(chapter => `${chapter.id}:${[...(chapter.frameIds || [])].sort().join(',')}`)
        .sort()
        .join('|'),
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
    chaptersRef.current = chapters;
  }, [chapters]);
  
  useEffect(() => {
    graphStateRef.current = graphState;
  }, [graphState]);

  // BACKGROUND SAVE: Non-blocking queue-based save system
  const deriveChaptersFromGraph = useCallback((existingChapters: UnifiedChapter[], framesForGraph: UnifiedAIFrame[], graphStateForDerive: GraphState): UnifiedChapter[] => {
    const nodes = graphStateForDerive?.nodes || [];
    const edges = graphStateForDerive?.edges || [];
    const chapterNodes = nodes.filter((node: any) => node?.type === 'chapter');
    if (!chapterNodes.length) {
      return existingChapters;
    }

    const now = new Date().toISOString();
    const existingById = new Map(existingChapters.map((chapter) => [chapter.id, chapter]));
    const frameNodeById = new Map<string, any>();
    const nodeById = new Map<string, any>();
    const chapterConceptMap = new Map<string, Set<string>>();

    nodes.forEach((node: any) => {
      nodeById.set(node.id, node);
      if (node?.type === 'aiframe' && node?.data?.frameId) {
        frameNodeById.set(node.id, node);
      }
    });

    const collectConcept = (chapterNodeId: string, conceptNode: any) => {
      if (!conceptNode?.data) return;
      const conceptValue =
        (conceptNode.data.concept ||
          conceptNode.data.title ||
          conceptNode.data.label ||
          '').trim();
      if (!conceptValue) return;
      const set = chapterConceptMap.get(chapterNodeId) ?? new Set<string>();
      set.add(conceptValue);
      chapterConceptMap.set(chapterNodeId, set);
    };

    edges.forEach((edge: any) => {
      const sourceNode = nodeById.get(edge.source);
      const targetNode = nodeById.get(edge.target);
      if (!sourceNode || !targetNode) return;

      if (sourceNode.type === 'concept' && targetNode.type === 'chapter') {
        const chapterId = targetNode.data?.id || targetNode.id;
        collectConcept(chapterId, sourceNode);
      }

      if (sourceNode.type === 'chapter' && targetNode.type === 'concept') {
        const chapterId = sourceNode.data?.id || sourceNode.id;
        collectConcept(chapterId, targetNode);
      }
    });

    const derivedChapters: UnifiedChapter[] = chapterNodes.map((node: any, index: number) => {
      const data = node?.data || {};
      const chapterId = data.id || node.id || `chapter-${index}`;
      const previous = existingById.get(chapterId);
      const frameIdsFromNode = Array.isArray(data.frameIds) ? data.frameIds.filter(Boolean) : [];
      const frameIdsFromEdges = edges.reduce<string[]>((acc, edge: any) => {
        if (edge.source === node.id) {
          const targetNode = frameNodeById.get(edge.target);
          if (targetNode?.data?.frameId) {
            acc.push(targetNode.data.frameId);
          }
        }
        if (edge.target === node.id) {
          const sourceNode = frameNodeById.get(edge.source);
          if (sourceNode?.data?.frameId) {
            acc.push(sourceNode.data.frameId);
          }
        }
        return acc;
      }, []);
      const frameIdsSet = new Set<string>([...frameIdsFromNode, ...frameIdsFromEdges, ...(previous?.frameIds || [])]);
      const frameIds = Array.from(frameIdsSet).filter(Boolean);
      const conceptIdsFromData = Array.isArray(data.conceptIds) ? data.conceptIds.filter(Boolean) : [];
      const conceptIdsSet = new Set<string>(conceptIdsFromData);
      const conceptIdsFromEdges = chapterConceptMap.get(chapterId);
      if (conceptIdsFromEdges) {
        conceptIdsFromEdges.forEach((concept) => conceptIdsSet.add(concept));
      }
      (previous?.conceptIds || []).forEach((concept) => conceptIdsSet.add(concept));
      const conceptIds = Array.from(conceptIdsSet).filter(Boolean);

      const resolvedTitle = previous?.title || data.title || `Chapter ${index + 1}`;
      const resolvedDescription = previous?.description ?? data.description ?? '';
      const resolvedColor = previous?.color || data.color || DEFAULT_CHAPTER_COLOR;
      let resolvedOrder = index;
      if (typeof previous?.order === 'number') {
        resolvedOrder = previous.order as number;
      } else if (typeof data.order === 'number') {
        resolvedOrder = data.order;
      }

      return {
        id: chapterId,
        title: resolvedTitle,
        description: resolvedDescription,
        color: resolvedColor,
        order: resolvedOrder,
        frameIds,
        conceptIds,
        bubblSpaceId: previous?.bubblSpaceId,
        timeCapsuleId: previous?.timeCapsuleId,
        createdAt: previous?.createdAt || now,
        updatedAt: now,
        isCollapsed: previous?.isCollapsed ?? false,
      };
    });

    if (!edges.length) {
      return derivedChapters;
    }

    const chapterIds = derivedChapters.map((chapter) => chapter.id);
    const adjacency = new Map<string, Set<string>>();
    const inDegree = new Map<string, number>();

    chapterIds.forEach((id) => {
      adjacency.set(id, new Set());
      inDegree.set(id, 0);
    });

    edges.forEach((edge: any) => {
      const sourceNode = nodeById.get(edge.source);
      const targetNode = nodeById.get(edge.target);
      if (!sourceNode || !targetNode) return;
      if (sourceNode.type === 'chapter' && targetNode.type === 'chapter') {
        const fromId = sourceNode.data?.id || sourceNode.id;
        const toId = targetNode.data?.id || targetNode.id;
        if (fromId === toId) return;
        if (!adjacency.has(fromId) || !adjacency.has(toId)) return;
        const neighbors = adjacency.get(fromId)!;
        if (!neighbors.has(toId)) {
          neighbors.add(toId);
          inDegree.set(toId, (inDegree.get(toId) || 0) + 1);
        }
      }
    });

    const queue: string[] = [];
    const visitedOrder: string[] = [];

    adjacency.forEach((neighbors, id) => {
      if ((inDegree.get(id) || 0) === 0) {
        queue.push(id);
      }
    });

    while (queue.length) {
      const chapterId = queue.shift()!;
      visitedOrder.push(chapterId);
      adjacency.get(chapterId)?.forEach((neighbor) => {
        const newDegree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree <= 0) {
          queue.push(neighbor);
        }
      });
    }

    const hasCycle = visitedOrder.length !== chapterIds.length;
    if (hasCycle) {
      return derivedChapters;
    }

    const orderMap = new Map<string, number>();
    visitedOrder.forEach((id, index) => {
      orderMap.set(id, index);
    });

    return derivedChapters.map((chapter) => ({
      ...chapter,
      order: orderMap.get(chapter.id) ?? chapter.order,
    }));
  }, []);

  const deriveFrameConceptsFromGraph = useCallback((framesForGraph: UnifiedAIFrame[], graphStateForConcepts: GraphState): Map<string, string[]> => {
    const edges = graphStateForConcepts?.edges || [];
    if (!edges.length) {
      return new Map();
    }

    const nodes = graphStateForConcepts?.nodes || [];
    const nodesById = new Map<string, any>();
    const conceptNodes = new Map<string, any>();
    const frameNodes = new Map<string, any>();

    nodes.forEach((node: any) => {
      nodesById.set(node.id, node);
      if (node?.type === 'concept') {
        conceptNodes.set(node.id, node);
      }
      if (node?.type === 'aiframe' && node?.data?.frameId) {
        frameNodes.set(node.id, node);
      }
    });

    const frameConcepts = new Map<string, Set<string>>();

    const addConceptToFrame = (frameId: string, conceptNode: any) => {
      if (!conceptNode?.data) return;
      const conceptValue =
        (conceptNode.data.concept ||
          conceptNode.data.title ||
          conceptNode.data.label ||
          '').trim();
      if (!conceptValue) return;
      const set = frameConcepts.get(frameId) ?? new Set<string>();
      set.add(conceptValue);
      frameConcepts.set(frameId, set);
    };

    edges.forEach((edge: any) => {
      const sourceNode = nodesById.get(edge.source);
      const targetNode = nodesById.get(edge.target);
      if (!sourceNode || !targetNode) return;

      if (sourceNode.type === 'concept' && targetNode.type === 'aiframe') {
        const frameId = targetNode.data?.frameId;
        if (frameId) {
          addConceptToFrame(frameId, sourceNode);
        }
      } else if (sourceNode.type === 'aiframe' && targetNode.type === 'concept') {
        const frameId = sourceNode.data?.frameId;
        if (frameId) {
          addConceptToFrame(frameId, targetNode);
        }
      }
    });

    const result = new Map<string, string[]>();
    frameConcepts.forEach((value, key) => {
      result.set(key, Array.from(value));
    });
    return result;
  }, []);

  const syncFramesWithChapters = useCallback((framesToSync: UnifiedAIFrame[], chaptersToSync: UnifiedChapter[], graphStateForSync: GraphState): UnifiedAIFrame[] => {
    if (!chaptersToSync.length) {
      return framesToSync.map((frame) => {
        const conceptIds = frame.conceptIds || [];
        if (frame.chapterId || frame.parentFrameId || conceptIds.length) {
          return { ...frame, chapterId: undefined, parentFrameId: undefined, conceptIds, aiConcepts: frame.aiConcepts };
        }
        return frame;
      });
    }

    const chapterLookup = new Map<string, UnifiedChapter>();
    chaptersToSync.forEach((chapter) => {
      chapter.frameIds.forEach((frameId) => {
        chapterLookup.set(frameId, chapter);
      });
    });

    const frameConceptMap = deriveFrameConceptsFromGraph(framesToSync, graphStateForSync);

    return framesToSync.map((frame) => {
      const assignedChapter = chapterLookup.get(frame.id);
      const hasDerivedConcepts = frameConceptMap.has(frame.id);
      const derivedConcepts = frameConceptMap.get(frame.id) || [];
      const baseConcepts = frame.conceptIds || frame.aiConcepts || [];
      let nextConcepts = baseConcepts;

      if (hasDerivedConcepts) {
        nextConcepts = derivedConcepts;
      }

      const uniqueConcepts = Array.from(new Set(nextConcepts.filter(Boolean)));
      let updatedFrame: UnifiedAIFrame = frame;

      if (assignedChapter) {
        if (frame.chapterId !== assignedChapter.id || frame.parentFrameId !== assignedChapter.id) {
          updatedFrame = {
            ...updatedFrame,
            chapterId: assignedChapter.id,
            parentFrameId: assignedChapter.id,
          };
        }
      } else if (frame.chapterId || frame.parentFrameId) {
        updatedFrame = { ...frame, chapterId: undefined, parentFrameId: undefined };
      }

      if (hasDerivedConcepts) {
        updatedFrame = {
          ...updatedFrame,
          conceptIds: uniqueConcepts,
          aiConcepts: Array.from(new Set([...(updatedFrame.aiConcepts || []), ...uniqueConcepts])),
        };
      } else if (uniqueConcepts.length) {
        updatedFrame = {
          ...updatedFrame,
          conceptIds: uniqueConcepts,
          aiConcepts: Array.from(new Set([...(updatedFrame.aiConcepts || []), ...uniqueConcepts])),
        };
      }

      return updatedFrame;
    });
  }, [deriveFrameConceptsFromGraph]);

  const areChaptersEqual = useCallback((a: UnifiedChapter[], b: UnifiedChapter[]): boolean => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    const serialize = (chaptersToSerialize: UnifiedChapter[]) =>
      chaptersToSerialize
        .map((chapter) => ({
          ...chapter,
          frameIds: [...(chapter.frameIds || [])].sort(),
          conceptIds: [...(chapter.conceptIds || [])].sort(),
        }))
        .sort((c1, c2) => c1.id.localeCompare(c2.id));
    return JSON.stringify(serialize(a)) === JSON.stringify(serialize(b));
  }, []);

  const areFrameChapterAssignmentsEqual = useCallback((a: UnifiedAIFrame[], b: UnifiedAIFrame[]): boolean => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    const serialize = (framesToSerialize: UnifiedAIFrame[]) =>
      framesToSerialize
        .map((frame) => ({
          id: frame.id,
          chapterId: frame.chapterId || null,
          parentFrameId: frame.parentFrameId || null,
          conceptIds: Array.from(new Set(frame.conceptIds || [])).sort().join('|'),
        }))
        .sort((f1, f2) => f1.id.localeCompare(f2.id));
    return JSON.stringify(serialize(a)) === JSON.stringify(serialize(b));
  }, []);

  const queueBackgroundSave = useCallback(async (
    frames: UnifiedAIFrame[],
    chapters: UnifiedChapter[],
    graphState: GraphState,
    options: boolean | { priority?: boolean; skipVectorStore?: boolean } = {}
  ) => {
    const normalizedOptions =
      typeof options === 'boolean'
        ? { priority: options }
        : options || {};
    const priority = normalizedOptions.priority ?? false;
    const skipVectorStore = normalizedOptions.skipVectorStore ?? false;
    const queueOptions = { priority, skipVectorStore };

    const resolveFrames = (candidate: UnifiedAIFrame[] | null | undefined) => {
      if (candidate && candidate.length > 0) return candidate;
      if (framesRef.current && framesRef.current.length > 0) return framesRef.current;
      return candidate || [];
    };

    const ensureFramesNotEmpty = (candidate: UnifiedAIFrame[]) => {
      if (candidate.length === 0 && framesRef.current && framesRef.current.length > 0) {
        return framesRef.current;
      }
      return candidate;
    };

    const resolveChapters = (candidate: UnifiedChapter[] | null | undefined) => {
      if (candidate && candidate.length > 0) return candidate;
      if (chaptersRef.current && chaptersRef.current.length > 0) return chaptersRef.current;
      return candidate || [];
    };

    const safeFrames = resolveFrames(frames);
    const safeChapters = resolveChapters(chapters);
    // CRITICAL FIX: Priority saves (like node drops) lock the queue to prevent overwrites
    if (priority && !backgroundSaveQueue.current.isProcessing) {
      backgroundSaveQueue.current.pendingFrames = safeFrames;
      backgroundSaveQueue.current.pendingChapters = safeChapters;
      backgroundSaveQueue.current.pendingGraphState = graphState;
      backgroundSaveQueue.current.pendingOptions = queueOptions;
      backgroundSaveQueue.current.isProcessing = true; // Lock immediately
      
      console.log("🔒 PRIORITY SAVE: Locked queue with fresh graph state");
      
      // Process immediately without delay for priority saves
      try {
        let framesToSave = ensureFramesNotEmpty(resolveFrames(safeFrames));
        let chaptersToSave = resolveChapters(safeChapters);

        const derivedChapters = deriveChaptersFromGraph(chaptersToSave, framesToSave, graphState);
        if (derivedChapters.length) {
          chaptersToSave = derivedChapters;
        }

        const syncedFrames = syncFramesWithChapters(framesToSave, chaptersToSave, graphState);
        framesToSave = syncedFrames;

        const chaptersChanged = !areChaptersEqual(chaptersRef.current, chaptersToSave);
        const frameAssignmentsChanged = !areFrameChapterAssignmentsEqual(framesRef.current, framesToSave);

        if (chaptersChanged) {
          setChapters(chaptersToSave);
          chaptersRef.current = chaptersToSave;
        }

        if (frameAssignmentsChanged) {
          setFrames(framesToSave);
          framesRef.current = framesToSave;
        }

        const success = await unifiedStorage.saveAll(framesToSave, chaptersToSave, graphState, {
          skipVectorStore,
        });
        console.log("🔒 PRIORITY SAVE: Completed with result:", { success });
        
        if (success) {
          const newHash = generateStateHash(framesToSave, chaptersToSave, graphState);
          lastSaveHash.current = newHash;
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        console.error("❌ Priority save failed:", error);
      } finally {
        backgroundSaveQueue.current.isProcessing = false;
        backgroundSaveQueue.current.pendingOptions = null;
      }
      return;
    }
    
    // Normal save logic - can be overwritten
    if (!backgroundSaveQueue.current.isProcessing) {
      const resolvedFrames = ensureFramesNotEmpty(resolveFrames(safeFrames));
      backgroundSaveQueue.current.pendingFrames = resolvedFrames;
      backgroundSaveQueue.current.pendingChapters = safeChapters;
      backgroundSaveQueue.current.pendingGraphState = graphState;
      backgroundSaveQueue.current.pendingOptions = queueOptions;

      framesRef.current = resolvedFrames;
      if (!chaptersRef.current || chaptersRef.current.length === 0) {
        chaptersRef.current = safeChapters;
      }
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
      const latestFrames = ensureFramesNotEmpty(resolveFrames(backgroundSaveQueue.current.pendingFrames));
      const latestChapters = resolveChapters(backgroundSaveQueue.current.pendingChapters);
      const latestGraphState = backgroundSaveQueue.current.pendingGraphState;
      
      if (latestGraphState && latestFrames && latestChapters) {
        // Clear pending data before save
        backgroundSaveQueue.current.pendingFrames = null;
        backgroundSaveQueue.current.pendingChapters = null;
        backgroundSaveQueue.current.pendingGraphState = null;
        backgroundSaveQueue.current.pendingOptions = null;
        
        // Perform actual save in background
        console.log("🔄 BACKGROUND SAVE: Starting with data:", {
          frameCount: latestFrames.length,
          chapterCount: latestChapters.length,
          nodeCount: latestGraphState.nodes.length,
          edgeCount: latestGraphState.edges?.length || 0,
          frameIds: latestFrames.map(f => f.id),
          edges: latestGraphState.edges?.map(e => ({ id: e.id, source: e.source, target: e.target })) || [],
          timestamp: new Date().toISOString()
        });
        
        let framesToSave = ensureFramesNotEmpty(resolveFrames(latestFrames));
        let chaptersToSave = resolveChapters(latestChapters);

        const derivedChapters = deriveChaptersFromGraph(chaptersToSave, framesToSave, latestGraphState);
        if (derivedChapters.length) {
          chaptersToSave = derivedChapters;
        }

        const syncedFrames = syncFramesWithChapters(framesToSave, chaptersToSave, latestGraphState);
        framesToSave = syncedFrames;

        const chaptersChanged = !areChaptersEqual(chaptersRef.current, chaptersToSave);
        const frameAssignmentsChanged = !areFrameChapterAssignmentsEqual(framesRef.current, framesToSave);

        if (chaptersChanged) {
          setChapters(chaptersToSave);
          chaptersRef.current = chaptersToSave;
        }

        if (frameAssignmentsChanged) {
          setFrames(framesToSave);
          framesRef.current = framesToSave;
        }

        const success = await unifiedStorage.saveAll(framesToSave, chaptersToSave, latestGraphState, {
          skipVectorStore,
        });
        
        console.log("🔄 BACKGROUND SAVE: Completed with result:", {
          success,
          timestamp: new Date().toISOString()
        });
        
        if (success) {
          const newHash = generateStateHash(framesToSave, chaptersToSave, latestGraphState);
          lastSaveHash.current = newHash;
          setHasUnsavedChanges(false);
          
          // BROADCAST: Background save success
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('unified-save-success', {
              detail: {
                frameCount: framesToSave.length,
                chapterCount: chaptersToSave.length,
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
      if (backgroundSaveQueue.current.pendingFrames && backgroundSaveQueue.current.pendingChapters) {
        // Recursively process remaining data
        const frames = backgroundSaveQueue.current.pendingFrames;
        const chapters = backgroundSaveQueue.current.pendingChapters;
        const graphState = backgroundSaveQueue.current.pendingGraphState;
        const pendingOptions = backgroundSaveQueue.current.pendingOptions || {};
        if (frames && chapters && graphState) {
          queueBackgroundSave(frames, chapters, graphState, pendingOptions);
        }
      }
    }
  }, [
    generateStateHash,
    deriveChaptersFromGraph,
    syncFramesWithChapters,
    areChaptersEqual,
    areFrameChapterAssignmentsEqual
  ]);

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

      let framesToSave = currentFrames;
      let chaptersToSave = chaptersRef.current;

      const derivedChapters = deriveChaptersFromGraph(chaptersToSave, framesToSave, currentGraphState);
      if (derivedChapters.length) {
        chaptersToSave = derivedChapters;
      }

      const syncedFrames = syncFramesWithChapters(framesToSave, chaptersToSave, currentGraphState);
      framesToSave = syncedFrames;

      const chaptersChanged = !areChaptersEqual(chaptersRef.current, chaptersToSave);
      const frameAssignmentsChanged = !areFrameChapterAssignmentsEqual(framesRef.current, framesToSave);

      if (chaptersChanged) {
        setChapters(chaptersToSave);
        chaptersRef.current = chaptersToSave;
      }

      if (frameAssignmentsChanged) {
        setFrames(framesToSave);
        framesRef.current = framesToSave;
      }

      const success = await unifiedStorage.saveAll(framesToSave, chaptersToSave, currentGraphState);

      if (success) {
        const newHash = generateStateHash(framesToSave, chaptersToSave, currentGraphState);
        lastSaveHash.current = newHash;
        setHasUnsavedChanges(false);
        console.log("✅ Manual save completed successfully");
        
        // BROADCAST: Save success event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('unified-save-success', {
            detail: {
              frameCount: framesToSave.length,
              chapterCount: chaptersToSave.length,
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
  }, [
    generateStateHash,
    deriveChaptersFromGraph,
    syncFramesWithChapters,
    areChaptersEqual,
    areFrameChapterAssignmentsEqual
  ]);

  // LOAD: Unified load from best available source
  const loadAll = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await unifiedStorage.loadAll();
      
      if (data) {
        // Frame content loaded successfully
        
        setFrames(data.frames);
        framesRef.current = data.frames;
        setChapters(data.chapters || []);
        chaptersRef.current = data.chapters || [];
        
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
        graphStateRef.current = syncedGraphState;
        
        const newHash = generateStateHash(data.frames, data.chapters || [], data.graphState);
        lastSaveHash.current = newHash;
        setHasUnsavedChanges(false);
        
        console.log(`✅ Load completed: ${data.frames.length} frames`);
        
        // BROADCAST: Load success event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('unified-load-success', {
            detail: {
              frameCount: data.frames.length,
              chapterCount: data.chapters?.length || 0,
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
    
    let maxExistingOrder = -Infinity;
    newFrames.forEach(frame => {
      if (typeof frame.order === 'number') {
        maxExistingOrder = Math.max(maxExistingOrder, frame.order);
      }
    });

    let nextOrderValue = maxExistingOrder === -Infinity ? 1 : maxExistingOrder + 1;

    const normalizedFrames = newFrames.map(frame => {
      if (typeof frame.order === 'number') {
        return frame;
      }
      const assignedOrder = nextOrderValue;
      nextOrderValue += 1;
      return {
        ...frame,
        order: assignedOrder,
      };
    });

    // NORMALIZE: Convert to unified format
    const unifiedFrames = normalizedFrames.map(frame => ({
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
    const currentChapters = chaptersRef.current;
    const newHash = generateStateHash(unifiedFrames, currentChapters, graphState);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);

      // BACKGROUND SAVE: Queue non-blocking save (don't await)
      queueBackgroundSave(unifiedFrames, currentChapters, graphState);
    }
  }, [frames, graphState, generateStateHash, queueBackgroundSave]);

  const updateChapters = useCallback((newChapters: Chapter[]) => {
    const normalizedChapters = newChapters.map((chapter, index) => ({
      ...chapter,
      conceptIds: chapter.conceptIds || [],
      frameIds: chapter.frameIds || [],
      order: typeof chapter.order === 'number' ? chapter.order : index,
      createdAt: chapter.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })) as UnifiedChapter[];

    setChapters(normalizedChapters);
    chaptersRef.current = normalizedChapters;

    const currentGraphState = graphStateRef.current;
    let graphStateWithChapterMeta = currentGraphState;
    let graphStateChanged = false;

    if (currentGraphState?.nodes?.length) {
      const nextNodes = currentGraphState.nodes.map((node: any) => {
        if (node?.type !== 'chapter') {
          return node;
        }

        const nodeData = node.data || {};
        const chapterNodeId = nodeData.id || node.id;
        const matchingChapter = normalizedChapters.find((chapter) => chapter.id === chapterNodeId);

        if (!matchingChapter) {
          return node;
        }

        const nextData = {
          ...nodeData,
          id: chapterNodeId,
          title: matchingChapter.title,
          description: matchingChapter.description,
          color: matchingChapter.color || nodeData.color || DEFAULT_CHAPTER_COLOR,
          conceptIds: matchingChapter.conceptIds || [],
          frameIds: matchingChapter.frameIds || [],
          order: matchingChapter.order,
          updatedAt: matchingChapter.updatedAt,
        };

        const existingFrameIds = Array.isArray(nodeData.frameIds) ? nodeData.frameIds : [];
        const existingConceptIds = Array.isArray(nodeData.conceptIds) ? nodeData.conceptIds : [];
        const sameFrameIds =
          existingFrameIds.length === nextData.frameIds.length &&
          existingFrameIds.every((id: string, index: number) => id === nextData.frameIds[index]);
        const sameConceptIds =
          existingConceptIds.length === nextData.conceptIds.length &&
          existingConceptIds.every((id: string, index: number) => id === nextData.conceptIds[index]);

        const hasMetaChange =
          nodeData.title !== nextData.title ||
          nodeData.description !== nextData.description ||
          nodeData.color !== nextData.color ||
          nodeData.order !== nextData.order ||
          !sameFrameIds ||
          !sameConceptIds;

        if (!hasMetaChange) {
          return node;
        }

        graphStateChanged = true;
        return {
          ...node,
          data: nextData,
        };
      });

      if (graphStateChanged) {
        graphStateWithChapterMeta = {
          ...currentGraphState,
          nodes: nextNodes,
        };
        setGraphState(graphStateWithChapterMeta);
        graphStateRef.current = graphStateWithChapterMeta;
      }
    }

    const currentFrames = framesRef.current;
    const graphStateForHash = graphStateWithChapterMeta || graphStateRef.current;
    const newHash = generateStateHash(currentFrames, normalizedChapters, graphStateForHash);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);
      queueBackgroundSave(currentFrames, normalizedChapters, graphStateForHash);
    }
  }, [generateStateHash, queueBackgroundSave]);

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
    const currentChapters = chaptersRef.current;
    const newHash = generateStateHash(frames, currentChapters, deduplicatedState);
    if (newHash !== lastSaveHash.current) {
      setHasUnsavedChanges(true);
      
      // BACKGROUND SAVE: Queue non-blocking save (don't await)
      queueBackgroundSave(frames, currentChapters, deduplicatedState, { skipVectorStore: true });
    }
  }, [frames, generateStateHash, queueBackgroundSave]);

  // CLEANUP: Clear all storage and reset state
  const clearAll = useCallback(async () => {
    console.log('🗑️ Clearing all storage...');
    const previousFrameCount = framesRef.current.length;
    const emptyGraphState: GraphState = { nodes: [], edges: [], selectedNodeId: null };

    setFrames([]);
    setChapters([]);
    setGraphState(emptyGraphState);

    framesRef.current = [];
    chaptersRef.current = [];
    graphStateRef.current = emptyGraphState;

    // Reset any pending background save operations to prevent stale data from persisting
    backgroundSaveQueue.current.isProcessing = false;
    backgroundSaveQueue.current.pendingFrames = null;
    backgroundSaveQueue.current.pendingChapters = null;
    backgroundSaveQueue.current.pendingGraphState = null;
    backgroundSaveQueue.current.pendingOptions = null;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
    }

    // Notify graph-connected components to reset their internal state
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('clear-all-frames', {
        detail: { clearedCount: previousFrameCount }
      }));
    }

    try {
      const saveSucceeded = await unifiedStorage.saveAll([], [], emptyGraphState);

      if (saveSucceeded) {
        const emptyHash = generateStateHash([], [], emptyGraphState);
        lastSaveHash.current = emptyHash;
        setHasUnsavedChanges(false);
      } else {
        setHasUnsavedChanges(true);
        console.warn('⚠️ Failed to persist empty state during clearAll');
      }
    } catch (err) {
      const error = err as Error;
      setError(`Clear failed: ${error.message}`);
      setHasUnsavedChanges(true);
      console.error('❌ Error clearing storage:', error);
    }

    // CLEANUP: Remove old storage keys that might reintroduce stale data
    try {
      await unifiedStorage.cleanup();
      console.log('✅ All storage cleared successfully');
    } catch (err) {
      console.error('❌ Error during storage cleanup:', err);
    }
  }, [generateStateHash]);

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
      queueBackgroundSave(updatedFrames, chaptersRef.current, graphStateRef.current);
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
      queueBackgroundSave(framesRef.current, chaptersRef.current, newGraphState, { skipVectorStore: true });
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
        queueBackgroundSave(framesRef.current, chaptersRef.current, newGraphState, { skipVectorStore: true });
      }
    };
    
    // CRITICAL FIX: Handle attachment operations that require unified save
    const handleAttachmentChangedEvent = (event: any) => {
      const { frameId, attachment, action, freshGraphState } = event.detail;
      
    // Attachment change detected

    // Update frames state to reflect attachment change
    if (action === 'attached' && attachment) {
      const updatedFrames = framesRef.current.map(frame =>
        frame.id === frameId
          ? {
              ...frame,
              attachment,
              updatedAt: new Date().toISOString()
            }
          : frame
      );
      framesRef.current = updatedFrames;
      setFrames(updatedFrames);
    } else if (action === 'detached') {
      const updatedFrames = framesRef.current.map(frame =>
        frame.id === frameId
          ? {
              ...frame,
              attachment: undefined,
              updatedAt: new Date().toISOString()
            }
          : frame
      );
      framesRef.current = updatedFrames;
      setFrames(updatedFrames);
    }

    // CRITICAL FIX: Use fresh graph state from event to prevent stale edge saves
    setHasUnsavedChanges(true);
    const graphStateToSave = freshGraphState || graphStateRef.current;
    queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateToSave);
    };

    // CRITICAL FIX: Handle attachment content updates (note name changes, etc.)
    const handleAttachmentNodeUpdatedEvent = (event: any) => {
      const { frameId, attachment } = event.detail;
      
      // Update the frame's attachment property in unified storage
      const updatedFrames = framesRef.current.map(frame => 
        frame.id === frameId ? { 
          ...frame, 
          attachment: attachment,
          updatedAt: new Date().toISOString() 
        } : frame
      );
      
      framesRef.current = updatedFrames;
      setFrames(updatedFrames);
      
      // OPTIMISTIC: Trigger immediate background save for attachment content changes
      setHasUnsavedChanges(true);
      queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateRef.current);
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
      queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateToUse, isPriorityMode);
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
      queueBackgroundSave(framesRef.current, chaptersRef.current, updatedGraphState, { skipVectorStore: true });
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
      queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateRef.current);
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
      queueBackgroundSave(framesRef.current, chaptersRef.current, newGraphState, { skipVectorStore: true });
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
        queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateRef.current);
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
      queueBackgroundSave(framesRef.current, chaptersRef.current, graphStateRef.current);
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
    chapters,
    graphState,
    isLoading,
    error,
    hasUnsavedChanges,
    
    // Actions
    saveAll,
    loadAll,
    updateFrames,
    updateChapters,
    updateGraphState,
    clearAll,
    
    // Auto-save control
    enableAutoSave,
    disableAutoSave
  };
}; 
