/**
 * Session status bootstrap is now handled by the sync system's own bootstrap
 * (sync/bootstrap.ts). This hook is retained as a no-op for call-site compat.
 */
export declare const useSessionStatusBootstrap: (_options?: {
    enabled?: boolean;
}) => void;
