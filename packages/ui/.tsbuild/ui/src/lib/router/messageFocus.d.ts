export declare const isLinkIdentifier: (value: string) => boolean;
export type MessageFocusRequest = {
    readonly sessionId: string;
    readonly messageId: string;
    /** Tells a repeated click on the same link from the request it repeats. */
    readonly serial: number;
    readonly requestedAt: number;
};
export declare const requestMessageFocus: (sessionId: string, messageId: string) => void;
/** The link request for this session, if one is still standing. */
export declare const peekMessageFocus: (sessionId: string | null) => MessageFocusRequest | null;
/** Ends the request: the reader took over, or the message is missing. */
export declare const settleMessageFocus: (request: MessageFocusRequest) => void;
/** Entering a session drops a request that names another one. */
export declare const releaseMessageFocusOutside: (sessionId: string | null) => void;
/** The timeline put the requested message on screen (the request itself stands on). */
export declare const markMessageFocusShown: (request: MessageFocusRequest) => void;
/** The message a request in this session is still bringing to the screen, if any. */
export declare const readMessageFocusInFlight: (sessionId: string | null) => string | null;
export declare const subscribeMessageFocusStatus: (listener: () => void) => (() => void);
export declare const subscribeMessageFocus: (listener: () => void) => (() => void);
