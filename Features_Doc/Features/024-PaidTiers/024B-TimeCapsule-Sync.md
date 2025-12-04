# 024B – TimeCapsule Sync & Sharing

## 1. Seed + sync TimeCapsule metadata to cloud

- Add a “Sync to cloud” job (manual trigger button + auto every 15 min) that uploads the active capsule’s frames/chapters/metadata to S3 + Dynamo (`aiframes` table) using `{ frameSetId, frameVersion }`.
- Store last sync timestamp/status in local state and display it in the AI Frames sidebar; failed syncs surface actionable errors.

## 2. Harden share/invite APIs with upsert

- Update [`src/app/api/aiframes/share/route.ts`](src/app/api/aiframes/share/route.ts) and [`invite/route.ts`](src/app/api/aiframes/invite/route.ts) to upsert the `aiframes` record if Dynamo reports a missing key (first share on a capsule seeds the row automatically).
- Include capsule name in the stored metadata and return collaborator lists / invite states so the UI can render them.

## 3. Share panel UX improvements

- In [`AIFlowBuilderPanel`](src/app/ai-frames/components/AIFlowBuilderPanel.tsx), show capsule name + ID, display current collaborators (with remove buttons), and indicate whether the public link or collaborator sharing is active.
- Make the invite input and public-link toggle available only after the capsule has successfully synced to cloud (show neutral state + CTA when sync hasn’t run yet).
- Add controls to rotate/delete the share link and to manually trigger sync from the panel.

## 4. Background sync engine

- Implement a shared hook/service (e.g., `useTimeCapsuleCloudSync`) that tracks pending changes and pushes them every 15 minutes when the app is open, with exponential backoff on failures.
- Emit telemetry/logs for each sync so ops can audit cloud/local drift, and expose an indicator if the last sync failed.

## 5. Testing & safeguards

- Unit test the new sync helper and upsert logic (mock Dynamo/S3).
- Add integration tests covering share toggle, invite add/remove, and collaborator list rendering using seeded data.
- QA checklist: manual sync button, auto-sync interval, error recovery, collaborator removal, share-link rotation, and non-Pro gating.