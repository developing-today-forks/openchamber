import { type Handle } from './dom.ts';
export type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeProps = {
    label: string;
    tone?: Tone;
};
export type BadgeHandle = Handle<BadgeProps>;
/** Writes `data-tone` for toned colours; neutral removes it. */
export declare const applyTone: (node: Element, tone: Tone | undefined) => void;
export declare const mountBadge: (root: Element, initial: BadgeProps) => BadgeHandle;
