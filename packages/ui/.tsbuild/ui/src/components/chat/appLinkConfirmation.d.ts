export type AppLinkConfirmationChoice = 'open' | 'trust' | 'cancel';
type PendingAppLinkRequest = {
    url: string;
    resolve: (choice: AppLinkConfirmationChoice) => void;
};
declare const getSnapshot: () => PendingAppLinkRequest | null;
declare const subscribe: (listener: () => void) => (() => void);
/**
 * Ask the user (via the app-level confirmation dialog) whether an application
 * deep link may be opened. Resolves immediately when the scheme was trusted
 * earlier. Only one request is active at a time; a new request cancels the
 * pending one.
 */
export declare const openAppLinkWithConfirmation: (url: string) => Promise<void>;
export declare const settleAppLinkConfirmation: (choice: AppLinkConfirmationChoice) => void;
export declare const subscribeAppLinkConfirmation: typeof subscribe;
export declare const getAppLinkConfirmationSnapshot: typeof getSnapshot;
export {};
