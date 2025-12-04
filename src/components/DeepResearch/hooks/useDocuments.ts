import { useState, useCallback, useEffect } from "react";
import type { DocumentData } from "@/components/VectorStore/VectorStore";

export interface DocumentStatus {
  count: number;
  totalSize: number;
  vectorCount: number;
  chunkCount: number;
  totalChunks: number;
  totalVectors: number;
}

export type UploadJobStatus = "queued" | "uploading" | "success" | "error";

export interface UploadJob {
  id: string;
  filename: string;
  status: UploadJobStatus;
  message?: string;
  startedAt: string;
  completedAt?: string;
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
  uploadJobs: UploadJob[];
  dismissUploadJob: (jobId: string) => void;
  // Enhanced chunk management
  getDocumentChunks: (docId: string) => Promise<any[]>;
  getChunkDetails: (docId: string, chunkId: string) => Promise<any>;
}

export interface UseDocumentsOptions {
  analyzeImage?: (file: File) => Promise<string>;
}

export function useDocuments(
  vectorStore: any,
  options: UseDocumentsOptions = {}
): UseDocumentsReturn {
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
  const [uploadJobs, setUploadJobs] = useState<UploadJob[]>([]);

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

  const imageAnalyzer = options?.analyzeImage;

  const registerUploadJob = useCallback((filename: string): UploadJob => {
    const jobId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const job: UploadJob = {
      id: jobId,
      filename,
      status: "queued",
      startedAt: new Date().toISOString(),
      message: "Waiting to start…",
    };
    setUploadJobs((prev) => {
      const filtered = prev.filter((existing) => existing.id !== jobId);
      return [job, ...filtered];
    });
    return job;
  }, []);

  const updateUploadJob = useCallback(
    (jobId: string, patch: Partial<UploadJob>) => {
      setUploadJobs((prev) =>
        prev.map((job) => (job.id === jobId ? { ...job, ...patch } : job))
      );
    },
    []
  );

  const dismissUploadJob = useCallback((jobId: string) => {
    setUploadJobs((prev) => prev.filter((job) => job.id !== jobId));
  }, []);

  const scheduleSuccessCleanup = useCallback((jobId: string) => {
    if (typeof window === "undefined") return;
    window.setTimeout(() => {
      setUploadJobs((prev) => prev.filter((job) => job.id !== jobId));
    }, 4000);
  }, []);

  const extractServerError = useCallback(async (response: Response) => {
    const raw = await response.text();
    try {
      const payload = raw ? JSON.parse(raw) : null;
      if (payload?.error && typeof payload.error === "string") {
        return payload.error;
      }
      if (payload?.message && typeof payload.message === "string") {
        return payload.message;
      }
      return raw || response.statusText;
    } catch {
      return raw || response.statusText;
    }
  }, []);

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      if (!vectorStore || !files.length) return;
      if (files.length > 20) {
        console.error(
          `❌ Too many files: ${files.length}. Maximum 20 files allowed per upload.`
        );
        return;
      }

      setIsUploading(true);
      let shouldRefreshStatus = false;
      try {
        for (let i = 0; i < files.length; i++) {
          const originalFile = files[i];
          console.log(`📄 Uploading ${originalFile.name}`);

          const job = registerUploadJob(originalFile.name);
          updateUploadJob(job.id, {
            status: "uploading",
            message: "Uploading to TimeCapsule…",
          });

          let uploadFile: File = originalFile;
          if (originalFile.type.startsWith("image/")) {
            if (!imageAnalyzer) {
              throw new Error(
                "Image uploads require an active vision-capable AI connection. Enable vision mode to ingest images."
              );
            }
            const analysis = await imageAnalyzer(originalFile);
            uploadFile = new File(
              [analysis],
              `${originalFile.name.replace(/\.[^.]+$/, "")}.txt`,
              { type: "text/plain" }
            );
          }

          const formData = new FormData();
          formData.append("file", uploadFile);
          formData.append("documentType", "userdocs");

          try {
            const response = await fetch("/api/kb/upload", {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              const serverMessage = await extractServerError(response);
              throw new Error(
                serverMessage
                  ? `Upload failed (${response.status}): ${serverMessage}`
                  : `Upload failed (${response.status})`
              );
            }

            const payload = await response.json();
            if (!payload?.document) {
              throw new Error("Upload response missing document payload.");
            }

            await vectorStore.importProcessedDocument(
              payload.document,
              originalFile
            );
            shouldRefreshStatus = true;
            updateUploadJob(job.id, {
              status: "success",
              message: "Processed and indexed",
              completedAt: new Date().toISOString(),
            });
            scheduleSuccessCleanup(job.id);
            console.log(`✅ Server processed: ${originalFile.name}`);
          } catch (fileError) {
            const errorMessage =
              fileError instanceof Error
                ? fileError.message
                : "Upload failed";
            updateUploadJob(job.id, {
              status: "error",
              message: errorMessage,
              completedAt: new Date().toISOString(),
            });
            throw fileError;
          }
        }
        console.log(`✅ File upload complete`);
      } catch (error) {
        console.error("File upload failed:", error);
      } finally {
        if (shouldRefreshStatus) {
          try {
            await updateDocumentStatus();
          } catch (refreshError) {
            console.error("Failed to refresh document status:", refreshError);
          }
        }
        setIsUploading(false);
      }
    },
    [
      vectorStore,
      updateDocumentStatus,
      imageAnalyzer,
      registerUploadJob,
      updateUploadJob,
      extractServerError,
      scheduleSuccessCleanup,
    ]
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
    uploadJobs,
    dismissUploadJob,
    // Enhanced chunk management
    getDocumentChunks,
    getChunkDetails,
  };
}
