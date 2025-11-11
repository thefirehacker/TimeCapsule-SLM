export type AIFlowModelTier = "planner" | "generator" | "vision" | "fallback";

export interface OpenRouterModelOption {
  id: string;
  label: string;
  provider: string;
  tier: AIFlowModelTier;
  description: string;
  cost: "premium" | "standard" | "economy";
  supportsVision?: boolean;
  supportsJSON?: boolean;
  supportsStreaming?: boolean;
  recommendedFor: string[];
  defaultTemperature?: number;
  maxOutputTokens?: number;
  zdrCompliant?: boolean;
  notes?: string;
}

type ModelRouter = Record<AIFlowModelTier, OpenRouterModelOption[]>;

const MODEL_ROUTER: ModelRouter = {
  planner: [
    {
      id: "anthropic/claude-sonnet-4.5",
      label: "Claude Sonnet 4.5",
      provider: "Anthropic",
      tier: "planner",
      description:
        "High-reasoning planner with excellent JSON adherence and grounded citations.",
      cost: "premium",
      supportsVision: true,
      supportsJSON: true,
      supportsStreaming: true,
      recommendedFor: ["flow-planning", "chapter synthesis", "citation audits"],
      defaultTemperature: 0.2,
      maxOutputTokens: 4000,
      zdrCompliant: true,
      notes: "Preferred planner for multi-step flows and safety-critical plans.",
    },
    {
      id: "openai/gpt-5-mini",
      label: "GPT-5 Mini",
      provider: "OpenAI",
      tier: "planner",
      description:
        "Balanced fallback planner with good structure at lower cost.",
      cost: "standard",
      supportsJSON: true,
      supportsStreaming: true,
      recommendedFor: ["fallback planning", "fast iterations"],
      defaultTemperature: 0.25,
      maxOutputTokens: 3000,
      zdrCompliant: true,
    },
  ],
  generator: [
    {
      id: "x-ai/grok-4-fast",
      label: "Grok 4 Fast",
      provider: "xAI",
      tier: "generator",
      description:
        "Fast reasoning model ideal for iterative frame content generation.",
      cost: "standard",
      supportsJSON: false,
      supportsStreaming: true,
      recommendedFor: ["frame drafting", "concept expansion", "speed-critical"],
      defaultTemperature: 0.35,
      maxOutputTokens: 2500,
      zdrCompliant: true,
    },
    {
      id: "openai/gpt-5-mini",
      label: "GPT-5 Mini",
      provider: "OpenAI",
      tier: "generator",
      description: "Cost-efficient generator with strong language quality.",
      cost: "standard",
      supportsJSON: true,
      supportsStreaming: true,
      recommendedFor: ["fallback generation", "JSON outputs"],
      defaultTemperature: 0.4,
      maxOutputTokens: 2000,
      zdrCompliant: true,
    },
  ],
  vision: [
    {
      id: "google/gemini-2.5-flash",
      label: "Gemini 2.5 Flash",
      provider: "Google",
      tier: "vision",
      description:
        "Low-latency multimodal model for PDF snapshots, diagrams, and figures.",
      cost: "standard",
      supportsVision: true,
      supportsJSON: true,
      supportsStreaming: true,
      recommendedFor: ["attachment summaries", "diagram grounding"],
      defaultTemperature: 0.25,
      maxOutputTokens: 1800,
      zdrCompliant: true,
    },
    {
      id: "anthropic/claude-sonnet-4.5",
      label: "Claude Sonnet 4.5 (Vision)",
      provider: "Anthropic",
      tier: "vision",
      description:
        "Vision-capable planner usable when Gemini is unavailable or for higher reasoning.",
      cost: "premium",
      supportsVision: true,
      supportsJSON: true,
      supportsStreaming: true,
      recommendedFor: ["vision planning", "high-accuracy multimodal tasks"],
      defaultTemperature: 0.2,
      maxOutputTokens: 3500,
      zdrCompliant: true,
    },
  ],
  fallback: [
    {
      id: "openai/gpt-5-mini",
      label: "GPT-5 Mini (Fallback)",
      provider: "OpenAI",
      tier: "fallback",
      description:
        "Universal fallback when specialized tiers are unavailable or disconnected.",
      cost: "standard",
      supportsJSON: true,
      supportsStreaming: true,
      recommendedFor: ["failsafe routing", "budget control"],
      defaultTemperature: 0.3,
      maxOutputTokens: 2000,
      zdrCompliant: true,
    },
  ],
};

export const DEFAULT_MODEL_SELECTIONS: Record<
  AIFlowModelTier,
  string
> = Object.fromEntries(
  (Object.keys(MODEL_ROUTER) as AIFlowModelTier[]).map((tier) => [
    tier,
    MODEL_ROUTER[tier][0]?.id ?? "",
  ])
) as Record<AIFlowModelTier, string>;

export function getModelsForTier(
  tier: AIFlowModelTier
): OpenRouterModelOption[] {
  return MODEL_ROUTER[tier] || [];
}

export function getDefaultModelForTier(
  tier: AIFlowModelTier
): OpenRouterModelOption | undefined {
  const models = getModelsForTier(tier);
  return models[0];
}

export function findModelOptionById(
  id: string
): OpenRouterModelOption | undefined {
  return (Object.keys(MODEL_ROUTER) as AIFlowModelTier[]).reduce<
    OpenRouterModelOption | undefined
  >((found, tier) => {
    if (found) return found;
    return MODEL_ROUTER[tier].find((option) => option.id === id);
  }, undefined);
}

export function getModelRouterSummary() {
  return (Object.keys(MODEL_ROUTER) as AIFlowModelTier[]).map((tier) => ({
    tier,
    defaultModel: getDefaultModelForTier(tier)?.label ?? "Not configured",
    options: MODEL_ROUTER[tier].map((option) => ({
      id: option.id,
      label: option.label,
      provider: option.provider,
      cost: option.cost,
      supportsVision: option.supportsVision ?? false,
      supportsJSON: option.supportsJSON ?? false,
    })),
  }));
}
