import React from 'react';
type Props = {
    /** Null on a new-session draft: repository readouts still apply. */
    sessionId: string | null;
    directory: string | null;
    /** Managed Chats have no project repository, even if another project remains active. */
    repositoryEnabled?: boolean;
    /** Whether the panel should currently be shown. */
    visible: boolean;
    /**
     * Inline only: the right slot keeps the card's column (see
     * `components/layout/rightSlot.ts`). True while the context panel covers
     * the card too, so closing the panel goes straight back to the card.
     */
    reserved?: boolean;
    /**
     * Floats over the transcript instead of sitting beside it, for when the chat
     * is too narrow to give it a column of its own.
     */
    overlay?: boolean;
};
/**
 * Work-status panel: a card inside the chat column reporting the state of the
 * session, its branch and its subagents.
 *
 * Sections follow the user's saved order. Each section renders
 * nothing when it has nothing, so the panel collapses toward the top instead of
 * reserving empty space.
 *
 * The card clips; the scroller lives inside it, so the same top/bottom scroll
 * shadows the transcript uses stay within the rounded border instead of
 * bleeding past it. The scrollbar itself is hidden — at this width it would
 * eat a visible slice of every row's trailing value, and the shadows already
 * say there is more to see.
 */
export declare const WorkStatusPanel: React.FC<Props>;
export {};
