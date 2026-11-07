import React from 'react';
type Props = {
    sessionId: string | null;
    directory: string | null;
};
/**
 * Running subagents and, more importantly, their blockers: a permission request
 * raised by a subagent at any level has no representation in the viewed
 * transcript, so this panel is the only place it becomes visible there. Every
 * subagent has a row, nested under the subagent that launched it, and each row
 * speaks for its subagent and everything that one launched.
 */
export declare const WorkStatusSubagentsSection: React.FC<Props>;
export {};
