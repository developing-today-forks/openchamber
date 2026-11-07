import React from 'react';
/**
 * Elapsed time of a session's current turn, or of the turn that just finished.
 * Colored to match the row's status dot in each state, so the pair reads as one
 * indicator rather than two.
 *
 * Deliberately a leaf. The tick re-renders this span alone rather than the
 * session row around it, which is what makes a live counter cheaper than the
 * spinner it replaced — that spinner repainted a composited layer per row every
 * frame for as long as the session ran.
 */
export declare const SessionActivityDuration: React.FC<{
    sessionId: string;
    /** Turn still running (`busy` or `retry`); false renders the settled total. */
    running: boolean;
    className?: string;
}>;
