import { useState, useCallback, useEffect } from "react";
import { DocumentData } from "@/components/VectorStore/VectorStore";
import { getRAGService, RAGProcessingOptions } from "@/lib/RAGService";

export interface DocumentStatus {
  count: number;
  totalSize: number;
  vectorCount: number;
  chunkCount: number;
  totalChunks: number;
  totalVectors: number;
}

export interface UseDocumentsReturn {
  documents: DocumentData[];
  documentStatus: DocumentStatus;
  isUploading: boolean;
  showDocumentManager: boolean;
  setShowDocumentManager: (show: boolean) => void;
  handleFileUpload: (files: FileList) => Promise<void>;
  deleteDocument: (docId: string) => Promise<void>;
  updateDocumentStatus: () => Promise<void>;
  // Enhanced RAG features
  processDocumentWithRAG: (
    file: File,
    options?: RAGProcessingOptions
  ) => Promise<string>;
  processBatchWithRAG: (
    files: FileList,
    options?: RAGProcessingOptions
  ) => Promise<{ documentIds: string[]; stats: any }>;
  getRAGStats: () => Promise<any>;
  clearRAGData: () => Promise<void>;
  // Enhanced chunk management
  getDocumentChunks: (docId: string) => Promise<any[]>;
  getChunkDetails: (docId: string, chunkId: string) => Promise<any>;
}

export function useDocuments(vectorStore: any): UseDocumentsReturn {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    count: 0,
    totalSize: 0,
    vectorCount: 0,
    chunkCount: 0,
    totalChunks: 0,
    totalVectors: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showDocumentManager, setShowDocumentManager] = useState(false);

  // Initialize RAG service
  const ragService = vectorStore ? getRAGService(vectorStore) : null;

  const updateDocumentStatus = useCallback(async () => {
    if (!vectorStore) return;

    try {
      const docs = await vectorStore.getAllDocuments();
      const totalSize = docs.reduce(
        (sum: number, doc: DocumentData) => sum + (doc.metadata?.filesize || 0),
        0
      );

      // Enhanced statistics calculation
      const totalChunks = docs.reduce(
        (sum: number, doc: DocumentData) => sum + (doc.chunks?.length || 0),
        0
      );

      const totalVectors = docs.reduce(
        (sum: number, doc: DocumentData) => sum + (doc.vectors?.length || 0),
        0
      );

      setDocuments(docs);
      setDocumentStatus({
        count: docs.length,
        totalSize,
        vectorCount: docs.length, // Each document contributes to the vector count
        chunkCount: docs.length, // Each document contributes to the chunk count
        totalChunks,
        totalVectors,
      });

      console.log(`📊 Document status updated:`, {
        documents: docs.length,
        totalSize: formatFileSize(totalSize),
        totalChunks,
        totalVectors,
        avgChunksPerDoc:
          docs.length > 0 ? (totalChunks / docs.length).toFixed(1) : 0,
        avgVectorsPerDoc:
          docs.length > 0 ? (totalVectors / docs.length).toFixed(1) : 0,
      });
    } catch (error) {
      console.error("Failed to update document status:", error);
    }
  }, [vectorStore]);

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (!vectorStore || !files.length) return;

      setIsUploading(true);
      try {
        // Use RAG service if available, otherwise fallback to direct VectorStore
        if (ragService) {
          const { documentIds, stats } = await ragService.processBatch(files, {
            onProgress: (progress) => {
              console.log(
                `📊 RAG Processing: ${progress.stage} - ${progress.message} (${progress.progress}%)`
              );
            },
          });
          console.log(`✅ RAG processed ${documentIds.length} documents`);
        } else {
          // Fallback to original method
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            await vectorStore.addDocument(file);
          }
        }
        await updateDocumentStatus();
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [vectorStore, ragService, updateDocumentStatus]
  );

  const deleteDocument = useCallback(
    async (docId: string) => {
      if (!vectorStore) return;

      try {
        await vectorStore.deleteDocument(docId);
        await updateDocumentStatus();
      } catch (error) {
        console.error("Failed to delete document:", error);
      }
    },
    [vectorStore, updateDocumentStatus]
  );

  // Enhanced RAG methods
  const processDocumentWithRAG = useCallback(
    async (file: File, options?: RAGProcessingOptions) => {
      if (!ragService) {
        throw new Error("RAG service not available");
      }

      try {
        const documentId = await ragService.processDocument(file, options);
        await updateDocumentStatus();
        return documentId;
      } catch (error) {
        console.error("RAG document processing failed:", error);
        throw error;
      }
    },
    [ragService, updateDocumentStatus]
  );

  const processBatchWithRAG = useCallback(
    async (files: FileList, options?: RAGProcessingOptions) => {
      if (!ragService) {
        throw new Error("RAG service not available");
      }

      try {
        const result = await ragService.processBatch(files, options);
        await updateDocumentStatus();
        return result;
      } catch (error) {
        console.error("RAG batch processing failed:", error);
        throw error;
      }
    },
    [ragService, updateDocumentStatus]
  );

  const getRAGStats = useCallback(async () => {
    if (!ragService) {
      throw new Error("RAG service not available");
    }

    try {
      return await ragService.getRAGStats();
    } catch (error) {
      console.error("Failed to get RAG stats:", error);
      throw error;
    }
  }, [ragService]);

  const clearRAGData = useCallback(async () => {
    if (!ragService) {
      throw new Error("RAG service not available");
    }

    try {
      await ragService.clearRAGData();
      await updateDocumentStatus();
    } catch (error) {
      console.error("Failed to clear RAG data:", error);
      throw error;
    }
  }, [ragService, updateDocumentStatus]);

  // Enhanced chunk management methods
  const getDocumentChunks = useCallback(
    async (docId: string) => {
      if (!vectorStore) return [];

      try {
        const doc = await vectorStore.getDocument(docId);
        if (!doc) return [];

        return doc.chunks.map((chunk: any, index: number) => {
          const vector = doc.vectors.find((v: any) => v.chunkId === chunk.id);
          return {
            ...chunk,
            index,
            vector: vector || null,
            hasVector: !!vector,
          };
        });
      } catch (error) {
        console.error("Failed to get document chunks:", error);
        return [];
      }
    },
    [vectorStore]
  );

  const getChunkDetails = useCallback(
    async (docId: string, chunkId: string) => {
      if (!vectorStore) return null;

      try {
        const doc = await vectorStore.getDocument(docId);
        if (!doc) return null;

        const chunk = doc.chunks.find((c: any) => c.id === chunkId);
        const vector = doc.vectors.find((v: any) => v.chunkId === chunkId);

        if (!chunk) return null;

        return {
          chunk,
          vector,
          document: {
            id: doc.id,
            title: doc.title,
            metadata: doc.metadata,
          },
        };
      } catch (error) {
        console.error("Failed to get chunk details:", error);
        return null;
      }
    },
    [vectorStore]
  );

  useEffect(() => {
    if (vectorStore) {
      updateDocumentStatus();
    }
  }, [vectorStore, updateDocumentStatus]);

  // Helper function for formatting file sizes
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return {
    documents,
    documentStatus,
    isUploading,
    showDocumentManager,
    setShowDocumentManager,
    handleFileUpload,
    deleteDocument,
    updateDocumentStatus,
    // Enhanced RAG features
    processDocumentWithRAG,
    processBatchWithRAG,
    getRAGStats,
    clearRAGData,
    // Enhanced chunk management
    getDocumentChunks,
    getChunkDetails,
  };
}
