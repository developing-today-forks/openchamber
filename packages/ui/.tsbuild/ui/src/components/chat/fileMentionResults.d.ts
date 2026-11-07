import type { ProjectFileSearchHit } from '@/lib/opencode/client';
export type FileMentionHit = ProjectFileSearchHit & {
    kind: 'file' | 'directory';
};
export declare const tokenizeMentionQuery: (query: string) => string[];
/**
 * The opencode file search takes a single term, so multi-word queries send the
 * most selective (longest) token and the remaining tokens filter client-side.
 */
export declare const mentionServerQuery: (query: string) => string;
/**
 * Merge directory and file hits into one list ranked by match quality against
 * the full relative path. Multi-token queries require every token to appear
 * somewhere in the path, in any order.
 */
export declare function rankFileMentionResults(files: ProjectFileSearchHit[], directories: ProjectFileSearchHit[], query: string, limit?: number): FileMentionHit[];
export declare function filterStaleRecentFiles<T extends {
    path: string;
}>(files: readonly T[], stalePaths: ReadonlySet<string>): T[];
