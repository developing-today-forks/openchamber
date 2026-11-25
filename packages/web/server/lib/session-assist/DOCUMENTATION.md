# Session assist

The server generates a short reminder of recent work, a structured summary
(what is done, what is left, where it stopped) and an optional next user
message with Small Model. Results live in `metadata.openchamber.assist` with
`recap`, `suggestion`, `summary` (`{ done, left, stoppedAt }` or `null`),
`forMessageID`, and `generatedAt`. An empty suggestion is a successful outcome;
`left` is empty when nothing remains. A payload from before `summary` existed
simply has none, and readers treat it as no summary.

## Ownership

- `runtime.ts` owns idle timers, cancellation, provider selection, SDK reads,
  freshness checks, settings gates, metadata writes, and the on-demand
  summary (`summarizeNow`).
- `routes.ts` owns the summary route and maps each outcome to its status code.
- `context.ts` reads bounded history and constructs human turns. It removes
  tool payloads and injected prompts before retaining message text.
- `prompt.ts` owns the generation instructions and total input budget.
- `../small-model/DOCUMENTATION.md` owns provider/auth resolution, generation,
  output limits, and overflow behavior.

## What the model receives

Read backward through the official SDK in newest-first pages of 50 messages
(`{ data, cursor }`) until three human turns are covered, history ends, or eight
pages have been read. A failed page or repeated cursor aborts generation; it is
not treated as complete history. `loadAssistContext` throws for a failed or
stalled read and returns `null` when the bounded history holds no eligible final
answer; both skip generation and write nothing. At the page limit, use fewer
available human turns. If the latest answer's human request has not been found,
skip generation rather than invent its context.

Three turns retain the substance behind short commit confirmations without
bringing an entire old task back into the prompt. This was compared against
one, five, ten, and full-history contexts on long maintainer sessions. There
is no full-history cache and no assumed provider prefix-cache behavior.

The latest content record must be a completed, successful, non-summary
assistant answer with visible text. OpenCode closes every turn with an `idle`
record and appends agent/model/location switches as records of their own;
`newestContentId` looks past those, both here and in the re-check before the
write, so an ordinary v2 transcript still ends in its answer. An `idle` whose
outcome is `failed` or `interrupted` is not skipped: it disqualifies the turn.
Child, archived, and reverted sessions are skipped. A new prompt clears the
revert boundary before its next idle event.

A v2 message carries no `parentID`: a turn is positional, the run of records
between one user message and the assistant reply that follows it. A user message
carries a single `text` plus its attachments, an assistant message a `content[]`
array, and attached context arrives as its own `synthetic` message that folds
into the user message after it. Tool payloads never enter this view. OpenCode
inserts synthetic continuation users during compaction, and those stay within
their human turn; compaction summaries are excluded. An interrupted request
remains context with its last visible progress explicitly labeled as unfinished,
rather than being dropped or called a final answer.

`snapshotFiles` lists the files OpenCode saw change during an assistant step, or
is null when it took no snapshot (snapshots off, not a git folder). Every step of
the turn contributes, and the folder is shared, so another session's edits can
appear in it.

### Attached context and language

The persisted attachment contract is owned by
`packages/ui/src/lib/messages/contextParts.ts`. Its user-facing Markdown
formatter is `packages/ui/src/lib/messages/messageMarkdown.ts`.

The server projects those persisted parts into model context without importing
the UI runtime: code comments, file/chat quotes, browser annotations, PR comments,
checks, terminal selections, and linked repository and tracker items remain attached to
the user turn even when their transport part is synthetic. The OpenCode
`opencodeComment` mirror is also accepted. Unrecognized synthetic prompts and
ignored parts are excluded. Malformed attached text fails the generation.
Older messages still carry the legacy kinds `github-issue`, `github-pr`, and
`linear-issue`, which are accepted alongside the current `repository-issue`,
`repository-discussion`, `change-request`, and `tracker-item`. A legacy
`<terminal_context>` block at the end of a user message counts as quoted source
for language selection.

Quoted material and the user's own comment are separate blocks. The user's
authored text is also supplied separately for language selection. Quoted source,
logs, assistant replies, and injected memory instructions do not choose the
language. A language-neutral final acknowledgment can use recent authored text.
The existing Cyrillic/CJK mismatch guard uses that authored sample per field;
it is not a complete language detector, and it is skipped if no sample exists.

