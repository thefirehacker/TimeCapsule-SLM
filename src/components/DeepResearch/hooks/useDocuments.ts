import { useState, useCallback, useEffect } from "react";
import { DocumentData } from "@/components/VectorStore/VectorStore";
import { pdfParser, PDFParser } from "@/lib/PDFParser";

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
      try {
        // Check if it's a PDF file
        if (PDFParser.isPDF(file)) {
          console.log(`📄 Processing PDF file: ${file.name}`);

          // Use PDF parser for PDF files
          const pdfResult = await pdfParser.parsePDF(file, {
            maxPages: 100,
            maxTextLength: 1000000, // 1MB text limit
            includeMetadata: true,
            onProgress: (progress) => {
              console.log(`📊 PDF parsing: ${progress.message}`);
            },
          });

          if (pdfResult.metadata.hasText) {
            console.log(
              `✅ PDF parsed successfully: ${pdfResult.metadata.pageCount} pages, ${pdfResult.metadata.textLength} characters`
            );
            return pdfResult.text;
          } else {
            console.warn(`⚠️ No text extracted from PDF: ${file.name}`);
            return `[No text content could be extracted from ${file.name}]`;
          }
        } else if (
          file.type.startsWith("text/") ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".md") ||
          file.name.endsWith(".json")
        ) {
          // Text files - read as text
          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
              const content = event.target?.result as string;
              resolve(content);
            };

            reader.onerror = () => {
              reject(new Error(`Failed to read file: ${file.name}`));
            };

            reader.readAsText(file);
          });
        } else {
          // Binary files or unknown types
          console.warn(
            `⚠️ Unsupported file type: ${file.type}. Attempting to read as text.`
          );

          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
              const content = event.target?.result as string;
              resolve(content || "Unable to extract text content");
            };

            reader.onerror = () => {
              reject(new Error(`Failed to read file: ${file.name}`));
            };

            reader.readAsText(file);
          });
        }
      } catch (error) {
        console.error(`❌ Failed to extract content from ${file.name}:`, error);
        throw new Error(
          `Failed to process file content: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
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
            // Check file type and show appropriate message
            if (PDFParser.isPDF(file)) {
              console.log(
                `📄 PDF detected: ${file.name} - will extract text content`
              );
            }

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
