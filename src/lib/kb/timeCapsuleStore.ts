/**
 * TimeCapsuleStore: Manages TimeCapsule lifecycle and persistence
 * 
 * Stores TimeCapsules in VectorStore with documentType: 'timecapsule'
 */

import { TimeCapsule, TimeCapsuleUpdateInput } from './types/timecapsule';
import { VectorStore } from '@/components/VectorStore/VectorStore';

export class TimeCapsuleStore {
  private vectorStore: VectorStore;

  constructor(vectorStore: VectorStore) {
    this.vectorStore = vectorStore;
  }

  /**
   * Create a new TimeCapsule
   */
  async createTimeCapsule(name: string, description: string): Promise<TimeCapsule> {
    const now = new Date().toISOString();
    const id = `timecapsule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const timeCapsule: TimeCapsule = {
      id,
      name,
      description,
      createdAt: now,
      updatedAt: now,
      frameCount: 0,
      documentCount: 0,
      settings: {
        defaultView: 'split',
      },
    };

    // Store in VectorStore
    await this.vectorStore.upsertDocument({
      id,
      title: name,
      content: `TimeCapsule: ${name}\n\nDescription: ${description}`,
      metadata: {
        ...timeCapsule,
        documentType: 'timecapsule' as any,
      } as any,
      chunks: [],
      vectors: [],
    });

    console.log('✅ TimeCapsule created:', { id, name });
    return timeCapsule;
  }

  /**
   * Get a single TimeCapsule by ID
   */
  async getTimeCapsule(id: string): Promise<TimeCapsule | null> {
    try {
      const doc = await this.vectorStore.getDocument(id);
      if (!doc || doc.metadata.documentType !== 'timecapsule') {
        return null;
      }

      return this.extractTimeCapsule(doc.metadata);
    } catch (error) {
      console.error('Error getting TimeCapsule:', error);
      return null;
    }
  }

  /**
   * List all TimeCapsules
   */
  async listTimeCapsules(): Promise<TimeCapsule[]> {
    try {
      const docs = await this.vectorStore.getAllDocuments();
      const timeCapsules = docs
        .filter(doc => doc.metadata.documentType === 'timecapsule')
        .map(doc => this.extractTimeCapsule(doc.metadata))
        .filter((tc): tc is TimeCapsule => tc !== null)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      console.log(`📋 Listed ${timeCapsules.length} TimeCapsules`);
      return timeCapsules;
    } catch (error) {
      console.error('Error listing TimeCapsules:', error);
      return [];
    }
  }

  /**
   * Update a TimeCapsule
   */
  async updateTimeCapsule(id: string, updates: TimeCapsuleUpdateInput): Promise<TimeCapsule | null> {
    try {
      const existing = await this.getTimeCapsule(id);
      if (!existing) {
        console.error('TimeCapsule not found:', id);
        return null;
      }

      const updated: TimeCapsule = {
        ...existing,
        ...updates,
        id, // Ensure ID doesn't change
        createdAt: existing.createdAt, // Preserve creation date
        updatedAt: new Date().toISOString(),
      };

      // Update in VectorStore
      await this.vectorStore.upsertDocument({
        id,
        title: updated.name,
        content: `TimeCapsule: ${updated.name}\n\nDescription: ${updated.description}`,
        metadata: {
          ...updated,
          documentType: 'timecapsule' as any,
        } as any,
        chunks: [],
        vectors: [],
      });

      console.log('✅ TimeCapsule updated:', { id, updates });
      return updated;
    } catch (error) {
      console.error('Error updating TimeCapsule:', error);
      return null;
    }
  }

  /**
   * Delete a TimeCapsule and CASCADE delete all related data
   * 
   * Deletes:
   * - All frames with this timeCapsuleId
   * - All sessions with this timeCapsuleId
   * - All KB documents with this timeCapsuleId
   * - The TimeCapsule itself
   */
  async deleteTimeCapsule(id: string): Promise<boolean> {
    try {
      console.log(`🗑️ Deleting TimeCapsule and all related data: ${id}`);

      // Get all documents
      const allDocs = await this.vectorStore.getAllDocuments();

      // Find all documents belonging to this TimeCapsule
      const relatedDocs = allDocs.filter(doc => 
        doc.metadata.timeCapsuleId === id || doc.id === id
      );

      console.log(`Found ${relatedDocs.length} documents to delete (including TimeCapsule itself)`);

      // Delete all related documents
      for (const doc of relatedDocs) {
        await this.vectorStore.deleteDocument(doc.id);
      }

      console.log(`✅ TimeCapsule deleted: ${id} (cascade deleted ${relatedDocs.length} documents)`);
      return true;
    } catch (error) {
      console.error('Error deleting TimeCapsule:', error);
      return false;
    }
  }

  /**
   * Update frame count for a TimeCapsule
   */
  async updateFrameCount(id: string): Promise<void> {
    try {
      const allDocs = await this.vectorStore.getAllDocuments();
      const frameCount = allDocs.filter(
        doc => (doc.metadata as any).documentType === 'aiframe' && doc.metadata.timeCapsuleId === id
      ).length;

      await this.updateTimeCapsule(id, { frameCount });
    } catch (error) {
      console.error('Error updating frame count:', error);
    }
  }

  /**
   * Update document count for a TimeCapsule
   */
  async updateDocumentCount(id: string): Promise<void> {
    try {
      const allDocs = await this.vectorStore.getAllDocuments();
      const documentCount = allDocs.filter(
        doc => 
          doc.metadata.timeCapsuleId === id && 
          (doc.metadata as any).documentType !== 'aiframe' &&
          doc.metadata.documentType !== 'timecapsule' &&
          doc.metadata.documentType !== 'flow-session'
      ).length;

      await this.updateTimeCapsule(id, { documentCount });
    } catch (error) {
      console.error('Error updating document count:', error);
    }
  }

  /**
   * Extract TimeCapsule from document metadata
   */
  private extractTimeCapsule(metadata: any): TimeCapsule | null {
    try {
      return {
        id: metadata.id,
        name: metadata.name || metadata.title || 'Untitled',
        description: metadata.description || '',
        createdAt: metadata.createdAt,
        updatedAt: metadata.updatedAt,
        frameCount: metadata.frameCount || 0,
        documentCount: metadata.documentCount || 0,
        settings: metadata.settings || { defaultView: 'split' },
      };
    } catch (error) {
      console.error('Error extracting TimeCapsule:', error);
      return null;
    }
  }
}

