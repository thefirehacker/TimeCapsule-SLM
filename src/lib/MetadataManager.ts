import {
  BubblSpace,
  TimeCapsuleMetadata,
  EnhancedTimeCapsule,
  ImportOptions,
  ImportResult,
  BubblSpaceManager,
  TimeCapsuleManager,
  MetadataStorage,
  generateUniqueId,
  DEFAULT_BUBBLSPACE,
  DEFAULT_TIMECAPSULE,
  validateBubblSpace,
  validateTimeCapsule,
  MetadataUtils,
} from '../types/timecapsule';

/**
 * Comprehensive metadata management service for BubblSpaces and TimeCapsules
 */
export class MetadataManager implements BubblSpaceManager, TimeCapsuleManager, MetadataStorage {
  private bubblSpaces: Map<string, BubblSpace> = new Map();
  private timeCapsules: Map<string, TimeCapsuleMetadata> = new Map();
  private vectorStore: any = null; // Will be injected
  
  constructor(vectorStore?: any) {
    this.vectorStore = vectorStore;
    this.initializeStorage();
  }

  // =============================================================================
  // INITIALIZATION & STORAGE
  // =============================================================================

  private async initializeStorage() {
    try {
      // Load from localStorage first
      await this.loadBubblSpaces();
      await this.loadTimeCapsules();
      
      // Ensure default BubblSpace exists
      if (this.bubblSpaces.size === 0) {
        this.createDefaultBubblSpace();
      }
      
      // Sync with vector store if available
      if (this.vectorStore) {
        await this.syncWithVectorStore();
      }
    } catch (error) {
      console.error('Failed to initialize metadata storage:', error);
      this.createDefaultBubblSpace();
    }
  }

  private createDefaultBubblSpace(): BubblSpace {
    const defaultSpace = this.createBubblSpace(
      'My First BubblSpace',
      'Welcome to your learning and research workspace!',
      { isDefault: true, color: '#6366F1' }
    );
    return defaultSpace;
  }

  // =============================================================================
  // BUBBLSPACE MANAGEMENT
  // =============================================================================

  createBubblSpace(name: string, description: string, options: Partial<BubblSpace> = {}): BubblSpace {
    const errors = validateBubblSpace({ name, description, ...options });
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    const bubblSpace: BubblSpace = {
      id: generateUniqueId('bubbl'),
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...DEFAULT_BUBBLSPACE,
      ...options,
    };

    // If this is set as default, unset other defaults
    if (bubblSpace.isDefault) {
      this.bubblSpaces.forEach(space => {
        if (space.isDefault) {
          space.isDefault = false;
          space.updatedAt = new Date().toISOString();
        }
      });
    }

    this.bubblSpaces.set(bubblSpace.id, bubblSpace);
    this.saveBubblSpaces(Array.from(this.bubblSpaces.values()));
    
    // Auto-sync to Knowledge Base when BubblSpace is created
    if (this.vectorStore && this.vectorStore.initialized) {
      this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      ).catch(error => {
        console.warn('Failed to sync BubblSpace to Knowledge Base:', error);
      });
    }
    
