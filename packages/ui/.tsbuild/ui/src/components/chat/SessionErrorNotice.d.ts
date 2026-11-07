import React from 'react';
interface SessionErrorNoticeProps {
    sessionId: string;
    directory?: string;
}
/**
 * Shows what OpenCode reported when it stopped a turn without producing a
 * reply. Rendered under the last message, only while that turn is the latest
 * one: sending again moves the last message past the error and hides it.
 *
 * Detail, best first: the live error event; the error recorded with the turn;
 * the parent's subagent tool error for a child session; the session's own
 * stored outcome.
 */
export declare const SessionErrorNotice: React.FC<SessionErrorNoticeProps>;
export {};
