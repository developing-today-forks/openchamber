export type GitIndexMutationDirection = 'stage' | 'unstage';
type QueuedGitIndexMutation = {
    directory: string;
    direction: GitIndexMutationDirection;
    paths: Set<string>;
    rollback?: () => void;
};
type MutationSnapshot = {
    directory: string;
    direction: GitIndexMutationDirection;
    paths: string[];
    rollback?: () => void;
};
type GitIndexMutationQueueOptions = {
    runMutation: (mutation: MutationSnapshot) => Promise<void>;
    onMutationComplete: (mutation: MutationSnapshot) => void;
    onMutationError: (mutation: MutationSnapshot, error: unknown) => void;
    onPathsComplete: (paths: string[]) => void;
    scheduleFlush: () => void;
};
export type GitIndexMutationQueue = {
    enqueue: (mutation: QueuedGitIndexMutation) => void;
    flush: () => void;
    clear: () => void;
    size: () => number;
    isRunning: () => boolean;
};
export declare const createGitIndexMutationQueue: ({ runMutation, onMutationComplete, onMutationError, onPathsComplete, scheduleFlush, }: GitIndexMutationQueueOptions) => GitIndexMutationQueue;
export {};
