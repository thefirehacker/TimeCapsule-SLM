import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getServerOpenRouterKey,
  postManagedChat,
} from "@/lib/timecapsule/openRouterServer";
import {
  consumeCredit,
  verifyCreditAvailability,
} from "@/lib/timecapsule/credits";

const normalizeContent = (content: any): string => {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (!part) return "";
        if (typeof part === "string") return part;
        if (part.type === "text") return part.text || "";
        return "";
      })
      .join("");
  }
  if (content?.text) return content.text;
  return "";
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!getServerOpenRouterKey()) {
      return NextResponse.json(
        { error: "Managed OpenRouter key is not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      messages,
      modelId,
      temperature,
      maxTokens,
      topP,
      frequencyPenalty,
      presencePenalty,
      responseFormat,
      metadata,
    } = body || {};

    if (!Array.isArray(messages) || !messages.length) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const model = modelId || "gpt-4.1";

    await verifyCreditAvailability(session.userId, "agentCalls", 1);

    const payload: Record<string, unknown> = {
      messages,
      model,
      zdr: true,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
    };

    if (responseFormat) {
      payload.response_format = responseFormat;
    }
    if (metadata) {
      payload.metadata = { ...metadata, managedProvider: true };
    }

    const data = await postManagedChat(payload as any);
    const choice = data?.choices?.[0];
    const message = choice?.message ?? null;
    const content = normalizeContent(message?.content);
    const usage = data?.usage;

    await consumeCredit(session.userId, "agentCalls", 1, {
      tokensUsed: usage?.total_tokens ?? 0,
      model,
    });

    return NextResponse.json({
      id: data?.id ?? `openrouter_${Date.now()}`,
      model: data?.model ?? model,
      content,
      message,
      usage,
      raw: data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "OpenRouter proxy failed";
    const status =
      (error as { code?: string }).code === "CREDIT_LIMIT_REACHED"
        ? 402
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

