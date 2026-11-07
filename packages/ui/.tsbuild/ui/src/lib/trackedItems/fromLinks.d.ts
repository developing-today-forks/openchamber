import type { GitLabThreadRef } from '@/lib/linkedIssues';
import type { TrackedLinearIssue, TrackedThread } from './model';
export declare const githubThread: <Kind extends 'pull' | 'issue'>(kind: Kind, ref: {
    owner: string;
    repo: string;
    number: number;
}) => TrackedThread<Kind>;
export declare const gitlabThread: <Kind extends 'pull' | 'issue'>(kind: Kind, ref: GitLabThreadRef) => TrackedThread<Kind>;
export declare const linearIssue: (identifier: string) => TrackedLinearIssue;
