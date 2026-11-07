import type { SyncEvent } from '@/lib/opencode/events';
import type { FormRequest, PermissionRequest } from '@/lib/opencode/model';
import type { HostSessionStatusSnapshot } from '@/lib/opencode/session-status';
export type BlockingPermissionRequest = Pick<PermissionRequest, 'id' | 'sessionID' | 'action' | 'resources' | 'save'>;
export type BlockingFormRequest = Pick<FormRequest, 'id' | 'sessionID' | 'title'>;
/**
 * A page an agent showed that waits for the user's answer (render.page with
 * awaitAnswer). It blocks the agent like a form, so every surface shows it as
 * one, but it is answered on the page in the chat: it is kept apart from
 * forms so nothing tries to answer it as a form. `id` is the tool call id.
 */
type BlockingPageRequest = {
    id: string;
    sessionID: string;
    title: string;
};
type PendingBlockingRequests = {
    directory: string;
    permissions: readonly BlockingPermissionRequest[];
    forms: readonly BlockingFormRequest[];
    pages: readonly BlockingPageRequest[];
};
type GlobalBlockingRequestsState = {
    bySession: ReadonlyMap<string, PendingBlockingRequests>;
};
export declare const useGlobalBlockingRequestsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GlobalBlockingRequestsState>>;
export declare const resetGlobalBlockingRequests: () => void;
/** Applies request lifecycle events for one directory. Other event types are ignored cheaply. */
export declare const applyGlobalBlockingRequestEvents: (rawDirectory: string, payloads: readonly SyncEvent[]) => void;
/**
 * Applies the server's announcement that a page an agent showed started or
 * stopped waiting for the user's answer. The server names the session's
 * directory when it knows it; otherwise `resolveDirectory` finds it, and a
 * page whose session this client cannot place is left out until the next
 * seed.
 */
export declare const applyWaitingPageEvent: (event: Extract<SyncEvent, {
    type: 'openchamber.page-waiting' | 'openchamber.page-settled';
}>, resolveDirectory: (sessionId: string) => string | null) => void;
/**
 * The host owns page waits directly, unlike permissions and forms forwarded
 * from OpenCode. Its complete pending map can clear pages after a missed end
 * event. Overlay events received during the read, including settlements whose
 * ask was missed, so a delayed response cannot bring an answered page back.
 * Only this in-flight read retains those mutations.
 */
export declare const readHostBlockingRequestsSnapshot: (read: () => Promise<HostSessionStatusSnapshot | null>, resolveDirectory: (sessionId: string) => string | null) => Promise<HostSessionStatusSnapshot | null>;
export {};
