import type { SessionWorktreeAttachment } from '@/stores/types/sessionTypes';
interface SessionWorktreeState {
    attachments: Map<string, SessionWorktreeAttachment>;
}
interface SessionWorktreeActions {
    setAttachment(sessionId: string, attachment: SessionWorktreeAttachment): void;
    getAttachment(sessionId: string): SessionWorktreeAttachment | undefined;
    clearAttachment(sessionId: string): void;
}
type SessionWorktreeStore = SessionWorktreeState & SessionWorktreeActions;
export declare const useSessionWorktreeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionWorktreeStore>>;
export {};
