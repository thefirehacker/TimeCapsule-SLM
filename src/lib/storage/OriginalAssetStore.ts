import { openDB, IDBPDatabase } from "idb";

interface StoredAsset {
  id: string;
  type: "file" | "image-preview";
  mimeType: string;
  size: number;
  createdAt: string;
  blob: Blob;
}

type AssetStoreDB = {
  assets: StoredAsset;
};

/**
 * Lightweight wrapper around IndexedDB for persisting original user uploads.
 * Keeps large binaries out of RxDB JSON docs while allowing retrieval on demand.
 */
export class OriginalAssetStore {
  private dbPromise: Promise<IDBPDatabase<AssetStoreDB>> | null = null;
  private readonly dbName = "canvas3d-original-assets";
  private readonly storeName = "assets";

  private ensureDb() {
    if (typeof window === "undefined" || typeof indexedDB === "undefined") {
      throw new Error("IndexedDB is not available in this environment.");
    }

    if (!this.dbPromise) {
      this.dbPromise = openDB<AssetStoreDB>(this.dbName, 1, {
        upgrade: (db) => {
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id" });
          }
        },
      });
    }
    return this.dbPromise;
  }

  async saveAsset(
    assetId: string,
    blob: Blob,
    options: { type?: StoredAsset["type"]; mimeType?: string } = {}
  ): Promise<string | null> {
    try {
      const db = await this.ensureDb();
      await db.put(this.storeName, {
        id: assetId,
        type: options.type || "file",
        mimeType: options.mimeType || blob.type || "application/octet-stream",
        size: blob.size,
        createdAt: new Date().toISOString(),
        blob,
      });
      return assetId;
    } catch (error) {
      console.warn("Failed to persist original asset:", error);
      return null;
    }
  }

  async getAsset(assetId: string): Promise<StoredAsset | null> {
    try {
      const db = await this.ensureDb();
      return (await db.get(this.storeName, assetId)) || null;
    } catch (error) {
      console.warn("Failed to read asset from store:", error);
      return null;
    }
  }

  async deleteAsset(assetId: string): Promise<void> {
    try {
      const db = await this.ensureDb();
      await db.delete(this.storeName, assetId);
    } catch (error) {
      console.warn("Failed to delete stored asset:", error);
    }
  }
}
