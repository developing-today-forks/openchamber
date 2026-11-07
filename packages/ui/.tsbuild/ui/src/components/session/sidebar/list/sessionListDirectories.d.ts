import type { WorktreeMetadata } from '@/types/worktree';
export declare const buildKnownSessionDirectories: (projects: Array<{
    path: string;
}>, availableWorktreesByProject: Map<string, WorktreeMetadata[]>, options?: {
    includeWorktrees?: boolean;
}) => Set<string>;
