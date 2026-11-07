import type { WorktreeMetadata } from '@/types/worktree';
/**
 * When the store-based WorktreeMetadata lookup fails, this hook falls back to
 * narrow git runtime APIs to detect whether `currentDirectory` is a secondary
 * worktree. If it is, a minimal
 * WorktreeMetadata is synthesised so that "Re-integrate commits" and other
 * worktree features can function without explicit store entries.
 *
 * @param currentDirectory  Effective directory for the active session/tab.
 * @param storeMetadata     Result of the normal store-based lookup (may be undefined).
 * @param currentBranch     Current git branch (from status?.current in the parent).
 */
export declare function useDetectedWorktreeMetadata(currentDirectory: string | undefined, storeMetadata: WorktreeMetadata | undefined, currentBranch: string | undefined): WorktreeMetadata | undefined;
