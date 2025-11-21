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
  // SWE-compatible fields
  type?: string;
  order?: number;
  videoUrl?: string;
  startTime?: number;
  duration?: number;
  bubblSpaceId?: string;
  timeCapsuleId?: string;
  parentFrameId?: string;
  chapterId?: string;
  notes?: string;
  documents?: any[];
  attachment?: {
    type: string;
    description: string;
    url?: string;
  };
  durationInSeconds?: number;
  summary?: string;
}

const GENERATOR_SCHEMA_DESCRIPTION = `{
  "informationText": "Detailed explanation in markdown-friendly text",
  "afterVideoText": "Reflection or practice instructions",
  "aiConcepts": ["concept1", "concept2", "concept3"],
  "type": "frame",
  "order": 1,
  "videoUrl": "",
  "startTime": 0,
  "duration": 480,
  "bubblSpaceId": "default",
  "timeCapsuleId": "default",
  "parentFrameId": "",
  "chapterId": "",
  "notes": "",
  "documents": [],
  "attachment": {
    "type": "video|image|pdf|text",
    "description": "How the learner should use it",
    "url": "https://..."
  },
  "durationInSeconds": 420,
  "summary": "One-sentence recap"
}`;

export class FlowFrameGeneratorAgent extends BaseAgent {
  readonly name = "FlowFrameGenerator";
  readonly description =
    "Expands each planned learning frame into detailed content with SWE-compatible structure.";

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
        parsed = parseJsonWithResilience(llmResponse) as GeneratorResponse;
      } catch (error) {
        console.warn(
          `FlowFrameGeneratorAgent: failed to parse generator response for frame ${framePlan.id}`,
          {
            error,
            responseLength: llmResponse.length,
            responsePreview: llmResponse.substring(0, 300),
            responseSuffix: llmResponse.substring(Math.max(0, llmResponse.length - 100))
          }
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

      // Final fallback: create minimal valid frame instead of throwing
      if (!parsed?.informationText) {
        console.warn(
          `⚠️ FlowFrameGeneratorAgent: All parsing failed for ${framePlan.id}, using fallback`,
          { responseLength: llmResponse.length }
        );
        parsed = this.createFallbackFrame(framePlan, llmResponse);
      }

      const generated: FlowGeneratedFrame = {
        ...framePlan,
        informationText: parsed.informationText,
        afterVideoText: parsed.afterVideoText || "",
        aiConcepts: parsed.aiConcepts?.length
          ? parsed.aiConcepts
          : framePlan.aiConcepts || [],
        // SWE-compatible fields with defaults
        type: "frame",
        order: index + 1,
        videoUrl: parsed.videoUrl || "",
        startTime: parsed.startTime || 0,
        duration: parsed.duration || 480,
        bubblSpaceId: parsed.bubblSpaceId || "default",
        timeCapsuleId: parsed.timeCapsuleId || "default",
        parentFrameId: parsed.parentFrameId || "",
        chapterId: parsed.chapterId || "",
        notes: parsed.notes || "",
        documents: parsed.documents || [],
        attachment: parsed.attachment,
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
You are an AI learning designer. Expand the following planned frame into rich content with SWE-compatible structure. Return STRICT JSON matching the schema provided.

FRAME PLAN:
${JSON.stringify(frame, null, 2)}

LEARNING CONTEXT:
- Overall goal: ${context.flowBuilder?.plan?.summary || context.query}
- Mode: ${context.flowBuilder?.plan?.learningMode || "bootstrapped_stepwise"}
- Knowledge base excerpts: 
${kbExcerpt}

REQUIREMENTS:
- informationText: detailed explanation (allow Markdown lists/headings, visual diagrams with ASCII art).
- afterVideoText: reflection or practice suggestions to reinforce learning.
- aiConcepts: highlight/clarify major ideas (3-6 key concepts).
- durationInSeconds: rough estimate (keep between 180 and 900 seconds).
- type: always "frame"
- order: sequential position number
- videoUrl: empty string (placeholder for future video)
- startTime: 0
- duration: 480 (default 8 minutes)
- attachment: optional supporting resource (type + description + optional URL).

Return JSON only:
{
  "informationText": "...",
  "afterVideoText": "...",
  "aiConcepts": ["..."],
  "type": "frame",
  "order": 1,
  "videoUrl": "",
  "startTime": 0,
  "duration": 480,
  "bubblSpaceId": "default",
  "timeCapsuleId": "default",
  "parentFrameId": "",
  "chapterId": "",
  "notes": "",
  "documents": [],
  "attachment": {"type": "...", "description": "...", "url": "..."},
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
      return parseJsonWithResilience(repairResponse) as GeneratorResponse;
    } catch (error) {
      console.error(
        `FlowFrameGeneratorAgent: JSON repair failed for frame ${framePlan.id}`,
        error
      );
      return null;
    }
  }

  /**
   * Creates a minimal fallback frame when all parsing attempts fail
   */
  private createFallbackFrame(
    framePlan: FlowPlannedFrame,
    llmResponse: string
  ): GeneratorResponse {
    // Try to extract informationText value from malformed JSON
    let extractedText = "";
    const infoTextMatch = llmResponse.match(/"informationText"\s*:\s*"([\s\S]*?)"/);
    if (infoTextMatch && infoTextMatch[1].length > 50) {
      extractedText = infoTextMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\t/g, '\t')
        .trim();
    }
    
    // Fallback: Use frame goal and title
    const fallbackText = extractedText || 
      `## ${framePlan.title}\n\n${framePlan.goal}\n\n*⚠️ Note: This frame's content generation encountered a parsing error. The system has created placeholder content based on the frame's goal. Please regenerate this frame for complete content.*`;

    return {
      informationText: fallbackText,
      afterVideoText: "",
      aiConcepts: framePlan.aiConcepts || [],
      attachment: undefined,
    };
  }
}
