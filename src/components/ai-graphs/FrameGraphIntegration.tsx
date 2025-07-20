import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
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
// import { debugFrames, debugStorage } from '@/lib/debugUtils'; // Disabled to prevent spam

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
  // DYNAMIC: Add attachment field for graph attachment system (future-proof)
  attachment?: {
    id: string;
    type: string; // DYNAMIC: Support any attachment type (video, pdf, text, audio, AR, VR, etc.)
    data: Record<string, any>; // DYNAMIC: Support any properties without hardcoding
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
  initialGraphState?: GraphState; // CRITICAL FIX: Add initialGraphState prop to restore standalone attachments
  onGraphChange?: (graphState: GraphState) => void; // CRITICAL FIX: Add graph state change callback
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
  initialGraphState,
  onGraphChange,
}: FrameGraphIntegrationProps) {
  
  // Debug: Track when frames prop changes (DISABLED to prevent spam)
  // useEffect(() => {
  //   debugFrames('FrameGraphIntegration received frames update', {
  //     count: frames.length,
  //     frameIds: frames.map(f => f.id),
  //     frameTitles: frames.map(f => f.title)
  //   });
  // }, [frames]);

  const [graphState, setGraphState] = useState<GraphState>(
    initialGraphState || {
      nodes: [],
      edges: [],
      selectedNodeId: null,
    }
  );
  const [chapters, setChapters] = useState<any[]>([]);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const initializingRef = useRef(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastFrameIds, setLastFrameIds] = useState<string[]>([]);

  // CRITICAL FIX: Update graphState when initialGraphState changes (for restoration after refresh)
  useEffect(() => {
    if (initialGraphState && initialGraphState.nodes && initialGraphState.nodes.length > 0) {
      // Updating graphState from initialGraphState
      setGraphState(initialGraphState);
      setCurrentGraphStateRef(initialGraphState);
    }
  }, [initialGraphState]);
  const [lastFrameStates, setLastFrameStates] = useState<Record<string, string>>({});
  
  // CRITICAL FIX: Add frame creation state to prevent deletion during creation
  const [isFrameCreationInProgress, setIsFrameCreationInProgress] = useState(false);
  const [frameCreationStartTime, setFrameCreationStartTime] = useState<number | null>(null);

  // REAL-TIME SYNC: Track frame changes like Google Docs (DISABLED to prevent spam)
  // useEffect(() => {
  //   if (!sessionInitialized) return;
  //   
  //   // FIX 3: Add small delay to prevent race condition during KB load
  //   if (isKbLoading) {
  //     
  //     return;
  //   }

  //   const currentFrameIds = frames.map(f => f.id);
  //   const newFrames = frames.filter(f => !lastFrameIds.includes(f.id));
  //   const deletedFrameIds = lastFrameIds.filter(id => !currentFrameIds.includes(id));

  //   // FIXED: Only handle new frames - immediate KB sync
  //   if (newFrames.length > 0) {
  //     console.log('🚀 REAL-TIME: New frames detected, syncing to KB immediately:', {
  //       newFrames: newFrames.map(f => ({ id: f.id, title: f.title })),
  //       count: newFrames.length,
  //       totalFrames: frames.length
  //     });
  //     
  //     // Set frame creation state to prevent deletion
  //     setIsFrameCreationInProgress(true);
  //     setFrameCreationStartTime(Date.now());
  //     
  //     // Sync new frames to Knowledge Base immediately (async to prevent UI blocking)
  //     newFrames.forEach(frame => {
  //       // Use setTimeout with debouncing to prevent blocking the UI and rapid calls
  //       setTimeout(() => syncFrameToKnowledgeBase(frame), 100);
  //     });
  //   }

  //   // CRITICAL FIX: Only delete frames when explicitly deleted by user, not during frame creation
  //   if (deletedFrameIds.length > 0) {
  //     // Check if this is a frame creation scenario
  //     const hasNewFrames = newFrames.length > 0;
  //     const isFrameCreationScenario = hasNewFrames || 
  //       (frames.length > 0 && lastFrameIds.length === 0) || // First frame creation
  //       (frames.length > lastFrameIds.length) || // Additional frame creation
  //       isFrameCreationInProgress || // Frame creation in progress
  //       (frameCreationStartTime && Date.now() - frameCreationStartTime < 2000); // Within 2 seconds of creation
  //     
  //     if (isFrameCreationScenario) {
  //       console.log('🔄 REAL-TIME: Frame creation detected, skipping deletion of existing frames:', {
  //         deletedFrameIds,
  //         newFrameCount: frames.length,
  //         lastFrameCount: lastFrameIds.length,
  //         hasNewFrames,
  //         isFrameCreationInProgress,
  //         timeSinceCreation: frameCreationStartTime ? Date.now() - frameCreationStartTime : null,
  //         isFrameCreation: true
  //       });
  //       // Don't delete frames during creation - they might be getting replaced temporarily
  //       // or new frames are being added to existing ones
  //     } else {
  //       console.log('🗑️ REAL-TIME: Deleted frames detected, cleaning up KB:', {
  //         deletedFrameIds,
  //         count: deletedFrameIds.length,
  //         currentFrameCount: frames.length,
  //         lastFrameCount: lastFrameIds.length
  //       });
  //       
  //       deletedFrameIds.forEach(frameId => {
  //         removeFrameFromKnowledgeBase(frameId);
  //       });
  //     }
  //   }

  //   // Clear frame creation state after processing
  //   if (isFrameCreationInProgress && newFrames.length === 0) {
  //     setTimeout(() => {
  //       setIsFrameCreationInProgress(false);
  //       setFrameCreationStartTime(null);
  //       
  //     }, 1000);
  //   }

  //   // IMPROVED: Handle modified frames - check for content changes
  //   const existingFrames = frames.filter(f => lastFrameIds.includes(f.id));
  //   const currentFrameStates: Record<string, string> = {};
  //   
  //   existingFrames.forEach(frame => {
  //     // Create a hash of the frame's key properties to detect changes
  //     const frameStateKey = `${frame.title}|${frame.goal}|${frame.informationText}|${frame.afterVideoText}|${frame.aiConcepts?.join(',')}`;
  //     currentFrameStates[frame.id] = frameStateKey;
  //     
  //     const previousState = lastFrameStates[frame.id];
  //     const hasChanged = previousState && previousState !== frameStateKey;
  //     
  //     // Also check for recent updatedAt timestamp (within 10 seconds for better coverage)
  //     const recentlyUpdated = frame.updatedAt && new Date(frame.updatedAt).getTime() > Date.now() - 10000;
  //     
  //     if (hasChanged || recentlyUpdated) {
  //       console.log('🔄 REAL-TIME: Frame content changed, syncing to KB:', {
  //         frameId: frame.id,
  //         title: frame.title,
  //         hasChanged,
  //         recentlyUpdated,
  //         previousState,
  //         currentState: frameStateKey
  //       });
  //       
  //       // Update the frame with current timestamp
  //       const updatedFrame = {
  //         ...frame,
  //         updatedAt: new Date().toISOString()
  //       };
  //       
  //       // ENHANCED: Use longer delay and improved coordination to prevent RxDB conflicts
  //       // Delay by 500ms to ensure main page component sync completes first
  //       setTimeout(() => {
  //         // ENHANCED: Check if another sync is in progress with timeout detection
  //         if (typeof window !== 'undefined') {
  //           const aiFramesApp = (window as any).aiFramesApp;
  //           if (aiFramesApp?.syncInProgress) {
  //             console.log('⏳ Main page sync in progress, skipping FrameGraphIntegration sync:', {
  //               frameId: frame.id,
  //               frameTitle: frame.title,
  //               syncSource: aiFramesApp.syncSource,
  //               syncStartTime: aiFramesApp.syncStartTime,
  //               syncDuration: aiFramesApp.syncStartTime ? Date.now() - aiFramesApp.syncStartTime : 0
  //             });
  //             
  //             // ENHANCED: Check if sync is stuck (more than 10 seconds)
  //             if (aiFramesApp.syncStartTime && (Date.now() - aiFramesApp.syncStartTime) > 10000) {
  //               console.warn('⚠️ Sync appears stuck, proceeding with FrameGraphIntegration sync anyway');
  //             } else {
  //               return;
  //             }
  //           }
  //         }
  //         
  //         console.log('🔄 FrameGraphIntegration proceeding with sync:', {
  //           frameId: frame.id,
  //           frameTitle: frame.title,
  //           delay: '500ms'
  //         });
  //         
  //         syncFrameToKnowledgeBase(updatedFrame);
  //       }, 500);
  //     }
  //   });

  //   setLastFrameIds(currentFrameIds);
  //   setLastFrameStates(currentFrameStates);
  // }, [frames, sessionInitialized, graphStorageManager]);

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
        // Enhanced content with proper attachment handling
        const frameWithAttachment = frame as any;
        
        
        const content = `
Learning Goal: ${frame.goal}

Order: ${frame.order || 1}
Type: ${frame.type || "frame"}
BubblSpace: ${frame.bubblSpaceId || "default"}
TimeCapsule: ${frame.timeCapsuleId || "default"}

Context & Background:
${frame.informationText}

After Video Content:
${frame.afterVideoText || "No additional content"}

AI Concepts: ${frame.aiConcepts ? frame.aiConcepts.join(", ") : "None"}

ATTACHMENTS & MEDIA:
Video Attachment:
- URL: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl || "No video attachment"}
- Start Time: ${frame.startTime || frameWithAttachment.attachment?.data?.startTime || 0}s
- Duration: ${frame.duration || frameWithAttachment.attachment?.data?.duration || 0}s
- Type: ${frame.videoUrl || frameWithAttachment.attachment?.data?.videoUrl ? "YouTube Video" : "No video"}

${frameWithAttachment.attachment?.type === 'pdf' ? `
PDF Attachment:
- URL: ${frameWithAttachment.attachment.data?.pdfUrl || "No PDF URL"}
- Pages: ${frameWithAttachment.attachment.data?.pages || "All pages"}
- Title: ${frameWithAttachment.attachment.data?.title || "PDF Document"}
- Notes: ${frameWithAttachment.attachment.data?.notes || "No notes"}
` : ""}${frameWithAttachment.attachment?.type === 'text' ? `
Text Attachment:
- Content: ${frameWithAttachment.attachment.data?.text || "No text content"}
- Title: ${frameWithAttachment.attachment.data?.title || "Text Content"}
- Notes: ${frameWithAttachment.attachment.data?.notes || "No notes"}
` : ""}${frameWithAttachment.attachment && !['pdf', 'text', 'video'].includes(frameWithAttachment.attachment.type) ? `
Additional Attachment:
- Type: ${frameWithAttachment.attachment.type || "Unknown"}
- Name: ${frameWithAttachment.attachment.name || "Unnamed"}
- Data: ${frameWithAttachment.attachment.data ? "Available" : "No data"}
` : frameWithAttachment.attachment ? "" : "Additional Attachments: None"}

Metadata:
- Generated: ${frame.isGenerated ? "Yes" : "No"}
- Created: ${frame.createdAt || "Unknown"}
- Updated: ${frame.updatedAt || "Unknown"}
- Attachment Count: ${frameWithAttachment.attachment ? 1 : 0}
- Has Video: ${frame.videoUrl ? "Yes" : "No"}
        `.trim();
        
        // DEBUG: Log the text content in the KB content string (DISABLED to prevent spam)
        // if (frameWithAttachment.attachment?.type === 'text') {
        //   const textAttachmentMatch = content.match(/Text Attachment:\n- Content: ([^\n]+)/i);
        //   console.log('📝 CRITICAL TEXT DEBUG - Text in KB content string:', {
        //     frameId: frame.id,
        //     textInContentString: textAttachmentMatch ? textAttachmentMatch[1] : 'NOT FOUND',
        //     contentPreview: content.substring(content.indexOf('Text Attachment:'), content.indexOf('Text Attachment:') + 200),
        //     isTextInContent: content.includes(frameWithAttachment.attachment.data?.text || ''),
        //     source: 'kb-content-creation'
        //   });
        // }

        const documentId = `aiframe-${frame.id}`;
        const aiFrameDoc = {
          id: documentId,
          title: `AI-Frame [${frame.order || 1}]: ${frame.title}`,
          content: content,
          metadata: {
            filename: `aiframe-${frame.id}.json`,
            filesize: JSON.stringify(frame).length,
            filetype: "application/json",
            uploadedAt: frame.createdAt || new Date().toISOString(),
            source: "ai-frames-auto-sync",
            description: `AI-Frame: ${frame.title} (Order: ${frame.order || 1})`,
            isGenerated: true,
            aiFrameId: frame.id,
            aiFrameType: frame.type || "frame",
            aiFrameOrder: frame.order || 1,
            frameId: frame.id,
            frameOrder: frame.order || 1,
            frameType: frame.type || "frame",
            createdAt: frame.createdAt,
            updatedAt: frame.updatedAt || new Date().toISOString(),
            // CRITICAL: Save complete attachment data for persistence
            attachment: frameWithAttachment.attachment,
          },
          chunks: [],
          vectors: [],
        };

        // ENHANCED: Use upsert with comprehensive error handling to prevent race conditions
        await vectorStore.upsertDocument(aiFrameDoc);
        console.log("✅ Frame synced to Knowledge Base successfully:", {
          frameId: frame.id,
          frameTitle: frame.title,
          documentId,
          source: 'FrameGraphIntegration'
        });
      }
    } catch (error) {
      // CRITICAL FIX: Don't let VectorStore failures break frame creation!
      const errorObj = error as any;
      console.error("❌ CRITICAL: Frame VectorStore upsert failed - frame data may be lost!", {
        frameId: frame.id,
        frameTitle: frame.title,
        errorCode: errorObj.code,
        errorName: errorObj.name,
        errorMessage: errorObj.message,
        source: 'FrameGraphIntegration-upsert-failure'
      });
      
      // SPECS COMPLIANT: Trigger force save to unified storage as fallback
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('force-save-frames', {
          detail: {
            reason: 'vectorstore-upsert-failed',
            frameId: frame.id,
            frameTitle: frame.title,
            fallbackRequired: true
          }
        }));
        console.log("🔄 FALLBACK: Triggered force-save-frames due to VectorStore failure");
      }
      
      // ENHANCED: Handle RxDB conflicts gracefully with detailed logging (existing logic)
      if (errorObj.code === 'CONFLICT' || errorObj.message?.includes('CONFLICT') || errorObj.name === 'RxError') {
        console.warn("⚠️ RxDB conflict detected in FrameGraphIntegration, skipping sync:", {
          frameId: frame.id,
          frameTitle: frame.title,
          errorCode: errorObj.code,
          errorName: errorObj.name,
          errorMessage: errorObj.message
        });
        // 
          return; // Gracefully skip this sync attempt
        }
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
        // 
      }
    } catch (error) {
      console.error("❌ Failed to remove frame from Knowledge Base:", error);
    }
  };

  // REAL-TIME SYNC: Enhanced frame change handler
  const handleFramesChangeWithRealTimeSync = useCallback((updatedFrames: AIFrame[]) => {
    // console.log('🔄 REAL-TIME: Frames changed, triggering sync:', {
    //   oldCount: frames.length,
    //   newCount: updatedFrames.length,
    //   frameIds: updatedFrames.map(f => f.id)
    // });

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
  }, [frames]); // CRITICAL FIX: Depend on frames directly instead of organizeIntoChapters to prevent infinite loop

  const handleGraphChange = useCallback((newGraphState: GraphState) => {
    setGraphState(newGraphState);
    
    // CRITICAL FIX: Notify parent component of graph state changes
    if (onGraphChange) {
      onGraphChange(newGraphState);
    }
    
    // Check for new AI frame nodes and sync them immediately
    const newAIFrameNodes = newGraphState.nodes.filter(node => 
      node.type === 'aiframe' && 
      node.data?.frameId && 
      !frames.some(f => f.id === node.data.frameId)
    );

    if (newAIFrameNodes.length > 0) {
      // console.log('🎯 REAL-TIME: New AI frame nodes detected in graph, creating frames:', {
      //   nodes: newAIFrameNodes.map(n => ({ id: n.id, title: n.data.title }))
      // });

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
      // console.log('🗑️ REAL-TIME: AI frame nodes deleted from graph, removing frames:', {
      //   deletedFrameIds
      // });

      const updatedFrames = frames.filter(frame => !deletedFrameIds.includes(frame.id));
      handleFramesChangeWithRealTimeSync(updatedFrames);
    }
    
    // Notify parent component for TimeCapsule updates
    if (onTimeCapsuleUpdate) {
      onTimeCapsuleUpdate(newGraphState, chapters);
    }
  }, [chapters, onTimeCapsuleUpdate, frames, handleFramesChangeWithRealTimeSync, onGraphChange]);

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
    if (sessionInitialized || !graphStorageManager || initializingRef.current) return;
    
    try {
      initializingRef.current = true;
      
      // FIXED: Ensure GraphStorageManager is properly initialized before use
      if (!graphStorageManager.isInitialized) {
        console.log("⚠️ GraphStorageManager not yet initialized, skipping session initialization");
        return;
      }
      
      // FIXED: Ensure frames is an array and pass correct parameters
      const validFrames = Array.isArray(frames) ? frames : [];
      const sessionMetadata = {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        source: "auto-initialization",
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

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
      // 
    } catch (error) {
      console.error("❌ Failed to initialize session:", error);
    } finally {
      initializingRef.current = false;
    }
  }, [graphStorageManager, frames, sessionInitialized]);

  // REMOVED: Graph state loading logic that was breaking the sync system
  // The existing architecture handles graph state restoration through the main page.tsx logic

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

      // 
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

  // HYBRID APPROACH: Auto-save on frame changes (DISABLED to prevent spam)
  // useEffect(() => {
  //   if (sessionInitialized && frames.length > 0) {
  //     frames.forEach(frame => {
  //       if (frame.updatedAt && new Date(frame.updatedAt).getTime() > Date.now() - 1000) {
  //         debouncedAutoSave(frame.id, frame);
  //       }
  //     });
  //   }
  // }, [frames, sessionInitialized, debouncedAutoSave]);

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
        // 
        
        // Create session document
        const sessionDoc = {
          id: `sess-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`, // CRITICAL FIX: Short ID under 100 chars
          title: "AI-Frames Session",
          content: "AI-Frames learning session initialized",
          metadata: {
            // REQUIRED DocumentData fields
            filename: `session-${Date.now()}.json`,
            filesize: 0, // Virtual document, no file size
            filetype: "application/json",
            uploadedAt: new Date().toISOString(),
            description: "AI-Frames learning session initialization",
            isGenerated: true, // Auto-generated by system
            
            // AI-Frames specific fields
            source: "ai-frames-session",
            sessionId: `session_${Date.now()}`,
            createdAt: new Date().toISOString(),
          },
          // CRITICAL FIX: Add missing required RxDB schema fields
          chunks: [], // Session docs don't have chunks to process
          vectors: [] // Session docs don't have vectors to generate
        };

        console.log('📋 SCHEMA CHECK: Session document structure before insertion:', {
          hasId: !!sessionDoc.id,
          hasTitle: !!sessionDoc.title,
          hasContent: !!sessionDoc.content,
          hasMetadata: !!sessionDoc.metadata,
          hasChunks: Array.isArray(sessionDoc.chunks),
          hasVectors: Array.isArray(sessionDoc.vectors),
          metadataKeys: Object.keys(sessionDoc.metadata),
          documentId: sessionDoc.id
        });

        await vectorStore.insertDocument(sessionDoc);
        console.log("✅ Session document inserted successfully:", {
          sessionId: sessionDoc.metadata.sessionId,
          documentId: sessionDoc.id
        });
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
        // CRITICAL FIX: Generate deterministic short ID under 100 chars for schema compliance
        const generateShortConnectionId = (connectionId: string): string => {
          // Create a deterministic short ID from the long connection ID (no timestamp for true determinism)
          const hash = connectionId.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a; // Convert to 32-bit integer
          }, 0);
          const hashStr = Math.abs(hash).toString(36).substring(0, 8); // Max 8 chars from hash
          return `conn-${hashStr}`; // Always same ID for same connection
        };
        
        const shortDocId = generateShortConnectionId(connection.id);
        
        // VALIDATION: Ensure ID length compliance 
        if (shortDocId.length >= 100) {
          console.error('❌ CRITICAL: Generated ID too long for schema!', {
            generatedId: shortDocId,
            length: shortDocId.length,
            originalConnectionId: connection.id
          });
          return; // Abort if ID would cause schema error
        }
        
        console.log('🔗 ID GENERATION: Connection document ID created:', {
          originalConnectionId: connection.id,
          originalLength: connection.id.length,
          generatedDocId: shortDocId,
          generatedLength: shortDocId.length,
          schemaCompliant: shortDocId.length < 100
        });
        
        const connectionDoc = {
          id: shortDocId, // SCHEMA COMPLIANT: Short ID under 100 chars
          title: `Connection: ${sourceNode?.data?.title || 'Unknown'} → ${targetNode?.data?.title || 'Unknown'}`,
          content: `Connection Status: ${status}
Source: ${sourceNode?.data?.title || 'Unknown'} (${sourceNode?.id})
Target: ${targetNode?.data?.title || 'Unknown'} (${targetNode?.id})
Type: ${connection.targetHandle === 'attachment-slot' ? 'Attachment' : 'Sequential'}
Status: ${status}
Connection ID: ${connection.id}
Source Node: ${sourceNode?.id}
Target Node: ${targetNode?.id}
Updated: ${new Date().toISOString()}`,
          metadata: {
            // ONLY USE SCHEMA-COMPLIANT FIELDS - avoid custom properties that cause validation errors
            filename: `connection-${Date.now()}.json`, // SHORTER filename
            filesize: 0, // Virtual document, no file size
            filetype: "application/json",
            uploadedAt: new Date().toISOString(),
            source: "ai-frames-connection",
            description: `Frame connection: ${sourceNode?.data?.title || 'Unknown'} → ${targetNode?.data?.title || 'Unknown'}`,
            isGenerated: true, // Auto-generated by system
            updatedAt: new Date().toISOString(),
            // Store connection details in allowed string fields
            name: `${connection.id.substring(0, 50)}`, // TRUNCATE long connection ID
            type: connection.targetHandle === 'attachment-slot' ? 'attachment' : 'sequential',
            category: 'graph-connection'
          },
          // REQUIRED: Empty arrays for RxDB schema compliance
          chunks: [], // Connections don't have chunks to process
          vectors: [] // Connections don't have vectors to generate
        };

        if (status === 'connected') {
          console.log('🔗 SCHEMA CHECK: Connection document structure before insertion:', {
            hasId: !!connectionDoc.id,
            idLength: connectionDoc.id.length, // Should be under 100
            hasTitle: !!connectionDoc.title,
            hasContent: !!connectionDoc.content,
            hasMetadata: !!connectionDoc.metadata,
            hasChunks: Array.isArray(connectionDoc.chunks),
            hasVectors: Array.isArray(connectionDoc.vectors),
            metadataKeys: Object.keys(connectionDoc.metadata),
            documentId: connectionDoc.id
          });
          
          await vectorStore.insertDocument(connectionDoc);
          console.log("✅ Connection inserted successfully:", {
            connectionId: connection.id,
            documentId: connectionDoc.id,
            idLength: connectionDoc.id.length
          });
        } else {
          await vectorStore.deleteDocument(shortDocId); // Use same deterministic ID for deletion
          console.log("🗑️ Connection document deleted:", {
            connectionId: connection.id,
            documentId: shortDocId
          });
        }
      }
    } catch (error) {
      console.error("❌ Failed to update connection status in Knowledge Base:", error);
    }
  };

  // FIX 2: Initialize real-time sync tracking when KB loads with sync pause
  const [isKbLoading, setIsKbLoading] = useState(false);
  const [currentGraphStateRef, setCurrentGraphStateRef] = useState<GraphState | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedSnapshot, setLastSavedSnapshot] = useState<string>('');
  
  // CRITICAL FIX: Reference to get current graph state from DualPaneFrameView
  const dualPaneStateRef = useRef<(() => GraphState) | null>(null);
  
  // CRITICAL FIX: Use ref to avoid infinite loop dependencies
  const lastSavedSnapshotRef = useRef<string>('');

  // DRAGON SLAYER: Simplified state resolution - ONE strategy only
  const getCurrentGraphState = useCallback(() => {
    // CRITICAL FIX: Get fresh state from DualPaneFrameView if available
    if (dualPaneStateRef.current) {
      const freshState = dualPaneStateRef.current();
      if (freshState && freshState.nodes && freshState.nodes.length > 0) {
        return freshState;
      }
    }
    // Fallback to cached state reference
    return currentGraphStateRef || { nodes: [], edges: [], selectedNodeId: null };
  }, [currentGraphStateRef]);

  // DRAGON SLAYER: Ultra-lightweight state update with ZERO logging
  const handleGraphStateUpdate = useCallback((state: GraphState) => {
    setCurrentGraphStateRef(state);
    
    // DRAGON SLAYER: Skip all processing for empty states
    if (state.nodes.length === 0) return;
    
    // SIMPLIFIED: Basic change detection without excessive complexity
    const currentSnapshot = `${state.nodes.length}-${state.edges?.length || 0}`;
    
    if (currentSnapshot !== lastSavedSnapshotRef.current && lastSavedSnapshotRef.current !== '' && state.nodes.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, []); // CRITICAL FIX: Remove lastSavedSnapshot dependency, use ref instead
  
  // Sync ref with state
  useEffect(() => {
    lastSavedSnapshotRef.current = lastSavedSnapshot;
  }, [lastSavedSnapshot]);
  
  // Initialize saved snapshot when frames are first loaded
  useEffect(() => {
    if (frames.length > 0 && lastSavedSnapshot === '') {
      const initialSnapshot = JSON.stringify({
        nodes: [],
        edges: []
      });
      setLastSavedSnapshot(initialSnapshot);
    }
  }, [frames]); // CRITICAL FIX: Remove lastSavedSnapshot dependency to prevent infinite loop

  // DRAGON SLAYER: Silent initialization
  useEffect(() => {
    if (initialGraphState && initialGraphState.nodes && initialGraphState.nodes.length > 0) {
      setCurrentGraphStateRef(initialGraphState);
    }
  }, [initialGraphState]);

  useEffect(() => {
    const handleKBFramesLoaded = (event: CustomEvent) => {
      const { frames: kbFrames }: { frames: AIFrame[] } = event.detail;
      
      // console.log('📡 KB-frames-loaded event received, initializing tracking states:', {
      //   frameCount: kbFrames.length,
      //   frameIds: kbFrames.map((f: AIFrame) => f.id)
      // });
      
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
        // 
      }, 500);
      
      // 
    };

    window.addEventListener('kb-frames-loaded', handleKBFramesLoaded as EventListener);
    return () => window.removeEventListener('kb-frames-loaded', handleKBFramesLoaded as EventListener);
  }, []);

  // REAL-TIME SYNC: Enhanced drag and drop handler
  useEffect(() => {
    const handleGraphFrameAdded = (event: CustomEvent) => {
      const { newFrame, totalFrames } = event.detail;
      // console.log('🎯 REAL-TIME: Graph frame added event received:', {
      //   frameId: newFrame.id,
      //   title: newFrame.title,
      //   totalFrames
      // });

      // Immediately sync to Knowledge Base (async to prevent UI blocking)
      setTimeout(() => syncFrameToKnowledgeBase(newFrame), 100);
      
      // Save to storage (DISABLED to prevent spam)
      // if (graphStorageManager && sessionInitialized) {
      //   autoSaveFrame(newFrame.id, newFrame);
      // }
    };

    const handleGraphFrameDeleted = (event: CustomEvent) => {
      const { frameId } = event.detail;
      // 

      // Remove from Knowledge Base
      removeFrameFromKnowledgeBase(frameId);
    };

    const handleGraphFrameEdited = (event: CustomEvent) => {
      const { frameId, updatedFrame } = event.detail;
      // console.log('✏️ REAL-TIME: Graph frame edited event received:', { 
      //   frameId, 
      //   title: updatedFrame.title 
      // });

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
      // console.log('🔗 REAL-TIME: Connection added event received:', {
      //   connectionId: connection.id,
      //   sourceNodeId: sourceNode?.id,
      //   targetNodeId: targetNode?.id,
      //   timestamp
      // });

      // Update connection status in Knowledge Base
      updateConnectionStatus(connection, sourceNode, targetNode, 'connected');
    };

    const handleConnectionRemoved = (event: CustomEvent) => {
      const { connection, sourceNode, targetNode, timestamp } = event.detail;
      // console.log('🗑️ REAL-TIME: Connection removed event received:', {
      //   connectionId: connection.id,
      //   sourceNodeId: sourceNode?.id,
      //   targetNodeId: targetNode?.id,
      //   timestamp
      // });

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

  // FIXED: Handle Save Graph with proper VectorStore sync
  const handleSaveGraph = async () => {
    try {
      // Prevent multiple save operations
      if (isAutoSaving) {
        return;
      }
      
      // Ensure session is initialized
      if (!sessionInitialized) {
        await initializeSession();
      }

      // CRITICAL FIX: Get current graph state for frame merging
      const currentGraphState = getCurrentGraphState();
      
      // ENHANCED: Get current frames with latest attachment data
      let currentFrames: AIFrame[] = [];
      
      // PRIORITY 1: Try to get latest frames from AI-Frames app (has latest attachment data)
      try {
        const aiFramesApp = (window as any).aiFramesApp;
        if (aiFramesApp && Array.isArray(aiFramesApp.frames)) {
          currentFrames = aiFramesApp.frames;
        }
      } catch (error) {
        console.warn("⚠️ Failed to get frames from AI-Frames app:", error);
      }

      // PRIORITY 2: Fallback to props frames if AI-Frames app not available
      if (currentFrames.length === 0 && frames && frames.length > 0) {
        currentFrames = frames;
      }

      // PRIORITY 3: Try to load from storage if no frames available
      if (currentFrames.length === 0) {
        try {
          const aiFramesApp = (window as any).aiFramesApp;
          if (aiFramesApp && typeof aiFramesApp.loadFramesFromStorage === 'function') {
            currentFrames = await aiFramesApp.loadFramesFromStorage();
          }
        } catch (error) {
          console.warn("⚠️ Failed to load frames from storage:", error);
        }
      }

      // Convert graph nodes to frames for merging
      const graphFrames: AIFrame[] = currentGraphState.nodes
        .filter((node: any) => node.type === 'aiframe')
        .map((node: any) => {
          const frameData = node.data || {};
          return {
            id: frameData.frameId || node.id,
            title: frameData.title || 'Untitled Frame',
            goal: frameData.goal || '',
            informationText: frameData.informationText || '',
            afterVideoText: frameData.afterVideoText || '',
            aiConcepts: frameData.aiConcepts || [],
            isGenerated: frameData.isGenerated || false,
            videoUrl: frameData.videoUrl || '',
            startTime: frameData.startTime || 0,
            duration: frameData.duration || 300,
            attachment: frameData.attachment,
            order: frameData.order || 1,
            bubblSpaceId: frameData.bubblSpaceId || "default",
            timeCapsuleId: frameData.timeCapsuleId || "default",
            type: 'frame' as const,
            createdAt: frameData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        });

      // GOOGLE DOCS STYLE: Smart merge preserving user edits
      const mergedFrames = [...currentFrames];
      let addedCount = 0;
      let updatedCount = 0;

      // Smart merge function preserving user edits
      const smartMerge = (existing: AIFrame, fromGraph: AIFrame): AIFrame => {
        return {
          ...existing,
          ...fromGraph,
          id: existing.id, // Preserve original ID
          createdAt: existing.createdAt, // Preserve creation time
          updatedAt: new Date().toISOString()
        };
      };

      for (const graphFrame of graphFrames) {
        // Find existing frame by ID
        let existingIndex = mergedFrames.findIndex(f => f.id === graphFrame.id);
        
        // If no exact ID match, try matching by title and order
        if (existingIndex === -1) {
          existingIndex = mergedFrames.findIndex(f => 
            f.title === graphFrame.title && 
            f.order === graphFrame.order
          );
        }
        
        if (existingIndex !== -1) {
          // Smart merge with user edit priority
          const existingFrame = mergedFrames[existingIndex];
          const mergedFrame = smartMerge(existingFrame, graphFrame);
          mergedFrames[existingIndex] = mergedFrame;
          updatedCount++;
        } else {
          mergedFrames.push(graphFrame);
          addedCount++;
        }
      }

      // Final deduplication
      const finalFrames = mergedFrames.reduce((acc: AIFrame[], frame: AIFrame) => {
        if (!acc.find(f => f.id === frame.id)) {
          acc.push(frame);
        }
        return acc;
      }, []);

      // CRITICAL FIX: Use proper VectorStore sync from AI-Frames app
      // Step 1: Update application state first
      onFramesChange(finalFrames);
      
      // Step 2: Wait for state propagation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Step 3: Use proper VectorStore sync methods
      const aiFramesApp = (window as any).aiFramesApp;
      let syncSuccess = false;
      
      if (aiFramesApp && aiFramesApp.vectorStore && aiFramesApp.vectorStoreInitialized) {
        try {
          // CRITICAL FIX: Save to localStorage FIRST before VectorStore sync
          if (typeof aiFramesApp.saveFramesToStorage === 'function') {
            console.log("💾 Saving frames to localStorage...");
            await aiFramesApp.saveFramesToStorage(finalFrames);
          }
          
          // Then sync to VectorStore
          if (typeof aiFramesApp.syncFramesToVectorStore === 'function') {
            syncSuccess = await aiFramesApp.syncFramesToVectorStore(finalFrames);
          } else if (typeof aiFramesApp.syncGraphChangesToKB === 'function') {
            syncSuccess = await aiFramesApp.syncGraphChangesToKB(finalFrames);
          }
          
          if (syncSuccess) {
            console.log("✅ Graph saved successfully");
          } else {
            console.warn("⚠️ VectorStore sync failed");
          }
        } catch (syncError) {
          console.error("❌ VectorStore sync failed:", syncError);
        }
      } else {
        console.warn("⚠️ VectorStore not available for sync");
      }

      // Step 4: Save to storage (localStorage, IndexedDB)
      // Save to IndexedDB
      if (graphStorageManager) {
        await graphStorageManager.saveFrameSequence(
          finalFrames,
          currentFrameIndex,
          {
            version: "1.0",
            lastUpdated: new Date().toISOString(),
            source: "graph-save"
          }
        );
      }

      // Save to TimeCapsule with complete graph state
      const completeData = {
        data: {
          frames: finalFrames,
          currentFrameIndex: currentFrameIndex,
          graphState: {
            nodes: currentGraphState.nodes,
            edges: currentGraphState.edges,
            selectedNodeId: currentGraphState.selectedNodeId,
            viewport: currentGraphState.viewport
          },
          metadata: {
            version: "1.0",
            lastUpdated: new Date().toISOString(),
            source: "graph-save"
          }
        },
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem("timecapsule_combined", JSON.stringify(completeData));

      // Step 5: Dispatch comprehensive events
      if (typeof window !== 'undefined') {
        // Event for Knowledge Base update
        window.dispatchEvent(new CustomEvent('aiframes-kb-updated', {
          detail: {
            source: 'save-graph',
            frameCount: finalFrames.length,
            timestamp: new Date().toISOString(),
            frames: finalFrames,
            syncSuccess,
            graphState: currentGraphState
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
        
        // Success event
        window.dispatchEvent(new CustomEvent('graph-saved', {
          detail: {
            success: true,
            frameCount: finalFrames.length,
            nodeCount: currentGraphState.nodes.length,
            edgeCount: currentGraphState.edges.length,
            frames: finalFrames,
            syncSuccess,
            timestamp: new Date().toISOString()
          }
        }));
      }

      // Update saved snapshot and reset change state
      const currentSnapshot = `${currentGraphState.nodes.length}-${currentGraphState.edges?.length || 0}`;
      setLastSavedSnapshot(currentSnapshot);
      setHasUnsavedChanges(false);
      
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
              disabled={!hasUnsavedChanges || isAutoSaving}
              className={`${hasUnsavedChanges ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400'} transition-colors`}
            >
              <Save className="h-4 w-4 mr-2" />
              {isAutoSaving ? "Saving..." : hasUnsavedChanges ? "Save Graph" : "No Changes"}
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
              onClick={async () => {
                try {
                  organizeIntoChapters();
                  // Wait a moment for state to update, then save
                  await new Promise(resolve => setTimeout(resolve, 100));
                  await handleSaveGraph();
                } catch (error) {
                  console.error("❌ Organize failed:", error);
                }
              }}
              disabled={isAutoSaving}
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
          onGetCurrentState={dualPaneStateRef}
          onGraphStateUpdate={handleGraphStateUpdate}
          initialGraphState={graphState} // CRITICAL FIX: Pass initial graph state to restore standalone attachments
        />
      </div>
    </div>
  );
}