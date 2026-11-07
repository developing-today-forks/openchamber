type NotificationBase = {
    directory?: string;
    session?: string;
    time: number;
    viewed: boolean;
};
type TurnCompleteNotification = NotificationBase & {
    type: "turn-complete";
};
type ErrorNotification = NotificationBase & {
    type: "error";
    /** What OpenCode reported for the failed turn; both null when it gave no details. */
    error?: {
        name: string | null;
        message: string | null;
        responseBody?: string | null;
    };
};
export type Notification = TurnCompleteNotification | ErrorNotification;
type NotificationIndex = {
    session: {
        unseenCount: Record<string, number>;
        unseenHasError: Record<string, boolean>;
    };
    project: {
        unseenCount: Record<string, number>;
        unseenHasError: Record<string, boolean>;
    };
};
interface NotificationStore {
    list: Notification[];
    index: NotificationIndex;
    append: (notification: Notification) => void;
    markSessionViewed: (sessionId: string) => void;
    markProjectViewed: (directory: string) => void;
    sessionUnseenCount: (sessionId: string) => number;
    sessionHasError: (sessionId: string) => boolean;
    projectUnseenCount: (directory: string) => number;
    projectHasError: (directory: string) => boolean;
}
export declare const useNotificationStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NotificationStore>>;
export declare function appendNotification(notification: Notification): void;
export declare function markSessionViewed(sessionId: string): void;
export declare function useSessionUnseenCount(sessionId: string): number;
/** The newest error OpenCode reported for this session, viewed or not. */
export declare function useLatestSessionError(sessionId: string): ErrorNotification | null;
export {};
