import type { GitWorktreeBootstrapStatus } from '@/lib/api/types';
type WorktreeBootstrapState = GitWorktreeBootstrapStatus;
type WorktreeBootstrapFailureHandler = (status: GitWorktreeBootstrapStatus) => void;
type WorktreeBootstrapReadyHandler = (status: GitWorktreeBootstrapStatus) => void;
export declare const subscribeWorktreeBootstrapState: (listener: () => void) => (() => void);
export declare const markWorktreeBootstrapPending: (directory: string) => void;
export declare const clearWorktreeBootstrapState: (directory: string) => void;
export declare const setWorktreeBootstrapState: (directory: string, next: WorktreeBootstrapState) => void;
export declare const getWorktreeBootstrapState: (directory: string) => WorktreeBootstrapState | null;
export declare const startWorktreeBootstrapWatcher: (directory: string, options?: {
    checkoutTimeoutMs?: number;
    pollIntervalMs?: number;
    onFailed?: WorktreeBootstrapFailureHandler;
    onReady?: WorktreeBootstrapReadyHandler;
}) => void;
export declare const waitForWorktreeGitReady: (directory: string) => Promise<void>;
export declare const waitForWorktreeBootstrap: (directory: string) => Promise<void>;
export {};
