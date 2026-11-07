import type { LinearAPI } from '@/lib/api/types';
/**
 * Origin Linear comments should open. Packaged desktop UI lives on
 * `openchamber-ui://`, which is not a URL a browser can load from Linear, so
 * report the http origin the local server actually listens on instead. The
 * server decides whether that origin is reachable by anyone else; a comment is
 * only posted when it is.
 */
export declare function resolveLinearSessionOrigin(): string | undefined;
export declare function postLinearSessionStarted(linear: LinearAPI | undefined, args: {
    sessionId: string;
    issueIdentifier: string;
}): void;
