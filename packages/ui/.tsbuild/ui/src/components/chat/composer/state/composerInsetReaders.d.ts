/**
 * Publishes the floating composer's geometry onto the elements that read it.
 *
 * `--chat-composer-inset` (the slot's height, read by the transcript's end
 * fade band), `--chat-composer-tail-inset` (read by the list footer's tail
 * spacer) and `--chat-floating-panel-clearance` (the height of a panel docked
 * above the composer, read by both of them and by the overlays riding the
 * composer's top edge) change with every composer line or panel resize.
 * Written on the chat column, they inherited into the whole transcript, and
 * each change restyled every element of it (about 50,000 in a long session,
 * 60-90 ms per new composer line). The readers are leaves or small overlays,
 * so the values are written on them directly: a reader registers when it
 * mounts and gets the column's current values at once, and the column's
 * observer updates the registered readers inside it.
 */
interface ComposerInsets {
    /** The composer slot's height, px. */
    readonly inset: number;
    /** The band the list footer reserves for the composer, px. */
    readonly tailInset: number;
}
type ReaderRelease = () => void;
/**
 * Registers an element that reads the composer insets and the floating panel
 * clearance (the tail spacer and the end fade band; use as a ref callback).
 * Until its column publishes, the reader keeps its CSS fallbacks.
 */
export declare const registerComposerInsetReader: (reader: HTMLElement | null) => ReaderRelease | undefined;
/**
 * Registers an element that reads only the floating panel clearance (the
 * overlays that ride above the composer; use as a ref callback).
 */
export declare const registerFloatingPanelClearanceReader: (reader: HTMLElement | null) => ReaderRelease | undefined;
/** The column's composer measured these insets; its readers take them. */
export declare const publishComposerInsets: (column: HTMLElement, insets: ComposerInsets) => void;
/** The column's composer stopped floating: its readers fall back to CSS. */
export declare const withdrawComposerInsets: (column: HTMLElement) => void;
/** A panel docked above the column's composer measured this clearance, px. */
export declare const publishFloatingPanelClearance: (column: HTMLElement, clearance: number) => void;
/** No panel is docked above the column's composer any more. */
export declare const withdrawFloatingPanelClearance: (column: HTMLElement) => void;
export {};
