import type { HostClient } from '../host.ts';
import type { GuestPopoverSide } from '../popover.ts';
import type { JsonValue } from '../contract.ts';
export type PopoverAnchorOptions = {
    host: Pick<HostClient, 'openPopover' | 'closePopover' | 'setPopoverAnchorActive' | 'onPopoverClosed'>;
    getData: () => JsonValue;
    width: number;
    height: number;
    side?: GuestPopoverSide;
    label?: string;
};
export type PopoverAnchorHandle = {
    dispose: () => void;
};
/** Adds a bounded host popover preview to an extension-owned element. */
export declare const mountPopoverAnchor: (element: HTMLElement, options: PopoverAnchorOptions) => PopoverAnchorHandle;
