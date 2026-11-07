import type { ChatMessageEntry } from './turns/types';
/**
 * The message a timeline row renders, with malformed parts dropped.
 *
 * Cached by source reference: streaming re-renders resolve an unchanged
 * message without rebuilding it, which also keeps its identity stable for the
 * turn projection.
 */
export declare const getNormalizedMessageForDisplay: (message: ChatMessageEntry) => ChatMessageEntry;
