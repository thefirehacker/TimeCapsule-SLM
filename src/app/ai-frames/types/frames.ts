// AI Frames Core Types
export type LearningPhase =
  | "overview"
  | "fundamentals"
  | "deep-dive"
  | "remediation";

export type FrameMasteryState =
  | "locked"
  | "ready"
  | "awaiting_quiz"
  | "needs_remediation"
  | "completed";

export interface FrameQuizChoice {
  id: string;
  label: string;
  isCorrect?: boolean;
}

export interface FrameQuizQuestion {
  id: string;
  prompt: string;
  type: "single_choice" | "multi_choice" | "short_answer";
  choices?: FrameQuizChoice[];
  correctAnswers: string[];
  explanation?: string;
  visionReference?: string;
}

export interface FrameQuiz {
  id: string;
  difficulty: "checkpoint" | "remediation";
  instructions: string;
  questions: FrameQuizQuestion[];
}

export interface QuizAttempt {
  attemptId: string;
  frameId: string;
  quizId: string;
  submittedAt: string;
  passed: boolean;
  responses: Array<{
    questionId: string;
    userAnswer: string | string[];
    correct: boolean;
  }>;
  remediationFrameId?: string;
}

export interface AIFrame {
  id: string;
  title: string;
  goal: string;
  informationText: string;
  videoUrl: string;
  startTime: number;
  duration: number;
  afterVideoText: string;
  aiConcepts: string[];
  conceptIds?: string[];
  isGenerated?: boolean;
  sourceGoal?: string;
  sourceUrl?: string;
  order: number;
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  parentFrameId?: string;
  chapterId?: string;
  type: "frame" | "chapter" | "module";
  createdAt: string;
  updatedAt: string;
  learningPhase?: LearningPhase;
  checkpointQuiz?: FrameQuiz;
  quizHistory?: QuizAttempt[];
  masteryState?: FrameMasteryState;
  masteryScore?: number;
  remediationParentId?: string;
  attachment?: {
    id: string;
    type: string; // DYNAMIC: Support any attachment type (video, pdf, text, audio, AR, VR, etc.)
    data: Record<string, any>; // DYNAMIC: Support any properties without hardcoding
  };
  notes?: string;
  documents?: Array<{
    name: string;
    type: string;
    size?: number;
    content?: string;
    url?: string;
  }>;
}

// Frame validation types
export interface FrameValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FrameValidationOptions {
  checkDuplicates?: boolean;
  checkRequired?: boolean;
  checkFormat?: boolean;
}

// Frame storage types
export interface FrameStorageState {
  frames: AIFrame[];
  isLoading: boolean;
  error: string | null;
  lastSaved: string | null;
}

// Frame events types
export interface FrameEventDetail {
  frameId: string;
  frame: AIFrame;
  timestamp: string;
  source?: string;
}

export interface FramesEventDetail {
  frames: AIFrame[];
  frameCount: number;
  timestamp: string;
  source?: string;
}

// Component props types
export interface FrameManagerProps {
  frames: AIFrame[];
  currentFrameIndex: number;
  onFrameChange: (frame: AIFrame) => void;
  onFramesUpdate: (frames: AIFrame[]) => void;
  isLoading?: boolean;
  error?: string | null;
}

export interface FrameControlsProps {
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  frameCount: number;
  onSave: () => Promise<boolean>;
  onLoad: () => Promise<boolean>;
  onExport: (format: "json" | "csv") => boolean;
  onClear: () => void;
}

export interface FrameNavigationProps {
  frames: AIFrame[];
  currentFrameIndex: number;
  onFrameIndexChange: (index: number) => void;
  isCreationMode: boolean;
  onCreateFrame?: () => void;
  className?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  color?: string;
  order: number;
  frameIds: string[];
  conceptIds: string[];
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  createdAt: string;
  updatedAt: string;
  isCollapsed?: boolean;
  linkSequentially?: boolean;
}

// Graph integration types
export interface GraphState {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: any;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type?: string;
  }>;
  selectedNodeId?: string | null;
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
}

// Default values
export const DEFAULT_FRAME: Partial<AIFrame> = {
  title: "",
  goal: "",
  informationText: "",
  videoUrl: "",
  startTime: 0,
  duration: 0,
  afterVideoText: "",
  aiConcepts: [],
  conceptIds: [],
  type: "frame",
  order: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  learningPhase: "overview",
  masteryState: "ready",
};
