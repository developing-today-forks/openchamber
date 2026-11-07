import React from 'react';
import { EditorView } from '@codemirror/view';
type DocumentSymbolsPanelProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** A ref, never the view itself; see `GoToLineDialog` for why (react#34840). */
    viewRef: React.RefObject<EditorView | null>;
};
/**
 * The open file's functions, classes, types or headings, filtered as you
 * type; picking one puts the cursor on its name. Read from the syntax tree
 * when the panel opens, so it describes the file as it is now.
 */
export declare function DocumentSymbolsPanel({ open, onOpenChange, viewRef }: DocumentSymbolsPanelProps): import("react/jsx-runtime").JSX.Element | null;
export {};
