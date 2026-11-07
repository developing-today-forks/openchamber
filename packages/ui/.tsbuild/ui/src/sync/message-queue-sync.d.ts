/**
 * Queue events use the control SSE stream even while OpenCode uses WS. A space's queue lives in
 * that space's own server: it is read once the space is known, again when the host follows its
 * queue again, and with the host's after a gap in the stream.
 */
export declare const subscribeMessageQueueSync: (runtimeKey: string) => (() => void);
