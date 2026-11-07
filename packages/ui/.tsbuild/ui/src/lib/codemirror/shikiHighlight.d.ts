import type { Extension } from '@codemirror/state';
type ShikiHighlightOptions = {
    /** Shiki language id (e.g. 'typescript'). */
    language: string;
    /** App theme id — the registered TextMate theme name to tokenize with. */
    themeName: string;
    /** Resolved TextMate theme object (shipped to the worker once per name). */
    theme: unknown;
};
/**
 * CodeMirror extension that colors the document with Shiki tokens via the
 * worker. Recreate it (new instance) when the language or theme changes.
 */
export declare const shikiHighlightExtension: (options: ShikiHighlightOptions) => Extension;
export {};
