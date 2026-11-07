import React from 'react';
type Args = {
    enabled?: boolean;
    isSessionSearchOpen: boolean;
    openSessionSearch: () => void;
    /** Hides the field and drops its query: a filter nobody can see is a trap. */
    closeSessionSearch: () => void;
    sessionSearchInputRef: React.RefObject<HTMLInputElement | null>;
    sessionSearchContainerRef: React.RefObject<HTMLDivElement | null>;
};
export declare const useSessionSearchEffects: ({ enabled, isSessionSearchOpen, openSessionSearch, closeSessionSearch, sessionSearchInputRef, sessionSearchContainerRef, }: Args) => void;
export {};
