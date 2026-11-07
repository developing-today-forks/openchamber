/** Fire-and-forget wrapper: schedule the refresh after a relay switch settles. */
export declare const scheduleDesktopHostCandidateRefresh: (hostId: string) => void;
/**
 * On desktop startup, reconnect a relay-capable default host. The Electron
 * shell boots the LOCAL UI for any host that carries a relay leg and defers
 * transport selection to the renderer: here we probe the direct address first
 * (cheap, preferred on the home network) and fall back to the E2EE tunnel via
 * switchRuntimeEndpoint({ relay }) — the multi-transport model mobile uses.
 * Direct-only hosts never reach this path (the shell injects their
 * apiBaseUrl/token as window globals before render).
 *
 * Safe to call unconditionally; it is a no-op outside the Electron shell and when
 * the default host is local or already active.
 */
export declare const restoreDesktopRelayRuntime: (targetHostId?: string, options?: {
    reconnectActive?: boolean;
}) => Promise<void>;
