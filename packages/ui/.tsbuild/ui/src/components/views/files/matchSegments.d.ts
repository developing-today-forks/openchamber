type MatchSegment = {
    text: string;
    matched: boolean;
};
/**
 * Splits a line into plain and matched runs for highlighting. Ranges are
 * `[start, end)` offsets; overlaps and offsets past the text are tolerated,
 * because they come from another process.
 */
export declare const matchSegments: (text: string, ranges: ReadonlyArray<readonly [number, number]>) => MatchSegment[];
export {};
