import { type ButtonSize, type ButtonVariant } from './button.ts';
import { type Handle } from './dom.ts';
export type MenuItem = {
    id: string;
    label: string;
    destructive?: boolean;
    disabled?: boolean;
} | {
    separator: true;
};
export type MenuProps = {
    /** Trigger button label. */
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    items: MenuItem[];
    onSelect: (id: string) => void;
};
export type MenuHandle = Handle<MenuProps>;
export declare const mountMenu: (root: Element, initial: MenuProps) => MenuHandle;
