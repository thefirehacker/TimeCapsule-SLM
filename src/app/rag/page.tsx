"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVectorStore } from "@/components/providers/VectorStoreProvider";
import VectorStoreInitModal from "@/components/VectorStoreInitModal";
import { OllamaConnectionModal } from "@/components/DeepResearch/components/OllamaConnectionModal";
import { useOllamaConnection } from "@/components/DeepResearch/hooks/useOllamaConnection";
import { KnowledgeBaseManager } from "@/components/shared/KnowledgeBaseManager";
import {
  Brain,
  Send,
  Bot,
  User,
  Wifi,
  WifiOff,
  Database,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  sources?: Array<{
    id: string;
    title: string;
    similarity: number;
    snippet: string;
  }>;
}

// Helper functions for enhanced search
const generateQueryVariations = (query: string): string[] => {
  const variations = [query];

  // Add question variations
  if (
    !query.toLowerCase().includes("what") &&
    !query.toLowerCase().includes("how") &&
    !query.toLowerCase().includes("why")
  ) {
    variations.push(`What is ${query}?`);
    variations.push(`How does ${query} work?`);
  }

  // Add key terms extraction
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3);
  if (words.length > 1) {
    // Create variations with individual key terms
    words.forEach((word) => {
      if (!variations.some((v) => v.toLowerCase().includes(word))) {
        variations.push(word);
      }
    });

    // Create variation with key terms joined
    const keyTerms = words.slice(0, 3).join(" ");
    if (keyTerms !== query) {
      variations.push(keyTerms);
    }
  }

  return variations.slice(0, 4); // Limit to 4 variations to avoid too many queries
};

const performKeywordSearch = async (
  vectorStore: any,
  query: string
): Promise<any[]> => {
  try {
    const docs = await vectorStore.getAllDocuments();
    const keywordResults: any[] = [];

    // Extract keywords from query
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .filter(
        (word) =>
          ![
            "the",
            "and",
            "or",
            "but",
            "in",
            "on",
            "at",
            "to",
            "for",
            "of",
            "with",
            "by",
          ].includes(word)
      );

    docs.forEach((doc: any) => {
      // Check title matches
      const titleLower = doc.title.toLowerCase();
      const titleMatches = keywords.some((keyword) =>
        titleLower.includes(keyword)
      );

      // Check content chunks for keyword matches
      doc.chunks?.forEach((chunk: any) => {
        const contentLower = chunk.content.toLowerCase();
        const keywordMatches = keywords.filter((keyword) =>
          contentLower.includes(keyword)
        ).length;

        if (keywordMatches > 0 || titleMatches) {
          // Calculate simple keyword score
          const titleBoost = titleMatches ? 0.3 : 0;
          const contentScore = keywordMatches / keywords.length;
          const similarity = Math.min(titleBoost + contentScore * 0.7, 0.95); // Cap at 0.95 to stay below semantic results

          keywordResults.push({
            document: doc,
            chunk: chunk,
            similarity: similarity,
            searchType: "keyword",
          });
        }
      });
    });

    return keywordResults
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10);
  } catch (error) {
    console.warn("Keyword search failed:", error);
    return [];
  }
};

