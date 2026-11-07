import * as React from "react";
type InputProps = React.ComponentProps<"input"> & {
    /**
     * `compact` (h-7) for toolbars and filter rows, where it sits beside
     * `size="sm"` buttons and compact dropdown triggers; `default` (h-8) for
     * forms and dialogs. Named apart from the native numeric `size` attribute.
     */
    inputSize?: "default" | "compact";
};
declare function Input({ className, type, inputSize, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
export { Input };
