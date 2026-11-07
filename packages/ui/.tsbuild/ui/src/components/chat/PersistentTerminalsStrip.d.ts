import React from 'react';
interface PersistentTerminalsStripProps {
    sessionId: string | null;
    directory?: string;
}
/**
 * Terminals the agent started with the pty tool. Sits in the composer's top rows
 * with the background commands.
 */
export declare const PersistentTerminalsStrip: React.FC<PersistentTerminalsStripProps>;
export {};
