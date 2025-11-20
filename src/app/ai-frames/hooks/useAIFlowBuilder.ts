"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import type {
  VectorStore,
  SearchResult,
} from "@/components/VectorStore/VectorStore";
import {
  AIFrame,
  FrameQuiz,
  QuizAttempt,
  LearningPhase,
  FrameMasteryState,
} from "../types/frames";
import { generateFrameId } from "../lib/frameValidation";
import {
  useAIProviders,
  UseAIProvidersReturn,
} from "./useAIProviders";
import { useFirecrawlKey } from "./useFirecrawlKey";
import {
  getUnifiedWebSearchService,
  UnifiedWebSearchContext,
} from "@/lib/UnifiedWebSearchService";
import type { UseFirecrawlKeyReturn } from "./useFirecrawlKey";
import type { AIProviderKey } from "./useAIProviders";
import { createMultiAgentSystem } from "@/lib/multi-agent";
import type { AgentLLMOptions } from "@/lib/multi-agent/core/Orchestrator";
import { TIMECAPSULE_VERSION } from "@/lib/version";
import {
  useResearchSteps,
  ResearchStep,
  AgentSubStep,
  ProgressHistoryEntry,
} from "@/components/DeepResearch/components/ResearchSteps";
import {
  useFlowHistory,
  FlowHistorySession,
} from "./useFlowHistory";
import type {
  FlowPlannerPlan,
  FlowGeneratedFrame,
  FlowPlannedFrame,
  ChunkData,
  ResearchContext,
} from "@/lib/multi-agent/interfaces/Context";
import { FlowFramePlannerAgent } from "@/lib/multi-agent/agents/FlowFramePlannerAgent";
import { FlowFrameGeneratorAgent } from "@/lib/multi-agent/agents/FlowFrameGeneratorAgent";
import type { AIFlowModelTier } from "../lib/openRouterModels";
import type { FlowSession, SessionSource } from "../types/session";
import { getSessionStore, SessionStore } from "@/lib/kb/sessionStore";

interface KnowledgeCitation {
  label: string;
  docId: string;
  chunkId: string;
  source: string;
  similarity?: number;
  excerpt?: string;
}

interface KnowledgeSnippet {
  id: string;
  docId: string;
  title: string;
  content: string;
  similarity: number;
  source: string;
}

interface KnowledgeContextResult {
  query: string;
  snippets: KnowledgeSnippet[];
  text: string;
  citations: KnowledgeCitation[];
}

interface AttachmentSuggestion {
  id: string;
  type: "video" | "pdf" | "text" | "image";
  source: "knowledge_base" | "web" | "user";
  referenceLabel?: string;
  description: string;
  url?: string;
  pages?: string;
}

interface CheckpointMetadata {
  requiresVision: boolean;
  phase: LearningPhase;
  checkpointType: "standard" | "remediation";
}

interface PlannerFrame {
  id: string;
  title: string;
  goal: string;
  chapterId: string;
  order: number;
  aiConcepts: string[];
  citations: KnowledgeCitation[];
  attachmentSuggestions: AttachmentSuggestion[];
  learningPhase?: LearningPhase;
  requiresVision?: boolean;
}

interface PlannerChapter {
  id: string;
  title: string;
  goal: string;
  order: number;
  color?: string;
  citations: KnowledgeCitation[];
  frames: PlannerFrame[];
}

interface PlannerPlan {
  id: string;
  summary?: string;
  chapters: PlannerChapter[];
  sources: KnowledgeCitation[];
  createdAt: string;
  model?: string;
  learningMode?: "bootstrapped_stepwise" | "freeform";
}

const AGENT_TIER_HINTS: Record<string, AIFlowModelTier> = {
  queryplanner: "planner",
  datainspector: "planner",
  planningagent: "planner",
  flowframeplanner: "planner",
  synthesiscoordinator: "planner",
  webssearchagent: "generator",
  patterngenerator: "generator",
  extractor: "generator",
  flowframegenerator: "generator",
  synthesizer: "generator",
  responseformatter: "fallback",
};

const isModelTier = (value?: string): value is AIFlowModelTier =>
  value === "planner" ||
  value === "generator" ||
  value === "vision" ||
  value === "fallback";

const resolveAgentTier = (options?: AgentLLMOptions): AIFlowModelTier => {
  if (options?.tierHint && isModelTier(options.tierHint)) {
    return options.tierHint;
  }
  const key = options?.agent?.toLowerCase() || "";
  return AGENT_TIER_HINTS[key] || "generator";
};

type FrameDraftStatus = "planned" | "generating" | "generated" | "error";

interface GeneratedFrameContent {
  informationText: string;
  afterVideoText: string;
  aiConcepts: string[];
  videoUrl?: string;
  attachment?: AttachmentSuggestion;
  attachments?: AttachmentSuggestion[];
  summary?: string;
  durationInSeconds?: number;
  recommendedResources?: AttachmentSuggestion[];
  checkpointQuiz?: FrameQuiz;
  visionCue?: string;
}

interface FrameDraft extends PlannerFrame {
  tempId: string;
  chapterTitle: string;
  status: FrameDraftStatus;
  generated?: GeneratedFrameContent;
  provider?: AIProviderKey;
  model?: string;
  generatedAt?: string;
  error?: string | null;
  knowledgeContext?: KnowledgeContextResult;
  checkpointQuiz?: FrameQuiz;
  quizHistory: QuizAttempt[];
  masteryState: FrameMasteryState;
  requiresVision?: boolean;
  isRemediation?: boolean;
  remediationParentId?: string;
  source?: SessionSource; // Track frame origin
}

interface ContextPreview {
  knowledge: KnowledgeContextResult | null;
  web: UnifiedWebSearchContext | null;
}

interface LearningSessionState {
  id: string;
  mode: "bootstrapped_stepwise" | "freeform";
  prompt: string;
  createdAt: string;
  updatedAt: string;
  currentFrameId: string | null;
  unlockedFrameIds: string[];
  completedFrameIds: string[];
  quizHistory: Record<string, QuizAttempt[]>;
  remediationMap: Record<string, string[]>;
  masteryPercent: number;
  totalFrames: number;
}

interface ProgressMetrics {
  masteryPercent: number;
  framesCompleted: number;
  totalFrames: number;
  remediationCount: number;
  currentPhase: LearningPhase | null;
}

export interface UseAIFlowBuilderProps {
  vectorStore: VectorStore | null;
  vectorStoreInitialized: boolean;
  onAcceptFrames?: (frames: AIFrame[]) => void; // Optional callback for graph replacement
}

export interface UseAIFlowBuilderReturn {
  prompt: string;
  setPrompt: (prompt: string) => void;
  plan: PlannerPlan | null;
  frameDrafts: FrameDraft[];
  planning: boolean;
  generating: boolean;
  error: string | null;
  planFlow: () => Promise<void>;
  generateFrameDrafts: (frameIds?: string[]) => Promise<void>;
  resetPlan: () => void;
  acceptDrafts: (frameIds?: string[]) => AIFrame[];
  discardDrafts: (frameIds?: string[]) => void;
  aiProviders: UseAIProvidersReturn;
  firecrawl: UseFirecrawlKeyReturn;
  webSearchEnabled: boolean;
  setWebSearchEnabled: (enabled: boolean) => void;
  contextPreview: ContextPreview | null;
  sessionState: LearningSessionState | null;
  progressMetrics: ProgressMetrics;
  evaluateCheckpoint: (
    frameId: string,
    outcome: "pass" | "fail"
  ) => Promise<void>;
  historySessions: FlowHistorySession[];
  historyActions: {
    deleteSession: (sessionId: string) => void;
    clearSessions: () => void;
    exportSession: (sessionId: string) => string | null;
    exportAllSessions: () => string;
    importSessions: (data: string) => boolean;
  };
  timelineSteps: ResearchStep[];
  timelineExpandedSteps: Set<string>;
  handleTimelineStepClick: (step: ResearchStep) => void;
  
  // Session Management
  activeSessionId: string | null;
  sessions: FlowSession[];
  createNewSession: (source: SessionSource, name?: string) => FlowSession;
  saveCurrentSession: (immediate?: boolean) => Promise<void>;
  switchSession: (sessionId: string) => Promise<void>;
  renameSession: (sessionId: string, newName: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  syncFrameToSession: (frame: AIFrame) => void;
  syncFrameDeletions: (currentFrameIds: Set<string>) => void;
}

const MAX_KB_RESULTS_FOR_PLAN = 8;
const MAX_KB_RESULTS_FOR_FRAME = 6;
const SESSION_STORAGE_KEY = "ai_flow_session_state_v1";
const STEPWISE_PHASES: LearningPhase[] = [
  "overview",
  "fundamentals",
  "deep-dive",
];

const DEFAULT_SYSTEM_PROMPT = `
You are the TimeCapsule AI Flow Builder. 
Goals:
- Turn a learning request plus grounded knowledge into ordered chapters and frames.
- Always cite sources using the provided citation labels (KB-#, WEB-#).
- Return ONLY valid JSON; no markdown code-fences.
`.trim();

const STEPWISE_PLANNING_GUIDE = `
Bootstrapped Step-by-Step Requirements:
- Create an explicit progression: Overview -> Fundamentals -> Deep Dive.
- Each frame must specify its learningPhase ("overview","fundamentals","deep-dive") or "remediation".
- Include at least one checkpoint per frame in the plan metadata to remind the generator to add quizzes.
- Reference any provided figures/images when relevant (vision-aware plan).
- Mark frames that require visual references with "requiresVision": true.
`.trim();

const PLANNER_SCHEMA_DESCRIPTION = `
{
  "summary": "High-level overview of the learning path.",
  "learningMode": "bootstrapped_stepwise",
  "chapters": [
    {
      "id": "string (slug-like)",
      "title": "string",
      "goal": "string",
      "order": number,
      "color": "hex color",
      "citations": [{ "label": "KB-1", "docId": "abc", "chunkId": "abc_1", "source": "knowledge_base" }],
      "frames": [
        {
          "id": "string",
          "title": "string",
          "goal": "string",
          "order": number,
          "aiConcepts": ["string"],
          "learningPhase": "overview|fundamentals|deep-dive",
          "requiresVision": boolean,
          "citations": [],
          "attachmentSuggestions": [
            {
              "id": "string",
              "type": "video|pdf|text|image",
              "source": "knowledge_base|web|user",
              "referenceLabel": "KB-1",
              "description": "Why this resource matters"
            }
          ]
        }
      ]
    }
  ],
  "sources": [{ "label": "KB-1", "docId": "abc", "chunkId": "abc_1", "source": "knowledge_base" }]
}
`.trim();

const GENERATOR_SCHEMA_DESCRIPTION = `
{
  "informationText": "Primary narrative content (Markdown allowed).",
  "afterVideoText": "Follow-up reflection or practice suggestions.",
  "aiConcepts": ["string"],
  "videoUrl": "https://",
  "attachments": [
    {
      "id": "string",
      "type": "video|pdf|text|image",
      "source": "knowledge_base|web|user",
      "referenceLabel": "KB-1",
      "description": "How this attachment is used"
    }
  ],
  "summary": "One sentence wrap-up",
  "durationInSeconds": 420,
  "checkpointQuiz": {
    "id": "string",
    "difficulty": "checkpoint|remediation",
    "instructions": "Short guidance for the learner",
    "questions": [
      {
        "id": "string",
        "prompt": "string",
        "type": "single_choice|multi_choice|short_answer",
        "choices": [
          { "id": "A", "label": "string", "isCorrect": false }
        ],
        "correctAnswers": ["A"],
        "explanation": "string",
        "visionReference": "caption or region reference when applicable"
      }
    ]
  },
  "visionCue": "Call out figures or screenshots explicitly when visionMode is enabled"
}
`.trim();

const sanitizeJsonString = (raw: string) =>
  raw
    .trim()
    .replace(/^```json/i, "")
    .replace(/```$/i, "")
    .trim();

const safeJsonParse = <T = any>(raw: string): T => {
  const sanitized = sanitizeJsonString(raw);
  try {
    return JSON.parse(sanitized) as T;
  } catch {
    const start = sanitized.indexOf("{");
    const end = sanitized.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const substring = sanitized.slice(start, end + 1);
      return JSON.parse(substring) as T;
    }
    throw new Error("AI response was not valid JSON.");
  }
};

