type OpenCodeStartupState = {
    /** Sends waiting for OpenCode's first connection; the composer can show it. */
    waitingSends: number;
};
export declare const useOpenCodeStartupStore: import("zustand").UseBoundStore<import("zustand").StoreApi<OpenCodeStartupState>>;
type ConnectionState = {
    isConnected: boolean;
    hasEverConnected: boolean;
};
/** True while this page has not yet connected to OpenCode. */
export declare const isOpenCodeStarting: (state?: ConnectionState) => boolean;
export declare class OpenCodeStartupError extends Error {
}
/**
 * Resolves at once unless OpenCode is still starting; then resolves when it
 * connects. Rejects when the runtime changes meanwhile or OpenCode does not
 * start within `timeoutMs`, so the caller restores the message.
 */
export declare function waitForOpenCodeStartup(timeoutMs?: number): Promise<void>;
/**
 * A read made while OpenCode was starting may have failed only because
 * OpenCode was not there yet. The session message loader uses this to read
 * again once it connects instead of showing that failure. It is not a held send, so the
 * composer's "Waiting for OpenCode" note does not count it.
 */
export declare const openCodeStartupSignal: {
    isStarting: () => boolean;
    waitForConnection: (timeoutMs?: number) => Promise<void>;
};
/**
 * Runs a send once OpenCode has started, in the order sends were made. Every
 * send held through startup would otherwise go out on the same connection
 * notification and race: a later message could reach OpenCode first, and
 * each would fetch the session's project knowledge before the other reported
 * it delivered. A held send starts only after the one before it settled, that
 * is, was handed to OpenCode or failed. A send made while held sends are
 * still going out queues behind them too.
 */
export declare function runAfterOpenCodeStartup<T>(send: () => Promise<T>, timeoutMs?: number): Promise<T>;
export {};
