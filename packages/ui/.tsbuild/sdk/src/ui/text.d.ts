import { type Handle } from './dom.ts';
export type TextPart = {
    kind: 'text';
    text: string;
} | {
    kind: 'image';
    src: string;
    alt: string;
} | {
    kind: 'link';
    href: string;
    label: string;
};
export type TextProps = {
    text: string;
    /** Called with the href of a clicked link. A sandboxed iframe cannot open it alone. */
    onOpenUrl?: (url: string) => void;
};
export type TextHandle = Handle<TextProps>;
export declare const isHttpUrl: (value: string) => boolean;
/** Splits text into plain runs, `![alt](https://…)` images, and `[label](https://…)` links. Anything else stays text. */
export declare const splitTextMedia: (text: string) => TextPart[];
export declare const mountText: (root: Element, initial: TextProps) => TextHandle;
