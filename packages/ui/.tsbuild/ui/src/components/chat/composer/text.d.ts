/**
 * Text-splicing rules for the composer.
 *
 * Everything that inserts into the prompt — dictation, preset chips, pasted
 * images, dropped files, revert-to-message — has to decide how the new text
 * meets the text already there. These are those decisions, kept together and
 * away from the component so they can be reasoned about (and tested) as plain
 * string functions.
 */
/**
 * Append `next` as its own block, separated by a blank line, and leave a blank
 * line after it so the user's caret starts on a fresh paragraph. Used when the
 * inserted text is a self-contained chunk (a reverted message, a quoted
 * excerpt) rather than a continuation of the sentence.
 */
export declare function appendWithLineBreaks(base: string, next: string): string;
/**
 * Append `next` to the end of the current sentence, with exactly one space
 * between them and a trailing space so the user can keep typing. Used for
 * dictation and for file mentions added from a drop.
 */
export declare function appendInlineText(base: string, next: string): string;
/**
 * Pad an insertion so it does not fuse with its neighbours, without adding
 * space where the surrounding punctuation already reads correctly: no space
 * after an opening bracket, none before a closing one or before sentence
 * punctuation.
 */
export declare function withInlineInsertionBoundaries(content: string, before: string, after: string): string;
/**
 * Pasting an image alongside text: the citation goes after whatever text came
 * with it, separated by a space.
 */
export declare function buildImagePasteInsertion(pastedText: string, citationText: string): string;
/**
 * Whether a pasted URL should wrap the selection as `[selected](url)`. A URL
 * containing whitespace is not one, and text that already looks like a link
 * is left alone rather than nested.
 */
export declare function shouldWrapSelectionAsLink(url: string, selected: string): boolean;
/**
 * Markdown source-mode conveniences handled before CodeMirror inserts a key.
 * The returned text change and selection belong to one editor transaction so
 * the caret cannot be applied against the previous document.
 */
export declare function getMarkdownAutoPairEdit(value: string, key: string, selectionStart: number, selectionEnd: number): {
    from: number;
    to: number;
    insert: string;
    selectionStart: number;
    selectionEnd: number;
} | null;
