import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import type { SelectRootChangeEventDetails } from "@base-ui/react/select";
type AsChildProps = {
    asChild?: boolean;
};
type SelectRootProps<Value extends string = string> = Omit<React.ComponentProps<typeof BaseSelect.Root>, "value" | "defaultValue" | "onValueChange"> & {
    value?: Value;
    defaultValue?: Value;
    onValueChange?: (value: Value, eventDetails: SelectRootChangeEventDetails) => void;
    disableGlobalShortcuts?: boolean;
};
declare function Select<Value extends string = string>({ onValueChange, modal, disableGlobalShortcuts, open, defaultOpen, onOpenChange, ...props }: SelectRootProps<Value>): import("react/jsx-runtime").JSX.Element;
declare function SelectGroup({ ...props }: React.ComponentProps<typeof BaseSelect.Group>): import("react/jsx-runtime").JSX.Element;
type SelectValueProps = Omit<React.ComponentProps<typeof BaseSelect.Value>, "children"> & {
    placeholder?: React.ReactNode;
    children?: React.ReactNode | ((value: string | undefined) => React.ReactNode);
};
declare function SelectValue({ placeholder, children, ...props }: SelectValueProps): import("react/jsx-runtime").JSX.Element;
declare function SelectTrigger({ className, children, asChild, onPointerDownCapture, onFocusCapture, ...props }: React.ComponentProps<typeof BaseSelect.Trigger> & AsChildProps): import("react/jsx-runtime").JSX.Element;
type SelectContentExtra = {
    position?: "popper" | "item-aligned";
    fitContent?: boolean;
    portalToBody?: boolean;
    sideOffset?: number;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    collisionAvoidance?: React.ComponentProps<typeof BaseSelect.Positioner>["collisionAvoidance"];
    constrainToMain?: boolean;
};
declare function SelectContent({ className, children, position, fitContent, portalToBody, sideOffset, side, align, collisionAvoidance, constrainToMain, onKeyDown, ...props }: React.ComponentProps<typeof BaseSelect.Popup> & SelectContentExtra): import("react/jsx-runtime").JSX.Element;
declare function SelectLabel({ className, ...props }: React.ComponentProps<typeof BaseSelect.GroupLabel>): import("react/jsx-runtime").JSX.Element;
declare function SelectItem({ className, children, ...props }: React.ComponentProps<typeof BaseSelect.Item>): import("react/jsx-runtime").JSX.Element;
declare function SelectSeparator({ className, ...props }: React.ComponentProps<typeof BaseSelect.Separator>): import("react/jsx-runtime").JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, };
