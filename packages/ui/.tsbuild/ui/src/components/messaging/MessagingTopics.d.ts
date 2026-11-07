import React from 'react';
/**
 * Topics the current session reads, writes or owns (its standard topics are
 * listed before first use), or every topic. A wide panel shows the list and
 * the open topic side by side; a narrow one swaps between them.
 */
export declare const MessagingTopics: React.FC<{
    sessionID: string | null;
    split: boolean;
    active: boolean;
}>;
