import { type FingerprintState } from './highlightResultCache';
import { type OpenFencePatch } from './openFenceIncremental';
/**
 * `inline` draws every image. `label` draws none: the image becomes its file
 * name (assistant text, whose settled local images are then drawn in place,
 * see inlineMarkdownImages.ts). `local` draws images
 * from this machine and `data:` images, and turns a remote one into a link.
 * A remote image loads by itself the moment it renders, so in output the
 * model or a tool wrote (tool results, reasoning) it could report what the
 * user is reading to any server; a link waits for a click.
 */
export type MarkdownImageMode = 'inline' | 'label' | 'local';
/**
 * `escape` keeps raw HTML visible as text (assistant output and every other
 * untrusted surface). `sanitize` renders it through a GitHub-like allowlist and
 * is for documents a user opens to read, such as a README in the Files preview.
 */
export type MarkdownRawHtmlMode = 'escape' | 'sanitize';
type MarkdownBlock = {
    raw: string;
    src: string;
    mode: 'full' | 'live';
    highlight: boolean;
    plainText?: true;
    openFence?: true;
    segment?: Segment;
};
type Segment = {
    start: number;
    end: number;
    fence?: {
        char: string;
        size: number;
        lines: number;
    };
    fingerprint?: FingerprintState;
};
/** Test-only: reset and read the pipeline work counters. */
export declare const resetPipelineStatsForTests: () => void;
export declare const __pipelineStatsForTests: () => {
    lexedChars: number;
    parsedChars: number;
    hashedChars: number;
    sanitizeCalls: number;
    sanitizedChars: number;
};
/** Test-only: forget remembered splits and read how many were reused. */
export declare const resetLiveSplitMemoForTests: () => void;
export declare const __liveSplitStatsForTests: () => {
    reused: number;
    lexed: number;
    settled: number;
};
export declare const __streamBlocksForTests: (text: string, live: boolean) => Array<Pick<MarkdownBlock, 'raw' | 'src' | 'mode' | 'highlight'>>;
/** Test-only: reset and read the `start` search counters. */
export declare const resetScanStatsForTests: () => void;
export declare const __scanStatsForTests: () => {
    linkify: number;
    blockStart: number;
};
export declare const LINKIFY_SOURCE_LIMIT = 5000;
/** Test-only: clear the render HTML caches between cases. */
export declare const resetMarkdownHtmlCacheForTests: () => void;
/** Test-only: entry counts per block cache, for churn/eviction assertions. */
export declare const __markdownBlockCacheSizesForTests: () => {
    full: number;
    live: number;
};
/**
 * Read a settled render synchronously when every block is already in the full
 * cache. Cache reads retain the existing LRU `get` semantics and do not insert
 * or expand either cache.
 */
export declare const getCachedMarkdownBlocks: (text: string, imageMode?: MarkdownImageMode, rawHtml?: MarkdownRawHtmlMode) => RenderedBlock[] | null;
/**
 * Synchronous first paint of `text`, split into exactly the blocks and ids
 * `renderMarkdownBlocks` produces. Cached blocks are used as they are; a block
 * without code to highlight is final and cached now; a block with code is
 * painted uncoloured under an id the async render does not match, so that
 * render only recolours it in place and leaves the other blocks untouched.
 */
export declare const renderMarkdownBlocksSync: (text: string, streaming: boolean, imageMode?: MarkdownImageMode, rawHtml?: MarkdownRawHtmlMode) => RenderedBlock[];
/**
 * Synchronous styled render for the first paint, before the async pipeline
 * (Shiki-in-worker highlight) resolves. Produces the SAME structural HTML as
 * `renderMarkdownBlocks` minus syntax coloring: paragraphs, lists, code blocks
 * and bold all render at their final width, so the async pass only upgrades
 * code-block colors — no flash of full-width raw markdown source. `parser.parse`
 * is synchronous (marked is not configured `async`), so this never blocks on a
 * worker round-trip.
 */
export declare const renderMarkdownSync: (text: string, imageMode?: MarkdownImageMode, rawHtml?: MarkdownRawHtmlMode) => string;
type RenderedBlock = {
    id: string;
    html: string;
    patchFrom?: (paintedId: string) => OpenFencePatch | null;
};
/**
 * Render markdown into an array of per-block sanitized HTML. Streaming-aware:
 * splits into blocks, caches per-block, heals incomplete syntax. Returning
 * blocks (instead of one joined string) lets the renderer re-morph only the
 * block that changed, keeping per-step streaming cost ~O(last block).
 *
 * Lookup is content-addressed: distinct renderers holding identical blocks
 * share one entry and cannot evict each other by identity collision.
 */
export declare const renderMarkdownBlocks: (text: string, streaming: boolean, imageMode?: MarkdownImageMode, rawHtml?: MarkdownRawHtmlMode) => Promise<RenderedBlock[]>;
export {};
