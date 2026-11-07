/**
 * Auto-review is driven from the UI: it forwards the implementer's answer to
 * the reviewer and back while the original session bounces through idle. The
 * queue owner must not deliver into those gaps, so while a run is going the
 * server is told to hold that session's queue, and released when it ends.
 */
export declare function useMessageQueueHoldSync(): void;
