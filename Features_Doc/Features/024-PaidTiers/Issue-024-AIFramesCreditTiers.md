# Issue 024 — Paid vs. Free AI Frames Credit Tiers

## Context
- Free users currently have to bring their own OpenRouter key and can spam uploads/Flow Builders with no guardrails.
- We now have DynamoDB `Users`, `timecapsule`, and a brand-new `aiframes` table + S3 bucket for storing frame payloads.
- `NEXT_BUILD_ENV` differentiates local vs. cloud, so quota enforcement must only activate in cloud to avoid blocking developer workflows.

## Goals
1. Launch TimeCapsule-managed credits so Free vs. Pro tiers map to specific monthly quotas (sessions, builders, KB docs/pages, agent calls).
2. Provide link/email sharing for AI Frames (Pro only) with pending invites that activate automatically once an invitee signs up.
3. Track every Flow Builder session / OpenRouter proxy call / KB upload in Dynamo for telemetry and billing.
4. Surface remaining credits in the AI Flow Builder UI and KB uploader with upgrade nudges.

## Deliverables
- Data model changes (Users credits map, `aiframes` metadata schema, `timecapsule` telemetry usage rows).
- Env config + Amplify additions for `S3_BUCKET` and `OPEN_ROUTER_API_KEY` (cloud-only expectations).
- API routes:
  - `/api/aiframes/credits` — returns current credit snapshot + renewal date.
  - `/api/aiframes/share` (POST/DELETE) — toggles share link, rotates token.
  - `/api/aiframes/invite` — manages invite emails (including pending invites for non-onboarded users).
  - Credit guards within KB upload + agent proxy endpoints.
- Frontend updates:
  - AI Flow Builder “TimeCapsule credits” panel (sessions/builders/agent calls).
  - KB uploader counters and enforcement messaging.
  - Sharing drawer UI (toggle public link, invite chips with “Awaiting signup” badges).

## References
- Spec: `Features_Doc/Features/024-PaidTiers/024-PaidFreeTiers.md`
- Plan: `@raw-tazjwdyhxr-1764506852176`

## Definition of Done
- Cloud builds succeed with new env vars; local dev unaffected.
- Free vs. Pro quotas enforced & logged; error responses follow spec.
- Sharing invites persist and attach auto-onboarding when invitee registers.
- UI shows accurate credit counts + upgrade CTAs.

