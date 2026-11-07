import type { ProjectRef } from '@/lib/worktrees/worktreeManager';
import type { WorktreeMetadata } from '@/types/worktree';
export declare function useProjectWorktrees(projectRef: ProjectRef | null, isGitRepo: boolean | null, sessionsKey: string, listWorktrees: (project: ProjectRef) => Promise<WorktreeMetadata[]>): {
    availableWorktrees: WorktreeMetadata[];
    isLoadingWorktrees: boolean;
};
