/**
 * Layers the Android back button closes before the mobile shell's own
 * surfaces and drawers: the newest one first, one per press.
 *
 * Two kinds of layer sit above a shell surface. Base UI popups (dialogs,
 * selects, menus) already close on Escape and move focus into themselves, so
 * back sends Escape to the focused element and only the popup holding focus
 * reacts. MobileOverlayPanel sheets manage no focus, so they register here.
 */
/** Registers an open overlay; the returned function unregisters it. */
export declare function registerBackLayer(close: () => void): () => void;
export declare function isTopmostBackLayer(close: () => void): boolean;
export declare function isInsideOpenPopup(target: EventTarget | null): boolean;
/** Closes the topmost layer; false when nothing above the shell is open. */
export declare function closeTopmostBackLayer(): boolean;