### Input bounds

User text is bounded to 8,000 characters and each assistant answer to 16,000.
Attached quote bodies have their own 4,000-character limit so a large quote
does not consume the user's comment. Excerpts preserve both ends with an
explicit omission marker, including the conclusion of a long final report.

The complete user prompt is limited to 32,000 characters and the resolved small
model's input allowance, reserving space for the system prompt. Under pressure,
drop older whole turns first. If the latest pair itself is too large, excerpt
both its user request and answer rather than discarding either side. If even
the minimum prompt cannot fit, skip generation. `onOverflow: 'error'` prevents
the Small Model service from silently cutting off the instructions. Expected
context/output-budget failures are quiet and do not write metadata.

OpenCode message pages still contain complete tool payloads on the wire. A
single long turn can therefore require substantial I/O even though its retained
model context is small. Page/count bounds are not a network-byte quota.

## Generation and lifecycle

1. The server's existing global event fan-out calls `processPayload`. At an
   idle event the runtime first asks the injected `evaluateTurn` (the
   session-work runtime, `../session-work/DOCUMENTATION.md`): one Jev call says
   which enabled fields are worth the Small Model. It then arms the 60-second
   quiet window for those fields only, and arms nothing when Jev ruled both out.
   An unknown answer (no Jev, a failure) keeps every enabled field, so without
   Jev nothing changes. A newer event drops a pending answer. A session that
   `../session-lineage.js` knows to be a subsession arms nothing at all: no
   gate, no timer, no read. No history scan or
   startup backfill runs.
2. Busy/retry events and newly created user messages clear pending work and
   abort in-flight reads/generation. Re-emitted old user updates do not cancel it.
3. One generation runs per session. If a newer quiet window expires while an
   old canceled request is still settling, retain that pending run and start it
   after the old one finishes. Later activity cancels the pending run as well.
