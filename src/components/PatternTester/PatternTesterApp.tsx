"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChunkViewerModal } from "../shared/ChunkViewerModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Play,
  Copy,
  CheckSquare,
  Square,
  Check,
  Search,
  Eye,
  FileText,
  Bot,
  Sparkles,
  Zap,
  Loader2,
  ArrowLeft,
  Pipette,
} from "lucide-react";
import { toast } from "sonner";
import { useOllamaConnection } from "../DeepResearch/hooks/useOllamaConnection";
import { OllamaConnectionModal } from "../DeepResearch/components/OllamaConnectionModal";
import { KnowledgeBaseSection } from "../ui/knowledge-base-section";
import { KnowledgeBaseManager } from "../shared/KnowledgeBaseManager";
import { useVectorStore } from "@/components/providers/VectorStoreProvider";
import Link from "next/link";

interface PatternResult {
  pattern: string;
  description: string;
  matches: {
    content: string;
    source: string;
    chunkId: string;
    documentId: string;
    confidence: number;
    context: string;
  }[];
}

interface ExtractedData {
  patterns: PatternResult[];
  totalMatches: number;
  documentsCovered: string[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  filename: string;
  chunkCount: number;
}

interface Chunk {
  id: string;
  text: string;
  content: string;
  source: string;
  documentId: string;
  metadata?: any;
}

export function PatternTesterComponent() {
  // VectorStore integration (shared with DeepResearch)
  const {
    vectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    error: vectorStoreError,
    initializeVectorStore,
    processingAvailable,
    processingStatus,
    stats: vectorStoreStats,
  } = useVectorStore();
  const [patterns, setPatterns] = useState<string>("");
  const [results, setResults] = useState<ExtractedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressInfo, setProgressInfo] = useState<{
    patternIndex: number;
    patternsTotal: number;
    patternMatches: number;
    totalMatches: number;
  } | null>(null);
  const [resultsSearch, setResultsSearch] = useState<string>("");
  const workerRef = useRef<Worker | null>(null);
  const [availableDocs, setAvailableDocs] = useState<Document[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [chunkIdSearch, setChunkIdSearch] = useState<string>("");
  const [chunkViewData, setChunkViewData] = useState<any>(null);
  const [isChunkModalOpen, setIsChunkModalOpen] = useState(false);
  const [similarityQuery, setSimilarityQuery] = useState<string>("");
  const [similarityResults, setSimilarityResults] = useState<any[]>([]);
  const [isSimilarityLoading, setIsSimilarityLoading] = useState(false);
  const [showAllMatches, setShowAllMatches] = useState<{
    [key: number]: boolean;
  }>({});

  // Prepare data for ChunkViewerModal
  const modalChunk = useMemo(() => {
    if (!chunkViewData?.chunk) return null;
    const ch = chunkViewData.chunk;
    return {
      id: ch.id,
      content: ch.content || ch.text || "",
      startIndex: typeof ch.startIndex === "number" ? ch.startIndex : 0,
      endIndex:
        typeof ch.endIndex === "number"
          ? ch.endIndex
          : (ch.content || ch.text || "").length,
      metadata: ch.metadata || {},
    } as any;
  }, [chunkViewData]);

  const modalDocument = useMemo(() => {
    if (!chunkViewData?.document) return null;
    const d = chunkViewData.document;
    const md = d.metadata || {};
    const filename = md.filename || d.filename || d.title || "document.txt";
    const filetype = md.filetype || d.filetype || "text/plain";
    const uploadedAt =
      md.uploadedAt || d.uploadedAt || new Date().toISOString();
    const source = md.source || d.source || "unknown";
    const filesize = md.filesize || d.filesize || d.content?.length || 0;
    return {
      id: d.id || "unknown",
      title: d.title || filename,
      content: d.content || "",
      metadata: {
        filename,
        filesize,
        filetype,
        uploadedAt,
        source,
        url: md.url,
        domain: md.domain,
        documentType: md.documentType,
        description: md.description,
      },
      chunks: [],
      vectors: [],
    } as any;
  }, [chunkViewData]);

  // Ollama integration state
  const {
    connectionState,
    connect: connectOllama,
    disconnect: disconnectOllama,
    testConnection: testOllamaConnection,
    generateContent,
    isReady: isOllamaReady,
  } = useOllamaConnection();
  const [showOllamaModal, setShowOllamaModal] = useState(false);
  const [promptText, setPromptText] = useState<string>("");
  const [isGeneratingPatterns, setIsGeneratingPatterns] = useState(false);

  // Knowledge base state
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [kbDocuments, setKbDocuments] = useState<any[]>([]);
  const [documentStatus, setDocumentStatus] = useState({
    count: 0,
    totalSize: 0,
    vectorCount: 0,
    totalChunks: 0,
    totalVectors: 0,
  });

  // Initialize VectorStore and load documents from it (instead of API)
  useEffect(() => {
    const init = async () => {
      try {
        if (!vectorStoreInitialized && !vectorStoreInitializing) {
          await initializeVectorStore();
        }
      } catch (e) {
        console.warn("VectorStore init warning:", e);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load available documents from VectorStore when ready
  useEffect(() => {
    const loadFromVectorStore = async () => {
      if (!vectorStore || !vectorStoreInitialized) return;
      try {
        // Load metadata for selection list
        const docs = await vectorStore.getDocumentMetadata();
        const mapped: Document[] = docs.map((d: any) => ({
          id: d.id,
          name: d.title,
          type: d.metadata?.documentType || d.metadata?.source || "unknown",
          filename: d.metadata?.filename || d.title,
          chunkCount: d.chunkCount || 0,
        }));
        setAvailableDocs(mapped);
        setSelectedDocs(mapped.map((m) => m.id));

        // Load full documents for KnowledgeBaseManager
        const fullDocs = await vectorStore.getAllDocuments();
        setKbDocuments(fullDocs);
      } catch (err) {
        console.warn(
          "Failed to load VectorStore documents, falling back to API:",
          err
        );
        loadAvailableDocuments();
      }
    };
    loadFromVectorStore();
  }, [vectorStore, vectorStoreInitialized]);

  // Sync document status with VectorStore stats when available
  useEffect(() => {
    if (
      vectorStoreStats &&
      (vectorStoreStats.documentCount ||
        vectorStoreStats.chunkCount ||
        vectorStoreStats.vectorCount)
    ) {
      setDocumentStatus((prev) => ({
        ...prev,
        count: vectorStoreStats.documentCount,
        totalChunks: vectorStoreStats.chunkCount,
        vectorCount: vectorStoreStats.vectorCount,
        totalVectors: vectorStoreStats.vectorCount,
      }));
    }
  }, [vectorStoreStats]);

  // Update document status when documents change
  useEffect(() => {
    const totalSize = availableDocs.reduce(
      (sum, doc) => sum + doc.chunkCount * 1000,
      0
    ); // Rough estimate
    const totalChunks = availableDocs.reduce(
      (sum, doc) => sum + doc.chunkCount,
      0
    );

    setDocumentStatus({
      count: availableDocs.length,
      totalSize,
      vectorCount: totalChunks, // Assuming each chunk has a vector
      totalChunks,
      totalVectors: totalChunks,
    });
  }, [availableDocs]);

  const loadAvailableDocuments = async () => {
    try {
      const response = await fetch("/api/documents/list");
      if (response.ok) {
        const docs = await response.json();
        setAvailableDocs(docs);
        // Auto-select all documents by default
        setSelectedDocs(docs.map((doc: Document) => doc.id));
      } else {
        console.warn("Failed to load documents");
      }
    } catch (error) {
      console.error("Could not load documents from RxDB:", error);
    }
  };

  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocs((prev) => {
      if (prev.includes(docId)) {
        return prev.filter((id) => id !== docId);
      } else {
        return [...prev, docId];
      }
    });
  };

  const selectAllDocuments = () => {
    setSelectedDocs(availableDocs.map((doc) => doc.id));
  };

  const deselectAllDocuments = () => {
    setSelectedDocs([]);
  };

  const executePatternTest = async () => {
    console.log("🧪 Execute Pattern Test clicked");
    console.log("Patterns:", patterns.length, "chars");
    console.log("Selected documents:", selectedDocs);

    if (!patterns.trim()) {
      toast.error("Please provide regex patterns to test.");
      return;
    }

    if (selectedDocs.length === 0) {
      toast.error("Please select at least one document to test against.");
      return;
    }

    setIsLoading(true);
    setProgressInfo({
      patternIndex: 0,
      patternsTotal: 0,
      patternMatches: 0,
      totalMatches: 0,
    });

    try {
      // Prefer VectorStore chunks when available
      let chunks: Chunk[] = [];
      if (vectorStore && vectorStoreInitialized) {
        const allChunks = await vectorStore.getAllChunks();
        const filtered = allChunks.filter((c: any) =>
          selectedDocs.includes(c.documentId)
        );
        chunks = filtered.map((c: any) => ({
          id: c.id,
          text: c.text || c.content,
          content: c.content,
          source: c.source || c.metadata?.documentTitle,
          documentId: c.documentId,
          metadata: c.metadata,
        }));
      } else {
        // Fallback to API if VectorStore isn't ready
        const documentIds = selectedDocs.join(",");
        const response = await fetch(
          `/api/documents/chunks?documentIds=${encodeURIComponent(documentIds)}`
        );
        if (!response.ok) {
          throw new Error("Failed to load document chunks");
        }
        chunks = await response.json();
      }
      console.log(
        `📚 Loaded ${chunks.length} chunks from ${selectedDocs.length} documents`
      );

      // Parse patterns (one per line or comma-separated)
      const patternList = patterns
        .split(/\n|,/)
        .map((p) => p.trim())
        .filter((p) => p);
      console.log(
        `📋 Testing ${patternList.length} patterns against ${chunks.length} chunks`
      );

      // Offload regex processing to Web Worker
      const docNameMap: Record<string, string> = Object.fromEntries(
        availableDocs.map((d) => [d.id, d.name])
      );

      // Reduce payload to necessary fields
      const workerChunks = chunks.map((c) => ({
        id: c.id,
        text: c.text,
        content: c.content,
        source: c.source,
        documentId: c.documentId,
      }));

      // Clean up any existing worker
      if (workerRef.current) {
        try {
          workerRef.current.terminate();
        } catch {}
        workerRef.current = null;
      }

      const worker = new Worker("/workers/patternWorker.js");
      workerRef.current = worker;

      const workerPromise = new Promise<void>((resolve, reject) => {
        worker.onmessage = (ev: MessageEvent<any>) => {
          const { type, data, error } = ev.data || {};
          if (type === "progress") {
            setProgressInfo(data);
          } else if (type === "result") {
            const documentsCoveredIds: string[] = data.documentsCovered || [];
            const coveredDocNames = documentsCoveredIds.map(
              (id) => docNameMap[id] || id
            );

            const finalResults: ExtractedData = {
              patterns: data.patterns || [],
              totalMatches: data.totalMatches || 0,
              documentsCovered: coveredDocNames,
            };
            setResults(finalResults);

            toast.success(
              `Pattern Test Complete: Found ${finalResults.totalMatches} matches across ${coveredDocNames.length} documents`
            );

            resolve();
          } else if (type === "error") {
            reject(new Error(error || "Worker error"));
          }
        };

        worker.onerror = (err) => {
          reject(new Error(err.message));
        };

        worker.postMessage({
          type: "run",
          patterns: patternList,
          chunks: workerChunks,
          docNameMap,
        });
      });

      await workerPromise;
    } catch (error) {
      console.error("Error executing pattern test:", error);
      toast.error("Test Failed: An error occurred while testing patterns.");
    } finally {
      setIsLoading(false);
      setProgressInfo(null);
      if (workerRef.current) {
        try {
          workerRef.current.terminate();
        } catch {}
        workerRef.current = null;
      }
    }
  };

  const copyPatternsFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPatterns(text);
      toast.success("Patterns pasted from clipboard");
    } catch (error) {
      toast.error("Could not read from clipboard");
    }
  };

  const viewChunkById = async (chunkId?: string) => {
    const idToSearch = chunkId || chunkIdSearch;
    if (!idToSearch.trim()) {
      toast.error("Please enter a chunk ID");
      return;
    }

    try {
      // Try client-side lookup first via VectorStore (IndexedDB)
      if (vectorStore && vectorStoreInitialized) {
        try {
          const docs = await vectorStore.getAllDocuments();
          let foundChunk: any = null;
          let parentDoc: any = null;
          for (const d of docs) {
            const ch = (d.chunks || []).find((c: any) => c.id === idToSearch);
            if (ch) {
              foundChunk = ch;
              parentDoc = d;
              break;
            }
          }
          if (foundChunk && parentDoc) {
            setChunkViewData({ chunk: foundChunk, document: parentDoc });
            if (chunkId) setChunkIdSearch(chunkId);
            setIsChunkModalOpen(true);
            toast.success("Chunk loaded successfully");
            return;
          }
        } catch (e) {
          // Fallback to API if local lookup fails
          console.warn("Local chunk lookup failed, falling back to API", e);
        }
      }

      const response = await fetch(
        `/api/chunks/${encodeURIComponent(idToSearch)}`
      );
      if (response.ok) {
        const data = await response.json();
        setChunkViewData(data);
        if (chunkId) {
          setChunkIdSearch(chunkId);
        }
        setIsChunkModalOpen(true);
        toast.success("Chunk loaded successfully");
      } else {
        const error = await response.json();
        toast.error(error.error || "Chunk not found");
        setChunkViewData(null);
      }
    } catch (error) {
      console.error("Error fetching chunk:", error);
      toast.error("Failed to fetch chunk");
    }
  };

  const performSimilaritySearch = async () => {
    if (!similarityQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsSimilarityLoading(true);
    try {
      if (!vectorStore || !vectorStoreInitialized) {
        toast.error("Knowledge Base not initialized yet");
        setIsSimilarityLoading(false);
        return;
      }

      // Run semantic similarity search via VectorStore (Xenova embeddings)
      const rawResults = await vectorStore.searchSimilar(
        similarityQuery,
        0.3,
        20
      );

      // Filter by selected documents if any selection exists
      const filteredResults = rawResults.filter((r: any) =>
        selectedDocs.includes(r.document.id)
      );

      setSimilarityResults(filteredResults);
      toast.success(`Found ${filteredResults.length} similar chunks`);
    } catch (error: any) {
      console.error("Error performing similarity search:", error);
      const message = error?.message || "Failed to perform similarity search";
      toast.error(message);
      setSimilarityResults([]);
    } finally {
      setIsSimilarityLoading(false);
    }
  };

  // Helpers: regex parsing and highlighting
  const parseRegexFromPatternString = (
    patternStr: string
  ): { body: string; flags: string } => {
    const m = patternStr.match(/^\/(.*)\/([gimsuy]*)$/);
    if (m) {
      return { body: m[1], flags: m[2] || "gi" };
    }
    return { body: patternStr, flags: "gi" };
  };

  const buildGlobalRegexFromPattern = (patternStr: string): RegExp => {
    const { body, flags } = parseRegexFromPatternString(patternStr);
    const uniqFlags = Array.from(new Set((flags + "g").split(""))).join("");
    try {
      return new RegExp(body, uniqFlags);
    } catch {
      return new RegExp(body, "gi");
    }
  };

  const highlightOccurrences = (text: string, regex: RegExp) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (start > lastIndex) parts.push(text.slice(lastIndex, start));
      parts.push(
        <mark key={`${start}-${end}`} className="bg-yellow-200 px-0.5 rounded">
          {match[0]}
        </mark>
      );
      lastIndex = end;
      if (regex.lastIndex === start) regex.lastIndex++;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return <span>{parts}</span>;
  };

  const renderHighlightedContext = (
    contextText: string,
    patternStr: string
  ) => {
    try {
      const r = buildGlobalRegexFromPattern(patternStr);
      return highlightOccurrences(contextText, r);
    } catch {
      return <span>{contextText}</span>;
    }
  };

  // Generate regex patterns from text prompt using Ollama
  const generatePatternsFromPrompt = async () => {
    if (!promptText.trim()) {
      toast.error("Please enter a text prompt for pattern generation");
      return;
    }

    if (!isOllamaReady) {
      toast.error("Ollama is not connected. Please connect to Ollama first.");
      setShowOllamaModal(true);
      return;
    }

    setIsGeneratingPatterns(true);
    try {
      const prompt = `You are a regex generator. Output ONLY valid JSON with no markdown or commentary.
Return an object with this exact schema:
{
  "patterns": [
    { "description": string, "pattern": string, "flags": string }
  ]
}
Rules:
- Do not include code fences.
- "pattern" should be the regex body WITHOUT surrounding slashes.
- "flags" should be a combination of g,i,m,s,u,y as needed (default to "gi" if unsure).
- Provide 3-6 high-quality patterns.

User prompt: ${promptText}`;

      const response = await generateContent(prompt);

      // Attempt to parse JSON robustly
      const tryParseJson = (text: string): any | null => {
        const cleaned = text
          .trim()
          .replace(/^```json|```$/g, "")
          .trim();
        try {
          return JSON.parse(cleaned);
        } catch {}
        const objMatch = cleaned.match(/\{[\s\S]*\}/);
        if (objMatch) {
          try {
            return JSON.parse(objMatch[0]);
          } catch {}
        }
        const arrMatch = cleaned.match(/\[[\s\S]*\]/);
        if (arrMatch) {
          try {
            return { patterns: JSON.parse(arrMatch[0]) };
          } catch {}
        }
        return null;
      };

      const json = tryParseJson(response);
      if (
        !json ||
        !Array.isArray(json.patterns) ||
        json.patterns.length === 0
      ) {
        toast.warning("LLM did not return valid JSON patterns.");
        console.log("Raw LLM response:", response);
        return;
      }

      const lines: string[] = [];
      for (const p of json.patterns) {
        if (!p || !p.pattern) continue;
        const desc = (p.description || "Pattern").toString().trim();
        const body = p.pattern.toString().replace(/^\/(.*)\/$/, "$1");
        const flags =
          (p.flags || "gi").toString().replace(/[^gimsuy]/g, "") || "gi";
        lines.push(`${desc}: /${body}/${flags}`);
      }

      if (lines.length > 0) {
        const generatedPatterns = lines.join("\n");
        setPatterns((prev) =>
          prev ? prev + "\n" + generatedPatterns : generatedPatterns
        );
        toast.success(
          `Generated ${lines.length} regex patterns from your prompt!`
        );
      } else {
        toast.warning("No usable patterns found in JSON.");
      }
    } catch (error) {
      console.error("Error generating patterns:", error);
      toast.error(
        "Failed to generate patterns: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsGeneratingPatterns(false);
    }
  };

  // Knowledge base tab configurations
  const tabConfigs = [
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      filter: (doc: any) =>
        doc.metadata?.documentType !== "ai_generated" &&
        doc.metadata?.documentType !== "flow-session",
    },
    {
      id: "ai_generated",
      label: "AI Generated",
      icon: Bot,
      filter: (doc: any) =>
        doc.metadata?.documentType === "ai_generated" &&
        doc.metadata?.documentType !== "flow-session",
    },
  ];

  const exportToCSV = () => {
    if (!results) return;

    const csvRows = [
      [
        "Pattern",
        "Description",
        "Match Content",
        "Source",
        "Document ID",
        "Chunk ID",
        "Full Context",
        "Confidence",
        "Document Name",
      ],
    ];

    results.patterns.forEach((patternResult) => {
      if (patternResult.matches.length === 0) {
        csvRows.push([
          patternResult.pattern,
          patternResult.description,
          "No matches found",
          "",
          "",
          "",
          "",
          "0",
          "",
        ]);
      } else {
        patternResult.matches.forEach((match) => {
          const docName =
            availableDocs.find((d) => d.id === match.documentId)?.name ||
            "Unknown";
          csvRows.push([
            patternResult.pattern,
            patternResult.description,
            match.content.replace(/"/g, '""'), // Escape quotes
            match.source,
            match.documentId,
            match.chunkId,
            match.context.replace(/"/g, '""'), // Full chunk context
            match.confidence.toString(),
            docName,
          ]);
        });
      }
    });

    const csvContent = csvRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pattern_test_results_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Results exported to CSV file");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              🧪 Pattern Extraction Tester
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOllamaModal(true)}
                  className={
                    connectionState.connected
                      ? "border-green-500 text-green-700"
                      : ""
                  }
                >
                  <Bot className="h-4 w-4 mr-2" />
                  {connectionState.connected ? "Connected" : "Connect Ollama"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKnowledgeBase(!showKnowledgeBase)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {showKnowledgeBase ? "Hide" : "Show"} Knowledge Base
                </Button>
              </div>
            </CardTitle>
            <Link href="/rag/pipeline">
              <Button variant="outline" size="sm" className="ml-auto">
                <Pipette className="h-4 w-4 mr-2" />
                Rag Pipeline
              </Button>
            </Link>
          </CardHeader>
        </Card>

        {/* Knowledge Base Section */}
        {showKnowledgeBase && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <KnowledgeBaseSection
                documentStatus={documentStatus}
                onUploadDocuments={() => {
                  // This would typically open an upload dialog
                  toast.info(
                    "Upload functionality not implemented in this tester"
                  );
                }}
                onManageKnowledge={() => {
                  toast.info("Management functionality available in main app");
                }}
                onScrapeUrl={() => {
                  toast.info(
                    "URL scraping functionality available in main app"
                  );
                }}
                isCompact={true}
              />
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <KnowledgeBaseManager
                    documents={
                      kbDocuments.length > 0
                        ? kbDocuments
                        : availableDocs.map((doc) => ({
                            id: doc.id,
                            title: doc.name,
                            content: `Document: ${doc.name}`,
                            metadata: {
                              filename: doc.filename,
                              filesize: doc.chunkCount * 1000,
                              filetype: doc.type,
                              uploadedAt: new Date().toISOString(),
                              source: "local",
                              documentType: doc.type,
                            },
                            chunks: [],
                            vectors: [],
                          }))
                    }
                    documentStatus={{
                      count:
                        vectorStoreStats?.documentCount || documentStatus.count,
                      totalSize: documentStatus.totalSize,
                      totalChunks:
                        vectorStoreStats?.chunkCount ||
                        documentStatus.totalChunks,
                      totalVectors:
                        vectorStoreStats?.vectorCount ||
                        documentStatus.totalVectors,
                    }}
                    onDeleteDocument={(docId) => {
                      toast.info(
                        "Delete functionality not implemented in tester"
                      );
                    }}
                    showUploadButton={false}
                    tabConfigs={tabConfigs}
                    title="Pattern Tester Documents"
                    description="Documents available for pattern testing"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Additional Tools Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Chunk Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Chunk Viewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter chunk ID..."
                  value={chunkIdSearch}
                  onChange={(e) => setChunkIdSearch(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && viewChunkById()}
                />
                <Button onClick={() => viewChunkById()} variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {chunkViewData && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Chunk ID:</strong> {chunkViewData.chunk.id}
                    </div>
                    <div>
                      <strong>Document:</strong>{" "}
                      {chunkViewData.document?.title || "Unknown"}
                    </div>
                    <div>
                      <strong>File:</strong> {chunkViewData.document?.filename}
                    </div>
                    <div className="mt-3">
                      <strong>Content:</strong>
                      <div className="mt-2 p-3 bg-white rounded border text-xs font-mono overflow-x-auto">
                        {chunkViewData.chunk.content}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Similarity Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5" />
                Similarity Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter search query..."
                  value={similarityQuery}
                  onChange={(e) => setSimilarityQuery(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && performSimilaritySearch()
                  }
                />
                <Button
                  onClick={performSimilaritySearch}
                  variant="outline"
                  disabled={isSimilarityLoading}
                >
                  {isSimilarityLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {similarityResults.length > 0 && (
                <ScrollArea className="h-64 mt-4">
                  <div className="space-y-2">
                    {similarityResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-lg text-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">
                            {result.document?.title || "Unknown"}
                          </div>
                          <Badge variant="secondary">
                            {Math.round((result.similarity || 0) * 100)}% match
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          Chunk ID: {result.chunk?.id}
                        </div>
                        <div className="text-xs bg-white p-2 rounded border">
                          {result.chunk?.content?.substring(0, 200)}...
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2 p-0 h-auto"
                          onClick={() => {
                            if (result.chunk?.id)
                              setChunkIdSearch(result.chunk.id);
                            viewChunkById();
                          }}
                        >
                          View Full Chunk →
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* AI Pattern Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Pattern Generation
                  {connectionState.connected && (
                    <Badge variant="secondary" className="ml-2">
                      <Bot className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt-input">
                      Describe what you want to extract:
                    </Label>
                    <Textarea
                      id="prompt-input"
                      placeholder="E.g., 'Find all machine learning methods and their performance metrics' or 'Extract author names and publication dates'"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={generatePatternsFromPrompt}
                    disabled={!promptText.trim() || isGeneratingPatterns}
                    className="w-full"
                    variant="secondary"
                  >
                    {isGeneratingPatterns ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Patterns...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Regex Patterns with AI
                      </>
                    )}
                  </Button>
                  {!connectionState.connected && (
                    <p className="text-sm text-orange-600">
                      💡 Connect to Ollama to use AI pattern generation
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Patterns Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📋 Regex Patterns
                  <Button
                    variant="default"
                    size="sm"
                    onClick={executePatternTest}
                    disabled={
                      !patterns.trim() || isLoading || selectedDocs.length === 0
                    }
                    className="ml-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {progressInfo
                          ? `Running ${progressInfo.patternIndex}/${progressInfo.patternsTotal}...`
                          : "Running..."}
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPatternsFromClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    Paste from Clipboard
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`Enter regex patterns (one per line or comma-separated):
GRPO Pattern: /Group Relative Policy Optimization \\(GRPO\\)[^\\n]{0,100}/gi
Method Pattern: /\\b[A-Z]{2,}\\b.*method/gi
Performance: /\\d+(\\.\\d+)?%?\\s*(improvement|accuracy|score)/gi`}
                  value={patterns}
                  onChange={(e) => setPatterns(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Format: "Description: /pattern/flags" or just "/pattern/flags"
                </p>
              </CardContent>
            </Card>

            {/* Document Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📄 Select Documents to Test
                  <div className="ml-auto flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={selectAllDocuments}
                    >
                      <CheckSquare className="h-4 w-4 mr-1" />
                      Select All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={deselectAllDocuments}
                    >
                      <Square className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {availableDocs.length === 0 ? (
                  <div className="text-gray-500 text-sm py-4">
                    {vectorStoreInitializing
                      ? "Initializing Knowledge Base..."
                      : "No documents found in Knowledge Base"}
                  </div>
                ) : (
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {availableDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleDocumentSelection(doc.id)}
                        >
                          <div
                            className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center
                            ${
                              selectedDocs.includes(doc.id)
                                ? "bg-blue-600 border-blue-600"
                                : "bg-white border-gray-300"
                            }
                          `}
                          >
                            {selectedDocs.includes(doc.id) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">
                              {doc.type} • {doc.chunkCount} chunks
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
                <div className="mt-4 text-sm text-gray-600">
                  {selectedDocs.length} of {availableDocs.length} documents
                  selected
                </div>
              </CardContent>
            </Card>

            {/* Execute Button */}
            <Button
              onClick={executePatternTest}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {progressInfo
                    ? `Testing (${progressInfo.patternIndex}/${progressInfo.patternsTotal})...`
                    : "Testing Patterns..."}
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Execute Pattern Test
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle>🔍 Test Results</CardTitle>
                {results && (
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="relative">
                      <Input
                        placeholder="Search results..."
                        value={resultsSearch}
                        onChange={(e) => setResultsSearch(e.target.value)}
                        className="pr-8"
                      />
                      <Search className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <Button
                      variant="outline"
                      onClick={exportToCSV}
                      className=""
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="text-center text-gray-500 py-12">
                    Run a pattern test to see results
                  </div>
                ) : (
                  <ScrollArea className="h-[1200px]">
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900">Summary</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-blue-700">
                              Total Matches:
                            </span>
                            <div className="font-bold text-xl">
                              {results.totalMatches}
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-700">Patterns:</span>
                            <div className="font-bold text-xl">
                              {results.patterns.length}
                            </div>
                          </div>
                          <div>
                            <span className="text-blue-700">Documents:</span>
                            <div className="font-bold text-xl">
                              {results.documentsCovered.length}
                            </div>
                          </div>
                        </div>
                        {resultsSearch && (
                          <div className="text-xs text-blue-800 mt-2">
                            Filtering by "{resultsSearch}" — showing matches
                            that include this text
                          </div>
                        )}
                      </div>

                      {/* Pattern Results */}
                      {(() => {
                        const q = resultsSearch.toLowerCase().trim();
                        const filtered = q
                          ? results.patterns
                              .map((pr) => ({
                                ...pr,
                                matches: pr.matches.filter((m) =>
                                  [
                                    pr.description,
                                    pr.pattern,
                                    m.content,
                                    m.context,
                                    m.source,
                                    m.chunkId,
                                    availableDocs.find(
                                      (d) => d.id === m.documentId
                                    )?.name || "",
                                  ]
                                    .join("\n")
                                    .toLowerCase()
                                    .includes(q)
                                ),
                              }))
                              .filter((pr) => pr.matches.length > 0)
                          : results.patterns;
                        return filtered.map((patternResult, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">
                                  {patternResult.description}
                                </h4>
                                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {patternResult.pattern}
                                </code>
                              </div>
                              <Badge
                                variant={
                                  patternResult.matches.length > 0
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {patternResult.matches.length} matches
                              </Badge>
                            </div>

                            {patternResult.matches.length > 0 ? (
                              <div className="space-y-2 mt-3">
                                {(showAllMatches[index]
                                  ? patternResult.matches
                                  : patternResult.matches.slice(0, 3)
                                ).map((match, matchIndex) => (
                                  <div
                                    key={matchIndex}
                                    className="bg-green-50 p-3 rounded text-sm"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="font-medium text-green-800">
                                        📄 {match.source}
                                      </div>
                                      <div className="flex gap-2">
                                        <Badge
                                          variant="secondary"
                                          className="text-xs cursor-pointer hover:bg-gray-300"
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              match.chunkId
                                            );
                                            toast.success("Chunk ID copied");
                                          }}
                                        >
                                          Chunk: {match.chunkId.substring(0, 8)}
                                          ...
                                        </Badge>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-6 px-2 text-xs"
                                          onClick={() =>
                                            viewChunkById(match.chunkId)
                                          }
                                        >
                                          <Eye className="h-3 w-3 mr-1" />
                                          View
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-green-200 mb-2">
                                      <div className="font-semibold text-green-900 mb-1">
                                        Match:
                                      </div>
                                      <code className="text-gray-800 break-words">
                                        {match.content}
                                      </code>
                                    </div>
                                    <div className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded">
                                      <strong>Context:</strong>{" "}
                                      <span className="text-gray-700">
                                        {renderHighlightedContext(
                                          match.context,
                                          patternResult.pattern
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                      <div className="text-green-600">
                                        Confidence:{" "}
                                        {Math.round(match.confidence * 100)}%
                                      </div>
                                      <div className="text-gray-500">
                                        Doc:{" "}
                                        {availableDocs.find(
                                          (d) => d.id === match.documentId
                                        )?.name ||
                                          match.documentId.substring(0, 8)}
                                        ...
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {patternResult.matches.length > 3 && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setShowAllMatches((prev) => ({
                                        ...prev,
                                        [index]: !prev[index],
                                      }))
                                    }
                                    className="w-full mt-2"
                                  >
                                    {showAllMatches[index]
                                      ? "Show Less"
                                      : `Show All ${patternResult.matches.length} Matches`}
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <div className="text-gray-500 text-sm mt-2">
                                No matches found for this pattern
                              </div>
                            )}
                          </div>
                        ));
                      })()}
                      {resultsSearch && (
                        <div className="text-xs text-gray-500">
                          End of filtered results
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Chunk Viewer Modal */}
        <ChunkViewerModal
          isOpen={isChunkModalOpen}
          onClose={() => setIsChunkModalOpen(false)}
          chunk={modalChunk}
          document={modalDocument}
        />

        {/* Ollama Connection Modal */}
        <OllamaConnectionModal
          open={showOllamaModal}
          onOpenChange={setShowOllamaModal}
          onConnect={connectOllama}
          onTestConnection={testOllamaConnection}
          connectionState={connectionState}
        />
      </div>
    </div>
  );
}
