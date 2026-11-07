import React from 'react';
/**
 * Clamp an autocomplete popup (anchored above the composer via `bottom-full`)
 * so it never rises past the top of the chat area. The chat `<main>` starts
 * below the app header, so its top edge is the correct boundary.
 *
 * Re-measures on window resizes and when the native keyboard choreography
 * settles (the composer — and therefore the popup's anchor — moves with it).
 *
 * Returns an inline max-height only when the available space is smaller than
 * the popup's normal CSS height cap. This keeps the desktop cap intact while
 * still protecting the header on tall draft composers.
 */
export declare const useMobileAutocompleteMaxHeight: (containerRef: React.RefObject<HTMLElement | null>, enabled: boolean, normalMaxHeight?: number) => number | undefined;
