import { type Handle } from './dom.ts';
export type EmptyProps = {
    title: string;
    body?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
};
export type EmptyHandle = Handle<EmptyProps>;
export declare const mountEmpty: (root: Element, initial: EmptyProps) => EmptyHandle;
