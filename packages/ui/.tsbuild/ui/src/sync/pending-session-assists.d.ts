/**
 * A wait the server never ends for this client (a missed end event) stops
 * holding the directory after the longest real one: the 60 s quiet window, the
 * turn-end check and a 120 s generation, with room to spare.
 */
export declare const PENDING_ASSIST_MAX_AGE_MS: number;
/** Called with a test for the directories whose wait just ended. */
type SettledListener = (isSettledDirectory: (directory: string) => boolean) => void;
/** Applies the server's announcement; a settled wait notifies the listeners. */
export declare function applySessionAssistEvent(event: {
    sessionID: string;
    directory: string | null;
    pending: boolean;
}, resolveDirectory: (sessionId: string) => string | null, now?: number): void;
/** Whether the server is still to write an assist for a session in `directory`. */
export declare function hasPendingSessionAssist(directory: string, now?: number): boolean;
export declare function subscribeSessionAssistSettled(listener: SettledListener): () => void;
/** Another runtime's waits say nothing about the new one. */
export declare function resetPendingSessionAssists(): void;
export {};
