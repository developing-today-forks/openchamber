import * as React from "react";
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
declare const Collapsible: React.ForwardRefExoticComponent<Omit<import("@base-ui/react").CollapsibleRootProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type TriggerProps = React.ComponentProps<typeof BaseCollapsible.Trigger> & {
    asChild?: boolean;
};
declare const CollapsibleTrigger: ({ className, asChild, children, ...props }: TriggerProps) => import("react/jsx-runtime").JSX.Element;
declare const CollapsibleContent: ({ className, ...props }: React.ComponentProps<typeof BaseCollapsible.Panel>) => import("react/jsx-runtime").JSX.Element;
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
