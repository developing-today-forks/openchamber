import type { GitLogEntry } from '@/lib/api/types';
interface CommitComparisonSelectorProps {
    commits: readonly GitLogEntry[];
    selectedHash: string | null;
    loading: boolean;
    error: string | null;
    onSelect: (commit: GitLogEntry) => void;
    onRefresh: () => void;
    mobile?: boolean;
}
export declare function CommitComparisonSelector({ commits, selectedHash, loading, error, onSelect, onRefresh, mobile }: CommitComparisonSelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
