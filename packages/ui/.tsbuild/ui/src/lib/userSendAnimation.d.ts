/**
 * Module-level tracker for user-send animations.
 *
 * Marks a session when the user presses "send" so that MessageList
 * can distinguish genuinely new user messages from historical ones
 * arriving via async loading / session switch.
 */
/** Call when user triggers a send (before the API call). */
export declare const markPendingUserSendAnimation: (sessionId: string) => void;
/** Check whether this session has pending send animations. */
export declare const hasPendingUserSendAnimation: (sessionId: string) => boolean;
/**
 * Consume one pending send animation for the session.
 * Returns true if there was one to consume.
 */
export declare const consumePendingUserSendAnimation: (sessionId: string) => boolean;
