import React from 'react';
/**
 * The current session's chain (itself, then each parent up to the root, with
 * details on demand), a search across every session, and the session's log
 * with the parts to include. Any session listed here can be messaged.
 */
export declare const MessagingSessions: React.FC<{
    sessionID: string | null;
    active: boolean;
}>;
