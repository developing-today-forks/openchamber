import React from 'react';
import type { GitStatus } from '@/lib/api/types';
export interface ChangesGroupConfig {
    /** Stable id (e.g. 'staged' | 'unstaged'). */
    id: string;
    title: string;
    entries: GitStatus['files'];
    /** Which diff stat scope this group's line counts come from. */
    statsScope: 'staged' | 'working';
    /** Per-file primary action: '+' stages, '-' unstages. */
    actionSymbol: '+' | '-';
    /** aria/title for the bulk header action (stage all / unstage all). */
    actionAllLabel: string;
    getActionLabel: (path: string) => string;
    onActionFile: (path: string) => void;
    onActionAll: (paths: string[]) => void;
    onViewDiff: (path: string) => void;
    onRevertFile: (path: string) => void;
    showRevertActions?: boolean;
    /** Visually mark this group as "ready to commit". */
    accent?: boolean;
}
interface ChangesPanelProps {
    groups: ChangesGroupConfig[];
    diffStats: GitStatus['diffStats'];
    revertingPaths: Set<string>;
    isRevertingAll?: boolean;
    headerBackgroundClassName?: string;
    onVisiblePathsChange?: (paths: string[]) => void;
    /** Reverts every changed path across all groups; rendered once for the panel. */
    onRevertAll?: (paths: string[]) => Promise<void> | void;
    onRevertDirectory?: (paths: string[]) => Promise<void> | void;
}
export declare const ChangesPanel: React.FC<ChangesPanelProps>;
export {};
