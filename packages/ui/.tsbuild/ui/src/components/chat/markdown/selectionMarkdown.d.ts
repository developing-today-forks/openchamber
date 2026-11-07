export type RenderedCopyFormat = 'markdown' | 'plain';
/** Markdown (or its plain reading) for a detached fragment or element of rendered chat markdown. */
export declare const serializeRenderedMarkdown: (root: Element | DocumentFragment, format?: RenderedCopyFormat) => string;
/** The plain reading of a rendered markdown HTML string, for the message copy button. */
export declare const renderedMarkdownHtmlToPlainText: (html: string, doc: Document) => string;
/**
 * The selected part of one rendered markdown block as Markdown (or its plain
 * reading), or null when the range is not inside a single markdown root.
 *
 * Formatting inside the selection is kept. `cloneContents` drops the ancestors
 * the range starts and ends in, so a selection that crosses blocks is
 * re-nested in shallow copies of them: two list items stay a list, two table
 * cells stay a table. A selection within one text block (part of a list item,
 * a table cell, a bold run) is not re-nested and copies as the text itself.
 */
export declare const getMarkdownSelectionText: (range: Range, format?: RenderedCopyFormat) => string | null;
