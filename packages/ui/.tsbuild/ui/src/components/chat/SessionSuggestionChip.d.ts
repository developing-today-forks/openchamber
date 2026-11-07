import React from 'react';
interface SessionSuggestionChipProps {
    sessionId: string | null;
    directory?: string;
    /** The composer already has content — the suggestion must stay out of the way. */
    hidden: boolean;
    onApply: (text: string) => void;
}
export declare const SessionSuggestionChip: React.FC<SessionSuggestionChipProps>;
export {};
