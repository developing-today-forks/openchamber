import React from 'react';
interface MessageRecoveryActionsProps {
    sessionId: string;
    directory?: string;
    /** An errored assistant message; omitted for a session-level no-reply notice. */
    anchorMessageId?: string;
}
/** Retry the latest failed prompt, optionally changing models without losing its context. */
export declare const MessageRecoveryActions: React.FC<MessageRecoveryActionsProps>;
export {};
