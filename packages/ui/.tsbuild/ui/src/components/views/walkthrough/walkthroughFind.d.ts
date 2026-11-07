import type { FileDiffMetadata } from '@pierre/diffs';
import type { DiffFindLayout, DiffFindSource } from '@/components/views/diffFind/useDiffFind';
import { type WalkthroughView } from '@/lib/walkthrough/model';
import type { WalkthroughHunk } from '@/lib/walkthrough/types';
/** One file's consecutive hunks inside one stop: the unit a viewer renders. */
interface WalkthroughFindRun {
    /**
     * Stable identity of this run within the walkthrough. Two stops that both
     * touch one file are two runs with two keys, so their partial diffs never
     * collide in the find hook's per-source cache.
     */
    key: string;
    stopId: string;
    path: string;
    hunks: WalkthroughHunk[];
}
/**
 * The key for a run. Hunk ids are part of it so a regenerated walkthrough whose
 * stops keep their ids still re-reads changed hunks instead of reusing the
 * previous diffs the hook has already resolved.
 */
export declare const findRunKey: (stopId: string, runIndex: number, hunks: readonly WalkthroughHunk[]) => string;
/**
 * The uncovered tail is not a stop, but its runs are keyed like a stop's.
 * A real stop id is a generated slug, never this literal.
 */
export declare const UNCOVERED_STOP_ID = "__uncovered__";
/**
 * Every run in reading order: stop order, then the uncovered tail, then the
 * order `groupHunksByFile` yields within each. This is the changeset the find
 * hook searches, so its order is also the order matches come back in.
 */
export declare const enumerateFindRuns: (view: WalkthroughView) => WalkthroughFindRun[];
/**
 * One search source per run. `load` parses the run's merged patch on demand
 * (the find hook calls it only while the bar is open), so a closed bar parses
 * nothing, and a run always resolves to its own diff. The layout is passed
 * through so a toggle re-runs matching.
 */
export declare const buildFindSources: (runs: readonly WalkthroughFindRun[], layout: DiffFindLayout) => Array<Omit<DiffFindSource, 'load'> & {
    load: () => Promise<FileDiffMetadata | null>;
}>;
export {};
