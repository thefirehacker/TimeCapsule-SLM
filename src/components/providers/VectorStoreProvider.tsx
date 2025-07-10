"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
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
    if (isInitializing || singletonVectorStore) {
      return;
    }

    setIsInitializing(true);
    setError(null);

    try {
      console.log('🚀 VectorStoreProvider: Initializing singleton VectorStore...');
      
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
    } finally {
      setIsInitializing(false);
    }
  }, [isInitializing]);

  // Update status and stats
  const updateStatus = useCallback(() => {
    if (!singletonVectorStore) return;

    try {
      setProcessingAvailable(singletonVectorStore.processingAvailable);
      setProcessingStatus(singletonVectorStore.processingStatus);
      setDownloadProgress(singletonVectorStore.downloadProgress);
      
      // Update stats
      singletonVectorStore.getStats().then(newStats => {
        setStats(newStats);
      }).catch(err => {
        console.warn('⚠️ Failed to get VectorStore stats:', err);
      });
    } catch (err) {
      console.warn('⚠️ Failed to update VectorStore status:', err);
    }
  }, []);

  // Get VectorStore instance
  const getVectorStore = useCallback(() => {
    return singletonVectorStore;
  }, []);

  // Initialize on mount
  useEffect(() => {
    initializeVectorStore();
  }, [initializeVectorStore]);

  // Periodic status updates
  useEffect(() => {
    if (!isInitialized) return;

    const interval = setInterval(() => {
      updateStatus();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isInitialized, updateStatus]);

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