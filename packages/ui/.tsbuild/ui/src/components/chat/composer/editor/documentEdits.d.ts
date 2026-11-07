import type { EditorState, TransactionSpec } from '@codemirror/state';
/**
 * Replace a document range and leave the caret inside the resulting document.
 *
 * CodeMirror normalizes line endings on the way in: a `\r\n` pair becomes one
 * line break, so the inserted string is longer than the text it produces. A
 * caret derived from the JavaScript string therefore lands past the end of the
 * document and `dispatch` throws `RangeError: Selection points outside of
 * document`. The transaction never applies, so the un-normalized text stays in
 * React state, gets persisted as a draft, and crashes the chat again on every
 * restore (issue #3013).
 *
 * Deriving the caret from the change set instead keeps it correct for whatever
 * CodeMirror actually inserted, without this module having to know the
 * normalization rules.
 */
export declare const replaceWithCaret: (state: EditorState, from: number, to: number, insert: string, caret?: {
    anchor: number;
    head: number;
}) => TransactionSpec;
