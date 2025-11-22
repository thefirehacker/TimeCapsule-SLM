/**
 * Knowledge Base Session Store
 * Manages Flow Builder sessions in IndexedDB via VectorStore
 * Supports AI Flow, SWE Bridge, and Manual workflows
 */

import type {
  FlowSession,
  SessionDocument,
  SessionSource,
} from "@/app/ai-frames/types/session";
import type { VectorStore } from "@/components/VectorStore/VectorStore";

/**
 * Session Store - manages Flow Builder sessions in KB
 */
export class SessionStore {
  private vectorStore: VectorStore;
  private initialized: boolean = false;

  constructor(vectorStore: VectorStore) {
    this.vectorStore = vectorStore;
  }

  /**
   * Initialize the session store
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    // Ensure VectorStore is ready
    this.initialized = true;
    console.log("📦 SessionStore initialized");
  }

  /**
   * Save a session to KB
   */
  async saveSession(session: FlowSession): Promise<void> {
    try {
      const docId = `session_${session.id}`;
      const content = JSON.stringify(session);
      
      const documentData: any = {
        id: docId,
        title: session.name,
        content: content,
        metadata: {
          filename: session.name,
          filesize: content.length,
          filetype: 'application/json',
          uploadedAt: session.updatedAt,
          source: session.source,
          description: `Flow session: ${session.name}`,
          isGenerated: false,
          documentType: 'flow-session' as const,
          sessionId: session.id,
          sessionSource: session.source,
          sessionStatus: session.status,
        },
        chunks: [
          {
            id: `chunk_${docId}_0`,
            content: content,
            startIndex: 0,
            endIndex: content.length,
            pageNumber: null,
            sectionTitle: null,
            embedding: null,
        },
        ],
        vectors: [],
      };

      await this.vectorStore.upsertDocument(documentData);
      console.log(`💾 Session saved: ${session.name} (${session.id})`);
    } catch (error) {
      console.error("❌ Failed to save session:", error);
      throw error;
    }
  }

  /**
   * Load a session from KB
   */
  async loadSession(sessionId: string): Promise<FlowSession | null> {
    try {
      const docId = `session_${sessionId}`;
      const docs = await this.vectorStore.getAllDocuments();
      const doc = docs.find((d) => d.id === docId);

      if (!doc) {
        console.warn(`⚠️ Session not found: ${sessionId}`);
        return null;
      }

      const session = JSON.parse(doc.content) as FlowSession;
      console.log(`📂 Session loaded: ${session.name} (${sessionId})`);
      return session;
    } catch (error) {
      console.error("❌ Failed to load session:", error);
      return null;
    }
  }

  /**
   * List all sessions
   */
  async listSessions(): Promise<FlowSession[]> {
    try {
      const docs = await this.vectorStore.getAllDocuments();
      const sessionDocs = docs.filter(
        (d) => d.id.startsWith("session_") && d.metadata?.documentType === 'flow-session'
      );

      const sessions = sessionDocs
        .map((doc) => {
          try {
            return JSON.parse(doc.content) as FlowSession;
          } catch {
            return null;
          }
        })
        .filter((s): s is FlowSession => s !== null)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      console.log(`📋 Loaded ${sessions.length} sessions`);
      return sessions;
    } catch (error) {
      console.error("❌ Failed to list sessions:", error);
      return [];
    }
  }

  /**
   * Delete a session
   */
  async deleteSession(sessionId: string): Promise<void> {
    try {
      const docId = `session_${sessionId}`;
      await this.vectorStore.deleteDocument(docId);
      console.log(`🗑️ Session deleted: ${sessionId}`);
    } catch (error) {
      console.error("❌ Failed to delete session:", error);
      throw error;
    }
  }

  /**
   * Update session name
   */
  async updateSessionName(
    sessionId: string,
    newName: string
  ): Promise<void> {
    try {
      const session = await this.loadSession(sessionId);
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.name = newName;
      session.updatedAt = new Date().toISOString();
      await this.saveSession(session);

      console.log(`✏️ Session renamed: ${sessionId} → "${newName}"`);
    } catch (error) {
      console.error("❌ Failed to update session name:", error);
      throw error;
    }
  }

  /**
   * Update session status
   */
  async updateSessionStatus(
    sessionId: string,
    status: FlowSession["status"]
  ): Promise<void> {
    try {
      const session = await this.loadSession(sessionId);
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.status = status;
      session.updatedAt = new Date().toISOString();
      await this.saveSession(session);

      console.log(`📊 Session status updated: ${sessionId} → ${status}`);
    } catch (error) {
      console.error("❌ Failed to update session status:", error);
      throw error;
    }
  }

  /**
   * Create a new session
   */
  createNewSession(
    source: SessionSource,
    name?: string
  ): FlowSession {
    const timestamp = new Date().toISOString();
    const defaultName =
      name ||
      {
        "ai-flow": `AI Flow ${new Date().toLocaleString()}`,
        "swe-bridge": `SWE Bridge ${new Date().toLocaleString()}`,
        manual: `Manual Session ${new Date().toLocaleString()}`,
      }[source];

    return {
      id: `${source}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: defaultName,
      source,
      status: "draft",
      createdAt: timestamp,
      updatedAt: timestamp,
      frameCount: 0,
      acceptedFrameCount: 0,
      plan: null,
      frameDrafts: [],
      sessionState: {
        id: `state_${Date.now()}`,
        mode: "freeform",
        prompt: "",
        createdAt: timestamp,
        updatedAt: timestamp,
        currentFrameId: null,
        unlockedFrameIds: [],
        completedFrameIds: [],
        quizHistory: {},
        remediationMap: {},
        masteryPercent: 0,
        totalFrames: 0,
      },
      frameSources: {
        manual: 0,
        "ai-flow": 0,
        "swe-bridge": 0,
      },
    };
  }

  /**
   * Build searchable text from session for KB indexing
   */
  private buildSearchableText(session: FlowSession): string {
    const parts: string[] = [
      session.name,
      session.source,
      session.status,
      ...(session.plan?.chapters.map((c: any) => c.title) || []),
      ...session.frameDrafts.map((f) => f.title),
    ];
    return parts.filter(Boolean).join(" ");
  }
}

/**
 * Get or create singleton SessionStore instance
 */
let sessionStoreInstance: SessionStore | null = null;

export function getSessionStore(vectorStore: VectorStore): SessionStore {
  if (!sessionStoreInstance) {
    sessionStoreInstance = new SessionStore(vectorStore);
  }
  return sessionStoreInstance;
}

