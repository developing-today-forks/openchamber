import React from 'react';
interface RevertedMessagesStripProps {
    sessionId: string | null;
    directory?: string;
}
/**
 * A staged revert, as a top row of the composer. OpenCode v2 stages a revert:
 * the messages after the revert point are hidden and the agent's file changes
 * from those turns are rolled back. The next message drops them for good
 * (OpenCode commits the revert before admitting it), so the only decision left
 * here is Restore, which puts the messages and the files back. One reverted
 * message is its own row; several collapse into a count that expands in place.
 */
export declare const RevertedMessagesStrip: React.FC<RevertedMessagesStripProps>;
export {};
