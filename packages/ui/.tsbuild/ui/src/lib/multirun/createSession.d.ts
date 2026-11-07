import type { ModelRef, Session } from '@/lib/opencode/model';
import { type MultiRunIdentity } from './identity';
/** Bind the server-assigned ID before dispatch. A fork inherits this ID and cannot join. */
export declare function createMultiRunSession(input: {
    title: string;
    directory: string;
    identity: Omit<MultiRunIdentity, 'key'>;
    /** Model and agent the run is pinned to; v2 sets them on the session, not per prompt. */
    selection?: {
        model?: ModelRef;
        agent?: string;
    };
}, assertCurrent: () => void): Promise<Session>;
