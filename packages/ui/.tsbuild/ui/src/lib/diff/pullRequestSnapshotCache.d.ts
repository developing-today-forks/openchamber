import type { parsePullRequestDiff, PullRequestSource } from './pullRequestDiff';
type Snapshot = ReturnType<typeof parsePullRequestDiff>;
/** Owned by one retained comparison view; no persistence or background refresh. */
export declare class PullRequestSnapshotCache {
    private entries;
    load(scope: string, source: PullRequestSource, fetch: () => Promise<Snapshot>, force?: boolean, authority?: string): Promise<Snapshot>;
    invalidate(scope: string): void;
}
export {};
