import { type GuestProjectsSnapshot, type GuestWorktreesSnapshot, type GuestSessionsSnapshot, type GuestStorageOptions } from './workspace.ts';
import type { GuestStatusControl, GuestStatusControlEvent } from './status-controls.ts';
import type { JsonValue } from './contract.ts';
import { type GuestPopoverClosedEvent, type GuestPopoverRequest } from './popover.ts';
import { type FileEditorChange, type FileEditorDocument, type FileEditorSnapshot, type FileSnapshotPurpose } from './file-editor.ts';
import { type AttachIssueRequest, type GuestActionItem, type ComposeRequest, type PromptRequest, type PromptResult, type SessionLifecycleEvent, type StartSessionRequest, type GuestConnection, type GuestItem, type GuestMessage, type GuestRequest, type GuestRequestResult, type GuestSettings, type HostReadyContext, type HostRequestErrorCode, type ResolveRequest, type SessionSnapshot, type StartSessionResult, type ToastRequest, type ServiceStatusResult, type FileListResult, type FileReadResult, type FileStatResult, type FileWriteResult, type GenerateRequest, type GenerateResult, type LateGenerateResult } from './contract.ts';
import { type GuestRunningShellsSnapshot, type GuestShellOutputResult, type GuestShellStopResult, type GuestShellsScope } from './shells.ts';
export type HostFrame = {
    addEventListener: Window['addEventListener'];
    removeEventListener: Window['removeEventListener'];
    parent: {
        postMessage: (message: GuestMessage, targetOrigin: string) => void;
    };
};
export type HostClientOptions = {
    /** Test seam. Defaults to `window`. */
    target?: HostFrame;
    /** Test seam. Defaults to `source === parent`. */
    acceptSource?: (source: MessageEvent['source']) => boolean;
    /** Test seam. Defaults to `GUEST_REQUEST_TIMEOUT_MS`. */
    requestTimeoutMs?: number;
};
export type HostClient = {
    listProjects: () => Promise<GuestProjectsSnapshot>;
    listWorktrees: (projectId: string) => Promise<GuestWorktreesSnapshot>;
    listSessions: (projectId: string) => Promise<GuestSessionsSnapshot>;
    onProjects: (listener: (snapshot: GuestProjectsSnapshot) => void) => Promise<() => void>;
    onWorktrees: (projectId: string, listener: (snapshot: GuestWorktreesSnapshot) => void) => Promise<() => void>;
    onSessions: (projectId: string, listener: (snapshot: GuestSessionsSnapshot) => void) => Promise<() => void>;
    onRunningShells: (scope: GuestShellsScope, listener: (snapshot: GuestRunningShellsSnapshot) => void) => Promise<() => void>;
    readShellOutput: (shellId: string, options?: {
        cursor?: number;
        tailBytes?: number;
    }) => Promise<GuestShellOutputResult>;
    stopShell: (shellId: string) => Promise<GuestShellStopResult>;
    openSession: (sessionId: string) => Promise<void>;
    storage: {
        get: (key: string, options?: GuestStorageOptions) => Promise<JsonValue | undefined>;
        set: (key: string, value: JsonValue, options?: GuestStorageOptions) => Promise<void>;
        delete: (key: string, options?: GuestStorageOptions) => Promise<void>;
        keys: (options?: GuestStorageOptions) => Promise<string[]>;
    };
    onReady: (listener: (context: HostReadyContext) => void) => () => void;
    onDirectory: (listener: (directory: string | null) => void) => () => void;
    onSession: (listener: (session: SessionSnapshot | null) => void) => () => void;
    onSessionLifecycle: (listener: (event: SessionLifecycleEvent) => void) => () => void;
    onConnection: (listener: (connection: GuestConnection) => void) => () => void;
    onSettings: (listener: (settings: GuestSettings) => void) => () => void;
    /**
     * The item this surface was opened for: a chip (`AttachIssueRequest`), a
     * message (`GuestMessageItem`), or a session (`GuestSessionItem`). Replays
     * the last value; `null` when there is none.
     */
    onItem: (listener: (item: GuestItem | null) => void) => () => void;
    /** Receive activation of a host-rendered Work Status control. */
    onStatusControl: (listener: (event: GuestStatusControlEvent) => void) => () => void;
    onPopoverClosed: (listener: (event: GuestPopoverClosedEvent) => void) => () => void;
    /** Replace this status frame's host-rendered controls. Pass [] to clear them. */
    setStatusControls: (controls: GuestStatusControl[]) => Promise<void>;
    openPopover: (request: GuestPopoverRequest) => Promise<void>;
    closePopover: (id: string, reason?: 'closed' | 'escape') => Promise<void>;
    setPopoverAnchorActive: (id: string, active: boolean) => Promise<void>;
    /**
     * Answer the host when the user submits one of this package's
     * `contributes.commands`. Return the chip to attach, or `null` for nothing
     * (the host shows a short notice). A thrown error reaches the user as a
     * toast. One handler at a time; the returned function removes it.
     */
    onResolve: (handler: (request: ResolveRequest) => Promise<AttachIssueRequest | null> | AttachIssueRequest | null) => () => void;
    /**
     * Run a `mode: "background"` action. Register synchronously after connectHost.
     * Await all work, including toast calls: the hidden frame is removed when
     * this handler settles. Throw to report failure. One handler at a time.
     */
    onAction: (handler: (item: GuestActionItem) => void | Promise<void>) => () => void;
    toast: (request: ToastRequest) => Promise<void>;
    openUrl: (url: string) => Promise<void>;
    /**
     * Show a commit of the open project in the host's Diff view (commit scope).
     * `sha` is 7 to 64 hex characters; the host reads the commit itself. No open
     * project is `NO_DIRECTORY`, an unknown commit `NOT_FOUND`, a host without a
     * Diff view `UNSUPPORTED`.
     */
    openCommit: (sha: string) => Promise<void>;
    /**
     * Show a context panel surface (`git`, or `plugin:<panel id>`). Resolves once
     * it is on screen; one already open stays open. No chat or project yet is
     * `NO_DIRECTORY`, a surface that cannot open here `UNSUPPORTED`.
     */
    openSurface: (surfaceId: string) => Promise<void>;
    writeClipboard: (text: string) => Promise<void>;
    compose: (request: ComposeRequest) => Promise<void>;
    attach: (request: AttachIssueRequest) => Promise<void>;
    startSession: (request: StartSessionRequest) => Promise<StartSessionResult>;
    prompt: (request: PromptRequest) => Promise<PromptResult>;
    sessionLink: (request: AttachIssueRequest) => Promise<void>;
    close: () => Promise<void>;
    oauthStart: () => Promise<void>;
    oauthDisconnect: () => Promise<void>;
    request: (request: GuestRequest) => Promise<GuestRequestResult>;
    serviceRequest: (request: GuestRequest) => Promise<GuestRequestResult>;
    serviceStatus: () => Promise<ServiceStatusResult>;
    /**
     * Read a UTF-8 text file. A relative path is inside the open project
     * (capability `files`); `/…` or `~/…` must match a declared
     * `contributes.filesystem` pattern (capability `filesystem`). Over
     * `GUEST_FILE_CONTENT_MAX` characters is `FILE_TOO_LARGE`; a missing file
     * is `NOT_FOUND`.
     */
    readFile: (path: string) => Promise<FileReadResult>;
    /**
     * Write a UTF-8 text file atomically, creating parent directories. Same
     * path rules as `readFile`. Content over `GUEST_FILE_CONTENT_MAX` is
     * refused before sending.
     */
    writeFile: (path: string, content: string) => Promise<FileWriteResult>;
    /** Entries of a directory, sorted by name, capped at `GUEST_FILE_LIST_MAX`. Same path rules as `readFile`. */
    listDir: (path: string) => Promise<FileListResult>;
    /** Kind, size, and mtime of a path. A missing path is `kind: 'missing'`, not an error. Same path rules as `readFile`. */
    stat: (path: string) => Promise<FileStatResult>;
    /**
     * One-off text generation with the user's Small Model (capability
     * `model`). Nothing enters a session and no history is kept. `prompt` is
     * 1 to `GUEST_GENERATE_PROMPT_MAX` characters, `system` up to
     * `GUEST_GENERATE_SYSTEM_MAX`. No usable model is `NO_MODEL`; a model that
     * failed is `MODEL_FAILED`. Waits up to `GUEST_GENERATE_TIMEOUT_MS`.
     */
    generate: (request: GenerateRequest) => Promise<GenerateResult>;
    /**
     * `generate` outcomes that arrived after the frame that asked was gone:
     * the user closed the panel, or the frame reloaded, before the model
     * answered. The host keeps each one for a frame of this extension on the
     * same surface and project and hands it over once, up to
     * `GUEST_GENERATE_LATE_MAX` per extension for `GUEST_GENERATE_LATE_KEEP_MS`.
     * One that lands while this frame listens arrives at once. Register when
     * the frame can use them; the host hands nothing over before the first
     * listener, or on a host without `ready.features.lateGenerateResults`.
     * One that arrives after the last listener was removed waits in this frame
     * for the next listener.
     */
    onLateGenerateResult: (listener: (result: LateGenerateResult) => void) => () => void;
    /** Number on this guest's rail icon (0 to `GUEST_BADGE_MAX`); `null` clears it. Opening the panel clears it too. */
    setBadge: (count: number | null) => Promise<void>;
    /**
     * The height the guest's content needs, in CSS px. On the Work Status
     * `status` surface the host sizes the frame to it, clamped to
     * `GUEST_STATUS_SECTION_HEIGHT_MIN`..`GUEST_STATUS_SECTION_HEIGHT_MAX`;
     * taller content scrolls inside the frame. Other surfaces fill their host
     * chrome and ignore it.
     */
    setHeight: (height: number) => Promise<void>;
    /**
     * The file a `file` surface edits (`contributes.fileEditors`). Replays the
     * last file; called again when the host reconnects the frame. Registering
     * also routes Cmd/Ctrl+S inside the frame to the host's save.
     */
    onFileOpen: (listener: (file: FileEditorDocument) => void) => () => void;
    /**
     * Answer the host when it needs the edited text: to save it (`save`) or to
     * move it into its source view (`handoff`). Return the whole file and a
     * version of the state it came from; a thrown error fails the save. One
     * handler at a time.
     */
    onFileSnapshot: (handler: (purpose: FileSnapshotPurpose) => Promise<FileEditorSnapshot> | FileEditorSnapshot) => () => void;
    /** The snapshot with this version is on disk; edits made since keep the file dirty. */
    onFileSaved: (listener: (version: string) => void) => () => void;
    /** Report the editor's state after a change. `edited` delays autosave until edits stop. */
    reportFileChange: (change: FileEditorChange) => void;
    /** Ask the host to save now, as Cmd/Ctrl+S does. */
    requestFileSave: () => void;
    /** This file cannot be opened here; the host shows its source instead. */
    reportFileUnsupported: () => void;
    dispose: () => void;
};
export declare class HostRequestError extends Error {
    readonly code: HostRequestErrorCode;
    constructor(code: HostRequestErrorCode, message: string);
}
export declare const connectHost: (options?: HostClientOptions) => HostClient;
