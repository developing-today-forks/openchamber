import React from 'react';
/**
 * The Messages surface: what agents sent the person, the topics sessions
 * write to, and the current session's chain and log, from OpenCode's
 * messaging routes. Its sections and the search toggle fill the panel header.
 * Against an OpenCode without messaging it says so and offers to check again.
 */
export declare const MessagingPanel: React.FC<{
    className?: string;
    active?: boolean;
}>;
