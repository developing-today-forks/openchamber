import React from 'react';
/**
 * One entry in the notes and memory lists: a header line with the title and
 * the row actions, a short preview under it at full width, an optional footer.
 *
 * The card never changes height. A click anywhere on it opens the entry in
 * place of the list (`KnowledgeEntryView`); editing inside the list made every
 * card below jump on each open and close.
 */
export declare const KnowledgeCard: React.FC<{
    /** Lets the panel find the card again when the entry closes. */
    entryId: string;
    /** Open beside the list (split layout). */
    selected?: boolean;
    onOpen: () => void;
    /** Accessible name of the card: the entry's title. */
    label: string;
    header?: React.ReactNode;
    children?: React.ReactNode;
    /** Shown at the end of the header line, revealed on hover. */
    actions?: React.ReactNode;
    footer?: React.ReactNode;
}>;
