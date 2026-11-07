import React from 'react';
import { type GuestPopoverPosition } from '@/lib/guests/popovers';
type GuestPopoverProps = {
    position: GuestPopoverPosition;
    focused: boolean;
    label: string;
    ownerFrame: HTMLIFrameElement | null;
    onClose: (reason: 'escape' | 'outside') => void;
    onEnter: () => void;
    onLeave: () => void;
    onOutsideHover: () => void;
    children: React.ReactNode;
};
/** Host-owned portal for one sandboxed extension popover frame. */
export declare const GuestPopover: React.FC<GuestPopoverProps>;
export {};
