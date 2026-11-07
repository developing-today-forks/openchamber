import React from 'react';
/** Back to the list, at the start of an opened entry's own toolbar. */
export declare const KnowledgeBackButton: React.FC<{
    label: string;
    onClick: () => void;
}>;
/**
 * An entry opened from a list, shown in place of that list.
 *
 * Notes and memories used to expand inside the list, which pushed every card
 * below them down and back up on each open and close. Opening one now swaps
 * the list for this view, the way a plan opens: the list never moves, and the
 * entry gets the whole panel. The back control starts the entry's own toolbar,
 * so the section tabs above never shift when an entry opens.
 *
 * Escape goes back to the list unless something inside (a menu, an IME)
 * already used it.
 */
export declare const KnowledgeEntryView: React.FC<{
    backLabel: string;
    /** False beside the list (split layout), where there is nothing to go back to. */
    showBack?: boolean;
    /** Details after the back control: source, date, scope. */
    meta: React.ReactNode;
    /** Controls at the end of the toolbar. */
    actions?: React.ReactNode;
    onClose: () => void;
    children: React.ReactNode;
}>;
