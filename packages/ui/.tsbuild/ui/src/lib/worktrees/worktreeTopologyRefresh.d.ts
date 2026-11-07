import { type ProjectRef } from '@/lib/worktrees/worktreeManager';
/**
 * Registered projects that own any of the directories a `worktree-changed`
 * event names. Directories are matched through the known worktree map first,
 * so a linked worktree resolves to the project that registered its repository.
 * Each project appears once.
 */
export declare const resolveProjectsForWorktreeChange: (directories: readonly string[]) => ProjectRef[];
/**
 * The registered project a newly created session certainly belongs to: the
 * project whose root is the session's directory, or the owner of a known
 * worktree that holds it. A directory that only sits under a registered
 * folder can be a worktree nobody has listed yet, of that project or of
 * another one, so it resolves to `null` and the caller runs full discovery.
 */
export declare const resolveProjectForCreatedSession: (directory: string, projects: ReadonlyArray<ProjectRef>) => ProjectRef | null;
/**
 * Refresh the published worktree topology for every registered project a
 * `worktree-changed` event touches, bypassing the listing cache. Used by the
 * surfaces that keep no separate raw topology (hosted mobile, mini chat).
 *
 * Each project is listed on its own; a failed listing keeps that project's
 * last known worktrees and does not block the others. Nothing is published
 * once `isCancelled` reports true or when the result equals the current map.
 */
export declare const refreshWorktreeTopologyForChange: (projects: ReadonlyArray<ProjectRef>, directories: readonly string[], isCancelled?: () => boolean) => Promise<void>;
