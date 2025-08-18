"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useVectorStore } from "@/components/providers/VectorStoreProvider";
import { useOllamaConnection } from "@/components/DeepResearch/hooks/useOllamaConnection";
import {
  Bot,
  CheckCircle2,
  FileText,
  Hash,
  Loader2,
  Play,
  Search,
  Terminal,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

interface DocumentMeta {
  id: string;
  title: string;
  filename?: string;
  type?: string;
  chunkCount: number;
}

interface PatternMatch {
  content: string;
  source: string;
  chunkId: string;
  documentId: string;
  confidence: number;
  context: string;
}

interface PatternResult {
  pattern: string;
  description: string;
  matches: PatternMatch[];
}

export function RAGPipelineApp() {
  const {
    vectorStore,
    isInitialized: vectorStoreInitialized,
    isInitializing: vectorStoreInitializing,
    initializeVectorStore,
    stats: vectorStoreStats,
  } = useVectorStore();

  const {
    connectionState,
    connect: connectOllama,
    testConnection: testOllamaConnection,
    generateContent,
  } = useOllamaConnection();

  // UI State
  const [prompt, setPrompt] = useState("");
  const [availableDocs, setAvailableDocs] = useState<DocumentMeta[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Pipeline state
  const [currentStep, setCurrentStep] = useState<
    | "idle"
    | "generate_regex"
    | "run_regex"
    | "semantic_search"
    | "synthesize"
    | "done"
  >("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [generatedPatterns, setGeneratedPatterns] = useState<string[]>([]);
  const [regexResults, setRegexResults] = useState<PatternResult[] | null>(
    null
  );
  const [semanticResults, setSemanticResults] = useState<any[]>([]);
  const [finalOutput, setFinalOutput] = useState<string>("");
  const workerRef = useRef<Worker | null>(null);

  // Initialize VectorStore once
  useEffect(() => {
    (async () => {
      try {
        if (!vectorStoreInitialized && !vectorStoreInitializing) {
          await initializeVectorStore();
        }
      } catch (e) {
        // no-op
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load documents for selection
  useEffect(() => {
    (async () => {
      if (!vectorStore || !vectorStoreInitialized) return;
      const docs = await vectorStore.getDocumentMetadata();
      const mapped: DocumentMeta[] = docs.map((d: any) => ({
        id: d.id,
        title: d.title,
        filename: d.metadata?.filename,
        type: d.metadata?.documentType || d.metadata?.source || "unknown",
        chunkCount: d.chunkCount || 0,
      }));
      setAvailableDocs(mapped);
      setSelectedDocs(mapped.map((d) => d.id));
    })();
  }, [vectorStore, vectorStoreInitialized]);

  const log = (message: string) => setLogs((prev) => [...prev, message]);

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const selectAll = () => setSelectedDocs(availableDocs.map((d) => d.id));
  const clearAll = () => setSelectedDocs([]);

  const runPipeline = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    if (selectedDocs.length === 0) {
      toast.error("Please select at least one document");
      return;
    }
    setIsRunning(true);
    setCurrentStep("generate_regex");
    setLogs([]);
    setGeneratedPatterns([]);
    setRegexResults(null);
    setSemanticResults([]);
    setFinalOutput("");

    try {
      // Step 1: Ask LLM for regex patterns
      log("[1/4] Generating regex patterns with LLM...");
      if (!connectionState.connected) {
        toast.error("Connect to Ollama to use LLM");
        setIsRunning(false);
        setCurrentStep("idle");
        return;
      }
      const patternJsonPrompt = `You are an information extraction planner. Given the task, propose 3-6 high-impact regex patterns in JSON. ONLY valid JSON.
{
  "patterns": [
    { "description": string, "pattern": string, "flags": string }
  ]
}
Rules:
- pattern is the regex body WITHOUT surrounding slashes
- flags is a combination of g,i,m,s,u,y (default to gi)
Task: ${prompt}`;
      const llmResp = await generateContent(patternJsonPrompt);
      const parsed = (() => {
        try {
          const cleaned = llmResp
            .trim()
            .replace(/^```json|```$/g, "")
            .trim();
          const objMatch = cleaned.match(/\{[\s\S]*\}/);
          if (objMatch) return JSON.parse(objMatch[0]);
          return JSON.parse(cleaned);
        } catch {
          return null;
        }
      })();
      if (
        !parsed ||
        !Array.isArray(parsed.patterns) ||
        parsed.patterns.length === 0
      ) {
        throw new Error("LLM did not return valid patterns JSON");
      }
      const patterns: string[] = parsed.patterns.map((p: any, idx: number) => {
        const desc = (p.description || `Pattern ${idx + 1}`).toString().trim();
        const body = p.pattern?.toString().replace(/^\/(.*)\/$/, "$1") || ".*";
        const flags =
          (p.flags || "gi").toString().replace(/[^gimsuy]/g, "") || "gi";
        return `${desc}: /${body}/${flags}`;
      });
      setGeneratedPatterns(patterns);

      // Step 2: Run regex on chunks using Web Worker
      setCurrentStep("run_regex");
      log("[2/4] Running regex patterns against selected documents...");
      const allChunks = await vectorStore!.getAllChunks();
      const filteredChunks = allChunks.filter((c: any) =>
        selectedDocs.includes(c.documentId)
      );

      const docNameMap: Record<string, string> = Object.fromEntries(
        availableDocs.map((d) => [d.id, d.title])
      );

      // Worker setup
      if (workerRef.current) {
        try {
          workerRef.current.terminate();
        } catch {}
        workerRef.current = null;
      }
      const worker = new Worker("/workers/patternWorker.js");
      workerRef.current = worker;
      const workerResults: PatternResult[] = await new Promise(
        (resolve, reject) => {
          const chunksForWorker = filteredChunks.map((c: any) => ({
            id: c.id,
            text: c.text || c.content,
            content: c.content,
            source: c.source,
            documentId: c.documentId,
          }));
          worker.onmessage = (ev: MessageEvent<any>) => {
            const { type, data, error } = ev.data || {};
            if (type === "progress") {
              log(
                `Regex progress: pattern ${data.patternIndex}/${data.patternsTotal}, matches so far: ${data.totalMatches}`
              );
            } else if (type === "result") {
              resolve(data.patterns || []);
            } else if (type === "error") {
              reject(new Error(error || "Worker error"));
            }
          };
          worker.onerror = (err) => reject(new Error(err.message));
          worker.postMessage({
            type: "run",
            patterns,
            chunks: chunksForWorker,
            docNameMap,
          });
        }
      );
      setRegexResults(workerResults);

      // Step 3: Semantic search
      setCurrentStep("semantic_search");
      log("[3/4] Running semantic search using Xenova embeddings...");
      const semResults = await vectorStore!.searchSimilar(prompt, 0.1, 10);
      const semFiltered = semResults.filter((r: any) =>
        selectedDocs.includes(r.document.id)
      );
      setSemanticResults(semFiltered);

      // Step 4: Synthesis with LLM
      setCurrentStep("synthesize");
      log("[4/4] Synthesizing final answer from regex + semantic results...");
      const regexSummary = workerResults
        .map(
          (pr) =>
            `- ${pr.description} (${pr.pattern}): ${pr.matches.length} matches`
        )
        .join("\n");
      const semanticSummary = semFiltered
        .slice(0, 10)
        .map(
          (r: any, i: number) =>
            `#${i + 1} ${r.document.title} [${Math.round(r.similarity * 100)}%]\n${(r.chunk?.content || "").slice(0, 300)}`
        )
        .join("\n\n");

      const synthesisPrompt = `Task: ${prompt}
First, prioritize the regex-extracted matches to build structured data. Then, enhance and fill gaps using semantic search results. Provide a clean, well-structured final answer (markdown allowed). Be concise but complete.

Regex summary:\n${regexSummary}\n\nSemantic summary (top):\n${semanticSummary}\n\nOutput:`;
      const synthesis = await generateContent(synthesisPrompt);
      setFinalOutput(synthesis);

      setCurrentStep("done");
      log("Pipeline completed successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Pipeline failed");
      setCurrentStep("idle");
    } finally {
      setIsRunning(false);
      if (workerRef.current) {
        try {
          workerRef.current.terminate();
        } catch {}
        workerRef.current = null;
      }
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Wand2 className="h-5 w-5" /> RAG Orchestrator
              <div className="ml-auto flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={connectOllama}
                  className={
                    connectionState.connected
                      ? "border-green-500 text-green-700"
                      : ""
                  }
                >
                  <Bot className="h-4 w-4 mr-2" />
                  {connectionState.connected ? "Connected" : "Connect LLM"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your Task / Prompt</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your extraction/answer task..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Select Documents</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button size="sm" variant="outline" onClick={clearAll}>
                    Clear
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-48 mt-2">
                <div className="space-y-2">
                  {availableDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-muted/30 cursor-pointer"
                      onClick={() => toggleDoc(doc.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selectedDocs.includes(doc.id) ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}
                      >
                        {selectedDocs.includes(doc.id) && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.type} • {doc.chunkCount} chunks
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Button
              onClick={runPipeline}
              disabled={
                isRunning || !prompt.trim() || selectedDocs.length === 0
              }
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running Pipeline...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Steps & Outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            {/* Regex Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-4 w-4" /> Regex Extraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedPatterns.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Patterns will appear here after LLM planning.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">
                        Generated Patterns
                      </div>
                      <ul className="list-disc list-inside text-sm mt-1">
                        {generatedPatterns.map((p, i) => (
                          <li key={i} className="font-mono text-[12px]">
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium">Matches</div>
                      {!regexResults || regexResults.length === 0 ? (
                        <div className="text-sm text-muted-foreground mt-1">
                          No regex results yet.
                        </div>
                      ) : (
                        <ScrollArea className="h-72 mt-2">
                          <div className="space-y-2">
                            {regexResults.map((pr, idx) => (
                              <div key={idx} className="border rounded p-2">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="text-sm font-semibold">
                                    {pr.description}
                                  </div>
                                  <Badge
                                    variant={
                                      pr.matches.length > 0
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {pr.matches.length} matches
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground font-mono">
                                  {pr.pattern}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Semantic Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Semantic Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                {semanticResults.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Top similar chunks will appear here.
                  </div>
                ) : (
                  <ScrollArea className="h-72">
                    <div className="space-y-2">
                      {semanticResults.map((r: any, i: number) => (
                        <div key={i} className="border rounded p-2 text-sm">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">
                              {r.document?.title || "Unknown"}
                            </div>
                            <Badge variant="secondary">
                              {Math.round((r.similarity || 0) * 100)}%
                            </Badge>
                          </div>
                          <div className="text-xs mt-1">
                            {r.chunk?.content?.slice(0, 220)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            {/* Final Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Final Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep !== "done" && !finalOutput ? (
                  <div className="text-sm text-muted-foreground">
                    Final answer will appear here after synthesis.
                  </div>
                ) : (
                  <Textarea
                    value={finalOutput}
                    onChange={(e) => setFinalOutput(e.target.value)}
                    rows={10}
                    className="font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Status & Logs */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" /> Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div
                    className={`p-2 rounded ${currentStep === "generate_regex" ? "bg-primary/10" : "bg-muted/30"}`}
                  >
                    1. Generate Regex{" "}
                    {currentStep === "generate_regex" && isRunning && (
                      <Loader2 className="inline h-4 w-4 ml-1 animate-spin" />
                    )}
                  </div>
                  <div
                    className={`p-2 rounded ${currentStep === "run_regex" ? "bg-primary/10" : "bg-muted/30"}`}
                  >
                    2. Run Regex{" "}
                    {currentStep === "run_regex" && isRunning && (
                      <Loader2 className="inline h-4 w-4 ml-1 animate-spin" />
                    )}
                  </div>
                  <div
                    className={`p-2 rounded ${currentStep === "semantic_search" ? "bg-primary/10" : "bg-muted/30"}`}
                  >
                    3. Semantic Search{" "}
                    {currentStep === "semantic_search" && isRunning && (
                      <Loader2 className="inline h-4 w-4 ml-1 animate-spin" />
                    )}
                  </div>
                  <div
                    className={`p-2 rounded ${currentStep === "synthesize" ? "bg-primary/10" : "bg-muted/30"}`}
                  >
                    4. Synthesis{" "}
                    {currentStep === "synthesize" && isRunning && (
                      <Loader2 className="inline h-4 w-4 ml-1 animate-spin" />
                    )}
                  </div>
                  {currentStep === "done" && (
                    <div className="p-2 rounded bg-green-100">Completed</div>
                  )}
                </div>
                <Separator className="my-3" />
                <div className="text-sm text-muted-foreground">Logs</div>
                <ScrollArea className="h-48 mt-2">
                  <div className="space-y-1 text-xs font-mono">
                    {logs.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

