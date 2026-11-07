import type { Metadata, Session } from '@/lib/opencode/model';
export type SessionMetadataRecord = Metadata;
export declare const getSessionMetadata: (session: Session | null | undefined) => SessionMetadataRecord;
export declare const getReviewSessionID: (session: Session | null | undefined) => string | null;
export declare const getOriginalSessionID: (session: Session | null | undefined) => string | null;
export declare const isReviewSession: (session: Session | null | undefined) => boolean;
export declare const withReviewSessionLink: (metadata: SessionMetadataRecord, reviewSessionID: string) => SessionMetadataRecord;
export declare const withReviewSessionMarker: (metadata: SessionMetadataRecord, originalSessionID: string) => SessionMetadataRecord;
export declare const withoutReviewSessionLink: (metadata: SessionMetadataRecord, reviewSessionID: string) => SessionMetadataRecord;
