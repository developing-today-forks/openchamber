import type { Session } from '@/lib/opencode/model';
type AuthoritativeSessionIdentity = {
    directory: string;
    sessionId: string;
};
export declare const buildAuthoritativeSessionIdentityMap: (sessions: Session[]) => Map<string, AuthoritativeSessionIdentity>;
export declare const findRemovedAuthoritativeSessions: (previous: ReadonlyMap<string, AuthoritativeSessionIdentity> | null, current: ReadonlyMap<string, AuthoritativeSessionIdentity>) => AuthoritativeSessionIdentity[];
export {};
