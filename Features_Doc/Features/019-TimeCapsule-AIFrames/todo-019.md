# TODO 019: TimeCapsule AI-Frames Population

1. Confirm bridge contract via `GET /api/local/aiframes/info` (document schema + env flags).
2. Snapshot current frames/chapters/graphState via `GET /api/local/aiframes/state`; catalog existing IDs.
3. Draft user-focused narrative:
   - Define chapter themes, descriptions, colors, orders, and associated `frameIds`.
   - Outline frame content (titles, goals, info/after text, AI concepts, attachments) mapped to real features.
4. Build final `{ frames, chapters, graphState }` object preserving IDs (or explicitly replacing them) and ensuring ordering integrity.
5. POST updated snapshot to `/api/local/aiframes/state`; verify success response.
6. Validate rendered state (spot-check GET) and instruct user to “Pull from Local SWE,” noting any follow-up actions.
