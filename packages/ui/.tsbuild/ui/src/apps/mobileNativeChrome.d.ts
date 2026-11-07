/** True when running inside the native Capacitor shell (iOS/Android app). */
export declare const isCapacitorMobileApp: () => boolean;
/**
 * True on Android 14 and older, where the app (targetSdk 35) is not forced edge-to-edge
 * and StatusBar.setOverlaysWebView({ overlay: false }) really moves the WebView below the
 * status bar. Android WebView keeps the OS version in its user agent.
 */
export declare const isAndroidBeforeEdgeToEdge: (userAgent?: string) => boolean;
export declare const useNativeMobileChrome: () => void;
export declare const useNativeMobileLifecycle: (onResume: () => void) => void;
export declare const useNativeAndroidBackButton: (onBack: () => boolean) => void;
