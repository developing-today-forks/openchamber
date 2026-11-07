import { OPENCHAMBER_SDK_API_VERSION, OPENCHAMBER_SDK_CHANNEL } from './api-version.ts';
import type { FileEditorChange, FileEditorDocument, FileSnapshotRequest, FileSnapshotResultPayload } from './file-editor.ts';
import type { GuestRunningShellsSnapshot, GuestShellOutputRequest, GuestShellOutputResult, GuestShellStopResult, GuestShellsSubscription } from './shells.ts';
import type { GuestSessionWorktree, GuestStorageRequest, GuestStorageResult, GuestWorkspaceQuery, GuestWorkspaceSnapshot, GuestWorkspaceSubscription, GuestWorkspaceUpdate, GuestWorktree } from './workspace.ts';
import type { GuestStatusControl, GuestStatusControlEvent } from './status-controls.ts';
import type { GuestPopoverClosedEvent, GuestPopoverContext, GuestPopoverRequest } from './popover.ts';
export type HostThemeMode = 'light' | 'dark';
export type HostThemeTokens = {
    background: string;
    elevated: string;
    foreground: string;
    muted: string;
    subtle: string;
    border: string;
    hover: string;
    selection: string;
    focus: string;
    primary: string;
    /** Secondary surface (sidebars, muted rows). */
    mutedSurface: string;
    /** Text on `elevated`. */
    elevatedForeground: string;
    /** Pressed state of a clickable. */
    active: string;
    /** Text on `selection`. */
    selectionForeground: string;
    /** Text on `primary`. */
    primaryForeground: string;
    /** Host-computed text on neutral or tinted surfaces, not on a solid fill. */
    primaryText: string;
    successText: string;
    warningText: string;
    errorText: string;
    infoText: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    font: string;
    /** Monospace stack for code and identifiers. */
    mono: string;
    radius: string;
    syntaxKeyword?: string;
    syntaxString?: string;
    syntaxNumber?: string;
    syntaxFunction?: string;
    syntaxType?: string;
    syntaxComment?: string;
    syntaxVariable?: string;
    syntaxOperator?: string;
};
export type HostTheme = {
    mode: HostThemeMode;
    tokens: HostThemeTokens;
};
export declare const START_SESSION_SENT: readonly ['sent', 'no-model', 'skipped', 'failed'];
export type StartSessionSent = (typeof START_SESSION_SENT)[number];
export type SessionSnapshot = {
    id: string;
    title: string;
    busy: boolean;
    model?: string;
    agent?: string;
};
/**
 * Which host chrome mounted this iframe. Not `openSurface`. `status` is the
 * extension's section in the chat's Work Status panel.
 */
export type GuestHostSurface = 'panel' | 'dialog' | 'page' | 'background' | 'status' | 'file' | 'popover';
export type GuestConnection = {
    connected: boolean;
    account: string;
};
export type GuestSettings = Record<string, string>;
export type GuestRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type GuestRequest = {
    method: GuestRequestMethod;
    path: string;
    query?: Record<string, string>;
    body?: string;
};
export type GuestRequestResult = {
    status: number;
    body: string;
};
export type StartSessionResult = {
    sessionId: string;
    sent: StartSessionSent;
    directory?: string;
    worktree?: GuestWorktree;
    linked?: boolean;
} | {
    sessionId: null;
    sent: 'skipped';
    directory: string;
    worktree: GuestWorktree;
    failure: 'bootstrap-failed' | 'session-create-failed';
};
export type PromptRequest = {
    text: string;
    send?: boolean;
};
export type PromptResult = {
    sent: StartSessionSent;
};
export declare const SESSION_LIFECYCLE_PHASES: readonly ['started', 'completed', 'failure'];
export type SessionLifecyclePhase = (typeof SESSION_LIFECYCLE_PHASES)[number];
export type SessionLifecycleEvent = {
    sessionId: string;
    phase: SessionLifecyclePhase;
};
export declare const GUEST_FILE_ENTRY_KINDS: readonly ['file', 'directory', 'other'];
/** What a directory entry or an existing path is. */
export type GuestFileEntryKind = (typeof GUEST_FILE_ENTRY_KINDS)[number];
export declare const GUEST_FILE_STAT_KINDS: readonly ['file', 'directory', 'other', 'missing'];
/** `stat` answer: an entry kind, or `missing` when nothing is at that path. */
export type GuestFileStatKind = (typeof GUEST_FILE_STAT_KINDS)[number];
/**
 * Where a guest file path points. A relative path is inside the open project
 * (capability `files`). A path starting with `/` or `~/` is outside it and
 * must match one of the manifest's `contributes.filesystem` patterns
 * (capability `filesystem`).
 */
