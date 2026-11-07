import { type Handle } from './dom.ts';
export type TextFieldProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    password?: boolean;
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    /** Error text. Turns the ring red and replaces `helper`. */
    error?: string;
    helper?: string;
    /** Monospace input, for tokens and identifiers. */
    mono?: boolean;
};
export type TextFieldHandle = Handle<TextFieldProps>;
export declare const mountTextField: (root: Element, initial: TextFieldProps) => TextFieldHandle;
