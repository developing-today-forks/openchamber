import type { Session } from '@/lib/opencode/model';
import { type SessionMetadataRecord } from './sessionReviewMetadata';
export type ContextObligatoryMessage = {
    id: string;
    createdAt: number;
    role: 'user' | 'assistant';
};
export declare const getContextObligatoryMessages: (session: Session | null | undefined) => ContextObligatoryMessage[];
export declare const withContextObligatoryMessage: (metadata: SessionMetadataRecord, message: ContextObligatoryMessage, pinned: boolean) => SessionMetadataRecord;
