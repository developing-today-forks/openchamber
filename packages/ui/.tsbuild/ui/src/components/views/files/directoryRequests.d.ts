/** Coalesces directory reads and rejects completions superseded by refresh or scope changes. */
export declare class DirectoryRequests {
    private pending;
    has(path: string): boolean;
    clear(): void;
    run(path: string, load: (isCurrent: () => boolean) => Promise<void>, force?: boolean): Promise<void>;
}
