/**
 * Keeps the browser-provider setting honest after the server drops it.
 *
 * The server owns the choice of who answers the agent's browser actions. When
 * the chosen extension is paused, removed, or loses approval, the server writes
 * `builtin` back on its own; this hook mirrors that into the store, so
 * Settings shows the in-app browser again, and tells the user, so the next
 * agent run does not surprise them.
 */
export declare const useBrowserProviderSync: () => void;
