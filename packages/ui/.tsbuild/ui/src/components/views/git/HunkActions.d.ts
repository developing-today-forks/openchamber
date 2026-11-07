import React from 'react';
export type HunkDiffAction = 'stage' | 'unstage' | 'discard';
export type HunkBusyState = {
    index: number;
    action: HunkDiffAction;
} | null;
interface HunkActionsProps {
    index: number;
    staged: boolean;
    busyHunk: HunkBusyState;
    disabled: boolean;
    onAction: (hunkIndex: number, action: HunkDiffAction) => void;
}
export declare const HunkActions: React.NamedExoticComponent<HunkActionsProps>;
export {};
