import type { Extension } from '@codemirror/state';
/**
 * Editing help that needs no language server: the matching bracket lights up
 * and brackets and quotes close themselves. Word completion is deliberately
 * left out.
 */
export declare const bracketAids: () => Extension;
/**
 * Several cursors: Alt+click adds one, Alt+drag selects a rectangle, and
 * Cmd/Ctrl+D adds the next occurrence of the selection. Desktop only: drawing
 * the selection itself replaces the native one, whose handles a touch screen
 * needs. Vim keeps Ctrl+D for scrolling half a page, so the key is left to it.
 */
export declare const multipleCursors: ({ vimMode }: {
    vimMode: boolean;
}) => Extension;
