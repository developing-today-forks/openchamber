import React from 'react';
interface GoalEditStripProps {
    sessionId: string | null;
    directory?: string;
}
/**
 * A goal edit saved from the goal editor, among the composer's top rows: the
 * editor closes at once, and this row says the goal writer is working (with
 * Cancel), or why the edit did not land (with Reopen, which brings the edit
 * back into the editor).
 */
export declare const GoalEditStrip: React.FC<GoalEditStripProps>;
export {};
