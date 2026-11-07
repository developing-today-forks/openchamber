import React from 'react';
import { type MessageSearchHit } from '@/lib/messageSearch';
export type MessageScope = 'all' | 'project';
export type MessageAuthor = 'any' | 'user' | 'assistant' | 'reasoning';
export declare const MessageHitItem: React.FC<{
    hit: MessageSearchHit;
    projectLabel: string | null;
    onSelect: (hit: MessageSearchHit) => void;
}>;
/** The messages mode's header: back to everything, then where and who. */
export declare const MessageSearchFilters: React.FC<{
    scope: MessageScope;
    onScopeChange: (scope: MessageScope) => void;
    projectScopeAvailable: boolean;
    author: MessageAuthor;
    onAuthorChange: (author: MessageAuthor) => void;
    /** Reasoning is indexed and shown in the chat. */
    reasoningAvailable: boolean;
    onBack: () => void;
}>;
