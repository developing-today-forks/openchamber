import * as React from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
type AsChildProps = {
    asChild?: boolean;
};
type DropdownMenuProps = Omit<React.ComponentProps<typeof BaseMenu.Root>, "actionsRef"> & {
    disableGlobalShortcuts?: boolean;
};
declare function DropdownMenu({ disableGlobalShortcuts, open, defaultOpen, onOpenChange, ...props }: DropdownMenuProps): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuTrigger({ asChild, children, onPointerDownCapture, onFocusCapture, ...props }: React.ComponentProps<typeof BaseMenu.Trigger> & AsChildProps): import("react/jsx-runtime").JSX.Element;
type ContentProps = {
    sideOffset?: number;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    alignOffset?: number;
    portalToBody?: boolean;
    positionerClassName?: string;
    constrainToMain?: boolean;
    collisionAvoidance?: React.ComponentProps<typeof BaseMenu.Positioner>["collisionAvoidance"];
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    onCloseAutoFocus?: (event: Event) => void;
} & Omit<React.ComponentProps<typeof BaseMenu.Popup>, "style" | "className" | "children">;
declare function DropdownMenuContent({ className, sideOffset, align, side, alignOffset, portalToBody, positionerClassName, constrainToMain, collisionAvoidance, style, children, onCloseAutoFocus, onKeyDown, ...props }: ContentProps): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, asChild, children, onSelect, onClick, ...props }: React.ComponentProps<typeof BaseMenu.Item> & AsChildProps & {
    inset?: boolean;
    variant?: "default" | "destructive";
    onSelect?: React.ComponentProps<typeof BaseMenu.Item>["onClick"];
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: React.ComponentProps<typeof BaseMenu.RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof BaseMenu.RadioItem>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<"div"> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof BaseMenu.Separator>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSub({ ...props }: React.ComponentProps<typeof BaseMenu.SubmenuRoot>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof BaseMenu.SubmenuTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubContent({ className, children, onKeyDown, ...props }: React.ComponentProps<typeof BaseMenu.Popup>): import("react/jsx-runtime").JSX.Element;
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
