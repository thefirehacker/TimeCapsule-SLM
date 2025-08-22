/**
 * RxDB with Dexie Storage for Research History
 * Follows best practices for RxDB usage with proper error handling and versioning
 */

import {
  createRxDatabase,
  RxDatabase,
  RxCollection,
  RxDocument,
  addRxPlugin,
} from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";

// Add RxDB plugins
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

export interface ResearchAgentTask {
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
}

export interface ResearchHistoryItem {
  id: string;
  title: string;
  type:
    | "deep-research"
    | "social"
    | "finance"
    | "academic"
    | "technical"
    | "market";
  timestamp: number;
  status: "completed" | "in_progress" | "failed";
  wordCount: number;
  duration?: number;

  // Research configuration
  researchConfig: {
    type: string;
    depth: string;
    enableRAG: boolean;
    enableWebSearch: boolean;
  };

  // Original query and context
  originalPrompt: string;
  ragContext?: any;
  webSearchContext?: any;

  // Complete multi-agent research context (stored as JSON)
  researchContext?: any;

  // Agent execution details
  agentTasks: ResearchAgentTask[];

  // Research steps and agents (legacy support)
  steps?: Array<{
    id: string;
    type: string;
    status: string;
    duration?: number;
    reasoning?: string;
    query?: string;
    queries?: string[];
    sources?: Array<{
      id: string;
      title: string;
      source: string;
      excerpt?: string;
      similarity?: number;
    }>;
    results?: any[];
    confidence?: number;
    subSteps?: ResearchAgentTask[];
  }>;

  // Final results
  finalOutput?: string;
  sourcesCount?: number;
  chunksProcessed?: number;

  // Metadata
  createdAt: number;
  updatedAt: number;
  version: string;
}

// RxDB Schema for ResearchHistoryItem
const researchHistorySchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    title: {
      type: "string",
    },
    type: {
      type: "string",
      enum: [
        "deep-research",
        "social",
        "finance",
        "academic",
        "technical",
        "market",
      ],
    },
    timestamp: {
      type: "number",
    },
    status: {
      type: "string",
      enum: ["completed", "in_progress", "failed"],
    },
    wordCount: {
      type: "number",
    },
    duration: {
      type: "number",
    },
    researchConfig: {
      type: "object",
      properties: {
        type: { type: "string" },
        depth: { type: "string" },
        enableRAG: { type: "boolean" },
        enableWebSearch: { type: "boolean" },
      },
      required: ["type", "depth", "enableRAG", "enableWebSearch"],
    },
    originalPrompt: {
      type: "string",
    },
    ragContext: {
      type: "object",
    },
    webSearchContext: {
      type: "object",
    },
    researchContext: {
      type: "object",
    },
    agentTasks: {
      type: "array",
      items: {
        type: "object",
      },
    },
    steps: {
      type: "array",
      items: {
        type: "object",
      },
    },
    finalOutput: {
      type: "string",
    },
    sourcesCount: {
      type: "number",
    },
    chunksProcessed: {
      type: "number",
    },
    createdAt: {
      type: "number",
    },
    updatedAt: {
      type: "number",
    },
    version: {
      type: "string",
    },
  },
  required: [
    "id",
    "title",
    "type",
    "timestamp",
    "status",
    "wordCount",
    "researchConfig",
    "originalPrompt",
    "agentTasks",
    "createdAt",
    "updatedAt",
    "version",
  ],
};

type ResearchHistoryDocument = RxDocument<ResearchHistoryItem>;
type ResearchHistoryCollection = RxCollection<ResearchHistoryItem>;

class ResearchHistoryDB {
  private db: RxDatabase | null = null;
  private dbName = "timecapsule_research_db"; // Fixed: must start with lowercase and follow CouchDB naming rules
  private collection: ResearchHistoryCollection | null = null;

  async init(): Promise<void> {
    try {
      console.log("🚀 Initializing RxDB with Dexie storage...");

      // Create RxDB database with Dexie storage wrapped with validation (required for dev-mode)
      const storage = wrappedValidateAjvStorage({
        storage: getRxStorageDexie(),
      });

      this.db = await createRxDatabase({
        name: this.dbName,
        storage: storage,
        ignoreDuplicate: true,
      });

      console.log("✅ RxDB database created successfully");

      // Add research history collection
      await this.db.addCollections({
        researchHistory: {
          schema: researchHistorySchema,
          methods: {
            // Custom collection methods can be added here
            findByType(type: string) {
              return this.find({
                selector: {
                  type: type,
                },
              });
            },
            findRecent(limit: number = 10) {
              return this.find({
                sort: [{ timestamp: "desc" }],
                limit: limit,
              });
            },
          },
        },
      });

      this.collection = this.db.researchHistory;
      console.log("✅ RxDB research history collection initialized");
    } catch (error) {
      console.error("❌ RxDB initialization failed:", error);
      throw error;
    }
  }

