/**
 * Exposes the snapshot builder on `window` so the native shell can read it synchronously via
 * `evaluateJavaScript`. Returns a JSON string (the bridge wants a primitive result) or `null`
 * if building fails, so the native side can skip writing on error rather than clobber a good
 * snapshot. Safe to call in any runtime; only the native iOS shell ever invokes it.
 */
export declare const installMobileWidgetSnapshotBridge: () => void;
