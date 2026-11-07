import React from 'react';
/**
 * Picks the project a chat moves into. The conversation goes to the project's
 * root folder; nothing the chat wrote on disk moves with it, which the
 * description says before anything happens.
 */
export declare const MoveChatToProjectDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPick: (projectDirectory: string) => void;
}>;
