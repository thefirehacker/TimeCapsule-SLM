# AI frames 
We use flash cards but flash cards on its own is not powerful . Timecapsule AI frames along with Mangage Kb and new features like voice mode can enable open learning .

## modes 
### Creator mode : Graph view / Split view --> Linear view 


### Player mode : Play entire AI frames 
Each Timecapsule file Top level is AI frames with  ( Chapter : highest level and then AI frames in a flow.) 


# Specs 

01: Saving chapters and concept attachments in Creator Mode

## Goals
- Allow creators to persist chapter metadata and ordering while editing an AI frame.
- Restore concept attachment so a chapter can reference concepts, and individual concepts can be attached directly to AI frames.
- Maintain backward compatibility with existing Timecapsule files.

## Scope
- Creator Mode (Graph / Split / Linear views) persistence logic.
- Data schema for chapters and concepts within an AI frame document.
- Attachment UX to allow linking concepts at both the chapter and concept level.
- Sync layer interactions with the workspace/Timecapsule backend.
- Does **not** cover Player Mode changes (review after Creator Mode work lands).

## User Stories
- As a creator, I can add/edit/delete chapters and have those changes saved automatically to the AI frame document.
- As a creator, I can attach an existing concept to a chapter so the player can surface it inline.
- As a creator, I can attach a concept directly to the AI frame so it is available globally across chapters.
- As a creator, I receive inline validation feedback when a chapter fails to save or a concept attach call fails.

## Functional Requirements
- **Chapter persistence**
  - Saving triggers whenever a chapter is created, renamed, reordered, or deleted.
  - Inline edits to chapter title or description immediately emit a graph save so later frame links do not overwrite the changes.
  - Chapter objects must include: `id`, `title`, `description` (optional), `order`, `updatedAt`.
  - Saving writes to the AI frame JSON with optimistic UI updates and retries on failure.
- **Concept attachments**
  - Attachment UI lists available concepts (searchable) and allows multi-select.
  - `chapter.attachConcept(conceptId)` attaches concept to a chapter (stored in `chapter.conceptIds[]`).
  - `aiFrame.attachConcept(conceptId)` supports top-level concepts (`aiFrame.conceptIds[]`).
  - Detachment updates arrays and persists instantly.
  - Prevent duplicate concept IDs in attachment arrays.
- **Chapter drop indicator**
  - While dragging a chapter into the graph, surface one green drop indicator anchored to the bottom of the chapter list.
  - Ensure graph, split, and linear panes reference this shared indicator so only a single green drop target renders at any time.
- **Linear view parity**
  - Creator linear view surfaces the active chapter badge for the focused frame.
  - Chapter list appears ahead of the frame detail view with navigation into the first frame in each chapter.
  - Concept badges displayed alongside frame metadata reflect both manual entries and graph attachments.
- **Graph ordering**
  - Chapters expose side handles that support chapter-to-chapter edges; these edges define the canonical chapter order.
  - Large orange handles remain visible on both sides of each chapter node to make reordering targets obvious while dragging.
  - Chapter order derived from graph edges feeds directly into linear view ordering and chapter cards.
- **Error handling**
  - Surfaced via toast + inline field status.
  - Autosave retries up to 3 times with exponential backoff.
  - Failed saves leave chapter in dirty state with "Retry" affordance.

## Data Model Updates
```ts
type AiFrame = {
  id: string;
  title: string;
  chapters: Chapter[];
  conceptIds: string[]; // new: top-level concept attachments
  updatedAt: string;
  ...
}

type Chapter = {
  id: string;
  title: string;
  description?: string;
  order: number;
  conceptIds: string[]; // concepts attached to this chapter
  updatedAt: string;
  ...
}
```
- Migrations: default `conceptIds` to `[]` when missing.
- Analytics events: `chapter_saved`, `chapter_reordered`, `concept_attached`, `concept_detached`.

## UX Notes
- Chapter list shows save status (Saved / Saving… / Error) aligned to the right.
- Drag-and-drop exposes a single shared green drop indicator at the chapter list footer.
- Attachment modal displays concept type, owner, and last updated.
- When attaching to AI frame, show "Frame Concepts" section; for chapter attachments show "Chapter Concepts".
- Retry button in error toast calls the same persistence method.

## API / Sync
- REST (or GraphQL) endpoint accepts chapter mutations: `PUT /ai-frames/:frameId/chapters`.
- Concept attachment endpoints: `POST /ai-frames/:frameId/concepts`, `POST /ai-frames/:frameId/chapters/:chapterId/concepts`.
- Support batch patch payload to minimize roundtrips for multi-edit flows.
- Response includes canonical order to keep client in sync.

## Acceptance Criteria
- Create, rename, reorder, and delete chapters; refresh page; all changes persist.
- Attach/detach concepts to/from a chapter and the AI frame; reload; attachments persist.
- Chapter connector edges in the graph reorder the chapter list in linear view after refresh.
- Concept nodes connected to frames update the frame’s concept badges and persist after reload.
- Autosave indicator reflects success/failure states.
- Creator Mode drag-and-drop renders exactly one green drop indicator across graph, split, and linear panes when repositioning chapters.
- Editing a chapter in the graph or the chapter sidebar reflects immediately in the other surface and survives refresh.
- No regressions in Player Mode or existing AI frames loading.

## Open Questions
- Do attachments require version history for restore?
- Should concept search scope be limited to the current workspace?
- How do we handle conflicts when multiple creators edit the same frame simultaneously?
 
