import type { AttachIssueRequest, HostRequestErrorCode, PromptRequest, PromptResult, StartSessionRequest, StartSessionResult } from '@openchamber/sdk';
import type { I18nKey, I18nParams } from '@/lib/i18n';
import { type LinkedGuestIssue } from '@/lib/linkedIssues';
type TranslateFn = (key: I18nKey, params?: I18nParams) => string;
type StartGuestSessionPlan = {
    ok: false;
    reason: 'no-directory';
} | {
    ok: true;
    directory: string;
    title: string;
    worktree: boolean;
    branchName: string;
    kind: 'pr' | 'standard';
    linked: LinkedGuestIssue;
    text?: string;
};
export declare const guestSessionTitle: (request: StartSessionRequest) => string;
export declare const guestWorktreeBranch: (id: string, kind: 'issue' | 'pull') => string;
export declare const planStartGuestSession: (request: StartSessionRequest, directory: string | null, now: number) => StartGuestSessionPlan;
type CreatedSession = {
    id: string;
    directory: string;
};
export type StartGuestSessionDeps = {
    createSession: (title: string, directory: string) => Promise<CreatedSession | null>;
    createWorktree: (directory: string, branch: string, kind: 'pr' | 'standard') => Promise<CreatedSession | null>;
    initializeSession: (sessionId: string) => void;
    setLinkedIssue: (sessionId: string, directory: string, issue: LinkedGuestIssue) => Promise<void>;
    sendFirstMessage: (sessionId: string, directory: string, text: string) => Promise<'sent' | 'no-model' | 'failed'>;
    closeSurfaces: () => void;
};
type StartGuestSessionRun = {
    ok: true;
    sessionId: string;
    sent: 'sent' | 'no-model' | 'skipped' | 'failed';
} | {
    ok: false;
    reason: 'create-failed' | 'worktree-failed';
};
export declare const runStartGuestSession: (plan: Extract<StartGuestSessionPlan, {
    ok: true;
}>, deps: StartGuestSessionDeps) => Promise<StartGuestSessionRun>;
type GuestActionFailure = {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
};
type LinkGuestPlan = {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
    toastKey: I18nKey;
} | {
    ok: true;
    sessionId: string;
    directory: string;
    linked: LinkedGuestIssue;
};
export declare const planLinkGuestSession: (request: AttachIssueRequest, sessionId: string | null, directory: string | null, now: number) => LinkGuestPlan;
export declare const linkGuestSession: (args: {
    request: AttachIssueRequest;
    sessionId: string | null;
    directory: string | null;
    t: TranslateFn;
}) => Promise<{
    ok: true;
} | GuestActionFailure>;
type PromptGuestPlan = {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
    toastKey: I18nKey;
} | {
    ok: true;
    action: 'compose';
    text: string;
} | {
    ok: true;
    action: 'send';
    text: string;
    sessionId: string;
    directory: string;
};
export declare const planPromptGuestSession: (args: {
    request: PromptRequest;
    sessionId: string | null;
    directory: string | null;
    busy: boolean;
}) => PromptGuestPlan;
export declare const promptGuestSession: (args: {
    request: PromptRequest;
    sessionId: string | null;
    directory: string | null;
    busy: boolean;
    compose: (text: string, mode: 'replace' | 'append') => void;
    t: TranslateFn;
}) => Promise<{
    ok: true;
    result: PromptResult;
} | GuestActionFailure>;
export declare const startGuestSession: (args: {
    request: StartSessionRequest;
    directory: string | null;
    t: TranslateFn;
    assertAuthorized: () => void;
}) => Promise<StartSessionResult | null>;
export {};
