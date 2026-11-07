/**
 * The pinned sessions of the current runtime, as keys (`getPinnedSessionKey`).
 * The authority is each session's metadata, which the server shares with every
 * client; this store derives the set from the global session list and overlays
 * two things on it: a pin or unpin the user just clicked, until the server
 * answers, and pins an older version kept on this device only, until they are
 * written to the server (`sync/session-pins.ts`).
 */
type SessionPinnedStore = {
    ids: Set<string>;
};
type LegacyPin = {
    key: string;
    runtimeKey: string;
    directory: string;
    sessionId: string;
};
export declare const useSessionPinnedStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionPinnedStore>>;
/** Show a pin or unpin before the server confirms it; `null` drops the overlay. */
export declare const setPendingPin: (key: string, pinned: boolean | null) => void;
/** This device's old local pins on a runtime, still to be written to the server. */
export declare const getLegacyPins: (runtimeKey: string) => LegacyPin[];
/** Drop local pins that reached the server, or whose session is gone. */
export declare const forgetLegacyPins: (keys: readonly string[]) => void;
export {};
