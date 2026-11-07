import type { Message, Part } from "@/lib/opencode/model";
import type { MessagePage, PendingInboxMessage } from "@/lib/opencode/client";
import type { ChildStoreManager } from "./child-store";
export type SessionMessageTarget = {
    directory: string;
    sessionID: string;
};
export type SessionMessageLoadKind = "initial" | "older" | "refresh" | "prefetch";
export type SessionMessageLoadStatus = "idle" | "loading" | "ready" | "error";
export type SessionMessageLoadState = {
    status: SessionMessageLoadStatus;
    loadingKind: SessionMessageLoadKind | null;
    error: Error | null;
    resolved: boolean;
    limit: number;
    cursor: string | undefined;
    complete: boolean;
    generation: number;
    updatedAt: number | undefined;
};
/**
 * The loader only needs one page call. Narrowing the dependency to that call
 * keeps the adapter (`opencodeClient`) the single place that knows how the
 * server encodes messages, and keeps tests free of a whole SDK double.
 */
export type SessionMessagePageSource = {
    getSessionMessages(id: string, options?: {
        limit?: number;
        cursor?: string;
        order?: "asc" | "desc";
        partShells?: boolean;
    }, directory?: string | null): Promise<MessagePage>;
    /**
     * Pending inbox items for one session, when the runtime can read them. A
     * cold load uses this to repaint messages the live `session.inbox.*` events
     * added while the client was open.
     */
    getSessionInbox?(id: string, directory?: string | null): Promise<readonly PendingInboxMessage[]>;
};
type LoaderConfiguration = {
    sdk: SessionMessagePageSource;
    runtimeKey: string;
};
/** OpenCode's first connection of the page (`openCodeStartupSignal`). */
type OpenCodeStartupSignal = {
    isStarting(): boolean;
    /** Resolves on the first connection; rejects when OpenCode does not come up. */
    waitForConnection(): Promise<void>;
};
export declare const EMPTY_SESSION_MESSAGE_LOAD_STATE: SessionMessageLoadState;
export declare class SessionMessageLoader {
    private readonly childStores;
    private readonly openCodeStartup;
    private sdk;
    private runtimeKey;
    private sdkEpoch;
    /** Advances on every stream gap; see `markHistoryStale`. */
    private historyEpoch;
    private disposed;
    private readonly entries;
    private retention;
    private releaseDerivedCache;
    private readonly historyReaders;
    private readonly renderedSessions;
    /** Timelines scrolled away from the end; they keep `trimHistory` off. */
    private readonly historyBrowsers;
    constructor(childStores: ChildStoreManager, configuration: LoaderConfiguration, openCodeStartup?: OpenCodeStartupSignal);
    configure(configuration: LoaderConfiguration): void;
    /**
     * Re-enable a loader which was disposed by a transient React effect cleanup.
     *
     * React Strict Mode runs effect setup, cleanup, then setup again in
     * development. The provider owns one ref-stable loader across that sequence,
     * so the second setup must be able to accept new work after the first cleanup
     * invalidated its in-flight requests.
     */
    activate(): void;
    startCacheRetention(options: {
        idleTtlMs?: number;
        isCurrent: () => boolean;
        isViewed: (target: SessionMessageTarget) => boolean;
        isActive: (target: SessionMessageTarget) => boolean;
        releaseDerivedCache: (target: SessionMessageTarget) => void;
    }): () => void;
    touchSessionCache(target: SessionMessageTarget): void;
    scheduleCacheRetention(directory: string): void;
    /**
     * Hold history for an imperative reader, a transcript still on screen, or a
     * timeline whose reader is away from its end (`browsing`, which only keeps
     * `trimHistory` from cutting what that reader may be looking at).
     */
    retainSessionHistory(target: SessionMessageTarget, reason?: "read" | "rendered" | "browsing"): () => void;
    /**
     * Cuts a transcript that outgrew the cold-navigation window back to that
     * window, the way it would open cold. The dropped turns stay reachable:
     * coverage moves to a cursor below the oldest kept prompt, so loading older
     * history reads them again. The caller decides when the reader cannot see
     * the cut (`ChatContainer` asks after a turn starts or ends, with the reader
     * at the end). Nothing is cut while a load runs, while a history reader
     * holds the transcript or another timeline browses it, while a revert is
     * pending, after a stream gap the transcript was not confirmed since (it
     * may hold a hole the cursor would hide), or at a record the server has not
     * confirmed. Returns whether anything was cut.
     */
    trimHistory(target: SessionMessageTarget): boolean;
    private evictSessionHistory;
    initializeCreatedSession(target: SessionMessageTarget): void;
    ensure(target: SessionMessageTarget, options?: {
        force?: boolean;
        reason?: "navigation" | "reactive" | "prefetch";
    }): Promise<void>;
    /**
     * The event stream had a gap: any cached transcript may have missed
     * changes. Each one refreshes its tail the next time it is opened.
     */
    markHistoryStale(): void;
    /**
     * Refreshes a cached transcript in the background when a stream gap
     * happened after it was last confirmed. Returns whether a refresh started.
     * A failed refresh keeps the cached records and the stale mark.
     */
    revalidateIfStale(target: SessionMessageTarget): boolean;
    prefetch(target: SessionMessageTarget): Promise<void>;
    loadOlder(target: SessionMessageTarget): Promise<void>;
    private loadOlderPage;
    loadComplete(target: SessionMessageTarget): Promise<void>;
    refreshTail(target: SessionMessageTarget, limit: number): Promise<void>;
    getSnapshot(target: SessionMessageTarget): SessionMessageLoadState;
    subscribe(target: SessionMessageTarget, listener: () => void): () => void;
    optimisticAdd(input: SessionMessageTarget & {
        message: Message;
        parts: Part[];
    }): void;
    optimisticRemove(input: SessionMessageTarget & {
        messageID: string;
    }): void;
    optimisticConfirm(input: SessionMessageTarget & {
        messageID: string;
    }): void;
    /**
     * Revert commits preserve only the optimistic records still in the reduced
     * transcript. A revert cuts the tail, so when a confirmed record survives
     * the cut, the window still starts where it did and its older-history
     * coverage (cursor, complete) still holds: a reset would read as "nothing
     * older" and take away the way to it. A cut that took every confirmed
     * record leaves no window to describe, and coverage starts over.
     */
    invalidateSession(target: SessionMessageTarget, preservedMessages?: readonly Message[]): void;
    invalidateDirectory(directory: string): void;
    dispose(): void;
    private normalizeTarget;
    private keyFor;
    private getEntry;
    private patchEntry;
    private bumpGeneration;
    private notify;
    private startLoad;
    private loadInitial;
    /**
     * Extends a newest-first window backward through the server cursor until
     * `isSatisfied` holds, history is complete, or the window reaches the record
     * ceiling. The ceiling never stops it before the newest prompt: a window
     * without one has no turn to render. Each extension page is sized from the
     * turn density fetched so far, so a long session needs one more round trip,
     * not one per hundred records. Returns null when the read went stale.
     */
    private extendWindow;
    /**
     * Repaints the messages that a session's pending OpenCode inbox items stand
     * for.
     *
     * `session.inbox.enqueued` adds them live, but the inbox is not part of the
     * message history: a cold load (a refresh, another device, a remounted
     * route) showed nothing while OpenCode still held the items, and later
     * admitted every one at once. Best effort — a failed read leaves the loaded
     * transcript exactly as it was.
     */
    private seedPendingInbox;
    /**
     * One page of messages, newest first. `cursor` comes from the previous
     * page's `next` and walks toward older history; its absence is the adapter
     * saying this is the oldest page, which is the only signal for `complete`.
     */
    private fetchPage;
    private commitPage;
    private persistCoverage;
}
export declare function setImperativeSessionMessageLoader(loader: SessionMessageLoader | null): void;
export declare function getImperativeSessionMessageLoader(): SessionMessageLoader | null;
export {};
