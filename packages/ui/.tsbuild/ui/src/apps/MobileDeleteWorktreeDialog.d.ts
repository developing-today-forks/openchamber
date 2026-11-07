import React from 'react';
import { type ProjectRef } from '@/lib/worktrees/worktreeManager';
import type { WorktreeMetadata } from '@/types/worktree';
type MobileDeleteWorktreeDialogProps = {
    open: boolean;
    project: ProjectRef;
    worktree: WorktreeMetadata | null;
    onClose: () => void;
    onDeleted?: () => void;
};
/**
 * Mobile worktree-deletion confirmation. It mirrors the desktop flow: remove
 * the worktree first, then archive its linked sessions. Branch deletion is
 * optional.
 */
export declare const MobileDeleteWorktreeDialog: React.FC<MobileDeleteWorktreeDialogProps>;
export {};
