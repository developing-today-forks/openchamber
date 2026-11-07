export declare const isExternalHttpUrl: (url: string) => boolean;
/** Lowercased URL scheme without the trailing colon, or null when unparseable. */
export declare const getUrlScheme: (url: string) => string | null;
/**
 * True for custom application deep links such as `obsidian://`, `linear://`,
 * or `vscode://`. Browser-handled and dangerous/internal schemes are excluded,
 * so a true result means the link may be offered to the user behind a
 * confirmation the first time its scheme appears.
 */
export declare const isAppLinkUrl: (url: string) => boolean;
export declare const getExternalFaviconUrl: (url: string) => string | null;
/**
 * Returns true when the URL is an http(s) URL pointing at a loopback host
 * (localhost, 127.0.0.1, 0.0.0.0, ::1). Used to decide whether to offer an in-app
 * preview pane instead of opening the system browser.
 */
export declare const isLoopbackHttpUrl: (url: string) => boolean;
/**
 * Extracts loopback http(s) URLs from a free-text string. Returns unique URLs
 * in order of first appearance. Trailing punctuation that is unlikely to be
 * part of a real URL is stripped.
 */
export declare const extractLoopbackUrls: (text: string) => string[];
export declare const openExternalUrl: (url: string) => Promise<boolean>;
/** Opens a classified app link after the caller has completed confirmation. */
export declare const openConfirmedAppLinkUrl: (url: string) => Promise<boolean>;
