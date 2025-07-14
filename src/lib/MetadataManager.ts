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
    
    // Create a default TimeCapsule for the new BubblSpace
    try {
      const defaultTimeCapsule = this.createTimeCapsule(
        'Getting Started',
        'Your first learning session',
        defaultSpace.id,
        {
          category: 'learning',
          difficulty: 'beginner',
          estimatedDuration: 30
        }
      );
      console.log(`✅ Created default BubblSpace "${defaultSpace.name}" and TimeCapsule "${defaultTimeCapsule.name}"`);
    } catch (timeCapsuleError) {
      console.warn('⚠️ Failed to create default TimeCapsule:', timeCapsuleError);
    }
    
    return defaultSpace;
  }

  // =============================================================================
  // BUBBLSPACE MANAGEMENT
  // =============================================================================

  createBubblSpace(name: string, description: string, options: Partial<BubblSpace> = {}): BubblSpace {
    // ENFORCE USER LIMITS: Maximum 1 BubblSpace allowed
    if (this.bubblSpaces.size >= 1 && !options.isDefault) {
      throw new Error('Maximum 1 BubblSpace allowed. Please edit your existing BubblSpace instead of creating a new one.');
    }
    
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
    
    // ENHANCED: Immediate sync to Knowledge Base when BubblSpace is created
    this.forceSyncToVectorStore().then(success => {
      if (success) {
        console.log(`✅ BubblSpace immediately synced to Knowledge Base: ${bubblSpace.name}`);
      } else {
        console.warn(`⚠️ BubblSpace sync deferred - VectorStore not ready: ${bubblSpace.name}`);
      }
    });
    
    // Dispatch custom event for same-page updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bubblspace-metadata-changed', {
        detail: { type: 'created', bubblSpace }
      }));
    }
    
    return bubblSpace;
  }

  updateBubblSpace(id: string, updates: Partial<BubblSpace>): BubblSpace {
    console.log(`🔄 MetadataManager.updateBubblSpace called for ID: ${id}`, updates);
    
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

    console.log(`📝 BubblSpace updated:`, {
      old: { name: existing.name, description: existing.description },
      new: { name: updated.name, description: updated.description }
    });

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
    console.log(`💾 BubblSpace saved to localStorage`);
    
    // ENHANCED: Immediate sync to Knowledge Base when BubblSpace is updated
    this.forceSyncToVectorStore().then(success => {
      if (success) {
        console.log(`✅ BubblSpace immediately synced to Knowledge Base: ${updated.name}`);
      } else {
        console.warn(`⚠️ BubblSpace sync deferred - VectorStore not ready: ${updated.name}`);
      }
    });
    
    // Dispatch custom event for same-page updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bubblspace-metadata-changed', {
        detail: { type: 'updated', bubblSpace: updated }
      }));
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

    // ENFORCE USER LIMITS: Maximum 3 TimeCapsules per BubblSpace
    const existingTimeCapsules = this.getTimeCapsulesByBubblSpace(bubblSpaceId);
    if (existingTimeCapsules.length >= 3) {
      throw new Error('Maximum 3 TimeCapsules allowed per BubblSpace. Please delete or edit existing TimeCapsules instead of creating new ones.');
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
    
    // ENHANCED: Immediate sync to Knowledge Base when TimeCapsule is created
    this.forceSyncToVectorStore().then(success => {
      if (success) {
        console.log(`✅ TimeCapsule immediately synced to Knowledge Base: ${timeCapsule.name}`);
      } else {
        console.warn(`⚠️ TimeCapsule sync deferred - VectorStore not ready: ${timeCapsule.name}`);
      }
    });
    
    // Dispatch custom event for same-page updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timecapsule-metadata-changed', {
        detail: { type: 'created', timeCapsule }
      }));
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
    
    // ENHANCED: Immediate sync to Knowledge Base when TimeCapsule is updated
    this.forceSyncToVectorStore().then(success => {
      if (success) {
        console.log(`✅ TimeCapsule immediately synced to Knowledge Base: ${updated.name}`);
      } else {
        console.warn(`⚠️ TimeCapsule sync deferred - VectorStore not ready: ${updated.name}`);
      }
    });
    
    // Dispatch custom event for same-page updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('timecapsule-metadata-changed', {
        detail: { type: 'updated', timeCapsule: updated }
      }));
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
      console.log('📋 Vector store not ready for metadata sync, skipping...', {
        hasVectorStore: !!this.vectorStore,
        isInitialized: this.vectorStore?.initialized,
        processingAvailable: this.vectorStore?.processingAvailable
      });
      return;
    }

    console.log('🔄 Starting enhanced metadata sync to Knowledge Base...', {
      bubblSpacesCount: bubblSpaces.length,
      timeCapslesCount: timeCapsules.length,
      vectorStoreStatus: {
        initialized: this.vectorStore.initialized,
        processingAvailable: this.vectorStore.processingAvailable
      }
    });
    
    let syncSuccessful = false;
    let syncErrors: string[] = [];
    let syncedItems = { bubblSpaces: 0, timeCapsules: 0 };

    try {
      // Store BubblSpaces as searchable documents with retry logic
      for (const space of bubblSpaces) {
        const docId = `bubblspace-${space.id}`;
        console.log(`📝 Syncing BubblSpace: ${space.name} (ID: ${docId})`);
        
        try {
          // Enhanced deletion with error handling
          try {
            await this.vectorStore.deleteDocument(docId);
            console.log(`🗑️ Deleted old BubblSpace document: ${docId}`);
          } catch (deleteError) {
            // Document might not exist, that's OK for first-time sync
            console.log(`ℹ️ Old BubblSpace document not found (first time sync): ${docId}`);
          }
          
          const contentText = `BubblSpace: ${space.name}
Description: ${space.description}
ID: ${space.id}
Created: ${new Date(space.createdAt).toLocaleString()}
Updated: ${new Date(space.updatedAt).toLocaleString()}
Color: ${space.color || 'default'}
Is Default: ${space.isDefault ? 'Yes' : 'No'}
Created By: ${space.createdBy || 'unknown'}
Tags: ${space.tags?.join(', ') || 'none'}`;

          const doc = {
            id: docId,
            title: `BubblSpace: ${space.name}`,
            content: contentText,
            metadata: {
              filename: `${space.name}.md`,
              filesize: contentText.length,
              filetype: 'text/markdown',
              uploadedAt: new Date().toISOString(),
              source: 'metadata',
              description: `BubblSpace metadata for ${space.name}`,
              isGenerated: true,
              bubblSpaceId: space.id,
              type: 'bubblspace',
              name: space.name,
              category: 'metadata',
              updatedAt: space.updatedAt
            },
            chunks: [],
            vectors: []
          };
          
          // Insert with retry logic
          let insertAttempts = 0;
          const maxInsertAttempts = 3;
          
          while (insertAttempts < maxInsertAttempts) {
            try {
              await this.vectorStore.insertDocument(doc);
              console.log(`✅ BubblSpace synced to Knowledge Base: ${space.name}`);
              
              // Verification step
              const verificationDoc = await this.vectorStore.getDocument(docId);
              if (verificationDoc) {
                console.log(`✅ BubblSpace persistence verified: ${space.name}`);
                syncedItems.bubblSpaces++;
                break; // Success, exit retry loop
              } else {
                throw new Error('Document not found after insertion');
              }
            } catch (insertError) {
              insertAttempts++;
              console.warn(`⚠️ BubblSpace sync attempt ${insertAttempts}/${maxInsertAttempts} failed:`, insertError);
              
              if (insertAttempts >= maxInsertAttempts) {
                throw insertError; // Final attempt failed
              }
              
              // Wait before retry (progressive delay)
              await new Promise(resolve => setTimeout(resolve, 500 * insertAttempts));
            }
          }
          
        } catch (spaceError) {
          const errorMessage = `BubblSpace ${space.name}: ${spaceError instanceof Error ? spaceError.message : String(spaceError)}`;
          console.error(`❌ Failed to sync BubblSpace ${space.name}:`, spaceError);
          syncErrors.push(errorMessage);
        }
      }

      // Store TimeCapsules as searchable documents with retry logic
      for (const tc of timeCapsules) {
        const docId = `timecapsule-${tc.id}`;
        console.log(`📝 Syncing TimeCapsule: ${tc.name} (ID: ${docId})`);
        
        try {
          // Enhanced deletion with error handling
          try {
            const existingDoc = await this.vectorStore.getDocument(docId);
            if (existingDoc) {
              console.log(`🗑️ Found existing TimeCapsule document, deleting: ${docId}`);
              await this.vectorStore.deleteDocument(docId);
              console.log(`✅ Deleted old TimeCapsule document: ${docId}`);
            } else {
              console.log(`ℹ️ No existing TimeCapsule document found (first time sync): ${docId}`);
            }
          } catch (deleteError) {
            console.warn(`⚠️ Error checking/deleting TimeCapsule document ${docId}:`, deleteError);
          }
          
          const contentText = `TimeCapsule: ${tc.name}
Description: ${tc.description}
ID: ${tc.id}
BubblSpace ID: ${tc.bubblSpaceId}
Version: ${tc.version}
Created: ${new Date(tc.createdAt).toLocaleString()}
Updated: ${new Date(tc.updatedAt).toLocaleString()}
Category: ${tc.category || 'other'}
Privacy: ${tc.privacy || 'private'}
Difficulty: ${tc.difficulty || 'beginner'}
Estimated Duration: ${tc.estimatedDuration ? `${tc.estimatedDuration} minutes` : 'not specified'}
Tags: ${tc.tags?.join(', ') || 'none'}`;

          const doc = {
            id: docId,
            title: `TimeCapsule: ${tc.name}`,
            content: contentText,
            metadata: {
              filename: `${tc.name}.md`,
              filesize: contentText.length,
              filetype: 'text/markdown',
              uploadedAt: new Date().toISOString(),
              source: 'metadata',
              description: `TimeCapsule metadata for ${tc.name}`,
              isGenerated: true,
              timeCapsuleId: tc.id,
              bubblSpaceId: tc.bubblSpaceId,
              type: 'timecapsule',
              name: tc.name,
              category: tc.category || 'other',
              updatedAt: tc.updatedAt
            },
            chunks: [],
            vectors: []
          };
          
          // Insert with retry logic
          let insertAttempts = 0;
          const maxInsertAttempts = 3;
          
          while (insertAttempts < maxInsertAttempts) {
            try {
              await this.vectorStore.insertDocument(doc);
              console.log(`✅ TimeCapsule synced to Knowledge Base: ${tc.name}`);
              
              // Verification step
              const verificationDoc = await this.vectorStore.getDocument(docId);
              if (verificationDoc) {
                console.log(`✅ TimeCapsule persistence verified: ${tc.name}`);
                syncedItems.timeCapsules++;
                break; // Success, exit retry loop
              } else {
                throw new Error('Document not found after insertion');
              }
            } catch (insertError) {
              insertAttempts++;
              console.warn(`⚠️ TimeCapsule sync attempt ${insertAttempts}/${maxInsertAttempts} failed:`, insertError);
              
              if (insertAttempts >= maxInsertAttempts) {
                throw insertError; // Final attempt failed
              }
              
              // Wait before retry (progressive delay)
              await new Promise(resolve => setTimeout(resolve, 500 * insertAttempts));
            }
          }
          
        } catch (tcError) {
          const errorMessage = `TimeCapsule ${tc.name}: ${tcError instanceof Error ? tcError.message : String(tcError)}`;
          console.error(`❌ Failed to sync TimeCapsule ${tc.name}:`, tcError);
          syncErrors.push(errorMessage);
        }
      }
      
      // Enhanced final verification and reporting
      if (syncErrors.length === 0) {
        syncSuccessful = true;
        console.log('✅ All metadata synced to Knowledge Base successfully', {
          syncedBubblSpaces: syncedItems.bubblSpaces,
          syncedTimeCapsules: syncedItems.timeCapsules,
          totalItems: syncedItems.bubblSpaces + syncedItems.timeCapsules
        });
      } else {
        const partialSuccess = syncedItems.bubblSpaces > 0 || syncedItems.timeCapsules > 0;
        console.warn(`⚠️ Metadata sync completed with ${syncErrors.length} errors (${partialSuccess ? 'partial success' : 'complete failure'}):`, {
          errors: syncErrors,
          syncedBubblSpaces: syncedItems.bubblSpaces,
          syncedTimeCapsules: syncedItems.timeCapsules,
          expectedBubblSpaces: bubblSpaces.length,
          expectedTimeCapsules: timeCapsules.length
        });
        
        if (!partialSuccess) {
          throw new Error(`Metadata sync completely failed: ${syncErrors.join(', ')}`);
        }
      }
      
    } catch (error) {
      console.error('❌ Failed to save metadata to vector store:', error);
      console.error('🔍 Vector store diagnostic info:', {
        hasVectorStore: !!this.vectorStore,
        isInitialized: this.vectorStore?.initialized,
        processingAvailable: this.vectorStore?.processingAvailable,
        errorDetails: error instanceof Error ? error.message : String(error)
      });
      throw error; // Re-throw to ensure caller knows about the failure
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

  // ENHANCED: Force sync method for immediate synchronization
  async forceSyncToVectorStore(): Promise<boolean> {
    if (!this.vectorStore?.initialized) {
      console.log('🔄 VectorStore not ready for force sync, will retry when ready...');
      
      // If not ready, start polling again
      this.startVectorStorePolling();
      return false;
    }

    try {
      console.log('🔄 Force syncing metadata to Knowledge Base...');
      await this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      );
      console.log('✅ Force metadata sync completed successfully');
      return true;
    } catch (error) {
      console.error('❌ Force metadata sync failed:', error);
      return false;
    }
  }

  // ENHANCED: Sync status monitoring and diagnostics
  getSyncStatus(): {
    vectorStoreReady: boolean;
    metadataCount: { bubblSpaces: number; timeCapsules: number };
    lastSyncAttempt?: string;
    syncErrors?: string[];
    recommendations: string[];
  } {
    const status = {
      vectorStoreReady: !!(this.vectorStore && this.vectorStore.initialized),
      metadataCount: {
        bubblSpaces: this.bubblSpaces.size,
        timeCapsules: this.timeCapsules.size
      },
      lastSyncAttempt: this._lastSyncAttempt,
      syncErrors: this._recentSyncErrors.slice(-5), // Last 5 errors
      recommendations: [] as string[]
    };

    // Add recommendations based on current state
    if (!this.vectorStore) {
      status.recommendations.push('VectorStore not initialized - ensure VectorStoreProvider is working');
    } else if (!this.vectorStore.initialized) {
      status.recommendations.push('VectorStore initializing - sync will start automatically when ready');
    } else if (this.vectorStore.processingAvailable === false) {
      status.recommendations.push('VectorStore processing not available - check Xenova download status');
    }

    if (this.bubblSpaces.size === 0) {
      status.recommendations.push('No BubblSpaces found - create a BubblSpace first');
    }

    if (this.timeCapsules.size === 0) {
      status.recommendations.push('No TimeCapsules found - create a TimeCapsule to organize your work');
    }

    if (this._pollingActive) {
      status.recommendations.push('VectorStore polling active - waiting for initialization');
    }

    return status;
  }

  // Track sync attempts and errors for debugging
  private _lastSyncAttempt?: string;
  private _recentSyncErrors: string[] = [];
  private _maxStoredErrors = 10;

  // Enhanced sync method with status tracking
  private async syncWithVectorStore(): Promise<void> {
    this._lastSyncAttempt = new Date().toISOString();
    
    if (!this.vectorStore || !this.vectorStore.initialized) {
      const error = 'Vector store not ready for sync';
      console.log(`📋 ${error}, will retry later...`);
      this._recentSyncErrors.push(`${this._lastSyncAttempt}: ${error}`);
      this.trimErrorHistory();
      return;
    }
    
    try {
      console.log('📋 Syncing metadata with vector store...');
      await this.saveMetadataToVectorStore(
        Array.from(this.bubblSpaces.values()),
        Array.from(this.timeCapsules.values())
      );
      console.log('✅ Metadata synced with vector store');
      
      // Clear old errors on successful sync
      this._recentSyncErrors = this._recentSyncErrors.filter((error: string) => 
        !error.includes('Vector store not ready')
      );
    } catch (error) {
      const errorMessage = `Failed to sync: ${error instanceof Error ? error.message : String(error)}`;
      console.error('❌ Metadata sync with vector store failed:', error);
      this._recentSyncErrors.push(`${this._lastSyncAttempt}: ${errorMessage}`);
      this.trimErrorHistory();
    }
  }

  private trimErrorHistory(): void {
    if (this._recentSyncErrors.length > this._maxStoredErrors) {
      this._recentSyncErrors = this._recentSyncErrors.slice(-this._maxStoredErrors);
    }
  }

  // Enhanced diagnostic method
  async runSyncDiagnostics(): Promise<{
    status: string;
    vectorStore: any;
    metadata: any;
    recommendations: string[];
    testResults: any;
  }> {
    console.log('🔍 Running comprehensive sync diagnostics...');
    
    const diagnostics = {
      status: 'unknown',
      vectorStore: {
        exists: !!this.vectorStore,
        initialized: this.vectorStore?.initialized || false,
        processingAvailable: this.vectorStore?.processingAvailable || false,
        downloadStatus: this.vectorStore?.downloadStatus || 'unknown'
      },
      metadata: {
        bubblSpaces: Array.from(this.bubblSpaces.values()).map(b => ({
          id: b.id,
          name: b.name,
          updatedAt: b.updatedAt
        })),
        timeCapsules: Array.from(this.timeCapsules.values()).map(t => ({
          id: t.id,
          name: t.name,
          bubblSpaceId: t.bubblSpaceId,
          updatedAt: t.updatedAt
        }))
      },
      recommendations: [] as string[],
      testResults: {
        canCreateDocument: false,
        canSearchDocuments: false,
        existingMetadataDocuments: []
      }
    };

    // Test basic VectorStore functionality
    if (this.vectorStore && this.vectorStore.initialized) {
      try {
        // Test document creation
        const testDoc = {
          id: 'sync-test-' + Date.now(),
          title: 'Sync Test Document',
          content: 'This is a test document for sync diagnostics',
          metadata: {
            filename: 'sync-test.txt',
            filesize: 100,
            filetype: 'text/plain',
            uploadedAt: new Date().toISOString(),
            source: 'sync-test',
            description: 'Test document for diagnostics',
            isGenerated: true
          },
          chunks: [],
          vectors: []
        };

        await this.vectorStore.insertDocument(testDoc);
        diagnostics.testResults.canCreateDocument = true;
        console.log('✅ VectorStore document creation test passed');
        
        // Clean up test document
        await this.vectorStore.deleteDocument(testDoc.id);
        console.log('🧹 Test document cleaned up');

        // Test search functionality
        if (this.vectorStore.processingAvailable) {
          const searchResults = await this.vectorStore.searchSimilar('BubblSpace', 0.1, 5);
          diagnostics.testResults.canSearchDocuments = true;
          console.log(`✅ VectorStore search test passed (${searchResults.length} results)`);
        }

        // Check for existing metadata documents
        const allDocs = await this.vectorStore.getAllDocuments();
        diagnostics.testResults.existingMetadataDocuments = allDocs
          .filter((doc: any) => doc.metadata.source === 'metadata')
          .map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            type: doc.metadata.type,
            updatedAt: doc.metadata.updatedAt
          }));

        diagnostics.status = 'healthy';
        diagnostics.recommendations.push('VectorStore is functioning properly');

      } catch (error) {
        diagnostics.status = 'error';
        diagnostics.recommendations.push(`VectorStore error: ${error instanceof Error ? error.message : String(error)}`);
        console.error('❌ VectorStore diagnostics failed:', error);
      }
    } else {
      diagnostics.status = 'not_ready';
      diagnostics.recommendations.push('VectorStore is not ready - check initialization');
    }

    console.log('🔍 Sync diagnostics completed:', diagnostics);
    return diagnostics;
  }

  // Public getter for external access
  setVectorStore(vectorStore: any): void {
    console.log('🔗 MetadataManager.setVectorStore called', {
      hasVectorStore: !!vectorStore,
      isInitialized: vectorStore?.initialized,
      processingAvailable: vectorStore?.processingAvailable,
      wasAlreadySet: !!this.vectorStore
    });
    
    this.vectorStore = vectorStore;
    
    // ENHANCED: Immediate sync if already initialized and force sync on changes
    if (vectorStore && vectorStore.initialized) {
      console.log('✅ VectorStore is ready, syncing metadata immediately...');
      this.syncWithVectorStore().then(() => {
        console.log('✅ Immediate metadata sync completed');
      }).catch(error => {
        console.warn('⚠️ Immediate metadata sync failed:', error);
      });
    } else if (vectorStore) {
      console.log('⏳ Vector store set but not initialized yet, will sync when ready');
      
      // ENHANCED: More robust polling with better error handling
      this.startVectorStorePolling();
    }
  }

  // ENHANCED: Better polling logic with immediate retry on state changes
  private startVectorStorePolling(): void {
    if (this._pollingActive) {
      console.log('🔄 Polling already active, skipping duplicate');
      return;
    }

    this._pollingActive = true;
    let attempts = 0;
    const maxAttempts = 30; // Increased from 20
    
    const pollForInitialization = () => {
      if (!this._pollingActive) {
        console.log('🛑 Polling cancelled');
        return;
      }

      attempts++;
      console.log(`⏳ Checking VectorStore initialization (attempt ${attempts}/${maxAttempts})...`, {
        hasVectorStore: !!this.vectorStore,
        isInitialized: this.vectorStore?.initialized,
        processingAvailable: this.vectorStore?.processingAvailable
      });
      
      if (this.vectorStore?.initialized) {
        console.log('✅ Vector store now ready, syncing metadata...');
        this._pollingActive = false;
        this.syncWithVectorStore().then(() => {
          console.log('✅ Polled metadata sync completed');
        }).catch(error => {
          console.warn('⚠️ Polled metadata sync failed:', error);
        });
      } else if (attempts < maxAttempts) {
        // Progressive backoff: 500ms, 750ms, 1000ms, 1500ms, 2000ms, max 3000ms
        const delay = Math.min(500 * Math.pow(1.5, Math.floor(attempts / 3)), 3000);
        setTimeout(pollForInitialization, delay);
      } else {
        console.warn('⚠️ Vector store initialization timeout after 30 attempts, metadata will not be auto-synced');
        this._pollingActive = false;
      }
    };
    
    // Start polling immediately
    setTimeout(pollForInitialization, 100);
  }

  // Add polling state tracking
  private _pollingActive: boolean = false;
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