/**
 * Centralized Debug Utility
 * Controls all debugging output across the application
 * Can be easily enabled/disabled for production
 * 
 * TO DISABLE ALL DEBUGGING:
 * - Change DEBUG_ENABLED to false
 * - Or disable specific categories in DEBUG_CATEGORIES
 */

// Debug configuration - change this to false to disable all debugging
const DEBUG_ENABLED = process.env.NODE_ENV === 'development' && false; // Set to true to enable debugging
const DEBUG_CATEGORIES = {
  STORAGE: true,        // Storage operations (localStorage, IndexedDB)
  GRAPH: true,          // Graph operations (nodes, edges, layout)
  FRAMES: true,         // Frame operations (create, update, sync)
  SYNC: true,           // Cross-view synchronization
  METADATA: true,       // BubblSpace, TimeCapsule operations
  VECTORSTORE: true,    // VectorStore operations
  PERFORMANCE: false,   // Performance timing (disabled by default)
} as const;

type DebugCategory = keyof typeof DEBUG_CATEGORIES;

interface DebugMessage {
  emoji?: string;
  category: DebugCategory;
  message: string;
  data?: any;
}

export class DebugLogger {
  private static instance: DebugLogger;
  
  static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }
  
  private isEnabled(category: DebugCategory): boolean {
    return DEBUG_ENABLED && DEBUG_CATEGORIES[category];
  }
  
  log(params: DebugMessage): void {
    if (!this.isEnabled(params.category)) return;
    
    const prefix = `${params.emoji || '🔧'} [${params.category}]`;
    
    if (params.data) {
      console.log(`${prefix} ${params.message}`, params.data);
    } else {
      console.log(`${prefix} ${params.message}`);
    }
  }
  
  error(params: Omit<DebugMessage, 'emoji'> & { error?: Error }): void {
    if (!this.isEnabled(params.category)) return;
    
    const prefix = `❌ [${params.category}]`;
    
    if (params.error) {
      console.error(`${prefix} ${params.message}`, params.error);
    } else if (params.data) {
      console.error(`${prefix} ${params.message}`, params.data);
    } else {
      console.error(`${prefix} ${params.message}`);
    }
  }
  
  warn(params: Omit<DebugMessage, 'emoji'>): void {
    if (!this.isEnabled(params.category)) return;
    
    const prefix = `⚠️ [${params.category}]`;
    
    if (params.data) {
      console.warn(`${prefix} ${params.message}`, params.data);
    } else {
      console.warn(`${prefix} ${params.message}`);
    }
  }
  
  success(params: Omit<DebugMessage, 'emoji'>): void {
    if (!this.isEnabled(params.category)) return;
    
    const prefix = `✅ [${params.category}]`;
    
    if (params.data) {
      console.log(`${prefix} ${params.message}`, params.data);
    } else {
      console.log(`${prefix} ${params.message}`);
    }
  }
  
  // Performance timing utilities
  startTimer(category: DebugCategory, label: string): void {
    if (!this.isEnabled(category) || !DEBUG_CATEGORIES.PERFORMANCE) return;
    console.time(`⏱️ [${category}] ${label}`);
  }
  
  endTimer(category: DebugCategory, label: string): void {
    if (!this.isEnabled(category) || !DEBUG_CATEGORIES.PERFORMANCE) return;
    console.timeEnd(`⏱️ [${category}] ${label}`);
  }
}

// Singleton instance
export const debugLog = DebugLogger.getInstance();

// Convenience functions for common patterns
export const debugStorage = (message: string, data?: any) => 
  debugLog.log({ emoji: '💾', category: 'STORAGE', message, data });

export const debugGraph = (message: string, data?: any) => 
  debugLog.log({ emoji: '📊', category: 'GRAPH', message, data });

export const debugFrames = (message: string, data?: any) => 
  debugLog.log({ emoji: '🎯', category: 'FRAMES', message, data });

export const debugSync = (message: string, data?: any) => 
  debugLog.log({ emoji: '🔄', category: 'SYNC', message, data });

export const debugMetadata = (message: string, data?: any) => 
  debugLog.log({ emoji: '📋', category: 'METADATA', message, data });

export const debugVectorStore = (message: string, data?: any) => 
  debugLog.log({ emoji: '🗂️', category: 'VECTORSTORE', message, data });

// Configuration utilities
export const getDebugConfig = () => ({
  enabled: DEBUG_ENABLED,
  categories: DEBUG_CATEGORIES,
});

export const isDebugEnabled = (category?: DebugCategory) => {
  if (!category) return DEBUG_ENABLED;
  return DEBUG_ENABLED && DEBUG_CATEGORIES[category];
}; 