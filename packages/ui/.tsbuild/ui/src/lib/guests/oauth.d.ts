import { type GuestConnection, type GuestRequest, type GuestRequestResult, type GuestSettings, type HostRequestErrorCode } from '@openchamber/sdk';
export type GuestRequestProxyResult = {
    ok: true;
    result: GuestRequestResult;
} | {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
};
export declare const parseGuestRequestProxyResponse: (response: Response) => Promise<GuestRequestProxyResult>;
export type GuestOauthStatus = {
    connection: GuestConnection;
    settings: GuestSettings;
    hasClient: boolean;
    redirectUri: string;
};
export declare const loadGuestOauthStatus: (guestId: string) => Promise<GuestOauthStatus | null>;
export declare const saveGuestOauthClient: (guestId: string, clientId: string, clientSecret?: string) => Promise<GuestOauthStatus | null>;
export declare const saveGuestAccessToken: (guestId: string, token: string, username?: string) => Promise<GuestOauthStatus | null>;
export declare const saveGuestSettings: (guestId: string, settings: GuestSettings) => Promise<GuestOauthStatus | null>;
export declare const startGuestOauth: (guestId: string) => Promise<string | null>;
export declare const disconnectGuestOauth: (guestId: string) => Promise<GuestOauthStatus | null>;
export declare const AUTHORIZATION_WATCH_MS: number;
export declare const AUTHORIZATION_POLL_MS = 1500;
export declare const guestAuthorizationCompleted: (previous: GuestOauthStatus['connection'], next: GuestOauthStatus['connection']) => boolean;
export declare const proxyGuestRequest: (guestId: string, request: GuestRequest) => Promise<GuestRequestProxyResult>;
