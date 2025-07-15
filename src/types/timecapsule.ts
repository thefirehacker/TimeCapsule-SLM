// BubblSpace & TimeCapsule Management System Types

/**
 * Generates unique IDs for BubblSpaces and TimeCapsules
 */
export function generateUniqueId(prefix: 'bubbl' | 'TC'): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  const combined = (timestamp + random).substring(0, 15);
  return `${prefix}-${combined}`;
}

/**
 * BubblSpace represents a project or organization container
 */
export interface BubblSpace {
  id: string; // bubbl-15digit
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  tags?: string[];
  color?: string; // For UI customization
  isDefault?: boolean; // One default BubblSpace per user
}

/**
 * TimeCapsule metadata for organization and identification
 */
export interface TimeCapsuleMetadata {
  id: string; // TC-15digit
  name: string;
  description: string;
  bubblSpaceId: string; // Reference to parent BubblSpace
  createdAt: string;
  updatedAt: string;
  version: string;
  tags?: string[];
  category?: 'research' | 'learning' | 'training' | 'collaboration' | 'other';
  privacy?: 'private' | 'shared' | 'public';
  estimatedDuration?: number; // Minutes for learning content
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Enhanced TimeCapsule export format with metadata
 */
export interface EnhancedTimeCapsule {
  // Core metadata
  timeCapsuleMetadata: TimeCapsuleMetadata;
  bubblSpace: BubblSpace;
  
  // Technical metadata
  metadata: {
    version: string;
    exportedAt: string;
    platform: string;
    userAgent?: string;
    fileSize?: number;
    exportType: 'ai-frames' | 'deep-research' | 'combined';
  };
  
  // Content data
  research?: {
    topics: any[];
    researchResults: any;
    currentTab: string;
  };
  
  aiFramesData?: {
    frames: any[];
    currentFrameIndex: number;
    isCreationMode: boolean;
    showGraphView: boolean;
    graphState: any;
    chapters: any[];
    voiceSettings: any;
    chatMessages: any[];
    // ... other AI-Frames data
  };
  
  vectorStore?: {
    documents: any[];
    stats: any;
    exportedAt: string;
  };
}

/**
 * Import options for safe data handling
 */
export interface ImportOptions {
  mode: 'replace' | 'merge';
  selectiveImport: {
    bubblSpace: boolean;
    timeCapsuleMetadata: boolean;
    research: boolean;
    aiFrames: boolean;
    vectorStore: boolean;
    settings: boolean;
  };
  backupExisting: boolean;
  confirmOverwrite: boolean;
}

/**
 * Import result for user feedback
 */
export interface ImportResult {
  success: boolean;
  message: string;
  details: {
    bubblSpaceCreated?: boolean;
    timeCapsuleImported?: boolean;
    itemsImported: {
      topics?: number;
      frames?: number;
      documents?: number;
      researchResults?: number;
    };
    conflicts?: string[];
    backupCreated?: string; // Backup file name
  };
}

/**
 * BubblSpace management operations
 */
export interface BubblSpaceManager {
  // CRUD operations
  createBubblSpace(name: string, description: string, options?: Partial<BubblSpace>): BubblSpace;
  updateBubblSpace(id: string, updates: Partial<BubblSpace>): BubblSpace;
  deleteBubblSpace(id: string): boolean;
  getBubblSpace(id: string): BubblSpace | null;
  getAllBubblSpaces(): BubblSpace[];
  
  // Utility operations
  setDefaultBubblSpace(id: string): void;
  getDefaultBubblSpace(): BubblSpace | null;
  searchBubblSpaces(query: string): BubblSpace[];
}

/**
 * TimeCapsule management operations
 */
export interface TimeCapsuleManager {
  // CRUD operations
  createTimeCapsule(name: string, description: string, bubblSpaceId: string, options?: Partial<TimeCapsuleMetadata>): TimeCapsuleMetadata;
  updateTimeCapsule(id: string, updates: Partial<TimeCapsuleMetadata>): TimeCapsuleMetadata;
  deleteTimeCapsule(id: string): boolean;
  getTimeCapsule(id: string): TimeCapsuleMetadata | null;
  getTimeCapsulesByBubblSpace(bubblSpaceId: string): TimeCapsuleMetadata[];
  getAllTimeCapsules(): TimeCapsuleMetadata[];
  
  // Export/Import operations
  exportTimeCapsule(id: string, options?: Partial<ImportOptions>): Promise<EnhancedTimeCapsule>;
  importTimeCapsule(data: EnhancedTimeCapsule, options: ImportOptions): Promise<ImportResult>;
  
