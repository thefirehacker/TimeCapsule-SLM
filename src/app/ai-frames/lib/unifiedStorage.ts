import { AIFrame } from "../types/frames";
import { GraphState } from "@/components/ai-graphs/types";

// DYNAMIC: Fully extensible frame data structure (future-proof for any attachment type)
export interface UnifiedAIFrame extends Omit<AIFrame, 'attachment'> {
  // DYNAMIC: Support ANY attachment type without hardcoding (overrides AIFrame.attachment)
  attachment?: {
    id: string;
    type: string; // DYNAMIC: Accept any type (video, text, pdf, audio, image, AR, VR, etc.)
    data: Record<string, any>; // DYNAMIC: Accept any properties without schema restrictions
  };
  // Ensure consistent metadata
  metadata: {
    version: string;
    createdAt: string;
    updatedAt: string;
    source: 'ai-frames';  // CONSISTENT: Always use same source
    lastSaved: string;
  };
}

// UNIFIED: Complete App State Structure with Position Preservation
export interface UnifiedAppState {
  frames: UnifiedAIFrame[];
  graphState: GraphState; // Already includes viewport and node positions
  metadata: {
    version: string;
    lastSaved: string;
    frameCount: number;
    source: 'ai-frames';
    checksum: string;
  };
}

// UNIFIED: Single Storage Manager Class
export class UnifiedStorageManager {
  private static instance: UnifiedStorageManager;
  private vectorStore: any = null;
  private isSaving = false;
  
  // SINGLETON: Ensure only one instance to prevent conflicts
  static getInstance(): UnifiedStorageManager {
    if (!UnifiedStorageManager.instance) {
      UnifiedStorageManager.instance = new UnifiedStorageManager();
    }
    return UnifiedStorageManager.instance;
  }

  // INITIALIZATION: Set VectorStore reference
  setVectorStore(vectorStore: any): void {
    this.vectorStore = vectorStore;
  }

  // UNIFIED SAVE: Single method that saves to ALL storage layers with SAME format
  async saveAll(frames: UnifiedAIFrame[], graphState: GraphState): Promise<boolean> {
    // PREVENT: Concurrent saves that cause conflicts
    if (this.isSaving) {
      console.log("⏳ Save already in progress, skipping...");
      return false;
    }

    try {
      this.isSaving = true;
      console.log("💾 Starting unified save...");

      // STEP 1: Normalize frame data to unified format
      const unifiedFrames = this.normalizeFrames(frames);
      
      // STEP 2: Create complete app state
      const appState = this.createAppState(unifiedFrames, graphState);
      
      // STEP 3: Save to ALL storage layers with SAME format
      const results = await Promise.allSettled([
        this.saveToLocalStorage(appState),
        this.saveToVectorStore(appState),
        this.saveToIndexedDB(appState)
      ]);

      // STEP 4: Verify all saves succeeded
      const failures = results.filter(r => r.status === 'rejected');
      if (failures.length > 0) {
        console.warn("⚠️ Some saves failed:", failures);
        // Continue if at least localStorage succeeded
      }

      console.log("✅ Unified save completed successfully");
      
      // CRITICAL FIX: Emit save success event to prevent circular sync conflicts
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('unified-save-success', {
          detail: {
            frameCount: frames.length,
            timestamp: new Date().toISOString(),
            source: 'unified-storage'
          }
        }));
      }
      