export type GuestFileScope = 'project' | 'filesystem';
export type FileReadRequest = {
    path: string;
};
export type FileWriteRequest = {
    path: string;
    content: string;
};
export type FileListRequest = {
    path: string;
};
export type FileStatRequest = {
    path: string;
};
export type FileReadResult = {
    content: string;
};
export type FileWriteResult = {
    written: true;
};
export type FileListEntry = {
    name: string;
    kind: GuestFileEntryKind;
};
export type FileListResult = {
    entries: FileListEntry[];
};
export type FileStatResult = {
    kind: GuestFileStatKind;
    size: number;
    mtime: number;
};
/**
 * One-off text generation with the user's Small Model (capability `model`).
 * No session, no history, no tools: `prompt` in, `text` out. The app picks
 * the model the same way it does for its own background actions.
 */
export type GenerateRequest = {
    prompt: string;
    system?: string;
    /** Upper bound on the answer, 1 to `GUEST_GENERATE_OUTPUT_TOKENS_MAX`. */
    maxOutputTokens?: number;
};
export type GenerateResult = {
    text: string;
};
/**
 * The outcome of a `generate` whose frame was gone when the model answered:
 * the panel closed or its frame reloaded first. `request` is what that frame
 * sent. The host keeps it for a frame of the same extension on the same
 * surface and project, and hands it over once (`onLateGenerateResult`).
 */
