import React from 'react';
import type { WorktreeMetadata } from '@/types/worktree';
type MobileEditableProject = {
    id: string;
    label: string;
    path: string;
    icon?: string | null;
    color?: string | null;
    iconImage?: {
        mime: string;
        updatedAt: number;
        source: 'custom' | 'auto';
    } | null;
    iconBackground?: string | null;
    isGitRepo: boolean;
    worktrees: WorktreeMetadata[];
};
type MobileProjectEditSurfaceProps = {
    open: boolean;
    project: MobileEditableProject | null;
    onClose: () => void;
    /** Called after a worktree is deleted so the parent can re-list worktrees. */
    onWorktreesChanged?: () => void;
};
export declare const MobileProjectEditSurface: React.FC<MobileProjectEditSurfaceProps>;
export {};
