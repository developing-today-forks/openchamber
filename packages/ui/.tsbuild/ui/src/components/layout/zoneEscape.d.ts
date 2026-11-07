import type React from 'react';
/**
 * Escape closes a zone. Called from a capture handler on the zone frame and
 * on each keep-alive pane (their React events do not pass through the frame:
 * they are portalled in from `ContextSurfacePanes`).
 */
export declare const closeZoneOnEscape: (event: React.KeyboardEvent<HTMLElement>, isOpen: boolean, close: () => void, scope?: Element | null) => void;
