import type { FileContentSearchMatch, FileContentSearchQuery, FileContentSearchOutcome, FileContentSearchStop } from '@/lib/api/types';
/** Identifies one result row; a file matching on several lines has several. */
export declare const fileContentMatchKey: (match: FileContentSearchMatch) => string;
export type FileContentSearchState = {
    status: 'idle';
} | {
    status: 'searching';
} | {
    status: 'results';
    matches: FileContentSearchMatch[];
    stopped: FileContentSearchStop | null;
} | {
    status: 'invalid-pattern';
    message: string;
} | {
    status: 'unavailable';
} | {
    status: 'failed';
    message: string;
};
type Options = {
    /** The runtime's find-in-files, or undefined where the runtime has none. */
    searchContents: ((payload: FileContentSearchQuery) => Promise<FileContentSearchOutcome>) | undefined;
    directory: string;
    /** Already debounced by the caller; every change here starts a request. */
    query: string;
    regex: boolean;
    includeHidden: boolean;
    respectGitignore: boolean;
    /** False while the surface is hidden or in another search mode: no requests, idle state. */
    active: boolean;
};
/**
 * Runs find-in-files for the query and reports where it stands. A change of
 * query or options aborts the request in flight, which also ends the server's
 * ripgrep process, and a late answer from an aborted request never lands.
 */
export declare const useFileContentSearch: ({ searchContents, directory, query, regex, includeHidden, respectGitignore, active, }: Options) => FileContentSearchState;
export {};
