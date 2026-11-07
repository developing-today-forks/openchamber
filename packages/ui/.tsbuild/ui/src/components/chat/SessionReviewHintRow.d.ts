import React from 'react';
interface SessionReviewHintRowProps {
    sessionId: string | null;
    directory?: string;
    /** Opens the composer's review dialog, the one `/handoff-review` opens. */
    onAIReview: () => void;
}
/**
 * Jev thinks the last turn handed over changes worth a look. The same quiet
 * top row as the done hint, offering an AI review by another agent or a
 * walkthrough of the working tree; it goes away with the next message.
 */
export declare const SessionReviewHintRow: React.FC<SessionReviewHintRowProps>;
export {};
