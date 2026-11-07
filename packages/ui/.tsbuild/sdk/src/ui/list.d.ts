import { type Tone } from './badge.ts';
import { type Handle } from './dom.ts';
export type ListItem = {
    id: string;
    title: string;
    /** Micro muted line under the title. */
    subtitle?: string;
    /** Fixed-width mono text before the title, like an issue key. */
    leading?: string;
    /** Muted tabular text at the right, like a date or count. */
    meta?: string;
    badge?: {
        label: string;
        tone?: Tone;
    };
    disabled?: boolean;
};
export type ListProps = {
    items: ListItem[];
    selectedId?: string | null;
    onSelect: (id: string) => void;
    emptyText?: string;
    ariaLabel?: string;
};
export type ListHandle = Handle<ListProps>;
export declare const mountList: (root: Element, initial: ListProps) => ListHandle;
