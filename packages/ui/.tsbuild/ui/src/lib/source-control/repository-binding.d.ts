import type { SourceControlAPI, SourceControlBindingRead, SourceControlReadContext } from '@/lib/api/types';
import { getRuntimeKey } from '@/lib/runtime-switch';
type BindingAPI = Pick<SourceControlAPI, 'repositoryBinding'> & Partial<Pick<SourceControlAPI, 'authStatus'>>;
type BindingScope = {
    runtimeKey: string;
    directory: string;
    generation: number;
};
type BindingMutationScope = BindingScope & {
    expectedRepositoryId: string;
    expectedRevision: number;
    release: () => void;
};
type BindingState = ({
    status: 'idle';
    read: null;
    error: null;
} | {
    status: 'loading';
    read: SourceControlBindingRead | null;
    error: Error | null;
} | {
    status: 'ready';
    read: SourceControlBindingRead;
    error: null;
} | {
    status: 'stale';
    read: SourceControlBindingRead;
    error: null;
} | {
    status: 'error';
    read: SourceControlBindingRead | null;
    error: Error;
}) & {
    contexts: SourceControlReadContext[];
};
export declare class RepositoryBindingOwner {
    private runtimeKey;
    private idleLimit;
    private waitForRepository;
    generation: number;
    private entries;
    private repositories;
    private resetListeners;
    private trimScheduled;
    constructor(runtimeKey?: typeof getRuntimeKey, idleLimit?: number, waitForRepository?: (directory: string) => Promise<void>);
    scope(directory: string): BindingScope;
    private key;
    private repositoryKey;
    private current;
    snapshot: (scope: BindingScope) => BindingState;
    private entry;
    subscribe: (scope: BindingScope, listener: () => void) => (() => void);
    subscribeReset: (listener: () => void) => (() => void);
    private publish;
    private unlink;
    private commit;
    /**
     * The accounts this repository is read with: its bound providers, then the
     * current account of any host its remotes point at. The auth store owns
     * which account that is; a repository whose host it has not read yet is
     * asked for, and every ready entry is republished when its answer changes.
     */
    private contextsFor;
    private authApi;
    private authUnsubscribe;
    /** Lets contexts follow the connected accounts; called once per runtime API set. */
    attachAuth(api: Pick<SourceControlAPI, 'authStatus'>): void;
    private scheduleTrim;
    read: (scope: BindingScope, api: BindingAPI, force?: boolean) => Promise<BindingState>;
    captureMutation(scope: BindingScope, read: SourceControlBindingRead): BindingMutationScope;
    setMutationResult(scope: BindingMutationScope, read: SourceControlBindingRead): boolean;
    reconcile: (scope: BindingScope, api: BindingAPI) => Promise<BindingState>;
    reset: () => void;
}
export declare const repositoryBindingOwner: RepositoryBindingOwner;
export declare const useRepositoryBinding: (directory: string | null | undefined, api: BindingAPI, enabled?: boolean) => {
    status: 'idle';
    read: null;
    error: null;
    contexts: SourceControlReadContext[];
    scope: {
        runtimeKey: string;
        generation: number;
        directory: string;
    };
    retry: () => Promise<BindingState>;
    isCurrent: () => boolean;
    stale: boolean;
} | {
    status: 'loading';
    read: SourceControlBindingRead | null;
    error: Error | null;
    contexts: SourceControlReadContext[];
    scope: {
        runtimeKey: string;
        generation: number;
        directory: string;
    };
    retry: () => Promise<BindingState>;
    isCurrent: () => boolean;
    stale: boolean;
} | {
    status: 'ready';
    read: SourceControlBindingRead;
    error: null;
    contexts: SourceControlReadContext[];
    scope: {
        runtimeKey: string;
        generation: number;
        directory: string;
    };
    retry: () => Promise<BindingState>;
    isCurrent: () => boolean;
    stale: boolean;
} | {
    status: 'stale';
    read: SourceControlBindingRead;
    error: null;
    contexts: SourceControlReadContext[];
    scope: {
        runtimeKey: string;
        generation: number;
        directory: string;
    };
    retry: () => Promise<BindingState>;
    isCurrent: () => boolean;
    stale: boolean;
} | {
    status: 'error';
    read: SourceControlBindingRead | null;
    error: Error;
    contexts: SourceControlReadContext[];
    scope: {
        runtimeKey: string;
        generation: number;
        directory: string;
    };
    retry: () => Promise<BindingState>;
    isCurrent: () => boolean;
    stale: boolean;
};
/**
 * The bindings of several folders at once, in the order given: one hook for a
 * list of folders, which a loop of `useRepositoryBinding` could not be. Each
 * folder is read when idle or stale, as there; the array keeps its identity
 * until one of the bindings changes.
 */
export declare const useRepositoryBindings: (directories: readonly string[], api: BindingAPI) => BindingState[];
export {};