4. Resolve the small model using the last answer's provider/model and the
   existing explicit settings/config overrides. Naming that provider prevents
   an implicit cross-provider fallback. Production does not pin the
   experimental model. Generation accepts an abort signal and a 120-second limit.
   When that resolves to the session's own model on a local endpoint
   (`localEndpoint`), skip generation, whether it came from the fallback or
   from an explicit Small Model naming the same model: llama.cpp-style
   servers keep one prompt cache per slot, so a side request evicts the
   session's cache and the next turn reprocesses the whole history (#3871).
   A different model on the same machine, configured or found by the family
   scan, is still used. The skip writes one `[session-assist] skipped` line per
   provider/model pair: a loopback OpenAI-compatible proxy (CLIProxyAPI,
   LiteLLM, one-api) that forwards to a hosted vendor is indistinguishable from
   a local inference server by hostname alone, and the log line is the only
   thing that tells an operator why an enabled toggle produced nothing (#6173).
5. Recap describes the substantive work and its current result, including the
   work behind a closing commit or acknowledgment. The summary splits the same
   work into `done`, `left` and `stoppedAt`, asked for in the same call as the
   recap; it is written only when `done` is non-empty, and a script mismatch
   drops it whole. Suggestion is independent:
   only unfinished requested agent work should produce a sendable user message.
   Completed work, optional offers, or a decision/action belonging to the user
   should return an empty suggestion. This is model judgment, not authorization
   enforcement or a guarantee that every generated field is factually correct.
6. Re-read the latest message and fresh session before writing. A moved tail,
   canceled run, changed endpoint/directory, archive, revert, or failed fresh
   read discards the result. Never merge from the old pre-generation metadata.
7. Re-check settings, clamp the enabled fields, and merge into fresh metadata.
   The OpenCode update endpoint has no compare-and-set operation; another
   writer after the final read is not guarded atomically.

`onPendingChange` reports when a session starts waiting for its assist (the
turn end, unless the recap and the suggestion are both off) and when the wait
ends: written, ruled out by the turn-end check, failed, or dropped by a new
turn. `index.js` broadcasts it as `openchamber:session-assist` with the
session's directory, and clients keep a chat's OpenCode location until the
wait ends, because these reads would start a stopped directory again.

Stopping the runtime clears pending timers/runs and aborts in-flight operations.
No failed session blocks another session. A generation failure is logged with
its cause (status, code, bounded message) so a cold-start 503 can be told from
a permanent provider rejection; the two are retried differently upstream, and a
bare "generation failed" hid which one happened. The small-model service
rethrows raw SDK rejections, which are tagged objects rather than Errors, so the
line reads `code`, `message`, and `_tag` from either shape. 404 and the expected
context/output-budget codes stay quiet, and no failure retries here: this layer
makes one attempt, and the small-model service owns the bounded backoff it
runs while a cold catalog has not published the model yet.

## On-demand summary

`POST /api/session-assist/sessions/:id/summary` with `{ directory, trigger }`
(`manual` for the hover card's Summarize button, `hover` for the card asking by
itself) runs one generation for one session through the same context loader,
prompt budget, small-model resolution and pre-write re-checks as the turn-end
run. It is registered with the feature routes, before the OpenCode proxy. It
asks only for the recap and summary; a suggestion already written for the same
answer is carried over, any other is dropped.

Every outcome has its own answer, so a client never reads a failure as "nothing
to summarize":

| Outcome | HTTP | Meaning |
|---|---|---|
| `written` | 200 | A summary was saved; it reaches clients as `openchamber:session-metadata` |
| `fresh` | 200 | The stored summary is current (`generatedAt >= time.idle`); no model call |
| `empty` | 200 | No completed answer in the bounded history; no model call |
| `refused` + reason | 409 | `disabled`, `busy` (OpenCode lists it in `session/active`), `child`, `archived`, `reverted`, `not-found`, `no-model`, `local-model`, `unavailable` |
| `cooldown` | 429 + `Retry-After` | A run for this session failed or found nothing less than 30 s ago |
| `capacity` | 429 | Two on-demand runs are already in flight across all sessions |
| `cancelled` | 409 | Every caller went away, or the session moved on while generating |
| `failed` + reason | 502 | Generation failed, the output had no usable summary, or a read failed |

Concurrency: requests for a session already being summarized join that run,
and a run waits for a turn-end generation already reading the session before it
starts, so there is one generation per session at a time. A run is aborted when
its last waiting request closes. Settings: `sessionRecapEnabled` off refuses
every request; `sessionHoverSummaryEnabled` (default on) off refuses only
`hover` requests. Only `failed` and `empty` start the cooldown: after
`written` the next request answers `fresh` from the stored summary, and a
refusal or cancellation spent no model call.

A turn-end run keeps what an on-demand run wrote for the same answer: when its
own output has no summary (Jev gated the turn to the suggestion, or the model
left `done` out), it carries the stored summary and recap forward rather than
writing `summary: null` over them a minute after the card showed them.

The client (`packages/ui/src/lib/sessionSummaryRequest.ts`) remembers the last
outcome per session and turn (`time.idle`): the card asks by itself once per
turn, hides the button after a refusal, says when there is nothing to
summarize, no Small Model, or a failure, and asks again after `cooldown`,
`capacity` or `cancelled`. A `written` outcome shows "Summarizing" until the
metadata event brings the summary; if a later write for the turn has none, the
button comes back.

Runtime parity: web, Electron, hosted mobile and Capacitor reach this route
through the OpenChamber server. Only the desktop sidebar's hover card calls
it; phones have no hover card. VS Code has no hover card and no Summarize
button, and its extension-only runtime runs no session assist.

## Decisions

### Why the summary is a field of the assist payload and not a sibling

The recap and the summary describe the same turns with the same context, so
one prompt returns both and one freshness rule retires both. A sibling payload
would have needed a second model call per turn end or a second freshness rule
that could disagree with the recap's.

### Why on-demand runs have a cooldown and a global cap

The hover card can ask by itself. Without the cap a pointer drifting down a
long list could start a model call per row; without the cooldown a card left
open on a session the model cannot summarize would ask again on every open.
Two concurrent runs and 30 seconds are guesses sized for a person hovering,
not measurements.

### Why malformed attachment text still fails the context read

`attachedText` reads `metadata.openchamberContext` and `metadata.opencodeComment`
from SDK message records. Their values stay JSON until read. Nullish optional
fields default to empty text; a non-string field where trimming is required
throws `TypeError`, preserving the failed read rather than building a recap
from incomplete context.

`answeredBy` in `../routing/history.ts` accepts present `undefined` provider and
model properties, matching the objects returned by `context.ts`.
`Array.prototype.findLast` is supported by the shared check's ES2023 declarations.

### Why runtime inputs keep field checks

Translated events supply the event envelope; status and message fields remain
unchecked until the runtime reads them. Generation JSON and rejection fields
also remain unchecked. Object checks accept arrays where the existing event
reader accepts them. Rejection-field access excludes only null and undefined,
so primitive rejections and inherited fields retain their existing behavior.
The shared primitive-string predicate establishes rejection text before trimming.

Settings come from the merged settings reader and disable each target only for
literal `false`. The environment selects the settings path. SDK session and
message reads, Small Model resolution and generation, and injected metadata
writes retain their owning contracts. A missing metadata writer parks the
runtime; a missing turn evaluator keeps all fields eligible. Pending directory
lookups can return undefined and preserve that value in announcements and stale
assist retirement.

Model prose can surround generated JSON, so extraction scans earlier closing
braces after a parse failure. Directory headers remain percent-encoded because
OpenCode scopes sessions by `x-opencode-directory` and rejects non-ASCII headers.

### Why the metadata write is an injected seam and not an OpenCode route

OpenCode 2.x accepts session metadata only when a session is created, so no
route stores `metadata.openchamber.assist` afterwards. `persistSessionAssist`
write the recap and suggestion into OpenChamber's own session metadata store.
Without that function the runtime arms nothing and generates nothing; it never
spends a model call on text it cannot save.

### Why archive state is asked for instead of read from the record

In v2 archive state is OpenChamber's own and no OpenCode route sets it, so the
runtime calls `isSessionArchived` rather than reading `time.archived` off the
session record. That check is an awaited wait of its own, so the run checks
again for a cancel after it and before the write.

## Settings and consumers

`sessionRecapEnabled` and `sessionSuggestionEnabled` default on and are checked
before work and before writing. The Jev gate is a cost filter under these same
switches, not a setting of its own: it reads the same three turns as the recap,
so a recap still follows a closing "thanks" after real work. With both off there are no reads, model calls,
or writes. With one on, the shared recent context is still available, but only
that field is requested. An empty suggestion does not erase a valid recap.

Freshness has one rule, `getCurrentSessionAssist` in
`packages/ui/src/lib/sessionAssistMetadata.ts`, computed from the session
record alone so the chat and the sidebar row always agree: the payload is
current while `generatedAt >= session.time.idle` and the session is not
reverted. OpenCode moves `time.idle` at every turn end, succeeded or failed.
Do not compare `forMessageID` with the last loaded message: in v2 the newest
record is the turn's `idle` marker or a switch record, never the answer.
When a session turns busy, the runtime also deletes the assist it wrote
(`persistSessionAssist(id, dir, null)`), so stored state goes stale only for
payloads written by an earlier process; the `time.idle` rule retires those.

- `packages/ui/src/lib/sessionAssistMetadata.ts` parses the payload and owns freshness.
- `packages/ui/src/hooks/useSessionAssist.ts` adds live-status and settings gating.
- `SessionRecapSpacer` shows the reminder in the reserved gap under the reply.
- `SessionSuggestionChip` fills the composer; it never sends automatically.
- Sidebar rows (`SessionNodeItem`, Projects view) show the current summary in
  the whole-row hover card (`sessions/SessionHoverCard.tsx`), or the recap when
  no summary exists, under the same freshness rule, hidden while a turn runs
  and when `sessionRecapEnabled` is off. Without a current summary the card
  offers Summarize, and after it has been open for 2.5 seconds asks by itself
  (`sessionHoverSummaryEnabled`, once per turn). The sidebar no longer marks open
  suggestions; the "In work" block is the sidebar's attention signal.

Web, Electron, hosted mobile, and Capacitor use the server watcher. VS Code's
extension-only runtime does not generate assists; shared UI can render payloads
produced by a server. The background watcher cannot use the browser's message
store when the UI is closed. Manual AI rename uses that store through
`SessionMessageLoader`; these are intentionally different retrieval lifecycles.
