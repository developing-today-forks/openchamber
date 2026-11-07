import React from 'react';
interface SessionDoneHintRowProps {
    sessionId: string | null;
    directory?: string;
}
/**
 * Jev thinks the work in this session looks finished. A quiet top row of the
 * composer with one button; it never closes anything on its own, and it goes
 * away with the next message (the server retires the hint when a turn starts).
 * The sidebar shows the same hint as a grey check on the row.
 */
export declare const SessionDoneHintRow: React.FC<SessionDoneHintRowProps>;
export {};
