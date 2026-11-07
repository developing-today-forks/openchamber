import React from 'react';
type ChatViewProps = {
    active?: boolean;
    readOnly?: boolean;
    /** Shows this session instead of the app's selection (see ChatContainer). */
    pinnedSession?: {
        sessionId: string;
        directory: string | null;
    };
};
export declare const ChatView: React.FC<ChatViewProps>;
export {};
