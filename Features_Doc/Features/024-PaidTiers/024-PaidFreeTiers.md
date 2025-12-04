# Specs — Paid vs. Free AI Frames Credit Tiers

## 1. Background & Goals
- **Problem**: Today AI Frames requires users to supply their own OpenRouter key, offers unlimited uploads, and lacks a controlled sharing workflow. This blocks adoption and complicates cost management.
- **Goal**: Introduce first-party “TimeCapsule Credits” so Free users can try AI Frames without bringing an API key, while Pro users unlock higher limits, sharing, and bigger KB allowances. All enforcement lives behind authenticated endpoints, and applies only when `NEXT_BUILD_ENV=cloud`.

## 2. Tier Matrix (monthly quotas, auto-renew)
| Capability | Free | Pro |
|------------|------|-----|
| AI Frame sessions | 1 per month | 3 per month |
| AI Flow Builder creations | 3 per month | 10 per month |
| Knowledge base docs | 5 docs, 50 pages/doc (or 120k tokens) | 15 docs, 500 pages/doc (or 300k tokens) |
| Agent call budget (SWE Bridge/OpenRouter proxy) | 40 calls | 60 calls |
| AI Frames sharing | Disabled | Toggle link + invite up to 10 emails |

Rules:
- Credits are scoped to a calendar month (UTC); renewal timestamp is stored per user.
- Attempts beyond quota return 402-style errors with `remainingCredits` metadata.
- Sharing never exposes KB documents—only AI Frame metadata stored in S3/Dynamo.

## 3. Data Model Updates
### 3.1 DynamoDB `Users` Table (PK `userId`)
Add attributes (all numbers unless stated):
- `tier` (`"free"` \| `"pro"`) — maps to UI toggle.
- `credits`: map containing `sessions`, `flowBuilders`, `kbDocs`, `kbPagesUsed`, `agentCalls`.
- `creditRenewsAt` (ISO string) — next monthly reset.
- `sharing`: map with `isLinkEnabled` (bool), `shareToken` (string), `invitees` (string set), `pendingInviteTokens` (map keyed by email for users who have not signed up yet), `maxInvitees`.
- `lastCreditResetAt` — audit for CRON job.

### 3.2 DynamoDB `aiframes` Table
Purpose: metadata + pointers to S3 blobs.
- **PK**: `frameSetId` (string, stable per user-created learning path).
- **SK**: `version` (ISO timestamp or increment).  
Attributes: `userId`, `title`, `chapterSummary`, `isShared`, `shareToken`, `allowedEmails` (list), `pendingInviteEmails` (list for non-onboarded users), `s3Key`, `createdAt`, `updatedAt`.

Payload storage: `s3://${S3_BUCKET}/aiframes/{userId}/{frameSetId}/{version}.json`

### 3.3 `timecapsule` Table (PK `timecapsuleId`, SK `bubbleSpaceId`)
Store per-session telemetry:
- `userId`, `frameSetId`, `sessionType` (`flow_builder`, `agent_call`, etc.)
- `tokensUsed`, `startAt`, `endAt`, `status`, `errorCode`.
- Optional GSI on `userId` if filtering becomes heavy.

## 4. Environment & Amplify Config
Expose secrets via build pipeline (Amplify forbids vars starting with `AWS_`):
- `S3_BUCKET` — AI Frames payload bucket name.
- `OPEN_ROUTER_API_KEY` — server-side key for proxying OpenRouter.
- `NEXT_BUILD_ENV` already present; cloud-only guards check `process.env.NEXT_BUILD_ENV === 'cloud'`.

Update `amplify.yml` to reference `S3_BUCKET` and `OPEN_ROUTER_API_KEY` in both build & start commands (without `AWS_` prefix) so Next.js server components can read them.

## 5. Server Enforcement Design
### 5.1 Middleware / API touchpoints
- `POST /api/aiframes/session` – checks `credits.sessions`, decrements on success.
- `POST /api/aiframes/flow-builder` – checks `credits.flowBuilders`.
- `POST /api/kb/upload` – verifies doc count + page/token caps before accepting.
- `POST /api/agents/*` (OpenRouter proxy) – enforces `agentCalls` budget, logs to `timecapsule`.
- Sharing endpoints (`POST /api/aiframes/share`, `DELETE /api/aiframes/share`, `POST /api/aiframes/invite`) toggle `isShared`, rotate `shareToken`, and validate invite counts (Pro only).

### 5.2 Reset & Cron
- Cloud function/cron (daily) iterates `Users` where `creditRenewsAt <= now`, resets counters to tier defaults, logs audit row, and updates `timecapsule` summary entry.

### 5.3 Error Responses
Standard shape:
```json
{
  "ok": false,
  "code": "CREDIT_LIMIT_REACHED",
  "message": "Free plan allows 5 KB documents per month.",
  "remainingCredits": {
    "kbDocs": 0,
    "kbPages": 0
  },
  "upgradeUrl": "/pricing"
}
```

## 6. Client UX Requirements
1. **AI Flow Builder header** shows “TimeCapsule credits” with bars for Sessions / Builders / Agent Calls. Defaults to using internal credits; OpenRouter key field is hidden but still reachable under “Advanced”.
2. **KB Upload drawer** displays doc/page counters, rejection states, and page estimation UI.
3. **Sharing panel** (Pro only):
   - Toggle “Public link” (generates `https://app/timecapsule/${shareToken}`) with copy + disable button.
   - Invite form (chips) limited to 10 emails; backend validates.
   - Pending invites appear with a “Awaiting signup” badge. When a new user completes onboarding with a matching email, the backend attaches the relevant AI Frame to their workspace automatically and removes the pending badge.
4. **Global alerts**: when a counter drops below 20%, show an inline warning + CTA to upgrade.

## 7. Monitoring & Analytics
- Emit events (`credits.decrement`, `credits.reset`, `sharing.toggle`, `invite.add/remove`) to existing telemetry pipeline.
- Track S3 storage per user for future billing.
- Dashboard KPIs: conversion rate after hitting limits, invite adoption, average agent calls per tier.

## 8. Testing Strategy
- Unit tests for quota calculator and reset cron.
- Integration tests hitting the new API guards with mocked Dynamo/S3.
- UI tests verifying counters decrement and share controls appear/disappear based on tier.

## 9. Recent Updates (Dec 2025)
- **Sharing resilience**: the Flow Builder now always posts the server-issued `frameSetId`/`frameVersion` from the credit snapshot (instead of local fallbacks) and surfaces those IDs inside the share card for debugging.
- **Backend hardening**: `/api/aiframes/share` and `/api/aiframes/invite` normalize and validate the TimeCapsule key pair before touching Dynamo, returning human-readable guidance if metadata is missing or stale.
- **Invite notifications**: every new collaborator (existing or pending) receives a Resend-powered HTML + plaintext email that includes the capsule name, inviter identity, and share URL when public links are enabled.
- **Shared-with-me UX**: the TimeCapsule sidebar now lists shared capsules, offering quick “Open” + “Copy link” actions with inline feedback; collaborators are reminded if the owner hasn’t generated a public share token yet.
- **Credits snapshot shape**: `sharing.frameSetId`, `sharing.frameVersion`, and `sharing.timeCapsuleName` travel through the credits hook so the client can match server metadata without re-fetching.
- **Error messaging**: Share/invite panels instruct users to pick a capsule (or refresh) before sending invites, reducing “key element does not match schema” confusion during collaboration setup.

This spec unlocks implementation of the Option 2 credit-based model, ensuring users can rely on TimeCapsule-managed resources while giving us levers to monetize and monitor usage.