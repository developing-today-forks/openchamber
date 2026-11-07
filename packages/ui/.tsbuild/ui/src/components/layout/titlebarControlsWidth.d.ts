/**
 * The measured width of the persistent titlebar control cluster
 * (`TitlebarLeftControls`), published as `--oc-titlebar-controls-width` onto
 * the elements that reserve room for it: the sidebar's top strip and the
 * header's spacer.
 *
 * Written on the document root, the value inherited into every element, and
 * it changes on every sidebar toggle (the "New session" label collapses to an
 * icon while the sidebar is closed), so each toggle restyled the whole
 * document: about 65,000 elements and 100 ms in a long session, in the frame
 * the toggle starts. The readers are two leaves, so the value is written on
 * them instead. A reader that mounts later gets the current value at once.
 */
export declare const publishTitlebarControlsWidth: (px: number) => void;
/** Callback ref for an element whose styles read `--oc-titlebar-controls-width`. */
export declare const titlebarControlsWidthReaderRef: (node: HTMLElement | null) => (() => void) | undefined;
