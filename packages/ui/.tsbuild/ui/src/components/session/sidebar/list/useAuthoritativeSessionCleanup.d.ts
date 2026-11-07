import type { Session } from '@/lib/opencode/model';
export declare const useAuthoritativeSessionCleanup: (args: {
    enabled?: boolean;
    hasAuthoritativeGlobalSessions: boolean;
    sessions: Session[];
}) => void;
