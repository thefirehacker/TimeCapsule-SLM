const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const inferReferer = () =>
  process.env.NEXT_PUBLIC_SITE_URL || "https://timecapsule.bubblspace.com";

export const getServerOpenRouterKey = (): string | null =>
  process.env.OPEN_ROUTER_API_KEY || null;

const buildHeaders = (apiKey: string) => ({
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
  Accept: "application/json",
  "HTTP-Referer": inferReferer(),
  "X-Title": "TimeCapsule AI Frames",
});

export const fetchManagedModels = async () => {
  const key = getServerOpenRouterKey();
  if (!key) {
    throw new Error("Managed OpenRouter key is not configured");
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/models`, {
    method: "GET",
    headers: buildHeaders(key),
    cache: "no-cache",
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      payload?.error?.message ||
        payload?.message ||
        `OpenRouter models request failed (${response.status})`
    );
  }

  const data = await response.json();
  return Array.isArray(data?.data) ? data.data : [];
};

export interface ManagedChatPayload {
  model: string;
  messages: any[];
  zdr?: boolean;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  response_format?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export const postManagedChat = async (payload: ManagedChatPayload) => {
  const key = getServerOpenRouterKey();
  if (!key) {
    throw new Error("Managed OpenRouter key is not configured");
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(key),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(
      errorPayload?.error?.message ||
        errorPayload?.message ||
        `OpenRouter chat request failed (${response.status})`
    );
  }

  return response.json();
};

