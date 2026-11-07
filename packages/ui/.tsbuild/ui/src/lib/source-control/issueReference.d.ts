import type { SourceControlIdentity } from './types';
type IssueReference = {
    number: number;
    identity?: SourceControlIdentity;
    project?: {
        owner: string;
        name: string;
    };
};
export declare const parseIssueReference: (value: string) => IssueReference | null;
export {};