  async addResearch(
    item: Omit<ResearchHistoryItem, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    if (!this.collection) await this.init();

    const researchItem: ResearchHistoryItem = {
      ...item,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: "1.0",
    };

    try {
      const doc = await this.collection!.insert(researchItem);
      console.log("✅ Research item added to RxDB:", doc.id);
      return doc.id;
    } catch (error) {
      console.error("❌ Error adding research item to RxDB:", error);
      throw error;
    }
  }

  async updateResearch(
    id: string,
    updates: Partial<ResearchHistoryItem>
  ): Promise<void> {
    if (!this.collection) await this.init();

    try {
      const doc = await this.collection!.findOne(id).exec();
      if (!doc) {
        throw new Error(`Research item with id ${id} not found`);
      }

      await doc.update({
        $set: {
          ...updates,
          updatedAt: Date.now(),
        },
      });

      console.log("✅ Research item updated in RxDB:", id);
    } catch (error) {
      console.error("❌ Error updating research item in RxDB:", error);
      throw error;
    }
  }

  async getResearch(id: string): Promise<ResearchHistoryItem | null> {
    if (!this.collection) await this.init();

    try {
      const doc = await this.collection!.findOne(id).exec();
      return doc ? JSON.parse(JSON.stringify(doc.toJSON())) : null;
    } catch (error) {
      console.error("❌ Error getting research item from RxDB:", error);
      throw error;
    }
  }

  async getAllResearch(): Promise<ResearchHistoryItem[]> {
    if (!this.collection) await this.init();

    try {
      const docs = await this.collection!.find()
        .sort({ timestamp: "desc" })
        .exec();

      return docs.map((doc) => JSON.parse(JSON.stringify(doc.toJSON())));
    } catch (error) {
      console.error("❌ Error getting all research items from RxDB:", error);
      throw error;
    }
  }

  async getResearchByType(type: string): Promise<ResearchHistoryItem[]> {
    if (!this.collection) await this.init();

    try {
      const docs = await this.collection!.find({
        selector: {
          type: { $eq: type as any },
        },
      })
        .sort({ timestamp: "desc" })
        .exec();

      return docs.map((doc) => JSON.parse(JSON.stringify(doc.toJSON())));
    } catch (error) {
      console.error("❌ Error getting research by type from RxDB:", error);
      throw error;
    }
  }

  async deleteResearch(id: string): Promise<void> {
    if (!this.collection) await this.init();

    try {
      const doc = await this.collection!.findOne(id).exec();
      if (!doc) {
        throw new Error(`Research item with id ${id} not found`);
      }

      await doc.remove();
      console.log("✅ Research item deleted from RxDB:", id);
    } catch (error) {
      console.error("❌ Error deleting research item from RxDB:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    if (!this.collection) await this.init();

    try {
      // Remove all documents from the collection
      const allDocs = await this.collection!.find().exec();
      await Promise.all(allDocs.map((doc) => doc.remove()));
      console.log("✅ All research history cleared from RxDB");
    } catch (error) {
      console.error("❌ Error clearing research history from RxDB:", error);
      throw error;
    }
  }

  async searchResearch(query: string): Promise<ResearchHistoryItem[]> {
    if (!this.collection) await this.init();

    try {
      const searchTerm = query.toLowerCase();

      // Get all documents and filter in memory for better compatibility
      const allDocs = await this.collection!.find().exec();
      const allResearch = allDocs.map((doc) =>
        JSON.parse(JSON.stringify(doc.toJSON()))
      );

      return allResearch.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          item.originalPrompt.toLowerCase().includes(searchTerm) ||
          item.type.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error("❌ Error searching research in RxDB:", error);
      throw error;
    }
  }

  async getStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    oldestDate: number | null;
    newestDate: number | null;
  }> {
    if (!this.collection) await this.init();

    try {
      const allDocs = await this.collection!.find().exec();
      const allResearch = allDocs.map((doc) =>
        JSON.parse(JSON.stringify(doc.toJSON()))
      );

      const stats = {
        total: allResearch.length,
        byType: {} as Record<string, number>,
        byStatus: {} as Record<string, number>,
        oldestDate:
          allResearch.length > 0
            ? Math.min(...allResearch.map((r) => r.timestamp))
            : null,
        newestDate:
          allResearch.length > 0
            ? Math.max(...allResearch.map((r) => r.timestamp))
            : null,
      };

      allResearch.forEach((item) => {
        stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
        stats.byStatus[item.status] = (stats.byStatus[item.status] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error("❌ Error getting research stats from RxDB:", error);
      throw error;
    }
  }

  private generateId(): string {
    return `research_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Cleanup method to close database connection
  async close(): Promise<void> {
    if (this.db) {
      await this.db.remove();
      this.db = null;
      this.collection = null;
      console.log("✅ RxDB database closed");
    }
  }
}

// Export singleton instance
export const researchHistoryDB = new ResearchHistoryDB();

// Initialize on module load
if (typeof window !== "undefined") {
  researchHistoryDB.init().catch((error) => {
    console.error("❌ Failed to initialize RxDB research history:", error);
  });
}
