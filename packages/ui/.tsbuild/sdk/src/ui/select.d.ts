import { type Handle } from './dom.ts';
export type SelectOption = {
    id: string;
    label: string;
    /** Small muted text at the right of the option. */
    hint?: string;
};
export type SelectProps = {
    label?: string;
    value: string | null;
    options: SelectOption[];
    onChange: (id: string) => void;
    placeholder?: string;
    /** Adds a search box at the top of the popup. */
    searchable?: boolean;
    searchPlaceholder?: string;
    disabled?: boolean;
};
export type SelectHandle = Handle<SelectProps>;
/** Case-insensitive substring match on label and id. Empty query keeps every option. */
export declare const filterSelectOptions: (options: readonly SelectOption[], query: string) => SelectOption[];
export declare const mountSelect: (root: Element, initial: SelectProps) => SelectHandle;
