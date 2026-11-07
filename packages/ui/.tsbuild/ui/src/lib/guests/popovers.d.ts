import type { GuestPopoverRequest, GuestPopoverSide } from '@openchamber/sdk';
type GuestPopoverFrameBounds = {
    left: number;
    top: number;
    width: number;
    height: number;
    clientWidth: number;
    clientHeight: number;
};
export type GuestPopoverPosition = {
    left: number;
    top: number;
    width: number;
    height: number;
    side: GuestPopoverSide;
};
type PopoverPositionRequest = Pick<GuestPopoverRequest, 'anchor' | 'width' | 'height' | 'side'> & {
    frame: GuestPopoverFrameBounds;
    viewport: {
        width: number;
        height: number;
    };
};
export declare const GUEST_POPOVER_MODAL_SELECTOR = "[role=\"dialog\"][aria-modal=\"true\"], [role=\"alertdialog\"][aria-modal=\"true\"]";
/** A guest preview must never cover a host permission or modal dialog. */
export declare const guestPopoverOwnerBlocked: (frame: HTMLIFrameElement) => boolean;
export type GuestPopoverActivation = {
    id: string;
    authorize: () => boolean;
    close: (reason: 'escape' | 'outside' | 'anchor' | 'owner' | 'closed' | 'replaced') => void;
};
/** One document-owned lease. A stale owner may never release a replacement. */
export declare class GuestPopoverController {
    #private;
    claim(activation: GuestPopoverActivation): GuestPopoverActivation;
    current(): GuestPopoverActivation | null;
    release(activation: GuestPopoverActivation): void;
    authorize(activation: GuestPopoverActivation): boolean;
    retire(activation: GuestPopoverActivation, reason: Parameters<GuestPopoverActivation['close']>[0]): void;
}
export declare const getGuestPopoverController: (ownerDocument: Document) => GuestPopoverController;
/** Converts an owner-frame CSS-pixel anchor into a host viewport position. */
export declare const positionGuestPopover: (request: PopoverPositionRequest) => GuestPopoverPosition | null;
export {};
