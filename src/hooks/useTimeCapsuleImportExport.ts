"use client";

import { useState, useCallback } from "react";
import { useVectorStore } from "@/components/providers/VectorStoreProvider";
import { useResearchHistory } from "@/hooks/useResearchHistory";

// TimeCapsule data structure types
export interface TimeCapsuleDocument {
  id: string;
  title: string;
  content: string;
  metadata: {
    documentType?: string;
    filename: string;
    filesize: number;
    filetype: string;
    uploadedAt: string;
    source: string;
    description?: string;
    isGenerated?: boolean;
    bubblSpaceId?: string;
    timeCapsuleId?: string;
    parentId?: string; // For hierarchical relationships
  };
  chunks?: Array<{
    id: string;
    content: string;
    startIndex: number;
    endIndex: number;
  }>;
  vectors?: Array<{
    chunkId: string;
    embedding: number[];
  }>;
}

export interface TimeCapsuleResearch {
  id: string;
  title: string;
  type: string;
  timestamp: number;
  status: string;
  wordCount?: number;
  duration?: number;
  researchConfig: any;
  originalPrompt: string;
  researchContext?: any;
  agentTasks?: any[];
  steps?: any[];
  finalOutput?: string;
  sourcesCount?: number;
  chunksProcessed?: number;
  version: string;
  bubblSpaceId?: string;
  timeCapsuleId?: string;
}

export interface TimeCapsuleAIFrame {
  id: string;
  title: string;
  content: string;
  type: string;
  timestamp: number;
  metadata: any;
  bubblSpaceId?: string;
  timeCapsuleId?: string;
}

export interface BubblSpace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  timeCapsuleId: string;
  documents: TimeCapsuleDocument[];
  research: TimeCapsuleResearch[];
  aiFrames: TimeCapsuleAIFrame[];
}

export interface TimeCapsule {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  version: string;
  bubblSpaces: BubblSpace[];
  metadata: {
    exportedAt: string;
    appVersion: string;
    totalDocuments: number;
    totalResearch: number;
    totalAIFrames: number;
    totalSize: number;
  };
}

// Selection state for hierarchical export
export interface ExportSelection {
  timeCapsules: Record<
    string,
    {
      selected: boolean;
      bubblSpaces: Record<
        string,
        {
          selected: boolean;
          documents: Record<string, boolean>;
          research: Record<string, boolean>;
          aiFrames: Record<string, boolean>;
        }
      >;
    }
  >;
}

export interface ImportExportOperations {
  // Export operations
  exportTimeCapsules: (selection: ExportSelection) => Promise<void>;
  buildTimeCapsuleData: () => Promise<TimeCapsule[]>;

  // Import operations
  importTimeCapsules: (file: File) => Promise<boolean>;
  processImportedData: (data: any) => Promise<void>;

  // Utility operations
  createExportSelection: (timeCapsules: TimeCapsule[]) => ExportSelection;
  validateImportData: (data: any) => boolean;

  // State
  isExporting: boolean;
  isImporting: boolean;
  exportProgress: number;
  importProgress: number;
  error: string | null;
}

