"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Bot,
  Loader2,
  Wand2,
  Brain,
  Sparkles,
  ShieldCheck,
  Key,
  Eye,
  Upload,
  RefreshCcw,
  Check,
  Database,
  Globe,
  Trash2,
  X,
} from "lucide-react";
import type { UseAIFlowBuilderReturn } from "../hooks/useAIFlowBuilder";
import type { AIFrame } from "../types/frames";
import { OllamaConnectionModal } from "@/components/DeepResearch/components/OllamaConnectionModal";

interface AIFlowBuilderPanelProps {
  flowBuilder: UseAIFlowBuilderReturn;
  onAcceptFrames: (frames: AIFrame[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function AIFlowBuilderPanel({
  flowBuilder,
  onAcceptFrames,
  isOpen,
  onToggle,
}: AIFlowBuilderPanelProps) {
  const {
    prompt,
    setPrompt,
    plan,
    frameDrafts,
    planning,
    generating,
    error,
    planFlow,
    generateFrameDrafts,
    resetPlan,
    acceptDrafts,
    discardDrafts,
    aiProviders,
    firecrawl,
    webSearchEnabled,
    setWebSearchEnabled,
    contextPreview,
    sessionState,
    progressMetrics,
    evaluateCheckpoint,
  } = flowBuilder;

  const [openRouterKey, setOpenRouterKey] = useState("");
  const [firecrawlKey, setFirecrawlKey] = useState(
    firecrawl.firecrawlState.apiKey || ""
  );
  const [ollamaModalOpen, setOllamaModalOpen] = useState(false);

  const openRouterState = aiProviders.openrouter.connectionState;
  const openRouterModels = aiProviders.openrouter.modelOptions;

  if (!isOpen) {
    return null;
  }

  const handleConnectOpenRouter = async () => {
    if (!openRouterKey.trim()) return;
    await aiProviders.openrouter.connectWithApiKey(openRouterKey.trim());
    setOpenRouterKey("");
  };

  const handleAcceptAll = () => {
    const accepted = acceptDrafts();
    if (accepted.length) {
      onAcceptFrames(accepted);
    }
  };

  const handleAcceptFrame = (frameId: string) => {
    const accepted = acceptDrafts([frameId]);
    if (accepted.length) {
      onAcceptFrames(accepted);
    }
  };

  const handleDiscardPlan = () => {
    discardDrafts();
    resetPlan();
  };

  const generatedCount = frameDrafts.filter(
    (draft) => draft.status === "generated"
  ).length;
  const plannedCount = frameDrafts.length;
  const readyToAcceptCount = frameDrafts.filter(
    (draft) => draft.masteryState === "completed" && draft.status === "generated"
  ).length;
  const currentFrameId = sessionState?.id ? sessionState.currentFrameId : null;

  const providerStatusBadge = (connected: boolean) => (
    <Badge variant={connected ? "default" : "secondary"} className="text-xs">
      <span
        className={`inline-flex h-2 w-2 rounded-full mr-1 ${
          connected ? "bg-emerald-400" : "bg-slate-400"
        }`}
      />
      {connected ? "Connected" : "Disconnected"}
    </Badge>
  );

  const masteryBadge = (state: string | undefined) => {
    const palette: Record<string, { label: string; className: string }> = {
      completed: {
        label: "Mastered",
        className: "bg-emerald-100 text-emerald-700",
      },
      awaiting_quiz: {
        label: "Quiz Ready",
        className: "bg-amber-100 text-amber-700",
      },
      needs_remediation: {
        label: "Remediation",
        className: "bg-red-100 text-red-700",
      },
      locked: {
        label: "Locked",
        className: "bg-slate-100 text-slate-700",
      },
      ready: {
        label: "Ready",
        className: "bg-blue-100 text-blue-700",
      },
    };

    const fallback = palette[state || "ready"] || palette.ready;
    return <Badge className={fallback.className}>{fallback.label}</Badge>;
  };

  return (
    <>
      <div className="fixed top-24 right-6 z-50 w-full max-w-5xl pointer-events-auto">
        <Card className="bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-3xl max-h-[80vh] overflow-y-auto">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  OpenRouter ZDR · AI Flow Builder
                </div>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <Bot className="h-6 w-6 text-emerald-500" />
                  Build AI Frames with Knowledge Base Grounding
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Prompt the planner, ground generations with your Knowledge Base + Firecrawl, and gate progress with checkpoint quizzes before syncing to your graph.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close AI Flow Builder</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="grid lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium">
                    Active Provider
                  </Label>
                  {providerStatusBadge(
                    aiProviders.providerReady[aiProviders.activeProvider]
                  )}
                </div>
                <Select
                  value={aiProviders.activeProvider}
                  onValueChange={(value) =>
                    aiProviders.setActiveProvider(value as "openrouter" | "ollama")
                  }
                >
                  <SelectTrigger className="bg-white border-slate-300">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openrouter">
                      OpenRouter · ZDR (Default)
                    </SelectItem>
                    <SelectItem value="ollama">Ollama · Local</SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>OpenRouter</span>
                    {providerStatusBadge(aiProviders.providerReady.openrouter)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Ollama</span>
                    {providerStatusBadge(aiProviders.providerReady.ollama)}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    OpenRouter API Key
                  </Label>
                  {openRouterState.maskedApiKey && (
                    <Badge variant="outline" className="text-xs text-slate-500">
                      {openRouterState.maskedApiKey}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={openRouterKey}
                    onChange={(event) => setOpenRouterKey(event.target.value)}
                    className="bg-white border-slate-300"
                  />
                  <Button
                    onClick={handleConnectOpenRouter}
                    disabled={!openRouterKey.trim() || openRouterState.connecting}
                    variant="secondary"
                  >
                    {openRouterState.connecting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                  {openRouterState.apiKeyPresent && (
                    <Button
                      variant="ghost"
                      onClick={aiProviders.openrouter.disconnect}
                      className="text-red-500 hover:text-red-600"
                    >
                      Disconnect
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["planner", "generator", "vision"] as const).map((tier) => (
                    <div key={tier}>
                      <Label className="text-xs uppercase tracking-wide text-slate-500">
                        {tier === "planner"
                          ? "Planner model"
                          : tier === "generator"
                          ? "Generator model"
                          : "Vision model"}
                      </Label>
                      <Select
                        value={openRouterState.modelSelections[tier]}
                        onValueChange={(value) =>
                          aiProviders.openrouter.updateModelSelection(
                            tier,
                            value
                          )
                        }
                      >
                        <SelectTrigger className="bg-white border-slate-300 h-9">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          {openRouterModels[tier].map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-slate-700 font-medium">Vision mode</p>
                    <p className="text-slate-500 text-xs">
                      Enable to send image/PDF snippets to vision models
                    </p>
                  </div>
                  <Switch
                    checked={openRouterState.visionMode === "vision"}
                    onCheckedChange={(checked) =>
                      aiProviders.openrouter.setVisionMode(
                        checked ? "vision" : "text"
                      )
                    }
                  />
                </div>
                {openRouterState.error && (
                  <p className="text-xs text-red-500">{openRouterState.error}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Firecrawl Key (Web Grounding)
                  </Label>
                  {firecrawl.firecrawlState.configured && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                      Configured
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="firecrawl_live_..."
                    value={firecrawlKey}
                    onChange={(event) => setFirecrawlKey(event.target.value)}
                    className="bg-white border-slate-300"
                  />
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      if (!firecrawlKey.trim()) {
                        firecrawl.clearFirecrawlKey();
                        return;
                      }
                      await firecrawl.saveFirecrawlKey(firecrawlKey.trim());
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setFirecrawlKey("");
                      firecrawl.clearFirecrawlKey();
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Use Firecrawl in prompts
                  </span>
                  <Switch
                    disabled={!firecrawl.firecrawlState.configured}
                    checked={webSearchEnabled}
                    onCheckedChange={(checked) => setWebSearchEnabled(checked)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700"
                  onClick={() => setOllamaModalOpen(true)}
                >
                  Configure Ollama (Local)
                </Button>
                {firecrawl.firecrawlState.error && (
                  <p className="text-xs text-red-500">
                    {firecrawl.firecrawlState.error}
                  </p>
                )}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Mastery Progress
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {progressMetrics.masteryPercent}%
                </p>
                <p className="text-sm text-slate-500">
                  {progressMetrics.framesCompleted} /{" "}
                  {progressMetrics.totalFrames || plannedCount} frames mastered
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Current Phase
                </p>
                <p className="text-lg font-semibold text-slate-900 capitalize">
                  {progressMetrics.currentPhase
                    ? progressMetrics.currentPhase.replace("-", " ")
                    : plan
                      ? "Generating"
                      : "Not started"}
                </p>
                <p className="text-sm text-slate-500">
                  Session {sessionState?.id ?? "—"}
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Remediation Branches
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {progressMetrics.remediationCount}
                </p>
                <p className="text-sm text-slate-500">
                  {currentFrameId
                    ? `Focused on ${
                        frameDrafts.find((d) => d.tempId === currentFrameId)?.title ??
                        "next frame"
                      }`
                    : "All frames cleared"}
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <Label className="text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Prompt the Flow Builder
              </Label>
              <Textarea
                placeholder="Ex: Build a 6-frame crash course on convolutional neural networks using my uploaded PDF summaries and cite the relevant chunks."
                className="bg-white border-slate-300 text-slate-900 min-h-[110px]"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={planFlow}
                  disabled={planning || !prompt.trim()}
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  {planning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Planning...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      AI Build Flow
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  disabled={
                    generating ||
                    !frameDrafts.some(
                      (draft) =>
                        draft.status === "planned" || draft.status === "error"
                    )
                  }
                  onClick={() => void generateFrameDrafts()}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating Drafts...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate All Frames
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  disabled={!plan}
                  onClick={handleDiscardPlan}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  Reset Plan
                </Button>
                {readyToAcceptCount > 0 && (
                  <Button
                    variant="default"
                    onClick={handleAcceptAll}
                    disabled={readyToAcceptCount === 0}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept {readyToAcceptCount} Completed Frames
                  </Button>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">
                  {error}
                </p>
              )}
            </section>

            {contextPreview &&
              (contextPreview.knowledge?.text || contextPreview.web) && (
                <section className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-slate-800 font-semibold flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-amber-500" />
                    Grounding Preview
                  </h4>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="kb">
                      <AccordionTrigger className="text-slate-700">
                        Knowledge Base Context
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-xs whitespace-pre-wrap text-slate-600 bg-white border border-slate-200 rounded-lg p-3 max-h-48 overflow-auto">
                          {contextPreview.knowledge?.text ||
                            "No KB snippets retrieved."}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="web">
                      <AccordionTrigger className="text-slate-700">
                        Firecrawl Context
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-xs whitespace-pre-wrap text-slate-600 bg-white border border-slate-200 rounded-lg p-3 max-h-48 overflow-auto">
                          {contextPreview.web
                            ? contextPreview.web.results
                                .map(
                                  (result, index) =>
                                    `[WEB-${index + 1}] ${result.title}\n${result.content}`
                                )
                                .join("\n\n")
                            : "Web search disabled or unavailable."}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              )}

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">
                    Draft Status
                  </p>
                  <p className="text-slate-900 text-lg font-semibold">
                    {readyToAcceptCount}/{plannedCount} frames mastered
                  </p>
                </div>
                {readyToAcceptCount > 0 && (
                  <Badge className="bg-blue-100 text-blue-700">
                    Ready for sync
                  </Badge>
                )}
              </div>

              {!plan && (
                <div className="p-6 rounded-2xl border border-dashed border-slate-300 text-center bg-white">
                  <Sparkles className="h-8 w-8 mx-auto text-amber-500 mb-3" />
                  <p className="text-lg font-semibold text-slate-900">
                    Prompt the Flow Builder to get started
                  </p>
                  <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                    Describe the learning path you want. We will plan chapters, generate linked frames, cite your Knowledge Base, and let you accept every AI addition before it touches your graph.
                  </p>
                </div>
              )}

              {plan && (
                <div className="space-y-4">
                  {plan.chapters.map((chapter) => {
                    const chapterFrames = frameDrafts.filter(
                      (draft) => draft.chapterId === chapter.id
                    );
                    return (
                      <div
                        key={chapter.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                              {chapter.title}
                            </h3>
                            <p className="text-slate-500 text-sm">
                              {chapter.goal}
                            </p>
                          </div>
                          <Badge className="bg-slate-100 text-slate-700">
                            {chapterFrames.length} frames
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          {chapterFrames.map((draft, index) => {
                            const displayOrder =
                              typeof draft.order === "number"
                                ? draft.order + 1
                                : index + 1;
                            return (
                              <div
                                key={draft.tempId}
                                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                      Frame {displayOrder}
                                    </p>
                                    <h4 className="text-lg font-semibold text-slate-900">
                                      {draft.title}
                                    </h4>
                                    <p className="text-slate-500 text-sm">
                                      {draft.goal}
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <Badge
                                      className={`${
                                        draft.status === "generated"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : draft.status === "generating"
                                          ? "bg-amber-100 text-amber-700"
                                          : draft.status === "error"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-slate-100 text-slate-700"
                                      }`}
                                    >
                                      {draft.status}
                                    </Badge>
                                    {masteryBadge(draft.masteryState)}
                                    {draft.requiresVision && (
                                      <Badge className="bg-purple-100 text-purple-700 flex items-center gap-1">
                                        <Eye className="h-3 w-3" />
                                        Vision
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-sm text-slate-600 space-y-2">
                                  {draft.generated ? (
                                    <>
                                      <p className="line-clamp-3">
                                        {draft.generated.informationText}
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {draft.generated.aiConcepts.map((concept) => (
                                          <Badge
                                            key={concept}
                                            className="bg-white text-slate-700 border border-slate-200"
                                          >
                                            {concept}
                                          </Badge>
                                        ))}
                                      </div>
                                    </>
                                  ) : (
                                    <p className="italic text-slate-400">
                                      Waiting for generation...
                                    </p>
                                  )}
                                  {draft.error && (
                                    <p className="text-red-500 text-xs">
                                      {draft.error}
                                    </p>
                                  )}
                                  {draft.generated?.checkpointQuiz && (
                                    <div className="mt-3 space-y-2 bg-white border border-slate-200 rounded-xl p-3">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-slate-800">
                                          Checkpoint Quiz
                                        </p>
                                        <Badge className="bg-slate-100 text-slate-700">
                                          {
                                            draft.generated.checkpointQuiz.questions
                                              .length
                                          }{" "}
                                          questions
                                        </Badge>
                                      </div>
                                      <div className="space-y-2">
                                        {draft.generated.checkpointQuiz.questions
                                          .slice(0, 2)
                                          .map((question) => (
                                            <div
                                              key={question.id}
                                              className="text-xs text-slate-600"
                                            >
                                              <p className="font-medium text-slate-800">
                                                • {question.prompt}
                                              </p>
                                              {question.visionReference && (
                                                <p className="text-[11px] text-purple-600">
                                                  Vision cue: {question.visionReference}
                                                </p>
                                              )}
                                            </div>
                                          ))}
                                      </div>
                                      {draft.quizHistory.length > 0 && (
                                        <p className="text-[11px] text-slate-500">
                                          Last attempt:{" "}
                                          {draft.quizHistory[draft.quizHistory.length - 1]
                                            .passed
                                            ? "Passed"
                                            : "Needs remediation"}{" "}
                                          ·{" "}
                                          {new Date(
                                            draft.quizHistory[draft.quizHistory.length - 1]
                                              .submittedAt
                                          ).toLocaleTimeString()}
                                        </p>
                                      )}
                                      <div className="flex flex-wrap gap-2">
                                        <Button
                                          size="sm"
                                          className="bg-emerald-500 text-white hover:bg-emerald-600"
                                          disabled={
                                            draft.masteryState !== "awaiting_quiz" &&
                                            draft.masteryState !== "ready"
                                          }
                                          onClick={() =>
                                            void evaluateCheckpoint(draft.tempId, "pass")
                                          }
                                        >
                                          <Check className="h-4 w-4 mr-1" />
                                          Mark Mastered
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="border-red-300 text-red-600 hover:bg-red-50"
                                          onClick={() =>
                                            void evaluateCheckpoint(draft.tempId, "fail")
                                          }
                                        >
                                          <RefreshCcw className="h-4 w-4 mr-1" />
                                          Needs Remediation
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {draft.status === "planned" && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      disabled={draft.masteryState === "locked"}
                                      title={
                                        draft.masteryState === "locked"
                                          ? "Complete earlier checkpoints to unlock this frame."
                                          : "Generate AI content"
                                      }
                                      onClick={() =>
                                        void generateFrameDrafts([draft.tempId])
                                      }
                                    >
                                      <Brain className="h-4 w-4 mr-1" />
                                      Generate
                                    </Button>
                                  )}
                                  {draft.status === "generated" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-blue-500 text-white hover:bg-blue-600"
                                        disabled={draft.masteryState !== "completed"}
                                        onClick={() => handleAcceptFrame(draft.tempId)}
                                      >
                                        <Check className="h-4 w-4 mr-1" />
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-300 text-slate-700"
                                        onClick={() =>
                                          void generateFrameDrafts([draft.tempId])
                                        }
                                      >
                                        <RefreshCcw className="h-4 w-4 mr-1" />
                                        Regenerate
                                      </Button>
                                    </>
                                  )}
                                  {draft.status === "error" && (
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() =>
                                        void generateFrameDrafts([draft.tempId])
                                      }
                                    >
                                      Retry
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </CardContent>
        </Card>
      </div>

      <OllamaConnectionModal
        open={ollamaModalOpen}
        onOpenChange={setOllamaModalOpen}
        onConnect={aiProviders.ollama.connect}
        onTestConnection={aiProviders.ollama.testConnection}
        connectionState={aiProviders.ollama.connectionState}
      />
    </>
  );
}
