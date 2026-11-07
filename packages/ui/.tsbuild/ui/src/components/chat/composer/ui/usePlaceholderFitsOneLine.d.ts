import React from 'react';
/**
 * Whether `text` fits on one line of the composer editor inside `hostRef`.
 *
 * The answer comes from the editor's real content width and font, so it
 * follows the panel width, the interface font size and the locale's wording.
 * A fixed breakpoint switched to the short hint in every VS Code sidebar,
 * where the full hint usually still fits. Without a canvas to measure with,
 * the full text is assumed to fit.
 */
export declare function usePlaceholderFitsOneLine(hostRef: React.RefObject<HTMLElement | null>, text: string): boolean;