const formatKnowledgeContext = (context: KnowledgeContextResult | null) => {
  if (!context || !context.snippets.length) {
    return "Knowledge Base Context: (no relevant excerpts)\n";
  }

  const body = context.snippets
    .map(
      (snippet, index) =>
        `[KB-${index + 1}] ${snippet.title}\n${snippet.content}`
    )
    .join("\n\n");

  return `Knowledge Base Context:\n${body}`;
};

const formatWebContext = (context: UnifiedWebSearchContext | null) => {
  if (!context || !context.results.length) {
    return "Web Search Context: (not enabled)\n";
  }

  const body = context.results
    .map(
      (result, index) =>
        `[WEB-${index + 1}] ${result.title}\n${result.content}`
    )
    .join("\n\n");

  return `Web Search Context:\n${body}`;
};

const buildAttachmentSuggestions = (
  attachments: any[] | undefined
): AttachmentSuggestion[] => {
  if (!Array.isArray(attachments)) return [];
  return attachments
    .filter((attachment) => attachment && typeof attachment === "object")
    .map((attachment) => ({
      id: attachment.id || generateFrameId(),
      type:
        attachment.type === "pdf" ||
        attachment.type === "video" ||
        attachment.type === "text" ||
        attachment.type === "image"
          ? attachment.type
          : "text",
      source:
        attachment.source === "knowledge_base" ||
        attachment.source === "web" ||
        attachment.source === "user"
          ? attachment.source
          : "knowledge_base",
      referenceLabel: attachment.referenceLabel,
      description:
        attachment.description ||
        attachment.summary ||
        "Suggested supporting material",
      url: attachment.url,
      pages: attachment.pages,
    }));
};

const normalizeCitations = (
  rawCitations: any[] | undefined
): KnowledgeCitation[] => {
  if (!Array.isArray(rawCitations)) return [];
  return rawCitations
    .filter((citation) => citation && typeof citation === "object")
    .map((citation, index) => ({
      label: citation.label || `KB-${index + 1}`,
      docId: citation.docId || citation.id || "",
      chunkId: citation.chunkId || "",
      source: citation.source || "knowledge_base",
      similarity: citation.similarity,
      excerpt: citation.excerpt,
    }));
};

const convertFlowPlanToLegacyPlan = (plan: FlowPlannerPlan): PlannerPlan => {
  const phaseMeta: Record<
    FlowPlannedFrame["phase"],
    { title: string; color: string; description: string; order: number }
  > = {
    overview: {
      title: "Orientation",
      color: "#0EA5E9",
      description: "Set context and highlight the learner journey.",
      order: 0,
    },
    fundamentals: {
      title: "Build the Experience",
      color: "#A855F7",
      description: "Cover the foundational steps and workflows.",
      order: 1,
    },
    "deep-dive": {
      title: "Launch + Iterate",
      color: "#F97316",
      description: "Advanced mastery and iteration tactics.",
      order: 2,
    },
    remediation: {
      title: "Remediation",
      color: "#EF4444",
      description: "Address common failure points and recovery patterns.",
      order: 3,
    },
  };

  const phaseOrder: FlowPlannedFrame["phase"][] = [
    "overview",
    "fundamentals",
    "deep-dive",
    "remediation",
  ];

  const framesByPhase = new Map<
    FlowPlannedFrame["phase"],
    FlowPlannedFrame[]
  >();
  plan.frames.forEach((frame, index) => {
    const phase = frame.phase || "overview";
    if (!framesByPhase.has(phase)) {
      framesByPhase.set(phase, []);
    }
    framesByPhase.get(phase)!.push({ ...frame, id: frame.id || `flow_frame_${index}` });
  });

  const chapters = phaseOrder
    .filter((phase) => framesByPhase.has(phase))
    .map((phase) => {
      const meta = phaseMeta[phase];
      const frames = framesByPhase.get(phase)!;
      const chapterId = `flow_${phase}`;
      return {
        id: chapterId,
        title: meta.title,
        goal: meta.description,
        order: meta.order,
        color: meta.color,
        citations: [],
        frames: frames.map((frame, index) => ({
          id: frame.id || `flow_frame_${index}`,
          title: frame.title,
          goal: frame.goal,
          chapterId,
          order: index,
          aiConcepts: frame.aiConcepts || [],
          citations: [],
          attachmentSuggestions: [],
          learningPhase: frame.phase,
          requiresVision: frame.requiresVision,
        })),
      };
    });

  // Fallback: ensure at least one chapter
  if (chapters.length === 0) {
    chapters.push({
      id: "flow_overview",
      title: "AI Flow",
      goal: plan.summary || "",
      order: 0,
      color: "#0284C7",
      citations: [],
      frames: plan.frames.map((frame, index) => ({
        id: frame.id || `flow_frame_${index}`,
        title: frame.title,
        goal: frame.goal,
        chapterId: "flow_overview",
        order: index,
        aiConcepts: frame.aiConcepts || [],
        citations: [],
        attachmentSuggestions: [],
        learningPhase: frame.phase,
        requiresVision: frame.requiresVision,
      })),
    });
  }

  return {
    id: `flow_${Date.now()}`,
    summary: plan.summary,
    learningMode: plan.learningMode,
    chapters,
    sources: [],
    createdAt: new Date().toISOString(),
    model: "FlowFramePlanner",
  };
};

const convertFlowFrameToDraft = (
  frame: FlowGeneratedFrame,
  index: number,
  chapterId: string
): FrameDraft => {
  const baseAttachment = frame.attachment
    ? {
        id: frame.attachment.url || generateFrameId(),
        type: (frame.attachment.type as "video" | "image" | "text" | "pdf") || "text",
        source: "knowledge_base" as const,
        referenceLabel: undefined,
        description: frame.attachment.description,
        url: frame.attachment.url,
      }
    : undefined;

  const generated: GeneratedFrameContent = {
    informationText: frame.informationText,
    afterVideoText: frame.afterVideoText,
    aiConcepts: frame.aiConcepts,
    videoUrl: "",
    attachment: baseAttachment,
    attachments: baseAttachment ? [baseAttachment] : [],
    summary: frame.summary,
    durationInSeconds: frame.durationInSeconds,
    checkpointQuiz: frame.checkpointQuiz ? {
      ...frame.checkpointQuiz,
      difficulty: "checkpoint" as const,
    } : undefined,
    recommendedResources: baseAttachment ? [baseAttachment] : [],
  };

  return {
    id: frame.id || generateFrameId(),
    title: frame.title,
    goal: frame.goal,
    chapterId,
    chapterTitle:
      frame.phase === "remediation"
        ? "Remediation"
        : frame.phase.replace(/-/g, " "),
    order: index,
    aiConcepts: frame.aiConcepts,
    citations: [],
    attachmentSuggestions: [],
    learningPhase: frame.phase,
    requiresVision: frame.requiresVision,
    tempId: frame.id || generateFrameId(),
    status: "generated",
    generated,
    provider: "openrouter",
    model: "FlowFrameGenerator",
    generatedAt: new Date().toISOString(),
    error: null,
    knowledgeContext: undefined,
    checkpointQuiz: frame.checkpointQuiz ? {
      ...frame.checkpointQuiz,
      difficulty: "checkpoint" as const,
    } : undefined,
    quizHistory: [],
    masteryState: index === 0 ? "ready" : "locked",
    source: "ai-flow" as SessionSource, // Track frame origin
  };
};

const injectKnowledgeIntoContext = (
  context: ResearchContext | null,
  knowledge: KnowledgeContextResult
): boolean => {
  if (!context || !knowledge.snippets.length) {
    return false;
  }

  const chunkPayload: ChunkData[] = knowledge.snippets.map((snippet, index) => ({
    id: snippet.id,
    text: snippet.content,
    source: snippet.title || snippet.source,
    similarity: snippet.similarity,
    metadata: {
      docId: snippet.docId,
      source: snippet.source,
      referenceLabel: knowledge.citations[index]?.label,
    },
  }));

  context.ragResults = context.ragResults || {
    chunks: [],
    summary: "",
  };
  context.ragResults.chunks = chunkPayload;
  context.ragResults.summary = knowledge.text.slice(0, 600);
  return true;
};

