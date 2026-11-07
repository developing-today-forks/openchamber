export declare const SOURCE_CONTROL_DISCOVERY_LIMIT = 50;
/**
 * The shown worktree branches whose change-request status is discovered: one
 * branch per directory, in the order they are shown, and at most
 * `SOURCE_CONTROL_DISCOVERY_LIMIT` directories, so a long sidebar never turns
 * into a burst of binding reads.
 */
export declare const limitSourceControlDiscoveryCandidates: (targets: Iterable<{
    directory: string;
    branch: string;
}>) => Array<{
    directory: string;
    branch: string;
}>;
