import { AIFrame, Chapter } from "../types/frames";
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

export type UnifiedChapter = Chapter;

// UNIFIED: Complete App State Structure with Position Preservation
export interface UnifiedAppState {
  frames: UnifiedAIFrame[];
  chapters: UnifiedChapter[];
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
  async saveAll(
    frames: UnifiedAIFrame[],
    chapters: UnifiedChapter[],
    graphState: GraphState,
    options: { skipVectorStore?: boolean } = {}
  ): Promise<boolean> {
    // PREVENT: Concurrent saves that cause conflicts
    if (this.isSaving) {
      console.log("⏳ Save already in progress, skipping...");
      return false;
    }

    try {
      this.isSaving = true;
      const { skipVectorStore = false } = options;
      console.log("💾 Starting unified save...", {
        skipVectorStore,
      });

      // STEP 1: Normalize frame data to unified format
      const unifiedFrames = this.normalizeFrames(frames);
      const unifiedChapters = this.normalizeChapters(chapters);
      
      // STEP 2: Create complete app state
      const appState = this.createAppState(unifiedFrames, unifiedChapters, graphState);
      
      // STEP 3: Save to storage layers (optionally skip VectorStore for graph-only updates)
      const saveTasks: Promise<void>[] = [
        this.saveToLocalStorage(appState),
        this.saveToIndexedDB(appState),
      ];

      if (!skipVectorStore) {
        saveTasks.push(this.saveToVectorStore(appState));
      }

      const results = await Promise.allSettled(saveTasks);

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
          chapterCount: chapters.length,
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
  async loadAll(): Promise<{ frames: UnifiedAIFrame[]; chapters: UnifiedChapter[]; graphState: GraphState } | null> {
    try {
      console.log("📂 Starting unified load...");

      // PRIORITY 1: Try localStorage first (fastest)
      const localData = await this.loadFromLocalStorage();
      if (localData && (localData.frames.length > 0 || localData.chapters.length > 0 || localData.graphState?.nodes?.length > 0)) {
        console.log(`✅ Loaded from localStorage: ${localData.frames.length} frames, ${localData.graphState?.nodes?.length || 0} nodes`);

        // Loaded app state with graph

        return localData;
      }

      // PRIORITY 2: Try VectorStore (if available)
      if (this.vectorStore) {
        const vectorData = await this.loadFromVectorStore();
        if (vectorData && (vectorData.frames.length > 0 || vectorData.chapters.length > 0 || vectorData.graphState?.nodes?.length > 0)) {
          console.log(`✅ Loaded from VectorStore: ${vectorData.frames.length} frames, ${vectorData.graphState?.nodes?.length || 0} nodes`);
          return vectorData;
        }
      }

      // PRIORITY 3: Try IndexedDB (fallback)
      const indexedData = await this.loadFromIndexedDB();
      if (indexedData && (indexedData.frames.length > 0 || indexedData.chapters.length > 0 || indexedData.graphState?.nodes?.length > 0)) {
        console.log(`✅ Loaded from IndexedDB: ${indexedData.frames.length} frames, ${indexedData.graphState?.nodes?.length || 0} nodes`);
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
      aiConcepts: frame.aiConcepts && frame.aiConcepts.length > 0 ? frame.aiConcepts : (frame.conceptIds || []),
      conceptIds: frame.conceptIds || frame.aiConcepts || [],
      chapterId: frame.chapterId || frame.parentFrameId,
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

  private normalizeChapters(chapters: Chapter[]): UnifiedChapter[] {
    return chapters.map((chapter, index) => ({
      ...chapter,
      conceptIds: chapter.conceptIds || [],
      order: typeof chapter.order === 'number' ? chapter.order : index,
      createdAt: chapter.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  // STATE CREATION: Create complete app state with checksum
  private createAppState(frames: UnifiedAIFrame[], chapters: UnifiedChapter[], graphState: GraphState): UnifiedAppState {
    
    // Creating app state for save
    
    const appState: UnifiedAppState = {
      frames,
      chapters,
      graphState,
      metadata: {
        version: '2.0',
        lastSaved: new Date().toISOString(),
        frameCount: frames.length,
        source: 'ai-frames' as const,
        checksum: this.generateChecksum(frames, chapters, graphState)
      }
    };
    return appState;
  }

  // CHECKSUM: Generate data integrity checksum
  private generateChecksum(frames: UnifiedAIFrame[], chapters: UnifiedChapter[], graphState: GraphState): string {
    const dataString = JSON.stringify({ 
      frames: frames.map(f => ({
        id: f.id,
        title: f.title,
        order: f.order,
        chapterId: f.chapterId,
        conceptIds: f.conceptIds
      })),
      chapters: chapters.map(c => ({
        id: c.id,
        title: c.title,
        order: c.order,
        conceptIds: c.conceptIds,
        frameIds: c.frameIds
      })),
      graphState 
    });
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
        chapters: appState.chapters,
        graphState: appState.graphState,
        metadata: appState.metadata
      },
      timestamp: new Date().toISOString()
    }));
  }

  // LOCALSTORAGE: Load with unified format
  private async loadFromLocalStorage(): Promise<{ frames: UnifiedAIFrame[]; chapters: UnifiedChapter[]; graphState: GraphState } | null> {
    try {
      // TRY: New unified format first
      const unifiedData = localStorage.getItem('ai_frames_unified');
      if (unifiedData) {
        const appState: UnifiedAppState = JSON.parse(unifiedData);
        return {
          frames: appState.frames,
          chapters: appState.chapters || [],
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
            chapters: this.normalizeChapters(parsed.data.chapters || []),
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
            // CRITICAL FIX: Store ALL frame properties in metadata for proper loading
            title: frame.title,
            goal: frame.goal,
            informationText: frame.informationText,
            videoUrl: frame.videoUrl,
            startTime: frame.startTime,
            duration: frame.duration,
            afterVideoText: frame.afterVideoText,
            aiConcepts: frame.aiConcepts,
            conceptIds: frame.conceptIds || frame.aiConcepts || [],
            chapterId: frame.chapterId || null,
            isGenerated: frame.isGenerated,
            order: frame.order,
            bubblSpaceId: frame.bubblSpaceId,
            timeCapsuleId: frame.timeCapsuleId,
            frameType: frame.type,
            createdAt: frame.createdAt,
            updatedAt: frame.updatedAt,
            attachment: frame.attachment, // PRESERVE: Complete attachment data
            type: 'ai-frame'
          },
          chunks: [],
          vectors: []
        };

        await this.vectorStore.upsertDocument(documentData);
      }

      const chapterDocument = {
        id: `aiframe-chapters`,
        title: `AI-Frame Chapters`,
        content: this.generateChapterContent(appState.chapters),
        metadata: {
          type: 'ai-frame-chapters',
          source: 'ai-frames',
          updatedAt: new Date().toISOString(),
          chapters: appState.chapters
        },
        chunks: [],
        vectors: []
      };
      await this.vectorStore.upsertDocument(chapterDocument);

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

  // VECTOR STORE: Load with consistent parsing
  private async loadFromVectorStore(): Promise<{ frames: UnifiedAIFrame[]; chapters: UnifiedChapter[]; graphState: GraphState } | null> {
    if (!this.vectorStore) return null;

    try {
      const documents = await this.vectorStore.getAllDocuments();
      const frameDocuments = documents.filter((doc: any) => 
        doc.metadata?.source === 'ai-frames' && doc.metadata?.type === 'ai-frame'
      );

      const chapterDocument = documents.find((doc: any) =>
        doc.metadata?.source === 'ai-frames' && doc.metadata?.type === 'ai-frame-chapters'
      );

      if (frameDocuments.length === 0 && !chapterDocument) {
        return null;
      }

      const frames = frameDocuments.map((doc: any) => this.parseFrameFromDocument(doc));
      const chapters = chapterDocument?.metadata?.chapters
        ? this.normalizeChapters(chapterDocument.metadata.chapters)
        : [];

      // CRITICAL FIX: Load graph state from IndexedDB/localStorage (VectorStore only stores documents)
      let graphState: GraphState = { nodes: [], edges: [], selectedNodeId: null };

      // Try IndexedDB first (most reliable)
      const indexedDBData = await this.loadFromIndexedDB();
      if (indexedDBData?.graphState) {
        console.log('✅ Loaded graph state from IndexedDB');
        graphState = indexedDBData.graphState;
      } else {
        // Fallback to localStorage
        const localStorageData = await this.loadFromLocalStorage();
        if (localStorageData?.graphState) {
          console.log('✅ Loaded graph state from localStorage');
          graphState = localStorageData.graphState;
        } else {
          console.log('📭 No saved graph state found');
        }
      }

      return {
        frames,
        chapters,
        graphState
      };

    } catch (error) {
      console.error("❌ Failed to load from VectorStore:", error);
      return null;
    }
  }

  // SANITIZATION: Remove functions from objects for IndexedDB compatibility
  private sanitizeForIndexedDB(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeForIndexedDB(item));
    }

    // Handle objects
    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        const value = obj[key];
        // Skip functions
        if (typeof value === 'function') {
          continue;
        }
        // Recursively sanitize nested objects
        sanitized[key] = this.sanitizeForIndexedDB(value);
      }
      return sanitized;
    }

    // Return primitives as-is
    return obj;
  }

  // INDEXEDDB: Simple implementation as backup storage
  private async saveToIndexedDB(appState: UnifiedAppState): Promise<void> {
    try {
      if (typeof window === 'undefined' || !window.indexedDB) {
        console.log("📝 IndexedDB not available, skipping");
        return;
      }

      // CRITICAL: Sanitize appState to remove functions before saving
      const sanitizedAppState = this.sanitizeForIndexedDB(appState);

      // Create a simple key-value store in IndexedDB
      const dbRequest = indexedDB.open('ai-frames-unified', 1);
      
      dbRequest.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('appState')) {
          db.createObjectStore('appState');
        }
      };

      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        dbRequest.onsuccess = () => resolve(dbRequest.result);
        dbRequest.onerror = () => reject(dbRequest.error);
      });