    return bubblSpace;
  }

  updateBubblSpace(id: string, updates: Partial<BubblSpace>): BubblSpace {
    const existing = this.bubblSpaces.get(id);
    if (!existing) {
      throw new Error(`BubblSpace with id ${id} not found`);
    }

    const updated = {
      ...existing,
      ...updates,
      id, // Prevent ID changes
      updatedAt: new Date().toISOString(),
    };

    const errors = validateBubblSpace(updated);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    // Handle default setting
    if (updated.isDefault && !existing.isDefault) {
      this.bubblSpaces.forEach(space => {
        if (space.id !== id && space.isDefault) {
          space.isDefault = false;
          space.updatedAt = new Date().toISOString();
        }
      });
    }

    this.bubblSpaces.set(id, updated);
    this.saveBubblSpaces(Array.from(this.bubblSpaces.values()));
    
    // Auto-sync to Knowledge Base when BubblSpace is updated
    if (this.vectorStore && this.vectorStore.initialized) {
      this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      ).catch(error => {
        console.warn('Failed to sync updated BubblSpace to Knowledge Base:', error);
      });
    }
    
    return updated;
  }

  deleteBubblSpace(id: string): boolean {
    const bubblSpace = this.bubblSpaces.get(id);
    if (!bubblSpace) return false;

    // Prevent deletion of default BubblSpace if it's the only one
    if (bubblSpace.isDefault && this.bubblSpaces.size === 1) {
      throw new Error('Cannot delete the only BubblSpace. Create another one first.');
    }

    // Delete associated TimeCapsules
    const associatedTimeCapsules = Array.from(this.timeCapsules.values())
      .filter(tc => tc.bubblSpaceId === id);
    
    associatedTimeCapsules.forEach(tc => this.deleteTimeCapsule(tc.id));

    // Delete BubblSpace
    this.bubblSpaces.delete(id);
    
    // If we deleted the default, set another as default
    if (bubblSpace.isDefault && this.bubblSpaces.size > 0) {
      const firstSpace = Array.from(this.bubblSpaces.values())[0];
      this.updateBubblSpace(firstSpace.id, { isDefault: true });
    }

    this.saveBubblSpaces(Array.from(this.bubblSpaces.values()));
    return true;
  }

  getBubblSpace(id: string): BubblSpace | null {
    return this.bubblSpaces.get(id) || null;
  }

  getAllBubblSpaces(): BubblSpace[] {
    return Array.from(this.bubblSpaces.values())
      .sort((a, b) => {
        // Default first, then by creation date
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  setDefaultBubblSpace(id: string): void {
    const bubblSpace = this.bubblSpaces.get(id);
    if (!bubblSpace) {
      throw new Error(`BubblSpace with id ${id} not found`);
    }
    this.updateBubblSpace(id, { isDefault: true });
  }

  getDefaultBubblSpace(): BubblSpace | null {
    return Array.from(this.bubblSpaces.values()).find(space => space.isDefault) || null;
  }

  searchBubblSpaces(query: string): BubblSpace[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.bubblSpaces.values()).filter(space =>
      space.name.toLowerCase().includes(lowercaseQuery) ||
      space.description.toLowerCase().includes(lowercaseQuery) ||
      space.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // =============================================================================
  // TIMECAPSULE MANAGEMENT
  // =============================================================================

  createTimeCapsule(
    name: string,
    description: string,
    bubblSpaceId: string,
    options: Partial<TimeCapsuleMetadata> = {}
  ): TimeCapsuleMetadata {
    if (!this.bubblSpaces.has(bubblSpaceId)) {
      throw new Error(`BubblSpace with id ${bubblSpaceId} not found`);
    }

    const timeCapsule: TimeCapsuleMetadata = {
      id: generateUniqueId('TC'),
      name: name.trim(),
      description: description.trim(),
      bubblSpaceId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0.0',
      ...DEFAULT_TIMECAPSULE,
      ...options,
    };

    const errors = validateTimeCapsule(timeCapsule);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    this.timeCapsules.set(timeCapsule.id, timeCapsule);
    this.saveTimeCapsules(Array.from(this.timeCapsules.values()));
    
    // Auto-sync to Knowledge Base when TimeCapsule is created
    if (this.vectorStore && this.vectorStore.initialized) {
      this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      ).catch(error => {
        console.warn('Failed to sync TimeCapsule to Knowledge Base:', error);
      });
    }
    
    return timeCapsule;
  }

  updateTimeCapsule(id: string, updates: Partial<TimeCapsuleMetadata>): TimeCapsuleMetadata {
    const existing = this.timeCapsules.get(id);
    if (!existing) {
      throw new Error(`TimeCapsule with id ${id} not found`);
    }

    const updated = {
      ...existing,
      ...updates,
      id, // Prevent ID changes
      updatedAt: new Date().toISOString(),
    };

    const errors = validateTimeCapsule(updated);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    this.timeCapsules.set(id, updated);
    this.saveTimeCapsules(Array.from(this.timeCapsules.values()));
    
    // Auto-sync to Knowledge Base when TimeCapsule is updated
    if (this.vectorStore && this.vectorStore.initialized) {
      this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      ).catch(error => {
        console.warn('Failed to sync updated TimeCapsule to Knowledge Base:', error);
      });
    }
    
    return updated;
  }

  deleteTimeCapsule(id: string): boolean {
    if (!this.timeCapsules.has(id)) return false;
    
    this.timeCapsules.delete(id);
    this.saveTimeCapsules(Array.from(this.timeCapsules.values()));
    return true;
  }

  getTimeCapsule(id: string): TimeCapsuleMetadata | null {
    return this.timeCapsules.get(id) || null;
  }

  getTimeCapsulesByBubblSpace(bubblSpaceId: string): TimeCapsuleMetadata[] {
    return Array.from(this.timeCapsules.values())
      .filter(tc => tc.bubblSpaceId === bubblSpaceId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  getAllTimeCapsules(): TimeCapsuleMetadata[] {
    return Array.from(this.timeCapsules.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  searchTimeCapsules(query: string): TimeCapsuleMetadata[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.timeCapsules.values()).filter(tc =>
      tc.name.toLowerCase().includes(lowercaseQuery) ||
      tc.description.toLowerCase().includes(lowercaseQuery) ||
      tc.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  getRecentTimeCapsules(limit = 10): TimeCapsuleMetadata[] {
    return this.getAllTimeCapsules().slice(0, limit);
  }

  // =============================================================================
  // EXPORT/IMPORT OPERATIONS
  // =============================================================================

  async exportTimeCapsule(id: string, options: Partial<ImportOptions> = {}): Promise<EnhancedTimeCapsule> {
    const timeCapsule = this.getTimeCapsule(id);
    if (!timeCapsule) {
      throw new Error(`TimeCapsule with id ${id} not found`);
    }

    const bubblSpace = this.getBubblSpace(timeCapsule.bubblSpaceId);
    if (!bubblSpace) {
      throw new Error(`BubblSpace with id ${timeCapsule.bubblSpaceId} not found`);
    }

    // Gather all data based on current application state
    const enhancedTimeCapsule: EnhancedTimeCapsule = {
      timeCapsuleMetadata: timeCapsule,
      bubblSpace,
      metadata: {
        version: '5.0.0',
        exportedAt: new Date().toISOString(),
        platform: 'Next.js',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
        exportType: 'combined',
      },
    };

    // Add research data if available
    const deepResearchData = this.getStoredData('deepresearch_data');
    if (deepResearchData) {
      enhancedTimeCapsule.research = deepResearchData.research;
    }

    // Add AI-Frames data if available
    const aiFramesData = this.getStoredData('ai_frames_timecapsule');
    if (aiFramesData) {
      enhancedTimeCapsule.aiFramesData = aiFramesData.data;
    }

    // Add vector store data if available and not too large
    if (this.vectorStore) {
      try {
        const documents = await this.vectorStore.getAllDocuments();
        const stats = await this.vectorStore.getStats();
        
        // Only include if reasonable size (< 50MB estimated)
        const estimatedSize = JSON.stringify(documents).length;
        if (estimatedSize < 50 * 1024 * 1024) {
          enhancedTimeCapsule.vectorStore = {
            documents,
            stats,
            exportedAt: new Date().toISOString(),
          };
        }
      } catch (error) {
        console.warn('Failed to export vector store data:', error);
      }
    }

    // Calculate file size
    const dataString = JSON.stringify(enhancedTimeCapsule);
    enhancedTimeCapsule.metadata.fileSize = new Blob([dataString]).size;

    return enhancedTimeCapsule;
  }

  async importTimeCapsule(data: EnhancedTimeCapsule, options: ImportOptions): Promise<ImportResult> {
    const result: ImportResult = {
      success: false,
      message: '',
      details: {
        itemsImported: {},
      },
    };

    try {
      // Create backup if requested
      let backupCreated = '';
      if (options.backupExisting) {
        backupCreated = await this.createBackup(
          MetadataUtils.generateBackupName(
            data.bubblSpace.name,
            data.timeCapsuleMetadata.name
          )
        );
        result.details.backupCreated = backupCreated;
      }

      // Import BubblSpace
      if (options.selectiveImport.bubblSpace) {
        const existingBubblSpace = this.getBubblSpace(data.bubblSpace.id);
        if (options.mode === 'replace' || !existingBubblSpace) {
          this.bubblSpaces.set(data.bubblSpace.id, data.bubblSpace);
          result.details.bubblSpaceCreated = !existingBubblSpace;
        }
      }

      // Import TimeCapsule metadata
      if (options.selectiveImport.timeCapsuleMetadata) {
        this.timeCapsules.set(data.timeCapsuleMetadata.id, data.timeCapsuleMetadata);
        result.details.timeCapsuleImported = true;
      }

      // Import research data
      if (options.selectiveImport.research && data.research) {
        this.setStoredData('deepresearch_data', { research: data.research });
        result.details.itemsImported.topics = data.research.topics?.length || 0;
        result.details.itemsImported.researchResults = data.research.researchResults ? 1 : 0;
      }

      // Import AI-Frames data
      if (options.selectiveImport.aiFrames && data.aiFramesData) {
        this.setStoredData('ai_frames_timecapsule', { data: data.aiFramesData });
        result.details.itemsImported.frames = data.aiFramesData.frames?.length || 0;
      }

      // Import vector store data
      if (options.selectiveImport.vectorStore && data.vectorStore && this.vectorStore) {
        if (options.mode === 'replace') {
          await this.vectorStore.clear();
        }
        
        for (const doc of data.vectorStore.documents) {
          await this.vectorStore.insertDocument(doc);
        }
        result.details.itemsImported.documents = data.vectorStore.documents.length;
      }

      // Save all changes
      await this.saveBubblSpaces(Array.from(this.bubblSpaces.values()));
      await this.saveTimeCapsules(Array.from(this.timeCapsules.values()));
      
      if (this.vectorStore) {
        await this.saveMetadataToVectorStore(
          Array.from(this.bubblSpaces.values()),
          Array.from(this.timeCapsules.values())
        );
      }

      result.success = true;
      result.message = `Successfully imported TimeCapsule "${data.timeCapsuleMetadata.name}"`;
      
    } catch (error) {
      result.success = false;
      result.message = `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    return result;
  }

  // =============================================================================
  // STORAGE OPERATIONS
  // =============================================================================

  async saveBubblSpaces(bubblSpaces: BubblSpace[]): Promise<void> {
    try {
      localStorage.setItem('bubblspaces_metadata', JSON.stringify(bubblSpaces));
      this.bubblSpaces.clear();
      bubblSpaces.forEach(space => this.bubblSpaces.set(space.id, space));
    } catch (error) {
      console.error('Failed to save BubblSpaces:', error);
    }
  }

  async loadBubblSpaces(): Promise<BubblSpace[]> {
    try {
      const stored = localStorage.getItem('bubblspaces_metadata');
      if (stored) {
        const bubblSpaces = JSON.parse(stored) as BubblSpace[];
        this.bubblSpaces.clear();
        bubblSpaces.forEach(space => this.bubblSpaces.set(space.id, space));
        return bubblSpaces;
      }
    } catch (error) {
      console.error('Failed to load BubblSpaces:', error);
    }
    return [];
  }

  async saveTimeCapsules(timeCapsules: TimeCapsuleMetadata[]): Promise<void> {
    try {
      localStorage.setItem('timecapsules_metadata', JSON.stringify(timeCapsules));
      this.timeCapsules.clear();
      timeCapsules.forEach(tc => this.timeCapsules.set(tc.id, tc));
    } catch (error) {
      console.error('Failed to save TimeCapsules:', error);
    }
  }

  async loadTimeCapsules(): Promise<TimeCapsuleMetadata[]> {
    try {
      const stored = localStorage.getItem('timecapsules_metadata');
      if (stored) {
        const timeCapsules = JSON.parse(stored) as TimeCapsuleMetadata[];
        this.timeCapsules.clear();
        timeCapsules.forEach(tc => this.timeCapsules.set(tc.id, tc));
        return timeCapsules;
      }
    } catch (error) {
      console.error('Failed to load TimeCapsules:', error);
    }
    return [];
  }

  async saveMetadataToVectorStore(bubblSpaces: BubblSpace[], timeCapsules: TimeCapsuleMetadata[]): Promise<void> {
    if (!this.vectorStore || !this.vectorStore.initialized) {
      console.log('📋 Vector store not ready for metadata sync, skipping...');
      return;
    }

    try {
      // Store BubblSpaces as searchable documents
      for (const space of bubblSpaces) {
        const doc = {
          id: `bubblspace-${space.id}`,
          title: `BubblSpace: ${space.name}`, // Required by VectorStore schema
          content: `BubblSpace: ${space.name}\nDescription: ${space.description}\nTags: ${space.tags?.join(', ') || 'none'}`,
          metadata: {
            filename: `bubblspace-${space.name}.json`,
            filesize: JSON.stringify(space).length,
            filetype: 'application/json',
            uploadedAt: space.createdAt,
            source: 'metadata',
            description: `BubblSpace metadata: ${space.name}`,
            isGenerated: true,
            // Custom metadata for BubblSpace
            type: 'bubblspace',
            bubblSpaceId: space.id,
            name: space.name,
            createdAt: space.createdAt,
          },
          chunks: [], // Required by VectorStore schema
          vectors: [], // Required by VectorStore schema
        };
        await this.vectorStore.insertDocument(doc);
      }

      // Store TimeCapsules as searchable documents
      for (const tc of timeCapsules) {
        const doc = {
          id: `timecapsule-${tc.id}`,
          title: `TimeCapsule: ${tc.name}`, // Required by VectorStore schema
          content: `TimeCapsule: ${tc.name}\nDescription: ${tc.description}\nCategory: ${tc.category}\nTags: ${tc.tags?.join(', ') || 'none'}`,
          metadata: {
            filename: `timecapsule-${tc.name}.json`,
            filesize: JSON.stringify(tc).length,
            filetype: 'application/json',
            uploadedAt: tc.createdAt,
            source: 'metadata',
            description: `TimeCapsule metadata: ${tc.name}`,
            isGenerated: true,
            // Custom metadata for TimeCapsule
            type: 'timecapsule',
            timeCapsuleId: tc.id,
            bubblSpaceId: tc.bubblSpaceId,
            name: tc.name,
            category: tc.category,
            createdAt: tc.createdAt,
          },
          chunks: [], // Required by VectorStore schema
          vectors: [], // Required by VectorStore schema
        };
        await this.vectorStore.insertDocument(doc);
      }
    } catch (error) {
      console.error('Failed to save metadata to vector store:', error);
    }
  }

  async searchMetadataInVectorStore(query: string): Promise<any[]> {
    if (!this.vectorStore || !this.vectorStore.initialized) return [];
    
    try {
      // Use the correct searchSimilar method signature (query, threshold, limit)
      const results = await this.vectorStore.searchSimilar(query, 0.3, 20);
      
      // Filter results to only include metadata documents
      const metadataResults = results.filter((result: any) => 
        result.document?.metadata?.type === 'bubblspace' || 
        result.document?.metadata?.type === 'timecapsule'
      );
      
      return metadataResults;
    } catch (error) {
      console.error('Failed to search metadata in vector store:', error);
      return [];
    }
  }

  async createBackup(name: string): Promise<string> {
    const backupData = {
      timestamp: new Date().toISOString(),
      bubblSpaces: Array.from(this.bubblSpaces.values()),
      timeCapsules: Array.from(this.timeCapsules.values()),
      deepResearchData: this.getStoredData('deepresearch_data'),
      aiFramesData: this.getStoredData('ai_frames_timecapsule'),
    };

    const backupId = `backup-${Date.now()}`;
    localStorage.setItem(`backup_${backupId}`, JSON.stringify(backupData));
    
    return backupId;
  }

  async restoreFromBackup(backupId: string): Promise<boolean> {
    try {
      const backupData = localStorage.getItem(`backup_${backupId}`);
      if (!backupData) return false;

      const parsed = JSON.parse(backupData);
      
      // Restore metadata
      if (parsed.bubblSpaces) {
        await this.saveBubblSpaces(parsed.bubblSpaces);
      }
      
      if (parsed.timeCapsules) {
        await this.saveTimeCapsules(parsed.timeCapsules);
      }

      // Restore application data
      if (parsed.deepResearchData) {
        this.setStoredData('deepresearch_data', parsed.deepResearchData);
      }

      if (parsed.aiFramesData) {
        this.setStoredData('ai_frames_timecapsule', parsed.aiFramesData);
      }

      return true;
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      return false;
    }
  }

  async listBackups(): Promise<string[]> {
    const backups: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('backup_')) {
        backups.push(key.replace('backup_', ''));
      }
    }
    return backups.sort().reverse(); // Newest first
  }

  // =============================================================================
  // UTILITIES
  // =============================================================================

  private getStoredData(key: string): any {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private setStoredData(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to store data for key ${key}:`, error);
    }
  }

  private async syncWithVectorStore(): Promise<void> {
    if (!this.vectorStore || !this.vectorStore.initialized) {
      console.log('📋 Vector store not ready for sync, will retry later...');
      return;
    }
    
    try {
      console.log('📋 Syncing metadata with vector store...');
      await this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      );
      console.log('✅ Metadata synced with vector store');
    } catch (error) {
      console.error('Failed to sync with vector store:', error);
    }
  }

  // Public getter for external access
  setVectorStore(vectorStore: any): void {
    this.vectorStore = vectorStore;
    
    // Only sync if the vector store is already initialized
    if (vectorStore && vectorStore.initialized) {
      this.syncWithVectorStore();
    } else if (vectorStore) {
      console.log('📋 Vector store set but not initialized yet, will sync when ready');
      
      // Poll for initialization (with exponential backoff)
      let attempts = 0;
      const maxAttempts = 20;
      const checkInterval = () => setTimeout(() => {
        attempts++;
        if (this.vectorStore?.initialized) {
          console.log('✅ Vector store now ready, syncing metadata...');
          this.syncWithVectorStore();
        } else if (attempts < maxAttempts) {
          checkInterval();
        } else {
          console.warn('⚠️ Vector store initialization timeout, metadata will not be synced');
        }
      }, Math.min(1000 * Math.pow(1.5, attempts), 5000)); // Exponential backoff capped at 5 seconds
      
      checkInterval();
    }
  }
}

// Singleton instance
let metadataManagerInstance: MetadataManager | null = null;

export function getMetadataManager(vectorStore?: any): MetadataManager {
  if (!metadataManagerInstance) {
    metadataManagerInstance = new MetadataManager(vectorStore);
  } else if (vectorStore && !metadataManagerInstance['vectorStore']) {
    metadataManagerInstance.setVectorStore(vectorStore);
  }
  return metadataManagerInstance;
} 