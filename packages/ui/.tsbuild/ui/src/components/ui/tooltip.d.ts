import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
type ProviderProps = React.ComponentProps<typeof BaseTooltip.Provider> & {
    delayDuration?: number;
    skipDelayDuration?: number;
};
declare function TooltipProvider({ delayDuration, skipDelayDuration, delay, closeDelay, ...props }: ProviderProps): import("react/jsx-runtime").JSX.Element;
type TooltipRootProps = React.ComponentProps<typeof BaseTooltip.Root> & {
    delayDuration?: number;
};
declare function Tooltip({ delayDuration, open, onOpenChange, ...props }: TooltipRootProps): import("react/jsx-runtime").JSX.Element;
declare function TooltipTrigger({ asChild, children, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onClickCapture, onContextMenu, ...props }: React.ComponentProps<typeof BaseTooltip.Trigger> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
type ContentProps = React.ComponentProps<typeof BaseTooltip.Popup> & {
    sideOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    showArrow?: boolean;
};
declare function TooltipContent({ className, sideOffset, side, align, children, style, showArrow, ...props }: ContentProps): import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