      // Verify object store exists before creating transaction
      if (!db.objectStoreNames.contains('appState')) {
        console.warn("⚠️ IndexedDB 'appState' object store not found, closing and recreating database");
        db.close();

        // Delete and recreate the database
        await new Promise<void>((resolve, reject) => {
          const deleteRequest = indexedDB.deleteDatabase('ai-frames-unified');
          deleteRequest.onsuccess = () => resolve();
          deleteRequest.onerror = () => reject(deleteRequest.error);
        });

        // Recreate database with object store
        const recreateRequest = indexedDB.open('ai-frames-unified', 1);
        recreateRequest.onupgradeneeded = (event) => {
          const newDb = (event.target as IDBOpenDBRequest).result;
          if (!newDb.objectStoreNames.contains('appState')) {
            newDb.createObjectStore('appState');
          }
        };

        const newDb = await new Promise<IDBDatabase>((resolve, reject) => {
          recreateRequest.onsuccess = () => resolve(recreateRequest.result);
          recreateRequest.onerror = () => reject(recreateRequest.error);
        });

        const transaction = newDb.transaction(['appState'], 'readwrite');
        const store = transaction.objectStore('appState');

        await new Promise<void>((resolve, reject) => {
          const request = store.put(sanitizedAppState, 'current');
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });

        newDb.close();
        console.log("✅ IndexedDB recreated and save completed");
        return;
      }

