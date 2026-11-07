import * as React from "react";
import { type MotionProps } from "motion/react";
declare const variants: readonly [{
    readonly variant: "static";
    readonly component: ({ children, className, ...props }: React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<MotionProps>) => import("react/jsx-runtime").JSX.Element;
}, {
    readonly variant: "generate-effect";
    readonly component: ({ children, className, ...props }: React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<MotionProps>) => import("react/jsx-runtime").JSX.Element | null;
}, {
    readonly variant: "glitch";
    readonly component: ({ children, className, ...props }: React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<MotionProps>) => import("react/jsx-runtime").JSX.Element;
}, {
    readonly variant: "hover-enter";
    readonly component: ({ children, className, ...props }: React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<MotionProps>) => import("react/jsx-runtime").JSX.Element | null;
}, {
    readonly variant: "shake";
    readonly component: ({ children, className, ...props }: React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<MotionProps>) => import("react/jsx-runtime").JSX.Element;
}, {
    readonly variant: "hover-decoration";
    readonly component: ({ children, className, ...props }: React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & Partial<MotionProps>) => import("react/jsx-runtime").JSX.Element;
}];
export type TextProps = {
    variant?: (typeof variants)[number]["variant"];
} & React.ComponentProps<"span"> & Partial<MotionProps>;
export declare function Text({ variant, className, ...props }: TextProps): import("react/jsx-runtime").JSX.Element;
export {};
