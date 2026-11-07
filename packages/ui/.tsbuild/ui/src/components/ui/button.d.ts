import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "chip" | "default" | "destructive" | "ghost" | "info" | "link" | "neutral" | "outline" | "secondary" | null | undefined;
    size?: "default" | "icon" | "lg" | "sm" | "xs" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, type, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Button };
