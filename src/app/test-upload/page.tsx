"use client";

import { useEffect, useState } from "react";
import { useVectorStore } from "@/components/providers/VectorStoreProvider";

export default function TestUploadPage() {
  const [status, setStatus] = useState("Initializing...");
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const { vectorStore, isInitialized, isInitializing, initializeVectorStore } = useVectorStore();

  const addLog = (message: string) => {
    console.log(message);
    setLogs((prev) => [...prev, message]);
  };

  useEffect(() => {
    async function uploadDocument() {
      try {
        setStatus("Starting upload...");
        addLog("🚀 Starting PDF upload and storage...");

        // Step 1: Initialize VectorStore if needed
        if (!isInitialized && !isInitializing) {
          addLog("⏳ Initializing VectorStore...");
          await initializeVectorStore();
        }

        // Wait for initialization to complete
        if (isInitializing) {
          addLog("⏳ Waiting for VectorStore initialization...");
          let attempts = 0;
          while (!isInitialized && attempts < 40) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            attempts++;
          }
        }

        if (!vectorStore || !isInitialized) {
          throw new Error("VectorStore failed to initialize");
        }

        addLog("✅ VectorStore is ready!");

        // Step 2: Fetch processed document from server
        addLog("📥 Fetching and processing PDF on server...");
        const response = await fetch("/api/test/upload-ddp");
        if (!response.ok) {
          throw new Error(`Failed to fetch processed document: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Server processing failed");
        }
        
        addLog(`✅ Server processing complete: ${data.document.chunks.length} chunks generated`);

        // Step 3: Create File object for metadata
        addLog("📄 Creating file metadata...");
        const pdfResponse = await fetch("/api/test/get-pdf");
        const pdfBlob = await pdfResponse.blob();
        const file = new File([pdfBlob], "ddp-python-basics.pdf", { type: "application/pdf" });

        // Step 4: Import to IndexedDB via VectorStore
        setStatus("Storing in Knowledge Base...");
        addLog("💾 Storing in Knowledge Base (IndexedDB)...");
        
        await vectorStore.importProcessedDocument(data.document, file);
        addLog("✅ Document stored in Knowledge Base!");

        // Step 5: Verify storage
        const stats = await vectorStore.getStats();
        addLog(`📊 KB Stats: ${stats.documentCount} documents, ${stats.chunkCount} chunks`);

        setStatus("✅ Upload Complete!");
        setResult({
          success: true,
          documentId: data.document.id,
          chunks: data.document.chunks.length,
          kbStats: stats,
        });
      } catch (error: any) {
        console.error("❌ Upload failed:", error);
        addLog(`❌ Upload failed: ${error.message}`);
        setStatus("❌ Upload Failed");
        setResult({
          success: false,
          error: error.message,
        });
      }
    }

    uploadDocument();
  }, [vectorStore, isInitialized, isInitializing, initializeVectorStore]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Upload: DDP PDF → Knowledge Base</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <p className="text-lg">{status}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Result</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

