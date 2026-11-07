import React from 'react';
/**
 * What the agent has chosen to remember, in the two scopes it writes to.
 *
 * The scopes are a switch rather than one merged list: a claim about the user
 * reaches every project, so which store a memory sits in is the most important
 * thing about it and must never be something the reader has to infer.
 */
export declare const MemorySection: React.FC<{
    projectPath: string | null;
    query: string;
    /** The open entry, owned by the panel so its back control can close it. */
    openMemoryId: string | null;
    onOpenMemory: (memoryId: string | null) => void;
    /** Wide panel: the list and the open entry side by side. */
    split: boolean;
}>;
