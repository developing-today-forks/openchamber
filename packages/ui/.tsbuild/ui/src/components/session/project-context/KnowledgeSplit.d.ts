import React from 'react';
/**
 * A wide panel shows the list and the open entry side by side.
 *
 * Stretched to the full width of an expanded panel, the one-column layout ran
 * note lines 1500px long and swapped the whole list away to open one entry.
 * Here the list keeps a readable width and stays put, the selected card is
 * marked, and the entry opens beside it. The panel decides when it is wide
 * enough (`ProjectNotesTodoPanel`).
 */
export declare const KnowledgeSplit: React.FC<{
    list: React.ReactNode;
    /** The open entry, or null for the quiet hint. */
    detail: React.ReactNode | null;
    emptyLabel: string;
}>;
