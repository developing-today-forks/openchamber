# Shared Guards Documentation

## Purpose

`packages/web/server/lib/shared/guards.js` holds the small value predicates and
coercions that several feature modules used to define privately. It is neutral:
it knows nothing about git, OpenCode, projects, or any other domain, and it
imports nothing. Consolidating the copies means a value can no longer be a
string on one route and not a string on another because two files spelled the
check differently.

Only the dominant, behavior-defining spelling of each guard belongs here.
Variants that answer differently for real inputs stay with their owner.

## Public exports

- `isString(value)`: `Object.prototype.toString.call(value) === '[object String]'`.
  True for primitive strings and boxed `String` objects. This is wider than
  `typeof value === 'string'`, which is why callers that only accept primitives
  keep their own `typeof` check.
- `isPlainObject(value)`: true only for a plain `{}`-shaped object. Rejects
  `null`, arrays, boxed primitives, `Date`, `Map`, class instances, functions,
  and null-prototype objects (`Object.create(null)`).
- `isRecord(value)`: true for any non-null, non-array object. Accepts plain
  objects, class instances, `Date`, `Map`, boxed primitives, and null-prototype
  objects.
- `isBoolean(value)`: true only for a primitive boolean (`true` or `false`).
  Use it where a value crosses a JSON boundary and must be a real boolean, not
  the string `"true"`.
- Modules that call the predicate `isObjectRecord` import `isRecord` under that
  local name; the shared module exposes one canonical export.
- `asNonEmptyString(value)`: trims a string and returns it, or returns `null`
  when the input is not a string or is empty/whitespace after trimming. The
  `null` answer (not `''`) keeps "absent" distinguishable from "present".

## Behavior matrix

| input | `isString` | `isPlainObject` | `isRecord` / `isObjectRecord` | `isBoolean` | `asNonEmptyString` |
|---|---|---|---|---|---|
| `'s'` | true | false | false | false | `'s'` |
| `''` | true | false | false | false | `null` |
| `'  s  '` | true | false | false | false | `'s'` |
| `'   '` | true | false | false | false | `null` |
| `true` / `false` | false | false | false | true | `null` |
| `new Boolean(true)` | false | false | true | false | `null` |
| `new String('s')` | true | false | true | false | `null` (not a primitive) |
| `42` / `NaN` | false | false | false | false | `null` |
| `null` / `undefined` | false | false | false | false | `null` |
| `{}` | false | true | true | false | `null` |
| `[]` | false | false | false | false | `null` |
| `new Foo()` (class) | false | false | true | false | `null` |
| `new Date()` | false | false | true | false | `null` |
| `new Map()` | false | false | true | false | `null` |
| `Object.create(null)` | false | false | true | false | `null` |

## Atomic rename

`atomic-rename.js` holds the rename retry for atomic writes, shared by the
web server's temp-file-then-rename stores: agent-memory, project-context,
walkthrough, the git/GitHub/GitLab and source-control credential stores,
environment, linear, quota, routing, spaces, relay, guests, projects, and
the other persisted-state writers under `server/lib`. On Windows, renaming
a temp file over a destination another process is reading fails with `EPERM`
(also seen as `EACCES` or `EBUSY`), and giving up loses the write.

- `renameWithRetry(rename, source, destination)`: async; retries only those
  three codes with 10/25/50/100 ms delays, then surfaces the last error.
- `renameSyncWithRetry(renameSync, source, destination)`: the same policy
  for synchronous callers; the wait between attempts uses `Atomics.wait`.

The caller passes its own rename function, so a store that receives
`fsPromises` by injection keeps that seam. Every other error code throws on
the first attempt. Temp-file cleanup stays with the caller, which owns the
temp path.

## What stays out

These look adjacent but are not the same predicate, so each keeps its private
copy:

- `terminal/runtime.js` and `terminal/shells.js` use `String(value) === value`,
  which rejects boxed strings and throws on null-prototype objects.
- `guests/oauth.js`, `opencode/settings-files.js`, and `opencode/shared.js`
  expose a loose `isPlainObject` that uses `typeof value === 'object'` and so
  accepts values the strict predicate rejects. They keep their own name and
  shape; only modules asking for `isRecord` were migrated.
- `source-control/mutation-executor.js` accepts null-prototype objects under an
  `isPlainObject` name, and `github/routes.js` /
  `github/repo/fork-detection.js` classify by `[object Object]`; all three are
  divergent and stay put.
