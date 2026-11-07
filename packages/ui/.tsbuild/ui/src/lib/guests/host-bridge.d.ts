import { type GuestStorageRequest, type GuestStorageResult, type GuestStatusControl, type GuestWorkspaceQuery, type GuestWorkspaceSnapshot, type GuestWorkspaceSubscription, type GuestShellsSubscription, type GuestShellOutputRequest, type GuestShellOutputResult, type GuestShellStopResult, type AttachIssueRequest, type GuestItem, type GuestPopoverRequest, type PromptRequest, type PromptResult, type SessionLifecycleEvent, type SessionLifecyclePhase, type StartSessionRequest, type GenerateRequest, type GuestConnection, type GuestMessage, type GuestRequest, type GuestSettings, type HostMessage, type HostReadyContext, type HostRequestErrorCode, type LateGenerateResult, type ResolveResultPayload, type SessionSnapshot, type StartSessionResult, type ToastRequest } from '@openchamber/sdk';
import type { GuestFileProxyResult, GuestFileRequest } from '@/lib/guests/files';
import type { GuestGenerateProxyResult } from '@/lib/guests/generate';
import type { GuestOpenCommitResult } from '@/lib/guests/open-commit';
import type { GuestOpenSurfaceResult } from '@/lib/guests/open-surface';
import type { GuestRequestProxyResult } from '@/lib/guests/oauth';
import { type ContextPanelMode } from '@/lib/surfaces/modes';
type HostBridgeEffects = {
    workspaceRead: (query: GuestWorkspaceQuery) => GuestWorkspaceSnapshot;
    workspaceSubscribe: (subscription: GuestWorkspaceSubscription) => void;
    workspaceUnsubscribe: (subscriptionId: string) => void;
    shellsSubscribe: (subscription: GuestShellsSubscription) => void;
    shellsUnsubscribe: (subscriptionId: string) => void;
    shellOutput: (request: GuestShellOutputRequest) => Promise<GuestShellOutputResult>;
    shellStop: (request: {
        shellId: string;
    }) => Promise<GuestShellStopResult>;
    storage: (request: GuestStorageRequest) => Promise<GuestStorageResult>;
    setStatusControls: (controls: GuestStatusControl[]) => void;
    openSession: (sessionId: string) => void;
    toast: (request: ToastRequest) => void;
    openUrl: (url: string) => Promise<boolean>;
    /** Open a context panel surface; the pane owns directory and runtime support. */
    openSurface: (mode: ContextPanelMode) => GuestOpenSurfaceResult;
    writeClipboard: (text: string) => Promise<boolean>;
    compose: (text: string, mode: 'replace' | 'append') => void;
    attach: (issue: AttachIssueRequest) => void;
    startSession: (request: StartSessionRequest) => Promise<StartSessionResult | {
        ok: false;
        code: HostRequestErrorCode;
        message: string;
    } | null>;
    prompt: (request: PromptRequest) => Promise<{
        ok: true;
        result: PromptResult;
    } | {
        ok: false;
        code: HostRequestErrorCode;
        message: string;
    }>;
    sessionLink: (issue: AttachIssueRequest) => Promise<{
        ok: true;
    } | {
        ok: false;
        code: HostRequestErrorCode;
        message: string;
    }>;
    close: () => void;
    oauthStart: () => Promise<boolean>;
    oauthDisconnect: () => Promise<boolean>;
    request: (request: GuestRequest) => Promise<GuestRequestProxyResult>;
    serviceRequest: (request: GuestRequest) => Promise<GuestRequestProxyResult>;
    serviceStatus: () => Promise<{
        ok: true;
        result: {
            status: import('@openchamber/sdk').ServiceStatus;
        };
    } | {
        ok: false;
        code: HostRequestErrorCode;
        message: string;
    }>;
    /** One handler for read, write, list, and stat; the pane checks scope and grant, the server does the rest. */
    file: (request: GuestFileRequest) => Promise<GuestFileProxyResult>;
    /** One-off Small Model text generation; the pane checks the `model` grant, the server picks and calls the model. */
    generate: (request: GenerateRequest) => Promise<GuestGenerateProxyResult>;
    /** Rail badge for this guest; `null` clears. */
    setBadge: (count: number | null) => void;
    /** Show a commit of the open project in the Diff view; the pane owns directory and runtime support. */
    openCommit: (sha: string) => Promise<GuestOpenCommitResult>;
    /** Content height the guest asked for; only the Work Status section sizes its frame from it. */
    resize: (height: number) => void;
    /** The guest answered a host `resolve` with this id. Not a request, so no `result` goes back. */
    resolveResult: (id: string, payload: ResolveResultPayload) => void;
    openPopover?: (request: GuestPopoverRequest) => void;
    closePopover?: (id: string, reason: 'closed' | 'escape' | undefined) => void;
    setPopoverAnchorActive?: (id: string, active: boolean) => void;
};
export declare const buildReadyMessage: (payload: HostReadyContext) => HostMessage;
export declare const buildDirectoryMessage: (directory: string | null) => HostMessage;
export declare const buildSessionMessage: (session: SessionSnapshot | null) => HostMessage;
export declare const buildConnectionMessage: (connection: GuestConnection) => HostMessage;
export declare const buildSettingsMessage: (settings: GuestSettings) => HostMessage;
export declare const buildItemMessage: (item: GuestItem | null) => HostMessage;
export declare const buildResolveMessage: (id: string, command: string, args: string) => HostMessage;
export declare const buildGenerateLateMessage: (result: LateGenerateResult) => HostMessage;
export declare const buildSessionLifecycleMessage: (event: SessionLifecycleEvent) => HostMessage;
export declare const guestSessionLifecyclePhase: (status: {
    type?: string;
} | null | undefined) => SessionLifecyclePhase | null;
type GuestSessionSource = {
    id: string;
    title?: string | null;
    busy?: boolean;
    model?: string | null;
    agent?: string | null;
};
export declare const guestSessionModelId: (model: {
    providerID?: string | null;
    id?: string | null;
} | null | undefined) => string | undefined;
export declare const toGuestSessionSnapshot: (session: GuestSessionSource | null | undefined) => SessionSnapshot | null;
export declare const answerGuestMessage: (message: GuestMessage, effects: HostBridgeEffects) => Promise<HostMessage | null>;
export {};
