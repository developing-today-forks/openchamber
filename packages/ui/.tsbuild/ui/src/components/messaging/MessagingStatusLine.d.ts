import React from 'react';
/** One line under a list or form that carries its loading, empty or error state; it keeps its height when empty. */
export declare const MessagingStatusLine: React.FC<{
    text: string | null;
    tone?: 'muted' | 'error';
    action?: React.ReactNode;
}>;
