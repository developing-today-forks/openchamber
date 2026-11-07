import * as React from "react";
interface NumberInputProps extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
    value?: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    containerClassName?: string;
    fallbackValue?: number;
    onClear?: () => void;
    emptyLabel?: string;
    deferExternalValueWhileFocused?: boolean;
}
declare const NumberInput: React.ForwardRefExoticComponent<Omit<NumberInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { NumberInput };
