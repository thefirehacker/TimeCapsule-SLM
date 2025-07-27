import { useState, useCallback, useEffect } from "react";
import { DocumentData } from "@/components/VectorStore/VectorStore";
import { getRAGService, RAGProcessingOptions } from "@/lib/RAGService";

export interface DocumentStatus {
  count: number;
  totalSize: number;
  vectorCount: number;
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
}

export function useDocuments(vectorStore: any): UseDocumentsReturn {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    count: 0,
    totalSize: 0,
    vectorCount: 0,
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
      const vectorCount = docs.length; // Each document contributes to the vector count

      setDocuments(docs);
      setDocumentStatus({
        count: docs.length,
        totalSize,
        vectorCount,
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
        const { documentId } = await ragService.uploadDocument(file, options);
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

  useEffect(() => {
    if (vectorStore) {
      updateDocumentStatus();
    }
  }, [vectorStore, updateDocumentStatus]);

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
  };
}
