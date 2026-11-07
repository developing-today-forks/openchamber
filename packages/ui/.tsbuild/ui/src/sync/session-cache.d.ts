import type { FormRequest, Message, Part, PermissionRequest, SessionStatus } from "@/lib/opencode/model";
type SessionCache = {
    session_status: Record<string, SessionStatus | undefined>;
    message: Record<string, Message[] | undefined>;
    part: Record<string, Part[] | undefined>;
    permission: Record<string, PermissionRequest[] | undefined>;
    form: Record<string, FormRequest[] | undefined>;
};
export declare function getProtectedSessionCacheIds(store: SessionCache): Set<string>;
export declare function dropSessionCaches(store: SessionCache, sessionIDs: Iterable<string>): void;
export declare function pickSessionCacheEvictions(input: {
    seen: Set<string>;
    keep?: string;
    limit: number;
    preserve?: Iterable<string>;
}): string[];
export {};
