/**
 * The draft's "Auto-create worktree" switch: the first prompt of a new session
 * gets its own worktree before the session is created.
 *
 * The composer starts it right before the send and marks the draft with a
 * pending worktree request; draft materialization already waits on that
 * request, so the session is created in the new worktree. Naming is a
 * convenience and never blocks: a failed or empty generated name falls back to
 * the random name Quick worktree uses. A failed creation fails the send, so the
 * prompt returns to the composer instead of running in the project root.
 *
 * The new branch starts where the draft's source picker says, else where
 * Settings say for Auto-create worktree. A pull request as the source is read
 * again at send time so the worktree gets its current head. Checking out its
 * branch makes a typed name name only the folder; branching off it names the
 * new branch like any other auto-created worktree.
 */
import { resolvePrWorktreeConfig } from '@/components/session/prWorktreeConfig';
import type { SourceControlAPI } from '@/lib/api/types';
import type { CreateWorktreeArgs, ProjectRef } from '@/lib/worktrees/worktreeManager';
import type { WorktreeStartFrom, WorktreeStartSource } from '@/lib/worktrees/worktreeStartSource';
import { type NewSessionDraftState } from '@/sync/session-ui-store';
type AutoWorktreeTarget = {
    kind: 'path';
    path: string;
} | {
    kind: 'name';
    name: string;
} | {
    kind: 'generate';
};
/** What the optional name field asks for: an exact path, a name, or a name made from the prompt. */
export declare const parseAutoWorktreeName: (typed: string | undefined) => AutoWorktreeTarget;
/**
 * A plain name is the directory under the worktree root, like Quick worktree;
 * an exact path is the checkout itself. The branch is named from either by a
 * Settings template (`branchNameFor`).
 */
export declare const toAutoWorktreeCreateArgs: (target: Exclude<AutoWorktreeTarget, {
    kind: 'generate';
}>, branchName: string) => Pick<CreateWorktreeArgs, 'preferredName' | 'branchName' | 'worktreeName'>;
/**
 * The branch for a named worktree: the template filled with its name made fit
 * for a branch (a path's last segment), and a `-2`, `-3`… suffix when a local
 * branch already has the name, so two prompts that name the same task still
 * get two branches.
 */
export declare const branchNameFor: (target: Exclude<AutoWorktreeTarget, {
    kind: 'generate';
}>, template: string, localBranches: ReadonlySet<string>, pullRequest?: {
    pr: number;
    head: string;
}) => string;
/**
 * A pull request worktree checks out the request's own branch, as the New
 * worktree dialog does. A typed name or path names only the folder; without
 * one the folder is named after the branch.
 */
export declare const toPullRequestWorktreeArgs: (config: ReturnType<typeof resolvePrWorktreeConfig>, target: AutoWorktreeTarget) => CreateWorktreeArgs;
/**
 * A new branch from a pull request's head is named by the pull request branch
 * template; the server starts it at the head it resolves from the request.
 */
export declare const toPullRequestBranchOffArgs: (config: ReturnType<typeof resolvePrWorktreeConfig>, target: Exclude<AutoWorktreeTarget, {
    kind: 'generate';
}>, branchName: string) => CreateWorktreeArgs;
/**
 * The switch applies only to a project draft still aimed at the project root
 * of a git repository: a draft that already targets a worktree (Quick
 * worktree, the New Worktree dialog, a selected worktree) or a space keeps it.
 */
export declare const shouldAutoCreateDraftWorktree: ({ enabled, draft, projectPath, isGitRepo }: {
    enabled: boolean;
    draft: Pick<NewSessionDraftState, 'open' | 'target' | 'directoryOverride' | 'pendingWorktreeRequestId' | 'bootstrapPendingDirectory'>;
    projectPath: string | null;
    isGitRepo: boolean | null;
}) => boolean;
/** A name made from the prompt by the given model, or '' when none could be made. */
export declare const generateAutoWorktreeName: (projectDirectory: string, prompt: string, model: string) => Promise<string>;
/**
 * Starts the worktree for a draft that is about to send and returns the
 * pending request the draft now waits on. The live draft is marked too, so the
 * target selector shows the worktree being made and cannot be changed under it.
 */
export declare const startAutoDraftWorktree: ({ project, prompt, model, typedName, source, startFrom, branchTemplates, sourceControl, fallbackDirectory }: {
    project: ProjectRef;
    prompt: string;
    /** `providerID/modelID` the first prompt is sent with; it also names the worktree. */
    model: string;
    typedName: string | undefined;
    /** Picked beside the switch for this project; undefined means the Settings default. */
    source: WorktreeStartSource | undefined;
    startFrom: WorktreeStartFrom;
    /** Settings templates that name the new branch. */
    branchTemplates: {
        worktree: string;
        pullRequest: string;
    };
    /** Reads a pull request source as it is now. */
    sourceControl: Pick<SourceControlAPI, 'changeRequestContext'>;
    /** Where the draft pointed before, restored when no worktree could be made. */
    fallbackDirectory: string;
}) => string;
export {};
