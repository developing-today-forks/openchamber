import React from 'react';
/**
 * Collects which sections rendered, so the panel can hide its card entirely
 * when none did. See `presenceContext.ts` for why sections report rather than
 * the panel deriving it.
 */
export declare const WorkStatusPresenceProvider: React.FC<{
    onChange: (count: number) => void;
    children: React.ReactNode;
}>;
