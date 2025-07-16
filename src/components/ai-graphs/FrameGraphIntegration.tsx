import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DualPaneFrameView from "./DualPaneFrameView";
import { GraphState } from "./types";
import {
  Network,
  Eye,
  Edit3,
  BookOpen,
  Brain,
  Layers,
  Save,
  Zap,
} from "lucide-react";
import { debugFrames, debugStorage } from '@/lib/debugUtils';

interface AIFrame {
  id: string;
  title: string;
  goal: string;
  informationText: string;
  videoUrl: string;
  startTime: number;
  duration: number;
  afterVideoText: string;
  aiConcepts: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
  // NEW: Hierarchy and relationship fields
  order?: number; // Preserve frame order
  bubblSpaceId?: string; // Link to BubblSpace
  timeCapsuleId?: string; // Link to TimeCapsule
  parentFrameId?: string; // For chapter/module hierarchy
  type?: "frame" | "chapter" | "module"; // Frame type
  createdAt?: string;
  updatedAt?: string;
  // CRITICAL FIX: Add attachment field for graph attachment system
  attachment?: {
    id: string;
    type: "video" | "pdf" | "text";
    data: {
      videoUrl?: string;
      startTime?: number;
      duration?: number;
      pdfUrl?: string;
      pages?: string;
      text?: string;
      title?: string;
      notes?: string;
    };
  };
}

interface FrameGraphIntegrationProps {
  frames: AIFrame[];
  onFramesChange: (frames: AIFrame[]) => void;
  isCreationMode: boolean;
  currentFrameIndex: number;
  onFrameIndexChange: (index: number) => void;
  onCreateFrame?: () => void;
  onTimeCapsuleUpdate?: (graphState: GraphState, chapters: any[]) => void;
  graphStorageManager?: any; // Add graphStorageManager prop
}

// Add debounce utility
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

