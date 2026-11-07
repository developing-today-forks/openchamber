import { type Handle } from './dom.ts';
export type SpinnerProps = {
    size?: 'sm' | 'default';
    /** Text next to the ring. Also the accessible name. */
    label?: string;
};
export type SpinnerHandle = Handle<SpinnerProps>;
export declare const mountSpinner: (root: Element, initial?: SpinnerProps) => SpinnerHandle;
