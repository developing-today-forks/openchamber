/**
 * Register the static, CSS-variable-driven Shiki theme with `@pierre/diffs`.
 * Safe to call multiple times; only the first call registers.
 *
 * NOTE: markdown code highlighting now runs through the dedicated Shiki worker
 * (`markdown-worker`), which uses the raw theme definition directly. This
 * registration remains only for any `@pierre/diffs`-based consumer of the
 * `openchamber-md` theme name.
 */
export declare const ensureMarkdownShikiTheme: () => void;
