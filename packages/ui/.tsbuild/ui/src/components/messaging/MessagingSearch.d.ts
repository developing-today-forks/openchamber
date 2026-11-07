import React from 'react';
/**
 * Searches every topic. Meaning-based matches use OpenCode's embedding model;
 * when it is not ready, OpenCode matches words instead and says so in the
 * status line. A hit opens its topic at that message.
 */
export declare const MessagingSearch: React.FC<{
    active: boolean;
}>;
