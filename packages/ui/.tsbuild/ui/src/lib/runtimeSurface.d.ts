export type HostedSurface = 'desktop' | 'mobile';
/**
 * Decides the surface once and stamps it on `window` so every later
 * `isMobileSurfaceRuntime()` call (perf tuning, sync paging, device info)
 * reads the same stable answer instead of re-running viewport heuristics.
 */
export declare const resolveHostedSurface: () => HostedSurface;
export declare const isMobileSurfaceRuntime: () => boolean;
/**
 * The surface is stamped once at boot, so a browser window that crosses the
 * phone threshold after load would otherwise keep the wrong app shell (the
 * app trees, stores, and sync bootstrap differ, so an in-place switch is not
 * safe). Watch for the viewport heuristic disagreeing with the stamp and
 * reload — the same mechanism a surface change has always used — once the
 * resize settles. Fixed shells never switch: Capacitor is always mobile,
 * desktop/VS Code shells are always desktop, and an explicit ?surface=
 * override wins over the heuristic.
 */
export declare const watchHostedSurfaceViewport: () => (() => void);