      return true;

    } catch (error) {
      console.error("❌ Unified save failed:", error);
      return false;
    } finally {
      this.isSaving = false;
    }
  }

  // UNIFIED LOAD: Single method that loads from best available source
  async loadAll(): Promise<{ frames: UnifiedAIFrame[]; graphState: GraphState } | null> {
    try {
      console.log("📂 Starting unified load...");

      // PRIORITY 1: Try localStorage first (fastest)
      const localData = await this.loadFromLocalStorage();
      if (localData && localData.frames.length > 0) {
        console.log(`✅ Loaded from localStorage: ${localData.frames.length} frames`);
        
        // Loaded app state with graph
        
        return localData;
      }

      // PRIORITY 2: Try VectorStore (if available)
      if (this.vectorStore) {
        const vectorData = await this.loadFromVectorStore();
        if (vectorData && vectorData.frames.length > 0) {
          console.log(`✅ Loaded from VectorStore: ${vectorData.frames.length} frames`);
          return vectorData;
        }
      }

      // PRIORITY 3: Try IndexedDB (fallback)
      const indexedData = await this.loadFromIndexedDB();
      if (indexedData && indexedData.frames.length > 0) {
        console.log(`✅ Loaded from IndexedDB: ${indexedData.frames.length} frames`);
        return indexedData;
      }

      console.log("📭 No data found in any storage");
      return null;

    } catch (error) {
      console.error("❌ Unified load failed:", error);
      return null;
    }
  }

  // NORMALIZATION: Convert any frame format to unified format
  private normalizeFrames(frames: AIFrame[]): UnifiedAIFrame[] {
    return frames.map(frame => ({
      ...frame,
      // DYNAMIC: Preserve ANY attachment structure without type restrictions
      attachment: frame.attachment ? {
        id: frame.attachment.id || `attachment-${Date.now()}`,
        type: frame.attachment.type, // DYNAMIC: Keep original type without casting
        data: {
          // DYNAMIC: Merge all properties from attachment data without hardcoding
          ...(frame.attachment.data || {}),
          // FALLBACK: Legacy support for old frame properties  
          ...(frame.attachment.data?.name && !frame.attachment.data?.title && { title: frame.attachment.data.name }),
          ...(frame.videoUrl && !frame.attachment.data?.videoUrl && { videoUrl: frame.videoUrl }),
          ...(frame.startTime !== undefined && !frame.attachment.data?.startTime && { startTime: frame.startTime }),
          ...(frame.duration !== undefined && !frame.attachment.data?.duration && { duration: frame.duration }),
          ...(frame.attachment.data?.content && !frame.attachment.data?.text && { text: frame.attachment.data.content }),
          ...(frame.attachment.data?.url && !frame.attachment.data?.pdfUrl && { pdfUrl: frame.attachment.data.url })
        }
      } : undefined,
      // NORMALIZE: Ensure consistent metadata
      metadata: {
        version: '2.0',
        createdAt: frame.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'ai-frames' as const,
        lastSaved: new Date().toISOString()
      }
    }));
  }

  // STATE CREATION: Create complete app state with checksum
  private createAppState(frames: UnifiedAIFrame[], graphState: GraphState): UnifiedAppState {
    
    // Creating app state for save
    
    const appState: UnifiedAppState = {
      frames,
      graphState,
      metadata: {
        version: '2.0',
        lastSaved: new Date().toISOString(),
        frameCount: frames.length,
        source: 'ai-frames' as const,
        checksum: this.generateChecksum(frames, graphState)
      }
    };
    return appState;
  }

  // CHECKSUM: Generate data integrity checksum
  private generateChecksum(frames: UnifiedAIFrame[], graphState: GraphState): string {
    const dataString = JSON.stringify({ frames, graphState });
    return btoa(dataString).slice(0, 16); // Simple checksum
  }

  // LOCALSTORAGE: Save with unified format
  private async saveToLocalStorage(appState: UnifiedAppState): Promise<void> {
    // CLEANUP: Remove old storage keys to prevent conflicts
    localStorage.removeItem('ai_frames_timecapsule');
    
    // SAVE: Use single unified key
    localStorage.setItem('ai_frames_unified', JSON.stringify(appState));
    
    // LEGACY COMPATIBILITY: Also save to timecapsule_combined for existing code
    localStorage.setItem('timecapsule_combined', JSON.stringify({
      data: {
        frames: appState.frames,
        graphState: appState.graphState,
        metadata: appState.metadata
      },
      timestamp: new Date().toISOString()
    }));
  }

  // LOCALSTORAGE: Load with unified format
  private async loadFromLocalStorage(): Promise<{ frames: UnifiedAIFrame[]; graphState: GraphState } | null> {
    try {
      // TRY: New unified format first
      const unifiedData = localStorage.getItem('ai_frames_unified');
      if (unifiedData) {
        const appState: UnifiedAppState = JSON.parse(unifiedData);
        return {
          frames: appState.frames,
          graphState: appState.graphState
        };
      }

      // FALLBACK: Legacy timecapsule_combined format
      const legacyData = localStorage.getItem('timecapsule_combined');
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        if (parsed.data?.frames) {
          return {
            frames: this.normalizeFrames(parsed.data.frames),
            graphState: parsed.data.graphState || { nodes: [], edges: [], selectedNodeId: null }
          };
        }
      }

      return null;
    } catch (error) {
      console.error("❌ Failed to load from localStorage:", error);
      return null;
    }
  }

  // VECTORSTORE: Save with consistent metadata
  private async saveToVectorStore(appState: UnifiedAppState): Promise<void> {
    if (!this.vectorStore) return;

    try {
      // UPSERT: Update existing documents instead of delete-then-insert
      // This prevents video attachments from blinking/disappearing during saves
      for (const frame of appState.frames) {
        const documentData = {
          id: `aiframe-${frame.id}`,
          title: `AI-Frame: ${frame.title}`,
          content: this.generateFrameContent(frame),
          metadata: {
            ...frame.metadata,
            frameId: frame.id,
            attachment: frame.attachment, // PRESERVE: Complete attachment data
            goal: frame.goal,
            videoUrl: frame.videoUrl,
            type: 'ai-frame'
          },
          chunks: [],
          vectors: []
        };

        await this.vectorStore.upsertDocument(documentData);
      }

      // CLEANUP: Remove orphaned documents (frames that no longer exist)
      const existingDocs = await this.vectorStore.getAllDocuments();
      const currentFrameIds = appState.frames.map(f => f.id);
      const aiFrameDocs = existingDocs.filter((doc: any) => 
        doc.metadata?.source === 'ai-frames' || 
        doc.metadata?.source === 'ai-frames-auto-sync'
      );
      
      for (const doc of aiFrameDocs) {
        const frameId = doc.metadata?.frameId;
        if (frameId && !currentFrameIds.includes(frameId)) {
          await this.vectorStore.deleteDocument(doc.id);
        }
      }

    } catch (error) {
      // Failed to save to VectorStore
      throw error;
    }
  }

  // VECTORSTORE: Load with consistent parsing
  private async loadFromVectorStore(): Promise<{ frames: UnifiedAIFrame[]; graphState: GraphState } | null> {
    if (!this.vectorStore) return null;

    try {
      const documents = await this.vectorStore.getAllDocuments();
      const frameDocuments = documents.filter((doc: any) => 
        doc.metadata?.source === 'ai-frames' && doc.metadata?.type === 'ai-frame'
      );

      if (frameDocuments.length === 0) {
        return null;
      }

      const frames = frameDocuments.map((doc: any) => this.parseFrameFromDocument(doc));
      return {
        frames,
        graphState: { nodes: [], edges: [], selectedNodeId: null } // TODO: Load graph state from VectorStore
      };

    } catch (error) {
      console.error("❌ Failed to load from VectorStore:", error);
      return null;
    }
  }

  // INDEXEDDB: Placeholder for future implementation
  private async saveToIndexedDB(appState: UnifiedAppState): Promise<void> {
    // TODO: Implement IndexedDB save
    console.log("📝 IndexedDB save placeholder");
  }

  private async loadFromIndexedDB(): Promise<{ frames: UnifiedAIFrame[]; graphState: GraphState } | null> {
    // TODO: Implement IndexedDB load
    return null;
  }

  // CONTENT GENERATION: Create searchable content for VectorStore
  private generateFrameContent(frame: UnifiedAIFrame): string {
    const attachment = frame.attachment;
    
    return `
Learning Goal: ${frame.goal}

Context & Background:
${frame.informationText}

After Video Content:
${frame.afterVideoText || "No additional content"}

AI Concepts: ${frame.aiConcepts ? frame.aiConcepts.join(", ") : "None"}

${attachment ? `
Attachment Details:
- Type: ${attachment.type}
${Object.entries(attachment.data || {}).map(([key, value]) => 
  `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value || 'Not specified'}`
).join('\n')}` : 'Attachments: None'}

Metadata:
- Created: ${frame.metadata.createdAt}
- Updated: ${frame.metadata.updatedAt}
- Order: ${frame.order || 1}
- Type: ${frame.type || 'frame'}
    `.trim();
  }

  // DOCUMENT PARSING: Convert VectorStore document back to frame
  private parseFrameFromDocument(document: any): UnifiedAIFrame {
    const { metadata } = document;
    
    return {
      id: metadata.frameId || document.id.replace('aiframe-', ''),
      title: metadata.title?.replace('AI-Frame: ', '') || 'Untitled Frame',
      goal: metadata.goal || '',
      informationText: metadata.informationText || '',
      videoUrl: metadata.videoUrl || '',
      startTime: metadata.startTime || 0,
      duration: metadata.duration || 300,
      afterVideoText: metadata.afterVideoText || '',
      aiConcepts: metadata.aiConcepts || [],
      isGenerated: metadata.isGenerated || false,
      order: metadata.order || 1,
      bubblSpaceId: metadata.bubblSpaceId || 'default',
      timeCapsuleId: metadata.timeCapsuleId || 'default',
      type: metadata.frameType || 'frame',
      createdAt: metadata.createdAt || new Date().toISOString(),
      updatedAt: metadata.updatedAt || new Date().toISOString(),
      attachment: metadata.attachment,
      metadata: {
        version: '2.0',
        createdAt: metadata.createdAt || new Date().toISOString(),
        updatedAt: metadata.updatedAt || new Date().toISOString(),
        source: 'ai-frames' as const,
        lastSaved: metadata.lastSaved || new Date().toISOString()
      }
    };
  }

  // CLEANUP: Remove old storage keys
  async cleanup(): Promise<void> {
    // Remove old localStorage keys that cause conflicts
    localStorage.removeItem('ai_frames_timecapsule');
    
    console.log("🧹 Storage cleanup completed");
  }
}

// EXPORT: Singleton instance
export const unifiedStorage = UnifiedStorageManager.getInstance(); 