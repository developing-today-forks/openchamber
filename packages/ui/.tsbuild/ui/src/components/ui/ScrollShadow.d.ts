import React from "react";
import { type ScrollShadowOrientation, type ScrollShadowVisibility } from "./useScrollShadow";
export declare const ScrollShadow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
    orientation?: ScrollShadowOrientation;
    offset?: number;
    size?: number;
    isEnabled?: boolean;
    hideTopShadow?: boolean;
    hideBottomShadow?: boolean;
    observeMutations?: boolean;
    onVisibilityChange?: (state: ScrollShadowVisibility) => void;
} & React.RefAttributes<HTMLElement>>;
