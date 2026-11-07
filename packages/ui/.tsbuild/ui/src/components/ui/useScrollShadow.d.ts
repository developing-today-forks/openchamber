import React from "react";
export type ScrollShadowOrientation = "vertical" | "horizontal";
export type ScrollShadowVisibility = "both" | "none" | "top" | "bottom" | "left" | "right";
type UseScrollShadowOptions = {
    orientation?: ScrollShadowOrientation;
    offset?: number;
    isEnabled?: boolean;
    hideTopShadow?: boolean;
    hideBottomShadow?: boolean;
    observeMutations?: boolean;
    onVisibilityChange?: (state: ScrollShadowVisibility) => void;
};
export declare const useScrollShadow: (elementRef: React.RefObject<HTMLElement | null>, { orientation, offset, isEnabled, hideTopShadow, hideBottomShadow, observeMutations, onVisibilityChange, }?: UseScrollShadowOptions) => void;
export {};
