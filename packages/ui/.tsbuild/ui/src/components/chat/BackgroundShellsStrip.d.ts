import React from 'react';
interface BackgroundShellsStripProps {
    sessionId: string | null;
    directory?: string;
}
/**
 * Commands the agent left running in the background (dev servers, watchers,
 * test pages), as a top row of the composer next to the "looks done" hint.
 * One command is its own row; several collapse into a count that expands in
 * place, so the composer grows by one row unless the user asks for the list.
 */
export declare const BackgroundShellsStrip: React.FC<BackgroundShellsStripProps>;
export {};
