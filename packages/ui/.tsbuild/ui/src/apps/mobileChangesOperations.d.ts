export type GitFileRevertFailure = {
    path: string;
    error: Error | null;
};
export declare function settleGitFileReverts(paths: string[], revertFile: (path: string) => Promise<void>, concurrency?: number): Promise<{
    paths: string[];
    failures: GitFileRevertFailure[];
}>;
