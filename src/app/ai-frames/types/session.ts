/**
 * Session Management Types for Unified Flow Builder
 * Supports AI Flow, SWE Bridge, and Manual frame creation workflows
 */

import type { PlannerPlan } from "../hooks/useAIFlowBuilder";
import type { FrameDraft as BaseFrameDraft } from "../hooks/useAIFlowBuilder";
import type { GraphState } from "./frames";

// Session source tracking
export type SessionSource = "ai-flow" | "swe-bridge" | "manual";

// Session lifecycle status
export type SessionStatus = "active" | "completed" | "generating" | "draft";

// Extended FrameDraft with source tracking
export interface FrameDraft extends Omit<BaseFrameDraft, "source"> {
  source: SessionSource; // Track individual frame origin
}

// Learning session state (from useAIFlowBuilder)
export interface LearningSessionState {
  id: string;
  mode: "bootstrapped_stepwise" | "freeform";
  prompt: string;
  createdAt: string;
  updatedAt: string;
  currentFrameId: string | null;
  unlockedFrameIds: string[];
  completedFrameIds: string[];
  quizHistory: Record<string, any[]>;
  remediationMap: Record<string, string[]>;
  masteryPercent: number;
  totalFrames: number;
}

// Main session container
export interface FlowSession {
  id: string;
  name: string; // User-editable session name
  source: SessionSource; // How session was initially created
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  frameCount: number;
  acceptedFrameCount: number;
  
  // TimeCapsule isolation
  timeCapsuleId: string; // Link to parent TimeCapsule
  frameIds: string[]; // Track associated accepted frames

  // Full session state
  plan: PlannerPlan | null;
  frameDrafts: FrameDraft[];
  sessionState: LearningSessionState;
  
  // Graph state (nodes, edges, positions)
  graphState?: GraphState; // Optional for backward compatibility

  // Mixed-source tracking
  frameSources: {
    manual: number;
    "ai-flow": number;
    "swe-bridge": number;
  };
}

// For KB storage
export interface SessionDocument {
  id: string;
  type: "session";
  session: FlowSession;
  searchableText: string; // For KB indexing: session name + frame titles
}

