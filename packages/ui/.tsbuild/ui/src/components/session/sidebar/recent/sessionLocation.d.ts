import type { Session } from '@/lib/opencode/model';
import type { WorktreeMetadata } from '@/types/worktree';
import type { DirectoryOwner } from '../sessions/sessionOwnership';
type SidebarSessionLocationProject = {
    id: string;
    label?: string;
    normalizedPath: string;
};
export type SidebarSessionLocation = {
    projectId: string | null;
    groupDirectory: string | null;
    projectLabel: string | null;
    branchLabel: string | null;
    /** True for a session of an isolated space: `branchLabel` is then the space's name, not a branch. */
    inSpace: boolean;
    worktree: WorktreeMetadata | null;
};
type ResolveArgs = {
    sessions: readonly Session[];
    projects: readonly SidebarSessionLocationProject[];
    /**
     * Authoritative session → owner index. Managed worktrees live outside the
     * project path (OpenCode keeps them under its data directory), so a path
     * prefix match alone never finds their project.
     */
    ownerBySessionId: ReadonlyMap<string, DirectoryOwner>;
    availableWorktreesByProject: ReadonlyMap<string, WorktreeMetadata[]>;
    gitBranches: ReadonlyMap<string, string | null>;
    homeDirectory: string | null;
    /**
     * Live branch of each project's root directory. Supplied by surfaces that
     * show the branch for root-directory sessions too; Recent omits it because
     * it only labels worktree rows.
     */
    rootBranchByProjectId?: ReadonlyMap<string, string | null>;
    /**
     * Recent hides a branch that repeats the project label, because the row
     * already carries that label. Timeline shows both lines unconditionally.
     */
    hideBranchMatchingProjectLabel: boolean;
    /**
     * The display name of each isolated space by id. A session owned by a space
     * is labelled with the space's name where a worktree session shows its
     * branch, and its group is the space's directory.
     */
    spaceLabelById?: ReadonlyMap<string, string>;
};
export declare const resolveSidebarSessionLocations: ({ sessions, projects, ownerBySessionId, availableWorktreesByProject, gitBranches, homeDirectory, rootBranchByProjectId, hideBranchMatchingProjectLabel, spaceLabelById, }: ResolveArgs) => Map<string, SidebarSessionLocation>;
export {};
