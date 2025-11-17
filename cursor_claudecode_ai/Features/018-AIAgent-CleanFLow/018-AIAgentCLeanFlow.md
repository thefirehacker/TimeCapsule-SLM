# Todo List 

## Blocking Fixes
- [ ] Investigate and resolve the “Maximum update depth exceeded” loop triggered by the Frame Generation dialog (runs immediately after synthesis). Ensure the dialog only sets state once per orchestration run.

## In Progress
- [ ] Harden DataInspector for large-context models (adaptive windowing, timeout guards, structured output validation).
- [ ] Enforce PatternGenerator → Extraction sequencing (block downstream agents until patterns exist; surface a clear “plan-aware sequencing violation” recovery path).

## Next
- [ ] Redesign SynthesisCoordinator for AI Frames (generate frame trees + lesson plans instead of essays).
- [ ] Verify OpenRouter/Firecrawl credential handshakes in the provider UI (don’t mark “Connected” until the credentials are validated).

# Description
Clean up the agent pipeline so large OpenRouter models (Grok, Sonnet) can run the full AI Frames flow without tripping sequencing errors. Track work items for DataInspector throughput, PatternGenerator enforcement, and the upcoming SynthesisCoordinator template overhaul. The TODO list above is the canonical tracking surface for this feature.*** End Patch
