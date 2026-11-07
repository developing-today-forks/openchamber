export interface ThemePickerOption {
    id: string;
    label: string;
}
interface ThemePickerProps {
    options: readonly ThemePickerOption[];
    value: string;
    onValueChange: (id: string) => void;
    placeholder: string;
    /** Accessible name of the trigger and the popup. */
    ariaLabel: string;
}
export declare function ThemePicker({ options, value, onValueChange, placeholder, ariaLabel }: ThemePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
