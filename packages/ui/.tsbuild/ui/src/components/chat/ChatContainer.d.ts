import React from 'react';
type ChatContainerProps = {
    active?: boolean;
    autoOpenDraft?: boolean;
    readOnly?: boolean;
    /**
     * Shows this session instead of the app's selection: a chat opened in the
     * side panel. The column navigates inside itself (open a subtask, return
     * to the parent) and never changes the main chat's selection, draft, or
     * panels.
     */
    pinnedSession?: {
        sessionId: string;
        directory: string | null;
    };
};
export declare const ChatContainer: React.FC<ChatContainerProps>;
export {};
