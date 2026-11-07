import { type Handle } from './dom.ts';
export type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    /** Muted line under the label. */
    description?: string;
};
export type CheckboxHandle = Handle<CheckboxProps>;
export declare const mountCheckbox: (root: Element, initial: CheckboxProps) => CheckboxHandle;
export declare const mountSwitch: (root: Element, initial: CheckboxProps) => CheckboxHandle;
