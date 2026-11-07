import type { Message } from "@/lib/opencode/model";
/**
 * Message IDs identify records; they are not chronology. OpenCode's sortable
 * ID timestamp rolls over, so a newly created `msg_000...` can follow a legacy
 * `msg_fff...`. Creation time is the authoritative transcript order, with ID
 * used only to make equal timestamps deterministic.
 */
export declare const compareMessagesChronologically: (left: Message, right: Message) => number;
export declare const sortMessagesChronologically: <T extends Message>(messages: readonly T[]) => T[];
export declare const findMessageIndex: (messages: readonly Message[], messageID: string) => number;
export declare const insertMessageChronologically: <T extends Message>(messages: T[], message: T) => number;
/** Return the messages before the marker's current array position. */
export declare const messagesBefore: <T extends Message>(messages: readonly T[], messageID?: string) => T[];
/** Return the marker and all messages after its current array position. */
export declare const messagesFrom: <T extends Message>(messages: readonly T[], messageID?: string) => T[];
