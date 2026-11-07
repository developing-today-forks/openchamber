import React from 'react';
type MiniChatMode = 'session' | 'draft';
type MiniChatLayoutProps = {
    mode: MiniChatMode;
    autoOpenDraft?: boolean;
    unavailable?: boolean;
};
export declare const MiniChatLayout: React.FC<MiniChatLayoutProps>;
export {};
