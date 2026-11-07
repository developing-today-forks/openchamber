import { type Tone } from './badge.ts';
import { type Handle } from './dom.ts';
export type ProgressProps = {
    /** 0 to 100. Values outside that range are clamped. */
    value: number;
    tone?: Tone;
    label?: string;
};
export type ProgressHandle = Handle<ProgressProps>;
export declare const clampProgress: (value: number) => number;
export declare const mountProgress: (root: Element, initial: ProgressProps) => ProgressHandle;
