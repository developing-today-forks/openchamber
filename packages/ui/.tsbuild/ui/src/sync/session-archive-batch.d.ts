/**
 * OpenChamber-owned session routes: archive, unarchive, metadata, links.
 *
 * Archiving the sessions linked to a worktree one request at a time is what
 * made removing a worktree with many sessions take tens of seconds: every
 * session cost its own round trip and its own store reconciliation. This asks
 * the OpenChamber server to archive the whole batch next to OpenCode, so the
 * browser spends one request and reconciles once.
 *
 * OpenCode 2.x has no HTTP route that sets `time.archived` or rewrites a
 * session's metadata after creation, so OpenChamber keeps both itself, next to
 * OpenCode, per data directory. These routes are an OpenChamber capability, not
 * an OpenCode one. Runtimes that do not serve them (the VS Code webview has no
 * server process) answer with a stable unsupported status, and callers fall
 * back to a per-session path or report failure.
 */
import type { Metadata } from "@/lib/opencode/model";
import type { LinkedIssue } from '@/lib/linkedIssues';
export type SessionArchiveStamp = {
    id: string;
    archivedAt: number;
};
export type SessionArchiveBatchResult = {
    outcome: 'archived';
    archived: SessionArchiveStamp[];
    failedIds: string[];
} | {
    outcome: 'unavailable';
    reason: string;
};
export declare function requestSessionArchiveBatch(directory: string, ids: string[], archivedAt: number): Promise<SessionArchiveBatchResult>;
export type SessionUnarchiveBatchResult = {
    outcome: 'restored';
    restored: string[];
    failedIds: string[];
} | {
    outcome: 'unavailable';
    reason: string;
};
/** Clears `time.archived` for a batch of sessions. Mirrors the archive route. */
export declare function requestSessionUnarchiveBatch(ids: string[], directory?: string | null): Promise<SessionUnarchiveBatchResult>;
export type SessionMetadataUpdateResult = {
    outcome: 'updated';
    metadata: Metadata;
} | {
    outcome: 'unavailable';
    reason: string;
};
/**
 * Applies a JSON Merge Patch (RFC 7386) to a session's metadata: nested
 * objects merge key by key and `null` deletes. OpenCode only accepts metadata
 * at creation time, so the merged record lives with the OpenChamber server,
 * which folds it into every session record it serves. Resolves with the
 * session's full metadata after the patch.
 */
export declare function requestSessionMetadataUpdate(sessionID: string, patch: Metadata, directory?: string | null): Promise<SessionMetadataUpdateResult>;
export type SessionLinksUpdateResult = {
    outcome: 'updated';
    metadata: Metadata;
} | {
    outcome: 'unavailable';
    reason: string;
};
/**
 * Links or unlinks items on a session through OpenChamber's own route. The
 * server decides the new `linked_issues` list from its own fresh read inside
 * the session's write queue, so this sends only the operation — never a whole
 * list that a stale client snapshot could overwrite concurrent links with.
 * Resolves with the session's full metadata after the operation.
 */
export declare function requestSessionLinksUpdate(sessionID: string, entries: readonly LinkedIssue[], linked: boolean, directory?: string | null): Promise<SessionLinksUpdateResult>;