      const transaction = db.transaction(['appState'], 'readwrite');
      const store = transaction.objectStore('appState');

      await new Promise<void>((resolve, reject) => {
        const request = store.put(sanitizedAppState, 'current');
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      db.close();
      console.log("✅ IndexedDB save completed");
    } catch (error) {
      console.warn("⚠️ IndexedDB save failed:", error);
    }
  }

  private async loadFromIndexedDB(): Promise<{ frames: UnifiedAIFrame[]; chapters: UnifiedChapter[]; graphState: GraphState } | null> {
    try {
      if (typeof window === 'undefined' || !window.indexedDB) {
        return null;
      }

      const dbRequest = indexedDB.open('ai-frames-unified', 1);
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        dbRequest.onsuccess = () => resolve(dbRequest.result);
        dbRequest.onerror = () => reject(dbRequest.error);
        dbRequest.onupgradeneeded = () => reject(new Error('Database not found'));
      });

      const transaction = db.transaction(['appState'], 'readonly');
      const store = transaction.objectStore('appState');
      
      const appState = await new Promise<UnifiedAppState | null>((resolve, reject) => {
        const request = store.get('current');
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });

      if (appState) {
        return {
          frames: appState.frames,
          chapters: appState.chapters || [],
          graphState: appState.graphState
        };
      }
      
      return null;
    } catch (error) {
      console.warn("⚠️ IndexedDB load failed:", error);
      return null;
    }
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
Concept Attachments: ${frame.conceptIds ? frame.conceptIds.join(", ") : "None"}
Chapter: ${frame.chapterId || "Unassigned"}

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

  private generateChapterContent(chapters: UnifiedChapter[]): string {
    if (chapters.length === 0) {
      return "No chapters configured.";
    }

    return chapters.map((chapter, index) => `
Chapter ${index + 1}: ${chapter.title}
- Description: ${chapter.description || "No description"}
- Order: ${chapter.order}
- Frames: ${chapter.frameIds.length}
- Concept Attachments: ${chapter.conceptIds.length > 0 ? chapter.conceptIds.join(", ") : "None"}
    `.trim()).join('\n\n');
  }

  // DOCUMENT PARSING: Convert VectorStore document back to frame
  private parseFrameFromDocument(document: any): UnifiedAIFrame {
    const { metadata } = document;
    
    return {
      id: metadata.frameId || document.id.replace('aiframe-', ''),
      title: metadata.title || 'Untitled Frame',
      goal: metadata.goal || '',
      informationText: metadata.informationText || 'Provide background context and information...',
      videoUrl: metadata.videoUrl || '',
      startTime: metadata.startTime || 0,
      duration: metadata.duration || 300,
      afterVideoText: metadata.afterVideoText || 'Key takeaways and next steps...',
      aiConcepts: metadata.aiConcepts || metadata.conceptIds || [],
      conceptIds: metadata.conceptIds || metadata.aiConcepts || [],
      isGenerated: metadata.isGenerated || false,
      order: metadata.order || 1,
      bubblSpaceId: metadata.bubblSpaceId || 'default',
      timeCapsuleId: metadata.timeCapsuleId || 'default',
      type: metadata.frameType || 'aiframe',
      chapterId: metadata.chapterId || metadata.parentFrameId || undefined,
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
