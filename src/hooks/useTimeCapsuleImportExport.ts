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
  agentTasks?: Array<{
    agentName: string;
    agentType: string;
    status: "completed" | "in_progress" | "failed" | "pending";
    progress: number;
    duration?: number;
    startTime: number;
    endTime?: number;
    stage?: string;
    output?: any;
    error?: string;
    thinking?: {
      hasThinking: boolean;
      thinkingContent?: string;
      summary?: string;
      insights?: string[];
    };
    progressHistory?: Array<{
      stage: string;
      progress: number;
      timestamp: number;
      itemsProcessed?: number;
      totalItems?: number;
      message?: string;
    }>;
    retryCount?: number;
    metrics?: {
      llmCalls: number;
      tokensUsed: number;
      responseTime: number;
      confidence: number;
    };
  }>;
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
  refresh: () => Promise<void>;

  // State
  isExporting: boolean;
  isImporting: boolean;
  exportProgress: number;
  importProgress: number;
  error: string | null;
}

export function useTimeCapsuleImportExport(): ImportExportOperations {
  const { vectorStore } = useVectorStore();
  const {
    history: researchHistory,
    addResearch,
    refresh: refreshResearchHistory,
  } = useResearchHistory();

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [importProgress, setImportProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Add state guards to prevent concurrent operations
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

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

      // Get research history - ensure all required fields are present
      console.log("🔍 [Export] Raw research history from hook:", {
        count: researchHistory.length,
        items: researchHistory.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
        })),
      });

      const research: TimeCapsuleResearch[] = researchHistory.map((item) => ({
        ...item,
        // Ensure required fields are present for proper export/import
        id:
          item.id ||
          `research_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: item.createdAt || item.timestamp || Date.now(),
        updatedAt: item.updatedAt || item.timestamp || Date.now(),
        version: item.version || "1.0",
        agentTasks: item.agentTasks || [],
        timeCapsuleId: item.timeCapsuleId || "default-timecapsule",
        bubblSpaceId: item.bubblSpaceId || "default-bubblspace",
      }));

      console.log("🔍 [Export] Processed research for export:", {
        count: research.length,
        items: research.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          timeCapsuleId: item.timeCapsuleId,
          bubblSpaceId: item.bubblSpaceId,
          agentTasksCount: item.agentTasks ? item.agentTasks.length : 0,
          hasProgressHistory: item.agentTasks
            ? item.agentTasks.some(
                (task) =>
                  task.progressHistory && task.progressHistory.length > 0
              )
            : false,
        })),
      });

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
      console.log(
        "🔍 [Export] BubblSpaces created:",
        Array.from(bubblSpaceMap.entries()).map(([id, bs]) => ({
          id,
          name: bs.name,
          documents: bs.documents.length,
          research: bs.research.length,
          aiFrames: bs.aiFrames.length,
        }))
      );

      bubblSpaceMap.forEach((bubblSpace) => {
        const timeCapsuleId = bubblSpace.timeCapsuleId;

        if (!timeCapsuleMap.has(timeCapsuleId)) {
          console.log(`🔍 [Export] Creating new TimeCapsule: ${timeCapsuleId}`);
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
        console.log(
          `🔍 [Export] Added BubblSpace "${bubblSpace.name}" to TimeCapsule "${timeCapsuleId}"`
        );
      });

      // Log final TimeCapsule structure before metadata calculation
      console.log(
        "🔍 [Export] Final TimeCapsule structure before metadata:",
        Array.from(timeCapsuleMap.entries()).map(([id, tc]) => ({
          id,
          name: tc.name,
          bubblSpaces: tc.bubblSpaces.map((bs) => ({
            id: bs.id,
            name: bs.name,
            documents: bs.documents.length,
            research: bs.research.length,
            aiFrames: bs.aiFrames.length,
          })),
        }))
      );

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

        console.log("🔄 [Export] Starting TimeCapsule export process");
        const allTimeCapsules = await buildTimeCapsuleData();
        console.log(
          `🔍 [Export] Built ${allTimeCapsules.length} TimeCapsules from data`
        );

        // Debug the selection state
        console.log("🔍 [Export] Full selection object:", selection);
        console.log(
          "🔍 [Export] Selection.timeCapsules keys:",
          Object.keys(selection.timeCapsules)
        );
        Object.entries(selection.timeCapsules).forEach(([tcId, tcSel]) => {
          console.log(`🔍 [Export] TimeCapsule ${tcId} selection:`, {
            selected: tcSel.selected,
            bubblSpaceKeys: Object.keys(tcSel.bubblSpaces),
            bubblSpaceSelections: Object.entries(tcSel.bubblSpaces).map(
              ([bsId, bsSel]) => ({
                id: bsId,
                selected: bsSel.selected,
                documentsCount: Object.keys(bsSel.documents).length,
                researchCount: Object.keys(bsSel.research).length,
                selectedDocuments: Object.values(bsSel.documents).filter(
                  Boolean
                ).length,
                selectedResearch: Object.values(bsSel.research).filter(Boolean)
                  .length,
              })
            ),
          });
        });

        const selectedTimeCapsules: TimeCapsule[] = [];

        // Filter based on selection
        allTimeCapsules.forEach((timeCapsule) => {
          const tcSelection = selection.timeCapsules[timeCapsule.id];
          console.log(
            `🔍 [Export] Checking TimeCapsule "${timeCapsule.name}" (ID: ${timeCapsule.id})`
          );
          console.log(`🔍 [Export] - Has selection: ${!!tcSelection}`);
          console.log(
            `🔍 [Export] - Selection.selected: ${tcSelection?.selected}`
          );

          if (!tcSelection?.selected) {
            console.log(
              `⏭️ [Export] Skipping unselected TimeCapsule: ${timeCapsule.name}`
            );
            return;
          }

          console.log(
            `🔍 [Export] Processing TimeCapsule: ${timeCapsule.name}`
          );
          const filteredTimeCapsule: TimeCapsule = {
            ...timeCapsule,
            bubblSpaces: [],
          };

          timeCapsule.bubblSpaces.forEach((bubblSpace) => {
            const bsSelection = tcSelection.bubblSpaces[bubblSpace.id];
            console.log(
              `🔍 [Export] Checking BubblSpace "${bubblSpace.name}" (ID: ${bubblSpace.id})`
            );
            console.log(
              `🔍 [Export] - Has BubblSpace selection: ${!!bsSelection}`
            );
            console.log(
              `🔍 [Export] - BubblSpace selection.selected: ${bsSelection?.selected}`
            );
            console.log(
              `🔍 [Export] - BubblSpace contains: ${bubblSpace.documents.length} docs, ${bubblSpace.research.length} research, ${bubblSpace.aiFrames.length} AI frames`
            );

            if (!bsSelection?.selected) {
              console.log(
                `⏭️ [Export] Skipping unselected BubblSpace: ${bubblSpace.name}`
              );
              return;
            }

            console.log(
              `🔍 [Export] Processing BubblSpace: ${bubblSpace.name} (${bubblSpace.documents.length} docs, ${bubblSpace.research.length} research, ${bubblSpace.aiFrames.length} AI frames)`
            );

            // Debug research filtering
            console.log(
              `🔍 [Export] Filtering research in BubblSpace "${bubblSpace.name}"`
            );
            console.log(
              `🔍 [Export] - Total research items: ${bubblSpace.research.length}`
            );
            console.log(
              `🔍 [Export] - Research selection object:`,
              bsSelection.research
            );

            const filteredDocuments = bubblSpace.documents.filter(
              (doc) => bsSelection.documents[doc.id]
            );
            const filteredResearch = bubblSpace.research.filter((research) => {
              const isSelected = bsSelection.research[research.id];
              console.log(
                `🔍 [Export] - Research "${research.title}" (ID: ${research.id}): selected=${isSelected}`
              );
              return isSelected;
            });
            const filteredAIFrames = bubblSpace.aiFrames.filter(
              (aiFrame) => bsSelection.aiFrames[aiFrame.id]
            );

            const filteredBubblSpace: BubblSpace = {
              ...bubblSpace,
              documents: filteredDocuments,
              research: filteredResearch,
              aiFrames: filteredAIFrames,
            };

            console.log(
              `✅ [Export] Filtered BubblSpace: ${filteredBubblSpace.name} (${filteredBubblSpace.documents.length} docs, ${filteredBubblSpace.research.length} research, ${filteredBubblSpace.aiFrames.length} AI frames)`
            );

            // Log research items being exported
            if (filteredBubblSpace.research.length > 0) {
              filteredBubblSpace.research.forEach((research, idx) => {
                const agentTasksWithTimeline = research.agentTasks
                  ? research.agentTasks.filter(
                      (task) =>
                        task.progressHistory && task.progressHistory.length > 0
                    ).length
                  : 0;
                const totalProgressEntries = research.agentTasks
                  ? research.agentTasks.reduce(
                      (sum, task) =>
                        sum +
                        (task.progressHistory
                          ? task.progressHistory.length
                          : 0),
                      0
                    )
                  : 0;

                console.log(
                  `🔍 [Export] Exporting research ${idx}: "${research.title}" (${research.type})`
                );
                console.log(
                  `📅 [Export] - Timeline data: ${agentTasksWithTimeline}/${research.agentTasks?.length || 0} agent tasks with progress history, ${totalProgressEntries} total timeline entries`
                );
              });
            }

            filteredTimeCapsule.bubblSpaces.push(filteredBubblSpace);
          });

          if (filteredTimeCapsule.bubblSpaces.length > 0) {
            selectedTimeCapsules.push(filteredTimeCapsule);
            console.log(
              `✅ [Export] Added TimeCapsule to export: ${filteredTimeCapsule.name}`
            );
          } else {
            console.log(
              `⏭️ [Export] Skipping TimeCapsule with no content: ${filteredTimeCapsule.name}`
            );
          }
        });

        setExportProgress(50);

        // Calculate final statistics
        let totalDocs = 0,
          totalResearch = 0,
          totalAIFrames = 0;
        selectedTimeCapsules.forEach((tc) => {
          tc.bubblSpaces.forEach((bs) => {
            totalDocs += bs.documents.length;
            totalResearch += bs.research.length;
            totalAIFrames += bs.aiFrames.length;
          });
        });

        console.log(
          `📊 [Export] Final export statistics: ${totalDocs} documents, ${totalResearch} research items, ${totalAIFrames} AI frames`
        );

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

        console.log("📦 [Export] Created export data package");
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
    try {
      console.log("🔍 [Import] Starting import data validation");
      console.log("🔍 [Import] Raw data structure:", {
        hasData: !!data,
        dataType: typeof data,
        keys: data ? Object.keys(data) : [],
        version: data?.version,
        hasTimeCapsules: !!data?.timeCapsules,
        timeCapsuleType: Array.isArray(data?.timeCapsules)
          ? "array"
          : typeof data?.timeCapsules,
        timeCapsuleLength: Array.isArray(data?.timeCapsules)
          ? data.timeCapsules.length
          : "N/A",
      });

      if (!data || typeof data !== "object") {
        console.warn("❌ [Import] Invalid data: not an object");
        return false;
      }

      if (!data.version) {
        console.warn("❌ [Import] Invalid data: missing version");
        return false;
      }

      if (!data.timeCapsules || !Array.isArray(data.timeCapsules)) {
        console.warn(
          "❌ [Import] Invalid data: missing or invalid timeCapsules array",
          {
            hasTimeCapsules: !!data.timeCapsules,
            timeCapsuleType: typeof data.timeCapsules,
            isArray: Array.isArray(data.timeCapsules),
          }
        );
        return false;
      }

      console.log(
        `🔍 [Import] Validating ${data.timeCapsules.length} TimeCapsules`
      );

      // Enhanced structure validation
      for (let i = 0; i < data.timeCapsules.length; i++) {
        const tc = data.timeCapsules[i];
        if (!tc.id || !tc.name || !Array.isArray(tc.bubblSpaces)) {
          console.warn(`❌ [Import] Invalid TimeCapsule ${i}:`, tc);
          return false;
        }

        console.log(
          `🔍 [Import] TimeCapsule ${i}: "${tc.name}" with ${tc.bubblSpaces.length} BubblSpaces`
        );

        for (let j = 0; j < tc.bubblSpaces.length; j++) {
          const bs = tc.bubblSpaces[j];
          if (!bs.id || !bs.name) {
            console.warn(
              `❌ [Import] Invalid BubblSpace ${j} in TimeCapsule ${i}:`,
              bs
            );
            return false;
          }

          // Ensure arrays exist
          if (!bs.documents) bs.documents = [];
          if (!bs.research) bs.research = [];
          if (!bs.aiFrames) bs.aiFrames = [];

          console.log(
            `🔍 [Import] BubblSpace ${j}: "${bs.name}" - ${bs.documents.length} docs, ${bs.research.length} research, ${bs.aiFrames.length} AI frames`
          );

          // Log research items for debugging
          if (bs.research.length > 0) {
            bs.research.forEach((research: any, idx: number) => {
              console.log(
                `🔍 [Import] Research ${idx}: "${research.title}" (${research.type || "unknown type"})`
              );
            });
          }
        }
      }

      console.log("✅ [Import] Import data validation successful");
      return true;
    } catch (err) {
      console.error("❌ [Import] Error during validation:", err);
      return false;
    }
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
              console.log(
                `🔍 [Import] Processing research: "${research.title}"`
              );
              console.log(`🔍 [Import] Raw research data:`, research);

              // Log timeline data being imported
              if (research.agentTasks && Array.isArray(research.agentTasks)) {
                const agentTasksWithTimeline = research.agentTasks.filter(
                  (task) =>
                    task.progressHistory &&
                    Array.isArray(task.progressHistory) &&
                    task.progressHistory.length > 0
                ).length;
                const totalProgressEntries = research.agentTasks.reduce(
                  (sum, task) =>
                    sum +
                    (task.progressHistory && Array.isArray(task.progressHistory)
                      ? task.progressHistory.length
                      : 0),
                  0
                );
                console.log(
                  `📅 [Import] - Timeline data found: ${agentTasksWithTimeline}/${research.agentTasks.length} agent tasks with progress history, ${totalProgressEntries} total timeline entries`
                );
              }

              // Prepare research data for addResearch function
              // NOTE: addResearch generates its own id, createdAt, updatedAt, version
              const researchData: any = {
                // Required fields for RxDB schema (excluding auto-generated ones)
                title: research.title || "Untitled Research",
                type: research.type || "deep-research",
                timestamp:
                  typeof research.timestamp === "number"
                    ? research.timestamp
                    : Date.now(),
                status:
                  research.status &&
                  ["completed", "in_progress", "failed"].includes(
                    research.status
                  )
                    ? research.status
                    : "completed",
                wordCount:
                  typeof research.wordCount === "number"
                    ? research.wordCount
                    : 0,
                researchConfig:
                  research.researchConfig &&
                  typeof research.researchConfig === "object"
                    ? {
                        type: research.researchConfig.type || "deep-research",
                        depth: research.researchConfig.depth || "normal",
                        enableRAG:
                          typeof research.researchConfig.enableRAG === "boolean"
                            ? research.researchConfig.enableRAG
                            : false,
                        enableWebSearch:
                          typeof research.researchConfig.enableWebSearch ===
                          "boolean"
                            ? research.researchConfig.enableWebSearch
                            : false,
                      }
                    : {
                        type: "deep-research",
                        depth: "normal",
                        enableRAG: false,
                        enableWebSearch: false,
                      },
                originalPrompt: research.originalPrompt || research.title || "",
                agentTasks: Array.isArray(research.agentTasks)
                  ? research.agentTasks.map((task) => ({
                      // Preserve all agent task data including progressHistory
                      agentName: task.agentName || "Unknown Agent",
                      agentType: task.agentType || "unknown",
                      status: task.status || "completed",
                      progress:
                        typeof task.progress === "number" ? task.progress : 100,
                      duration:
                        typeof task.duration === "number"
                          ? task.duration
                          : undefined,
                      startTime:
                        typeof task.startTime === "number"
                          ? task.startTime
                          : Date.now(),
                      endTime:
                        typeof task.endTime === "number"
                          ? task.endTime
                          : undefined,
                      stage: task.stage,
                      output: task.output,
                      error: task.error,
                      thinking: task.thinking,
                      progressHistory: Array.isArray(task.progressHistory)
                        ? task.progressHistory.map((entry) => ({
                            stage: entry.stage || "Unknown stage",
                            progress:
                              typeof entry.progress === "number"
                                ? entry.progress
                                : 0,
                            timestamp:
                              typeof entry.timestamp === "number"
                                ? entry.timestamp
                                : Date.now(),
                            itemsProcessed:
                              typeof entry.itemsProcessed === "number"
                                ? entry.itemsProcessed
                                : undefined,
                            totalItems:
                              typeof entry.totalItems === "number"
                                ? entry.totalItems
                                : undefined,
                            message: entry.message,
                          }))
                        : undefined,
                      retryCount:
                        typeof task.retryCount === "number"
                          ? task.retryCount
                          : undefined,
                      metrics:
                        task.metrics && typeof task.metrics === "object"
                          ? {
                              llmCalls:
                                typeof task.metrics.llmCalls === "number"
                                  ? task.metrics.llmCalls
                                  : 0,
                              tokensUsed:
                                typeof task.metrics.tokensUsed === "number"
                                  ? task.metrics.tokensUsed
                                  : 0,
                              responseTime:
                                typeof task.metrics.responseTime === "number"
                                  ? task.metrics.responseTime
                                  : 0,
                              confidence:
                                typeof task.metrics.confidence === "number"
                                  ? task.metrics.confidence
                                  : 0.5,
                            }
                          : undefined,
                    }))
                  : [],
              };

              // Add optional fields only if they exist and are the correct type
              if (typeof research.duration === "number") {
                researchData.duration = research.duration;
              }

              if (
                research.researchContext &&
                typeof research.researchContext === "object"
              ) {
                researchData.researchContext = research.researchContext;
              }

              if (
                research.ragContext &&
                typeof research.ragContext === "object"
              ) {
                researchData.ragContext = research.ragContext;
              }

              if (
                research.webSearchContext &&
                typeof research.webSearchContext === "object"
              ) {
                researchData.webSearchContext = research.webSearchContext;
              }

              if (Array.isArray(research.steps)) {
                researchData.steps = research.steps;
              }

              if (typeof research.finalOutput === "string") {
                researchData.finalOutput = research.finalOutput;
              }

              if (typeof research.sourcesCount === "number") {
                researchData.sourcesCount = research.sourcesCount;
              }

              if (typeof research.chunksProcessed === "number") {
                researchData.chunksProcessed = research.chunksProcessed;
              }

              console.log(`🔍 [Import] Final transformed research data:`, {
                ...researchData,
                researchContext: researchData.researchContext
                  ? "[OBJECT]"
                  : undefined,
                ragContext: researchData.ragContext ? "[OBJECT]" : undefined,
                webSearchContext: researchData.webSearchContext
                  ? "[OBJECT]"
                  : undefined,
              });

              console.log(`🔍 [Import] Schema validation check:`, {
                hasAllRequiredFields: {
                  title: !!researchData.title,
                  type: !!researchData.type,
                  timestamp: !!researchData.timestamp,
                  status: !!researchData.status,
                  wordCount: typeof researchData.wordCount === "number",
                  researchConfig: !!researchData.researchConfig,
                  originalPrompt: !!researchData.originalPrompt,
                  agentTasks: Array.isArray(researchData.agentTasks),
                },
                note: "id, createdAt, updatedAt, version will be auto-generated by addResearch",
              });

              try {
                const newResearchId = await addResearch(researchData);
                console.log(
                  `✅ [Import] Successfully added research: ${researchData.title} with ID: ${newResearchId}`
                );

                // Log timeline data that was preserved
                const importedAgentTasksWithTimeline = researchData.agentTasks
                  ? researchData.agentTasks.filter(
                      (task) =>
                        task.progressHistory && task.progressHistory.length > 0
                    ).length
                  : 0;
                const importedProgressEntries = researchData.agentTasks
                  ? researchData.agentTasks.reduce(
                      (sum, task) =>
                        sum +
                        (task.progressHistory
                          ? task.progressHistory.length
                          : 0),
                      0
                    )
                  : 0;
                console.log(
                  `📅 [Import] - Timeline data preserved: ${importedAgentTasksWithTimeline}/${researchData.agentTasks?.length || 0} agent tasks with progress history, ${importedProgressEntries} total timeline entries`
                );
              } catch (importError) {
                console.error(
                  `❌ [Import] Failed to add research "${researchData.title}":`,
                  importError
                );
                throw importError;
              }

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

  // Refresh function to force reload of all data sources with debouncing and guards
  const refresh = useCallback(async () => {
    const now = Date.now();
    const DEBOUNCE_TIME = 1000; // 1 second debounce

    // Prevent concurrent refreshes and debounce rapid calls
    if (isRefreshing || now - lastRefreshTime < DEBOUNCE_TIME) {
      console.log(
        "⏭️ [TimeCapsule] Skipping refresh - already in progress or too recent"
      );
      return;
    }

    try {
      setIsRefreshing(true);
      setLastRefreshTime(now);
      console.log("🔄 [TimeCapsule] Refreshing research history data...");

      await refreshResearchHistory();

      console.log("✅ [TimeCapsule] Refresh completed successfully");
    } catch (error) {
      console.error("❌ [TimeCapsule] Refresh failed:", error);
      setError(error instanceof Error ? error.message : "Refresh failed");
    } finally {
      setIsRefreshing(false);
    }
    // Note: Vector store will be refreshed automatically when buildTimeCapsuleData is called
  }, [refreshResearchHistory, isRefreshing, lastRefreshTime]);

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
    refresh,

    // State
    isExporting,
    isImporting,
    exportProgress,
    importProgress,
    error,
  };
}
