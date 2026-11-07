import { z } from 'zod';
/**
 * Why a path from an earlier status listing has no diff: it no longer exists
 * anywhere git looks, it is a separate repository nested in this one, or it is
 * a directory of untracked files the listing kept as one `dir/` entry.
 */
export type GitPathUnavailableReason = 'path_not_found' | 'nested_repository' | 'untracked_directory' | 'file_too_large';
export declare class GitPathUnavailableError extends Error {
    readonly reason: GitPathUnavailableReason;
    constructor(message: string, reason: GitPathUnavailableReason);
}
/** Body the git diff routes send with 404 and 422. */
export declare const gitPathUnavailableBodySchema: z.ZodObject<{
    error: z.ZodString;
    code: z.ZodEnum<{
        file_too_large: "file_too_large";
        nested_repository: "nested_repository";
        path_not_found: "path_not_found";
        untracked_directory: "untracked_directory";
    }>;
}, z.core.$strip>;
export declare const gitSubmoduleStateSchema: z.ZodObject<{
    headCommit: z.ZodNullable<z.ZodString>;
    indexCommit: z.ZodNullable<z.ZodString>;
    worktreeCommit: z.ZodNullable<z.ZodString>;
    hasTrackedChanges: z.ZodBoolean;
    hasUntrackedFiles: z.ZodBoolean;
    hasConflict: z.ZodBoolean;
}, z.core.$strip>;
