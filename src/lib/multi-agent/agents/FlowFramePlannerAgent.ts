import { BaseAgent } from "../interfaces/Agent";
import type { ResearchContext } from "../interfaces/Context";
import type { LLMFunction } from "../core/Orchestrator";
import type { AgentProgressCallback } from "../interfaces/AgentProgress";
import { parseJsonWithResilience } from "@/components/DeepResearch/hooks/responseCompletion";

interface PlannerResponse {
  summary: string;
  learningMode: "bootstrapped_stepwise" | "freeform";
  frames: Array<{
    id: string;
    title: string;
    goal: string;
    phase: "overview" | "fundamentals" | "deep-dive" | "remediation";
    requiresVision?: boolean;
    aiConcepts?: string[];
    checkpoints?: string[];
  }>;
}

export class FlowFramePlannerAgent extends BaseAgent {
  readonly name = "FlowFramePlanner";
  readonly description =
    "Plans a multi-phase learning flow (overview → fundamentals → deep dive) for AI Frames, producing structured frame blueprints.";

  private llm: LLMFunction;

  constructor(llm: LLMFunction, progressCallback?: AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }

  async process(context: ResearchContext): Promise<ResearchContext> {
    await this.progressCallback?.onAgentProgress(
      this.name,
      5,
      "Analyzing knowledge base excerpts"
    );

    const kbSummary = this.buildKnowledgeSummary(context);

    const prompt = `
You are an AI learning architect building a bootstrapped learning flow. Plan frames that progress from a high-level overview into fundamentals and finally deep-dive mastery. Each frame must have a clear goal, learning phase, suggested AI concepts, and checkpoint hints (questions to verify understanding later). Return STRICT JSON only.

USER GOAL:
${context.query}

KNOWLEDGE BASE EXCERPTS (truncated):
${kbSummary}

REQUIREMENTS:
- Phases must progress: overview → fundamentals → deep-dive (add remediation if you anticipate confusion).
- Produce 4-8 frames unless the subject truly requires more.
- For each frame include: id, title, goal, phase, requiresVision (boolean), aiConcepts[], checkpoints[].
- Summary should explain the overall learning story.
- learningMode is always "bootstrapped_stepwise" unless user explicitly asks for freeform exploration.

JSON SHAPE:
{
  "summary": "...",
  "learningMode": "bootstrapped_stepwise",
  "frames": [
    {
      "id": "frame_plan_1",
      "title": "...",
      "goal": "...",
      "phase": "overview",
      "requiresVision": false,
      "aiConcepts": ["..."],
      "checkpoints": ["Short question..."]
    }
  ]
}
`.trim();

    const response = await this.llm(prompt);
    const parsed = parseJsonWithResilience<PlannerResponse>(response);

    if (!parsed?.frames?.length) {
      throw new Error("FlowFramePlannerAgent failed to produce any frames.");
    }

    context.flowBuilder = context.flowBuilder || {};
    context.flowBuilder.plan = {
      summary: parsed.summary,
      learningMode: parsed.learningMode || "bootstrapped_stepwise",
      frames: parsed.frames,
    };

    context.sharedKnowledge.agentFindings.FlowFramePlanner = {
      summary: parsed.summary,
      frameCount: parsed.frames.length,
      plan: parsed.frames,
      timestamp: Date.now(),
    };

    this.setReasoning(
      `Planned ${parsed.frames.length} frames (${parsed.learningMode})`
    );

    await this.progressCallback?.onAgentProgress(
      this.name,
      100,
      `Planned ${parsed.frames.length} frames`
    );

    return context;
  }

  private buildKnowledgeSummary(context: ResearchContext): string {
    const chunks = context.ragResults?.chunks || [];
    if (!chunks.length) {
      return "No KB excerpts available.";
    }

    const maxChunks = 5;
    return chunks
      .slice(0, maxChunks)
      .map((chunk, index) => {
        const cleanText = chunk.text
          ?.replace(/\s+/g, " ")
          .trim()
          .slice(0, 800);
        return `[EXCERPT ${index + 1}] Source: ${chunk.source}\n${cleanText}`;
      })
      .join("\n\n");
  }
}
