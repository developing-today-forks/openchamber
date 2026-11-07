import React from 'react';
interface ChatInputProps {
    onOpenSettings?: () => void;
    scrollToBottom?: () => void;
    scrollToLatest?: () => void;
    active?: boolean;
    draftPresentationExiting?: boolean;
}
export declare const ChatInput: React.NamedExoticComponent<ChatInputProps>;
export {};
