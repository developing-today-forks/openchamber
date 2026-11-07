import type { EditorState } from '@codemirror/state';
export type DocumentSymbolKind = 'function' | 'method' | 'class' | 'type' | 'module' | 'heading';
export type DocumentSymbol = {
    name: string;
    kind: DocumentSymbolKind;
    /** 1-based line of the declaration. */
    line: number;
    /** Offset of the name, where the cursor lands. */
    from: number;
    /** Nesting for indentation: containing symbols, or a heading's level below 1. */
    depth: number;
};
/**
 * Every nameable declaration in document order. Parses up to `timeoutMs` to
 * cover the whole file; a file too large to parse in time lists what was
 * reached.
 */
export declare const readDocumentSymbols: (state: EditorState, timeoutMs?: number) => DocumentSymbol[];
