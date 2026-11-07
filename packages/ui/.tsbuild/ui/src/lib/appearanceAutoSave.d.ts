/**
 * Mirrors user changes of the registry's auto-saved fields (`ui.autoSave`)
 * from `useUIStore` to the server. Which fields take part is decided in the
 * registry, not here; values the settings sync just copied in from the server
 * become the new baseline instead of a write.
 */
export declare const startAppearanceAutoSave: () => void;