export type LateGenerateResult = {
    request: GenerateRequest;
} & ({
    ok: true;
    result: GenerateResult;
} | {
    ok: false;
    code: HostRequestErrorCode;
    error: string;
});
export type HostResultPayload = GuestStorageResult | GuestWorkspaceSnapshot | GuestShellOutputResult | GuestShellStopResult | GuestRequestResult | StartSessionResult | PromptResult | ServiceStatusResult | FileReadResult | FileWriteResult | FileListResult | FileStatResult | GenerateResult;
export declare const isStartSessionResult: (value: HostResultPayload | undefined) => value is StartSessionResult;
export declare const isPromptResult: (value: HostResultPayload | undefined) => value is PromptResult;
export declare const EMPTY_GUEST_CONNECTION: GuestConnection;
export type HostReadyContext = {
    theme: HostTheme;
    locale: string;
    directory: string | null;
    session: SessionSnapshot | null;
    surface: GuestHostSurface;
    connection: GuestConnection;
    settings: GuestSettings;
    /**
     * The item this surface was opened for: the chip the user clicked on the
     * composer (`AttachIssueRequest`), or the message / session a declared
     * action ran on (`GuestMessageItem` / `GuestSessionItem`). `null` when
     * opened from the rail icon or the composer + menu.
     */
    item: GuestItem | null;
    /** Present only in the host-created child frame for an active popover. */
    popover?: GuestPopoverContext;
    /** Optional capabilities advertised by a newer host. Absent remains compatible with older hosts. */
    features?: {
        deviceStorage?: true;
        statusControls?: true;
        popovers?: true;
        /** The host keeps `generate` answers that arrive after their frame is gone (`onLateGenerateResult`). */
        lateGenerateResults?: true;
    };
};
export type GuestItemRole = 'user' | 'assistant';
/** A `contributes.actions` entry with `where: "message"` ran on this message. */
export type GuestMessageItem = {
    kind: 'message';
    /** The action id from the manifest. */
    action: string;
    sessionId: string;
    sessionTitle: string;
    /** The session's project directory, or `null` for a session without one. */
    directory: string | null;
    messageId: string;
    role: GuestItemRole;
    /** Message text as the Markdown export renders it, capped at `GUEST_ITEM_MESSAGE_TEXT_MAX`. */
    text: string;
};
export type GuestSessionItemMessage = {
    id: string;
    role: GuestItemRole;
    text: string;
    createdAt: number;
};
/** A `contributes.actions` entry with `where: "session"` ran on this session. */
export type GuestSessionItem = {
    kind: 'session';
    /** The action id from the manifest. */
    action: string;
    sessionId: string;
    sessionTitle: string;
    /** The session's project directory, or `null` for a session without one. */
    directory: string | null;
    /** Present only when the action declared `payload: ["messages"]` and the user granted `conversation`. Oldest first. */
    messages?: GuestSessionItemMessage[];
    /** Set when the oldest messages were dropped to stay within `GUEST_ITEM_SESSION_MAX`. */
    truncated?: boolean;
};
export type GuestItem = AttachIssueRequest | GuestMessageItem | GuestSessionItem;
/** The captured target of a background action. Delivered once through `onAction`, not `onItem`. */
export type GuestActionItem = GuestMessageItem | GuestSessionItem;
export type ActionResultPayload = {
    ok: true;
} | {
    ok: false;
    error: string;
};
export declare const isGuestMessageItem: (item: GuestItem | null) => item is GuestMessageItem;
export declare const isGuestSessionItem: (item: GuestItem | null) => item is GuestSessionItem;
/** The composer chip: what the guest handed to `attach`, with `text` filled from the chip. */
export declare const isGuestAttachItem: (item: GuestItem | null) => item is AttachIssueRequest;
/** What the host asks a guest that declared `contributes.commands` when the user submits `/name args`. */
export type ResolveRequest = {
    command: string;
    args: string;
};
/** The guest's answer to `resolve`: the chip to attach, `null` for nothing, or why it failed. */
export type ResolveResultPayload = {
    item: AttachIssueRequest | null;
} | {
    error: string;
};
export type BadgeRequest = {
    /** 0 to `GUEST_BADGE_MAX`; `null` clears the badge. */
    count: number | null;
};
/** A commit the guest asks the host to show in its Diff view. */
export type OpenCommitRequest = {
    sha: string;
};
/** Abbreviated or full hex commit id: 7 to 64 characters. The host resolves it in the open project. */
export declare const GUEST_COMMIT_SHA: RegExp;
export declare const isGuestCommitSha: (value: string) => boolean;
/** The content height the guest would like, in CSS px. Only the `status` surface sizes its frame from it. */
export type ResizeRequest = {
    height: number;
};
export type ToastKind = 'info' | 'success' | 'error';
export type ToastRequest = {
    kind: ToastKind;
    message: string;
    /** Show Copy. `true` copies the message; an object supplies different text, up to 32,000 characters. */
    copy?: boolean | {
        text: string;
    };
    /** Show an OK button that dismisses the toast. */
    dismiss?: boolean;
    /** Keep the toast until dismissed. Always includes OK, even when `dismiss` is false. */
    persistent?: boolean;
};
export type ComposeRequest = {
    text: string;
    mode?: 'replace' | 'append';
};
export type AttachThreadKind = 'issue' | 'pull';
export type AttachBranches = {
    head: string;
    base: string;
};
/** Plain JSON: what survives `JSON.stringify` / `JSON.parse` unchanged. */
export type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};
export type AttachIssueRequest = {
    providerId: string;
    id: string;
    title: string;
    url: string;
    text?: string;
    kind?: AttachThreadKind;
    author?: string;
    branches?: AttachBranches;
    /**
     * Opaque payload the guest chose. The host stores it with the chip and the
     * session snapshot and hands it back unchanged as `ready.item.data`; it
     * never reaches the model or the chip text. Serialized size is capped at
     * `GUEST_ATTACH_DATA_MAX`; `clampAttachRequest` drops a larger value.
     */
    data?: JsonValue;
};
export type StartSessionRequest = AttachIssueRequest & {
    projectId?: string;
    worktree?: GuestSessionWorktree;
    /** Preserve the current page/chat by default. */
    navigation?: 'preserve' | 'open';
};
export declare const GUEST_TOAST_MAX = 500;
export declare const GUEST_CLIPBOARD_TEXT_MAX = 32000;
export declare const GUEST_COMPOSE_TEXT_MAX = 16000;
export declare const GUEST_ATTACH_ID_MAX = 128;
export declare const GUEST_ATTACH_TITLE_MAX = 200;
export declare const GUEST_ATTACH_URL_MAX = 2000;
export declare const GUEST_ATTACH_TEXT_MAX = 16000;
export declare const GUEST_ATTACH_AUTHOR_MAX = 80;
export declare const GUEST_ATTACH_BRANCH_MAX = 200;
/** `JSON.stringify(data).length` ceiling for `AttachIssueRequest.data`. */
export declare const GUEST_ATTACH_DATA_MAX = 16000;
export declare const GUEST_ACCOUNT_MAX = 200;
export declare const GUEST_SESSION_MODEL_MAX = 200;
export declare const GUEST_SESSION_AGENT_MAX = 80;
export declare const GUEST_SETTING_VALUE_MAX = 2000;
export declare const GUEST_REQUEST_PATH_MAX = 2000;
export declare const GUEST_REQUEST_BODY_MAX = 64000;
/** Bytes of a `request` / `serviceRequest` answer; a larger one is `RESPONSE_TOO_LARGE`, never cut off. */
export declare const GUEST_REQUEST_RESPONSE_MAX = 8000000;
export declare const GUEST_REQUEST_TIMEOUT_MS = 20000;
/** Guest file path, in characters. */
export declare const GUEST_FILE_PATH_MAX = 1024;
/** File content in characters, read and write alike. */
export declare const GUEST_FILE_CONTENT_MAX = 2000000;
/** Entries a `listDir` answer carries; longer directories are truncated. */
export declare const GUEST_FILE_LIST_MAX = 2000;
/** Characters in a `generate` prompt. */
export declare const GUEST_GENERATE_PROMPT_MAX = 64000;
/** Characters in a `generate` system prompt. */
export declare const GUEST_GENERATE_SYSTEM_MAX = 8000;
/** Largest `maxOutputTokens` a guest may ask for. */
export declare const GUEST_GENERATE_OUTPUT_TOKENS_MAX = 4000;
/** Characters in a `generate` answer. */
export declare const GUEST_GENERATE_TEXT_MAX = 256000;
/**
 * How long `generate` waits for the model before `HOST_TIMEOUT`.
 *
 * Must exceed the largest deadline the Small Model server can derive for a
 * guest-shaped request, plus margin for the iframe → host bridge → HTTP chain.
 * The server no longer cuts at a flat 60 s: it budgets 60 s base plus 40 ms per
 * estimated token (~4 chars/token), capped at 900 s
 * (`generationBudgetMs` in `packages/web/server/lib/small-model/index.js`,
 * issue #5017). At the guest limits (`GUEST_GENERATE_PROMPT_MAX` +
 * `GUEST_GENERATE_SYSTEM_MAX` = 72 000 chars ≈ 18 000 tokens) that is 780 s,
 * so 960 s leaves the chain ~3 minutes.
 */
