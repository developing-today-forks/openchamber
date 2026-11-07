/**
 * Session actions — SDK-calling operations for session management.
 * Replaces the action methods from the old useSessionStore.
 */
import type { Message, Metadata, ModelSelection, Part, Session, SubagentPolicy } from "@/lib/opencode/model";
import { type NewSessionDraftState } from "./session-ui-store";
import type { ChildStoreManager } from "./child-store";
import { type SkillMentions, type SyntheticContextInput } from "@/lib/opencode/client";
import { type ContextPartMetadata } from "@/lib/messages/contextParts";
import { type SessionMetadataRecord } from "@/lib/sessionReviewMetadata";
import { type ContextObligatoryMessage } from "@/lib/contextObligatoryMessages";
import { type LinkedIssue } from "@/lib/linkedIssues";
import { type SessionWork } from "@/lib/sessionWorkMetadata";
import type { AttachedFile } from "@/stores/types/sessionTypes";
import type { QueuedMessageGoal } from "@/stores/messageQueueStore";
import { type InputHistorySubmission } from "@/stores/useInputHistoryStore";
type OptimisticAddInput = {
    sessionID: string;
    directory?: string | null;
    message: Message;
    parts: Part[];
};
type OptimisticRemoveInput = {
    sessionID: string;
    directory?: string | null;
    messageID: string;
};
type OptimisticConfirmInput = OptimisticRemoveInput;
export declare function setActionRefs(childStores: ChildStoreManager, getDirectory: () => string, enqueueSessionMaterialization?: (directory: string, sessionID: string, messageID: string) => void): void;
export declare function setOptimisticRefs(add: (input: OptimisticAddInput) => void, remove: (input: OptimisticRemoveInput) => void, confirm?: (input: OptimisticConfirmInput) => void): void;
/**
 * Provider/model of the session's last assistant message — the authoritative
 * "session provider" for utility calls (notes distillation etc.), independent
 * of what the composer picker currently points at.
 */
export declare function getSessionLastAssistantModel(sessionId: string): {
    providerID: string;
    modelID: string;
} | null;
export declare function moveSessionToDirectory(session: Session, sourceDirectory: string, destinationDirectory: string, expectedRuntimeKey?: string): Promise<void>;
/**
 * Follows a move OpenCode already made: an agent's `session_move`, another
 * client, or this client's own request whose `session.moved` event arrived.
 * The session, its messages and live state go to the destination's store and
 * an open chat follows them, so the next prompt lands where the chat reads.
 * The global list already took the directory from the same event.
 */
export declare function adoptSessionMove(sessionId: string, sourceDirectory: string, destinationDirectory: string): void;
export declare function waitForConnectionOrThrow(): Promise<void>;
/** "unknown" means no live source covers this session right now, so no caller
 *  may treat it as idle on this answer. "idle" requires positive coverage. */
export type SessionLiveActivity = "unknown" | "idle" | "active";
/**
 * A session's live status can live in a different child store than the one that
 * wins the directory dedup, so any store reporting a non-idle status counts.
 * Read at the moment of use: a descendant can start working after the subtree
 * snapshot was taken.
 *
 * Absence of a non-idle status is not proof of idleness. Child stores are
 * evicted for background directories, and the global status index keeps only
 * non-idle entries, so "no report" and "idle" are different answers: report
 * "idle" only after a live idle event or successful status snapshot covers
 * the session's own directory. A loaded session list is not status authority.
 */
export declare function getSessionLiveActivity(sessionId: string): SessionLiveActivity;
export declare function isSessionBusyNow(sessionId: string): boolean;
/** Cancels a staged revert: the hidden messages come back, in descendants too. */
export declare function clearStagedRevert(sessionId: string): Promise<void>;
/** The directory a session's mutations go to: where the server filed it. */
export declare function getSessionDirectory(sessionId: string): string | undefined;
/**
 * The model and agent a session starts on.
 *
 * v2 keeps the selection on the session, and a switch after creation is
 * recorded in the transcript as its own message. Callers that already know
 * what the first turn will run on pass it here, so the session is created on
 * that selection and the first prompt needs no switch at all.
 */