export function useTimeCapsuleImportExport(): ImportExportOperations {
  const { vectorStore } = useVectorStore();
  const { history: researchHistory, addResearch } = useResearchHistory();

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [importProgress, setImportProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Build TimeCapsule data from current app state
  const buildTimeCapsuleData = useCallback(async (): Promise<TimeCapsule[]> => {
    try {
      setError(null);

      // Get documents from vector store
      const documents: TimeCapsuleDocument[] = [];
      if (vectorStore?.database) {
        const docs = await vectorStore.database.documents.find().exec();
        docs.forEach((doc) => {
          documents.push({
            id: doc.id,
            title: doc.title,
            content: doc.content,
            metadata: {
              ...doc.metadata,
              timeCapsuleId:
                doc.metadata.timeCapsuleId || "default-timecapsule",
              bubblSpaceId: doc.metadata.bubblSpaceId || "default-bubblspace",
            },
            chunks: doc.chunks,
            vectors: doc.vectors,
          });
        });
      }

      // Get research history
      const research: TimeCapsuleResearch[] = researchHistory.map((item) => ({
        ...item,
        timeCapsuleId: item.timeCapsuleId || "default-timecapsule",
        bubblSpaceId: item.bubblSpaceId || "default-bubblspace",
      }));

      // Get AI Frames (placeholder - you may need to implement this based on your app)
      const aiFrames: TimeCapsuleAIFrame[] = [];

      // Group by BubblSpace and TimeCapsule
      const timeCapsuleMap = new Map<string, TimeCapsule>();
      const bubblSpaceMap = new Map<string, BubblSpace>();

      // Process documents
      documents.forEach((doc) => {
        const timeCapsuleId = doc.metadata.timeCapsuleId!;
        const bubblSpaceId = doc.metadata.bubblSpaceId!;

        if (!bubblSpaceMap.has(bubblSpaceId)) {
          bubblSpaceMap.set(bubblSpaceId, {
            id: bubblSpaceId,
            name:
              bubblSpaceId === "default-bubblspace"
                ? "Default BubblSpace"
                : `BubblSpace ${bubblSpaceId}`,
            createdAt: new Date().toISOString(),
            timeCapsuleId,
            documents: [],
            research: [],
            aiFrames: [],
          });
        }
        bubblSpaceMap.get(bubblSpaceId)!.documents.push(doc);
      });

      // Process research
      research.forEach((item) => {
        const timeCapsuleId = item.timeCapsuleId!;
        const bubblSpaceId = item.bubblSpaceId!;

        if (!bubblSpaceMap.has(bubblSpaceId)) {
          bubblSpaceMap.set(bubblSpaceId, {
            id: bubblSpaceId,
            name:
              bubblSpaceId === "default-bubblspace"
                ? "Default BubblSpace"
                : `BubblSpace ${bubblSpaceId}`,
            createdAt: new Date().toISOString(),
            timeCapsuleId,
            documents: [],
            research: [],
            aiFrames: [],
          });
        }
        bubblSpaceMap.get(bubblSpaceId)!.research.push(item);
      });

      // Group BubblSpaces by TimeCapsule
      bubblSpaceMap.forEach((bubblSpace) => {
        const timeCapsuleId = bubblSpace.timeCapsuleId;

        if (!timeCapsuleMap.has(timeCapsuleId)) {
          timeCapsuleMap.set(timeCapsuleId, {
            id: timeCapsuleId,
            name:
              timeCapsuleId === "default-timecapsule"
                ? "Default TimeCapsule"
                : `TimeCapsule ${timeCapsuleId}`,
            createdAt: new Date().toISOString(),
            version: "1.0",
            bubblSpaces: [],
            metadata: {
              exportedAt: new Date().toISOString(),
              appVersion: "TimeCapsule 1.0",
              totalDocuments: 0,
              totalResearch: 0,
              totalAIFrames: 0,
              totalSize: 0,
            },
          });
        }
        timeCapsuleMap.get(timeCapsuleId)!.bubblSpaces.push(bubblSpace);
      });

      // Calculate metadata
      timeCapsuleMap.forEach((timeCapsule) => {
        let totalDocuments = 0;
        let totalResearch = 0;
        let totalAIFrames = 0;
        let totalSize = 0;

        timeCapsule.bubblSpaces.forEach((bubblSpace) => {
          totalDocuments += bubblSpace.documents.length;
          totalResearch += bubblSpace.research.length;
          totalAIFrames += bubblSpace.aiFrames.length;

          bubblSpace.documents.forEach((doc) => {
            totalSize += doc.metadata.filesize || 0;
          });
        });

        timeCapsule.metadata = {
          ...timeCapsule.metadata,
          totalDocuments,
          totalResearch,
          totalAIFrames,
          totalSize,
        };
      });

      return Array.from(timeCapsuleMap.values());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to build TimeCapsule data"
      );
      return [];
    }
  }, [vectorStore, researchHistory]);

  // Create initial export selection
  const createExportSelection = useCallback(
    (timeCapsules: TimeCapsule[]): ExportSelection => {
      const selection: ExportSelection = { timeCapsules: {} };

      timeCapsules.forEach((timeCapsule) => {
        selection.timeCapsules[timeCapsule.id] = {
          selected: true,
          bubblSpaces: {},
        };

        timeCapsule.bubblSpaces.forEach((bubblSpace) => {
          selection.timeCapsules[timeCapsule.id].bubblSpaces[bubblSpace.id] = {
            selected: true,
            documents: {},
            research: {},
            aiFrames: {},
          };

          bubblSpace.documents.forEach((doc) => {
            selection.timeCapsules[timeCapsule.id].bubblSpaces[
              bubblSpace.id
            ].documents[doc.id] = true;
          });

          bubblSpace.research.forEach((research) => {
            selection.timeCapsules[timeCapsule.id].bubblSpaces[
              bubblSpace.id
            ].research[research.id] = true;
          });

          bubblSpace.aiFrames.forEach((aiFrame) => {
            selection.timeCapsules[timeCapsule.id].bubblSpaces[
              bubblSpace.id
            ].aiFrames[aiFrame.id] = true;
          });
        });
      });

      return selection;
    },
    []
  );

  // Export TimeCapsules based on selection
  const exportTimeCapsules = useCallback(
    async (selection: ExportSelection) => {
      try {
        setIsExporting(true);
        setExportProgress(0);
        setError(null);

        const allTimeCapsules = await buildTimeCapsuleData();
        const selectedTimeCapsules: TimeCapsule[] = [];

        // Filter based on selection
        allTimeCapsules.forEach((timeCapsule) => {
          const tcSelection = selection.timeCapsules[timeCapsule.id];
          if (!tcSelection?.selected) return;

          const filteredTimeCapsule: TimeCapsule = {
            ...timeCapsule,
            bubblSpaces: [],
          };

          timeCapsule.bubblSpaces.forEach((bubblSpace) => {
            const bsSelection = tcSelection.bubblSpaces[bubblSpace.id];
            if (!bsSelection?.selected) return;

            const filteredBubblSpace: BubblSpace = {
              ...bubblSpace,
              documents: bubblSpace.documents.filter(
                (doc) => bsSelection.documents[doc.id]
              ),
              research: bubblSpace.research.filter(
                (research) => bsSelection.research[research.id]
              ),
              aiFrames: bubblSpace.aiFrames.filter(
                (aiFrame) => bsSelection.aiFrames[aiFrame.id]
              ),
            };

            filteredTimeCapsule.bubblSpaces.push(filteredBubblSpace);
          });

          if (filteredTimeCapsule.bubblSpaces.length > 0) {
            selectedTimeCapsules.push(filteredTimeCapsule);
          }
        });

        setExportProgress(50);

        // Create export data
        const exportData = {
          version: "1.0",
          exportedAt: new Date().toISOString(),
          timeCapsules: selectedTimeCapsules,
          metadata: {
            appVersion: "TimeCapsule 1.0",
            format: "timecapsule-export",
            description: "TimeCapsule data export with hierarchical structure",
            count: selectedTimeCapsules.length,
          },
        };

        setExportProgress(75);

        // Download as JSON
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `timecapsule-export-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        setExportProgress(100);

        // Auto-hide progress after 2 seconds
        setTimeout(() => {
          setExportProgress(0);
          setIsExporting(false);
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Export failed");
        setIsExporting(false);
        setExportProgress(0);
      }
    },
    [buildTimeCapsuleData]
  );

  // Validate import data
  const validateImportData = useCallback((data: any): boolean => {
    if (!data || typeof data !== "object") return false;
    if (!data.version) return false;
    if (!data.timeCapsules || !Array.isArray(data.timeCapsules)) return false;

    // Basic structure validation
    return data.timeCapsules.every(
      (tc: any) => tc.id && tc.name && Array.isArray(tc.bubblSpaces)
    );
  }, []);

  // Process imported data
  const processImportedData = useCallback(
    async (data: any) => {
      try {
        setImportProgress(10);

        if (!validateImportData(data)) {
          throw new Error("Invalid TimeCapsule data format");
        }

        const timeCapsules: TimeCapsule[] = data.timeCapsules;
        let processedItems = 0;
        const totalItems = timeCapsules.reduce(
          (total, tc) =>
            total +
            tc.bubblSpaces.reduce(
              (btotal, bs) =>
                btotal +
                bs.documents.length +
                bs.research.length +
                bs.aiFrames.length,
              0
            ),
          0
        );

        // Process each TimeCapsule
        for (const timeCapsule of timeCapsules) {
          for (const bubblSpace of timeCapsule.bubblSpaces) {
            // Import documents
            for (const doc of bubblSpace.documents) {
              if (vectorStore?.database) {
                // Ensure proper metadata
                const docData = {
                  ...doc,
                  metadata: {
                    ...doc.metadata,
                    timeCapsuleId: timeCapsule.id,
                    bubblSpaceId: bubblSpace.id,
                    uploadedAt:
                      doc.metadata.uploadedAt || new Date().toISOString(),
                    source: doc.metadata.source || "timecapsule_import",
                  },
                };

                await vectorStore.database.documents.insert(docData);
              }

              processedItems++;
              setImportProgress(10 + (processedItems / totalItems) * 80);
            }

            // Import research
            for (const research of bubblSpace.research) {
              const researchData = {
                ...research,
                timeCapsuleId: timeCapsule.id,
                bubblSpaceId: bubblSpace.id,
              };

              await addResearch(researchData);

              processedItems++;
              setImportProgress(10 + (processedItems / totalItems) * 80);
            }

            // Import AI frames (implement based on your AI frames storage)
            for (const aiFrame of bubblSpace.aiFrames) {
              // TODO: Implement AI frame import based on your app's AI frame storage
              console.log("AI Frame import not yet implemented:", aiFrame);

              processedItems++;
              setImportProgress(10 + (processedItems / totalItems) * 80);
            }
          }
        }

        setImportProgress(100);

        // Auto-hide progress after 2 seconds
        setTimeout(() => {
          setImportProgress(0);
          setIsImporting(false);
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Import failed");
        setIsImporting(false);
        setImportProgress(0);
        throw err;
      }
    },
    [vectorStore, addResearch, validateImportData]
  );

  // Import TimeCapsules from file
  const importTimeCapsules = useCallback(
    async (file: File): Promise<boolean> => {
      try {
        setIsImporting(true);
        setImportProgress(5);
        setError(null);

        const text = await file.text();
        const data = JSON.parse(text);

        await processImportedData(data);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to import TimeCapsule"
        );
        setIsImporting(false);
        setImportProgress(0);
        return false;
      }
    },
    [processImportedData]
  );

  return {
    // Export operations
    exportTimeCapsules,
    buildTimeCapsuleData,

    // Import operations
    importTimeCapsules,
    processImportedData,

    // Utility operations
    createExportSelection,
    validateImportData,

    // State
    isExporting,
    isImporting,
    exportProgress,
    importProgress,
    error,
  };
}

