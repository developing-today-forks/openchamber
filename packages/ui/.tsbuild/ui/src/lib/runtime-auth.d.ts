type RuntimeAuthCredential = {
    type: 'bearer';
    token: string;
} | null;
type RuntimeAuthCredentialProvider = () => RuntimeAuthCredential | Promise<RuntimeAuthCredential>;
export declare const clearRuntimeUrlAuthToken: () => void;
export declare const setRuntimeAuthCredentialProvider: (provider: RuntimeAuthCredentialProvider) => void;
export declare const clearRuntimeAuthCredentialProvider: () => void;
export declare const setRuntimeBearerToken: (token: string | null | undefined) => void;
export declare const setRuntimeExtraHeaders: (headers: Record<string, string> | null | undefined) => void;
export declare const getRuntimeExtraHeadersSync: () => Record<string, string>;
export declare const getRuntimeBearerTokenSync: () => string;
export declare const setRuntimeUrlAuthToken: (token: string | null | undefined, expiresAt: number | null | undefined) => void;
export declare const setLocalRuntimeUrlAuthToken: (token: string | null | undefined, expiresAt: number | null | undefined, localOrigin?: string | null) => void;
export declare const getRuntimeUrlAuthTokenSync: () => string;
export declare const getLocalRuntimeUrlAuthTokenSync: (localOrigin?: string | null) => string;
type MintedUrlAuthToken = {
    token: string;
    expiresAt: number;
};
/**
 * A token that opens only one guest's package files. It is never cached: the
 * guest iframe URL is readable by the guest's own script, so every mount gets a
 * fresh token that is worthless outside `/api/guests/<id>/`.
 */
export declare const mintGuestFrameUrlAuthToken: (guestId: string) => Promise<MintedUrlAuthToken>;
export declare const refreshRuntimeUrlAuthToken: (apiBaseUrl?: string | null) => Promise<string>;
export declare const refreshLocalRuntimeUrlAuthToken: (localOrigin: string) => Promise<string>;
export declare const acquireRuntimeUrlAuthToken: (apiBaseUrl?: string | null) => (() => void);
export declare const subscribeRuntimeUrlAuthToken: (listener: () => void) => (() => void);
export declare const buildRuntimeAuthHeaders: (headers?: HeadersInit) => Promise<Headers>;
export {};
