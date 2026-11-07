/**
 * Hook that resolves the effective working directory for tabs (Git, Diff, Files, Terminal).
 *
 * This ensures that tabs show content from the correct project directory
 * even when a draft session is being created.
 */
export declare const useEffectiveDirectory: () => string | undefined;
/**
 * Imperative twin of `useEffectiveDirectory` for the main chat: what the
 * hook returns outside a chat column, read once from the stores. For event
 * handlers in components that render many times (a session row) and must not
 * subscribe to the selection.
 */
export declare const resolveEffectiveDirectory: () => string | undefined;
