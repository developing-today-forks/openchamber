/**
 * Sync refs — imperative access to sync state from non-React code.
 *
 * SyncProvider sets these refs on mount. Store actions (session-ui-store,
 * session-actions) use them to read child-store domain data without hooks.
 */
import type { OpenCodeClient } from "@opencode/client";
import type { Config } from "@/lib/opencode/model";
import type { ChildStoreManager } from "./child-store";
import type { State } from "./types";
export declare function setSyncRefs(_sdk: OpenCodeClient, childStores: ChildStoreManager, directory: string, registerSessionDirectory?: (sessionID: string, directory: string) => void): void;
/** Pre-register a session→directory mapping in the routing index.
 *  Called from session-actions when creating sessions so SSE events
 *  arriving before session.created can be routed correctly. */
export declare function registerSessionDirectory(sessionID: string, directory: string): void;
export declare function getSyncChildStores(): ChildStoreManager;
/** Read current directory's child store state. Returns undefined if not bootstrapped. */
export declare function getDirectoryState(directory?: string): State | undefined;
/** Read resolved OpenCode config from a directory child store, if bootstrapped. */
export declare function getSyncConfig(directory?: string): Config | undefined;
export declare function subscribeToSyncConfigChanges(listener: (directory: string, config: Config) => void): () => void;
export declare function emitSyncConfigChanged(directory: string, config: Config): void;
/** Read sessions from current directory's child store */
export declare function getSyncSessions(directory?: string): import("@/lib/opencode/model").Session[];
/** Read sessions across all initialized child stores */
export declare function getAllSyncSessions(): import("@/lib/opencode/model").Session[];
/** Read the cached cross-directory session index, rebuilding only when a session slice changes. */
export declare function getAllSyncSessionMap(): ReadonlyMap<string, State["session"][number]>;
/**
 * Directory of a child store that holds this session.
 *
 * This reports containment, not ownership, and a session can be held by more
 * than one store: a project's session list includes the sessions of its
 * worktrees so the sidebar can group them, so the parent repository holds
 * worktree sessions too. Ownership comes from the session record's own
 * directory; this is the fallback for a record that carries none. Returns
 * `null` when no initialized child store contains the session, which means
 * "unknown", never "no directory".
 */
export declare function getSyncSessionDirectory(sessionId: string): string | null;
/** Read messages for a session from current directory's child store */
export declare function getSyncMessages(sessionId: string, directory?: string): import("@/lib/opencode/model").Message[];
/** Read renderability of a session snapshot from current directory's child store */
export declare function getSyncSessionMaterializationStatus(sessionId: string, directory?: string): import("./materialization").SessionMaterializationStatus;
/** Read parts for a message from current directory's child store */
export declare function getSyncParts(messageId: string, directory?: string): import("@/lib/opencode/model").Part[];
/** Read session status from current directory's child store */
export declare function getSyncSessionStatus(sessionId: string, directory?: string): import("@opencode/client").SessionStatus | undefined;
