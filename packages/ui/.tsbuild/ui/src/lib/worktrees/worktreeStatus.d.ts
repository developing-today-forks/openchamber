import type { WorktreeMetadata } from '@/types/worktree';
export declare function getWorktreeStatus(worktreePath: string): Promise<WorktreeMetadata['status']>;
export declare function canDeleteWorktreeWithoutConfirm(status: WorktreeMetadata['status']): boolean;
/**
 * Invalidate cached project-root resolutions. Call this when the worktree
 * topology changes (e.g. after creating or removing a worktree), since that can
 * alter which primary root a directory resolves to. With no argument, the whole
 * cache is cleared.
 */
export declare function invalidateResolvedProjectRootCache(directory?: string): void;
export declare const resolveProjectRoot: (directory: string) => Promise<string>;
export declare function getRootBranch(projectDirectory: string, options?: {
    knownBranch?: string;
}): Promise<string>;
