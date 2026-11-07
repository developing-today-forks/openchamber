import { type Handle } from './dom.ts';
export type SeparatorProps = {
    label?: string;
};
export type SeparatorHandle = Handle<SeparatorProps>;
export declare const mountSeparator: (root: Element, initial?: SeparatorProps) => SeparatorHandle;
