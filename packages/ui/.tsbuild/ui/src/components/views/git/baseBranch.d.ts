export declare const branchRefLabel: (ref: string) => string;
/**
 * Derives the base ("target") branch a feature branch should compare and
 * merge against. Shared by GitView and the standalone pull-request surface so
 * both resolve the same base for the same repository state.
 */
export declare const deriveBaseBranch: (options: {
    /** Remotes authorized to supply the base branch. */
    remoteNames: ReadonlySet<string>;
    /** All repository remotes, used to reject a remote-qualified hint outside the binding. */
    knownRemoteNames?: ReadonlySet<string>;
    localBranches: readonly string[];
    worktreeCreatedFromBranch?: string | null;
    rootBranchHint?: string | null;
    /**
     * The repository's own default branch, read from a `remote/HEAD` symbolic
     * ref. Its own option rather than another hint: `rootBranchHint` means "the
     * branch the project root worktree is on", and a parameter that means two
     * things is one the next caller gets wrong.
     */
    defaultBranch?: string | null;
    /** Whether to guess a conventional branch when no repository authority resolves a base. */
    fallbackToConventional?: boolean;
    /**
     * The branch being compared. A branch is never its own base, so a candidate
     * equal to it is skipped — in a plain checkout `rootBranchHint` *is* the
     * current branch, and taking it produced a comparison with itself.
     */
    headBranch?: string | null;
}) => string;
/**
 * Whether a base branch can be resolved locally or through one of the active
 * remote-tracking refs. Callers must not offer comparisons against the `main`
 * fallback when that ref does not actually exist in the repository.
 *
 * `remoteBranches` are remote-relative (`origin/main`, `origin/feature/x`), so
 * the remote name is dropped and the rest compared whole. A suffix test matched
 * `origin/feature/main` for a base of `main`, which passes the check and then
 * fails the comparison it was meant to prevent.
 */
export declare const hasResolvableBaseBranch: (options: {
    baseBranch: string;
    localBranches: readonly string[];
    remoteBranches: readonly string[];
}) => boolean;
/**
 * The ref a comparison should actually name, for a base the person chose or
 * one detected for them.
 *
 * The range API honors refs literally: it never substitutes `origin/main` for
 * `main`, so a caller has to say which one it means. A bare name means the
 * branch a pull request merges into, which is the bound remote's copy, so the
 * remote-tracking ref wins and the local branch answers only when the remote
 * has none (a parent branch that was never pushed). An explicit `refs/heads/`
 * choice stays local. A repository answers to the remote it is bound to, so a
 * base on any other remote is a different project's branch with a familiar
 * name. Null means exactly that: no ref here is the base.
 */
export declare const qualifyBaseRef: (candidate: string | null | undefined, options: {
    localBranches: readonly string[];
    /** Remote-relative names, as `origin/main`. */
    remoteBranches: readonly string[];
    /** Every remote the repository configures, used to recognise a qualified hint. */
    remoteNames: ReadonlySet<string>;
    /** The remote this repository is bound to, if any. */
    primaryRemote: string | null | undefined;
}) => string | null;
/** Where a branch comparison's base came from, most authoritative first. */
export type BranchComparisonBaseSource = 'chosen' | 'pull-request' | 'created-from' | 'default';
/**
 * The base a branch is compared against: the person's choice, else the base
 * of the branch's open pull request (what it will actually merge into, and the
 * parent of a stacked branch even after a rebase), else what the reflog says
 * the branch was created from, else the repository's default branch. Each
 * candidate is qualified, and one that names no ref here, or the branch
 * itself or its own remote copy, gives way to the next.
 */
export declare const resolveBranchComparisonBase: (candidates: {
    chosen: string | null;
    pullRequest: string | null;
    createdFrom: string | null;
    defaultBranch: string | null;
}, options: Parameters<typeof qualifyBaseRef>[1] & {
    headBranch: string;
}) => {
    ref: string;
    source: BranchComparisonBaseSource;
} | null;
