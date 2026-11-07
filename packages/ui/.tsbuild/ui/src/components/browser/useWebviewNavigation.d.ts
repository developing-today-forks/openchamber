import { type BrowserNavStatus } from '@/lib/browser/contract';
/** Reads a webview event payload, whichever shape this Electron version uses. */
export declare const readEventPayload: <T extends object>(event: Event) => Partial<T>;
export type WebviewNavigation = {
    readonly status: BrowserNavStatus;
    readonly url: string;
    readonly title: string;
    readonly canGoBack: boolean;
    readonly canGoForward: boolean;
};
export declare const useWebviewNavigation: (webview: WebviewElement | null, { initialUrl, onUrlChange }: {
    initialUrl: string;
    onUrlChange: (url: string) => void;
}) => WebviewNavigation;