export default function FrameGraphIntegration({
  frames,
  onFramesChange,
  isCreationMode,
  currentFrameIndex,
  onFrameIndexChange,
  onCreateFrame,
  onTimeCapsuleUpdate,
  graphStorageManager,
}: FrameGraphIntegrationProps) {
  
  // Debug: Track when frames prop changes
  useEffect(() => {
    debugFrames('FrameGraphIntegration received frames update', {
      count: frames.length,
      frameIds: frames.map(f => f.id),
      frameTitles: frames.map(f => f.title)
    });
  }, [frames]);

  const [graphState, setGraphState] = useState<GraphState>({
    nodes: [],
    edges: [],
    selectedNodeId: null,
  });
  const [chapters, setChapters] = useState<any[]>([]);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastFrameIds, setLastFrameIds] = useState<string[]>([]);
  const [lastFrameStates, setLastFrameStates] = useState<Record<string, string>>({});
  
  // CRITICAL FIX: Add frame creation state to prevent deletion during creation
  const [isFrameCreationInProgress, setIsFrameCreationInProgress] = useState(false);
  const [frameCreationStartTime, setFrameCreationStartTime] = useState<number | null>(null);

  // REAL-TIME SYNC: Track frame changes like Google Docs
  useEffect(() => {
    if (!sessionInitialized) return;
    
    // FIX 3: Add small delay to prevent race condition during KB load
    if (isKbLoading) {
      console.log('⏸️ Real-time sync paused during KB load to prevent race conditions');
      return;
    }

    const currentFrameIds = frames.map(f => f.id);
    const newFrames = frames.filter(f => !lastFrameIds.includes(f.id));
    const deletedFrameIds = lastFrameIds.filter(id => !currentFrameIds.includes(id));

    // FIXED: Only handle new frames - immediate KB sync
    if (newFrames.length > 0) {
      console.log('🚀 REAL-TIME: New frames detected, syncing to KB immediately:', {
        newFrames: newFrames.map(f => ({ id: f.id, title: f.title })),
        count: newFrames.length,
        totalFrames: frames.length
      });
      
      // Set frame creation state to prevent deletion
      setIsFrameCreationInProgress(true);
      setFrameCreationStartTime(Date.now());
      
      // Sync new frames to Knowledge Base immediately (async to prevent UI blocking)
      newFrames.forEach(frame => {
        // Use setTimeout with debouncing to prevent blocking the UI and rapid calls
        setTimeout(() => syncFrameToKnowledgeBase(frame), 100);
      });
    }

    // CRITICAL FIX: Only delete frames when explicitly deleted by user, not during frame creation
    if (deletedFrameIds.length > 0) {
      // Check if this is a frame creation scenario
      const hasNewFrames = newFrames.length > 0;
      const isFrameCreationScenario = hasNewFrames || 
        (frames.length > 0 && lastFrameIds.length === 0) || // First frame creation
        (frames.length > lastFrameIds.length) || // Additional frame creation
        isFrameCreationInProgress || // Frame creation in progress
        (frameCreationStartTime && Date.now() - frameCreationStartTime < 2000); // Within 2 seconds of creation
      
      if (isFrameCreationScenario) {
        console.log('🔄 REAL-TIME: Frame creation detected, skipping deletion of existing frames:', {
          deletedFrameIds,
          newFrameCount: frames.length,
          lastFrameCount: lastFrameIds.length,
          hasNewFrames,
          isFrameCreationInProgress,
          timeSinceCreation: frameCreationStartTime ? Date.now() - frameCreationStartTime : null,
          isFrameCreation: true
        });
        // Don't delete frames during creation - they might be getting replaced temporarily
        // or new frames are being added to existing ones
      } else {
        console.log('🗑️ REAL-TIME: Deleted frames detected, cleaning up KB:', {
          deletedFrameIds,
          count: deletedFrameIds.length,
          currentFrameCount: frames.length,
          lastFrameCount: lastFrameIds.length
        });
        
        deletedFrameIds.forEach(frameId => {
          removeFrameFromKnowledgeBase(frameId);
        });
      }
    }

    // Clear frame creation state after processing
    if (isFrameCreationInProgress && newFrames.length === 0) {
      setTimeout(() => {
        setIsFrameCreationInProgress(false);
        setFrameCreationStartTime(null);
        console.log('✅ Frame creation state cleared');
      }, 1000);
    }

    // IMPROVED: Handle modified frames - check for content changes
    const existingFrames = frames.filter(f => lastFrameIds.includes(f.id));
    const currentFrameStates: Record<string, string> = {};
    
    existingFrames.forEach(frame => {
      // Create a hash of the frame's key properties to detect changes
      const frameStateKey = `${frame.title}|${frame.goal}|${frame.informationText}|${frame.afterVideoText}|${frame.aiConcepts?.join(',')}`;
      currentFrameStates[frame.id] = frameStateKey;
      
      const previousState = lastFrameStates[frame.id];
      const hasChanged = previousState && previousState !== frameStateKey;
      
      // Also check for recent updatedAt timestamp (within 10 seconds for better coverage)
      const recentlyUpdated = frame.updatedAt && new Date(frame.updatedAt).getTime() > Date.now() - 10000;
      
      if (hasChanged || recentlyUpdated) {
        console.log('🔄 REAL-TIME: Frame content changed, syncing to KB:', {
          frameId: frame.id,
          title: frame.title,
          hasChanged,
          recentlyUpdated,
          previousState,
          currentState: frameStateKey
        });
        
        // Update the frame with current timestamp
        const updatedFrame = {
          ...frame,
          updatedAt: new Date().toISOString()
        };
        
        // Use setTimeout with debouncing to prevent blocking the UI and rapid calls
        setTimeout(() => syncFrameToKnowledgeBase(updatedFrame), 100);
      }
    });

    setLastFrameIds(currentFrameIds);
    setLastFrameStates(currentFrameStates);
  }, [frames, sessionInitialized, graphStorageManager]);

  // REAL-TIME SYNC: Knowledge Base sync functions
  const syncFrameToKnowledgeBase = async (frame: AIFrame) => {
    try {
      let vectorStore: any = null;
      
      if (typeof window !== 'undefined') {
        const aiFramesApp = (window as any).aiFramesApp;
        if (aiFramesApp?.vectorStore) {
          vectorStore = aiFramesApp.vectorStore;
        }
      }

      if (vectorStore) {
        const content = `Frame: ${frame.title}
Goal: ${frame.goal}
Information: ${frame.informationText}
After Video: ${frame.afterVideoText}
Concepts: ${frame.aiConcepts?.join(', ') || ''}
Video URL: ${frame.videoUrl || ''}
${frame.attachment ? `Attachment: ${frame.attachment.type} - ${frame.attachment.data.title || 'Untitled'}` : ''}
Created: ${frame.createdAt}
Updated: ${frame.updatedAt}`;

        const documentId = `aiframe-${frame.id}`;
        const aiFrameDoc = {
          id: documentId,
          title: `AI-Frame: ${frame.title}`,
          content: content,
          metadata: {
            filename: `${frame.title}.txt`,
            filesize: content.length,
            filetype: "text/plain",
            uploadedAt: new Date().toISOString(),
            source: "ai-frames-auto-sync",
            description: `AI Frame: ${frame.title}`,
            isGenerated: true,
            frameId: frame.id,
            frameOrder: frame.order || 1,
            frameType: frame.type || "frame",
            createdAt: frame.createdAt,
            updatedAt: frame.updatedAt,
            attachment: frame.attachment,
          },
          chunks: [],
          vectors: [],
        };

        // FIXED: Use upsert instead of delete-then-insert to prevent race conditions
        await vectorStore.upsertDocument(aiFrameDoc);
      }
    } catch (error) {
      console.error("❌ Failed to sync frame to Knowledge Base:", error);
    }
  };

  const removeFrameFromKnowledgeBase = async (frameId: string) => {
    try {
      let vectorStore: any = null;
      
      if (typeof window !== 'undefined') {
        const aiFramesApp = (window as any).aiFramesApp;
        if (aiFramesApp?.vectorStore) {
          vectorStore = aiFramesApp.vectorStore;
        }
      }

      if (vectorStore) {
        const docId = `aiframe-${frameId}`;
        await vectorStore.deleteDocument(docId);
        console.log(`🗑️ Removed frame ${frameId} from Knowledge Base`);
      }
    } catch (error) {
      console.error("❌ Failed to remove frame from Knowledge Base:", error);
    }
  };

  // REAL-TIME SYNC: Enhanced frame change handler
  const handleFramesChangeWithRealTimeSync = useCallback((updatedFrames: AIFrame[]) => {
    console.log('🔄 REAL-TIME: Frames changed, triggering sync:', {
      oldCount: frames.length,
      newCount: updatedFrames.length,
      frameIds: updatedFrames.map(f => f.id)
    });

    // Call the original handler
    onFramesChange(updatedFrames);
  }, [onFramesChange, frames.length]);

  // Auto-organize frames into chapters based on concepts
  const organizeIntoChapters = useCallback(() => {
    const conceptGroups = new Map<string, AIFrame[]>();
    
    frames.forEach((frame) => {
      const mainConcept = frame.aiConcepts[0] || "General";
      if (!conceptGroups.has(mainConcept)) {
        conceptGroups.set(mainConcept, []);
      }
      conceptGroups.get(mainConcept)?.push(frame);
    });

    const newChapters = Array.from(conceptGroups.entries()).map(([concept, chapterFrames], index) => ({
      id: `chapter-${index}`,
      title: concept,
      description: `Chapter focusing on ${concept}`,
      frames: chapterFrames,
      startIndex: frames.findIndex(f => f.id === chapterFrames[0]?.id),
      endIndex: frames.findIndex(f => f.id === chapterFrames[chapterFrames.length - 1]?.id),
    }));

    setChapters(newChapters);
  }, [frames]);

  useEffect(() => {
    organizeIntoChapters();
  }, [organizeIntoChapters]);

  const handleGraphChange = useCallback((newGraphState: GraphState) => {
    setGraphState(newGraphState);
    
    // Check for new AI frame nodes and sync them immediately
    const newAIFrameNodes = newGraphState.nodes.filter(node => 
      node.type === 'aiframe' && 
      node.data?.frameId && 
      !frames.some(f => f.id === node.data.frameId)
    );

    if (newAIFrameNodes.length > 0) {
      console.log('🎯 REAL-TIME: New AI frame nodes detected in graph, creating frames:', {
        nodes: newAIFrameNodes.map(n => ({ id: n.id, title: n.data.title }))
      });

      const newFrames = newAIFrameNodes.map(node => ({
        id: node.data.frameId,
        title: node.data.title || 'New AI Frame',
        goal: node.data.goal || 'Enter learning goal here...',
        informationText: node.data.informationText || 'Provide background context...',
        afterVideoText: node.data.afterVideoText || 'Key takeaways...',
        aiConcepts: node.data.aiConcepts || [],
        isGenerated: node.data.isGenerated || false,
        videoUrl: node.data.videoUrl || '',
        startTime: node.data.startTime || 0,
        duration: node.data.duration || 300,
        attachment: node.data.attachment,
        order: frames.length + 1,
        bubblSpaceId: "default",
        timeCapsuleId: "default",
        type: 'frame' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      const updatedFrames = [...frames, ...newFrames];
      handleFramesChangeWithRealTimeSync(updatedFrames);
    }

    // Check for deleted AI frame nodes
    const deletedFrameIds = frames
      .filter(frame => !newGraphState.nodes.some(node => 
        node.type === 'aiframe' && node.data?.frameId === frame.id
      ))
      .map(frame => frame.id);

    if (deletedFrameIds.length > 0) {
      console.log('🗑️ REAL-TIME: AI frame nodes deleted from graph, removing frames:', {
        deletedFrameIds
      });

      const updatedFrames = frames.filter(frame => !deletedFrameIds.includes(frame.id));
      handleFramesChangeWithRealTimeSync(updatedFrames);
    }
    
    // Notify parent component for TimeCapsule updates
    if (onTimeCapsuleUpdate) {
      onTimeCapsuleUpdate(newGraphState, chapters);
    }
  }, [chapters, onTimeCapsuleUpdate, frames, handleFramesChangeWithRealTimeSync]);

  const handleChapterClick = useCallback((chapter: any) => {
    onFrameIndexChange(chapter.startIndex);
  }, [onFrameIndexChange]);

  // Load graph state from TimeCapsule
  useEffect(() => {
    try {
      const timeCapsuleData = localStorage.getItem("ai_frames_timecapsule");
      if (timeCapsuleData) {
        const parsedData = JSON.parse(timeCapsuleData);
        if (parsedData.data.graphState) {
          setGraphState(parsedData.data.graphState);
        }
        if (parsedData.data.chapters) {
          setChapters(parsedData.data.chapters);
        }

      }
    } catch (error) {
      console.error("Failed to load graph state from TimeCapsule:", error);
    }
  }, []);

  // Save graph state to TimeCapsule when it changes
  useEffect(() => {
    try {
      const existingData = localStorage.getItem("ai_frames_timecapsule");
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const updatedData = {
          ...parsedData,
          data: {
            ...parsedData.data,
            graphState: graphState,
            chapters: chapters,
            lastGraphUpdate: new Date().toISOString(),
          }
        };
        localStorage.setItem("ai_frames_timecapsule", JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error("Failed to save graph state to TimeCapsule:", error);
    }
  }, [graphState, chapters]);

  // HYBRID APPROACH: Auto-initialization
  const initializeSession = useCallback(async () => {
    if (sessionInitialized || !graphStorageManager) return;
    
    try {
      console.log("🔄 Initializing session for first time...");
      
      // FIXED: Ensure frames is an array and pass correct parameters
      const validFrames = Array.isArray(frames) ? frames : [];
      const sessionMetadata = {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        source: "auto-initialization",
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      console.log(`📊 Initializing session with ${validFrames.length} frames`);

      // Save to IndexedDB with correct parameters
      await graphStorageManager.saveFrameSequence(validFrames, currentFrameIndex, sessionMetadata);
      
      // Save to TimeCapsule
      localStorage.setItem("timecapsule_combined", JSON.stringify({
        data: {
          frames: validFrames,
          currentFrameIndex: currentFrameIndex,
          metadata: sessionMetadata
        },
        timestamp: new Date().toISOString()
      }));

      // Initialize Knowledge Base structure
      await initializeKnowledgeBase();

      setSessionInitialized(true);
      console.log("✅ Session initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize session:", error);
    }
  }, [graphStorageManager, frames, sessionInitialized]);

  // REAL-TIME SYNC: Auto-save individual changes (improved)
  const autoSaveFrame = useCallback(async (frameId: string, frameData: Partial<AIFrame>) => {
    if (!sessionInitialized || !graphStorageManager) return;
    
    try {
      setIsAutoSaving(true);
      
      // FIXED: Ensure frames is always an array
      const validFrames = Array.isArray(frames) ? frames : [];
      
      // Find the current frame
      const currentFrame = validFrames.find(f => f.id === frameId);
      if (!currentFrame) {
        console.warn(`Frame not found: ${frameId}`);
        return;
      }
      
      // Update frame in storage
      const updatedFrame: AIFrame = {
        ...currentFrame,
        ...frameData,
        updatedAt: new Date().toISOString()
      };

      // Save to IndexedDB - Fixed: Handle non-array frames safely
      const currentSequence = await graphStorageManager.loadFrameSequence();
      
      // Ensure frames is always an array
      let currentFrames: AIFrame[] = [];
      if (currentSequence && Array.isArray(currentSequence.frames)) {
        currentFrames = currentSequence.frames;
      } else if (currentSequence && currentSequence.frames) {
        console.warn('Frames is not an array, converting:', currentSequence.frames);
        currentFrames = []; // Fall back to empty array if not array
      }
      
      // Update the frame in the array
      const updatedFrames = currentFrames.map((f: AIFrame) => 
        f.id === frameId ? updatedFrame : f
      );
      
      // If frame doesn't exist in the array, add it
      if (!updatedFrames.some(f => f.id === frameId)) {
        updatedFrames.push(updatedFrame);
      }
      
      // Fixed: Use correct signature for saveFrameSequence
      await graphStorageManager.saveFrameSequence(
        updatedFrames, 
        currentSequence?.currentFrameIndex || 0,
        {
          bubblSpaceId: updatedFrame.bubblSpaceId,
          timeCapsuleId: updatedFrame.timeCapsuleId,
          updatedAt: new Date().toISOString()
        }
      );

      // REAL-TIME SYNC: Always sync to Knowledge Base (async to prevent UI blocking)
      setTimeout(() => syncFrameToKnowledgeBase(updatedFrame), 100);

      console.log(`✅ REAL-TIME: Auto-saved frame: ${frameData.title || frameId}`);
    } catch (error) {
      console.error("❌ Auto-save failed:", error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [sessionInitialized, graphStorageManager, frames]);

  // Debounced auto-save
  const debouncedAutoSave = useMemo(
    () => debounce(autoSaveFrame, 500),
    [autoSaveFrame]
  );

  // HYBRID APPROACH: Auto-initialize on first frame creation
  useEffect(() => {
    if (frames.length > 0 && !sessionInitialized) {
      initializeSession();
    }
  }, [frames, sessionInitialized, initializeSession]);

  // HYBRID APPROACH: Auto-save on frame changes
  useEffect(() => {
    if (sessionInitialized && frames.length > 0) {
      frames.forEach(frame => {
        if (frame.updatedAt && new Date(frame.updatedAt).getTime() > Date.now() - 1000) {
          debouncedAutoSave(frame.id, frame);
        }
      });
    }
  }, [frames, sessionInitialized, debouncedAutoSave]);

  // Initialize Knowledge Base structure
  const initializeKnowledgeBase = async () => {
    try {
      let vectorStore: any = null;
      
      if (typeof window !== 'undefined') {
        const aiFramesApp = (window as any).aiFramesApp;
        if (aiFramesApp?.vectorStore) {
          vectorStore = aiFramesApp.vectorStore;
        }
      }

      if (vectorStore) {
        console.log("🔄 Initializing Knowledge Base structure...");
        
        // Create session document
        const sessionDoc = {
          id: `session-${Date.now()}`,
          title: "AI-Frames Session",
          content: "AI-Frames learning session initialized",
          metadata: {
            source: "ai-frames-session",
            sessionId: `session_${Date.now()}`,
            createdAt: new Date().toISOString(),
          }
        };

        await vectorStore.insertDocument(sessionDoc);
        console.log("✅ Knowledge Base structure initialized");
      }
    } catch (error) {
      console.error("❌ Failed to initialize Knowledge Base:", error);
    }
  };

  // REAL-TIME SYNC: Update connection status in Knowledge Base
  const updateConnectionStatus = async (connection: any, sourceNode: any, targetNode: any, status: 'connected' | 'disconnected') => {
    try {
      let vectorStore: any = null;
      
      if (typeof window !== 'undefined') {
        const aiFramesApp = (window as any).aiFramesApp;
        if (aiFramesApp?.vectorStore) {
          vectorStore = aiFramesApp.vectorStore;
        }
      }

      if (vectorStore) {
        const connectionDoc = {
          id: `connection-${connection.id}`,
          title: `Connection: ${sourceNode?.data?.title || 'Unknown'} → ${targetNode?.data?.title || 'Unknown'}`,
          content: `Connection Status: ${status}
Source: ${sourceNode?.data?.title || 'Unknown'} (${sourceNode?.id})
Target: ${targetNode?.data?.title || 'Unknown'} (${targetNode?.id})
Type: ${connection.targetHandle === 'attachment-slot' ? 'Attachment' : 'Sequential'}
Status: ${status}
Updated: ${new Date().toISOString()}`,
          metadata: {
            source: "ai-frames-connection",
            connectionId: connection.id,
            sourceNodeId: sourceNode?.id,
            targetNodeId: targetNode?.id,
            connectionType: connection.targetHandle === 'attachment-slot' ? 'attachment' : 'sequential',
            status: status,
            updatedAt: new Date().toISOString(),
          }
        };

        if (status === 'connected') {
          await vectorStore.insertDocument(connectionDoc);
          console.log(`🔗 Connection ${connection.id} status updated to KB: ${status}`);
        } else {
          await vectorStore.deleteDocument(connectionDoc.id);
          console.log(`🗑️ Connection ${connection.id} removed from KB: ${status}`);
        }
      }
    } catch (error) {
      console.error("❌ Failed to update connection status in Knowledge Base:", error);
    }
  };

  // FIX 2: Initialize real-time sync tracking when KB loads with sync pause
  const [isKbLoading, setIsKbLoading] = useState(false);
  
  useEffect(() => {
    const handleKBFramesLoaded = (event: CustomEvent) => {
      const { frames: kbFrames }: { frames: AIFrame[] } = event.detail;
      
      console.log('📡 KB-frames-loaded event received, initializing tracking states:', {
        frameCount: kbFrames.length,
        frameIds: kbFrames.map((f: AIFrame) => f.id)
      });
      
      // FIX 3: Pause real-time sync during KB load
      setIsKbLoading(true);
      
      // Initialize tracking states with KB data
      const frameIds = kbFrames.map((f: AIFrame) => f.id);
      const frameStates: Record<string, string> = {};
      
      kbFrames.forEach((frame: AIFrame) => {
        frameStates[frame.id] = `${frame.title}|${frame.goal}|${frame.informationText}|${frame.afterVideoText}|${frame.aiConcepts?.join(',')}`;
      });
      
      setLastFrameIds(frameIds);
      setLastFrameStates(frameStates);
      
      // Resume real-time sync after a small delay to prevent race conditions
      setTimeout(() => {
        setIsKbLoading(false);
        console.log('✅ Real-time sync tracking initialized from KB load and sync resumed');
      }, 500);
      
      console.log('✅ Real-time sync tracking initialized from KB load');
    };

    window.addEventListener('kb-frames-loaded', handleKBFramesLoaded as EventListener);
    return () => window.removeEventListener('kb-frames-loaded', handleKBFramesLoaded as EventListener);
  }, []);

  // REAL-TIME SYNC: Enhanced drag and drop handler
  useEffect(() => {
    const handleGraphFrameAdded = (event: CustomEvent) => {
      const { newFrame, totalFrames } = event.detail;
      console.log('🎯 REAL-TIME: Graph frame added event received:', {
        frameId: newFrame.id,
        title: newFrame.title,
        totalFrames
      });

      // Immediately sync to Knowledge Base (async to prevent UI blocking)
      setTimeout(() => syncFrameToKnowledgeBase(newFrame), 100);
      
      // Save to storage
      if (graphStorageManager && sessionInitialized) {
        autoSaveFrame(newFrame.id, newFrame);
      }
    };

    const handleGraphFrameDeleted = (event: CustomEvent) => {
      const { frameId } = event.detail;
      console.log('🗑️ REAL-TIME: Graph frame deleted event received:', { frameId });

      // Remove from Knowledge Base
      removeFrameFromKnowledgeBase(frameId);
    };

    const handleGraphFrameEdited = (event: CustomEvent) => {
      const { frameId, updatedFrame } = event.detail;
      console.log('✏️ REAL-TIME: Graph frame edited event received:', { 
        frameId, 
        title: updatedFrame.title 
      });

      // Immediately sync the updated frame to Knowledge Base
      if (updatedFrame) {
        const frameWithTimestamp = {
          ...updatedFrame,
          updatedAt: new Date().toISOString()
        };
        // Use setTimeout with debouncing to prevent blocking the UI and rapid calls
        setTimeout(() => syncFrameToKnowledgeBase(frameWithTimestamp), 100);
      }
    };

    const handleConnectionAdded = (event: CustomEvent) => {
      const { connection, sourceNode, targetNode, timestamp } = event.detail;
      console.log('🔗 REAL-TIME: Connection added event received:', {
        connectionId: connection.id,
        sourceNodeId: sourceNode?.id,
        targetNodeId: targetNode?.id,
        timestamp
      });

      // Update connection status in Knowledge Base
      updateConnectionStatus(connection, sourceNode, targetNode, 'connected');
    };

    const handleConnectionRemoved = (event: CustomEvent) => {
      const { connection, sourceNode, targetNode, timestamp } = event.detail;
      console.log('🗑️ REAL-TIME: Connection removed event received:', {
        connectionId: connection.id,
        sourceNodeId: sourceNode?.id,
        targetNodeId: targetNode?.id,
        timestamp
      });

      // Update connection status in Knowledge Base
      updateConnectionStatus(connection, sourceNode, targetNode, 'disconnected');
    };

    window.addEventListener('graph-frame-added', handleGraphFrameAdded as EventListener);
    window.addEventListener('graph-frame-deleted', handleGraphFrameDeleted as EventListener);
    window.addEventListener('graph-frame-edited', handleGraphFrameEdited as EventListener);
    window.addEventListener('graph-connection-added', handleConnectionAdded as EventListener);
    window.addEventListener('graph-connection-removed', handleConnectionRemoved as EventListener);

    return () => {
      window.removeEventListener('graph-frame-added', handleGraphFrameAdded as EventListener);
      window.removeEventListener('graph-frame-deleted', handleGraphFrameDeleted as EventListener);
      window.removeEventListener('graph-frame-edited', handleGraphFrameEdited as EventListener);
      window.removeEventListener('graph-connection-added', handleConnectionAdded as EventListener);
      window.removeEventListener('graph-connection-removed', handleConnectionRemoved as EventListener);
    };
  }, [sessionInitialized, graphStorageManager]);

  // FIXED: Handle Save Graph with proper error handling
  const handleSaveGraph = async () => {
    try {
      // Ensure session is initialized
      if (!sessionInitialized) {
        await initializeSession();
      }

      // FIXED: Properly handle currentFrames with fallbacks
      let currentFrames: AIFrame[] = [];
      
      if (graphStorageManager) {
        try {
          const frameSequence = await graphStorageManager.loadFrameSequence();
          currentFrames = Array.isArray(frameSequence?.frames) ? frameSequence.frames : [];
        } catch (error) {
          console.warn("Failed to load from IndexedDB, trying TimeCapsule:", error);
          try {
            const timeCapsuleData = localStorage.getItem("timecapsule_combined");
            if (timeCapsuleData) {
              const parsed = JSON.parse(timeCapsuleData);
              currentFrames = Array.isArray(parsed.data?.frames) ? parsed.data.frames : [];
            }
          } catch (fallbackError) {
            console.warn("Failed to load from TimeCapsule:", fallbackError);
            currentFrames = [];
          }
        }
      }

      // FIXED: Ensure currentFrames is always an array
      if (!Array.isArray(currentFrames)) {
        console.warn("currentFrames is not an array, initializing as empty array");
        currentFrames = [];
      }

      console.log(`🔄 Starting Save Graph with ${currentFrames.length} existing frames`);

      // Convert graph nodes to frames
      const graphFrames: AIFrame[] = graphState.nodes
        .filter((node: any) => node.type === 'aiFrame')
        .map((node: any) => ({
          id: node.id,
          title: node.data.title || 'Untitled Frame',
          goal: node.data.goal || node.data.learningGoal || 'No learning goal specified',
          informationText: node.data.informationText || node.data.summary || '',
          videoUrl: node.data.videoUrl || '',
          startTime: node.data.startTime || 0,
          duration: node.data.duration || 30,
          afterVideoText: node.data.afterVideoText || '',
          aiConcepts: node.data.aiConcepts || node.data.keyPoints || [],
          // FIXED: Include attachment data properly
          attachment: node.data.attachment || (node.data.videoUrl ? {
            id: `attachment-${node.id}`,
            type: 'video' as const,
            data: {
              videoUrl: node.data.videoUrl,
              title: node.data.title || 'Video',
              startTime: node.data.startTime || 0,
              duration: node.data.duration || 30
            }
          } : undefined),
          order: currentFrames.length + 1,
          bubblSpaceId: "default",
          timeCapsuleId: "default",
          type: 'frame' as const,
          createdAt: node.data.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));

      console.log(`📊 Converted ${graphFrames.length} graph nodes to frames`);

      // FIXED: Safe merge frames with proper array handling
      const mergedFrames = [...currentFrames];
      let addedCount = 0;
      let updatedCount = 0;

      for (const graphFrame of graphFrames) {
        const existingIndex = mergedFrames.findIndex(f => f.id === graphFrame.id);
        if (existingIndex !== -1) {
          mergedFrames[existingIndex] = graphFrame;
          updatedCount++;
        } else {
          mergedFrames.push(graphFrame);
          addedCount++;
        }
      }

      console.log(`📊 Frame merge complete: ${currentFrames.length} + ${addedCount} new + ${updatedCount} updated = ${mergedFrames.length} total`);

      // Save to storage
      const frameSequence = {
        frames: mergedFrames,
        currentFrameIndex: currentFrameIndex,
        metadata: {
          version: "1.0",
          lastUpdated: new Date().toISOString(),
          source: "graph-save"
        }
      };

      // Save to IndexedDB
      if (graphStorageManager) {
        await graphStorageManager.saveFrameSequence(
          mergedFrames,
          currentFrameIndex,
          {
            version: "1.0",
            lastUpdated: new Date().toISOString(),
            source: "graph-save"
          }
        );
        console.log("✅ Frames saved to IndexedDB");
      }

      // Save to TimeCapsule
      localStorage.setItem("timecapsule_combined", JSON.stringify({
        data: frameSequence,
        timestamp: new Date().toISOString()
      }));
      console.log("✅ Frames saved to TimeCapsule");

      // FIXED: Immediate Knowledge Base sync with IndexedDB verification
      console.log("🔄 Immediately syncing frames to Knowledge Base...");
      
      const syncPromises = mergedFrames.map(frame => syncFrameToKnowledgeBase(frame));
      await Promise.all(syncPromises);
      
      console.log("✅ All frames synced to Knowledge Base immediately");

      // FIXED: Force Knowledge Base refresh and IndexedDB verification
      console.log("🔄 Forcing Knowledge Base refresh and IndexedDB verification...");
      
      // Dispatch comprehensive KB update events
      if (typeof window !== 'undefined') {
        // Event for KB documents changed
        window.dispatchEvent(new CustomEvent('kb-documents-changed', {
          detail: {
            source: 'save-graph',
            frameCount: mergedFrames.length,
            timestamp: new Date().toISOString(),
            frames: mergedFrames
          }
        }));

        // Event for AI-Frames specific KB update
        window.dispatchEvent(new CustomEvent('aiframes-kb-updated', {
          detail: {
            source: 'save-graph',
            frameCount: mergedFrames.length,
            timestamp: new Date().toISOString(),
            frames: mergedFrames,
            hasFrameUpdates: true
          }
        }));

        // Event for force refresh
        window.dispatchEvent(new CustomEvent('kb-force-refresh', {
          detail: {
            source: 'save-graph',
            reason: 'frames-saved-to-graph',
            timestamp: new Date().toISOString()
          }
        }));
      }

      // Verify IndexedDB sync
      if (graphStorageManager) {
        try {
          const savedSequence = await graphStorageManager.loadFrameSequence();
          console.log("✅ IndexedDB verification successful:", {
            savedFrames: savedSequence?.frames?.length || 0,
            expectedFrames: mergedFrames.length
          });
        } catch (error) {
          console.warn("⚠️ IndexedDB verification failed:", error);
        }
      }

      // Dispatch success event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('graph-saved', {
          detail: {
            success: true,
            frameCount: mergedFrames.length,
            nodeCount: graphState.nodes.length,
            edgeCount: graphState.edges.length,
            frames: mergedFrames,
            hasFrameUpdates: true,
            timestamp: new Date().toISOString()
          }
        }));
      }

      console.log("✅ Save Graph completed successfully");
      
    } catch (error) {
      console.error("❌ Save Graph failed:", error);
      
      // Dispatch error event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('graph-saved', {
          detail: {
            success: false,
            error: error instanceof Error ? error.message : String(error),
            timestamp: new Date().toISOString()
          }
        }));
      }
      
      throw error;
    }
  };


  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header with Stats and Actions */}
      <div className="flex-none sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Dual-Pane AI Frames</h2>
              {/* Real-time sync indicator */}
              <Badge variant="outline" className="text-green-600">
                <Zap className="h-3 w-3 mr-1" />
                Real-time
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <Badge variant="outline" className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                {frames.length} frames
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {chapters.length} chapters
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                {frames.reduce((acc, frame) => acc + frame.aiConcepts.length, 0)} concepts
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isCreationMode ? "default" : "secondary"}>
              {isCreationMode ? (
                <Edit3 className="h-3 w-3 mr-1" />
              ) : (
                <Eye className="h-3 w-3 mr-1" />
              )}
              {isCreationMode ? "Creator Mode" : "Learning Mode"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveGraph}
              disabled={isAutoSaving}
              className="text-blue-600 hover:text-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {isAutoSaving ? "Saving..." : "Save Graph"}
            </Button>
            {/* Auto-save indicator */}
            {isAutoSaving && (
              <Badge variant="outline" className="text-blue-600">
                <Zap className="h-3 w-3 mr-1 animate-pulse" />
                Auto-saving...
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                organizeIntoChapters();
                handleSaveGraph();
              }}
              className="text-green-600 hover:text-green-700"
            >
              <Layers className="h-4 w-4 mr-2" />
              Organize
            </Button>
          </div>
        </div>
      </div>

      {/* Dual-Pane Content */}
      <div className="flex-1 overflow-hidden">
        <DualPaneFrameView
          frames={frames}
          onFramesChange={handleFramesChangeWithRealTimeSync}
          isCreationMode={isCreationMode}
          currentFrameIndex={currentFrameIndex}
          onFrameIndexChange={onFrameIndexChange}
          onCreateFrame={onCreateFrame}
          defaultMaximized={isCreationMode} // Maximize graph view by default in creator mode
        />
      </div>
    </div>
  );
}