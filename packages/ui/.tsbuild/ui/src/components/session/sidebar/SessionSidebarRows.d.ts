import React from 'react';
import type { SessionSidebarRow, SessionSidebarRowModel } from './sessionSidebarRowModel';
type Props = {
    model: SessionSidebarRowModel;
    scrollElement: HTMLElement | null;
    pinnedRowIndexes: ReadonlySet<number>;
    renderRow: (row: SessionSidebarRow, index: number) => React.ReactNode;
    onFirstVisibleIndexChange: (index: number) => void;
    /** A row to scroll into view; a new nonce scrolls again. */
    revealIndex?: {
        index: number;
        nonce: number;
    } | null;
};
export declare function SessionSidebarRows({ model, scrollElement, pinnedRowIndexes, renderRow, onFirstVisibleIndexChange, revealIndex, }: Props): React.ReactNode;
export {};
