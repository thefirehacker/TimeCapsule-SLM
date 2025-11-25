# Issue 019: TimeCapsule AI-Frames Population

## Context
- User goal: showcase AI Frames capabilities inside the TimeCapsule workspace so end users understand how to explore, learn, and apply the product.
- Constraints: interact **only** through `/api/local/aiframes/*` HTTP endpoints with `NEXT_BUILD_ENV=local`. No scripts/CLIs/polling; preserve existing IDs unless intentionally replaced.
- Deliverable: refreshed chapters + frames + graphState snapshot pushed via POST `/api/local/aiframes/state`.

## Root Cause / Need
The workspace currently lacks curated, user-focused AI Frames that demonstrate the major product flows. Without a guided structure, users cannot see how powerful AI Frames are or how to leverage them in typical workflows.

## Plan
1. **Bridge Contract Validation** – Call `GET /api/local/aiframes/info` to confirm the available schema, environment, and capabilities for the local AI Frames bridge.
2. **Inventory Current State** – Call `GET /api/local/aiframes/state` to capture the existing chapters, frames, and `graphState`, making note of IDs that must be preserved unless we intentionally replace them.
3. **Experience Design** – Based on repository artifacts (README, VectorStore UI, existing features) draft a user-centric narrative:
   - Chapter themes (e.g., Orientation, Build, Launch, Insights) with clear value propositions and color coding.
   - Frame-level storytelling (title, goal, info/after text, AI concepts, attachments) tailored to top-product-style showcases.
   - Map frames to chapters with ordered experiences.
4. **Snapshot Assembly** – Merge the designed content with the retrieved state, updating only the relevant entities, ensuring referential integrity (`frameIds`, `chapterId`, `order`) and aligning with the preserved IDs or documented replacements.
5. **State Submission** – POST the fully composed `{ frames, chapters, graphState }` payload back to `/api/local/aiframes/state`, verifying success.
6. **Validation & Handoff** – Confirm the bridge reflects the new timeline and instruct the user to “Pull from Local SWE.” Document any assumptions or remaining questions.

## Risks & Mitigations
- **Schema drift**: Mitigate by inspecting `info` endpoint before updating.
- **ID mismatches**: Carefully track existing IDs; if replacements are needed, call them out explicitly.
- **Narrative gaps**: Cross-reference repo docs to keep the story aligned with real capabilities.

## Success Criteria
- Chapters and frames read like a best-in-class product tour.
- All HTTP operations succeed without violating constraints.
- User can pull the updated AI Frames without manual fixes.
