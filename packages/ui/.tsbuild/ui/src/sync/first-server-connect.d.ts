/**
 * The first `server.connected` OpenCode sends to a sync owner in a runtime.
 *
 * Startup reads that ran while OpenCode was still starting fail, and the boot
 * window ignores `server.connected` as a stream restart. This first event is
 * the moment OpenCode answers, so work that failed before it is retried once,
 * here, instead of waiting for a poll or a user action.
 */
import type { ChildStoreManager } from "./child-store";
type FirstServerConnectListener = (runtimeKey: string) => void;
/**
 * True exactly once per owner and runtime: for the first `server.connected`
 * after the owner started or switched runtime.
 */
export declare function claimFirstServerConnect(owner: ChildStoreManager, runtimeKey: string): boolean;
export declare function notifyFirstServerConnect(runtimeKey: string): void;
export declare function subscribeFirstServerConnect(listener: FirstServerConnectListener): () => void;
export {};
