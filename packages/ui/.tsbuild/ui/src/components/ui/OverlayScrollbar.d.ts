import React from "react";
type OverlayScrollbarProps = {
    /** The scrolling element. Container replacement is picked up on the next React commit. */
    containerRef: React.RefObject<HTMLElement | null>;
    /** Minimum thumb length in CSS pixels, capped to the available track. */
    minThumbSize?: number;
    /** Time in milliseconds before an inactive thumb fades out. */
    hideDelayMs?: number;
    className?: string;
    /** Skips horizontal geometry reads and keeps the horizontal thumb hidden. */
    disableHorizontal?: boolean;
    /** Tracks direct-child replacement so newly mounted content remains size-observed. */
    observeMutations?: boolean;
    /** Hides programmatic motion unless dragging or the device preference keeps scrollbars visible. */
    suppressVisibility?: boolean;
    /** Requires recent user input in the default auto-hide mode. */
    userIntentOnly?: boolean;
    /** Pixels kept clear above the vertical track, for controls floating over the scroller's top edge. */
    verticalTrackStart?: number;
    /** Called when a thumb drag starts: the thumb is outside the scroller, so its own gesture listeners never see it. */
    onThumbDragStart?: () => void;
};
export declare const OverlayScrollbar: React.FC<OverlayScrollbarProps>;
export {};
