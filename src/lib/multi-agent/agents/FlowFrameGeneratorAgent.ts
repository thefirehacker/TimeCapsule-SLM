import { BaseAgent } from "../interfaces/Agent";
import type {
  ResearchContext,
  FlowGeneratedFrame,
  FlowPlannedFrame,
} from "../interfaces/Context";
import type { LLMFunction } from "../core/Orchestrator";
import type { AgentProgressCallback } from "../interfaces/AgentProgress";
import { parseJsonWithResilience } from "@/components/DeepResearch/hooks/responseCompletion";

interface GeneratorResponse {
  informationText: string;
  afterVideoText: string;
  aiConcepts: string[];
  attachment?: {
    type: string;
    description: string;
    url?: string;
  };
  checkpointQuiz?: {
    id: string;
    instructions: string;
    questions: Array<{
      id: string;
      prompt: string;
      type: "single_choice" | "multi_choice" | "short_answer";
      choices?: Array<{ id: string; label: string; isCorrect?: boolean }>;
      correctAnswers: string[];
      explanation?: string;
    }>;
  };
  durationInSeconds?: number;
  summary?: string;
}

const GENERATOR_SCHEMA_DESCRIPTION = `{
  "informationText": "Detailed explanation in markdown-friendly text",
  "afterVideoText": "Reflection or practice instructions",
  "aiConcepts": ["concept"],
  "attachment": {
    "type": "video|image|pdf|text",
    "description": "How the learner should use it",
    "url": "https://..."
  },
  "checkpointQuiz": {
    "id": "frame_quiz",
    "instructions": "How to answer",
    "questions": [
      {
        "id": "q1",
        "prompt": "Question stem",
        "type": "single_choice|multi_choice|short_answer",
        "choices": [{"id": "A","label": "Option","isCorrect": true}],
        "correctAnswers": ["A"],
        "explanation": "Why it is correct"
      }
    ]
  },
  "durationInSeconds": 420,
  "summary": "One-sentence recap"
}`;

export class FlowFrameGeneratorAgent extends BaseAgent {
  readonly name = "FlowFrameGenerator";
  readonly description =
    "Expands each planned learning frame into detailed content, after-video prompts, and checkpoint quizzes.";

  private llm: LLMFunction;

  constructor(llm: LLMFunction, progressCallback?: AgentProgressCallback) {
    super();
    this.llm = llm;
    this.progressCallback = progressCallback;
  }

  async process(context: ResearchContext): Promise<ResearchContext> {
    const plan = context.flowBuilder?.plan;
    if (!plan || !plan.frames?.length) {
      console.warn("FlowFrameGeneratorAgent: no plan available, skipping.");
      return context;
    }

    await this.progressCallback?.onAgentProgress(
      this.name,
      5,
      "Expanding planned frames"
    );

    const result: FlowGeneratedFrame[] = [];
    const total = plan.frames.length;

    for (let index = 0; index < plan.frames.length; index++) {
      const framePlan = plan.frames[index];
      const progress = Math.min(
        95,
        Math.round(((index + 1) / total) * 90) + 5
      );

      const prompt = this.buildFramePrompt(context, framePlan);
      const llmResponse = await this.llm(prompt, {
        tierHint: "generator",
      });

      let parsed: GeneratorResponse | null = null;
      try {
        parsed = parseJsonWithResilience<GeneratorResponse>(llmResponse);
      } catch (error) {
        console.warn(
          `FlowFrameGeneratorAgent: failed to parse generator response for frame ${framePlan.id}`,
          error
        );
      }

      if (!parsed?.informationText) {
        await this.progressCallback?.onAgentProgress(
          this.name,
          Math.min(progress + 2, 98),
          `Reformatting structured output for "${framePlan.title}"`
        );
        parsed = await this.repairFrameResponse(framePlan, llmResponse);
      }

      if (!parsed?.informationText) {
        throw new Error(
          `FlowFrameGeneratorAgent failed to generate content for frame ${framePlan.id}`
        );
      }

      const generated: FlowGeneratedFrame = {
        ...framePlan,
        informationText: parsed.informationText,
        afterVideoText: parsed.afterVideoText || "",
        aiConcepts: parsed.aiConcepts?.length
          ? parsed.aiConcepts
          : framePlan.aiConcepts || [],
        attachment: parsed.attachment,
        checkpointQuiz: parsed.checkpointQuiz,
        durationInSeconds: parsed.durationInSeconds,
        summary: parsed.summary,
      };
      result.push(generated);

      await this.progressCallback?.onAgentProgress(
        this.name,
        progress,
        `Generated frame "${framePlan.title}"`
      );
    }

    context.flowBuilder = context.flowBuilder || {};
    context.flowBuilder.generatedFrames = result;
    context.sharedKnowledge.agentFindings.FlowFrameGenerator = {
      generatedCount: result.length,
      timestamp: Date.now(),
    };

    context.synthesis.answer = `Generated ${result.length} learning frames ready for review.`;
    this.setReasoning(`Expanded ${result.length} planned frames into content.`);

    await this.progressCallback?.onAgentProgress(
      this.name,
      100,
      "Completed frame generation"
    );

    return context;
  }

