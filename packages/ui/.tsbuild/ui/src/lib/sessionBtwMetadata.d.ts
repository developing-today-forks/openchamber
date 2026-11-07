import type { Session } from '@/lib/opencode/model';
import { type SessionMetadataRecord } from '@/lib/sessionReviewMetadata';
/** The parent's link to its active btw fork, or null. */
export declare const getBtwSessionID: (session: Session | null | undefined) => string | null;
/**
 * The session was once a btw fork and was promoted to a normal session.
 *
 * Its transcript still contains the btw boundary instruction on every message
 * sent while it was a side conversation, and there is no API to remove a
 * message part after the fact. The flag lets the composer send a notice that
 * those constraints have been lifted, so they cannot keep steering a session
 * that is no longer a side conversation.
 */
export declare const wasPromotedBtwSession: (session: Session | null | undefined) => boolean;
export declare const isBtwSession: (session: Session | null | undefined) => boolean;
/** The fork's back-pointer to the session `/btw` was typed into. */
export declare const getBtwOriginalSessionID: (session: Session | null | undefined) => string | null;
/**
 * The id of the last message the fork inherited from the parent. `null` means
 * the fork inherited nothing (empty parent) and every message is its own.
 */
export declare const getBtwBoundaryMessageID: (session: Session | null | undefined) => string | null;
export declare const withBtwSessionLink: (metadata: SessionMetadataRecord, btwSessionID: string) => SessionMetadataRecord;
/**
 * Mark the fork as a btw session. The fork clones the parent's metadata
 * wholesale (including review links or a stale `btwSessionID`), so the
 * inherited `openchamber` object is replaced, not merged.
 */
export declare const withBtwSessionMarker: (metadata: SessionMetadataRecord, originalSessionID: string, boundaryMessageID: string | null) => SessionMetadataRecord;
/**
 * Remove the btw marker so a promoted fork becomes a plain session.
 *
 * `btwPromoted` replaces it rather than leaving nothing behind: the btw
 * boundary instructions stay in the transcript forever, so the session has to
 * remain distinguishable from one that was never a side conversation.
 */
export declare const withoutBtwSessionMarker: (metadata: SessionMetadataRecord) => SessionMetadataRecord;
/** Unlink the parent, but only if it still points at this fork. */
export declare const withoutBtwSessionLink: (metadata: SessionMetadataRecord, btwSessionID: string) => SessionMetadataRecord;
