export interface SessionLinkTarget {
    readonly sessionId: string;
    readonly messageId: string | null;
}
/** Which kind of link a surface hands out; see `useCopyMessageLink`. */
export type MessageLinkForm = {
    readonly kind: 'deep-link';
} | {
    readonly kind: 'web';
    readonly origin: string;
    readonly pathname: string;
};
export declare const buildMessageLink: (sessionId: string, messageId: string, form: MessageLinkForm) => string | null;
/**
 * Reads a session or message link, as found in chat content. `ownOrigins` are
 * the addresses that serve this instance (the page, and the instance the app
 * is connected to): web links count only when they point at one of them.
 * A link that is just a session id counts too. Anything else, including other
 * native deep links, is not a session link.
 */
export declare const parseSessionLink: (href: string, ownOrigins: readonly string[]) => SessionLinkTarget | null;
/** True for `openchamber://session/...` links, the only native deep links chat content may carry. */
export declare const isSessionDeepLink: (href: string) => boolean;
