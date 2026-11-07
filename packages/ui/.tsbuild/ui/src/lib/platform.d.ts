/** True when running inside the native Capacitor shell (iOS/Android app), not the web/PWA. */
export declare const isCapacitorApp: () => boolean;
/**
 * True when running inside the native Capacitor shell on an iPad.
 * Capacitor reports 'ios' for both iPhone and iPad; iPadOS WKWebView
 * masquerades as macOS Safari, so the only reliable tell is a Mac-like
 * platform with real touch points (or a legacy explicit iPad UA).
 */
export declare const isIPadApp: () => boolean;
/**
 * True on an iPad in any runtime (Safari, Home Screen app, Capacitor).
 * iPadOS sends a Mac user agent; real touch points are the tell, since no
 * Mac has them.
 */
export declare const isIPadDevice: () => boolean;
type ClientPlatform = 'ios' | 'android' | 'vscode' | 'desktop' | 'web';
/**
 * The runtime surface this client is. Used by the push presence model: only 'ios'/'android'
 * count as mobile (push recipients); everything else is an interactive surface that suppresses
 * mobile push while visible.
 */
export declare const getClientPlatform: () => ClientPlatform;
export {};
