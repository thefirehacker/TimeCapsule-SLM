## 024A - KB Upload Feedback + Initials Fix

### Background
- Document uploads currently fail silently in the UI: if a quota or validation error trips (`Document exceeds per-upload page cap`), only the console shows the exception. Users cannot tell why processing stalled, nor do they see per-file statuses during ingestion.
- The signed-in avatar renders three initials (e.g. `ASS`) because we slice the full uppercase string to three characters, which looks awkward—product wants the conventional first-two-initial pattern.
- AI Flow Builder provider dropdown still spells out `TimeCapsule Credits (Managed OpenRouter)` which the user wants shortened to just `TimeCapsule Credits`.

### Goals
1. Provide visible upload progress + terminal status messaging (success/failure) within the Knowledge Base manager so users always know what's happening.
2. Surface server error reasons (quota exceeded, invalid doc, etc.) inline so users can act on them without opening devtools.
3. Standardize avatar initials to two characters max.
4. Update the AI Flow Builder provider label text.
5. Raise the Pro-tier per-upload allowance to 500 pages (server limit + UI copy).

### Proposed Solution
1. **Upload Status UX**
   - Extend `useDocuments` to track an `uploadJobs` map keyed by filename (state machine: `queued → uploading → success|error`). Capture server responses; on error record `message` from JSON payload or fallback to status text.
   - Emit those statuses to `KnowledgeBaseManager` (pass down via props). Show a new status list (e.g., “Processing doc.pdf…”, “Failed: exceeded per-upload page cap”). Auto-clear successes after refresh; keep failures visible until dismissed.
   - When an error occurs, reset `isUploading` false and display toast/banner summarizing failure reason plus instructions (e.g., “Free tier allows 50 pages per document”).
2. **Final Status**
   - After each upload completes, show `Processed <doc>` with timestamp and optionally highlight “Ready”. For errors, keep row flagged red with retry CTA.
   - Hook into upload promise chain to ensure `updateDocumentStatus` still runs whenever at least one file succeeded.
3. **Initials**
   - Update avatar helper to split name by whitespace, take first char of first two segments, fallback to email/localpart; uppercase result and limit to length 2.
4. **Provider Label**
   - Adjust `AIFlowBuilderPanel` provider option string to “TimeCapsule Credits”.
5. **Pro Page Cap**
   - Update `CREDIT_LIMITS.pro.kbPagesPerDoc` to 500 and sync any UI/helper text so Pro users are informed of the larger allowance.

### Risks / Mitigations
- **Long-running uploads**: ensure status list is virtualized? Current volumes small; simple array OK.
- **Server error parsing**: fallback to generic message if response not JSON.
- **Hook usage**: keep new hooks near existing `useState` declarations to avoid order regressions.

### Testing Plan
- Attempt to upload a >50-page doc as Free tier → expect visible failure banner and status row.
- Upload a valid doc within limits → see “Processing/Processed” transitions and entry in document list.
- Upload a 400–500 page doc as Pro → succeeds; exceeding 500 triggers the new message.
- Confirm avatar now shows two letters on Deep Research nav + global header.
- Open Flow Builder provider dropdown → label reads “TimeCapsule Credits”.

