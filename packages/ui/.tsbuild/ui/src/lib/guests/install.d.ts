import type { GuestCapability } from '@openchamber/sdk';
import type { InstalledGuest } from './types.ts';
import type { GuestRequestFailure } from './request-failure.ts';
export type InstallGuestErrorCode = 'invalid-path' | 'invalid-url' | 'not-found' | 'invalid-manifest' | 'id-taken' | 'already-installed' | 'missing-build' | 'host-too-old' | 'bundled' | 'reserved-id' | 'clone-failed' | 'clone-auth-failed' | 'extract-failed' | 'too-large' | 'enterprise-mode'
/** The server installed it, but this build cannot read the row it answered with. */
 | 'unreadable' | 'failed';
type InstallGuestResult = {
    ok: true;
    guest: InstalledGuest;
    replaced?: boolean;
} | {
    ok: false;
    code: InstallGuestErrorCode;
    required?: string;
    id?: string;
    diagnostic?: GuestRequestFailure;
};
type UninstallGuestResult = {
    ok: true;
} | {
    ok: false;
    code: InstallGuestErrorCode;
};
type InstallGuestRequest = ({
    path: string;
} | {
    url: string;
}) & {
    replace?: boolean;
    gitIdentityId?: string;
};
type ParseInstallInputResult = {
    ok: true;
    request: InstallGuestRequest;
} | {
    ok: false;
    code: 'invalid-path' | 'invalid-url';
};
export declare const parseInstallInput: (raw: string) => ParseInstallInputResult;
type InstallGuestOptions = {
    replace?: boolean;
    gitIdentityId?: string;
};
export declare const installGuest: (input: string, options?: InstallGuestOptions) => Promise<InstallGuestResult>;
/**
 * Send a `.zip` picked or dropped in the browser to the host. Same result
 * shape as `installGuest`, so one flow handles both; the archive travels as a
 * raw octet-stream body over `runtimeFetch`, which is what the files tree
 * upload uses too, so relay and tunnel runtimes carry it unchanged.
 */
export declare const uploadGuestZip: (file: File, options?: InstallGuestOptions) => Promise<InstallGuestResult>;
export declare const uninstallGuest: (id: string) => Promise<UninstallGuestResult>;
export declare const setGuestEnabled: (id: string, enabled: boolean) => Promise<boolean>;
/** Record the user's answer to the approval dialog. An empty list withdraws approval. */
export declare const approveGuestCapabilities: (id: string, granted: readonly GuestCapability[]) => Promise<boolean>;
export {};
