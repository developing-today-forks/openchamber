import type { TerminalServerSession } from '@/lib/api/types';
export type TerminalChunkSize = {
    cols: number;
    rows: number;
};
export interface TerminalChunk {
    id: number;
    data: string;
    replayData?: string;
    byteLength: number;
    /**
     * PTY size this chunk was drawn for. Only snapshot history carries it: the
     * viewport replays such a chunk at this size and then re-fits, because
     * shell output laid out for one width turns into stray fragments when it is
     * written into an emulator of another width.
     */
    size?: TerminalChunkSize;
}
/**
 * Scrollback lives outside `sessions` because PTY output arrives at streaming
 * frequency. Keeping it here leaves tab metadata referentially stable, so
 * output cannot rerender the tab strip or rewrite the persisted snapshot.
 */
type TerminalBuffer = {
    chunks: TerminalChunk[];
    byteLength: number;
    lastSequence: number;
};
export type TerminalTabLifecycle = 'idle' | 'starting' | 'running' | 'stopping' | 'exited';
export declare const ACTIVE_PROJECT_ACTION_LIFECYCLES: ReadonlySet<TerminalTabLifecycle>;
export type TerminalTabPurpose = {
    type: 'terminal';
} | {
    type: 'project-action';
    actionId: string;
    executionId: string | null;
};
export type TerminalTab = {
    id: string;
    terminalSessionId: string | null;
    lifecycle: TerminalTabLifecycle;
    purpose: TerminalTabPurpose;
    label: string;
    iconKey: string | null;
    isConnecting: boolean;
    createdAt: number;
    previewUrl: string | null;
    previewAutoOpened: boolean;
    previewUrlLocked: boolean;
};
type DirectoryTerminalState = {
    tabs: TerminalTab[];
    activeTabId: string | null;
};
export declare const directoryMayHaveActiveProjectAction: (state: DirectoryTerminalState | undefined) => boolean;
type TerminalActionMutationRevisions = ReadonlyMap<string, number>;
type ReconcileServerSessionsOptions = {
    startedActionMutationRevisions?: TerminalActionMutationRevisions;
};
interface TerminalStore {
    sessions: Map<string, DirectoryTerminalState>;
    buffers: Map<string, TerminalBuffer>;
    actionMutationRevisions: Map<string, number>;
    nextActionMutationRevision: number;
    nextChunkId: number;
    nextTabId: number;
    hasHydrated: boolean;
    ensureDirectory: (directory: string) => void;
    getDirectoryState: (directory: string) => DirectoryTerminalState | undefined;
    getActiveTab: (directory: string) => TerminalTab | undefined;
    getBuffer: (directory: string, tabId: string) => TerminalBuffer;
    matchesActionExecution: (directory: string, tabId: string, executionId: string | null | undefined) => boolean;
    captureStartedActionMutationRevisions: (directory: string) => TerminalActionMutationRevisions;
    createTab: (directory: string) => string;
    reconcileServerSessions: (directory: string, serverSessions: TerminalServerSession[], options?: ReconcileServerSessionsOptions) => void;
    setActiveTab: (directory: string, tabId: string) => void;
    setTabLabel: (directory: string, tabId: string, label: string) => void;
    /** Moves `tabId` to the position `overTabId` holds, shifting the tabs between. */
    moveTab: (directory: string, tabId: string, overTabId: string) => void;
    setTabIconKey: (directory: string, tabId: string, iconKey: string | null) => void;
    closeTab: (directory: string, tabId: string) => void;
    setTabPurpose: (directory: string, tabId: string, purpose: TerminalTabPurpose) => void;
    allocateActionExecution: (directory: string, tabId: string, actionId: string) => string | null;
    setTabSessionId: (directory: string, tabId: string, sessionId: string | null, options?: {
        expectedExecutionId?: string | null;
    }) => void;
    setTabLifecycle: (directory: string, tabId: string, lifecycle: TerminalTabLifecycle, options?: {
        expectedExecutionId?: string | null;
    }) => void;
    setConnecting: (directory: string, tabId: string, isConnecting: boolean, options?: {
        expectedExecutionId?: string | null;
    }) => void;
    replaceBuffer: (directory: string, tabId: string, content: string, sequence: number, size?: TerminalChunkSize) => void;
    appendToBuffer: (directory: string, tabId: string, chunk: string, sequence?: number, replayData?: string) => void;
    setTabPreviewUrl: (directory: string, tabId: string, url: string | null, options?: {
        locked?: boolean;
        autoOpened?: boolean;
        expectedExecutionId?: string | null;
    }) => void;
    markPreviewAutoOpened: (directory: string, tabId: string) => void;
    removeDirectory: (directory: string) => void;
    clearAll: () => void;
}
type PersistedTerminalTabPurpose = {
    type: 'terminal';
} | {
    type: 'project-action';
    actionId: string;
};
type PersistedTerminalTab = Pick<TerminalTab, 'id' | 'label' | 'iconKey' | 'createdAt'> & {
    purpose?: PersistedTerminalTabPurpose;
};
type PersistedDirectoryTerminalState = {
    tabs: PersistedTerminalTab[];
    activeTabId: string | null;
};
type PersistedTerminalStoreState = {
    sessions: Array<[string, PersistedDirectoryTerminalState]>;
    nextTabId: number;
};
/** A project action the user would expect to see marked as running. */
export declare const isActiveProjectActionTab: (tab: TerminalTab) => boolean;
export declare const useTerminalStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<TerminalStore>, "devtools" | "setState"> & {
    setState(partial: Partial<TerminalStore> | TerminalStore | ((state: TerminalStore) => Partial<TerminalStore> | TerminalStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: TerminalStore | ((state: TerminalStore) => TerminalStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<TerminalStore> | TerminalStore | ((state: TerminalStore) => Partial<TerminalStore> | TerminalStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: TerminalStore | ((state: TerminalStore) => TerminalStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<TerminalStore, PersistedTerminalStoreState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: TerminalStore) => void) => () => void;
        onFinishHydration: (fn: (state: TerminalStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<TerminalStore, PersistedTerminalStoreState, unknown>>;
    };
}>;
export {};
