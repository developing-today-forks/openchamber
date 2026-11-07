import type { GitLogEntry } from '@/lib/api/types';
export declare function useCommitComparison(directory: string | null, branch: string | null, enabled: boolean, preferredHash?: string): {
    selectedCommit: GitLogEntry | null;
    commits: GitLogEntry[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    select: (commit: GitLogEntry) => void;
};
