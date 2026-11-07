import React from 'react';
import type { GitStatus } from '@/lib/api/types';
interface ChangeRowProps {
    file: GitStatus['files'][number];
    actionLabel: string;
    actionSymbol: '+' | '-';
    onAction: () => void;
    onViewDiff: () => void;
    onRevert: () => void;
    isReverting: boolean;
    stats?: {
        insertions: number;
        deletions: number;
    };
    rowPaddingClassName?: string;
    indentPx?: number;
    /** Place the stage/unstage action at the row start (flat view) instead of the end (tree view). */
    actionAtStart?: boolean;
    /** Tree view: the directory rows above already say where the file lives. */
    nameOnly?: boolean;
    showRevert?: boolean;
}
export declare const ChangeRow: React.NamedExoticComponent<ChangeRowProps>;
export {};
