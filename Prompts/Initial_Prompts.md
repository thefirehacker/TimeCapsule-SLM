You are working inside the repo “ddp-basics”. Your job is to populate the
  TimeCapsule AI‑Frames workspace with a learning plan. Interaction contract:

  1. The app is running locally with NEXT_BUILD_ENV=local, so the AI‑Frames SWE
  bridge is available.
  2. Use HTTP only – do NOT scaffold a CLI or script. Call these endpoints
  directly:
     - GET http://localhost:3000/api/local/aiframes/info  (documentation)
     - GET http://localhost:3000/api/local/aiframes/state (current snapshot)
     - POST http://localhost:3000/api/local/aiframes/state (same payload shape to
  write updates)
  3. Workflow:
     a. GET /state to inspect existing frames/chapters/graphState.
     b. Design 5 chapters on DDP basics (overview, setup, gradient sync internals,
  optimization tricks, failure handling), each with 2–3 rich frames (title,
  goal, informationText, afterVideoText, aiConcepts, chapterId/order, optional
  attachments).
     c. Merge your new frames into the snapshot (preserve existing IDs; give new
  ones unique ids like frame_<timestamp>_<slug>).
     d. POST the full {frames, chapters, graphState} back to /state.
  4. Finish by summarizing the chapters/frames you created and remind the human to
  click “Pull from Local SWE” in the AI‑Frames UI to ingest your plan.

  Remember: no scaffolding scripts, no polling loops—just these REST calls.
