/**
 * Graph Storage Manager
 * Handles storage of graph layouts, frame sequences, and session state using VectorStore/IndexedDB
 * Replaces localStorage-based storage with robust IndexedDB backend
 */

import { VectorStore } from '@/components/VectorStore/VectorStore';

export interface GraphLayout {
  id: string;
  sessionId: string;
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: any;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type?: string;
    style?: any;
  }>;
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  lastUpdated: string;
}

export interface FrameSequence {
  id: string;
  sessionId: string;
  frames: any[];
  currentFrameIndex: number;
  metadata: {
    totalFrames: number;
    createdAt: string;
    updatedAt: string;
    bubblSpaceId?: string;
    timeCapsuleId?: string;
  };
}

export interface SessionState {
  id: string;
  sessionId: string;
  isCreationMode: boolean;
  showGraphView: boolean;
  chapters: any[];
  graphState: any;
  voiceSettings?: any;
  lastActiveFrame: number;
  createdAt: string;
  updatedAt: string;
}

export class GraphStorageManager {
  private vectorStore: VectorStore;
  private sessionId: string;
  private isInitialized = false;

  constructor(vectorStore: VectorStore) {
    this.vectorStore = vectorStore;
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateDocumentId(type: 'graph' | 'frames' | 'session', suffix?: string): string {
    const base = `${type}_${this.sessionId}`;
    return suffix ? `${base}_${suffix}` : base;
  }

  async initialize(): Promise<void> {
    if (!this.vectorStore.initialized) {
      throw new Error('VectorStore must be initialized before GraphStorageManager');
    }
    
    console.log('🗂️ Initializing GraphStorageManager with VectorStore backend...');
    this.isInitialized = true;
    console.log('✅ GraphStorageManager initialized successfully');
  }

  // =============================================================================
  // GRAPH LAYOUT STORAGE
  // =============================================================================

  async saveGraphLayout(layout: Omit<GraphLayout, 'id' | 'sessionId' | 'lastUpdated'>): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    const graphLayout: GraphLayout = {
      id: this.generateDocumentId('graph'),
      sessionId: this.sessionId,
      lastUpdated: new Date().toISOString(),
      ...layout,
    };

    const document = {
      id: graphLayout.id,
      title: `Graph Layout - Session ${this.sessionId}`,
      content: `Graph layout with ${layout.nodes.length} nodes and ${layout.edges.length} connections`,
      metadata: {
        filename: `graph_layout_${this.sessionId}.json`,
        filesize: JSON.stringify(graphLayout).length,
        filetype: 'application/json',
        uploadedAt: graphLayout.lastUpdated,
        source: 'graph-storage',
        description: `Graph layout for session ${this.sessionId}`,
        isGenerated: true,
        type: 'graph-layout',
        name: this.sessionId,
        category: 'graph-storage',
        fullObject: JSON.stringify(graphLayout),
      },
      chunks: [],
      vectors: [],
    };

    await this.vectorStore.insertDocument(document);
    // console.log(`💾 Graph layout saved to IndexedDB: ${graphLayout.id}`);
    
    return graphLayout.id;
  }

