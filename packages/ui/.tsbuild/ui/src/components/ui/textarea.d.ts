import * as React from "react";
type TextareaProps = React.ComponentProps<"textarea"> & {
    outerClassName?: string;
    scrollbarClassName?: string;
    fillContainer?: boolean;
    useScrollShadow?: boolean;
    scrollShadowSize?: number;
    hasError?: boolean;
    resizedHeight?: number | null;
    onResizeHeightChange?: (height: number) => void;
    /**
     * AlignUI "simple" mode: render a bare textarea (no compound wrapper).
     * Used for chat composer or anywhere the textarea is embedded inside an
     * existing styled container.
     */
    simple?: boolean;
    /**
     * Slot rendered in the bottom-right (next to the resize handle).
     * Typically a `<TextareaCharCounter />`.
     */
    endSlot?: React.ReactNode;
};
declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
