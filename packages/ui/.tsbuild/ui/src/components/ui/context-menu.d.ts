import * as React from "react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
declare function ContextMenu({ open, defaultOpen, onOpenChange, ...props }: Omit<React.ComponentProps<typeof BaseContextMenu.Root>, "actionsRef">): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuTrigger({ ...props }: React.ComponentProps<typeof BaseContextMenu.Trigger>): import("react/jsx-runtime").JSX.Element;
type ContentProps = {
    className?: string;
    positionerClassName?: string;
    children?: React.ReactNode;
} & React.ComponentProps<typeof BaseContextMenu.Popup>;
declare function ContextMenuContent({ className, positionerClassName, children, style, onKeyDown, ...props }: ContentProps): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuItem({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Item>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof BaseContextMenu.Separator>): import("react/jsx-runtime").JSX.Element;
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, };
