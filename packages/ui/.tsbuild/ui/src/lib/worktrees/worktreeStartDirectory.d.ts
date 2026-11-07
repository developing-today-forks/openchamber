/**
 * Where a session in a worktree starts. A project opened on a folder inside its
 * repository (`repo/ai` rather than `repo`) works from that folder, so the
 * sessions of its worktrees start in the same folder of the checkout, where the
 * OpenCode config lives. The worktree root stays the identity of the checkout
 * for Git, bootstrap, removal and moves; only the session directory takes the
 * folder.
 */
import type { ProjectRef } from '@/lib/openchamberConfig';
import type { WorktreeMetadata } from '@/types/worktree';
/** Why a session starts at the worktree root although the project opens on a folder, or could not tell. */
type StartDirectoryFallback = 'unknown' | 'missing' | 'unverified';
type WorktreeStartDirectory = {
    directory: string;
    fallback: null;
} | {
    directory: string;
    fallback: StartDirectoryFallback;
    folder: string | null;
};
export type WorktreeStartDirectoryDeps = {
    /** The project's folder inside its repository; `''` when the project is the repository root. Rejects when unknown. */
    readProjectFolder: (project: ProjectRef) => Promise<string>;
    /** Resolves once the checkout's files exist; rejects when the worktree failed to populate. */
    waitForCheckout: (worktreeRoot: string) => Promise<void>;
    /** Whether `directory` exists inside the checkout, symlinks resolved. */
    directoryInsideCheckout: (directory: string, worktreeRoot: string) => Promise<boolean>;
};
/**
 * The directory a session in `worktreeRoot` starts in. A project at the root of
 * its repository starts at the root and nothing waits. A project on a folder
 * waits for the checkout, then confirms the same folder exists inside it: a
 * branch that lacks the folder, a failed check, or a folder git cannot report
 * each answer with the root and name the reason, so a caller can tell the user.
 */
export declare const resolveStartDirectory: (project: ProjectRef, worktreeRoot: string, deps?: WorktreeStartDirectoryDeps) => Promise<WorktreeStartDirectory>;
/** `resolveStartDirectory` for callers that only need the path; a fallback is shown as a warning toast. */
export declare const resolveWorktreeStartDirectory: (project: ProjectRef, worktreeRoot: string) => Promise<string>;
export type CreatedWorktreeStartDeps = {
    resolve: (project: ProjectRef, worktreeRoot: string) => Promise<string>;
    /** Removes the worktree and its local branch. */
    remove: (project: ProjectRef, worktree: WorktreeMetadata) => Promise<void>;
};
/**
 * `resolveWorktreeStartDirectory` for a worktree the caller has just created.
 * It rejects only when the checkout failed to populate; that worktree and its
 * branch are of no use to anyone, so they are removed before the error is
 * rethrown. A failed removal is logged and the original error still wins.
 */
export declare const resolveCreatedWorktreeStartDirectory: (project: ProjectRef, worktree: WorktreeMetadata, deps?: CreatedWorktreeStartDeps) => Promise<string>;
export {};
