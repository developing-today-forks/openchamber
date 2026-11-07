/** One popup row shared by select (`role="option"`) and menu (`role="menuitem"`). */
type OptionSpec = {
    id: string;
    label: string;
    hint?: string;
    selected?: boolean;
    destructive?: boolean;
    disabled?: boolean;
};
export declare const createOption: (uid: string, role: 'option' | 'menuitem', spec: OptionSpec, on: {
    hover: () => void;
    pick: () => void;
}) => HTMLButtonElement;
/** Moves the `data-active` highlight and `aria-activedescendant`; scrolls the row into view. */
export declare const highlightOption: (container: HTMLElement, focusOwner: HTMLElement, uid: string, id: string | null) => void;
export {};
