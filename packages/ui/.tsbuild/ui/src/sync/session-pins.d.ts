type PinTarget = {
    directory: string;
    sessionId: string;
};
/**
 * Pin or unpin a session. The row flips at once; the pin is stored in the
 * session's metadata on the server, which tells every other client. Rejects
 * when the server could not store it, and the row flips back.
 */
export declare function toggleSessionPin(target: PinTarget): Promise<void>;
export {};