export type SessionCreateSelection = {
    model?: ModelSelection;
    agent?: string;
    /** Models the new session's subsessions may run; sent on create when set. */
    subagentPolicy?: SubagentPolicy;
};
export declare function createSession(title?: string, directoryOverride?: string | null, metadata?: Metadata, selectionTransition?: "submitted-draft", selection?: SessionCreateSelection, navigation?: "open" | "preserve"): Promise<Session | null>;
export declare function patchSessionMetadata(sessionId: string, directory: string | null | undefined, updater: (metadata: SessionMetadataRecord) => SessionMetadataRecord, expectedRuntimeKey?: string): Promise<Session>;
/**
 * Link or unlink one item on a session. The list transform lives on the
 * OpenChamber server now, decided there from a fresh read inside the
 * session's write queue: a UI request and an agent's `session.link` can no
 * longer wipe each other, whichever write lands first.
 */
export declare function setLinkedIssue(sessionId: string, directory: string | null | undefined, issue: LinkedIssue, linked: boolean): Promise<Session>;
/**
 * Link several items in one server operation: one write-queue turn applies
 * all of them, reading and writing the record once.
 */
export declare function addLinkedIssues(sessionId: string, directory: string | null | undefined, issues: readonly LinkedIssue[]): Promise<Session>;
/**
 * The user tracks a session as in work (`open`) or marks its work done.
 * Bound to the server it was clicked on: when the runtime switches while the
 * change is in flight, nothing reaches the new server or its cache, and the
 * result is null rather than an error to show.
 */
export declare function setSessionWorkState(sessionId: string, directory: string | null | undefined, state: SessionWork["state"]): Promise<Session | null>;
/**
 * Pin or unpin a session for every client of the server. Bound to the server
 * it was clicked on, like the work state: a runtime switch mid-request writes
 * nothing to the new server and resolves null.
 */
export declare function setSessionPinned(sessionId: string, directory: string | null | undefined, pinned: boolean): Promise<Session | null>;
export declare function setContextObligatoryMessage(sessionId: string, directory: string | null | undefined, message: ContextObligatoryMessage, pinned: boolean): Promise<Session>;
/**
 * Reconcile a session the authoritative global snapshot proved gone.
 *
 * `session.deleted` is the primary signal, but the server can publish it while
 * this client's stream is being rebuilt, and then nothing removes the session
 * anywhere else: the live store keeps listing it, the sidebar keeps rendering
 * it, and the open chat keeps prompting an id the server no longer has. A
 * later complete snapshot that omits a session from the established baseline
 * reports the same deletion over the other channel, so it commits the same
 * reconciliation as a confirmed deletion instead of only clearing persisted
 * state.
 *
 * The captured runtime is rechecked here because the live, global, and UI
 * stores mutated below are not runtime-scoped.
 */
export declare function reconcileExternallyDeletedSession(identity: {
    runtimeKey: string;
    directory: string;
    sessionId: string;
}): void;
export type DeleteSessionOptions = {
    /**
     * Runtime key the deletion is scoped to. Defaults to the active runtime when
     * the action starts; callers may supply a key captured earlier when
     * confirmation spans a runtime switch.
     */
    expectedRuntimeKey?: string;
};
/**
 * Delete one session.
 *
 * The runtime is rechecked before the request and again before any store is
 * reconciled, so a response produced by the previous runtime cannot mutate the
 * current runtime's state. Session IDs are not unique across runtimes, so
 * committing a stale deletion could otherwise evict an unrelated session and
 * erase its persisted queue, todos, drafts, folders, and pins.
 *
 * A `404` is treated as an already-completed deletion, but only when it is
 * still authoritative for the captured runtime. After a runtime change the
 * `404` describes either the previous runtime or a runtime this session never
 * belonged to; neither justifies committing cleanup here, so the action reports
 * failure and leaves reconciliation to the next authoritative load.
 */
export declare function deleteSession(sessionId: string, options?: DeleteSessionOptions): Promise<boolean>;
export type DeleteSessionsOptions = {
    /**
     * Runtime key captured when the batch was confirmed. When supplied, the batch
     * stops as soon as the active runtime differs.
     */
    expectedRuntimeKey?: string;
};
/**
 * Delete several sessions sequentially, preserving partial results.
 *
 * One failed session never blocks or erases the others: it is reported in
 * `failedIds` while the remaining IDs are still attempted. When the runtime
 * changes mid-batch, the sessions already committed on the captured runtime
 * stay in `deletedIds` and every ID that was not committed there is reported in
 * `failedIds`, so existing partial-failure feedback stays truthful.
 */
