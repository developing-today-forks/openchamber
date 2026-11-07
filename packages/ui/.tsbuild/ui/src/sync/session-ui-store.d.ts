/**
 * Session UI Store — ephemeral UI state only.
 *
 * Domain data (sessions, messages, parts, permissions, questions, status)
 * lives in sync child stores. This store owns ONLY transient UI concerns:
 * current selection, draft state, viewport anchors, model/agent preferences,
 * voice state, abort prompts, attached files, worktree metadata.
 *
 * Session↔worktree attachments are the authoritative exception: they live in
 * session-worktree-store (shared sync), and session-ui-store routes through it.
 *
 * SDK-calling actions that need domain data read it from sync-refs.
 */
import type { ContextPartMetadata } from "@/lib/messages/contextParts";
import { type Metadata, type ModelRef, type ModelSelection, type Session } from "@/lib/opencode/model";
import type { AttachedFile } from "@/stores/types/sessionTypes";
import { type PermissionMode } from "@/stores/utils/permissionAutoAccept";
import type { WorktreeMetadata } from "@/types/worktree";
import { type SkillMentions } from "@/lib/opencode/client";
import type { WorktreeStartSource } from "@/lib/worktrees/worktreeStartSource";
import { type SessionCreateSelection, type SendMessageOptions, type ArchiveSessionsOptions, type DeleteSessionOptions, type DeleteSessionsOptions, type UnarchiveSessionsOptions } from "./session-actions";
import { type SyntheticContextPart } from "./input-store";
export type { AttachedFile };
type GoalCommand = {
    name: string;
    template?: string;
};
export declare function expandSlashCommandGoalObjective(content: string, commands: GoalCommand[]): string;
/**
 * The model and agent a send has to switch the session to, or nothing.
 *
 * OpenCode 2.x keeps the selection on the session: `session.model` and
 * `session.agent` are what the next turn runs on. Passing the composer's
 * current pick on every prompt would re-switch the session constantly and
 * write a switch record into the transcript, so only a difference from the
 * session's own record travels.
 */
/**
 * The model/agent a send has to switch the session to, or nothing when the
 * session already runs on the desired selection. Sending them on every turn
 * would make OpenCode record a switch (and two round trips) each time.
 */
export type SendSelection = {
    model?: ModelRef;
    agent?: string;
};
export declare function resolveSendSelection(sessionId: string, directory: string | undefined, desired: {
    providerID: string;
    modelID: string;
    variant?: string | null;
    agent?: string;
}): SendSelection;
export declare function routeMessage(params: {
    runtimeKey?: string;
    sessionId: string;
    directory?: string | null;
    content: string;
    providerID: string;
    modelID: string;
    agent?: string;
    agentMentionName?: string;
    /** `null` is an explicit `Default` thinking level. */
    variant?: string | null;
    inputMode?: "normal" | "shell";
    files?: Array<{
        type: "file";
        mime: string;
        url: string;
        filename: string;
    }>;
    additionalParts?: Array<{
        text: string;
        synthetic?: boolean;
        metadata?: ContextPartMetadata;
        files?: Array<{
            type: "file";
            mime: string;
            url: string;
            filename: string;
        }>;
    }>;
    appendSubmissions?: () => void;
    delivery?: 'steer';
    skills?: SkillMentions;
    /**
     * The session's project knowledge being written into it. A prompt's message
     * appears without waiting for it; only the request does. Never rejects.
     */
    knowledgeSync?: Promise<void>;
}): Promise<'command' | 'prompt' | 'shell'>;
type AssistantMessageSessionExecution = {
    providerID: string;
    modelID: string;
    variant: string;
    agent: string;
    instructions: string;
    createWorktree?: boolean;
    runAsGoal?: boolean;
};
type AssistantMessageSessionSource = {
    sessionId: string;
    directory: string;
    text: string;
};
type NewSessionDraftTarget = "chat" | "project";
/**
 * A patch over the draft target: every field is one the draft itself carries,
 * plus the project id callers pin alongside (kept on the draft object by the
 * spread in the implementation).
 */
