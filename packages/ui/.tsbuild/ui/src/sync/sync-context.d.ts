import React from "react";
import type { StoreApi } from "zustand";
import type { OpenCodeClient } from "@opencode/client";
import { type SyncEvent } from "@/lib/opencode/events";
import type { FormRequest, Message, Part, PermissionRequest, Session, SessionStatus, StructuredError } from "@/lib/opencode/model";
import { ChildStoreManager, type DirectoryBootstrapReason, type DirectoryBootstrapPriority, type DirectoryStore } from "./child-store";
import { opencodeClient } from "@/lib/opencode/client";
import type { State } from "./types";
import { type SessionLookup } from "./scoped-blocking-requests";
import { type TranscriptPrompt } from "./user-message-history";
import { SessionMessageLoader, type SessionMessageLoadState } from "./session-message-loader";
/**
 * The provider's current directory as a subscribable value instead of a
 * context field. A hook that is handed an explicit directory reads a constant
 * snapshot from it and therefore does not re-render when the current
 * directory changes; a context read would re-render every consumer — every
 * sidebar row — on each cross-project switch.
 */
type CurrentDirectorySource = {
    get: () => string;
    subscribe: (notify: () => void) => () => void;
};
type SyncRuntime = {
    childStores: ChildStoreManager;
    messageLoader: SessionMessageLoader;
    runtimeKey: string;
    sdk: OpenCodeClient;
    currentDirectory: CurrentDirectorySource;
};
export declare function useSyncRuntime(): SyncRuntime;
type SessionMove = {
    sessionID: string;
    from: string;
    to: string;
};
type DirectoryEventBatch = {
    states: Map<StoreApi<DirectoryStore>, DirectoryStore>;
    clonedFields: Map<StoreApi<DirectoryStore>, Set<keyof State>>;
    changedStores: Set<StoreApi<DirectoryStore>>;
    globalSessionEvents: SyncEvent[];
    globalStatusEventsByDirectory: Map<string, SyncEvent[]>;
    /** Applied after the stores publish: a move reads and writes both stores directly. */
    sessionMoves: SessionMove[];
};
/** Read status for a session across all directories */
export declare function useGlobalSessionStatus(sessionId: string): SessionStatus | undefined;
/** Read all session statuses (for sidebar) */
export declare function useAllSessionStatuses(): Record<string, SessionStatus>;
export declare function useAllLiveSessions(): Session[];
/**
 * Live sessions whose ids are not in `excludedIds`, newest first. Updates to
 * an excluded session (a `time.updated` bump on every streamed step) do not
 * re-render the caller.
 */
export declare function useLiveSessionsExcluding(excludedIds: ReadonlySet<string>): Session[];
export declare const MESSAGE_COMPLETION_STATUS_POLL_DELAY_MS = 750;
export declare function setActiveSession(directory: string, sessionId: string): void;
export declare function setExternallyViewedSession(directory: string, sessionId: string, viewed: boolean): void;
type DirectorySessionStatusSnapshot = NonNullable<Awaited<ReturnType<typeof opencodeClient.getActiveSessionStatuses>>>;
type StatusSnapshotMode = "monotonic" | "authoritative";
export declare function applySessionStatusSnapshot(store: StoreApi<DirectoryStore>, snapshot: DirectorySessionStatusSnapshot, candidateSessionIds: string[], mode: StatusSnapshotMode): boolean;
/**
 * Re-check the session status shortly after an assistant message completes.
 * The turn-ending `session.idle` event can be delayed or lost; left alone, the
 * busy spinner keeps showing until the next watchdog poll tick (up to ~5s) and
 * its escalation (up to ~10s).
 *
 * The check is deferred by `MESSAGE_COMPLETION_STATUS_POLL_DELAY_MS`, and the
 * status is read again when the timer fires: a normal turn whose `session.idle`
 * arrives inside that window settles on its own and issues no request at all.
 * Only a session the store still believes busy costs one status fetch, which
 * mirrors the watchdog escalation — the monotonic pass confirms/raises busy but
 * never lowers it, and when the snapshot reports the session idle while the
 * store still believes it busy, an authoritative resync settles the status.
 *
 * Bounded: one scheduled check per session, one in-flight status fetch per
 * directory (shared with the watchdog poll), best-effort — the watchdog poll
 * remains the backstop.
 */
