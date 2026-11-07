import { type TrackedItem, type TrackedItemState } from './model';
type StreamEvent = {
    type: 'event-stream-ready';
    connectionId: string | null;
} | {
    type: 'tracked-items-changed';
    records: Array<{
        key: string;
        record: TrackedItemState;
    }>;
} | {
    type: 'source-control-activity';
    directory: string;
} | {
    type: string;
};
type InterestRequest = {
    path: '/api/tracked-items/interest';
    body: {
        connectionId: string;
        visible: boolean;
        items: TrackedItem[];
    };
};
type PresenceRequest = {
    path: '/api/tracked-items/presence';
    body: {
        connectionId: string;
        visible: boolean;
    };
};
type Dependencies = {
    subscribe: (listener: (event: StreamEvent) => void) => void;
    post: (request: InterestRequest | PresenceRequest) => Promise<Response>;
    apply: (records: Array<{
        key: string;
        record: TrackedItemState;
    }>) => void;
    isVisible: () => boolean;
    onVisibilityChange: (listener: () => void) => void;
    /** An agent turn finished in a directory: branches there may have a new pull request. */
    onBranchActivity?: (directory: string) => void;
    /** The window became visible again. */
    onWindowReturned?: () => void;
    warn?: (message: string) => void;
};
export declare function createTrackedItemsInterest({ subscribe, post, apply, isVisible, onVisibilityChange, onBranchActivity, onWindowReturned, warn, }: Dependencies): {
    /** Starts listening without following anything yet, so signals reach watched branches. */
    start: () => void;
    declare(token: symbol, items: readonly TrackedItem[]): void;
    release(token: symbol): void;
};
/**
 * Follows these items while the calling component is mounted. The server
 * starts answering at once and pushes changes; read them with the
 * `useTracked*States` selectors.
 */
export declare function useTrackedItems(items: readonly TrackedItem[]): void;
export {};
