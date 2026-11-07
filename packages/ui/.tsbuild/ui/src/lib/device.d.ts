type DeviceType = 'desktop' | 'mobile' | 'tablet';
export interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: DeviceType;
    screenWidth: number;
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    hasTouchInput: boolean;
    hasTouchOnlyPointer: boolean;
}
export declare function getDeviceInfo(): DeviceInfo;
export declare function isMobileDeviceViaCSS(): boolean;
export declare function useTabletStandalonePwaRuntime(): boolean;
export type Orientation = 'portrait' | 'landscape';
export declare function useOrientation(): Orientation;
export interface TabletLayout {
    /** Sessions become a persistent sidebar, dropdowns become anchored popovers. */
    enabled: boolean;
    /** There is room for the workspace beside the chat instead of over it. */
    roomyForPanels: boolean;
}
export declare const readTabletLayout: () => TabletLayout;
/**
 * The tablet layout decision, live.
 *
 * Deliberately a hook over a one-shot check: foldables change size class while
 * the app runs, and the Android shell keeps the WebView alive across the fold
 * (`configChanges` covers screenSize), so every consumer has to re-decide
 * rather than remember what it saw at mount.
 */
export declare function useTabletLayout(): TabletLayout;
export declare function useDeviceInfo(): DeviceInfo;
export {};