  private buildFramePrompt(context: ResearchContext, frame: FlowPlannedFrame) {
    const kbExcerpt = this.collectKnowledge(context, 4);
    return `
You are an AI learning designer. Expand the following planned frame into rich content and a checkpoint quiz. Return STRICT JSON matching the schema provided.

FRAME PLAN:
${JSON.stringify(frame, null, 2)}

LEARNING CONTEXT:
- Overall goal: ${context.flowBuilder?.plan?.summary || context.query}
- Mode: ${context.flowBuilder?.plan?.learningMode || "bootstrapped_stepwise"}
- Knowledge base excerpts: 
${kbExcerpt}

REQUIREMENTS:
- informationText: detailed explanation (allow Markdown lists/headings).
- afterVideoText: reflection or practice suggestions after a video is watched.
- aiConcepts: highlight/clarify major ideas (3-6).
- durationInSeconds: rough estimate (keep between 180 and 900 seconds).
- checkpointQuiz: 1-3 thoughtful questions referencing the content; for multiple choice include choices with isCorrect flags.
- attachment: optional supporting resource (type + description + optional URL).

Return JSON only:
{
  "informationText": "...",
  "afterVideoText": "...",
  "aiConcepts": ["..."],
  "attachment": {"type": "...", "description": "...", "url": "..."},
  "checkpointQuiz": {...},
  "durationInSeconds": 420,
  "summary": "One sentence recap"
}
`.trim();
  }

  private collectKnowledge(context: ResearchContext, limit: number) {
    const chunks = context.ragResults?.chunks || [];
    if (!chunks.length) return "No KB documents found.";
    return chunks
      .slice(0, limit)
      .map((chunk, idx) => {
        const text = chunk.text?.replace(/\s+/g, " ").trim().slice(0, 600);
        return `[KB ${idx + 1}] Source: ${chunk.source}\n${text}`;
      })
      .join("\n\n");
  }

  private async repairFrameResponse(
    framePlan: FlowPlannedFrame,
    flawedResponse: string
  ): Promise<GeneratorResponse | null> {
    const repairPrompt = `
The previous attempt to generate this frame did not return valid JSON.

FRAME BLUEPRINT:
${JSON.stringify(framePlan, null, 2)}

INVALID OUTPUT:
${flawedResponse}

Reformat that answer into STRICT JSON that satisfies this schema:
${GENERATOR_SCHEMA_DESCRIPTION}

Do not include markdown fences or commentary—respond with JSON only.
`.trim();

    try {
      const repairResponse = await this.llm(repairPrompt, {
        tierHint: "generator",
        temperature: 0.2,
      });
      return parseJsonWithResilience<GeneratorResponse>(repairResponse);
    } catch (error) {
      console.error(
        `FlowFrameGeneratorAgent: JSON repair failed for frame ${framePlan.id}`,
        error
      );
      return null;
    }
  }
}
