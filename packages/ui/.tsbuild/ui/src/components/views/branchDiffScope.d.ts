/**
 * Pure helpers backing the "Branch" diff scope in DiffView. Extracted so the
 * coercion, availability, and range-cache invalidation contracts are testable
 * without mounting the full diff surface.
 */
/**
 * The "Branch" scope exists while the current branch has a comparison base:
 * chosen, an open pull request's, the one it was created from, or the default
 * branch (the caller decides runtime availability). Resolution skips a base
 * that is the branch itself, so on the default branch with nothing else to
 * compare against the option is not offered. Until the base resolves the
 * option stays hidden instead of flashing on a guess.
 */
export declare const isBranchScopeAvailable: (currentBranch: string | null, base: string | null) => boolean;
/**
 * Confirmed unavailability of the Branch scope, as opposed to "not (yet)
 * known". Coercion of a persisted branch scope must wait for this: while the
 * base is resolving the option stays hidden, but rewriting the persisted scope
 * to working on that first render would discard the user's choice the moment
 * the base arrives.
 *
 * - `isBranchStatusResolved` distinguishes "no branch yet because the first
 *   status load has not settled" (unknown — keep the persisted scope) from
 *   "status finished and there is no branch" (detached HEAD / failed load —
 *   the Branch scope is impossible and the scope must coerce away).
 * - `isBaseResolved` with a null base means every candidate answered and none
 *   names a base: the scope must coerce too, otherwise a persisted branch
 *   scope spins on base resolution forever.
 */
export declare const isBranchScopeDefinitelyUnavailable: (currentBranch: string | null, base: string | null, isBranchStatusResolved: boolean, isBaseResolved: boolean) => boolean;
/**
 * A context tab persists its scope across branch checkouts and runtime
 * switches. When the Branch scope stops being offered (checked out the
 * default branch, VS Code runtime), fall back to a always-available one instead
 * of rendering the base-resolution spinner forever.
 */
export declare const coerceDiffScope: <T extends string>(scope: T, branchScopeAvailable: boolean) => T | 'working';
/**
 * Bounded per-directory retry for a request whose failure leaves no result and
 * no signal beyond the in-flight flag settling back to false.
 *
 * - State carries its directory: after a directory switch the derived
 *   attempts/exhausted values reset IMMEDIATELY on the first render of the new
 *   directory (no reset effect, so no one-render window where a stale
 *   `exhausted: true` from the previous directory leaks into decisions).
 * - Retries stop after `maxAttempts` and report exhaustion instead of looping
 *   forever against a dead target.
 * - An in-flight request (possibly started by another mounted consumer of the
 *   same directory) suppresses duplicate starts.
 */
export declare const useBoundedDirectoryRetry: (directory: string | null, isEnabled: boolean, isRequestInFlight: boolean, hasResult: boolean, startRequest: () => void, maxAttempts: number) => boolean;
/**
 * Per-file revisions of a Branch listing for `useRangeKeyedCache`. A file the
 * server fingerprints refreshes only when that fingerprint moves; a listing
 * without one (an older server) falls back to the status revision, which moves
 * on every status read.
 */
export declare const branchPathRevisions: (files: ReadonlyArray<{
    path: string;
    revision?: string;
}> | null, statusRevision: string) => ReadonlyMap<string, string>;
/**
 * Per-path cache of lazily fetched values, valid within a single range.
 *
 * - Changing `rangeKey` clears every entry (new base/head/directory = new
 *   content for the same paths).
 * - Each expanded path is reserved with `placeholder` before its fetch starts,
 *   so a re-run does not issue a duplicate request.
 * - Completions from a previous run can never write into the new range's
 *   cache: every run is cancelled in its cleanup, and its callbacks ignore
 *   results after cancellation. This covers the stale-completion case where an
 *   old `fetchEntry` promise resolves (or rejects) after the range switched.
 * - Reservations that never completed are released on cleanup so a later run
 *   retries those paths instead of showing the placeholder forever.
 * - A revision change refreshes requested paths while retaining completed
 *   same-range values until replacement. Unchanged revisions do no extra work;
 *   closed paths refresh when requested again. Range switches hide old values
 *   immediately, before effects run.
 * - `pathRevisions` adds a revision per path on top of `revision`, so a path
 *   refreshes only when its own entry moves. A path missing from the map
 *   refreshes with `revision` alone.
 */
export declare const useRangeKeyedCache: <T>(rangeKey: string | null, pathsKey: string, fetchEntry: ((path: string) => Promise<T>) | null, placeholder: T, revision?: string, pathRevisions?: ReadonlyMap<string, string>) => ReadonlyMap<string, T>;
