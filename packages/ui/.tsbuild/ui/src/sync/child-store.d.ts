import { type StoreApi } from "zustand";
import type { State } from "./types";
export type DirectoryStore = State & {
    /** Apply a partial state update */
    patch: (partial: Partial<State>) => void;
    /** Replace state wholesale (used during bootstrap) */
    replace: (next: State) => void;
};
type BlockingRequestSubscriber = () => void;
type SessionMessageChange = {
    messagesChanged: boolean;
    reset: boolean;
    partMessageIDs: readonly string[];
};
type SessionMessageSubscriber = (change: SessionMessageChange) => void;
export declare function subscribeDirectorySessionMessages(store: StoreApi<DirectoryStore>, sessionID: string, listener: SessionMessageSubscriber): () => void;
export declare function markDirectorySessionPartChanged(store: StoreApi<DirectoryStore>, sessionID: string, messageID: string): void;
export declare function subscribeDirectoryPermission(store: StoreApi<DirectoryStore>, sessionID: string, listener: BlockingRequestSubscriber): () => void;
export declare function subscribeDirectoryPermissions(store: StoreApi<DirectoryStore>, sessionIDs: readonly string[], listener: BlockingRequestSubscriber): () => void;
export declare function subscribeDirectoryForm(store: StoreApi<DirectoryStore>, sessionID: string, listener: BlockingRequestSubscriber): () => void;
export declare function subscribeDirectoryForms(store: StoreApi<DirectoryStore>, sessionIDs: readonly string[], listener: BlockingRequestSubscriber): () => void;
export type DirectoryBootstrapPriority = "selected" | "active-project" | "expanded" | "visible" | "background";
export type DirectoryBootstrapReason = "current-directory" | "selected-session" | "known-project" | "known-worktree" | "project-expanded" | "worktree-expanded" | "server-connected" | "location-shutdown" | "action-demand";
export type DirectoryBootstrapDemand = {
    directory: string;
    priority: DirectoryBootstrapPriority;
    reason: DirectoryBootstrapReason;
    force?: boolean;
};
export type DirectoryBootstrapState = "queued" | "running" | "complete" | "failed";
export type DirectoryBootstrapFailureReason = "os-permission" | "generic";
export type DirectoryBootstrapContext = DirectoryBootstrapDemand & {
    generation: number;
    isCurrent: () => boolean;
    trackInitialization: (initialization: Promise<void>) => void;
};
type DirectoryInitialization = {
    state: "running" | "complete";
    token: symbol;
} | {
    state: "failed";
    token: symbol;
    reason: DirectoryBootstrapFailureReason;
};
export declare class ChildStoreManager {
    readonly children: Map<string, StoreApi<DirectoryStore>>;
    private readonly lifecycle;
    private readonly pins;
    private evictionScheduled;
    private readonly disposers;
    private readonly registrySubscribers;
    private readonly bootstrapSubscribers;
    private readonly bootstrapDemandsByOwner;
    private readonly manualBootstrapDemands;
    private readonly bootstrapQueue;
    private readonly runningBootstraps;
    private readonly bootstrapStates;
    private readonly bootstrapFailures;
    private readonly initializations;
    /** Stores that may have missed events and re-read on their next demand. */
    private readonly staleDirectories;
    private onBootstrap?;
    private onDispose?;
    /**
     * Whether a new store of a directory may seed its session list from the persisted cache;
     * every directory may when unset. Given at construction, so no store, a consumer's during
     * the first render included, is made without it.
     */
    private readonly seedsSessions?;
    private isBooting?;
    private isLoadingSessions?;
    private isCurrentScope?;
    private bootstrapConcurrency;
    private bootstrapGeneration;
    private bootstrapSequence;
    private bootstrapRunSequence;
    private readonly directoryBootstrapRuns;
    private manualBootstrapDemandRevision;
    private disposed;
    constructor(options?: {
        seedsSessions?: (directory: string) => boolean;
    });
    private notifyRegistrySubscribers;
    private notifyBootstrapSubscribers;
    configure(callbacks: {
        onBootstrap?: (context: DirectoryBootstrapContext) => Promise<void> | void;
        onDispose?: (directory: string) => void;
        isBooting?: (directory: string) => boolean;
        isLoadingSessions?: (directory: string) => boolean;
        isCurrentScope?: () => boolean;
        bootstrapConcurrency?: number;
    }): () => void;
    mark(directory: string): void;
    /**
     * Coalesce eviction into one pass per tick.
     *
     * `ensureChild` runs during render, once per sidebar row, and used to sort
     * and scan every directory synchronously on each call. Deferring the pass
     * also lets a whole render commit — and with it every pin effect — settle
     * before anything is considered for disposal.
     */
    private scheduleEviction;
    pin(directory: string): void;
    unpin(directory: string): void;
    pinned(directory: string): boolean;
    ensureChild(directory: string, options?: {
        bootstrap?: boolean;
        priority?: DirectoryBootstrapPriority;
        reason?: DirectoryBootstrapReason;
    }): StoreApi<DirectoryStore>;
    getChild(directory: string): StoreApi<DirectoryStore> | undefined;
    requestBootstrap(demand: DirectoryBootstrapDemand): void;
    /**
     * OpenCode's event stream restarted, so every bootstrapped store may have
     * missed events. Only the stores in use re-read now: the current directory,
     * those with foreground demand, and those showing live state the gap may
     * have made wrong (a running turn, a pending permission or form). Every
     * other store stays stale and re-reads when foreground demand returns. On v2 a
     * directory read starts that directory's location and MCP servers, so
     * re-reading every open store would start a fleet per directory.
     *
     * Returns the directories queued now.
     */
    refreshAfterStreamRestart(currentDirectory?: string | null): ReadonlySet<string>;
    /**
     * `refreshAfterStreamRestart` judges stores by what they showed before the
     * gap, so a store that looked idle misses a turn that started, or a
     * permission or form asked, during it. The caller reads OpenCode's global
     * active-session list (one request that starts no location) and passes it
     * here. A session waiting on a permission or form is still running its
     * turn, so it is in that list. Stale stores that own one of those sessions
     * re-read now at background priority; the rest stay deferred.
     *
     * Returns the directories queued now.
     */
    refreshStaleDirectoriesWithActiveSessions(activeSessionIDs: ReadonlySet<string>): ReadonlySet<string>;
    /**
     * OpenCode answered for the first time. A bootstrap that failed before then
     * most likely failed because OpenCode was still starting, and a failed
     * bootstrap is not retried without force. Foreground demand re-reads now;
     * other failed stores re-read on their next foreground demand. Complete
     * stores are left alone: each directory read starts that directory's
     * location, so only failed ones are worth one.
     *
     * Returns the directories queued now.
     */
    retryFailedBootstraps(): ReadonlySet<string>;
    setBootstrapDemand(owner: string, demands: DirectoryBootstrapDemand[]): void;
    clearBootstrapDemand(owner: string): void;
    getBootstrapState(directory: string): DirectoryBootstrapState | undefined;
    getBootstrapFailure(directory: string): DirectoryBootstrapFailureReason | undefined;
    getInitializationState(directory: string): DirectoryInitialization["state"] | undefined;
    getInitializationFailure(directory: string): DirectoryBootstrapFailureReason | undefined;
    subscribeBootstrap(listener: () => void): () => void;
    private aggregateBootstrapDemand;
    private hasForegroundBootstrapDemand;
    private reconcileBootstrapQueue;
    private queueBootstrap;
    private nextBootstrap;
    private pumpBootstrapQueue;
    private trackInitialization;
    /**
     * A directory the host no longer has, an isolated space that was deleted among them: its
     * store lists nothing, its persisted cache goes, and the store is disposed once nothing in
     * this window holds it. A consumer still mounted on it keeps an empty store, as the host's
     * own answer would leave it.
     */
    forgetDirectory(directory: string): void;
    disposeDirectory(directory: string): boolean;
    runEviction(skip?: string): void;
    hasPendingBlockingRequestsForDirectory(directory: string): boolean;
    /** Apply a state mutation to a directory's store */
    update(directory: string, fn: (state: State) => Partial<State>): void;
    /** Get current state of a directory store (snapshot) */
    getState(directory: string): State | undefined;
    disposeAll(): void;
    subscribeRegistry(listener: () => void): () => void;
    subscribeAll(listener: () => void): () => void;
    subscribeAllSelected<T>(selector: (state: DirectoryStore) => T, listener: () => void): () => void;
}
export {};
