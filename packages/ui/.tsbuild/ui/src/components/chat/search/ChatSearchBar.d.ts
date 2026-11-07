import React from 'react';
export declare const ChatSearchBar: React.FC<{
    sessionId: string;
    scrollNode: HTMLElement | null;
    /** Bumped by every Cmd+F: focus and select the query again. */
    focusRequest: number;
    onClose: () => void;
}>;
