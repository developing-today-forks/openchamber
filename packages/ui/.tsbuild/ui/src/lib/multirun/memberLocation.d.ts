import type { ProjectRef } from '@/lib/worktrees/worktreeManager';
import type { WorktreeMetadata } from '@/types/worktree';
export type RunMemberLocation = {
    project: ProjectRef;
    worktree: WorktreeMetadata | null;
};
export type RunMemberLocationSources = {
    /** Registered project paths, normalized. */
    projectPaths: readonly string[];
    /** The worktree this client recorded for the member, when it has one. */
    known: WorktreeMetadata | undefined;
    /** The project scope of a legacy member, searched first. */
    legacyScope: string | null;
    projectRefFor: (path: string) => ProjectRef;
    listWorktrees: (project: ProjectRef) => Promise<WorktreeMetadata[]>;
};
/**
 * Where a member running in `directory` lives: its project, and the worktree
 * when it has one. A member can run in the project's folder inside its
 * worktree (`<worktree>/ai` for a project at `repo/ai`), so the worktree is the
 * checkout that holds the directory. A checkout that holds a registered
 * project, such as the primary checkout `repo` of that project, is never the
 * member's worktree: removing it would remove the project.
 */
export declare function locateRunMember(directory: string, sources: RunMemberLocationSources): Promise<RunMemberLocation | null>;
