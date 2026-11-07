import type { Metadata, Session } from '@/lib/opencode/model';
/**
 * A pin lives in the session's metadata, `session.metadata.openchamber.pinned`,
 * so every client of the server sees it, the way In work state travels. The
 * sidebar and the lists match pins by a key of runtime, directory and session:
 * the same session id can appear under two directories, and a runtime switch
 * must not carry one server's pins onto another.
 */
export declare const getPinnedSessionKey: (runtimeKey: string, directory: string, sessionId: string) => string | null;
export declare const isSessionPinned: (ids: ReadonlySet<string>, directory: string | null | undefined, sessionId: string) => boolean;
export declare const isSessionPinnedInMetadata: (session: Session | null | undefined) => boolean;
/** The metadata after the user pinned (`at` = when) or unpinned the session. */
export declare function withSessionPinned(metadata: Metadata, pinned: boolean, now: number): Metadata;
