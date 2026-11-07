import { runtimeFetch } from '@/lib/runtime-fetch';
/**
 * An HTML preview is untrusted content. It runs in a sandboxed frame without
 * our origin and loads its files from `/api/fs/preview/<grant>/…`, a grant the
 * server mints for this one page. The grant lives in the path so the page's
 * relative URLs keep it; no session credential is ever in a URL the page reads.
 */
type HtmlPreviewRequest = {
    path: string;
    directory: string;
    revision: string;
    outsideWorkspace: boolean;
};
type HtmlPreviewUrlState = {
    status: 'idle';
} | {
    status: 'loading';
} | {
    status: 'ready';
    url: string;
} | {
    status: 'error';
    message: string;
};
type MintHtmlPreviewGrant = (request: HtmlPreviewRequest, signal: AbortSignal) => Promise<string>;
export declare const mintHtmlPreviewGrant: (request: HtmlPreviewRequest, signal: AbortSignal, fetcher?: typeof runtimeFetch) => Promise<string>;
export declare const htmlPreviewUrl: (grant: string, pagePath: string) => string;
export declare const useHtmlPreviewUrl: (request: HtmlPreviewRequest | null, errorFallback: string, mint?: MintHtmlPreviewGrant) => HtmlPreviewUrlState;
export {};
