import type { MarkdownTokenRun } from './markdown-worker-protocol';
/** Test-only: clear client-side highlight memoization. */
export declare const resetMarkdownWorkerClientCacheForTests: () => void;
/**
 * Highlight a complete code block in the worker. Resolves to Shiki `<pre>` HTML,
 * or `null` if highlighting is unavailable or failed (caller keeps plain code).
 */
export declare const highlightCodeInWorker: (code: string, lang: string, options?: {
    transient?: boolean;
}) => Promise<string | null>;
/**
 * Highlight a whole block and return per-line inner HTML (one entry per source
 * line). For per-line layouts (diffs, gutters, virtualization) — one worker
 * round-trip instead of one per line. Resolves to `null` on failure.
 */
export declare const highlightLinesInWorker: (code: string, lang: string) => Promise<string[] | null>;
/** Return an already-tokenized line result without scheduling a worker request. */
export declare const getCachedHighlightedLines: (code: string, lang: string) => string[] | null;
/**
 * Tokenize `code` with the given resolved TextMate theme and return per-line
 * styled runs with offsets — for building CodeMirror decorations that match the
 * Shiki file view exactly. The full theme object is shipped only the first time
 * a theme name is seen by the live worker. Resolves to `null` on failure.
 */
export declare const highlightTokensInWorker: (code: string, lang: string, themeName: string, theme: unknown) => Promise<MarkdownTokenRun[][] | null>;
