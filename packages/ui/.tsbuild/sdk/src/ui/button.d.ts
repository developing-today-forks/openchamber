import { type Handle } from './dom.ts';
export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'default' | 'sm' | 'xs';
export type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    /** Shows a spinner in front of the label and blocks clicks. */
    loading?: boolean;
    onClick: () => void;
};
export type ButtonHandle = Handle<ButtonProps>;
export declare const mountButton: (root: Element, initial: ButtonProps) => ButtonHandle;