  async loadGraphLayout(sessionId?: string): Promise<GraphLayout | null> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    try {
      const targetSessionId = sessionId || this.sessionId;
      const documentId = this.generateDocumentId('graph');
      
      const document = await this.vectorStore.getDocument(documentId);
      
      if (document && document.metadata.fullObject) {
        const graphLayout = JSON.parse(document.metadata.fullObject as string) as GraphLayout;
        console.log(`📊 Graph layout loaded from IndexedDB: ${graphLayout.id}`);
        return graphLayout;
      }
      
      console.log(`ℹ️ No graph layout found for session: ${targetSessionId}`);
      return null;
    } catch (error) {
      console.error('❌ Failed to load graph layout:', error);
      return null;
    }
  }

  async deleteGraphLayout(sessionId?: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    try {
      const targetSessionId = sessionId || this.sessionId;
      const documentId = this.generateDocumentId('graph');
      
      await this.vectorStore.deleteDocument(documentId);
      console.log(`🗑️ Graph layout deleted: ${documentId}`);
    } catch (error) {
      console.error('❌ Failed to delete graph layout:', error);
      throw error;
    }
  }

  // =============================================================================
  // FRAME SEQUENCE STORAGE
  // =============================================================================

  async saveFrameSequence(frames: any[], currentFrameIndex: number, metadata: Partial<FrameSequence['metadata']> = {}): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    // FIXED: Ensure frames is an array
    const validFrames = Array.isArray(frames) ? frames : [];
    const safeCurrentFrameIndex = Math.max(0, Math.min(currentFrameIndex || 0, validFrames.length - 1));

    // 🌪️ SYNC STORM FIX: Reduce logging spam during drag & drop

    const frameSequence: FrameSequence = {
      id: this.generateDocumentId('frames'),
      sessionId: this.sessionId,
      frames: validFrames,
      currentFrameIndex: safeCurrentFrameIndex,
      metadata: {
        totalFrames: validFrames.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...metadata,
      },
    };

    // Create detailed sequence content with full frame data
    const sequenceContent = `AI-Frames Learning Sequence

Total Frames: ${validFrames.length}
Current Frame: ${safeCurrentFrameIndex + 1} of ${validFrames.length}
Session ID: ${this.sessionId}
Last Updated: ${frameSequence.metadata.updatedAt}

FRAME SEQUENCE DETAILS:
${validFrames.map((frame, index) => `
=== FRAME ${index + 1} OF ${validFrames.length} ===
Title: ${frame?.title || 'Untitled'}
Learning Goal: ${frame?.goal || 'No goal specified'}
Order: ${frame?.order || index + 1}
Type: ${frame?.type || 'frame'}
Created: ${frame?.createdAt || 'Unknown'}
Updated: ${frame?.updatedAt || 'Unknown'}

Context & Background:
${frame?.informationText || 'No content'}

After Video Content:
${frame?.afterVideoText || 'No additional content'}

Video Details:
- URL: ${frame?.videoUrl || 'No video'}
- Start Time: ${frame?.startTime || 0}s
- Duration: ${frame?.duration || 0}s

AI Concepts: ${frame?.aiConcepts ? frame.aiConcepts.join(', ') : 'None'}

Metadata:
- Generated: ${frame?.isGenerated ? 'Yes' : 'No'}
- BubblSpace: ${frame?.bubblSpaceId || 'default'}
- TimeCapsule: ${frame?.timeCapsuleId || 'default'}
${frame?.sourceGoal ? `- Source Goal: ${frame.sourceGoal}` : ''}