  // Utility operations
  searchTimeCapsules(query: string): TimeCapsuleMetadata[];
  getRecentTimeCapsules(limit?: number): TimeCapsuleMetadata[];
}

/**
 * Storage operations for metadata persistence
 */
export interface MetadataStorage {
  // BubblSpace storage
  saveBubblSpaces(bubblSpaces: BubblSpace[]): Promise<void>;
  loadBubblSpaces(): Promise<BubblSpace[]>;
  
  // TimeCapsule storage
  saveTimeCapsules(timeCapsules: TimeCapsuleMetadata[]): Promise<void>;
  loadTimeCapsules(): Promise<TimeCapsuleMetadata[]>;
  
  // Vector store integration
  saveMetadataToVectorStore(bubblSpaces: BubblSpace[], timeCapsules: TimeCapsuleMetadata[]): Promise<void>;
  searchMetadataInVectorStore(query: string): Promise<any[]>;
  
  // Backup operations
  createBackup(name: string): Promise<string>;
  restoreFromBackup(backupId: string): Promise<boolean>;
  listBackups(): Promise<string[]>;
}

/**
 * UI State for BubblSpace and TimeCapsule management
 */
export interface MetadataUIState {
  // Current selections
  currentBubblSpace: BubblSpace | null;
  currentTimeCapsule: TimeCapsuleMetadata | null;
  
  // Modal states
  showBubblSpaceDialog: boolean;
  showTimeCapsuleDialog: boolean;
  showImportDialog: boolean;
  showExportDialog: boolean;
  
  // Form states
  bubblSpaceForm: Partial<BubblSpace>;
  timeCapsuleForm: Partial<TimeCapsuleMetadata>;
  importForm: ImportOptions;
  
  // Loading states
  isCreatingBubblSpace: boolean;
  isCreatingTimeCapsule: boolean;
  isImporting: boolean;
  isExporting: boolean;
}

/**
 * Default values and utilities
 */
export const DEFAULT_BUBBLSPACE: Partial<BubblSpace> = {
  name: 'My BubblSpace',
  description: 'A new workspace for my projects',
  tags: [],
  color: '#3B82F6',
  isDefault: false,
};

export const DEFAULT_TIMECAPSULE: Partial<TimeCapsuleMetadata> = {
  name: 'Untitled TimeCapsule',
  description: 'A new learning and research session',
  category: 'other',
  privacy: 'private',
  difficulty: 'beginner',
  tags: [],
};

export const DEFAULT_IMPORT_OPTIONS: ImportOptions = {
  mode: 'replace',
  selectiveImport: {
    bubblSpace: true,
    timeCapsuleMetadata: true,
    research: true,
    aiFrames: true,
    vectorStore: true,
    settings: true,
  },
  backupExisting: true,
  confirmOverwrite: true,
};

/**
 * Validation functions
 */
export function validateBubblSpace(bubblSpace: Partial<BubblSpace>): string[] {
  const errors: string[] = [];
  
  if (!bubblSpace.name || bubblSpace.name.trim().length === 0) {
    errors.push('BubblSpace name is required');
  }
  
  if (bubblSpace.name && bubblSpace.name.length > 100) {
    errors.push('BubblSpace name must be less than 100 characters');
  }
  
  if (bubblSpace.description && bubblSpace.description.length > 500) {
    errors.push('BubblSpace description must be less than 500 characters');
  }
  
  return errors;
}

export function validateTimeCapsule(timeCapsule: Partial<TimeCapsuleMetadata>): string[] {
  const errors: string[] = [];
  
  if (!timeCapsule.name || timeCapsule.name.trim().length === 0) {
    errors.push('TimeCapsule name is required');
  }
  
  if (timeCapsule.name && timeCapsule.name.length > 200) {
    errors.push('TimeCapsule name must be less than 200 characters');
  }
  
  if (!timeCapsule.bubblSpaceId) {
    errors.push('BubblSpace selection is required');
  }
  
  if (timeCapsule.description && timeCapsule.description.length > 1000) {
    errors.push('TimeCapsule description must be less than 1000 characters');
  }
  
  return errors;
}

/**
 * Utility functions for metadata management
 */
export class MetadataUtils {
  static formatFileSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  }
  
  static formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  
  static generateTimeCapsuleName(type: 'research' | 'learning', topic?: string): string {
    const timestamp = new Date().toLocaleDateString();
    const typeLabel = type === 'research' ? 'Research' : 'Learning';
    const topicPart = topic ? ` - ${topic}` : '';
    return `${typeLabel} Session ${timestamp}${topicPart}`;
  }
  
  static generateBackupName(bubblSpaceName: string, timeCapsuleName: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `backup-${bubblSpaceName}-${timeCapsuleName}-${timestamp}`;
  }
} 