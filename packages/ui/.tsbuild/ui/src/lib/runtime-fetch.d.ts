import { type RuntimeUrlQuery } from './runtime-url';
export interface RuntimeFetchOptions extends RequestInit {
    query?: RuntimeUrlQuery;
    /**
     * The directory the request is about, when the request does not name it in its query or
     * its directory header. A directory inside an isolated space sends the request to that
     * space; see `withSpaceDirectory`.
     */
    directory?: string | null;
}
export declare const addRuntimeProxyHeaders: (url: string, headers: Headers) => Headers;
export declare const buildRuntimeFetchUrl: (input: string, query?: RuntimeUrlQuery) => string;
export declare const isLatin1Safe: (value: string) => boolean;
export declare const sanitizeHeadersForBrowser: (init?: HeadersInit) => [string, string][] | undefined;
export declare const runtimeFetch: (rawInput: string | URL | Request, init?: RuntimeFetchOptions) => Promise<Response>;
export declare const installRuntimeFetchBridge: () => void;
