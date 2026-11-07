/**
 * Resolves OpenChamber theme tokens into concrete color strings.
 *
 * The annotation overlay renders inside a page we do not control, so it cannot
 * reference our CSS variables — that page has its own `:root`. Theme tokens can
 * also be authored in any color space, so string-concatenating an alpha suffix
 * onto them is not safe. Both problems go away by letting the browser resolve
 * the values here: a probe element carries the token, and the computed style is
 * always a concrete color the overlay can use verbatim.
 */
import type { BrowserAnnotationOverlayTheme } from './annotationOverlay';
/**
 * Reads the live theme. Returns a usable palette even when probing fails, so a
 * missing token can never leave the overlay invisible against the page.
 */
export declare const resolveAnnotationOverlayTheme: (colorScheme: 'light' | 'dark') => BrowserAnnotationOverlayTheme;
