## Feature 016 — Branding + Messaging: “AI Frames bootstraps learning”

Goal
- Update top-level messaging (README and homepage hero copy) to clearly position AI Frames as an AI-bootstrapped learning system that connects everything into one flow: data, ideas, video, notes, docs, PDFs.
- No code changes yet. This issue captures proposed copy and the exact edit targets for approval.

Proposed copy (for approval)
- README top summary (first paragraph):
  - “AI Frames bootstraps learning. It connects everything in one flow — data, ideas, video, notes, docs, PDFs — so you can go from prompt to structured learning paths instantly. Grounded by your Knowledge Base, AI builds and updates frames step‑by‑step with citations, quizzes, and mastery checks.”

- README value bullets (under the summary):
  - “Connect everything in one flow: video, PDFs, notes, and more”
  - “Prompt → AI builds frames, chapters, and attachments”
  - “Grounded by your KB (local-first VectorStore) with citations”
  - “Vision or text-only modes; OpenRouter-first with Ollama fallback”
  - “Accept/decline AI suggestions, iterate across turns”
  - “Checkpoint quizzes, remediation, and pause/resume”

- Homepage hero (H1 + subheading):
  - H1: “AI Frames bootstraps learning”
  - Subheading: “Connect data, ideas, video, notes, docs, and PDFs into one seamless flow. Prompt once — AI builds and updates your frames with citations and mastery checks.”
  - CTA buttons:
    - “Connect AI”
    - “Build with AI”
  - Small note below CTAs: “Vision or text-only. OpenRouter by default; Ollama optional.”

Edit targets (no changes yet)
- `README.md` — replace the first paragraph with the approved summary, add the five value bullets near the top under a short “Why AI Frames” section.
- `src/app/page.tsx` — update hero heading/subheading/CTAs as above; keep design and layout unchanged.

Constraints
- Keep language concise, high-signal, and user-facing.
- Do not add technical setup instructions to the hero. Those remain in docs/onboarding.
- Preserve dark-mode visuals; avoid adding new assets at this stage.

Acceptance criteria
- README and homepage display the approved copy verbatim.
- No layout regressions or changes to navigation.
- Copy reflects AI-bootstrapped learning, one-flow message, KB grounding, and model options.

Open questions
- Do you want an additional tagline on the AI Frames page itself (e.g., a dismissible info banner) repeating the hero sentence?
- Preferred CTA ordering: “Connect AI” vs “Build with AI” first?


