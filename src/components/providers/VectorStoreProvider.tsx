"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { VectorStore } from '../VectorStore/VectorStore';

// VectorStore context interface
interface VectorStoreContextType {
  vectorStore: VectorStore | null;
  isInitialized: boolean;
  isInitializing: boolean;
  error: string | null;
  initializeVectorStore: () => Promise<void>;
  getVectorStore: () => VectorStore | null;
  processingAvailable: boolean;
  processingStatus: string;
  downloadProgress: number;
  stats: {
    documentCount: number;
    chunkCount: number;
    vectorCount: number;
  };
}

// Create the context
const VectorStoreContext = createContext<VectorStoreContextType | undefined>(undefined);

// Singleton VectorStore instance
let singletonVectorStore: VectorStore | null = null;

interface VectorStoreProviderProps {
  children: ReactNode;
}

export function VectorStoreProvider({ children }: VectorStoreProviderProps) {
  const [vectorStore, setVectorStore] = useState<VectorStore | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializationAttempted = useRef(false);
  const [processingAvailable, setProcessingAvailable] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('Not initialized');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [stats, setStats] = useState({
    documentCount: 0,
    chunkCount: 0,
    vectorCount: 0
  });

  // Initialize VectorStore singleton
  const initializeVectorStore = useCallback(async () => {
    // ENHANCED: Multiple guards against double initialization
    if (isInitializing || 
        singletonVectorStore?.initialized || 
        initializationAttempted.current ||
        isInitialized) {
      console.log('⏭️ VectorStore already initialized or initializing, skipping:', {
        isInitializing,
        singletonInitialized: singletonVectorStore?.initialized,
        attemptedBefore: initializationAttempted.current,
        isInitialized
      });
      return;
    }
    
    // Mark initialization as attempted to prevent concurrent calls
    initializationAttempted.current = true;

    setIsInitializing(true);
    setError(null);

    try {
      // ENHANCED: Handle broken/uninitialized singleton
      if (singletonVectorStore && !singletonVectorStore.initialized) {
        console.log('🔧 VectorStoreProvider: Found broken singleton, recreating...');
        singletonVectorStore = null; // Clear broken instance
      }

      console.log('🚀 VectorStoreProvider: Creating new singleton VectorStore...');
      
      // Create singleton instance if it doesn't exist
      if (!singletonVectorStore) {
        singletonVectorStore = new VectorStore();
        await singletonVectorStore.init();
        console.log('✅ VectorStoreProvider: Singleton VectorStore initialized successfully');
      }

      // Set the singleton instance
      setVectorStore(singletonVectorStore);
      setIsInitialized(true);
      
      // Update status periodically
      updateStatus();
      
    } catch (err: any) {
      console.error('❌ VectorStoreProvider: Failed to initialize VectorStore:', err);
      setError(err.message || 'Failed to initialize VectorStore');
      // Reset attempt flag on error to allow retry
      initializationAttempted.current = false;
    } finally {
      setIsInitializing(false);
    }
  }, []); // FIXED: Remove dependencies to prevent infinite re-creation

  // Update status and stats
  const updateStatus = useCallback(() => {
    if (!singletonVectorStore) return;

    try {
      setProcessingAvailable(singletonVectorStore.processingAvailable);
      setProcessingStatus(singletonVectorStore.processingStatus);
      setDownloadProgress(singletonVectorStore.downloadProgress);
      
      // Update stats only if vectorStore is properly initialized and processing is available
      if (singletonVectorStore.initialized && singletonVectorStore.processingAvailable) {
        singletonVectorStore.getStats().then(newStats => {
          setStats(newStats);
        }).catch(err => {
          console.warn('⚠️ Failed to get VectorStore stats:', err);
        });
      }
    } catch (err) {
      console.warn('⚠️ Failed to update VectorStore status:', err);
    }
  }, []);

  // Get VectorStore instance
  const getVectorStore = useCallback(() => {
    return singletonVectorStore;
  }, []);

  // Route-aware initialization: only initialize on specific pages
  const pathname = usePathname();
  const shouldAutoInitialize = pathname === '/ai-frames' || pathname === '/deep-research';
  
  useEffect(() => {
    // ENHANCED: Multiple conditions to prevent double initialization
    if (shouldAutoInitialize && 
        !isInitialized && 
        !isInitializing && 
        !initializationAttempted.current &&
        !singletonVectorStore?.initialized) {
      console.log(`🚀 Auto-initializing VectorStore for route: ${pathname}`);
      initializeVectorStore();
    } else if (shouldAutoInitialize) {
      console.log(`⏭️ Skipping auto-init for ${pathname}:`, {
        isInitialized,
        isInitializing,
        attemptedBefore: initializationAttempted.current,
        singletonInitialized: singletonVectorStore?.initialized
      });
    }
  }, [shouldAutoInitialize, pathname, isInitialized, isInitializing, initializeVectorStore]);

  // Periodic status updates
  useEffect(() => {
    if (!singletonVectorStore) return;

    const interval = setInterval(() => {
      updateStatus();
    }, 1000); // Update every 1 second for more responsive progress

    return () => clearInterval(interval);
  }, [singletonVectorStore, updateStatus]);

  // Context value
  const contextValue: VectorStoreContextType = {
    vectorStore,
    isInitialized,
    isInitializing,
    error,
    initializeVectorStore,
    getVectorStore,
    processingAvailable,
    processingStatus,
    downloadProgress,
    stats
  };

  return (
    <VectorStoreContext.Provider value={contextValue}>
      {children}
    </VectorStoreContext.Provider>
  );
}

// Custom hook to use VectorStore
export function useVectorStore() {
  const context = useContext(VectorStoreContext);
  
  if (context === undefined) {
    throw new Error('useVectorStore must be used within a VectorStoreProvider');
  }
  
  return context;
}

// Helper hook for easy VectorStore access
export function useVectorStoreInstance() {
  const { vectorStore, isInitialized, error } = useVectorStore();
  
  if (!isInitialized) {
    throw new Error('VectorStore is not initialized yet');
  }
  
  if (error) {
    throw new Error(`VectorStore error: ${error}`);
  }
  
  if (!vectorStore) {
    throw new Error('VectorStore instance is not available');
  }
  
  return vectorStore;
}

// Debug helper - global access (for console debugging)
if (typeof window !== 'undefined') {
  (window as any).getVectorStore = () => singletonVectorStore;
  (window as any).vectorStoreDebug = {
    getInstance: () => singletonVectorStore,
    getStats: () => singletonVectorStore?.getStats(),
    getStatus: () => ({
      initialized: singletonVectorStore?.initialized,
      processingAvailable: singletonVectorStore?.processingAvailable,
      processingStatus: singletonVectorStore?.processingStatus,
      downloadProgress: singletonVectorStore?.downloadProgress
    })
  };
} 