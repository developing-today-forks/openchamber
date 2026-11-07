export declare const DESKTOP_MENU_SIDE_MARGIN_PX = 8;
export declare const DESKTOP_MENU_FALLBACK_WIDTH_PX = 280;
export declare const DESKTOP_MENU_FALLBACK_HEIGHT_PX = 38;
export declare const getDesktopClampedX: (anchorX: number, viewportWidth: number, menuWidth: number) => number;
export declare const DESKTOP_MENU_SELECTION_GAP_PX = 10;
export type DesktopMenuPlacement = 'above' | 'below';
interface DesktopMenuYInput {
    selectionTop: number;
    selectionBottom: number;
    menuHeight: number;
    viewportHeight: number;
    boundaryTop: number;
}
interface DesktopMenuY {
    y: number;
    placement: DesktopMenuPlacement;
}
export declare const getDesktopMenuY: ({ selectionTop, selectionBottom, menuHeight, viewportHeight, boundaryTop, }: DesktopMenuYInput) => DesktopMenuY;
export {};
