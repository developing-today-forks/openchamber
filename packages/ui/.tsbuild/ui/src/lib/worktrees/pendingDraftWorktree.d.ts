export declare const createPendingDraftWorktreeRequest: () => string;
export declare const resolvePendingDraftWorktreeRequest: (id: string, directory: string, options?: {
    keep?: boolean;
}) => void;
export declare const rejectPendingDraftWorktreeRequest: (id: string, error: Error, options?: {
    keep?: boolean;
}) => void;
export declare const waitForPendingDraftWorktreeRequest: (id: string) => Promise<string>;
export declare const noteDraftSendWaiting: (id: string, waiting: boolean) => void;
export declare const isDraftSendWaiting: (id: string | null | undefined) => boolean;
export declare const subscribeDraftSendWaiting: (listener: () => void) => (() => void);
