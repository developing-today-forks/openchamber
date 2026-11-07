/** The parts of the reference list both the picker and the board lay out; state lives in `useReferenceBrowser`. */
import * as React from 'react';
import { type ReferencePickerItem } from './referencePickerItems';
import { type ReferenceBrowser } from './useReferenceBrowser';
/** Issues and pull requests (merge requests on GitLab); GitHub only. */
export declare const ReferenceBrowserTabs: React.FC<{
    browser: ReferenceBrowser;
}>;
/** The search field, taking the room it is given, and the filter beside it. */
export declare const ReferenceBrowserSearch: React.FC<{
    browser: ReferenceBrowser;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}>;
/** What a row adds on a surface that checks items; a board row has none of it. */
type ReferenceBrowserRowSelection = {
    /** Null where rows have no checkbox. */
    checked: boolean | null;
    diffIncluded: boolean;
    onToggle: () => void;
};
/** The list with its loading, failure, empty and not-connected states. */
export declare const ReferenceBrowserList: React.FC<{
    browser: ReferenceBrowser;
    label: string;
    multiselectable: boolean;
    onOpenSettings: () => void;
    rowSelection?: (item: ReferencePickerItem, key: string) => ReferenceBrowserRowSelection;
    onActivate?: (item: ReferencePickerItem) => void;
    /** After a row is clicked to show it, as when the list closes then. */
    onShow?: () => void;
    /** A quiet line above the rows, such as the repositories a list across several left out. */
    notice?: React.ReactNode;
}>;
export {};
