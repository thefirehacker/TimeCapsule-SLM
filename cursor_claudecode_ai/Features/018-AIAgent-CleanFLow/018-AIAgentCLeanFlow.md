# Todo List 

## Blocking Fixes
- [ ] Investigate and resolve the “Maximum update depth exceeded” loop triggered by the Frame Generation dialog (runs immediately after synthesis). Ensure the dialog only sets state once per orchestration run.
- [ ] Expose Knowledge Base tools to the SWE bridge so Cursor can pull RAG and pattern-search snippets before POSTing updated `/api/local/aiframes/state`. Build two local-only endpoints (`/api/local/aiframes/kb/rag`, `/api/local/aiframes/kb/pattern`) and update the prompt contract to tell SWE to use them.
- [ ] Add a deterministic state machine for the AI Build orchestrator. Lock the agent order (Discover/DataInspector → PatternGenerator → Extraction → Synthesis → Response) and validate each stage before the next tool can run. If a stage fails validation, surface a recovery prompt instead of letting the pipeline continue.
- [ ] Give DataInspector budget-aware chunking and a strict JSON schema so it reliably produces the seed snippets for PatternGenerator (short windows, timeouts, retries, cached classifications).

## In Progress
- [ ] Harden DataInspector for large-context models (adaptive windowing, timeout guards, structured output validation).
- [ ] Enforce PatternGenerator → Extraction sequencing (block downstream agents until patterns exist; surface a clear “plan-aware sequencing violation” recovery path).

## Next
- [ ] Redesign SynthesisCoordinator for AI Frames (generate frame trees + lesson plans instead of essays).
- [ ] Rewrite PatternGenerator prompts to emit structured “frame-ready” patterns (learning goal, citations, attachment candidates).
- [ ] Teach SynthesisCoordinator to output the same JSON structure the SWE bridge produces (frames, documents, graph edges) so both paths stay in sync.
- [ ] Verify OpenRouter/Firecrawl credential handshakes in the provider UI (don’t mark “Connected” until the credentials are validated).

# Description
Clean up the agent pipeline so large OpenRouter models (Grok, Sonnet) can run the full AI Frames flow without tripping sequencing errors. Track work items for DataInspector throughput, PatternGenerator enforcement, and the upcoming SynthesisCoordinator template overhaul. The TODO list above is the canonical tracking surface for this feature.*** End Patch
