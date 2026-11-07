export type DiffPatchEntry = {
    id: string;
    title: string;
    filePath?: string;
    patch: string;
    renderMode: 'diff' | 'text';
};
export declare const getPatchText: (value: unknown) => string | undefined;
export declare const getApplyPatchFilePath: (file: unknown) => string | null;
export declare const getPrimaryToolPath: (toolName: string, input: Record<string, unknown> | undefined, metadata: Record<string, unknown> | undefined) => string | null;
export declare const getPrimaryDiffFromMetadata: (toolName: string, metadata?: Record<string, unknown>, preferredPath?: string) => string | undefined;
/** Top-level patch a tool card falls back to when metadata carries no per-file entries. */
export declare const getToolFallbackDiff: (metadata: Record<string, unknown> | undefined) => string | undefined;
export declare const extractFirstChangedLineFromDiff: (diffText: string) => number | undefined;
export declare const getFirstChangedLineFromMetadata: (toolName: string, metadata?: Record<string, unknown>, preferredPath?: string) => number | undefined;
/**
 * Quick-open target for a tool card: the primary mutated file plus the diff
 * entry the expanded card renders for it. Both the collapsed header icon and
 * the expanded "open file" button resolve their line from the same entry
 * patch, so they always land on the same line.
 */
export declare const resolveToolQuickOpenTarget: (toolName: string, input: Record<string, unknown> | undefined, metadata: Record<string, unknown> | undefined) => {
    filePath: string;
    line?: number;
    patch?: string;
} | null;
export declare const getRenderablePatchInfo: (patch: string) => {
    patch: string;
    title?: string;
} | null;
export declare const getDiffPatchEntries: (metadata: Record<string, unknown> | undefined, fallbackDiff: string | undefined, resolveTitle: (path: string) => string) => DiffPatchEntry[];