export declare const GUEST_GENERATE_TIMEOUT_MS = 960000;
/** How long the host keeps a `LateGenerateResult` nobody has taken. */
export declare const GUEST_GENERATE_LATE_KEEP_MS: number;
/** `LateGenerateResult`s the host keeps per extension; a newer one drops the oldest. */
export declare const GUEST_GENERATE_LATE_MAX = 8;
/** Characters of one message's text on a `GuestMessageItem` or a `GuestSessionItem` message. */
export declare const GUEST_ITEM_MESSAGE_TEXT_MAX = 200000;
/** `JSON.stringify` length ceiling for a `GuestSessionItem`; the host drops the oldest messages to stay under it. */
export declare const GUEST_ITEM_SESSION_MAX = 2000000;
/** Largest count a rail badge shows. */
export declare const GUEST_BADGE_MAX = 999;
/** Largest height a `resize` message may carry; the host clamps further per surface. */
export declare const GUEST_FRAME_HEIGHT_MAX = 10000;
/** Characters in a `resolve-result` error string. */
export declare const GUEST_RESOLVE_ERROR_MAX = 500;
export declare const HOST_REQUEST_ERROR_CODES: readonly ['HOST_UNAVAILABLE', 'HOST_TIMEOUT', 'HOST_REJECTED', 'DISCONNECTED', 'DISABLED', 'BAD_PATH', 'NO_INTEGRATION', 'NO_SERVICE', 'SERVICE_FAILED', 'REQUEST_FAILED', 'RESPONSE_TOO_LARGE', 'NO_SESSION', 'SESSION_BUSY', 'NOT_GRANTED', 'NO_DIRECTORY', 'NOT_FOUND', 'FILE_TOO_LARGE', 'DENIED', 'NO_MODEL', 'MODEL_FAILED', 'UNSUPPORTED'];
export declare const SERVICE_STATUS_VALUES: readonly ['stopped', 'starting', 'ready', 'failed'];
export type ServiceStatus = (typeof SERVICE_STATUS_VALUES)[number];
export type ServiceStatusResult = {
    status: ServiceStatus;
};
export type HostRequestErrorCode = (typeof HOST_REQUEST_ERROR_CODES)[number];
export declare const isHostRequestErrorCode: (value: string) => value is HostRequestErrorCode;
/** Unknown or omitted wire codes become HOST_REJECTED. */
export declare const resolveHostRequestErrorCode: (value: string | undefined) => HostRequestErrorCode;
export declare const isJsonValue: (value: JsonValue | undefined) => value is JsonValue;
/** Whether `data` is plain JSON that serializes within `GUEST_ATTACH_DATA_MAX`. */
export declare const isAttachData: (value: JsonValue | undefined) => value is JsonValue;
/** Guest attach is dropped by the host schema if these limits overflow. */
export declare const clampAttachRequest: (request: AttachIssueRequest) => AttachIssueRequest;
/** Same attach clamp. `worktree` stays only when the guest asked for one. */
export declare const clampStartSessionRequest: (request: StartSessionRequest) => StartSessionRequest;
/** Prompt text uses the compose limit. `send` stays only when the guest asked. */
export declare const clampPromptRequest: (request: PromptRequest) => PromptRequest;
/** Badge counts are whole numbers from 0 to `GUEST_BADGE_MAX`; anything else clears. */
export declare const clampBadgeCount: (count: number | null) => number | null;
/** Resize heights are whole CSS pixels from 0 to `GUEST_FRAME_HEIGHT_MAX`; a non-number asks for 0. */
export declare const clampFrameHeight: (height: number) => number;
/**
 * Which grant a file path needs. `/…` and `~/…` are outside the project and
 * go through the declared `filesystem` patterns; anything else is joined to
 * the open project directory.
 */
