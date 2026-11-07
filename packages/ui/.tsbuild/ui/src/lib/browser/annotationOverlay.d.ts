/**
 * The annotation overlay that runs *inside* the previewed page.
 *
 * This module produces a self-contained script string. It is injected through
 * `webview.executeJavaScript`, so it cannot import anything, cannot reference
 * our theme variables (the page has its own `:root`), and must not disturb the
 * document it lands in. Consequences that drive the implementation:
 *
 * - All chrome lives in a **closed** shadow root on a single host element, so
 *   page CSS cannot restyle it and page scripts cannot walk into it.
 * - Every color and every label is passed in from the host, already resolved
 *   and already translated. Nothing user-facing is hardcoded here.
 *
 * The chrome is two small pieces rather than one bar: the tools sit at the top
 * of the page, and the comment box follows whatever was just marked. A single
 * bar pinned to one edge covers the part of the page people most often want to
 * point at, and accumulates into something that feels like an application.
 *
 * Lifecycle: the script resolves with a payload (or null when cancelled) and
 * tears down its own chrome *before* resolving, waiting for a repaint, so a
 * screenshot taken by the host contains the page and none of our UI.
 */
export type BrowserAnnotationOverlayTheme = {
    readonly colorScheme: 'light' | 'dark';
    readonly primary: string;
    /** Translucent primary, already resolved to a concrete color by the host. */
    readonly primarySoft: string;
    /** Faint primary used for hover backgrounds. */
    readonly primaryFaint: string;
    readonly primaryContrast: string;
    readonly surface: string;
    readonly surfaceElevated: string;
    /** Translucent elevated surface, matching the app's floating panels. */
    readonly glassSurface: string;
    /** A ready `backdrop-filter` value; '' when the theme has no glass. */
    readonly glassFilter: string;
    readonly border: string;
    readonly text: string;
    readonly mutedText: string;
};
export type BrowserAnnotationOverlayLabels = {
    readonly select: string;
    readonly marquee: string;
    readonly draw: string;
    readonly commentPlaceholder: string;
    readonly submit: string;
};
/** Cancels an overlay left behind by an earlier session. Safe when none is active. */
export declare const ANNOTATION_TEARDOWN_SCRIPT = "(() => {\n  try {\n    var host = document.querySelector('[data-openchamber-annotation]');\n    if (host && host.parentNode) host.parentNode.removeChild(host);\n  } catch (error) { /* page navigated away */ }\n  try {\n    var cursor = document.getElementById('openchamber-annotation-cursor');\n    if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);\n  } catch (error) { /* page navigated away */ }\n  try { delete window['__openchamberBrowserAnnotationActive']; } catch (error) { /* non-configurable */ }\n})();";
export declare const buildAnnotationOverlayScript: (theme: BrowserAnnotationOverlayTheme, labels: BrowserAnnotationOverlayLabels) => string;
