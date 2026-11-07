import React from 'react';
/**
 * The agent's permission requests, docked above the composer in the same
 * frame as the form dock. Every pending request for the composer's session
 * (including its subagents') is a step in the header, one dot per request
 * with the current one solid, so a batch of requests raised together reads
 * as one panel to walk through rather than a stack of cards. The dock
 * answers one request at a time; once it is answered the next one takes
 * its place. The BTW sheet keeps the inline `PermissionCard` for its child
 * session's requests.
 */
interface PermissionDockProps {
    sessionId: string | null;
    directory?: string;
    hidden: boolean;
}
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const PermissionDock: React.NamedExoticComponent<PermissionDockProps>;
export {};
