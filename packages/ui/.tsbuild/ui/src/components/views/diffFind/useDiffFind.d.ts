import type { FileDiffMetadata } from '@pierre/diffs';
import { type DiffFindMatch, type DiffFindSide } from '@/lib/diff/diffFind';
export type DiffFindLayout = 'inline' | 'side-by-side';
/** Typing settles this long before the changeset is matched again. */
export declare const DIFF_FIND_QUERY_DEBOUNCE_MS = 120;
/** A match the bar can be opened directly onto, in the changeset's own terms. */
export interface DiffFindAnchor {
    filePath: string;
    side: DiffFindSide;
    lineNumber: number;
    spanStart: number;
}
/**
 * What a source resolves to when it turns out to hold files of its own (a
 * nested repository's row): those files are searched in its place, each read
 * through its own `load`.
 */
export interface DiffFindNestedSources {
    nestedSources: readonly DiffFindSource[];
}
/**
 * One searchable file. The owner supplies the parsed diff lazily: the hook
 * calls `load` only while the bar is open and only for files it has not
 * resolved at the current `revision`, so a closed bar costs nothing.
 */
export interface DiffFindSource {
    /** Stable identity within the changeset; matches carry it back. */
    filePath: string;
    /** The layout this file currently renders with; a change re-runs matching. */
    layout: DiffFindLayout;
    /**
     * Identity of the parsed diff itself. Moving it makes the hook re-read the
     * file; a layout change alone must not, since layout only affects matching.
     */
    revision?: string;
    /**
     * Resolve the parsed diff, null when the file has nothing to search, or the
     * files to search in its place. A rejection marks the file as not searched.
     */
    load: () => Promise<FileDiffMetadata | DiffFindNestedSources | null>;
}
export interface UseDiffFindResult {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    query: string;
    setQuery: (query: string) => void;
    /** Every match across the changeset, in file order then reading order. */
    matches: DiffFindMatch[];
    /** Zero-based index into `matches`, or 0 when there is none. */
    currentIndex: number;
    currentMatch: DiffFindMatch | null;
    /** True while files are still being read, so `matches` may keep growing. */
    isSearching: boolean;
    /** Files whose read failed while the bar is open; reopening retries them. */
    failedCount: number;
    next: () => void;
    previous: () => void;
    /**
     * Open the bar on `query`, landing on the match *after* `anchor`'s own match
     * (wrapping, like `next`). The anchor's file may still be loading: the intent
     * is held until its match appears, and falls back to the first match once the
     * changeset settles without it. With no anchor this is "open, set query,
     * first match". Unlike `setQuery` it applies at once and does not reset an
     * anchor jump to 0.
     */
    openWithQuery: (query: string, anchor?: DiffFindAnchor) => void;
}
/**
 * The diff a viewer actually renders: whitespace-only changes hidden when the
 * panel is in that mode. Searching the rendered diff keeps the count equal to
 * what is on screen, so "next" can always scroll to a line that exists.
 */
export declare const resolveFindDiff: (fileDiff: FileDiffMetadata | null, hideWhitespace: boolean) => FileDiffMetadata | null;
/**
 * Search state for a changeset of parsed diffs. It owns the query, the match
 * list and the active index; the owner renders the bar and moves the viewer.
 *
 * Files resolve one at a time (a large changeset must not fire every host read
 * at once) and at most once per revision, so opening the bar fills in
 * progressively (`isSearching`) without re-reading what is already known.
 * A failed read is kept apart from the resolved diffs: it is counted in
 * `failedCount` and retried the next time the bar opens. Closing stops starting
 * new reads and keeps the resolved diffs, so reopening is instant. Walkthrough
 * reuses it by passing its own file set and per-file `load`; `sources` should
 * be memoized so its identity only moves with the file list, a layout change,
 * or a data revision.
 */
export declare const useDiffFind: ({ sources, caseSensitive }: {
    sources: readonly DiffFindSource[];
    caseSensitive?: boolean;
}) => UseDiffFindResult;
