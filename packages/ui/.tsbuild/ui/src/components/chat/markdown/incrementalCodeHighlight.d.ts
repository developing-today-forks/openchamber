import type { GrammarState } from 'shiki';
type RenderedChunk = {
    html: string;
    grammarState: GrammarState | undefined;
};
/** Renders `chunk` to full Shiki `<pre>` HTML, continuing from `grammarState`. */
export type ChunkRenderer = (chunk: string, lang: string, grammarState: GrammarState | undefined) => RenderedChunk;
export type RenderedLines = {
    open: string;
    lines: string[];
    close: string;
};
/** Splits Shiki `<pre>` HTML into its wrapper and one entry per line. */
export declare const splitRendered: (html: string) => RenderedLines | null;
export declare const createIncrementalCodeHighlighter: ({ render, maxLineages, maxLineageChars, }: {
    render: ChunkRenderer;
    maxLineages?: number;
    maxLineageChars?: number;
}) => {
    highlight: (code: string, lang: string) => string | null;
    highlightLines: (code: string, lang: string, fromLine?: number) => RenderedLines | null;
    reset(): void;
};
export {};