export declare function maybePollStatusAfterMessageCompletion(directory: string, store: StoreApi<DirectoryStore>, sessionID: string): void;
export declare function needsSnapshotAfterStatusPoll(state: DirectoryStore, sessionId: string, snapshotEntry: DirectorySessionStatusSnapshot[string] | undefined): boolean;
export declare function shouldTriggerStaleResync(lastStreamActivityAt: number, lastFullResyncAt: number, now: number, staleThresholdMs?: number, resyncCooldownMs?: number): boolean;
type EventRoutingIndex = {
    sessionDirectoryById: Map<string, string>;
    messageSessionById: Map<string, string>;
    sessionMessageIdsById: Map<string, Set<string>>;
};
export declare const createEventRoutingIndex: () => EventRoutingIndex;
/**
 * Re-fetch pending forms and permissions for a directory and merge them
 * into the directory's child store, preserving any in-flight SSE updates that
 * arrived while the request was pending. Used by reconnect/materialization
 * recovery paths only; normal session switches rely on primary SSE reducer
 * state for `form.created` / `permission.asked` events. When
 * `candidateSessionIds` is omitted, every session known to the directory store
 * is treated as a candidate; when provided, recovery is limited to those IDs.
 */
export declare function resyncBlockingRequestsForDirectory(directory: string, store: StoreApi<DirectoryStore>, candidateSessionIds?: string[], options?: {
    includePermissions?: boolean;
}): Promise<void>;
export declare function resyncBlockingRequestsForActiveDirectory(directory: string, childStores: ChildStoreManager): Promise<void>;
export declare function handleEvent(rawDirectory: string, payload: SyncEvent, childStores: ChildStoreManager, routingIndex: EventRoutingIndex, expectedRuntimeKey: string, autoAnswerDeclined?: boolean, streamingDirectory?: string, batch?: DirectoryEventBatch, globalEffectsAlreadyApplied?: boolean): void;
export declare function interruptedTurnToolParts(state: DirectoryStore, sessionID: string, now?: number, failure?: StructuredError): {
    messageID: string;
    messages: Message[];
    parts?: Part[];
} | null;
/**
 * Marks the trailing turn of a freshly loaded session stopped when its history
 * records that OpenCode interrupted or failed it. Any other history, including
 * an unfinished answer with no record after it, is left as OpenCode stored it.
 */
