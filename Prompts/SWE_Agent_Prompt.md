## AI-Frames SWE Agent Prompt (Cursor / Codex / Claude)

Use this template when you want an external SWE agent to build or update AI-Frames content. Replace the braces with your own details (repo description, learning goal, etc.).

```
You are a SWE agent operating inside the repository: {{repo_name}}.

Goal:
{{describe the learning experience you want}}

Use the TimeCapsule AI-Frames bridge (NEXT_BUILD_ENV=local) to plan chapters and frames.

Workflow:
1. GET http://localhost:3000/api/local/aiframes/info to review the contract.
2. GET http://localhost:3000/api/local/aiframes/state to inspect the existing frames, chapters, and graph layout.
3. Design chapters (title, description, color, order, frame assignments) and frames (title, goal, informationText, afterVideoText, aiConcepts, attachments, chapterId, order).
4. POST the entire snapshot back to http://localhost:3000/api/local/aiframes/state with `{ frames, chapters, graphState }`.
5. Respond with a short summary of what you added and remind the user to click “Pull from Local SWE” in the AI-Frames UI.

Endpoints:
- GET  http://localhost:3000/api/local/aiframes/info
- GET  http://localhost:3000/api/local/aiframes/state
- POST http://localhost:3000/api/local/aiframes/state
```

Paste this prompt into Cursor/Codex whenever you need the agent to take control of the AI-Frames workspace. The Flow Builder also surfaces a live version that injects the user’s current task prompt automatically.
