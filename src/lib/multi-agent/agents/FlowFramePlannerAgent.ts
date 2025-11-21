import { BaseAgent } from "../interfaces/Agent";
import type { ResearchContext } from "../interfaces/Context";
import type { LLMFunction } from "../core/Orchestrator";
import type { AgentProgressCallback } from "../interfaces/AgentProgress";
import { parseJsonWithResilience } from "@/components/DeepResearch/hooks/responseCompletion";

interface PlannerResponse {
  summary: string;
  learningMode: "bootstrapped_stepwise" | "freeform";
  chapters?: Array<{
    id: string;
    title: string;
    description: string;
    color: string;
    frameIds: string[];
    order: number;
    linkSequentially: boolean;
  }>;
  frames: Array<{
    id: string;
    title: string;
    goal: string;
    phase: "overview" | "fundamentals" | "deep-dive" | "remediation";
    chapterId?: string;
    requiresVision?: boolean;
    aiConcepts?: string[];
    checkpoints?: string[];
  }>;
}

export class FlowFramePlannerAgent extends BaseAgent {
  readonly name = "FlowFramePlanner";
  readonly description =
    "Plans a multi-phase learning flow with chapters for AI Frames, producing structured frame and chapter blueprints with colors.";

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
    const timestamp = Date.now();
    const chapterColors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4"];

    const prompt = `
You are an AI learning architect building a bootstrapped learning flow. Plan frames that progress from a high-level overview into fundamentals and finally deep-dive mastery. Group frames into pedagogically meaningful chapters with distinct colors. Return STRICT JSON only.

USER GOAL:
${context.query}

KNOWLEDGE BASE EXCERPTS (truncated):
${kbSummary}

REQUIREMENTS:
- Phases must progress: overview → fundamentals → deep-dive (add remediation if you anticipate confusion).
- Produce 4-8 frames unless the subject truly requires more.
- Group every 2-3 related frames into a chapter with a descriptive title and color.
- Use these chapter colors in order: ${chapterColors.join(", ")}
- For each frame include: id, title, goal, phase, chapterId, requiresVision (boolean), aiConcepts[], checkpoints[].
- For each chapter include: id, title, description, color, frameIds[], order, linkSequentially (true for sequential learning).
- Summary should explain the overall learning story.
- learningMode is always "bootstrapped_stepwise" unless user explicitly asks for freeform exploration.

JSON SHAPE:
{
  "summary": "Overall learning story...",
  "learningMode": "bootstrapped_stepwise",
  "chapters": [
    {
      "id": "chapter_${timestamp}_1",
      "title": "Introduction & Core Concepts",
      "description": "What this chapter covers",
      "color": "#3B82F6",
      "frameIds": ["frame_plan_1", "frame_plan_2"],
      "order": 0,
      "linkSequentially": true
    }
  ],
  "frames": [
    {
      "id": "frame_plan_1",
      "title": "...",
      "goal": "...",
      "phase": "overview",
      "chapterId": "chapter_${timestamp}_1",
      "requiresVision": false,
      "aiConcepts": ["..."],
      "checkpoints": ["Short question..."]
    }
  ]
}
`.trim();

    const response = await this.llm(prompt);
    let parsed: PlannerResponse | null = null;
    
    try {
      parsed = parseJsonWithResilience(response) as PlannerResponse;
    } catch (error) {
      console.warn(
        "FlowFramePlannerAgent: Initial JSON parse failed, attempting fallback",
        {
          error,
          responseLength: response.length,
          responsePreview: response.substring(0, 300)
        }
      );
      
      // Create minimal fallback plan from prompt
      parsed = this.createFallbackPlan(prompt, response);
    }

    if (!parsed?.frames?.length) {
      console.warn(
        "FlowFramePlannerAgent: No frames in parsed response, creating emergency fallback"
      );
      parsed = this.createFallbackPlan(prompt, response);
    }
    
    if (!parsed?.frames?.length) {
      throw new Error("FlowFramePlannerAgent failed to produce any frames even with fallback.");
    }

    context.flowBuilder = context.flowBuilder || {};
    context.flowBuilder.plan = {
      summary: parsed.summary,
      learningMode: parsed.learningMode || "bootstrapped_stepwise",
      chapters: parsed.chapters || [],
      frames: parsed.frames,
    };

    context.sharedKnowledge.agentFindings.FlowFramePlanner = {
      summary: parsed.summary,
      frameCount: parsed.frames.length,
      chapterCount: parsed.chapters?.length || 0,
      plan: parsed.frames,
      chapters: parsed.chapters || [],
      timestamp: Date.now(),
    };

    const chapterInfo = parsed.chapters?.length ? ` in ${parsed.chapters.length} chapters` : "";
    this.setReasoning(
      `Planned ${parsed.frames.length} frames${chapterInfo} (${parsed.learningMode})`
    );

    await this.progressCallback?.onAgentProgress(
      this.name,
      100,
      `Planned ${parsed.frames.length} frames${chapterInfo}`
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

  /**
   * Creates a minimal fallback plan when LLM parsing fails
   */
  private createFallbackPlan(prompt: string, llmResponse: string): PlannerResponse {
    const timestamp = Date.now();
    const chapterId = `chapter_${timestamp}_fallback`;
    const frameId = `frame_${timestamp}_fallback`;
    
    console.warn("⚠️ FlowFramePlannerAgent: Creating emergency fallback plan");
    
    // Try to extract any useful info from the malformed response
    let extractedTitle = "Learning Topic";
    let extractedGoal = prompt.slice(0, 300);
    
    // Simple regex extraction attempts
    const titleMatch = llmResponse.match(/"title"\s*:\s*"([^"]{10,100})"/);
    if (titleMatch) {
      extractedTitle = titleMatch[1];
    }
    
    const goalMatch = llmResponse.match(/"goal"\s*:\s*"([^"]{20,500})"/);
    if (goalMatch) {
      extractedGoal = goalMatch[1];
    }

    return {
      summary: `Fallback plan created for: ${prompt.slice(0, 100)}`,
      learningMode: "freeform",
      chapters: [
        {
          id: chapterId,
          title: extractedTitle,
          description: "This chapter was created as a fallback due to a parsing error",
          color: "#6B7280",
          frameIds: [frameId],
          order: 0,
          linkSequentially: true
        }
      ],
      frames: [
        {
          id: frameId,
          title: extractedTitle,
          goal: extractedGoal,
          phase: "overview",
          chapterId: chapterId,
          requiresVision: false,
          aiConcepts: [],
          checkpoints: []
        }
      ]
    };
  }
}
