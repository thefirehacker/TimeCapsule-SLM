import { useState, useCallback, useEffect } from "react";
import { DocumentData } from "@/components/VectorStore/VectorStore";

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

  // Helper function to extract text content from different file types
  const extractFileContent = useCallback(
    async (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;

            // Handle different file types
            if (file.type === "application/pdf") {
              // For PDFs, we need to extract text content
              // This is a simplified approach - in production you'd use a PDF parser
              console.warn(
                "⚠️ PDF text extraction is limited. Consider using a PDF parser library."
              );
              resolve(content || "PDF content extraction not implemented");
            } else if (
              file.type.startsWith("text/") ||
              file.name.endsWith(".txt") ||
              file.name.endsWith(".md") ||
              file.name.endsWith(".json")
            ) {
              // Text files - read as text
              resolve(content);
            } else {
              // Binary files or unknown types
              console.warn(
                `⚠️ Unsupported file type: ${file.type}. Attempting to read as text.`
              );
              resolve(content || "Unable to extract text content");
            }
          } catch (error) {
            reject(
              new Error(
                `Failed to process file content: ${error instanceof Error ? error.message : "Unknown error"}`
              )
            );
          }
        };

        reader.onerror = () => {
          reject(new Error(`Failed to read file: ${file.name}`));
        };

        // Read as text for now (will be improved for PDFs)
        reader.readAsText(file);
      });
    },
    []
  );

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (!vectorStore || !files.length) return;

      setIsUploading(true);
      try {
        console.log(`📚 Processing ${files.length} files...`);

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log(
            `📄 Processing file ${i + 1}/${files.length}: ${file.name}`
          );

          try {
            // Extract file content
            const content = await extractFileContent(file);

            // Process with VectorStore
            await vectorStore.addDocument(file, content, (progress: any) => {
              console.log(
                `📊 Processing ${file.name}: ${progress.message} (${progress.progress}%)`
              );
            });

            console.log(`✅ Successfully processed: ${file.name}`);
          } catch (error) {
            console.error(`❌ Failed to process ${file.name}:`, error);
            // Continue with other files instead of failing the entire batch
          }
        }

        await updateDocumentStatus();
        console.log(`✅ File upload complete`);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [vectorStore, extractFileContent, updateDocumentStatus]
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
    // Enhanced chunk management
    getDocumentChunks,
    getChunkDetails,
  };
}
