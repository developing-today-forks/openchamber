/**
 * Resolves to `true` once the first UI paint can be final — i.e. the selected UI web
 * font has loaded AND one-time appearance/typography boot work has been applied (or a
 * safety timeout elapses, so a slow/offline CDN can never block the app forever).
 *
 * Without this, the app paints immediately in the fallback font / default typography and
 * then reflows once the real font and persisted appearance prefs arrive — a visible flash
 * and micro layout shift. Hold a logo splash until this is `true` so the first UI the user
 * sees is already at its final font and sizes.
 */
export declare function useFontsReady(timeoutMs?: number): boolean;
