import React from 'react';
import type { Session } from '@/lib/opencode/model';
import { normalizePath } from '@/lib/pathNormalization';
export { normalizePath };
export declare const selectExpandedParentKeysForContext: (previous: Set<string>, expanded: ReadonlySet<string>, context: 'project' | 'recent') => Set<string>;
export declare const toggleExpandedParentKey: (expanded: Set<string>, key: string) => Set<string>;
export declare const formatSessionDateLabel: (updatedMs: number) => string;
export declare const formatSessionCompactDateLabel: (updatedMs: number) => string;
export declare const isPathWithinProject: (directory?: string | null, projectPath?: string | null) => boolean;
export declare const isBranchDifferentFromLabel: (branch: string | null, label: string) => boolean;
/**
 * A worktree group is named after its branch as it is now. A listing names a
 * worktree by the branch it had then, or by its folder when it had none (a
 * worktree created detached, given a branch later); either follows the live
 * branch. Only a label that names something else is kept.
 */
export declare const resolveWorktreeGroupLabel: (meta: {
    label?: string | null;
    name?: string | null;
    branch?: string | null;
}, currentBranch: string | null, fallback: string) => string;
export declare const dedupeSessionsById: (sessions: Session[]) => Session[];
export declare const resolveArchivedFolderName: (session: Session, projectRoot: string | null) => string;
export declare const formatProjectLabel: (label: string) => string;
export declare const renderHighlightedText: (text: string, query: string) => React.ReactNode;