export function useAIFlowBuilder({
  vectorStore,
  vectorStoreInitialized,
  onAcceptFrames,
}: UseAIFlowBuilderProps): UseAIFlowBuilderReturn {
  const aiProviders = useAIProviders();
  const firecrawl = useFirecrawlKey();
  const unifiedSearchService = useMemo(
    () => getUnifiedWebSearchService(),
    []
  );
  const providerVectorStore =
    vectorStore && vectorStoreInitialized ? vectorStore : null;

  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState<PlannerPlan | null>(null);
  const [frameDrafts, setFrameDrafts] = useState<FrameDraft[]>([]);
  const [planning, setPlanning] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [contextPreview, setContextPreview] = useState<ContextPreview | null>(
    null
  );
  const [sessionState, setSessionState] = useState<LearningSessionState | null>(
    null
  );
  const [progressMetrics, setProgressMetrics] = useState<ProgressMetrics>({
    masteryPercent: 0,
    framesCompleted: 0,
    totalFrames: 0,
    remediationCount: 0,
    currentPhase: null,
  });
  
  // Session Management State
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<FlowSession[]>([]);
  const [sessionStore, setSessionStore] = useState<SessionStore | null>(null);
  const sessionSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const researchStepsState = useResearchSteps();
  const currentStepsRef = useRef<ResearchStep[]>([]);
  useEffect(() => {
    currentStepsRef.current = researchStepsState.steps;
  }, [researchStepsState.steps]);

  const {
    sessions: historySessions,
    startSession,
    appendLog,
    updateSession: updateHistorySession,
    deleteSession: deleteHistorySession,
    clearSessions: clearHistorySessions,
    exportSession: exportHistorySession,
    exportAllSessions: exportAllHistorySessions,
    importSessions: importHistorySessions,
  } = useFlowHistory();

  const knowledgeCacheRef = useRef<Map<string, KnowledgeContextResult>>(
    new Map()
  );
  const draftsOrderRef = useRef<string[]>([]);
  const lastPersistedSessionRef = useRef<string | null>(null);
  const mainStepIdRef = useRef<string | null>(null);
  const currentHistoryIdRef = useRef<string | null>(null);

  const calculateProgressMetrics = useCallback(
    (state: LearningSessionState | null): ProgressMetrics => {
      if (!state) {
        return {
          masteryPercent: 0,
          framesCompleted: 0,
          totalFrames: frameDrafts.length,
          remediationCount: 0,
          currentPhase: null,
        };
      }

      const remediationCount = Object.values(state.remediationMap).reduce(
        (sum, entries) => sum + (entries?.length || 0),
        0
      );

      const framesCompleted = state.completedFrameIds.length;
      const totalFrames =
        state.totalFrames || Math.max(frameDrafts.length, 1);
      const masteryPercent = totalFrames
        ? Math.min(100, Math.round((framesCompleted / totalFrames) * 100))
        : 0;
      const currentPhase =
        frameDrafts.find((draft) => draft.tempId === state.currentFrameId)
          ?.learningPhase || null;

      return {
        masteryPercent,
        framesCompleted,
        totalFrames,
        remediationCount,
        currentPhase,
      };
    },
    [frameDrafts]
  );

  // Initialize SessionStore when VectorStore is ready
  useEffect(() => {
    if (vectorStore && vectorStoreInitialized && !sessionStore) {
      const store = getSessionStore(vectorStore);
      store.initialize().then(() => {
        setSessionStore(store);
        // Load all sessions
        store.listSessions().then((loadedSessions) => {
          setSessions(loadedSessions);
          console.log(`📋 Loaded ${loadedSessions.length} sessions from KB`);
          
          // ✅ NEW: Restore active session from localStorage if it exists
          const savedActiveId = localStorage.getItem('timecapsule_active_session_id');
          if (savedActiveId && loadedSessions.some(s => s.id === savedActiveId)) {
            console.log(`🔄 Restoring active session from localStorage: ${savedActiveId}`);
            setActiveSessionId(savedActiveId);
            // Load the session state for the restored session
            const restoredSession = loadedSessions.find(s => s.id === savedActiveId);
            if (restoredSession) {
              setSessionState(restoredSession.sessionState);
            }
          } else if (savedActiveId) {
            console.log(`⚠️ Saved session ID ${savedActiveId} not found in loaded sessions, clearing localStorage`);
            localStorage.removeItem('timecapsule_active_session_id');
          }
        });
      });
    }
  }, [vectorStore, vectorStoreInitialized, sessionStore]);

  // Load sessions from KB when sessionStore changes
  // Note: This useEffect runs after the initialization useEffect above
  useEffect(() => {
    if (sessionStore) {
      sessionStore.listSessions().then((loadedSessions) => {
        setSessions(loadedSessions);
        
        // ✅ FIXED: Also restore active session here to handle cases where this runs after initialization
        const savedActiveId = localStorage.getItem('timecapsule_active_session_id');
        if (savedActiveId && loadedSessions.some(s => s.id === savedActiveId)) {
          // Only restore if not already set
          setActiveSessionId(prevId => {
            if (!prevId) {
              console.log(`✅ Restored active session from localStorage: ${savedActiveId}`);
              const restoredSession = loadedSessions.find(s => s.id === savedActiveId);
              if (restoredSession) {
                setSessionState(restoredSession.sessionState);
              }
              return savedActiveId;
            }
            return prevId; // Keep existing activeSessionId
          });
        } else if (savedActiveId) {
          console.log(`⚠️ Saved session ID ${savedActiveId} not found, clearing localStorage`);
          localStorage.removeItem('timecapsule_active_session_id');
        }
      });
    }
  }, [sessionStore]);

  // Session Management Functions
  const createNewSession = useCallback(
    (source: SessionSource, name?: string): FlowSession => {
      if (!sessionStore) {
        throw new Error("SessionStore not initialized");
      }
      console.log(`🎬 [SESSION] Creating new ${source} session...`);
      const newSession = sessionStore.createNewSession(source, name);
      console.log(`📦 [SESSION] New session object created:`, {
        id: newSession.id,
        name: newSession.name,
        source: newSession.source
      });
      
      setSessions((prev) => {
        console.log(`📋 [SESSION] Updating sessions array: ${prev.length} -> ${prev.length + 1}`);
        return [newSession, ...prev];
      });
      
      setActiveSessionId((prevId) => {
        console.log(`🎯 [SESSION] Setting active session ID: ${prevId} -> ${newSession.id}`);
        return newSession.id;
      });
      
      // Sync Mastery Progress to new session (starts at 0%)
      setSessionState(newSession.sessionState);
      setProgressMetrics({
        masteryPercent: 0,
        framesCompleted: 0,
        totalFrames: 0,
        remediationCount: 0,
        currentPhase: null,
      });
      
      // Update localStorage
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(newSession.sessionState)
          );
        } catch (error) {
          console.warn("⚠️ Failed to sync new session to localStorage:", error);
        }
      }
      
      // Immediately save the new session to VectorStore for persistence
      if (sessionStore) {
        console.log(`💾 [SESSION] Saving new session to VectorStore...`);
        sessionStore.saveSession(newSession).then(() => {
          console.log(`✅ [SESSION] New session saved to VectorStore`);
        }).catch((error) => {
          console.error(`❌ [SESSION] Failed to save new session:`, error);
        });
      }
      
      console.log(`✅ [SESSION] Session creation complete. Returning session ID: ${newSession.id}`);
      return newSession;
    },
    [sessionStore]
  );

  const saveCurrentSession = useCallback(
    async (immediate = false) => {
      if (!activeSessionId || !sessionStore) return;

      // Clear any pending save
      if (sessionSaveTimeoutRef.current) {
        clearTimeout(sessionSaveTimeoutRef.current);
        sessionSaveTimeoutRef.current = null;
      }

      const saveSession = async () => {
        const currentSession = sessions.find((s) => s.id === activeSessionId);
        if (!currentSession) return;

        // Update session with current state
        const updatedSession: FlowSession = {
          ...currentSession,
          plan,
          frameDrafts: frameDrafts.map((draft) => ({
            ...draft,
            source: draft.source || currentSession.source, // Ensure source is set
          })) as any,
          sessionState: sessionState || currentSession.sessionState,
          frameCount: frameDrafts.length,
          acceptedFrameCount: frameDrafts.filter((d) => d.status === "generated")
            .length,
          updatedAt: new Date().toISOString(),
          frameSources: {
            manual: frameDrafts.filter((d) => d.source === "manual").length,
            "ai-flow": frameDrafts.filter((d) => d.source === "ai-flow").length,
            "swe-bridge": frameDrafts.filter((d) => d.source === "swe-bridge")
              .length,
          },
        };

        await sessionStore.saveSession(updatedSession);

        // Update local state
        setSessions((prev) =>
          prev.map((s) => (s.id === activeSessionId ? updatedSession : s))
        );
        
        // Sync Mastery Progress with updated session
        const metrics = calculateProgressMetrics(updatedSession.sessionState);
        setProgressMetrics(metrics);
        
        // Sync to localStorage
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(
              SESSION_STORAGE_KEY,
              JSON.stringify(updatedSession.sessionState)
            );
          } catch (error) {
            console.warn("⚠️ Failed to sync session state to localStorage:", error);
          }
        }
      };

      if (immediate) {
        await saveSession();
      } else {
        // Debounce save
        sessionSaveTimeoutRef.current = setTimeout(saveSession, 1000);
      }
    },
    [activeSessionId, sessionStore, sessions, plan, frameDrafts, sessionState, calculateProgressMetrics]
  );

  const switchSession = useCallback(
    async (sessionId: string) => {
      if (!sessionStore) return;

      // Save current session first if active
      if (activeSessionId) {
        await saveCurrentSession(true);
      }

      // Load new session
      const session = await sessionStore.loadSession(sessionId);
      if (!session) {
        console.error(`Session not found: ${sessionId}`);
        return;
      }

      // Update state
      const loadedDrafts = session.frameDrafts as any as FrameDraft[];
      setPlan(session.plan);
      setFrameDrafts(loadedDrafts);
      setSessionState(session.sessionState);
      setActiveSessionId(sessionId);

      // Sync Mastery Progress with loaded session
      const metrics = calculateProgressMetrics(session.sessionState);
      setProgressMetrics(metrics);

      // Update localStorage to match active session
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(session.sessionState)
          );
        } catch (error) {
          console.warn("⚠️ Failed to sync session state to localStorage:", error);
        }
      }

      console.log(`🔄 Switched to session: ${session.name} (${loadedDrafts.length} frames loaded)`);
      console.log(`💡 Click "Accept All Frames" to add them to your workspace`);
    },
    [sessionStore, activeSessionId, saveCurrentSession, calculateProgressMetrics]
  );

  const renameSession = useCallback(
    async (sessionId: string, newName: string) => {
      if (!sessionStore) return;
      await sessionStore.updateSessionName(sessionId, newName);
      // Reload sessions
      const updatedSessions = await sessionStore.listSessions();
      setSessions(updatedSessions);
    },
    [sessionStore]
  );

  const deleteSession = useCallback(
    async (sessionId: string) => {
      if (!sessionStore) return;
      await sessionStore.deleteSession(sessionId);
      // Reload sessions
      const updatedSessions = await sessionStore.listSessions();
      setSessions(updatedSessions);
      // If deleting active session, clear state
      if (sessionId === activeSessionId) {
        setActiveSessionId(null);
        setPlan(null);
        setFrameDrafts([]);
        setSessionState(null);
      }
    },
    [sessionStore, activeSessionId]
  );

  const syncFrameToSession = useCallback((frame: AIFrame) => {
    if (!activeSessionId) return;
    
    // Convert AIFrame to FrameDraft
    const frameDraft: FrameDraft = {
      id: frame.id,
      title: frame.title,
      goal: frame.goal,
      chapterId: frame.chapterId || "",
      chapterTitle: "",
      order: frame.order || 0,
      aiConcepts: frame.aiConcepts || [],
      citations: [],
      attachmentSuggestions: [],
      learningPhase: (frame.learningPhase || "overview") as LearningPhase,
      requiresVision: false,
      tempId: frame.id,
      status: "generated",
      generated: {
        informationText: frame.informationText || "",
        afterVideoText: frame.afterVideoText || "",
        aiConcepts: frame.aiConcepts || [],
        videoUrl: frame.videoUrl || "",
        attachment: undefined, // Manual frames don't need complex attachments
        attachments: [],
        summary: "",
        durationInSeconds: frame.duration || 0,
        checkpointQuiz: frame.checkpointQuiz,
        recommendedResources: [],
      },
      provider: undefined,
      model: "manual",
      generatedAt: frame.createdAt,
      error: null,
      knowledgeContext: undefined,
      checkpointQuiz: frame.checkpointQuiz,
      quizHistory: frame.quizHistory || [],
      masteryState: frame.masteryState || "completed",
      source: "manual",
    };
    
    // Add to frameDrafts if not already present
    setFrameDrafts(prev => {
      const exists = prev.some(d => d.id === frame.id);
      if (exists) return prev;
      return [...prev, frameDraft];
    });
    
    console.log(`🔗 Synced frame to session: ${frame.title}`);
  }, [activeSessionId]);

  const syncFrameDeletions = useCallback((currentFrameIds: Set<string>) => {
    if (!activeSessionId) return;
    
    setFrameDrafts(prev => {
      const filtered = prev.filter(draft => currentFrameIds.has(draft.id));
      if (filtered.length !== prev.length) {
        console.log(`🗑️ Synced ${prev.length - filtered.length} frame deletion(s) to session`);
      }
      return filtered;
    });
  }, [activeSessionId]);

  // ✅ REMOVED: Auto-save on changes useEffect (was causing KB spam)
  // The useEffect that triggered saveCurrentSession on every state change
  // has been removed. Saves now happen via:
  // 1. 2-minute interval auto-save (below)
  // 2. Explicit saves on important actions (session creation, etc.)
  // This prevents hundreds of duplicate session documents in KB.

  // Auto-save on 2-minute interval
  useEffect(() => {
    if (!activeSessionId) return;

    const intervalId = setInterval(() => {
      console.log("⏰ Auto-saving session (2-minute interval)...");
      saveCurrentSession(true); // Immediate save
    }, 120000); // 2 minutes

    return () => {
      clearInterval(intervalId);
      // ✅ FIX: Removed cleanup save to prevent KB spam
      // The cleanup was saving on EVERY unmount (including re-renders),
      // creating thousands of duplicate session documents.
      // The 2-minute interval already handles regular saves,
      // and explicit saves happen on important actions.
    };
  }, [activeSessionId, saveCurrentSession]);

  // ✅ FIXED: Persist activeSessionId to localStorage for restoration after page reload
  // Only persist when there's a value - don't clear on initial mount (null)
  // Clearing is handled by the restoration logic when a saved session is invalid
  useEffect(() => {
    if (activeSessionId) {
      console.log(`💾 Persisting active session ID to localStorage: ${activeSessionId}`);
      localStorage.setItem('timecapsule_active_session_id', activeSessionId);
    }
    // Note: We don't clear localStorage here when activeSessionId is null
    // because it might be null on initial mount before restoration happens.
    // The restoration logic (lines 799-811) handles clearing invalid sessions.
  }, [activeSessionId]);

  const persistSessionToKnowledgeBase = useCallback(
    async (state: LearningSessionState) => {
      if (!vectorStore || !vectorStoreInitialized) {
        return;
      }

      const snapshotKey = `${state.id}_${state.updatedAt}`;
      // Avoid spamming KB with identical snapshots
      if (lastPersistedSessionRef.current === snapshotKey) {
        return;
      }

      try {
        await vectorStore.addVirtualDocument(
          `AI Frames Session ${state.id}`,
          JSON.stringify(state, null, 2),
          `aiframes-session://${state.id}`
        );
        lastPersistedSessionRef.current = snapshotKey;
      } catch (persistError) {
        console.warn("⚠️ Failed to persist session to Knowledge Base:", persistError);
      }
    },
    [vectorStore, vectorStoreInitialized]
  );

  const persistSessionState = useCallback(
    async (
      nextState: LearningSessionState,
      options: { persistKB?: boolean } = {}
    ) => {
      setSessionState(nextState);
      const metrics = calculateProgressMetrics(nextState);
      setProgressMetrics(metrics);

      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify(nextState)
          );
        } catch (storageError) {
          console.warn("⚠️ Failed to persist session locally:", storageError);
        }
      }

      if (currentHistoryIdRef.current) {
        updateHistorySession(currentHistoryIdRef.current, {
          masteryPercent: metrics.masteryPercent,
          totalFrames: nextState.totalFrames,
          status: metrics.masteryPercent >= 100 ? "completed" : "generating",
          sessionSnapshot: nextState,
        });
      }

      if (options.persistKB) {
        await persistSessionToKnowledgeBase(nextState);
      }
    },
    [calculateProgressMetrics, persistSessionToKnowledgeBase, updateHistorySession]
  );

  // 🔥 FIX: Restore session state once on mount only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as LearningSessionState;
      setSessionState(parsed);
      setProgressMetrics(calculateProgressMetrics(parsed));
    } catch (storageError) {
      console.warn("⚠️ Failed to restore previous AI Flow session:", storageError);
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []); // Run once on mount only

  const startTimeline = useCallback(
    (query: string) => {
      const id = `flow_builder_${Date.now()}`;
      mainStepIdRef.current = id;
      researchStepsState.clearSteps();
      researchStepsState.addStep({
        id,
        type: "analysis",
        status: "in_progress",
        timestamp: Date.now(),
        query,
        reasoning: "AI Flow Builder orchestration",
        subSteps: [],
      });
    },
    [researchStepsState]
  );

  const finalizeTimeline = useCallback(
    (
      status: "completed" | "failed",
      reasoning?: string,
      subSteps?: AgentSubStep[]
    ) => {
      const id = mainStepIdRef.current;
      if (!id) return;
      const existing = currentStepsRef.current.find((step) => step.id === id);
      if (!existing) return;
      researchStepsState.updateStep(id, {
        status,
        duration: Date.now() - existing.timestamp,
        reasoning: reasoning || existing.reasoning,
        subSteps: subSteps || existing.subSteps,
      });
    },
    [researchStepsState]
  );

  const deriveAgentType = useCallback(
    (agentName: string): AgentSubStep["agentType"] => {
      const normalized = agentName.toLowerCase();
      if (normalized.includes("planner")) {
        return "query_planner";
      }
      if (normalized.includes("inspector") || normalized.includes("data")) {
        return "data_inspector";
      }
      if (normalized.includes("pattern") || normalized.includes("generator")) {
        return "pattern_generator";
      }
      if (normalized.includes("extract") || normalized.includes("quiz")) {
        return "extraction";
      }
      return "synthesis";
    },
    []
  );

  const updateSubStep = useCallback(
    (
      agentName: string,
      updates: Partial<AgentSubStep> & {
        progressHistory?: ProgressHistoryEntry[];
      }
    ) => {
      const id = mainStepIdRef.current;
      if (!id) return;
      const existing = currentStepsRef.current.find((step) => step.id === id);
      if (!existing) return;
      const subSteps = existing.subSteps ? [...existing.subSteps] : [];
      const index = subSteps.findIndex((sub) => sub.agentName === agentName);
      if (index >= 0) {
        const current = subSteps[index];
        const mergedHistory = updates.progressHistory?.length
          ? [
              ...(current.progressHistory || []),
              ...updates.progressHistory,
            ]
          : current.progressHistory;
        subSteps[index] = {
          ...current,
          ...updates,
          progressHistory: mergedHistory,
        };
      } else {
        const baseHistory = updates.progressHistory?.length
          ? [...updates.progressHistory]
          : undefined;
        subSteps.push({
          id: `${agentName}_${Date.now()}`,
          agentName,
          agentType:
            (updates.agentType as AgentSubStep["agentType"]) ||
            deriveAgentType(agentName),
          status: updates.status || "in_progress",
          startTime: updates.startTime || Date.now(),
          ...updates,
          progressHistory: baseHistory,
        } as AgentSubStep);
      }
      researchStepsState.updateStep(id, { subSteps });
    },
    [deriveAgentType, researchStepsState]
  );

  const clearSessionState = useCallback(() => {
    setSessionState(null);
    setProgressMetrics({
      masteryPercent: 0,
      framesCompleted: 0,
      totalFrames: 0,
      remediationCount: 0,
      currentPhase: null,
    });
    draftsOrderRef.current = [];
    lastPersistedSessionRef.current = null;
    currentHistoryIdRef.current = null;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        /* noop */
      }
    }
  }, []);

  const applySessionMasteryToDrafts = useCallback(
    (state: LearningSessionState | null, drafts: FrameDraft[]) => {
      if (!state) {
        return drafts.map((draft) =>
          draft.quizHistory
            ? draft
            : {
                ...draft,
                quizHistory: [],
                masteryState: draft.masteryState || "ready",
              }
        );
      }

      const unlocked = new Set(state.unlockedFrameIds);
      const completed = new Set(state.completedFrameIds);
      const currentId = state.currentFrameId;

      return drafts.map((draft) => {
        const quizHistory = draft.quizHistory || [];
        let masteryState: FrameMasteryState = draft.masteryState || "locked";

        if (completed.has(draft.tempId)) {
          masteryState = "completed";
        } else if (draft.tempId === currentId) {
          masteryState = draft.status === "generated" ? "awaiting_quiz" : "ready";
        } else if (unlocked.has(draft.tempId)) {
          masteryState = "ready";
        } else if (
          draft.isRemediation &&
          draft.remediationParentId &&
          state.remediationMap[draft.remediationParentId]?.includes(draft.tempId)
        ) {
          masteryState = "ready";
        } else {
          masteryState = "locked";
        }

        if (
          masteryState !== draft.masteryState ||
          quizHistory !== draft.quizHistory
        ) {
          return {
            ...draft,
            masteryState,
            quizHistory,
          };
        }

        return draft;
      });
    },
    []
  );

  useEffect(() => {
    setFrameDrafts((prev) => applySessionMasteryToDrafts(sessionState, prev));
  }, [sessionState, applySessionMasteryToDrafts]);

  const getNextSequentialDraftId = useCallback(
    (frameId: string) => {
      const order = draftsOrderRef.current;
      const currentIndex = order.indexOf(frameId);
      if (currentIndex === -1) return null;

      for (let i = currentIndex + 1; i < order.length; i++) {
        const candidateId = order[i];
        const candidate = frameDrafts.find(
          (draft) => draft.tempId === candidateId
        );
        if (candidate && !candidate.isRemediation) {
          return candidateId;
        }
      }
      return null;
    },
    [frameDrafts]
  );

  const buildKnowledgeContext = useCallback(
    async (
      query: string,
      limit: number = MAX_KB_RESULTS_FOR_PLAN
    ): Promise<KnowledgeContextResult> => {
      if (!vectorStore || !vectorStoreInitialized) {
        return { query, snippets: [], text: "", citations: [] };
      }

      if (knowledgeCacheRef.current.has(query)) {
        return knowledgeCacheRef.current.get(query)!;
      }

      try {
        const results: SearchResult[] = await vectorStore.searchHybrid(query, {
          maxResults: limit,
          semanticWeight: 0.75,
          keywordWeight: 0.25,
          documentTypes: ["userdocs", "ai-frames", "timecapsule"],
        });

        const snippets: KnowledgeSnippet[] = results.map((result, index) => ({
          id: `${result.document.id}_${result.chunk.id}`,
          docId: result.document.id,
          title: result.document.title,
          content: result.chunk.content,
          similarity: Number(result.similarity.toFixed(3)),
          source: result.document.metadata.source || "knowledge_base",
        }));

        const text = snippets
          .map(
            (snippet, index) =>
              `[KB-${index + 1}] ${snippet.title}\n${snippet.content}`
          )
          .join("\n\n");

        const citations = snippets.map((snippet, index) => ({
          label: `KB-${index + 1}`,
          docId: snippet.docId,
          chunkId: snippet.id,
          source: snippet.source,
          similarity: snippet.similarity,
          excerpt: snippet.content.slice(0, 320),
        }));

        const context: KnowledgeContextResult = {
          query,
          snippets,
          text,
          citations,
        };

        knowledgeCacheRef.current.set(query, context);
        return context;
      } catch (retrievalError) {
        console.warn("Knowledge retrieval failed:", retrievalError);
        return { query, snippets: [], text: "", citations: [] };
      }
    },
    [vectorStore, vectorStoreInitialized]
  );

  const fetchWebContext = useCallback(
    async (query: string): Promise<UnifiedWebSearchContext | null> => {
      if (
        !webSearchEnabled ||
        !firecrawl.firecrawlState.configured ||
        !query.trim()
      ) {
        return null;
      }

      try {
        const context = await unifiedSearchService.searchWeb(query, {
          limit: 3,
          searchMode: "web",
        });
        return context;
      } catch (searchError) {
        console.warn("Web search failed:", searchError);
        return null;
      }
    },
    [firecrawl.firecrawlState.configured, unifiedSearchService, webSearchEnabled]
  );

  const formatLogContent = useCallback((input: any) => {
    if (typeof input === "string") {
      return input.slice(0, 4000);
    }
    try {
      return JSON.stringify(input, null, 2).slice(0, 4000);
    } catch {
      return String(input).slice(0, 4000);
    }
  }, []);

  const recordHistoryLog = useCallback(
    (
      agent: string,
      role: "request" | "response" | "info" | "error",
      content: any,
      metadata?: Record<string, any>
    ) => {
      const sessionId = currentHistoryIdRef.current;
      if (!sessionId) return;
      appendLog(sessionId, {
        id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        timestamp: new Date().toISOString(),
        agent,
        role,
        content: formatLogContent(content),
        metadata,
      });
    },
    [appendLog, formatLogContent]
  );

  const flowProgressCallback = useMemo(
    () => ({
      onAgentStart: async (
        agentName: string,
        agentType: string,
        _input: any
      ) => {
        updateSubStep(agentName, {
          agentName,
          agentType: agentType as any,
          status: "in_progress",
          startTime: Date.now(),
        });
        recordHistoryLog(agentName, "info", `Agent ${agentName} started`, {
          agentType,
        });
      },
      onAgentProgress: async (
        agentName: string,
        progress: number,
        stage?: string,
        itemsProcessed?: number,
        totalItems?: number
      ) => {
        const progressEntry: ProgressHistoryEntry = {
          timestamp: Date.now(),
          stage: stage || "progress",
          progress,
          itemsProcessed,
          totalItems,
        };
        updateSubStep(agentName, {
          progress,
          stage,
          itemsProcessed,
          totalItems,
          progressHistory: [progressEntry],
        });
        if (stage) {
          recordHistoryLog(
            agentName,
            "info",
            `${stage} (${progress.toFixed(0)}%)`,
            {
              progress,
            }
          );
        }
      },
      onAgentThinking: async (agentName: string, thinking: any) => {
        updateSubStep(agentName, {
          thinking,
        });
        if (thinking?.summary || thinking?.thinkingContent) {
          recordHistoryLog(
            agentName,
            "info",
            thinking.summary || thinking.thinkingContent,
            { phase: thinking.finalOutput ? "final" : "inference" }
          );
        }
      },
      onAgentComplete: async (
        agentName: string,
        output: any,
        metrics?: any
      ) => {
        updateSubStep(agentName, {
          status: "completed",
          endTime: Date.now(),
          duration: undefined,
          output,
          progress: 100,
          progressHistory: [
            {
              timestamp: Date.now(),
              stage: "completed",
              progress: 100,
            },
          ],
        });
        recordHistoryLog(
          agentName,
          "response",
          formatLogContent(output),
          metrics ? { metrics } : undefined
        );
      },
      onAgentError: async (agentName: string, error: string) => {
        updateSubStep(agentName, {
          status: "failed",
          error,
          progressHistory: [
            {
              timestamp: Date.now(),
              stage: "error",
              progress: 0,
            },
          ],
        });
        recordHistoryLog(agentName, "error", error);
      },
    }),
    [recordHistoryLog, updateSubStep, formatLogContent]
  );

  const parsePlannerResponse = useCallback(
    (raw: string): PlannerPlan => {
      const parsed = safeJsonParse<any>(raw);
      const planId = parsed.id || `plan_${Date.now()}`;
      const chaptersArray = Array.isArray(parsed.chapters)
        ? parsed.chapters
        : [];

      const totalFrames =
        chaptersArray.reduce(
          (sum: number, chapter: any) =>
            sum + (Array.isArray(chapter.frames) ? chapter.frames.length : 0),
          0
        ) || 1;
      let globalIndex = 0;

      const normalizedChapters: PlannerChapter[] = chaptersArray.map(
        (chapter: any, chapterIndex: number) => {
          const chapterId =
            chapter.id ||
            `${planId}_chapter_${chapterIndex + 1}`.toLowerCase();

          const framesArray = Array.isArray(chapter.frames)
            ? chapter.frames
            : [];

          const frames: PlannerFrame[] = framesArray.map(
            (frame: any, frameIndex: number) => {
              const ratio = globalIndex / Math.max(totalFrames, 1);
              const fallbackPhase =
                STEPWISE_PHASES[
                  Math.min(
                    STEPWISE_PHASES.length - 1,
                    Math.floor(ratio * STEPWISE_PHASES.length)
                  )
                ];
              globalIndex += 1;

              return {
                id:
                  frame.id ||
                  `${chapterId}_frame_${frameIndex + 1}`.toLowerCase(),
                title: frame.title || `Frame ${frameIndex + 1}`,
                goal: frame.goal || frame.description || "",
                chapterId,
                order: frame.order ?? frameIndex,
                aiConcepts: Array.isArray(frame.aiConcepts)
                  ? frame.aiConcepts
                  : [],
                citations: normalizeCitations(frame.citations),
                attachmentSuggestions: buildAttachmentSuggestions(
                  frame.attachmentSuggestions || frame.attachments
                ),
                learningPhase:
                  (frame.learningPhase as LearningPhase) || fallbackPhase,
                requiresVision: Boolean(frame.requiresVision),
              };
            }
          );

          return {
            id: chapterId,
            title: chapter.title || `Chapter ${chapterIndex + 1}`,
            goal: chapter.goal || chapter.description || "",
            order: chapter.order ?? chapterIndex,
            color: chapter.color,
            citations: normalizeCitations(chapter.citations),
            frames,
          };
        }
      );

      return {
        id: planId,
        summary: parsed.summary || parsed.description || "",
        chapters: normalizedChapters,
        sources: normalizeCitations(parsed.sources),
        createdAt: new Date().toISOString(),
        model: parsed.model,
        learningMode: parsed.learningMode || "bootstrapped_stepwise",
      };
    },
    []
  );

  // 🔬 DEBUG CHECKPOINT: Export frames for inspection
  const exportFramesDebugData = useCallback((frames: any[], checkpoint: string) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `debug-frames-${checkpoint}-${timestamp}.json`;
    
    const debugData = {
      checkpoint,
      timestamp: new Date().toISOString(),
      version: TIMECAPSULE_VERSION,
      frameCount: frames.length,
      frames: frames.map((frame, idx) => ({
        index: idx,
        id: frame?.id || 'UNDEFINED',
        title: frame?.title || 'UNDEFINED',
        goal: frame?.goal || 'UNDEFINED',
        informationText: frame?.informationText || 'UNDEFINED',
        type: frame?.type || 'UNDEFINED',
        order: frame?.order ?? 'UNDEFINED',
        isGenerated: frame?.isGenerated,
        hasUndefinedFields: !frame || !frame.id || !frame.title || !frame.informationText || !frame.type || frame.order === undefined,
        allFields: frame, // Full frame object for deep inspection
      })),
      validation: {
        undefinedFrames: frames.filter(f => !f || !f.id).length,
        missingTitle: frames.filter(f => f && !f.title).length,
        missingInformationText: frames.filter(f => f && !f.informationText).length,
        missingType: frames.filter(f => f && !f.type).length,
        missingOrder: frames.filter(f => f && f.order === undefined).length,
      }
    };
    
    // Export to file
    const blob = new Blob([JSON.stringify(debugData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log(`🔬 DEBUG CHECKPOINT: Exported ${frames.length} frames to ${filename}`);
    console.log(`⚠️ Validation warnings:`, debugData.validation);
    
    return debugData;
  }, []);

  const planFlow = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Enter a prompt before running AI Build Flow.");
      return;
    }

    // 🚀 VERSION MARKER - DO NOT REMOVE
    console.log(`🚀 TimeCapsule Version ${TIMECAPSULE_VERSION} - AI Flow Builder Starting`);
    console.log(`✅ Fix 1: DataInspector trust LLM decisions (semantic override fix)`);
    console.log(`✅ Fix 2: PatternGenerator fail-fast validation (no garbage extraction)`);
    console.log(`✅ Fix 3: SelectTrigger infinite re-render fix (stable callbacks + stable values)`);
    console.log(`✅ Fix 4: DataInspector parsing improvements (methods, filename, JSON)`);
    console.log(`✅ Fix 5: Multi-line list parsing (preserve newlines in methods/concepts)`);

    // Session Management: Create or use active AI Flow session
    let aiFlowSession: FlowSession | null = null;
    const activeSession = sessions.find((s) => s.id === activeSessionId);

    // ✅ NEW: Check if user wants to continue with non-AI-Flow session
    if (activeSessionId && activeSession && activeSession.source !== "ai-flow") {
      console.log("🔔 Active session is not AI Flow - will show dialog to user");
      // For now, create new AI Flow session automatically
      // TODO: The dialog will be shown via event, but for now we proceed with new session
      if (sessionStore) {
        aiFlowSession = createNewSession("ai-flow", `AI Flow: ${prompt.slice(0, 50)}`);
        console.log(`🆕 Created new AI Flow session: ${aiFlowSession?.name || "unnamed"}`);
      }
    } else if (activeSessionId && activeSession?.source === "ai-flow") {
      // Use existing active AI Flow session
      aiFlowSession = activeSession;
      console.log(`📂 Using existing AI Flow session: ${aiFlowSession?.name}`);
    } else {
      // Create new AI Flow session
      if (sessionStore) {
        aiFlowSession = createNewSession("ai-flow", `AI Flow: ${prompt.slice(0, 50)}`);
        console.log(`🆕 Created new AI Flow session: ${aiFlowSession?.name || "unnamed"}`);
      }
    }

    const flowSessionId = `session_${Date.now()}`;
    currentHistoryIdRef.current = flowSessionId;
    startTimeline(prompt);
    setPlanning(true);
    setError(null);
    startSession({
      id: flowSessionId,
      prompt,
      totalFrames: 0,
      snapshot: null,
    });

    try {
      const llmBridge = async (
        llmPrompt: string,
        options?: AgentLLMOptions
      ) => {
        const tier = resolveAgentTier(options);
        const response = await aiProviders.callLLM({
          prompt: llmPrompt,
          preferProvider: "openrouter",
          allowFallback: true,
          tier,
          temperature:
            options?.temperature ??
            (tier === "planner" ? 0.2 : tier === "vision" ? 0.25 : 0.35),
          maxTokens: options?.maxTokens,
          metadata: {
            agent: options?.agent,
            tierHint: options?.tierHint,
            mode: "flow_builder",
          },
        });
        return response.content;
      };

      const orchestrator = createMultiAgentSystem(
        llmBridge,
        flowProgressCallback,
        providerVectorStore || undefined,
        {
          enableWebSearch: webSearchEnabled,
          enableFlowAgents: true,
          mode: "flow_builder",
        }
      );

      await orchestrator.research(prompt);
      const finalContext = orchestrator.getContext();
      const subSteps = orchestrator.getAgentSubSteps();
      let flowPlan = finalContext?.flowBuilder?.plan;
      let flowFrames = finalContext?.flowBuilder?.generatedFrames || [];

      if (finalContext && (!flowPlan || flowFrames.length === 0)) {
        recordHistoryLog(
          "FlowFramePlanner",
          "info",
          "Multi-agent pipeline skipped FlowFramePlanner – running fallback planner."
        );

        if (!finalContext.ragResults?.chunks?.length) {
          const fallbackKnowledge = await buildKnowledgeContext(
            prompt,
            MAX_KB_RESULTS_FOR_PLAN
          );
          if (injectKnowledgeIntoContext(finalContext, fallbackKnowledge)) {
            setContextPreview((prev) => ({
              knowledge: fallbackKnowledge,
              web: prev?.web || null,
            }));
          }
        }

        const plannerAgent = new FlowFramePlannerAgent(
          llmBridge,
          flowProgressCallback
        );
        await plannerAgent.process(finalContext);
        flowPlan = finalContext.flowBuilder?.plan;
      }

      if (finalContext && flowPlan && flowFrames.length === 0) {
        recordHistoryLog(
          "FlowFrameGenerator",
          "info",
          "Generating frames via fallback FlowFrameGenerator."
        );
        const generatorAgent = new FlowFrameGeneratorAgent(
          llmBridge,
          flowProgressCallback
        );
        await generatorAgent.process(finalContext);
        flowFrames = finalContext.flowBuilder?.generatedFrames || [];
      }

      // 🔬 DEBUG CHECKPOINT: Export frames before pushing to UI
      if (flowFrames.length > 0) {
        const debugData = exportFramesDebugData(flowFrames, 'flowframegenerator');
        
        // Log critical warnings
        if (debugData.validation.undefinedFrames > 0) {
          console.error(`🚨 CRITICAL: ${debugData.validation.undefinedFrames} undefined frames detected!`);
        }
        if (debugData.validation.missingTitle > 0) {
          console.warn(`⚠️ WARNING: ${debugData.validation.missingTitle} frames missing title`);
        }
        if (debugData.validation.missingInformationText > 0) {
          console.warn(`⚠️ WARNING: ${debugData.validation.missingInformationText} frames missing informationText`);
        }
        if (debugData.validation.missingType > 0) {
          console.warn(`⚠️ WARNING: ${debugData.validation.missingType} frames missing type`);
        }
        if (debugData.validation.missingOrder > 0) {
          console.warn(`⚠️ WARNING: ${debugData.validation.missingOrder} frames missing order`);
        }
        
        // Filter out undefined/malformed frames to prevent UI crash
        const validFrames = flowFrames.filter(frame => {
          if (!frame) {
            console.error('🚨 Filtered out undefined frame');
            return false;
          }
          if (!frame.id || !frame.title || !frame.informationText) {
            console.error(`🚨 Filtered out malformed frame:`, { id: frame.id, title: frame.title });
            return false;
          }
          // Note: type and order will be set by convertDraftToFrame, so we don't filter on them here
          return true;
        });
        
        console.log(`✅ Filtered frames: ${flowFrames.length} → ${validFrames.length} valid`);
        flowFrames = validFrames;
      }

      if (!flowPlan || flowFrames.length === 0) {
        throw new Error(
          "Flow agents did not produce a learning plan with frames."
        );
      }

      const legacyPlan = convertFlowPlanToLegacyPlan(flowPlan);
      const chapterLookup = new Map<string, string>();
      legacyPlan.chapters.forEach((chapter) => {
        chapter.frames.forEach((frame) => {
          chapterLookup.set(frame.id, chapter.id);
        });
      });
      const fallbackChapterId =
        legacyPlan.chapters[0]?.id || "flow_overview";
      const drafts = flowFrames.map((frame, index) =>
        convertFlowFrameToDraft(
          frame,
          index,
          chapterLookup.get(frame.id) || fallbackChapterId
        )
      );

      draftsOrderRef.current = drafts.map((draft) => draft.tempId);

      const session: LearningSessionState = {
        id: flowSessionId,
        mode: flowPlan.learningMode || "bootstrapped_stepwise",
        prompt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentFrameId: drafts[0]?.tempId || null,
        unlockedFrameIds: drafts[0] ? [drafts[0].tempId] : [],
        completedFrameIds: [],
        quizHistory: {},
        remediationMap: {},
        masteryPercent: 0,
        totalFrames: drafts.length,
      };

      await persistSessionState(session, { persistKB: true });
      updateHistorySession(flowSessionId, {
        status: "generating",
        totalFrames: drafts.length,
        sessionSnapshot: session,
      });

      setPlan(legacyPlan);
      setFrameDrafts(drafts);
      finalizeTimeline("completed", "Flow Builder orchestration complete", subSteps);
    } catch (plannerError) {
      console.error("AI Flow orchestration failed:", plannerError);
      recordHistoryLog(
        "system",
        "error",
        plannerError instanceof Error
          ? plannerError.message
          : String(plannerError)
      );
      finalizeTimeline(
        "failed",
        plannerError instanceof Error
          ? plannerError.message
          : "AI orchestration failed"
      );
      if (currentHistoryIdRef.current) {
        updateHistorySession(currentHistoryIdRef.current, {
          status: "failed",
        });
      }
      setError(
        plannerError instanceof Error
          ? plannerError.message
          : "AI orchestration failed"
      );
    } finally {
      setPlanning(false);
    }
  }, [
    aiProviders,
    buildKnowledgeContext,
    finalizeTimeline,
    flowProgressCallback,
    persistSessionState,
    prompt,
    recordHistoryLog,
    startSession,
    startTimeline,
    updateHistorySession,
    providerVectorStore,
    webSearchEnabled,
  ]);

  const updateDraftStatus = useCallback(
    (frameId: string, updates: Partial<FrameDraft>) => {
      setFrameDrafts((prev) =>
        prev.map((draft) =>
          draft.tempId === frameId ? { ...draft, ...updates } : draft
        )
      );
    },
    []
  );

  const generateFrameDrafts = useCallback(
    async (frameIds?: string[]) => {
      if (!plan) {
        setError("Create a plan before generating frame content.");
        return;
      }

      let targets = frameDrafts.filter((draft) =>
        frameIds ? frameIds.includes(draft.tempId) : draft.status !== "generated"
      );

      if (!targets.length) {
        setError("Select at least one frame draft to generate.");
        return;
      }

      if (sessionState) {
        targets = targets.filter((draft) => draft.masteryState !== "locked");
        if (!targets.length) {
          setError(
            "Selected frames are locked. Complete earlier checkpoints before generating these frames."
          );
          return;
        }
      }

      setGenerating(true);
      setError(null);

      for (const draft of targets) {
        updateDraftStatus(draft.tempId, { status: "generating", error: null });

        try {
          const knowledge = await buildKnowledgeContext(
            `${draft.title} ${draft.goal}`,
            MAX_KB_RESULTS_FOR_FRAME
          );
          const webContext = await fetchWebContext(draft.title);

          const visionMode =
            aiProviders.openrouter.connectionState.visionMode;
          const visionInstruction =
            visionMode === "vision"
              ? "Vision mode is enabled. Reference any diagrams or screenshots explicitly (mention captions or describe regions)."
              : "Vision mode is disabled. Rely on text context only.";

          const phaseInstruction = `Current learning phase: ${draft.learningPhase}. The frame should naturally escalate difficulty for this phase.`;

          const generatorMessages = [
            {
              role: "system" as const,
              content: `${DEFAULT_SYSTEM_PROMPT}\nYou are now filling in frame content. JSON schema:\n${GENERATOR_SCHEMA_DESCRIPTION}`,
            },
            {
              role: "user" as const,
              content: [
                `Frame Title: ${draft.title}`,
                `Learning Goal: ${draft.goal}`,
                `Chapter: ${draft.chapterTitle}`,
                phaseInstruction,
                `Planned Concepts: ${draft.aiConcepts.join(", ") || "N/A"}`,
                formatKnowledgeContext(knowledge),
                formatWebContext(webContext),
                visionInstruction,
                draft.requiresVision
                  ? "This frame references uploaded figures/images. Describe them explicitly within the explanations and quiz prompts."
                  : "This frame is text-first; only reference visuals if present in the provided snippets.",
                "Instructions:",
                "- Use headings and bullet points where helpful.",
                "- Reference citations by label (KB-1, WEB-1, etc).",
                "- Include actionable takeaways.",
                "- Produce a checkpointQuiz with 1-3 thoughtful questions that verify understanding before the learner can advance.",
                "- If the learner fails the quiz, we will request a remediation frame, so keep the summary granular.",
              ].join("\n\n"),
            },
          ];

          recordHistoryLog("generator", "request", generatorMessages, {
            frameId: draft.tempId,
          });

          const fallbackPrompt = generatorMessages
            .map(
              (message) => `${message.role.toUpperCase()}:\n${message.content}`
            )
            .join("\n\n");

          const response = await aiProviders.callLLM({
            tier: "generator",
            prompt: fallbackPrompt,
            messages: generatorMessages,
            responseFormat: { type: "json_object" },
            metadata: {
              action: "frame_generation",
              frame_id: draft.tempId,
              plan_id: plan.id,
            },
            temperature: 0.35,
          });
          recordHistoryLog("generator", "response", response.content, {
            frameId: draft.tempId,
          });

          const parsed = safeJsonParse<any>(response.content);
          const checkpointQuiz: FrameQuiz | undefined = parsed.checkpointQuiz;
          const generated: GeneratedFrameContent = {
            informationText: parsed.informationText || "",
            afterVideoText: parsed.afterVideoText || "",
            aiConcepts: Array.isArray(parsed.aiConcepts)
              ? parsed.aiConcepts
              : draft.aiConcepts,
            videoUrl: parsed.videoUrl || "",
            attachment: parsed.attachment,
            attachments: buildAttachmentSuggestions(parsed.attachments),
            summary: parsed.summary,
            durationInSeconds: parsed.durationInSeconds,
            recommendedResources: buildAttachmentSuggestions(
              parsed.recommendedResources
            ),
            checkpointQuiz,
            visionCue: parsed.visionCue,
          };

          updateDraftStatus(draft.tempId, {
            status: "generated",
            generated,
            checkpointQuiz,
            provider: response.provider,
            model: response.model,
            generatedAt: new Date().toISOString(),
            knowledgeContext: knowledge,
            masteryState:
              sessionState?.currentFrameId === draft.tempId
                ? "awaiting_quiz"
                : draft.masteryState,
            error: null,
          });
        } catch (generationError) {
          console.error(
            `Frame generation failed for ${draft.tempId}:`,
            generationError
          );
          recordHistoryLog(
            "generator",
            "error",
            generationError instanceof Error
              ? generationError.message
              : String(generationError),
            { frameId: draft.tempId }
          );
          updateDraftStatus(draft.tempId, {
            status: "error",
            error:
              generationError instanceof Error
                ? generationError.message
                : "Frame generation failed",
          });
        }
      }

      setGenerating(false);
    },
    [
      aiProviders,
      buildKnowledgeContext,
      fetchWebContext,
      frameDrafts,
      plan,
      sessionState,
      updateDraftStatus,
      recordHistoryLog,
    ]
  );

  const convertDraftToFrame = useCallback((draft: FrameDraft): AIFrame | null => {
    if (!draft.generated) return null;

    return {
      id: generateFrameId(),
      title: draft.generated.summary || draft.title,
      goal: draft.goal,
      informationText: draft.generated.informationText || "",
      videoUrl: draft.generated.videoUrl || "",
      startTime: 0,
      duration: draft.generated.durationInSeconds || 0,
      afterVideoText: draft.generated.afterVideoText || "",
      aiConcepts: draft.generated.aiConcepts || draft.aiConcepts,
      conceptIds: draft.aiConcepts,
      isGenerated: true,
      sourceGoal: prompt,
      sourceUrl: draft.generated.videoUrl,
      order: draft.order,
      chapterId: draft.chapterId,
      type: "frame",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachment: draft.generated.attachment
        ? {
            id: draft.generated.attachment.id,
            type: draft.generated.attachment.type,
            data: {
              description: draft.generated.attachment.description,
              referenceLabel: draft.generated.attachment.referenceLabel,
              source: draft.generated.attachment.source,
            },
          }
        : undefined,
      notes: draft.generated.summary,
      documents: (draft.knowledgeContext?.citations || []).map((citation) => ({
        name: citation.label,
        type: citation.source,
        content: citation.excerpt,
        url: undefined,
      })),
    };
  }, [prompt]);

  const generateRemediationFrame = useCallback(
    async (parentDraft: FrameDraft): Promise<FrameDraft | null> => {
      try {
        const knowledge =
          parentDraft.knowledgeContext ||
          (await buildKnowledgeContext(
            `${parentDraft.title} remediation`,
            MAX_KB_RESULTS_FOR_FRAME
          ));
        const webContext = await fetchWebContext(
          `${parentDraft.title} remediation`
        );

        const remediationMessages = [
          {
            role: "system" as const,
            content: `${DEFAULT_SYSTEM_PROMPT}\nYou are generating a remediation frame that simplifies the concept before retrying the checkpoint quiz. JSON schema:\n${GENERATOR_SCHEMA_DESCRIPTION}`,
          },
          {
            role: "user" as const,
            content: [
              `Original Frame Title: ${parentDraft.title}`,
              `Remediation Goal: Explain the concept more simply and prepare the learner to retry the quiz.`,
              `Learning Phase: remediation (derived from ${parentDraft.learningPhase}).`,
              formatKnowledgeContext(knowledge),
              formatWebContext(webContext),
              "Instructions:",
              "- Focus on the most common misconceptions that could cause incorrect answers.",
              "- Use analogies or visual references when possible.",
              "- Provide a fresh checkpointQuiz so the learner can retry after reviewing this remediation frame.",
            ].join("\n\n"),
          },
        ];

        recordHistoryLog("generator", "request", remediationMessages, {
          frameId: parentDraft.tempId,
          remediation: true,
        });
        const fallbackPrompt = remediationMessages
          .map(
            (message) => `${message.role.toUpperCase()}:\n${message.content}`
          )
          .join("\n\n");

        const response = await aiProviders.callLLM({
          tier: "generator",
          prompt: fallbackPrompt,
          messages: remediationMessages,
          responseFormat: { type: "json_object" },
          metadata: {
            action: "remediation_frame_generation",
            parent_frame_id: parentDraft.tempId,
          },
          temperature: 0.3,
        });
        recordHistoryLog("generator", "response", response.content, {
          frameId: parentDraft.tempId,
          remediation: true,
        });

        const parsed = safeJsonParse<any>(response.content);
        const checkpointQuiz: FrameQuiz | undefined = parsed.checkpointQuiz;
        const generated: GeneratedFrameContent = {
          informationText: parsed.informationText || "",
          afterVideoText: parsed.afterVideoText || "",
          aiConcepts: Array.isArray(parsed.aiConcepts)
            ? parsed.aiConcepts
            : parentDraft.aiConcepts,
          videoUrl: parsed.videoUrl || "",
          attachment: parsed.attachment,
          attachments: buildAttachmentSuggestions(parsed.attachments),
          summary: parsed.summary,
          durationInSeconds: parsed.durationInSeconds,
          recommendedResources: buildAttachmentSuggestions(
            parsed.recommendedResources
          ),
          checkpointQuiz,
          visionCue: parsed.visionCue,
        };

        const remediationDraft: FrameDraft = {
          ...parentDraft,
          tempId: `${parentDraft.tempId}_rem_${Date.now()}`,
          title: `${parentDraft.title} · Remediation`,
          status: "generated",
          generated,
          checkpointQuiz,
          quizHistory: [],
          masteryState: "ready",
          isRemediation: true,
          remediationParentId: parentDraft.tempId,
          knowledgeContext: knowledge,
          source: parentDraft.source || "ai-flow", // Inherit source from parent
        };

        setFrameDrafts((prev) => {
          const parentIndex = prev.findIndex(
            (draft) => draft.tempId === parentDraft.tempId
          );
          if (parentIndex === -1) {
            return prev;
          }
          const updated = [...prev];
          updated.splice(parentIndex + 1, 0, remediationDraft);

          draftsOrderRef.current = [
            ...draftsOrderRef.current.slice(0, parentIndex + 1),
            remediationDraft.tempId,
            ...draftsOrderRef.current.slice(parentIndex + 1),
          ];

          return updated;
        });

        return remediationDraft;
      } catch (remediationError) {
        console.error("Remediation generation failed:", remediationError);
        recordHistoryLog(
          "generator",
          "error",
          remediationError instanceof Error
            ? remediationError.message
            : String(remediationError),
          { frameId: parentDraft.tempId, remediation: true }
        );
        setError(
          remediationError instanceof Error
            ? remediationError.message
            : "Remediation generation failed"
        );
        return null;
      }
    },
    [aiProviders, buildKnowledgeContext, fetchWebContext, recordHistoryLog]
  );

  const evaluateCheckpoint = useCallback(
    async (frameId: string, outcome: "pass" | "fail") => {
      if (!sessionState) {
        setError("Plan a session before evaluating checkpoints.");
        return;
      }

      const targetDraft = frameDrafts.find((draft) => draft.tempId === frameId);
      if (!targetDraft) {
        setError("Unable to find selected frame for evaluation.");
        return;
      }

      const quiz =
        targetDraft.generated?.checkpointQuiz ||
        targetDraft.checkpointQuiz ||
        ({
          id: `quiz_${frameId}`,
          difficulty: "checkpoint",
          instructions: "Confirm comprehension before advancing.",
          questions: [],
        } as FrameQuiz);

      const attempt: QuizAttempt = {
        attemptId: `attempt_${Date.now()}`,
        frameId,
        quizId: quiz.id,
        submittedAt: new Date().toISOString(),
        passed: outcome === "pass",
        responses: [],
      };

      let remediationDraft: FrameDraft | null = null;

      if (outcome === "fail") {
        remediationDraft = await generateRemediationFrame(targetDraft);
        if (remediationDraft) {
          attempt.remediationFrameId = remediationDraft.tempId;
        }
      }

      recordHistoryLog(
        "quiz",
        "info",
        `Checkpoint ${outcome === "pass" ? "passed" : "failed"} for frame ${frameId}`,
        {
          frameId,
          quizId: quiz.id,
        }
      );

      setFrameDrafts((prev) =>
        prev.map((draft) => {
          if (draft.tempId === frameId) {
            return {
              ...draft,
              quizHistory: [...(draft.quizHistory || []), attempt],
              masteryState:
                outcome === "pass" ? "completed" : "needs_remediation",
            };
          }
          if (
            outcome === "pass" &&
            targetDraft.remediationParentId &&
            draft.tempId === targetDraft.remediationParentId
          ) {
            return {
              ...draft,
              masteryState: "completed",
            };
          }
          return draft;
        })
      );

      const nextSession: LearningSessionState = {
        ...sessionState,
        quizHistory: {
          ...sessionState.quizHistory,
          [frameId]: [
            ...(sessionState.quizHistory[frameId] || []),
            attempt,
          ],
        },
        completedFrameIds:
          outcome === "pass"
            ? Array.from(
                new Set([...sessionState.completedFrameIds, frameId])
              )
            : sessionState.completedFrameIds,
        unlockedFrameIds: (() => {
          if (outcome === "pass") {
            const withoutCurrent = sessionState.unlockedFrameIds.filter(
              (id) => id !== frameId
            );
            const nextId = getNextSequentialDraftId(frameId);
            if (
              nextId &&
              !withoutCurrent.includes(nextId) &&
              !sessionState.completedFrameIds.includes(nextId)
            ) {
              return [...withoutCurrent, nextId];
            }
            return withoutCurrent;
          }

          if (remediationDraft) {
            return Array.from(
              new Set([
                ...sessionState.unlockedFrameIds,
                remediationDraft.tempId,
              ])
            );
          }

          return sessionState.unlockedFrameIds;
        })(),
        remediationMap:
          outcome === "fail" && remediationDraft
            ? {
                ...sessionState.remediationMap,
                [frameId]: [
                  ...(sessionState.remediationMap[frameId] || []),
                  remediationDraft.tempId,
                ],
              }
            : sessionState.remediationMap,
        currentFrameId:
          outcome === "pass"
            ? getNextSequentialDraftId(frameId)
            : remediationDraft?.tempId || sessionState.currentFrameId,
        updatedAt: new Date().toISOString(),
        masteryPercent: 0, // placeholder, recalculated below
      };

      if (outcome === "pass" && targetDraft.remediationParentId) {
        nextSession.completedFrameIds = Array.from(
          new Set([
            ...nextSession.completedFrameIds,
            targetDraft.remediationParentId,
          ])
        );
        nextSession.remediationMap = {
          ...nextSession.remediationMap,
          [targetDraft.remediationParentId]: [],
        };
      }

      const metrics = calculateProgressMetrics(nextSession);
      nextSession.masteryPercent = metrics.masteryPercent;

      await persistSessionState(nextSession, { persistKB: true });
    },
    [
      calculateProgressMetrics,
      frameDrafts,
      generateRemediationFrame,
      getNextSequentialDraftId,
      persistSessionState,
      sessionState,
      recordHistoryLog,
    ]
  );

  const acceptDrafts = useCallback(
    (frameIds?: string[]): AIFrame[] => {
      const targets = frameDrafts.filter((draft) =>
        frameIds ? frameIds.includes(draft.tempId) : draft.status === "generated"
      );

      const masteredTargets = targets.filter(
        (draft) => draft.masteryState === "completed"
      );

      const frames: AIFrame[] = [];
      const remaining: FrameDraft[] = [];

      for (const draft of frameDrafts) {
        if (!masteredTargets.some((target) => target.tempId === draft.tempId)) {
          remaining.push(draft);
          continue;
        }

        const frame = convertDraftToFrame(draft);
        if (frame) {
          frames.push(frame);
        } else {
          remaining.push(draft);
        }
      }

      if (!frames.length) {
        setError(
          "No completed frames are ready to sync. Pass the checkpoint quiz before accepting."
        );
        return [];
      }

      setFrameDrafts(remaining);

      if (sessionState) {
        void persistSessionState({
          ...sessionState,
          totalFrames: remaining.length,
          updatedAt: new Date().toISOString(),
        });
      }

      return frames;
    },
    [convertDraftToFrame, frameDrafts, persistSessionState, sessionState]
  );

  const discardDrafts = useCallback(
    (frameIds?: string[]) => {
      if (!frameIds || frameIds.length === 0) {
        setFrameDrafts([]);
        setPlan(null);
        clearSessionState();
        return;
      }

      setFrameDrafts((prev) =>
        prev.filter((draft) => !frameIds.includes(draft.tempId))
      );

      if (sessionState) {
        const sanitizedCurrent =
          frameIds.includes(sessionState.currentFrameId || "")
            ? getNextSequentialDraftId(frameIds[frameIds.length - 1]) ?? null
            : sessionState.currentFrameId;

        const nextState: LearningSessionState = {
          ...sessionState,
          completedFrameIds: sessionState.completedFrameIds.filter(
            (id) => !frameIds.includes(id)
          ),
          unlockedFrameIds: sessionState.unlockedFrameIds.filter(
            (id) => !frameIds.includes(id)
          ),
          currentFrameId: sanitizedCurrent,
          updatedAt: new Date().toISOString(),
          totalFrames: Math.max(
            0,
            sessionState.totalFrames - frameIds.length
          ),
        };

        void persistSessionState(nextState);
      }
    },
    [clearSessionState, getNextSequentialDraftId, persistSessionState, sessionState]
  );

  const resetPlan = useCallback(() => {
    setPlan(null);
    setFrameDrafts([]);
    setContextPreview(null);
    setError(null);
    clearSessionState();
  }, [clearSessionState]);

  return {
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
    historySessions,
    historyActions: {
      deleteSession: deleteHistorySession,
      clearSessions: clearHistorySessions,
      exportSession: exportHistorySession,
      exportAllSessions: exportAllHistorySessions,
      importSessions: importHistorySessions,
    },
    timelineSteps: researchStepsState.steps,
    timelineExpandedSteps: researchStepsState.expandedSteps,
    handleTimelineStepClick: researchStepsState.handleStepClick,
    
    // Session Management
    activeSessionId,
    sessions,
    createNewSession,
    saveCurrentSession,
    switchSession,
    renameSession,
    deleteSession,
    syncFrameToSession,
    syncFrameDeletions,
  };
}
