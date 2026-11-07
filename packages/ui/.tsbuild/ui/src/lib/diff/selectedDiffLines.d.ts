import type { FileDiffMetadata } from '@pierre/diffs';
type DiffLineSide = 'additions' | 'deletions';
/**
 * Text of file lines `from`..`to` (1-based, inclusive) on one side of a diff.
 */
export declare const getDiffLinesText: (fileDiff: FileDiffMetadata, side: DiffLineSide, from: number, to: number) => string;
export {};
