import React from "react";
import type { IconName } from "./icons";
interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
    name: IconName;
}
export declare const Icon: React.MemoExoticComponent<({ name, className, ...rest }: IconProps) => import("react/jsx-runtime").JSX.Element>;
export {};
