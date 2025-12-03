# TODO 024 — AI Frames Credit Tiers

1. **Docs & Scaffolding**
   - [ ] Keep spec in `Features_Doc/Features/024-PaidTiers/024-PaidFreeTiers.md` up to date (already done).
   - [ ] Capture issue + todo (this file) inside `Features_Doc/Features/024-PaidTiers`.

2. **Data Layer**
   - [ ] Extend Dynamo `Users` items with `credits`, `creditRenewsAt`, `sharing` (link + pending invites) helpers.
   - [ ] Define `aiframes` table interfaces + S3 key generation helpers.
   - [ ] Create telemetry writer for `timecapsule` table to log sessions/agent calls.

3. **Server APIs & Enforcement**
   - [ ] Introduce `/api/aiframes/credits`, `/api/aiframes/share`, `/api/aiframes/invite`.
   - [ ] Add middleware util to guard KB uploads, Flow Builder launches, and agent proxy calls using credits.
   - [ ] Update `amplify.yml` and runtime config to respect `S3_BUCKET` + `OPEN_ROUTER_API_KEY` only when `NEXT_BUILD_ENV=cloud`.

4. **Client Experience**
   - [ ] Show credits panel in AI Flow Builder + default provider to “TimeCapsule credits”.
   - [ ] Add KB uploader quotas and disable states when exceeded.
   - [ ] Build sharing drawer UI with link toggle + invite chips (`Awaiting signup` for pending invites).

5. **Monitoring & Upgrade**
   - [ ] Emit telemetry events when credits decrement/reset/sharing toggles.
   - [ ] Hook upgrade CTA to pricing page and ensure new quotas appear after upgrade (poll `/api/aiframes/credits`).

> Tracking IDs mirror plan todos in `@raw-tazjwdyhxr-1764506852176`.

