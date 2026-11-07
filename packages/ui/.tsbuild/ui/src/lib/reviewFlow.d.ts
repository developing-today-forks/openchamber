import type { Session } from '@/lib/opencode/model';
import { type AutoReviewRun } from '@/stores/useAutoReviewStore';
type SessionModelContext = {
    providerID: string;
    modelID: string;
    agent?: string;
    variant?: string;
};
type StartReviewFlowInput = SessionModelContext & {
    originalSessionID: string;
    directory: string;
    agentMentionName?: string;
    generateHandoff?: boolean;
    returnAfterHandoffRequest?: boolean;
    autoReview?: boolean;
};
export declare const isAutoReviewRuntimeCurrent: (runtimeKey: string) => boolean;
export declare const assertAutoReviewRuntimeStillCurrent: (expectedRuntimeKey?: string) => void;
export declare const hasFinalReviewMarker: (text: string) => boolean;
export declare const stripFinalReviewMarker: (text: string) => string;
export declare const claimAutoReviewForward: (run: AutoReviewRun, messageID: string) => string | null;
export declare const releaseAutoReviewForward: (key: string) => void;
export declare const resumeAutoReviewRun: (originalSessionID: string) => void;
export declare const startReviewFlow: (input: StartReviewFlowInput) => Promise<void>;
export declare const sendReviewFeedbackToOriginal: (reviewSessionID: string, directory: string, reviewFeedback: string, expectedRuntimeKey?: string) => Promise<string>;
export declare const sendImplementationResponseToReviewer: (originalSessionID: string, directory: string, implementationResponse: string, autoReview?: boolean, expectedRuntimeKey?: string) => Promise<string>;
export type ReviewTransferDirection = 'review-to-original' | 'original-to-review';
export declare const getReviewTransferDirection: (session: Session | null | undefined) => ReviewTransferDirection | null;
export {};
