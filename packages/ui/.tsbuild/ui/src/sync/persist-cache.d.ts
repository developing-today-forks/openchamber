/**
 * Persisted child-store metadata caches.
 *
 * VCS info, project metadata, icons, and a bounded session-list snapshot are
 * cached to localStorage per runtime and directory so they survive reloads.
 * A bounded global snapshot of active sessions outside the managed chats root
 * seeds the global session store for the first sidebar paint.
 * Message/part data is always loaded from the server.
 */
import type { Session, Vcs } from "@/lib/opencode/model";
import type { ProjectMeta } from "./types";
/** Write every pending session snapshot of the active runtime now. */
export declare function flushPendingSessionWrites(): void;
export type PersistedDirCache = {
    vcs: Vcs | undefined;
    projectMeta: ProjectMeta | undefined;
    icon: string | undefined;
    sessions: Session[] | undefined;
};
export declare function readDirCache(directory: string): PersistedDirCache;
/**
 * Write a capped slice of the directory session list to cache so the sidebar
 * can paint chats instantly on cold start. Refreshed by bootstrap loadSessions.
 */
export declare function persistSessions(directory: string, sessions: Session[] | undefined): void;
/**
 * Drops everything cached for a directory the host no longer has: its session
 * snapshot, a pending write of it included, and its metadata. The legacy keys go
 * with the current ones, so nothing of the directory comes back at the next start.
 */
export declare function forgetDirCache(directory: string): void;
export declare function readManagedChatSessions(expectedRuntimeKey?: string): Session[];
export declare function persistManagedChatSessions(sessions: Session[]): void;
/**
 * The persisted global snapshot for the active runtime, a startup seed and
 * never proof that a session exists. Missing, corrupt, or foreign data reads
 * as no seed; corrupt data is removed.
 */
export declare function readGlobalSessionSnapshot(): Session[];
/**
 * Persist the most recent active sessions (with their ancestors) for the next
 * cold start. Throttled with the directory snapshots; VS Code keeps none,
 * since its sidebar covers the open workspace, which its directory snapshot
 * already seeds.
 */
export declare function persistGlobalSessionSnapshot(sessions: Session[]): void;
/** Write vcs info to cache */
export declare function persistVcs(directory: string, vcs: Vcs | undefined): void;
/** Write project metadata to cache */
export declare function persistProjectMeta(directory: string, meta: ProjectMeta | undefined): void;
/** Write icon to cache */
export declare function persistIcon(directory: string, icon: string | undefined): void;
