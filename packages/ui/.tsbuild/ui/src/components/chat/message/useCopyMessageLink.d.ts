/** "Copy link" for a message, or undefined where this surface has no message links. */
export declare const useCopyMessageLink: (sessionId: string | undefined, messageId: string) => (() => void) | undefined;