export declare function markRecordedInterruptedTurn(store: StoreApi<DirectoryStore>, sessionID: string): void;
export declare function SyncProvider(props: {
    sdk: OpenCodeClient;
    directory: string;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Get the child store for a directory (defaults to current).
 *
 * Pass `{ bootstrap: false }` when you only need the store reference for an
 * on-demand `getState()` (not live subscription) and must NOT trigger a full
 * directory bootstrap. This avoids storms of pointless session-list fetches +
 * empty-retry loops for directories that are merely referenced by sidebar rows
 * (e.g. archived sessions on deleted worktrees).
 */
export declare function useDirectoryStore(directory?: string, options?: {
    bootstrap?: boolean;
    priority?: DirectoryBootstrapPriority;
    reason?: DirectoryBootstrapReason;
}): StoreApi<DirectoryStore>;
export declare function useSessionMessageLoader(): SessionMessageLoader;
export declare function useSessionMessageLoadState(sessionID: string, directory?: string): SessionMessageLoadState;
/** Select from the current directory's store */
export declare function useDirectorySync<T>(selector: (state: State) => T, directory?: string): T;
/** Get session messages for a specific session */
export declare function useSessionMessages(sessionID: string, directory?: string): Message[];
/**
 * Derive one value from a session's message list. The caller re-renders only
 * when the derived value changes under `isEqual`, not on every message update:
 * a streamed step replaces the list many times while a derived flag or reading
 * stays the same. `select` runs when the session's list changes, and again on
 * the caller's own renders, so it reads current state either way. A selector
 * that also reads message parts passes `watchParts`, so parts that load after
 * their message re-run it too.
 */
export declare function useSessionMessagesSelector<T>(sessionID: string, directory: string | undefined, select: (messages: Message[], state: State) => T, isEqual?: (left: T, right: T) => boolean, watchParts?: boolean): T;
/** Check whether the message list for a session has been loaded into sync state. */
export declare function useSessionMessagesResolved(sessionID: string, directory?: string): boolean;
/**
 * Get parts for several messages at once, keyed by message id. The snapshot
 * keeps its identity until one of the requested part arrays changes, so a
 * streaming turn can overlay every one of its step messages — not only the
 * currently streaming one — without tearing between them when the stream
 * moves to the next message.
 */
export declare function useSessionPartsForMessages(messageIDs: readonly string[], directory?: string): Record<string, Part[]>;
/** Get status for a specific session */
export declare function useSessionStatus(sessionID: string, directory?: string): import("@opencode/client").SessionStatus | undefined;
/** Whether this directory has received a successful authoritative status snapshot. */
export declare function useSessionStatusSnapshotReady(directory?: string, sessionID?: string): boolean;
/** Get permissions for a specific session */
export declare function useSessionPermissions(sessionID: string, directory?: string, options?: {
    bootstrap?: boolean;
}): import("@opencode/client").PermissionRequest[];
/** Get pending forms for a specific session */
export declare function useSessionForms(sessionID: string, directory?: string): import("@opencode/client").FormInfo[];
type SessionBlockingRequests = {
    hasPermission: boolean;
    hasForm: boolean;
};
/**
 * Whether any pending permission or form waits in exact session buckets
 * grouped by owning directory. This lets collapsed rows cover hidden
 * descendants without bootstrapping their stores or subscribing to unrelated
 * updates.
 */
export declare function useSessionBlockingRequests(scopes: readonly {
    directory: string;
    sessionIDs: readonly string[];
}[]): SessionBlockingRequests;
/** Get sessions list for a directory */
export declare function useSessions(directory?: string): Session[];
/**
 * When each session of a directory started, by session id. Keeps its identity
 * until a session is added or removed: the session list is replaced on every
 * streamed step (`session.updated` moves `time.updated`), start times never
 * change.
 */
export declare function useSessionStartTimes(directory?: string): ReadonlyMap<string, number>;
/**
 * Forms for the composer of `sessionID`: the ones whose lineage reaches that
 * session, then the directory's location-scoped ones. A location-scoped form
 * has no session to be viewed from, so every session of its directory offers
 * it; the answer is still sent to that directory's OpenCode instance because
 * the reply resolves its directory from the store that holds the form.
 */
export declare const collectComposerForms: (formsBySession: Record<string, FormRequest[] | undefined>, sessionID: string | null, lookup: SessionLookup, empty: FormRequest[]) => FormRequest[];
export declare function useScopedBlockingPermissions(sessionID: string | null, directory?: string): PermissionRequest[];
export declare function useScopedBlockingForms(sessionID: string | null, directory?: string): FormRequest[];
/** A docked request comes from a subagent below the viewed session, by the lineage the dock follows. */
export declare function useSubagentRequest(requestSessionID: string, viewedSessionID: string | null, directory?: string): boolean;
export declare function useParentSession(sessionID: string | null, directory?: string): Session | null;
/** Get one session by id for a directory */
export declare function useSession(sessionID?: string | null, directory?: string): Session | undefined;
/**
 * Derive one value from a session record. `session.updated` replaces the
 * record on every streamed step (its `time.updated` moves), so a caller that
 * reads only a few fields re-renders only when the derived value changes
 * under `isEqual`. Same lookup and subscription as `useSession`.
 */
export declare function useSessionSelector<T>(sessionID: string | null | undefined, directory: string | undefined, select: (session: Session | undefined) => T, isEqual?: (left: T, right: T) => boolean): T;
/** Get one session directory by id for a directory */
export declare function useSessionDirectory(sessionID?: string | null, directory?: string): string | undefined;
/** Get the current directory */
export declare function useSyncDirectory(): string;
/** Get the child store manager (for advanced operations) */
export declare function useChildStoreManager(): ChildStoreManager;
type SessionMessageRecord = {
    info: Message;
    parts: Part[];
};
type SessionMessageRecordsSnapshot = {
    sessionID: string;
    sourceMessages: Message[];
    visibleMessages: Message[];
    revertMessageID?: string;
    suspendPartUpdates: boolean;
    suspendedPartUpdatesMessageID?: string;
    list: SessionMessageRecord[];
    byId: Map<string, SessionMessageRecord>;
};
export declare function buildSessionMessageRecordsSnapshot(state: State, sessionID: string, previous?: SessionMessageRecordsSnapshot, suspendPartUpdates?: boolean, suspendedPartUpdatesMessageID?: string): SessionMessageRecordsSnapshot;
export declare function useSessionRenderable(sessionID: string, directory?: string): boolean;
/**
 * The user's prompts in the visible transcript of a session, oldest first.
 * Session-scoped ArrowUp recall merges this with the persisted input history,
 * so sessions that predate the persisted store still recall their prompts.
 */
export declare function useUserMessageHistory(sessionID: string, directory?: string): TranscriptPrompt[];
/**
 * Get messages for a session in the old {info, parts}[] format.
 * Uses visible messages (filtered by revert state).
 *
 * Uses a ref-stable parts lookup that only triggers re-renders when
 * a part array for one of our displayed messages actually changes.
 */
export declare function useSessionMessageRecords(sessionID: string, directory?: string, options?: {
    enabled?: boolean;
    suspendPartUpdates?: boolean;
    suspendPartUpdatesForMessageId?: string | null;
}): SessionMessageRecord[];
export {};
