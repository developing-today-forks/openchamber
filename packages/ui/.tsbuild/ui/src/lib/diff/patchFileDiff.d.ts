import { type AnnotationSide, type FileDiffMetadata } from '@pierre/diffs';
export declare const isBinaryPatch: (patch: string) => boolean;
export declare const haveMatchingPatchVersions: (displayPatch: string, actionPatch: string) => boolean;
export declare const fileDiffFromPatch: (file: string, patch: string, contextLines?: number) => FileDiffMetadata;
/**
 * Split a unified diff patch for a single file into standalone per-hunk patches.
 *
 * Each returned patch preserves the original file header (everything before the
 * first `@@` hunk header) plus exactly one hunk, producing a patch that can be
 * fed to `git apply` on its own.
 *
 * Returns an empty array when no hunk headers are present.
 */
export declare const splitPatchIntoHunks: (patch: string) => string[];
/**
 * Extract a standalone patch for a single hunk by zero-based index.
 *
 * Returns `null` when the index is out of range or the patch has no hunks.
 */
export declare const extractHunkPatch: (patch: string, hunkIndex: number) => string | null;
export interface PatchHunkAnchor {
    index: number;
    side: AnnotationSide;
    lineNumber: number;
}
/** Anchor each action after the final changed row, before trailing context. */
export declare const getPatchHunkAnchors: (patch: string) => PatchHunkAnchor[];