export type NewSessionDraftTargetOverride = Partial<NewSessionDraftState> & {
    projectId?: string | null;
};
/** The fields a finished worktree request resolves back into the draft. */
export type PendingDraftWorktreeResolution = {
    projectId?: string | null;
    bootstrapPendingDirectory?: string | null;
    preserveDirectoryOverride?: boolean;
};
export type NewSessionDraftState = {
    draftId: number;
    open: boolean;
    selectedProjectId?: string | null;
    directoryOverride: string | null;
    /** Chosen with the composer's shield button; absent means the new session takes the default from Settings. */
    permissionMode?: PermissionMode;
    /** Typed next to the auto-create worktree switch: a name, or an absolute path when it starts with '/'. */
    autoWorktreeName?: string;
    /**
     * Picked next to the auto-create worktree switch, for the project it was picked in. Absent, or
     * picked in another project, means the Settings default (`worktreeStartFrom`).
     */
    autoWorktreeSource?: {
        projectId: string;
        source: WorktreeStartSource;
    } | null;
    pendingWorktreeRequestId?: string | null;
    bootstrapPendingDirectory?: string | null;
    preserveDirectoryOverride?: boolean;
    parentID: string | null;
    title?: string;
    initialPrompt?: string;
    syntheticParts?: SyntheticContextPart[];
    targetFolderId?: string;
    projectContextPins?: {
        notes: string[];
        plans: string[];
    };
    target: NewSessionDraftTarget;
    preparedChatDirectory?: string | null;
};
export type SessionUIState = {
    currentSessionId: string | null;
    currentSessionDirectory: string | null;
    materializedDraftSessionId: string | null;
    newSessionDraft: NewSessionDraftState;
    abortPromptSessionId: string | null;
    abortPromptExpiresAt: number | null;
    error: string | null;
    worktreeMetadata: Map<string, WorktreeMetadata>;
    availableWorktrees: WorktreeMetadata[];
    availableWorktreesByProject: Map<string, WorktreeMetadata[]>;
    worktreeDiscoveryByProject: ReadonlyMap<string, 'loading' | 'ready' | 'error'>;
    webUICreatedSessions: Set<string>;
    sessionAbortFlags: Map<string, {
        timestamp: number;
        acknowledged: boolean;
    }>;
    abortControllers: Map<string, AbortController>;
    isLoading: boolean;
    lastLoadedDirectory: string | null;
    setCurrentSession: (id: string | null, directoryHint?: string | null, transition?: "submitted-draft") => void;
    clearMaterializedDraftSession: (sessionId: string) => void;
    prepareForRuntimeSwitch: (apiBaseUrl?: string | null) => void;
    restoreForRuntimeSwitch: (apiBaseUrl?: string | null, previousRuntimeKey?: string | null) => void;
    openNewSessionDraft: (options?: Partial<NewSessionDraftState> & {
        automatic?: boolean;
    }) => void;
    prepareChatDraftDirectory: () => Promise<string | null>;
    closeNewSessionDraft: () => void;
    setNewSessionDraftTarget: (target: {
        projectId?: string | null;
        selectedProjectId?: string | null;
        directoryOverride?: string | null;
    }, options?: {
        force?: boolean;
    }) => void;
    setDraftPreserveDirectoryOverride: (value: boolean) => void;
    setDraftPermissionMode: (mode: PermissionMode) => void;
    setDraftAutoWorktreeName: (name: string) => void;
    setDraftAutoWorktreeSource: (source: {
        projectId: string;
        source: WorktreeStartSource;
    } | null) => void;
    setDraftProjectContextPin: (kind: "note" | "plan", id: string, pinned: boolean) => void;
    acknowledgeSessionAbort: (sessionId: string) => void;
    clearAbortPrompt: () => void;
    /** Arms "press Esc again to stop" for `sessionId`, the selected session by default. */
    armAbortPrompt: (durationMs?: number, sessionId?: string) => number | null;
    clearError: () => void;
    markSessionAsOpenChamberCreated: (sessionId: string) => void;
    isOpenChamberCreatedSession: (sessionId: string) => boolean;
    initializeNewOpenChamberSession: (sessionId: string, agents: unknown[]) => void;
    /** `cwd` is where the session runs inside the checkout; it defaults to the worktree root. */
    setWorktreeMetadata: (sessionId: string, metadata: WorktreeMetadata | null, cwd?: string) => void;
    overrideNewSessionDraftTarget: (options: NewSessionDraftTargetOverride) => void;
    resolvePendingDraftWorktreeTarget: (requestId: string, directory: string | null, options?: PendingDraftWorktreeResolution) => void;
    setDraftBootstrapPendingDirectory: (directory: string | null) => void;
    setPendingDraftWorktreeRequest: (requestId: string | null) => void;
    getWorktreeMetadata: (sessionId: string) => WorktreeMetadata | undefined;
    sendMessage: (content: string, providerID: string, modelID: string, agent?: string, attachments?: AttachedFile[], agentMentionName?: string, additionalParts?: Array<{
        text: string;
        attachments?: AttachedFile[];
        synthetic?: boolean;
        metadata?: ContextPartMetadata;
    }>, 
    /** `null` is an explicit `Default` thinking level. */
    variant?: string | null, inputMode?: "normal" | "shell", options?: SendMessageOptions) => Promise<void>;
    createSession: (title?: string, directoryOverride?: string | null, metadata?: Metadata, selection?: SessionCreateSelection) => Promise<Session | null>;
    deleteSession: (id: string, options?: DeleteSessionOptions) => Promise<boolean>;
    deleteSessions: (ids: string[], options?: DeleteSessionsOptions) => Promise<{
        deletedIds: string[];
        failedIds: string[];
    }>;
    archiveSession: (id: string) => Promise<boolean>;
    archiveSessions: (ids: string[], options?: ArchiveSessionsOptions) => Promise<{
        archivedIds: string[];
        failedIds: string[];
    }>;
    unarchiveSession: (id: string) => Promise<boolean>;
    unarchiveSessions: (ids: string[], options?: UnarchiveSessionsOptions) => Promise<{
        restoredIds: string[];
        failedIds: string[];
    }>;
    updateSessionTitle: (sessionId: string, title: string) => Promise<void>;
    revertToMessage: (sessionId: string, messageId: string, options?: {
        skipRedoPush?: boolean;
    }) => Promise<void>;
    /** Replay a stored user prompt with its original attachments and synthetic context. */
    retryMessage: (sessionId: string, messageId: string | null, model: ModelSelection) => Promise<void>;
    forkFromMessage: (sessionId: string, messageId: string) => Promise<void>;
    forkAfterMessage: (sessionId: string, messageId: string) => Promise<void>;
    handleSlashUndo: (sessionId: string) => Promise<void>;
    handleSlashRedo: (sessionId: string) => Promise<void>;
    createSessionFromAssistantMessage: (source: AssistantMessageSessionSource, execution: AssistantMessageSessionExecution) => Promise<void>;
    getSessionsByDirectory: (directory: string) => Session[];
    getDirectoryForSession: (sessionId: string) => string | null;
    getLastUserChoice: (sessionId: string) => {
        agent?: string;
        providerID?: string;
        modelID?: string;
        variant?: string;
    } | null;
    getCurrentAgent: (sessionId: string) => string | undefined;
    debugSessionMessages: (sessionId: string) => Promise<void>;
    pollForTokenUpdates: () => void;
    setSessionDirectory: (sessionId: string, directory: string | null) => void;
    /**
     * Replace a guessed selection directory with the authoritative one once sync
     * has indexed the session. Safe to call at any time: it only ever promotes a
     * guess, never overrides a confirmed selection.
     */
    adoptAuthoritativeSessionDirectory: (sessionId?: string) => void;
};
/**
 * Directory remembered for a session in this runtime, plus the one persisted
 * across restarts. Exported for diagnostics: a stale persisted directory is the
 * hardest source to observe and the one that survives reloads, so a report that
 * cannot show it cannot rule it out.
 */
type RememberedSessionDirectory = {
    runtime: string | null;
    persisted: string | null;
};
export declare const getRememberedSessionDirectory: (sessionId: string) => RememberedSessionDirectory;
type MaterializedDraftSession = {
    sessionId: string;
    directory: string | null;
    agent?: string;
    syntheticParts?: SyntheticContextPart[];
};
/**
 * The effort a send should record for its session.
 *
 * A send carries `undefined` both when no effort was ever chosen and when the
 * user explicitly picked "Default", so the sent value alone cannot tell the two
 * apart, and recording it raw clears a real "Default". The live selection can
 * tell them apart, because its `override` keeps `null` for "Default" — but only
 * while it still describes the agent and model being sent to. Otherwise the
 * send's own value is all there is to go on.
 */
export declare const resolveVariantToRecord: (agentName: string | undefined, providerID: string, modelID: string, sentVariant: string | null | undefined) => string | null | undefined;
export declare function materializeOpenDraftSession(selection: {
    providerID: string;
    modelID: string;
    agent?: string;
    /** `null` is an explicit `Default` thinking level. */
    variant?: string | null;
}, draftOverride?: NewSessionDraftState): Promise<MaterializedDraftSession | null>;
export declare const useSessionUIStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionUIState>>;
