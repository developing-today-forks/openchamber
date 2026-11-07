import React from "react";
export declare const ScrollableOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    minThumbSize?: number;
    hideDelayMs?: number;
    as?: React.ElementType;
    outerClassName?: string;
    scrollbarClassName?: string;
    disableHorizontal?: boolean;
    observeMutations?: boolean;
    fillContainer?: boolean;
    /** Prevent scroll from propagating to parent when at boundaries */
    preventOverscroll?: boolean;
    useScrollShadow?: boolean;
    scrollShadowSize?: number;
    /** Suppress the top fade (e.g. when sticky headers sit at the top edge). */
    hideTopScrollShadow?: boolean;
    /** Suppress the bottom fade while retaining scroll-state tracking. */
    hideBottomScrollShadow?: boolean;
    userIntentOnly?: boolean;
    /** Pixels kept clear above the vertical scrollbar track. */
    verticalTrackStart?: number;
    /** Forwarded to the inner element (e.g. textarea). */
    disabled?: boolean;
} & React.RefAttributes<HTMLElement>>;
