/**
 * Mirrors the server's per-session warming. The snapshot is read when the
 * control stream (re)connects, since changes during a gap were not seen, and
 * each change arrives whole on the stream. VS Code has no OpenChamber server
 * and keeps only OpenCode's global warming, so its store stays empty.
 */
export declare const subscribeSessionWarmingSync: (runtimeKey: string) => (() => void);
