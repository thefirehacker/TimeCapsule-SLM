## SWE-Like Agents TODO (Issue 021)

### ✅ Completed
- ~~Implement micro-session orchestration in `Orchestrator` so pattern/regex/semantic agents can iterate up to their per-session limits while keeping global caps.~~
- ~~Add loop guards + completion checks (max 30 iterations, consecutive-agent throttling, pipeline completion detection).~~
- ~~Update `021-SWELikeAgents.md` with implementation status/history.~~

### 🔄 In Progress
- Wire success signals from each agent (PatternGenerator → Extractor → SynthesisCoordinator) so micro-sessions auto-advance only when real outputs are produced, and expose these markers in context for observability.

### ▶️ Next Up
- Optimize DataInspector + extraction costs (fast-path for single-doc runs, shared LLM responses) to push total tool calls toward the 20–30 Cursor benchmark.