- `quota/utils/transformers.js` exports an array-accepting `asObject`; it is not
  a guard for a record and is out of scope.
- `projects/project-config.js` owns its config normalization pipeline and keeps
  it local.

## Re-exported public APIs

The modules below keep their exported names and signatures and now re-export
the shared functions, so existing importers are unaffected:

- `opencode/config-v2.js`: `isRecord`
- `linear/parse.js`: `isString`, `isPlainObject`
- `gitlab/validation.js`: `isString`, `isPlainObject`
- `quota/utils/transformers.js`: `asNonEmptyString`

## Bounded-call primitives (design #802 phase 1, #803)

Three outbound-call primitives live here beside the guards, under the same
admission rule: the dominant, behaviour-defining spelling is shared, and a
variant that answers differently stays with its owner.

- `bounded-fetch.js` — `fetchWithDeadline(fetchImpl, url, init, { timeoutMs, signal, headersOnly })` and the exported `combineAbortSignals(signals) -> { signal, detach }` composition helper (the one shared copy; callers import it instead of re-implementing signal composition).
  A per-attempt deadline that **composes** with the caller's signal (either
  firing aborts the call; `AbortSignal.any` where available, a composed
  controller otherwise) and never replaces it — the gitlab
  `fetchWithTimeout` overwrite-and-clear-at-headers behaviour is the
  anti-pattern this replaces. By default the deadline stays armed until the
  response body has been fully read (the returned Response's body stream is
  raced against the deadline); `headersOnly: true` is the explicit opt-in
  to clear it when the headers arrive. Only the wrapped Response's status,
  headers and body are contractual; other Response metadata of the original
  is not carried over.
