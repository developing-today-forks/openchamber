export declare const loadMarkdownRendererModule: () => Promise<typeof import("./MarkdownRendererImpl")>;
/**
 * The module once it has loaded, so a renderer can mount synchronously instead
 * of suspending. A lazy component that suspends — even on an already-resolved
 * promise — shows its fallback for a tick, and React then throttles the reveal
 * of every boundary that resolves in the following ~300ms, which is how a
 * freshly opened session showed user text first and assistant text a third of
 * a second later.
 */
export declare const getLoadedMarkdownRendererModule: () => typeof import("./MarkdownRendererImpl") | null;
export declare const preloadMarkdownRenderer: () => void;
