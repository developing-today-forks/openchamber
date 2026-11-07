import type { ReviewFlowExecution } from '@/components/session/ReviewFlowDialog';
/**
 * What the review dialog's Start button runs, shared by every place that
 * offers the review: it starts the flow for `sessionId` in the session's own
 * directory (else `fallbackDirectory`) and calls `onStarted` once it is under way.
 */
export declare function useReviewFlowStart(sessionId: string | null | undefined, fallbackDirectory: string | null | undefined, onStarted: () => void): {
    submitting: boolean;
    start: (execution: ReviewFlowExecution) => Promise<void>;
};
