import * as React from 'react';
export type BoardChoice = {
    /** What the host names it by: a label's name, a reviewer's id. */
    id: string;
    /** What the search matches. */
    label: string;
    content: React.ReactNode;
};
/**
 * Several of a list, picked with checks in a searchable popup: an item's
 * labels or a PR's reviewers. The choices are read when it opens; the new set
 * is handed over once, when it closes, so a few clicks are one change.
 */
export declare const SourceBoardChoicePicker: React.FC<{
    ariaLabel: string;
    searchPlaceholder: string;
    emptyText: string;
    selected: readonly string[];
    /** What is chosen now but may be past the one page the host lists. */
    selectedChoices: readonly BoardChoice[];
    loadChoices: () => Promise<BoardChoice[]>;
    onCommit: (ids: string[]) => void;
    busy: boolean;
}>;
