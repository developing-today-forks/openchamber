/**
 * Where a new worktree's branch starts.
 *
 * Settings name one default for every place a worktree is made
 * (`worktreeStartFrom`, the default remote's default branch unless changed)
 * and an optional override per place (`worktreeStartFromOverrides`).
 * `project-root` is the branch the project root is on, refreshed from its
 * upstream when nothing is unpublished; `remote-default` is the default
 * remote's default branch, which the server fetches before it creates the
 * worktree.
 *
 * A worktree made from a pull request checks out the request's branch, so
 * commits push to it, or starts a new branch from its head
 * (`pullRequestWorktree` names the default; each place can switch it).
 *
 * A new-session draft can pick its own source beside its Auto-create worktree
 * switch: a worktree's branch, any local or remote branch, or a pull request.
 */
import type { GitBranch, SourceControlReadContext } from '@/lib/api/types';
import type { ChangeRequest } from '@/lib/source-control/types';
export declare const WORKTREE_START_FROM_OPTIONS: readonly ['project-root', 'remote-default'];
export type WorktreeStartFrom = (typeof WORKTREE_START_FROM_OPTIONS)[number];
export declare const DEFAULT_WORKTREE_START_FROM = "remote-default";
/** The places that make a worktree, each of which can override the default start. */
export declare const WORKTREE_START_PLACES: readonly ['autoCreate', 'quick', 'dialog', 'parallel', 'handoff', 'agent'];
export type WorktreeStartPlace = (typeof WORKTREE_START_PLACES)[number];
/** Absent means the place follows `worktreeStartFrom`. */
export type WorktreeStartFromOverrides = Partial<Record<WorktreeStartPlace, WorktreeStartFrom>>;
/** Where a worktree made at `place` starts: its override, else the default for all. */
export declare const selectWorktreeStartFrom: (settings: {
    settingsWorktreeStartFrom: WorktreeStartFrom;
    settingsWorktreeStartFromOverrides: WorktreeStartFromOverrides;
}, place: WorktreeStartPlace) => WorktreeStartFrom;
/** `check-out` puts the worktree on the request's branch; `branch-off` starts a new branch from its head. */
export declare const PULL_REQUEST_WORKTREE_MODES: readonly ['check-out', 'branch-off'];
export type PullRequestWorktreeMode = (typeof PULL_REQUEST_WORKTREE_MODES)[number];
/** What a draft picked beside its Auto-create worktree switch. */
export type WorktreeStartSource = 
/** A new branch from `ref`: a local branch, or `remotes/<remote>/<branch>`. */
{
    kind: 'ref';
    ref: string;
} | {
    kind: 'pull-request';
    number: number;
    title: string;
    context: SourceControlReadContext;
    /** A fork's head can only be checked out: the server refuses a new branch from it. */
    fromFork: boolean;
    /** Its branch is checked out in another worktree, so only a new branch can start from it. */
    headInUse: boolean;
    /** Start a new branch from the head instead of checking out the request's branch. */
    branchOff: boolean;
};
/**
 * The default remote's default branch as `remotes/<remote>/<branch>`, or null
 * when it names none. The default remote is `origin`, else the first remote by
 * name, and only that remote counts; its default branch is what its `HEAD`
 * points at, else `main` or `master` when it has one. The server applies the
 * same rule (`packages/web/server/lib/git/worktree-start-ref.js`).
 */
export declare const resolveRemoteDefaultStartRef: (branches: Pick<GitBranch, 'all' | 'defaultBranches'>) => string | null;
/** How a start ref reads in a picker: `origin/main` for `remotes/origin/main`. */
export declare const formatStartRefLabel: (ref: string) => string;
/** The source picker's branch groups. */
interface StartSourceBranchGroups {
    /** Checked out in a worktree: the project root's branch first, then each worktree's. */
    checkedOut: string[];
    /** Local branches no worktree has checked out, pushed anywhere or not. */
    local: string[];
    /** Remote-tracking branches as `<remote>/<branch>`. */
    remote: string[];
}
/**
 * Splits a branch list for the source picker, so a branch shows once: under
 * the worktree it is checked out in, else as a local or a remote branch.
 */
export declare const groupStartSourceBranches: (all: readonly string[], rootBranch: string, worktreeBranches: readonly string[]) => StartSourceBranchGroups;
type PullRequestSource = Extract<WorktreeStartSource, {
    kind: 'pull-request';
}>;
type PullRequestSourceCheck = {
    ok: true;
    source: PullRequestSource;
} | {
    ok: false;
    reason: 'not-found' | 'not-open' | 'branch-in-use';
};
/** Whether the worktree can check out the request's branch, and whether it can branch off it. */
export declare const pullRequestWorktreeChoices: (source: Pick<PullRequestSource, 'fromFork' | 'headInUse'>) => {
    checkOut: boolean;
    branchOff: boolean;
};
/**
 * Whether a pull request can be a draft's worktree source: it exists, it is
 * open, and at least one way to make its worktree is left. Its branch can be
 * checked out in one worktree only, and a new branch cannot start from a
 * fork's head. The pick starts on the Settings mode when that mode is possible.
 * A failed read throws.
 */
export declare const checkPullRequestSource: ({ context, number, mode, readChangeRequest, isBranchInUse }: {
    context: SourceControlReadContext;
    number: number;
    /** The Settings default for pull request worktrees. */
    mode: PullRequestWorktreeMode;
    readChangeRequest: (context: SourceControlReadContext, number: number) => Promise<ChangeRequest | null>;
    isBranchInUse: (branch: string) => Promise<boolean>;
}) => Promise<PullRequestSourceCheck>;
export {};
