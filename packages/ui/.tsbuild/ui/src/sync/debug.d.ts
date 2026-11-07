/**
 * Sync debug logging — gated behind localStorage flag.
 *
 * Enable in browser console:
 *   localStorage.setItem("openchamber:sync:debug", "1")
 *
 * Disable:
 *   localStorage.removeItem("openchamber:sync:debug")
 *
 * All checks are early-returns on the hot path — zero cost when disabled.
 */
export declare const syncDebug: {
    readonly pipeline: {
        /** Event coalesced (replaced an earlier event in the queue). */
        readonly coalesced: (eventType: string, coalesceKey: string) => void;
        /** Flush batch dispatched. */
        readonly flush: (count: number) => void;
    };
    readonly reducer: {
        /** message.updated skipped because role/finish/completed matched existing. */
        readonly messageUpdatedUnchanged: (sessionID: string, messageID: string, role: string, finish: unknown, completed: unknown) => void;
        /** message.part.updated arrived but no parts array exists for this messageID. */
        readonly partUpdatedNoExistingParts: (messageID: string, partID: string, partType: string) => void;
        /** message.part.delta arrived but parts array missing — silently dropped. */
        readonly partDeltaNoParts: (messageID: string, partID: string) => void;
        /** message.part.delta arrived but partID not found in parts array. */
        readonly partDeltaNotFound: (messageID: string, partID: string) => void;
        /** SKIP_PARTS filtered out a part. */
        readonly partSkipped: (messageID: string, partID: string, partType: string) => void;
    };
    readonly dispatch: {
        /** Event dispatched to store but reducer returned false (no state change). */
        readonly eventNoChange: (eventType: string, sessionID?: string, messageID?: string) => void;
        /** Event applied to store successfully. */
        readonly eventApplied: (eventType: string, sessionID?: string, messageID?: string) => void;
    };
    readonly recovery: {
        /** A scoped session snapshot fetch is starting because live state looked incomplete. */
        readonly materializing: (details: {
            reason: string;
            directory: string;
            sessionID: string;
            messageID?: string;
            partID?: string;
        }) => void;
    };
};