const deduplicateSearchResults = (results: any[]): any[] => {
  const seen = new Set<string>();
  const deduplicated: any[] = [];

  // Sort by similarity first to keep the best results
  const sorted = results.sort((a, b) => b.similarity - a.similarity);

  sorted.forEach((result) => {
    const key = `${result.document.id}-${result.chunk.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(result);
    }
  });

  return deduplicated;
};

export default function RAGChatPage() {
  const {
    vectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    error: vectorStoreError,
    initializeVectorStore,
    processingAvailable,
    processingStatus,
    downloadProgress,
    stats,
  } = useVectorStore();

  const { connectionState, connect, testConnection, generateContentStream } =
    useOllamaConnection();

  const [openConnectModal, setOpenConnectModal] = useState(false);
  const [openSources, setOpenSources] = useState(false);
  const [initModalOpen, setInitModalOpen] = useState(false);
  const [sourceDocs, setSourceDocs] = useState<any[]>([]);
  const [loadingSources, setLoadingSources] = useState(false);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the VectorStore initializes on this route
    if (!vectorStoreInitialized && !vectorStoreInitializing) {
      setInitModalOpen(true);
      initializeVectorStore().finally(() => setInitModalOpen(false));
    }
  }, [vectorStoreInitialized, vectorStoreInitializing, initializeVectorStore]);

  useEffect(() => {
    // Auto-open connect modal if not connected and user lands here
    if (!connectionState.connected && !connectionState.connecting) {
      // Don't force open; provide button. Keep UX simple for now.
    }
  }, [connectionState.connected, connectionState.connecting]);

  useEffect(() => {
    // Auto-scroll to bottom on new message
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const kbReady =
    vectorStoreInitialized && processingAvailable && !vectorStoreError;

  // Load sources when panel opens
  useEffect(() => {
    const load = async () => {
      if (!openSources || !vectorStore) return;
      try {
        setLoadingSources(true);
        const docs = await vectorStore.getAllDocuments();
        setSourceDocs(docs);
      } catch (e) {
        // no-op
      } finally {
        setLoadingSources(false);
      }
    };
    load();
  }, [openSources, vectorStore]);

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || isSending) return;

    setInput("");
    const userMsg: ChatMessage = {
      id: `m_${Date.now()}_u`,
      role: "user",
      content: prompt,
    };
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: `m_${Date.now()}_a`, role: "assistant", content: "", sources: [] },
    ]);

    try {
      // Ensure vector store is ready before proceeding
      if (!kbReady || !vectorStore || !vectorStore.initialized) {
        console.log("🔧 Vector store not ready, initializing...");
        setInitModalOpen(true);
        await initializeVectorStore();
        setInitModalOpen(false);

        // Check again after initialization
        if (!vectorStore || !vectorStore.initialized) {
          throw new Error("Vector store failed to initialize properly");
        }
      }

      setIsSending(true);

      // 1) Enhanced semantic search with multiple strategies
      console.log(
        `🔍 RAG Search: "${prompt}" - searching knowledge base with enhanced strategy...`
      );

      // Strategy 1: Lower threshold for wider semantic results
      const semanticResults = await vectorStore.searchSimilar(
        prompt,
        0.05,
        20,
        {
          documentTypes: ["userdocs"], // Focus on user-uploaded documents
          queryType: "user_search",
          agentId: "rag-chat",
          sessionId: `rag_session_${Date.now()}`,
        } as any
      );

      // Strategy 2: Query expansion - try variations of the prompt
      const expandedQueries = generateQueryVariations(prompt);
      const expandedResults: any[] = [];

      for (const expandedQuery of expandedQueries) {
        if (expandedQuery !== prompt) {
          // Don't repeat the original query
          const expandedResult = await vectorStore.searchSimilar(
            expandedQuery,
            0.05,
            10,
            {
              documentTypes: ["userdocs"],
              queryType: "user_search",
              agentId: "rag-chat-expanded",
              sessionId: `rag_session_expanded_${Date.now()}`,
            } as any
          );
          expandedResults.push(...expandedResult);
        }
      }

      // Strategy 3: Keyword-based fallback using title/content matching
      const keywordResults = await performKeywordSearch(vectorStore, prompt);

      // Combine and deduplicate results
      const allResults = [
        ...semanticResults,
        ...expandedResults,
        ...keywordResults,
      ];
      const results = deduplicateSearchResults(allResults);

      console.log(
        `📚 Found ${semanticResults.length} semantic + ${expandedResults.length} expanded + ${keywordResults.length} keyword = ${results.length} unique chunks`
      );

      // 2) Build context with top chunks, smart deduplication and length management
      const seenDocs = new Set<string>();
      const contextItems: Array<{
        idx: number;
        docId: string;
        title: string;
        content: string;
        similarity: number;
      }> = [];
      const sources: ChatMessage["sources"] = [];

      // Enhanced processing with search type awareness
      const sortedResults = results.sort((a, b) => {
        // Prioritize semantic results over keyword results
        if (
          (a as any).searchType === "keyword" &&
          (b as any).searchType !== "keyword"
        )
          return 1;
        if (
          (a as any).searchType !== "keyword" &&
          (b as any).searchType === "keyword"
        )
          return -1;
        return b.similarity - a.similarity;
      });

      let approxChars = 0;
      let idx = 1;
      const maxContextChars = 10000; // Increased for better coverage with hybrid search

      // Group results by similarity tiers for better selection
      const highQuality = sortedResults.filter((r) => r.similarity >= 0.3);
      const mediumQuality = sortedResults.filter(
        (r) => r.similarity >= 0.1 && r.similarity < 0.3
      );
      const lowQuality = sortedResults.filter((r) => r.similarity < 0.1);

      // Process high quality first, then fill with medium and low
      const prioritizedResults = [
        ...highQuality,
        ...mediumQuality,
        ...lowQuality,
      ];

      for (const r of prioritizedResults) {
        if (approxChars > maxContextChars) break;
        if (contextItems.length >= 25) break; // Reasonable limit on chunks

        const docId = r.document.id;
        const title =
          r.document.title || r.document.metadata?.filename || "Untitled";
        const snippet = r.chunk.content
          .slice(0, 200)
          .replace(/\s+/g, " ")
          .trim();

        // Add search type info for debugging
        const searchTypeLabel =
          (r as any).searchType === "keyword" ? " (keyword)" : " (semantic)";

        // Add chunk to context (allow multiple chunks per document for better coverage)
        contextItems.push({
          idx,
          docId,
          title: title + searchTypeLabel,
          content: r.chunk.content,
          similarity: r.similarity,
        });

        // Only add to sources if we haven't seen this document yet (for UI display)
        if (!seenDocs.has(docId)) {
          seenDocs.add(docId);
          sources.push({
            id: docId,
            title,
            similarity: Number(r.similarity?.toFixed?.(3) ?? r.similarity),
            snippet,
          });
        }

        approxChars += r.chunk.content.length;
        idx++;
      }

      console.log(
        `🧠 Built context: ${contextItems.length} chunks, ${approxChars} chars, ${sources.length} unique docs`
      );

      const citationsHeader = contextItems
        .map((c) => `[${c.idx}] ${c.title}`)
        .join("\n");

      const contextText = contextItems
        .map((c) => `[#${c.idx}]\n${c.content}`)
        .join("\n\n");

      // Handle case where no relevant results found
      if (contextItems.length === 0) {
        const noResultsMsg =
          "I couldn't find any relevant information in your knowledge base to answer that question. Try uploading more documents or rephrasing your question.";
        setMessages((prev) =>
          prev.map((m, i) =>
            m.role === "assistant" && i === prev.length - 1
              ? { ...m, content: noResultsMsg, sources: [] }
              : m
          )
        );
        setIsSending(false);
        return;
      }

      // 3) Build optimized LLM prompt with conversation context
      const recentHistory = messages
        .slice(-4) // Last 2 exchanges for context
        .filter((m) => m.content.trim().length > 0)
        .map(
          (m) =>
            `${m.role === "user" ? "User" : "Assistant"}: ${m.content.slice(0, 200)}`
        )
        .join("\n");

      const finalPrompt = `You are an expert research assistant. Answer the user's question using ONLY the provided context passages. Be comprehensive yet concise.

${recentHistory ? `Previous conversation:\n${recentHistory}\n` : ""}Current question: "${prompt}"

Available context passages:
${contextText}

Source references:
${citationsHeader}

CRITICAL INSTRUCTIONS:
- Answer using ONLY the provided context - never add outside knowledge
- Always cite sources inline using brackets like [1], [2] where evidence appears
- If the context doesn't contain enough information, clearly state what's missing
- Provide direct, actionable answers when possible
- Be thorough but concise
- If multiple sources support a point, cite all relevant ones [1][2]

Answer:`;

      // 4) Stream LLM response
      let assistantText = "";
      if (!connectionState.connected) {
        // If not connected, prompt to connect
        setOpenConnectModal(true);
        assistantText =
          "Please connect to your Ollama server to generate an answer.";
      } else {
        try {
          const stream = generateContentStream(finalPrompt);
          for await (const chunk of stream) {
            assistantText += chunk;
            setMessages((prev) =>
              prev.map((m) =>
                m.role === "assistant" && m.content === ""
                  ? { ...m, content: assistantText, sources }
                  : m.id === prev[prev.length - 1].id &&
                      prev[prev.length - 1].role === "assistant"
                    ? { ...m, content: assistantText, sources }
                    : m
              )
            );
          }
        } catch (err) {
          assistantText = `Failed to generate with LLM: ${err instanceof Error ? err.message : String(err)}`;
        }
      }

      // Ensure final message update (also set sources)
      setMessages((prev) =>
        prev.map((m, i) =>
          m.role === "assistant" && i === prev.length - 1
            ? { ...m, content: assistantText, sources }
            : m
        )
      );
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      setMessages((prev) =>
        prev.map((m, i) =>
          m.role === "assistant" && i === prev.length - 1
            ? { ...m, content: `Error: ${errMsg}` }
            : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const connectionBadge = useMemo(() => {
    return connectionState.connected ? (
      <Badge variant="secondary" className="inline-flex items-center gap-1">
        <Wifi className="w-3 h-3" /> Connected
      </Badge>
    ) : (
      <Badge variant="outline" className="inline-flex items-center gap-1">
        <WifiOff className="w-3 h-3" /> Disconnected
      </Badge>
    );
  }, [connectionState.connected]);

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" /> Semantic RAG Chat
            </CardTitle>
            <div className="flex items-center gap-2">
              {connectionBadge}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenConnectModal(true)}
              >
                <Bot className="w-4 h-4 mr-1" /> Connect
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenSources(true)}
              >
                <Database className="w-4 h-4 mr-1" /> Sources
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-1">
              <FileText className="w-3 h-3" /> {stats.documentCount} docs
            </div>
            <div className="inline-flex items-center gap-1">
              <Brain className="w-3 h-3" /> {stats.vectorCount} vectors
            </div>
            <div className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {processingStatus}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Separator />

          {/* Chat area */}
          <div className="h-[56vh] border rounded-md">
            <ScrollArea className="h-full" ref={scrollRef}>
              <div className="p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      Ask a question about your uploaded documents. We'll find
                      the most relevant passages and draft an answer with
                      citations.
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div
                        className={`w-2 h-2 rounded-full ${kbReady ? "bg-green-500" : "bg-yellow-500"}`}
                      />
                      <span className="text-muted-foreground">
                        Knowledge Base: {kbReady ? "Ready" : "Initializing..."}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full ${connectionState.connected ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <span className="text-muted-foreground">
                        LLM:{" "}
                        {connectionState.connected
                          ? "Connected"
                          : "Disconnected"}
                      </span>
                    </div>
                    {!kbReady && (
                      <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                        💡 Upload documents via the "Sources" button to build
                        your knowledge base
                      </div>
                    )}
                    {kbReady && stats.documentCount > 0 && (
                      <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded space-y-1">
                        <div className="font-medium">
                          🚀 Enhanced Search Active
                        </div>
                        <div>
                          Using hybrid search: semantic
                          (Xenova/all-MiniLM-L6-v2) + keyword + query expansion
                        </div>
                        <div className="text-blue-500">
                          💡 For even better results, consider upgrading to a
                          larger embedding model in production
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {messages.map((m) => (
                  <div key={m.id} className="flex gap-2">
                    <div className="mt-1">
                      {m.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`rounded-md px-3 py-2 ${m.role === "user" ? "bg-muted" : "bg-primary/10"}`}
                      >
                        <div className="whitespace-pre-wrap text-sm">
                          {m.content}
                        </div>
                      </div>
                      {m.role === "assistant" &&
                        m.sources &&
                        m.sources.length > 0 && (
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {m.sources.slice(0, 6).map((s, i) => (
                              <div
                                key={`${s.id}_${i}`}
                                className="border rounded p-2 text-xs"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <Badge variant="secondary">[{i + 1}]</Badge>
                                  <span className="text-muted-foreground">
                                    sim {s.similarity.toFixed(2)}
                                  </span>
                                </div>
                                <div className="font-medium truncate flex items-center gap-1">
                                  <LinkIcon className="w-3 h-3" /> {s.title}
                                </div>
                                <div className="text-muted-foreground mt-1 line-clamp-2">
                                  {s.snippet}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Composer */}
          <div className="flex gap-2">
            <Input
              placeholder={
                connectionState.connected
                  ? "Ask about your docs..."
                  : "Connect to Ollama to chat..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isSending}
            />
            <Button onClick={handleSend} disabled={isSending || !input.trim()}>
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <VectorStoreInitModal
        isOpen={initModalOpen || vectorStoreInitializing}
        progress={downloadProgress}
        status={
          vectorStoreInitializing
            ? "initializing"
            : vectorStoreInitialized
              ? "ready"
              : "loading"
        }
        message={processingStatus}
        onClose={() => setInitModalOpen(false)}
      />

      <OllamaConnectionModal
        open={openConnectModal}
        onOpenChange={setOpenConnectModal}
        onConnect={connect}
        onTestConnection={testConnection}
        connectionState={connectionState}
      />

      {/* Knowledge Base Modal */}
      <Dialog open={openSources} onOpenChange={setOpenSources}>
        <DialogContent className="max-w-6xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Knowledge Base Manager
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <KnowledgeBaseManager
              documents={sourceDocs as any}
              documentStatus={{
                count: sourceDocs.length,
                totalSize: sourceDocs.reduce(
                  (s, d) => s + (d.metadata?.filesize || 0),
                  0
                ),
                totalChunks: sourceDocs.reduce(
                  (s, d) => s + (d.chunks?.length || 0),
                  0
                ),
                totalVectors: sourceDocs.reduce(
                  (s, d) => s + (d.vectors?.length || 0),
                  0
                ),
              }}
              onDeleteDocument={async (id) => {
                if (!vectorStore) return;
                await vectorStore.deleteDocument(id);
                const docs = await vectorStore.getAllDocuments();
                setSourceDocs(docs);
              }}
              onUploadDocuments={async () => {
                // Create file input element
                const input = document.createElement("input");
                input.type = "file";
                input.multiple = true;
                input.accept = ".pdf,.doc,.docx,.txt,.md";
                input.onchange = async (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (!files || !vectorStore) return;

                  setLoadingSources(true);
                  try {
                    for (const file of Array.from(files)) {
                      const content = await file.text();
                      await vectorStore.addDocument(
                        file,
                        content,
                        "userdocs" as any
                      );
                    }
                    // Refresh the document list
                    const docs = await vectorStore.getAllDocuments();
                    setSourceDocs(docs);
                  } catch (error) {
                    console.error("Failed to upload documents:", error);
                  } finally {
                    setLoadingSources(false);
                  }
                };
                input.click();
              }}
              isUploading={loadingSources}
              showUploadButton={true}
              tabConfigs={[
                {
                  id: "all",
                  label: "All Documents",
                  icon: Database as any,
                  filter: () => true,
                },
                {
                  id: "userdocs",
                  label: "Local Documents",
                  icon: FileText as any,
                  filter: (d: any) =>
                    (d.metadata?.documentType || d.metadata?.source) ===
                      "userdocs" || d.metadata?.source === "upload",
                },
                {
                  id: "virtual-docs",
                  label: "Web Sources",
                  icon: LinkIcon as any,
                  filter: (d: any) =>
                    (d.metadata?.documentType || d.metadata?.source) ===
                      "virtual-docs" || !!d.metadata?.url,
                },
                {
                  id: "ai-frames",
                  label: "AI Generated",
                  icon: Bot as any,
                  filter: (d: any) =>
                    (d.metadata?.documentType || d.metadata?.source) ===
                      "ai-frames" || d.metadata?.isGenerated,
                },
                {
                  id: "timecapsule",
                  label: "TimeCapsule",
                  icon: Database as any,
                  filter: (d: any) =>
                    (d.metadata?.documentType || d.metadata?.source) ===
                    "timecapsule",
                },
              ]}
              title="Knowledge Base"
              description="Browse, search, upload and manage your indexed documents. Upload new files to expand your knowledge base."
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