export declare function deleteSessions(ids: string[], options?: DeleteSessionsOptions): Promise<{
    deletedIds: string[];
    failedIds: string[];
}>;
/**
 * Archive one session.
 *
 * `expectedRuntimeKey` defaults to the active runtime when the action starts.
 * Callers may supply a key captured earlier when confirmation spans a runtime
 * switch. When the runtime changes, the action stops and returns `false`
 * without reconciling any store, so a response
 * produced by the previous runtime cannot mutate the current runtime's live or
 * global session state. A session the server already archived before the switch
 * stays archived on that runtime and is re-read from the server the next time
 * the runtime is loaded.
 */
export declare function archiveSession(sessionId: string, expectedRuntimeKey?: string): Promise<boolean>;
export type ArchiveSessionsOptions = {
    /**
     * Runtime key captured when the batch was confirmed. When supplied, the batch
     * stops as soon as the active runtime differs.
     */
    expectedRuntimeKey?: string;
};
/**
 * Archive several sessions, preserving partial results.
 *
 * Sessions that carry no review or btw link are archived by their directory's
 * server in one request, and the whole answer is reconciled with a single store
 * write. The remainder — review sessions, btw forks, sessions with an active
 * btw fork, and any session this client does not hold — keep the per-session
 * path, because unlinking a partner is UI-owned work that reads and rewrites
 * another session's metadata.
 *
 * One failed session never blocks or erases the others: it is reported in
 * `failedIds` while the remaining IDs are still attempted. When
 * `expectedRuntimeKey` is supplied and the runtime changes mid-batch, the
 * already-confirmed sessions stay in `archivedIds` and every ID that was not
 * confirmed on the captured runtime is reported in `failedIds`, so callers keep
 * showing the existing partial-failure feedback instead of silently dropping
 * work.
 */
export declare function archiveSessions(ids: string[], options?: ArchiveSessionsOptions): Promise<{
    archivedIds: string[];
    failedIds: string[];
}>;
/**
 * Restore one archived session back to the active list.
 *
 * Same contract as `archiveSession`: waits for server confirmation before
 * reconciling stores, and rejects stale runtimes so a response produced by a
 * previous runtime cannot mutate the current runtime's state. Archive state is
 * OpenChamber's own (OpenCode has no route for it), so this goes to the
 * OpenChamber unarchive route rather than the OpenCode client.
 *
 * A subsession is the agent's: under an archived parent it is never restored
 * on its own. Restoring a top-level session brings its archived subsessions
 * back with it, so the agent runs it holds are whole again. A subsession
 * archived alone while its parent stayed active is restored on its own, back
 * under that parent.
 */
export declare function unarchiveSession(sessionId: string, expectedRuntimeKey?: string): Promise<boolean>;
export type UnarchiveSessionsOptions = {
    /**
     * Runtime key captured when the batch was confirmed. When supplied, the batch
     * stops as soon as the active runtime differs.
     */
    expectedRuntimeKey?: string;
    /**
     * Undo of an archive that just happened: put back exactly the sessions it
     * moved, subsessions included. Without it a subsession is restored on its
     * own only while its parent is active (`isRestorableOnItsOwn`).
     */
    undo?: boolean;
};
/**
 * Restore several archived sessions sequentially, preserving partial results.
 *
 * One failed session never blocks or erases the others: it is reported in
 * `failedIds` while the remaining IDs are still attempted. When
 * `expectedRuntimeKey` is supplied and the runtime changes mid-batch, the
 * already-confirmed sessions stay in `restoredIds` and every ID that was not
 * confirmed on the captured runtime is reported in `failedIds`, so callers keep
 * showing truthful partial-failure feedback.
 */
