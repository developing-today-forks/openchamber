import type { GitHubChecksSummary } from '@/lib/api/types';
export declare const getWorkStatusChecksPresentation: (checks: Pick<GitHubChecksSummary, 'failure' | 'pending' | 'success'> & {
    state: string;
}) => {
    failure: number | null;
    pending: number | null;
    passed: number | null;
} | null;
export declare const getPullRequestChecksText: (checks: GitHubChecksSummary, label: string) => string;
