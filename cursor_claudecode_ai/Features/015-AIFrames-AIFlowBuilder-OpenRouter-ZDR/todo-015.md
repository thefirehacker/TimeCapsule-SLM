# TODO — Feature 015: AI Flow Builder via OpenRouter (ZDR)

- Add model router with defaults: x-ai/grok-4-fast, anthropic/claude-sonnet-4.5, google/gemini-2.5-flash; backup openai/gpt-5-mini
- Add vision/text-only toggle; enforce compatible payloads per mode
- Define planner JSON schema mapping to `AIFrame`/chapter minimal fields
- Draft prompts for Planner, Generator, Vision with grounding/citation rules
- Implement KB retrieval wrapper (top-k, token limits, citation packaging)
- Implement AI Build Flow action (returns plan-only, editable drafts)
- Implement Generate Frame Content action (per-frame, streaming, grounded)
- Add suggestions UI: distinct color for AI drafts; accept/decline individually or in bulk
- Allow editing/updating existing frames and previously AI-built frames across turns
- Add API key management UI (OpenRouter, Firecrawl) near Knowledge Base card
- Implement Connect/Disconnect AI toggles with key validation
- Provider selection UI: OpenRouter (default), Ollama (fallback)
- Add cost controls (defaults per route, user overrides, caps)
- Privacy guardrail (ZDR enforced; redact sensitive fields pre-send)
- Telemetry: token/latency per action for routing decisions
- Add checkpoint quiz generation per frame with mastery gating
- Add remediation path generation on incorrect answers (simpler frames + retry)
- Persist quiz history and progress; implement pause/resume sessions
- Add progress metrics (mastery %, frames completed) and lightweight analytics