export declare function unarchiveSessions(ids: string[], options?: UnarchiveSessionsOptions): Promise<{
    restoredIds: string[];
    failedIds: string[];
}>;
export declare function updateSessionTitle(sessionId: string, title: string, options?: {
    directory?: string | null;
    expectedRuntimeKey?: string;
    signal?: AbortSignal;
}): Promise<void>;
/**
 * Replaces a session's subsession model policy. The caller sends the whole
 * policy (the picker preserves `excludedModels` and `agentOverrides` as
 * loaded), and the saved state comes back from a re-read of the session
 * record, the way `updateSessionTitle` settles a rename.
 */
export declare function updateSessionSubagentPolicy(sessionId: string, directory: string | null | undefined, subagentPolicy: SubagentPolicy): Promise<Session>;
/**
 * Wraps an async send operation with optimistic user-message insertion.
 * Uses useSync()'s optimistic infrastructure — message + parts are inserted
 * into the store AND registered in the shadow Map. mergeOptimisticPage
 * handles deduplication when the server echoes back the real message.
 */
export type CapturedSendTarget = {
    runtimeKey: string;
    sessionId: string;
    directory: string;
};
export type SendMessageOptions = {
    /** Explicit composer intent; automated continuations must not restore archives. */
    userInitiated?: boolean;
    target?: CapturedSendTarget;
    sessionId?: string;
    directory?: string;
    historySubmissions?: InputHistorySubmission[];
    /** Immutable copy of the new-session draft at submit time; used instead of the live draft. */
    draftSnapshot?: NewSessionDraftState;
    delivery?: 'steer';
    /** Skills named inline, attached to the prompt once the session exists. */
    skills?: SkillMentions;
    /**
     * A queued message carries its own goal intent. Set (a goal or `null`), it
     * replaces the composer's armed goal, which belongs to the composer text.
     */
    queuedGoal?: QueuedMessageGoal | null;
};
export declare function sendMessage(content: string, providerID: string, modelID: string, agent?: string, attachments?: AttachedFile[], agentMentionName?: string, additionalParts?: Array<{
    text: string;
    attachments?: AttachedFile[];
    synthetic?: boolean;
    metadata?: ContextPartMetadata;
}>, 
/** `null` is an explicit `Default` thinking level. */
variant?: string | null, inputMode?: "normal" | "shell", options?: SendMessageOptions): Promise<void>;
export declare function optimisticSend(input: {
    runtimeKey?: string;
    sessionId: string;
    content: string;
    directory?: string | null;
    files?: Array<{
        type: "file";
        mime: string;
        url: string;
        filename: string;
    }>;
    /** Context admitted ahead of the prompt; shown in the optimistic message until the server echoes it. */
    context?: SyntheticContextInput[];
    /**
     * Work the request waits for (the session's project knowledge being written
     * into it). The user message is inserted without waiting for it. Must not
     * reject.
     */
    ready?: Promise<void>;
    appendSubmissions?: () => void;
    onOptimisticInsert?: () => void;
    onMessageID?: (messageID: string) => void;
    beforeOptimisticInsert?: () => void;
    /**
     * The actual API call. Receives the optimistic message id and the context
     * with its optimistic ids, so the server's records reconcile in place.
     */
    send: (messageID: string, context: SyntheticContextInput[]) => Promise<void>;
}): Promise<void>;
export declare function abortCurrentOperation(sessionId: string): Promise<void>;
export declare function respondToPermission(sessionId: string, requestId: string, response: "once" | "always" | "reject", directoryOverride?: string, message?: string): Promise<void>;
export declare function dismissPermission(sessionId: string, requestId: string): Promise<void>;
/**
 * Dismiss every pending permission for the session subtree rooted at `sessionId`
 * (the session itself plus any subagent below it, and every request its dock
 * shows). Used by the chat send path: sending a message while a permission
 * prompt is open must cancel/supersede the open permission so it cannot linger
 * or block the new turn.
 *
 * The permissions are removed from the local store OPTIMISTICALLY (before any
 * network call) so the prompt disappears instantly instead of waiting on the
 * `permission.reply` round-trip. Each permission is then formally rejected on
 * the backend via `permission.reply` with `reply: "reject"`, which fires
 * `permission.replied` for reconciliation.
 *
 * Returns true when at least one permission was dismissed. Rejection failures are
 * swallowed (a stranded permission must never block the send);
 * PermissionNotFoundError also clears the stale entry from the child store via
 * {@link dismissPermission}. Any other failure puts the permission back: the
 * agent is still waiting on it, and no event will bring it back.
 *
 * Rejecting unblocks the agent's tool without guaranteeing an idle session.
 * The chat caller preserves explicit Steer as a direct send and queues other
 * follow-ups after dismissal. This helper does not choose message delivery.
 */
