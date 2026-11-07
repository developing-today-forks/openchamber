/**
 * Session → directory resolution precedence.
 *
 * A session's directory decides which OpenCode project every send, message
 * fetch, queue key, and confirmation lookup is routed to. Getting it wrong is
 * not a cosmetic problem: the prompt is posted against a directory that does
 * not own the session, the send is rejected, and the optimistic message is
 * rolled back with no visible error.
 *
 * The precedence below is deliberate and ordered by authority, not by
 * convenience:
 *
 * The ordering discriminator is **whether the server confirmed the path**, not
 * whether the value is local or synced:
 *
 * 1. `authoritative` — the session's own record, then a child store that holds
 *    it. Server-backed truth for an indexed session. Record first because
 *    holding a session proves containment, not ownership: a project's session
 *    list includes its worktrees' sessions so the sidebar can group them.
 * 2. `selected` — the directory captured when the session was selected, but
 *    only when it came from a server response (the directory `createSession`
 *    returned, which may be a canonicalized form of what was requested). A
 *    selection that fell back to the active directory is a guess and is not
 *    passed here at all.
 * 3. `attachment` / `worktreeMetadata` — the worktree this client assigned to
 *    the session. Both hold the *requested* path, before the server had a
 *    chance to canonicalize it, so they are a hint for a session sync has not
 *    indexed yet, never a correction of a confirmed one.
 * 4. `remembered` — the per-runtime directory persisted across restarts. Last
 *    resort: it survives reloads, so a value written from a startup fallback
 *    would otherwise outlive the race that produced it.
 *
 * Routing a prompt by an unconfirmed path posts it against a directory that
 * does not own the session, and the send is rejected. Moves need no exception:
 * a session move updates the owning child store before any client-side value.
 */
export type SessionDirectorySource = 'authoritative' | 'selected' | 'attachment' | 'worktree-metadata' | 'remembered' | 'none';
export type SessionDirectorySources = {
    /** The session record's own directory, or a store that holds it. */
    authoritative?: string | null;
    /** Server-confirmed directory captured at selection. Never a guessed one. */
    selected?: string | null;
    /** Worktree attachment recorded for this session; the requested path. */
    attachment?: string | null;
    /** Worktree metadata captured when the session was created in a worktree. */
    worktreeMetadata?: string | null;
    /** Directory persisted for this runtime; may outlive the race that wrote it. */
    remembered?: string | null;
};
export type SessionDirectoryResolution = {
    directory: string | null;
    source: SessionDirectorySource;
    /**
     * Set when a lower-priority source disagrees with the winning one. This is
     * the signature of the stale-directory bug: a persisted or selection-time
     * fallback pointing at the parent repository while the session lives in a
     * worktree.
     */
    conflict: {
        source: SessionDirectorySource;
        directory: string;
    } | null;
};
/**
 * Resolve a session directory from every known source, reporting which source
 * won and whether a weaker source disagreed.
 *
 * Callers normalize paths before passing them in; this module only orders
 * authority and never rewrites a path.
 */
export declare const resolveSessionDirectoryFromSources: (sources: SessionDirectorySources) => SessionDirectoryResolution;
/** Every source that carries a value, in precedence order. For diagnostics. */
export declare const describeSessionDirectorySources: (sources: SessionDirectorySources) => Array<{
    source: SessionDirectorySource;
    directory: string;
}>;
