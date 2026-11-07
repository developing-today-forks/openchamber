import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
type AsChildProps = {
    asChild?: boolean;
};
declare function Dialog({ ...props }: React.ComponentProps<typeof BaseDialog.Root>): import("react/jsx-runtime").JSX.Element;
declare function DialogTrigger({ asChild, children, ...props }: React.ComponentProps<typeof BaseDialog.Trigger> & AsChildProps): import("react/jsx-runtime").JSX.Element;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<Omit<import("@base-ui/react").DialogBackdropProps, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
type DialogContentProps = Omit<React.ComponentProps<typeof BaseDialog.Popup>, "children"> & {
    showCloseButton?: boolean;
    backdropProps?: React.ComponentProps<typeof DialogOverlay>;
    layerClassName?: string;
    children?: React.ReactNode;
};
declare function DialogContent({ className, children, showCloseButton, backdropProps, layerClassName, ref, initialFocus, ...props }: DialogContentProps): import("react/jsx-runtime").JSX.Element;
declare function DialogHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DialogFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>): import("react/jsx-runtime").JSX.Element;
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>): import("react/jsx-runtime").JSX.Element;
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, };