---
`).join('\n')}

SEQUENCE METADATA:
- Total Learning Frames: ${validFrames.length}
- Current Active Frame: ${safeCurrentFrameIndex + 1}
- Session Type: Learning Sequence
- BubblSpace: ${metadata.bubblSpaceId || 'default'}
- TimeCapsule: ${metadata.timeCapsuleId || 'default'}
- Created: ${frameSequence.metadata.createdAt}
- Last Updated: ${frameSequence.metadata.updatedAt}
`;

    const document = {
      id: frameSequence.id,
      title: `Frame Sequence - ${frames.length} frames`,
      content: sequenceContent,
      metadata: {
        filename: `frame_sequence_${this.sessionId}.json`,
        filesize: JSON.stringify(frameSequence).length,
        filetype: 'application/json',
        uploadedAt: frameSequence.metadata.updatedAt,
        source: 'graph-storage',
        description: `Frame sequence for session ${this.sessionId}`,
        isGenerated: true,
        type: 'frame-sequence',
        name: this.sessionId,
        category: 'graph-storage',
        bubblSpaceId: metadata.bubblSpaceId,
        timeCapsuleId: metadata.timeCapsuleId,
        fullObject: JSON.stringify(frameSequence),
      },
      chunks: [],
      vectors: [],
    };

    await this.vectorStore.insertDocument(document);
    // console.log(`💾 Frame sequence saved to IndexedDB: ${frameSequence.id} (${frames.length} frames)`);
    
    return frameSequence.id;
  }

  async loadFrameSequence(sessionId?: string): Promise<FrameSequence | null> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    try {
      const targetSessionId = sessionId || this.sessionId;
      const documentId = this.generateDocumentId('frames');
      
      const document = await this.vectorStore.getDocument(documentId);
      
      if (document && document.metadata.fullObject) {
        const frameSequence = JSON.parse(document.metadata.fullObject as string) as FrameSequence;
        console.log(`📊 Frame sequence loaded from IndexedDB: ${frameSequence.frames.length} frames`);
        return frameSequence;
      }
      
      console.log(`ℹ️ No frame sequence found for session: ${targetSessionId}`);
      return null;
    } catch (error) {
      console.error('❌ Failed to load frame sequence:', error);
      return null;
    }
  }

  // =============================================================================
  // SESSION STATE STORAGE
  // =============================================================================

  async saveSessionState(state: Omit<SessionState, 'id' | 'sessionId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    const sessionState: SessionState = {
      id: this.generateDocumentId('session'),
      sessionId: this.sessionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...state,
    };

    // Create detailed session content
    const sessionContent = `AI-Frames Session State

Session ID: ${this.sessionId}
Mode: ${state.isCreationMode ? 'Creator Mode' : 'Learning Mode'}
View: ${state.showGraphView ? 'Graph View' : 'Linear View'}
Last Active Frame: ${state.lastActiveFrame + 1}
Session Created: ${sessionState.createdAt}
Last Updated: ${sessionState.updatedAt}

SESSION DETAILS:
- Current Mode: ${state.isCreationMode ? 'Creator Mode - Building learning content' : 'Learning Mode - Consuming content'}
- View Mode: ${state.showGraphView ? 'Graph View - Visual node-based interface' : 'Linear View - Traditional sequential interface'}
- Last Active Frame: Frame ${state.lastActiveFrame + 1}
- Chapters: ${state.chapters.length} chapters configured
- Graph State: ${state.graphState ? 'Active graph state available' : 'No graph state'}

VOICE SETTINGS:
${state.voiceSettings ? `- Voice Enabled: ${state.voiceSettings.enabled ? 'Yes' : 'No'}
- Speech Rate: ${state.voiceSettings.rate || 1.0}x
- Voice Pitch: ${state.voiceSettings.pitch || 1.0}
- Voice Volume: ${state.voiceSettings.volume || 1.0}` : '- Voice Settings: Not configured'}

CHAPTERS CONFIGURATION:
${state.chapters.length > 0 ? state.chapters.map((chapter, index) => `
Chapter ${index + 1}: ${chapter.title || 'Untitled'}
- Description: ${chapter.description || 'No description'}
- Frames: ${chapter.frames?.length || 0} frames
`).join('\n') : '- No chapters configured'}

GRAPH STATE:
${state.graphState ? `- Graph Nodes: ${state.graphState.nodes?.length || 0} nodes
- Graph Edges: ${state.graphState.edges?.length || 0} connections
- Selected Node: ${state.graphState.selectedNodeId || 'None'}
- Graph Layout: ${state.graphState.layout || 'Auto'}` : '- No graph state available'}

SESSION METADATA:
- Session Type: AI-Frames Interactive Learning
- User Interaction: ${state.isCreationMode ? 'Content Creation' : 'Content Learning'}
- Interface Mode: ${state.showGraphView ? 'Visual Graph Interface' : 'Linear Sequential Interface'}
- Session Duration: Active since ${sessionState.createdAt}
- Last Activity: ${sessionState.updatedAt}
`;

    const document = {
      id: sessionState.id,
      title: `AI-Frames Session - ${state.isCreationMode ? 'Creator' : 'Learning'} Mode`,
      content: sessionContent,
      metadata: {
        filename: `session_state_${this.sessionId}.json`,
        filesize: JSON.stringify(sessionState).length,
        filetype: 'application/json',
        uploadedAt: sessionState.updatedAt,
        source: 'graph-storage',
        description: `Session state for ${this.sessionId}`,
        isGenerated: true,
        type: 'session-state', 
        name: this.sessionId,
        category: 'graph-storage',
        fullObject: JSON.stringify(sessionState),
      },
      chunks: [],
      vectors: [],
    };

    await this.vectorStore.insertDocument(document);
    // console.log(`💾 Session state saved to IndexedDB: ${sessionState.id}`);
    
    return sessionState.id;
  }

  async loadSessionState(sessionId?: string): Promise<SessionState | null> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    try {
      const targetSessionId = sessionId || this.sessionId;
      const documentId = this.generateDocumentId('session');
      
      const document = await this.vectorStore.getDocument(documentId);
      
      if (document && document.metadata.fullObject) {
        const sessionState = JSON.parse(document.metadata.fullObject as string) as SessionState;
        console.log(`📊 Session state loaded from IndexedDB: ${sessionState.id}`);
        return sessionState;
      }
      
      console.log(`ℹ️ No session state found for session: ${targetSessionId}`);
      return null;
    } catch (error) {
      console.error('❌ Failed to load session state:', error);
      return null;
    }
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  async getAllSessions(): Promise<string[]> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    try {
      const allDocuments = await this.vectorStore.getAllDocuments();
      const graphStorageDocs = allDocuments.filter(doc => 
        doc.metadata.source === 'graph-storage' && 
        doc.metadata.type === 'session-state'
      );
      
      const sessionIds = graphStorageDocs.map(doc => doc.metadata.name as string);
      return [...new Set(sessionIds)].sort().reverse(); // Newest first
    } catch (error) {
      console.error('❌ Failed to get all sessions:', error);
      return [];
    }
  }

  async clearSession(sessionId?: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('GraphStorageManager not initialized');
    }

    try {
      const targetSessionId = sessionId || this.sessionId;
      const allDocuments = await this.vectorStore.getAllDocuments();
      const sessionDocs = allDocuments.filter(doc => 
        doc.metadata.source === 'graph-storage' && 
        doc.metadata.name === targetSessionId
      );
      
      for (const doc of sessionDocs) {
        await this.vectorStore.deleteDocument(doc.id);
      }
      
      console.log(`🗑️ Cleared session data: ${targetSessionId} (${sessionDocs.length} documents)`);
    } catch (error) {
      console.error('❌ Failed to clear session:', error);
      throw error;
    }
  }

  getCurrentSessionId(): string {
    return this.sessionId;
  }

  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
    console.log(`🔄 GraphStorageManager session ID changed to: ${sessionId}`);
  }
}

// Singleton instance management
let graphStorageManagerInstance: GraphStorageManager | null = null;

export async function getGraphStorageManager(vectorStore: VectorStore): Promise<GraphStorageManager> {
  if (!graphStorageManagerInstance) {
    // FIXED: Wait for VectorStore to be fully initialized with retry mechanism
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!vectorStore.initialized && attempts < maxAttempts) {
      console.log(`⏳ Waiting for VectorStore to be initialized (attempt ${attempts + 1}/${maxAttempts})`);
      await new Promise(resolve => setTimeout(resolve, 200));
      attempts++;
    }
    
    if (!vectorStore.initialized) {
      throw new Error('VectorStore initialization timeout - could not initialize GraphStorageManager');
    }
    
    graphStorageManagerInstance = new GraphStorageManager(vectorStore);
    await graphStorageManagerInstance.initialize();
  }
  return graphStorageManagerInstance;
}

export function resetGraphStorageManager(): void {
  graphStorageManagerInstance = null;
} 