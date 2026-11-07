import type { Extension } from '@codemirror/state';
/**
 * `drawSelection()` with its CSS blink switched off and the timer blink above
 * in its place. A blink rate of 0 wins over any other `drawSelection()` in the
 * same editor, because CodeMirror keeps the smallest configured rate.
 */
export declare const timerCaretBlink: () => Extension;
