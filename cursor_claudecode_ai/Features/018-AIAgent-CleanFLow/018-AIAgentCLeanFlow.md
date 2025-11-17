# Todo List 

## Part A – Frame Creation Stability
- [ ] Fix the “Maximum update depth exceeded” loop in the Frame Creation modal that appears right after synthesis: the dialog currently reinitializes form state while `showChapterProcessing` is toggling, so React keeps re-rendering `DialogPrimitive.Overlay`. We need to make this modal idempotent (set state once when new frames arrive, never inside render).

## Part B – Planner & Flow Agents
- [ ] Rewrite the Flow Planner pipeline to produce SWE-quality frame JSON (phase-aware chapters, attachment metadata, graph edges).
- [ ] Harden the orchestrator state machine (DataInspector → PatternGenerator → Extraction → Synthesis → Response) so stages cannot be skipped.
- [ ] Give DataInspector budget-aware chunking + strict schemas so PatternGenerator receives clean seed snippets.
- [ ] Rewrite PatternGenerator prompts for “frame-ready” output (learning goals, citations, attachment candidates).
- [ ] Redesign SynthesisCoordinator to emit the same structured frames the SWE bridge produces.

# Description
Clean up the agent pipeline so large OpenRouter models (Grok, Sonnet) can run the full AI Frames flow without tripping sequencing errors. Track work items for DataInspector throughput, PatternGenerator enforcement, and the upcoming SynthesisCoordinator template overhaul. The TODO list above is the canonical tracking surface for this feature.*** End Patch