- `response-body.js` — `readBoundedResponseText` / `readBoundedResponseBytes` /
  `readBoundedResponseJson`
  (plus `discardResponseBody`). The cap is enforced **during** the read: a
  declared `content-length` over the cap refuses before reading, the stream
  is cancelled the moment the cap is crossed, and oversize is reported as
  `{ tooLarge: true }` — never a truncated body returned as complete.
  `readBoundedResponseJson` parses only a complete body and returns `null` for
  an over-cap, unreadable, or invalid JSON response, preserving the caller's
  existing failure policy.
  `guests/response-body.js` re-exports all three, so the guests importers
  keep working unchanged. Phase 2 (#804) pointed the two importers outside
  guests/ at this module directly (`opencode/proxy.js`,
  `opencode/mcpx-daemon.js`), and `opencode/model-discovery.js` /
  `opencode/theme-catalog.js` now compose `readBoundedResponseBytes` under
  their own error shapes instead of keeping private reader loops.
- `parse-int.js` — `parsePositiveIntWithDefault` and
  `parseBoundedIntWithDefault`. The strict plain-decimal judgement the eight
  private copies used to spell per module: optional surrounding whitespace,
  ASCII digits only, caller-supplied fallback for anything else (`'1e3'`,
  `'0x10'`, `'5000junk'`, `'5.9'`, `''`, `'-5'` never parse). The positive
  spelling requires a value above zero; the bounded spelling checks an
  inclusive `[min, max]` and lets `'0'` be a real value when the range
  allows it. Phase 2 (#804) migrated seven of the eight private copies
  (`fs/routes.js` and `guests/upload.js` through their `parsePlainDecimalInt`
  delegations, `fs/search.js`, `opencode/lifecycle.js`,
  `opencode/draining-opencode.js`, `relay/host-client.js`,
  `ui-auth/ui-auth.js`); call sites with no upper bound pass
  `Number.MAX_SAFE_INTEGER` as the max, which no safe-integer value can
  cross.

- `gitlab/network.js` `fetchWithTimeout` delegates to `fetchWithDeadline`
  (phase 2, #804), keeping its exported name and signature; its callers in
  `verify.js` and `device-flow.js` get the composed-signal, body-covering
  contract. `gitlab/client.js` keeps its own `deadlineSignal`: its retry
  policy has to tell a deadline abort from a caller abort (`timedOut()`),
  which the primitive does not expose, and its downloader bounds the wait
  for headers only because the body streams to the route caller.

### What stays out

- `opencode/self-handoff.js` `resolveHandoffTimeoutMs` (phase 2, #804):
  the strict parser with a timer bound. Its spelling judgement matches
  the shared spellings — plain decimal only, `Number.isSafeInteger` —
  so a digit string beyond the safe-integer range (26 digits, say)
  yields the fallback there too, not a huge value. What differs is the
  accepted range: 1 to 2_147_483_647 ms, because the value feeds a
  timer and a delay above Node's 2^31 - 1 ms maximum fires after ~1 ms
  instead; a larger configured timeout falls back to the 30 s default
  rather than killing every handoff successor immediately. It stays
  local for that bound — a property of the timer it feeds, not of the
  shared parser's caller-supplied range.
- Parsers that accept a sign, a fraction, or a non-decimal spelling: no
  shared copy accepts them, and a caller that truly needs one keeps a
  local, differently-named variant.
- Deadline policies (which timeout, retry, or backoff a call site wants):
  the primitive supplies the bound, the caller supplies the number.
- Domain-shaped readers and fetchers (quota, gitlab, proxy): they compose
  these primitives in phase 2 instead of moving here.

## Durable JSON store (design #976 phase 1, #977)

`durable-json-store.js` holds the one read/write contract for the web
server's JSON state files — the stores whose contents are user data,
credentials, or provenance. It composes `atomic-rename.js` and adds the
three pieces the per-store fixes of 2026-10-30 each hand-wrote: a strict
reader, a preserve-aside helper, and a mode-explicit atomic writer, each
in async and sync spellings, each taking the caller's fs surface by
injection. The contract rules:

1. **Three read states, never two.** `readDurableJsonFile` /
   `readDurableJsonFileSync` answer `missing | valid | malformed`, with
   the caller's value judgement (`isJsonObject` for an object-shaped
   store; a parsed value the predicate rejects is `malformed`). A
   read-only consumer may degrade `malformed` to its empty answer and
   says so at the call site; a read-modify-write cycle may never seed
   from a degraded read. An absent or empty file is `missing`; a read
   failure other than absence throws.
2. **Malformed is preserved before it is replaced — or the write
   refuses.** `preserveMalformedJsonFile` /
   `preserveMalformedJsonFileSync` rename the malformed file to
   `${file}.corrupt-${Date.now()}-${process.pid}-${random}` — the
   collision-proof spelling, so two preservations in the same
   millisecond both survive. The preserve step re-reads and re-judges
   the on-disk bytes first, re-judges them again after the
   preserve-name check, and verifies the preserved bytes after the
   rename — a valid replacement caught in any of those windows is
   restored to the live path atomically (hard link, never an
   overwriting rename) and answers `replaced`, and one that cannot be
   restored safely answers `failed`, so a concurrent writer's valid
   replacement is never renamed away; the result names the outcome (`preserved`,
   `replaced`, `missing`, `failed`), and `failed` is fail-closed: the
   caller must refuse its write. Raw parse errors are never logged or
   attached to a result — they can quote file contents.
3. **Writes are atomic and permission-explicit.**
   `writeDurableJsonFile` / `writeDurableJsonFileSync` require a stated
   integer `mode` (0o600 for secret-bearing stores) and write a unique
   temp file (pid + time + random) in the same directory, renamed over
   the destination via `renameWithRetry` / `renameSyncWithRetry`.
4. **Reads are bounded and regular-file-checked (#1649).** Every read
   in the module — both reader spellings and all three read points of
   both preserve spellings — goes through one handle-judged bounded
   read: open once with `O_NONBLOCK`, judge from the handle, enforce
   the cap in flight at cap+1 bytes. The cap is
   `DEFAULT_DURABLE_JSON_MAX_BYTES` (32 MiB, derived at its definition
   from the fifteen callers' write-side bounds, with headroom over the
   one unbounded caller, the session-metadata index) unless a caller
   passes `options.maxBytes`. An over-cap or non-regular file is a
   coded refusal (`DURABLE_JSON_STORE_TOO_LARGE` /
   `DURABLE_JSON_STORE_NOT_REGULAR`): the readers throw it (their
   existing read-failure branch — never `malformed`, never `missing`),
   and preserve answers `failed` at whichever read point refused.
   Where an injected fs surface has no handle API (the unit-test
   seam), the cap is enforced on the bytes its `readFile` returns.
5. **Both clock styles, fs injection preserved.** Async stores that
   receive `fsPromises` and sync stores both use the same contract by
   passing their fs surface in `options.fs`; no store loses its test
   seam, and the module imports nothing beyond platform APIs and
   `atomic-rename.js`.
6. **Divergent policies stay local and are named** (see below). The
   contract governs stores whose loss is the failure; policies that
   answer differently for real inputs are recorded, not redefined.

### What stays out

- `relay/key-store.js` — throw-and-stop: an identity file a human must
  repair ("fix or remove it, then retry"). Not migrated, not redefined.
- `agent-memory/runtime.js` — malformed is a failure and throws.
- `walkthrough/store.js` and the other caches (including
  `guests/service-registry.js`'s per-record drop) — corrupt is a cache
  miss and never throws; losing a cache is free.
- `opencode/settings-runtime.js` — the multi-writer shared
  `settings.json` with migration semantics of its own; folding it in is
  a settings-file decision, not a spelling migration. It is excluded
  from the phase-2 migration (#978) by name.
- Store shapes, defaults, serialization formatting, and domain error
  surfaces: the primitive knows paths, bytes, JSON and modes only, and
  callers keep the rest.

## Bounded file read (design #1254, #1256 and #1255)

`bounded-file-read.js` holds the one bounded read for files whose size the
server does not control — project and user files, as opposed to response
bodies (#802) and the server's own state files (#976). It generalises
`skills-catalog/scan.js`'s `readSkillMdFile`, the family's one correct
embodiment. Phase 2 (#1255) migrated the call sites: scan's
`readSkillMdFile`, snippets' `parseMarkdownFile`, plugins'
`readPluginDirFile`, the guests entry-HTML read in `guestBuiltScriptsReady`,
and git's `readFileDiffWorkingTreeFile` all read through this module now.
Each caller maps the coded outcomes back onto its own existing contract,
so error surfaces and missing-file behaviour are unchanged.

- `readBoundedFile(filePath, maxBytes)` / `readBoundedFileSync(filePath, maxBytes)`
  answer identically: `{ ok: true, buffer, size }` for a complete read at
  or under the cap, or a coded refusal — `too-large` (carrying `path`,
  `size` and `limit`), `missing`, or `not-regular`. Unexpected I/O errors
  throw; the three expected outcomes never do.

The contract (rules 1–5 of #1254):

1. Every read of a file whose size the reader does not control goes
   through this reader; the cap is stated at the call site (mechanism
   shared, values local — 1 MiB plugins, 4 MiB config/SKILL.md/snippets,
   the diff readers' larger caps all stay as they are).
2. Open once, judge from the handle: `O_NONBLOCK` where available,
   handle stat, non-regular files refused — never stat-by-path then
   read-by-path, which follows a symlink to a device or FIFO and races
   a growing file.
3. The cap is enforced during the read (at most cap+1 bytes are read),
   so a file that grows after the stat is over-cap, not buffered whole.
4. One uniform over-cap answer, coded `BOUNDED_FILE_TOO_LARGE` and
   carrying path, size and limit; the caller states its policy —
   `refuse`, or `skip`-with-warning. Truncation is not a policy: a
   truncated config or markdown file parses as a different file.
5. Sync and async spellings answer identically; missing ≠ over-cap ≠
   non-regular, so adopting the reader never changes a caller's
   missing-file behaviour.

### What stays out

- `diagnostics/local-files.js` — offset sampling of diagnostic logs is
  a sampling policy, not a bounded whole-file read; partial reads there
  are the point and stay.
- Response bodies stay `response-body.js` (#802): a stream is not a
  file, and its cap is enforced by cancelling the stream.
- The server's own state files stay `durable-json-store.js` (#976):
  contents the server controls, with preserve-on-malformed semantics
  this reader does not have. Since #1649 the durable store applies
  the same bound-and-judge discipline internally (handle stat,
  non-regular refusal, cap enforced in flight), so the exclusion is
  about disposition, not about the bound.
- Cap values, error surfaces and HTTP shapes at the call sites: the
  primitive knows paths, bytes and caps only.

## Traversal budget (design #1391 phase 1, #1392)

`traversal-budget.js` holds the one counting core for recursive directory
walks over trees the server does not control — project trees, skills
roots, agent directories, a cloned catalog offered for install. It
replaces the three spellings the capped walks grew privately (a cap test
reading a BFS `visited` Set's size in `fs/search.js`, a `(maxDepth,
maxDirs)` parameter pair in `fs/routes.js` `findGitDirectories`, a
per-root counter and a threaded `{ visitedDirs }` object in
`opencode/agents.js`). Phase 1 (#1392) lands the primitive only; phase 2
(#1393) migrated the `fs/search.js` and `fs/routes.js`
`findGitDirectories` walks onto it with their values and behaviour
unchanged. The `opencode/agents.js` walks keep their spelling until
their own phase. The skill walks followed in #1465:
`opencode/shared.js` `walkSkillMdFiles` (5,000 directories, enumerate)
and `listSkillSupportingFiles` (5,000 directories and 5,000 files,
enumerate with the result's `truncated` flag read from the budget)
consult one budget object each, and their VS Code twins in
`opencodeConfig.ts` state the same budgets through the hand-mirrored
copy there.

- `createTraversalBudget({ maxDirs, maxEntries?, maxDepth?, deadlineMs? })`
  returns the one budget object a walk consults. `visitDir(depth?)`
  answers whether a directory may be entered, consulted **before
  descending**, and counts the directory when it is allowed;
  `visitEntry()` counts entries the same way. `visitedDirs` /
  `visitedEntries` expose the counters, `exhausted` whether a stopping
  dimension has been spent, and `truncated` whether any consultation has
  been refused — the enumerate disposition's signal. A refused
  consultation counts nothing, so repeated consultation after
  exhaustion keeps answering "stop" with no counter drift past the
  bound, and a walk that consumes exactly its bound and never consults
  again finishes with `truncated` unset. A directory past `maxDepth` is
  refused without consuming the directory count and without stopping
  shallower consultations.

The contract (rules 1–5 of #1391):

1. Every recursive directory walk over a tree whose size the walker
   does not control carries a named traversal budget. The budget's
   dimensions are stated where the walk is defined; values stay
   per-walk (100 / 5,000 / 50,000 are all legitimate and none changes
   under this design).
2. The budget counts what the walk consumes, not what it returns.
   Directories visited is the mandatory dimension — a results-only
   counter is vacuous on a directory-only tree (#1332). Entries seen
   and depth are optional dimensions where a walk's shape needs them;
   a deadline is an optional dimension for async walks only.
3. One budget object, one spelling. A followed link's directories
   count against the same budget as the root's — the budget is
   consulted per directory entered, however the walk reached it — so
   no link can expand a walk past its budget. Link policy (follow with
   an ancestor check, refuse, dedupe) stays per-walk.
4. Two named dispositions at the bound, chosen by what the walk
   produces. *Enumerate* (search, discovery, listing, index): stop,
   return what was found, and make the truncation visible to the
   caller — the result carries the signal, so no UI presents a partial
   list as complete. *Copy* (install): abort with a clear error and
   leave no partial destination — a partial copy is a corrupt install,
   not a partial result. Silently stopping and presenting the prefix
   as the whole is not a disposition of this contract. The budget
   supplies the counting and the signal; the disposition stays with
   the caller.
5. Sync and async walks answer identically, and web/VS Code twins
   state the same budget and disposition for the same walk. A sync
   walk is bounded by counts alone (it has no honest deadline) and
   must stop *at* the bound, not merely record passing it.

### What stays out

- Cap values: this module introduces no cap value for any real walk;
  each walk states its own where it is defined.
- The traversal itself: walks differ in ways callers depend on (BFS
  with a dedupe set, result order, per-entry symlink guards), so the
  budget is the shared part, never a universal walker function.
- Bytes: a walk's budget counts directories and entries, never bytes
  read from a file — file contents stay `bounded-file-read.js`
  (#1254), response bodies stay `response-body.js` (#802). A byte
  dimension belongs to the copy walk's phase, when its values have
  sizing evidence.
- The VS Code mirrors: the extension cannot import this module; its
  twins are hand-mirrored copies per walk, as with `bounded-file-read`,
  in the phase that migrates each walk.

## Notes for contributors

- Add a predicate here only when two or more feature modules need the exact
  same behavior. If a caller needs a stricter or looser answer, keep the
  variant local and name the difference in a comment.
- Do not add feature imports to this module. It must stay free of domain
  dependencies so every runtime can safely depend on it.
- When a guard's answer changes, update the behavior matrix test beside this
  file; the test is the contract.
