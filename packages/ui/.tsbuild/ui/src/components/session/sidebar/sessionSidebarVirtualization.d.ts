import type { SessionSidebarRow } from './sessionSidebarRowModel';
export declare const getInitialSessionSidebarRowIndexes: (rowCount: number) => number[];
export declare const mergeSessionSidebarVirtualIndexes: (visibleIndexes: readonly number[], pinnedIndexes: ReadonlySet<number>, rowCount: number) => number[];
export declare const findFirstVisibleSessionSidebarRowIndex: (items: readonly {
    index: number;
    end: number;
}[], scrollOffset: number) => number;
declare const SECTION_SPACING_ESTIMATE: {
    readonly 'pb-2': 8;
    readonly 'pb-1.5': 6;
};
type SectionSpacing = keyof typeof SECTION_SPACING_ESTIMATE;
/**
 * Rows that share a kind and surface context render at the same height apart
 * from their trailing section gap, so one measured row tells the size of every
 * unmeasured one, with whatever gap it ends up having. The virtualizer
 * compensates the scroll position whenever a row above the viewport measures
 * differently from its estimate, and that write lands in the middle of the
 * user's scroll gesture.
 */
export declare const sessionSidebarRowSizeKey: (row: SessionSidebarRow) => string;
/**
 * The virtualizer's key for a row: its own key plus its trailing section gap.
 * A header's gap depends on the row after it, so closing or opening the header
 * changes its height without changing its key; under the plain key the
 * virtualizer would keep the old measured height until the resize observer
 * reported back, and the rows below would hop by the gap a frame later. A new
 * key takes the size estimate above, exact once a row like it was measured.
 */
export declare const sessionSidebarRowVirtualKey: (row: SessionSidebarRow, nextRow: SessionSidebarRow | undefined) => string;
/**
 * A row's size: the measured height of a row like it (`sessionSidebarRowSizeKey`,
 * gap excluded) or the model estimate, plus its gap as measured or estimated.
 */
export declare const estimateSessionSidebarRowSize: (row: SessionSidebarRow, nextRow: SessionSidebarRow | undefined, measured?: {
    height?: number;
    gapBySpacing?: ReadonlyMap<string, number>;
}) => number;
export declare const sectionSpacingAfter: (row: SessionSidebarRow, nextRow: SessionSidebarRow | undefined) => SectionSpacing | undefined;
export {};
