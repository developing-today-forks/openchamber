import { type Handle } from './dom.ts';
export type SearchFieldProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Accessible name. Falls back to the placeholder. */
    label?: string;
    autofocus?: boolean;
};
export type SearchFieldHandle = Handle<SearchFieldProps>;
export declare const mountSearchField: (root: Element, initial: SearchFieldProps) => SearchFieldHandle;
