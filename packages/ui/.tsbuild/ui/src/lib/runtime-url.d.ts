type QueryValue = string | number | boolean | null | undefined;
export type RuntimeUrlQuery = Record<string, QueryValue> | URLSearchParams;
interface RuntimeUrlConfig {
    apiBaseUrl?: string | null;
    realtimeBaseUrl?: string | null;
    currentHref?: () => string;
}
export interface RuntimeUrlResolver {
    api(path: string, query?: RuntimeUrlQuery): string;
    authenticatedAsset(path: string, query?: RuntimeUrlQuery): string;
    /** Same as `authenticatedAsset` with a caller-minted scoped token instead of the session-wide one. */
    assetWithUrlToken(path: string, token: string, query?: RuntimeUrlQuery): string;
    auth(path: string, query?: RuntimeUrlQuery): string;
    health(query?: RuntimeUrlQuery): string;
    rawFile(path: string, options?: {
        download?: boolean;
        allowOutsideWorkspace?: boolean;
        outsideFileGrant?: string;
    }): string;
    sse(path: string, query?: RuntimeUrlQuery): string;
    websocket(path: string, query?: RuntimeUrlQuery): string;
}
export declare const createRuntimeUrlResolver: (config?: RuntimeUrlConfig) => RuntimeUrlResolver;
export declare const getRuntimeUrlResolver: () => RuntimeUrlResolver;
export declare const setRuntimeUrlResolver: (resolver: RuntimeUrlResolver) => void;
export declare const configureRuntimeUrlResolver: (config: RuntimeUrlConfig) => RuntimeUrlResolver;
export {};