export declare function dismissOpenPermissionsForSession(sessionId: string): Promise<boolean>;
/** One filled-in form: every field the agent declared, keyed by field key. */
export type FormAnswer = Record<string, string | number | boolean | string[]>;
export declare function replyToForm(sessionId: string, formId: string, answer: FormAnswer): Promise<void>;
export declare function cancelForm(sessionId: string, formId: string): Promise<void>;
/**
 * Cancel every pending form for the session subtree rooted at `sessionId` (the
 * session itself plus any subagent below it, and every form its dock shows).
 * Used by the chat send path: sending a message while a form is open must
 * supersede it so it cannot linger or strand the session in a half-answered
 * state.
 *
 * The forms are removed from the local store OPTIMISTICALLY (before any network
 * call) so the prompt disappears instantly instead of waiting on the round
 * trip. Each form is then formally cancelled on the backend, which fires
 * `form.cancelled` for reconciliation.
 *
 * Returns true when at least one form was cancelled. Failures are swallowed (a
 * stranded form must never block the send); a not-found error also clears the
 * stale entry from the child store via {@link cancelForm}. Any other failure
 * puts the form back: the agent is still waiting on it, and no event will bring
 * it back (a subagent's form has no other recovery path, #2448).
 *
 * Rejecting unblocks the agent's tool without guaranteeing an idle session.
 * The chat caller preserves explicit Steer as a direct send (the inbox takes
 * it while the turn is still active) and queues other follow-ups after
 * dismissal. This helper does not abort the session.
 */
export declare function dismissOpenFormsForSession(sessionId: string): Promise<boolean>;
/**
 * Revert to a specific user message.
 *
 * 1. Abort if session is busy
 * 2. Extract text from the target message for prompt restoration
 * 3. Optimistically set revert marker so messages hide immediately
 * 4. Call the runtime revert endpoint and merge returned session
 * 5. Set pendingInputText so the reverted message text appears in the input
 */
export declare function revertToMessage(sessionId: string, messageId: string, options?: {
    restorePromptToComposer?: boolean;
}): Promise<void>;
export declare function refetchSessionMessages(sessionId: string): Promise<void>;
/**
 * Fork keeping an assistant turn: the new session holds everything through
 * `messageId`, so the agent there still sees the answer it just gave. The cut
 * is the first record after it that starts something new (a prompt, a
 * compaction, a shell run, a background subagent run, a dispatched session's
 * result); with none, the whole
 * transcript is copied. The composer stays empty since there is no prompt to
 * rewrite.
 */
export declare function forkAfterMessage(sessionId: string, messageId: string): Promise<Session | null>;
/**
 * The last assistant message of the last finished turn, or null when there is
 * none. While a turn runs, everything from the record that opened it on is
 * excluded: that record is a turn boundary (a prompt, a compaction, a shell
 * run, or a background subagent run), and a step inside the running turn can
 * already carry `time.completed` while the turn keeps going, so only turns
 * before it count as stable.
 */
export declare function findLastCompletedTurnMessageId(messages: readonly Message[], turnRunning: boolean): string | null;
/** The session has no finished turn yet, so a fork would copy nothing stable. */
export declare class NothingToForkError extends Error {
    constructor();
}
/**
 * `/fork`: fork after the last finished turn and open the fork. A running turn
 * in the source session is left alone and not copied.
 */
export declare function forkFromLastCompletedTurn(sessionId: string): Promise<Session | null>;
/**
 * Fork from a user message.
 *
 * 1. Extract text from the message for input restoration
 * 2. Call the runtime fork endpoint
 * 3. Insert the new session into the child store (so sidebar updates immediately)
 * 4. Switch to the new session and stage its composer replay
 */
export declare function forkFromMessage(sessionId: string, messageId: string): Promise<void>;
export declare function fetchMessagesForSession(sessionID: string, directory?: string | null): Promise<void>;
export {};
