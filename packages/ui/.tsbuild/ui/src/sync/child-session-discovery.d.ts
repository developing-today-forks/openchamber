import type { Session } from "@/lib/opencode/model";
/**
 * Pick the subsessions a discovery listing adds to a directory store: every
 * session below a watched parent, at any depth. A subagent can launch its own,
 * so a grandchild is found through its parent even when the store already has
 * that parent.
 *
 * The listing asks the server for active sessions only, but it is a plain
 * request with no ordering against local mutations: a response that left the
 * server before the user archived a parent still carries the children without
 * `time.archived`, and adding them back would show them as active orphans until
 * the next refresh. The global sessions cache learns about an archive before
 * the archive action resolves, so a session it already lists as archived,
 * watched parent or listed child, is a stale copy: nothing below it is added.
 * Credit for spotting the race: #2580.
 */
export declare const selectNewChildSessions: (listed: readonly Session[], existingIds: ReadonlySet<string>, parentIds: ReadonlySet<string>, isKnownArchived: (sessionId: string) => boolean) => Session[];
