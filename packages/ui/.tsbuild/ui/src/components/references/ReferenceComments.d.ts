import * as React from 'react';
import type { ReferenceCommentItem, ReferenceTimelineEntry } from './referenceTimeline';
/** Writes to a PR's review threads; each settles once the host answered. */
export type ReferenceThreadActions = {
    /** True when the reply was posted, so the box can empty. */
    reply: (threadId: string, body: string) => Promise<boolean>;
    /** True when the host has the change; the thread is read again after it. */
    setResolved: (threadId: string, resolved: boolean) => Promise<boolean>;
};
/**
 * The thread under a preview, drawn like the PR view's comments: avatar on a
 * line, then the comment. Bodies render images and the HTML GitHub allows.
 * A PR's commits sit on the same line, grouped between the comments.
 */
export declare const ReferenceComments: React.FC<{
    entries: ReferenceTimelineEntry[];
    now: number;
    /** Pins one comment above the composer; shown on hover beside its author. */
    onAttachComment?: (comment: ReferenceCommentItem) => void;
    /** Answer and resolve review threads; without it they are read only. */
    threadActions?: ReferenceThreadActions;
}>;
