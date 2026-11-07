import React from 'react';
import type { Extension } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
export type BlockWidgetDef = {
    afterLine: number;
    id: string;
    content: React.ReactNode;
};
type CodeMirrorEditorProps = {
    value: string;
    onChange: (value: string) => void;
    extensions?: Extension[];
    className?: string;
    readOnly?: boolean;
    lineNumbersConfig?: Parameters<typeof lineNumbers>[0];
    highlightLines?: {
        start: number;
        end: number;
    };
    blockWidgets?: BlockWidgetDef[];
    onViewReady?: (view: EditorView) => void;
    onViewDestroy?: () => void;
    enableSearch?: boolean;
    searchOpen?: boolean;
    onSearchOpenChange?: (open: boolean) => void;
    vimMode?: boolean;
    /**
     * Takes the editor's DOM out of the document while true, keeping its state,
     * and puts it back, at the same scroll position, when false. For a host
     * that hides the editor: hiding it in place (aria-hidden, inert,
     * display: none) costs Chrome a 200 to 300 ms frame whenever an
     * accessibility client is on, while removing the DOM costs a few ms.
     */
    detached?: boolean;
};
export declare function CodeMirrorEditor({ value, onChange, extensions, className, readOnly, lineNumbersConfig, highlightLines, onViewReady, onViewDestroy, blockWidgets, enableSearch, searchOpen, onSearchOpenChange, vimMode, detached, }: CodeMirrorEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