export declare const guestFileScope: (path: string) => GuestFileScope;
/**
 * What the host schema accepts as a file path. Semantics (`..`, symlinks,
 * declared patterns) are the server's call and come back as `BAD_PATH`; this
 * only keeps a message from being dropped unanswered.
 */
export declare const isGuestFilePath: (value: string) => boolean;
export declare const ATTACH_PROVIDER_ID: RegExp;
export declare const SETTING_KEY: RegExp;
export declare const isGuestRequestPath: (value: string) => boolean;
type Envelope = {
    channel: typeof OPENCHAMBER_SDK_CHANNEL;
    v: typeof OPENCHAMBER_SDK_API_VERSION;
};
export type HostReadyMessage = Envelope & {
    type: 'ready';
    payload: HostReadyContext;
};
export type HostDirectoryMessage = Envelope & {
    type: 'directory';
    payload: {
        directory: string | null;
    };
};
export type HostSessionMessage = Envelope & {
    type: 'session';
    payload: {
        session: SessionSnapshot | null;
    };
};
export type HostConnectionMessage = Envelope & {
    type: 'connection';
    payload: {
        connection: GuestConnection;
    };
};
export type HostSettingsMessage = Envelope & {
    type: 'settings';
    payload: {
        settings: GuestSettings;
    };
};
export type HostSessionLifecycleMessage = Envelope & {
    type: 'session-lifecycle';
    payload: SessionLifecycleEvent;
};
export type HostItemMessage = Envelope & {
    type: 'item';
    payload: {
        item: GuestItem | null;
    };
};
export type HostStatusControlEventMessage = Envelope & {
    type: 'status-control-event';
    payload: GuestStatusControlEvent;
};
export type HostPopoverClosedMessage = Envelope & {
    type: 'popover-closed';
    payload: GuestPopoverClosedEvent;
};
/** Host → guest request. The guest answers with `resolve-result` carrying the same `id`. */
export type HostResolveMessage = Envelope & {
    type: 'resolve';
    id: string;
    payload: ResolveRequest;
};
export type HostActionMessage = Envelope & {
    type: 'action';
    id: string;
    payload: GuestActionItem;
};
/** The file a `file` surface edits; pushed after `ready` and again whenever the frame reconnects. */
export type HostFileOpenMessage = Envelope & {
    type: 'file-open';
    payload: FileEditorDocument;
};
/** Host → guest request. The guest answers with `file-snapshot-result` carrying the same `id`. */
export type HostFileSnapshotMessage = Envelope & {
    type: 'file-snapshot';
    id: string;
    payload: FileSnapshotRequest;
};
/** The snapshot with this `version` is on disk. */
export type HostFileSavedMessage = Envelope & {
    type: 'file-saved';
    payload: {
        version: string;
    };
};
/** A kept `generate` outcome, pushed once to a frame that sent `generate-late-listen`. */
export type HostGenerateLateMessage = Envelope & {
    type: 'generate-late';
    payload: LateGenerateResult;
};
export type HostResultMessage = Envelope & {
    type: 'result';
    id: string;
} & ({
    ok: true;
    payload?: HostResultPayload;
} | {
    ok: false;
    error: string;
    code: HostRequestErrorCode;
});
export type HostShellsMessage = Envelope & {
    type: 'shells';
    payload: {
        subscriptionId: string;
        snapshot: GuestRunningShellsSnapshot;
    };
};
export type HostMessage = (Envelope & {
    type: 'workspace';
    payload: GuestWorkspaceUpdate;
}) | HostShellsMessage | HostReadyMessage | HostDirectoryMessage | HostSessionMessage | HostConnectionMessage | HostSettingsMessage | HostSessionLifecycleMessage | HostItemMessage | HostStatusControlEventMessage | HostPopoverClosedMessage | HostResolveMessage | HostActionMessage | HostFileOpenMessage | HostFileSnapshotMessage | HostFileSavedMessage | HostGenerateLateMessage | HostResultMessage;
type GuestCall<Type extends string, Payload = never> = Envelope & {
    type: Type;
    id: string;
} & ([
    Payload
] extends [never] ? object : {
    payload: Payload;
});
export type GuestHelloMessage = Envelope & {
    type: 'hello';
};
export type GuestToastMessage = GuestCall<'toast', ToastRequest>;
export type GuestOpenUrlMessage = GuestCall<'open-url', {
    url: string;
}>;
export type GuestOpenSurfaceMessage = GuestCall<'open-surface', {
    surfaceId: string;
}>;
export type GuestClipboardWriteMessage = GuestCall<'clipboard-write', {
    text: string;
}>;
export type GuestComposeMessage = GuestCall<'compose', ComposeRequest>;
export type GuestAttachMessage = GuestCall<'attach', AttachIssueRequest>;
export type GuestStartSessionMessage = GuestCall<'start-session', StartSessionRequest>;
export type GuestPromptMessage = GuestCall<'prompt', PromptRequest>;
export type GuestSessionLinkMessage = GuestCall<'session-link', AttachIssueRequest>;
export type GuestCloseMessage = GuestCall<'close'>;
export type GuestOauthStartMessage = GuestCall<'oauth-start'>;
export type GuestOauthDisconnectMessage = GuestCall<'oauth-disconnect'>;
export type GuestRequestMessage = GuestCall<'request', GuestRequest>;
export type GuestServiceRequestMessage = GuestCall<'service-request', GuestRequest>;
export type GuestServiceStatusMessage = GuestCall<'service-status'>;
export type GuestFileReadMessage = GuestCall<'file-read', FileReadRequest>;
export type GuestFileWriteMessage = GuestCall<'file-write', FileWriteRequest>;
export type GuestFileListMessage = GuestCall<'file-list', FileListRequest>;
export type GuestFileStatMessage = GuestCall<'file-stat', FileStatRequest>;
export type GuestGenerateMessage = GuestCall<'generate', GenerateRequest>;
export type GuestBadgeMessage = GuestCall<'badge', BadgeRequest>;
export type GuestResizeMessage = GuestCall<'resize', ResizeRequest>;
export type GuestOpenCommitMessage = GuestCall<'open-commit', OpenCommitRequest>;
export type GuestStatusControlsMessage = GuestCall<'status-controls', {
    controls: GuestStatusControl[];
}>;
export type GuestPopoverOpenMessage = GuestCall<'popover-open', GuestPopoverRequest>;
export type GuestPopoverCloseMessage = GuestCall<'popover-close', {
    id: string;
    reason?: 'closed' | 'escape';
}>;
export type GuestPopoverAnchorMessage = GuestCall<'popover-anchor', {
    id: string;
    active: boolean;
}>;
/** Answers a host `resolve` by `id`. The host sends no `result` back for it. */
export type GuestResolveResultMessage = Envelope & {
    type: 'resolve-result';
    id: string;
    payload: ResolveResultPayload;
};
/** Completes a host `action`. The host sends no `result` back. */
export type GuestActionResultMessage = Envelope & {
    type: 'action-result';
    id: string;
    payload: ActionResultPayload;
};
/** Answers a host `file-snapshot` by `id`. The host sends no `result` back. */
export type GuestFileSnapshotResultMessage = Envelope & {
    type: 'file-snapshot-result';
    id: string;
    payload: FileSnapshotResultPayload;
};
/** A file editor's state changed. Fire and forget. */
export type GuestFileChangeMessage = Envelope & {
    type: 'file-change';
    payload: FileEditorChange;
};
/** The user asked to save (Cmd/Ctrl+S inside the frame). Fire and forget. */
export type GuestFileSaveMessage = Envelope & {
    type: 'file-save';
};
/** The editor cannot open this file; the host shows its source instead. Fire and forget. */
export type GuestFileUnsupportedMessage = Envelope & {
    type: 'file-unsupported';
};
/** This frame takes kept `generate` outcomes; the host pushes them as `generate-late`. Fire and forget, repeated on every `ready`. */
export type GuestGenerateLateListenMessage = Envelope & {
    type: 'generate-late-listen';
};
export type GuestShellsSubscribeMessage = GuestCall<'shells-subscribe', GuestShellsSubscription>;
export type GuestShellsUnsubscribeMessage = GuestCall<'shells-unsubscribe', {
    subscriptionId: string;
}>;
export type GuestShellOutputMessage = GuestCall<'shell-output', GuestShellOutputRequest>;
export type GuestShellStopMessage = GuestCall<'shell-stop', {
    shellId: string;
}>;
export type GuestMessage = GuestCall<'workspace-read', GuestWorkspaceQuery> | GuestCall<'workspace-subscribe', GuestWorkspaceSubscription> | GuestCall<'workspace-unsubscribe', {
    subscriptionId: string;
}> | GuestShellsSubscribeMessage | GuestShellsUnsubscribeMessage | GuestShellOutputMessage | GuestShellStopMessage | GuestCall<'storage', GuestStorageRequest> | GuestCall<'open-session', {
    sessionId: string;
}> | GuestHelloMessage | GuestToastMessage | GuestOpenUrlMessage | GuestOpenSurfaceMessage | GuestClipboardWriteMessage | GuestComposeMessage | GuestAttachMessage | GuestStartSessionMessage | GuestPromptMessage | GuestSessionLinkMessage | GuestCloseMessage | GuestOauthStartMessage | GuestOauthDisconnectMessage | GuestRequestMessage | GuestServiceRequestMessage | GuestServiceStatusMessage | GuestFileReadMessage | GuestFileWriteMessage | GuestFileListMessage | GuestFileStatMessage | GuestGenerateMessage | GuestBadgeMessage | GuestResizeMessage | GuestOpenCommitMessage | GuestStatusControlsMessage | GuestPopoverOpenMessage | GuestPopoverCloseMessage | GuestPopoverAnchorMessage | GuestActionResultMessage | GuestResolveResultMessage | GuestFileSnapshotResultMessage | GuestFileChangeMessage | GuestFileSaveMessage | GuestFileUnsupportedMessage | GuestGenerateLateListenMessage;
export declare const isServiceStatusResult: (value: HostResultPayload | undefined) => value is ServiceStatusResult;
export declare const isGuestRequestResult: (value: HostResultPayload | undefined) => value is GuestRequestResult;
export declare const isFileReadResult: (value: HostResultPayload | undefined) => value is FileReadResult;
export declare const isFileWriteResult: (value: HostResultPayload | undefined) => value is FileWriteResult;
export declare const isFileListResult: (value: HostResultPayload | undefined) => value is FileListResult;
export declare const isFileStatResult: (value: HostResultPayload | undefined) => value is FileStatResult;
export declare const isGenerateResult: (value: HostResultPayload | undefined) => value is GenerateResult;
/**
 * The guest's read of a host message. The host is the trusted parent frame
 * (the client only listens to `event.source === parent`), so this checks the
 * envelope and the discriminant rather than every field, and the guest bundle
 * carries no schema library for it. The host side parses guest input with
 * `guestMessageSchema` in `@openchamber/sdk/schemas`.
 */
export declare const readHostMessage: (data: MessageEvent['data']) => HostMessage | null;
export {};
