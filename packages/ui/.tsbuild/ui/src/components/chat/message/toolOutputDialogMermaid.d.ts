import type { I18nKey, I18nParams } from '@/lib/i18n';
export declare class MermaidLoadFailure extends Error {
    key: I18nKey;
    params?: I18nParams;
    constructor(key: I18nKey, params?: I18nParams);
}
export declare const isMermaidLoadFailure: (value: unknown) => value is MermaidLoadFailure;
export declare const nextMermaidLoadRequestId: (current: number) => number;
export declare const isCurrentMermaidLoadRequest: (current: number, requestId: number) => boolean;
export declare const getMermaidDataUrlSourcePromise: (value: string) => Promise<string>;
export declare const MERMAID_REMOTE_LOAD_TIMEOUT_MS = 15000;
export declare const MERMAID_REMOTE_MAX_BYTES: number;
export declare const MERMAID_FILE_MAX_BYTES: number;
export interface MermaidRemoteLoadOptions {
    /** Caller lifecycle: aborting it (load superseded, dialog closed) aborts the request. */
    signal?: AbortSignal;
    fetchImpl?: typeof fetch;
    timeoutMs?: number;
    maxBytes?: number;
}
export interface MermaidFileLoadOptions {
    controller: AbortController;
    fetchImpl: (signal: AbortSignal) => Promise<Response>;
    maxBytes?: number;
}
export declare const getMermaidFileSourcePromise: (options: MermaidFileLoadOptions) => Promise<string>;
export declare const getMermaidRemoteSourcePromise: (url: string, options?: MermaidRemoteLoadOptions) => Promise<string>;
